import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

import {
  createSupabaseServerClientForRequest,
  createSupabaseServiceRoleClient,
} from '@/lib/supabase/server'

type TelegramWidgetAuthUser = {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

type TelegramIntegrationSessionPayload = {
  authUserId: string
  companyId: string
  telegramUserId: number
  iat: number
  exp: number
}

type TelegramBotApiSuccess<T> = {
  ok: true
  result: T
}

type TelegramBotApiFailure = {
  ok: false
  error_code?: number
  description?: string
}

type TelegramBotApiResponse<T> = TelegramBotApiSuccess<T> | TelegramBotApiFailure

type TelegramChat = {
  id: number
  type: string
  title?: string
  username?: string
  first_name?: string
  last_name?: string
}

type TelegramUpdate = {
  update_id?: number
  message?: {
    chat?: TelegramChat
    from?: {
      id?: number
    }
    text?: string
  }
  my_chat_member?: {
    chat?: TelegramChat
    from?: {
      id?: number
    }
  }
  chat_member?: {
    chat?: TelegramChat
    from?: {
      id?: number
    }
  }
  channel_post?: {
    chat?: TelegramChat
    from?: {
      id?: number
    }
    text?: string
  }
}

type TelegramChannelRow = {
  id: string
  company_id: string | null
  chat_id: string
  chat_type: string | null
  name: string | null
  username: string | null
  is_private: boolean | null
  created_at: string
}

type TelegramBindingIntentRow = {
  id: string
  company_id: string
  auth_user_id: string
  telegram_user_id: number
  intent_token: string
  status: 'pending' | 'fulfilled' | 'expired' | 'cancelled' | 'failed'
  expires_at: string
  fulfilled_chat_id: string | null
  error_message: string | null
}

type TelegramIntentFulfillmentCandidate = {
  chat: TelegramChat
}

type ApiError = {
  status: number
  message: string
}

type TelegramServerEnv = {
  botToken: string
  botUsername: string
  sessionSecret: string
}

/**
 * 从环境变量读取“正整数秒数”：
 * - 仅接受正整数，避免把非法字符串写进时间逻辑；
 * - 提供最小值/最大值保护，避免配置过大或过小导致安全或体验问题；
 * - 配置缺失时回退到默认值，保证线上行为稳定。
 */
function readPositiveSecondsEnv(
  envName: string,
  fallbackSeconds: number,
  limits: {
    minSeconds: number
    maxSeconds: number
  },
): number {
  const rawValue = process.env[envName]?.trim()
  if (!rawValue) {
    return fallbackSeconds
  }

  const parsedValue = Number.parseInt(rawValue, 10)
  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return fallbackSeconds
  }

  if (parsedValue < limits.minSeconds) {
    return limits.minSeconds
  }

  if (parsedValue > limits.maxSeconds) {
    return limits.maxSeconds
  }

  return parsedValue
}

/**
 * Telegram 登录时的 auth_date 新鲜度窗口（秒）：
 * - 官方登录回调天然偏短，默认 5 分钟；
 * - 允许通过环境变量适度调大，缓解弱网或慢操作导致的“登录已过期”。
 */
const TELEGRAM_LOGIN_MAX_AGE_SECONDS = readPositiveSecondsEnv('TELEGRAM_LOGIN_MAX_AGE_SECONDS', 300, {
  minSeconds: 60,
  maxSeconds: 3600,
})

/**
 * Telegram 集成会话有效期（秒）：
 * - 控制“登录后多久需要重新登录 Telegram”；
 * - 默认 30 分钟，可按业务流程调长。
 */
const TELEGRAM_SESSION_TTL_SECONDS = readPositiveSecondsEnv('TELEGRAM_SESSION_TTL_SECONDS', 30 * 60, {
  minSeconds: 5 * 60,
  maxSeconds: 24 * 60 * 60,
})

/**
 * Telegram 绑定意图有效期（秒）：
 * - 控制“加 bot 入群并完成自动绑定”的时间窗口；
 * - 与 session 分开配置，避免一刀切。
 */
const TELEGRAM_BINDING_INTENT_TTL_SECONDS = readPositiveSecondsEnv(
  'TELEGRAM_BINDING_INTENT_TTL_SECONDS',
  30 * 60,
  {
    minSeconds: 5 * 60,
    maxSeconds: 24 * 60 * 60,
  },
)

/**
 * 统一 JSON 响应：
 * - 所有 Telegram 集成接口都返回 JSON；
 * - 避免前端在不同分支处理不同内容类型。
 */
function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

function getTelegramServerEnvOrNull(): TelegramServerEnv | null {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim() || ''
  const botUsername = process.env.TELEGRAM_BOT_USERNAME?.trim() || 'lucius_client_bot'
  const sessionSecret =
    process.env.TELEGRAM_INTEGRATION_SECRET?.trim()
    || process.env.SUPABASE_SECRET_KEY?.trim()
    || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    || ''

  if (!botToken || !sessionSecret) {
    return null
  }

  return {
    botToken,
    botUsername,
    sessionSecret,
  }
}

function createApiError(status: number, message: string): ApiError {
  return {
    status,
    message,
  }
}

/**
 * Telegram 登录数据签名校验：
 * - 按官方规则构建 data_check_string；
 * - 用 `sha256(bot_token)` 作为 HMAC key；
 * - 使用 timing-safe 比较避免时序泄漏。
 */
function verifyTelegramWidgetAuthPayload(payload: TelegramWidgetAuthUser, botToken: string): boolean {
  const { hash, ...rest } = payload
  if (!hash) {
    return false
  }

  const entries = Object.entries(rest)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${String(value)}`)

  const dataCheckString = entries.join('\n')
  const secretKey = createHash('sha256').update(botToken).digest()
  const expectedHash = createHmac('sha256', secretKey).update(dataCheckString).digest('hex')

  const actualBuffer = Buffer.from(hash, 'hex')
  const expectedBuffer = Buffer.from(expectedHash, 'hex')

  if (actualBuffer.length !== expectedBuffer.length) {
    return false
  }

  return timingSafeEqual(actualBuffer, expectedBuffer)
}

function ensureFreshTelegramAuthDate(authDate: number): boolean {
  const now = Math.floor(Date.now() / 1000)
  return Math.abs(now - authDate) <= TELEGRAM_LOGIN_MAX_AGE_SECONDS
}

function encodeBase64Url(raw: string): string {
  return Buffer.from(raw, 'utf8').toString('base64url')
}

function decodeBase64Url(raw: string): string {
  return Buffer.from(raw, 'base64url').toString('utf8')
}

function signSessionPayload(encodedPayload: string, secret: string): string {
  return createHmac('sha256', secret).update(encodedPayload).digest('base64url')
}

/**
 * 生成短期会话 token：
 * - token 只用于“本次设置流程”；
 * - 不替代主站登录态，过期后必须重新 Telegram 登录。
 */
function createTelegramSessionToken(payload: TelegramIntegrationSessionPayload, secret: string): string {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload))
  const signature = signSessionPayload(encodedPayload, secret)
  return `${encodedPayload}.${signature}`
}

function verifyTelegramSessionToken(
  token: string,
  secret: string,
): TelegramIntegrationSessionPayload | null {
  const separatorIndex = token.lastIndexOf('.')
  if (separatorIndex <= 0) {
    return null
  }

  const encodedPayload = token.slice(0, separatorIndex)
  const signature = token.slice(separatorIndex + 1)

  const expectedSignature = signSessionPayload(encodedPayload, secret)
  const signatureBuffer = Buffer.from(signature, 'utf8')
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8')

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null
  }

  try {
    const parsedPayload = JSON.parse(decodeBase64Url(encodedPayload)) as TelegramIntegrationSessionPayload
    const now = Math.floor(Date.now() / 1000)

    if (!parsedPayload || parsedPayload.exp <= now) {
      return null
    }

    return parsedPayload
  } catch {
    return null
  }
}

async function parseRequestJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T
  } catch {
    throw createApiError(400, '请求体必须是合法的 JSON。')
  }
}

/**
 * 校验当前请求是否属于指定公司的成员：
 * - 防止用户越权把 Telegram 群误绑到其他公司；
 * - 所有写入 `telegram.channel` 的接口都必须先过这一层。
 */
async function requireCompanyMember(
  request: Request,
  companyId: string,
): Promise<{
  authUserId: string
}> {
  if (!isUuid(companyId)) {
    throw createApiError(400, '无效的 company_id。')
  }

  const supabase = createSupabaseServerClientForRequest(request, new Headers())
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user?.id) {
    throw createApiError(401, '未登录或会话已过期，请重新登录。')
  }

  const serviceClient = createSupabaseServiceRoleClient()
  const membershipResult = await serviceClient
    .schema('permission')
    .from('organization_member')
    .select('id')
    .eq('company_id', companyId)
    .eq('user_id', user.id)
    .eq('status', 'active')
    .maybeSingle<{ id: string }>()

  if (membershipResult.error) {
    throw createApiError(500, `读取公司成员关系失败：${membershipResult.error.message}`)
  }

  if (!membershipResult.data) {
    throw createApiError(403, '你不是当前公司成员，无法绑定 Telegram 群。')
  }

  return {
    authUserId: user.id,
  }
}

async function callTelegramBotApi<T>(
  env: TelegramServerEnv,
  method: string,
  payload: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`https://api.telegram.org/bot${env.botToken}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as TelegramBotApiResponse<T>

  if (!response.ok || !data.ok) {
    const description = !data.ok ? data.description : '未知错误'
    throw new Error(`Telegram API ${method} 调用失败：${description || '未知错误'}`)
  }

  return data.result
}

function normalizeChatName(chat: TelegramChat): string {
  if (chat.title?.trim()) {
    return chat.title.trim()
  }

  const privateName = `${chat.first_name || ''} ${chat.last_name || ''}`.trim()
  if (privateName) {
    return privateName
  }

  return `chat:${chat.id}`
}

function mapChatToChannelPayload(chat: TelegramChat): {
  chat_id: string
  chat_type: string
  name: string
  username: string | null
  is_private: boolean
  raw: TelegramChat
} {
  return {
    chat_id: String(chat.id),
    chat_type: chat.type || 'unknown',
    name: normalizeChatName(chat),
    username: chat.username || null,
    is_private: chat.type === 'private',
    raw: chat,
  }
}

function mapChannelRow(row: TelegramChannelRow): {
  id: string
  chatId: string
  chatType: string
  name: string
  username: string | null
  isPrivate: boolean
  createdAt: string
} {
  return {
    id: row.id,
    chatId: row.chat_id,
    chatType: row.chat_type || 'unknown',
    name: row.name || row.chat_id,
    username: row.username,
    isPrivate: Boolean(row.is_private),
    createdAt: row.created_at,
  }
}

function createIntentToken(): string {
  return randomBytes(24).toString('base64url')
}

function normalizeIntentStatusByExpiry(status: TelegramBindingIntentRow['status'], expiresAt: string): TelegramBindingIntentRow['status'] {
  if (status !== 'pending') {
    return status
  }

  const expiresAtMs = Date.parse(expiresAt)
  if (Number.isNaN(expiresAtMs)) {
    return status
  }

  return Date.now() > expiresAtMs ? 'expired' : status
}

/**
 * 创建新 intent 前，先取消同一 Telegram 用户名下的旧 pending intent：
 * - worker 在处理 `my_chat_member/chat_member` 兜底匹配时，要求“同一 Telegram 用户只有 1 条 pending intent”；
 * - 若旧 pending intent 不回收，用户多点几次“添加社区”后，worker 会因歧义直接拒绝自动绑定；
 * - 这里按 `auth_user_id + telegram_user_id + pending` 统一收口，保证最新一次安装动作拥有唯一有效 intent。
 */
async function cancelPendingBindingIntentsForTelegramUser(params: {
  serviceClient: ReturnType<typeof createSupabaseServiceRoleClient>
  authUserId: string
  telegramUserId: number
}): Promise<void> {
  const updateResult = await params.serviceClient
    .schema('telegram')
    .from('binding_intent')
    .update({
      status: 'cancelled',
      error_message: '已被新的 Telegram 绑定请求替换。',
    })
    .eq('auth_user_id', params.authUserId)
    .eq('telegram_user_id', params.telegramUserId)
    .eq('status', 'pending')

  if (updateResult.error) {
    throw createApiError(500, `清理历史 Telegram 绑定意图失败：${updateResult.error.message}`)
  }
}

/**
 * 从 Telegram 文本中解析 start 命令携带的 payload：
 * - 兼容 `/start <payload>` 与 `/start@bot_name <payload>` 两种形式；
 * - payload 仅允许 URL-safe 字符，避免误解析普通文本。
 */
function extractStartPayload(text: string | undefined): string | null {
  if (!text) {
    return null
  }

  const normalizedText = text.trim()
  if (!normalizedText) {
    return null
  }

  const commandMatch = normalizedText.match(/^\/start(?:@\w+)?\s+([A-Za-z0-9_-]+)$/)
  if (!commandMatch?.[1]) {
    return null
  }

  return commandMatch[1]
}

function isGroupLikeChat(chat: TelegramChat | undefined): chat is TelegramChat {
  if (!chat) {
    return false
  }

  return ['group', 'supergroup', 'channel'].includes(chat.type || '')
}

/**
 * 校验既有 channel 的公司归属是否允许本次绑定：
 * - `chat_id` 是 Telegram 全局唯一资源，不能被不同租户互相抢占；
 * - 当已存在归属且与当前公司不一致时，必须直接拒绝并返回 409；
 * - 当归属为空（历史脏数据/未认领）或归属一致时，允许继续。
 */
function assertChannelOwnershipForUpsert(existingCompanyId: string | null, targetCompanyId: string): void {
  if (!existingCompanyId) {
    return
  }

  if (existingCompanyId !== targetCompanyId) {
    throw createApiError(409, '该 Telegram 群已绑定到其他公司，无法重复绑定。')
  }
}

/**
 * 只提取“由当前 Telegram 登录用户触发”的群聊候选：
 * - `getUpdates` 是 bot 级共享更新流，天然包含其他用户/其他公司的事件；
 * - 如果不按 `telegramUserId` 过滤，会把其他租户的群/频道元数据带给当前请求；
 * - 这里只接受当前用户触发的 message / my_chat_member / chat_member 事件。
 */
function collectChatsFromUpdateForTelegramUser(update: TelegramUpdate, telegramUserId: number): TelegramChat[] {
  const chats: TelegramChat[] = []

  const appendIfOwnedByTelegramUser = (chat: TelegramChat | undefined, actorTelegramUserId: number | undefined): void => {
    if (!chat || actorTelegramUserId !== telegramUserId) {
      return
    }

    if (!isGroupLikeChat(chat)) {
      return
    }

    chats.push(chat)
  }

  appendIfOwnedByTelegramUser(update.message?.chat, update.message?.from?.id)
  appendIfOwnedByTelegramUser(update.my_chat_member?.chat, update.my_chat_member?.from?.id)
  appendIfOwnedByTelegramUser(update.chat_member?.chat, update.chat_member?.from?.id)

  return chats
}

/**
 * 从更新流中寻找“可用于自动绑定”的候选群：
 * - 首选 `/start <intent_token>` 命令（最精确）；
 * - 兼容 `my_chat_member/chat_member` 事件作为兜底（用户把 bot 拉群后未发命令）。
 */
function findIntentFulfillmentCandidate(
  updates: TelegramUpdate[],
  intent: TelegramBindingIntentRow,
): TelegramIntentFulfillmentCandidate | null {
  for (const update of updates) {
    const messageChat = update.message?.chat
    const messageFromId = update.message?.from?.id
    const messageToken = extractStartPayload(update.message?.text)

    if (
      isGroupLikeChat(messageChat) &&
      messageFromId === intent.telegram_user_id &&
      messageToken === intent.intent_token
    ) {
      return {
        chat: messageChat,
      }
    }
  }

  for (const update of updates) {
    const memberChat = update.my_chat_member?.chat || update.chat_member?.chat
    const memberFromId = update.my_chat_member?.from?.id || update.chat_member?.from?.id

    if (isGroupLikeChat(memberChat) && memberFromId === intent.telegram_user_id) {
      return {
        chat: memberChat,
      }
    }
  }

  return null
}

/**
 * 尝试把 pending intent 自动推进到 fulfilled：
 * - 从 Telegram updates 中匹配当前用户的目标群；
 * - 命中后写入/更新 `telegram.channel.company_id`；
 * - 再把 `binding_intent` 标记为 fulfilled。
 */
async function tryFulfillBindingIntentByTelegramUpdates(params: {
  env: TelegramServerEnv
  intent: TelegramBindingIntentRow
}): Promise<TelegramBindingIntentRow> {
  const { env, intent } = params

  let updates: TelegramUpdate[] = []
  try {
    updates = await callTelegramBotApi<TelegramUpdate[]>(env, 'getUpdates', {
      limit: 100,
      timeout: 0,
      allowed_updates: ['message', 'my_chat_member', 'chat_member'],
    })
  } catch (error) {
    /**
     * Telegram Bot API 限制同一 token 仅允许一个 getUpdates 轮询消费者：
     * - 当外部 worker 已在轮询时，这里会收到 Conflict；
     * - 为避免前端状态轮询报 500，降级为“保持 pending，等待外部 worker 完成绑定”。
     */
    const message = error instanceof Error ? error.message : ''
    if (message.includes('Conflict: terminated by other getUpdates request')) {
      return intent
    }

    throw error
  }

  const candidate = findIntentFulfillmentCandidate(updates, intent)
  if (!candidate) {
    return intent
  }

  const boundChannel = await upsertTelegramChannelByChatPayload({
    companyId: intent.company_id,
    chat: candidate.chat,
  })

  const serviceClient = createSupabaseServiceRoleClient()
  const updateResult = await serviceClient
    .schema('telegram')
    .from('binding_intent')
    .update({
      status: 'fulfilled',
      fulfilled_chat_id: boundChannel.chatId,
      error_message: null,
    })
    .eq('id', intent.id)
    .select('id, company_id, auth_user_id, telegram_user_id, intent_token, status, expires_at, fulfilled_chat_id, error_message')
    .single<TelegramBindingIntentRow>()

  if (updateResult.error) {
    throw createApiError(500, `更新 Telegram 绑定意图状态失败：${updateResult.error.message}`)
  }

  return updateResult.data
}

async function upsertTelegramChannelByChatPayload(payload: {
  companyId: string
  chat: TelegramChat
}): Promise<{
  chatId: string
  name: string
  chatType: string
  username: string | null
  isPrivate: boolean
}> {
  const channelPayload = mapChatToChannelPayload(payload.chat)
  const serviceClient = createSupabaseServiceRoleClient()

  const existingResult = await serviceClient
    .schema('telegram')
    .from('channel')
    .select('id, company_id')
    .eq('chat_id', channelPayload.chat_id)
    .maybeSingle<{ id: string; company_id: string | null }>()

  if (existingResult.error) {
    throw createApiError(500, `读取 Telegram channel 失败：${existingResult.error.message}`)
  }

  if (existingResult.data?.id) {
    assertChannelOwnershipForUpsert(existingResult.data.company_id, payload.companyId)

    const updatePayload: {
      company_id?: string
      chat_type: string
      name: string
      username: string | null
      is_private: boolean
      raw: TelegramChat
    } = {
      chat_type: channelPayload.chat_type,
      name: channelPayload.name,
      username: channelPayload.username,
      is_private: channelPayload.is_private,
      raw: channelPayload.raw,
    }

    /**
     * 仅在历史记录未归属任何公司时执行“认领”；
     * 已归属记录不会被覆盖为别的 company_id。
     */
    if (!existingResult.data.company_id) {
      updatePayload.company_id = payload.companyId
    }

    const updateResult = await serviceClient
      .schema('telegram')
      .from('channel')
      .update(updatePayload)
      .eq('id', existingResult.data.id)

    if (updateResult.error) {
      throw createApiError(500, `更新 Telegram channel 失败：${updateResult.error.message}`)
    }
  } else {
    const insertResult = await serviceClient.schema('telegram').from('channel').insert({
      company_id: payload.companyId,
      chat_id: channelPayload.chat_id,
      chat_type: channelPayload.chat_type,
      name: channelPayload.name,
      username: channelPayload.username,
      is_private: channelPayload.is_private,
      raw: channelPayload.raw,
    })

    if (insertResult.error) {
      throw createApiError(500, `写入 Telegram channel 失败：${insertResult.error.message}`)
    }
  }

  return {
    chatId: channelPayload.chat_id,
    name: channelPayload.name,
    chatType: channelPayload.chat_type,
    username: channelPayload.username,
    isPrivate: channelPayload.is_private,
  }
}

async function handleGetConfig(): Promise<Response> {
  const env = getTelegramServerEnvOrNull()

  if (!env) {
    return jsonResponse({
      enabled: false,
      botUsername: 'lucius_client_bot',
      reason: '缺少 TELEGRAM_BOT_TOKEN 或 TELEGRAM_INTEGRATION_SECRET 配置。',
    })
  }

  return jsonResponse({
    enabled: true,
    botUsername: env.botUsername,
  })
}

async function handleCreateSession(request: Request): Promise<Response> {
  const env = getTelegramServerEnvOrNull()
  if (!env) {
    throw createApiError(503, '服务端未配置 Telegram 集成环境变量。')
  }

  const body = await parseRequestJson<{
    companyId?: string
    telegramAuth?: TelegramWidgetAuthUser
  }>(request)

  const companyId = body.companyId?.trim() || ''
  const telegramAuth = body.telegramAuth

  if (!companyId || !telegramAuth) {
    throw createApiError(400, '缺少 companyId 或 telegramAuth。')
  }

  const { authUserId } = await requireCompanyMember(request, companyId)

  if (!verifyTelegramWidgetAuthPayload(telegramAuth, env.botToken)) {
    throw createApiError(401, 'Telegram 登录签名校验失败，请重试。')
  }

  if (!ensureFreshTelegramAuthDate(telegramAuth.auth_date)) {
    throw createApiError(401, 'Telegram 登录信息已过期，请重新登录。')
  }

  const now = Math.floor(Date.now() / 1000)
  const sessionToken = createTelegramSessionToken(
    {
      authUserId,
      companyId,
      telegramUserId: telegramAuth.id,
      iat: now,
      exp: now + TELEGRAM_SESSION_TTL_SECONDS,
    },
    env.sessionSecret,
  )

  return jsonResponse({
    sessionToken,
    addBotUrl: `https://t.me/${env.botUsername}?startgroup=lucius_connect`,
    telegramUser: {
      id: telegramAuth.id,
      firstName: telegramAuth.first_name,
      lastName: telegramAuth.last_name || null,
      username: telegramAuth.username || null,
      photoUrl: telegramAuth.photo_url || null,
    },
  })
}

async function handleCreateBindingIntent(request: Request): Promise<Response> {
  const env = getTelegramServerEnvOrNull()
  if (!env) {
    throw createApiError(503, '服务端未配置 Telegram 集成环境变量。')
  }

  const body = await parseRequestJson<{
    companyId?: string
    sessionToken?: string
  }>(request)

  const companyId = body.companyId?.trim() || ''
  const sessionToken = body.sessionToken?.trim() || ''

  if (!companyId || !sessionToken) {
    throw createApiError(400, 'companyId / sessionToken 不能为空。')
  }

  const { authUserId } = await requireCompanyMember(request, companyId)
  const tokenPayload = verifyTelegramSessionToken(sessionToken, env.sessionSecret)

  if (!tokenPayload) {
    throw createApiError(401, 'Telegram 集成会话已过期，请重新登录 Telegram。')
  }

  if (tokenPayload.authUserId !== authUserId || tokenPayload.companyId !== companyId) {
    throw createApiError(403, 'Telegram 集成会话不属于当前用户或公司。')
  }

  const serviceClient = createSupabaseServiceRoleClient()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + TELEGRAM_BINDING_INTENT_TTL_SECONDS * 1000)
  const intentToken = createIntentToken()

  await cancelPendingBindingIntentsForTelegramUser({
    serviceClient,
    authUserId,
    telegramUserId: tokenPayload.telegramUserId,
  })

  const upsertResult = await serviceClient
    .schema('telegram')
    .from('binding_intent')
    .insert({
      company_id: companyId,
      auth_user_id: authUserId,
      telegram_user_id: tokenPayload.telegramUserId,
      intent_token: intentToken,
      status: 'pending',
      expires_at: expiresAt.toISOString(),
    })
    .select('id, company_id, auth_user_id, telegram_user_id, intent_token, status, expires_at, fulfilled_chat_id, error_message')
    .single<TelegramBindingIntentRow>()

  if (upsertResult.error) {
    throw createApiError(500, `创建 Telegram 绑定意图失败：${upsertResult.error.message}`)
  }

  const intent = upsertResult.data
  return jsonResponse({
    intentId: intent.id,
    intentToken: intent.intent_token,
    status: intent.status,
    expiresAt: intent.expires_at,
    addBotUrl: `https://t.me/${env.botUsername}?startgroup=${intent.intent_token}`,
  })
}

async function handleGetBindingIntentStatus(request: Request): Promise<Response> {
  const env = getTelegramServerEnvOrNull()
  if (!env) {
    throw createApiError(503, '服务端未配置 Telegram 集成环境变量。')
  }

  const requestUrl = new URL(request.url)
  const companyId = requestUrl.searchParams.get('company_id')?.trim() || ''
  const intentId = requestUrl.searchParams.get('intent_id')?.trim() || ''
  const sessionToken = requestUrl.searchParams.get('session_token')?.trim() || ''

  if (!companyId || !intentId || !sessionToken) {
    throw createApiError(400, 'company_id / intent_id / session_token 不能为空。')
  }

  const { authUserId } = await requireCompanyMember(request, companyId)
  const tokenPayload = verifyTelegramSessionToken(sessionToken, env.sessionSecret)

  if (!tokenPayload) {
    throw createApiError(401, 'Telegram 集成会话已过期，请重新登录 Telegram。')
  }

  if (tokenPayload.authUserId !== authUserId || tokenPayload.companyId !== companyId) {
    throw createApiError(403, 'Telegram 集成会话不属于当前用户或公司。')
  }

  const serviceClient = createSupabaseServiceRoleClient()
  const intentResult = await serviceClient
    .schema('telegram')
    .from('binding_intent')
    .select('id, company_id, auth_user_id, telegram_user_id, intent_token, status, expires_at, fulfilled_chat_id, error_message')
    .eq('id', intentId)
    .eq('company_id', companyId)
    .eq('auth_user_id', authUserId)
    .maybeSingle<TelegramBindingIntentRow>()

  if (intentResult.error) {
    throw createApiError(500, `读取 Telegram 绑定意图失败：${intentResult.error.message}`)
  }

  if (!intentResult.data) {
    throw createApiError(404, '未找到对应的 Telegram 绑定意图。')
  }

  let intentData = intentResult.data
  const normalizedStatusBeforeFulfill = normalizeIntentStatusByExpiry(intentData.status, intentData.expires_at)

  if (normalizedStatusBeforeFulfill === 'expired' && intentData.status === 'pending') {
    await serviceClient
      .schema('telegram')
      .from('binding_intent')
      .update({ status: 'expired', error_message: '绑定意图超时未完成。' })
      .eq('id', intentData.id)

    intentData = {
      ...intentData,
      status: 'expired',
      error_message: '绑定意图超时未完成。',
    }
  } else if (normalizedStatusBeforeFulfill === 'pending') {
    intentData = await tryFulfillBindingIntentByTelegramUpdates({
      env,
      intent: intentData,
    })
  }

  let boundChannel: ReturnType<typeof mapChannelRow> | null = null
  if (intentData.fulfilled_chat_id) {
    const channelResult = await serviceClient
      .schema('telegram')
      .from('channel')
      .select('id, company_id, chat_id, chat_type, name, username, is_private, created_at')
      .eq('company_id', companyId)
      .eq('chat_id', intentData.fulfilled_chat_id)
      .maybeSingle<TelegramChannelRow>()

    if (!channelResult.error && channelResult.data) {
      boundChannel = mapChannelRow(channelResult.data)
    }
  }

  const normalizedStatus = normalizeIntentStatusByExpiry(intentData.status, intentData.expires_at)

  return jsonResponse({
    intentId: intentData.id,
    status: normalizedStatus,
    expiresAt: intentData.expires_at,
    fulfilledChatId: intentData.fulfilled_chat_id,
    errorMessage: intentData.error_message,
    boundChannel,
  })
}

/**
 * 读取当前公司已绑定 Telegram 频道：
 * - 仅校验主站登录态和公司成员关系；
 * - 不依赖 Telegram 短期会话，支持“未 Telegram 登录也可查看绑定结果”。
 */
async function handleGetBoundChannels(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const companyId = requestUrl.searchParams.get('company_id')?.trim() || ''

  if (!companyId) {
    throw createApiError(400, '缺少 company_id。')
  }

  await requireCompanyMember(request, companyId)

  const serviceClient = createSupabaseServiceRoleClient()
  const channelResult = await serviceClient
    .schema('telegram')
    .from('channel')
    .select('id, company_id, chat_id, chat_type, name, username, is_private, created_at')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (channelResult.error) {
    throw createApiError(500, `读取已绑定 Telegram 群失败：${channelResult.error.message}`)
  }

  return jsonResponse({
    channels: ((channelResult.data || []) as TelegramChannelRow[]).map(mapChannelRow),
  })
}

async function handleGetChats(request: Request): Promise<Response> {
  const env = getTelegramServerEnvOrNull()
  if (!env) {
    throw createApiError(503, '服务端未配置 Telegram 集成环境变量。')
  }

  const requestUrl = new URL(request.url)
  const companyId = requestUrl.searchParams.get('company_id')?.trim() || ''
  const sessionToken = requestUrl.searchParams.get('session_token')?.trim() || ''

  if (!companyId || !sessionToken) {
    throw createApiError(400, '缺少 company_id 或 session_token。')
  }

  const { authUserId } = await requireCompanyMember(request, companyId)
  const tokenPayload = verifyTelegramSessionToken(sessionToken, env.sessionSecret)

  if (!tokenPayload) {
    throw createApiError(401, 'Telegram 集成会话已过期，请重新登录 Telegram。')
  }

  if (tokenPayload.authUserId !== authUserId || tokenPayload.companyId !== companyId) {
    throw createApiError(403, 'Telegram 集成会话不属于当前用户或公司。')
  }

  const serviceClient = createSupabaseServiceRoleClient()
  const channelResult = await serviceClient
    .schema('telegram')
    .from('channel')
    .select('id, company_id, chat_id, chat_type, name, username, is_private, created_at')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (channelResult.error) {
    throw createApiError(500, `读取已绑定 Telegram 群失败：${channelResult.error.message}`)
  }

  const existingChannels = (channelResult.data || []) as TelegramChannelRow[]

  let updates: TelegramUpdate[] = []
  let warning: string | null = null

  try {
    updates = await callTelegramBotApi<TelegramUpdate[]>(env, 'getUpdates', {
      limit: 100,
      timeout: 0,
      allowed_updates: ['message', 'my_chat_member', 'chat_member'],
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : '读取 Telegram 群列表失败'
    if (message.includes('Conflict: terminated by other getUpdates request')) {
      /**
       * 当独立 worker 已在消费 getUpdates 时：
       * - Web 侧静默降级，不再提示用户该冲突；
       * - 继续返回当前公司已绑定频道列表。
       */
      warning = null
    } else {
      warning = `${message}。候选群可能暂不可用，请稍后刷新重试。`
    }
  }

  const chatMap = new Map<string, ReturnType<typeof mapChatToChannelPayload>>()

  existingChannels.forEach((channel) => {
    chatMap.set(channel.chat_id, {
      chat_id: channel.chat_id,
      chat_type: channel.chat_type || 'unknown',
      name: channel.name || channel.chat_id,
      username: channel.username,
      is_private: Boolean(channel.is_private),
      raw: {
        id: Number(channel.chat_id) || 0,
        type: channel.chat_type || 'unknown',
        title: channel.name || undefined,
        username: channel.username || undefined,
      },
    })
  })

  updates.forEach((update) => {
    const userOwnedChats = collectChatsFromUpdateForTelegramUser(update, tokenPayload.telegramUserId)

    userOwnedChats.forEach((chat) => {
      const chatPayload = mapChatToChannelPayload(chat)
      chatMap.set(chatPayload.chat_id, chatPayload)
    })
  })

  const chats = Array.from(chatMap.values()).map((chat) => ({
    chatId: chat.chat_id,
    name: chat.name,
    chatType: chat.chat_type,
    username: chat.username,
    isPrivate: chat.is_private,
  }))

  return jsonResponse({
    chats,
    channels: existingChannels.map(mapChannelRow),
    warning,
  })
}

async function handleBindChannel(request: Request): Promise<Response> {
  const env = getTelegramServerEnvOrNull()
  if (!env) {
    throw createApiError(503, '服务端未配置 Telegram 集成环境变量。')
  }

  const body = await parseRequestJson<{
    companyId?: string
    sessionToken?: string
    chatId?: string
  }>(request)

  const companyId = body.companyId?.trim() || ''
  const sessionToken = body.sessionToken?.trim() || ''
  const chatId = body.chatId?.trim() || ''

  if (!companyId || !sessionToken || !chatId) {
    throw createApiError(400, 'companyId / sessionToken / chatId 不能为空。')
  }

  const { authUserId } = await requireCompanyMember(request, companyId)
  const tokenPayload = verifyTelegramSessionToken(sessionToken, env.sessionSecret)

  if (!tokenPayload) {
    throw createApiError(401, 'Telegram 集成会话已过期，请重新登录 Telegram。')
  }

  if (tokenPayload.authUserId !== authUserId || tokenPayload.companyId !== companyId) {
    throw createApiError(403, 'Telegram 集成会话不属于当前用户或公司。')
  }

  const chat = await callTelegramBotApi<TelegramChat>(env, 'getChat', { chat_id: chatId })
  const boundChannel = await upsertTelegramChannelByChatPayload({
    companyId,
    chat,
  })

  const serviceClient = createSupabaseServiceRoleClient()

  const channelsResult = await serviceClient
    .schema('telegram')
    .from('channel')
    .select('id, company_id, chat_id, chat_type, name, username, is_private, created_at')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (channelsResult.error) {
    throw createApiError(500, `读取最新 Telegram channel 列表失败：${channelsResult.error.message}`)
  }

  return jsonResponse({
    boundChannel,
    channels: ((channelsResult.data || []) as TelegramChannelRow[]).map(mapChannelRow),
  })
}

export async function handleTelegramIntegrationApi(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const pathname = requestUrl.pathname
  const method = request.method.toUpperCase()

  try {
    if (pathname === '/api/integrations/telegram/config' && method === 'GET') {
      return await handleGetConfig()
    }

    if (pathname === '/api/integrations/telegram/login' && method === 'POST') {
      return await handleCreateSession(request)
    }

    if (pathname === '/api/integrations/telegram/channels' && method === 'GET') {
      return await handleGetBoundChannels(request)
    }

    if (pathname === '/api/integrations/telegram/chats' && method === 'GET') {
      return await handleGetChats(request)
    }

    if (pathname === '/api/integrations/telegram/channels/bind' && method === 'POST') {
      return await handleBindChannel(request)
    }

    if (pathname === '/api/integrations/telegram/intents/create' && method === 'POST') {
      return await handleCreateBindingIntent(request)
    }

    if (pathname === '/api/integrations/telegram/intents/status' && method === 'GET') {
      return await handleGetBindingIntentStatus(request)
    }

    return jsonResponse(
      {
        error: '未找到 Telegram 集成 API 路径。',
      },
      404,
    )
  } catch (error) {
    if (typeof error === 'object' && error && 'status' in error && 'message' in error) {
      const apiError = error as ApiError
      return jsonResponse({ error: apiError.message }, apiError.status)
    }

    const message = error instanceof Error ? error.message : '处理 Telegram 集成请求时出现未知错误。'
    return jsonResponse({ error: message }, 500)
  }
}

/**
 * 仅用于单元测试的内部导出：
 * - 暴露最小必要 helper，验证关键安全过滤逻辑；
 * - 避免测试通过 HTTP 层和外部依赖做复杂桩实现，提升可维护性。
 */
export const __telegramIntegrationApiTestables = {
  collectChatsFromUpdateForTelegramUser,
  assertChannelOwnershipForUpsert,
}
