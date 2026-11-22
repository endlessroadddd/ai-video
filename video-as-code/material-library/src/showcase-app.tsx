import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Copy,
  Info,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import {
  MATERIAL_NARRATIVE_ROLE_ORDER,
  filterMaterialLibraryEntries,
  groupMaterialLibraryEntriesByRole,
} from "./catalog-search";
import {
  MATERIAL_LIBRARY_CURATED_SECTIONS,
  MATERIAL_LIBRARY_ENTRIES,
  type MaterialNarrativeRole,
  type MaterialReuseMode,
  type MaterialVisualWeight,
} from "./material-catalog";
import { CanvasWorkspace, enqueueMaterialForCanvas } from "./showcase-canvas";
import {
  buildShowcaseBrowseEntries,
  type ShowcaseBrowseEntry,
  type ShowcaseFilterState,
  type ShowcasePreviewabilityFilter,
} from "./showcase-copy";
import { buildMaterialSelectionPath, copyTextToClipboard } from "./showcase-shared";

type ShowcaseRoute =
  | { kind: "canvas" }
  | { kind: "library" }
  | { anchorId: string; kind: "material" };

type DetailModalTab = "code" | "essence" | "source";
type MaterialPickState = "copied" | "failed" | "idle";

const DEFAULT_FILTERS: ShowcaseFilterState = {
  previewability: "all",
  query: "",
  reuseMode: "all",
  role: "all",
  visualWeight: "all",
};

const ROLE_LABELS_ZH: Record<MaterialNarrativeRole, string> = {
  transition: "转场",
  accent: "强调",
  component: "组件",
  shell: "壳层",
  proof: "证据",
  environment: "场景",
  helper: "辅助",
};

const REUSE_LABELS_ZH: Record<MaterialReuseMode, string> = {
  "drop-in": "可直接复用",
  "tweak-copy": "改文案即可",
  "tweak-layout": "要改结构",
  "heavy-adaptation": "需要重度改造",
};

const WEIGHT_LABELS_ZH: Record<MaterialVisualWeight, string> = {
  micro: "极轻",
  light: "轻量",
  medium: "中等",
  heavy: "偏重",
  "full-scene": "整场景",
};

const PREVIEWABILITY_LABELS_ZH: Record<ShowcasePreviewabilityFilter, string> = {
  all: "全部",
  previewable: "可预览",
  "code-only": "仅代码",
};

const STABILITY_LABELS_ZH = {
  beta: "测试中",
  stable: "稳定",
} as const;

const ROLE_GUIDANCE_ZH: Record<
  MaterialNarrativeRole,
  { boundary: string; purpose: string }
> = {
  transition: {
    purpose: "负责把上一段顺畅带进下一段，让节奏成立，而不是承担全部信息解释。",
    boundary: "它不负责承载主要阅读内容，也不应该被塞进过多细节。",
  },
  accent: {
    purpose: "负责补一针情绪、强调或节奏，让观众更快注意到关键瞬间。",
    boundary: "它不负责独立讲完整故事，也不适合承担主要证明任务。",
  },
  component: {
    purpose: "负责解决一个具体界面问题，让局部信息以可复用的方式出现。",
    boundary: "它不负责建立完整世界观，通常需要依附在更大的壳层或场景里。",
  },
  shell: {
    purpose: "负责搭出承载位和界面骨架，让别的内容有自然的落点。",
    boundary: "它不负责单独输出结论，更多是用来托住别的内容层。",
  },
  proof: {
    purpose: "负责给出可读的证据、趋势或关键判断，让镜头有明确结论。",
    boundary: "它不负责铺完整上下文，通常应该在上下文已经建立后出现。",
  },
  environment: {
    purpose: "负责建立完整场景，让观众一眼知道世界观和平台语境。",
    boundary: "它不适合做轻量插片，也不该为了一个小信息点就整页上场。",
  },
  helper: {
    purpose: "负责支撑别的素材正常工作，让系统更稳、更可复用。",
    boundary: "它通常不是镜头主角，也不该取代真正的视觉内容层。",
  },
};

const INDEX_PREVIEW_SCALE: Record<string, number> = {
  "is-card": 0.62,
  "is-compact": 0.78,
  "is-phone": 0.34,
  "is-stage": 0.38,
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncPreference);
      return () => mediaQuery.removeEventListener("change", syncPreference);
    }

    mediaQuery.addListener(syncPreference);
    return () => mediaQuery.removeListener(syncPreference);
  }, []);

  return prefersReducedMotion;
}

function useShowcaseClock(durationMs: number) {
  const [timeMs, setTimeMs] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setTimeMs(0);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      setTimeMs((now - startedAt) % durationMs);
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [durationMs, prefersReducedMotion]);

  return prefersReducedMotion ? 0 : timeMs;
}

function getPreviewClassName(entry: ShowcaseBrowseEntry): string {
  if (entry.preview?.kind === "phone") {
    return "is-phone";
  }

  if (entry.preview?.kind === "stage") {
    return "is-stage";
  }

  if (entry.preview?.kind === "compact") {
    return "is-compact";
  }

  return "is-card";
}

function getRouteAnchorCandidates(entry: ShowcaseBrowseEntry): string[] {
  const candidates = new Set<string>([entry.anchorId]);
  const idLeaf = entry.id.split("/").filter(Boolean).pop();
  const previewAnchor = entry.previewRef.split("#")[1]?.trim().toLowerCase();

  if (idLeaf) {
    candidates.add(idLeaf.toLowerCase());
  }

  if (previewAnchor) {
    candidates.add(previewAnchor);
  }

  return [...candidates];
}

function routeToHash(route: ShowcaseRoute): string {
  if (route.kind === "canvas") {
    return "#/canvas";
  }

  if (route.kind === "library") {
    return "#/library";
  }

  return `#/material/${route.anchorId}`;
}

function resolveRouteFromHash(
  hash: string,
  entryByRouteAnchor: Map<string, ShowcaseBrowseEntry>,
): { canonicalHash: string; route: ShowcaseRoute } {
  const raw = hash.replace(/^#/, "");

  if (!raw || raw === "/" || raw === "library" || raw === "/library") {
    return { canonicalHash: "#/library", route: { kind: "library" } };
  }

  if (raw === "canvas" || raw === "/canvas") {
    return { canonicalHash: "#/canvas", route: { kind: "canvas" } };
  }

  if (raw.startsWith("/material/")) {
    const anchorCandidate = decodeURIComponent(raw.slice("/material/".length)).toLowerCase();
    const entry = entryByRouteAnchor.get(anchorCandidate);
    if (entry) {
      return {
        canonicalHash: routeToHash({ anchorId: entry.anchorId, kind: "material" }),
        route: { anchorId: entry.anchorId, kind: "material" },
      };
    }

    return { canonicalHash: "#/library", route: { kind: "library" } };
  }

  const legacyAnchor = raw.replace(/^\/+/, "");
  const entry = entryByRouteAnchor.get(legacyAnchor.toLowerCase());
  if (entry) {
    return {
      canonicalHash: routeToHash({ anchorId: entry.anchorId, kind: "material" }),
      route: { anchorId: entry.anchorId, kind: "material" },
    };
  }

  return { canonicalHash: "#/library", route: { kind: "library" } };
}

function navigateToRoute(route: ShowcaseRoute) {
  const nextHash = routeToHash(route);
  if (typeof window === "undefined") {
    return;
  }

  if (window.location.hash === nextHash) {
    return;
  }

  window.location.hash = nextHash.slice(1);
}

function replaceRoute(route: ShowcaseRoute) {
  if (typeof window === "undefined") {
    return;
  }

  window.history.replaceState(null, "", routeToHash(route));
}

function splitAgentNotes(body: string): string[] {
  return body
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function renderList(items: string[], emptyLabel = "暂无记录") {
  if (!items.length) {
    return <div className="ml-panel__empty">{emptyLabel}</div>;
  }

  return (
    <ol className="ml-panel__list">
      {items.map((item, index) => (
        <li key={`${index}-${item}`}>{item}</li>
      ))}
    </ol>
  );
}

function getIndexTags(entry: ShowcaseBrowseEntry): string[] {
  return [
    ROLE_LABELS_ZH[entry.narrativeRole],
    entry.hasPreview ? "可预览" : "仅代码",
  ];
}

function getDetailTags(entry: ShowcaseBrowseEntry): string[] {
  return [
    ROLE_LABELS_ZH[entry.narrativeRole],
    REUSE_LABELS_ZH[entry.reuseMode],
    STABILITY_LABELS_ZH[entry.stability],
  ];
}

function getLeadCue(entry: ShowcaseBrowseEntry): string {
  return (
    entry.cueText[0] ??
    entry.selectionSignals[0] ??
    entry.bestForUi[0] ??
    entry.summaryForUi
  );
}

function buildUsageExamples(entry: ShowcaseBrowseEntry): string[] {
  return Array.from(
    new Set([
      ...entry.cueText,
      ...entry.selectionSignals,
      ...entry.scriptRecipe,
      ...entry.hostSurfaces.map((surface) => `最自然的承载位是 ${surface}`),
    ]),
  )
    .filter(Boolean)
    .slice(0, 4);
}

function IndexPreviewThumb({ entry }: { entry: ShowcaseBrowseEntry }) {
  if (!entry.preview) {
    return (
      <div className="ml-card__preview ml-card__preview--empty">
        <span>代码条目</span>
      </div>
    );
  }

  const previewClass = getPreviewClassName(entry);
  const snapshotTime = previewClass === "is-stage" ? 2200 : previewClass === "is-phone" ? 900 : 0;
  const scale = INDEX_PREVIEW_SCALE[previewClass] ?? 0.56;

  return (
    <div className={`ml-card__preview ${previewClass}`}>
      <div
        className="ml-card__preview-surface"
        style={{ "--ml-thumb-scale": String(scale) } as CSSProperties}
      >
        {entry.preview.render({ t: snapshotTime })}
      </div>
    </div>
  );
}

function DetailPreviewStage({ entry }: { entry: ShowcaseBrowseEntry }) {
  const timeMs = useShowcaseClock(9600);
  const previewClass = getPreviewClassName(entry);

  if (!entry.preview) {
    return (
      <div className="ml-detail__stage ml-detail__stage--empty">
        <div className="ml-detail__stage-empty">
          <Code2 size={18} />
          <p>这个条目只有实现信息，没有可直接展示的舞台预览。</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`ml-detail__stage ${previewClass}`}>
      {entry.preview.render({ t: timeMs })}
    </div>
  );
}

function InfoModal({
  entry,
  onClose,
}: {
  entry: ShowcaseBrowseEntry;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<DetailModalTab>("essence");

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="ml-modal" role="dialog" aria-modal="true" aria-labelledby="ml-detail-modal-title">
      <button
        type="button"
        className="ml-modal__backdrop"
        onClick={onClose}
        aria-label="关闭实现信息"
      />
      <div className="ml-modal__panel" onClick={(event) => event.stopPropagation()}>
        <div className="ml-modal__header">
          <div>
            <p className="ml-modal__eyebrow">实现信息</p>
            <h2 id="ml-detail-modal-title">{entry.titleForUi}</h2>
            <p className="ml-modal__summary">{entry.summaryForUi}</p>
          </div>
          <button type="button" className="ml-modal__close" onClick={onClose} aria-label="关闭弹窗">
            <X size={18} />
          </button>
        </div>

        <div className="ml-modal__tabs" role="tablist" aria-label="实现信息标签页">
          {([
            ["essence", "作用与实现"],
            ["source", "Source"],
            ["code", "Code"],
          ] as const).map(([tabId, label]) => (
            <button
              type="button"
              key={tabId}
              className={[
                "ml-modal__tab",
                activeTab === tabId ? "is-active" : "",
              ].join(" ")}
              onClick={() => setActiveTab(tabId)}
              role="tab"
              aria-selected={activeTab === tabId}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "essence" ? (
          <div className="ml-modal__grid">
            <article className="ml-modal__card">
              <h3>Agent Goal</h3>
              <p>{entry.agentGoal}</p>
            </article>

            <article className="ml-modal__card">
              <h3>作用边界</h3>
              <p>{ROLE_GUIDANCE_ZH[entry.narrativeRole].purpose}</p>
              <p>{ROLE_GUIDANCE_ZH[entry.narrativeRole].boundary}</p>
            </article>

            <article className="ml-modal__card">
              <h3>组合方式</h3>
              {renderList(entry.compositionPatterns, "这项暂时没有组合说明")}
            </article>

            <article className="ml-modal__card">
              <h3>典型进入方式</h3>
              {renderList(entry.scriptRecipe, "这项暂时没有脚本配方")}
            </article>

            <article className="ml-modal__card ml-modal__card--wide">
              <h3>Agent Notes</h3>
              <div className="ml-modal__notes">
                {splitAgentNotes(entry.body || entry.summary).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </div>
        ) : null}

        {activeTab === "source" ? (
          <div className="ml-modal__grid">
            <article className="ml-modal__card">
              <h3>Implementation</h3>
              <code>{entry.implementationRef}</code>
            </article>

            <article className="ml-modal__card">
              <h3>Source Projects</h3>
              <p>{entry.sourceProjects.join(", ") || "暂无记录"}</p>
            </article>

            <article className="ml-modal__card">
              <h3>Input Props</h3>
              <p>{entry.inputProps.join(", ") || "暂无记录"}</p>
            </article>

            <article className="ml-modal__card">
              <h3>Editable Parts</h3>
              <p>{entry.editableParts.join(", ") || "暂无记录"}</p>
            </article>

            <article className="ml-modal__card">
              <h3>Host Surfaces</h3>
              <p>{entry.hostSurfaces.join(", ") || "暂无记录"}</p>
            </article>

            <article className="ml-modal__card">
              <h3>Style / Scene</h3>
              <p>{[...entry.styleFamilies, ...entry.sceneTypes].join(", ") || "暂无记录"}</p>
            </article>
          </div>
        ) : null}

        {activeTab === "code" ? (
          entry.sourceCode ? (
            <pre className="ml-modal__code">
              <code>{entry.sourceCode}</code>
            </pre>
          ) : (
            <div className="ml-panel__empty">本地没有缓存这段源码预览。</div>
          )
        ) : null}
      </div>
    </div>
  );
}

function MaterialLinkGrid({
  emptyLabel,
  entryById,
  entryIds,
  onOpen,
}: {
  emptyLabel: string;
  entryById: Map<string, ShowcaseBrowseEntry>;
  entryIds: string[];
  onOpen: (entry: ShowcaseBrowseEntry) => void;
}) {
  const relatedEntries = entryIds
    .map((entryId) => entryById.get(entryId))
    .filter((entry): entry is ShowcaseBrowseEntry => Boolean(entry));

  if (!relatedEntries.length) {
    return <div className="ml-panel__empty">{emptyLabel}</div>;
  }

  return (
    <div className="ml-link-grid">
      {relatedEntries.map((entry) => (
        <button
          type="button"
          key={entry.id}
          className="ml-link-card"
          onClick={() => onOpen(entry)}
        >
          <span className="ml-link-card__eyebrow">{ROLE_LABELS_ZH[entry.narrativeRole]}</span>
          <strong>{entry.titleForUi}</strong>
          <p>{getLeadCue(entry)}</p>
        </button>
      ))}
    </div>
  );
}

function ShowcaseModeTabs({ activeMode }: { activeMode: "canvas" | "library" }) {
  return (
    <div className="ml-mode-tabs">
      <button
        type="button"
        className={["ml-mode-tabs__tab", activeMode === "library" ? "is-active" : ""].join(" ")}
        onClick={() => navigateToRoute({ kind: "library" })}
        aria-current={activeMode === "library" ? "page" : undefined}
      >
        素材库
      </button>
      <button
        type="button"
        className={["ml-mode-tabs__tab", activeMode === "canvas" ? "is-active" : ""].join(" ")}
        onClick={() => navigateToRoute({ kind: "canvas" })}
        aria-current={activeMode === "canvas" ? "page" : undefined}
      >
        画布
      </button>
    </div>
  );
}

function LibraryIndexPage({
  browseEntries,
  clearFilters,
  filters,
  groupedEntries,
  onOpenMaterial,
  updateFilter,
}: {
  browseEntries: ShowcaseBrowseEntry[];
  clearFilters: () => void;
  filters: ShowcaseFilterState;
  groupedEntries: Array<{ entries: ShowcaseBrowseEntry[]; role: MaterialNarrativeRole }>;
  onOpenMaterial: (entry: ShowcaseBrowseEntry) => void;
  updateFilter: <K extends keyof ShowcaseFilterState>(
    key: K,
    value: ShowcaseFilterState[K],
  ) => void;
}) {
  const previewableCount = browseEntries.filter((entry) => entry.hasPreview).length;
  const stableCount = browseEntries.filter((entry) => entry.stability === "stable").length;
  const totalResults = groupedEntries.reduce(
    (count, group) => count + group.entries.length,
    0,
  );

  return (
    <div className="ml-curator__page">
      <ShowcaseModeTabs activeMode="library" />

      <header className="ml-curator__hero">
        <div className="ml-curator__hero-main">
          <p className="ml-curator__eyebrow">Lucius Material Library</p>
          <h1>素材库</h1>
        </div>
        <div className="ml-curator__hero-meta">
          <p className="ml-curator__hero-copy">
            搜索、筛选、打开详情页。
          </p>
          <div className="ml-curator__hero-stats" aria-label="素材库概览">
            <span>{browseEntries.length} 个已整理素材</span>
            <span>{previewableCount} 个可直接预览</span>
            <span>{stableCount} 个稳定素材</span>
          </div>
        </div>
      </header>

      <div className="ml-curator__workspace">
        <aside className="ml-curator__rail">
          <section className="ml-curator__controls">
            <div className="ml-curator__controls-copy">
              <p className="ml-curator__eyebrow">筛选与搜索</p>
              <h2>筛选</h2>
              <p>左边筛选，右边浏览。</p>
            </div>

            <label className="ml-curator__search" htmlFor="ml-material-search">
              <Search size={16} />
              <input
                id="ml-material-search"
                type="search"
                value={filters.query}
                onChange={(event) => updateFilter("query", event.target.value)}
                placeholder="搜索用途、surface、关键词或素材名"
              />
            </label>

            <div className="ml-curator__filter-groups">
              <div className="ml-filter-group">
                <span>用途</span>
                <div className="ml-filter-group__row">
                  <button
                    type="button"
                    className={["ml-filter-chip", filters.role === "all" ? "is-active" : ""].join(" ")}
                    onClick={() => updateFilter("role", "all")}
                  >
                    全部
                  </button>
                  {MATERIAL_NARRATIVE_ROLE_ORDER.map((role) => (
                    <button
                      type="button"
                      key={role}
                      className={["ml-filter-chip", filters.role === role ? "is-active" : ""].join(" ")}
                      onClick={() => updateFilter("role", role)}
                    >
                      {ROLE_LABELS_ZH[role]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ml-filter-group">
                <span>预览</span>
                <div className="ml-filter-group__row">
                  {(["all", "previewable", "code-only"] as const).map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={[
                        "ml-filter-chip",
                        filters.previewability === option ? "is-active" : "",
                      ].join(" ")}
                      onClick={() => updateFilter("previewability", option)}
                    >
                      {PREVIEWABILITY_LABELS_ZH[option]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ml-filter-group">
                <span>复用难度</span>
                <div className="ml-filter-group__row">
                  {(["all", "drop-in", "tweak-copy", "tweak-layout", "heavy-adaptation"] as const).map(
                    (option) => (
                      <button
                        type="button"
                        key={option}
                        className={[
                          "ml-filter-chip",
                          filters.reuseMode === option ? "is-active" : "",
                        ].join(" ")}
                        onClick={() => updateFilter("reuseMode", option)}
                      >
                        {option === "all" ? "全部" : REUSE_LABELS_ZH[option]}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="ml-filter-group">
                <span>视觉重量</span>
                <div className="ml-filter-group__row">
                  {(["all", "micro", "light", "medium", "heavy", "full-scene"] as const).map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={[
                        "ml-filter-chip",
                        filters.visualWeight === option ? "is-active" : "",
                      ].join(" ")}
                      onClick={() => updateFilter("visualWeight", option)}
                    >
                      {option === "all" ? "全部" : WEIGHT_LABELS_ZH[option]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="ml-curator__control-footer">
              <span>当前筛出 {totalResults} 个素材</span>
              <button type="button" className="ml-curator__reset" onClick={clearFilters}>
                清空筛选
              </button>
            </div>
          </section>
        </aside>

        <section className="ml-curator__results">
          <header className="ml-curator__results-head">
            <div>
              <p className="ml-group__eyebrow">结果</p>
              <h2>候选素材</h2>
            </div>
            <p>{totalResults} 条结果，按叙事角色展开。</p>
          </header>

          {groupedEntries.length ? (
            groupedEntries.map((group) => (
              <section className="ml-group" key={group.role}>
                <header className="ml-group__header">
                  <div>
                    <p className="ml-group__eyebrow">{ROLE_LABELS_ZH[group.role]}</p>
                    <h2>{group.entries.length} 个可选素材</h2>
                  </div>
                </header>

                <div className="ml-gallery">
                  {group.entries.map((entry) => (
                    <button
                      type="button"
                      key={entry.id}
                      className="ml-card"
                      onClick={() => onOpenMaterial(entry)}
                    >
                      <IndexPreviewThumb entry={entry} />
                      <div className="ml-card__body">
                        <div className="ml-card__tags">
                          {getIndexTags(entry).map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <div className="ml-card__text">
                          <strong>{entry.titleForUi}</strong>
                          <p>{getLeadCue(entry)}</p>
                        </div>
                        <span className="ml-card__action">
                          打开详情
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="ml-panel__empty">
              当前筛选下没有素材。可以先清空筛选，再从“用途”开始缩小范围。
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function MaterialDetailPage({
  entry,
  entryById,
  onAddToCanvas,
  onBack,
  onOpenMaterial,
}: {
  entry: ShowcaseBrowseEntry;
  entryById: Map<string, ShowcaseBrowseEntry>;
  onAddToCanvas: (entry: ShowcaseBrowseEntry) => void;
  onBack: () => void;
  onOpenMaterial: (entry: ShowcaseBrowseEntry) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickState, setPickState] = useState<MaterialPickState>("idle");

  useEffect(() => {
    setIsModalOpen(false);
    setPickState("idle");
  }, [entry.id]);

  useEffect(() => {
    if (pickState === "idle") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setPickState("idle");
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [pickState]);

  const usageExamples = buildUsageExamples(entry);
  const roleGuidance = ROLE_GUIDANCE_ZH[entry.narrativeRole];
  const roleExplainer = `这是一个${ROLE_LABELS_ZH[entry.narrativeRole]}素材。${roleGuidance.purpose}`;
  const selectionPath = buildMaterialSelectionPath(entry);

  async function handleSelectMaterial() {
    const didCopy = await copyTextToClipboard(selectionPath);
    setPickState(didCopy ? "copied" : "failed");
  }

  return (
    <div className="ml-detail">
      <ShowcaseModeTabs activeMode="library" />

      <header className="ml-detail__topbar">
        <button type="button" className="ml-detail__back" onClick={onBack}>
          <ArrowLeft size={16} />
          返回索引
        </button>

        <div className="ml-detail__topbar-actions">
          <button
            type="button"
            className={[ 
              "ml-detail__pick-button",
              pickState === "copied" ? "is-copied" : "",
              pickState === "failed" ? "is-failed" : "",
            ].join(" ")}
            onClick={() => {
              void handleSelectMaterial();
            }}
          >
            {pickState === "copied" ? <Check size={16} /> : <Copy size={16} />}
            {pickState === "copied" ? "已复制素材路径" : "选择此素材"}
          </button>

          <button
            type="button"
            className="ml-detail__info-button"
            onClick={() => onAddToCanvas(entry)}
          >
            <Plus size={16} />
            放入画布
          </button>

          <button
            type="button"
            className="ml-detail__info-button"
            onClick={() => setIsModalOpen(true)}
          >
            <Info size={16} />
            实现
          </button>
        </div>
      </header>

      <section className="ml-detail__hero">
        <div className="ml-detail__intro">
          <p className="ml-detail__eyebrow">
            {ROLE_LABELS_ZH[entry.narrativeRole]} · {REUSE_LABELS_ZH[entry.reuseMode]}
          </p>
          <h1>{entry.titleForUi}</h1>
          <p className="ml-detail__summary">{entry.summaryForUi}</p>

          <div className="ml-detail__role-note">
            <span>它的作用</span>
            <p>{roleExplainer}</p>
          </div>

          <div className="ml-detail__tags">
            {getDetailTags(entry).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          {pickState !== "idle" ? (
            <p
              className={[
                "ml-detail__copy-feedback",
                pickState === "copied" ? "is-success" : "is-error",
              ].join(" ")}
            >
              {pickState === "copied"
                ? "已复制，可直接贴给大模型做手动推荐。"
                : "复制失败，请稍后再试。"}
            </p>
          ) : null}
        </div>

        <DetailPreviewStage entry={entry} />

        <div className="ml-detail__lead">
          <Sparkles size={16} />
          <p>{getLeadCue(entry)}</p>
        </div>
      </section>

      <section className="ml-detail__grid">
        <article className="ml-panel ml-panel--plain">
          <h2>它是干什么的</h2>
          <p>{entry.summaryForUi}</p>
          <p>{roleGuidance.purpose}</p>
          <p>{roleGuidance.boundary}</p>
        </article>

        <article className="ml-panel ml-panel--plain">
          <h2>什么时候用</h2>
          {renderList(entry.bestForUi, "这项暂时没有明确的推荐场景")}
        </article>

        <article className="ml-panel ml-panel--plain">
          <h2>什么时候别用</h2>
          {renderList(entry.avoidUi, "这项暂时没有明确的避用场景")}
        </article>

        <article className="ml-panel ml-panel--plain">
          <h2>先改哪里</h2>
          {renderList(entry.adaptQuickUi, "这项暂时没有明确的改动建议")}
        </article>
      </section>

      <section className="ml-detail__grid">
        <article className="ml-panel ml-panel--plain">
          <h2>典型镜头 / 典型用法</h2>
          {renderList(usageExamples, "这项暂时没有典型用法示例")}
        </article>

        <article className="ml-panel ml-panel--plain">
          <h2>它最自然出现在哪里</h2>
          {renderList(
            entry.hostSurfaces.map((surface) => `${surface} 是它最自然的承载位`),
            "这项暂时没有明确的承载位说明",
          )}
        </article>
      </section>

      <section className="ml-detail__grid">
        <article className="ml-panel ml-panel--linked">
          <h2>相关素材</h2>
          <MaterialLinkGrid
            emptyLabel="这项目前没有标注相关搭配。"
            entryById={entryById}
            entryIds={entry.pairWithIds}
            onOpen={onOpenMaterial}
          />
        </article>

        <article className="ml-panel ml-panel--linked">
          <h2>替代素材</h2>
          <MaterialLinkGrid
            emptyLabel="这项目前没有推荐替代。"
            entryById={entryById}
            entryIds={entry.preferInsteadIds}
            onOpen={onOpenMaterial}
          />
        </article>
      </section>

      {isModalOpen ? <InfoModal entry={entry} onClose={() => setIsModalOpen(false)} /> : null}
    </div>
  );
}

export function ShowcaseApp() {
  const [filters, setFilters] = useState<ShowcaseFilterState>(DEFAULT_FILTERS);
  const curatedSectionIds = useMemo(
    () => MATERIAL_LIBRARY_CURATED_SECTIONS.flatMap((section) => section.ids),
    [],
  );

  const browseEntries = useMemo(
    () => buildShowcaseBrowseEntries(MATERIAL_LIBRARY_ENTRIES, curatedSectionIds),
    [curatedSectionIds],
  );

  const entryById = useMemo(
    () => new Map(browseEntries.map((entry) => [entry.id, entry] as const)),
    [browseEntries],
  );

  const entryByAnchor = useMemo(
    () => new Map(browseEntries.map((entry) => [entry.anchorId, entry] as const)),
    [browseEntries],
  );

  const entryByRouteAnchor = useMemo(() => {
    const lookup = new Map<string, ShowcaseBrowseEntry>();

    for (const entry of browseEntries) {
      for (const anchorCandidate of getRouteAnchorCandidates(entry)) {
        lookup.set(anchorCandidate, entry);
      }
    }

    return lookup;
  }, [browseEntries]);

  const groupedEntries = useMemo(
    () =>
      groupMaterialLibraryEntriesByRole(
        filterMaterialLibraryEntries(browseEntries, filters),
      ),
    [browseEntries, filters],
  );

  const [route, setRoute] = useState<ShowcaseRoute>(() => {
    if (typeof window === "undefined") {
      return { kind: "library" };
    }

    return resolveRouteFromHash(window.location.hash, entryByRouteAnchor).route;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

      const syncRoute = () => {
        const { canonicalHash, route: nextRoute } = resolveRouteFromHash(
          window.location.hash,
          entryByRouteAnchor,
        );

      setRoute(nextRoute);

      if (window.location.hash !== canonicalHash) {
        window.history.replaceState(null, "", canonicalHash);
      }
    };

    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, [entryByRouteAnchor]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ behavior: "auto", left: 0, top: 0 });
  }, [route]);

  function updateFilter<K extends keyof ShowcaseFilterState>(
    key: K,
    value: ShowcaseFilterState[K],
  ) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  function openMaterial(entry: ShowcaseBrowseEntry) {
    navigateToRoute({ anchorId: entry.anchorId, kind: "material" });
  }

  function addMaterialToCanvas(entry: ShowcaseBrowseEntry) {
    enqueueMaterialForCanvas(entry);
    navigateToRoute({ kind: "canvas" });
  }

  const currentEntry =
    route.kind === "material" ? entryByAnchor.get(route.anchorId) ?? null : null;

  useEffect(() => {
    if (route.kind !== "material" || currentEntry) {
      return;
    }

    replaceRoute({ kind: "library" });
    setRoute({ kind: "library" });
  }, [currentEntry, route]);

  return (
    <main className="ml-curator">
      {route.kind === "canvas" ? (
        <CanvasWorkspace
          browseEntries={browseEntries}
          clearFilters={clearFilters}
          filters={filters}
          groupedEntries={groupedEntries}
          onBackToLibrary={() => navigateToRoute({ kind: "library" })}
          onOpenMaterial={openMaterial}
          updateFilter={updateFilter}
        />
      ) : route.kind === "library" || !currentEntry ? (
        <LibraryIndexPage
          browseEntries={browseEntries}
          clearFilters={clearFilters}
          filters={filters}
          groupedEntries={groupedEntries}
          onOpenMaterial={openMaterial}
          updateFilter={updateFilter}
        />
      ) : (
        <MaterialDetailPage
          entry={currentEntry}
          entryById={entryById}
          onAddToCanvas={addMaterialToCanvas}
          onBack={() => navigateToRoute({ kind: "library" })}
          onOpenMaterial={openMaterial}
        />
      )}
    </main>
  );
}

