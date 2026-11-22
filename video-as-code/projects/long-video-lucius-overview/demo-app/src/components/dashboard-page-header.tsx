import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { m } from '@/paraglide/messages'
import { cn } from '@/lib/utils'
import { DashboardSidebarToggleTitle } from '@/components/dashboard-sidebar-toggle-title'
import { useViewportProfile } from '@/lib/use-viewport-profile'

type PaginationCollapseBelow = 'never' | 'phone' | 'tablet'

type DashboardPageHeaderProps = {
  title: string
  startRow: number
  endRow: number
  totalRows: number
  onPrevPage: () => void
  onNextPage: () => void
  canPrevPage: boolean
  canNextPage: boolean
  className?: string
  hidePagination?: boolean
  paginationCollapseBelow?: PaginationCollapseBelow
}

/**
 * Dashboard 页面公共 Header。
 *
 * 设计目标：
 * - 左侧统一页面标题。
 * - 右侧统一分页信息与翻页交互。
 */
export function DashboardPageHeader(props: DashboardPageHeaderProps) {
  const {
    title,
    startRow,
    endRow,
    totalRows,
    onPrevPage,
    onNextPage,
    canPrevPage,
    canNextPage,
    className,
    hidePagination = false,
    paginationCollapseBelow = 'phone',
  } = props
  const viewportProfile = useViewportProfile()
  const shouldCollapsePagination =
    !hidePagination &&
    ((paginationCollapseBelow === 'phone' && viewportProfile.isPhone) ||
      (paginationCollapseBelow === 'tablet' &&
        (viewportProfile.isPhone || viewportProfile.isTablet)))

  return (
    <header
      className={cn(
        shouldCollapsePagination
          ? 'flex min-h-[70px] flex-col items-stretch justify-center gap-2 px-4 py-3'
          : 'flex h-[52px] items-center justify-between gap-3 px-4',
        className,
      )}
    >
      <DashboardSidebarToggleTitle className="dashboard-page-header-title-group min-w-0 flex-1">
        <p className="dashboard-page-header-title truncate text-[14px] font-medium text-[var(--dashboard-text)]">
          {title}
        </p>
      </DashboardSidebarToggleTitle>

      {hidePagination ? null : (
        <div
          className={cn(
            'dashboard-page-header-pagination min-w-0 text-[14px] font-medium text-[var(--dashboard-text-muted)]',
            shouldCollapsePagination
              ? 'flex items-center justify-between gap-3'
              : 'flex items-center gap-3 sm:gap-4',
          )}
        >
          <p className="dashboard-page-header-rows truncate whitespace-nowrap text-[13px] sm:text-[14px]">
            {m.header_rows({
              start: String(startRow),
              end: String(endRow),
              total: String(totalRows),
            })}
          </p>

          <div className="dashboard-page-header-actions flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onPrevPage}
              disabled={!canPrevPage}
              className="h-10 w-10 rounded-[10px] text-[var(--dashboard-text-muted)] hover:bg-[var(--dashboard-row-hover-bg)] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={m.header_prev()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onNextPage}
              disabled={!canNextPage}
              className="h-10 w-10 rounded-[10px] text-[var(--dashboard-text-muted)] hover:bg-[var(--dashboard-row-hover-bg)] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={m.header_next()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
