import { type ReactNode } from 'react'
import { PanelLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages'
import { useViewportProfile } from '@/lib/use-viewport-profile'

type DashboardSidebarToggleTitleProps = {
  children: ReactNode
  className?: string
}

/**
 * Dashboard 页面统一的左侧标题入口：
 * - 提供与全局一致的“折叠侧边栏”按钮样式与交互；
 * - 在按钮后统一渲染分割线和标题内容；
 * - 通过 children 让不同页面可复用同一结构但保留各自标题样式。
 */
export function DashboardSidebarToggleTitle(props: DashboardSidebarToggleTitleProps) {
  const { children, className } = props
  const viewportProfile = useViewportProfile()

  if (viewportProfile.isPhone) {
    return <div className={cn('min-w-0', className)}>{children}</div>
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('dashboard-sidebar-toggle'))
        }}
        className="h-7 w-7 rounded-[4px] text-[var(--dashboard-text)] hover:bg-[var(--dashboard-row-hover-bg)]"
        aria-label={m.header_collapse_sidebar()}
      >
        <PanelLeft className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-4 bg-[var(--dashboard-panel-border)]" />
      {children}
    </div>
  )
}
