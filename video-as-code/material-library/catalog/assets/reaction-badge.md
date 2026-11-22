---
{
  "id": "material-library/chat/reaction-badge",
  "title": "Reaction Badge",
  "category": "chat",
  "summary": "Compact Discord-style reaction pill for showing emoji traction without rebuilding the whole message row.",
  "agentGoal": "Let the Agent reuse Reaction Badge when a script needs discord reaction count on reaction rail without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when a message or request needs small visible traction proof.",
    "Use when the scene can afford a micro accent layer on reaction rail."
  ],
  "avoidWhen": [
    "Avoid when the scene needs deeper proof than a compact count can provide.",
    "Avoid when full proof chart stage."
  ],
  "keywords": [
    "reaction",
    "emoji count",
    "reaction badge",
    "discord reaction",
    "accent",
    "discord-native",
    "micro-proof"
  ],
  "matchKeywords": [
    "reaction badge",
    "emoji count",
    "discord reaction pill",
    "message traction chip",
    "discord reaction count",
    "reaction rail",
    "message footer",
    "community signal hint",
    "discord-native",
    "micro-proof",
    "Reaction 徽标",
    "emoji 计数",
    "Discord reaction"
  ],
  "inputProps": [
    "emoji",
    "count",
    "hot"
  ],
  "sourceProjects": [],
  "previewRef": "material-library/showcase#reaction-badge",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/reaction-badge.tsx",
  "sceneTypes": [
    "discord",
    "chat",
    "feature-signal"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "emoji",
    "count",
    "hot"
  ],
  "visualSignature": [
    "Compact Discord-style reaction pill for showing emoji traction without rebuilding the whole message row.",
    "Reads as a micro discord-native, micro-proof accent layer rather than a generic chat widget.",
    "Most natural on reaction rail, message footer, community signal hint surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a message needs just enough traction proof to feel socially real.",
    "Best when the scene needs a micro discord-native layer on reaction rail.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the message or stage that already owns the main read.",
    "Use a few badges, not a dense reaction wall.",
    "Usually staged next to Discord Message Card and Discord Transcript Stage.",
    "Pair it with Discord Message Card when the beat needs one more layer of context without replacing Reaction Badge."
  ],
  "pairWithIds": [
    "material-library/chat/discord-message-card",
    "material-library/surfaces/discord-transcript-stage"
  ],
  "preferInsteadIds": [
    "material-library/data-display/trend-chart"
  ],
  "dos": [
    "Use Reaction Badge only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with emoji and count while keeping the compact footprint stable."
  ],
  "donts": [
    "Do not use it when the scene needs deeper proof than a compact count can provide.",
    "Do not rewrite the compact footprint in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Let the message land first, then add reaction proof as punctuation.",
    "Keep the number of badges low so one badge still means something.",
    "Prefer Trend Chart when the scene needs broader directional evidence instead of local traction."
  ],
  "narrativeRole": "accent",
  "scriptTriggersEn": [
    "discord reaction count",
    "emoji count",
    "reaction badge"
  ],
  "scriptTriggersZh": [
    "Reaction 徽标",
    "emoji 计数",
    "Discord reaction"
  ],
  "negativeTriggersEn": [
    "full proof chart stage",
    "single centered hero"
  ],
  "negativeTriggersZh": [
    "完整图表证明场景",
    "单个居中主视觉"
  ],
  "hostSurfaces": [
    "reaction rail",
    "message footer",
    "community signal hint"
  ],
  "toneTags": [
    "discord-native",
    "micro-proof"
  ],
  "visualWeight": "micro",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "emoji",
    "count",
    "hot",
    "labels"
  ],
  "keepFixed": [
    "compact footprint",
    "pill silhouette",
    "reaction-first readability"
  ],
  "adaptationNotes": [
    "Keep the badge tiny enough that it reads as traction, not as a second card.",
    "If it starts carrying full sentence copy, it should become a different asset."
  ]
}
---
Reaction Badge is the right pick when a scene needs tiny local traction proof inside a Discord message or request. It should stay compact and supportive, not turn into the main readable block.
