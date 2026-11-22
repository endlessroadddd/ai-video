import type { ReactNode } from "react";

import type { AvatarPaletteVariant } from "./avatar-types";

export type DiscordMessageTone = "default" | "warning" | "feature";
export type DiscordTranscriptTone = "default" | "chaos" | "warning" | "feature";
export type DiscordNoiseCardTone = "default" | "warning" | "feature";

export type DiscordReactionItem = {
  count: number;
  emoji: string;
  hot?: boolean;
};

export type ChannelItem = {
  id?: string;
  label?: string;
  muted?: boolean;
  name: string;
  unread?: number | string;
  watch?: boolean;
};

export type MessageItem = {
  author: string;
  avatarImageUrl?: string;
  avatarVariant?: AvatarPaletteVariant;
  body: string;
  emphasis?: DiscordMessageTone;
  id?: string;
  meta: string;
  metaBadge?: string;
  reactions?: readonly DiscordReactionItem[];
};

export type QuestionStackItem = {
  emphasis?: "default" | "highlight";
  id?: string;
  text: string;
};

export type NoiseCardItem = {
  channel: string;
  id: string;
  left?: number;
  tag?: string;
  text: string;
  tone?: DiscordNoiseCardTone;
  top?: number;
  width?: number;
};

export type DiscordCommunityHeaderCopy = {
  eyebrow?: string;
  searchPlaceholder?: string;
  sectionLabel?: string;
  subtitle?: string;
  title: string;
};

export type DiscordServerItem = {
  active?: boolean;
  badge?: string;
  iconLabel?: string;
  id: string;
  label: string;
  tone?: "primary" | "mint" | "coral" | "muted";
};

export type DiscordMessageCardProps = {
  author: string;
  avatarImageUrl?: string;
  avatarVariant?: AvatarPaletteVariant;
  body: ReactNode;
  className?: string;
  emphasis?: DiscordMessageTone;
  meta: string;
  metaBadge?: string;
  reactions?: readonly DiscordReactionItem[];
};

export type DiscordTranscriptStageProps = {
  className?: string;
  currentMs: number;
  messages: readonly MessageItem[];
  questionText?: string;
  questionRevealDurationMs?: number;
  questionStartMs?: number;
  revealDurationMs?: number;
  revealTimes: readonly number[];
  tone?: DiscordTranscriptTone;
};

export type DiscordQuestionStackStageProps = {
  className?: string;
  currentMs: number;
  initialDelayMs: number;
  questions: readonly (QuestionStackItem | string)[];
  revealDurationMs: number;
  staggerMs: number;
  startMs: number;
};

export type DiscordNoiseCardVisibleTiming = {
  cardStartOffsetMs: number;
  cardStaggerMs: number;
  endMs?: number;
  fadeInMs: number;
  fadeOutMs?: number;
};

export type DiscordNoiseCardQuestionStack = {
  initialDelayMs: number;
  questions: readonly (QuestionStackItem | string)[];
  revealDurationMs: number;
  staggerMs: number;
  startOffsetMs?: number;
};

export type DiscordNoiseCardStageProps = {
  cards: readonly NoiseCardItem[];
  className?: string;
  currentMs: number;
  questionStack?: DiscordNoiseCardQuestionStack;
  startMs: number;
  visibleTiming: DiscordNoiseCardVisibleTiming;
};

export type DiscordChannelRailProps = {
  activeChannel: string;
  channels: readonly ChannelItem[];
  className?: string;
  headerCopy: DiscordCommunityHeaderCopy;
  searchPulse?: number;
};

export type DiscordCommunityShellProps = {
  activeChannel: string;
  channels: readonly ChannelItem[];
  children: ReactNode;
  className?: string;
  composer?: ReactNode;
  headerCopy: DiscordCommunityHeaderCopy;
  rightPanel?: ReactNode;
  serverItems?: readonly DiscordServerItem[];
};

export type DiscordCommunitySceneProps = {
  activeChannel: string;
  channels: readonly ChannelItem[];
  composer?: ReactNode;
  currentMs: number;
  headerCopy: DiscordCommunityHeaderCopy;
  messages: readonly MessageItem[];
  questionText?: string;
  revealTimes: readonly number[];
  rightPanel?: ReactNode;
  tone?: DiscordTranscriptTone;
};
