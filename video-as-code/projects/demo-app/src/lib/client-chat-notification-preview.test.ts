import { describe, expect, it } from "vitest";

import { isLuciusReplyMessage } from "@/lib/client-chat-pending-reply";
import type { ClientChatMessage } from "@/lib/services/client-chat-api";

function createMessage(payload: {
  messageId: string;
  role: string;
  content: string;
}): ClientChatMessage {
  return {
    session_id: "session-1",
    message_id: payload.messageId,
    message_role: payload.role,
    content: payload.content,
  };
}

function resolveLatestUserMessage(
  messages: ClientChatMessage[],
): ClientChatMessage | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const candidateMessage = messages[index];
    if (!isLuciusReplyMessage(candidateMessage)) {
      return candidateMessage;
    }
  }

  return null;
}

describe("client-chat-notification-preview", () => {
  it("通知预览应取最近一条用户消息而不是第一条", () => {
    const messages: ClientChatMessage[] = [
      createMessage({
        messageId: "user-1",
        role: "staff",
        content: "第一条用户消息",
      }),
      createMessage({
        messageId: "assistant-1",
        role: "assistant",
        content: "第一条 Lucius 回复",
      }),
      createMessage({
        messageId: "user-2",
        role: "staff",
        content: "最新一条用户消息",
      }),
      createMessage({
        messageId: "assistant-2",
        role: "assistant",
        content: "最新 Lucius 回复",
      }),
    ];

    expect(resolveLatestUserMessage(messages)?.content).toBe(
      "最新一条用户消息",
    );
  });
});
