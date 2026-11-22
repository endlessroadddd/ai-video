# Lucius — DESIGN.md

> Agent-friendly design system for the Lucius landing site, written in the [Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format/).
>
> **Authoritative sources**
> 1. **Brand canon** — [`docs/brand/Lucius Brand Guideline.pdf`](docs/brand/Lucius%20Brand%20Guideline.pdf) (v1.1) — names, hex values, logo rules, typographic intent.
> 2. **Code canon** — [`src/app/globals.css`](src/app/globals.css) `@theme inline` block — exact Tailwind v4 tokens currently wired up. Components live under [`src/components/`](src/components/).
>
> When in doubt: brand wins for *naming and intent*; code wins for *implementation values*. Any new color, font, or pattern must be added to **both** the brand guideline and `globals.css` before being used.

---

## 0. How to Use This Doc

This document is an **empirical snapshot** of the live Lucius landing site, paired with the brand canon. Every class string in §4 is grepped from a real `src/components/**/*.tsx` file — not aspirational. When brand intent conflicts with live code, the live code is canonical unless a section explicitly says otherwise.

**If you are a human designer:** read §1 → §2 → §3 → §7. Skim §4 for the component you are touching.

**If you are an LLM building UI:** start with §9 (Agent Prompt Guide) → §2.1 + §9.1 (color cheat sheet) → §3 (typography) → §4 (match the nearest existing component before inventing a new one). Do not introduce a class or hex that isn't in this doc; propose it instead.

**If the code and this doc disagree:** the code is right. File a note, but ship what the code says, then update the doc.

---

## 1. Visual Theme & Atmosphere

**Mood — "AI that works like a teammate."**
Lucius is intelligent, collaborative, and quietly confident. Not a tool — a partner. The brand sits at the intersection of *system precision* (clean geometry, sans-serif clarity, structured grids) and *human warmth* (soft serif accents, warm ivory neutrals, halftone people imagery).

**Density**
Airy and generous. Hero sections breathe. Type runs large. Copy is short. Whitespace is a first-class element, not leftover space.

**Aesthetic philosophy**
- **System ↔ Human**: every screen pairs a sans-serif structural voice (SF Pro) with a serif emotional accent (Recoleta) — usually a single highlighted word in the hero.
- **Digital ↔ Tactile**: photographic imagery is always treated as a halftone dot matrix, bridging human subjects with the language of data, signal, and computation.
- **Confident, never loud**: bold purples and warm ivories are anchored by deep moss and ivory neutrals. Saturation is reserved for moments that matter (CTAs, hero accents, brand callouts).
- **Quietly opinionated**: rounded corners, soft shadows, no hard edges, no harsh drop shadows.

**Voice & Tone**
The visual voice above has a text-voice companion. Lucius's *voice* is constant across every surface; its *tone* shifts with context. Copy in `messages/*.json`, marketing sections, error states, and docs should all comply.

- **Voice is constant.** Lucius always sounds like a teammate: plainspoken, genuine, quietly confident, dry rather than cheerful. This never shifts — the register does.
- **Tone shifts with context.** Same voice, three registers:
  - *Celebration / activation surfaces* — hero, primary CTA, success toasts, onboarding wins. Warmest register; a wink is allowed, never forced.
  - *Instructional surfaces* — features, how-it-works, pricing, docs, blog. Neutral teammate register; concrete and metric-forward (70% auto-resolution, <2 min response, not "blazingly fast").
  - *Error / failure surfaces* — form errors, empty states, escalation screens, rate limits. Most restrained register; never glib, never apologetic theater, always offers the next step.
- **Never loud.** No exclamation marks, no "Amazing!", no salesy superlatives. Humor surfaces only when it arises naturally from the content. Mirrors the visual "Confident, never loud" rule above.
- **Concrete over abstract.** Prefer the numbers the growth narrative already commits to over adjectives. "Resolves 70% of questions without escalation" beats "incredibly capable."
- **Translator, not gatekeeper.** The reader is a community-ops lead, not an ML engineer. Demystify AI/automation jargon; never talk down. If a term needs a glossary, the copy is wrong.

---

## 2. Color Palette & Roles

### 2.1 Brand palette (canonical, from Brand Guideline pp. 7–8)

| Brand name | Hex | RGB | CSS token | Tailwind class | Role |
|---|---|---|---|---|---|
| **Lucius Purple** | `#5538C7` | 85, 56, 199 | `--color-primary` | `bg-primary` / `text-primary` | Primary brand color. Hero CTAs, links, brand moments, primary surfaces. |
| **Lavender Mist** | `#BAB2FF` | 186, 178, 255 | `--color-purple-light` | `bg-purple-light` | Soft accent surfaces, role tiles (Sales/Lead). |
| **Orchid Bloom** | `#B268D8` | 178, 104, 216 | `--color-purple-pink` | `bg-purple-pink` | Vibrant accent. Community/marketing moments. |
| **Deep Moss** | `#1B4038` | 27, 64, 56 | `--color-deep-moss` / `--color-dark-green` | `bg-deep-moss` / `bg-dark-green` | Grounding contrast surface. Internal Ops, testimonial cards, feature highlights. |
| **Cobalt Pulse** | `#504DDC` | 80, 77, 220 | `--color-cobalt-pulse` | `bg-cobalt-pulse` | Energetic primary alternate. Motion, badges, dynamic accents. |
| **Warm Ivory** | `#E1DAC0` | 225, 218, 192 | `--color-beige` | `bg-beige` | Warm neutral foundation. Section backgrounds, brand canvas. |

### 2.2 Primary / purple extended family (from `globals.css`)

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `--color-primary` | `#5538C7` | `bg-primary` | Canonical Lucius Purple. |
| `--color-primary-hover` | `#4A2FB5` | `bg-primary-hover` | Hover state for primary CTAs. |
| `--color-primary-alt` | `#5925DC` | `bg-primary-alt` | Alternate purple for non-CTA accents. |
| `--color-primary-light` | `#977DF5` | `bg-primary-light` | Soft accents on primary surfaces (stats, mini-card numbers). |
| `--color-primary-medium` | `#755ADE` | `bg-primary-medium` | Mid-tier purple for badges and inline highlights. |
| `--color-primary-deep` | `#3D2A9B` | `bg-primary-deep` | Dark purple accent. |
| `--color-primary-dark` | `#3D28A3` | `bg-primary-dark` | Depth surface on purple backgrounds. |
| `--color-primary-nav` | `#5D5A88` | `text-primary-nav` | Muted purple for navigation secondary text. |
| `--color-purple-tag` | `#6D318C` | `text-purple-tag` | Pill/tag text on `purple-faint`. |
| `--color-purple-accent` | `#B14DC1` | `bg-purple-accent` | Vibrant alt accent. |
| `--color-purple-dark` | `#651273` | `bg-purple-dark` | Deep magenta-purple accent. |
| `--color-purple-pink` | `#B268D8` | `bg-purple-pink` | Orchid Bloom — integration icon circles, community. |
| `--color-purple-pale` | `#CFC7EF` | `bg-purple-pale` | Pale purple for toggle-off states. |
| `--color-purple-light` | `#BAB2FF` | `bg-purple-light` | Lavender Mist — soft accents, progress bars. |
| `--color-purple-faint` | `#F1F0FF` | `bg-purple-faint` | Lightest purple tint — icon containers, tags. |
| `--color-cobalt-pulse` | `#504DDC` | `bg-cobalt-pulse` | Energetic accent. |

**Role-card accents** (Brand Guideline p. 9, used in [`Scenarios.tsx`](src/components/sections/Scenarios.tsx)):

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `--color-orchid-bloom` | `#C9A8E0` | `bg-orchid-bloom` | Orchid Bloom (role tile variant — Customer Support). |
| `--color-lavender-mist` | `#D4CFFE` | `bg-lavender-mist` | Lavender Mist (role tile variant — Community). |
| `--color-deep-moss` | `#1B4038` | `bg-deep-moss` | Deep Moss (role tile — Internal Ops, also testimonial cards). |

### 2.3 Surface neutrals (warm ivory family)

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `--color-background` | `#FFFFFF` | `bg-white` | Default page surface. |
| `--color-beige` | `#E1DAC0` | `bg-beige` | Warm Ivory — brand-grounded sections, navbar surface. |
| `--color-beige-warm` | `#EBE4CA` | `bg-beige-warm` | Slightly lighter ivory band — hero outer wrapper. |
| `--color-beige-light` | `#FDFAF1` | `bg-beige-light` | Lightest cream — hero / soft sections. |
| `--color-beige-muted` | `#F6F5F2` | `bg-beige-muted` | Subtle warm panel — GetStarted step cards. |
| `--color-beige-sand` | `#D0C8A9` | `bg-beige-sand` | Deeper sand accent. |
| `--color-beige-tan` | `#D6CEB4` | `bg-beige-tan` | Warm divider / chip bg. |
| `--color-beige-skeleton` | `#EBE8D7` | `bg-beige-skeleton` | Loading skeleton fill on warm sections. |
| `--color-cream` | `#E5E5E1` | `bg-cream` | Cool cream variant. |
| `--color-olive-light` | `#F6F6EF` | `bg-olive-light` | Olive-tinted neutral — badges, Pricing free/pro cards. |

**Surface hierarchy (light → dark accent):**
`white` → `beige-light` → `beige-muted` → `olive-light` → `beige-warm` → `beige` (Warm Ivory) → `primary` (Lucius Purple) → `deep-moss` → `footer` (`#131007`).

### 2.4 Text colors

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `--color-text-primary` / `--color-foreground` | `#181D27` | `text-text-primary` / `text-foreground` | Default body and headings. |
| `--color-text-heading` | `#252B37` | `text-text-heading` | Section headings (Hero, Features, FAQ expanded question). |
| `--color-text-dark` | `#1E2C33` | `text-text-dark` | Dark heading variant used in Pricing / Scenarios / Testimonials. |
| `--color-text-secondary` | `#535861` | `text-text-secondary` | Supporting copy, FAQ answers. |
| `--color-text-muted` | `#7F8C96` | `text-text-muted` | Captions, metadata, Pricing bottom note. |
| `--color-text-medium` | `#414651` | `text-text-medium` | Mid-emphasis body. |
| `--color-text-charcoal` | `#2C2C27` | `text-text-charcoal` | Body on warm ivory. |
| `--color-text-olive` | `#4A4A42` | `text-text-olive` | Body on olive surfaces. |
| `--color-text-olive-dark` | `#4F4726` | `text-text-olive-dark` | Badge pill text (`bg-olive-light` badge). |
| `--color-text-blue-gray` | `#3B5266` | `text-text-blue-gray` | Section subtitles (FAQ, Pricing, Scenarios). |
| `--color-text-deep` | `#39373C` | `text-text-deep` | Deep neutral body alternate. |
| `--color-text-warm` | `#8A887D` | `text-text-warm` | Warm muted meta text. |
| `--color-text-gray` | `#9CA3AF` | `text-text-gray` | Light gray meta (card captions in Hero mini-UI). |
| `--color-text-badge` | `#80725E` | `text-text-badge` | Pill/badge text on beige. |
| `--color-text-footer` | `#B5B5B5` | `text-text-footer` | Footer body copy. |
| `--color-text-footer-link` | `#999999` | `text-text-footer-link` | Footer links (→ hover white). |

### 2.5 Borders

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `--color-border` | `#D7D3D0` | `border-border` | Default divider. |
| `--color-border-light` | `#E5E3DF` | `border-border-light` | Subtle hairline, card outlines on white. |
| `--color-border-beige` | `#E5E2DC` | `border-border-beige` | Warm-section dividers, GetStarted step cards. |
| `--color-border-purple` | `#D4D2E3` | `border-border-purple` | Card borders on purple-adjacent surfaces. |
| `--color-border-green` | `#43574C` | `border-border-green` | Borders on deep-moss surfaces. |

### 2.6 Dark surfaces, icons, status

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `--color-footer` | `#131007` | `bg-footer` | Footer bg, TopBanner bg, ChatWidget panel header, primary dark CTA bg. |
| `--color-footer-hover` | `#2A2820` | `bg-footer-hover` / `border-footer-hover` | Dark-CTA hover, footer divider. |
| `--color-icon-dark` | `#323F46` | `fill-icon-dark` | Footer social icon fills. |
| `--color-icon-gray` | `#7B7B7B` | `fill-icon-gray` | Neutral icon fills. |
| `--color-success` | `#22C55E` | `bg-success` | Success states, online dots. |
| `--color-danger` | `#EF4444` | `bg-danger` | Errors, destructive actions. |
| `--color-green-cta` | `#2D5040` | `bg-green-cta` | FinalCTA card background. |

### 2.7 Brand integration colors

Reserved for partner/integration logos and product chips only — never for layout decoration.

| Token | Hex | Brand |
|---|---|---|
| `--color-discord` | `#5865F2` | Discord |
| `--color-telegram` | `#26A5E4` | Telegram |
| `--color-notion` | `#3370FF` | Notion |
| `--color-notion-dark` | `#2E1883` | Notion (dark — also used for step-tag pills in GetStarted) |

### 2.8 Functional color cues (Brand Guideline p. 9)

When colors are used to *signal context* (e.g., role cards, "what Lucius does for…" sections), follow these mappings:

| Functional area | Color | Token |
|---|---|---|
| **Customer Support** | Lucius Purple `#5538C7` | `--color-primary` |
| **AI Support tile variant** | Orchid Bloom `#C9A8E0` | `--color-orchid-bloom` |
| **Community Management** | Lavender Mist `#D4CFFE` | `--color-lavender-mist` |
| **Sales & Lead Qualification** | Lavender Mist `#BAB2FF` | `--color-purple-light` |
| **Internal Operations** | Deep Moss `#1B4038` | `--color-deep-moss` |

### 2.9 Logo color combinations (Brand Guideline p. 3)

Only these four logo-on-background combinations are approved:

| Background | Logo color | Use case |
|---|---|---|
| Lucius Purple (`#5538C7`) | White | Core brand moments, hero, campaigns, high-visibility marketing. |
| Lavender Mist (`#BAB2FF`) | Black | Lighter editorial layouts, soft expression. |
| Orchid Bloom (`#B268D8`) | White | Dynamic, motion-driven, promotional. |
| Deep Moss (`#1B4038`) | White | Feature highlights, product sections, supporting brand environments. |

### 2.10 Forbidden combinations

Contrast minimum: **WCAG AA for body (4.5:1)**, **AAA for CTAs (7:1)**. The combinations below fail that bar or break brand hierarchy — do not ship them:

- 🚫 **Lucius Purple text on Cobalt Pulse** — hues too close, body becomes unreadable.
- 🚫 **Orchid Bloom on Lavender Mist** — no luminance separation.
- 🚫 **`text-text-muted` (`#7F8C96`) on `bg-beige-warm`** — fails AA.
- 🚫 **Recoleta serif headings on Deep Moss without at least 80% white** — serif terminals disappear.
- 🚫 **`text-primary` (`#5538C7`) on `bg-deep-moss`** — conflicts; use `text-purple-light` or white instead.
- 🚫 **Any primary-family color on `bg-primary`** — flattens the hierarchy; use white text.
- 🚫 **`bg-primary` buttons nested inside `bg-deep-moss`** — double-accent without breathing room; swap to `bg-white text-footer`.

When in doubt, drop to `text-white` or `text-footer` depending on surface.

---

## 3. Typography Rules

### 3.1 Type families

| Role | Family | Loaded as | Variable | When to use |
|---|---|---|---|---|
| **Primary** | **SF Pro** (Display / Text) | System stack | `--font-sf-pro` / `--font-sans` | All UI, body, navigation, most headings, buttons. The default. |
| **Secondary** | **Recoleta** | `next/font/local` from `public/fonts/recoleta/` | `--font-serif` | Accent words in hero/section headlines, brand moments, the wordmark. **Sparingly.** |
| **Mono** | **Fira Code** | `next/font/google` | `--font-fira-code` | Code samples, terminal/log UI, inline code chips. (No longer used for section eyebrows — see §4.2.) |

Loaded in [`src/lib/fonts.ts`](src/lib/fonts.ts). Recoleta ships in 400 / 600 / 700. Fira Code in 400 / 500. SF Pro inherits all weights from the system.

> **Recoleta is not auto-applied.** Headings default to SF Pro. To invoke Recoleta you must explicitly add `font-serif` (or `.font-serif`). Do not assume `<h1>` or `<h2>` renders as serif — it does not. The standard pattern is a two-span headline: `<span class="font-heading">…</span><span class="font-serif">…</span>` (see [`FAQ.tsx:18-25`](src/components/sections/FAQ.tsx), [`Testimonials.tsx:141-144`](src/components/sections/Testimonials.tsx)).

### 3.2 Weights available

- **SF Pro** — Light (300), Regular (400), Medium (500), Semibold (600), Bold (700).
- **Recoleta** — Regular (400), Semibold (600), Bold (700).
- **Fira Code** — Regular (400), Medium (500).

### 3.3 Hierarchy (empirical — verified against live components)

| Level | Family | Size (desktop) | Size (mobile) | Weight | Line-height | Tracking | Tailwind |
|---|---|---|---|---|---|---|---|
| **Hero display** | SF Pro + Recoleta accent | **80px** | **56px** | 400 (inherits) | `1.05` | `tracking-tight` | `text-[56px] lg:text-[80px] leading-[1.05] tracking-tight` — [`Hero.tsx:268`](src/components/sections/Hero.tsx) |
| **FinalCTA headline** | SF Pro light + Recoleta | 64px | 40–48px | 300 / 400 | `1.03` | — | `text-[64px] leading-[1.03]` — [`FinalCTA.tsx:47`](src/components/sections/FinalCTA.tsx) |
| **Section heading (H2)** | SF Pro + Recoleta | 48px | 40px | 400 | `1.33` (desktop) / `1.2` (mobile) | — | `text-[40px] md:text-[48px] leading-[1.2] md:leading-[1.33]` |
| **Narrative-anchor H2** | SF Pro + Recoleta | **64px** | 40px | 400 | `1.05` (desktop) / `1.1` (mobile) | `tracking-tight` | `text-[40px] md:text-[64px] leading-[1.1] md:leading-[1.05] tracking-tight` — used by `/landing-a` narrative sections only, see §12.4.1 |
| **Sub-heading (H3)** | SF Pro | 24–26px | 22px | 600 | 1.2–1.25 | — | `text-[22px] md:text-[26px] font-serif` (GetStarted) / `text-[24px] font-serif` (Pricing) |
| **Card title** | SF Pro | 20px | 20px | 600 | `tight` | — | `text-[20px] font-semibold leading-tight` (Scenarios, FAQ) |
| **Subtitle / lede** | SF Pro | 20–24px | 18–20px | 400 | 1.33 | — | `text-[20px] md:text-[24px] text-text-blue-gray` |
| **Body** | SF Pro | 17–18px | 16px | 400 | 1.5–1.6 | — | `text-[17px] leading-relaxed` or `text-[18px] leading-[1.6] text-text-medium` |
| **Body small** | SF Pro | 15–16px | 14px | 400 | 1.5 | — | `text-[15px]` / `text-[16px] text-text-secondary` |
| **Footer link / body** | SF Pro | 18px | 16px | 400 | 1.5 | — | `text-[18px] text-text-footer` |
| **Section eyebrow** | **Recoleta italic** | 16px | 15px | 400 | 1 | — | `font-serif italic text-[15px] md:text-[16px] text-text-olive-dark` + 40px rule (see §4.2) |
| **Feature card title (H4)** | **Recoleta** | 22px | 22px | 400 | `1.2` | — | `font-serif text-[22px] text-text-heading` — [`Features.tsx`](src/components/sections/Features.tsx) |
| **Caption / label** | SF Pro | 11–13px | 11–12px | 500–600 | 1 | `tracking-wide` or `tracking-[0.08em]` uppercase | `text-[11px] font-semibold uppercase tracking-wide` (HowItWorks labels) |
| **Code** | Fira Code | 14–15px | 13px | 400–500 | 1.5 | — | `font-code text-sm` |

> **Hero display size = 80px** on desktop (Hero.tsx:268). Older copies of this doc said 72px; that was a misread — the true value is `text-[80px]`.

### 3.4 The pairing rule (Brand Guideline p. 13)

> SF Pro provides structure. Recoleta introduces warmth.

In a hero or section headline, set the bulk of the line in **SF Pro** and isolate the single most *human* word in **Recoleta**, optionally tinted Lucius Purple:

> **AI that works like a *teammate*.**
> *Lucius learns your community, handles real work, and operates alongside your team 24/7.*

```tsx
<h1 className="text-[56px] lg:text-[80px] leading-[1.05] tracking-tight text-text-heading">
  <span className="font-heading">AI that works like a{" "}</span>
  <span className="font-serif text-primary">teammate</span>
</h1>
```

**Never** set body copy in Recoleta. **Never** mix more than one serif accent per headline. **Never** use Recoleta in nav, buttons, or labels. The one exception: the oversized footer watermark (`font-serif text-[25vw] text-beige-warm` in [`Footer.tsx:107`](src/components/layout/Footer.tsx)) — a deliberate brand signature, not a pattern to duplicate.

**Outer glow on serif theme-color accents (canonical, added 2026-04-15; size-gated 2026-04-15).** Purple serif accents inside `<h1>` / `<h2>` / `<h3>` receive a three-layer halo via `text-shadow` in `globals.css`: `0 0 1px / 6px / 14px` at alpha `0.55 / 0.32 / 0.16` on Lucius Purple `#5538C7`. Selector: `:is(h1, h2, h3) .font-serif.text-primary, :is(h1, h2, h3).font-serif.text-primary`.

The heading gate is the size threshold: **anything smaller than the ScenarioFilms H3 — "learns on its own" / "Stop guessing" at 32px mobile / 40px desktop — does not glow.** Small serif-italic theme lines inside `<p>` (TheShift pillar taglines ~20px, TheProblem role-pain lines ~19px) stay clean so they read as body copy, not as accent moments. Pairs visually with the Hero ASCII ink-bleed halo. If a heading accent should not glow, color it something other than `text-primary`; if a `<p>` accent should glow, lift it to an `<h3>` first rather than overriding the selector.

### 3.5 Helper classes (already defined in `globals.css`)

- `.font-serif` — Recoleta with Georgia/serif fallback.
- `.font-heading` — SF Pro headings (alias of primary sans).
- `.font-dm-sans` — alias of SF Pro used in Navbar / Footer / blog.
- `.font-code` — Fira Code monospace.

---

## 4. Component Stylings

These reflect patterns already implemented under [`src/components/`](src/components/). When building a new component, match these defaults *exactly* before introducing variants — the goal is visual coherence with what already ships.

### 4.1 Buttons (canonical: live Hero pattern)

The live Lucius CTA shape is **`rounded-[40px]` with fixed width `w-[260px]` and fixed height `h-14`**, not a simple `rounded-full`. Hero CTAs use the ivory + footer inversion pair; section / nav CTAs fall back to `rounded-full` with variable padding.

**Hero primary (dark) — default "Book demo" style**
```tsx
<button
  className="inline-flex items-center justify-center gap-6 rounded-[40px] bg-footer w-[260px] h-14 text-[17px] font-medium text-white hover:bg-footer-hover transition-colors"
>
  Book a demo
  <svg className="w-6 h-6" /* arrow */ />
</button>
```
— [`Hero.tsx:286-306`](src/components/sections/Hero.tsx), [`FinalCTA.tsx:64-71`](src/components/sections/FinalCTA.tsx) (same shape, `px-8` instead of fixed width).

**Hero secondary (ivory)**
```tsx
<a
  className="inline-flex items-center justify-center rounded-[40px] bg-white w-[260px] h-14 text-[17px] font-medium text-footer shadow-sm hover:bg-white/80 transition-colors"
>
  See case studies
</a>
```
— [`Hero.tsx:280-285`](src/components/sections/Hero.tsx). Uses `shadow-sm` (the only default subtle shadow).

**Navbar CTA (compact dark pill)** — `h-10` instead of `h-14`
```tsx
<button
  className="inline-flex items-center justify-center rounded-full bg-footer px-6 h-10 text-[15px] font-dm-sans font-normal text-white hover:bg-footer-hover transition-colors"
>
  Book demo
</button>
```
— [`Navbar.tsx:147-153`](src/components/layout/Navbar.tsx).

**Navbar secondary (outline)**
```tsx
<button
  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-black/15 px-5 h-10 text-[15px] font-dm-sans text-black hover:bg-black/5 transition-colors"
>
  Install app
</button>
```
— [`Navbar.tsx:128-146`](src/components/layout/Navbar.tsx).

**Pricing card CTA (full-width pill)**
```tsx
<button
  className="w-full rounded-full h-14 text-[17px] font-medium transition-colors bg-primary text-white hover:opacity-90 inline-flex items-center justify-center"
>
  Contact us
</button>
```
— [`Pricing.tsx:90-96`](src/components/sections/Pricing.tsx). Free/Pro tiers swap `bg-primary text-white` for `bg-beige text-text-dark`.

**Heights**
- Hero / FinalCTA / Pricing card → `h-14` (56px)
- Navbar / ChatWidget launcher (`w-14 h-14 rounded-full`) → `h-10` (40px) or square 56px
- All satisfy the 44×44 touch-target minimum.

**Type weight** — body CTA text is `text-[17px] font-medium` on `h-14` buttons; Navbar compact CTA is `text-[15px] font-normal` (lighter — intentional, to disappear until needed). Never set a CTA label above `font-medium`.

### 4.2 Badges & eyebrows

The canonical Lucius **section eyebrow** is an *editorial* treatment — Recoleta serif italic paired with a thin horizontal rule. It replaces the earlier Fira-Code-on-`bg-olive-light` pill (deprecated in the Editorial Typography System refresh) and appears above every section heading on the marketing surface.

```tsx
<span className="mb-5 inline-flex items-center gap-3 font-serif italic text-[15px] text-text-olive-dark md:text-[16px]">
  <span aria-hidden className="h-px w-10 bg-text-olive-dark/40" />
  {/* badge label */}
</span>
```
— [`Features.tsx`](src/components/sections/Features.tsx), [`Scenarios.tsx`](src/components/sections/Scenarios.tsx), [`HowItWorks.tsx`](src/components/sections/HowItWorks.tsx), [`Pricing.tsx`](src/components/sections/Pricing.tsx), [`Testimonials.tsx`](src/components/sections/Testimonials.tsx), [`FAQ.tsx`](src/components/sections/FAQ.tsx), [`GetStarted.tsx`](src/components/sections/GetStarted.tsx).

**Why this treatment**
- Serif italic carries the "human warmth" half of the *System ↔ Human* principle (§1).
- The thin 40px rule at 40% opacity evokes editorial magazine/newsletter layouts (FT, Mailchimp) without shouting.
- No fill, no pill, no monospace — restraint is the point.

**Alternate badge (solid colored step tag — used in GetStarted steps and HowItWorks)**
```tsx
<span className="inline-block rounded-full bg-primary text-white px-3 py-1 text-[12px] font-medium md:px-4 md:text-[13px]">Step 01</span>
```
Color pairs: `bg-primary text-white`, `bg-notion-dark text-white`, `bg-dark-green text-white` (stepTagColors — [`GetStarted.tsx:20-24`](src/components/sections/GetStarted.tsx)). Step tags are a different job from section eyebrows — keep them as pills, not as editorial rules.

**Do not** reintroduce the legacy `rounded-full bg-olive-light font-code` eyebrow pill. If you see it in a new component, migrate it to the editorial treatment above.

### 4.3 Cards

**Feature card (white on white)**
```tsx
<div className="rounded-2xl bg-white border border-border-light p-8">
  <div className="w-16 h-16 rounded-xl bg-purple-faint flex items-center justify-center mb-6">
    {/* icon */}
  </div>
  <h3 className="text-2xl font-semibold mb-3">Title</h3>
  <p className="text-text-secondary leading-relaxed">Description</p>
</div>
```

**Radius scale (verified in-code)**
- `rounded-xl` (12px) — icon containers, small chips, dropdown menus
- `rounded-2xl` (16px) — standard cards, Pricing cards, GetStarted step cards, Testimonial cards, ChatWidget panel (sm+)
- `rounded-[24px]` or `rounded-3xl` (24px) — Scenarios role tiles, FinalCTA outer card
- `rounded-[40px]` — Hero CTA pills (bespoke, see §4.1)
- `rounded-full` — buttons, badges, avatars, social icons
- `rounded-b-[80px]` — Hero outer wrapper's bottom curve — one-off brand signature

**Padding**
- Standard card → `p-8` (32px)
- Pricing card → `p-10` (40px)
- Compact card → `p-6` or `p-5 pt-[30px]`
- Border: `border border-border-light` on white; borderless on tinted surfaces.

### 4.4 Sections (container + rhythm)

```tsx
<section id="section-id" className="py-24 bg-white">
  <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
    <div className="max-w-[1280px] mx-auto">
      {/* content */}
    </div>
  </div>
</section>
```
- **Outer container**: `mx-auto max-w-[1440px]` with padding ramp `px-4 sm:px-6 md:px-8` (or just `px-8` on sections that don't need the sm ramp — Pricing, FAQ, Scenarios, Footer all use `px-8`).
- **Inner content cap**: a second `max-w-[1280px] mx-auto` wrapper inside the outer container is the dominant pattern (FAQ, Pricing, Testimonials, Stats, GetStarted). The 160px gutter on each side at 1440px is deliberate breathing room.
- **Vertical rhythm**: `py-24` is the default (FAQ, Pricing, Scenarios). Sections that flex mobile use `py-16 md:py-24` (Testimonials, Features, GetStarted). Hero and feature anchors may use `py-32`. FinalCTA uses `py-12` on the outer section because its inner card already has `py-24`.
- **Background rotation per page**: `bg-white` → `bg-beige-light` → `bg-beige/80` → `bg-primary` → `bg-white`. Hit `bg-deep-moss` or `bg-primary` at most **once** per page as a punctuation anchor.
- **Do not** re-declare `scroll-margin-top` per section — it's set globally via `section[id] { scroll-margin-top: 64px; }` (see §8.5).

### 4.5 Inputs

```tsx
<input
  type="email"
  className="h-14 w-full rounded-full border border-border bg-white px-6 text-[17px] placeholder:text-text-muted focus:outline-none focus:border-primary"
/>
```
- Match button height (`h-14`) for inline form layouts.
- Pill shape, border-only focus state — no glow.

### 4.6 Navigation — [`src/components/layout/Navbar.tsx`](src/components/layout/Navbar.tsx)

```tsx
<nav className="sticky top-0 z-50 bg-beige/80 backdrop-blur-md">
  <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-8">
    {/* logo (h-11 w-auto) */}
    {/* md+ link row: text-[16px] text-black font-normal hover:opacity-70 */}
    {/* active link: bg-gray-100 px-4 py-1.5 rounded-full */}
    {/* right: LanguageSwitcher + Install App (outline) + Book demo (bg-footer) */}
  </div>
</nav>
```

**Specifics**
- **Surface**: `bg-beige/80 backdrop-blur-md` — Warm Ivory at 80% with a blur. No bottom border on scroll.
- **Height**: `h-16` (64px). This is why `scroll-margin-top: 64px` exists globally.
- **Container**: `max-w-[1440px] px-4 md:px-8` — note `md:` ramp, not `sm:`.
- **Logo**: horizontal SVG, `h-11 w-auto` (44px).
- **Links**: `text-[16px] text-black font-normal hover:opacity-70`. Active state swaps to `bg-gray-100 px-4 py-1.5 rounded-full` — a local "pill pressed" look, not a color change.
- **CTAs**: `h-10 rounded-full` — Install App is outline (`border border-black/15 bg-transparent`), Book demo is `bg-footer text-white`. Both `text-[15px] font-dm-sans font-normal`.
- **Mobile (<md)**: the nav row hides; a round hamburger (`h-10 w-10 rounded-full border border-black/10`) toggles a full-bleed `bg-beige/95 border-t border-black/10` dropdown menu. Menu items are `rounded-xl px-3 py-2 text-[16px]`.
- **Scroll-spy**: active link is computed by comparing `scrollY` against each section's `offsetTop - 72px` (see `useEffect` in Navbar).

### 4.7 Footer — [`src/components/layout/Footer.tsx`](src/components/layout/Footer.tsx)

```tsx
<footer className="bg-footer text-white overflow-hidden">
  <div className="mx-auto max-w-[1440px] px-8 pt-16 pb-8">
    <div className="max-w-[1200px] mx-auto">
      {/* flex-col md:flex-row — brand col (max-w-[343px]) + 3 link columns */}
    </div>
  </div>
  <div className="mt-4 overflow-hidden">
    <p className="font-serif text-[25vw] leading-none text-beige-warm text-center whitespace-nowrap">
      Lucius
    </p>
  </div>
</footer>
```

**Specifics**
- **Surface**: `bg-footer` (`#131007`), the only true near-black. `overflow-hidden` because of the oversized watermark.
- **Container**: outer `max-w-[1440px] px-8 pt-16 pb-8`, inner `max-w-[1200px]` (narrower than most sections — footer gets tighter horizontal breathing room).
- **Brand column**: `max-w-[343px]`. Heading `text-[24px] font-semibold text-white mb-6`.
- **Social icons**: `h-7 w-7 rounded-full bg-white` wrappers; SVG fills use `fill-icon-dark` (`#323F46`) so the icon appears on the white puck.
- **Link columns**: 3-col grid (`grid-cols-3 gap-12 md:gap-16`). Column title `font-dm-sans font-bold text-white text-[20px] mb-6`. Links `font-dm-sans text-[18px] text-text-footer-link hover:text-white`.
- **Divider**: `mt-16 border-t border-footer-hover pt-8 text-center`. Copyright `font-dm-sans text-[18px] text-text-footer`.
- **Oversized watermark**: full-bleed `font-serif text-[25vw] text-beige-warm` — breaks the container on purpose. Do not clip it, do not scale it down below `25vw`.

### 4.8 FAQ accordion — [`src/components/sections/FAQ.tsx`](src/components/sections/FAQ.tsx)

Two-column layout on `lg`: heading on the left (`lg:w-[367px]`), accordion on the right (`flex-1`).

```tsx
<section id="faq" className="py-24 bg-white">
  <div className="mx-auto max-w-[1440px] px-8">
    <div className="max-w-[1280px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-[367px] flex-shrink-0">
          <h2 className="text-[48px] leading-[1.33] text-text-dark mb-4">
            <span className="font-heading">Frequently </span>
            <span className="font-serif">asked</span>
          </h2>
          <p className="text-[24px] text-text-blue-gray leading-[1.33]">{/* subtitle */}</p>
        </div>
        <div className="flex-1">
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <span className="text-[20px] font-medium text-text-heading pr-4">{item.q}</span>
                {/* 24×24 +/− SVG, stroke 1.5, text-text-heading */}
              </button>
              {open === i && (
                <div className="pb-6 text-[16px] text-text-secondary max-w-[827px]">{item.a}</div>
              )}
              <div className="border-b border-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

- Question style: `text-[20px] font-medium text-text-heading`.
- Answer: `text-[16px] text-text-secondary max-w-[827px]`.
- Divider: `border-b border-gray-200` (literal — currently the only place that uses a raw Tailwind gray. Flag as a token candidate but preserve as-is for now).
- Open/close icon: 24×24 inline SVG, horizontal line for open (`−`), cross for closed (`+`), stroke 1.5.

### 4.9 Pricing card — [`src/components/sections/Pricing.tsx`](src/components/sections/Pricing.tsx)

3-column grid on md+, each card: tier icon (60×60 hand-drawn SVG) → plan name in Recoleta → description → separator → CTA → feature list.

```tsx
<section id="pricing" className="bg-white py-24">
  <div className="mx-auto max-w-[1440px] px-8">
    <div className="max-w-[1280px] mx-auto">
      <div className="mb-12 flex flex-wrap items-start justify-between gap-6">
        <div>
          <h2 className="text-[48px] leading-[1.33] text-text-dark font-serif">Pricing</h2>
          <p className="mt-4 text-[24px] text-text-blue-gray">Subtitle</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            className={`${plan.cardBg} rounded-2xl p-10 flex flex-col`}
            style={{ minHeight: 420 }}
          >
            <PricingIcon />
            <h3 className={`text-[24px] ${plan.textColor} mb-1 font-serif`}>{plan.name}</h3>
            <p className={`text-[16px] ${plan.descColor} mb-6`}>{plan.desc}</p>
            <div className="border-b border-black/10 mb-6" />
            <button className={`w-full rounded-full h-14 text-[17px] font-medium transition-colors mb-6 ${plan.btnBg} ${plan.btnText} hover:opacity-90 inline-flex items-center justify-center`}>
              Contact us
            </button>
            <ul className="space-y-3 flex-1">
              {features.map((f) => (
                <li className="flex items-center gap-3">
                  <svg className="w-[14px] h-[14px] shrink-0 text-primary" /* arrow */ />
                  <span className="text-[16px]">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-[20px] text-text-muted">Bottom note</p>
    </div>
  </div>
</section>
```

**Card variants** (see `plans` array in Pricing.tsx):
- **Free / Pro** (outer cards): `bg-olive-light`, `text-text-heading`, CTA `bg-beige text-text-dark`.
- **Basic** (middle highlight): `bg-beige`, `text-black`, CTA `bg-primary text-white`.
- Only the middle (Basic) card gets a **white glow** under its icon (radial-gradient + drop-shadow). Outer cards use `fill="#E1DAC0"` (ivory) for the hand-drawn tier icons; middle card uses `fill="white"` with glow.
- Features use a right-arrow glyph (`path d="M1 9.5h22M14 1l9 8.5-9 8.5"`), `text-primary`, not a checkmark.

### 4.10 Testimonial card — [`src/components/sections/Testimonials.tsx`](src/components/sections/Testimonials.tsx)

**Deep-moss surface, Recoleta quote, brand logo + name row.** This is the only place on the site where Recoleta is used for a *multi-line body* — and it's kept small (16–18px) to avoid becoming prose-in-serif.

```tsx
<article className="rounded-2xl bg-dark-green p-6 md:p-8">
  <div className="flex items-center gap-3 mb-5">
    <img src="/images/logos/brand.png" className="h-6 w-auto max-w-[100px] object-contain shrink-0 brightness-0 invert" />
    <div className="min-w-0">
      <p className="text-[15px] font-medium text-white leading-tight truncate">Name</p>
      <p className="text-[13px] text-white/60 leading-tight mt-0.5 truncate">Role</p>
    </div>
  </div>
  <p className="font-serif text-[16px] leading-[1.5] text-white/90 md:text-[18px]">
    &ldquo;Quote.&rdquo;
  </p>
  <p className="mt-4 text-[13px] text-white/50">Read case study →</p>
</article>
```

- **Surface**: `bg-dark-green` (Deep Moss `#1B4038`). No border, no shadow.
- **Brand logos**: always `brightness-0 invert` (forces to pure white regardless of source color).
- **Quote**: Recoleta, `text-white/90`, `leading-[1.5]`.
- **Layout**: desktop uses a manual **round-robin masonry** into 2 or 3 columns (`hidden lg:grid grid-cols-3 gap-6` + `md:grid grid-cols-2 gap-6 lg:hidden`). Mobile stacks vertically with a "Load more" button.
- If the testimonial links to a case study, the whole card becomes a `<Link>` with `transition-transform hover:scale-[1.02]`.

### 4.11 Scenario / role card — [`src/components/sections/Scenarios.tsx`](src/components/sections/Scenarios.tsx)

```tsx
<motion.article
  style={{ backgroundColor: "#5538c7" /* or orchid-bloom / lavender-mist / deep-moss */ }}
  className="relative flex flex-col overflow-hidden rounded-[24px] p-5 pt-[30px]"
>
  <div className="mb-6 space-y-2">
    <h3 className={`text-[20px] font-semibold leading-tight ${light ? "text-text-heading" : "text-white"}`}>
      Title
    </h3>
    <p className={`text-[14px] leading-[1.4] ${light ? "text-text-secondary" : "text-white/90"}`}>
      Description
    </p>
  </div>
  <div className="relative mt-auto aspect-[4/3] w-full">
    <Image src="/figma-assets/roles/…" fill className="object-contain object-bottom" />
  </div>
</motion.article>
```

- **Radius**: `rounded-[24px]` (between `rounded-2xl` and `rounded-3xl`; bespoke token — keep as literal).
- **Padding**: `p-5 pt-[30px]`. The extra 10px on top creates a deliberate "title breathes away from the top edge" feel.
- **Grid**: `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2` — note the tight `gap-2` (8px) between tiles, unique to Scenarios.
- **Text color**: driven by `role.light` boolean. Dark surfaces (`primary`, `deep-moss`) → `text-white` + `text-white/90`. Light surfaces (`orchid-bloom`, `lavender-mist`) → `text-text-heading` + `text-text-secondary`.
- **Imagery**: PNG screenshots pinned to the bottom edge with `object-contain object-bottom`.

### 4.12 Top banner — [`src/components/sections/TopBanner.tsx`](src/components/sections/TopBanner.tsx)

```tsx
<div className="bg-footer text-white text-center text-sm py-2.5 px-4 relative">
  <Link href="#pricing" className="hover:underline">{message}</Link>
  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
    {/* 16×16 close X */}
  </button>
</div>
```
- Full-bleed `bg-footer`, compact `py-2.5 px-4`.
- Dismissible via a cookie (`lucius_banner_dismissed`, 365 days). SSR-safe: always renders hidden on the server, reveals after hydration.
- Never put a second banner above the navbar. One announcement strip per page, max.

### 4.13 Chat widget launcher & panel — [`src/components/ChatWidget.tsx`](src/components/ChatWidget.tsx)

**Launcher (floating button, bottom-right)**
```tsx
<button className="relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden ring-2 ring-offset-2 ring-border-light hover:ring-footer bg-footer hover:bg-footer-hover">
  {/* Lucius mark */}
</button>
```
- Size: `w-14 h-14` (56px — touch-target safe).
- Color: `bg-footer` (dark) when open, `bg-white` (with purple mark) when closed.
- Ring: `ring-2 ring-offset-2 ring-border-light` → `hover:ring-footer`.
- Two `animate-ripple` overlays for open-state emphasis.

**Panel (docked)**
```tsx
<div className="bg-white shadow-2xl border border-border-light overflow-hidden flex flex-col w-full h-full rounded-none sm:rounded-2xl sm:h-[500px] sm:max-h-[calc(100vh-150px)]">
  <div className="bg-footer p-4 flex items-center gap-3">
    {/* avatar, "Lucius AI", status dot (bg-success), menu */}
  </div>
  {/* message list, composer */}
</div>
```
- Full-bleed on mobile, `rounded-2xl` docked card (500px tall) on `sm:` and up.
- Header `bg-footer` with white text; status dot `bg-success` with `border-2 border-footer`.
- User bubble `bg-footer text-white rounded-br-md`; assistant bubble white with soft border.
- Typing indicator: three `w-2 h-2 bg-text-secondary rounded-full animate-bounce` with staggered `animationDelay`.
- Icons from **lucide-react** (the only live icon library on the site outside of custom SVGs).

### 4.14 Top-of-section stats strip — [`src/components/sections/Stats.tsx`](src/components/sections/Stats.tsx)

The only section that uses `bg-primary` as a full-bleed surface. Grid of 2 or 4 big-number tiles, `text-white` over Lucius Purple. Use once per page and only as a punctuation anchor.

```tsx
<section className="bg-primary relative overflow-hidden lg:min-h-[510px]">
  <div className="mx-auto max-w-[1440px] px-4 md:px-8 relative z-10 py-12 md:py-24">
    <div className="max-w-[1280px] mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {/* 4 stat tiles: text-center py-6 px-3 lg:py-8 lg:px-6 */}
      </div>
    </div>
  </div>
</section>
```

---

## 5. Layout Principles

### 5.1 Grid & container
- **Outer max width**: `1440px` (`max-w-[1440px]`), centered, with padding ramp `px-4 sm:px-6 md:px-8` (or `px-8` on sections that only care about md+).
- **Inner content cap**: a nested `max-w-[1280px] mx-auto` wrapper inside the outer container is the dominant pattern — FAQ, Pricing, Testimonials, Stats, GetStarted, HowItWorks all use it. Footer uses `max-w-[1200px]`.
- **LogoBar exception**: `max-w-[1200px] px-6 md:px-8` — the one section that caps narrower and starts at `px-6`.
- **Vertical section rhythm**: `py-24` default; `py-16 md:py-24` for mobile-flex; `py-32` for hero/anchor moments; `py-12` for the FinalCTA outer wrapper (its inner card pads separately).

### 5.2 Standard grid patterns

| Use | Classes |
|---|---|
| 3-column feature / pricing | `grid md:grid-cols-3 gap-6` |
| 2-column feature | `grid grid-cols-1 md:grid-cols-2 gap-6` |
| 4-column role tiles (tight) | `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2` |
| 4-column stats on dark bg | `grid grid-cols-2 lg:grid-cols-4` |
| Testimonial masonry | `grid grid-cols-2 gap-6 lg:hidden` + `hidden lg:grid grid-cols-3 gap-6` (manual round-robin) |
| Footer link columns | `grid grid-cols-3 gap-12 md:gap-16` |

Default inter-card gap: **`gap-6` (24px)**. Scenarios tightens to `gap-2`; Footer loosens to `gap-12 md:gap-16`.

### 5.3 Spacing scale
Tailwind defaults (4px base): `1` (4) → `2` (8) → `3` (12) → `4` (16) → `6` (24) → `8` (32) → `12` (48) → `16` (64) → `20` (80) → `24` (96) → `32` (128). No custom spacing unless absolutely necessary.

### 5.4 Radius scale
- `rounded-xl` (12px) — small inputs, icon boxes, dropdowns
- `rounded-2xl` (16px) — standard cards, panels, pricing/testimonial/getstarted cards
- `rounded-[24px]` / `rounded-3xl` (24px) — Scenarios role tiles, FinalCTA card
- `rounded-[40px]` — Hero / FinalCTA CTA pills (bespoke — do not substitute `rounded-full`)
- `rounded-full` — most other buttons, badges, avatars, ChatWidget launcher
- `rounded-b-[80px]` — Hero outer wrapper bottom curve (one-off brand signature)

### 5.5 Whitespace philosophy
Whitespace is structural. Headlines need room to breathe. Hero sections are at least 80vh on desktop (actual live hero: `aspect-[1440/840]` — `~840px` tall on desktop). **Never** crowd a CTA — give it horizontal space at least equal to its own width.

### 5.6 Logo clearspace (Brand Guideline p. 5)
Maintain clear space ≥ **1× the height of the logo mark** on all sides of the wordmark. No text, image, or graphic element may encroach within that zone. The lone exception is the intentional full-bleed `font-serif text-[25vw]` watermark in the footer — a design decision, not a clearspace violation.

---

## 6. Depth & Elevation

Lucius shadows are **soft and low-contrast**. We layer through *color and surface tone*, not heavy shadows.

### 6.1 Shadow scale (empirical — every value grep-hits a real file)

| Level | Use | Value | Source |
|---|---|---|---|
| **0 — flat** | Most components on tinted surfaces | none | — |
| **1 — subtle** | Default button/card rest state (Hero CTA, HowItWorks inner cards) | `shadow-sm` | [`Hero.tsx:282`](src/components/sections/Hero.tsx), [`HowItWorks.tsx:18`](src/components/sections/HowItWorks.tsx) |
| **2 — hero-float (bespoke)** | Hero floating mini-UI cards | `shadow-[0px_4px_22px_0px_rgba(0,0,0,0.15)]` | [`Hero.tsx:148`](src/components/sections/Hero.tsx), [`Hero.tsx:182`](src/components/sections/Hero.tsx), [`Hero.tsx:223`](src/components/sections/Hero.tsx) |
| **3 — sphere lift (bespoke)** | Hero 3D logo sphere | `shadow-[0px_5.6px_5.6px_0px_rgba(0,0,0,0.15)]` | [`Hero.tsx:125`](src/components/sections/Hero.tsx) |
| **4 — floater** | ChatWidget launcher button | `shadow-lg` | [`ChatWidget.tsx:1083`](src/components/ChatWidget.tsx) |
| **5 — overlay** | Dropdown menus, popovers | `shadow-xl` | [`ChatWidget.tsx:809`](src/components/ChatWidget.tsx) |
| **6 — docked modal** | ChatWidget docked panel | `shadow-2xl` | [`ChatWidget.tsx:762`](src/components/ChatWidget.tsx) |

Never use Material-style hard drop shadows. Never apply a shadow to the logo (Brand Guideline p. 4). Prefer moving an element up the surface ladder (§6.2) before reaching for a shadow.

### 6.2 Surface elevation (color-driven)
The primary depth tool is *which warm neutral the surface uses*. Move up the surface ladder to bring an element forward:

`white` → `beige-light` → `beige-muted` → `olive-light` → `beige-warm` → `beige` → `primary` / `deep-moss` → `footer`

### 6.3 Grain & surface texture (canonical)

Lucius surfaces ship with SVG film-grain overlays that add tactile depth to the color-driven hierarchy above. The grain system lives in [`src/components/effects/GrainOverlay.tsx`](src/components/effects/GrainOverlay.tsx) and its 9 presets are compared side-by-side at [`/assets/grain`](src/app/[locale]/assets/grain/page.tsx).

**Canonical assignment by surface (decided 2026-04-15, granularity locked 2026-04-15):**

| Surface family | Default grain variant | Opacity | Blend | Why |
|---|---|---|---|---|
| **Universal baseline** (every page via `layout.tsx`) | `fine-grain` | `0.12` | `multiply` | Subtle film bed — applies to white and every non-overridden surface. |
| **Ivory / beige family** (`beige`, `beige-warm`, `beige-light`, `beige-muted`, `olive-light`, `cream`) | `sand-dune` | `0.18–0.25` | `multiply` | Dunes + grain compositing gives warm paper a flow that reads as premium rather than noisy. Hero (0.25) is the reference intensity; content sections use 0.18–0.20. |
| **Deep-moss / dark-green** (`deep-moss`, `dark-green`, `green-cta` cards) | `green-velvet` | `0.38` | `soft-light` | Dense, crisp, directionally stretched fibers mimic a jewelry-display velvet pad. `soft-light` on moss yields highlights + shadows at once, which is where the "pile direction" lives. |
| **Dark footer / `footer`** | universal baseline only | `0.12` | `multiply` | The footer is intentionally flat; do not add a second grain layer. |
| **Purple (`primary`, `primary-dark`, `primary-deep`)** | universal baseline only | — | — | Saturated purple eats texture — leave flat unless a future variant calls for it. |

**Granularity (baseFrequency — canonical, locked 2026-04-15).** Lower = coarser. These were user-tuned on the live homepage against ivory and moss surfaces; do not change without re-tuning the whole set.

| Variant | `baseFrequency` | Character |
|---|---|---|
| `fine-grain` | `0.55` | Coarse warm film grain — reads as paper, not digital noise. |
| `sand-dune` | `0.008 0.015` (dune flow) + `0.55` (grain) | Low-freq dune modulates the coarse grain — gives ivory surfaces a drifted-sand feel. |
| `green-velvet` | `2.8 1.9` (X-stretched, single octave) | Dense crisp fibers with a horizontal pile direction; the `soft-light` blend turns the noise into highlights + shadows simultaneously. |
| `paper` | `1.1` (1 octave) | Fine paper fiber — used on editorial / text-heavy sections only. |
| `newsprint` / `linen` / `film-35mm` / `speckle` | see [`GrainOverlay.tsx`](src/components/effects/GrainOverlay.tsx) | Experimental / per-section — not homepage defaults. |

**How to apply.** Sections with ivory or moss backgrounds add a scoped `<GrainOverlay position="absolute" zIndex={1-2} />` inside a `relative overflow-hidden` wrapper. Content sits at `z-10` or higher. Example (from `HeroNarrative.tsx`):

```tsx
<div className="relative overflow-hidden bg-beige-warm">
  <GrainOverlay variant="sand-dune" position="absolute" opacity={0.25} blendMode="multiply" zIndex={2} />
  {/* content */}
</div>
```

**Rules.**
- Never stack two scoped grain variants on the same surface — the global baseline + one scoped variant is the ceiling.
- Never use `speckle` or `paper` as a moss surface default. `green-velvet` is canonical for moss; the other variants exist for the `/assets/grain` comparison and future experiments.
- Seed values should differ between adjacent instances (pass different `seed` props) so viewers don't see a visible tile repeat on scroll.
- The global fine-grain in `layout.tsx` always sits at `zIndex={40}` (above all content) — scoped grains live underneath at `zIndex={1-2}` so section content remains fully interactive.

### 6.4 Motion personality

**Ambient, never bouncy.** Motion on the Lucius site signals life, not playfulness. Durations are long (`1.5s–6s`), easings are gentle (`ease-in-out`, `cubic-bezier(0.22, 0.61, 0.36, 1)`), and most animations are infinite loops at very low amplitude. The exception is the author-shine effect, which runs **once** for 1.6s on page load as a brand wink.

**Available `animate-*` classes (all in `globals.css`)**
- `.animate-scroll` — 30s linear horizontal marquee (logo strip)
- `.animate-float-slow` / `-medium` / `-fast` — 4–6s vertical float, 8–12px amplitude (hero floating cards)
- `.animate-ripple` — 1s single-shot radial expansion (CTA click feedback + ChatWidget launcher)
- `.animate-author-shine` + `.animate-author-glow` — Apple-Intelligence-style shine + border-wave for the author byline; runs once, 1.6–2s

**Framer Motion presets** (`@/components/ui/motion`) — `fadeInUp`, `staggerContainer`, `staggerItem`, `fadeIn`. Use these for on-scroll section reveals; don't hand-roll new ones.

**Forbidden**: bounce / elastic / overshoot easings, spring physics with high stiffness, any animation that moves more than ~16px, gradient animations on text.

---

## 7. Do's and Don'ts

### Logo (Brand Guideline p. 4 — *"Our logo is our most sacred asset"*)

✅ **Do**
- Use the logo in one of the four approved color combinations (§2.9). *Why: brand equity lives in these specific pairings.*
- Maintain ≥1× mark-height clearspace on all sides. *Why: the mark visually collapses into adjacent content without breathing room.*
- Use the supplied SVG / high-resolution assets. *Why: rasters blur on retina; the SVG is the source of truth.*

🚫 **Don't**
- Don't add shadows or glows behind the logo. *Why: the mark is already the focal point; shadows read as ornament and break brand silence.*
- Don't add outlines or strokes to the logo. *Why: the stroke count is load-bearing in the letterform.*
- Don't stretch, skew, or rotate the logo. *Why: the "L" mark has hand-tuned optical balance that shears break immediately.*
- Don't use low-resolution rasters. *Why: the terminals fringe and the brand looks cheap.*
- Don't alter the wordmark typography. *Why: the wordmark is a drawn logotype, not a font.*
- Don't place the logo on low-contrast or busy backgrounds. *Why: AAA contrast is the floor; fail it and the mark is gone.*

### Color
- ✅ Use Lucius Purple as the primary accent — always anchor it against warm ivory or white. *Why: purple on cool neutrals reads as "tech demo"; purple on warm ivory is what makes Lucius feel human.*
- ✅ Reserve Deep Moss (and Stats' `bg-primary`) for one section per page maximum. *Why: they're punctuation marks, not wallpaper — overuse kills their weight.*
- 🚫 Don't introduce any color outside this document. *Why: two near-purples ship and the brand starts to "blur"; propose it in `globals.css` + the brand guideline first.*
- 🚫 Don't mix Lucius Purple with arbitrary blues or pinks. *Why: the palette is tuned to warm ivory; off-palette accents visually flatten it.*

### Typography
- ✅ Use Recoleta as a single accent word in a hero or section headline. *Why: the SF Pro ↔ Recoleta contrast is the signature — one word, not a phrase.*
- ✅ Set body, nav, buttons, labels, and forms in SF Pro. *Why: Recoleta body copy instantly dates the site and hurts readability.*
- 🚫 Don't set paragraphs, body, or UI controls in Recoleta. *Why: same reason — readability plus brand dilution.*
- 🚫 Don't combine more than two type families on one screen. *Why: three fonts on a screen always reads as unfinished.*
- 🚫 Don't use italic or all-caps for emphasis when a weight change will do. *Why: italics fight Recoleta's serif rhythm; all-caps fights SF Pro's clarity.*

### Imagery
- ✅ Treat all photographic imagery with the halftone / dot-matrix effect (see [`docs/design/illustration-style-guide.md`](docs/design/illustration-style-guide.md) and Brand Guideline p. 16). *Why: halftone is the bridge between human subjects and "data"; raw photos don't belong to the brand.*
- ✅ Lean on the geometric icon vocabulary on Brand Guideline p. 15. *Why: the geometry language and halftone language are one system.*
- 🚫 Don't use raw stock photography. *Why: reads generic; halftone is part of the brand voice.*
- 🚫 Don't use 3D renders, gradients-on-gradients, or glassmorphism effects. *Why: they conflict with the warm-flat aesthetic and instantly read as a different brand.*

### Layout
- ✅ Respect the 1440px outer / 1280px inner container and the standard padding ramp. *Why: consistent gutters are most of what "feels designed" about the site.*
- ✅ Give hero sections breathing room (aspect ratio `1440/840` on desktop). *Why: crowded heroes collapse the brand's "quiet confidence."*
- 🚫 Don't crowd CTAs. *Why: a CTA needs whitespace equal to its own width to read as clickable, not as decoration.*
- 🚫 Don't introduce custom spacing values when a Tailwind default works. *Why: one-off values fragment the rhythm.*

---

## 8. Responsive Behavior

### 8.1 Breakpoints (Tailwind defaults)

| Name | Min width | Notes |
|---|---|---|
| `sm` | 640px | Larger phones, small tablets. |
| `md` | 768px | Tablets. Nav fully expands. Two-column layouts begin. |
| `lg` | 1024px | Laptops. FAQ / Hero go two-column; Testimonials go 3-col. |
| `xl` | 1280px | Desktop. Scenarios reaches 4 cols. |
| `2xl` | 1440px | Container max-width. |

### 8.2 Mobile rules
- **`<body> overflow-x: clip` at `≤1023px`** (`@media (max-width: 1023px)` in [`globals.css:108`](src/app/globals.css)). Do not rely on `sm` or `md` — the rule is specifically 1023-and-below.
- Hero stacks: headline → subhead → CTAs → visual.
- Nav collapses to hamburger at `<md` (768px); full-bleed `bg-beige/95` overlay menu with `border-t border-black/10`.
- Section padding ramp: `py-16 md:py-24` on mobile-flex sections, `py-24` default.

### 8.3 Touch targets
- Minimum 44×44px. The standard `h-14` button (56px), `h-10` nav CTAs (40px — pad area extends with padding), and `w-14 h-14` chat launcher all satisfy this.
- Avoid placing tappable elements within 8px of each other.

### 8.4 Type scaling
Use the responsive sizes in §3.3. Hero display scales most aggressively (80px desktop → 56px mobile); body text barely changes (17–18px → 16px). Section H2s ramp `text-[40px] md:text-[48px]` with `leading-[1.2] md:leading-[1.33]`.

### 8.5 Anchor scroll
All `<section id="…">` elements have `scroll-margin-top: 64px` set globally via:

```css
section[id] {
  scroll-margin-top: 64px;
}
```

([`globals.css:6-8`](src/app/globals.css)) — matches the 64px sticky Navbar. Do not re-declare this at the component level.

---

## 9. Agent Prompt Guide

### 9.1 Quick color reference

```
Primary brand        #5538C7   bg-primary           --color-primary
Primary hover        #4A2FB5   bg-primary-hover     --color-primary-hover
Primary light        #977DF5   bg-primary-light     --color-primary-light
Purple faint         #F1F0FF   bg-purple-faint      --color-purple-faint
Lavender Mist        #BAB2FF   bg-purple-light      --color-purple-light
Orchid Bloom         #B268D8   bg-purple-pink       --color-purple-pink
Cobalt Pulse         #504DDC   bg-cobalt-pulse      --color-cobalt-pulse
Deep Moss            #1B4038   bg-deep-moss         --color-deep-moss
Green CTA            #2D5040   bg-green-cta         --color-green-cta

Warm Ivory           #E1DAC0   bg-beige             --color-beige
Beige Warm           #EBE4CA   bg-beige-warm        --color-beige-warm
Beige Light          #FDFAF1   bg-beige-light       --color-beige-light
Beige Muted          #F6F5F2   bg-beige-muted       --color-beige-muted
Olive Light          #F6F6EF   bg-olive-light       --color-olive-light
White                #FFFFFF   bg-white             --color-background
Footer near-black    #131007   bg-footer            --color-footer

Text heading         #252B37   text-text-heading    --color-text-heading
Text dark            #1E2C33   text-text-dark       --color-text-dark
Text primary         #181D27   text-text-primary    --color-text-primary
Text secondary       #535861   text-text-secondary  --color-text-secondary
Text blue-gray       #3B5266   text-text-blue-gray  --color-text-blue-gray
Text muted           #7F8C96   text-text-muted      --color-text-muted
Text footer          #B5B5B5   text-text-footer     --color-text-footer
Text olive-dark      #4F4726   text-text-olive-dark --color-text-olive-dark

Border               #D7D3D0   border-border        --color-border
Border light         #E5E3DF   border-border-light  --color-border-light
Border beige         #E5E2DC   border-border-beige  --color-border-beige

Success              #22C55E   bg-success           --color-success
Danger               #EF4444   bg-danger            --color-danger
```

### 9.2 Quick font reference

```
Body, UI, buttons, nav, labels         → SF Pro       (font-sans / font-heading / font-dm-sans)
Hero accent word, brand moments        → Recoleta     (font-serif — MUST be invoked explicitly)
Code samples, terminal, inline code    → Fira Code    (font-code / --font-fira-code)
Section eyebrows (above headings)      → Recoleta italic  (font-serif italic + 40px rule, see §4.2)
```

### 9.3 Ready-to-use prompt snippets

**"Build a Lucius landing section"**
> Build a section with `py-24 bg-white` (or `bg-beige-light`). Outer `mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8`, inner `max-w-[1280px] mx-auto`. Section eyebrow: `mb-5 inline-flex items-center gap-3 font-serif italic text-[15px] md:text-[16px] text-text-olive-dark` with an inner `<span aria-hidden className="h-px w-10 bg-text-olive-dark/40" />` 40px rule before the label. Section headline `text-[40px] md:text-[48px] leading-[1.2] md:leading-[1.33] text-text-dark` composed of two spans: `<span class="font-heading">…</span><span class="font-serif">…</span>`. Subtitle `text-[20px] md:text-[24px] text-text-blue-gray`.

**"Build a Lucius feature card"**
> White card, `rounded-2xl border border-border-light p-8`. Top: 64×64 icon container `rounded-xl bg-purple-faint`. Title `text-2xl font-semibold mb-3`. Body `text-text-secondary leading-relaxed`. No shadow on default surface.

**"Build a Lucius hero CTA pair"**
> Primary (dark): `<button className="inline-flex items-center justify-center gap-6 rounded-[40px] bg-footer w-[260px] h-14 text-[17px] font-medium text-white hover:bg-footer-hover transition-colors">Book demo <arrow/></button>`. Secondary (ivory): `<a className="inline-flex items-center justify-center rounded-[40px] bg-white w-[260px] h-14 text-[17px] font-medium text-footer shadow-sm hover:bg-white/80 transition-colors">See case studies</a>`. Note: `rounded-[40px]`, not `rounded-full`; fixed `w-[260px]`, not `px-8`.

**"Build a Lucius navbar button"**
> Primary (dark): `rounded-full bg-footer px-6 h-10 text-[15px] font-dm-sans font-normal text-white hover:bg-footer-hover`. Secondary (outline): `rounded-full border border-black/15 px-5 h-10 text-[15px] font-dm-sans text-black hover:bg-black/5`. Both compact (`h-10`), both `font-normal`.

**"Build a Lucius hero"**
> Full-bleed `bg-beige-warm rounded-b-[80px] -mt-16 overflow-hidden`. Inside, `mx-auto max-w-[1440px] pt-16 lg:aspect-[1440/840]`. Text column `max-w-[576px] px-8 pt-24 lg:pt-32 pb-16 lg:pb-28`. Headline `text-[56px] lg:text-[80px] leading-[1.05] tracking-tight text-text-heading` with two spans: first in `font-heading`, accent in `font-serif text-primary`. Subhead `mt-8 text-[20px] lg:text-[24px] leading-[1.33] text-text-secondary max-w-[484px]`. CTA row `mt-10 flex flex-wrap items-center gap-4` — ivory + dark pair from snippet above.

**"Build a Lucius pricing card"**
> Outer: `rounded-2xl p-10 flex flex-col` with `minHeight: 420`. Card bg `bg-olive-light` (outer tiers) or `bg-beige` (highlight tier). 60×60 hand-drawn SVG tier icon (ivory `#E1DAC0` fill, or white + white radial glow on the highlight card). Name `text-[24px] font-serif mb-1`. Description `text-[16px] mb-6`. Separator `border-b border-black/10 mb-6`. CTA `w-full rounded-full h-14 text-[17px] font-medium inline-flex items-center justify-center mb-6` — `bg-beige text-text-dark` on outer tiers, `bg-primary text-white` on highlight. Features: `space-y-3`, each row `flex items-center gap-3` with a 14×14 arrow SVG in `text-primary` and `text-[16px]` label. No checkmarks.

**"Build a Lucius testimonial card"**
> `rounded-2xl bg-dark-green p-6 md:p-8`. Header row: brand logo `h-6 w-auto max-w-[100px] object-contain brightness-0 invert` + name `text-[15px] font-medium text-white` / role `text-[13px] text-white/60`. Quote `font-serif text-[16px] md:text-[18px] leading-[1.5] text-white/90`. If linked, wrap in `<Link>` with `transition-transform hover:scale-[1.02]` and add `text-[13px] text-white/50` "Read case study →" footer.

**Negative prompt (never do this)**
> Avoid: hard drop shadows, rectangular buttons, gradient or animated text, sans-only headlines without a Recoleta accent, cool blues or teals, stock photography, glassmorphism, 3D renders, `rounded-md` cards, three-font screens, Recoleta body paragraphs, checkmark bullets in Pricing, shadows behind the logo, colors not listed in §2 / §9.1, any `border-gray-*` other than the one `border-gray-200` in FAQ.

### 9.4 Where to look in the codebase

| Need | File |
|---|---|
| Theme tokens (colors, fonts, custom CSS) | [`src/app/globals.css`](src/app/globals.css) |
| Font loading | [`src/lib/fonts.ts`](src/lib/fonts.ts) |
| Section patterns | [`src/components/sections/`](src/components/sections) |
| Framer Motion presets (fadeInUp, stagger…) | [`src/components/ui/motion.tsx`](src/components/ui/motion.tsx) |
| Navbar, Footer, LanguageSwitcher | [`src/components/layout/`](src/components/layout) |
| Live chat widget | [`src/components/ChatWidget.tsx`](src/components/ChatWidget.tsx) |
| Illustration / imagery rules | [`docs/design/illustration-style-guide.md`](docs/design/illustration-style-guide.md) |
| Canonical brand source | [`docs/brand/Lucius Brand Guideline.pdf`](docs/brand/Lucius%20Brand%20Guideline.pdf) |

> Note: `src/components/ui/` currently only contains `motion.tsx`. There is **no** generic `Button`, `Card`, or `Input` primitive — every section builds its own JSX. Match the nearest existing section before inventing a new primitive.

### 9.5 Golden rules (the 60-second version)

1. **One accent per headline** — SF Pro line, single Recoleta word, often `text-primary`.
2. **Warm ivory is home base** — when in doubt, the section background is `bg-white` or `bg-beige-light`.
3. **Purple is the action color** — use it for CTAs, links, and the one thing you want clicked.
4. **Pills, not rectangles** — buttons are `rounded-full` or `rounded-[40px]`, never rectangular.
5. **Soft shadows or no shadows** — `shadow-sm` / `shadow-lg` / the two bespoke Hero values, nothing else.
6. **Halftone, not stock** — every photo is treated through the dot matrix.
7. **1440px outer / 1280px inner** — `mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8` with a nested `max-w-[1280px] mx-auto`.
8. **Recoleta is opt-in** — `<h2>` is NOT serif by default; you must add `font-serif` explicitly.
9. **Section eyebrows are Recoleta italic + a rule** — `font-serif italic text-[15px] md:text-[16px] text-text-olive-dark` preceded by a 40px `h-px` rule at 40% opacity. No pill, no fill, no mono.
10. **No new colors or fonts** without updating the brand guideline AND `globals.css`.

### 9.6 Worked example — generic SaaS hero → Lucius hero

**Before (generic SaaS):**
```tsx
<section className="bg-slate-50 py-20">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h1 className="text-5xl font-bold text-slate-900 mb-6">
      The future of AI customer support
    </h1>
    <p className="text-lg text-slate-600 mb-8">
      Automate your support with AI-powered workflows.
    </p>
    <button className="bg-blue-600 text-white rounded-md px-6 py-3 font-semibold shadow-md hover:bg-blue-700">
      Get started free →
    </button>
  </div>
</section>
```

**After (Lucius):**
```tsx
<div className="relative bg-beige-warm rounded-b-[80px] -mt-16 overflow-hidden">
  <section className="relative mx-auto w-full max-w-[1440px] pt-16 lg:aspect-[1440/840]">
    <div className="relative z-10 px-8 pt-24 lg:pt-32 pb-16 lg:pb-28">
      <div className="max-w-full lg:max-w-[576px]">
        <h1 className="text-[56px] lg:text-[80px] leading-[1.05] tracking-tight text-text-heading">
          <span className="font-heading">AI that works like a </span>
          <span className="font-serif text-primary">teammate</span>
        </h1>
        <p className="mt-8 text-[20px] lg:text-[24px] leading-[1.33] text-text-secondary max-w-[484px]">
          Lucius learns your community, handles real work, and operates alongside your team 24/7.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="/case-studies"
            className="inline-flex items-center justify-center rounded-[40px] bg-white w-[260px] h-14 text-[17px] font-medium text-footer shadow-sm hover:bg-white/80 transition-colors"
          >
            See case studies
          </a>
          <button
            className="inline-flex items-center justify-center gap-6 rounded-[40px] bg-footer w-[260px] h-14 text-[17px] font-medium text-white hover:bg-footer-hover transition-colors"
          >
            Book a demo
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</div>
```

**What changed — and why**
1. `bg-slate-50 py-20` → `bg-beige-warm rounded-b-[80px] -mt-16` + `aspect-[1440/840]`. Warm ivory is home; the bottom curve is a brand signature; the aspect ratio is the hero's tuned proportion.
2. `max-w-6xl text-center` → `max-w-[1440px]` + left-aligned `max-w-[576px]` text column. Lucius headlines live in the left ~40% with the visual artboard on the right.
3. `text-5xl font-bold` → `text-[56px] lg:text-[80px] leading-[1.05] tracking-tight`. Two spans, one with `font-serif text-primary` on a single accent word ("teammate"). One accent per headline, always.
4. `text-slate-600` → `text-text-secondary`. Never ship `slate-*` on Lucius.
5. `bg-blue-600 rounded-md shadow-md font-semibold px-6 py-3` → `rounded-[40px] bg-footer w-[260px] h-14 text-[17px] font-medium`. The CTA is a pill, not a rectangle; `bg-footer` (not blue), `font-medium` (not semibold), and a fixed `w-[260px] h-14`.
6. Added an ivory paired secondary CTA. Hero CTA pairs are always dark + ivory; a lone CTA looks unfinished on a Lucius hero.
7. Removed `shadow-md` from the CTA and added `shadow-sm` only on the ivory variant. Dark pill carries no shadow — `bg-footer` is already maximum contrast.

---

## 10. Iconography

### 10.1 Sources
- **[lucide-react](https://lucide.dev)** — the only live icon library in the codebase. Currently used inside [`ChatWidget.tsx`](src/components/ChatWidget.tsx) and [`LanguageSwitcher.tsx`](src/components/layout/LanguageSwitcher.tsx). If you need a utility glyph (menu, close, chevron, download, sound), reach for lucide-react first.
- **Hand-drawn inline SVGs** — every section (Hero, Pricing, Scenarios, GetStarted, HowItWorks) ships bespoke inline SVGs for its hero moment. Social icons, integration brand marks, and Pricing tier icons are all inline SVG paths. Keep `viewBox` explicit and `fill="currentColor"` (or a literal token hex) so they follow text color.
- **Brand icon vocabulary (Brand Guideline p. 15)** — simple geometric shapes (triangles, concentric circles, signal/radar arcs, sparkles), consistent stroke, modular. The Pricing tier icons (mountain / radar / sparkle) are the canonical example.

### 10.2 Size grid

| Size | Use | Pixel |
|---|---|---|
| `w-3 h-3` / `w-4 h-4` | Inline meta (list arrows, status dots, footer close) | 12 / 16 |
| `w-5 h-5` / `w-6 h-6` | Standard UI (nav, chat header, CTA arrow) | 20 / 24 |
| `w-7 h-7` | Footer social wrapper (icon svg itself is `w-4 h-4` to `w-5 h-5` centered) | 28 |
| `w-14 h-14` | ChatWidget launcher container | 56 |
| `60×60` / `72×72` | Pricing tier icons, FinalCTA brand mark | 60 / 72 |

### 10.3 Stroke / fill rules
- **Stroke-based glyphs** (menu, close, chevrons, arrows): `strokeWidth={1.5}` for header/FAQ icons, `strokeWidth={2}` for CTA arrows and nav hamburger, `strokeWidth={2.5}` for thicker marketing glyphs (GetStarted plus). `strokeLinecap="round"` and `strokeLinejoin="round"` always.
- **Filled glyphs** (brand marks, tier icons, success checkmarks): use `fill="currentColor"` and let the parent's `text-*` control color, or hardcode a token hex when the intent is locked (e.g. `#E1DAC0` for pricing tier icons, `#B268D8` inline for Slack).
- **Color tokens for icon fills**: `fill-icon-dark` (`#323F46`) on white pucks (footer socials), `fill-icon-gray` (`#7B7B7B`) for neutral meta icons. Never use `fill-black` or `fill-slate-*`.

### 10.4 Do / don't
- ✅ Keep icons monochrome. A two-color icon is almost always a brand logo, not a UI glyph.
- ✅ Size icons via Tailwind (`w-* h-*`) — never via SVG `width`/`height` attributes alone.
- 🚫 Don't mix lucide icons and hand-drawn marks in the same row — pick one register per surface.
- 🚫 Don't add drop shadows, gradients, or 3D bevels to any icon.

---

## 11. Microcopy & Voice

### 11.1 Voice principles

- **Short, declarative, second-person.** "Lucius handles your support." not "Our AI solution enables you to…"
- **Active verbs.** "handles," "learns," "escalates," "drafts." Never "leverages," "empowers," "unlocks."
- **"Lucius" is a proper noun.** Always capitalized, always singular. Never "the AI," "the bot," "the assistant," "our platform."
- **Functional, not aspirational.** Describe what Lucius *does* today, not what it *could* do. No "imagine if…" or "the future of…" openers.
- **One idea per line.** Headlines, CTAs, and subheads are pruned to one verb and one object.
- **Compound confidence.** Pair a quiet factual verb with a specific outcome: "Lucius learns your community and handles real work 24/7."

### 11.2 Capitalization & punctuation

- **Sentence case** for buttons, nav, and section headings. ("Book demo," not "Book Demo.")
- **No trailing periods** on CTAs or single-sentence subheads inside cards.
- **Oxford comma** on.
- Em-dashes (—) over parentheses for prose asides.
- Curly quotes in prose (`“…”`, `’`), straight quotes in code.

### 11.3 CTA patterns

| Context | Label | Notes |
|---|---|---|
| Primary hero / global | "Book demo" | Never "Book a Demo," never "Schedule a call." |
| Secondary hero | "See case studies" | Links to `/case-studies`. |
| Pricing card | "Contact us" | Uniform across tiers; no "Start free trial." |
| Chat widget trigger | Inline prompt ("Ask Lucius…") | Not "Chat with us." |
| FinalCTA | "Book demo →" | Trailing right-arrow glyph only in final-CTA context. |

### 11.4 Tone don'ts

- 🚫 No exclamation marks. *Why: Lucius is quietly confident; exclamations read as hard sell.*
- 🚫 No emoji in body or headings. *Why: breaks the typographic system.*
- 🚫 No "revolutionary," "next-gen," "AI-powered" as adjectives. *Why: they signal generic SaaS, not brand.*
- 🚫 No first-person-plural "we" in product voice. *Why: Lucius is the subject, not the company.*
- 🚫 No abbreviations like "AI-first," "LLM-based." *Why: Lucius describes what it does, not what it's built on.*

---

## 12. Landing variants

The main landing page at `/[locale]/` is **canonical and never changed by variant work**. Parallel variants live under `/[locale]/landing-{letter}/` for A/B comparison and narrative experiments. The current variant is **`/landing-a`** — a narrative restructure built around the growth doc's three-layer story (Problem → False Fixes → Shift).

> **Rule**: variants do not edit `src/app/[locale]/page.tsx`, the default `hero` i18n namespace, or existing section components whose copy they want to override. They create parallel files instead.

### 12.1 Variant routing pattern

```
src/app/[locale]/
  page.tsx                         ← canonical live page (untouched by variants)
  landing-a/
    page.tsx                       ← variant A (narrative restructure)
  landing-b/
    page.tsx                       ← future variant
```

Variant pages import a mix of **variant-specific sections** (see §12.3) and **reused main-page sections** (e.g., `Pricing`, `FAQ`, `FinalCTA`, `GetStarted`). Layout (`Navbar`, `Footer`) is always reused.

### 12.2 Variant i18n convention

All variant-specific copy lives under a `landing{Letter}` namespace in `messages/en.json`:

```json
{
  "hero": { … },                 ← canonical, never edited for variants
  "landingA": {
    "hero": { … },               ← variant's own hero copy
    "theProblem": { … },
    "falseFixes": { … },
    "theShift": { … },
    "customerStoryArc": { … }
  }
}
```

Variant section components call `useTranslations("landingA.xxx")` directly — no `namespace` prop threading. Rationale: strict isolation, zero risk to main page, grep-friendly.

### 12.3 `/landing-a` — Narrative Restructure

**Section order** ([`src/app/[locale]/landing-a/page.tsx`](src/app/[locale]/landing-a/page.tsx)):

```
Navbar
  HeroNarrative          ← variant-specific  (landingA.hero)
  TheProblem             ← variant-specific  (landingA.theProblem)
  FalseFixes             ← variant-specific  (landingA.falseFixes)
  TheShift               ← variant-specific  (landingA.theShift)
  GetStarted             ← reused from main
  CustomerStoryArc       ← variant-specific  (landingA.customerStoryArc)
  Pricing                ← reused from main
  FAQ                    ← reused from main
  FinalCTA               ← reused from main
Footer
```

**Background rhythm** (breaks the main page's "white × 8 middle"):

```
beige-warm → beige-light → white → beige-light → white → beige-light → white ×3 → footer
```

**Intent**: rebuild the page as a narrative arc. Hero states the pain ("Your community never sleeps. Now your team doesn't."), TheProblem names the four misallocated-labor roles, FalseFixes positions against FAQ bots and the competitor field, TheShift introduces the Memory × Context × Autonomous-Judgment pillars, CustomerStoryArc walks the 5-step customer journey with real attributed quotes.

### 12.4 Editorial patterns introduced by landing-a

These patterns emerged from the narrative-restructure work. Reuse them in future variants, or fold them back into main-page sections during a refresh.

#### 12.4.1 Narrative-anchor H2 (64px)

Sections that carry the narrative load (TheProblem, FalseFixes, TheShift, CustomerStoryArc) use a **larger** H2 than standard sections: `text-[40px] md:text-[64px] leading-[1.05] tracking-tight`. This establishes the hierarchy **Hero 80px > narrative H2 64px > standard H2 48px**.

```tsx
<h2 className="text-[40px] leading-[1.1] tracking-tight text-text-dark md:text-[64px] md:leading-[1.05]">
  <span className="font-heading">{t("headingBold")}</span>
  <span className="font-serif text-primary">{t("headingSerif")}</span>
</h2>
```

Use 64px **only for narrative anchor sections**, not for every section. Standard sections keep 48px.

#### 12.4.2 Hairline dividers and rails

Instead of colored card backgrounds, the variant uses **hairline rules** (`h-px` or `border-t`) at `text-olive-dark/20` – `text-olive-dark/40` for dividers, eyebrow rules, and stats borders. Compatible with the editorial eyebrow in §4.2.

Patterns:
- Stats row hairlines: `border-t border-text-olive-dark/20 pt-4`
- Pillar top hairlines: `border-t border-text-olive-dark/25 pt-6`
- Eyebrow rule (shared with §4.2): `<span aria-hidden className="h-px w-10 bg-text-olive-dark/40" />`
- Between story-arc steps: `border-t border-text-olive-dark/20 pt-14 md:pt-20`

#### 12.4.3 Editorial pull quote

```tsx
<blockquote className="border-l-2 border-primary pl-6 md:pl-8">
  <p className="font-serif italic text-[20px] leading-[1.35] text-text-heading md:text-[24px]">
    {quote}
  </p>
  <footer className="text-[13px] text-text-secondary md:text-[14px]">
    — {name} · {role}
  </footer>
</blockquote>
```

Used by `FalseFixes.tsx` for the "more rules don't make better operations" claim and by `CustomerStoryArc.tsx` for the three real customer quotes at Steps 03 / 04 / 05.

#### 12.4.4 Left-rail story step

The 5-step `CustomerStoryArc` uses a **big serif index + label** as a left rail, with content flowing right. Desktop `md:grid-cols-[180px_1fr] md:gap-14`; mobile stacks.

```tsx
<div className="grid gap-6 md:grid-cols-[180px_1fr] md:gap-14">
  <div>
    <div className="font-serif text-[56px] leading-[1] text-text-olive-dark/55 md:text-[72px]">01</div>
    <div className="font-serif italic text-[16px] text-text-olive-dark md:text-[18px]">Role</div>
  </div>
  <div>{/* headline + body + optional pullquote */}</div>
</div>
```

The 72px index at 55% opacity olive-dark is load-bearing visual weight — don't weaken it.

#### 12.4.5 Competitor comparison table

[`FalseFixes.tsx`](src/components/sections/FalseFixes.tsx) ships a hairline-ruled 4×4 comparison table. Three cell states: `yes` (filled primary circle + check), `partial` (hollow primary circle), `no` (muted em-dash). Lucius row highlighted with `bg-purple-faint/40`. When adding new comparison tables, match these three states — don't introduce a fourth or swap colors.

### 12.5 Reused-from-main sections

When a variant uses a main-page section unchanged (like `GetStarted`, `Pricing`, `FAQ`, `FinalCTA`), the component renders **with main-page copy**. Variants inherit any future copy/style changes to those sections automatically. If a variant needs section copy to diverge, create a parallel variant component (e.g., `GetStartedNarrative.tsx`) rather than parameterizing the existing one.

### 12.6 Adding a new variant

1. Create `src/app/[locale]/landing-{letter}/page.tsx`
2. Add a `landing{Letter}` namespace to `messages/en.json`
3. Build variant-specific section components under `src/components/sections/`, naming them descriptively (not `HeroB`, `HeroC`). Their `useTranslations` calls point at the variant namespace directly.
4. Reuse main-page sections by importing them unchanged
5. Update this §12 with the variant's intent and section order
6. **Never touch** `src/app/[locale]/page.tsx` or the top-level `hero` i18n key

### 12.7 Files currently owned by `/landing-a`

Components:
- [`src/components/sections/HeroNarrative.tsx`](src/components/sections/HeroNarrative.tsx)
- [`src/components/sections/TheProblem.tsx`](src/components/sections/TheProblem.tsx)
- [`src/components/sections/FalseFixes.tsx`](src/components/sections/FalseFixes.tsx)
- [`src/components/sections/TheShift.tsx`](src/components/sections/TheShift.tsx)
- [`src/components/sections/CustomerStoryArc.tsx`](src/components/sections/CustomerStoryArc.tsx)

Route:
- [`src/app/[locale]/landing-a/page.tsx`](src/app/[locale]/landing-a/page.tsx)

i18n:
- `messages/en.json` → `landingA.{hero, theProblem, falseFixes, theShift, customerStoryArc}`

### 12.8 Landing variants B–F

Five parallel routes under `/[locale]/landing-{b..f}/` exist so brand directions can be compared side-by-side. Each variant reuses landing-a's narrative copy (`landingA.*` i18n) but switches typography, palette, card treatment, and eyebrow style via a shared theme map at [`src/components/sections/variants/variantTheme.ts`](src/components/sections/variants/variantTheme.ts). Only the hero has per-variant i18n (`landingB..F.hero`).

| Slug | Reference brand | Hero anchor |
|---|---|---|
| `/landing-b` | Mailchimp | `bg-beige-warm` · oversized serif one-word-per-line |
| `/landing-c` | Financial Times Origami | `bg-beige-light` · mono metadata strip · two-col FT lede |
| `/landing-d` | BBC GEL | `bg-olive-light` · chapter marker · three-beat headline |
| `/landing-e` | Help Scout | `bg-purple-faint` · conversational split with chat card |
| `/landing-f` | Firefox Photon / Pinterest Gestalt | `bg-background` · SF Pro headline · maximum restraint |

Themed section components:
- [`variants/TheProblemV.tsx`](src/components/sections/variants/TheProblemV.tsx)
- [`variants/FalseFixesV.tsx`](src/components/sections/variants/FalseFixesV.tsx)
- [`variants/TheShiftV.tsx`](src/components/sections/variants/TheShiftV.tsx)
- [`variants/CustomerStoryArcV.tsx`](src/components/sections/variants/CustomerStoryArcV.tsx)

Index page: [`/landing-alternatives`](src/app/[locale]/landing-alternatives/page.tsx) lists all six variants with swatches for quick visual comparison.

### 12.9 Motion integration per variant

Landing variants surface the ASCII motion library ([`src/components/motion/`](src/components/motion/)) through a dedicated [`MotionBand`](src/components/sections/MotionBand.tsx) section that sits **between `TheShift` and `GetStarted`** on each variant's route. Heroes stay 100% static — motion lives only inside the band, so the hero's first-impression job and the motion's playfulness never fight for attention.

`MotionBand` wraps each ASCII component in a shared [`MotionLayer`](src/components/motion/MotionLayer.tsx) that lazy-mounts via IntersectionObserver, honors `prefers-reduced-motion`, and cleans up the RAF loop when scrolled out of view.

| Variant | Motion | Palette | Density | Frame | Caption tone |
|---|---|---|---|---|---|
| **A** | `AsciiConstellation` | `ivory-orchid` | 1.0 | Rounded card on `beige-warm` | "Memory, visualized" — narrative thesis reinforcement |
| **B** | `AsciiWhale` | `ivory-purple` | 1.0 | Rounded card on `beige-light` | "An interlude" — Mailchimp dry wit, warm paper |
| **C** | `AsciiSonar` | `moss-mist` | 0.55 | `FIG. 01` mono label + bordered dark panel | FT-style data instrument |
| **D** | `AsciiWaves` | `ivory-orchid` | 1.0 | Soft-rounded tile on `beige-light` | "Chapter break" — GEL long-form rhythm |
| **E** | `AsciiTypewriter` | `moss-mist` | 1.0 | Dark shadowed card with "Live · drafting" label | Help Scout live product moment |
| **F** | *(none)* | — | — | — | `MotionBand` returns `null` for variant `"f"` — Photon's dialect rejects ornamentation. The comparison board is more informative if F is genuinely the quiet option. |

Rules of engagement:
- **One motion per page**, placed only inside `MotionBand`. Heroes stay static. Narrative sections (`TheProblem`, `FalseFixes`, `TheShift`, `CustomerStoryArc`) never embed motion.
- **Always lazy-mount** via `MotionLayer` — never import an `Ascii*` component directly into a section. The IntersectionObserver stops the RAF when the band scrolls out, and `prefers-reduced-motion` falls back to nothing.
- **Density caps at 1.0** for variant bands; sparse (0.55) is fine, ultra (2.3) is forbidden in marketing contexts — reserve heavy densities for the motion showcase / gallery.
- **Palette must harmonize with the band's section bg**: `ivory-orchid` / `ivory-purple` for warm-paper variants, `moss-mist` for dark-inked contained panels. See [`src/components/motion/palettes.ts`](src/components/motion/palettes.ts).
- **Captions are hardcoded** in `MotionBand` itself, not in `messages/en.json` — they are decorative per-variant, not translated copy.

---

## Verification stamp

This document was rewritten empirically against the live repo.

**Checked against source on 2026-04-06:**
- [x] Every hex in §2 and §9.1 spot-checked against [`globals.css`](src/app/globals.css).
- [x] Every shadow in §6.1 grep-hit at least one `.tsx` file, with `file:line` citations.
- [x] Every JSX skeleton in §4 derived from a real file read — Hero, Navbar, Footer, FAQ, Pricing, Testimonials, Scenarios, GetStarted, FinalCTA, TopBanner, ChatWidget, Stats, HowItWorks.
- [x] Hero size reconciled: `text-[56px] lg:text-[80px]` is canonical (80px desktop, not 72px).
- [x] Hero CTA canonicalized: `rounded-[40px] w-[260px] h-14` (not `rounded-full px-8`).
- [x] `overflow-x: clip` breakpoint corrected to `≤1023px` (`@media (max-width: 1023px)`).
- [x] `scroll-margin-top: 64px` rule de-duplicated — only referenced in §8.5 now.
- [x] Missing tokens added to §2: primary-alt/medium/deep/dark/nav, purple-tag/accent/dark/pale, orchid-bloom, lavender-mist, green-cta, icon-dark/gray, text-dark/blue-gray/deep/warm/gray/olive-dark, beige-skeleton, footer / footer-hover.
- [x] §4 extended with FAQ, Pricing, Testimonial, Scenario, TopBanner, ChatWidget, Stats coverage.
- [x] Recoleta "opt-in" rule made explicit in §3.1 and §9.5.
- [x] Forbidden color combinations added as §2.10.
- [x] Logo combinations converted to a 4-row table (§2.9).
- [x] "How to use this doc" (§0), iconography (§10), voice (§11), worked example (§9.6) added.
- [x] `src/components/ui/` pointer in §9.4 corrected — it only contains `motion.tsx`.
- [x] Motion personality paragraph added to §6.4 ("ambient, never bouncy").
- [x] Grain & surface texture added as §6.3 (2026-04-15): `sand-dune` canonical for ivory family, `green-velvet` canonical for deep-moss, fine-grain universal baseline.
- [x] Grain granularity locked 2026-04-15: `fine-grain` / `sand-dune` grain layer at `baseFrequency 0.55`; `green-velvet` at `2.8 1.9`; `paper` at `1.1`. User-tuned against live homepage.

*Document version: 1.1 — synced with Brand Guideline v1.1, `globals.css`, and `src/components/` as of 2026-04-06. Revision plan: [`docs/design/design-md-revision-plan.md`](docs/design/design-md-revision-plan.md).*
