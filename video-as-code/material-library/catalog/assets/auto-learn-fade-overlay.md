---
{
  "id": "material-library/motion/auto-learn-fade-overlay",
  "title": "Auto Learn Fade Overlay",
  "category": "motion",
  "summary": "Neutral matte fade used to leave the Feishu discussion scene before the knowledge dashboard lands.",
  "agentGoal": "Let the Agent reuse Auto Learn Fade Overlay when a script needs a clean full-frame wipe between a chat-driven scene and a brighter knowledge or dashboard scene.",
  "whenToUse": [
    "Use when a chat scene needs a neutral full-frame wipe before another environment appears.",
    "Use when the transition should clear busy UI chrome without adding a new branded statement."
  ],
  "avoidWhen": [
    "Avoid when the transition itself should carry a thesis, metric, or brand line.",
    "Avoid when a tiny local component swap would be enough."
  ],
  "keywords": [
    "fade overlay",
    "matte wipe",
    "scene reset",
    "chat to dashboard",
    "auto learn"
  ],
  "matchKeywords": [
    "auto learn fade overlay",
    "chat to dashboard wipe",
    "neutral full screen fade",
    "scene reset matte",
    "聊天到知识面板转场",
    "全屏淡入淡出遮罩",
    "中性场景切换"
  ],
  "inputProps": [
    "opacity"
  ],
  "sourceProjects": [
    "projects/short-assets-auto_learn_knowledge"
  ],
  "previewRef": "material-library/showcase#auto-learn-fade-overlay",
  "stability": "stable",
  "implementationRef": "material-library/src/motion/auto-learn-transitions.tsx",
  "sceneTypes": [
    "transition",
    "wipe",
    "scene-reset"
  ],
  "styleFamilies": [
    "lucius-light",
    "matte-overlay"
  ],
  "editableParts": [
    "opacity timing"
  ],
  "visualSignature": [
    "Full-frame warm matte layer with no extra card, line, or logo.",
    "Feels like a clean scene reset rather than a brand statement.",
    "Best on scene handoff, environment switch, and UI reset surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the current scene is visually busy and the next scene needs a clean slate.",
    "Best when the transition should feel invisible but still deliberate.",
    "Choose it when the beat is about changing environment, not adding meaning inside the transition."
  ],
  "compositionPatterns": [
    "Use it between a dense chat build and a calmer dashboard or knowledge scene.",
    "Pair it with an ending overlay or scene-owning environment so the wipe does not become the final beat.",
    "Usually staged next to Feishu Chat Scene, Knowledge Dashboard Scene, and Auto Learn Ending Overlay."
  ],
  "pairWithIds": [
    "material-library/surfaces/feishu-chat-scene",
    "material-library/surfaces/knowledge-dashboard-scene",
    "material-library/motion/auto-learn-ending-overlay"
  ],
  "preferInsteadIds": [
    "material-library/motion/brand-transition-ring",
    "material-library/motion/recording-blank-overlay"
  ],
  "dos": [
    "Use Auto Learn Fade Overlay when the transition only needs to reset the canvas.",
    "Tune opacity timing first and keep the layer visually empty."
  ],
  "donts": [
    "Do not turn it into a message-carrying card.",
    "Do not use it when the transition needs a clear branded close."
  ],
  "scriptRecipe": [
    "Let the first scene finish its main read.",
    "Wipe the frame to neutral with Auto Learn Fade Overlay.",
    "Reveal the next environment after the matte has fully taken over."
  ],
  "narrativeRole": "transition",
  "scriptTriggersEn": [
    "chat to dashboard wipe",
    "neutral full screen fade",
    "scene reset matte"
  ],
  "scriptTriggersZh": [
    "聊天到知识面板转场",
    "全屏淡入淡出遮罩",
    "中性场景切换"
  ],
  "negativeTriggersEn": [
    "brand close",
    "local component transition"
  ],
  "negativeTriggersZh": [
    "品牌收束",
    "局部组件切换"
  ],
  "hostSurfaces": [
    "scene handoff",
    "environment switch",
    "ui reset"
  ],
  "toneTags": [
    "neutral",
    "clean",
    "calming"
  ],
  "visualWeight": "heavy",
  "informationDensity": "low",
  "dominance": "primary",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "opacity curve",
    "duration"
  ],
  "keepFixed": [
    "full-frame matte behavior",
    "neutral visual treatment"
  ],
  "adaptationNotes": [
    "If the transition needs copy or brand language, switch to a stronger transition asset instead of overloading this wipe.",
    "Keep the surface blank so it still reads as a reset layer."
  ]
}
---
Auto Learn Fade Overlay is the simplest transition in the auto-learn-knowledge family. It does not try to explain, celebrate, or brand the handoff. It only clears the current scene and prepares the viewer for a new environment.

For matching, think of beats like "wipe from chat into dashboard" or "reset the canvas before the next scene." It is strongest when the outgoing scene is dense and the incoming scene needs a visual breath. If the transition itself should carry copy, brand, or a final claim, pick a more expressive asset.

For adaptation, change timing first. Keep the full-frame matte behavior and the empty surface stable. The moment it starts carrying extra UI or messaging, it stops functioning as a clean reset.
