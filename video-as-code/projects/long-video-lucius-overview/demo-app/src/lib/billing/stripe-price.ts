import type Stripe from 'stripe'

/**
 * Price 查找统一走 lookup_key。
 * 这样可以避免把 price_id 硬编码进代码，后续换价时只需要更新 Stripe 资源配置。
 */
export async function getStripePriceByLookupKey(
  stripe: Stripe,
  lookupKey: string,
): Promise<Stripe.Price> {
  const priceList = await stripe.prices.list({
    lookup_keys: [lookupKey],
    active: true,
    limit: 1,
  })

  const price = priceList.data[0]
  if (!price) {
    throw new Error(`未找到 Stripe Price，lookup_key=${lookupKey}`)
  }

  return price
}
