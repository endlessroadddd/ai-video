import { beforeEach, describe, expect, it } from "vitest";

import {
  buildClientChatRenderableMessageGroups,
  formatChatMessageTime,
} from "@/lib/client-chat-message-grouping";
import type { ClientChatMessage } from "@/lib/services/client-chat-api";
import { overwriteGetLocale } from "@/paraglide/runtime";

function createMessage(
  overrides: Partial<ClientChatMessage>,
): ClientChatMessage {
  return {
    message_id: "message-1",
    session_id: "session-1",
    ...overrides,
  };
}

describe("client-chat-message-grouping", () => {
  beforeEach(() => {
    overwriteGetLocale(() => "en");
  });

  it("当前登录用户消息在 user_id 命中时必须归类为 self", () => {
    const groups = buildClientChatRenderableMessageGroups({
      currentAuthUserId: "user-self",
      messages: [
        createMessage({
          message_id: "message-self",
          user_id: "user-self",
          username: "Kaikai",
        }),
      ],
    });

    expect(groups).toHaveLength(1);
    expect(groups[0]?.actorKind).toBe("self");
    expect(groups[0]?.senderKey).toBe("self");
  });

  it("optimistic message 即使没有服务端回写也必须归类为 self", () => {
    const groups = buildClientChatRenderableMessageGroups({
      currentAuthUserId: null,
      messages: [
        createMessage({
          message_id: "optimistic-123",
          username: "Me",
        }),
      ],
    });

    expect(groups[0]?.actorKind).toBe("self");
  });

  it("Lucius 消息必须稳定归类为 lucius", () => {
    const groups = buildClientChatRenderableMessageGroups({
      currentAuthUserId: "user-self",
      messages: [
        createMessage({
          message_id: "assistant-1",
          message_role: "assistant",
        }),
      ],
    });

    expect(groups[0]?.actorKind).toBe("lucius");
    expect(groups[0]?.senderKey).toBe("lucius");
  });

  it("相邻同 sender 的 participant 消息必须合并成一个 group", () => {
    const groups = buildClientChatRenderableMessageGroups({
      currentAuthUserId: "user-self",
      messages: [
        createMessage({
          message_id: "participant-1",
          user_id: "user-a",
          username: "Alice",
        }),
        createMessage({
          message_id: "participant-2",
          user_id: "user-a",
          username: "Alice",
        }),
      ],
    });

    expect(groups).toHaveLength(1);
    expect(groups[0]?.actorKind).toBe("participant");
    expect(groups[0]?.messages).toHaveLength(2);
  });

  it("相邻同 sender 的 Lucius 消息必须合并成一个 group", () => {
    const groups = buildClientChatRenderableMessageGroups({
      currentAuthUserId: "user-self",
      messages: [
        createMessage({
          message_id: "assistant-1",
          message_role: "assistant",
        }),
        createMessage({
          message_id: "assistant-2",
          message_role: "assistant",
        }),
      ],
    });

    expect(groups).toHaveLength(1);
    expect(groups[0]?.actorKind).toBe("lucius");
    expect(groups[0]?.messages).toHaveLength(2);
  });

  it("timestamp 缺失时必须回退 created_at", () => {
    const createdAt = "2026-03-19T09:08:00.000Z";
    const groups = buildClientChatRenderableMessageGroups({
      currentAuthUserId: "user-self",
      messages: [
        createMessage({
          message_id: "message-created-at",
          created_at: createdAt,
          timestamp: null,
          user_id: "user-a",
        }),
      ],
    });

    expect(groups[0]?.timeLabel).toBe(formatChatMessageTime(createdAt));
  });

  it("user_id 缺失的历史非 Lucius 消息必须归类为 participant", () => {
    const groups = buildClientChatRenderableMessageGroups({
      currentAuthUserId: "user-self",
      messages: [
        createMessage({
          message_id: "legacy-message",
          user_id: null,
          username: null,
          message_role: "staff",
        }),
      ],
    });

    expect(groups[0]?.actorKind).toBe("participant");
  });
});
