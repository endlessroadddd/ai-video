import { Bell, Hash, Loader2, Plus, Search } from "lucide-react";
import { MarkdownMessage } from "./MarkdownMessage";
import { CHAT_HISTORY } from "../data/story";
import type { ChatHistoryItem, ChatMessage } from "../types";

const BRAND_MARK_SRC = "/enterprise-ai-mark.svg";
const BOT_AVATAR_SRC = "/enterprise-ai-bot-avatar.svg";
const USER_AVATAR_SRC = "/generic-user-avatar.svg";
const BRAND_LABEL = "Enterprise AI";

type EnterpriseChatShellProps = {
  assistantBadge?: string;
  composerValue?: string;
  highlightAssistant?: boolean;
  historyItems?: readonly ChatHistoryItem[];
  messages: readonly ChatMessage[];
  statusPill?: string;
  streamingMessageId?: string | null;
  streamingProgress?: number;
  threadTitle: string;
  typing?: boolean;
};

type MessageBubbleProps = {
  badge?: string;
  focused?: boolean;
  message: ChatMessage;
  streamingProgress?: number;
};

function MessageBubble(props: MessageBubbleProps) {
  const { badge, focused = false, message, streamingProgress } = props;
  const isClient = message.role === "client";
  const avatarSrc = isClient ? USER_AVATAR_SRC : BOT_AVATAR_SRC;
  const shouldShowBadge = !isClient && badge && (streamingProgress == null || streamingProgress >= 1);

  return (
    <article className={`dashboard-chat-message-group ${isClient ? "is-client" : "is-assistant"}`}>
      {!isClient ? (
        <img
          src={avatarSrc}
          alt={`${BRAND_LABEL} avatar`}
          className="dashboard-chat-message-avatar"
          loading="eager"
        />
      ) : null}

      <div className={`dashboard-chat-message-item ${focused ? "is-focused" : ""}`}>
        <div className="dashboard-chat-message-head">
          <span className="dashboard-chat-message-author">{message.author}</span>
          <span className="dashboard-chat-message-time">{message.timestamp}</span>
        </div>

        <div className={`dashboard-chat-message-bubble ${isClient ? "is-client" : "is-assistant"}`}>
          <MarkdownMessage
            className="dashboard-chat-markdown"
            content={message.content}
            progress={streamingProgress}
          />
        </div>

        {shouldShowBadge ? (
          <div className="dashboard-chat-message-badge">{badge}</div>
        ) : null}
      </div>

      {isClient ? (
        <img
          src={avatarSrc}
          alt="User avatar"
          className="dashboard-chat-message-avatar dashboard-chat-message-avatar--user"
          loading="eager"
        />
      ) : null}
    </article>
  );
}

export function EnterpriseChatShell(props: EnterpriseChatShellProps) {
  const {
    assistantBadge,
    composerValue = "",
    highlightAssistant = false,
    historyItems = CHAT_HISTORY,
    messages,
    statusPill,
    streamingMessageId = null,
    streamingProgress,
    threadTitle,
    typing = false,
  } = props;

  return (
    <div className="chat-scene">
      <div className="discord-app-shell">
        <aside className="discord-server-rail" aria-label={`${BRAND_LABEL} workspaces`}>
          <div className="discord-server-rail__stack">
            <div className="discord-server-pill discord-server-pill--home">
              <img src={BRAND_MARK_SRC} alt={BRAND_LABEL} />
            </div>
            <button type="button" className="discord-server-pill is-active" aria-label="Northstar Systems">
              NS
            </button>
            <button type="button" className="discord-server-pill" aria-label="Retrieval QA">
              QA
            </button>
            <button type="button" className="discord-server-pill" aria-label="Knowledge Desk">
              KB
            </button>
          </div>

          <div className="discord-server-rail__stack">
            <button type="button" className="discord-server-pill discord-server-pill--ghost" aria-label="Add workspace">
              <Plus size={18} />
            </button>
          </div>
        </aside>

        <div className="dashboard-chat-shell">
          <aside className="dashboard-chat-sidebar dashboard-chat-sidebar--inline">
            <div className="dashboard-chat-sidebar-topbar">
              <div className="dashboard-chat-sidebar-guild">
                <strong>Northstar Systems</strong>
                <span>{BRAND_LABEL} Discord relay</span>
              </div>
            </div>

            <div className="dashboard-chat-sidebar-scroll">
              <div className="dashboard-chat-sidebar-body">
                <section className="dashboard-chat-sidebar-group dashboard-chat-sidebar-group--utility">
                  <button type="button" className="dashboard-chat-action-row" data-active="true">
                    <span className="dashboard-chat-action-icon dashboard-chat-action-icon--accent">
                      <Plus size={16} />
                    </span>
                    <span className="dashboard-chat-action-row-copy">
                      <span>Create thread</span>
                      <span className="dashboard-chat-action-badge">live</span>
                    </span>
                  </button>

                  <button type="button" className="dashboard-chat-action-row">
                    <span className="dashboard-chat-action-icon">
                      <Search size={16} />
                    </span>
                    <span>Search messages</span>
                  </button>
                </section>

                <section className="dashboard-chat-sidebar-group">
                  <p className="dashboard-chat-sidebar-section-title">Channels</p>

                  <button type="button" className="dashboard-chat-channel-row">
                    <Hash size={15} />
                    <span>client-escalations</span>
                  </button>

                  <button type="button" className="dashboard-chat-channel-row is-active">
                    <Hash size={15} />
                    <span>billing-edge-cases</span>
                    <span className="dashboard-chat-action-badge">focus</span>
                  </button>

                  <button type="button" className="dashboard-chat-channel-row">
                    <Hash size={15} />
                    <span>source-audit</span>
                  </button>
                </section>

                <section className="dashboard-chat-sidebar-group">
                  <p className="dashboard-chat-session-section-label">Thread snapshots</p>
                  <div className="dashboard-chat-session-list">
                    {historyItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="dashboard-chat-session-row"
                        data-active={index === 0 ? "true" : "false"}
                      >
                        <div className="dashboard-chat-session-main">
                          <span className="dashboard-chat-session-title">{item.title}</span>
                          <span className={`dashboard-chat-session-state is-${item.state}`}>
                            {item.state}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <div className="dashboard-chat-sidebar-footer">
              <div className="dashboard-chat-presence">
                <span className="dashboard-chat-presence__dot" />
                <div>
                  <strong>{BRAND_LABEL} watcher online</strong>
                  <span>4 source checks are attached to this channel</span>
                </div>
              </div>
            </div>
          </aside>

          <section className="dashboard-chat-stage">
            <div className="dashboard-chat-stage-header">
              <div className="dashboard-chat-stage-header-inner">
                <div className="dashboard-chat-stage-title-row">
                  <div className="dashboard-chat-stage-channel">
                    <span className="dashboard-chat-stage-channel-hash">
                      <Hash size={18} />
                    </span>
                    <div className="dashboard-chat-stage-title-shell">
                      <p className="dashboard-chat-stage-title">{threadTitle}</p>
                      <p className="dashboard-chat-stage-subtitle">
                        Retrieval trace, answer quality, and escalation signals in one thread.
                      </p>
                    </div>
                  </div>

                  <div className="dashboard-chat-stage-meta">
                    {statusPill ? (
                      <span className="dashboard-chat-stage-status-pill">{statusPill}</span>
                    ) : null}
                    <button type="button" className="dashboard-chat-stage-icon-button" aria-label="Search in channel">
                      <Search size={16} />
                    </button>
                    <button type="button" className="dashboard-chat-stage-icon-button" aria-label="Notification settings">
                      <Bell size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-chat-stage-body">
              <div className="dashboard-chat-message-list">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    badge={message.role === "assistant" ? assistantBadge : undefined}
                    focused={message.role === "assistant" && highlightAssistant}
                    message={message}
                    streamingProgress={
                      message.id === streamingMessageId ? streamingProgress : undefined
                    }
                  />
                ))}

                {typing ? (
                  <article className="dashboard-chat-message-group is-assistant">
                    <img
                      src={BOT_AVATAR_SRC}
                      alt={`${BRAND_LABEL} avatar`}
                      className="dashboard-chat-message-avatar"
                      loading="eager"
                    />
                    <div className="dashboard-chat-message-item">
                      <div className="dashboard-chat-message-head">
                        <span className="dashboard-chat-message-author">{BRAND_LABEL}</span>
                        <span className="dashboard-chat-message-time">typing...</span>
                      </div>

                      <div className="dashboard-chat-typing">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    </div>
                  </article>
                ) : null}
              </div>
            </div>

            <div className="dashboard-chat-stage-footer">
              <div className="dashboard-chat-composer">
                <textarea
                  className="dashboard-chat-composer-textarea"
                  placeholder={`Ask ${BRAND_LABEL} to check the latest policy...`}
                  readOnly
                  rows={3}
                  value={composerValue}
                />
                <div className="dashboard-chat-composer-footer">
                  <div className="dashboard-chat-composer-tools">
                    <button type="button" className="dashboard-chat-composer-plus" aria-label="Add">
                      <Plus size={16} />
                    </button>
                    <span className="dashboard-chat-composer-hint">
                      Updated policy text was already dropped into this thread.
                    </span>
                  </div>
                  <button type="button" className="dashboard-chat-composer-submit" aria-label="Send">
                    <Loader2 size={16} className="dashboard-chat-composer-submit-icon" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
