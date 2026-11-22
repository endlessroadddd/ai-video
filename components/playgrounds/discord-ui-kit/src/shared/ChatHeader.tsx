import type { ChatHeaderData } from "../lib/types";
import { BellIcon, PinIcon, SearchIcon, SettingsIcon, SparkIcon } from "./icons";

type ChatHeaderProps = {
  header: ChatHeaderData;
};

export function ChatHeader({ header }: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <div className="chat-header__left">
        <span className="chat-header__channel">{header.channelLabel}</span>
        <span className="chat-header__divider" />
        <span className="chat-header__subtitle">{header.heroNote}</span>
      </div>

      <div className="chat-header__right">
        <span className="chat-header__stat">{header.membersLabel}</span>
        <button type="button" className="icon-button">
          <SparkIcon />
        </button>
        <button type="button" className="icon-button">
          <PinIcon />
        </button>
        <button type="button" className="icon-button">
          <BellIcon />
        </button>
        <button type="button" className="icon-button">
          <SearchIcon />
        </button>
        <button type="button" className="icon-button">
          <SettingsIcon />
        </button>
      </div>
    </header>
  );
}
