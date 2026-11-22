---
{
  "id": "material-library/surfaces/resolve-overlay",
  "title": "Resolve Overlay",
  "category": "surfaces",
  "summary": "Closing brand lockup with mark, wordmark, and optional final summary line from the original resolve scene.",
  "agentGoal": "Let the Agent reuse Resolve Overlay when a script needs resolved brand close on brand close without rebuilding the surrounding surfaces layer from scratch.",
  "whenToUse": [
    "Use when the scene needs to resolve from a product interaction into a branded final statement.",
    "Use when the scene can afford a heavy transition layer on brand close."
  ],
  "avoidWhen": [
    "Avoid when the ending should remain in-product or when another brand should own the close.",
    "Avoid when mid-scene proof block."
  ],
  "keywords": [
    "resolve overlay",
    "brand lockup",
    "closing summary",
    "wordmark",
    "transition",
    "resolved",
    "brand-close",
    "confident"
  ],
  "matchKeywords": [
    "final brand lockup",
    "resolve scene",
    "closing overlay",
    "resolved brand close",
    "final summary overlay",
    "closing lockup",
    "brand close",
    "resolve card",
    "final beat",
    "resolved",
    "brand-close",
    "confident",
    "收束品牌结尾",
    "最终总结 overlay",
    "结尾品牌锁定"
  ],
  "inputProps": [
    "style",
    "summary",
    "summaryStyle",
    "markSrc",
    "wordmarkSrc"
  ],
  "sourceProjects": [
    "projects/short-asset-thought-you-were-staff"
  ],
  "previewRef": "material-library/showcase#resolve-overlay",
  "stability": "stable",
  "implementationRef": "material-library/src/surfaces/resolve-overlay.tsx",
  "sceneTypes": [
    "resolve",
    "brand-close",
    "final-frame"
  ],
  "styleFamilies": [
    "lucius-light"
  ],
  "editableParts": [
    "summary",
    "asset-paths",
    "reveal-style"
  ],
  "visualSignature": [
    "Closing brand lockup with mark, wordmark, and optional final summary line from the original resolve scene.",
    "Reads as a heavy resolved, brand-close, confident transition layer rather than a generic surfaces widget.",
    "Most natural on brand close, resolve card, final beat surfaces."
  ],
  "selectionSignals": [
    "Reach for it when the scene needs to resolve from a product interaction into a branded final statement.",
    "Best when the scene needs a heavy resolved layer on brand close.",
    "Choose it when this asset should carry the main readable beat."
  ],
  "compositionPatterns": [
    "Use it as frame chrome around one or two focal elements, not as a dense page clone.",
    "Let the shell establish context before a smaller proof element takes over.",
    "Usually staged next to Brand Transition Ring, Lucius Logo Mark, and Proof Chip.",
    "Pair it with Brand Transition Ring when the beat needs one more layer of context without replacing Resolve Overlay."
  ],
  "pairWithIds": [
    "material-library/motion/brand-transition-ring",
    "material-library/icons/lucius-logo-mark",
    "material-library/surfaces/proof-chip"
  ],
  "preferInsteadIds": [
    "material-library/surfaces/proof-chip"
  ],
  "dos": [
    "Use Resolve Overlay only after the viewer can already identify the local context it belongs to.",
    "Start adaptation with summary and asset-paths while keeping entry and exit choreography and focus center and silhouette stable."
  ],
  "donts": [
    "Do not use it when the ending should remain in-product or when another brand should own the close.",
    "Do not rewrite entry and exit choreography and focus center and silhouette in the same pass unless you are intentionally creating a new asset."
  ],
  "scriptRecipe": [
    "Let the previous scene complete its read before Resolve Overlay takes over.",
    "Resolve Overlay should own the handoff or close instead of sharing the frame with dense fresh copy.",
    "Prefer Proof Chip when the ending should remain in-product or when another brand should own the close."
  ],
  "narrativeRole": "transition",
  "scriptTriggersEn": [
    "resolved brand close",
    "final summary overlay",
    "closing lockup"
  ],
  "scriptTriggersZh": [
    "收束品牌结尾",
    "最终总结 overlay",
    "结尾品牌锁定"
  ],
  "negativeTriggersEn": [
    "mid-scene proof block",
    "chat-native inline beat"
  ],
  "negativeTriggersZh": [
    "中段证明模块",
    "聊天内联时刻"
  ],
  "hostSurfaces": [
    "brand close",
    "resolve card",
    "final beat"
  ],
  "toneTags": [
    "resolved",
    "brand-close",
    "confident"
  ],
  "visualWeight": "heavy",
  "informationDensity": "low",
  "dominance": "primary",
  "reuseMode": "tweak-copy",
  "mutationCost": "medium",
  "safeToChange": [
    "summary",
    "asset-paths",
    "reveal-style",
    "style",
    "headline copy"
  ],
  "keepFixed": [
    "entry and exit choreography",
    "focus center and silhouette",
    "timing envelope"
  ],
  "adaptationNotes": [
    "Keep the transition readable in one beat.",
    "If the handoff rhythm changes completely, fork a new transition instead of stretching this one out of shape."
  ]
}
---
Resolve Overlay is the right pick when the scene needs to resolve from a product interaction into a branded final statement. Visually it reads as closing brand lockup with mark, wordmark, and optional final summary line from the original resolve scene, with a resolved, brand-close, confident tone, and it sits best on brand close, resolve card, final beat surfaces.

For matching, look for beats like resolved brand close / final summary overlay or 收束品牌结尾 / 最终总结 overlay. Pair it with Brand Transition Ring and Lucius Logo Mark when the scene needs more context. Prefer Proof Chip when the ending should remain in-product or when another brand should own the close.

For adaptation, change summary, asset-paths, reveal-style, style, headline copy first. Keep entry and exit choreography, focus center and silhouette, timing envelope stable so the asset still feels like the extracted original. Keep the transition readable in one beat. If the handoff rhythm changes completely, fork a new transition instead of stretching this one out of shape.
