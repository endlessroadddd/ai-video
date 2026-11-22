import { afterEach, describe, expect, it, vi } from 'vitest'

import { __memberManagementApiTestables } from '@/lib/server/member-management-api'

type DeliverInvitationFn = typeof __memberManagementApiTestables.deliverMemberInvitationEmail
type DeliverInvitationPayload = Parameters<DeliverInvitationFn>[0]
type InvitationAuthClient = DeliverInvitationPayload['authClient']

type SelectFeishuOauthBotCandidateFn = typeof __memberManagementApiTestables.selectFeishuOauthBotCandidate
type FeishuOauthBotCandidate = NonNullable<Parameters<SelectFeishuOauthBotCandidateFn>[0][number]>

function createInvitationAuthClientMock(payload: {
  inviteError?: { message: string; code?: string; status?: number } | null
  magicLinkError?: { message: string; code?: string; status?: number } | null
}): {
  authClient: InvitationAuthClient
  inviteUserByEmailMock: ReturnType<typeof vi.fn>
  signInWithOtpMock: ReturnType<typeof vi.fn>
} {
  const inviteUserByEmailMock = vi.fn().mockResolvedValue({
    error: payload.inviteError ?? null,
  })
  const signInWithOtpMock = vi.fn().mockResolvedValue({
    error: payload.magicLinkError ?? null,
  })

  return {
    authClient: {
      admin: {
        inviteUserByEmail: inviteUserByEmailMock,
      },
      signInWithOtp: signInWithOtpMock,
    },
    inviteUserByEmailMock,
    signInWithOtpMock,
  }
}

function createDeliveryPayload(
  authClient: InvitationAuthClient,
): DeliverInvitationPayload {
  return {
    authClient,
    email: 'member@example.com',
    redirectTo: 'http://localhost:3000/auth/callback',
    metadata: {
      company_id: '11111111-1111-4111-8111-111111111111',
      invitation_id: '22222222-2222-4222-8222-222222222222',
      invited_role: 'member',
      invited_by: '33333333-3333-4333-8333-333333333333',
    },
  }
}

function createFeishuOauthBotCandidate(
  payload: Partial<FeishuOauthBotCandidate> & Pick<FeishuOauthBotCandidate, 'id' | 'appId'>,
): FeishuOauthBotCandidate {
  return {
    id: payload.id,
    companyId: payload.companyId || '11111111-1111-4111-8111-111111111111',
    name: payload.name || `bot-${payload.id}`,
    appId: payload.appId,
    appSecretCiphertext: payload.appSecretCiphertext || 'v1:test-nonce:test-ciphertext',
    status: payload.status || 'active',
    isDefault: payload.isDefault ?? false,
  }
}

type TestOrganizationMemberRow = {
  id: string
  company_id: string
  user_id: string
  email: string
  role: 'owner' | 'admin' | 'member'
  status: 'active' | 'inactive'
  joined_at: string
  last_active_at?: string | null
}

function createOrganizationMemberServiceClientMock(rows: TestOrganizationMemberRow[]) {
  return {
    schema: vi.fn().mockImplementation(() => ({
      from: vi.fn().mockImplementation(() => ({
        select: vi.fn().mockImplementation(() => {
          const filters: {
            companyId?: string
            userId?: string
            email?: string
          } = {}

          return {
            eq(field: string, value: string) {
              if (field === 'company_id') {
                filters.companyId = value
              }

              if (field === 'user_id') {
                filters.userId = value
              }

              return this
            },
            ilike(field: string, value: string) {
              if (field === 'email') {
                filters.email = value.trim().toLowerCase()
              }

              return this
            },
            maybeSingle: vi.fn().mockImplementation(async () => {
              const matchedRow =
                rows.find((row) => {
                  if (filters.companyId && row.company_id !== filters.companyId) {
                    return false
                  }

                  if (filters.userId && row.user_id !== filters.userId) {
                    return false
                  }

                  if (filters.email && row.email.toLowerCase() !== filters.email) {
                    return false
                  }

                  return true
                }) || null

              return {
                data: matchedRow,
                error: null,
              }
            }),
          }
        }),
      })),
    })),
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('member-management-api 邀请投递', () => {
  it('邀请链接 token 应可验签并还原 payload', () => {
    const token = __memberManagementApiTestables.createInviteLinkToken(
      {
        companyId: '11111111-1111-4111-8111-111111111111',
        role: 'member',
        invitedByUserId: '33333333-3333-4333-8333-333333333333',
        iat: 1_710_000_000,
        exp: Math.floor(Date.now() / 1000) + 60,
        nonce: 'nonce-123',
      },
      'invite-secret',
    )

    expect(__memberManagementApiTestables.verifyInviteLinkToken(token, 'invite-secret')).toEqual({
      companyId: '11111111-1111-4111-8111-111111111111',
      role: 'member',
      invitedByUserId: '33333333-3333-4333-8333-333333333333',
      iat: 1_710_000_000,
      exp: expect.any(Number),
      nonce: 'nonce-123',
    })
  })

  it('邀请链接 token 过期后仍应可解析，过期判断交给业务层', () => {
    const expiredToken = __memberManagementApiTestables.createInviteLinkToken(
      {
        companyId: '11111111-1111-4111-8111-111111111111',
        role: 'admin',
        invitedByUserId: '33333333-3333-4333-8333-333333333333',
        iat: 1_700_000_000,
        exp: 1_700_000_100,
        nonce: 'nonce-expired',
      },
      'invite-secret',
    )

    expect(__memberManagementApiTestables.verifyInviteLinkToken(expiredToken, 'invite-secret')).toEqual({
      companyId: '11111111-1111-4111-8111-111111111111',
      role: 'admin',
      invitedByUserId: '33333333-3333-4333-8333-333333333333',
      iat: 1_700_000_000,
      exp: 1_700_000_100,
      nonce: 'nonce-expired',
    })
  })

  it('pending invitation 超时后应被识别为 expired', () => {
    expect(
      __memberManagementApiTestables.resolveInvitationStatus({
        status: 'pending',
        expiresAt: '2024-01-01T00:00:00.000Z',
        nowMs: new Date('2026-03-12T00:00:00.000Z').getTime(),
      }),
    ).toBe('expired')

    expect(
      __memberManagementApiTestables.resolveInvitationStatus({
        status: 'accepted',
        expiresAt: '2024-01-01T00:00:00.000Z',
        nowMs: new Date('2026-03-12T00:00:00.000Z').getTime(),
      }),
    ).toBe('accepted')
  })

  it('飞书 OAuth 绑定应优先使用 open_id 作为 external_account_id', () => {
    expect(
      __memberManagementApiTestables.resolveFeishuUserInfoForBinding({
        open_id: 'ou_member_open_id',
        user_id: 'cli_user_id',
        union_id: 'on_union_id',
        name: 'Kai',
      }),
    ).toEqual({
      externalAccountId: 'ou_member_open_id',
      externalDisplay: 'Kai',
    })
  })

  it('飞书 OAuth 响应缺少 open_id 时应直接报错，避免写入错误 user_id', () => {
    try {
      __memberManagementApiTestables.resolveFeishuUserInfoForBinding({
        user_id: 'cli_user_id',
        union_id: 'on_union_id',
        name: 'Kai',
      })
      throw new Error('expected resolveFeishuUserInfoForBinding to throw')
    } catch (error) {
      expect(error).toMatchObject({
        status: 502,
        message: '飞书 user_info 响应缺少 open_id，无法完成账号绑定。',
      })
    }
  })

  it('飞书 OAuth 绑定应优先选择默认 Bot', () => {
    const selectedCandidate = __memberManagementApiTestables.selectFeishuOauthBotCandidate([
      createFeishuOauthBotCandidate({
        id: 'bot-1',
        appId: 'cli_1',
      }),
      createFeishuOauthBotCandidate({
        id: 'bot-2',
        appId: 'cli_2',
        isDefault: true,
      }),
    ])

    expect(selectedCandidate?.id).toBe('bot-2')
  })

  it('飞书 OAuth 绑定在仅有一个 active Bot 时应自动复用该 Bot', () => {
    const selectedCandidate = __memberManagementApiTestables.selectFeishuOauthBotCandidate([
      createFeishuOauthBotCandidate({
        id: 'bot-disabled',
        appId: 'cli_disabled',
        status: 'disabled',
      }),
      createFeishuOauthBotCandidate({
        id: 'bot-active',
        appId: 'cli_active',
      }),
    ])

    expect(selectedCandidate?.id).toBe('bot-active')
  })

  it('飞书 OAuth 绑定在多个 active Bot 且未设置默认时应直接拒绝', () => {
    expect(() =>
      __memberManagementApiTestables.selectFeishuOauthBotCandidate([
        createFeishuOauthBotCandidate({
          id: 'bot-1',
          appId: 'cli_1',
        }),
        createFeishuOauthBotCandidate({
          id: 'bot-2',
          appId: 'cli_2',
        }),
      ]),
    ).toThrow('当前公司存在多个已启用的 Feishu Bot，请先在设置中指定默认 Bot 后再绑定飞书账号。')
  })

  it('未注册邮箱应继续发送 invite 邮件', async () => {
    const { authClient, inviteUserByEmailMock, signInWithOtpMock } = createInvitationAuthClientMock({})

    const deliveryMethod = await __memberManagementApiTestables.deliverMemberInvitationEmail(
      createDeliveryPayload(authClient),
    )

    expect(deliveryMethod).toBe('invite-email')
    expect(inviteUserByEmailMock).toHaveBeenCalledTimes(1)
    expect(signInWithOtpMock).not.toHaveBeenCalled()
  })

  it('已注册邮箱应退化为发送登录链接', async () => {
    const { authClient, signInWithOtpMock } = createInvitationAuthClientMock({
      inviteError: {
        code: 'user_already_exists',
        message: 'A user with this email address has already been registered',
        status: 422,
      },
    })

    const deliveryMethod = await __memberManagementApiTestables.deliverMemberInvitationEmail(
      createDeliveryPayload(authClient),
    )

    expect(deliveryMethod).toBe('magic-link')
    expect(signInWithOtpMock).toHaveBeenCalledWith({
      email: 'member@example.com',
      options: expect.objectContaining({
        emailRedirectTo: 'http://localhost:3000/auth/callback',
        shouldCreateUser: false,
      }),
    })
  })

  it('已注册邮箱若登录链接发送失败，仍应保留手动登录接收邀请路径', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    const { authClient } = createInvitationAuthClientMock({
      inviteError: {
        code: 'user_already_exists',
        message: 'A user with this email address has already been registered',
        status: 422,
      },
      magicLinkError: {
        code: 'email_address_not_authorized',
        message: 'Email link cannot be sent for this account',
        status: 400,
      },
    })

    const deliveryMethod = await __memberManagementApiTestables.deliverMemberInvitationEmail(
      createDeliveryPayload(authClient),
    )

    expect(deliveryMethod).toBe('manual-login')
  })

  it('非已注册类错误仍应抛出，避免吞掉真实失败', async () => {
    const { authClient, signInWithOtpMock } = createInvitationAuthClientMock({
      inviteError: {
        code: 'over_email_send_rate_limit',
        message: 'Email rate limit exceeded',
        status: 429,
      },
    })

    await expect(
      __memberManagementApiTestables.deliverMemberInvitationEmail(
        createDeliveryPayload(authClient),
      ),
    ).rejects.toMatchObject({
      code: 'over_email_send_rate_limit',
      message: 'Email rate limit exceeded',
      status: 429,
    })

    expect(signInWithOtpMock).not.toHaveBeenCalled()
  })

  it('成功提示文案应明确 manual-login 场景', () => {
    expect(
      __memberManagementApiTestables.getMemberInvitationSuccessMessage({
        deliveryMethod: 'manual-login',
        isResend: false,
        roleLabel: 'Admin',
      }),
    ).toBe('该邮箱已注册，邀请已创建，对方下次登录后将以 Admin 身份加入。')
  })

  it('应优先提取 plain object 异常中的 message，避免 callback 吞掉真实错误', () => {
    expect(
      __memberManagementApiTestables.getErrorMessageFromUnknown(
        {
          status: 409,
          message: '该平台账号已绑定其他成员，请先解绑后再重试。',
        },
        'Discord 账号绑定失败。',
      ),
    ).toBe('该平台账号已绑定其他成员，请先解绑后再重试。')
  })

  it('应区分正式成员与邀请中的角色更新提示', () => {
    expect(
      __memberManagementApiTestables.getMemberRoleUpdateSuccessMessage({
        memberStatus: 'active',
        role: 'admin',
        email: 'member@example.com',
      }),
    ).toBe('已将 member@example.com 的角色调整为 Admin。')

    expect(
      __memberManagementApiTestables.getMemberRoleUpdateSuccessMessage({
        memberStatus: 'invited',
        role: 'member',
        email: 'invitee@example.com',
      }),
    ).toBe('已将 invitee@example.com 的邀请权限调整为 Member。')
  })

  it('应能识别 Supabase 已注册账号错误', () => {
    expect(
      __memberManagementApiTestables.isExistingRegisteredUserAuthError({
        code: 'user_already_exists',
        message: 'ignored',
      }),
    ).toBe(true)

    expect(
      __memberManagementApiTestables.isExistingRegisteredUserAuthError({
        message: 'A user with this email address has already been registered',
      }),
    ).toBe(true)

    expect(
      __memberManagementApiTestables.isExistingRegisteredUserAuthError({
        code: 'over_email_send_rate_limit',
        message: 'Email rate limit exceeded',
      }),
    ).toBe(false)
  })

  it('应能从请求头提取 Bearer token', () => {
    const request = new Request('http://localhost:3000/api/settings/member-management/accept-invitations', {
      headers: {
        Authorization: 'Bearer token-123',
      },
    })

    expect(__memberManagementApiTestables.getBearerTokenFromRequest(request)).toBe('token-123')
  })

  it('active member 已存在时不应继续显示同邮箱 pending invitation', () => {
    const invitations = __memberManagementApiTestables.filterPendingInvitationsWithoutActiveMembers(
      [
        {
          id: 'member-1',
          company_id: 'company-1',
          user_id: 'user-1',
          email: 'member@example.com',
          role: 'member',
          status: 'active',
          joined_at: '2026-03-10T00:00:00.000Z',
        },
      ],
      [
        {
          id: 'invite-1',
          company_id: 'company-1',
          email: 'member@example.com',
          role: 'member',
          invited_by: 'owner-1',
          status: 'pending',
          expires_at: '2026-03-17T00:00:00.000Z',
          created_at: '2026-03-10T00:00:00.000Z',
        },
        {
          id: 'invite-expired',
          company_id: 'company-1',
          email: 'expired@example.com',
          role: 'member',
          invited_by: 'owner-1',
          status: 'pending',
          expires_at: '2024-03-01T00:00:00.000Z',
          created_at: '2024-02-20T00:00:00.000Z',
        },
        {
          id: 'invite-2',
          company_id: 'company-1',
          email: 'another@example.com',
          role: 'member',
          invited_by: 'owner-1',
          status: 'pending',
          expires_at: '2099-03-17T00:00:00.000Z',
          created_at: '2026-03-10T00:00:00.000Z',
        },
      ],
    )

    expect(invitations.map((invitation) => invitation.id)).toEqual(['invite-2'])
  })

  it('同邮箱成员若绑定到其他账号，应阻止邀请流假成功', async () => {
    const serviceClient = createOrganizationMemberServiceClientMock([
      {
        id: 'member-1',
        company_id: 'company-1',
        user_id: 'legacy-user',
        email: 'member@example.com',
        role: 'member',
        status: 'active',
        joined_at: '2026-03-10T00:00:00.000Z',
      },
    ])

    await expect(
      __memberManagementApiTestables.resolveJoinableOrganizationMemberState({
        serviceClient: serviceClient as never,
        companyId: 'company-1',
        currentUser: {
          id: 'current-user',
          email: 'member@example.com',
        },
        normalizedUserEmail: 'member@example.com',
      }),
    ).rejects.toMatchObject({
      status: 409,
      message: '当前组织已存在同邮箱成员记录，但绑定的是其他账号，请联系管理员清理旧成员后再重试。',
    })
  })

  it('同账号的 inactive 成员记录应走重新激活分支', async () => {
    const serviceClient = createOrganizationMemberServiceClientMock([
      {
        id: 'member-1',
        company_id: 'company-1',
        user_id: 'current-user',
        email: 'member@example.com',
        role: 'member',
        status: 'inactive',
        joined_at: '2026-03-10T00:00:00.000Z',
      },
    ])

    await expect(
      __memberManagementApiTestables.resolveJoinableOrganizationMemberState({
        serviceClient: serviceClient as never,
        companyId: 'company-1',
        currentUser: {
          id: 'current-user',
          email: 'member@example.com',
        },
        normalizedUserEmail: 'member@example.com',
      }),
    ).resolves.toMatchObject({
      kind: 'activate-existing',
      member: {
        id: 'member-1',
      },
    })
  })
})
