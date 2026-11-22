# Screen Build Notes

- Screen id: `screen-01-payment-pain`
- Build status: `implemented`
- Implementation target:
  - `projects/short-asset-ai-heavy-catch-you/`
- Reusable template source:
  - `templates/project-bootstrap/discord-ui-clone-template/`

## What was implemented

- Full Discord-style server rail
- Channel sidebar
- Header controls
- Message feed
- Input row
- Responsive behavior and visual states from the reference clone CSS
- Fake generic support-community content replaced the original brand-specific data
- Surface colors, gray scale, and active states were tightened to feel closer to real Discord
- The page was simplified to a medium density level for cleaner reuse
- The channel rail layout was changed from a stretching grid to a vertical flow, removing the odd blank block in the upper channel section
- Left-side surfaces were darkened again to move closer to Discord's desktop feel
- Banner art and panel seams were made subtler so the overall material quality feels less like a design clone and more like a real app capture
- The channel rail header was simplified into a real Discord-style guild header instead of a decorative banner block
- The center stage was converted from a welcome page into a thread-style message view with a bot reply card and a real composer bar
- The header tool area was refined with larger icons, tighter spacing, and a real search-field shape
- Channel text hierarchy and active-row treatment were tuned closer to Discord desktop
- The bot reply surface was moved back to a native dark system panel instead of a tinted material treatment
- The current project was upgraded from a reusable interactive baseline into a true scene-01 playback surface
- Screen 01 now auto-types the complaint inside the Discord composer, auto-presses Send, inserts the user message into the thread, and streams the bot reply in place
- The template was intentionally left untouched in this pass so the reusable Discord baseline stays clean
- The current project now continues into the next thread beat inside the same Discord view: four follow-up messages appear one by one with short pauses instead of streaming
- The second beat keeps the interface static and uses only staged message arrivals to preserve the single-path reading flow
- A third beat now follows in the same thread: the user snaps with an angry message and Support Bot still answers with another useless line, again using spaced message arrivals instead of streaming
- The message area is now a fixed internal viewport again, anchored to the bottom so new arrivals push older messages upward inside the thread instead of stretching the page itself
- After the third beat's final AI line finishes appearing, the page now enters a fully static 1-second silence beat with the composer blurred so nothing on screen keeps moving
- The scene container itself is now hard-locked to the viewport with a `minmax(0, 1fr)` middle row, so only the message viewport can scroll and the composer should no longer get pushed out of frame
- A fourth beat now follows the 1-second silence: a Lucius Purple brand stage takes over the full screen with a ring-like violet cover transition, a centered white Lucius logo mark, and five AI-noise cards redrawn with approved Lucius palette tokens
- The fourth beat uses Lucius brand-role typography: `SF Pro` for noise cards and `Recoleta` only for the final line `Clear the AI noise.`
- The fourth beat keeps one primary motion only: the logo mark tightens inward, pulses outward, and the surrounding cards clear in one unified response without glow, neon, or explosive effects
- The fourth beat was slowed down for readability: the purple takeover, logo pulse, and card clear all now play on a more deliberate timing
- The brand cards now enter one by one before the pulse, and the card field was expanded from 5 to 8 cards with a denser ring while still preserving clear space around the Lucius mark
- The fourth beat was revised again so the cards appear first, the Lucius mark enters only after the card field is established, then the stage holds for two full seconds before the unified clear
- Card positions were tightened inward to feel denser and more pressurized without breaking the Lucius logo clear-space rule
- The brand cards were tightened inward again and their entrance was changed from a simple fade to a softer float-in with upward drift and blur reduction
- The final resolve now bumps the Lucius logo upward as the line `Clear the AI noise.` comes in underneath, instead of leaving the logo fixed in place
- The fourth beat now uses a much denser message field with twenty tightly packed AI-noise cards, driven by explicit stage coordinates so the purple curtain feels more saturated without violating the Lucius mark safety zone
- The Discord composer no longer relies on a read-only field during autoplay, so the typing cursor can remain visible while the complaint is being entered
- Scene two and scene three message spacing was slowed down and the staged message reveal was softened so new messages land with clearer rhythm instead of feeling cramped or abrupt
- Message viewport pinning now waits for the next animation frame before snapping to the bottom, which reduces the feeling of rows catching or jumping as fresh messages arrive
- The autoplay send action now uses a pure black recording cursor that moves onto the Send button and presses it, based on the timing pattern from `projects/demo-app` instead of an instant state jump
- A new payment-failure scene now sits between the Discord escalation and the Lucius brand reveal: the user cuts to a neutral product payment page, the same black recording cursor clicks `Pay now`, the CTA moves through `Processing...`, an inline error appears, the page holds for `1.2s`, and only then does the Lucius purple ring transition take over into the existing brand clear-out
- The payment-failure beat was slowed down across every step: the page settles longer before the click, the `Pay now` cursor press now plays on a slower timing, the `Processing...` state lingers longer, the error reveal breathes more, and the post-error hold is extended so the failed state reads clearly before the Lucius transition
- The recording cursor language was updated from a solid black pointer to a white-fill, black-stroke pointer so both the Discord send click and the light payment-page click remain easy to read

## Current intent

- Use this screen as the reusable baseline for future Discord-based short-asset scenes
- Review the structural fidelity first
- Only after approval should scene-specific complaint copy and motion be layered on top
