import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { DiscordAvatar } from "./components/discord-avatar";
import {
  escalationKeywordPool,
  supervisorScenarioState,
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

export function Scenario() {
  const [messages, setMessages] = useState<DiscordMessage[]>([]);
  const [showThought, setShowThought] = useState(false);
  const [activeHighlights, setActiveHighlights] = useState<Record<string, string>>({});
  const [fastForward, setFastForward] = useState(false);
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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

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

    const runSequence = async () => {
      await wait(1000);
      if (!isMounted) {
        return;
      }

      const firstTicket = supervisorScenarioState.tickets[0];
      if (!firstTicket) {
        return;
      }

      for (const message of firstTicket.messages) {
        setMessages((current) => [...current, message]);
        await wait(800);
      }

      await wait(800);

      const firstHighlightMessage = firstTicket.messages.find(
        (message) => message.tone === "user" && message.text.includes(firstTicket.highlight),
      );
      if (firstHighlightMessage) {
        setActiveHighlights((current) => ({
          ...current,
          [String(firstHighlightMessage.id)]: firstTicket.highlight,
        }));
        createPhantomKeyword(firstTicket.highlight);
      }

      await wait(2000);

      setFastForward(true);
      await wait(500);

      let delay = 600;
      for (const ticket of supervisorScenarioState.tickets.slice(1)) {
        for (const message of ticket.messages) {
          setMessages((current) => [...current, message]);
          await wait(delay / 1.5);
        }

        const highlightMessage = ticket.messages.find(
          (message) => message.tone === "user" && message.text.includes(ticket.highlight),
        );
        if (highlightMessage) {
          setActiveHighlights((current) => ({
            ...current,
            [String(highlightMessage.id)]: ticket.highlight,
          }));
          createPhantomKeyword(ticket.highlight);
        }

        delay = Math.max(250, delay * 0.7);
        await wait(delay * 1.5);
      }

      for (let index = 0; index < supervisorScenarioState.fakeWaveCount; index += 1) {
        const keyword =
          escalationKeywordPool[Math.floor(Math.random() * escalationKeywordPool.length)] ??
          "HUMAN";
        const userId = createId(`user-${index}`);

        setMessages((current) => [
          ...current,
          {
            id: userId,
            author: `User_${index}`,
            text: replaceTemplateValue(
              supervisorScenarioState.fakeWaveUserTemplate,
              keyword,
            ),
            tone: "user",
          },
          {
            id: createId(`bot-${index}`),
            author: supervisorScenarioState.botName,
            text: supervisorScenarioState.waitReply,
            tone: "bot",
            appBadge: true,
          },
        ]);

        setActiveHighlights((current) => ({ ...current, [userId]: keyword }));
        createPhantomKeyword(keyword);

        await wait(Math.max(120, 300 - index * 15));
      }

      setFastForward(false);

      await wait(1000);
      setShowThought(true);
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
        @keyframes fadeInOverlay {
          from { opacity: 0; backdrop-filter: blur(0px); background-color: rgba(0, 0, 0, 0); }
          to { opacity: 1; backdrop-filter: blur(2px); background-color: rgba(0, 0, 0, 0.4); }
        }
        @keyframes popInBubble {
          from { opacity: 0; transform: scale(0.78) rotate(-6deg); }
          to { opacity: 1; transform: scale(1) rotate(-2deg); }
        }
        @keyframes highlightPulse {
          0% { transform: scale(1); background-color: transparent; color: inherit; box-shadow: none; }
          15% { transform: scale(1.8) translateY(-5px); background-color: #ed4245; color: white; padding: 4px 12px; border-radius: 8px; box-shadow: 0 10px 25px rgba(237, 66, 69, 0.6); z-index: 50; }
          25% { transform: scale(1.6) translateY(-5px) rotate(-3deg); background-color: #ed4245; color: white; padding: 4px 12px; border-radius: 8px; box-shadow: 0 8px 20px rgba(237, 66, 69, 0.5); z-index: 50; }
          35% { transform: scale(1.7) translateY(-5px) rotate(2deg); background-color: #ed4245; color: white; padding: 4px 12px; border-radius: 8px; box-shadow: 0 10px 25px rgba(237, 66, 69, 0.6); z-index: 50; }
          100% { transform: scale(1.3) translateY(-2px); background-color: #ed4245; color: white; padding: 2px 8px; border-radius: 6px; box-shadow: 0 4px 15px rgba(237, 66, 69, 0.8); z-index: 50; }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(237, 66, 69, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(237, 66, 69, 0); }
          100% { box-shadow: 0 0 0 0 rgba(237, 66, 69, 0); }
        }
        .fast-forward-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          box-shadow: inset 0 0 150px rgba(237, 66, 69, 0.2);
          animation: pulseGlow 0.5s infinite;
          z-index: 50;
        }
        @keyframes phantomFade {
          0% { opacity: 0; transform: scale(0.5) translate(0, 20px); filter: blur(8px); }
          30% { opacity: 0.9; transform: scale(1.2) translate(0, -5px) rotate(calc(var(--rot) * 1deg)); filter: blur(0px); color: #ed4245; text-shadow: 0 0 30px rgba(237, 66, 69, 1); }
          70% { opacity: 0.6; transform: scale(1) translate(0, -10px) rotate(calc(var(--rot) * 1deg)); filter: blur(2px); color: #ff7373; text-shadow: 0 0 15px rgba(237, 66, 69, 0.5); }
          100% { opacity: 0; transform: scale(1.8) translate(0, -30px) rotate(calc(var(--rot) * 1deg)); filter: blur(12px); }
        }
        .inline-highlight {
          display: inline-block;
          font-weight: 800;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.27);
        }
        .inline-highlight.active {
          animation: highlightPulse 2.8s cubic-bezier(0.175, 0.885, 0.32, 1.27) forwards;
          position: relative;
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

      {showThought ? (
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
            animation: "fadeInOverlay 0.4s ease-out forwards",
          }}
        >
          <div
            style={{
              background: "#ed4245",
              padding: "40px 60px",
              borderRadius: "32px",
              maxWidth: "600px",
              boxShadow: "0 24px 80px rgba(237, 66, 69, 0.5)",
              border: "4px solid #ff7373",
              textAlign: "center",
              transform: "rotate(-2deg)",
              animation: "popInBubble 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.27) forwards",
            }}
          >
            <h3
              style={{
                margin: "0 0 24px",
                color: "#fff",
                fontSize: "32px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {supervisorScenarioState.summary.title}
            </h3>
            <div
              style={{
                color: "#fff",
                fontSize: "28px",
                lineHeight: "1.6",
                margin: 0,
                fontWeight: "bold",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {supervisorScenarioState.summary.lines.map((line, index) => (
                <span
                  key={line}
                  style={
                    index === supervisorScenarioState.summary.lines.length - 1
                      ? {
                          fontSize: "36px",
                          marginTop: "16px",
                          textDecoration: "underline",
                          textUnderlineOffset: "8px",
                        }
                      : undefined
                  }
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="app-grid">
        <div className="column-server">
          <div className="server-rail" style={{ flex: 1, paddingBottom: 0 }}>
            <div className="server-icon server-icon--home">dc</div>
            <div className="server-divider" />
            <div className="server-slot server-slot--selected">
              <div className="server-indicator" />
              <div className="server-icon server-icon--community">
                {supervisorScenarioState.serverLabel}
              </div>
              <span className="server-badge">{supervisorScenarioState.serverBadge}</span>
            </div>
          </div>
          <div style={{ height: "68px", flexShrink: 0, background: "#111214" }} />
        </div>

        <div className="column-channel">
          <div className="guild-header" style={{ flexShrink: 0 }}>
            <div className="guild-header__title">
              <strong>{supervisorScenarioState.guildName}</strong>
              <span>v</span>
            </div>
          </div>

          <div className="channel-group" style={{ flex: 1, paddingTop: "10px" }}>
            <span className="channel-group__title">{supervisorScenarioState.queueLabel}</span>
            <button type="button" className="channel-item channel-item--active">
              <span className="channel-item__symbol">#</span>
              <span className="channel-item__label">{supervisorScenarioState.channelName}</span>
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
                name={supervisorScenarioState.assignee.name}
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
                  {supervisorScenarioState.assignee.name}
                </span>
                <span style={{ fontSize: "12px", color: "#b5bac1", lineHeight: 1.2 }}>
                  {supervisorScenarioState.assignee.tag}
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
          <header className="content-stage__header" style={{ flexShrink: 0 }}>
            <div className="content-stage__meta">
              <strong># {supervisorScenarioState.channelName}</strong>
            </div>
          </header>

          <div
            className="content-stage__body"
            ref={scrollContainerRef}
            style={{ paddingBottom: "20px" }}
          >
            <section className="message-stack">
              {messages.map((message) => {
                const highlight = activeHighlights[String(message.id)];

                return (
                  <article
                    className={message.tone === "bot" ? "bot-thread" : "user-message"}
                    key={message.id}
                  >
                    <DiscordAvatar
                      name={message.author}
                      className="discord-avatar--message"
                    />
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
                        <span>{message.timestamp ?? "Just now"}</span>
                      </div>

                      <div className={message.tone === "bot" ? "bot-message" : "user-message__text"}>
                        <p>
                          {message.tone === "user" && highlight && message.text.includes(highlight)
                            ? message.text.split(highlight).map((part, index, parts) => (
                                <span key={`${message.id}-${index}`}>
                                  {part}
                                  {index < parts.length - 1 ? (
                                    <span className="inline-highlight active">{highlight}</span>
                                  ) : null}
                                </span>
                              ))
                            : message.text}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
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
                  color: "#5c5e66",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Message #{supervisorScenarioState.channelName}
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
                  opacity: 0.5,
                  cursor: "not-allowed",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="column-member">
          <div className="member-group" style={{ padding: "24px 8px" }}>
            <span className="member-group__title">ASSIGNEE</span>
            <div className="member-row member-row--rose">
              <DiscordAvatar
                name={supervisorScenarioState.assignee.name}
                className="discord-avatar--compact"
                status="online"
              />
              <span>{supervisorScenarioState.assignee.name}</span>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ height: "68px", flexShrink: 0, background: "#2b2d31" }} />
        </div>
      </div>
    </main>
  );
}
