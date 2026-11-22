---
{
  "id": "material-library/surfaces/discord-noise-card-stage",
  "title": "Discord Noise Card Stage",
  "category": "surfaces",
  "summary": "Discord-native ending stage that accumulates scattered community cards and can hand off into a stacked question close.",
  "agentGoal": "Let the Agent reuse Discord Noise Card Stage when a script needs discord closing noise stage on ending stage without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when the ending beat needs many scattered community signals to gather into one readable close.",
    "Use when the scene can afford a full-scene transition layer on ending stage."
  ],
  "avoidWhen": [
    "Avoid when the scene is brand-only, minimal, or has no card-like signal fragments.",
    "Avoid when quiet logo close."
  ],
  "keywords": [
    "discord noise cards",
    "closing stage",
    "signal fragments",
    "ending stage",
    "surface",
    "discord-native",
    "closing"
  ],
  "matchKeywords": [
    "discord noise card stage",
    "signal fragment close",
    "community cards ending",
    "discord closing noise stage",
    "ending stage",
    "community signal ending",
    "question close",
    "card cloud close",
    "discord-native",
    "closing",
    "Discord 噪点卡片场景",
    "社区碎片结尾",
    "卡片云结尾"
  ],
  "inputProps": [
    "cards",
    "currentMs",
    "startMs",
    "visibleTiming",
    "questionStack"
  ],
  "sourceProjects": [],
  "previewRef": "material-library/showcase#discord-noise-card-stage",
  "stability": "stable",
  "implementationRef": "material-library/src/surfaces/discord-noise-card-stage.tsx",
  "sceneTypes": [
    "ending",
    "discord",
    "closing-stage"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "cards",
    "visibleTiming",
    "questionStack"
  ],
  "visualSignature": [
    "Discord-native ending stage that accumulates scattered community cards and can hand off into a stacked question close.",
    "Reads as a full-scene discord-native closing surface rather than a generic motion widget.",
    "Most natural on ending stage, community signal ending, card cloud close surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the ending should feel like many scattered signals are finally visible in one field.",
    "Best when the scene needs a full-scene discord-native layer on ending stage.",
    "Choose it when this stage should own the closing frame for a moment."
  ],
  "compositionPatterns": [
    "Use it as a closing field, not as a mid-scene explanatory card.",
    "Let the cards accumulate first, then reveal the question stack if needed.",
    "Usually staged next to Discord Question Stack Stage and Discord Community Shell.",
    "Pair it with Discord Question Stack Stage when the beat needs one more layer of context without replacing Discord Noise Card Stage."
  ],
  "pairWithIds": [
    "material-library/surfaces/discord-question-stack-stage",
    "material-library/surfaces/discord-community-shell"
  ],
  "preferInsteadIds": [
    "material-library/motion/noise-card-stage"
  ],
  "dos": [
    "Use Discord Noise Card Stage only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with cards and visibleTiming while keeping the accumulation rhythm stable."
  ],
  "donts": [
    "Do not use it when the scene is brand-only, minimal, or has no card-like signal fragments.",
    "Do not rewrite the accumulation rhythm in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Let the previous stage finish its read before this field takes over.",
    "Use the optional question stack only after enough cards are visible to justify the summary.",
    "Prefer the older brand Noise Card Stage when the ending is a brand close instead of a Discord-native close."
  ],
  "narrativeRole": "transition",
  "scriptTriggersEn": [
    "discord closing noise stage",
    "community cards ending",
    "card cloud close"
  ],
  "scriptTriggersZh": [
    "Discord 噪点卡片场景",
    "社区碎片结尾",
    "卡片云结尾"
  ],
  "negativeTriggersEn": [
    "quiet logo close",
    "single centered proof"
  ],
  "negativeTriggersZh": [
    "安静 logo 结尾",
    "单个居中证明"
  ],
  "hostSurfaces": [
    "ending stage",
    "community signal ending",
    "card cloud close"
  ],
  "toneTags": [
    "discord-native",
    "closing"
  ],
  "visualWeight": "full-scene",
  "informationDensity": "medium",
  "dominance": "scene-owning",
  "reuseMode": "tweak-layout",
  "mutationCost": "medium",
  "safeToChange": [
    "cards",
    "visibleTiming",
    "questionStack",
    "copy"
  ],
  "keepFixed": [
    "accumulation rhythm",
    "field silhouette",
    "closing-stage pacing"
  ],
  "adaptationNotes": [
    "Give the ending enough stillness after the last reveal for the final read to complete.",
    "If the stage becomes purely brand-driven, prefer the older brand close asset instead."
  ]
}
---
Discord Noise Card Stage is the right pick when a Discord story wants to end on many scattered community fragments gathering into one closing field. It stays data-driven, so each new project can swap the cards and timing without rewriting the stage logic.
