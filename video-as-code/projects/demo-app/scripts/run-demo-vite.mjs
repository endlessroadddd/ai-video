import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const instrumentServerPath = new URL(
  "../instrument.server.mjs",
  import.meta.url,
).href;
const viteBinPath = resolve(projectRoot, "node_modules", "vite", "bin", "vite.js");

const [, , command = "dev", ...extraArgs] = process.argv;

const environment = {
  ...process.env,
  VITE_DEMO_MODE: "true",
  VITE_SUPABASE_PUBLISHABLE_KEY:
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "demo-anon-key",
  VITE_SUPABASE_URL:
    process.env.VITE_SUPABASE_URL || "https://demo.supabase.co",
};

if (command === "dev" && !environment.VITE_CHAT_RECORDING_FAST_PREVIEW) {
  environment.VITE_CHAT_RECORDING_FAST_PREVIEW = "true";
}

const child = spawn(
  process.execPath,
  [
    "--max-http-header-size=65536",
    "--import",
    instrumentServerPath,
    viteBinPath,
    command,
    ...extraArgs,
  ],
  {
    cwd: projectRoot,
    env: environment,
    stdio: "inherit",
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error("[run-demo-vite] failed to start vite:", error);
  process.exit(1);
});
