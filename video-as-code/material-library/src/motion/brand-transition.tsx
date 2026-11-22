import type { CSSProperties } from "react";

import { LuciusLogoMark } from "../icons/lucius-logo-mark";

export type BrandStagePhase =
  | "scene-five-stage"
  | "scene-five-cards"
  | "scene-five-logo"
  | "scene-five-pulse"
  | "scene-five-clear"
  | "scene-five-done";

export type NoiseCardTone = "ivory" | "lavender";

export type NoiseCardSpec = {
  clearX: number;
  clearY: number;
  id: string;
  left: number;
  text: string;
  tone: NoiseCardTone;
  top: number;
  width: number;
};

export type NoiseCardMotionSpec = {
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

export type BrandTransitionRingProps = {
  className?: string;
};

export type NoiseCardProps = {
  card: NoiseCardSpec;
  className?: string;
  cleared?: boolean;
  launchDelayMs?: number;
  motion: NoiseCardMotionSpec;
  visible?: boolean;
};

export type NoiseCardStageProps = {
  cards?: readonly NoiseCardSpec[];
  className?: string;
  line?: string;
  motionPresets?: readonly NoiseCardMotionSpec[];
  phase?: BrandStagePhase;
  showRing?: boolean;
  visibleCount?: number;
};

export const DEFAULT_NOISE_CARD_SPECS: readonly NoiseCardSpec[] = [
  {
    id: "card-received",
    text: "I've received your issue.",
    tone: "ivory",
    top: 11,
    left: 10,
    clearX: -154,
    clearY: -102,
    width: 176,
  },
  {
    id: "card-concern",
    text: "I understand your concern.",
    tone: "lavender",
    top: 17,
    left: 22,
    clearX: -112,
    clearY: -88,
    width: 194,
  },
  {
    id: "card-patient",
    text: "Please stay patient.",
    tone: "ivory",
    top: 25,
    left: 12,
    clearX: -136,
    clearY: -42,
    width: 174,
  },
  {
    id: "card-wait",
    text: "Please wait a moment.",
    tone: "lavender",
    top: 10,
    left: 67,
    clearX: 150,
    clearY: -104,
    width: 186,
  },
  {
    id: "card-open",
    text: "Please keep this chat open.",
    tone: "ivory",
    top: 24,
    left: 72,
    clearX: 148,
    clearY: -40,
    width: 206,
  },
  {
    id: "card-here",
    text: "I'll be here for you.",
    tone: "ivory",
    top: 17,
    left: 58,
    clearX: 104,
    clearY: -94,
    width: 176,
  },
  {
    id: "card-thanks",
    text: "Thank you for your patience.",
    tone: "lavender",
    top: 70,
    left: 13,
    clearX: -146,
    clearY: 118,
    width: 214,
  },
  {
    id: "card-reviewed",
    text: "This is being reviewed.",
    tone: "lavender",
    top: 69,
    left: 68,
    clearX: 144,
    clearY: 116,
    width: 196,
  },
  {
    id: "card-update",
    text: "Thank you for the update.",
    tone: "ivory",
    top: 33,
    left: 7,
    clearX: -162,
    clearY: 12,
    width: 188,
  },
  {
    id: "card-later",
    text: "Please try again later.",
    tone: "lavender",
    top: 42,
    left: 12,
    clearX: -158,
    clearY: 24,
    width: 188,
  },
  {
    id: "card-reviewing",
    text: "Please wait while I review.",
    tone: "ivory",
    top: 54,
    left: 15,
    clearX: -150,
    clearY: 64,
    width: 196,
  },
  {
    id: "card-hold",
    text: "Please hold on a little longer.",
    tone: "lavender",
    top: 61,
    left: 24,
    clearX: -122,
    clearY: 92,
    width: 218,
  },
  {
    id: "card-logged",
    text: "I've noted your request.",
    tone: "ivory",
    top: 6,
    left: 44,
    clearX: 0,
    clearY: -134,
    width: 180,
  },
  {
    id: "card-checking",
    text: "I'm checking this for you.",
    tone: "lavender",
    top: 15,
    left: 76,
    clearX: 154,
    clearY: -74,
    width: 188,
  },
  {
    id: "card-urgent",
    text: "I understand this feels urgent.",
    tone: "ivory",
    top: 33,
    left: 76,
    clearX: 162,
    clearY: 10,
    width: 220,
  },
  {
    id: "card-allow-time",
    text: "Please allow more time.",
    tone: "lavender",
    top: 45,
    left: 74,
    clearX: 154,
    clearY: 28,
    width: 190,
  },
  {
    id: "card-reviewing-still",
    text: "This is still being checked.",
    tone: "ivory",
    top: 58,
    left: 75,
    clearX: 156,
    clearY: 72,
    width: 198,
  },
  {
    id: "card-keep-open",
    text: "Please keep this conversation open.",
    tone: "lavender",
    top: 78,
    left: 38,
    clearX: -42,
    clearY: 132,
    width: 228,
  },
  {
    id: "card-following-up",
    text: "I'll continue following up.",
    tone: "ivory",
    top: 77,
    left: 56,
    clearX: 44,
    clearY: 132,
    width: 196,
  },
  {
    id: "card-appreciate",
    text: "Thank you for your understanding.",
    tone: "lavender",
    top: 6,
    left: 57,
    clearX: 56,
    clearY: -132,
    width: 228,
  },
] as const;

export const DEFAULT_NOISE_CARD_MOTION_PRESETS: readonly NoiseCardMotionSpec[] = [
  {
    rotate: -5.6,
    enterX: -46,
    enterY: -24,
    driftX: -8,
    driftY: 7,
    driftDuration: 5480,
    driftDelay: 0,
    radius: "30px 18px 24px 16px",
    layer: 2,
  },
  {
    rotate: 4.8,
    enterX: 34,
    enterY: -28,
    driftX: 7,
    driftY: -6,
    driftDuration: 5920,
    driftDelay: 120,
    radius: "18px 30px 18px 26px",
    layer: 5,
  },
  {
    rotate: -2.9,
    enterX: -28,
    enterY: 24,
    driftX: -6,
    driftY: -8,
    driftDuration: 5660,
    driftDelay: 260,
    radius: "24px 16px 28px 20px",
    layer: 1,
  },
  {
    rotate: 6.4,
    enterX: 44,
    enterY: 18,
    driftX: 10,
    driftY: 6,
    driftDuration: 6280,
    driftDelay: 90,
    radius: "20px 32px 18px 24px",
    layer: 6,
  },
  {
    rotate: -4.1,
    enterX: -36,
    enterY: 30,
    driftX: -7,
    driftY: 5,
    driftDuration: 5840,
    driftDelay: 180,
    radius: "28px 20px 22px 18px",
    layer: 3,
  },
  {
    rotate: 2.7,
    enterX: 24,
    enterY: -18,
    driftX: 6,
    driftY: 8,
    driftDuration: 5720,
    driftDelay: 40,
    radius: "16px 24px 30px 18px",
    layer: 4,
  },
] as const;

function getDefaultVisibleCount(
  phase: BrandStagePhase,
  cards: readonly NoiseCardSpec[],
) {
  if (phase === "scene-five-stage") {
    return 0;
  }

  return cards.length;
}

export function BrandTransitionRing({
  className,
}: BrandTransitionRingProps) {
  return (
    <div
      className={["brand-transition-layer", className].filter(Boolean).join(" ")}
    >
      <div className="brand-transition-ring" />
    </div>
  );
}

export function NoiseCard({
  card,
  className,
  cleared = false,
  launchDelayMs = 0,
  motion,
  visible = false,
}: NoiseCardProps) {
  const style = {
    "--card-top": `${card.top}%`,
    "--card-left": `${card.left}%`,
    "--card-width": `${card.width}px`,
    "--card-clear-x": `${card.clearX}px`,
    "--card-clear-y": `${card.clearY}px`,
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
  } as CSSProperties;

  return (
    <div
      className={[
        "noise-card",
        `noise-card--${card.tone}`,
        visible ? "noise-card--visible" : "",
        cleared ? "noise-card--cleared" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      <div className="noise-card__surface">
        <p>{card.text}</p>
      </div>
    </div>
  );
}

export function NoiseCardStage({
  cards = DEFAULT_NOISE_CARD_SPECS,
  className,
  line = "Catch you before users do",
  motionPresets = DEFAULT_NOISE_CARD_MOTION_PRESETS,
  phase = "scene-five-cards",
  showRing = false,
  visibleCount = getDefaultVisibleCount(phase, cards),
}: NoiseCardStageProps) {
  const clampedVisibleCount = Math.max(0, Math.min(visibleCount, cards.length));
  const shouldClear =
    phase === "scene-five-clear" || phase === "scene-five-done";
  const logoVisible =
    phase === "scene-five-logo" ||
    phase === "scene-five-pulse" ||
    phase === "scene-five-clear" ||
    phase === "scene-five-done";

  return (
    <>
      {showRing ? <BrandTransitionRing /> : null}

      <div
        className={["brand-stage", `brand-stage--${phase}`, className]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="brand-stage__aura brand-stage__aura--orchid" />
        <div className="brand-stage__aura brand-stage__aura--lavender" />

        {cards.map((card, index) => (
          <NoiseCard
            key={card.id}
            card={card}
            motion={motionPresets[index % motionPresets.length]}
            visible={index < clampedVisibleCount}
            cleared={shouldClear}
            launchDelayMs={index * 36}
          />
        ))}

        <div className="brand-stage__center">
          <div
            className={[
              "brand-logo-mark",
              logoVisible ? "brand-logo-mark--visible" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <LuciusLogoMark />
          </div>

          {phase === "scene-five-done" ? (
            <p className="brand-stage__line">{line}</p>
          ) : null}
        </div>
      </div>
    </>
  );
}
