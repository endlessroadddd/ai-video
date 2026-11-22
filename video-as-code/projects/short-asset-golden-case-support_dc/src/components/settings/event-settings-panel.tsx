import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'

import { CompanySelectionPrompt } from '@/components/company-selection-prompt'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { SettingsSectionShell } from '@/components/settings/settings-section-shell'
import { EVENT_TYPE_OWNER_TARGET_SOURCE } from '@/lib/default-company-event-types'
import { toReadableEventTypeLabel } from '@/lib/event-type-label'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { m } from '@/paraglide/messages'

/**
 * 与 settings 页面保持一致的公司角色类型定义。
 */
type CompanyRole = 'owner' | 'admin' | 'member'

/**
 * 支持的平台类型。
 */
type PlatformType = 'discord' | 'telegram' | 'feishu' | 'slack' | 'website'

/**
 * 通知模式（与 lucius_agent.assist_notify_mode 对齐）。
 */
type EventNotifyMode = 'none' | 'once' | 'repeat_12h' | 'custom_interval'

/**
 * 事件通知目标行（来自 lucius_agent.event_notification_target）。
 */
type EventNotificationTargetRow = {
  id: string
  type_config_id: string
  channel: string
  notify_channel_id: string
  notify_channel_name: string | null
  target: string
  display_name: string | null
  notify_mode: EventNotifyMode
  repeat_interval_minutes: number | null
  is_active: boolean
  extra_config: Record<string, unknown> | null
}

/**
 * 事件类型配置行（来自 lucius_agent.event_type_config）。
 */
type EventTypeConfigRow = {
  id: string
  type_key: string
  type_label: string
  description: string | null
  manual_review_enabled: boolean
  sort_order: number
  is_system: boolean
  is_active: boolean
}

/**
 * 支持用于 Event 范围配置的频道平台：
 * - 当前按需求仅接入飞书、Slack、Telegram 三个平台；
 * - 若后续要扩展 Discord，可在此列表中追加并补齐查询。
 */
type EventChannelPlatform = 'feishu' | 'slack' | 'telegram'

/**
 * Event 页面可勾选的频道选项结构。
 */
type EventChannelOption = {
  key: string
  platform: EventChannelPlatform
  channelId: string
  channelName: string
}

/**
 * 平台频道查询结果：
 * - `channels`：可选频道集合；
 * - `warnings`：某个平台查询失败时的降级提示，不阻断页面主流程。
 */
type EventChannelSourceSnapshot = {
  channels: Array<{
    platform: EventChannelPlatform
    channelId: string
    channelName: string
  }>
  warnings: string[]
}

/**
 * 组织成员（负责人候选）行：
 * - 来源：`permission.organization_member`。
 */
type OrganizationMemberRow = {
  id: string
  user_id: string
  email: string
  role: CompanyRole
  status: 'active' | 'inactive'
}

/**
 * 成员绑定账号行：
 * - 来源：`permission.member_account_binding`；
 * - `member_id` 对应 organization_member.id。
 */
type MemberAccountBindingRow = {
  member_id: string
  platform: Exclude<PlatformType, 'website'>
  external_account_id: string
  external_display: string | null
}

type FeishuUserIdentityRow = {
  user_id: string | null
  open_id: string | null
  display_name: string | null
}

/**
 * 负责人目录项：
 * - 邮箱用于默认通知；
 * - 绑定账号用于平台群内 @ 通知。
 */
type EventResponsibleMemberOption = {
  memberId: string
  userId: string
  email: string
  role: CompanyRole
  bindings: MemberAccountBindingRow[]
}

/**
 * 通知目标 extra_config 结构：
 * - 使用 `source + type_key + member_id` 标记“类型规则下的负责人通知配置”；
 * - 便于后续按 type_key 精准回读与覆盖写入。
 */
type EventNotificationTargetExtraConfig = {
  source?: string
  type_key?: string
  member_id?: string
  member_user_id?: string
  notify_kind?: 'email' | 'mention'
  binding_platform?: Exclude<PlatformType, 'website'>
  platform_channel_id?: string
  platform_channel_name?: string
}

/**
 * 页面规则草稿结构：
 * - 当前先作为前端可编辑草稿；
 * - 后续将映射到新的 event rule 表结构（本次先完成 UI）。
 */
type EventRuleDraft = {
  id: string
  typeConfigId: string | null
  typeCode: string
  typeLabel: string
  description: string
  manualReviewEnabled: boolean
  ownerMemberIds: string[]
  platformChannelKeys: string[]
  notifyMode: EventNotifyMode
  isSystem: boolean
  isActive: boolean
}

/**
 * 新增类型详情页的保留路由 key：
 * - 使用 `$new` 作为特殊路径片段，避免与真实类型 key 冲突；
 * - 列表页点击“新增类型”后跳转到该路由。
 */
const NEW_TYPE_ROUTE_KEY = '$new'

/**
 * 新增类型的临时规则 ID：
 * - 仅用于前端详情表单编辑态；
 * - 保存成功后会跳转到真实 type_key 路由。
 */
const NEW_TYPE_RULE_ID = '__temp_new_type__'

/**
 * Event 频道配置支持的平台列表。
 */
const EVENT_CHANNEL_PLATFORMS: ReadonlyArray<EventChannelPlatform> = ['feishu', 'slack', 'telegram']

type SupabaseErrorLike = {
  code?: string | null
  message?: string | null
}

function EventSettingsFieldSkeleton(props: { labelWidth: string; inputHeightClassName?: string }) {
  const { labelWidth, inputHeightClassName = 'h-10' } = props

  return (
    <div className="space-y-1.5">
      <Skeleton className="dashboard-skeleton--base h-4 rounded-[4px]" style={{ width: labelWidth }} />
      <Skeleton className={`dashboard-skeleton--soft ${inputHeightClassName} w-full rounded-[8px]`} />
    </div>
  )
}

function EventTypeListItemSkeleton(props: { titleWidth: string; codeWidth: string; showSystemBadge?: boolean }) {
  const { titleWidth, codeWidth, showSystemBadge = false } = props

  return (
    <div className="flex w-full items-center justify-between rounded px-2 py-2">
      <div className="min-w-0 space-y-2">
        <Skeleton className="dashboard-skeleton--base h-4 rounded-[4px]" style={{ width: titleWidth }} />
        <Skeleton className="dashboard-skeleton--soft h-3 rounded-[4px]" style={{ width: codeWidth }} />
      </div>

      <div className="flex items-center gap-2">
        {showSystemBadge ? <Skeleton className="dashboard-skeleton--soft h-5 w-[42px] rounded-full" /> : null}
        <Skeleton className="dashboard-skeleton--soft h-5 w-[72px] rounded-full" />
        <Skeleton className="dashboard-skeleton--base h-4 w-4 rounded-[4px]" />
      </div>
    </div>
  )
}

/**
 * Event 配置页加载骨架：
 * - 列表页与详情页分别贴合真实布局，不再复用单一灰块；
 * - 让 loading 时的空间分布和最终表单结构基本一致，减少视觉跳变。
 */
function EventSettingsLoadingSkeleton(props: { isDetailPage: boolean }) {
  const { isDetailPage } = props

  if (isDetailPage) {
    return (
      <div className="space-y-3">
        <Skeleton className="dashboard-skeleton--base h-8 w-[126px] rounded-[8px]" />

        <div className="dashboard-skeleton-frame rounded-lg border p-4">
          <div className="pb-3">
            <Skeleton className="dashboard-skeleton--base h-6 w-[188px] rounded-[4px]" />
          </div>

          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <EventSettingsFieldSkeleton labelWidth="64px" />
              <EventSettingsFieldSkeleton labelWidth="64px" />
            </div>

            <EventSettingsFieldSkeleton labelWidth="64px" inputHeightClassName="h-[90px]" />

            <div className="space-y-2">
              <Skeleton className="dashboard-skeleton--base h-4 w-[92px] rounded-[4px]" />
              <Skeleton className="dashboard-skeleton--soft h-10 w-full rounded-[8px]" />
            </div>

            <div className="space-y-2">
              <Skeleton className="dashboard-skeleton--base h-4 w-[116px] rounded-[4px]" />
              <Skeleton className="dashboard-skeleton--soft h-10 w-full rounded-[8px]" />
            </div>

            <div className="dashboard-skeleton-surface rounded-lg border p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <Skeleton className="dashboard-skeleton--base h-4 w-[56px] rounded-[4px]" />
                  <Skeleton className="dashboard-skeleton--soft h-3 w-[220px] rounded-[4px]" />
                </div>

                <Skeleton className="dashboard-skeleton--base h-6 w-10 rounded-full" />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Skeleton className="dashboard-skeleton--base h-4 w-[72px] rounded-[4px]" />
              <div className="space-y-1.5">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={`event-target-skeleton-${index}`}
                    className="dashboard-skeleton-frame flex flex-wrap items-center gap-2 rounded-lg border px-2 py-1.5"
                  >
                    <Skeleton className="dashboard-skeleton--soft h-5 w-[68px] rounded-full" />
                    <Skeleton className="dashboard-skeleton--soft h-5 w-[92px] rounded-full" />
                    <Skeleton className="dashboard-skeleton--base h-3 rounded-[4px]" style={{ width: index === 0 ? '118px' : '96px' }} />
                    <Skeleton className="dashboard-skeleton--soft ml-auto h-3 w-[64px] rounded-[4px]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Skeleton className="dashboard-skeleton--base h-9 w-[84px] rounded-[8px]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-skeleton-frame space-y-4 rounded-lg border p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="dashboard-skeleton--base h-6 w-[88px] rounded-[4px]" />
          <Skeleton className="dashboard-skeleton--soft h-3 w-[164px] rounded-[4px]" />
        </div>
      </div>

      <div className="dashboard-skeleton-frame space-y-1 rounded-lg border p-2">
        <EventTypeListItemSkeleton titleWidth="148px" codeWidth="112px" showSystemBadge />
        <EventTypeListItemSkeleton titleWidth="132px" codeWidth="136px" />
        <EventTypeListItemSkeleton titleWidth="160px" codeWidth="98px" />
        <EventTypeListItemSkeleton titleWidth="124px" codeWidth="120px" showSystemBadge />
      </div>
    </div>
  )
}

/**
 * 安全解析 `extra_config` 为对象：
 * - 兼容 null / 数组 / 非对象值；
 * - 避免直接访问 JSON 字段时报错。
 */
function toTargetExtraConfig(value: unknown): EventNotificationTargetExtraConfig {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }

  return value as EventNotificationTargetExtraConfig
}

/**
 * 从通知目标中提取关联的类型 key（标准化后返回）。
 */
function getTypeKeyFromTargetExtraConfig(value: unknown): string {
  const extraConfig = toTargetExtraConfig(value)
  const typeKey = String(extraConfig.type_key || '').trim()
  return normalizeEventTypeKey(typeKey)
}

/**
 * 从通知目标中提取关联的成员 ID。
 */
function getMemberIdFromTargetExtraConfig(value: unknown): string {
  const extraConfig = toTargetExtraConfig(value)
  return String(extraConfig.member_id || '').trim()
}

/**
 * 将 `platform + channel_id` 组装为稳定 key：
 * - 用于 checkbox 选中态；
 * - 用于比对“已配置 vs 待配置”差异。
 */
function buildEventChannelOptionKey(platform: EventChannelPlatform, channelId: string): string {
  return `${platform}:${channelId}`
}

/**
 * 判断当前配置行的平台是否属于 Event 频道配置支持范围。
 */
function isEventChannelPlatform(platform: PlatformType): platform is EventChannelPlatform {
  return EVENT_CHANNEL_PLATFORMS.includes(platform as EventChannelPlatform)
}

/**
 * 归一化类型 key：
 * - 管理员录入时统一转成稳定 key，便于跨端匹配；
 * - 保留数字和下划线，统一大写。
 */
function normalizeEventTypeKey(rawValue: string): string {
  const normalizedValue = rawValue
    .trim()
    .replace(/[^a-zA-Z0-9_]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase()

  return normalizedValue
}

/**
 * 判断 `event_type_config` 是否尚未完成迁移：
 * - 关系不存在/未加载到 schema cache 时，前端自动回退默认类型；
 * - 其他错误（如权限不足）仍向上抛出，避免静默失败。
 */
function isMissingEventTypeConfigTableError(error: SupabaseErrorLike): boolean {
  const errorCode = (error.code || '').trim()
  const errorMessage = (error.message || '').trim().toLowerCase()

  if (errorCode === '42P01') {
    return true
  }

  if (errorCode === 'PGRST205' || errorCode === 'PGRST204') {
    return errorMessage.includes('event_type_config')
  }

  return false
}

/**
 * 将平台代码映射为可读文本。
 */
function getPlatformLabel(platform: PlatformType): string {
  if (platform === 'discord') return m.platform_discord()
  if (platform === 'telegram') return m.platform_telegram()
  if (platform === 'feishu') return m.platform_feishu()
  if (platform === 'slack') return m.platform_slack()
  return m.platform_website()
}

/**
 * 通知模式文案：
 * - 设置页当前仅暴露“通知 / 不通知”两种状态；
 * - 历史上的重复通知 / 自定义间隔统一折叠为“通知”。
 */
function getNotifyModeLabel(mode: EventNotifyMode): string {
  return mode === 'none' ? m.event_settings_notify_off() : m.event_settings_notify_on()
}

/**
 * 查询平台侧频道列表，作为“平台通知频道（多选）”的数据来源：
 * - 飞书：`feishu.channel(chat_id, name)`；
 * - Slack：`slack.channel(channel_id, name)`；
 * - Telegram：`telegram.channel(chat_id, name)`。
 *
 * 说明：
 * - 某个平台查询失败时只记录 warning，不影响其它平台加载；
 * - channel 名称为空时回退到 channelId，保证可配置。
 */
async function fetchEventChannelSourceSnapshot(payload: { companyId: string }): Promise<EventChannelSourceSnapshot> {
  const supabase = getSupabaseBrowserClient()
  const warnings: string[] = []
  const channels: EventChannelSourceSnapshot['channels'] = []

  const [feishuResult, slackResult, telegramResult] = await Promise.all([
    supabase.schema('feishu').from('channel').select('chat_id,name').eq('company_id', payload.companyId),
    supabase.schema('slack').from('channel').select('channel_id,name').eq('company_id', payload.companyId),
    supabase.schema('telegram').from('channel').select('chat_id,name').eq('company_id', payload.companyId),
  ])

  if (feishuResult.error) {
    warnings.push(`${m.workgroup_feishu_channels_read_failed()}：${feishuResult.error.message}`)
  } else {
    ;(
      (feishuResult.data || []) as Array<{
        chat_id?: string | null
        name?: string | null
      }>
    ).forEach((row) => {
      const channelId = (row.chat_id || '').trim()
      if (!channelId) {
        return
      }

      channels.push({
        platform: 'feishu',
        channelId,
        channelName: (row.name || '').trim() || channelId,
      })
    })
  }

  if (slackResult.error) {
    warnings.push(`读取 Slack 频道失败：${slackResult.error.message}`)
  } else {
    ;(
      (slackResult.data || []) as Array<{
        channel_id?: string | null
        name?: string | null
      }>
    ).forEach((row) => {
      const channelId = (row.channel_id || '').trim()
      if (!channelId) {
        return
      }

      channels.push({
        platform: 'slack',
        channelId,
        channelName: (row.name || '').trim() || channelId,
      })
    })
  }

  if (telegramResult.error) {
    warnings.push(`读取 Telegram 频道失败：${telegramResult.error.message}`)
  } else {
    ;(
      (telegramResult.data || []) as Array<{
        chat_id?: string | null
        name?: string | null
      }>
    ).forEach((row) => {
      const channelId = (row.chat_id || '').trim()
      if (!channelId) {
        return
      }

      channels.push({
        platform: 'telegram',
        channelId,
        channelName: (row.name || '').trim() || channelId,
      })
    })
  }

  return {
    channels,
    warnings,
  }
}

/**
 * 读取负责人候选目录：
 * - 用户来源：`permission.organization_member`（active）；
 * - 绑定来源：`permission.member_account_binding`；
 * - 结果用于“负责人多选下拉框”与目标生成。
 */
async function fetchEventResponsibleMemberOptions(payload: { companyId: string }): Promise<EventResponsibleMemberOption[]> {
  const supabase = getSupabaseBrowserClient()

  const memberResult = await supabase
    .schema('permission')
    .from('organization_member')
    .select('id,user_id,email,role,status')
    .eq('company_id', payload.companyId)
    .eq('status', 'active')
    .order('joined_at', { ascending: true })

  if (memberResult.error) {
    throw new Error(memberResult.error.message || m.event_settings_read_members_error())
  }

  const memberRows = (memberResult.data || []) as OrganizationMemberRow[]
  const memberIds = memberRows.map((row) => row.id).filter((memberId) => Boolean(memberId))

  if (memberIds.length === 0) {
    return []
  }

  const bindingResult = await supabase
    .schema('permission')
    .from('member_account_binding')
    .select('member_id,platform,external_account_id,external_display')
    .in('member_id', memberIds)

  if (bindingResult.error) {
    throw new Error(bindingResult.error.message || m.event_settings_read_bindings_error())
  }

  const bindingRows = await normalizeEventResponsibleMemberBindings({
    supabase,
    companyId: payload.companyId,
    bindingRows: (bindingResult.data || []) as MemberAccountBindingRow[],
  })
  const bindingMap = new Map<string, MemberAccountBindingRow[]>()

  bindingRows.forEach((bindingRow) => {
    const memberId = String(bindingRow.member_id || '').trim()
    if (!memberId) {
      return
    }

    const previousBindings = bindingMap.get(memberId) || []
    previousBindings.push(bindingRow)
    bindingMap.set(memberId, previousBindings)
  })

  return memberRows
    .map((memberRow) => ({
      memberId: memberRow.id,
      userId: memberRow.user_id,
      email: memberRow.email,
      role: memberRow.role,
      bindings: bindingMap.get(memberRow.id) || [],
    }))
    .sort((left, right) => left.email.localeCompare(right.email, 'zh-Hans-CN'))
}

/**
 * 规范化负责人绑定账号：
 * - 新逻辑会把飞书绑定直接存成 `open_id`；
 * - 这里额外兼容历史上写成 `user_id` 的数据，避免保存事件规则时继续把旧值写回
 *   `event_notification_target.target`。
 */
async function normalizeEventResponsibleMemberBindings(payload: {
  supabase: ReturnType<typeof getSupabaseBrowserClient>
  companyId: string
  bindingRows: MemberAccountBindingRow[]
}): Promise<MemberAccountBindingRow[]> {
  const feishuBindingIds = Array.from(
    new Set(
      payload.bindingRows
        .filter((bindingRow) => bindingRow.platform === 'feishu')
        .map((bindingRow) => String(bindingRow.external_account_id || '').trim())
        .filter((externalAccountId) => Boolean(externalAccountId)),
    ),
  )

  if (feishuBindingIds.length === 0) {
    return payload.bindingRows
  }

  const [byUserIdResult, byOpenIdResult] = await Promise.all([
    payload.supabase
      .schema('feishu')
      .from('user')
      .select('user_id,open_id,display_name')
      .eq('company_id', payload.companyId)
      .in('user_id', feishuBindingIds),
    payload.supabase
      .schema('feishu')
      .from('user')
      .select('user_id,open_id,display_name')
      .eq('company_id', payload.companyId)
      .in('open_id', feishuBindingIds),
  ])

  if (byUserIdResult.error || byOpenIdResult.error) {
    return payload.bindingRows
  }

  const feishuUserByUserId = new Map<string, FeishuUserIdentityRow>()
  const feishuUserByOpenId = new Map<string, FeishuUserIdentityRow>()
  const feishuUserRows = [
    ...((byUserIdResult.data || []) as FeishuUserIdentityRow[]),
    ...((byOpenIdResult.data || []) as FeishuUserIdentityRow[]),
  ]

  feishuUserRows.forEach((row) => {
    const userId = String(row.user_id || '').trim()
    const openId = String(row.open_id || '').trim()

    if (userId && !feishuUserByUserId.has(userId)) {
      feishuUserByUserId.set(userId, row)
    }

    if (openId && !feishuUserByOpenId.has(openId)) {
      feishuUserByOpenId.set(openId, row)
    }
  })

  return payload.bindingRows.map((bindingRow) => {
    if (bindingRow.platform !== 'feishu') {
      return bindingRow
    }

    const currentExternalAccountId = String(bindingRow.external_account_id || '').trim()
    if (!currentExternalAccountId) {
      return bindingRow
    }

    const matchedOpenIdRow = feishuUserByOpenId.get(currentExternalAccountId)
    if (matchedOpenIdRow) {
      return {
        ...bindingRow,
        external_display: bindingRow.external_display || String(matchedOpenIdRow.display_name || '').trim() || null,
      }
    }

    const matchedUserIdRow = feishuUserByUserId.get(currentExternalAccountId)
    const normalizedOpenId = String(matchedUserIdRow?.open_id || '').trim()
    if (!normalizedOpenId) {
      return bindingRow
    }

    return {
      ...bindingRow,
      external_account_id: normalizedOpenId,
      external_display: bindingRow.external_display || String(matchedUserIdRow?.display_name || '').trim() || null,
    }
  })
}

/**
 * 读取 event 配置相关快照：
 * - 当前仅拉取 `event_type_config` 与 `event_notification_target`；
 * - 目的是为“Event 配置页面”提供初始展示数据。
 */
async function fetchEventSettingsSnapshot(payload: { companyId: string }): Promise<{
  targets: EventNotificationTargetRow[]
  eventTypes: EventTypeConfigRow[]
}> {
  const supabase = getSupabaseBrowserClient()

  const eventTypeResult = await supabase
    .schema('lucius_agent')
    .from('event_type_config')
    .select('id,type_key,type_label,description,manual_review_enabled,sort_order,is_system,is_active')
    .eq('company_id', payload.companyId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (eventTypeResult.error) {
    throw new Error(eventTypeResult.error.message || m.event_settings_read_type_config_error())
  }

  const eventTypes = (eventTypeResult.data || []) as EventTypeConfigRow[]
  const typeConfigIds = eventTypes.map((item) => item.id).filter((id) => Boolean(id))

  if (typeConfigIds.length === 0) {
    return {
      targets: [],
      eventTypes,
    }
  }

  const targetResult = await supabase
    .schema('lucius_agent')
    .from('event_notification_target')
    .select(
      'id,type_config_id,channel,notify_channel_id,notify_channel_name,target,display_name,notify_mode,repeat_interval_minutes,is_active,extra_config',
    )
    .in('type_config_id', typeConfigIds)
    .order('created_at', { ascending: false })

  if (targetResult.error) {
    throw new Error(targetResult.error.message || m.event_settings_read_notification_target_error())
  }

  return {
    targets: (targetResult.data || []) as EventNotificationTargetRow[],
    eventTypes,
  }
}

/**
 * Event 配置面板：
 * - 列表页：频道范围 + 规则列表；
 * - 详情页：规则详情编辑区；
 * - 点击类型或新增类型后，通过路由跳转进入详情页。
 */
export function EventSettingsPanel(props: {
  activeCompanyId: string | null
  currentUserRole: CompanyRole
  selectedTypeKey?: string | null
  onOpenType?: (typeKey: string) => void
  onBackToList?: () => void
}) {
  const { activeCompanyId, currentUserRole, selectedTypeKey, onOpenType, onBackToList } = props
  const queryClient = useQueryClient()
  const selectedTypeKeyValue: string = (selectedTypeKey || '').trim()
  const isDetailPage: boolean = Boolean(selectedTypeKeyValue)
  const isCreatingNewType: boolean = selectedTypeKeyValue === NEW_TYPE_ROUTE_KEY
  const normalizedSelectedTypeKey: string = normalizeEventTypeKey(selectedTypeKeyValue)

  const snapshotQuery = useQuery({
    queryKey: ['settings', 'event-settings-snapshot', activeCompanyId],
    enabled: Boolean(activeCompanyId),
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.workspace_select_company_error())
      }

      return fetchEventSettingsSnapshot({
        companyId: activeCompanyId,
      })
    },
    staleTime: 20_000,
  })

  /**
   * 频道来源快照：
   * - 读取飞书/Slack/Telegram 的 channel 列表；
   * - 作为类型详情页“平台通知频道（多选）”的基础数据源。
   */
  const channelSourceQuery = useQuery({
    queryKey: ['settings', 'event-channel-source-snapshot', activeCompanyId],
    enabled: Boolean(activeCompanyId) && isDetailPage,
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.workspace_select_company_error())
      }

      return fetchEventChannelSourceSnapshot({
        companyId: activeCompanyId,
      })
    },
    staleTime: 20_000,
  })

  /**
   * 负责人候选目录：
   * - 读取 organization_member + member_account_binding；
   * - 供“负责人多选下拉框”与通知目标生成使用。
   */
  const responsibleMemberQuery = useQuery({
    queryKey: ['settings', 'event-responsible-members', activeCompanyId],
    enabled: Boolean(activeCompanyId) && isDetailPage,
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.workspace_select_company_error())
      }

      return fetchEventResponsibleMemberOptions({
        companyId: activeCompanyId,
      })
    },
    staleTime: 20_000,
  })

  const responsibleMemberOptionMap = useMemo<Map<string, EventResponsibleMemberOption>>(
    () => new Map((responsibleMemberQuery.data || []).map((item) => [item.memberId, item])),
    [responsibleMemberQuery.data],
  )

  const saveEventTypeMutation = useMutation({
    mutationFn: async (payload: { rule: EventRuleDraft }): Promise<string> => {
      if (!activeCompanyId) {
        throw new Error(m.event_settings_select_company_first())
      }

      const normalizedTypeKey = normalizeEventTypeKey(payload.rule.typeCode)
      const normalizedTypeLabel = payload.rule.typeLabel.trim()
      const notifyModeValue: EventNotifyMode = payload.rule.notifyMode === 'none' ? 'none' : 'once'

      if (!normalizedTypeKey) {
        throw new Error(m.event_settings_invalid_type_key())
      }

      if (!normalizedTypeLabel) {
        throw new Error(m.event_settings_type_name_required())
      }

      const supabase = getSupabaseBrowserClient()
      const descriptionValue = payload.rule.description.trim() || null
      let savedTypeKey = normalizedTypeKey
      let savedTypeConfigId = payload.rule.typeConfigId || ''

      if (payload.rule.typeConfigId) {
        const updateResult = await supabase
          .schema('lucius_agent')
          .from('event_type_config')
          .update({
            type_key: normalizedTypeKey,
            type_label: normalizedTypeLabel,
            description: descriptionValue,
            manual_review_enabled: payload.rule.manualReviewEnabled === true,
          })
          .eq('id', payload.rule.typeConfigId)
          .eq('company_id', activeCompanyId)

        if (updateResult.error) {
          if (isMissingEventTypeConfigTableError(updateResult.error)) {
            throw new Error(m.event_settings_missing_type_config_migration())
          }

          throw new Error(updateResult.error.message || m.event_settings_save_type_config_error())
        }
      } else {
        const insertResult = await supabase
          .schema('lucius_agent')
          .from('event_type_config')
          .insert({
            company_id: activeCompanyId,
            type_key: normalizedTypeKey,
            type_label: normalizedTypeLabel,
            description: descriptionValue,
            manual_review_enabled: payload.rule.manualReviewEnabled === true,
            sort_order: Math.max((snapshotQuery.data?.eventTypes?.length || 0) * 10 + 10, 10),
            is_system: false,
            is_active: true,
          })
          .select('id,type_key')
          .single()

        if (insertResult.error) {
          if (isMissingEventTypeConfigTableError(insertResult.error)) {
            throw new Error(m.event_settings_missing_type_config_migration())
          }

          throw new Error(insertResult.error.message || m.event_settings_save_type_config_error())
        }

        savedTypeConfigId = String(insertResult.data?.id || '').trim()
        savedTypeKey = normalizeEventTypeKey(String(insertResult.data?.type_key || normalizedTypeKey))
      }

      if (!savedTypeConfigId) {
        throw new Error(m.event_settings_missing_saved_config_id())
      }

      /**
       * 同步“负责人通知目标”：
       * - 默认生成 email 通知目标；
       * - 若成员绑定了对应平台账号，则按平台生成 @ 通知目标；
       * - 每次保存都会覆盖同一 type_key 的旧目标，保持幂等。
       */
      const memberOptions = payload.rule.ownerMemberIds
        .map((memberId) => responsibleMemberOptionMap.get(memberId) || null)
        .filter((item): item is EventResponsibleMemberOption => Boolean(item))

      if (payload.rule.ownerMemberIds.length > 0 && memberOptions.length !== payload.rule.ownerMemberIds.length) {
        throw new Error(m.event_settings_members_not_loaded())
      }

      /**
       * 平台频道只允许来自“当前负责人已绑定的平台”：
       * - 例如负责人仅绑定 Telegram，则只允许选择 Telegram 频道；
       * - 避免出现“选了 Slack 频道，但没有任何 Slack 绑定账号可 @”的无效配置。
       */
      const boundPlatformSet = new Set<EventChannelPlatform>()
      memberOptions.forEach((memberOption) => {
        memberOption.bindings.forEach((binding) => {
          if (isEventChannelPlatform(binding.platform)) {
            boundPlatformSet.add(binding.platform)
          }
        })
      })

      const channelOptionMap = new Map(
        channelOptions.filter((option) => boundPlatformSet.has(option.platform)).map((option) => [option.key, option]),
      )
      const selectedPlatformChannels = payload.rule.platformChannelKeys
        .map((channelKey) => channelOptionMap.get(channelKey) || null)
        .filter((item): item is EventChannelOption => Boolean(item))

      if (payload.rule.platformChannelKeys.length > 0 && selectedPlatformChannels.length !== payload.rule.platformChannelKeys.length) {
        throw new Error(m.event_settings_channels_not_loaded())
      }

      const selectedChannelsByPlatform = new Map<EventChannelPlatform, EventChannelOption[]>()
      selectedPlatformChannels.forEach((channelOption) => {
        const currentOptions = selectedChannelsByPlatform.get(channelOption.platform) || []
        currentOptions.push(channelOption)
        selectedChannelsByPlatform.set(channelOption.platform, currentOptions)
      })

      const deleteTargetResult = await supabase
        .schema('lucius_agent')
        .from('event_notification_target')
        .delete()
        .eq('type_config_id', savedTypeConfigId)

      if (deleteTargetResult.error) {
        throw new Error(deleteTargetResult.error.message || m.event_settings_clear_targets_error())
      }

      if (memberOptions.length === 0) {
        return savedTypeKey
      }

      const pendingInsertTargets: Array<{
        type_config_id: string
        channel: string
        notify_channel_id: string
        notify_channel_name: string | null
        target: string
        display_name: string
        notify_mode: EventNotifyMode
        repeat_interval_minutes: number | null
        is_active: boolean
        is_default: boolean
        extra_config: EventNotificationTargetExtraConfig
      }> = []
      const repeatIntervalMinutes = null

      memberOptions.forEach((memberOption) => {
        pendingInsertTargets.push({
          type_config_id: savedTypeConfigId,
          channel: 'email',
          notify_channel_id: '',
          notify_channel_name: null,
          target: memberOption.email,
          display_name: memberOption.email,
          notify_mode: notifyModeValue,
          repeat_interval_minutes: repeatIntervalMinutes,
          is_active: true,
          is_default: false,
          extra_config: {
            source: EVENT_TYPE_OWNER_TARGET_SOURCE,
            type_key: savedTypeKey,
            member_id: memberOption.memberId,
            member_user_id: memberOption.userId,
            notify_kind: 'email',
          },
        })

        memberOption.bindings.forEach((binding) => {
          if (!isEventChannelPlatform(binding.platform)) {
            return
          }

          const platformChannels = selectedChannelsByPlatform.get(binding.platform) || []
          if (platformChannels.length === 0) {
            return
          }

          platformChannels.forEach((platformChannel) => {
            pendingInsertTargets.push({
              type_config_id: savedTypeConfigId,
              channel: binding.platform,
              notify_channel_id: platformChannel.channelId,
              notify_channel_name: platformChannel.channelName,
              target: binding.external_account_id,
              display_name: binding.external_display || memberOption.email,
              notify_mode: notifyModeValue,
              repeat_interval_minutes: repeatIntervalMinutes,
              is_active: true,
              is_default: false,
              extra_config: {
                source: EVENT_TYPE_OWNER_TARGET_SOURCE,
                type_key: savedTypeKey,
                member_id: memberOption.memberId,
                member_user_id: memberOption.userId,
                notify_kind: 'mention',
                binding_platform: binding.platform,
                platform_channel_id: platformChannel.channelId,
                platform_channel_name: platformChannel.channelName,
              },
            })
          })
        })
      })

      const dedupedInsertTargets = Array.from(
        new Map(
          pendingInsertTargets.map((target) => [
            `${target.type_config_id}:${target.channel}:${target.notify_channel_id}:${target.target}`,
            target,
          ]),
        ).values(),
      )

      if (dedupedInsertTargets.length > 0) {
        const insertTargetResult = await supabase.schema('lucius_agent').from('event_notification_target').insert(dedupedInsertTargets)

        if (insertTargetResult.error) {
          throw new Error(insertTargetResult.error.message || m.event_settings_write_target_error())
        }
      }

      return savedTypeKey
    },
    onSuccess: async (savedTypeKey) => {
      /**
       * 统一使用全局右下角 Toast 反馈保存结果：
       * - 避免在页面顶部堆叠状态提示卡片；
       * - 与项目其他页面（sonner）交互体验保持一致。
       */
      toast.success(m.event_settings_saved())

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['settings', 'event-settings-snapshot', activeCompanyId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['settings', 'event-responsible-members', activeCompanyId],
        }),
      ])

      onOpenType?.(savedTypeKey)
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : m.event_settings_save_error())
    },
  })

  /**
   * 频道候选：
   * - 仅来源于平台侧 channel 表（飞书/Slack/Telegram）；
   * - 用于类型详情页“平台通知频道（多选）”；
   * - 仅依赖平台 channel 表。
   */
  const channelOptions = useMemo<EventChannelOption[]>(() => {
    const optionMap = new Map<string, EventChannelOption>()

    ;(channelSourceQuery.data?.channels || []).forEach((channel) => {
      const key = buildEventChannelOptionKey(channel.platform, channel.channelId)
      if (optionMap.has(key)) {
        return
      }

      optionMap.set(key, {
        key,
        platform: channel.platform,
        channelId: channel.channelId,
        channelName: channel.channelName,
      })
    })

    return Array.from(optionMap.values()).sort((left, right) => {
      const leftPlatformLabel = getPlatformLabel(left.platform)
      const rightPlatformLabel = getPlatformLabel(right.platform)
      if (leftPlatformLabel !== rightPlatformLabel) {
        return leftPlatformLabel.localeCompare(rightPlatformLabel, 'zh-Hans-CN')
      }

      return left.channelName.localeCompare(right.channelName, 'zh-Hans-CN')
    })
  }, [channelSourceQuery.data?.channels])

  /**
   * 按 type_key 聚合“已保存负责人”：
   * - 仅消费当前模块写入的 `extra_config.source=event_type_owner_selector_v1`；
   * - 用于回填负责人多选状态。
   */
  const ownerMemberIdsByTypeKey = useMemo<Map<string, string[]>>(() => {
    const typeKeyByConfigId = new Map((snapshotQuery.data?.eventTypes || []).map((item) => [item.id, normalizeEventTypeKey(item.type_key)]))
    const idSetMap = new Map<string, Set<string>>()

    ;(snapshotQuery.data?.targets || []).forEach((target) => {
      const extraConfig = toTargetExtraConfig(target.extra_config)
      const source = String(extraConfig.source || '').trim()
      if (source !== EVENT_TYPE_OWNER_TARGET_SOURCE) {
        return
      }

      const typeKey = typeKeyByConfigId.get(target.type_config_id) || getTypeKeyFromTargetExtraConfig(target.extra_config)
      const memberId = getMemberIdFromTargetExtraConfig(target.extra_config)
      if (!typeKey || !memberId) {
        return
      }

      const currentMemberIdSet = idSetMap.get(typeKey) || new Set<string>()
      currentMemberIdSet.add(memberId)
      idSetMap.set(typeKey, currentMemberIdSet)
    })

    return new Map(Array.from(idSetMap.entries()).map(([typeKey, memberIdSet]) => [typeKey, Array.from(memberIdSet)]))
  }, [snapshotQuery.data?.eventTypes, snapshotQuery.data?.targets])

  /**
   * 按 type_key 回读“平台通知频道”选择：
   * - 仅消费当前模块写入的 target（source 过滤）；
   * - 从 target.notify_channel_id 还原为 `platform:channelId` key。
   */
  const platformChannelKeysByTypeKey = useMemo<Map<string, string[]>>(() => {
    const typeKeyByConfigId = new Map((snapshotQuery.data?.eventTypes || []).map((item) => [item.id, normalizeEventTypeKey(item.type_key)]))
    const keySetMap = new Map<string, Set<string>>()

    ;(snapshotQuery.data?.targets || []).forEach((target) => {
      const extraConfig = toTargetExtraConfig(target.extra_config)
      const source = String(extraConfig.source || '').trim()
      if (source !== EVENT_TYPE_OWNER_TARGET_SOURCE) {
        return
      }

      const typeKey = typeKeyByConfigId.get(target.type_config_id) || getTypeKeyFromTargetExtraConfig(target.extra_config)
      if (!typeKey) {
        return
      }

      if (!isEventChannelPlatform(target.channel as PlatformType)) {
        return
      }

      const notifyChannelId = String(target.notify_channel_id || '').trim()
      if (!notifyChannelId) {
        return
      }

      const optionKey = buildEventChannelOptionKey(target.channel as EventChannelPlatform, notifyChannelId)
      const currentKeySet = keySetMap.get(typeKey) || new Set<string>()
      currentKeySet.add(optionKey)
      keySetMap.set(typeKey, currentKeySet)
    })

    return new Map(Array.from(keySetMap.entries()).map(([typeKey, optionKeySet]) => [typeKey, Array.from(optionKeySet)]))
  }, [snapshotQuery.data?.eventTypes, snapshotQuery.data?.targets])

  /**
   * 按 type_key 回读通知模式：
   * - 来源仅限当前模块写入的 target（source 过滤）；
   * - 详情页当前只保留“通知 / 不通知”，历史复杂模式统一折叠为二值状态。
   */
  const notifyModeByTypeKey = useMemo<Map<string, EventNotifyMode>>(() => {
    const typeKeyByConfigId = new Map((snapshotQuery.data?.eventTypes || []).map((item) => [item.id, normalizeEventTypeKey(item.type_key)]))
    const notifyModeMap = new Map<string, EventNotifyMode>()

    ;(snapshotQuery.data?.targets || []).forEach((target) => {
      const extraConfig = toTargetExtraConfig(target.extra_config)
      const source = String(extraConfig.source || '').trim()
      if (source !== EVENT_TYPE_OWNER_TARGET_SOURCE) {
        return
      }

      const typeKey = typeKeyByConfigId.get(target.type_config_id) || getTypeKeyFromTargetExtraConfig(target.extra_config)
      if (!typeKey || notifyModeMap.has(typeKey)) {
        return
      }

      notifyModeMap.set(typeKey, target.notify_mode === 'none' ? 'none' : 'once')
    })

    return notifyModeMap
  }, [snapshotQuery.data?.eventTypes, snapshotQuery.data?.targets])

  /**
   * 规则草稿初始化：
   * - 仅使用数据库里的 `event_type_config` 作为真源；
   * - 当前公司若尚无任何类型配置，则列表为空，等待后端初始化或管理员新增。
   */
  const initialRules = useMemo<EventRuleDraft[]>(() => {
    const eventTypeRows = snapshotQuery.data?.eventTypes || []

    if (eventTypeRows.length > 0) {
      return eventTypeRows.map((item) => ({
        id: item.type_key,
        typeConfigId: item.id,
        typeCode: item.type_key,
        typeLabel: toReadableEventTypeLabel(item.type_key, item.type_label),
        description: (item.description || '').trim(),
        manualReviewEnabled: item.manual_review_enabled === true,
        ownerMemberIds: ownerMemberIdsByTypeKey.get(normalizeEventTypeKey(item.type_key)) || [],
        platformChannelKeys: platformChannelKeysByTypeKey.get(normalizeEventTypeKey(item.type_key)) || [],
        notifyMode: notifyModeByTypeKey.get(normalizeEventTypeKey(item.type_key)) || 'once',
        isSystem: item.is_system,
        isActive: item.is_active,
      }))
    }

    return []
  }, [notifyModeByTypeKey, ownerMemberIdsByTypeKey, platformChannelKeysByTypeKey, snapshotQuery.data?.eventTypes])

  const [rules, setRules] = useState<EventRuleDraft[]>([])
  const [activeRuleId, setActiveRuleId] = useState<string>('')

  /**
   * 当快照变化时同步规则：
   * - 保留本地已编辑内容；
   * - 合并后端最新配置，避免切公司后仍残留旧状态。
   */
  useEffect(() => {
    if (initialRules.length === 0) {
      setRules([])
      return
    }

    setRules((previousRules) => {
      if (previousRules.length === 0) {
        return initialRules
      }

      const previousRuleMap = new Map(previousRules.map((item) => [item.id, item]))

      return initialRules.map((initialRule) => {
        const previousRule = previousRuleMap.get(initialRule.id)
        if (!previousRule) {
          return initialRule
        }

        return {
          ...initialRule,
          description: previousRule.description,
          manualReviewEnabled: previousRule.manualReviewEnabled,
          ownerMemberIds: previousRule.ownerMemberIds,
          platformChannelKeys: previousRule.platformChannelKeys,
          notifyMode: previousRule.notifyMode,
        }
      })
    })
  }, [initialRules])

  const effectiveRules = rules.length > 0 ? rules : initialRules

  /**
   * 页面模式与 URL 同步：
   * - 列表页：保持一个稳定高亮项（默认首个）；
   * - 详情页：以 URL 的 typeKey 为准选中规则。
   */
  useEffect(() => {
    if (effectiveRules.length === 0) {
      if (activeRuleId) {
        setActiveRuleId('')
      }
      return
    }

    if (isDetailPage) {
      if (isCreatingNewType) {
        setRules((previousRules) => {
          const hasTempRule = previousRules.some((item) => item.id === NEW_TYPE_RULE_ID)
          if (hasTempRule) {
            return previousRules
          }

          const tempRule: EventRuleDraft = {
            id: NEW_TYPE_RULE_ID,
            typeConfigId: null,
            typeCode: '',
            typeLabel: '',
            description: '',
            manualReviewEnabled: false,
            ownerMemberIds: [],
            platformChannelKeys: [],
            notifyMode: 'once',
            isSystem: false,
            isActive: true,
          }

          return [tempRule, ...previousRules]
        })

        if (activeRuleId !== NEW_TYPE_RULE_ID) {
          setActiveRuleId(NEW_TYPE_RULE_ID)
        }
        return
      }

      const matchedRule = effectiveRules.find((item) => normalizeEventTypeKey(item.id) === normalizedSelectedTypeKey)

      if (matchedRule) {
        if (activeRuleId !== matchedRule.id) {
          setActiveRuleId(matchedRule.id)
        }
        return
      }

      if (activeRuleId && effectiveRules.some((item) => item.id === activeRuleId)) {
        return
      }

      setActiveRuleId('')
      return
    }

    if (effectiveRules.some((item) => item.id === activeRuleId)) {
      return
    }

    setActiveRuleId(effectiveRules[0].id)
  }, [activeRuleId, effectiveRules, isCreatingNewType, isDetailPage, normalizedSelectedTypeKey])

  /**
   * 离开“新增类型”详情页后清理临时规则，避免污染列表数据。
   */
  useEffect(() => {
    if (isCreatingNewType) {
      return
    }

    setRules((previousRules) => {
      if (!previousRules.some((item) => item.id === NEW_TYPE_RULE_ID)) {
        return previousRules
      }

      return previousRules.filter((item) => item.id !== NEW_TYPE_RULE_ID)
    })
  }, [isCreatingNewType])

  const selectedRule = effectiveRules.find((item) => item.id === activeRuleId) || null
  const visibleRules = effectiveRules.filter((item) => item.id !== NEW_TYPE_RULE_ID)

  const selectedRuleTargets = useMemo(() => {
    if (!selectedRule || !selectedRule.typeConfigId) {
      return []
    }

    return (snapshotQuery.data?.targets || [])
      .filter((target) => {
        const extraConfig = toTargetExtraConfig(target.extra_config)
        const source = String(extraConfig.source || '').trim()
        if (source !== EVENT_TYPE_OWNER_TARGET_SOURCE) {
          return false
        }

        return target.type_config_id === selectedRule.typeConfigId
      })
      .reduce<EventNotificationTargetRow[]>((dedupedTargets, target) => {
        const dedupeKey = `${target.channel}:${target.notify_channel_id}:${target.target}:${target.notify_mode}`
        const hasSameTarget = dedupedTargets.some(
          (existingTarget) =>
            `${existingTarget.channel}:${existingTarget.notify_channel_id}:${existingTarget.target}:${existingTarget.notify_mode}` ===
            dedupeKey,
        )

        if (hasSameTarget) {
          return dedupedTargets
        }

        return [...dedupedTargets, target]
      }, [])
  }, [selectedRule, snapshotQuery.data?.targets])

  /**
   * 当前规则下已选负责人（用于展示已选邮箱与绑定账号摘要）。
   */
  const selectedResponsibleMembers = useMemo<EventResponsibleMemberOption[]>(() => {
    if (!selectedRule) {
      return []
    }

    return selectedRule.ownerMemberIds
      .map((memberId) => responsibleMemberOptionMap.get(memberId) || null)
      .filter((item): item is EventResponsibleMemberOption => Boolean(item))
  }, [responsibleMemberOptionMap, selectedRule])

  /**
   * 当前规则负责人已绑定的平台集合：
   * - 用于动态过滤“平台通知频道（多选）”；
   * - 只展示“负责人实际可被 @”的平台频道。
   */
  const selectedResponsiblePlatforms = useMemo<Set<EventChannelPlatform>>(() => {
    const platformSet = new Set<EventChannelPlatform>()

    selectedResponsibleMembers.forEach((memberOption) => {
      memberOption.bindings.forEach((binding) => {
        if (isEventChannelPlatform(binding.platform)) {
          platformSet.add(binding.platform)
        }
      })
    })

    return platformSet
  }, [selectedResponsibleMembers])

  /**
   * 负责人平台过滤后的频道候选：
   * - 负责人绑定了哪些平台，就只展示这些平台的频道；
   * - 若负责人暂无平台绑定，频道候选为空。
   */
  const availablePlatformChannelOptions = useMemo<EventChannelOption[]>(() => {
    if (selectedResponsiblePlatforms.size === 0) {
      return []
    }

    return channelOptions.filter((channelOption) => selectedResponsiblePlatforms.has(channelOption.platform))
  }, [channelOptions, selectedResponsiblePlatforms])

  /**
   * 当负责人变化导致平台范围收窄时，自动清理当前规则下已失效的频道选择：
   * - 避免 UI 展示“不可见/不可用”的历史频道；
   * - 避免保存时把无效频道写入目标配置。
   */
  useEffect(() => {
    if (!selectedRule) {
      return
    }

    const availableChannelKeySet = new Set(availablePlatformChannelOptions.map((option) => option.key))

    setRules((previousRules) => {
      let hasChanged = false

      const nextRules = previousRules.map((ruleItem) => {
        if (ruleItem.id !== selectedRule.id) {
          return ruleItem
        }

        const nextChannelKeys = ruleItem.platformChannelKeys.filter((channelKey) => availableChannelKeySet.has(channelKey))

        if (nextChannelKeys.length === ruleItem.platformChannelKeys.length) {
          return ruleItem
        }

        hasChanged = true
        return {
          ...ruleItem,
          platformChannelKeys: nextChannelKeys,
        }
      })

      return hasChanged ? nextRules : previousRules
    })
  }, [availablePlatformChannelOptions, selectedRule])

  /**
   * 当前规则已选的平台频道：
   * - 用于展示当前“群内 @ 通知”覆盖的频道范围；
   * - 候选范围受负责人已绑定平台约束。
   */
  const selectedPlatformChannelOptions = useMemo<EventChannelOption[]>(() => {
    if (!selectedRule) {
      return []
    }

    const channelOptionMap = new Map(availablePlatformChannelOptions.map((option) => [option.key, option]))
    return selectedRule.platformChannelKeys
      .map((channelKey) => channelOptionMap.get(channelKey) || null)
      .filter((item): item is EventChannelOption => Boolean(item))
  }, [availablePlatformChannelOptions, selectedRule])

  const canManage = currentUserRole === 'owner' || currentUserRole === 'admin'
  const hasSelectedResponsibleMembers = selectedResponsibleMembers.length > 0
  const hasBoundPlatforms = selectedResponsiblePlatforms.size > 0
  const isPlatformChannelSelectorDisabled =
    !canManage ||
    channelSourceQuery.isLoading ||
    Boolean(channelSourceQuery.error) ||
    !hasSelectedResponsibleMembers ||
    !hasBoundPlatforms ||
    availablePlatformChannelOptions.length === 0

  const platformChannelTriggerText =
    selectedPlatformChannelOptions.length > 0
      ? selectedPlatformChannelOptions.map((option) => `${getPlatformLabel(option.platform)} · ${option.channelName}`).join('、')
      : !hasSelectedResponsibleMembers
        ? m.event_settings_trigger_select_owner()
        : !hasBoundPlatforms
          ? m.event_settings_trigger_owner_unbound()
          : availablePlatformChannelOptions.length === 0
            ? m.event_settings_trigger_no_channels()
            : m.event_settings_trigger_select_channel()
  const isPanelLoading = snapshotQuery.isLoading || (isDetailPage && (channelSourceQuery.isLoading || responsibleMemberQuery.isLoading))

  if (!activeCompanyId) {
    return (
      <SettingsSectionShell title={m.event_settings_title()}>
        <CompanySelectionPrompt message={m.event_settings_select_company_first()} />
      </SettingsSectionShell>
    )
  }

  return (
    <SettingsSectionShell
      title={m.event_settings_title()}
      actions={
        !isDetailPage && canManage ? (
          <Button
            type="button"
            variant="dashboardPrimary"
            size="sm"
            className="h-8 min-w-[134px] rounded-lg px-4 text-sm font-semibold"
            onClick={() => {
              onOpenType?.(NEW_TYPE_ROUTE_KEY)
            }}
          >
            {m.event_settings_add_type()}
          </Button>
        ) : null
      }
    >
      <div className="space-y-4">
        {isPanelLoading ? <EventSettingsLoadingSkeleton isDetailPage={isDetailPage} /> : null}

        {snapshotQuery.error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{snapshotQuery.error.message}</p>
        ) : null}

        {channelSourceQuery.error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{channelSourceQuery.error.message}</p>
        ) : null}

        {responsibleMemberQuery.error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {responsibleMemberQuery.error.message}
          </p>
        ) : null}

        {(channelSourceQuery.data?.warnings || []).length > 0 ? (
          <div className="space-y-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
            {(channelSourceQuery.data?.warnings || []).map((warningText) => (
              <p key={warningText}>{warningText}</p>
            ))}
          </div>
        ) : null}

        {!isPanelLoading && !snapshotQuery.error ? (
          isDetailPage ? (
            <div className="space-y-3">
              <div>
                <Button
                  type="button"
                  variant="dashboardTintedGhost"
                  className="h-8 px-2"
                  onClick={() => {
                    onBackToList?.()
                  }}
                >
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  {m.event_settings_back_to_list()}
                </Button>
              </div>

              <div className="rounded-lg border border-[#e5e7eb] bg-white p-4">
                <div className="pb-3">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {isCreatingNewType
                      ? m.event_settings_detail_title_new()
                      : selectedRule
                        ? m.event_settings_detail_title_existing({
                            name: selectedRule.typeLabel,
                          })
                        : m.event_settings_detail_title_default()}
                  </h2>
                </div>

                <div className="space-y-4">
                  {!selectedRule ? (
                    <p className="text-sm text-zinc-500">{m.event_settings_type_not_found()}</p>
                  ) : (
                    <>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="event-type-code">{m.event_settings_label_type_key()}</Label>
                          <Input
                            id="event-type-code"
                            value={selectedRule.typeCode}
                            onChange={(event) => {
                              const nextNormalizedValue = normalizeEventTypeKey(event.target.value)
                              setRules((previousValue) =>
                                previousValue.map((item) =>
                                  item.id === selectedRule.id
                                    ? {
                                        ...item,
                                        typeCode: nextNormalizedValue,
                                        id: selectedRule.id === NEW_TYPE_RULE_ID ? NEW_TYPE_RULE_ID : nextNormalizedValue || item.id,
                                      }
                                    : item,
                                ),
                              )
                              if (selectedRule.id === NEW_TYPE_RULE_ID) {
                                setActiveRuleId(NEW_TYPE_RULE_ID)
                                return
                              }

                              setActiveRuleId(nextNormalizedValue || selectedRule.id)
                            }}
                            disabled={!canManage || selectedRule.isSystem}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="event-type-label">{m.event_settings_label_type_name()}</Label>
                          <Input
                            id="event-type-label"
                            value={selectedRule.typeLabel}
                            onChange={(event) => {
                              const nextValue = event.target.value
                              setRules((previousValue) =>
                                previousValue.map((item) => (item.id === selectedRule.id ? { ...item, typeLabel: nextValue } : item)),
                              )
                            }}
                            disabled={!canManage}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="event-type-description">{m.event_settings_label_type_description()}</Label>
                        <Textarea
                          id="event-type-description"
                          value={selectedRule.description}
                          onChange={(event) => {
                            const nextValue = event.target.value
                            setRules((previousValue) =>
                              previousValue.map((item) => (item.id === selectedRule.id ? { ...item, description: nextValue } : item)),
                            )
                          }}
                          className="min-h-[90px]"
                          disabled={!canManage}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{m.event_settings_label_responsible()}</Label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="dashboardTinted"
                              className="w-full justify-between"
                              disabled={!canManage || responsibleMemberQuery.isLoading || Boolean(responsibleMemberQuery.error)}
                            >
                              <span className="truncate text-left">
                                {selectedResponsibleMembers.length > 0
                                  ? selectedResponsibleMembers.map((member) => member.email).join('、')
                                  : m.event_settings_select_responsible()}
                              </span>
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-zinc-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[460px]">
                            <DropdownMenuLabel>{m.event_settings_member_list_label()}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {(responsibleMemberQuery.data || []).length === 0 ? (
                              <p className="px-2 py-1.5 text-xs text-zinc-500">{m.event_settings_no_members()}</p>
                            ) : (
                              (responsibleMemberQuery.data || []).map((memberOption) => {
                                const isChecked = selectedRule.ownerMemberIds.includes(memberOption.memberId)

                                return (
                                  <DropdownMenuCheckboxItem
                                    key={memberOption.memberId}
                                    checked={isChecked}
                                    onSelect={(event) => {
                                      event.preventDefault()
                                    }}
                                    onCheckedChange={(checked) => {
                                      const nextChecked = checked === true
                                      setRules((previousRules) =>
                                        previousRules.map((ruleItem) => {
                                          if (ruleItem.id !== selectedRule.id) {
                                            return ruleItem
                                          }

                                          const currentMemberIdSet = new Set(ruleItem.ownerMemberIds)
                                          if (nextChecked) {
                                            currentMemberIdSet.add(memberOption.memberId)
                                          } else {
                                            currentMemberIdSet.delete(memberOption.memberId)
                                          }

                                          return {
                                            ...ruleItem,
                                            ownerMemberIds: Array.from(currentMemberIdSet),
                                          }
                                        }),
                                      )
                                    }}
                                  >
                                    <div className="flex min-w-0 flex-col gap-0.5">
                                      <span className="truncate text-sm text-zinc-900">{memberOption.email}</span>
                                      <span className="truncate text-xs text-zinc-500">
                                        {memberOption.bindings.length > 0
                                          ? m.event_settings_bound_accounts({
                                              accounts: memberOption.bindings
                                                .map(
                                                  (binding) =>
                                                    `${getPlatformLabel(binding.platform)}(${binding.external_display || binding.external_account_id})`,
                                                )
                                                .join('、'),
                                            })
                                          : m.event_settings_unbound_accounts()}
                                      </span>
                                    </div>
                                  </DropdownMenuCheckboxItem>
                                )
                              })
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-2">
                        <Label>{m.event_settings_label_platform_channels()}</Label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="dashboardTinted"
                              className="w-full justify-between"
                              disabled={isPlatformChannelSelectorDisabled}
                            >
                              <span className="truncate text-left">{platformChannelTriggerText}</span>
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-zinc-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[520px]">
                            <DropdownMenuLabel>{m.event_settings_platform_channel_list()}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {!hasSelectedResponsibleMembers ? (
                              <p className="px-2 py-1.5 text-xs text-zinc-500">{m.event_settings_trigger_select_owner()}</p>
                            ) : !hasBoundPlatforms ? (
                              <p className="px-2 py-1.5 text-xs text-zinc-500">{m.event_settings_trigger_owner_unbound()}</p>
                            ) : availablePlatformChannelOptions.length === 0 ? (
                              <p className="px-2 py-1.5 text-xs text-zinc-500">{m.event_settings_no_channels()}</p>
                            ) : (
                              availablePlatformChannelOptions.map((channelOption) => {
                                const isChecked = selectedRule.platformChannelKeys.includes(channelOption.key)

                                return (
                                  <DropdownMenuCheckboxItem
                                    key={channelOption.key}
                                    checked={isChecked}
                                    onSelect={(event) => {
                                      event.preventDefault()
                                    }}
                                    onCheckedChange={(checked) => {
                                      const nextChecked = checked === true
                                      setRules((previousRules) =>
                                        previousRules.map((ruleItem) => {
                                          if (ruleItem.id !== selectedRule.id) {
                                            return ruleItem
                                          }

                                          const currentChannelKeySet = new Set(ruleItem.platformChannelKeys)
                                          if (nextChecked) {
                                            currentChannelKeySet.add(channelOption.key)
                                          } else {
                                            currentChannelKeySet.delete(channelOption.key)
                                          }

                                          return {
                                            ...ruleItem,
                                            platformChannelKeys: Array.from(currentChannelKeySet),
                                          }
                                        }),
                                      )
                                    }}
                                  >
                                    <div className="flex min-w-0 items-center gap-2">
                                      <Badge variant="outline" className="border-zinc-300 bg-zinc-100 text-[11px] text-zinc-600">
                                        {getPlatformLabel(channelOption.platform)}
                                      </Badge>
                                      <span className="truncate text-sm text-zinc-900">{channelOption.channelName}</span>
                                    </div>
                                  </DropdownMenuCheckboxItem>
                                )
                              })
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="rounded-lg border border-[#e5e7eb] bg-[#F8FAFC] p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <Label htmlFor="event-type-notify-enabled">{m.event_settings_label_send_notification()}</Label>
                            <p className="text-xs text-zinc-500">{m.event_settings_notify_disabled_hint()}</p>
                          </div>

                          <Switch
                            id="event-type-notify-enabled"
                            checked={selectedRule.notifyMode !== 'none'}
                            onCheckedChange={(checked) => {
                              setRules((previousValue) =>
                                previousValue.map((item) =>
                                  item.id === selectedRule.id
                                    ? {
                                        ...item,
                                        notifyMode: checked === true ? 'once' : 'none',
                                      }
                                    : item,
                                ),
                              )
                            }}
                            disabled={!canManage}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-zinc-900">{m.event_settings_notification_targets()}</p>
                        {selectedRuleTargets.length === 0 ? (
                          <p className="text-xs text-zinc-500">{m.event_settings_notification_targets_empty()}</p>
                        ) : (
                          <div className="space-y-1.5">
                            {selectedRuleTargets.map((target) => (
                              <div
                                key={target.id}
                                className="flex flex-wrap items-center gap-2 rounded-lg border border-[#e5e7eb] px-2 py-1.5 text-xs text-zinc-700"
                              >
                                <Badge variant="outline" className="border-zinc-300 bg-zinc-100 text-[11px] text-zinc-600">
                                  {target.channel}
                                </Badge>
                                {target.notify_channel_id ? (
                                  <Badge variant="outline" className="border-zinc-300 bg-zinc-100 text-[11px] text-zinc-600">
                                    {(target.notify_channel_name || target.notify_channel_id).trim()}
                                  </Badge>
                                ) : null}
                                <span className="truncate">{target.display_name || target.target}</span>
                                <span className="ml-auto text-zinc-500">{getNotifyModeLabel(selectedRule.notifyMode)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end pt-2">
                        <Button
                          type="button"
                          variant="dashboardPrimary"
                          disabled={!canManage || saveEventTypeMutation.isPending}
                          onClick={() => {
                            saveEventTypeMutation.mutate({
                              rule: selectedRule,
                            })
                          }}
                        >
                          {saveEventTypeMutation.isPending ? m.common_saving() : m.common_save()}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 rounded-lg border border-[#e5e7eb] bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-slate-900">{m.event_settings_list_title()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="space-y-1 rounded-lg border border-[#e5e7eb] bg-white p-2">
                  {visibleRules.length === 0 ? (
                    <p className="px-2 py-2 text-sm text-zinc-500">{m.event_settings_list_empty()}</p>
                  ) : (
                    visibleRules.map((rule) => {
                      const isActiveRule = activeRuleId === rule.id

                      return (
                        <button
                          key={rule.id}
                          type="button"
                          onClick={() => {
                            setActiveRuleId(rule.id)
                            onOpenType?.(rule.typeCode)
                          }}
                          className={`flex w-full items-center justify-between rounded px-2 py-2 text-left text-sm ${
                            isActiveRule
                              ? 'bg-[var(--dashboard-action-tinted-bg)] text-[var(--dashboard-action-tinted-fg)]'
                              : 'text-zinc-700 hover:bg-[var(--dashboard-action-tinted-bg)] hover:text-[var(--dashboard-action-tinted-fg)]'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="truncate">{rule.typeLabel}</p>
                            <p className="truncate text-[11px] text-zinc-500">{rule.typeCode}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {rule.isSystem ? (
                              <Badge variant="outline" className="border-zinc-300 bg-zinc-100 text-[11px] text-zinc-600">
                                {m.event_settings_system_badge()}
                              </Badge>
                            ) : null}
                            <Badge variant="outline" className="border-zinc-300 bg-zinc-100 text-[11px] text-zinc-600">
                              {getNotifyModeLabel(rule.notifyMode)}
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-zinc-500" />
                          </div>
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          )
        ) : null}
      </div>
    </SettingsSectionShell>
  )
}
