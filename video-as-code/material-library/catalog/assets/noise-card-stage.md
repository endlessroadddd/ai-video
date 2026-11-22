---
{
  "id": "material-library/motion/noise-card-stage",
  "title": "Noise Card Stage",
  "category": "motion",
  "summary": "Reusable brand stage that fans out support-message cards, reveals the Lucius mark, and clears into a closing line.",
  "agentGoal": "Let the Agent reuse Noise Card Stage when a script needs fan out support cards on brand close stage without rebuilding the surrounding motion layer from scratch.",
  "whenToUse": [
    "Use when the beat is about noisy support language collapsing into a single branded conclusion.",
    "Use when the scene can afford a full-scene transition layer on brand close stage."
  ],
  "avoidWhen": [
    "Avoid when the scene copy is highly data-driven or when cards need business-state behavior.",
    "Avoid when quiet minimal end card."
  ],
  "keywords": [
    "noise cards",
    "message cloud",
    "brand stage",
    "closing transition",
    "transition",
    "brand-close",
    "dramatic",
    "support-proof"
  ],
  "matchKeywords": [
    "support noise cards",
    "brand stage",
    "message cards resolving",
    "fan out support cards",
    "closing proof montage",
    "brand resolve stage",
    "brand close stage",
    "support montage close",
    "card fan-out stage",
    "brand-close",
    "dramatic",
    "support-proof",
    "支持卡片散开",
    "结尾证明蒙太奇",
    "品牌收束舞台"
  ],
  "inputProps": [
    "phase",
    "visibleCount",
    "line",
    "showRing"
  ],
  "sourceProjects": [
    "projects/short-asset-ai-heavy-catch-you"
  ],
  "previewRef": "material-library/showcase#noise-card-stage",
  "stability": "beta",
  "implementationRef": "material-library/src/motion/brand-transition.tsx",
  "sceneTypes": [
    "brand-reveal",
    "transition",
    "message-summary"
  ],
  "styleFamilies": [
    "lucius-purple"
  ],
  "editableParts": [
    "cards",
    "motionPresets",
    "line",
    "phase"
  ],
  "visualSignature": [
    "Reusable brand stage that fans out support-message cards, reveals the Lucius mark, and clears into a closing line.",
    "Reads as a full-scene brand-close, dramatic, support-proof transition layer rather than a generic motion widget.",
    "Most natural on brand close stage, support montage close, card fan-out stage surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the beat is about noisy support language collapsing into a single branded conclusion.",
    "Best when the scene needs a full-scene brand-close layer on brand close stage.",
    "Choose it when this asset needs to own the whole frame for a moment."
  ],
  "compositionPatterns": [
    "Use it to bridge or pace a scene change instead of carrying the whole story by itself.",
    "Let it hand off into a calmer proof or shell once the motion beat lands.",
    "Usually staged next to Brand Transition Ring, Lucius Logo Mark, and Resolve Overlay.",
    "Pair it with Brand Transition Ring when the beat needs one more layer of context without replacing Noise Card Stage."
  ],
  "pairWithIds": [
    "material-library/motion/brand-transition-ring",
    "material-library/icons/lucius-logo-mark",
    "material-library/surfaces/resolve-overlay"
  ],
  "preferInsteadIds": [
    "material-library/motion/brand-transition-ring"
  ],
  "dos": [
    "Use Noise Card Stage only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with cards and motionPresets while keeping entry and exit choreography and focus center and silhouette stable."
  ],
  "donts": [
    "Do not use it when the scene copy is highly data-driven or when cards need business-state behavior.",
    "Do not rewrite entry and exit choreography and focus center and silhouette in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Let the previous scene complete its read before Noise Card Stage takes over.",
    "Noise Card Stage should own the handoff or close instead of sharing the frame with dense fresh copy.",
    "Prefer Brand Transition Ring when the scene copy is highly data-driven or when cards need business-state behavior."
  ],
  "narrativeRole": "transition",
  "scriptTriggersEn": [
    "fan out support cards",
    "closing proof montage",
    "brand resolve stage"
  ],
  "scriptTriggersZh": [
    "支持卡片散开",
    "结尾证明蒙太奇",
    "品牌收束舞台"
  ],
  "negativeTriggersEn": [
    "quiet minimal end card",
    "single inline proof"
  ],
  "negativeTriggersZh": [
    "安静极简结尾卡",
    "单个内联证明"
  ],
  "hostSurfaces": [
    "brand close stage",
    "support montage close",
    "card fan-out stage"
  ],
  "toneTags": [
    "brand-close",
    "dramatic",
    "support-proof"
  ],
  "visualWeight": "full-scene",
  "informationDensity": "medium",
  "dominance": "scene-owning",
  "reuseMode": "tweak-copy",
  "mutationCost": "medium",
  "safeToChange": [
    "cards",
    "motionPresets",
    "line",
    "phase",
    "visibleCount"
  ],
  "keepFixed": [
    "entry and exit choreography",
    "focus center and silhouette",
    "timing envelope"
  ],
  "adaptationNotes": [
    "Keep the transition readable in one beat.",
    "If the handoff rhythm changes completely, fork a new transition instead of stretching this one out of shape."
  ]
}
---
Noise Card Stage is the right pick when the beat is about noisy support language collapsing into a single branded conclusion. Visually it reads as reusable brand stage that fans out support-message cards, reveals the lucius mark, and clears into a closing line, with a brand-close, dramatic, support-proof tone, and it sits best on brand close stage, support montage close, card fan-out stage surfaces.

For matching, look for beats like fan out support cards / closing proof montage or 支持卡片散开 / 结尾证明蒙太奇. Pair it with Brand Transition Ring and Lucius Logo Mark when the scene needs more context. Prefer Brand Transition Ring when the scene copy is highly data-driven or when cards need business-state behavior.

For adaptation, change cards, motionPresets, line, phase, visibleCount first. Keep entry and exit choreography, focus center and silhouette, timing envelope stable so the asset still feels like the extracted original. Keep the transition readable in one beat. If the handoff rhythm changes completely, fork a new transition instead of stretching this one out of shape.
