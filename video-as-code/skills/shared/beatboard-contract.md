# Beatboard Contract

The beatboard is the implementation contract for the short-asset lane.

## Required beatboard fields

Each `beatboard.json` document must include:

- `assetSlug`
- `sequenceGoal`
- `durationTarget`
- `aspectRatio`
- `soundMode`
- `brandRole`
- `beats`

## Required beat fields

Each beat entry in `beatboard.json` must include:

- `beatId`
- `purpose`
- `visualState`
- `motionCue`
- `copyLine`
- `durationHint`
- `proofBinding`
- `matchType`
- `assetBindingIds`
- `templateBindingIds`
- `fallbackImplementation`

## Beat writing rules

- Default to `2-4` beats for a short asset.
- If the asset needs more than `4` beats or scene-level exposition, move it back to the heavy lane.
- `copyLine` is part of the beat contract, not a downstream afterthought.
- Describe what the viewer understands in each beat before detailing how that beat moves.
- Bind every reusable visual to an asset or template when possible.
- If no match exists, describe the fallback implementation clearly enough to build directly.
