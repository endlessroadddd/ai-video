import { Loader2, Plus, RefreshCw } from 'lucide-react'
import { useMutation, useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { CompanySelectionPrompt } from '@/components/company-selection-prompt'
import { FeishuBotFormDialog } from '@/components/settings/feishu-bot-form-dialog'
import { FeishuBotListSection } from '@/components/settings/feishu-bot-list-section'
import {
  SettingsSectionShell,
  SETTINGS_SECTION_SURFACE_CLASS_NAME,
} from '@/components/settings/settings-section-shell'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  createFeishuBot,
  fetchFeishuBots,
  fetchFeishuChannels,
  restartFeishuBot,
  updateFeishuBot,
  verifyFeishuBot,
  type CreateFeishuBotPayload,
  type FeishuBotRecord,
  type UpdateFeishuBotPayload,
} from '@/lib/services/feishu-integration-api'
import { m } from '@/paraglide/messages'

import {
  buildFeishuBotSummary,
  groupFeishuChannelsByBot,
  type FeishuBotFormMode,
} from './feishu-integration-panel.utils'

type CompanyRole = 'owner' | 'admin' | 'member'

type FormDialogState = {
  mode: FeishuBotFormMode
  bot: FeishuBotRecord | null
}

type ConfirmActionState =
  | {
      kind: 'restart' | 'disable'
      bot: FeishuBotRecord
    }
  | null

function SummaryCard(props: {
  title: string
  value: string
  helper: string
}) {
  const { title, value, helper } = props

  return (
    <article className={`${SETTINGS_SECTION_SURFACE_CLASS_NAME} rounded-2xl p-4`}>
      <p className="text-sm font-medium text-[var(--dashboard-text-muted)]">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-[var(--dashboard-title-text)]">{value}</p>
      <p className="mt-1 text-sm text-[var(--dashboard-text-muted)]">{helper}</p>
    </article>
  )
}

function FeishuSummarySkeleton() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`feishu-summary-skeleton-${index}`}
          className={`${SETTINGS_SECTION_SURFACE_CLASS_NAME} rounded-2xl p-4`}
        >
          <Skeleton className="dashboard-skeleton--soft h-4 w-[108px] rounded-[4px]" />
          <Skeleton className="dashboard-skeleton--base mt-3 h-8 w-[72px] rounded-[6px]" />
          <Skeleton className="dashboard-skeleton--soft mt-2 h-3 w-[132px] rounded-[4px]" />
        </div>
      ))}
    </div>
  )
}

function FeishuBotListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <article
          key={`feishu-bot-skeleton-${index}`}
          className="dashboard-skeleton-frame overflow-hidden rounded-2xl border"
        >
          <div className="space-y-4 p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <Skeleton className="dashboard-skeleton--strong h-11 w-11 shrink-0 rounded-2xl" />
                <div className="min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="dashboard-skeleton--base h-5 w-[148px] rounded-[4px]" />
                    <Skeleton className="dashboard-skeleton--soft h-5 w-[74px] rounded-full" />
                  </div>
                  <Skeleton className="dashboard-skeleton--soft h-3 w-[164px] rounded-[4px]" />
                </div>
              </div>

              <div className="flex gap-2">
                <Skeleton className="dashboard-skeleton--soft h-8 w-[90px] rounded-lg" />
                <Skeleton className="dashboard-skeleton--soft h-8 w-[90px] rounded-lg" />
                <Skeleton className="dashboard-skeleton--soft h-8 w-[90px] rounded-lg" />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((__, metaIndex) => (
                <div key={`feishu-bot-meta-skeleton-${index}-${metaIndex}`} className="space-y-2">
                  <Skeleton className="dashboard-skeleton--soft h-3 w-[92px] rounded-[4px]" />
                  <Skeleton className="dashboard-skeleton--base h-4 w-[124px] rounded-[4px]" />
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-skeleton-surface border-t px-5 py-4">
            <Skeleton className="dashboard-skeleton--base h-4 w-[136px] rounded-[4px]" />
            <div className="mt-3 space-y-2">
              {Array.from({ length: 2 }).map((__, channelIndex) => (
                <div
                  key={`feishu-bot-channel-skeleton-${index}-${channelIndex}`}
                  className="dashboard-skeleton-frame flex flex-col gap-2 rounded-xl border px-3 py-2.5 md:flex-row md:items-center md:justify-between"
                >
                  <Skeleton className="dashboard-skeleton--base h-4 w-[164px] rounded-[4px]" />
                  <Skeleton className="dashboard-skeleton--soft h-3 w-[112px] rounded-[4px]" />
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

async function invalidateFeishuQueries(queryClient: QueryClient, companyId: string): Promise<void> {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: ['settings', 'feishu-bots', companyId],
    }),
    queryClient.invalidateQueries({
      queryKey: ['settings', 'feishu-channels', companyId],
    }),
  ])
}

function getErrorMessage(error: unknown, fallbackMessage: string): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return fallbackMessage
}

/**
 * Feishu 集成设置页：
 * - 保留 settings 导航结构，仅把内容区升级成 Bot 管理视图；
 * - 所有写操作统一走 query invalidation，保持列表、摘要和 channel 归属视图一致。
 */
export function FeishuIntegrationPanel(props: {
  activeCompanyId: string | null
  currentUserRole: CompanyRole
}) {
  const { activeCompanyId, currentUserRole } = props
  const queryClient = useQueryClient()
  const [operationMessage, setOperationMessage] = useState<string | null>(null)
  const [operationError, setOperationError] = useState<string | null>(null)
  const [formDialogState, setFormDialogState] = useState<FormDialogState | null>(null)
  const [formSubmitError, setFormSubmitError] = useState<string | null>(null)
  const [confirmAction, setConfirmAction] = useState<ConfirmActionState>(null)
  const canManage = currentUserRole === 'owner' || currentUserRole === 'admin'

  const botsQuery = useQuery({
    queryKey: ['settings', 'feishu-bots', activeCompanyId],
    enabled: Boolean(activeCompanyId),
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      return fetchFeishuBots({
        companyId: activeCompanyId,
      })
    },
    staleTime: 15_000,
  })

  const channelsQuery = useQuery({
    queryKey: ['settings', 'feishu-channels', activeCompanyId],
    enabled: Boolean(activeCompanyId),
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      return fetchFeishuChannels({
        companyId: activeCompanyId,
      })
    },
    staleTime: 15_000,
  })

  const createBotMutation = useMutation({
    mutationFn: createFeishuBot,
  })

  const updateBotMutation = useMutation({
    mutationFn: updateFeishuBot,
  })

  const verifyBotMutation = useMutation({
    mutationFn: verifyFeishuBot,
  })

  const restartBotMutation = useMutation({
    mutationFn: restartFeishuBot,
  })

  const bots = botsQuery.data?.bots || []
  const channels = channelsQuery.data?.channels || []
  const groupedChannels = useMemo(() => groupFeishuChannelsByBot(bots, channels), [bots, channels])
  const summary = useMemo(() => buildFeishuBotSummary(bots, channels), [bots, channels])
  const isInitialLoading = (botsQuery.isLoading && !botsQuery.data) || (channelsQuery.isLoading && !channelsQuery.data)
  const verifyPendingBotId = verifyBotMutation.isPending ? verifyBotMutation.variables?.botId || null : null
  const restartPendingBotId = restartBotMutation.isPending ? restartBotMutation.variables?.botId || null : null
  const updatePendingBotId = updateBotMutation.isPending ? updateBotMutation.variables?.botId || null : null

  const clearTopLevelFeedback = (): void => {
    setOperationMessage(null)
    setOperationError(null)
  }

  const handleRefresh = async (): Promise<void> => {
    clearTopLevelFeedback()
    await Promise.all([botsQuery.refetch(), channelsQuery.refetch()])
  }

  const handleSubmitBotForm = async (
    payload: CreateFeishuBotPayload | UpdateFeishuBotPayload,
  ): Promise<void> => {
    if (!activeCompanyId) {
      setFormSubmitError(m.workspace_select_company_error())
      return
    }

    clearTopLevelFeedback()
    setFormSubmitError(null)

    try {
      if ('botId' in payload) {
        await updateBotMutation.mutateAsync(payload)
        setOperationMessage(m.feishu_bot_update_success())
      } else {
        await createBotMutation.mutateAsync(payload)
        setOperationMessage(m.feishu_bot_create_success())
      }

      await invalidateFeishuQueries(queryClient, activeCompanyId)
      setFormDialogState(null)
    } catch (error) {
      setFormSubmitError(getErrorMessage(error, m.feishu_bot_save_error()))
    }
  }

  const handleVerifyBot = async (bot: FeishuBotRecord): Promise<void> => {
    if (!activeCompanyId) {
      setOperationError(m.workspace_select_company_error())
      return
    }

    clearTopLevelFeedback()

    try {
      await verifyBotMutation.mutateAsync({
        companyId: activeCompanyId,
        botId: bot.id,
      })

      setOperationMessage(m.feishu_bot_verify_success())
      await invalidateFeishuQueries(queryClient, activeCompanyId)
    } catch (error) {
      setOperationError(getErrorMessage(error, m.feishu_bot_verify_error()))
    }
  }

  const handleEnableBot = async (bot: FeishuBotRecord): Promise<void> => {
    if (!activeCompanyId) {
      setOperationError(m.workspace_select_company_error())
      return
    }

    clearTopLevelFeedback()

    try {
      await updateBotMutation.mutateAsync({
        companyId: activeCompanyId,
        botId: bot.id,
        name: bot.name,
        isDefault: bot.isDefault,
        status: 'active',
      })

      setOperationMessage(m.feishu_bot_enable_success())
      await invalidateFeishuQueries(queryClient, activeCompanyId)
    } catch (error) {
      setOperationError(getErrorMessage(error, m.feishu_bot_enable_error()))
    }
  }

  const handleConfirmAction = async (): Promise<void> => {
    if (!activeCompanyId || !confirmAction) {
      return
    }

    clearTopLevelFeedback()

    try {
      if (confirmAction.kind === 'restart') {
        await restartBotMutation.mutateAsync({
          companyId: activeCompanyId,
          botId: confirmAction.bot.id,
        })
        setOperationMessage(m.feishu_bot_restart_success())
      } else {
        await updateBotMutation.mutateAsync({
          companyId: activeCompanyId,
          botId: confirmAction.bot.id,
          name: confirmAction.bot.name,
          isDefault: confirmAction.bot.isDefault,
          status: 'disabled',
        })
        setOperationMessage(m.feishu_bot_disable_success())
      }

      await invalidateFeishuQueries(queryClient, activeCompanyId)
      setConfirmAction(null)
    } catch (error) {
      setOperationError(
        confirmAction.kind === 'restart'
          ? getErrorMessage(error, m.feishu_bot_restart_error())
          : getErrorMessage(error, m.feishu_bot_disable_error()),
      )
    }
  }

  if (!activeCompanyId) {
    return (
      <SettingsSectionShell title={m.feishu_settings_title()}>
        <CompanySelectionPrompt message={m.settings_select_company_first()} />
      </SettingsSectionShell>
    )
  }

  return (
    <>
      <SettingsSectionShell
        title={m.feishu_settings_title()}
        className="space-y-4"
        actions={
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="dashboardTinted"
              size="sm"
              className="h-9 rounded-xl px-3 text-sm font-medium"
              disabled={botsQuery.isFetching || channelsQuery.isFetching}
              onClick={() => {
                void handleRefresh()
              }}
            >
              {botsQuery.isFetching || channelsQuery.isFetching ? (
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

            {canManage ? (
              <Button
                type="button"
                variant="dashboardPrimary"
                size="sm"
                className="h-9 rounded-xl px-3 text-sm font-semibold"
                onClick={() => {
                  setFormSubmitError(null)
                  setFormDialogState({
                    mode: 'create',
                    bot: null,
                  })
                }}
              >
                <Plus className="h-4 w-4" />
                {m.feishu_bot_add_button()}
              </Button>
            ) : null}
          </div>
        }
      >
        {isInitialLoading ? (
          <FeishuSummarySkeleton />
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              title={m.feishu_bot_summary_connected_title()}
              value={String(summary.activeBotCount)}
              helper={m.feishu_bot_summary_connected_hint({ count: summary.totalBotCount })}
            />
            <SummaryCard
              title={m.feishu_bot_summary_default_title()}
              value={summary.defaultBot?.name || m.common_none()}
              helper={summary.defaultBot?.appId || m.feishu_bot_summary_default_hint()}
            />
            <SummaryCard
              title={m.feishu_bot_summary_channels_bound_title()}
              value={String(summary.boundChannelCount)}
              helper={m.feishu_bot_summary_channels_bound_hint({ count: groupedChannels.unassignedChannels.length })}
            />
            <SummaryCard
              title={m.feishu_bot_summary_last_error_title()}
              value={String(summary.errorBotCount)}
              helper={m.feishu_bot_summary_last_error_hint()}
            />
          </div>
        )}

        {!canManage ? (
          <div className="rounded-2xl border border-[var(--dashboard-badge-neutral-border)] bg-[var(--dashboard-soft-surface)] px-4 py-3 text-sm text-[var(--dashboard-text-muted)]">
            {m.feishu_bot_member_readonly_hint()}
          </div>
        ) : null}

        {botsQuery.error ? (
          <div className="rounded-2xl border border-[var(--dashboard-danger-border)] bg-[var(--dashboard-danger-bg)] px-4 py-3 text-sm text-[var(--dashboard-danger-text)]">
            {botsQuery.error.message}
          </div>
        ) : null}

        {channelsQuery.error ? (
          <div className="rounded-2xl border border-[var(--dashboard-danger-border)] bg-[var(--dashboard-danger-bg)] px-4 py-3 text-sm text-[var(--dashboard-danger-text)]">
            {channelsQuery.error.message}
          </div>
        ) : null}

        {operationMessage ? (
          <div className="rounded-2xl border border-[var(--dashboard-badge-success-border)] bg-[var(--dashboard-badge-success-bg)] px-4 py-3 text-sm text-[var(--dashboard-badge-success-text)]">
            {operationMessage}
          </div>
        ) : null}

        {operationError ? (
          <div className="rounded-2xl border border-[var(--dashboard-danger-border)] bg-[var(--dashboard-danger-bg)] px-4 py-3 text-sm text-[var(--dashboard-danger-text)]">
            {operationError}
          </div>
        ) : null}

        {isInitialLoading ? (
          <FeishuBotListSkeleton />
        ) : (
          <FeishuBotListSection
            bots={bots}
            channelsByBotId={groupedChannels.channelsByBotId}
            canManage={canManage}
            verifyPendingBotId={verifyPendingBotId}
            restartPendingBotId={restartPendingBotId}
            updatePendingBotId={updatePendingBotId}
            onVerify={(bot) => {
              void handleVerifyBot(bot)
            }}
            onRestart={(bot) => {
              setConfirmAction({
                kind: 'restart',
                bot,
              })
            }}
            onToggleEnabled={(bot) => {
              if (bot.status === 'disabled') {
                void handleEnableBot(bot)
                return
              }

              setConfirmAction({
                kind: 'disable',
                bot,
              })
            }}
            onEdit={(bot) => {
              setFormSubmitError(null)
              setFormDialogState({
                mode: 'edit',
                bot,
              })
            }}
          />
        )}
      </SettingsSectionShell>

      <FeishuBotFormDialog
        mode={formDialogState?.mode || 'create'}
        open={Boolean(formDialogState)}
        companyId={activeCompanyId}
        bot={formDialogState?.bot || null}
        pending={
          formDialogState?.mode === 'create'
            ? createBotMutation.isPending
            : updateBotMutation.isPending && updateBotMutation.variables?.botId === formDialogState?.bot?.id
        }
        submitError={formSubmitError}
        onOpenChange={(open) => {
          if (!open) {
            setFormDialogState(null)
            setFormSubmitError(null)
          }
        }}
        onSubmit={async (payload) => {
          await handleSubmitBotForm(payload)
        }}
      />

      <AlertDialog
        open={Boolean(confirmAction)}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmAction(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction?.kind === 'restart'
                ? m.feishu_bot_restart_confirm_title()
                : m.feishu_bot_disable_confirm_title()}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction?.kind === 'restart'
                ? m.feishu_bot_restart_confirm_description()
                : m.feishu_bot_disable_confirm_description()}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>{m.common_cancel()}</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault()
                void handleConfirmAction()
              }}
            >
              {confirmAction?.kind === 'restart'
                ? m.feishu_bot_action_restart()
                : m.feishu_bot_action_disable()}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
