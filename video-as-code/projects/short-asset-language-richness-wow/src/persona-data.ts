import luciusLogoSrc from "./assets/brand/lucius.svg";
import luciAvatarSrc from "./assets/generated-ai-avatar.png";
import luciCharacterSrc from "./assets/luci-character-office-20260422.png";

export type HighlightFragment = {
  text: string;
  accent?: boolean;
};

export type TraitCard = {
  key: "name" | "tone" | "backstory" | "phrases" | "avatar";
  label: string;
  value: string;
  shortValue?: string;
  caption: string;
  thumbnailSrc?: string;
};

export type TraitSignal = {
  icon: "identity" | "spark" | "memory" | "voice" | "portrait" | "star";
  label: string;
};

export const personaIdentity = {
  brandName: "Lucius",
  personaName: "LUCI",
  chipLabel: "AI Assistant",
  toneLabel: "Playful cosplayer",
} as const;

export const personaKicker = "LUCIUS PERSONA";
export const personaClosingKicker = "COMMUNITY PERSONA";

export const openingTitleFragments: readonly HighlightFragment[] = [
  { text: "What if your AI belonged to the " },
  { text: "community", accent: true },
  { text: "?" },
];

export const closingTitleFragments: readonly HighlightFragment[] = [
  { text: "Give your AI a character." },
];

export const closingSubtitleFragments: readonly HighlightFragment[] = [
  { text: "The " },
  { text: "community", accent: true },
  { text: " will adopt it." },
];

export const personaDecomposeCaption = "A persona is a set of configurable traits.";
export const personaMorphCaptionStart = "Lucius bundles them";
export const personaMorphCaptionEnd = "into a character";
export const personaCombinedFooter = "Persona gives AI a multidimensional soul.";

export const personaTraits: readonly TraitCard[] = [
  {
    key: "name",
    label: "Name",
    value: "LUCI",
    shortValue: "LUCI",
    caption: "Who they are",
  },
  {
    key: "tone",
    label: "Tone",
    value: "Playful cosplayer",
    shortValue: "Playful energy",
    caption: "How they speak",
  },
  {
    key: "backstory",
    label: "Backstory",
    value: "Twin-tail rooftop rogue",
    shortValue: "Rooftop rogue",
    caption: "What they remember",
  },
  {
    key: "phrases",
    label: "Signature phrases",
    value: "nyaa~ / stay sparkly",
    shortValue: "Stay sparkly",
    caption: "Their verbal tics",
  },
  {
    key: "avatar",
    label: "Avatar",
    value: "Official portrait",
    shortValue: "Official portrait",
    caption: "How they look",
    thumbnailSrc: luciAvatarSrc,
  },
] as const;

export const personaTraitSignals: Record<TraitCard["key"], readonly TraitSignal[]> = {
  name: [
    { icon: "identity", label: "identity seed" },
    { icon: "spark", label: "community alias" },
    { icon: "star", label: "role imprint" },
    { icon: "identity", label: "name lock" },
  ],
  tone: [
    { icon: "voice", label: "voice color" },
    { icon: "spark", label: "playful rhythm" },
    { icon: "star", label: "reply warmth" },
    { icon: "voice", label: "social energy" },
  ],
  backstory: [
    { icon: "memory", label: "memory shard" },
    { icon: "identity", label: "rooftop lore" },
    { icon: "star", label: "canon anchor" },
    { icon: "memory", label: "scene recall" },
  ],
  phrases: [
    { icon: "voice", label: "catchphrase pack" },
    { icon: "spark", label: "verbal tic" },
    { icon: "star", label: "signature cue" },
    { icon: "voice", label: "reply flavor" },
  ],
  avatar: [
    { icon: "portrait", label: "portrait key" },
    { icon: "spark", label: "visual anchor" },
    { icon: "identity", label: "face match" },
    { icon: "portrait", label: "silhouette lock" },
  ],
};

export const personaAssets = {
  luciusLogoSrc,
  luciAvatarSrc,
  luciCharacterSrc,
} as const;
