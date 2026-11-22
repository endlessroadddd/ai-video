---
{
  "id": "material-library/motion/discord-scene-timeline-preview",
  "title": "Discord Scene Timeline Preview",
  "category": "motion",
  "summary": "A stitched multi-scene timeline player that walks through Discord community moments and hands off into the loss chart scene.",
  "agentGoal": "Let the Agent reuse Discord Scene Timeline Preview when a script needs discord scene timeline preview on scene planning without rebuilding the surrounding motion layer from scratch.",
  "whenToUse": [
    "Use when one asset needs to demonstrate the full scene progression, not just a single frozen state.",
    "Use when the scene can afford a light helper layer on scene planning."
  ],
  "avoidWhen": [
    "Avoid when you only need one reusable surface or when replay controls would distract from the main composition.",
    "Avoid when single polished production scene."
  ],
  "keywords": [
    "timeline preview",
    "scene player",
    "discord sequence",
    "replay",
    "helper",
    "planning",
    "staged",
    "preview"
  ],
  "matchKeywords": [
    "discord scene timeline",
    "multi-scene preview",
    "story playback helper",
    "discord scene timeline preview",
    "stitched multi-scene player",
    "preview community to chart handoff",
    "scene planning",
    "preview timeline",
    "stitched storyboard player",
    "planning",
    "staged",
    "preview",
    "Discord 场景时间线预演",
    "多场景 stitched player",
    "社区到图表的预演串联"
  ],
  "inputProps": [
    "BreakImmersionTimelinePreview"
  ],
  "sourceProjects": [
    "projects/short-asset-break-immersion"
  ],
  "previewRef": "material-library/showcase#discord-scene-timeline-preview",
  "stability": "beta",
  "implementationRef": "projects/short-asset-break-immersion/src/TimelinePreview.tsx",
  "sceneTypes": [
    "timeline",
    "preview-player",
    "story-sequence"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "timeline segments",
    "scene order",
    "replay behavior"
  ],
  "visualSignature": [
    "A stitched multi-scene timeline player that walks through Discord community moments and hands off into the loss chart scene.",
    "Reads as a light planning, staged, preview helper layer rather than a generic motion widget.",
    "Most natural on scene planning, preview timeline, stitched storyboard player surfaces."
  ],
  "selectionSignals": [
    "Reach for it when one asset needs to demonstrate the full scene progression, not just a single frozen state.",
    "Best when the scene needs a light planning layer on scene planning.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Use it to bridge or pace a scene change instead of carrying the whole story by itself.",
    "Let it hand off into a calmer proof or shell once the motion beat lands.",
    "Usually staged next to Timeline Controller, Easing Helpers, and Discord Community Scene.",
    "Pair it with Timeline Controller when the beat needs one more layer of context without replacing Discord Scene Timeline Preview."
  ],
  "pairWithIds": [
    "material-library/motion/timeline",
    "material-library/motion/easing",
    "material-library/surfaces/discord-community-scene"
  ],
  "preferInsteadIds": [
    "material-library/motion/curtain-command-flow"
  ],
  "dos": [
    "Use Discord Scene Timeline Preview only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with timeline segments and scene order while keeping public contract and side-effect boundaries stable."
  ],
  "donts": [
    "Do not use it when you only need one reusable surface or when replay controls would distract from the main composition.",
    "Do not rewrite public contract and side-effect boundaries in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Wire Discord Scene Timeline Preview into the motion or schema layer first.",
    "Use the helper to standardize behavior across multiple visible assets instead of improvising scene by scene.",
    "Prefer One Command Curtain when you only need one reusable surface or when replay controls would distract from the main composition."
  ],
  "narrativeRole": "helper",
  "scriptTriggersEn": [
    "discord scene timeline preview",
    "stitched multi-scene player",
    "preview community to chart handoff"
  ],
  "scriptTriggersZh": [
    "Discord 场景时间线预演",
    "多场景 stitched player",
    "社区到图表的预演串联"
  ],
  "negativeTriggersEn": [
    "single polished production scene",
    "micro inline helper"
  ],
  "negativeTriggersZh": [
    "单个成品场景",
    "微型内联 helper"
  ],
  "hostSurfaces": [
    "scene planning",
    "preview timeline",
    "stitched storyboard player"
  ],
  "toneTags": [
    "planning",
    "staged",
    "preview"
  ],
  "visualWeight": "light",
  "informationDensity": "medium",
  "dominance": "supporting",
  "reuseMode": "tweak-layout",
  "mutationCost": "medium",
  "safeToChange": [
    "timeline segments",
    "scene order",
    "replay behavior",
    "BreakImmersionTimelinePreview",
    "config values"
  ],
  "keepFixed": [
    "public contract",
    "side-effect boundaries",
    "timing or schema semantics"
  ],
  "adaptationNotes": [
    "Keep helpers predictable so visible assets can rely on them without scene-specific hacks.",
    "If the contract changes, version it instead of silently mutating the existing helper."
  ]
}
---
Discord Scene Timeline Preview is the right pick when one asset needs to demonstrate the full scene progression, not just a single frozen state. Visually it reads as a stitched multi-scene timeline player that walks through discord community moments and hands off into the loss chart scene, with a planning, staged, preview tone, and it sits best on scene planning, preview timeline, stitched storyboard player surfaces.

For matching, look for beats like discord scene timeline preview / stitched multi-scene player or Discord 场景时间线预演 / 多场景 stitched player. Pair it with Timeline Controller and Easing Helpers when the scene needs more context. Prefer One Command Curtain when you only need one reusable surface or when replay controls would distract from the main composition.

For adaptation, change timeline segments, scene order, replay behavior, BreakImmersionTimelinePreview, config values first. Keep public contract, side-effect boundaries, timing or schema semantics stable so the asset still feels like the extracted original. Keep helpers predictable so visible assets can rely on them without scene-specific hacks. If the contract changes, version it instead of silently mutating the existing helper.
