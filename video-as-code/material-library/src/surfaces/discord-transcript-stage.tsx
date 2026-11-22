import type { CSSProperties } from "react";

import { DiscordMessageCard } from "../chat/discord-message-card";
import type {
  DiscordMessageTone,
  DiscordTranscriptStageProps,
} from "../chat/discord-scene-types";
import { easeOutQuint } from "../motion/easing";
import { progressBetween } from "../motion/timing";

function getBubbleShellStyle(progress: number): CSSProperties {
  if (progress <= 0) {
    return {
      marginBottom: 0,
      maxHeight: 0,
      opacity: 0,
    };
  }

  const settled = easeOutQuint(progress);
  return {
    marginBottom: `${settled * 18}px`,
    maxHeight: `${settled * 240}px`,
    opacity: settled,
  };
}

function getBubbleStyle(progress: number): CSSProperties {
  const settled = easeOutQuint(progress);
  const blur = (1 - settled) * 5;
  const scale = 0.96 + settled * 0.04;
  const translateY = (1 - settled) * 24;

  return {
    filter: `blur(${blur}px)`,
    opacity: settled,
    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
  };
}

function normalizeEmphasis(
  tone: DiscordTranscriptStageProps["tone"],
  emphasis?: DiscordMessageTone,
): DiscordMessageTone {
  if (emphasis && emphasis !== "default") {
    return emphasis;
  }

  if (tone === "feature") {
    return "feature";
  }

  if (tone === "warning") {
    return "warning";
  }

  return "default";
}

export function DiscordTranscriptStage(props: Readonly<DiscordTranscriptStageProps>) {
  const {
    className,
    currentMs,
    messages,
    questionRevealDurationMs = 520,
    questionStartMs,
    questionText,
    revealDurationMs = 220,
    revealTimes,
    tone = "default",
  } = props;

  const questionOpacity =
    questionText && questionStartMs !== undefined
      ? progressBetween(currentMs, questionStartMs, questionStartMs + questionRevealDurationMs)
      : 0;

  return (
    <div className={["discord-transcript-stage", className].filter(Boolean).join(" ")}>
      <div className="discord-transcript-pane">
        <div className="discord-transcript-pane__inner">
          <div className="discord-transcript-surface">
            <div className="discord-transcript-layer discord-transcript-layer--focus">
              <div className="discord-transcript-layer__stack">
                {messages.map((message, index) => {
                  const revealStartMs = revealTimes[index] ?? revealTimes[revealTimes.length - 1] ?? 0;
                  const progress = progressBetween(
                    currentMs,
                    revealStartMs,
                    revealStartMs + revealDurationMs,
                  );

                  if (progress <= 0.001) {
                    return null;
                  }

                  return (
                    <div
                      className="discord-transcript-row-shell"
                      key={message.id ?? `${message.author}-${message.meta}-${index}`}
                      style={getBubbleShellStyle(progress)}
                    >
                      <div className="discord-transcript-row" style={getBubbleStyle(progress)}>
                        <DiscordMessageCard
                          author={message.author}
                          avatarImageUrl={message.avatarImageUrl}
                          avatarVariant={message.avatarVariant}
                          body={message.body}
                          emphasis={normalizeEmphasis(tone, message.emphasis)}
                          meta={message.meta}
                          metaBadge={message.metaBadge}
                          reactions={message.reactions}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {questionText ? (
              <p
                className="discord-transcript-question"
                style={{
                  opacity: questionOpacity,
                  transform: `translateY(${(1 - questionOpacity) * 20}px)`,
                }}
              >
                {questionText}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
