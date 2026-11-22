import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import {
  buildMaterialLibraryIndexMarkdown,
  loadMaterialLibraryCatalog,
} from "./material-library-catalog.js";
import { recommendMaterialCandidates } from "./material-match.js";
import { findRepoRoot } from "./output-paths.js";

type FixtureAssetOptions = {
  body?: string;
  id?: string;
  metadata?: Record<string, unknown>;
  name: string;
};

async function withFixtureRepo(
  assets: FixtureAssetOptions[],
  run: (repoRoot: string) => Promise<void>,
): Promise<void> {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "material-library-catalog-"));
  const assetCatalogDir = path.join(repoRoot, "material-library", "catalog", "assets");
  const templateCatalogDir = path.join(repoRoot, "material-library", "catalog", "templates");
  const srcDir = path.join(repoRoot, "material-library", "src");

  await mkdir(assetCatalogDir, { recursive: true });
  await mkdir(templateCatalogDir, { recursive: true });
  await mkdir(srcDir, { recursive: true });

  for (const asset of assets) {
    const implementationRef = `material-library/src/${asset.name}.ts`;
    await writeFile(path.join(repoRoot, implementationRef), `export const ${asset.name.replace(/[^a-z0-9]/gi, "_")} = true;\n`, "utf8");

    const metadata = {
      id: asset.id ?? `material-library/test/${asset.name}`,
      title: `Fixture ${asset.name}`,
      category: "chat",
      summary: `Fixture summary for ${asset.name}.`,
      agentGoal: `Fixture agent goal for ${asset.name}.`,
      whenToUse: ["Use when the fixture scene needs this asset."],
      avoidWhen: ["Avoid when the fixture scene does not need this asset."],
      keywords: ["fixture", asset.name],
      matchKeywords: [`fixture ${asset.name}`],
      inputProps: ["value"],
      sourceProjects: ["projects/fixture"],
      previewRef: `material-library/showcase#${asset.name}`,
      stability: "stable",
      implementationRef,
      sceneTypes: ["chat"],
      styleFamilies: ["fixture-light"],
      editableParts: ["value"],
      narrativeRole: "component",
      scriptTriggersEn: [`fixture ${asset.name} trigger`],
      scriptTriggersZh: [`夹具 ${asset.name} 触发词`],
      negativeTriggersEn: ["fixture negative trigger"],
      negativeTriggersZh: ["夹具负向触发词"],
      hostSurfaces: ["fixture surface"],
      toneTags: ["fixture-tone"],
      visualWeight: "light",
      informationDensity: "medium",
      dominance: "primary",
      reuseMode: "tweak-copy",
      mutationCost: "low",
      safeToChange: ["fixture value"],
      keepFixed: ["fixture structure"],
      adaptationNotes: ["Adapt fixture copy first."],
      visualSignature: ["Fixture visual signature."],
      selectionSignals: ["Fixture selection signal."],
      compositionPatterns: ["Fixture composition pattern."],
      pairWithIds: [],
      preferInsteadIds: [],
      dos: ["Fixture do guidance."],
      donts: ["Fixture don't guidance."],
      scriptRecipe: ["Fixture script recipe."],
      ...asset.metadata,
    };

    const docSource = `---\n${JSON.stringify(metadata, null, 2)}\n---\n${asset.body ?? `Fixture notes for ${asset.name}.`}\n`;
    await writeFile(path.join(assetCatalogDir, `${asset.name}.md`), docSource, "utf8");
  }

  try {
    await run(repoRoot);
  } finally {
    await rm(repoRoot, { recursive: true, force: true });
  }
}

test("material library catalog loads curated assets from the repo", async () => {
  const repoRoot = await findRepoRoot(fileURLToPath(import.meta.url));
  const catalog = await loadMaterialLibraryCatalog(repoRoot);

  assert.ok(catalog.assets.length > 0, "Expected at least one asset catalog entry");
  assert.ok(Array.isArray(catalog.templates), "Expected templates to load even when empty");
  assert.ok(catalog.assets.every((entry) => entry.agentGoal.length > 0), "Expected enriched agent metadata");
});

test("material library catalog rejects missing agent guidance fields", async () => {
  await withFixtureRepo(
    [
      {
        name: "missing-agent-goal",
        metadata: {
          agentGoal: undefined,
        },
      },
    ],
    async (repoRoot) => {
      await assert.rejects(
        () => loadMaterialLibraryCatalog(repoRoot),
        /agentGoal must be a non-empty string/,
      );
    },
  );
});

test("material library catalog rejects invalid enum metadata", async () => {
  await withFixtureRepo(
    [
      {
        name: "invalid-role",
        metadata: {
          narrativeRole: "not-a-role",
        },
      },
    ],
    async (repoRoot) => {
      await assert.rejects(
        () => loadMaterialLibraryCatalog(repoRoot),
        /narrativeRole must be one of/,
      );
    },
  );
});

test("material library catalog rejects duplicate ids", async () => {
  await withFixtureRepo(
    [
      { name: "first", id: "material-library/test/duplicate" },
      { name: "second", id: "material-library/test/duplicate" },
    ],
    async (repoRoot) => {
      await assert.rejects(
        () => loadMaterialLibraryCatalog(repoRoot),
        /Duplicate material-library catalog id/,
      );
    },
  );
});

test("material library catalog rejects invalid pairWith references", async () => {
  await withFixtureRepo(
    [
      {
        name: "invalid-pair",
        metadata: {
          pairWithIds: ["material-library/test/missing-entry"],
        },
      },
    ],
    async (repoRoot) => {
      await assert.rejects(
        () => loadMaterialLibraryCatalog(repoRoot),
        /references missing catalog id/,
      );
    },
  );
});

test("material library catalog rejects missing preview refs and stability", async () => {
  await withFixtureRepo(
    [
      {
        name: "missing-preview",
        metadata: {
          previewRef: undefined,
        },
      },
    ],
    async (repoRoot) => {
      await assert.rejects(
        () => loadMaterialLibraryCatalog(repoRoot),
        /previewRef must be a non-empty string/,
      );
    },
  );

  await withFixtureRepo(
    [
      {
        name: "missing-stability",
        metadata: {
          stability: undefined,
        },
      },
    ],
    async (repoRoot) => {
      await assert.rejects(
        () => loadMaterialLibraryCatalog(repoRoot),
        /stability must be a non-empty string/,
      );
    },
  );
});

test("material library docs index contains the richer playbook sections", async () => {
  await withFixtureRepo(
    [
      {
        name: "rich-index",
        metadata: {
          pairWithIds: ["material-library/test/linked"],
        },
      },
      {
        name: "linked",
      },
    ],
    async (repoRoot) => {
      const catalog = await loadMaterialLibraryCatalog(repoRoot);
      const markdown = buildMaterialLibraryIndexMarkdown(catalog);

      assert.match(markdown, /## Quick Index/);
      assert.match(markdown, /#### Script Match/);
      assert.match(markdown, /#### Fit Profile/);
      assert.match(markdown, /#### Adapt Safely/);
      assert.match(markdown, /#### Pair With/);
      assert.match(markdown, /#### Agent Notes/);
      assert.match(markdown, /#### Implementation \/ Preview/);
    },
  );
});

test("material matching ranks curated hits and falls back to handcraft when fit is weak", () => {
  const entries = [
    {
      adaptationNotes: ["Keep shell framing stable."],
      agentGoal: "Fixture goal.",
      compositionPatterns: ["Use as a proof card."],
      dominance: "primary",
      donts: ["Do not overload it."],
      dos: ["Use after context is set."],
      editableParts: ["label"],
      hostSurfaces: ["chat thread"],
      id: "material-library/chat/support-proof",
      implementationRef: "material-library/src/fixture.tsx",
      informationDensity: "medium",
      inputProps: ["label"],
      keepFixed: ["proof hierarchy"],
      kind: "material-library",
      matchKeywords: ["support proof"],
      mutationCost: "low",
      narrativeRole: "proof",
      negativeTriggersEn: ["tiny status update"],
      negativeTriggersZh: ["很小的状态更新"],
      pairWithIds: [],
      path: "material-library/src/fixture.tsx",
      preferInsteadIds: [],
      previewRef: "material-library/showcase#fixture",
      reuseMode: "drop-in",
      safeToChange: ["label"],
      sceneTypes: ["chat"],
      scriptRecipe: ["Use on the proof beat."],
      scriptTriggersEn: ["human handoff", "support proof"],
      scriptTriggersZh: ["人工交接", "支持证明"],
      selectionSignals: ["Use when handoff must be visible."],
      sourceProjects: ["projects/fixture"],
      stability: "stable",
      styleFamilies: ["fixture"],
      summary: "Fixture support proof.",
      tags: ["support"],
      title: "Fixture Support Proof",
      toneTags: ["support"],
      visualSignature: ["Proof-first card."],
      visualWeight: "medium",
      whenToUse: ["Use for visible handoff proof."],
      avoidWhen: ["Avoid for tiny status badges."],
    },
    {
      adaptationNotes: ["Treat as fallback."],
      agentGoal: "Fallback raw asset lookup.",
      compositionPatterns: ["Use only as fallback."],
      dominance: "supporting",
      donts: ["Do not auto recommend."],
      dos: ["Inspect manually."],
      editableParts: [],
      hostSurfaces: ["manual-fallback"],
      id: "assets/fallback/raw",
      implementationRef: "assets/fallback/raw.svg",
      informationDensity: "medium",
      inputProps: [],
      keepFixed: ["raw asset file"],
      kind: "icons",
      matchKeywords: ["fallback"],
      mutationCost: "high",
      narrativeRole: "helper",
      negativeTriggersEn: ["curated material exists"],
      negativeTriggersZh: ["已有 curated 素材"],
      pairWithIds: [],
      path: "assets/fallback/raw.svg",
      preferInsteadIds: [],
      previewRef: null,
      reuseMode: "heavy-adaptation",
      safeToChange: ["wrap in curated component"],
      sceneTypes: [],
      scriptRecipe: ["Use only when no curated entry fits."],
      scriptTriggersEn: ["raw fallback"],
      scriptTriggersZh: ["原始素材兜底"],
      selectionSignals: ["Only use when nothing curated fits."],
      sourceProjects: [],
      stability: "beta",
      styleFamilies: [],
      summary: "Raw asset fallback.",
      tags: ["fallback"],
      title: "Raw Fallback",
      toneTags: ["fallback"],
      visualSignature: [],
      visualWeight: "medium",
      whenToUse: ["Use only as manual fallback."],
      avoidWhen: ["Avoid when curated material exists."],
    },
  ] as const;

  const matched = recommendMaterialCandidates(entries as any, {
    hostSurfaces: ["chat thread"],
    informationDensity: "medium",
    maxMutationCost: "low",
    narrativeRole: "proof",
    scriptText: "We need a visible human handoff in chat",
    toneTags: ["support"],
    visualWeight: "medium",
  });
  assert.equal(matched.decision, "reuse");
  assert.equal(matched.candidates[0]?.entry.id, "material-library/chat/support-proof");

  const weak = recommendMaterialCandidates(entries as any, {
    narrativeRole: "transition",
    scriptText: "Need a quiet brand resolve end card",
    toneTags: ["brand"],
    visualWeight: "full-scene",
  });
  assert.equal(weak.decision, "handcraft");
});
