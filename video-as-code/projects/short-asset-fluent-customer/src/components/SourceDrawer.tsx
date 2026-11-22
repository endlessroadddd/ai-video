interface SourceDrawerProps {
  title: string;
  link: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SourceDrawer({ title, link, className, style }: SourceDrawerProps) {
  return (
    <div
      className={["source-drawer", className].filter(Boolean).join(" ")}
      style={{
        padding: "10px 14px",
        borderRadius: "12px",
        background: "rgba(100, 79, 184, 0.06)",
        border: "1px solid rgba(100, 79, 184, 0.14)",
        fontSize: "clamp(11px, 0.85vw, 12px)",
        ...style,
      }}
    >
      <div style={{ color: "var(--color-muted)", fontWeight: 500, marginBottom: "4px" }}>{title}</div>
      <div style={{ color: "var(--color-brand)", fontWeight: 600, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>
        {link}
      </div>
    </div>
  );
}
