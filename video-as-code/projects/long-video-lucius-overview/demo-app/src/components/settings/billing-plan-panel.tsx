import { CreditCard, Gauge, Layers3, ShieldCheck, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { SettingsSectionShell, SETTINGS_SECTION_SURFACE_CLASS_NAME } from '@/components/settings/settings-section-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { listBillingPlanConfigs } from '@/lib/billing/plan-config'
import { getBillingPlanDisplayName } from '@/lib/billing/plan-label'
import { calculateUsagePercent } from '@/lib/billing/pricing-policy'
import type { BillingOverageMode, BillingPlanCode, BillingPlanConfig, BillingSummary } from '@/lib/billing/types'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { cn } from '@/lib/utils'

type BillingPlanPanelProps = {
  summary: BillingSummary
  companyName: string | null
  isMutating: boolean
  onStartCheckout: (planCode: Exclude<BillingPlanCode, 'free'>) => Promise<void>
  onOpenPortal: () => Promise<void>
  onUpdateUsagePolicy: (payload: {
    overageMode: BillingOverageMode
    overageSpendCapUsd: number | null
  }) => Promise<void>
}

type StatusVisual = {
  label: string
  badgeClassName: string
}

const STATUS_VISUAL_MAP: Record<BillingSummary['displayState'], StatusVisual> = {
  free_active: {
    label: m.billing_display_free_active(),
    badgeClassName: 'border-[#D1D5DB] bg-[#F8FAFC] text-slate-600',
  },
  free_limit_reached: {
    label: m.billing_display_free_limit_reached(),
    badgeClassName: 'border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]',
  },
  basic_trial: {
    label: m.billing_display_basic_trial(),
    badgeClassName: 'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]',
  },
  basic_active: {
    label: m.billing_display_basic_active(),
    badgeClassName: 'border-[#C7D2FE] bg-[#EEF2FF] text-[#4338CA]',
  },
  basic_canceling: {
    label: m.billing_display_basic_canceling(),
    badgeClassName: 'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]',
  },
  pro_trial: {
    label: m.billing_display_pro_trial(),
    badgeClassName: 'border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1]',
  },
  pro_active: {
    label: m.billing_display_pro_active(),
    badgeClassName: 'border-[#A7F3D0] bg-[#ECFDF5] text-[#047857]',
  },
  pro_canceling: {
    label: m.billing_display_pro_canceling(),
    badgeClassName: 'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]',
  },
  promo_only_basic: {
    label: m.billing_display_promo_only_basic(),
    badgeClassName: 'border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]',
  },
  past_due: {
    label: m.billing_display_past_due(),
    badgeClassName: 'border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]',
  },
  expired: {
    label: m.billing_display_expired(),
    badgeClassName: 'border-[#E5E7EB] bg-[#F8FAFC] text-slate-500',
  },
}

function formatUsdAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)
}

function formatShortDate(value: string | null): string | null {
  if (!value) {
    return null
  }

  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat(getLocale() === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(parsedDate)
}

/**
 * 统一输出当前计划下最重要的账期提示。
 * 页面不显示大段解释，只保留“何时结束 / 何时扣费”的短句。
 */
function buildBillingTimelineText(summary: BillingSummary): string {
  const trialEndLabel = formatShortDate(summary.trialEndAt)
  const nextBillingLabel = formatShortDate(summary.nextBillingAt)
  const currentPeriodEndLabel = formatShortDate(summary.currentPeriodEndAt)

  if (summary.displayState === 'basic_trial' || summary.displayState === 'pro_trial') {
    return trialEndLabel ? m.billing_trial_ends_on({ date: trialEndLabel }) : m.billing_trialing()
  }

  if (summary.displayState === 'basic_canceling' || summary.displayState === 'pro_canceling') {
    return currentPeriodEndLabel ? m.billing_ends_on({ date: currentPeriodEndLabel }) : m.billing_stop_after_period()
  }

  if (summary.displayState === 'free_limit_reached') {
    return m.billing_limit_reached()
  }

  if (nextBillingLabel) {
    return m.billing_next_billing({ date: nextBillingLabel })
  }

  return m.billing_current_period_normal()
}

function BillingMetricCard(props: {
  icon: typeof Gauge
  label: string
  value: string
  toneClassName?: string
}) {
  const { icon: Icon, label, value, toneClassName } = props

  return (
    <Card className={cn(SETTINGS_SECTION_SURFACE_CLASS_NAME, 'border-slate-200')}>
      <CardContent className="flex items-center gap-3 p-4">
        <div className={cn('flex size-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600', toneClassName)}>
          <Icon className="size-4" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{label}</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * 套餐页骨架：
 * - 保留左侧主卡 + 右侧策略卡的双栏结构；
 * - 避免 billing summary 未返回时只看到一张“加载中”空卡。
 */
export function BillingPlanPanelSkeleton() {
  return (
    <SettingsSectionShell
      title={m.billing_plan_title()}
      actions={<Skeleton className="dashboard-skeleton--soft h-7 w-[92px] rounded-full" />}
    >
      <Card className="overflow-hidden border-0 bg-transparent shadow-none">
        <CardContent className="grid gap-4 p-0 xl:grid-cols-[1.35fr_0.9fr]">
          <section className="dashboard-skeleton-frame space-y-6 overflow-hidden rounded-[28px] border p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="dashboard-skeleton--base h-3 w-[96px] rounded-[4px]" />
                  <Skeleton className="dashboard-skeleton--soft h-7 w-[84px] rounded-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="dashboard-skeleton--base h-9 w-[240px] rounded-[12px]" />
                  <Skeleton className="dashboard-skeleton--soft h-4 w-[320px] rounded-[6px]" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Skeleton className="dashboard-skeleton--accent h-9 w-[144px] rounded-full" />
                <Skeleton className="dashboard-skeleton--soft h-9 w-[128px] rounded-full" />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={`billing-plan-metric-skeleton-${index}`} className="dashboard-skeleton-surface space-y-3 rounded-2xl border p-4">
                  <Skeleton className="dashboard-skeleton--strong h-10 w-10 rounded-2xl" />
                  <Skeleton className="dashboard-skeleton--base h-3 w-[92px] rounded-[4px]" />
                  <Skeleton className="dashboard-skeleton--soft h-6 w-[120px] rounded-[8px]" />
                </div>
              ))}
            </div>

            <div className="dashboard-skeleton-surface space-y-4 rounded-2xl border p-5">
              <div className="space-y-2">
                <Skeleton className="dashboard-skeleton--base h-4 w-[142px] rounded-[4px]" />
                <Skeleton className="dashboard-skeleton--soft h-3 w-[72%] rounded-[4px]" />
              </div>
              <Skeleton className="dashboard-skeleton--soft h-3 w-full rounded-[4px]" />
              <Skeleton className="dashboard-skeleton--accent h-2.5 w-full rounded-full" />
            </div>
          </section>

          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <section key={`billing-plan-side-skeleton-${index}`} className="dashboard-skeleton-frame space-y-4 rounded-[24px] border p-5">
                <div className="space-y-2">
                  <Skeleton className="dashboard-skeleton--base h-5 w-[132px] rounded-[6px]" />
                  <Skeleton className="dashboard-skeleton--soft h-3 w-[78%] rounded-[4px]" />
                </div>

                <div className="space-y-3">
                  <Skeleton className="dashboard-skeleton--soft h-11 w-full rounded-[12px]" />
                  <Skeleton className="dashboard-skeleton--soft h-11 w-full rounded-[12px]" />
                  <Skeleton className="dashboard-skeleton--accent h-10 w-[132px] rounded-[12px]" />
                </div>
              </section>
            ))}
          </div>
        </CardContent>
      </Card>
    </SettingsSectionShell>
  )
}

/**
 * 套餐页主面板：
 * - 汇总当前计划、账期、额度和 overage 策略；
 * - 保留最少但必要的 CTA，避免页面被冗余文案淹没。
 */
export function BillingPlanPanel(props: BillingPlanPanelProps) {
  const { summary, companyName, isMutating, onStartCheckout, onOpenPortal, onUpdateUsagePolicy } = props
  const statusVisual = STATUS_VISUAL_MAP[summary.displayState]
  const currentPlanLabel = getBillingPlanDisplayName(summary.planCode)
  const usagePercent = calculateUsagePercent(summary.usedActions, summary.includedActions)
  const planOptions = useMemo(
    () =>
      listBillingPlanConfigs().filter(
        (
          planConfig,
        ): planConfig is BillingPlanConfig & { planCode: 'basic' | 'pro' } =>
          planConfig.planCode !== 'free',
      ),
    [],
  )

  const [draftOverageMode, setDraftOverageMode] = useState<BillingOverageMode>(summary.overageMode)
  const [draftSpendCapInput, setDraftSpendCapInput] = useState<string>(
    summary.overageSpendCapUsd ? String(summary.overageSpendCapUsd) : '',
  )

  useEffect(() => {
    setDraftOverageMode(summary.overageMode)
    setDraftSpendCapInput(summary.overageSpendCapUsd ? String(summary.overageSpendCapUsd) : '')
  }, [summary.overageMode, summary.overageSpendCapUsd])

  const usageBarClassName =
    usagePercent >= 100
      ? 'bg-[#ef4444]'
      : usagePercent >= 80
        ? 'bg-[#f59e0b]'
        : 'bg-[#0f766e]'

  const handleSaveUsagePolicy = async (): Promise<void> => {
    const parsedSpendCap = draftSpendCapInput.trim() ? Number(draftSpendCapInput.trim()) : null
    await onUpdateUsagePolicy({
      overageMode: draftOverageMode,
      overageSpendCapUsd: parsedSpendCap,
    })
  }

  return (
    <SettingsSectionShell
      title={m.billing_plan_title()}
      actions={
        <Badge className={cn('border px-3 py-1 text-xs font-medium', statusVisual.badgeClassName)} variant="outline">
          {statusVisual.label}
        </Badge>
      }
    >
      <Card className="overflow-hidden border-0 bg-transparent shadow-none">
        <CardContent className="grid gap-4 p-0 xl:grid-cols-[1.35fr_0.9fr]">
          <section className="overflow-hidden rounded-[28px] border border-[#d8e1ec] bg-[linear-gradient(145deg,#f8fbff_0%,#eef4fb_54%,#ffffff_100%)] p-6 shadow-[0_14px_32px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {m.billing_account_label()}
                  </p>
                  <Badge
                    className={cn('border px-2.5 py-1 text-[11px] font-medium', statusVisual.badgeClassName)}
                    variant="outline"
                  >
                    {statusVisual.label}
                  </Badge>
                </div>

                <div>
                  <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-slate-950">
                    {companyName || m.billing_current_workspace()}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {currentPlanLabel} · {buildBillingTimelineText(summary)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {summary.actions.canStartTrial ? (
                  <>
                    <Button
                      type="button"
                      variant="dashboardPrimary"
                      size="sm"
                      className="rounded-full px-4"
                      disabled={isMutating}
                      onClick={() => void onStartCheckout('basic')}
                    >
                      {m.billing_start_basic_trial()}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="dashboardTinted"
                      className="rounded-full px-4"
                      disabled={isMutating}
                      onClick={() => void onStartCheckout('pro')}
                    >
                      {m.billing_start_pro_trial()}
                    </Button>
                  </>
                ) : null}

                {summary.actions.canOpenPortal ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="dashboardTinted"
                    className="rounded-full px-4"
                    disabled={isMutating}
                    onClick={() => void onOpenPortal()}
                  >
                    <CreditCard className="size-4" />
                    {m.billing_manage_payment_method()}
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <BillingMetricCard
                icon={Gauge}
                label={m.billing_metric_projected()}
                value={formatUsdAmount(summary.projectedMonthlyChargeUsd)}
                toneClassName="bg-[#dff4ef] text-[#0f766e]"
              />
              <BillingMetricCard
                icon={ShieldCheck}
                label={m.billing_metric_admins()}
                value={`${summary.currentBillableAdminCount} / ${summary.includedAdmins}`}
                toneClassName="bg-[#e8ecff] text-[#4f46e5]"
              />
              <BillingMetricCard
                icon={Layers3}
                label={m.billing_metric_platforms()}
                value={`${summary.currentPlatformCount} / ${summary.includedPlatforms}`}
                toneClassName="bg-[#fff1dc] text-[#c2410c]"
              />
            </div>

            <div className="mt-6 rounded-[24px] border border-white/80 bg-white/85 p-5 backdrop-blur">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{m.billing_actions_label()}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                      {summary.usedActions.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-500">
                      {m.billing_actions_included_month({ count: summary.includedActions.toLocaleString() })}
                    </span>
                  </div>
                </div>

                <div className="text-right text-sm text-slate-500">
                  {summary.billableOverageActions > 0 ? (
                    <p>
                      {m.billing_overage_summary({
                        count: summary.billableOverageActions.toLocaleString(),
                        amount: formatUsdAmount(summary.projectedOverageAmountUsd),
                      })}
                    </p>
                  ) : (
                    <p>{m.billing_no_overage_fee()}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={cn('h-full rounded-full transition-[width] duration-300', usageBarClassName)}
                  style={{ width: `${Math.min(usagePercent, 100)}%` }}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>{m.billing_usage_rate({ percent: usagePercent })}</span>
                <span>
                  {summary.extraAdminCount > 0
                    ? m.billing_extra_admin({ count: summary.extraAdminCount })
                    : m.billing_no_extra_admin()}{' '}
                  ·{' '}
                  {summary.extraPlatformCount > 0
                    ? m.billing_extra_platform({ count: summary.extraPlatformCount })
                    : m.billing_no_extra_platform()}
                </span>
              </div>
            </div>
          </section>

          <section className={cn(SETTINGS_SECTION_SURFACE_CLASS_NAME, 'rounded-[28px] p-6')}>
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Sparkles className="size-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{m.billing_overage_policy_title()}</h3>
                <p className="text-sm text-slate-500">{m.billing_overage_policy_subtitle()}</p>
              </div>
            </div>

            {summary.planCode === 'free' ? (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                {m.billing_free_fixed_stop_service()}
              </div>
            ) : (
              <>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className={cn(
                      'rounded-2xl border px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-100',
                      draftOverageMode === 'stop_service'
                        ? 'border-[var(--dashboard-action-primary-bg)] bg-[var(--dashboard-action-primary-bg)] text-[var(--dashboard-action-primary-fg)] disabled:border-[var(--dashboard-action-primary-disabled-bg)] disabled:bg-[var(--dashboard-action-primary-disabled-bg)]'
                        : 'border-[var(--dashboard-action-tinted-border)] bg-[var(--dashboard-action-tinted-bg)] text-[var(--dashboard-action-tinted-fg)] hover:bg-[var(--dashboard-action-tinted-hover-bg)] disabled:border-[var(--dashboard-action-tinted-disabled-border)] disabled:bg-[var(--dashboard-action-tinted-disabled-bg)] disabled:text-[var(--dashboard-action-tinted-disabled-text)]',
                    )}
                    disabled={isMutating}
                    onClick={() => setDraftOverageMode('stop_service')}
                  >
                    <p className="text-sm font-medium">{m.billing_policy_stop_service_title()}</p>
                    <p className="mt-1 text-xs opacity-80">{m.billing_policy_stop_service_desc()}</p>
                  </button>

                  <button
                    type="button"
                    className={cn(
                      'rounded-2xl border px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-100',
                      draftOverageMode === 'auto_charge'
                        ? 'border-[var(--dashboard-action-primary-bg)] bg-[var(--dashboard-action-primary-bg)] text-[var(--dashboard-action-primary-fg)] disabled:border-[var(--dashboard-action-primary-disabled-bg)] disabled:bg-[var(--dashboard-action-primary-disabled-bg)]'
                        : 'border-[var(--dashboard-action-tinted-border)] bg-[var(--dashboard-action-tinted-bg)] text-[var(--dashboard-action-tinted-fg)] hover:bg-[var(--dashboard-action-tinted-hover-bg)] disabled:border-[var(--dashboard-action-tinted-disabled-border)] disabled:bg-[var(--dashboard-action-tinted-disabled-bg)] disabled:text-[var(--dashboard-action-tinted-disabled-text)]',
                    )}
                    disabled={isMutating}
                    onClick={() => setDraftOverageMode('auto_charge')}
                  >
                    <p className="text-sm font-medium">{m.billing_policy_auto_charge_title()}</p>
                    <p className="mt-1 text-xs opacity-80">{m.billing_policy_auto_charge_desc()}</p>
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                    {m.billing_monthly_overage_cap()}
                  </label>
                  <Input
                    inputMode="decimal"
                    value={draftSpendCapInput}
                    disabled={isMutating || draftOverageMode !== 'auto_charge'}
                    onChange={(event) => setDraftSpendCapInput(event.target.value)}
                    placeholder={m.billing_example_cap()}
                    className="h-11 rounded-2xl border-slate-200 bg-slate-50"
                  />
                </div>

                <Button
                  type="button"
                  variant="dashboardPrimary"
                  className="mt-4 h-11 w-full rounded-2xl"
                  disabled={isMutating}
                  onClick={() => void handleSaveUsagePolicy()}
                >
                  {m.billing_save_policy()}
                </Button>
              </>
            )}
          </section>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {planOptions.map((planOption) => {
          const isCurrentPlan = summary.planCode === planOption.planCode
          const isUpgradeTarget = summary.planCode === 'basic' && planOption.planCode === 'pro'

          return (
            <Card
              key={planOption.planCode}
              className={cn(
                SETTINGS_SECTION_SURFACE_CLASS_NAME,
                'rounded-[26px] border p-0',
                isCurrentPlan ? 'border-slate-900' : 'border-slate-200',
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[24px] font-semibold tracking-[-0.03em] text-slate-950">
                      {getBillingPlanDisplayName(planOption.planCode)}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {m.billing_monthly_price({ amount: formatUsdAmount(planOption.baseMonthlyAmountUsd) })}
                    </p>
                  </div>

                  {isCurrentPlan ? (
                    <Badge className="border-slate-900 bg-slate-900 text-white" variant="outline">
                      {m.billing_current_plan()}
                    </Badge>
                  ) : null}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{m.billing_actions_label()}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {planOption.includedActions.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{m.billing_metric_admins()}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{planOption.includedAdmins}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{m.billing_metric_overage()}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {planOption.overageUnitAmountUsd
                        ? m.billing_overage_per_action({ amount: formatUsdAmount(planOption.overageUnitAmountUsd) })
                        : m.billing_unsupported()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-500">
                    {m.billing_addon_summary({
                      platform: formatUsdAmount(99),
                      admin: formatUsdAmount(49),
                    })}
                  </p>

                  {!isCurrentPlan ? (
                    <Button
                      type="button"
                      variant={isUpgradeTarget ? 'dashboardPrimary' : 'dashboardTinted'}
                      className="rounded-full px-4"
                      disabled={isMutating || !summary.actions.canStartTrial}
                      onClick={() => void onStartCheckout(planOption.planCode)}
                    >
                      {summary.actions.canStartTrial ? m.billing_start_trial() : m.common_coming_soon()}
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </SettingsSectionShell>
  )
}
