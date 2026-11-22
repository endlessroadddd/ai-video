import type { ReactNode } from "react";

import { DiscordAvatar } from "./components/discord-avatar";
import { communityGuildState, type DiscordMessage } from "./discord-ui-state";

type SceneView = "s02" | "s03" | "s04" | "s05a";

function getView(): SceneView {
  const value = new URLSearchParams(window.location.search).get("v");
  if (value === "s03" || value === "s04" || value === "s05a") {
    return value;
  }

  return "s02";
}

const VIEW_LABELS: Record<SceneView, string> = {
  s02: "02 社区全景",
  s03: "03 AI 回复",
  s04: "04 用户反应",
  s05a: "05A 流失",
};

function nav(view: SceneView) {
  window.location.href = `/community?v=${view}`;
}

function navToChart() {
  window.location.href = "/loss-chart";
}

function MessageRow(props: { highlight?: boolean; message: DiscordMessage }) {
  const { highlight = false, message } = props;

  return (
    <article
      className={`message-row${message.tone === "bot" ? " message-row--bot" : ""}${
        highlight ? " message-row--highlight" : ""
      }`}
    >
      <DiscordAvatar
        className="discord-avatar--message"
        name={message.avatarName ?? message.author}
      />

      <div className="message-row__content">
        <div className="message-row__meta">
          <strong className="message-row__author">{message.author}</strong>
          {message.timestamp ? (
            <span className="message-row__time">{message.timestamp}</span>
          ) : null}
        </div>
        <p className="message-row__text">{message.text}</p>
      </div>
    </article>
  );
}

function AiHighlightGroup() {
  const leadMessages = communityGuildState.scene03Messages.slice(0, 4);
  const aiMessages = communityGuildState.scene03Messages.slice(4);

  return (
    <section className="message-stack">
      {leadMessages.map((message) => (
        <MessageRow key={message.id} message={message} />
      ))}

      <div className="ai-highlight-group">
        {aiMessages.map((message) => (
          <MessageRow highlight key={message.id} message={message} />
        ))}
      </div>
    </section>
  );
}

function SceneToolbar(props: { view: SceneView }) {
  const { view } = props;

  return (
    <div className="scene-nav">
      {(["s02", "s03", "s04", "s05a"] as SceneView[]).map((scene) => (
        <button
          className={`scene-nav__button${
            scene === view ? " scene-nav__button--active" : ""
          }`}
          key={scene}
          onClick={() => nav(scene)}
          type="button"
        >
          {VIEW_LABELS[scene]}
        </button>
      ))}

      <button
        className="scene-nav__button scene-nav__button--chart"
        onClick={navToChart}
        type="button"
      >
        05B 折线图
      </button>
    </div>
  );
}

function ServerRail() {
  return (
    <aside className="server-rail" aria-hidden="true">
      <div className="server-icon server-icon--home">
        {communityGuildState.homeServerLabel}
      </div>
      <div className="server-divider" />

      {communityGuildState.serverSlots.map((slot) => (
        <div
          className="server-slot"
          key={`${slot.label}-${"badge" in slot ? slot.badge : "none"}`}
        >
          {"selected" in slot && slot.selected ? <div className="server-indicator" /> : null}
          <div
            className={`server-icon ${
              slot.tone === "community"
                ? "server-icon--community"
                : slot.tone === "aux"
                  ? "server-icon--aux"
                  : slot.tone === "plus"
                    ? "server-icon--plus"
                    : "server-icon--muted"
            }`}
          >
            {slot.label}
          </div>
          {"badge" in slot && slot.badge ? (
            <span
              className={`server-badge${
                "badgeTone" in slot && slot.badgeTone === "small"
                  ? " server-badge--small"
                  : ""
              }`}
            >
              {slot.badge}
            </span>
          ) : null}
        </div>
      ))}
    </aside>
  );
}

function ChannelRail() {
  const section = communityGuildState.channelSections[0];

  return (
    <aside className="channel-rail" aria-hidden="true">
      <div className="guild-header">
        <div className="guild-header__title">
          <strong>{communityGuildState.guildName}</strong>
          <span>⌄</span>
        </div>
      </div>

      <div className="channel-group">
        <span className="channel-group__title">{section.title}</span>
        {section.channels.map((channel) => (
          <button
            className={`channel-item${
              "active" in channel && channel.active ? " channel-item--active" : ""
            }`}
            key={channel.name}
            type="button"
          >
            <span className="channel-item__symbol">{channel.symbol ?? "#"}</span>
            <span className="channel-item__label">{channel.name}</span>
          </button>
        ))}
      </div>

      <div className="profile-dock">
        <DiscordAvatar
          className="discord-avatar--compact"
          name={communityGuildState.profile.name}
          status="online"
        />
        <div className="profile-dock__meta">
          <strong>{communityGuildState.profile.name}</strong>
          <span>{communityGuildState.profile.tag}</span>
        </div>
      </div>
    </aside>
  );
}

function MemberRail() {
  return (
    <aside className="member-rail" aria-hidden="true">
      {communityGuildState.memberGroups.map((group) => (
        <section className="member-group" key={group.title}>
          <span className="member-group__title">{group.title}</span>

          {group.names.map((name) => (
            <div className={`member-row ${group.tone}`} key={name}>
              <DiscordAvatar
                className="discord-avatar--compact"
                name={name}
                status="online"
              />
              <span>{name}</span>
            </div>
          ))}
        </section>
      ))}
    </aside>
  );
}

function MemberRailExits() {
  return (
    <aside className="member-rail member-rail--exits" aria-hidden="true">
      <div className="member-rail__header">
        <div className="member-counter">
          <strong>在线 · {communityGuildState.onlineCounts[2]}</strong>
          <span className="member-counter__trend">248 → 193 → 127</span>
        </div>
      </div>

      <div className="exit-feed">
        {communityGuildState.exitFeed.map((item, index) => (
          <div className="exit-feed__item" key={`${item}-${index}`}>
            <span className="exit-feed__dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function ChatHeader() {
  return (
    <header className="content-stage__header">
      <div className="content-stage__meta">
        <strong>
          {communityGuildState.activeChannelSymbol} {communityGuildState.activeChannel}
        </strong>
        <span>{communityGuildState.channelTopic}</span>
      </div>
    </header>
  );
}

function ChatComposer(props: { blinking?: boolean }) {
  const { blinking = false } = props;

  return (
    <div className="chat-placeholder">
      <span>发送消息到 #{communityGuildState.activeChannel}</span>
      {blinking ? <span className="chat-placeholder__cursor" /> : null}
    </div>
  );
}

function ChatScene(props: {
  bodyClassName?: string;
  children: ReactNode;
  dimmed?: boolean;
  blinkingComposer?: boolean;
}) {
  const { bodyClassName, blinkingComposer = false, children, dimmed = false } = props;

  return (
    <section className={`content-stage${dimmed ? " content-stage--dimmed" : ""}`}>
      <ChatHeader />
      <div className={`content-stage__body${bodyClassName ? ` ${bodyClassName}` : ""}`}>
        {children}
      </div>
      <footer className="composer-bar">
        <ChatComposer blinking={blinkingComposer} />
      </footer>
    </section>
  );
}

function Scene02() {
  return (
    <ChatScene>
      <section className="message-stack">
        {communityGuildState.scene02Messages.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}
      </section>
    </ChatScene>
  );
}

function Scene03() {
  return (
    <ChatScene>
      <AiHighlightGroup />
    </ChatScene>
  );
}

function Scene04() {
  return (
    <ChatScene blinkingComposer>
      <section className="message-stack message-stack--quiet">
        {communityGuildState.scene04Messages.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}
        <div className="message-stack__silence" />
      </section>
    </ChatScene>
  );
}

function Scene05a() {
  return (
    <ChatScene dimmed>
      <section className="message-stack">
        {communityGuildState.scene04Messages.slice(-3).map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}
      </section>
    </ChatScene>
  );
}

export function CommunityScene() {
  const view = getView();

  return (
    <main className="page-shell">
      <SceneToolbar view={view} />

      <div className="app-grid">
        <ServerRail />
        <ChannelRail />
        {view === "s02" ? <Scene02 /> : null}
        {view === "s03" ? <Scene03 /> : null}
        {view === "s04" ? <Scene04 /> : null}
        {view === "s05a" ? <Scene05a /> : null}
        {view === "s05a" ? <MemberRailExits /> : <MemberRail />}
      </div>
    </main>
  );
}
