import { Bot, Power, RotateCcw, ShieldCheck, SquarePen } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type {
  FeishuBotRecord,
  FeishuChannelRecord,
} from '@/lib/services/feishu-integration-api'
import { m } from '@/paraglide/messages'

import { resolveFeishuBotPresentationStatus } from './feishu-integration-panel.utils'

type FeishuBotCardProps = {
  bot: FeishuBotRecord
  channels: FeishuChannelRecord[]
  canManage: boolean
  verifyPending: boolean
  restartPending: boolean
  updatePending: boolean
  onVerify: () => void
  onRestart: () => void
  onToggleEnabled: () => void
  onEdit: () => void
}

type StatusBadgeTone = 'success' | 'neutral' | 'danger' | 'warning'

function getFeishuChannelTypeLabel(chatType: string | null): string {
  const normalizedType = String(chatType || '').trim()

  if (!normalizedType) {
    return m.feishu_default_chat_type()
  }

  return normalizedType
    .split(/[_-]+/g)
    .filter((segment) => Boolean(segment))
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

function formatFeishuTimestamp(value: string | null): string {
  if (!value) {
    return m.feishu_bot_meta_never()
  }

  return new Date(value).toLocaleString(undefined, {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function resolveStatusBadgeLabel(bot: FeishuBotRecord): string {
  const presentationStatus = resolveFeishuBotPresentationStatus(bot)

  if (presentationStatus === 'active') return m.feishu_bot_status_active()
  if (presentationStatus === 'disabled') return m.feishu_bot_status_disabled()
  if (presentationStatus === 'error') return m.feishu_bot_status_error()
  return m.feishu_bot_status_pending()
}

function resolveStatusBadgeTone(bot: FeishuBotRecord): StatusBadgeTone {
  const presentationStatus = resolveFeishuBotPresentationStatus(bot)

  if (presentationStatus === 'active') return 'success'
  if (presentationStatus === 'disabled') return 'neutral'
  if (presentationStatus === 'error') return 'danger'
  return 'warning'
}

function getStatusBadgeClassName(tone: StatusBadgeTone): string {
  if (tone === 'success') {
    return 'border-[var(--dashboard-badge-success-border)] bg-[var(--dashboard-badge-success-bg)] text-[var(--dashboard-badge-success-text)]'
  }

  if (tone === 'neutral') {
    return 'border-[var(--dashboard-badge-neutral-border)] bg-[var(--dashboard-badge-neutral-bg)] text-[var(--dashboard-badge-neutral-text)]'
  }

  if (tone === 'danger') {
    return 'border-[var(--dashboard-badge-danger-border)] bg-[var(--dashboard-badge-danger-bg)] text-[var(--dashboard-badge-danger-text)]'
  }

  return 'border-[var(--dashboard-badge-warning-border)] bg-[var(--dashboard-badge-warning-bg)] text-[var(--dashboard-badge-warning-text)]'
}

function MetaItem(props: {
  label: string
  value: string
}) {
  const { label, value } = props

  return (
    <div className="space-y-1">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--dashboard-text-muted)]">
        {label}
      </p>
      <p className="text-sm font-medium text-[var(--dashboard-title-text)]">{value}</p>
    </div>
  )
}

/**
 * 单个 Bot 卡片：
 * - 上半部分承载状态、关键时间和操作按钮；
 * - 下半部分直接展开归属 channel，避免再跳到别的设置区找归属关系。
 */
export function FeishuBotCard(props: FeishuBotCardProps) {
  const {
    bot,
    channels,
    canManage,
    verifyPending,
    restartPending,
    updatePending,
    onVerify,
    onRestart,
    onToggleEnabled,
    onEdit,
  } = props
  const isEnabled = bot.status !== 'disabled'
  const statusBadgeTone = resolveStatusBadgeTone(bot)
  const isAnyActionPending = verifyPending || restartPending || updatePending

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)]">
      <div className="space-y-4 p-5">
        <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--dashboard-message-mention-feishu-bg)] text-[var(--dashboard-message-mention-feishu-text)]">
              <Bot className="h-5 w-5" />
            </div>

            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-lg font-semibold text-[var(--dashboard-title-text)]">
                  {bot.name}
                </h2>
                <Badge className={getStatusBadgeClassName(statusBadgeTone)}>
                  {resolveStatusBadgeLabel(bot)}
                </Badge>
                {bot.isDefault ? (
                  <Badge className="border-[var(--dashboard-badge-primary-border)] bg-[var(--dashboard-badge-primary-bg)] text-[var(--dashboard-badge-primary-text)]">
                    {m.feishu_bot_default_badge()}
                  </Badge>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--dashboard-text-muted)]">
                <span className="font-medium text-[var(--dashboard-title-text)]">{bot.appId}</span>
                {bot.tenantKey ? (
                  <>
                    <span className="h-3 w-px bg-[var(--dashboard-panel-border)]" />
                    <span>{bot.tenantKey}</span>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="dashboardTinted"
              size="sm"
              className="rounded-lg"
              disabled={!canManage || isAnyActionPending}
              onClick={onVerify}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {verifyPending ? m.feishu_bot_action_verifying() : m.feishu_bot_action_verify()}
            </Button>

            <Button
              type="button"
              variant="dashboardTinted"
              size="sm"
              className="rounded-lg"
              disabled={!canManage || isAnyActionPending}
              onClick={onRestart}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {restartPending ? m.feishu_bot_action_restarting() : m.feishu_bot_action_restart()}
            </Button>

            <Button
              type="button"
              variant="dashboardTinted"
              size="sm"
              className="rounded-lg"
              disabled={!canManage || isAnyActionPending}
              onClick={onEdit}
            >
              <SquarePen className="h-3.5 w-3.5" />
              {m.common_edit()}
            </Button>

            <Button
              type="button"
              variant={isEnabled ? 'dashboardTinted' : 'dashboardPrimary'}
              size="sm"
              className="rounded-lg"
              disabled={!canManage || isAnyActionPending}
              onClick={onToggleEnabled}
            >
              <Power className="h-3.5 w-3.5" />
              {updatePending
                ? m.feishu_bot_action_updating()
                : isEnabled
                  ? m.feishu_bot_action_disable()
                  : m.feishu_bot_action_enable()}
            </Button>
          </div>
        </header>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetaItem label={m.feishu_bot_meta_verified_at()} value={formatFeishuTimestamp(bot.lastVerifiedAt)} />
          <MetaItem label={m.feishu_bot_meta_connected_at()} value={formatFeishuTimestamp(bot.lastConnectedAt)} />
          <MetaItem label={m.feishu_bot_meta_heartbeat_at()} value={formatFeishuTimestamp(bot.lastHeartbeatAt)} />
          <MetaItem label={m.feishu_bot_meta_event_at()} value={formatFeishuTimestamp(bot.lastEventAt)} />
        </div>

        {bot.lastError ? (
          <div className="rounded-xl border border-[var(--dashboard-danger-border)] bg-[var(--dashboard-danger-bg)] px-3 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--dashboard-danger-text)]">
              {m.feishu_bot_last_error_label()}
            </p>
            <p className="mt-1 text-sm text-[var(--dashboard-danger-text)]">{bot.lastError}</p>
          </div>
        ) : null}
      </div>

      <div className="border-t border-[var(--dashboard-panel-border)] bg-[var(--dashboard-soft-surface)] px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[var(--dashboard-title-text)]">
              {m.feishu_bot_assigned_channels_title()}
            </p>
          </div>

          <Badge className="border-[var(--dashboard-badge-neutral-border)] bg-[var(--dashboard-badge-neutral-bg)] text-[var(--dashboard-badge-neutral-text)]">
            {m.feishu_bot_assigned_channels_count({ count: channels.length })}
          </Badge>
        </div>

        {channels.length > 0 ? (
          <div className="mt-3 space-y-2">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="flex flex-col gap-1 rounded-xl border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-3 py-2.5 md:flex-row md:items-center md:justify-between"
              >
                <p className="truncate text-sm font-medium text-[var(--dashboard-title-text)]">{channel.name}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--dashboard-text-muted)]">
                  <span>{getFeishuChannelTypeLabel(channel.chatType)}</span>
                  <span className="h-3 w-px bg-[var(--dashboard-panel-border)]" />
                  <span>{channel.chatId}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 rounded-xl border border-dashed border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-3 py-3 text-sm text-[var(--dashboard-text-muted)]">
            {m.feishu_bot_assigned_channels_empty()}
          </div>
        )}
      </div>
    </article>
  )
}
