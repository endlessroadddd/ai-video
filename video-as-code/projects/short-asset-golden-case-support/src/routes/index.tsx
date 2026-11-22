import { createFileRoute, redirect } from '@tanstack/react-router'

import { requireAuthOrRedirect } from '@/lib/auth/guard'
import { isDemoMode } from '@/lib/demo/mode'
import { DEFAULT_AUTHENTICATED_PATH } from '@/lib/services/auth-entry'

export const Route = createFileRoute('/')({
  beforeLoad: async ({ location }) => {
    if (isDemoMode()) {
      throw redirect({
        to: '/chat/golden-case',
        replace: true,
      })
    }

    await requireAuthOrRedirect(location)

    throw redirect({
      to: DEFAULT_AUTHENTICATED_PATH,
      replace: true,
    })
  },
  component: () => null,
})
