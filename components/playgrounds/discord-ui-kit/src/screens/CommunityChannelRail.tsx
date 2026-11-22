import type { CommunityChannelItem } from "../lib/types";
import { PlusIcon, SearchIcon } from "../shared/icons";

type CommunityChannelRailProps = {
  eyebrow?: string;
  title: string;
  searchPlaceholder: string;
  items: CommunityChannelItem[];
};

function getChannelSymbol(item: CommunityChannelItem) {
  return item.type === "voice" ? "V" : "#";
}

export function CommunityChannelRail({
  eyebrow = "Community Grid",
  title,
  searchPlaceholder,
  items,
}: CommunityChannelRailProps) {
  return (
    <aside className="conversation-rail" aria-label="Community channels">
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
            <span className="conversation-item__symbol">{getChannelSymbol(item)}</span>
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
