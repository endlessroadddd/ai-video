import { fadeWindow, progressBetween } from "../lib/easing";
import { KEYWORD_STACK, MANUAL_KEYWORD } from "../data/scene";
import { CheckIcon, SearchIcon, ShieldIcon } from "./icons";

interface ModerationPanelProps {
  visible: boolean;
  currentMs: number;
}

function getTypedValue(currentMs: number): string {
  const typingStartMs = 10_820;
  const typingEndMs = 11_960;
  const progress = progressBetween(currentMs, typingStartMs, typingEndMs);
  const visibleChars = Math.round(progress * MANUAL_KEYWORD.length);
  return MANUAL_KEYWORD.slice(0, visibleChars);
}

export default function ModerationPanel(props: Readonly<ModerationPanelProps>) {
  const { currentMs, visible } = props;

  if (!visible) {
    return null;
  }

  const opacity = fadeWindow(currentMs, 8_920, 260, 13_980, 260);
  const typedValue = getTypedValue(currentMs);
  const showCaret = currentMs < 12_120;
  const showSavedState = currentMs >= 12_720;

  return (
    <div className="moderation-panel-overlay" style={{ opacity }}>
      <section className="moderation-panel">
        <aside className="mod-sidebar">
          <div className="mod-sidebar__title">Safety settings</div>
          <div className="mod-nav-item">Overview</div>
          <div className="mod-nav-item is-active">Banned words</div>
          <div className="mod-nav-item">Automod history</div>
          <div className="mod-nav-item">Roles</div>
        </aside>

        <div className="mod-content">
          <header className="mod-header">
            <div>
              <div className="mod-eyebrow">
                <ShieldIcon />
                Manual rule upkeep
              </div>
              <h3>Banned Words</h3>
            </div>

            <button className={["mod-save-btn", showSavedState ? "is-saved" : ""].join(" ")}>
              {showSavedState ? <CheckIcon /> : null}
              <span>{showSavedState ? "Saved" : "Save changes"}</span>
            </button>
          </header>

          <div className="mod-toolbar">
            <div className="mod-search">
              <SearchIcon />
              <span>Search rule list</span>
            </div>
            <div className="mod-count">238 active entries</div>
          </div>

          <div className="mod-callout">
            <span>Exact match only</span>
            <strong>Manual updates required every time phrasing changes.</strong>
          </div>

          <div className="mod-word-list">
            {KEYWORD_STACK.slice(0, 5).map((keyword) => (
              <div key={keyword} className="mod-word-row">
                <span>{keyword}</span>
                <span className="mod-word-row__scope">contains</span>
              </div>
            ))}

            <div className="mod-input-row">
              <label htmlFor="keyword-field">Add another phrase</label>
              <div className="mod-input-shell" id="keyword-field">
                <span>{typedValue || "Type a new pattern..."}</span>
                {showCaret ? <span className="mod-input-caret" /> : null}
              </div>
            </div>

            {currentMs >= 11_460 ? (
              <div className="mod-word-row mod-word-row--fresh">
                <span>{MANUAL_KEYWORD}</span>
                <span className="mod-word-row__scope">contains</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
