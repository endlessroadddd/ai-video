import { CHAT_HISTORY, WRONG_ANSWER_MESSAGES } from "../data/story";
import { easeOutCubic, mix, ramp } from "../lib/motion";
import type { SceneMode } from "../types";
import { EnterpriseChatShell } from "../components/EnterpriseChatShell";

type WrongAnswerSceneProps = {
  mode: SceneMode;
  t: number;
};

export function WrongAnswerScene(props: WrongAnswerSceneProps) {
  const { mode, t } = props;
  const stageIn = easeOutCubic(ramp(t, 0, 700));
  const showQuestion = mode === "static" || t >= 700;
  const showAnswer = mode === "static" || t >= 2_500;
  const showTyping = mode === "motion" && t >= 1_450 && t < 2_500;
  const streamingProgress = mode === "static" ? 1 : ramp(t, 2_500, 3_350);
  const highlightAssistant = mode === "static" || t >= 3_450;
  const messages = WRONG_ANSWER_MESSAGES.filter((message) =>
    message.role === "client" ? showQuestion : showAnswer,
  );

  return (
    <div
      className="scene-frame"
      style={{
        opacity: stageIn,
        transform: `translate3d(0, ${mix(20, 0, stageIn)}px, 0)`,
      }}
    >
      <EnterpriseChatShell
        assistantBadge={showAnswer ? "Matched source: Previous billing policy" : undefined}
        composerValue="Check the latest seat reduction credit rule"
        highlightAssistant={highlightAssistant}
        historyItems={CHAT_HISTORY}
        messages={messages}
        statusPill="Knowledge answer"
        streamingMessageId={showAnswer ? "assistant-wrong" : null}
        streamingProgress={streamingProgress}
        threadTitle="Seat reduction credit clarification"
        typing={showTyping}
      />
    </div>
  );
}
