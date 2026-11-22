import type { CSSProperties } from "react";
import { DiscordAvatar } from "./DiscordAvatar";
import { clamp, easeOutQuint, progressBetween } from "../lib/easing";

export interface ChannelMessageProps {
  author: string;
  body: string;
  meta: string;
  currentMs: number;
  enterMs: number;
  badge?: string;
  variant?: "normal" | "spam" | "highlighted" | "bypass";
}

export default function ChannelMessage(props: Readonly<ChannelMessageProps>) {
  const { author, badge, body, currentMs, enterMs, meta, variant = "normal" } = props;
  const reveal = easeOutQuint(progressBetween(currentMs, enterMs + 60, enterMs + 460));
  const translateY = (1 - reveal) * 24;
  const scale = 0.975 + reveal * 0.025;
  const emphasis = clamp(progressBetween(currentMs, enterMs + 180, enterMs + 620), 0, 1);

  return (
    <article
      className={[
        "message-row",
        variant !== "normal" ? `is-${variant}` : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        opacity: reveal,
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        "--message-emphasis": emphasis.toFixed(3),
      } as CSSProperties}
    >
      <div className="message-avatar">
        <DiscordAvatar name={author} size={40} status={variant === "normal" ? "online" : "dnd"} />
      </div>

      <div className="message-card">
        <div className="message-header">
          <span className="message-author">{author}</span>
          {badge ? <span className="message-badge">{badge}</span> : null}
          <span className="message-meta">{meta}</span>
        </div>
        <p className="message-body">{body}</p>
      </div>
    </article>
  );
}
