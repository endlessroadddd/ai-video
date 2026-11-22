import { describe, expect, it } from "vitest";

import {
  DEFAULT_CLIENT_CHAT_SUPPORT_RECORDING_SCENARIO,
  createClientChatCelebrationBubbleRaw,
  createClientChatFloatingEmojiRaw,
  createClientChatSupportHandoffCardRaw,
  getClientChatCelebrationBubbleMessageRaw,
  getClientChatFloatingEmojiMessageRaw,
  getClientChatSupportHandoffCardMessageRaw,
  isClientChatCelebrationBubbleMessage,
  isClientChatFloatingEmojiMessage,
  isClientChatSupportHandoffCardMessage,
} from "@/lib/client-chat-support-recording";
import type { ClientChatMessage } from "@/lib/services/client-chat-api";

function createMessage(overrides: Partial<ClientChatMessage>): ClientChatMessage {
  return {
    message_id: "message-1",
    session_id: "session-1",
    ...overrides,
  };
}

describe("client-chat-support-recording", () => {
  it("creates a valid support handoff card payload", () => {
    const raw = createClientChatSupportHandoffCardRaw({
      card: DEFAULT_CLIENT_CHAT_SUPPORT_RECORDING_SCENARIO.handoffCard,
      status: "reviewing",
    });

    expect(raw.type).toBe("support_handoff_card");
    expect(raw.status).toBe("reviewing");
    expect(raw.card.title).toBe(
      DEFAULT_CLIENT_CHAT_SUPPORT_RECORDING_SCENARIO.handoffCard.title,
    );
  });

  it("extracts support handoff card raw data from a chat message", () => {
    const message = createMessage({
      raw: createClientChatSupportHandoffCardRaw({
        card: DEFAULT_CLIENT_CHAT_SUPPORT_RECORDING_SCENARIO.handoffCard,
        status: "corrected",
      }),
    });

    expect(getClientChatSupportHandoffCardMessageRaw(message)?.status).toBe(
      "corrected",
    );
    expect(isClientChatSupportHandoffCardMessage(message)).toBe(true);
  });

  it("ignores malformed handoff payloads", () => {
    const message = createMessage({
      raw: {
        type: "support_handoff_card",
        status: "pending",
      },
    });

    expect(getClientChatSupportHandoffCardMessageRaw(message)).toBeNull();
    expect(isClientChatSupportHandoffCardMessage(message)).toBe(false);
  });

  it("creates a reusable celebration bubble payload", () => {
    const raw = createClientChatCelebrationBubbleRaw();

    expect(raw.type).toBe("celebration_bubble");
    expect(raw.variant).toBe("ribbon-firework");
    expect(raw.intensity).toBe("subtle");
  });

  it("extracts celebration bubble raw data from a chat message", () => {
    const message = createMessage({
      raw: createClientChatCelebrationBubbleRaw(),
    });

    expect(getClientChatCelebrationBubbleMessageRaw(message)?.variant).toBe(
      "ribbon-firework",
    );
    expect(isClientChatCelebrationBubbleMessage(message)).toBe(true);
  });

  it("ignores malformed celebration payloads", () => {
    const message = createMessage({
      raw: {
        type: "celebration_bubble",
        intensity: "loud",
        variant: "confetti",
      },
    });

    expect(getClientChatCelebrationBubbleMessageRaw(message)).toBeNull();
    expect(isClientChatCelebrationBubbleMessage(message)).toBe(false);
  });

  it("creates a reusable floating emoji payload", () => {
    const raw = createClientChatFloatingEmojiRaw({
      delayMs: 240,
      emoji: "thumbs-up",
      size: "sm",
    });

    expect(raw.type).toBe("floating_emoji");
    expect(raw.emoji).toBe("thumbs-up");
    expect(raw.anchor).toBe("end");
    expect(raw.size).toBe("sm");
    expect(raw.delayMs).toBe(240);
  });

  it("extracts floating emoji raw data from a direct chat message payload", () => {
    const message = createMessage({
      raw: createClientChatFloatingEmojiRaw({
        delayMs: 180,
        emoji: "frustrated",
      }),
    });

    expect(getClientChatFloatingEmojiMessageRaw(message)?.emoji).toBe(
      "frustrated",
    );
    expect(isClientChatFloatingEmojiMessage(message)).toBe(true);
  });

  it("extracts nested floating emoji raw data from a celebration bubble payload", () => {
    const message = createMessage({
      raw: createClientChatCelebrationBubbleRaw({
        floatingEmoji: createClientChatFloatingEmojiRaw({
          delayMs: 300,
          emoji: "party-popper",
          size: "md",
        }),
      }),
    });

    expect(getClientChatFloatingEmojiMessageRaw(message)?.emoji).toBe(
      "party-popper",
    );
    expect(isClientChatFloatingEmojiMessage(message)).toBe(true);
  });

  it("ignores malformed floating emoji payloads", () => {
    const message = createMessage({
      raw: {
        type: "floating_emoji",
        anchor: "middle",
        delayMs: 120,
        emoji: "rocket",
        size: "xl",
      },
    });

    expect(getClientChatFloatingEmojiMessageRaw(message)).toBeNull();
    expect(isClientChatFloatingEmojiMessage(message)).toBe(false);
  });
});
