# Complete Plan Contract

The complete plan is the main implementation contract for the script-first short lane.

It combines:

- the approved script outline
- brand context
- design guideline
- persistent motion constraints

## Required top-level fields

Each `complete-plan.json` must include:

- `assetSlug`
- `aspectRatio`
- `durationTarget`
- `persistentConstraints`
- `styleMapping`
- `screens`
- `implementationNotes`
- `acceptanceChecks`

## Required styleMapping fields

`styleMapping` must include:

- `colorRoles`
- `typeRoles`
- `radiusRules`
- `spacingRules`
- `backgroundRules`
- `motionRules`
- `prohibitedPatterns`

## Required screen fields

Each screen in `complete-plan.json` must include:

- `screenId`
- `goal`
- `uiSurface`
- `layout`
- `background`
- `copy`
- `primaryMotion`
- `motionSequence`
- `proofElement`
- `requiredAssets`
- `timingHint`

## Writing rules

- Each screen must keep one primary motion.
- `motionSequence` may support the primary motion but must not introduce a second competing motion.
- Copy must stay short and non-overlapping by design.
- Layout, background, and visual rules must be specific enough to implement directly in CSS.
- The `screens` array order is the mandatory build order for the script-first short lane.
- Every later screen depends on the previous screen receiving its own explicit build approval.
