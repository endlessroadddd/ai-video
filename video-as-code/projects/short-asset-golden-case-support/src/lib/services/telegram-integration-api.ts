import { m } from '@/paraglide/messages'

export type TelegramWidgetAuthUser = {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export type TelegramIntegrationConfig = {
  enabled: boolean
  botUsername: string
  reason?: string
}

export type TelegramLoginSession = {
  sessionToken: string
  addBotUrl: string
  telegramUser: {
    id: number
    firstName: string
    lastName: string | null
    username: string | null
    photoUrl: string | null
  }
}

export type TelegramBindingIntent = {
  intentId: string
  intentToken: string
  status: 'pending' | 'fulfilled' | 'expired' | 'cancelled' | 'failed'
  expiresAt: string
  addBotUrl: string
}

export type TelegramBindingIntentStatus = {
  intentId: string
  status: 'pending' | 'fulfilled' | 'expired' | 'cancelled' | 'failed'
  expiresAt: string
  fulfilledChatId: string | null
  errorMessage: string | null
  boundChannel: TelegramBoundChannel | null
}

export type TelegramChatCandidate = {
  chatId: string
  name: string
  chatType: string
  username: string | null
  isPrivate: boolean
}

export type TelegramBoundChannel = {
  id: string
  chatId: string
  chatType: string
  name: string
  username: string | null
  isPrivate: boolean
  createdAt: string
}

type TelegramChatsResponse = {
  chats: TelegramChatCandidate[]
  channels: TelegramBoundChannel[]
  warning: string | null
}

type TelegramBoundChannelsResponse = {
  channels: TelegramBoundChannel[]
}

type TelegramBindChannelResponse = {
  boundChannel: {
    chatId: string
    name: string
    chatType: string
    username: string | null
    isPrivate: boolean
  }
  channels: TelegramBoundChannel[]
}

type ApiErrorResponse = {
  error?: string
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiErrorResponse

  if (!response.ok) {
    throw new Error(data.error || m.service_telegram_request_failed())
  }

  return data
}

/**
 * 获取 Telegram 集成基础配置：
 * - 用于判断当前环境是否可用；
 * - 返回 bot 用户名供前端渲染登录组件与加群按钮。
 */
export async function fetchTelegramIntegrationConfig(): Promise<TelegramIntegrationConfig> {
  const response = await fetch('/api/integrations/telegram/config', {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<TelegramIntegrationConfig>(response)
}

/**
 * 创建 Telegram 集成短期会话：
 * - 前端将 Telegram Widget 回传的数据发到服务端验签；
 * - 服务端返回后续拉群列表与绑定群需要的 session token。
 */
export async function createTelegramIntegrationSession(payload: {
  companyId: string
  telegramAuth: TelegramWidgetAuthUser
}): Promise<TelegramLoginSession> {
  const response = await fetch('/api/integrations/telegram/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<TelegramLoginSession>(response)
}

/**
 * 创建 Telegram 自动绑定意图：
 * - 生成一次性 startgroup token；
 * - 用于后端消费者自动把群关联到当前 company。
 */
export async function createTelegramBindingIntent(payload: {
  companyId: string
  sessionToken: string
}): Promise<TelegramBindingIntent> {
  const response = await fetch('/api/integrations/telegram/intents/create', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<TelegramBindingIntent>(response)
}

/**
 * 查询 Telegram 自动绑定意图状态：
 * - 前端轮询该接口，在 bot 入群后自动感知绑定完成。
 */
export async function fetchTelegramBindingIntentStatus(payload: {
  companyId: string
  sessionToken: string
  intentId: string
}): Promise<TelegramBindingIntentStatus> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
    session_token: payload.sessionToken,
    intent_id: payload.intentId,
  })

  const response = await fetch(`/api/integrations/telegram/intents/status?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<TelegramBindingIntentStatus>(response)
}

/**
 * 拉取 Telegram 候选群列表 + 当前公司已绑定群：
 * - 候选群来自 Bot API `getUpdates`；
 * - 已绑定列表来自 `telegram.channel`（company_id 过滤）。
 */
export async function fetchTelegramChatCandidates(payload: {
  companyId: string
  sessionToken: string
}): Promise<TelegramChatsResponse> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
    session_token: payload.sessionToken,
  })

  const response = await fetch(`/api/integrations/telegram/chats?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<TelegramChatsResponse>(response)
}

/**
 * 读取当前公司已绑定的 Telegram 频道：
 * - 仅依赖主站登录态 + 公司成员权限；
 * - 不依赖 Telegram session，适用于“未 Telegram 登录也能查看已绑定社区”。
 */
export async function fetchTelegramBoundChannels(payload: {
  companyId: string
}): Promise<TelegramBoundChannelsResponse> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
  })

  const response = await fetch(`/api/integrations/telegram/channels?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<TelegramBoundChannelsResponse>(response)
}

/**
 * 绑定指定群到当前公司：
 * - 服务端会再次校验 session token 与公司成员关系；
 * - 最终写入/更新 `telegram.channel` 的 `company_id` 关联。
 */
export async function bindTelegramChannel(payload: {
  companyId: string
  sessionToken: string
  chatId: string
}): Promise<TelegramBindChannelResponse> {
  const response = await fetch('/api/integrations/telegram/channels/bind', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<TelegramBindChannelResponse>(response)
}
