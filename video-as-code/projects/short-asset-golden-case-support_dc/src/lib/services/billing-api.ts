import type {
  BillingInvoice,
  BillingSummary,
  CreateBillingCheckoutSessionPayload,
  CreateBillingCheckoutSessionResponse,
  CreateBillingPortalSessionPayload,
  CreateBillingPortalSessionResponse,
  ListBillingInvoicesResponse,
  UpdateBillingUsagePolicyPayload,
} from '@/lib/billing/types'
import { m } from '@/paraglide/messages'

type ApiErrorResponse = {
  error?: string
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiErrorResponse

  if (!response.ok) {
    throw new Error(data.error || m.service_billing_request_failed())
  }

  return data
}

/**
 * 拉取当前公司的 Billing Summary。
 * 设置页所有 Billing 面板统一复用这一个接口。
 */
export async function fetchBillingSummary(payload: {
  companyId: string
}): Promise<BillingSummary> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
  })

  const response = await fetch(`/api/billing/summary?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  return parseApiResponse<BillingSummary>(response)
}

/**
 * 拉取当前公司的 Stripe 官方账单列表。
 * 用量历史页基于这个接口展示 hosted invoice / PDF 下载入口。
 */
export async function fetchBillingInvoices(payload: {
  companyId: string
}): Promise<BillingInvoice[]> {
  const query = new URLSearchParams({
    company_id: payload.companyId,
  })

  const response = await fetch(`/api/billing/invoices?${query.toString()}`, {
    method: 'GET',
    credentials: 'include',
  })

  const data = await parseApiResponse<ListBillingInvoicesResponse>(response)
  return data.invoices
}

/**
 * 更新超额策略。
 * 仅管理员可操作，服务端会再次校验身份与计划状态。
 */
export async function updateBillingUsagePolicy(
  payload: UpdateBillingUsagePolicyPayload,
): Promise<BillingSummary> {
  const response = await fetch('/api/billing/usage-policy', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<BillingSummary>(response)
}

/**
 * 创建 Checkout Session。
 * 前端拿到 `checkoutUrl` 后直接跳转到 Stripe Hosted Checkout。
 */
export async function createBillingCheckoutSession(
  payload: CreateBillingCheckoutSessionPayload,
): Promise<CreateBillingCheckoutSessionResponse> {
  const response = await fetch('/api/billing/checkout-session', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<CreateBillingCheckoutSessionResponse>(response)
}

/**
 * 创建 Customer Portal Session。
 */
export async function createBillingPortalSession(
  payload: CreateBillingPortalSessionPayload,
): Promise<CreateBillingPortalSessionResponse> {
  const response = await fetch('/api/billing/portal-session', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  return parseApiResponse<CreateBillingPortalSessionResponse>(response)
}
