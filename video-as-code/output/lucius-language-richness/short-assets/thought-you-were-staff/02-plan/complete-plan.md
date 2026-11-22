# Complete Plan

## Asset Summary

- Case slug: lucius-language-richness
- Asset slug: thought-you-were-staff
- Aspect ratio: 16:9
- Duration target: 8.8s

## Persistent Constraints

### Brand Constraints

- Color roles: Warm Ivory is the field, Lucius Purple anchors the Lucius device, Lavender Mist and Orchid Bloom stay atmospheric.
- Type roles: SF Pro drives all device UI, message copy, typing states, and proof chips; Recoleta appears only in the final proof sentence.
- Device rules: Both phones must read as real devices with bezels, camera cutouts, glass, and depth.
- Background rules: One full-bleed stage with gentle atmosphere and no page grammar.
- Graphic language: Device choreography, not landing page, not dashboard, not service strip.
- Motion tone: Cinematic, restrained, readable, and social-first.
- Prohibited patterns: Discord chrome, full-page chat layout, metric dashboard, footer proof bar, literal tipping copy.

### Base Motion Constraints

- onePrimaryMotionPerScreen: true
- lessIsMore: true
- minimalCopy: true
- noTextOverlap: true
- singleProofPath: true
- quietlyConfidentMotion: true

## Style Mapping

- Color roles:
  - `Warm Ivory #E1DAC0` for the field
  - `Lucius Purple #5538C7` for the Lucius phone accents and final brand resolve
  - `Lavender Mist #BAB2FF` and `Orchid Bloom #B268D8` for light atmosphere only
  - deep warm neutrals for text, bezels, and shadows
- Type roles:
  - SF Pro for all chat, headers, proof chip, composer states, and device UI
  - Recoleta for the final resolve sentence only
- Depth rules:
  - devices use soft edge highlights and layered shadows
  - no card stack language elsewhere
- Spacing rules:
  - both phones occupy roughly half the width
  - outer edges are cropped by frame
  - inner edges face center with a slight perspective tilt
  - proof chip lives near the center seam only during screen 5
- Background rules:
  - full-bleed only
  - one calm atmosphere field
  - no independent page modules
- Motion rules:
  - root preview loops the full sequence
  - `?screen=1..6` freeze the six review states
  - use one primary motion per screen:
    - send
    - answer generation
    - praise send
    - reveal
    - squeeze proof
    - logo resolve
- Prohibited patterns:
  - big headline panels
  - footer bars
  - service strip graphics
  - hero sections
  - literal dashboard proofing

## Screens

### Screen `screen-01-question-send`

- Goal: Establish the dual-phone conversation as already alive and credible.
- UI surface: Full-bleed Lucius stage with two half-screen phone frames.
- Layout:
  - place the Lucius phone on the left with subtle brand tinting
  - place the user phone on the right with a more neutral surface
  - show real chat histories already in both phones at low prominence
  - activate the right composer at the bottom of the right phone
- Background:
  - Warm Ivory field
  - soft off-center atmosphere behind both devices
  - no page scaffolding
- Copy:
  - `Also, your product is really good. Why did you build it?`
  - supporting chat chrome only if needed for realism
- Primary motion: The right-side message types and sends.
- Motion sequence:
  - cursor blinks in right composer
  - copy types on
  - bubble lifts into thread
- Proof element:
  - the exchange feels like a live support continuation
- Required assets:
  - Lucius logo assets
  - Recoleta font
  - SF Pro stack
- Timing hint: `1.45s`

### Screen `screen-02-lucius-answer`

- Goal: Make Lucius's response feel specific and teammate-like.
- UI surface: Same dual-phone stage with emphasis leaning left.
- Layout:
  - keep the user's question visible in the right phone
  - activate the left composer or status line with `Thinking...`
  - stream or type the Lucius answer into the left thread
- Background:
  - same stage
  - subtly strengthen Lucius purple emphasis on the left
- Copy:
  - `Haha, thank you. We kept seeing the same support questions, so we built the product we wished we'd had.`
- Primary motion: The Lucius answer generates into the left thread.
- Motion sequence:
  - thinking dots appear
  - reply bubble generates
  - message settles
- Proof element:
  - Lucius sounds human and specific, not templated
- Required assets:
  - Lucius logo assets
  - SF Pro stack
- Timing hint: `1.75s`

### Screen `screen-03-human-assumption`

- Goal: Prove the user now assumes they are talking to a real support person.
- UI surface: Same dual-phone stage.
- Layout:
  - hold the Lucius answer on the left
  - reactivate the right composer
  - send a praise-driven follow-up in the right phone
- Background:
  - same stage
  - no new modules
- Copy:
  - `You've been incredibly helpful. What's your name? I want to tell your team.`
- Primary motion: The right-side praise message types and sends.
- Motion sequence:
  - right composer activates
  - text types on faster than screen 1
  - praise bubble enters
- Proof element:
  - the user clearly treats Lucius like a human teammate
- Required assets:
  - SF Pro stack
- Timing hint: `1.35s`

### Screen `screen-04-lucius-reveal`

- Goal: Land the reveal cleanly while staying inside the chat rhythm.
- UI surface: Same stage with the left device now more obviously Lucius-owned.
- Layout:
  - keep the praise bubble readable on the right
  - animate a short pause on the left
  - reveal the Lucius reply bubble
  - slightly strengthen Lucius identity in the left header during or right after the reply
- Background:
  - same stage
  - a restrained left-side aura only
- Copy:
  - `I'm Lucius, actually. Not a human agent, but thank you.`
- Primary motion: The Lucius reveal message appears.
- Motion sequence:
  - brief thinking hold
  - reveal bubble enters
  - brand identifiers on the left become clearer
- Proof element:
  - the reveal is explicit without breaking tone
- Required assets:
  - Lucius logo assets
  - SF Pro stack
- Timing hint: `1.15s`

### Screen `screen-05-wow-shift-proof`

- Goal: Let the user reaction and no-handoff proof resolve together through choreography.
- UI surface: Same stage transitioning into a left-dominant frame.
- Layout:
  - keep reveal context visible
  - right composer changes to `Thinking...`
  - `Wow.` appears in the right thread
  - center seam hosts a compact chip with `0 handoff requests`
- Background:
  - same stage
  - motion energy concentrated through the seam
- Copy:
  - `Thinking...`
  - `Wow.`
  - `0 handoff requests`
- Primary motion: The right phone is squeezed off-screen while the left phone takes center and the proof chip lands.
- Motion sequence:
  - right composer changes state
  - `Wow.` appears
  - right device moves right
  - left device slides center
  - proof chip resolves between them
- Proof element:
  - there was no transfer to a human
  - the reveal still stays inside one conversation arc
- Required assets:
  - SF Pro stack
- Timing hint: `1.55s`

### Screen `screen-06-logo-resolve`

- Goal: Finish on Lucius, not on chat UI.
- UI surface: Centered Lucius device resolving into Lucius brand lockup.
- Layout:
  - centered device zooms toward camera
  - device dissolves into the Lucius mark and wordmark
  - final proof sentence rises in below
- Background:
  - same field
  - calmest state
  - minimal atmosphere
- Copy:
  - `Support that feels human. No handoff required.`
- Primary motion: The centered Lucius device resolves into the logo.
- Motion sequence:
  - center push-in
  - logo resolve
  - proof sentence slides up softly
- Proof element:
  - the final line inherits both the human-feeling and no-handoff claims
- Required assets:
  - Lucius logo assets
  - Recoleta font
  - SF Pro stack
- Timing hint: `1.55s`

## Implementation Notes

- Recreate `projects/short-asset-thought-you-were-staff` as a minimal React/Vite project.
- Root route autoplays the whole animation loop.
- `?screen=1..6` freeze the six review states using fixed timeline timestamps.
- Build the stage as a motion composition in code, not as a page layout.
- Draw the phones directly in code and CSS instead of relying on external device mockup files.

## Acceptance Checks

- First glance reads as two devices in conversation, not as a page.
- Screen 2 makes the Lucius answer feel naturally human.
- Screen 3 clearly shows the user assuming Lucius is a person.
- Screen 5 clearly lands both `Wow.` and `0 handoff requests` while the devices squeeze apart.
- Screen 6 clearly resolves to Lucius before the proof sentence becomes the secondary read.
