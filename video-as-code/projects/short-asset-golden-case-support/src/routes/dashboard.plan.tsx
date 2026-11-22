import { createFileRoute, redirect } from '@tanstack/react-router'

import { requireAuthOrRedirect } from '@/lib/auth/guard'

/**
 * 兼容旧 onboarding 路径：
 * - 历史链接 `/dashboard/plan` 统一跳转到 dashboard；
 * - onboarding 已改为两步，不再保留套餐步骤页面。
 */
export const Route = createFileRoute('/dashboard/plan')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)

    throw redirect({
      to: '/dashboard',
      replace: true,
    })
  },
  component: () => null,
})
