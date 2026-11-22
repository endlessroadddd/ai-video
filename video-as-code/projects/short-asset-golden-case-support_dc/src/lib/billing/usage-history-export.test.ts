import { describe, expect, it } from 'vitest'

import type { BillingSummary } from '@/lib/billing/types'
import {
  buildBillingDetailRows,
  buildBillingUsageHistoryCsv,
  createBillingUsageHistoryFilename,
} from '@/lib/billing/usage-history-export'

const BASIC_SUMMARY_FIXTURE: BillingSummary = {
  billingAccountId: 'billing-account-id',
  planCode: 'basic',
  planName: 'Basic',
  stripeStatus: 'active',
  billingAccountStatus: 'active',
  displayState: 'basic_active',
  overageMode: 'auto_charge',
  overageSpendCapUsd: 500,
  includedActions: 5000,
  usedActions: 5100,
  blockedActions: 0,
  billableOverageActions: 100,
  projectedOverageAmountUsd: 12,
  projectedMonthlyChargeUsd: 408,
  includedAdmins: 3,
  currentBillableAdminCount: 5,
  extraAdminCount: 2,
  includedPlatforms: 1,
  currentPlatformCount: 2,
  extraPlatformCount: 1,
  trialEndAt: null,
  currentPeriodStartAt: '2026-03-01T00:00:00.000Z',
  currentPeriodEndAt: '2026-04-01T00:00:00.000Z',
  nextBillingAt: '2026-04-01T00:00:00.000Z',
  periodKey: '2026-03',
  hardLimitReachedAt: null,
  cancelAtPeriodEnd: false,
  actions: {
    canStartTrial: false,
    canUpgrade: true,
    canDowngrade: false,
    canCancel: true,
    canResume: false,
    canRedeem: true,
    canOpenPortal: true,
    canChangeOverageMode: true,
  },
}

describe('usage-history-export', () => {
  it('把当前账期摘要组装成可展示的账单明细分项', () => {
    const rows = buildBillingDetailRows(BASIC_SUMMARY_FIXTURE)

    expect(rows.map((row) => row.id)).toEqual([
      'base-plan',
      'included-actions',
      'used-actions',
      'extra-admins',
      'extra-platforms',
      'overage-actions',
    ])

    const chargeTotal = rows.reduce((sum: number, row) => sum + (row.amountUsd || 0), 0)
    expect(chargeTotal).toBe(BASIC_SUMMARY_FIXTURE.projectedMonthlyChargeUsd)
  })

  it('达量停服时会把被拦截动作列为信息项而非收费项', () => {
    const blockedSummary: BillingSummary = {
      ...BASIC_SUMMARY_FIXTURE,
      overageMode: 'stop_service',
      blockedActions: 23,
      billableOverageActions: 0,
      projectedOverageAmountUsd: 0,
      projectedMonthlyChargeUsd: 396,
    }

    const rows = buildBillingDetailRows(blockedSummary)
    const blockedRow = rows.find((row) => row.id === 'blocked-actions')

    expect(blockedRow).toMatchObject({
      kind: 'informational',
      amountUsd: null,
      quantity: '23 actions',
    })
  })

  it('生成包含账期元信息和明细表头的 CSV', () => {
    const csvContent = buildBillingUsageHistoryCsv(BASIC_SUMMARY_FIXTURE)

    expect(csvContent).toContain('账期 key,2026-03')
    expect(csvContent).toContain('分类,项目,描述,数量,单价(USD),金额(USD)')
    expect(csvContent).toContain('收费项,基础套餐,Basic 月费,1 套,199,199')
    expect(csvContent).toContain('预计结算总计,,,,,408')
  })

  it('导出文件名优先使用账期 key', () => {
    expect(createBillingUsageHistoryFilename(BASIC_SUMMARY_FIXTURE)).toBe('billing-details-2026-03.csv')
  })
})
