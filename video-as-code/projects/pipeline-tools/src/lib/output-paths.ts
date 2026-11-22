import { access, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export const OUTPUT_STAGES = [
  "00-input",
  "01-translation",
  "02-constraints",
  "03-storyboard",
  "04-preview",
  "05-copy",
  "06-implementation",
  "07-review",
  "08-delivery",
] as const;

export const SHORT_ASSET_STAGES = [
  "00-concept",
  "01-translation",
  "02-beatboard",
  "03-animatic",
  "04-build",
  "05-review",
  "06-delivery",
] as const;

export const SCRIPT_FIRST_SHORT_ASSET_STAGES = [
  "00-concept",
  "01-script",
  "02-plan",
  "03-materials",
  "04-build",
  "05-review",
  "06-delivery",
] as const;

export type OutputStage = (typeof OUTPUT_STAGES)[number];
export type ShortAssetStage = (typeof SHORT_ASSET_STAGES)[number];
export type ScriptFirstShortAssetStage = (typeof SCRIPT_FIRST_SHORT_ASSET_STAGES)[number];

export interface CaseOutputPaths {
  caseSlug: string;
  root: string;
  shortAssetsRoot: string;
  stages: Record<OutputStage, string>;
}

export interface ShortAssetOutputPaths {
  caseSlug: string;
  assetSlug: string;
  root: string;
  stages: Record<ShortAssetStage, string>;
}

export interface ScriptFirstShortAssetOutputPaths {
  caseSlug: string;
  assetSlug: string;
  root: string;
  stages: Record<ScriptFirstShortAssetStage, string>;
}

export interface ScriptFirstScreenBuildPaths {
  caseSlug: string;
  assetSlug: string;
  screenId: string;
  root: string;
  buildNotesPath: string;
  approvalPath: string;
}

export async function findRepoRoot(startPath: string): Promise<string> {
  let current = path.dirname(startPath);

  while (true) {
    const workspaceFile = path.join(current, "pnpm-workspace.yaml");
    try {
      await access(workspaceFile);
      return current;
    } catch {
      const parent = path.dirname(current);
      if (parent === current) {
        throw new Error(`Unable to find repository root from ${startPath}`);
      }
      current = parent;
    }
  }
}

export function getCaseOutputPaths(repoRoot: string, caseSlug: string): CaseOutputPaths {
  const root = path.join(repoRoot, "output", caseSlug);
  const stages = Object.fromEntries(
    OUTPUT_STAGES.map((stage) => [stage, path.join(root, stage)]),
  ) as Record<OutputStage, string>;

  return {
    caseSlug,
    root,
    shortAssetsRoot: path.join(root, "short-assets"),
    stages,
  };
}

export function getShortAssetOutputPaths(
  repoRoot: string,
  caseSlug: string,
  assetSlug: string,
): ShortAssetOutputPaths {
  const root = path.join(repoRoot, "output", caseSlug, "short-assets", assetSlug);
  const stages = Object.fromEntries(
    SHORT_ASSET_STAGES.map((stage) => [stage, path.join(root, stage)]),
  ) as Record<ShortAssetStage, string>;

  return {
    caseSlug,
    assetSlug,
    root,
    stages,
  };
}

export function getScriptFirstShortAssetOutputPaths(
  repoRoot: string,
  caseSlug: string,
  assetSlug: string,
): ScriptFirstShortAssetOutputPaths {
  const root = path.join(repoRoot, "output", caseSlug, "short-assets", assetSlug);
  const stages = Object.fromEntries(
    SCRIPT_FIRST_SHORT_ASSET_STAGES.map((stage) => [stage, path.join(root, stage)]),
  ) as Record<ScriptFirstShortAssetStage, string>;

  return {
    caseSlug,
    assetSlug,
    root,
    stages,
  };
}

export async function ensureCaseStageDirs(casePaths: CaseOutputPaths): Promise<void> {
  await mkdir(casePaths.root, { recursive: true });
  await mkdir(casePaths.shortAssetsRoot, { recursive: true });
  await Promise.all(OUTPUT_STAGES.map((stage) => mkdir(casePaths.stages[stage], { recursive: true })));
}

export async function ensureShortAssetStageDirs(assetPaths: ShortAssetOutputPaths): Promise<void> {
  await mkdir(assetPaths.root, { recursive: true });
  await Promise.all(
    SHORT_ASSET_STAGES.map((stage) => mkdir(assetPaths.stages[stage], { recursive: true })),
  );
}

export async function ensureScriptFirstShortAssetStageDirs(
  assetPaths: ScriptFirstShortAssetOutputPaths,
): Promise<void> {
  await mkdir(assetPaths.root, { recursive: true });
  await Promise.all(
    SCRIPT_FIRST_SHORT_ASSET_STAGES.map((stage) =>
      mkdir(assetPaths.stages[stage], { recursive: true }),
    ),
  );
}

export async function ensureScriptFirstScreenBuildDir(
  repoRoot: string,
  caseSlug: string,
  assetSlug: string,
  screenId: string,
): Promise<ScriptFirstScreenBuildPaths> {
  const screenPaths = getScriptFirstScreenBuildPaths(repoRoot, caseSlug, assetSlug, screenId);
  await mkdir(screenPaths.root, { recursive: true });
  return screenPaths;
}

export async function assertFileExists(filePath: string, label: string): Promise<void> {
  try {
    await access(filePath);
  } catch {
    throw new Error(`Missing required ${label}: ${filePath}`);
  }
}

export async function assertStagePrerequisites(
  repoRoot: string,
  caseSlug: string,
  files: Array<{ path: string; label: string }>,
): Promise<CaseOutputPaths> {
  const casePaths = getCaseOutputPaths(repoRoot, caseSlug);
  for (const file of files) {
    await assertFileExists(file.path, file.label);
  }
  return casePaths;
}

export async function assertShortAssetStagePrerequisites(
  repoRoot: string,
  caseSlug: string,
  assetSlug: string,
  files: Array<{ path: string; label: string }>,
): Promise<ShortAssetOutputPaths> {
  const assetPaths = getShortAssetOutputPaths(repoRoot, caseSlug, assetSlug);
  for (const file of files) {
    await assertFileExists(file.path, file.label);
  }
  return assetPaths;
}

export async function assertPreviewApproved(repoRoot: string, caseSlug: string): Promise<string> {
  const approvalPath = path.join(repoRoot, "output", caseSlug, "04-preview", "approval.md");
  await assertFileExists(approvalPath, "preview approval file");
  const approvalContent = await readFile(approvalPath, "utf8");

  if (!/^- Status:\s*APPROVED\s*$/m.test(approvalContent)) {
    throw new Error(
      `Preview approval is not complete for ${caseSlug}. Expected "- Status: APPROVED" in ${approvalPath}`,
    );
  }

  return approvalPath;
}

export async function assertAnimaticApproved(
  repoRoot: string,
  caseSlug: string,
  assetSlug: string,
): Promise<string> {
  const approvalPath = path.join(
    repoRoot,
    "output",
    caseSlug,
    "short-assets",
    assetSlug,
    "03-animatic",
    "approval.md",
  );
  await assertFileExists(approvalPath, "animatic approval file");
  const approvalContent = await readFile(approvalPath, "utf8");

  if (!/^- Status:\s*APPROVED\s*$/m.test(approvalContent)) {
    throw new Error(
      `Animatic approval is not complete for ${assetSlug}. Expected "- Status: APPROVED" in ${approvalPath}`,
    );
  }

  return approvalPath;
}

export async function assertScriptFirstApproval(
  repoRoot: string,
  caseSlug: string,
  assetSlug: string,
  stage: "01-script" | "02-plan" | "03-materials",
): Promise<string> {
  const approvalPath = path.join(
    repoRoot,
    "output",
    caseSlug,
    "short-assets",
    assetSlug,
    stage,
    "approval.md",
  );
  await assertFileExists(approvalPath, `${stage} approval file`);
  const approvalContent = await readFile(approvalPath, "utf8");

  if (!/^- Status:\s*APPROVED\s*$/m.test(approvalContent)) {
    throw new Error(
      `${stage} approval is not complete for ${assetSlug}. Expected "- Status: APPROVED" in ${approvalPath}`,
    );
  }

  return approvalPath;
}

export function getScriptFirstScreenBuildPaths(
  repoRoot: string,
  caseSlug: string,
  assetSlug: string,
  screenId: string,
): ScriptFirstScreenBuildPaths {
  const root = path.join(
    repoRoot,
    "output",
    caseSlug,
    "short-assets",
    assetSlug,
    "04-build",
    "screens",
    screenId,
  );

  return {
    caseSlug,
    assetSlug,
    screenId,
    root,
    buildNotesPath: path.join(root, "build-notes.md"),
    approvalPath: path.join(root, "approval.md"),
  };
}

export async function assertScriptFirstScreenApproval(
  repoRoot: string,
  caseSlug: string,
  assetSlug: string,
  screenId: string,
): Promise<string> {
  const { approvalPath } = getScriptFirstScreenBuildPaths(repoRoot, caseSlug, assetSlug, screenId);
  await assertFileExists(approvalPath, `${screenId} build approval file`);
  const approvalContent = await readFile(approvalPath, "utf8");

  if (!/^- Status:\s*APPROVED\s*$/m.test(approvalContent)) {
    throw new Error(
      `${screenId} build approval is not complete for ${assetSlug}. Expected "- Status: APPROVED" in ${approvalPath}`,
    );
  }

  return approvalPath;
}
