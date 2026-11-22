// @ts-nocheck

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const libraryRoot = fileURLToPath(new URL(".", import.meta.url));
const fromLibraryNodeModules = (packagePath: string) =>
  resolve(libraryRoot, "node_modules", packagePath);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^react$/,
        replacement: fromLibraryNodeModules("react/index.js"),
      },
      {
        find: /^react\/jsx-runtime$/,
        replacement: fromLibraryNodeModules("react/jsx-runtime.js"),
      },
      {
        find: /^react\/jsx-dev-runtime$/,
        replacement: fromLibraryNodeModules("react/jsx-dev-runtime.js"),
      },
      {
        find: /^react-dom$/,
        replacement: fromLibraryNodeModules("react-dom/index.js"),
      },
      {
        find: /^react-dom\/client$/,
        replacement: fromLibraryNodeModules("react-dom/client.js"),
      },
    ],
    dedupe: ["react", "react-dom"],
  },
});
