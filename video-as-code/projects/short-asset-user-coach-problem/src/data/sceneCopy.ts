export type DiscordMessage = {
  author: string;
  time: string;
  body: string;
  tone?: "normal" | "repeat" | "muted" | "warning";
};

export const floodMessages: readonly DiscordMessage[] = [
  {
    author: "Luna",
    time: "Today at 10:14 AM",
    body: "How do I connect my first knowledge base?",
    tone: "repeat",
  },
  {
    author: "MaxA",
    time: "Today at 11:02 AM",
    body: "How do I connect my first knowledge base?",
    tone: "repeat",
  },
  {
    author: "ByteRider",
    time: "Today at 1:47 PM",
    body: "Still can't figure out how to connect my knowledge base... anyone?",
    tone: "repeat",
  },
  {
    author: "Sage",
    time: "Today at 2:21 PM",
    body: "Is there a step-by-step guide? The current docs are confusing.",
    tone: "muted",
  },
];

export const floodChannelRows = [
  { label: "welcome", active: false },
  { label: "announcements", active: false },
  { label: "general", active: false },
  { label: "community-help", active: true },
  { label: "resources", active: false },
  { label: "bug-reports", active: false },
  { label: "feature-requests", active: false },
] as const;

export const docsFeedMessages: readonly DiscordMessage[] = [
  { author: "Nova", time: "10:03", body: "How do I connect my first knowledge base?", tone: "repeat" },
  { author: "Echo", time: "10:03", body: "Same question lol", tone: "muted" },
  { author: "Pixel", time: "10:04", body: "Where do I find the API key? I've been looking for 20 mins.", tone: "normal" },
  { author: "Luna", time: "10:04", body: "How do I connect my first knowledge base?", tone: "repeat" },
  { author: "ByteRider", time: "10:04", body: "Still can't figure it out...", tone: "repeat" },
  { author: "MaxA", time: "10:05", body: "How do I connect my first knowledge base?", tone: "repeat" },
  { author: "Zed", time: "10:05", body: "Docs are outdated, this is frustrating.", tone: "warning" },
  { author: "Kai", time: "10:07", body: "Just wasted so much time setting this up...", tone: "warning" },
  { author: "Sage", time: "10:09", body: "Why is this so hard to understand?", tone: "normal" },
];

export const coachTags = ["Stuck in Onboarding", "Frustrated tone", "High Churn Risk"] as const;
