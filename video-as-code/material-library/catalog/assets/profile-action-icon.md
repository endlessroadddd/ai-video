---
{
  "id": "material-library/icons/profile-action-icon",
  "title": "Profile Action Icon",
  "category": "icons",
  "summary": "Mic, audio, and settings action icons from the Discord profile rail, extracted as a typed icon set.",
  "agentGoal": "Let the Agent reuse Profile Action Icon when a script needs profile rail action icons on profile rail without rebuilding the surrounding icons layer from scratch.",
  "whenToUse": [
    "Use when a profile or channel shell needs the same tiny action glyph language as the original Discord scene.",
    "Use when the scene can afford a micro component layer on profile rail."
  ],
  "avoidWhen": [
    "Avoid when a broader icon library is already defining the surrounding UI.",
    "Avoid when primary brand mark."
  ],
  "keywords": [
    "profile icon",
    "mic icon",
    "audio icon",
    "settings icon",
    "component",
    "utility",
    "discord-native",
    "secondary"
  ],
  "matchKeywords": [
    "discord profile action",
    "channel action icons",
    "mic audio settings trio",
    "profile rail action icons",
    "mic audio settings row",
    "secondary utility icon set",
    "profile rail",
    "action row",
    "discord scene chrome",
    "utility",
    "discord-native",
    "secondary",
    "资料栏操作图标",
    "麦克风音频设置行",
    "次级工具图标组"
  ],
  "inputProps": [
    "kind",
    "className",
    "style"
  ],
  "sourceProjects": [
    "projects/short-asset-ai-heavy-catch-you"
  ],
  "previewRef": "material-library/showcase#profile-action-icon",
  "stability": "stable",
  "implementationRef": "material-library/src/icons/profile-action-icon.tsx",
  "sceneTypes": [
    "profile",
    "chat-shell",
    "discord"
  ],
  "styleFamilies": [
    "discord-dark"
  ],
  "editableParts": [
    "kind",
    "size",
    "color"
  ],
  "visualSignature": [
    "Mic, audio, and settings action icons from the Discord profile rail, extracted as a typed icon set.",
    "Reads as a micro utility, discord-native, secondary component layer rather than a generic icons widget.",
    "Most natural on profile rail, action row, discord scene chrome surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a profile or channel shell needs the same tiny action glyph language as the original Discord scene.",
    "Best when the scene needs a micro utility layer on profile rail.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the real control or shell chrome it belongs to.",
    "Let nearby layout or copy explain the action so the icon stays a support accent.",
    "Usually staged next to Discord Home Community Shell, Settings Section Shell, and Discord DM Toolbar Icons.",
    "Pair it with Discord Home Community Shell when the beat needs one more layer of context without replacing Profile Action Icon."
  ],
  "pairWithIds": [
    "material-library/surfaces/discord-home-community-shell",
    "material-library/surfaces/settings-section-shell",
    "material-library/icons/discord-dm-toolbar-icons"
  ],
  "preferInsteadIds": [
    "material-library/icons/black-send-cursor"
  ],
  "dos": [
    "Use Profile Action Icon only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with kind and size while keeping core silhouette and readability grouping stable."
  ],
  "donts": [
    "Do not use it when a broader icon library is already defining the surrounding UI.",
    "Do not rewrite core silhouette and readability grouping in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Keep the surrounding shell readable before Profile Action Icon enters.",
    "Profile Action Icon should own one clear readable unit, not compete with a second proof block.",
    "Prefer Black Send Cursor when a broader icon library is already defining the surrounding UI."
  ],
  "narrativeRole": "component",
  "scriptTriggersEn": [
    "profile rail action icons",
    "mic audio settings row",
    "secondary utility icon set"
  ],
  "scriptTriggersZh": [
    "资料栏操作图标",
    "麦克风音频设置行",
    "次级工具图标组"
  ],
  "negativeTriggersEn": [
    "primary brand mark",
    "data proof module"
  ],
  "negativeTriggersZh": [
    "主品牌标记",
    "数据证明模块"
  ],
  "hostSurfaces": [
    "profile rail",
    "action row",
    "discord scene chrome"
  ],
  "toneTags": [
    "utility",
    "discord-native",
    "secondary"
  ],
  "visualWeight": "micro",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "kind",
    "size",
    "color",
    "className",
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
Profile Action Icon is the right pick when a profile or channel shell needs the same tiny action glyph language as the original Discord scene. Visually it reads as mic, audio, and settings action icons from the discord profile rail, extracted as a typed icon set, with a utility, discord-native, secondary tone, and it sits best on profile rail, action row, discord scene chrome surfaces.

For matching, look for beats like profile rail action icons / mic audio settings row or 资料栏操作图标 / 麦克风音频设置行. Pair it with Discord Home Community Shell and Settings Section Shell when the scene needs more context. Prefer Black Send Cursor when a broader icon library is already defining the surrounding UI.

For adaptation, change kind, size, color, className, labels first. Keep core silhouette, readability grouping, spacing rhythm stable so the asset still feels like the extracted original. Keep the component readable in one glance before adding secondary motion around it. If you change the structural grouping, it is no longer a light adaptation of this component.
