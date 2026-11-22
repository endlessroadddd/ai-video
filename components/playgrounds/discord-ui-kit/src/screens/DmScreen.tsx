import type { DmScreenProps } from "../lib/types";
import { ScreenShell } from "../shared/ScreenShell";
import { WorkspaceFrame } from "../shared/WorkspaceFrame";
import { DmConversationRail } from "./DmConversationRail";

export function DmScreen({
  shellEyebrow,
  title,
  subtitle,
  topControls,
  railEyebrow,
  railTitle,
  searchPlaceholder,
  conversations,
  serverItems,
  header,
  messages,
  composerPlaceholder,
  infoPanel,
}: DmScreenProps) {
  return (
    <ScreenShell
      shellEyebrow={shellEyebrow}
      title={title}
      subtitle={subtitle}
      topControls={topControls}
    >
      <WorkspaceFrame
        serverItems={serverItems}
        leftRail={
          <DmConversationRail
            eyebrow={railEyebrow}
            title={railTitle}
            searchPlaceholder={searchPlaceholder}
            items={conversations}
          />
        }
        header={header}
        messages={messages}
        composerPlaceholder={composerPlaceholder}
        infoPanel={infoPanel}
      />
    </ScreenShell>
  );
}
