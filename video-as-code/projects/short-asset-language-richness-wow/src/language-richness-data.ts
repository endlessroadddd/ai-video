import luciusLogoSrc from "./assets/brand/lucius.svg";
import luciAvatarSrc from "./assets/generated-ai-avatar.png";

export type HighlightFragment = {
  text: string;
  accent?: boolean;
};

export const brandAssets = {
  luciusLogoSrc,
  luciAvatarSrc,
} as const;

export const brandIdentity = {
  brandName: "Lucius",
  personaName: "Lucius",
  chipLabel: "AI support",
} as const;

export const openingKicker = "LANGUAGE PROOF";
export const closingKicker = "WOW MOMENT";

export const openingTitleFragments: readonly HighlightFragment[] = [
  { text: "No handoff." },
];

export const openingSubtitleFragments: readonly HighlightFragment[] = [
  { text: "Just a " },
  { text: "real chat", accent: true },
  { text: "." },
];

export const closingTitleFragments: readonly HighlightFragment[] = [
  { text: "Language rich enough to " },
  { text: "feel like service", accent: true },
  { text: "." },
];

export const closingSubtitleFragments: readonly HighlightFragment[] = [
  { text: "User: " },
  { text: "wow.", accent: true },
];

export const languageQualityCards = [
  {
    key: "tone",
    label: "Tone",
    caption: "Warm cadence, no template smell.",
    metric: { value: "94", unit: "warmth" },
  },
  {
    key: "context",
    label: "Context",
    caption: "Remembers the user already solved it.",
    metric: { value: "12", unit: "signals" },
    contextTags: ["order #4521", "last email", "resolved"],
  },
  {
    key: "patience",
    label: "Patience",
    caption: "Stays helpful after the ticket is done.",
    metric: { value: "2.4s", unit: "listen" },
  },
  {
    key: "honesty",
    label: "Honest reveal",
    caption: "Clear about being AI when asked.",
    metric: { value: "100%", unit: "disclosed" },
  },
] as const;
