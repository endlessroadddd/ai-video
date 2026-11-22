import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { SupabaseClient } from '@supabase/supabase-js'

import { toReadableEventTypeLabel } from '@/lib/event-type-label'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { m } from '@/paraglide/messages'

export type EventStatusFilter = 'all' | 'pending' | 'processing' | 'resolved' | 'ignored'

export type EventTypeFilter = 'all' | string

export type AssistTaskEventQueryParams = {
  companyId: string
  pageIndex: number
  pageSize: number
  statusFilter: EventStatusFilter
  typeFilter: EventTypeFilter
  keyword: string
}

export type AssistTaskEventCountQueryParams = {
  companyId: string
}

export type AssistTaskEventDetailQueryParams = {
  companyId: string
  eventId: string
}

export type LuciusAgentEventRow = {
  id: string
  title: string
  summary: string | null
  suggested_reply: string | null
  client_supplemental_knowledge: string | null
  context: unknown
  cannot_reply_reason: string
  platform: string
  user_id: string
  channel_id: string
  channel_name: string | null
  owner_user_id: string | null
  owner_display_name: string | null
  owner_avatar_url: string | null
  priority: string | null
  manual_review_required: boolean
  manual_review_status: string | null
  sla_due_at: string | null
  last_activity_at: string | null
  created_at: string | null
  updated_at: string | null
  status: string | null
  event_type: string | null
  message_ids: string[]
  event_user_avatar_url?: string | null
}

export type AssistTaskEventQueryResult = {
  rows: LuciusAgentEventRow[]
  totalCount: number
  timedOutCount: number
  pendingCount: number
  typeOptions: EventTypeOption[]
}

export type EventTypeOption = {
  value: string
  label: string
}

export type AssistTaskEventMessageRole =
  | 'user'
  | 'assistant'
  | 'staff'
  | 'bot'
  | 'lucius'
  | 'admin'
  | 'unknown'

export type AssistTaskEventMessage = {
  platform: string
  messageId: string
  role: AssistTaskEventMessageRole
  authorName: string
  authorAvatarUrl: string | null
  content: string
  sentAt: string | null
}

export type AssistTaskAdoptedKnowledgeItem = {
  name: string
  contentSnapshot: string
  source: string
}

export type AssistTaskEventAdoptedKnowledge = {
  messageId: string
  createdAt: string | null
  adoptedKnowledgeItems: AssistTaskAdoptedKnowledgeItem[]
}

export type AssistTaskEventMessageScope = 'event' | 'website_session'

export type AssistTaskEventMessageQueryParams = {
  companyId: string
  eventId: string
  platform: string
  channelId: string | null
  messageIds: string[]
  scope?: AssistTaskEventMessageScope
}

export type AssistTaskEventAdoptedKnowledgeQueryParams = {
  companyId: string
  eventId: string
  platform: string
  channelId: string | null
  messageIds: string[]
}

type EventTypeRow = {
  event_type?: string | null
}

type EventTypeConfigRow = {
  type_key?: string | null
  type_label?: string | null
}

type SupabaseErrorLike = {
  code?: string | null
  message?: string | null
}

type StatusFilterableQuery<TQuery> = {
  eq: (column: string, value: unknown) => TQuery
  in: (column: string, values: unknown[]) => TQuery
  not: (column: string, operator: string, value: unknown) => TQuery
  or: (filters: string) => TQuery
}

type ApiErrorResponse = {
  error?: string
}

type EventAdoptedKnowledgeApiResponse = {
  items?: AssistTaskEventAdoptedKnowledge[]
}

type SupportedEventPlatform = 'discord' | 'telegram' | 'slack' | 'feishu'
type SupportedEventMessagePlatform = SupportedEventPlatform | 'website'

type PlatformChannelLookupConfig = {
  schemaName: SupportedEventPlatform
  channelIdColumn: 'channel_id' | 'chat_id'
}

type ChannelLookupRow = Record<string, unknown>
type AssistTaskSortableEventStatus = Exclude<EventStatusFilter, 'all'>
type AssistTaskEventStatusCount = {
  status: AssistTaskSortableEventStatus
  count: number
}

type AssistTaskEventPagePlan = {
  status: AssistTaskSortableEventStatus
  rangeStart: number
  rangeEnd: number
}

const UNKNOWN_CHANNEL_NAME_SET = new Set<string>(['未知频道', 'unknown channel', 'unknown', 'n/a', 'none'])
const MAX_PARTICIPANT_AVATAR_COUNT = 3
const ASSIST_TASK_EVENT_STATUS_SORT_ORDER: AssistTaskSortableEventStatus[] = [
  'pending',
  'processing',
  'ignored',
]

const PLATFORM_CHANNEL_LOOKUP_CONFIG: Record<SupportedEventPlatform, PlatformChannelLookupConfig> = {
  discord: {
    schemaName: 'discord',
    channelIdColumn: 'channel_id',
  },
  telegram: {
    schemaName: 'telegram',
    channelIdColumn: 'chat_id',
  },
  slack: {
    schemaName: 'slack',
    channelIdColumn: 'channel_id',
  },
  feishu: {
    schemaName: 'feishu',
    channelIdColumn: 'chat_id',
  },
}

const EVENT_SELECT_COLUMNS = [
  'id',
  'title',
  'summary',
  'suggested_reply',
  'client_supplemental_knowledge',
  'context',
  'cannot_reply_reason',
  'platform',
  'user_id',
  'channel_id',
  'channel_name',
  'owner_user_id',
  'owner_display_name',
  'owner_avatar_url',
  'priority',
  'manual_review_required',
  'manual_review_status',
  'sla_due_at',
  'last_activity_at',
  'created_at',
  'updated_at',
  'status',
  'event_type',
  'message_ids',
].join(',')

export const assistTaskEventKeys = {
  all: ['supabase', 'assist-task-events'] as const,
  list: (params: AssistTaskEventQueryParams) =>
    [
      ...assistTaskEventKeys.all,
      params.companyId,
      params.pageIndex,
      params.pageSize,
      params.statusFilter,
      params.typeFilter,
      params.keyword.trim(),
    ] as const,
  count: (params: AssistTaskEventCountQueryParams) =>
    [...assistTaskEventKeys.all, 'count', params.companyId] as const,
  detail: (params: AssistTaskEventDetailQueryParams) =>
    [...assistTaskEventKeys.all, 'detail', params.companyId, params.eventId] as const,
  detailMessages: (params: AssistTaskEventMessageQueryParams) =>
    [
      ...assistTaskEventKeys.all,
      'detail-messages',
      params.companyId,
      params.eventId,
      params.scope || 'event',
      params.platform.trim().toLowerCase(),
      (params.channelId || '').trim(),
      params.messageIds
        .map((messageId) => messageId.trim())
        .filter(Boolean)
        .join(','),
    ] as const,
  detailAdoptedKnowledge: (params: AssistTaskEventAdoptedKnowledgeQueryParams) =>
    [
      ...assistTaskEventKeys.all,
      'detail-adopted-knowledge',
      params.companyId,
      params.eventId,
      params.platform.trim().toLowerCase(),
      (params.channelId || '').trim(),
      params.messageIds
        .map((messageId) => messageId.trim())
        .filter(Boolean)
        .join(','),
    ] as const,
}

/**
 * 将 Supabase 错误转换为更可读的业务错误：
 * - 当 `lucius_agent` 未暴露给 PostgREST 时，返回明确的操作提示；
 * - 其他错误保持原始 message，便于定位。
 */
function toReadableError(error: SupabaseErrorLike): Error {
  const errorCode = (error.code || '').trim()
  const errorMessage = (error.message || '').trim()

  if (errorCode === 'PGRST106' && errorMessage.includes('Invalid schema: lucius_agent')) {
    return new Error(m.service_event_query_schema_not_exposed())
  }

  if (errorCode === '42501' && errorMessage.toLowerCase().includes('permission denied for schema')) {
    // Supabase 角色缺少 schema 使用权限时，提示明确修复路径，避免用户误以为是网络或前端问题。
    const schemaMatch = /schema\s+([a-z0-9_]+)/i.exec(errorMessage)
    const schemaName = schemaMatch?.[1] || m.common_unknown()

    return new Error(m.service_event_query_schema_permission_denied({ schemaName }))
  }

  return new Error(errorMessage || m.service_event_query_failed())
}

/**
 * 判断 `event_type_config` 是否尚未完成迁移：
 * - 表不存在时不阻断主列表查询，自动回退到 event 表内的去重 type；
 * - 其他错误（权限/网络）保持原始报错，避免静默吞错。
 */
function isMissingEventTypeConfigTableError(error: SupabaseErrorLike): boolean {
  const errorCode = (error.code || '').trim()
  const errorMessage = (error.message || '').trim().toLowerCase()

  if (errorCode === '42P01') {
    return true
  }

  if (errorCode === 'PGRST205' || errorCode === 'PGRST204') {
    return errorMessage.includes('event_type_config')
  }

  return false
}

/**
 * 将输入关键词转成 `ilike` 可用模式：
 * - 逗号会被 Postgrest 视为条件分隔符，这里先替换为空格，避免语法冲突；
 * - 只做最小清洗，不篡改用户搜索语义。
 */
function buildKeywordPattern(keyword: string): string | null {
  const normalizedKeyword = keyword.trim()

  if (!normalizedKeyword) {
    return null
  }

  const sanitizedKeyword = normalizedKeyword.replaceAll(',', ' ')

  if (!sanitizedKeyword.trim()) {
    return null
  }

  return `%${sanitizedKeyword}%`
}

/**
 * 统一拼接模糊搜索条件：
 * - 标题、摘要、频道名、负责人任意命中即可；
 * - 条件字符串集中维护，避免各查询分支遗漏。
 */
function applyKeywordFilter<TQuery extends { or: (filters: string) => TQuery }>(
  query: TQuery,
  keywordPattern: string | null,
): TQuery {
  if (!keywordPattern) {
    return query
  }

  return query.or(
    [
      `title.ilike.${keywordPattern}`,
      `summary.ilike.${keywordPattern}`,
      `channel_name.ilike.${keywordPattern}`,
      `owner_display_name.ilike.${keywordPattern}`,
      `cannot_reply_reason.ilike.${keywordPattern}`,
    ].join(','),
  )
}

/**
 * 统一归一化平台字段：
 * - 仅保留当前业务支持的 4 个平台；
 * - 其余值回退 null，避免补查到错误 schema。
 */
function normalizeEventPlatform(rawPlatform: string): SupportedEventPlatform | null {
  const normalizedPlatform = rawPlatform.trim().toLowerCase()

  if (normalizedPlatform.includes('discord')) return 'discord'
  if (normalizedPlatform.includes('telegram')) return 'telegram'
  if (normalizedPlatform.includes('slack')) return 'slack'
  if (normalizedPlatform.includes('feishu') || normalizedPlatform.includes('lark')) return 'feishu'

  return null
}

/**
 * 详情区消息读取允许比列表 hydration 更多的平台：
 * - 列表补数据逻辑目前只依赖 4 个 IM 平台 schema；
 * - website 消息详情已经落在 `website.message`，因此单独在这里放开支持，
 *   避免把 website 强行塞进频道名/头像补查逻辑里造成额外分支复杂度。
 */
function normalizeEventMessagePlatform(
  rawPlatform: string,
): SupportedEventMessagePlatform | null {
  const normalizedPlatform = normalizeEventPlatform(rawPlatform)
  if (normalizedPlatform) {
    return normalizedPlatform
  }

  if (rawPlatform.trim().toLowerCase().includes('website')) {
    return 'website'
  }

  return null
}

/**
 * 归一化 channel_id/chat_id：
 * - 去掉首尾空白；
 * - 空字符串直接视为无效，避免生成无意义查询条件。
 */
function normalizeChannelId(rawChannelId: string | null | undefined): string | null {
  if (!rawChannelId) {
    return null
  }

  const normalizedChannelId = rawChannelId.trim()
  return normalizedChannelId ? normalizedChannelId : null
}

/**
 * 判断当前 channel_name 是否可直接使用：
 * - 若是“未知频道/unknown”等兜底文案，则继续走平台表补查；
 * - 若已是有效名称，则保留原值，避免额外覆盖。
 */
function hasMeaningfulChannelName(rawChannelName: string | null): boolean {
  const normalizedChannelName = (rawChannelName || '').trim()
  if (!normalizedChannelName) {
    return false
  }

  return !UNKNOWN_CHANNEL_NAME_SET.has(normalizedChannelName.toLowerCase())
}

function buildPlatformChannelLookupKey(platform: SupportedEventPlatform, channelId: string): string {
  return `${platform}:${channelId}`
}

/**
 * 归一化事件里的 message_ids：
 * - 去重并过滤空字符串；
 * - 保留原输入顺序，便于在详情面板里稳定排序。
 */
function normalizeEventMessageIds(rawMessageIds: string[]): string[] {
  const normalizedMessageIds: string[] = []
  const seenMessageIds = new Set<string>()

  rawMessageIds.forEach((rawMessageId) => {
    const messageId = rawMessageId.trim()
    if (!messageId || seenMessageIds.has(messageId)) {
      return
    }

    seenMessageIds.add(messageId)
    normalizedMessageIds.push(messageId)
  })

  return normalizedMessageIds
}

/**
 * 归一化消息角色：
 * - 各平台可能返回 `message_role` 或空值；
 * - 未识别值统一收敛到 `unknown`，由 UI 层统一渲染兜底标签。
 */
function normalizeMessageRole(rawRole: unknown): AssistTaskEventMessageRole {
  if (typeof rawRole !== 'string') {
    return 'unknown'
  }

  const role = rawRole.trim().toLowerCase()

  if (role === 'user') return 'user'
  if (role === 'assistant') return 'assistant'
  if (role === 'staff') return 'staff'
  if (role === 'bot') return 'bot'
  if (role === 'lucius') return 'lucius'
  if (role === 'admin') return 'admin'

  return 'unknown'
}

/**
 * 从结构化 JSON 中提取可读文本：
 * - Feishu `content` 字段经常是 JSON 字符串或嵌套对象；
 * - 先按常见文本 key 查找，再回退遍历对象值，尽量拿到人类可读内容。
 */
function extractTextFromStructuredPayload(payload: unknown): string | null {
  if (typeof payload === 'string') {
    const normalizedText = payload.trim()
    if (!normalizedText) {
      return null
    }

    if ((normalizedText.startsWith('{') && normalizedText.endsWith('}')) ||
      (normalizedText.startsWith('[') && normalizedText.endsWith(']'))) {
      try {
        const parsedPayload = JSON.parse(normalizedText) as unknown
        return extractTextFromStructuredPayload(parsedPayload) || normalizedText
      } catch {
        return normalizedText
      }
    }

    return normalizedText
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const extractedText = extractTextFromStructuredPayload(item)
      if (extractedText) {
        return extractedText
      }
    }
    return null
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>

    const prioritizedKeys = ['text', 'content', 'body', 'plain_text', 'title']
    for (const key of prioritizedKeys) {
      const extractedText = extractTextFromStructuredPayload(record[key])
      if (extractedText) {
        return extractedText
      }
    }

    for (const value of Object.values(record)) {
      const extractedText = extractTextFromStructuredPayload(value)
      if (extractedText) {
        return extractedText
      }
    }
  }

  return null
}

function parseIsoTimeToMs(rawTime: string | null): number | null {
  if (!rawTime) {
    return null
  }

  const parsedTime = Date.parse(rawTime)
  return Number.isNaN(parsedTime) ? null : parsedTime
}

function compareMessageOrder(
  leftMessage: AssistTaskEventMessage,
  rightMessage: AssistTaskEventMessage,
  orderIndexByMessageId: Map<string, number>,
): number {
  const leftTimeMs = parseIsoTimeToMs(leftMessage.sentAt)
  const rightTimeMs = parseIsoTimeToMs(rightMessage.sentAt)

  if (leftTimeMs !== null && rightTimeMs !== null && leftTimeMs !== rightTimeMs) {
    return leftTimeMs - rightTimeMs
  }

  if (leftTimeMs !== null && rightTimeMs === null) {
    return -1
  }

  if (leftTimeMs === null && rightTimeMs !== null) {
    return 1
  }

  const leftOrderIndex = orderIndexByMessageId.get(leftMessage.messageId) ?? Number.MAX_SAFE_INTEGER
  const rightOrderIndex = orderIndexByMessageId.get(rightMessage.messageId) ?? Number.MAX_SAFE_INTEGER

  return leftOrderIndex - rightOrderIndex
}

function resolveMessageContent(rawContent: string | null | undefined): string {
  const content = (rawContent || '').trim()
  return content || m.service_event_query_empty_content()
}

async function parseServerApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiErrorResponse

  if (!response.ok) {
    throw new Error(data.error || m.service_event_detail_request_failed())
  }

  return data
}

type DiscordMessageRow = {
  message_id?: string | null
  author_username?: string | null
  author_id?: string | null
  author_bot?: boolean | null
  content?: string | null
  timestamp?: string | null
  created_at?: string | null
  message_role?: string | null
}

type DiscordUserRow = {
  user_id?: string | null
  avatar_url?: string | null
}

type SlackMessageRow = {
  ts?: string | null
  user_id?: string | null
  team_id?: string | null
  bot_id?: string | null
  text?: string | null
  created_at?: string | null
  message_role?: string | null
}

type SlackUserRow = {
  user_id?: string | null
  team_id?: string | null
  display_name?: string | null
  avatar_url?: string | null
}

type SlackUserProfile = {
  userId: string
  teamId: string | null
  displayName: string | null
  avatarUrl: string | null
}

type TelegramUserRow = {
  user_id?: string | null
  username?: string | null
  first_name?: string | null
  last_name?: string | null
}

type TelegramUserProfile = {
  userId: string
  username: string | null
  firstName: string | null
  lastName: string | null
}

type RecentParticipantAvatarCandidate = {
  eventId: string
  participantKey: string
  avatarUrl: string
  sentAt: string | null
}

type JsonRecord = Record<string, unknown>

type TelegramMessageRow = {
  message_id?: string | null
  sender_user_id?: string | null
  text?: string | null
  caption?: string | null
  date?: string | null
  created_at?: string | null
  message_role?: string | null
}

type FeishuMessageRow = {
  message_id?: string | null
  sender_user_id?: string | null
  sender_open_id?: string | null
  sender_type?: string | null
  text?: string | null
  content?: unknown
  create_time?: string | null
  created_at?: string | null
  message_role?: string | null
}

type FeishuUserRow = {
  user_id?: string | null
  open_id?: string | null
  avatar_url?: string | null
}

type WebsiteSessionRow = {
  id?: string | null
  session_id?: string | null
}

type WebsiteMessageRow = {
  id?: string | null
  session_uuid?: string | null
  content?: string | null
  timestamp?: string | null
  created_at?: string | null
  message_role?: string | null
  raw?: unknown
}

async function fetchDiscordEventMessages(payload: {
  supabase: SupabaseClient
  companyId: string
  channelId: string | null
  messageIds: string[]
}): Promise<AssistTaskEventMessage[]> {
  let query = payload.supabase
    .schema('discord')
    .from('message')
    .select('message_id,author_username,author_id,author_bot,content,timestamp,created_at,message_role')
    .eq('company_id', payload.companyId)
    .in('message_id', payload.messageIds)

  if (payload.channelId) {
    query = query.eq('channel_id', payload.channelId)
  }

  const result = await query

  if (result.error) {
    throw toReadableError(result.error)
  }

  return ((result.data || []) as DiscordMessageRow[])
    .map((row): AssistTaskEventMessage | null => {
      const messageId = (row.message_id || '').trim()
      if (!messageId) {
        return null
      }

      const role = normalizeMessageRole(row.message_role || (row.author_bot ? 'assistant' : 'user'))
      const authorName =
        row.author_username?.trim() ||
        row.author_id?.trim() ||
        (row.author_bot
          ? m.common_lucius_ai_name()
          : role === 'assistant'
            ? m.common_lucius_ai_name()
            : m.common_unknown_user())

      return {
        platform: 'discord',
        messageId,
        role,
        authorName,
        authorAvatarUrl: null,
        content: resolveMessageContent(row.content),
        sentAt: row.timestamp || row.created_at || null,
      }
    })
    .filter((message): message is AssistTaskEventMessage => Boolean(message))
}

/**
 * 归一化可空字符串：
 * - 统一 trim；
 * - 空字符串直接转成 null，便于后续 map key 与兜底逻辑复用。
 */
function normalizeNullableText(value: string | null | undefined): string | null {
  const normalizedValue = (value || '').trim()
  return normalizedValue || null
}

type WebsiteMessageAuthorProfile = {
  userId: string | null
  username: string | null
  avatarUrl: string | null
}

/**
 * 把未知 JSON 载荷转成对象：
 * - `website.message.raw` 正常情况下是 json/jsonb；
 * - 兼容历史数据里被序列化成字符串的情况，避免前端因为格式漂移失去 sender 信息。
 */
function normalizeJsonRecord(value: unknown): JsonRecord | null {
  if (isJsonRecord(value)) {
    return value
  }

  if (typeof value !== 'string') {
    return null
  }

  const normalizedValue = value.trim()
  if (!normalizedValue) {
    return null
  }

  try {
    const parsedValue = JSON.parse(normalizedValue) as unknown
    return isJsonRecord(parsedValue) ? parsedValue : null
  } catch {
    return null
  }
}

/**
 * 解析 website 消息里的发送者资料：
 * - 优先兼容当前 `raw` 顶层结构 `{ user_id, username, avatar_url }`；
 * - 同时兼容常见嵌套包装（`user` / `author` / `sender`），降低后端结构演进带来的前端回归风险。
 */
function resolveWebsiteMessageAuthorProfile(rawPayload: unknown): WebsiteMessageAuthorProfile {
  const rawRecord = normalizeJsonRecord(rawPayload)
  if (!rawRecord) {
    return {
      userId: null,
      username: null,
      avatarUrl: null,
    }
  }

  const candidateRecords: JsonRecord[] = [rawRecord]
  ;['user', 'author', 'sender'].forEach((key) => {
    const nestedRecord = normalizeJsonRecord(rawRecord[key])
    if (nestedRecord) {
      candidateRecords.push(nestedRecord)
    }
  })

  for (const candidateRecord of candidateRecords) {
    const userId = normalizeNullableText(
      typeof candidateRecord.user_id === 'string' ? candidateRecord.user_id : null,
    )
    const username = normalizeNullableText(
      typeof candidateRecord.username === 'string' ? candidateRecord.username : null,
    )
    const avatarUrl = normalizeNullableText(
      typeof candidateRecord.avatar_url === 'string' ? candidateRecord.avatar_url : null,
    )

    if (userId || username || avatarUrl) {
      return {
        userId,
        username,
        avatarUrl,
      }
    }
  }

  return {
    userId: null,
    username: null,
    avatarUrl: null,
  }
}

/**
 * 统一把 website 原始消息行映射成详情区可消费的消息结构：
 * - Website 的作者资料散落在 `raw` JSON 中，因此单独抽 helper，避免 event 级 / session 级两条查询链路重复维护；
 * - 这里保持纯映射，不夹带查询条件，方便后续继续复用。
 */
function mapWebsiteMessageRowsToAssistTaskEventMessages(
  rows: WebsiteMessageRow[],
): AssistTaskEventMessage[] {
  return rows
    .map((row): AssistTaskEventMessage | null => {
      const messageId = (row.id || '').trim()
      if (!messageId) {
        return null
      }

      const role = normalizeMessageRole(row.message_role)
      const isAssistantLike = ['assistant', 'bot', 'lucius', 'staff', 'admin'].includes(role)
      const authorProfile = resolveWebsiteMessageAuthorProfile(row.raw)
      const authorName =
        authorProfile.username ||
        authorProfile.userId ||
        (isAssistantLike ? m.common_lucius_ai_name() : m.common_unknown_user())

      return {
        platform: 'website',
        messageId,
        role,
        authorName,
        authorAvatarUrl: authorProfile.avatarUrl,
        content: resolveMessageContent(row.content),
        sentAt: row.timestamp || row.created_at || null,
      }
    })
    .filter((message): message is AssistTaskEventMessage => Boolean(message))
}

/**
 * 判断一条事件是否应视为“已忽略”：
 * - 真实 `status='ignored'` 直接按已忽略处理；
 * - 兼容后端尚未支持 `ignored` 枚举时写入的 `resolved + rejected` 组合。
 */
function isIgnoredAssistTaskEvent(payload: {
  status: string | null | undefined
  manualReviewStatus: string | null | undefined
}): boolean {
  const normalizedStatus = normalizeNullableText(payload.status)?.toLowerCase() || ''
  const normalizedManualReviewStatus =
    normalizeNullableText(payload.manualReviewStatus)?.toLowerCase() || ''

  if (normalizedStatus === 'ignored') {
    return true
  }

  return normalizedStatus === 'resolved' && normalizedManualReviewStatus === 'rejected'
}

/**
 * 统一归一化事件状态：
 * - 所有状态统一转小写，避免数据库历史脏值影响前端判断；
 * - `resolved + rejected` 在前端重映射为 `ignored`，与忽略动作语义保持一致。
 */
function normalizeAssistTaskEventStatus(
  status: string | null | undefined,
  manualReviewStatus: string | null | undefined,
): string | null {
  if (isIgnoredAssistTaskEvent({ status, manualReviewStatus })) {
    return 'ignored'
  }

  return normalizeNullableText(status)?.toLowerCase() || null
}

/**
 * 将数据库原始事件行转换为前端稳定可消费的状态表示。
 */
function normalizeAssistTaskEventRow(row: LuciusAgentEventRow): LuciusAgentEventRow {
  const normalizedStatus = normalizeAssistTaskEventStatus(
    row.status,
    row.manual_review_status,
  )

  if (normalizedStatus === row.status) {
    return row
  }

  return {
    ...row,
    status: normalizedStatus,
  }
}

/**
 * 统一应用事件状态筛选：
 * - `ignored` 兼容真实 `ignored` 以及过渡期的 `resolved + rejected`；
 * - 业务展示层的 `taken_over` 当前仍落在后端 `processing`，但历史数据里也可能出现 `resolved`；
 * - 同时要保留 `processing + rejected` 这类“人工自己回复，放弃 suggested reply”的事件，
 *   不能再被误丢进 ignored；
 * - 直接访问旧 `resolved` 筛选值时，也复用同一套兼容逻辑，避免历史链接出现空结果。
 */
function applyAssistTaskEventStatusFilter<TQuery extends StatusFilterableQuery<TQuery>>(
  query: TQuery,
  statusFilter: EventStatusFilter,
): TQuery {
  if (statusFilter === 'all') {
    return query
  }

  if (statusFilter === 'ignored') {
    return query.or(
      [
        'status.eq.ignored',
        'and(status.eq.resolved,manual_review_status.eq.rejected)',
      ].join(','),
    )
  }

  if (statusFilter === 'processing' || statusFilter === 'resolved') {
    return query.or(
      [
        'status.eq.processing',
        'and(status.eq.resolved,manual_review_status.neq.rejected)',
        'and(status.eq.resolved,manual_review_status.is.null)',
      ].join(','),
    )
  }

  return query.eq('status', statusFilter)
}

/**
 * 构造协助任务列表基础查询：
 * - 列表查询与分状态分页查询复用同一套筛选条件，避免条件漂移；
 * - 统一从这里收口 company/type/keyword/status 约束，后续改动只需要维护一处。
 */
function buildAssistTaskEventListQuery(params: {
  supabase: SupabaseClient
  companyId: string
  statusFilter: EventStatusFilter
  typeFilter: EventTypeFilter
  keywordPattern: string | null
}) {
  let query = params.supabase
    .schema('lucius_agent')
    .from('event')
    .select(EVENT_SELECT_COLUMNS, { count: 'exact' })
    .eq('company_id', params.companyId)

  query = applyAssistTaskEventStatusFilter(query, params.statusFilter)

  if (params.typeFilter !== 'all') {
    query = query.eq('event_type', params.typeFilter)
  }

  return applyKeywordFilter(query, params.keywordPattern)
}

/**
 * 构造协助任务计数查询：
 * - `all` 视图需要先拿到各状态分组数量，才能在前端做稳定的分段分页；
 * - 与列表查询共用同一套筛选条件，保证数量和实际列表命中集完全一致。
 */
function buildAssistTaskEventCountQuery(params: {
  supabase: SupabaseClient
  companyId: string
  statusFilter: AssistTaskSortableEventStatus
  typeFilter: EventTypeFilter
  keywordPattern: string | null
}) {
  let query = params.supabase
    .schema('lucius_agent')
    .from('event')
    .select('id', { count: 'exact', head: true })
    .eq('company_id', params.companyId)

  query = applyAssistTaskEventStatusFilter(query, params.statusFilter)

  if (params.typeFilter !== 'all') {
    query = query.eq('event_type', params.typeFilter)
  }

  return applyKeywordFilter(query, params.keywordPattern)
}

/**
 * 依据状态优先级计算当前页应从哪些状态分组中取数据：
 * - `all` 视图不再按单一时间线混排，而是固定为 `pending -> taken_over(processing/resolved) -> ignored`；
 * - 仅生成当前页真正需要的分组 range，避免把整批数据一次性拉回浏览器后再切页。
 */
function buildAssistTaskEventPagePlans(params: {
  statusCounts: AssistTaskEventStatusCount[]
  pageIndex: number
  pageSize: number
}): AssistTaskEventPagePlan[] {
  const plans: AssistTaskEventPagePlan[] = []
  let remainingOffset = params.pageIndex * params.pageSize
  let remainingPageSize = params.pageSize

  for (const statusCount of params.statusCounts) {
    if (statusCount.count <= 0) {
      continue
    }

    if (remainingOffset >= statusCount.count) {
      remainingOffset -= statusCount.count
      continue
    }

    if (remainingPageSize <= 0) {
      break
    }

    const rangeStart = remainingOffset
    const fetchCount = Math.min(statusCount.count - rangeStart, remainingPageSize)

    plans.push({
      status: statusCount.status,
      rangeStart,
      rangeEnd: rangeStart + fetchCount - 1,
    })

    remainingOffset = 0
    remainingPageSize -= fetchCount
  }

  return plans
}

/**
 * 读取 `all` 视图列表并按状态优先级做稳定分页：
 * - PostgREST 只能直接按列排序，无法表达当前业务需要的自定义状态顺序；
 * - 因此先并行拿每个状态分组的数量，再只抓当前页命中的那几段结果；
 * - “已接手”组在这里兼容 `processing + resolved` 两类后端状态；
 * - 每个分组内部仍保持 `created_at desc`，兼顾状态优先级与组内时间线。
 */
async function fetchAssistTaskEventsInStatusOrder(params: {
  supabase: SupabaseClient
  companyId: string
  pageIndex: number
  pageSize: number
  typeFilter: EventTypeFilter
  keywordPattern: string | null
}): Promise<{
  rows: LuciusAgentEventRow[]
  totalCount: number
}> {
  const statusCounts = await Promise.all(
    ASSIST_TASK_EVENT_STATUS_SORT_ORDER.map(async (status) => {
      const countResult = await buildAssistTaskEventCountQuery({
        supabase: params.supabase,
        companyId: params.companyId,
        statusFilter: status,
        typeFilter: params.typeFilter,
        keywordPattern: params.keywordPattern,
      })

      if (countResult.error) {
        throw toReadableError(countResult.error)
      }

      return {
        status,
        count: countResult.count || 0,
      }
    }),
  )

  const totalCount = statusCounts.reduce((sum, statusCount) => sum + statusCount.count, 0)
  const pagePlans = buildAssistTaskEventPagePlans({
    statusCounts,
    pageIndex: params.pageIndex,
    pageSize: params.pageSize,
  })

  if (pagePlans.length === 0) {
    return {
      rows: [],
      totalCount,
    }
  }

  const rowGroups = await Promise.all(
    pagePlans.map(async (plan) => {
      const listResult = await buildAssistTaskEventListQuery({
        supabase: params.supabase,
        companyId: params.companyId,
        statusFilter: plan.status,
        typeFilter: params.typeFilter,
        keywordPattern: params.keywordPattern,
      })
        .order('created_at', { ascending: false })
        .range(plan.rangeStart, plan.rangeEnd)

      if (listResult.error) {
        throw toReadableError(listResult.error)
      }

      return ((listResult.data || []) as unknown) as LuciusAgentEventRow[]
    }),
  )

  return {
    rows: rowGroups.flat(),
    totalCount,
  }
}

/**
 * 构造 Telegram 头像代理 URL：
 * - 头像真实下载由服务端代理完成；
 * - 浏览器端只消费同域图片地址，不接触 Telegram `file_id` / token。
 */
function buildTelegramAvatarProxyUrl(payload: {
  companyId: string
  userId: string
}): string {
  const searchParams = new URLSearchParams({
    companyId: payload.companyId,
    userId: payload.userId,
  })

  return `/api/events/telegram-avatar?${searchParams.toString()}`
}

/**
 * 将 `telegram.user` 记录转换为统一资料结构：
 * - `user_id` 为空时直接丢弃，避免写入无效 map key；
 * - 其它文本字段统一走 trim，后续名称解析可以直接复用。
 */
function mapTelegramUserRowToProfile(row: TelegramUserRow): TelegramUserProfile | null {
  const userId = normalizeNullableText(row.user_id)
  if (!userId) {
    return null
  }

  return {
    userId,
    username: normalizeNullableText(row.username),
    firstName: normalizeNullableText(row.first_name),
    lastName: normalizeNullableText(row.last_name),
  }
}

/**
 * 批量读取 Telegram 用户资料：
 * - 只按当前事件涉及到的 `sender_user_id` 补查，避免无意义全表扫描；
 * - 查询失败不阻断主流程，作者名继续回退到现有字段。
 */
async function fetchTelegramUserProfileMap(payload: {
  supabase: SupabaseClient
  companyId: string
  rows: TelegramMessageRow[]
}): Promise<Map<string, TelegramUserProfile>> {
  const userIds = Array.from(
    new Set(
      payload.rows
        .map((row) => normalizeNullableText(row.sender_user_id))
        .filter((userId): userId is string => Boolean(userId)),
    ),
  )

  if (userIds.length === 0) {
    return new Map<string, TelegramUserProfile>()
  }

  const lookupResult = await payload.supabase
    .schema('telegram')
    .from('user')
    .select('user_id,username,first_name,last_name')
    .eq('company_id', payload.companyId)
    .in('user_id', userIds)

  if (lookupResult.error) {
    return new Map<string, TelegramUserProfile>()
  }

  const profileMap = new Map<string, TelegramUserProfile>()

  ;((lookupResult.data || []) as TelegramUserRow[]).forEach((row) => {
    const profile = mapTelegramUserRowToProfile(row)
    if (!profile) {
      return
    }

    profileMap.set(profile.userId, profile)
  })

  return profileMap
}

/**
 * 统一生成 Telegram 作者展示名：
 * - 机器人/助手消息固定显示 `Lucius AI`，避免 bot `user_id` 泄露到界面；
 * - 用户消息优先展示 `telegram.user.username`，再退回姓名，最后才退回 `sender_user_id`。
 */
function resolveTelegramAuthorName(payload: {
  role: AssistTaskEventMessageRole
  telegramUserProfile: TelegramUserProfile | null
  fallbackUserId: string | null
}): string {
  if (payload.role === 'assistant' || payload.role === 'bot' || payload.role === 'lucius') {
    return m.common_lucius_ai_name()
  }

  const username = payload.telegramUserProfile?.username
  if (username) {
    return username
  }

  const fullName = [payload.telegramUserProfile?.firstName, payload.telegramUserProfile?.lastName]
    .filter((part): part is string => Boolean(part))
    .join(' ')
    .trim()
  if (fullName) {
    return fullName
  }

  return payload.fallbackUserId || m.common_unknown_user()
}

function buildSlackUserLookupKey(userId: string, teamId: string | null): string {
  return `${teamId || '__no_team__'}:${userId}`
}

function mapSlackUserRowToProfile(row: SlackUserRow): SlackUserProfile | null {
  const userId = normalizeNullableText(row.user_id)
  if (!userId) {
    return null
  }

  return {
    userId,
    teamId: normalizeNullableText(row.team_id),
    displayName: normalizeNullableText(row.display_name),
    avatarUrl: normalizeNullableText(row.avatar_url),
  }
}

/**
 * 读取 Slack 用户资料补充消息作者信息：
 * - 头像来源固定取 `slack.user.avatar_url`；
 * - 优先用 `user_id + team_id` 精确匹配，兼容多 workspace；
 * - 该补查只增强展示，不应因为头像查询失败而阻断消息主流程。
 */
async function fetchSlackUserProfileMaps(payload: {
  supabase: SupabaseClient
  companyId: string
  rows: SlackMessageRow[]
}): Promise<{
  exactProfileMap: Map<string, SlackUserProfile>
  fallbackProfileMap: Map<string, SlackUserProfile>
}> {
  const userIds = Array.from(
    new Set(
      payload.rows
        .map((row) => normalizeNullableText(row.user_id))
        .filter((userId): userId is string => Boolean(userId)),
    ),
  )

  if (userIds.length === 0) {
    return {
      exactProfileMap: new Map<string, SlackUserProfile>(),
      fallbackProfileMap: new Map<string, SlackUserProfile>(),
    }
  }

  const lookupResult = await payload.supabase
    .schema('slack')
    .from('user')
    .select('user_id,team_id,display_name,avatar_url')
    .eq('company_id', payload.companyId)
    .in('user_id', userIds)

  if (lookupResult.error) {
    return {
      exactProfileMap: new Map<string, SlackUserProfile>(),
      fallbackProfileMap: new Map<string, SlackUserProfile>(),
    }
  }

  const exactProfileMap = new Map<string, SlackUserProfile>()
  const fallbackProfileMap = new Map<string, SlackUserProfile>()

  ;((lookupResult.data || []) as SlackUserRow[]).forEach((row) => {
    const profile = mapSlackUserRowToProfile(row)
    if (!profile) {
      return
    }

    exactProfileMap.set(buildSlackUserLookupKey(profile.userId, profile.teamId), profile)
    if (!fallbackProfileMap.has(profile.userId)) {
      fallbackProfileMap.set(profile.userId, profile)
    }
  })

  return {
    exactProfileMap,
    fallbackProfileMap,
  }
}

function resolveSlackUserProfile(
  profileMaps: {
    exactProfileMap: Map<string, SlackUserProfile>
    fallbackProfileMap: Map<string, SlackUserProfile>
  },
  userId: string | null | undefined,
  teamId: string | null | undefined,
): SlackUserProfile | null {
  const normalizedUserId = normalizeNullableText(userId)
  if (!normalizedUserId) {
    return null
  }

  const normalizedTeamId = normalizeNullableText(teamId)
  const exactProfile = profileMaps.exactProfileMap.get(
    buildSlackUserLookupKey(normalizedUserId, normalizedTeamId),
  )

  if (exactProfile) {
    return exactProfile
  }

  return profileMaps.fallbackProfileMap.get(normalizedUserId) || null
}

/**
 * 为 Discord 事件用户补齐头像：
 * - 直接使用 `discord.user.avatar_url`；
 * - 查询失败时返回空映射，不阻断主列表。
 */
async function fetchDiscordEventUserAvatarMap(payload: {
  supabase: SupabaseClient
  companyId: string
  userIds: string[]
}): Promise<Map<string, string>> {
  const normalizedUserIds = Array.from(
    new Set(payload.userIds.map((userId) => normalizeNullableText(userId)).filter((userId): userId is string => Boolean(userId))),
  )

  if (normalizedUserIds.length === 0) {
    return new Map<string, string>()
  }

  const lookupResult = await payload.supabase
    .schema('discord')
    .from('user')
    .select('user_id,avatar_url')
    .eq('company_id', payload.companyId)
    .in('user_id', normalizedUserIds)

  if (lookupResult.error) {
    return new Map<string, string>()
  }

  const avatarMap = new Map<string, string>()

  ;((lookupResult.data || []) as DiscordUserRow[]).forEach((row) => {
    const userId = normalizeNullableText(row.user_id)
    const avatarUrl = normalizeNullableText(row.avatar_url)

    if (!userId || !avatarUrl || avatarMap.has(userId)) {
      return
    }

    avatarMap.set(userId, avatarUrl)
  })

  return avatarMap
}

/**
 * 为 Slack 事件用户补齐头像：
 * - 复用现有用户资料解析逻辑，保持 team 级别兜底行为一致；
 * - 当前事件行没有 team_id，因此统一走 user_id 维度的回退匹配。
 */
async function fetchSlackEventUserAvatarMap(payload: {
  supabase: SupabaseClient
  companyId: string
  userIds: string[]
}): Promise<Map<string, string>> {
  const normalizedUserIds = Array.from(
    new Set(payload.userIds.map((userId) => normalizeNullableText(userId)).filter((userId): userId is string => Boolean(userId))),
  )

  if (normalizedUserIds.length === 0) {
    return new Map<string, string>()
  }

  const profileMaps = await fetchSlackUserProfileMaps({
    supabase: payload.supabase,
    companyId: payload.companyId,
    rows: normalizedUserIds.map((userId) => ({
      user_id: userId,
      team_id: null,
    })),
  })

  const avatarMap = new Map<string, string>()

  normalizedUserIds.forEach((userId) => {
    const profile = resolveSlackUserProfile(profileMaps, userId, null)
    if (!profile?.avatarUrl) {
      return
    }

    avatarMap.set(userId, profile.avatarUrl)
  })

  return avatarMap
}

/**
 * 为飞书事件用户补齐头像：
 * - `event.user_id` 可能存的是 `user_id` 或 `open_id`；
 * - 因此两种字段都查，并把命中的头像都映射回统一 key。
 */
async function fetchFeishuEventUserAvatarMap(payload: {
  supabase: SupabaseClient
  companyId: string
  userIds: string[]
}): Promise<Map<string, string>> {
  const normalizedUserIds = Array.from(
    new Set(payload.userIds.map((userId) => normalizeNullableText(userId)).filter((userId): userId is string => Boolean(userId))),
  )

  if (normalizedUserIds.length === 0) {
    return new Map<string, string>()
  }

  const [byUserIdResult, byOpenIdResult] = await Promise.all([
    payload.supabase
      .schema('feishu')
      .from('user')
      .select('user_id,open_id,avatar_url')
      .eq('company_id', payload.companyId)
      .in('user_id', normalizedUserIds),
    payload.supabase
      .schema('feishu')
      .from('user')
      .select('user_id,open_id,avatar_url')
      .eq('company_id', payload.companyId)
      .in('open_id', normalizedUserIds),
  ])

  if (byUserIdResult.error || byOpenIdResult.error) {
    return new Map<string, string>()
  }

  const avatarMap = new Map<string, string>()
  const mergeAvatarRow = (row: FeishuUserRow): void => {
    const avatarUrl = normalizeNullableText(row.avatar_url)
    const userId = normalizeNullableText(row.user_id)
    const openId = normalizeNullableText(row.open_id)

    if (!avatarUrl) {
      return
    }

    if (userId && !avatarMap.has(userId)) {
      avatarMap.set(userId, avatarUrl)
    }

    if (openId && !avatarMap.has(openId)) {
      avatarMap.set(openId, avatarUrl)
    }
  }

  ;((byUserIdResult.data || []) as FeishuUserRow[]).forEach(mergeAvatarRow)
  ;((byOpenIdResult.data || []) as FeishuUserRow[]).forEach(mergeAvatarRow)

  return avatarMap
}

function isJsonRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null
}

/**
 * 从事件 context 中提取参与者头像 URL：
 * - 与列表页提取逻辑保持同一批 key，避免同一事件在列表/服务层表现不一致；
 * - 统一去重并限制最大数量，后续可以直接用于“是否还需要补齐头像”的判断。
 */
function extractParticipantAvatarUrlsFromContext(context: unknown): string[] {
  if (!isJsonRecord(context)) {
    return []
  }

  const avatarUrlSet = new Set<string>()
  const directAvatarKeys = ['participant_avatar_urls', 'participantAvatars', 'avatars']

  for (const key of directAvatarKeys) {
    const rawValue = context[key]
    if (!Array.isArray(rawValue)) {
      continue
    }

    rawValue.forEach((item) => {
      if (typeof item === 'string' && item.trim()) {
        avatarUrlSet.add(item.trim())
      }
    })
  }

  const participants = context.participants
  if (Array.isArray(participants)) {
    participants.forEach((participant) => {
      if (!isJsonRecord(participant)) {
        return
      }

      ;[participant.avatar_url, participant.avatarUrl].forEach((avatarUrl) => {
        if (typeof avatarUrl === 'string' && avatarUrl.trim()) {
          avatarUrlSet.add(avatarUrl.trim())
        }
      })
    })
  }

  return Array.from(avatarUrlSet).slice(0, MAX_PARTICIPANT_AVATAR_COUNT)
}

/**
 * 判断事件 context 是否已经包含至少一个可用参与者头像：
 * - 单头像兜底逻辑只在完全缺失头像时运行；
 * - 已有头像时优先保留，避免覆盖后端写入的现成结果。
 */
function hasParticipantAvatarInContext(context: unknown): boolean {
  return extractParticipantAvatarUrlsFromContext(context).length > 0
}

/**
 * 判断事件 context 是否还需要继续补充头像：
 * - 头像列设计最多展示 3 个；
 * - 只有不足 3 个时才继续回查最近消息，控制查询成本。
 */
function needsMoreParticipantAvatars(context: unknown): boolean {
  return extractParticipantAvatarUrlsFromContext(context).length < MAX_PARTICIPANT_AVATAR_COUNT
}

/**
 * 将补查到的一组头像合并回事件 context：
 * - 统一写到 `participant_avatar_urls`，复用现有列表渲染逻辑；
 * - 新补到的“最近头像”优先放前面，旧头像作为兜底保留在后面；
 * - 最多保留 3 个，避免事件列表横向布局被挤压。
 */
function appendParticipantAvatarUrlsToContext(
  context: unknown,
  avatarUrls: string[],
): unknown {
  const normalizedAvatarUrls = avatarUrls
    .map((avatarUrl) => avatarUrl.trim())
    .filter(Boolean)

  if (normalizedAvatarUrls.length === 0) {
    return context
  }

  const baseContext: JsonRecord = isJsonRecord(context) ? context : {}
  const mergedAvatarUrls: string[] = []
  const seenAvatarUrls = new Set<string>()

  ;[...normalizedAvatarUrls, ...extractParticipantAvatarUrlsFromContext(baseContext)].forEach((avatarUrl) => {
    if (seenAvatarUrls.has(avatarUrl)) {
      return
    }

    seenAvatarUrls.add(avatarUrl)
    mergedAvatarUrls.push(avatarUrl)
  })

  return {
    ...baseContext,
    participant_avatar_urls: mergedAvatarUrls.slice(0, MAX_PARTICIPANT_AVATAR_COUNT),
  }
}

/**
 * 判断消息角色是否代表“真实聊天用户”：
 * - 列表头像只展示最近聊天用户，不展示 Lucius / bot / staff 等内部角色；
 * - `unknown` 保留为用户候选，兼容历史消息缺失 `message_role` 的情况。
 */
function shouldUseRoleAsParticipant(role: AssistTaskEventMessageRole): boolean {
  return !['assistant', 'bot', 'lucius', 'staff', 'admin'].includes(role)
}

/**
 * 按消息时间倒序生成“最近聊天用户头像”：
 * - 先按 sentAt 倒序，保证越新的用户越靠前；
 * - 同一用户只保留最近一次，避免群里连续刷屏时头像重复。
 */
function buildRecentParticipantAvatarMap(
  candidates: RecentParticipantAvatarCandidate[],
): Map<string, string[]> {
  const candidateMap = new Map<string, RecentParticipantAvatarCandidate[]>()

  candidates.forEach((candidate) => {
    const existingCandidates = candidateMap.get(candidate.eventId) || []
    existingCandidates.push(candidate)
    candidateMap.set(candidate.eventId, existingCandidates)
  })

  const avatarMap = new Map<string, string[]>()

  candidateMap.forEach((eventCandidates, eventId) => {
    const sortedCandidates = [...eventCandidates].sort((leftCandidate, rightCandidate) => {
      const leftTimeMs = parseIsoTimeToMs(leftCandidate.sentAt)
      const rightTimeMs = parseIsoTimeToMs(rightCandidate.sentAt)

      if (leftTimeMs !== null && rightTimeMs !== null && leftTimeMs !== rightTimeMs) {
        return rightTimeMs - leftTimeMs
      }

      if (leftTimeMs !== null && rightTimeMs === null) {
        return -1
      }

      if (leftTimeMs === null && rightTimeMs !== null) {
        return 1
      }

      return 0
    })

    const recentAvatarUrls: string[] = []
    const seenParticipantKeys = new Set<string>()

    sortedCandidates.forEach((candidate) => {
      if (
        seenParticipantKeys.has(candidate.participantKey) ||
        recentAvatarUrls.length >= MAX_PARTICIPANT_AVATAR_COUNT
      ) {
        return
      }

      seenParticipantKeys.add(candidate.participantKey)
      recentAvatarUrls.push(candidate.avatarUrl)
    })

    if (recentAvatarUrls.length > 0) {
      avatarMap.set(eventId, recentAvatarUrls)
    }
  })

  return avatarMap
}

/**
 * 为 Slack 事件列表补齐最近聊天用户头像：
 * - 基于 `event.message_ids -> slack.message.ts` 批量回查，避免每行单独请求；
 * - 只选非助手角色，并按最近发言时间保留最多 3 个唯一用户头像。
 */
async function hydrateRowsWithSlackRecentParticipantAvatars(payload: {
  supabase: SupabaseClient
  companyId: string
  rows: LuciusAgentEventRow[]
}): Promise<LuciusAgentEventRow[]> {
  const slackRows = payload.rows.filter((row) => {
    return normalizeEventPlatform(row.platform) === 'slack' && needsMoreParticipantAvatars(row.context)
  })

  if (slackRows.length === 0) {
    return payload.rows
  }

  const messageIds = Array.from(
    new Set(
      slackRows.flatMap((row) => normalizeEventMessageIds(row.message_ids)),
    ),
  )

  if (messageIds.length === 0) {
    return payload.rows
  }

  const messageResult = await payload.supabase
    .schema('slack')
    .from('message')
    .select('ts,user_id,team_id,bot_id,created_at,message_role')
    .eq('company_id', payload.companyId)
    .in('ts', messageIds)

  if (messageResult.error) {
    return payload.rows
  }

  const slackMessageRows = (messageResult.data || []) as SlackMessageRow[]
  if (slackMessageRows.length === 0) {
    return payload.rows
  }

  const slackUserProfileMaps = await fetchSlackUserProfileMaps({
    supabase: payload.supabase,
    companyId: payload.companyId,
    rows: slackMessageRows,
  })

  const messageRowsById = new Map<string, SlackMessageRow[]>()
  slackMessageRows.forEach((row) => {
    const messageId = normalizeNullableText(row.ts)
    if (!messageId) {
      return
    }

    const existingRows = messageRowsById.get(messageId) || []
    existingRows.push(row)
    messageRowsById.set(messageId, existingRows)
  })

  const candidates: RecentParticipantAvatarCandidate[] = []

  slackRows.forEach((eventRow) => {
    normalizeEventMessageIds(eventRow.message_ids).forEach((messageId) => {
      const matchedRows = messageRowsById.get(messageId) || []

      matchedRows.forEach((messageRow) => {
        const role = normalizeMessageRole(messageRow.message_role || (messageRow.bot_id ? 'assistant' : 'user'))
        if (!shouldUseRoleAsParticipant(role)) {
          return
        }

        const userId = normalizeNullableText(messageRow.user_id)
        if (!userId) {
          return
        }

        const profile = resolveSlackUserProfile(slackUserProfileMaps, messageRow.user_id, messageRow.team_id)
        if (!profile?.avatarUrl) {
          return
        }

        candidates.push({
          eventId: eventRow.id,
          participantKey: buildSlackUserLookupKey(userId, profile.teamId),
          avatarUrl: profile.avatarUrl,
          sentAt: messageRow.created_at || null,
        })
      })
    })
  })

  const recentAvatarMap = buildRecentParticipantAvatarMap(candidates)

  return payload.rows.map((row) => {
    const recentAvatarUrls = recentAvatarMap.get(row.id)
    if (!recentAvatarUrls || recentAvatarUrls.length === 0) {
      return row
    }

    return {
      ...row,
      context: appendParticipantAvatarUrlsToContext(row.context, recentAvatarUrls),
    }
  })
}

/**
 * 为 Telegram 事件列表补齐最近聊天用户头像：
 * - 基于 `event.message_ids -> telegram.message.message_id` 批量回查；
 * - 头像仍通过同域代理地址渲染，不把 Telegram 资源信息暴露给浏览器。
 */
async function hydrateRowsWithTelegramRecentParticipantAvatars(payload: {
  supabase: SupabaseClient
  companyId: string
  rows: LuciusAgentEventRow[]
}): Promise<LuciusAgentEventRow[]> {
  const telegramRows = payload.rows.filter((row) => {
    return normalizeEventPlatform(row.platform) === 'telegram' && needsMoreParticipantAvatars(row.context)
  })

  if (telegramRows.length === 0) {
    return payload.rows
  }

  const messageIds = Array.from(
    new Set(
      telegramRows.flatMap((row) => normalizeEventMessageIds(row.message_ids)),
    ),
  )

  if (messageIds.length === 0) {
    return payload.rows
  }

  const messageResult = await payload.supabase
    .schema('telegram')
    .from('message')
    .select('message_id,sender_user_id,date,created_at,message_role')
    .eq('company_id', payload.companyId)
    .in('message_id', messageIds)

  if (messageResult.error) {
    return payload.rows
  }

  const telegramMessageRows = (messageResult.data || []) as TelegramMessageRow[]
  if (telegramMessageRows.length === 0) {
    return payload.rows
  }

  const messageRowsById = new Map<string, TelegramMessageRow[]>()
  telegramMessageRows.forEach((row) => {
    const messageId = normalizeNullableText(row.message_id)
    if (!messageId) {
      return
    }

    const existingRows = messageRowsById.get(messageId) || []
    existingRows.push(row)
    messageRowsById.set(messageId, existingRows)
  })

  const candidates: RecentParticipantAvatarCandidate[] = []

  telegramRows.forEach((eventRow) => {
    normalizeEventMessageIds(eventRow.message_ids).forEach((messageId) => {
      const matchedRows = messageRowsById.get(messageId) || []

      matchedRows.forEach((messageRow) => {
        const role = normalizeMessageRole(messageRow.message_role)
        if (!shouldUseRoleAsParticipant(role)) {
          return
        }

        const telegramUserId = normalizeNullableText(messageRow.sender_user_id)
        if (!telegramUserId) {
          return
        }

        candidates.push({
          eventId: eventRow.id,
          participantKey: telegramUserId,
          avatarUrl: buildTelegramAvatarProxyUrl({
            companyId: payload.companyId,
            userId: telegramUserId,
          }),
          sentAt: messageRow.date || messageRow.created_at || null,
        })
      })
    })
  })

  const recentAvatarMap = buildRecentParticipantAvatarMap(candidates)

  return payload.rows.map((row) => {
    const recentAvatarUrls = recentAvatarMap.get(row.id)
    if (!recentAvatarUrls || recentAvatarUrls.length === 0) {
      return row
    }

    return {
      ...row,
      context: appendParticipantAvatarUrlsToContext(row.context, recentAvatarUrls),
    }
  })
}

/**
 * 为 Slack 事件列表补齐参与者头像：
 * - 优先使用事件本身已写入的 context 头像；
 * - 缺失时回退到 `slack.user.avatar_url`，让列表与详情保持一致。
 */
async function hydrateRowsWithSlackParticipantAvatar(payload: {
  supabase: SupabaseClient
  companyId: string
  rows: LuciusAgentEventRow[]
}): Promise<LuciusAgentEventRow[]> {
  const slackRows = payload.rows.filter((row) => {
    return (
      normalizeEventPlatform(row.platform) === 'slack' &&
      !hasParticipantAvatarInContext(row.context) &&
      Boolean(normalizeNullableText(row.user_id))
    )
  })

  if (slackRows.length === 0) {
    return payload.rows
  }

  const slackUserProfileMaps = await fetchSlackUserProfileMaps({
    supabase: payload.supabase,
    companyId: payload.companyId,
    rows: slackRows.map((row) => ({
      user_id: row.user_id,
      team_id: null,
    })),
  })

  return payload.rows.map((row) => {
    if (normalizeEventPlatform(row.platform) !== 'slack' || hasParticipantAvatarInContext(row.context)) {
      return row
    }

    const slackUserProfile = resolveSlackUserProfile(slackUserProfileMaps, row.user_id, null)
    if (!slackUserProfile?.avatarUrl) {
      return row
    }

    return {
      ...row,
      context: appendParticipantAvatarUrlsToContext(row.context, [slackUserProfile.avatarUrl]),
    }
  })
}

/**
 * 为 Telegram 事件列表补齐参与者头像：
 * - 列表层只需要一个可渲染的同域 avatar URL；
 * - 真正的 Telegram 文件解析与下载交给 `/api/events/telegram-avatar`。
 */
function hydrateRowsWithTelegramParticipantAvatar(payload: {
  companyId: string
  rows: LuciusAgentEventRow[]
}): LuciusAgentEventRow[] {
  return payload.rows.map((row) => {
    const telegramUserId = normalizeNullableText(row.user_id)

    if (
      normalizeEventPlatform(row.platform) !== 'telegram' ||
      hasParticipantAvatarInContext(row.context) ||
      !telegramUserId
    ) {
      return row
    }

    return {
      ...row,
      context: appendParticipantAvatarUrlsToContext(
        row.context,
        [buildTelegramAvatarProxyUrl({
          companyId: payload.companyId,
          userId: telegramUserId,
        })],
      ),
    }
  })
}

/**
 * 为事件行补齐“事件用户本人头像”：
 * - 列表现在只展示 `event.user_id` 对应用户，不再展示最近参与者集合；
 * - 各平台查询失败时仅回退为 null，不影响事件列表主体展示。
 */
async function hydrateRowsWithEventUserAvatar(payload: {
  supabase: SupabaseClient
  companyId: string
  rows: LuciusAgentEventRow[]
}): Promise<LuciusAgentEventRow[]> {
  const discordUserIds = new Set<string>()
  const slackUserIds = new Set<string>()
  const feishuUserIds = new Set<string>()

  payload.rows.forEach((row) => {
    const eventUserId = normalizeNullableText(row.user_id)
    const platform = normalizeEventPlatform(row.platform)

    if (!eventUserId || !platform) {
      return
    }

    if (platform === 'discord') {
      discordUserIds.add(eventUserId)
      return
    }

    if (platform === 'slack') {
      slackUserIds.add(eventUserId)
      return
    }

    if (platform === 'feishu') {
      feishuUserIds.add(eventUserId)
    }
  })

  const [discordAvatarMap, slackAvatarMap, feishuAvatarMap] = await Promise.all([
    fetchDiscordEventUserAvatarMap({
      supabase: payload.supabase,
      companyId: payload.companyId,
      userIds: Array.from(discordUserIds),
    }),
    fetchSlackEventUserAvatarMap({
      supabase: payload.supabase,
      companyId: payload.companyId,
      userIds: Array.from(slackUserIds),
    }),
    fetchFeishuEventUserAvatarMap({
      supabase: payload.supabase,
      companyId: payload.companyId,
      userIds: Array.from(feishuUserIds),
    }),
  ])

  return payload.rows.map((row) => {
    const eventUserId = normalizeNullableText(row.user_id)
    const platform = normalizeEventPlatform(row.platform)

    if (!eventUserId || !platform) {
      return row
    }

    let eventUserAvatarUrl: string | null = null

    if (platform === 'telegram') {
      eventUserAvatarUrl = buildTelegramAvatarProxyUrl({
        companyId: payload.companyId,
        userId: eventUserId,
      })
    } else if (platform === 'discord') {
      eventUserAvatarUrl = discordAvatarMap.get(eventUserId) || null
    } else if (platform === 'slack') {
      eventUserAvatarUrl = slackAvatarMap.get(eventUserId) || null
    } else if (platform === 'feishu') {
      eventUserAvatarUrl = feishuAvatarMap.get(eventUserId) || null
    }

    return {
      ...row,
      event_user_avatar_url: eventUserAvatarUrl,
    }
  })
}

async function fetchSlackEventMessages(payload: {
  supabase: SupabaseClient
  companyId: string
  channelId: string | null
  messageIds: string[]
}): Promise<AssistTaskEventMessage[]> {
  const baseQuery = payload.supabase
    .schema('slack')
    .from('message')
    .select('ts,user_id,team_id,bot_id,text,created_at,message_role')
    .eq('company_id', payload.companyId)
    .in('ts', payload.messageIds)

  const result = payload.channelId
    ? await baseQuery.eq('channel_id', payload.channelId)
    : await baseQuery

  if (result.error) {
    throw toReadableError(result.error)
  }

  /**
   * Slack 事件 message_id 映射规则：
   * - `event.message_ids` 对应 `slack.message.ts`（例如 `1772008626.584339`）；
   * - 若 `channel_id` 和历史消息不一致，会导致首轮查询为空，降级为仅按 ts 查询一次。
   */
  let rawRows = (result.data || []) as SlackMessageRow[]
  if (payload.channelId && rawRows.length === 0) {
    const fallbackResult = await payload.supabase
      .schema('slack')
      .from('message')
      .select('ts,user_id,team_id,bot_id,text,created_at,message_role')
      .eq('company_id', payload.companyId)
      .in('ts', payload.messageIds)

    if (fallbackResult.error) {
      throw toReadableError(fallbackResult.error)
    }

    rawRows = (fallbackResult.data || []) as SlackMessageRow[]
  }

  const slackUserProfileMaps = await fetchSlackUserProfileMaps({
    supabase: payload.supabase,
    companyId: payload.companyId,
    rows: rawRows,
  })

  return rawRows
    .map((row): AssistTaskEventMessage | null => {
      const messageId = (row.ts || '').trim()
      if (!messageId) {
        return null
      }

      const role = normalizeMessageRole(row.message_role || (row.bot_id ? 'assistant' : 'user'))
      const slackUserProfile = resolveSlackUserProfile(
        slackUserProfileMaps,
        row.user_id,
        row.team_id,
      )
      const authorName =
        slackUserProfile?.displayName ||
        row.user_id?.trim() ||
        row.bot_id?.trim() ||
        (role === 'assistant' || role === 'bot'
          ? m.common_lucius_ai_name()
          : m.common_unknown_user())

      return {
        platform: 'slack',
        messageId,
        role,
        authorName,
        authorAvatarUrl: slackUserProfile?.avatarUrl || null,
        content: resolveMessageContent(row.text),
        sentAt: row.created_at || null,
      }
    })
    .filter((message): message is AssistTaskEventMessage => Boolean(message))
}

async function fetchTelegramEventMessages(payload: {
  supabase: SupabaseClient
  companyId: string
  channelId: string | null
  messageIds: string[]
}): Promise<AssistTaskEventMessage[]> {
  let query = payload.supabase
    .schema('telegram')
    .from('message')
    .select('message_id,sender_user_id,text,caption,date,created_at,message_role')
    .eq('company_id', payload.companyId)
    .in('message_id', payload.messageIds)

  if (payload.channelId) {
    query = query.eq('chat_id', payload.channelId)
  }

  const result = await query

  if (result.error) {
    throw toReadableError(result.error)
  }

  const telegramRows = (result.data || []) as TelegramMessageRow[]
  const telegramUserProfileMap = await fetchTelegramUserProfileMap({
    supabase: payload.supabase,
    companyId: payload.companyId,
    rows: telegramRows,
  })

  return telegramRows
    .map((row): AssistTaskEventMessage | null => {
      const messageId = (row.message_id || '').trim()
      if (!messageId) {
        return null
      }

      const role = normalizeMessageRole(row.message_role)
      const messageContent = row.text?.trim() || row.caption?.trim() || ''
      const telegramUserId = normalizeNullableText(row.sender_user_id)
      const telegramUserProfile = telegramUserId ? telegramUserProfileMap.get(telegramUserId) || null : null
      const authorName = resolveTelegramAuthorName({
        role,
        telegramUserProfile,
        fallbackUserId: telegramUserId,
      })

      return {
        platform: 'telegram',
        messageId,
        role,
        authorName,
        authorAvatarUrl: telegramUserId
          ? buildTelegramAvatarProxyUrl({
              companyId: payload.companyId,
              userId: telegramUserId,
            })
          : null,
        content: resolveMessageContent(messageContent),
        sentAt: row.date || row.created_at || null,
      }
    })
    .filter((message): message is AssistTaskEventMessage => Boolean(message))
}

async function fetchFeishuEventMessages(payload: {
  supabase: SupabaseClient
  companyId: string
  channelId: string | null
  messageIds: string[]
}): Promise<AssistTaskEventMessage[]> {
  let query = payload.supabase
    .schema('feishu')
    .from('message')
    .select('message_id,sender_user_id,sender_open_id,sender_type,text,content,create_time,created_at,message_role')
    .eq('company_id', payload.companyId)
    .in('message_id', payload.messageIds)

  if (payload.channelId) {
    query = query.eq('chat_id', payload.channelId)
  }

  const result = await query

  if (result.error) {
    throw toReadableError(result.error)
  }

  return ((result.data || []) as FeishuMessageRow[])
    .map((row): AssistTaskEventMessage | null => {
      const messageId = (row.message_id || '').trim()
      if (!messageId) {
        return null
      }

      const role = normalizeMessageRole(
        row.message_role ||
        (row.sender_type?.trim().toLowerCase() === 'bot' ? 'assistant' : 'user'),
      )
      const messageContent =
        row.text?.trim() ||
        extractTextFromStructuredPayload(row.content) ||
        ''

      const authorName =
        row.sender_user_id?.trim() ||
        row.sender_open_id?.trim() ||
        (role === 'assistant' || role === 'bot'
          ? m.common_lucius_ai_name()
          : m.common_unknown_user())

      return {
        platform: 'feishu',
        messageId,
        role,
        authorName,
        authorAvatarUrl: null,
        content: resolveMessageContent(messageContent),
        sentAt: row.create_time || row.created_at || null,
      }
    })
    .filter((message): message is AssistTaskEventMessage => Boolean(message))
}

async function fetchWebsiteEventMessages(payload: {
  supabase: SupabaseClient
  companyId: string
  messageIds: string[]
  websiteSessionId: string | null
  scope: AssistTaskEventMessageScope
}): Promise<AssistTaskEventMessage[]> {
  /**
   * Website 进入人工接手后，详情区需要切到整段官网会话时间线：
   * - `event.channel_id` 现在保存的是 `website.session.session_id` 这个外部会话键；
   * - `website.message` 真实关联的是 `session_uuid -> website.session.id`；
   * - 因此前端要先把外部 session_id 解析成内部 session UUID，再按整段会话取消息。
   *
   * 如果会话反查失败，则回退到旧的 `event.message_ids` 范围，避免详情直接空白。
   */
  if (payload.scope === 'website_session' && payload.websiteSessionId) {
    const sessionResult = await payload.supabase
      .schema('website')
      .from('session')
      .select('id,session_id')
      .eq('company_id', payload.companyId)
      .eq('session_id', payload.websiteSessionId)
      .limit(1)

    if (sessionResult.error) {
      throw toReadableError(sessionResult.error)
    }

    const sessionUuid = normalizeNullableText(
      ((sessionResult.data || []) as WebsiteSessionRow[])[0]?.id,
    )

    if (sessionUuid) {
      const sessionMessagesResult = await payload.supabase
        .schema('website')
        .from('message')
        .select('id,session_uuid,content,timestamp,created_at,message_role,raw')
        .eq('company_id', payload.companyId)
        .eq('session_uuid', sessionUuid)
        .order('timestamp', { ascending: true })
        .order('created_at', { ascending: true })

      if (sessionMessagesResult.error) {
        throw toReadableError(sessionMessagesResult.error)
      }

      const sessionMessages = mapWebsiteMessageRowsToAssistTaskEventMessages(
        (sessionMessagesResult.data || []) as WebsiteMessageRow[],
      )

      if (sessionMessages.length > 0) {
        return sessionMessages
      }
    }
  }

  const result = await payload.supabase
    .schema('website')
    .from('message')
    .select('id,content,timestamp,created_at,message_role,raw')
    .eq('company_id', payload.companyId)
    .in('id', payload.messageIds)

  if (result.error) {
    throw toReadableError(result.error)
  }

  /**
   * 非接手态仍沿用 event 级消息集合：
   * - 待处理任务只需要展示触发当前协助任务的消息片段；
   * - 继续按 `event.message_ids -> website.message.id` 回查，避免在未接手前把整段站内聊天都摊开。
   */
  return mapWebsiteMessageRowsToAssistTaskEventMessages(
    (result.data || []) as WebsiteMessageRow[],
  )
}

/**
 * 统计“需要补查频道名”的平台+频道 ID：
 * - 仅对 `channel_name` 缺失或兜底值的事件做补查；
 * - 结果按平台去重，减少数据库 round-trip。
 */
function collectChannelIdsForLookup(
  rows: LuciusAgentEventRow[],
): Record<SupportedEventPlatform, Set<string>> {
  const channelIdsByPlatform: Record<SupportedEventPlatform, Set<string>> = {
    discord: new Set<string>(),
    telegram: new Set<string>(),
    slack: new Set<string>(),
    feishu: new Set<string>(),
  }

  rows.forEach((row) => {
    if (hasMeaningfulChannelName(row.channel_name)) {
      return
    }

    const platform = normalizeEventPlatform(row.platform)
    const channelId = normalizeChannelId(row.channel_id)

    if (!platform || !channelId) {
      return
    }

    channelIdsByPlatform[platform].add(channelId)
  })

  return channelIdsByPlatform
}

/**
 * 从各平台 schema 的 channel 表读取频道名：
 * - discord/slack 走 `channel_id`；
 * - telegram/feishu 走 `chat_id`；
 * - 任一平台查询失败时降级为空映射，不阻断主列表加载。
 */
async function fetchPlatformChannelNameMap(payload: {
  supabase: SupabaseClient
  companyId: string
  rows: LuciusAgentEventRow[]
}): Promise<Map<string, string>> {
  const channelIdsByPlatform = collectChannelIdsForLookup(payload.rows)

  const lookupTasks = (
    Object.entries(PLATFORM_CHANNEL_LOOKUP_CONFIG) as Array<[SupportedEventPlatform, PlatformChannelLookupConfig]>
  ).map(async ([platform, config]) => {
    const channelIds = Array.from(channelIdsByPlatform[platform])
    const channelNameMap = new Map<string, string>()

    if (channelIds.length === 0) {
      return channelNameMap
    }

    const lookupResult = await payload.supabase
      .schema(config.schemaName)
      .from('channel')
      .select(`${config.channelIdColumn},name`)
      .eq('company_id', payload.companyId)
      .in(config.channelIdColumn, channelIds)

    if (lookupResult.error) {
      return channelNameMap
    }

    ;((lookupResult.data || []) as ChannelLookupRow[]).forEach((row) => {
      const rawChannelId = row[config.channelIdColumn]
      const rawChannelName = row.name

      if (typeof rawChannelId !== 'string' || typeof rawChannelName !== 'string') {
        return
      }

      const channelId = rawChannelId.trim()
      const channelName = rawChannelName.trim()

      if (!channelId || !channelName) {
        return
      }

      channelNameMap.set(buildPlatformChannelLookupKey(platform, channelId), channelName)
    })

    return channelNameMap
  })

  const mergedChannelNameMap = new Map<string, string>()
  const lookupResults = await Promise.all(lookupTasks)

  lookupResults.forEach((channelNameMap) => {
    channelNameMap.forEach((channelName, key) => {
      mergedChannelNameMap.set(key, channelName)
    })
  })

  return mergedChannelNameMap
}

/**
 * 将平台补查得到的频道名回填到事件行：
 * - 仅覆盖空值或“未知频道”兜底值；
 * - 不影响已有明确 channel_name 的历史数据。
 */
async function hydrateRowsWithPlatformChannelName(payload: {
  supabase: SupabaseClient
  companyId: string
  rows: LuciusAgentEventRow[]
}): Promise<LuciusAgentEventRow[]> {
  const platformChannelNameMap = await fetchPlatformChannelNameMap(payload)

  if (platformChannelNameMap.size === 0) {
    return payload.rows
  }

  return payload.rows.map((row) => {
    if (hasMeaningfulChannelName(row.channel_name)) {
      return row
    }

    const platform = normalizeEventPlatform(row.platform)
    const channelId = normalizeChannelId(row.channel_id)

    if (!platform || !channelId) {
      return row
    }

    const resolvedChannelName = platformChannelNameMap.get(buildPlatformChannelLookupKey(platform, channelId))
    if (!resolvedChannelName) {
      return row
    }

    return {
      ...row,
      channel_name: resolvedChannelName,
    }
  })
}

/**
 * 统一补齐事件列表/详情页展示所需的平台扩展字段：
 * - 先补频道名，再补最近聊天用户头像等兼容字段；
 * - 最后额外补齐 `event.user_id` 对应头像，供事件列表稳定显示单用户头像。
 * - 这些字段都属于展示层 hydration，不回写数据库。
 */
async function hydrateRowsWithPlatformPresentationData(payload: {
  supabase: SupabaseClient
  companyId: string
  rows: LuciusAgentEventRow[]
}): Promise<LuciusAgentEventRow[]> {
  const rowsWithChannelName = await hydrateRowsWithPlatformChannelName(payload)
  const rowsWithSlackRecentAvatars = await hydrateRowsWithSlackRecentParticipantAvatars({
    ...payload,
    rows: rowsWithChannelName,
  })
  const rowsWithSlackAvatar = await hydrateRowsWithSlackParticipantAvatar({
    ...payload,
    rows: rowsWithSlackRecentAvatars,
  })
  const rowsWithTelegramRecentAvatars = await hydrateRowsWithTelegramRecentParticipantAvatars({
    supabase: payload.supabase,
    companyId: payload.companyId,
    rows: rowsWithSlackAvatar,
  })

  const rowsWithTelegramAvatar = hydrateRowsWithTelegramParticipantAvatar({
    companyId: payload.companyId,
    rows: rowsWithTelegramRecentAvatars,
  })

  return hydrateRowsWithEventUserAvatar({
    supabase: payload.supabase,
    companyId: payload.companyId,
    rows: rowsWithTelegramAvatar,
  })
}

/**
 * 读取协助任务事件列表（分页 + 筛选 + 计数）：
 * - 数据源固定为 `lucius_agent.event`；
 * - 返回列表、分组计数、类型筛选项。
 */
export async function fetchAssistTaskEvents(
  params: AssistTaskEventQueryParams,
): Promise<AssistTaskEventQueryResult> {
  const supabase = getSupabaseBrowserClient()
  const keywordPattern = buildKeywordPattern(params.keyword)
  const nowIso = new Date().toISOString()
  let rawRows: LuciusAgentEventRow[] = []
  let totalCount = 0

  if (params.statusFilter === 'all') {
    const orderedResult = await fetchAssistTaskEventsInStatusOrder({
      supabase,
      companyId: params.companyId,
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
      typeFilter: params.typeFilter,
      keywordPattern,
    })

    rawRows = orderedResult.rows
    totalCount = orderedResult.totalCount
  } else {
    const rangeStart = params.pageIndex * params.pageSize
    const rangeEnd = rangeStart + params.pageSize - 1
    const listResult = await buildAssistTaskEventListQuery({
      supabase,
      companyId: params.companyId,
      statusFilter: params.statusFilter,
      typeFilter: params.typeFilter,
      keywordPattern,
    })
      .order('created_at', { ascending: false })
      .range(rangeStart, rangeEnd)

    if (listResult.error) {
      throw toReadableError(listResult.error)
    }

    rawRows = ((listResult.data || []) as unknown) as LuciusAgentEventRow[]
    totalCount = listResult.count || 0
  }

  const normalizedRows = rawRows.map((row) => normalizeAssistTaskEventRow(row))
  const rows = await hydrateRowsWithPlatformPresentationData({
    supabase,
    companyId: params.companyId,
    rows: normalizedRows,
  })

  const typeOptionMap = new Map<string, EventTypeOption>()

  const typeConfigResult = await supabase
    .schema('lucius_agent')
    .from('event_type_config')
    .select('type_key,type_label')
    .eq('company_id', params.companyId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })
    .limit(500)

  if (typeConfigResult.error && !isMissingEventTypeConfigTableError(typeConfigResult.error)) {
    throw toReadableError(typeConfigResult.error)
  }

  if (!typeConfigResult.error) {
    ;((typeConfigResult.data || []) as EventTypeConfigRow[]).forEach((row) => {
      const typeValue = (row.type_key || '').trim()
      if (!typeValue || typeOptionMap.has(typeValue)) {
        return
      }

      typeOptionMap.set(typeValue, {
        value: typeValue,
        label: toReadableEventTypeLabel(typeValue, row.type_label),
      })
    })
  }

  /**
   * 回退策略：
   * - event_type_config 未迁移完成，或当前公司尚未配置任何类型时；
   * - 使用事件表内实际出现过的 type 去重生成下拉项，保证筛选功能不中断。
   */
  if (typeOptionMap.size === 0) {
    let typeOptionQuery = supabase
      .schema('lucius_agent')
      .from('event')
      .select('event_type')
      .eq('company_id', params.companyId)
      .limit(500)

    typeOptionQuery = applyAssistTaskEventStatusFilter(typeOptionQuery, params.statusFilter)

    const typeOptionResult = await typeOptionQuery

    if (typeOptionResult.error) {
      throw toReadableError(typeOptionResult.error)
    }

    ;((typeOptionResult.data || []) as EventTypeRow[]).forEach((row) => {
      const typeValue = (row.event_type || '').trim()
      if (!typeValue || typeOptionMap.has(typeValue)) {
        return
      }

      typeOptionMap.set(typeValue, {
        value: typeValue,
        label: toReadableEventTypeLabel(typeValue),
      })
    })
  }

  const typeOptions = Array.from(typeOptionMap.values()).sort((left, right) =>
    left.label.localeCompare(right.label, 'zh-Hans-CN'),
  )

  /**
   * 超时计数规则：
   * - 仅统计 `pending` 且 `sla_due_at < now` 的事件；
   * - 在 `pending/all` 视图下才有意义。
   */
  let timedOutCount = 0
  if (params.statusFilter === 'pending' || params.statusFilter === 'all') {
    let timedOutQuery = supabase
      .schema('lucius_agent')
      .from('event')
      .select('id', { count: 'exact', head: true })
      .eq('company_id', params.companyId)
      .eq('status', 'pending')
      .not('sla_due_at', 'is', null)
      .lt('sla_due_at', nowIso)

    if (params.typeFilter !== 'all') {
      timedOutQuery = timedOutQuery.eq('event_type', params.typeFilter)
    }

    timedOutQuery = applyKeywordFilter(timedOutQuery, keywordPattern)

    const timedOutResult = await timedOutQuery

    if (timedOutResult.error) {
      throw toReadableError(timedOutResult.error)
    }

    timedOutCount = timedOutResult.count || 0
  }

  /**
   * 待处理计数规则：
   * - `pending` 视图：当前总数 - 超时数；
   * - `all` 视图：单独查询 pending 总数后减去超时数；
   * - 其余状态视图为 0。
   */
  let pendingCount = 0
  if (params.statusFilter === 'pending') {
    pendingCount = Math.max(totalCount - timedOutCount, 0)
  } else if (params.statusFilter === 'all') {
    let pendingTotalQuery = supabase
      .schema('lucius_agent')
      .from('event')
      .select('id', { count: 'exact', head: true })
      .eq('company_id', params.companyId)
      .eq('status', 'pending')

    if (params.typeFilter !== 'all') {
      pendingTotalQuery = pendingTotalQuery.eq('event_type', params.typeFilter)
    }

    pendingTotalQuery = applyKeywordFilter(pendingTotalQuery, keywordPattern)

    const pendingTotalResult = await pendingTotalQuery

    if (pendingTotalResult.error) {
      throw toReadableError(pendingTotalResult.error)
    }

    pendingCount = Math.max((pendingTotalResult.count || 0) - timedOutCount, 0)
  }

  return {
    rows,
    totalCount,
    timedOutCount,
    pendingCount,
    typeOptions,
  }
}

/**
 * 读取协助任务侧边栏总数：
 * - 仅查询 `lucius_agent.event` 中仍需协作处理的事件总数；
 * - 当前 badge 只统计 `pending` + `processing`，与“协助任务”导航语义保持一致；
 * - 不拉取列表数据，供侧边栏 badge 等“轻量计数展示”场景复用。
 */
export async function fetchAssistTaskEventCount(
  params: AssistTaskEventCountQueryParams,
): Promise<number> {
  const companyId = params.companyId.trim()
  if (!companyId) {
    return 0
  }

  const supabase = getSupabaseBrowserClient()
  const countResult = await supabase
    .schema('lucius_agent')
    .from('event')
    .select('id', { count: 'exact', head: true })
    .eq('company_id', companyId)
    .in('status', ['pending', 'processing'])

  if (countResult.error) {
    throw toReadableError(countResult.error)
  }

  return countResult.count || 0
}

/**
 * 读取单个协助任务事件：
 * - 供 `/dashboard/event/:eventId` 直达详情页使用；
 * - 仍然按 `company_id + id` 双条件约束，避免跨公司拿到其他租户数据。
 */
export async function fetchAssistTaskEventDetail(
  params: AssistTaskEventDetailQueryParams,
): Promise<LuciusAgentEventRow | null> {
  const companyId = params.companyId.trim()
  const eventId = params.eventId.trim()

  if (!companyId || !eventId) {
    return null
  }

  const supabase = getSupabaseBrowserClient()
  const detailResult = await supabase
    .schema('lucius_agent')
    .from('event')
    .select(EVENT_SELECT_COLUMNS)
    .eq('company_id', companyId)
    .eq('id', eventId)
    .maybeSingle<LuciusAgentEventRow>()

  if (detailResult.error) {
    throw toReadableError(detailResult.error)
  }

  if (!detailResult.data) {
    return null
  }

  const hydratedRows = await hydrateRowsWithPlatformPresentationData({
    supabase,
    companyId,
    rows: [normalizeAssistTaskEventRow(detailResult.data)],
  })

  return hydratedRows[0] || null
}

export function useAssistTaskEvents(
  params: AssistTaskEventQueryParams,
  options?: Omit<
    UseQueryOptions<
      AssistTaskEventQueryResult,
      Error,
      AssistTaskEventQueryResult,
      ReturnType<typeof assistTaskEventKeys.list>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: assistTaskEventKeys.list(params),
    queryFn: () => fetchAssistTaskEvents(params),
    staleTime: 20_000,
    ...options,
  })
}

export function useAssistTaskEventCount(
  params: AssistTaskEventCountQueryParams,
  options?: Omit<
    UseQueryOptions<number, Error, number, ReturnType<typeof assistTaskEventKeys.count>>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: assistTaskEventKeys.count(params),
    queryFn: () => fetchAssistTaskEventCount(params),
    staleTime: 20_000,
    ...options,
  })
}

export function useAssistTaskEventDetail(
  params: AssistTaskEventDetailQueryParams,
  options?: Omit<
    UseQueryOptions<
      LuciusAgentEventRow | null,
      Error,
      LuciusAgentEventRow | null,
      ReturnType<typeof assistTaskEventKeys.detail>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: assistTaskEventKeys.detail(params),
    queryFn: () => fetchAssistTaskEventDetail(params),
    staleTime: 20_000,
    ...options,
  })
}

export const __agentEventQueryTestables = {
  applyAssistTaskEventStatusFilter,
  isIgnoredAssistTaskEvent,
  normalizeAssistTaskEventStatus,
}

/**
 * 读取单个事件的消息详情：
 * - 按平台路由到对应 schema 的 `message` 表；
 * - 严格按 company_id + channel_id（若存在）约束，避免跨租户或跨频道误取；
 * - 返回统一消息结构，供右侧详情卡直接渲染。
 */
export async function fetchAssistTaskEventMessages(
  params: AssistTaskEventMessageQueryParams,
): Promise<AssistTaskEventMessage[]> {
  const companyId = params.companyId.trim()
  if (!companyId) {
    return []
  }

  const platform = normalizeEventMessagePlatform(params.platform)
  if (!platform) {
    return []
  }

  const messageIds = normalizeEventMessageIds(params.messageIds)
  const channelId = (params.channelId || '').trim() || null
  const scope = params.scope || 'event'
  const shouldLoadWebsiteSessionMessages =
    platform === 'website' &&
    scope === 'website_session' &&
    Boolean(channelId)

  if (!shouldLoadWebsiteSessionMessages && messageIds.length === 0) {
    return []
  }

  const supabase = getSupabaseBrowserClient()

  let messages: AssistTaskEventMessage[] = []

  if (platform === 'discord') {
    messages = await fetchDiscordEventMessages({
      supabase,
      companyId,
      channelId,
      messageIds,
    })
  } else if (platform === 'telegram') {
    messages = await fetchTelegramEventMessages({
      supabase,
      companyId,
      channelId,
      messageIds,
    })
  } else if (platform === 'slack') {
    messages = await fetchSlackEventMessages({
      supabase,
      companyId,
      channelId,
      messageIds,
    })
  } else if (platform === 'feishu') {
    messages = await fetchFeishuEventMessages({
      supabase,
      companyId,
      channelId,
      messageIds,
    })
  } else if (platform === 'website') {
    messages = await fetchWebsiteEventMessages({
      supabase,
      companyId,
      messageIds,
      websiteSessionId: channelId,
      scope,
    })
  }

  const messageOrderIndexById = new Map<string, number>(
    messageIds.map((messageId, index) => [messageId, index]),
  )

  return messages.sort((leftMessage, rightMessage) =>
    compareMessageOrder(leftMessage, rightMessage, messageOrderIndexById),
  )
}

export function useAssistTaskEventMessages(
  params: AssistTaskEventMessageQueryParams,
  options?: Omit<
    UseQueryOptions<
      AssistTaskEventMessage[],
      Error,
      AssistTaskEventMessage[],
      ReturnType<typeof assistTaskEventKeys.detailMessages>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: assistTaskEventKeys.detailMessages(params),
    queryFn: () => fetchAssistTaskEventMessages(params),
    staleTime: 20_000,
    ...options,
  })
}

/**
 * 查询任务详情里 Lucius 实际采用的知识：
 * - 浏览器端不直接访问 `lucius_agent.message`；
 * - 统一走当前应用的服务端 API，保持权限边界清晰。
 */
export async function fetchAssistTaskEventAdoptedKnowledge(
  params: AssistTaskEventAdoptedKnowledgeQueryParams,
): Promise<AssistTaskEventAdoptedKnowledge[]> {
  const companyId = params.companyId.trim()
  if (!companyId) {
    return []
  }

  const messageIds = normalizeEventMessageIds(params.messageIds)
  if (messageIds.length === 0) {
    return []
  }

  const response = await fetch('/api/events/adopted-knowledge', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      companyId,
      platform: params.platform,
      channelId: params.channelId,
      messageIds,
    }),
  })

  const data = await parseServerApiResponse<EventAdoptedKnowledgeApiResponse>(response)
  return data.items || []
}

export function useAssistTaskEventAdoptedKnowledge(
  params: AssistTaskEventAdoptedKnowledgeQueryParams,
  options?: Omit<
    UseQueryOptions<
      AssistTaskEventAdoptedKnowledge[],
      Error,
      AssistTaskEventAdoptedKnowledge[],
      ReturnType<typeof assistTaskEventKeys.detailAdoptedKnowledge>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: assistTaskEventKeys.detailAdoptedKnowledge(params),
    queryFn: () => fetchAssistTaskEventAdoptedKnowledge(params),
    staleTime: 20_000,
    ...options,
  })
}
