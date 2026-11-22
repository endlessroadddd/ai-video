import { afterEach, describe, expect, it, vi } from 'vitest'
import Stripe from 'stripe'

import { __billingApiTestables } from '@/lib/server/billing-api'

describe('billing-api Checkout 幂等保护', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('回跳地址变化时应生成不同 fingerprint，避免生产环境域名漂移复用旧 key', () => {
    const basePayload = {
      billingAccountId: 'billing-account-id',
      companyId: 'company-id',
      stripeCustomerId: 'cus_test',
      targetPlanCode: 'pro',
      entryPoint: 'settings_billing',
      successUrl: 'https://app.example.com/settings/package?checkout=success&session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: 'https://app.example.com/settings/package?checkout=cancel',
      lineItems: [
        {
          price: 'price_pro_monthly',
          quantity: 1,
        },
        {
          price: 'price_platform_addon',
          quantity: 1,
        },
      ],
      overageMode: 'stop_service' as const,
      overageSpendCapUsd: null,
      trialPeriodDays: 14,
    }

    const productionAliasPayload = {
      ...basePayload,
      successUrl: 'https://lucius.ai/settings/package?checkout=success&session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: 'https://lucius.ai/settings/package?checkout=cancel',
    }

    expect(__billingApiTestables.buildBillingCheckoutFingerprint(basePayload)).not.toBe(
      __billingApiTestables.buildBillingCheckoutFingerprint(productionAliasPayload),
    )
  })

  it('应能从 Stripe snapshot metadata 中读取 checkout_fingerprint', () => {
    expect(
      __billingApiTestables.readCheckoutFingerprintFromRawSnapshot({
        metadata: {
          checkout_fingerprint: 'checkout-fingerprint',
        },
      }),
    ).toBe('checkout-fingerprint')
  })

  it('仅复用仍处于 open 且未过期的 Checkout Session', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-11T12:00:00.000Z'))

    expect(
      __billingApiTestables.isStripeCheckoutSessionReusable({
        status: 'open',
        url: 'https://checkout.stripe.com/pay/cs_test',
        expires_at: Math.floor(Date.now() / 1000) + 60,
      }),
    ).toBe(true)

    expect(
      __billingApiTestables.isStripeCheckoutSessionReusable({
        status: 'complete',
        url: 'https://checkout.stripe.com/pay/cs_test',
        expires_at: Math.floor(Date.now() / 1000) + 60,
      }),
    ).toBe(false)

    expect(
      __billingApiTestables.isStripeCheckoutSessionReusable({
        status: 'open',
        url: 'https://checkout.stripe.com/pay/cs_test',
        expires_at: Math.floor(Date.now() / 1000) - 60,
      }),
    ).toBe(false)
  })

  it('应把 Stripe invoice 映射成前端可直接展示的官方账单结构', () => {
    const invoice = {
      id: 'in_test_123',
      number: 'CBAE94D0-0012',
      status: 'paid',
      currency: 'usd',
      total: 52750,
      hosted_invoice_url: 'https://invoice.stripe.com/i/acct_123/test_invoice',
      invoice_pdf: 'https://pay.stripe.com/invoice/acct_123/pdf',
      charge: {
        receipt_url: 'https://pay.stripe.com/receipts/acct_123/receipt',
      },
      created: 1741651200,
      period_start: 1740787200,
      period_end: 1743465600,
      status_transitions: {
        paid_at: 1741651200,
      },
    } as unknown as Stripe.Invoice

    expect(__billingApiTestables.mapStripeInvoiceToBillingInvoice(invoice)).toEqual({
      id: 'in_test_123',
      number: 'CBAE94D0-0012',
      status: 'paid',
      currency: 'USD',
      totalAmount: 527.5,
      hostedInvoiceUrl: 'https://invoice.stripe.com/i/acct_123/test_invoice',
      invoicePdfUrl: 'https://pay.stripe.com/invoice/acct_123/pdf',
      receiptUrl: 'https://pay.stripe.com/receipts/acct_123/receipt',
      createdAt: '2025-03-11T00:00:00.000Z',
      paidAt: '2025-03-11T00:00:00.000Z',
      periodStartAt: '2025-03-01T00:00:00.000Z',
      periodEndAt: '2025-04-01T00:00:00.000Z',
    })
  })
})
