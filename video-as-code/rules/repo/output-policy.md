# Output Policy

The `output/` directory is the persistent record of a production pass.

## What belongs in output

- input snapshots
- translation and constraints documents
- storyboard and matching manifests
- preview approvals
- copy outputs
- implementation logs
- QA records
- curated delivery manifests

## What should usually stay out of git

- generated preview image batches
- large renders
- temporary export binaries

## What may stay in git

- markdown artifacts
- JSON contracts
- approval records
- delivery manifests

## Naming

Use a stable slug for each case:

`output/<case-slug>/`

Avoid timestamp-only directories for canonical outputs.
