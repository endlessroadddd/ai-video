import { ChevronRight, Loader2, RefreshCw } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { CompanySelectionPrompt } from '@/components/company-selection-prompt'
import { DiscordTicketPanelsSection } from '@/components/settings/discord-ticket-panels-section'
import {
  createDiscordInstallUrl,
  fetchDiscordChannels,
  fetchDiscordIntegrationStatus,
  syncDiscordIntegration,
  type DiscordChannelRecord,
  type DiscordConnectionRecord,
  type DiscordSyncSummary,
} from '@/lib/services/discord-integration-api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  SettingsCommunityListSkeleton,
  SettingsSectionShell,
} from '@/components/settings/settings-section-shell'
import { m } from '@/paraglide/messages'

/**
 * 当前公司内角色（与 settings 页面保持一致）。
 */
type CompanyRole = 'owner' | 'admin' | 'member'

/**
 * 将服务端状态映射为页面可读文本。
 */
function getDiscordConnectionStatusLabel(connection: DiscordConnectionRecord | null): string {
  if (!connection || !connection.externalWorkspaceId) {
    return m.integration_status_not_connected()
  }

  if (connection.status === 'degraded') {
    return m.integration_status_degraded_retry()
  }

  if (connection.status === 'connected') {
    return m.integration_status_connected()
  }

  return connection.status || m.integration_status_connected()
}

/**
 * Discord channel 类型文案。
 */
function getDiscordChannelTypeLabel(channelType: number | null): string {
  if (channelType === 0) return m.discord_channel_text()
  if (channelType === 2) return m.discord_channel_voice()
  if (channelType === 4) return m.discord_channel_category()
  if (channelType === 5) return m.discord_channel_announcement()
  if (channelType === 13) return m.discord_channel_stage()
  if (channelType === 15) return m.discord_channel_forum()
  return m.discord_channel_default()
}

/**
 * 生成手动同步成功提示，附带本次回填统计。
 */
function buildSyncSuccessMessage(syncSummary: DiscordSyncSummary | null): string {
  if (!syncSummary) {
    return m.integration_sync_success()
  }

  return m.integration_sync_success_channels_roles({
    channels: syncSummary.channelsUpserted,
    roles: syncSummary.rolesUpserted,
  })
}

/**
 * 从 callback query 中提取状态提示：
 * - callback 完成后后端会重定向到 settings，并附带 `discord_*` 查询参数；
 * - 前端在这里读取并展示后，立即清理 URL，避免刷新重复提示。
 */
function readAndConsumeDiscordCallbackMessage(): {
  successMessage: string | null
  errorMessage: string | null
} {
  if (typeof window === 'undefined') {
    return {
      successMessage: null,
      errorMessage: null,
    }
  }

  const currentUrl = new URL(window.location.href)
  const connected = currentUrl.searchParams.get('discord_connected')
  const syncStatus = currentUrl.searchParams.get('discord_sync')
  const errorMessage = currentUrl.searchParams.get('discord_error')

  if (!connected && !syncStatus && !errorMessage) {
    return {
      successMessage: null,
      errorMessage: null,
    }
  }

  let successMessage: string | null = null

  if (!errorMessage && connected === '1' && syncStatus === 'ok') {
    successMessage = m.integration_connected_backfill_success({ platform: m.platform_discord() })
  }

  if (!errorMessage && connected === '1' && syncStatus === 'degraded') {
    successMessage = m.integration_connected_backfill_degraded({ platform: m.platform_discord() })
  }

  currentUrl.searchParams.delete('discord_connected')
  currentUrl.searchParams.delete('discord_sync')
  currentUrl.searchParams.delete('discord_error')

  const nextSearch = currentUrl.searchParams.toString()
  const nextUrl = `${currentUrl.pathname}${nextSearch ? `?${nextSearch}` : ''}${currentUrl.hash}`
  window.history.replaceState({}, '', nextUrl)

  return {
    successMessage,
    errorMessage,
  }
}

/**
 * Discord 社区列表卡片：
 * - 结构与 Telegram 页面保持一致；
 * - 统一展示频道名称、类型和频道 ID。
 */
function DiscordCommunityListCard(props: {
  channel: DiscordChannelRecord
  index: number
}) {
  const { channel, index } = props

  const avatarClassName: string =
    index % 3 === 0
      ? 'bg-[#5865f2]'
      : index % 3 === 1
        ? 'bg-[#1f2937]'
        : 'border border-[#d4d4d8] bg-[#f4f4f5]'

  return (
    <article className="flex h-[82px] items-center rounded-lg border border-[#e5e7eb] bg-white px-6">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${avatarClassName}`}>
        <img
          src="/platform-icons/discord.svg"
          alt={m.platform_discord()}
          className="h-5 w-5 object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="ml-6 min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-[1.6] text-slate-800">{channel.name}</p>
        <div className="mt-0.5 flex items-center gap-4 text-sm font-medium text-slate-500">
          <span className="truncate">{getDiscordChannelTypeLabel(channel.channelType)}</span>
          <span className="h-3 w-px shrink-0 bg-[#d1d5db]" />
          <span className="truncate">ID {channel.channelId}</span>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
    </article>
  )
}

/**
 * Discord 集成设置页：
 * - 布局和交互节奏对齐 Telegram 页面；
 * - 操作动作集中到“添加社区”弹窗内。
 */
export function DiscordIntegrationPanel(props: {
  activeCompanyId: string | null
  currentUserRole: CompanyRole
}) {
  const { activeCompanyId, currentUserRole } = props
  const queryClient = useQueryClient()

  const [operationMessage, setOperationMessage] = useState<string | null>(null)
  const [operationError, setOperationError] = useState<string | null>(null)
  const [isOnboardingDialogOpen, setIsOnboardingDialogOpen] = useState<boolean>(false)

  const canManage = currentUserRole === 'owner' || currentUserRole === 'admin'

  const statusQuery = useQuery({
    queryKey: ['settings', 'discord-integration-status', activeCompanyId],
    enabled: Boolean(activeCompanyId) && canManage,
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.workspace_select_company_error())
      }

      return fetchDiscordIntegrationStatus({
        companyId: activeCompanyId,
      })
    },
    staleTime: 15_000,
  })

  const channelsQuery = useQuery({
    queryKey: ['settings', 'discord-integration-channels', activeCompanyId],
    enabled: Boolean(activeCompanyId),
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.workspace_select_company_error())
      }

      return fetchDiscordChannels({
        companyId: activeCompanyId,
      })
    },
    staleTime: 15_000,
  })

  const installMutation = useMutation({
    mutationFn: createDiscordInstallUrl,
  })

  const syncMutation = useMutation({
    mutationFn: syncDiscordIntegration,
  })

  useEffect(() => {
    const callbackMessage = readAndConsumeDiscordCallbackMessage()

    if (callbackMessage.successMessage) {
      setOperationMessage(callbackMessage.successMessage)
      setOperationError(null)
      void queryClient.invalidateQueries({
        queryKey: ['settings', 'discord-integration-channels'],
      })
      void queryClient.invalidateQueries({
        queryKey: ['settings', 'discord-ticket-panels'],
      })
      void queryClient.invalidateQueries({
        queryKey: ['settings', 'discord-integration-status'],
      })
    }

    if (callbackMessage.errorMessage) {
      setOperationError(callbackMessage.errorMessage)
      setOperationMessage(null)
    }
  }, [queryClient])

  const connection = statusQuery.data?.connection || null

  const statusLabel = useMemo(() => getDiscordConnectionStatusLabel(connection), [connection])
  const isConnected = Boolean(connection?.externalWorkspaceId)

  const handleConnectDiscord = async (): Promise<void> => {
    if (!activeCompanyId) {
      setOperationError(m.workspace_select_company_error())
      setOperationMessage(null)
      return
    }

    if (!canManage) {
      setOperationError(m.integration_owner_admin_only())
      setOperationMessage(null)
      return
    }

    setOperationError(null)
    setOperationMessage(null)

    try {
      const installResponse = await installMutation.mutateAsync({
        companyId: activeCompanyId,
      })

      window.location.href = installResponse.installUrl
    } catch (error) {
      setOperationError(
        error instanceof Error
          ? error.message
          : m.integration_create_install_error({ platform: m.platform_discord() }),
      )
    }
  }

  const handleManualSync = (): void => {
    if (!activeCompanyId) {
      setOperationError(m.workspace_select_company_error())
      setOperationMessage(null)
      return
    }

    if (!canManage) {
      setOperationError(m.integration_owner_admin_only())
      setOperationMessage(null)
      return
    }

    setOperationError(null)
    setOperationMessage(null)

    syncMutation.mutate(
      {
        companyId: activeCompanyId,
      },
      {
        onSuccess: async (result) => {
          setOperationMessage(buildSyncSuccessMessage(result.syncSummary))
          setOperationError(null)

          await queryClient.invalidateQueries({
            queryKey: ['settings', 'discord-integration-status', activeCompanyId],
          })
          await queryClient.invalidateQueries({
            queryKey: ['settings', 'discord-integration-channels', activeCompanyId],
          })
          await queryClient.invalidateQueries({
            queryKey: ['settings', 'discord-ticket-panels', activeCompanyId],
          })
        },
        onError: (error) => {
          setOperationError(error instanceof Error ? error.message : m.integration_manual_sync_error())
          setOperationMessage(null)
        },
      },
    )
  }

  const handleRefreshCommunities = async (): Promise<void> => {
    setOperationError(null)

    await channelsQuery.refetch()
    if (canManage) {
      await statusQuery.refetch()
    }
    if (activeCompanyId) {
      await queryClient.invalidateQueries({
        queryKey: ['settings', 'discord-ticket-panels', activeCompanyId],
      })
    }
  }

  const channels: DiscordChannelRecord[] = channelsQuery.data?.channels || []

  return (
    <>
      <SettingsSectionShell
        title={m.platform_discord()}
        actions={
          <Button
            type="button"
            variant="dashboardPrimary"
            size="sm"
            className="h-8 w-[134px] rounded-lg text-sm font-semibold"
            onClick={() => {
              setIsOnboardingDialogOpen(true)
            }}
            disabled={!activeCompanyId || !canManage}
          >
            {m.integration_add_community()}
          </Button>
        }
      >
        <div className="space-y-[11px]">
          {channelsQuery.isLoading ? <SettingsCommunityListSkeleton rowCount={3} /> : null}

          {!channelsQuery.isLoading && channels.length > 0
            ? channels.map((channel, index) => (
                <DiscordCommunityListCard key={channel.id} channel={channel} index={index} />
              ))
            : null}

          {!channelsQuery.isLoading && channels.length === 0 ? (
            activeCompanyId ? (
              <div className="flex h-[82px] items-center justify-center rounded-lg border border-[#e5e7eb] bg-white px-6 text-sm text-slate-500">
                {m.integration_empty_with_company()}
              </div>
            ) : (
              <CompanySelectionPrompt
                message={m.integration_empty_without_company()}
                density="compact"
              />
            )
          ) : null}
        </div>

        {channelsQuery.error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {channelsQuery.error.message}
          </p>
        ) : null}

        {operationMessage ? (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            {operationMessage}
          </p>
        ) : null}

        {operationError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {operationError}
          </p>
        ) : null}

        <DiscordTicketPanelsSection
          activeCompanyId={activeCompanyId}
          canManage={canManage}
          isConnected={isConnected}
        />
      </SettingsSectionShell>

      <Dialog open={isOnboardingDialogOpen} onOpenChange={setIsOnboardingDialogOpen}>
        <DialogContent className="max-w-[520px] border-[#e5e7eb] bg-[#f8fafc] p-5 sm:max-w-[520px]">
          <DialogHeader className="gap-1 text-left">
            <DialogTitle className="text-lg font-semibold text-slate-800">
              {m.integration_dialog_title({ platform: m.platform_discord() })}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <section className="space-y-2 rounded-lg border border-[#e5e7eb] bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-slate-800">
                  {m.integration_step_connect({ platform: m.platform_discord() })}
                </p>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                  {statusLabel}
                </span>
              </div>

              <Button
                type="button"
                variant="dashboardPrimary"
                size="sm"
                className="h-8 w-full rounded-md text-xs font-semibold"
                disabled={!canManage || !activeCompanyId || installMutation.isPending}
                onClick={() => {
                  void handleConnectDiscord()
                }}
              >
                {installMutation.isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {m.integration_creating_install_link()}
                  </>
                ) : isConnected ? (
                  m.integration_reconnect({ platform: m.platform_discord() })
                ) : (
                  m.integration_connect({ platform: m.platform_discord() })
                )}
              </Button>
            </section>
            <section className="space-y-2 rounded-lg border border-[#e5e7eb] bg-white p-3">
              <p className="text-xs font-semibold text-slate-800">{m.integration_step_sync()}</p>

              <Button
                type="button"
                variant="dashboardTinted"
                size="sm"
                className="h-8 w-full text-xs font-medium"
                disabled={!canManage || !activeCompanyId || !isConnected || syncMutation.isPending}
                onClick={handleManualSync}
              >
                {syncMutation.isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {m.integration_syncing()}
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3.5 w-3.5" />
                    {m.integration_manual_sync()}
                  </>
                )}
              </Button>
            </section>

            <section className="space-y-2 rounded-lg border border-[#e5e7eb] bg-white p-3">
              <p className="text-xs font-semibold text-slate-800">{m.integration_step_refresh()}</p>

              <Button
                type="button"
                variant="dashboardTinted"
                size="sm"
                className="h-8 w-full text-xs font-medium"
                disabled={!activeCompanyId || channelsQuery.isFetching || statusQuery.isFetching}
                onClick={() => {
                  void handleRefreshCommunities()
                }}
              >
                {channelsQuery.isFetching || statusQuery.isFetching ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {m.common_refreshing()}
                  </>
                ) : (
                  m.integration_refresh_communities()
                )}
              </Button>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
