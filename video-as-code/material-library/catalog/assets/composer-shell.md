---
{
  "id": "material-library/surfaces/composer-shell",
  "title": "Composer Shell",
  "category": "surfaces",
  "summary": "Input composer shell with typing, thinking, and idle states.",
  "agentGoal": "Let the Agent reuse Composer Shell when a script needs typing state on chat footer without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when you need a chat input indicator or thinking state.",
    "Use when the scene can afford a light shell layer on chat footer."
  ],
  "avoidWhen": [
    "Avoid if the scene does not show user input or typing feedback.",
    "Avoid when scene needs only bubbles."
  ],
  "keywords": [
    "composer",
    "input",
    "typing",
    "shell",
    "input-state",
    "chat-native",
    "operational"
  ],
  "matchKeywords": [
    "composer",
    "typing indicator",
    "chat input",
    "typing state",
    "thinking composer",
    "message input shell",
    "chat footer",
    "message composer",
    "phone shell",
    "input-state",
    "chat-native",
    "operational",
    "输入中状态",
    "思考中的 composer",
    "消息输入壳层"
  ],
  "inputProps": [
    "mode",
    "text",
    "placeholder",
    "thinkingEmojiCodepoint",
    "showTools",
    "accent"
  ],
  "sourceProjects": [
    "projects/short-asset-thought-you-were-staff"
  ],
  "previewRef": "material-library/showcase#composer-shell",
  "stability": "stable",
  "implementationRef": "material-library/src/surfaces/composer-shell.tsx",
  "sceneTypes": [
    "chat",
    "support-thread"
  ],
  "styleFamilies": [
    "lucius-dark"
  ],
  "editableParts": [
    "text",
    "mode",
    "accent",
    "thinkingEmojiCodepoint"
  ],
  "visualSignature": [
    "Input composer shell with typing, thinking, and idle states.",
    "Reads as a light input-state, chat-native, operational shell layer rather than a generic surfaces widget.",
    "Most natural on chat footer, message composer, phone shell surfaces."
  ],
  "selectionSignals": [
    "Reach for it when you need a chat input indicator or thinking state.",
    "Best when the scene needs a light input-state layer on chat footer.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Use it as frame chrome around one or two focal elements, not as a dense page clone.",
    "Let the shell establish context before a smaller proof element takes over.",
    "Usually staged next to Black Send Cursor, Phone Frame, and Reply Ready Toast.",
    "Pair it with Black Send Cursor when the beat needs one more layer of context without replacing Composer Shell."
  ],
  "pairWithIds": [
    "material-library/icons/black-send-cursor",
    "material-library/surfaces/phone-frame",
    "material-library/chat/reply-ready-toast"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/chat-bubble"
  ],
  "dos": [
    "Use Composer Shell only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with text and mode while keeping frame geometry and chrome proportions stable."
  ],
  "donts": [
    "Do not use it when Avoid if the scene does not show user input or typing feedback.",
    "Do not rewrite frame geometry and chrome proportions in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Use Composer Shell to establish interface context in one glance.",
    "Keep the shell stable while proof or accent layers do the moment-to-moment work.",
    "Prefer Chat Bubble when Avoid if the scene does not show user input or typing feedback."
  ],
  "narrativeRole": "shell",
  "scriptTriggersEn": [
    "typing state",
    "thinking composer",
    "message input shell"
  ],
  "scriptTriggersZh": [
    "输入中状态",
    "思考中的 composer",
    "消息输入壳层"
  ],
  "negativeTriggersEn": [
    "scene needs only bubbles",
    "dashboard-style proof stage"
  ],
  "negativeTriggersZh": [
    "场景只需要气泡",
    "仪表盘式证明场景"
  ],
  "hostSurfaces": [
    "chat footer",
    "message composer",
    "phone shell"
  ],
  "toneTags": [
    "input-state",
    "chat-native",
    "operational"
  ],
  "visualWeight": "light",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "tweak-copy",
  "mutationCost": "low",
  "safeToChange": [
    "text",
    "mode",
    "accent",
    "interior content",
    "labels and copy"
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
Composer Shell is the right pick when you need a chat input indicator or thinking state. Visually it reads as input composer shell with typing, thinking, and idle states, with a input-state, chat-native, operational tone, and it sits best on chat footer, message composer, phone shell surfaces.

For matching, look for beats like typing state / thinking composer or 输入中状态 / 思考中的 composer. Pair it with Black Send Cursor and Phone Frame when the scene needs more context. Prefer Chat Bubble when Avoid if the scene does not show user input or typing feedback.

For adaptation, change text, mode, accent, interior content, labels and copy first. Keep frame geometry, chrome proportions, spacing rhythm stable so the asset still feels like the extracted original. Let the shell establish context, then layer proof or accents inside it. If the chrome hierarchy changes materially, promote that work into a new shell asset.
