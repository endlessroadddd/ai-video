import Stripe from 'stripe'

type StripeCatalogProductConfig = {
  productId: string
  name: string
  description: string
  unitLabel: string
  metadata: Record<string, string>
}

type StripeCatalogMeterConfig = {
  code: string
  displayName: string
  eventName: string
}

type StripeCatalogPriceConfig = {
  key: string
  lookupKey: string
  nickname: string
  productId: string
  unitAmountCents: number
  usageType: Stripe.PriceCreateParams.Recurring.UsageType
  meterCode?: string
  metadata: Record<string, string>
}

type EnsureResult<TResource> = {
  resource: TResource
  created: boolean
}

const STRIPE_API_VERSION: Stripe.LatestApiVersion = '2026-02-25.clover'
const DEFAULT_CURRENCY = 'usd'
const DEFAULT_INTERVAL: Stripe.PriceCreateParams.Recurring.Interval = 'month'

const PRODUCT_CONFIGS: ReadonlyArray<StripeCatalogProductConfig> = [
  {
    productId: 'lucius_basic_base_monthly',
    name: 'Lucius Basic Base Plan',
    description: 'Base monthly subscription for the Lucius Basic plan.',
    unitLabel: 'workspace',
    metadata: {
      catalog_group: 'billing_v1',
      plan_code: 'basic',
      billing_role: 'base_plan',
    },
  },
  {
    productId: 'lucius_pro_base_monthly',
    name: 'Lucius Pro Base Plan',
    description: 'Base monthly subscription for the Lucius Pro plan.',
    unitLabel: 'workspace',
    metadata: {
      catalog_group: 'billing_v1',
      plan_code: 'pro',
      billing_role: 'base_plan',
    },
  },
  {
    productId: 'lucius_platform_addon_monthly',
    name: 'Lucius Platform Add-on',
    description: 'Monthly licensed add-on for each managed platform slot beyond the included quota.',
    unitLabel: 'platform',
    metadata: {
      catalog_group: 'billing_v1',
      billing_role: 'platform_addon',
    },
  },
  {
    productId: 'lucius_admin_addon_monthly',
    name: 'Lucius Admin Add-on',
    description: 'Monthly licensed add-on for each billable admin seat beyond the included quota.',
    unitLabel: 'seat',
    metadata: {
      catalog_group: 'billing_v1',
      billing_role: 'admin_addon',
    },
  },
  {
    productId: 'lucius_basic_action_overage',
    name: 'Lucius Basic Action Overage',
    description: 'Metered overage charge for billable actions on the Lucius Basic plan.',
    unitLabel: 'action',
    metadata: {
      catalog_group: 'billing_v1',
      plan_code: 'basic',
      billing_role: 'action_overage',
    },
  },
  {
    productId: 'lucius_pro_action_overage',
    name: 'Lucius Pro Action Overage',
    description: 'Metered overage charge for billable actions on the Lucius Pro plan.',
    unitLabel: 'action',
    metadata: {
      catalog_group: 'billing_v1',
      plan_code: 'pro',
      billing_role: 'action_overage',
    },
  },
]

const METER_CONFIGS: ReadonlyArray<StripeCatalogMeterConfig> = [
  {
    code: 'basic_billable_actions',
    displayName: 'Lucius Basic Billable Actions',
    eventName: 'basic_billable_actions',
  },
  {
    code: 'pro_billable_actions',
    displayName: 'Lucius Pro Billable Actions',
    eventName: 'pro_billable_actions',
  },
]

const PRICE_CONFIGS: ReadonlyArray<StripeCatalogPriceConfig> = [
  {
    key: 'basic_base_monthly',
    lookupKey: readEnvOrThrow('STRIPE_BASIC_BASE_MONTHLY_LOOKUP_KEY'),
    nickname: 'Lucius Basic Base Monthly',
    productId: 'lucius_basic_base_monthly',
    unitAmountCents: 19_900,
    usageType: 'licensed',
    metadata: {
      catalog_group: 'billing_v1',
      plan_code: 'basic',
      billing_role: 'base_plan',
    },
  },
  {
    key: 'pro_base_monthly',
    lookupKey: readEnvOrThrow('STRIPE_PRO_BASE_MONTHLY_LOOKUP_KEY'),
    nickname: 'Lucius Pro Base Monthly',
    productId: 'lucius_pro_base_monthly',
    unitAmountCents: 49_900,
    usageType: 'licensed',
    metadata: {
      catalog_group: 'billing_v1',
      plan_code: 'pro',
      billing_role: 'base_plan',
    },
  },
  {
    key: 'platform_addon_monthly',
    lookupKey: readEnvOrThrow('STRIPE_PLATFORM_ADDON_MONTHLY_LOOKUP_KEY'),
    nickname: 'Lucius Platform Add-on Monthly',
    productId: 'lucius_platform_addon_monthly',
    unitAmountCents: 9_900,
    usageType: 'licensed',
    metadata: {
      catalog_group: 'billing_v1',
      billing_role: 'platform_addon',
    },
  },
  {
    key: 'admin_addon_monthly',
    lookupKey: readEnvOrThrow('STRIPE_ADMIN_ADDON_MONTHLY_LOOKUP_KEY'),
    nickname: 'Lucius Admin Add-on Monthly',
    productId: 'lucius_admin_addon_monthly',
    unitAmountCents: 4_900,
    usageType: 'licensed',
    metadata: {
      catalog_group: 'billing_v1',
      billing_role: 'admin_addon',
    },
  },
  {
    key: 'basic_action_overage',
    lookupKey: readEnvOrThrow('STRIPE_BASIC_ACTION_OVERAGE_LOOKUP_KEY'),
    nickname: 'Lucius Basic Action Overage',
    productId: 'lucius_basic_action_overage',
    unitAmountCents: 12,
    usageType: 'metered',
    meterCode: 'basic_billable_actions',
    metadata: {
      catalog_group: 'billing_v1',
      plan_code: 'basic',
      billing_role: 'action_overage',
    },
  },
  {
    key: 'pro_action_overage',
    lookupKey: readEnvOrThrow('STRIPE_PRO_ACTION_OVERAGE_LOOKUP_KEY'),
    nickname: 'Lucius Pro Action Overage',
    productId: 'lucius_pro_action_overage',
    unitAmountCents: 8,
    usageType: 'metered',
    meterCode: 'pro_billable_actions',
    metadata: {
      catalog_group: 'billing_v1',
      plan_code: 'pro',
      billing_role: 'action_overage',
    },
  },
]

function readEnvOrThrow(key: string): string {
  const value: string = process.env[key]?.trim() || ''

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

function buildStripeClient(): Stripe {
  const secretKey: string = readEnvOrThrow('STRIPE_SECRET_KEY')

  return new Stripe(secretKey, {
    apiVersion: STRIPE_API_VERSION,
  })
}

function isStripeNotFoundError(error: unknown): boolean {
  if (!(error instanceof Stripe.errors.StripeInvalidRequestError)) {
    return false
  }

  return error.code === 'resource_missing'
}

async function ensureProduct(
  stripe: Stripe,
  config: StripeCatalogProductConfig,
): Promise<EnsureResult<Stripe.Product>> {
  try {
    const existingProduct: Stripe.Product = await stripe.products.retrieve(config.productId)

    return {
      resource: existingProduct,
      created: false,
    }
  } catch (error: unknown) {
    if (!isStripeNotFoundError(error)) {
      throw error
    }
  }

  const createdProduct: Stripe.Product = await stripe.products.create({
    id: config.productId,
    name: config.name,
    description: config.description,
    unit_label: config.unitLabel,
    metadata: config.metadata,
  })

  return {
    resource: createdProduct,
    created: true,
  }
}

async function listAllMeters(stripe: Stripe): Promise<Stripe.Billing.Meter[]> {
  const meters: Stripe.Billing.Meter[] = []

  for (const status of ['active', 'inactive'] as const) {
    const meterPage: Stripe.ApiList<Stripe.Billing.Meter> = await stripe.billing.meters.list({
      status,
      limit: 100,
    })

    meters.push(...meterPage.data)
  }

  return meters
}

async function ensureMeter(
  stripe: Stripe,
  config: StripeCatalogMeterConfig,
): Promise<EnsureResult<Stripe.Billing.Meter>> {
  const existingMeters: Stripe.Billing.Meter[] = await listAllMeters(stripe)
  const matchedMeter: Stripe.Billing.Meter | undefined = existingMeters.find((meter) => {
    return meter.event_name === config.eventName
  })

  if (matchedMeter?.status === 'active') {
    return {
      resource: matchedMeter,
      created: false,
    }
  }

  if (matchedMeter?.status === 'inactive') {
    const reactivatedMeter: Stripe.Billing.Meter = await stripe.billing.meters.reactivate(
      matchedMeter.id,
    )

    return {
      resource: reactivatedMeter,
      created: false,
    }
  }

  const createdMeter: Stripe.Billing.Meter = await stripe.billing.meters.create({
    display_name: config.displayName,
    event_name: config.eventName,
    default_aggregation: {
      formula: 'count',
    },
    customer_mapping: {
      type: 'by_id',
      event_payload_key: 'stripe_customer_id',
    },
  })

  return {
    resource: createdMeter,
    created: true,
  }
}

async function ensurePrice(
  stripe: Stripe,
  config: StripeCatalogPriceConfig,
  meterIdByCode: Readonly<Record<string, string>>,
): Promise<EnsureResult<Stripe.Price>> {
  const existingPrices: Stripe.ApiList<Stripe.Price> = await stripe.prices.list({
    lookup_keys: [config.lookupKey],
    limit: 10,
  })

  const matchedPrice: Stripe.Price | undefined = existingPrices.data.find((price) => {
    return price.lookup_key === config.lookupKey
  })

  if (matchedPrice) {
    return {
      resource: matchedPrice,
      created: false,
    }
  }

  const recurring: Stripe.PriceCreateParams.Recurring = {
    interval: DEFAULT_INTERVAL,
    usage_type: config.usageType,
  }

  if (config.meterCode) {
    const meterId: string | undefined = meterIdByCode[config.meterCode]

    if (!meterId) {
      throw new Error(`Missing Stripe meter for code: ${config.meterCode}`)
    }

    recurring.meter = meterId
  }

  const createdPrice: Stripe.Price = await stripe.prices.create({
    currency: DEFAULT_CURRENCY,
    product: config.productId,
    lookup_key: config.lookupKey,
    nickname: config.nickname,
    unit_amount: config.unitAmountCents,
    recurring,
    metadata: {
      ...config.metadata,
      seed_key: config.key,
      lookup_key: config.lookupKey,
    },
  })

  return {
    resource: createdPrice,
    created: true,
  }
}

async function run(): Promise<void> {
  const stripe: Stripe = buildStripeClient()
  const productResults: Array<EnsureResult<Stripe.Product>> = []

  for (const config of PRODUCT_CONFIGS) {
    const productResult: EnsureResult<Stripe.Product> = await ensureProduct(stripe, config)
    productResults.push(productResult)
  }

  const meterIdByCode: Record<string, string> = {}
  const meterResults: Array<EnsureResult<Stripe.Billing.Meter>> = []

  for (const config of METER_CONFIGS) {
    const meterResult: EnsureResult<Stripe.Billing.Meter> = await ensureMeter(stripe, config)
    meterIdByCode[config.code] = meterResult.resource.id
    meterResults.push(meterResult)
  }

  const priceResults: Array<EnsureResult<Stripe.Price>> = []

  for (const config of PRICE_CONFIGS) {
    const priceResult: EnsureResult<Stripe.Price> = await ensurePrice(stripe, config, meterIdByCode)
    priceResults.push(priceResult)
  }

  const summary: {
    products: Array<{ id: string; created: boolean; name: string }>
    meters: Array<{ id: string; created: boolean; eventName: string; status: string }>
    prices: Array<{
      id: string
      created: boolean
      lookupKey: string | null
      productId: string
      unitAmount: number | null
      usageType: string | null
      meterId: string | null
    }>
  } = {
    products: productResults.map((result) => ({
      id: result.resource.id,
      created: result.created,
      name: result.resource.name,
    })),
    meters: meterResults.map((result) => ({
      id: result.resource.id,
      created: result.created,
      eventName: result.resource.event_name,
      status: result.resource.status,
    })),
    prices: priceResults.map((result) => ({
      id: result.resource.id,
      created: result.created,
      lookupKey: result.resource.lookup_key,
      productId:
        typeof result.resource.product === 'string'
          ? result.resource.product
          : result.resource.product.id,
      unitAmount: result.resource.unit_amount,
      usageType: result.resource.recurring?.usage_type || null,
      meterId: result.resource.recurring?.meter || null,
    })),
  }

  console.log(JSON.stringify(summary, null, 2))
}

void run().catch((error: unknown) => {
  const message: string = error instanceof Error ? error.message : 'Unknown Stripe setup error'
  console.error(message)
  process.exit(1)
})
