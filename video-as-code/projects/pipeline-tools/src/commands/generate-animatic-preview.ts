import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  ensureShortAssetStageDirs,
  findRepoRoot,
  getCaseOutputPaths,
  getShortAssetOutputPaths,
} from "../lib/output-paths.js";
import {
  BeatboardBeat,
  validateBeatboardDocument,
  validateShortAssetBrief,
  validateShortAssetMetadata,
} from "../lib/short-asset-contracts.js";

function readFlag(flagName: string): string | null {
  const index = process.argv.indexOf(flagName);
  if (index === -1) {
    return null;
  }

  return process.argv[index + 1] ?? null;
}

function formatList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function buildBeatPrompt(
  singleTakeaway: string,
  constraints: Record<string, unknown>,
  beat: BeatboardBeat,
): string {
  const hardConstraints = Array.isArray(constraints.hardConstraints)
    ? constraints.hardConstraints
        .filter((item): item is string => typeof item === "string")
        .map((item) => `- ${item}`)
        .join("\n")
    : "- Follow the approved design guideline exactly.";

  return [
    `Create a short-form keyframe preview for beat "${beat.beatId}".`,
    "",
    `Single takeaway: ${singleTakeaway}`,
    `Beat purpose: ${beat.purpose}`,
    `On-screen copy: ${beat.copyLine}`,
    `Duration hint: ${beat.durationHint}`,
    "",
    "Visual state:",
    formatList(beat.visualState),
    "",
    "Motion cue:",
    formatList(beat.motionCue),
    "",
    "Proof binding:",
    formatList(beat.proofBinding),
    "",
    "Hard style constraints:",
    hardConstraints,
    "",
    "Render one polished still that best represents this beat inside a 6-10 second Lucius short asset.",
  ].join("\n");
}

function buildSequencePrompt(
  assetSlug: string,
  beatboardGoal: string,
  durationTarget: number,
  proofShot: string,
  beats: BeatboardBeat[],
): string {
  const beatSummary = beats
    .map(
      (beat, index) =>
        `${index + 1}. ${beat.beatId}: ${beat.purpose} | copy: "${beat.copyLine}" | duration: ${beat.durationHint}`,
    )
    .join("\n");

  return [
    `Create a rough animatic plan for the short asset "${assetSlug}".`,
    "",
    `Sequence goal: ${beatboardGoal}`,
    `Duration target: ${durationTarget}s`,
    `Proof shot: ${proofShot}`,
    "",
    "Beat sequence:",
    beatSummary,
    "",
    "Return a single preview image that communicates the overall timing and sequence logic of the short asset.",
  ].join("\n");
}

function summarizeHardConstraints(constraints: Record<string, unknown>): string[] {
  return Array.isArray(constraints.hardConstraints)
    ? constraints.hardConstraints.filter((item): item is string => typeof item === "string")
    : ["Follow the approved design guideline exactly."];
}

async function main(): Promise<void> {
  const caseSlug = readFlag("--case");
  const assetSlug = readFlag("--asset");

  if (!caseSlug || !assetSlug) {
    throw new Error("Usage: pnpm preview:animatic --case <case-slug> --asset <asset-slug>");
  }

  const repoRoot = await findRepoRoot(fileURLToPath(import.meta.url));
  const casePaths = getCaseOutputPaths(repoRoot, caseSlug);
  const assetPaths = getShortAssetOutputPaths(repoRoot, caseSlug, assetSlug);
  await ensureShortAssetStageDirs(assetPaths);

  const metadataPath = path.join(assetPaths.stages["00-concept"], "asset-metadata.json");
  const assetBriefPath = path.join(assetPaths.stages["01-translation"], "asset-brief.json");
  const constraintsPath = path.join(casePaths.stages["02-constraints"], "style-constraints.json");
  const beatboardPath = path.join(assetPaths.stages["02-beatboard"], "beatboard.json");

  const metadata = validateShortAssetMetadata(
    JSON.parse(await readFile(metadataPath, "utf8")) as unknown,
    "asset-metadata.json",
  );
  const assetBrief = validateShortAssetBrief(
    JSON.parse(await readFile(assetBriefPath, "utf8")) as unknown,
    "asset-brief.json",
  );
  const constraints = JSON.parse(await readFile(constraintsPath, "utf8")) as Record<string, unknown>;
  const hardConstraints = summarizeHardConstraints(constraints);
  const beatboard = validateBeatboardDocument(
    JSON.parse(await readFile(beatboardPath, "utf8")) as unknown,
    "beatboard.json",
  );

  if (beatboard.assetSlug !== assetSlug) {
    throw new Error(`beatboard.json assetSlug "${beatboard.assetSlug}" does not match CLI asset "${assetSlug}"`);
  }

  if (beatboard.durationTarget !== metadata.durationTarget) {
    throw new Error("beatboard.json durationTarget must match asset-metadata.json durationTarget");
  }

  if (beatboard.aspectRatio !== metadata.aspectRatio) {
    throw new Error("beatboard.json aspectRatio must match asset-metadata.json aspectRatio");
  }

  if (beatboard.soundMode !== metadata.soundMode) {
    throw new Error("beatboard.json soundMode must match asset-metadata.json soundMode");
  }

  if (beatboard.brandRole !== metadata.brandRole) {
    throw new Error("beatboard.json brandRole must match asset-metadata.json brandRole");
  }

  const animaticStage = assetPaths.stages["03-animatic"];
  const keyframesDir = path.join(animaticStage, "keyframes");
  const animaticDir = path.join(animaticStage, "animatic");
  await mkdir(keyframesDir, { recursive: true });
  await mkdir(animaticDir, { recursive: true });

  const approvalPath = path.join(animaticStage, "approval.md");
  const approvalTemplate = [
    "# Animatic Approval",
    "",
    `- Case slug: ${caseSlug}`,
    `- Asset slug: ${assetSlug}`,
    "- Status: PENDING",
    "- Reviewer:",
    "- Date:",
    "",
    "Replace `PENDING` with `APPROVED` only after the beat keyframes and rough animatic match the intended sequence.",
  ].join("\n");

  try {
    await readFile(approvalPath, "utf8");
  } catch {
    await writeFile(approvalPath, `${approvalTemplate}\n`, "utf8");
  }

  const keyframeResults = [];
  for (const beat of beatboard.beats) {
    const prompt = buildBeatPrompt(assetBrief.singleTakeaway, constraints, beat);
    const outputPath = path.join(keyframesDir, `${beat.beatId}.preview.json`);
    const reviewSpec = {
      caseSlug,
      assetSlug,
      beatId: beat.beatId,
      type: "beat-keyframe-review",
      singleTakeaway: assetBrief.singleTakeaway,
      purpose: beat.purpose,
      copyLine: beat.copyLine,
      durationHint: beat.durationHint,
      visualState: beat.visualState,
      motionCue: beat.motionCue,
      proofBinding: beat.proofBinding,
      matchType: beat.matchType,
      assetBindingIds: beat.assetBindingIds,
      templateBindingIds: beat.templateBindingIds,
      fallbackImplementation: beat.fallbackImplementation,
      hardConstraints,
      reviewQuestions: [
        "Is the beat understandable at first glance?",
        "Does the copy fit the duration hint?",
        "Is the proof binding visible enough?",
      ],
    };
    await writeFile(outputPath, `${JSON.stringify(reviewSpec, null, 2)}\n`, "utf8");
    await writeFile(path.join(keyframesDir, `${beat.beatId}.prompt.md`), `${prompt}\n`, "utf8");
    keyframeResults.push({
      beatId: beat.beatId,
      status: "prepared",
      outputPath,
    });
  }

  const sequencePrompt = buildSequencePrompt(
    assetSlug,
    beatboard.sequenceGoal,
    beatboard.durationTarget,
    metadata.proofShot,
    beatboard.beats,
  );

  const sequenceOutputPath = path.join(animaticDir, `${assetSlug}-rough-sequence.preview.json`);
  const sequenceResult = {
    assetSlug,
    type: "rough-sequence-review",
    durationTarget: beatboard.durationTarget,
    aspectRatio: beatboard.aspectRatio,
    soundMode: beatboard.soundMode,
    brandRole: beatboard.brandRole,
    sequenceGoal: beatboard.sequenceGoal,
    proofShot: metadata.proofShot,
    beats: beatboard.beats.map((beat, index) => ({
      order: index + 1,
      beatId: beat.beatId,
      purpose: beat.purpose,
      copyLine: beat.copyLine,
      durationHint: beat.durationHint,
      proofBinding: beat.proofBinding,
    })),
    reviewQuestions: [
      "Does the hook land in the first second?",
      "Does the sequence only serve one takeaway?",
      "Is the proof shot clear before the asset ends?",
    ],
  };
  await writeFile(sequenceOutputPath, `${JSON.stringify(sequenceResult, null, 2)}\n`, "utf8");

  await writeFile(path.join(animaticDir, "rough-sequence.prompt.md"), `${sequencePrompt}\n`, "utf8");
  await writeFile(
    path.join(animaticStage, "generation-manifest.json"),
    `${JSON.stringify(
      {
        caseSlug,
        assetSlug,
        mode: "review-data-only",
        keyframeResults,
        sequenceResult: {
          status: "prepared",
          outputPath: sequenceOutputPath,
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(
    `Generated short-asset review data for ${beatboard.beats.length} beats in ${animaticStage}`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
