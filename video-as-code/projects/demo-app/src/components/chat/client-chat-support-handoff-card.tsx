import { CheckCircle2, Clock3, Sparkles, UserRound } from "lucide-react";
import type { ReactElement } from "react";

import type {
  ClientChatSupportRecordingHandoffCard,
  ClientChatSupportRecordingHandoffStatus,
} from "@/lib/client-chat-support-recording";

type ClientChatSupportHandoffCardProps = {
  card: ClientChatSupportRecordingHandoffCard;
  status: ClientChatSupportRecordingHandoffStatus;
};

function resolveStepState(
  index: number,
  status: ClientChatSupportRecordingHandoffStatus,
): "complete" | "active" | "upcoming" {
  if (status === "reviewing") {
    if (index === 0) {
      return "complete";
    }

    if (index === 1) {
      return "active";
    }

    return "upcoming";
  }

  if (index < 2) {
    return "complete";
  }

  return "active";
}

export function ClientChatSupportHandoffCard(
  props: ClientChatSupportHandoffCardProps,
): ReactElement {
  const { card, status } = props;
  const isCorrected = status === "corrected";

  return (
    <section
      className="dashboard-chat-support-handoff-card"
      data-status={status}
      aria-label={card.title}
    >
      <div className="dashboard-chat-support-handoff-card__eyebrow">
        <Sparkles className="h-3.5 w-3.5" />
        <span>{card.eyebrow}</span>
      </div>

      <div className="dashboard-chat-support-handoff-card__header">
        <div className="dashboard-chat-support-handoff-card__title-block">
          <h3 className="dashboard-chat-support-handoff-card__title">
            {card.title}
          </h3>
          <div className="dashboard-chat-support-handoff-card__owner">
            <UserRound className="h-3.5 w-3.5" />
            <span>{card.owner}</span>
          </div>
        </div>

        <div
          className="dashboard-chat-support-handoff-card__status-pill"
          data-status={status}
        >
          {isCorrected ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Clock3 className="h-4 w-4" />
          )}
          <span>{isCorrected ? card.correctedLabel : card.reviewLabel}</span>
        </div>
      </div>

      <dl className="dashboard-chat-support-handoff-card__summary-grid">
        {card.summaryItems.map((item) => (
          <div
            className="dashboard-chat-support-handoff-card__summary-item"
            key={`${item.label}:${item.value}`}
          >
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="dashboard-chat-support-handoff-card__steps">
        {card.steps.map((step, index) => {
          const stepState = resolveStepState(index, status);

          return (
            <div
              className="dashboard-chat-support-handoff-card__step"
              data-state={stepState}
              key={step}
            >
              <span className="dashboard-chat-support-handoff-card__step-dot" />
              <span className="dashboard-chat-support-handoff-card__step-label">
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
