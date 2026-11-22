import { CHAT_HISTORY, RISK_STATE, WRONG_ANSWER_MESSAGES } from "../data/story";
import { easeOutCubic, mix, ramp } from "../lib/motion";
import type { SceneMode } from "../types";
import { EnterpriseChatShell } from "../components/EnterpriseChatShell";
import { ManualTakeoverCard } from "../components/ManualTakeoverCard";
import { RiskBanner } from "../components/RiskBanner";

type ClientRiskSceneProps = {
  mode: SceneMode;
  t: number;
};

export function ClientRiskScene(props: ClientRiskSceneProps) {
  const { mode, t } = props;
  const stageIn = easeOutCubic(ramp(t, 0, 650));
  const bannerIn = easeOutCubic(ramp(t, 450, 1_250));
  const cardIn = easeOutCubic(ramp(t, 1_300, 2_200));
  const endingIn = easeOutCubic(ramp(t, 3_300, 4_700));
  const showBanner = mode === "static" || bannerIn > 0.05;
  const showCard = mode === "static" || cardIn > 0.05;

  return (
    <div
      className="scene-frame scene-frame--stacked"
      style={{
        opacity: stageIn,
        transform: `translate3d(0, ${mix(18, 0, stageIn)}px, 0)`,
      }}
    >
      <EnterpriseChatShell
        assistantBadge="Matched source: Previous billing policy"
        highlightAssistant
        historyItems={CHAT_HISTORY}
        messages={WRONG_ANSWER_MESSAGES}
        statusPill="Escalated"
        threadTitle="Seat reduction credit clarification"
      />

      {showBanner ? (
        <div
          className="chat-overlay chat-overlay--top"
          style={{
            opacity: mode === "static" ? 1 : bannerIn,
            transform: `translate3d(0, ${mix(-10, 0, mode === "static" ? 1 : bannerIn)}px, 0)`,
          }}
        >
          <RiskBanner label={RISK_STATE.banner} />
        </div>
      ) : null}

      {showCard ? (
        <div
          className="chat-overlay chat-overlay--side"
          style={{
            opacity: mode === "static" ? 1 : cardIn,
            transform: `translate3d(${mix(18, 0, mode === "static" ? 1 : cardIn)}px, 0, 0)`,
          }}
        >
          <ManualTakeoverCard
            action={RISK_STATE.action}
            note={RISK_STATE.note}
            tag={RISK_STATE.tag}
          />
        </div>
      ) : null}

      <div
        className="chat-ending"
        style={{
          opacity: mode === "static" ? 1 : endingIn,
          transform: `translate3d(0, ${mix(14, 0, mode === "static" ? 1 : endingIn)}px, 0)`,
        }}
      >
        <p>{RISK_STATE.ending}</p>
        <span>{RISK_STATE.endingSubline}</span>
      </div>
    </div>
  );
}
