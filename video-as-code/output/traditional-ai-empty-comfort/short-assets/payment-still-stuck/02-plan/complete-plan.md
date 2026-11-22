# Complete Plan

- Asset slug: `payment-still-stuck`
- Aspect ratio: `16:9`
- Duration target: `9s`

## Persistent Constraints

### Brand Constraints

- Color roles: off-brand assistant UI, strong contrast on payment failure, Lucius purple only in restrained close
- Type roles: one headline hierarchy, sans-serif negative example, minimal support labels
- Radius rules: soft consistent rounded corners across all UI surfaces
- Background rules: warm neutral background with subtle depth, no loud spectacle
- Graphic language: clean SaaS cards, quiet grids, minimal chrome
- Motion tone: quietly confident, readable, ending in dead-stop proof
- Prohibited patterns: no flashy AI magic, no text overlap, no competing motions

### Base Motion Constraints

- onePrimaryMotionPerScreen: true
- lessIsMore: true
- minimalCopy: true
- noTextOverlap: true
- singleProofPath: true
- quietlyConfidentMotion: true

## Style Mapping

- Color roles: use neutral slate/ivory surfaces, payment error reds, restrained Lucius purple in the closing tag
- Type roles: large single headline, compact uppercase metadata, short body copy only
- Radius rules: rounded cards and bubbles with one coherent radius family
- Spacing rules: generous whitespace between headline, chat card, and payment proof surface
- Background rules: soft warm gradient with subtle grid texture
- Motion rules: one dominant motion per screen, support transitions only, dead-stop final hold
- Prohibited patterns: no parallel hero motions, no crowded chat stacks, no meme styling

## Screens

### Screen `screen-01-problem`

- Goal: make the money-related failure obvious at first glance
- UI surface: community support chat
- Layout: left-weighted complaint card with minimal surrounding UI chrome
- Background: warm neutral canvas with subtle grid
- Copy: `Payment still fails after 3 days.`
- Primary motion: complaint card slides in and settles
- Motion sequence: complaint enters, payment-failed badges settle, everything else stays quiet
- Proof element: `Payment failed` and `3 days blocked`
- Required assets: generic support UI shell, error badge styling
- Timing hint: `2.2s`

### Screen `screen-02-empty-comfort`

- Goal: show polished reassurance without useful action
- UI surface: assistant reply bubble in the same chat
- Layout: complaint remains readable but secondary while one reply bubble becomes focal
- Background: unchanged from screen 01 to preserve continuity
- Copy: `We've received your issue.`
- Primary motion: assistant comfort bubble expands softly into view
- Motion sequence: reply expands, soft glow lingers, all other elements remain static
- Proof element: the reply contains no real fix or operational next step
- Required assets: support AI reply styling
- Timing hint: `2.0s`

### Screen `screen-03-fake-resolution`

- Goal: escalate frustration with a false `solved` signal
- UI surface: quick user pushback plus reply state
- Layout: compact exchange with one dominant solved badge and reply card
- Background: same chat environment, slightly tighter crop
- Copy: `It says solved.`
- Primary motion: the false solved state lands abruptly
- Motion sequence: user pushback appears quickly, solved state snaps in, then holds
- Proof element: `Resolved` appears before any real product change
- Required assets: resolved badge styling
- Timing hint: `2.1s`

### Screen `screen-04-proof`

- Goal: prove the product is still blocked after the fake resolution
- UI surface: product payment UI
- Layout: large payment panel dominates the frame
- Background: warmer neutral backdrop with chat removed from focus
- Copy: `Still stuck.`
- Primary motion: hard cut into the payment panel followed by dead-stop hold
- Motion sequence: cut to payment panel, spinner continues briefly, blocked state settles and holds
- Proof element: `Still failing`, `Blocked`, and `Retry disabled`
- Required assets: payment panel UI, status badge styling
- Timing hint: `2.7s`

## Implementation Notes

- Keep the negative assistant visually competent but not Lucius-branded.
- Reserve the Lucius close for the final edge of the piece only.
- The payment panel must dominate the final proof screen and remain readable in silence.

## Acceptance Checks

- Every screen has one primary motion only.
- No text overlaps at `16:9`.
- The final proof screen is undeniable at first glance.
- Brand constraints stay visible in color, type, radius, background, and motion tone.
