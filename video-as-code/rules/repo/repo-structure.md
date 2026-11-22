# Repository Structure

This repository is organized around a production pipeline rather than around a single application.

## Top-level directories

- `skills/`: process definitions for each production layer
- `rules/`: non-negotiable design, workflow, quality, and repo rules
- `assets/`: shared source materials and reusable visual parts
- `templates/`: reusable scene, motion, copy, and project templates
- `projects/`: runnable code projects and tooling workspaces
- `output/`: case-specific pipeline state and generated artifacts

## Design intent

- `projects/` remains the only pnpm workspace member root.
- Shared knowledge and reusable materials live outside individual projects.
- Outputs are centralized so source code and generated artifacts do not get mixed together.
