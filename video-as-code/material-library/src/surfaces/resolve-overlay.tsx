import type { CSSProperties } from "react";

export type ResolveOverlayProps = {
  className?: string;
  markSrc?: string;
  style?: CSSProperties;
  summary?: string;
  summaryStyle?: CSSProperties;
  wordmarkAlt?: string;
  wordmarkSrc?: string;
};

export function ResolveOverlay({
  className,
  markSrc = "/brand/logo-mark-black.svg",
  style,
  summary,
  summaryStyle,
  wordmarkAlt = "Lucius",
  wordmarkSrc = "/brand/lucius.svg",
}: ResolveOverlayProps) {
  return (
    <>
      <div
        className={["resolve-overlay", className].filter(Boolean).join(" ")}
        style={style}
      >
        <div className="resolve-overlay__lockup">
          <img className="resolve-overlay__mark" src={markSrc} alt="" />
          <img
            className="resolve-overlay__wordmark"
            src={wordmarkSrc}
            alt={wordmarkAlt}
          />
        </div>
      </div>

      {summary ? (
        <div className="resolve-summary" style={summaryStyle}>
          {summary}
        </div>
      ) : null}
    </>
  );
}
