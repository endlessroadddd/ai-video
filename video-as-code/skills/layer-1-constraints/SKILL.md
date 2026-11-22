---
name: layer-1-constraints
description: >
  Converts design guidance into enforceable style constraints for the active case.
  Use when the work needs `style-constraints.md/json`, when the user asks to turn
  guidelines into implementation-facing rules, or when storyboard / beatboard work
  needs a strict visual baseline.
---

# Layer 1 Constraints

> Turn design guidance into enforceable style constraints that later layers can actually check.

**Core Pipeline**: `Verify constraint sources -> Load design intent -> Translate into rule families -> Write constraints -> Validate enforceability`

---

## Mandatory Rules

### Serial Execution & Gate Discipline

1. Do not write `style-constraints.*` until the design guideline and a meaning source are both verified.
2. Every rule written here must be enforceable later by storyboard review, beat review, or implementation QA.
3. Explicit user-provided guideline rules always override inferred optimizations.
4. Constraints may sharpen the baseline, but must not rewrite the brand, tone, or visual family.
5. Do not mix operational product claims into this layer. This layer governs look, motion, hierarchy, and fidelity.

### Source Precedence

1. `${PROJECT_DIR}/output/<case-slug>/00-input/design-guideline.md`
2. `${PROJECT_DIR}/rules/design/*.md` and brand tokens already stored in the repo
3. Lane-specific meaning source:
   - Heavy lane: `${PROJECT_DIR}/output/<case-slug>/01-translation/core-brief.json`
   - Script-first short asset case: `${PROJECT_DIR}/output/<case-slug>/00-input/product-context.md` plus the approved `01-script/script-outline.json` when available

### Artifact-First Output Rules

- Source of truth: `${PROJECT_DIR}/output/<case-slug>/02-constraints/style-constraints.json`
- Human-readable companion: `${PROJECT_DIR}/output/<case-slug>/02-constraints/style-constraints.md`
- Do not say constraints are complete until both files exist and the JSON contains every required family.

---

## Resource Manifest

### References

| Resource | Path | Purpose |
|----------|------|---------|
| intake contract | `${PROJECT_DIR}/skills/shared/intake-contract.md` | Frozen input expectations |
| Lucius brand guideline | `${PROJECT_DIR}/rules/design/lucius-brand-guideline.md` | Brand-level baseline |
| Lucius application rules | `${PROJECT_DIR}/rules/design/lucius-brand-application-rules.md` | Repo-specific application guidance |
| Lucius brand tokens | `${PROJECT_DIR}/rules/design/lucius-brand-tokens.json` | Machine-readable color / type tokens |

---

## Workflow

### Step 1: Verify Constraint Sources

**GATE**: `${PROJECT_DIR}/output/<case-slug>/00-input/design-guideline.md` exists, and at least one meaning source exists for the case.

**EXECUTION**:

1. Read the frozen `design-guideline.md`.
2. Check for the best available meaning source in priority order:
   - `01-translation/core-brief.json`
   - approved short asset `01-script/script-outline.json`
   - frozen `00-input/product-context.md` as a fallback baseline only
3. Record which source will anchor the constraints.

**CHECKPOINT**:

```markdown
## Step 1 Complete
- [x] `design-guideline.md` verified
- [x] Meaning source selected for this case
- [x] Constraint output paths identified
- [ ] Next: auto-proceed to Step 2
```

---

### Step 2: Translate Guideline Into Rule Families

**GATE**: Step 1 complete; design guideline and meaning source are loaded.

**EXECUTION**:

1. Convert the guideline into enforceable rule families:
   - `hardConstraints`
   - `allowedOptimizations`
   - `prohibitedDeviations`
   - `layoutRules`
   - `motionRules`
   - `typeRules`
   - `colorRules`
2. Pull in repo-level brand rules only where they clarify or harden the user's intent.
3. Reject optimizations that would visibly change the brand family instead of refining it.

**CHECKPOINT**:

```markdown
## Step 2 Complete
- [x] Constraint families drafted
- [x] Brand-level rules reconciled with case guideline
- [ ] Next: auto-proceed to Step 3
```

---

### Step 3: Write Constraint Outputs

**GATE**: Step 2 complete; all required rule families are drafted.

**EXECUTION**:

1. Write `${PROJECT_DIR}/output/<case-slug>/02-constraints/style-constraints.md`.
2. Write `${PROJECT_DIR}/output/<case-slug>/02-constraints/style-constraints.json`.
3. Ensure the JSON includes every required family and uses concrete, reviewable language.

**CHECKPOINT**:

```markdown
## Step 3 Complete
- [x] `style-constraints.md` written
- [x] `style-constraints.json` written
- [x] Required JSON families present
- [ ] Next: auto-proceed to Step 4
```

---

### Step 4: Validate Enforceability

**GATE**: Step 3 complete; both constraint files exist.

**EXECUTION**:

1. Re-read the JSON and ask whether each rule can be checked later by storyboard review, beat review, or QA.
2. Remove vague aesthetic language that cannot be enforced.
3. Confirm the rule set preserves the brand baseline while leaving only minimal, explicit room for optimization.

**CHECKPOINT**:

```markdown
## Step 4 Complete - Constraints ready
- [x] Constraint rules are enforceable downstream
- [x] Brand family preserved
- [x] `style-constraints.*` ready for heavy and short lane use
```
