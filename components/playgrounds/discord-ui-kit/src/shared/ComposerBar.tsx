import { SendIcon, SparkIcon } from "./icons";

type ComposerBarProps = {
  placeholder: string;
};

export function ComposerBar({ placeholder }: ComposerBarProps) {
  return (
    <footer className="composer-bar">
      <div className="composer-bar__shell">
        <button type="button" className="composer-pill composer-pill--ghost">
          <SparkIcon />
          Draft Assist
        </button>
        <input type="text" readOnly value="" placeholder={placeholder} />
        <button type="button" className="composer-pill composer-pill--send">
          <SendIcon />
          Send
        </button>
      </div>
    </footer>
  );
}
