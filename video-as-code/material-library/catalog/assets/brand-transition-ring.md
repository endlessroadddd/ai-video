---
{
  "id": "material-library/motion/brand-transition-ring",
  "title": "Brand Transition Ring",
  "category": "motion",
  "summary": "Full-screen ring wipe that collapses into the Lucius brand stage without changing the original feel.",
  "agentGoal": "Let the Agent reuse Brand Transition Ring when a script needs brand ring wipe on full-frame brand close without rebuilding the surrounding motion layer from scratch.",
  "whenToUse": [
    "Use when a scene needs a decisive cover transition before revealing a branded end state.",
    "Use when the scene can afford a full-scene transition layer on full-frame brand close."
  ],
  "avoidWhen": [
    "Avoid when the cut should stay subtle or when a scene cannot tolerate a full-frame color takeover.",
    "Avoid when proof-heavy read."
  ],
  "keywords": [
    "brand transition",
    "ring wipe",
    "cover",
    "full screen",
    "transition",
    "brand-close",
    "clean",
    "confident"
  ],
  "matchKeywords": [
    "brand wipe",
    "purple cover transition",
    "ring collapse",
    "brand ring wipe",
    "clean scene handoff",
    "closing brand transition",
    "full-frame brand close",
    "scene handoff",
    "cover transition",
    "brand-close",
    "clean",
    "confident",
    "品牌圆环转场",
    "干净场景切换",
    "品牌收束转场"
  ],
  "inputProps": [
    "className"
  ],
  "sourceProjects": [
    "projects/short-asset-ai-heavy-catch-you"
  ],
  "previewRef": "material-library/showcase#brand-transition-ring",
  "stability": "beta",
  "implementationRef": "material-library/src/motion/brand-transition.tsx",
  "sceneTypes": [
    "transition",
    "brand-reveal"
  ],
  "styleFamilies": [
    "lucius-purple"
  ],
  "editableParts": [
    "timing",
    "stacking-order"
  ],
  "visualSignature": [
    "Full-screen ring wipe that collapses into the Lucius brand stage without changing the original feel.",
    "Reads as a full-scene brand-close, clean, confident transition layer rather than a generic motion widget.",
    "Most natural on full-frame brand close, scene handoff, cover transition surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a scene needs a decisive cover transition before revealing a branded end state.",
    "Best when the scene needs a full-scene brand-close layer on full-frame brand close.",
    "Choose it when this asset needs to own the whole frame for a moment."
  ],
  "compositionPatterns": [
    "Use it to bridge or pace a scene change instead of carrying the whole story by itself.",
    "Let it hand off into a calmer proof or shell once the motion beat lands.",
    "Usually staged next to Lucius Logo Mark, Noise Card Stage, and Resolve Overlay.",
    "Pair it with Lucius Logo Mark when the beat needs one more layer of context without replacing Brand Transition Ring."
  ],
  "pairWithIds": [
    "material-library/icons/lucius-logo-mark",
    "material-library/motion/noise-card-stage",
    "material-library/surfaces/resolve-overlay"
  ],
  "preferInsteadIds": [
    "material-library/motion/noise-card-stage"
  ],
  "dos": [
    "Use Brand Transition Ring only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with timing and stacking-order while keeping entry and exit choreography and focus center and silhouette stable."
  ],
  "donts": [
    "Do not use it when the cut should stay subtle or when a scene cannot tolerate a full-frame color takeover.",
    "Do not rewrite entry and exit choreography and focus center and silhouette in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Let the previous scene complete its read before Brand Transition Ring takes over.",
    "Brand Transition Ring should own the handoff or close instead of sharing the frame with dense fresh copy.",
    "Prefer Noise Card Stage when the cut should stay subtle or when a scene cannot tolerate a full-frame color takeover."
  ],
  "narrativeRole": "transition",
  "scriptTriggersEn": [
    "brand ring wipe",
    "clean scene handoff",
    "closing brand transition"
  ],
  "scriptTriggersZh": [
    "品牌圆环转场",
    "干净场景切换",
    "品牌收束转场"
  ],
  "negativeTriggersEn": [
    "proof-heavy read",
    "inline ui accent"
  ],
  "negativeTriggersZh": [
    "重证据阅读段",
    "内联 UI 点缀"
  ],
  "hostSurfaces": [
    "full-frame brand close",
    "scene handoff",
    "cover transition"
  ],
  "toneTags": [
    "brand-close",
    "clean",
    "confident"
  ],
  "visualWeight": "full-scene",
  "informationDensity": "low",
  "dominance": "scene-owning",
  "reuseMode": "tweak-copy",
  "mutationCost": "medium",
  "safeToChange": [
    "timing",
    "stacking-order",
    "className",
    "headline copy",
    "supporting labels"
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
Brand Transition Ring is the right pick when a scene needs a decisive cover transition before revealing a branded end state. Visually it reads as full-screen ring wipe that collapses into the lucius brand stage without changing the original feel, with a brand-close, clean, confident tone, and it sits best on full-frame brand close, scene handoff, cover transition surfaces.

For matching, look for beats like brand ring wipe / clean scene handoff or 品牌圆环转场 / 干净场景切换. Pair it with Lucius Logo Mark and Noise Card Stage when the scene needs more context. Prefer Noise Card Stage when the cut should stay subtle or when a scene cannot tolerate a full-frame color takeover.

For adaptation, change timing, stacking-order, className, headline copy, supporting labels first. Keep entry and exit choreography, focus center and silhouette, timing envelope stable so the asset still feels like the extracted original. Keep the transition readable in one beat. If the handoff rhythm changes completely, fork a new transition instead of stretching this one out of shape.
