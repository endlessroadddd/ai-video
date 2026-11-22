import type { ReactNode } from "react";

interface ReplyCardProps {
  sender: string;
  body: ReactNode;
  time?: string;
  accent?: string;
  highlightCode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ReplyCard({ sender, body, time, accent, highlightCode = true, className, style }: ReplyCardProps) {
  return (
    <div
      className={["reply-card", className].filter(Boolean).join(" ")}
      style={{
        padding: "clamp(14px, 1.4vw, 18px) clamp(16px, 1.8vw, 22px)",
        borderRadius: "var(--radius-card)",
        background: "var(--color-surface-strong)",
        borderLeft: `3px solid ${accent || "var(--color-brand)"}`,
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
        <strong style={{ fontSize: "clamp(13px, 1.05vw, 15px)", fontWeight: 600, color: accent || "var(--color-brand)" }}>
          {sender}
        </strong>
        {time ? (
          <span style={{ marginLeft: "auto", color: "var(--color-muted)", fontSize: "11px" }}>{time}</span>
        ) : null}
      </div>
      <div
        className={highlightCode ? "reply-card__body" : undefined}
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
