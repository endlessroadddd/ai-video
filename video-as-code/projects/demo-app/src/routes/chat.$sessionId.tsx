import { createFileRoute } from "@tanstack/react-router";

import { ClientChatRouteShell } from "@/components/chat/client-chat-route-shell";

export const Route = createFileRoute("/chat/$sessionId")({
  component: ChatSessionRoutePage,
});

function ChatSessionRoutePage() {
  const { sessionId } = Route.useParams();

  return <ClientChatRouteShell routeSessionId={sessionId} />;
}
