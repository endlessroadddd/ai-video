# Storyboard Contract

The storyboard is the implementation contract for this repository.

## Required scene fields

Each scene entry in `storyboard.json` must include:

- `sceneId`
- `sceneGoal`
- `staticStates`
- `motionSteps`
- `timing`
- `easing`
- `assetBindings`
- `templateBindings`
- `copySlots`

## Required match fields

Each scene entry in `match-manifest.json` must include:

- `sceneId`
- `matchType`
- `matchedAssetIds`
- `matchedTemplateIds`
- `modifications`
- `fallbackImplementationPlan`

## Scene writing rules

- Describe what the frame looks like before describing how it moves.
- Keep motion explicit: what moves, when, how far, and why.
- Bind every reusable visual to either an asset or a template when available.
- When no match exists, describe the fallback implementation in enough detail to build directly.
