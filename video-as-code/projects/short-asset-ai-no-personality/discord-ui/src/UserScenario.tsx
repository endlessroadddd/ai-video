import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { DiscordAvatar } from "./components/discord-avatar";
import {
  escalationKeywordPool,
  userScenarioState,
  type DiscordMessage,
} from "./discord-ui-state";

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function replaceTemplateValue(template: string, keyword: string) {
  return template.replace("{keyword}", keyword);
}

function renderHighlightedText(text: string): ReactNode {
  const keyword = escalationKeywordPool.find((item) => text.includes(item));
  if (!keyword) {
    return text;
  }

  const parts = text.split(keyword);
  return parts.map((part, index) => (
    <span key={`${keyword}-${index}`}>
      {part}
      {index < parts.length - 1 ? <span className="human-keyword">{keyword}</span> : null}
    </span>
  ));
}

export function UserScenario() {
  const [messages, setMessages] = useState<DiscordMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [fastForward, setFastForward] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [phantomKeywords, setPhantomKeywords] = useState<
    Array<{
      id: string;
      text: string;
      top: string;
      left: string;
      size: string;
      delay: string;
    }>
  >([]);
  const fastForwardRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fastForwardRef.current = fastForward;
  }, [fastForward]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: fastForward ? "auto" : "smooth",
      });
    }
  }, [messages, draft, fastForward]);

  useEffect(() => {
    let isMounted = true;

    const createPhantomKeyword = (text: string) => {
      if (!isMounted) {
        return;
      }

      setPhantomKeywords((current) => [
        ...current,
        {
          id: createId("phantom"),
          text,
          top: `${10 + Math.random() * 80}%`,
          left: `${10 + Math.random() * 80}%`,
          size: `${24 + Math.random() * 48}px`,
          delay: "0s",
        },
      ]);
    };

    const typeText = async (text: string) => {
      for (let index = 0; index <= text.length; index += 1) {
        if (!isMounted) {
          return;
        }

        setDraft(text.slice(0, index));
        await wait(
          fastForwardRef.current ? 10 : 40 + Math.random() * 50,
        );
      }

      await wait(fastForwardRef.current ? 100 : 500);
      if (!isMounted) {
        return;
      }

      setDraft("");
      setMessages((current) => [
        ...current,
        {
          id: createId("user"),
          author: userScenarioState.profile.name,
          text,
          tone: "user",
        },
      ]);
    };

    const botReply = async (text: string, delayMs = 800) => {
      setMessages((current) => [
        ...current,
        {
          id: createId("bot-typing"),
          author: userScenarioState.botName,
          text: "...",
          tone: "bot",
          isTyping: true,
          appBadge: true,
        },
      ]);

      await wait(fastForwardRef.current ? 100 : delayMs);
      if (!isMounted) {
        return;
      }

      setMessages((current) => {
        const next = [...current];
        next[next.length - 1] = {
          id: createId("bot"),
          author: userScenarioState.botName,
          text,
          tone: "bot",
          appBadge: true,
        };
        return next;
      });
    };

    const runSequence = async () => {
      await wait(1000);
      if (!isMounted) {
        return;
      }

      for (const exchange of userScenarioState.introExchanges) {
        await typeText(exchange.user);
        await botReply(exchange.bot, exchange.delayMs);
        await wait(1000);
      }

      await wait(2000);
      if (!isMounted) {
        return;
      }

      setFastForward(true);
      await wait(800);

      let delay = 300;
      for (const user of userScenarioState.communityUsers) {
        if (!isMounted) {
          return;
        }

        setMessages((current) => [
          ...current,
          {
            id: createId("community-user"),
            author: user.name,
            text: user.question,
            tone: "user",
          },
        ]);

        await wait(delay);

        setMessages((current) => [
          ...current,
          {
            id: createId("community-bot"),
            author: userScenarioState.botName,
            text: userScenarioState.communityBotReply,
            tone: "bot",
            appBadge: true,
          },
        ]);

        await wait(delay);

        const keyword =
          escalationKeywordPool[Math.floor(Math.random() * escalationKeywordPool.length)] ??
          "HUMAN";

        setMessages((current) => [
          ...current,
          {
            id: createId("community-escalation"),
            author: user.name,
            text: replaceTemplateValue(userScenarioState.escalationTemplate, keyword),
            tone: "user",
          },
        ]);

        createPhantomKeyword(keyword);
        await wait(delay);

        setMessages((current) => [
          ...current,
          {
            id: createId("community-wait"),
            author: userScenarioState.botName,
            text: userScenarioState.waitReply,
            tone: "bot",
            appBadge: true,
          },
        ]);

        delay = Math.max(120, delay * 0.7);
        await wait(delay * 1.5);
      }

      await wait(800);
      setFastForward(false);

      await wait(1000);
      setShowSummary(true);
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="page-shell">
      <style>{`
        body {
          margin: 0;
          overflow: hidden;
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: inset 0 0 0 0 rgba(237, 66, 69, 0); }
          50% { box-shadow: inset 0 0 100px rgba(237, 66, 69, 0.2); }
          100% { box-shadow: inset 0 0 0 0 rgba(237, 66, 69, 0); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .fast-forward-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          animation: pulseGlow 1s infinite;
          z-index: 50;
        }
        .human-keyword {
          color: #ed4245;
          font-weight: 900;
          text-decoration: underline;
        }
        @keyframes phantomFade {
          0% { opacity: 0; transform: scale(0.5) translate(0, 20px); filter: blur(8px); }
          30% { opacity: 0.9; transform: scale(1.2) translate(0, -5px) rotate(calc(var(--rot) * 1deg)); filter: blur(0px); color: #ed4245; text-shadow: 0 0 30px rgba(237, 66, 69, 1); }
          70% { opacity: 0.6; transform: scale(1) translate(0, -10px) rotate(calc(var(--rot) * 1deg)); filter: blur(2px); color: #ff7373; text-shadow: 0 0 15px rgba(237, 66, 69, 0.5); }
          100% { opacity: 0; transform: scale(1.8) translate(0, -30px) rotate(calc(var(--rot) * 1deg)); filter: blur(12px); }
        }
        .phantom-keyword {
          position: fixed;
          font-weight: 900;
          text-transform: uppercase;
          pointer-events: none;
          z-index: 999;
          opacity: 0;
          animation: phantomFade 2s ease-in-out forwards;
          mix-blend-mode: screen;
        }
        .content-stage__body {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
        }
        .message-stack {
          padding-bottom: 24px;
        }
        .content-stage__body::-webkit-scrollbar {
          width: 8px;
        }
        .content-stage__body::-webkit-scrollbar-track {
          background: transparent;
        }
        .content-stage__body::-webkit-scrollbar-thumb {
          background: #1a1b1e;
          border-radius: 4px;
        }
        .content-stage__body::-webkit-scrollbar-thumb:hover {
          background: #2b2d31;
        }
        .app-grid {
          display: grid;
          grid-template-columns: 72px 256px 1fr 240px;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }
        @media (max-width: 1360px) {
          .app-grid {
            grid-template-columns: 64px 232px 1fr 208px;
          }
        }
        .column-server {
          background: var(--bg-tertiary, #1e1f22);
          display: flex;
          flex-direction: column;
          z-index: 20;
          min-height: 0;
          min-width: 0;
        }
        .column-channel {
          background: var(--bg-secondary, #2b2d31);
          display: flex;
          flex-direction: column;
          z-index: 10;
          min-height: 0;
          min-width: 0;
        }
        .column-chat {
          background: var(--bg-primary, #313338);
          display: flex;
          flex-direction: column;
          z-index: 5;
          min-height: 0;
          min-width: 0;
        }
        .column-member {
          background: var(--bg-secondary, #2b2d31);
          display: flex;
          flex-direction: column;
          z-index: 10;
          min-height: 0;
          min-width: 0;
        }
        .profile-dock {
          height: 68px;
          background: #232428;
          display: flex;
          align-items: center;
          padding: 0 8px;
          flex-shrink: 0;
          box-shadow: none;
          margin: 0;
        }
        .chat-footer {
          height: 68px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          background: var(--bg-primary, #313338);
        }
      `}</style>

      {phantomKeywords.map((item) => (
        <div
          key={item.id}
          className="phantom-keyword"
          style={
            {
              top: item.top,
              left: item.left,
              animationDelay: item.delay,
              fontSize: item.size,
              ["--rot" as "--rot"]: Math.random() * 30 - 15,
            } as CSSProperties
          }
        >
          {item.text}
        </div>
      ))}

      {fastForward ? <div className="fast-forward-overlay" /> : null}

      {showSummary ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            animation: "slideUpFade 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.27) forwards",
          }}
        >
          <div
            style={{
              background: "transparent",
              padding: "40px",
              maxWidth: "600px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                margin: "0 0 32px",
                color: "#fff",
                fontSize: "36px",
                fontWeight: 900,
                letterSpacing: "2px",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              {userScenarioState.summary.title}
            </h3>
            <div
              style={{
                color: "#f2f3f5",
                fontSize: "24px",
                lineHeight: "1.8",
                margin: 0,
                fontWeight: 500,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {userScenarioState.summary.steps.map((step, index) => (
                <span
                  key={step}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ color: "#949ba4" }}>{String(index + 1).padStart(2, "0")}</span>
                  {index === userScenarioState.summary.steps.length - 1 ? (
                    <span
                      className="human-keyword"
                      style={{
                        textDecoration: "none",
                        background: "#ed4245",
                        color: "#fff",
                        padding: "4px 16px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 15px rgba(237, 66, 69, 0.4)",
                      }}
                    >
                      {step}
                    </span>
                  ) : (
                    <span>{step}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="app-grid">
        <div className="column-server">
          <div className="server-rail" style={{ flex: 1, paddingBottom: 0 }}>
            <div className="server-icon server-icon--home">{userScenarioState.homeServerLabel}</div>
            <div className="server-divider" />
            <div className="server-slot server-slot--selected">
              <div className="server-indicator" />
              <div className="server-icon server-icon--community">SC</div>
              <span className="server-badge">2</span>
            </div>
          </div>
          <div style={{ height: "68px", flexShrink: 0, background: "#111214" }} />
        </div>

        <div className="column-channel">
          <div className="guild-header" style={{ flexShrink: 0 }}>
            <div className="guild-header__title">
              <strong>{userScenarioState.guildName}</strong>
              <span>v</span>
            </div>
          </div>

          <div className="channel-group" style={{ flex: 1, paddingTop: "10px" }}>
            <span className="channel-group__title">TEXT CHANNELS</span>
            <button type="button" className="channel-item channel-item--active">
              <span className="channel-item__symbol">#</span>
              <span className="channel-item__label">{userScenarioState.activeChannel}</span>
            </button>
            <button type="button" className="channel-item">
              <span className="channel-item__symbol">#</span>
              <span className="channel-item__label">{userScenarioState.secondaryChannel}</span>
            </button>
          </div>

          <div className="profile-dock">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 8px",
                borderRadius: "4px",
                flex: 1,
                cursor: "pointer",
              }}
            >
              <DiscordAvatar
                name={userScenarioState.profile.name}
                className="discord-avatar--compact"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#f2f3f5",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {userScenarioState.profile.name}
                </span>
                <span style={{ fontSize: "12px", color: "#b5bac1", lineHeight: 1.2 }}>
                  {userScenarioState.profile.tag}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "4px", color: "#b5bac1" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
              </div>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z" />
                </svg>
              </div>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="column-chat">
          <header
            className="content-stage__header"
            style={{ flexShrink: 0, borderBottom: "1px solid #2b2d31" }}
          >
            <div className="content-stage__meta">
              <strong># {userScenarioState.activeChannel}</strong>
            </div>
          </header>

          <div
            className="content-stage__body"
            ref={scrollContainerRef}
            style={{ paddingBottom: "20px" }}
          >
            <section className="message-stack">
              {messages.map((message) => (
                <article
                  className={message.tone === "bot" ? "bot-thread" : "user-message"}
                  key={message.id}
                  style={{ animation: "slideUpFade 0.3s ease-out" }}
                >
                  <DiscordAvatar name={message.author} className="discord-avatar--message" />
                  <div
                    className={
                      message.tone === "bot" ? "bot-thread__content" : "user-message__body"
                    }
                  >
                    <div
                      className={
                        message.tone === "bot" ? "bot-thread__meta" : "user-message__meta"
                      }
                    >
                      <strong>{message.author}</strong>
                      {message.appBadge ? <span className="bot-pill">APP</span> : null}
                    </div>

                    <div className={message.tone === "bot" ? "bot-message" : "user-message__text"}>
                      {message.isTyping ? (
                        <div className="typing-indicator" aria-label="Support AI is typing">
                          <span />
                          <span />
                          <span />
                        </div>
                      ) : (
                        <p>{renderHighlightedText(message.text)}</p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </div>

          <div className="chat-footer">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#383a40",
                borderRadius: "8px",
                padding: "0 16px",
                flex: 1,
                height: "44px",
              }}
            >
              <span
                style={{
                  color: "#b5bac1",
                  fontSize: "20px",
                  marginRight: "12px",
                  cursor: "pointer",
                }}
              >
                +
              </span>
              <div
                style={{
                  flex: 1,
                  color: draft ? "#dbdee1" : "#5c5e66",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {draft || `Message #${userScenarioState.activeChannel}`}
                {draft ? (
                  <span
                    style={{
                      width: "2px",
                      height: "16px",
                      background: "#dbdee1",
                      marginLeft: "2px",
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                ) : null}
              </div>
              <button
                style={{
                  background: "#5865f2",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 16px",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginLeft: "12px",
                  opacity: draft ? 1 : 0.5,
                  cursor: draft ? "pointer" : "not-allowed",
                  transition: "opacity 0.2s",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="column-member">
          <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
            <div className="member-group" style={{ padding: "24px 8px" }}>
              <span
                className="member-group__title"
                style={{
                  color: "#b5bac1",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "0 8px",
                  marginBottom: "4px",
                  display: "block",
                }}
              >
                ONLINE - {userScenarioState.onlineMembers.length}
              </span>
              {userScenarioState.onlineMembers.map((member) => (
                <div
                  key={member.name}
                  className="member-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "6px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    gap: "12px",
                  }}
                >
                  <DiscordAvatar
                    name={member.name}
                    className="discord-avatar--compact"
                    status="online"
                  />
                  <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span
                        style={{
                          color: "#f2f3f5",
                          fontSize: "15px",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {member.name}
                      </span>
                      {"appBadge" in member && member.appBadge ? (
                        <span
                          className="bot-pill"
                          style={{
                            background: "#5865F2",
                            color: "#fff",
                            fontSize: "10px",
                            padding: "0 4px",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            height: "14px",
                          }}
                        >
                          APP
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="member-group" style={{ padding: "0 8px" }}>
              <span
                className="member-group__title"
                style={{
                  color: "#b5bac1",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "0 8px",
                  marginBottom: "4px",
                  display: "block",
                }}
              >
                OFFLINE - {userScenarioState.offlineMembers.length}
              </span>
              {userScenarioState.offlineMembers.map((member) => (
                <div
                  key={member.name}
                  className="member-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "6px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    gap: "12px",
                    opacity: 0.5,
                  }}
                >
                  <DiscordAvatar
                    name={member.name}
                    className="discord-avatar--compact"
                    status="offline"
                  />
                  <span
                    style={{
                      color: "#f2f3f5",
                      fontSize: "15px",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: "68px", flexShrink: 0, background: "#2b2d31" }} />
        </div>
      </div>
    </main>
  );
}
