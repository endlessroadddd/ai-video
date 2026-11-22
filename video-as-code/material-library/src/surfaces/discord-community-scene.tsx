import type { DiscordCommunitySceneProps } from "../chat/discord-scene-types";
import { DiscordCommunityShell } from "./discord-community-shell";
import { DiscordTranscriptStage } from "./discord-transcript-stage";

function formatChannelLabel(activeChannel: string): string {
  return activeChannel.startsWith("#") ? activeChannel : `# ${activeChannel}`;
}

export function DiscordCommunityScene(props: Readonly<DiscordCommunitySceneProps>) {
  const {
    activeChannel,
    channels,
    composer,
    currentMs,
    headerCopy,
    messages,
    questionText,
    revealTimes,
    rightPanel,
    tone = "default",
  } = props;

  return (
    <DiscordCommunityShell
      activeChannel={activeChannel}
      channels={channels}
      composer={composer}
      headerCopy={headerCopy}
      rightPanel={rightPanel}
    >
      <header className="discord-chat-header">
        <div className="discord-chat-header__left">
          <span className="discord-chat-header__channel">{formatChannelLabel(activeChannel)}</span>
          {headerCopy.subtitle ? (
            <>
              <span className="discord-chat-header__divider" />
              <span className="discord-chat-header__subtitle">{headerCopy.subtitle}</span>
            </>
          ) : null}
        </div>
      </header>

      <DiscordTranscriptStage
        currentMs={currentMs}
        messages={messages}
        questionText={questionText}
        revealTimes={revealTimes}
        tone={tone}
      />
    </DiscordCommunityShell>
  );
}
