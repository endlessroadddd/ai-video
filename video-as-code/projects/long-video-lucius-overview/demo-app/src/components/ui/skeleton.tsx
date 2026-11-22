import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

/**
 * Dashboard / Settings 通用骨架屏组件。
 * - 默认挂载统一的淡紫色 shimmer 主题；
 * - 具体色阶通过 `dashboard-skeleton--*` 语义 class 在调用侧切换。
 */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('dashboard-skeleton dashboard-skeleton--base rounded-md', className)} {...props} />
}
