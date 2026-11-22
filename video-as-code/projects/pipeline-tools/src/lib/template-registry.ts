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

export interface TemplateRegistryEntry {
  adaptationNotes: string[];
  agentGoal: string;
  compositionPatterns: string[];
  dominance: MaterialDominance;
  donts: string[];
  dos: string[];
  editableAreas: string[];
  hostSurfaces: string[];
  id: string;
  implementationMode: string;
  implementationRef: string;
  informationDensity: MaterialInformationDensity;
  inputProps: string[];
  keepFixed: string[];
  matchKeywords: string[];
  mutationCost: MaterialMutationCost;
  narrativeRole: MaterialNarrativeRole;
  negativeTriggersEn: string[];
  negativeTriggersZh: string[];
  path: string;
  pairWithIds: string[];
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
  targetProject: string;
  title: string;
  toneTags: string[];
  usesAssetIds: string[];
  visualSignature: string[];
  visualWeight: MaterialVisualWeight;
  whenToUse: string[];
  avoidWhen: string[];
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

function inferImplementationMode(relativePath: string): string {
  if (relativePath.includes(`${path.sep}short-script-assets${path.sep}`)) {
    return "short-script-asset";
  }
  if (relativePath.includes(`${path.sep}short-assets${path.sep}`)) {
    return "short-asset";
  }
  if (relativePath.includes(`${path.sep}motion${path.sep}`)) {
    return "motion";
  }
  if (relativePath.includes(`${path.sep}scenes${path.sep}`)) {
    return "scene";
  }
  if (relativePath.includes(`${path.sep}project-bootstrap${path.sep}`)) {
    return "project-bootstrap";
  }
  return "generic";
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

export type CatalogTemplateEntry = {
  adaptationNotes: string[];
  agentGoal: string;
  compositionPatterns: string[];
  dominance: MaterialDominance;
  donts: string[];
  dos: string[];
  editableAreas: string[];
  hostSurfaces: string[];
  id: string;
  implementationMode: string;
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
  targetProject: string;
  title: string;
  toneTags: string[];
  usesAssetIds: string[];
  visualSignature: string[];
  visualWeight: MaterialVisualWeight;
  whenToUse: string[];
  avoidWhen: string[];
  path?: string;
};

export async function buildTemplateRegistry(
  repoRoot: string,
  catalogEntries: CatalogTemplateEntry[] = [],
): Promise<TemplateRegistryEntry[]> {
  const templatesRoot = path.join(repoRoot, "templates");
  const registryPath = path.join(templatesRoot, "registry.json");
  const files = await walkFiles(templatesRoot);
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

  const entries: TemplateRegistryEntry[] = [];
  const seenIds = new Set<string>();

  for (const entry of catalogEntries) {
    entries.push({
      adaptationNotes: entry.adaptationNotes,
      agentGoal: entry.agentGoal,
      compositionPatterns: entry.compositionPatterns,
      dominance: entry.dominance,
      donts: entry.donts,
      dos: entry.dos,
      editableAreas: entry.editableAreas,
      hostSurfaces: entry.hostSurfaces,
      id: entry.id,
      implementationMode: entry.implementationMode,
      implementationRef: entry.implementationRef,
      informationDensity: entry.informationDensity,
      inputProps: entry.inputProps,
      keepFixed: entry.keepFixed,
      matchKeywords: entry.matchKeywords,
      mutationCost: entry.mutationCost,
      narrativeRole: entry.narrativeRole,
      negativeTriggersEn: entry.negativeTriggersEn,
      negativeTriggersZh: entry.negativeTriggersZh,
      path: entry.path ?? entry.implementationRef,
      pairWithIds: entry.pairWithIds,
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
      targetProject: entry.targetProject,
      title: entry.title,
      toneTags: entry.toneTags,
      usesAssetIds: entry.usesAssetIds,
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

    entries.push({
      adaptationNotes: [
        "Treat this as an uncurated template fallback. Confirm layout structure manually before reusing it in a script-generated flow.",
      ],
      agentGoal: "Fallback raw template lookup. Use only after curated templates fail to fit the scene plan.",
      compositionPatterns: ["Use this only as a manual shell fallback after curated template options are exhausted."],
      dominance: "primary",
      donts: ["Do not prioritize this ahead of a curated template with explicit usage guidance."],
      dos: ["Inspect the template directly and confirm its structure before using it in a generated flow."],
      editableAreas: [],
      hostSurfaces: ["manual-fallback"],
      id,
      implementationMode: inferImplementationMode(relativePath),
      implementationRef: toPosix(relativePath),
      informationDensity: "medium",
      inputProps: [],
      keepFixed: ["Treat the raw template structure as fixed until it is promoted into a curated entry."],
      matchKeywords: [],
      mutationCost: "high",
      narrativeRole: "shell",
      negativeTriggersEn: ["curated template exists", "needs automatic recommendation"],
      negativeTriggersZh: ["已有 curated 模板", "需要自动推荐"],
      path: toPosix(relativePath),
      pairWithIds: [],
      preferInsteadIds: [],
      previewRef: null,
      reuseMode: "heavy-adaptation",
      safeToChange: ["Wrap the raw template in a curated entry before recommending it automatically."],
      sceneTypes: [],
      scriptRecipe: ["Only fall back to this raw template after curated entries fail to fit the script need."],
      scriptTriggersEn: ["raw template fallback", "manual template lookup"],
      scriptTriggersZh: ["原始模板兜底", "手动模板查找"],
      selectionSignals: ["Only use this when no curated template already fits the scene structure you need."],
      sourceProjects: [],
      stability: "beta",
      styleFamilies: [],
      summary: "Uncurated template entry.",
      targetProject: "generic",
      title: titleCase(path.basename(relativePath, path.extname(relativePath))),
      toneTags: ["fallback"],
      usesAssetIds: [],
      visualSignature: [],
      visualWeight: "medium",
      whenToUse: ["Use when a project needs a base template not yet curated."],
      avoidWhen: ["Avoid when a curated material-library template already exists."],
    });
  }

  entries.sort((left, right) => left.path.localeCompare(right.path));
  await writeFile(registryPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  return entries;
}
