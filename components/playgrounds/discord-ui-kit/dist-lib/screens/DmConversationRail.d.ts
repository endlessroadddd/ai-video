import type { DmConversationItem } from "../lib/types";
type DmConversationRailProps = {
    eyebrow?: string;
    title: string;
    searchPlaceholder: string;
    items: DmConversationItem[];
};
export declare function DmConversationRail({ eyebrow, title, searchPlaceholder, items, }: DmConversationRailProps): import("react/jsx-runtime").JSX.Element;
export {};
