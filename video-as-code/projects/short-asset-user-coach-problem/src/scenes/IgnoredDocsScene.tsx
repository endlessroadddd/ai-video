import { AnnotationCard } from "../components/AnnotationCard";
import { DiscordAvatar } from "../components/DiscordAvatar";
import { docsFeedMessages } from "../data/sceneCopy";
import { getLocalTime } from "../data/shots";
import { easeOutQuint, progressBetween } from "../lib/math";

type IgnoredDocsSceneProps = {
  currentMs: number;
  opacity: number;
};

export function IgnoredDocsScene(props: Readonly<IgnoredDocsSceneProps>) {
  const { currentMs, opacity } = props;
  const localMs = getLocalTime(currentMs, "docs");
  const docsProgress = easeOutQuint(progressBetween(localMs, 280, 920));
  const feedProgress = easeOutQuint(progressBetween(localMs, 900, 2200));
  const cardProgress = easeOutQuint(progressBetween(localMs, 5000, 5760));

  return (
    <section className="scene scene--docs" style={{ opacity }}>
      <div className="split-stage">
        <section
          className="docs-pane"
          style={{
            opacity: docsProgress,
            transform: `translate3d(${(1 - docsProgress) * -22}px, 0, 0)`,
          }}
        >
          <aside className="docs-sidebar">
            <strong>Docs</strong>
            <span>Getting Started</span>
            <span>Installation</span>
            <span>Configuration</span>
            <span>Knowledge Base</span>
            <span>Integrations</span>
          </aside>

          <article className="docs-page">
            <label>Getting Started</label>
            <h2>Connect your first knowledge base</h2>
            <p>Everything needed to get up and running already lives here.</p>
            <div className="doc-callout">
              <strong>Overview</strong>
              <span>This guide walks through workspace setup and source connection.</span>
            </div>
            <ol>
              <li>
                <strong>Create your workspace</strong>
                <span>Set up a shared place for your team.</span>
              </li>
              <li>
                <strong>Connect a resource</strong>
                <code>example connect &lt;resource-id&gt;</code>
              </li>
              <li>
                <strong>Explore core features</strong>
                <span>Start syncing answers before launch.</span>
              </li>
            </ol>
          </article>
        </section>

        <section
          className="feed-pane"
          style={{
            opacity: feedProgress,
            transform: `translate3d(${(1 - feedProgress) * 34}px, 0, 0)`,
          }}
        >
          <header className="feed-header">
            <strong># community-help</strong>
            <span>99+ new messages</span>
          </header>

          <div className="swarm-feed">
            {docsFeedMessages.map((message, index) => {
              const reveal = easeOutQuint(progressBetween(localMs, 1180 + index * 170, 1540 + index * 170));

              return (
                <article
                  className={`swarm-message swarm-message--${message.tone ?? "normal"}`}
                  key={`${message.author}-${message.time}-${index}`}
                  style={{
                    opacity: 0.18 + reveal * 0.82,
                    transform: `translate3d(0, ${(1 - reveal) * 24 - feedProgress * 22}px, 0)`,
                  }}
                >
                  <DiscordAvatar compact name={message.author} />
                  <div>
                    <strong>{message.author}</strong>
                    <span>{message.time}</span>
                    <p>{message.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="split-rule" />

        <AnnotationCard
          className="docs-card"
          style={{
            opacity: cardProgress,
            transform: `translate3d(0, ${(1 - cardProgress) * 30}px, 0)`,
          }}
          subtitle="But users prefer asking."
          title="The answers exist."
          tone="neutral"
        />
      </div>
    </section>
  );
}
