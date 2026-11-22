# Architecture

## Multi-Project Setup

This repo uses **pnpm workspaces** with a `projects/` directory (not `packages/`) because these are runnable applications, not publishable npm libraries.

```
lucius-video-as-code/
├── projects/
│   ├── demo-app/          # Full Lucius app in demo mode
│   ├── remotion-promo/    # Remotion video compositions (future)
│   └── gsap-animations/   # GSAP animations (future)
└── docs/
```

## How It Works

- `pnpm-workspace.yaml` declares `projects/*` as workspace members
- Each project has its own `package.json` with name `@lucius-vac/<project-name>`
- Root `package.json` has convenience scripts that delegate via `pnpm --filter`
- Single `pnpm install` at root installs all projects' dependencies
- Single root `pnpm-lock.yaml` manages all versions

## Demo App

The demo app is a full copy of `lucius-client-app` configured to run in **demo mode**:
- Mock Supabase client returns fake data (no real backend needed)
- Mock API handlers intercept server functions
- Auto-login bypasses authentication
- Environment variables set via `dev:demo` script

Key demo files: `src/lib/demo/*`

## Adding a New Project

1. Create `projects/<name>/`
2. Add `package.json` with `"name": "@lucius-vac/<name>"`
3. Add a root script: `"dev:<name>": "pnpm --filter @lucius-vac/<name> dev"`
4. Run `pnpm install`
