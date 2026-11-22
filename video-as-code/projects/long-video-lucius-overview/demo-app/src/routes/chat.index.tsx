import { createFileRoute } from "@tanstack/react-router";

import { ClientChatRouteShell } from "@/components/chat/client-chat-route-shell";

/**
 * `/chat` 默认落到新会话页：
 * - 真正的聊天详情由 `/chat/$sessionId` 承载；
 * - 这里不再承担 layout 责任，只负责渲染草稿态页面。
 */
export const Route = createFileRoute("/chat/")({
  component: ChatIndexRoutePage,
});

function ChatIndexRoutePage() {
  return <ClientChatRouteShell />;
}
