import type { ReactNode } from "react";

export type AvatarStatus = "online" | "offline" | "idle" | "dnd";

export type DmConversationItem = {
  id: string;
  name: string;
  subtitle: string;
  status?: AvatarStatus;
  variant?: string;
  imageUrl?: string;
  active?: boolean;
  unread?: number;
};

export type CommunityChannelItem = {
  id: string;
  name: string;
  subtitle: string;
  type?: "text" | "voice";
  active?: boolean;
  unread?: number;
};

export type SidebarItem = {
  id: string;
  label: string;
  badge?: string;
  accent?: "primary" | "mint" | "coral" | "muted";
  active?: boolean;
};

export type ChatEmbed = {
  title: string;
  description: string;
  footer?: string;
  accentColor?: string;
  fields?: Array<{
    title: string;
    value: string;
    inline?: boolean;
  }>;
};

export type ChatHeaderData = {
  channelLabel: string;
  membersLabel: string;
  heroNote: string;
};

export type ChatMessage = {
  id: string;
  author: string;
  avatarUrl?: string;
  avatarVariant?: string;
  role: "user" | "assistant" | "system";
  timestamp: string;
  content: string;
  highlight?: string;
  isBot?: boolean;
  mention?: string;
  embed?: ChatEmbed;
};

export type InfoPanelMetric = {
  label: string;
  value: string;
};

export type InfoPanelData = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  pinnedFacts: string[];
  metrics?: InfoPanelMetric[];
};

export type ScreenScaffoldProps = {
  shellEyebrow?: string;
  title: string;
  subtitle: string;
  topControls?: ReactNode;
};

export type BaseScreenProps = ScreenScaffoldProps & {
  serverItems: SidebarItem[];
  header: ChatHeaderData;
  composerPlaceholder: string;
  messages: ChatMessage[];
  infoPanel?: InfoPanelData;
};

export type DmScreenProps = BaseScreenProps & {
  railEyebrow?: string;
  railTitle: string;
  searchPlaceholder: string;
  conversations: DmConversationItem[];
};

export type CommunityScreenProps = BaseScreenProps & {
  railEyebrow?: string;
  railTitle: string;
  searchPlaceholder: string;
  channels: CommunityChannelItem[];
};
