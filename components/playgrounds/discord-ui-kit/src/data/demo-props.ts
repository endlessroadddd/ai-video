import type { CommunityScreenProps, DmScreenProps } from "../lib/types";

export const dmDemoProps: DmScreenProps = {
  shellEyebrow: "Discord UI Playground",
  title: "Signal Atelier",
  subtitle: "A private design lab for rapid customer support experiments.",
  railEyebrow: "Private Desk",
  railTitle: "Direct Messages",
  searchPlaceholder: "Find or start a conversation",
  header: {
    channelLabel: "Direct Messages",
    membersLabel: "4 live threads",
    heroNote: "Polished DM experience with embed, mention, long text, and typing hint.",
  },
  composerPlaceholder: "Message Sol...",
  serverItems: [
    { id: "home", label: "SA", accent: "primary", active: true },
    { id: "notes", label: "PX", accent: "mint", badge: "2" },
    { id: "alerts", label: "VO", accent: "coral", badge: "7" },
    { id: "plus", label: "+", accent: "muted" },
  ],
  conversations: [
    {
      id: "sol",
      name: "Sol Mercer",
      subtitle: "Online now",
      status: "online",
      variant: "violet",
      active: true,
      unread: 1,
    },
    {
      id: "nori",
      name: "Nori Vale",
      subtitle: "Reviewing the latest thread",
      status: "idle",
      variant: "mint",
    },
    {
      id: "helio",
      name: "Helio Support",
      subtitle: "Assistant profile",
      status: "online",
      variant: "robot",
    },
    {
      id: "jules",
      name: "Jules Arden",
      subtitle: "Left feedback 20m ago",
      status: "offline",
      variant: "sunset",
    },
  ],
  infoPanel: {
    eyebrow: "Preview Intent",
    title: "Signal Atelier",
    subtitle: "A refined DM shell intended for stakeholder demos and future component reuse.",
    pinnedFacts: [
      "DM shell should feel premium and airy, not like a raw clone.",
      "Transcript uses real Discord-style components behind a local adapter.",
      "Composer stays pinned while the transcript scrolls independently.",
    ],
    metrics: [
      { label: "Shell", value: "Owned" },
      { label: "Transcript", value: "Adapted" },
      { label: "Avatar", value: "Local" },
    ],
  },
  messages: [
    {
      id: "dm-1",
      author: "Sol Mercer",
      role: "user",
      timestamp: "Today at 9:18 AM",
      content:
        "Morning. I want this sandbox to look convincing enough for stakeholder demos, but I don't want it to feel like a direct brand copy.",
      avatarVariant: "violet",
    },
    {
      id: "dm-2",
      author: "Helio Support",
      role: "assistant",
      timestamp: "Today at 9:19 AM",
      content:
        "Understood. We can keep the interaction grammar familiar while replacing the voice, labels, and visual mood with something more editorial and studio-like.",
      isBot: true,
      avatarVariant: "robot",
      mention: "@Sol Mercer",
    },
    {
      id: "dm-3",
      author: "Sol Mercer",
      role: "user",
      timestamp: "Today at 9:20 AM",
      content:
        "Perfect. I also need one message that stretches over multiple lines so we can prove the spacing, wrapping, and reading rhythm still feel calm even when the copy becomes more detailed and more product-oriented than a normal chat exchange.",
      avatarVariant: "violet",
    },
    {
      id: "dm-4",
      author: "Helio Support",
      role: "assistant",
      timestamp: "Today at 9:22 AM",
      content: "I've drafted a compact spec card you can pin for review.",
      isBot: true,
      avatarVariant: "robot",
      embed: {
        title: "Preview Packet",
        description:
          "Standalone React playground with owned shell, reusable avatar system, and an isolated Discord transcript adapter.",
        accentColor: "#6f86ff",
        footer: "Ready for design review",
        fields: [
          { title: "Modes", value: "DM and community", inline: true },
          { title: "Tone", value: "Studio-grade, non-official", inline: true },
          { title: "Scope", value: "UI only, no product backend" },
        ],
      },
    },
    {
      id: "dm-5",
      author: "Helio Support",
      role: "system",
      timestamp: "Just now",
      content: "Helio Support is typing...",
      avatarVariant: "robot",
    },
  ],
};

export const communityDemoProps: CommunityScreenProps = {
  shellEyebrow: "Discord UI Playground",
  title: "Orbit Commons",
  subtitle: "A community lounge that mixes ritual, research, and product support.",
  railEyebrow: "Community Grid",
  railTitle: "# launch-bay",
  searchPlaceholder: "Search channels",
  header: {
    channelLabel: "# launch-bay",
    membersLabel: "148 online",
    heroNote: "Community mode adds channel rhythm, member energy, and a richer right panel.",
  },
  composerPlaceholder: "Message #launch-bay",
  serverItems: [
    { id: "home", label: "OC", accent: "primary", active: true },
    { id: "atlas", label: "AT", accent: "mint", badge: "5" },
    { id: "signal", label: "SG", accent: "coral", badge: "12" },
    { id: "plus", label: "+", accent: "muted" },
  ],
  channels: [
    {
      id: "launch-bay",
      name: "# launch-bay",
      subtitle: "Feature drops and reactions",
      type: "text",
      active: true,
    },
    {
      id: "crit-room",
      name: "# critique-room",
      subtitle: "Tight feedback cycles",
      type: "text",
    },
    {
      id: "ops-floor",
      name: "# ops-floor",
      subtitle: "Status, QA, and handoff",
      type: "text",
    },
    {
      id: "voice-lab",
      name: "Voice Lab",
      subtitle: "4 listening now",
      type: "voice",
    },
  ],
  infoPanel: {
    eyebrow: "Preview Intent",
    title: "Orbit Commons",
    subtitle:
      "A denser community page with stronger rhythm, clearer channel structure, and a reusable information panel.",
    pinnedFacts: [
      "Community mode should feel denser than DM mode without becoming noisy.",
      "Long labels, badges, and multiline content must not break the rails.",
      "Right-side info panel is intentional and supports screenshot-friendly composition.",
    ],
    metrics: [
      { label: "Shell", value: "Owned" },
      { label: "Transcript", value: "Adapted" },
      { label: "Avatar", value: "Local" },
    ],
  },
  messages: [
    {
      id: "co-1",
      author: "Mara Voss",
      role: "user",
      timestamp: "Today at 6:02 PM",
      content:
        "Heads up: the new onboarding drop landed in the preview branch. Reactions are already coming in from the early group.",
      avatarVariant: "rose",
    },
    {
      id: "co-2",
      author: "Auren Bot",
      role: "assistant",
      timestamp: "Today at 6:03 PM",
      content:
        "Tracked. I tagged the three posts with strongest sentiment and clipped the one that keeps mentioning first-run clarity.",
      isBot: true,
      avatarVariant: "robot",
    },
    {
      id: "co-3",
      author: "Lin Quill",
      role: "user",
      timestamp: "Today at 6:04 PM",
      content:
        "Can someone pull @Mara Voss into a quick follow-up after this? The language shift looks right, but the second screen still feels slightly too abrupt.",
      avatarVariant: "amber",
      mention: "@Mara Voss",
    },
    {
      id: "co-4",
      author: "Auren Bot",
      role: "assistant",
      timestamp: "Today at 6:05 PM",
      content: "Pinned a rollout snapshot below so the room stays aligned.",
      isBot: true,
      avatarVariant: "robot",
      embed: {
        title: "Launch Snapshot",
        description:
          "Three strongest reactions point to clarity gains, faster first action, and a cleaner sense of what the product is doing on behalf of the user.",
        accentColor: "#57d6a5",
        footer: "Community digest",
        fields: [
          { title: "Top signal", value: "Clearer first-run narrative", inline: true },
          { title: "Risk", value: "Second screen pacing", inline: true },
          { title: "Owner", value: "Design systems pod" },
        ],
      },
    },
    {
      id: "co-5",
      author: "Auren Bot",
      role: "system",
      timestamp: "Now",
      content: "Auren Bot is composing a follow-up...",
      avatarVariant: "robot",
    },
  ],
};
