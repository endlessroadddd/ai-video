# lucius-client-app

`projects/demo-app` is the active Lucius demo application used for internal walkthroughs, promo capture routes, and UI playback experiments built on top of a real app shell.

This is the project to use when you want:

- the real Lucius dashboard shell
- the real chat UI
- promo-specific playback inside real screens
- demo-safe local startup without depending on full production credentials

## Scope

This project is not just a mock frontend. It mixes three kinds of work:

- app-shell work
  Real dashboard layout, sidebar, stage, chat shell, routing, and auth-aware structure.

- demo-mode work
  Local startup that injects safe defaults and reduces friction when iterating on promo routes.

- recording-route work
  Special paths such as `/chat/recording` that choreograph a scene for screen capture without changing standard chat behavior.

## Most Important Route

The current focal route is:

- Route: `/chat/recording`
- Local URL: [http://localhost:3000/chat/recording](http://localhost:3000/chat/recording)

This route reuses the real Lucius chat interface and adds promo playback logic on top of it.

## What `/chat/recording` Does

`/chat/recording` is designed to feel like a real PM using Lucius to discover what should be prioritized next.

The current flow is:

1. Load the real Lucius chat shell.
2. Focus the chat area for the opening interaction.
3. Type a PM-style prompt into the real composer.
4. Submit the user message into the real message list.
5. Play a centered analysis interstitial inside the chat shell.
6. Return to the real Lucius thinking state.
7. Stream the Lucius answer in the real message list.

The interstitial is not a fake separate page. It is an overlay inside the real chat shell.

## Current Recording Interstitial

The middle analysis scene currently follows this structure:

- `analysisIntro`
  Center Lucius node appears.

- `analysisOrbit`
  Discord, Feishu, Slack, and Telegram logos orbit around Lucius.

- `analysisDispatch`
  Messages pop out from the logo that corresponds to their platform.

- `analysisSettle`
  Messages fly to their final positions around the center.

- `analysisEvidence`
  The final evidence layout holds, with lines connecting each message to Lucius.

- `analysisResolve`
  Messages and lines retract and fade.

- `analysisHandoff`
  The real Lucius thinking UI appears before the overlay fully leaves.

This route is intentionally designed so there is no empty gap between the analysis layer and the native chat thinking state.

## Project Structure

Useful files for the current promo flow:

- Chat recording route:
  [`src/routes/chat.recording.tsx`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/src/routes/chat.recording.tsx)

- Main chat page logic:
  [`src/routes/dashboard.client-chat.tsx`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/src/routes/dashboard.client-chat.tsx)

- Recording scenario data:
  [`src/lib/client-chat-recording.ts`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/src/lib/client-chat-recording.ts)

- Chat route shell and camera state handoff:
  [`src/components/chat/client-chat-route-shell.tsx`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/src/components/chat/client-chat-route-shell.tsx)

- Message rendering:
  [`src/components/chat/client-chat-message-list.tsx`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/src/components/chat/client-chat-message-list.tsx)

- Global promo styling and analysis overlay styles:
  [`src/styles.css`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/src/styles.css)

- Demo-mode Vite launcher:
  [`scripts/run-demo-vite.mjs`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/scripts/run-demo-vite.mjs)

- Vite / Paraglide stability config:
  [`vite.config.ts`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/vite.config.ts)

## Prerequisites

Recommended:

- Node.js 20+
- pnpm 10+
- a local `.env.local` when you want the full authenticated app experience

Install dependencies from the workspace root:

```bash
pnpm install
```

## Scripts

Inside `projects/demo-app`, the main scripts are:

```bash
pnpm dev
pnpm build
pnpm preview
pnpm test
pnpm start
pnpm dev:demo
pnpm build:demo
pnpm preview:demo
```

### What Each Script Is For

`pnpm dev`

- standard local development
- uses the normal Vite development server
- best when you are working on the broader app

`pnpm dev:demo`

- demo-safe development mode
- sets demo defaults such as `VITE_DEMO_MODE`
- enables faster `/chat/recording` timing so it is easier to iterate on animation
- best for editing the promo flow

`pnpm build:demo`

- production build for the demo-mode app
- best for validating that recording routes compile cleanly

`pnpm preview:demo`

- serves the built demo bundle
- best for checking final playback quality, asset integrity, and timing
- recommended for actual review of `/chat/recording`

## Recommended Local Workflow

When you are coding:

```bash
pnpm dev:demo
```

When you are reviewing animation quality or preparing for recording:

```bash
pnpm build:demo
pnpm preview:demo
```

Why this split matters:

- `dev:demo` is faster to iterate with
- `preview:demo` is more trustworthy for actual playback quality
- some issues that show up in `vite dev` are HMR-related rather than route-related

## Environment Variables

At minimum, these are useful when you want the full app experience:

```bash
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-publishable-key>
SUPABASE_SECRET_KEY=<your-supabase-secret-key>
```

Additional optional variables already used elsewhere in the app:

```bash
SUPABASE_PROJECT_REF=<your-project-ref>
TELEGRAM_BOT_TOKEN=<telegram-bot-token>
TELEGRAM_BOT_USERNAME=lucius_client_bot
TELEGRAM_INTEGRATION_SECRET=<random-long-secret>
VITE_SENTRY_DSN=
SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
```

Notes:

- demo mode injects safe fallback values for `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
- missing Sentry DSNs are expected locally; the app will log that Sentry is disabled

## Demo Mode Notes

The helper launcher [`scripts/run-demo-vite.mjs`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/scripts/run-demo-vite.mjs) exists to make demo playback easier.

It currently does three important things:

1. Sets `VITE_DEMO_MODE=true`
2. Injects demo-safe Supabase placeholders when real ones are missing
3. Enables `VITE_CHAT_RECORDING_FAST_PREVIEW=true` during `dev`, which shortens playback timing for iteration

That means:

- `dev:demo` is intentionally faster than final preview
- `build:demo` and `preview:demo` preserve production-style timing

## Auth Expectations

`/chat/recording` is built on the chat stack, so it conceptually inherits chat behavior.

Depending on how you run the app:

- in normal app mode, you may be redirected to login before reaching `/chat/recording`
- in demo mode, the route is intended to be easier to review locally

If you are checking promo motion rather than auth flows, prefer the demo scripts.

## Architecture Notes

### Why the route lives inside the real chat page

We deliberately keep recording behavior inside the real chat experience so that:

- the composer is real
- the message list is real
- the pending reply state is real
- the streamed assistant response is real
- promo scenes do not drift away from actual Lucius UI

### Why the interstitial is an overlay

The analysis scene between submit and thinking is implemented as an overlay instead of a separate route because it needs to:

- inherit the real shell proportions
- feel like the same camera, not a page jump
- hand off directly into the real Lucius thinking state

### Why preview is safer than dev for review

Vite HMR can make this app feel unstable during animation review because:

- Paraglide output can be part of the dev graph
- hot updates can create reload noise
- stale port usage can make it look like the wrong assets are being served

Preview mode is therefore the recommended source of truth when deciding whether a scene is ready.

## Stability / Performance Fixes Already In Place

Recent project-level improvements include:

- Paraglide dev output is no longer aggressively cleaned during development
- the root route avoids depending on message helpers for simple metadata
- markdown rendering in chat is lazy-loaded to reduce initial route weight
- demo-mode preview commands were added so recording review does not rely on HMR

## Troubleshooting

### The page loads but JS or CSS assets 404

Likely cause:

- a stale `vite dev` or `vite preview` process is still serving old HTML

Symptoms:

- browser console shows missing files such as `/assets/main-*.js`
- the asset names in HTML do not match files inside `dist/client/assets`

Recommended fix:

1. stop old preview/dev processes
2. run `pnpm build:demo`
3. run `pnpm preview:demo`
4. hard refresh the browser

### `Failed to load url /src/paraglide/server.js`

This is usually a development-server problem, not a route rendering problem.

Typical causes:

- stale dev server instance
- HMR or generation timing issue
- browser hitting an older process still serving source mode

Best fix:

- stop old servers
- use `pnpm preview:demo` after a fresh `pnpm build:demo`

### The recording route feels blurry

Common causes we already tuned against:

- scaling the whole chat shell
- heavy blur on the analysis backdrop
- overusing filter-based transitions

Current approach prefers:

- positional composition
- opacity transitions
- SVG lines
- sharper UI surfaces

### The route feels slow

There are two different meanings of “slow” here:

- actual load speed
- intentional playback timing

What to check:

- use preview mode to judge actual load speed
- use demo dev mode to iterate on timing quickly
- if needed, adjust scenario timings in [`src/lib/client-chat-recording.ts`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/src/lib/client-chat-recording.ts)

### Build fails with `spawn EPERM` on Windows in restricted environments

That is usually an environment restriction around Vite/esbuild process spawning.

Recommended baseline:

- run `pnpm build:demo` directly in a normal local shell
- treat preview output as the real validation path

## Key Implementation Files by Responsibility

### Scenario data

- prompt text
- reply text
- timing configuration
- analysis logo and message layout

File:

- [`src/lib/client-chat-recording.ts`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/src/lib/client-chat-recording.ts)

### Playback state machine

- typing prompt
- submit
- analysis phases
- thinking
- streaming reply

File:

- [`src/routes/dashboard.client-chat.tsx`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/src/routes/dashboard.client-chat.tsx)

### Visual language

- overlay layout
- logo orbit
- message pop / travel / settle
- connection lines
- clean-screen states

File:

- [`src/styles.css`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/src/styles.css)

### Preview stability

- demo mode env wiring
- preview startup behavior
- fast-preview timing for dev mode

Files:

- [`scripts/run-demo-vite.mjs`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/scripts/run-demo-vite.mjs)
- [`vite.config.ts`](/C:/Users/ASUS/Desktop/Lucius/video-as-code/lucius-video-as-code/projects/demo-app/vite.config.ts)

## Guardrails

When changing `/chat/recording`, keep these rules:

- do not break default `/chat` behavior
- prefer overlay choreography over fake duplicate pages
- keep the Lucius reply in the real message list
- use preview mode to validate final motion and asset integrity
- keep auth, routing, and standard chat behavior isolated from promo-only logic

## Summary

If you are new to this project, the simplest way to get productive is:

1. start with `pnpm dev:demo`
2. open `/chat/recording`
3. edit `client-chat-recording.ts`, `dashboard.client-chat.tsx`, and `styles.css`
4. validate final quality with `pnpm build:demo && pnpm preview:demo`

That path matches how the project is currently being used in practice.
