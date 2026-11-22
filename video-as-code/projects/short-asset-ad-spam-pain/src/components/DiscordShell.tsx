import type { ReactNode, Ref } from "react";
import { DiscordIcon } from "./icons";

interface DiscordShellProps {
  opacity: number;
  messages: ReactNode;
  members: ReactNode;
  composerPlaceholder: string;
  stageRef?: Ref<HTMLDivElement>;
}

export default function DiscordShell(props: Readonly<DiscordShellProps>) {
  const { composerPlaceholder, members, messages, opacity, stageRef } = props;

  return (
    <div className="community-stage" ref={stageRef} style={{ opacity }}>
      <div className="community-shell">
        <aside className="server-rail" aria-hidden="true">
          <div className="server-slot server-slot--active">
            <div className="server-slot__pill" />
            <div className="server-slot__icon">
              <DiscordIcon />
            </div>
          </div>
          <div className="server-slot">
            <div className="server-slot__icon server-slot__icon--muted">A</div>
          </div>
          <div className="server-slot">
            <div className="server-slot__icon server-slot__icon--muted">+</div>
          </div>
        </aside>

        <aside className="channel-rail">
          <div className="channel-rail__header">
            <div className="channel-rail__eyebrow">Enterprise Forum</div>
            <h2>Operations</h2>
          </div>

          <div className="channel-rail__list">
            <div className="channel-rail__section-label">Text channels</div>
            <div className="channel-row channel-row--active">
              <div className="channel-row__meta">
                <span className="channel-row__hash">#</span>
                <span className="channel-row__name">general</span>
              </div>
              <span className="channel-row__badge">live</span>
            </div>
            <div className="channel-row">
              <div className="channel-row__meta">
                <span className="channel-row__hash">#</span>
                <span className="channel-row__name">announcements</span>
              </div>
            </div>
            <div className="channel-row">
              <div className="channel-row__meta">
                <span className="channel-row__hash">#</span>
                <span className="channel-row__name">resources</span>
              </div>
            </div>
            <div className="channel-row">
              <div className="channel-row__meta">
                <span className="channel-row__hash">#</span>
                <span className="channel-row__name">moderation-notes</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="chat-column">
          <header className="chat-header">
            <div className="chat-header__left">
              <span className="chat-header__channel"># general</span>
              <span className="chat-header__divider" />
              <span className="chat-header__subtitle">Manual moderation queue active</span>
            </div>
            <div className="chat-header__right">
              <span className="chat-header__pill">External links</span>
            </div>
          </header>

          <div className="transcript-pane">{messages}</div>

          <footer className="composer-bar">
            <div className="composer-bar__shell">{composerPlaceholder}</div>
          </footer>
        </section>

        {members}
      </div>
    </div>
  );
}
