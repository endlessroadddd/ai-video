import type { ReactNode } from "react";

interface MessageCardProps {
  sender: string;
  senderTag?: string;
  body: ReactNode;
  time?: string;
  accent?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function MessageCard({ sender, senderTag, body, time, accent, className, style }: MessageCardProps) {
  return (
    <div
      className={["message-card", className].filter(Boolean).join(" ")}
      style={{
        padding: "clamp(14px, 1.4vw, 18px) clamp(16px, 1.8vw, 22px)",
        borderRadius: "var(--radius-card)",
        background: "var(--color-surface-strong)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-soft)",
        maxWidth: "min(560px, 90%)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
          flexWrap: "wrap",
        }}
      >
        <strong style={{ fontSize: "clamp(13px, 1.05vw, 15px)", fontWeight: 600 }}>{sender}</strong>
        {senderTag ? (
          <span
            style={{
              padding: "2px 6px",
              borderRadius: "4px",
              background: "rgba(88, 101, 242, 0.12)",
              color: accent || "var(--color-discord)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {senderTag}
          </span>
        ) : null}
        {time ? (
          <span style={{ marginLeft: "auto", color: "var(--color-muted)", fontSize: "11px" }}>{time}</span>
        ) : null}
      </div>
      <div
        style={{
          fontSize: "clamp(13px, 1.05vw, 15px)",
          lineHeight: 1.55,
          color: "var(--color-text)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {body}
      </div>
    </div>
  );
}
