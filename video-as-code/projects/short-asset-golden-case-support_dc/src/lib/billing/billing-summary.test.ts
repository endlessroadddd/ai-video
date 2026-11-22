import { describe, expect, it } from 'vitest'

import {
  composeBillingSummary,
  createMonthlyBillingPeriodKey,
  createMonthlyBillingPeriodWindow,
  deriveBillingActions,
  deriveBillingDisplayState,
} from '@/lib/billing/billing-summary'

describe('billing-summary', () => {
  it('自然月 period key 采用 UTC 年月', () => {
    expect(createMonthlyBillingPeriodKey(new Date('2026-03-10T08:00:00.000Z'))).toBe('2026-03')
  })

  it('自然月账期边界正确落到月初与下月月初', () => {
    expect(createMonthlyBillingPeriodWindow(new Date('2026-03-10T08:00:00.000Z'))).toEqual({
      periodKey: '2026-03',
      periodStartAt: '2026-03-01T00:00:00.000Z',
      periodEndAt: '2026-04-01T00:00:00.000Z',
    })
  })

  it('免费版达量后进入 free_limit_reached', () => {
    expect(
      deriveBillingDisplayState({
        planCode: 'free',
        billingAccountStatus: 'active',
        stripeStatus: null,
        usedActions: 500,
        includedActions: 500,
        cancelAtPeriodEnd: false,
      }),
    ).toBe('free_limit_reached')
  })

  it('付费试用态优先展示为 trial', () => {
    expect(
      deriveBillingDisplayState({
        planCode: 'basic',
        billingAccountStatus: 'active',
        stripeStatus: 'trialing',
        usedActions: 100,
        includedActions: 5000,
        cancelAtPeriodEnd: false,
      }),
    ).toBe('basic_trial')
  })

  it('根据展示态推导 CTA 权限', () => {
    expect(deriveBillingActions('basic_canceling')).toEqual({
      canStartTrial: false,
      canUpgrade: true,
      canDowngrade: false,
      canCancel: false,
      canResume: true,
      canRedeem: true,
      canOpenPortal: true,
      canChangeOverageMode: true,
    })
  })

  it('组合完整 summary 时会自动计算 add-on 与预计账单', () => {
    const summary = composeBillingSummary({
      billingAccountId: 'billing-account-id',
      planCode: 'basic',
      billingAccountStatus: 'active',
      stripeStatus: 'active',
      overageMode: 'auto_charge',
      overageSpendCapUsd: 500,
      includedActions: 5000,
      usedActions: 5100,
      blockedActions: 0,
      includedAdmins: 3,
      currentBillableAdminCount: 5,
      includedPlatforms: 1,
      currentPlatformCount: 2,
      trialEndAt: null,
      currentPeriodStartAt: '2026-03-01T00:00:00.000Z',
      currentPeriodEndAt: '2026-04-01T00:00:00.000Z',
      nextBillingAt: '2026-04-01T00:00:00.000Z',
      periodKey: '2026-03',
      hardLimitReachedAt: null,
      cancelAtPeriodEnd: false,
    })

    expect(summary.displayState).toBe('basic_active')
    expect(summary.extraAdminCount).toBe(2)
    expect(summary.extraPlatformCount).toBe(1)
    expect(summary.billableOverageActions).toBe(100)
    expect(summary.projectedOverageAmountUsd).toBe(12)
    expect(summary.projectedMonthlyChargeUsd).toBe(408)
  })
})
