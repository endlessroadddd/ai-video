import type { CSSProperties } from "react";

import type {
  DiscordNoiseCardStageProps,
  DiscordNoiseCardTone,
  NoiseCardItem,
} from "../chat/discord-scene-types";
import { fadeWindow } from "../motion/timing";
import { DiscordQuestionStackStage } from "./discord-question-stack-stage";

const DEFAULT_RADIUS = [
  "20px 16px 18px 14px",
  "16px 22px 14px 18px",
  "18px 14px 20px 16px",
  "18px 20px 14px 18px",
] as const;

const DEFAULT_DRIFT = [
  { driftDelay: 0, driftDuration: 6200, driftX: -6, driftY: 4, enterX: -28, enterY: -12, layer: 2, rotate: -2.8 },
  { driftDelay: 120, driftDuration: 6800, driftX: 5, driftY: -4, enterX: 26, enterY: -14, layer: 4, rotate: 2.5 },
  { driftDelay: 220, driftDuration: 6400, driftX: -5, driftY: -5, enterX: -26, enterY: 16, layer: 3, rotate: -2 },
  { driftDelay: 80, driftDuration: 7000, driftX: 6, driftY: 4, enterX: 30, enterY: 16, layer: 5, rotate: 3.1 },
] as const;

function getVisibleCount(props: DiscordNoiseCardStageProps): number {
  const {
    cards,
    currentMs,
    startMs,
    visibleTiming: { cardStartOffsetMs, cardStaggerMs },
  } = props;

  return Math.max(
    0,
    Math.min(cards.length, Math.floor((currentMs - (startMs + cardStartOffsetMs)) / cardStaggerMs) + 1),
  );
}

function getToneClassName(tone: DiscordNoiseCardTone) {
  if (tone === "warning") {
    return "discord-noise-card--warning";
  }

  if (tone === "feature") {
    return "discord-noise-card--feature";
  }

  return "discord-noise-card--default";
}

function getCardStyle(card: NoiseCardItem, index: number): CSSProperties {
  const motion = DEFAULT_DRIFT[index % DEFAULT_DRIFT.length];
  const radius = DEFAULT_RADIUS[index % DEFAULT_RADIUS.length];
  const top = card.top ?? 12 + (index % 4) * 16;
  const left = card.left ?? (index % 3) * 24;
  const width = card.width ?? 232;

  return {
    "--card-drift-delay": `${motion.driftDelay}ms`,
    "--card-drift-duration": `${motion.driftDuration}ms`,
    "--card-drift-x": `${motion.driftX}px`,
    "--card-drift-y": `${motion.driftY}px`,
    "--card-enter-x": `${motion.enterX}px`,
    "--card-enter-y": `${motion.enterY}px`,
    "--card-launch-delay": `${index * 30}ms`,
    "--card-layer": String(motion.layer),
    "--card-left": `${left}%`,
    "--card-radius": radius,
    "--card-rotate": `${motion.rotate}deg`,
    "--card-top": `${top}%`,
    "--card-width": `${width}px`,
  } as CSSProperties;
}

export function DiscordNoiseCardStage(props: Readonly<DiscordNoiseCardStageProps>) {
  const {
    cards,
    className,
    currentMs,
    questionStack,
    startMs,
    visibleTiming,
  } = props;

  const stageOpacity = fadeWindow(
    currentMs,
    startMs,
    visibleTiming.fadeInMs,
    visibleTiming.endMs ?? Number.MAX_SAFE_INTEGER,
    visibleTiming.fadeOutMs ?? 0,
  );
  const visibleCount = getVisibleCount(props);

  if (stageOpacity <= 0.001) {
    return null;
  }

  return (
    <div className={["discord-noise-stage", className].filter(Boolean).join(" ")} style={{ opacity: stageOpacity }}>
      <div className="discord-noise-stage__wash" />
      <div className="discord-noise-stage__grid" />
      <div className="discord-noise-stage__aura discord-noise-stage__aura--violet" />
      <div className="discord-noise-stage__aura discord-noise-stage__aura--blue" />

      {cards.slice(0, visibleCount).map((card, index) => (
        <article
          key={card.id}
          className={[
            "discord-noise-card",
            getToneClassName(card.tone ?? "default"),
            "discord-noise-card--visible",
          ]
            .filter(Boolean)
            .join(" ")}
          style={getCardStyle(card, index)}
        >
          <div className="discord-noise-card__surface">
            <div className="discord-noise-card__meta">
              <span className="discord-noise-card__channel">#{card.channel}</span>
              {card.tag ? <span className="discord-noise-card__tag">{card.tag}</span> : null}
            </div>
            <p>{card.text}</p>
          </div>
        </article>
      ))}

      {questionStack ? (
        <div className="discord-noise-stage__panel">
          <DiscordQuestionStackStage
            currentMs={currentMs}
            initialDelayMs={questionStack.initialDelayMs}
            questions={questionStack.questions}
            revealDurationMs={questionStack.revealDurationMs}
            staggerMs={questionStack.staggerMs}
            startMs={startMs + (questionStack.startOffsetMs ?? 0)}
          />
        </div>
      ) : null}
    </div>
  );
}
