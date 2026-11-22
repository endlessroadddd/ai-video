import type { ReactElement } from "react";

import { joinClassNames } from "../../lib/utils";

export type RecordingOutcomeModel = {
  kicker?: string;
  shippedInHours: number;
  summary: string;
};

type RecordingOutcomeCardProps = {
  animate?: boolean;
  className?: string;
  outcome: RecordingOutcomeModel;
};

export function RecordingOutcomeCard(
  props: Readonly<RecordingOutcomeCardProps>,
): ReactElement {
  const { animate = false, className, outcome } = props;
  const headline = `Shipped in ${outcome.shippedInHours} hours`;

  return (
    <div
      aria-hidden="true"
      className={joinClassNames("lucius-recording-outcome", className)}
      data-animate={animate ? "true" : "false"}
    >
      <div className="lucius-recording-outcome__matte" />

      <div className="lucius-recording-outcome__card">
        <span className="lucius-recording-outcome__kicker">
          {outcome.kicker || "Client outcome"}
        </span>
        <h2 className="lucius-recording-outcome__headline">{headline}</h2>
        <p className="lucius-recording-outcome__summary">{outcome.summary}</p>
      </div>
    </div>
  );
}
