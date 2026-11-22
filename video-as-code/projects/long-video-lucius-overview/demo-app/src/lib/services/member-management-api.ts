import type { TelegramWidgetAuthUser } from '@/lib/services/telegram-integration-api'

import { m } from '@/paraglide/messages'

export type CompanyRole = 'owner' | 'admin' | 'member'
export type PlatformType = 'discord' | 'telegram' | 'feishu' | 'slack'
export type ManualLinkPlatformType = Exclude<PlatformType, 'telegram'>
export type OauthLinkPlatformType = ManualLinkPlatformType
export type MemberRole = 'owner' | 'admin' | 'member'
export type MemberStatus = 'active' | 'invited'

export type MemberRecord = {
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

export type MemberManagementSnapshot = {
  currentUserRole: CompanyRole
  adminLimit: number
  memberLimit: number
  adminUsed: number
  memberUsed: number
  members: MemberRecord[]
}

type ApiErrorResponse = {
  error?: string
}

type InviteMemberResponse = {
  message: string
}

type CreateMemberInviteLinkResponse = {
  message: string
  inviteLink: string
}

type RemoveMemberResponse = {
  message: string
}

type UpdateMemberRoleResponse = {
  message: string
}

type LinkMemberAccountResponse = {
  message: string
}

type CreateOauthLinkUrlResponse = {
  authorizeUrl: string
}

export type InviteLinkStatus = 'active' | 'expired'

export type MemberInviteLinkPreview = {
  companyId: string
  companyName: string
  role: Exclude<MemberRole, 'owner'>
  status: InviteLinkStatus
  expiresAt: string
  currentUserEmail: string | null
  currentUserAlreadyMember: boolean
}

type AcceptMemberInviteLinkResponse = {
  message: string
  companyId: string
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiErrorResponse

  if (!response.ok) {
    throw new Error(data.error || m.service_member_management_request_failed())
  }

  return data
}

/**
 * 拉取成员管理快照：
 * - 包含当前用户角色、成员列表、配额使用量。
 */
export async function fetchMemberManagementSnapshot(payload: {
  companyId: string
}): Promise<MemberManagementSnapshot> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
  })

  const response = await fetch(`/api/settings/member-management/snapshot?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<MemberManagementSnapshot>(response)
}

/**
 * 邀请成员：
 * - 服务端将执行权限校验、配额校验，并按账号状态发送邀请邮件或登录链接。
 */
export async function inviteMember(payload: {
  companyId: string
  email: string
  role: Exclude<MemberRole, 'owner'>
}): Promise<InviteMemberResponse> {
  const response = await fetch('/api/settings/member-management/invite', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<InviteMemberResponse>(response)
}

/**
 * 生成可复制的邀请链接：
 * - 不需要填写邮箱；
 * - 服务端会返回一个 24 小时有效、可复用的组织邀请链接。
 */
export async function createMemberInviteLink(payload: {
  companyId: string
  role: Exclude<MemberRole, 'owner'>
}): Promise<CreateMemberInviteLinkResponse> {
  const response = await fetch('/api/settings/member-management/invite-link', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<CreateMemberInviteLinkResponse>(response)
}

/**
 * 读取邀请链接预览：
 * - 公开页面使用；
 * - 若当前用户已登录，服务端会一并返回“当前账号是否已经在组织内”。
 */
export async function fetchMemberInviteLinkPreview(payload: {
  token: string
}): Promise<MemberInviteLinkPreview> {
  const query = new URLSearchParams({
    token: payload.token,
  })

  const response = await fetch(`/api/settings/member-management/invite-link/preview?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<MemberInviteLinkPreview>(response)
}

/**
 * 以当前登录账号接受邀请链接。
 */
export async function acceptMemberInviteLink(payload: {
  token: string
}): Promise<AcceptMemberInviteLinkResponse> {
  const response = await fetch('/api/settings/member-management/invite-link/accept', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<AcceptMemberInviteLinkResponse>(response)
}

/**
 * 移除成员或取消邀请：
 * - `active` 对应正式成员删除；
 * - `invited` 对应待处理邀请取消。
 */
export async function removeMember(payload: {
  companyId: string
  memberId: string
  memberStatus: MemberStatus
}): Promise<RemoveMemberResponse> {
  const response = await fetch('/api/settings/member-management/remove', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<RemoveMemberResponse>(response)
}

/**
 * 更新成员角色：
 * - `active` 对应正式成员角色调整；
 * - `invited` 对应待处理邀请的目标角色调整；
 * - 统一由服务端执行角色层级与 Admin 配额校验。
 */
export async function updateMemberRole(payload: {
  companyId: string
  memberId: string
  memberStatus: MemberStatus
  role: Exclude<MemberRole, 'owner'>
}): Promise<UpdateMemberRoleResponse> {
  const response = await fetch('/api/settings/member-management/role', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<UpdateMemberRoleResponse>(response)
}

/**
 * 绑定当前成员的 Telegram 账号：
 * - 传入 Telegram Widget 返回的认证 payload；
 * - 服务端会做签名校验后写入 `member_account_binding`。
 */
export async function linkTelegramMemberAccount(payload: {
  companyId: string
  telegramAuth: TelegramWidgetAuthUser
}): Promise<LinkMemberAccountResponse> {
  const response = await fetch('/api/settings/member-management/bindings/telegram/link', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<LinkMemberAccountResponse>(response)
}

/**
 * 绑定当前成员的 Discord / Slack / 飞书账号：
 * - 非 Telegram 平台统一通过账号 ID + 展示名绑定；
 * - 服务端会做平台校验、账号占用校验以及幂等 upsert。
 */
export async function linkMemberAccount(payload: {
  companyId: string
  platform: ManualLinkPlatformType
  externalAccountId: string
  externalDisplay?: string | null
}): Promise<LinkMemberAccountResponse> {
  const response = await fetch('/api/settings/member-management/bindings/link', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<LinkMemberAccountResponse>(response)
}

/**
 * 创建成员账号 OAuth 绑定链接：
 * - 由服务端生成一次性 state 并返回第三方授权 URL；
 * - 前端拿到 URL 后直接跳转到对应平台登录页。
 */
export async function createMemberAccountOauthLinkUrl(payload: {
  companyId: string
  platform: OauthLinkPlatformType
}): Promise<CreateOauthLinkUrlResponse> {
  const response = await fetch('/api/settings/member-management/bindings/oauth/start', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<CreateOauthLinkUrlResponse>(response)
}

/**
 * 解绑成员的平台账号。
 */
export async function unlinkMemberAccount(payload: {
  companyId: string
  memberId: string
  platform: PlatformType
}): Promise<LinkMemberAccountResponse> {
  const response = await fetch('/api/settings/member-management/bindings/unlink', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<LinkMemberAccountResponse>(response)
}
