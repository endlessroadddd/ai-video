import type { CSSProperties, ReactNode } from "react";

import { compareMaterialLibraryEntries } from "./catalog-search";
import { MATERIAL_LIBRARY_ASSET_IDS } from "./meta/ids";
import { AnimatedEmoji } from "./chat/animated-emoji";
import {
  AUTO_LEARN_FEISHU_CARD,
  AUTO_LEARN_KNOWLEDGE_ENTRIES,
  AUTO_LEARN_PARTICIPANTS,
  AUTO_LEARN_SCRIPT_MESSAGES,
} from "./chat/auto-learn-knowledge-data";
import { AssistTaskMessageRichText } from "./chat/assist-task-rich-text";
import { humanPresets } from "./chat/avatar-presets";
import { ClientChatCelebrationParticles } from "./chat/celebration-particles";
import { DiscordComposerBar } from "./chat/discord-composer-bar";
import { DiscordAvatar } from "./chat/discord-avatar";
import { DiscordMessageCard } from "./chat/discord-message-card";
import type {
  ChannelItem,
  MessageItem,
  NoiseCardItem,
} from "./chat/discord-scene-types";
import {
  FeishuCard,
  FeishuMessage,
  FeishuReaction,
  FeishuTypingIndicator,
} from "./chat/feishu-primitives";
import { ClientChatFloatingEmoji } from "./chat/floating-emoji";
import { KnowledgeFileTypeIcon } from "./chat/knowledge-file-type-icon";
import { MessageEmphasisText } from "./chat/message-emphasis";
import { ReactionBadge } from "./chat/reaction-badge";
import { ClientChatReplyReadyToast } from "./chat/reply-ready-toast";
import { DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO } from "./chat/recording-scenario";
import {
  ClientChatSupportHandoffCard,
  type ClientChatSupportHandoffCardRecord,
} from "./chat/support-handoff-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./data-display/table";
import { TrendChart } from "./data-display/trend-chart";
import { BlackSendCursor } from "./icons/black-send-cursor";
import { DiscordDmToolbarIconStrip } from "./icons/discord-dm-toolbar-icons";
import { LuciusLogoMark } from "./icons/lucius-logo-mark";
import { ProfileActionIcon } from "./icons/profile-action-icon";
import { BrandTransitionRing, NoiseCardStage } from "./motion/brand-transition";
import {
  LearnConvCurtainCommitPulse,
  LearnConvCurtainKnowledgeGraphV3,
  OneCommandCurtainEverywhere,
  OneCommandCurtainPulseQueue,
} from "./motion/curtains";
import { easeInCubic, easeInOutCubic, easeOutCubic } from "./motion/easing";
import {
  LearnConversationsHeroIntro,
  OneCommandHeroIntro,
} from "./motion/hero-intros";
import {
  ClientChatRecordingBlankOverlay,
  ClientChatRecordingIntertitleOverlay,
  ClientChatRecordingOutcomeOverlay,
} from "./motion/recording-overlays";
import {
  AutoLearnEndingOverlay,
  AutoLearnFadeOverlay,
} from "./motion/auto-learn-transitions";
import { StaffResolveTransition } from "./motion/staff-resolve-transition";
import { ChatBubble } from "./surfaces/chat-bubble";
import { Composer } from "./surfaces/composer-shell";
import { DiscordCommunityShell } from "./surfaces/discord-community-shell";
import { DiscordNoiseCardStage } from "./surfaces/discord-noise-card-stage";
import { DiscordQuestionStackStage } from "./surfaces/discord-question-stack-stage";
import { DiscordTranscriptStage } from "./surfaces/discord-transcript-stage";
import { FeishuChatScene } from "./surfaces/feishu-chat-scene";
import { KnowledgeDashboardScene } from "./surfaces/knowledge-dashboard-scene";
import { PhoneFrame } from "./surfaces/phone-frame";
import { ProofChip } from "./surfaces/proof-chip";
import { ResolveOverlay } from "./surfaces/resolve-overlay";
import {
  SettingsCommunityListSkeleton,
  SettingsSectionShell,
  SettingsWorkgroupCardSkeletonList,
} from "./surfaces/settings-section-shell";

export type MaterialLibraryStability = "beta" | "stable";
export type MaterialNarrativeRole =
  | "transition"
  | "accent"
  | "component"
  | "shell"
  | "proof"
  | "environment"
  | "helper";
export type MaterialVisualWeight = "micro" | "light" | "medium" | "heavy" | "full-scene";
export type MaterialInformationDensity = "low" | "medium" | "high";
export type MaterialDominance = "supporting" | "primary" | "scene-owning";
export type MaterialReuseMode = "drop-in" | "tweak-copy" | "tweak-layout" | "heavy-adaptation";
export type MaterialMutationCost = "low" | "medium" | "high";

export type MaterialLibraryCatalogEntry = {
  adaptationNotes: string[];
  agentGoal: string;
  anchorId: string;
  body: string;
  category: string;
  compositionPatterns: string[];
  dominance: MaterialDominance;
  donts: string[];
  dos: string[];
  editableParts: string[];
  hostSurfaces: string[];
  id: string;
  implementationRef: string;
  informationDensity: MaterialInformationDensity;
  inputProps: string[];
  keepFixed: string[];
  keywords: string[];
  matchKeywords: string[];
  mutationCost: MaterialMutationCost;
  narrativeRole: MaterialNarrativeRole;
  negativeTriggersEn: string[];
  negativeTriggersZh: string[];
  pairWithIds: string[];
  preferInsteadIds: string[];
  previewRef: string;
  preview: MaterialPreviewDefinition | null;
  reuseMode: MaterialReuseMode;
  safeToChange: string[];
  sceneTypes: string[];
  scriptRecipe: string[];
  scriptTriggersEn: string[];
  scriptTriggersZh: string[];
  selectionSignals: string[];
  sourceCode: string | null;
  sourceProjects: string[];
  stability: MaterialLibraryStability;
  styleFamilies: string[];
  summary: string;
  title: string;
  toneTags: string[];
  visualSignature: string[];
  visualWeight: MaterialVisualWeight;
  whenToUse: string[];
  avoidWhen: string[];
};

type MaterialPreviewDefinition = {
  kind: "card" | "compact" | "phone" | "stage";
  note?: string;
  render: (payload: { t: number }) => ReactNode;
};

type CuratedSection = {
  description: string;
  ids: string[];
  title: string;
};

type FrontmatterMetadata = {
  adaptationNotes: string[];
  agentGoal: string;
  category: string;
  compositionPatterns: string[];
  dominance: MaterialDominance;
  donts: string[];
  dos: string[];
  editableParts: string[];
  hostSurfaces: string[];
  id: string;
  implementationRef: string;
  informationDensity: MaterialInformationDensity;
  inputProps: string[];
  keepFixed: string[];
  keywords: string[];
  matchKeywords: string[];
  mutationCost: MaterialMutationCost;
  narrativeRole: MaterialNarrativeRole;
  negativeTriggersEn: string[];
  negativeTriggersZh: string[];
  pairWithIds: string[];
  preferInsteadIds: string[];
  previewRef: string;
  reuseMode: MaterialReuseMode;
  safeToChange: string[];
  sceneTypes: string[];
  scriptRecipe: string[];
  scriptTriggersEn: string[];
  scriptTriggersZh: string[];
  selectionSignals: string[];
  sourceProjects: string[];
  stability: MaterialLibraryStability;
  styleFamilies: string[];
  summary: string;
  title: string;
  toneTags: string[];
  visualSignature: string[];
  visualWeight: MaterialVisualWeight;
  whenToUse: string[];
  avoidWhen: string[];
};

const SUPPORT_HANDOFF_SAMPLE: ClientChatSupportHandoffCardRecord = {
  eyebrow: "Billing handoff",
  owner: "Mia Chen · Billing Supervisor",
  reviewLabel: "Reviewing now",
  correctedLabel: "Corrected invoice ready",
  steps: ["Collected", "Handed off", "Corrected"],
  summaryItems: [
    { label: "Order ID", value: "ORD-84721" },
    { label: "Billing email", value: "nina@northstarlabs.io" },
    { label: "Correct VAT", value: "DE329114762" },
    { label: "Attachment", value: "1 attachment" },
  ],
  title: "Escalated to Billing Supervisor",
};

const TREND_VALUES = [252, 248, 244, 239, 232, 220, 206, 190, 172, 156, 148];
const TREND_LABELS = ["W1", "W2", "W3", "W4", "Launch", "W6", "W7", "W8", "W9", "W10", "Now"];
const DISCORD_SAMPLE_CHANNELS: readonly ChannelItem[] = [
  { name: "general", unread: 27 },
  { name: "help", unread: 9, watch: true },
  { name: "feature-requests", unread: 14 },
  { name: "off-topic", unread: 33, muted: true },
  { name: "announcements", unread: 2 },
] as const;
const DISCORD_TRANSCRIPT_SAMPLE: readonly MessageItem[] = [
  {
    author: "June",
    body: "Is it just me or is the onboarding copy doing **too much** on the first screen?",
    meta: "10:41",
  },
  {
    author: "Nina",
    body: "I keep seeing the **same setup question** come back, just worded differently.",
    meta: "10:42",
  },
  {
    author: "AlexW",
    avatarVariant: "violet",
    body: "Signals are **everywhere**: replies, emoji, side threads, random +1s.",
    meta: "12:05",
    metaBadge: "high traction",
    reactions: [
      { emoji: "🔥", count: 44, hot: true },
      { emoji: "💯", count: 23 },
    ],
  },
] as const;
const DISCORD_NOISE_CARD_SAMPLE: readonly NoiseCardItem[] = [
  {
    channel: "general",
    id: "noise-1",
    left: 4,
    tag: "repeat",
    text: "Same setup question again. New wording, same confusion.",
    top: 12,
    width: 224,
  },
  {
    channel: "help",
    id: "noise-2",
    left: 56,
    tag: "blocked",
    text: "403 /connect after reinstalling. Fresh login did not help.",
    tone: "warning",
    top: 28,
    width: 232,
  },
  {
    channel: "feature-requests",
    id: "noise-3",
    left: 20,
    tag: "theme",
    text: "Group requests by theme, not by whoever posted first.",
    tone: "feature",
    top: 72,
    width: 244,
  },
] as const;
const DISCORD_QUESTION_SAMPLE = [
  "What pattern repeats across the thread?",
  "Where does the community get blocked?",
  "Which signal deserves action?",
] as const;

function parseFrontmatterDocument(source: string): {
  body: string;
  metadata: FrontmatterMetadata;
} {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("material-library catalog entry is missing JSON frontmatter");
  }

  return {
    metadata: JSON.parse(match[1]) as FrontmatterMetadata,
    body: match[2].trim(),
  };
}

function toAnchorId(entryId: string): string {
  return entryId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function buildCurvePath(fn: (value: number) => number): string {
  const points = Array.from({ length: 17 }, (_, index) => {
    const x = (index / 16) * 100;
    const y = 100 - fn(index / 16) * 100;
    return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  });

  return points.join(" ");
}

function renderPhonePreview(children: ReactNode, composer: ReactNode) {
  return (
    <PhoneFrame
      side="lucius"
      title="Lucius"
      altTitle="Agent"
      altTitleProgress={0.18}
      style={{
        left: "50%",
        transform: "translate(-50%, 0)",
        opacity: 1,
      }}
      composer={composer}
    >
      {children}
    </PhoneFrame>
  );
}

function getNoiseCardStagePreviewState(t: number) {
  const elapsed = t % 7800;

  if (elapsed < 900) {
    return { phase: "scene-five-stage" as const, showRing: true, visibleCount: 0 };
  }

  if (elapsed < 1260) {
    return { phase: "scene-five-stage" as const, showRing: false, visibleCount: 0 };
  }

  if (elapsed < 5660) {
    return {
      phase: "scene-five-cards" as const,
      showRing: false,
      visibleCount: Math.min(20, Math.max(1, Math.floor((elapsed - 1260) / 130) + 1)),
    };
  }

  if (elapsed < 6020) {
    return { phase: "scene-five-logo" as const, showRing: false, visibleCount: 20 };
  }

  if (elapsed < 6360) {
    return { phase: "scene-five-pulse" as const, showRing: false, visibleCount: 20 };
  }

  if (elapsed < 7060) {
    return { phase: "scene-five-clear" as const, showRing: false, visibleCount: 20 };
  }

  return { phase: "scene-five-done" as const, showRing: false, visibleCount: 20 };
}

const PREVIEW_DEFINITIONS: Record<string, MaterialPreviewDefinition> = {
  [MATERIAL_LIBRARY_ASSET_IDS.TIMELINE]: {
    kind: "card",
    note: "Timeline is a helper, so the preview focuses on the staged progress it controls.",
    render: ({ t }) => {
      const progress = ((t % 6400) / 6400) * 100;
      return (
        <div style={{ display: "grid", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", color: "#231f35" }}>
            <strong>Timeline progress</strong>
            <span>{Math.round(progress)}%</span>
          </div>
          <div
            style={{
              overflow: "hidden",
              borderRadius: "999px",
              background: "rgba(76, 75, 105, 0.1)",
              height: "14px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: "999px",
                background: "linear-gradient(90deg, #5d7dff 0%, #9b73f7 100%)",
                transition: "width 80ms linear",
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            }}
          >
            {[
              { label: "seek", value: "420ms" },
              { label: "pause", value: "frame-safe" },
              { label: "restart", value: "to 0ms" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  borderRadius: "18px",
                  border: "1px solid rgba(76, 75, 105, 0.08)",
                  background: "#ffffff",
                  padding: "14px",
                  display: "grid",
                  gap: "4px",
                }}
              >
                <span style={{ fontSize: "12px", color: "rgba(76, 75, 105, 0.72)", textTransform: "uppercase" }}>
                  {item.label}
                </span>
                <strong style={{ color: "#231f35" }}>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },
  [MATERIAL_LIBRARY_ASSET_IDS.EASING]: {
    kind: "compact",
    note: "These curves are the shared timing language behind curtains and typed chat reveals.",
    render: () => (
      <svg viewBox="0 0 300 112" style={{ width: "100%", height: "100%" }}>
        <rect x="0" y="0" width="300" height="112" rx="18" fill="#ffffff" opacity="0.75" />
        <g transform="translate(24 14)">
          <rect x="0" y="0" width="252" height="84" rx="14" fill="#f6f4ee" />
          <path d="M 0 84 L 252 84" stroke="rgba(76, 75, 105, 0.16)" />
          <path d="M 0 0 L 0 84" stroke="rgba(76, 75, 105, 0.16)" />
          <path d={buildCurvePath(easeInCubic)} transform="translate(0 0) scale(2.52 0.84)" fill="none" stroke="#7b68ee" strokeWidth="3" />
          <path d={buildCurvePath(easeOutCubic)} transform="translate(0 0) scale(2.52 0.84)" fill="none" stroke="#ff7a59" strokeWidth="3" />
          <path d={buildCurvePath(easeInOutCubic)} transform="translate(0 0) scale(2.52 0.84)" fill="none" stroke="#2fbf9a" strokeWidth="3" />
        </g>
      </svg>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.KNOWLEDGE_GRAPH_CURTAIN]: {
    kind: "stage",
    render: ({ t }) => (
      <LearnConvCurtainKnowledgeGraphV3
        t={t}
        start={0}
        end={6400}
        threads={[
          { source: "Discord: billing queue", quote: "Why did the refund fail again?" },
          { source: "Feishu: priority customers", quote: "Same issue on invoice #4879." },
        ]}
        themes={[
          { title: "Refund eligibility", hits: 12 },
          { title: "Manual verification", hits: 7 },
        ]}
        knowledge={[
          { title: "Refund exceptions", cites: ["Discord - thread 12", "Feishu - Q4 escalation"] },
        ]}
      />
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.COMMAND_FLOW_CURTAIN]: {
    kind: "stage",
    render: ({ t }) => <OneCommandCurtainEverywhere t={t} start={900} end={7200} />,
  },
  [MATERIAL_LIBRARY_ASSET_IDS.COMMIT_PULSE_CURTAIN]: {
    kind: "stage",
    render: ({ t }) => <LearnConvCurtainCommitPulse t={t} start={600} end={6200} />,
  },
  [MATERIAL_LIBRARY_ASSET_IDS.PULSE_QUEUE_CURTAIN]: {
    kind: "stage",
    render: ({ t }) => <OneCommandCurtainPulseQueue t={t} start={500} end={6200} />,
  },
  [MATERIAL_LIBRARY_ASSET_IDS.BRAND_TRANSITION_RING]: {
    kind: "stage",
    note: "The ring is the original cover transition layer that collapses into the brand stage.",
    render: ({ t }) => (
      <div style={{ position: "absolute", inset: 0 }}>
        <BrandTransitionRing key={Math.floor((t % 7200) / 1800)} />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.NOISE_CARD_STAGE]: {
    kind: "stage",
    render: ({ t }) => {
      const previewState = getNoiseCardStagePreviewState(t);

      return (
        <NoiseCardStage
          phase={previewState.phase}
          showRing={previewState.showRing}
          visibleCount={previewState.visibleCount}
          line="Catch you before users do"
        />
      );
    },
  },
  [MATERIAL_LIBRARY_ASSET_IDS.ONE_COMMAND_HERO_INTRO]: {
    kind: "stage",
    note: "This keeps the original one-command opening card and its wash animation intact.",
    render: () => <OneCommandHeroIntro />,
  },
  [MATERIAL_LIBRARY_ASSET_IDS.LEARN_CONVERSATIONS_HERO_INTRO]: {
    kind: "stage",
    note: "This is the original learn-from-conversations opening beat, extracted as a reusable hero transition.",
    render: () => <LearnConversationsHeroIntro />,
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DUAL_PHONE_RESOLVE]: {
    kind: "stage",
    note: "The preview runs through the squeeze, proof-chip, and resolve-lockup phases from the original staff reveal.",
    render: ({ t }) => (
      <StaffResolveTransition
        progress={(t % 9000) / 9000}
        timeMs={t}
      />
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.RECORDING_BLANK_OVERLAY]: {
    kind: "stage",
    note: "A pure matte wipe that clears the underlying recording scene before the next overlay enters.",
    render: ({ t }) => (
      <div style={{ position: "absolute", inset: 0, background: "#f5f4ee" }}>
        <ClientChatRecordingBlankOverlay
          key={Math.floor((t % 2400) / 1200)}
          durationMs={DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.blankStageDurations.signalsDurationMs}
        />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.RECORDING_INTERTITLE_OVERLAY]: {
    kind: "stage",
    note: "Alternates between the two real recording intertitles so you can judge how it handles copy-heavy handoffs.",
    render: ({ t }) => {
      const cycleIndex = Math.floor((t % 7200) / 3600);
      const intertitle =
        cycleIndex === 0
          ? DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.intertitles.signals
          : DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.intertitles.evidence;

      return (
        <div style={{ position: "absolute", inset: 0, background: "#f5f4ee" }}>
          <ClientChatRecordingIntertitleOverlay
            key={`${cycleIndex}-${intertitle.kicker}`}
            intertitle={intertitle}
          />
        </div>
      );
    },
  },
  [MATERIAL_LIBRARY_ASSET_IDS.RECORDING_OUTCOME_OVERLAY]: {
    kind: "stage",
    note: "Shows the closing outcome card that lands after the analysis and evidence sequence.",
    render: ({ t }) => (
      <div style={{ position: "absolute", inset: 0, background: "#f5f4ee" }}>
        <ClientChatRecordingOutcomeOverlay
          key={Math.floor((t % 4200) / 2100)}
          outcome={DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.outcomeScene}
        />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.AUTO_LEARN_FADE_OVERLAY]: {
    kind: "stage",
    note: "This is the neutral wipe used to leave the Feishu chat scene before the knowledge dashboard arrives.",
    render: ({ t }) => {
      const progress = ((t % 2200) / 2200);
      const opacity = progress < 0.25 ? progress / 0.25 : 1;

      return (
        <div style={{ position: "absolute", inset: 0, background: "#f5f4ee" }}>
          <div
            style={{
              position: "absolute",
              inset: "10%",
              borderRadius: "28px",
              background: "linear-gradient(135deg, rgba(85, 56, 199, 0.08) 0%, rgba(51, 112, 255, 0.14) 100%)",
              border: "1px solid rgba(85, 56, 199, 0.08)",
            }}
          />
          <AutoLearnFadeOverlay opacity={Math.min(opacity, 1)} />
        </div>
      );
    },
  },
  [MATERIAL_LIBRARY_ASSET_IDS.AUTO_LEARN_ENDING_OVERLAY]: {
    kind: "stage",
    note: "The original closing statement layer from the auto-learn-knowledge short.",
    render: ({ t }) => (
      <div style={{ position: "absolute", inset: 0, background: "#f5f4ee" }}>
        <AutoLearnEndingOverlay progress={(t % 4200) / 4200} />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.ANIMATED_EMOJI]: {
    kind: "compact",
    render: () => (
      <div style={{ display: "flex", gap: "14px", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <AnimatedEmoji codepoint="1f914" size={26} />
        <AnimatedEmoji codepoint="1f62e" size={26} />
        <AnimatedEmoji codepoint="1f389" size={26} />
        <AnimatedEmoji codepoint="1f44d" size={26} />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.FLOATING_EMOJI]: {
    kind: "phone",
    render: () =>
      renderPhonePreview(
        <div className="phone__thread-list">
          <ChatBubble align="left" tone="lucius" text="This one deserves a little celebration beat." reveal={1} />
          <ClientChatFloatingEmoji
            raw={{ anchor: "end", delayMs: 180, emoji: "party-popper", size: "md", type: "floating_emoji" }}
          />
        </div>,
        <Composer mode="idle" placeholder="Reply..." />,
      ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.CELEBRATION_PARTICLES]: {
    kind: "phone",
    render: () =>
      renderPhonePreview(
        <div className="phone__thread-list">
          <ChatBubble align="left" tone="lucius" text="The corrected invoice is ready." reveal={1} />
          <ChatBubble align="right" tone="user" text="Perfect, thank you." reveal={1} />
          <ClientChatCelebrationParticles />
        </div>,
        <Composer mode="thinking" placeholder="Thinking..." thinkingEmojiCodepoint="1f389" />,
      ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.FEISHU_CARD]: {
    kind: "card",
    render: () => (
      <div style={{ display: "grid", placeItems: "center", minHeight: "210px" }}>
        <FeishuCard card={AUTO_LEARN_FEISHU_CARD} glowing />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.FEISHU_MESSAGE]: {
    kind: "card",
    render: () => (
      <div style={{ display: "grid", gap: "14px" }}>
        <FeishuMessage
          msg={AUTO_LEARN_SCRIPT_MESSAGES[0]}
          participant={AUTO_LEARN_PARTICIPANTS.sarah}
          opacity={1}
          translateY={0}
        />
        <FeishuMessage
          msg={AUTO_LEARN_SCRIPT_MESSAGES[4]}
          participant={AUTO_LEARN_PARTICIPANTS.lucius}
          opacity={1}
          translateY={0}
        />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.FEISHU_TYPING_INDICATOR]: {
    kind: "compact",
    render: () => (
      <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
        <FeishuTypingIndicator participant={AUTO_LEARN_PARTICIPANTS.lucius} />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.FEISHU_REACTION]: {
    kind: "compact",
    render: ({ t }) => {
      const pulse = 0.96 + (Math.sin((t / 1000) * Math.PI * 2) + 1) * 0.06;

      return (
        <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <FeishuReaction emoji="👍" count={3} scale={pulse} />
          <FeishuReaction emoji="🔥" count={2} scale={1.02} />
          <FeishuReaction emoji="🎉" count={5} scale={1} />
        </div>
      );
    },
  },
  [MATERIAL_LIBRARY_ASSET_IDS.AVATAR_PRESETS]: {
    kind: "card",
    note: "This is a preset map, so the preview shows the named identities it resolves to.",
    render: () => (
      <div
        style={{
          display: "grid",
          gap: "14px",
          gridTemplateColumns: "repeat(auto-fit, minmax(88px, 1fr))",
        }}
      >
        {["lucius", "cryptoking99", ...Object.keys(humanPresets).slice(0, 5)].map((name) => (
          <div
            key={name}
            style={{
              display: "grid",
              justifyItems: "center",
              gap: "10px",
              padding: "12px",
              borderRadius: "18px",
              border: "1px solid rgba(76, 75, 105, 0.08)",
              background: "#ffffff",
            }}
          >
            <DiscordAvatar name={name} size={58} status={name === "lucius" ? "online" : undefined} />
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#231f35" }}>{name}</span>
          </div>
        ))}
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_AVATAR]: {
    kind: "compact",
    render: () => (
      <div style={{ display: "flex", gap: "18px", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <DiscordAvatar name="lucius" size={64} status="online" />
        <DiscordAvatar name="nina chen" size={64} status="online" />
        <DiscordAvatar name="cryptoking99" size={64} status="offline" />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_MESSAGE_CARD]: {
    kind: "card",
    render: () => (
      <div style={{ display: "grid", gap: "14px" }}>
        <DiscordMessageCard
          author="June"
          body="Is it just me or is the onboarding copy doing **too much** on the first screen?"
          meta="10:41"
        />
        <DiscordMessageCard
          author="AlexW"
          avatarVariant="violet"
          body="Signals are **everywhere**: replies, emoji, side threads, random +1s."
          emphasis="feature"
          meta="12:05"
          metaBadge="high traction"
          reactions={[
            { emoji: "🔥", count: 44, hot: true },
            { emoji: "💯", count: 23 },
          ]}
        />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.REACTION_BADGE]: {
    kind: "compact",
    render: () => (
      <div style={{ display: "flex", gap: "12px", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <ReactionBadge emoji="🔥" count={42} hot />
        <ReactionBadge emoji="👌" count={19} />
        <ReactionBadge emoji="📈" count={12} />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_COMPOSER_BAR]: {
    kind: "card",
    render: () => (
      <DiscordComposerBar
        placeholder="Which request matters most right now?"
        assistLabel="Signal Scan"
        sendLabel="Reply"
      />
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.REPLY_READY_TOAST]: {
    kind: "card",
    render: () => (
      <div style={{ display: "grid", placeItems: "center", minHeight: "180px" }}>
        <ClientChatReplyReadyToast
          actionLabel="View"
          ariaLabel="Reply ready for invoice correction thread"
          message="Suggested reply ready to review"
          onView={() => undefined}
        />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.SUPPORT_HANDOFF_CARD]: {
    kind: "card",
    render: () => (
      <ClientChatSupportHandoffCard
        card={SUPPORT_HANDOFF_SAMPLE}
        status="reviewing"
      />
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.MESSAGE_EMPHASIS]: {
    kind: "card",
    note: "This helper keeps the original stress words readable inside dense support messages.",
    render: () => (
      <div
        style={{
          display: "grid",
          gap: "14px",
          padding: "22px",
          borderRadius: "22px",
          background: "#2a2c38",
          color: "rgba(255, 255, 255, 0.86)",
          boxShadow: "0 16px 34px rgba(19, 20, 27, 0.22)",
        }}
      >
        <MessageEmphasisText
          as="div"
          text="Payment failed for 3 days. I still can't pay and I need the exact steps now."
        />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.CHAT_BUBBLE]: {
    kind: "card",
    render: () => (
      <div style={{ display: "grid", gap: "12px" }}>
        <ChatBubble align="left" tone="lucius" text="I grouped the repeated support questions by theme." reveal={1} />
        <ChatBubble align="right" tone="user" text="Nice. Ship the update everywhere." reveal={1} />
        <ChatBubble align="left" tone="lucius" text="Queued with citations." reveal={1} emojiCodepoint="1f44d" />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.COMPOSER_SHELL]: {
    kind: "card",
    render: () => (
      <div style={{ display: "grid", gap: "14px" }}>
        <Composer mode="idle" placeholder="Draft a reply..." />
        <Composer mode="typing" placeholder="Draft a reply..." text="I'll summarize the billing fix." />
        <Composer mode="thinking" placeholder="Draft a reply..." thinkingEmojiCodepoint="1f914" />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.PHONE_FRAME]: {
    kind: "phone",
    render: () =>
      renderPhonePreview(
        <div className="phone__thread-list">
          <ChatBubble align="left" tone="lucius" text="I pulled the repeated question from Discord and Feishu." reveal={1} />
          <ChatBubble align="right" tone="user" text="Great. Send the update everywhere." reveal={1} />
          <ChatBubble align="left" tone="lucius" text="Already queued with citations." reveal={1} />
        </div>,
        <Composer mode="typing" placeholder="Reply..." text="Posting now" />,
      ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.TABLE]: {
    kind: "card",
    render: () => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Queue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Invoice correction</TableCell>
            <TableCell>Ready to send</TableCell>
            <TableCell>2m ago</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Refund exception</TableCell>
            <TableCell>Reviewing</TableCell>
            <TableCell>12m ago</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Discord escalation</TableCell>
            <TableCell>Waiting on proof</TableCell>
            <TableCell>23m ago</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.CHART_CARD_SHELL]: {
    kind: "card",
    render: () => (
      <div
        style={{
          display: "grid",
          gap: "18px",
          borderRadius: "24px",
          border: "1px solid rgba(76, 75, 105, 0.08)",
          background: "#ffffff",
          boxShadow: "0 14px 32px rgba(41, 40, 48, 0.08)",
          padding: "24px",
        }}
      >
        <div style={{ display: "grid", gap: "8px" }}>
          <h3 style={{ margin: 0, color: "#231f35", fontSize: "18px", fontWeight: 700 }}>
            Queue Health
          </h3>
          <p style={{ margin: 0, color: "rgba(76, 75, 105, 0.78)", fontSize: "14px" }}>
            Reusable card shell around a visual proof block.
          </p>
        </div>
        <div>
          <TrendChart
            values={TREND_VALUES}
            labels={TREND_LABELS}
            highlightIndex={4}
            highlightLabel="AI live"
          />
        </div>
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.TREND_CHART]: {
    kind: "card",
    render: () => (
      <TrendChart
        values={TREND_VALUES}
        labels={TREND_LABELS}
        highlightIndex={4}
        highlightLabel="AI live"
        max={280}
        min={0}
      />
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.PROOF_CHIP]: {
    kind: "card",
    render: () => (
      <div style={{ position: "relative", minHeight: "180px" }}>
        <ProofChip count={24} label="proof points" />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.RESOLVE_OVERLAY]: {
    kind: "stage",
    render: () => (
      <div style={{ position: "absolute", inset: 0, background: "#f5f4ee" }}>
        <ResolveOverlay
          style={{
            opacity: 1,
            transform: "translate3d(0, 0, 0) scale(1)",
          }}
          summary="The same assistant, finally acting like staff."
          summaryStyle={{
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          }}
        />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.LUCIUS_LOGO_MARK]: {
    kind: "compact",
    render: () => (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "100%",
          borderRadius: "24px",
          background: "linear-gradient(145deg, #644fb8 0%, #8b79ee 100%)",
          color: "#ffffff",
        }}
      >
        <LuciusLogoMark style={{ width: "118px", height: "118px" }} />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.BLACK_SEND_CURSOR]: {
    kind: "compact",
    render: ({ t }) => (
      <div
        style={{
          position: "relative",
          height: "100%",
          borderRadius: "24px",
          background: "linear-gradient(180deg, #232531 0%, #181923 100%)",
        }}
      >
        <div
          className="composer-send-cursor"
          key={Math.floor((t % 4800) / 1600)}
          style={
            {
              "--send-click-duration": "1200ms",
              "--send-cursor-start-x": "28px",
              "--send-cursor-start-y": "116px",
              "--send-cursor-delta-x": "164px",
              "--send-cursor-delta-y": "-72px",
            } as CSSProperties
          }
        >
          <span className="composer-send-cursor__icon">
            <BlackSendCursor />
          </span>
        </div>
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.PROFILE_ACTION_ICON]: {
    kind: "compact",
    render: () => (
      <div
        style={{
          display: "flex",
          gap: "14px",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "#231f35",
        }}
      >
        {(["mic", "audio", "settings"] as const).map((kind) => (
          <div
            key={kind}
            style={{
              width: "42px",
              height: "42px",
              display: "grid",
              placeItems: "center",
              borderRadius: "999px",
              background: "rgba(100, 79, 184, 0.1)",
            }}
          >
            <ProfileActionIcon kind={kind} />
          </div>
        ))}
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.RECORDING_SCENARIO_SCHEMA]: {
    kind: "card",
    render: () => (
      <div style={{ display: "grid", gap: "14px" }}>
        <div
          style={{
            display: "grid",
            gap: "6px",
            padding: "16px",
            borderRadius: "18px",
            border: "1px solid rgba(76, 75, 105, 0.08)",
            background: "#ffffff",
          }}
        >
          <strong style={{ color: "#231f35" }}>
            {DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.name}
          </strong>
          <p style={{ margin: 0, color: "rgba(76, 75, 105, 0.82)", fontSize: "13px", lineHeight: 1.6 }}>
            Recording schema for the typed intro chat, evidence routing, wiki ingest, intertitles, and outcome close.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "10px",
          }}
        >
          {[
            {
              label: "analysis messages",
              value: DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.analysisScene.messages.length,
            },
            {
              label: "platform logos",
              value: DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.analysisScene.logos.length,
            },
            {
              label: "wiki items",
              value: DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.wikiScene.items.length,
            },
            {
              label: "evidence scenes",
              value: DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.evidenceScenes.length,
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "grid",
                gap: "4px",
                padding: "14px",
                borderRadius: "16px",
                border: "1px solid rgba(76, 75, 105, 0.08)",
                background: "#ffffff",
              }}
            >
              <span
                style={{
                  color: "rgba(76, 75, 105, 0.72)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </span>
              <strong style={{ color: "#231f35", fontSize: "22px" }}>
                {item.value}
              </strong>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.KNOWLEDGE_FILE_TYPE_ICON]: {
    kind: "compact",
    render: () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          height: "100%",
        }}
      >
        {["pricing.pdf", "handoff-doc.docx", "ops-notes.md"].map((fileName) => (
          <div
            key={fileName}
            style={{
              display: "grid",
              gap: "8px",
              justifyItems: "center",
            }}
          >
            <KnowledgeFileTypeIcon
              fileName={fileName}
              style={{ width: "36px", height: "42px" }}
            />
            <span style={{ color: "rgba(76, 75, 105, 0.8)", fontSize: "12px" }}>
              {fileName.split(".")[0]}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.ASSIST_TASK_RICH_TEXT]: {
    kind: "card",
    render: () => (
      <div style={{ display: "grid", gap: "12px" }}>
        <div
          style={{
            borderRadius: "18px",
            border: "1px solid rgba(76, 75, 105, 0.08)",
            background: "#ffffff",
            padding: "16px",
          }}
        >
          <AssistTaskMessageRichText
            content="Please sync with <@u_84721> before we send the Discord draft."
            eventUserDisplayName="nina"
            eventUserId="u_84721"
            platform="discord"
          />
        </div>
        <div
          style={{
            borderRadius: "18px",
            border: "1px solid rgba(76, 75, 105, 0.08)",
            background: "#ffffff",
            padding: "16px",
          }}
        >
          <AssistTaskMessageRichText
            content='Escalate to <a href="tg://user?id=1881">Mia Chen</a> if the refund still fails.'
            platform="telegram"
          />
        </div>
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.SETTINGS_SECTION_SHELL]: {
    kind: "card",
    render: () => (
      <SettingsSectionShell
        title="Workspace integrations"
        actions={
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "88px",
              height: "34px",
              padding: "0 12px",
              borderRadius: "12px",
              background: "rgba(100, 79, 184, 0.1)",
              color: "#644fb8",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            Preview
          </span>
        }
      >
        <div style={{ display: "grid", gap: "16px" }}>
          <SettingsCommunityListSkeleton rowCount={2} />
          <SettingsWorkgroupCardSkeletonList cardCount={1} />
        </div>
      </SettingsSectionShell>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.FEISHU_CHAT_SCENE]: {
    kind: "stage",
    note: "A full Feishu-like discussion scene that accumulates chat, typing, and an auto-learn card beat.",
    render: ({ t }) => <FeishuChatScene t={t % 26000} />,
  },
  [MATERIAL_LIBRARY_ASSET_IDS.KNOWLEDGE_DASHBOARD_SCENE]: {
    kind: "stage",
    note: "The knowledge dashboard lands after the chat and reveals auto-learned entries plus a diff panel.",
    render: ({ t }) => (
      <KnowledgeDashboardScene
        detailElapsedMs={t % 9000}
        selectedId={AUTO_LEARN_KNOWLEDGE_ENTRIES.find((entry) => entry.isNew)?.id ?? null}
      />
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_DM_TOOLBAR_ICONS]: {
    kind: "compact",
    render: () => (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          height: "100%",
          borderRadius: "24px",
          background: "#2B2D31",
        }}
      >
        <DiscordDmToolbarIconStrip />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_CHANNEL_RAIL]: {
    kind: "card",
    render: ({ t }) => (
      <div style={{ minHeight: "320px" }}>
        <DiscordCommunityShell
          activeChannel="help"
          channels={DISCORD_SAMPLE_CHANNELS}
          headerCopy={{
            eyebrow: "Community Grid",
            searchPlaceholder: "Search channels",
            sectionLabel: "Active Threads",
            title: "Pulse Board",
          }}
        >
          <div style={{ minHeight: "260px" }} />
        </DiscordCommunityShell>
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_COMMUNITY_SHELL]: {
    kind: "stage",
    render: ({ t }) => (
      <DiscordCommunityShell
        activeChannel="feature-requests"
        channels={DISCORD_SAMPLE_CHANNELS}
        composer={<DiscordComposerBar placeholder="Which request matters most right now?" />}
        headerCopy={{
          eyebrow: "Community Grid",
          searchPlaceholder: "Search channels",
          sectionLabel: "Active Threads",
          title: "Pulse Board",
        }}
        rightPanel={
          <>
            <div className="discord-info-panel__card discord-info-panel__card--hero">
              <p className="discord-info-panel__eyebrow">Signal Lens</p>
              <h3>Excitement without synthesis</h3>
              <p>The room is telling you what it wants, but the signal is still scattered.</p>
            </div>
            <div className="discord-info-panel__card">
              <p className="discord-info-panel__eyebrow">Signal Notes</p>
              <div className="discord-info-panel__metrics">
                <div>
                  <span>Top reaction</span>
                  <strong>44</strong>
                </div>
                <div>
                  <span>Theme confidence</span>
                  <strong>Low</strong>
                </div>
              </div>
            </div>
          </>
        }
      >
        <header className="discord-chat-header">
          <div className="discord-chat-header__left">
            <span className="discord-chat-header__channel"># feature-requests</span>
            <span className="discord-chat-header__divider" />
            <span className="discord-chat-header__subtitle">Interest is visible, but it still lacks synthesis.</span>
          </div>
        </header>
        <DiscordTranscriptStage
          currentMs={t % 4200}
          messages={DISCORD_TRANSCRIPT_SAMPLE}
          revealTimes={[0, 420, 860]}
          tone="feature"
        />
      </DiscordCommunityShell>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_TRANSCRIPT_STAGE]: {
    kind: "stage",
    render: ({ t }) => (
      <div style={{ position: "absolute", inset: 0, background: "#1f2229", padding: "28px" }}>
        <DiscordTranscriptStage
          currentMs={t % 4200}
          messages={DISCORD_TRANSCRIPT_SAMPLE}
          questionStartMs={2400}
          questionText="Which signal deserves action?"
          revealTimes={[0, 420, 860]}
          tone="feature"
        />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_QUESTION_STACK_STAGE]: {
    kind: "card",
    render: ({ t }) => (
      <div
        style={{
          display: "grid",
          gap: "14px",
          minHeight: "220px",
          placeItems: "center",
          padding: "28px",
          borderRadius: "28px",
          background: "linear-gradient(180deg, rgba(35, 39, 47, 0.98), rgba(29, 32, 39, 0.98))",
        }}
      >
        <DiscordQuestionStackStage
          currentMs={t % 4200}
          initialDelayMs={420}
          questions={DISCORD_QUESTION_SAMPLE}
          revealDurationMs={420}
          staggerMs={760}
          startMs={0}
        />
      </div>
    ),
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_NOISE_CARD_STAGE]: {
    kind: "stage",
    render: ({ t }) => (
      <DiscordNoiseCardStage
        cards={DISCORD_NOISE_CARD_SAMPLE}
        currentMs={t % 6400}
        questionStack={{
          initialDelayMs: 680,
          questions: DISCORD_QUESTION_SAMPLE,
          revealDurationMs: 420,
          staggerMs: 840,
          startOffsetMs: 2200,
        }}
        startMs={0}
        visibleTiming={{
          cardStartOffsetMs: 520,
          cardStaggerMs: 420,
          endMs: 6400,
          fadeInMs: 320,
          fadeOutMs: 520,
        }}
      />
    ),
  },
};

const catalogDocuments = import.meta.glob("../catalog/assets/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const implementationSources = import.meta.glob(
  [
    "./**/*.ts",
    "./**/*.tsx",
    "../../projects/demo-app/src/components/chat/client-chat-route-shell.tsx",
    "../../projects/demo-app/src/lib/client-chat-recording.ts",
    "../../projects/short-asset-ai-no-personality/discord-ui/src/App.tsx",
    "../../projects/short-asset-break-immersion/src/CommunityScene.tsx",
    "../../projects/short-asset-break-immersion/src/LossChartScene.tsx",
    "../../projects/short-asset-break-immersion/src/TimelinePreview.tsx",
  ],
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
) as Record<string, string>;

function resolveImplementationSource(implementationRef: string): string | null {
  if (!implementationRef.startsWith("material-library/src/")) {
    if (!implementationRef.startsWith("projects/")) {
      return null;
    }

    const projectPath = `../../${implementationRef}`;
    return implementationSources[projectPath] ?? null;
  }

  const localPath = `./${implementationRef.slice("material-library/src/".length)}`;
  return implementationSources[localPath] ?? null;
}

export const MATERIAL_LIBRARY_ENTRIES: MaterialLibraryCatalogEntry[] = Object.values(
  catalogDocuments,
)
  .map((source) => {
    const { metadata, body } = parseFrontmatterDocument(source);

    return {
      ...metadata,
      anchorId: toAnchorId(metadata.id),
      body,
      preview: PREVIEW_DEFINITIONS[metadata.id] ?? null,
      sourceCode: resolveImplementationSource(metadata.implementationRef),
    };
  })
  .sort(compareMaterialLibraryEntries);

export const MATERIAL_LIBRARY_ENTRY_BY_ID = new Map(
  MATERIAL_LIBRARY_ENTRIES.map((entry) => [entry.id, entry] as const),
);

export const MATERIAL_LIBRARY_CURATED_SECTIONS: CuratedSection[] = [
  {
    title: "Motion",
    description: "Timeline helpers and curtain variants that carry the pacing of the original short assets.",
    ids: [
      MATERIAL_LIBRARY_ASSET_IDS.BRAND_TRANSITION_RING,
      MATERIAL_LIBRARY_ASSET_IDS.NOISE_CARD_STAGE,
      MATERIAL_LIBRARY_ASSET_IDS.ONE_COMMAND_HERO_INTRO,
      MATERIAL_LIBRARY_ASSET_IDS.LEARN_CONVERSATIONS_HERO_INTRO,
      MATERIAL_LIBRARY_ASSET_IDS.DUAL_PHONE_RESOLVE,
      MATERIAL_LIBRARY_ASSET_IDS.KNOWLEDGE_GRAPH_CURTAIN,
      MATERIAL_LIBRARY_ASSET_IDS.COMMAND_FLOW_CURTAIN,
      MATERIAL_LIBRARY_ASSET_IDS.COMMIT_PULSE_CURTAIN,
      MATERIAL_LIBRARY_ASSET_IDS.PULSE_QUEUE_CURTAIN,
      MATERIAL_LIBRARY_ASSET_IDS.RECORDING_BLANK_OVERLAY,
      MATERIAL_LIBRARY_ASSET_IDS.RECORDING_INTERTITLE_OVERLAY,
      MATERIAL_LIBRARY_ASSET_IDS.RECORDING_OUTCOME_OVERLAY,
      MATERIAL_LIBRARY_ASSET_IDS.AUTO_LEARN_FADE_OVERLAY,
      MATERIAL_LIBRARY_ASSET_IDS.AUTO_LEARN_ENDING_OVERLAY,
      MATERIAL_LIBRARY_ASSET_IDS.BREAK_IMMERSION_TIMELINE_PREVIEW,
      MATERIAL_LIBRARY_ASSET_IDS.EASING,
    ],
  },
  {
    title: "Chat",
    description: "Reaction flourishes, avatars, and support-state widgets pulled from the real chat demos.",
    ids: [
      MATERIAL_LIBRARY_ASSET_IDS.ANIMATED_EMOJI,
      MATERIAL_LIBRARY_ASSET_IDS.FLOATING_EMOJI,
      MATERIAL_LIBRARY_ASSET_IDS.CELEBRATION_PARTICLES,
      MATERIAL_LIBRARY_ASSET_IDS.DISCORD_AVATAR,
      MATERIAL_LIBRARY_ASSET_IDS.DISCORD_MESSAGE_CARD,
      MATERIAL_LIBRARY_ASSET_IDS.REACTION_BADGE,
      MATERIAL_LIBRARY_ASSET_IDS.DISCORD_COMPOSER_BAR,
      MATERIAL_LIBRARY_ASSET_IDS.REPLY_READY_TOAST,
      MATERIAL_LIBRARY_ASSET_IDS.SUPPORT_HANDOFF_CARD,
      MATERIAL_LIBRARY_ASSET_IDS.MESSAGE_EMPHASIS,
      MATERIAL_LIBRARY_ASSET_IDS.FEISHU_CARD,
      MATERIAL_LIBRARY_ASSET_IDS.FEISHU_MESSAGE,
      MATERIAL_LIBRARY_ASSET_IDS.FEISHU_TYPING_INDICATOR,
      MATERIAL_LIBRARY_ASSET_IDS.FEISHU_REACTION,
      MATERIAL_LIBRARY_ASSET_IDS.AVATAR_PRESETS,
      MATERIAL_LIBRARY_ASSET_IDS.RECORDING_SCENARIO_SCHEMA,
      MATERIAL_LIBRARY_ASSET_IDS.KNOWLEDGE_FILE_TYPE_ICON,
      MATERIAL_LIBRARY_ASSET_IDS.ASSIST_TASK_RICH_TEXT,
    ],
  },
  {
    title: "Brand & Icons",
    description: "Original marks, action icons, and resolve lockups extracted without redesigning the source look.",
    ids: [
      MATERIAL_LIBRARY_ASSET_IDS.LUCIUS_LOGO_MARK,
      MATERIAL_LIBRARY_ASSET_IDS.PROFILE_ACTION_ICON,
      MATERIAL_LIBRARY_ASSET_IDS.BLACK_SEND_CURSOR,
      MATERIAL_LIBRARY_ASSET_IDS.DISCORD_DM_TOOLBAR_ICONS,
      MATERIAL_LIBRARY_ASSET_IDS.PROOF_CHIP,
      MATERIAL_LIBRARY_ASSET_IDS.RESOLVE_OVERLAY,
    ],
  },
  {
    title: "Surfaces",
    description: "Original phone and message shells that can be recombined without pulling in page logic.",
    ids: [
      MATERIAL_LIBRARY_ASSET_IDS.PHONE_FRAME,
      MATERIAL_LIBRARY_ASSET_IDS.CHAT_BUBBLE,
      MATERIAL_LIBRARY_ASSET_IDS.COMPOSER_SHELL,
      MATERIAL_LIBRARY_ASSET_IDS.SETTINGS_SECTION_SHELL,
      MATERIAL_LIBRARY_ASSET_IDS.DISCORD_CHANNEL_RAIL,
      MATERIAL_LIBRARY_ASSET_IDS.DISCORD_COMMUNITY_SHELL,
      MATERIAL_LIBRARY_ASSET_IDS.DISCORD_TRANSCRIPT_STAGE,
      MATERIAL_LIBRARY_ASSET_IDS.DISCORD_QUESTION_STACK_STAGE,
      MATERIAL_LIBRARY_ASSET_IDS.DISCORD_NOISE_CARD_STAGE,
      MATERIAL_LIBRARY_ASSET_IDS.FEISHU_CHAT_SCENE,
      MATERIAL_LIBRARY_ASSET_IDS.KNOWLEDGE_DASHBOARD_SCENE,
      MATERIAL_LIBRARY_ASSET_IDS.RECORDING_ROUTE_SHELL,
      MATERIAL_LIBRARY_ASSET_IDS.BREAK_IMMERSION_COMMUNITY_SCENE,
      MATERIAL_LIBRARY_ASSET_IDS.AI_NO_PERSONALITY_HOME_SHELL,
    ],
  },
  {
    title: "Data Display",
    description: "Table and chart shells for proof-heavy scenes and compact dashboard moments.",
    ids: [
      MATERIAL_LIBRARY_ASSET_IDS.TABLE,
      MATERIAL_LIBRARY_ASSET_IDS.CHART_CARD_SHELL,
      MATERIAL_LIBRARY_ASSET_IDS.TREND_CHART,
      MATERIAL_LIBRARY_ASSET_IDS.BREAK_IMMERSION_LOSS_CHART,
      MATERIAL_LIBRARY_ASSET_IDS.TIMELINE,
    ],
  },
];

export function getMaterialLibraryEntry(
  entryId: string,
): MaterialLibraryCatalogEntry | null {
  return MATERIAL_LIBRARY_ENTRY_BY_ID.get(entryId) ?? null;
}

export function getMaterialLibraryEntryByAnchor(
  anchorId: string,
): MaterialLibraryCatalogEntry | null {
  return MATERIAL_LIBRARY_ENTRIES.find((entry) => entry.anchorId === anchorId) ?? null;
}
