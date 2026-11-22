---
name: layer-3-copy
description: >
  Generates heavy-lane on-screen copy from an approved storyboard and the upstream
  product brief. Use when the work needs `copy.md/json` for a case video.
  Do not use for short assets; script-first short assets live in `short-script-lane`.
---

# Layer 3 Copy

> Write low-friction heavy-lane copy only after the storyboard is approved.

**Core Pipeline**: `Verify heavy-lane gate -> Draft copy from brief and storyboard -> Write outputs -> Validate readability`

---

## Mandatory Rules

### Serial Execution & Gate Discipline

1. This skill is heavy-lane only. If the active work is a short asset, stop and route it to `short-script-lane`.
2. Do not draft copy until `${PROJECT_DIR}/output/<case-slug>/04-preview/approval.md` is explicitly approved.
3. Copy must serve product meaning before style or cleverness.
4. Do not invent claims that are missing from the brief, storyboard, or approved case inputs.
5. Do not say copy is complete until both Markdown and JSON outputs exist.

### Artifact-First Output Rules

- `${PROJECT_DIR}/output/<case-slug>/05-copy/copy.json` is the downstream copy contract.
- `${PROJECT_DIR}/output/<case-slug>/05-copy/copy.md` is the human-readable companion.

---

## Resource Manifest

### References

| Resource | Path | Purpose |
|----------|------|---------|
| copy template | `${PROJECT_DIR}/templates/copy/copy-template.md` | Output scaffold |
| output contract | `${PROJECT_DIR}/skills/shared/output-contract.md` | Heavy-lane path contract |

---

## Workflow

### Step 1: Verify Heavy-Lane Copy Gate

**GATE**: `${PROJECT_DIR}/output/<case-slug>/01-translation/core-brief.json`, `${PROJECT_DIR}/output/<case-slug>/03-storyboard/storyboard.json`, and `${PROJECT_DIR}/output/<case-slug>/04-preview/approval.md` exist.

**EXECUTION**:

1. Confirm the work is not a short asset.
2. Verify `approval.md` contains `- Status: APPROVED`.
3. Load the heavy-lane brief, storyboard, and copy template.

**CHECKPOINT**:

```markdown
## Step 1 Complete
- [x] Heavy-lane copy gate satisfied
- [x] Approved storyboard verified
- [x] Copy output targets identified
- [ ] Next: auto-proceed to Step 2
```

---

### Step 2: Draft Copy From Approved Meaning And Scenes

**GATE**: Step 1 complete; approved storyboard and heavy-lane brief are loaded.

**EXECUTION**:

1. Derive on-screen copy from the approved storyboard, not from unapproved ideas.
2. Keep copy low-friction, easy to scan, and tied to the case's product meaning.
3. Ensure the copy respects scene intent and timing instead of forcing the storyboard to adapt to overwritten lines.

**CHECKPOINT**:

```markdown
## Step 2 Complete
- [x] Scene-aligned copy drafted
- [x] Product-context alignment checked
- [ ] Next: auto-proceed to Step 3
```

---

### Step 3: Write Copy Outputs

**GATE**: Step 2 complete; heavy-lane copy draft exists.

**EXECUTION**:

1. Write `${PROJECT_DIR}/output/<case-slug>/05-copy/copy.md`.
2. Write `${PROJECT_DIR}/output/<case-slug>/05-copy/copy.json`.
3. Ensure the JSON is complete enough for implementation to consume directly.

**CHECKPOINT**:

```markdown
## Step 3 Complete
- [x] `copy.md` written
- [x] `copy.json` written
- [x] Heavy-lane copy contract exists
- [ ] Next: auto-proceed to Step 4
```

---

### Step 4: Validate Readability And Scope

**GATE**: Step 3 complete; both copy outputs exist.

**EXECUTION**:

1. Re-read the copy for readability at scene speed.
2. Remove extra marketing language that is unsupported by the brief.
3. Confirm the copy still belongs to the approved storyboard and does not reopen solved scene decisions.

**CHECKPOINT**:

```markdown
## Step 4 Complete - Copy ready
- [x] Copy is readable at intended scene speed
- [x] Unsupported claims removed
- [x] `copy.*` is ready for heavy-lane implementation
```
