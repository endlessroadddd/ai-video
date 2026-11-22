import type { ReactElement } from "react";

function SparklesIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <path
        d="M12 3l1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1L6.5 8.5l4.1-1.4L12 3z"
        fill="currentColor"
      />
      <path
        d="M18.5 14l.9 2.6L22 17.5l-2.6.9L18.5 21l-.9-2.6L15 17.5l2.6-.9.9-2.6zM6 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"
        fill="currentColor"
        opacity="0.72"
      />
    </svg>
  );
}

function UserRoundIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 19c1.8-3 4-4.5 7-4.5s5.2 1.5 7 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CheckCircleIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.5 12.3l2.3 2.3 4.7-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ClockIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 8v4l2.6 1.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export type ClientChatSupportHandoffStatus = "reviewing" | "corrected";

export type ClientChatSupportHandoffSummaryItem = {
  label: string;
  value: string;
};

export type ClientChatSupportHandoffCardRecord = {
  eyebrow: string;
  owner: string;
  reviewLabel: string;
  correctedLabel: string;
  steps: readonly [string, string, string];
  summaryItems: ReadonlyArray<ClientChatSupportHandoffSummaryItem>;
  title: string;
};

export type ClientChatSupportHandoffCardProps = {
  card: ClientChatSupportHandoffCardRecord;
  status: ClientChatSupportHandoffStatus;
};

export function resolveSupportHandoffStepState(
  index: number,
  status: ClientChatSupportHandoffStatus,
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
        <SparklesIcon className="dashboard-chat-support-handoff-card__icon dashboard-chat-support-handoff-card__icon--sm" />
        <span>{card.eyebrow}</span>
      </div>

      <div className="dashboard-chat-support-handoff-card__header">
        <div className="dashboard-chat-support-handoff-card__title-block">
          <h3 className="dashboard-chat-support-handoff-card__title">
            {card.title}
          </h3>
          <div className="dashboard-chat-support-handoff-card__owner">
            <UserRoundIcon className="dashboard-chat-support-handoff-card__icon dashboard-chat-support-handoff-card__icon--sm" />
            <span>{card.owner}</span>
          </div>
        </div>

        <div
          className="dashboard-chat-support-handoff-card__status-pill"
          data-status={status}
        >
          {isCorrected ? (
            <CheckCircleIcon className="dashboard-chat-support-handoff-card__icon dashboard-chat-support-handoff-card__icon--md" />
          ) : (
            <ClockIcon className="dashboard-chat-support-handoff-card__icon dashboard-chat-support-handoff-card__icon--md" />
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
          const stepState = resolveSupportHandoffStepState(index, status);

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
