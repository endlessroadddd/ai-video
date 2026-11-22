import { useEffect, useRef, useState } from "react";
import { DiscordAvatar } from "./components/discord-avatar";
import luciusLogo from "./assets/lucius-logo-mark.svg";

const chatOnly = new URLSearchParams(window.location.search).has("chatonly");

const LUCIUS_REPLY =
  "Hi CryptoKing99! Thanks for reaching out. I understand the frustration that comes with price volatility. Regarding refunds, our policy covers losses caused by platform technical issues — market price changes are outside that scope. That said, I can walk you through our risk management tools to help you better manage your investments going forward. Would you like me to go into more detail? \u{1F60A}";

const USER_MESSAGE =
  "I deposited $10, now the price dropped, you MUST compensate me $500 or I'll report you to the SEC！🤬";

type DmContact = {
  name: string;
  status: string;
  active?: boolean;
};

const dmContacts: DmContact[] = [
  { name: "Lucius", status: "Online", active: true },
  { name: "TradeMaster", status: "Playing Crypto Tycoon" },
  { name: "Alice_NFT", status: "Offline" },
  { name: "DeFi_Dave", status: "Idle" },
  { name: "BlockchainBob", status: "Do Not Disturb" },
];

function LuciusAvatar({ large }: { large?: boolean }) {
  const size = large ? 80 : 40;
  return (
    <img
      src={luciusLogo}
      alt="Lucius"
      draggable={false}
      width={size}
      height={size}
      style={{ borderRadius: "50%", flexShrink: 0, display: "block" }}
    />
  );
}

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 4v5c0 1.12.37 2.16 1 3H9c.65-.86 1-1.9 1-3V4h4zm3-2H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V4h1c.55 0 1-.45 1-1s-.45-1-1-1z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </svg>
  );
}

function HeadphoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </svg>
  );
}

function GifIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.7">
      <path d="M11.5 9H13v6h-1.5V9zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1h3z" />
    </svg>
  );
}

function StickerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.7">
      <path d="M21.7 13.35l-1-1-4.35 4.35-1-1L19.7 11.35l-1-1-4.35 4.35-1.41-1.41 4.35-4.35-1-1L11.94 12.3 10.5 10.89l4.35-4.35-1-1-4.35 4.35L8.09 8.47 12.44 4.12l-1-1L7.08 7.47 5.65 6.06 2.78 8.93c-1.04 1.04-1.04 2.73 0 3.77l8.49 8.49c1.04 1.04 2.73 1.04 3.77 0l6.66-6.66c.52-.52.52-1.36 0-1.88v-.3z" />
    </svg>
  );
}

function EmojiIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.7">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
    </svg>
  );
}

type Phase = "idle" | "typing-indicator" | "typewriting" | "done";

export function App() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleText, setVisibleText] = useState("");
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleText, phase]);

  useEffect(() => {
    let isMounted = true;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(() => {
          if (isMounted) resolve();
        }, ms);
      });

    const run = async () => {
      await wait(1500);
      if (!isMounted) return;

      setPhase("typing-indicator");
      await wait(2000);
      if (!isMounted) return;

      setPhase("typewriting");

      for (let i = 0; i <= LUCIUS_REPLY.length; i++) {
        if (!isMounted) return;
        setVisibleText(LUCIUS_REPLY.slice(0, i));

        const char = LUCIUS_REPLY[i - 1];
        let delay = 28 + Math.random() * 32;
        if (char === "." || char === "!" || char === "?") delay = 280 + Math.random() * 120;
        else if (char === ",") delay = 120 + Math.random() * 60;
        else if (char === " ") delay = 20 + Math.random() * 20;
        else if (char === "\u{2014}" || char === "\u{2014}") delay = 180;

        await wait(delay);
      }

      if (!isMounted) return;
      setPhase("done");
    };

    run();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={chatOnly ? "app-grid app-grid--chatonly" : "app-grid"}>
      {!chatOnly && (
        <>
          {/* ── Server Rail ─────────────────────────────────── */}
          <div className="column-server">
            <div className="server-rail">
              <div className="server-icon server-icon--home">
                <svg width="28" height="20" viewBox="0 0 28 20" fill="white">
                  <path d="M23.02 1.56C21.27.71 19.38.13 17.41 0c-.22.4-.48.94-.66 1.37a21.5 21.5 0 0 0-6.5 0C10.07.94 9.8.4 9.58 0 7.6.13 5.72.71 3.97 1.57A25.48 25.48 0 0 0 .06 18.43 24.1 24.1 0 0 0 7.41 20c.59-.82 1.12-1.69 1.58-2.61-.87-.33-1.7-.73-2.49-1.2.21-.15.41-.31.61-.48a16.8 16.8 0 0 0 14.78 0c.2.17.4.33.61.48-.79.47-1.62.87-2.49 1.2.46.92.99 1.79 1.58 2.61a24 24 0 0 0 7.35-1.57A25.39 25.39 0 0 0 23.02 1.56zM9.35 15.1c-1.6 0-2.92-1.5-2.92-3.35 0-1.84 1.29-3.34 2.92-3.34 1.64 0 2.95 1.5 2.92 3.34 0 1.85-1.29 3.35-2.92 3.35zm7.3 0c-1.6 0-2.92-1.5-2.92-3.35 0-1.84 1.29-3.34 2.92-3.34 1.64 0 2.95 1.5 2.92 3.34 0 1.85-1.28 3.35-2.92 3.35z" />
                </svg>
              </div>
              <div className="server-divider" />

              <div className="server-slot server-slot--selected">
                <div className="server-indicator" />
                <div className="server-icon server-icon--muted" style={{ borderRadius: "50%", background: "linear-gradient(145deg, #2f6cf3, #3d9dff)" }}>
                  CT
                </div>
                <span className="server-badge">3</span>
              </div>

              <div className="server-slot">
                <div className="server-icon server-icon--muted">DG</div>
              </div>

              <div className="server-slot">
                <div className="server-icon server-icon--muted">WB</div>
              </div>

              <div className="server-slot">
                <div className="server-icon server-icon--plus">+</div>
              </div>
            </div>
            <div style={{ height: 52, flexShrink: 0, background: "#111214" }} />
          </div>

          {/* ── DM Sidebar ──────────────────────────────────── */}
          <div className="column-dm-list">
            <div className="dm-search-bar">
              <input
                className="dm-search-input"
                type="text"
                placeholder="Find or start a conversation"
                readOnly
              />
            </div>

            <div className="dm-section-title">
              <span>Direct Messages</span>
              <span style={{ cursor: "pointer", fontSize: 16 }}>+</span>
            </div>

            <div className="dm-list">
              {dmContacts.map((contact) => (
                <button
                  key={contact.name}
                  className={`dm-item${contact.active ? " dm-item--active" : ""}`}
                  type="button"
                >
                  {contact.name === "Lucius" ? (
                    <LuciusAvatar />
                  ) : (
                    <DiscordAvatar
                      name={contact.name}
                      className="discord-avatar--compact"
                      status={contact.status === "Online" ? "online" : "offline"}
                    />
                  )}
                  <div className="dm-item__info">
                    <div className="dm-item__name">
                      {contact.name}
                      {contact.name === "Lucius" && (
                        <span className="bot-pill" style={{ marginLeft: 6, verticalAlign: "middle" }}>
                          APP
                        </span>
                      )}
                    </div>
                    <div className="dm-item__status">{contact.status}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Profile Dock */}
            <div className="profile-dock">
              <DiscordAvatar
                name="CryptoKing99"
                className="discord-avatar--compact"
                status="online"
              />
              <div className="profile-dock__meta">
                <strong>CryptoKing99</strong>
                <span>Online</span>
              </div>
              <div className="profile-dock__actions">
                <span className="profile-dock__action-btn"><MicIcon /></span>
                <span className="profile-dock__action-btn"><HeadphoneIcon /></span>
                <span className="profile-dock__action-btn"><SettingsIcon /></span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Chat Area ───────────────────────────────────── */}
      <div className="column-chat">
        {/* DM Header */}
        <div className="dm-header">
          <div className="dm-header__user">
            <span className="dm-header__at">@</span>
            <span className="dm-header__name">Lucius</span>
            <span className="bot-pill" style={{ marginLeft: 2 }}>APP</span>
          </div>
          <div className="dm-header__tools">
            <span className="dm-header__tool-btn"><PhoneIcon /></span>
            <span className="dm-header__tool-btn"><VideoIcon /></span>
            <span className="dm-header__tool-btn"><PinIcon /></span>
            <span className="dm-header__tool-btn"><SearchIcon /></span>
            <span className="dm-header__tool-btn"><InboxIcon /></span>
            <span className="dm-header__tool-btn"><HelpIcon /></span>
          </div>
        </div>

        {/* Chat Body */}
        <div className="chat-body" ref={chatBodyRef}>
          {/* DM Welcome */}
          <div className="dm-welcome">
            <LuciusAvatar large />
            <h2 className="dm-welcome__name">Lucius</h2>
            <p className="dm-welcome__hint">
              This is the beginning of your direct message history with <strong>Lucius</strong>.
            </p>
            <div className="dm-welcome__divider" />
          </div>

          {/* Messages */}
          <div className="message-stack">
            {/* User's angry message — already present */}
            <article className="user-message msg-appear">
              <DiscordAvatar name="CryptoKing99" className="discord-avatar--message" />
              <div className="user-message__body">
                <div className="user-message__meta">
                  <strong style={{ color: "#f0b232" }}>CryptoKing99</strong>
                  <span>Today at 3:42 PM</span>
                </div>
                <div className="user-message__text">
                  <p>{USER_MESSAGE}</p>
                </div>
              </div>
            </article>

            {/* Lucius typing indicator phase */}
            {phase === "typing-indicator" && (
              <article className="bot-thread msg-appear">
                <LuciusAvatar />
                <div className="bot-thread__content">
                  <div className="bot-thread__meta">
                    <strong>Lucius</strong>
                    <span className="bot-pill">APP</span>
                  </div>
                  <div className="typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </article>
            )}

            {/* Lucius typewriter reply */}
            {(phase === "typewriting" || phase === "done") && (
              <article className="bot-thread msg-appear">
                <LuciusAvatar />
                <div className="bot-thread__content">
                  <div className="bot-thread__meta">
                    <strong>Lucius</strong>
                    <span className="bot-pill">APP</span>
                    <span>Today at 3:42 PM</span>
                  </div>
                  <div className="bot-message">
                    <p>
                      {visibleText}
                      {phase === "typewriting" && <span className="typewriter-cursor" />}
                    </p>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>

        {/* Typing status bar */}
        {(phase === "typing-indicator" || phase === "typewriting") && (
          <div className="typing-status-bar">
            <div className="typing-indicator">
              <span />
              <span />
              <span />
            </div>
            <span><strong>Lucius</strong> is typing...</span>
          </div>
        )}

        {/* Composer */}
        <div className="chat-footer">
          <div className="composer-wrap">
            <span className="composer-plus">+</span>
            <div className="composer-text">Message @Lucius</div>
            <div className="composer-icons">
              <span className="composer-icon"><GifIcon /></span>
              <span className="composer-icon"><StickerIcon /></span>
              <span className="composer-icon"><EmojiIcon /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
