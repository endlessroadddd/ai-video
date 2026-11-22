import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

import type { SupabaseClient } from '@supabase/supabase-js'

import {
  createSupabaseServerClientForRequest,
  createSupabaseServiceRoleClient,
} from '@/lib/supabase/server'

type CompanyRole = 'owner' | 'admin' | 'member'

type AuthenticatedUser = {
  id: string
}

type ApiError = {
  status: number
  message: string
}

type OrganizationMemberRow = {
  id: string
  company_id: string
  user_id: string
  role: CompanyRole
  status: 'active' | 'inactive'
}

type DiscordInstallStatePayload = {
  companyId: string
  userId: string
  iat: number
  exp: number
  nonce: string
}

type DiscordServerEnv = {
  clientId: string
  clientSecret: string
  botToken: string
  integrationSecret: string
  redirectUri: string
  permissions: string
  scope: string
  apiBaseUrl: string
}

type DiscordOauthTokenResponse = {
  access_token?: string
  token_type?: string
  scope?: string
  error?: string
  error_description?: string
}

type DiscordGuild = {
  id: string
  name: string
  icon?: string | null
  description?: string | null
}

type DiscordChannel = {
  id: string
  name?: string | null
  topic?: string | null
  type?: number
  parent_id?: string | null
}

type DiscordRole = {
  id: string
  name?: string | null
  color?: number
  position?: number
  permissions?: string
  mentionable?: boolean
  hoist?: boolean
  description?: string | null
}

type IntegrationConnectionRow = {
  company_id: string
  platform: string
  external_workspace_id: string | null
  external_workspace_name: string | null
  status: string | null
  updated_at?: string | null
}

type DiscordConnectionView = {
  companyId: string
  platform: 'discord'
  externalWorkspaceId: string | null
  externalWorkspaceName: string | null
  status: string | null
  updatedAt: string | null
}

type DiscordSyncSummary = {
  serverId: string
  channelsUpserted: number
  rolesUpserted: number
}

type DiscordChannelRow = {
  id: string
  guild_id: string | null
  channel_id: string | null
  name: string | null
  channel_type: number | null
  parent_id: string | null
}

type DiscordRoleRow = {
  id: string
  guild_id: string | null
  role_id: string | null
  name: string | null
  mentionable: boolean | null
  position: number | null
}

type DiscordGuildRow = {
  id: string
  guild_id: string | null
  name: string | null
  company_id?: string | null
}

type TicketConfigRow = {
  id: string
  company_id?: string | null
  guild_id: string
  guild_uuid?: string | null
  category_id: string | null
  closed_category_id: string | null
  panel_channel_id: string | null
  staff_role_ids: string[] | null
  panel_name: string | null
  panel_message_template: string | null
  ticket_message_template: string | null
  intro_message_template: string | null
  form_questions: unknown
}

type TicketPanelMessageRow = {
  id: string
  company_id?: string | null
  guild_id: string
  guild_uuid?: string | null
  message_id: string
  channel_id: string
  panel_snapshot: unknown
  created_at: string | null
  updated_at: string | null
}

type DiscordTicketFormQuestion = {
  title: string
  required: boolean
  multiline: boolean
}

type DiscordTicketDefaultConfigView = {
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

type DiscordTicketPanelView = {
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

type DiscordTicketChannelOptionView = {
  id: string
  name: string
  channelType: number | null
  parentId: string | null
  parentName: string | null
}

type DiscordTicketRoleOptionView = {
  id: string
  name: string
  mentionable: boolean
  position: number
}

type DiscordTicketPanelsSnapshotView = {
  guildId: string | null
  defaultConfig: DiscordTicketDefaultConfigView
  panels: DiscordTicketPanelView[]
  publishChannels: DiscordTicketChannelOptionView[]
  categoryChannels: DiscordTicketChannelOptionView[]
  roleOptions: DiscordTicketRoleOptionView[]
}

type DiscordTicketPanelPublishRequestBody = {
  companyId?: string
  channelId?: string
  panelName?: string | null
  categoryId?: string | null
  closedCategoryId?: string | null
  staffRoleIds?: string[]
  panelMessageTemplate?: string | null
  ticketMessageTemplate?: string | null
  introMessageTemplate?: string | null
  formQuestions?: DiscordTicketFormQuestion[] | null
}

type TicketPanelSnapshotPayload = {
  server_id?: string
  guild_id?: string
  channel_id?: string
  panel_name?: string | null
  category_id?: string | null
  closed_category_id?: string | null
  staff_role_ids?: unknown
  panel_message_template?: string | null
  ticket_message_template?: string | null
  intro_message_template?: string | null
  form_questions?: unknown
}

type DiscordTicketBotEnv = {
  botBaseUrl: string
  internalApiToken: string | null
}

type DiscordTicketConfigWriteData = {
  company_id?: string
  guild_uuid?: string
  panel_channel_id: string
  category_id?: string | null
  closed_category_id?: string | null
  staff_role_ids?: string[]
  panel_name?: string | null
  panel_message_template?: string | null
  ticket_message_template?: string | null
  intro_message_template?: string | null
  form_questions?: DiscordTicketFormQuestion[] | null
}

type DiscordTicketResolvedPublishState = {
  panelName: string | null
  categoryId: string | null
  closedCategoryId: string | null
  staffRoleIds: string[]
  panelMessageTemplate: string | null
  ticketMessageTemplate: string | null
  introMessageTemplate: string | null
  formQuestions: DiscordTicketFormQuestion[] | null
}

type DiscordTicketBotPublishPayload = {
  server_id: string
  guild_id: string
  channel_id: string
  category_id: string | null
  closed_category_id: string | null
  staff_role_ids: string[]
  panel_message_template: string | null
  ticket_message_template: string | null
  intro_message_template: string | null
  form_questions: DiscordTicketFormQuestion[] | null
}

type StableJsonValue =
  | string
  | number
  | boolean
  | null
  | StableJsonValue[]
  | { [key: string]: StableJsonValue }

type RequestWithCompanyId = {
  companyId?: string
}

type DiscordTicketScopeWriteData = {
  company_id: string
  guild_id: string
  guild_uuid: string
}

type SyncRequestBody = {
  companyId?: string
  syncNow?: boolean
}

const UUID_REGEX: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const DISCORD_GUILD_ID_REGEX: RegExp = /^\d{15,30}$/
const DISCORD_STATE_TTL_SECONDS = 5 * 60
const TICKET_CONFIG_SELECT_FIELDS =
  'id, company_id, guild_id, guild_uuid, category_id, closed_category_id, panel_channel_id, staff_role_ids, panel_name, panel_message_template, ticket_message_template, intro_message_template, form_questions'
const TICKET_PANEL_MESSAGE_SELECT_FIELDS =
  'id, company_id, guild_id, guild_uuid, message_id, channel_id, panel_snapshot, created_at, updated_at'

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

function isDiscordGuildId(value: string): boolean {
  return DISCORD_GUILD_ID_REGEX.test(value)
}

function resolveAppOrigin(request: Request): string {
  const configuredAppUrl = process.env.APP_URL?.trim() || ''
  if (configuredAppUrl) {
    return configuredAppUrl.replace(/\/$/, '')
  }

  const requestUrl = new URL(request.url)
  return requestUrl.origin
}

/**
 * 统一清理上游服务 URL，避免后续路径拼接出现双斜杠。
 */
function normalizeBaseUrl(url: string): string {
  return url.trim().replace(/\/$/, '')
}

/**
 * 统一读取 Discord 集成配置。
 *
 * 设计说明：
 * - redirect_uri 支持显式配置，便于多环境共存；
 * - secret 若未单独配置，回退到 service role key，保证本地可跑；
 * - scope/permissions 允许通过环境变量覆盖，避免硬编码阻塞后续扩展。
 */
function getDiscordServerEnvOrNull(request: Request): DiscordServerEnv | null {
  const clientId = process.env.DISCORD_CLIENT_ID?.trim() || ''
  const clientSecret = process.env.DISCORD_CLIENT_SECRET?.trim() || ''
  const botToken = process.env.DISCORD_BOT_TOKEN?.trim() || ''
  const integrationSecret =
    process.env.DISCORD_INTEGRATION_SECRET?.trim()
    || process.env.SUPABASE_SECRET_KEY?.trim()
    || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    || ''
  const redirectUri =
    process.env.DISCORD_REDIRECT_URI?.trim() || `${resolveAppOrigin(request)}/api/settings/discord/callback`
  const permissions = process.env.DISCORD_INSTALL_PERMISSIONS?.trim() || '8'
  const scope = process.env.DISCORD_INSTALL_SCOPE?.trim() || 'bot applications.commands'
  const apiBaseUrl = process.env.DISCORD_API_BASE_URL?.trim() || 'https://discord.com/api/v10'

  if (!clientId || !clientSecret || !botToken || !integrationSecret || !redirectUri) {
    return null
  }

  return {
    clientId,
    clientSecret,
    botToken,
    integrationSecret,
    redirectUri,
    permissions,
    scope,
    apiBaseUrl: apiBaseUrl.replace(/\/$/, ''),
  }
}

/**
 * 读取 ticket tool 直连 bot 所需的环境变量。
 *
 * 设计说明：
 * - 这里不再经过 lucius-api-server，前端服务端直接调用 lucius-bot；
 * - token 继续复用现有内部调用配置，避免新增部署变量。
 */
function getDiscordTicketBotEnvOrNull(): DiscordTicketBotEnv | null {
  const botBaseUrl =
    process.env.CLIENT_CHAT_BOT_BASE_URL?.trim()
    || process.env.LUCIUS_BOT_BASE_URL?.trim()
    || ''

  if (!botBaseUrl) {
    return null
  }

  return {
    botBaseUrl: normalizeBaseUrl(botBaseUrl),
    internalApiToken:
      process.env.CLIENT_CHAT_INTERNAL_API_TOKEN?.trim()
      || process.env.INTERNAL_API_TOKEN?.trim()
      || null,
  }
}

/**
 * 拼装 lucius-bot 的 ticket tool 路由。
 *
 * 支持以下 base 形式：
 * - `https://bot.example.com`
 * - `https://bot.example.com/v2`
 * - `https://bot.example.com/v2/interaction`
 * - `https://bot.example.com/v2/interaction/tickets`
 */
function buildDiscordTicketBotApiUrl(baseUrl: string, endpointPath: string): string {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl)
  const parsedBaseUrl = new URL(normalizedBaseUrl)
  const normalizedPathname = parsedBaseUrl.pathname.replace(/\/+$/, '')

  if (normalizedPathname.endsWith('/v2/interaction/tickets')) {
    return `${normalizedBaseUrl}${endpointPath}`
  }

  if (normalizedPathname.endsWith('/v2/interaction')) {
    return `${normalizedBaseUrl}/tickets${endpointPath}`
  }

  if (normalizedPathname.endsWith('/v2')) {
    return `${normalizedBaseUrl}/interaction/tickets${endpointPath}`
  }

  return `${normalizedBaseUrl}/v2/interaction/tickets${endpointPath}`
}

function buildDiscordTicketBotForwardHeaders(token: string | null): HeadersInit {
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
 * 规范化可为空字符串字段。
 *
 * 语义约定：
 * - `undefined` 表示“调用方未提交该字段”，后续不应覆盖现有配置；
 * - `null` 表示“调用方明确清空该字段”；
 * - 非空字符串会被 trim 后写入。
 */
function normalizeOptionalNullableString(value: string | null | undefined): string | null | undefined {
  if (value === undefined) {
    return undefined
  }

  const normalizedValue = String(value || '').trim()
  return normalizedValue || null
}

/**
 * 统一整理 role id 列表，避免空字符串进入数据库或 bot payload。
 */
function normalizeDiscordRoleIds(roleIds: string[] | undefined): string[] | undefined {
  if (roleIds === undefined) {
    return undefined
  }

  return roleIds
    .map((roleId) => String(roleId || '').trim())
    .filter((roleId) => roleId.length > 0)
}

/**
 * 复制表单问题数组，避免后续对同一引用做变更时污染快照比较。
 */
function cloneDiscordTicketFormQuestions(
  formQuestions: DiscordTicketFormQuestion[] | null,
): DiscordTicketFormQuestion[] | null {
  if (!formQuestions || formQuestions.length === 0) {
    return null
  }

  return formQuestions.map((question) => ({
    title: question.title,
    required: question.required,
    multiline: question.multiline,
  }))
}

/**
 * 将请求中的表单问题规范化为可写入数据库 / 发送给 bot 的结构。
 */
function normalizeDiscordTicketFormQuestionsForWrite(
  rawValue: DiscordTicketFormQuestion[] | null | undefined,
): DiscordTicketFormQuestion[] | null | undefined {
  if (rawValue === undefined) {
    return undefined
  }

  if (!Array.isArray(rawValue) || rawValue.length === 0) {
    return null
  }

  const normalizedQuestions = rawValue
    .map((question) => ({
      title: String(question.title || '').trim(),
      required: Boolean(question.required),
      multiline: Boolean(question.multiline),
    }))
    .filter((question) => question.title.length > 0)

  return normalizedQuestions.length > 0 ? normalizedQuestions : null
}

function resolvePublishOverride<T>(overrideValue: T | undefined, fallbackValue: T): T {
  if (overrideValue !== undefined) {
    return overrideValue
  }

  return fallbackValue
}

/**
 * 将未知 JSON 递归稳定化，确保 snapshot 比较不受对象 key 顺序影响。
 */
function toStableJsonValue(rawValue: unknown): StableJsonValue {
  if (
    rawValue === null
    || typeof rawValue === 'string'
    || typeof rawValue === 'number'
    || typeof rawValue === 'boolean'
  ) {
    return rawValue
  }

  if (Array.isArray(rawValue)) {
    return rawValue.map((item) => toStableJsonValue(item))
  }

  if (rawValue && typeof rawValue === 'object') {
    const normalizedRecord: Record<string, StableJsonValue> = {}
    const entries = Object.entries(rawValue as Record<string, unknown>)
      .filter(([, value]) => value !== undefined)
      .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))

    entries.forEach(([key, value]) => {
      normalizedRecord[key] = toStableJsonValue(value)
    })

    return normalizedRecord
  }

  return String(rawValue)
}

function stableStringifyJson(rawValue: unknown): string {
  return JSON.stringify(toStableJsonValue(rawValue))
}

function encodeBase64Url(raw: string): string {
  return Buffer.from(raw, 'utf8').toString('base64url')
}

function decodeBase64Url(raw: string): string {
  return Buffer.from(raw, 'base64url').toString('utf8')
}

function signStatePayload(encodedPayload: string, secret: string): string {
  return createHmac('sha256', secret).update(encodedPayload).digest('base64url')
}

/**
 * 创建一次性 OAuth state：
 * - state 中携带 company_id 与 user_id，避免 callback 阶段依赖前端参数；
 * - 增加过期时间和随机 nonce，降低 state 重放窗口。
 */
function createDiscordStateToken(payload: DiscordInstallStatePayload, secret: string): string {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload))
  const signature = signStatePayload(encodedPayload, secret)
  return `${encodedPayload}.${signature}`
}

function verifyDiscordStateToken(token: string, secret: string): DiscordInstallStatePayload | null {
  const separatorIndex = token.lastIndexOf('.')
  if (separatorIndex <= 0) {
    return null
  }

  const encodedPayload = token.slice(0, separatorIndex)
  const signature = token.slice(separatorIndex + 1)
  const expectedSignature = signStatePayload(encodedPayload, secret)

  const signatureBuffer = Buffer.from(signature, 'utf8')
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8')

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as DiscordInstallStatePayload
    const nowSeconds = Math.floor(Date.now() / 1000)

    if (!payload.companyId || !payload.userId || payload.exp <= nowSeconds) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

async function parseRequestJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T
  } catch {
    throw createApiError(400, '请求体必须是合法 JSON。')
  }
}

async function requireAuthenticatedUser(request: Request): Promise<AuthenticatedUser> {
  const supabase = createSupabaseServerClientForRequest(request, new Headers())
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user?.id) {
    throw createApiError(401, '登录已失效，请重新登录。')
  }

  return {
    id: user.id,
  }
}

async function getActiveOrganizationMember(payload: {
  serviceClient: SupabaseClient
  companyId: string
  userId: string
}): Promise<OrganizationMemberRow> {
  const membershipResult = await payload.serviceClient
    .schema('permission')
    .from('organization_member')
    .select('id, company_id, user_id, role, status')
    .eq('company_id', payload.companyId)
    .eq('user_id', payload.userId)
    .eq('status', 'active')
    .maybeSingle<OrganizationMemberRow>()

  if (membershipResult.error) {
    throw createApiError(500, `读取组织成员身份失败：${membershipResult.error.message}`)
  }

  if (!membershipResult.data) {
    throw createApiError(403, '你不是当前公司的有效成员。')
  }

  return membershipResult.data
}

function ensureOwnerOrAdmin(role: CompanyRole): void {
  if (role !== 'owner' && role !== 'admin') {
    throw createApiError(403, '仅 Owner/Admin 可管理 Discord 集成。')
  }
}

function mapConnectionRowToView(row: IntegrationConnectionRow): DiscordConnectionView {
  return {
    companyId: row.company_id,
    platform: 'discord',
    externalWorkspaceId: row.external_workspace_id,
    externalWorkspaceName: row.external_workspace_name,
    status: row.status,
    updatedAt: row.updated_at || null,
  }
}

/**
 * 将 `discord.channel` 行映射为前端视图模型。
 */
function mapDiscordChannelRowToView(row: DiscordChannelRow): {
  id: string
  channelId: string
  guildId: string
  name: string
  channelType: number | null
  parentId: string | null
} {
  return {
    id: row.id,
    channelId: row.channel_id || row.id,
    guildId: row.guild_id || '',
    name: row.name || row.channel_id || row.id,
    channelType: row.channel_type,
    parentId: row.parent_id,
  }
}

function mapDiscordRoleRowToView(row: DiscordRoleRow): DiscordTicketRoleOptionView | null {
  const roleId = String(row.role_id || '').trim()
  if (!roleId) {
    return null
  }

  return {
    id: roleId,
    name: row.name?.trim() || roleId,
    mentionable: Boolean(row.mentionable),
    position: row.position ?? 0,
  }
}

function isDiscordPublishableChannelType(channelType: number | null): boolean {
  if (channelType === null) {
    return true
  }

  return channelType === 0 || channelType === 5 || channelType === 15
}

function parseDiscordTicketFormQuestions(rawValue: unknown): DiscordTicketFormQuestion[] {
  if (!Array.isArray(rawValue)) {
    return []
  }

  return rawValue.flatMap((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return []
    }

    const question = item as Record<string, unknown>
    const title = String(question.title || '').trim()
    if (!title) {
      return []
    }

    return [{
      title,
      required: Boolean(question.required),
      multiline: Boolean(question.multiline),
    }]
  })
}

function normalizeTicketPanelSnapshot(rawValue: unknown): TicketPanelSnapshotPayload {
  if (!rawValue || typeof rawValue !== 'object' || Array.isArray(rawValue)) {
    return {}
  }

  return rawValue as TicketPanelSnapshotPayload
}

function mapTicketConfigRowToDefaultConfig(row: TicketConfigRow | null): DiscordTicketDefaultConfigView {
  if (!row) {
    return {
      panelName: null,
      panelChannelId: null,
      categoryId: null,
      closedCategoryId: null,
      staffRoleIds: [],
      panelMessageTemplate: null,
      ticketMessageTemplate: null,
      introMessageTemplate: null,
      formQuestions: [],
    }
  }

  return {
    panelName: row.panel_name?.trim() || null,
    panelChannelId: row.panel_channel_id?.trim() || null,
    categoryId: row.category_id?.trim() || null,
    closedCategoryId: row.closed_category_id?.trim() || null,
    staffRoleIds: Array.isArray(row.staff_role_ids)
      ? row.staff_role_ids
        .map((roleId) => String(roleId || '').trim())
        .filter((roleId) => roleId.length > 0)
      : [],
    panelMessageTemplate: row.panel_message_template?.trim() || null,
    ticketMessageTemplate: row.ticket_message_template?.trim() || null,
    introMessageTemplate: row.intro_message_template?.trim() || null,
    formQuestions: parseDiscordTicketFormQuestions(row.form_questions),
  }
}

function mapTicketPanelMessageRowToView(payload: {
  row: TicketPanelMessageRow
  defaultConfig: DiscordTicketDefaultConfigView
  channelNameById: Map<string, string>
  categoryNameById: Map<string, string>
}): DiscordTicketPanelView {
  const snapshot = normalizeTicketPanelSnapshot(payload.row.panel_snapshot)
  const normalizedChannelId = String(snapshot.channel_id || payload.row.channel_id || '').trim()
  const normalizedCategoryId = String(snapshot.category_id || '').trim() || null
  const normalizedClosedCategoryId = snapshot.closed_category_id === undefined
    ? payload.defaultConfig.closedCategoryId
    : String(snapshot.closed_category_id || '').trim() || null
  const rawStaffRoleIds = Array.isArray(snapshot.staff_role_ids) ? snapshot.staff_role_ids : []

  return {
    id: payload.row.id,
    messageId: payload.row.message_id,
    channelId: normalizedChannelId,
    channelName:
      payload.channelNameById.get(normalizedChannelId)
      || normalizedChannelId
      || payload.row.channel_id,
    categoryId: normalizedCategoryId,
    categoryName: normalizedCategoryId
      ? payload.categoryNameById.get(normalizedCategoryId) || normalizedCategoryId
      : null,
    closedCategoryId: normalizedClosedCategoryId,
    closedCategoryName: normalizedClosedCategoryId
      ? payload.categoryNameById.get(normalizedClosedCategoryId) || normalizedClosedCategoryId
      : null,
    panelName: String(snapshot.panel_name || '').trim() || null,
    staffRoleIds: rawStaffRoleIds
      .map((roleId) => String(roleId || '').trim())
      .filter((roleId) => roleId.length > 0),
    panelMessageTemplate:
      typeof snapshot.panel_message_template === 'string'
        ? snapshot.panel_message_template.trim() || null
        : payload.defaultConfig.panelMessageTemplate,
    ticketMessageTemplate:
      typeof snapshot.ticket_message_template === 'string'
        ? snapshot.ticket_message_template.trim() || null
        : payload.defaultConfig.ticketMessageTemplate,
    introMessageTemplate:
      typeof snapshot.intro_message_template === 'string'
        ? snapshot.intro_message_template.trim() || null
        : payload.defaultConfig.introMessageTemplate,
    formQuestions: parseDiscordTicketFormQuestions(snapshot.form_questions),
    updatedAt: payload.row.updated_at || payload.row.created_at,
  }
}

async function getDiscordConnectionByCompanyId(payload: {
  serviceClient: SupabaseClient
  companyId: string
}): Promise<IntegrationConnectionRow | null> {
  const integrationResult = await payload.serviceClient
    .schema('integration')
    .from('connection')
    .select('company_id, platform, external_workspace_id, external_workspace_name, status')
    .eq('company_id', payload.companyId)
    .eq('platform', 'discord')
    .limit(1)

  if (integrationResult.error) {
    throw createApiError(500, `读取 integration.connection 失败：${integrationResult.error.message}`)
  }

  const rows = (integrationResult.data || []) as IntegrationConnectionRow[]
  return rows[0] || null
}

async function upsertDiscordConnection(payload: {
  serviceClient: SupabaseClient
  companyId: string
  workspaceId: string
  workspaceName: string | null
  status: 'connected' | 'degraded'
}): Promise<IntegrationConnectionRow> {
  const nextPayload = {
    external_workspace_id: payload.workspaceId,
    external_workspace_name: payload.workspaceName,
    status: payload.status,
  }

  const existingIntegrationConnectionResult = await payload.serviceClient
    .schema('integration')
    .from('connection')
    .select('company_id')
    .eq('company_id', payload.companyId)
    .eq('platform', 'discord')
    .limit(1)

  if (existingIntegrationConnectionResult.error) {
    throw createApiError(
      500,
      `读取 integration.connection 失败：${existingIntegrationConnectionResult.error.message}`,
    )
  }

  const existingRows = (existingIntegrationConnectionResult.data || []) as Array<{
    company_id: string
  }>
  const hasExistingConnection = existingRows.length > 0

  if (hasExistingConnection) {
    const updateResult = await payload.serviceClient
      .schema('integration')
      .from('connection')
      .update(nextPayload)
      .eq('company_id', payload.companyId)
      .eq('platform', 'discord')
      .select('company_id, platform, external_workspace_id, external_workspace_name, status')

    if (updateResult.error) {
      throw createApiError(500, `更新 integration.connection 失败：${updateResult.error.message}`)
    }

    const updatedRows = (updateResult.data || []) as IntegrationConnectionRow[]
    if (!updatedRows[0]) {
      throw createApiError(500, '更新 integration.connection 后未返回记录。')
    }

    return updatedRows[0]
  }

  const insertResult = await payload.serviceClient
    .schema('integration')
    .from('connection')
    .insert({
      company_id: payload.companyId,
      platform: 'discord',
      ...nextPayload,
    })
    .select('company_id, platform, external_workspace_id, external_workspace_name, status')
    .single<IntegrationConnectionRow>()

  if (insertResult.error || !insertResult.data) {
    throw createApiError(
      500,
      `写入 integration.connection 失败：${insertResult.error?.message || '未知错误'}`,
    )
  }

  return insertResult.data
}

async function markDiscordConnectionDegraded(payload: {
  serviceClient: SupabaseClient
  companyId: string
  workspaceId: string
  workspaceName: string | null
}): Promise<IntegrationConnectionRow> {
  return upsertDiscordConnection({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    workspaceId: payload.workspaceId,
    workspaceName: payload.workspaceName,
    status: 'degraded',
  })
}

async function exchangeDiscordOAuthCode(payload: {
  env: DiscordServerEnv
  code: string
}): Promise<DiscordOauthTokenResponse> {
  const requestBody = new URLSearchParams({
    client_id: payload.env.clientId,
    client_secret: payload.env.clientSecret,
    grant_type: 'authorization_code',
    code: payload.code,
    redirect_uri: payload.env.redirectUri,
  })

  const response = await fetch(`${payload.env.apiBaseUrl}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody.toString(),
  })

  const data = (await response.json()) as DiscordOauthTokenResponse
  if (!response.ok) {
    const errorMessage = data.error_description || data.error || '未知错误'
    throw createApiError(502, `Discord OAuth 授权码交换失败：${errorMessage}`)
  }

  return data
}

async function fetchDiscordBotApiJson<T>(payload: {
  env: DiscordServerEnv
  path: string
  actionLabel: string
}): Promise<T> {
  const response = await fetch(`${payload.env.apiBaseUrl}${payload.path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${payload.env.botToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  })

  if (!response.ok) {
    const fallbackText = await response.text()
    throw createApiError(
      502,
      `${payload.actionLabel} 失败：Discord API 返回 ${response.status} ${response.statusText} ${fallbackText}`,
    )
  }

  return (await response.json()) as T
}

/**
 * Upsert `discord.guild` 记录：
 * - 逻辑 key 使用 `(company_id, guild_id)`；
 * - 与 Prisma 里的 `@@unique([company_id, guild_id])` 保持一致。
 */
async function upsertGuildRecord(payload: {
  serviceClient: SupabaseClient
  companyId: string
  guild: DiscordGuild
}): Promise<string> {
  const existingGuildResult = await payload.serviceClient
    .schema('discord')
    .from('guild')
    .select('id, guild_id')
    .eq('company_id', payload.companyId)
    .eq('guild_id', payload.guild.id)
    .limit(1)

  if (existingGuildResult.error) {
    throw createApiError(500, `读取 discord.guild 失败：${existingGuildResult.error.message}`)
  }

  const existingGuildRows = (existingGuildResult.data || []) as Array<{
    id: string
    guild_id: string | null
  }>

  const guildPayload = {
    name: payload.guild.name,
    icon: payload.guild.icon || null,
    raw: payload.guild as unknown as Record<string, unknown>,
  }

  const existedGuild = existingGuildRows[0]
  if (existedGuild?.id) {
    const updateResult = await payload.serviceClient
      .schema('discord')
      .from('guild')
      .update(guildPayload)
      .eq('id', existedGuild.id)
      .select('id')
      .single<{ id: string }>()

    if (updateResult.error || !updateResult.data?.id) {
      throw createApiError(500, `更新 discord.guild 失败：${updateResult.error?.message || '未知错误'}`)
    }

    return updateResult.data.id
  }

  const insertResult = await payload.serviceClient
    .schema('discord')
    .from('guild')
    .insert({
      company_id: payload.companyId,
      guild_id: payload.guild.id,
      ...guildPayload,
    })
    .select('id')
    .single<{ id: string }>()

  if (insertResult.error || !insertResult.data?.id) {
    throw createApiError(500, `写入 discord.guild 失败：${insertResult.error?.message || '未知错误'}`)
  }

  return insertResult.data.id
}

/**
 * Upsert `discord.channel` 记录：
 * - 主键逻辑使用 `(company_id, channel_id)`；
 * - 第二轮补 `parent_channel_uuid`，避免父子顺序依赖。
 */
async function upsertChannelRecords(payload: {
  serviceClient: SupabaseClient
  companyId: string
  guildId: string
  guildUuid: string
  channels: DiscordChannel[]
}): Promise<number> {
  const existingChannelResult = await payload.serviceClient
    .schema('discord')
    .from('channel')
    .select('id, channel_id')
    .eq('company_id', payload.companyId)
    .eq('guild_id', payload.guildId)
    .not('channel_id', 'is', null)

  if (existingChannelResult.error) {
    throw createApiError(500, `读取 discord.channel 失败：${existingChannelResult.error.message}`)
  }

  const existingRows = (existingChannelResult.data || []) as Array<{
    id: string
    channel_id: string | null
  }>

  const channelUuidByChannelId = new Map<string, string>()
  existingRows.forEach((row) => {
    if (!row.channel_id) {
      return
    }

    if (!channelUuidByChannelId.has(row.channel_id)) {
      channelUuidByChannelId.set(row.channel_id, row.id)
    }
  })

  let upsertedCount = 0

  for (const channel of payload.channels) {
    if (!channel.id) {
      continue
    }

    const nextPayload = {
      name: channel.name?.trim() || channel.id,
      parent_id: channel.parent_id || null,
      channel_type: channel.type ?? null,
      description: channel.topic?.trim() || null,
      raw: channel as unknown as Record<string, unknown>,
      guild_uuid: payload.guildUuid,
    }

    const existedChannelUuid = channelUuidByChannelId.get(channel.id)
    if (existedChannelUuid) {
      const updateResult = await payload.serviceClient
        .schema('discord')
        .from('channel')
        .update(nextPayload)
        .eq('id', existedChannelUuid)

      if (updateResult.error) {
        throw createApiError(500, `更新 discord.channel 失败：${updateResult.error.message}`)
      }

      upsertedCount += 1
      continue
    }

    const insertResult = await payload.serviceClient
      .schema('discord')
      .from('channel')
      .insert({
        company_id: payload.companyId,
        guild_id: payload.guildId,
        channel_id: channel.id,
        ...nextPayload,
      })
      .select('id')
      .single<{ id: string }>()

    if (insertResult.error || !insertResult.data?.id) {
      throw createApiError(500, `写入 discord.channel 失败：${insertResult.error?.message || '未知错误'}`)
    }

    channelUuidByChannelId.set(channel.id, insertResult.data.id)
    upsertedCount += 1
  }

  for (const channel of payload.channels) {
    if (!channel.id) {
      continue
    }

    const channelUuid = channelUuidByChannelId.get(channel.id)
    if (!channelUuid) {
      continue
    }

    const parentChannelUuid = channel.parent_id ? channelUuidByChannelId.get(channel.parent_id) || null : null
    const parentUpdateResult = await payload.serviceClient
      .schema('discord')
      .from('channel')
      .update({
        parent_channel_uuid: parentChannelUuid,
      })
      .eq('id', channelUuid)

    if (parentUpdateResult.error) {
      throw createApiError(500, `更新 discord.channel 父子关系失败：${parentUpdateResult.error.message}`)
    }
  }

  return upsertedCount
}

/**
 * Upsert `discord.role` 记录：
 * - 主键逻辑使用 `(company_id, guild_id, role_id)`；
 * - 仅覆盖核心字段，不引入额外同步逻辑。
 */
async function upsertDiscordRoleRecords(payload: {
  serviceClient: SupabaseClient
  companyId: string
  guildId: string
  guildUuid: string
  roles: DiscordRole[]
}): Promise<number> {
  const existingRoleResult = await payload.serviceClient
    .schema('discord')
    .from('role')
    .select('id, role_id')
    .eq('company_id', payload.companyId)
    .eq('guild_id', payload.guildId)
    .not('role_id', 'is', null)

  if (existingRoleResult.error) {
    throw createApiError(500, `读取 discord.role 失败：${existingRoleResult.error.message}`)
  }

  const existingRows = (existingRoleResult.data || []) as Array<{
    id: string
    role_id: string | null
  }>

  const roleIdMap = new Map<string, string>()
  existingRows.forEach((row) => {
    if (!row.role_id) {
      return
    }

    if (!roleIdMap.has(row.role_id)) {
      roleIdMap.set(row.role_id, row.id)
    }
  })

  let upsertedCount = 0

  for (const role of payload.roles) {
    if (!role.id) {
      continue
    }

    const nextPayload = {
      name: role.name?.trim() || role.id,
      color: role.color ?? 0,
      position: role.position ?? 0,
      permissions: role.permissions || '0',
      mentionable: Boolean(role.mentionable),
      hoist: Boolean(role.hoist),
      raw: role as unknown as Record<string, unknown>,
      guild_uuid: payload.guildUuid,
    }

    const existedRoleId = roleIdMap.get(role.id)
    if (existedRoleId) {
      const updateResult = await payload.serviceClient
        .schema('discord')
        .from('role')
        .update(nextPayload)
        .eq('id', existedRoleId)

      if (updateResult.error) {
        throw createApiError(500, `更新 discord.role 失败：${updateResult.error.message}`)
      }

      upsertedCount += 1
      continue
    }

    const insertResult = await payload.serviceClient
      .schema('discord')
      .from('role')
      .insert({
        company_id: payload.companyId,
        guild_id: payload.guildId,
        role_id: role.id,
        ...nextPayload,
      })
      .select('id')
      .single<{ id: string }>()

    if (insertResult.error || !insertResult.data?.id) {
      throw createApiError(500, `写入 discord.role 失败：${insertResult.error?.message || '未知错误'}`)
    }

    upsertedCount += 1
  }

  return upsertedCount
}

async function syncDiscordDataByGuild(payload: {
  serviceClient: SupabaseClient
  companyId: string
  guildId: string
  env: DiscordServerEnv
}): Promise<{
  connection: IntegrationConnectionRow
  summary: DiscordSyncSummary
}> {
  const guild = await fetchDiscordBotApiJson<DiscordGuild>({
    env: payload.env,
    path: `/guilds/${payload.guildId}`,
    actionLabel: '读取 Discord Guild 信息',
  })

  const channels = await fetchDiscordBotApiJson<DiscordChannel[]>({
    env: payload.env,
    path: `/guilds/${payload.guildId}/channels`,
    actionLabel: '读取 Discord Channel 列表',
  })

  const roles = await fetchDiscordBotApiJson<DiscordRole[]>({
    env: payload.env,
    path: `/guilds/${payload.guildId}/roles`,
    actionLabel: '读取 Discord Role 列表',
  })

  const guildUuid = await upsertGuildRecord({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    guild,
  })

  const channelsUpserted = await upsertChannelRecords({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    guildId: payload.guildId,
    guildUuid,
    channels,
  })

  const rolesUpserted = await upsertDiscordRoleRecords({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    guildId: payload.guildId,
    guildUuid,
    roles,
  })

  const connection = await upsertDiscordConnection({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    workspaceId: payload.guildId,
    workspaceName: guild.name,
    status: 'connected',
  })

  return {
    connection,
    summary: {
      serverId: guildUuid,
      channelsUpserted,
      rolesUpserted,
    },
  }
}

function buildDiscordSettingsRedirectUrl(payload: {
  request: Request
  companyId: string | null
  connected: '1' | '0'
  syncStatus: 'ok' | 'degraded'
  errorMessage?: string
}): string {
  const redirectUrl = new URL('/settings/discord-integration', resolveAppOrigin(payload.request))

  if (payload.companyId) {
    redirectUrl.searchParams.set('company_id', payload.companyId)
  }

  redirectUrl.searchParams.set('discord_connected', payload.connected)
  redirectUrl.searchParams.set('discord_sync', payload.syncStatus)

  if (payload.errorMessage) {
    redirectUrl.searchParams.set('discord_error', payload.errorMessage)
  }

  return redirectUrl.toString()
}

async function handleCreateInstallUrl(request: Request): Promise<Response> {
  const env = getDiscordServerEnvOrNull(request)
  if (!env) {
    throw createApiError(
      503,
      '服务端未配置 Discord 集成所需环境变量（DISCORD_CLIENT_ID / DISCORD_CLIENT_SECRET / DISCORD_BOT_TOKEN）。',
    )
  }

  const body = await parseRequestJson<RequestWithCompanyId>(request)
  const companyId = body.companyId?.trim() || ''

  if (!isUuid(companyId)) {
    throw createApiError(400, 'companyId 非法。')
  }

  const authUser = await requireAuthenticatedUser(request)
  const serviceClient = createSupabaseServiceRoleClient()
  const membership = await getActiveOrganizationMember({
    serviceClient,
    companyId,
    userId: authUser.id,
  })

  ensureOwnerOrAdmin(membership.role)

  const nowSeconds = Math.floor(Date.now() / 1000)
  const statePayload: DiscordInstallStatePayload = {
    companyId,
    userId: authUser.id,
    iat: nowSeconds,
    exp: nowSeconds + DISCORD_STATE_TTL_SECONDS,
    nonce: randomBytes(12).toString('hex'),
  }

  const stateToken = createDiscordStateToken(statePayload, env.integrationSecret)
  const installUrl = new URL('https://discord.com/oauth2/authorize')

  installUrl.searchParams.set('client_id', env.clientId)
  installUrl.searchParams.set('scope', env.scope)
  installUrl.searchParams.set('permissions', env.permissions)
  installUrl.searchParams.set('response_type', 'code')
  installUrl.searchParams.set('redirect_uri', env.redirectUri)
  installUrl.searchParams.set('state', stateToken)

  return jsonResponse({
    installUrl: installUrl.toString(),
  })
}

/**
 * Discord OAuth callback：
 * - 失败场景统一 302 回 settings，前端可直接消费 query 提示；
 * - 成功后立即执行首次回填；
 * - 首次回填失败会将 connection 置为 degraded，保持连接可见且可手动重试。
 */
async function handleDiscordCallback(request: Request): Promise<Response> {
  const env = getDiscordServerEnvOrNull(request)
  if (!env) {
    const redirectUrl = buildDiscordSettingsRedirectUrl({
      request,
      companyId: null,
      connected: '0',
      syncStatus: 'degraded',
      errorMessage:
        '服务端未配置 Discord 集成环境变量（DISCORD_CLIENT_ID / DISCORD_CLIENT_SECRET / DISCORD_BOT_TOKEN）。',
    })

    return Response.redirect(redirectUrl, 302)
  }

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')?.trim() || ''
  const stateToken = requestUrl.searchParams.get('state')?.trim() || ''
  const guildId = requestUrl.searchParams.get('guild_id')?.trim() || ''

  if (!code || !stateToken) {
    const redirectUrl = buildDiscordSettingsRedirectUrl({
      request,
      companyId: null,
      connected: '0',
      syncStatus: 'degraded',
      errorMessage: '回调参数缺失，请重新发起 Discord 安装。',
    })

    return Response.redirect(redirectUrl, 302)
  }

  const parsedState = verifyDiscordStateToken(stateToken, env.integrationSecret)
  if (!parsedState || !isUuid(parsedState.companyId)) {
    const redirectUrl = buildDiscordSettingsRedirectUrl({
      request,
      companyId: null,
      connected: '0',
      syncStatus: 'degraded',
      errorMessage: '安装 state 校验失败或已过期，请重新发起安装。',
    })

    return Response.redirect(redirectUrl, 302)
  }

  if (!isDiscordGuildId(guildId)) {
    const redirectUrl = buildDiscordSettingsRedirectUrl({
      request,
      companyId: parsedState.companyId,
      connected: '0',
      syncStatus: 'degraded',
      errorMessage: 'Discord 回调未返回有效 guild_id，请重新安装 Bot。',
    })

    return Response.redirect(redirectUrl, 302)
  }

  try {
    const authUser = await requireAuthenticatedUser(request)

    if (authUser.id !== parsedState.userId) {
      throw createApiError(403, '当前登录用户与安装发起用户不一致，请重新发起安装。')
    }

    const serviceClient = createSupabaseServiceRoleClient()
    const membership = await getActiveOrganizationMember({
      serviceClient,
      companyId: parsedState.companyId,
      userId: authUser.id,
    })

    ensureOwnerOrAdmin(membership.role)

    await exchangeDiscordOAuthCode({
      env,
      code,
    })

    let connection = await upsertDiscordConnection({
      serviceClient,
      companyId: parsedState.companyId,
      workspaceId: guildId,
      workspaceName: null,
      status: 'connected',
    })

    try {
      await syncDiscordDataByGuild({
        serviceClient,
        companyId: parsedState.companyId,
        guildId,
        env,
      })

      const redirectUrl = buildDiscordSettingsRedirectUrl({
        request,
        companyId: parsedState.companyId,
        connected: '1',
        syncStatus: 'ok',
      })
      return Response.redirect(redirectUrl, 302)
    } catch (syncError) {
      const syncErrorMessage = syncError instanceof Error ? syncError.message : '首次回填失败。'
      connection = await markDiscordConnectionDegraded({
        serviceClient,
        companyId: parsedState.companyId,
        workspaceId: guildId,
        workspaceName: connection.external_workspace_name,
      })

      console.error('[discord_integration_callback_sync_failed]', {
        companyId: parsedState.companyId,
        guildId,
        error: syncErrorMessage,
      })

      const redirectUrl = buildDiscordSettingsRedirectUrl({
        request,
        companyId: parsedState.companyId,
        connected: '1',
        syncStatus: 'degraded',
        errorMessage: syncErrorMessage,
      })
      return Response.redirect(redirectUrl, 302)
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Discord 安装回调失败。'
    const redirectUrl = buildDiscordSettingsRedirectUrl({
      request,
      companyId: parsedState.companyId,
      connected: '0',
      syncStatus: 'degraded',
      errorMessage: message,
    })

    return Response.redirect(redirectUrl, 302)
  }
}

async function handleSyncDiscord(request: Request): Promise<Response> {
  const env = getDiscordServerEnvOrNull(request)
  if (!env) {
    throw createApiError(
      503,
      '服务端未配置 Discord 集成所需环境变量（DISCORD_CLIENT_ID / DISCORD_CLIENT_SECRET / DISCORD_BOT_TOKEN）。',
    )
  }

  const body = await parseRequestJson<SyncRequestBody>(request)
  const companyId = body.companyId?.trim() || ''
  const syncNow = Boolean(body.syncNow)

  if (!isUuid(companyId)) {
    throw createApiError(400, 'companyId 非法。')
  }

  const authUser = await requireAuthenticatedUser(request)
  const serviceClient = createSupabaseServiceRoleClient()
  const membership = await getActiveOrganizationMember({
    serviceClient,
    companyId,
    userId: authUser.id,
  })

  ensureOwnerOrAdmin(membership.role)

  const connection = await getDiscordConnectionByCompanyId({
    serviceClient,
    companyId,
  })

  if (!connection) {
    return jsonResponse({
      connection: null,
      syncSummary: null,
      message: '当前公司尚未连接 Discord。',
    })
  }

  if (!connection.external_workspace_id || !isDiscordGuildId(connection.external_workspace_id)) {
    throw createApiError(409, '当前连接缺少有效 guild_id，请重新发起 Discord 安装。')
  }

  if (!syncNow) {
    return jsonResponse({
      connection: mapConnectionRowToView(connection),
      syncSummary: null,
      message: null,
    })
  }

  try {
    const syncResult = await syncDiscordDataByGuild({
      serviceClient,
      companyId,
      guildId: connection.external_workspace_id,
      env,
    })

    return jsonResponse({
      connection: mapConnectionRowToView(syncResult.connection),
      syncSummary: {
        serverId: syncResult.summary.serverId,
        channelsUpserted: syncResult.summary.channelsUpserted,
        rolesUpserted: syncResult.summary.rolesUpserted,
      },
      message: '手动同步成功。',
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '同步失败。'

    const degradedConnection = await markDiscordConnectionDegraded({
      serviceClient,
      companyId,
      workspaceId: connection.external_workspace_id,
      workspaceName: connection.external_workspace_name,
    })

    console.error('[discord_integration_sync_failed]', {
      companyId,
      guildId: connection.external_workspace_id,
      error: errorMessage,
    })

    return jsonResponse(
      {
        error: `同步失败：${errorMessage}`,
        connection: mapConnectionRowToView(degradedConnection),
      },
      502,
    )
  }
}

async function getDiscordGuildByCompanyId(payload: {
  serviceClient: SupabaseClient
  companyId: string
  guildId: string | null
}): Promise<DiscordGuildRow | null> {
  let query = payload.serviceClient
    .schema('discord')
    .from('guild')
    .select('id, guild_id, name')
    .eq('company_id', payload.companyId)
    .not('guild_id', 'is', null)

  if (payload.guildId) {
    query = query.eq('guild_id', payload.guildId)
  }

  const guildResult = await query
    .order('id', { ascending: true })
    .limit(1)
    .maybeSingle<DiscordGuildRow>()

  if (guildResult.error) {
    throw createApiError(500, `读取 discord.guild 失败：${guildResult.error.message}`)
  }

  return guildResult.data || null
}

/**
 * 解析 Discord ticket 面板发布所需的 guild 绑定信息。
 *
 * 设计说明：
 * - 新链路不再依赖旧 `public.server`，内部实体统一以 `discord.guild` 为准；
 * - `integration.connection.external_workspace_id` 存的是 Discord 原生 guild id，
 *   它应当与 `discord.guild.guild_id` 一致，而不是 `discord.guild.id`；
 * - `guildId` 继续使用 Discord 原生 guild id，供 bot 与 ticket_tool 表使用；
 * - `guildRecordId` 使用 `discord.guild.id`，继续写入兼容字段 `server_id`，
 *   这样无需同时改动 bot 的请求结构与历史 panel_snapshot 结构。
 */
function resolveDiscordTicketGuildBinding(payload: {
  guild: DiscordGuildRow | null
  connectionGuildId: string | null
}): {
  guildId: string | null
  guildRecordId: string | null
} {
  const guildId = payload.guild?.guild_id?.trim() || payload.connectionGuildId?.trim() || null
  const guildRecordId = payload.guild?.id?.trim() || null

  return {
    guildId,
    guildRecordId,
  }
}

/**
 * 统一构造 ticket_tool 域记录的租户作用域字段。
 *
 * 设计说明：
 * - `company_id` 已经成为 `ticket_config` / `ticket_panel_message` 的强约束字段；
 * - `guild_uuid` 对应 `discord.guild.id`，用于把业务记录稳定绑定到 Discord 投影；
 * - 所有写入都复用这组字段，避免某一条链路遗漏导致约束错误。
 */
function buildDiscordTicketScopeWriteData(payload: {
  companyId: string
  guildId: string
  guildRecordId: string
}): DiscordTicketScopeWriteData {
  return {
    company_id: payload.companyId,
    guild_id: payload.guildId,
    guild_uuid: payload.guildRecordId,
  }
}

async function readJsonObjectResponse(response: Response): Promise<Record<string, unknown>> {
  const responseText = await response.text().catch(() => '')
  if (!responseText) {
    return {}
  }

  try {
    const parsedResponse = JSON.parse(responseText) as unknown
    if (!parsedResponse || typeof parsedResponse !== 'object' || Array.isArray(parsedResponse)) {
      return {}
    }

    return parsedResponse as Record<string, unknown>
  } catch {
    return {
      error: responseText,
    }
  }
}

function extractErrorMessageFromResponseJson(
  responseJson: Record<string, unknown>,
  fallbackMessage: string,
): string {
  if (typeof responseJson.error === 'string' && responseJson.error.trim()) {
    return responseJson.error.trim()
  }

  if (typeof responseJson.detail === 'string' && responseJson.detail.trim()) {
    return responseJson.detail.trim()
  }

  if (responseJson.detail !== undefined) {
    try {
      const serializedDetail = JSON.stringify(responseJson.detail)
      if (serializedDetail && serializedDetail !== 'null' && serializedDetail !== '""') {
        return serializedDetail
      }
    } catch {
      // 忽略 detail 序列化失败，回退到默认错误文案。
    }
  }

  return fallbackMessage
}

async function getTicketConfigByGuildId(payload: {
  serviceClient: SupabaseClient
  companyId: string
  guildId: string
}): Promise<TicketConfigRow | null> {
  const ticketConfigResult = await payload.serviceClient
    .schema('ticket_tool')
    .from('ticket_config')
    .select(TICKET_CONFIG_SELECT_FIELDS)
    .eq('company_id', payload.companyId)
    .eq('guild_id', payload.guildId)
    .limit(1)
    .maybeSingle<TicketConfigRow>()

  if (ticketConfigResult.error) {
    throw createApiError(500, `读取 ticket_config 失败：${ticketConfigResult.error.message}`)
  }

  return ticketConfigResult.data || null
}

async function getLatestTicketPanelMessageByGuildAndChannel(payload: {
  serviceClient: SupabaseClient
  companyId: string
  guildId: string
  channelId: string
}): Promise<TicketPanelMessageRow | null> {
  const ticketPanelResult = await payload.serviceClient
    .schema('ticket_tool')
    .from('ticket_panel_message')
    .select(TICKET_PANEL_MESSAGE_SELECT_FIELDS)
    .eq('company_id', payload.companyId)
    .eq('guild_id', payload.guildId)
    .eq('channel_id', payload.channelId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle<TicketPanelMessageRow>()

  if (ticketPanelResult.error) {
    throw createApiError(500, `读取 ticket_panel_message 失败：${ticketPanelResult.error.message}`)
  }

  return ticketPanelResult.data || null
}

/**
 * 将发布表单整理为 ticket_config 的增量更新字段。
 *
 * 这里保留“未传字段不覆盖”的语义，避免用户只改一个字段时把其余默认配置清空。
 */
function buildDiscordTicketConfigWriteData(payload: {
  requestBody: DiscordTicketPanelPublishRequestBody
  channelId: string
}): DiscordTicketConfigWriteData {
  const writeData: DiscordTicketConfigWriteData = {
    panel_channel_id: payload.channelId,
  }

  const categoryId = normalizeOptionalNullableString(payload.requestBody.categoryId)
  if (categoryId !== undefined) {
    writeData.category_id = categoryId
  }

  const closedCategoryId = normalizeOptionalNullableString(payload.requestBody.closedCategoryId)
  if (closedCategoryId !== undefined) {
    writeData.closed_category_id = closedCategoryId
  }

  const staffRoleIds = normalizeDiscordRoleIds(payload.requestBody.staffRoleIds)
  if (staffRoleIds !== undefined) {
    writeData.staff_role_ids = staffRoleIds
  }

  const panelName = normalizeOptionalNullableString(payload.requestBody.panelName)
  if (panelName !== undefined) {
    writeData.panel_name = panelName
  }

  const panelMessageTemplate = normalizeOptionalNullableString(payload.requestBody.panelMessageTemplate)
  if (panelMessageTemplate !== undefined) {
    writeData.panel_message_template = panelMessageTemplate
  }

  const ticketMessageTemplate = normalizeOptionalNullableString(payload.requestBody.ticketMessageTemplate)
  if (ticketMessageTemplate !== undefined) {
    writeData.ticket_message_template = ticketMessageTemplate
  }

  const introMessageTemplate = normalizeOptionalNullableString(payload.requestBody.introMessageTemplate)
  if (introMessageTemplate !== undefined) {
    writeData.intro_message_template = introMessageTemplate
  }

  const formQuestions = normalizeDiscordTicketFormQuestionsForWrite(payload.requestBody.formQuestions)
  if (formQuestions !== undefined) {
    writeData.form_questions = formQuestions
  }

  return writeData
}

async function upsertDiscordTicketConfig(payload: {
  serviceClient: SupabaseClient
  companyId: string
  guildId: string
  guildRecordId: string
  existingConfig: TicketConfigRow | null
  writeData: DiscordTicketConfigWriteData
}): Promise<TicketConfigRow> {
  const scopeWriteData = buildDiscordTicketScopeWriteData({
    companyId: payload.companyId,
    guildId: payload.guildId,
    guildRecordId: payload.guildRecordId,
  })

  if (!payload.existingConfig) {
    const insertResult = await payload.serviceClient
      .schema('ticket_tool')
      .from('ticket_config')
      .insert({
        ...scopeWriteData,
        ...payload.writeData,
      })
      .select(TICKET_CONFIG_SELECT_FIELDS)
      .single<TicketConfigRow>()

    if (insertResult.error || !insertResult.data) {
      throw createApiError(500, `写入 ticket_config 失败：${insertResult.error?.message || '未知错误'}`)
    }

    return insertResult.data
  }

  const updateResult = await payload.serviceClient
    .schema('ticket_tool')
    .from('ticket_config')
    .update({
      ...scopeWriteData,
      ...payload.writeData,
    })
    .eq('id', payload.existingConfig.id)
    .select(TICKET_CONFIG_SELECT_FIELDS)
    .single<TicketConfigRow>()

  if (updateResult.error || !updateResult.data) {
    throw createApiError(500, `更新 ticket_config 失败：${updateResult.error?.message || '未知错误'}`)
  }

  return updateResult.data
}

/**
 * 解析最终应该发送给 bot / 写入 snapshot 的面板状态。
 *
 * 设计说明：
 * - 先写 ticket_config，再用“请求覆盖值 + 当前配置”合成最终状态；
 * - 这样即使用户只改部分字段，bot 侧也能收到完整上下文。
 */
function resolveDiscordTicketPublishState(payload: {
  requestBody: DiscordTicketPanelPublishRequestBody
  configRow: TicketConfigRow
}): DiscordTicketResolvedPublishState {
  const defaultConfig = mapTicketConfigRowToDefaultConfig(payload.configRow)
  const normalizedPanelName = normalizeOptionalNullableString(payload.requestBody.panelName)
  const normalizedCategoryId = normalizeOptionalNullableString(payload.requestBody.categoryId)
  const normalizedClosedCategoryId = normalizeOptionalNullableString(payload.requestBody.closedCategoryId)
  const normalizedStaffRoleIds = normalizeDiscordRoleIds(payload.requestBody.staffRoleIds)
  const normalizedPanelMessageTemplate = normalizeOptionalNullableString(payload.requestBody.panelMessageTemplate)
  const normalizedTicketMessageTemplate = normalizeOptionalNullableString(payload.requestBody.ticketMessageTemplate)
  const normalizedIntroMessageTemplate = normalizeOptionalNullableString(payload.requestBody.introMessageTemplate)
  const normalizedFormQuestions = normalizeDiscordTicketFormQuestionsForWrite(payload.requestBody.formQuestions)
  const fallbackFormQuestions = cloneDiscordTicketFormQuestions(defaultConfig.formQuestions)

  return {
    panelName: resolvePublishOverride(normalizedPanelName, defaultConfig.panelName),
    categoryId: resolvePublishOverride(normalizedCategoryId, defaultConfig.categoryId),
    closedCategoryId: resolvePublishOverride(normalizedClosedCategoryId, defaultConfig.closedCategoryId),
    staffRoleIds: resolvePublishOverride(normalizedStaffRoleIds, defaultConfig.staffRoleIds),
    panelMessageTemplate: resolvePublishOverride(
      normalizedPanelMessageTemplate,
      defaultConfig.panelMessageTemplate,
    ),
    ticketMessageTemplate: resolvePublishOverride(
      normalizedTicketMessageTemplate,
      defaultConfig.ticketMessageTemplate,
    ),
    introMessageTemplate: resolvePublishOverride(
      normalizedIntroMessageTemplate,
      defaultConfig.introMessageTemplate,
    ),
    formQuestions: resolvePublishOverride(normalizedFormQuestions, fallbackFormQuestions),
  }
}

function buildDiscordTicketBotPublishPayload(payload: {
  guildRecordId: string
  guildId: string
  channelId: string
  resolvedState: DiscordTicketResolvedPublishState
}): DiscordTicketBotPublishPayload {
  return {
    server_id: payload.guildRecordId,
    guild_id: payload.guildId,
    channel_id: payload.channelId,
    category_id: payload.resolvedState.categoryId,
    closed_category_id: payload.resolvedState.closedCategoryId,
    staff_role_ids: [...payload.resolvedState.staffRoleIds],
    panel_message_template: payload.resolvedState.panelMessageTemplate,
    ticket_message_template: payload.resolvedState.ticketMessageTemplate,
    intro_message_template: payload.resolvedState.introMessageTemplate,
    form_questions: cloneDiscordTicketFormQuestions(payload.resolvedState.formQuestions),
  }
}

function buildDiscordTicketPanelSnapshot(payload: {
  guildRecordId: string
  guildId: string
  channelId: string
  resolvedState: DiscordTicketResolvedPublishState
}): TicketPanelSnapshotPayload {
  return {
    server_id: payload.guildRecordId,
    guild_id: payload.guildId,
    channel_id: payload.channelId,
    panel_name: payload.resolvedState.panelName,
    category_id: payload.resolvedState.categoryId,
    closed_category_id: payload.resolvedState.closedCategoryId,
    staff_role_ids: [...payload.resolvedState.staffRoleIds],
    panel_message_template: payload.resolvedState.panelMessageTemplate,
    ticket_message_template: payload.resolvedState.ticketMessageTemplate,
    intro_message_template: payload.resolvedState.introMessageTemplate,
    form_questions: cloneDiscordTicketFormQuestions(payload.resolvedState.formQuestions),
  }
}

async function callDiscordTicketBot(payload: {
  env: DiscordTicketBotEnv
  endpointPath: string
  body: Record<string, unknown>
  defaultErrorMessage: string
}): Promise<Record<string, unknown>> {
  const response = await fetch(
    buildDiscordTicketBotApiUrl(payload.env.botBaseUrl, payload.endpointPath),
    {
      method: 'POST',
      headers: buildDiscordTicketBotForwardHeaders(payload.env.internalApiToken),
      body: JSON.stringify(payload.body),
    },
  )

  const responseJson = await readJsonObjectResponse(response)
  if (!response.ok) {
    const errorMessage = extractErrorMessageFromResponseJson(
      responseJson,
      payload.defaultErrorMessage,
    )

    throw createApiError(response.status, errorMessage)
  }

  if (responseJson.status !== undefined && responseJson.status !== 'success') {
    const errorMessage = extractErrorMessageFromResponseJson(
      responseJson,
      payload.defaultErrorMessage,
    )
    throw createApiError(502, errorMessage)
  }

  return responseJson
}

function extractBotMessageId(responseJson: Record<string, unknown>): string {
  const responseData = responseJson.data
  if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
    const messageId = (responseData as Record<string, unknown>).message_id
    if (typeof messageId === 'string' && messageId.trim()) {
      return messageId.trim()
    }
  }

  if (typeof responseJson.message_id === 'string' && responseJson.message_id.trim()) {
    return responseJson.message_id.trim()
  }

  return ''
}

function extractBotChannelId(responseJson: Record<string, unknown>, fallbackChannelId: string): string {
  const responseData = responseJson.data
  if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
    const channelId = (responseData as Record<string, unknown>).channel_id
    if (typeof channelId === 'string' && channelId.trim()) {
      return channelId.trim()
    }
  }

  if (typeof responseJson.channel_id === 'string' && responseJson.channel_id.trim()) {
    return responseJson.channel_id.trim()
  }

  return fallbackChannelId
}

async function upsertDiscordTicketPanelMessage(payload: {
  serviceClient: SupabaseClient
  companyId: string
  guildId: string
  guildRecordId: string
  messageId: string
  channelId: string
  panelSnapshot: TicketPanelSnapshotPayload
}): Promise<void> {
  const scopeWriteData = buildDiscordTicketScopeWriteData({
    companyId: payload.companyId,
    guildId: payload.guildId,
    guildRecordId: payload.guildRecordId,
  })

  const upsertResult = await payload.serviceClient
    .schema('ticket_tool')
    .from('ticket_panel_message')
    .upsert(
      {
        ...scopeWriteData,
        message_id: payload.messageId,
        channel_id: payload.channelId,
        panel_snapshot: payload.panelSnapshot,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'message_id',
      },
    )

  if (upsertResult.error) {
    throw createApiError(500, `写入 ticket_panel_message 失败：${upsertResult.error.message}`)
  }
}

/**
 * Ticket panel 快照接口：
 * - 返回当前公司的 guild / 已发布 panel / 可用频道 / 角色；
 * - 让前端一次请求即可拿到编辑器所需的全部数据。
 */
async function handleGetDiscordTicketPanelsSnapshot(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const companyId = requestUrl.searchParams.get('company_id')?.trim() || ''

  if (!isUuid(companyId)) {
    throw createApiError(400, 'company_id 非法。')
  }

  const authUser = await requireAuthenticatedUser(request)
  const serviceClient = createSupabaseServiceRoleClient()

  await getActiveOrganizationMember({
    serviceClient,
    companyId,
    userId: authUser.id,
  })

  const connection = await getDiscordConnectionByCompanyId({
    serviceClient,
    companyId,
  })

  const connectionGuildId = connection?.external_workspace_id?.trim() || null
  const guild = await getDiscordGuildByCompanyId({
    serviceClient,
    companyId,
    guildId: connectionGuildId,
  })
  const { guildId } = resolveDiscordTicketGuildBinding({
    guild,
    connectionGuildId,
  })

  const channelQuery = serviceClient
    .schema('discord')
    .from('channel')
    .select('id, guild_id, channel_id, name, channel_type, parent_id')
    .eq('company_id', companyId)

  const roleQuery = serviceClient
    .schema('discord')
    .from('role')
    .select('id, guild_id, role_id, name, mentionable, position')
    .eq('company_id', companyId)
    .not('role_id', 'is', null)

  if (guildId) {
    channelQuery.eq('guild_id', guildId)
    roleQuery.eq('guild_id', guildId)
  }

  const [channelResult, roleResult, ticketConfigResult, ticketPanelsResult] = await Promise.all([
    channelQuery.order('name', { ascending: true }),
    roleQuery.order('position', { ascending: false }),
    guildId
      ? serviceClient
        .schema('ticket_tool')
        .from('ticket_config')
        .select(TICKET_CONFIG_SELECT_FIELDS)
        .eq('company_id', companyId)
        .eq('guild_id', guildId)
        .limit(1)
        .maybeSingle<TicketConfigRow>()
      : Promise.resolve({ data: null, error: null }),
    guildId
      ? serviceClient
        .schema('ticket_tool')
        .from('ticket_panel_message')
        .select(TICKET_PANEL_MESSAGE_SELECT_FIELDS)
        .eq('company_id', companyId)
        .eq('guild_id', guildId)
        .order('updated_at', { ascending: false })
      : Promise.resolve({ data: [], error: null }),
  ])

  if (channelResult.error) {
    throw createApiError(500, `读取 discord.channel 失败：${channelResult.error.message}`)
  }

  if (roleResult.error) {
    throw createApiError(500, `读取 discord.role 失败：${roleResult.error.message}`)
  }

  if (ticketConfigResult.error) {
    throw createApiError(500, `读取 ticket_config 失败：${ticketConfigResult.error.message}`)
  }

  if (ticketPanelsResult.error) {
    throw createApiError(500, `读取 ticket_panel_message 失败：${ticketPanelsResult.error.message}`)
  }

  const channels = ((channelResult.data || []) as DiscordChannelRow[]).map(mapDiscordChannelRowToView)
  const roleOptions = ((roleResult.data || []) as DiscordRoleRow[])
    .map(mapDiscordRoleRowToView)
    .filter((role): role is DiscordTicketRoleOptionView => role !== null)
  const defaultConfig = mapTicketConfigRowToDefaultConfig((ticketConfigResult.data || null) as TicketConfigRow | null)

  const channelNameById = new Map<string, string>()
  channels.forEach((channel) => {
    channelNameById.set(channel.channelId, channel.name)
  })

  const categoryNameById = new Map<string, string>()
  channels
    .filter((channel) => channel.channelType === 4)
    .forEach((channel) => {
      categoryNameById.set(channel.channelId, channel.name)
    })

  const publishChannels: DiscordTicketChannelOptionView[] = channels
    .filter((channel) => isDiscordPublishableChannelType(channel.channelType))
    .map((channel) => ({
      id: channel.channelId,
      name: channel.name,
      channelType: channel.channelType,
      parentId: channel.parentId,
      parentName: channel.parentId ? channelNameById.get(channel.parentId) || null : null,
    }))

  const categoryChannels: DiscordTicketChannelOptionView[] = channels
    .filter((channel) => channel.channelType === 4)
    .map((channel) => ({
      id: channel.channelId,
      name: channel.name,
      channelType: channel.channelType,
      parentId: channel.parentId,
      parentName: null,
    }))

  const panels = ((ticketPanelsResult.data || []) as TicketPanelMessageRow[]).map((row) =>
    mapTicketPanelMessageRowToView({
      row,
      defaultConfig,
      channelNameById,
      categoryNameById,
    }),
  )

  const responsePayload: DiscordTicketPanelsSnapshotView = {
    guildId,
    defaultConfig,
    panels,
    publishChannels,
    categoryChannels,
    roleOptions,
  }

  return jsonResponse(responsePayload)
}

/**
 * 发布或更新 Discord ticket panel：
 * - 前端只传 companyId + panel 表单；
 * - 服务端直接写本地 ticket 表，并直连 lucius-bot 完成发布或编辑。
 */
async function handlePublishDiscordTicketPanel(request: Request): Promise<Response> {
  const payload = await parseRequestJson<DiscordTicketPanelPublishRequestBody>(request)

  const companyId = payload.companyId?.trim() || ''
  const channelId = payload.channelId?.trim() || ''

  if (!isUuid(companyId)) {
    throw createApiError(400, 'companyId 非法。')
  }

  if (!channelId) {
    throw createApiError(400, 'channelId 不能为空。')
  }

  const authUser = await requireAuthenticatedUser(request)
  const serviceClient = createSupabaseServiceRoleClient()
  const membership = await getActiveOrganizationMember({
    serviceClient,
    companyId,
    userId: authUser.id,
  })
  ensureOwnerOrAdmin(membership.role)

  const connection = await getDiscordConnectionByCompanyId({
    serviceClient,
    companyId,
  })

  const connectionGuildId = connection?.external_workspace_id?.trim() || null
  const guild = await getDiscordGuildByCompanyId({
    serviceClient,
    companyId,
    guildId: connectionGuildId,
  })
  const { guildId, guildRecordId } = resolveDiscordTicketGuildBinding({
    guild,
    connectionGuildId,
  })

  if (!guildId) {
    throw createApiError(409, '当前公司尚未完成 Discord 社区关联。')
  }

  if (!guildRecordId) {
    throw createApiError(409, '当前 Discord 社区尚未同步 guild 记录，请先执行 Discord 手动同步。')
  }

  const env = getDiscordTicketBotEnvOrNull()
  if (!env) {
    throw createApiError(503, '服务端缺少 CLIENT_CHAT_BOT_BASE_URL 或 LUCIUS_BOT_BASE_URL 配置。')
  }

  const [existingConfig, existingPanel] = await Promise.all([
    getTicketConfigByGuildId({
      serviceClient,
      companyId,
      guildId,
    }),
    getLatestTicketPanelMessageByGuildAndChannel({
      serviceClient,
      companyId,
      guildId,
      channelId,
    }),
  ])

  const writeData = buildDiscordTicketConfigWriteData({
    requestBody: payload,
    channelId,
  })
  const savedConfig = await upsertDiscordTicketConfig({
    serviceClient,
    companyId,
    guildId,
    guildRecordId,
    existingConfig,
    writeData,
  })
  const resolvedState = resolveDiscordTicketPublishState({
    requestBody: payload,
    configRow: savedConfig,
  })
  const botPayload = buildDiscordTicketBotPublishPayload({
    guildRecordId,
    guildId,
    channelId,
    resolvedState,
  })
  const panelSnapshot = buildDiscordTicketPanelSnapshot({
    guildRecordId,
    guildId,
    channelId,
    resolvedState,
  })

  if (existingPanel) {
    const existingSnapshotFingerprint = stableStringifyJson(existingPanel.panel_snapshot)
    const nextSnapshotFingerprint = stableStringifyJson(panelSnapshot)

    if (existingSnapshotFingerprint === nextSnapshotFingerprint) {
      return jsonResponse({
        messageId: existingPanel.message_id,
        channelId: existingPanel.channel_id || channelId,
      })
    }

    const editResponse = await callDiscordTicketBot({
      env,
      endpointPath: '/panels/edit',
      body: {
        ...botPayload,
        message_id: existingPanel.message_id,
      },
      defaultErrorMessage: '更新 ticket panel 失败。',
    })
    const messageId = extractBotMessageId(editResponse) || existingPanel.message_id
    const botChannelId = extractBotChannelId(editResponse, channelId)

    await upsertDiscordTicketPanelMessage({
      serviceClient,
      companyId,
      guildId,
      guildRecordId,
      messageId,
      channelId: botChannelId,
      panelSnapshot,
    })

    return jsonResponse({
      messageId,
      channelId: botChannelId,
    })
  }

  const publishResponse = await callDiscordTicketBot({
    env,
    endpointPath: '/panels/publish',
    body: botPayload,
    defaultErrorMessage: '发布 ticket panel 失败。',
  })
  const messageId = extractBotMessageId(publishResponse)
  if (!messageId) {
    throw createApiError(502, 'lucius-bot 未返回有效的 message_id。')
  }
  const botChannelId = extractBotChannelId(publishResponse, channelId)

  await upsertDiscordTicketPanelMessage({
    serviceClient,
    companyId,
    guildId,
    guildRecordId,
    messageId,
    channelId: botChannelId,
    panelSnapshot,
  })

  return jsonResponse({
    messageId,
    channelId: botChannelId,
  })
}

/**
 * 读取当前公司的 Discord 社区（channel）列表：
 * - 仅校验 active 成员身份；
 * - 不要求 Owner/Admin，支持成员只读查看。
 */
async function handleGetDiscordChannels(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const companyId = requestUrl.searchParams.get('company_id')?.trim() || ''

  if (!isUuid(companyId)) {
    throw createApiError(400, 'company_id 非法。')
  }

  const authUser = await requireAuthenticatedUser(request)
  const serviceClient = createSupabaseServiceRoleClient()

  await getActiveOrganizationMember({
    serviceClient,
    companyId,
    userId: authUser.id,
  })

  const channelResult = await serviceClient
    .schema('discord')
    .from('channel')
    .select('id, guild_id, channel_id, name, channel_type, parent_id')
    .eq('company_id', companyId)
    .order('name', { ascending: true })

  if (channelResult.error) {
    throw createApiError(500, `读取 discord.channel 失败：${channelResult.error.message}`)
  }

  const channels = ((channelResult.data || []) as DiscordChannelRow[]).map(mapDiscordChannelRowToView)

  return jsonResponse({
    channels,
  })
}

export async function handleDiscordIntegrationApi(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const pathname = requestUrl.pathname
  const method = request.method.toUpperCase()

  try {
    if (pathname === '/api/settings/discord/install-url' && method === 'POST') {
      return await handleCreateInstallUrl(request)
    }

    if (pathname === '/api/settings/discord/ticket-panels' && method === 'GET') {
      return await handleGetDiscordTicketPanelsSnapshot(request)
    }

    if (pathname === '/api/settings/discord/ticket-panels/publish' && method === 'POST') {
      return await handlePublishDiscordTicketPanel(request)
    }

    if (pathname === '/api/settings/discord/channels' && method === 'GET') {
      return await handleGetDiscordChannels(request)
    }

    if (pathname === '/api/settings/discord/callback' && method === 'GET') {
      return await handleDiscordCallback(request)
    }

    if (pathname === '/api/settings/discord/sync' && method === 'POST') {
      return await handleSyncDiscord(request)
    }

    return jsonResponse(
      {
        error: '未找到 Discord 集成 API 路径。',
      },
      404,
    )
  } catch (error) {
    if (typeof error === 'object' && error && 'status' in error && 'message' in error) {
      const apiError = error as ApiError
      return jsonResponse(
        {
          error: apiError.message,
        },
        apiError.status,
      )
    }

    const message = error instanceof Error ? error.message : 'Discord 集成接口出现未知错误。'
    return jsonResponse({ error: message }, 500)
  }
}

export const __discordIntegrationApiTestables = {
  buildDiscordTicketBotApiUrl,
  buildDiscordTicketConfigWriteData,
  buildDiscordTicketScopeWriteData,
  extractErrorMessageFromResponseJson,
  resolveDiscordTicketPublishState,
  resolveDiscordTicketGuildBinding,
  stableStringifyJson,
}
