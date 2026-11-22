import { progressBetween } from "../motion/timing";
import type {
  DiscordQuestionStackStageProps,
  QuestionStackItem,
} from "../chat/discord-scene-types";

function normalizeQuestion(question: QuestionStackItem | string, index: number): QuestionStackItem {
  if (typeof question === "string") {
    return { id: `question-${index}`, text: question };
  }

  return question;
}

export function DiscordQuestionStackStage(props: Readonly<DiscordQuestionStackStageProps>) {
  const {
    className,
    currentMs,
    initialDelayMs,
    questions,
    revealDurationMs,
    staggerMs,
    startMs,
  } = props;

  return (
    <div className={["discord-question-stack-stage", className].filter(Boolean).join(" ")}>
      {questions.map((rawQuestion, index) => {
        const question = normalizeQuestion(rawQuestion, index);
        const revealStartMs = startMs + initialDelayMs + staggerMs * index;
        const revealProgress = progressBetween(
          currentMs,
          revealStartMs,
          revealStartMs + revealDurationMs,
        );

        if (revealProgress <= 0.001) {
          return null;
        }

        return (
          <p
            key={question.id ?? `${question.text}-${index}`}
            className={[
              "discord-question-stack-stage__line",
              question.emphasis === "highlight"
                ? "discord-question-stack-stage__line--highlight"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              opacity: revealProgress,
              transform: `translateY(${(1 - revealProgress) * 20}px) scale(${0.97 + revealProgress * 0.03})`,
            }}
          >
            {question.text}
          </p>
        );
      })}
    </div>
  );
}
