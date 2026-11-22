import type { ReactNode } from "react";
type ScreenShellProps = {
    shellEyebrow?: string;
    title: string;
    subtitle: string;
    topControls?: ReactNode;
    children: ReactNode;
};
export declare function ScreenShell({ shellEyebrow, title, subtitle, topControls, children, }: ScreenShellProps): import("react/jsx-runtime").JSX.Element;
export {};
