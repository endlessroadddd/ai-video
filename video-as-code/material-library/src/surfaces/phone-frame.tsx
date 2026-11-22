import type { CSSProperties, ReactNode } from "react";

export type PhoneFrameProps = {
  side: "lucius" | "user";
  title: string;
  altTitle?: string;
  altTitleProgress?: number;
  style: CSSProperties;
  children: ReactNode;
  composer: ReactNode;
};

export function PhoneFrame({
  side,
  title,
  altTitle,
  altTitleProgress = 0,
  style,
  children,
  composer,
}: PhoneFrameProps) {
  const baseTitleOpacity = 1 - altTitleProgress;
  const revealTitleOpacity = altTitle ? altTitleProgress : 0;

  return (
    <div className={`phone phone--${side}`} style={style}>
      <div className="phone__hardware">
        <div className="phone__screen">
          <header className="phone__header">
            <div className="phone__identity-strip">
              <div className={`phone__avatar phone__avatar--${side}`}>
                {side === "lucius" ? <img src="/brand/logo-mark-black.svg" alt="" /> : <span>A</span>}
              </div>
              <span className="phone__title-stack">
                <span style={{ opacity: baseTitleOpacity }}>{title}</span>
                {altTitle ? <span style={{ opacity: revealTitleOpacity }}>{altTitle}</span> : null}
              </span>
            </div>
            <div className="phone__header-line" aria-hidden="true" />
          </header>

          <div className="phone__thread">{children}</div>
          <div className="phone__composer-slot">{composer}</div>
        </div>
      </div>
    </div>
  );
}
