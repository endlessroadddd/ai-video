import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/event/$eventId')({
  component: DashboardEventDetailRoutePage,
})

/**
 * 任务详情路由页：
 * - 仅用于声明 `/dashboard/event/:eventId` 路径；
 * - 实际页面渲染由父级 `/dashboard/event` 路由统一处理，
 *   这样列表页与详情页共用同一套布局和状态。
 */
function DashboardEventDetailRoutePage() {
  return null
}
