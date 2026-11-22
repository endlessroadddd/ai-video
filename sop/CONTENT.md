# Lucius — CONTENT.md

> Agent-friendly content system for Lucius — covers social media, promo video, motion design, and editorial style outside the marketing site. Companion to [`DESIGN.md`](DESIGN.md): where DESIGN governs **built UI**, this governs **produced media**.
>
> **Authoritative sources**
> 1. **Brand canon** — [`docs/brand/Lucius Brand Guideline.pdf`](docs/brand/Lucius%20Brand%20Guideline.pdf) (v1.1) — names, hex values, logo rules.
> 2. **Visual canon** — [`DESIGN.md`](DESIGN.md) §2 (color), §3 (typography), §11 (voice). Every hex / family / voice rule there applies here unchanged unless called out.
> 3. **Motion canon** — [`src/components/motion/`](src/components/motion/) (ASCII experiments, palettes, density presets). Production videos borrow from the same palette and rhythm as the web motion band.
>
> When in doubt: brand wins for naming and intent; DESIGN.md wins for implementation; this doc wins for *how a piece of media is produced, paced, and shipped.*

---

## 0. How to Use This Doc

This document governs anything that is **published outside the site** — social posts, promo videos, paid creative, conference loops, sales decks, keynote reels — plus motion pieces that are shot for the site but rendered as finished media (not live-coded animations).

**If you are a marketer / content lead:** read §1 → §2 → §6 → §7. §11 is the per-platform cheatsheet.

**If you are a motion designer:** read §3 → §4 → §5. §3 defines pacing and easing; §4 defines the shot grammar; §5 defines how sound sits against the picture.

**If you are an LLM drafting scripts or captions:** start with §2 (voice), then the platform section in §11 you are writing for. Never invent a new claim — pull metrics from [`docs/growth/`](docs/growth/) and product facts from the live site.

**If this doc and DESIGN.md disagree:** DESIGN.md wins for color hexes, type families, and UI. This doc wins for pacing, captions, frame composition, audio, and platform rules.

---

## 1. Brand Atmosphere in Motion

The in-site rule is "intelligent, collaborative, quietly confident — a partner, not a tool." Translated to moving pictures and published media:

- **Quiet over loud.** Cuts breathe. Silence is allowed. Music is a bed, not a character. Never jump-cut to a beat drop; never cold-open on a whip-pan.
- **Typographic first, visual second.** Most Lucius pieces earn attention by *sentences*, not b-roll. A headline on ivory with one serif word pulled purple is a complete shot.
- **Halftone is the bridge between human and system.** Any photographic footage of people, hands, workspaces is re-processed through a halftone / dot-matrix / ASCII pass before it ships. Raw photography is forbidden outside internal decks.
- **System ↔ human in every piece.** Pair one structured element (chart, log line, code frame, terminal, keyboard, grid) with one human element (portrait, handwriting, voice-over, quote). Never all-system, never all-human.
- **Dry, not cheerful.** A smirk is allowed. A laugh track is not. Humor arises from the gap between what the reader expected and what Lucius says — never from performance.

**Density budget.** Short pieces (≤10s social clips) hold one idea. Medium pieces (30–60s) hold up to three. Long pieces (2–5min) hold up to seven and always have a named arc. Anything denser is cut.

---

## 2. Voice & Tone for Content

This extends DESIGN.md §11. All rules there apply verbatim. Additions below handle **longer form**, **spoken voice-over**, **captions**, and **platform-specific registers**.

### 2.1 The three registers (same as site, recalibrated for media)

| Register | Applies to | Tone character |
|---|---|---|
| **Celebration / activation** | Launch posts, customer wins, keynote openers, end-cards | Warmest. One human beat allowed (one pause, one smirk). Never exclamation, never "so excited." |
| **Instructional** | Product demo scripts, how-it-works videos, explainer threads, blog hero images | Neutral teammate. Concrete verbs, named metrics. Reads like an engineer writing for a teammate, not a marketer writing for a buyer. |
| **Error / escalation** | Incident posts, outage comms, policy statements, rollback notes | Most restrained. No hedging, no apologetic theater, no "unfortunately." Name the thing. Offer the next step. |

### 2.2 Spoken voice-over rules

- **Contractions on.** "It's," "we're," "you've." Written form uses them too; spoken doubly so. Formal contractionless voice reads as corporate.
- **One sentence ≈ one breath.** If the VO artist can't say the line on one breath, rewrite.
- **Numbers in words on screen, numerals in copy.** "Seventy percent of questions resolved without escalation" in VO; `70%` in on-screen supers.
- **No mid-sentence stinger.** Sound effects never punctuate spoken claims. If the claim needs a stinger to land, the claim is weak.
- **Music duck to −18 LUFS under VO.** VO bus sits at −14 LUFS integrated. See §5.

### 2.3 Caption / subtitle register

- **Sentence case always.** No SCREAMING.
- **No speaker labels** on single-speaker pieces. On interview cuts, use `— NAME, role` at the end of the attributed quote (same em-dash pattern as the editorial pullquote in DESIGN.md §12.4.3).
- **Break on breath, not on pixel width.** Line breaks land at natural pauses, even if that leaves a short second line. Never orphan a single word unless it's the punchline.
- **Numerals in captions, not words.** Screen reads faster than voice; `70%` beats "seventy percent" every time in supers and captions.
- **Max 2 lines, ≤ 42 characters per line.** Anything longer gets a cut.

### 2.4 Claim discipline

Every metric that appears on camera or in a social caption must be traceable to:

- a published case study in [`docs/case-studies/`](docs/case-studies/) — quote the customer and link, or
- a published growth-doc benchmark in [`docs/growth/`](docs/growth/) — reference the doc, or
- the Lucius product's live behavior, phrased as capability ("handles", "drafts", "escalates") not result ("reduces", "cuts").

If the number cannot be sourced, the script must be rewritten without it. No directional adjectives as substitutes — "significantly," "drastically," "massively" are all banned. If you can't put a digit next to it, the claim doesn't belong on camera.

### 2.5 Language don'ts (expands DESIGN.md §11.4)

- 🚫 "Imagine if…", "the future of…", "what if we told you…" — all salesy cold-opens. *Why: Lucius describes what it does today.*
- 🚫 "Game-changer," "paradigm shift," "disrupt," "reinvent" — consultant-deck vocabulary. *Why: the brand is plainspoken.*
- 🚫 "Powered by AI," "AI-first," "GPT-powered" — implementation language leaking into marketing. *Why: Lucius is framed by what it accomplishes, never by what it runs on.*
- 🚫 "We at Lucius…" — first-person plural. *Why: Lucius is the subject. The company behind it stays off camera in product content.*
- 🚫 "Smart," "intelligent," "intuitive" as product adjectives. *Why: they describe the category, not this product. Replace with a verb + outcome.*
- 🚫 Rhetorical questions as openers. *Why: passive voice of a pitch deck. Lead with the declarative.*

---

## 3. Motion Design Principles

The site's rule ("ambient, never bouncy" — DESIGN.md §6.4) governs produced motion as well. Added rules below concern **pacing**, **easing curves**, **shot duration**, and **handoff between shots**.

### 3.1 Pacing

| Piece length | Shots (typical) | Shot length range | Longest allowed shot |
|---|---|---|---|
| Social short (≤10s) | 1–3 | 1.5–4s | 6s (end-card hold) |
| Social mid (15–30s) | 3–8 | 1–4s | 6s |
| Promo (30–60s) | 6–14 | 0.8–4s | 5s |
| Explainer (60–120s) | 10–25 | 1–5s | 6s |
| Long-form / keynote (2–5min) | 30–80 | 1–6s | 8s (setup shot only) |

**Minimum shot length is 0.8s** except inside a deliberate micro-sequence (three ≥ 0.35s shots stacked to create rhythm, capped at 3 in a row). Never cut faster than 0.35s — it reads as hype montage, which the brand rejects.

**Cadence rule.** If the cut lengths form a repeating pattern (e.g., 2s · 2s · 2s · 2s), break it by shot 5 at the latest. The pattern calcifies otherwise and the piece reads as a template.

### 3.2 Easing and durations for micro-animation

All numeric type, UI chrome, and generative motion on-screen should use these curves — they match the site's motion library.

| Purpose | Duration | Easing | Notes |
|---|---|---|---|
| Type entrance (word fade-up) | 320ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Staggered 40ms per word max |
| Type exit | 220ms | `cubic-bezier(0.4, 0, 1, 1)` | Exit is always faster than entrance |
| Card / frame fade-in | 480ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Never from full transparent — start at opacity 0.15 |
| Number count-up | 700–900ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Ease-out only; never ease-in-out on numbers |
| Background drift (ambient) | 12–40s full loop | linear | Forms the "bed," not the event |
| Shot-to-shot cross-dissolve | 180–260ms | linear | Reserve for atmospheric cuts, not hard cuts |

**Forbidden:** elastic, bounce, back-ease overshoot, anticipation holds, squash-and-stretch. Lucius never boings. If the brief asks for "playful motion," read it as "warm, slow, confident motion" — not Pixar.

### 3.3 Generative / ASCII motion

When a shot features the ASCII motion library (AsciiWhale, AsciiConstellation, AsciiSonar, AsciiWaves, AsciiTypewriter), treat it as *atmosphere, not character*:

- **Never cut on the ASCII.** It drifts underneath type or UI, it is not the subject of the cut.
- **Palette matches the shot's surface.** `ivory-orchid` / `ivory-purple` on warm ivory beds; `moss-mist` inside dark framed panels. Same rule as DESIGN.md §12.9.
- **Density ≤ 1.0 for produced media.** Heavier densities (2.3) are showcase-only — they read as decorative on social feeds and dominate the foreground.
- **Always pre-render.** Produced video exports a pre-rendered sequence (PNG or ProRes) from a longer capture. Never embed a live canvas in a video — frame drops ship.

### 3.4 Grain and texture on motion

DESIGN.md's grain variants (fine-grain, sand-dune, paper, film-35mm, newsprint, linen) apply to produced media too — as a final-pass overlay on the export, not as a per-shot filter.

| Piece type | Grain | Opacity | Blend | Rationale |
|---|---|---|---|---|
| Promo / ad | `film-35mm` | 0.18 | overlay | Warm color jitter reads as film, not noise. |
| Explainer | `fine-grain` | 0.10 | multiply | Matches the site's global baseline. |
| Keynote / long-form | `paper` | 0.15 | multiply | Editorial, not photographic. |
| Social short (square/vertical) | `fine-grain` | 0.08 | multiply | Platform compression eats grain — keep it subtle. |
| Dark-themed cut | `speckle` | 0.14 | screen | Film-highlight specks, not haze. |

Grain is always the top-most compositing layer. It sits over type, UI, and logo. The only layer above grain is a letterbox mask, if any.

### 3.5 Camera language (for motion design, not cinematography)

Produced Lucius pieces almost never use a cinematic "camera." When they do, the rules are:

- **Dolly, never pan.** Lateral moves read as cheap. A slow push on a static composition reads as intent.
- **Under 4px per second** of on-screen motion for drift / push. Faster is agitated.
- **No handheld.** No shake. No lens flare. No chromatic aberration.
- **Letterbox 2.35:1** only for keynote / long-form openers. Social and promo stay 16:9 / 9:16 / 1:1 native.

---

## 4. Shot Grammar

Most Lucius pieces — especially social — assemble from six repeatable shot types. Treat these the way DESIGN.md §4 treats components: match before inventing.

### 4.1 Type card
One sentence of SF Pro at 48–80px on an ivory surface, optionally with one serif word pulled purple. 2–4s hold. This is Lucius's thesis shot. Most pieces open or close on one.

- Background: `#E1DAC0` warm ivory or `#FDFAF1` light ivory.
- Grain: per §3.4.
- Type entrance: word stagger 40ms, 320ms fade-up.
- Optional: a 1px `#4F4726` hairline rule under an eyebrow, matching DESIGN.md §4.2.

### 4.2 Halftone portrait
Photographic footage (hands, workspace, face) passed through a halftone / dot-matrix filter. Purple halftone on ivory, or white halftone on deep-moss. No raw photography ever ships.

- Dot size: 1.2–1.8% of frame height.
- Contrast: high. Midtones collapse; the subject reads as shape.
- Hold: 1.5–3s.

### 4.3 Ambient ASCII plate
A pre-rendered ASCII motion piece (see §3.3) running full-frame or inside a rounded-corner framed panel. Usually a bed *under* the next shot, revealed by a 220ms crossfade.

### 4.4 UI inset
A single Lucius UI fragment — one message, one escalation banner, one metric card — centered on ivory with generous margin (≥ 14% frame on every side). Never a full app screenshot; always a cropped atomic unit.

- Shadow: `shadow-lg` (DESIGN.md §6.1).
- Corner radius: match the component's live radius — no rounding change for media.
- Optional: a 180ms count-up on the primary metric.

### 4.5 Quote card
Short attributed pullquote in Recoleta italic, ≤ 14 words. Author + role underneath in SF Pro 14–16px. Left rule `border-l-2 border-primary`. Same pattern as DESIGN.md §12.4.3.

### 4.6 End-card / logo card
Last 1.5–3s of every piece.

- Wordmark centered.
- One of the four approved logo-on-background pairs (DESIGN.md §2.9).
- Optional: `lucius.ai` in SF Pro 16px below, `opacity 0.6`.
- No URL slugs, no handles, no "Book demo →" button in social end-cards (social pieces route to the platform's built-in CTA).

### 4.7 Transitions between shots

| From → To | Default transition |
|---|---|
| Type card → Type card | Hard cut |
| Type card → Halftone | 180ms crossfade |
| Halftone → UI inset | Hard cut |
| UI inset → Type card | Hard cut |
| ASCII plate → anything | 220ms crossfade |
| Anything → End-card | 260ms crossfade with slight luminance lift |

Whip pans, flash-frames, RGB-split, and transitional SFX "whooshes" are all forbidden.

---

## 5. Sound

Audio is part of the brand and is subject to the same "quiet over loud" rule. Specifics:

### 5.1 Loudness

- **VO bus**: −14 LUFS integrated, −1 dBTP peak.
- **Music bed**: −20 to −22 LUFS when VO is present; −14 LUFS when alone (end-card, ambient).
- **Social mix**: export at −14 LUFS integrated (matches TikTok/IG/YT Shorts normalization).
- **Always deliver a captions-on mix.** Platform default is muted; the piece must work silent.

### 5.2 Music character

- **Instrumental only.** No vocal samples. No "oohs." No chanting.
- **Acoustic piano, nylon guitar, warm pads, low analog synth.** No EDM drops, no trap hats, no "corporate uplift" swells.
- **Tempo 70–96 BPM** for promo and explainer; up to 110 BPM for social shorts.
- **No key change mid-piece.** The brand stays in one emotional register per cut.

### 5.3 Sound design

- **One diegetic cue max** per short piece — a keyboard tap on a UI inset, a single soft chime on a metric count-up.
- **No swooshes, no risers, no impact hits.** These read as sales-video language.
- **Type-on sound** allowed only for terminal / log / code shots, at −28 LUFS peak. Mechanical keyboard samples preferred over soft membranes.
- **Silence is a legal beat.** 0.6–1.2s of total silence before a closing thesis line lands harder than any stinger.

### 5.4 Voice direction

When briefing a VO artist:

- **Tone reference:** mid-register, measured, dry. "A senior teammate explaining, not selling." Reference voices: *Ira Glass reading technical docs*, *David Attenborough reading a product brief*.
- **Pace:** 150–165 words per minute. Faster reads as hype; slower reads as luxury ad.
- **Accent:** neutral North American default; UK/European optional for keynote / long-form. No aggressive regional coloring in product voice.
- **Gender:** no default. Pick per piece; alternate across the content calendar to avoid a single implied "Lucius voice."

---

## 6. Still Imagery

Everything in a deck, social card, blog hero, OG image, or print asset.

### 6.1 Halftone treatment (canonical)

All photographic imagery of people, hands, or environments ships as halftone. See DESIGN.md §1 ("Digital ↔ Tactile"). Rules:

- **Dot pattern**: circular, not square or line. Orientation 0° (aligned to frame).
- **Dot color**: `#5538C7` Lucius Purple on ivory, or white on `#1B4038` Deep Moss. No other halftone tints.
- **Ground**: ivory `#E1DAC0` / `#FDFAF1` or deep moss `#1B4038`. Never white.
- **Contrast**: push blacks. The subject should read as silhouette before it reads as face.

### 6.2 Product stills

A product still is a cropped, atomic UI fragment on ivory, same rules as shot type §4.4. Never a browser chrome screenshot with tabs and URL bar. Never a laptop-on-desk lifestyle shot.

### 6.3 Illustration

See [`docs/design/illustration-style-guide.md`](docs/design/illustration-style-guide.md) for line-art and spot-illustration rules. The guide is canonical; this doc does not duplicate it.

### 6.4 Thumbnail / OG image

- **Size:** 1200 × 630 (OG), 1280 × 720 (YouTube), 1080 × 1080 (IG square), 1080 × 1350 (IG portrait), 1080 × 1920 (IG/TikTok vertical).
- **Headline type:** Recoleta accent + SF Pro, max 8 words on OG / thumbnail, max 5 on vertical.
- **Grain:** always on, `film-35mm` or `paper` per §3.4.
- **Logo:** small wordmark bottom-right (OG/thumbnail) or top-center (vertical). Never bigger than 8% frame height.
- **CTA in thumbnail:** none. The thumbnail's job is to earn the click; the CTA lives on the destination.

---

## 7. Typography in Motion / Produced Context

DESIGN.md §3 governs web typography. For produced media:

### 7.1 Size mapping

| Asset | Hero line | Body line | Caption |
|---|---|---|---|
| 16:9 1920×1080 | 72–96px | 28–36px | 20–24px |
| Vertical 1080×1920 | 96–140px | 36–48px | 22–28px |
| Square 1080×1080 | 64–96px | 28–36px | 20–24px |
| OG 1200×630 | 56–72px | 22–28px | 18–22px |

### 7.2 Pairing rule (same as DESIGN.md §3.4)

One serif word per headline, pulled purple. Never an entire line in Recoleta. Never two serif words. The rest of the line is SF Pro.

### 7.3 Tracking and leading

- Hero line on video: `tracking -2%`, `leading 1.02`.
- Body: `tracking 0`, `leading 1.3`.
- Supers / captions: `tracking -1%`, `leading 1.15`.

### 7.4 Number treatment

Numerics on screen (e.g., `70%`, `<2min`, `24/7`) always set in SF Pro Medium with `tabular-nums` / `lining-nums`. Never in Recoleta. Never count-up through non-integer intermediates (if the final value is `70%`, count through `12%, 38%, 61%, 70%`, not `69.7%, 70.0%`).

---

## 8. Per-Platform Format Sheet

Each platform has native constraints. The brand does not. Adapt format; never drop brand rules to match a platform's default aesthetic.

### 8.1 X / Twitter

- **Post image**: 1200×675 or 1080×1350. OG thumbnail rules (§6.4).
- **Video**: ≤2m20s native upload; aim 30–60s. Captions burned in (platform default mute).
- **Copy**: ≤ 240 chars on marketing posts; ≤ 280 on reply threads. No hashtags in body — tags read as desperate for discovery.
- **Threads**: max 7 posts. If the thesis needs 8, it's a blog post.
- **Emoji**: none in product voice. Permitted only in community / customer-win replies and never in the original post.

### 8.2 LinkedIn

- **Post image**: 1200×627 or 1080×1080.
- **Native video**: 30–90s optimal; 3min hard cap.
- **Copy**: 1,300 chars visible before "see more." Spend the first 2 lines on the thesis; never on "Excited to share…" openers.
- **Document carousel**: 10 slides max, 1080×1080 or 1080×1350 per slide. Slide 1 is the thesis; slide 10 is the end-card.
- **Hashtags**: three max, at the end, domain-specific (`#CommunityOps`, not `#AI`).

### 8.3 Instagram / TikTok (vertical)

- **Feed post**: 1080×1350 (4:5). Carousel: up to 10.
- **Reels / TikTok**: 1080×1920, 9:16. 15–60s for Reels, 20–90s for TikTok.
- **Captions**: burned in, centered 70% from top. Safe zone: avoid the bottom 20% (UI chrome) and top 12% (username + timer).
- **No trending audio.** Music per §5.2 or silent. Using a trending audio kills the quiet-confidence register.
- **Hooks in the first 1.2s.** A type card with the thesis is the standard hook. Never open on a face or a whip-pan.

### 8.4 YouTube

- **Thumbnail**: 1280×720, §6.4 rules. Never a "reaction face"; never arrows + circles.
- **Intro**: no logo stinger. Cold-open on the thesis (§4.1 type card).
- **Chapter markers**: every 60–120s on explainers ≥ 3min.
- **End screen**: last 15s, §4.6 end-card + one subscribe / related-video element. Never three cards at once.
- **Description**: first 150 chars mirror the on-page thesis. Timestamps for all chapters. Source links for every metric named.

### 8.5 YouTube Shorts / Reels / TikTok cross-cuts

When the same piece ships to all three, export **once** at 1080×1920, 30fps, −14 LUFS, captions burned in. Do not re-grade or re-cut per platform — differences in captioning layout are acceptable; differences in color or type are not.

### 8.6 Email (lifecycle / sales)

Not strictly content, but governed here for voice consistency:

- **Subject line** ≤ 42 chars, sentence case, no emoji, no "[IMPORTANT]" brackets.
- **Preheader** ≤ 85 chars, extends (not repeats) the subject.
- **Body** ≤ 120 words for outbound, ≤ 220 for product update, ≤ 450 for long-form editorial.
- **One CTA per email.** Always the same destination as the current site primary CTA ("Book demo"). Same label rules as DESIGN.md §11.3.
- **Signature**: first name + role + `lucius.ai`. No banner images, no quote-of-the-day, no social icon cluster.

---

## 9. Promo Video Structure (30–60s canonical)

The default Lucius promo follows a repeatable 5-beat arc. Deviate deliberately, not casually.

1. **Thesis (0:00–0:04)** — Type card, §4.1. One sentence. The piece's entire point. Read by VO or silent.
2. **Pain (0:04–0:14)** — Halftone portrait + type super naming the specific operational pain. Concrete, not abstract. "4:17 a.m. Wednesday. Moderator is offline. The Discord isn't."
3. **Shift (0:14–0:30)** — UI inset(s) showing Lucius acting. Metric count-up allowed here; it's the only moment a number should move on screen.
4. **Proof (0:30–0:48)** — Quote card from a real customer. §4.5. Traceable to [`docs/case-studies/`](docs/case-studies/).
5. **End-card (0:48–0:60)** — §4.6. Silence or a single ambient pad. Never a "Book demo now!" stinger.

Long-form pieces (90–180s) insert an expanded §3 — multiple UI insets, a second pullquote, a breathing beat of ambient ASCII plate — between Shift and Proof. They never add a sixth or seventh beat; they extend the middle.

### 9.1 Scripts (canonical structure)

Every script lives as a `.md` under `docs/content/scripts/` with frontmatter:

```markdown
---
title: Promo — Internal Ops 60s
length: 60
aspect: 16:9
arc: thesis-pain-shift-proof-endcard
status: draft | locked | shipped
sources:
  - docs/case-studies/<slug>.md
  - docs/growth/<doc>.md
---

## VO
Word-for-word, contractions on, one sentence per breath.

## On-screen
Shot-by-shot, matching §4 grammar.

## Supers
Every numeric / named metric, with a source citation beside it.
```

A script cannot move to `status: locked` until every metric in `Supers` has a source link. This is the content equivalent of DESIGN.md's `@theme` canon rule — no claim ships without a citation.

### 9.2 Delivery specs

| Deliverable | Codec | Resolution | Frame rate | Audio |
|---|---|---|---|---|
| Master | ProRes 422 HQ | 1920×1080 or 3840×2160 | 30 / 60 | 48kHz 24-bit stereo |
| Web H.264 | H.264 HQ | 1920×1080 | 30 | AAC 320kbps stereo |
| Social vertical | H.264 | 1080×1920 | 30 | AAC 320kbps stereo, −14 LUFS |
| OG / social still | PNG | per §6.4 | — | — |

---

## 10. Do's and Don'ts

- ✅ **Open on the thesis.** First 1.2s must state the piece's point.
- ✅ **One idea per short piece.** ≤ three for medium pieces.
- ✅ **Source every metric.** Every digit on camera has a citation.
- ✅ **Grain everything.** Final-pass overlay per §3.4.
- ✅ **Captions always on-burn** for social. Platform default is muted.
- ✅ **End on the wordmark,** on an approved logo pair (DESIGN.md §2.9).

- 🚫 **No hype montage.** No ≤0.35s cuts outside a deliberate micro-sequence.
- 🚫 **No raw photography.** Halftone pass always.
- 🚫 **No trending audio.** Brand music bed per §5.2 or silent.
- 🚫 **No exclamation in copy or VO.** Including end-cards.
- 🚫 **No "Book demo now!"** stinger. The end-card is calm.
- 🚫 **No stock vocabulary:** game-changer, disrupt, leverage, revolutionize, unlock, supercharge, seamless, AI-powered.
- 🚫 **No full browser screenshot.** UI insets only.
- 🚫 **No logo stinger at intro.** Cold-open on thesis.
- 🚫 **No emoji in product voice.** Reserved for community reply surfaces only.
- 🚫 **No rhetorical question opener.** "What if your AI…" is the content equivalent of a pitch deck.

---

## 11. LLM Prompt Guide

When drafting content with an LLM — scripts, captions, social posts, thumbnail copy — load these anchors into the prompt before writing:

1. **Voice anchor**: DESIGN.md §11 + this doc §2. Paste the register table.
2. **Brand facts**: current metric set from [`docs/growth/`](docs/growth/). Never ask the model to invent numbers.
3. **Forbidden vocabulary**: §10 ban list.
4. **Shot grammar**: §4 if a video / motion piece.
5. **Platform rules**: §8 for the target surface.

### 11.1 Skeleton prompt

```
You are drafting a {{platform}} piece for Lucius, an AI teammate for community ops.

Voice: plainspoken, dry, quietly confident. No exclamations. No "AI-powered." No rhetorical questions. Second-person, active verbs. Metrics only if I provide them.

Structure: {{§4 shot grammar for video / §8 rules for a static post}}

Constraints:
- Max {{char / word count}} per §8.
- One thesis, one idea, one CTA.
- Source every metric against {{pasted growth-doc excerpt}}.

Draft three variants. For each, cite which sentence is the thesis, which is the proof, which is the close.
```

### 11.2 Review heuristic

After the model drafts, run the piece against this checklist:

- [ ] Thesis stated in the first 1.2s (video) or first line (text).
- [ ] Every metric on camera is traceable to a linked source.
- [ ] No word from §10 ban list.
- [ ] Voice matches register for the platform per §2.1.
- [ ] Shot grammar pulls from §4 only, no invented frame types.
- [ ] End-card / final line matches §4.6 / §2.5 rules.
- [ ] Caption-on-mute passes — piece works silent.

Failing any row → rewrite the row, not the whole piece.

---

## 12. Production Checklist (pre-ship)

Before a piece ships to any platform:

1. **Source audit** — every metric, quote, or claim linked in the script frontmatter (§9.1). No orphan numbers.
2. **Voice pass** — read aloud once; strike anything that reads as marketing.
3. **Motion pass** — cut lengths logged; no cadence of identical intervals for 5+ shots.
4. **Grain pass** — final overlay applied at export, not per shot.
5. **Audio pass** — VO at −14 LUFS, music ducked to −20 under VO, caption-on-mute mix rendered.
6. **Caption pass** — burned-in captions reviewed for §2.3 rules; safe zones respected per §8.
7. **Logo pass** — wordmark and lockup against an approved pair (DESIGN.md §2.9).
8. **Platform pass** — export specs for every target platform per §8 and §9.2.
9. **Legal pass** — customer logos and quotes have written permission in [`docs/legal/`](docs/legal/).
10. **Accessibility pass** — contrast ≥ AA on every typographic frame, captions on every video, transcript published alongside.

A piece with any unchecked row does not ship. No exceptions for launch pressure — a delayed piece is recoverable; a voice-breaking piece isn't.

---

## Verification stamp

This doc is a **style and content constitution**, not a per-asset spec. It extends and depends on DESIGN.md for every color, type, and voice rule; it governs the production-only concerns that DESIGN.md does not.

**Anchored to source on 2026-04-15:**
- [x] Voice register table extends DESIGN.md §11 without contradiction.
- [x] Grain variants (§3.4) match the set defined in [`src/components/effects/GrainOverlay.tsx`](src/components/effects/GrainOverlay.tsx) and [`grain-presets.ts`](src/components/effects/grain-presets.ts).
- [x] ASCII motion palette / density rules (§3.3) match DESIGN.md §12.9 and [`src/components/motion/palettes.ts`](src/components/motion/palettes.ts).
- [x] Logo-on-background pairs (§4.6, §6.4) pull from DESIGN.md §2.9, not reinvented.
- [x] CTA labels (§8.6) match DESIGN.md §11.3.
- [x] Claim-discipline rule (§2.4) tied to `docs/case-studies/` and `docs/growth/` as the only citable sources.

*Document version: 1.0 — companion to DESIGN.md v1.1. Review cadence: quarterly, or whenever a new content surface (new platform, new format) is added.*
