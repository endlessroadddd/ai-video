import { describe, expect, it } from 'vitest'

import {
  resolveCompanyOnboardingRedirectTarget,
  type CompanyOnboardingProgress,
} from '@/lib/services/company-onboarding-progress'

function createProgress(
  overrides: Partial<CompanyOnboardingProgress> = {},
): CompanyOnboardingProgress {
  return {
    companyId: 'company-1',
    userId: 'user-1',
    status: 'completed',
    currentStep: 2,
    companyInfoCompletedAt: null,
    profileCompletedAt: null,
    selectedPlanCode: null,
    billingCycle: null,
    ...overrides,
  }
}

describe('company-onboarding-progress', () => {
  it('允许已完成 onboarding 的用户停留在 dashboard', () => {
    expect(
      resolveCompanyOnboardingRedirectTarget({
        memberRole: 'owner',
        progress: createProgress({
          status: 'completed',
        }),
      }),
    ).toBeNull()
  })

  it('owner 在没有 onboarding 记录时跳回公司资料页', () => {
    expect(
      resolveCompanyOnboardingRedirectTarget({
        memberRole: 'owner',
        progress: null,
      }),
    ).toBe('/onboarding/company-profile')
  })

  it('非 owner 在没有 onboarding 记录时跳回个人资料页', () => {
    expect(
      resolveCompanyOnboardingRedirectTarget({
        memberRole: 'admin',
        progress: null,
      }),
    ).toBe('/onboarding/profile')
  })

  it('owner 完成公司资料后进入个人资料步骤时跳回个人资料页', () => {
    expect(
      resolveCompanyOnboardingRedirectTarget({
        memberRole: 'owner',
        progress: createProgress({
          status: 'in_progress',
          currentStep: 2,
        }),
      }),
    ).toBe('/onboarding/profile')
  })

  it('owner 在第一步未完成时跳回公司资料页', () => {
    expect(
      resolveCompanyOnboardingRedirectTarget({
        memberRole: 'owner',
        progress: createProgress({
          status: 'in_progress',
          currentStep: 1,
        }),
      }),
    ).toBe('/onboarding/company-profile')
  })

  it('非 owner 未完成 onboarding 时仍然跳回个人资料页', () => {
    expect(
      resolveCompanyOnboardingRedirectTarget({
        memberRole: 'member',
        progress: createProgress({
          status: 'in_progress',
          currentStep: 1,
        }),
      }),
    ).toBe('/onboarding/profile')
  })
})
