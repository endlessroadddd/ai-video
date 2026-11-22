import { createFileRoute, redirect } from '@tanstack/react-router'

import { requireAuthOrRedirect } from '@/lib/auth/guard'

/**
 * 兼容旧 onboarding 路径：
 * - 历史链接 `/dashboard/company-profile` 统一跳转到新路径；
 * - 防止用户书签或第三方链接失效。
 */
export const Route = createFileRoute('/dashboard/company-profile')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)

    throw redirect({
      to: '/onboarding/company-profile',
      replace: true,
    })
  },
  component: () => null,
})
