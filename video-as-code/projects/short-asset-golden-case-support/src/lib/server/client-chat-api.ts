import { createSupabaseServerClientForRequest, createSupabaseServiceRoleClient } from '@/lib/supabase/server'

type AuthenticatedUser = {
  id: string
  email: string | null
  displayName: string | null
  avatarUrl: string | null
}

type ApiError = {
  status: number
  message: string
}

type SupabaseErrorLike = {
  code?: string | null
  message?: string | null
}

type SendClientMessageBody = {
  companyId?: string
  sessionId?: string
  message?: string
  sourceUrl?: string
  image?: ClientChatImagePayload
  images?: ClientChatImagePayload[]
}

type CompanyUserProfileRow = {
  display_name: string | null
  avatar_url: string | null
}

type ResolvedClientChatSenderIdentity = {
  userId: string
  username: string
  avatarUrl: string | null
}

type ClientChatServerEnv = {
  botBaseUrl: string
  platformApiBaseUrl: string
  internalApiToken: string | null
}

type ClientChatMessageApiResponse = {
  ok?: boolean
  messageId?: string
  sessionId?: string
  error?: string
}

type ClientChatImagePayload = {
  url?: string
  mimeType?: string
  fileName?: string
  storagePath?: string
  size?: number
}

type UploadedClientChatImage = {
  url: string
  contentType: string
  filename: string
  storagePath: string
  size: number
  bucket: string
}

type ClientChatSessionListRow = {
  id: string
  session_id: string | null
  created_at: string | null
  started_at: string | null
  ended_at: string | null
  source_url: string | null
}

type ClientChatSessionListItem = {
  sessionId: string
  createdAt: string | null
  startedAt: string | null
  endedAt: string | null
  sourceUrl: string | null
}

const UUID_REGEX: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const CLIENT_CHAT_IMAGE_MAX_BYTES = 5 * 1024 * 1024
const CLIENT_CHAT_IMAGE_BUCKET = process.env.CLIENT_CHAT_STORAGE_BUCKET?.trim() || 'client-chat-attachments'

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

/**
 * 把 Supabase / PostgREST 的底层 schema 错误转成可执行提示。
 *
 * 这里专门兼容 `client_app_schema`：
 * - `Invalid schema` 代表 Data API 未暴露该 schema，或被旧的 `pgrst.db_schemas` 覆盖配置挡住；
 * - `permission denied for schema` 代表数据库授权不完整。
 */
function toReadableSupabaseErrorMessage(error: SupabaseErrorLike): string {
  const errorCode = (error.code || '').trim()
  const errorMessage = (error.message || '').trim()

  if (errorCode === 'PGRST106' && errorMessage.includes('Invalid schema: client_app_schema')) {
    return [
      'Supabase API 尚未暴露 schema `client_app_schema`。',
      '请先在 Dashboard -> Project Settings -> API -> Exposed schemas 中加入 `client_app_schema`。',
      '如果已经添加过但仍报同样错误，说明 `authenticator` 角色上仍有旧的 `pgrst.db_schemas` 覆盖配置，需要把 `client_app_schema` 加进去，或先执行 `ALTER ROLE authenticator RESET pgrst.db_schemas;` 后再重试。',
    ].join('')
  }

  if (errorCode === '42501' && errorMessage.toLowerCase().includes('permission denied for schema')) {
    const schemaMatch = /schema\s+([a-z0-9_]+)/i.exec(errorMessage)
    const schemaName = schemaMatch?.[1] || '目标'

    return `当前角色没有 \`${schemaName}\` schema 的访问权限，请补齐 schema usage 和表级授权后再重试。`
  }

  return errorMessage || 'unknown error'
}

function createSupabaseApiError(status: number, prefix: string, error: SupabaseErrorLike): ApiError {
  return createApiError(status, `${prefix}：${toReadableSupabaseErrorMessage(error)}`)
}

function isUuid(value: string): boolean {
  return UUID_REGEX.test(value)
}

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/$/, '')
}

/**
 * 组装 lucius-api-server 的完整 URL：
 * - 当 base 是域名根（https://host）时，自动补 `/api/v2`；
 * - 当 base 已带 `/api` 时，补 `/v2`；
 * - 当 base 已带 `/api/v2` 时，直接拼 endpoint，避免重复前缀。
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

function getClientChatServerEnvOrNull(): ClientChatServerEnv | null {
  const botBaseUrl =
    process.env.CLIENT_CHAT_BOT_BASE_URL?.trim() ||
    process.env.LUCIUS_BOT_BASE_URL?.trim() ||
    ''

  const platformApiBaseUrl =
    process.env.CLIENT_CHAT_PLATFORM_API_BASE_URL?.trim() ||
    process.env.LUCIUS_API_SERVER_BASE_URL?.trim() ||
    ''

  const internalApiToken = process.env.CLIENT_CHAT_INTERNAL_API_TOKEN?.trim() || null

  if (!botBaseUrl || !platformApiBaseUrl) {
    return null
  }

  return {
    botBaseUrl: normalizeBaseUrl(botBaseUrl),
    platformApiBaseUrl: normalizeBaseUrl(platformApiBaseUrl),
    internalApiToken,
  }
}

function buildForwardHeaders(token: string | null): HeadersInit {
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

function normalizeImagePayload(image: ClientChatImagePayload | undefined): ClientChatImagePayload | undefined {
  if (!image) {
    return undefined
  }

  const url = (image.url || '').trim()
  if (!url) {
    return undefined
  }

  const normalizedImage: ClientChatImagePayload = {
    url,
  }

  const mimeType = (image.mimeType || '').trim()
  if (mimeType) {
    normalizedImage.mimeType = mimeType
  }

  const fileName = (image.fileName || '').trim()
  if (fileName) {
    normalizedImage.fileName = fileName
  }

  const storagePath = (image.storagePath || '').trim()
  if (storagePath) {
    normalizedImage.storagePath = storagePath
  }

  if (typeof image.size === 'number' && Number.isFinite(image.size) && image.size >= 0) {
    normalizedImage.size = image.size
  }

  return normalizedImage
}

function normalizeImagePayloads(images: ClientChatImagePayload[] | undefined): ClientChatImagePayload[] {
  if (!images || images.length === 0) {
    return []
  }

  return images.flatMap((image) => {
    const normalizedImage = normalizeImagePayload(image)
    if (!normalizedImage) {
      return []
    }

    return [normalizedImage]
  })
}

function sanitizeFileName(fileName: string): string {
  const normalized = fileName.trim().replace(/[^a-zA-Z0-9._-]/g, '_')
  return normalized || 'image.png'
}

async function parseRequestJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T
  } catch {
    throw createApiError(400, '请求体必须是合法 JSON。')
  }
}

async function requireAuthenticatedUser(request: Request): Promise<AuthenticatedUser> {
  const responseHeaders = new Headers()
  const supabase = createSupabaseServerClientForRequest(request, responseHeaders)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user?.id) {
    throw createApiError(401, '当前请求未登录或登录态已失效。')
  }

  const userMetadata = (user.user_metadata || {}) as Record<string, unknown>
  const metadataDisplayName = typeof userMetadata.display_name === 'string' ? userMetadata.display_name.trim() : ''
  const metadataAvatarUrl = typeof userMetadata.avatar_url === 'string' ? userMetadata.avatar_url.trim() : ''

  return {
    id: user.id,
    email: user.email || null,
    displayName: metadataDisplayName || null,
    avatarUrl: metadataAvatarUrl || null,
  }
}

function resolveDefaultSenderName(user: AuthenticatedUser): string {
  const normalizedDisplayName = (user.displayName || '').trim()
  if (normalizedDisplayName) {
    return normalizedDisplayName
  }

  const normalizedEmail = (user.email || '').trim()
  if (normalizedEmail && normalizedEmail.includes('@')) {
    const emailPrefix = normalizedEmail.split('@')[0]?.trim()
    if (emailPrefix) {
      return emailPrefix
    }
  }

  return `user-${user.id.slice(0, 8)}`
}

async function resolveClientChatSenderIdentity(payload: {
  companyId: string
  user: AuthenticatedUser
}): Promise<ResolvedClientChatSenderIdentity> {
  const defaultSenderName = resolveDefaultSenderName(payload.user)
  let resolvedUsername = defaultSenderName
  let resolvedAvatarUrl = payload.user.avatarUrl

  try {
    const serviceClient = createSupabaseServiceRoleClient()
    const { data, error } = await serviceClient
      .schema('account')
      .from('company_user_profile')
      .select('display_name, avatar_url')
      .eq('company_id', payload.companyId)
      .eq('user_id', payload.user.id)
      .maybeSingle<CompanyUserProfileRow>()

    if (!error && data) {
      const profileDisplayName = (data.display_name || '').trim()
      if (profileDisplayName) {
        resolvedUsername = profileDisplayName
      }

      const profileAvatarUrl = (data.avatar_url || '').trim()
      if (profileAvatarUrl) {
        resolvedAvatarUrl = profileAvatarUrl
      }
    }
  } catch {
    // 读取 profile 失败时降级使用 auth metadata，不中断消息发送流程。
  }

  return {
    userId: payload.user.id,
    username: resolvedUsername,
    avatarUrl: resolvedAvatarUrl,
  }
}

async function ensureActiveOrganizationMember(payload: {
  request: Request
  companyId: string
  userId: string
}): Promise<void> {
  const responseHeaders = new Headers()
  const supabase = createSupabaseServerClientForRequest(payload.request, responseHeaders)

  const memberResult = await supabase
    .schema('permission')
    .from('organization_member')
    .select('id')
    .eq('company_id', payload.companyId)
    .eq('user_id', payload.userId)
    .eq('status', 'active')
    .maybeSingle()

  if (memberResult.error) {
    throw createApiError(500, memberResult.error.message || '校验公司成员身份失败。')
  }

  if (!memberResult.data?.id) {
    throw createApiError(403, '当前账号无权访问该 company 的客户端聊天。')
  }
}

function resolveSourceUrl(request: Request, sourceUrl?: string): string | undefined {
  const normalizedPayloadSource = sourceUrl?.trim() || ''
  if (normalizedPayloadSource) {
    return normalizedPayloadSource
  }

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

/**
 * 解析分页参数并做范围校验。
 * - 空值时返回默认值；
 * - 非数字或越界直接抛 400，避免后端执行异常分页。
 */
function parseIntegerQueryParam(payload: {
  rawValue: string | null
  fieldName: string
  defaultValue: number
  min: number
  max: number
}): number {
  const normalizedValue = payload.rawValue?.trim() || ''
  if (!normalizedValue) {
    return payload.defaultValue
  }

  const parsedValue = Number.parseInt(normalizedValue, 10)
  if (!Number.isFinite(parsedValue) || parsedValue < payload.min || parsedValue > payload.max) {
    throw createApiError(400, `${payload.fieldName} 必须在 ${payload.min} 到 ${payload.max} 之间。`)
  }

  return parsedValue
}

/**
 * 查询公司维度的会话列表（来自数据库）并返回分页信息。
 * - 数据源：client_app_schema.client_session；
 * - 仅返回当前用户有权限访问的 company；
 * - 默认按 created_at 倒序。
 */
async function handleListClientSessions(request: Request): Promise<Response> {
  const user = await requireAuthenticatedUser(request)
  const requestUrl = new URL(request.url)

  const companyId = requestUrl.searchParams.get('company_id')?.trim() || ''
  if (!companyId || !isUuid(companyId)) {
    throw createApiError(400, 'company_id 非法。')
  }

  const page = parseIntegerQueryParam({
    rawValue: requestUrl.searchParams.get('page'),
    fieldName: 'page',
    defaultValue: 1,
    min: 1,
    max: 10_000,
  })
  const pageSize = parseIntegerQueryParam({
    rawValue: requestUrl.searchParams.get('page_size'),
    fieldName: 'page_size',
    defaultValue: 20,
    min: 1,
    max: 100,
  })

  await ensureActiveOrganizationMember({
    request,
    companyId,
    userId: user.id,
  })

  const offset = (page - 1) * pageSize
  const rangeEnd = offset + pageSize - 1
  const serviceClient = createSupabaseServiceRoleClient()
  const sessionResult = await serviceClient
    .schema('client_app_schema')
    .from('client_session')
    .select('id, session_id, created_at, started_at, ended_at, source_url', {
      count: 'exact',
    })
    .eq('company_id', companyId)
    .order('created_at', {
      ascending: false,
      nullsFirst: false,
    })
    .range(offset, rangeEnd)

  if (sessionResult.error) {
    throw createSupabaseApiError(500, '查询客户端会话列表失败', sessionResult.error)
  }

  const rows = (sessionResult.data || []) as ClientChatSessionListRow[]
  const sessions: ClientChatSessionListItem[] = rows
    .map((row) => {
      const sessionId = (row.session_id || '').trim()
      if (!sessionId) {
        return null
      }

      return {
        sessionId,
        createdAt: row.created_at || null,
        startedAt: row.started_at || null,
        endedAt: row.ended_at || null,
        sourceUrl: row.source_url || null,
      }
    })
    .filter((item): item is ClientChatSessionListItem => item !== null)

  const total = sessionResult.count || 0
  const totalPages = total > 0 ? Math.ceil(total / pageSize) : 0

  return jsonResponse({
    ok: true,
    sessions,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
    },
  })
}

async function handleSendClientMessage(request: Request): Promise<Response> {
  const env = getClientChatServerEnvOrNull()
  if (!env) {
    return jsonResponse(
      {
        error: '服务端缺少 CLIENT_CHAT_BOT_BASE_URL 或 CLIENT_CHAT_PLATFORM_API_BASE_URL 配置。',
      },
      503,
    )
  }

  const user = await requireAuthenticatedUser(request)
  const body = await parseRequestJson<SendClientMessageBody>(request)

  const companyId = (body.companyId || '').trim()
  if (!companyId || !isUuid(companyId)) {
    throw createApiError(400, 'companyId 非法。')
  }

  const message = (body.message || '').trim()
  const normalizedImages = normalizeImagePayloads(body.images)
  const legacyImage = normalizeImagePayload(body.image)
  const images =
    normalizedImages.length > 0
      ? normalizedImages
      : legacyImage
        ? [legacyImage]
        : []

  if (!message && images.length === 0) {
    throw createApiError(400, 'message 与 image/images 不能同时为空。')
  }

  const sessionId = (body.sessionId || '').trim()
  if (!sessionId) {
    throw createApiError(400, 'sessionId 不能为空。')
  }

  await ensureActiveOrganizationMember({
    request,
    companyId,
    userId: user.id,
  })
  const senderIdentity = await resolveClientChatSenderIdentity({
    companyId,
    user,
  })

  const requestBody: Record<string, unknown> = {
    companyId,
    sessionId,
    message,
    userId: senderIdentity.userId,
    username: senderIdentity.username,
  }
  if (senderIdentity.avatarUrl) {
    requestBody.avatarUrl = senderIdentity.avatarUrl
  }

  const sourceUrl = resolveSourceUrl(request, body.sourceUrl)
  if (sourceUrl) {
    requestBody.sourceUrl = sourceUrl
  }

  if (images.length > 0) {
    requestBody.images = images

    /**
     * 单图字段继续保留给旧版 bot 路由做向后兼容：
     * - 如果 bot 服务先于前端升级，这里仍能至少发送第一张图；
     * - 新版 bot 会优先消费 images 数组。
     */
    requestBody.image = images[0]
  }

  const response = await fetch(`${env.botBaseUrl}/web/client/message`, {
    method: 'POST',
    headers: buildForwardHeaders(env.internalApiToken),
    body: JSON.stringify(requestBody),
  })

  const data = (await response.json()) as ClientChatMessageApiResponse
  if (!response.ok || data.ok === false) {
    throw createApiError(502, data.error || `客户端消息发送失败（${response.status}）`)
  }

  return jsonResponse({
    ok: true,
    sessionId: data.sessionId || sessionId,
    messageId: data.messageId || null,
  })
}

async function parseUploadRequestPayload(request: Request): Promise<{
  companyId: string
  sessionId: string
  file: File
}> {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    throw createApiError(400, '上传请求必须使用 multipart/form-data。')
  }

  const companyId = String(formData.get('companyId') || '').trim()
  if (!companyId || !isUuid(companyId)) {
    throw createApiError(400, 'companyId 非法。')
  }

  const sessionId = String(formData.get('sessionId') || '').trim()
  if (!sessionId) {
    throw createApiError(400, 'sessionId 不能为空。')
  }

  const fileValue = formData.get('file')
  if (!(fileValue instanceof File)) {
    throw createApiError(400, 'file 不能为空。')
  }

  if (!fileValue.type.toLowerCase().startsWith('image/')) {
    throw createApiError(400, '仅支持上传图片文件。')
  }

  if (fileValue.size <= 0 || fileValue.size > CLIENT_CHAT_IMAGE_MAX_BYTES) {
    throw createApiError(400, `图片大小必须在 1B 到 ${CLIENT_CHAT_IMAGE_MAX_BYTES}B 之间。`)
  }

  return {
    companyId,
    sessionId,
    file: fileValue,
  }
}

function buildClientChatImageStoragePath(payload: {
  companyId: string
  userId: string
  sessionId: string
  fileName: string
}): string {
  const randomSuffix = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  const safeFileName = sanitizeFileName(payload.fileName)
  return `${payload.companyId}/${payload.userId}/${payload.sessionId}/${randomSuffix}-${safeFileName}`
}

async function handleUploadClientChatImage(request: Request): Promise<Response> {
  const user = await requireAuthenticatedUser(request)
  const payload = await parseUploadRequestPayload(request)

  await ensureActiveOrganizationMember({
    request,
    companyId: payload.companyId,
    userId: user.id,
  })

  const serviceClient = createSupabaseServiceRoleClient()
  const storagePath = buildClientChatImageStoragePath({
    companyId: payload.companyId,
    userId: user.id,
    sessionId: payload.sessionId,
    fileName: payload.file.name,
  })

  const { error: uploadError } = await serviceClient.storage
    .from(CLIENT_CHAT_IMAGE_BUCKET)
    .upload(storagePath, payload.file, {
      cacheControl: '3600',
      upsert: false,
      contentType: payload.file.type || 'image/png',
    })

  if (uploadError) {
    throw createApiError(500, uploadError.message || '上传图片到 Supabase Storage 失败。')
  }

  const { data } = serviceClient.storage.from(CLIENT_CHAT_IMAGE_BUCKET).getPublicUrl(storagePath)
  const publicUrl = (data.publicUrl || '').trim()
  if (!publicUrl) {
    throw createApiError(500, '图片上传成功，但未获取到公开访问地址。')
  }

  const uploadedImage: UploadedClientChatImage = {
    url: publicUrl,
    contentType: payload.file.type || 'image/png',
    filename: payload.file.name || 'image.png',
    storagePath,
    size: payload.file.size,
    bucket: CLIENT_CHAT_IMAGE_BUCKET,
  }

  return jsonResponse({
    ok: true,
    image: uploadedImage,
  })
}

async function handleListClientMessages(request: Request): Promise<Response> {
  const env = getClientChatServerEnvOrNull()
  if (!env) {
    return jsonResponse(
      {
        error: '服务端缺少 CLIENT_CHAT_BOT_BASE_URL 或 CLIENT_CHAT_PLATFORM_API_BASE_URL 配置。',
      },
      503,
    )
  }

  const user = await requireAuthenticatedUser(request)
  const requestUrl = new URL(request.url)

  const companyId = requestUrl.searchParams.get('company_id')?.trim() || ''
  if (!companyId || !isUuid(companyId)) {
    throw createApiError(400, 'company_id 非法。')
  }

  const sessionId = requestUrl.searchParams.get('session_id')?.trim() || ''
  if (!sessionId) {
    throw createApiError(400, 'session_id 不能为空。')
  }

  const limitValue = requestUrl.searchParams.get('limit')?.trim() || '100'
  const parsedLimit = Number.parseInt(limitValue, 10)
  const limit = Number.isFinite(parsedLimit) ? parsedLimit : 100
  if (limit < 1 || limit > 500) {
    throw createApiError(400, 'limit 必须在 1 到 500 之间。')
  }

  await ensureActiveOrganizationMember({
    request,
    companyId,
    userId: user.id,
  })

  const upstreamQuery = new URLSearchParams({
    company_id: companyId,
    sessionid: sessionId,
    limit: String(limit),
  })

  const beforeValue = requestUrl.searchParams.get('before')?.trim() || ''
  if (beforeValue) {
    upstreamQuery.set('before', beforeValue)
  }

  const platformSessionUrl = buildPlatformApiUrl(
    env.platformApiBaseUrl,
    `/platform-messages/client/session?${upstreamQuery.toString()}`,
  )

  const response = await fetch(platformSessionUrl, {
    method: 'GET',
    headers: env.internalApiToken
      ? {
          Authorization: `Bearer ${env.internalApiToken}`,
          'X-Internal-Api-Token': env.internalApiToken,
        }
      : undefined,
  })

  const data = (await response.json()) as unknown
  if (!response.ok) {
    const errorMessage =
      typeof data === 'object' && data !== null && 'detail' in data
        ? String((data as { detail?: unknown }).detail || '上游查询失败')
        : `上游查询失败（${response.status}）`
    throw createApiError(502, errorMessage)
  }

  return jsonResponse({
    ok: true,
    messages: Array.isArray(data) ? data : [],
  })
}

export async function handleClientChatApi(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)

  try {
    if (request.method === 'GET' && requestUrl.pathname === '/api/chat/sessions') {
      return await handleListClientSessions(request)
    }

    if (request.method === 'POST' && requestUrl.pathname === '/api/chat/message') {
      return await handleSendClientMessage(request)
    }

    if (request.method === 'GET' && requestUrl.pathname === '/api/chat/messages') {
      return await handleListClientMessages(request)
    }

    if (request.method === 'POST' && requestUrl.pathname === '/api/chat/upload') {
      return await handleUploadClientChatImage(request)
    }

    if (request.method === 'GET' && requestUrl.pathname === '/api/chat/health') {
      return jsonResponse({ status: 'ok', service: 'client-chat-api' })
    }

    return jsonResponse({ error: 'Not Found' }, 404)
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'message' in error
    ) {
      const apiError = error as ApiError
      return jsonResponse({ error: apiError.message }, apiError.status)
    }

    return jsonResponse(
      {
        error: (error as Error).message || '客户端聊天接口执行失败。',
      },
      500,
    )
  }
}

export const __clientChatApiTestables = {
  toReadableSupabaseErrorMessage,
}
