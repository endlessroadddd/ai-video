import type { SupabaseClient } from '@supabase/supabase-js'

import {
  createSupabaseServerClientForRequest,
  createSupabaseServiceRoleClient,
} from '@/lib/supabase/server'

type CompanyRole = 'owner' | 'admin' | 'member'
type FeishuBotStatus = 'active' | 'disabled' | 'error' | 'pending' | 'connecting' | 'unknown'

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

type FeishuIntegrationServerEnv = {
  botApiBaseUrl: string
  internalApiToken: string
}

type FeishuBotView = {
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

type RequestWithCompanyId = {
  companyId?: string
}

type CreateFeishuBotRequestBody = RequestWithCompanyId & {
  name?: string
  appId?: string
  appSecret?: string
  isDefault?: boolean
}

type UpdateFeishuBotRequestBody = RequestWithCompanyId & {
  name?: string
  isDefault?: boolean
  status?: string
  appSecret?: string | null
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

/**
 * 统一把 bot 服务 base URL 规范到 `/v2`：
 * - Feishu Bot 管理接口由 `lucius-bot` 提供，不走 `lucius-api-server` 的 `/api/v2`；
 * - 兼容环境变量可能已经带上 `/v2` 前缀，避免重复拼接。
 */
function buildBotApiUrl(baseUrl: string, endpointPath: string): string {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl)
  const parsedBaseUrl = new URL(normalizedBaseUrl)
  const normalizedPathname = parsedBaseUrl.pathname.replace(/\/+$/, '')

  if (normalizedPathname.endsWith('/v2')) {
    return `${normalizedBaseUrl}${endpointPath}`
  }

  return `${normalizedBaseUrl}/v2${endpointPath}`
}

function getFeishuIntegrationServerEnvOrNull(): FeishuIntegrationServerEnv | null {
  const botApiBaseUrl =
    process.env.CLIENT_CHAT_BOT_BASE_URL?.trim()
    || process.env.LUCIUS_BOT_BASE_URL?.trim()
    || ''
  const internalApiToken =
    process.env.CLIENT_CHAT_INTERNAL_API_TOKEN?.trim()
    || process.env.INTERNAL_API_TOKEN?.trim()
    || ''

  if (!botApiBaseUrl || !internalApiToken) {
    return null
  }

  return {
    botApiBaseUrl: normalizeBaseUrl(botApiBaseUrl),
    internalApiToken,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const normalizedValue = value.trim()
  return normalizedValue || null
}

function readBoolean(value: unknown): boolean | null {
  if (typeof value === 'boolean') {
    return value
  }

  return null
}

function readNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  return null
}

function pickField(record: Record<string, unknown>, keys: string[]): unknown {
  for (const key of keys) {
    if (key in record) {
      return record[key]
    }
  }

  return undefined
}

function normalizeFeishuBotStatus(value: string | null): FeishuBotStatus {
  const normalizedValue = String(value || '').trim().toLowerCase()

  if (normalizedValue === 'active') return 'active'
  if (normalizedValue === 'disabled') return 'disabled'
  if (normalizedValue === 'error') return 'error'
  if (normalizedValue === 'pending') return 'pending'
  if (normalizedValue === 'connecting') return 'connecting'

  return 'unknown'
}

/**
 * 后端接口目前仍在演进，代理层负责兼容 snake_case / camelCase：
 * - 这样前端组件只依赖一套稳定结构；
 * - 后续后端字段落定后，这里仍可平滑兼容历史返回。
 */
function normalizeFeishuBot(rawValue: unknown): FeishuBotView | null {
  if (!isRecord(rawValue)) {
    return null
  }

  const id = readString(pickField(rawValue, ['id']))
  const companyId = readString(pickField(rawValue, ['company_id', 'companyId']))
  const name = readString(pickField(rawValue, ['name']))
  const appId = readString(pickField(rawValue, ['app_id', 'appId']))

  if (!id || !companyId || !name || !appId) {
    return null
  }

  return {
    id,
    companyId,
    name,
    appId,
    tenantKey: readString(pickField(rawValue, ['tenant_key', 'tenantKey'])),
    status: normalizeFeishuBotStatus(readString(pickField(rawValue, ['status']))),
    isDefault: readBoolean(pickField(rawValue, ['is_default', 'isDefault'])) || false,
    configVersion: readNumber(pickField(rawValue, ['config_version', 'configVersion'])) || 1,
    lastVerifiedAt: readString(pickField(rawValue, ['last_verified_at', 'lastVerifiedAt'])),
    lastConnectedAt: readString(pickField(rawValue, ['last_connected_at', 'lastConnectedAt'])),
    lastHeartbeatAt: readString(pickField(rawValue, ['last_heartbeat_at', 'lastHeartbeatAt'])),
    lastEventAt: readString(pickField(rawValue, ['last_event_at', 'lastEventAt'])),
    lastError: readString(pickField(rawValue, ['last_error', 'lastError'])),
    createdAt: readString(pickField(rawValue, ['created_at', 'createdAt'])),
    updatedAt: readString(pickField(rawValue, ['updated_at', 'updatedAt'])),
  }
}

function extractFeishuBots(rawValue: unknown): FeishuBotView[] {
  if (Array.isArray(rawValue)) {
    return rawValue
      .map(normalizeFeishuBot)
      .filter((bot): bot is FeishuBotView => Boolean(bot))
  }

  if (!isRecord(rawValue)) {
    return []
  }

  const nestedCollection = pickField(rawValue, ['bots', 'items', 'data', 'results'])

  if (nestedCollection !== undefined) {
    const normalizedNestedBots = extractFeishuBots(nestedCollection)
    if (normalizedNestedBots.length > 0) {
      return normalizedNestedBots
    }
  }

  const normalizedBot = normalizeFeishuBot(rawValue)
  return normalizedBot ? [normalizedBot] : []
}

function extractMessage(rawValue: unknown): string | null {
  if (typeof rawValue === 'string') {
    const normalizedValue = rawValue.trim()
    return normalizedValue || null
  }

  if (!isRecord(rawValue)) {
    return null
  }

  const directMessage = readString(pickField(rawValue, ['message', 'detail', 'error']))
  if (directMessage) {
    return directMessage
  }

  const nestedPayload = pickField(rawValue, ['data'])
  if (nestedPayload !== undefined) {
    return extractMessage(nestedPayload)
  }

  return null
}

function buildPlatformHeaders(internalApiToken: string, includeJsonContentType = false): HeadersInit {
  const baseHeaders: HeadersInit = {
    Authorization: `Bearer ${internalApiToken}`,
    'X-Internal-Api-Token': internalApiToken,
  }

  if (includeJsonContentType) {
    return {
      ...baseHeaders,
      'Content-Type': 'application/json; charset=utf-8',
    }
  }

  return baseHeaders
}

async function parseUpstreamPayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type')?.toLowerCase() || ''

  if (contentType.includes('application/json')) {
    try {
      return await response.json()
    } catch {
      return null
    }
  }

  const textPayload = (await response.text()).trim()
  if (!textPayload) {
    return null
  }

  return {
    message: textPayload,
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
    throw createApiError(403, '仅 Owner/Admin 可管理 Feishu Bot。')
  }
}

function normalizeCompanyId(companyId: string | undefined): string {
  const normalizedCompanyId = String(companyId || '').trim()

  if (!isUuid(normalizedCompanyId)) {
    throw createApiError(400, 'company_id 非法。')
  }

  return normalizedCompanyId
}

function normalizeBotId(botId: string): string {
  const normalizedBotId = decodeURIComponent(botId).trim()

  if (!isUuid(normalizedBotId)) {
    throw createApiError(400, 'bot_id 非法。')
  }

  return normalizedBotId
}

function normalizeRequiredTextField(value: string | undefined, fieldName: string): string {
  const normalizedValue = String(value || '').trim()

  if (!normalizedValue) {
    throw createApiError(400, `${fieldName} 不能为空。`)
  }

  return normalizedValue
}

function normalizeEditableBotStatus(value: string | undefined): 'active' | 'disabled' {
  const normalizedValue = String(value || '').trim().toLowerCase()

  if (normalizedValue === 'active' || normalizedValue === 'disabled') {
    return normalizedValue
  }

  throw createApiError(400, 'status 仅支持 active/disabled。')
}

function ensureServerEnv(): FeishuIntegrationServerEnv {
  const env = getFeishuIntegrationServerEnvOrNull()

  if (!env) {
    throw createApiError(503, '服务端缺少 CLIENT_CHAT_BOT_BASE_URL / LUCIUS_BOT_BASE_URL 或 CLIENT_CHAT_INTERNAL_API_TOKEN 配置。')
  }

  return env
}

async function handleGetFeishuBots(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const companyId = normalizeCompanyId(requestUrl.searchParams.get('company_id') || undefined)
  const authUser = await requireAuthenticatedUser(request)
  const serviceClient = createSupabaseServiceRoleClient()

  await getActiveOrganizationMember({
    serviceClient,
    companyId,
    userId: authUser.id,
  })

  const env = ensureServerEnv()
  const upstreamUrl = new URL(buildBotApiUrl(env.botApiBaseUrl, '/integrations/feishu/bots'))
  upstreamUrl.searchParams.set('companyId', companyId)

  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: 'GET',
    headers: buildPlatformHeaders(env.internalApiToken),
  })
  const upstreamPayload = await parseUpstreamPayload(upstreamResponse)

  if (!upstreamResponse.ok) {
    throw createApiError(upstreamResponse.status, extractMessage(upstreamPayload) || '读取 Feishu Bot 列表失败。')
  }

  return jsonResponse({
    bots: extractFeishuBots(upstreamPayload),
  })
}

async function handleCreateFeishuBot(request: Request): Promise<Response> {
  const body = await parseRequestJson<CreateFeishuBotRequestBody>(request)
  const companyId = normalizeCompanyId(body.companyId)
  const name = normalizeRequiredTextField(body.name, 'name')
  const appId = normalizeRequiredTextField(body.appId, 'appId')
  const appSecret = normalizeRequiredTextField(body.appSecret, 'appSecret')
  const authUser = await requireAuthenticatedUser(request)
  const serviceClient = createSupabaseServiceRoleClient()
  const membership = await getActiveOrganizationMember({
    serviceClient,
    companyId,
    userId: authUser.id,
  })

  ensureOwnerOrAdmin(membership.role)

  const env = ensureServerEnv()
  const upstreamResponse = await fetch(
    buildBotApiUrl(env.botApiBaseUrl, '/integrations/feishu/bots'),
    {
      method: 'POST',
      headers: buildPlatformHeaders(env.internalApiToken, true),
      body: JSON.stringify({
        companyId,
        name,
        appId,
        appSecret,
        isDefault: Boolean(body.isDefault),
      }),
    },
  )
  const upstreamPayload = await parseUpstreamPayload(upstreamResponse)

  if (!upstreamResponse.ok) {
    throw createApiError(upstreamResponse.status, extractMessage(upstreamPayload) || '创建 Feishu Bot 失败。')
  }

  return jsonResponse({
    bot: extractFeishuBots(upstreamPayload)[0] || null,
    message: extractMessage(upstreamPayload),
  })
}

async function handleUpdateFeishuBot(request: Request, rawBotId: string): Promise<Response> {
  const body = await parseRequestJson<UpdateFeishuBotRequestBody>(request)
  const companyId = normalizeCompanyId(body.companyId)
  const botId = normalizeBotId(rawBotId)
  const name = normalizeRequiredTextField(body.name, 'name')
  const status = normalizeEditableBotStatus(body.status)
  const rotatedSecret = readString(body.appSecret)
  const authUser = await requireAuthenticatedUser(request)
  const serviceClient = createSupabaseServiceRoleClient()
  const membership = await getActiveOrganizationMember({
    serviceClient,
    companyId,
    userId: authUser.id,
  })

  ensureOwnerOrAdmin(membership.role)

  const requestBody: Record<string, unknown> = {
    name,
    isDefault: Boolean(body.isDefault),
    status,
  }

  if (rotatedSecret) {
    requestBody.appSecret = rotatedSecret
  }

  const env = ensureServerEnv()
  const upstreamResponse = await fetch(
    buildBotApiUrl(env.botApiBaseUrl, `/integrations/feishu/bots/${botId}`),
    {
      method: 'PATCH',
      headers: buildPlatformHeaders(env.internalApiToken, true),
      body: JSON.stringify(requestBody),
    },
  )
  const upstreamPayload = await parseUpstreamPayload(upstreamResponse)

  if (!upstreamResponse.ok) {
    throw createApiError(upstreamResponse.status, extractMessage(upstreamPayload) || '更新 Feishu Bot 失败。')
  }

  return jsonResponse({
    bot: extractFeishuBots(upstreamPayload)[0] || null,
    message: extractMessage(upstreamPayload),
  })
}

async function handleBotAction(request: Request, rawBotId: string, action: 'verify' | 'restart'): Promise<Response> {
  const body = await parseRequestJson<RequestWithCompanyId>(request)
  const companyId = normalizeCompanyId(body.companyId)
  const botId = normalizeBotId(rawBotId)
  const authUser = await requireAuthenticatedUser(request)
  const serviceClient = createSupabaseServiceRoleClient()
  const membership = await getActiveOrganizationMember({
    serviceClient,
    companyId,
    userId: authUser.id,
  })

  ensureOwnerOrAdmin(membership.role)

  const env = ensureServerEnv()
  const upstreamResponse = await fetch(
    buildBotApiUrl(env.botApiBaseUrl, `/integrations/feishu/bots/${botId}/${action}`),
    {
      method: 'POST',
      headers: buildPlatformHeaders(env.internalApiToken),
    },
  )
  const upstreamPayload = await parseUpstreamPayload(upstreamResponse)

  if (!upstreamResponse.ok) {
    const fallbackMessage = action === 'verify' ? '验证 Feishu Bot 失败。' : '重启 Feishu Bot 失败。'
    throw createApiError(upstreamResponse.status, extractMessage(upstreamPayload) || fallbackMessage)
  }

  return jsonResponse({
    bot: extractFeishuBots(upstreamPayload)[0] || null,
    message: extractMessage(upstreamPayload),
  })
}

export async function handleFeishuIntegrationApi(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const pathname = requestUrl.pathname
  const method = request.method.toUpperCase()
  const botActionMatch = pathname.match(/^\/api\/settings\/feishu\/bots\/([^/]+)(?:\/(verify|restart))?$/)

  try {
    if (pathname === '/api/settings/feishu/bots' && method === 'GET') {
      return await handleGetFeishuBots(request)
    }

    if (pathname === '/api/settings/feishu/bots' && method === 'POST') {
      return await handleCreateFeishuBot(request)
    }

    if (botActionMatch && method === 'PATCH' && !botActionMatch[2]) {
      return await handleUpdateFeishuBot(request, botActionMatch[1])
    }

    if (botActionMatch && method === 'POST' && botActionMatch[2] === 'verify') {
      return await handleBotAction(request, botActionMatch[1], 'verify')
    }

    if (botActionMatch && method === 'POST' && botActionMatch[2] === 'restart') {
      return await handleBotAction(request, botActionMatch[1], 'restart')
    }

    return jsonResponse(
      {
        error: '未找到 Feishu 集成 API 路径。',
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

    const message = error instanceof Error ? error.message : 'Feishu 集成接口出现未知错误。'
    return jsonResponse({ error: message }, 500)
  }
}
