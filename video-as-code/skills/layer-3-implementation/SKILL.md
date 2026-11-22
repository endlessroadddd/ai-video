---
name: layer-3-implementation
description: >
  Implements approved heavy-lane storyboards scene by scene and closes the loop
  with scene QA, final sequence QA, and delivery manifests.
  Do not use for short assets; script-first short assets use the dedicated `short-script-lane`.
---

# Layer 3 Implementation

> Build the approved heavy-lane sequence scene by scene, with QA gates before delivery.

**Core Pipeline**: `Verify heavy-lane build gate -> Select implementation target -> Build scenes -> Run QA -> Write delivery`

---

## Mandatory Rules

### Serial Execution & Gate Discipline

1. This skill is heavy-lane only. If the active work is a short asset, route to `short-script-lane` and stop here.
2. Do not build until the approved storyboard, style constraints, and copy contract all exist.
3. Build one scene at a time. Do not start the next scene until the current scene has passed scene QA.
4. Do not mark the case ready for delivery until final sequence QA is complete.
5. Every implementation choice must stay traceable to storyboard IDs, copy, and constraints.

### Artifact-First Output Rules

- `${PROJECT_DIR}/output/<case-slug>/06-implementation/scene-build-log.md`
- `${PROJECT_DIR}/output/<case-slug>/07-review/scene-qa.md`
- `${PROJECT_DIR}/output/<case-slug>/07-review/final-sequence-qa.md`
- `${PROJECT_DIR}/output/<case-slug>/08-delivery/delivery-manifest.md`

No heavy-lane implementation is complete until all four artifacts exist.

---

## Resource Manifest

### References

| Resource | Path | Purpose |
|----------|------|---------|
| scene QA rules | `${PROJECT_DIR}/rules/quality/scene-qa-rules.md` | Per-scene acceptance rules |
| final sequence QA rules | `${PROJECT_DIR}/rules/quality/final-sequence-qa-rules.md` | Whole-sequence acceptance rules |
| output contract | `${PROJECT_DIR}/skills/shared/output-contract.md` | Heavy-lane path contract |

---

## Workflow

### Step 1: Verify Heavy-Lane Build Gate

**GATE**: `${PROJECT_DIR}/output/<case-slug>/02-constraints/style-constraints.json`, `${PROJECT_DIR}/output/<case-slug>/03-storyboard/storyboard.json`, `${PROJECT_DIR}/output/<case-slug>/04-preview/approval.md`, and `${PROJECT_DIR}/output/<case-slug>/05-copy/copy.json` exist.

**EXECUTION**:

1. Confirm the work is not a short asset.
2. Verify `approval.md` contains `- Status: APPROVED`.
3. Load storyboard, constraints, copy, and QA rule files.

**CHECKPOINT**:

```markdown
## Step 1 Complete
- [x] Heavy-lane build gate satisfied
- [x] Approved storyboard, constraints, and copy loaded
- [x] QA rule files loaded
- [ ] Next: auto-proceed to Step 2
```

---

### Step 2: Select Implementation Target

**GATE**: Step 1 complete; all heavy-lane inputs are loaded.

**EXECUTION**:

1. Choose the project target that best fits the approved storyboard:
   - `${PROJECT_DIR}/projects/demo-app`
   - `${PROJECT_DIR}/projects/remotion-promo`
   - `${PROJECT_DIR}/projects/gsap-animations`
   - another explicit project target requested by the user
2. Record the target in `scene-build-log.md` before scene work begins.

**CHECKPOINT**:

```markdown
## Step 2 Complete
- [x] Implementation target selected
- [x] Build log target recorded
- [ ] Next: auto-proceed to Step 3
```

---

### Step 3: Build Scene By Scene

**GATE**: Step 2 complete; target project is selected and the storyboard contract is locked.

**EXECUTION**:

1. Implement one storyboard scene at a time.
2. After each scene, record what changed in `${PROJECT_DIR}/output/<case-slug>/06-implementation/scene-build-log.md`.
3. Do not begin the next scene until the current scene is reviewable.

**CHECKPOINT**:

```markdown
## Step 3 Complete
- [x] Scene implementation progress recorded in `scene-build-log.md`
- [x] No later scene started before current scene was reviewable
- [ ] Next: auto-proceed to Step 4
```

---

### Step 4: Run QA Gates

**GATE**: Step 3 complete; every implemented scene is recorded in the build log.

**EXECUTION**:

1. Run scene QA and write `${PROJECT_DIR}/output/<case-slug>/07-review/scene-qa.md`.
2. Fix any failures before proceeding.
3. Run final sequence QA and write `${PROJECT_DIR}/output/<case-slug>/07-review/final-sequence-qa.md`.

**CHECKPOINT**:

```markdown
## Step 4 Complete
- [x] `scene-qa.md` written
- [x] `final-sequence-qa.md` written
- [x] Heavy-lane QA gates passed or resolved
- [ ] Next: auto-proceed to Step 5
```

---

### Step 5: Write Delivery Manifest

**GATE**: Step 4 complete; scene QA and final sequence QA are both complete.

**EXECUTION**:

1. Write `${PROJECT_DIR}/output/<case-slug>/08-delivery/delivery-manifest.md`.
2. List the actual output artifact paths, not intended ones.
3. Mark any remaining watch-review items explicitly instead of silently declaring final success.

**CHECKPOINT**:

```markdown
## Step 5 Complete - Heavy-lane implementation ready
- [x] `scene-build-log.md` complete
- [x] QA artifacts complete
- [x] `delivery-manifest.md` written
```
