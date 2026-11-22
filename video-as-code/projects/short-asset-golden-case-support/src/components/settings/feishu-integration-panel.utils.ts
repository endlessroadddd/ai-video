import type {
  CreateFeishuBotPayload,
  FeishuBotRecord,
  FeishuChannelRecord,
  UpdateFeishuBotPayload,
} from '@/lib/services/feishu-integration-api'

export type FeishuBotPresentationStatus = 'active' | 'disabled' | 'error' | 'pending'
export type FeishuBotFormMode = 'create' | 'edit'

export type FeishuBotFormDraft = {
  name: string
  appId: string
  appSecret: string
  isDefault: boolean
  enabled: boolean
  rotateSecret: boolean
  rotatedSecret: string
}

export type GroupedFeishuChannels = {
  channelsByBotId: Map<string, FeishuChannelRecord[]>
  unassignedChannels: FeishuChannelRecord[]
}

export type FeishuBotSummary = {
  totalBotCount: number
  activeBotCount: number
  boundChannelCount: number
  errorBotCount: number
  defaultBot: FeishuBotRecord | null
}

/**
 * 统一定义“卡片上展示什么状态”：
 * - `disabled` 优先级最高，避免停用 Bot 仍然被当成异常；
 * - 有 lastError 或显式 error 时展示异常；
 * - `connecting/pending/unknown` 统一收敛成 pending，减少 UI 状态碎片。
 */
export function resolveFeishuBotPresentationStatus(bot: FeishuBotRecord): FeishuBotPresentationStatus {
  if (bot.status === 'disabled') {
    return 'disabled'
  }

  if (bot.lastError || bot.status === 'error') {
    return 'error'
  }

  if (bot.status === 'pending' || bot.status === 'connecting' || bot.status === 'unknown') {
    return 'pending'
  }

  return 'active'
}

export function isFeishuBotEnabled(bot: FeishuBotRecord): boolean {
  return bot.status !== 'disabled'
}

/**
 * 按 `ownerBotAppId` 把 channel 归到对应 Bot：
 * - 绑定到不存在 Bot 的脏数据也归入 unassigned，避免界面“凭空消失”；
 * - Map 保留插入顺序，渲染时与 Bot 列表顺序保持一致。
 */
export function groupFeishuChannelsByBot(
  bots: FeishuBotRecord[],
  channels: FeishuChannelRecord[],
): GroupedFeishuChannels {
  const channelsByBotId = new Map<string, FeishuChannelRecord[]>()
  const botIdSet = new Set<string>(bots.map((bot) => bot.id))

  bots.forEach((bot) => {
    channelsByBotId.set(bot.id, [])
  })

  const unassignedChannels = channels.filter((channel) => {
    const ownerBotAppId = channel.ownerBotAppId?.trim() || null

    if (!ownerBotAppId || !botIdSet.has(ownerBotAppId)) {
      return true
    }

    const currentChannels = channelsByBotId.get(ownerBotAppId) || []
    currentChannels.push(channel)
    channelsByBotId.set(ownerBotAppId, currentChannels)
    return false
  })

  return {
    channelsByBotId,
    unassignedChannels,
  }
}

export function buildFeishuBotSummary(
  bots: FeishuBotRecord[],
  channels: FeishuChannelRecord[],
): FeishuBotSummary {
  const defaultBot = bots.find((bot) => bot.isDefault) || null
  const activeBotCount = bots.filter((bot) => resolveFeishuBotPresentationStatus(bot) === 'active').length
  const errorBotCount = bots.filter((bot) => resolveFeishuBotPresentationStatus(bot) === 'error').length
  const boundChannelCount = channels.filter((channel) => Boolean(channel.ownerBotAppId?.trim())).length

  return {
    totalBotCount: bots.length,
    activeBotCount,
    boundChannelCount,
    errorBotCount,
    defaultBot,
  }
}

export function createFeishuBotFormDraft(
  mode: FeishuBotFormMode,
  bot: FeishuBotRecord | null,
): FeishuBotFormDraft {
  if (mode === 'edit' && bot) {
    return {
      name: bot.name,
      appId: bot.appId,
      appSecret: '',
      isDefault: bot.isDefault,
      enabled: isFeishuBotEnabled(bot),
      rotateSecret: false,
      rotatedSecret: '',
    }
  }

  return {
    name: '',
    appId: '',
    appSecret: '',
    isDefault: false,
    enabled: true,
    rotateSecret: false,
    rotatedSecret: '',
  }
}

export function buildFeishuBotFormSubmission(payload: {
  mode: FeishuBotFormMode
  companyId: string
  bot: FeishuBotRecord | null
  draft: FeishuBotFormDraft
}): CreateFeishuBotPayload | UpdateFeishuBotPayload {
  const normalizedName = payload.draft.name.trim()

  if (payload.mode === 'create') {
    return {
      companyId: payload.companyId,
      name: normalizedName,
      appId: payload.draft.appId.trim(),
      appSecret: payload.draft.appSecret.trim(),
      isDefault: payload.draft.isDefault,
    }
  }

  if (!payload.bot) {
    throw new Error('missing_edit_bot')
  }

  const updatePayload: UpdateFeishuBotPayload = {
    companyId: payload.companyId,
    botId: payload.bot.id,
    name: normalizedName,
    isDefault: payload.draft.isDefault,
    status: payload.draft.enabled ? 'active' : 'disabled',
  }

  const rotatedSecret = payload.draft.rotatedSecret.trim()
  if (payload.draft.rotateSecret && rotatedSecret) {
    updatePayload.appSecret = rotatedSecret
  }

  return updatePayload
}
