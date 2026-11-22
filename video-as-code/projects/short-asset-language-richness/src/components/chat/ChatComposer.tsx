import type { ReactElement } from "react";

import type { ChatComposerModel } from "../../lib/chat";
import { joinClassNames } from "../../lib/utils";

type ChatComposerProps = ChatComposerModel & {
  className?: string;
};

export function ChatComposer(
  props: Readonly<ChatComposerProps>,
): ReactElement {
  const {
    className,
    draftMessage,
    placeholder = "Ask Lucius anything",
    readOnly = true,
    sendDisabled = false,
    sendLabel = "Send",
    subdued = false,
    uploadLabel = "Upload",
  } = props;
  const shouldDisableSubmit = sendDisabled || !draftMessage.trim();

  return (
    <div
      className={joinClassNames(
        "lucius-chat-composer-wrap",
        subdued && "chat-composer-preview--subdued",
        className,
      )}
    >
      <div className="lucius-chat-composer">
        <textarea
          className="lucius-chat-composer__textarea"
          placeholder={placeholder}
          readOnly={readOnly}
          rows={3}
          value={draftMessage}
        />

        <div className="lucius-chat-composer__footer">
          <button
            className="lucius-chat-composer__icon-button"
            disabled={sendDisabled}
            type="button"
          >
            +
            <span className="lucius-chat-composer__sr-only">{uploadLabel}</span>
          </button>

          <button
            className="lucius-chat-composer__submit"
            disabled={shouldDisableSubmit}
            type="button"
          >
            →
            <span className="lucius-chat-composer__sr-only">{sendLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
