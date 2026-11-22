import { m } from '@/paraglide/messages'

export type DiscordTicketFormQuestion = {
  title: string
  required: boolean
  multiline: boolean
}

export type DiscordTicketDefaultConfig = {
  panelName: string | null
  panelChannelId: string | null
  categoryId: string | null
  closedCategoryId: string | null
  staffRoleIds: string[]
  panelMessageTemplate: string | null
  ticketMessageTemplate: string | null
  introMessageTemplate: string | null
  formQuestions: DiscordTicketFormQuestion[]
}

export type DiscordTicketPanelRecord = {
  id: string
  messageId: string
  channelId: string
  channelName: string
  categoryId: string | null
  categoryName: string | null
  closedCategoryId: string | null
  closedCategoryName: string | null
  panelName: string | null
  staffRoleIds: string[]
  panelMessageTemplate: string | null
  ticketMessageTemplate: string | null
  introMessageTemplate: string | null
  formQuestions: DiscordTicketFormQuestion[]
  updatedAt: string | null
}

export type DiscordTicketChannelOption = {
  id: string
  name: string
  channelType: number | null
  parentId: string | null
  parentName: string | null
}

export type DiscordTicketRoleOption = {
  id: string
  name: string
  mentionable: boolean
  position: number
}

export type DiscordTicketPanelsSnapshot = {
  guildId: string | null
  defaultConfig: DiscordTicketDefaultConfig
  panels: DiscordTicketPanelRecord[]
  publishChannels: DiscordTicketChannelOption[]
  categoryChannels: DiscordTicketChannelOption[]
  roleOptions: DiscordTicketRoleOption[]
}

export type PublishDiscordTicketPanelPayload = {
  companyId: string
  channelId: string
  panelName?: string | null
  categoryId?: string | null
  closedCategoryId?: string | null
  staffRoleIds: string[]
  panelMessageTemplate?: string | null
  ticketMessageTemplate?: string | null
  introMessageTemplate?: string | null
  formQuestions?: DiscordTicketFormQuestion[] | null
}

export type PublishDiscordTicketPanelResponse = {
  messageId: string
  channelId: string
}

type ApiErrorResponse = {
  error?: string
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiErrorResponse

  if (!response.ok) {
    throw new Error(data.error || m.service_discord_request_failed())
  }

  return data
}

/**
 * 读取 Discord ticket panel 快照：
 * - 一次拿到已发布 panel、频道、分类与角色选项；
 * - 减少前端自行拼装多份请求和映射逻辑。
 */
export async function fetchDiscordTicketPanelsSnapshot(payload: {
  companyId: string
}): Promise<DiscordTicketPanelsSnapshot> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
  })

  const response = await fetch(`/api/settings/discord/ticket-panels?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<DiscordTicketPanelsSnapshot>(response)
}

/**
 * 发布或更新 Discord ticket panel。
 */
export async function publishDiscordTicketPanel(
  payload: PublishDiscordTicketPanelPayload,
): Promise<PublishDiscordTicketPanelResponse> {
  const response = await fetch('/api/settings/discord/ticket-panels/publish', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<PublishDiscordTicketPanelResponse>(response)
}
