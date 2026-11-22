import { Plus, Send, Sparkles } from "lucide-react";

export type DiscordComposerBarProps = {
  assistLabel?: string;
  className?: string;
  placeholder: string;
  sendLabel?: string;
};

export function DiscordComposerBar(props: Readonly<DiscordComposerBarProps>) {
  const {
    assistLabel = "Signal Scan",
    className,
    placeholder,
    sendLabel = "Reply",
  } = props;

  return (
    <footer className={["discord-composer-bar", className].filter(Boolean).join(" ")}>
      <div className="discord-composer-bar__shell">
        <button
          type="button"
          className="discord-composer-bar__icon-button discord-composer-bar__icon-button--attach"
          aria-label="Attach context"
        >
          <Plus size={16} />
        </button>

        <label className="discord-composer-bar__input">
          <input type="text" readOnly value="" placeholder={placeholder} aria-label={placeholder} />
        </label>

        <div className="discord-composer-bar__actions">
          <button type="button" className="discord-composer-bar__pill discord-composer-bar__pill--ghost">
            <Sparkles size={14} />
            {assistLabel}
          </button>

          <button type="button" className="discord-composer-bar__pill discord-composer-bar__pill--send">
            <Send size={14} />
            {sendLabel}
          </button>
        </div>
      </div>
    </footer>
  );
}
