/**
 * Billing 计划代码。
 * 与需求文档中冻结的 `free / basic / pro` 保持一致，避免前后端出现别名漂移。
 */
export type BillingPlanCode = 'free' | 'basic' | 'pro'

/**
 * 付费超额模式。
 * - `stop_service`: 达量后停止新的 billable action。
 * - `auto_charge`: 允许继续使用，并在账期末自动结算超额。
 */
export type BillingOverageMode = 'stop_service' | 'auto_charge'

/**
 * Billing 页面展示态。
 * 当前优先覆盖 v1 Summary 页面真正会遇到的状态集合。
 */
export type BillingDisplayState =
  | 'free_active'
  | 'free_limit_reached'
  | 'basic_trial'
  | 'basic_active'
  | 'basic_canceling'
  | 'pro_trial'
  | 'pro_active'
  | 'pro_canceling'
  | 'promo_only_basic'
  | 'past_due'
  | 'expired'

/**
 * Billing 动作可见性。
 * 页面不直接根据 plan/status 重新推导按钮，而是统一消费服务端返回结果。
 */
export type BillingActions = {
  canStartTrial: boolean
  canUpgrade: boolean
  canDowngrade: boolean
  canCancel: boolean
  canResume: boolean
  canRedeem: boolean
  canOpenPortal: boolean
  canChangeOverageMode: boolean
}

/**
 * 单个计划的固定配置。
 * 所有与价格、included quota、Stripe lookup key 相关的常量均从这里读取。
 */
export type BillingPlanConfig = {
  planCode: BillingPlanCode
  displayName: string
  baseMonthlyAmountUsd: number
  includedActions: number
  includedAdmins: number
  includedPlatforms: number
  supportsTrial: boolean
  supportsOverage: boolean
  overageUnitAmountUsd: number | null
  stripeBaseLookupKey: string | null
  stripeOverageLookupKey: string | null
}

/**
 * Billing Summary 是设置页的单一真源。
 * 页面所有状态、CTA、统计卡片都依赖这个结构，避免每个组件各自拼装数据。
 */
export type BillingSummary = {
  billingAccountId: string
  planCode: BillingPlanCode
  planName: string
  stripeStatus: string | null
  billingAccountStatus: string
  displayState: BillingDisplayState
  overageMode: BillingOverageMode
  overageSpendCapUsd: number | null
  includedActions: number
  usedActions: number
  blockedActions: number
  billableOverageActions: number
  projectedOverageAmountUsd: number
  projectedMonthlyChargeUsd: number
  includedAdmins: number
  currentBillableAdminCount: number
  extraAdminCount: number
  includedPlatforms: number
  currentPlatformCount: number
  extraPlatformCount: number
  trialEndAt: string | null
  currentPeriodStartAt: string | null
  currentPeriodEndAt: string | null
  nextBillingAt: string | null
  periodKey: string | null
  hardLimitReachedAt: string | null
  cancelAtPeriodEnd: boolean
  actions: BillingActions
}

/**
 * Stripe 官方账单的前端展示模型。
 * 仅保留列表展示与“查看/下载”真正需要的字段，避免把 Stripe 原始对象直接暴露给页面。
 */
export type BillingInvoice = {
  id: string
  number: string | null
  status: string | null
  currency: string
  totalAmount: number
  hostedInvoiceUrl: string | null
  invoicePdfUrl: string | null
  receiptUrl: string | null
  createdAt: string
  paidAt: string | null
  periodStartAt: string | null
  periodEndAt: string | null
}

/**
 * 设置页发起 Checkout 的请求体。
 */
export type CreateBillingCheckoutSessionPayload = {
  companyId: string
  targetPlanCode: Exclude<BillingPlanCode, 'free'>
  entryPoint: 'settings_billing'
}

/**
 * Billing usage policy 的更新请求体。
 */
export type UpdateBillingUsagePolicyPayload = {
  companyId: string
  overageMode: BillingOverageMode
  overageSpendCapUsd: number | null
}

export type CreateBillingCheckoutSessionResponse = {
  checkoutUrl: string
}

export type CreateBillingPortalSessionPayload = {
  companyId: string
}

export type CreateBillingPortalSessionResponse = {
  portalUrl: string
}

export type ListBillingInvoicesResponse = {
  invoices: BillingInvoice[]
}
