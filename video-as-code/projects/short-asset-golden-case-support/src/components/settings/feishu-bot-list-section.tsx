import type {
  FeishuBotRecord,
  FeishuChannelRecord,
} from '@/lib/services/feishu-integration-api'
import { m } from '@/paraglide/messages'

import { FeishuBotCard } from './feishu-bot-card'

type FeishuBotListSectionProps = {
  bots: FeishuBotRecord[]
  channelsByBotId: Map<string, FeishuChannelRecord[]>
  canManage: boolean
  verifyPendingBotId: string | null
  restartPendingBotId: string | null
  updatePendingBotId: string | null
  onVerify: (bot: FeishuBotRecord) => void
  onRestart: (bot: FeishuBotRecord) => void
  onToggleEnabled: (bot: FeishuBotRecord) => void
  onEdit: (bot: FeishuBotRecord) => void
}

/**
 * Bot 列表区只负责“列表本身”：
 * - 空态与真实卡片使用同一层级，避免主面板里混入过多分支；
 * - 操作回调仍交给父层统一处理 mutation、确认弹窗和 query 失效。
 */
export function FeishuBotListSection(props: FeishuBotListSectionProps) {
  const {
    bots,
    channelsByBotId,
    canManage,
    verifyPendingBotId,
    restartPendingBotId,
    updatePendingBotId,
    onVerify,
    onRestart,
    onToggleEnabled,
    onEdit,
  } = props

  if (bots.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-5 py-8">
        <p className="text-base font-semibold text-[var(--dashboard-title-text)]">
          {m.feishu_bot_empty_title()}
        </p>
        <p className="mt-1 text-sm text-[var(--dashboard-text-muted)]">
          {canManage ? m.feishu_bot_empty_manage_hint() : m.feishu_bot_empty_readonly_hint()}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bots.map((bot) => (
        <FeishuBotCard
          key={bot.id}
          bot={bot}
          channels={channelsByBotId.get(bot.id) || []}
          canManage={canManage}
          verifyPending={verifyPendingBotId === bot.id}
          restartPending={restartPendingBotId === bot.id}
          updatePending={updatePendingBotId === bot.id}
          onVerify={() => {
            onVerify(bot)
          }}
          onRestart={() => {
            onRestart(bot)
          }}
          onToggleEnabled={() => {
            onToggleEnabled(bot)
          }}
          onEdit={() => {
            onEdit(bot)
          }}
        />
      ))}
    </div>
  )
}
