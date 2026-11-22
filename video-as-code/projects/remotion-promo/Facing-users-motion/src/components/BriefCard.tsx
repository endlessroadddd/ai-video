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

export const BriefCard: React.FC<{
  title: string;
  caption: string;
  bullets: string[];
  scanProgress?: number;
  skeletonProgress?: number;
  insightProgress?: number;
  readyProgress?: number;
  style?: React.CSSProperties;
}> = ({
  title,
  caption,
  bullets,
  scanProgress = 0,
  skeletonProgress = 0,
  insightProgress = 0,
  readyProgress = 0,
  style
}) => {
  const scan = clamp01(scanProgress);
  const skeleton = clamp01(skeletonProgress);
  const insight = clamp01(insightProgress);
  const ready = clamp01(readyProgress);
  const headingReveal = windowProgress(skeleton, 0.08, 0.54);
  const captionReveal = windowProgress(skeleton, 0.28, 0.82);

  return (
    <Panel
      style={{
        position: "relative",
        width: 640,
        padding: 30,
        background: `linear-gradient(180deg, rgba(255,255,255,0.985), ${mixColor(
          ready,
          "rgba(255,255,255,0.985)",
          "rgba(244,240,252,0.96)"
        )})`,
        boxShadow: `0 18px 42px rgba(41,40,48,0.08), 0 10px 28px rgba(100,79,184,${mix(ready, 0.04, 0.12)})`,
        overflow: "hidden",
        ...style
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${mix(scan, 16, 100)}%`,
          height: 3,
          background: "linear-gradient(90deg, rgba(100,79,184,0.08), rgba(100,79,184,0.72), rgba(100,79,184,0.08))",
          opacity: mix(scan, 0.2, 1)
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 136,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0.52) 50%, rgba(255,255,255,0.18) 62%, rgba(255,255,255,0) 100%)",
          transform: `translateX(${mix(scan, -150, 690)}px) skewX(-14deg)`,
          opacity: mix(scan, 0.16, 0.44),
          pointerEvents: "none"
        }}
      />
      <div style={{display: "flex", alignItems: "center"}}>
        <div style={{minWidth: 0}}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: tokens.colors.muted,
              opacity: headingReveal
            }}
          >
            Competitor brief
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 34,
              lineHeight: 1.12,
              letterSpacing: "-0.05em",
              fontWeight: 600,
              color: tokens.colors.title,
              opacity: headingReveal,
              transform: `translateY(${mix(headingReveal, 16, 0)}px)`,
              clipPath: `inset(0 ${mix(headingReveal, 28, 0)}% 0 0 round 0)`
            }}
          >
            {title}
          </div>
        </div>
        <div style={{marginLeft: "auto"}}>
          <StatusBadge
            label="Sales ready"
            variant="success"
            attachProgress={windowProgress(ready, 0.2, 0.95)}
            stateProgress={ready}
            pulseProgress={ready * 0.65}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 18,
          lineHeight: 1.55,
          color: tokens.colors.text,
          opacity: captionReveal,
          transform: `translateY(${mix(captionReveal, 12, 0)}px)`,
          clipPath: `inset(0 ${mix(captionReveal, 18, 0)}% 0 0 round 0)`
        }}
      >
        {caption}
      </div>

      <div style={{display: "grid", gap: 12, marginTop: 22}}>
        {bullets.map((bullet, index) => {
          const bulletProgress = staggerProgress(insight, index, bullets.length, 0.22);
          return (
            <div
              key={bullet}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 16px",
                borderRadius: 14,
                background:
                  index === 0
                    ? mixColor(ready, tokens.colors.primaryTintBg, "rgba(231,240,255,0.9)")
                    : tokens.colors.panelMuted,
                border: `1px solid ${
                  index === 0
                    ? mixColor(ready, tokens.colors.primaryTintBorder, "rgba(169,194,255,0.64)")
                    : tokens.colors.panelBorder
                }`,
                opacity: bulletProgress,
                transform: `translateY(${mix(bulletProgress, 14, 0)}px)`,
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: 120,
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 36%, rgba(255,255,255,0.48) 48%, rgba(255,255,255,0.18) 58%, rgba(255,255,255,0) 100%)",
                  transform: `translateX(${mix(bulletProgress, -130, 540)}px) skewX(-12deg)`,
                  opacity: 0.5
                }}
              />
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: index === 0 ? tokens.colors.primary : tokens.colors.neutralBorder,
                  color: index === 0 ? "#ffffff" : tokens.colors.neutralText,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  flex: "0 0 auto",
                  marginTop: 2
                }}
              >
                {index + 1}
              </div>
              <div
                style={{
                  position: "relative",
                  fontSize: 18,
                  lineHeight: 1.45,
                  color: tokens.colors.title,
                  clipPath: `inset(0 ${mix(bulletProgress, 24, 0)}% 0 0 round 0)`
                }}
              >
                {bullet}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};
