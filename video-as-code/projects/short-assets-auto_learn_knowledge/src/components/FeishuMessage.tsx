import { FeishuCard, type CardData } from "./FeishuCard";
import { Avatar, type Participant } from "./TypingIndicator";

export type MessageData = {
  id: string;
  sender: string;
  type: "text" | "card" | "system";
  text?: string;
  card?: CardData;
  time?: string;
  showAt: number;
  cardGlow?: boolean;
};

export function FeishuMessage({
  msg,
  participant,
  opacity,
  translateY,
  onCardAction,
}: {
  msg: MessageData;
  participant: Participant;
  opacity: number;
  translateY: number;
  onCardAction?: (action: string) => void;
}) {
  if (msg.type === "system") {
    return (
      <div
        className="feishu-sys-msg"
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        {msg.text}
      </div>
    );
  }

  const isBot = participant.isBot;

  return (
    <div
      className="feishu-msg-group"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <Avatar participant={participant} />
      <div className="feishu-msg-body">
        <div className="feishu-msg-meta">
          <span className={`feishu-msg-sender${isBot ? " bot" : ""}`}>
            {participant.name}
          </span>
          <span className="feishu-msg-time">{msg.time || ""}</span>
        </div>
        {msg.type === "card" && msg.card ? (
          <FeishuCard card={msg.card} glowing={msg.cardGlow} onActionClick={onCardAction} />
        ) : (
          <div
            className="feishu-msg-text"
            dangerouslySetInnerHTML={{
              __html: escapeAndMention(msg.text || ""),
            }}
          />
        )}
      </div>
    </div>
  );
}

function escapeAndMention(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /@(\w+)/g,
      '<span class="feishu-mention">@$1</span>',
    );
}
