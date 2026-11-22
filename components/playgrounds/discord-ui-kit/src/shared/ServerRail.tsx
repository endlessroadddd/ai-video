import type { SidebarItem } from "../lib/types";
import { PlusIcon } from "./icons";

type ServerRailProps = {
  items: SidebarItem[];
};

export function ServerRail({ items }: ServerRailProps) {
  return (
    <aside className="server-rail" aria-label="Servers">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.active ? "server-slot server-slot--active" : "server-slot"}
          title={item.label}
        >
          <span className={item.active ? "server-slot__pill server-slot__pill--active" : "server-slot__pill"} />
          <span className={`server-slot__icon server-slot__icon--${item.accent ?? "muted"}`}>
            {item.label === "+" ? <PlusIcon /> : item.label}
          </span>
          {item.badge ? <span className="server-slot__badge">{item.badge}</span> : null}
        </button>
      ))}
    </aside>
  );
}
