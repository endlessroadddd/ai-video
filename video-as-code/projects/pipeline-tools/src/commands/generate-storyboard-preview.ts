import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertStagePrerequisites,
  ensureCaseStageDirs,
  findRepoRoot,
  getCaseOutputPaths,
} from "../lib/output-paths.js";
import { generateNanobananaPreview } from "../lib/nanobanana-client.js";

interface StoryboardScene {
  sceneId: string;
  sceneGoal: string;
  staticStates: unknown[];
  motionSteps: unknown[];
  timing: Record<string, unknown>;
  easing: Record<string, unknown>;
  assetBindings: unknown[];
  templateBindings: unknown[];
  copySlots: Record<string, unknown>;
}

interface StoryboardDocument {
  caseSlug?: string;
  scenes: StoryboardScene[];
}

function readFlag(flagName: string): string | null {
  const index = process.argv.indexOf(flagName);
  if (index === -1) {
    return null;
  }

  return process.argv[index + 1] ?? null;
}

function stringifyUnknown(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}

function buildPrompt(
  brief: Record<string, unknown>,
  constraints: Record<string, unknown>,
  scene: StoryboardScene,
): string {
  const staticStates = scene.staticStates.map((state) => `- ${stringifyUnknown(state)}`).join("\n");
  const motionSteps = scene.motionSteps.map((step) => `- ${stringifyUnknown(step)}`).join("\n");
  const hardConstraints = Array.isArray(constraints.hardConstraints)
    ? constraints.hardConstraints.map((rule) => `- ${stringifyUnknown(rule)}`).join("\n")
    : "- Follow the design guideline exactly.";

  return [
    `Create a polished storyboard preview for scene "${scene.sceneId}".`,
    "",
    "Core brief:",
    `- Why: ${stringifyUnknown(brief.why)}`,
    `- How: ${stringifyUnknown(brief.how)}`,
    `- What: ${stringifyUnknown(brief.what)}`,
    `- Highlights: ${stringifyUnknown(brief.highlights)}`,
    "",
    `Scene goal: ${scene.sceneGoal}`,
    "",
    "Static states:",
    staticStates,
    "",
    "Motion steps:",
    motionSteps,
    "",
    "Hard style constraints:",
    hardConstraints,
    "",
    "Render a single still image that best represents the approved visual direction for this scene.",
  ].join("\n");
}

async function main(): Promise<void> {
  const caseSlug = readFlag("--case");
  if (!caseSlug) {
    throw new Error("Usage: pnpm preview:storyboard --case <case-slug>");
  }

  const repoRoot = await findRepoRoot(fileURLToPath(import.meta.url));
  const casePaths = getCaseOutputPaths(repoRoot, caseSlug);
  await ensureCaseStageDirs(casePaths);

  const briefPath = path.join(casePaths.stages["01-translation"], "core-brief.json");
  const constraintsPath = path.join(casePaths.stages["02-constraints"], "style-constraints.json");
  const storyboardPath = path.join(casePaths.stages["03-storyboard"], "storyboard.json");
  const matchManifestPath = path.join(casePaths.stages["03-storyboard"], "match-manifest.json");

  await assertStagePrerequisites(repoRoot, caseSlug, [
    { path: briefPath, label: "core brief JSON" },
    { path: constraintsPath, label: "style constraints JSON" },
    { path: storyboardPath, label: "storyboard JSON" },
    { path: matchManifestPath, label: "match manifest JSON" },
  ]);

  const generatedDir = path.join(casePaths.stages["04-preview"], "generated");
  await mkdir(generatedDir, { recursive: true });

  const approvalPath = path.join(casePaths.stages["04-preview"], "approval.md");
  const approvalTemplate = [
    "# Preview Approval",
    "",
    `- Case slug: ${caseSlug}`,
    "- Status: PENDING",
    "- Reviewer:",
    "- Date:",
    "",
    "Replace `PENDING` with `APPROVED` only after the generated previews match the storyboard.",
  ].join("\n");

  try {
    await readFile(approvalPath, "utf8");
  } catch {
    await writeFile(approvalPath, `${approvalTemplate}\n`, "utf8");
  }

  const brief = JSON.parse(await readFile(briefPath, "utf8")) as Record<string, unknown>;
  const constraints = JSON.parse(await readFile(constraintsPath, "utf8")) as Record<string, unknown>;
  const storyboard = JSON.parse(await readFile(storyboardPath, "utf8")) as StoryboardDocument;

  if (!Array.isArray(storyboard.scenes) || storyboard.scenes.length === 0) {
    throw new Error(`Storyboard has no scenes: ${storyboardPath}`);
  }

  const results = [];
  for (const scene of storyboard.scenes) {
    const prompt = buildPrompt(brief, constraints, scene);
    const outputPath = path.join(generatedDir, `${scene.sceneId}.png`);
    const result = await generateNanobananaPreview(
      {
        sceneId: scene.sceneId,
        prompt,
        metadata: {
          caseSlug,
          sceneGoal: scene.sceneGoal,
          timing: scene.timing,
          easing: scene.easing,
        },
      },
      outputPath,
    );

    await writeFile(
      path.join(generatedDir, `${scene.sceneId}.prompt.md`),
      `${prompt}\n`,
      "utf8",
    );
    results.push(result);
  }

  await writeFile(
    path.join(casePaths.stages["04-preview"], "generation-manifest.json"),
    `${JSON.stringify({ caseSlug, results }, null, 2)}\n`,
    "utf8",
  );

  console.log(`Generated preview payloads for ${results.length} scenes in ${generatedDir}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
