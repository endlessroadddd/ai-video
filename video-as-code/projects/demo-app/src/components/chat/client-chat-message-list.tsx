import {
  Copy,
  Loader2,
  RefreshCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import {
  buildClientChatRenderableMessageGroups,
  type ClientChatActorKind,
  type ClientChatRenderableMessageGroup,
} from "@/lib/client-chat-message-grouping";
import { writeTextToClipboard } from "@/lib/clipboard";
import type {
  ClientChatMessage,
  ClientChatMessageAttachment,
} from "@/lib/services/client-chat-api";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

const LUCIUS_AVATAR_URL = "/figma-auth/Logo%20Mark_black.svg";

type ClientChatMarkdownRenderer = (
  props: Readonly<{ children: ReactNode; className?: string }>,
) => ReactElement;

let clientChatMarkdownRendererPromise:
  | Promise<ClientChatMarkdownRenderer>
  | null = null;

function loadClientChatMarkdownRenderer(): Promise<ClientChatMarkdownRenderer> {
  if (!clientChatMarkdownRendererPromise) {
    clientChatMarkdownRendererPromise = import("streamdown").then(
      (module) => module.Streamdown as ClientChatMarkdownRenderer,
    );
  }

  return clientChatMarkdownRendererPromise;
}

type ClientChatMessageListProps = {
  currentAuthUserId: string | null | undefined;
  currentSessionIsPendingReply: boolean;
  messages: ClientChatMessage[];
};

export type ClientChatFeedbackValue = "like" | "dislike" | null;

type ClientChatMessageListBodyProps = {
  currentSessionIsPendingReply: boolean;
  feedbackByGroupId: Record<string, ClientChatFeedbackValue>;
  groups: ClientChatRenderableMessageGroup[];
  onCopyMessage: (message: ClientChatMessage) => Promise<void>;
  onFeedbackChange: (
    groupId: string,
    nextValue: Exclude<ClientChatFeedbackValue, null>,
  ) => void;
  onRegenerateGroup: (group: ClientChatRenderableMessageGroup) => void;
};

type ClientChatMessageGroupProps = {
  feedbackValue: ClientChatFeedbackValue;
  group: ClientChatRenderableMessageGroup;
  onCopyMessage: (message: ClientChatMessage) => Promise<void>;
  onFeedbackChange: (
    groupId: string,
    nextValue: Exclude<ClientChatFeedbackValue, null>,
  ) => void;
  onRegenerate: () => void;
};

type ClientChatMessageAvatarProps = {
  actorKind: ClientChatActorKind;
  avatarUrl: string | null;
  displayName: string;
};

function getClientChatAttachmentImageDataUrl(
  attachment: ClientChatMessageAttachment,
): string | null {
  const base64: string = String(attachment.base64 || "").trim();
  if (!base64) {
    const directUrl: string = String(attachment.url || "").trim();
    return directUrl || null;
  }

  const contentType: string =
    String(attachment.content_type || "image/png").trim() || "image/png";
  return `data:${contentType};base64,${base64}`;
}

function getClientChatDeduplicatedAttachmentImages(
  attachments: ClientChatMessageAttachment[] | null | undefined,
): Array<{ attachment: ClientChatMessageAttachment; imageDataUrl: string }> {
  if (!attachments || attachments.length === 0) {
    return [];
  }

  const seenKeys: Set<string> = new Set();

  return attachments.flatMap((attachment) => {
    const imageDataUrl: string | null =
      getClientChatAttachmentImageDataUrl(attachment);
    if (!imageDataUrl) {
      return [];
    }

    const normalizedUrl: string = String(attachment.url || "").trim();
    const dedupeKey: string = normalizedUrl
      ? `url:${normalizedUrl}`
      : `data:${imageDataUrl}`;

    if (seenKeys.has(dedupeKey)) {
      return [];
    }

    seenKeys.add(dedupeKey);
    return [{ attachment, imageDataUrl }];
  });
}

function getAvatarFallbackText(displayName: string): string {
  const normalizedName: string = displayName.trim();
  if (!normalizedName) {
    return "U";
  }

  const nameParts: string[] = normalizedName.split(/\s+/).filter(Boolean);
  if (nameParts.length >= 2) {
    return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
  }

  return Array.from(normalizedName).slice(0, 2).join("").toUpperCase();
}

function hasCopyableMessageContent(message: ClientChatMessage): boolean {
  const content: string = String(message.content || "").trim();
  if (!content) {
    return false;
  }

  return content !== m.client_chat_preview_image();
}

function ClientChatMarkdownMessage(props: {
  content: string;
}): ReactElement {
  const { content } = props;
  const [MarkdownRenderer, setMarkdownRenderer] =
    useState<ClientChatMarkdownRenderer | null>(null);

  useEffect(() => {
    let isCancelled = false;

    void loadClientChatMarkdownRenderer().then((renderer) => {
      if (!isCancelled) {
        setMarkdownRenderer(() => renderer);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  if (!MarkdownRenderer) {
    return <p className="dashboard-chat-message-streaming-copy">{content}</p>;
  }

  return (
    <MarkdownRenderer className="dashboard-chat-markdown">
      {content}
    </MarkdownRenderer>
  );
}

function ClientChatMessageAvatar(
  props: ClientChatMessageAvatarProps,
): ReactElement {
  const { actorKind, avatarUrl, displayName } = props;

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={displayName}
        className="dashboard-chat-message-avatar"
        loading="lazy"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "dashboard-chat-message-avatar dashboard-chat-message-avatar--fallback",
        actorKind === "lucius" && "dashboard-chat-message-avatar--lucius",
      )}
    >
      {actorKind === "lucius" ? "L" : getAvatarFallbackText(displayName)}
    </span>
  );
}

function ClientChatMessageActions(props: {
  align: "left" | "right";
  children: ReactNode;
}): ReactElement {
  const { align, children } = props;

  return (
    <div
      className={cn(
        "dashboard-chat-message-actions",
        align === "right" && "dashboard-chat-message-actions--right",
      )}
    >
      {children}
    </div>
  );
}

function ClientChatCopyAction(props: {
  message: ClientChatMessage;
  onCopyMessage: (message: ClientChatMessage) => Promise<void>;
}): ReactElement | null {
  const { message, onCopyMessage } = props;

  if (!hasCopyableMessageContent(message)) {
    return null;
  }

  return (
    <button
      type="button"
      className="dashboard-chat-message-action-button"
      title={m.client_chat_copy_message()}
      aria-label={m.client_chat_copy_message()}
      onClick={() => {
        void onCopyMessage(message);
      }}
    >
      <Copy className="h-4 w-4" />
    </button>
  );
}

function renderMessageAttachments(
  message: ClientChatMessage,
  className?: string,
): ReactElement | null {
  const attachmentImages = getClientChatDeduplicatedAttachmentImages(
    message.attachments_base64,
  );

  if (attachmentImages.length === 0) {
    return null;
  }

  return (
    <div className={cn("grid gap-3", className)}>
      {attachmentImages.map((item, index) => (
        <img
          key={`${message.message_id}-attachment-image-${index}`}
          src={item.imageDataUrl}
          alt={m.client_chat_attachment_alt()}
          className="dashboard-chat-message-attachment"
          loading="lazy"
        />
      ))}
    </div>
  );
}

function ClientChatMessageGroup(
  props: ClientChatMessageGroupProps,
): ReactElement {
  const {
    feedbackValue,
    group,
    onCopyMessage,
    onFeedbackChange,
    onRegenerate,
  } = props;
  const showHead: boolean = group.actorKind !== "self";
  const luciusActionMessage: ClientChatMessage | null =
    group.actorKind === "lucius"
      ? group.messages[group.messages.length - 1] || null
      : null;

  return (
    <article
      className={cn(
        "dashboard-chat-message-group",
        group.actorKind === "self" && "dashboard-chat-message-group--self",
        group.actorKind === "participant" &&
          "dashboard-chat-message-group--participant",
        group.actorKind === "lucius" && "dashboard-chat-message-group--lucius",
      )}
      data-group-id={group.groupId}
    >
      {showHead ? (
        <div className="dashboard-chat-message-head">
          <ClientChatMessageAvatar
            actorKind={group.actorKind}
            avatarUrl={group.avatarUrl}
            displayName={group.displayName}
          />

          <div className="dashboard-chat-message-head-copy">
            <span className="dashboard-chat-message-name">
              {group.displayName}
            </span>

            {group.timeLabel ? (
              <span className="dashboard-chat-message-time">
                {group.timeLabel}
              </span>
            ) : null}
          </div>
        </div>
      ) : group.timeLabel ? (
        <div className="dashboard-chat-message-head">
          <span className="dashboard-chat-message-time">{group.timeLabel}</span>
        </div>
      ) : null}

      <div className="dashboard-chat-message-stack">
        {group.actorKind === "lucius"
          ? group.messages.map((message, messageIndex) => {
              const messageContent: string = String(message.content || "").trim();
              const isStreamingMessage: boolean =
                String(message.message_status || "").trim() === "streaming";
              const isActionAnchor: boolean =
                messageIndex === group.messages.length - 1;

              return (
                <div
                  key={`${group.groupId}:${message.message_id}:${messageIndex}`}
                  className="dashboard-chat-message-rich-block"
                >
                  {messageContent ? (
                    isStreamingMessage ? (
                      <p className="dashboard-chat-message-streaming-copy">
                        {messageContent}
                      </p>
                    ) : (
                      <ClientChatMarkdownMessage content={messageContent} />
                    )
                  ) : null}

                  {renderMessageAttachments(
                    message,
                    messageContent ? "mt-4" : undefined,
                  )}

                  {isActionAnchor && luciusActionMessage && !isStreamingMessage ? (
                    <ClientChatMessageActions align="left">
                      <ClientChatCopyAction
                        message={luciusActionMessage}
                        onCopyMessage={onCopyMessage}
                      />

                      <button
                        type="button"
                        className={cn(
                          "dashboard-chat-message-action-button",
                          feedbackValue === "like" &&
                            "dashboard-chat-message-action-button--active",
                        )}
                        title={m.client_chat_like_message()}
                        aria-label={m.client_chat_like_message()}
                        aria-pressed={feedbackValue === "like"}
                        onClick={() => {
                          onFeedbackChange(group.groupId, "like");
                        }}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        className={cn(
                          "dashboard-chat-message-action-button",
                          feedbackValue === "dislike" &&
                            "dashboard-chat-message-action-button--active",
                        )}
                        title={m.client_chat_dislike_message()}
                        aria-label={m.client_chat_dislike_message()}
                        aria-pressed={feedbackValue === "dislike"}
                        onClick={() => {
                          onFeedbackChange(group.groupId, "dislike");
                        }}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        className="dashboard-chat-message-action-button"
                        title={m.client_chat_regenerate_message()}
                        aria-label={m.client_chat_regenerate_message()}
                        onClick={onRegenerate}
                      >
                        <RefreshCcw className="h-4 w-4" />
                      </button>
                    </ClientChatMessageActions>
                  ) : null}
                </div>
              );
            })
          : group.messages.map((message, messageIndex) => {
              const messageContent: string = String(message.content || "").trim();
              const bubbleModifierClassName: string =
                group.actorKind === "self"
                  ? "dashboard-chat-message-bubble--self"
                  : "dashboard-chat-message-bubble--participant";

              return (
                <div
                  key={`${group.groupId}:${message.message_id}:${messageIndex}`}
                  className="dashboard-chat-message-item"
                >
                  <div
                    className={cn(
                      "dashboard-chat-message-bubble",
                      bubbleModifierClassName,
                    )}
                  >
                    {messageContent ? (
                      <p className="dashboard-chat-message-bubble-copy">
                        {messageContent}
                      </p>
                    ) : null}

                    {renderMessageAttachments(
                      message,
                      messageContent ? "mt-3" : undefined,
                    )}
                  </div>

                  <ClientChatMessageActions
                    align={group.actorKind === "self" ? "right" : "left"}
                  >
                    <ClientChatCopyAction
                      message={message}
                      onCopyMessage={onCopyMessage}
                    />
                  </ClientChatMessageActions>
                </div>
              );
            })}
      </div>
    </article>
  );
}

export function ClientChatPendingReplyMessage(): ReactElement {
  return (
    <article className="dashboard-chat-message-group dashboard-chat-message-group--lucius">
      <div className="dashboard-chat-message-head">
        <ClientChatMessageAvatar
          actorKind="lucius"
          avatarUrl={LUCIUS_AVATAR_URL}
          displayName={m.client_chat_lucius_name()}
        />

        <div className="dashboard-chat-message-head-copy">
          <span className="dashboard-chat-message-name">
            {m.client_chat_lucius_name()}
          </span>
        </div>
      </div>

      <div className="dashboard-chat-message-stack">
        <div
          className="dashboard-chat-pending-reply"
          role="status"
          aria-live="polite"
        >
          <div className="dashboard-chat-pending-reply-header">
            <span className="dashboard-chat-pending-reply-spinner">
              <Loader2 className="h-4 w-4 animate-spin" />
            </span>
            <span className="dashboard-chat-pending-reply-label">
              {m.client_chat_replying()}
            </span>
          </div>

          <div className="dashboard-chat-pending-reply-dots" aria-hidden="true">
            <span className="dashboard-chat-pending-reply-dot" />
            <span className="dashboard-chat-pending-reply-dot" />
            <span className="dashboard-chat-pending-reply-dot" />
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * 页面只负责把消息数组与当前用户 ID 交给组件；
 * 具体分组、复制与 Lucius 占位交互都在这里收口。
 */
export function ClientChatMessageListBody(
  props: ClientChatMessageListBodyProps,
): ReactElement {
  const {
    currentSessionIsPendingReply,
    feedbackByGroupId,
    groups,
    onCopyMessage,
    onFeedbackChange,
    onRegenerateGroup,
  } = props;

  return (
    <>
      {groups.map((group) => (
        <ClientChatMessageGroup
          key={group.groupId}
          group={group}
          feedbackValue={feedbackByGroupId[group.groupId] || null}
          onCopyMessage={onCopyMessage}
          onFeedbackChange={onFeedbackChange}
          onRegenerate={() => {
            onRegenerateGroup(group);
          }}
        />
      ))}

      {currentSessionIsPendingReply ? <ClientChatPendingReplyMessage /> : null}
    </>
  );
}

export function ClientChatMessageList(
  props: ClientChatMessageListProps,
): ReactElement {
  const { currentAuthUserId, currentSessionIsPendingReply, messages } = props;
  const [feedbackByGroupId, setFeedbackByGroupId] = useState<
    Record<string, ClientChatFeedbackValue>
  >({});

  const renderableGroups: ClientChatRenderableMessageGroup[] = useMemo(() => {
    return buildClientChatRenderableMessageGroups({
      currentAuthUserId,
      luciusAvatarUrl: LUCIUS_AVATAR_URL,
      messages,
    });
  }, [currentAuthUserId, messages]);

  const activeSessionId: string = String(messages[0]?.session_id || "").trim();

  useEffect(() => {
    setFeedbackByGroupId({});
  }, [activeSessionId]);

  const handleCopyMessage = async (
    message: ClientChatMessage,
  ): Promise<void> => {
    const normalizedContent: string = String(message.content || "").trim();
    if (!normalizedContent) {
      return;
    }

    try {
      await writeTextToClipboard(normalizedContent);
      toast.success(m.client_chat_copy_success());
    } catch {
      toast.error(m.client_chat_copy_failed());
    }
  };

  const handleFeedbackChange = (
    groupId: string,
    nextValue: Exclude<ClientChatFeedbackValue, null>,
  ): void => {
    setFeedbackByGroupId((previousState) => {
      const currentValue: ClientChatFeedbackValue =
        previousState[groupId] || null;

      return {
        ...previousState,
        [groupId]: currentValue === nextValue ? null : nextValue,
      };
    });
  };

  return (
    <ClientChatMessageListBody
      groups={renderableGroups}
      feedbackByGroupId={feedbackByGroupId}
      currentSessionIsPendingReply={currentSessionIsPendingReply}
      onCopyMessage={handleCopyMessage}
      onFeedbackChange={handleFeedbackChange}
      onRegenerateGroup={() => {
        toast(m.common_coming_soon());
      }}
    />
  );
}
