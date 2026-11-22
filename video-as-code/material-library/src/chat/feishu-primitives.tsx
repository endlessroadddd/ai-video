import type { CSSProperties } from "react";

export type FeishuCardField = {
  isQuote?: boolean;
  label: string;
  value: string;
};

export type FeishuCardData = {
  actions?: string[];
  badge?: string;
  fields: FeishuCardField[];
  headerColor: string;
  title: string;
};

export type FeishuParticipant = {
  avatarBg?: string;
  avatarInitials?: string;
  avatarSrc?: string;
  avatarType: "image" | "initials";
  color?: string;
  isBot?: boolean;
  name: string;
};

export type FeishuMessageData = {
  card?: FeishuCardData;
  cardGlow?: boolean;
  id: string;
  sender: string;
  showAt?: number;
  text?: string;
  time?: string;
  type: "text" | "card" | "system";
};

function escapeAndMention(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/@(\w+)/g, '<span class="feishu-mention">@$1</span>');
}

export function FeishuAvatar({
  participant,
}: {
  participant: FeishuParticipant;
}) {
  if (participant.avatarType === "image" && participant.avatarSrc) {
    return (
      <div
        className="feishu-msg-av"
        style={{ background: participant.avatarBg || "#eee" }}
      >
        <img src={participant.avatarSrc} alt={participant.name} />
      </div>
    );
  }

  return (
    <div
      className="feishu-msg-av"
      style={{ background: participant.color || "#646a73" }}
    >
      {participant.avatarInitials || participant.name.charAt(0)}
    </div>
  );
}

export function FeishuTypingIndicator({
  participant,
}: {
  participant: FeishuParticipant;
}) {
  return (
    <div className="feishu-typing-row">
      <FeishuAvatar participant={participant} />
      <div className="feishu-typing-body">
        <div className="feishu-typing-name">{participant.name}</div>
        <div className="feishu-typing-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export function FeishuReaction({
  count,
  emoji,
  opacity = 1,
  scale = 1,
}: {
  count: number;
  emoji: string;
  opacity?: number;
  scale?: number;
}) {
  return (
    <div
      className="feishu-reaction"
      style={{
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <span className="feishu-reaction-emoji">{emoji}</span>
      <span className="feishu-reaction-count">{count}</span>
    </div>
  );
}

export function FeishuCard({
  card,
  glowing = false,
  onActionClick,
}: {
  card: FeishuCardData;
  glowing?: boolean;
  onActionClick?: (action: string) => void;
}) {
  return (
    <div className={`feishu-bot-card${glowing ? " feishu-bot-card--glow" : ""}`}>
      <div
        className="feishu-bot-card-hd"
        style={{ borderLeft: `4px solid ${card.headerColor}` }}
      >
        <span className="feishu-bot-card-hd-title">{card.title}</span>
        {card.badge ? (
          <span className="feishu-bot-card-badge">{card.badge}</span>
        ) : null}
      </div>

      <div className="feishu-bot-card-body">
        {card.fields.map((field, index) => (
          <div className="feishu-card-field" key={`${field.label}-${index}`}>
            <span className="feishu-card-flabel">{field.label}</span>
            {field.isQuote ? (
              <div className="feishu-card-fquote">{field.value}</div>
            ) : (
              <div
                className="feishu-card-fval"
                dangerouslySetInnerHTML={{
                  __html: escapeAndMention(field.value),
                }}
              />
            )}
          </div>
        ))}
      </div>

      {card.actions?.length ? (
        <div className="feishu-bot-card-actions">
          {card.actions.map((action) => (
            <div
              className="feishu-card-act"
              key={action}
              onClick={() => onActionClick?.(action)}
              style={{ cursor: onActionClick ? "pointer" : undefined } as CSSProperties}
            >
              {action}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function FeishuMessage({
  msg,
  onCardAction,
  opacity,
  participant,
  translateY,
}: {
  msg: FeishuMessageData;
  onCardAction?: (action: string) => void;
  opacity: number;
  participant: FeishuParticipant;
  translateY: number;
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

  return (
    <div
      className="feishu-msg-group"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <FeishuAvatar participant={participant} />
      <div className="feishu-msg-body">
        <div className="feishu-msg-meta">
          <span className={`feishu-msg-sender${participant.isBot ? " bot" : ""}`}>
            {participant.name}
          </span>
          <span className="feishu-msg-time">{msg.time || ""}</span>
        </div>

        {msg.type === "card" && msg.card ? (
          <FeishuCard
            card={msg.card}
            glowing={msg.cardGlow}
            onActionClick={onCardAction}
          />
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
