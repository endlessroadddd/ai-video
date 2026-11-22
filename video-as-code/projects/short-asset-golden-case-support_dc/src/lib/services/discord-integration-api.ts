import { m } from '@/paraglide/messages'

export type DiscordConnectionRecord = {
  companyId: string
  platform: 'discord'
  externalWorkspaceId: string | null
  externalWorkspaceName: string | null
  status: string | null
  updatedAt: string | null
}

export type DiscordSyncSummary = {
  serverId: string
  channelsUpserted: number
  rolesUpserted: number
}

export type DiscordSyncResponse = {
  connection: DiscordConnectionRecord | null
  syncSummary: DiscordSyncSummary | null
  message: string | null
}

export type DiscordChannelRecord = {
  id: string
  channelId: string
  guildId: string
  name: string
  channelType: number | null
  parentId: string | null
}

export type DiscordChannelsResponse = {
  channels: DiscordChannelRecord[]
}

type InstallUrlResponse = {
  installUrl: string
}

type ApiErrorResponse = {
  error?: string
  connection?: DiscordConnectionRecord | null
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiErrorResponse

  if (!response.ok) {
    throw new Error(data.error || m.service_discord_request_failed())
  }

  return data
}

/**
 * 生成 Discord 安装链接。
 */
export async function createDiscordInstallUrl(payload: {
  companyId: string
}): Promise<InstallUrlResponse> {
  const response = await fetch('/api/settings/discord/install-url', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<InstallUrlResponse>(response)
}

/**
 * 获取当前公司 Discord 连接状态。
 *
 * 说明：
 * - 复用 `/sync` 接口，`syncNow=false` 时仅返回状态，不触发回填。
 */
export async function fetchDiscordIntegrationStatus(payload: {
  companyId: string
}): Promise<DiscordSyncResponse> {
  const response = await fetch('/api/settings/discord/sync', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      companyId: payload.companyId,
      syncNow: false,
    }),
  })

  return parseApiResponse<DiscordSyncResponse>(response)
}

/**
 * 手动触发 Discord 数据同步（guild/channels/roles）。
 */
export async function syncDiscordIntegration(payload: {
  companyId: string
}): Promise<DiscordSyncResponse> {
  const response = await fetch('/api/settings/discord/sync', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      companyId: payload.companyId,
      syncNow: true,
    }),
  })

  return parseApiResponse<DiscordSyncResponse>(response)
}

/**
 * 获取当前公司 Discord 社区列表（channel）。
 */
export async function fetchDiscordChannels(payload: {
  companyId: string
}): Promise<DiscordChannelsResponse> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
  })

  const response = await fetch(`/api/settings/discord/channels?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<DiscordChannelsResponse>(response)
}
