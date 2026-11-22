import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";
import {mix, ramp} from "../motion/primitives";
import {tokens} from "../theme/tokens";

export const STAGE_RECT = {
  x: 360,
  y: 312,
  width: 1220,
  height: 620
} as const;

type SceneFrameProps = {
  frame: number;
  kicker: string;
  title: string;
  copy: string;
  children: React.ReactNode;
};

export const SceneFrame: React.FC<SceneFrameProps> = ({
  frame,
  kicker,
  title,
  copy,
  children
}) => {
  const intro = ramp(frame, 0, 18);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${tokens.colors.canvas} 0%, ${tokens.colors.canvasAlt} 100%)`,
        fontFamily: tokens.fonts.body,
        color: tokens.colors.text
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(212,208,202,0.54) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,208,202,0.54) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.12
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 22% 16%, rgba(100,79,184,0.06) 0%, rgba(100,79,184,0.015) 18%, transparent 34%), radial-gradient(circle at 78% 72%, rgba(100,79,184,0.04) 0%, rgba(100,79,184,0.008) 18%, transparent 36%), radial-gradient(circle at 56% 48%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 20%, transparent 34%)"
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 72,
          top: 56,
          width: 590,
          opacity: intro,
          transform: `translateY(${mix(intro, 18, 0)}px)`
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            minHeight: 38,
            padding: "0 16px",
            borderRadius: 999,
            border: `1px solid ${tokens.colors.panelBorder}`,
            background: "rgba(255,255,255,0.94)",
            color: tokens.colors.primary,
            fontSize: 12,
            fontWeight: 600,
            boxShadow: "0 1px 2px rgba(41,40,48,0.03)"
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: tokens.colors.primary
            }}
          />
          {kicker}
        </div>

        <div
          style={{
            marginTop: 18,
            fontSize: 56,
            lineHeight: 0.94,
            letterSpacing: "-0.075em",
            color: tokens.colors.title,
            fontWeight: 600
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 16,
            maxWidth: 520,
            fontSize: 17,
            lineHeight: 1.42,
            color: tokens.colors.muted
          }}
        >
          {copy}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: STAGE_RECT.x,
          top: STAGE_RECT.y,
          width: STAGE_RECT.width,
          height: STAGE_RECT.height,
          opacity: intro,
          transform: `translateY(${mix(intro, 24, 0)}px)`
        }}
      >
        {children}
      </div>

      <div
        style={{
          position: "absolute",
          right: 46,
          bottom: 36,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: mix(intro, 0, 1)
        }}
      >
        <Img src={staticFile("logo-mark-black.svg")} style={{width: 28, height: 28}} />
        <div
          style={{
            fontSize: 24,
            letterSpacing: "-0.05em",
            color: tokens.colors.title,
            fontWeight: 500
          }}
        >
          Lucius
        </div>
      </div>
    </AbsoluteFill>
  );
};

type StageShellProps = {
  label: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const StageShell: React.FC<StageShellProps> = ({label, children, style}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 40,
        top: 24,
        width: 1120,
        height: 540,
        borderRadius: 34,
        border: `1px solid ${tokens.colors.panelBorder}`,
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,245,239,0.98))",
        boxShadow: "0 28px 72px rgba(41,40,48,0.12), 0 10px 24px rgba(41,40,48,0.06)",
        overflow: "hidden",
        ...style
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(125,119,151,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(125,119,151,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          opacity: 0.42
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 34% 42%, rgba(100,79,184,0.06) 0%, rgba(100,79,184,0.015) 24%, transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0))"
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 24,
          top: 20,
          display: "inline-flex",
          alignItems: "center",
          minHeight: 28,
          padding: "0 12px",
          borderRadius: 999,
          border: `1px solid ${tokens.colors.primaryTintBorder}`,
          background: "rgba(245,241,255,0.96)",
          color: tokens.colors.primary,
          fontFamily: tokens.fonts.mono,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          zIndex: 2
        }}
      >
        {label}
      </div>

      {children}
    </div>
  );
};
