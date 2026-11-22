import React from "react";
import {clamp01, mix} from "../motion/primitives";
import {tokens} from "../theme/tokens";

export const FeatureFrame: React.FC<{
  eyebrow: string;
  title: string;
  description: string;
  frameProgress?: number;
  bodyProgress?: number;
  headerAside?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}> = ({
  eyebrow,
  title,
  description,
  frameProgress = 1,
  bodyProgress = 1,
  headerAside,
  footer,
  children,
  bodyStyle,
  style
}) => {
  const intro = clamp01(frameProgress);
  const body = clamp01(bodyProgress);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 1360,
        minHeight: 760,
        transform: `translate(-50%, -50%) translateY(${mix(intro, 26, 0)}px) scale(${mix(intro, 0.97, 1)})`,
        opacity: intro,
        ...style
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 760,
          borderRadius: 32,
          border: `1px solid ${tokens.colors.panelBorder}`,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,248,244,0.98) 100%)",
          boxShadow:
            "0 28px 70px rgba(41,40,48,0.10), 0 10px 22px rgba(41,40,48,0.06), inset 0 1px 0 rgba(255,255,255,0.75)"
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 34,
            top: 0,
            width: mix(intro, 140, 260),
            height: 3,
            borderBottomLeftRadius: 999,
            borderBottomRightRadius: 999,
            background: "linear-gradient(90deg, rgba(100,79,184,0.16), rgba(100,79,184,0.78), rgba(100,79,184,0.18))"
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(100,79,184,0.12) 0%, rgba(100,79,184,0.04) 32%, transparent 62%)"
          }}
        />
        <div
          style={{
            position: "relative",
            padding: "34px 38px 34px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16
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
                background: tokens.colors.primaryTintBg,
                border: `1px solid ${tokens.colors.primaryTintBorder}`,
                color: tokens.colors.primary,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "-0.01em"
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
              {eyebrow}
            </div>
            <div style={{marginLeft: "auto", opacity: body}}>{headerAside}</div>
          </div>

          <div
            style={{
              marginTop: 22,
              maxWidth: 860,
              fontSize: 60,
              lineHeight: 0.98,
              letterSpacing: "-0.07em",
              color: tokens.colors.title,
              fontWeight: 600,
              opacity: intro,
              transform: `translateY(${mix(intro, 12, 0)}px)`
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 14,
              maxWidth: 760,
              fontSize: 20,
              lineHeight: 1.5,
              color: tokens.colors.muted,
              opacity: mix(intro, 0, 1),
              transform: `translateY(${mix(intro, 18, 0)}px)`
            }}
          >
            {description}
          </div>

          <div
            style={{
              marginTop: 24,
              height: 1,
              background: tokens.colors.divider,
              opacity: mix(intro, 0, 1)
            }}
          />

          <div
            style={{
              position: "relative",
              minHeight: 430,
              marginTop: 28,
              padding: "24px 26px",
              borderRadius: 26,
              border: `1px solid rgba(212,208,202,0.88)`,
              background:
                "linear-gradient(180deg, rgba(245,244,239,0.96) 0%, rgba(251,250,247,0.92) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.62)",
              opacity: body,
              transform: `translateY(${mix(body, 18, 0)}px)`,
              ...bodyStyle
            }}
          >
            {children}
          </div>

          {footer ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                marginTop: 26,
                opacity: body
              }}
            >
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
