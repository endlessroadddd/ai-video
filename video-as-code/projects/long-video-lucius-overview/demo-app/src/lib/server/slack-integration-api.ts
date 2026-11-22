import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from 'node:crypto'

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

type SlackInstallStatePayload = {
  companyId: string
  userId: string
  iat: number
  exp: number
  nonce: string
}

type SlackWorkspaceCredentialPayload = {
  accessToken: string
  enterpriseId: string | null
}

type SlackServerEnv = {
  clientId: string
  clientSecret: string
  integrationSecret: string
  redirectUri: string
  scope: string
  apiBaseUrl: string
  fallbackBotToken: string
}

type SlackApiErrorResponse = {
  ok: false
  error?: string
  warning?: string
}

type SlackOAuthAccessResponse = {
  ok: true
  access_token: string
  token_type?: string
  scope?: string
  bot_user_id?: string
  app_id?: string
  is_enterprise_install?: boolean
  team?: {
    id?: string
    name?: string
  }
  enterprise?: {
    id?: string | null
    name?: string | null
  } | null
}

type SlackAuthTestResponse = {
  ok: true
  url?: string
  team?: string
  user?: string
  team_id?: string
  user_id?: string
  bot_id?: string
  app_id?: string
  enterprise_id?: string
  is_enterprise_install?: boolean
}

type SlackConversation = {
  id?: string
  name?: string
  is_private?: boolean
  is_channel?: boolean
  is_group?: boolean
  is_im?: boolean
  is_mpim?: boolean
}

type SlackConversationsListResponse = {
  ok: true
  channels?: SlackConversation[]
  response_metadata?: {
    next_cursor?: string
  }
}

type IntegrationConnectionStatus = 'pending' | 'connected' | 'disconnected' | 'disabled'

type IntegrationConnectionRow = {
  company_id: string
  platform: 'slack'
  external_workspace_id: string
  external_workspace_name: string | null
  status: IntegrationConnectionStatus
}

type SlackConnectionView = {
  companyId: string
  platform: 'slack'
  externalWorkspaceId: string
  externalWorkspaceName: string | null
  status: IntegrationConnectionStatus
}

type SlackInstallationStatus = 'connected' | 'disconnected' | 'revoked' | 'failed'

type SlackWorkspaceRow = {
  id: string
  company_id: string
  team_id: string
  name: string | null
  enterprise_id: string | null
}

type SlackWorkspaceOwnershipRow = Pick<SlackWorkspaceRow, 'company_id' | 'team_id'>

type SlackInstallationRow = {
  id: string
  company_id: string
  workspace_uuid: string | null
  team_id: string
  enterprise_id: string | null
  app_id: string | null
  bot_user_id: string | null
  scope: string | null
  access_token_ciphertext: string
  status: SlackInstallationStatus
  installed_by_user_id: string | null
  installed_at: string
  last_validated_at: string | null
  last_synced_at: string | null
  revoked_at: string | null
  updated_at: string
}

type SlackChannelRow = {
  id: string
  team_id: string | null
  channel_id: string | null
  name: string | null
  channel_type: string | null
  is_private: boolean | null
}

type SlackSyncSummary = {
  workspaceId: string
  channelsUpserted: number
}

type RequestWithCompanyId = {
  companyId?: string
}

type SyncRequestBody = {
  companyId?: string
  syncNow?: boolean
}

const UUID_REGEX: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const SLACK_TEAM_ID_REGEX: RegExp = /^[A-Z][A-Z0-9]{2,31}$/
const SLACK_STATE_TTL_SECONDS = 5 * 60
const SLACK_TOKEN_CIPHER_PREFIX = 'enc.v1'
const REQUIRED_SLACK_INSTALL_SCOPES: readonly string[] = [
  'channels:read',
  'channels:history',
  'groups:read',
  'groups:history',
  'chat:write',
  'commands',
  'users:read',
]

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

function isSlackTeamId(value: string): boolean {
  return SLACK_TEAM_ID_REGEX.test(value)
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
 * 统一补齐 Slack 安装时必须申请的 scope：
 * - `channels:history` / `groups:history` 是接收频道消息事件的前提；
 * - `groups:read` 让我们能同步 private channel 元数据；
 * - 即便配置了 `SLACK_INSTALL_SCOPE`，也不允许把这些关键 scope 漏掉。
 */
function buildSlackInstallScope(configuredScope: string): string {
  const normalizedConfiguredScopes = configuredScope
    .split(',')
    .map((scope) => scope.trim())
    .filter((scope) => scope.length > 0)

  const mergedScopes = new Set<string>([
    ...REQUIRED_SLACK_INSTALL_SCOPES,
    ...normalizedConfiguredScopes,
  ])

  return Array.from(mergedScopes).join(',')
}

function normalizeSlackScopeList(scopeText: string | null | undefined): string[] {
  if (!scopeText) {
    return []
  }

  return scopeText
    .split(',')
    .map((scope) => scope.trim())
    .filter((scope) => scope.length > 0)
}

function ensureRequiredSlackInstallScopes(grantedScopeText: string | null | undefined): void {
  const grantedScopes = new Set<string>(normalizeSlackScopeList(grantedScopeText))
  const missingScopes = REQUIRED_SLACK_INSTALL_SCOPES.filter((scope) => !grantedScopes.has(scope))

  if (missingScopes.length === 0) {
    return
  }

  throw createApiError(
    502,
    `Slack 安装缺少必要 scopes：${missingScopes.join(', ')}。请检查 Slack App 配置并重新安装。`,
  )
}

/**
 * 统一读取 Slack 集成配置。
 *
 * 设计说明：
 * - OAuth 安装/回调仅依赖 client_id + client_secret；
 * - state 签名 secret 与业务 token 加密都复用 integrationSecret；
 * - fallbackBotToken 仅作为历史兜底，优先使用安装后持久化 token。
 */
function getSlackServerEnvOrNull(request: Request): SlackServerEnv | null {
  const clientId = process.env.SLACK_CLIENT_ID?.trim() || ''
  const clientSecret = process.env.SLACK_CLIENT_SECRET?.trim() || ''
  const integrationSecret =
    process.env.SLACK_INTEGRATION_SECRET?.trim()
    || process.env.SUPABASE_SECRET_KEY?.trim()
    || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    || ''
  const redirectUri =
    process.env.SLACK_REDIRECT_URI?.trim() || `${resolveAppOrigin(request)}/api/settings/slack/callback`
  const configuredScope = process.env.SLACK_INSTALL_SCOPE?.trim() || ''
  const scope = buildSlackInstallScope(configuredScope)
  const apiBaseUrl = process.env.SLACK_API_BASE_URL?.trim() || 'https://slack.com/api'
  const fallbackBotToken = process.env.SLACK_BOT_TOKEN?.trim() || ''

  if (!clientId || !clientSecret || !integrationSecret || !redirectUri) {
    return null
  }

  return {
    clientId,
    clientSecret,
    integrationSecret,
    redirectUri,
    scope,
    apiBaseUrl: apiBaseUrl.replace(/\/$/, ''),
    fallbackBotToken,
  }
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
 * - state 携带 company_id / user_id，避免 callback 依赖前端透传；
 * - 限制 5 分钟有效期并加入 nonce，降低重放风险。
 */
function createSlackStateToken(payload: SlackInstallStatePayload, secret: string): string {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload))
  const signature = signStatePayload(encodedPayload, secret)
  return `${encodedPayload}.${signature}`
}

function verifySlackStateToken(token: string, secret: string): SlackInstallStatePayload | null {
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
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as SlackInstallStatePayload
    const nowSeconds = Math.floor(Date.now() / 1000)

    if (!payload.companyId || !payload.userId || payload.exp <= nowSeconds) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

function encodeSlackWorkspaceCredential(
  payload: SlackWorkspaceCredentialPayload,
  secret: string,
): string {
  const key = createHash('sha256').update(secret, 'utf8').digest()
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const plaintext = JSON.stringify(payload)

  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()

  return [
    SLACK_TOKEN_CIPHER_PREFIX,
    iv.toString('base64url'),
    ciphertext.toString('base64url'),
    authTag.toString('base64url'),
  ].join('.')
}

function decodeSlackWorkspaceCredential(
  encryptedValue: string,
  secret: string,
): SlackWorkspaceCredentialPayload | null {
  const parts = encryptedValue.split('.')
  if (parts.length !== 5) {
    return null
  }

  const [prefixLeft, prefixRight, ivRaw, ciphertextRaw, authTagRaw] = parts
  if (`${prefixLeft}.${prefixRight}` !== SLACK_TOKEN_CIPHER_PREFIX) {
    return null
  }

  try {
    const key = createHash('sha256').update(secret, 'utf8').digest()
    const iv = Buffer.from(ivRaw, 'base64url')
    const ciphertext = Buffer.from(ciphertextRaw, 'base64url')
    const authTag = Buffer.from(authTagRaw, 'base64url')

    const decipher = createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(authTag)

    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8')
    const payload = JSON.parse(plaintext) as SlackWorkspaceCredentialPayload

    if (!payload.accessToken?.trim()) {
      return null
    }

    return {
      accessToken: payload.accessToken.trim(),
      enterpriseId: payload.enterpriseId?.trim() || null,
    }
  } catch {
    return null
  }
}

function isLegacySlackWorkspaceCredential(value: string | null | undefined): boolean {
  return Boolean(value?.startsWith(`${SLACK_TOKEN_CIPHER_PREFIX}.`))
}

function getSlackWorkspaceCredential(payload: {
  installationCiphertext?: string | null
  encryptedValue: string | null
  workspaceEnterpriseId: string | null
  secret: string
  fallbackBotToken: string
}): SlackWorkspaceCredentialPayload | null {
  const installationCiphertext = payload.installationCiphertext?.trim() || ''
  if (installationCiphertext) {
    const decoded = decodeSlackWorkspaceCredential(installationCiphertext, payload.secret)
    if (decoded) {
      return decoded
    }
  }

  const encryptedValue = payload.encryptedValue?.trim() || ''
  if (encryptedValue) {
    const decoded = decodeSlackWorkspaceCredential(encryptedValue, payload.secret)
    if (decoded) {
      return decoded
    }
  }

  const fallbackToken = payload.fallbackBotToken.trim()
  if (!fallbackToken) {
    return null
  }

  return {
    accessToken: fallbackToken,
    enterpriseId:
      isLegacySlackWorkspaceCredential(payload.workspaceEnterpriseId)
        ? null
        : payload.workspaceEnterpriseId?.trim() || null,
  }
}

function truncateForRedirect(message: string): string {
  if (message.length <= 200) {
    return message
  }

  return `${message.slice(0, 197)}...`
}

/**
 * 统一从未知异常中提取可展示消息。
 *
 * 背景：
 * - 本文件大量业务分支通过 `createApiError()` 抛出普通对象，而不是 `Error` 实例；
 * - 旧实现仅判断 `instanceof Error`，导致 callback 最终总是退化成“Slack 安装回调失败”；
 * - 这里统一兼容 `{ message, status }` 结构，保证真实错误能透传到 settings 页面。
 */
function getErrorMessage(error: unknown, fallbackMessage: string): string {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = error.message
    if (typeof message === 'string' && message.trim()) {
      return message.trim()
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message.trim()
  }

  return fallbackMessage
}

/**
 * Enterprise 组织级安装完成后，Slack 不会自动把应用加入任何具体 workspace。
 *
 * 这里拼出 Slack Admin 的“Add to more workspaces”页面：
 * - 只有拿到 `enterprise_id + app_id` 时才能深链；
 * - 拿不到时依然返回 `null`，由上层退化为纯文本提示。
 */
function buildSlackEnterpriseWorkspaceGrantUrl(payload: {
  enterpriseId: string | null
  appId: string | null
}): string | null {
  const enterpriseId = payload.enterpriseId?.trim() || ''
  const appId = payload.appId?.trim() || ''

  if (!enterpriseId || !appId) {
    return null
  }

  return `https://app.slack.com/manage/${enterpriseId}/integrations/profile/${appId}/workspaces/add`
}

/**
 * 当前安装流是“workspace 级安装 -> 立刻同步频道”。
 *
 * 若 Slack 返回的是 Enterprise 组织级安装：
 * - OAuth 虽然成功，但 token 代表的是整个组织，而不是某个具体 workspace；
 * - 这种 token 不能直接落到我们现有的 `team_id -> workspace/channel` 模型；
 * - 因此必须尽早中断，并把后续该去哪里的 Slack 后台页面告诉用户。
 */
function assertWorkspaceScopedSlackInstall(payload: {
  oauthResponse: SlackOAuthAccessResponse
  authTest: SlackAuthTestResponse
}): void {
  const isEnterpriseInstall = Boolean(
    payload.oauthResponse.is_enterprise_install || payload.authTest.is_enterprise_install,
  )

  if (!isEnterpriseInstall) {
    return
  }

  const enterpriseWorkspaceGrantUrl = buildSlackEnterpriseWorkspaceGrantUrl({
    enterpriseId:
      payload.authTest.enterprise_id?.trim()
      || payload.oauthResponse.enterprise?.id?.trim()
      || null,
    appId: payload.authTest.app_id?.trim() || payload.oauthResponse.app_id?.trim() || null,
  })

  if (enterpriseWorkspaceGrantUrl) {
    throw createApiError(
      409,
      `当前 Slack 安装是 Enterprise 组织级安装，Slack 不会自动把应用加入具体 workspace。请先在 Slack Admin 中把应用添加到目标 workspace：${enterpriseWorkspaceGrantUrl}`,
    )
  }

  throw createApiError(
    409,
    '当前 Slack 安装是 Enterprise 组织级安装，Slack 不会自动把应用加入具体 workspace。请先在 Slack Admin 中把应用添加到目标 workspace 后再继续。',
  )
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
    throw createApiError(403, '仅 Owner/Admin 可管理 Slack 集成。')
  }
}

function mapConnectionRowToView(row: IntegrationConnectionRow): SlackConnectionView {
  return {
    companyId: row.company_id,
    platform: 'slack',
    externalWorkspaceId: row.external_workspace_id,
    externalWorkspaceName: row.external_workspace_name,
    status: row.status,
  }
}

/**
 * 将 `slack.channel` 行映射为前端视图模型：
 * - 只暴露页面展示必需字段；
 * - 对空值做兜底，避免前端渲染分支过多。
 */
function mapSlackChannelRowToView(row: SlackChannelRow): {
  id: string
  channelId: string
  name: string
  channelType: string | null
  isPrivate: boolean
} {
  return {
    id: row.id,
    channelId: row.channel_id || row.id,
    name: row.name || row.channel_id || row.id,
    channelType: row.channel_type,
    isPrivate: Boolean(row.is_private),
  }
}

async function getSlackConnectionByCompanyId(payload: {
  serviceClient: SupabaseClient
  companyId: string
}): Promise<IntegrationConnectionRow | null> {
  const result = await payload.serviceClient
    .schema('integration')
    .from('connection')
    .select('company_id, platform, external_workspace_id, external_workspace_name, status')
    .eq('company_id', payload.companyId)
    .eq('platform', 'slack')
    .limit(1)

  if (result.error) {
    throw createApiError(500, `读取 integration.connection 失败：${result.error.message}`)
  }

  const rows = (result.data || []) as IntegrationConnectionRow[]
  return rows[0] || null
}

/**
 * 读取任意公司下是否已经存在相同的 Slack team_id：
 * - 用于在安装回调时阻止同一 workspace 被多个 company 重复认领；
 * - 只查最小字段，避免把敏感凭据带入后续逻辑。
 */
async function getSlackWorkspaceOwnershipByTeamId(payload: {
  serviceClient: SupabaseClient
  teamId: string
}): Promise<SlackWorkspaceOwnershipRow | null> {
  const result = await payload.serviceClient
    .schema('slack')
    .from('workspace')
    .select('company_id, team_id')
    .eq('team_id', payload.teamId)
    .limit(1)

  if (result.error) {
    throw createApiError(500, `校验 Slack workspace 占用失败：${result.error.message}`)
  }

  const rows = (result.data || []) as SlackWorkspaceOwnershipRow[]
  return rows[0] || null
}

/**
 * 读取任意公司下是否已经存在相同的 Slack connection：
 * - 前端设置页主要依赖 integration.connection 展示连接状态；
 * - 即便 slack.workspace 还没写成功，也需要防止外层 connection 先被别的 company 占掉。
 */
async function getSlackConnectionOwnershipByTeamId(payload: {
  serviceClient: SupabaseClient
  teamId: string
}): Promise<IntegrationConnectionRow | null> {
  const result = await payload.serviceClient
    .schema('integration')
    .from('connection')
    .select('company_id, platform, external_workspace_id, external_workspace_name, status')
    .eq('platform', 'slack')
    .eq('external_workspace_id', payload.teamId)
    .limit(1)

  if (result.error) {
    throw createApiError(500, `校验 Slack connection 占用失败：${result.error.message}`)
  }

  const rows = (result.data || []) as IntegrationConnectionRow[]
  return rows[0] || null
}

/**
 * 约束 team_id 只能归属一个 company：
 * - 当前设置页仍按“一个 company 一条 Slack 连接”设计；
 * - 若同一个 team_id 已被其他 company 使用，直接 409，避免后端监听串库。
 */
function assertSlackTeamOwnershipForUpsert(
  existingCompanyId: string | null,
  targetCompanyId: string,
): void {
  if (!existingCompanyId) {
    return
  }

  if (existingCompanyId === targetCompanyId) {
    return
  }

  throw createApiError(409, '该 Slack workspace 已被其他公司绑定，请先解除原绑定后再重试。')
}

/**
 * 在写入前统一检查 team_id 是否已被其他公司占用：
 * - 同时校验 `slack.workspace` 和 `integration.connection` 两张表；
 * - 任何一侧命中其他 company，都视为冲突。
 */
async function ensureSlackTeamIdAvailableForCompany(payload: {
  serviceClient: SupabaseClient
  companyId: string
  teamId: string
}): Promise<void> {
  const existingWorkspace = await getSlackWorkspaceOwnershipByTeamId({
    serviceClient: payload.serviceClient,
    teamId: payload.teamId,
  })
  assertSlackTeamOwnershipForUpsert(
    existingWorkspace?.company_id || null,
    payload.companyId,
  )

  const existingConnection = await getSlackConnectionOwnershipByTeamId({
    serviceClient: payload.serviceClient,
    teamId: payload.teamId,
  })
  assertSlackTeamOwnershipForUpsert(
    existingConnection?.company_id || null,
    payload.companyId,
  )
}

async function upsertSlackConnection(payload: {
  serviceClient: SupabaseClient
  companyId: string
  workspaceId: string
  workspaceName: string | null
  status: IntegrationConnectionStatus
}): Promise<IntegrationConnectionRow> {
  await ensureSlackTeamIdAvailableForCompany({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    teamId: payload.workspaceId,
  })

  const connectionPayload = {
    external_workspace_id: payload.workspaceId,
    external_workspace_name: payload.workspaceName,
    status: payload.status,
  }

  const existingConnection = await getSlackConnectionByCompanyId({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
  })

  if (existingConnection) {
    const updateResult = await payload.serviceClient
      .schema('integration')
      .from('connection')
      .update(connectionPayload)
      .eq('company_id', payload.companyId)
      .eq('platform', 'slack')
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
      platform: 'slack',
      ...connectionPayload,
    })
    .select('company_id, platform, external_workspace_id, external_workspace_name, status')
    .single<IntegrationConnectionRow>()

  if (insertResult.error || !insertResult.data) {
    throw createApiError(500, `写入 integration.connection 失败：${insertResult.error?.message || '未知错误'}`)
  }

  return insertResult.data
}

async function markSlackConnectionDisconnected(payload: {
  serviceClient: SupabaseClient
  companyId: string
  workspaceId: string
  workspaceName: string | null
}): Promise<IntegrationConnectionRow> {
  return upsertSlackConnection({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    workspaceId: payload.workspaceId,
    workspaceName: payload.workspaceName,
    status: 'disconnected',
  })
}

async function exchangeSlackOAuthCode(payload: {
  env: SlackServerEnv
  code: string
}): Promise<SlackOAuthAccessResponse> {
  const requestBody = new URLSearchParams({
    client_id: payload.env.clientId,
    client_secret: payload.env.clientSecret,
    code: payload.code,
    redirect_uri: payload.env.redirectUri,
  })

  const response = await fetch(`${payload.env.apiBaseUrl}/oauth.v2.access`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody.toString(),
  })

  const data = (await response.json()) as SlackOAuthAccessResponse | SlackApiErrorResponse

  if (!response.ok) {
    throw createApiError(
      502,
      `Slack OAuth 授权码交换失败：HTTP ${response.status} ${response.statusText}`,
    )
  }

  if (!('ok' in data) || !data.ok) {
    const errorMessage = 'error' in data ? data.error || 'unknown_error' : 'unknown_error'
    throw createApiError(502, `Slack OAuth 授权码交换失败：${errorMessage}`)
  }

  return data
}

async function fetchSlackApiJsonWithBearer<T extends { ok: true }>(payload: {
  env: SlackServerEnv
  path: string
  token: string
  actionLabel: string
  queryParams?: Record<string, string>
}): Promise<T> {
  const requestUrl = new URL(`${payload.env.apiBaseUrl}${payload.path}`)

  Object.entries(payload.queryParams || {}).forEach(([key, value]) => {
    requestUrl.searchParams.set(key, value)
  })

  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${payload.token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  })

  const data = (await response.json()) as T | SlackApiErrorResponse

  if (!response.ok) {
    throw createApiError(
      502,
      `${payload.actionLabel} 失败：Slack API 返回 ${response.status} ${response.statusText}`,
    )
  }

  if (!('ok' in data) || !data.ok) {
    const errorMessage = 'error' in data ? data.error || 'unknown_error' : 'unknown_error'
    throw createApiError(502, `${payload.actionLabel} 失败：${errorMessage}`)
  }

  return data
}

async function fetchSlackAuthTest(payload: {
  env: SlackServerEnv
  accessToken: string
}): Promise<SlackAuthTestResponse> {
  return fetchSlackApiJsonWithBearer<SlackAuthTestResponse>({
    env: payload.env,
    path: '/auth.test',
    token: payload.accessToken,
    actionLabel: '读取 Slack workspace 基础信息',
  })
}

async function fetchSlackPublicChannels(payload: {
  env: SlackServerEnv
  accessToken: string
  teamId: string
}): Promise<SlackConversation[]> {
  const channels: SlackConversation[] = []
  let cursor: string | null = null

  while (true) {
    const queryParams: Record<string, string> = {
      types: 'public_channel,private_channel',
      exclude_archived: 'true',
      limit: '1000',
      /**
       * Slack 官方文档要求：
       * - org-level token 调用 `conversations.list` 时必须显式传 `team_id`；
       * - workspace-level token 传了也会被忽略。
       *
       * 因此这里统一总是传，避免企业组织安装后续同步命中 `team_access_not_granted`。
       */
      team_id: payload.teamId,
    }

    if (cursor) {
      queryParams.cursor = cursor
    }

    const response = await fetchSlackApiJsonWithBearer<SlackConversationsListResponse>({
      env: payload.env,
      path: '/conversations.list',
      token: payload.accessToken,
      actionLabel: '读取 Slack channels 列表',
      queryParams,
    })

    channels.push(...(response.channels || []))
    cursor = response.response_metadata?.next_cursor?.trim() || null

    if (!cursor) {
      break
    }
  }

  return channels
}

async function getSlackWorkspaceByTeamId(payload: {
  serviceClient: SupabaseClient
  companyId: string
  teamId: string
}): Promise<SlackWorkspaceRow | null> {
  const result = await payload.serviceClient
    .schema('slack')
    .from('workspace')
    .select('id, company_id, team_id, name, enterprise_id')
    .eq('company_id', payload.companyId)
    .eq('team_id', payload.teamId)
    .limit(1)

  if (result.error) {
    throw createApiError(500, `读取 slack.workspace 失败：${result.error.message}`)
  }

  const rows = (result.data || []) as SlackWorkspaceRow[]
  return rows[0] || null
}

async function getSlackInstallationByTeamId(payload: {
  serviceClient: SupabaseClient
  companyId: string
  teamId: string
}): Promise<SlackInstallationRow | null> {
  const result = await payload.serviceClient
    .schema('slack')
    .from('installation')
    .select(
      'id, company_id, workspace_uuid, team_id, enterprise_id, app_id, bot_user_id, scope, access_token_ciphertext, status, installed_by_user_id, installed_at, last_validated_at, last_synced_at, revoked_at, updated_at',
    )
    .eq('company_id', payload.companyId)
    .eq('team_id', payload.teamId)
    .limit(1)

  if (result.error) {
    throw createApiError(500, `读取 slack.installation 失败：${result.error.message}`)
  }

  const rows = (result.data || []) as SlackInstallationRow[]
  return rows[0] || null
}

async function upsertSlackWorkspace(payload: {
  serviceClient: SupabaseClient
  companyId: string
  teamId: string
  workspaceName: string | null
  enterpriseId: string | null
}): Promise<SlackWorkspaceRow> {
  await ensureSlackTeamIdAvailableForCompany({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    teamId: payload.teamId,
  })

  const existingWorkspace = await getSlackWorkspaceByTeamId({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    teamId: payload.teamId,
  })

  const workspacePayload = {
    name: payload.workspaceName,
    enterprise_id: payload.enterpriseId,
  }

  if (existingWorkspace) {
    const updateResult = await payload.serviceClient
      .schema('slack')
      .from('workspace')
      .update(workspacePayload)
      .eq('id', existingWorkspace.id)
      .select('id, company_id, team_id, name, enterprise_id')
      .single<SlackWorkspaceRow>()

    if (updateResult.error || !updateResult.data) {
      throw createApiError(500, `更新 slack.workspace 失败：${updateResult.error?.message || '未知错误'}`)
    }

    return updateResult.data
  }

  const insertResult = await payload.serviceClient
    .schema('slack')
    .from('workspace')
    .insert({
      company_id: payload.companyId,
      team_id: payload.teamId,
      ...workspacePayload,
    })
    .select('id, company_id, team_id, name, enterprise_id')
    .single<SlackWorkspaceRow>()

  if (insertResult.error || !insertResult.data) {
    throw createApiError(500, `写入 slack.workspace 失败：${insertResult.error?.message || '未知错误'}`)
  }

  return insertResult.data
}

async function upsertSlackInstallation(payload: {
  serviceClient: SupabaseClient
  env: SlackServerEnv
  companyId: string
  teamId: string
  workspaceUuid: string | null
  enterpriseId: string | null
  appId: string | null
  botUserId: string | null
  scope: string | null
  accessToken: string
  installedByUserId: string | null
  status: SlackInstallationStatus
  touchLastSyncedAt: boolean
}): Promise<SlackInstallationRow> {
  const existingInstallation = await getSlackInstallationByTeamId({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    teamId: payload.teamId,
  })

  const nowIso = new Date().toISOString()
  const accessTokenCiphertext = encodeSlackWorkspaceCredential(
    {
      accessToken: payload.accessToken,
      enterpriseId: payload.enterpriseId,
    },
    payload.env.integrationSecret,
  )

  const installationPayload: Record<string, string | null> = {
    workspace_uuid: payload.workspaceUuid || existingInstallation?.workspace_uuid || null,
    enterprise_id: payload.enterpriseId ?? existingInstallation?.enterprise_id ?? null,
    app_id: payload.appId ?? existingInstallation?.app_id ?? null,
    bot_user_id: payload.botUserId ?? existingInstallation?.bot_user_id ?? null,
    scope: payload.scope ?? existingInstallation?.scope ?? null,
    access_token_ciphertext: accessTokenCiphertext,
    status: payload.status,
    last_validated_at: nowIso,
    updated_at: nowIso,
    revoked_at: payload.status === 'revoked' ? nowIso : null,
  }

  if (payload.installedByUserId || existingInstallation?.installed_by_user_id) {
    installationPayload.installed_by_user_id =
      payload.installedByUserId || existingInstallation?.installed_by_user_id || null
  }

  if (payload.touchLastSyncedAt) {
    installationPayload.last_synced_at = nowIso
  }

  if (existingInstallation) {
    const updateResult = await payload.serviceClient
      .schema('slack')
      .from('installation')
      .update(installationPayload)
      .eq('id', existingInstallation.id)
      .select(
        'id, company_id, workspace_uuid, team_id, enterprise_id, app_id, bot_user_id, scope, access_token_ciphertext, status, installed_by_user_id, installed_at, last_validated_at, last_synced_at, revoked_at, updated_at',
      )
      .single<SlackInstallationRow>()

    if (updateResult.error || !updateResult.data) {
      throw createApiError(500, `更新 slack.installation 失败：${updateResult.error?.message || '未知错误'}`)
    }

    return updateResult.data
  }

  const insertResult = await payload.serviceClient
    .schema('slack')
    .from('installation')
    .insert({
      company_id: payload.companyId,
      team_id: payload.teamId,
      installed_at: nowIso,
      ...installationPayload,
    })
    .select(
      'id, company_id, workspace_uuid, team_id, enterprise_id, app_id, bot_user_id, scope, access_token_ciphertext, status, installed_by_user_id, installed_at, last_validated_at, last_synced_at, revoked_at, updated_at',
    )
    .single<SlackInstallationRow>()

  if (insertResult.error || !insertResult.data) {
    throw createApiError(500, `写入 slack.installation 失败：${insertResult.error?.message || '未知错误'}`)
  }

  return insertResult.data
}

async function markSlackInstallationStatus(payload: {
  serviceClient: SupabaseClient
  companyId: string
  teamId: string
  status: SlackInstallationStatus
}): Promise<void> {
  const existingInstallation = await getSlackInstallationByTeamId({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    teamId: payload.teamId,
  })

  if (!existingInstallation) {
    return
  }

  const nowIso = new Date().toISOString()
  const updatePayload: Record<string, string | null> = {
    status: payload.status,
    updated_at: nowIso,
  }

  if (payload.status === 'revoked') {
    updatePayload.revoked_at = nowIso
  }

  const updateResult = await payload.serviceClient
    .schema('slack')
    .from('installation')
    .update(updatePayload)
    .eq('id', existingInstallation.id)

  if (updateResult.error) {
    throw createApiError(500, `更新 slack.installation 状态失败：${updateResult.error.message}`)
  }
}

function resolveSlackChannelType(channel: SlackConversation): string {
  if (channel.is_private) {
    return 'private_channel'
  }

  if (channel.is_group) {
    return 'group'
  }

  if (channel.is_im) {
    return 'im'
  }

  if (channel.is_mpim) {
    return 'mpim'
  }

  if (channel.is_channel) {
    return 'public_channel'
  }

  return 'channel'
}

async function upsertSlackChannelRecords(payload: {
  serviceClient: SupabaseClient
  companyId: string
  teamId: string
  workspaceUuid: string
  channels: SlackConversation[]
}): Promise<number> {
  const existingChannelResult = await payload.serviceClient
    .schema('slack')
    .from('channel')
    .select('id, channel_id')
    .eq('company_id', payload.companyId)
    .eq('team_id', payload.teamId)

  if (existingChannelResult.error) {
    throw createApiError(500, `读取 slack.channel 失败：${existingChannelResult.error.message}`)
  }

  const existingRows = (existingChannelResult.data || []) as Array<{
    id: string
    channel_id: string | null
  }>

  const channelIdMap = new Map<string, string>()
  existingRows.forEach((row) => {
    if (!row.channel_id) {
      return
    }

    if (!channelIdMap.has(row.channel_id)) {
      channelIdMap.set(row.channel_id, row.id)
    }
  })

  let upsertedCount = 0

  for (const channel of payload.channels) {
    const channelId = channel.id?.trim() || ''
    if (!channelId) {
      continue
    }

    const nextPayload = {
      team_id: payload.teamId,
      channel_type: resolveSlackChannelType(channel),
      name: channel.name?.trim() || channelId,
      is_private: Boolean(channel.is_private),
      workspace_uuid: payload.workspaceUuid,
    }

    const existedChannelId = channelIdMap.get(channelId)
    if (existedChannelId) {
      const updateResult = await payload.serviceClient
        .schema('slack')
        .from('channel')
        .update(nextPayload)
        .eq('id', existedChannelId)

      if (updateResult.error) {
        throw createApiError(500, `更新 slack.channel 失败：${updateResult.error.message}`)
      }

      upsertedCount += 1
      continue
    }

    const insertResult = await payload.serviceClient
      .schema('slack')
      .from('channel')
      .insert({
        company_id: payload.companyId,
        channel_id: channelId,
        ...nextPayload,
      })
      .select('id')
      .single<{ id: string }>()

    if (insertResult.error || !insertResult.data?.id) {
      throw createApiError(500, `写入 slack.channel 失败：${insertResult.error?.message || '未知错误'}`)
    }

    channelIdMap.set(channelId, insertResult.data.id)
    upsertedCount += 1
  }

  return upsertedCount
}

async function syncSlackWorkspaceData(payload: {
  serviceClient: SupabaseClient
  env: SlackServerEnv
  companyId: string
  teamId: string
  accessToken: string
  enterpriseId: string | null
  workspaceName: string | null
}): Promise<{
  connection: IntegrationConnectionRow
  workspace: SlackWorkspaceRow
  summary: SlackSyncSummary
}> {
  const authTest = await fetchSlackAuthTest({
    env: payload.env,
    accessToken: payload.accessToken,
  })

  const normalizedTeamId = authTest.team_id?.trim() || payload.teamId
  if (!isSlackTeamId(normalizedTeamId)) {
    throw createApiError(502, 'Slack auth.test 未返回有效 team_id。')
  }

  const normalizedWorkspaceName = authTest.team?.trim() || payload.workspaceName || null

  const workspace = await upsertSlackWorkspace({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    teamId: normalizedTeamId,
    workspaceName: normalizedWorkspaceName,
    enterpriseId: payload.enterpriseId,
  })

  const channels = await fetchSlackPublicChannels({
    env: payload.env,
    accessToken: payload.accessToken,
    teamId: normalizedTeamId,
  })

  const channelsUpserted = await upsertSlackChannelRecords({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    teamId: normalizedTeamId,
    workspaceUuid: workspace.id,
    channels,
  })

  const connection = await upsertSlackConnection({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    workspaceId: normalizedTeamId,
    workspaceName: normalizedWorkspaceName,
    status: 'connected',
  })

  return {
    connection,
    workspace,
    summary: {
      workspaceId: workspace.id,
      channelsUpserted,
    },
  }
}

function buildSlackSettingsRedirectUrl(payload: {
  request: Request
  companyId: string | null
  connected: '1' | '0'
  syncStatus: 'ok' | 'degraded'
  errorMessage?: string
}): string {
  const redirectUrl = new URL('/settings/slack-integration', resolveAppOrigin(payload.request))

  if (payload.companyId) {
    redirectUrl.searchParams.set('company_id', payload.companyId)
  }

  redirectUrl.searchParams.set('slack_connected', payload.connected)
  redirectUrl.searchParams.set('slack_sync', payload.syncStatus)

  if (payload.errorMessage) {
    redirectUrl.searchParams.set('slack_error', truncateForRedirect(payload.errorMessage))
  }

  return redirectUrl.toString()
}

async function handleCreateInstallUrl(request: Request): Promise<Response> {
  const env = getSlackServerEnvOrNull(request)
  if (!env) {
    throw createApiError(
      503,
      '服务端未配置 Slack 集成所需环境变量（SLACK_CLIENT_ID / SLACK_CLIENT_SECRET）。',
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
  const statePayload: SlackInstallStatePayload = {
    companyId,
    userId: authUser.id,
    iat: nowSeconds,
    exp: nowSeconds + SLACK_STATE_TTL_SECONDS,
    nonce: randomBytes(12).toString('hex'),
  }

  const stateToken = createSlackStateToken(statePayload, env.integrationSecret)
  const installUrl = new URL('https://slack.com/oauth/v2/authorize')

  installUrl.searchParams.set('client_id', env.clientId)
  installUrl.searchParams.set('scope', env.scope)
  installUrl.searchParams.set('redirect_uri', env.redirectUri)
  installUrl.searchParams.set('state', stateToken)

  return jsonResponse({
    installUrl: installUrl.toString(),
  })
}

/**
 * Slack OAuth callback：
 * - 安装成功后立刻写 connection，再执行首次回填；
 * - 首次回填失败时 connection 状态标记为 disconnected，前端可手动重试；
 * - 统一 302 回 settings/slack-integration 并携带短 query 提示。
 */
async function handleSlackCallback(request: Request): Promise<Response> {
  const env = getSlackServerEnvOrNull(request)
  if (!env) {
    const redirectUrl = buildSlackSettingsRedirectUrl({
      request,
      companyId: null,
      connected: '0',
      syncStatus: 'degraded',
      errorMessage: '服务端未配置 Slack 集成环境变量（SLACK_CLIENT_ID / SLACK_CLIENT_SECRET）。',
    })

    return Response.redirect(redirectUrl, 302)
  }

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')?.trim() || ''
  const stateToken = requestUrl.searchParams.get('state')?.trim() || ''

  if (!code || !stateToken) {
    const redirectUrl = buildSlackSettingsRedirectUrl({
      request,
      companyId: null,
      connected: '0',
      syncStatus: 'degraded',
      errorMessage: '回调参数缺失，请重新发起 Slack 安装。',
    })

    return Response.redirect(redirectUrl, 302)
  }

  const parsedState = verifySlackStateToken(stateToken, env.integrationSecret)
  if (!parsedState || !isUuid(parsedState.companyId)) {
    const redirectUrl = buildSlackSettingsRedirectUrl({
      request,
      companyId: null,
      connected: '0',
      syncStatus: 'degraded',
      errorMessage: '安装 state 校验失败或已过期，请重新发起安装。',
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

    const oauthResponse = await exchangeSlackOAuthCode({
      env,
      code,
    })

    const accessToken = oauthResponse.access_token?.trim() || ''
    if (!accessToken) {
      throw createApiError(502, 'Slack OAuth 未返回 bot token。')
    }

    ensureRequiredSlackInstallScopes(oauthResponse.scope)

    const authTest = await fetchSlackAuthTest({
      env,
      accessToken,
    })

    assertWorkspaceScopedSlackInstall({
      oauthResponse,
      authTest,
    })

    const teamId = authTest.team_id?.trim() || oauthResponse.team?.id?.trim() || ''
    if (!teamId || !isSlackTeamId(teamId)) {
      throw createApiError(502, 'Slack OAuth 未返回有效 team_id。')
    }

    const workspaceName = authTest.team?.trim() || oauthResponse.team?.name?.trim() || null
    const enterpriseId =
      authTest.enterprise_id?.trim() || oauthResponse.enterprise?.id?.trim() || null

    const connection = await upsertSlackConnection({
      serviceClient,
      companyId: parsedState.companyId,
      workspaceId: teamId,
      workspaceName,
      status: 'connected',
    })

    const workspace = await upsertSlackWorkspace({
      serviceClient,
      companyId: parsedState.companyId,
      teamId,
      workspaceName,
      enterpriseId,
    })

    await upsertSlackInstallation({
      serviceClient,
      env,
      companyId: parsedState.companyId,
      teamId,
      workspaceUuid: workspace.id,
      enterpriseId,
      appId: oauthResponse.app_id?.trim() || null,
      botUserId:
        oauthResponse.bot_user_id?.trim() || authTest.bot_id?.trim() || authTest.user_id?.trim() || null,
      scope: oauthResponse.scope?.trim() || null,
      accessToken,
      installedByUserId: authUser.id,
      status: 'connected',
      touchLastSyncedAt: false,
    })

    try {
      const syncResult = await syncSlackWorkspaceData({
        serviceClient,
        env,
        companyId: parsedState.companyId,
        teamId,
        accessToken,
        enterpriseId,
        workspaceName,
      })

      await upsertSlackInstallation({
        serviceClient,
        env,
        companyId: parsedState.companyId,
        teamId: syncResult.workspace.team_id,
        workspaceUuid: syncResult.workspace.id,
        enterpriseId,
        appId: oauthResponse.app_id?.trim() || null,
        botUserId:
          oauthResponse.bot_user_id?.trim() || authTest.bot_id?.trim() || authTest.user_id?.trim() || null,
        scope: oauthResponse.scope?.trim() || null,
        accessToken,
        installedByUserId: authUser.id,
        status: 'connected',
        touchLastSyncedAt: true,
      })

      const redirectUrl = buildSlackSettingsRedirectUrl({
        request,
        companyId: parsedState.companyId,
        connected: '1',
        syncStatus: 'ok',
      })

      return Response.redirect(redirectUrl, 302)
    } catch (syncError) {
      const syncErrorMessage = getErrorMessage(syncError, '首次回填失败。')

      await markSlackConnectionDisconnected({
        serviceClient,
        companyId: parsedState.companyId,
        workspaceId: connection.external_workspace_id,
        workspaceName: connection.external_workspace_name,
      })

      await markSlackInstallationStatus({
        serviceClient,
        companyId: parsedState.companyId,
        teamId,
        status: 'failed',
      })

      console.error('[slack_integration_callback_sync_failed]', {
        companyId: parsedState.companyId,
        teamId,
        error: syncErrorMessage,
      })

      const redirectUrl = buildSlackSettingsRedirectUrl({
        request,
        companyId: parsedState.companyId,
        connected: '1',
        syncStatus: 'degraded',
        errorMessage: syncErrorMessage,
      })
      return Response.redirect(redirectUrl, 302)
    }
  } catch (error) {
    const message = getErrorMessage(error, 'Slack 安装回调失败。')
    const redirectUrl = buildSlackSettingsRedirectUrl({
      request,
      companyId: parsedState.companyId,
      connected: '0',
      syncStatus: 'degraded',
      errorMessage: message,
    })

    return Response.redirect(redirectUrl, 302)
  }
}

async function handleSyncSlack(request: Request): Promise<Response> {
  const env = getSlackServerEnvOrNull(request)
  if (!env) {
    throw createApiError(
      503,
      '服务端未配置 Slack 集成所需环境变量（SLACK_CLIENT_ID / SLACK_CLIENT_SECRET）。',
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

  const connection = await getSlackConnectionByCompanyId({
    serviceClient,
    companyId,
  })

  if (!connection) {
    return jsonResponse({
      connection: null,
      syncSummary: null,
      message: '当前公司尚未连接 Slack。',
    })
  }

  if (!connection.external_workspace_id || !isSlackTeamId(connection.external_workspace_id)) {
    throw createApiError(409, '当前连接缺少有效 team_id，请重新发起 Slack 安装。')
  }

  if (!syncNow) {
    return jsonResponse({
      connection: mapConnectionRowToView(connection),
      syncSummary: null,
      message: null,
    })
  }

  const workspace = await getSlackWorkspaceByTeamId({
    serviceClient,
    companyId,
    teamId: connection.external_workspace_id,
  })

  if (!workspace) {
    throw createApiError(409, '未找到 Slack workspace 凭据，请重新发起 Slack 安装。')
  }

  const installation = await getSlackInstallationByTeamId({
    serviceClient,
    companyId,
    teamId: connection.external_workspace_id,
  })

  const credential = getSlackWorkspaceCredential({
    installationCiphertext: installation?.access_token_ciphertext || null,
    encryptedValue: isLegacySlackWorkspaceCredential(workspace.enterprise_id) ? workspace.enterprise_id : null,
    workspaceEnterpriseId: workspace.enterprise_id,
    secret: env.integrationSecret,
    fallbackBotToken: env.fallbackBotToken,
  })

  if (!credential?.accessToken) {
    throw createApiError(409, 'Slack token 不可用，请重新发起 Slack 安装。')
  }

  await upsertSlackInstallation({
    serviceClient,
    env,
    companyId,
    teamId: connection.external_workspace_id,
    workspaceUuid: workspace.id,
    enterpriseId: credential.enterpriseId,
    appId: installation?.app_id || null,
    botUserId: installation?.bot_user_id || null,
    scope: installation?.scope || null,
    accessToken: credential.accessToken,
    installedByUserId: authUser.id,
    status: 'connected',
    touchLastSyncedAt: false,
  })

  try {
    const syncResult = await syncSlackWorkspaceData({
      serviceClient,
      env,
      companyId,
      teamId: connection.external_workspace_id,
      accessToken: credential.accessToken,
      enterpriseId: credential.enterpriseId,
      workspaceName: connection.external_workspace_name,
    })

    await upsertSlackInstallation({
      serviceClient,
      env,
      companyId,
      teamId: syncResult.workspace.team_id,
      workspaceUuid: syncResult.workspace.id,
      enterpriseId: credential.enterpriseId,
      appId: installation?.app_id || null,
      botUserId: installation?.bot_user_id || null,
      scope: installation?.scope || null,
      accessToken: credential.accessToken,
      installedByUserId: authUser.id,
      status: 'connected',
      touchLastSyncedAt: true,
    })

    return jsonResponse({
      connection: mapConnectionRowToView(syncResult.connection),
      syncSummary: {
        workspaceId: syncResult.summary.workspaceId,
        channelsUpserted: syncResult.summary.channelsUpserted,
      },
      message: '手动同步成功。',
    })
  } catch (error) {
    const errorMessage = getErrorMessage(error, '同步失败。')

    const disconnectedConnection = await markSlackConnectionDisconnected({
      serviceClient,
      companyId,
      workspaceId: connection.external_workspace_id,
      workspaceName: connection.external_workspace_name,
    })

    await markSlackInstallationStatus({
      serviceClient,
      companyId,
      teamId: connection.external_workspace_id,
      status: 'failed',
    })

    console.error('[slack_integration_sync_failed]', {
      companyId,
      teamId: connection.external_workspace_id,
      error: errorMessage,
    })

    return jsonResponse(
      {
        error: `同步失败：${errorMessage}`,
        connection: mapConnectionRowToView(disconnectedConnection),
      },
      502,
    )
  }
}

/**
 * 读取当前公司的 Slack 社区（channel）列表：
 * - 仅要求当前用户是公司 active 成员；
 * - 不要求 Owner/Admin，便于成员侧只读浏览。
 */
async function handleGetSlackChannels(request: Request): Promise<Response> {
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
    .schema('slack')
    .from('channel')
    .select('id, team_id, channel_id, name, channel_type, is_private')
    .eq('company_id', companyId)
    .order('name', { ascending: true })

  if (channelResult.error) {
    throw createApiError(500, `读取 slack.channel 失败：${channelResult.error.message}`)
  }

  const channels = ((channelResult.data || []) as SlackChannelRow[]).map(mapSlackChannelRowToView)

  return jsonResponse({
    channels,
  })
}

export async function handleSlackIntegrationApi(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const pathname = requestUrl.pathname
  const method = request.method.toUpperCase()

  try {
    if (pathname === '/api/settings/slack/install-url' && method === 'POST') {
      return await handleCreateInstallUrl(request)
    }

    if (pathname === '/api/settings/slack/channels' && method === 'GET') {
      return await handleGetSlackChannels(request)
    }

    if (pathname === '/api/settings/slack/callback' && method === 'GET') {
      return await handleSlackCallback(request)
    }

    if (pathname === '/api/settings/slack/sync' && method === 'POST') {
      return await handleSyncSlack(request)
    }

    return jsonResponse(
      {
        error: '未找到 Slack 集成 API 路径。',
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

    const message = error instanceof Error ? error.message : 'Slack 集成接口出现未知错误。'
    return jsonResponse({ error: message }, 500)
  }
}

export const __slackIntegrationApiTestables = {
  assertWorkspaceScopedSlackInstall,
  assertSlackTeamOwnershipForUpsert,
  buildSlackInstallScope,
  buildSlackEnterpriseWorkspaceGrantUrl,
  ensureSlackTeamIdAvailableForCompany,
  ensureRequiredSlackInstallScopes,
  getErrorMessage,
  getSlackWorkspaceCredential,
  isLegacySlackWorkspaceCredential,
}
