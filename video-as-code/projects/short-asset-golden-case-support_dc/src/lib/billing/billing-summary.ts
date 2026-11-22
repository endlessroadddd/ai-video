import { getBillingPlanConfig } from '@/lib/billing/plan-config'
import {
  calculateBillableOverageActions,
  calculateExtraQuantity,
  calculateProjectedMonthlyChargeUsd,
  calculateProjectedOverageAmountUsd,
} from '@/lib/billing/pricing-policy'
import type {
  BillingActions,
  BillingDisplayState,
  BillingOverageMode,
  BillingPlanCode,
  BillingSummary,
} from '@/lib/billing/types'

type ComposeBillingSummaryInput = {
  billingAccountId: string
  planCode: BillingPlanCode
  billingAccountStatus: string
  stripeStatus: string | null
  overageMode: BillingOverageMode
  overageSpendCapUsd: number | null
  includedActions: number
  usedActions: number
  blockedActions: number
  billableOverageActions?: number | null
  projectedOverageAmountUsd?: number | null
  includedAdmins: number
  currentBillableAdminCount: number
  includedPlatforms: number
  currentPlatformCount: number
  trialEndAt: string | null
  currentPeriodStartAt: string | null
  currentPeriodEndAt: string | null
  nextBillingAt: string | null
  periodKey: string | null
  hardLimitReachedAt: string | null
  cancelAtPeriodEnd: boolean
}

/**
 * 当前账期 key 统一按自然月生成。
 * v1 先服务于本地 usage period 与前端展示，后续若接入 Stripe period 可以再对齐。
 */
export function createMonthlyBillingPeriodKey(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

/**
 * 返回自然月账期边界。
 * 统一使用 UTC，避免服务端运行时区变化导致 period key 漂移。
 */
export function createMonthlyBillingPeriodWindow(date: Date): {
  periodKey: string
  periodStartAt: string
  periodEndAt: string
} {
  const periodKey = createMonthlyBillingPeriodKey(date)
  const periodStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 0, 0, 0, 0))
  const periodEnd = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1, 0, 0, 0, 0))

  return {
    periodKey,
    periodStartAt: periodStart.toISOString(),
    periodEndAt: periodEnd.toISOString(),
  }
}

/**
 * 把 Stripe / 本地状态折叠成 Billing 页面展示态。
 * 这里集中处理状态机，避免前端各个角落根据字符串拼条件分支。
 */
export function deriveBillingDisplayState(payload: {
  planCode: BillingPlanCode
  billingAccountStatus: string
  stripeStatus: string | null
  usedActions: number
  includedActions: number
  cancelAtPeriodEnd: boolean
}): BillingDisplayState {
  const {
    planCode,
    billingAccountStatus,
    stripeStatus,
    usedActions,
    includedActions,
    cancelAtPeriodEnd,
  } = payload

  if (billingAccountStatus === 'promo_only_basic') {
    return 'promo_only_basic'
  }

  if (billingAccountStatus === 'expired') {
    return 'expired'
  }

  if (stripeStatus === 'past_due' || stripeStatus === 'unpaid' || billingAccountStatus === 'past_due') {
    return 'past_due'
  }

  if (planCode === 'free') {
    return usedActions >= includedActions ? 'free_limit_reached' : 'free_active'
  }

  if (stripeStatus === 'trialing') {
    return planCode === 'basic' ? 'basic_trial' : 'pro_trial'
  }

  if (cancelAtPeriodEnd) {
    return planCode === 'basic' ? 'basic_canceling' : 'pro_canceling'
  }

  return planCode === 'basic' ? 'basic_active' : 'pro_active'
}

/**
 * Billing CTA 规则同样集中维护。
 * 页面只负责渲染，不再自己猜测“当前能做什么”。
 */
export function deriveBillingActions(displayState: BillingDisplayState): BillingActions {
  switch (displayState) {
    case 'free_active':
    case 'free_limit_reached':
      return {
        canStartTrial: true,
        canUpgrade: true,
        canDowngrade: false,
        canCancel: false,
        canResume: false,
        canRedeem: true,
        canOpenPortal: false,
        canChangeOverageMode: false,
      }
    case 'basic_trial':
    case 'basic_active':
      return {
        canStartTrial: false,
        canUpgrade: true,
        canDowngrade: false,
        canCancel: true,
        canResume: false,
        canRedeem: true,
        canOpenPortal: true,
        canChangeOverageMode: true,
      }
    case 'basic_canceling':
      return {
        canStartTrial: false,
        canUpgrade: true,
        canDowngrade: false,
        canCancel: false,
        canResume: true,
        canRedeem: true,
        canOpenPortal: true,
        canChangeOverageMode: true,
      }
    case 'pro_trial':
    case 'pro_active':
      return {
        canStartTrial: false,
        canUpgrade: false,
        canDowngrade: true,
        canCancel: true,
        canResume: false,
        canRedeem: true,
        canOpenPortal: true,
        canChangeOverageMode: true,
      }
    case 'pro_canceling':
      return {
        canStartTrial: false,
        canUpgrade: false,
        canDowngrade: true,
        canCancel: false,
        canResume: true,
        canRedeem: true,
        canOpenPortal: true,
        canChangeOverageMode: true,
      }
    case 'promo_only_basic':
      return {
        canStartTrial: false,
        canUpgrade: true,
        canDowngrade: false,
        canCancel: false,
        canResume: false,
        canRedeem: true,
        canOpenPortal: false,
        canChangeOverageMode: false,
      }
    case 'past_due':
      return {
        canStartTrial: false,
        canUpgrade: false,
        canDowngrade: false,
        canCancel: false,
        canResume: false,
        canRedeem: true,
        canOpenPortal: true,
        canChangeOverageMode: false,
      }
    case 'expired':
      return {
        canStartTrial: true,
        canUpgrade: true,
        canDowngrade: false,
        canCancel: false,
        canResume: false,
        canRedeem: true,
        canOpenPortal: false,
        canChangeOverageMode: false,
      }
  }
}

/**
 * 组装完整 Billing Summary。
 * 服务端只要准备好最小原始数据，就可以通过这个纯函数输出稳定结构。
 */
export function composeBillingSummary(input: ComposeBillingSummaryInput): BillingSummary {
  const planConfig = getBillingPlanConfig(input.planCode)
  const extraAdminCount = calculateExtraQuantity(
    input.currentBillableAdminCount,
    input.includedAdmins,
  )
  const extraPlatformCount = calculateExtraQuantity(
    input.currentPlatformCount,
    input.includedPlatforms,
  )

  const billableOverageActions =
    input.billableOverageActions ??
    calculateBillableOverageActions(input.planCode, input.usedActions)
  const projectedOverageAmountUsd =
    input.projectedOverageAmountUsd ??
    calculateProjectedOverageAmountUsd(input.planCode, billableOverageActions)

  const displayState = deriveBillingDisplayState({
    planCode: input.planCode,
    billingAccountStatus: input.billingAccountStatus,
    stripeStatus: input.stripeStatus,
    usedActions: input.usedActions,
    includedActions: input.includedActions,
    cancelAtPeriodEnd: input.cancelAtPeriodEnd,
  })

  return {
    billingAccountId: input.billingAccountId,
    planCode: input.planCode,
    planName: planConfig.displayName,
    stripeStatus: input.stripeStatus,
    billingAccountStatus: input.billingAccountStatus,
    displayState,
    overageMode: input.overageMode,
    overageSpendCapUsd: input.overageSpendCapUsd,
    includedActions: input.includedActions,
    usedActions: input.usedActions,
    blockedActions: input.blockedActions,
    billableOverageActions,
    projectedOverageAmountUsd,
    projectedMonthlyChargeUsd: calculateProjectedMonthlyChargeUsd({
      planCode: input.planCode,
      extraAdminCount,
      extraPlatformCount,
      projectedOverageAmountUsd,
    }),
    includedAdmins: input.includedAdmins,
    currentBillableAdminCount: input.currentBillableAdminCount,
    extraAdminCount,
    includedPlatforms: input.includedPlatforms,
    currentPlatformCount: input.currentPlatformCount,
    extraPlatformCount,
    trialEndAt: input.trialEndAt,
    currentPeriodStartAt: input.currentPeriodStartAt,
    currentPeriodEndAt: input.currentPeriodEndAt,
    nextBillingAt: input.nextBillingAt,
    periodKey: input.periodKey,
    hardLimitReachedAt: input.hardLimitReachedAt,
    cancelAtPeriodEnd: input.cancelAtPeriodEnd,
    actions: deriveBillingActions(displayState),
  }
}
