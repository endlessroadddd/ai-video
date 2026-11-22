import type { CSSProperties, ReactElement } from "react";

import { joinClassNames } from "../../lib/utils";

export type RecordingIntertitleModel = {
  copyDelayMs: number;
  copyInDurationMs: number;
  headline: string;
  holdDurationMs: number;
  kicker: string;
  outDurationMs: number;
  subline: string;
};

type RecordingIntertitleProps = {
  animate?: boolean;
  className?: string;
  intertitle: RecordingIntertitleModel;
};

type RecordingCssVariables = CSSProperties & {
  "--recording-intertitle-copy-delay"?: string;
  "--recording-intertitle-copy-in-duration"?: string;
  "--recording-intertitle-out-delay"?: string;
  "--recording-intertitle-out-duration"?: string;
};

export function RecordingIntertitle(
  props: Readonly<RecordingIntertitleProps>,
): ReactElement {
  const { animate = false, className, intertitle } = props;
  const outDelayMs = intertitle.copyDelayMs + intertitle.holdDurationMs;
  const style: RecordingCssVariables = {
    "--recording-intertitle-copy-delay": `${intertitle.copyDelayMs}ms`,
    "--recording-intertitle-copy-in-duration": `${intertitle.copyInDurationMs}ms`,
    "--recording-intertitle-out-delay": `${outDelayMs}ms`,
    "--recording-intertitle-out-duration": `${intertitle.outDurationMs}ms`,
  };

  return (
    <div
      aria-hidden="true"
      className={joinClassNames("lucius-recording-intertitle", className)}
      data-animate={animate ? "true" : "false"}
      style={style}
    >
      <div className="lucius-recording-intertitle__matte" />

      <div className="lucius-recording-intertitle__copy">
        <span className="lucius-recording-intertitle__kicker">
          {intertitle.kicker}
        </span>
        <h2 className="lucius-recording-intertitle__headline">
          {intertitle.headline}
        </h2>
        <p className="lucius-recording-intertitle__subline">
          {intertitle.subline}
        </p>
      </div>
    </div>
  );
}
