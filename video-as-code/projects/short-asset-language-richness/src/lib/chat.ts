export type ChatActorKind = "self" | "participant" | "lucius";

export type ChatAttachment = {
  alt?: string;
  id?: string;
  src: string;
};

export type ChatMessage = {
  actorKind?: ChatActorKind;
  attachments?: ReadonlyArray<ChatAttachment>;
  avatarUrl?: string | null;
  content: string;
  createdAt?: string | null;
  id: string;
  isLucius?: boolean;
  status?: "sent" | "streaming";
  timestamp?: string | null;
  userId?: string | null;
  username?: string | null;
};

export type ChatRenderableMessageGroup = {
  actorKind: ChatActorKind;
  avatarUrl: string | null;
  displayName: string;
  groupId: string;
  messages: ReadonlyArray<ChatMessage>;
  senderKey: string;
  timeLabel: string;
};

export type ChatSidebarItem = {
  active?: boolean;
  id: string;
  label: string;
  meta?: string;
};

export type ChatSidebarGroup = {
  id: string;
  items: ReadonlyArray<ChatSidebarItem>;
  title?: string;
};

export type ChatComposerModel = {
  draftMessage: string;
  placeholder?: string;
  readOnly?: boolean;
  sendDisabled?: boolean;
  sendLabel?: string;
  subdued?: boolean;
  uploadLabel?: string;
};

const DEFAULT_LUCIUS_NAME = "Lucius";
const DEFAULT_PARTICIPANT_NAME = "User";
const DEFAULT_SELF_NAME = "You";

function resolveActorKind(
  message: ChatMessage,
  currentUserId: string | null | undefined,
): ChatActorKind {
  if (message.actorKind) {
    return message.actorKind;
  }

  if (message.isLucius) {
    return "lucius";
  }

  const normalizedCurrentUserId = String(currentUserId || "").trim();
  const normalizedMessageUserId = String(message.userId || "").trim();

  if (
    normalizedCurrentUserId &&
    normalizedCurrentUserId === normalizedMessageUserId
  ) {
    return "self";
  }

  return "participant";
}

function resolveSenderKey(message: ChatMessage, actorKind: ChatActorKind): string {
  if (actorKind === "self") {
    return "self";
  }

  if (actorKind === "lucius") {
    return "lucius";
  }

  return (
    String(message.userId || "").trim() ||
    String(message.username || "").trim() ||
    String(message.id || "").trim()
  );
}

function resolveDisplayName(
  message: ChatMessage,
  actorKind: ChatActorKind,
  names: {
    luciusName: string;
    participantFallbackName: string;
    selfName: string;
  },
): string {
  if (actorKind === "lucius") {
    return names.luciusName;
  }

  if (actorKind === "self") {
    return names.selfName;
  }

  return String(message.username || "").trim() || names.participantFallbackName;
}

export function formatChatMessageTime(
  value: string | null | undefined,
): string {
  const normalizedValue = String(value || "").trim();
  if (!normalizedValue) {
    return "";
  }

  const timestamp = new Date(normalizedValue);
  if (Number.isNaN(timestamp.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

export function getAvatarFallbackText(displayName: string): string {
  const normalizedName = displayName.trim();
  if (!normalizedName) {
    return "U";
  }

  const nameParts = normalizedName.split(/\s+/).filter(Boolean);
  if (nameParts.length >= 2) {
    return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
  }

  return Array.from(normalizedName).slice(0, 2).join("").toUpperCase();
}

export function buildChatRenderableMessageGroups(options: {
  currentUserId?: string | null;
  luciusAvatarUrl?: string | null;
  luciusName?: string;
  messages: ReadonlyArray<ChatMessage>;
  participantFallbackName?: string;
  selfName?: string;
}): ChatRenderableMessageGroup[] {
  const {
    currentUserId,
    luciusAvatarUrl = null,
    luciusName = DEFAULT_LUCIUS_NAME,
    messages,
    participantFallbackName = DEFAULT_PARTICIPANT_NAME,
    selfName = DEFAULT_SELF_NAME,
  } = options;
  const names = { luciusName, participantFallbackName, selfName };
  const groups: Array<{
    actorKind: ChatActorKind;
    avatarUrl: string | null;
    displayName: string;
    messages: ChatMessage[];
    senderKey: string;
  }> = [];

  for (const message of messages) {
    const actorKind = resolveActorKind(message, currentUserId);
    const senderKey = resolveSenderKey(message, actorKind);
    const previousGroup = groups[groups.length - 1];

    if (
      previousGroup &&
      previousGroup.actorKind === actorKind &&
      previousGroup.senderKey === senderKey
    ) {
      previousGroup.messages.push(message);
      if (!previousGroup.avatarUrl && actorKind === "participant") {
        previousGroup.avatarUrl = String(message.avatarUrl || "").trim() || null;
      }
      continue;
    }

    groups.push({
      actorKind,
      avatarUrl:
        actorKind === "participant"
          ? String(message.avatarUrl || "").trim() || null
          : actorKind === "lucius"
            ? luciusAvatarUrl
            : null,
      displayName: resolveDisplayName(message, actorKind, names),
      messages: [message],
      senderKey,
    });
  }

  return groups.map((group, groupIndex) => {
    const firstMessage = group.messages[0];
    const timeLabel = formatChatMessageTime(
      firstMessage.timestamp || firstMessage.createdAt,
    );

    return {
      actorKind: group.actorKind,
      avatarUrl: group.avatarUrl,
      displayName: group.displayName,
      groupId: `${group.actorKind}:${group.senderKey}:${firstMessage.id}:${groupIndex}`,
      messages: group.messages,
      senderKey: group.senderKey,
      timeLabel,
    };
  });
}
