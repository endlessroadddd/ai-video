---
{
  "id": "material-library/surfaces/discord-community-shell",
  "title": "Discord Community Shell",
  "category": "surfaces",
  "summary": "Reusable Discord community shell with server rail, channel rail, central stage area, and optional right context panel.",
  "agentGoal": "Let the Agent reuse Discord Community Shell when a script needs discord community shell on discord environment without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when the story needs a reusable Discord environment that can host different transcripts, question stages, or proof blocks.",
    "Use when the scene can afford a heavy shell layer on discord environment."
  ],
  "avoidWhen": [
    "Avoid when the beat only needs one or two messages and the full shell would be too heavy.",
    "Avoid when phone close-up only."
  ],
  "keywords": [
    "discord community shell",
    "discord environment",
    "community shell",
    "server rail",
    "channel rail",
    "shell",
    "discord-native",
    "environment"
  ],
  "matchKeywords": [
    "discord community shell",
    "discord environment shell",
    "community chrome",
    "server and channel shell",
    "discord community shell",
    "discord environment",
    "community stage",
    "multi-column social ui",
    "discord-native",
    "environment",
    "Discord 社区壳层",
    "Discord 环境壳层",
    "多栏社区界面"
  ],
  "inputProps": [
    "channels",
    "activeChannel",
    "headerCopy",
    "children",
    "composer"
  ],
  "sourceProjects": [],
  "previewRef": "material-library/showcase#discord-community-shell",
  "stability": "stable",
  "implementationRef": "material-library/src/surfaces/discord-community-shell.tsx",
  "sceneTypes": [
    "discord",
    "community",
    "environment"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "channels",
    "activeChannel",
    "headerCopy",
    "children",
    "rightPanel"
  ],
  "visualSignature": [
    "Reusable Discord community shell with server rail, channel rail, central stage area, and optional right context panel.",
    "Reads as a heavy discord-native environment shell layer rather than a generic surfaces widget.",
    "Most natural on discord environment, community stage, multi-column social ui surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the story needs a reusable Discord world that can host different inner stages without rewriting the chrome.",
    "Best when the scene needs a heavy discord-native layer on discord environment.",
    "Choose it when the shell should own the frame for a moment."
  ],
  "compositionPatterns": [
    "Use it as the outer shell around one central transcript or proof stage.",
    "Keep one focal region active inside the shell instead of animating every rail equally.",
    "Usually staged next to Discord Transcript Stage, Discord Composer Bar, and Discord Noise Card Stage.",
    "Pair it with Discord Transcript Stage when the beat needs one more layer of context without replacing Discord Community Shell."
  ],
  "pairWithIds": [
    "material-library/surfaces/discord-transcript-stage",
    "material-library/chat/discord-composer-bar",
    "material-library/surfaces/discord-noise-card-stage"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/discord-home-community-shell",
    "material-library/surfaces/chat-bubble"
  ],
  "dos": [
    "Use Discord Community Shell only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with channels and central-stage content while keeping shell proportions stable."
  ],
  "donts": [
    "Do not use it when the beat only needs one or two messages and the full shell would be too heavy.",
    "Do not rewrite shell proportions in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Establish the Discord world in one read, then let one central stage carry the beat.",
    "Use the shell to keep platform context stable while the content inside changes.",
    "Prefer Chat Bubble when the scene only needs a much smaller conversational fragment."
  ],
  "narrativeRole": "environment",
  "scriptTriggersEn": [
    "discord community shell",
    "community chrome",
    "discord environment shell"
  ],
  "scriptTriggersZh": [
    "Discord 社区壳层",
    "Discord 环境壳层",
    "多栏社区界面"
  ],
  "negativeTriggersEn": [
    "phone close-up only",
    "single message beat"
  ],
  "negativeTriggersZh": [
    "只有手机特写",
    "单条消息节拍"
  ],
  "hostSurfaces": [
    "discord environment",
    "community stage",
    "multi-column social ui"
  ],
  "toneTags": [
    "discord-native",
    "environment"
  ],
  "visualWeight": "full-scene",
  "informationDensity": "high",
  "dominance": "scene-owning",
  "reuseMode": "heavy-adaptation",
  "mutationCost": "medium",
  "safeToChange": [
    "channels",
    "activeChannel",
    "headerCopy",
    "children",
    "rightPanel"
  ],
  "keepFixed": [
    "shell proportions",
    "rail hierarchy",
    "single-focal-point discipline"
  ],
  "adaptationNotes": [
    "Keep the shell as world-building chrome while one inner area carries the narrative work.",
    "If every column needs independent choreography, you are probably designing a new scene."
  ]
}
---
Discord Community Shell is the right pick when a project needs a reusable Discord world rather than a one-off Discord scene. It gives you the chrome, rails, and frame discipline so you can swap in different inner stages with data instead of copying whole scene files.
