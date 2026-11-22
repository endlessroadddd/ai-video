# Pipeline Gates

These gates apply to the heavy lane.
Short assets use `rules/workflow/short-asset-gates.md`.
This repository uses explicit stage gates to keep planning, preview approval, copy, and implementation aligned.

## Gate 1: Translation ready

The pipeline may enter storyboard matching only after these files exist:

- `01-translation/core-brief.md`
- `01-translation/core-brief.json`
- `02-constraints/style-constraints.md`
- `02-constraints/style-constraints.json`

## Gate 2: Storyboard ready

The pipeline may request preview generation only after these files exist:

- `03-storyboard/storyboard.md`
- `03-storyboard/storyboard.json`
- `03-storyboard/match-manifest.json`

## Gate 3: Preview approved

The pipeline may enter copy or implementation only after:

- `04-preview/approval.md` exists
- `04-preview/approval.md` contains the marker `APPROVED`

## Gate 4: Scene-by-scene implementation

Each implemented scene must be reviewed before the next scene begins:

- Scene implementation notes are recorded in `06-implementation/scene-build-log.md`
- Scene QA is recorded in `07-review/scene-qa.md`

## Gate 5: Sequence delivery

No delivery artifact is final until:

- `07-review/final-sequence-qa.md` is complete
- cross-scene transitions and fidelity have been reviewed
