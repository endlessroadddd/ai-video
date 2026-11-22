import type { AnimatedEmojiId } from "./animated-emoji";
import praiseMemeSrc from "./assets/b4-praise-meme-20260422.png";

export type DiscordMessageTone = "user" | "bot" | "system";
export type SceneMode = "static" | "motion";
export type SceneView = "b1" | "b2" | "b3" | "b4" | "b5";

export type MessagePart =
  | { type: "text"; value: string }
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

const sceneViews = new Set<SceneView>(["b1", "b2", "b3", "b4", "b5"]);
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

function emojiPart(id: AnimatedEmojiId, alt: string): MessagePart {
  return { type: "emoji", id, alt };
}

export const communityGuildState = {
  homeServerLabel: "VM",
  guildName: "Velvet Mirage Cosplay Club",
  activeChannel: "mission-brief",
  activeChannelSymbol: "#",
  searchPlaceholder: "Search Velvet Mirage Cosplay Club",
  channelTopic: "Tonight's rooftop glitter run starts at 20:00. Masks on, sparkles packed.",
  profile: { name: "iris.thread", tag: "#2401" },
  serverSlots: [
    { label: "VM", tone: "community", selected: true },
    { label: "FX", badge: "4", tone: "aux", badgeTone: "small" },
    { label: "ST", badge: "1", tone: "muted", badgeTone: "small" },
    { label: "+", tone: "plus" },
  ] as const satisfies readonly ServerSlot[],
  channelSections: [
    {
      title: "TEXT CHANNELS",
      channels: [
        { name: "announcements", symbol: "#" },
        { name: "green-room", symbol: "#" },
        { name: "mission-brief", symbol: "#", active: true },
        { name: "photo-drops", symbol: "#" },
        { name: "late-night-lore", symbol: "#" },
      ],
    },
    {
      title: "VOICE CHANNELS",
      channels: [{ name: "backstage-call", voice: true }],
    },
    {
      title: "CAST OPS",
      channels: [
        { name: "route-updates", symbol: "#" },
        { name: "prop-check", symbol: "#" },
      ],
    },
  ] as const satisfies readonly ChannelSection[],
  memberGroups: [
    {
      title: "ONLINE - 267",
      names: [
        "President",
        "nova.cos",
        "stitchpilot",
        "kira.scene",
        "ivyflux",
        "moonveil",
        "glintmuse",
      ],
      tone: "member-row--rose",
    },
    {
      title: "CAST - 7",
      names: ["velvetrin", "aurapins", "seamwitch", "maskloop", "echoquill"],
      tone: "member-row--violet",
    },
    {
      title: "CREW - 5",
      names: ["cuekeeper", "clubrunner", "nighthem", "mirafold", "backrowfox"],
      tone: "member-row--cyan",
    },
  ] as const satisfies readonly MemberGroup[],
  b4Messages: [
    {
      id: "b4-1",
      author: "LUCI",
      avatarName: "LUCI",
      timestamp: "Today at 7:46 PM",
      text: "rooftop call at 20:00, glitter glue check please",
      tone: "bot",
      appBadge: true,
      botTag: "BOT",
      parts: [
        textPart("rooftop call at 20:00, glitter glue check please "),
        emojiPart("relaxed", "relaxed face"),
      ],
    },
    {
      id: "b4-2",
      author: "nova.cos",
      timestamp: "Today at 7:46 PM",
      text: "omg LUCI showed up early",
      tone: "user",
      parts: [
        textPart("omg LUCI showed up early "),
        emojiPart("pleading-face", "pleading face"),
      ],
      reactions: ["pleading-face", "sparkling-heart"],
    },
    {
      id: "b4-3",
      author: "moonveil",
      timestamp: "Today at 7:46 PM",
      text: "nyaa~ sparkly queen energy",
      tone: "user",
    },
    {
      id: "b4-4",
      author: "LUCI",
      avatarName: "LUCI",
      timestamp: "Today at 7:46 PM",
      text: "hehe of course~ save me a moon ribbon too",
      tone: "bot",
      appBadge: true,
      botTag: "BOT",
      parts: [
        textPart("hehe of course~ save me a moon ribbon too "),
        emojiPart("sparkling-heart", "sparkling heart"),
      ],
    },
    {
      id: "b4-5",
      author: "stitchpilot",
      timestamp: "Today at 7:47 PM",
      text: "already did, your desk is gonna look illegal levels of cute",
      tone: "user",
    },
    {
      id: "b4-6",
      author: "kira.scene",
      timestamp: "Today at 7:47 PM",
      text: "wait why does LUCI sound more in-character than us",
      tone: "user",
    },
    {
      id: "b4-7",
      author: "LUCI",
      avatarName: "LUCI",
      timestamp: "Today at 7:47 PM",
      text: "because i studied the assignment, darling",
      tone: "bot",
      appBadge: true,
      botTag: "BOT",
    },
    {
      id: "b4-8",
      author: "aurapins",
      timestamp: "Today at 7:47 PM",
      text: "stoppp i'm adopting her immediately",
      tone: "user",
      parts: [
        textPart("stoppp i'm adopting her immediately "),
        emojiPart("star-struck", "star-struck face"),
      ],
      reactions: ["star-struck"],
    },
    {
      id: "b4-9",
      author: "glintmuse",
      timestamp: "Today at 7:48 PM",
      text: "okay LUCI is absolutely carrying this mission, she's absurdly good",
      tone: "user",
      parts: [
        textPart("okay LUCI is absolutely carrying this mission, she's absurdly good "),
        emojiPart("sparkling-heart", "sparkling heart"),
      ],
      attachmentImageSrc: praiseMemeSrc,
      attachmentImageAlt: "LUCI praise meme",
    },
  ] as const satisfies readonly DiscordMessage[],
  b4RevealDelays: [300, 1050, 1800, 3000, 4200, 5450, 6800, 8200, 9600] as const,
  b4Typing: {
    author: "LUCI",
    avatarName: "LUCI",
    startMs: 2200,
    endMs: 3000,
  },
} as const;
