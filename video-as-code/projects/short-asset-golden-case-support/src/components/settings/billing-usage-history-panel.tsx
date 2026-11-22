import { CalendarClock, DatabaseZap, Download, ExternalLink, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

import { SettingsSectionShell, SETTINGS_SECTION_SURFACE_CLASS_NAME } from '@/components/settings/settings-section-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getBillingPlanDisplayName } from '@/lib/billing/plan-label'
import type { BillingInvoice, BillingSummary } from '@/lib/billing/types'
import {
  buildBillingDetailRows,
  buildBillingUsageHistoryCsv,
  createBillingUsageHistoryFilename,
  formatBillingUsdAmount,
} from '@/lib/billing/usage-history-export'
import { Button, buttonVariants } from '@/components/ui/button'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { cn } from '@/lib/utils'

type BillingUsageHistoryPanelProps = {
  invoiceErrorMessage: string | null
  invoices: BillingInvoice[]
  isInvoicesLoading: boolean
  summary: BillingSummary
}

type BillingDetailLineItemProps = {
  amount: string
  description: string
  isBillable: boolean
  label: string
  quantity: string
  unitPrice: string
}

type BillingInvoiceRowProps = {
  invoice: BillingInvoice
}

function formatDateRange(startAt: string | null, endAt: string | null): string {
  const formatter = new Intl.DateTimeFormat(getLocale() === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
  })

  if (!startAt || !endAt) {
    return m.billing_current_period()
  }

  const startDate = new Date(startAt)
  const endDate = new Date(endAt)
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return m.billing_current_period()
  }

  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`
}

function formatCalendarDate(value: string | null): string {
  if (!value) {
    return '—'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat(getLocale() === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function formatInvoicePeriod(invoice: BillingInvoice): string {
  if (invoice.periodStartAt && invoice.periodEndAt) {
    return `${formatDateRange(invoice.periodStartAt, invoice.periodEndAt)}`
  }

  return m.billing_created_on({ date: formatCalendarDate(invoice.createdAt) })
}

function formatInvoiceStatus(status: string | null): string {
  switch (status) {
    case 'paid':
      return m.billing_invoice_status_paid()
    case 'open':
      return m.billing_invoice_status_open()
    case 'void':
      return m.billing_invoice_status_void()
    case 'uncollectible':
      return m.billing_invoice_status_uncollectible()
    case 'draft':
      return m.billing_invoice_status_draft()
    default:
      return status || m.billing_invoice_status_unknown()
  }
}

function formatInvoiceAmount(invoice: BillingInvoice): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: invoice.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(invoice.totalAmount)
  } catch {
    return `${invoice.currency} ${invoice.totalAmount}`
  }
}

function downloadBillingUsageHistory(summary: BillingSummary): void {
  try {
    const csvContent = buildBillingUsageHistoryCsv(summary)
    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: 'text/csv;charset=utf-8',
    })
    const downloadUrl = URL.createObjectURL(blob)
    const anchor = document.createElement('a')

    anchor.href = downloadUrl
    anchor.download = createBillingUsageHistoryFilename(summary)
    document.body.append(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => {
      URL.revokeObjectURL(downloadUrl)
    }, 0)
    toast.success(m.billing_export_success())
  } catch (error) {
    toast.error(error instanceof Error ? error.message : m.billing_export_error())
  }
}

function UsageHistoryCard(props: {
  icon: typeof CalendarClock
  title: string
  value: string
  helper: string
}) {
  const { icon: Icon, title, value, helper } = props

  return (
    <Card className={SETTINGS_SECTION_SURFACE_CLASS_NAME}>
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <Icon className="size-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-950">{value}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">{helper}</p>
      </CardContent>
    </Card>
  )
}

function BillingUsageMetricSkeleton() {
  return (
    <Card className={SETTINGS_SECTION_SURFACE_CLASS_NAME}>
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="dashboard-skeleton--strong size-10 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="dashboard-skeleton--base h-3 w-[96px] rounded-[4px]" />
              <Skeleton className="dashboard-skeleton--soft h-6 w-[128px] rounded-[8px]" />
            </div>
          </div>
          <Skeleton className="dashboard-skeleton--soft h-3 w-[86%] rounded-[4px]" />
        </div>
      </CardContent>
    </Card>
  )
}

function BillingInvoiceListSkeleton() {
  return (
    <div className="space-y-3 px-4 py-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={`billing-invoice-skeleton-${index}`} className="dashboard-skeleton-frame rounded-2xl border px-4 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="dashboard-skeleton--base h-4 w-[112px] rounded-[4px]" />
                <Skeleton className="dashboard-skeleton--soft h-6 w-[64px] rounded-full" />
              </div>
              <Skeleton className="dashboard-skeleton--soft h-3 w-[220px] rounded-[4px]" />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="space-y-2 sm:text-right">
                <Skeleton className="dashboard-skeleton--base ml-auto h-3 w-[72px] rounded-[4px]" />
                <Skeleton className="dashboard-skeleton--soft ml-auto h-6 w-[108px] rounded-[8px]" />
              </div>

              <div className="flex flex-wrap gap-2 sm:justify-end">
                <Skeleton className="dashboard-skeleton--soft h-8 w-[112px] rounded-[10px]" />
                <Skeleton className="dashboard-skeleton--soft h-8 w-[124px] rounded-[10px]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BillingDetailLineItem(props: BillingDetailLineItemProps) {
  const { amount, description, isBillable, label, quantity, unitPrice } = props

  return (
    <article
      className={cn(
        'grid gap-3 px-4 py-4 md:grid-cols-[minmax(0,1.5fr)_140px_140px_140px] md:items-center',
        isBillable ? 'bg-white' : 'bg-slate-50/80',
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 md:contents">
        <div className="rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0">
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 md:hidden">{m.billing_table_quantity()}</p>
          <p className="mt-1 text-sm text-slate-600 md:mt-0 md:text-right">{quantity}</p>
        </div>

        <div className="rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0">
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 md:hidden">{m.billing_table_unit_price()}</p>
          <p className="mt-1 text-sm text-slate-500 md:mt-0 md:text-right">{unitPrice}</p>
        </div>

        <div className="rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0">
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400 md:hidden">{m.billing_table_amount()}</p>
          <p
            className={cn(
              'mt-1 text-sm md:mt-0 md:text-right',
              isBillable ? 'font-medium text-slate-900' : 'text-slate-500',
            )}
          >
            {amount}
          </p>
        </div>
      </div>
    </article>
  )
}

function BillingInvoiceRow(props: BillingInvoiceRowProps) {
  const { invoice } = props

  return (
    <article className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium text-slate-900">{invoice.number || invoice.id}</p>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
              {formatInvoiceStatus(invoice.status)}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span>{formatInvoicePeriod(invoice)}</span>
            <span>
              {invoice.paidAt
                ? m.billing_paid_on({ date: formatCalendarDate(invoice.paidAt) })
                : m.billing_created_on({ date: formatCalendarDate(invoice.createdAt) })}
            </span>
          </div>
        </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="min-w-[120px] text-left sm:text-right">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{m.billing_table_amount()}</p>
              <p className="mt-1 text-base font-semibold text-slate-950">{formatInvoiceAmount(invoice)}</p>
            </div>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            {invoice.hostedInvoiceUrl ? (
              <a
                className={cn(
                  buttonVariants({
                    variant: 'dashboardTinted',
                    size: 'sm',
                  }),
                  'font-medium',
                )}
                href={invoice.hostedInvoiceUrl}
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLink className="size-4" />
                {m.billing_view_invoice()}
              </a>
            ) : null}

            {invoice.invoicePdfUrl ? (
              <a
                className={cn(
                  buttonVariants({
                    variant: 'dashboardTinted',
                    size: 'sm',
                  }),
                  'font-medium',
                )}
                href={invoice.invoicePdfUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Download className="size-4" />
                {m.billing_download_invoice()}
              </a>
            ) : null}

            {invoice.receiptUrl ? (
              <a
                className={cn(
                  buttonVariants({
                    variant: 'dashboardTinted',
                    size: 'sm',
                  }),
                  'font-medium',
                )}
                href={invoice.receiptUrl}
                rel="noreferrer"
                target="_blank"
              >
                <Download className="size-4" />
                {m.billing_download_receipt()}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * 用量历史页骨架：
 * - 先占住顶部三张统计卡与下方两大区块；
 * - 当 summary 尚未返回时，整个分区仍维持接近真实的信息密度。
 */
export function BillingUsageHistoryPanelSkeleton() {
  return (
    <SettingsSectionShell title={m.billing_usage_title()}>
      <div className="grid gap-4 lg:grid-cols-3">
        <BillingUsageMetricSkeleton />
        <BillingUsageMetricSkeleton />
        <BillingUsageMetricSkeleton />
      </div>

      <Card className={SETTINGS_SECTION_SURFACE_CLASS_NAME}>
        <CardContent className="flex flex-col gap-4 p-5 text-sm text-slate-600">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-2">
              <Skeleton className="dashboard-skeleton--base h-3 w-[86px] rounded-[4px]" />
              <Skeleton className="dashboard-skeleton--soft h-5 w-[188px] rounded-[6px]" />
            </div>

            <div className="space-y-2 text-right">
              <Skeleton className="dashboard-skeleton--base ml-auto h-3 w-[132px] rounded-[4px]" />
              <Skeleton className="dashboard-skeleton--soft ml-auto h-5 w-[112px] rounded-[6px]" />
            </div>
          </div>

          <div className="dashboard-skeleton-surface rounded-2xl border">
            <div className="space-y-2 border-b border-[var(--dashboard-skeleton-divider)] px-4 py-3">
              <Skeleton className="dashboard-skeleton--base h-4 w-[148px] rounded-[4px]" />
              <Skeleton className="dashboard-skeleton--soft h-3 w-[242px] rounded-[4px]" />
            </div>
            <BillingInvoiceListSkeleton />
          </div>

          <div className="dashboard-skeleton-surface rounded-2xl border">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--dashboard-skeleton-divider)] px-4 py-3">
              <div className="space-y-2">
                <Skeleton className="dashboard-skeleton--base h-4 w-[122px] rounded-[4px]" />
                <Skeleton className="dashboard-skeleton--soft h-3 w-[220px] rounded-[4px]" />
              </div>

              <Skeleton className="dashboard-skeleton--accent h-9 w-[108px] rounded-[10px]" />
            </div>

            <div className="space-y-3 px-4 py-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={`billing-detail-skeleton-${index}`} className="dashboard-skeleton-frame rounded-2xl border px-4 py-4">
                  <div className="grid gap-3 md:grid-cols-[minmax(0,1.5fr)_140px_140px_140px]">
                    <div className="space-y-2">
                      <Skeleton className="dashboard-skeleton--base h-4 w-[144px] rounded-[4px]" />
                      <Skeleton className="dashboard-skeleton--soft h-3 w-[76%] rounded-[4px]" />
                    </div>
                    <Skeleton className="dashboard-skeleton--soft h-10 rounded-[10px] md:h-4 md:justify-self-end md:w-[80px]" />
                    <Skeleton className="dashboard-skeleton--soft h-10 rounded-[10px] md:h-4 md:justify-self-end md:w-[92px]" />
                    <Skeleton className="dashboard-skeleton--base h-10 rounded-[10px] md:h-4 md:justify-self-end md:w-[84px]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </SettingsSectionShell>
  )
}

export function BillingUsageHistoryPanel(props: BillingUsageHistoryPanelProps) {
  const { invoiceErrorMessage, invoices, isInvoicesLoading, summary } = props
  const currentPlanLabel = getBillingPlanDisplayName(summary.planCode)
  const detailRows = buildBillingDetailRows(summary)

  return (
    <SettingsSectionShell title={m.billing_usage_title()}>
      <div className="grid gap-4 lg:grid-cols-3">
        <UsageHistoryCard
          icon={CalendarClock}
          title={m.billing_current_period()}
          value={formatDateRange(summary.currentPeriodStartAt, summary.currentPeriodEndAt)}
          helper={summary.periodKey ? m.billing_period_key({ key: summary.periodKey }) : m.billing_period_key_later()}
        />

        <UsageHistoryCard
          icon={DatabaseZap}
          title={m.billing_used_actions_title()}
          value={summary.usedActions.toLocaleString()}
          helper={
            summary.blockedActions > 0
              ? m.billing_blocked_actions({ count: summary.blockedActions.toLocaleString() })
              : m.billing_no_blocked_actions()
          }
        />

        <UsageHistoryCard
          icon={TrendingUp}
          title={m.billing_overage_title()}
          value={summary.billableOverageActions.toLocaleString()}
          helper={
            summary.projectedOverageAmountUsd > 0
              ? m.billing_projected_overage({
                  amount: formatBillingUsdAmount(summary.projectedOverageAmountUsd),
                })
              : m.billing_no_overage_yet()
          }
        />
      </div>

      <Card className={SETTINGS_SECTION_SURFACE_CLASS_NAME}>
        <CardContent className="flex flex-col gap-4 p-5 text-sm text-slate-600">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{m.billing_state_title()}</p>
              <p className="mt-1 text-base font-medium text-slate-900">
                {currentPlanLabel} · {summary.overageMode === 'auto_charge' ? m.billing_auto_charge() : m.billing_stop_service()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{m.billing_estimated_invoice_title()}</p>
              <p className="mt-1 text-base font-medium text-slate-900">
                {formatBillingUsdAmount(summary.projectedMonthlyChargeUsd)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">{m.billing_stripe_invoices_title()}</p>
                <p className="mt-1 text-xs text-slate-500">{m.billing_stripe_invoices_hint()}</p>
              </div>
            </div>

            {isInvoicesLoading ? <BillingInvoiceListSkeleton /> : null}

            {!isInvoicesLoading && invoiceErrorMessage ? (
              <div className="px-4 py-6 text-sm text-red-700">{invoiceErrorMessage}</div>
            ) : null}

            {!isInvoicesLoading && !invoiceErrorMessage && invoices.length === 0 ? (
              <div className="px-4 py-6 text-sm text-slate-500">{m.billing_stripe_empty()}</div>
            ) : null}

            {!isInvoicesLoading && !invoiceErrorMessage && invoices.length > 0 ? (
              <div className="space-y-3 px-4 py-4">
                {invoices.map((invoice) => (
                  <BillingInvoiceRow key={invoice.id} invoice={invoice} />
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">{m.billing_snapshot_title()}</p>
                <p className="mt-1 text-xs text-slate-500">{m.billing_snapshot_hint()}</p>
              </div>

              <Button
                className="font-medium"
                size="sm"
                title={m.billing_snapshot_export_title()}
                type="button"
                variant="dashboardTinted"
                onClick={() => {
                  downloadBillingUsageHistory(summary)
                }}
              >
                <Download className="size-4" />
                {m.billing_snapshot_export()}
              </Button>
            </div>

            <div className="hidden border-b border-slate-200 bg-white/70 px-4 py-3 text-xs uppercase tracking-[0.14em] text-slate-400 md:grid md:grid-cols-[minmax(0,1.5fr)_140px_140px_140px]">
              <p>{m.billing_table_project()}</p>
              <p className="text-right">{m.billing_table_quantity()}</p>
              <p className="text-right">{m.billing_table_unit_price()}</p>
              <p className="text-right">{m.billing_table_amount()}</p>
            </div>

            <div className="divide-y divide-slate-200">
              {detailRows.map((row) => (
                <BillingDetailLineItem
                  key={row.id}
                  amount={formatBillingUsdAmount(row.amountUsd)}
                  description={row.description}
                  isBillable={row.kind === 'charge'}
                  label={row.label}
                  quantity={row.quantity}
                  unitPrice={formatBillingUsdAmount(row.unitPriceUsd)}
                />
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-4">
              <div>
                <p className="text-sm font-medium text-slate-900">{m.billing_estimated_total()}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {summary.periodKey ? m.billing_period_key({ key: summary.periodKey }) : m.billing_period_export_hint()}
                </p>
              </div>

              <p className="text-base font-semibold text-slate-950">
                {formatBillingUsdAmount(summary.projectedMonthlyChargeUsd)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </SettingsSectionShell>
  )
}
