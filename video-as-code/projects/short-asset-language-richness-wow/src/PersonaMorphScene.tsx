import { useEffect, useState, type CSSProperties } from "react";

import type { SceneMode } from "./discord-ui-state";
import {
  personaAssets,
  personaIdentity,
  personaMorphCaptionEnd,
  personaMorphCaptionStart,
  personaTraits,
} from "./persona-data";

type MorphPhase = "gather" | "logo" | "inject" | "character";

const ORBIT_POSITIONS: Record<
  (typeof personaTraits)[number]["key"],
  { x: string; y: string; delay: string }
> = {
  name: { x: "-300px", y: "-176px", delay: "120ms" },
  tone: { x: "284px", y: "-180px", delay: "220ms" },
  backstory: { x: "-356px", y: "48px", delay: "320ms" },
  phrases: { x: "332px", y: "58px", delay: "420ms" },
  avatar: { x: "0px", y: "236px", delay: "520ms" },
};

function MorphCaption(props: { caption: string }) {
  const { caption } = props;

  return (
    <p className="persona-caption persona-caption--swap" key={caption}>
      {caption}
    </p>
  );
}

export function PersonaMorphScene(props: { mode: SceneMode }) {
  const { mode } = props;
  const [phase, setPhase] = useState<MorphPhase>(mode === "motion" ? "gather" : "character");

  useEffect(() => {
    if (mode !== "motion") {
      setPhase("character");
      return;
    }

    setPhase("gather");
    const timeouts: number[] = [];

    timeouts.push(window.setTimeout(() => setPhase("logo"), 1700));
    timeouts.push(window.setTimeout(() => setPhase("inject"), 3000));
    timeouts.push(window.setTimeout(() => setPhase("character"), 4400));

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [mode]);

  const caption =
    phase === "inject" || phase === "character"
      ? personaMorphCaptionEnd
      : personaMorphCaptionStart;

  return (
    <section
      className={`persona-scene persona-morph persona-morph--${phase}${
        mode === "motion" ? " persona-scene--motion" : ""
      }`}
    >
      <MorphCaption caption={caption} key={caption} />

      <div className="persona-morph__stage">
        {personaTraits.map((trait) => (
          <div
            className="persona-morph__orbit-item"
            key={trait.key}
            style={
              {
                "--orbit-x": ORBIT_POSITIONS[trait.key].x,
                "--orbit-y": ORBIT_POSITIONS[trait.key].y,
                "--orbit-delay": ORBIT_POSITIONS[trait.key].delay,
              } as CSSProperties
            }
          >
            <span className="persona-morph__orbit-label">{trait.label}</span>
            <strong className="persona-morph__orbit-value">{trait.value}</strong>
          </div>
        ))}

        <div className="persona-morph__halo" />

        <div className="persona-morph__logo-stack" aria-hidden="true">
          <img className="persona-morph__logo persona-morph__logo--base" src={personaAssets.luciusLogoSrc} />
          <img className="persona-morph__logo persona-morph__logo--glow" src={personaAssets.luciusLogoSrc} />
        </div>

        <figure className="persona-morph__character-card">
          <img
            alt={`${personaIdentity.personaName} character portrait`}
            className="persona-morph__character-image"
            src={personaAssets.luciCharacterSrc}
          />
          <figcaption className="persona-morph__character-badge">
            <strong>{personaIdentity.personaName}</strong>
            <span>{personaIdentity.chipLabel}</span>
          </figcaption>
        </figure>
      </div>

      <div className="persona-signature">
        <img alt="" className="persona-signature__mark" src={personaAssets.luciusLogoSrc} />
        <span className="persona-signature__word">{personaIdentity.brandName}</span>
      </div>
    </section>
  );
}
