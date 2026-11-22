import { Outlet, createFileRoute } from "@tanstack/react-router";
import { requireAuthOrRedirect } from "@/lib/auth/guard";

/**
 * Chat 路由现在作为 layout：
 * - 统一承接 `/chat` 与 `/chat/$sessionId` 的鉴权；
 * - 具体页面内容交给 index/detail 子路由渲染。
 */
export const Route = createFileRoute('/chat')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location);
  },
  component: ChatRouteLayout,
});

function ChatRouteLayout() {
  return <Outlet />;
}
