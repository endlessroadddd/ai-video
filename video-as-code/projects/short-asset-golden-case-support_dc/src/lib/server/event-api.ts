import { createSupabaseServerClientForRequest, createSupabaseServiceRoleClient } from '@/lib/supabase/server'

type ApiError = {
  status: number
  message: string
}

type EventPlatformApiEnv = {
  platformApiBaseUrl: string
  botBaseUrl: string | null
  internalApiToken: string | null
}

type AuthenticatedUser = {
  id: string
  email: string | null
}

type OrganizationMemberRow = {
  id: string
  company_id: string
  user_id: string
  status: 'active' | 'inactive'
}

type SupportedEventPlatform = 'discord' | 'telegram' | 'slack' | 'feishu'
type SupportedAdoptedKnowledgePlatform = SupportedEventPlatform | 'website'

type GetEventAdoptedKnowledgeBody = {
  companyId?: string
  platform?: string
  channelId?: string | null
  messageIds?: string[]
}

type EventActionBody = {
  companyId?: string
}

type EventSuggestedReplyReviewDecision = 'confirm' | 'reject'

type EventReviewSuggestedReplyBody = EventActionBody & {
  decision?: EventSuggestedReplyReviewDecision | null
  content?: string | null
}

type EventSendMessageBody = EventActionBody & {
  content?: string | null
}

type EventSupplementalKnowledgeBody = {
  companyId?: string
  clientSupplementalKnowledge?: string | null
}

type AgentMessageRow = {
  message_id?: string | null
  created_at?: string | null
  adopted_knowledge_items?: unknown
}

type CompanyUserProfileRow = {
  display_name: string | null
  avatar_url: string | null
}

type EventOwnerProfile = {
  userId: string
  displayName: string
  avatarUrl: string | null
}

type EventUpdatePayload = {
  owner_user_id?: string
  owner_display_name?: string
  owner_avatar_url?: string | null
  manual_review_required?: boolean
  manual_review_status?: 'pending' | 'confirmed' | 'rejected' | 'not_required' | null
  suggested_reply?: string | null
  client_supplemental_knowledge?: string | null
  status?: 'pending' | 'processing' | 'resolved' | 'ignored'
  last_activity_at?: string
  message_ids?: string[]
}

type AssistTaskEventDetailRow = {
  id: string
  company_id: string
  user_id: string | null
  platform: string
  channel_id: string
  status: string | null
  manual_review_status: string | null
  suggested_reply: string | null
  context: unknown
  message_ids: string[]
}

type AssistTaskEventMessageRole =
  | 'user'
  | 'assistant'
  | 'staff'
  | 'bot'
  | 'lucius'
  | 'admin'
  | 'unknown'

type AssistTaskReplyMessageTarget = {
  messageId: string
  threadId: string | null
  sentAt: string | null
  order: number
  role: AssistTaskEventMessageRole
}

type SendMessageParseMode = 'HTML'

type ConfirmReplySendTarget = {
  provider: SupportedEventPlatform
  to: string
  messageThreadId: string | null
  content: string
  parseMode: SendMessageParseMode | null
  requestId: string
}

type BotInteractionSendResponse = {
  ok?: boolean
  error?: string
  errorCode?: string
  messageId?: string | null
  message_id?: string | null
  provider?: string | null
  channelId?: string | null
  requestId?: string | null
}

type WebsiteChannelPendingEventRow = {
  id: string
  message_ids: string[]
}

type DiscordReplyMessageRow = {
  message_id?: string | null
  timestamp?: string | null
  created_at?: string | null
  message_role?: string | null
  author_bot?: boolean | null
}

type SlackReplyMessageRow = {
  ts?: string | null
  thread_ts?: string | null
  created_at?: string | null
  message_role?: string | null
  bot_id?: string | null
}

type TelegramReplyMessageRow = {
  message_id?: string | null
  message_thread_id?: string | null
  date?: string | null
  created_at?: string | null
  message_role?: string | null
}

type FeishuReplyMessageRow = {
  message_id?: string | null
  message_thread_id?: string | null
  root_id?: string | null
  create_time?: string | null
  created_at?: string | null
  message_role?: string | null
  sender_type?: string | null
}

type FeishuUserIdentityRow = {
  user_id?: string | null
  open_id?: string | null
  display_name?: string | null
}

type TelegramUserIdentityRow = {
  user_id?: string | null
  username?: string | null
  first_name?: string | null
  last_name?: string | null
}

type AdoptedKnowledgeItem = {
  name: string
  contentSnapshot: string
  source: string
}

type EventAdoptedKnowledgeMessage = {
  messageId: string
  createdAt: string | null
  adoptedKnowledgeItems: AdoptedKnowledgeItem[]
}

const UUID_REGEX: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function createApiError(status: number, message: string): ApiError {
  return {
    status,
    message,
  }
}

function isUuid(value: string): boolean {
  return UUID_REGEX.test(value)
}

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/$/, '')
}

function buildBotApiUrl(baseUrl: string, endpointPath: string): string {
  return `${normalizeBaseUrl(baseUrl)}${endpointPath}`
}

/**
 * 组装 lucius-api-server 的完整 URL：
 * - 当 base 是域名根时自动补 `/api/v2`；
 * - 当 base 已带 `/api` 或 `/api/v2` 时避免重复拼接。
 */
function buildPlatformApiUrl(baseUrl: string, endpointPath: string): string {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl)
  const parsedBaseUrl = new URL(normalizedBaseUrl)
  const normalizedPathname = parsedBaseUrl.pathname.replace(/\/+$/, '')

  if (normalizedPathname.endsWith('/api/v2')) {
    return `${normalizedBaseUrl}${endpointPath}`
  }

  if (normalizedPathname.endsWith('/api')) {
    return `${normalizedBaseUrl}/v2${endpointPath}`
  }

  return `${normalizedBaseUrl}/api/v2${endpointPath}`
}

function getEventPlatformApiEnvOrNull(): EventPlatformApiEnv | null {
  const botBaseUrl =
    process.env.CLIENT_CHAT_BOT_BASE_URL?.trim() ||
    process.env.LUCIUS_BOT_BASE_URL?.trim() ||
    ''

  const platformApiBaseUrl =
    process.env.CLIENT_CHAT_PLATFORM_API_BASE_URL?.trim() ||
    process.env.LUCIUS_API_SERVER_BASE_URL?.trim() ||
    ''

  if (!platformApiBaseUrl) {
    return null
  }

  return {
    platformApiBaseUrl: normalizeBaseUrl(platformApiBaseUrl),
    botBaseUrl: botBaseUrl ? normalizeBaseUrl(botBaseUrl) : null,
    internalApiToken:
      process.env.CLIENT_CHAT_INTERNAL_API_TOKEN?.trim() ||
      process.env.INTERNAL_API_TOKEN?.trim() ||
      null,
  }
}

function buildPlatformForwardHeaders(token: string | null): HeadersInit | undefined {
  if (!token) {
    return undefined
  }

  return {
    Authorization: `Bearer ${token}`,
    'X-Internal-Api-Token': token,
  }
}

function buildPlatformJsonForwardHeaders(token: string | null): HeadersInit {
  if (!token) {
    return {
      'Content-Type': 'application/json; charset=utf-8',
    }
  }

  return {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${token}`,
    'X-Internal-Api-Token': token,
  }
}

/**
 * 复用 client-chat 发送时的来源 URL 解析：
 * - 优先信任明确传入的 origin / referer；
 * - event detail 里没有额外输入字段，因此这里直接从请求头兜底即可。
 */
function resolveWebsiteReplySourceUrl(request: Request): string | undefined {
  const originHeader = request.headers.get('origin')?.trim() || ''
  if (originHeader) {
    return originHeader
  }

  const refererHeader = request.headers.get('referer')?.trim() || ''
  if (refererHeader) {
    return refererHeader
  }

  return undefined
}

async function parseRequestJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T
  } catch {
    throw createApiError(400, '请求体必须是合法 JSON。')
  }
}

/**
 * 读取当前登录用户：
 * - 任务详情 API 只允许登录用户访问；
 * - 这里复用 SSR cookie 会话，避免前端暴露高权限能力。
 */
async function requireAuthenticatedUser(request: Request): Promise<AuthenticatedUser> {
  const supabase = createSupabaseServerClientForRequest(request, new Headers())
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user?.id) {
    throw createApiError(401, '登录已失效，请重新登录后重试。')
  }

  return {
    id: user.id,
    email: user.email || null,
  }
}

/**
 * 校验当前用户是否是目标公司的 active 成员：
 * - adopted knowledge 只在任务详情内使用；
 * - 仍然要做公司边界校验，避免仅凭 message_id 穿透其他租户数据。
 */
async function requireActiveOrganizationMember(payload: {
  companyId: string
  userId: string
}): Promise<OrganizationMemberRow> {
  const serviceClient = createSupabaseServiceRoleClient()
  const membershipResult = await serviceClient
    .schema('permission')
    .from('organization_member')
    .select('id, company_id, user_id, status')
    .eq('company_id', payload.companyId)
    .eq('user_id', payload.userId)
    .eq('status', 'active')
    .maybeSingle<OrganizationMemberRow>()

  if (membershipResult.error) {
    throw createApiError(500, `读取成员身份失败：${membershipResult.error.message}`)
  }

  if (!membershipResult.data) {
    throw createApiError(403, '你不是当前公司的有效成员。')
  }

  return membershipResult.data
}

/**
 * 成员显示名兜底策略：
 * - 优先使用公司资料中的昵称；
 * - 否则回退邮箱前缀，避免“接管后负责人为空”。
 */
function resolveMemberDisplayName(
  email: string | null,
  profileDisplayName: string | null | undefined,
): string {
  const normalizedProfileName = (profileDisplayName || '').trim()
  if (normalizedProfileName) {
    return normalizedProfileName
  }

  const normalizedEmail = (email || '').trim()
  const localPart = normalizedEmail.split('@')[0]?.trim() || ''
  if (localPart) {
    return localPart
  }

  return '当前成员'
}

/**
 * 解析当前成员在公司下的负责人信息：
 * - 接管/确认回答会把事件 owner 写成当前成员；
 * - 负责人昵称与头像优先取 `account.company_user_profile`，缺失时优雅降级。
 */
async function resolveCurrentUserEventOwnerProfile(payload: {
  companyId: string
  user: AuthenticatedUser
}): Promise<EventOwnerProfile> {
  const serviceClient = createSupabaseServiceRoleClient()
  const profileResult = await serviceClient
    .schema('account')
    .from('company_user_profile')
    .select('display_name, avatar_url')
    .eq('company_id', payload.companyId)
    .eq('user_id', payload.user.id)
    .maybeSingle<CompanyUserProfileRow>()

  if (profileResult.error) {
    throw createApiError(500, `读取当前成员资料失败：${profileResult.error.message}`)
  }

  return {
    userId: payload.user.id,
    displayName: resolveMemberDisplayName(
      payload.user.email,
      profileResult.data?.display_name,
    ),
    avatarUrl: profileResult.data?.avatar_url || null,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function normalizeEventPlatform(rawPlatform: string): SupportedEventPlatform | null {
  const normalizedPlatform = rawPlatform.trim().toLowerCase()

  if (normalizedPlatform.includes('discord')) return 'discord'
  if (normalizedPlatform.includes('telegram')) return 'telegram'
  if (normalizedPlatform.includes('slack')) return 'slack'
  if (normalizedPlatform.includes('feishu') || normalizedPlatform.includes('lark')) return 'feishu'

  return null
}

/**
 * website 事件在接手语义上需要单独处理：
 * - website 端一个用户会在同一会话里连续抛出多个 event；
 * - 因此“接手当前 event”本质上应升级成“接手该 channel 下所有 pending event”。
 */
function isWebsiteEventPlatform(rawPlatform: string | null | undefined): boolean {
  if (typeof rawPlatform !== 'string') {
    return false
  }

  return rawPlatform.trim().toLowerCase().includes('website')
}

/**
 * website 关联事件的批量更新必须改成“精确平台值”匹配：
 * - `lucius_agent.event.platform` 在库里是 enum，Postgres 不能直接对 enum 执行 `ILIKE`；
 * - 同一个 website 会话下的兄弟事件会复用和当前事件一致的 platform 值；
 * - 因此这里直接复用当前事件的原始枚举值做等值过滤，避免再次触发
 *   `operator does not exist: platform_type ~~* unknown`。
 */
function resolveWebsiteEventPlatformValue(rawPlatform: string | null | undefined): string | null {
  if (!isWebsiteEventPlatform(rawPlatform) || typeof rawPlatform !== 'string') {
    return null
  }

  const platformValue = rawPlatform.trim()
  return platformValue || null
}

/**
 * adopted knowledge 读取范围比“确认回复”更宽：
 * - 确认回复仍只支持 4 个 IM 平台，避免把未验证的平台直接放进发送链路；
 * - 但 `lucius_agent.message.platform` 已经真实写入了 `website`，
 *   因此查询 adopted knowledge 时需要单独放开。
 */
function normalizeAdoptedKnowledgePlatform(
  rawPlatform: string,
): SupportedAdoptedKnowledgePlatform | null {
  const normalizedPlatform = normalizeEventPlatform(rawPlatform)
  if (normalizedPlatform) {
    return normalizedPlatform
  }

  if (rawPlatform.trim().toLowerCase().includes('website')) {
    return 'website'
  }

  return null
}

function normalizeChannelId(rawChannelId: string | null | undefined): string | null {
  if (!rawChannelId) {
    return null
  }

  const normalizedChannelId = rawChannelId.trim()
  return normalizedChannelId || null
}

function normalizeMessageIds(rawMessageIds: string[] | undefined): string[] {
  if (!Array.isArray(rawMessageIds)) {
    return []
  }

  const normalizedMessageIds: string[] = []
  const seenMessageIds = new Set<string>()

  rawMessageIds.forEach((rawMessageId) => {
    if (typeof rawMessageId !== 'string') {
      return
    }

    const messageId = rawMessageId.trim()
    if (!messageId || seenMessageIds.has(messageId)) {
      return
    }

    seenMessageIds.add(messageId)
    normalizedMessageIds.push(messageId)
  })

  return normalizedMessageIds
}

function pickStringValue(record: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const rawValue = record[key]
    if (typeof rawValue !== 'string') {
      continue
    }

    const normalizedValue = rawValue.trim()
    if (normalizedValue) {
      return normalizedValue
    }
  }

  return null
}

/**
 * 标准化 adopted knowledge JSON：
 * - 兼容 snake_case / camelCase，降低前后端字段演进时的脆弱性；
 * - 过滤空对象，避免前端展示无意义卡片。
 */
function normalizeAdoptedKnowledgeItems(rawValue: unknown): AdoptedKnowledgeItem[] {
  if (!Array.isArray(rawValue)) {
    return []
  }

  return rawValue
    .map((item): AdoptedKnowledgeItem | null => {
      if (!isRecord(item)) {
        return null
      }

      const rawName = pickStringValue(item, ['name', 'title', 'knowledge_name', 'knowledgeName'])
      const rawContentSnapshot = pickStringValue(item, [
        'content_snapshot',
        'contentSnapshot',
        'content',
        'text',
      ])
      const source = pickStringValue(item, ['source']) || 'knowledge'

      if (!rawName && !rawContentSnapshot) {
        return null
      }

      return {
        name: rawName || '未命名知识',
        contentSnapshot: rawContentSnapshot || '暂无知识内容快照',
        source,
      }
    })
    .filter((item): item is AdoptedKnowledgeItem => Boolean(item))
}

function normalizeOptionalText(value: string | null | undefined): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const normalizedValue = value.trim()
  return normalizedValue ? normalizedValue : null
}

function normalizeTextLikeValue(value: unknown): string | null {
  if (typeof value === 'string') {
    return normalizeOptionalText(value)
  }

  if (typeof value === 'number' || typeof value === 'bigint') {
    const normalizedValue = String(value).trim()
    return normalizedValue || null
  }

  return null
}

function pickRecordTextValue(record: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const normalizedValue = normalizeTextLikeValue(record[key])
    if (normalizedValue) {
      return normalizedValue
    }
  }

  return null
}

function normalizeAssistTaskEventMessageRole(rawRole: unknown): AssistTaskEventMessageRole {
  if (typeof rawRole !== 'string') {
    return 'unknown'
  }

  const normalizedRole = rawRole.trim().toLowerCase()

  if (normalizedRole === 'user') return 'user'
  if (normalizedRole === 'assistant') return 'assistant'
  if (normalizedRole === 'staff') return 'staff'
  if (normalizedRole === 'bot') return 'bot'
  if (normalizedRole === 'lucius') return 'lucius'
  if (normalizedRole === 'admin') return 'admin'

  return 'unknown'
}

function isExternalUserMessageRole(role: AssistTaskEventMessageRole): boolean {
  return !['assistant', 'bot', 'lucius', 'staff', 'admin'].includes(role)
}

function extractUpstreamErrorMessage(payload: unknown): string | null {
  if (!isRecord(payload)) {
    return null
  }

  const detail = typeof payload.detail === 'string' ? payload.detail.trim() : ''
  if (detail) {
    return detail
  }

  const error = typeof payload.error === 'string' ? payload.error.trim() : ''
  if (error) {
    return error
  }

  const message = typeof payload.message === 'string' ? payload.message.trim() : ''
  return message || null
}

async function readUpstreamPayload(response: Response): Promise<unknown> {
  const rawResponseText = await response.text()
  if (!rawResponseText) {
    return null
  }

  try {
    return JSON.parse(rawResponseText) as unknown
  } catch {
    return rawResponseText
  }
}

/**
 * 统一校验事件动作公共上下文：
 * - 所有详情写操作都必须显式带上 companyId；
 * - 写操作前先校验登录态与公司成员关系，再允许代理到 lucius-api-server。
 */
async function requireEventActionContext(
  request: Request,
  body: EventActionBody | EventSupplementalKnowledgeBody,
): Promise<{
  companyId: string
  currentUser: AuthenticatedUser
  env: EventPlatformApiEnv
}> {
  const companyId = body.companyId?.trim() || ''
  if (!isUuid(companyId)) {
    throw createApiError(400, 'companyId 非法。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  const env = getEventPlatformApiEnvOrNull()
  if (!env) {
    throw createApiError(503, '服务端缺少 CLIENT_CHAT_PLATFORM_API_BASE_URL 配置。')
  }

  return {
    companyId,
    currentUser,
    env,
  }
}

/**
 * 通过当前应用代理事件更新：
 * - 前端只知道 `/api/events/*`，内部再转发到 lucius-api-server `/api/v2/events/{id}`；
 * - 所有错误在这里统一翻译成可读 message，避免前端出现裸 500。
 */
async function forwardEventUpdateToPlatformApi(payload: {
  env: EventPlatformApiEnv
  eventId: string
  updateData: EventUpdatePayload
  extraResponseData?: Record<string, unknown>
}): Promise<Response> {
  const upstreamUrl = buildPlatformApiUrl(
    payload.env.platformApiBaseUrl,
    `/events/${encodeURIComponent(payload.eventId)}`,
  )

  const upstreamResponse = await fetch(upstreamUrl, {
    method: 'PUT',
    headers: buildPlatformJsonForwardHeaders(payload.env.internalApiToken),
    body: JSON.stringify(payload.updateData),
  })

  const upstreamPayload = await readUpstreamPayload(upstreamResponse)

  if (!upstreamResponse.ok) {
    const upstreamMessage =
      extractUpstreamErrorMessage(upstreamPayload) ||
      `事件更新失败（${upstreamResponse.status}）。`

    throw createApiError(502, upstreamMessage)
  }

  return jsonResponse({
    event: upstreamPayload,
    ...(payload.extraResponseData || {}),
  })
}

async function loadAssistTaskEventDetailForMessaging(payload: {
  request: Request
  companyId: string
  eventId: string
}): Promise<AssistTaskEventDetailRow> {
  /**
   * 所有“对外发消息”动作都必须基于服务端最新事件数据：
   * - 避免浏览器侧缓存的 suggested_reply / context 已经过期；
   * - 保持“发送给谁、发到哪个线程/话题”都由服务端最终裁定。
   */
  const supabase = createSupabaseServerClientForRequest(payload.request, new Headers())
  const eventResult = await supabase
    .schema('lucius_agent')
    .from('event')
    .select('id, company_id, user_id, platform, channel_id, status, manual_review_status, suggested_reply, context, message_ids')
    .eq('company_id', payload.companyId)
    .eq('id', payload.eventId)
    .maybeSingle<AssistTaskEventDetailRow>()

  if (eventResult.error) {
    throw createApiError(500, `读取任务详情失败：${eventResult.error.message}`)
  }

  if (!eventResult.data) {
    throw createApiError(404, '事件不存在或已被删除。')
  }

  return {
    ...eventResult.data,
    message_ids: normalizeMessageIds(eventResult.data.message_ids),
  }
}

function buildReplyMessageOrderMap(messageIds: string[]): Map<string, number> {
  return new Map(messageIds.map((messageId, index) => [messageId, index]))
}

function buildReplyMessageTargetsFromDiscordRows(payload: {
  rows: DiscordReplyMessageRow[]
  messageIds: string[]
}): AssistTaskReplyMessageTarget[] {
  const orderMap = buildReplyMessageOrderMap(payload.messageIds)

  return payload.rows
    .map((row): AssistTaskReplyMessageTarget | null => {
      const messageId = normalizeOptionalText(row.message_id)
      if (!messageId) {
        return null
      }

      return {
        messageId,
        threadId: null,
        sentAt: normalizeOptionalText(row.timestamp) || normalizeOptionalText(row.created_at),
        order: orderMap.get(messageId) ?? -1,
        role: normalizeAssistTaskEventMessageRole(
          row.message_role || (row.author_bot ? 'assistant' : 'user'),
        ),
      }
    })
    .filter((item): item is AssistTaskReplyMessageTarget => Boolean(item))
}

function buildReplyMessageTargetsFromSlackRows(payload: {
  rows: SlackReplyMessageRow[]
  messageIds: string[]
}): AssistTaskReplyMessageTarget[] {
  const orderMap = buildReplyMessageOrderMap(payload.messageIds)

  return payload.rows
    .map((row): AssistTaskReplyMessageTarget | null => {
      const messageId = normalizeOptionalText(row.ts)
      if (!messageId) {
        return null
      }

      return {
        messageId,
        threadId: normalizeOptionalText(row.thread_ts) || messageId,
        sentAt: normalizeOptionalText(row.created_at),
        order: orderMap.get(messageId) ?? -1,
        role: normalizeAssistTaskEventMessageRole(
          row.message_role || (row.bot_id ? 'assistant' : 'user'),
        ),
      }
    })
    .filter((item): item is AssistTaskReplyMessageTarget => Boolean(item))
}

function buildReplyMessageTargetsFromTelegramRows(payload: {
  rows: TelegramReplyMessageRow[]
  messageIds: string[]
}): AssistTaskReplyMessageTarget[] {
  const orderMap = buildReplyMessageOrderMap(payload.messageIds)

  return payload.rows
    .map((row): AssistTaskReplyMessageTarget | null => {
      const messageId = normalizeOptionalText(row.message_id)
      if (!messageId) {
        return null
      }

      return {
        messageId,
        threadId: normalizeOptionalText(row.message_thread_id),
        sentAt: normalizeOptionalText(row.date) || normalizeOptionalText(row.created_at),
        order: orderMap.get(messageId) ?? -1,
        role: normalizeAssistTaskEventMessageRole(row.message_role),
      }
    })
    .filter((item): item is AssistTaskReplyMessageTarget => Boolean(item))
}

function buildReplyMessageTargetsFromFeishuRows(payload: {
  rows: FeishuReplyMessageRow[]
  messageIds: string[]
}): AssistTaskReplyMessageTarget[] {
  const orderMap = buildReplyMessageOrderMap(payload.messageIds)

  return payload.rows
    .map((row): AssistTaskReplyMessageTarget | null => {
      const messageId = normalizeOptionalText(row.message_id)
      if (!messageId) {
        return null
      }

      return {
        messageId,
        threadId:
          normalizeOptionalText(row.message_thread_id) ||
          normalizeOptionalText(row.root_id),
        sentAt: normalizeOptionalText(row.create_time) || normalizeOptionalText(row.created_at),
        order: orderMap.get(messageId) ?? -1,
        role: normalizeAssistTaskEventMessageRole(
          row.message_role ||
            (normalizeOptionalText(row.sender_type)?.toLowerCase() === 'bot'
              ? 'assistant'
              : 'user'),
        ),
      }
    })
    .filter((item): item is AssistTaskReplyMessageTarget => Boolean(item))
}

async function loadAssistTaskReplyMessageTargets(payload: {
  request: Request
  companyId: string
  platform: SupportedEventPlatform
  channelId: string
  messageIds: string[]
}): Promise<AssistTaskReplyMessageTarget[]> {
  if (payload.messageIds.length === 0) {
    return []
  }

  const supabase = createSupabaseServerClientForRequest(payload.request, new Headers())

  if (payload.platform === 'discord') {
    const result = await supabase
      .schema('discord')
      .from('message')
      .select('message_id, timestamp, created_at, message_role, author_bot')
      .eq('company_id', payload.companyId)
      .eq('channel_id', payload.channelId)
      .in('message_id', payload.messageIds)

    if (result.error) {
      throw createApiError(500, `读取 Discord 消息失败：${result.error.message}`)
    }

    return buildReplyMessageTargetsFromDiscordRows({
      rows: (result.data || []) as DiscordReplyMessageRow[],
      messageIds: payload.messageIds,
    })
  }

  if (payload.platform === 'slack') {
    const result = await supabase
      .schema('slack')
      .from('message')
      .select('ts, thread_ts, created_at, message_role, bot_id')
      .eq('company_id', payload.companyId)
      .eq('channel_id', payload.channelId)
      .in('ts', payload.messageIds)

    if (result.error) {
      throw createApiError(500, `读取 Slack 消息失败：${result.error.message}`)
    }

    return buildReplyMessageTargetsFromSlackRows({
      rows: (result.data || []) as SlackReplyMessageRow[],
      messageIds: payload.messageIds,
    })
  }

  if (payload.platform === 'telegram') {
    const result = await supabase
      .schema('telegram')
      .from('message')
      .select('message_id, message_thread_id, date, created_at, message_role')
      .eq('company_id', payload.companyId)
      .eq('chat_id', payload.channelId)
      .in('message_id', payload.messageIds)

    if (result.error) {
      throw createApiError(500, `读取 Telegram 消息失败：${result.error.message}`)
    }

    return buildReplyMessageTargetsFromTelegramRows({
      rows: (result.data || []) as TelegramReplyMessageRow[],
      messageIds: payload.messageIds,
    })
  }

  const result = await supabase
    .schema('feishu')
    .from('message')
    .select('message_id, message_thread_id, root_id, create_time, created_at, message_role, sender_type')
    .eq('company_id', payload.companyId)
    .eq('chat_id', payload.channelId)
    .in('message_id', payload.messageIds)

  if (result.error) {
    throw createApiError(500, `读取 Feishu 消息失败：${result.error.message}`)
  }

  return buildReplyMessageTargetsFromFeishuRows({
    rows: (result.data || []) as FeishuReplyMessageRow[],
    messageIds: payload.messageIds,
  })
}

function compareReplyMessageTargetPriority(
  leftTarget: AssistTaskReplyMessageTarget,
  rightTarget: AssistTaskReplyMessageTarget,
): number {
  const leftIsExternalUser = isExternalUserMessageRole(leftTarget.role)
  const rightIsExternalUser = isExternalUserMessageRole(rightTarget.role)

  if (leftIsExternalUser !== rightIsExternalUser) {
    return rightIsExternalUser ? 1 : -1
  }

  if (leftTarget.order !== rightTarget.order) {
    return rightTarget.order - leftTarget.order
  }

  const leftTimestamp = leftTarget.sentAt ? Date.parse(leftTarget.sentAt) : Number.NaN
  const rightTimestamp = rightTarget.sentAt ? Date.parse(rightTarget.sentAt) : Number.NaN
  const leftHasTimestamp = Number.isFinite(leftTimestamp)
  const rightHasTimestamp = Number.isFinite(rightTimestamp)

  if (leftHasTimestamp && rightHasTimestamp && leftTimestamp !== rightTimestamp) {
    return rightTimestamp - leftTimestamp
  }

  if (leftHasTimestamp !== rightHasTimestamp) {
    return rightHasTimestamp ? 1 : -1
  }

  return rightTarget.messageId.localeCompare(leftTarget.messageId)
}

function selectPreferredReplyMessageTarget(
  messageTargets: AssistTaskReplyMessageTarget[],
): AssistTaskReplyMessageTarget | null {
  if (messageTargets.length === 0) {
    return null
  }

  /**
   * 线程候选选择策略：
   * - 优先选择最新的真实用户消息，尽量沿用用户当前所在的线程/话题上下文；
   * - 若事件里没有用户消息，则退回最近一条消息，至少保证线程/话题维度不丢。
   */
  return [...messageTargets].sort(compareReplyMessageTargetPriority)[0] || null
}

function escapeFeishuMentionDisplayName(displayName: string): string {
  return displayName
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeTelegramHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function normalizeTelegramUsername(value: string | null | undefined): string | null {
  const normalizedValue = normalizeOptionalText(value)
  if (!normalizedValue) {
    return null
  }

  return normalizedValue.replace(/^@+/, '') || null
}

function looksLikeTelegramUsername(value: string): boolean {
  return /^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(value)
}

function buildEventMentionMarkup(payload: {
  platform: SupportedEventPlatform
  eventUserId: string | null | undefined
  displayName?: string | null
  username?: string | null
}): string | null {
  const normalizedEventUserId = normalizeOptionalText(payload.eventUserId)
  if (!normalizedEventUserId) {
    return null
  }

  if (payload.platform === 'discord' || payload.platform === 'slack') {
    return `<@${normalizedEventUserId}>`
  }

  if (payload.platform === 'feishu') {
    const displayName =
      normalizeOptionalText(payload.displayName) || normalizedEventUserId

    return `<at user_id="${normalizedEventUserId}">@${escapeFeishuMentionDisplayName(displayName)}</at>`
  }

  if (payload.platform === 'telegram') {
    const normalizedUsername = normalizeTelegramUsername(payload.username)
    if (normalizedUsername) {
      return `@${normalizedUsername}`
    }

    if (looksLikeTelegramUsername(normalizedEventUserId)) {
      return `@${normalizedEventUserId}`
    }

    const displayName =
      normalizeOptionalText(payload.displayName) || normalizedEventUserId

    return `<a href="tg://user?id=${normalizedEventUserId}">${escapeTelegramHtmlText(displayName)}</a>`
  }

  return `@${normalizedEventUserId}`
}

/**
 * 统一组装人工回复正文：
 * - 当前链路不再使用 `replyTo`/`reply_to_message_uuid` 做引用回复；
 * - 不同平台按原生 mention 语法拼接用户引用；
 * - 若事件上没有 user_id，或者正文本身已经以同一个 mention 前缀开头，则保持原样。
 */
function buildMentionedEventReplyContent(payload: {
  platform: SupportedEventPlatform
  content: string
  eventUserId: string | null | undefined
  displayName?: string | null
  username?: string | null
}): {
  content: string
  parseMode: SendMessageParseMode | null
} {
  const mentionMarkup = buildEventMentionMarkup({
    platform: payload.platform,
    eventUserId: payload.eventUserId,
    displayName: payload.displayName,
    username: payload.username,
  })
  if (!mentionMarkup) {
    return {
      content: payload.content,
      parseMode: null,
    }
  }

  const parseMode =
    payload.platform === 'telegram' && mentionMarkup.startsWith('<a href="tg://user?id=')
      ? 'HTML'
      : null

  if (payload.content.startsWith(mentionMarkup)) {
    return {
      content: payload.content,
      parseMode,
    }
  }

  return {
    content:
      parseMode === 'HTML'
        ? `${mentionMarkup} ${escapeTelegramHtmlText(payload.content)}`
        : `${mentionMarkup} ${payload.content}`,
    parseMode,
  }
}

/**
 * 解析飞书 @ 展示名：
 * - 飞书语法要求 `<at user_id="...">@展示名</at>`；
 * - 事件表里的 `user_id` 可能是 `user_id` 也可能已经是 `open_id`，因此两边都查；
 * - 查询失败时不阻断发送，直接回退到 `event.user_id` 作为展示文本。
 */
async function resolveFeishuMentionDisplayName(payload: {
  request: Request
  companyId: string
  eventUserId: string | null | undefined
}): Promise<string | null> {
  const normalizedEventUserId = normalizeOptionalText(payload.eventUserId)
  if (!normalizedEventUserId) {
    return null
  }

  const supabase = createSupabaseServerClientForRequest(payload.request, new Headers())
  const [byUserIdResult, byOpenIdResult] = await Promise.all([
    supabase
      .schema('feishu')
      .from('user')
      .select('user_id,open_id,display_name')
      .eq('company_id', payload.companyId)
      .eq('user_id', normalizedEventUserId)
      .maybeSingle<FeishuUserIdentityRow>(),
    supabase
      .schema('feishu')
      .from('user')
      .select('user_id,open_id,display_name')
      .eq('company_id', payload.companyId)
      .eq('open_id', normalizedEventUserId)
      .maybeSingle<FeishuUserIdentityRow>(),
  ])

  if (byUserIdResult.error) {
    throw createApiError(500, `读取飞书用户资料失败：${byUserIdResult.error.message}`)
  }

  if (byOpenIdResult.error) {
    throw createApiError(500, `读取飞书用户资料失败：${byOpenIdResult.error.message}`)
  }

  return (
    normalizeOptionalText(byOpenIdResult.data?.display_name) ||
    normalizeOptionalText(byUserIdResult.data?.display_name) ||
    null
  )
}

type TelegramMentionIdentity = {
  username: string | null
  displayName: string | null
}

async function resolveTelegramMentionIdentity(payload: {
  request: Request
  companyId: string
  eventUserId: string | null | undefined
}): Promise<TelegramMentionIdentity> {
  const normalizedEventUserId = normalizeOptionalText(payload.eventUserId)
  if (!normalizedEventUserId) {
    return {
      username: null,
      displayName: null,
    }
  }

  const supabase = createSupabaseServerClientForRequest(payload.request, new Headers())
  const lookupResult = await supabase
    .schema('telegram')
    .from('user')
    .select('user_id,username,first_name,last_name')
    .eq('company_id', payload.companyId)
    .eq('user_id', normalizedEventUserId)
    .maybeSingle<TelegramUserIdentityRow>()

  if (lookupResult.error) {
    throw createApiError(500, `读取 Telegram 用户资料失败：${lookupResult.error.message}`)
  }

  const username = normalizeTelegramUsername(lookupResult.data?.username)
  const displayName =
    [
      normalizeOptionalText(lookupResult.data?.first_name),
      normalizeOptionalText(lookupResult.data?.last_name),
    ]
      .filter((part): part is string => Boolean(part))
      .join(' ')
      .trim() || null

  return {
    username,
    displayName: displayName || username || normalizedEventUserId,
  }
}

function resolveEventSendTarget(payload: {
  event: AssistTaskEventDetailRow
  messageTargets: AssistTaskReplyMessageTarget[]
  content: string | null
  mentionDisplayName?: string | null
  mentionUsername?: string | null
  requestId: string
  missingContentErrorMessage: string
}): ConfirmReplySendTarget {
  const provider = normalizeEventPlatform(payload.event.platform)
  if (!provider) {
    throw createApiError(400, '当前事件平台暂不支持发送消息。')
  }

  const channelId = normalizeOptionalText(payload.event.channel_id)
  if (!channelId) {
    throw createApiError(400, '事件缺少 channel_id，无法发送消息。')
  }

  const content = normalizeOptionalText(payload.content)
  if (!content) {
    throw createApiError(400, payload.missingContentErrorMessage)
  }

  const contextRecord = isRecord(payload.event.context) ? payload.event.context : {}
  /**
   * 线程定位仍然优先复用事件 context：
   * - 上游若已经把 thread/topic/root 参数固化到 event，就直接透传；
   * - 若没有显式线程信息，再回退到事件消息链路中最近的目标消息。
   */
  const explicitThreadId = pickRecordTextValue(contextRecord, [
    'message_thread_id',
    'messageThreadId',
    'topic_id',
    'topicId',
    'thread_id',
    'threadId',
    'thread_ts',
    'root_id',
    'rootId',
  ])
  const preferredMessageTarget = selectPreferredReplyMessageTarget(payload.messageTargets)

  const threadId = explicitThreadId || preferredMessageTarget?.threadId || null
  const mentionedContent = buildMentionedEventReplyContent({
    platform: provider,
    content,
    eventUserId: payload.event.user_id,
    displayName: payload.mentionDisplayName,
    username: payload.mentionUsername,
  })

  return {
    provider,
    to: provider === 'slack' && threadId ? `${channelId}/${threadId}` : channelId,
    messageThreadId:
      provider === 'telegram' || provider === 'feishu' ? threadId : null,
    content: mentionedContent.content,
    parseMode: mentionedContent.parseMode,
    requestId: payload.requestId,
  }
}

function resolveConfirmedReplySendTarget(payload: {
  event: AssistTaskEventDetailRow
  messageTargets: AssistTaskReplyMessageTarget[]
  content?: string | null
}): ConfirmReplySendTarget {
  return resolveEventSendTarget({
    event: payload.event,
    messageTargets: payload.messageTargets,
    content: payload.content ?? payload.event.suggested_reply,
    requestId: `assist-task-confirm-reply:${payload.event.id}`,
    missingContentErrorMessage: '事件缺少建议回复内容，无法确认发送。',
  })
}

function buildManualReplyRequestId(eventId: string): string {
  const nonce = Math.random().toString(36).slice(2, 10)
  return `assist-task-manual-reply:${eventId}:${Date.now()}-${nonce}`
}

function appendEventMessageId(messageIds: string[], messageId: string): string[] {
  return normalizeMessageIds([...messageIds, messageId])
}

function requireBotMessageId(sendResponse: BotInteractionSendResponse): string {
  const sendResponseRecord = isRecord(sendResponse)
    ? sendResponse as Record<string, unknown>
    : null
  const directMessageId = sendResponseRecord
    ? pickRecordTextValue(sendResponseRecord, ['messageId', 'message_id', 'id'])
    : null
  if (directMessageId) {
    return directMessageId
  }

  const nestedPayload = sendResponseRecord && isRecord(sendResponseRecord.data)
    ? sendResponseRecord.data
    : null
  const nestedMessageId = nestedPayload
    ? pickRecordTextValue(nestedPayload, ['messageId', 'message_id', 'id'])
    : null
  if (nestedMessageId) {
    return nestedMessageId
  }

  throw createApiError(502, '消息已发送，但 bot 未返回 messageId，无法回写事件消息链路。')
}

async function sendEventMessageToInteractionApi(payload: {
  request: Request
  env: EventPlatformApiEnv
  event: AssistTaskEventDetailRow
  content: string | null
  requestId: string
  missingContentErrorMessage: string
}): Promise<BotInteractionSendResponse> {
  if (!payload.env.botBaseUrl) {
    throw createApiError(503, '服务端缺少 CLIENT_CHAT_BOT_BASE_URL 配置。')
  }

  const channelId = normalizeOptionalText(payload.event.channel_id)
  if (!channelId) {
    throw createApiError(400, '事件缺少 channel_id，无法发送消息。')
  }

  const platform = normalizeEventPlatform(payload.event.platform)
  if (!platform) {
    throw createApiError(400, '当前事件平台暂不支持发送消息。')
  }

  const feishuMentionDisplayName = platform === 'feishu'
    ? await resolveFeishuMentionDisplayName({
        request: payload.request,
        companyId: payload.event.company_id,
        eventUserId: payload.event.user_id,
      })
    : null
  const telegramMentionIdentity = platform === 'telegram'
    ? await resolveTelegramMentionIdentity({
        request: payload.request,
        companyId: payload.event.company_id,
        eventUserId: payload.event.user_id,
      })
    : null

  const messageTargets = await loadAssistTaskReplyMessageTargets({
    request: payload.request,
    companyId: payload.event.company_id,
    platform,
    channelId,
    messageIds: payload.event.message_ids,
  })

  const sendTarget = resolveEventSendTarget({
    event: payload.event,
    messageTargets,
    content: payload.content,
    mentionDisplayName: feishuMentionDisplayName || telegramMentionIdentity?.displayName || null,
    mentionUsername: telegramMentionIdentity?.username || null,
    requestId: payload.requestId,
    missingContentErrorMessage: payload.missingContentErrorMessage,
  })

  /**
   * 统一走 bot 的 `/v2/interaction/send`：
   * - 平台差异（Slack thread、Telegram topic、Feishu root_id）都交给 bot 侧统一处理；
   * - 当前应用只负责把 event 解析成标准化发送载荷。
   */
  const requestBody: Record<string, unknown> = {
    content: sendTarget.content,
    requestId: sendTarget.requestId,
    to: {
      provider: sendTarget.provider,
      to: sendTarget.to,
    },
  }

  if (sendTarget.messageThreadId) {
    requestBody.messageThreadId = sendTarget.messageThreadId
  }

  if (sendTarget.parseMode) {
    requestBody.parseMode = sendTarget.parseMode
  }

  const upstreamResponse = await fetch(
    buildBotApiUrl(payload.env.botBaseUrl, '/v2/interaction/send'),
    {
      method: 'POST',
      headers: buildPlatformJsonForwardHeaders(payload.env.internalApiToken),
      body: JSON.stringify(requestBody),
    },
  )

  const upstreamPayload = await readUpstreamPayload(upstreamResponse)
  const sendResponse = (isRecord(upstreamPayload)
    ? upstreamPayload
    : {}) as BotInteractionSendResponse

  if (!upstreamResponse.ok || sendResponse.ok === false) {
    const errorMessage =
      extractUpstreamErrorMessage(upstreamPayload) ||
      `消息发送失败（${upstreamResponse.status}）。`

    throw createApiError(502, errorMessage)
  }

  return sendResponse
}

/**
 * website 回复链路要求直接命中官网聊天会话：
 * - 当前 event.channel_id 已经稳定保存了 `website.session.session_id`；
 * - 详情页消息展示和发送都应继续使用同一套 `website.session / website.message`；
 * - 因此这里不再绕到 client chat schema，只把 channel_id 当作官网会话主键使用。
 */
function resolveWebsiteEventReplySessionId(event: AssistTaskEventDetailRow): string {
  const sessionId = normalizeChannelId(event.channel_id)
  if (!sessionId) {
    throw createApiError(400, 'website 事件缺少 channel_id，无法定位会话。')
  }

  return sessionId
}

async function sendWebsiteEventMessageToWebsiteApi(payload: {
  request: Request
  env: EventPlatformApiEnv
  companyId: string
  currentUser: AuthenticatedUser
  ownerProfile: EventOwnerProfile
  event: AssistTaskEventDetailRow
  content: string | null
  missingContentErrorMessage: string
}): Promise<BotInteractionSendResponse> {
  if (!payload.env.botBaseUrl) {
    throw createApiError(503, '服务端缺少 CLIENT_CHAT_BOT_BASE_URL 配置。')
  }

  const content = normalizeOptionalText(payload.content)
  if (!content) {
    throw createApiError(400, payload.missingContentErrorMessage)
  }

  const sessionId = resolveWebsiteEventReplySessionId(payload.event)
  const requestBody: Record<string, unknown> = {
    companyId: payload.companyId,
    sessionId,
    message: content,
    userId: payload.currentUser.id,
    username: payload.ownerProfile.displayName,
  }

  if (payload.ownerProfile.avatarUrl) {
    requestBody.avatarUrl = payload.ownerProfile.avatarUrl
  }

  const sourceUrl = resolveWebsiteReplySourceUrl(payload.request)
  if (sourceUrl) {
    requestBody.sourceUrl = sourceUrl
  }

  const upstreamResponse = await fetch(
    buildBotApiUrl(payload.env.botBaseUrl, '/web/message'),
    {
      method: 'POST',
      headers: buildPlatformJsonForwardHeaders(payload.env.internalApiToken),
      body: JSON.stringify(requestBody),
    },
  )

  const upstreamPayload = await readUpstreamPayload(upstreamResponse)
  const sendResponse = (isRecord(upstreamPayload)
    ? upstreamPayload
    : {}) as BotInteractionSendResponse

  if (!upstreamResponse.ok || sendResponse.ok === false) {
    const errorMessage =
      extractUpstreamErrorMessage(upstreamPayload) ||
      `website 消息发送失败（${upstreamResponse.status}）。`

    throw createApiError(502, errorMessage)
  }

  return sendResponse
}

/**
 * website 回复后的 event 回写规则：
 * - 当前事件始终写回最新消息链路；
 * - 同 channel 下其余 `pending` event 视为“已被该成员接手”，统一推进到 `processing`；
 * - 这些关联事件也补上刚发送的 message_id，保证后续打开详情时能看到同一条官网回复。
 */
async function syncWebsiteChannelEventsAfterReply(payload: {
  companyId: string
  currentEvent: AssistTaskEventDetailRow
  currentEventUpdateData: EventUpdatePayload
  ownerProfile: EventOwnerProfile
  sentMessageId: string
  lastActivityAt: string
}): Promise<Response> {
  const channelId = normalizeChannelId(payload.currentEvent.channel_id)
  if (!channelId) {
    throw createApiError(400, 'website 事件缺少 channel_id，无法回写接手状态。')
  }
  const websitePlatform = resolveWebsiteEventPlatformValue(payload.currentEvent.platform)
  if (!websitePlatform) {
    throw createApiError(400, '当前事件不是 website 平台，无法回写 website 会话状态。')
  }

  const serviceClient = createSupabaseServiceRoleClient()
  const relatedPendingEventResult = await serviceClient
    .schema('lucius_agent')
    .from('event')
    .select('id,message_ids')
    .eq('company_id', payload.companyId)
    .eq('channel_id', channelId)
    .eq('status', 'pending')
    .eq('platform', websitePlatform)

  if (relatedPendingEventResult.error) {
    throw createApiError(
      500,
      `读取 website 关联事件失败：${relatedPendingEventResult.error.message}`,
    )
  }

  const relatedPendingEvents = ((relatedPendingEventResult.data || []) as WebsiteChannelPendingEventRow[])
    .filter((eventRow) => eventRow.id !== payload.currentEvent.id)

  const currentEventUpdateResult = await serviceClient
    .schema('lucius_agent')
    .from('event')
    .update(payload.currentEventUpdateData)
    .eq('company_id', payload.companyId)
    .eq('id', payload.currentEvent.id)
    .select('id')

  if (currentEventUpdateResult.error) {
    throw createApiError(
      500,
      `回写当前 website 事件失败：${currentEventUpdateResult.error.message}`,
    )
  }

  await Promise.all(
    relatedPendingEvents.map(async (eventRow) => {
      const siblingUpdateData: EventUpdatePayload = {
        ...buildTakeOverEventUpdateData({
          ownerUserId: payload.ownerProfile.userId,
          ownerDisplayName: payload.ownerProfile.displayName,
          ownerAvatarUrl: payload.ownerProfile.avatarUrl,
          lastActivityAt: payload.lastActivityAt,
        }),
        message_ids: appendEventMessageId(eventRow.message_ids, payload.sentMessageId),
      }
      const siblingUpdateResult = await serviceClient
        .schema('lucius_agent')
        .from('event')
        .update(siblingUpdateData)
        .eq('company_id', payload.companyId)
        .eq('id', eventRow.id)
        .select('id')

      if (siblingUpdateResult.error) {
        throw createApiError(
          500,
          `批量回写 website 接手事件失败：${siblingUpdateResult.error.message}`,
        )
      }
    }),
  )

  return jsonResponse({
    event: {
      id: payload.currentEvent.id,
      ...payload.currentEventUpdateData,
    },
    messageId: payload.sentMessageId,
    affectedEventCount: 1 + relatedPendingEvents.length,
  })
}

async function sendConfirmedReplyToInteractionApi(payload: {
  request: Request
  env: EventPlatformApiEnv
  event: AssistTaskEventDetailRow
  content?: string | null
}): Promise<BotInteractionSendResponse> {
  return sendEventMessageToInteractionApi({
    request: payload.request,
    env: payload.env,
    event: payload.event,
    content: payload.content ?? payload.event.suggested_reply,
    requestId: `assist-task-confirm-reply:${payload.event.id}`,
    missingContentErrorMessage: '事件缺少建议回复内容，无法确认发送。',
  })
}

async function handleTakeOverEvent(request: Request, eventId: string): Promise<Response> {
  const body = await parseRequestJson<EventActionBody>(request)
  const { companyId, currentUser, env } = await requireEventActionContext(request, body)
  const eventDetail = await loadAssistTaskEventDetailForMessaging({
    request,
    companyId,
    eventId,
  })
  const ownerProfile = await resolveCurrentUserEventOwnerProfile({
    companyId,
    user: currentUser,
  })
  const lastActivityAt = new Date().toISOString()
  const normalizedChannelId = normalizeChannelId(eventDetail.channel_id)
  const websitePlatform = resolveWebsiteEventPlatformValue(eventDetail.platform)

  /**
   * website 端的“接手”是会话级语义：
   * - 同一 `channel_id` 下只要还在 `pending` 的 event，都说明这位用户的问题还没人处理；
   * - 当前成员一旦接手其中一条，就把整组 pending event 一次性推进到 `processing`。
   */
  if (websitePlatform && normalizedChannelId) {
    const serviceClient = createSupabaseServiceRoleClient()
    const updateData = buildTakeOverEventUpdateData({
      ownerUserId: ownerProfile.userId,
      ownerDisplayName: ownerProfile.displayName,
      ownerAvatarUrl: ownerProfile.avatarUrl,
      lastActivityAt,
    })
    const batchUpdateResult = await serviceClient
      .schema('lucius_agent')
      .from('event')
      .update(updateData)
      .eq('company_id', companyId)
      .eq('channel_id', normalizedChannelId)
      .eq('status', 'pending')
      .eq('platform', websitePlatform)
      .select('id')

    if (batchUpdateResult.error) {
      throw createApiError(
        500,
        `批量接手 website 事件失败：${batchUpdateResult.error.message}`,
      )
    }

    return jsonResponse({
      event: {
        id: eventId,
        ...updateData,
      },
      affectedEventCount: (batchUpdateResult.data || []).length,
    })
  }

  return forwardEventUpdateToPlatformApi({
    env,
    eventId,
    updateData: buildTakeOverEventUpdateData({
      ownerUserId: ownerProfile.userId,
      ownerDisplayName: ownerProfile.displayName,
      ownerAvatarUrl: ownerProfile.avatarUrl,
      lastActivityAt,
    }),
  })
}

type BuildTakeOverEventUpdateDataParams = {
  ownerUserId: string
  ownerDisplayName: string | null
  ownerAvatarUrl: string | null
  lastActivityAt: string
}

/**
 * 构造“接手事件”的更新载荷：
 * - 人工接手后事件应进入 `processing`，允许继续在详情区直接回消息；
 * - owner 字段用于记录当前负责人，后续 resolved 也沿用同一位成员；
 * - 人工接手后 review 流程已结束，统一回到 `not_required`，避免 badge 停留在旧状态。
 */
function buildTakeOverEventUpdateData(
  params: BuildTakeOverEventUpdateDataParams,
): EventUpdatePayload {
  const {
    ownerUserId,
    ownerDisplayName,
    ownerAvatarUrl,
    lastActivityAt,
  } = params

  return {
    owner_user_id: ownerUserId,
    owner_display_name: ownerDisplayName || undefined,
    owner_avatar_url: ownerAvatarUrl,
    status: 'processing',
    manual_review_required: false,
    manual_review_status: 'not_required',
    last_activity_at: lastActivityAt,
  }
}

type BuildResolveEventUpdateDataParams = BuildTakeOverEventUpdateDataParams

/**
 * 构造“结束事件”的更新载荷：
 * - 结束动作单独落到 `resolved`，不再和 take over 复用同一个按钮；
 * - 继续写入 owner 信息，保证审计记录和列表负责人一致。
 */
function buildResolveEventUpdateData(
  params: BuildResolveEventUpdateDataParams,
): EventUpdatePayload {
  const {
    ownerUserId,
    ownerDisplayName,
    ownerAvatarUrl,
    lastActivityAt,
  } = params

  return {
    owner_user_id: ownerUserId,
    owner_display_name: ownerDisplayName || undefined,
    owner_avatar_url: ownerAvatarUrl,
    status: 'resolved',
    manual_review_required: false,
    manual_review_status: 'not_required',
    last_activity_at: lastActivityAt,
  }
}

/**
 * 兼容“忽略事件”的上游更新载荷：
 * - 数据库枚举已经支持 `ignored`，但当前 lucius-api-server 仍加载旧版 Python `EventStatus`，
 *   直接传 `status='ignored'` 会在 Pydantic 校验阶段被 422 拦截；
 * - 因此前端代理层先退化为 `resolved + manual_review_status='rejected'`；
 * - 查询层会把这组状态重新解释回 `ignored`，保证当前 UI 行为不变。
 */
function buildIgnoreEventUpdateData(lastActivityAt: string): EventUpdatePayload {
  return {
    status: 'resolved',
    manual_review_required: false,
    manual_review_status: 'rejected',
    last_activity_at: lastActivityAt,
  }
}

/**
 * 判断事件当前是否处于“已忽略”展示态：
 * - 兼容真实 `ignored`；
 * - 也兼容上游仍在写入的 `resolved + rejected` 过渡组合。
 */
function isIgnoredAssistTaskEvent(payload: {
  status: string | null | undefined
  manualReviewStatus: string | null | undefined
}): boolean {
  const normalizedStatus = normalizeOptionalText(payload.status)?.toLowerCase() || ''
  const normalizedManualReviewStatus =
    normalizeOptionalText(payload.manualReviewStatus)?.toLowerCase() || ''

  if (normalizedStatus === 'ignored') {
    return true
  }

  return normalizedStatus === 'resolved' && normalizedManualReviewStatus === 'rejected'
}

type BuildSendMessageEventUpdateDataParams = {
  event: Pick<
    AssistTaskEventDetailRow,
    'status' | 'manual_review_status' | 'suggested_reply' | 'message_ids'
  >
  ownerUserId: string
  ownerDisplayName: string
  ownerAvatarUrl: string | null
  sentMessageId: string
  lastActivityAt: string
}

type BuildConfirmSuggestedReplyEventUpdateDataParams = {
  event: Pick<AssistTaskEventDetailRow, 'message_ids'>
  ownerUserId: string
  ownerDisplayName: string
  ownerAvatarUrl: string | null
  confirmedReplyContent: string | null
  sentMessageId: string
  lastActivityAt: string
}

/**
 * 判断当前事件是否还存在“待人工决定是否采用”的 suggested reply：
 * - 只要有正文，且状态还不是 confirmed / rejected，就视为仍在审核中；
 * - `not_required` 或空值都不再算待审核，避免人工回复后又被重新拉回审核态。
 */
function hasPendingSuggestedReplyReview(
  event: Pick<AssistTaskEventDetailRow, 'manual_review_status' | 'suggested_reply'>,
): boolean {
  const suggestedReply = normalizeOptionalText(event.suggested_reply)
  const manualReviewStatus =
    normalizeOptionalText(event.manual_review_status)?.toLowerCase() || ''

  if (!suggestedReply) {
    return false
  }

  if (manualReviewStatus === 'confirmed' || manualReviewStatus === 'rejected') {
    return false
  }

  return true
}

/**
 * 解析“人工发送消息后”应如何更新 suggested reply 审核态：
 * - 若当前仍有待审核 suggested reply，说明人工选择了自己回复，应该记为 rejected；
 * - 已确认 / 已拒绝的历史结论需要保留，避免后续人工补充消息把语义冲掉；
 * - 其他无审核语义的场景统一回到 not_required。
 */
function buildManualReplyReviewUpdateData(
  event: Pick<AssistTaskEventDetailRow, 'manual_review_status' | 'suggested_reply'>,
): Pick<EventUpdatePayload, 'manual_review_required' | 'manual_review_status'> {
  const manualReviewStatus =
    normalizeOptionalText(event.manual_review_status)?.toLowerCase() || ''

  if (hasPendingSuggestedReplyReview(event)) {
    return {
      manual_review_required: false,
      manual_review_status: 'rejected',
    }
  }

  if (
    manualReviewStatus === 'confirmed' ||
    manualReviewStatus === 'rejected' ||
    manualReviewStatus === 'not_required'
  ) {
    return {
      manual_review_required: false,
      manual_review_status: manualReviewStatus,
    }
  }

  return {
    manual_review_required: false,
    manual_review_status: 'not_required',
  }
}

/**
 * 组装“发送回复后”的事件更新载荷：
 * - 常规 pending / taken_over 事件发送后统一落到 `processing`，即展示层的 `taken_over`；
 * - 已忽略事件允许继续回复，但状态必须保持为 ignored，不能因为一次补充回复被回退；
 * - 若当前仍挂着待审核 suggested reply，人工回复意味着“不采用建议回复”，这里应写成 `rejected`；
 * - 两种路径都要补写 owner / last_activity / message_ids，保证审计链完整。
 */
function buildSendMessageEventUpdateData(
  params: BuildSendMessageEventUpdateDataParams,
): EventUpdatePayload {
  const {
    event,
    ownerUserId,
    ownerDisplayName,
    ownerAvatarUrl,
    sentMessageId,
    lastActivityAt,
  } = params

  const messageIds = appendEventMessageId(event.message_ids, sentMessageId)
  const commonUpdateData = {
    owner_user_id: ownerUserId,
    owner_display_name: ownerDisplayName || undefined,
    owner_avatar_url: ownerAvatarUrl,
    last_activity_at: lastActivityAt,
    message_ids: messageIds,
  }

  if (
    isIgnoredAssistTaskEvent({
      status: event.status,
      manualReviewStatus: event.manual_review_status,
    })
  ) {
    return {
      ...commonUpdateData,
      ...buildIgnoreEventUpdateData(lastActivityAt),
      message_ids: messageIds,
    }
  }

  return {
    ...commonUpdateData,
    status: 'processing',
    ...buildManualReplyReviewUpdateData(event),
    message_ids: messageIds,
  }
}

/**
 * 组装“确认并发送 suggested reply 后”的事件更新载荷：
 * - 当前产品要求是：一旦人工确认采用建议回复，事件生命周期立即结束，统一写成 `resolved`；
 * - website 和多平台端都必须共用同一份状态语义，避免不同链路继续分叉；
 * - 同时保留 owner / confirmed / suggested_reply / message_ids，保证审计与消息链完整。
 */
function buildConfirmSuggestedReplyEventUpdateData(
  params: BuildConfirmSuggestedReplyEventUpdateDataParams,
): EventUpdatePayload {
  const {
    event,
    ownerUserId,
    ownerDisplayName,
    ownerAvatarUrl,
    confirmedReplyContent,
    sentMessageId,
    lastActivityAt,
  } = params

  return {
    owner_user_id: ownerUserId,
    owner_display_name: ownerDisplayName || undefined,
    owner_avatar_url: ownerAvatarUrl,
    status: 'resolved',
    manual_review_required: false,
    manual_review_status: 'confirmed',
    suggested_reply: confirmedReplyContent,
    last_activity_at: lastActivityAt,
    message_ids: appendEventMessageId(event.message_ids, sentMessageId),
  }
}

/**
 * 构造“取消采用建议回复”的更新载荷：
 * - 这里只结束 suggested reply 的人工审核，不直接改变事件生命周期；
 * - 事件后续仍可继续接管、手动回复或忽略；
 * - 前端会根据 `manual_review_status='rejected'` 隐藏建议回复卡片。
 */
function buildRejectSuggestedReplyUpdateData(lastActivityAt: string): EventUpdatePayload {
  return {
    manual_review_required: false,
    manual_review_status: 'rejected',
    last_activity_at: lastActivityAt,
  }
}

function resolveEventSuggestedReplyReviewDecision(
  rawDecision: unknown,
): EventSuggestedReplyReviewDecision {
  if (rawDecision === null || rawDecision === undefined) {
    return 'confirm'
  }

  if (typeof rawDecision !== 'string') {
    throw createApiError(400, 'decision 非法。')
  }

  const normalizedDecision = rawDecision.trim().toLowerCase()

  if (!normalizedDecision) {
    return 'confirm'
  }

  if (normalizedDecision === 'confirm' || normalizedDecision === 'reject') {
    return normalizedDecision
  }

  throw createApiError(400, 'decision 非法。')
}

/**
 * 解析人工审核阶段提交的建议回复正文：
 * - confirm 未显式传 content 时，继续使用事件当前 suggested_reply；
 * - 显式传入时统一 trim，避免把纯空白内容发到外部平台；
 * - reject 不消费这段内容，因此仅在 confirm 链路调用。
 */
function resolveEventSuggestedReplyReviewContent(
  rawContent: unknown,
  fallbackContent: string | null,
): string | null {
  if (rawContent === undefined) {
    return normalizeOptionalText(fallbackContent)
  }

  if (rawContent === null) {
    return null
  }

  if (typeof rawContent !== 'string') {
    throw createApiError(400, 'content 非法。')
  }

  return normalizeOptionalText(rawContent)
}

async function handleIgnoreEvent(request: Request, eventId: string): Promise<Response> {
  const body = await parseRequestJson<EventActionBody>(request)
  const { env } = await requireEventActionContext(request, body)

  return forwardEventUpdateToPlatformApi({
    env,
    eventId,
    updateData: buildIgnoreEventUpdateData(new Date().toISOString()),
  })
}

async function handleSendEventMessage(request: Request, eventId: string): Promise<Response> {
  const body = await parseRequestJson<EventSendMessageBody>(request)
  const { companyId, currentUser, env } = await requireEventActionContext(request, body)
  const ownerProfile = await resolveCurrentUserEventOwnerProfile({
    companyId,
    user: currentUser,
  })
  const eventDetail = await loadAssistTaskEventDetailForMessaging({
    request,
    companyId,
    eventId,
  })
  const lastActivityAt = new Date().toISOString()

  /**
   * website 端的人工回复需要直接写回官网会话，并顺手接手同一用户的全部 pending event。
   */
  if (isWebsiteEventPlatform(eventDetail.platform)) {
    const sendResponse = await sendWebsiteEventMessageToWebsiteApi({
      request,
      env,
      companyId,
      currentUser,
      ownerProfile,
      event: eventDetail,
      content: body.content || null,
      missingContentErrorMessage: '发送内容不能为空。',
    })
    const sentMessageId = requireBotMessageId(sendResponse)

    try {
      return await syncWebsiteChannelEventsAfterReply({
        companyId,
        currentEvent: eventDetail,
        currentEventUpdateData: buildSendMessageEventUpdateData({
          event: eventDetail,
          ownerUserId: ownerProfile.userId,
          ownerDisplayName: ownerProfile.displayName,
          ownerAvatarUrl: ownerProfile.avatarUrl,
          sentMessageId,
          lastActivityAt,
        }),
        ownerProfile,
        sentMessageId,
        lastActivityAt,
      })
    } catch (error) {
      if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
        const apiError = error as ApiError
        throw createApiError(
          apiError.status,
          `website 消息已发送，但事件状态更新失败：${apiError.message}`,
        )
      }

      const message = error instanceof Error ? error.message : 'website 事件状态更新失败。'
      throw createApiError(502, `website 消息已发送，但事件状态更新失败：${message}`)
    }
  }

  const sendResponse = await sendEventMessageToInteractionApi({
    request,
    env,
    event: eventDetail,
    content: body.content || null,
    requestId: buildManualReplyRequestId(eventDetail.id),
    missingContentErrorMessage: '发送内容不能为空。',
  })
  const sentMessageId = requireBotMessageId(sendResponse)

  try {
    return await forwardEventUpdateToPlatformApi({
      env,
      eventId,
      updateData: buildSendMessageEventUpdateData({
        event: eventDetail,
        ownerUserId: ownerProfile.userId,
        ownerDisplayName: ownerProfile.displayName,
        ownerAvatarUrl: ownerProfile.avatarUrl,
        sentMessageId,
        lastActivityAt,
      }),
      extraResponseData: {
        messageId: sentMessageId,
      },
    })
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
      const apiError = error as ApiError
      throw createApiError(
        apiError.status,
        `消息已发送，但事件消息链路更新失败：${apiError.message}`,
      )
    }

    const message = error instanceof Error ? error.message : '事件消息链路更新失败。'
    throw createApiError(502, `消息已发送，但事件消息链路更新失败：${message}`)
  }
}

async function handleConfirmEventReply(request: Request, eventId: string): Promise<Response> {
  const body = await parseRequestJson<EventReviewSuggestedReplyBody>(request)
  const reviewDecision = resolveEventSuggestedReplyReviewDecision(body.decision)
  const { companyId, currentUser, env } = await requireEventActionContext(request, body)

  if (reviewDecision === 'reject') {
    return forwardEventUpdateToPlatformApi({
      env,
      eventId,
      updateData: buildRejectSuggestedReplyUpdateData(new Date().toISOString()),
    })
  }

  const ownerProfile = await resolveCurrentUserEventOwnerProfile({
    companyId,
    user: currentUser,
  })
  const eventDetail = await loadAssistTaskEventDetailForMessaging({
    request,
    companyId,
    eventId,
  })
  const confirmedReplyContent = resolveEventSuggestedReplyReviewContent(
    body.content,
    eventDetail.suggested_reply,
  )

  if (isWebsiteEventPlatform(eventDetail.platform)) {
    const sendResponse = await sendWebsiteEventMessageToWebsiteApi({
      request,
      env,
      companyId,
      currentUser,
      ownerProfile,
      event: eventDetail,
      content: confirmedReplyContent,
      missingContentErrorMessage: '事件缺少建议回复内容，无法确认发送。',
    })
    const sentMessageId = requireBotMessageId(sendResponse)
    const lastActivityAt = new Date().toISOString()

    try {
      return await syncWebsiteChannelEventsAfterReply({
        companyId,
        currentEvent: eventDetail,
        currentEventUpdateData: buildConfirmSuggestedReplyEventUpdateData({
          event: eventDetail,
          ownerUserId: ownerProfile.userId,
          ownerDisplayName: ownerProfile.displayName,
          ownerAvatarUrl: ownerProfile.avatarUrl,
          confirmedReplyContent,
          sentMessageId,
          lastActivityAt,
        }),
        ownerProfile,
        sentMessageId,
        lastActivityAt,
      })
    } catch (error) {
      if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
        const apiError = error as ApiError
        throw createApiError(
          apiError.status,
          `website 建议回复已发送，但事件状态更新失败：${apiError.message}`,
        )
      }

      const message = error instanceof Error ? error.message : 'website 事件状态更新失败。'
      throw createApiError(502, `website 建议回复已发送，但事件状态更新失败：${message}`)
    }
  }

  const sendResponse = await sendConfirmedReplyToInteractionApi({
    request,
    env,
    event: eventDetail,
    content: confirmedReplyContent,
  })
  const sentMessageId = requireBotMessageId(sendResponse)

  try {
    /**
     * 只有 bot 发送成功后才确认事件：
     * - 避免 UI 显示“已确认”，但外部平台实际上没有把回复发出去；
     * - 成功后事件应立即落成 `resolved + confirmed`；
     * - 若这里失败，需要明确提示“消息已发，但状态未更新”。
     */
    return await forwardEventUpdateToPlatformApi({
      env,
      eventId,
      updateData: buildConfirmSuggestedReplyEventUpdateData({
        event: eventDetail,
        ownerUserId: ownerProfile.userId,
        ownerDisplayName: ownerProfile.displayName,
        ownerAvatarUrl: ownerProfile.avatarUrl,
        confirmedReplyContent,
        sentMessageId,
        lastActivityAt: new Date().toISOString(),
      }),
      extraResponseData: {
        messageId: sentMessageId,
      },
    })
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
      const apiError = error as ApiError
      throw createApiError(
        apiError.status,
        `建议回复已发送，但事件状态更新失败：${apiError.message}`,
      )
    }

    const message = error instanceof Error ? error.message : '事件状态更新失败。'
    throw createApiError(502, `建议回复已发送，但事件状态更新失败：${message}`)
  }
}

async function handleResolveEvent(request: Request, eventId: string): Promise<Response> {
  const body = await parseRequestJson<EventActionBody>(request)
  const { companyId, currentUser, env } = await requireEventActionContext(request, body)
  const ownerProfile = await resolveCurrentUserEventOwnerProfile({
    companyId,
    user: currentUser,
  })

  return forwardEventUpdateToPlatformApi({
    env,
    eventId,
    updateData: buildResolveEventUpdateData({
      ownerUserId: ownerProfile.userId,
      ownerDisplayName: ownerProfile.displayName,
      ownerAvatarUrl: ownerProfile.avatarUrl,
      lastActivityAt: new Date().toISOString(),
    }),
  })
}

async function handleSaveSupplementalKnowledge(
  request: Request,
  eventId: string,
): Promise<Response> {
  const body = await parseRequestJson<EventSupplementalKnowledgeBody>(request)
  const { env } = await requireEventActionContext(request, body)

  return forwardEventUpdateToPlatformApi({
    env,
    eventId,
    updateData: {
      client_supplemental_knowledge: normalizeOptionalText(
        body.clientSupplementalKnowledge,
      ),
      last_activity_at: new Date().toISOString(),
    },
  })
}

async function handleGetAdoptedKnowledge(request: Request): Promise<Response> {
  const body = await parseRequestJson<GetEventAdoptedKnowledgeBody>(request)
  const companyId = body.companyId?.trim() || ''
  const messageIds = normalizeMessageIds(body.messageIds)
  const platform = body.platform ? normalizeAdoptedKnowledgePlatform(body.platform) : null
  const channelId = normalizeChannelId(body.channelId)

  if (!isUuid(companyId)) {
    throw createApiError(400, 'companyId 非法。')
  }

  if (body.platform && !platform) {
    throw createApiError(400, 'platform 非法。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  if (messageIds.length === 0) {
    return jsonResponse({
      items: [],
    })
  }

  const responseHeaders = new Headers()
  const supabase = createSupabaseServerClientForRequest(request, responseHeaders)
  let query = supabase
    .schema('lucius_agent')
    .from('message')
    .select('message_id, created_at, adopted_knowledge_items')
    .eq('company_id', companyId)
    .in('message_id', messageIds)
    .not('adopted_knowledge_items', 'is', null)

  if (platform) {
    query = query.eq('platform', platform)
  }

  if (channelId) {
    query = query.eq('channel_id', channelId)
  }

  const messageResult = await query.order('created_at', { ascending: true })

  if (messageResult.error) {
    throw createApiError(500, `读取 adopted knowledge 失败：${messageResult.error.message}`)
  }

  const messageOrderById = new Map<string, number>(
    messageIds.map((messageId, index) => [messageId, index]),
  )

  const items = ((messageResult.data || []) as AgentMessageRow[])
    .map((row): EventAdoptedKnowledgeMessage | null => {
      const messageId = (row.message_id || '').trim()
      if (!messageId) {
        return null
      }

      const adoptedKnowledgeItems = normalizeAdoptedKnowledgeItems(row.adopted_knowledge_items)
      if (adoptedKnowledgeItems.length === 0) {
        return null
      }

      return {
        messageId,
        createdAt: row.created_at || null,
        adoptedKnowledgeItems,
      }
    })
    .filter((item): item is EventAdoptedKnowledgeMessage => Boolean(item))
    .sort((leftItem, rightItem) => {
      const leftOrder = messageOrderById.get(leftItem.messageId) ?? Number.MAX_SAFE_INTEGER
      const rightOrder = messageOrderById.get(rightItem.messageId) ?? Number.MAX_SAFE_INTEGER
      return leftOrder - rightOrder
    })

  return jsonResponse({
    items,
  })
}

/**
 * Telegram 头像同域代理：
 * - 浏览器只访问当前应用域名下的 `/api/events/telegram-avatar`；
 * - 当前应用负责成员校验后，再转发到 lucius-api-server 内部头像接口；
 * - 前端始终只消费普通图片 URL，不触达 `avatar_file_id` 或 Bot Token。
 */
async function handleGetTelegramAvatar(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const companyId = requestUrl.searchParams.get('companyId')?.trim() || ''
  const userId = requestUrl.searchParams.get('userId')?.trim() || ''

  if (!isUuid(companyId)) {
    throw createApiError(400, 'companyId 非法。')
  }

  if (!userId) {
    throw createApiError(400, 'userId 不能为空。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  const env = getEventPlatformApiEnvOrNull()
  if (!env) {
    throw createApiError(503, '服务端缺少 CLIENT_CHAT_PLATFORM_API_BASE_URL 配置。')
  }

  const upstreamUrl = buildPlatformApiUrl(
    env.platformApiBaseUrl,
    `/platform-messages/telegram/users/${encodeURIComponent(userId)}/avatar?company_id=${encodeURIComponent(companyId)}`,
  )

  const upstreamResponse = await fetch(upstreamUrl, {
    method: 'GET',
    headers: buildPlatformForwardHeaders(env.internalApiToken),
  })

  if (upstreamResponse.status === 404) {
    return new Response(null, {
      status: 404,
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  }

  if (!upstreamResponse.ok) {
    throw createApiError(502, `Telegram 头像代理失败（${upstreamResponse.status}）。`)
  }

  const contentType = upstreamResponse.headers.get('content-type') || 'application/octet-stream'
  const cacheControl = upstreamResponse.headers.get('cache-control') || 'public, max-age=3600'
  const avatarBytes = await upstreamResponse.arrayBuffer()

  return new Response(avatarBytes, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
    },
  })
}

export async function handleEventApi(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const pathname = requestUrl.pathname
  const method = request.method.toUpperCase()
  const eventActionMatch = /^\/api\/events\/([0-9a-f-]+)\/(take-over|ignore|confirm-reply|send-message|resolve|supplemental-knowledge)$/i.exec(
    pathname,
  )

  try {
    if (pathname === '/api/events/adopted-knowledge' && method === 'POST') {
      return await handleGetAdoptedKnowledge(request)
    }

    if (pathname === '/api/events/telegram-avatar' && method === 'GET') {
      return await handleGetTelegramAvatar(request)
    }

    if (eventActionMatch && method === 'POST') {
      const eventId = eventActionMatch[1]?.trim() || ''
      const actionName = eventActionMatch[2]?.trim().toLowerCase() || ''

      if (!isUuid(eventId)) {
        throw createApiError(400, 'eventId 非法。')
      }

      if (actionName === 'take-over') {
        return await handleTakeOverEvent(request, eventId)
      }

      if (actionName === 'ignore') {
        return await handleIgnoreEvent(request, eventId)
      }

      if (actionName === 'confirm-reply') {
        return await handleConfirmEventReply(request, eventId)
      }

      if (actionName === 'send-message') {
        return await handleSendEventMessage(request, eventId)
      }

      if (actionName === 'resolve') {
        return await handleResolveEvent(request, eventId)
      }

      if (actionName === 'supplemental-knowledge') {
        return await handleSaveSupplementalKnowledge(request, eventId)
      }
    }

    return jsonResponse({ error: 'Not Found' }, 404)
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
      const apiError = error as ApiError
      return jsonResponse({ error: apiError.message }, apiError.status)
    }

    const message = error instanceof Error ? error.message : '事件接口发生未知错误。'
    return jsonResponse({ error: message }, 500)
  }
}

export const __eventApiTestables = {
  buildTakeOverEventUpdateData,
  buildResolveEventUpdateData,
  buildIgnoreEventUpdateData,
  isWebsiteEventPlatform,
  resolveWebsiteEventPlatformValue,
  resolveWebsiteEventReplySessionId,
  buildSendMessageEventUpdateData,
  buildConfirmSuggestedReplyEventUpdateData,
  buildRejectSuggestedReplyUpdateData,
  buildEventMentionMarkup,
  buildMentionedEventReplyContent,
  escapeFeishuMentionDisplayName,
  escapeTelegramHtmlText,
  normalizeTelegramUsername,
  normalizeAdoptedKnowledgePlatform,
  resolveEventSuggestedReplyReviewDecision,
  resolveEventSuggestedReplyReviewContent,
  selectPreferredReplyMessageTarget,
  resolveConfirmedReplySendTarget,
}
