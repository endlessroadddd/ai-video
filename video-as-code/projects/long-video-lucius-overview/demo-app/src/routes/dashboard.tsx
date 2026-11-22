import { Outlet, createFileRoute } from '@tanstack/react-router'

import { GlobalKnowledgeUploadWidget } from '@/components/dashboard/GlobalKnowledgeUploadWidget'
import { requireAuthOrRedirect } from '@/lib/auth/guard'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <main className="dashboard-route-shell">
      <Outlet />
      <GlobalKnowledgeUploadWidget />
    </main>
  )
}
