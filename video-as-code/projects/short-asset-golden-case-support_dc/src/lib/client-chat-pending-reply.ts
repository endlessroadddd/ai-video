import type { ClientChatMessage } from "@/lib/services/client-chat-api";

const CLIENT_CHAT_PENDING_REPLY_STORAGE_PREFIX =
  "client-chat:pending-reply:v1";

const LUCIUS_REPLY_ROLE_CODES: Set<string> = new Set([
  "assistant",
  "bot",
  "agent",
  "lucius_customer",
  "lucius",
]);

export type ClientChatPendingReplyState = {
  knownAssistantMessageIds: string[];
  startedAt: string;
};

export type ClientChatPendingReplyStateMap = Record<
  string,
  ClientChatPendingReplyState
>;

/**
 * 统一管理“Lucius 正在回复”的本地存储 key：
 * - 仍按 company 维度隔离，避免跨公司串状态；
 * - 只在前端使用，不进入后端接口。
 */
export function createPendingReplyStorageKey(companyId: string): string {
  return `${CLIENT_CHAT_PENDING_REPLY_STORAGE_PREFIX}:${companyId}`;
}

function sanitizePendingReplyState(
  state: ClientChatPendingReplyState,
): ClientChatPendingReplyState | null {
  const normalizedStartedAt = String(state.startedAt || "").trim();
  if (!normalizedStartedAt) {
    return null;
  }

  const normalizedAssistantMessageIds = Array.from(
    new Set(
      (state.knownAssistantMessageIds || [])
        .map((messageId) => String(messageId || "").trim())
        .filter(Boolean),
    ),
  );

  return {
    knownAssistantMessageIds: normalizedAssistantMessageIds,
    startedAt: normalizedStartedAt,
  };
}

export function sanitizePendingReplyStateMap(
  pendingReplyStateMap: ClientChatPendingReplyStateMap,
): ClientChatPendingReplyStateMap {
  return Object.fromEntries(
    Object.entries(pendingReplyStateMap).flatMap(([sessionId, state]) => {
      const normalizedSessionId = sessionId.trim();
      if (!normalizedSessionId) {
        return [];
      }

      const normalizedState = sanitizePendingReplyState(state);
      if (!normalizedState) {
        return [];
      }

      return [[normalizedSessionId, normalizedState]];
    }),
  );
}

/**
 * 读取持久化中的 pending reply 状态：
 * - 如果数据结构被污染，直接回退为空对象，避免影响聊天主流程；
 * - 这里不做额外的过期策略，优先保证用户切页再回来仍能看到状态。
 */
export function readPersistedPendingReplyStateMap(
  companyId: string,
): ClientChatPendingReplyStateMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const storageKey = createPendingReplyStorageKey(companyId);
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) {
      return {};
    }

    const parsedValue = JSON.parse(rawValue) as unknown;
    if (
      !parsedValue ||
      typeof parsedValue !== "object" ||
      Array.isArray(parsedValue)
    ) {
      return {};
    }

    return sanitizePendingReplyStateMap(
      parsedValue as ClientChatPendingReplyStateMap,
    );
  } catch {
    return {};
  }
}

export function persistPendingReplyStateMap(
  companyId: string,
  pendingReplyStateMap: ClientChatPendingReplyStateMap,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const storageKey = createPendingReplyStorageKey(companyId);
  const normalizedStateMap =
    sanitizePendingReplyStateMap(pendingReplyStateMap);
  window.localStorage.setItem(storageKey, JSON.stringify(normalizedStateMap));
}

/**
 * 统一判断消息是否属于 Lucius / assistant 侧：
 * - 页面消息渲染与“回复完成”判定共用这套规则；
 * - 避免一边把消息渲染成 Lucius，另一边却识别不出已完成。
 */
export function isLuciusReplyMessage(message: ClientChatMessage): boolean {
  const messageRole = (message.message_role || "").trim().toLowerCase();
  return messageRole ? LUCIUS_REPLY_ROLE_CODES.has(messageRole) : false;
}

export function collectAssistantMessageIds(
  messages: ClientChatMessage[],
): string[] {
  return Array.from(
    new Set(
      messages
        .filter((message) => isLuciusReplyMessage(message))
        .map((message) => String(message.message_id || "").trim())
        .filter(Boolean),
    ),
  );
}

/**
 * 只要消息列表里出现了“发送前未见过的 assistant 消息”，
 * 就认为本轮 Lucius 回复已经落库并可展示给用户。
 */
export function hasPendingReplyCompleted(
  pendingReplyState: ClientChatPendingReplyState,
  messages: ClientChatMessage[],
): boolean {
  const knownAssistantMessageIdSet: Set<string> = new Set(
    pendingReplyState.knownAssistantMessageIds,
  );

  return collectAssistantMessageIds(messages).some(
    (messageId) => !knownAssistantMessageIdSet.has(messageId),
  );
}
