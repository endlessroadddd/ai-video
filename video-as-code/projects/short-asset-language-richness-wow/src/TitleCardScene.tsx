import type { CSSProperties } from "react";

import { brandAssets, brandIdentity, type HighlightFragment } from "./language-richness-data";
import type { SceneMode } from "./discord-ui-state";

type TitleCardSceneProps = {
  kicker: string;
  mode: SceneMode;
  titleFragments: readonly HighlightFragment[];
  subtitleFragments?: readonly HighlightFragment[];
  showChip?: boolean;
  outro?: boolean;
  centeredOutro?: boolean;
  unifiedOpening?: boolean;
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
    unifiedOpening = false,
  } = props;

  return (
    <section
      className={`persona-scene title-card${mode === "motion" ? " persona-scene--motion" : ""}${
        outro ? " title-card--outro" : ""
      }${showChip ? " title-card--with-chip" : ""}${centeredOutro ? " title-card--centered-outro" : ""}${
        unifiedOpening ? " title-card--unified-opening" : ""
      }`}
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
          style={{ "--appear-delay": "420ms" } as CSSProperties}
        >
          {renderFragments(titleFragments)}
        </h1>

        {subtitleFragments ? (
          <p
            className="title-card__subtitle persona-appear"
            style={{ "--appear-delay": "820ms" } as CSSProperties}
          >
            {renderFragments(subtitleFragments)}
          </p>
        ) : null}

        {centeredOutro ? (
          <div className="title-card__footer-cluster">
            {showChip ? (
              <div
                className="luci-chip persona-appear"
                style={{ "--appear-delay": "1220ms" } as CSSProperties}
              >
                <img alt={`${brandIdentity.personaName} avatar`} src={brandAssets.luciAvatarSrc} />
                <div className="luci-chip__meta">
                  <strong>{brandIdentity.personaName}</strong>
                  <span>{brandIdentity.chipLabel}</span>
                </div>
              </div>
            ) : null}

            <div
              className="persona-signature persona-appear"
              style={{ "--appear-delay": "560ms" } as CSSProperties}
            >
              <img alt="" className="persona-signature__mark" src={brandAssets.luciusLogoSrc} />
              <span className="persona-signature__word">{brandIdentity.brandName}</span>
            </div>
          </div>
        ) : null}
      </div>

      {!centeredOutro ? (
        <div
          className="persona-signature persona-appear"
          style={{ "--appear-delay": "560ms" } as CSSProperties}
        >
          <img alt="" className="persona-signature__mark" src={brandAssets.luciusLogoSrc} />
          <span className="persona-signature__word">{brandIdentity.brandName}</span>
        </div>
      ) : null}

      {showChip && !centeredOutro ? (
        <div
          className="luci-chip persona-appear"
          style={{ "--appear-delay": "1220ms" } as CSSProperties}
        >
          <img alt={`${brandIdentity.personaName} avatar`} src={brandAssets.luciAvatarSrc} />
          <div className="luci-chip__meta">
            <strong>{brandIdentity.personaName}</strong>
            <span>{brandIdentity.chipLabel}</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
