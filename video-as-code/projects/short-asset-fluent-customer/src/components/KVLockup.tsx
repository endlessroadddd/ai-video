interface KVLockupProps {
  tagline: string;
  microcopy?: string;
  theme?: "dark" | "light";
  className?: string;
  style?: React.CSSProperties;
}

export function KVLockup({ tagline, microcopy, theme = "dark", className, style }: KVLockupProps) {
  const primaryColor = theme === "light" ? "var(--color-text)" : "#fff";
  const secondaryColor = theme === "light" ? "var(--color-muted)" : "rgba(255,255,255,0.55)";

  return (
    <div
      className={["kv-lockup", className].filter(Boolean).join(" ")}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        textAlign: "center",
        ...style,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "18px",
          color: primaryColor,
          opacity: 0,
          animation: "fadeInScale 800ms var(--ease-emphasis) 200ms forwards",
        }}
      >
        <img
          src="./brand/lucius.svg"
          alt="Lucius"
          style={{
            width: "clamp(64px, 8vw, 110px)",
            height: "clamp(64px, 8vw, 110px)",
            objectFit: "contain",
            filter: theme === "light" ? "none" : "brightness(0) invert(1)",
          }}
        />
        <span style={{ fontSize: "clamp(64px, 8vw, 120px)", fontWeight: 400, lineHeight: 1, fontFamily: "'Recoleta', Georgia, serif" }}>Lucius</span>
      </div>
      <h1
        style={{
          fontSize: "clamp(26px, 3.2vw, 48px)",
          fontWeight: 400,
          lineHeight: 1.25,
          color: primaryColor,
          margin: 0,
          opacity: 0,
          animation: "fadeInUp 700ms var(--ease-soft) 600ms forwards",
          fontFamily: "'Recoleta', Georgia, serif",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "var(--color-brand)" }}>Wherever</span> they are. <span style={{ color: "var(--color-brand)" }}>Whatever</span> they speak.
      </h1>
      {microcopy ? (
        <p
          style={{
            fontSize: "clamp(16px, 1.8vw, 24px)",
            fontWeight: 400,
            color: secondaryColor,
            margin: 0,
            opacity: 0,
            animation: "fadeInUp 700ms var(--ease-soft) 900ms forwards",
            whiteSpace: "nowrap",
          }}
        >
          One brain. <span style={{ color: "var(--color-brand)", fontWeight: 600 }}>Every</span> channel. <span style={{ color: "var(--color-brand)", fontWeight: 600 }}>Every</span> tongue.
        </p>
      ) : null}
    </div>
  );
}
