import type { CommunityScreenProps } from "../lib/types";
import { ScreenShell } from "../shared/ScreenShell";
import { WorkspaceFrame } from "../shared/WorkspaceFrame";
import { CommunityChannelRail } from "./CommunityChannelRail";

export function CommunityScreen({
  shellEyebrow,
  title,
  subtitle,
  topControls,
  railEyebrow,
  railTitle,
  searchPlaceholder,
  channels,
  serverItems,
  header,
  messages,
  composerPlaceholder,
  infoPanel,
}: CommunityScreenProps) {
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
          <CommunityChannelRail
            eyebrow={railEyebrow}
            title={railTitle}
            searchPlaceholder={searchPlaceholder}
            items={channels}
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
