# Lucius Brand Application Rules

These are the implementation-facing rules derived from the official Lucius brand guideline.

## 1. Brand Tone

- Every Lucius-facing artifact should feel intelligent, collaborative, and quietly confident.
- Lucius should read as a teammate in the workflow, not as a detached machine floating above it.
- Avoid visual behavior that feels loud, flashy, theatrical, or self-congratulatory.

## 2. Logo Rules

### 2.1 What the logo means

- The mark represents an abstract human silhouette.
- The continuous shape should preserve the feeling of presence, collaboration, and approachability.
- The subtle @-symbol echo reinforces Lucius as a tagged-in teammate inside a workflow.

### 2.2 Approved logo use

- Use only approved color variants from `lucius-brand-tokens.json`.
- Select the variant with the strongest contrast against the actual background.
- On motion-driven or energetic brand surfaces, prefer the approved white-on-violet variation instead of inventing a new highlight treatment.
- On lighter editorial or ambient layouts, use black-on-light-purple rather than reducing contrast on a white or ivory field.

### 2.3 Logo clear space

- Maintain minimum clear space on all sides equal to the height of the logo mark.
- Do not allow text, illustrations, UI chrome, or decorative shapes to intrude into that clear space.
- When placing the logo inside navigation, panels, cards, or stage frames, clear space still applies.

### 2.4 Forbidden logo treatment

- No shadows.
- No outlines or added strokes.
- No stretching, skewing, or compression.
- No low-resolution exports.
- No wordmark font substitution inside the locked logo.
- No low-contrast placement.

## 3. Color Rules

### 3.1 Core color system

- `Lucius Purple #5538C7` is the primary brand anchor.
- `Warm Ivory #E1DAC0` is the primary warm neutral field.
- `Lavender Mist #BAB2FF` and `Orchid Bloom #B268D8` are expressive supporting colors.
- `Deep Moss #1B4038` is the primary dark supporting field.
- `Cobalt Pulse #504DDC` is a secondary cool-tech accent and should remain subordinate to Lucius Purple.

### 3.2 Palette roles

- Use Lucius Purple for primary brand emphasis and unmistakable Lucius moments.
- Use Warm Ivory for calm, premium, human-centered fields and large grounding surfaces.
- Use Orchid Bloom and Lavender Mist to add warmth, softness, or expressive contrast.
- Use Deep Moss when a darker supporting environment is needed without leaving the Lucius family.
- Do not turn every surface purple; the palette is designed to balance clarity with warmth.

### 3.3 Marketing palette

- For marketing-facing work, the default primary palette is:
  - Lucius Purple
  - Warm Ivory
  - Orchid Bloom
  - Lavender Mist
- Deep Moss and Cobalt Pulse should be used as supporting accents, not as replacements for the primary palette.

### 3.4 Functional area defaults

Use these mappings as repository defaults unless a stronger local system is explicitly required:

- Customer Support -> Lucius Purple
- Community Management -> Orchid Bloom
- Sales and Lead Qualification -> Lavender Mist
- Internal Operations -> Deep Moss

These defaults are derived from the guideline's "Color in use" examples and should be treated as the preferred semantic mapping in product demos and case-study scenes.

### 3.5 Color discipline

- Keep strong contrast between text and background.
- Do not place same-family colors on top of each other when contrast drops too far.
- Do not introduce off-palette accent colors unless an explicit exception is documented.
- If a scene is information-dense, reduce the number of active accent hues instead of increasing them.

## 4. Typography Rules

### 4.1 SF Pro

- SF Pro is the default typeface for interfaces, labels, system copy, explanatory copy, and functional information.
- Use its weight range to build hierarchy before adding another font.
- When a scene must feel precise, operational, or product-native, SF Pro should dominate.

### 4.2 Recoleta

- Recoleta is reserved for headlines, brand moments, and key messaging.
- Use it to inject warmth and personality, not to carry dense information.
- Do not use Recoleta for:
  - small labels
  - UI controls
  - dense body copy
  - tabular or system-like content

### 4.3 Typeface pairing

- SF Pro is the structural system.
- Recoleta is the contrast layer.
- In one scene, Recoleta should usually appear in one focal block or one dominant message, not across every text element.
- If the scene already contains dense UI or multiple information groups, keep Recoleta use minimal.

## 5. Visual Language Rules

### 5.1 Form and shape

- Favor simplified geometric forms.
- Favor soft rounded edges over sharp, aggressive geometry.
- Maintain consistent stroke weights across icon families and line-based graphics.
- Prefer modular compositions that can scale cleanly from small UI to larger promotional surfaces.

### 5.2 Iconography

- Icons should be built from clean shapes and clear silhouettes.
- Icon sets should feel coherent in corner radius, stroke rhythm, and interior spacing.
- Avoid overly detailed, skeuomorphic, or noisy icons that break the simplified Lucius system.

### 5.3 Graphic treatments

- Halftone photography is an approved Lucius graphic treatment.
- The halftone treatment should bridge human imagery with digital abstraction.
- Use dotted or structured matrices to reference data, signal, and system logic.
- Background halftone grids should create depth and texture without becoming technically loud or visually dominant.

### 5.4 Halftone discipline

- Use halftone graphics to support human warmth plus computational structure.
- Do not stack multiple dense textures on top of each other.
- Do not combine halftone fields with unrelated visual gimmicks that make the system feel noisy.
- If text must remain the first-read element, the halftone texture should stay secondary.

## 6. Repository-Specific Derived Rules For Motion And Video

These rules are derived from the official brand tone and visual system so the guideline becomes directly usable for this repo's motion work.

### 6.1 Scene tone

- Motion should preserve the "quietly confident" tone.
- Prefer calm, deliberate, readable transitions over flashy spectacle.
- Do not use exaggerated AI magic, neon beams, or science-fiction glow language as a stand-in for product intelligence.

### 6.2 Scene composition

- Build one obvious focal path per scene.
- If a scene contains UI plus editorial messaging, SF Pro should structure the UI while Recoleta can own the main brand statement.
- Warm Ivory is the safest default grounding field for premium, calm compositions.

### 6.3 Brand moments

- Use the Lucius logo or wordmark only when the scene benefits from a clear brand anchor.
- When the logo appears in motion, preserve legibility and clear space throughout the movement, not just at the hold state.
- Recoleta headline moments should feel intentional and singular.

### 6.4 Functional storytelling

- When a video scene represents functional product areas, start from the functional color defaults before inventing new color assignments.
- If a scene spans multiple functions, one function may own the dominant surface while the others appear as secondary accents.

## 7. Conflict Resolution

- If a local design decision looks visually appealing but violates the brand personality, remove it.
- If a scene needs more contrast, solve it first with approved palette choices and cleaner hierarchy, not with off-brand effects.
- If a layout needs more warmth, solve it first with typography role, Warm Ivory, or halftone texture before inventing a new stylistic system.
