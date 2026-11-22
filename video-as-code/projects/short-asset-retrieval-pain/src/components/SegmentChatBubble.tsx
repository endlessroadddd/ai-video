import type { ReactNode } from "react";
import { SegmentAvatar } from "./SegmentAvatar";

type SegmentChatBubbleProps = {
  align: "left" | "right";
  author: string;
  avatarFallback: string;
  avatarSrc?: string;
  children: ReactNode;
  emphasis?: "default" | "error" | "reaction";
  timestamp?: string;
};

export function SegmentChatBubble(props: SegmentChatBubbleProps) {
  const {
    align,
    author,
    avatarFallback,
    avatarSrc,
    children,
    emphasis = "default",
    timestamp = "Now",
  } = props;
  const isAi = align === "left";

  return (
    <article className={`segment-chat-message segment-chat-message--${align}`}>
      {isAi ? (
        <SegmentAvatar fallback={avatarFallback} kind="ai" src={avatarSrc} />
      ) : null}

      <div className="segment-chat-message__body">
        <div className="segment-chat-message__head">
          <span className="segment-chat-message__name">{author}</span>
          <span className="segment-chat-message__time">{timestamp}</span>
        </div>

        <div className={`segment-chat-bubble segment-chat-bubble--${align} segment-chat-bubble--${emphasis}`}>
          {children}
        </div>
      </div>

      {!isAi ? (
        <SegmentAvatar fallback={avatarFallback} kind="user" src={avatarSrc} />
      ) : null}
    </article>
  );
}
