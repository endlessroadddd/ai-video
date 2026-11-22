import React from "react";
import {
  blinkOpacity,
  clamp01,
  floatProgress,
  mix,
  typeReveal
} from "../motion/primitives";
import {tokens} from "../theme/tokens";

export const MessageBubble: React.FC<{
  text: string;
  typingProgress: number;
  frame: number;
  meta?: string;
  idleProgress?: number;
  highlightProgress?: number;
  dockAnchorProgress?: number;
  style?: React.CSSProperties;
}> = ({
  text,
  typingProgress,
  frame,
  meta = "Lucius - replying with context",
  idleProgress = 0,
  highlightProgress = 0,
  dockAnchorProgress = 0,
  style
}) => {
  const typing = clamp01(typingProgress);
  const typed = typeReveal(text, Math.pow(typing, 0.86));
  const isTyping = typing < 0.999;
  const haloPulse = 0.14 + Math.abs(floatProgress(frame, 0.12, 70));
  const sweepX = mix(highlightProgress, -160, 760);

  return (
    <div
      style={{
        position: "relative",
        width: 720,
        borderRadius: tokens.radii.bubble,
        border: `1px solid ${tokens.colors.bubbleBorder}`,
        background: tokens.colors.bubbleBg,
        boxShadow: `0 12px 28px rgba(100,79,184,${mix(dockAnchorProgress, 0.05, 0.12)})`,
        padding: "22px 24px 20px",
        color: tokens.colors.bubbleText,
        overflow: "hidden",
        ...style
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 24,
          top: 26,
          width: 28,
          height: 56,
          borderRadius: 16,
          border: `1px solid rgba(100,79,184,${mix(dockAnchorProgress, 0, 0.28)})`,
          background: `linear-gradient(180deg, rgba(100,79,184,${mix(
            dockAnchorProgress,
            0,
            0.12
          )}), rgba(100,79,184,0))`,
          opacity: dockAnchorProgress,
          transform: `translateX(${mix(dockAnchorProgress, 10, 0)}px)`
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 13,
          fontWeight: 600,
          color: tokens.colors.primary,
          marginBottom: 14
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: tokens.colors.primary,
            boxShadow: `0 0 0 ${mix(idleProgress, 4, 8)}px rgba(100,79,184,${haloPulse})`,
            transform: `scale(${1 + idleProgress * 0.05})`
          }}
        />
        <span>{meta}</span>
        <span
          style={{
            marginLeft: "auto",
            width: mix(typing, 18, 54),
            height: 6,
            borderRadius: 999,
            background: "rgba(100,79,184,0.14)",
            overflow: "hidden"
          }}
        >
          <span
            style={{
              display: "block",
              width: `${Math.max(8, mix(typing, 18, 100))}%`,
              height: "100%",
              borderRadius: 999,
              background: "rgba(100,79,184,0.52)"
            }}
          />
        </span>
      </div>
      <div
        style={{
          position: "relative",
          fontSize: 33,
          lineHeight: 1.28,
          letterSpacing: "-0.04em",
          fontWeight: 600,
          color: tokens.colors.title,
          minHeight: 126
        }}
      >
        <div
          style={{
            opacity: Math.max(0, 0.17 - typing * 0.08),
            color: tokens.colors.bubbleText
          }}
        >
          {text}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            color: tokens.colors.title
          }}
        >
          {typed}
          {isTyping ? (
            <span
              style={{
                display: "inline-block",
                width: 14,
                marginLeft: 2,
                opacity: blinkOpacity(frame),
                color: tokens.colors.primary
              }}
            >
              |
            </span>
          ) : null}
        </div>
        <div
          style={{
            position: "absolute",
            top: -24,
            bottom: -24,
            width: 164,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.54) 50%, rgba(255,255,255,0.18) 60%, rgba(255,255,255,0) 100%)",
            transform: `translateX(${sweepX}px) skewX(-18deg)`,
            opacity: highlightProgress * 0.88,
            pointerEvents: "none"
          }}
        />
      </div>
    </div>
  );
};
