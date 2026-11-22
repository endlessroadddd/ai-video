interface PlatformHeaderProps {
  platform: string;
  subLabel: string;
  time?: string;
  accent?: string;
  icon?: React.ReactNode;
}

export function PlatformHeader({ platform, subLabel, time, accent, icon }: PlatformHeaderProps) {
  return (
    <div
      className="platform-header"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "clamp(10px, 1.2vw, 14px) clamp(14px, 1.6vw, 18px)",
      }}
    >
      <div
        className="platform-chip"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          borderRadius: "999px",
          background: "var(--color-surface-strong)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-soft)",
          fontSize: "clamp(12px, 1vw, 14px)",
          fontWeight: 600,
        }}
      >
        {icon ? (
          <span style={{ display: "inline-flex", width: "16px", height: "16px", color: accent || "var(--color-brand)" }}>
            {icon}
          </span>
        ) : null}
        <span>{platform}</span>
        <span style={{ color: "var(--color-muted)", fontWeight: 400 }}>·</span>
        <span style={{ color: "var(--color-muted)", fontWeight: 400 }}>{subLabel}</span>
      </div>
      {time ? (
        <span
          style={{
            marginLeft: "auto",
            color: "var(--color-muted)",
            fontSize: "clamp(11px, 0.9vw, 13px)",
            fontWeight: 500,
          }}
        >
          {time}
        </span>
      ) : null}
    </div>
  );
}
