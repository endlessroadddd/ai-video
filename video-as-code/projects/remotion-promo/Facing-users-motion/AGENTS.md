# Facing Users Motion - Project Guide for AI Agents

## Project Overview

This is a **Remotion-based video generation project** that creates animated marketing/product videos for "Lucius" - an AI-powered system. The project generates 5 distinct explainer videos demonstrating Lucius capabilities:

1. **ResponseEngine** (`ReplyPulse`) - Shows how user messages flow through the reasoning engine
2. **EventTriggerMesh** (`FollowupTrigger`) - Demonstrates event-driven automation and detection
3. **LearningTrustLoop** (`WarmHandoff`) - Illustrates the learning loop and trust scaling mechanism
4. **JourneyRouter** (`CompetitorBrief`) - Displays case routing and handoff workflows

All videos are rendered at **1920x1080 resolution, 30fps**.

## Technology Stack

- **Framework**: [Remotion](https://www.remotion.dev/) 4.0.261 - React-based video generation
- **UI Library**: React 18.3.1
- **Language**: TypeScript 5.7.0 (strict mode enabled)
- **Fonts**: 
  - Outfit (body text) via `@remotion/google-fonts`
  - JetBrains Mono (monospace/code) via `@remotion/google-fonts`
  - Playfair Display (brand headlines/subtitles) via `@remotion/google-fonts`
  - Inter (Vercel/Linear style UI) via `@remotion/google-fonts`
  - SF Pro (chat UI - system font fallback)

## Project Structure

```
src/
├── index.ts                    # Entry point - registers root, loads fonts
├── Root.tsx                    # Defines all video compositions
├── structure/
│   └── scenes.ts               # Scene configuration data (nodes, edges, routes, phases)
├── theme/
│   └── tokens.ts               # Design tokens (colors, fonts, radii, shadows)
├── motion/
│   └── primitives.ts           # Animation utility functions (ramp, spring, mix, etc.)
├── compositions/
│   ├── FacingUsersScenes.tsx   # Main scene implementations (ReplyPulseScene, FollowupTriggerScene, etc.)
│   ├── ReplyPulse.tsx          # Composition wrapper for ResponseEngine
│   ├── FollowupTrigger.tsx     # Composition wrapper for EventTriggerMesh
│   ├── WarmHandoff.tsx         # Composition wrapper for LearningTrustLoop
│   └── CompetitorBrief.tsx     # Composition wrapper for JourneyRouter
└── components/
    ├── StructureScene.tsx      # Generic structure-based scene renderer
    ├── SceneFrame.tsx          # Common scene frame with header/stage
    ├── BrandLockup.tsx         # Lucius logo + brand lockup component
    ├── MessageBubble.tsx       # Chat message bubble UI
    ├── Panel.tsx               # Panel/card component
    ├── Stage.tsx               # Stage layout component
    ├── FeatureFrame.tsx        # Feature framing component
    ├── BriefCard.tsx           # Brief/card display component
    ├── FollowupCard.tsx        # Follow-up action card
    ├── HandoffCard.tsx         # Handoff context card
    └── StatusBadge.tsx         # Status indicator badge

public/
├── logo-mark-black.svg         # Lucius logo asset
└── index.html                  # HTML template
```

## Build and Development Commands

```bash
# Start Remotion Studio for preview (port 3005)
npm start

# Render individual videos
npm run render:reply      # Output: out/response-engine.mp4
npm run render:followup   # Output: out/event-trigger-mesh.mp4
npm run render:handoff    # Output: out/learning-trust-loop.mp4
npm run render:brief      # Output: out/journey-router.mp4
```

## Architecture Patterns

### Scene Configuration System

Scenes are defined declaratively in `src/structure/scenes.ts` using the `StructureSceneConfig` type:

```typescript
export type StructureSceneConfig = {
  id: string;
  page: string;           // Associated HTML page
  kicker: string;         // Category label
  title: string;          // Main heading
  copy: string;           // Description text
  durationMs: number;     // Total duration in milliseconds
  durationInFrames: number;
  captions: string[];     // Caption texts
  phases: ScenePhase[];   // Animation phases with start/end progress (0-1)
  ornaments: SceneOrnament[];  // Background frames/decorations
  nodes: SceneNode[];     // Interactive nodes (cards, signals, etc.)
  edges: SceneEdge[];     // Connection lines (SVG paths)
  routes: SceneRoute[];   // Animated particles along paths
};
```

### Animation Primitives

All animations use frame-based interpolation from `src/motion/primitives.ts`:

- `ramp(frame, start, end)` - Linear interpolation between frame ranges
- `springProgress(frame, fps, delay, config)` - Spring physics animation
- `mix(progress, from, to)` - Blend between two values
- `mixColor(progress, from, to)` - Color interpolation
- `timelineProgress(frame, spec)` - Multi-track timeline control

### Component Conventions

1. **Style System**: CSS-in-JS with design tokens from `src/theme/tokens.ts`
   - Colors: `tokens.colors.primary`, `tokens.colors.canvas`, etc.
   - Fonts: `tokens.fonts.body`, `tokens.fonts.mono`
   - Spacing: Hard-coded pixel values with consistent patterns

2. **Animation Pattern**: Components receive `frame` and compute `progress` values:
   ```typescript
   const frame = useCurrentFrame();
   const intro = ramp(frame, 0, 18);  // 0→1 over first 18 frames
   ```

3. **Shadow/Depth**: Consistent elevation using `boxShadow` with rgba values

4. **Typography**:
   - Titles: 54-56px, `letterSpacing: "-0.07em"`, `fontWeight: 600`
   - Body: 17-20px, `lineHeight: 1.42-1.5`
   - Chips/Badges: 11-13px, `fontFamily: tokens.fonts.mono`, uppercase

## Key File References

| Purpose | File |
|---------|------|
| Add new video composition | `src/Root.tsx` + `src/compositions/` |
| Modify scene timing/content | `src/structure/scenes.ts` |
| Change colors/fonts | `src/theme/tokens.ts` |
| Adjust animation easing | `src/motion/primitives.ts` |
| Update scene layout | `src/components/StructureScene.tsx` |
| Modify brand logo display | `src/components/BrandLockup.tsx` |

## Common Tasks

### Adding a New Video Composition

1. Add scene config to `src/structure/scenes.ts`
2. Create scene component in `src/compositions/FacingUsersScenes.tsx` or new file
3. Create composition wrapper in `src/compositions/YourComposition.tsx`
4. Register in `src/Root.tsx` with `<Composition />`
5. Add render script to `package.json`

### Modifying Animation Timing

All timings use relative progress (0.0 to 1.0) mapped to frame ranges:

```typescript
const t = (p: number) => p * (durationInFrames - 1);
const myAnimation = ramp(frame, t(0.2), t(0.6)); // 20% to 60% of video
```

### Color Palette

Primary purple theme (`#644fb8`):
- Primary: `#644fb8`
- Primary Tint Background: `#ece7f8`
- Primary Tint Border: `#d8cff2`
- Canvas: `#f5f4ee` (main background)
- Panel: `#ffffff` (card backgrounds)
- Text: `#1e293b` (main text), `#6b7280` (muted)

Lucius Brand Colors:
- Lucius Purple: `#5538C7` (primary brand color)
- Warm Ivory: `#E1DAC0` (backgrounds, warm tones)
- Lavender Mist: `#BAB2FF` (accent, glow effects)
- Orchid Bloom: `#B268D8` (marketing highlights)
- Deep Moss: `#1B4038` (dark backgrounds, emphasis text)
- Cobalt Pulse: `#504DDC` (tech elements, data flows)

## Configuration

- **Remotion Config** (`remotion.config.ts`): 
  - Video format: JPEG
  - Overwrite output: enabled

- **TypeScript** (`tsconfig.json`):
  - Target: ES2018
  - Module: CommonJS
  - JSX: react-jsx
  - Strict mode enabled

## Output

Rendered videos are saved to `out/` directory:
- `response-engine.mp4`
- `event-trigger-mesh.mp4`
- `learning-trust-loop.mp4`
- `journey-router.mp4`

## Notes for AI Agents

- This project uses **declarative animation** - timing is data-driven from `scenes.ts`
- The `StructureScene` component can render any scene defined in the config
- Custom scenes (like `ReplyPulseScene`) override the generic renderer for fine control
- All coordinates are in pixels relative to 1920x1080 canvas
- Font loading happens in `src/index.ts` before root registration
- Use `staticFile()` for assets in `public/` folder
