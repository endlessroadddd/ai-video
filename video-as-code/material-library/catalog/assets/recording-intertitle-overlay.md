---
{
  "id": "material-library/motion/recording-intertitle-overlay",
  "title": "Recording Intertitle Overlay",
  "category": "motion",
  "summary": "Copy-driven full-screen intertitle overlay that bridges recording stages with a strong thesis line and short subline.",
  "agentGoal": "Let the Agent reuse Recording Intertitle Overlay when a script needs a full-screen copy bridge between recording stages without redesigning a new intertitle system.",
  "whenToUse": [
    "Use when the transition itself should deliver one sentence of meaning before the next stage begins.",
    "Use when the beat needs a thesis bridge, not just a visual wipe."
  ],
  "avoidWhen": [
    "Avoid when the scene should stay purely visual or should not pause for headline reading.",
    "Avoid when the copy would be too long for one centered read."
  ],
  "keywords": [
    "intertitle",
    "copy overlay",
    "recording bridge",
    "headline transition",
    "stage reset"
  ],
  "matchKeywords": [
    "recording intertitle",
    "headline overlay transition",
    "copy bridge overlay",
    "录屏标题过渡",
    "中段大标题 overlay",
    "文案桥接转场"
  ],
  "inputProps": [
    "intertitle",
    "phase"
  ],
  "sourceProjects": [
    "projects/demo-app"
  ],
  "previewRef": "material-library/showcase#recording-intertitle-overlay",
  "stability": "beta",
  "implementationRef": "material-library/src/motion/recording-overlays.tsx",
  "sceneTypes": [
    "transition",
    "intertitle",
    "copy-bridge"
  ],
  "styleFamilies": [
    "lucius-light",
    "recording-overlay"
  ],
  "editableParts": [
    "kicker",
    "headline",
    "subline",
    "timings"
  ],
  "visualSignature": [
    "Large centered headline with small kicker and subline over a full soft matte field.",
    "Reads as a deliberate chapter break or thesis bridge, not as a product card.",
    "Most natural on full-screen copy bridge, intertitle handoff, and recording stage reset surfaces."
  ],
  "selectionSignals": [
    "Reach for it when one centered sentence should carry the next story beat.",
    "Best when the scene needs a strong thesis bridge between two different recording stages.",
    "Choose it when the audience should pause to read before the next proof animation begins."
  ],
  "compositionPatterns": [
    "Use it after a clean reset or right after a busy proof stage to reframe the narrative.",
    "Keep the next scene concrete so the intertitle feels like a bridge, not redundant exposition.",
    "Usually staged next to Recording Blank Overlay, Recording Outcome Overlay, and Recording Route Shell."
  ],
  "pairWithIds": [
    "material-library/motion/recording-blank-overlay",
    "material-library/motion/recording-outcome-overlay",
    "material-library/surfaces/recording-route-shell"
  ],
  "preferInsteadIds": [
    "material-library/motion/recording-blank-overlay"
  ],
  "dos": [
    "Use Recording Intertitle Overlay for one strong statement plus one short support line.",
    "Adapt kicker, headline, subline, and timing first while keeping the centered read and copy cadence stable."
  ],
  "donts": [
    "Do not turn it into a paragraph block.",
    "Do not use it when the transition needs to stay invisible."
  ],
  "scriptRecipe": [
    "Reset or calm the previous stage.",
    "Land one thesis line in the intertitle.",
    "Cut into the next proof scene before the viewer starts waiting for more copy."
  ],
  "narrativeRole": "transition",
  "scriptTriggersEn": [
    "recording intertitle",
    "headline overlay transition",
    "copy bridge overlay"
  ],
  "scriptTriggersZh": [
    "录屏标题过渡",
    "中段大标题 overlay",
    "文案桥接转场"
  ],
  "negativeTriggersEn": [
    "silent visual bridge",
    "tiny inline caption"
  ],
  "negativeTriggersZh": [
    "纯视觉过渡",
    "很小的行内标题"
  ],
  "hostSurfaces": [
    "full-screen copy bridge",
    "intertitle handoff",
    "recording stage reset"
  ],
  "toneTags": [
    "editorial",
    "clear",
    "thesis-first"
  ],
  "visualWeight": "full-scene",
  "informationDensity": "low",
  "dominance": "scene-owning",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "kicker",
    "headline",
    "subline",
    "copy timings"
  ],
  "keepFixed": [
    "centered typographic layout",
    "headline to subline hierarchy",
    "enter and exit cadence"
  ],
  "adaptationNotes": [
    "Keep the headline short enough for a single comfortable read.",
    "If the transition needs to explain too much, split the idea across multiple scenes instead of bloating this overlay."
  ]
}
---
Recording Intertitle Overlay is the copy-bearing bridge in the recording family. Use it when the transition itself should say one clear thing before the next stage begins. It preserves the original centered kicker, headline, and subline choreography from the source overlay, so it feels like a chapter break rather than a generic text card.

For matching, think of beats like "we need one thesis line here", "this transition should reframe the story", or "the next stage needs a clean headline handoff." It works best after a busy stage that benefits from a short reset plus one readable statement. If the bridge should stay silent, use Recording Blank Overlay instead.

For adaptation, rewrite kicker, headline, subline, and timing first. Keep the centered hierarchy and the one-read discipline. Once the copy becomes too long or too explanatory, the overlay stops being an intertitle and becomes a different scene type.
