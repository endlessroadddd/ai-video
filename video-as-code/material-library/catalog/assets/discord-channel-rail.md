---
{
  "id": "material-library/surfaces/discord-channel-rail",
  "title": "Discord Channel Rail",
  "category": "surfaces",
  "summary": "Discord-style channel sidebar with section label, search affordance, active state, and watch state.",
  "agentGoal": "Let the Agent reuse Discord Channel Rail when a script needs discord channel sidebar on community shell without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when a Discord scene needs channel context without drawing the full environment by hand.",
    "Use when the scene can afford a medium shell layer on community shell."
  ],
  "avoidWhen": [
    "Avoid when the scene is a tight message close-up and the sidebar would just add noise.",
    "Avoid when mobile transcript only."
  ],
  "keywords": [
    "discord channel rail",
    "channel sidebar",
    "community shell",
    "sidebar",
    "shell",
    "discord-native",
    "environment"
  ],
  "matchKeywords": [
    "discord channel rail",
    "channel sidebar",
    "discord sidebar",
    "community rail",
    "discord channel sidebar",
    "community shell",
    "discord environment",
    "channel list chrome",
    "discord-native",
    "environment",
    "频道侧栏",
    "Discord 频道栏",
    "社区侧边栏"
  ],
  "inputProps": [
    "channels",
    "activeChannel",
    "headerCopy",
    "searchPulse"
  ],
  "sourceProjects": [],
  "previewRef": "material-library/showcase#discord-channel-rail",
  "stability": "stable",
  "implementationRef": "material-library/src/surfaces/discord-channel-rail.tsx",
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
    "headerCopy"
  ],
  "visualSignature": [
    "Discord-style channel sidebar with section label, search affordance, active state, and watch state.",
    "Reads as a medium discord-native environment shell layer rather than a generic sidebar widget.",
    "Most natural on community shell, discord environment, channel list chrome surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the viewer needs to understand what part of the server they are looking at.",
    "Best when the scene needs a medium discord-native layer on community shell.",
    "Choose it when the shell needs platform context but should not take over the whole frame."
  ],
  "compositionPatterns": [
    "Use it beside a transcript or central stage, not alone.",
    "Let the active channel signal support the main read instead of becoming the main read.",
    "Usually staged next to Discord Community Shell and Discord Transcript Stage.",
    "Pair it with Discord Community Shell when the beat needs one more layer of context without replacing Discord Channel Rail."
  ],
  "pairWithIds": [
    "material-library/surfaces/discord-community-shell",
    "material-library/surfaces/discord-transcript-stage"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/discord-home-community-shell"
  ],
  "dos": [
    "Use Discord Channel Rail only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with channel names and active state while keeping sidebar hierarchy stable."
  ],
  "donts": [
    "Do not use it when the scene is a tight message close-up and the sidebar would just add noise.",
    "Do not rewrite sidebar hierarchy in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Use the rail to establish where the transcript lives before the transcript starts doing the narrative work.",
    "Keep the rail supportive and relatively still.",
    "Prefer Discord Home Community Shell when you need a more opinionated full-screen Discord layout."
  ],
  "narrativeRole": "shell",
  "scriptTriggersEn": [
    "discord channel sidebar",
    "channel list chrome",
    "discord channel rail"
  ],
  "scriptTriggersZh": [
    "频道侧栏",
    "Discord 频道栏",
    "社区侧边栏"
  ],
  "negativeTriggersEn": [
    "mobile transcript only",
    "single message close-up"
  ],
  "negativeTriggersZh": [
    "只有移动端转录",
    "单条消息特写"
  ],
  "hostSurfaces": [
    "community shell",
    "discord environment",
    "channel list chrome"
  ],
  "toneTags": [
    "discord-native",
    "environment"
  ],
  "visualWeight": "medium",
  "informationDensity": "medium",
  "dominance": "supporting",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "channels",
    "activeChannel",
    "headerCopy",
    "labels"
  ],
  "keepFixed": [
    "sidebar hierarchy",
    "channel-row rhythm",
    "platform-native proportions"
  ],
  "adaptationNotes": [
    "Keep the rail readable in one glance so it establishes context instead of slowing the scene down.",
    "If the rail starts behaving like a standalone dashboard, it should become a different scene."
  ]
}
---
Discord Channel Rail is the right pick when a Discord scene needs a sidebar that makes the server context legible fast. It should support the central stage, not compete with it.
