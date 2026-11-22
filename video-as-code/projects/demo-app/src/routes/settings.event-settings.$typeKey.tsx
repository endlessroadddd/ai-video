import { createFileRoute } from '@tanstack/react-router'

import { requireAuthOrRedirect } from '@/lib/auth/guard'
import { SettingsPage } from '@/routes/settings'

/**
 * Event 类型详情页路由：
 * - 路径：`/settings/event-settings/:typeKey`；
 * - 复用统一 SettingsPage，仅切换为 event-settings 分区并传入 typeKey。
 */
export const Route = createFileRoute('/settings/event-settings/$typeKey')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)
  },
  component: SettingsEventTypeDetailPage,
})

function SettingsEventTypeDetailPage() {
  const { typeKey } = Route.useParams()

  return (
    <SettingsPage
      routeTab="event-settings"
      routeEventTypeKey={typeKey}
    />
  )
}
