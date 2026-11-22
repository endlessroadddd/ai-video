import type { CSSProperties, PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BoxSelect,
  ChevronDown,
  ChevronUp,
  Circle,
  Copy,
  Diamond,
  ExternalLink,
  Hand,
  Hexagon,
  ImagePlus,
  Layers2,
  Minus,
  Move3D,
  Pause,
  Play,
  Plus,
  Rewind,
  Search,
  Square,
  Star,
  Triangle,
  Type,
  Video,
} from "lucide-react";

import type { MaterialNarrativeRole } from "./material-catalog";
import type { ShowcaseBrowseEntry, ShowcaseFilterState } from "./showcase-copy";
import {
  SHOWCASE_PREVIEWABILITY_LABELS_ZH,
  SHOWCASE_REUSE_LABELS_ZH,
  SHOWCASE_ROLE_LABELS_ZH,
  SHOWCASE_WEIGHT_LABELS_ZH,
} from "./showcase-copy";
import { CanvasShapeSvg } from "./showcase-canvas-shapes";
import {
  buildCopiedCanvasScenePayload,
  CANVAS_ANIMATABLE_PROPERTIES,
  CANVAS_SHAPE_LABELS,
  CANVAS_SHAPE_ORDER,
  CANVAS_TIMELINE_EASING_LABELS,
  createCanvasKeyframe,
  createCanvasAssetRecord,
  createDefaultCanvasScene,
  createMaterialCanvasItem,
  createShapeCanvasItem,
  createTextCanvasItem,
  createTheaterCanvasItem,
  createUploadCanvasItem,
  DEFAULT_CANVAS_DURATION_MS,
  getCanvasAnimatableValue,
  isCanvasItemVisibleAtTime,
  normalizeCanvasScene,
  resolveCanvasItemAtTime,
  type CanvasAnimatableProperty,
  type CanvasAssetRecord,
  type CanvasBoardItem,
  type CanvasCrop,
  type CanvasFrame,
  type CanvasItem,
  type CanvasKeyframe,
  type CanvasPoint,
  type CanvasSceneState,
  type CanvasShapeItem,
  type CanvasShapeType,
  type CanvasTheaterItem,
  type CanvasTheaterSceneState,
  type CanvasTextAlign,
  type CanvasTimelineTrack,
  type CanvasTimelineWindowState,
  type CanvasVideoItem,
} from "./showcase-canvas-state";
import { clampNumber, copyTextToClipboard, roundToStep } from "./showcase-shared";

type CanvasWorkspaceProps = {
  browseEntries: ShowcaseBrowseEntry[];
  clearFilters: () => void;
  filters: ShowcaseFilterState;
  groupedEntries: Array<{ entries: ShowcaseBrowseEntry[]; role: MaterialNarrativeRole }>;
  onBackToLibrary: () => void;
  onOpenMaterial: (entry: ShowcaseBrowseEntry) => void;
  updateFilter: <K extends keyof ShowcaseFilterState>(
    key: K,
    value: ShowcaseFilterState[K],
  ) => void;
};

type DragState = {
  itemId: string;
  startClient: CanvasPoint;
  startFrame: CanvasFrame;
};

type ResizeHandle = "nw" | "ne" | "sw" | "se";

type ResizeDragState = {
  handle: ResizeHandle;
  itemId: string;
  startClient: CanvasPoint;
  startFrame: CanvasFrame;
};

type TimelineDragState =
  | { kind: "scrub"; rect: DOMRect }
  | { itemId: string; kind: "range-end"; rect: DOMRect }
  | { itemId: string; kind: "range-move"; rect: DOMRect; startClient: CanvasPoint; startTrack: CanvasTimelineTrack }
  | { itemId: string; kind: "range-start"; rect: DOMRect }
  | { keyframeId: string; kind: "keyframe"; rect: DOMRect };

type ViewportDragState = {
  startClient: CanvasPoint;
  startViewport: CanvasSceneState["viewport"];
};

type TimelineWindowDragState = {
  startClient: CanvasPoint;
  startWindow: CanvasTimelineWindowState;
};

const STORAGE_KEY = "lucius.material-library.canvas.scene.v2";
const PENDING_INSERT_KEY = "lucius.material-library.canvas.pending.v1";
const DB_NAME = "lucius-material-library-canvas";
const DB_STORE = "assets";
const WORLD_SIZE = 32000;
const WORLD_HALF = WORLD_SIZE / 2;

function loadScene(): CanvasSceneState {
  if (typeof window === "undefined") {
    return createDefaultCanvasScene();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeCanvasScene(JSON.parse(raw) as Record<string, unknown>) : createDefaultCanvasScene();
  } catch {
    return createDefaultCanvasScene();
  }
}

function saveScene(scene: CanvasSceneState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...scene,
      isPlaying: false,
    }),
  );
}

export function enqueueMaterialForCanvas(entry: ShowcaseBrowseEntry) {
  if (typeof window === "undefined") {
    return;
  }

  const existing = readQueuedInserts();
  existing.push({ materialId: entry.id });
  window.localStorage.setItem(PENDING_INSERT_KEY, JSON.stringify(existing));
}

function readQueuedInserts(): Array<{ materialId: string }> {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(PENDING_INSERT_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as Array<{ materialId?: string }>;
    return Array.isArray(parsed)
      ? parsed.filter((item): item is { materialId: string } => typeof item.materialId === "string")
      : [];
  } catch {
    return [];
  }
}

function consumeQueuedInserts(): Array<{ materialId: string }> {
  const queued = readQueuedInserts();
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(PENDING_INSERT_KEY);
  }
  return queued;
}

function worldToScreen(frame: CanvasFrame, scene: CanvasSceneState, surfaceSize: { height: number; width: number }) {
  return {
    height: frame.height * scene.viewport.scale,
    width: frame.width * scene.viewport.scale,
    x: surfaceSize.width / 2 + scene.viewport.x + frame.x * scene.viewport.scale,
    y: surfaceSize.height / 2 + scene.viewport.y + frame.y * scene.viewport.scale,
  };
}

function clientToWorld(
  client: CanvasPoint,
  surfaceRect: DOMRect,
  scene: CanvasSceneState,
  surfaceSize: { height: number; width: number },
): CanvasPoint {
  return {
    x: (client.x - surfaceRect.left - surfaceSize.width / 2 - scene.viewport.x) / scene.viewport.scale,
    y: (client.y - surfaceRect.top - surfaceSize.height / 2 - scene.viewport.y) / scene.viewport.scale,
  };
}

function getViewportCenter(scene: CanvasSceneState): CanvasPoint {
  return {
    x: -scene.viewport.x / scene.viewport.scale,
    y: -scene.viewport.y / scene.viewport.scale,
  };
}

function getCanvasWorldCoordinate(value: number) {
  return value + WORLD_HALF;
}

function formatTimeMs(timeMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(timeMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatNumericValue(value: number) {
  return String(roundToStep(value, 1));
}

function getLeadCue(entry: ShowcaseBrowseEntry): string {
  return entry.cueText[0] ?? entry.selectionSignals[0] ?? entry.summaryForUi;
}

function getTimelineMsFromClientX(clientX: number, rect: DOMRect, durationMs: number) {
  const ratio = clampNumber((clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
  return Math.round(ratio * durationMs);
}

function getTimelinePercent(timeMs: number, durationMs: number) {
  if (durationMs <= 0) return 0;
  return clampNumber((timeMs / durationMs) * 100, 0, 100);
}

function getTimelineSpanPercent(track: CanvasTimelineTrack, durationMs: number) {
  if (durationMs <= 0) return 0;
  return clampNumber(((track.endMs - track.startMs) / durationMs) * 100, 0.5, 100);
}

function getCanvasItemLabel(item: CanvasItem) {
  if (item.type === "material" || item.type === "shape") {
    return item.title;
  }
  if (item.type === "text") {
    return item.content.slice(0, 28) || "Text";
  }
  return item.fileName;
}

function isTheaterItem(item: CanvasBoardItem | CanvasItem): item is CanvasTheaterItem {
  return item.type === "theater";
}

function isTimelineItem(item: CanvasBoardItem | CanvasItem): item is CanvasItem {
  return item.type !== "theater";
}

function getActiveTheaterFromScene(scene: CanvasSceneState): CanvasTheaterItem | null {
  return (
    scene.items.find(
      (item): item is CanvasTheaterItem => item.type === "theater" && item.id === scene.activeTheaterId,
    ) ?? null
  );
}

function updateTheaterSceneInScene(
  scene: CanvasSceneState,
  updater: (theater: CanvasTheaterSceneState) => CanvasTheaterSceneState,
): CanvasSceneState {
  if (!scene.activeTheaterId) {
    return scene;
  }

  let changed = false;
  const nextItems = scene.items.map((item) => {
    if (item.type !== "theater" || item.id !== scene.activeTheaterId) {
      return item;
    }

    changed = true;
    return { ...item, scene: updater(item.scene) };
  });

  return changed ? { ...scene, items: nextItems } : scene;
}

function updateCurrentSelectionInScene(
  scene: CanvasSceneState,
  ids: string[],
  keyframeIds: string[] = [],
): CanvasSceneState {
  if (getActiveTheaterFromScene(scene)) {
    return updateTheaterSceneInScene(scene, (theater) => ({
      ...theater,
      selectedIds: ids,
      selectedKeyframeIds: keyframeIds,
    }));
  }

  return {
    ...scene,
    selectedIds: ids,
    selectedKeyframeIds: keyframeIds,
  };
}

function updateCurrentItemsInScene(
  scene: CanvasSceneState,
  updater: (items: Array<CanvasBoardItem | CanvasItem>) => Array<CanvasBoardItem | CanvasItem>,
): CanvasSceneState {
  if (getActiveTheaterFromScene(scene)) {
    return updateTheaterSceneInScene(scene, (theater) => ({
      ...theater,
      items: updater(theater.items) as CanvasItem[],
    }));
  }

  return {
    ...scene,
    items: updater(scene.items) as CanvasBoardItem[],
  };
}

function getCurrentPlayheadFromScene(scene: CanvasSceneState) {
  return getActiveTheaterFromScene(scene)?.scene.playheadMs ?? 0;
}

function applyFrameUpdateToBoardItem(
  item: CanvasBoardItem | CanvasItem,
  frame: CanvasFrame,
  timeMs: number,
  preserveTimeline: boolean,
): CanvasBoardItem | CanvasItem {
  if (isTheaterItem(item)) {
    return { ...item, frame };
  }

  return preserveTimeline ? updateFrameAtTime(item, frame, timeMs) : { ...item, frame };
}

function updateTrackRange(
  item: CanvasItem,
  range: Partial<Pick<CanvasTimelineTrack, "endMs" | "startMs">>,
  durationMs: number,
): CanvasItem {
  const startMs = clampNumber(range.startMs ?? item.timeline.startMs, 0, Math.max(durationMs - 100, 0));
  const endMs = clampNumber(range.endMs ?? item.timeline.endMs, startMs + 100, durationMs);
  return {
    ...item,
    timeline: {
      ...item.timeline,
      endMs,
      keyframes: item.timeline.keyframes.map((keyframe) => ({
        ...keyframe,
        timeMs: clampNumber(keyframe.timeMs, startMs, endMs),
      })),
      startMs,
    },
  };
}

function shiftTrack(item: CanvasItem, deltaMs: number, durationMs: number): CanvasItem {
  const span = item.timeline.endMs - item.timeline.startMs;
  const nextStart = clampNumber(item.timeline.startMs + deltaMs, 0, Math.max(durationMs - span, 0));
  const nextEnd = clampNumber(nextStart + span, nextStart + 100, durationMs);
  return {
    ...item,
    timeline: {
      ...item.timeline,
      endMs: nextEnd,
      keyframes: item.timeline.keyframes.map((keyframe) => ({
        ...keyframe,
        timeMs: clampNumber(keyframe.timeMs + deltaMs, nextStart, nextEnd),
      })),
      startMs: nextStart,
    },
  };
}

function extendTrack(item: CanvasItem, deltaMs: number, durationMs: number): CanvasItem {
  return updateTrackRange(item, { endMs: item.timeline.endMs + deltaMs }, durationMs);
}

function updateFrameAtTime(item: CanvasItem, frame: CanvasFrame, timeMs: number): CanvasItem {
  const updateProp = (property: CanvasAnimatableProperty, value: number, current: CanvasItem) => {
    const rounded = Math.round(timeMs);
    const existing = current.timeline.keyframes.findIndex(
      (keyframe) => keyframe.property === property && Math.abs(keyframe.timeMs - rounded) <= 1,
    );
    if (existing >= 0) {
      const nextKeyframes = [...current.timeline.keyframes];
      nextKeyframes[existing] = { ...nextKeyframes[existing]!, value };
      return { ...current, timeline: { ...current.timeline, keyframes: nextKeyframes } };
    }

    if (property === "x" || property === "y" || property === "width" || property === "height") {
      return {
        ...current,
        frame: {
          ...current.frame,
          ...(property === "x" ? { x: value } : {}),
          ...(property === "y" ? { y: value } : {}),
          ...(property === "width" ? { width: clampNumber(value, 40, 2400) } : {}),
          ...(property === "height" ? { height: clampNumber(value, 40, 2400) } : {}),
        },
      };
    }

    return current;
  };

  let next = updateProp("x", frame.x, item);
  next = updateProp("y", frame.y, next);
  next = updateProp("width", frame.width, next);
  next = updateProp("height", frame.height, next);
  return next;
}

function resizeFrameWithHandle(
  startFrame: CanvasFrame,
  handle: ResizeHandle,
  delta: CanvasPoint,
): CanvasFrame {
  const minSize = 40;
  let x = startFrame.x;
  let y = startFrame.y;
  let width = startFrame.width;
  let height = startFrame.height;

  if (handle === "nw" || handle === "sw") {
    width = clampNumber(startFrame.width - delta.x, minSize, 2400);
    x = startFrame.x + (startFrame.width - width);
  } else {
    width = clampNumber(startFrame.width + delta.x, minSize, 2400);
  }

  if (handle === "nw" || handle === "ne") {
    height = clampNumber(startFrame.height - delta.y, minSize, 2400);
    y = startFrame.y + (startFrame.height - height);
  } else {
    height = clampNumber(startFrame.height + delta.y, minSize, 2400);
  }

  return { height, width, x, y };
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE);
      }
    };
    request.onerror = () => reject(request.error ?? new Error("Failed to open IndexedDB"));
    request.onsuccess = () => resolve(request.result);
  });
}

async function storeAssetBlob(assetId: string, blob: Blob) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    const req = tx.objectStore(DB_STORE).put(blob, assetId);
    req.onerror = () => reject(req.error ?? new Error("Failed to store blob"));
    req.onsuccess = () => resolve();
  });
  db.close();
}

async function readAssetBlob(assetId: string): Promise<Blob | null> {
  const db = await openDb();
  const result = await new Promise<Blob | null>((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readonly");
    const req = tx.objectStore(DB_STORE).get(assetId);
    req.onerror = () => reject(req.error ?? new Error("Failed to read blob"));
    req.onsuccess = () => resolve((req.result as Blob | undefined) ?? null);
  });
  db.close();
  return result;
}

function EntryThumb({ entry }: { entry: ShowcaseBrowseEntry }) {
  if (!entry.preview) {
    return <div className="ml-canvas-entry__thumb ml-card__preview ml-card__preview--empty"><span>Code</span></div>;
  }

  return (
    <div className={`ml-canvas-entry__thumb ml-card__preview ${entry.preview.kind === "stage" ? "is-stage" : "is-card"}`}>
      <div className="ml-canvas-entry__thumb-surface ml-card__preview-surface" style={{ "--ml-thumb-scale": "0.34" } as CSSProperties}>
        {entry.preview.render({ t: entry.preview.kind === "stage" ? 2200 : 0 })}
      </div>
    </div>
  );
}

function VideoSurface({ item, playheadMs, src }: { item: CanvasVideoItem; playheadMs: number; src: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const localSeconds = Math.max(0, playheadMs - item.timeline.startMs) / 1000;
    if (Math.abs(video.currentTime - localSeconds) > 0.12) {
      try {
        video.currentTime = localSeconds;
      } catch {}
    }
  }, [item.timeline.startMs, playheadMs]);
  return <video ref={ref} className="ml-canvas-media__asset" muted playsInline preload="metadata" src={src} />;
}
function FilterGroup<T extends string>({
  activeValue,
  label,
  onChange,
  options,
}: {
  activeValue: T;
  label: string;
  onChange: (value: T) => void;
  options: Array<{ label: string; value: T }>;
}) {
  return (
    <section className="ml-filter-group">
      <div className="ml-filter-group__label">{label}</div>
      <div className="ml-filter-group__row">
        {options.map((option) => (
          <button
            key={option.value}
            className={`ml-filter-chip${option.value === activeValue ? " is-active" : ""}`}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export function CanvasWorkspace({
  browseEntries,
  clearFilters,
  filters,
  groupedEntries,
  onBackToLibrary,
  onOpenMaterial,
  updateFilter,
}: CanvasWorkspaceProps) {
  const [scene, setScene] = useState<CanvasSceneState>(() => loadScene());
  const [assetUrls, setAssetUrls] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(true);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [shapePickerOpen, setShapePickerOpen] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [activeProperty, setActiveProperty] = useState<CanvasAnimatableProperty>("x");
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [resizeDrag, setResizeDrag] = useState<ResizeDragState | null>(null);
  const [viewportDrag, setViewportDrag] = useState<ViewportDragState | null>(null);
  const [timelineDrag, setTimelineDrag] = useState<TimelineDragState | null>(null);
  const [timelineWindowDrag, setTimelineWindowDrag] = useState<TimelineWindowDragState | null>(null);
  const [surfaceSize, setSurfaceSize] = useState({ height: 0, width: 0 });
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const queuedRef = useRef(false);
  const sceneRef = useRef(scene);
  const surfaceSizeRef = useRef(surfaceSize);
  const pendingSceneMutationRef = useRef<((current: CanvasSceneState) => CanvasSceneState) | null>(null);
  const sceneMutationFrameRef = useRef<number | null>(null);

  sceneRef.current = scene;
  surfaceSizeRef.current = surfaceSize;

  const applySceneMutation = useCallback((mutation: (current: CanvasSceneState) => CanvasSceneState) => {
    setScene((current) => {
      const next = mutation(current);
      sceneRef.current = next;
      return next;
    });
  }, []);

  const scheduleSceneMutation = useCallback((mutation: (current: CanvasSceneState) => CanvasSceneState) => {
    const queued = pendingSceneMutationRef.current;
    pendingSceneMutationRef.current = queued
      ? (current) => mutation(queued(current))
      : mutation;

    if (sceneMutationFrameRef.current !== null) {
      return;
    }

    sceneMutationFrameRef.current = window.requestAnimationFrame(() => {
      sceneMutationFrameRef.current = null;
      const nextMutation = pendingSceneMutationRef.current;
      pendingSceneMutationRef.current = null;
      if (!nextMutation) {
        return;
      }

      setScene((current) => {
        const next = nextMutation(current);
        sceneRef.current = next;
        return next;
      });
    });
  }, []);

  const entryById = useMemo(() => new Map(browseEntries.map((entry) => [entry.id, entry] as const)), [browseEntries]);
  const activeTheater = useMemo(
    () => getActiveTheaterFromScene(scene),
    [scene.activeTheaterId, scene.items],
  );
  const isTheaterMode = activeTheater !== null;
  const currentItems = isTheaterMode ? activeTheater.scene.items : scene.items;
  const currentSelectedIds = isTheaterMode ? activeTheater.scene.selectedIds : scene.selectedIds;
  const currentSelectedKeyframeIds = isTheaterMode ? activeTheater.scene.selectedKeyframeIds : [];
  const currentPlayheadMs = isTheaterMode ? activeTheater.scene.playheadMs : 0;
  const currentDurationMs = isTheaterMode ? activeTheater.scene.durationMs : DEFAULT_CANVAS_DURATION_MS;
  const currentTimelineZoom = isTheaterMode ? activeTheater.scene.timelineZoom : 1;
  const currentTimelineWindow = isTheaterMode ? activeTheater.scene.timelineWindow : null;
  const currentIsPlaying = isTheaterMode ? activeTheater.scene.isPlaying : false;

  useEffect(() => {
    return () => {
      pendingSceneMutationRef.current = null;
      if (sceneMutationFrameRef.current !== null) {
        window.cancelAnimationFrame(sceneMutationFrameRef.current);
      }
    };
  }, []);

  const updateTheaterScene = (updater: (theater: CanvasTheaterSceneState) => CanvasTheaterSceneState) => {
    applySceneMutation((current) => updateTheaterSceneInScene(current, updater));
  };

  const updateCurrentSelection = (ids: string[], keyframeIds: string[] = []) => {
    applySceneMutation((current) => updateCurrentSelectionInScene(current, ids, keyframeIds));
  };

  const updateCurrentItems = (
    updater: (items: Array<CanvasBoardItem | CanvasItem>) => Array<CanvasBoardItem | CanvasItem>,
  ) => {
    applySceneMutation((current) => updateCurrentItemsInScene(current, updater));
  };

  const renderedItems = useMemo(
    () =>
      currentItems.map((item) =>
        isTimelineItem(item) && isTheaterMode ? resolveCanvasItemAtTime(item, currentPlayheadMs) : item,
      ),
    [currentItems, currentPlayheadMs, isTheaterMode],
  );
  const selectedItem = currentItems.find((item) => item.id === currentSelectedIds[0]) ?? null;
  const selectedRendered = renderedItems.find((item) => item.id === currentSelectedIds[0]) ?? null;

  useEffect(() => {
    if (!currentIsPlaying) {
      saveScene(scene);
    }
  }, [currentIsPlaying, scene]);

  useEffect(() => {
    if (!currentSelectedIds.length) return;
    setInspectorOpen(true);
  }, [currentSelectedIds.length]);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined" || !surfaceRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      setSurfaceSize({ height: rect.height, width: rect.width });
      if (isTheaterMode && currentTimelineWindow && currentTimelineWindow.x === 0 && currentTimelineWindow.y === 0) {
        updateTheaterScene((theater) => ({
          ...theater,
          timelineWindow: {
            ...theater.timelineWindow,
            x: Math.max(20, Math.round((rect.width - 780) / 2)),
            y: Math.max(84, Math.round(rect.height - 292)),
          },
        }));
      }
    });
    observer.observe(surfaceRef.current);
    return () => observer.disconnect();
  }, [currentTimelineWindow, isTheaterMode]);

  useEffect(() => {
    if (queuedRef.current) return;
    queuedRef.current = true;
    const queued = consumeQueuedInserts();
    if (!queued.length) return;
    setScene((current) => {
      const center = getViewportCenter(current);
      const nextItems = [...current.items];
      queued.forEach((queuedItem, index) => {
        const entry = entryById.get(queuedItem.materialId);
        if (!entry) return;
        const item = createMaterialCanvasItem(entry, { x: center.x + index * 32, y: center.y + index * 32 }, current.durationMs);
        item.zIndex = nextItems.length + 1;
        nextItems.push(item);
      });
      return { ...current, items: nextItems, selectedIds: nextItems.length ? [nextItems[nextItems.length - 1]!.id] : [] };
    });
  }, [entryById]);

  useEffect(() => {
    scene.assetRecords.forEach((record) => {
      if (assetUrls[record.assetId]) return;
      readAssetBlob(record.assetId)
        .then((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setAssetUrls((current) => ({ ...current, [record.assetId]: url }));
        })
        .catch(() => {});
    });
  }, [assetUrls, scene.assetRecords]);

  useEffect(() => {
    return () => {
      Object.values(assetUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [assetUrls]);

  useEffect(() => {
    if (!isTheaterMode || !currentIsPlaying) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      updateTheaterScene((theater) => ({
        ...theater,
        playheadMs: (theater.playheadMs + delta) % theater.durationMs,
      }));
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [currentIsPlaying, isTheaterMode]);

  useEffect(() => {
    if (!dragState || !surfaceRef.current) return;
    const surfaceRect = surfaceRef.current.getBoundingClientRect();
    const onMove = (event: PointerEvent) => {
      const currentScene = sceneRef.current;
      const currentSurfaceSize = surfaceSizeRef.current;
      const world = clientToWorld({ x: event.clientX, y: event.clientY }, surfaceRect, currentScene, currentSurfaceSize);
      const start = clientToWorld(dragState.startClient, surfaceRect, currentScene, currentSurfaceSize);
      const delta = { x: world.x - start.x, y: world.y - start.y };
      scheduleSceneMutation((current) =>
        updateCurrentItemsInScene(current, (items) =>
          items.map((item) =>
            item.id === dragState.itemId
              ? applyFrameUpdateToBoardItem(
                  item,
                  {
                    ...dragState.startFrame,
                    x: dragState.startFrame.x + delta.x,
                    y: dragState.startFrame.y + delta.y,
                  },
                  getCurrentPlayheadFromScene(current),
                  getActiveTheaterFromScene(current) !== null,
                )
              : item,
          ),
        ),
      );
    };
    const onUp = () => setDragState(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragState, scheduleSceneMutation]);

  useEffect(() => {
    if (!resizeDrag || !surfaceRef.current) return;
    const surfaceRect = surfaceRef.current.getBoundingClientRect();
    const onMove = (event: PointerEvent) => {
      const currentScene = sceneRef.current;
      const currentSurfaceSize = surfaceSizeRef.current;
      const world = clientToWorld({ x: event.clientX, y: event.clientY }, surfaceRect, currentScene, currentSurfaceSize);
      const start = clientToWorld(resizeDrag.startClient, surfaceRect, currentScene, currentSurfaceSize);
      const delta = { x: world.x - start.x, y: world.y - start.y };
      scheduleSceneMutation((current) =>
        updateCurrentItemsInScene(current, (items) =>
          items.map((item) =>
            item.id === resizeDrag.itemId
              ? applyFrameUpdateToBoardItem(
                  item,
                  resizeFrameWithHandle(resizeDrag.startFrame, resizeDrag.handle, delta),
                  getCurrentPlayheadFromScene(current),
                  getActiveTheaterFromScene(current) !== null,
                )
              : item,
          ),
        ),
      );
    };
    const onUp = () => setResizeDrag(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [resizeDrag, scheduleSceneMutation]);

  useEffect(() => {
    if (!viewportDrag) return;
    const onMove = (event: PointerEvent) => {
      scheduleSceneMutation((current) => ({
        ...current,
        viewport: {
          ...current.viewport,
          x: viewportDrag.startViewport.x + (event.clientX - viewportDrag.startClient.x),
          y: viewportDrag.startViewport.y + (event.clientY - viewportDrag.startClient.y),
        },
      }));
    };
    const onUp = () => setViewportDrag(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [scheduleSceneMutation, viewportDrag]);

  useEffect(() => {
    if (!timelineDrag || !isTheaterMode) return;
    const onMove = (event: PointerEvent) => {
      scheduleSceneMutation((current) => {
        if (!getActiveTheaterFromScene(current)) {
          return current;
        }
        if (timelineDrag.kind === "scrub") {
          return updateTheaterSceneInScene(current, (theater) => ({
            ...theater,
            isPlaying: false,
            playheadMs: getTimelineMsFromClientX(event.clientX, timelineDrag.rect, theater.durationMs),
          }));
        }
        if (timelineDrag.kind === "keyframe") {
          return updateTheaterSceneInScene(current, (theater) => ({
            ...theater,
            items: theater.items.map((item) => ({
              ...item,
              timeline: {
                ...item.timeline,
                keyframes: item.timeline.keyframes.map((keyframe) =>
                  keyframe.id === timelineDrag.keyframeId
                    ? {
                        ...keyframe,
                        timeMs: clampNumber(
                          getTimelineMsFromClientX(event.clientX, timelineDrag.rect, theater.durationMs),
                          item.timeline.startMs,
                          item.timeline.endMs,
                        ),
                      }
                    : keyframe,
                ),
              },
            })),
          }));
        }
        return updateTheaterSceneInScene(current, (theater) => ({
          ...theater,
          items: theater.items.map((item) => {
            if (item.id !== timelineDrag.itemId) return item;
            if (timelineDrag.kind === "range-move") {
              const deltaMs = Math.round(
                ((event.clientX - timelineDrag.startClient.x) / Math.max(timelineDrag.rect.width, 1)) *
                  theater.durationMs,
              );
              return shiftTrack(item, deltaMs, theater.durationMs);
            }
            if (timelineDrag.kind === "range-start") {
              return updateTrackRange(
                item,
                { startMs: getTimelineMsFromClientX(event.clientX, timelineDrag.rect, theater.durationMs) },
                theater.durationMs,
              );
            }
            return updateTrackRange(
              item,
              { endMs: getTimelineMsFromClientX(event.clientX, timelineDrag.rect, theater.durationMs) },
              theater.durationMs,
            );
          }),
        }));
      });
    };
    const onUp = () => setTimelineDrag(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isTheaterMode, scheduleSceneMutation, timelineDrag]);

  useEffect(() => {
    if (!timelineWindowDrag || !isTheaterMode) return;
    const onMove = (event: PointerEvent) => {
      const currentSurfaceSize = surfaceSizeRef.current;
      scheduleSceneMutation((current) =>
        updateTheaterSceneInScene(current, (theater) => ({
          ...theater,
          timelineWindow: {
            ...theater.timelineWindow,
            x: clampNumber(
              timelineWindowDrag.startWindow.x + (event.clientX - timelineWindowDrag.startClient.x),
              12,
              Math.max(currentSurfaceSize.width - 260, 12),
            ),
            y: clampNumber(
              timelineWindowDrag.startWindow.y + (event.clientY - timelineWindowDrag.startClient.y),
              72,
              Math.max(currentSurfaceSize.height - 110, 72),
            ),
          },
        })),
      );
    };
    const onUp = () => setTimelineWindowDrag(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isTheaterMode, scheduleSceneMutation, timelineWindowDrag]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (event.key === "Escape") {
        updateCurrentSelection([]);
        return;
      }
      if ((event.key === "Delete" || event.key === "Backspace") && currentSelectedIds.length) {
        event.preventDefault();
        updateCurrentItems((items) => items.filter((item) => !currentSelectedIds.includes(item.id)));
        updateCurrentSelection([]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentSelectedIds]);

  async function handleFiles(files: FileList | File[], type: "image" | "video") {
    const filtered = Array.from(files).filter((file) => file.type.startsWith(type === "image" ? "image/" : "video/"));
    if (!filtered.length) return;
    const center = getViewportCenter(scene);
    const nextRecords: CanvasAssetRecord[] = [];
    const nextItems: CanvasItem[] = [];
    for (const [index, file] of filtered.entries()) {
      const meta =
        type === "image" ? await createImageMeta(file) : await createVideoMeta(file);
      const record = createCanvasAssetRecord({
        durationMs: type === "video" ? (meta as Awaited<ReturnType<typeof createVideoMeta>>).durationMs : null,
        fileName: file.name,
        height: meta.height,
        mimeType: file.type || (type === "image" ? "image/png" : "video/mp4"),
        type,
        width: meta.width,
      });
      await storeAssetBlob(record.assetId, file);
      const item = createUploadCanvasItem(record, { x: center.x + index * 28, y: center.y + index * 28 }, currentDurationMs);
      item.zIndex = currentItems.length + nextItems.length + 1;
      nextRecords.push(record);
      nextItems.push(item);
    }
    setScene((current) => ({ ...current, assetRecords: [...current.assetRecords, ...nextRecords] }));
    updateCurrentItems((items) => [...items, ...nextItems]);
    if (nextItems.length) {
      updateCurrentSelection([nextItems[nextItems.length - 1]!.id]);
    }
    setFeedback(`Imported ${nextItems.length} asset(s).`);
  }

  const roleOptions = [{ label: "全部", value: "all" as const }, ...groupedEntries.map((group) => ({ label: SHOWCASE_ROLE_LABELS_ZH[group.role], value: group.role }))];
  const previewOptions = [
    { label: SHOWCASE_PREVIEWABILITY_LABELS_ZH.all, value: "all" as const },
    { label: SHOWCASE_PREVIEWABILITY_LABELS_ZH.previewable, value: "previewable" as const },
    { label: SHOWCASE_PREVIEWABILITY_LABELS_ZH["code-only"], value: "code-only" as const },
  ];
  const reuseOptions = [
    { label: "全部", value: "all" as const },
    { label: SHOWCASE_REUSE_LABELS_ZH["drop-in"], value: "drop-in" as const },
    { label: SHOWCASE_REUSE_LABELS_ZH["tweak-copy"], value: "tweak-copy" as const },
    { label: SHOWCASE_REUSE_LABELS_ZH["tweak-layout"], value: "tweak-layout" as const },
    { label: SHOWCASE_REUSE_LABELS_ZH["heavy-adaptation"], value: "heavy-adaptation" as const },
  ];
  const weightOptions = [
    { label: "全部", value: "all" as const },
    { label: SHOWCASE_WEIGHT_LABELS_ZH.micro, value: "micro" as const },
    { label: SHOWCASE_WEIGHT_LABELS_ZH.light, value: "light" as const },
    { label: SHOWCASE_WEIGHT_LABELS_ZH.medium, value: "medium" as const },
    { label: SHOWCASE_WEIGHT_LABELS_ZH.heavy, value: "heavy" as const },
    { label: SHOWCASE_WEIGHT_LABELS_ZH["full-scene"], value: "full-scene" as const },
  ];
  const boardTheaterCount = useMemo(
    () => scene.items.filter((item): item is CanvasTheaterItem => item.type === "theater").length,
    [scene.items],
  );
  const timelineItems = currentItems.filter(isTimelineItem);
  const visibleRenderedItems = useMemo(
    () =>
      renderedItems
        .filter((item) => !isTheaterMode || (isTimelineItem(item) && isCanvasItemVisibleAtTime(item, currentPlayheadMs)))
        .sort((left, right) => left.zIndex - right.zIndex),
    [currentPlayheadMs, isTheaterMode, renderedItems],
  );
  const sortedTimelineItems = useMemo(
    () => timelineItems.slice().sort((left, right) => left.zIndex - right.zIndex),
    [timelineItems],
  );
  const selectedTimelineItem = selectedItem && isTimelineItem(selectedItem) ? selectedItem : null;
  const selectedTimelineRendered = selectedRendered && isTimelineItem(selectedRendered) ? selectedRendered : null;
  const selectedTheaterItem = selectedItem && isTheaterItem(selectedItem) ? selectedItem : null;
  const selectedKeyframe = selectedTimelineItem
    ? selectedTimelineItem.timeline.keyframes.find((keyframe) => currentSelectedKeyframeIds.includes(keyframe.id)) ?? null
    : null;
  const tickCount = Math.max(6, Math.round((12 / currentTimelineZoom) * 1.5));
  const timelineTicks = Array.from({ length: tickCount + 1 }, (_, index) => {
    const ratio = index / tickCount;
    const timeMs = Math.round(currentDurationMs * ratio);
    return { left: ratio * 100, label: formatTimeMs(timeMs), timeMs };
  });

  const insertCurrentCanvasItem = (item: CanvasItem) => {
    item.zIndex = currentItems.length + 1;
    updateCurrentItems((items) => [...items, item]);
    updateCurrentSelection([item.id]);
  };

  const updateSelectedFrame = (nextFrame: CanvasFrame) => {
    if (!selectedRendered) return;
    updateCurrentItems((items) =>
      items.map((item) =>
        item.id === selectedRendered.id
          ? applyFrameUpdateToBoardItem(item, nextFrame, currentPlayheadMs, isTheaterMode)
          : item,
      ),
    );
  };

  const updateSelectedBoardItem = (updater: (item: CanvasBoardItem | CanvasItem) => CanvasBoardItem | CanvasItem) => {
    if (!selectedItem) return;
    updateCurrentItems((items) => items.map((item) => (item.id === selectedItem.id ? updater(item) : item)));
  };

  const updateSelectedTimelineItem = (updater: (item: CanvasItem) => CanvasItem) => {
    if (!selectedTimelineItem) return;
    updateCurrentItems((items) =>
      items.map((item) => (item.id === selectedTimelineItem.id && isTimelineItem(item) ? updater(item) : item)),
    );
  };

  const addKeyframeAtPlayhead = () => {
    if (!selectedTimelineItem) return;
    updateSelectedTimelineItem((item) => ({
      ...item,
      timeline: {
        ...item.timeline,
        keyframes: [
          ...item.timeline.keyframes.filter(
            (keyframe) => !(keyframe.property === activeProperty && Math.abs(keyframe.timeMs - currentPlayheadMs) <= 1),
          ),
          createCanvasKeyframe(
            item,
            activeProperty,
            currentPlayheadMs,
          ),
        ],
      },
    }));
  };

  const exitTheater = () => {
    setScene((current) => {
      if (!current.activeTheaterId) {
        return current;
      }

      return {
        ...current,
        activeTheaterId: null,
        selectedIds: [current.activeTheaterId],
        selectedKeyframeIds: [],
      };
    });
  };

  const enterTheater = (theaterId: string) => {
    setScene((current) => ({
      ...current,
      activeTheaterId: theaterId,
      selectedIds: [],
      selectedKeyframeIds: [],
    }));
    setInspectorOpen(true);
  };

  const createTheater = () => {
    setScene((current) => {
      const theater = createTheaterCanvasItem(
        getViewportCenter(current),
        `Theater ${current.items.filter((item): item is CanvasTheaterItem => item.type === "theater").length + 1}`,
        DEFAULT_CANVAS_DURATION_MS,
      );
      theater.zIndex = current.items.length + 1;
      return {
        ...current,
        activeTheaterId: null,
        items: [...current.items, theater],
        selectedIds: [theater.id],
        selectedKeyframeIds: [],
      };
    });
  };

  const handleSurfacePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const currentScene = sceneRef.current;
    const target = event.target;
    if (
      target instanceof Element &&
      target.closest(
        ".ml-canvas-item, .ml-canvas__floating-toolbar, .ml-canvas__timeline-window, .ml-canvas__rail, .ml-canvas__inspector-drawer, .ml-canvas__overlay-feedback",
      )
    ) {
      return;
    }
    updateCurrentSelection([]);
    setShapePickerOpen(false);
    if (currentScene.activeTool !== "pan") return;
    setViewportDrag({
      startClient: { x: event.clientX, y: event.clientY },
      startViewport: currentScene.viewport,
    });
  };

  const handleSurfaceWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const currentScene = sceneRef.current;
    const currentSurfaceSize = surfaceSizeRef.current;
    const target = event.target;
    if (
      target instanceof Element &&
      target.closest(
        ".ml-canvas__rail, .ml-canvas__inspector-drawer, .ml-canvas__timeline-window, .ml-canvas__floating-toolbar",
      )
    ) {
      return;
    }

    event.preventDefault();
    if (!surfaceRef.current) return;
    const rect = surfaceRef.current.getBoundingClientRect();
    const pointerBefore = clientToWorld({ x: event.clientX, y: event.clientY }, rect, currentScene, currentSurfaceSize);
    scheduleSceneMutation((current) => {
      const scaleFactor = event.deltaY > 0 ? 0.92 : 1.08;
      const nextScale = clampNumber(current.viewport.scale * scaleFactor, 0.2, 3.2);
      const pointerScreenX = event.clientX - rect.left;
      const pointerScreenY = event.clientY - rect.top;
      return {
        ...current,
        viewport: {
          scale: nextScale,
          x: pointerScreenX - currentSurfaceSize.width / 2 - pointerBefore.x * nextScale,
          y: pointerScreenY - currentSurfaceSize.height / 2 - pointerBefore.y * nextScale,
        },
      };
    });
  };

  return (
    <section className="ml-canvas">
      <div className="ml-canvas__workspace">
        <div className="ml-canvas__stage-shell">
          <div
            ref={surfaceRef}
            className="ml-canvas__surface"
            data-active-tool={scene.activeTool}
            onPointerDown={handleSurfacePointerDown}
            onWheel={handleSurfaceWheel}
          >
            <div className="ml-canvas__floating-toolbar">
              <div className="ml-canvas__floating-group">
                <button className="ml-canvas__icon-button" onClick={onBackToLibrary} title="返回素材库" type="button"><ArrowLeft size={18} /></button>
                <button className={`ml-canvas__icon-button${libraryOpen ? " is-active" : ""}`} onClick={() => setLibraryOpen((current) => !current)} type="button"><Layers2 size={18} /></button>
                {!isTheaterMode ? <button className="ml-canvas__icon-button" onClick={createTheater} type="button"><Plus size={18} /></button> : null}
                <button className={`ml-canvas__icon-button${shapePickerOpen ? " is-active" : ""}`} onClick={() => setShapePickerOpen((current) => !current)} type="button"><Square size={18} /></button>
                <button className={`ml-canvas__icon-button${scene.activeTool === "pan" ? " is-active" : ""}`} onClick={() => setScene((current) => ({ ...current, activeTool: "pan" }))} type="button"><Hand size={18} /></button>
                <button className={`ml-canvas__icon-button${scene.activeTool === "select" ? " is-active" : ""}`} onClick={() => setScene((current) => ({ ...current, activeTool: "select" }))} type="button"><BoxSelect size={18} /></button>
              </div>
              <div className="ml-canvas__floating-group">
                <button className="ml-canvas__icon-button" onClick={() => imageInputRef.current?.click()} type="button"><ImagePlus size={18} /></button>
                <button className="ml-canvas__icon-button" onClick={() => videoInputRef.current?.click()} type="button"><Video size={18} /></button>
                <button className="ml-canvas__icon-button" onClick={() => insertCurrentCanvasItem(createTextCanvasItem(getViewportCenter(scene), currentDurationMs))} type="button"><Type size={18} /></button>
                <button className={`ml-canvas__icon-button${inspectorOpen ? " is-active" : ""}`} onClick={() => setInspectorOpen((current) => !current)} type="button"><Move3D size={18} /></button>
                <button className="ml-canvas__icon-button" onClick={() => copyTextToClipboard(JSON.stringify(buildCopiedCanvasScenePayload(scene, entryById), null, 2)).then(() => setFeedback("Scene JSON copied.")).catch(() => setFeedback("Copy failed."))} type="button"><Copy size={18} /></button>
              </div>
              {isTheaterMode ? (
                <div className="ml-canvas__floating-group">
                  <button className="ml-canvas__icon-button" onClick={exitTheater} type="button"><ChevronDown size={18} /></button>
                </div>
              ) : null}
              {shapePickerOpen ? <div className="ml-canvas__shape-picker"><div className="ml-canvas__shape-picker-head"><strong>Shapes</strong><span>Insert to current viewport center</span></div><div className="ml-canvas__shape-grid">{CANVAS_SHAPE_ORDER.map((shapeType) => { const ShapeIcon = shapeType === "circle" || shapeType === "ellipse" ? Circle : shapeType === "triangle" ? Triangle : shapeType === "diamond" ? Diamond : shapeType === "star" ? Star : shapeType === "polygon" ? Hexagon : shapeType === "line" ? Minus : Square; return <button key={shapeType} className="ml-canvas__shape-button" onClick={() => insertCurrentCanvasItem(createShapeCanvasItem(shapeType, getViewportCenter(scene), currentDurationMs))} type="button"><ShapeIcon size={16} /><span>{CANVAS_SHAPE_LABELS[shapeType]}</span></button>; })}</div></div> : null}
            </div>

            <div className="ml-canvas__statusbar"><div className="ml-canvas__status"><span>{isTheaterMode ? `${activeTheater?.title ?? "Theater"}` : "Board"}</span><span>{currentItems.length} items</span><span>{boardTheaterCount} theaters</span><span>{Math.round(scene.viewport.scale * 100)}%</span>{isTheaterMode ? <span>{formatTimeMs(currentPlayheadMs)}</span> : null}</div></div>

            <div className="ml-canvas__world" style={{ height: WORLD_SIZE, left: -WORLD_HALF, top: -WORLD_HALF, transform: `translate(${surfaceSize.width / 2 + scene.viewport.x}px, ${surfaceSize.height / 2 + scene.viewport.y}px) scale(${scene.viewport.scale})`, transformOrigin: "center center", width: WORLD_SIZE } as CSSProperties}>
              <div className="ml-canvas__surface-grid" />
              {visibleRenderedItems.map((item) => {
                const entry = item.type === "material" ? entryById.get(item.materialId) : undefined;
                const assetUrl = item.type === "image" || item.type === "video" ? assetUrls[item.assetId] ?? null : null;
                return (
                  <div
                    key={item.id}
                    className={`ml-canvas-item${currentSelectedIds.includes(item.id) ? " is-selected" : ""}${item.type === "theater" ? " is-theater" : ""}`}
                    onPointerDown={(event) => {
                      event.stopPropagation();
                      updateCurrentSelection([item.id]);
                      if (item.locked) return;
                      setDragState({
                        itemId: item.id,
                        startClient: { x: event.clientX, y: event.clientY },
                        startFrame: item.frame,
                      });
                    }}
                    onDoubleClick={() => {
                      if (item.type === "theater" && !isTheaterMode) {
                        enterTheater(item.id);
                      }
                    }}
                    style={{ height: item.frame.height, left: getCanvasWorldCoordinate(item.frame.x), opacity: item.opacity, top: getCanvasWorldCoordinate(item.frame.y), transform: `rotate(${item.rotation}deg)`, transformOrigin: "center center", width: item.frame.width, zIndex: item.zIndex } as CSSProperties}
                  >
                    {item.type === "theater" ? (
                      <div className="ml-canvas-theater">
                        <div className="ml-canvas-theater__eyebrow">Theater</div>
                        <div className="ml-canvas-theater__title">{item.title}</div>
                        <div className="ml-canvas-theater__meta">
                          <span>{item.scene.items.length} assets</span>
                          <span>{formatTimeMs(item.scene.durationMs)}</span>
                          <span>{item.scene.fps} fps</span>
                        </div>
                        <button className="ml-button ml-button--quiet ml-canvas-theater__enter" onClick={(event) => { event.stopPropagation(); enterTheater(item.id); }} type="button">Enter theater</button>
                      </div>
                    ) : item.type === "material" ? (
                      entry?.preview ? <div className={`ml-canvas-material ${entry.preview.kind === "stage" ? "is-stage" : "is-card"}`}><div className="ml-canvas-material__surface">{entry.preview.render({ t: isTheaterMode ? currentPlayheadMs : 0 })}</div></div> : <div className="ml-canvas-material__empty">No preview</div>
                    ) : item.type === "shape" ? (
                      <div className="ml-canvas-shape"><CanvasShapeSvg className="ml-canvas-shape__svg" geometry={item.geometry} shapeType={item.shapeType} style={item.style} /></div>
                    ) : item.type === "image" || item.type === "video" ? (
                      <div className="ml-canvas-media">{assetUrl ? (item.type === "image" ? <img alt={item.fileName} className="ml-canvas-media__asset" draggable={false} src={assetUrl} style={{ objectFit: item.crop.fit, transform: `translate(${item.crop.offsetX}px, ${item.crop.offsetY}px) scale(${item.crop.zoom})` } as CSSProperties} /> : <div className="ml-canvas-media__video-shell" style={{ objectFit: item.crop.fit, transform: `translate(${item.crop.offsetX}px, ${item.crop.offsetY}px) scale(${item.crop.zoom})` } as CSSProperties}><VideoSurface item={item} playheadMs={currentPlayheadMs} src={assetUrl} /></div>) : <div className="ml-canvas-media__missing">Missing</div>}</div>
                    ) : editingTextId === item.id ? (
                      <textarea autoFocus className="ml-canvas-item__text-editor" onBlur={() => setEditingTextId(null)} onChange={(event) => updateCurrentItems((items) => items.map((candidate) => candidate.id === item.id && candidate.type === "text" ? { ...candidate, content: event.target.value } : candidate))} value={item.content} />
                    ) : (
                      <div className="ml-canvas-text" onDoubleClick={() => setEditingTextId(item.id)} style={{ color: item.style.color, fontSize: `${item.style.fontSize}px`, fontWeight: item.style.fontWeight, justifyContent: item.style.align === "center" ? "center" : item.style.align === "right" ? "flex-end" : "flex-start", textAlign: item.style.align } as CSSProperties}><span>{item.content}</span></div>
                    )}
                    <div className="ml-canvas-item__label"><span>{item.type === "theater" ? item.title : item.type === "material" ? item.title : item.type === "shape" ? item.title : item.type === "text" ? "Text" : item.fileName}</span></div>
                    {currentSelectedIds.includes(item.id) && !item.locked ? (
                      <>
                        {(["nw", "ne", "sw", "se"] as const).map((handle) => (
                          <button
                            key={`${item.id}-${handle}`}
                            className={`ml-canvas-item__resize-handle is-${handle}`}
                            onPointerDown={(event) => {
                              event.stopPropagation();
                              setResizeDrag({
                                handle,
                                itemId: item.id,
                                startClient: { x: event.clientX, y: event.clientY },
                                startFrame: item.frame,
                              });
                            }}
                            type="button"
                          />
                        ))}
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
            {isTheaterMode && currentTimelineWindow ? <div
              className={`ml-canvas__timeline-window${currentTimelineWindow.collapsed ? " is-collapsed" : ""}`}
              style={{ left: currentTimelineWindow.x, top: currentTimelineWindow.y, width: currentTimelineWindow.collapsed ? 240 : 780 }}
            >
              <div
                className="ml-canvas__timeline-head"
                onPointerDown={(event) => {
                  if ((event.target as HTMLElement).closest("button")) return;
                  setTimelineWindowDrag({
                    startClient: { x: event.clientX, y: event.clientY },
                    startWindow: currentTimelineWindow,
                  });
                }}
              >
                <div className="ml-canvas__timeline-controls">
                  <button className="ml-canvas__timeline-icon" onClick={() => updateTheaterScene((current) => ({ ...current, isPlaying: false, playheadMs: 0 }))} type="button"><Rewind size={15} /></button>
                  <button className="ml-canvas__timeline-icon" onClick={() => updateTheaterScene((current) => ({ ...current, isPlaying: !current.isPlaying }))} type="button">{currentIsPlaying ? <Pause size={15} /> : <Play size={15} />}</button>
                </div>
                <div className="ml-canvas__timeline-title"><strong>{activeTheater?.title ?? "Timeline"}</strong><span>{formatTimeMs(currentPlayheadMs)} / {formatTimeMs(currentDurationMs)}</span></div>
                <div className="ml-canvas__timeline-controls">
                  <button className="ml-canvas__timeline-icon" onClick={() => updateTheaterScene((current) => ({ ...current, timelineZoom: clampNumber(current.timelineZoom - 0.2, 0.6, 3) }))} type="button"><Minus size={15} /></button>
                  <button className="ml-canvas__timeline-icon" onClick={() => updateTheaterScene((current) => ({ ...current, timelineZoom: clampNumber(current.timelineZoom + 0.2, 0.6, 3) }))} type="button"><Plus size={15} /></button>
                  <button className="ml-canvas__timeline-icon" onClick={() => updateTheaterScene((current) => ({ ...current, timelineWindow: { ...current.timelineWindow, collapsed: !current.timelineWindow.collapsed } }))} type="button">{currentTimelineWindow.collapsed ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button>
                </div>
              </div>
              {currentTimelineWindow.collapsed ? null : (
                <>
                  <div
                    className="ml-canvas__timeline-ruler"
                    onPointerDown={(event) => setTimelineDrag({ kind: "scrub", rect: event.currentTarget.getBoundingClientRect() })}
                  >
                    {timelineTicks.map((tick) => (
                      <div key={tick.timeMs} className="ml-canvas__timeline-tick" style={{ left: `${tick.left}%` }}>
                        <span>{tick.label}</span>
                      </div>
                    ))}
                    <div className="ml-canvas__timeline-playhead" style={{ left: `${getTimelinePercent(currentPlayheadMs, currentDurationMs)}%` }} />
                  </div>
                  <div className="ml-canvas__timeline-tracks">
                    {sortedTimelineItems.map((item) => {
                        const left = getTimelinePercent(item.timeline.startMs, currentDurationMs);
                        const width = getTimelineSpanPercent(item.timeline, currentDurationMs);
                        return (
                          <div key={`track-${item.id}`} className={`ml-canvas-track${currentSelectedIds.includes(item.id) ? " is-selected" : ""}`}>
                            <button
                              className="ml-canvas-track__meta"
                              onClick={() => updateCurrentSelection([item.id])}
                              type="button"
                            >
                              <strong>{getCanvasItemLabel(item)}</strong>
                              <span>{item.type}</span>
                            </button>
                            <div
                              className="ml-canvas-track__lane"
                              onDoubleClick={() =>
                                updateTheaterScene((current) => ({
                                  ...current,
                                  selectedIds: [item.id],
                                  selectedKeyframeIds: [],
                                  items: current.items.map((candidate) =>
                                    candidate.id === item.id
                                      ? {
                                          ...candidate,
                                          timeline: {
                                            ...candidate.timeline,
                                            keyframes: [
                                              ...candidate.timeline.keyframes,
                                              createCanvasKeyframe(candidate, activeProperty, current.playheadMs),
                                            ],
                                          },
                                        }
                                      : candidate,
                                  ),
                                }))
                              }
                            >
                              <div className="ml-canvas__timeline-playhead ml-canvas__timeline-playhead--track" style={{ left: `${getTimelinePercent(currentPlayheadMs, currentDurationMs)}%` }} />
                              <div
                                className="ml-canvas-track__range"
                                onPointerDown={(event) => {
                                  event.stopPropagation();
                                  updateCurrentSelection([item.id]);
                                  setTimelineDrag({
                                    itemId: item.id,
                                    kind: "range-move",
                                    rect: event.currentTarget.parentElement?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect(),
                                    startClient: { x: event.clientX, y: event.clientY },
                                    startTrack: item.timeline,
                                  });
                                }}
                                style={{ left: `${left}%`, width: `${width}%` }}
                              >
                                <button className="ml-canvas-track__handle is-start" onPointerDown={(event) => { event.stopPropagation(); setTimelineDrag({ itemId: item.id, kind: "range-start", rect: event.currentTarget.parentElement?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect() }); }} type="button" />
                                <span className="ml-canvas-track__range-label">{formatTimeMs(item.timeline.startMs)} - {formatTimeMs(item.timeline.endMs)}</span>
                                <button className="ml-canvas-track__handle is-end" onPointerDown={(event) => { event.stopPropagation(); setTimelineDrag({ itemId: item.id, kind: "range-end", rect: event.currentTarget.parentElement?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect() }); }} type="button" />
                                {item.timeline.keyframes.map((keyframe) => (
                                  <button
                                    key={keyframe.id}
                                    className={`ml-canvas-track__keyframe${currentSelectedKeyframeIds.includes(keyframe.id) ? " is-selected" : ""}`}
                                    onPointerDown={(event) => {
                                      event.stopPropagation();
                                      updateCurrentSelection([item.id], [keyframe.id]);
                                      setTimelineDrag({
                                        keyframeId: keyframe.id,
                                        kind: "keyframe",
                                        rect: event.currentTarget.parentElement?.parentElement?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect(),
                                      });
                                    }}
                                    style={{ left: `${getTimelinePercent(keyframe.timeMs - item.timeline.startMs, item.timeline.endMs - item.timeline.startMs)}%` }}
                                    type="button"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="ml-canvas__timeline-footer">
                    <div>
                      <strong>{selectedKeyframe ? selectedKeyframe.property : activeProperty}</strong>
                      <span>{selectedKeyframe ? `${formatTimeMs(selectedKeyframe.timeMs)} · ${CANVAS_TIMELINE_EASING_LABELS[selectedKeyframe.easing]}` : "Double-click a lane or use inspector to add a keyframe."}</span>
                    </div>
                    {selectedKeyframe ? (
                      <div className="ml-canvas__timeline-footer-actions">
                        <select
                          onChange={(event) =>
                            updateTheaterScene((current) => ({
                              ...current,
                              items: current.items.map((item) => ({
                                ...item,
                                timeline: {
                                  ...item.timeline,
                                  keyframes: item.timeline.keyframes.map((keyframe) =>
                                    keyframe.id === selectedKeyframe.id
                                      ? { ...keyframe, easing: event.target.value as CanvasKeyframe["easing"] }
                                      : keyframe,
                                  ),
                                },
                              })),
                            }))
                          }
                          value={selectedKeyframe.easing}
                        >
                          {Object.entries(CANVAS_TIMELINE_EASING_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                        </select>
                        <button className="ml-button ml-button--ghost" onClick={() => updateTheaterScene((current) => ({ ...current, items: current.items.map((item) => ({ ...item, timeline: { ...item.timeline, keyframes: item.timeline.keyframes.filter((keyframe) => keyframe.id !== selectedKeyframe.id) } })), selectedKeyframeIds: [] }))} type="button">Delete keyframe</button>
                      </div>
                    ) : null}
                  </div>
                </>
              )}
            </div> : null}

            <aside className={`ml-canvas__rail${libraryOpen ? " is-open" : ""}`}><div className="ml-curator__controls"><div className="ml-curator__controls-head"><div className="ml-curator__controls-copy"><h2>{isTheaterMode ? "往剧场里放素材" : "往画布里放内容"}</h2><p>{isTheaterMode ? `当前在 ${activeTheater?.title ?? "Theater"} 内编辑。` : "你可以直接在画布上摆素材，也可以先创建 theater。"}</p></div><button className="ml-curator__collapse-toggle" onClick={() => setFiltersExpanded((current) => !current)} type="button">{filtersExpanded ? "Hide" : "Show"}</button></div><div className="ml-curator__controls-body">{filtersExpanded ? <div className="ml-curator__filter-groups"><label className="ml-curator__search"><Search size={16} /><input onChange={(event) => updateFilter("query", event.target.value)} placeholder="Search material" value={filters.query} /></label><FilterGroup activeValue={filters.role} label="Role" onChange={(value) => updateFilter("role", value)} options={roleOptions} /><FilterGroup activeValue={filters.previewability} label="Preview" onChange={(value) => updateFilter("previewability", value)} options={previewOptions} /><FilterGroup activeValue={filters.reuseMode} label="Reuse" onChange={(value) => updateFilter("reuseMode", value)} options={reuseOptions} /><FilterGroup activeValue={filters.visualWeight} label="Weight" onChange={(value) => updateFilter("visualWeight", value)} options={weightOptions} /></div> : null}<div className="ml-curator__controls-summary"><span>{browseEntries.length} entries</span><button className="ml-link-button" onClick={clearFilters} type="button">Reset</button></div>{!isTheaterMode ? <div className="ml-canvas-panel ml-canvas-panel--compact"><div className="ml-canvas-panel__section"><h3>Create theater</h3><p>Theater is a special board element with its own local scene and timeline.</p><button className="ml-button ml-button--quiet" onClick={createTheater} type="button">New theater</button></div></div> : null}<div className="ml-canvas__entry-groups">{groupedEntries.map((group) => <section key={group.role} className="ml-canvas-group"><div className="ml-canvas-group__head"><span>{SHOWCASE_ROLE_LABELS_ZH[group.role]}</span><em>{group.entries.length}</em></div><div className="ml-canvas-group__list">{group.entries.map((entry) => <article key={entry.id} className="ml-canvas-entry"><EntryThumb entry={entry} /><div className="ml-canvas-entry__body"><div className="ml-canvas-entry__main"><strong>{entry.titleForUi}</strong><p>{getLeadCue(entry)}</p></div><div className="ml-canvas-entry__meta">{[SHOWCASE_ROLE_LABELS_ZH[entry.narrativeRole], entry.hasPreview ? "可预览" : "仅代码", SHOWCASE_WEIGHT_LABELS_ZH[entry.visualWeight]].map((tag) => <span key={`${entry.id}-${tag}`}>{tag}</span>)}</div></div><div className="ml-canvas-entry__actions"><button className="ml-button ml-button--quiet" onClick={() => insertCurrentCanvasItem(createMaterialCanvasItem(entry, getViewportCenter(scene), currentDurationMs))} type="button">{isTheaterMode ? "Add" : "Place"}</button><button className="ml-button ml-button--ghost" onClick={() => onOpenMaterial(entry)} type="button"><ExternalLink size={15} /></button></div></article>)}</div></section>)}</div></div></div></aside>
            <aside className={`ml-canvas__inspector-drawer${inspectorOpen ? " is-open" : ""}`}><div className="ml-canvas__inspector"><div className="ml-canvas-panel">{selectedItem && selectedRendered ? <><h2>{selectedItem.type === "theater" ? selectedItem.title : selectedItem.type === "material" ? selectedItem.title : selectedItem.type === "shape" ? selectedItem.title : selectedItem.type === "text" ? "Text" : selectedItem.fileName}</h2><div className="ml-canvas-inspector__grid"><label><span>X</span><input onChange={(event) => updateSelectedFrame({ ...selectedRendered.frame, x: Number(event.target.value) || 0 })} type="number" value={formatNumericValue(selectedRendered.frame.x)} /></label><label><span>Y</span><input onChange={(event) => updateSelectedFrame({ ...selectedRendered.frame, y: Number(event.target.value) || 0 })} type="number" value={formatNumericValue(selectedRendered.frame.y)} /></label><label><span>W</span><input onChange={(event) => updateSelectedFrame({ ...selectedRendered.frame, width: Number(event.target.value) || 0 })} type="number" value={formatNumericValue(selectedRendered.frame.width)} /></label><label><span>H</span><input onChange={(event) => updateSelectedFrame({ ...selectedRendered.frame, height: Number(event.target.value) || 0 })} type="number" value={formatNumericValue(selectedRendered.frame.height)} /></label></div><div className="ml-canvas-inspector__grid"><label><span>Rotation</span><input onChange={(event) => updateSelectedBoardItem((item) => ({ ...item, rotation: Number(event.target.value) || 0 }))} type="number" value={formatNumericValue(selectedRendered.rotation)} /></label><label><span>Opacity</span><input max={1} min={0.05} onChange={(event) => updateSelectedBoardItem((item) => ({ ...item, opacity: clampNumber(Number(event.target.value) || 1, 0.05, 1) }))} step={0.01} type="number" value={roundToStep(selectedRendered.opacity, 0.01)} /></label></div>{selectedTheaterItem ? <div className="ml-canvas-panel__section"><h3>Theater</h3><div className="ml-canvas-inspector__grid"><label><span>Duration</span><input onChange={(event) => updateSelectedBoardItem((item) => item.type === "theater" ? { ...item, scene: { ...item.scene, durationMs: clampNumber(Number(event.target.value) || DEFAULT_CANVAS_DURATION_MS, 2000, 120000) } } : item)} type="number" value={selectedTheaterItem.scene.durationMs} /></label><label><span>FPS</span><input onChange={(event) => updateSelectedBoardItem((item) => item.type === "theater" ? { ...item, scene: { ...item.scene, fps: clampNumber(Number(event.target.value) || 30, 12, 60) } } : item)} type="number" value={selectedTheaterItem.scene.fps} /></label></div><div className="ml-canvas-panel__actions"><button className="ml-button ml-button--quiet" onClick={() => enterTheater(selectedTheaterItem.id)} type="button">Enter theater</button></div></div> : null}{selectedItem.type === "shape" ? <div className="ml-canvas-inspector__grid"><label><span>Fill</span><input onChange={(event) => updateSelectedBoardItem((item) => item.type === "shape" ? { ...item, style: { ...item.style, fillColor: event.target.value } } : item)} type="color" value={selectedItem.style.fillColor} /></label><label><span>Stroke</span><input onChange={(event) => updateSelectedBoardItem((item) => item.type === "shape" ? { ...item, style: { ...item.style, strokeColor: event.target.value } } : item)} type="color" value={selectedItem.style.strokeColor} /></label></div> : null}{selectedItem.type === "text" ? <textarea onChange={(event) => updateSelectedBoardItem((item) => item.type === "text" ? { ...item, content: event.target.value } : item)} value={selectedItem.content} /> : null}{isTheaterMode && selectedTimelineItem && selectedTimelineRendered ? <div className="ml-canvas-panel__section"><h3>Timeline</h3><div className="ml-canvas-inspector__grid"><label><span>Start</span><input onChange={(event) => updateSelectedTimelineItem((item) => updateTrackRange(item, { startMs: Number(event.target.value) || 0 }, currentDurationMs))} type="number" value={selectedTimelineItem.timeline.startMs} /></label><label><span>End</span><input onChange={(event) => updateSelectedTimelineItem((item) => updateTrackRange(item, { endMs: Number(event.target.value) || currentDurationMs }, currentDurationMs))} type="number" value={selectedTimelineItem.timeline.endMs} /></label><label><span>Property</span><select onChange={(event) => setActiveProperty(event.target.value as CanvasAnimatableProperty)} value={activeProperty}>{CANVAS_ANIMATABLE_PROPERTIES.map((property) => <option key={property} value={property}>{property}</option>)}</select></label><label><span>Current</span><input readOnly type="number" value={Math.round(currentPlayheadMs)} /></label></div><div className="ml-canvas-panel__actions"><button className="ml-button ml-button--quiet" onClick={addKeyframeAtPlayhead} type="button">Add keyframe</button><button className="ml-button ml-button--ghost" onClick={() => updateSelectedTimelineItem((item) => extendTrack(item, 500, currentDurationMs))} type="button">Extend +0.5s</button></div></div> : null}</> : <>{isTheaterMode ? <><h2>{activeTheater?.title ?? "Theater"}</h2><div className="ml-canvas-inspector__grid"><label><span>Duration</span><input onChange={(event) => updateTheaterScene((current) => ({ ...current, durationMs: clampNumber(Number(event.target.value) || DEFAULT_CANVAS_DURATION_MS, 2000, 120000) }))} type="number" value={currentDurationMs} /></label><label><span>FPS</span><input onChange={(event) => updateTheaterScene((current) => ({ ...current, fps: clampNumber(Number(event.target.value) || 30, 12, 60) }))} type="number" value={activeTheater?.scene.fps ?? 30} /></label></div><div className="ml-canvas-panel__actions"><button className="ml-button ml-button--ghost" onClick={exitTheater} type="button">Back to board</button></div></> : <><h2>Board</h2><div className="ml-canvas-panel__section"><p>Create theaters as timeline-enabled containers, or place loose assets directly on the board.</p><div className="ml-canvas-panel__actions"><button className="ml-button ml-button--quiet" onClick={createTheater} type="button">New theater</button></div></div></>}</>}</div></div></aside>

            {feedback ? <div className="ml-canvas__overlay-feedback"><p className="ml-canvas__feedback">{feedback}</p></div> : null}
            <input ref={imageInputRef} accept="image/*" hidden multiple onChange={(event) => { if (event.target.files?.length) { void handleFiles(event.target.files, "image"); event.target.value = ""; } }} type="file" />
            <input ref={videoInputRef} accept="video/*" hidden multiple onChange={(event) => { if (event.target.files?.length) { void handleFiles(event.target.files, "video"); event.target.value = ""; } }} type="file" />
          </div>
        </div>
      </div>
    </section>
  );
}

async function createImageMeta(file: File) {
  const url = URL.createObjectURL(file);
  try {
    return await new Promise<{ height: number; width: number }>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({ height: image.height, width: image.width });
      image.onerror = () => reject(new Error("Image metadata failed"));
      image.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function createVideoMeta(file: File) {
  const url = URL.createObjectURL(file);
  try {
    return await new Promise<{ durationMs: number; height: number; width: number }>((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => resolve({ durationMs: Number.isFinite(video.duration) ? Math.round(video.duration * 1000) : 0, height: video.videoHeight || 1, width: video.videoWidth || 1 });
      video.onerror = () => reject(new Error("Video metadata failed"));
      video.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}
