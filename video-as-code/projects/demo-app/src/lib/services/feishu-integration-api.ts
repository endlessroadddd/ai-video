import type { SupabaseClient } from '@supabase/supabase-js'

import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { m } from '@/paraglide/messages'

export type FeishuBotStatus = 'active' | 'disabled' | 'error' | 'pending' | 'connecting' | 'unknown'

export type FeishuBotRecord = {
  id: string
  companyId: string
  name: string
  appId: string
  tenantKey: string | null
  status: FeishuBotStatus
  isDefault: boolean
  configVersion: number
  lastVerifiedAt: string | null
  lastConnectedAt: string | null
  lastHeartbeatAt: string | null
  lastEventAt: string | null
  lastError: string | null
  createdAt: string | null
  updatedAt: string | null
}

export type FeishuBotsResponse = {
  bots: FeishuBotRecord[]
}

export type CreateFeishuBotPayload = {
  companyId: string
  name: string
  appId: string
  appSecret: string
  isDefault: boolean
}

export type UpdateFeishuBotPayload = {
  companyId: string
  botId: string
  name: string
  isDefault: boolean
  status: 'active' | 'disabled'
  appSecret?: string | null
}

export type FeishuBotActionPayload = {
  companyId: string
  botId: string
}

export type FeishuBotMutationResponse = {
  bot: FeishuBotRecord | null
  message: string | null
}

export type FeishuChannelRecord = {
  id: string
  companyId: string
  chatId: string
  chatType: string | null
  name: string
  ownerBotAppId: string | null
}

export type FeishuChannelsResponse = {
  channels: FeishuChannelRecord[]
}

type ApiErrorResponse = {
  error?: string
}

type FeishuChannelRow = {
  id?: string | null
  company_id?: string | null
  chat_id?: string | null
  chat_type?: string | null
  name?: string | null
  owner_bot_app_id?: string | null
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiErrorResponse

  if (!response.ok) {
    throw new Error(data.error || m.service_feishu_channels_read_failed())
  }

  return data
}

/**
 * 读取当前公司的飞书 Bot 列表。
 *
 * 说明：
 * - 走当前应用的服务端代理，避免浏览器暴露内部 API token；
 * - 由服务端统一做登录态、公司成员身份和 Owner/Admin 写权限控制。
 */
export async function fetchFeishuBots(payload: {
  companyId: string
}): Promise<FeishuBotsResponse> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
  })

  const response = await fetch(`/api/settings/feishu/bots?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<FeishuBotsResponse>(response)
}

/**
 * 新建飞书 Bot。
 */
export async function createFeishuBot(payload: CreateFeishuBotPayload): Promise<FeishuBotMutationResponse> {
  const response = await fetch('/api/settings/feishu/bots', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<FeishuBotMutationResponse>(response)
}

/**
 * 更新飞书 Bot 基础信息：
 * - 仅允许修改名称、默认状态、启停状态；
 * - `appSecret` 为可选字段，仅在轮换密钥时透传。
 */
export async function updateFeishuBot(payload: UpdateFeishuBotPayload): Promise<FeishuBotMutationResponse> {
  const response = await fetch(`/api/settings/feishu/bots/${encodeURIComponent(payload.botId)}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<FeishuBotMutationResponse>(response)
}

/**
 * 触发飞书 Bot 验证。
 */
export async function verifyFeishuBot(payload: FeishuBotActionPayload): Promise<FeishuBotMutationResponse> {
  const response = await fetch(`/api/settings/feishu/bots/${encodeURIComponent(payload.botId)}/verify`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      companyId: payload.companyId,
    }),
  })

  return parseApiResponse<FeishuBotMutationResponse>(response)
}

/**
 * 触发飞书 Bot 重启。
 */
export async function restartFeishuBot(payload: FeishuBotActionPayload): Promise<FeishuBotMutationResponse> {
  const response = await fetch(`/api/settings/feishu/bots/${encodeURIComponent(payload.botId)}/restart`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      companyId: payload.companyId,
    }),
  })

  return parseApiResponse<FeishuBotMutationResponse>(response)
}

/**
 * 将数据库返回的飞书频道行归一化为前端结构：
 * - `chat_id` 是工作群配置的唯一识别键；
 * - 名称缺失时回退到 `chat_id`，避免页面出现空白标题；
 * - 若关键字段缺失则直接丢弃，防止脏数据污染列表。
 */
function normalizeFeishuChannelRow(row: FeishuChannelRow): FeishuChannelRecord | null {
  const id: string = String(row.id || '').trim()
  const companyId: string = String(row.company_id || '').trim()
  const chatId: string = String(row.chat_id || '').trim()
  const channelName: string = String(row.name || '').trim() || chatId

  if (!id || !companyId || !chatId) {
    return null
  }

  return {
    id,
    companyId,
    chatId,
    chatType: row.chat_type?.trim() || null,
    name: channelName,
    ownerBotAppId: row.owner_bot_app_id?.trim() || null,
  }
}

/**
 * 读取当前公司已同步的飞书群：
 * - 直接读取 `feishu.channel`，与 event-settings 的数据来源保持一致；
 * - 当前不额外走服务端代理，前提是数据库 RLS 已允许当前成员读取所属公司数据；
 * - 返回值统一包一层 `channels`，便于与 Slack / Discord 的服务形态保持接近。
 */
export async function fetchFeishuChannels(payload: {
  companyId: string
  supabase?: SupabaseClient
}): Promise<FeishuChannelsResponse> {
  const supabase: SupabaseClient = payload.supabase || getSupabaseBrowserClient()

  const result = await supabase
    .schema('feishu')
    .from('channel')
    .select('id, company_id, chat_id, chat_type, name, owner_bot_app_id')
    .eq('company_id', payload.companyId)
    .order('name', { ascending: true })

  if (result.error) {
    throw new Error(result.error.message || m.service_feishu_channels_read_failed())
  }

  const channels: FeishuChannelRecord[] = ((result.data || []) as FeishuChannelRow[])
    .map(normalizeFeishuChannelRow)
    .filter((row): row is FeishuChannelRecord => Boolean(row))

  return {
    channels,
  }
}
