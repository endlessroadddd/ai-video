import React from "react";
import {
  clamp01,
  mix,
  mixColor,
  staggerProgress,
  windowProgress
} from "../motion/primitives";
import {tokens} from "../theme/tokens";
import {Panel} from "./Panel";
import {BadgeVariant, StatusBadge} from "./StatusBadge";

export const FollowupCard: React.FC<{
  title: string;
  description: string;
  tags: string[];
  statusLabel: string;
  resolvedStatusLabel?: string;
  statusVariant?: BadgeVariant;
  resolvedStatusVariant?: BadgeVariant;
  buttonLabel: string;
  compactProgress?: number;
  expandProgress?: number;
  ctaSweepProgress?: number;
  queueProgress?: number;
  style?: React.CSSProperties;
}> = ({
  title,
  description,
  tags,
  statusLabel,
  resolvedStatusLabel,
  statusVariant = "warning",
  resolvedStatusVariant = "success",
  buttonLabel,
  compactProgress = 0,
  expandProgress = 1,
  ctaSweepProgress = 0,
  queueProgress = 0,
  style
}) => {
  const compact = clamp01(compactProgress);
  const expand = clamp01(expandProgress);
  const queue = clamp01(queueProgress);
  const labelReveal = windowProgress(expand, 0.04, 0.42);
  const bodyReveal = windowProgress(expand, 0.18, 0.7);
  const footerReveal = windowProgress(expand, 0.46, 0.96);
  const buttonGlow = Math.max(ctaSweepProgress, queue * 0.75);
  const isQueued = queue > 0.64;

  return (
    <Panel
      style={{
        width: 620,
        padding: 30,
        background: `linear-gradient(180deg, rgba(255,255,255,0.98), ${mixColor(
          queue,
          "rgba(255,255,255,0.98)",
          "rgba(246,242,253,0.96)"
        )})`,
        boxShadow: `0 18px 42px rgba(41,40,48,${mix(queue, 0.08, 0.12)}), 0 10px 28px rgba(100,79,184,${mix(
          buttonGlow,
          0.04,
          0.14
        )})`,
        transform: `scale(${mix(compact, 0.95, 1)})`,
        ...style
      }}
    >
      <div style={{display: "flex", alignItems: "center", gap: 14}}>
        <div
          style={{
            position: "relative",
            width: mix(expand, 40, 52),
            height: mix(expand, 40, 52),
            borderRadius: mix(expand, 999, 16),
            background: mixColor(queue, tokens.colors.primaryTintBg, "rgba(100,79,184,0.18)"),
            color: tokens.colors.primaryTintText,
            border: `1px solid ${mixColor(queue, tokens.colors.primaryTintBorder, "rgba(100,79,184,0.24)")}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            overflow: "hidden"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(140deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.42) 48%, rgba(255,255,255,0) 70%)",
              transform: `translateX(${mix(ctaSweepProgress, -60, 60)}px)`
            }}
          />
          {">"}
        </div>
        <div style={{flex: 1, minWidth: 0}}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: tokens.colors.muted,
              letterSpacing: "-0.02em",
              opacity: labelReveal,
              transform: `translateY(${mix(labelReveal, 10, 0)}px)`
            }}
          >
            Follow-up trigger
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.12,
              letterSpacing: "-0.05em",
              fontWeight: 600,
              color: tokens.colors.title,
              marginTop: 4,
              opacity: bodyReveal,
              transform: `translateY(${mix(bodyReveal, 16, 0)}px)`,
              clipPath: `inset(0 ${mix(bodyReveal, 34, 0)}% 0 0 round 0)`
            }}
          >
            {title}
          </div>
        </div>
        <StatusBadge
          label={isQueued && resolvedStatusLabel ? resolvedStatusLabel : statusLabel}
          variant={isQueued ? resolvedStatusVariant : statusVariant}
          attachProgress={windowProgress(expand, 0.24, 0.7)}
          stateProgress={mix(queue, 0.18, 1)}
          pulseProgress={Math.max(ctaSweepProgress * 0.8, queue * 0.6)}
        />
      </div>

      <div
        style={{
          marginTop: 18,
          fontSize: 19,
          lineHeight: 1.55,
          color: tokens.colors.text,
          maxWidth: 500,
          opacity: bodyReveal,
          transform: `translateY(${mix(bodyReveal, 12, 0)}px)`,
          clipPath: `inset(0 ${mix(bodyReveal, 18, 0)}% 0 0 round 0)`
        }}
      >
        {description}
      </div>

      <div style={{display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20, minHeight: 40}}>
        {tags.map((tag, index) => {
          const tagProgress = staggerProgress(expand, index, tags.length, 0.26);
          return (
            <StatusBadge
              key={tag}
              label={tag}
              variant={index === 0 ? "primary" : "neutral"}
              attachProgress={tagProgress}
              stateProgress={index === 0 ? mix(queue, 0.7, 1) : 1}
              style={{
                opacity: tagProgress,
                transform: `translate3d(${mix(tagProgress, 0, 0)}px, ${mix(tagProgress, 12, 0)}px, 0) scale(${mix(
                  tagProgress,
                  0.92,
                  1
                )})`
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          marginTop: 24,
          height: 1,
          background: tokens.colors.divider,
          opacity: footerReveal
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 22,
          opacity: footerReveal,
          transform: `translateY(${mix(footerReveal, 12, 0)}px)`
        }}
      >
        <div
          style={{
            fontSize: 15,
            color: tokens.colors.muted,
            fontFamily: tokens.fonts.mono,
            letterSpacing: "-0.03em"
          }}
        >
          Triggered by silence, not by a new message
        </div>
        <div
          style={{
            position: "relative",
            marginLeft: "auto",
            minWidth: 184,
            height: 46,
            borderRadius: tokens.radii.chip,
            border: `1px solid ${mixColor(queue, tokens.colors.primaryTintBorder, "rgba(100,79,184,0.18)")}`,
            background: mixColor(queue, tokens.colors.primary, tokens.colors.primaryHover),
            color: "#ffffff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 600,
            overflow: "hidden",
            boxShadow: `0 10px 26px rgba(100,79,184,${mix(buttonGlow, 0.12, 0.24)})`,
            transform: `scale(${1 + buttonGlow * 0.03})`
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(110deg, rgba(255,255,255,0) 18%, rgba(255,255,255,0.22) 42%, rgba(255,255,255,0.48) 50%, rgba(255,255,255,0.14) 58%, rgba(255,255,255,0) 80%)",
              transform: `translateX(${mix(ctaSweepProgress, -180, 210)}px)`
            }}
          />
          <span style={{position: "relative", zIndex: 1}}>
            {isQueued ? "Queued" : buttonLabel}
          </span>
        </div>
      </div>
    </Panel>
  );
};
