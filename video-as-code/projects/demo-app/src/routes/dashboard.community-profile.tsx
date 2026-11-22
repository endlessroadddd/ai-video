import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts'
import {
  Loader2,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'

import * as m from '@/paraglide/messages'
import { DashboardPageHeader } from '@/components/dashboard-page-header'
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { requireAuthOrRedirect } from '@/lib/auth/guard'
import { useSelectedCompanyId } from '@/lib/company-selection'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import {
  fetchDailyActiveUsers,
  fetchDailyNewUsers,
  fetchPlatformOverview,
} from '@/lib/services/community-profile-api'

export const Route = createFileRoute('/dashboard/community-profile')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)
  },
  component: CommunityProfilePage,
})

const PLATFORM_LABELS: Record<string, () => string> = {
  discord: () => 'Discord',
  telegram: () => 'Telegram',
  slack: () => 'Slack',
  feishu: () => m.platform_feishu(),
  web: () => 'Web',
}

const PLATFORM_COLORS: Record<string, string> = {
  discord: '#5865F2',
  telegram: '#229ED9',
  slack: '#E01E5A',
  feishu: '#00D6B9',
  web: '#6B7280',
}

type TimeRange = '7' | '14' | '30'

const TIME_RANGE_OPTIONS: { value: TimeRange; labelKey: () => string }[] = [
  { value: '7', labelKey: () => m.cp_time_7d() },
  { value: '14', labelKey: () => m.cp_time_14d() },
  { value: '30', labelKey: () => m.cp_time_30d() },
]

function getPlatformLabel(platform: string): string {
  return PLATFORM_LABELS[platform]?.() || platform
}

function generateDateLabels(days: number): string[] {
  const labels: string[] = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    labels.push(d.toISOString().split('T')[0])
  }
  return labels
}

function filterByDateRange<T extends { date: string }>(items: T[], days: number): T[] {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  const cutoffStr = cutoff.toISOString().split('T')[0]
  return items.filter((item) => item.date >= cutoffStr)
}

function filterByPlatforms<T extends { platform: string }>(items: T[], platforms: string[]): T[] {
  if (platforms.length === 0) return items
  const set = new Set(platforms)
  return items.filter((item) => set.has(item.platform))
}

function sumByKey<T>(items: T[], key: keyof T): number {
  let total = 0
  for (const item of items) {
    const val = item[key]
    if (typeof val === 'number') total += val
  }
  return total
}

function buildLineChartData(
  dateLabels: string[],
  items: Array<{ platform: string; date: string }>,
  valueKey: string,
  platforms: string[],
): Array<Record<string, string | number>> {
  const byDate = new Map<string, Record<string, number>>()
  for (const item of items) {
    const record = item as Record<string, unknown>
    const val = typeof record[valueKey] === 'number' ? (record[valueKey] as number) : 0
    if (!byDate.has(item.date)) byDate.set(item.date, {})
    const entry = byDate.get(item.date)!
    entry[item.platform] = (entry[item.platform] || 0) + val
  }

  return dateLabels.map((date) => {
    const entry: Record<string, string | number> = { date: date.slice(5) }
    const values = byDate.get(date)
    for (const p of platforms) entry[p] = values?.[p] || 0
    return entry
  })
}

function ControlPanel(props: {
  selectedPlatform: string
  onPlatformChange: (value: string) => void
  allPlatforms: string[]
  timeRange: TimeRange
  onTimeRangeChange: (value: TimeRange) => void
}) {
  return (
    <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:justify-end">
      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0 text-[12px] font-medium text-[#64748B]">{m.cp_filter_community()}</span>
        <div className="min-w-[146px] flex-1 sm:flex-none">
          <Select value={props.selectedPlatform} onValueChange={props.onPlatformChange}>
            <SelectTrigger className="h-7 w-full rounded-[10px] border-[#E2E8F0] bg-[#F8FAFC] px-2.5 text-[12px] font-medium text-[#334155] shadow-none hover:bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{m.cp_all_communities({ count: String(props.allPlatforms.length) })}</SelectItem>
              {props.allPlatforms.map((p) => (
                <SelectItem key={p} value={p}>
                  {getPlatformLabel(p)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-2">
        <span className="shrink-0 text-[12px] font-medium text-[#64748B]">{m.cp_filter_time()}</span>
        <div className="min-w-[112px] flex-1 sm:flex-none">
          <Select
            value={props.timeRange}
            onValueChange={(value) => props.onTimeRangeChange(value as TimeRange)}
          >
            <SelectTrigger className="h-7 w-full rounded-[10px] border-[#E2E8F0] bg-[#F8FAFC] px-2.5 text-[12px] font-medium text-[#334155] shadow-none hover:bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_RANGE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.labelKey()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function SectionTitle(props: { title: string; trailing?: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-[#0F172A]">
        {props.title}
      </h2>
      <div className="w-full sm:w-auto">{props.trailing || null}</div>
    </div>
  )
}

function StatCard(props: {
  icon: ReactNode
  label: string
  value: number
  color: string
  helper: string
}) {
  return (
    <article className="group relative overflow-hidden rounded-[22px] border border-[#D8E1EC] bg-white/95 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-0.5">
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${props.color}, ${props.color}55)`,
        }}
      />
      <div
        className="absolute -right-8 top-0 h-24 w-24 rounded-full opacity-10 blur-2xl"
        style={{ background: `radial-gradient(circle, ${props.color} 0%, transparent 72%)` }}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[14px] font-semibold text-[#0F172A]">{props.label}</p>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl border"
          style={{
            backgroundColor: `${props.color}14`,
            borderColor: `${props.color}22`,
          }}
        >
          {props.icon}
        </div>
      </div>

      <p className="mt-4 text-[32px] font-semibold leading-none tracking-[-0.04em] text-[#020617]">
        {props.value.toLocaleString()}
      </p>
      <p className="mt-2 flex items-center gap-1 text-[11px] text-[#64748B]">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: props.color }}
        />
        {props.helper}
      </p>
    </article>
  )
}

function ChartPanelHeader(props: {
  title: string
}) {
  return (
    <div className="mb-2">
      <p className="text-[14px] font-semibold text-[#0F172A]">{props.title}</p>
    </div>
  )
}

function TrendChart(props: {
  title: string
  data: Array<Record<string, string | number>>
  platforms: string[]
  chartConfig: ChartConfig
  className?: string
}) {
  const { title, data, platforms, chartConfig, className } = props
  const hasData = data.some((entry) =>
    platforms.some((platform) => typeof entry[platform] === 'number' && Number(entry[platform]) > 0),
  )

  return (
    <section
      className={`flex min-h-0 flex-col rounded-[20px] border border-[#D8E1EC] bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)] ${className || ''}`}
    >
      <ChartPanelHeader title={title} />
      <div className="relative flex min-h-[190px] flex-1 overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_100%)] p-2">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_68%)]" />
        {platforms.length > 0 && hasData ? (
          <ChartContainer config={chartConfig} className="aspect-auto min-h-0 w-full flex-1">
            <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#94A3B8' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={42}
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                allowDecimals={false}
              />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <Legend content={<ChartLegendContent />} />
              {platforms.map((p) => (
                <Line
                  key={p}
                  type="monotone"
                  dataKey={p}
                  stroke={PLATFORM_COLORS[p] || '#6B7280'}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-[18px] border border-dashed border-[#CBD5E1] bg-white/80 text-[13px] text-[#64748B]">
            {m.cp_no_chart_data()}
          </div>
        )}
      </div>
    </section>
  )
}

function CommunityProfilePage() {
  const companyId = useSelectedCompanyId()
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [timeRange, setTimeRange] = useState<TimeRange>('30')

  const platformQuery = useQuery({
    queryKey: ['community-profile', 'platforms', companyId],
    queryFn: async () => {
      if (!companyId) return []
      const supabase = getSupabaseBrowserClient()
      return fetchPlatformOverview(supabase, companyId)
    },
    enabled: !!companyId,
  })

  const newUsersQuery = useQuery({
    queryKey: ['community-profile', 'new-users', companyId],
    queryFn: async () => {
      if (!companyId) return []
      const supabase = getSupabaseBrowserClient()
      return fetchDailyNewUsers(supabase, companyId, 30)
    },
    enabled: !!companyId,
  })

  const activeUsersQuery = useQuery({
    queryKey: ['community-profile', 'active-users', companyId],
    queryFn: async () => {
      if (!companyId) return []
      return fetchDailyActiveUsers(companyId, 30)
    },
    enabled: !!companyId,
  })

  const allPlatforms = useMemo(
    () => (platformQuery.data || []).map((p) => p.platform),
    [platformQuery.data],
  )

  const activePlatforms = useMemo(
    () => (selectedPlatform === 'all' ? allPlatforms : [selectedPlatform]),
    [selectedPlatform, allPlatforms],
  )

  const days = Number(timeRange)

  const filteredPlatforms = useMemo(
    () => filterByPlatforms(platformQuery.data || [], activePlatforms),
    [platformQuery.data, activePlatforms],
  )

  const filteredNewUsers = useMemo(
    () => filterByPlatforms(filterByDateRange(newUsersQuery.data || [], days), activePlatforms),
    [newUsersQuery.data, days, activePlatforms],
  )

  const filteredActiveUsers = useMemo(
    () => filterByPlatforms(filterByDateRange(activeUsersQuery.data || [], days), activePlatforms),
    [activeUsersQuery.data, days, activePlatforms],
  )

  const totalUsers = useMemo(
    () => filteredPlatforms.reduce((s, p) => s + p.totalUsers, 0),
    [filteredPlatforms],
  )
  const totalNewUsers = useMemo(() => sumByKey(filteredNewUsers, 'newUsers'), [filteredNewUsers])
  const totalActiveUsers = useMemo(
    () => sumByKey(filteredActiveUsers, 'active_users'),
    [filteredActiveUsers],
  )

  const dateLabels = useMemo(() => generateDateLabels(days), [days])

  const totalUsersChartData = useMemo(() => {
    const allNewUsers = filterByPlatforms(newUsersQuery.data || [], activePlatforms)
    return dateLabels.map((date) => {
      const entry: Record<string, string | number> = { date: date.slice(5) }
      for (const p of activePlatforms) {
        const totalForPlatform =
          (platformQuery.data || []).find((x) => x.platform === p)?.totalUsers || 0
        const futureNew = allNewUsers
          .filter((item) => item.platform === p && item.date > date)
          .reduce((s, item) => s + item.newUsers, 0)
        entry[p] = Math.max(totalForPlatform - futureNew, 0)
      }
      return entry
    })
  }, [dateLabels, activePlatforms, newUsersQuery.data, platformQuery.data])

  const newUsersChartData = useMemo(
    () => buildLineChartData(dateLabels, filteredNewUsers, 'newUsers', activePlatforms),
    [dateLabels, filteredNewUsers, activePlatforms],
  )

  const activeUsersChartData = useMemo(
    () => buildLineChartData(dateLabels, filteredActiveUsers, 'active_users', activePlatforms),
    [dateLabels, filteredActiveUsers, activePlatforms],
  )

  const chartConfig = useMemo<ChartConfig>(() => {
    const cfg: ChartConfig = {}
    for (const p of activePlatforms) {
      cfg[p] = { label: getPlatformLabel(p), color: PLATFORM_COLORS[p] || '#6B7280' }
    }
    return cfg
  }, [activePlatforms])

  const selectedRangeLabel = useMemo(
    () =>
      TIME_RANGE_OPTIONS.find((opt) => opt.value === timeRange)?.labelKey() || `${timeRange}d`,
    [timeRange],
  )

  const isLoading =
    platformQuery.isLoading || newUsersQuery.isLoading || activeUsersQuery.isLoading

  if (isLoading) {
    return (
      <div className="flex h-[calc(100dvh-16px)] items-center justify-center rounded-[4px] bg-[#F8FAFC]">
        <Loader2 className="size-5 animate-spin text-[#64748B]" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,#EFF6FF_0%,#F8FAFC_30%,#F8FAFC_100%)]">
      <DashboardPageHeader
        title={m.cp_page_title()}
        startRow={1}
        endRow={1}
        totalRows={1}
        onPrevPage={() => {}}
        onNextPage={() => {}}
        canPrevPage={false}
        canNextPage={false}
        hidePagination
        className="shrink-0 border-b border-[#D1D5DB] bg-white/75 backdrop-blur"
      />

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 py-3 md:px-5 md:py-4">
        <section className="space-y-2">
          <div className="space-y-2">
            <SectionTitle title={m.cp_section_metrics()} />
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <StatCard
                icon={<Users className="h-5 w-5" style={{ color: '#4F46E5' }} />}
                label={m.cp_total_users()}
                value={totalUsers}
                color="#4F46E5"
                helper={m.cp_total_users_helper()}
              />
              <StatCard
                icon={<UserPlus className="h-5 w-5" style={{ color: '#059669' }} />}
                label={m.cp_new_users()}
                value={totalNewUsers}
                color="#059669"
                helper={m.cp_new_users_helper({ range: selectedRangeLabel })}
              />
              <StatCard
                icon={<TrendingUp className="h-5 w-5" style={{ color: '#D97706' }} />}
                label={m.cp_active_users()}
                value={totalActiveUsers}
                color="#D97706"
                helper={m.cp_active_users_helper({ range: selectedRangeLabel })}
              />
            </div>
          </div>
        </section>

        <section className="flex min-h-0 flex-1 flex-col space-y-2">
          <SectionTitle
            title={m.cp_section_trends()}
            trailing={
              <ControlPanel
                selectedPlatform={selectedPlatform}
                onPlatformChange={setSelectedPlatform}
                allPlatforms={allPlatforms}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
              />
            }
          />
          <div className="grid min-h-0 flex-1 gap-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.95fr)]">
            <TrendChart
              title={m.cp_chart_total_users()}
              data={totalUsersChartData}
              platforms={activePlatforms}
              chartConfig={chartConfig}
              className="xl:row-span-2"
            />
            <TrendChart
              title={m.cp_chart_new_users()}
              data={newUsersChartData}
              platforms={activePlatforms}
              chartConfig={chartConfig}
            />
            <TrendChart
              title={m.cp_chart_active_users()}
              data={activeUsersChartData}
              platforms={activePlatforms}
              chartConfig={chartConfig}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
