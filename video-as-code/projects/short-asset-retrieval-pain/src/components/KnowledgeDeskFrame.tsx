import { BookOpen, Clock3, FileStack, Search } from "lucide-react";
import { KNOWLEDGE_ITEMS } from "../data/story";
import type { EditAction, KnowledgeRecord, TestQueryState } from "../types";
import { PolicyDiffCard } from "./PolicyDiffCard";
import { SourceSyncBadge } from "./SourceSyncBadge";

const BRAND_LABEL = "Enterprise AI";

type FocusTarget = "updated" | "source" | "diff" | "editor" | "test" | null;

type KnowledgeDeskFrameProps = {
  calloutLines?: readonly string[];
  editActions?: readonly EditAction[];
  focusTarget?: FocusTarget;
  items?: readonly KnowledgeRecord[];
  revealedEditCount?: number;
  selectedId?: string;
  showTestQuery?: boolean;
  testQuery?: TestQueryState | null;
  topNote?: string;
  visibleCalloutCount?: number;
};

function getSelectedItem(items: readonly KnowledgeRecord[], selectedId?: string) {
  if (selectedId) {
    const explicit = items.find((item) => item.id === selectedId);
    if (explicit) return explicit;
  }

  return items.find((item) => item.isSelected) ?? items[0]!;
}

export function KnowledgeDeskFrame(props: KnowledgeDeskFrameProps) {
  const {
    calloutLines = [],
    editActions = [],
    focusTarget = null,
    items = KNOWLEDGE_ITEMS,
    revealedEditCount = editActions.length,
    selectedId,
    showTestQuery = false,
    testQuery = null,
    topNote,
    visibleCalloutCount = calloutLines.length,
  } = props;

  const selectedItem = getSelectedItem(items, selectedId);
  const visibleActions = editActions.slice(0, revealedEditCount);

  return (
    <div className="knowledge-scene">
      <div className="discord-app-shell discord-app-shell--knowledge">
        <aside className="discord-server-rail" aria-label={`${BRAND_LABEL} workspaces`}>
          <div className="discord-server-rail__stack">
            <div className="discord-server-pill discord-server-pill--home">
              <img src="/enterprise-ai-mark.svg" alt={BRAND_LABEL} />
            </div>
            <button type="button" className="discord-server-pill" aria-label="Northstar Systems">
              NS
            </button>
            <button type="button" className="discord-server-pill is-active" aria-label="Knowledge Desk">
              KB
            </button>
            <button type="button" className="discord-server-pill" aria-label="Audit Trail">
              AT
            </button>
          </div>

          <div className="discord-server-rail__stack">
            <button type="button" className="discord-server-pill discord-server-pill--ghost" aria-label="Add workspace">
              +
            </button>
          </div>
        </aside>

        <div className="knowledge-shell">
          <aside className="knowledge-sidebar">
            <div className="knowledge-brand">
              <div className="knowledge-brand__mark">
                <img src="/enterprise-ai-mark.svg" alt={BRAND_LABEL} />
              </div>
              <div className="knowledge-brand__copy">
                <strong>{BRAND_LABEL}</strong>
                <span>Enterprise Knowledge Desk</span>
              </div>
            </div>

            <nav className="knowledge-nav">
              <button type="button" className="knowledge-nav__item is-active">
                <BookOpen size={16} />
                <span>Knowledge Base</span>
              </button>
              <button type="button" className="knowledge-nav__item">
                <FileStack size={16} />
                <span>Sources</span>
              </button>
              <button type="button" className="knowledge-nav__item">
                <Clock3 size={16} />
                <span>Audit Trail</span>
              </button>
            </nav>

            <div className="knowledge-sidebar__footer">
              <span className="knowledge-sidebar__footer-dot" />
              <div>
                <strong>Source sync online</strong>
                <span>{BRAND_LABEL} is watching retrieval freshness in real time.</span>
              </div>
            </div>
          </aside>

          <main className="knowledge-main">
            <header className="knowledge-header">
              <div className="knowledge-header__copy">
                <span className="knowledge-header__eyebrow">Policy retrieval monitoring</span>
                <h1>Knowledge Base</h1>
                <p>Track whether the latest enterprise rules are actually the rules your AI uses.</p>
              </div>

              <div className="knowledge-header__tools">
                <span className="knowledge-header__chip">Source trace live</span>
                <div className="knowledge-header__search">
                  <Search size={14} />
                  <span>Search knowledge...</span>
                </div>
              </div>
            </header>

            <div className="knowledge-body">
              <section className="knowledge-list">
                {items.map((item) => {
                  const isSelected = item.id === selectedItem.id;

                  return (
                    <article key={item.id} className={`knowledge-list__card${isSelected ? " is-selected" : ""}`}>
                      <div className="knowledge-list__title-row">
                        <h2>{item.title}</h2>
                        {item.isUpdated ? <span className="knowledge-list__status">Updated</span> : null}
                      </div>
                      <p>{item.summary}</p>
                      <div className="knowledge-list__meta">
                        <span>{item.sourceLabel}</span>
                        <span>{item.updatedAt}</span>
                      </div>
                    </article>
                  );
                })}
              </section>

              <section className="knowledge-detail">
                {topNote ? <div className="knowledge-detail__top-note">{topNote}</div> : null}

                <div className="knowledge-detail__header">
                  <div>
                    <h3>{selectedItem.title}</h3>
                    <p>{selectedItem.summary}</p>
                  </div>
                </div>

                <div className="knowledge-detail__meta">
                  <div className={`knowledge-detail__meta-card${focusTarget === "updated" ? " is-focused" : ""}`}>
                    <span className="knowledge-detail__meta-label">Updated</span>
                    <strong>{selectedItem.updatedAt}</strong>
                  </div>

                  <div className="knowledge-detail__meta-card">
                    <span className="knowledge-detail__meta-label">Source</span>
                    <SourceSyncBadge
                      focused={focusTarget === "source"}
                      label={selectedItem.sourceLabel}
                    />
                  </div>
                </div>

                {selectedItem.before && selectedItem.after ? (
                  <PolicyDiffCard
                    after={selectedItem.after}
                    before={selectedItem.before}
                    focused={focusTarget === "diff"}
                  />
                ) : null}

                {visibleCalloutCount > 0 ? (
                  <section className="knowledge-callouts">
                    {calloutLines.slice(0, visibleCalloutCount).map((line) => (
                      <div key={line} className="knowledge-callout">
                        {line}
                      </div>
                    ))}
                  </section>
                ) : null}

                {editActions.length > 0 || showTestQuery ? (
                  <section className="knowledge-edit-lab">
                    {editActions.length > 0 ? (
                      <div className={`knowledge-edit-lab__grid${focusTarget === "editor" ? " is-focused" : ""}`}>
                        {visibleActions.map((action) => (
                          <article key={action.id} className="knowledge-edit-chip">
                            <strong>{action.label}</strong>
                            {action.detail ? <span>{action.detail}</span> : null}
                          </article>
                        ))}
                      </div>
                    ) : null}

                    {showTestQuery && testQuery ? (
                      <div className={`knowledge-test-panel${focusTarget === "test" ? " is-focused" : ""}`}>
                        <div className="knowledge-test-panel__header">
                          <span className="knowledge-test-panel__eyebrow">Test query</span>
                          <span className="knowledge-test-panel__status">{testQuery.status}</span>
                        </div>
                        <p className="knowledge-test-panel__query">{testQuery.query}</p>
                        <strong className="knowledge-test-panel__result">{testQuery.result}</strong>
                      </div>
                    ) : null}
                  </section>
                ) : null}
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
