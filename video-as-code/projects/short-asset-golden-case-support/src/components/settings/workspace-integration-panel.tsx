import { Link } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowUpRight, Loader2, RefreshCw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { CompanySelectionPrompt } from '@/components/company-selection-prompt'
import {
  SETTINGS_SECTION_SURFACE_CLASS_NAME,
  SettingsSectionShell,
  SettingsWorkgroupCardSkeletonList,
} from '@/components/settings/settings-section-shell'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  buildWorkgroupChannelKey,
  deleteCompanyWorkgroupChannel,
  fetchWorkgroupSettingsSnapshot,
  type WorkgroupChannelOption,
  type WorkgroupPlatformSnapshot,
  type WorkgroupPlatformType,
  upsertCompanyWorkgroupChannel,
} from '@/lib/services/workgroup-settings'
import { m } from '@/paraglide/messages'
import { cn } from '@/lib/utils'

/**
 * 当前公司角色：
 * - 仅 Owner / Admin 允许修改工作群；
 * - Member 保持只读，便于查看哪些 channel 已被纳入工作群。
 */
type CompanyRole = 'owner' | 'admin' | 'member'

type PlatformSettingsTab =
  | 'discord-integration'
  | 'slack-integration'
  | 'telegram-settings'
  | 'feishu-integration'

type PlatformAppearance = {
  iconSrc: string
  iconAlt: string
  iconClassName: string
  frameClassName: string
}

function getPlatformAppearance(platform: WorkgroupPlatformType): PlatformAppearance {
  if (platform === 'discord') {
    return {
      iconSrc: '/platform-icons/discord.svg',
      iconAlt: m.platform_discord(),
      iconClassName: 'h-5 w-5 object-contain',
      frameClassName: 'border-[#C7D2FE] bg-[#EEF2FF]',
    }
  }

  if (platform === 'telegram') {
    return {
      iconSrc: '/platform-icons/telegram.svg',
      iconAlt: m.platform_telegram(),
      iconClassName: 'h-5 w-5 object-contain',
      frameClassName: 'border-[#BAE6FD] bg-[#F0F9FF]',
    }
  }

  if (platform === 'feishu') {
    return {
      iconSrc: '/platform-icons/feishu.svg',
      iconAlt: m.platform_feishu(),
      iconClassName: 'h-5 w-5 object-contain',
      frameClassName: 'border-[#A7F3D0] bg-[#ECFDF5]',
    }
  }

  return {
    iconSrc: '/platform-icons/slack.svg',
    iconAlt: m.platform_slack(),
    iconClassName: 'h-5 w-5 object-contain',
    frameClassName: 'border-[#E9D5FF] bg-[#FAF5FF]',
  }
}

function getPlatformSettingsTab(platform: WorkgroupPlatformType): PlatformSettingsTab | null {
  if (platform === 'discord') {
    return 'discord-integration'
  }

  if (platform === 'slack') {
    return 'slack-integration'
  }

  if (platform === 'telegram') {
    return 'telegram-settings'
  }

  if (platform === 'feishu') {
    return 'feishu-integration'
  }

  return null
}

function getStateBadgeClassName(state: WorkgroupPlatformSnapshot['state']): string {
  if (state === 'ready') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700'
  }

  if (state === 'needs-connection') {
    return 'border-amber-200 bg-amber-50 text-amber-700'
  }

  return 'border-slate-200 bg-slate-100 text-slate-600'
}

function getStateLabel(state: WorkgroupPlatformSnapshot['state']): string {
  if (state === 'ready') {
    return m.workspace_state_ready()
  }

  if (state === 'needs-connection') {
    return m.workspace_state_needs_connection()
  }

  return m.workspace_state_unavailable()
}

function buildChannelMetaText(option: WorkgroupChannelOption): string {
  const fragments: string[] = []

  if (option.channelMeta?.trim()) {
    fragments.push(option.channelMeta.trim())
  }

  fragments.push(`ID ${option.channelId}`)
  return fragments.join(' · ')
}

function getEmptyStateText(platform: WorkgroupPlatformSnapshot): string {
  if (platform.state === 'ready') {
    return m.workspace_empty_ready()
  }

  if (platform.state === 'unavailable') {
    return m.workspace_empty_unavailable()
  }

  return m.workspace_empty_needs_connection()
}

/**
 * 单个平台卡片：
 * - 头部展示平台状态与跳转入口；
 * - 主体展示可选 channel 列表，支持即点即存；
 * - 若 channel 已失联，仍展示 stale 行，方便显式移除。
 */
function PlatformWorkgroupCard(props: {
  platform: WorkgroupPlatformSnapshot
  canManage: boolean
  pendingChannelKey: string | null
  onToggleChannel: (option: WorkgroupChannelOption) => void
}) {
  const { platform, canManage, pendingChannelKey, onToggleChannel } = props
  const appearance = getPlatformAppearance(platform.platform)
  const settingsTab = getPlatformSettingsTab(platform.platform)

  return (
    <article className={cn(SETTINGS_SECTION_SURFACE_CLASS_NAME, 'overflow-hidden')}>
      <div className="space-y-4 p-5">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border',
                appearance.frameClassName,
              )}
            >
              <img
                src={appearance.iconSrc}
                alt={appearance.iconAlt}
                className={appearance.iconClassName}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold text-slate-900">{platform.label}</h2>
                <Badge
                  variant="outline"
                  className={cn('border text-[11px] font-medium', getStateBadgeClassName(platform.state))}
                >
                  {getStateLabel(platform.state)}
                </Badge>

                {platform.selectedCount > 0 ? (
                  <Badge
                    variant="outline"
                    className="border-slate-200 bg-slate-100 text-[11px] font-medium text-slate-700"
                  >
                    {m.workspace_selected_count({ count: platform.selectedCount })}
                  </Badge>
                ) : null}
              </div>

              <p className="text-sm font-medium text-slate-700">{platform.summaryText}</p>

              {platform.helperText ? (
                <p className="text-xs leading-5 text-slate-500">{platform.helperText}</p>
              ) : null}

              {platform.errorMessage ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">
                  {platform.errorMessage}
                </p>
              ) : null}
            </div>
          </div>

          {settingsTab ? (
            <Link
              to="/settings/$tab"
              params={{ tab: settingsTab }}
              className={cn(
                buttonVariants({
                  variant: 'dashboardTinted',
                  size: 'sm',
                }),
                'h-9 shrink-0 rounded-xl px-3 text-sm font-medium',
              )}
            >
              {m.workspace_navigate_platform_settings()}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </header>

        {platform.channelOptions.length > 0 ? (
          <div className="space-y-2">
            {platform.channelOptions.map((option) => {
              const isPending = pendingChannelKey === option.key

              return (
                <div
                  key={option.key}
                  className={cn(
                    'flex flex-col gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between',
                    option.isSelected
                      ? 'border-emerald-200 bg-emerald-50/60'
                      : 'border-slate-200 bg-white',
                  )}
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold text-slate-900">{option.channelName}</p>

                      {option.isSelected ? (
                        <Badge
                          variant="outline"
                          className="border-emerald-200 bg-emerald-50 text-[11px] font-medium text-emerald-700"
                        >
                          {m.workspace_badge()}
                        </Badge>
                      ) : null}

                      {option.isStale ? (
                        <Badge
                          variant="outline"
                          className="border-amber-200 bg-amber-50 text-[11px] font-medium text-amber-700"
                        >
                          {m.workspace_stale()}
                        </Badge>
                      ) : null}
                    </div>

                    <p className="text-xs leading-5 text-slate-500">{buildChannelMetaText(option)}</p>
                  </div>

                  {canManage ? (
                    <Button
                      type="button"
                      variant={option.isSelected ? 'dashboardTinted' : 'dashboardPrimary'}
                      size="sm"
                      className="h-9 rounded-xl px-4 text-sm font-medium"
                      disabled={isPending}
                      onClick={() => {
                        onToggleChannel(option)
                      }}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {m.workspace_save_pending()}
                        </>
                      ) : option.isSelected ? (
                        m.workspace_remove()
                      ) : (
                        m.workspace_set()
                      )}
                    </Button>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">{m.workspace_readonly()}</span>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
            {getEmptyStateText(platform)}
          </div>
        )}
      </div>
    </article>
  )
}

/**
 * 工作群设置分区：
 * - 统一展示多平台“哪些 channel 被标记为工作群”；
 * - 前提条件由各平台接入状态决定；
 * - 支持一个平台下选择多个工作群。
 */
export function WorkspaceIntegrationPanel(props: {
  activeCompanyId: string | null
  currentUserRole: CompanyRole
}) {
  const { activeCompanyId, currentUserRole } = props
  const queryClient = useQueryClient()

  const canManage = currentUserRole === 'owner' || currentUserRole === 'admin'

  const [operationMessage, setOperationMessage] = useState<string | null>(null)
  const [operationError, setOperationError] = useState<string | null>(null)
  const [pendingChannelKey, setPendingChannelKey] = useState<string | null>(null)

  /**
   * 读取工作群设置页快照：
   * - 包括已保存工作群；
   * - 也包括 Discord / Slack / Telegram / 飞书 的候选 channel 与前置状态。
   */
  const snapshotQuery = useQuery({
    queryKey: ['settings', 'workgroup-settings', activeCompanyId, canManage],
    enabled: Boolean(activeCompanyId),
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.workspace_select_company_error())
      }

      return fetchWorkgroupSettingsSnapshot({
        companyId: activeCompanyId,
        canManage,
      })
    },
    staleTime: 15_000,
  })

  const toggleChannelMutation = useMutation({
    mutationFn: async (payload: {
      platform: WorkgroupPlatformType
      channelId: string
      channelName: string
      isSelected: boolean
    }) => {
      if (!activeCompanyId) {
        throw new Error(m.workspace_select_company_error())
      }

      if (payload.isSelected) {
        await deleteCompanyWorkgroupChannel({
          companyId: activeCompanyId,
          platform: payload.platform,
          channelId: payload.channelId,
        })

        return {
          message: m.workspace_remove_success({ name: payload.channelName }),
        }
      }

      await upsertCompanyWorkgroupChannel({
        companyId: activeCompanyId,
        platform: payload.platform,
        channelId: payload.channelId,
        channelName: payload.channelName,
      })

      return {
        message: m.workspace_add_success({ name: payload.channelName }),
      }
    },
  })

  /**
   * 公司切换后清理旧提示，避免 A 公司的操作结果残留到 B 公司。
   */
  useEffect(() => {
    setOperationMessage(null)
    setOperationError(null)
    setPendingChannelKey(null)
  }, [activeCompanyId])

  const platformSnapshots = useMemo(
    () => snapshotQuery.data?.platforms || [],
    [snapshotQuery.data?.platforms],
  )

  const handleRefresh = async (): Promise<void> => {
    if (!activeCompanyId) {
      return
    }

    setOperationMessage(null)
    setOperationError(null)

    await queryClient.invalidateQueries({
      queryKey: ['settings', 'workgroup-settings', activeCompanyId],
    })
  }

  const handleToggleChannel = async (option: WorkgroupChannelOption): Promise<void> => {
    if (!activeCompanyId) {
      setOperationError(m.workspace_select_company_error())
      setOperationMessage(null)
      return
    }

    if (!canManage) {
      setOperationError(m.workspace_permission_error())
      setOperationMessage(null)
      return
    }

    const optionKey = buildWorkgroupChannelKey(option.platform, option.channelId)
    setPendingChannelKey(optionKey)
    setOperationError(null)

    try {
      const result = await toggleChannelMutation.mutateAsync({
        platform: option.platform,
        channelId: option.channelId,
        channelName: option.channelName,
        isSelected: option.isSelected,
      })

      setOperationMessage(result.message)

      await queryClient.invalidateQueries({
        queryKey: ['settings', 'workgroup-settings', activeCompanyId],
      })
    } catch (error) {
      setOperationMessage(null)
      setOperationError(error instanceof Error ? error.message : m.workspace_save_error())
    } finally {
      setPendingChannelKey(null)
    }
  }

  if (!activeCompanyId) {
    return (
      <SettingsSectionShell title={m.workspace_settings_title()}>
        <CompanySelectionPrompt message={m.workspace_select_company_error()} />
      </SettingsSectionShell>
    )
  }

  return (
    <SettingsSectionShell
      title={m.workspace_settings_title()}
      className="space-y-4"
      actions={
        <Button
          type="button"
          variant="dashboardTinted"
          size="sm"
          className="h-9 rounded-xl px-3 text-sm font-medium"
          disabled={snapshotQuery.isFetching}
          onClick={() => {
            void handleRefresh()
          }}
        >
          {snapshotQuery.isFetching ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {m.common_refreshing()}
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              {m.common_refresh()}
            </>
          )}
        </Button>
      }
    >
      <div className={cn(SETTINGS_SECTION_SURFACE_CLASS_NAME, 'p-5')}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">
              {m.workspace_summary_selected({ count: snapshotQuery.data?.totalSelectedCount || 0 })}
            </p>
            <p className="text-sm leading-6 text-slate-500">
              {m.workspace_summary_description()}
            </p>
          </div>

          <Badge
            variant="outline"
            className="w-fit border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600"
          >
            {canManage ? m.workspace_permission_editable() : m.workspace_permission_readonly()}
          </Badge>
        </div>
      </div>

      {!canManage ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
          {m.workspace_member_readonly_hint()}
        </p>
      ) : null}

      {operationError ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-700">
          {operationError}
        </p>
      ) : null}

      {operationMessage ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-700">
          {operationMessage}
        </p>
      ) : null}

      {snapshotQuery.isLoading ? <SettingsWorkgroupCardSkeletonList cardCount={4} /> : null}

      {snapshotQuery.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {snapshotQuery.error.message}
        </div>
      ) : null}

      {!snapshotQuery.isLoading && !snapshotQuery.error ? (
        <div className="space-y-3">
          {platformSnapshots.map((platform) => (
            <PlatformWorkgroupCard
              key={platform.platform}
              platform={platform}
              canManage={canManage}
              pendingChannelKey={pendingChannelKey}
              onToggleChannel={(option) => {
                void handleToggleChannel(option)
              }}
            />
          ))}
        </div>
      ) : null}
    </SettingsSectionShell>
  )
}
