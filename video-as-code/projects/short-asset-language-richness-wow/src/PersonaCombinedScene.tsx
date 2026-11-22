import { useEffect, useState, type CSSProperties } from "react";

import type { SceneMode } from "./discord-ui-state";
import {
  personaAssets,
  personaCombinedFooter,
  personaIdentity,
  personaTraitSignals,
  personaTraits,
  type TraitSignal,
} from "./persona-data";

type CombinedPhase = "gather" | "connect" | "logo" | "character";
type TraitKey = (typeof personaTraits)[number]["key"];

const TRAIT_CARD_CLASSNAMES: Record<TraitKey, string> = {
  name: "combined-card--name",
  tone: "combined-card--tone",
  backstory: "combined-card--backstory",
  phrases: "combined-card--phrases",
  avatar: "combined-card--avatar",
};

const CONNECTION_PATHS: Record<TraitKey, string> = {
  name: "M 441 144 C 478 150, 512 224, 560 314",
  tone: "M 679 144 C 642 150, 608 224, 560 314",
  backstory: "M 389 438 C 440 424, 486 378, 560 314",
  phrases: "M 731 438 C 680 424, 634 378, 560 314",
  avatar: "M 560 520 C 560 462, 560 404, 560 314",
};

function TraitIcon(props: { traitKey: TraitKey }) {
  const { traitKey } = props;

  if (traitKey === "name") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M6 18L12 6L18 18M8.2 14H15.8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
      </svg>
    );
  }

  if (traitKey === "tone") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M8 16.5C9.2 17.5 10.5 18 12 18C13.5 18 14.8 17.5 16 16.5M8 10C8 10 9.1 8.5 12 8.5C14.9 8.5 16 10 16 10M7.5 5.5L9.5 7.5M16.5 5.5L14.5 7.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
      </svg>
    );
  }

  if (traitKey === "backstory") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M6.5 7.5H17.5M6.5 11.5H15.5M6.5 15.5H12.5M6 4.5H18C19.1 4.5 20 5.4 20 6.5V17.5C20 18.6 19.1 19.5 18 19.5H6C4.9 19.5 4 18.6 4 17.5V6.5C4 5.4 4.9 4.5 6 4.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
      </svg>
    );
  }

  if (traitKey === "avatar") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <path
          d="M4.5 19.5C4.5 16.4624 6.96243 14 10 14H14C17.0376 14 19.5 16.4624 19.5 19.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.9"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M7 12H17M7 8H17M7 16H12M5.5 5.5H18.5C19.1 5.5 19.5 5.9 19.5 6.5V17.5C19.5 18.1 19.1 18.5 18.5 18.5H5.5C4.9 18.5 4.5 18.1 4.5 17.5V6.5C4.5 5.9 4.9 5.5 5.5 5.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function SignalIcon(props: { signal: TraitSignal["icon"] }) {
  const { signal } = props;

  if (signal === "identity") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <path
          d="M4 10.2V4.8C4 4.36 4.36 4 4.8 4H15.2C15.64 4 16 4.36 16 4.8V10.2C16 10.52 15.84 10.82 15.58 11L10 15L4.42 11C4.16 10.82 4 10.52 4 10.2Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (signal === "memory") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <path
          d="M5 4.5H15V15.5H5V4.5ZM7.5 7H12.5M7.5 10H12.5M7.5 13H10.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (signal === "voice") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <path
          d="M5 11.5V8.5M8 13.5V6.5M11 12V8M14 14.5V5.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
        />
      </svg>
    );
  }

  if (signal === "portrait") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <path
          d="M4.5 5.5H15.5V14.5H4.5V5.5ZM10 7.4C8.9 7.4 8 8.3 8 9.4C8 10.5 8.9 11.4 10 11.4C11.1 11.4 12 10.5 12 9.4C12 8.3 11.1 7.4 10 7.4ZM7.2 13.2C7.96 12.38 8.98 11.9 10 11.9C11.02 11.9 12.04 12.38 12.8 13.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    );
  }

  if (signal === "star") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <path
          d="M10 4.4L11.44 7.48L14.8 7.78L12.24 10.08L13 13.4L10 11.72L7 13.4L7.76 10.08L5.2 7.78L8.56 7.48L10 4.4Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path
        d="M10 4.5L10.92 7.92L14.34 8.84L10.92 9.76L10 13.18L9.08 9.76L5.66 8.84L9.08 7.92L10 4.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SignalRow(props: {
  direction: "forward" | "reverse";
  signals: readonly TraitSignal[];
  traitKey: TraitKey;
}) {
  const { direction, signals, traitKey } = props;
  const orderedSignals = direction === "forward" ? signals : [...signals].reverse();
  const repeatedSignals = [...orderedSignals, ...orderedSignals];

  return (
    <div className={`combined-card__ticker combined-card__ticker--${direction}`}>
      <div className="combined-card__ticker-track">
        {repeatedSignals.map((signal, index) => (
          <span className="combined-card__token" key={`${traitKey}-${direction}-${signal.label}-${index}`}>
            <span className="combined-card__token-icon">
              <SignalIcon signal={signal.icon} />
            </span>
            <span>{signal.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PersonaCombinedScene(props: { mode: SceneMode }) {
  const { mode } = props;
  const [phase, setPhase] = useState<CombinedPhase>(mode === "motion" ? "gather" : "connect");

  useEffect(() => {
    if (mode !== "motion") {
      setPhase("connect");
      return;
    }

    setPhase("gather");
    const timeouts: number[] = [];

    timeouts.push(window.setTimeout(() => setPhase("connect"), 3000));
    timeouts.push(window.setTimeout(() => setPhase("logo"), 6000));
    timeouts.push(window.setTimeout(() => setPhase("character"), 9000));

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [mode]);

  return (
    <section
      className={`persona-scene persona-combined persona-combined--${phase}${
        mode === "motion" ? " persona-scene--motion" : ""
      }`}
    >
      <div className="persona-combined__stage">
        <svg className="persona-combined__links" viewBox="0 0 1120 700" aria-hidden="true">
          {personaTraits.map((trait, index) => (
            <g
              className="combined-link"
              key={trait.key}
              style={{ "--beam-delay": `${160 + index * 220}ms` } as CSSProperties}
            >
              <path className="combined-link__base" d={CONNECTION_PATHS[trait.key]} pathLength={1} />
              <path className="combined-link__beam" d={CONNECTION_PATHS[trait.key]} pathLength={1} />
            </g>
          ))}
        </svg>

        {personaTraits.map((trait, index) => (
          <article
            className={`combined-card ${TRAIT_CARD_CLASSNAMES[trait.key]}`}
            key={trait.key}
            style={
              {
                "--card-delay": `${260 + index * 160}ms`,
                "--drawer-delay": `${560 + index * 160}ms`,
              } as CSSProperties
            }
          >
            <div className="combined-card__shell">
              <div className="combined-card__icon">
                <TraitIcon traitKey={trait.key} />
              </div>
              <div className="combined-card__content">
                <span className="combined-card__label">{trait.label}</span>
                <strong className="combined-card__value">{trait.shortValue ?? trait.value}</strong>
              </div>
              <span className="combined-card__caret" />
            </div>

            <div className="combined-card__drawer">
              <span className="combined-card__drawer-label">Signal stream</span>
              <SignalRow
                direction="forward"
                signals={personaTraitSignals[trait.key]}
                traitKey={trait.key}
              />
              <SignalRow
                direction="reverse"
                signals={personaTraitSignals[trait.key]}
                traitKey={trait.key}
              />
            </div>
          </article>
        ))}

        <div className="persona-combined__center">
          <span className="persona-combined__halo" />
          <span className="persona-combined__bot-orbit" />

          <div className="persona-combined__mark-shell">
            <span className="persona-combined__mark-sheen" />
            <img
              alt=""
              className="persona-combined__mark persona-combined__mark--gray"
              src={personaAssets.luciusLogoSrc}
            />
            <img
              alt=""
              className="persona-combined__mark persona-combined__mark--purple"
              src={personaAssets.luciusLogoSrc}
            />
          </div>

          <figure className="persona-combined__character-card">
            <img
              alt={`${personaIdentity.personaName} portrait`}
              className="persona-combined__character-image"
              src={personaAssets.luciCharacterSrc}
            />
            <figcaption className="persona-combined__character-badge">
              <strong>{personaIdentity.personaName}</strong>
              <span>{personaIdentity.chipLabel}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <p className="persona-combined__footer">{personaCombinedFooter}</p>

      <div
        className="persona-signature persona-appear"
        style={{ "--appear-delay": "180ms" } as CSSProperties}
      >
        <img alt="" className="persona-signature__mark" src={personaAssets.luciusLogoSrc} />
        <span className="persona-signature__word">{personaIdentity.brandName}</span>
      </div>
    </section>
  );
}
