import type { CSSProperties } from "react";

type LogoTone = "dark" | "light" | "brand";

interface LuciusLogoProps {
  size?: number | string;
  tone?: LogoTone;
  style?: CSSProperties;
}

const logoFilters: Record<LogoTone, string> = {
  dark: "none",
  light: "brightness(0) invert(1)",
  brand: "brightness(0) saturate(100%) invert(36%) sepia(27%) saturate(1545%) hue-rotate(219deg) brightness(91%) contrast(89%)",
};

export function LuciusLogo({ size = 48, tone = "dark", style }: LuciusLogoProps) {
  return (
    <img
      src="./brand/lucius.svg"
      alt=""
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        filter: logoFilters[tone],
        ...style,
      }}
    />
  );
}

interface LuciusBadgeProps {
  label?: boolean;
  size?: number | string;
  iconSize?: number | string;
  compact?: boolean;
}

export function LuciusBadge({ label = true, size = "clamp(134px, 10.2vw, 178px)", iconSize, compact = false }: LuciusBadgeProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: compact ? "22px" : "30px",
        background: "linear-gradient(145deg, #765BE5 0%, #4F37B8 100%)",
        border: "2px solid rgba(255,255,255,0.82)",
        boxShadow: "0 24px 62px rgba(100,79,184,0.25)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: compact ? "6px" : "9px",
      }}
    >
      <LuciusLogo size={iconSize ?? (compact ? "34%" : "42%")} tone="light" />
      {label ? (
        <span style={{ fontSize: compact ? "clamp(16px, 1.5vw, 22px)" : "clamp(22px, 2vw, 31px)", fontWeight: 800, lineHeight: 1 }}>
          Lucius
        </span>
      ) : null}
    </div>
  );
}
