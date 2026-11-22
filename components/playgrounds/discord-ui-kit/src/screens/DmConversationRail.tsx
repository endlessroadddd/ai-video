import type { DmConversationItem } from "../lib/types";
import { DiscordAvatar } from "../shared/DiscordAvatar";
import { PlusIcon, SearchIcon } from "../shared/icons";

type DmConversationRailProps = {
  eyebrow?: string;
  title: string;
  searchPlaceholder: string;
  items: DmConversationItem[];
};

export function DmConversationRail({
  eyebrow = "Private Desk",
  title,
  searchPlaceholder,
  items,
}: DmConversationRailProps) {
  return (
    <aside className="conversation-rail" aria-label="Direct messages">
      <div className="conversation-rail__header">
        <div>
          <p className="conversation-rail__eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <button type="button" className="icon-button">
          <PlusIcon />
        </button>
      </div>

      <label className="search-box">
        <SearchIcon />
        <input type="text" readOnly value="" placeholder={searchPlaceholder} />
      </label>

      <div className="conversation-rail__list">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.active ? "conversation-item conversation-item--active" : "conversation-item"}
          >
            <DiscordAvatar
              name={item.name}
              size={42}
              status={item.status}
              variant={item.variant}
              imageUrl={item.imageUrl}
            />
            <span className="conversation-item__meta">
              <strong>{item.name}</strong>
              <span>{item.subtitle}</span>
            </span>
            {item.unread ? <span className="conversation-item__unread">{item.unread}</span> : null}
          </button>
        ))}
      </div>
    </aside>
  );
}
