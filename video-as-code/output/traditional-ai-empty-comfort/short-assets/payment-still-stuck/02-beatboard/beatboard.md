# Beatboard

## Asset Metadata

- Case slug: `traditional-ai-empty-comfort`
- Asset slug: `payment-still-stuck`
- Duration target: `9s`
- Aspect ratio: `16:9`
- Sound mode: `silent-first`
- Brand role: `closing-tag`

## Sequence Goal

- Show the user asking for payment help, getting empty comfort instead of action, then prove the product is still blocked.

## Beats

### Beat `beat-01-problem`

- Purpose: Establish the high-stakes user complaint immediately.
- Visual state:
  - Community support chat is open.
  - The user's complaint is visible with emphasis on payment and three days of failure.
- Motion cue:
  - User message slides in and key pain phrases gain subtle emphasis.
  - Nearby support clutter stays secondary.
- Copy line: `Payment still fails after 3 days.`
- Duration hint: `2.2s`
- Proof binding:
  - `payment failed`
  - `3 days`
- Match type: `fresh-design`
- Asset binding IDs:
- Template binding IDs:
- Fallback implementation:
  - Build a generic community support panel with one dominant complaint card and restrained UI chrome.

### Beat `beat-02-empty-comfort`

- Purpose: Show the assistant giving comfort without help.
- Visual state:
  - The AI support reply appears polished, friendly, and useless.
  - The reply centers on reassurance rather than action.
- Motion cue:
  - Reply card expands softly into view.
  - Key reassurance language lingers longer than the useful information because there is no useful information.
- Copy line: `We've received your issue.`
- Duration hint: `2.0s`
- Proof binding:
  - `issue already received`
- Match type: `fresh-design`
- Asset binding IDs:
- Template binding IDs:
- Fallback implementation:
  - Keep the assistant response visually competent but semantically empty.

### Beat `beat-03-fake-resolution`

- Purpose: Escalate the frustration by showing a fake resolution.
- Visual state:
  - The user asks for an actual fix.
  - The assistant replies that the issue is solved.
- Motion cue:
  - User pushback appears quickly.
  - The "problem solved" reply lands with a false sense of closure.
- Copy line: `It says solved.`
- Duration hint: `2.1s`
- Proof binding:
  - `problem solved`
- Match type: `fresh-design`
- Asset binding IDs:
- Template binding IDs:
- Fallback implementation:
  - Use a tight exchange where the fake resolution feels abrupt and obviously premature.

### Beat `beat-04-proof`

- Purpose: Prove that the product is still blocked.
- Visual state:
  - Cut to the payment UI.
  - The button or payment state is still stuck, loading, or failed.
- Motion cue:
  - Hard cut away from chat into product UI.
  - Motion slows into a dead-stop hold on the unresolved state.
- Copy line: `Still stuck.`
- Duration hint: `2.7s`
- Proof binding:
  - `still stuck`
  - `payment failed`
- Match type: `fresh-design`
- Asset binding IDs:
- Template binding IDs:
- Fallback implementation:
  - Build a credible checkout or payment panel where the blocked state is undeniable at first glance.
