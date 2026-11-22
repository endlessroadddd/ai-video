import Stripe from 'stripe'

import { DEFAULT_STRIPE_LOOKUP_KEYS } from '@/lib/billing/plan-config'

type StripeBillingEnv = {
  secretKey: string
  webhookSecret: string | null
  portalConfigurationId: string | null
  lookupKeys: {
    basicBaseMonthly: string
    proBaseMonthly: string
    platformAddonMonthly: string
    adminAddonMonthly: string
    basicActionOverage: string
    proActionOverage: string
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __luciusStripeClient: Stripe | undefined
}

/**
 * 读取 Stripe 配置。
 * 当 secret key 缺失时返回 null，调用侧可以根据返回值决定展示“未配置”错误还是跳过能力。
 */
export function getStripeBillingEnvOrNull(): StripeBillingEnv | null {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim() || ''

  if (!secretKey) {
    return null
  }

  return {
    secretKey,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET?.trim() || null,
    portalConfigurationId: process.env.STRIPE_PORTAL_CONFIGURATION_ID?.trim() || null,
    lookupKeys: {
      basicBaseMonthly:
        process.env.STRIPE_BASIC_BASE_MONTHLY_LOOKUP_KEY?.trim() ||
        DEFAULT_STRIPE_LOOKUP_KEYS.basicBaseMonthly,
      proBaseMonthly:
        process.env.STRIPE_PRO_BASE_MONTHLY_LOOKUP_KEY?.trim() ||
        DEFAULT_STRIPE_LOOKUP_KEYS.proBaseMonthly,
      platformAddonMonthly:
        process.env.STRIPE_PLATFORM_ADDON_MONTHLY_LOOKUP_KEY?.trim() ||
        DEFAULT_STRIPE_LOOKUP_KEYS.platformAddonMonthly,
      adminAddonMonthly:
        process.env.STRIPE_ADMIN_ADDON_MONTHLY_LOOKUP_KEY?.trim() ||
        DEFAULT_STRIPE_LOOKUP_KEYS.adminAddonMonthly,
      basicActionOverage:
        process.env.STRIPE_BASIC_ACTION_OVERAGE_LOOKUP_KEY?.trim() ||
        DEFAULT_STRIPE_LOOKUP_KEYS.basicActionOverage,
      proActionOverage:
        process.env.STRIPE_PRO_ACTION_OVERAGE_LOOKUP_KEY?.trim() ||
        DEFAULT_STRIPE_LOOKUP_KEYS.proActionOverage,
    },
  }
}

export function getRequiredStripeBillingEnv(): StripeBillingEnv {
  const env = getStripeBillingEnvOrNull()

  if (!env) {
    throw new Error('Stripe 尚未配置，请先设置 STRIPE_SECRET_KEY。')
  }

  return env
}

/**
 * 服务端 Stripe client 单例。
 * 在开发态复用实例，减少 HMR 场景下重复创建 SDK 对象。
 */
export function getStripeClient(): Stripe {
  if (globalThis.__luciusStripeClient) {
    return globalThis.__luciusStripeClient
  }

  const env = getRequiredStripeBillingEnv()
  const client = new Stripe(env.secretKey)

  if (process.env.NODE_ENV !== 'production') {
    globalThis.__luciusStripeClient = client
  }

  return client
}
