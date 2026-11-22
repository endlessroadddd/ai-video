import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  Activity,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock3,
  Loader2,
  MessageSquareText,
  Search,
  Tag,
  Users,
  X,
} from 'lucide-react'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CompanySelectionPrompt } from '@/components/company-selection-prompt'
import { DashboardPageHeader } from '@/components/dashboard-page-header'
import { DashboardPageLayout, DashboardPageLayoutCard } from '@/components/dashboard-page-layout'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { requireAuthOrRedirect } from '@/lib/auth/guard'
import { useSelectedCompanyId } from '@/lib/company-selection'
import {
  createUserTag,
  fetchUserInsightDetail,
  fetchUserInsightList,
  fetchUserMessages,
  fetchUserTags,
  initDefaultUserTags,
  type TagDefinition,
  type UserContextMessage,
  type UserInsightPlatform,
  type UserInsightRecord,
  updateUserTag,
} from '@/lib/services/user-insight-api'
import * as m from '@/paraglide/messages'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/dashboard/user-list')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)
  },
  component: UserListPage,
})

type SortBy =
  | 'last_message_at'
  | 'total_message'
  | 'last_summary_at'
  | 'updated_at'
  | 'created_at'
  | 'username'

type SortOrder = 'asc' | 'desc'

type SelectedUserRef = {
  userId: string
  platform: UserInsightPlatform
}

const PAGE_SIZE = 20

const ALL_PLATFORM_OPTIONS: Array<{ value: UserInsightPlatform | 'all'; labelKey: () => string }> = [
  { value: 'all', labelKey: () => m.ul_platform_all() },
  { value: 'discord', labelKey: () => 'Discord' },
  { value: 'telegram', labelKey: () => 'Telegram' },
  { value: 'slack', labelKey: () => 'Slack' },
  { value: 'feishu', labelKey: () => m.platform_feishu() },
  { value: 'web', labelKey: () => 'Web' },
  { value: 'client', labelKey: () => 'Lucius' },
]

const LAST_ACTIVE_OPTIONS = [
  { value: 'all', labelKey: () => m.ul_active_all() },
  { value: '7', labelKey: () => m.ul_active_7d() },
  { value: '30', labelKey: () => m.ul_active_30d() },
  { value: '90', labelKey: () => m.ul_active_90d() },
]

const SORT_OPTIONS: Array<{ value: SortBy; labelKey: () => string }> = [
  { value: 'last_message_at', labelKey: () => m.ul_sort_last_active() },
  { value: 'total_message', labelKey: () => m.ul_sort_total_messages() },
  { value: 'last_summary_at', labelKey: () => m.ul_sort_last_summary() },
  { value: 'updated_at', labelKey: () => m.ul_sort_last_updated() },
  { value: 'created_at', labelKey: () => m.ul_sort_created_at() },
  { value: 'username', labelKey: () => m.ul_sort_username() },
]

const ORDER_OPTIONS: Array<{ value: SortOrder; labelKey: () => string }> = [
  { value: 'desc', labelKey: () => m.ul_order_desc() },
  { value: 'asc', labelKey: () => m.ul_order_asc() },
]

const PLATFORM_STYLES: Record<string, string> = {
  discord: 'border-[#D9E0FF] bg-[#F3F5FF] text-[var(--dashboard-sidebar-active-bg)]',
  telegram: 'border-[#D6F0FF] bg-[#F1FAFF] text-[#0284C7]',
  slack: 'border-[#FFD9E8] bg-[#FFF1F7] text-[#DB2777]',
  feishu: 'border-[#CCFBF1] bg-[#F0FDFA] text-[#0F766E]',
  web: 'border-[var(--dashboard-panel-border)] bg-white text-[var(--dashboard-text-muted)]',
  client: 'border-[#E0D4FF] bg-[#F5F0FF] text-[#7C3AED]',
}

const PLATFORM_ICONS: Record<string, string> = {
  discord: '/platform-icons/discord.svg',
  telegram: '/platform-icons/telegram.svg',
  slack: '/platform-icons/slack.svg',
  feishu: '/platform-icons/feishu.svg',
  client: '/platform-icons/lucius.svg',
}

function formatDate(value?: string | null, fallback?: string): string {
  fallback = fallback ?? m.ul_no_data()
  if (!value) return fallback
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return fallback
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function formatDateTime(value?: string | null, fallback?: string): string {
  fallback = fallback ?? m.ul_no_data()
  if (!value) return fallback
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return fallback
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function getInitials(name?: string | null): string {
  if (!name?.trim()) return 'U'
  return name.trim().slice(0, 2).toUpperCase()
}

function buildTrendData(
  values: number[],
  lastSyncDate?: string | null,
): Array<{ label: string; value: number }> {
  const endDate = lastSyncDate ? new Date(lastSyncDate) : new Date()
  const safeEndDate = Number.isNaN(endDate.getTime()) ? new Date() : endDate

  return values.map((value, index) => {
    const pointDate = new Date(safeEndDate)
    pointDate.setDate(safeEndDate.getDate() - (values.length - index - 1))

    return {
      label: new Intl.DateTimeFormat('zh-CN', {
        month: '2-digit',
        day: '2-digit',
      }).format(pointDate),
      value,
    }
  })
}

function PlatformBadge(props: { platform: string }) {
  const iconSrc = PLATFORM_ICONS[props.platform]
  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
        PLATFORM_STYLES[props.platform] || PLATFORM_STYLES.web,
      )}
    >
      {iconSrc && (
        <img src={iconSrc} alt="" className="h-3.5 w-3.5 object-contain" loading="lazy" decoding="async" />
      )}
      {ALL_PLATFORM_OPTIONS.find((item) => item.value === props.platform)?.labelKey() || props.platform}
    </Badge>
  )
}

function UserTags(props: { tags: UserInsightRecord['tags']; max?: number }) {
  const max = props.max ?? 2
  const visible = props.tags.slice(0, max)
  const hiddenCount = Math.max(props.tags.length - visible.length, 0)

  if (props.tags.length === 0) {
    return <span className="text-[12px] text-[var(--dashboard-text-muted)]">{m.ul_no_tags()}</span>
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {visible.map((tag) => (
        <Badge
          key={tag.tag_name}
          variant="outline"
          className="rounded-full border-[var(--dashboard-panel-border)] bg-white px-2 py-0.5 text-[11px] text-[var(--dashboard-text-muted)]"
          title={tag.reason || tag.tag_name}
        >
          {tag.tag_name}
        </Badge>
      ))}
      {hiddenCount > 0 ? (
        <Badge
          variant="outline"
          className="rounded-full border-[var(--dashboard-panel-border)] bg-white px-2 py-0.5 text-[11px] text-[var(--dashboard-text-muted)]"
        >
          +{hiddenCount}
        </Badge>
      ) : null}
    </div>
  )
}

function MemoryPreview(props: { memory?: string | null }) {
  if (!props.memory?.trim()) {
    return <span className="text-[12px] text-[var(--dashboard-text-muted)]">{m.ul_no_profile()}</span>
  }

  return (
    <div className="relative max-w-[400px]">
      <p className="line-clamp-1 text-[12px] leading-5 text-[var(--dashboard-text-muted)]">
        {props.memory}
      </p>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
    </div>
  )
}

function StatCard(props: { label: string; value: string; helper: string; icon: React.ReactNode }) {
  return (
    <article className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white px-4 py-3 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium text-[var(--dashboard-text-muted)]">{props.label}</p>
          <p className="mt-1 text-[24px] font-semibold tracking-[-0.03em] text-[var(--dashboard-text)]">
            {props.value}
          </p>
          <p className="mt-1 text-[12px] text-[var(--dashboard-text-muted)]">{props.helper}</p>
        </div>
        <div className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white p-2 text-[var(--dashboard-text-muted)]">
          {props.icon}
        </div>
      </div>
    </article>
  )
}

function TrendBlock(props: {
  title: string
  description: string
  data: Array<{ label: string; value: number }>
  color: string
}) {
  return (
    <section className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white p-4">
      <div className="mb-3">
        <p className="text-[14px] font-semibold text-[var(--dashboard-text)]">{props.title}</p>
        <p className="mt-1 text-[12px] text-[var(--dashboard-text-muted)]">{props.description}</p>
      </div>
      <div className="h-40 rounded-[4px] bg-white px-2 py-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={props.data}>
            <CartesianGrid stroke="var(--dashboard-panel-border)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              minTickGap={24}
              tick={{ fill: 'var(--dashboard-text-muted)', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={28}
              tick={{ fill: 'var(--dashboard-text-muted)', fontSize: 11 }}
            />
            <Tooltip
              cursor={{ stroke: 'var(--dashboard-panel-border)', strokeDasharray: '4 4' }}
              contentStyle={{
                borderRadius: 4,
                borderColor: 'var(--dashboard-panel-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={props.color}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

function UserDetailStatePanel(props: {
  title: string
  description: string
  isLoading?: boolean
  onClose: () => void
}) {
  return (
    <section className="flex h-full flex-col overflow-hidden rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white shadow-none">
      <header className="flex h-[52px] items-center justify-between border-b border-[var(--dashboard-panel-border)] px-5">
        <p className="text-[14px] font-medium text-[var(--dashboard-text)]">{m.ul_detail_title()}</p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-[4px] text-[var(--dashboard-text-muted)] hover:bg-gray-50"
          onClick={props.onClose}
          aria-label={m.ul_close_detail()}
        >
          <X className="h-4 w-4" />
        </Button>
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center px-6 py-8">
        <div className="text-center">
          {props.isLoading ? (
            <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-[var(--dashboard-text-muted)]" />
          ) : null}
          <p className="text-[14px] font-medium text-[var(--dashboard-text)]">{props.title}</p>
          <p className="mt-1 text-[12px] text-[var(--dashboard-text-muted)]">{props.description}</p>
        </div>
      </div>
    </section>
  )
}

function UserListPage() {
  const companyId = useSelectedCompanyId()
  const queryClient = useQueryClient()

  const [keyword, setKeyword] = useState('')
  const deferredKeyword = useDeferredValue(keyword)
  const [selectedPlatform, setSelectedPlatform] = useState<UserInsightPlatform | 'all'>('all')
  const [selectedTagName, setSelectedTagName] = useState<string>('all')
  const [minMessagesInput, setMinMessagesInput] = useState('')
  const [lastActiveDays, setLastActiveDays] = useState<string>('30')
  const [sortBy, setSortBy] = useState<SortBy>('last_message_at')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [page, setPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<SelectedUserRef | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isProfileExpanded, setIsProfileExpanded] = useState(false)
  const [messagesPage, setMessagesPage] = useState(1)
  const [isTagManagerOpen, setIsTagManagerOpen] = useState(false)
  const [newTagName, setNewTagName] = useState('')
  const [newTagDescription, setNewTagDescription] = useState('')

  useEffect(() => {
    setPage(1)
  }, [deferredKeyword, selectedPlatform, selectedTagName, minMessagesInput, lastActiveDays, sortBy, sortOrder])

  useEffect(() => {
    setMessagesPage(1)
  }, [selectedUser?.platform, selectedUser?.userId])

  const minMessages = minMessagesInput.trim() ? Number(minMessagesInput) : undefined
  const lastActiveDaysValue = lastActiveDays === 'all' ? undefined : Number(lastActiveDays)
  const offset = (page - 1) * PAGE_SIZE

  const listQuery = useQuery({
    queryKey: [
      'user-insights',
      companyId,
      deferredKeyword,
      selectedPlatform,
      selectedTagName,
      minMessages,
      lastActiveDaysValue,
      sortBy,
      sortOrder,
      offset,
    ],
    enabled: Boolean(companyId),
    queryFn: () =>
      fetchUserInsightList({
        companyId: companyId!,
        keyword: deferredKeyword,
        platform: selectedPlatform,
        tagName: selectedTagName === 'all' ? undefined : selectedTagName,
        minMessages: typeof minMessages === 'number' && !Number.isNaN(minMessages) ? minMessages : undefined,
        lastActiveDays: typeof lastActiveDaysValue === 'number' && !Number.isNaN(lastActiveDaysValue)
          ? lastActiveDaysValue
          : undefined,
        sortBy,
        sortOrder,
        limit: PAGE_SIZE,
        offset,
      }),
  })

  const platformOptions = useMemo(() => {
    const available = listQuery.data?.available_platforms
    if (!available || available.length === 0) return [ALL_PLATFORM_OPTIONS[0]]
    return ALL_PLATFORM_OPTIONS.filter(
      (opt) => opt.value === 'all' || available.includes(opt.value),
    )
  }, [listQuery.data?.available_platforms])

  const tagsQuery = useQuery({
    queryKey: ['user-insight-tags', companyId],
    enabled: Boolean(companyId),
    queryFn: () => fetchUserTags(companyId!, { isActive: true }),
  })

  const manageTagsQuery = useQuery({
    queryKey: ['user-insight-tags', companyId, 'all'],
    enabled: Boolean(companyId && isTagManagerOpen),
    queryFn: () => fetchUserTags(companyId!),
  })

  const detailQuery = useQuery({
    queryKey: ['user-insight-detail', companyId, selectedUser?.platform, selectedUser?.userId],
    enabled: Boolean(companyId && selectedUser && isDetailOpen),
    queryFn: () =>
      fetchUserInsightDetail({
        companyId: companyId!,
        platform: selectedUser!.platform,
        userId: selectedUser!.userId,
      }),
  })

  const messagesOffset = (messagesPage - 1) * PAGE_SIZE
  const messagesQuery = useQuery({
    queryKey: [
      'user-insight-messages',
      companyId,
      detailQuery.data?.platform,
      detailQuery.data?.user_id,
      messagesOffset,
    ],
    enabled: Boolean(companyId && detailQuery.data),
    queryFn: () =>
      fetchUserMessages({
        companyId: companyId!,
        platform: detailQuery.data!.platform,
        userId: detailQuery.data!.user_id,
        limit: PAGE_SIZE,
        offset: messagesOffset,
      }),
  })

  const records = listQuery.data?.records || []
  const total = listQuery.data?.total || 0
  const canPrevPage = page > 1
  const canNextPage = offset + records.length < total
  const startRow = total === 0 ? 0 : offset + 1
  const endRow = total === 0 ? 0 : offset + records.length

  const messageRangeStart = messagesQuery.data?.total ? messagesOffset + 1 : 0
  const messageRangeEnd = messagesQuery.data?.total
    ? Math.min(messagesOffset + (messagesQuery.data?.messages.length || 0), messagesQuery.data.total)
    : 0

  const selectedDetail = detailQuery.data || null
  const messageTrendData = useMemo(
    () => buildTrendData(selectedDetail?.m30_message_counts || [], selectedDetail?.last_sync_date),
    [selectedDetail?.last_sync_date, selectedDetail?.m30_message_counts],
  )
  const activeTrendData = useMemo(
    () => buildTrendData(selectedDetail?.active_score || [], selectedDetail?.last_sync_date),
    [selectedDetail?.active_score, selectedDetail?.last_sync_date],
  )

  const handleOpenDetail = (record: UserInsightRecord) => {
    setSelectedUser({
      userId: record.user_id,
      platform: record.platform,
    })
    setIsDetailOpen(true)
    setIsProfileExpanded(false)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setSelectedUser(null)
  }

  const createTagMutation = useMutation({
    mutationFn: async () => {
      if (!companyId) {
        throw new Error(m.ul_pick_company_first())
      }

      if (!newTagName.trim()) {
        throw new Error(m.ul_tag_form_name_required())
      }

      return createUserTag({
        company_id: companyId,
        tag_name: newTagName.trim(),
        description: newTagDescription.trim() || undefined,
        is_active: true,
      })
    },
    onSuccess: async () => {
      toast.success(m.ul_tag_create_success())
      setNewTagName('')
      setNewTagDescription('')
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user-insight-tags', companyId] }),
        queryClient.invalidateQueries({ queryKey: ['user-insight-tags', companyId, 'all'] }),
      ])
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : m.ul_tag_create_error())
    },
  })

  const initDefaultTagsMutation = useMutation({
    mutationFn: async () => {
      if (!companyId) {
        throw new Error(m.ul_pick_company_first())
      }

      return initDefaultUserTags({
        company_id: companyId,
      })
    },
    onSuccess: async () => {
      toast.success(m.ul_tag_init_success())
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user-insight-tags', companyId] }),
        queryClient.invalidateQueries({ queryKey: ['user-insight-tags', companyId, 'all'] }),
      ])
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : m.ul_tag_init_error())
    },
  })

  const updateTagMutation = useMutation({
    mutationFn: async (payload: { tagName: string; isActive: boolean }) => {
      if (!companyId) {
        throw new Error(m.ul_pick_company_first())
      }

      return updateUserTag({
        company_id: companyId,
        tag_name: payload.tagName,
        is_active: payload.isActive,
      })
    },
    onSuccess: async (_, variables) => {
      toast.success(
        variables.isActive ? m.ul_tag_enable_success() : m.ul_tag_disable_success(),
      )
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user-insight-tags', companyId] }),
        queryClient.invalidateQueries({ queryKey: ['user-insight-tags', companyId, 'all'] }),
      ])
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : m.ul_tag_update_error())
    },
  })

  const clearFilters = () => {
    setKeyword('')
    setSelectedPlatform('all')
    setSelectedTagName('all')
    setMinMessagesInput('')
    setLastActiveDays('30')
    setSortBy('last_message_at')
    setSortOrder('desc')
  }

  const hasDetailPanel = isDetailOpen && Boolean(selectedUser)
  const isLoadingSelectedUserDetail = Boolean(
    selectedUser && (detailQuery.isLoading || detailQuery.isFetching) && !selectedDetail,
  )

  return (
    <DashboardPageLayout>
      <DashboardPageLayoutCard className="flex flex-col">
      <DashboardPageHeader
        title={m.ul_page_title()}
        startRow={startRow}
        endRow={endRow}
        totalRows={total}
        canPrevPage={canPrevPage}
        canNextPage={canNextPage}
        onPrevPage={() => setPage((current) => Math.max(1, current - 1))}
        onNextPage={() => setPage((current) => current + 1)}
      />

      <div
        className="grid h-[calc(100%-52px)] min-h-0 gap-0 p-4 transition-[grid-template-columns,gap] duration-300 ease-out"
        style={{
          gridTemplateColumns: hasDetailPanel
            ? 'minmax(0,4fr) minmax(420px,5fr)'
            : 'minmax(0,1fr) minmax(0,0fr)',
          gap: hasDetailPanel ? '8px' : '0px',
        }}
      >
        <section className="flex h-full min-w-0 flex-col gap-4 overflow-hidden">
          <section className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white px-4 py-3 shadow-none">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                <div className="relative min-w-[220px] flex-1 xl:max-w-[320px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--dashboard-text-muted)]" />
                  <Input
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder={m.ul_search_placeholder()}
                    className="h-9 rounded-[4px] border-[var(--dashboard-panel-border)] bg-white pl-9 text-[13px] shadow-none"
                  />
                </div>

                <Select value={selectedPlatform} onValueChange={(value) => setSelectedPlatform(value as UserInsightPlatform | 'all')}>
                  <SelectTrigger className="h-9 min-w-[124px] rounded-[4px] border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none">
                    <SelectValue placeholder={m.ul_col_platform()} />
                  </SelectTrigger>
                  <SelectContent>
                    {platformOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.labelKey()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedTagName} onValueChange={setSelectedTagName}>
                  <SelectTrigger className="h-9 min-w-[124px] rounded-[4px] border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none">
                    <SelectValue placeholder={m.ul_col_tags()} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{m.ul_all_tags()}</SelectItem>
                    {(tagsQuery.data || []).map((tag: TagDefinition) => (
                      <SelectItem key={tag.tag_name} value={tag.tag_name}>
                        {tag.tag_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  min={0}
                  value={minMessagesInput}
                  onChange={(event) => setMinMessagesInput(event.target.value)}
                  placeholder={m.ul_min_messages()}
                  className="h-9 w-[118px] rounded-[4px] border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none"
                />

                <Select value={lastActiveDays} onValueChange={setLastActiveDays}>
                  <SelectTrigger className="h-9 min-w-[128px] rounded-[4px] border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none">
                    <SelectValue placeholder={m.ul_sort_last_active()} />
                  </SelectTrigger>
                  <SelectContent>
                    {LAST_ACTIVE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.labelKey()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
                  <SelectTrigger className="h-9 min-w-[124px] rounded-[4px] border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none">
                    <SelectValue placeholder={m.ul_sort_field()} />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.labelKey()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
                  <SelectTrigger className="h-9 min-w-[96px] rounded-[4px] border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none">
                    <SelectValue placeholder={m.ul_sort_order()} />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.labelKey()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsTagManagerOpen(true)}
                className="h-9 shrink-0 rounded-[4px] border-[var(--dashboard-panel-border)] bg-white px-3 text-[13px] text-[var(--dashboard-text-muted)]"
              >
                {m.ul_tag_manage_button()}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="h-9 shrink-0 rounded-[4px] border-[var(--dashboard-panel-border)] bg-white px-3 text-[13px] text-[var(--dashboard-text-muted)]"
              >
                {m.ul_clear_filters()}
              </Button>
            </div>
          </section>

          <section className="min-h-0 flex-1 overflow-hidden rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white shadow-none">
            <div className="flex items-center justify-between border-b border-[var(--dashboard-panel-border)] px-4 py-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="text-[16px] font-semibold tracking-[-0.02em] text-[var(--dashboard-text)]">
                  {m.ul_page_title()}
                </h2>
                <span className="text-[12px] text-[var(--dashboard-text-muted)]">
                  {m.ul_total_users({ count: String(total) })}
                </span>
                {total > 0 ? (
                  <span className="text-[12px] text-[var(--dashboard-text-muted)]">
                    {m.ul_showing_range({ start: String(startRow), end: String(endRow) })}
                  </span>
                ) : null}
              </div>
              {(listQuery.isLoading || listQuery.isFetching) ? (
                <span className="inline-flex items-center gap-2 text-[12px] text-[var(--dashboard-text-muted)]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {m.ul_updating()}
                </span>
              ) : null}
            </div>

            {!companyId ? (
              <div className="px-4 py-6">
                <CompanySelectionPrompt message={m.ul_pick_company_first()} />
              </div>
            ) : listQuery.isError ? (
              <div className="px-4 py-10 text-center text-[14px] text-red-500">
                {(listQuery.error as Error).message || m.ul_load_error()}
              </div>
            ) : (
              <div className="h-[calc(100%-53px)] overflow-auto">
                <Table className="min-w-[900px]">
                  <TableHeader className="[&_tr]:border-[var(--dashboard-panel-border)]">
                    <TableRow className="h-11 bg-white hover:bg-white">
                      <TableHead className="px-4 text-[12px] font-semibold text-[var(--dashboard-text-muted)]">{m.ul_col_user()}</TableHead>
                      <TableHead className="text-[12px] font-semibold text-[var(--dashboard-text-muted)]">{m.ul_col_platform()}</TableHead>
                      <TableHead className="text-[12px] font-semibold text-[var(--dashboard-text-muted)]">{m.ul_col_total_messages()}</TableHead>
                      <TableHead className="text-[12px] font-semibold text-[var(--dashboard-text-muted)]">{m.ul_col_first_interaction()}</TableHead>
                      <TableHead className="text-[12px] font-semibold text-[var(--dashboard-text-muted)]">{m.ul_col_last_active()}</TableHead>
                      <TableHead className="text-[12px] font-semibold text-[var(--dashboard-text-muted)]">{m.ul_col_profile()}</TableHead>
                      <TableHead className="text-[12px] font-semibold text-[var(--dashboard-text-muted)]">{m.ul_sort_last_summary()}</TableHead>
                      <TableHead className="pr-4 text-[12px] font-semibold text-[var(--dashboard-text-muted)]">{m.ul_col_tags()}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.length === 0 && !listQuery.isLoading ? (
                      <TableRow className="hover:bg-white">
                        <TableCell colSpan={8} className="px-4 py-12 text-center text-[14px] text-[var(--dashboard-text-muted)]">
                          {m.ul_empty_results()}
                        </TableCell>
                      </TableRow>
                    ) : null}

                    {records.map((record) => (
                      <TableRow
                        key={`${record.platform}:${record.user_id}`}
                        className="cursor-pointer border-[var(--dashboard-panel-border)] bg-white hover:bg-gray-50"
                        onClick={() => handleOpenDetail(record)}
                      >
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-[var(--dashboard-panel-border)] bg-white">
                              {record.avatar_url && (
                                <AvatarImage src={record.avatar_url} alt={record.username ?? record.user_id} />
                              )}
                              <AvatarFallback className="bg-[var(--dashboard-sidebar-company-active-bg)] text-[12px] font-semibold text-[var(--dashboard-sidebar-active-bg)]">
                                {getInitials(record.username)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="truncate text-[14px] font-medium text-[var(--dashboard-text)]">
                                {record.username || record.user_id}
                              </p>
                              <p className="truncate text-[12px] text-[var(--dashboard-text-muted)]">{record.user_id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <PlatformBadge platform={record.platform} />
                        </TableCell>
                        <TableCell className="py-3 text-[13px] font-medium text-[var(--dashboard-text)]">
                          {record.total_message.toLocaleString()}
                        </TableCell>
                        <TableCell className="py-3 text-[13px] text-[var(--dashboard-text-muted)]">
                          {formatDate(record.first_message_at)}
                        </TableCell>
                        <TableCell className="py-3 text-[13px] text-[var(--dashboard-text-muted)]">
                          {formatDate(record.last_message_at)}
                        </TableCell>
                        <TableCell className="py-3">
                          <MemoryPreview memory={record.memory} />
                        </TableCell>
                        <TableCell className="py-3 text-[13px] text-[var(--dashboard-text-muted)]">
                          {formatDate(record.last_summary_at)}
                        </TableCell>
                        <TableCell className="py-3 pr-4">
                          <UserTags tags={record.tags} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </section>
        </section>

        <aside
          className={`min-h-0 min-w-0 overflow-hidden transition-[opacity,transform] duration-300 ease-out ${
            hasDetailPanel ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-4 opacity-0'
          }`}
        >
          {hasDetailPanel && selectedDetail ? (
            <section className="flex h-full flex-col overflow-hidden rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white shadow-none">
              <header className="border-b border-[var(--dashboard-panel-border)] bg-white px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[18px] font-semibold text-[var(--dashboard-text)]">
                      {selectedDetail.username || selectedDetail.user_id}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-[var(--dashboard-text-muted)]">
                      <PlatformBadge platform={selectedDetail.platform} />
                      <span className="truncate">{selectedDetail.user_id}</span>
                      <span>{m.ul_total_messages_count({ count: selectedDetail.total_message.toLocaleString() })}</span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-[4px] text-[var(--dashboard-text-muted)] hover:bg-gray-50"
                    onClick={handleCloseDetail}
                    aria-label={m.ul_close_detail()}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
                <div className="space-y-4">
                <section className="grid gap-3 sm:grid-cols-2">
                  <StatCard
                    label={m.ul_detail_first_interaction()}
                    value={formatDate(selectedDetail.first_message_at)}
                    helper={m.ul_detail_first_interaction_helper()}
                    icon={<Clock3 className="h-4 w-4" />}
                  />
                  <StatCard
                    label={m.ul_detail_last_active()}
                    value={formatDate(selectedDetail.last_message_at)}
                    helper={m.ul_detail_last_active_helper()}
                    icon={<Activity className="h-4 w-4" />}
                  />
                </section>

                <section className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[var(--dashboard-sidebar-active-bg)]" />
                      <h3 className="text-[15px] font-semibold text-[var(--dashboard-text)]">{m.ul_detail_profile()}</h3>
                    </div>
                    {selectedDetail.memory && selectedDetail.memory.length > 200 && (
                      <button
                        type="button"
                        className="flex items-center gap-0.5 text-[12px] text-[var(--dashboard-sidebar-active-bg)] hover:text-[var(--dashboard-sidebar-active-bg)]"
                        onClick={() => setIsProfileExpanded((v) => !v)}
                      >
                        {isProfileExpanded ? (
                          <>
                            {m.ul_detail_profile_collapse()}
                            <ChevronUp className="h-3.5 w-3.5" />
                          </>
                        ) : (
                          <>
                            {m.ul_detail_profile_expand()}
                            <ChevronDown className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <div className={cn('mt-3 relative', !isProfileExpanded && selectedDetail.memory && selectedDetail.memory.length > 200 && 'max-h-[120px] overflow-hidden')}>
                    <p className="whitespace-pre-wrap text-[13px] leading-6 text-[var(--dashboard-text)]">
                      {selectedDetail.memory?.trim() || m.ul_no_profile()}
                    </p>
                    {!isProfileExpanded && selectedDetail.memory && selectedDetail.memory.length > 200 && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
                    )}
                  </div>
                </section>

                <section className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-[#0F766E]" />
                    <h3 className="text-[15px] font-semibold text-[var(--dashboard-text)]">{m.ul_detail_tags()}</h3>
                  </div>
                  {selectedDetail.tags.length === 0 ? (
                    <p className="text-[13px] text-[var(--dashboard-text-muted)]">{m.ul_no_tags()}</p>
                  ) : (
                    <div className="space-y-3">
                      {selectedDetail.tags.map((tag) => (
                        <div
                          key={`${tag.tag_name}:${tag.reason || ''}`}
                          className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white px-3 py-3"
                        >
                          <Badge
                            variant="outline"
                            className="rounded-full border-[#D9E0FF] bg-white px-2 py-0.5 text-[11px] text-[var(--dashboard-sidebar-active-bg)]"
                          >
                            {tag.tag_name}
                          </Badge>
                          <p className="mt-2 text-[13px] leading-5 text-[var(--dashboard-text-muted)]">
                            {tag.reason?.trim() || m.ul_detail_no_reason()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <div className="grid gap-4 xl:grid-cols-2">
                  <TrendBlock
                    title={m.ul_trend_messages_title()}
                    description={m.ul_trend_messages_desc()}
                    data={messageTrendData}
                    color="#4F46E5"
                  />
                  <TrendBlock
                    title={m.ul_trend_active_title()}
                    description={m.ul_trend_active_desc()}
                    data={activeTrendData}
                    color="#0EA5E9"
                  />
                </div>

                <section className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white p-4">
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquareText className="h-4 w-4 text-[#F59E0B]" />
                      <h3 className="text-[15px] font-semibold text-[var(--dashboard-text)]">{m.ul_chat_records()}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[var(--dashboard-text-muted)]">
                      <span>
                        {messageRangeStart}-{messageRangeEnd} / {messagesQuery.data?.total || 0}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setMessagesPage((current) => Math.max(1, current - 1))}
                        disabled={messagesPage === 1}
                        className="h-7 w-7 rounded-[8px]"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setMessagesPage((current) => current + 1)}
                        disabled={!messagesQuery.data || messagesOffset + messagesQuery.data.messages.length >= messagesQuery.data.total}
                        className="h-7 w-7 rounded-[8px]"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {messagesQuery.isLoading ? (
                    <div className="flex h-28 items-center justify-center text-[13px] text-[var(--dashboard-text-muted)]">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {m.ul_loading_messages()}
                    </div>
                  ) : messagesQuery.isError ? (
                    <div className="flex h-28 items-center justify-center text-[13px] text-red-500">
                      {(messagesQuery.error as Error).message || m.ul_load_messages_error()}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {(messagesQuery.data?.messages || []).length === 0 ? (
                        <div className="rounded-[4px] border border-dashed border-[var(--dashboard-panel-border)] px-4 py-8 text-center text-[13px] text-[var(--dashboard-text-muted)]">
                          {m.ul_no_messages()}
                        </div>
                      ) : (
                        (messagesQuery.data?.messages || []).map((message: UserContextMessage, index) => (
                          <article
                            key={`${message.sent_at || 'unknown'}:${index}`}
                            className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white px-4 py-3"
                          >
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--dashboard-text-muted)]">
                              <Badge variant="outline" className="rounded-full bg-white px-2 py-0.5 text-[11px] text-[var(--dashboard-text-muted)]">
                                {message.message_role || 'user'}
                              </Badge>
                              <span>{formatDateTime(message.sent_at)}</span>
                              {message.channel_id ? <span>{m.ul_channel({ channelId: message.channel_id })}</span> : null}
                            </div>
                            <p className="mt-2 whitespace-pre-wrap text-[13px] leading-6 text-[var(--dashboard-text)]">
                              {message.text?.trim() || m.ul_empty_message()}
                            </p>
                          </article>
                        ))
                      )}
                    </div>
                  )}
                </section>
                </div>
              </div>
            </section>
          ) : null}

          {hasDetailPanel && !selectedDetail && isLoadingSelectedUserDetail ? (
            <UserDetailStatePanel
              title={m.ul_loading_detail()}
              description={m.ul_loading_detail_desc()}
              isLoading
              onClose={handleCloseDetail}
            />
          ) : null}

          {hasDetailPanel && !selectedDetail && !isLoadingSelectedUserDetail && detailQuery.error ? (
            <UserDetailStatePanel
              title={m.ul_detail_load_error()}
              description={(detailQuery.error as Error).message || m.ul_retry_later()}
              onClose={handleCloseDetail}
            />
          ) : null}
        </aside>
      </div>

      <Dialog open={isTagManagerOpen} onOpenChange={setIsTagManagerOpen}>
        <DialogContent className="border-[var(--dashboard-panel-border)] bg-white p-0 sm:max-w-[880px]">
          <DialogHeader className="border-b border-[var(--dashboard-panel-border)] bg-white px-6 py-5 text-left">
            <DialogTitle className="text-[18px] font-semibold text-[var(--dashboard-text)]">{m.ul_tag_manage_title()}</DialogTitle>
            <DialogDescription className="text-[13px] text-[var(--dashboard-text-muted)]">
              {m.ul_tag_manage_desc()}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <section className="border-b border-[var(--dashboard-panel-border)] px-6 py-5 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[15px] font-semibold text-[var(--dashboard-text)]">{m.ul_tag_existing()}</p>
                  <p className="mt-1 text-[12px] text-[var(--dashboard-text-muted)]">
                    {m.ul_tag_count({ count: String(manageTagsQuery.data?.length || 0) })}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    void initDefaultTagsMutation.mutateAsync()
                  }}
                  disabled={initDefaultTagsMutation.isPending}
                  className="h-9 rounded-[4px] border-[var(--dashboard-panel-border)] bg-white px-3 text-[13px] text-[var(--dashboard-text-muted)]"
                >
                  {initDefaultTagsMutation.isPending ? m.ul_tag_init_loading() : m.ul_tag_init_button()}
                </Button>
              </div>

              <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                {manageTagsQuery.isLoading ? (
                  <div className="flex h-28 items-center justify-center text-[13px] text-[var(--dashboard-text-muted)]">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {m.ul_tag_loading()}
                  </div>
                ) : manageTagsQuery.isError ? (
                  <div className="flex h-28 items-center justify-center text-[13px] text-red-500">
                    {(manageTagsQuery.error as Error).message || m.ul_tag_load_error()}
                  </div>
                ) : (manageTagsQuery.data || []).length === 0 ? (
                  <div className="rounded-[4px] border border-dashed border-[var(--dashboard-panel-border)] bg-white px-4 py-8 text-center text-[13px] text-[var(--dashboard-text-muted)]">
                    {m.ul_tag_empty()}
                  </div>
                ) : (
                  (manageTagsQuery.data || []).map((tag) => (
                    <article
                      key={`${tag.tag_name}:${tag.created_at}`}
                      className="rounded-[4px] border border-[var(--dashboard-panel-border)] bg-white px-4 py-4 shadow-none"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="rounded-full border-[var(--dashboard-panel-border)] bg-white px-2 py-0.5 text-[11px] text-[var(--dashboard-text)]"
                          >
                            {tag.tag_name}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={cn(
                              'rounded-full px-2 py-0.5 text-[11px]',
                              tag.is_active
                                ? 'border-[#CCFBF1] bg-[#F0FDFA] text-[#0F766E]'
                                : 'border-[var(--dashboard-panel-border)] bg-white text-[var(--dashboard-text-muted)]',
                            )}
                          >
                            {tag.is_active ? m.ul_tag_status_active() : m.ul_tag_status_inactive()}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[12px] text-[var(--dashboard-text-muted)]">{m.ul_tag_toggle_label()}</span>
                          <Switch
                            checked={tag.is_active}
                            onCheckedChange={(checked) => {
                              void updateTagMutation.mutateAsync({
                                tagName: tag.tag_name,
                                isActive: checked,
                              })
                            }}
                            disabled={updateTagMutation.isPending}
                            size="default"
                          />
                        </div>
                      </div>
                      <p className="mt-3 text-[13px] leading-6 text-[var(--dashboard-text-muted)]">
                        {tag.description?.trim() || m.ul_tag_no_description()}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </section>

            <section className="px-6 py-5">
              <div>
                <p className="text-[15px] font-semibold text-[var(--dashboard-text)]">{m.ul_tag_create_title()}</p>
                <p className="mt-1 text-[12px] text-[var(--dashboard-text-muted)]">
                  {m.ul_tag_create_desc()}
                </p>
              </div>

              <div className="mt-5 space-y-4">
                <div className="space-y-2">
                  <p className="text-[12px] font-medium text-[var(--dashboard-text-muted)]">{m.ul_tag_form_name()}</p>
                  <Input
                    value={newTagName}
                    onChange={(event) => setNewTagName(event.target.value)}
                    placeholder={m.ul_tag_form_name_placeholder()}
                    className="h-10 rounded-[4px] border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-[12px] font-medium text-[var(--dashboard-text-muted)]">{m.ul_tag_form_description()}</p>
                  <Textarea
                    value={newTagDescription}
                    onChange={(event) => setNewTagDescription(event.target.value)}
                    placeholder={m.ul_tag_form_description_placeholder()}
                    className="min-h-[120px] rounded-[4px] border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none focus-visible:ring-0"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      void createTagMutation.mutateAsync()
                    }}
                    disabled={createTagMutation.isPending}
                    className="h-10 rounded-[4px] bg-[var(--dashboard-sidebar-active-bg)] px-4 text-[13px] font-medium text-white hover:opacity-90"
                  >
                    {createTagMutation.isPending ? m.ul_tag_create_loading() : m.ul_tag_create_button()}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
      </DashboardPageLayoutCard>
    </DashboardPageLayout>
  )
}
