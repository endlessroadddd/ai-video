import type { ReactElement } from "react";

import {
  buildChatRenderableMessageGroups,
  getAvatarFallbackText,
  type ChatActorKind,
  type ChatAttachment,
  type ChatMessage,
  type ChatRenderableMessageGroup,
} from "../../lib/chat";
import { joinClassNames } from "../../lib/utils";

type ChatMessageListProps = {
  className?: string;
  currentUserId?: string | null;
  luciusAvatarUrl?: string | null;
  luciusName?: string;
  messages: ReadonlyArray<ChatMessage>;
  participantFallbackName?: string;
  selfName?: string;
  showPendingReply?: boolean;
};

type ChatPendingReplyProps = {
  avatarUrl?: string | null;
  displayName?: string;
};

const DEFAULT_LUCIUS_NAME = "Lucius";

function ChatMessageAvatar(props: {
  actorKind: ChatActorKind;
  avatarUrl: string | null;
  displayName: string;
}): ReactElement {
  const { actorKind, avatarUrl, displayName } = props;

  if (avatarUrl) {
    return (
      <img
        alt={displayName}
        className="lucius-chat-message-avatar"
        loading="lazy"
        src={avatarUrl}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={joinClassNames(
        "lucius-chat-message-avatar lucius-chat-message-avatar--fallback",
        actorKind === "lucius" && "lucius-chat-message-avatar--lucius",
      )}
    >
      {actorKind === "lucius" ? "L" : getAvatarFallbackText(displayName)}
    </span>
  );
}

function ChatAttachmentImage(props: { attachment: ChatAttachment }): ReactElement {
  const { attachment } = props;

  return (
    <img
      alt={attachment.alt || "Attachment"}
      className="lucius-chat-message-attachment"
      loading="lazy"
      src={attachment.src}
    />
  );
}

function ChatMessageGroup(props: {
  group: ChatRenderableMessageGroup;
}): ReactElement {
  const { group } = props;
  const showHead = group.actorKind !== "self";

  return (
    <article
      className={joinClassNames(
        "lucius-chat-message-group",
        group.actorKind === "self" && "lucius-chat-message-group--self",
        group.actorKind === "participant" &&
          "lucius-chat-message-group--participant",
        group.actorKind === "lucius" && "lucius-chat-message-group--lucius",
      )}
      data-group-id={group.groupId}
    >
      {showHead ? (
        <div className="lucius-chat-message-head">
          <ChatMessageAvatar
            actorKind={group.actorKind}
            avatarUrl={group.avatarUrl}
            displayName={group.displayName}
          />

          <div className="lucius-chat-message-head-copy">
            <span className="lucius-chat-message-name">{group.displayName}</span>
            {group.timeLabel ? (
              <span className="lucius-chat-message-time">{group.timeLabel}</span>
            ) : null}
          </div>
        </div>
      ) : group.timeLabel ? (
        <div className="lucius-chat-message-head">
          <span className="lucius-chat-message-time">{group.timeLabel}</span>
        </div>
      ) : null}

      <div className="lucius-chat-message-stack">
        {group.messages.map((message, messageIndex) => {
          const content = String(message.content || "").trim();
          const isStreamingMessage = message.status === "streaming";

          if (group.actorKind === "lucius") {
            return (
              <div
                className="lucius-chat-message-rich-block"
                key={`${group.groupId}:${message.id}:${messageIndex}`}
              >
                {content ? (
                  isStreamingMessage ? (
                    <p className="lucius-chat-message-streaming-copy">{content}</p>
                  ) : (
                    <p className="lucius-chat-message-longform">{content}</p>
                  )
                ) : null}

                {message.attachments?.length ? (
                  <div className="lucius-chat-message-attachments">
                    {message.attachments.map((attachment, attachmentIndex) => (
                      <ChatAttachmentImage
                        attachment={attachment}
                        key={attachment.id || `${message.id}:${attachmentIndex}`}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          }

          return (
            <div
              className="lucius-chat-message-item"
              key={`${group.groupId}:${message.id}:${messageIndex}`}
            >
              <div
                className={joinClassNames(
                  "lucius-chat-message-bubble",
                  group.actorKind === "self"
                    ? "lucius-chat-message-bubble--self"
                    : "lucius-chat-message-bubble--participant",
                )}
              >
                {content ? (
                  <p className="lucius-chat-message-bubble-copy">{content}</p>
                ) : null}

                {message.attachments?.length ? (
                  <div className="lucius-chat-message-attachments">
                    {message.attachments.map((attachment, attachmentIndex) => (
                      <ChatAttachmentImage
                        attachment={attachment}
                        key={attachment.id || `${message.id}:${attachmentIndex}`}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export function ChatPendingReply(
  props: Readonly<ChatPendingReplyProps>,
): ReactElement {
  const { avatarUrl = null, displayName = DEFAULT_LUCIUS_NAME } = props;

  return (
    <article className="lucius-chat-message-group lucius-chat-message-group--lucius">
      <div className="lucius-chat-message-head">
        <ChatMessageAvatar
          actorKind="lucius"
          avatarUrl={avatarUrl}
          displayName={displayName}
        />

        <div className="lucius-chat-message-head-copy">
          <span className="lucius-chat-message-name">{displayName}</span>
        </div>
      </div>

      <div className="lucius-chat-message-stack">
        <div
          aria-live="polite"
          className="lucius-chat-pending-reply"
          role="status"
        >
          <div className="lucius-chat-pending-reply__header">
            <span className="lucius-chat-pending-reply__label">Replying</span>
          </div>

          <div aria-hidden="true" className="lucius-chat-pending-reply__dots">
            <span className="lucius-chat-pending-reply__dot" />
            <span className="lucius-chat-pending-reply__dot" />
            <span className="lucius-chat-pending-reply__dot" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function ChatMessageList(
  props: Readonly<ChatMessageListProps>,
): ReactElement {
  const {
    className,
    currentUserId,
    luciusAvatarUrl = null,
    luciusName = DEFAULT_LUCIUS_NAME,
    messages,
    participantFallbackName = "Teammate",
    selfName = "You",
    showPendingReply = false,
  } = props;
  const groups = buildChatRenderableMessageGroups({
    currentUserId,
    luciusAvatarUrl,
    luciusName,
    messages,
    participantFallbackName,
    selfName,
  });

  return (
    <div className={joinClassNames("lucius-chat-message-list", className)}>
      {groups.map((group) => (
        <ChatMessageGroup group={group} key={group.groupId} />
      ))}

      {showPendingReply ? (
        <ChatPendingReply avatarUrl={luciusAvatarUrl} displayName={luciusName} />
      ) : null}
    </div>
  );
}
