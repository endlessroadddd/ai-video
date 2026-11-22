import type { CSSProperties } from "react";

type AnnotationCardProps = {
  title: string;
  subtitle: string;
  tone?: "red" | "blue" | "neutral";
  className?: string;
  style?: CSSProperties;
};

function clampProgress(value: number): number {
  if (!Number.isFinite(value)) {
    return 1;
  }

  return Math.min(1, Math.max(0, value));
}

export function AnnotationCard(props: Readonly<AnnotationCardProps>) {
  const { className = "", style, subtitle, title, tone = "neutral" } = props;

  const combinedTransform = style?.transform ? `translate(-50%, -50%) ${style.transform}` : `translate(-50%, -50%)`;
  const opacityValue = clampProgress(Number(style?.opacity ?? 1));
  const backdropProgress = opacityValue ** 2;
  const wrapperStyle = {
    "--annotation-backdrop-blur": `${(backdropProgress * 12).toFixed(2)}px`,
    "--annotation-backdrop-opacity": backdropProgress.toFixed(3),
  } as CSSProperties;

  return (
    <div className="annotation-wrapper" style={wrapperStyle}>
      <div className="annotation-backdrop" />
      <aside className={`annotation annotation--${tone} ${className}`} style={{ ...style, opacity: opacityValue, transform: combinedTransform }}>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </aside>
    </div>
  );
}
