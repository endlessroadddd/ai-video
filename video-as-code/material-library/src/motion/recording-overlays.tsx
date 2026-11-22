import type { CSSProperties } from "react";

import type {
  ClientChatRecordingIntertitle,
  ClientChatRecordingOutcomeScene,
} from "../chat/recording-scenario";

export type ClientChatRecordingOverlayPhase = "intro" | "hold" | "outro";

export type ClientChatRecordingBlankOverlayProps = {
  durationMs: number;
  phase?: ClientChatRecordingOverlayPhase;
};

export type ClientChatRecordingIntertitleOverlayProps = {
  intertitle: ClientChatRecordingIntertitle;
  phase?: ClientChatRecordingOverlayPhase;
};

export type ClientChatRecordingOutcomeOverlayProps = {
  kicker?: string;
  outcome: ClientChatRecordingOutcomeScene;
};

export function getClientChatRecordingIntertitleTotalDuration(
  intertitle: ClientChatRecordingIntertitle,
) {
  return (
    intertitle.copyDelayMs +
    intertitle.copyInDurationMs +
    intertitle.holdDurationMs +
    intertitle.outDurationMs
  );
}

export function ClientChatRecordingBlankOverlay({
  durationMs,
  phase = "intro",
}: ClientChatRecordingBlankOverlayProps) {
  const style = {
    "--recording-blank-duration": `${durationMs}ms`,
  } as CSSProperties;

  return (
    <div
      className="dashboard-chat-recording-blank"
      data-phase={phase}
      style={style}
      aria-hidden="true"
    >
      <div className="dashboard-chat-recording-blank-matte" />
    </div>
  );
}

export function ClientChatRecordingIntertitleOverlay({
  intertitle,
  phase = "intro",
}: ClientChatRecordingIntertitleOverlayProps) {
  const totalDurationMs = getClientChatRecordingIntertitleTotalDuration(intertitle);
  const outDelayMs =
    intertitle.copyDelayMs +
    intertitle.copyInDurationMs +
    intertitle.holdDurationMs;
  const style = {
    "--recording-intertitle-copy-delay": `${intertitle.copyDelayMs}ms`,
    "--recording-intertitle-copy-in-duration": `${intertitle.copyInDurationMs}ms`,
    "--recording-intertitle-out-delay": `${outDelayMs}ms`,
    "--recording-intertitle-out-duration": `${intertitle.outDurationMs}ms`,
    "--recording-intertitle-total-duration": `${totalDurationMs}ms`,
  } as CSSProperties;

  return (
    <div
      className="dashboard-chat-recording-intertitle"
      data-phase={phase}
      style={style}
      aria-hidden="true"
    >
      <div className="dashboard-chat-recording-intertitle-matte" />

      <div className="dashboard-chat-recording-intertitle-copy">
        <span className="dashboard-chat-recording-intertitle-kicker">
          {intertitle.kicker}
        </span>
        <h2 className="dashboard-chat-recording-intertitle-headline">
          {intertitle.headline}
        </h2>
        <p className="dashboard-chat-recording-intertitle-subline">
          {intertitle.subline}
        </p>
      </div>
    </div>
  );
}

export function ClientChatRecordingOutcomeOverlay({
  kicker = "Client outcome",
  outcome,
}: ClientChatRecordingOutcomeOverlayProps) {
  const headline = `Shipped in ${outcome.shippedInHours} hours`;

  return (
    <div className="dashboard-chat-recording-outcome" aria-hidden="true">
      <div className="dashboard-chat-recording-outcome-matte" />

      <div className="dashboard-chat-recording-outcome-card">
        <span className="dashboard-chat-recording-outcome-kicker">
          {kicker}
        </span>
        <h2 className="dashboard-chat-recording-outcome-headline">
          {headline}
        </h2>
        <p className="dashboard-chat-recording-outcome-summary">
          {outcome.summary}
        </p>
      </div>
    </div>
  );
}
