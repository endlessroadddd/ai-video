import { describe, expect, it } from 'vitest'

import {
  DEFAULT_AUTHENTICATED_PATH,
  ONBOARDING_COMPANY_PROFILE_PATH,
  ONBOARDING_PROFILE_PATH,
  resolveActiveCompany,
  resolveAuthenticatedEntryFromContext,
} from '@/lib/services/auth-entry'
import type { CompanyOnboardingProgress } from '@/lib/services/company-onboarding-progress'
import type { UserCompany } from '@/lib/services/company-membership-query'

function createUserCompany(overrides: Partial<UserCompany> = {}): UserCompany {
  return {
    companyId: '11111111-1111-4111-8111-111111111111',
    companyName: 'Lucius',
    logoUrl: null,
    memberRole: 'owner',
    ...overrides,
  }
}

function createProgress(
  overrides: Partial<CompanyOnboardingProgress> = {},
): CompanyOnboardingProgress {
  return {
    companyId: '11111111-1111-4111-8111-111111111111',
    userId: '22222222-2222-4222-8222-222222222222',
    status: 'in_progress',
    currentStep: 1,
    companyInfoCompletedAt: null,
    profileCompletedAt: null,
    selectedPlanCode: null,
    billingCycle: null,
    ...overrides,
  }
}

describe('auth-entry', () => {
  it('resolveActiveCompany 应优先返回仍然有效的本地选中公司', () => {
    const firstCompany = createUserCompany({
      companyId: '11111111-1111-4111-8111-111111111111',
      companyName: 'Alpha',
    })
    const secondCompany = createUserCompany({
      companyId: '33333333-3333-4333-8333-333333333333',
      companyName: 'Beta',
    })

    const activeCompany = resolveActiveCompany({
      userCompanies: [firstCompany, secondCompany],
      selectedCompanyId: secondCompany.companyId,
    })

    expect(activeCompany?.companyId).toBe(secondCompany.companyId)
  })

  it('resolveActiveCompany 在本地 company_id 失效时应回退第一家公司', () => {
    const firstCompany = createUserCompany({
      companyId: '11111111-1111-4111-8111-111111111111',
      companyName: 'Alpha',
    })
    const secondCompany = createUserCompany({
      companyId: '33333333-3333-4333-8333-333333333333',
      companyName: 'Beta',
    })

    const activeCompany = resolveActiveCompany({
      userCompanies: [firstCompany, secondCompany],
      selectedCompanyId: '99999999-9999-4999-8999-999999999999',
    })

    expect(activeCompany?.companyId).toBe(firstCompany.companyId)
  })

  it('新用户没有任何公司时应先进入公司 onboarding', () => {
    const resolution = resolveAuthenticatedEntryFromContext({
      activeCompany: null,
      progress: null,
      preferredPath: '/dashboard',
    })

    expect(resolution).toEqual({
      targetPath: ONBOARDING_COMPANY_PROFILE_PATH,
      companyId: null,
      reason: 'missing-company',
    })
  })

  it('邀请链接登录后即使还没有公司也应先回邀请页', () => {
    const resolution = resolveAuthenticatedEntryFromContext({
      activeCompany: null,
      progress: null,
      preferredPath: '/invite/member?token=test-token',
    })

    expect(resolution).toEqual({
      targetPath: '/invite/member?token=test-token',
      companyId: null,
      reason: 'missing-company',
    })
  })

  it('owner 未完成公司资料时应进入公司 onboarding', () => {
    const resolution = resolveAuthenticatedEntryFromContext({
      activeCompany: createUserCompany(),
      progress: null,
      preferredPath: '/settings/general',
    })

    expect(resolution.targetPath).toBe(ONBOARDING_COMPANY_PROFILE_PATH)
    expect(resolution.reason).toBe('complete-company-info')
  })

  it('owner 已完成公司资料但未完成个人资料时应进入 profile onboarding', () => {
    const resolution = resolveAuthenticatedEntryFromContext({
      activeCompany: createUserCompany(),
      progress: createProgress({
        currentStep: 2,
      }),
      preferredPath: '/settings/general',
    })

    expect(resolution.targetPath).toBe(ONBOARDING_PROFILE_PATH)
    expect(resolution.reason).toBe('complete-profile')
  })

  it('受邀成员未完成 onboarding 时应直接进入 profile onboarding', () => {
    const resolution = resolveAuthenticatedEntryFromContext({
      activeCompany: createUserCompany({
        memberRole: 'member',
      }),
      progress: null,
      preferredPath: '/dashboard/knowledge-base',
    })

    expect(resolution.targetPath).toBe(ONBOARDING_PROFILE_PATH)
    expect(resolution.reason).toBe('complete-profile')
  })

  it('已完成 onboarding 时应优先回到原始业务页面', () => {
    const resolution = resolveAuthenticatedEntryFromContext({
      activeCompany: createUserCompany(),
      progress: createProgress({
        status: 'completed',
        currentStep: 2,
      }),
      preferredPath: '/settings/general?tab=team',
    })

    expect(resolution.targetPath).toBe('/settings/general?tab=team')
    expect(resolution.reason).toBe('completed')
  })

  it('已完成 onboarding 时不应再回到 onboarding 路由', () => {
    const resolution = resolveAuthenticatedEntryFromContext({
      activeCompany: createUserCompany(),
      progress: createProgress({
        status: 'completed',
        currentStep: 2,
      }),
      preferredPath: '/onboarding/profile',
    })

    expect(resolution.targetPath).toBe(DEFAULT_AUTHENTICATED_PATH)
    expect(resolution.reason).toBe('completed')
  })
})
