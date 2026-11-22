import type { CSSProperties } from "react";
import { AnnotationCard } from "../components/AnnotationCard";
import { DiscordAvatar } from "../components/DiscordAvatar";
import { DiscordShell } from "../components/DiscordShell";
import { floodMessages } from "../data/sceneCopy";
import { getLocalTime } from "../data/shots";
import { countTo, easeOutQuint, progressBetween } from "../lib/math";

type FloodSceneProps = {
  currentMs: number;
  opacity: number;
};

function revealStyle(localMs: number, startMs: number): CSSProperties {
  const progress = easeOutQuint(progressBetween(localMs, startMs, startMs + 360));

  return {
    opacity: progress,
    transform: `translate3d(0, ${(1 - progress) * 20}px, 0)`,
    filter: `blur(${(1 - progress) * 5}px)`,
  };
}

export function FloodScene(props: Readonly<FloodSceneProps>) {
  const { currentMs, opacity } = props;
  const localMs = getLocalTime(currentMs, "flood");
  const cardProgress = easeOutQuint(progressBetween(localMs, 5000, 5800));
  const repeatedCount = countTo(localMs, 5460, 6260, 47);

  return (
    <section className="scene scene--flood" style={{ opacity }}>
      <DiscordShell
        annotation={
          <AnnotationCard
            className="flood-count-card"
            style={{
              opacity: cardProgress,
              transform: `translate3d(${(1 - cardProgress) * 44}px, 0, 0)`,
            }}
            subtitle="Duplicate questions this week"
            title={`${repeatedCount}x`}
            tone="red"
          />
        }
      >
        <div className="flood-feed">
          {floodMessages.map((message, index) => {
            const start = 440 + index * 580;
            const isPartial = index === floodMessages.length - 1;

            return (
              <article
                className={[
                  "discord-message",
                  message.tone ? `discord-message--${message.tone}` : "",
                  isPartial ? "discord-message--partial" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={`${message.author}-${message.time}`}
                style={revealStyle(localMs, start)}
              >
                <DiscordAvatar name={message.author} variant={message.author === "ByteRider" ? "violet" : undefined} />
                <div className="discord-message__content">
                  <div className="discord-message__meta">
                    <strong>{message.author}</strong>
                    <span>{message.time}</span>
                  </div>
                  <p>{message.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </DiscordShell>
    </section>
  );
}
