import { createFileRoute } from '@tanstack/react-router'

import { requireAuthOrRedirect } from '@/lib/auth/guard'
import { SettingsPage } from '@/routes/settings'

/**
 * 设置页分区路由：
 * - 使用路径参数承载侧边栏分区，例如 `/settings/telegram-settings`；
 * - 保持和 `/settings` 相同的鉴权策略；
 * - 复用同一页面组件，避免两个页面实现分叉。
 */
export const Route = createFileRoute('/settings/$tab')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)
  },
  component: SettingsTabPage,
})

/**
 * 路由包装组件：
 * - 从路径参数读取 `tab`；
 * - 透传给通用 SettingsPage 作为激活分区。
 */
function SettingsTabPage() {
  const { tab } = Route.useParams()

  return <SettingsPage routeTab={tab} />
}
