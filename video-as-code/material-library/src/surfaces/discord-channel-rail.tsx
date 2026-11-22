import type { ChannelItem, DiscordChannelRailProps } from "../chat/discord-scene-types";

function getChannelRowClass(channel: ChannelItem, activeChannel: string): string {
  if (channel.name === activeChannel) {
    return "discord-channel-row discord-channel-row--active";
  }

  if (channel.watch) {
    return "discord-channel-row discord-channel-row--watch";
  }

  if (channel.muted) {
    return "discord-channel-row discord-channel-row--muted";
  }

  return "discord-channel-row";
}

export function DiscordChannelRail(props: Readonly<DiscordChannelRailProps>) {
  const {
    activeChannel,
    channels,
    className,
    headerCopy,
    searchPulse = 0.58,
  } = props;

  return (
    <aside className={["discord-channel-rail", className].filter(Boolean).join(" ")} aria-label="Community channels">
      <div className="discord-channel-rail__header">
        <div>
          {headerCopy.eyebrow ? <p className="discord-channel-rail__eyebrow">{headerCopy.eyebrow}</p> : null}
          <h2>{headerCopy.title}</h2>
        </div>
        <button type="button" className="discord-tool-button discord-tool-button--ghost" aria-label="Add view" />
      </div>

      <label className="discord-channel-rail__search">
        <span>{headerCopy.searchPlaceholder ?? "Search channels"}</span>
        <span className="discord-channel-rail__cursor" style={{ opacity: searchPulse }} />
      </label>

      <p className="discord-channel-rail__section-label">{headerCopy.sectionLabel ?? "Active Threads"}</p>
      <div className="discord-channel-rail__list">
        {channels.map((channel) => (
          <div key={channel.id ?? channel.name} className={getChannelRowClass(channel, activeChannel)}>
            <span className="discord-channel-row__meta">
              <span className="discord-channel-row__hash">#</span>
              <span className="discord-channel-row__name">{channel.label ?? channel.name}</span>
            </span>
            {channel.unread !== undefined ? (
              <span className="discord-channel-row__unread">{channel.unread}</span>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}
