import type {
  MaterialInformationDensity,
  MaterialLibraryStability,
  MaterialMutationCost,
  MaterialNarrativeRole,
  MaterialReuseMode,
  MaterialVisualWeight,
} from "./material-catalog";
import type { ShowcasePreviewabilityFilter } from "./showcase-copy";

export type MaterialLibrarySearchableEntry = {
  adaptationNotes: string[];
  agentGoal: string;
  avoidZh?: string[];
  body: string;
  category: string;
  compositionPatterns: string[];
  curatedOrder?: number;
  cueText?: string[];
  hasPreview?: boolean;
  hostSurfaces: string[];
  id: string;
  informationDensity: MaterialInformationDensity;
  inputProps: string[];
  keepFixed: string[];
  keywords: string[];
  matchKeywords: string[];
  mutationCost: MaterialMutationCost;
  narrativeRole: MaterialNarrativeRole;
  negativeTriggersEn: string[];
  negativeTriggersZh: string[];
  reuseMode: MaterialReuseMode;
  safeToChange: string[];
  summaryZh?: string;
  scriptRecipe: string[];
  scriptTriggersEn: string[];
  scriptTriggersZh: string[];
  selectionSignals: string[];
  sourceProjects: string[];
  stability: MaterialLibraryStability;
  titleZh?: string;
  summary: string;
  title: string;
  toneTags: string[];
  visualSignature: string[];
  visualWeight: MaterialVisualWeight;
  bestForZh?: string[];
  adaptQuickZh?: string[];
};

export type MaterialLibraryFilterState = {
  previewability: ShowcasePreviewabilityFilter;
  query: string;
  reuseMode: MaterialReuseMode | "all";
  role: MaterialNarrativeRole | "all";
  visualWeight: MaterialVisualWeight | "all";
};

export const MATERIAL_NARRATIVE_ROLE_ORDER: MaterialNarrativeRole[] = [
  "transition",
  "accent",
  "component",
  "shell",
  "proof",
  "environment",
  "helper",
];

const WEIGHT_ORDER: MaterialVisualWeight[] = ["micro", "light", "medium", "heavy", "full-scene"];
const REUSE_ORDER: MaterialReuseMode[] = ["drop-in", "tweak-copy", "tweak-layout", "heavy-adaptation"];

function compareStability(left: MaterialLibraryStability, right: MaterialLibraryStability): number {
  if (left === right) {
    return 0;
  }

  return left === "stable" ? -1 : 1;
}

function compareRole(left: MaterialNarrativeRole, right: MaterialNarrativeRole): number {
  return MATERIAL_NARRATIVE_ROLE_ORDER.indexOf(left) - MATERIAL_NARRATIVE_ROLE_ORDER.indexOf(right);
}

function compareWeight(left: MaterialVisualWeight, right: MaterialVisualWeight): number {
  return WEIGHT_ORDER.indexOf(left) - WEIGHT_ORDER.indexOf(right);
}

function compareReuseMode(left: MaterialReuseMode, right: MaterialReuseMode): number {
  return REUSE_ORDER.indexOf(left) - REUSE_ORDER.indexOf(right);
}

function comparePreviewability(left: boolean | undefined, right: boolean | undefined): number {
  const leftValue = left ? 0 : 1;
  const rightValue = right ? 0 : 1;
  return leftValue - rightValue;
}

export function compareMaterialLibraryEntries<
  T extends Pick<
    MaterialLibrarySearchableEntry,
    "narrativeRole" | "reuseMode" | "stability" | "title" | "visualWeight"
  >,
>(left: T, right: T): number {
  return (
    compareStability(left.stability, right.stability) ||
    compareRole(left.narrativeRole, right.narrativeRole) ||
    compareWeight(left.visualWeight, right.visualWeight) ||
    compareReuseMode(left.reuseMode, right.reuseMode) ||
    left.title.localeCompare(right.title)
  );
}

export function compareShowcaseEntries<
  T extends Pick<
    MaterialLibrarySearchableEntry,
    "reuseMode" | "stability" | "title"
  > &
    Partial<
      Pick<MaterialLibrarySearchableEntry, "curatedOrder" | "hasPreview">
    >,
>(left: T, right: T): number {
  return (
    comparePreviewability(left.hasPreview, right.hasPreview) ||
    compareStability(left.stability, right.stability) ||
    compareReuseMode(left.reuseMode, right.reuseMode) ||
    (left.curatedOrder ?? Number.MAX_SAFE_INTEGER) -
      (right.curatedOrder ?? Number.MAX_SAFE_INTEGER) ||
    left.title.localeCompare(right.title)
  );
}

export function buildMaterialSearchText(entry: MaterialLibrarySearchableEntry): string {
  return [
    entry.id,
    entry.title,
    entry.titleZh,
    entry.summary,
    entry.summaryZh,
    entry.agentGoal,
    entry.body,
    entry.category,
    entry.narrativeRole,
    entry.visualWeight,
    entry.informationDensity,
    entry.reuseMode,
    entry.mutationCost,
    ...entry.keywords,
    ...entry.matchKeywords,
    ...entry.inputProps,
    ...entry.sourceProjects,
    ...entry.visualSignature,
    ...entry.selectionSignals,
    ...entry.compositionPatterns,
    ...entry.scriptRecipe,
    ...entry.scriptTriggersEn,
    ...entry.scriptTriggersZh,
    ...entry.negativeTriggersEn,
    ...entry.negativeTriggersZh,
    ...entry.hostSurfaces,
    ...entry.toneTags,
    ...entry.safeToChange,
    ...entry.keepFixed,
    ...entry.adaptationNotes,
    ...(entry.bestForZh ?? []),
    ...(entry.avoidZh ?? []),
    ...(entry.adaptQuickZh ?? []),
    ...(entry.cueText ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function filterMaterialLibraryEntries<T extends MaterialLibrarySearchableEntry>(
  entries: T[],
  params: MaterialLibraryFilterState,
): T[] {
  const normalizedQuery = params.query.trim().toLowerCase();

  return [...entries]
    .filter((entry) => {
      if (params.role !== "all" && entry.narrativeRole !== params.role) {
        return false;
      }

      if (params.reuseMode !== "all" && entry.reuseMode !== params.reuseMode) {
        return false;
      }

      if (params.visualWeight !== "all" && entry.visualWeight !== params.visualWeight) {
        return false;
      }

      if (params.previewability === "previewable" && !entry.hasPreview) {
        return false;
      }

      if (params.previewability === "code-only" && entry.hasPreview) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return buildMaterialSearchText(entry).includes(normalizedQuery);
    })
    .sort(compareShowcaseEntries);
}

export function groupMaterialLibraryEntriesByRole<T extends MaterialLibrarySearchableEntry>(
  entries: T[],
): Array<{ role: MaterialNarrativeRole; entries: T[] }> {
  return MATERIAL_NARRATIVE_ROLE_ORDER.map((role) => ({
    role,
    entries: entries.filter((entry) => entry.narrativeRole === role),
  })).filter((group) => group.entries.length > 0);
}
