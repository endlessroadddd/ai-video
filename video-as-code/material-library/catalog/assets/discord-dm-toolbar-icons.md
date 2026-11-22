---
{
  "id": "material-library/icons/discord-dm-toolbar-icons",
  "title": "Discord DM Toolbar Icons",
  "category": "icons",
  "summary": "Header icon strip for Discord DM scenes, including phone, video, pin, search, inbox, and help actions.",
  "agentGoal": "Let the Agent reuse Discord DM Toolbar Icons when a script needs discord toolbar icons on discord header without rebuilding the surrounding icons layer from scratch.",
  "whenToUse": [
    "Use when a Discord DM or support thread scene needs its top-right action strip to feel complete.",
    "Use when the scene can afford a light component layer on discord header."
  ],
  "avoidWhen": [
    "Avoid when the scene is not Discord-like or when these affordances would imply features the story does not need.",
    "Avoid when scene needs only one icon."
  ],
  "keywords": [
    "discord dm",
    "toolbar icons",
    "phone icon",
    "video icon",
    "inbox icon",
    "component",
    "discord-native",
    "utility"
  ],
  "matchKeywords": [
    "discord header icons",
    "dm toolbar strip",
    "discord action icons",
    "discord toolbar icons",
    "dm header chrome",
    "discord header utility row",
    "discord header",
    "toolbar row",
    "dm chrome",
    "discord-native",
    "utility",
    "header",
    "Discord 工具栏图标",
    "私信头部 chrome",
    "Discord 头部工具行"
  ],
  "inputProps": [
    "size",
    "gap",
    "color",
    "style",
    "className"
  ],
  "sourceProjects": [
    "projects/short-assets-discord_dm_refund"
  ],
  "previewRef": "material-library/showcase#discord-dm-toolbar-icons",
  "stability": "stable",
  "implementationRef": "material-library/src/icons/discord-dm-toolbar-icons.tsx",
  "sceneTypes": [
    "discord",
    "dm",
    "header",
    "toolbar"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "icon size",
    "gap",
    "color",
    "visible subset"
  ],
  "visualSignature": [
    "Header icon strip for Discord DM scenes, including phone, video, pin, search, inbox, and help actions.",
    "Reads as a light discord-native, utility, header component layer rather than a generic icons widget.",
    "Most natural on discord header, toolbar row, dm chrome surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a Discord DM or support thread scene needs its top-right action strip to feel complete.",
    "Best when the scene needs a light discord-native layer on discord header.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the real control or shell chrome it belongs to.",
    "Let nearby layout or copy explain the action so the icon stays a support accent.",
    "Usually staged next to Discord Community Scene, Discord Home Community Shell, and Profile Action Icon.",
    "Pair it with Discord Community Scene when the beat needs one more layer of context without replacing Discord DM Toolbar Icons."
  ],
  "pairWithIds": [
    "material-library/surfaces/discord-community-scene",
    "material-library/surfaces/discord-home-community-shell",
    "material-library/icons/profile-action-icon"
  ],
  "preferInsteadIds": [
    "material-library/icons/profile-action-icon"
  ],
  "dos": [
    "Use Discord DM Toolbar Icons only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with icon size and gap while keeping core silhouette and readability grouping stable."
  ],
  "donts": [
    "Do not use it when the scene is not Discord-like or when these affordances would imply features the story does not need.",
    "Do not rewrite core silhouette and readability grouping in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Keep the surrounding shell readable before Discord DM Toolbar Icons enters.",
    "Discord DM Toolbar Icons should own one clear readable unit, not compete with a second proof block.",
    "Prefer Profile Action Icon when the scene is not Discord-like or when these affordances would imply features the story does not need."
  ],
  "narrativeRole": "component",
  "scriptTriggersEn": [
    "discord toolbar icons",
    "dm header chrome",
    "discord header utility row"
  ],
  "scriptTriggersZh": [
    "Discord 工具栏图标",
    "私信头部 chrome",
    "Discord 头部工具行"
  ],
  "negativeTriggersEn": [
    "scene needs only one icon",
    "phone shell without discord chrome"
  ],
  "negativeTriggersZh": [
    "场景只需要一个图标",
    "没有 Discord chrome 的手机壳"
  ],
  "hostSurfaces": [
    "discord header",
    "toolbar row",
    "dm chrome"
  ],
  "toneTags": [
    "discord-native",
    "utility",
    "header"
  ],
  "visualWeight": "light",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "icon size",
    "gap",
    "color",
    "size",
    "labels"
  ],
  "keepFixed": [
    "core silhouette",
    "readability grouping",
    "spacing rhythm"
  ],
  "adaptationNotes": [
    "Keep the component readable in one glance before adding secondary motion around it.",
    "If you change the structural grouping, it is no longer a light adaptation of this component."
  ]
}
---
Discord DM Toolbar Icons is the right pick when a Discord DM or support thread scene needs its top-right action strip to feel complete. Visually it reads as header icon strip for discord dm scenes, including phone, video, pin, search, inbox, and help actions, with a discord-native, utility, header tone, and it sits best on discord header, toolbar row, dm chrome surfaces.

For matching, look for beats like discord toolbar icons / dm header chrome or Discord 工具栏图标 / 私信头部 chrome. Pair it with Discord Community Scene and Discord Home Community Shell when the scene needs more context. Prefer Profile Action Icon when the scene is not Discord-like or when these affordances would imply features the story does not need.

For adaptation, change icon size, gap, color, size, labels first. Keep core silhouette, readability grouping, spacing rhythm stable so the asset still feels like the extracted original. Keep the component readable in one glance before adding secondary motion around it. If you change the structural grouping, it is no longer a light adaptation of this component.
