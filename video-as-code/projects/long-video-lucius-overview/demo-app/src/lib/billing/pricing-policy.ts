import {
  ADMIN_ADDON_MONTHLY_AMOUNT_USD,
  PLATFORM_ADDON_MONTHLY_AMOUNT_USD,
  getBillingPlanConfig,
} from '@/lib/billing/plan-config'
import type { BillingPlanCode } from '@/lib/billing/types'

/**
 * 计算超出 included quota 的 quantity。
 * 统一做 `max(0, current - included)`，避免调用侧重复写边界判断。
 */
export function calculateExtraQuantity(currentCount: number, includedCount: number): number {
  if (currentCount <= includedCount) {
    return 0
  }

  return currentCount - includedCount
}

/**
 * 根据已使用动作数推导 billable overage。
 * 免费版永远不会产生 overage。
 */
export function calculateBillableOverageActions(
  planCode: BillingPlanCode,
  usedActions: number,
): number {
  if (planCode === 'free') {
    return 0
  }

  const planConfig = getBillingPlanConfig(planCode)
  return calculateExtraQuantity(usedActions, planConfig.includedActions)
}

/**
 * 估算当前账期的超额费用。
 * 该函数只处理“已经发生的 overage”，不尝试预测未来使用量。
 */
export function calculateProjectedOverageAmountUsd(
  planCode: BillingPlanCode,
  billableOverageActions: number,
): number {
  const planConfig = getBillingPlanConfig(planCode)

  if (!planConfig.supportsOverage || !planConfig.overageUnitAmountUsd) {
    return 0
  }

  return roundUsdAmount(planConfig.overageUnitAmountUsd * billableOverageActions)
}

/**
 * 计算月度预计账单。
 * 这里采用“基础月费 + add-on + 当前已产生 overage”的简单口径，便于 Billing Summary 先行落地。
 */
export function calculateProjectedMonthlyChargeUsd(payload: {
  planCode: BillingPlanCode
  extraAdminCount: number
  extraPlatformCount: number
  projectedOverageAmountUsd: number
}): number {
  const { planCode, extraAdminCount, extraPlatformCount, projectedOverageAmountUsd } = payload
  const planConfig = getBillingPlanConfig(planCode)

  /**
   * 免费版不支持任何 add-on 与 overage 计费。
   * 即使当前公司实际接入了多个平台或管理员超过建议默认值，预计账单也必须保持为 0。
   */
  if (planCode === 'free') {
    return 0
  }

  const baseAmount = planConfig.baseMonthlyAmountUsd
  const adminAddonAmount = extraAdminCount * ADMIN_ADDON_MONTHLY_AMOUNT_USD
  const platformAddonAmount = extraPlatformCount * PLATFORM_ADDON_MONTHLY_AMOUNT_USD

  return roundUsdAmount(baseAmount + adminAddonAmount + platformAddonAmount + projectedOverageAmountUsd)
}

/**
 * 用于百分比展示的安全函数。
 * included 为 0 时直接回 0，避免界面出现 `Infinity%`。
 */
export function calculateUsagePercent(usedAmount: number, includedAmount: number): number {
  if (includedAmount <= 0) {
    return 0
  }

  return Math.min(999, Math.round((usedAmount / includedAmount) * 100))
}

/**
 * 所有金额统一做两位小数收口，避免浮点数精度污染 UI。
 */
export function roundUsdAmount(amount: number): number {
  return Math.round(amount * 100) / 100
}
