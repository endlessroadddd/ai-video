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
import {StatusBadge} from "./StatusBadge";

export const HandoffCard: React.FC<{
  title: string;
  summary: string;
  chips: string[];
  owner: string;
  nextStep: string;
  intakeProgress?: number;
  assemblyProgress?: number;
  footerRevealProgress?: number;
  completeProgress?: number;
  statusLabel?: string;
  style?: React.CSSProperties;
}> = ({
  title,
  summary,
  chips,
  owner,
  nextStep,
  intakeProgress = 0,
  assemblyProgress = 0,
  footerRevealProgress = 0,
  completeProgress = 0,
  statusLabel = "Context attached",
  style
}) => {
  const intake = clamp01(intakeProgress);
  const assembly = clamp01(assemblyProgress);
  const footer = clamp01(footerRevealProgress);
  const complete = clamp01(completeProgress);
  const headerReveal = windowProgress(intake, 0.08, 0.72);
  const summaryReveal = windowProgress(assembly, 0.04, 0.58);

  return (
    <Panel
      style={{
        position: "relative",
        width: 680,
        padding: 32,
        background: `linear-gradient(180deg, rgba(255,255,255,0.99), ${mixColor(
          complete,
          "rgba(255,255,255,0.99)",
          "rgba(244,248,242,0.96)"
        )})`,
        boxShadow: `0 18px 40px rgba(41,40,48,${mix(complete, 0.08, 0.12)}), 0 12px 28px rgba(100,79,184,${mix(
          complete,
          0.02,
          0.08
        )})`,
        ...style
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: `${mix(summaryReveal, 14, 100)}%`,
          height: 3,
          borderTopLeftRadius: tokens.radii.card,
          borderTopRightRadius: tokens.radii.card,
          background: "linear-gradient(90deg, rgba(100,79,184,0.18), rgba(100,79,184,0.72), rgba(100,79,184,0.16))",
          opacity: intake
        }}
      />
      <div style={{display: "flex", alignItems: "center"}}>
        <div style={{minWidth: 0}}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: tokens.colors.muted,
              opacity: headerReveal
            }}
          >
            Handoff summary
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 34,
              lineHeight: 1.12,
              letterSpacing: "-0.05em",
              fontWeight: 600,
              color: tokens.colors.title,
              opacity: headerReveal,
              transform: `translateY(${mix(headerReveal, 16, 0)}px)`,
              clipPath: `inset(0 ${mix(headerReveal, 28, 0)}% 0 0 round 0)`
            }}
          >
            {title}
          </div>
        </div>
        <div style={{marginLeft: "auto"}}>
          <StatusBadge
            label={statusLabel}
            variant="success"
            attachProgress={windowProgress(complete, 0.18, 0.9)}
            stateProgress={complete}
            pulseProgress={complete * 0.7}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 18,
          padding: 18,
          borderRadius: 16,
          background: mixColor(complete, tokens.colors.panelMuted, "rgba(232,246,233,0.92)"),
          border: `1px solid ${mixColor(complete, tokens.colors.panelBorder, "rgba(134, 199, 149, 0.34)")}`,
          fontSize: 18,
          lineHeight: 1.5,
          color: tokens.colors.text,
          opacity: summaryReveal,
          transform: `translateY(${mix(summaryReveal, 14, 0)}px)`,
          clipPath: `inset(0 ${mix(summaryReveal, 18, 0)}% 0 0 round 16px)`
        }}
      >
        {summary}
      </div>

      <div style={{display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18, minHeight: 42}}>
        {chips.map((chip, index) => {
          const chipProgress = staggerProgress(assembly, index, chips.length, 0.24);
          return (
            <StatusBadge
              key={`${chip}-${index}`}
              label={chip}
              variant={index === 0 ? "primary" : "neutral"}
              attachProgress={chipProgress}
              stateProgress={index === 0 ? mix(complete, 0.72, 1) : 1}
              style={{
                opacity: chipProgress,
                transform: `translate3d(${mix(chipProgress, 0, 0)}px, ${mix(chipProgress, 14, 0)}px, 0) scale(${mix(
                  chipProgress,
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
          marginTop: 20,
          height: 1,
          background: tokens.colors.divider,
          opacity: footer
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginTop: 20,
          opacity: footer,
          transform: `translateY(${mix(footer, 16, 0)}px)`
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 16,
            background: "rgba(255,255,255,0.76)",
            border: `1px solid ${tokens.colors.panelBorder}`
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: tokens.colors.muted,
              textTransform: "uppercase"
            }}
          >
            Owner
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: tokens.colors.title,
              marginTop: 8
            }}
          >
            {owner}
          </div>
        </div>
        <div
          style={{
            padding: "14px 16px",
            borderRadius: 16,
            background: "rgba(255,255,255,0.76)",
            border: `1px solid ${tokens.colors.panelBorder}`
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: tokens.colors.muted,
              textTransform: "uppercase"
            }}
          >
            Next step
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: tokens.colors.title,
              marginTop: 8
            }}
          >
            {nextStep}
          </div>
        </div>
      </div>
    </Panel>
  );
};
