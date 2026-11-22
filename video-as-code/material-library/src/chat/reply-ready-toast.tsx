export type ClientChatReplyReadyToastProps = {
  actionLabel: string;
  ariaLabel: string;
  message: string;
  onView: () => void;
};

export function ClientChatReplyReadyToast(
  props: ClientChatReplyReadyToastProps,
) {
  const { actionLabel, ariaLabel, message, onView } = props;

  return (
    <div
      className="dashboard-chat-reply-toast"
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <p className="dashboard-chat-reply-toast-label">{message}</p>

      <button
        type="button"
        className="dashboard-chat-reply-toast-action"
        aria-label={ariaLabel}
        onClick={onView}
      >
        {actionLabel}
      </button>
    </div>
  );
}
