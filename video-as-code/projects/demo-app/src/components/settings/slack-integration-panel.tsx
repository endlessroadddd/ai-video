import { ChevronRight, Loader2, RefreshCw } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { CompanySelectionPrompt } from '@/components/company-selection-prompt'
import {
  createSlackInstallUrl,
  fetchSlackChannels,
  fetchSlackIntegrationStatus,
  syncSlackIntegration,
  type SlackChannelRecord,
  type SlackConnectionRecord,
  type SlackSyncSummary,
} from '@/lib/services/slack-integration-api'
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
function getSlackConnectionStatusLabel(connection: SlackConnectionRecord | null): string {
  if (!connection || !connection.externalWorkspaceId) {
    return m.integration_status_not_connected()
  }

  if (connection.status === 'disconnected') {
    return m.integration_status_degraded_retry()
  }

  if (connection.status === 'connected') {
    return m.integration_status_connected()
  }

  if (connection.status === 'disabled') {
    return m.integration_status_disabled()
  }

  return connection.status || m.integration_status_connected()
}

/**
 * Slack channel 类型文案。
 */
function getSlackChannelTypeLabel(channel: SlackChannelRecord): string {
  if (channel.isPrivate || channel.channelType === 'private_channel') {
    return m.slack_channel_private()
  }

  if (channel.channelType === 'public_channel') {
    return m.slack_channel_public()
  }

  if (channel.channelType === 'im') {
    return m.slack_channel_direct_message()
  }

  if (channel.channelType === 'mpim') {
    return m.slack_channel_multi_person_dm()
  }

  if (channel.channelType === 'group') {
    return m.slack_channel_group()
  }

  return m.slack_channel_default()
}

/**
 * 生成手动同步成功提示，附带本次回填统计。
 */
function buildSyncSuccessMessage(syncSummary: SlackSyncSummary | null): string {
  if (!syncSummary) {
    return m.integration_sync_success()
  }

  return m.integration_sync_success_channels({ channels: syncSummary.channelsUpserted })
}

/**
 * 从 callback query 中提取状态提示：
 * - callback 完成后后端会重定向到 settings，并附带 `slack_*` 查询参数；
 * - 前端在这里读取并展示后，立即清理 URL，避免刷新重复提示。
 */
function readAndConsumeSlackCallbackMessage(): {
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
  const connected = currentUrl.searchParams.get('slack_connected')
  const syncStatus = currentUrl.searchParams.get('slack_sync')
  const errorMessage = currentUrl.searchParams.get('slack_error')

  if (!connected && !syncStatus && !errorMessage) {
    return {
      successMessage: null,
      errorMessage: null,
    }
  }

  let successMessage: string | null = null

  if (!errorMessage && connected === '1' && syncStatus === 'ok') {
    successMessage = m.integration_connected_backfill_success({ platform: m.platform_slack() })
  }

  if (!errorMessage && connected === '1' && syncStatus === 'degraded') {
    successMessage = m.integration_connected_backfill_degraded({ platform: m.platform_slack() })
  }

  currentUrl.searchParams.delete('slack_connected')
  currentUrl.searchParams.delete('slack_sync')
  currentUrl.searchParams.delete('slack_error')

  const nextSearch = currentUrl.searchParams.toString()
  const nextUrl = `${currentUrl.pathname}${nextSearch ? `?${nextSearch}` : ''}${currentUrl.hash}`
  window.history.replaceState({}, '', nextUrl)

  return {
    successMessage,
    errorMessage,
  }
}

/**
 * Slack 社区列表卡片：
 * - 结构与 Telegram 页面保持一致（左图标 + 主次信息 + 右箭头）；
 * - 仅展示社区基础信息，不在列表内承载操作按钮。
 */
function SlackCommunityListCard(props: {
  channel: SlackChannelRecord
  index: number
}) {
  const { channel, index } = props

  const avatarClassName: string =
    index % 3 === 0
      ? 'bg-[#4a154b]'
      : index % 3 === 1
        ? 'bg-[#1f2937]'
        : 'border border-[#d4d4d8] bg-[#f4f4f5]'

  return (
    <article className="flex h-[82px] items-center rounded-lg border border-[#e5e7eb] bg-white px-6">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${avatarClassName}`}>
        <img
          src="/platform-icons/slack.svg"
          alt={m.platform_slack()}
          className="h-5 w-5 object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="ml-6 min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-[1.6] text-slate-800">{channel.name}</p>
        <div className="mt-0.5 flex items-center gap-4 text-sm font-medium text-slate-500">
          <span className="truncate">{getSlackChannelTypeLabel(channel)}</span>
          <span className="h-3 w-px shrink-0 bg-[#d1d5db]" />
          <span className="truncate">ID {channel.channelId}</span>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
    </article>
  )
}

/**
 * Slack 集成设置页：
 * - 布局和交互节奏对齐 Telegram 页面；
 * - 操作动作集中到“添加社区”弹窗内。
 */
export function SlackIntegrationPanel(props: {
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
    queryKey: ['settings', 'slack-integration-status', activeCompanyId],
    enabled: Boolean(activeCompanyId) && canManage,
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.workspace_select_company_error())
      }

      return fetchSlackIntegrationStatus({
        companyId: activeCompanyId,
      })
    },
    staleTime: 15_000,
  })

  const channelsQuery = useQuery({
    queryKey: ['settings', 'slack-integration-channels', activeCompanyId],
    enabled: Boolean(activeCompanyId),
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.workspace_select_company_error())
      }

      return fetchSlackChannels({
        companyId: activeCompanyId,
      })
    },
    staleTime: 15_000,
  })

  const installMutation = useMutation({
    mutationFn: createSlackInstallUrl,
  })

  const syncMutation = useMutation({
    mutationFn: syncSlackIntegration,
  })

  useEffect(() => {
    const callbackMessage = readAndConsumeSlackCallbackMessage()

    if (callbackMessage.successMessage) {
      setOperationMessage(callbackMessage.successMessage)
      setOperationError(null)
      void queryClient.invalidateQueries({
        queryKey: ['settings', 'slack-integration-channels'],
      })
      void queryClient.invalidateQueries({
        queryKey: ['settings', 'slack-integration-status'],
      })
    }

    if (callbackMessage.errorMessage) {
      setOperationError(callbackMessage.errorMessage)
      setOperationMessage(null)
    }
  }, [queryClient])

  const connection = statusQuery.data?.connection || null

  const statusLabel = useMemo(() => getSlackConnectionStatusLabel(connection), [connection])
  const isConnected = Boolean(connection?.externalWorkspaceId)

  const handleConnectSlack = async (): Promise<void> => {
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
          : m.integration_create_install_error({ platform: m.platform_slack() }),
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
            queryKey: ['settings', 'slack-integration-status', activeCompanyId],
          })
          await queryClient.invalidateQueries({
            queryKey: ['settings', 'slack-integration-channels', activeCompanyId],
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
  }

  const channels: SlackChannelRecord[] = channelsQuery.data?.channels || []

  return (
    <>
      <SettingsSectionShell
        title={m.platform_slack()}
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
                <SlackCommunityListCard key={channel.id} channel={channel} index={index} />
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
      </SettingsSectionShell>

      <Dialog open={isOnboardingDialogOpen} onOpenChange={setIsOnboardingDialogOpen}>
        <DialogContent className="max-w-[520px] border-[#e5e7eb] bg-[#f8fafc] p-5 sm:max-w-[520px]">
          <DialogHeader className="gap-1 text-left">
            <DialogTitle className="text-lg font-semibold text-slate-800">
              {m.integration_dialog_title({ platform: m.platform_slack() })}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <section className="space-y-2 rounded-lg border border-[#e5e7eb] bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-slate-800">
                  {m.integration_step_connect({ platform: m.platform_slack() })}
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
                  void handleConnectSlack()
                }}
              >
                {installMutation.isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {m.integration_creating_install_link()}
                  </>
                ) : isConnected ? (
                  m.integration_reconnect({ platform: m.platform_slack() })
                ) : (
                  m.integration_connect({ platform: m.platform_slack() })
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
