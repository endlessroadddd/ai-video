import type { CSSProperties } from "react";

import { AnimatedEmoji } from "../chat/animated-emoji";

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function typeSlice(text: string, progress: number) {
  return text.slice(0, Math.round(text.length * clamp01(progress)));
}

export type ChatBubbleProps = {
  align: "left" | "right";
  tone: "lucius" | "user" | "neutral";
  text: string;
  reveal: number;
  textProgress?: number;
  subdued?: boolean;
  compact?: boolean;
  emojiCodepoint?: string;
  reducedMotion?: boolean;
};

export function ChatBubble({
  align,
  tone,
  text,
  reveal,
  textProgress = 1,
  subdued = false,
  compact = false,
  emojiCodepoint,
  reducedMotion = false,
}: ChatBubbleProps) {
  if (reveal <= 0.01) {
    return null;
  }

  const typed = typeSlice(text, textProgress);
  const content = typed.length > 0 ? typed : " ";

  return (
    <div
      className={[
        "thread-bubble",
        `thread-bubble--${align}`,
        `thread-bubble--${tone}`,
        subdued ? "is-subdued" : "",
        compact ? "is-compact" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--bubble-enter-opacity": reveal.toFixed(3),
          "--bubble-enter-y": `${mix(22, 0, reveal)}px`,
          "--bubble-enter-scale": mix(0.97, 1, reveal).toFixed(3),
        } as CSSProperties
      }
    >
      <div className="thread-bubble__copy">
        {emojiCodepoint ? (
          <span className="thread-bubble__copy-inline">
            <span>{content}</span>
            <AnimatedEmoji
              codepoint={emojiCodepoint}
              size={18}
              className="thread-bubble__emoji"
              reducedMotion={reducedMotion}
            />
          </span>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
