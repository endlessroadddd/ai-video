import { createFileRoute, useMatchRoute, useNavigate } from '@tanstack/react-router'

import { AssistTaskPage } from '@/routes/dashboard.index'

export const Route = createFileRoute('/dashboard/event')({
  component: DashboardEventRoutePage,
})

/**
 * 事件列表路由页：
 * - 复用现有 Tasks 页面；
 * - 点击列表项时，把“选中态”同步到 URL，生成可分享链接。
 */
function DashboardEventRoutePage() {
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()
  const detailRouteMatch = matchRoute({
    to: '/dashboard/event/$eventId',
  })
  const selectedEventId = detailRouteMatch ? detailRouteMatch.eventId : null

  return (
    <AssistTaskPage
      selectedEventId={selectedEventId}
      onSelectEvent={(eventId) => {
        void navigate({
          to: '/dashboard/event/$eventId',
          params: { eventId },
        })
      }}
      onCloseEvent={() => {
        void navigate({
          to: '/dashboard/event',
        })
      }}
    />
  )
}
