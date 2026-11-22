import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertFileExists,
  assertScriptFirstApproval,
  assertScriptFirstScreenApproval,
  findRepoRoot,
  getCaseOutputPaths,
  getScriptFirstScreenBuildPaths,
  getScriptFirstShortAssetOutputPaths,
} from "../lib/output-paths.js";
import { validateShortAssetMetadata } from "../lib/short-asset-contracts.js";
import {
  validateCompletePlan,
  validateMaterialNeeds,
  validateScriptOutline,
} from "../lib/script-first-short-asset-contracts.js";

const SUPPORTED_STAGES = [
  "script",
  "plan",
  "materials",
  "build",
  "review",
  "delivery",
] as const;

type SupportedStage = (typeof SUPPORTED_STAGES)[number];

function findScreenIndex(screenIds: string[], screenId: string, label: string): number {
  const index = screenIds.indexOf(screenId);
  if (index === -1) {
    throw new Error(`${label} must be one of the screen ids defined in complete-plan.json: ${screenIds.join(", ")}`);
  }
  return index;
}

function readFlag(flagName: string): string | null {
  const index = process.argv.indexOf(flagName);
  if (index === -1) {
    return null;
  }

  return process.argv[index + 1] ?? null;
}

function assertSupportedStage(stage: string): SupportedStage {
  if (!SUPPORTED_STAGES.includes(stage as SupportedStage)) {
    throw new Error(
      `Unsupported script-first short-asset stage: ${stage}. Expected one of ${SUPPORTED_STAGES.join(", ")}`,
    );
  }

  return stage as SupportedStage;
}

async function validateJsonFile<T>(
  filePath: string,
  label: string,
  validator: (value: unknown, label: string) => T,
): Promise<T> {
  const parsed = JSON.parse(await readFile(filePath, "utf8")) as unknown;
  return validator(parsed, label);
}

async function main(): Promise<void> {
  const caseSlug = readFlag("--case");
  const assetSlug = readFlag("--asset");
  const stage = readFlag("--stage");
  const screenId = readFlag("--screen");

  if (!caseSlug || !assetSlug || !stage) {
    throw new Error(
      "Usage: pnpm assert:script-asset-stage --case <case-slug> --asset <asset-slug> --stage <script|plan|materials|build|review|delivery> [--screen <screen-id>]",
    );
  }

  const repoRoot = await findRepoRoot(fileURLToPath(import.meta.url));
  const casePaths = getCaseOutputPaths(repoRoot, caseSlug);
  const assetPaths = getScriptFirstShortAssetOutputPaths(repoRoot, caseSlug, assetSlug);
  const supportedStage = assertSupportedStage(stage);

  const productContextPath = path.join(casePaths.stages["00-input"], "product-context.md");
  const designGuidelinePath = path.join(casePaths.stages["00-input"], "design-guideline.md");
  const styleConstraintsPath = path.join(casePaths.stages["02-constraints"], "style-constraints.json");

  const microConceptPath = path.join(assetPaths.stages["00-concept"], "micro-concept.md");
  const metadataPath = path.join(assetPaths.stages["00-concept"], "asset-metadata.json");

  const scriptOutlineMdPath = path.join(assetPaths.stages["01-script"], "script-outline.md");
  const scriptOutlineJsonPath = path.join(assetPaths.stages["01-script"], "script-outline.json");

  const completePlanMdPath = path.join(assetPaths.stages["02-plan"], "complete-plan.md");
  const completePlanJsonPath = path.join(assetPaths.stages["02-plan"], "complete-plan.json");

  const materialNeedsMdPath = path.join(assetPaths.stages["03-materials"], "material-needs.md");
  const materialNeedsJsonPath = path.join(assetPaths.stages["03-materials"], "material-needs.json");

  const buildLogPath = path.join(assetPaths.stages["04-build"], "build-log.md");
  const assetQaPath = path.join(assetPaths.stages["05-review"], "asset-qa.md");

  await assertFileExists(productContextPath, "product context input");
  await assertFileExists(designGuidelinePath, "design guideline input");
  await assertFileExists(microConceptPath, "short-asset concept");
  await assertFileExists(metadataPath, "short-asset metadata");
  await validateJsonFile(metadataPath, "asset-metadata.json", validateShortAssetMetadata);

  if (supportedStage === "script") {
    console.log(`Script-first short-asset script gate passed for ${assetSlug} in ${caseSlug}`);
    return;
  }

  await assertFileExists(scriptOutlineMdPath, "script outline markdown");
  await assertFileExists(scriptOutlineJsonPath, "script outline JSON");
  await validateJsonFile(scriptOutlineJsonPath, "script-outline.json", validateScriptOutline);
  await assertScriptFirstApproval(repoRoot, caseSlug, assetSlug, "01-script");

  if (supportedStage === "plan") {
    console.log(`Script-first short-asset plan gate passed for ${assetSlug} in ${caseSlug}`);
    return;
  }

  await assertFileExists(styleConstraintsPath, "style constraints JSON");
  await assertFileExists(completePlanMdPath, "complete plan markdown");
  await assertFileExists(completePlanJsonPath, "complete plan JSON");
  const completePlan = await validateJsonFile(
    completePlanJsonPath,
    "complete-plan.json",
    validateCompletePlan,
  );
  await assertScriptFirstApproval(repoRoot, caseSlug, assetSlug, "02-plan");

  if (supportedStage === "materials") {
    console.log(`Script-first short-asset materials gate passed for ${assetSlug} in ${caseSlug}`);
    return;
  }

  await assertFileExists(materialNeedsMdPath, "material needs markdown");
  await assertFileExists(materialNeedsJsonPath, "material needs JSON");
  await validateJsonFile(materialNeedsJsonPath, "material-needs.json", validateMaterialNeeds);
  await assertScriptFirstApproval(repoRoot, caseSlug, assetSlug, "03-materials");

  if (supportedStage === "build") {
    if (!screenId) {
      console.log(
        `Script-first short-asset build gate passed for ${assetSlug} in ${caseSlug}. Use --screen <screen-id> to enforce per-screen build sequencing.`,
      );
      return;
    }

    const screenIds = completePlan.screens.map((screen) => screen.screenId);
    const targetScreenIndex = findScreenIndex(screenIds, screenId, "screen");

    for (let index = 0; index < targetScreenIndex; index += 1) {
      const previousScreenId = screenIds[index];
      await assertScriptFirstScreenApproval(repoRoot, caseSlug, assetSlug, previousScreenId);
    }

    console.log(
      `Script-first short-asset build gate passed for ${assetSlug} in ${caseSlug} at ${screenId}`,
    );
    return;
  }

  await assertFileExists(buildLogPath, "script-first short-asset build log");
  for (const screen of completePlan.screens) {
    const screenPaths = getScriptFirstScreenBuildPaths(repoRoot, caseSlug, assetSlug, screen.screenId);
    await assertFileExists(screenPaths.buildNotesPath, `${screen.screenId} build notes`);
    await assertScriptFirstScreenApproval(repoRoot, caseSlug, assetSlug, screen.screenId);
  }

  if (supportedStage === "review") {
    console.log(`Script-first short-asset review gate passed for ${assetSlug} in ${caseSlug}`);
    return;
  }

  await assertFileExists(assetQaPath, "script-first short-asset asset QA");
  console.log(`Script-first short-asset delivery gate passed for ${assetSlug} in ${caseSlug}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
