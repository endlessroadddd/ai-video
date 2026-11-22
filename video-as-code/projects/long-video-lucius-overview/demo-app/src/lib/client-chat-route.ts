export type ClientChatLocationTarget =
  | {
      to: "/chat";
    }
  | {
      to: "/chat/$sessionId";
      params: {
        sessionId: string;
      };
    };

/**
 * 把外部传入的 session 标识统一转换成聊天页路由目标：
 * - 空值 / 纯空白都视为“新会话页”；
 * - 非空 sessionId 一律落到详情路由，避免页面内再维护一套并行状态。
 */
export function getClientChatLocationTarget(
  sessionId: string | null | undefined,
): ClientChatLocationTarget {
  const normalizedSessionId = String(sessionId || "").trim();

  if (!normalizedSessionId) {
    return {
      to: "/chat",
    };
  }

  return {
    to: "/chat/$sessionId",
    params: {
      sessionId: normalizedSessionId,
    },
  };
}

/**
 * `chat` 根路由现在代表“新会话草稿页”：
 * - 只要 URL 里没有明确 sessionId，就认为当前是草稿态；
 * - 详情态完全由 `/chat/$sessionId` 承载。
 */
export function isClientChatDraftRoute(
  sessionId: string | null | undefined,
): boolean {
  return getClientChatLocationTarget(sessionId).to === "/chat";
}
