# Script Outline Contract

The script outline is the first formal approval artifact in the script-first short lane.

It confirms what the short asset is about before the full design plan is written.

## Required top-level fields

Each `script-outline.json` must include:

- `assetSlug`
- `singleTakeaway`
- `hook`
- `screens`
- `persistentConstraints`
- `nonGoals`

## Required screen fields

Each screen in `script-outline.json` must include:

- `screenId`
- `purpose`
- `uiSurface`
- `layoutSnapshot`
- `background`
- `keyElements`
- `primaryMotion`
- `copyHint`
- `durationHint`

## Writing rules

- Each screen must have exactly one primary motion.
- Each screen must explicitly describe what interface the viewer is looking at.
- Each screen must explicitly describe the background treatment or environment.
- Each screen must explicitly list the key visible elements that make the screen readable.
- `copyHint` must stay short and directional, not final long-form copy.
- The script outline must be concrete enough for a user to approve visual direction before the complete plan exists.
- If a screen cannot be described with one clear primary motion, it must be rewritten before approval.
