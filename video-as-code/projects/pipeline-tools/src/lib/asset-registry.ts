import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import type {
  MaterialDominance,
  MaterialInformationDensity,
  MaterialMutationCost,
  MaterialNarrativeRole,
  MaterialReuseMode,
  MaterialVisualWeight,
} from "./material-library-catalog.js";

export interface AssetRegistryEntry {
  adaptationNotes: string[];
  agentGoal: string;
  compositionPatterns: string[];
  dominance: MaterialDominance;
  donts: string[];
  dos: string[];
  hostSurfaces: string[];
  id: string;
  implementationRef: string;
  informationDensity: MaterialInformationDensity;
  inputProps: string[];
  keepFixed: string[];
  kind: string;
  matchKeywords: string[];
  mutationCost: MaterialMutationCost;
  narrativeRole: MaterialNarrativeRole;
  negativeTriggersEn: string[];
  negativeTriggersZh: string[];
  pairWithIds: string[];
  path: string;
  preferInsteadIds: string[];
  previewRef: string | null;
  reuseMode: MaterialReuseMode;
  safeToChange: string[];
  sceneTypes: string[];
  scriptRecipe: string[];
  scriptTriggersEn: string[];
  scriptTriggersZh: string[];
  selectionSignals: string[];
  sourceProjects: string[];
  stability: "stable" | "beta";
  styleFamilies: string[];
  summary: string;
  tags: string[];
  title: string;
  toneTags: string[];
  visualSignature: string[];
  visualWeight: MaterialVisualWeight;
  whenToUse: string[];
  avoidWhen: string[];
  editableParts: string[];
}

async function walkFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function toPosix(relativePath: string): string {
  return relativePath.split(path.sep).join("/");
}

function inferKind(relativePath: string): string {
  const segments = relativePath.split(path.sep);
  return segments[1] ?? "unknown";
}

function buildTags(relativePath: string): string[] {
  const withoutExt = relativePath.replace(path.extname(relativePath), "");
  return Array.from(
    new Set(
      withoutExt
        .split(/[\\/._-]+/)
        .map((part) => part.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

function buildRegistryId(relativePath: string, duplicateBaseIds: Set<string>): string {
  const baseId = toPosix(relativePath.replace(path.extname(relativePath), ""));
  if (!duplicateBaseIds.has(baseId)) {
    return baseId;
  }

  return toPosix(relativePath);
}

function titleCase(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .trim();
}

export type CatalogAssetEntry = {
  adaptationNotes: string[];
  agentGoal: string;
  compositionPatterns: string[];
  dominance: MaterialDominance;
  donts: string[];
  dos: string[];
  editableParts: string[];
  hostSurfaces: string[];
  id: string;
  implementationRef: string;
  informationDensity: MaterialInformationDensity;
  inputProps: string[];
  keepFixed: string[];
  matchKeywords: string[];
  mutationCost: MaterialMutationCost;
  narrativeRole: MaterialNarrativeRole;
  negativeTriggersEn: string[];
  negativeTriggersZh: string[];
  pairWithIds: string[];
  preferInsteadIds: string[];
  previewRef: string;
  reuseMode: MaterialReuseMode;
  safeToChange: string[];
  sceneTypes: string[];
  scriptRecipe: string[];
  scriptTriggersEn: string[];
  scriptTriggersZh: string[];
  selectionSignals: string[];
  sourceProjects: string[];
  stability: "stable" | "beta";
  styleFamilies: string[];
  summary: string;
  title: string;
  toneTags: string[];
  visualSignature: string[];
  visualWeight: MaterialVisualWeight;
  whenToUse: string[];
  avoidWhen: string[];
  path?: string;
  tags?: string[];
};

export async function buildAssetRegistry(
  repoRoot: string,
  catalogEntries: CatalogAssetEntry[] = [],
): Promise<AssetRegistryEntry[]> {
  const assetsRoot = path.join(repoRoot, "assets");
  const registryPath = path.join(assetsRoot, "registry.json");
  const files = await walkFiles(assetsRoot);
  const relativePaths = files
    .filter((file) => file !== registryPath)
    .map((file) => path.relative(repoRoot, file));
  const baseIdCounts = new Map<string, number>();

  for (const relativePath of relativePaths) {
    const baseId = toPosix(relativePath.replace(path.extname(relativePath), ""));
    baseIdCounts.set(baseId, (baseIdCounts.get(baseId) ?? 0) + 1);
  }

  const duplicateBaseIds = new Set(
    Array.from(baseIdCounts.entries())
      .filter(([, count]) => count > 1)
      .map(([baseId]) => baseId),
  );

  const entries: AssetRegistryEntry[] = [];
  const seenIds = new Set<string>();

  for (const entry of catalogEntries) {
    entries.push({
      adaptationNotes: entry.adaptationNotes,
      agentGoal: entry.agentGoal,
      compositionPatterns: entry.compositionPatterns,
      dominance: entry.dominance,
      donts: entry.donts,
      dos: entry.dos,
      editableParts: entry.editableParts,
      hostSurfaces: entry.hostSurfaces,
      id: entry.id,
      implementationRef: entry.implementationRef,
      informationDensity: entry.informationDensity,
      inputProps: entry.inputProps,
      keepFixed: entry.keepFixed,
      kind: "material-library",
      matchKeywords: entry.matchKeywords,
      mutationCost: entry.mutationCost,
      narrativeRole: entry.narrativeRole,
      negativeTriggersEn: entry.negativeTriggersEn,
      negativeTriggersZh: entry.negativeTriggersZh,
      pairWithIds: entry.pairWithIds,
      path: entry.path ?? entry.implementationRef,
      preferInsteadIds: entry.preferInsteadIds,
      previewRef: entry.previewRef ?? null,
      reuseMode: entry.reuseMode,
      safeToChange: entry.safeToChange,
      sceneTypes: entry.sceneTypes,
      scriptRecipe: entry.scriptRecipe,
      scriptTriggersEn: entry.scriptTriggersEn,
      scriptTriggersZh: entry.scriptTriggersZh,
      selectionSignals: entry.selectionSignals,
      sourceProjects: entry.sourceProjects,
      stability: entry.stability,
      styleFamilies: entry.styleFamilies,
      summary: entry.summary,
      tags: entry.tags ?? entry.matchKeywords,
      title: entry.title,
      toneTags: entry.toneTags,
      visualSignature: entry.visualSignature,
      visualWeight: entry.visualWeight,
      whenToUse: entry.whenToUse,
      avoidWhen: entry.avoidWhen,
    });
    seenIds.add(entry.id);
  }

  for (const file of files) {
    if (file === registryPath) {
      continue;
    }

    const fileStat = await stat(file);
    if (!fileStat.isFile()) {
      continue;
    }

    const relativePath = path.relative(repoRoot, file);
    const id = buildRegistryId(relativePath, duplicateBaseIds);
    if (seenIds.has(id)) {
      continue;
    }

    const tags = buildTags(relativePath);
    entries.push({
      adaptationNotes: [
        "Treat this as a manual fallback asset. Inspect the file directly before trying to reuse it in a script-generated scene.",
      ],
      agentGoal: "Fallback raw asset lookup. Use only when no curated material-library entry matches the scene need.",
      compositionPatterns: ["Use only as a manual fallback and keep the surrounding composition simple while validating the raw asset."],
      dominance: "supporting",
      donts: [
        "Do not prioritize this ahead of a curated material-library entry with guidance, fit metadata, and preview coverage.",
      ],
      dos: ["Inspect the raw asset directly and confirm its look before using it in a generated composition."],
      editableParts: [],
      hostSurfaces: ["manual-fallback"],
      id,
      implementationRef: toPosix(relativePath),
      informationDensity: "medium",
      inputProps: [],
      keepFixed: ["Treat the original asset file as fixed until a curated wrapper exists."],
      kind: inferKind(relativePath),
      matchKeywords: tags,
      mutationCost: "high",
      narrativeRole: "helper",
      negativeTriggersEn: ["curated material exists", "needs automatic recommendation"],
      negativeTriggersZh: ["\u5df2\u6709 curated \u7d20\u6750", "\u9700\u8981\u81ea\u52a8\u63a8\u8350"],
      pairWithIds: [],
      path: toPosix(relativePath),
      preferInsteadIds: [],
      previewRef: null,
      reuseMode: "heavy-adaptation",
      safeToChange: ["Wrap it in a new curated component or derivative implementation if the asset turns out to be the only viable source."],
      sceneTypes: [],
      scriptRecipe: ["Only fall back to this raw asset after curated entries fail to fit the script need."],
      scriptTriggersEn: ["raw fallback", "manual asset lookup"],
      scriptTriggersZh: ["\u539f\u59cb\u7d20\u6750\u515c\u5e95", "\u624b\u52a8\u7d20\u6750\u67e5\u627e"],
      selectionSignals: ["Only use this when no curated material-library entry already matches the scene need."],
      sourceProjects: [],
      stability: "beta",
      styleFamilies: [],
      summary: "Uncurated asset entry.",
      tags,
      title: titleCase(path.basename(relativePath, path.extname(relativePath))),
      toneTags: ["fallback"],
      visualSignature: [],
      visualWeight: "medium",
      whenToUse: ["Use when a project needs a raw asset that is not yet curated."],
      avoidWhen: ["Avoid when a curated material-library asset already exists."],
    });
  }

  entries.sort((left, right) => left.path.localeCompare(right.path));
  await writeFile(registryPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  return entries;
}
