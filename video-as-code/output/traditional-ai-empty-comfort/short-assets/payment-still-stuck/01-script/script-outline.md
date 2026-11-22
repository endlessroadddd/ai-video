# Script Outline

- Asset slug: `payment-still-stuck`
- Single takeaway: Soft AI reassurance is useless when the actual payment problem is still unresolved.
- Hook: Show the blocked payment problem first, then expose the empty comfort, then prove the product is still stuck.

## Persistent Constraints

### Brand Constraints

- Color roles: off-brand neutral chat UI, stronger contrast on payment failure, Lucius purple only as restrained closing-tag quality cue
- Type roles: sans-serif only in the negative example, one clear headline hierarchy, restrained Lucius closing tag
- Radius rules: soft, consistent rounded corners across chat and payment surfaces
- Background rules: warm neutral background with quiet depth, not neon or comedy framing
- Graphic language: clean SaaS UI, minimal chrome, no decorative clutter
- Motion tone: quietly confident and readable, ending in a dead-stop proof hold
- Prohibited patterns: no flashy AI magic, no overlapping text, no competing animated elements

### Base Motion Constraints

- onePrimaryMotionPerScreen: true
- lessIsMore: true
- minimalCopy: true
- noTextOverlap: true
- singleProofPath: true
- quietlyConfidentMotion: true

## Screens

### Screen `screen-01-problem`

- Purpose: establish the payment failure and the three-day delay immediately
- UI surface: community support chat
- Layout snapshot: a left-aligned complaint bubble dominates the chat column, with a muted timestamp and minimal thread chrome around it
- Background: warm neutral support surface with soft depth and restrained UI framing
- Key elements: complaint bubble with payment-failure text, muted support thread chrome, small timestamp marker
- Primary motion: the user complaint card enters and locks attention
- Copy hint: `Payment still fails after 3 days.`
- Duration hint: `2.2s`

### Screen `screen-02-empty-comfort`

- Purpose: show the assistant replying with comfort instead of action
- UI surface: assistant reply bubble in the same community chat
- Layout snapshot: a single assistant reply bubble sits directly under the complaint and takes over the visual center with one short reassurance line
- Background: the same warm neutral chat surface remains still so the reply bubble is the only moving focus
- Key elements: assistant avatar marker, soft reply bubble, short reassurance line
- Primary motion: the empty comfort reply expands softly into view
- Copy hint: `We've received your issue.`
- Duration hint: `2.0s`

### Screen `screen-03-fake-resolution`

- Purpose: escalate frustration with a fake solved message
- UI surface: quick user pushback plus assistant reply
- Layout snapshot: a compact resolved status chip lands above a short closing reply, visually shutting down the thread
- Background: the chat frame stays calm and static so the resolved state reads as the only active event
- Key elements: resolved status chip, short closing reply, collapsed thread boundary
- Primary motion: the false `resolved` state lands with abrupt closure
- Copy hint: `It says solved.`
- Duration hint: `2.1s`

### Screen `screen-04-proof`

- Purpose: prove the payment flow is still blocked
- UI surface: product payment UI
- Layout snapshot: a centered payment panel fills most of the frame with the amount, action area, and a stuck loading state clearly visible
- Background: warm neutral product surface with a quiet gradient and no competing accents, so the blocked payment state dominates
- Key elements: payment amount row, stuck loading spinner, disabled or blocked action area
- Primary motion: hard cut into the stuck payment panel, then dead-stop hold
- Copy hint: `Still stuck.`
- Duration hint: `2.7s`

## Non-goals

- Do not make the piece comedic or meme-like.
- Do not let comfort copy feel like actual support value.
- Do not make the broken assistant look like Lucius.
