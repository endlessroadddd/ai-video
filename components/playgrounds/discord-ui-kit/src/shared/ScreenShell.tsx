import type { ReactNode } from "react";

type ScreenShellProps = {
  shellEyebrow?: string;
  title: string;
  subtitle: string;
  topControls?: ReactNode;
  children: ReactNode;
};

export function ScreenShell({
  shellEyebrow = "Discord UI Playground",
  title,
  subtitle,
  topControls,
  children,
}: ScreenShellProps) {
  return (
    <main className="playground-page">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />

      <section className="playground-shell">
        <div className="playground-shell__intro">
          <p className="playground-shell__eyebrow">{shellEyebrow}</p>
          <div className="playground-shell__heading">
            <div>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            {topControls}
          </div>
        </div>

        {children}
      </section>
    </main>
  );
}
