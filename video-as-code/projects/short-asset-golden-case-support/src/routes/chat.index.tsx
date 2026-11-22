import { createFileRoute, redirect } from "@tanstack/react-router";

import { ClientChatRouteShell } from "@/components/chat/client-chat-route-shell";
import { isDemoMode } from "@/lib/demo/mode";

export const Route = createFileRoute("/chat/")({
  beforeLoad: () => {
    if (isDemoMode()) {
      throw redirect({
        to: "/chat/golden-case",
        replace: true,
      });
    }
  },
  component: ChatIndexRoutePage,
});

function ChatIndexRoutePage() {
  return <ClientChatRouteShell />;
}
