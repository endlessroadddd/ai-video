import type { BillingPlanCode } from '@/lib/billing/types'
import { m } from '@/paraglide/messages'

/**
 * 统一从 plan code 映射前端展示名称：
 * - 避免直接消费服务端或共享配置中的静态文案；
 * - 所有浏览器侧展示统一走 i18n。
 */
export function getBillingPlanDisplayName(planCode: BillingPlanCode): string {
  if (planCode === 'free') {
    return m.billing_plan_name_free()
  }

  if (planCode === 'basic') {
    return m.billing_plan_name_basic()
  }

  return m.billing_plan_name_pro()
}
