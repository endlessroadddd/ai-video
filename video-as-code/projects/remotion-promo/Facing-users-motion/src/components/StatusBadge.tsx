import React from "react";
import {clamp01, mix, mixColor} from "../motion/primitives";
import {tokens} from "../theme/tokens";

export type BadgeVariant = "primary" | "success" | "warning" | "neutral";

const variantTokens: Record<BadgeVariant, {bg: string; border: string; text: string}> = {
  primary: {
    bg: tokens.colors.badgePrimaryBg,
    border: tokens.colors.badgePrimaryBorder,
    text: tokens.colors.badgePrimaryText
  },
  success: {
    bg: tokens.colors.successBg,
    border: tokens.colors.successBorder,
    text: tokens.colors.successText
  },
  warning: {
    bg: tokens.colors.warningBg,
    border: tokens.colors.warningBorder,
    text: tokens.colors.warningText
  },
  neutral: {
    bg: tokens.colors.neutralBg,
    border: tokens.colors.neutralBorder,
    text: tokens.colors.neutralText
  }
};

export const StatusBadge: React.FC<{
  label: string;
  variant?: BadgeVariant;
  mono?: boolean;
  dot?: boolean;
  pulseProgress?: number;
  attachProgress?: number;
  stateProgress?: number;
  style?: React.CSSProperties;
}> = ({
  label,
  variant = "neutral",
  mono = false,
  dot = false,
  pulseProgress = 0,
  attachProgress = 1,
  stateProgress = 1,
  style
}) => {
  const tone = variantTokens[variant];
  const pulse = clamp01(pulseProgress);
  const attach = clamp01(attachProgress);
  const state = clamp01(stateProgress);
  const outlineBg = mixColor(state, "rgba(255,255,255,0.78)", tone.bg);
  const border = mixColor(state, tone.border, tone.border);
  const text = mixColor(state, tone.text, tone.text);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        minHeight: 36,
        padding: "0 14px",
        borderRadius: tokens.radii.chip,
        border: `1px solid ${border}`,
        background: outlineBg,
        color: text,
        fontFamily: mono ? tokens.fonts.mono : tokens.fonts.body,
        fontSize: mono ? 12 : 14,
        fontWeight: 600,
        letterSpacing: mono ? "-0.02em" : "0",
        whiteSpace: "nowrap",
        boxShadow: `0 ${mix(pulse, 1, 8)}px ${mix(pulse, 2, 18)}px rgba(100,79,184,${mix(
          pulse,
          0.02,
          0.12
        )})`,
        opacity: mix(attach, 0.12, 1),
        transform: `translate3d(${mix(attach, 10, 0)}px, ${mix(attach, 6, 0)}px, 0) scale(${mix(
          attach,
          0.92,
          1 + pulse * 0.015
        )})`,
        ...style
      }}
    >
      {pulse > 0.02 ? (
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: 999,
            border: `1px solid rgba(100,79,184,${mix(pulse, 0.08, 0.18)})`,
            transform: `scale(${1 + pulse * 0.18})`,
            opacity: 1 - pulse * 0.65
          }}
        />
      ) : null}
      {dot ? (
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: text,
            opacity: 0.9,
            boxShadow: pulse > 0 ? `0 0 0 ${mix(pulse, 0, 6)}px rgba(100,79,184,0.12)` : "none"
          }}
        />
      ) : null}
      <span>{label}</span>
    </div>
  );
};
