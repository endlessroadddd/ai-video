import { createFileRoute, redirect } from '@tanstack/react-router'

import { requireAuthOrRedirect } from '@/lib/auth/guard'

export const Route = createFileRoute('/onboarding/plan')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)

    /**
     * Onboarding 已改为两步：
     * - 历史第 3 步路由保留兼容；
     * - 统一回到 dashboard，并由首页分流逻辑决定是否需要继续 onboarding。
     */
    throw redirect({
      to: '/dashboard',
      replace: true,
    })
  },
  component: () => null,
})
