import { AnimatedEmoji } from "../chat/animated-emoji";

export type ComposerProps = {
  mode: "idle" | "typing" | "thinking";
  text?: string;
  placeholder: string;
  accent?: boolean;
  disabled?: boolean;
  showTools?: boolean;
  thinkingEmojiCodepoint?: string;
  reducedMotion?: boolean;
};

export function Composer({
  mode,
  text = "",
  placeholder,
  accent = false,
  disabled = false,
  showTools = false,
  thinkingEmojiCodepoint,
  reducedMotion = false,
}: ComposerProps) {
  return (
    <div className={["composer", accent ? "composer--accent" : ""].filter(Boolean).join(" ")}>
      <div className={["composer__field", mode === "typing" ? "is-active" : ""].join(" ")}>
        {showTools ? (
          <span className="composer__tools" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        ) : null}

        {mode === "typing" ? (
          <span className="composer__typed">
            {text}
            <span className="composer__caret" />
          </span>
        ) : null}

        {mode === "thinking" ? (
          <span className="composer__thinking">
            <span className="composer__thinking-label">Thinking</span>
            {thinkingEmojiCodepoint ? (
              <AnimatedEmoji
                codepoint={thinkingEmojiCodepoint}
                size={16}
                className="composer__thinking-emoji"
                reducedMotion={reducedMotion}
              />
            ) : null}
            <span className="composer__dots">
              <i />
              <i />
              <i />
            </span>
          </span>
        ) : null}

        {mode === "idle" ? <span className="composer__placeholder">{placeholder}</span> : null}
      </div>

      <button
        type="button"
        className={["composer__send", accent ? "composer__send--accent" : ""].join(" ")}
        disabled={disabled}
        aria-label="Send"
      >
        <span className="composer__send-arrow" />
      </button>
    </div>
  );
}
