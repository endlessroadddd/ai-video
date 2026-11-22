---
{
  "id": "material-library/motion/timeline",
  "title": "Timeline Controller",
  "category": "motion",
  "summary": "A lightweight requestAnimationFrame timeline with play, pause, restart, and seek controls.",
  "agentGoal": "Let the Agent reuse Timeline Controller when a script needs shared timeline control on motion controller without rebuilding the surrounding motion layer from scratch.",
  "whenToUse": [
    "Use when a short asset needs deterministic, time-based animation without CSS keyframes.",
    "Use when the scene can afford a micro helper layer on motion controller."
  ],
  "avoidWhen": [
    "Avoid when CSS animations or GSAP timelines already cover the motion.",
    "Avoid when one-off css transition only."
  ],
  "keywords": [
    "timeline",
    "clock",
    "raf",
    "animation",
    "helper",
    "precise",
    "systemic",
    "timing"
  ],
  "matchKeywords": [
    "time",
    "timeline controller",
    "seekable motion",
    "shared timeline control",
    "seek pause restart",
    "drive multiple scene states",
    "motion controller",
    "scene orchestration layer",
    "timeline-driven preview",
    "precise",
    "systemic",
    "timing",
    "共享时间轴控制",
    "需要 seek pause restart",
    "驱动多个场景状态"
  ],
  "inputProps": [
    "options.durationMs",
    "options.loop",
    "options.speed",
    "options.onTick"
  ],
  "sourceProjects": [
    "projects/short-assets-learn_from_conversations",
    "projects/short-assets-one_command_do_all"
  ],
  "previewRef": "material-library/showcase#timeline",
  "stability": "stable",
  "implementationRef": "material-library/src/motion/timeline.ts",
  "sceneTypes": [],
  "styleFamilies": [],
  "editableParts": [],
  "visualSignature": [
    "A lightweight requestAnimationFrame timeline with play, pause, restart, and seek controls.",
    "Reads as a micro precise, systemic, timing helper layer rather than a generic motion widget.",
    "Most natural on motion controller, scene orchestration layer, timeline-driven preview surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a short asset needs deterministic, time-based animation without CSS keyframes.",
    "Best when the scene needs a micro precise layer on motion controller.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Use it to bridge or pace a scene change instead of carrying the whole story by itself.",
    "Let it hand off into a calmer proof or shell once the motion beat lands.",
    "Usually staged next to Easing Helpers, Knowledge Graph Curtain, and Brand Transition Ring.",
    "Pair it with Easing Helpers when the beat needs one more layer of context without replacing Timeline Controller."
  ],
  "pairWithIds": [
    "material-library/motion/easing",
    "material-library/motion/curtain-knowledge-graph",
    "material-library/motion/brand-transition-ring"
  ],
  "preferInsteadIds": [],
  "dos": [
    "Use Timeline Controller only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with options.durationMs and options.loop while keeping public contract and side-effect boundaries stable."
  ],
  "donts": [
    "Do not use it when CSS animations or GSAP timelines already cover the motion.",
    "Do not rewrite public contract and side-effect boundaries in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Wire Timeline Controller into the motion or schema layer first.",
    "Use the helper to standardize behavior across multiple visible assets instead of improvising scene by scene.",
    "Pair with Easing Helpers if the next beat needs more context or follow-through."
  ],
  "narrativeRole": "helper",
  "scriptTriggersEn": [
    "shared timeline control",
    "seek pause restart",
    "drive multiple scene states"
  ],
  "scriptTriggersZh": [
    "共享时间轴控制",
    "需要 seek pause restart",
    "驱动多个场景状态"
  ],
  "negativeTriggersEn": [
    "one-off css transition only",
    "no scripted timing"
  ],
  "negativeTriggersZh": [
    "只是一次性 CSS 过渡",
    "不需要脚本时间轴"
  ],
  "hostSurfaces": [
    "motion controller",
    "scene orchestration layer",
    "timeline-driven preview"
  ],
  "toneTags": [
    "precise",
    "systemic",
    "timing"
  ],
  "visualWeight": "micro",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "options.durationMs",
    "options.loop",
    "config values",
    "names",
    "payload data"
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
Timeline Controller is the right pick when a short asset needs deterministic, time-based animation without CSS keyframes. Visually it reads as a lightweight requestanimationframe timeline with play, pause, restart, and seek controls, with a precise, systemic, timing tone, and it sits best on motion controller, scene orchestration layer, timeline-driven preview surfaces.

For matching, look for beats like shared timeline control / seek pause restart or 共享时间轴控制 / 需要 seek pause restart. Pair it with Easing Helpers and Knowledge Graph Curtain when the scene needs more context. Prefer a lighter alternative when CSS animations or GSAP timelines already cover the motion.

For adaptation, change options.durationMs, options.loop, config values, names, payload data first. Keep public contract, side-effect boundaries, timing or schema semantics stable so the asset still feels like the extracted original. Keep helpers predictable so visible assets can rely on them without scene-specific hacks. If the contract changes, version it instead of silently mutating the existing helper.
