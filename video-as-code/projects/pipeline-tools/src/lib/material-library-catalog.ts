import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

export type MaterialLibraryStability = "beta" | "stable";
export type MaterialNarrativeRole =
  | "transition"
  | "accent"
  | "component"
  | "shell"
  | "proof"
  | "environment"
  | "helper";
export type MaterialVisualWeight = "micro" | "light" | "medium" | "heavy" | "full-scene";
export type MaterialInformationDensity = "low" | "medium" | "high";
export type MaterialDominance = "supporting" | "primary" | "scene-owning";
export type MaterialReuseMode = "drop-in" | "tweak-copy" | "tweak-layout" | "heavy-adaptation";
export type MaterialMutationCost = "low" | "medium" | "high";

const NARRATIVE_ROLES = ["transition", "accent", "component", "shell", "proof", "environment", "helper"] as const;
const VISUAL_WEIGHTS = ["micro", "light", "medium", "heavy", "full-scene"] as const;
const INFORMATION_DENSITIES = ["low", "medium", "high"] as const;
const DOMINANCE_LEVELS = ["supporting", "primary", "scene-owning"] as const;
const REUSE_MODES = ["drop-in", "tweak-copy", "tweak-layout", "heavy-adaptation"] as const;
const MUTATION_COSTS = ["low", "medium", "high"] as const;

type CatalogKind = "asset" | "template";

type CatalogCommon = {
  adaptationNotes: string[];
  agentGoal: string;
  body: string;
  category: string;
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
  keywords: string[];
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
  stability: MaterialLibraryStability;
  styleFamilies: string[];
  summary: string;
  title: string;
  toneTags: string[];
  visualSignature: string[];
  visualWeight: MaterialVisualWeight;
  whenToUse: string[];
  avoidWhen: string[];
};

export type MaterialLibraryAssetCatalogEntry = CatalogCommon & {
  editableParts: string[];
  kind: "asset";
};

export type MaterialLibraryTemplateCatalogEntry = CatalogCommon & {
  editableAreas: string[];
  implementationMode: string;
  kind: "template";
  targetProject: string;
  usesAssetIds: string[];
};

export type MaterialLibraryCatalog = {
  assets: MaterialLibraryAssetCatalogEntry[];
  templates: MaterialLibraryTemplateCatalogEntry[];
};

function assertRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be a JSON object`);
  }

  return value as Record<string, unknown>;
}

function assertString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }

  return value.trim();
}

function assertStringArray(value: unknown, label: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.trim().length === 0)) {
    throw new Error(`${label} must be an array of non-empty strings`);
  }

  return value.map((item) => item.trim());
}

function assertOneOf<T extends readonly string[]>(value: unknown, label: string, allowed: T): T[number] {
  const candidate = assertString(value, label);
  if (!allowed.includes(candidate)) {
    throw new Error(`${label} must be one of: ${allowed.join(", ")}`);
  }

  return candidate as T[number];
}

function assertStability(value: unknown, label: string): MaterialLibraryStability {
  return assertOneOf(value, label, ["stable", "beta"] as const);
}

function parseFrontmatterDocument(filePath: string, source: string): { metadata: Record<string, unknown>; body: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`${filePath} must start with a JSON frontmatter block`);
  }

  const metadata = assertRecord(JSON.parse(match[1].trim()) as unknown, `${filePath} frontmatter`);
  return {
    metadata,
    body: match[2].trim(),
  };
}

function normalizeKeywords(keywords: string[], extraKeywords: string[]): string[] {
  return Array.from(new Set([...keywords, ...extraKeywords]));
}

function formatBulletList(items: string[]): string[] {
  if (!items.length) {
    return ["- None."];
  }

  return items.map((item) => `- ${item}`);
}

function formatInlineCodeList(items: string[]): string {
  if (!items.length) {
    return "None.";
  }

  return items.map((item) => `\`${item}\``).join(", ");
}

function formatInlineList(items: string[]): string {
  if (!items.length) {
    return "None.";
  }

  return items.map((item) => `\`${item}\``).join(", ");
}

function toCatalogLink(entryId: string, knownIds: Set<string>): string {
  if (!knownIds.has(entryId)) {
    return `\`${entryId}\``;
  }

  return `[\`${entryId}\`](#${toCatalogAnchorId(entryId)})`;
}

async function loadCatalogEntry(
  repoRoot: string,
  filePath: string,
  kind: CatalogKind,
): Promise<MaterialLibraryAssetCatalogEntry | MaterialLibraryTemplateCatalogEntry> {
  const source = await readFile(filePath, "utf8");
  const { metadata, body } = parseFrontmatterDocument(filePath, source);
  const label = path.relative(repoRoot, filePath).split(path.sep).join("/");
  const implementationRef = assertString(metadata.implementationRef, `${label}.implementationRef`);
  const implementationPath = path.join(repoRoot, implementationRef);
  const implementationStat = await stat(implementationPath).catch(() => null);
  if (!implementationStat?.isFile()) {
    throw new Error(`${label}.implementationRef must point to an existing file`);
  }

  const common: CatalogCommon = {
    adaptationNotes: assertStringArray(metadata.adaptationNotes, `${label}.adaptationNotes`),
    agentGoal: assertString(metadata.agentGoal, `${label}.agentGoal`),
    body,
    category: assertString(metadata.category, `${label}.category`),
    compositionPatterns: assertStringArray(metadata.compositionPatterns, `${label}.compositionPatterns`),
    dominance: assertOneOf(metadata.dominance, `${label}.dominance`, DOMINANCE_LEVELS),
    donts: assertStringArray(metadata.donts, `${label}.donts`),
    dos: assertStringArray(metadata.dos, `${label}.dos`),
    hostSurfaces: assertStringArray(metadata.hostSurfaces, `${label}.hostSurfaces`),
    id: assertString(metadata.id, `${label}.id`),
    implementationRef,
    informationDensity: assertOneOf(
      metadata.informationDensity,
      `${label}.informationDensity`,
      INFORMATION_DENSITIES,
    ),
    inputProps: assertStringArray(metadata.inputProps, `${label}.inputProps`),
    keepFixed: assertStringArray(metadata.keepFixed, `${label}.keepFixed`),
    keywords: assertStringArray(metadata.keywords, `${label}.keywords`),
    matchKeywords: normalizeKeywords(
      assertStringArray(metadata.keywords, `${label}.keywords`),
      Array.isArray(metadata.matchKeywords)
        ? assertStringArray(metadata.matchKeywords, `${label}.matchKeywords`)
        : [],
    ),
    mutationCost: assertOneOf(metadata.mutationCost, `${label}.mutationCost`, MUTATION_COSTS),
    narrativeRole: assertOneOf(metadata.narrativeRole, `${label}.narrativeRole`, NARRATIVE_ROLES),
    negativeTriggersEn: assertStringArray(metadata.negativeTriggersEn, `${label}.negativeTriggersEn`),
    negativeTriggersZh: assertStringArray(metadata.negativeTriggersZh, `${label}.negativeTriggersZh`),
    pairWithIds: assertStringArray(metadata.pairWithIds, `${label}.pairWithIds`),
    preferInsteadIds: assertStringArray(metadata.preferInsteadIds, `${label}.preferInsteadIds`),
    previewRef: assertString(metadata.previewRef, `${label}.previewRef`),
    reuseMode: assertOneOf(metadata.reuseMode, `${label}.reuseMode`, REUSE_MODES),
    safeToChange: assertStringArray(metadata.safeToChange, `${label}.safeToChange`),
    sceneTypes: Array.isArray(metadata.sceneTypes)
      ? assertStringArray(metadata.sceneTypes, `${label}.sceneTypes`)
      : [],
    scriptRecipe: assertStringArray(metadata.scriptRecipe, `${label}.scriptRecipe`),
    scriptTriggersEn: assertStringArray(metadata.scriptTriggersEn, `${label}.scriptTriggersEn`),
    scriptTriggersZh: assertStringArray(metadata.scriptTriggersZh, `${label}.scriptTriggersZh`),
    selectionSignals: assertStringArray(metadata.selectionSignals, `${label}.selectionSignals`),
    sourceProjects: assertStringArray(metadata.sourceProjects, `${label}.sourceProjects`),
    stability: assertStability(metadata.stability, `${label}.stability`),
    styleFamilies: Array.isArray(metadata.styleFamilies)
      ? assertStringArray(metadata.styleFamilies, `${label}.styleFamilies`)
      : [],
    summary: assertString(metadata.summary, `${label}.summary`),
    title: assertString(metadata.title, `${label}.title`),
    toneTags: assertStringArray(metadata.toneTags, `${label}.toneTags`),
    visualSignature: assertStringArray(metadata.visualSignature, `${label}.visualSignature`),
    visualWeight: assertOneOf(metadata.visualWeight, `${label}.visualWeight`, VISUAL_WEIGHTS),
    whenToUse: assertStringArray(metadata.whenToUse, `${label}.whenToUse`),
    avoidWhen: assertStringArray(metadata.avoidWhen, `${label}.avoidWhen`),
  };

  if (kind === "asset") {
    return {
      ...common,
      editableParts: assertStringArray(metadata.editableParts, `${label}.editableParts`),
      kind,
    };
  }

  return {
    ...common,
    editableAreas: assertStringArray(metadata.editableAreas, `${label}.editableAreas`),
    implementationMode: assertString(metadata.implementationMode, `${label}.implementationMode`),
    kind,
    targetProject: assertString(metadata.targetProject, `${label}.targetProject`),
    usesAssetIds: assertStringArray(metadata.usesAssetIds, `${label}.usesAssetIds`),
  };
}

async function loadCatalogFolder(
  repoRoot: string,
  directory: string,
  kind: CatalogKind,
  optional = false,
): Promise<Array<MaterialLibraryAssetCatalogEntry | MaterialLibraryTemplateCatalogEntry>> {
  const entries = await readdir(directory, { withFileTypes: true }).catch((error: NodeJS.ErrnoException) => {
    if (optional && error.code === "ENOENT") return [];
    throw error;
  });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(directory, entry.name));

  const loaded = await Promise.all(files.map((filePath) => loadCatalogEntry(repoRoot, filePath, kind)));
  loaded.sort((left, right) => left.id.localeCompare(right.id));
  return loaded;
}

export async function loadMaterialLibraryCatalog(repoRoot: string): Promise<MaterialLibraryCatalog> {
  const catalogRoot = path.join(repoRoot, "material-library", "catalog");
  const assets = (await loadCatalogFolder(repoRoot, path.join(catalogRoot, "assets"), "asset")) as MaterialLibraryAssetCatalogEntry[];
  const templates = (await loadCatalogFolder(repoRoot, path.join(catalogRoot, "templates"), "template", true)) as MaterialLibraryTemplateCatalogEntry[];

  const seenIds = new Set<string>();
  for (const entry of [...assets, ...templates]) {
    if (seenIds.has(entry.id)) {
      throw new Error(`Duplicate material-library catalog id: ${entry.id}`);
    }
    seenIds.add(entry.id);
  }

  const allIds = new Set([...assets, ...templates].map((entry) => entry.id));
  for (const entry of [...assets, ...templates]) {
    for (const linkedId of [...entry.pairWithIds, ...entry.preferInsteadIds]) {
      if (!allIds.has(linkedId)) {
        throw new Error(`${entry.id} references missing catalog id ${linkedId}`);
      }
    }
  }

  const assetIds = new Set(assets.map((entry) => entry.id));
  for (const template of templates) {
    for (const assetId of template.usesAssetIds) {
      if (!assetIds.has(assetId)) {
        throw new Error(`${template.id} references missing asset id ${assetId}`);
      }
    }
  }

  return {
    assets,
    templates,
  };
}

export function toCatalogAnchorId(entryId: string): string {
  return entryId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function formatEntry(
  entry: MaterialLibraryAssetCatalogEntry | MaterialLibraryTemplateCatalogEntry,
  typeLabel: string,
  knownIds: Set<string>,
): string {
  const editableLabel = entry.kind === "asset" ? "Editable parts" : "Editable areas";
  const editableValues = entry.kind === "asset" ? entry.editableParts : entry.editableAreas;

  const lines = [
    `<a id="${toCatalogAnchorId(entry.id)}"></a>`,
    `### ${entry.title}`,
    "",
    "#### Overview",
    "",
    `- Type: \`${typeLabel}\``,
    `- ID: \`${entry.id}\``,
    `- Stability: \`${entry.stability}\``,
    `- Category: \`${entry.category}\``,
    `- Narrative role: \`${entry.narrativeRole}\``,
    `- Summary: ${entry.summary}`,
    "",
    "#### Script Match",
    "",
    `- Script triggers (EN): ${formatInlineCodeList(entry.scriptTriggersEn)}`,
    `- Negative triggers (EN): ${formatInlineCodeList(entry.negativeTriggersEn)}`,
    `- Host surfaces: ${formatInlineList(entry.hostSurfaces)}`,
    "",
    "#### Fit Profile",
    "",
    `- Tone tags: ${formatInlineList(entry.toneTags)}`,
    `- Visual weight: \`${entry.visualWeight}\``,
    `- Information density: \`${entry.informationDensity}\``,
    `- Dominance: \`${entry.dominance}\``,
    "",
    "Best fit:",
    ...formatBulletList(entry.whenToUse),
    "",
    "Avoid when:",
    ...formatBulletList(entry.avoidWhen),
    "",
    "Selection signals:",
    ...formatBulletList(entry.selectionSignals),
    "",
    "Visual signature:",
    ...formatBulletList(entry.visualSignature),
    "",
    "#### Adapt Safely",
    "",
    `- Reuse mode: \`${entry.reuseMode}\``,
    `- Mutation cost: \`${entry.mutationCost}\``,
    `- Input props: ${formatInlineCodeList(entry.inputProps)}`,
    `- ${editableLabel}: ${formatInlineCodeList(editableValues)}`,
    "",
    "Safe to change:",
    ...formatBulletList(entry.safeToChange),
    "",
    "Keep fixed:",
    ...formatBulletList(entry.keepFixed),
    "",
    "Adaptation notes:",
    ...formatBulletList(entry.adaptationNotes),
    "",
    "Composition patterns:",
    ...formatBulletList(entry.compositionPatterns),
    "",
    "Script recipe:",
    ...formatBulletList(entry.scriptRecipe),
    "",
    "Do:",
    ...formatBulletList(entry.dos),
    "",
    "Don't:",
    ...formatBulletList(entry.donts),
    "",
    "#### Pair With",
    "",
    ...formatBulletList(entry.pairWithIds.map((id) => toCatalogLink(id, knownIds))),
    "",
    "#### Prefer Instead",
    "",
    ...formatBulletList(entry.preferInsteadIds.map((id) => toCatalogLink(id, knownIds))),
    "",
    "#### Agent Notes",
    "",
    entry.body || "No additional Agent notes.",
    "",
    "#### Implementation / Preview",
    "",
    `- Source projects: ${formatInlineCodeList(entry.sourceProjects)}`,
    `- Scene types: ${formatInlineCodeList(entry.sceneTypes)}`,
    `- Style families: ${formatInlineCodeList(entry.styleFamilies)}`,
    `- Implementation: \`${entry.implementationRef}\``,
    `- Preview: \`${entry.previewRef}\``,
  ];

  return lines.join("\n");
}

function buildQuickIndexSection(
  title: string,
  entries: Array<MaterialLibraryAssetCatalogEntry | MaterialLibraryTemplateCatalogEntry>,
): string[] {
  if (!entries.length) {
    return [`### ${title}`, "", "No curated entries yet.", ""];
  }

  const groupedByRole = new Map<MaterialNarrativeRole, Array<MaterialLibraryAssetCatalogEntry | MaterialLibraryTemplateCatalogEntry>>();
  for (const entry of entries) {
    const list = groupedByRole.get(entry.narrativeRole) ?? [];
    list.push(entry);
    groupedByRole.set(entry.narrativeRole, list);
  }

  return [
    `### ${title}`,
    "",
    ...Array.from(groupedByRole.entries())
      .sort(([left], [right]) => left.localeCompare(right))
      .flatMap(([role, roleEntries]) => {
        const groupedByHost = new Map<string, typeof roleEntries>();
        for (const entry of roleEntries) {
          const key = entry.hostSurfaces[0] ?? "general";
          const list = groupedByHost.get(key) ?? [];
          list.push(entry);
          groupedByHost.set(key, list);
        }

        return [
          `#### ${role}`,
          "",
          ...Array.from(groupedByHost.entries())
            .sort(([left], [right]) => left.localeCompare(right))
            .flatMap(([hostSurface, hostEntries]) => [
              `- Host surface: \`${hostSurface}\``,
              ...hostEntries.map(
                (entry) =>
                  `  - [${entry.title}](#${toCatalogAnchorId(entry.id)}) - \`${entry.reuseMode}\`, \`${entry.visualWeight}\``,
              ),
            ]),
          "",
        ];
      }),
  ];
}

export function buildMaterialLibraryIndexMarkdown(catalog: MaterialLibraryCatalog): string {
  const knownIds = new Set([...catalog.assets, ...catalog.templates].map((entry) => entry.id));
  const assetBlocks = catalog.assets.map((entry) => formatEntry(entry, `asset/${entry.category}`, knownIds));
  const templateBlocks = catalog.templates.map((entry) => formatEntry(entry, `template/${entry.category}`, knownIds));

  return [
    "# Material Library Index",
    "",
    "Generated from `material-library/catalog/`. Use this file as the human-readable decision handbook, and the registries as the machine-readable source of truth.",
    "",
    "## Quick Index",
    "",
    ...buildQuickIndexSection("Assets", catalog.assets),
    ...buildQuickIndexSection("Templates", catalog.templates),
    "## Assets",
    "",
    ...assetBlocks,
    "",
    "## Templates",
    "",
    ...(templateBlocks.length ? templateBlocks : ["No curated templates yet."]),
    "",
  ].join("\n");
}

export async function writeMaterialLibraryIndex(
  repoRoot: string,
  catalog: MaterialLibraryCatalog,
): Promise<void> {
  const docsDir = path.join(repoRoot, "docs", "material-library");
  await mkdir(docsDir, { recursive: true });
  const docsPath = path.join(docsDir, "index.md");
  await writeFile(docsPath, buildMaterialLibraryIndexMarkdown(catalog), "utf8");
}
