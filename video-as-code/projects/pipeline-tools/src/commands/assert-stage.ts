import { fileURLToPath } from "node:url";

import { assertPreviewApproved, findRepoRoot } from "../lib/output-paths.js";

function readFlag(flagName: string): string | null {
  const index = process.argv.indexOf(flagName);
  if (index === -1) {
    return null;
  }

  return process.argv[index + 1] ?? null;
}

async function main(): Promise<void> {
  const caseSlug = readFlag("--case");
  const stage = readFlag("--stage");

  if (!caseSlug || !stage) {
    throw new Error("Usage: pnpm assert:stage --case <case-slug> --stage <copy|implementation>");
  }

  if (stage !== "copy" && stage !== "implementation") {
    throw new Error(`Unsupported stage: ${stage}`);
  }

  const repoRoot = await findRepoRoot(fileURLToPath(import.meta.url));
  await assertPreviewApproved(repoRoot, caseSlug);
  console.log(`Stage gate passed for ${stage} on ${caseSlug}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
