---
{
  "id": "material-library/surfaces/phone-frame",
  "title": "Phone Frame",
  "category": "surfaces",
  "summary": "Mobile device frame and header shell for 1:1 or 9:16 chat beats.",
  "agentGoal": "Let the Agent reuse Phone Frame when a script needs phone framed chat on phone shell without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when the scene is a phone-native chat or mobile handoff.",
    "Use when the scene can afford a medium shell layer on phone shell."
  ],
  "avoidWhen": [
    "Avoid when the story beat is clearly desktop UI.",
    "Avoid when desktop dashboard."
  ],
  "keywords": [
    "phone",
    "device",
    "mobile",
    "shell",
    "framed",
    "chat-native"
  ],
  "matchKeywords": [
    "phone frame",
    "mobile chat shell",
    "phone framed chat",
    "vertical mobile stage",
    "device shell around chat",
    "phone shell",
    "vertical chat scene",
    "mobile close-up",
    "mobile",
    "framed",
    "chat-native",
    "手机壳聊天场景",
    "竖屏移动端舞台",
    "设备框包裹聊天"
  ],
  "inputProps": [
    "side",
    "title",
    "altTitle",
    "altTitleProgress",
    "style"
  ],
  "sourceProjects": [
    "projects/short-asset-thought-you-were-staff"
  ],
  "previewRef": "material-library/showcase#phone-frame",
  "stability": "stable",
  "implementationRef": "material-library/src/surfaces/phone-frame.tsx",
  "sceneTypes": [
    "mobile-chat",
    "handoff"
  ],
  "styleFamilies": [
    "lucius-dark"
  ],
  "editableParts": [
    "title",
    "altTitle",
    "avatar"
  ],
  "visualSignature": [
    "Mobile device frame and header shell for 1:1 or 9:16 chat beats.",
    "Reads as a medium mobile, framed, chat-native shell layer rather than a generic surfaces widget.",
    "Most natural on phone shell, vertical chat scene, mobile close-up surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the scene is a phone-native chat or mobile handoff.",
    "Best when the scene needs a medium mobile layer on phone shell.",
    "Choose it when this asset should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Use it as frame chrome around one or two focal elements, not as a dense page clone.",
    "Let the shell establish context before a smaller proof element takes over.",
    "Usually staged next to Chat Bubble, Composer Shell, and Floating Emoji Accent.",
    "Pair it with Chat Bubble when the beat needs one more layer of context without replacing Phone Frame."
  ],
  "pairWithIds": [
    "material-library/surfaces/chat-bubble",
    "material-library/surfaces/composer-shell",
    "material-library/chat/floating-emoji"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/chat-bubble"
  ],
  "dos": [
    "Use Phone Frame only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with title and altTitle while keeping frame geometry and chrome proportions stable."
  ],
  "donts": [
    "Do not use it when the story beat is clearly desktop UI.",
    "Do not rewrite frame geometry and chrome proportions in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Use Phone Frame to establish interface context in one glance.",
    "Keep the shell stable while proof or accent layers do the moment-to-moment work.",
    "Prefer Chat Bubble when the story beat is clearly desktop UI."
  ],
  "narrativeRole": "shell",
  "scriptTriggersEn": [
    "phone framed chat",
    "vertical mobile stage",
    "device shell around chat"
  ],
  "scriptTriggersZh": [
    "手机壳聊天场景",
    "竖屏移动端舞台",
    "设备框包裹聊天"
  ],
  "negativeTriggersEn": [
    "desktop dashboard",
    "full discord environment"
  ],
  "negativeTriggersZh": [
    "桌面仪表盘",
    "完整 Discord 环境"
  ],
  "hostSurfaces": [
    "phone shell",
    "vertical chat scene",
    "mobile close-up"
  ],
  "toneTags": [
    "mobile",
    "framed",
    "chat-native"
  ],
  "visualWeight": "medium",
  "informationDensity": "medium",
  "dominance": "primary",
  "reuseMode": "tweak-layout",
  "mutationCost": "medium",
  "safeToChange": [
    "title",
    "altTitle",
    "avatar",
    "side",
    "interior content"
  ],
  "keepFixed": [
    "frame geometry",
    "chrome proportions",
    "spacing rhythm"
  ],
  "adaptationNotes": [
    "Let the shell establish context, then layer proof or accents inside it.",
    "If the chrome hierarchy changes materially, promote that work into a new shell asset."
  ]
}
---
Phone Frame is the right pick when the scene is a phone-native chat or mobile handoff. Visually it reads as mobile device frame and header shell for 1:1 or 9:16 chat beats, with a mobile, framed, chat-native tone, and it sits best on phone shell, vertical chat scene, mobile close-up surfaces.

For matching, look for beats like phone framed chat / vertical mobile stage or 手机壳聊天场景 / 竖屏移动端舞台. Pair it with Chat Bubble and Composer Shell when the scene needs more context. Prefer Chat Bubble when the story beat is clearly desktop UI.

For adaptation, change title, altTitle, avatar, side, interior content first. Keep frame geometry, chrome proportions, spacing rhythm stable so the asset still feels like the extracted original. Let the shell establish context, then layer proof or accents inside it. If the chrome hierarchy changes materially, promote that work into a new shell asset.
