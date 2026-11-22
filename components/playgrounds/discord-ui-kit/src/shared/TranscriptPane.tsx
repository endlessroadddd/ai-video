import { Suspense, lazy } from "react";
import type { ChatMessage } from "../lib/types";

const LazyDiscordTranscript = lazy(async () => {
  const module = await import("./discord-transcript");
  return { default: module.DiscordTranscript };
});

type TranscriptPaneProps = {
  messages: ChatMessage[];
};

export function TranscriptPane({ messages }: TranscriptPaneProps) {
  return (
    <section className="transcript-pane" aria-label="Transcript">
      <div className="transcript-pane__inner">
        <Suspense
          fallback={
            <div className="transcript-loading" aria-hidden="true">
              <div className="transcript-loading__row" />
              <div className="transcript-loading__row transcript-loading__row--long" />
              <div className="transcript-loading__row" />
            </div>
          }
        >
          <LazyDiscordTranscript messages={messages} />
        </Suspense>
      </div>
    </section>
  );
}
