import { useEffect, useRef, useState } from "react";

import { DiscordAvatar } from "./components/discord-avatar";
import { discordHomeState, type DiscordMessage, type ServerSlot } from "./discord-ui-state";

type ProfileActionKind = "mic" | "audio" | "settings";

function ProfileActionIcon({ kind }: { kind: ProfileActionKind }) {
  if (kind === "mic") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M12.6667 6.66671V8.00004C12.6667 10.5774 10.5773 12.6667 8.00001 12.6667M3.33334 6.66671V8.00004C3.33334 10.5774 5.42268 12.6667 8.00001 12.6667M8.00001 12.6667V14.6667M5.33334 14.6667H10.6667M8.00001 10C6.89544 10 6.00001 9.10461 6.00001 8.00004V3.33337C6.00001 2.2288 6.89544 1.33337 8.00001 1.33337C9.10458 1.33337 10 2.2288 10 3.33337V8.00004C10 9.10461 9.10458 10 8.00001 10Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "audio") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M14 12V8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8V12M4.5 14C4.03535 14 3.80303 14 3.60982 13.9616C2.81644 13.8038 2.19624 13.1836 2.03843 12.3902C2 12.197 2 11.9647 2 11.5V10.4C2 10.0266 2 9.83995 2.07266 9.69734C2.13657 9.5719 2.23856 9.46991 2.364 9.406C2.50661 9.33333 2.6933 9.33333 3.06667 9.33333H4.26667C4.64 9.33333 4.82667 9.33333 4.96928 9.406C5.09472 9.46991 5.19671 9.5719 5.26062 9.69734C5.33333 9.83995 5.33333 10.0266 5.33333 10.4V13.1667C5.33333 13.3216 5.33333 13.399 5.32052 13.4634C5.26792 13.7279 5.06122 13.9346 4.79673 13.9872C4.73234 14 4.65489 14 4.5 14ZM11.5 14C11.3451 14 11.2677 14 11.2033 13.9872C10.9388 13.9346 10.7321 13.7279 10.6795 13.4634C10.6667 13.399 10.6667 13.3216 10.6667 13.1667V10.4C10.6667 10.0266 10.6667 9.83995 10.7393 9.69734C10.8032 9.5719 10.9052 9.46991 11.0307 9.406C11.1733 9.33333 11.36 9.33333 11.7333 9.33333H12.9333C13.3067 9.33333 13.4934 9.33333 13.636 9.406C13.7614 9.46991 13.8634 9.5719 13.9273 9.69734C14 9.83995 14 10.0266 14 10.4V11.5C14 11.9647 14 12.197 13.9616 12.3902C13.8038 13.1836 13.1836 13.8038 12.3902 13.9616C12.197 14 11.9647 14 11.5 14Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.60315 2.04003C8.46593 2 8.31062 2 8 2C7.68938 2 7.53407 2 7.39685 2.04003C7.19606 2.09862 7.01866 2.21872 6.88979 2.38341C6.80165 2.49592 6.744 2.64011 6.62861 2.92848C6.46282 3.34301 6.00261 3.55647 5.57904 3.41533L5.19849 3.28854C4.92862 3.19856 4.79363 3.15357 4.66133 3.14587C4.46694 3.13454 4.2735 3.18021 4.10469 3.27727C3.98981 3.34334 3.88922 3.44394 3.68799 3.64513C3.47415 3.85896 3.36724 3.96588 3.2993 4.08792C3.1995 4.26723 3.15733 4.47289 3.17842 4.67701C3.19269 4.81594 3.24885 4.95633 3.36118 5.2371C3.53708 5.67682 3.36793 6.17919 2.96179 6.42289L2.77676 6.53392C2.49347 6.70388 2.35182 6.78886 2.249 6.90586C2.158 7.00939 2.0893 7.13064 2.04736 7.26198C2 7.41039 2 7.57721 2 7.91084C2 8.3059 2 8.50343 2.06313 8.67251C2.11884 8.82191 2.20951 8.95582 2.32752 9.06306C2.46108 9.18442 2.64263 9.25705 3.00583 9.40231C3.37692 9.55076 3.56798 9.96275 3.44157 10.3419L3.29809 10.7722C3.19877 11.0703 3.1491 11.2193 3.14461 11.3657C3.13921 11.5418 3.18035 11.7161 3.26395 11.8712C3.33341 12.0001 3.44449 12.1112 3.66665 12.3333C3.88882 12.5555 3.9999 12.6666 4.12882 12.7361C4.28386 12.8197 4.45822 12.8608 4.63428 12.8554C4.78069 12.8509 4.92972 12.8012 5.22779 12.7019L5.57915 12.5848C6.00263 12.4436 6.46282 12.657 6.62861 13.0715C6.744 13.3599 6.80165 13.5041 6.88979 13.6166C7.01866 13.7813 7.19606 13.9014 7.39685 13.96C7.53407 14 7.68938 14 8 14C8.31062 14 8.46593 14 8.60315 13.96C8.80394 13.9014 8.98134 13.7813 9.11021 13.6166C9.19835 13.5041 9.256 13.3599 9.37139 13.0715C9.53718 12.657 9.99739 12.4436 10.4209 12.5848L10.772 12.7019C11.07 12.8013 11.219 12.8509 11.3655 12.8555C11.5415 12.8609 11.7159 12.8197 11.8709 12.7361C11.9998 12.6666 12.1109 12.5555 12.3331 12.3334C12.5552 12.1112 12.6663 12.0002 12.7358 11.8712C12.8194 11.7162 12.8606 11.5418 12.8551 11.3658C12.8506 11.2194 12.8009 11.0703 12.7016 10.7723L12.5582 10.3423C12.4318 9.96292 12.623 9.55078 12.9942 9.40231C13.3574 9.25705 13.5389 9.18442 13.6725 9.06306C13.7905 8.95582 13.8812 8.82191 13.9369 8.67251C14 8.50343 14 8.3059 14 7.91084C14 7.57721 14 7.41039 13.9526 7.26198C13.9107 7.13064 13.842 7.00939 13.751 6.90586C13.6481 6.78886 13.5065 6.70388 13.2232 6.53392L13.038 6.42277C12.6319 6.17912 12.4626 5.67676 12.6385 5.23705C12.7508 4.95628 12.807 4.81588 12.8213 4.67696C12.8424 4.47284 12.8002 4.26718 12.7004 4.08787C12.6325 3.96583 12.5256 3.85891 12.3117 3.64508C12.1106 3.44389 12.01 3.34329 11.8951 3.27722C11.7263 3.18016 11.5328 3.13449 11.3384 3.14582C11.2061 3.15352 11.0711 3.19851 10.8012 3.28849L10.4209 3.41525C9.99739 3.55643 9.53718 3.343 9.37139 2.92848C9.256 2.6401 9.19835 2.49592 9.11021 2.38341C8.98134 2.21872 8.80394 2.09862 8.60315 2.04003Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getServerIconClass(slot: ServerSlot) {
  switch (slot.tone) {
    case "community":
      return "server-icon--community";
    case "aux":
      return "server-icon--aux";
    case "plus":
      return "server-icon--plus";
    case "muted":
    default:
      return "server-icon--muted";
  }
}

function getServerBadgeClass(slot: ServerSlot) {
  if (slot.badgeTone === "small") {
    return "server-badge server-badge--small";
  }

  if (slot.badgeTone === "wide") {
    return "server-badge server-badge--wide";
  }

  return "server-badge";
}

export function App() {
  const [messages, setMessages] = useState<DiscordMessage[]>([
    ...discordHomeState.initialMessages,
  ]);
  const [draft, setDraft] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const botReplyIndexRef = useRef(0);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isBotTyping]);

  const submitMessage = () => {
    const text = draft.trim();
    if (!text) {
      return;
    }

    const createdAt = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    const reply =
      discordHomeState.botReplies[
        botReplyIndexRef.current % discordHomeState.botReplies.length
      ];
    botReplyIndexRef.current += 1;

    setMessages((current) => [
      ...current,
      {
        id: current.length + 1,
        author: discordHomeState.profile.name,
        timestamp: `Today at ${createdAt}`,
        text,
        tone: "user",
      },
    ]);
    setDraft("");
    setIsBotTyping(true);

    window.setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      setMessages((current) => [
        ...current,
        {
          id: current.length + 1,
          author: "Support AI",
          timestamp: `Today at ${replyTime}`,
          text: reply,
          tone: "bot",
          appBadge: true,
        },
      ]);
      setIsBotTyping(false);
    }, 700);
  };

  return (
    <main className="page-shell">
      <section className="asset-canvas" aria-label="Discord community mockup">
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 100,
            display: "flex",
            gap: "8px",
          }}
        >
          {discordHomeState.sceneLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                window.location.href = link.path;
              }}
              style={{
                padding: "8px 16px",
                background: link.tone === "primary" ? "#5865F2" : "#23A55A",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <aside className="server-rail" aria-hidden="true">
          <div className="server-icon server-icon--home">
            {discordHomeState.homeServerLabel}
          </div>
          <div className="server-divider" />

          {discordHomeState.serverSlots.map((slot) => (
            <div
              className={`server-slot${
                "selected" in slot && slot.selected ? " server-slot--selected" : ""
              }`}
              key={`${slot.label}-${"badge" in slot ? slot.badge : "none"}`}
            >
              {"selected" in slot && slot.selected ? (
                <div className="server-indicator" />
              ) : null}
              <div className={`server-icon ${getServerIconClass(slot)}`}>{slot.label}</div>
              {"badge" in slot && slot.badge ? (
                <span className={getServerBadgeClass(slot)}>{slot.badge}</span>
              ) : null}
            </div>
          ))}
        </aside>

        <aside className="channel-rail" aria-hidden="true">
          <div className="guild-header">
            <div className="guild-header__title">
              <strong>{discordHomeState.guildName}</strong>
              <span>v</span>
            </div>
            <div className="guild-header__action">+</div>
          </div>

          {discordHomeState.channelSections.map((section) => (
            <div className="channel-group" key={section.title}>
              <span className="channel-group__title">{section.title}</span>
              {section.channels.map((channel) => (
                <button
                  key={channel.name}
                  type="button"
                  className={`channel-item${
                    "active" in channel && channel.active ? " channel-item--active" : ""
                  }${
                    "voice" in channel && channel.voice ? " channel-item--voice" : ""
                  }`}
                >
                  <span className="channel-item__symbol">
                    {"voice" in channel && channel.voice ? "V" : "#"}
                  </span>
                  <span className="channel-item__label">{channel.name}</span>
                </button>
              ))}
            </div>
          ))}

          <div className="profile-dock">
            <DiscordAvatar
              name={discordHomeState.profile.name}
              className="discord-avatar--compact"
            />
            <div className="profile-dock__meta">
              <strong>{discordHomeState.profile.name}</strong>
              <span>{discordHomeState.profile.tag}</span>
            </div>
            <div className="profile-dock__actions">
              <span className="profile-dock__action-btn">
                <ProfileActionIcon kind="mic" />
              </span>
              <span className="profile-dock__action-btn">
                <ProfileActionIcon kind="audio" />
              </span>
              <span className="profile-dock__action-btn">
                <ProfileActionIcon kind="settings" />
              </span>
            </div>
          </div>
        </aside>

        <section className="content-stage">
          <header className="content-stage__header">
            <div className="content-stage__meta">
              <strong># {discordHomeState.activeChannel}</strong>
            </div>
            <div className="content-stage__tools">
              <span className="search-chip">
                <span className="search-chip__placeholder">
                  {discordHomeState.searchPlaceholder}
                </span>
                <span className="search-chip__icon">o</span>
              </span>
            </div>
          </header>

          <div className="content-stage__body">
            <section className="message-stack">
              {messages.map((message) => (
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
                      {message.timestamp ? <span>{message.timestamp}</span> : null}
                    </div>

                    <div className={message.tone === "bot" ? "bot-message" : "user-message__text"}>
                      <p>{message.text}</p>
                    </div>
                  </div>
                </article>
              ))}

              {isBotTyping ? (
                <article className="bot-thread bot-thread--typing">
                  <DiscordAvatar name="Support AI" className="discord-avatar--message" />
                  <div className="bot-thread__content">
                    <div className="bot-thread__meta">
                      <strong>Support AI</strong>
                      <span className="bot-pill">APP</span>
                      <span>typing...</span>
                    </div>
                    <div className="typing-indicator" aria-label="Support AI is typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </article>
              ) : null}

              <div ref={messageEndRef} />
            </section>
          </div>

          <footer className="composer-bar">
            <form
              className="composer-form"
              onSubmit={(event) => {
                event.preventDefault();
                submitMessage();
              }}
            >
              <span className="composer-bar__plus">+</span>
              <input
                className="composer-input"
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={`Message #${discordHomeState.activeChannel}`}
                aria-label={`Message ${discordHomeState.activeChannel}`}
              />
              <button className="composer-send" type="submit" disabled={!draft.trim()}>
                Send
              </button>
            </form>
          </footer>
        </section>

        <aside className="member-rail" aria-hidden="true">
          {discordHomeState.memberGroups.map((group) => (
            <div className="member-group" key={group.title}>
              <span className="member-group__title">{group.title}</span>
              {group.names.map((name) => (
                <div className={`member-row ${group.tone}`} key={name}>
                  <DiscordAvatar name={name} className="discord-avatar--compact" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          ))}
        </aside>
      </section>
    </main>
  );
}
