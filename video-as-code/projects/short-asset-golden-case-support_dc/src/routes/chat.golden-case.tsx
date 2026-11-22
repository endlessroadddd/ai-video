import { createFileRoute } from "@tanstack/react-router";

import { ClientChatRouteShell } from "@/components/chat/client-chat-route-shell";
import { DEFAULT_CLIENT_CHAT_SUPPORT_RECORDING_SCENARIO } from "@/lib/client-chat-support-recording";

export const Route = createFileRoute("/chat/golden-case")({
  component: ChatGoldenCaseRoutePage,
});

function ChatGoldenCaseRoutePage() {
  return (
    <ClientChatRouteShell
      supportRecordingScenario={DEFAULT_CLIENT_CHAT_SUPPORT_RECORDING_SCENARIO}
    />
  );
}
