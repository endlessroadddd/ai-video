// @vitest-environment jsdom

import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ClientChatMessageListBody,
  type ClientChatFeedbackValue,
} from "@/components/chat/client-chat-message-list";
import { buildClientChatRenderableMessageGroups } from "@/lib/client-chat-message-grouping";
import type { ClientChatMessage } from "@/lib/services/client-chat-api";
import { m } from "@/paraglide/messages";
import { overwriteGetLocale } from "@/paraglide/runtime";

vi.mock("streamdown", () => ({
  Streamdown: (props: { children?: unknown }) => props.children,
}));

function createMessage(
  overrides: Partial<ClientChatMessage>,
): ClientChatMessage {
  return {
    message_id: "message-1",
    session_id: "session-1",
    ...overrides,
  };
}

type RenderMessageListBodyOptions = {
  currentAuthUserId?: string | null | undefined;
  currentSessionIsPendingReply?: boolean;
  feedbackByGroupId?: Record<string, ClientChatFeedbackValue>;
  messages: ClientChatMessage[];
  onCopyMessage?: (message: ClientChatMessage) => Promise<void>;
  onFeedbackChange?: (
    groupId: string,
    nextValue: Exclude<ClientChatFeedbackValue, null>,
  ) => void;
  onRegenerateGroup?: () => void;
};

function renderMessageListBody(options: RenderMessageListBodyOptions) {
  cleanup();
  overwriteGetLocale(() => "en");

  const {
    currentAuthUserId = "user-self",
    currentSessionIsPendingReply = false,
    feedbackByGroupId = {},
    messages,
    onCopyMessage = vi.fn().mockResolvedValue(undefined),
    onFeedbackChange = vi.fn(),
    onRegenerateGroup = vi.fn(),
  } = options;

  const groups = buildClientChatRenderableMessageGroups({
    currentAuthUserId,
    messages,
  });

  return render(
    <ClientChatMessageListBody
      groups={groups}
      feedbackByGroupId={feedbackByGroupId}
      currentSessionIsPendingReply={currentSessionIsPendingReply}
      onCopyMessage={onCopyMessage}
      onFeedbackChange={onFeedbackChange}
      onRegenerateGroup={onRegenerateGroup}
    />,
  );
}

describe("client-chat-message-list", () => {
  afterEach(() => {
    cleanup();
  });

  it("self message 不出现头像和用户名，只出现时间与右对齐 bubble", () => {
    const message = createMessage({
      message_id: "self-1",
      user_id: "user-self",
      content: "hello",
      timestamp: "2026-03-19T10:48:00.000Z",
    });
    const { container } = renderMessageListBody({
      messages: [message],
    });

    const selfGroup = container.querySelector(
      ".dashboard-chat-message-group--self",
    ) as HTMLElement | null;

    expect(selfGroup).not.toBeNull();
    expect(
      selfGroup?.querySelector(".dashboard-chat-message-avatar"),
    ).toBeNull();
    expect(
      selfGroup?.querySelector(".dashboard-chat-message-name"),
    ).toBeNull();
    expect(
      selfGroup?.querySelector(".dashboard-chat-message-time"),
    ).not.toBeNull();
    expect(selfGroup?.querySelector(".dashboard-chat-message-bubble")).not.toBeNull();
  });

  it("participant 连续两条消息只出现一次头像和头部", () => {
    const { container } = renderMessageListBody({
      messages: [
        createMessage({
          message_id: "participant-1",
          user_id: "user-a",
          username: "Alice",
          content: "first",
        }),
        createMessage({
          message_id: "participant-2",
          user_id: "user-a",
          username: "Alice",
          content: "second",
        }),
      ],
    });

    const participantGroup = container.querySelector(
      ".dashboard-chat-message-group--participant",
    ) as HTMLElement | null;

    expect(participantGroup?.querySelectorAll(".dashboard-chat-message-head")).toHaveLength(
      1,
    );
    expect(
      participantGroup?.querySelectorAll(".dashboard-chat-message-avatar"),
    ).toHaveLength(1);
  });

  it("Lucius group 渲染 hover 操作按钮 4 个", () => {
    const { container } = renderMessageListBody({
      messages: [
        createMessage({
          message_id: "assistant-1",
          message_role: "assistant",
          content: "Hi from Lucius",
        }),
      ],
    });

    const luciusGroup = container.querySelector(
      ".dashboard-chat-message-group--lucius",
    ) as HTMLElement | null;

    expect(
      luciusGroup?.querySelectorAll(".dashboard-chat-message-action-button"),
    ).toHaveLength(4);
  });

  it("点赞和点踩互斥", () => {
    const baseMessage = createMessage({
      message_id: "assistant-1",
      message_role: "assistant",
      content: "Hi from Lucius",
    });

    const firstRender = renderMessageListBody({
      feedbackByGroupId: { "lucius:lucius:assistant-1:0": "like" },
      messages: [baseMessage],
    });

    expect(
      firstRender.getByLabelText(m.client_chat_like_message()).getAttribute(
        "aria-pressed",
      ),
    ).toBe("true");
    expect(
      firstRender.getByLabelText(m.client_chat_dislike_message()).getAttribute(
        "aria-pressed",
      ),
    ).toBe("false");

    firstRender.rerender(
      <ClientChatMessageListBody
        groups={buildClientChatRenderableMessageGroups({
          currentAuthUserId: "user-self",
          messages: [baseMessage],
        })}
        feedbackByGroupId={{ "lucius:lucius:assistant-1:0": "dislike" }}
        currentSessionIsPendingReply={false}
        onCopyMessage={vi.fn().mockResolvedValue(undefined)}
        onFeedbackChange={vi.fn()}
        onRegenerateGroup={vi.fn()}
      />,
    );

    expect(
      firstRender
        .getByLabelText(m.client_chat_like_message())
        .getAttribute("aria-pressed"),
    ).toBe("false");
    expect(
      firstRender
        .getByLabelText(m.client_chat_dislike_message())
        .getAttribute("aria-pressed"),
    ).toBe("true");
  });

  it("纯图片消息不显示 copy 按钮", () => {
    const { queryByLabelText } = renderMessageListBody({
      messages: [
        createMessage({
          message_id: "participant-image",
          user_id: "user-a",
          username: "Alice",
          content: "",
          attachments_base64: [{ url: "https://example.com/image.png" }],
        }),
      ],
    });

    expect(queryByLabelText(m.client_chat_copy_message())).toBeNull();
  });

  it("pending reply 使用 Lucius 头部样式", () => {
    const { container, getByText } = renderMessageListBody({
      currentSessionIsPendingReply: true,
      messages: [
        createMessage({
          message_id: "participant-1",
          user_id: "user-a",
          username: "Alice",
          content: "hello",
        }),
      ],
    });

    const luciusGroups = container.querySelectorAll(
      ".dashboard-chat-message-group--lucius",
    );

    expect(luciusGroups).toHaveLength(1);
    expect(getByText(m.client_chat_lucius_name())).not.toBeNull();
    expect(getByText(m.client_chat_replying())).not.toBeNull();
  });

  it("copy 按钮点击时应把原始 message 交给回调", async () => {
    const onCopyMessage = vi.fn().mockResolvedValue(undefined);
    const targetMessage = createMessage({
      message_id: "self-1",
      user_id: "user-self",
      content: "copy me",
    });

    const { getByLabelText } = renderMessageListBody({
      messages: [targetMessage],
      onCopyMessage,
    });

    fireEvent.click(getByLabelText(m.client_chat_copy_message()));

    expect(onCopyMessage).toHaveBeenCalledWith(targetMessage);
  });
});
