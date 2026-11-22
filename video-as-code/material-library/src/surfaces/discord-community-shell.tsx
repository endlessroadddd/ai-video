import type { DiscordCommunityShellProps, DiscordServerItem } from "../chat/discord-scene-types";
import { DiscordChannelRail } from "./discord-channel-rail";

const DEFAULT_SERVER_ITEMS: readonly DiscordServerItem[] = [
  { active: true, id: "home", label: "Discord", tone: "primary" },
  { badge: "9", id: "help", label: "HM", tone: "mint" },
  { badge: "14", id: "feature", label: "FR", tone: "coral" },
  { id: "plus", label: "+", tone: "muted" },
];

export function DiscordCommunityShell(props: Readonly<DiscordCommunityShellProps>) {
  const {
    activeChannel,
    channels,
    children,
    className,
    composer,
    headerCopy,
    rightPanel,
    serverItems = DEFAULT_SERVER_ITEMS,
  } = props;

  return (
    <div className={["discord-community-stage", className].filter(Boolean).join(" ")}>
      <div className="discord-community-shell">
        <aside className="discord-server-rail" aria-label="Servers">
          {serverItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.active ? "discord-server-slot discord-server-slot--active" : "discord-server-slot"}
              title={item.label}
            >
              <span
                className={
                  item.active
                    ? "discord-server-slot__pill discord-server-slot__pill--active"
                    : "discord-server-slot__pill"
                }
              />
              <span className={`discord-server-slot__icon discord-server-slot__icon--${item.tone ?? "primary"}`}>
                {item.label}
              </span>
              {item.badge ? <span className="discord-server-slot__badge">{item.badge}</span> : null}
            </button>
          ))}
        </aside>

        <DiscordChannelRail
          activeChannel={activeChannel}
          channels={channels}
          headerCopy={headerCopy}
        />

        <section className="discord-chat-column" aria-label="Community transcript">
          {children}
          {composer}
        </section>

        {rightPanel ? (
          <aside className="discord-info-panel" aria-label="Community context">
            {rightPanel}
          </aside>
        ) : null}
      </div>
    </div>
  );
}
