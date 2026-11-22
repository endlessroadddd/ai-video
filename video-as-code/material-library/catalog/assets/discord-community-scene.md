---
{
  "id": "material-library/surfaces/discord-community-scene",
  "title": "Discord Community Scene",
  "category": "surfaces",
  "summary": "Full Discord community stage with server rail, channel rail, member rail, message flow, and staged scene variants from break-immersion.",
  "agentGoal": "Let the Agent reuse Discord Community Scene when a script needs full discord community scene on discord environment without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when the story needs a high-fidelity Discord community environment instead of a simplified chat shell.",
    "Use when the scene can afford a full-scene environment layer on discord environment."
  ],
  "avoidWhen": [
    "Avoid when the scene only needs one or two message bubbles or when a full four-column Discord layout would be visually too heavy.",
    "Avoid when single dm exchange."
  ],
  "keywords": [
    "discord scene",
    "community shell",
    "server rail",
    "channel rail",
    "member rail",
    "environment",
    "discord-native",
    "social"
  ],
  "matchKeywords": [
    "full discord community scene",
    "discord environment",
    "multi-column discord shell",
    "multi-column community chrome",
    "community stage",
    "multi-column social ui",
    "discord-native",
    "social",
    "immersive",
    "完整 Discord 社区场景",
    "Discord 环境",
    "多栏社区界面"
  ],
  "inputProps": [
    "chrome",
    "currentScene",
    "mode"
  ],
  "sourceProjects": [
    "projects/short-asset-break-immersion"
  ],
  "previewRef": "material-library/showcase#discord-community-scene",
  "stability": "beta",
  "implementationRef": "projects/short-asset-break-immersion/src/CommunityScene.tsx",
  "sceneTypes": [
    "community",
    "discord",
    "staged-story",
    "chat"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "scene state",
    "message data",
    "server slots",
    "channel sections",
    "member groups"
  ],
  "visualSignature": [
    "Full Discord community stage with server rail, channel rail, member rail, message flow, and staged scene variants from break-immersion.",
    "Reads as a full-scene discord-native, social, immersive environment layer rather than a generic surfaces widget.",
    "Most natural on discord environment, community stage, multi-column social ui surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the story needs a high-fidelity Discord community environment instead of a simplified chat shell.",
    "Best when the scene needs a full-scene discord-native layer on discord environment.",
    "Choose it when this asset needs to own the whole frame for a moment."
  ],
  "compositionPatterns": [
    "Use it as frame chrome around one or two focal elements, not as a dense page clone.",
    "Let the shell establish context before a smaller proof element takes over.",
    "Usually staged next to Discord DM Toolbar Icons, Discord-Style Avatar, and Discord Loss Chart Scene.",
    "Pair it with Discord DM Toolbar Icons when the beat needs one more layer of context without replacing Discord Community Scene."
  ],
  "pairWithIds": [
    "material-library/icons/discord-dm-toolbar-icons",
    "material-library/chat/discord-avatar",
    "material-library/data-display/discord-loss-chart-scene"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/discord-home-community-shell"
  ],
  "dos": [
    "Use Discord Community Scene only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with scene state and message data while keeping environment proportions and rail hierarchy stable."
  ],
  "donts": [
    "Do not use it when the scene only needs one or two message bubbles or when a full four-column Discord layout would be visually too heavy.",
    "Do not rewrite environment proportions and rail hierarchy in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Use Discord Community Scene to establish the world in one read.",
    "Animate one focal element inside the environment instead of activating every rail at once.",
    "Prefer Discord Home Community Shell when the scene only needs one or two message bubbles or when a full four-column Discord layout would be visually too heavy."
  ],
  "narrativeRole": "environment",
  "scriptTriggersEn": [
    "full discord community scene",
    "discord environment",
    "multi-column community chrome"
  ],
  "scriptTriggersZh": [
    "完整 Discord 社区场景",
    "Discord 环境",
    "多栏社区界面"
  ],
  "negativeTriggersEn": [
    "single dm exchange",
    "small proof insert"
  ],
  "negativeTriggersZh": [
    "单个私信往返",
    "小型证明插片"
  ],
  "hostSurfaces": [
    "discord environment",
    "community stage",
    "multi-column social ui"
  ],
  "toneTags": [
    "discord-native",
    "social",
    "immersive"
  ],
  "visualWeight": "full-scene",
  "informationDensity": "high",
  "dominance": "scene-owning",
  "reuseMode": "heavy-adaptation",
  "mutationCost": "high",
  "safeToChange": [
    "scene state",
    "message data",
    "server slots",
    "chrome",
    "currentScene"
  ],
  "keepFixed": [
    "environment proportions",
    "rail hierarchy",
    "single-focal-point discipline"
  ],
  "adaptationNotes": [
    "Use the environment to establish the world in one read, then let one focal proof or action own the beat.",
    "If several rails need independent choreography, you are probably designing a new scene rather than adapting this one."
  ]
}
---
Discord Community Scene is the right pick when the story needs a high-fidelity Discord community environment instead of a simplified chat shell. Visually it reads as full discord community stage with server rail, channel rail, member rail, message flow, and staged scene variants from break-immersion, with a discord-native, social, immersive tone, and it sits best on discord environment, community stage, multi-column social ui surfaces.

For matching, look for beats like full discord community scene / discord environment or 完整 Discord 社区场景 / Discord 环境. Pair it with Discord DM Toolbar Icons and Discord-Style Avatar when the scene needs more context. Prefer Discord Home Community Shell when the scene only needs one or two message bubbles or when a full four-column Discord layout would be visually too heavy.

For adaptation, change scene state, message data, server slots, chrome, currentScene first. Keep environment proportions, rail hierarchy, single-focal-point discipline stable so the asset still feels like the extracted original. Use the environment to establish the world in one read, then let one focal proof or action own the beat. If several rails need independent choreography, you are probably designing a new scene rather than adapting this one.
