import { m } from '@/paraglide/messages'

export type SlackConnectionRecord = {
  companyId: string
  platform: 'slack'
  externalWorkspaceId: string
  externalWorkspaceName: string | null
  status: 'pending' | 'connected' | 'disconnected' | 'disabled'
}

export type SlackSyncSummary = {
  workspaceId: string
  channelsUpserted: number
}

export type SlackSyncResponse = {
  connection: SlackConnectionRecord | null
  syncSummary: SlackSyncSummary | null
  message: string | null
}

export type SlackChannelRecord = {
  id: string
  channelId: string
  name: string
  channelType: string | null
  isPrivate: boolean
}

export type SlackChannelsResponse = {
  channels: SlackChannelRecord[]
}

type InstallUrlResponse = {
  installUrl: string
}

type ApiErrorResponse = {
  error?: string
  connection?: SlackConnectionRecord | null
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiErrorResponse

  if (!response.ok) {
    throw new Error(data.error || m.service_slack_request_failed())
  }

  return data
}

/**
 * 生成 Slack 安装链接。
 */
export async function createSlackInstallUrl(payload: {
  companyId: string
}): Promise<InstallUrlResponse> {
  const response = await fetch('/api/settings/slack/install-url', {
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
 * 获取当前公司 Slack 连接状态。
 *
 * 说明：
 * - 复用 `/sync` 接口，`syncNow=false` 时仅返回状态，不触发回填。
 */
export async function fetchSlackIntegrationStatus(payload: {
  companyId: string
}): Promise<SlackSyncResponse> {
  const response = await fetch('/api/settings/slack/sync', {
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

  return parseApiResponse<SlackSyncResponse>(response)
}

/**
 * 手动触发 Slack 数据同步（workspace/channels）。
 */
export async function syncSlackIntegration(payload: {
  companyId: string
}): Promise<SlackSyncResponse> {
  const response = await fetch('/api/settings/slack/sync', {
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

  return parseApiResponse<SlackSyncResponse>(response)
}

/**
 * 获取当前公司 Slack 社区列表（channel）。
 */
export async function fetchSlackChannels(payload: {
  companyId: string
}): Promise<SlackChannelsResponse> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
  })

  const response = await fetch(`/api/settings/slack/channels?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<SlackChannelsResponse>(response)
}
