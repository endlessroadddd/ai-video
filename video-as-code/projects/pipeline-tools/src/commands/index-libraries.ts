import { fileURLToPath } from "node:url";

import { buildAssetRegistry } from "../lib/asset-registry.js";
import { loadMaterialLibraryCatalog, writeMaterialLibraryIndex } from "../lib/material-library-catalog.js";
import { buildTemplateRegistry } from "../lib/template-registry.js";
import { findRepoRoot } from "../lib/output-paths.js";

async function main(): Promise<void> {
  const repoRoot = await findRepoRoot(fileURLToPath(import.meta.url));
  const catalog = await loadMaterialLibraryCatalog(repoRoot);
  const [assetEntries, templateEntries] = await Promise.all([
    buildAssetRegistry(repoRoot, catalog.assets),
    buildTemplateRegistry(repoRoot, catalog.templates),
    writeMaterialLibraryIndex(repoRoot, catalog),
  ]);

  console.log(`Indexed ${assetEntries.length} assets`);
  console.log(`Indexed ${templateEntries.length} templates`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
