import type { CSSProperties } from "react";

import type { SceneMode } from "./discord-ui-state";
import { personaAssets, personaDecomposeCaption, personaIdentity, personaTraits } from "./persona-data";

const TRAIT_CARD_CLASSNAMES: Record<(typeof personaTraits)[number]["key"], string> = {
  name: "trait-card--name",
  tone: "trait-card--tone",
  backstory: "trait-card--backstory",
  phrases: "trait-card--phrases",
  avatar: "trait-card--avatar",
};

function TraitIcon(props: { traitKey: (typeof personaTraits)[number]["key"] }) {
  const { traitKey } = props;

  if (traitKey === "avatar") {
    return (
      <span className="trait-card__thumb-shell">
        <img alt="" className="trait-card__thumb" src={personaAssets.luciAvatarSrc} />
      </span>
    );
  }

  if (traitKey === "name") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M6 18L12 6L18 18M8.2 14H15.8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
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
          strokeWidth="1.8"
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
          strokeWidth="1.8"
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
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CoreIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r="24" fill="rgba(255,255,255,0.82)" />
      <path
        d="M24 38C24 31.4 29.4 26 36 26C42.6 26 48 31.4 48 38V46H24V38ZM30 22H42M29 51H43"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <circle cx="31" cy="36" r="2.5" fill="currentColor" />
      <circle cx="41" cy="36" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function PersonaDecomposeScene(props: { mode: SceneMode }) {
  const { mode } = props;

  return (
    <section className={`persona-scene persona-decompose${mode === "motion" ? " persona-scene--motion" : ""}`}>
      <p
        className="persona-caption persona-appear"
        style={{ "--appear-delay": "60ms" } as CSSProperties}
      >
        {personaDecomposeCaption}
      </p>

      <div className="persona-decompose__stage">
        <svg className="persona-decompose__links" viewBox="0 0 1120 620" aria-hidden="true">
          <line
            className={`persona-link${mode === "motion" ? " persona-link--motion" : ""}`}
            style={{ "--line-delay": "200ms" } as CSSProperties}
            x1="560"
            x2="252"
            y1="310"
            y2="154"
          />
          <line
            className={`persona-link${mode === "motion" ? " persona-link--motion" : ""}`}
            style={{ "--line-delay": "340ms" } as CSSProperties}
            x1="560"
            x2="864"
            y1="310"
            y2="154"
          />
          <line
            className={`persona-link${mode === "motion" ? " persona-link--motion" : ""}`}
            style={{ "--line-delay": "480ms" } as CSSProperties}
            x1="560"
            x2="212"
            y1="310"
            y2="352"
          />
          <line
            className={`persona-link${mode === "motion" ? " persona-link--motion" : ""}`}
            style={{ "--line-delay": "620ms" } as CSSProperties}
            x1="560"
            x2="904"
            y1="310"
            y2="356"
          />
          <line
            className={`persona-link${mode === "motion" ? " persona-link--motion" : ""}`}
            style={{ "--line-delay": "760ms" } as CSSProperties}
            x1="560"
            x2="560"
            y1="310"
            y2="510"
          />
        </svg>

        <div className={`persona-core${mode === "motion" ? " persona-core--motion" : ""}`}>
          <div className="persona-core__icon">
            <CoreIcon />
          </div>
          <strong>AI core</strong>
          <span>Neutral until configured</span>
        </div>

        {personaTraits.map((trait, index) => (
          <article
            className={`trait-card ${TRAIT_CARD_CLASSNAMES[trait.key]}${
              mode === "motion" ? " trait-card--motion" : ""
            }`}
            key={trait.key}
            style={{ "--card-delay": `${180 + index * 140}ms` } as CSSProperties}
          >
            {trait.key === "phrases" && (
              <div className="trait-ui-chat">
                <div className="trait-ui-chat__header">
                  <div className="trait-ui-chat__dot" />
                  <span>Signature phrases</span>
                </div>
                <div className="trait-ui-chat__body">
                  <div className="msg-box left">Any tics?</div>
                  <div className="msg-box right">{trait.value}</div>
                </div>
              </div>
            )}

            {trait.key === "name" && (
              <div className="trait-ui-badge">
                <div className="trait-ui-badge__header">
                  <div className="trait-ui-badge__icon">
                    <TraitIcon traitKey="name" />
                  </div>
                </div>
                <div className="trait-ui-badge__content">
                  <span className="label">Identity Tag</span>
                  <strong className="value">{trait.value}</strong>
                  <div className="verified-chip">Verified Persona</div>
                </div>
              </div>
            )}

            {trait.key === "tone" && (
              <div className="trait-ui-tone">
                <div className="trait-ui-tone__viz">
                  {[...Array(6)].map((_, i) => (
                    <div className="wave-bar" key={i} />
                  ))}
                </div>
                <div className="trait-ui-tone__content">
                  <span className="label">Voice Tone</span>
                  <strong className="value">{trait.value}</strong>
                  <div className="slider-track">
                    <div className="slider-fill" />
                  </div>
                </div>
              </div>
            )}

            {trait.key === "backstory" && (
              <div className="trait-ui-log">
                <div className="trait-ui-log__header">
                  <code>MEMORY_CORE.LOG</code>
                </div>
                <div className="trait-ui-log__body">
                  <div className="log-line"><span>&gt;</span> ACCESSING...</div>
                  <div className="log-line"><span>&gt;</span> {trait.value}</div>
                </div>
              </div>
            )}

            {trait.key === "avatar" && (
              <div className="trait-ui-polaroid">
                <div className="trait-ui-polaroid__photo">
                  <img src={personaAssets.luciAvatarSrc} alt="" />
                </div>
                <div className="trait-ui-polaroid__caption">
                  <span>{trait.value}</span>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <div
        className="persona-signature persona-appear"
        style={{ "--appear-delay": "160ms" } as CSSProperties}
      >
        <img alt="" className="persona-signature__mark" src={personaAssets.luciusLogoSrc} />
        <span className="persona-signature__word">{personaIdentity.brandName}</span>
      </div>
    </section>
  );
}
