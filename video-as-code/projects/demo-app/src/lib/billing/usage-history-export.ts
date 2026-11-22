import {
  ADMIN_ADDON_MONTHLY_AMOUNT_USD,
  PLATFORM_ADDON_MONTHLY_AMOUNT_USD,
  getBillingPlanConfig,
} from '@/lib/billing/plan-config'
import { getBillingPlanDisplayName } from '@/lib/billing/plan-label'
import type { BillingSummary } from '@/lib/billing/types'
import { m } from '@/paraglide/messages'

export type BillingDetailRowKind = 'charge' | 'informational'

export type BillingDetailRow = {
  id: string
  kind: BillingDetailRowKind
  label: string
  description: string
  quantity: string
  unitPriceUsd: number | null
  amountUsd: number | null
}

const USD_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

/**
 * 统一格式化 USD 金额，保证卡片展示与导出预览口径一致。
 */
export function formatBillingUsdAmount(amount: number | null): string {
  if (amount === null) {
    return '—'
  }

  return USD_FORMATTER.format(amount)
}

/**
 * 把当前账期摘要折叠成“账单明细分项”。
 * 这里刻意只依赖 BillingSummary，避免页面组件自己重新推导价格规则。
 */
export function buildBillingDetailRows(summary: BillingSummary): BillingDetailRow[] {
  const planConfig = getBillingPlanConfig(summary.planCode)
  const planName = getBillingPlanDisplayName(summary.planCode)
  const overageModeLabel = summary.overageMode === 'auto_charge' ? m.billing_auto_charge() : m.billing_stop_service()
  const rows: BillingDetailRow[] = [
    {
      id: 'base-plan',
      kind: 'charge',
      label: m.billing_export_base_plan_label(),
      description: m.billing_export_base_plan_description({ planName }),
      quantity: m.billing_export_base_plan_quantity(),
      unitPriceUsd: planConfig.baseMonthlyAmountUsd,
      amountUsd: planConfig.baseMonthlyAmountUsd,
    },
    {
      id: 'included-actions',
      kind: 'informational',
      label: m.billing_export_included_actions_label(),
      description: m.billing_export_included_actions_desc(),
      quantity: m.billing_export_quantity_actions({ count: summary.includedActions.toLocaleString() }),
      unitPriceUsd: null,
      amountUsd: null,
    },
    {
      id: 'used-actions',
      kind: 'informational',
      label: m.billing_export_used_actions_label(),
      description:
        summary.usedActions > summary.includedActions
          ? m.billing_export_used_actions_desc_over()
          : m.billing_export_used_actions_desc_included(),
      quantity: m.billing_export_quantity_actions({ count: summary.usedActions.toLocaleString() }),
      unitPriceUsd: null,
      amountUsd: null,
    },
  ]

  if (summary.extraAdminCount > 0) {
    rows.push({
      id: 'extra-admins',
      kind: 'charge',
      label: m.billing_export_extra_admins_label(),
      description: m.billing_export_extra_admins_desc(),
      quantity: m.billing_export_quantity_admins({ count: summary.extraAdminCount.toLocaleString() }),
      unitPriceUsd: ADMIN_ADDON_MONTHLY_AMOUNT_USD,
      amountUsd: ADMIN_ADDON_MONTHLY_AMOUNT_USD * summary.extraAdminCount,
    })
  }

  if (summary.extraPlatformCount > 0) {
    rows.push({
      id: 'extra-platforms',
      kind: 'charge',
      label: m.billing_export_extra_platforms_label(),
      description: m.billing_export_extra_platforms_desc(),
      quantity: m.billing_export_quantity_platforms({ count: summary.extraPlatformCount.toLocaleString() }),
      unitPriceUsd: PLATFORM_ADDON_MONTHLY_AMOUNT_USD,
      amountUsd: PLATFORM_ADDON_MONTHLY_AMOUNT_USD * summary.extraPlatformCount,
    })
  }

  if (summary.billableOverageActions > 0 && planConfig.overageUnitAmountUsd !== null) {
    rows.push({
      id: 'overage-actions',
      kind: 'charge',
      label: m.billing_export_overage_actions_label(),
      description: m.billing_export_overage_actions_desc({ mode: overageModeLabel }),
      quantity: m.billing_export_quantity_actions({ count: summary.billableOverageActions.toLocaleString() }),
      unitPriceUsd: planConfig.overageUnitAmountUsd,
      amountUsd: summary.projectedOverageAmountUsd,
    })
  }

  if (summary.blockedActions > 0) {
    rows.push({
      id: 'blocked-actions',
      kind: 'informational',
      label: m.billing_export_blocked_actions_label(),
      description:
        summary.overageMode === 'stop_service'
          ? m.billing_export_blocked_actions_desc_stop()
          : m.billing_export_blocked_actions_desc_cap(),
      quantity: m.billing_export_quantity_actions({ count: summary.blockedActions.toLocaleString() }),
      unitPriceUsd: null,
      amountUsd: null,
    })
  }

  return rows
}

/**
 * 导出文件名优先复用账期 key，保证同一账期多次导出时命名稳定。
 */
export function createBillingUsageHistoryFilename(
  summary: Pick<BillingSummary, 'periodKey'>,
  now: Date = new Date(),
): string {
  if (summary.periodKey) {
    return `billing-details-${summary.periodKey}.csv`
  }

  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  return `billing-details-${year}-${month}.csv`
}

function formatCsvAmount(amount: number | null): string {
  if (amount === null) {
    return ''
  }

  return String(amount)
}

function escapeCsvCell(value: string): string {
  if (!/[",\r\n]/.test(value)) {
    return value
  }

  return `"${value.replaceAll('"', '""')}"`
}

function createCsvLine(columns: ReadonlyArray<string>): string {
  return columns.map(escapeCsvCell).join(',')
}

/**
 * 生成给 Excel / Numbers 直接打开的 CSV 文本。
 * 导出内容包含账期元信息和当前页面展示的全部分项，便于运营侧留档与核对。
 */
export function buildBillingUsageHistoryCsv(summary: BillingSummary): string {
  const rows = buildBillingDetailRows(summary)
  const planName = getBillingPlanDisplayName(summary.planCode)
  const overageModeLabel = summary.overageMode === 'auto_charge' ? m.billing_auto_charge() : m.billing_stop_service()
  const csvLines: string[] = [
    createCsvLine([m.billing_export_csv_account_id(), summary.billingAccountId]),
    createCsvLine([m.billing_export_csv_period_key(), summary.periodKey || '']),
    createCsvLine([m.billing_export_csv_period_start(), summary.currentPeriodStartAt || '']),
    createCsvLine([m.billing_export_csv_period_end(), summary.currentPeriodEndAt || '']),
    createCsvLine([m.billing_export_csv_plan(), planName]),
    createCsvLine([m.billing_export_csv_overage_policy(), overageModeLabel]),
    createCsvLine([m.billing_export_csv_projected_total(), String(summary.projectedMonthlyChargeUsd)]),
    '',
    createCsvLine([
      m.billing_export_csv_category(),
      m.billing_table_project(),
      m.billing_export_csv_description(),
      m.billing_table_quantity(),
      m.billing_table_unit_price(),
      m.billing_table_amount(),
    ]),
  ]

  rows.forEach((row: BillingDetailRow) => {
    csvLines.push(
      createCsvLine([
        row.kind === 'charge' ? m.billing_export_csv_charge() : m.billing_export_csv_info(),
        row.label,
        row.description,
        row.quantity,
        formatCsvAmount(row.unitPriceUsd),
        formatCsvAmount(row.amountUsd),
      ]),
    )
  })

  csvLines.push('')
  csvLines.push(
    createCsvLine([m.billing_export_csv_estimated_total(), '', '', '', '', String(summary.projectedMonthlyChargeUsd)]),
  )

  return csvLines.join('\r\n')
}
