interface EvidenceChipProps {
  label: string;
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

export function EvidenceChip({ label, value, className, style }: EvidenceChipProps) {
  return (
    <div
      className={["evidence-chip", className].filter(Boolean).join(" ")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 12px",
        borderRadius: "var(--radius-chip)",
        background: "rgba(100, 79, 184, 0.08)",
        border: "1px solid rgba(100, 79, 184, 0.18)",
        fontSize: "clamp(11px, 0.9vw, 13px)",
        ...style,
      }}
    >
      <span style={{ color: "var(--color-brand)", fontWeight: 600 }}>{label}</span>
      <span style={{ color: "var(--color-muted)", fontWeight: 400 }}>·</span>
      <span style={{ color: "var(--color-text)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}
