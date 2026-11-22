---
name: short-script-lane
description: >
  Runs the canonical script-first 6-10 second short-asset workflow from micro-concept
  through script outline, complete plan, materials planning, React + CSS build,
  browser verification, QA, and delivery. Use when the user asks for a short asset,
  wants to confirm a script before design integration, or wants browser-first
  CSS implementation instead of Remotion.
---

# Short Script Lane

> Execute the canonical script-first short-asset workflow with three approval gates before code and one approval gate after every built screen.

**Core Pipeline**: `Verify concept -> Write script outline -> Wait for script approval -> Write complete plan -> Wait for plan approval -> Write material needs -> Wait for materials approval -> Build screen-01 -> Wait for screen-01 approval -> Build screen-02 -> Wait for screen-02 approval -> Continue until all approved screens are complete -> Browser review -> QA and delivery`

---

## Mandatory Rules

### Serial Execution & Gate Discipline

1. This lane is only for `6-10s` assets that can stay within one clear takeaway and one clear proof path.
2. Code must not begin until `01-script`, `02-plan`, and `03-materials` are all explicitly approved.
3. Build must proceed screen by screen in the order defined by `02-plan/complete-plan.json`.
4. No screen may begin implementation until the previous screen has its own build approval.
5. Each screen must have one primary motion only.
6. Brand constraints and base motion constraints must persist through every stage, not just QA.
7. This lane is browser-first and CSS-first. Do not switch to Remotion.

### Persistent Constraints

Every stage must explicitly carry `persistentConstraints`, which includes:

- `brandConstraints`
- `baseMotionConstraints`

`baseMotionConstraints` must preserve:

- `onePrimaryMotionPerScreen`
- `lessIsMore`
- `minimalCopy`
- `noTextOverlap`
- `singleProofPath`
- `quietlyConfidentMotion`

### Script Outline Detail Rules

- `01-script` is not allowed to stay abstract.
- Every screen in the script outline must explicitly describe:
  - the interface surface
  - the layout snapshot
  - the background treatment
  - the key on-screen elements
  - the single primary motion
- Background and interface details must be clear enough for a user to approve visual direction before the complete plan exists.
- If a screen only states purpose plus motion without clarifying what the interface and background actually look like, the script gate should fail.
- When listing reusable materials or `requiredAssets`, prefer curated material-library IDs from `${PROJECT_DIR}/assets/registry.json`.
- Match curated materials by `narrativeRole`, `scriptTriggersEn`, `scriptTriggersZh`, and `hostSurfaces` first.
- Rank fit by `toneTags`, `visualWeight`, `informationDensity`, and `dominance`, then decide whether reuse is safe via `reuseMode`, `mutationCost`, `safeToChange`, and `keepFixed`.
- If curated candidates remain weak after ranking, choose to hand-build the screen instead of forcing a low-fit reuse.

### CSS Implementation Rules

- One screen, one moving focal element
- Minimal copy, no text overlap
- Brand guideline must be visible in color, typography, radius, background, and motion tone
- SaaS demo or micro-animation extensions are allowed only if they still preserve one primary motion per screen

---

## Resource Manifest

### References

| Resource | Path | Purpose |
|----------|------|---------|
| output contract | `${PROJECT_DIR}/skills/shared/output-contract.md` | Canonical path layout |
| persistent constraints contract | `${PROJECT_DIR}/skills/shared/persistent-constraints-contract.md` | Cross-stage rules |
| script outline contract | `${PROJECT_DIR}/skills/shared/script-outline-contract.md` | First approval artifact |
| complete plan contract | `${PROJECT_DIR}/skills/shared/complete-plan-contract.md` | Main implementation contract |
| material needs contract | `${PROJECT_DIR}/skills/shared/material-needs-contract.md` | Materials planning contract |
| short script lane gates | `${PROJECT_DIR}/rules/workflow/short-script-lane-gates.md` | Approval and build gates |
| asset QA rules | `${PROJECT_DIR}/rules/quality/asset-qa-rules.md` | Final review rules |

### Templates

| Template | Path | Purpose |
|----------|------|---------|
| script outline | `${PROJECT_DIR}/templates/short-script-assets/script-outline-template.md` | Script-first scaffold |
| complete plan | `${PROJECT_DIR}/templates/short-script-assets/complete-plan-template.md` | Design integration scaffold |
| material needs | `${PROJECT_DIR}/templates/short-script-assets/material-needs-template.md` | Asset dependency scaffold |
| screen build approval | `${PROJECT_DIR}/templates/short-script-assets/screen-build-approval-template.md` | Per-screen approval scaffold |
| React project bootstrap | `${PROJECT_DIR}/templates/project-bootstrap/short-asset-react-template/` | Browser-first CSS implementation template |

---

## Workflow

### Step 1: Verify Short-Asset Concept

**GATE**: `${PROJECT_DIR}/output/<case-slug>/00-input/product-context.md`, `${PROJECT_DIR}/output/<case-slug>/00-input/design-guideline.md`, `${PROJECT_DIR}/output/<case-slug>/short-assets/<asset-slug>/00-concept/micro-concept.md`, and `asset-metadata.json` exist.

**EXECUTION**:

1. Read the concept and metadata.
2. Confirm the work fits `6-10s`, one takeaway, one proof path, and one primary motion per screen.
3. If the concept requires multi-scene exposition or competing motions, route it to the heavy lane instead of forcing it through this skill.

**CHECKPOINT**:

```markdown
## Step 1 Complete
- [x] Concept inputs verified
- [x] Script-first short lane confirmed as the correct lane
- [x] Screen-level single-motion discipline established
- [ ] Next: auto-proceed to Step 2
```

---

### Step 2: Write Script Outline

**GATE**: Step 1 complete.

**EXECUTION**:

1. Write `01-script/script-outline.md`.
2. Write `01-script/script-outline.json`.
3. Include `persistentConstraints` in both outputs.
4. For each screen, explicitly describe the interface surface, layout snapshot, background treatment, key visible elements, and single primary motion.
5. Do not defer all visual specifics to the complete plan; the script outline must already be visually reviewable.
6. Create `01-script/approval.md` if it does not exist.

**BLOCKING**: Wait for `01-script/approval.md` to contain `- Status: APPROVED`.

**CHECKPOINT**:

```markdown
## Step 2 Complete
- [x] `script-outline.md` written
- [x] `script-outline.json` written
- [x] `01-script/approval.md` present
- [ ] Next: BLOCKING - wait for script approval
```

---

### Step 3: Write Complete Plan

**GATE**: Step 2 complete and `01-script/approval.md` is explicitly approved.

**EXECUTION**:

1. Integrate the approved script with brand context, design guideline, and persistent constraints.
2. Write `02-plan/complete-plan.md`.
3. Write `02-plan/complete-plan.json`.
4. Ensure every screen defines layout, background, copy, primary motion, motion sequence, and proof element.
5. Create `02-plan/approval.md` if it does not exist.

**BLOCKING**: Wait for `02-plan/approval.md` to contain `- Status: APPROVED`.

**CHECKPOINT**:

```markdown
## Step 3 Complete
- [x] `complete-plan.md` written
- [x] `complete-plan.json` written
- [x] `02-plan/approval.md` present
- [ ] Next: BLOCKING - wait for complete plan approval
```

---

### Step 4: Write Material Needs

**GATE**: Step 3 complete and `02-plan/approval.md` is explicitly approved.

**EXECUTION**:

1. Audit what is already available in the repo.
2. Write `03-materials/material-needs.md`.
3. Write `03-materials/material-needs.json`.
4. For every reusable candidate, explicitly state whether it is:
   - `reuse as-is`
   - `reuse with adaptation`
   - `hand-build`
5. Highlight any missing item that could break brand fidelity or force cluttered motion/layout decisions.
6. Create `03-materials/approval.md` if it does not exist.

**BLOCKING**: Wait for `03-materials/approval.md` to contain `- Status: APPROVED`.

**CHECKPOINT**:

```markdown
## Step 4 Complete
- [x] `material-needs.md` written
- [x] `material-needs.json` written
- [x] `03-materials/approval.md` present
- [ ] Next: BLOCKING - wait for materials approval
```

---

### Step 5: Build Screens In React And CSS, One By One

**GATE**: Step 4 complete and `03-materials/approval.md` is explicitly approved.

**EXECUTION**:

1. Create or update `projects/short-asset-<asset-slug>` using the React template as the baseline.
2. Read screen order from `02-plan/complete-plan.json`.
3. Create `04-build/build-log.md` as the running index for the build state.
4. Build `screen-01` only.
5. Write `04-build/screens/<screen-id>/build-notes.md`.
6. Create `04-build/screens/<screen-id>/approval.md` if it does not exist.
7. Block after each built screen and wait for `04-build/screens/<screen-id>/approval.md` to contain `- Status: APPROVED`.
8. Only after that approval may the next screen begin.
9. Keep one primary motion per screen and avoid text overlap throughout.

**CHECKPOINT**:

```markdown
## Step 5 Complete
- [x] React project exists at `projects/short-asset-<asset-slug>`
- [x] Screens are being implemented in the order defined by `complete-plan.json`
- [x] Each completed screen has `build-notes.md`
- [x] Each completed screen has its own `approval.md`
- [x] `build-log.md` written
- [ ] Next: BLOCKING - wait for the current screen approval before the next screen
```

---

### Step 6: Browser Review, QA, And Delivery

**GATE**: Step 5 complete, every screen listed in `02-plan/complete-plan.json` has been built, and every screen approval is explicitly approved.

**EXECUTION**:

1. Start the React dev server.
2. Open the browser preview.
3. Verify loading, visual fidelity, single-motion discipline, minimal copy, and non-overlap behavior.
4. Verify that no later screen drifted from earlier approved screens during integration.
5. Write `05-review/asset-qa.md`.
6. Write `06-delivery/delivery-manifest.md`.

**CHECKPOINT**:

```markdown
## Step 6 Complete - Script-first short asset ready
- [x] Browser preview reviewed
- [x] All screen-level approvals preserved through the integrated preview
- [x] `asset-qa.md` written
- [x] `delivery-manifest.md` written
```
