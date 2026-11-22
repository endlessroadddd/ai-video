import type { AnimatedEmojiId } from "./animated-emoji";

export type DiscordMessageTone = "user" | "bot" | "system";
export type SceneMode = "static" | "motion";
export type SceneView = "b1" | "b2" | "b3" | "b4" | "b5" | "b6";
export type ConversationBeat = "followup" | "answer" | "reveal";

export type MessagePart =
  | { type: "text"; value: string }
  | { type: "strong"; value: string }
  | { type: "emoji"; id: AnimatedEmojiId; alt: string };

export type DiscordMessage = {
  id: string | number;
  author: string;
  avatarName?: string;
  text: string;
  tone: DiscordMessageTone;
  timestamp?: string;
  appBadge?: boolean;
  botTag?: string;
  secondaryText?: string;
  footerText?: string;
  attachmentImageSrc?: string;
  attachmentImageAlt?: string;
  parts?: readonly MessagePart[];
  reactions?: readonly AnimatedEmojiId[];
  emphasis?: "wow";
};

export type ChannelSpec = {
  name: string;
  symbol?: string;
  active?: boolean;
  voice?: boolean;
};

export type ChannelSection = {
  title: string;
  channels: readonly ChannelSpec[];
};

export type MemberGroup = {
  title: string;
  names: readonly string[];
  tone: string;
};

export type ServerSlot = {
  label: string;
  badge?: string;
  tone: "community" | "aux" | "muted" | "plus";
  selected?: boolean;
  badgeTone?: "default" | "small" | "wide";
};

const sceneViews = new Set<SceneView>(["b1", "b2", "b3", "b4", "b5", "b6"]);
const sceneModes = new Set<SceneMode>(["static", "motion"]);

export function isSceneView(value: string | null): value is SceneView {
  return value !== null && sceneViews.has(value as SceneView);
}

export function isSceneMode(value: string | null): value is SceneMode {
  return value !== null && sceneModes.has(value as SceneMode);
}

function textPart(value: string): MessagePart {
  return { type: "text", value };
}

function strongPart(value: string): MessagePart {
  return { type: "strong", value };
}

function emojiPart(id: AnimatedEmojiId, alt: string): MessagePart {
  return { type: "emoji", id, alt };
}

const supportConversationMessages = [
  {
    id: "support-0",
    author: "sam.user",
    timestamp: "Today at 10:41 AM",
    text: "ok, that solves it for me. also, your product is honestly pretty good — why did you build it?",
    tone: "user",
  },
  {
    id: "support-1",
    author: "Lucius",
    avatarName: "Lucius",
    timestamp: "Today at 10:42 AM",
    text: "haha, thank you. We built Lucius because community teams should not have to choose between fast answers and patient, human service.",
    tone: "bot",
    appBadge: true,
    parts: [
      textPart("haha, thank you. We built Lucius because community teams should not have to choose between "),
      strongPart("fast answers"),
      textPart(" and "),
      strongPart("patient, human service"),
      textPart("."),
    ],
  },
  {
    id: "support-2",
    author: "sam.user",
    timestamp: "Today at 10:43 AM",
    text: "got it. what's your name? I want to leave feedback — your service quality is high, super patient.",
    tone: "user",
  },
  {
    id: "support-3",
    author: "Lucius",
    avatarName: "Lucius",
    timestamp: "Today at 10:43 AM",
    text: "I'm Lucius. One small note: I'm actually AI, not a human teammate.",
    tone: "bot",
    appBadge: true,
    parts: [
      textPart("I'm Lucius. One small note: I'm actually "),
      strongPart("AI"),
      textPart(", not a human teammate."),
    ],
    secondaryText: "Honest reveal, no pretend-human handoff.",
  },
  {
    id: "support-wow",
    author: "sam.user",
    timestamp: "Today at 10:44 AM",
    text: "wow!",
    tone: "user",
    parts: [strongPart("wow!")],
    reactions: ["star-struck", "two-hearts"],
    emphasis: "wow",
  },
] as const satisfies readonly DiscordMessage[];

export const communityGuildState = {
  homeServerLabel: "VM",
  guildName: "Lucius Community",
  activeChannel: "support-lounge",
  activeChannelSymbol: "#",
  searchPlaceholder: "Search Lucius Community",
  channelTopic: "Resolved support threads, product feedback, and community questions.",
  profile: { name: "morgan.ops", tag: "#0424" },
  serverSlots: [
    { label: "LC", tone: "community", selected: true },
    { label: "QA", badge: "2", tone: "aux", badgeTone: "small" },
    { label: "ON", badge: "1", tone: "muted", badgeTone: "small" },
    { label: "+", tone: "plus" },
  ] as const satisfies readonly ServerSlot[],
  channelSections: [
    {
      title: "COMMUNITY",
      channels: [
        { name: "announcements", symbol: "#" },
        { name: "support-lounge", symbol: "#", active: true },
        { name: "product-feedback", symbol: "#" },
        { name: "feature-ideas", symbol: "#" },
      ],
    },
    {
      title: "HELP",
      channels: [{ name: "office-hours", voice: true }],
    },
    {
      title: "PRODUCT",
      channels: [
        { name: "release-notes", symbol: "#" },
        { name: "bugs-and-fixes", symbol: "#" },
      ],
    },
  ] as const satisfies readonly ChannelSection[],
  memberGroups: [
    {
      title: "ONLINE - 118",
      names: [
        "President",
        "casey.ops",
        "morgan.ops",
        "nina.growth",
        "devrel.jay",
        "lena.mod",
        "sam.user",
      ],
      tone: "member-row--rose",
    },
    {
      title: "TEAM - 6",
      names: ["lucius.ai", "support.lead", "product.ava", "ops.rin"],
      tone: "member-row--violet",
    },
    {
      title: "CUSTOMERS - 9",
      names: ["founder.mia", "kevin.host", "amelia.pm", "owen.admin"],
      tone: "member-row--cyan",
    },
  ] as const satisfies readonly MemberGroup[],
  conversationMessages: supportConversationMessages,
  beatMessageCounts: {
    followup: 1,
    answer: 2,
    reveal: 5,
  } as const satisfies Record<ConversationBeat, number>,
  beatRevealDelays: {
    followup: [700],
    answer: [700, 4200],
    reveal: [700, 4200, 9000, 13200, 15800],
  } as const satisfies Record<ConversationBeat, readonly number[]>,
  beatTyping: {
    followup: [],
    answer: [
      {
        author: "Lucius",
        avatarName: "Lucius",
        startMs: 2200,
        endMs: 4200,
        revealCount: 2,
      },
    ],
    reveal: [
      {
        author: "Lucius",
        avatarName: "Lucius",
        startMs: 2200,
        endMs: 4200,
        revealCount: 2,
      },
      {
        author: "Lucius",
        avatarName: "Lucius",
        startMs: 10800,
        endMs: 13200,
        revealCount: 4,
      },
    ],
  } as const satisfies Record<
    ConversationBeat,
    readonly {
      author: string;
      avatarName: string;
      startMs: number;
      endMs: number;
      revealCount: number;
    }[]
  >,
} as const;
