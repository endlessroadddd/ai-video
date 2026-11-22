import type { CSSProperties } from "react";

type NarrativeHeadlineProps = {
  className?: string;
  opacity: number;
  text: string;
  visible: boolean;
};

export function NarrativeHeadline(props: Readonly<NarrativeHeadlineProps>) {
  const { className, opacity, text, visible } = props;
  const safeOpacity = visible ? opacity : 0;
  const translateY = (1 - safeOpacity) * 28;
  const scale = 0.94 + safeOpacity * 0.06;
  const style: CSSProperties = {
    opacity: safeOpacity,
    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
    visibility: visible ? "visible" : "hidden",
  };

  return (
    <div
      aria-hidden="true"
      className={["narrative-headline", className].filter(Boolean).join(" ")}
      style={style}
    >
      <div className="narrative-headline__veil" />
      <div className="narrative-headline__content">
        <div className="narrative-headline__backing" />
        <p className="narrative-headline__text">{text}</p>
      </div>
    </div>
  );
}
