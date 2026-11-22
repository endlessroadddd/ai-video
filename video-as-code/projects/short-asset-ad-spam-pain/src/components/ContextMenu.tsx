import type { CSSProperties, ReactElement } from "react";
import type { MenuEntry, MenuIconName, StageAnchor, StageRect } from "../data/scene";
import { resolveStagePoint } from "../data/scene";
import {
  BanIcon,
  CheckIcon,
  KickIcon,
  MessageIcon,
  SearchIcon,
  ShieldIcon,
  SparkIcon,
  TrashIcon,
} from "./icons";

interface ContextMenuProps {
  visible: boolean;
  anchor: StageAnchor;
  stageRect: StageRect;
  items: readonly MenuEntry[];
}

const iconMap: Record<MenuIconName, ReactElement> = {
  ban: <BanIcon />,
  check: <CheckIcon />,
  kick: <KickIcon />,
  message: <MessageIcon />,
  search: <SearchIcon />,
  shield: <ShieldIcon />,
  spark: <SparkIcon />,
  trash: <TrashIcon />,
};

export default function ContextMenu(props: Readonly<ContextMenuProps>) {
  const { anchor, items, stageRect, visible } = props;

  if (!visible) {
    return null;
  }

  const point = resolveStagePoint(anchor, stageRect);
  const style = {
    left: point.left,
    top: point.top,
  } as CSSProperties;

  return (
    <div className="context-menu" style={style}>
      {items.map((item, index) =>
        item.kind === "separator" ? (
          <div key={`separator-${index}`} className="context-menu-separator" />
        ) : (
          <div
            key={item.label}
            className={["context-menu-item", item.variant ? `is-${item.variant}` : ""].filter(Boolean).join(" ")}
          >
            <span className="context-menu-item__icon">{iconMap[item.icon]}</span>
            <span className="context-menu-item__label">{item.label}</span>
            {item.shortcut ? <span className="context-menu-item__shortcut">{item.shortcut}</span> : null}
          </div>
        ),
      )}
    </div>
  );
}
