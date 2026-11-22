type ClientChatReplyReadyToastProps = {
  actionLabel: string;
  ariaLabel: string;
  message: string;
  onView: () => void;
};

/**
 * Chat 回复完成通知：
 * - 可见文案严格贴近 Figma 的单行提示，不在视觉上塞入过长的会话标题；
 * - 具体会话信息通过 `ariaLabel` 保留，兼顾可访问性和 hover 时的上下文感知。
 */
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
