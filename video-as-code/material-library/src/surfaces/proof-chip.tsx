import type { CSSProperties } from "react";

export type ProofChipProps = {
  className?: string;
  count: number | string;
  label: string;
  style?: CSSProperties;
};

export function ProofChip({
  className,
  count,
  label,
  style,
}: ProofChipProps) {
  return (
    <div
      className={["proof-chip", className].filter(Boolean).join(" ")}
      style={style}
    >
      <span className="proof-chip__count">{count}</span>
      <span className="proof-chip__label">{label}</span>
    </div>
  );
}
