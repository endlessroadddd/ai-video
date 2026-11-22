---
name: layer-1-translation
description: >
  Translates frozen case inputs into the correct meaning brief for the heavy lane.
  Use when the work needs `core-brief.*` or when the user asks to derive
  why/how/what, highlights, audience, and non-goals from product context plus a case study.
  Short script-first assets should use `short-script-lane` instead.
---

# Layer 1 Translation

> Turn frozen case inputs into the heavy-lane meaning brief.

**Core Pipeline**: `Verify inputs -> Route lane -> Extract meaning -> Write brief -> Validate contract`

---

## Mandatory Rules

### Serial Execution & Gate Discipline

1. Steps execute in order. Do not draft downstream outputs before the current step's gate is satisfied.
2. If the request is a script-first short asset, route it to `short-script-lane` instead of drafting a short-lane brief here.
3. Do not claim translation is complete until the required Markdown and JSON files both exist.
4. If the input lacks evidence for a claim, keep it out of the brief instead of inferring it.
5. Translation decides meaning only. Visual style, motion rules, and brand expression belong to later layers.

### Lane Routing Rules

- Route to the heavy lane when the work needs a reusable case-wide narrative brief, multi-scene proof, or a later `storyboard -> copy -> implementation` chain.
- Route to `short-script-lane` when the work is a `6-10s` asset that starts from a micro-concept and must be approved through `script -> plan -> materials` before code.
- If the request is ambiguous, resolve it by checking the available frozen inputs first. Only escalate to the user if the lane cannot be inferred safely from files and scope.

### Artifact-First Output Rules

- Heavy lane source of truth: `${PROJECT_DIR}/output/<case-slug>/01-translation/core-brief.json`
- Markdown companions must explain the reasoning in human-readable form, but the JSON contract is the downstream authority.

---

## Resource Manifest

### References

| Resource | Path | Purpose |
|----------|------|---------|
| intake contract | `${PROJECT_DIR}/skills/shared/intake-contract.md` | Frozen input expectations |
| output contract | `${PROJECT_DIR}/skills/shared/output-contract.md` | Heavy and short lane path contracts |
| short script lane | `${PROJECT_DIR}/skills/short-script-lane/SKILL.md` | Canonical short-asset workflow |

---

## Workflow

### Step 1: Verify Frozen Inputs And Route Lane

**GATE**: The request points to a case slug, and `${PROJECT_DIR}/output/<case-slug>/00-input/product-context.md` exists.

**EXECUTION**:

1. Read the frozen `product-context.md`.
2. Check whether the work is backed by `${PROJECT_DIR}/output/<case-slug>/00-input/case-study.md`.
3. If the work is a script-first short asset, route it to `${PROJECT_DIR}/skills/short-script-lane/SKILL.md` and stop this skill.
4. Otherwise continue with the heavy lane.
5. Determine the exact output paths before drafting any content.

**CHECKPOINT**:

```markdown
## Step 1 Complete
- [x] Frozen product context verified
- [x] Heavy lane confirmed or short-script-lane redirect decided
- [x] Heavy-lane output targets identified when applicable
- [ ] Next: auto-proceed to Step 2
```

---

### Step 2: Heavy-Lane Translation

**GATE**: Step 1 complete; `${PROJECT_DIR}/output/<case-slug>/00-input/case-study.md` exists; the work was not routed to `short-script-lane`.

**EXECUTION**:

1. Read the frozen `case-study.md`.
2. Extract only evidenced product meaning and write:
   - `${PROJECT_DIR}/output/<case-slug>/01-translation/core-brief.md`
   - `${PROJECT_DIR}/output/<case-slug>/01-translation/core-brief.json`
3. Ensure the JSON contract contains:
   - `why`
   - `how`
   - `what`
   - `highlights`
   - `audience`
   - `nonGoals`

**CHECKPOINT**:

```markdown
## Step 2 Complete
- [x] `core-brief.md` written
- [x] `core-brief.json` written
- [x] Heavy-lane required fields verified
- [ ] Next: auto-proceed to Step 3
```

---

### Step 3: Contract Validation

**GATE**: Step 2 completed and `${PROJECT_DIR}/output/<case-slug>/01-translation/core-brief.json` exists.

**EXECUTION**:

1. Re-read the written JSON contract.
2. Remove any claim that is not anchored in frozen inputs.
3. Confirm the brief stays in the meaning layer and does not leak visual style decisions.
4. Confirm the output is reusable by downstream layers rather than written as one-off prose.

**CHECKPOINT**:

```markdown
## Step 3 Complete - Translation ready
- [x] Heavy-lane JSON contract validated against frozen inputs
- [x] Meaning-only scope preserved
- [x] Downstream-ready heavy-lane brief exists
```
