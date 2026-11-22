import { PlusIcon, SendIcon, SparkIcon } from "./icons";

type ComposerBarProps = {
  placeholder: string;
  assistLabel?: string;
  sendLabel?: string;
};

export function ComposerBar({
  placeholder,
  assistLabel = "Signal Scan",
  sendLabel = "Reply",
}: ComposerBarProps) {
  return (
    <footer className="composer-bar">
      <div className="composer-bar__shell">
        <button
          type="button"
          className="composer-icon-button composer-icon-button--attach"
          aria-label="Attach context"
        >
          <PlusIcon />
        </button>

        <label className="composer-bar__input">
          <input type="text" readOnly value="" placeholder={placeholder} aria-label={placeholder} />
        </label>

        <div className="composer-bar__actions">
          <button type="button" className="composer-pill composer-pill--ghost">
            <SparkIcon />
            {assistLabel}
          </button>

          <button type="button" className="composer-pill composer-pill--send">
            <SendIcon />
            {sendLabel}
          </button>
        </div>
      </div>
    </footer>
  );
}
