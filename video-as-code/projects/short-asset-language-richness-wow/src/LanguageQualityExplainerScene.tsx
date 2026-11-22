import type { CSSProperties } from "react";

import b2ExplainerBackgroundSrc from "./assets/b2-explainer-person-background.png";
import { brandAssets, languageQualityCards } from "./language-richness-data";
import type { SceneMode } from "./discord-ui-state";

function CardIcon(props: { kind: (typeof languageQualityCards)[number]["key"] }) {
  const { kind } = props;

  if (kind === "context") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M6 8L12 4L18 8L12 12L6 8Z" />
        <path d="M6 12L12 16L18 12" />
        <path d="M6 16L12 20L18 16" />
      </svg>
    );
  }

  if (kind === "patience") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7V12L15.5 14" />
      </svg>
    );
  }

  if (kind === "honesty") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 4L18 6.5V11.5C18 15.1 15.8 18.4 12 20C8.2 18.4 6 15.1 6 11.5V6.5L12 4Z" />
        <path d="M9 12.2L11.1 14.3L15.2 9.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 9.5C6 7.6 7.6 6 9.5 6H14.5C16.4 6 18 7.6 18 9.5V11.5C18 13.4 16.4 15 14.5 15H12L8.5 18V15C7.1 14.6 6 13.2 6 11.5V9.5Z" />
      <path d="M9.2 10.5H9.3M12 10.5H12.1M14.8 10.5H14.9" />
    </svg>
  );
}

function QualityCard(props: {
  card: (typeof languageQualityCards)[number];
  index: number;
}) {
  const { card, index } = props;

  return (
    <article
      aria-label={`${card.label}: ${card.caption}`}
      className={`quality-card quality-card--${card.key}`}
      style={{ "--quality-delay": `${2200 + index * 650}ms` } as CSSProperties}
    >
      <div className="quality-card__head">
        <div className="quality-card__head-text">
          <span className="quality-card__icon">
            <CardIcon kind={card.key} />
          </span>
          <strong>{card.label}</strong>
        </div>
        <div className="quality-card__metric">
          <em>{card.metric.value}</em>
          <span>{card.metric.unit}</span>
        </div>
      </div>
      
      <p className="quality-card__caption">{card.caption}</p>
      
      <span className="quality-card__rule" />
      
      <div className={`quality-card__viz quality-card__viz--${card.key}`} aria-hidden="true">
        {card.key === "tone" && (
          <div className="quality-card__spectrum">
            <span className="quality-card__spectrum-thumb" />
          </div>
        )}
        
        {card.key === "context" && (
          <div className="quality-card__tags">
            {(card as any).contextTags?.map((tag: string, i: number) => (
              <span 
                key={tag} 
                className="quality-card__tag-chip"
                style={{ "--chip-delay": `${i * 240}ms` } as CSSProperties}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {card.key === "patience" && (
          <div className="quality-card__typing">
            <span className="quality-card__typing-dot" />
            <span className="quality-card__typing-dot" />
            <span className="quality-card__typing-dot" />
          </div>
        )}
        
        {card.key === "honesty" && (
          <div className="quality-card__honesty-wrap">
            <span className="quality-card__ai-badge">Verified AI</span>
            <span className="quality-card__honesty-bubble">Always Disclosed</span>
          </div>
        )}
      </div>
    </article>
  );
}

export function LanguageQualityExplainerScene(props: { mode: SceneMode }) {
  const { mode } = props;

  return (
    <section
      className={`language-quality-scene${mode === "motion" ? " language-quality-scene--motion" : ""}`}
    >
      <img
        alt=""
        className="language-quality-scene__background"
        decoding="async"
        loading="eager"
        src={b2ExplainerBackgroundSrc}
      />

      <div className="language-quality-scene__brand">
        <img alt="" src={brandAssets.luciusLogoSrc} />
        <span>Lucius</span>
      </div>

      <div className="language-quality-scene__copy">
        <h1>
          Language <br />
          quality is <br />
          <em>designed.</em>
        </h1>
        <aside className="quality-note" aria-label="Honesty note">
          <span>People first.</span>
          <span>AI second.</span>
          <strong>Always honest.</strong>
        </aside>
      </div>

      <div className="language-quality-scene__system" aria-label="Language quality system diagram">
        <svg className="quality-orbit" viewBox="0 0 900 650" aria-hidden="true">
          <ellipse className="quality-orbit__path quality-orbit__path--ring" cx="452" cy="318" rx="420" ry="270" />
          <path className="quality-orbit__path quality-orbit__connector" d="M242 78C300 56 366 56 424 82" />
          <path className="quality-orbit__path quality-orbit__connector" d="M528 82C590 56 660 58 724 82" />
          <path className="quality-orbit__path quality-orbit__connector" d="M242 404C296 440 344 456 396 454" />
          <path className="quality-orbit__path quality-orbit__connector" d="M724 404C670 444 610 458 552 454" />
          <circle className="quality-orbit__node" cx="242" cy="78" r="5" />
          <circle className="quality-orbit__node" cx="724" cy="82" r="5" />
          <circle className="quality-orbit__node" cx="242" cy="404" r="5" />
          <circle className="quality-orbit__node" cx="724" cy="404" r="5" />
        </svg>

        <div className="quality-portrait">
          <span className="quality-portrait__halo" />
          <span className="quality-portrait__silhouette" />
        </div>

        {languageQualityCards.map((card, index) => (
          <QualityCard card={card} index={index} key={card.key} />
        ))}

        <article className="quality-chat-card">
          <header>
            <div className="quality-chat-card__icon">
              <img alt="" src={brandAssets.luciusLogoSrc} />
            </div>
            <strong>Conversational continuity</strong>
          </header>
          <div className="quality-chat-card__line quality-chat-card__line--user">
            whats ur name? leaving a 5★ fr
          </div>
          <div className="quality-chat-card__line quality-chat-card__line--bot">
            Lucius. ngl tho — i'm AI, not a human
          </div>
          <div className="quality-chat-card__line quality-chat-card__line--user quality-chat-card__line--small">
            wow.
          </div>
        </article>
      </div>
    </section>
  );
}
