import type { ReactNode } from "react";
import type { ChatHeaderData, ChatMessage, InfoPanelData, SidebarItem } from "../lib/types";
import { ChatHeader } from "./ChatHeader";
import { ComposerBar } from "./ComposerBar";
import { InfoPanel } from "./InfoPanel";
import { ServerRail } from "./ServerRail";
import { TranscriptPane } from "./TranscriptPane";

type WorkspaceFrameProps = {
  serverItems: SidebarItem[];
  leftRail: ReactNode;
  header: ChatHeaderData;
  messages: ChatMessage[];
  composerPlaceholder: string;
  infoPanel?: InfoPanelData;
};

export function WorkspaceFrame({
  serverItems,
  leftRail,
  header,
  messages,
  composerPlaceholder,
  infoPanel,
}: WorkspaceFrameProps) {
  return (
    <div className={infoPanel ? "workspace-frame" : "workspace-frame workspace-frame--no-panel"}>
      <ServerRail items={serverItems} />
      {leftRail}

      <section className="chat-column">
        <ChatHeader header={header} />
        <TranscriptPane messages={messages} />
        <ComposerBar placeholder={composerPlaceholder} />
      </section>

      {infoPanel ? <InfoPanel panel={infoPanel} /> : null}
    </div>
  );
}
