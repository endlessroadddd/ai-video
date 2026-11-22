import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useViewportProfile, type ViewportPanelMode } from '@/lib/use-viewport-profile'

type DashboardPageLayoutProps = ComponentPropsWithoutRef<'div'> & {
  mobileHeader?: ReactNode
  mobilePrimaryAction?: ReactNode
  detailPresentation?: ViewportPanelMode
}

/**
 * Dashboard 页面公共画布：
 * - 统一右侧主内容区的高度和定位基准；
 * - 让浮层、详情面板都基于同一块相对定位区域渲染。
 */
export function DashboardPageLayout(props: DashboardPageLayoutProps) {
  const {
    className,
    children,
    detailPresentation = 'inline',
    mobileHeader,
    mobilePrimaryAction,
    ...restProps
  } = props
  const viewportProfile = useViewportProfile()

  return (
    <div
      data-detail-presentation={detailPresentation}
      className={cn('relative flex h-full min-h-0 flex-col overflow-hidden', className)}
      {...restProps}
    >
      {viewportProfile.isPhone && mobileHeader ? (
        <div className="mb-3 shrink-0">{mobileHeader}</div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>

      {viewportProfile.isPhone && mobilePrimaryAction ? (
        <div className="shrink-0 border-t border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-4 pb-[calc(0.75rem+var(--bottom-safe-area))] pt-3">
          {mobilePrimaryAction}
        </div>
      ) : null}
    </div>
  )
}

type DashboardPageLayoutCardProps = ComponentPropsWithoutRef<typeof Card>

/**
 * Dashboard 页面公共主卡片：
 * - 统一三大页面右侧主卡片的圆角、阴影和白底；
 * - 后续页面只要复用这里，就不会再出现每页各写一套主容器样式。
 */
export function DashboardPageLayoutCard(props: DashboardPageLayoutCardProps) {
  const { className, children, ...restProps } = props

  return (
    <Card
      className={cn(
        'h-full min-w-0 overflow-hidden rounded-[12px] border-0 bg-[var(--dashboard-page-bg)] shadow-none md:rounded-[4px]',
        className,
      )}
      {...restProps}
    >
      {children}
    </Card>
  )
}
