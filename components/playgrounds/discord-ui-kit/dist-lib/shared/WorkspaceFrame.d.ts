import type { ReactNode } from "react";
import type { ChatHeaderData, ChatMessage, InfoPanelData, SidebarItem } from "../lib/types";
type WorkspaceFrameProps = {
    serverItems: SidebarItem[];
    leftRail: ReactNode;
    header: ChatHeaderData;
    messages: ChatMessage[];
    composerPlaceholder: string;
    infoPanel?: InfoPanelData;
};
export declare function WorkspaceFrame({ serverItems, leftRail, header, messages, composerPlaceholder, infoPanel, }: WorkspaceFrameProps): import("react/jsx-runtime").JSX.Element;
export {};
