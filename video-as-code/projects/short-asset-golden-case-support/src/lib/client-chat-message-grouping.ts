import { isClientChatSupportHandoffCardMessage } from "@/lib/client-chat-support-recording";
import { isLuciusReplyMessage } from "@/lib/client-chat-pending-reply";
import type { ClientChatMessage } from "@/lib/services/client-chat-api";
import { m } from "@/paraglide/messages";

export type ClientChatActorKind = "self" | "participant" | "lucius";

export type ClientChatRenderableMessageGroup = {
  groupId: string;
  actorKind: ClientChatActorKind;
  senderKey: string;
  displayName: string;
  avatarUrl: string | null;
  timeLabel: string;
  messages: ClientChatMessage[];
  showActions: boolean;
};

type BuildClientChatRenderableMessageGroupsOptions = {
  currentAuthUserId: string | null | undefined;
  luciusAvatarUrl?: string;
  messages: ClientChatMessage[];
};

type ClientChatMessageGroupDraft = {
  actorKind: ClientChatActorKind;
  avatarUrl: string | null;
  displayName: string;
  messages: ClientChatMessage[];
  senderKey: string;
};

const DEFAULT_LUCIUS_AVATAR_URL = "/figma-auth/Logo%20Mark_black.svg";

/**
 * 聊天消息时间统一收口在这里：
 * - 浏览器 locale 决定 12/24 小时制；
 * - 无效时间直接回空串，调用侧不渲染时间节点。
 */
export function formatChatMessageTime(
  value: string | null | undefined,
): string {
  const normalizedValue: string = String(value || "").trim();
  if (!normalizedValue) {
    return "";
  }

  const timestamp: Date = new Date(normalizedValue);
  if (Number.isNaN(timestamp.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

function resolveClientChatActorKind(
  message: ClientChatMessage,
  currentAuthUserId: string | null | undefined,
): ClientChatActorKind {
  if (isClientChatSupportHandoffCardMessage(message)) {
    return "lucius";
  }

  if (isLuciusReplyMessage(message)) {
    return "lucius";
  }

  const messageId: string = String(message.message_id || "").trim();
  if (messageId.startsWith("optimistic-")) {
    return "self";
  }

  const normalizedCurrentAuthUserId: string = String(
    currentAuthUserId || "",
  ).trim();
  const normalizedMessageUserId: string = String(message.user_id || "").trim();
  if (
    normalizedCurrentAuthUserId &&
    normalizedMessageUserId === normalizedCurrentAuthUserId
  ) {
    return "self";
  }

  return "participant";
}

function resolveClientChatSenderKey(
  message: ClientChatMessage,
  actorKind: ClientChatActorKind,
): string {
  if (isClientChatSupportHandoffCardMessage(message)) {
    return `support-handoff:${String(message.message_id || "").trim()}`;
  }

  if (actorKind === "self") {
    return "self";
  }

  if (actorKind === "lucius") {
    return "lucius";
  }

  return (
    String(message.user_id || "").trim() ||
    String(message.username || "").trim() ||
    String(message.message_id || "").trim()
  );
}

function resolveClientChatDisplayName(
  message: ClientChatMessage,
  actorKind: ClientChatActorKind,
): string {
  if (actorKind === "lucius") {
    return m.client_chat_lucius_name();
  }

  if (actorKind === "self") {
    return m.client_chat_me();
  }

  const senderName: string = String(message.username || "").trim();
  if (senderName) {
    return senderName;
  }

  const messageRole: string = String(message.message_role || "").trim();
  return messageRole || m.client_chat_user_fallback();
}

function createMessageGroupDraft(
  message: ClientChatMessage,
  actorKind: ClientChatActorKind,
  senderKey: string,
  luciusAvatarUrl: string,
): ClientChatMessageGroupDraft {
  return {
    actorKind,
    avatarUrl:
      actorKind === "participant"
        ? String(message.avatar_url || "").trim() || null
        : actorKind === "lucius"
          ? luciusAvatarUrl
          : null,
    displayName: resolveClientChatDisplayName(message, actorKind),
    messages: [message],
    senderKey,
  };
}

function enrichMessageGroupDraft(
  groupDraft: ClientChatMessageGroupDraft,
  message: ClientChatMessage,
): void {
  groupDraft.messages.push(message);

  if (!groupDraft.avatarUrl && groupDraft.actorKind === "participant") {
    groupDraft.avatarUrl = String(message.avatar_url || "").trim() || null;
  }

  if (groupDraft.actorKind !== "participant") {
    return;
  }

  const nextSenderName: string = String(message.username || "").trim();
  if (nextSenderName && groupDraft.displayName === m.client_chat_user_fallback()) {
    groupDraft.displayName = nextSenderName;
  }
}

/**
 * 把原始消息列表整理成“可渲染分组”：
 * - 只按相邻、同 actorKind、同 senderKey 合并；
 * - self / participant / lucius 的判定都固定在这里，页面不再重复推断。
 */
export function buildClientChatRenderableMessageGroups(
  options: BuildClientChatRenderableMessageGroupsOptions,
): ClientChatRenderableMessageGroup[] {
  const {
    currentAuthUserId,
    luciusAvatarUrl = DEFAULT_LUCIUS_AVATAR_URL,
    messages,
  } = options;

  const groupDrafts: ClientChatMessageGroupDraft[] = [];

  for (const message of messages) {
    const actorKind: ClientChatActorKind = resolveClientChatActorKind(
      message,
      currentAuthUserId,
    );
    const senderKey: string = resolveClientChatSenderKey(message, actorKind);
    const previousGroupDraft: ClientChatMessageGroupDraft | undefined =
      groupDrafts[groupDrafts.length - 1];

    if (
      previousGroupDraft &&
      previousGroupDraft.actorKind === actorKind &&
      previousGroupDraft.senderKey === senderKey
    ) {
      enrichMessageGroupDraft(previousGroupDraft, message);
      continue;
    }

    groupDrafts.push(
      createMessageGroupDraft(message, actorKind, senderKey, luciusAvatarUrl),
    );
  }

  return groupDrafts.map(
    (
      groupDraft: ClientChatMessageGroupDraft,
      groupIndex: number,
    ): ClientChatRenderableMessageGroup => {
      const firstMessage: ClientChatMessage = groupDraft.messages[0];
      const timeLabel: string = formatChatMessageTime(
        firstMessage.timestamp || firstMessage.created_at,
      );

      return {
        groupId: [
          groupDraft.actorKind,
          groupDraft.senderKey,
          String(firstMessage.message_id || "").trim(),
          String(groupIndex),
        ].join(":"),
        actorKind: groupDraft.actorKind,
        senderKey: groupDraft.senderKey,
        displayName: groupDraft.displayName,
        avatarUrl: groupDraft.avatarUrl,
        timeLabel,
        messages: groupDraft.messages,
        showActions:
          groupDraft.actorKind === "lucius" ||
          groupDraft.messages.some((message) =>
            Boolean(String(message.content || "").trim()),
          ),
      };
    },
  );
}
