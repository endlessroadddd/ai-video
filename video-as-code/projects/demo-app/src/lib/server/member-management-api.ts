import {
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
  type CipherGCMTypes,
} from 'node:crypto'

import { createSupabaseServerClientForRequest, createSupabaseServiceRoleClient } from '@/lib/supabase/server'

type ServiceRoleSupabaseClient = ReturnType<typeof createSupabaseServiceRoleClient>

type CompanyRole = 'owner' | 'admin' | 'member'
type MemberRole = 'owner' | 'admin' | 'member'
type MemberStatus = 'active' | 'invited'
type PlatformType = 'discord' | 'telegram' | 'feishu' | 'slack'
type OauthBindingPlatform = Exclude<PlatformType, 'telegram'>
type TelegramWidgetAuthUser = {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

type AuthenticatedUser = {
  id: string
  email: string | null
}

type AcceptInvitationsResponse = {
  acceptedCount: number
  skippedCount: number
  acceptedCompanyIds: string[]
  preferredCompanyId: string | null
}

type ApiError = {
  status: number
  message: string
}

type OrganizationMemberRow = {
  id: string
  company_id: string
  user_id: string
  email: string
  role: MemberRole
  status: 'active' | 'inactive'
  joined_at: string
  last_active_at?: string | null
}

type PlanQuotaRow = {
  company_id: string
  admin_limit: number | null
  member_limit: number | null
}

type MemberAccountBindingRow = {
  id?: string
  member_id: string
  platform: PlatformType
  external_account_id?: string
  external_display?: string | null
}

type MemberInvitationRow = {
  id: string
  company_id: string
  email: string
  role: Exclude<MemberRole, 'owner'>
  invited_by: string
  status: 'pending' | 'accepted' | 'expired' | 'cancelled' | 'failed'
  expires_at: string
  created_at: string
}

type AuthOperationError = {
  message: string
  code?: string
  status?: number
}

type InvitationEmailMetadata = {
  company_id: string
  invitation_id: string
  invited_role: Exclude<MemberRole, 'owner'>
  invited_by: string
}

type InvitationDeliveryMethod = 'invite-email' | 'magic-link' | 'manual-login'
type InviteLinkTokenPayload = {
  companyId: string
  role: Exclude<MemberRole, 'owner'>
  invitedByUserId: string
  iat: number
  exp: number
  nonce: string
}

type CreateInviteLinkResponse = {
  message: string
  inviteLink: string
}

type InviteLinkPreviewResponse = {
  companyId: string
  companyName: string
  role: Exclude<MemberRole, 'owner'>
  status: 'active' | 'expired'
  expiresAt: string
  currentUserEmail: string | null
  currentUserAlreadyMember: boolean
}

type AcceptInviteLinkResponse = {
  message: string
  companyId: string
}

type JoinableOrganizationMemberState =
  | {
      kind: 'already-member'
      member: OrganizationMemberRow
    }
  | {
      kind: 'activate-existing'
      member: OrganizationMemberRow
    }
  | {
      kind: 'insert-new'
    }

type PreparedInvitation = {
  serviceClient: ServiceRoleSupabaseClient
  currentUser: AuthenticatedUser
  invitationId: string
  invitationExpiresAt: string
  isResend: boolean
}

type InvitationAuthClient = {
  admin: {
    inviteUserByEmail: (
      email: string,
      options: {
        data?: InvitationEmailMetadata
        redirectTo?: string
      },
    ) => Promise<{
      error: AuthOperationError | null
    }>
  }
  signInWithOtp: (credentials: {
    email: string
    options: {
      emailRedirectTo: string
      shouldCreateUser: boolean
      data: InvitationEmailMetadata
    }
  }) => Promise<{
    error: AuthOperationError | null
  }>
}

type CompanyUserProfileRow = {
  company_id: string
  user_id: string
  display_name: string
  avatar_url: string | null
}

type SnapshotMember = {
  id: string
  email: string
  displayName: string
  avatarUrl: string | null
  role: MemberRole
  linkedAccounts: PlatformType[]
  joinedAt: string
  recentActivityAt: string | null
  status: MemberStatus
  isCurrentUser: boolean
  requiresAccountBinding: boolean
}

type SnapshotResponse = {
  currentUserRole: CompanyRole
  adminLimit: number
  memberLimit: number
  adminUsed: number
  memberUsed: number
  members: SnapshotMember[]
}

type OauthBindingStatePayload = {
  companyId: string
  userId: string
  platform: OauthBindingPlatform
  iat: number
  exp: number
  nonce: string
  feishuBotAppId?: string | null
}

type DiscordOauthServerEnv = {
  clientId: string
  clientSecret: string
  integrationSecret: string
  authorizeUrl: string
  tokenUrl: string
  userInfoUrl: string
  redirectUri: string
  scope: string
}

type SlackOauthServerEnv = {
  clientId: string
  clientSecret: string
  integrationSecret: string
  authorizeUrl: string
  tokenUrl: string
  authTestUrl: string
  redirectUri: string
  userScope: string
  scope: string
}

type FeishuOauthServerEnv = {
  integrationSecret: string
  authorizeUrl: string
  tokenUrl: string
  userInfoUrl: string
  redirectUri: string
}

type FeishuOauthBotAppRow = {
  id?: string | null
  company_id?: string | null
  name?: string | null
  app_id?: string | null
  app_secret_ciphertext?: string | null
  status?: string | null
  is_default?: boolean | null
}

type FeishuOauthBotCandidate = {
  id: string
  companyId: string
  name: string
  appId: string
  appSecretCiphertext: string
  status: string
  isDefault: boolean
}

type ResolvedFeishuOauthBotContext = {
  botAppId: string | null
  appId: string
  appSecret: string
}

type DiscordOauthTokenResponse = {
  access_token?: string
  token_type?: string
  scope?: string
  error?: string
  error_description?: string
}

type DiscordOauthUserInfoResponse = {
  id?: string
  username?: string
  discriminator?: string
  global_name?: string | null
}

type SlackOauthTokenResponse = {
  ok?: boolean
  error?: string
  access_token?: string
  authed_user?: {
    id?: string
    access_token?: string
    scope?: string
    token_type?: string
  }
}

type SlackAuthTestResponse = {
  ok?: boolean
  error?: string
  user_id?: string
  user?: string
}

type FeishuOauthTokenResponse = {
  code?: number
  msg?: string
  message?: string
  data?: {
    access_token?: string
  }
  access_token?: string
}

type FeishuUserInfoResponse = {
  code?: number
  msg?: string
  message?: string
  data?: {
    open_id?: string
    union_id?: string
    user_id?: string
    name?: string
    en_name?: string
  }
  user?: {
    open_id?: string
    union_id?: string
    user_id?: string
    name?: string
    en_name?: string
  }
}

type FeishuOauthUserInfo = NonNullable<FeishuUserInfoResponse['data'] | FeishuUserInfoResponse['user']>

const UUID_REGEX: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const DEFAULT_ADMIN_LIMIT = 3
const DEFAULT_MEMBER_LIMIT = 50
const INVITATION_TTL_DAYS = 7
const INVITE_LINK_TTL_HOURS = 24
const TELEGRAM_WIDGET_AUTH_MAX_AGE_SECONDS = 300
const OAUTH_BINDING_STATE_TTL_SECONDS = 5 * 60
const DISCORD_USER_ID_REGEX: RegExp = /^\d{15,30}$/

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
 * 从未知异常中提取可展示的 message：
 * - 优先兼容原生 `Error`；
 * - 同时兼容项目里常见的 `{ status, message }` plain object；
 * - 回调页需要把短消息透传到 query string，避免前端只看到笼统失败提示。
 */
function getErrorMessageFromUnknown(error: unknown, fallbackMessage: string): string {
  if (error instanceof Error) {
    const normalizedMessage = error.message.trim()
    if (normalizedMessage) {
      return normalizedMessage
    }
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const normalizedMessage = String(error.message || '').trim()
    if (normalizedMessage) {
      return normalizedMessage
    }
  }

  if (typeof error === 'string') {
    const normalizedMessage = error.trim()
    if (normalizedMessage) {
      return normalizedMessage
    }
  }

  return fallbackMessage
}

/**
 * OAuth callback 失败日志：
 * - 统一记录平台、公司、当前用户、失败阶段；
 * - 刻意不记录完整 query string，避免把 OAuth `code/state` 打进日志；
 * - 额外带上 stack/status，便于在线上快速判断是鉴权、第三方接口还是写库失败。
 */
function logOauthBindingCallbackFailure(payload: {
  platform: OauthBindingPlatform
  request: Request
  companyId: string | null
  stateUserId: string | null
  currentUserId: string | null
  failureStep: string
  error: unknown
}): void {
  const errorMessage = getErrorMessageFromUnknown(payload.error, `${getPlatformDisplayName(payload.platform)} 账号绑定失败。`)
  const errorStatus =
    typeof payload.error === 'object' && payload.error !== null && 'status' in payload.error
      ? String(payload.error.status ?? '')
      : ''
  const errorStack = payload.error instanceof Error ? payload.error.stack || null : null
  const requestUrl = new URL(payload.request.url)

  console.error(`[member_management_oauth_${payload.platform}_callback_failed]`, {
    platform: payload.platform,
    companyId: payload.companyId,
    stateUserId: payload.stateUserId,
    currentUserId: payload.currentUserId,
    failureStep: payload.failureStep,
    requestPathname: requestUrl.pathname,
    errorMessage,
    errorStatus: errorStatus || null,
    errorStack,
  })
}

function isUuid(value: string): boolean {
  return UUID_REGEX.test(value)
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase()
}

/**
 * 统一把未知值规整成“非空字符串或 null”：
 * - 兼容数据库查询与第三方响应里常见的 nullable / mixed 类型；
 * - 避免在多个 helper 里重复写同一套 `String(...).trim()` 防御逻辑。
 */
function normalizeOptionalText(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const normalizedValue = value.trim()
  return normalizedValue || null
}

function ensureValidCompanyId(companyId: string): void {
  if (!isUuid(companyId)) {
    throw createApiError(400, 'company_id 非法。')
  }
}

function ensureValidInvitationRole(role: string): role is Exclude<MemberRole, 'owner'> {
  return role === 'admin' || role === 'member'
}

function resolveAppOrigin(request: Request): string {
  const configuredAppUrl: string = process.env.APP_URL?.trim() || ''
  if (configuredAppUrl) {
    return configuredAppUrl.replace(/\/$/, '')
  }

  const requestUrl = new URL(request.url)
  return requestUrl.origin
}

function ensureValidPlatform(value: string): value is PlatformType {
  return value === 'discord' || value === 'telegram' || value === 'feishu' || value === 'slack'
}

function getPlatformDisplayName(platform: PlatformType): string {
  if (platform === 'discord') {
    return 'Discord'
  }

  if (platform === 'telegram') {
    return 'Telegram'
  }

  if (platform === 'feishu') {
    return '飞书'
  }

  return 'Slack'
}

function getTelegramBotTokenOrNull(): string | null {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim() || ''
  if (!token) {
    return null
  }
  return token
}

function ensureValidOauthBindingPlatform(value: string): value is OauthBindingPlatform {
  return value === 'discord' || value === 'slack' || value === 'feishu'
}

function isDiscordUserId(value: string): boolean {
  return DISCORD_USER_ID_REGEX.test(value)
}

function encodeBase64Url(raw: string): string {
  return Buffer.from(raw, 'utf8').toString('base64url')
}

function decodeBase64Url(raw: string): string {
  return Buffer.from(raw, 'base64url').toString('utf8')
}

/**
 * 统一解码 base64url / base64 字节串：
 * - 飞书 Bot 密钥密文使用 urlsafe base64；
 * - 兼容环境变量里主密钥可能是标准 base64 或 base64url。
 */
function decodeBase64ToBytes(raw: string): Buffer {
  const normalizedValue = raw.replace(/-/g, '+').replace(/_/g, '/')
  const padding = '='.repeat((4 - (normalizedValue.length % 4 || 4)) % 4)
  return Buffer.from(`${normalizedValue}${padding}`, 'base64')
}

/**
 * 读取并解析 Feishu Bot 主密钥：
 * - 兼容直接传 16/24/32 字节原文；
 * - 也兼容传对应长度密钥的 base64/base64url 编码。
 */
function getBotSecretMasterKeyBytes(): Buffer {
  const rawKey = process.env.BOT_SECRET_MASTER_KEY?.trim() || ''
  if (!rawKey) {
    throw createApiError(503, '服务端缺少 BOT_SECRET_MASTER_KEY，暂无法读取 Feishu Bot 密钥。')
  }

  const keyCandidates: Buffer[] = []

  try {
    keyCandidates.push(decodeBase64ToBytes(rawKey))
  } catch {
    // 不是合法 base64 时继续回退到“把原文当作密钥”。
  }

  keyCandidates.push(Buffer.from(rawKey, 'utf8'))

  const matchedKey = keyCandidates.find((candidate) => candidate.length === 16 || candidate.length === 24 || candidate.length === 32)
  if (!matchedKey) {
    throw createApiError(503, 'BOT_SECRET_MASTER_KEY 必须是 16/24/32 字节原文或对应长度的 base64。')
  }

  return matchedKey
}

/**
 * 解密 `feishu.bot_app.app_secret_ciphertext`：
 * - 与 `lucius-bot` 侧 AES-GCM 存储格式保持一致；
 * - 这里仅在服务端 OAuth 回调换 token 时读取真实 app_secret，浏览器永远不会接触明文。
 */
function decryptFeishuBotSecretCiphertext(ciphertext: string): string {
  const normalizedCiphertext = ciphertext.trim()
  if (!normalizedCiphertext.startsWith('v1:')) {
    throw createApiError(500, 'Feishu Bot 密钥格式非法。')
  }

  const parts = normalizedCiphertext.split(':', 3)
  if (parts.length !== 3) {
    throw createApiError(500, 'Feishu Bot 密钥格式非法。')
  }

  try {
    const nonce = decodeBase64ToBytes(parts[1])
    const encryptedBytes = decodeBase64ToBytes(parts[2])
    const masterKey = getBotSecretMasterKeyBytes()
    const authTagLength = 16
    /**
     * 这里必须把算法声明成 GCM 字面量联合类型：
     * - 否则 TypeScript 只会把 `createDecipheriv()` 推断成普通 `Decipher`；
     * - 后续的 `setAuthTag()` 会被误判为不存在。
     */
    const algorithm: CipherGCMTypes =
      masterKey.length === 16 ? 'aes-128-gcm' : masterKey.length === 24 ? 'aes-192-gcm' : 'aes-256-gcm'

    if (encryptedBytes.length <= authTagLength) {
      throw new Error('ciphertext too short')
    }

    const cipherText = encryptedBytes.subarray(0, encryptedBytes.length - authTagLength)
    const authTag = encryptedBytes.subarray(encryptedBytes.length - authTagLength)
    const decipher = createDecipheriv(algorithm, masterKey, nonce)
    decipher.setAuthTag(authTag)

    const plainText = Buffer.concat([decipher.update(cipherText), decipher.final()]).toString('utf8').trim()
    if (!plainText) {
      throw new Error('empty plaintext')
    }

    return plainText
  } catch {
    throw createApiError(500, 'Feishu Bot 密钥解密失败，请重新保存 Bot 配置后再试。')
  }
}

function signStatePayload(encodedPayload: string, secret: string): string {
  return createHmac('sha256', secret).update(encodedPayload).digest('base64url')
}

/**
 * 生成成员账号 OAuth 绑定 state：
 * - 绑定 company_id / user_id / platform，避免 callback 阶段依赖前端透传；
 * - 增加过期时间与随机 nonce，降低重放风险。
 */
function createOauthBindingStateToken(payload: OauthBindingStatePayload, secret: string): string {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload))
  const signature = signStatePayload(encodedPayload, secret)
  return `${encodedPayload}.${signature}`
}

function verifyOauthBindingStateToken(
  token: string,
  secret: string,
  expectedPlatform: OauthBindingPlatform,
): OauthBindingStatePayload | null {
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
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as OauthBindingStatePayload
    const nowSeconds = Math.floor(Date.now() / 1000)

    if (!payload.companyId || !payload.userId || payload.exp <= nowSeconds) {
      return null
    }

    if (payload.platform !== expectedPlatform) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

function getInviteLinkSecret(): string {
  const secret = process.env.SUPABASE_SECRET_KEY?.trim() || ''

  if (!secret) {
    throw createApiError(503, '服务端未配置 SUPABASE_SECRET_KEY，暂不可生成邀请链接。')
  }

  return secret
}

function createInviteLinkToken(payload: InviteLinkTokenPayload, secret: string): string {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload))
  const signature = signStatePayload(encodedPayload, secret)
  return `${encodedPayload}.${signature}`
}

function verifyInviteLinkToken(token: string, secret: string): InviteLinkTokenPayload | null {
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
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as InviteLinkTokenPayload
    const isValidRole = payload.role === 'admin' || payload.role === 'member'

    if (!payload.companyId || !payload.invitedByUserId || !isValidRole || !Number.isFinite(payload.exp)) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

function buildMemberInviteLink(request: Request, token: string): string {
  const inviteUrl = new URL('/invite/member', resolveAppOrigin(request))
  inviteUrl.searchParams.set('token', token)
  return inviteUrl.toString()
}

/**
 * 构造 OAuth 回调后的设置页跳转地址：
 * - 个人账号绑定统一回到 Profile 分区；
 * - 用 query 传递平台、结果状态与提示文案，由 Profile 页内对应平台行消费。
 */
function buildMemberBindingSettingsRedirectUrl(payload: {
  request: Request
  companyId: string | null
  platform: OauthBindingPlatform
  status: 'success' | 'error'
  message?: string
}): string {
  const redirectUrl = new URL('/settings/profile-settings', resolveAppOrigin(payload.request))
  if (payload.companyId) {
    redirectUrl.searchParams.set('company_id', payload.companyId)
  }

  redirectUrl.searchParams.set('member_bind_platform', payload.platform)
  redirectUrl.searchParams.set('member_bind_status', payload.status)

  if (payload.message) {
    redirectUrl.searchParams.set('member_bind_message', payload.message)
  }

  return redirectUrl.toString()
}

/**
 * 读取 Discord OAuth（成员绑定）环境变量：
 * - 默认复用 Discord App 的 client_id/client_secret；
 * - redirect_uri 与 scope 可通过独立变量覆盖。
 */
function getDiscordOauthServerEnvOrNull(request: Request): DiscordOauthServerEnv | null {
  const clientId = process.env.DISCORD_CLIENT_ID?.trim() || ''
  const clientSecret = process.env.DISCORD_CLIENT_SECRET?.trim() || ''
  const integrationSecret =
    process.env.DISCORD_INTEGRATION_SECRET?.trim()
    || process.env.SUPABASE_SECRET_KEY?.trim()
    || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    || ''
  const authorizeUrl = process.env.DISCORD_MEMBER_BIND_AUTHORIZE_URL?.trim() || 'https://discord.com/oauth2/authorize'
  const tokenUrl = process.env.DISCORD_MEMBER_BIND_TOKEN_URL?.trim() || 'https://discord.com/api/v10/oauth2/token'
  const userInfoUrl =
    process.env.DISCORD_MEMBER_BIND_USERINFO_URL?.trim() || 'https://discord.com/api/v10/users/@me'
  const redirectUri =
    process.env.DISCORD_MEMBER_BIND_REDIRECT_URI?.trim() ||
    `${resolveAppOrigin(request)}/api/settings/member-management/bindings/oauth/discord/callback`
  const scope = process.env.DISCORD_MEMBER_BIND_SCOPE?.trim() || 'identify'

  if (!clientId || !clientSecret || !integrationSecret || !redirectUri) {
    return null
  }

  return {
    clientId,
    clientSecret,
    integrationSecret,
    authorizeUrl,
    tokenUrl,
    userInfoUrl,
    redirectUri,
    scope,
  }
}

/**
 * 读取 Slack OAuth（成员绑定）环境变量：
 * - 走 OAuth v2 authorize，默认仅申请 user_scope；
 * - 可通过 `SLACK_MEMBER_BIND_SCOPE` 增补 bot scope（非必需）。
 */
function getSlackOauthServerEnvOrNull(request: Request): SlackOauthServerEnv | null {
  const clientId = process.env.SLACK_CLIENT_ID?.trim() || ''
  const clientSecret = process.env.SLACK_CLIENT_SECRET?.trim() || ''
  const integrationSecret =
    process.env.SLACK_INTEGRATION_SECRET?.trim()
    || process.env.SUPABASE_SECRET_KEY?.trim()
    || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    || ''
  const authorizeUrl = process.env.SLACK_MEMBER_BIND_AUTHORIZE_URL?.trim() || 'https://slack.com/oauth/v2/authorize'
  const tokenUrl = process.env.SLACK_MEMBER_BIND_TOKEN_URL?.trim() || 'https://slack.com/api/oauth.v2.access'
  const authTestUrl = process.env.SLACK_MEMBER_BIND_AUTHTEST_URL?.trim() || 'https://slack.com/api/auth.test'
  const redirectUri =
    process.env.SLACK_MEMBER_BIND_REDIRECT_URI?.trim() ||
    `${resolveAppOrigin(request)}/api/settings/member-management/bindings/oauth/slack/callback`
  const userScope = process.env.SLACK_MEMBER_BIND_USER_SCOPE?.trim() || 'identity.basic'
  const scope = process.env.SLACK_MEMBER_BIND_SCOPE?.trim() || ''

  if (!clientId || !clientSecret || !integrationSecret || !redirectUri || !userScope) {
    return null
  }

  return {
    clientId,
    clientSecret,
    integrationSecret,
    authorizeUrl,
    tokenUrl,
    authTestUrl,
    redirectUri,
    userScope,
    scope,
  }
}

/**
 * 读取飞书 OAuth（成员绑定）环境变量：
 * - 这里只保留 OAuth 地址、redirect_uri 与 state 签名 secret；
 * - 实际使用的 `app_id/app_secret` 会在运行时按公司 Bot 配置动态解析。
 */
function getFeishuOauthServerEnvOrNull(request: Request): FeishuOauthServerEnv | null {
  const integrationSecret =
    process.env.FEISHU_MEMBER_BIND_SECRET?.trim()
    || process.env.SUPABASE_SECRET_KEY?.trim()
    || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    || ''
  const authorizeUrl =
    process.env.FEISHU_MEMBER_BIND_AUTHORIZE_URL?.trim() ||
    process.env.FEISHU_OAUTH_AUTHORIZE_URL?.trim() ||
    'https://accounts.feishu.cn/open-apis/authen/v1/authorize'
  const tokenUrl =
    process.env.FEISHU_MEMBER_BIND_TOKEN_URL?.trim() || 'https://open.feishu.cn/open-apis/authen/v2/oauth/token'
  const userInfoUrl =
    process.env.FEISHU_MEMBER_BIND_USERINFO_URL?.trim() || 'https://open.feishu.cn/open-apis/authen/v1/user_info'
  const redirectUri =
    process.env.FEISHU_MEMBER_BIND_REDIRECT_URI?.trim() ||
    `${resolveAppOrigin(request)}/api/settings/member-management/bindings/oauth/feishu/callback`

  if (!integrationSecret || !redirectUri) {
    return null
  }

  return {
    integrationSecret,
    authorizeUrl,
    tokenUrl,
    userInfoUrl,
    redirectUri,
  }
}

/**
 * 归一化 Feishu Bot 数据库行：
 * - 只保留 OAuth 绑定必需字段；
 * - 脏数据直接丢弃，避免把空 app_id / 空密文带入授权流程。
 */
function normalizeFeishuOauthBotCandidate(row: FeishuOauthBotAppRow): FeishuOauthBotCandidate | null {
  const id = normalizeOptionalText(row.id)
  const companyId = normalizeOptionalText(row.company_id)
  const name = normalizeOptionalText(row.name)
  const appId = normalizeOptionalText(row.app_id)
  const appSecretCiphertext = normalizeOptionalText(row.app_secret_ciphertext)

  if (!id || !companyId || !name || !appId || !appSecretCiphertext) {
    return null
  }

  return {
    id,
    companyId,
    name,
    appId,
    appSecretCiphertext,
    status: normalizeOptionalText(row.status) || 'unknown',
    isDefault: Boolean(row.is_default),
  }
}

/**
 * 在公司 Bot 列表里选出“本次成员绑定 OAuth 应该使用哪一个 Bot”：
 * - 默认 Bot 优先，保证多 Bot 公司有稳定入口；
 * - 没有默认 Bot 时，若仅有一个 active Bot，则自动复用；
 * - 多 active 但未设默认时拒绝继续，避免把成员错误绑定到其他 Bot 应用。
 */
function selectFeishuOauthBotCandidate(candidates: FeishuOauthBotCandidate[]): FeishuOauthBotCandidate | null {
  const activeCandidates = candidates.filter((candidate) => candidate.status.toLowerCase() === 'active')
  const defaultCandidate = activeCandidates.find((candidate) => candidate.isDefault)

  if (defaultCandidate) {
    return defaultCandidate
  }

  if (activeCandidates.length === 1) {
    return activeCandidates[0]
  }

  if (activeCandidates.length === 0) {
    return null
  }

  throw createApiError(409, '当前公司存在多个已启用的 Feishu Bot，请先在设置中指定默认 Bot 后再绑定飞书账号。')
}

/**
 * 兼容历史单 Bot 环境变量：
 * - 新逻辑优先走数据库里的公司 Bot；
 * - 只有公司还没落 Bot 配置时，才回退到 legacy env，避免影响旧环境。
 */
function getLegacyFeishuOauthBotContextOrNull(): ResolvedFeishuOauthBotContext | null {
  const appId = process.env.FEISHU_MEMBER_BIND_APP_ID?.trim() || process.env.FEISHU_APP_ID?.trim() || ''
  const appSecret =
    process.env.FEISHU_MEMBER_BIND_APP_SECRET?.trim() || process.env.FEISHU_APP_SECRET?.trim() || ''

  if (!appId || !appSecret) {
    return null
  }

  return {
    botAppId: null,
    appId,
    appSecret,
  }
}

async function listCompanyFeishuOauthBotCandidates(companyId: string): Promise<FeishuOauthBotCandidate[]> {
  const serviceClient = createSupabaseServiceRoleClient()
  const queryResult = await serviceClient
    .schema('feishu')
    .from('bot_app')
    .select('id, company_id, name, app_id, app_secret_ciphertext, status, is_default')
    .eq('company_id', companyId)

  if (queryResult.error) {
    throw createApiError(500, `读取 Feishu Bot 配置失败：${queryResult.error.message}`)
  }

  return ((queryResult.data || []) as FeishuOauthBotAppRow[])
    .map(normalizeFeishuOauthBotCandidate)
    .filter((candidate): candidate is FeishuOauthBotCandidate => Boolean(candidate))
}

async function getFeishuOauthBotCandidateById(payload: {
  companyId: string
  botAppId: string
}): Promise<FeishuOauthBotCandidate | null> {
  const serviceClient = createSupabaseServiceRoleClient()
  const queryResult = await serviceClient
    .schema('feishu')
    .from('bot_app')
    .select('id, company_id, name, app_id, app_secret_ciphertext, status, is_default')
    .eq('company_id', payload.companyId)
    .eq('id', payload.botAppId)
    .maybeSingle<FeishuOauthBotAppRow>()

  if (queryResult.error) {
    throw createApiError(500, `读取 Feishu Bot 配置失败：${queryResult.error.message}`)
  }

  return queryResult.data ? normalizeFeishuOauthBotCandidate(queryResult.data) : null
}

/**
 * 解析成员绑定 OAuth 需要使用的 Feishu Bot 凭证：
 * - 新发起绑定时优先按“默认 Bot / 单 active Bot”选择；
 * - callback 阶段若 state 已记录 `botAppId`，必须继续使用同一个 Bot，避免发起和回调之间切换到别的应用；
 * - 老的回调 state 没有 `botAppId` 时，优先兼容 legacy env，保证历史已发起的授权仍可完成。
 */
async function resolveFeishuOauthBotContext(payload: {
  companyId: string
  botAppId?: string | null
  preferLegacyWhenBotIdMissing?: boolean
}): Promise<ResolvedFeishuOauthBotContext> {
  const preferredBotAppId = payload.botAppId?.trim() || ''

  if (preferredBotAppId) {
    const preferredBot = await getFeishuOauthBotCandidateById({
      companyId: payload.companyId,
      botAppId: preferredBotAppId,
    })

    if (!preferredBot || preferredBot.status.toLowerCase() !== 'active') {
      throw createApiError(409, '本次绑定使用的 Feishu Bot 已不存在或未启用，请重新发起绑定。')
    }

    return {
      botAppId: preferredBot.id,
      appId: preferredBot.appId,
      appSecret: decryptFeishuBotSecretCiphertext(preferredBot.appSecretCiphertext),
    }
  }

  if (payload.preferLegacyWhenBotIdMissing) {
    const legacyBot = getLegacyFeishuOauthBotContextOrNull()
    if (legacyBot) {
      return legacyBot
    }
  }

  const companyBots = await listCompanyFeishuOauthBotCandidates(payload.companyId)
  const selectedBot = selectFeishuOauthBotCandidate(companyBots)

  if (selectedBot) {
    return {
      botAppId: selectedBot.id,
      appId: selectedBot.appId,
      appSecret: decryptFeishuBotSecretCiphertext(selectedBot.appSecretCiphertext),
    }
  }

  const legacyBot = getLegacyFeishuOauthBotContextOrNull()
  if (legacyBot) {
    return legacyBot
  }

  throw createApiError(409, '当前公司还没有可用的 Feishu Bot，请先在设置中配置并启用后再绑定飞书账号。')
}

/**
 * Telegram 登录数据签名校验：
 * - 按官方规范拼装 data_check_string；
 * - 使用 `sha256(bot_token)` 作为 HMAC key；
 * - 使用 timing-safe 比较，避免时序侧信道。
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

function isFreshTelegramAuthDate(authDate: number): boolean {
  const now = Math.floor(Date.now() / 1000)
  return Math.abs(now - authDate) <= TELEGRAM_WIDGET_AUTH_MAX_AGE_SECONDS
}

function computeInvitationExpiresAt(): string {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + INVITATION_TTL_DAYS)
  return expiresAt.toISOString()
}

function computeInviteLinkExpiresAt(): string {
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + INVITE_LINK_TTL_HOURS)
  return expiresAt.toISOString()
}

function mapRoleToLabel(role: MemberRole): string {
  if (role === 'owner') {
    return 'Owner'
  }
  if (role === 'admin') {
    return 'Admin'
  }
  return 'Member'
}

/**
 * Supabase 已注册账号无法重复走 `inviteUserByEmail`，
 * 需要识别该分支后改发登录链接，或者退化为“下次登录自动接收邀请”。
 */
function isExistingRegisteredUserAuthError(error: AuthOperationError | null | undefined): boolean {
  if (!error) {
    return false
  }

  if (error.code === 'user_already_exists' || error.code === 'email_exists') {
    return true
  }

  const normalizedMessage: string = error.message.trim().toLowerCase()

  return (
    normalizedMessage.includes('already been registered') ||
    normalizedMessage.includes('already registered') ||
    normalizedMessage.includes('already exists')
  )
}

/**
 * 投递成员邀请：
 * - 未注册账号继续走 Supabase invite 邮件；
 * - 已注册账号优先改发登录链接；
 * - 若登录链接也发不出去，仍保留 pending invitation，等待用户手动登录后自动接收。
 */
async function deliverMemberInvitationEmail(payload: {
  authClient: InvitationAuthClient
  email: string
  redirectTo: string
  metadata: InvitationEmailMetadata
}): Promise<InvitationDeliveryMethod> {
  const inviteResult = await payload.authClient.admin.inviteUserByEmail(payload.email, {
    redirectTo: payload.redirectTo,
    data: payload.metadata,
  })

  if (!inviteResult.error) {
    return 'invite-email'
  }

  if (!isExistingRegisteredUserAuthError(inviteResult.error)) {
    throw inviteResult.error
  }

  const magicLinkResult = await payload.authClient.signInWithOtp({
    email: payload.email,
    options: {
      emailRedirectTo: payload.redirectTo,
      shouldCreateUser: false,
      data: payload.metadata,
    },
  })

  if (!magicLinkResult.error) {
    return 'magic-link'
  }

  console.warn(
    '[member-management] 已注册成员登录链接发送失败，保留 pending invitation 等待手动登录：',
    magicLinkResult.error.message,
  )

  return 'manual-login'
}

function getMemberInvitationSuccessMessage(payload: {
  deliveryMethod: InvitationDeliveryMethod
  isResend: boolean
  roleLabel: string
}): string {
  if (payload.deliveryMethod === 'invite-email') {
    if (payload.isResend) {
      return `该邮箱已存在待处理邀请，已重发 ${payload.roleLabel} 邀请邮件。`
    }

    return `${payload.roleLabel} 邀请邮件已发送。`
  }

  if (payload.deliveryMethod === 'magic-link') {
    if (payload.isResend) {
      return `该邮箱已注册，已重发登录链接，对方登录后将以 ${payload.roleLabel} 身份加入。`
    }

    return `该邮箱已注册，已发送登录链接，对方登录后将以 ${payload.roleLabel} 身份加入。`
  }

  if (payload.isResend) {
    return `该邮箱已注册，邀请已更新，对方下次登录后将以 ${payload.roleLabel} 身份加入。`
  }

  return `该邮箱已注册，邀请已创建，对方下次登录后将以 ${payload.roleLabel} 身份加入。`
}

/**
 * 角色更新成功提示：
 * - invited / active 使用不同文案，避免用户误以为已经正式入职；
 * - 明确展示目标邮箱与目标角色，方便在多人协作场景下核对。
 */
function getMemberRoleUpdateSuccessMessage(payload: {
  memberStatus: MemberStatus
  role: Exclude<MemberRole, 'owner'>
  email: string
}): string {
  const roleLabel = mapRoleToLabel(payload.role)

  if (payload.memberStatus === 'invited') {
    return `已将 ${payload.email} 的邀请权限调整为 ${roleLabel}。`
  }

  return `已将 ${payload.email} 的角色调整为 ${roleLabel}。`
}

function getInvitationAuditReason(payload: {
  deliveryMethod: InvitationDeliveryMethod
  isResend: boolean
}): string {
  if (payload.deliveryMethod === 'invite-email') {
    return payload.isResend ? 'resent' : 'created'
  }

  if (payload.deliveryMethod === 'magic-link') {
    return payload.isResend ? 'resent-magic-link' : 'existing-user-magic-link'
  }

  return payload.isResend ? 'resent-manual-login' : 'existing-user-manual-login'
}

function isInvitationExpired(expiresAt: string, nowMs = Date.now()): boolean {
  const expiresAtTimestamp = new Date(expiresAt).getTime()

  if (Number.isNaN(expiresAtTimestamp)) {
    return false
  }

  return expiresAtTimestamp <= nowMs
}

function resolveInvitationStatus(payload: {
  status: MemberInvitationRow['status']
  expiresAt: string
  nowMs?: number
}): MemberInvitationRow['status'] | 'expired' {
  if (payload.status === 'pending' && isInvitationExpired(payload.expiresAt, payload.nowMs)) {
    return 'expired'
  }

  return payload.status
}

async function syncInvitationExpiredStatusIfNeeded(payload: {
  serviceClient: ServiceRoleSupabaseClient
  invitation: Pick<MemberInvitationRow, 'id' | 'status' | 'expires_at'>
}): Promise<MemberInvitationRow['status'] | 'expired'> {
  const resolvedStatus = resolveInvitationStatus({
    status: payload.invitation.status,
    expiresAt: payload.invitation.expires_at,
  })

  if (resolvedStatus !== 'expired' || payload.invitation.status !== 'pending') {
    return resolvedStatus
  }

  const updateResult = await payload.serviceClient
    .schema('permission')
    .from('member_invitation')
    .update({
      status: 'expired',
    })
    .eq('id', payload.invitation.id)

  if (updateResult.error) {
    throw createApiError(500, `更新邀请过期状态失败：${updateResult.error.message}`)
  }

  return 'expired'
}

async function readCompanyName(payload: {
  serviceClient: ServiceRoleSupabaseClient
  companyId: string
}): Promise<string> {
  const companyResult = await payload.serviceClient
    .from('company')
    .select('company_name')
    .eq('id', payload.companyId)
    .maybeSingle<{ company_name: string | null }>()

  if (companyResult.error) {
    throw createApiError(500, `读取公司名称失败：${companyResult.error.message}`)
  }

  return companyResult.data?.company_name?.trim() || payload.companyId
}

async function preparePendingInvitation(payload: {
  request: Request
  companyId: string
  email: string
  role: Exclude<MemberRole, 'owner'>
}): Promise<PreparedInvitation> {
  const normalizedEmail = normalizeEmail(payload.email)
  const currentUser = await requireAuthenticatedUser(payload.request)
  const actorMembership = await requireActiveOrganizationMember({
    companyId: payload.companyId,
    userId: currentUser.id,
  })

  if (actorMembership.role !== 'owner' && actorMembership.role !== 'admin') {
    throw createApiError(403, '仅 Owner/Admin 可邀请成员。')
  }

  const serviceClient = createSupabaseServiceRoleClient()

  const existedMemberResult = await serviceClient
    .schema('permission')
    .from('organization_member')
    .select('id')
    .eq('company_id', payload.companyId)
    .eq('status', 'active')
    .ilike('email', normalizedEmail)
    .maybeSingle<{ id: string }>()

  if (existedMemberResult.error) {
    throw createApiError(500, `校验成员是否存在失败：${existedMemberResult.error.message}`)
  }

  if (existedMemberResult.data) {
    throw createApiError(409, '成员已存在，无需重复邀请。')
  }

  const [quota, adminUsedResult] = await Promise.all([
    getPlanQuota(payload.companyId),
    serviceClient
      .schema('permission')
      .from('organization_member')
      .select('id', { count: 'exact', head: true })
      .eq('company_id', payload.companyId)
      .eq('status', 'active')
      .eq('role', 'admin'),
  ])

  if (adminUsedResult.error) {
    throw createApiError(500, `读取 Admin 使用量失败：${adminUsedResult.error.message}`)
  }

  const adminLimit = quota?.admin_limit ?? DEFAULT_ADMIN_LIMIT
  const adminUsed = adminUsedResult.count || 0

  if (payload.role === 'admin' && adminUsed >= adminLimit) {
    throw createApiError(409, `Admin 配额已满（${adminUsed}/${adminLimit}），请升级套餐或改邀 Member。`)
  }

  const pendingInvitationResult = await serviceClient
    .schema('permission')
    .from('member_invitation')
    .select('id, company_id, email, role, invited_by, status, expires_at, created_at')
    .eq('company_id', payload.companyId)
    .eq('status', 'pending')
    .ilike('email', normalizedEmail)
    .maybeSingle<MemberInvitationRow>()

  if (pendingInvitationResult.error) {
    throw createApiError(500, `读取待处理邀请失败：${pendingInvitationResult.error.message}`)
  }

  const invitationExpiresAt = computeInvitationExpiresAt()
  const now = new Date().toISOString()
  let invitationId = pendingInvitationResult.data?.id || ''
  const isResend = Boolean(invitationId)

  if (!invitationId) {
    const insertResult = await serviceClient
      .schema('permission')
      .from('member_invitation')
      .insert({
        company_id: payload.companyId,
        email: normalizedEmail,
        role: payload.role,
        invited_by: currentUser.id,
        status: 'pending',
        expires_at: invitationExpiresAt,
      })
      .select('id')
      .single<{ id: string }>()

    if (insertResult.error) {
      throw createApiError(500, `写入邀请记录失败：${insertResult.error.message}`)
    }

    invitationId = insertResult.data?.id || ''
    if (!invitationId) {
      throw createApiError(500, '邀请记录创建成功，但未返回 invitation_id。')
    }
  }

  const updateResult = await serviceClient
    .schema('permission')
    .from('member_invitation')
    .update({
      role: payload.role,
      invited_by: currentUser.id,
      expires_at: invitationExpiresAt,
      created_at: now,
      status: 'pending',
    })
    .eq('id', invitationId)

  if (updateResult.error) {
    throw createApiError(500, `更新邀请记录失败：${updateResult.error.message}`)
  }

  return {
    serviceClient,
    currentUser,
    invitationId,
    invitationExpiresAt,
    isResend,
  }
}

/**
 * 列表去重：
 * - 若同邮箱已经存在 active member，则不再展示残留的 pending invitation；
 * - 兼容“成员已写入成功，但旧 invitation 状态尚未来得及更新”的历史脏数据。
 */
function filterPendingInvitationsWithoutActiveMembers(
  activeMembers: OrganizationMemberRow[],
  pendingInvitations: MemberInvitationRow[],
): MemberInvitationRow[] {
  const activeMemberEmails = new Set<string>(
    activeMembers.map((member) => normalizeEmail(member.email)).filter(Boolean),
  )

  return pendingInvitations.filter(
    (invitation) =>
      resolveInvitationStatus({
        status: invitation.status,
        expiresAt: invitation.expires_at,
      }) === 'pending' && !activeMemberEmails.has(normalizeEmail(invitation.email)),
  )
}

/**
 * 邀请审计日志：
 * - 当前阶段复用服务端结构化日志输出（邀请人/角色/结果/时间）；
 * - 后续可平滑切换为落库到审计表。
 */
function writeInvitationAuditLog(payload: {
  action: 'invite' | 'remove' | 'update-role'
  companyId: string
  actorUserId: string
  targetEmail?: string
  targetMemberId?: string
  role?: string
  result: 'success' | 'failed'
  reason?: string
}): void {
  console.info(
    '[member_management_audit]',
    JSON.stringify({
      ...payload,
      at: new Date().toISOString(),
    }),
  )
}

async function parseRequestJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T
  } catch {
    throw createApiError(400, '请求体必须是合法 JSON。')
  }
}

function getBearerTokenFromRequest(request: Request): string | null {
  const authorizationHeader: string = request.headers.get('authorization')?.trim() || ''

  if (!authorizationHeader.toLowerCase().startsWith('bearer ')) {
    return null
  }

  const token = authorizationHeader.slice('bearer '.length).trim()
  return token || null
}

async function getAuthenticatedUserOrNull(request: Request): Promise<AuthenticatedUser | null> {
  const bearerToken = getBearerTokenFromRequest(request)

  if (bearerToken) {
    const serviceClient = createSupabaseServiceRoleClient()
    const {
      data: { user },
      error,
    } = await serviceClient.auth.getUser(bearerToken)

    if (!error && user?.id) {
      return {
        id: user.id,
        email: user.email || null,
      }
    }
  }

  const supabase = createSupabaseServerClientForRequest(request, new Headers())
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user?.id) {
    return null
  }

  return {
    id: user.id,
    email: user.email || null,
  }
}

/**
 * 读取当前登录用户：
 * - 优先读取 Bearer token，兼容登录回调刚落会话但 cookie 尚未回写完成的时序；
 * - 否则回退到基于请求 cookie 的 Supabase 会话；
 * - 所有成员管理写操作都必须要求已登录。
 */
async function requireAuthenticatedUser(request: Request): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUserOrNull(request)

  if (!user) {
    throw createApiError(401, '登录已失效，请重新登录后重试。')
  }

  return user
}

/**
 * 校验当前用户在目标公司中的成员身份：
 * - 读取 `permission.organization_member`；
 * - 必须是 active 成员才允许访问成员管理能力。
 */
async function requireActiveOrganizationMember(payload: {
  companyId: string
  userId: string
}): Promise<OrganizationMemberRow> {
  const serviceClient = createSupabaseServiceRoleClient()

  const membershipResult = await serviceClient
    .schema('permission')
    .from('organization_member')
    .select('id, company_id, user_id, email, role, status, joined_at, last_active_at')
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

async function getPlanQuota(companyId: string): Promise<PlanQuotaRow | null> {
  const serviceClient = createSupabaseServiceRoleClient()

  const quotaResult = await serviceClient
    .schema('permission')
    .from('plan_quota')
    .select('company_id, admin_limit, member_limit')
    .eq('company_id', companyId)
    .maybeSingle<PlanQuotaRow>()

  if (quotaResult.error) {
    throw createApiError(500, `读取套餐配额失败：${quotaResult.error.message}`)
  }

  return quotaResult.data
}

/**
 * 成员显示名兜底策略：
 * - 优先使用 `account.company_user_profile.display_name`；
 * - 未配置时回退邮箱前缀，保证列表始终有可读名称。
 */
function resolveMemberDisplayName(email: string, profileDisplayName: string | null | undefined): string {
  const normalizedProfileName = (profileDisplayName || '').trim()
  if (normalizedProfileName) {
    return normalizedProfileName
  }

  const localPart = email.split('@')[0]?.trim() || ''
  if (localPart) {
    return localPart
  }

  return email
}

async function listMemberSnapshot(payload: {
  companyId: string
  actorUserId: string
  actorRole: CompanyRole
}): Promise<SnapshotResponse> {
  const serviceClient = createSupabaseServiceRoleClient()

  const [memberResult, invitationResult, quota] = await Promise.all([
    serviceClient
      .schema('permission')
      .from('organization_member')
      .select('id, company_id, user_id, email, role, status, joined_at, last_active_at')
      .eq('company_id', payload.companyId)
      .eq('status', 'active')
      .order('joined_at', { ascending: true }),
    serviceClient
      .schema('permission')
      .from('member_invitation')
      .select('id, company_id, email, role, invited_by, status, expires_at, created_at')
      .eq('company_id', payload.companyId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false }),
    getPlanQuota(payload.companyId),
  ])

  if (memberResult.error) {
    throw createApiError(500, `读取成员列表失败：${memberResult.error.message}`)
  }

  if (invitationResult.error) {
    throw createApiError(500, `读取邀请列表失败：${invitationResult.error.message}`)
  }

  const activeMembers: OrganizationMemberRow[] = (memberResult.data || []) as OrganizationMemberRow[]
  const rawPendingInvitations: MemberInvitationRow[] =
    (invitationResult.data || []) as MemberInvitationRow[]
  const pendingInvitations = filterPendingInvitationsWithoutActiveMembers(
    activeMembers,
    rawPendingInvitations,
  )

  const memberIds = activeMembers.map((member) => member.id)
  const activeMemberUserIds = Array.from(new Set(activeMembers.map((member) => member.user_id).filter(Boolean)))
  const profileByUserId = new Map<string, CompanyUserProfileRow>()
  const bindingsByMemberId = new Map<string, PlatformType[]>()

  if (memberIds.length > 0) {
    const bindingResult = await serviceClient
      .schema('permission')
      .from('member_account_binding')
      .select('member_id, platform')
      .in('member_id', memberIds)

    if (bindingResult.error) {
      throw createApiError(500, `读取成员账号绑定信息失败：${bindingResult.error.message}`)
    }

    const bindings: MemberAccountBindingRow[] = (bindingResult.data || []) as MemberAccountBindingRow[]

    bindings.forEach((binding) => {
      const list = bindingsByMemberId.get(binding.member_id) || []
      list.push(binding.platform)
      bindingsByMemberId.set(binding.member_id, list)
    })
  }

  if (activeMemberUserIds.length > 0) {
    const profileResult = await serviceClient
      .schema('account')
      .from('company_user_profile')
      .select('company_id, user_id, display_name, avatar_url')
      .eq('company_id', payload.companyId)
      .in('user_id', activeMemberUserIds)

    if (profileResult.error) {
      throw createApiError(500, `读取成员资料失败：${profileResult.error.message}`)
    }

    const profileRows: CompanyUserProfileRow[] = (profileResult.data || []) as CompanyUserProfileRow[]
    profileRows.forEach((profileRow) => {
      profileByUserId.set(profileRow.user_id, profileRow)
    })
  }

  const mappedActiveMembers: SnapshotMember[] = activeMembers.map((member) => {
    const linkedAccounts = bindingsByMemberId.get(member.id) || []
    const requiresAccountBinding =
      (member.role === 'owner' || member.role === 'admin') && linkedAccounts.length === 0
    const profileRow = profileByUserId.get(member.user_id)

    return {
      id: member.id,
      email: member.email,
      displayName: resolveMemberDisplayName(member.email, profileRow?.display_name),
      avatarUrl: profileRow?.avatar_url || null,
      role: member.role,
      linkedAccounts,
      joinedAt: member.joined_at,
      recentActivityAt: member.last_active_at || null,
      status: 'active',
      isCurrentUser: member.user_id === payload.actorUserId,
      requiresAccountBinding,
    }
  })

  const mappedInvitations: SnapshotMember[] = pendingInvitations.map((invitation) => ({
    id: invitation.id,
    email: invitation.email,
    displayName: resolveMemberDisplayName(invitation.email, null),
    avatarUrl: null,
    role: invitation.role,
    linkedAccounts: [],
    joinedAt: invitation.created_at,
    recentActivityAt: null,
    status: 'invited',
    isCurrentUser: false,
    requiresAccountBinding: invitation.role === 'admin',
  }))

  const adminUsed = mappedActiveMembers.filter(
    (member) => member.status === 'active' && member.role === 'admin',
  ).length

  const memberUsed = mappedActiveMembers.filter((member) => member.status === 'active').length

  const adminLimit = quota?.admin_limit ?? DEFAULT_ADMIN_LIMIT
  const memberLimit = quota?.member_limit ?? DEFAULT_MEMBER_LIMIT

  return {
    currentUserRole: payload.actorRole,
    adminLimit,
    memberLimit,
    adminUsed,
    memberUsed,
    members: [...mappedActiveMembers, ...mappedInvitations],
  }
}

/**
 * 绑定账号写入（通用）：
 * - 先校验同平台账号是否已被其他成员占用；
 * - 再对 member_id + platform 做幂等 upsert。
 */
async function upsertMemberAccountBinding(payload: {
  memberId: string
  platform: OauthBindingPlatform
  externalAccountId: string
  externalDisplay: string | null
}): Promise<void> {
  const serviceClient = createSupabaseServiceRoleClient()

  const conflictBindingResult = await serviceClient
    .schema('permission')
    .from('member_account_binding')
    .select('member_id, platform, external_account_id')
    .eq('platform', payload.platform)
    .eq('external_account_id', payload.externalAccountId)
    .maybeSingle<MemberAccountBindingRow>()

  if (conflictBindingResult.error) {
    throw createApiError(500, `校验账号占用失败：${conflictBindingResult.error.message}`)
  }

  if (conflictBindingResult.data && conflictBindingResult.data.member_id !== payload.memberId) {
    throw createApiError(409, '该平台账号已绑定其他成员，请先解绑后再重试。')
  }

  const upsertBindingResult = await serviceClient
    .schema('permission')
    .from('member_account_binding')
    .upsert(
      {
        member_id: payload.memberId,
        platform: payload.platform,
        external_account_id: payload.externalAccountId,
        external_display: payload.externalDisplay,
      },
      {
        onConflict: 'member_id,platform',
      },
    )

  if (upsertBindingResult.error) {
    throw createApiError(500, `绑定账号失败：${upsertBindingResult.error.message}`)
  }
}

/**
 * 解析 OAuth callback 参数：
 * - 默认读取 query string；
 * - 兼容飞书可能以 POST 表单回调的场景。
 */
async function parseOauthCallbackParams(request: Request): Promise<{
  code: string
  stateToken: string
}> {
  const requestUrl = new URL(request.url)
  const queryCode = requestUrl.searchParams.get('code')?.trim() || ''
  const queryState = requestUrl.searchParams.get('state')?.trim() || ''

  if (request.method.toUpperCase() !== 'POST') {
    return {
      code: queryCode,
      stateToken: queryState,
    }
  }

  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const formData = await request.formData().catch(() => null)
    return {
      code: String(formData?.get('code') || queryCode).trim(),
      stateToken: String(formData?.get('state') || queryState).trim(),
    }
  }

  if (contentType.includes('application/json')) {
    const body = (await request.json().catch(() => null)) as { code?: string; state?: string } | null
    return {
      code: String(body?.code || queryCode).trim(),
      stateToken: String(body?.state || queryState).trim(),
    }
  }

  return {
    code: queryCode,
    stateToken: queryState,
  }
}

/**
 * 使用 Discord code 交换用户身份：
 * - 先换 access_token，再拉取 `/users/@me`；
 * - 外部账号主键使用 Discord user id。
 */
async function exchangeDiscordCodeForUser(payload: {
  env: DiscordOauthServerEnv
  code: string
}): Promise<{ externalAccountId: string; externalDisplay: string | null }> {
  const tokenRequestBody = new URLSearchParams({
    client_id: payload.env.clientId,
    client_secret: payload.env.clientSecret,
    grant_type: 'authorization_code',
    code: payload.code,
    redirect_uri: payload.env.redirectUri,
  })

  const tokenResponse = await fetch(payload.env.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: tokenRequestBody.toString(),
    cache: 'no-store',
  })

  const tokenPayload = (await tokenResponse.json().catch(() => null)) as DiscordOauthTokenResponse | null
  if (!tokenResponse.ok || !tokenPayload) {
    throw createApiError(502, 'Discord token 接口请求失败。')
  }

  if (tokenPayload.error || !tokenPayload.access_token) {
    throw createApiError(502, tokenPayload.error_description || tokenPayload.error || 'Discord token 返回错误。')
  }

  const userInfoResponse = await fetch(payload.env.userInfoUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenPayload.access_token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    cache: 'no-store',
  })

  const userInfoPayload = (await userInfoResponse.json().catch(() => null)) as DiscordOauthUserInfoResponse | null
  if (!userInfoResponse.ok || !userInfoPayload) {
    throw createApiError(502, 'Discord 用户信息接口请求失败。')
  }

  const externalAccountId = String(userInfoPayload.id || '').trim()
  if (!isDiscordUserId(externalAccountId)) {
    throw createApiError(502, 'Discord 用户信息缺少有效用户 ID。')
  }

  const normalizedUsername = String(userInfoPayload.username || '').trim()
  const normalizedDiscriminator = String(userInfoPayload.discriminator || '').trim()
  const externalDisplay =
    String(userInfoPayload.global_name || '').trim() ||
    (normalizedUsername
      ? `${normalizedUsername}${normalizedDiscriminator && normalizedDiscriminator !== '0' ? `#${normalizedDiscriminator}` : ''}`
      : externalAccountId)

  return {
    externalAccountId,
    externalDisplay,
  }
}

/**
 * 使用 Slack code 交换用户身份：
 * - OAuth v2 返回 `authed_user.id`；
 * - 若缺失则回退调用 `auth.test` 读取 user_id。
 */
async function exchangeSlackCodeForUser(payload: {
  env: SlackOauthServerEnv
  code: string
}): Promise<{ externalAccountId: string; externalDisplay: string | null }> {
  const tokenRequestBody = new URLSearchParams({
    client_id: payload.env.clientId,
    client_secret: payload.env.clientSecret,
    code: payload.code,
    redirect_uri: payload.env.redirectUri,
    grant_type: 'authorization_code',
  })

  const tokenResponse = await fetch(payload.env.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: tokenRequestBody.toString(),
    cache: 'no-store',
  })

  const tokenPayload = (await tokenResponse.json().catch(() => null)) as SlackOauthTokenResponse | null
  if (!tokenResponse.ok || !tokenPayload) {
    throw createApiError(502, 'Slack token 接口请求失败。')
  }

  if (tokenPayload.ok === false || tokenPayload.error) {
    throw createApiError(502, `Slack token 返回错误：${tokenPayload.error || 'unknown_error'}`)
  }

  let externalAccountId = String(tokenPayload.authed_user?.id || '').trim()
  const authTestAccessToken =
    String(tokenPayload.authed_user?.access_token || '').trim() || String(tokenPayload.access_token || '').trim()
  let externalDisplay: string | null = externalAccountId || null

  if ((!externalAccountId || !externalDisplay) && authTestAccessToken) {
    const authTestResponse = await fetch(payload.env.authTestUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authTestAccessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: '',
      cache: 'no-store',
    })

    const authTestPayload = (await authTestResponse.json().catch(() => null)) as SlackAuthTestResponse | null
    if (!authTestResponse.ok || !authTestPayload) {
      throw createApiError(502, 'Slack auth.test 接口请求失败。')
    }

    if (authTestPayload.ok === false || authTestPayload.error) {
      throw createApiError(502, `Slack auth.test 返回错误：${authTestPayload.error || 'unknown_error'}`)
    }

    externalAccountId = externalAccountId || String(authTestPayload.user_id || '').trim()
    externalDisplay = externalDisplay || String(authTestPayload.user || '').trim() || null
  }

  if (!externalAccountId) {
    throw createApiError(502, 'Slack OAuth 返回中缺少用户标识。')
  }

  return {
    externalAccountId,
    externalDisplay: externalDisplay || externalAccountId,
  }
}

/**
 * 使用飞书 code 交换用户身份：
 * - authen/v2/oauth/token 获取 access_token；
 * - authen/v1/user_info 获取 open_id，并作为后续 @ 通知的目标 ID。
 */
async function exchangeFeishuCodeForUser(payload: {
  env: FeishuOauthServerEnv & {
    appId: string
    appSecret: string
  }
  code: string
}): Promise<{ externalAccountId: string; externalDisplay: string | null }> {
  const tokenResponse = await fetch(payload.env.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: payload.env.appId,
      client_secret: payload.env.appSecret,
      code: payload.code,
      redirect_uri: payload.env.redirectUri,
    }),
    cache: 'no-store',
  })

  const tokenPayload = (await tokenResponse.json().catch(() => null)) as FeishuOauthTokenResponse | null
  if (!tokenResponse.ok || !tokenPayload) {
    throw createApiError(502, '飞书 token 接口请求失败。')
  }

  if (typeof tokenPayload.code === 'number' && tokenPayload.code !== 0) {
    throw createApiError(502, tokenPayload.msg || tokenPayload.message || '飞书 token 返回错误。')
  }

  const accessToken = String(tokenPayload.data?.access_token || tokenPayload.access_token || '').trim()
  if (!accessToken) {
    throw createApiError(502, '飞书 token 响应缺少 access_token。')
  }

  const userInfoResponse = await fetch(payload.env.userInfoUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    cache: 'no-store',
  })

  const userInfoPayload = (await userInfoResponse.json().catch(() => null)) as FeishuUserInfoResponse | null
  if (!userInfoResponse.ok || !userInfoPayload) {
    throw createApiError(502, '飞书 user_info 接口请求失败。')
  }

  if (typeof userInfoPayload.code === 'number' && userInfoPayload.code !== 0) {
    throw createApiError(502, userInfoPayload.msg || userInfoPayload.message || '飞书 user_info 返回错误。')
  }

  const userData = userInfoPayload.data || userInfoPayload.user
  return resolveFeishuUserInfoForBinding(userData)
}

/**
 * 解析飞书 OAuth 用户信息：
 * - 负责人飞书通知最终会把 `member_account_binding.external_account_id` 写入
 *   `event_notification_target.target`；
 * - 飞书群 @ 需要使用 `open_id`，因此这里必须稳定产出 `open_id`，不能再回退到 `user_id`。
 */
function resolveFeishuUserInfoForBinding(
  userData: FeishuOauthUserInfo | null | undefined,
): { externalAccountId: string; externalDisplay: string | null } {
  const openId = String(userData?.open_id || '').trim()
  if (!openId) {
    throw createApiError(502, '飞书 user_info 响应缺少 open_id，无法完成账号绑定。')
  }

  const externalDisplay = String(userData?.name || userData?.en_name || '').trim() || openId
  return {
    externalAccountId: openId,
    externalDisplay,
  }
}

/**
 * 创建 OAuth 授权 URL：
 * - 成员在 Profile 分区发起个人账号绑定；
 * - 服务端写入 state，callback 后再落 `member_account_binding`。
 */
async function handleCreateOauthLinkUrl(request: Request): Promise<Response> {
  const body = await parseRequestJson<{
    companyId?: string
    platform?: string
  }>(request)

  const companyId = body.companyId?.trim() || ''
  const rawPlatform = body.platform?.trim() || ''
  ensureValidCompanyId(companyId)

  if (!ensureValidOauthBindingPlatform(rawPlatform)) {
    throw createApiError(400, 'platform 非法，当前仅支持 discord/slack/feishu。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  const nowSeconds = Math.floor(Date.now() / 1000)
  let integrationSecret = ''
  let authorizeUrl = new URL('https://example.com')
  let feishuBotAppId: string | null = null

  if (rawPlatform === 'discord') {
    const env = getDiscordOauthServerEnvOrNull(request)
    if (!env) {
      throw createApiError(503, '服务端未配置 Discord OAuth 绑定环境变量。')
    }

    integrationSecret = env.integrationSecret
    authorizeUrl = new URL(env.authorizeUrl)
    authorizeUrl.searchParams.set('client_id', env.clientId)
    authorizeUrl.searchParams.set('scope', env.scope)
    authorizeUrl.searchParams.set('response_type', 'code')
    authorizeUrl.searchParams.set('redirect_uri', env.redirectUri)
  }

  if (rawPlatform === 'slack') {
    const env = getSlackOauthServerEnvOrNull(request)
    if (!env) {
      throw createApiError(503, '服务端未配置 Slack OAuth 绑定环境变量。')
    }

    integrationSecret = env.integrationSecret
    authorizeUrl = new URL(env.authorizeUrl)
    authorizeUrl.searchParams.set('client_id', env.clientId)
    authorizeUrl.searchParams.set('redirect_uri', env.redirectUri)
    authorizeUrl.searchParams.set('user_scope', env.userScope)
    if (env.scope) {
      authorizeUrl.searchParams.set('scope', env.scope)
    }
  }

  if (rawPlatform === 'feishu') {
    const env = getFeishuOauthServerEnvOrNull(request)
    if (!env) {
      throw createApiError(503, '服务端未配置飞书 OAuth 绑定基础环境变量。')
    }

    const resolvedBotContext = await resolveFeishuOauthBotContext({
      companyId,
    })

    integrationSecret = env.integrationSecret
    authorizeUrl = new URL(env.authorizeUrl)
    authorizeUrl.searchParams.set('app_id', resolvedBotContext.appId)
    authorizeUrl.searchParams.set('redirect_uri', env.redirectUri)
    authorizeUrl.searchParams.set('response_type', 'code')
    feishuBotAppId = resolvedBotContext.botAppId
  }

  const stateToken = createOauthBindingStateToken(
    {
      companyId,
      userId: currentUser.id,
      platform: rawPlatform,
      iat: nowSeconds,
      exp: nowSeconds + OAUTH_BINDING_STATE_TTL_SECONDS,
      nonce: randomBytes(12).toString('hex'),
      feishuBotAppId,
    },
    integrationSecret,
  )

  authorizeUrl.searchParams.set('state', stateToken)
  return jsonResponse({
    authorizeUrl: authorizeUrl.toString(),
  })
}

/**
 * Discord OAuth 回调：
 * - 校验 state 与当前登录用户；
 * - 获取用户 ID 后写入 `member_account_binding`。
 */
async function handleDiscordOauthCallback(request: Request): Promise<Response> {
  const env = getDiscordOauthServerEnvOrNull(request)
  if (!env) {
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: null,
        platform: 'discord',
        status: 'error',
        message: '服务端未配置 Discord OAuth 绑定环境变量。',
      }),
      302,
    )
  }

  const { code, stateToken } = await parseOauthCallbackParams(request)
  if (!code || !stateToken) {
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: null,
        platform: 'discord',
        status: 'error',
        message: 'Discord 回调参数缺失，请重新发起绑定。',
      }),
      302,
    )
  }

  const parsedState = verifyOauthBindingStateToken(stateToken, env.integrationSecret, 'discord')
  if (!parsedState || !isUuid(parsedState.companyId)) {
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: null,
        platform: 'discord',
        status: 'error',
        message: 'Discord 绑定 state 校验失败或已过期，请重新发起绑定。',
      }),
      302,
    )
  }

  let failureStep = 'requireAuthenticatedUser'
  let currentUserId: string | null = null

  try {
    failureStep = 'requireAuthenticatedUser'
    const currentUser = await requireAuthenticatedUser(request)
    currentUserId = currentUser.id

    failureStep = 'validateCurrentUserMatchesState'
    if (currentUser.id !== parsedState.userId) {
      throw createApiError(403, '当前登录用户与绑定发起用户不一致，请重新发起绑定。')
    }

    failureStep = 'requireActiveOrganizationMember'
    const actorMembership = await requireActiveOrganizationMember({
      companyId: parsedState.companyId,
      userId: currentUser.id,
    })

    failureStep = 'exchangeDiscordCodeForUser'
    const resolvedUser = await exchangeDiscordCodeForUser({
      env,
      code,
    })

    failureStep = 'upsertMemberAccountBinding'
    await upsertMemberAccountBinding({
      memberId: actorMembership.id,
      platform: 'discord',
      externalAccountId: resolvedUser.externalAccountId,
      externalDisplay: resolvedUser.externalDisplay,
    })

    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: parsedState.companyId,
        platform: 'discord',
        status: 'success',
        message: 'Discord 账号已绑定。',
      }),
      302,
    )
  } catch (error) {
    logOauthBindingCallbackFailure({
      platform: 'discord',
      request,
      companyId: parsedState.companyId,
      stateUserId: parsedState.userId,
      currentUserId,
      failureStep,
      error,
    })

    const message = getErrorMessageFromUnknown(error, 'Discord 账号绑定失败。')
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: parsedState.companyId,
        platform: 'discord',
        status: 'error',
        message,
      }),
      302,
    )
  }
}

/**
 * Slack OAuth 回调：
 * - 校验 state 与当前登录用户；
 * - 使用 OAuth 返回用户标识完成账号绑定。
 */
async function handleSlackOauthCallback(request: Request): Promise<Response> {
  const env = getSlackOauthServerEnvOrNull(request)
  if (!env) {
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: null,
        platform: 'slack',
        status: 'error',
        message: '服务端未配置 Slack OAuth 绑定环境变量。',
      }),
      302,
    )
  }

  const { code, stateToken } = await parseOauthCallbackParams(request)
  if (!code || !stateToken) {
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: null,
        platform: 'slack',
        status: 'error',
        message: 'Slack 回调参数缺失，请重新发起绑定。',
      }),
      302,
    )
  }

  const parsedState = verifyOauthBindingStateToken(stateToken, env.integrationSecret, 'slack')
  if (!parsedState || !isUuid(parsedState.companyId)) {
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: null,
        platform: 'slack',
        status: 'error',
        message: 'Slack 绑定 state 校验失败或已过期，请重新发起绑定。',
      }),
      302,
    )
  }

  let failureStep = 'requireAuthenticatedUser'
  let currentUserId: string | null = null

  try {
    failureStep = 'requireAuthenticatedUser'
    const currentUser = await requireAuthenticatedUser(request)
    currentUserId = currentUser.id

    failureStep = 'validateCurrentUserMatchesState'
    if (currentUser.id !== parsedState.userId) {
      throw createApiError(403, '当前登录用户与绑定发起用户不一致，请重新发起绑定。')
    }

    failureStep = 'requireActiveOrganizationMember'
    const actorMembership = await requireActiveOrganizationMember({
      companyId: parsedState.companyId,
      userId: currentUser.id,
    })

    failureStep = 'exchangeSlackCodeForUser'
    const resolvedUser = await exchangeSlackCodeForUser({
      env,
      code,
    })

    failureStep = 'upsertMemberAccountBinding'
    await upsertMemberAccountBinding({
      memberId: actorMembership.id,
      platform: 'slack',
      externalAccountId: resolvedUser.externalAccountId,
      externalDisplay: resolvedUser.externalDisplay,
    })

    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: parsedState.companyId,
        platform: 'slack',
        status: 'success',
        message: 'Slack 账号已绑定。',
      }),
      302,
    )
  } catch (error) {
    logOauthBindingCallbackFailure({
      platform: 'slack',
      request,
      companyId: parsedState.companyId,
      stateUserId: parsedState.userId,
      currentUserId,
      failureStep,
      error,
    })

    const message = getErrorMessageFromUnknown(error, 'Slack 账号绑定失败。')
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: parsedState.companyId,
        platform: 'slack',
        status: 'error',
        message,
      }),
      302,
    )
  }
}

/**
 * 飞书 OAuth 回调：
 * - 同时兼容 GET / POST 回调参数；
 * - 获取 user_info 后自动完成成员账号绑定。
 */
async function handleFeishuOauthCallback(request: Request): Promise<Response> {
  const env = getFeishuOauthServerEnvOrNull(request)
  if (!env) {
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: null,
        platform: 'feishu',
        status: 'error',
        message: '服务端未配置飞书 OAuth 绑定基础环境变量。',
      }),
      302,
    )
  }

  const { code, stateToken } = await parseOauthCallbackParams(request)
  if (!code || !stateToken) {
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: null,
        platform: 'feishu',
        status: 'error',
        message: '飞书回调参数缺失，请重新发起绑定。',
      }),
      302,
    )
  }

  const parsedState = verifyOauthBindingStateToken(stateToken, env.integrationSecret, 'feishu')
  if (!parsedState || !isUuid(parsedState.companyId)) {
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: null,
        platform: 'feishu',
        status: 'error',
        message: '飞书绑定 state 校验失败或已过期，请重新发起绑定。',
      }),
      302,
    )
  }

  let failureStep = 'requireAuthenticatedUser'
  let currentUserId: string | null = null

  try {
    failureStep = 'requireAuthenticatedUser'
    const currentUser = await requireAuthenticatedUser(request)
    currentUserId = currentUser.id

    failureStep = 'validateCurrentUserMatchesState'
    if (currentUser.id !== parsedState.userId) {
      throw createApiError(403, '当前登录用户与绑定发起用户不一致，请重新发起绑定。')
    }

    failureStep = 'requireActiveOrganizationMember'
    const actorMembership = await requireActiveOrganizationMember({
      companyId: parsedState.companyId,
      userId: currentUser.id,
    })

    failureStep = 'resolveFeishuOauthBotContext'
    const resolvedBotContext = await resolveFeishuOauthBotContext({
      companyId: parsedState.companyId,
      botAppId: parsedState.feishuBotAppId || null,
      preferLegacyWhenBotIdMissing: true,
    })

    failureStep = 'exchangeFeishuCodeForUser'
    const resolvedUser = await exchangeFeishuCodeForUser({
      env: {
        ...env,
        appId: resolvedBotContext.appId,
        appSecret: resolvedBotContext.appSecret,
      },
      code,
    })

    failureStep = 'upsertMemberAccountBinding'
    await upsertMemberAccountBinding({
      memberId: actorMembership.id,
      platform: 'feishu',
      externalAccountId: resolvedUser.externalAccountId,
      externalDisplay: resolvedUser.externalDisplay,
    })

    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: parsedState.companyId,
        platform: 'feishu',
        status: 'success',
        message: '飞书账号已绑定。',
      }),
      302,
    )
  } catch (error) {
    logOauthBindingCallbackFailure({
      platform: 'feishu',
      request,
      companyId: parsedState.companyId,
      stateUserId: parsedState.userId,
      currentUserId,
      failureStep,
      error,
    })

    const message = getErrorMessageFromUnknown(error, '飞书账号绑定失败。')
    return Response.redirect(
      buildMemberBindingSettingsRedirectUrl({
        request,
        companyId: parsedState.companyId,
        platform: 'feishu',
        status: 'error',
        message,
      }),
      302,
    )
  }
}

async function handleGetSnapshot(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const companyId = requestUrl.searchParams.get('company_id')?.trim() || ''

  ensureValidCompanyId(companyId)

  const currentUser = await requireAuthenticatedUser(request)
  const actorMembership = await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  const snapshot = await listMemberSnapshot({
    companyId,
    actorUserId: currentUser.id,
    actorRole: actorMembership.role,
  })

  return jsonResponse(snapshot)
}

/**
 * 邀请成员核心流程：
 * 1. 校验当前操作者角色（owner/admin）；
 * 2. 校验邮箱与角色合法性；
 * 3. 校验成员是否已存在、Admin 配额是否超限；
 * 4. 先写 invitation(pending)，再根据账号状态发送邀请邮件或登录链接；
 * 5. 仅在邀请与兜底通知都不可用时将 invitation 标记为 failed。
 */
async function handleInviteMember(request: Request): Promise<Response> {
  const body = await parseRequestJson<{
    companyId?: string
    email?: string
    role?: string
  }>(request)

  const companyId = body.companyId?.trim() || ''
  const normalizedEmail = normalizeEmail(body.email || '')
  const role = body.role?.trim() || ''

  ensureValidCompanyId(companyId)

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw createApiError(400, '请输入合法邮箱地址。')
  }

  if (!ensureValidInvitationRole(role)) {
    throw createApiError(400, '邀请角色仅支持 Admin 或 Member。')
  }

  const preparedInvitation = await preparePendingInvitation({
    request,
    companyId,
    email: normalizedEmail,
    role,
  })

  const redirectTo = `${resolveAppOrigin(request)}/auth/callback`
  const invitationMetadata: InvitationEmailMetadata = {
    company_id: companyId,
    invitation_id: preparedInvitation.invitationId,
    invited_role: role,
    invited_by: preparedInvitation.currentUser.id,
  }

  let deliveryMethod: InvitationDeliveryMethod

  try {
    deliveryMethod = await deliverMemberInvitationEmail({
      authClient: preparedInvitation.serviceClient.auth,
      email: normalizedEmail,
      redirectTo,
      metadata: invitationMetadata,
    })
  } catch (error) {
    const deliveryErrorMessage: string =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : 'unknown error'

    await preparedInvitation.serviceClient
      .schema('permission')
      .from('member_invitation')
      .update({
        status: 'failed',
      })
      .eq('id', preparedInvitation.invitationId)

    writeInvitationAuditLog({
      action: 'invite',
      companyId,
      actorUserId: preparedInvitation.currentUser.id,
      targetEmail: normalizedEmail,
      role,
      result: 'failed',
      reason: deliveryErrorMessage,
    })

    throw createApiError(502, `邀请邮件发送失败：${deliveryErrorMessage}`)
  }

  writeInvitationAuditLog({
    action: 'invite',
    companyId,
    actorUserId: preparedInvitation.currentUser.id,
    targetEmail: normalizedEmail,
    role,
    result: 'success',
    reason: getInvitationAuditReason({
      deliveryMethod,
      isResend: preparedInvitation.isResend,
    }),
  })

  const roleLabel = mapRoleToLabel(role)
  return jsonResponse({
    message: getMemberInvitationSuccessMessage({
      deliveryMethod,
      isResend: preparedInvitation.isResend,
      roleLabel,
    }),
  })
}

async function resolveInviteLinkContext(token: string): Promise<{
  serviceClient: ServiceRoleSupabaseClient
  inviteLinkPayload: InviteLinkTokenPayload
  status: 'active' | 'expired'
}> {
  const normalizedToken = token.trim()
  if (!normalizedToken) {
    throw createApiError(400, '邀请链接缺少 token。')
  }

  const verifiedPayload = verifyInviteLinkToken(normalizedToken, getInviteLinkSecret())
  if (!verifiedPayload) {
    throw createApiError(400, '邀请链接无效。')
  }

  const nowSeconds = Math.floor(Date.now() / 1000)

  return {
    serviceClient: createSupabaseServiceRoleClient(),
    inviteLinkPayload: verifiedPayload,
    status: verifiedPayload.exp <= nowSeconds ? 'expired' : 'active',
  }
}

async function acceptInvitationForUser(payload: {
  serviceClient: ServiceRoleSupabaseClient
  invitation: MemberInvitationRow
  currentUser: AuthenticatedUser
  normalizedUserEmail: string
}): Promise<'created-member' | 'already-member'> {
  const membershipState = await resolveJoinableOrganizationMemberState({
    serviceClient: payload.serviceClient,
    companyId: payload.invitation.company_id,
    currentUser: payload.currentUser,
    normalizedUserEmail: payload.normalizedUserEmail,
  })

  let acceptResult: 'created-member' | 'already-member' = 'already-member'

  if (membershipState.kind === 'activate-existing') {
    await activateOrganizationMember({
      serviceClient: payload.serviceClient,
      memberId: membershipState.member.id,
      currentUser: payload.currentUser,
      normalizedUserEmail: payload.normalizedUserEmail,
      role: payload.invitation.role,
    })
    acceptResult = 'created-member'
  }

  if (membershipState.kind === 'insert-new') {
    await insertOrganizationMember({
      serviceClient: payload.serviceClient,
      companyId: payload.invitation.company_id,
      currentUser: payload.currentUser,
      normalizedUserEmail: payload.normalizedUserEmail,
      role: payload.invitation.role,
    })
    acceptResult = 'created-member'
  }

  const markAcceptedResult = await payload.serviceClient
    .schema('permission')
    .from('member_invitation')
    .update({
      status: 'accepted',
    })
    .eq('id', payload.invitation.id)

  if (markAcceptedResult.error) {
    throw createApiError(500, `更新邀请状态失败：${markAcceptedResult.error.message}`)
  }

  return acceptResult
}

/**
 * 解析“当前账号是否可在目标组织生效”为哪种写入动作：
 * - 先看同一 `company + user_id` 是否已有成员记录；
 * - 再看同一 `company + email` 是否已有残留成员记录；
 * - 若同邮箱记录绑定到了别的账号，必须显式报错，不能再把唯一键冲突误判为“已加入”。
 */
async function resolveJoinableOrganizationMemberState(payload: {
  serviceClient: ServiceRoleSupabaseClient
  companyId: string
  currentUser: AuthenticatedUser
  normalizedUserEmail: string
}): Promise<JoinableOrganizationMemberState> {
  const [memberByUserResult, memberByEmailResult] = await Promise.all([
    payload.serviceClient
      .schema('permission')
      .from('organization_member')
      .select('id, company_id, user_id, email, role, status, joined_at, last_active_at')
      .eq('company_id', payload.companyId)
      .eq('user_id', payload.currentUser.id)
      .maybeSingle<OrganizationMemberRow>(),
    payload.serviceClient
      .schema('permission')
      .from('organization_member')
      .select('id, company_id, user_id, email, role, status, joined_at, last_active_at')
      .eq('company_id', payload.companyId)
      .ilike('email', payload.normalizedUserEmail)
      .maybeSingle<OrganizationMemberRow>(),
  ])

  if (memberByUserResult.error) {
    throw createApiError(500, `读取当前账号成员状态失败：${memberByUserResult.error.message}`)
  }

  if (memberByEmailResult.error) {
    throw createApiError(500, `读取同邮箱成员状态失败：${memberByEmailResult.error.message}`)
  }

  const memberByUser = memberByUserResult.data || null
  const memberByEmail = memberByEmailResult.data || null

  /**
   * 同一账号已有成员记录时，以它为准：
   * - active 直接视为已加入；
   * - inactive 允许重新激活；
   * - 但如果当前邮箱已经被另一条成员记录占用，必须阻止，避免把 user_id 换绑到错误人身上。
   */
  if (memberByUser?.id) {
    if (memberByEmail?.id && memberByEmail.id !== memberByUser.id) {
      throw createApiError(409, '当前组织已存在同邮箱成员记录，但绑定的是其他账号，请联系管理员清理旧成员后再重试。')
    }

    return memberByUser.status === 'active'
      ? {
          kind: 'already-member',
          member: memberByUser,
        }
      : {
          kind: 'activate-existing',
          member: memberByUser,
        }
  }

  if (!memberByEmail?.id) {
    return {
      kind: 'insert-new',
    }
  }

  if (memberByEmail.user_id !== payload.currentUser.id) {
    throw createApiError(409, '当前组织已存在同邮箱成员记录，但绑定的是其他账号，请联系管理员清理旧成员后再重试。')
  }

  return memberByEmail.status === 'active'
    ? {
        kind: 'already-member',
        member: memberByEmail,
      }
    : {
        kind: 'activate-existing',
        member: memberByEmail,
      }
}

/**
 * 重新激活现有成员记录：
 * - 仅在已确认是“同一账号 / 同一邮箱”的旧记录时执行；
 * - 统一回写最新邮箱、角色与 joined_at，避免后续页面继续读到历史残留状态。
 */
async function activateOrganizationMember(payload: {
  serviceClient: ServiceRoleSupabaseClient
  memberId: string
  currentUser: AuthenticatedUser
  normalizedUserEmail: string
  role: Exclude<MemberRole, 'owner'>
}): Promise<void> {
  const reactivateResult = await payload.serviceClient
    .schema('permission')
    .from('organization_member')
    .update({
      user_id: payload.currentUser.id,
      email: payload.normalizedUserEmail,
      role: payload.role,
      status: 'active',
      joined_at: new Date().toISOString(),
    })
    .eq('id', payload.memberId)

  if (reactivateResult.error) {
    throw createApiError(500, `激活成员记录失败：${reactivateResult.error.message}`)
  }
}

/**
 * 写入全新的 active 成员记录：
 * - 仅在确认当前 `company + user_id`、`company + email` 都不存在时执行；
 * - 这里不再吞掉唯一键冲突，避免出现“接口成功、但成员其实没落库”的假成功。
 */
async function insertOrganizationMember(payload: {
  serviceClient: ServiceRoleSupabaseClient
  companyId: string
  currentUser: AuthenticatedUser
  normalizedUserEmail: string
  role: Exclude<MemberRole, 'owner'>
}): Promise<void> {
  const insertMemberResult = await payload.serviceClient
    .schema('permission')
    .from('organization_member')
    .insert({
      company_id: payload.companyId,
      user_id: payload.currentUser.id,
      email: payload.normalizedUserEmail,
      role: payload.role,
      status: 'active',
      joined_at: new Date().toISOString(),
    })

  if (insertMemberResult.error) {
    throw createApiError(500, `写入正式成员失败：${insertMemberResult.error.message}`)
  }
}

async function ensureInviteLinkJoinable(payload: {
  serviceClient: ServiceRoleSupabaseClient
  companyId: string
  role: Exclude<MemberRole, 'owner'>
  currentUser: AuthenticatedUser
  normalizedUserEmail: string
}): Promise<'created-member' | 'already-member'> {
  const membershipState = await resolveJoinableOrganizationMemberState({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    currentUser: payload.currentUser,
    normalizedUserEmail: payload.normalizedUserEmail,
  })

  if (membershipState.kind === 'already-member') {
    return 'already-member'
  }

  if (payload.role === 'admin') {
    await ensureAdminQuotaAvailableForJoinableMember({
      serviceClient: payload.serviceClient,
      companyId: payload.companyId,
    })
  }

  if (membershipState.kind === 'activate-existing') {
    await activateOrganizationMember({
      serviceClient: payload.serviceClient,
      memberId: membershipState.member.id,
      currentUser: payload.currentUser,
      normalizedUserEmail: payload.normalizedUserEmail,
      role: payload.role,
    })
    return 'created-member'
  }

  await insertOrganizationMember({
    serviceClient: payload.serviceClient,
    companyId: payload.companyId,
    currentUser: payload.currentUser,
    normalizedUserEmail: payload.normalizedUserEmail,
    role: payload.role,
  })

  return 'created-member'
}

/**
 * 邀请链接的 Admin 名额校验：
 * - 邀请链接可复用，因此必须在真正生效前再次确认配额；
 * - 仅在“需要新占用一个 active admin 名额”时调用。
 */
async function ensureAdminQuotaAvailableForJoinableMember(payload: {
  serviceClient: ServiceRoleSupabaseClient
  companyId: string
}): Promise<void> {
  const [quota, adminUsedResult] = await Promise.all([
    getPlanQuota(payload.companyId),
    payload.serviceClient
      .schema('permission')
      .from('organization_member')
      .select('id', { count: 'exact', head: true })
      .eq('company_id', payload.companyId)
      .eq('status', 'active')
      .eq('role', 'admin'),
  ])

  if (adminUsedResult.error) {
    throw createApiError(500, `读取 Admin 使用量失败：${adminUsedResult.error.message}`)
  }

  const adminLimit = quota?.admin_limit ?? DEFAULT_ADMIN_LIMIT
  const adminUsed = adminUsedResult.count || 0

  if (adminUsed >= adminLimit) {
    throw createApiError(409, `Admin 配额已满（${adminUsed}/${adminLimit}），当前邀请链接暂不可用。`)
  }
}

async function handleCreateInviteLink(request: Request): Promise<Response> {
  const body = await parseRequestJson<{
    companyId?: string
    role?: string
  }>(request)

  const companyId = body.companyId?.trim() || ''
  const role = body.role?.trim() || ''

  ensureValidCompanyId(companyId)

  if (!ensureValidInvitationRole(role)) {
    throw createApiError(400, '邀请角色仅支持 Admin 或 Member。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  const actorMembership = await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  if (actorMembership.role !== 'owner' && actorMembership.role !== 'admin') {
    throw createApiError(403, '仅 Owner/Admin 可生成邀请链接。')
  }

  const inviteLinkExpiresAt = computeInviteLinkExpiresAt()

  const token = createInviteLinkToken(
    {
      companyId,
      role,
      invitedByUserId: currentUser.id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(new Date(inviteLinkExpiresAt).getTime() / 1000),
      nonce: randomBytes(12).toString('hex'),
    },
    getInviteLinkSecret(),
  )

  writeInvitationAuditLog({
    action: 'invite',
    companyId,
    actorUserId: currentUser.id,
    targetEmail: '[invite-link]',
    role,
    result: 'success',
    reason: 'invite-link-created',
  })

  const responsePayload: CreateInviteLinkResponse = {
    message: '邀请链接已生成，24 小时内有效。',
    inviteLink: buildMemberInviteLink(request, token),
  }

  return jsonResponse(responsePayload)
}

async function handlePreviewInviteLink(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const token = requestUrl.searchParams.get('token')?.trim() || ''
  const { serviceClient, inviteLinkPayload, status } = await resolveInviteLinkContext(token)
  const currentUser = await getAuthenticatedUserOrNull(request)
  let currentUserAlreadyMember = false

  if (currentUser?.id) {
    const currentMemberResult = await serviceClient
      .schema('permission')
      .from('organization_member')
      .select('id')
      .eq('company_id', inviteLinkPayload.companyId)
      .eq('user_id', currentUser.id)
      .eq('status', 'active')
      .maybeSingle<{ id: string }>()

    if (currentMemberResult.error) {
      throw createApiError(500, `读取当前成员状态失败：${currentMemberResult.error.message}`)
    }

    currentUserAlreadyMember = Boolean(currentMemberResult.data?.id)
  }

  const responsePayload: InviteLinkPreviewResponse = {
    companyId: inviteLinkPayload.companyId,
    companyName: await readCompanyName({
      serviceClient,
      companyId: inviteLinkPayload.companyId,
    }),
    role: inviteLinkPayload.role,
    status,
    expiresAt: new Date(inviteLinkPayload.exp * 1000).toISOString(),
    currentUserEmail: currentUser?.email || null,
    currentUserAlreadyMember,
  }

  return jsonResponse(responsePayload)
}

async function handleAcceptInviteLink(request: Request): Promise<Response> {
  const body = await parseRequestJson<{
    token?: string
  }>(request)

  const token = body.token?.trim() || ''
  const currentUser = await requireAuthenticatedUser(request)
  const normalizedUserEmail = normalizeEmail(currentUser.email || '')

  if (!EMAIL_REGEX.test(normalizedUserEmail)) {
    throw createApiError(400, '当前账号缺少有效邮箱，暂无法接受邀请。')
  }

  const { serviceClient, inviteLinkPayload, status } = await resolveInviteLinkContext(token)
  const companyName = await readCompanyName({
    serviceClient,
    companyId: inviteLinkPayload.companyId,
  })

  if (status === 'expired') {
    throw createApiError(410, '邀请已过期，请联系管理员重新生成邀请链接。')
  }

  await ensureInviteLinkJoinable({
    serviceClient,
    companyId: inviteLinkPayload.companyId,
    role: inviteLinkPayload.role,
    currentUser,
    normalizedUserEmail,
  })

  const responsePayload: AcceptInviteLinkResponse = {
    message: `你已加入 ${companyName}。`,
    companyId: inviteLinkPayload.companyId,
  }

  return jsonResponse(responsePayload)
}

/**
 * 更新成员角色：
 * - invited：仅调整 pending invitation 的目标角色，不触发重发；
 * - active：直接更新 `organization_member.role`；
 * - admin 配额仅在 member -> admin 的升级路径上校验。
 */
async function handleUpdateMemberRole(request: Request): Promise<Response> {
  const body = await parseRequestJson<{
    companyId?: string
    memberId?: string
    memberStatus?: string
    role?: string
  }>(request)

  const companyId = body.companyId?.trim() || ''
  const memberId = body.memberId?.trim() || ''
  const memberStatus = body.memberStatus?.trim() || ''
  const role = body.role?.trim() || ''

  ensureValidCompanyId(companyId)

  if (!memberId || !isUuid(memberId)) {
    throw createApiError(400, 'member_id 非法。')
  }

  if (memberStatus !== 'active' && memberStatus !== 'invited') {
    throw createApiError(400, 'member_status 仅支持 active 或 invited。')
  }

  if (!ensureValidInvitationRole(role)) {
    throw createApiError(400, '目标角色仅支持 Admin 或 Member。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  const actorMembership = await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  if (actorMembership.role !== 'owner' && actorMembership.role !== 'admin') {
    throw createApiError(403, '仅 Owner/Admin 可修改成员权限。')
  }

  const serviceClient = createSupabaseServiceRoleClient()

  /**
   * 仅在“升级为 Admin”且当前目标不是 Admin 时校验配额：
   * - 避免对 admin -> admin、admin -> member 等幂等/降级操作做无效阻断；
   * - 与邀请逻辑保持一致，仍以 active admin 数量为准。
   */
  const ensureAdminQuotaForRoleUpdate = async (currentRole: MemberRole): Promise<void> => {
    if (role !== 'admin' || currentRole === 'admin') {
      return
    }

    const [quota, adminUsedResult] = await Promise.all([
      getPlanQuota(companyId),
      serviceClient
        .schema('permission')
        .from('organization_member')
        .select('id', { count: 'exact', head: true })
        .eq('company_id', companyId)
        .eq('status', 'active')
        .eq('role', 'admin'),
    ])

    if (adminUsedResult.error) {
      throw createApiError(500, `读取 Admin 使用量失败：${adminUsedResult.error.message}`)
    }

    const adminLimit = quota?.admin_limit ?? DEFAULT_ADMIN_LIMIT
    const adminUsed = adminUsedResult.count || 0

    if (adminUsed >= adminLimit) {
      throw createApiError(409, `Admin 配额已满（${adminUsed}/${adminLimit}），请升级套餐或改为 Member。`)
    }
  }

  if (memberStatus === 'invited') {
    const invitationResult = await serviceClient
      .schema('permission')
      .from('member_invitation')
      .select('id, company_id, email, role, invited_by, status, expires_at, created_at')
      .eq('id', memberId)
      .eq('company_id', companyId)
      .eq('status', 'pending')
      .maybeSingle<MemberInvitationRow>()

    if (invitationResult.error) {
      throw createApiError(500, `读取邀请记录失败：${invitationResult.error.message}`)
    }

    const invitation = invitationResult.data
    if (!invitation) {
      throw createApiError(404, '未找到待处理邀请，可能已处理或已取消。')
    }

    if (actorMembership.role === 'admin' && invitation.role !== 'member') {
      throw createApiError(403, 'Admin 仅可调整 Member 邀请。')
    }

    await ensureAdminQuotaForRoleUpdate(invitation.role)

    if (invitation.role !== role) {
      const updateInvitationResult = await serviceClient
        .schema('permission')
        .from('member_invitation')
        .update({
          role,
        })
        .eq('id', memberId)

      if (updateInvitationResult.error) {
        throw createApiError(500, `更新邀请权限失败：${updateInvitationResult.error.message}`)
      }
    }

    writeInvitationAuditLog({
      action: 'update-role',
      companyId,
      actorUserId: currentUser.id,
      targetEmail: invitation.email,
      targetMemberId: invitation.id,
      role,
      result: 'success',
      reason: 'update-invitation-role',
    })

    return jsonResponse({
      message: getMemberRoleUpdateSuccessMessage({
        memberStatus,
        role,
        email: invitation.email,
      }),
    })
  }

  const targetMemberResult = await serviceClient
    .schema('permission')
    .from('organization_member')
    .select('id, company_id, user_id, email, role, status, joined_at, last_active_at')
    .eq('id', memberId)
    .eq('company_id', companyId)
    .eq('status', 'active')
    .maybeSingle<OrganizationMemberRow>()

  if (targetMemberResult.error) {
    throw createApiError(500, `读取目标成员失败：${targetMemberResult.error.message}`)
  }

  const targetMember = targetMemberResult.data
  if (!targetMember) {
    throw createApiError(404, '未找到目标成员。')
  }

  if (targetMember.user_id === currentUser.id) {
    throw createApiError(409, '不允许修改当前登录账号本身的角色。')
  }

  if (targetMember.role === 'owner') {
    throw createApiError(409, 'Owner 权限不可直接修改。若需变更请先完成角色转移。')
  }

  if (actorMembership.role === 'admin' && targetMember.role !== 'member') {
    throw createApiError(403, 'Admin 仅可调整 Member。')
  }

  await ensureAdminQuotaForRoleUpdate(targetMember.role)

  if (targetMember.role !== role) {
    const updateMemberResult = await serviceClient
      .schema('permission')
      .from('organization_member')
      .update({
        role,
      })
      .eq('id', memberId)

    if (updateMemberResult.error) {
      throw createApiError(500, `更新成员角色失败：${updateMemberResult.error.message}`)
    }
  }

  writeInvitationAuditLog({
    action: 'update-role',
    companyId,
    actorUserId: currentUser.id,
    targetEmail: targetMember.email,
    targetMemberId: targetMember.id,
    role,
    result: 'success',
    reason: 'update-member-role',
  })

  return jsonResponse({
    message: getMemberRoleUpdateSuccessMessage({
      memberStatus,
      role,
      email: targetMember.email,
    }),
  })
}

/**
 * 删除成员流程：
 * - 邀请记录：更新为 cancelled；
 * - 正式成员：按角色层级删除。
 */
async function handleRemoveMember(request: Request): Promise<Response> {
  const body = await parseRequestJson<{
    companyId?: string
    memberId?: string
    memberStatus?: string
  }>(request)

  const companyId = body.companyId?.trim() || ''
  const memberId = body.memberId?.trim() || ''
  const memberStatus = body.memberStatus?.trim() || ''

  ensureValidCompanyId(companyId)

  if (!memberId || !isUuid(memberId)) {
    throw createApiError(400, 'member_id 非法。')
  }

  if (memberStatus !== 'active' && memberStatus !== 'invited') {
    throw createApiError(400, 'member_status 仅支持 active 或 invited。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  const actorMembership = await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  if (actorMembership.role !== 'owner' && actorMembership.role !== 'admin') {
    throw createApiError(403, '仅 Owner/Admin 可移除成员。')
  }

  const serviceClient = createSupabaseServiceRoleClient()

  if (memberStatus === 'invited') {
    const invitationResult = await serviceClient
      .schema('permission')
      .from('member_invitation')
      .select('id, company_id, email, role, invited_by, status, expires_at, created_at')
      .eq('id', memberId)
      .eq('company_id', companyId)
      .eq('status', 'pending')
      .maybeSingle<MemberInvitationRow>()

    if (invitationResult.error) {
      throw createApiError(500, `读取邀请记录失败：${invitationResult.error.message}`)
    }

    if (!invitationResult.data) {
      throw createApiError(404, '未找到待处理邀请，可能已处理或已取消。')
    }

    if (actorMembership.role === 'admin' && invitationResult.data.role !== 'member') {
      throw createApiError(403, 'Admin 仅可取消 Member 邀请。')
    }

    const cancelResult = await serviceClient
      .schema('permission')
      .from('member_invitation')
      .update({
        status: 'cancelled',
      })
      .eq('id', memberId)

    if (cancelResult.error) {
      throw createApiError(500, `取消邀请失败：${cancelResult.error.message}`)
    }

    writeInvitationAuditLog({
      action: 'remove',
      companyId,
      actorUserId: currentUser.id,
      targetEmail: invitationResult.data.email,
      role: invitationResult.data.role,
      result: 'success',
      reason: 'cancel-invitation',
    })

    return jsonResponse({
      message: `已取消邀请：${invitationResult.data.email}`,
    })
  }

  const targetMemberResult = await serviceClient
    .schema('permission')
    .from('organization_member')
    .select('id, company_id, user_id, email, role, status, joined_at')
    .eq('id', memberId)
    .eq('company_id', companyId)
    .eq('status', 'active')
    .maybeSingle<OrganizationMemberRow>()

  if (targetMemberResult.error) {
    throw createApiError(500, `读取目标成员失败：${targetMemberResult.error.message}`)
  }

  const targetMember = targetMemberResult.data
  if (!targetMember) {
    throw createApiError(404, '未找到目标成员。')
  }

  if (targetMember.user_id === currentUser.id) {
    throw createApiError(409, '不允许删除当前登录账号本身。')
  }

  if (targetMember.role === 'owner') {
    throw createApiError(409, 'Owner 不可删除。若需变更请先完成角色转移。')
  }

  if (actorMembership.role === 'admin' && targetMember.role !== 'member') {
    throw createApiError(403, 'Admin 仅可删除 Member。')
  }

  const deleteResult = await serviceClient
    .schema('permission')
    .from('organization_member')
    .delete()
    .eq('id', memberId)

  if (deleteResult.error) {
    throw createApiError(500, `删除成员失败：${deleteResult.error.message}`)
  }

  writeInvitationAuditLog({
    action: 'remove',
    companyId,
    actorUserId: currentUser.id,
    targetEmail: targetMember.email,
    targetMemberId: targetMember.id,
    role: targetMember.role,
    result: 'success',
    reason: 'remove-member',
  })

  return jsonResponse({
    message: `已删除成员：${targetMember.email}`,
  })
}

/**
 * 绑定 Telegram 账号：
 * - 当前仅允许“当前登录成员绑定自己的 Telegram 账号”；
 * - 绑定关系落库到 `permission.member_account_binding`。
 */
async function handleLinkTelegramAccount(request: Request): Promise<Response> {
  const botToken = getTelegramBotTokenOrNull()
  if (!botToken) {
    throw createApiError(503, '服务端未配置 TELEGRAM_BOT_TOKEN，暂不可绑定 Telegram 账号。')
  }

  const body = await parseRequestJson<{
    companyId?: string
    telegramAuth?: TelegramWidgetAuthUser
  }>(request)

  const companyId = body.companyId?.trim() || ''
  ensureValidCompanyId(companyId)

  const telegramAuth = body.telegramAuth
  if (!telegramAuth) {
    throw createApiError(400, 'telegramAuth 不能为空。')
  }

  if (!telegramAuth.id || !telegramAuth.hash || !telegramAuth.auth_date) {
    throw createApiError(400, 'telegramAuth 参数不完整。')
  }

  if (!verifyTelegramWidgetAuthPayload(telegramAuth, botToken)) {
    throw createApiError(401, 'Telegram 登录签名校验失败，请重新登录后重试。')
  }

  if (!isFreshTelegramAuthDate(telegramAuth.auth_date)) {
    throw createApiError(401, 'Telegram 登录凭证已过期，请重新点击登录。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  const actorMembership = await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  const serviceClient = createSupabaseServiceRoleClient()
  const externalAccountId = String(telegramAuth.id)
  const externalDisplay =
    telegramAuth.username?.trim() ||
    [telegramAuth.first_name?.trim(), telegramAuth.last_name?.trim()].filter(Boolean).join(' ') ||
    null

  const conflictBindingResult = await serviceClient
    .schema('permission')
    .from('member_account_binding')
    .select('member_id, platform, external_account_id')
    .eq('platform', 'telegram')
    .eq('external_account_id', externalAccountId)
    .maybeSingle<MemberAccountBindingRow>()

  if (conflictBindingResult.error) {
    throw createApiError(500, `校验 Telegram 账号占用失败：${conflictBindingResult.error.message}`)
  }

  if (conflictBindingResult.data && conflictBindingResult.data.member_id !== actorMembership.id) {
    throw createApiError(409, '该 Telegram 账号已绑定其他成员，请先解绑后再重试。')
  }

  const upsertBindingResult = await serviceClient
    .schema('permission')
    .from('member_account_binding')
    .upsert(
      {
        member_id: actorMembership.id,
        platform: 'telegram',
        external_account_id: externalAccountId,
        external_display: externalDisplay,
      },
      {
        onConflict: 'member_id,platform',
      },
    )

  if (upsertBindingResult.error) {
    throw createApiError(500, `绑定 Telegram 账号失败：${upsertBindingResult.error.message}`)
  }

  return jsonResponse({
    message: 'Telegram 账号已绑定。',
  })
}

/**
 * 绑定 Discord / Slack / 飞书账号：
 * - 与 Telegram 不同，这里通过外部账号 ID 手动完成绑定；
 * - 仅允许当前登录成员绑定自己的账号；
 * - 同平台账号 ID 全局唯一，避免多人重复占用同一账号。
 */
async function handleLinkMemberAccount(request: Request): Promise<Response> {
  const body = await parseRequestJson<{
    companyId?: string
    platform?: string
    externalAccountId?: string
    externalDisplay?: string | null
  }>(request)

  const companyId = body.companyId?.trim() || ''
  const rawPlatform = body.platform?.trim() || ''
  const externalAccountId = body.externalAccountId?.trim() || ''
  const externalDisplay = body.externalDisplay?.trim() || null
  ensureValidCompanyId(companyId)

  if (!ensureValidPlatform(rawPlatform)) {
    throw createApiError(400, 'platform 非法。')
  }

  if (rawPlatform === 'telegram') {
    throw createApiError(400, 'Telegram 账号请使用 Telegram 登录组件完成绑定。')
  }

  if (!externalAccountId) {
    throw createApiError(400, 'externalAccountId 不能为空。')
  }

  const platform: Exclude<PlatformType, 'telegram'> = rawPlatform
  const currentUser = await requireAuthenticatedUser(request)
  const actorMembership = await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  const serviceClient = createSupabaseServiceRoleClient()

  const conflictBindingResult = await serviceClient
    .schema('permission')
    .from('member_account_binding')
    .select('member_id, platform, external_account_id')
    .eq('platform', platform)
    .eq('external_account_id', externalAccountId)
    .maybeSingle<MemberAccountBindingRow>()

  if (conflictBindingResult.error) {
    throw createApiError(500, `校验账号占用失败：${conflictBindingResult.error.message}`)
  }

  if (conflictBindingResult.data && conflictBindingResult.data.member_id !== actorMembership.id) {
    throw createApiError(409, '该平台账号已绑定其他成员，请先解绑后再重试。')
  }

  const upsertBindingResult = await serviceClient
    .schema('permission')
    .from('member_account_binding')
    .upsert(
      {
        member_id: actorMembership.id,
        platform,
        external_account_id: externalAccountId,
        external_display: externalDisplay,
      },
      {
        onConflict: 'member_id,platform',
      },
    )

  if (upsertBindingResult.error) {
    throw createApiError(500, `绑定账号失败：${upsertBindingResult.error.message}`)
  }

  return jsonResponse({
    message: `${getPlatformDisplayName(platform)} 账号已绑定。`,
  })
}

/**
 * 解绑成员平台账号：
 * - 成员可解绑自己的账号；
 * - owner 可解绑任意成员；
 * - admin 仅可解绑 member 的账号。
 */
async function handleUnlinkMemberAccount(request: Request): Promise<Response> {
  const body = await parseRequestJson<{
    companyId?: string
    memberId?: string
    platform?: string
  }>(request)

  const companyId = body.companyId?.trim() || ''
  const memberId = body.memberId?.trim()
  const platform = body.platform?.trim() || ''
  ensureValidCompanyId(companyId)

  if (!ensureValidPlatform(platform)) {
    throw createApiError(400, 'platform 非法。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  const actorMembership = await requireActiveOrganizationMember({
    companyId,
    userId: currentUser.id,
  })

  const targetMemberId = memberId || actorMembership.id
  if (!isUuid(targetMemberId)) {
    throw createApiError(400, 'member_id 非法。')
  }

  const serviceClient = createSupabaseServiceRoleClient()

  if (targetMemberId !== actorMembership.id) {
    if (actorMembership.role !== 'owner' && actorMembership.role !== 'admin') {
      throw createApiError(403, '仅 Owner/Admin 可解绑其他成员账号。')
    }

    const targetMemberResult = await serviceClient
      .schema('permission')
      .from('organization_member')
      .select('id, company_id, user_id, email, role, status, joined_at')
      .eq('id', targetMemberId)
      .eq('company_id', companyId)
      .eq('status', 'active')
      .maybeSingle<OrganizationMemberRow>()

    if (targetMemberResult.error) {
      throw createApiError(500, `读取目标成员失败：${targetMemberResult.error.message}`)
    }

    if (!targetMemberResult.data) {
      throw createApiError(404, '目标成员不存在。')
    }

    if (actorMembership.role === 'admin' && targetMemberResult.data.role !== 'member') {
      throw createApiError(403, 'Admin 仅可解绑 Member 账号。')
    }
  }

  const existedBindingResult = await serviceClient
    .schema('permission')
    .from('member_account_binding')
    .select('id, member_id, platform')
    .eq('member_id', targetMemberId)
    .eq('platform', platform)
    .maybeSingle<MemberAccountBindingRow>()

  if (existedBindingResult.error) {
    throw createApiError(500, `读取账号绑定失败：${existedBindingResult.error.message}`)
  }

  if (!existedBindingResult.data?.id) {
    return jsonResponse({
      message: '该成员当前未绑定此平台账号。',
    })
  }

  const deleteBindingResult = await serviceClient
    .schema('permission')
    .from('member_account_binding')
    .delete()
    .eq('id', existedBindingResult.data.id)

  if (deleteBindingResult.error) {
    throw createApiError(500, `解绑账号失败：${deleteBindingResult.error.message}`)
  }

  return jsonResponse({
    message: `${getPlatformDisplayName(platform)} 账号已解绑。`,
  })
}

/**
 * 接受邀请流程（登录后自动执行）：
 * - 按当前登录邮箱查找所有 pending invitation；
 * - 若成员不存在则创建 `organization_member`；
 * - 将 invitation 状态更新为 accepted。
 */
async function handleAcceptInvitations(request: Request): Promise<Response> {
  const currentUser = await requireAuthenticatedUser(request)
  const userEmail = normalizeEmail(currentUser.email || '')

  if (!userEmail || !EMAIL_REGEX.test(userEmail)) {
    const emptyResponse: AcceptInvitationsResponse = {
      acceptedCount: 0,
      skippedCount: 0,
      acceptedCompanyIds: [],
      preferredCompanyId: null,
    }

    return jsonResponse(emptyResponse)
  }

  const serviceClient = createSupabaseServiceRoleClient()

  const invitationResult = await serviceClient
    .schema('permission')
    .from('member_invitation')
    .select('id, company_id, email, role, invited_by, status, expires_at, created_at')
    .eq('status', 'pending')
    .ilike('email', userEmail)
    .order('created_at', { ascending: false })

  if (invitationResult.error) {
    throw createApiError(500, `读取待处理邀请失败：${invitationResult.error.message}`)
  }

  const invitations: MemberInvitationRow[] = (invitationResult.data || []) as MemberInvitationRow[]
  if (invitations.length === 0) {
    const emptyResponse: AcceptInvitationsResponse = {
      acceptedCount: 0,
      skippedCount: 0,
      acceptedCompanyIds: [],
      preferredCompanyId: null,
    }

    return jsonResponse(emptyResponse)
  }

  let acceptedCount = 0
  let skippedCount = 0
  const acceptedCompanyIds: string[] = []

  for (const invitation of invitations) {
    const status = await syncInvitationExpiredStatusIfNeeded({
      serviceClient,
      invitation,
    })

    if (status !== 'pending') {
      skippedCount += 1
      continue
    }

    if (!acceptedCompanyIds.includes(invitation.company_id)) {
      acceptedCompanyIds.push(invitation.company_id)
    }

    const acceptResult = await acceptInvitationForUser({
      serviceClient,
      invitation,
      currentUser,
      normalizedUserEmail: userEmail,
    })

    if (acceptResult === 'already-member') {
      skippedCount += 1
    }

    acceptedCount += 1
  }

  const responsePayload: AcceptInvitationsResponse = {
    acceptedCount,
    skippedCount,
    acceptedCompanyIds,
    preferredCompanyId: acceptedCompanyIds[0] || null,
  }

  return jsonResponse(responsePayload)
}

export async function handleMemberManagementApi(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const pathname = requestUrl.pathname
  const method = request.method.toUpperCase()

  try {
    if (pathname === '/api/settings/member-management/snapshot' && method === 'GET') {
      return await handleGetSnapshot(request)
    }

    if (pathname === '/api/settings/member-management/invite' && method === 'POST') {
      return await handleInviteMember(request)
    }

    if (pathname === '/api/settings/member-management/invite-link' && method === 'POST') {
      return await handleCreateInviteLink(request)
    }

    if (pathname === '/api/settings/member-management/invite-link/preview' && method === 'GET') {
      return await handlePreviewInviteLink(request)
    }

    if (pathname === '/api/settings/member-management/invite-link/accept' && method === 'POST') {
      return await handleAcceptInviteLink(request)
    }

    if (pathname === '/api/settings/member-management/role' && method === 'POST') {
      return await handleUpdateMemberRole(request)
    }

    if (pathname === '/api/settings/member-management/remove' && method === 'POST') {
      return await handleRemoveMember(request)
    }

    if (pathname === '/api/settings/member-management/accept-invitations' && method === 'POST') {
      return await handleAcceptInvitations(request)
    }

    if (pathname === '/api/settings/member-management/bindings/oauth/start' && method === 'POST') {
      return await handleCreateOauthLinkUrl(request)
    }

    if (pathname === '/api/settings/member-management/bindings/oauth/discord/callback' && method === 'GET') {
      return await handleDiscordOauthCallback(request)
    }

    if (pathname === '/api/settings/member-management/bindings/oauth/slack/callback' && method === 'GET') {
      return await handleSlackOauthCallback(request)
    }

    if (
      pathname === '/api/settings/member-management/bindings/oauth/feishu/callback' &&
      (method === 'GET' || method === 'POST')
    ) {
      return await handleFeishuOauthCallback(request)
    }

    if (pathname === '/api/settings/member-management/bindings/link' && method === 'POST') {
      return await handleLinkMemberAccount(request)
    }

    if (pathname === '/api/settings/member-management/bindings/telegram/link' && method === 'POST') {
      return await handleLinkTelegramAccount(request)
    }

    if (pathname === '/api/settings/member-management/bindings/unlink' && method === 'POST') {
      return await handleUnlinkMemberAccount(request)
    }

    return jsonResponse(
      {
        error: '未找到成员管理 API 路径。',
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

    const message = error instanceof Error ? error.message : '成员管理接口出现未知错误。'
    return jsonResponse({ error: message }, 500)
  }
}

export const __memberManagementApiTestables = {
  acceptInvitationForUser,
  createInviteLinkToken,
  deliverMemberInvitationEmail,
  filterPendingInvitationsWithoutActiveMembers,
  getErrorMessageFromUnknown,
  getMemberInvitationSuccessMessage,
  getMemberRoleUpdateSuccessMessage,
  getBearerTokenFromRequest,
  getAuthenticatedUserOrNull,
  isExistingRegisteredUserAuthError,
  resolveJoinableOrganizationMemberState,
  resolveInvitationStatus,
  resolveFeishuUserInfoForBinding,
  selectFeishuOauthBotCandidate,
  verifyInviteLinkToken,
}
