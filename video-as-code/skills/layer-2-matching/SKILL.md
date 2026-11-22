---
name: layer-2-matching
description: >
  Builds heavy-lane storyboards by combining the core brief, style constraints,
  assets, and templates into an implementation-grade scene plan.
  Use when the work needs `storyboard.*`, `match-manifest.json`, and heavy-lane
  preview approval. Do not use for short assets; route those to `short-script-lane`.
---

# Layer 2 Matching

> Build a heavy-lane storyboard that reuses repository assets and templates whenever possible.

**Core Pipeline**: `Verify heavy-lane eligibility -> Match reusable parts -> Write storyboard -> Generate preview -> Wait for approval`

---

## Mandatory Rules

### Serial Execution & Gate Discipline

1. This skill is heavy-lane only. If the request is a short asset, stop and route to `short-script-lane` instead of inflating it into scenes.
2. Do not write storyboard scenes before the heavy-lane brief and style constraints both exist.
3. Every scene must declare its reuse mode: `asset-match`, `template-match`, or `fresh-design`.
4. Preview happens after storyboard completion, not before.
5. No downstream copy or implementation work may begin until `approval.md` is explicitly marked `APPROVED`.

### Artifact-First Output Rules

- `${PROJECT_DIR}/output/<case-slug>/03-storyboard/storyboard.json` is the heavy-lane implementation contract.
- `${PROJECT_DIR}/output/<case-slug>/03-storyboard/match-manifest.json` records reuse decisions and fallback plans.
- `${PROJECT_DIR}/output/<case-slug>/04-preview/approval.md` is the gate file for all downstream heavy-lane work.

---

## Resource Manifest

### References

| Resource | Path | Purpose |
|----------|------|---------|
| storyboard contract | `${PROJECT_DIR}/skills/shared/storyboard-contract.md` | Required scene fields |
| output contract | `${PROJECT_DIR}/skills/shared/output-contract.md` | Heavy-lane path contract |
| asset registry | `${PROJECT_DIR}/assets/registry.json` | Reusable asset lookup |
| template registry | `${PROJECT_DIR}/templates/registry.json` | Reusable template lookup |
| material library index | `${PROJECT_DIR}/docs/material-library/index.md` | Human-readable curated catalog |

### Workflows

| Workflow | Path | Purpose |
|----------|------|---------|
| heavy-lane gates | `${PROJECT_DIR}/rules/workflow/pipeline-gates.md` | Approval and downstream gate rules |

---

## Workflow

### Step 1: Verify Heavy-Lane Eligibility

**GATE**: `${PROJECT_DIR}/output/<case-slug>/01-translation/core-brief.json` and `${PROJECT_DIR}/output/<case-slug>/02-constraints/style-constraints.json` exist.

**EXECUTION**:

1. Confirm the work really belongs to the heavy lane.
2. If the request is a `6-10s` asset with a single takeaway and a script-first approval flow, route to `${PROJECT_DIR}/skills/short-script-lane/SKILL.md` and stop this skill.
3. Load the heavy-lane brief, style constraints, asset registry, template registry, and storyboard contract.

**CHECKPOINT**:

```markdown
## Step 1 Complete
- [x] Heavy-lane eligibility confirmed
- [x] Required inputs loaded
- [x] Scene storyboard remains the correct contract type
- [ ] Next: auto-proceed to Step 2
```

---

### Step 2: Match Reusable Assets And Templates

**GATE**: Step 1 complete; heavy-lane inputs and registries are loaded.

**EXECUTION**:

1. Resolve the case-wide proof arc from `core-brief.json`.
2. For each scene, search `assets/registry.json` and `templates/registry.json` first.
3. Filter to curated `material-library` entries first; raw fallback entries remain manual backup only and must not be auto-recommended.
4. Score curated candidates in this order:
   - initial filter by `narrativeRole`, `scriptTriggersEn`, `scriptTriggersZh`, and `hostSurfaces`
   - fit ranking by `toneTags`, `visualWeight`, `informationDensity`, and `dominance`
   - reuse feasibility by `reuseMode`, `mutationCost`, `safeToChange`, and `keepFixed`
5. Prioritize `stability = stable` over `beta` on ties. If the top candidate still scores weakly, choose `fresh-design` instead of forcing reuse.
6. Decide one reuse mode per scene:
   - `asset-match`
   - `template-match`
   - `fresh-design`
7. Record modifications and fallback implementation details while matching, not afterwards.

**CHECKPOINT**:

```markdown
## Step 2 Complete
- [x] Scene-level reuse decisions made
- [x] Fallback plans defined where no direct match exists
- [ ] Next: auto-proceed to Step 3
```

---

### Step 3: Write Storyboard And Match Manifest

**GATE**: Step 2 complete; reuse decisions exist for every scene.

**EXECUTION**:

1. Write `${PROJECT_DIR}/output/<case-slug>/03-storyboard/storyboard.md`.
2. Write `${PROJECT_DIR}/output/<case-slug>/03-storyboard/storyboard.json`.
3. Write `${PROJECT_DIR}/output/<case-slug>/03-storyboard/match-manifest.json`.
4. Ensure every storyboard scene describes static states before motion and is detailed enough for implementation.

**CHECKPOINT**:

```markdown
## Step 3 Complete
- [x] `storyboard.md` written
- [x] `storyboard.json` written
- [x] `match-manifest.json` written
- [ ] Next: auto-proceed to Step 4
```

---

### Step 4: Generate Preview And Wait For Approval

**GATE**: Step 3 complete; storyboard and match manifest exist.

**EXECUTION**:

1. Generate heavy-lane preview artifacts under `${PROJECT_DIR}/output/<case-slug>/04-preview/`.
2. Ensure `${PROJECT_DIR}/output/<case-slug>/04-preview/approval.md` exists.
3. Present the preview for review.

**BLOCKING**: Wait until `${PROJECT_DIR}/output/<case-slug>/04-preview/approval.md` explicitly contains `- Status: APPROVED`.

**CHECKPOINT**:

```markdown
## Step 4 Complete
- [x] Preview artifacts generated
- [x] `approval.md` present
- [x] Heavy-lane preview approved
- [ ] Next: BLOCKING - wait for user / reviewer approval
```

---

### Step 5: Matching Ready For Handoff

**GATE**: Step 4 complete; `approval.md` is explicitly approved.

**EXECUTION**:

1. Reconfirm that the approved storyboard, preview, and match manifest all describe the same scene plan.
2. Hand off to heavy-lane copy or implementation without changing scene semantics.

**CHECKPOINT**:

```markdown
## Step 5 Complete - Matching ready
- [x] Approved storyboard contract locked
- [x] Approved preview gate satisfied
- [x] Downstream heavy-lane work may begin
```
