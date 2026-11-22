---
name: short-asset-lane
description: >
  Legacy beatboard-first short-asset workflow kept for archived assets and older
  review-data-based experiments. New work should use `short-script-lane` instead.
---

# Short Asset Lane (Legacy)

> Legacy beatboard-first short-asset workflow. Use `short-script-lane` for all new short assets.

**Core Pipeline**: `Verify short-asset eligibility -> Write asset brief -> Write beatboard -> Generate review data -> Build asset -> QA and delivery`

---

## Mandatory Rules

### Serial Execution & Gate Discipline

1. This lane is only for assets that stay within `6-10s`, `2-4` beats, and one clear takeaway.
2. If the asset needs more than `4` beats, multi-scene exposition, or a reusable case-wide narrative, route it back to the heavy lane.
3. Copy, rhythm, and picture planning stay together in the beatboard. Do not create a separate short-lane copy stage.
4. The preview stage produces review data, not AI-generated images.
5. Do not enter build until `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/03-animatic/approval.md` explicitly contains `- Status: APPROVED`.

### Artifact-First Output Rules

- `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/01-translation/asset-brief.json`
- `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/02-beatboard/beatboard.json`
- `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/03-animatic/generation-manifest.json`
- `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/04-build/build-log.md`
- `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/05-review/asset-qa.md`
- `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/06-delivery/delivery-manifest.md`

### Scope Rules

- Shared style constraints still come from `${PROJECT_DIR}/output/<case-slug>/02-constraints/style-constraints.json`.
- The approval target is beat keyframe review data plus rough-sequence review data.
- `proofShot` must be visibly present in the built asset, not only described in planning notes.

---

## Resource Manifest

### References

| Resource | Path | Purpose |
|----------|------|---------|
| beatboard contract | `${PROJECT_DIR}/skills/shared/beatboard-contract.md` | Required short-lane beat fields |
| output contract | `${PROJECT_DIR}/skills/shared/output-contract.md` | Short-lane path contract |
| short-asset gates | `${PROJECT_DIR}/rules/workflow/short-asset-gates.md` | Stage gate rules |
| asset QA rules | `${PROJECT_DIR}/rules/quality/asset-qa-rules.md` | Delivery review rules |

### Templates

| Template | Path | Purpose |
|----------|------|---------|
| asset brief | `${PROJECT_DIR}/templates/short-assets/asset-brief-template.md` | Translation scaffold |
| beatboard | `${PROJECT_DIR}/templates/short-assets/beatboard-template.md` | Beat planning scaffold |
| asset QA | `${PROJECT_DIR}/templates/short-assets/asset-qa-template.md` | Review scaffold |

---

## Workflow

### Step 1: Verify Short-Asset Eligibility

**GATE**: `${PROJECT_DIR}/output/<case-slug>/00-input/product-context.md`, `${PROJECT_DIR}/output/<case-slug>/00-input/design-guideline.md`, `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/00-concept/micro-concept.md`, and `asset-metadata.json` exist.

**EXECUTION**:

1. Read `micro-concept.md` and `asset-metadata.json`.
2. Confirm the asset stays within:
   - `6-10s`
   - `2-4` beats
   - one `singleTakeaway`
3. If the asset exceeds short-lane scope, route it back to the heavy lane and stop.

**CHECKPOINT**:

```markdown
## Step 1 Complete
- [x] Short-asset input gate satisfied
- [x] Short-lane eligibility confirmed
- [x] Output targets identified for this asset
- [ ] Next: auto-proceed to Step 2
```

---

### Step 2: Write Asset Brief

**GATE**: Step 1 complete; short-lane eligibility is confirmed.

**EXECUTION**:

1. Translate the micro-concept into:
   - `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/01-translation/asset-brief.md`
   - `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/01-translation/asset-brief.json`
2. Ensure the JSON contains:
   - `singleTakeaway`
   - `tension`
   - `proof`
   - `audience`
   - `nonGoals`

**CHECKPOINT**:

```markdown
## Step 2 Complete
- [x] `asset-brief.md` written
- [x] `asset-brief.json` written
- [x] Short-lane translation contract complete
- [ ] Next: auto-proceed to Step 3
```

---

### Step 3: Write Beatboard

**GATE**: Step 2 complete; `asset-brief.json` exists and `${PROJECT_DIR}/output/<case-slug>/02-constraints/style-constraints.json` exists.

**EXECUTION**:

1. Write:
   - `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/02-beatboard/beatboard.md`
   - `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/02-beatboard/beatboard.json`
2. Keep copy inside the beatboard via `copyLine`.
3. Ensure every beat includes the full beatboard contract and explicit `proofBinding`.

**CHECKPOINT**:

```markdown
## Step 3 Complete
- [x] `beatboard.md` written
- [x] `beatboard.json` written
- [x] Copy, rhythm, and picture are aligned in one contract
- [ ] Next: auto-proceed to Step 4
```

---

### Step 4: Generate Review Data And Wait For Approval

**GATE**: Step 3 complete; beatboard and shared style constraints exist.

**EXECUTION**:

1. Generate short-lane review data under `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/03-animatic/`.
2. Ensure `generation-manifest.json` and `approval.md` exist.
3. Present the beat keyframe review data and rough-sequence review data.

**BLOCKING**: Wait until `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/03-animatic/approval.md` explicitly contains `- Status: APPROVED`.

**CHECKPOINT**:

```markdown
## Step 4 Complete
- [x] Short-lane review data prepared
- [x] `approval.md` present
- [x] Animatic approval recorded
- [ ] Next: BLOCKING - wait for user / reviewer approval
```

---

### Step 5: Build The Asset

**GATE**: Step 4 complete; `approval.md` is explicitly approved.

**EXECUTION**:

1. Implement the asset in the chosen execution project, typically `${PROJECT_DIR}/projects/remotion-promo` for short video-as-code output.
2. Write `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/04-build/build-log.md`.
3. Ensure the built asset still matches the approved beatboard and proof path.

**CHECKPOINT**:

```markdown
## Step 5 Complete
- [x] Initial short-asset build completed
- [x] `build-log.md` written
- [x] Built asset remains aligned with approved beatboard
- [ ] Next: auto-proceed to Step 6
```

---

### Step 6: Run Asset QA And Write Delivery

**GATE**: Step 5 complete; a real build artifact exists.

**EXECUTION**:

1. Write `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/05-review/asset-qa.md` using the asset QA rules.
2. Write `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/06-delivery/delivery-manifest.md`.
3. Record any remaining watch-review items explicitly instead of silently marking the asset final.

**CHECKPOINT**:

```markdown
## Step 6 Complete - Short asset ready
- [x] `asset-qa.md` written
- [x] `delivery-manifest.md` written
- [x] Short asset is ready for review or iteration
```
