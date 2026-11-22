---
{
  "id": "material-library/motion/recording-blank-overlay",
  "title": "Recording Blank Overlay",
  "category": "motion",
  "summary": "Soft matte clear-screen overlay used between heavier recording stages before the next title or proof arrives.",
  "agentGoal": "Let the Agent reuse Recording Blank Overlay when a script needs a clean screen reset between recording stages without inventing a new matte transition.",
  "whenToUse": [
    "Use when the underlying recording scene must be fully cleared before the next overlay lands.",
    "Use when you need a neutral visual breath between proof-heavy stages."
  ],
  "avoidWhen": [
    "Avoid when the next beat needs readable copy, not just a reset.",
    "Avoid when a more branded or more expressive transition is required."
  ],
  "keywords": [
    "blank overlay",
    "matte wipe",
    "recording transition",
    "clean screen",
    "reset"
  ],
  "matchKeywords": [
    "clean screen reset",
    "recording matte wipe",
    "neutral overlay clear",
    "空白遮罩过渡",
    "录屏清屏转场",
    "中性 matte reset"
  ],
  "inputProps": [
    "durationMs",
    "phase"
  ],
  "sourceProjects": [
    "projects/demo-app"
  ],
  "previewRef": "material-library/showcase#recording-blank-overlay",
  "stability": "beta",
  "implementationRef": "material-library/src/motion/recording-overlays.tsx",
  "sceneTypes": [
    "transition",
    "overlay",
    "clean-screen"
  ],
  "styleFamilies": [
    "lucius-light",
    "recording-overlay"
  ],
  "editableParts": [
    "duration",
    "phase"
  ],
  "visualSignature": [
    "Full-frame soft matte that clears the existing screen without adding new copy or chrome.",
    "Reads as a neutral breath or wipe, not as a content-bearing card.",
    "Most natural on recording clean-screen transition, neutral reset, and between-stage matte surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the current screen must disappear cleanly before the next stage begins.",
    "Best when the beat needs visual breathing room but not a new statement.",
    "Choose it when neutrality matters more than branding or proof."
  ],
  "compositionPatterns": [
    "Use it before intertitle or outcome overlays so the next layer starts on a clean field.",
    "Keep it short and transitional; it should not feel like a new scene by itself.",
    "Usually staged next to Recording Intertitle Overlay, Recording Outcome Overlay, and Recording Route Shell."
  ],
  "pairWithIds": [
    "material-library/motion/recording-intertitle-overlay",
    "material-library/motion/recording-outcome-overlay",
    "material-library/surfaces/recording-route-shell"
  ],
  "preferInsteadIds": [
    "material-library/motion/recording-intertitle-overlay"
  ],
  "dos": [
    "Use Recording Blank Overlay as a bridge, not as a destination scene.",
    "Adjust duration first while keeping the matte color and clean-screen behavior stable."
  ],
  "donts": [
    "Do not put major copy inside this overlay.",
    "Do not stretch it so long that it feels like dead air."
  ],
  "scriptRecipe": [
    "Clear the current screen.",
    "Hold only long enough to reset the viewer's eye.",
    "Hand off immediately into intertitle, outcome, or the next proof layer."
  ],
  "narrativeRole": "transition",
  "scriptTriggersEn": [
    "clean screen reset",
    "recording matte wipe",
    "neutral overlay clear"
  ],
  "scriptTriggersZh": [
    "录屏清屏转场",
    "空白遮罩过渡",
    "中性 matte reset"
  ],
  "negativeTriggersEn": [
    "copy-bearing transition",
    "brand reveal"
  ],
  "negativeTriggersZh": [
    "需要文案的过渡",
    "品牌显性收束"
  ],
  "hostSurfaces": [
    "recording clean-screen transition",
    "neutral reset",
    "between-stage matte"
  ],
  "toneTags": [
    "neutral",
    "clean",
    "breathing-room"
  ],
  "visualWeight": "heavy",
  "informationDensity": "low",
  "dominance": "primary",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "durationMs",
    "phase"
  ],
  "keepFixed": [
    "full-frame matte coverage",
    "soft neutral color treatment"
  ],
  "adaptationNotes": [
    "This asset works because it disappears quickly and cleanly.",
    "If the bridge needs semantic copy or a stronger graphic identity, pick a different overlay."
  ]
}
---
Recording Blank Overlay is a clean-screen reset, not a statement. Use it when the existing recording layer needs to vanish so the next overlay can arrive on a neutral field. It keeps the original soft matte look from the recording demos, so it feels like a deliberate reset instead of an accidental flash.

For matching, think of beats like "clear the screen", "give the next overlay room", or "we need a neutral wipe between two heavier stages." It is strongest when paired with intertitle or outcome overlays. If the transition itself should carry a message, choose Recording Intertitle Overlay instead.

For adaptation, the main safe change is duration. Keep the full-frame matte coverage and soft neutral tone intact. Once you start adding big copy or stronger graphic identity, the asset has crossed into a different kind of transition.
