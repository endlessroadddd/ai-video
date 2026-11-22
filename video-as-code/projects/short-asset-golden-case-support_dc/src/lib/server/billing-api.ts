import { createHash, randomUUID } from 'node:crypto'

import type { SupabaseClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

import { BILLING_TRIAL_DAYS, getBillingPlanConfig } from '@/lib/billing/plan-config'
import {
  composeBillingSummary,
  createMonthlyBillingPeriodWindow,
} from '@/lib/billing/billing-summary'
import { calculateBillableOverageActions, calculateProjectedOverageAmountUsd } from '@/lib/billing/pricing-policy'
import { getStripeBillingEnvOrNull, getStripeClient, getRequiredStripeBillingEnv } from '@/lib/billing/stripe-client'
import { getStripePriceByLookupKey } from '@/lib/billing/stripe-price'
import type {
  BillingInvoice,
  BillingOverageMode,
  BillingPlanCode,
  BillingSummary,
  CreateBillingCheckoutSessionPayload,
  CreateBillingPortalSessionPayload,
  UpdateBillingUsagePolicyPayload,
} from '@/lib/billing/types'
import { createSupabaseServerClientForRequest, createSupabaseServiceRoleClient } from '@/lib/supabase/server'

type ApiError = {
  status: number
  message: string
}

type SupabaseErrorLike = {
  code?: string | null
  message?: string | null
}

type AuthenticatedUser = {
  id: string
  email: string | null
}

type MembershipRow = {
  role?: 'owner' | 'admin' | 'member' | null
}

type BillingAccountRow = {
  id: string
  owner_type?: string | null
  owner_id?: string | null
  company_id?: string | null
  plan_code?: string | null
  plan_source?: string | null
  status?: string | null
  stripe_customer_id?: string | null
  overage_mode?: string | null
  overage_spend_cap_usd?: number | string | null
  included_actions?: number | null
  included_admins?: number | null
  included_platforms?: number | null
  current_billable_admin_count?: number | null
  current_platform_count?: number | null
  created_by?: string | null
  created_at?: string | null
  updated_at?: string | null
}

type BillingUsagePeriodRow = {
  id: string
  billing_account_id?: string | null
  period_key?: string | null
  period_start_at?: string | null
  period_end_at?: string | null
  plan_code?: string | null
  included_actions?: number | null
  used_actions?: number | null
  blocked_actions?: number | null
  billable_overage_actions?: number | null
  projected_overage_amount_usd?: number | string | null
  overage_mode?: string | null
  hard_limit_reached_at?: string | null
}

type BillingSubscriptionRow = {
  id: string
  billing_account_id?: string | null
  stripe_subscription_id?: string | null
  stripe_schedule_id?: string | null
  plan_code?: string | null
  stripe_status?: string | null
  cancel_at_period_end?: boolean | null
  trial_end_at?: string | null
  current_period_start_at?: string | null
  current_period_end_at?: string | null
  next_billing_at?: string | null
}

type BillingCheckoutSessionRow = {
  stripe_checkout_session_id: string
  billing_account_id?: string | null
  target_plan_code?: string | null
  status?: string | null
  raw_snapshot?: unknown
  updated_at?: string | null
}

type BillingCheckoutFingerprintPayload = {
  billingAccountId: string
  companyId: string
  stripeCustomerId: string
  targetPlanCode: string
  entryPoint: string
  successUrl: string
  cancelUrl: string
  lineItems: Array<{
    price: string
    quantity: number
  }>
  overageMode: BillingOverageMode
  overageSpendCapUsd: number | null
  trialPeriodDays: number
}

type ReusableBillingCheckoutSessionResult = {
  checkoutUrl: string | null
  hasMatchingFingerprint: boolean
}

type StripeBillingSubscriptionItemInsert = {
  billing_subscription_id: string
  stripe_subscription_item_id: string
  item_code: string
  lookup_key: string | null
  quantity: number | null
  meter_code: string | null
  unit_amount: number | null
  raw_snapshot: Stripe.SubscriptionItem
  updated_at: string
}

type CompanyBillingCounts = {
  currentBillableAdminCount: number
  currentPlatformCount: number
}

const UUID_REGEX: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function createApiError(status: number, message: string): ApiError {
  return {
    status,
    message,
  }
}

/**
 * 把 Supabase / PostgREST 的底层错误转成可执行的修复提示。
 *
 * 这里重点处理自定义 schema 场景：
 * - `Invalid schema: billing` 往往不是表不存在，而是 Data API 没暴露该 schema；
 * - 如果 Dashboard 已经加过 exposed schema，但仍然报同样错误，通常说明
 *   `authenticator` 角色上还残留旧的 `pgrst.db_schemas` 覆盖配置。
 */
function toReadableSupabaseErrorMessage(error: SupabaseErrorLike): string {
  const errorCode = (error.code || '').trim()
  const errorMessage = (error.message || '').trim()

  if (errorCode === 'PGRST106' && errorMessage.includes('Invalid schema: billing')) {
    return [
      'Supabase API 尚未暴露 schema `billing`。',
      '请先在 Dashboard -> Project Settings -> API -> Exposed schemas 中加入 `billing`。',
      '如果已经添加过但仍报同样错误，说明 `authenticator` 角色上仍有旧的 `pgrst.db_schemas` 覆盖配置，需要把 `billing` 加进去，或先执行 `ALTER ROLE authenticator RESET pgrst.db_schemas;` 后再重试。',
    ].join('')
  }

  if (errorCode === '42501' && errorMessage.toLowerCase().includes('permission denied for schema')) {
    const schemaMatch = /schema\s+([a-z0-9_]+)/i.exec(errorMessage)
    const schemaName = schemaMatch?.[1] || '目标'

    return `当前角色没有 \`${schemaName}\` schema 的访问权限，请补齐 schema usage 和表级授权后再重试。`
  }

  return errorMessage || 'unknown error'
}

function createSupabaseApiError(status: number, prefix: string, error: SupabaseErrorLike): ApiError {
  return createApiError(status, `${prefix}：${toReadableSupabaseErrorMessage(error)}`)
}

function isUuid(value: string): boolean {
  return UUID_REGEX.test(value)
}

function normalizePlanCode(value: string | null | undefined): BillingPlanCode {
  if (value === 'free' || value === 'basic' || value === 'pro') {
    return value
  }

  throw createApiError(500, `发现未知 plan_code：${value || 'empty'}`)
}

function normalizeOverageMode(value: string | null | undefined): BillingOverageMode {
  if (value === 'auto_charge' || value === 'stop_service') {
    return value
  }

  return 'stop_service'
}

function parseNumericValue(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function formatIsoDateFromStripeTimestamp(timestamp?: number | null): string | null {
  if (!timestamp) {
    return null
  }

  return new Date(timestamp * 1000).toISOString()
}

/**
 * 当前 Lucius 的 Stripe Billing 统一按 USD 计费，金额单位都是 cent。
 * 这里集中转成前端展示所需的主单位金额，避免各调用侧重复处理。
 */
function convertStripeAmountToUsd(amountInCents: number | null | undefined): number {
  if (!amountInCents) {
    return 0
  }

  return Math.round(amountInCents) / 100
}

function readStripeInvoiceReceiptUrl(invoice: Stripe.Invoice): string | null {
  if (!invoice.charge || typeof invoice.charge === 'string') {
    return null
  }

  return invoice.charge.receipt_url || null
}

/**
 * 把 Stripe 原始 invoice 对象压平为页面真正需要的字段。
 * 页面只消费 hosted invoice / PDF / receipt 等稳定出口，不直接依赖 Stripe 全量结构。
 */
function mapStripeInvoiceToBillingInvoice(invoice: Stripe.Invoice): BillingInvoice {
  return {
    id: invoice.id,
    number: invoice.number?.trim() || null,
    status: invoice.status || null,
    currency: (invoice.currency || 'usd').toUpperCase(),
    totalAmount: convertStripeAmountToUsd(invoice.total),
    hostedInvoiceUrl: invoice.hosted_invoice_url || null,
    invoicePdfUrl: invoice.invoice_pdf || null,
    receiptUrl: readStripeInvoiceReceiptUrl(invoice),
    createdAt: formatIsoDateFromStripeTimestamp(invoice.created) || new Date(0).toISOString(),
    paidAt: formatIsoDateFromStripeTimestamp(invoice.status_transitions?.paid_at),
    periodStartAt: formatIsoDateFromStripeTimestamp(invoice.period_start),
    periodEndAt: formatIsoDateFromStripeTimestamp(invoice.period_end),
  }
}

function resolveAppBaseUrl(request: Request): string {
  const configuredAppUrl = process.env.APP_URL?.trim()
  if (configuredAppUrl) {
    return configuredAppUrl.replace(/\/$/, '')
  }

  return new URL(request.url).origin
}

async function parseRequestJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T
  } catch {
    throw createApiError(400, '请求体必须是合法 JSON。')
  }
}

/**
 * 当前所有 Billing API 都要求登录态。
 * Webhook 是唯一例外，因此它不走这个 helper。
 */
async function requireAuthenticatedUser(request: Request): Promise<AuthenticatedUser> {
  const supabase = createSupabaseServerClientForRequest(request, new Headers())
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user?.id) {
    throw createApiError(401, '登录已失效，请重新登录后再试。')
  }

  return {
    id: user.id,
    email: user.email?.trim().toLowerCase() || null,
  }
}

/**
 * 读取当前用户在目标公司下的角色。
 * 所有 Billing 读接口要求成员身份，写接口要求 owner/admin。
 */
async function requireCompanyMembership(
  serviceClient: SupabaseClient,
  payload: {
    companyId: string
    userId: string
    requireAdmin?: boolean
  },
): Promise<'owner' | 'admin' | 'member'> {
  const { companyId, userId, requireAdmin = false } = payload

  const membershipResult = await serviceClient
    .schema('permission')
    .from('organization_member')
    .select('role')
    .eq('company_id', companyId)
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle<MembershipRow>()

  if (membershipResult.error) {
    throw createSupabaseApiError(500, '读取公司成员关系失败', membershipResult.error)
  }

  const role = membershipResult.data?.role || null
  if (!role) {
    throw createApiError(403, '你当前不在该公司成员列表中。')
  }

  if (requireAdmin && role !== 'owner' && role !== 'admin') {
    throw createApiError(403, '只有管理员可以修改 Billing 设置。')
  }

  return role
}

async function readCompanyBillingCounts(
  serviceClient: SupabaseClient,
  companyId: string,
): Promise<CompanyBillingCounts> {
  const adminCountPromise = serviceClient
    .schema('permission')
    .from('organization_member')
    .select('id', {
      count: 'exact',
      head: true,
    })
    .eq('company_id', companyId)
    .eq('status', 'active')
    .in('role', ['owner', 'admin'])

  const discordConnectedPromise = serviceClient
    .schema('discord')
    .from('guild')
    .select('id', {
      count: 'exact',
      head: true,
    })
    .eq('company_id', companyId)

  const slackConnectedPromise = serviceClient
    .schema('slack')
    .from('workspace')
    .select('id', {
      count: 'exact',
      head: true,
    })
    .eq('company_id', companyId)

  const feishuConnectedPromise = serviceClient
    .schema('feishu')
    .from('tenant')
    .select('id', {
      count: 'exact',
      head: true,
    })
    .eq('company_id', companyId)

  const telegramConnectedPromise = serviceClient
    .schema('telegram')
    .from('channel')
    .select('id', {
      count: 'exact',
      head: true,
    })
    .eq('company_id', companyId)

  const [
    adminCountResult,
    discordConnectedResult,
    slackConnectedResult,
    feishuConnectedResult,
    telegramConnectedResult,
  ] = await Promise.all([
    adminCountPromise,
    discordConnectedPromise,
    slackConnectedPromise,
    feishuConnectedPromise,
    telegramConnectedPromise,
  ])

  const countErrors = [
    adminCountResult.error,
    discordConnectedResult.error,
    slackConnectedResult.error,
    feishuConnectedResult.error,
    telegramConnectedResult.error,
  ].filter(Boolean)

  if (countErrors.length > 0) {
    throw createApiError(
      500,
      `读取 Billing 统计失败：${countErrors.map((error) => error?.message || 'unknown error').join('；')}`,
    )
  }

  const platformCount = [
    discordConnectedResult.count || 0,
    slackConnectedResult.count || 0,
    feishuConnectedResult.count || 0,
    telegramConnectedResult.count || 0,
  ].filter((count) => count > 0).length

  return {
    currentBillableAdminCount: adminCountResult.count || 0,
    currentPlatformCount: platformCount,
  }
}

/**
 * 对公司自动创建 / 同步 billing_account。
 * 这样即使历史公司从未进入过 Billing 页面，也能首次打开时立即看到 free plan 摘要。
 */
async function ensureBillingAccountForCompany(
  serviceClient: SupabaseClient,
  payload: {
    companyId: string
    createdByUserId: string
  },
): Promise<BillingAccountRow> {
  const { companyId, createdByUserId } = payload
  const counts = await readCompanyBillingCounts(serviceClient, companyId)

  const existingAccountResult = await serviceClient
    .schema('billing')
    .from('billing_account')
    .select(
      'id, owner_type, owner_id, company_id, plan_code, plan_source, status, stripe_customer_id, overage_mode, overage_spend_cap_usd, included_actions, included_admins, included_platforms, current_billable_admin_count, current_platform_count, created_by, created_at, updated_at',
    )
    .eq('owner_type', 'company')
    .eq('owner_id', companyId)
    .maybeSingle<BillingAccountRow>()

  if (existingAccountResult.error) {
    throw createSupabaseApiError(500, '读取 billing_account 失败', existingAccountResult.error)
  }

  const nowIsoString = new Date().toISOString()

  if (!existingAccountResult.data) {
    const freePlanConfig = getBillingPlanConfig('free')
    const createAccountResult = await serviceClient
      .schema('billing')
      .from('billing_account')
      .insert({
        owner_type: 'company',
        owner_id: companyId,
        company_id: companyId,
        plan_code: freePlanConfig.planCode,
        plan_source: 'system_default',
        status: 'active',
        overage_mode: 'stop_service',
        included_actions: freePlanConfig.includedActions,
        included_admins: freePlanConfig.includedAdmins,
        included_platforms: freePlanConfig.includedPlatforms,
        current_billable_admin_count: counts.currentBillableAdminCount,
        current_platform_count: counts.currentPlatformCount,
        created_by: createdByUserId,
        created_at: nowIsoString,
        updated_at: nowIsoString,
      })
      .select(
        'id, owner_type, owner_id, company_id, plan_code, plan_source, status, stripe_customer_id, overage_mode, overage_spend_cap_usd, included_actions, included_admins, included_platforms, current_billable_admin_count, current_platform_count, created_by, created_at, updated_at',
      )
      .single<BillingAccountRow>()

    if (createAccountResult.error || !createAccountResult.data) {
      throw createApiError(
        500,
        `创建 billing_account 失败：${createAccountResult.error?.message || 'unknown error'}`,
      )
    }

    return createAccountResult.data
  }

  const planCode = normalizePlanCode(existingAccountResult.data.plan_code)
  const planConfig = getBillingPlanConfig(planCode)

  const syncAccountResult = await serviceClient
    .schema('billing')
    .from('billing_account')
    .update({
      included_actions: planConfig.includedActions,
      included_admins: planConfig.includedAdmins,
      included_platforms: planConfig.includedPlatforms,
      current_billable_admin_count: counts.currentBillableAdminCount,
      current_platform_count: counts.currentPlatformCount,
      updated_at: nowIsoString,
    })
    .eq('id', existingAccountResult.data.id)
    .select(
      'id, owner_type, owner_id, company_id, plan_code, plan_source, status, stripe_customer_id, overage_mode, overage_spend_cap_usd, included_actions, included_admins, included_platforms, current_billable_admin_count, current_platform_count, created_by, created_at, updated_at',
    )
    .single<BillingAccountRow>()

  if (syncAccountResult.error || !syncAccountResult.data) {
    throw createApiError(
      500,
      `同步 billing_account 失败：${syncAccountResult.error?.message || 'unknown error'}`,
    )
  }

  return syncAccountResult.data
}

async function ensureCurrentBillingUsagePeriod(
  serviceClient: SupabaseClient,
  billingAccount: BillingAccountRow,
): Promise<BillingUsagePeriodRow> {
  const planCode = normalizePlanCode(billingAccount.plan_code)
  const overageMode = normalizeOverageMode(billingAccount.overage_mode)
  const currentMonthWindow = createMonthlyBillingPeriodWindow(new Date())
  const nowIsoString = new Date().toISOString()

  const existingPeriodResult = await serviceClient
    .schema('billing')
    .from('billing_usage_period')
    .select(
      'id, billing_account_id, period_key, period_start_at, period_end_at, plan_code, included_actions, used_actions, blocked_actions, billable_overage_actions, projected_overage_amount_usd, overage_mode, hard_limit_reached_at',
    )
    .eq('billing_account_id', billingAccount.id)
    .eq('period_key', currentMonthWindow.periodKey)
    .maybeSingle<BillingUsagePeriodRow>()

  if (existingPeriodResult.error) {
    throw createSupabaseApiError(500, '读取 billing_usage_period 失败', existingPeriodResult.error)
  }

  if (!existingPeriodResult.data) {
    const createPeriodResult = await serviceClient
      .schema('billing')
      .from('billing_usage_period')
      .insert({
        billing_account_id: billingAccount.id,
        period_key: currentMonthWindow.periodKey,
        period_start_at: currentMonthWindow.periodStartAt,
        period_end_at: currentMonthWindow.periodEndAt,
        plan_code: planCode,
        included_actions: billingAccount.included_actions || getBillingPlanConfig(planCode).includedActions,
        used_actions: 0,
        blocked_actions: 0,
        billable_overage_actions: 0,
        projected_overage_amount_usd: 0,
        overage_mode: overageMode,
        created_at: nowIsoString,
        updated_at: nowIsoString,
      })
      .select(
        'id, billing_account_id, period_key, period_start_at, period_end_at, plan_code, included_actions, used_actions, blocked_actions, billable_overage_actions, projected_overage_amount_usd, overage_mode, hard_limit_reached_at',
      )
      .single<BillingUsagePeriodRow>()

    if (createPeriodResult.error || !createPeriodResult.data) {
      throw createApiError(
        500,
        `创建 billing_usage_period 失败：${createPeriodResult.error?.message || 'unknown error'}`,
      )
    }

    return createPeriodResult.data
  }

  const calculatedBillableOverageActions = calculateBillableOverageActions(
    planCode,
    existingPeriodResult.data.used_actions || 0,
  )
  const recalculatedProjectedOverageAmountUsd = calculateProjectedOverageAmountUsd(
    planCode,
    calculatedBillableOverageActions,
  )

  const syncPeriodResult = await serviceClient
    .schema('billing')
    .from('billing_usage_period')
    .update({
      plan_code: planCode,
      included_actions: billingAccount.included_actions || getBillingPlanConfig(planCode).includedActions,
      overage_mode: overageMode,
      billable_overage_actions: calculatedBillableOverageActions,
      projected_overage_amount_usd: recalculatedProjectedOverageAmountUsd,
      updated_at: nowIsoString,
    })
    .eq('id', existingPeriodResult.data.id)
    .select(
      'id, billing_account_id, period_key, period_start_at, period_end_at, plan_code, included_actions, used_actions, blocked_actions, billable_overage_actions, projected_overage_amount_usd, overage_mode, hard_limit_reached_at',
    )
    .single<BillingUsagePeriodRow>()

  if (syncPeriodResult.error || !syncPeriodResult.data) {
    throw createApiError(
      500,
      `同步 billing_usage_period 失败：${syncPeriodResult.error?.message || 'unknown error'}`,
    )
  }

  return syncPeriodResult.data
}

async function readLatestBillingSubscription(
  serviceClient: SupabaseClient,
  billingAccountId: string,
): Promise<BillingSubscriptionRow | null> {
  const subscriptionResult = await serviceClient
    .schema('billing')
    .from('billing_subscription')
    .select(
      'id, billing_account_id, stripe_subscription_id, stripe_schedule_id, plan_code, stripe_status, cancel_at_period_end, trial_end_at, current_period_start_at, current_period_end_at, next_billing_at',
    )
    .eq('billing_account_id', billingAccountId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle<BillingSubscriptionRow>()

  if (subscriptionResult.error) {
    throw createSupabaseApiError(500, '读取 billing_subscription 失败', subscriptionResult.error)
  }

  return subscriptionResult.data || null
}

async function buildBillingSummaryForCompany(
  serviceClient: SupabaseClient,
  payload: {
    companyId: string
    createdByUserId: string
  },
): Promise<BillingSummary> {
  const billingAccount = await ensureBillingAccountForCompany(serviceClient, payload)
  const usagePeriod = await ensureCurrentBillingUsagePeriod(serviceClient, billingAccount)
  const latestSubscription = await readLatestBillingSubscription(serviceClient, billingAccount.id)

  return composeBillingSummary({
    billingAccountId: billingAccount.id,
    planCode: normalizePlanCode(billingAccount.plan_code),
    billingAccountStatus: billingAccount.status?.trim() || 'active',
    stripeStatus: latestSubscription?.stripe_status || null,
    overageMode: normalizeOverageMode(billingAccount.overage_mode),
    overageSpendCapUsd: parseNumericValue(billingAccount.overage_spend_cap_usd),
    includedActions:
      usagePeriod.included_actions ||
      billingAccount.included_actions ||
      getBillingPlanConfig(normalizePlanCode(billingAccount.plan_code)).includedActions,
    usedActions: usagePeriod.used_actions || 0,
    blockedActions: usagePeriod.blocked_actions || 0,
    billableOverageActions: usagePeriod.billable_overage_actions || 0,
    projectedOverageAmountUsd: parseNumericValue(usagePeriod.projected_overage_amount_usd) || 0,
    includedAdmins:
      billingAccount.included_admins ||
      getBillingPlanConfig(normalizePlanCode(billingAccount.plan_code)).includedAdmins,
    currentBillableAdminCount: billingAccount.current_billable_admin_count || 0,
    includedPlatforms:
      billingAccount.included_platforms ||
      getBillingPlanConfig(normalizePlanCode(billingAccount.plan_code)).includedPlatforms,
    currentPlatformCount: billingAccount.current_platform_count || 0,
    trialEndAt: latestSubscription?.trial_end_at || null,
    currentPeriodStartAt: usagePeriod.period_start_at || latestSubscription?.current_period_start_at || null,
    currentPeriodEndAt: usagePeriod.period_end_at || latestSubscription?.current_period_end_at || null,
    nextBillingAt: latestSubscription?.next_billing_at || latestSubscription?.current_period_end_at || null,
    periodKey: usagePeriod.period_key || null,
    hardLimitReachedAt: usagePeriod.hard_limit_reached_at || null,
    cancelAtPeriodEnd: Boolean(latestSubscription?.cancel_at_period_end),
  })
}

async function getOrCreateStripeCustomer(
  serviceClient: SupabaseClient,
  payload: {
    billingAccount: BillingAccountRow
    companyId: string
    email: string | null
  },
): Promise<string> {
  const { billingAccount, companyId, email } = payload

  if (billingAccount.stripe_customer_id) {
    return billingAccount.stripe_customer_id
  }

  const stripe = getStripeClient()
  const customer = await stripe.customers.create({
    email: email || undefined,
    metadata: {
      billing_account_id: billingAccount.id,
      company_id: companyId,
      owner_type: 'company',
      owner_id: companyId,
    },
  })

  const nowIsoString = new Date().toISOString()
  const updateCustomerResult = await serviceClient
    .schema('billing')
    .from('billing_account')
    .update({
      stripe_customer_id: customer.id,
      updated_at: nowIsoString,
    })
    .eq('id', billingAccount.id)

  if (updateCustomerResult.error) {
    throw createSupabaseApiError(500, '写入 Stripe Customer 失败', updateCustomerResult.error)
  }

  return customer.id
}

/**
 * Stripe 幂等键必须覆盖真正影响 Checkout Session 的所有关键参数。
 *
 * 如果只用“业务意图”做 key，而把 customer / 回跳地址 / price id 之类动态字段漏掉，
 * 第二次点击时即使业务上仍然是“同一个套餐”，也可能被 Stripe 判定为“同 key 不同参数”。
 */
function buildBillingCheckoutFingerprint(payload: BillingCheckoutFingerprintPayload): string {
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex')
}

function readCheckoutFingerprintFromRawSnapshot(rawSnapshot: unknown): string | null {
  if (!rawSnapshot || typeof rawSnapshot !== 'object') {
    return null
  }

  const metadata =
    'metadata' in rawSnapshot ? (rawSnapshot as { metadata?: unknown }).metadata : null
  if (!metadata || typeof metadata !== 'object') {
    return null
  }

  const fingerprint =
    'checkout_fingerprint' in metadata
      ? (metadata as { checkout_fingerprint?: unknown }).checkout_fingerprint
      : null

  return typeof fingerprint === 'string' && fingerprint.trim() ? fingerprint.trim() : null
}

function isStripeCheckoutSessionReusable(
  checkoutSession: Pick<Stripe.Checkout.Session, 'status' | 'url' | 'expires_at'>,
): boolean {
  if (checkoutSession.status !== 'open') {
    return false
  }

  const checkoutUrl = checkoutSession.url?.trim() || ''
  if (!checkoutUrl) {
    return false
  }

  if (
    typeof checkoutSession.expires_at === 'number' &&
    checkoutSession.expires_at * 1000 <= Date.now()
  ) {
    return false
  }

  return true
}

/**
 * 用户从 Stripe cancel_url 返回后，原 Checkout Session 往往仍然是 open。
 *
 * 这里优先复用同一参数指纹下仍可继续支付的 Session，避免重复创建；
 * 如果只找到历史同指纹但已失效的 Session，调用方会改用新的幂等键重新创建。
 */
async function findReusableBillingCheckoutSession(payload: {
  serviceClient: SupabaseClient
  stripe: Stripe
  billingAccountId: string
  targetPlanCode: string
  checkoutFingerprint: string
}): Promise<ReusableBillingCheckoutSessionResult> {
  const checkoutSessionResult = await payload.serviceClient
    .schema('billing')
    .from('billing_checkout_session')
    .select('stripe_checkout_session_id, billing_account_id, target_plan_code, status, raw_snapshot, updated_at')
    .eq('billing_account_id', payload.billingAccountId)
    .eq('target_plan_code', payload.targetPlanCode)
    .order('updated_at', { ascending: false })
    .limit(10)

  if (checkoutSessionResult.error) {
    throw createSupabaseApiError(500, '读取历史 Checkout Session 失败', checkoutSessionResult.error)
  }

  const checkoutSessions = (checkoutSessionResult.data || []) as BillingCheckoutSessionRow[]
  let hasMatchingFingerprint = false

  for (const checkoutSessionRow of checkoutSessions) {
    if (
      readCheckoutFingerprintFromRawSnapshot(checkoutSessionRow.raw_snapshot) !==
      payload.checkoutFingerprint
    ) {
      continue
    }

    hasMatchingFingerprint = true

    const checkoutSession = await payload.stripe.checkout.sessions.retrieve(
      checkoutSessionRow.stripe_checkout_session_id,
    )

    if (!isStripeCheckoutSessionReusable(checkoutSession)) {
      continue
    }

    return {
      checkoutUrl: checkoutSession.url?.trim() || null,
      hasMatchingFingerprint,
    }
  }

  return {
    checkoutUrl: null,
    hasMatchingFingerprint,
  }
}

function buildSubscriptionItemCode(lookupKey: string | null): string {
  if (!lookupKey) {
    return 'unknown'
  }

  if (lookupKey === 'platform_addon_monthly') {
    return 'platform_addon'
  }

  if (lookupKey === 'admin_addon_monthly') {
    return 'admin_addon'
  }

  if (lookupKey.endsWith('_action_overage')) {
    return 'action_overage'
  }

  if (lookupKey.endsWith('_base_monthly')) {
    return 'base_plan'
  }

  return 'unknown'
}

function parseStripeUnitAmountUsd(price: Stripe.Price): number | null {
  if (typeof price.unit_amount === 'number') {
    return price.unit_amount / 100
  }

  if (!price.unit_amount_decimal) {
    return null
  }

  return Number(price.unit_amount_decimal) / 100
}

function mapStripeSubscriptionStatusToBillingAccountStatus(status: Stripe.Subscription.Status): string {
  if (status === 'past_due' || status === 'unpaid') {
    return 'past_due'
  }

  if (status === 'canceled' || status === 'incomplete_expired') {
    return 'expired'
  }

  return 'active'
}

async function syncStripeSubscriptionSnapshot(
  serviceClient: SupabaseClient,
  subscription: Stripe.Subscription,
): Promise<void> {
  const subscriptionMetadata = subscription.metadata || {}
  const subscriptionWithPeriods = subscription as Stripe.Subscription & {
    current_period_start?: number | null
    current_period_end?: number | null
  }
  const metadataBillingAccountId = subscriptionMetadata.billing_account_id?.trim() || null
  const billingAccountId = metadataBillingAccountId || null

  let billingAccount: BillingAccountRow | null = null

  if (billingAccountId) {
    const accountResult = await serviceClient
      .schema('billing')
      .from('billing_account')
      .select(
        'id, owner_type, owner_id, company_id, plan_code, plan_source, status, stripe_customer_id, overage_mode, overage_spend_cap_usd, included_actions, included_admins, included_platforms, current_billable_admin_count, current_platform_count, created_by, created_at, updated_at',
      )
      .eq('id', billingAccountId)
      .maybeSingle<BillingAccountRow>()

    if (accountResult.error) {
      throw createSupabaseApiError(500, '读取 webhook 对应的 billing_account 失败', accountResult.error)
    }

    billingAccount = accountResult.data || null
  }

  if (!billingAccount && typeof subscription.customer === 'string') {
    const accountByCustomerResult = await serviceClient
      .schema('billing')
      .from('billing_account')
      .select(
        'id, owner_type, owner_id, company_id, plan_code, plan_source, status, stripe_customer_id, overage_mode, overage_spend_cap_usd, included_actions, included_admins, included_platforms, current_billable_admin_count, current_platform_count, created_by, created_at, updated_at',
      )
      .eq('stripe_customer_id', subscription.customer)
      .maybeSingle<BillingAccountRow>()

    if (accountByCustomerResult.error) {
      throw createApiError(
        500,
        `通过 stripe_customer_id 读取 billing_account 失败：${accountByCustomerResult.error.message}`,
      )
    }

    billingAccount = accountByCustomerResult.data || null
  }

  if (!billingAccount) {
    throw createApiError(500, '未找到当前 Stripe Subscription 对应的 billing_account。')
  }

  const planCode = normalizePlanCode(
    subscriptionMetadata.target_plan_code?.trim() || billingAccount.plan_code || 'free',
  )
  const overageMode = normalizeOverageMode(
    subscriptionMetadata.overage_mode?.trim() || billingAccount.overage_mode,
  )
  const planConfig = getBillingPlanConfig(planCode)
  const billingStatus = mapStripeSubscriptionStatusToBillingAccountStatus(subscription.status)
  const nowIsoString = new Date().toISOString()

  const subscriptionUpsertResult = await serviceClient
    .schema('billing')
    .from('billing_subscription')
    .upsert(
      {
        billing_account_id: billingAccount.id,
        stripe_subscription_id: subscription.id,
        stripe_schedule_id:
          typeof subscription.schedule === 'string'
            ? subscription.schedule
            : subscription.schedule?.id || null,
        plan_code: planCode,
        stripe_status: subscription.status,
        cancel_at_period_end: subscription.cancel_at_period_end,
        trial_start_at: formatIsoDateFromStripeTimestamp(subscription.trial_start),
        trial_end_at: formatIsoDateFromStripeTimestamp(subscription.trial_end),
        current_period_start_at: formatIsoDateFromStripeTimestamp(subscriptionWithPeriods.current_period_start),
        current_period_end_at: formatIsoDateFromStripeTimestamp(subscriptionWithPeriods.current_period_end),
        next_billing_at: formatIsoDateFromStripeTimestamp(subscriptionWithPeriods.current_period_end),
        raw_snapshot: subscription,
        updated_at: nowIsoString,
      },
      {
        onConflict: 'stripe_subscription_id',
      },
    )
    .select('id')
    .single<{ id: string }>()

  if (subscriptionUpsertResult.error || !subscriptionUpsertResult.data?.id) {
    throw createApiError(
      500,
      `写入 billing_subscription 失败：${subscriptionUpsertResult.error?.message || 'unknown error'}`,
    )
  }

  const syncedSubscriptionId = subscriptionUpsertResult.data.id
  const stripeItemRows: StripeBillingSubscriptionItemInsert[] = subscription.items.data.map((item) => {
    const lookupKey = item.price.lookup_key || null

    return {
      billing_subscription_id: syncedSubscriptionId,
      stripe_subscription_item_id: item.id,
      item_code: buildSubscriptionItemCode(lookupKey),
      lookup_key: lookupKey,
      quantity: item.quantity ?? null,
      meter_code: item.price.recurring?.meter || null,
      unit_amount: parseStripeUnitAmountUsd(item.price),
      raw_snapshot: item,
      updated_at: nowIsoString,
    }
  })

  const deleteOldItemsResult = await serviceClient
    .schema('billing')
    .from('billing_subscription_item')
    .delete()
    .eq('billing_subscription_id', syncedSubscriptionId)

  if (deleteOldItemsResult.error) {
    throw createApiError(
      500,
      `清理旧 subscription item 失败：${deleteOldItemsResult.error.message}`,
    )
  }

  if (stripeItemRows.length > 0) {
    const insertItemsResult = await serviceClient
      .schema('billing')
      .from('billing_subscription_item')
      .insert(stripeItemRows)

    if (insertItemsResult.error) {
      throw createApiError(
        500,
        `写入 billing_subscription_item 失败：${insertItemsResult.error.message}`,
      )
    }
  }

  const updateAccountResult = await serviceClient
    .schema('billing')
    .from('billing_account')
    .update({
      plan_code: planCode,
      plan_source: 'stripe',
      status: billingStatus,
      stripe_customer_id: typeof subscription.customer === 'string' ? subscription.customer : null,
      overage_mode: overageMode,
      included_actions: planConfig.includedActions,
      included_admins: planConfig.includedAdmins,
      included_platforms: planConfig.includedPlatforms,
      updated_at: nowIsoString,
    })
    .eq('id', billingAccount.id)

  if (updateAccountResult.error) {
    throw createSupabaseApiError(500, '同步 billing_account 失败', updateAccountResult.error)
  }

  await ensureCurrentBillingUsagePeriod(serviceClient, {
    ...billingAccount,
    plan_code: planCode,
    overage_mode: overageMode,
    included_actions: planConfig.includedActions,
    included_admins: planConfig.includedAdmins,
    included_platforms: planConfig.includedPlatforms,
  })
}

async function handleBillingSummaryRequest(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)
  const companyId = requestUrl.searchParams.get('company_id')?.trim() || ''

  if (!isUuid(companyId)) {
    throw createApiError(400, 'company_id 缺失或格式不合法。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  const serviceClient = createSupabaseServiceRoleClient()
  await requireCompanyMembership(serviceClient, {
    companyId,
    userId: currentUser.id,
  })

  const summary = await buildBillingSummaryForCompany(serviceClient, {
    companyId,
    createdByUserId: currentUser.id,
  })

  return jsonResponse(summary)
}

async function handleBillingInvoicesRequest(request: Request): Promise<Response> {
  if (!getStripeBillingEnvOrNull()) {
    throw createApiError(501, 'Stripe 尚未配置，暂时无法读取官方账单。')
  }

  const requestUrl = new URL(request.url)
  const companyId = requestUrl.searchParams.get('company_id')?.trim() || ''

  if (!isUuid(companyId)) {
    throw createApiError(400, 'company_id 缺失或格式不合法。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  const serviceClient = createSupabaseServiceRoleClient()
  await requireCompanyMembership(serviceClient, {
    companyId,
    userId: currentUser.id,
  })

  const billingAccount = await ensureBillingAccountForCompany(serviceClient, {
    companyId,
    createdByUserId: currentUser.id,
  })

  if (!billingAccount.stripe_customer_id) {
    return jsonResponse({
      invoices: [],
    })
  }

  const stripe = getStripeClient()
  const invoiceList = await stripe.invoices.list({
    customer: billingAccount.stripe_customer_id,
    limit: 12,
    expand: ['data.charge'],
  })

  const invoices: BillingInvoice[] = invoiceList.data
    .filter((invoice: Stripe.Invoice) => invoice.status !== 'draft')
    .map((invoice: Stripe.Invoice) => mapStripeInvoiceToBillingInvoice(invoice))

  return jsonResponse({
    invoices,
  })
}

async function handleUsagePolicyUpdateRequest(request: Request): Promise<Response> {
  const currentUser = await requireAuthenticatedUser(request)
  const requestBody = await parseRequestJson<UpdateBillingUsagePolicyPayload>(request)
  const companyId = requestBody.companyId?.trim() || ''

  if (!isUuid(companyId)) {
    throw createApiError(400, 'companyId 缺失或格式不合法。')
  }

  const serviceClient = createSupabaseServiceRoleClient()
  await requireCompanyMembership(serviceClient, {
    companyId,
    userId: currentUser.id,
    requireAdmin: true,
  })

  const billingAccount = await ensureBillingAccountForCompany(serviceClient, {
    companyId,
    createdByUserId: currentUser.id,
  })
  const planCode = normalizePlanCode(billingAccount.plan_code)

  if (planCode === 'free') {
    throw createApiError(400, '免费版不支持切换超额策略。')
  }

  const normalizedOverageMode = normalizeOverageMode(requestBody.overageMode)
  const overageSpendCapUsd = requestBody.overageSpendCapUsd

  if (normalizedOverageMode === 'auto_charge') {
    if (overageSpendCapUsd === null || overageSpendCapUsd === undefined || overageSpendCapUsd <= 0) {
      throw createApiError(400, '开启自动超额扣费时必须设置大于 0 的月度上限。')
    }
  }

  const nowIsoString = new Date().toISOString()
  const updateAccountResult = await serviceClient
    .schema('billing')
    .from('billing_account')
    .update({
      overage_mode: normalizedOverageMode,
      overage_spend_cap_usd:
        normalizedOverageMode === 'auto_charge' ? overageSpendCapUsd : null,
      updated_at: nowIsoString,
    })
    .eq('id', billingAccount.id)

  if (updateAccountResult.error) {
    throw createSupabaseApiError(500, '更新 Billing 超额策略失败', updateAccountResult.error)
  }

  const currentPeriod = await ensureCurrentBillingUsagePeriod(serviceClient, {
    ...billingAccount,
    overage_mode: normalizedOverageMode,
    overage_spend_cap_usd:
      normalizedOverageMode === 'auto_charge' ? overageSpendCapUsd : null,
  })

  const updatePeriodResult = await serviceClient
    .schema('billing')
    .from('billing_usage_period')
    .update({
      overage_mode: normalizedOverageMode,
      updated_at: nowIsoString,
    })
    .eq('id', currentPeriod.id)

  if (updatePeriodResult.error) {
    throw createSupabaseApiError(500, '同步账期超额策略失败', updatePeriodResult.error)
  }

  const summary = await buildBillingSummaryForCompany(serviceClient, {
    companyId,
    createdByUserId: currentUser.id,
  })

  return jsonResponse(summary)
}

async function handleCheckoutSessionCreateRequest(request: Request): Promise<Response> {
  const stripeEnv = getStripeBillingEnvOrNull()
  if (!stripeEnv) {
    throw createApiError(501, 'Stripe 尚未配置，暂时无法发起试用。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  const requestBody = await parseRequestJson<CreateBillingCheckoutSessionPayload>(request)
  const companyId = requestBody.companyId?.trim() || ''

  if (!isUuid(companyId)) {
    throw createApiError(400, 'companyId 缺失或格式不合法。')
  }

  if (requestBody.targetPlanCode !== 'basic' && requestBody.targetPlanCode !== 'pro') {
    throw createApiError(400, 'targetPlanCode 仅支持 basic 或 pro。')
  }

  const serviceClient = createSupabaseServiceRoleClient()
  await requireCompanyMembership(serviceClient, {
    companyId,
    userId: currentUser.id,
    requireAdmin: true,
  })

  const billingAccount = await ensureBillingAccountForCompany(serviceClient, {
    companyId,
    createdByUserId: currentUser.id,
  })

  if (normalizePlanCode(billingAccount.plan_code) !== 'free') {
    throw createApiError(409, '当前账户已进入付费体系，计划变更流程将在下一阶段接入。')
  }

  const targetPlanConfig = getBillingPlanConfig(requestBody.targetPlanCode)
  const stripe = getStripeClient()
  const stripeCustomerId = await getOrCreateStripeCustomer(serviceClient, {
    billingAccount,
    companyId,
    email: currentUser.email,
  })
  const appBaseUrl = resolveAppBaseUrl(request)

  const basePrice = await getStripePriceByLookupKey(stripe, targetPlanConfig.stripeBaseLookupKey || '')
  const platformAddonPrice = await getStripePriceByLookupKey(
    stripe,
    stripeEnv.lookupKeys.platformAddonMonthly,
  )
  const adminAddonPrice = await getStripePriceByLookupKey(
    stripe,
    stripeEnv.lookupKeys.adminAddonMonthly,
  )

  const currentPlatformCount = billingAccount.current_platform_count || 0
  const currentBillableAdminCount = billingAccount.current_billable_admin_count || 0
  const extraPlatformCount = Math.max(0, currentPlatformCount - targetPlanConfig.includedPlatforms)
  const extraAdminCount = Math.max(0, currentBillableAdminCount - targetPlanConfig.includedAdmins)
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price: basePrice.id,
      quantity: 1,
    },
  ]

  if (extraPlatformCount > 0) {
    lineItems.push({
      price: platformAddonPrice.id,
      quantity: extraPlatformCount,
    })
  }

  if (extraAdminCount > 0) {
    lineItems.push({
      price: adminAddonPrice.id,
      quantity: extraAdminCount,
    })
  }

  const overageMode = normalizeOverageMode(billingAccount.overage_mode)
  const overageSpendCapUsd = parseNumericValue(billingAccount.overage_spend_cap_usd)
  const successUrl = `${appBaseUrl}/settings/package?checkout=success&session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${appBaseUrl}/settings/package?checkout=cancel`
  const idempotencyKey = buildBillingCheckoutFingerprint({
    billingAccountId: billingAccount.id,
    companyId,
    stripeCustomerId,
    targetPlanCode: requestBody.targetPlanCode,
    entryPoint: requestBody.entryPoint,
    successUrl,
    cancelUrl,
    lineItems: lineItems.map((lineItem) => ({
      price: lineItem.price || '',
      quantity: lineItem.quantity || 1,
    })),
    overageMode,
    overageSpendCapUsd,
    trialPeriodDays: BILLING_TRIAL_DAYS,
  })
  const reusableCheckoutSession = await findReusableBillingCheckoutSession({
    serviceClient,
    stripe,
    billingAccountId: billingAccount.id,
    targetPlanCode: requestBody.targetPlanCode,
    checkoutFingerprint: idempotencyKey,
  })

  if (reusableCheckoutSession.checkoutUrl) {
    return jsonResponse({
      checkoutUrl: reusableCheckoutSession.checkoutUrl,
    })
  }

  const stripeIdempotencyKey = reusableCheckoutSession.hasMatchingFingerprint
    ? `billing-checkout:${idempotencyKey}:${randomUUID()}`
    : `billing-checkout:${idempotencyKey}`

  const checkoutSession = await stripe.checkout.sessions.create(
    {
      mode: 'subscription',
      customer: stripeCustomerId,
      client_reference_id: billingAccount.id,
      line_items: lineItems,
      payment_method_collection: 'always',
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: false,
      subscription_data: {
        trial_period_days: BILLING_TRIAL_DAYS,
        metadata: {
          billing_account_id: billingAccount.id,
          owner_type: 'company',
          owner_id: companyId,
          target_plan_code: requestBody.targetPlanCode,
          overage_mode: overageMode,
          overage_spend_cap_usd: overageSpendCapUsd ? String(overageSpendCapUsd) : '',
          checkout_fingerprint: idempotencyKey,
        },
      },
      metadata: {
        billing_account_id: billingAccount.id,
        owner_type: 'company',
        owner_id: companyId,
        target_plan_code: requestBody.targetPlanCode,
        entry_point: requestBody.entryPoint,
        checkout_fingerprint: idempotencyKey,
      },
    },
    {
      idempotencyKey: stripeIdempotencyKey,
    },
  )

  const nowIsoString = new Date().toISOString()
  const saveCheckoutResult = await serviceClient
    .schema('billing')
    .from('billing_checkout_session')
    .upsert(
      {
        billing_account_id: billingAccount.id,
        stripe_checkout_session_id: checkoutSession.id,
        target_plan_code: requestBody.targetPlanCode,
        status: checkoutSession.status || 'open',
        initiated_by: currentUser.id,
        success_url: successUrl,
        cancel_url: cancelUrl,
        raw_snapshot: checkoutSession,
        updated_at: nowIsoString,
      },
      {
        onConflict: 'stripe_checkout_session_id',
      },
    )

  if (saveCheckoutResult.error) {
    throw createSupabaseApiError(500, '记录 Checkout Session 失败', saveCheckoutResult.error)
  }

  if (!checkoutSession.url) {
    throw createApiError(500, 'Stripe Checkout 已创建，但未返回可跳转地址。')
  }

  return jsonResponse({
    checkoutUrl: checkoutSession.url,
  })
}

async function handlePortalSessionCreateRequest(request: Request): Promise<Response> {
  const stripeEnv = getStripeBillingEnvOrNull()
  if (!stripeEnv) {
    throw createApiError(501, 'Stripe 尚未配置，暂时无法打开支付管理页。')
  }

  const currentUser = await requireAuthenticatedUser(request)
  const requestBody = await parseRequestJson<CreateBillingPortalSessionPayload>(request)
  const companyId = requestBody.companyId?.trim() || ''

  if (!isUuid(companyId)) {
    throw createApiError(400, 'companyId 缺失或格式不合法。')
  }

  const serviceClient = createSupabaseServiceRoleClient()
  await requireCompanyMembership(serviceClient, {
    companyId,
    userId: currentUser.id,
    requireAdmin: true,
  })

  const billingAccount = await ensureBillingAccountForCompany(serviceClient, {
    companyId,
    createdByUserId: currentUser.id,
  })

  if (!billingAccount.stripe_customer_id) {
    throw createApiError(400, '当前账户尚未绑定 Stripe Customer。')
  }

  const stripe = getStripeClient()
  const appBaseUrl = resolveAppBaseUrl(request)
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: billingAccount.stripe_customer_id,
    return_url: `${appBaseUrl}/settings/package`,
    configuration: stripeEnv.portalConfigurationId || undefined,
  })

  return jsonResponse({
    portalUrl: portalSession.url,
  })
}

async function handleStripeWebhookRequest(request: Request): Promise<Response> {
  const stripeEnv = getRequiredStripeBillingEnv()
  if (!stripeEnv.webhookSecret) {
    throw createApiError(500, 'Stripe Webhook Secret 尚未配置。')
  }

  const stripe = getStripeClient()
  const signature = request.headers.get('stripe-signature')?.trim() || ''
  if (!signature) {
    throw createApiError(400, '缺少 Stripe Webhook 签名。')
  }

  const rawBody = await request.text()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeEnv.webhookSecret)
  } catch (error) {
    throw createApiError(
      400,
      `Stripe Webhook 验签失败：${error instanceof Error ? error.message : 'unknown error'}`,
    )
  }

  const serviceClient = createSupabaseServiceRoleClient()
  const insertWebhookResult = await serviceClient
    .schema('billing')
    .from('billing_webhook_event')
    .insert({
      stripe_event_id: event.id,
      event_type: event.type,
      delivery_status: 'processing',
      payload: event,
    })

  if (insertWebhookResult.error) {
    if (insertWebhookResult.error.code === '23505') {
      return jsonResponse({
        received: true,
        duplicate: true,
      })
    }

    throw createSupabaseApiError(500, '记录 webhook 失败', insertWebhookResult.error)
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const checkoutSession = event.data.object as Stripe.Checkout.Session
      const checkoutMetadata = checkoutSession.metadata || {}
      const nowIsoString = new Date().toISOString()

      const saveCheckoutResult = await serviceClient
        .schema('billing')
        .from('billing_checkout_session')
        .upsert(
          {
            billing_account_id: checkoutMetadata.billing_account_id,
            stripe_checkout_session_id: checkoutSession.id,
            target_plan_code: checkoutMetadata.target_plan_code,
            status: checkoutSession.status || 'complete',
            success_url: checkoutSession.success_url || '',
            cancel_url: checkoutSession.cancel_url || '',
            completed_at: nowIsoString,
            raw_snapshot: checkoutSession,
            updated_at: nowIsoString,
          },
          {
            onConflict: 'stripe_checkout_session_id',
          },
        )

      if (saveCheckoutResult.error) {
        throw createApiError(
          500,
          `同步 checkout.session.completed 失败：${saveCheckoutResult.error.message}`,
        )
      }
    }

    if (
      event.type === 'customer.subscription.created' ||
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted'
    ) {
      await syncStripeSubscriptionSnapshot(serviceClient, event.data.object as Stripe.Subscription)
    }

    const updateWebhookResult = await serviceClient
      .schema('billing')
      .from('billing_webhook_event')
      .update({
        delivery_status: 'processed',
        processed_at: new Date().toISOString(),
      })
      .eq('stripe_event_id', event.id)

    if (updateWebhookResult.error) {
      throw createSupabaseApiError(500, '更新 webhook 处理状态失败', updateWebhookResult.error)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'unknown error'
    await serviceClient
      .schema('billing')
      .from('billing_webhook_event')
      .update({
        delivery_status: 'failed',
        processed_at: new Date().toISOString(),
        last_error: errorMessage,
      })
      .eq('stripe_event_id', event.id)

    throw createApiError(500, errorMessage)
  }

  return jsonResponse({
    received: true,
  })
}

export async function handleBillingApi(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url)

  try {
    if (requestUrl.pathname === '/api/billing/summary') {
      if (request.method !== 'GET') {
        throw createApiError(405, 'summary 仅支持 GET。')
      }

      return await handleBillingSummaryRequest(request)
    }

    if (requestUrl.pathname === '/api/billing/usage-policy') {
      if (request.method !== 'PATCH') {
        throw createApiError(405, 'usage-policy 仅支持 PATCH。')
      }

      return await handleUsagePolicyUpdateRequest(request)
    }

    if (requestUrl.pathname === '/api/billing/invoices') {
      if (request.method !== 'GET') {
        throw createApiError(405, 'invoices 仅支持 GET。')
      }

      return await handleBillingInvoicesRequest(request)
    }

    if (requestUrl.pathname === '/api/billing/checkout-session') {
      if (request.method !== 'POST') {
        throw createApiError(405, 'checkout-session 仅支持 POST。')
      }

      return await handleCheckoutSessionCreateRequest(request)
    }

    if (requestUrl.pathname === '/api/billing/portal-session') {
      if (request.method !== 'POST') {
        throw createApiError(405, 'portal-session 仅支持 POST。')
      }

      return await handlePortalSessionCreateRequest(request)
    }

    if (requestUrl.pathname === '/api/billing/stripe/webhook') {
      if (request.method !== 'POST') {
        throw createApiError(405, 'stripe webhook 仅支持 POST。')
      }

      return await handleStripeWebhookRequest(request)
    }

    return jsonResponse({
      error: '未找到对应的 Billing API。',
    }, 404)
  } catch (error) {
    if (typeof error === 'object' && error && 'status' in error && 'message' in error) {
      const apiError = error as ApiError
      return jsonResponse(
        {
          error: apiError.message,
        },
        apiError.status,
      )
    }

    return jsonResponse(
      {
        error: error instanceof Error ? error.message : 'Billing API 未知错误。',
      },
      500,
    )
  }
}

export const __billingApiTestables = {
  buildBillingCheckoutFingerprint,
  isStripeCheckoutSessionReusable,
  mapStripeInvoiceToBillingInvoice,
  readCheckoutFingerprintFromRawSnapshot,
}
