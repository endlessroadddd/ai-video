---
{
  "id": "material-library/chat/avatar-presets",
  "title": "Avatar Presets",
  "category": "chat",
  "summary": "Named avatar preset map that resolves recurring identities into stable Lucius-style avatar art.",
  "agentGoal": "Let the Agent reuse Avatar Presets when a script needs stable avatar identity map on identity system without rebuilding the surrounding chat layer from scratch.",
  "whenToUse": [
    "Use when a scene needs deterministic avatar identity mapping across repeated renders or multiple messages.",
    "Use when the scene can afford a micro helper layer on identity system."
  ],
  "avoidWhen": [
    "Avoid when the project already requires photo-real avatars or externally hosted user images.",
    "Avoid when one-off custom illustration."
  ],
  "keywords": [
    "avatar",
    "preset",
    "identity",
    "chat",
    "helper",
    "systemic",
    "repeatable"
  ],
  "matchKeywords": [
    "avatar preset",
    "named avatar",
    "chat identity",
    "stable avatar identity map",
    "recurring persona lookup",
    "named avatar preset",
    "identity system",
    "avatar helper layer",
    "chat or discord shell",
    "identity",
    "systemic",
    "repeatable",
    "稳定头像身份映射",
    "重复角色查找",
    "命名头像 preset"
  ],
  "inputProps": [
    "name"
  ],
  "sourceProjects": [
    "projects/short-assets-discord_dm_refund",
    "projects/short-asset-ai-heavy-catch-you"
  ],
  "previewRef": "material-library/showcase#material-library-chat-avatar-presets",
  "stability": "stable",
  "implementationRef": "material-library/src/chat/avatar-presets.ts",
  "sceneTypes": [
    "chat",
    "identity"
  ],
  "styleFamilies": [
    "lucius-dark"
  ],
  "editableParts": [
    "namedAvatarPresets",
    "robotAvatarNames",
    "humanPresets"
  ],
  "visualSignature": [
    "Named avatar preset map that resolves recurring identities into stable Lucius-style avatar art.",
    "Reads as a micro identity, systemic, repeatable helper layer rather than a generic chat widget.",
    "Most natural on identity system, avatar helper layer, chat or discord shell surfaces."
  ],
  "selectionSignals": [
    "Reach for it when a scene needs deterministic avatar identity mapping across repeated renders or multiple messages.",
    "Best when the scene needs a micro identity layer on identity system.",
    "Choose it when the main shell or proof is already present and this asset should reinforce it."
  ],
  "compositionPatterns": [
    "Attach it to the message, toast, or local action that actually owns the beat.",
    "Keep the surrounding copy short so the conversational signal stays scannable.",
    "Usually staged next to Discord-Style Avatar, Chat Bubble, and Phone Frame.",
    "Pair it with Discord-Style Avatar when the beat needs one more layer of context without replacing Avatar Presets."
  ],
  "pairWithIds": [
    "material-library/chat/discord-avatar",
    "material-library/surfaces/chat-bubble",
    "material-library/surfaces/phone-frame"
  ],
  "preferInsteadIds": [],
  "dos": [
    "Use Avatar Presets only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with namedAvatarPresets and robotAvatarNames while keeping public contract and side-effect boundaries stable."
  ],
  "donts": [
    "Do not use it when the project already requires photo-real avatars or externally hosted user images.",
    "Do not rewrite public contract and side-effect boundaries in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Wire Avatar Presets into the motion or schema layer first.",
    "Use the helper to standardize behavior across multiple visible assets instead of improvising scene by scene.",
    "Pair with Discord-Style Avatar if the next beat needs more context or follow-through."
  ],
  "narrativeRole": "helper",
  "scriptTriggersEn": [
    "stable avatar identity map",
    "recurring persona lookup",
    "named avatar preset"
  ],
  "scriptTriggersZh": [
    "稳定头像身份映射",
    "重复角色查找",
    "命名头像 preset"
  ],
  "negativeTriggersEn": [
    "one-off custom illustration",
    "hero character art"
  ],
  "negativeTriggersZh": [
    "一次性定制插画",
    "主视觉角色立绘"
  ],
  "hostSurfaces": [
    "identity system",
    "avatar helper layer",
    "chat or discord shell"
  ],
  "toneTags": [
    "identity",
    "systemic",
    "repeatable"
  ],
  "visualWeight": "micro",
  "informationDensity": "low",
  "dominance": "supporting",
  "reuseMode": "drop-in",
  "mutationCost": "low",
  "safeToChange": [
    "namedAvatarPresets",
    "robotAvatarNames",
    "humanPresets",
    "name",
    "config values"
  ],
  "keepFixed": [
    "public contract",
    "side-effect boundaries",
    "timing or schema semantics"
  ],
  "adaptationNotes": [
    "Keep helpers predictable so visible assets can rely on them without scene-specific hacks.",
    "If the contract changes, version it instead of silently mutating the existing helper."
  ]
}
---
Avatar Presets is the right pick when a scene needs deterministic avatar identity mapping across repeated renders or multiple messages. Visually it reads as named avatar preset map that resolves recurring identities into stable lucius-style avatar art, with a identity, systemic, repeatable tone, and it sits best on identity system, avatar helper layer, chat or discord shell surfaces.

For matching, look for beats like stable avatar identity map / recurring persona lookup or 稳定头像身份映射 / 重复角色查找. Pair it with Discord-Style Avatar and Chat Bubble when the scene needs more context. Prefer a lighter alternative when the project already requires photo-real avatars or externally hosted user images.

For adaptation, change namedAvatarPresets, robotAvatarNames, humanPresets, name, config values first. Keep public contract, side-effect boundaries, timing or schema semantics stable so the asset still feels like the extracted original. Keep helpers predictable so visible assets can rely on them without scene-specific hacks. If the contract changes, version it instead of silently mutating the existing helper.
