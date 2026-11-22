import type { BillingPlanCode, BillingPlanConfig } from '@/lib/billing/types'

/**
 * 固定 add-on 单价。
 * 这些值来自需求文档中的冻结决策，所有展示与 Stripe line item 计算都应复用这里。
 */
export const PLATFORM_ADDON_MONTHLY_AMOUNT_USD = 99
export const ADMIN_ADDON_MONTHLY_AMOUNT_USD = 49
export const BILLING_TRIAL_DAYS = 7

/**
 * Stripe lookup key 在本地也要有默认值。
 * 原因：
 * - 便于无环境变量时做本地开发；
 * - 保证配置缺失时错误信息足够明确。
 */
export const DEFAULT_STRIPE_LOOKUP_KEYS = {
  basicBaseMonthly: 'basic_base_monthly',
  proBaseMonthly: 'pro_base_monthly',
  platformAddonMonthly: 'platform_addon_monthly',
  adminAddonMonthly: 'admin_addon_monthly',
  basicActionOverage: 'basic_action_overage',
  proActionOverage: 'pro_action_overage',
} as const

const BILLING_PLAN_CONFIG_MAP: Readonly<Record<BillingPlanCode, BillingPlanConfig>> = {
  free: {
    planCode: 'free',
    displayName: '免费版',
    baseMonthlyAmountUsd: 0,
    includedActions: 500,
    includedAdmins: 1,
    includedPlatforms: 1,
    supportsTrial: false,
    supportsOverage: false,
    overageUnitAmountUsd: null,
    stripeBaseLookupKey: null,
    stripeOverageLookupKey: null,
  },
  basic: {
    planCode: 'basic',
    displayName: 'Basic',
    baseMonthlyAmountUsd: 199,
    includedActions: 5000,
    includedAdmins: 3,
    includedPlatforms: 1,
    supportsTrial: true,
    supportsOverage: true,
    overageUnitAmountUsd: 0.12,
    stripeBaseLookupKey: DEFAULT_STRIPE_LOOKUP_KEYS.basicBaseMonthly,
    stripeOverageLookupKey: DEFAULT_STRIPE_LOOKUP_KEYS.basicActionOverage,
  },
  pro: {
    planCode: 'pro',
    displayName: 'Pro',
    baseMonthlyAmountUsd: 499,
    includedActions: 20000,
    includedAdmins: 5,
    includedPlatforms: 1,
    supportsTrial: true,
    supportsOverage: true,
    overageUnitAmountUsd: 0.08,
    stripeBaseLookupKey: DEFAULT_STRIPE_LOOKUP_KEYS.proBaseMonthly,
    stripeOverageLookupKey: DEFAULT_STRIPE_LOOKUP_KEYS.proActionOverage,
  },
}

/**
 * 按计划代码读取配置。
 * 保持为函数而不是直接导出对象，方便后续在调用侧统一收口非法输入。
 */
export function getBillingPlanConfig(planCode: BillingPlanCode): BillingPlanConfig {
  return BILLING_PLAN_CONFIG_MAP[planCode]
}

export function listBillingPlanConfigs(): BillingPlanConfig[] {
  return [BILLING_PLAN_CONFIG_MAP.free, BILLING_PLAN_CONFIG_MAP.basic, BILLING_PLAN_CONFIG_MAP.pro]
}
