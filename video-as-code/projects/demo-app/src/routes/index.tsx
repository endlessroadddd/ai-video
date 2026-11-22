import { createFileRoute, redirect } from '@tanstack/react-router'

import { requireAuthOrRedirect } from '@/lib/auth/guard'
import { DEFAULT_AUTHENTICATED_PATH } from '@/lib/services/auth-entry'

export const Route = createFileRoute('/')({
  beforeLoad: async ({ location }) => {
    /**
     * 根路由统一作为入口跳板：
     * - 未登录时沿用既有鉴权守卫跳转到登录页。
     * - 已登录时直接进入默认事件页。
     */
    await requireAuthOrRedirect(location)

    throw redirect({
      to: DEFAULT_AUTHENTICATED_PATH,
      replace: true,
    })
  },
  component: () => null,
})
