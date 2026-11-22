---
{
  "id": "material-library/motion/easing",
  "title": "Easing Helpers",
  "category": "motion",
  "summary": "Small shared easing and ramp helpers reused across curtains and staged UI reveals.",
  "agentGoal": "Let the Agent reuse Easing Helpers when a script needs shared easing curve on motion helper without rebuilding the surrounding motion layer from scratch.",
  "whenToUse": [
    "Use when building timeline-driven scenes that need the same motion language as the extracted curtains.",
    "Use when the scene can afford a micro helper layer on motion helper."
  ],
  "avoidWhen": [
    "Avoid when a scene already uses a different animation system and should keep that timing vocabulary.",
    "Avoid when physics simulation."
  ],
  "keywords": [
    "easing",
    "ramp",
    "motion",
    "helper",
    "polished",
    "precise",
    "subtle"
  ],
  "matchKeywords": [
    "easing helper",
    "ramp helper",
    "curtain easing",
    "shared easing curve",
    "consistent reveal timing",
    "motion helper",
    "curtain timing layer",
    "micro reveal timing",
    "polished",
    "precise",
    "subtle",
    "共享缓动曲线",
    "统一 reveal 节奏"
  ],
  "inputProps": [
    "value",
    "start",
    "end"
  ],
  "sourceProjects": [
    "projects/short-assets-learn_from_conversations",
    "projects/short-assets-one_command_do_all"
  ],
  "previewRef": "material-library/showcase#material-library-motion-easing",
  "stability": "stable",
  "implementationRef": "material-library/src/motion/easing.ts",
  "sceneTypes": [
    "motion"
  ],
  "styleFamilies": [
    "lucius-light",
    "lucius-dark"
  ],
  "editableParts": [
    "easing selection",
    "ramp boundaries"
  ],
  "visualSignature": [
    "Small shared easing and ramp helpers reused across curtains and staged UI reveals.",
    "Reads as a micro polished, precise, subtle helper layer rather than a generic motion widget.",
    "Most natural on motion helper, curtain timing layer, micro reveal timing surfaces."
  ],
  "selectionSignals": [
    "Reach for it when building timeline-driven scenes that need the same motion language as the extracted curtains.",
    "Best when the scene needs a micro polished layer on motion helper.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Use it to bridge or pace a scene change instead of carrying the whole story by itself.",
    "Let it hand off into a calmer proof or shell once the motion beat lands.",
    "Usually staged next to Timeline Controller, Brand Transition Ring, and Commit Pulse Curtain.",
    "Pair it with Timeline Controller when the beat needs one more layer of context without replacing Easing Helpers."
  ],
  "pairWithIds": [
    "material-library/motion/timeline",
    "material-library/motion/brand-transition-ring",
    "material-library/motion/curtain-commit-pulse"
  ],
  "preferInsteadIds": [],
  "dos": [
    "Use Easing Helpers only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with easing selection and ramp boundaries while keeping public contract and side-effect boundaries stable."
  ],
  "donts": [
    "Do not use it when a scene already uses a different animation system and should keep that timing vocabulary.",
    "Do not rewrite public contract and side-effect boundaries in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Wire Easing Helpers into the motion or schema layer first.",
    "Use the helper to standardize behavior across multiple visible assets instead of improvising scene by scene.",
    "Pair with Timeline Controller if the next beat needs more context or follow-through."
  ],
  "narrativeRole": "helper",
  "scriptTriggersEn": [
    "shared easing curve",
    "ramp helper",
    "consistent reveal timing"
  ],
  "scriptTriggersZh": [
    "共享缓动曲线",
    "ramp helper",
    "统一 reveal 节奏"
  ],
  "negativeTriggersEn": [
    "physics simulation",
    "full scene proof stage"
  ],
  "negativeTriggersZh": [
    "物理仿真动效",
    "完整场景证据段"
  ],
  "hostSurfaces": [
    "motion helper",
    "curtain timing layer",
    "micro reveal timing"
  ],
  "toneTags": [
    "polished",
    "precise",
    "subtle"
  ],
  "visualWeight": "micro",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "easing selection",
    "ramp boundaries",
    "value",
    "start",
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
Easing Helpers is the right pick when building timeline-driven scenes that need the same motion language as the extracted curtains. Visually it reads as small shared easing and ramp helpers reused across curtains and staged ui reveals, with a polished, precise, subtle tone, and it sits best on motion helper, curtain timing layer, micro reveal timing surfaces.

For matching, look for beats like shared easing curve / ramp helper or 共享缓动曲线 / ramp helper. Pair it with Timeline Controller and Brand Transition Ring when the scene needs more context. Prefer a lighter alternative when a scene already uses a different animation system and should keep that timing vocabulary.

For adaptation, change easing selection, ramp boundaries, value, start, config values first. Keep public contract, side-effect boundaries, timing or schema semantics stable so the asset still feels like the extracted original. Keep helpers predictable so visible assets can rely on them without scene-specific hacks. If the contract changes, version it instead of silently mutating the existing helper.
