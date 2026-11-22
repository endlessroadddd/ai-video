import type { ReactNode } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

/**
 * settings 页面统一分区外壳：
 * - 统一内容最大宽度；
 * - 统一标题字号、字重与顶部操作区对齐方式；
 * - 避免各分区各自维护一套 header 间距，长期出现漂移。
 */
export function SettingsSectionShell(props: { title: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  const { title, actions, children, className } = props

  return (
    <section className={cn('mx-auto w-full max-w-[940px] space-y-[14px]', className)}>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </header>

      {children}
    </section>
  )
}

/**
 * settings 页面主内容卡片样式：
 * - 与 Telegram / Slack / Discord 页面当前白卡片风格保持一致；
 * - 供事件配置、人员管理等历史页面复用，统一圆角、边框和阴影。
 */
export const SETTINGS_SECTION_SURFACE_CLASS_NAME = 'rounded-lg border border-[#e5e7eb] bg-white shadow-none'

type SettingsCommunityRowSkeletonConfig = {
  titleWidth: string
  primaryMetaWidth: string
  secondaryMetaWidth: string
}

const SETTINGS_COMMUNITY_ROW_SKELETON_CONFIGS: ReadonlyArray<SettingsCommunityRowSkeletonConfig> = [
  {
    titleWidth: '38%',
    primaryMetaWidth: '72px',
    secondaryMetaWidth: '112px',
  },
  { titleWidth: '44%', primaryMetaWidth: '86px', secondaryMetaWidth: '96px' },
  {
    titleWidth: '32%',
    primaryMetaWidth: '64px',
    secondaryMetaWidth: '124px',
  },
]

/**
 * 社区列表骨架：
 * - 对齐 Telegram / Discord / Slack / 飞书的统一卡片结构；
 * - 刷新时仍保留“头像 + 标题 + 元信息 + 右箭头”的阅读节奏，避免退化成空白块。
 */
export function SettingsCommunityListSkeleton(props?: { rowCount?: number; className?: string }) {
  const { rowCount = 3, className } = props || {}

  return (
    <div className={cn('space-y-[11px]', className)}>
      {Array.from({ length: rowCount }).map((_, index) => {
        const config = SETTINGS_COMMUNITY_ROW_SKELETON_CONFIGS[index % SETTINGS_COMMUNITY_ROW_SKELETON_CONFIGS.length]

        return (
          <article
            key={`community-skeleton-${index}`}
            className="dashboard-skeleton-frame flex h-[82px] items-center rounded-lg border px-6"
          >
            <Skeleton className="dashboard-skeleton--strong h-12 w-12 shrink-0 rounded-full" />

            <div className="ml-6 min-w-0 flex-1 space-y-2">
              <Skeleton className="dashboard-skeleton--base h-4 max-w-full rounded-[4px]" style={{ width: config.titleWidth }} />

              <div className="flex items-center gap-4">
                <Skeleton className="dashboard-skeleton--soft h-3 shrink-0 rounded-[4px]" style={{ width: config.primaryMetaWidth }} />
                <span className="dashboard-skeleton-divider h-3 w-px shrink-0" />
                <Skeleton className="dashboard-skeleton--soft h-3 shrink-0 rounded-[4px]" style={{ width: config.secondaryMetaWidth }} />
              </div>
            </div>

            <Skeleton className="dashboard-skeleton--base ml-4 h-5 w-5 shrink-0 rounded-[4px]" />
          </article>
        )
      })}
    </div>
  )
}

type SettingsWorkgroupCardSkeletonConfig = {
  titleWidth: string
  summaryWidth: string
  helperWidth: string
}

const SETTINGS_WORKGROUP_CARD_SKELETON_CONFIGS: ReadonlyArray<SettingsWorkgroupCardSkeletonConfig> = [
  { titleWidth: '76px', summaryWidth: '220px', helperWidth: '300px' },
  { titleWidth: '88px', summaryWidth: '250px', helperWidth: '280px' },
  { titleWidth: '70px', summaryWidth: '210px', helperWidth: '260px' },
  { titleWidth: '82px', summaryWidth: '236px', helperWidth: '294px' },
]

/**
 * 工作群设置骨架：
 * - 复刻平台卡片头部、状态 badge、摘要和频道条目；
 * - 让多平台加载中的视觉密度接近真实内容，减少大块空白。
 */
export function SettingsWorkgroupCardSkeletonList(props?: { cardCount?: number; className?: string }) {
  const { cardCount = 4, className } = props || {}

  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: cardCount }).map((_, index) => {
        const config = SETTINGS_WORKGROUP_CARD_SKELETON_CONFIGS[index % SETTINGS_WORKGROUP_CARD_SKELETON_CONFIGS.length]

        return (
          <article key={`workgroup-skeleton-${index}`} className={cn(SETTINGS_SECTION_SURFACE_CLASS_NAME, 'overflow-hidden')}>
            <div className="space-y-4 p-5">
              <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <Skeleton className="dashboard-skeleton--strong h-11 w-11 shrink-0 rounded-2xl" />

                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Skeleton className="dashboard-skeleton--base h-5 shrink-0 rounded-[4px]" style={{ width: config.titleWidth }} />
                      <Skeleton className="dashboard-skeleton--soft h-5 w-[72px] shrink-0 rounded-full" />
                      <Skeleton className="dashboard-skeleton--soft h-5 w-[88px] shrink-0 rounded-full" />
                    </div>

                    <Skeleton className="dashboard-skeleton--base h-4 max-w-full rounded-[4px]" style={{ width: config.summaryWidth }} />
                    <Skeleton className="dashboard-skeleton--soft h-3 max-w-full rounded-[4px]" style={{ width: config.helperWidth }} />
                  </div>
                </div>

                <Skeleton className="dashboard-skeleton--base h-9 w-[116px] shrink-0 rounded-xl" />
              </header>

              <div className="space-y-2">
                {Array.from({ length: 2 }).map((__, channelIndex) => (
                  <div
                    key={`workgroup-skeleton-channel-${index}-${channelIndex}`}
                    className="dashboard-skeleton-frame flex flex-col gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Skeleton
                          className="dashboard-skeleton--base h-4 rounded-[4px]"
                          style={{
                            width: channelIndex === 0 ? '148px' : '124px',
                          }}
                        />
                        <Skeleton className="dashboard-skeleton--soft h-5 w-[58px] rounded-full" />
                      </div>

                      <Skeleton
                        className="dashboard-skeleton--soft h-3 rounded-[4px]"
                        style={{
                          width: channelIndex === 0 ? '196px' : '224px',
                        }}
                      />
                    </div>

                    <Skeleton className="dashboard-skeleton--base h-9 w-[96px] shrink-0 rounded-xl" />
                  </div>
                ))}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
