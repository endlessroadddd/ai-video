import type { MaterialNarrativeRole } from "./material-catalog";
import type { ShowcaseBrowseEntry } from "./showcase-copy";
import { buildMaterialSelectionPath, clampNumber } from "./showcase-shared";

export type CanvasTool = "pan" | "select";
export type CanvasFitMode = "contain" | "cover";
export type CanvasTextAlign = "left" | "center" | "right";
export type CanvasTimelineEasing = "easeIn" | "easeInOut" | "easeOut" | "linear";
export type CanvasAnimatableProperty = "height" | "opacity" | "rotation" | "width" | "x" | "y";
export type CanvasShapeType =
  | "arrow"
  | "circle"
  | "diamond"
  | "ellipse"
  | "line"
  | "polygon"
  | "rectangle"
  | "roundedRectangle"
  | "speechBubble"
  | "star"
  | "triangle";
export type CanvasShapeStrokeStyle = "dashed" | "solid";
export type CanvasShapeMarker = "arrow" | "dot" | "none";
export type CanvasShapeTailSide = "bottom" | "left" | "right" | "top";

export type CanvasPoint = {
  x: number;
  y: number;
};

export type CanvasFrame = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export type CanvasViewport = {
  scale: number;
  x: number;
  y: number;
};

export type CanvasCrop = {
  fit: CanvasFitMode;
  offsetX: number;
  offsetY: number;
  zoom: number;
};

export type CanvasTextStyle = {
  align: CanvasTextAlign;
  color: string;
  fontSize: number;
  fontWeight: number;
};

export type CanvasKeyframe = {
  easing: CanvasTimelineEasing;
  id: string;
  property: CanvasAnimatableProperty;
  timeMs: number;
  value: number;
};

export type CanvasTimelineTrack = {
  endMs: number;
  itemId: string;
  keyframes: CanvasKeyframe[];
  startMs: number;
};

export type CanvasTimelineWindowState = {
  collapsed: boolean;
  x: number;
  y: number;
};

export type CanvasShapeStyle = {
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeOpacity: number;
  strokeWidth: number;
};

export type CanvasShapeGeometry = {
  cornerRadius: number;
  endMarker: CanvasShapeMarker;
  innerRadiusRatio: number;
  points: number;
  sides: number;
  startMarker: CanvasShapeMarker;
  strokeStyle: CanvasShapeStrokeStyle;
  tailOffset: number;
  tailSide: CanvasShapeTailSide;
};

type CanvasItemBase = {
  createdAt: string;
  frame: CanvasFrame;
  id: string;
  locked: boolean;
  opacity: number;
  rotation: number;
  timeline: CanvasTimelineTrack;
  zIndex: number;
};

export type CanvasMaterialItem = CanvasItemBase & {
  aspectRatio: number;
  materialId: string;
  materialPath: string;
  narrativeRole: MaterialNarrativeRole;
  preserveAspect: boolean;
  previewKind: "card" | "compact" | "phone" | "stage" | null;
  title: string;
  type: "material";
};

type CanvasUploadItemBase = CanvasItemBase & {
  assetId: string;
  crop: CanvasCrop;
  dimensions: { height: number; width: number };
  fileName: string;
  mimeType: string;
  virtualPath: string;
};

export type CanvasImageItem = CanvasUploadItemBase & {
  aspectRatio: number;
  type: "image";
};

export type CanvasVideoItem = CanvasUploadItemBase & {
  aspectRatio: number;
  durationMs: number | null;
  type: "video";
};

export type CanvasTextItem = CanvasItemBase & {
  content: string;
  style: CanvasTextStyle;
  type: "text";
};

export type CanvasShapeItem = CanvasItemBase & {
  geometry: CanvasShapeGeometry;
  shapeType: CanvasShapeType;
  style: CanvasShapeStyle;
  title: string;
  type: "shape";
};

export type CanvasItem =
  | CanvasImageItem
  | CanvasMaterialItem
  | CanvasShapeItem
  | CanvasTextItem
  | CanvasVideoItem;

export type CanvasTheaterSceneState = {
  durationMs: number;
  fps: number;
  isPlaying: boolean;
  items: CanvasItem[];
  playheadMs: number;
  selectedIds: string[];
  selectedKeyframeIds: string[];
  timelineWindow: CanvasTimelineWindowState;
  timelineZoom: number;
  updatedAt: string;
};

export type CanvasTheaterItem = {
  aspectRatio: number;
  createdAt: string;
  frame: CanvasFrame;
  id: string;
  locked: boolean;
  opacity: number;
  rotation: number;
  scene: CanvasTheaterSceneState;
  title: string;
  type: "theater";
  zIndex: number;
};

export type CanvasBoardItem = CanvasItem | CanvasTheaterItem;

export type CanvasAssetRecord = {
  assetId: string;
  durationMs: number | null;
  fileName: string;
  height: number;
  mimeType: string;
  savedAt: string;
  type: "image" | "video";
  virtualPath: string;
  width: number;
};

export type CanvasSceneState = {
  activeTheaterId: string | null;
  activeTool: CanvasTool;
  assetRecords: CanvasAssetRecord[];
  durationMs: number;
  fps: number;
  isPlaying: boolean;
  items: CanvasBoardItem[];
  playheadMs: number;
  sceneId: string;
  selectedIds: string[];
  selectedKeyframeIds: string[];
  timelineWindow: CanvasTimelineWindowState;
  timelineZoom: number;
  updatedAt: string;
  viewport: CanvasViewport;
};

type CopiedCanvasTimeline = {
  endMs: number;
  keyframes: CanvasKeyframe[];
  startMs: number;
};

type CopiedCanvasMaterialItem = {
  frame: CanvasFrame;
  locked: boolean;
  materialId: string;
  materialPath: string;
  rotation: number;
  timeline: CopiedCanvasTimeline;
  title: string;
  type: "material";
  zIndex: number;
};

type CopiedCanvasUploadItem = {
  assetId: string;
  crop: CanvasCrop;
  dimensions: { height: number; width: number };
  durationMs?: number;
  fileName: string;
  frame: CanvasFrame;
  mimeType: string;
  rotation: number;
  timeline: CopiedCanvasTimeline;
  type: "image" | "video";
  virtualPath: string;
  zIndex: number;
};

type CopiedCanvasTextItem = {
  content: string;
  frame: CanvasFrame;
  rotation: number;
  style: CanvasTextStyle;
  timeline: CopiedCanvasTimeline;
  type: "text";
  zIndex: number;
};

type CopiedCanvasShapeItem = {
  frame: CanvasFrame;
  geometry: CanvasShapeGeometry;
  locked: boolean;
  opacity: number;
  rotation: number;
  shapeType: CanvasShapeType;
  style: CanvasShapeStyle;
  timeline: CopiedCanvasTimeline;
  title: string;
  type: "shape";
  zIndex: number;
};

type CopiedCanvasTheaterScenePayload = {
  durationMs: number;
  fps: number;
  items: Array<CopiedCanvasMaterialItem | CopiedCanvasShapeItem | CopiedCanvasTextItem | CopiedCanvasUploadItem>;
  playheadMs: number;
};

type CopiedCanvasTheaterItem = {
  frame: CanvasFrame;
  id: string;
  locked: boolean;
  opacity: number;
  rotation: number;
  scene: CopiedCanvasTheaterScenePayload;
  title: string;
  type: "theater";
  zIndex: number;
};

type CopiedCanvasBoardFreeItem =
  | ({
      opacity: number;
    } & CopiedCanvasShapeItem)
  | ({
      opacity: number;
    } & CopiedCanvasTextItem)
  | ({
      opacity: number;
    } & CopiedCanvasUploadItem)
  | ({
      opacity: number;
    } & CopiedCanvasMaterialItem);

export type CopiedCanvasScenePayload = {
  boardItems: Array<CopiedCanvasBoardFreeItem | CopiedCanvasTheaterItem>;
  materials: Array<{
    materialId: string;
    materialPath: string;
    narrativeRole: MaterialNarrativeRole;
    title: string;
  }>;
  sceneId: string;
  sceneIntent: string;
  shapes: Array<{
    shapeType: CanvasShapeType;
    style: CanvasShapeStyle;
    title: string;
  }>;
  theaters: Array<CopiedCanvasTheaterItem>;
  uploads: Array<{
    assetId: string;
    durationMs: number | null;
    fileName: string;
    mimeType: string;
    type: "image" | "video";
    virtualPath: string;
  }>;
  version: "canvas-scene.v3";
  viewport: CanvasViewport;
};

type SerializedCanvasSceneState = {
  activeTheaterId?: string | null;
  activeTool?: CanvasTool;
  assetRecords?: CanvasAssetRecord[];
  durationMs?: number;
  fps?: number;
  isPlaying?: boolean;
  items?: Array<CanvasBoardItem | CanvasItem>;
  playheadMs?: number;
  sceneId?: string;
  selectedIds?: string[];
  selectedKeyframeIds?: string[];
  timelineWindow?: Partial<CanvasTimelineWindowState>;
  timelineZoom?: number;
  updatedAt?: string;
  viewport?: Partial<CanvasViewport>;
};

export const DEFAULT_CANVAS_DURATION_MS = 15000;
export const DEFAULT_CANVAS_FPS = 30;
export const CANVAS_ANIMATABLE_PROPERTIES: CanvasAnimatableProperty[] = [
  "x",
  "y",
  "width",
  "height",
  "rotation",
  "opacity",
];
export const CANVAS_TIMELINE_EASING_LABELS: Record<CanvasTimelineEasing, string> = {
  easeIn: "Ease In",
  easeInOut: "Ease In Out",
  easeOut: "Ease Out",
  linear: "Linear",
};
export const CANVAS_SHAPE_ORDER: CanvasShapeType[] = [
  "rectangle",
  "roundedRectangle",
  "circle",
  "ellipse",
  "triangle",
  "diamond",
  "star",
  "polygon",
  "line",
  "arrow",
  "speechBubble",
];
export const CANVAS_SHAPE_LABELS: Record<CanvasShapeType, string> = {
  arrow: "Arrow",
  circle: "Circle",
  diamond: "Diamond",
  ellipse: "Ellipse",
  line: "Line",
  polygon: "Polygon",
  rectangle: "Rectangle",
  roundedRectangle: "Rounded Rectangle",
  speechBubble: "Speech Bubble",
  star: "Star",
  triangle: "Triangle",
};

const DEFAULT_VIEWPORT: CanvasViewport = {
  scale: 1,
  x: 0,
  y: 0,
};

const DEFAULT_TEXT_STYLE: CanvasTextStyle = {
  align: "left",
  color: "#0f172a",
  fontSize: 34,
  fontWeight: 620,
};

const DEFAULT_TIMELINE_WINDOW: CanvasTimelineWindowState = {
  collapsed: false,
  x: 0,
  y: 0,
};

const DEFAULT_SHAPE_STYLE: CanvasShapeStyle = {
  fillColor: "#ffffff",
  fillOpacity: 1,
  strokeColor: "#0f172a",
  strokeOpacity: 1,
  strokeWidth: 3,
};

function createId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createTimestamp(): string {
  return new Date().toISOString();
}

function centerFrame(point: CanvasPoint, width: number, height: number): CanvasFrame {
  return {
    height,
    width,
    x: point.x - width / 2,
    y: point.y - height / 2,
  };
}

function clampTimelineTime(value: number, durationMs: number): number {
  return clampNumber(Number(value) || 0, 0, Math.max(durationMs, 1000));
}

function clampFrameValue(field: keyof CanvasFrame, value: number): number {
  if (field === "width" || field === "height") {
    return clampNumber(Number(value) || 0, 40, 2400);
  }

  return Number(value) || 0;
}

function getDefaultTrack(itemId: string, durationMs: number): CanvasTimelineTrack {
  return {
    endMs: durationMs,
    itemId,
    keyframes: [],
    startMs: 0,
  };
}

export function createDefaultTheaterScene(
  durationMs = DEFAULT_CANVAS_DURATION_MS,
): CanvasTheaterSceneState {
  return {
    durationMs,
    fps: DEFAULT_CANVAS_FPS,
    isPlaying: false,
    items: [],
    playheadMs: 0,
    selectedIds: [],
    selectedKeyframeIds: [],
    timelineWindow: { ...DEFAULT_TIMELINE_WINDOW },
    timelineZoom: 1,
    updatedAt: createTimestamp(),
  };
}

function createKeyframe(
  property: CanvasAnimatableProperty,
  value: number,
  timeMs: number,
): CanvasKeyframe {
  return {
    easing: "easeInOut",
    id: createId("keyframe"),
    property,
    timeMs,
    value,
  };
}

function getDefaultShapeGeometry(shapeType: CanvasShapeType): CanvasShapeGeometry {
  switch (shapeType) {
    case "roundedRectangle":
      return {
        cornerRadius: 24,
        endMarker: "none",
        innerRadiusRatio: 0.48,
        points: 5,
        sides: 6,
        startMarker: "none",
        strokeStyle: "solid",
        tailOffset: 0.5,
        tailSide: "bottom",
      };
    case "star":
      return {
        cornerRadius: 18,
        endMarker: "none",
        innerRadiusRatio: 0.46,
        points: 5,
        sides: 6,
        startMarker: "none",
        strokeStyle: "solid",
        tailOffset: 0.5,
        tailSide: "bottom",
      };
    case "polygon":
      return {
        cornerRadius: 18,
        endMarker: "none",
        innerRadiusRatio: 0.5,
        points: 5,
        sides: 6,
        startMarker: "none",
        strokeStyle: "solid",
        tailOffset: 0.5,
        tailSide: "bottom",
      };
    case "line":
      return {
        cornerRadius: 0,
        endMarker: "none",
        innerRadiusRatio: 0.5,
        points: 5,
        sides: 6,
        startMarker: "none",
        strokeStyle: "solid",
        tailOffset: 0.5,
        tailSide: "bottom",
      };
    case "arrow":
      return {
        cornerRadius: 0,
        endMarker: "arrow",
        innerRadiusRatio: 0.5,
        points: 5,
        sides: 6,
        startMarker: "none",
        strokeStyle: "solid",
        tailOffset: 0.5,
        tailSide: "bottom",
      };
    case "speechBubble":
      return {
        cornerRadius: 20,
        endMarker: "none",
        innerRadiusRatio: 0.5,
        points: 5,
        sides: 6,
        startMarker: "none",
        strokeStyle: "solid",
        tailOffset: 0.55,
        tailSide: "bottom",
      };
    default:
      return {
        cornerRadius: 18,
        endMarker: "none",
        innerRadiusRatio: 0.5,
        points: 5,
        sides: 6,
        startMarker: "none",
        strokeStyle: "solid",
        tailOffset: 0.5,
        tailSide: "bottom",
      };
  }
}

function getDefaultShapeSize(shapeType: CanvasShapeType): { height: number; width: number } {
  switch (shapeType) {
    case "circle":
      return { height: 180, width: 180 };
    case "diamond":
    case "polygon":
    case "star":
    case "triangle":
      return { height: 200, width: 200 };
    case "ellipse":
      return { height: 170, width: 240 };
    case "line":
    case "arrow":
      return { height: 100, width: 260 };
    case "speechBubble":
      return { height: 180, width: 260 };
    default:
      return { height: 160, width: 240 };
  }
}

function getDefaultMaterialSize(entry: ShowcaseBrowseEntry): { height: number; width: number } {
  switch (entry.preview?.kind) {
    case "stage":
      return { height: 420, width: 720 };
    case "phone":
      return { height: 640, width: 340 };
    case "compact":
      return { height: 220, width: 280 };
    case "card":
      return { height: 260, width: 360 };
    default:
      return { height: 260, width: 360 };
  }
}

function coerceFrame(frame: CanvasFrame): CanvasFrame {
  return {
    height: clampFrameValue("height", frame.height),
    width: clampFrameValue("width", frame.width),
    x: Number(frame.x) || 0,
    y: Number(frame.y) || 0,
  };
}

function coerceCrop(crop: CanvasCrop | undefined): CanvasCrop {
  return {
    fit: crop?.fit === "contain" ? "contain" : "cover",
    offsetX: clampNumber(crop?.offsetX ?? 0, -2000, 2000),
    offsetY: clampNumber(crop?.offsetY ?? 0, -2000, 2000),
    zoom: clampNumber(crop?.zoom ?? 1, 0.25, 4),
  };
}

function coerceTextStyle(style: CanvasTextStyle | undefined): CanvasTextStyle {
  return {
    align: style?.align === "center" || style?.align === "right" ? style.align : "left",
    color: style?.color || DEFAULT_TEXT_STYLE.color,
    fontSize: clampNumber(style?.fontSize ?? DEFAULT_TEXT_STYLE.fontSize, 12, 160),
    fontWeight: clampNumber(style?.fontWeight ?? DEFAULT_TEXT_STYLE.fontWeight, 300, 800),
  };
}

function coerceShapeStyle(style: CanvasShapeStyle | undefined): CanvasShapeStyle {
  return {
    fillColor: style?.fillColor || DEFAULT_SHAPE_STYLE.fillColor,
    fillOpacity: clampNumber(style?.fillOpacity ?? DEFAULT_SHAPE_STYLE.fillOpacity, 0, 1),
    strokeColor: style?.strokeColor || DEFAULT_SHAPE_STYLE.strokeColor,
    strokeOpacity: clampNumber(style?.strokeOpacity ?? DEFAULT_SHAPE_STYLE.strokeOpacity, 0, 1),
    strokeWidth: clampNumber(style?.strokeWidth ?? DEFAULT_SHAPE_STYLE.strokeWidth, 0, 24),
  };
}

function coerceShapeGeometry(
  geometry: CanvasShapeGeometry | undefined,
  shapeType: CanvasShapeType,
): CanvasShapeGeometry {
  const fallback = getDefaultShapeGeometry(shapeType);
  return {
    cornerRadius: clampNumber(geometry?.cornerRadius ?? fallback.cornerRadius, 0, 80),
    endMarker:
      geometry?.endMarker === "arrow" || geometry?.endMarker === "dot" ? geometry.endMarker : fallback.endMarker,
    innerRadiusRatio: clampNumber(geometry?.innerRadiusRatio ?? fallback.innerRadiusRatio, 0.1, 0.9),
    points: clampNumber(geometry?.points ?? fallback.points, 4, 12),
    sides: clampNumber(geometry?.sides ?? fallback.sides, 3, 12),
    startMarker:
      geometry?.startMarker === "arrow" || geometry?.startMarker === "dot"
        ? geometry.startMarker
        : fallback.startMarker,
    strokeStyle: geometry?.strokeStyle === "dashed" ? "dashed" : "solid",
    tailOffset: clampNumber(geometry?.tailOffset ?? fallback.tailOffset, 0.15, 0.85),
    tailSide:
      geometry?.tailSide === "left" ||
      geometry?.tailSide === "right" ||
      geometry?.tailSide === "top"
        ? geometry.tailSide
        : fallback.tailSide,
  };
}

function coerceTimelineTrack(
  track: CanvasTimelineTrack | undefined,
  itemId: string,
  durationMs: number,
): CanvasTimelineTrack {
  const fallback = getDefaultTrack(itemId, durationMs);
  const startMs = clampTimelineTime(track?.startMs ?? fallback.startMs, durationMs);
  const endMs = clampTimelineTime(track?.endMs ?? fallback.endMs, durationMs);
  const keyframes = Array.isArray(track?.keyframes)
    ? track.keyframes
        .filter((keyframe) => CANVAS_ANIMATABLE_PROPERTIES.includes(keyframe.property))
        .map((keyframe) => ({
          easing: (
            keyframe.easing === "easeIn" ||
            keyframe.easing === "easeOut" ||
            keyframe.easing === "easeInOut"
              ? keyframe.easing
              : "linear"
          ) as CanvasKeyframe["easing"],
          id: keyframe.id || createId("keyframe"),
          property: keyframe.property,
          timeMs: clampTimelineTime(keyframe.timeMs, durationMs),
          value: Number(keyframe.value) || 0,
        }))
        .sort((left, right) => left.timeMs - right.timeMs)
    : [];

  return {
    endMs: clampNumber(Math.max(endMs, startMs + 100), startMs + 100, durationMs),
    itemId,
    keyframes,
    startMs: Math.min(startMs, endMs),
  };
}

function getBaseTimelineValue(item: CanvasItem, property: CanvasAnimatableProperty): number {
  switch (property) {
    case "x":
      return item.frame.x;
    case "y":
      return item.frame.y;
    case "width":
      return item.frame.width;
    case "height":
      return item.frame.height;
    case "rotation":
      return item.rotation;
    case "opacity":
      return item.opacity;
    default:
      return 0;
  }
}

function applyEasing(progress: number, easing: CanvasTimelineEasing): number {
  const clamped = clampNumber(progress, 0, 1);

  switch (easing) {
    case "easeIn":
      return clamped * clamped * clamped;
    case "easeOut":
      return 1 - (1 - clamped) * (1 - clamped) * (1 - clamped);
    case "easeInOut":
      return clamped < 0.5
        ? 4 * clamped * clamped * clamped
        : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
    case "linear":
    default:
      return clamped;
  }
}

function interpolateTimelineValue(
  keyframes: CanvasKeyframe[],
  baseValue: number,
  timeMs: number,
): number {
  if (!keyframes.length) {
    return baseValue;
  }

  if (timeMs <= keyframes[0]!.timeMs) {
    return keyframes[0]!.value;
  }

  const lastKeyframe = keyframes[keyframes.length - 1]!;
  if (timeMs >= lastKeyframe.timeMs) {
    return lastKeyframe.value;
  }

  for (let index = 0; index < keyframes.length - 1; index += 1) {
    const left = keyframes[index]!;
    const right = keyframes[index + 1]!;
    if (timeMs < left.timeMs || timeMs > right.timeMs) {
      continue;
    }

    const progress = (timeMs - left.timeMs) / Math.max(right.timeMs - left.timeMs, 1);
    const eased = applyEasing(progress, right.easing);
    return left.value + (right.value - left.value) * eased;
  }

  return baseValue;
}

function normalizeItem(item: CanvasItem, durationMs: number): CanvasItem {
  const base = {
    createdAt: item.createdAt || createTimestamp(),
    frame: coerceFrame(item.frame),
    id: item.id,
    locked: Boolean(item.locked),
    opacity: clampNumber(item.opacity ?? 1, 0.1, 1),
    rotation: Number(item.rotation) || 0,
    timeline: coerceTimelineTrack(item.timeline, item.id, durationMs),
    zIndex: Number(item.zIndex) || 0,
  };

  if (item.type === "material") {
    return {
      ...base,
      aspectRatio: clampNumber(item.aspectRatio || item.frame.width / item.frame.height || 1, 0.25, 6),
      materialId: item.materialId,
      materialPath: item.materialPath,
      narrativeRole: item.narrativeRole,
      preserveAspect: item.preserveAspect !== false,
      previewKind: item.previewKind ?? null,
      title: item.title,
      type: "material",
    };
  }

  if (item.type === "text") {
    return {
      ...base,
      content: item.content || "鍙屽嚮缂栬緫鏂囧瓧",
      style: coerceTextStyle(item.style),
      type: "text",
    };
  }

  if (item.type === "shape") {
    return {
      ...base,
      geometry: coerceShapeGeometry(item.geometry, item.shapeType),
      shapeType: item.shapeType,
      style: coerceShapeStyle(item.style),
      title: item.title || CANVAS_SHAPE_LABELS[item.shapeType],
      type: "shape",
    };
  }

  return {
    ...base,
    aspectRatio: clampNumber(item.aspectRatio || item.frame.width / item.frame.height || 1, 0.1, 6),
    assetId: item.assetId,
    crop: coerceCrop(item.crop),
    dimensions: {
      height: clampNumber(item.dimensions.height || item.frame.height || 1, 1, 4000),
      width: clampNumber(item.dimensions.width || item.frame.width || 1, 1, 4000),
    },
    durationMs: item.type === "video" ? item.durationMs ?? null : undefined,
    fileName: item.fileName,
    mimeType: item.mimeType,
    type: item.type,
    virtualPath: item.virtualPath,
  } as CanvasItem;
}

function normalizeTheaterScene(
  raw:
    | (Partial<CanvasTheaterSceneState> & {
        timelineWindow?: Partial<CanvasTimelineWindowState>;
      })
    | null
    | undefined,
): CanvasTheaterSceneState {
  const fallback = createDefaultTheaterScene();
  const durationMs = clampTimelineTime(raw?.durationMs ?? fallback.durationMs, 120000);
  const items = Array.isArray(raw?.items) ? raw.items.map((item) => normalizeItem(item, durationMs)) : [];
  const keyframeIds = new Set(items.flatMap((item) => item.timeline.keyframes.map((keyframe) => keyframe.id)));

  return {
    durationMs,
    fps: clampNumber(raw?.fps ?? fallback.fps, 12, 60),
    isPlaying: false,
    items,
    playheadMs: clampTimelineTime(raw?.playheadMs ?? 0, durationMs),
    selectedIds: Array.isArray(raw?.selectedIds)
      ? raw.selectedIds.filter((selectedId) => items.some((item) => item.id === selectedId))
      : [],
    selectedKeyframeIds: Array.isArray(raw?.selectedKeyframeIds)
      ? raw.selectedKeyframeIds.filter((keyframeId) => keyframeIds.has(keyframeId))
      : [],
    timelineWindow: {
      collapsed: Boolean(raw?.timelineWindow?.collapsed),
      x: Number(raw?.timelineWindow?.x) || 0,
      y: Number(raw?.timelineWindow?.y) || 0,
    },
    timelineZoom: clampNumber(raw?.timelineZoom ?? 1, 0.6, 3),
    updatedAt: raw?.updatedAt || createTimestamp(),
  };
}

function normalizeBoardItem(item: CanvasBoardItem | CanvasItem): CanvasBoardItem {
  if ("type" in item && item.type === "theater") {
    return {
      aspectRatio: clampNumber(item.aspectRatio || item.frame.width / item.frame.height || 1, 0.25, 6),
      createdAt: item.createdAt || createTimestamp(),
      frame: coerceFrame(item.frame),
      id: item.id,
      locked: Boolean(item.locked),
      opacity: clampNumber(item.opacity ?? 1, 0.1, 1),
      rotation: Number(item.rotation) || 0,
      scene: normalizeTheaterScene(item.scene),
      title: item.title || "Theater",
      type: "theater",
      zIndex: Number(item.zIndex) || 0,
    };
  }

  const durationMs =
    "timeline" in item && item.timeline ? item.timeline.endMs || DEFAULT_CANVAS_DURATION_MS : DEFAULT_CANVAS_DURATION_MS;
  return normalizeItem(item as CanvasItem, Math.max(durationMs, DEFAULT_CANVAS_DURATION_MS));
}

function cloneTrackForPayload(track: CanvasTimelineTrack): CopiedCanvasTimeline {
  return {
    endMs: track.endMs,
    keyframes: track.keyframes.map((keyframe) => ({ ...keyframe })),
    startMs: track.startMs,
  };
}

export function createDefaultCanvasScene(): CanvasSceneState {
  return {
    activeTheaterId: null,
    activeTool: "pan",
    assetRecords: [],
    durationMs: DEFAULT_CANVAS_DURATION_MS,
    fps: DEFAULT_CANVAS_FPS,
    isPlaying: false,
    items: [],
    playheadMs: 0,
    sceneId: "default",
    selectedIds: [],
    selectedKeyframeIds: [],
    timelineWindow: { ...DEFAULT_TIMELINE_WINDOW },
    timelineZoom: 1,
    updatedAt: createTimestamp(),
    viewport: DEFAULT_VIEWPORT,
  };
}

export function normalizeCanvasScene(
  raw: SerializedCanvasSceneState | null | undefined,
): CanvasSceneState {
  const fallback = createDefaultCanvasScene();
  if (!raw) {
    return fallback;
  }

  const assetRecords = Array.isArray(raw.assetRecords)
    ? raw.assetRecords.map((record) => ({
        assetId: record.assetId,
        durationMs: record.durationMs ?? null,
        fileName: record.fileName,
        height: clampNumber(record.height || 1, 1, 4000),
        mimeType: record.mimeType,
        savedAt: record.savedAt || createTimestamp(),
        type: (record.type === "video" ? "video" : "image") as "image" | "video",
        virtualPath: record.virtualPath,
        width: clampNumber(record.width || 1, 1, 4000),
      }))
    : [];

  const hasExplicitTheaterItems =
    Array.isArray(raw.items) &&
    raw.items.some((item) => Boolean(item) && typeof item === "object" && "type" in item && item.type === "theater");

  const items: CanvasBoardItem[] = hasExplicitTheaterItems
    ? (raw.items ?? []).map((item) => normalizeBoardItem(item as CanvasBoardItem))
    : (() => {
        const legacyDurationMs = clampTimelineTime(raw.durationMs ?? DEFAULT_CANVAS_DURATION_MS, 120000);
        const legacyItems = Array.isArray(raw.items)
          ? raw.items.map((item) => normalizeItem(item as CanvasItem, legacyDurationMs))
          : [];
        if (!legacyItems.length) {
          return [];
        }
        return [
          {
            aspectRatio: 16 / 9,
            createdAt: createTimestamp(),
            frame: centerFrame({ x: 0, y: 0 }, 880, 520),
            id: createId("theater"),
            locked: false,
            opacity: 1,
            rotation: 0,
            scene: normalizeTheaterScene({
              durationMs: legacyDurationMs,
              fps: clampNumber(raw.fps ?? DEFAULT_CANVAS_FPS, 12, 60),
              isPlaying: false,
              items: legacyItems,
              playheadMs: clampTimelineTime(raw.playheadMs ?? 0, legacyDurationMs),
              selectedIds: Array.isArray(raw.selectedIds) ? raw.selectedIds : [],
              selectedKeyframeIds: Array.isArray(raw.selectedKeyframeIds) ? raw.selectedKeyframeIds : [],
              timelineWindow: raw.timelineWindow
                ? {
                    collapsed: Boolean(raw.timelineWindow.collapsed),
                    x: Number(raw.timelineWindow.x) || 0,
                    y: Number(raw.timelineWindow.y) || 0,
                  }
                : undefined,
              timelineZoom: raw.timelineZoom,
              updatedAt: raw.updatedAt,
            }),
            title: "Scene 1",
            type: "theater",
            zIndex: 1,
          } satisfies CanvasTheaterItem,
        ];
      })();

  const selectedIds = Array.isArray(raw.selectedIds)
    ? raw.selectedIds.filter((selectedId) => items.some((item) => item.id === selectedId))
    : [];
  const activeTheaterId =
    typeof raw.activeTheaterId === "string" && items.some((item) => item.type === "theater" && item.id === raw.activeTheaterId)
      ? raw.activeTheaterId
      : null;

  return {
    activeTheaterId,
    activeTool: raw.activeTool === "select" ? "select" : "pan",
    assetRecords,
    durationMs: clampTimelineTime(raw.durationMs ?? DEFAULT_CANVAS_DURATION_MS, 120000),
    fps: clampNumber(raw.fps ?? DEFAULT_CANVAS_FPS, 12, 60),
    isPlaying: false,
    items,
    playheadMs: clampTimelineTime(raw.playheadMs ?? 0, clampTimelineTime(raw.durationMs ?? DEFAULT_CANVAS_DURATION_MS, 120000)),
    sceneId: raw.sceneId || fallback.sceneId,
    selectedIds,
    selectedKeyframeIds: Array.isArray(raw.selectedKeyframeIds) ? raw.selectedKeyframeIds : [],
    timelineWindow: {
      collapsed: Boolean(raw.timelineWindow?.collapsed),
      x: Number(raw.timelineWindow?.x) || 0,
      y: Number(raw.timelineWindow?.y) || 0,
    },
    timelineZoom: clampNumber(raw.timelineZoom ?? 1, 0.6, 3),
    updatedAt: raw.updatedAt || createTimestamp(),
    viewport: {
      scale: clampNumber(raw.viewport?.scale ?? fallback.viewport.scale, 0.2, 3),
      x: Number(raw.viewport?.x) || 0,
      y: Number(raw.viewport?.y) || 0,
    },
  };
}

export function createMaterialCanvasItem(
  entry: ShowcaseBrowseEntry,
  point: CanvasPoint,
  durationMs = DEFAULT_CANVAS_DURATION_MS,
): CanvasMaterialItem {
  const size = getDefaultMaterialSize(entry);
  const id = createId("material");
  return {
    aspectRatio: size.width / size.height,
    createdAt: createTimestamp(),
    frame: centerFrame(point, size.width, size.height),
    id,
    locked: false,
    materialId: entry.id,
    materialPath: buildMaterialSelectionPath(entry),
    narrativeRole: entry.narrativeRole,
    opacity: 1,
    preserveAspect: true,
    previewKind: entry.preview?.kind ?? null,
    rotation: 0,
    timeline: getDefaultTrack(id, durationMs),
    title: entry.titleForUi,
    type: "material",
    zIndex: 0,
  };
}

export function createTextCanvasItem(
  point: CanvasPoint,
  durationMs = DEFAULT_CANVAS_DURATION_MS,
): CanvasTextItem {
  const id = createId("text");
  return {
    content: "鍙屽嚮缂栬緫鏂囧瓧",
    createdAt: createTimestamp(),
    frame: centerFrame(point, 340, 120),
    id,
    locked: false,
    opacity: 1,
    rotation: 0,
    style: DEFAULT_TEXT_STYLE,
    timeline: getDefaultTrack(id, durationMs),
    type: "text",
    zIndex: 0,
  };
}

export function createShapeCanvasItem(
  shapeType: CanvasShapeType,
  point: CanvasPoint,
  durationMs = DEFAULT_CANVAS_DURATION_MS,
): CanvasShapeItem {
  const size = getDefaultShapeSize(shapeType);
  const id = createId("shape");
  return {
    createdAt: createTimestamp(),
    frame: centerFrame(point, size.width, size.height),
    geometry: getDefaultShapeGeometry(shapeType),
    id,
    locked: false,
    opacity: 1,
    rotation: 0,
    shapeType,
    style: { ...DEFAULT_SHAPE_STYLE },
    timeline: getDefaultTrack(id, durationMs),
    title: CANVAS_SHAPE_LABELS[shapeType],
    type: "shape",
    zIndex: 0,
  };
}

export function createTheaterCanvasItem(
  point: CanvasPoint,
  title = "Theater",
  durationMs = DEFAULT_CANVAS_DURATION_MS,
): CanvasTheaterItem {
  return {
    aspectRatio: 16 / 9,
    createdAt: createTimestamp(),
    frame: centerFrame(point, 880, 520),
    id: createId("theater"),
    locked: false,
    opacity: 1,
    rotation: 0,
    scene: createDefaultTheaterScene(durationMs),
    title,
    type: "theater",
    zIndex: 0,
  };
}

export function buildCanvasAssetVirtualPath(
  assetId: string,
  fileName: string,
  type: "image" | "video",
): string {
  const nameParts = fileName.split(".");
  const extension =
    nameParts.length > 1 && nameParts[nameParts.length - 1]
      ? `.${nameParts[nameParts.length - 1]!.replace(/[^a-z0-9]/gi, "").toLowerCase()}`
      : type === "video"
        ? ".mp4"
        : ".png";

  return `canvas-local://default/${assetId}${extension}`;
}

export function createCanvasAssetRecord(input: {
  assetId?: string;
  durationMs?: number | null;
  fileName: string;
  height: number;
  mimeType: string;
  type: "image" | "video";
  width: number;
}): CanvasAssetRecord {
  const assetId = input.assetId ?? createId("asset");
  return {
    assetId,
    durationMs: input.durationMs ?? null,
    fileName: input.fileName,
    height: clampNumber(input.height || 1, 1, 4000),
    mimeType: input.mimeType,
    savedAt: createTimestamp(),
    type: input.type,
    virtualPath: buildCanvasAssetVirtualPath(assetId, input.fileName, input.type),
    width: clampNumber(input.width || 1, 1, 4000),
  };
}

export function createUploadCanvasItem(
  assetRecord: CanvasAssetRecord,
  point: CanvasPoint,
  durationMs = DEFAULT_CANVAS_DURATION_MS,
): CanvasImageItem | CanvasVideoItem {
  const baseWidth = clampNumber(assetRecord.width, 120, 560);
  const aspectRatio = assetRecord.width / assetRecord.height || 1;
  const width = baseWidth;
  const height = clampNumber(width / aspectRatio, 90, 560);
  const id = createId(assetRecord.type);
  const base = {
    assetId: assetRecord.assetId,
    createdAt: createTimestamp(),
    crop: {
      fit: "cover" as const,
      offsetX: 0,
      offsetY: 0,
      zoom: 1,
    },
    dimensions: {
      height: assetRecord.height,
      width: assetRecord.width,
    },
    fileName: assetRecord.fileName,
    frame: centerFrame(point, width, height),
    id,
    locked: false,
    mimeType: assetRecord.mimeType,
    opacity: 1,
    rotation: 0,
    timeline: getDefaultTrack(id, durationMs),
    virtualPath: assetRecord.virtualPath,
    zIndex: 0,
  };

  if (assetRecord.type === "video") {
    return {
      ...base,
      aspectRatio,
      durationMs: assetRecord.durationMs,
      type: "video",
    };
  }

  return {
    ...base,
    aspectRatio,
    type: "image",
  };
}

export function getItemBounds(item: CanvasItem): CanvasFrame {
  return item.frame;
}

export function getSelectionBounds(items: CanvasItem[], selectedIds: string[]): CanvasFrame | null {
  const selectedItems = items.filter((item) => selectedIds.includes(item.id));
  if (!selectedItems.length) {
    return null;
  }

  const left = Math.min(...selectedItems.map((item) => item.frame.x));
  const top = Math.min(...selectedItems.map((item) => item.frame.y));
  const right = Math.max(...selectedItems.map((item) => item.frame.x + item.frame.width));
  const bottom = Math.max(...selectedItems.map((item) => item.frame.y + item.frame.height));

  return {
    height: bottom - top,
    width: right - left,
    x: left,
    y: top,
  };
}

export function isCanvasItemVisibleAtTime(item: CanvasItem, timeMs: number): boolean {
  return timeMs >= item.timeline.startMs && timeMs <= item.timeline.endMs;
}

export function resolveCanvasItemAtTime(item: CanvasItem, timeMs: number): CanvasItem {
  const nextFrame: CanvasFrame = { ...item.frame };
  let nextRotation = item.rotation;
  let nextOpacity = item.opacity;

  for (const property of CANVAS_ANIMATABLE_PROPERTIES) {
    const propertyKeyframes = item.timeline.keyframes.filter((keyframe) => keyframe.property === property);
    const resolvedValue = interpolateTimelineValue(
      propertyKeyframes,
      getBaseTimelineValue(item, property),
      timeMs,
    );

    switch (property) {
      case "x":
        nextFrame.x = resolvedValue;
        break;
      case "y":
        nextFrame.y = resolvedValue;
        break;
      case "width":
        nextFrame.width = clampFrameValue("width", resolvedValue);
        break;
      case "height":
        nextFrame.height = clampFrameValue("height", resolvedValue);
        break;
      case "rotation":
        nextRotation = resolvedValue;
        break;
      case "opacity":
        nextOpacity = clampNumber(resolvedValue, 0.1, 1);
        break;
      default:
        break;
    }
  }

  return {
    ...item,
    frame: nextFrame,
    opacity: nextOpacity,
    rotation: nextRotation,
  } as CanvasItem;
}

function formatSceneIntent(scene: CanvasSceneState, entryById: Map<string, ShowcaseBrowseEntry>): string {
  const boardItems = scene.items.filter((item): item is CanvasItem => item.type !== "theater");
  const theaters = scene.items.filter((item): item is CanvasTheaterItem => item.type === "theater");
  const boardMaterialTitles = boardItems
    .filter((item): item is CanvasMaterialItem => item.type === "material")
    .map((item) => entryById.get(item.materialId)?.titleForUi ?? item.title)
    .slice(0, 3);

  const boardSummary = [
    boardItems.filter((item) => item.type === "material").length ? `${boardItems.filter((item) => item.type === "material").length} board materials` : null,
    boardItems.filter((item) => item.type === "image").length ? `${boardItems.filter((item) => item.type === "image").length} images` : null,
    boardItems.filter((item) => item.type === "video").length ? `${boardItems.filter((item) => item.type === "video").length} videos` : null,
    boardItems.filter((item) => item.type === "text").length ? `${boardItems.filter((item) => item.type === "text").length} text blocks` : null,
    boardItems.filter((item) => item.type === "shape").length ? `${boardItems.filter((item) => item.type === "shape").length} shapes` : null,
  ].filter((fragment): fragment is string => Boolean(fragment));
  const theaterSummary = theaters.map((theater) => `${theater.title} (${Math.round(theater.scene.durationMs / 1000)}s, ${theater.scene.items.length} items)`);
  const lead =
    boardMaterialTitles.length > 0
      ? `Board highlights ${boardMaterialTitles.join(", ")}`
      : theaterSummary.length > 0
        ? `Board contains ${theaterSummary.length} theaters`
        : "Blank board";

  return `${lead}; board has ${boardSummary.join(", ") || "no loose items"}; theaters: ${theaterSummary.join("; ") || "none"}.`;
}

function copySceneItemsForPayload(
  items: CanvasItem[],
  entryById: Map<string, ShowcaseBrowseEntry>,
): Array<CopiedCanvasMaterialItem | CopiedCanvasShapeItem | CopiedCanvasTextItem | CopiedCanvasUploadItem> {
  const materialItems = items.filter((item): item is CanvasMaterialItem => item.type === "material");
  const shapeItems = items.filter((item): item is CanvasShapeItem => item.type === "shape");
  const uploadItems = items.filter(
    (item): item is CanvasImageItem | CanvasVideoItem => item.type === "image" || item.type === "video",
  );
  const textItems = items.filter((item): item is CanvasTextItem => item.type === "text");

  return [
    ...materialItems.map((item) => ({
      frame: item.frame,
      locked: item.locked,
      materialId: item.materialId,
      materialPath: item.materialPath,
      rotation: item.rotation,
      timeline: cloneTrackForPayload(item.timeline),
      title: entryById.get(item.materialId)?.titleForUi ?? item.title,
      type: "material" as const,
      zIndex: item.zIndex,
    })),
    ...uploadItems.map((item) => ({
      assetId: item.assetId,
      crop: item.crop,
      dimensions: item.dimensions,
      durationMs: item.type === "video" ? item.durationMs ?? undefined : undefined,
      fileName: item.fileName,
      frame: item.frame,
      mimeType: item.mimeType,
      rotation: item.rotation,
      timeline: cloneTrackForPayload(item.timeline),
      type: item.type,
      virtualPath: item.virtualPath,
      zIndex: item.zIndex,
    })),
    ...textItems.map((item) => ({
      content: item.content,
      frame: item.frame,
      rotation: item.rotation,
      style: item.style,
      timeline: cloneTrackForPayload(item.timeline),
      type: "text" as const,
      zIndex: item.zIndex,
    })),
    ...shapeItems.map((item) => ({
      frame: item.frame,
      geometry: item.geometry,
      locked: item.locked,
      opacity: item.opacity,
      rotation: item.rotation,
      shapeType: item.shapeType,
      style: item.style,
      timeline: cloneTrackForPayload(item.timeline),
      title: item.title,
      type: "shape" as const,
      zIndex: item.zIndex,
    })),
  ].sort((left, right) => left.zIndex - right.zIndex);
}

export function buildCopiedCanvasScenePayload(
  scene: CanvasSceneState,
  entryById: Map<string, ShowcaseBrowseEntry>,
): CopiedCanvasScenePayload {
  const boardItems = scene.items.filter((item): item is CanvasItem => item.type !== "theater");
  const theaters = scene.items.filter((item): item is CanvasTheaterItem => item.type === "theater");
  const materialItems = [
    ...boardItems.filter((item): item is CanvasMaterialItem => item.type === "material"),
    ...theaters.flatMap((theater) => theater.scene.items.filter((item): item is CanvasMaterialItem => item.type === "material")),
  ];
  const shapeItems = [
    ...boardItems.filter((item): item is CanvasShapeItem => item.type === "shape"),
    ...theaters.flatMap((theater) => theater.scene.items.filter((item): item is CanvasShapeItem => item.type === "shape")),
  ];
  const uploadItems = [
    ...boardItems.filter((item): item is CanvasImageItem | CanvasVideoItem => item.type === "image" || item.type === "video"),
    ...theaters.flatMap((theater) => theater.scene.items.filter((item): item is CanvasImageItem | CanvasVideoItem => item.type === "image" || item.type === "video")),
  ];
  const uploadRecords = new Map(scene.assetRecords.map((record) => [record.assetId, record] as const));

  return {
    boardItems: [
      ...copySceneItemsForPayload(boardItems, entryById).map((item) => ({ ...item, opacity: "opacity" in item ? item.opacity : 1 })),
      ...theaters.map((theater) => ({
        frame: theater.frame,
        id: theater.id,
        locked: theater.locked,
        opacity: theater.opacity,
        rotation: theater.rotation,
        scene: {
          durationMs: theater.scene.durationMs,
          fps: theater.scene.fps,
          items: copySceneItemsForPayload(theater.scene.items, entryById),
          playheadMs: theater.scene.playheadMs,
        },
        title: theater.title,
        type: "theater" as const,
        zIndex: theater.zIndex,
      })),
    ].sort((left, right) => left.zIndex - right.zIndex),
    materials: materialItems.map((item) => ({
      materialId: item.materialId,
      materialPath: item.materialPath,
      narrativeRole: item.narrativeRole,
      title: entryById.get(item.materialId)?.titleForUi ?? item.title,
    })),
    sceneId: scene.sceneId,
    sceneIntent: formatSceneIntent(scene, entryById),
    shapes: shapeItems.map((item) => ({
      shapeType: item.shapeType,
      style: item.style,
      title: item.title,
    })),
    theaters: theaters.map((theater) => ({
      frame: theater.frame,
      id: theater.id,
      locked: theater.locked,
      opacity: theater.opacity,
      rotation: theater.rotation,
      scene: {
        durationMs: theater.scene.durationMs,
        fps: theater.scene.fps,
        items: copySceneItemsForPayload(theater.scene.items, entryById),
        playheadMs: theater.scene.playheadMs,
      },
      title: theater.title,
      type: "theater" as const,
      zIndex: theater.zIndex,
    })),
    uploads: uploadItems.map((item) => {
      const record = uploadRecords.get(item.assetId);
      return {
        assetId: item.assetId,
        durationMs: record?.durationMs ?? (item.type === "video" ? item.durationMs : null) ?? null,
        fileName: item.fileName,
        mimeType: item.mimeType,
        type: item.type,
        virtualPath: item.virtualPath,
      };
    }),
    version: "canvas-scene.v3",
    viewport: scene.viewport,
  };
}
export function getCanvasAnimatableValue(
  item: CanvasItem,
  property: CanvasAnimatableProperty,
  timeMs: number,
): number {
  const resolved = resolveCanvasItemAtTime(item, timeMs);
  return getBaseTimelineValue(resolved, property);
}

export function createCanvasKeyframe(
  item: CanvasItem,
  property: CanvasAnimatableProperty,
  timeMs: number,
): CanvasKeyframe {
  return createKeyframe(property, getCanvasAnimatableValue(item, property, timeMs), timeMs);
}

