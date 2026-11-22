import { describe, expect, it } from "vitest";

import {
  collectAssistantMessageIds,
  createPendingReplyStorageKey,
  hasPendingReplyCompleted,
  isLuciusReplyMessage,
  sanitizePendingReplyStateMap,
} from "@/lib/client-chat-pending-reply";
import type { ClientChatMessage } from "@/lib/services/client-chat-api";

function createMessage(payload: {
  messageId: string;
  role: string;
}): ClientChatMessage {
  return {
    session_id: "session-1",
    message_id: payload.messageId,
    message_role: payload.role,
  };
}

describe("client-chat-pending-reply", () => {
  it("应生成公司维度隔离的本地存储 key", () => {
    expect(createPendingReplyStorageKey("company-1")).toBe(
      "client-chat:pending-reply:v1:company-1",
    );
  });

  it("应识别 Lucius 角色并去重收集 assistant 消息 id", () => {
    const messages: ClientChatMessage[] = [
      createMessage({ messageId: "assistant-1", role: "assistant" }),
      createMessage({ messageId: "assistant-1", role: "assistant" }),
      createMessage({ messageId: "bot-1", role: "bot" }),
      createMessage({ messageId: "user-1", role: "staff" }),
    ];

    expect(isLuciusReplyMessage(messages[0])).toBe(true);
    expect(isLuciusReplyMessage(messages[3])).toBe(false);
    expect(collectAssistantMessageIds(messages)).toEqual([
      "assistant-1",
      "bot-1",
    ]);
  });

  it("出现新的 assistant 消息后应判定为回复完成", () => {
    const messages: ClientChatMessage[] = [
      createMessage({ messageId: "assistant-old", role: "assistant" }),
      createMessage({ messageId: "assistant-new", role: "lucius" }),
    ];

    expect(
      hasPendingReplyCompleted(
        {
          knownAssistantMessageIds: ["assistant-old"],
          startedAt: "2026-03-13T00:00:00.000Z",
        },
        messages,
      ),
    ).toBe(true);
  });

  it("没有出现新 assistant 消息时不应提前清理 pending 状态", () => {
    const messages: ClientChatMessage[] = [
      createMessage({ messageId: "assistant-old", role: "assistant" }),
      createMessage({ messageId: "user-1", role: "staff" }),
    ];

    expect(
      hasPendingReplyCompleted(
        {
          knownAssistantMessageIds: ["assistant-old"],
          startedAt: "2026-03-13T00:00:00.000Z",
        },
        messages,
      ),
    ).toBe(false);
  });

  it("应清理空 sessionId 与非法状态字段", () => {
    expect(
      sanitizePendingReplyStateMap({
        "": {
          knownAssistantMessageIds: ["assistant-1"],
          startedAt: "2026-03-13T00:00:00.000Z",
        },
        "  session-1  ": {
          knownAssistantMessageIds: ["assistant-1", "assistant-1", "  "],
          startedAt: " 2026-03-13T00:00:00.000Z ",
        },
        "session-2": {
          knownAssistantMessageIds: [],
          startedAt: "",
        },
      }),
    ).toEqual({
      "session-1": {
        knownAssistantMessageIds: ["assistant-1"],
        startedAt: "2026-03-13T00:00:00.000Z",
      },
    });
  });
});
