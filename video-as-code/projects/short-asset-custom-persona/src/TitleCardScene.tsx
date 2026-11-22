import type { CSSProperties } from "react";

import { personaAssets, personaIdentity, type HighlightFragment } from "./persona-data";
import type { SceneMode } from "./discord-ui-state";

type TitleCardSceneProps = {
  kicker: string;
  mode: SceneMode;
  titleFragments: readonly HighlightFragment[];
  subtitleFragments?: readonly HighlightFragment[];
  showChip?: boolean;
  outro?: boolean;
  centeredOutro?: boolean;
};

function renderFragments(fragments: readonly HighlightFragment[]) {
  return fragments.map((fragment, index) => (
    <span
      className={fragment.accent ? "title-card__accent" : undefined}
      key={`${fragment.text}-${index}`}
    >
      {fragment.text}
    </span>
  ));
}

export function TitleCardScene(props: TitleCardSceneProps) {
  const {
    kicker,
    mode,
    outro = false,
    showChip = false,
    centeredOutro = false,
    subtitleFragments,
    titleFragments,
  } = props;

  return (
    <section
      className={`persona-scene title-card${mode === "motion" ? " persona-scene--motion" : ""}${
        outro ? " title-card--outro" : ""
      }${showChip ? " title-card--with-chip" : ""}${centeredOutro ? " title-card--centered-outro" : ""}`}
    >
      <div className="title-card__stack">
        <div
          className="title-card__eyebrow persona-appear"
          style={{ "--appear-delay": "0ms" } as CSSProperties}
        >
          <span className="title-card__eyebrow-dot" />
          {kicker}
        </div>

        <h1
          className="title-card__title persona-appear"
          style={{ "--appear-delay": "120ms" } as CSSProperties}
        >
          {renderFragments(titleFragments)}
        </h1>

        {subtitleFragments ? (
          <p
            className="title-card__subtitle persona-appear"
            style={{ "--appear-delay": "240ms" } as CSSProperties}
          >
            {renderFragments(subtitleFragments)}
          </p>
        ) : null}

        {centeredOutro ? (
          <div className="title-card__footer-cluster">
            {showChip ? (
              <div
                className="luci-chip persona-appear"
                style={{ "--appear-delay": "360ms" } as CSSProperties}
              >
                <img alt={`${personaIdentity.personaName} avatar`} src={personaAssets.luciAvatarSrc} />
                <div className="luci-chip__meta">
                  <strong>{personaIdentity.personaName}</strong>
                  <span>{personaIdentity.chipLabel}</span>
                </div>
              </div>
            ) : null}

            <div
              className="persona-signature persona-appear"
              style={{ "--appear-delay": "140ms" } as CSSProperties}
            >
              <img alt="" className="persona-signature__mark" src={personaAssets.luciusLogoSrc} />
              <span className="persona-signature__word">{personaIdentity.brandName}</span>
            </div>
          </div>
        ) : null}
      </div>

      {!centeredOutro ? (
        <div
          className="persona-signature persona-appear"
          style={{ "--appear-delay": "140ms" } as CSSProperties}
        >
          <img alt="" className="persona-signature__mark" src={personaAssets.luciusLogoSrc} />
          <span className="persona-signature__word">{personaIdentity.brandName}</span>
        </div>
      ) : null}

      {showChip && !centeredOutro ? (
        <div
          className="luci-chip persona-appear"
          style={{ "--appear-delay": "360ms" } as CSSProperties}
        >
          <img alt={`${personaIdentity.personaName} avatar`} src={personaAssets.luciAvatarSrc} />
          <div className="luci-chip__meta">
            <strong>{personaIdentity.personaName}</strong>
            <span>{personaIdentity.chipLabel}</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
