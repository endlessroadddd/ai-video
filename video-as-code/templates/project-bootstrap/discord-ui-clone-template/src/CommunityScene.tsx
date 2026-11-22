/**
 * CommunityScene.tsx
 * Four static keyframe views for the short video "AI has no personality".
 *
 * URL param: ?v=s02 | s03 | s04 | s05a   (default: s02)
 *
 * s02  — lively community, no AI yet
 * s03  — AI breaks immersion (bot reply highlighted)
 * s04  — user reactions, silence
 * s05a — members leaving, online counter dropping
 */

import { DiscordAvatar } from "./components/discord-avatar";
import { communityGuildState, type DiscordMessage } from "./discord-ui-state";

type SceneView = "s02" | "s03" | "s04" | "s05a";

function getView(): SceneView {
  const p = new URLSearchParams(window.location.search).get("v");
  if (p === "s03" || p === "s04" || p === "s05a") return p;
  return "s02";
}

const VIEW_LABELS: Record<SceneView, string> = {
  s02: "Scene 02 — Community",
  s03: "Scene 03 — AI Reply",
  s04: "Scene 04 — Reactions",
  s05a: "Scene 05a — Exits",
};

function nav(v: SceneView) {
  window.location.href = `/community?v=${v}`;
}

// ── Sub-components ──────────────────────────────────────────────────────────

function MessageRow({ msg, highlight }: { msg: DiscordMessage; highlight?: boolean }) {
  return (
    <article
      style={{
        display: "flex",
        gap: "16px",
        padding: highlight ? "10px 12px" : "4px 16px",
        borderRadius: highlight ? "6px" : undefined,
        background: highlight ? "rgba(88,101,242,0.10)" : undefined,
        border: highlight ? "1.5px solid rgba(88,101,242,0.40)" : undefined,
        marginBottom: highlight ? "4px" : undefined,
        position: "relative",
      }}
    >
      {highlight && (
        <div
          style={{
            position: "absolute",
            left: -1,
            top: -1,
            bottom: -1,
            width: 4,
            background: "#5865f2",
            borderRadius: "6px 0 0 6px",
          }}
        />
      )}
      <DiscordAvatar name={msg.author} className="discord-avatar--message" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            marginBottom: "4px",
          }}
        >
          <strong
            style={{
              fontSize: "15px",
              color: msg.tone === "bot" ? "#8ea0ff" : "#f2f3f5",
            }}
          >
            {msg.author}
          </strong>
          {msg.appBadge && (
            <span className="bot-pill">APP</span>
          )}
          <span style={{ fontSize: "12px", color: "#4e5058" }}>{msg.timestamp}</span>
        </div>
        <div
          style={{
            fontSize: "16px",
            color: msg.tone === "bot" ? "#b5bac1" : "#dbdee1",
            lineHeight: "1.5",
          }}
        >
          {msg.text}
        </div>
      </div>
    </article>
  );
}

function ServerRail() {
  return (
    <div className="column-server">
      <div className="server-rail" style={{ flex: 1, paddingBottom: 0 }}>
        <div className="server-icon server-icon--home">dc</div>
        <div className="server-divider" />
        <div className="server-slot server-slot--selected">
          <div className="server-indicator" />
          <div className="server-icon server-icon--community">MF</div>
        </div>
        <div className="server-slot">
          <div className="server-icon server-icon--aux">GG</div>
          <span className="server-badge server-badge--small">5</span>
        </div>
        <div className="server-slot">
          <div className="server-icon server-icon--plus">+</div>
        </div>
      </div>
      <div style={{ height: "68px", flexShrink: 0, background: "#111214" }} />
    </div>
  );
}

function ChannelRail() {
  return (
    <div className="column-channel">
      <div className="guild-header" style={{ flexShrink: 0 }}>
        <div className="guild-header__title">
          <strong>{communityGuildState.guildName}</strong>
          <span>v</span>
        </div>
      </div>

      <div className="channel-group" style={{ flex: 1, paddingTop: "10px" }}>
        <span className="channel-group__title">TEXT CHANNELS</span>
        {communityGuildState.channelSections[0].channels.map((ch) => (
          <button
            key={ch.name}
            type="button"
            className={`channel-item${"active" in ch && ch.active ? " channel-item--active" : ""}`}
          >
            <span className="channel-item__symbol">#</span>
            <span className="channel-item__label">{ch.name}</span>
          </button>
        ))}
      </div>

      <div className="profile-dock">
        <DiscordAvatar
          name={communityGuildState.profile.name}
          className="discord-avatar--compact"
          status="online"
        />
        <div className="profile-dock__meta">
          <strong>{communityGuildState.profile.name}</strong>
          <span>{communityGuildState.profile.tag}</span>
        </div>
      </div>
    </div>
  );
}

function MemberRail({ dimmed = false }: { dimmed?: boolean }) {
  return (
    <div className="column-member" style={{ opacity: dimmed ? 1 : 1 }}>
      <div className="member-group" style={{ padding: "16px 8px" }}>
        <span className="member-group__title">
          {communityGuildState.memberGroups[0].title}
        </span>
        {communityGuildState.memberGroups[0].names.map((name) => (
          <div className="member-row member-row--rose" key={name}>
            <DiscordAvatar name={name} className="discord-avatar--compact" status="online" />
            <span>{name}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ height: "68px", flexShrink: 0, background: "#2b2d31" }} />
    </div>
  );
}

function MemberRailExits({ onlineCount }: { onlineCount: number }) {
  return (
    <div className="column-member">
      <div style={{ padding: "20px 12px 4px" }}>
        <div
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#ed4245",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Online · {onlineCount}
          <span style={{ fontSize: "18px" }}>↓</span>
        </div>
        <div style={{ fontSize: "12px", color: "#4e5058", marginTop: "2px" }}>
          (was 248)
        </div>
      </div>

      <div className="member-group" style={{ padding: "12px 8px 0" }}>
        <span className="member-group__title">RECENTLY LEFT</span>
        {communityGuildState.exitNames.slice(0, 6).map((name, i) => (
          <div
            key={name}
            className="member-row"
            style={{ opacity: Math.max(0.2, 1 - i * 0.15) }}
          >
            <DiscordAvatar name={name} className="discord-avatar--compact" />
            <span style={{ fontSize: "13px", color: "#4e5058" }}>
              {name}{" "}
              <span style={{ color: "#3e4046" }}>left</span>
            </span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ height: "68px", flexShrink: 0, background: "#2b2d31" }} />
    </div>
  );
}

// ── Scene views ─────────────────────────────────────────────────────────────

function S02() {
  return (
    <div className="column-chat">
      <header className="content-stage__header" style={{ flexShrink: 0 }}>
        <div className="content-stage__meta">
          <strong># {communityGuildState.activeChannel}</strong>
        </div>
      </header>
      <div className="content-stage__body" style={{ justifyContent: "flex-end" }}>
        <section className="message-stack">
          {communityGuildState.scene02Messages.map((msg) => (
            <MessageRow key={msg.id} msg={msg} />
          ))}
        </section>
      </div>
      <div className="chat-footer">
        <div style={{ display: "flex", alignItems: "center", background: "#383a40", borderRadius: "8px", padding: "0 16px", flex: 1, height: "44px" }}>
          <span style={{ flex: 1, color: "#5c5e66", fontSize: "15px" }}>
            Message #{communityGuildState.activeChannel}
          </span>
        </div>
      </div>
    </div>
  );
}

function S03() {
  const botIds = new Set(["s3-5", "s3-6"]);
  return (
    <div className="column-chat">
      <header className="content-stage__header" style={{ flexShrink: 0 }}>
        <div className="content-stage__meta">
          <strong># {communityGuildState.activeChannel}</strong>
        </div>
      </header>
      <div className="content-stage__body" style={{ justifyContent: "flex-end" }}>
        <section className="message-stack">
          {communityGuildState.scene03Messages.map((msg) => (
            <MessageRow
              key={msg.id}
              msg={msg}
              highlight={botIds.has(msg.id)}
            />
          ))}
        </section>
      </div>
      <div className="chat-footer">
        <div style={{ display: "flex", alignItems: "center", background: "#383a40", borderRadius: "8px", padding: "0 16px", flex: 1, height: "44px" }}>
          <span style={{ flex: 1, color: "#5c5e66", fontSize: "15px" }}>
            Message #{communityGuildState.activeChannel}
          </span>
        </div>
      </div>
    </div>
  );
}

function S04() {
  return (
    <div className="column-chat">
      <header className="content-stage__header" style={{ flexShrink: 0 }}>
        <div className="content-stage__meta">
          <strong># {communityGuildState.activeChannel}</strong>
        </div>
      </header>
      <div className="content-stage__body" style={{ justifyContent: "flex-end" }}>
        <section className="message-stack">
          {communityGuildState.scene04Messages.map((msg) => (
            <MessageRow key={msg.id} msg={msg} />
          ))}
          {/* Silence — empty space after last message */}
          <div style={{ height: "32px" }} />
        </section>
      </div>
      <div className="chat-footer">
        <div style={{ display: "flex", alignItems: "center", background: "#383a40", borderRadius: "8px", padding: "0 16px", flex: 1, height: "44px" }}>
          <span style={{ flex: 1, color: "#5c5e66", fontSize: "15px" }}>
            Message #{communityGuildState.activeChannel}
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "16px",
                background: "#dbdee1",
                marginLeft: "2px",
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

function S05a() {
  return (
    <>
      {/* Dimmed chat */}
      <div className="column-chat" style={{ opacity: 0.25, pointerEvents: "none" }}>
        <header className="content-stage__header" style={{ flexShrink: 0 }}>
          <div className="content-stage__meta">
            <strong># {communityGuildState.activeChannel}</strong>
          </div>
        </header>
        <div className="content-stage__body">
          <section className="message-stack">
            {communityGuildState.scene04Messages.slice(-2).map((msg) => (
              <MessageRow key={msg.id} msg={msg} />
            ))}
          </section>
        </div>
        <div className="chat-footer">
          <div style={{ display: "flex", alignItems: "center", background: "#383a40", borderRadius: "8px", padding: "0 16px", flex: 1, height: "44px" }}>
            <span style={{ flex: 1, color: "#5c5e66", fontSize: "15px" }}>
              Message #{communityGuildState.activeChannel}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Root ────────────────────────────────────────────────────────────────────

export function CommunityScene() {
  const view = getView();

  return (
    <main className="page-shell">
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .content-stage__body {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
        }
        .message-stack { padding: 0 0 8px; }
      `}</style>

      {/* Scene navigation */}
      <div
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: 200,
          display: "flex",
          gap: "6px",
        }}
      >
        {(["s02", "s03", "s04", "s05a"] as SceneView[]).map((v) => (
          <button
            key={v}
            onClick={() => nav(v)}
            style={{
              padding: "6px 14px",
              background: v === view ? "#5865f2" : "#2b2d31",
              color: v === view ? "#fff" : "#b5bac1",
              border: `1px solid ${v === view ? "#5865f2" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: v === view ? 600 : 400,
              cursor: "pointer",
            }}
          >
            {VIEW_LABELS[v]}
          </button>
        ))}
      </div>

      <div className="app-grid">
        <ServerRail />
        <ChannelRail />

        {view === "s02" && <S02 />}
        {view === "s03" && <S03 />}
        {view === "s04" && <S04 />}
        {view === "s05a" && <S05a />}

        {view === "s05a"
          ? <MemberRailExits onlineCount={127} />
          : <MemberRail />
        }
      </div>
    </main>
  );
}
