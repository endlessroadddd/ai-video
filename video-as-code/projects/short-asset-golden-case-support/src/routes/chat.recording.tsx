import { createFileRoute } from "@tanstack/react-router";

import { ClientChatRouteShell } from "@/components/chat/client-chat-route-shell";
import { DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO } from "@/lib/client-chat-recording";

export const Route = createFileRoute("/chat/recording")({
  component: ChatRecordingRoutePage,
});

function ChatRecordingRoutePage() {
  return (
    <ClientChatRouteShell
      recordingScenario={DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO}
    />
  );
}
