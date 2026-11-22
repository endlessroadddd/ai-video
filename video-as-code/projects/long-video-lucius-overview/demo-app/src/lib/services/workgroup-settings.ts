import type { SupabaseClient } from '@supabase/supabase-js'

import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { m } from '@/paraglide/messages'
import {
  fetchDiscordChannels,
  fetchDiscordIntegrationStatus,
  type DiscordChannelRecord,
  type DiscordConnectionRecord,
} from '@/lib/services/discord-integration-api'
import {
  fetchFeishuChannels,
  type FeishuChannelRecord,
} from '@/lib/services/feishu-integration-api'
import {
  fetchSlackChannels,
  fetchSlackIntegrationStatus,
  type SlackChannelRecord,
  type SlackConnectionRecord,
} from '@/lib/services/slack-integration-api'
import {
  fetchTelegramBoundChannels,
  type TelegramBoundChannel,
} from '@/lib/services/telegram-integration-api'

export type WorkgroupPlatformType = 'discord' | 'telegram' | 'feishu' | 'slack'
export type WorkgroupPlatformState = 'ready' | 'needs-connection' | 'unavailable'

export type WorkgroupChannelRecord = {
  id: string
  companyId: string
  platform: WorkgroupPlatformType
  channelId: string
  channelName: string | null
  createdAt: string
  updatedAt: string
}

export type WorkgroupChannelOption = {
  key: string
  platform: WorkgroupPlatformType
  channelId: string
  channelName: string
  channelMeta: string | null
  isSelected: boolean
  isStale: boolean
}

export type WorkgroupPlatformSnapshot = {
  platform: WorkgroupPlatformType
  label: string
  settingsPath: string | null
  state: WorkgroupPlatformState
  summaryText: string
  helperText: string | null
  errorMessage: string | null
  selectedCount: number
  channelOptions: WorkgroupChannelOption[]
}

export type WorkgroupSettingsSnapshot = {
  totalSelectedCount: number
  selectedChannels: WorkgroupChannelRecord[]
  platforms: WorkgroupPlatformSnapshot[]
}

type SupabaseErrorLike = {
  code?: string | null
  message?: string | null
}

type WorkgroupChannelRow = {
  id?: string | null
  company_id?: string | null
  platform?: WorkgroupPlatformType | null
  channel_id?: string | null
  channel_name?: string | null
  created_at?: string | null
  updated_at?: string | null
}

type NormalizedChannelCandidate = {
  platform: WorkgroupPlatformType
  channelId: string
  channelName: string
  channelMeta: string | null
}

const WORKGROUP_SETTINGS_PATH_MAP: Record<WorkgroupPlatformType, string | null> = {
  discord: '/settings/discord-integration',
  telegram: '/settings/telegram-settings',
  feishu: '/settings/feishu-integration',
  slack: '/settings/slack-integration',
}

/**
 * 统一生成 `platform + channelId` 复合 key：
 * - 前端渲染列表时用作稳定 key；
 * - 也用于把“已保存工作群”和“当前平台返回的候选 channel”合并。
 */
export function buildWorkgroupChannelKey(
  platform: WorkgroupPlatformType,
  channelId: string,
): string {
  return `${platform}:${channelId.trim()}`
}

/**
 * 将数据库行映射为前端可用结构。
 */
function normalizeWorkgroupChannelRow(row: WorkgroupChannelRow): WorkgroupChannelRecord | null {
  const id = String(row.id || '').trim()
  const companyId = String(row.company_id || '').trim()
  const platform = row.platform || null
  const channelId = String(row.channel_id || '').trim()
  const createdAt = String(row.created_at || '').trim()
  const updatedAt = String(row.updated_at || '').trim()

  if (!id || !companyId || !platform || !channelId || !createdAt || !updatedAt) {
    return null
  }

  return {
    id,
    companyId,
    platform,
    channelId,
    channelName: row.channel_name?.trim() || null,
    createdAt,
    updatedAt,
  }
}

/**
 * 缺表时返回更可读的错误提示：
 * - 本功能依赖新迁移；
 * - 若某环境尚未执行迁移，前端需要给出明确提示而不是暴露底层报错。
 */
export function isMissingWorkgroupChannelTableError(error: SupabaseErrorLike): boolean {
  const errorCode = String(error.code || '').trim()
  const errorMessage = String(error.message || '').trim().toLowerCase()

  if (errorCode === '42P01') {
    return true
  }

  if (errorCode === 'PGRST204' || errorCode === 'PGRST205') {
    return errorMessage.includes('workgroup_channel')
  }

  return false
}

function createWorkgroupTableMissingError(): Error {
  return new Error(m.service_workgroup_table_missing())
}

function getPlatformLabel(platform: WorkgroupPlatformType): string {
  if (platform === 'discord') return m.platform_discord()
  if (platform === 'telegram') return m.platform_telegram()
  if (platform === 'feishu') return m.platform_feishu()
  return m.platform_slack()
}

/**
 * Discord 仅允许文本能力相关频道进入工作群候选：
 * - Text / Announcement / Forum 最符合“工作群”语义；
 * - 其它类型（语音、分类等）默认排除，避免误配。
 */
function isSelectableDiscordChannel(channel: DiscordChannelRecord): boolean {
  if (channel.channelType === null) {
    return true
  }

  return channel.channelType === 0 || channel.channelType === 5 || channel.channelType === 15
}

function getDiscordChannelMeta(channel: DiscordChannelRecord): string {
  if (channel.channelType === 0) return m.discord_channel_text()
  if (channel.channelType === 5) return m.discord_channel_announcement()
  if (channel.channelType === 15) return m.discord_channel_forum()
  return m.discord_channel_default()
}

/**
 * Slack 侧排除单聊与多人私聊：
 * - 工作群设置只面向团队频道；
 * - DM / MPIM 会误导成“个人对话”。
 */
function isSelectableSlackChannel(channel: SlackChannelRecord): boolean {
  return channel.channelType !== 'im' && channel.channelType !== 'mpim'
}

function getSlackChannelMeta(channel: SlackChannelRecord): string {
  if (channel.isPrivate || channel.channelType === 'private_channel') {
    return m.slack_channel_private()
  }

  if (channel.channelType === 'public_channel') {
    return m.slack_channel_public()
  }

  if (channel.channelType === 'group') {
    return m.slack_channel_group()
  }

  return m.slack_channel_default()
}

function getTelegramChannelMeta(channel: TelegramBoundChannel): string {
  if (channel.username?.trim()) {
    return `@${channel.username.trim()}`
  }

  if (channel.chatType === 'supergroup') {
    return m.workgroup_meta_supergroup()
  }

  if (channel.chatType === 'group') {
    return m.slack_channel_group()
  }

  if (channel.chatType === 'channel') {
    return m.discord_channel_default()
  }

  return m.platform_telegram()
}

/**
 * 飞书 `chat_type` 当前直接来自平台原始值：
 * - 暂不在前端维护更细的枚举映射；
 * - 只做最小格式化，保证列表中仍然有可读的元信息。
 */
function getFeishuChannelMeta(channel: FeishuChannelRecord): string {
  const normalizedType: string = String(channel.chatType || '').trim()
  if (!normalizedType) {
    return m.platform_feishu()
  }

  return normalizedType
    .split(/[_-]+/g)
    .filter((segment) => Boolean(segment))
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

function sortChannelOptions(left: WorkgroupChannelOption, right: WorkgroupChannelOption): number {
  if (left.isSelected !== right.isSelected) {
    return left.isSelected ? -1 : 1
  }

  if (left.isStale !== right.isStale) {
    return left.isStale ? -1 : 1
  }

  return left.channelName.localeCompare(right.channelName, 'zh-Hans-CN')
}

/**
 * 合并“当前候选 channel”和“已保存工作群”：
 * - 正常情况下用实时候选覆盖数据库快照名称；
 * - 若某条已保存记录已经不在平台返回列表里，仍保留为 stale 行，方便用户显式移除。
 */
export function mergeWorkgroupChannelOptions(payload: {
  platform: WorkgroupPlatformType
  availableChannels: NormalizedChannelCandidate[]
  selectedChannels: WorkgroupChannelRecord[]
}): WorkgroupChannelOption[] {
  const optionMap = new Map<string, WorkgroupChannelOption>()

  payload.availableChannels.forEach((channel) => {
    const key = buildWorkgroupChannelKey(channel.platform, channel.channelId)

    optionMap.set(key, {
      key,
      platform: channel.platform,
      channelId: channel.channelId,
      channelName: channel.channelName,
      channelMeta: channel.channelMeta,
      isSelected: false,
      isStale: false,
    })
  })

  payload.selectedChannels.forEach((channel) => {
    const key = buildWorkgroupChannelKey(channel.platform, channel.channelId)
    const existingOption = optionMap.get(key)

    if (existingOption) {
      optionMap.set(key, {
        ...existingOption,
        isSelected: true,
      })
      return
    }

    optionMap.set(key, {
      key,
      platform: channel.platform,
      channelId: channel.channelId,
      channelName: channel.channelName?.trim() || channel.channelId,
      channelMeta: m.workgroup_channel_missing_from_platform(),
      isSelected: true,
      isStale: true,
    })
  })

  return Array.from(optionMap.values()).sort(sortChannelOptions)
}

function buildPlatformSnapshot(payload: {
  platform: WorkgroupPlatformType
  state: WorkgroupPlatformState
  helperText: string | null
  errorMessage: string | null
  availableChannels: NormalizedChannelCandidate[]
  selectedChannels: WorkgroupChannelRecord[]
}): WorkgroupPlatformSnapshot {
  const channelOptions = mergeWorkgroupChannelOptions({
    platform: payload.platform,
    availableChannels: payload.availableChannels,
    selectedChannels: payload.selectedChannels,
  })

  const selectedCount = channelOptions.filter((channel) => channel.isSelected).length

  let summaryText = ''

  if (payload.state === 'ready') {
    summaryText =
      selectedCount > 0
        ? m.workgroup_summary_selected({ count: String(selectedCount) })
        : m.workgroup_summary_available({ count: String(payload.availableChannels.length) })
  } else if (selectedCount > 0) {
    summaryText = m.workgroup_summary_saved_needs_connection({ count: String(selectedCount) })
  } else if (payload.state === 'unavailable') {
    summaryText = m.workgroup_summary_unavailable()
  } else {
    summaryText = m.workgroup_summary_needs_connection()
  }

  return {
    platform: payload.platform,
    label: getPlatformLabel(payload.platform),
    settingsPath: WORKGROUP_SETTINGS_PATH_MAP[payload.platform],
    state: payload.state,
    summaryText,
    helperText: payload.helperText,
    errorMessage: payload.errorMessage,
    selectedCount,
    channelOptions,
  }
}

/**
 * 读取当前公司已经保存的工作群选择。
 */
export async function fetchCompanyWorkgroupChannels(payload: {
  companyId: string
  supabase?: SupabaseClient
}): Promise<WorkgroupChannelRecord[]> {
  const supabase = payload.supabase || getSupabaseBrowserClient()

  const result = await supabase
    .schema('integration')
    .from('workgroup_channel')
    .select('id, company_id, platform, channel_id, channel_name, created_at, updated_at')
    .eq('company_id', payload.companyId)
    .order('created_at', { ascending: true })

  if (result.error) {
    if (isMissingWorkgroupChannelTableError(result.error)) {
      throw createWorkgroupTableMissingError()
    }

    throw new Error(result.error.message || m.service_workgroup_fetch_failed())
  }

  return ((result.data || []) as WorkgroupChannelRow[])
    .map(normalizeWorkgroupChannelRow)
    .filter((row): row is WorkgroupChannelRecord => Boolean(row))
}

function normalizeDiscordChannels(channels: DiscordChannelRecord[]): NormalizedChannelCandidate[] {
  return channels
    .filter(isSelectableDiscordChannel)
    .map((channel) => ({
      platform: 'discord' as const,
      channelId: channel.channelId,
      channelName: channel.name.trim() || channel.channelId,
      channelMeta: getDiscordChannelMeta(channel),
    }))
}

function normalizeSlackChannels(channels: SlackChannelRecord[]): NormalizedChannelCandidate[] {
  return channels
    .filter(isSelectableSlackChannel)
    .map((channel) => ({
      platform: 'slack' as const,
      channelId: channel.channelId,
      channelName: channel.name.trim() || channel.channelId,
      channelMeta: getSlackChannelMeta(channel),
    }))
}

function normalizeTelegramChannels(channels: TelegramBoundChannel[]): NormalizedChannelCandidate[] {
  return channels.map((channel) => ({
    platform: 'telegram' as const,
    channelId: channel.chatId,
    channelName: channel.name.trim() || channel.chatId,
    channelMeta: getTelegramChannelMeta(channel),
  }))
}

function normalizeFeishuChannels(channels: FeishuChannelRecord[]): NormalizedChannelCandidate[] {
  return channels.map((channel) => ({
    platform: 'feishu' as const,
    channelId: channel.chatId,
    channelName: channel.name.trim() || channel.chatId,
    channelMeta: getFeishuChannelMeta(channel),
  }))
}

function canAdminSelectDiscordChannels(connection: DiscordConnectionRecord | null): boolean {
  return Boolean(connection?.externalWorkspaceId)
}

function canAdminSelectSlackChannels(connection: SlackConnectionRecord | null): boolean {
  if (!connection?.externalWorkspaceId) {
    return false
  }

  return connection.status !== 'disconnected' && connection.status !== 'disabled'
}

/**
 * 聚合工作群设置页所需的全部快照：
 * - 数据真源拆成两类：业务选择表 + 各平台候选 channel；
 * - 聚合层负责把它们整理成页面可直接渲染的结构。
 */
export async function fetchWorkgroupSettingsSnapshot(payload: {
  companyId: string
  canManage: boolean
  supabase?: SupabaseClient
}): Promise<WorkgroupSettingsSnapshot> {
  const selectedChannels = await fetchCompanyWorkgroupChannels({
    companyId: payload.companyId,
    supabase: payload.supabase,
  })

  const selectedChannelMap = new Map<WorkgroupPlatformType, WorkgroupChannelRecord[]>()

  selectedChannels.forEach((channel) => {
    const currentChannels = selectedChannelMap.get(channel.platform) || []
    currentChannels.push(channel)
    selectedChannelMap.set(channel.platform, currentChannels)
  })

  const [
    discordChannelResult,
    slackChannelResult,
    telegramChannelResult,
    feishuChannelResult,
    discordStatusResult,
    slackStatusResult,
  ] = await Promise.allSettled([
    fetchDiscordChannels({ companyId: payload.companyId }),
    fetchSlackChannels({ companyId: payload.companyId }),
    fetchTelegramBoundChannels({ companyId: payload.companyId }),
    fetchFeishuChannels({ companyId: payload.companyId, supabase: payload.supabase }),
    payload.canManage ? fetchDiscordIntegrationStatus({ companyId: payload.companyId }) : Promise.resolve(null),
    payload.canManage ? fetchSlackIntegrationStatus({ companyId: payload.companyId }) : Promise.resolve(null),
  ])

  const discordChannels =
    discordChannelResult.status === 'fulfilled'
      ? normalizeDiscordChannels(discordChannelResult.value.channels)
      : []
  const slackChannels =
    slackChannelResult.status === 'fulfilled' ? normalizeSlackChannels(slackChannelResult.value.channels) : []
  const telegramChannels =
    telegramChannelResult.status === 'fulfilled'
      ? normalizeTelegramChannels(telegramChannelResult.value.channels)
      : []
  const feishuChannels =
    feishuChannelResult.status === 'fulfilled'
      ? normalizeFeishuChannels(feishuChannelResult.value.channels)
      : []

  const discordConnection =
    payload.canManage &&
    discordStatusResult.status === 'fulfilled' &&
    discordStatusResult.value
      ? discordStatusResult.value.connection
      : null
  const slackConnection =
    payload.canManage &&
    slackStatusResult.status === 'fulfilled' &&
    slackStatusResult.value
      ? slackStatusResult.value.connection
      : null

  const discordState: WorkgroupPlatformState =
    discordChannelResult.status === 'rejected' && !payload.canManage
      ? 'unavailable'
      : payload.canManage
        ? canAdminSelectDiscordChannels(discordConnection)
          ? 'ready'
          : 'needs-connection'
        : discordChannels.length > 0
          ? 'ready'
          : 'needs-connection'

  const slackState: WorkgroupPlatformState =
    slackChannelResult.status === 'rejected' && !payload.canManage
      ? 'unavailable'
      : payload.canManage
        ? canAdminSelectSlackChannels(slackConnection)
          ? 'ready'
          : 'needs-connection'
        : slackChannels.length > 0
          ? 'ready'
          : 'needs-connection'

  const telegramState: WorkgroupPlatformState =
    telegramChannelResult.status === 'rejected'
      ? 'unavailable'
      : telegramChannels.length > 0
        ? 'ready'
        : 'needs-connection'

  const feishuState: WorkgroupPlatformState =
    feishuChannelResult.status === 'rejected'
      ? 'unavailable'
      : feishuChannels.length > 0
        ? 'ready'
        : 'needs-connection'

  const platforms: WorkgroupPlatformSnapshot[] = [
    buildPlatformSnapshot({
      platform: 'discord',
      state: discordState,
      helperText:
        discordState === 'ready'
          ? discordConnection?.externalWorkspaceName
            ? m.workgroup_helper_connected_named({ name: discordConnection.externalWorkspaceName })
            : m.workgroup_discord_ready()
          : m.workgroup_discord_connect_first(),
      errorMessage:
        discordChannelResult.status === 'rejected'
          ? discordChannelResult.reason instanceof Error
            ? discordChannelResult.reason.message
            : m.workgroup_discord_channels_read_failed()
          : discordStatusResult.status === 'rejected'
            ? discordStatusResult.reason instanceof Error
              ? discordStatusResult.reason.message
              : m.workgroup_discord_status_read_failed()
            : null,
      availableChannels: discordState === 'ready' ? discordChannels : [],
      selectedChannels: selectedChannelMap.get('discord') || [],
    }),
    buildPlatformSnapshot({
      platform: 'slack',
      state: slackState,
      helperText:
        slackState === 'ready'
          ? slackConnection?.externalWorkspaceName
            ? m.workgroup_helper_connected_named({ name: slackConnection.externalWorkspaceName })
            : m.workgroup_slack_ready()
          : m.workgroup_slack_connect_first(),
      errorMessage:
        slackChannelResult.status === 'rejected'
          ? slackChannelResult.reason instanceof Error
            ? slackChannelResult.reason.message
            : m.workgroup_slack_channels_read_failed()
          : slackStatusResult.status === 'rejected'
            ? slackStatusResult.reason instanceof Error
              ? slackStatusResult.reason.message
              : m.workgroup_slack_status_read_failed()
            : null,
      availableChannels: slackState === 'ready' ? slackChannels : [],
      selectedChannels: selectedChannelMap.get('slack') || [],
    }),
    buildPlatformSnapshot({
      platform: 'telegram',
      state: telegramState,
      helperText:
        telegramState === 'ready'
          ? m.workgroup_telegram_ready({ count: String(telegramChannels.length) })
          : m.workgroup_telegram_connect_first(),
      errorMessage:
        telegramChannelResult.status === 'rejected'
          ? telegramChannelResult.reason instanceof Error
            ? telegramChannelResult.reason.message
            : m.workgroup_telegram_channels_read_failed()
          : null,
      availableChannels: telegramState === 'ready' ? telegramChannels : [],
      selectedChannels: selectedChannelMap.get('telegram') || [],
    }),
    buildPlatformSnapshot({
      platform: 'feishu',
      state: feishuState,
      helperText:
        feishuState === 'ready'
          ? m.workgroup_feishu_ready({ count: String(feishuChannels.length) })
          : m.workgroup_feishu_connect_first(),
      errorMessage:
        feishuChannelResult.status === 'rejected'
          ? feishuChannelResult.reason instanceof Error
            ? feishuChannelResult.reason.message
            : m.workgroup_feishu_channels_read_failed()
          : null,
      availableChannels: feishuState === 'ready' ? feishuChannels : [],
      selectedChannels: selectedChannelMap.get('feishu') || [],
    }),
  ]

  return {
    totalSelectedCount: selectedChannels.length,
    selectedChannels,
    platforms,
  }
}

/**
 * 新增或更新一条工作群选择：
 * - 以 `(company_id, platform, channel_id)` 做幂等 upsert；
 * - 每次写入同步刷新 channel_name / updated_at，避免展示过期名称。
 */
export async function upsertCompanyWorkgroupChannel(payload: {
  companyId: string
  platform: WorkgroupPlatformType
  channelId: string
  channelName: string | null
  supabase?: SupabaseClient
}): Promise<WorkgroupChannelRecord> {
  const supabase = payload.supabase || getSupabaseBrowserClient()

  const result = await supabase
    .schema('integration')
    .from('workgroup_channel')
    .upsert(
      {
        company_id: payload.companyId,
        platform: payload.platform,
        channel_id: payload.channelId,
        channel_name: payload.channelName,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'company_id,platform,channel_id',
      },
    )
    .select('id, company_id, platform, channel_id, channel_name, created_at, updated_at')
    .single<WorkgroupChannelRow>()

  if (result.error) {
    if (isMissingWorkgroupChannelTableError(result.error)) {
      throw createWorkgroupTableMissingError()
    }

    throw new Error(result.error.message || m.service_workgroup_save_failed())
  }

  const normalizedRow = normalizeWorkgroupChannelRow(result.data)

  if (!normalizedRow) {
    throw new Error(m.service_workgroup_save_incomplete())
  }

  return normalizedRow
}

/**
 * 删除一条工作群选择。
 */
export async function deleteCompanyWorkgroupChannel(payload: {
  companyId: string
  platform: WorkgroupPlatformType
  channelId: string
  supabase?: SupabaseClient
}): Promise<void> {
  const supabase = payload.supabase || getSupabaseBrowserClient()

  const result = await supabase
    .schema('integration')
    .from('workgroup_channel')
    .delete()
    .eq('company_id', payload.companyId)
    .eq('platform', payload.platform)
    .eq('channel_id', payload.channelId)

  if (result.error) {
    if (isMissingWorkgroupChannelTableError(result.error)) {
      throw createWorkgroupTableMissingError()
    }

    throw new Error(result.error.message || m.service_workgroup_delete_failed())
  }
}
