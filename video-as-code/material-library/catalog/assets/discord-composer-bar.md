---
{
  "id": "material-library/chat/discord-composer-bar",
  "title": "Discord Composer Bar",
  "category": "chat",
  "summary": "Discord-native composer footer with attach, assist, and send affordances for community scenes.",
  "agentGoal": "Let the Agent reuse Discord Composer Bar when a script needs discord input footer on chat footer without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when a Discord scene needs a grounded footer that implies scanning, replying, or taking action.",
    "Use when the scene can afford a light shell layer on chat footer."
  ],
  "avoidWhen": [
    "Avoid when the scene never shows any message-entry context.",
    "Avoid when transcript only and no footer."
  ],
  "keywords": [
    "discord composer",
    "composer bar",
    "input footer",
    "reply footer",
    "shell",
    "discord-native",
    "operational"
  ],
  "matchKeywords": [
    "discord composer bar",
    "discord input footer",
    "reply footer",
    "community composer",
    "discord input footer",
    "chat footer",
    "community shell",
    "message entry area",
    "discord-native",
    "operational",
    "Discord 输入栏",
    "回复底栏",
    "社区 composer"
  ],
  "inputProps": [
    "placeholder",
    "assistLabel",
    "sendLabel"
  ],
  "sourceProjects": [],
  "previewRef": "material-library/showcase#discord-composer-bar",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/discord-composer-bar.tsx",
  "sceneTypes": [
    "discord",
    "community-chat"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "placeholder",
    "assistLabel",
    "sendLabel"
  ],
  "visualSignature": [
    "Discord-native composer footer with attach, assist, and send affordances for community scenes.",
    "Reads as a light discord-native, operational shell layer rather than a generic surfaces widget.",
    "Most natural on chat footer, community shell, message entry area surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a Discord scene needs a grounded footer that implies interaction without requiring live behavior.",
    "Best when the scene needs a light discord-native layer on chat footer.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Use it at the bottom of a transcript or community shell, not as an isolated object.",
    "Keep the footer calm so the transcript still owns the read.",
    "Usually staged next to Discord Community Shell and Discord Transcript Stage.",
    "Pair it with Discord Community Shell when the beat needs one more layer of context without replacing Discord Composer Bar."
  ],
  "pairWithIds": [
    "material-library/surfaces/discord-community-shell",
    "material-library/surfaces/discord-transcript-stage"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/composer-shell"
  ],
  "dos": [
    "Use Discord Composer Bar only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with placeholder and labels while keeping the footer geometry stable."
  ],
  "donts": [
    "Do not use it when the scene never shows any message-entry context.",
    "Do not rewrite the footer geometry in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Let the transcript establish the beat first, then use the composer to imply the next action.",
    "Keep the footer subordinate to the main chat read.",
    "Prefer Composer Shell when the scene is not specifically Discord-native."
  ],
  "narrativeRole": "shell",
  "scriptTriggersEn": [
    "discord input footer",
    "reply footer",
    "discord composer bar"
  ],
  "scriptTriggersZh": [
    "Discord 输入栏",
    "回复底栏",
    "社区 composer"
  ],
  "negativeTriggersEn": [
    "transcript only and no footer",
    "dashboard proof stage"
  ],
  "negativeTriggersZh": [
    "只有转录没有底栏",
    "仪表盘证明场景"
  ],
  "hostSurfaces": [
    "chat footer",
    "community shell",
    "message entry area"
  ],
  "toneTags": [
    "discord-native",
    "operational"
  ],
  "visualWeight": "light",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "placeholder",
    "assistLabel",
    "sendLabel",
    "labels"
  ],
  "keepFixed": [
    "footer geometry",
    "button rhythm",
    "input-first hierarchy"
  ],
  "adaptationNotes": [
    "Keep the footer calm enough that it reads as interface context, not as the headline.",
    "If the footer starts carrying a complex workflow, it should become a larger shell."
  ]
}
---
Discord Composer Bar is the right pick when a Discord scene needs an input footer that suggests scanning or replying without demanding real interactivity. It works best as a grounding layer under an already-readable transcript.
