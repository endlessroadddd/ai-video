import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const libraryExternal = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
  "@skyra/discord-components-core",
  "@skyra/discord-components-react",
];

export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === "lib";

  return {
    plugins: [react()],
    build: isLibraryBuild
      ? {
          lib: {
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
            fileName: "index",
            cssFileName: "styles",
          },
          outDir: "dist-lib",
          cssCodeSplit: false,
          rollupOptions: {
            external: libraryExternal,
            output: {
              inlineDynamicImports: true,
            },
          },
        }
      : {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (id.includes("@skyra/discord-components")) {
                  return "discord-components";
                }

                if (id.includes("react-dom")) {
                  return "react-dom";
                }

                if (id.includes("react")) {
                  return "react";
                }
              },
            },
          },
          chunkSizeWarningLimit: 900,
        },
  };
});
