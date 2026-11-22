import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertAnimaticApproved,
  assertFileExists,
  findRepoRoot,
  getCaseOutputPaths,
  getShortAssetOutputPaths,
} from "../lib/output-paths.js";
import {
  validateBeatboardDocument,
  validateShortAssetBrief,
  validateShortAssetMetadata,
} from "../lib/short-asset-contracts.js";

const SUPPORTED_STAGES = [
  "translation",
  "beatboard",
  "animatic",
  "build",
  "review",
  "delivery",
] as const;

type SupportedStage = (typeof SUPPORTED_STAGES)[number];

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
      `Unsupported short-asset stage: ${stage}. Expected one of ${SUPPORTED_STAGES.join(", ")}`,
    );
  }

  return stage as SupportedStage;
}

async function validateJsonFile<T>(filePath: string, label: string, validator: (value: unknown, label: string) => T): Promise<T> {
  const parsed = JSON.parse(await readFile(filePath, "utf8")) as unknown;
  return validator(parsed, label);
}

async function main(): Promise<void> {
  const caseSlug = readFlag("--case");
  const assetSlug = readFlag("--asset");
  const stage = readFlag("--stage");

  if (!caseSlug || !assetSlug || !stage) {
    throw new Error(
      "Usage: pnpm assert:asset-stage --case <case-slug> --asset <asset-slug> --stage <translation|beatboard|animatic|build|review|delivery>",
    );
  }

  const repoRoot = await findRepoRoot(fileURLToPath(import.meta.url));
  const casePaths = getCaseOutputPaths(repoRoot, caseSlug);
  const assetPaths = getShortAssetOutputPaths(repoRoot, caseSlug, assetSlug);
  const supportedStage = assertSupportedStage(stage);

  const productContextPath = path.join(casePaths.stages["00-input"], "product-context.md");
  const designGuidelinePath = path.join(casePaths.stages["00-input"], "design-guideline.md");
  const styleConstraintsJsonPath = path.join(casePaths.stages["02-constraints"], "style-constraints.json");
  const microConceptPath = path.join(assetPaths.stages["00-concept"], "micro-concept.md");
  const metadataPath = path.join(assetPaths.stages["00-concept"], "asset-metadata.json");
  const assetBriefMdPath = path.join(assetPaths.stages["01-translation"], "asset-brief.md");
  const assetBriefJsonPath = path.join(assetPaths.stages["01-translation"], "asset-brief.json");
  const beatboardMdPath = path.join(assetPaths.stages["02-beatboard"], "beatboard.md");
  const beatboardJsonPath = path.join(assetPaths.stages["02-beatboard"], "beatboard.json");
  const buildLogPath = path.join(assetPaths.stages["04-build"], "build-log.md");
  const assetQaPath = path.join(assetPaths.stages["05-review"], "asset-qa.md");

  if (supportedStage === "translation") {
    await assertFileExists(productContextPath, "product context input");
    await assertFileExists(designGuidelinePath, "design guideline input");
    await assertFileExists(microConceptPath, "short-asset concept");
    await assertFileExists(metadataPath, "short-asset metadata");
    await validateJsonFile(metadataPath, "asset-metadata.json", validateShortAssetMetadata);
    console.log(`Short-asset translation gate passed for ${assetSlug} in ${caseSlug}`);
    return;
  }

  await assertFileExists(productContextPath, "product context input");
  await assertFileExists(designGuidelinePath, "design guideline input");
  await assertFileExists(microConceptPath, "short-asset concept");
  await assertFileExists(metadataPath, "short-asset metadata");
  await validateJsonFile(metadataPath, "asset-metadata.json", validateShortAssetMetadata);

  if (supportedStage === "beatboard") {
    await assertFileExists(styleConstraintsJsonPath, "style constraints JSON");
    await assertFileExists(assetBriefMdPath, "asset brief markdown");
    await assertFileExists(assetBriefJsonPath, "asset brief JSON");
    await validateJsonFile(assetBriefJsonPath, "asset-brief.json", validateShortAssetBrief);
    console.log(`Short-asset beatboard gate passed for ${assetSlug} in ${caseSlug}`);
    return;
  }

  await assertFileExists(styleConstraintsJsonPath, "style constraints JSON");
  await assertFileExists(assetBriefMdPath, "asset brief markdown");
  await assertFileExists(assetBriefJsonPath, "asset brief JSON");
  await validateJsonFile(assetBriefJsonPath, "asset-brief.json", validateShortAssetBrief);

  if (supportedStage === "animatic") {
    await assertFileExists(beatboardMdPath, "beatboard markdown");
    await assertFileExists(beatboardJsonPath, "beatboard JSON");
    await validateJsonFile(beatboardJsonPath, "beatboard.json", validateBeatboardDocument);
    console.log(`Short-asset animatic gate passed for ${assetSlug} in ${caseSlug}`);
    return;
  }

  await assertFileExists(beatboardMdPath, "beatboard markdown");
  await assertFileExists(beatboardJsonPath, "beatboard JSON");
  await validateJsonFile(beatboardJsonPath, "beatboard.json", validateBeatboardDocument);

  if (supportedStage === "build") {
    await assertAnimaticApproved(repoRoot, caseSlug, assetSlug);
    console.log(`Short-asset build gate passed for ${assetSlug} in ${caseSlug}`);
    return;
  }

  await assertAnimaticApproved(repoRoot, caseSlug, assetSlug);

  if (supportedStage === "review") {
    await assertFileExists(buildLogPath, "short-asset build log");
    console.log(`Short-asset review gate passed for ${assetSlug} in ${caseSlug}`);
    return;
  }

  await assertFileExists(buildLogPath, "short-asset build log");
  await assertFileExists(assetQaPath, "short-asset asset QA");
  console.log(`Short-asset delivery gate passed for ${assetSlug} in ${caseSlug}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
