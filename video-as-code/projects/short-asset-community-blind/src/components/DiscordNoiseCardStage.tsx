import type { CSSProperties } from "react";
import {
  ENDING_QUESTION_INITIAL_DELAY_MS,
  ENDING_QUESTION_REVEAL_DURATION_MS,
  ENDING_QUESTION_STAGGER_MS,
  ENDING_STAGE_START_MS,
  QUESTION_STACK,
  TOTAL_DURATION_MS,
} from "../data/communityBlind";

const ENDING_TIMELINE_SHIFT_MS = ENDING_STAGE_START_MS - 25200;

function shiftEndingMs(ms: number): number {
  return ms + ENDING_TIMELINE_SHIFT_MS;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function progressBetween(t: number, start: number, end: number): number {
  if (end <= start) {
    return t >= end ? 1 : 0;
  }

  return clamp((t - start) / (end - start), 0, 1);
}

function fadeWindow(t: number, start: number, enter: number, end: number, exit: number): number {
  const fadeIn = progressBetween(t, start, start + enter);
  const fadeOut = 1 - progressBetween(t, end - exit, end);
  return clamp(Math.min(fadeIn, fadeOut), 0, 1);
}

type BlindSpotGroup = "talking" | "stuck" | "care";
type NoiseCardTone = "default" | "warning" | "feature";

type NoiseCardSpec = {
  channel: string;
  group: BlindSpotGroup;
  id: string;
  left: number;
  tag: string;
  text: string;
  tone: NoiseCardTone;
  top: number;
  width: number;
};

type NoiseCardMotionSpec = {
  driftDelay: number;
  driftDuration: number;
  driftX: number;
  driftY: number;
  enterX: number;
  enterY: number;
  layer: number;
  radius: string;
  rotate: number;
};

const ENDING_CARDS: readonly NoiseCardSpec[] = [
  {
    id: "talking-repeat",
    group: "talking",
    channel: "general",
    tag: "repeat",
    text: "Same setup question again. New wording, same confusion.",
    tone: "default",
    top: 16,
    left: 3,
    width: 228,
  },
  {
    id: "talking-buried",
    group: "talking",
    channel: "general",
    tag: "buried",
    text: "I saw the important reply for two seconds and then lost it again.",
    tone: "default",
    top: 4,
    left: -2,
    width: 222,
  },
  {
    id: "talking-mixed",
    group: "talking",
    channel: "general",
    tag: "mixed feed",
    text: "Questions, memes, bug reports, and feature asks all live in one scroll.",
    tone: "default",
    top: 15,
    left: 82,
    width: 228,
  },
  {
    id: "talking-volume",
    group: "talking",
    channel: "general",
    tag: "volume",
    text: "General is moving so fast every thread feels brand new every five minutes.",
    tone: "default",
    top: 4,
    left: 70,
    width: 236,
  },
  {
    id: "stuck-403",
    group: "stuck",
    channel: "help",
    tag: "blocked",
    text: "403 /connect after reinstalling. Fresh login did not help.",
    tone: "warning",
    top: 48,
    left: -3,
    width: 232,
  },
  {
    id: "stuck-owner",
    group: "stuck",
    channel: "help",
    tag: "no owner",
    text: "I am answering people one by one and it is the same issue every time.",
    tone: "warning",
    top: 31,
    left: 4,
    width: 236,
  },
  {
    id: "stuck-cluster",
    group: "stuck",
    channel: "help",
    tag: "same cluster",
    text: "The thread looks like separate bugs, but it is clearly one blocker repeating.",
    tone: "warning",
    top: 48,
    left: 84,
    width: 236,
  },
  {
    id: "stuck-splitting",
    group: "stuck",
    channel: "help",
    tag: "split thread",
    text: "Can someone pin one status update? This keeps splitting into new replies.",
    tone: "warning",
    top: 31,
    left: 68,
    width: 240,
  },
  {
    id: "care-theme",
    group: "care",
    channel: "feature-requests",
    tag: "theme",
    text: "Group requests by theme, not by whoever posted first.",
    tone: "feature",
    top: 74,
    left: -1,
    width: 228,
  },
  {
    id: "care-top-ask",
    group: "care",
    channel: "feature-requests",
    tag: "top ask",
    text: "I can feel momentum, but I still cannot point to the top ask with confidence.",
    tone: "feature",
    top: 84,
    left: 7,
    width: 246,
  },
  {
    id: "care-demand",
    group: "care",
    channel: "feature-requests",
    tag: "demand",
    text: "Give me one list of what the community is actually pulling toward this week.",
    tone: "feature",
    top: 74,
    left: 79,
    width: 248,
  },
  {
    id: "care-direction",
    group: "care",
    channel: "feature-requests",
    tag: "direction",
    text: "We can see heat, but we still cannot see direction.",
    tone: "feature",
    top: 84,
    left: 67,
    width: 228,
  },
] as const;

function compressPercentage(value: number, center: number, factor: number): number {
  return center + (value - center) * factor;
}

const MOTION_PRESETS: readonly NoiseCardMotionSpec[] = [
  {
    rotate: -2.8,
    enterX: -28,
    enterY: -12,
    driftX: -6,
    driftY: 4,
    driftDuration: 6200,
    driftDelay: 0,
    radius: "20px 16px 18px 14px",
    layer: 2,
  },
  {
    rotate: 2.5,
    enterX: 26,
    enterY: -14,
    driftX: 5,
    driftY: -4,
    driftDuration: 6800,
    driftDelay: 120,
    radius: "16px 22px 14px 18px",
    layer: 4,
  },
  {
    rotate: -2,
    enterX: -26,
    enterY: 16,
    driftX: -5,
    driftY: -5,
    driftDuration: 6400,
    driftDelay: 220,
    radius: "18px 14px 20px 16px",
    layer: 3,
  },
  {
    rotate: 3.1,
    enterX: 30,
    enterY: 16,
    driftX: 6,
    driftY: 4,
    driftDuration: 7000,
    driftDelay: 80,
    radius: "18px 20px 14px 18px",
    layer: 5,
  },
] as const;

function getQuestionRevealProgress(currentMs: number, index: number): number {
  const revealStarts = QUESTION_STACK.map(
    (_, questionIndex) =>
      ENDING_STAGE_START_MS + ENDING_QUESTION_INITIAL_DELAY_MS + ENDING_QUESTION_STAGGER_MS * questionIndex,
  );
  return progressBetween(
    currentMs,
    revealStarts[index] ?? revealStarts[revealStarts.length - 1] ?? ENDING_STAGE_START_MS,
    (revealStarts[index] ?? revealStarts[revealStarts.length - 1] ?? ENDING_STAGE_START_MS) +
      ENDING_QUESTION_REVEAL_DURATION_MS,
  );
}

function getGroupEmphasis(currentMs: number, group: BlindSpotGroup): number {
  const progressMap = {
    talking: progressBetween(currentMs, shiftEndingMs(25940), shiftEndingMs(26420)),
    stuck: progressBetween(currentMs, shiftEndingMs(26740), shiftEndingMs(27220)),
    care: progressBetween(currentMs, shiftEndingMs(27540), shiftEndingMs(28020)),
  } as const;

  return 0.56 + progressMap[group] * 0.44;
}

function getCardStyle(
  card: NoiseCardSpec,
  motion: NoiseCardMotionSpec,
  launchDelayMs: number,
  emphasis: number,
): CSSProperties {
  const expandedTop = compressPercentage(card.top, 50, 0.79);
  const expandedLeft = compressPercentage(card.left, 50, 0.84);

  return {
    "--card-top": `${expandedTop}%`,
    "--card-left": `${expandedLeft}%`,
    "--card-width": `${card.width}px`,
    "--card-enter-x": `${motion.enterX}px`,
    "--card-enter-y": `${motion.enterY}px`,
    "--card-drift-x": `${motion.driftX}px`,
    "--card-drift-y": `${motion.driftY}px`,
    "--card-drift-duration": `${motion.driftDuration}ms`,
    "--card-drift-delay": `${motion.driftDelay}ms`,
    "--card-radius": motion.radius,
    "--card-rotate": `${motion.rotate}deg`,
    "--card-layer": motion.layer,
    "--card-launch-delay": `${launchDelayMs}ms`,
    "--card-emphasis": emphasis.toFixed(3),
  } as CSSProperties;
}

type DiscordNoiseCardStageProps = {
  currentMs: number;
};

export function DiscordNoiseCardStage(props: Readonly<DiscordNoiseCardStageProps>) {
  const { currentMs } = props;
  const stageOpacity = fadeWindow(currentMs, ENDING_STAGE_START_MS, 420, TOTAL_DURATION_MS, 0);
  const visibleCount = clamp(
    Math.floor((currentMs - shiftEndingMs(25420)) / 150) + 1,
    0,
    ENDING_CARDS.length,
  );

  if (stageOpacity <= 0.001) {
    return null;
  }

  return (
    <div className="discord-noise-stage" style={{ opacity: stageOpacity }} aria-hidden="true">
      <div className="discord-noise-stage__wash" />
      <div className="discord-noise-stage__grid" />
      <div className="discord-noise-stage__aura discord-noise-stage__aura--violet" />
      <div className="discord-noise-stage__aura discord-noise-stage__aura--blue" />

      {ENDING_CARDS.map((card, index) => {
        const motion = MOTION_PRESETS[index % MOTION_PRESETS.length];
        const emphasis = getGroupEmphasis(currentMs, card.group);

        return (
          <article
            key={card.id}
            className={[
              "discord-noise-card",
              `discord-noise-card--${card.tone}`,
              index < visibleCount ? "discord-noise-card--visible" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={getCardStyle(card, motion, index * 30, emphasis)}
          >
            <div className="discord-noise-card__surface">
              <div className="discord-noise-card__meta">
                <span className="discord-noise-card__channel">#{card.channel}</span>
                <span className="discord-noise-card__tag">{card.tag}</span>
              </div>
              <p>{card.text}</p>
            </div>
          </article>
        );
      })}

      <div className="discord-noise-stage__panel">
        <p className="discord-noise-stage__eyebrow">Community blind spots</p>

        <div className="discord-noise-stage__questions">
          {QUESTION_STACK.map((question, index) => {
            const revealProgress = getQuestionRevealProgress(currentMs, index);

            return (
              <p
                key={question}
                className={`discord-noise-stage__question-line discord-noise-stage__question-line--${index + 1}`}
                style={{
                  opacity: revealProgress,
                  transform: `translateY(${(1 - revealProgress) * 20}px) scale(${0.97 + revealProgress * 0.03})`,
                }}
              >
                {question}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
