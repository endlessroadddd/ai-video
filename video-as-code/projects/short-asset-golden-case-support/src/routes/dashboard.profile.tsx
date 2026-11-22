import { createFileRoute, redirect } from '@tanstack/react-router'

import { requireAuthOrRedirect } from '@/lib/auth/guard'

/**
 * 兼容旧 onboarding 路径：
 * - 历史链接 `/dashboard/profile` 统一跳转到新路径；
 * - 避免设置流程入口因为旧 URL 失效。
 */
export const Route = createFileRoute('/dashboard/profile')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)

    throw redirect({
      to: '/onboarding/profile',
      replace: true,
    })
  },
  component: () => null,
})
