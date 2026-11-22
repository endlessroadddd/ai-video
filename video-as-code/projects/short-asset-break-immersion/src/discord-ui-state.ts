import { attachMemeImagesToMessages } from "./meme-attachments";

export type DiscordMessageTone = "user" | "bot" | "system";
export type SceneMode = "static" | "motion";
export type SceneView = "s01" | "s02" | "s03" | "s04" | "s05a" | "s05b";
export type CommunitySceneView = Exclude<SceneView, "s05b">;

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
  effect?: "shake-once";
  variant?: "default" | "system-ticket";
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

const sceneViews = new Set<SceneView>(["s01", "s02", "s03", "s04", "s05a", "s05b"]);
const sceneModes = new Set<SceneMode>(["static", "motion"]);

export function isSceneView(value: string | null): value is SceneView {
  return value !== null && sceneViews.has(value as SceneView);
}

export function isSceneMode(value: string | null): value is SceneMode {
  return value !== null && sceneModes.has(value as SceneMode);
}

export const communityGuildState = {
  homeServerLabel: "VM",
  guildName: "Velvet Mirage Cosplay Club",
  activeChannel: "mission-brief",
  activeChannelSymbol: "#",
  searchPlaceholder: "Search Velvet Mirage Cosplay Club",
  channelTopic:
    "Tonight's rooftop infiltration starts at 20:00. Masks on, capes pinned, no spoilers.",
  profile: { name: "iris.thread", tag: "#2401" },
  establishingChips: [
    "267 online",
    "Night raid rehearsal",
    "President is expected any minute",
  ] as const,
  establishingTitle: "Everyone is fully in character tonight.",
  establishingNote: "One wrong reply will feel louder than the whole room.",
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
  scene01Messages: [
    {
      id: "s1-1",
      author: "nova.cos",
      timestamp: "Today at 7:42 PM",
      text: "The mirror hall set looks unreal tonight.",
      tone: "user",
    },
    {
      id: "s1-2",
      author: "stitchpilot",
      timestamp: "Today at 7:43 PM",
      text: "I finished the crimson cape trim five minutes ago.",
      tone: "user",
    },
    {
      id: "s1-3",
      author: "kira.scene",
      timestamp: "Today at 7:43 PM",
      text: "If President posts the mission order now, we can still rehearse the rooftop entry.",
      tone: "user",
    },
    {
      id: "s1-4",
      author: "ivyflux",
      timestamp: "Today at 7:44 PM",
      text: "I already have the moon mask lined up on my desk.",
      tone: "user",
    },
    {
      id: "s1-5",
      author: "glintmuse",
      timestamp: "Today at 7:44 PM",
      text: "Fog machines are synced, rooftop lights are ready.",
      tone: "user",
    },
    {
      id: "s1-6",
      author: "echoquill",
      timestamp: "Today at 7:44 PM",
      text: "I posted the line prompts in #green-room for everyone.",
      tone: "user",
    },
  ] as const satisfies readonly DiscordMessage[],
  scene02Messages: [
    {
      id: "s2-1",
      author: "moonveil",
      timestamp: "Today at 7:45 PM",
      text: "If we're still opening on the bridge, I need ten more minutes for the lantern props.",
      tone: "user",
    },
    {
      id: "s2-2",
      author: "stitchpilot",
      timestamp: "Today at 7:45 PM",
      text: "I can swap into the silver set if the route changed.",
      tone: "user",
    },
    {
      id: "s2-3",
      author: "ivyflux",
      timestamp: "Today at 7:46 PM",
      text: "President, what's the plan for tonight's mission?",
      tone: "user",
    },
  ] as const satisfies readonly DiscordMessage[],
  scene03Messages: [
    {
      id: "s3-1",
      author: "moonveil",
      timestamp: "Today at 7:45 PM",
      text: "If we're still opening on the bridge, I need ten more minutes for the lantern props.",
      tone: "user",
    },
    {
      id: "s3-2",
      author: "stitchpilot",
      timestamp: "Today at 7:45 PM",
      text: "I can swap into the silver set if the route changed.",
      tone: "user",
    },
    {
      id: "s3-3",
      author: "ivyflux",
      timestamp: "Today at 7:46 PM",
      text: "President, what's the plan for tonight's mission?",
      tone: "user",
    },
    {
      id: "s3-4",
      author: "nova.cos",
      timestamp: "Today at 7:46 PM",
      text: "Yeah, we just need the cue and we'll move.",
      tone: "user",
    },
    {
      id: "s3-5",
      author: "President",
      avatarName: "President",
      timestamp: "Today at 7:46 PM",
      text: "\u26A0\uFE0F Your question has been received.",
      secondaryText: "A follow-up response will be provided shortly.",
      footerText: "[Ticket ID: #404]",
      tone: "bot",
      appBadge: true,
      botTag: "[BOT]",
      variant: "system-ticket",
    },
  ] as const satisfies readonly DiscordMessage[],
  scene04Messages: attachMemeImagesToMessages([
    {
      id: "s4-1",
      author: "moonveil",
      timestamp: "Today at 7:47 PM",
      text: "?",
      tone: "user",
    },
    {
      id: "s4-2",
      author: "ivyflux",
      timestamp: "Today at 7:47 PM",
      text: "Wait... is this a bot? \u{1F928}",
      effect: "shake-once",
      tone: "user",
    },
    {
      id: "s4-3",
      author: "nova.cos",
      timestamp: "Today at 7:47 PM",
      text: "Why is it talking like support? \u{1F480}",
      tone: "user",
    },
    {
      id: "s4-4",
      author: "stitchpilot",
      timestamp: "Today at 7:47 PM",
      text: "This is so immersion breaking. \u{1F4C9}",
      tone: "user",
    },
    {
      id: "s4-5",
      author: "kira.scene",
      timestamp: "Today at 7:47 PM",
      text: "That reply just killed the whole vibe. \u{1F62C}",
      tone: "user",
    },
    {
      id: "s4-6",
      author: "aurapins",
      timestamp: "Today at 7:48 PM",
      text: "It sounds like a help desk, not a club. \u{1F643}",
      tone: "user",
    },
    {
      id: "s4-7",
      author: "seamwitch",
      timestamp: "Today at 7:48 PM",
      text: "We waited all night for that? \u{1F611}",
      tone: "user",
    },
    {
      id: "s4-8",
      author: "moonveil",
      timestamp: "Today at 7:48 PM",
      text: "I'm out if this is the new voice. \u{1F6AA}",
      tone: "user",
    },
    {
      id: "s4-9",
      author: "velvetrin",
      timestamp: "Today at 7:48 PM",
      text: "No way the President would say that. \u{1F612}",
      tone: "user",
    },
    {
      id: "s4-10",
      author: "maskloop",
      timestamp: "Today at 7:48 PM",
      text: "That sounded auto-generated. \u{1F916}",
      tone: "user",
    },
    {
      id: "s4-11",
      author: "cuekeeper",
      timestamp: "Today at 7:48 PM",
      text: "The whole room just went cold. \u{1F976}",
      tone: "user",
    },
    {
      id: "s4-12",
      author: "clubrunner",
      timestamp: "Today at 7:48 PM",
      text: "I'm muting this if it keeps talking like that. \u{1F624}",
      tone: "user",
    },
    {
      id: "s4-13",
      author: "nighthem",
      timestamp: "Today at 7:48 PM",
      text: "This killed the mission mood instantly. \u{1F4A5}",
      tone: "user",
    },
    {
      id: "s4-14",
      author: "mirafold",
      timestamp: "Today at 7:48 PM",
      text: "People are already leaving. \u{1F62D}",
      tone: "user",
    },
    {
      id: "s4-15",
      author: "backrowfox",
      timestamp: "Today at 7:49 PM",
      text: "I'm dipping too, this doesn't sound like our world. \u{1F6AA}",
      tone: "user",
    },
    {
      id: "s4-16",
      author: "glintmuse",
      timestamp: "Today at 7:49 PM",
      text: "It reads like a template reply, not President. \u{1F915}",
      tone: "user",
    },
    {
      id: "s4-17",
      author: "echoquill",
      timestamp: "Today at 7:49 PM",
      text: "Mission immersion is gone, channel feels empty now. \u{1F4A8}",
      tone: "user",
    },
  ] as const satisfies readonly DiscordMessage[]),
  exitFeed: [
    "nova.cos left the server",
    "stitchpilot left the server",
    "kira.scene left the server",
    "ivyflux left the server",
    "moonveil left the server",
    "velvetrin left the server",
    "aurapins left the server",
    "seamwitch left the server",
    "maskloop left the server",
    "cuekeeper left the server",
    "clubrunner left the server",
    "mirafold left the server",
    "nighthem left the server",
    "backrowfox left the server",
  ] as const,
  onlineCounts: [264, 181, 94] as const,
  activityTrend: [264, 258, 251, 246, 181, 132, 94] as const,
  activityTrendLabels: [
    "Week 1",
    "Week 2",
    "Week 3",
    "AI goes live",
    "Week 5",
    "Week 6",
    "Week 7",
  ] as const,
  activityInflectionIndex: 3,
  chartEyebrow: "Illustrative trend",
  chartTitle: "Community trust drops right after the AI goes live.",
  chartImpact: "-64%",
  chartImpactNote: "7-week illustrative community trend",
  chartVerdict: "Once the role breaks, people leave.",
  chartSummary: "264 -> 94 online members",
  chartSummaryNote:
    "The drop starts after the public replies stop sounding like a real club leader.",
  chartContextTitle: "What broke first",
  chartContextNote:
    "Not intelligence. Not speed. The role voice collapsed, and the room stopped believing.",
} as const;
