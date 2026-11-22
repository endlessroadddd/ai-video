interface InsightItem {
  label: string;
  value: string;
}

interface InsightRailProps {
  items: InsightItem[];
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
}

export function InsightRail({ items, className, style, staggerDelay = 180 }: InsightRailProps) {
  return (
    <div
      className={["insight-rail", className].filter(Boolean).join(" ")}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        ...style,
      }}
    >
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="insight-chip"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            borderRadius: "var(--radius-chip)",
            background: "var(--color-surface-strong)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-soft)",
            fontSize: "clamp(11px, 0.9vw, 13px)",
            animation: `fadeInUp 360ms var(--ease-soft) ${index * staggerDelay}ms both`,
          }}
        >
          <span style={{ color: "var(--color-muted)", fontWeight: 500 }}>{item.label}</span>
          <span style={{ color: "var(--color-text)", fontWeight: 600 }}>·</span>
          <span style={{ color: "var(--color-brand)", fontWeight: 600 }}>{item.value}</span>
          <span style={{ color: "var(--color-success)", fontSize: "12px" }}>✓</span>
        </div>
      ))}
    </div>
  );
}
