# Script Outline

## Asset Summary

- Case slug: lucius-language-richness
- Asset slug: thought-you-were-staff
- Single takeaway: Lucius can sound human enough to be mistaken for a teammate, and the conversation never needs a human handoff.
- Hook: Open on two live phone frames already facing each other and let the right-side message type in front of the audience.

## Persistent Constraints

### Brand Constraints

- Color roles: Warm Ivory is the field, Lucius Purple anchors the Lucius device, Lavender Mist and Orchid Bloom stay atmospheric.
- Type roles: SF Pro drives all chat and state text; Recoleta appears only in the final resolve sentence.
- Device rules: Both phones must read as real devices, not cards or modules.
- Background rules: One full-bleed stage, no page grammar, no dashboard framing.
- Graphic language: Device choreography, not landing page, not service strip, not full chat UI.
- Motion tone: Cinematic, restrained, readable, and social-first.
- Prohibited patterns: Discord chrome, footer proof bars, full-page chat layouts, literal tipping copy, sci-fi reveal effects.

### Base Motion Constraints

- onePrimaryMotionPerScreen: true
- lessIsMore: true
- minimalCopy: true
- noTextOverlap: true
- singleProofPath: true
- quietlyConfidentMotion: true

## Screens

### Screen `screen-01-question-send`

- Purpose: Establish the dual-device premise and make the support conversation feel live.
- UI surface: Full-bleed Lucius stage with two half-screen phones already in frame.
- Layout snapshot: Left phone is Lucius, right phone is the user; both are cropped by the outer frame edges and angled toward center.
- Background: Warm Ivory field with restrained Lucius atmosphere and subtle depth.
- Key elements: Two phone frames, live headers, right-side composer, user message bubble.
- Primary motion: The right-side message types and sends.
- Copy hint: `Also, your product is really good. Why did you build it?`
- Duration hint: `1.45s`

### Screen `screen-02-lucius-answer`

- Purpose: Let Lucius's answer land as a natural, human-feeling response.
- UI surface: Same dual-phone stage with focus shifted slightly toward the Lucius device.
- Layout snapshot: The user message now sits in the right phone history; the left phone composer shows a thinking state before the Lucius reply appears.
- Background: Same stage, slightly calmer on the user side.
- Key elements: Lucius composer thinking state, Lucius reply bubble, subtle left-side brand presence.
- Primary motion: The Lucius answer generates into view.
- Copy hint: `Haha, thank you. We kept seeing the same support questions, so we built the product we wished we'd had.`
- Duration hint: `1.75s`

### Screen `screen-03-human-assumption`

- Purpose: Show the user assuming Lucius is a real support person.
- UI surface: Same dual-phone stage with right phone reactivated.
- Layout snapshot: The left phone now holds Lucius's answer; the right phone composer becomes active and sends a praise-driven follow-up.
- Background: Same stage, maintaining conversational balance.
- Key elements: Right-side composer, right-side praise bubble, held earlier messages.
- Primary motion: The user praise message types and sends.
- Copy hint: `You've been incredibly helpful. What's your name? I want to tell your team.`
- Duration hint: `1.35s`

### Screen `screen-04-lucius-reveal`

- Purpose: Deliver the reveal without breaking the conversational tone.
- UI surface: Same dual-phone stage with left device now clearly leading.
- Layout snapshot: The right-side praise sits visible; the left phone composer pauses, then resolves into a reveal reply.
- Background: Same stage with a subtle Lucius emphasis strengthening on the left.
- Key elements: Left composer thinking state, reveal reply bubble, slightly stronger Lucius header treatment.
- Primary motion: The Lucius reveal appears.
- Copy hint: `I'm Lucius, actually. Not a human agent, but thank you.`
- Duration hint: `1.15s`

### Screen `screen-05-wow-shift-proof`

- Purpose: Let the user react while the no-handoff proof resolves through motion.
- UI surface: Same dual-phone stage transitioning into a left-led composition.
- Layout snapshot: The right composer shifts from `Thinking...` to `Wow.` while the right phone is squeezed outward and a compact proof chip appears between the two devices.
- Background: Same stage with motion focused through the center seam.
- Key elements: Right-side `Thinking...`, `Wow.`, squeeze transition, `0 handoff requests` proof chip.
- Primary motion: The right phone exits as the left phone takes center and the proof chip lands.
- Copy hint: `Wow.` and `0 handoff requests`
- Duration hint: `1.55s`

### Screen `screen-06-logo-resolve`

- Purpose: Resolve the animation into Lucius branding without turning into a page.
- UI surface: Centered Lucius device dissolving into the Lucius mark / wordmark.
- Layout snapshot: The left device now owns the frame and zooms forward; the final proof sentence rises in below the mark.
- Background: Same field, stripped back to the calmest brand state.
- Key elements: Centered Lucius device, Lucius logo resolve, final proof sentence.
- Primary motion: The centered Lucius device resolves into the Lucius logo.
- Copy hint: `Support that feels human. No handoff required.`
- Duration hint: `1.55s`

## Non-goals

- Do not rebuild a literal Lucius product page.
- Do not let the phones flatten into static poster cards.
- Do not replace the reveal with a metric-only ending.
- Do not add any extra proof points beyond the reveal and no-handoff close.
