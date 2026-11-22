import { describe, expect, it } from 'vitest'

import {
  calculateBillableOverageActions,
  calculateExtraQuantity,
  calculateProjectedMonthlyChargeUsd,
  calculateProjectedOverageAmountUsd,
  calculateUsagePercent,
} from '@/lib/billing/pricing-policy'

describe('pricing-policy', () => {
  it('按 included quota 计算 add-on quantity', () => {
    expect(calculateExtraQuantity(1, 1)).toBe(0)
    expect(calculateExtraQuantity(5, 3)).toBe(2)
  })

  it('免费版不会产生 overage action', () => {
    expect(calculateBillableOverageActions('free', 999)).toBe(0)
  })

  it('按套餐 overage 单价估算当前超额金额', () => {
    expect(calculateProjectedOverageAmountUsd('basic', 25)).toBe(3)
    expect(calculateProjectedOverageAmountUsd('pro', 25)).toBe(2)
  })

  it('组合基础费、add-on 与 overage 得到预计月账单', () => {
    expect(
      calculateProjectedMonthlyChargeUsd({
        planCode: 'basic',
        extraAdminCount: 2,
        extraPlatformCount: 1,
        projectedOverageAmountUsd: 3,
      }),
    ).toBe(399)
  })

  it('免费版即使超出建议默认平台/管理员数，预计账单也必须为 0', () => {
    expect(
      calculateProjectedMonthlyChargeUsd({
        planCode: 'free',
        extraAdminCount: 3,
        extraPlatformCount: 1,
        projectedOverageAmountUsd: 999,
      }),
    ).toBe(0)
  })

  it('安全计算使用率百分比', () => {
    expect(calculateUsagePercent(0, 0)).toBe(0)
    expect(calculateUsagePercent(2500, 5000)).toBe(50)
    expect(calculateUsagePercent(7500, 5000)).toBe(150)
  })
})
