import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2, Plus, Ticket } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

import {
  SETTINGS_SECTION_SURFACE_CLASS_NAME,
} from '@/components/settings/settings-section-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import {
  fetchDiscordTicketPanelsSnapshot,
  publishDiscordTicketPanel,
  type DiscordTicketChannelOption,
  type DiscordTicketFormQuestion,
  type DiscordTicketPanelRecord,
  type DiscordTicketPanelsSnapshot,
  type DiscordTicketRoleOption,
} from '@/lib/services/discord-ticket-panels-api'
import { getLocale } from '@/paraglide/runtime'

type TicketPanelEditorMode = 'create' | 'edit'

type TicketPanelFormState = {
  channelId: string
  panelName: string
  categoryId: string
  closedCategoryId: string
  staffRoleIds: string[]
  panelMessageTemplate: string
  ticketMessageTemplate: string
  introMessageTemplate: string
  formQuestions: DiscordTicketFormQuestion[]
}

type TicketPanelCopy = {
  sectionTitle: string
  sectionDescription: string
  publishedCount: (count: number) => string
  addPanel: string
  editPanel: string
  publishPanel: string
  updatePanel: string
  readonlyHint: string
  connectFirst: string
  connectFirstHint: string
  emptyTitle: string
  emptyDescription: string
  defaultPreset: string
  publishChannel: string
  publishChannelPlaceholder: string
  publishChannelLockedHint: string
  ticketCategory: string
  ticketCategoryPlaceholder: string
  closedTicketCategory: string
  closedTicketCategoryPlaceholder: string
  closedTicketCategoryHint: string
  panelName: string
  panelNamePlaceholder: string
  staffRoles: string
  staffRolesHint: string
  panelTemplate: string
  panelTemplatePlaceholder: string
  ticketTemplate: string
  ticketTemplatePlaceholder: string
  introTemplate: string
  introTemplatePlaceholder: string
  questionTitle: string
  questionEmpty: string
  addQuestion: string
  removeQuestion: string
  requiredLabel: string
  multilineLabel: string
  panelCardPublishChannel: string
  panelCardCategory: string
  panelCardClosedCategory: string
  panelCardRoles: string
  panelCardQuestions: string
  panelCardUpdatedAt: string
  unknownChannel: string
  none: string
  publishedBadge: string
  createDialogTitle: string
  createDialogDescription: string
  editDialogTitle: string
  editDialogDescription: string
  cancel: string
  savePending: string
  saveSuccessCreate: string
  saveSuccessEdit: string
  saveError: string
  channelRequired: string
}

const DEFAULT_FORM_QUESTION: DiscordTicketFormQuestion = {
  title: '',
  required: false,
  multiline: false,
}

const TICKET_PANEL_COPY: Record<'zh' | 'en', TicketPanelCopy> = {
  zh: {
    sectionTitle: 'Ticket Panels',
    sectionDescription: '把 Discord ticket 入口拆成多个 panel，按问题类型或团队职责分别投放。',
    publishedCount: (count) => `已发布 ${count} 个 panel`,
    addPanel: '新建 panel',
    editPanel: '编辑 panel',
    publishPanel: '发布 panel',
    updatePanel: '更新 panel',
    readonlyHint: '仅 Owner / Admin 可管理 ticket panel。',
    connectFirst: '请先完成 Discord 社区接入',
    connectFirstHint: '连通社区并同步频道后，才能把 ticket panel 发布到指定频道。',
    emptyTitle: '还没有已发布的 ticket panel',
    emptyDescription: '建议按「售前咨询 / 账单问题 / Bug 反馈」拆成多个入口，避免所有请求都挤进同一个面板。',
    defaultPreset: '默认配置',
    publishChannel: '发布频道',
    publishChannelPlaceholder: '选择一个频道',
    publishChannelLockedHint: '当前版本暂不支持已发布 panel 迁移频道；如需换频道，请新建一个 panel。',
    ticketCategory: 'Ticket 分类',
    ticketCategoryPlaceholder: '不指定分类',
    closedTicketCategory: '关闭后分类',
    closedTicketCategoryPlaceholder: '关闭后不迁移分类',
    closedTicketCategoryHint: '关闭 ticket 时会移动到该分类，重开时再移回 Ticket 分类。',
    panelName: 'Panel 名称',
    panelNamePlaceholder: '例如 Billing Support',
    staffRoles: '处理角色',
    staffRolesHint: '至少选择一组会处理 ticket 的角色，便于后续路由到正确团队。',
    panelTemplate: '面板文案',
    panelTemplatePlaceholder: '介绍这个入口适合什么问题，以及用户点击后会发生什么。',
    ticketTemplate: 'Ticket 首条文案',
    ticketTemplatePlaceholder: '新 ticket 创建后，发送给用户和支持团队的第一条消息。',
    introTemplate: '引导补充文案',
    introTemplatePlaceholder: '可选。适合补充填写要求、预计响应时间或分流说明。',
    questionTitle: '表单问题',
    questionEmpty: '当前 panel 不收集额外表单问题。',
    addQuestion: '添加问题',
    removeQuestion: '移除问题',
    requiredLabel: '必填',
    multilineLabel: '多行',
    panelCardPublishChannel: '发布频道',
    panelCardCategory: 'Ticket 分类',
    panelCardClosedCategory: '关闭后分类',
    panelCardRoles: '处理角色',
    panelCardQuestions: '表单问题',
    panelCardUpdatedAt: '最近更新',
    unknownChannel: '未知频道',
    none: '未设置',
    publishedBadge: '已发布',
    createDialogTitle: '新建 Ticket Panel',
    createDialogDescription: '先定义入口定位，再选择发布频道和接单角色。这样同一个 Discord 社区就能承载多条 ticket 流程。',
    editDialogTitle: '编辑 Ticket Panel',
    editDialogDescription: '这里修改的是当前 panel 的发布快照，不会影响其它 panel。',
    cancel: '取消',
    savePending: '正在发布',
    saveSuccessCreate: 'Ticket panel 已发布。',
    saveSuccessEdit: 'Ticket panel 已更新。',
    saveError: '保存 ticket panel 失败，请稍后重试。',
    channelRequired: '请先选择一个发布频道。',
  },
  en: {
    sectionTitle: 'Ticket Panels',
    sectionDescription: 'Split Discord ticket entry points into multiple panels and route requests by scenario or team ownership.',
    publishedCount: (count) => `${count} panel(s) published`,
    addPanel: 'Add panel',
    editPanel: 'Edit panel',
    publishPanel: 'Publish panel',
    updatePanel: 'Update panel',
    readonlyHint: 'Only Owner/Admin can manage ticket panels.',
    connectFirst: 'Connect Discord first',
    connectFirstHint: 'Ticket panels can be published only after the Discord community is connected and channels are synced.',
    emptyTitle: 'No ticket panels published yet',
    emptyDescription: 'A good default is to split entry points by billing, bug report, and pre-sales questions instead of forcing everything into one panel.',
    defaultPreset: 'Default preset',
    publishChannel: 'Publish channel',
    publishChannelPlaceholder: 'Select a channel',
    publishChannelLockedHint: 'Published panels cannot be moved across channels yet. Create a new panel if you need a new channel.',
    ticketCategory: 'Ticket category',
    ticketCategoryPlaceholder: 'No category',
    closedTicketCategory: 'Closed category',
    closedTicketCategoryPlaceholder: 'Do not move on close',
    closedTicketCategoryHint: 'Closed tickets move here and reopening moves them back to the ticket category.',
    panelName: 'Panel name',
    panelNamePlaceholder: 'Example: Billing Support',
    staffRoles: 'Handling roles',
    staffRolesHint: 'Choose the roles that should receive and handle tickets created from this panel.',
    panelTemplate: 'Panel copy',
    panelTemplatePlaceholder: 'Explain what this panel is for and what users should expect after clicking.',
    ticketTemplate: 'First ticket message',
    ticketTemplatePlaceholder: 'The first message sent after a new ticket is created.',
    introTemplate: 'Extra guidance',
    introTemplatePlaceholder: 'Optional. Add extra context like response expectations or intake rules.',
    questionTitle: 'Form questions',
    questionEmpty: 'This panel does not collect extra intake questions yet.',
    addQuestion: 'Add question',
    removeQuestion: 'Remove question',
    requiredLabel: 'Required',
    multilineLabel: 'Multiline',
    panelCardPublishChannel: 'Publish channel',
    panelCardCategory: 'Ticket category',
    panelCardClosedCategory: 'Closed category',
    panelCardRoles: 'Roles',
    panelCardQuestions: 'Questions',
    panelCardUpdatedAt: 'Updated',
    unknownChannel: 'Unknown channel',
    none: 'Not set',
    publishedBadge: 'Published',
    createDialogTitle: 'Create Ticket Panel',
    createDialogDescription: 'Define the entry point first, then choose its publish channel and handling roles so one Discord workspace can support multiple ticket flows.',
    editDialogTitle: 'Edit Ticket Panel',
    editDialogDescription: 'This updates only the current panel snapshot and does not modify other published panels.',
    cancel: 'Cancel',
    savePending: 'Publishing',
    saveSuccessCreate: 'Ticket panel published.',
    saveSuccessEdit: 'Ticket panel updated.',
    saveError: 'Failed to save the ticket panel. Please try again later.',
    channelRequired: 'Select a publish channel first.',
  },
}

/**
 * 当前页面只需要中英双语切换，因此直接在组件内维护轻量文案表，
 * 避免为了这一轮设置重构再触碰 Paraglide 的编译产物。
 */
function getTicketPanelCopy(): TicketPanelCopy {
  return getLocale() === 'zh' ? TICKET_PANEL_COPY.zh : TICKET_PANEL_COPY.en
}

function buildInitialTicketPanelFormState(
  snapshot: DiscordTicketPanelsSnapshot | null,
  panel: DiscordTicketPanelRecord | null,
): TicketPanelFormState {
  if (panel) {
    return {
      channelId: panel.channelId,
      panelName: panel.panelName || '',
      categoryId: panel.categoryId || '',
      closedCategoryId: panel.closedCategoryId || '',
      staffRoleIds: [...panel.staffRoleIds],
      panelMessageTemplate: panel.panelMessageTemplate || '',
      ticketMessageTemplate: panel.ticketMessageTemplate || '',
      introMessageTemplate: panel.introMessageTemplate || '',
      formQuestions:
        panel.formQuestions.length > 0
          ? panel.formQuestions.map((question) => ({ ...question }))
          : [],
    }
  }

  return {
    channelId: snapshot?.defaultConfig.panelChannelId || '',
    panelName: snapshot?.defaultConfig.panelName || '',
    categoryId: snapshot?.defaultConfig.categoryId || '',
    closedCategoryId: snapshot?.defaultConfig.closedCategoryId || '',
    staffRoleIds: [...(snapshot?.defaultConfig.staffRoleIds || [])],
    panelMessageTemplate: snapshot?.defaultConfig.panelMessageTemplate || '',
    ticketMessageTemplate: snapshot?.defaultConfig.ticketMessageTemplate || '',
    introMessageTemplate: snapshot?.defaultConfig.introMessageTemplate || '',
    formQuestions:
      snapshot?.defaultConfig.formQuestions.length
        ? snapshot.defaultConfig.formQuestions.map((question) => ({ ...question }))
        : [],
  }
}

function formatPanelUpdatedAt(value: string | null): string | null {
  if (!value) {
    return null
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toLocaleString(getLocale() === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function buildChannelLabel(option: DiscordTicketChannelOption): string {
  return option.channelType === 4 ? option.name : `#${option.name}`
}

function buildRoleMeta(roleIds: string[], roles: DiscordTicketRoleOption[], fallbackText: string): string {
  if (roleIds.length === 0) {
    return fallbackText
  }

  const roleNameById = new Map<string, string>()
  roles.forEach((role) => {
    roleNameById.set(role.id, role.name)
  })

  const labels = roleIds
    .map((roleId) => roleNameById.get(roleId) || roleId)
    .slice(0, 2)

  const extraCount = roleIds.length - labels.length
  return extraCount > 0 ? `${labels.join(', ')} +${extraCount}` : labels.join(', ')
}

function TicketPanelsLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`ticket-panel-skeleton-${index}`}
          className="dashboard-skeleton-frame rounded-2xl border px-5 py-4"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="dashboard-skeleton--base h-5 w-[132px] rounded-[4px]" />
                <Skeleton className="dashboard-skeleton--soft h-5 w-[72px] rounded-full" />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((__, metaIndex) => (
                  <Skeleton
                    key={`ticket-panel-meta-${index}-${metaIndex}`}
                    className="dashboard-skeleton--soft h-11 rounded-xl"
                  />
                ))}
              </div>
            </div>

            <Skeleton className="dashboard-skeleton--base h-9 w-[108px] rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}

function TicketPanelCard(props: {
  copy: TicketPanelCopy
  panel: DiscordTicketPanelRecord
  roleOptions: DiscordTicketRoleOption[]
  canManage: boolean
  onEdit: (panel: DiscordTicketPanelRecord) => void
}) {
  const { copy, panel, roleOptions, canManage, onEdit } = props

  return (
    <article className="rounded-2xl border border-[var(--dashboard-panel-border)] bg-white px-5 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900">
              {panel.panelName || panel.channelName || copy.unknownChannel}
            </h3>

            <Badge
              variant="outline"
              className="border-[#dbe7ff] bg-[#eff4ff] text-[11px] font-medium text-[#3557b7]"
            >
              {copy.publishedBadge}
            </Badge>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-slate-500">
                {copy.panelCardPublishChannel}
              </p>
              <p className="mt-1 truncate text-sm font-medium text-slate-800">#{panel.channelName}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-slate-500">
                {copy.panelCardCategory}
              </p>
              <p className="mt-1 truncate text-sm font-medium text-slate-800">
                {panel.categoryName || copy.none}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-slate-500">
                {copy.panelCardClosedCategory}
              </p>
              <p className="mt-1 truncate text-sm font-medium text-slate-800">
                {panel.closedCategoryName || copy.none}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-slate-500">
                {copy.panelCardRoles}
              </p>
              <p className="mt-1 truncate text-sm font-medium text-slate-800">
                {buildRoleMeta(panel.staffRoleIds, roleOptions, copy.none)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-slate-500">
                {copy.panelCardQuestions}
              </p>
              <p className="mt-1 truncate text-sm font-medium text-slate-800">
                {panel.formQuestions.length > 0 ? String(panel.formQuestions.length) : copy.none}
              </p>
            </div>
          </div>

          {panel.panelMessageTemplate ? (
            <p className="line-clamp-2 text-sm leading-6 text-slate-500">{panel.panelMessageTemplate}</p>
          ) : null}

          {formatPanelUpdatedAt(panel.updatedAt) ? (
            <p className="text-xs text-slate-400">
              {copy.panelCardUpdatedAt}: {formatPanelUpdatedAt(panel.updatedAt)}
            </p>
          ) : null}
        </div>

        {canManage ? (
          <Button
            type="button"
            variant="dashboardTinted"
            size="sm"
            className="h-9 shrink-0 rounded-xl px-4 text-sm font-medium"
            onClick={() => {
              onEdit(panel)
            }}
          >
            {copy.editPanel}
          </Button>
        ) : null}
      </div>
    </article>
  )
}

function TicketPanelEditorDialog(props: {
  copy: TicketPanelCopy
  mode: TicketPanelEditorMode
  open: boolean
  canManage: boolean
  isPending: boolean
  snapshot: DiscordTicketPanelsSnapshot | null
  formState: TicketPanelFormState
  onOpenChange: (open: boolean) => void
  onChange: (nextState: TicketPanelFormState) => void
  onSubmit: () => void
}) {
  const {
    copy,
    mode,
    open,
    canManage,
    isPending,
    snapshot,
    formState,
    onOpenChange,
    onChange,
    onSubmit,
  } = props

  const publishChannels = snapshot?.publishChannels || []
  const categoryChannels = snapshot?.categoryChannels || []
  const roleOptions = snapshot?.roleOptions || []
  const isEditMode = mode === 'edit'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[var(--dashboard-panel-border)] bg-white p-0 sm:max-w-[920px]">
        <DialogHeader className="border-b border-[var(--dashboard-panel-border)] px-6 py-5 text-left">
          <DialogTitle className="text-lg font-semibold text-slate-900">
            {isEditMode ? copy.editDialogTitle : copy.createDialogTitle}
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-slate-500">
            {isEditMode ? copy.editDialogDescription : copy.createDialogDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[75vh] space-y-5 overflow-y-auto px-6 py-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-800">{copy.panelName}</Label>
              <Input
                value={formState.panelName}
                placeholder={copy.panelNamePlaceholder}
                disabled={!canManage || isPending}
                onChange={(event) => {
                  onChange({
                    ...formState,
                    panelName: event.target.value,
                  })
                }}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-800">{copy.publishChannel}</Label>
              <Select
                value={formState.channelId || undefined}
                disabled={!canManage || isPending || isEditMode}
                onValueChange={(value) => {
                  onChange({
                    ...formState,
                    channelId: value,
                  })
                }}
              >
                <SelectTrigger className="w-full rounded-xl border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none">
                  <SelectValue placeholder={copy.publishChannelPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {publishChannels.map((channel) => (
                    <SelectItem key={channel.id} value={channel.id}>
                      {buildChannelLabel(channel)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {isEditMode ? (
                <p className="text-xs leading-5 text-slate-500">{copy.publishChannelLockedHint}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-800">{copy.ticketCategory}</Label>
              <Select
                value={formState.categoryId || '__none__'}
                disabled={!canManage || isPending}
                onValueChange={(value) => {
                  onChange({
                    ...formState,
                    categoryId: value === '__none__' ? '' : value,
                  })
                }}
              >
                <SelectTrigger className="w-full rounded-xl border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none">
                  <SelectValue placeholder={copy.ticketCategoryPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">{copy.ticketCategoryPlaceholder}</SelectItem>
                  {categoryChannels.map((channel) => (
                    <SelectItem key={channel.id} value={channel.id}>
                      {buildChannelLabel(channel)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-800">{copy.closedTicketCategory}</Label>
              <Select
                value={formState.closedCategoryId || '__none__'}
                disabled={!canManage || isPending}
                onValueChange={(value) => {
                  onChange({
                    ...formState,
                    closedCategoryId: value === '__none__' ? '' : value,
                  })
                }}
              >
                <SelectTrigger className="w-full rounded-xl border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none">
                  <SelectValue placeholder={copy.closedTicketCategoryPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">{copy.closedTicketCategoryPlaceholder}</SelectItem>
                  {categoryChannels.map((channel) => (
                    <SelectItem key={channel.id} value={channel.id}>
                      {buildChannelLabel(channel)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="text-xs leading-5 text-slate-500">
                {copy.closedTicketCategoryHint}
              </p>
            </div>

            <div className="rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#3557b7]">
                  <Ticket className="h-4 w-4" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">{copy.defaultPreset}</p>
                  <p className="text-xs leading-5 text-slate-500">
                    {snapshot?.defaultConfig.panelName
                      ? `${snapshot.defaultConfig.panelName} / ${snapshot.defaultConfig.staffRoleIds.length} roles`
                      : copy.none}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-800">{copy.staffRoles}</Label>
              <p className="text-xs leading-5 text-slate-500">{copy.staffRolesHint}</p>
            </div>

            <div className="max-h-[220px] overflow-y-auto rounded-2xl border border-[var(--dashboard-panel-border)] bg-slate-50 p-3">
              <div className="flex flex-wrap gap-2">
                {roleOptions.map((role) => {
                  const isSelected = formState.staffRoleIds.includes(role.id)

                  return (
                    <button
                      key={role.id}
                      type="button"
                      disabled={!canManage || isPending}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                        isSelected
                          ? 'border-[#bfd2ff] bg-[#eef4ff] text-[#3557b7]'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-800',
                      )}
                      onClick={() => {
                        if (isSelected) {
                          onChange({
                            ...formState,
                            staffRoleIds: formState.staffRoleIds.filter((roleId) => roleId !== role.id),
                          })
                          return
                        }

                        onChange({
                          ...formState,
                          staffRoleIds: [...formState.staffRoleIds, role.id],
                        })
                      }}
                    >
                      {role.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-800">{copy.panelTemplate}</Label>
              <Textarea
                rows={5}
                value={formState.panelMessageTemplate}
                placeholder={copy.panelTemplatePlaceholder}
                disabled={!canManage || isPending}
                className="min-h-[132px] rounded-2xl border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none"
                onChange={(event) => {
                  onChange({
                    ...formState,
                    panelMessageTemplate: event.target.value,
                  })
                }}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-800">{copy.ticketTemplate}</Label>
              <Textarea
                rows={5}
                value={formState.ticketMessageTemplate}
                placeholder={copy.ticketTemplatePlaceholder}
                disabled={!canManage || isPending}
                className="min-h-[132px] rounded-2xl border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none"
                onChange={(event) => {
                  onChange({
                    ...formState,
                    ticketMessageTemplate: event.target.value,
                  })
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-800">{copy.introTemplate}</Label>
            <Textarea
              rows={3}
              value={formState.introMessageTemplate}
              placeholder={copy.introTemplatePlaceholder}
              disabled={!canManage || isPending}
              className="min-h-[96px] rounded-2xl border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none"
              onChange={(event) => {
                onChange({
                  ...formState,
                  introMessageTemplate: event.target.value,
                })
              }}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-800">{copy.questionTitle}</p>
                <p className="text-xs leading-5 text-slate-500">{copy.questionEmpty}</p>
              </div>

              <Button
                type="button"
                variant="dashboardTinted"
                size="sm"
                className="h-9 rounded-xl px-3 text-sm font-medium"
                disabled={!canManage || isPending}
                onClick={() => {
                  onChange({
                    ...formState,
                    formQuestions: [...formState.formQuestions, { ...DEFAULT_FORM_QUESTION }],
                  })
                }}
              >
                <Plus className="h-4 w-4" />
                {copy.addQuestion}
              </Button>
            </div>

            {formState.formQuestions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--dashboard-panel-border)] bg-slate-50 px-4 py-5 text-sm text-slate-500">
                {copy.questionEmpty}
              </div>
            ) : (
              <div className="space-y-3">
                {formState.formQuestions.map((question, index) => (
                  <div
                    key={`ticket-question-${index}`}
                    className="rounded-2xl border border-[var(--dashboard-panel-border)] bg-slate-50 px-4 py-4"
                  >
                    <div className="space-y-3">
                      <Input
                        value={question.title}
                        placeholder={`${copy.questionTitle} ${index + 1}`}
                        disabled={!canManage || isPending}
                        className="rounded-xl border-[var(--dashboard-panel-border)] bg-white text-[13px] shadow-none"
                        onChange={(event) => {
                          const nextQuestions = formState.formQuestions.map((item, questionIndex) =>
                            questionIndex === index
                              ? {
                                  ...item,
                                  title: event.target.value,
                                }
                              : item,
                          )

                          onChange({
                            ...formState,
                            formQuestions: nextQuestions,
                          })
                        }}
                      />

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={question.required}
                            disabled={!canManage || isPending}
                            onCheckedChange={(checked) => {
                              const nextQuestions = formState.formQuestions.map((item, questionIndex) =>
                                questionIndex === index
                                  ? {
                                      ...item,
                                      required: checked,
                                    }
                                  : item,
                              )

                              onChange({
                                ...formState,
                                formQuestions: nextQuestions,
                              })
                            }}
                          />
                          <span className="text-sm text-slate-700">{copy.requiredLabel}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Switch
                            checked={question.multiline}
                            disabled={!canManage || isPending}
                            onCheckedChange={(checked) => {
                              const nextQuestions = formState.formQuestions.map((item, questionIndex) =>
                                questionIndex === index
                                  ? {
                                      ...item,
                                      multiline: checked,
                                    }
                                  : item,
                              )

                              onChange({
                                ...formState,
                                formQuestions: nextQuestions,
                              })
                            }}
                          />
                          <span className="text-sm text-slate-700">{copy.multilineLabel}</span>
                        </div>

                        <Button
                          type="button"
                          variant="dashboardGhost"
                          size="sm"
                          className="h-8 rounded-lg px-2 text-xs font-medium"
                          disabled={!canManage || isPending}
                          onClick={() => {
                            onChange({
                              ...formState,
                              formQuestions: formState.formQuestions.filter((_, questionIndex) => questionIndex !== index),
                            })
                          }}
                        >
                          {copy.removeQuestion}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t border-[var(--dashboard-panel-border)] px-6 py-4">
          <Button
            type="button"
            variant="dashboardTinted"
            size="sm"
            className="h-10 rounded-xl px-4 text-sm font-medium"
            onClick={() => {
              onOpenChange(false)
            }}
          >
            {copy.cancel}
          </Button>

          <Button
            type="button"
            variant="dashboardPrimary"
            size="sm"
            className="h-10 rounded-xl px-4 text-sm font-semibold"
            disabled={!canManage || isPending}
            onClick={onSubmit}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {copy.savePending}
              </>
            ) : isEditMode ? (
              copy.updatePanel
            ) : (
              copy.publishPanel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Discord ticket panels 分区：
 * - 复用当前 settings 页的白卡 + 强信息密度风格；
 * - 把 ticket 设置从“单一配置表单”升级成“多 panel 列表 + 单 panel 编辑器”。
 */
export function DiscordTicketPanelsSection(props: {
  activeCompanyId: string | null
  canManage: boolean
  isConnected: boolean
}) {
  const { activeCompanyId, canManage, isConnected } = props
  const copy = getTicketPanelCopy()
  const queryClient = useQueryClient()

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [editorMode, setEditorMode] = useState<TicketPanelEditorMode>('create')
  const [editingPanel, setEditingPanel] = useState<DiscordTicketPanelRecord | null>(null)
  const [formState, setFormState] = useState<TicketPanelFormState>(
    buildInitialTicketPanelFormState(null, null),
  )

  const snapshotQuery = useQuery({
    queryKey: ['settings', 'discord-ticket-panels', activeCompanyId],
    enabled: Boolean(activeCompanyId),
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(copy.connectFirst)
      }

      return fetchDiscordTicketPanelsSnapshot({
        companyId: activeCompanyId,
      })
    },
    staleTime: 15_000,
  })

  const publishMutation = useMutation({
    mutationFn: publishDiscordTicketPanel,
  })

  const isTicketingReady = isConnected || Boolean(snapshotQuery.data?.guildId)

  /**
   * 当快照或编辑对象变化时，统一重置编辑器状态：
   * - 新建 panel 时优先复用默认配置；
   * - 编辑 panel 时则始终以当前 panel 快照为准。
   */
  useEffect(() => {
    if (!isDialogOpen) {
      return
    }

    setFormState(buildInitialTicketPanelFormState(snapshotQuery.data || null, editingPanel))
  }, [editingPanel, isDialogOpen, snapshotQuery.data])

  const publishedCount = snapshotQuery.data?.panels.length || 0
  const canCreatePanel = Boolean(activeCompanyId) && isTicketingReady && canManage

  const handleOpenCreate = (): void => {
    setEditorMode('create')
    setEditingPanel(null)
    setFormState(buildInitialTicketPanelFormState(snapshotQuery.data || null, null))
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (panel: DiscordTicketPanelRecord): void => {
    setEditorMode('edit')
    setEditingPanel(panel)
    setFormState(buildInitialTicketPanelFormState(snapshotQuery.data || null, panel))
    setIsDialogOpen(true)
  }

  const handleSubmit = async (): Promise<void> => {
    if (!activeCompanyId) {
      return
    }

    if (!formState.channelId.trim()) {
      toast.error(copy.channelRequired)
      return
    }

    try {
      await publishMutation.mutateAsync({
        companyId: activeCompanyId,
        channelId: formState.channelId.trim(),
        panelName: formState.panelName.trim() || null,
        categoryId: formState.categoryId.trim() || null,
        closedCategoryId: formState.closedCategoryId.trim() || null,
        staffRoleIds: formState.staffRoleIds,
        panelMessageTemplate: formState.panelMessageTemplate.trim() || null,
        ticketMessageTemplate: formState.ticketMessageTemplate.trim() || null,
        introMessageTemplate: formState.introMessageTemplate.trim() || null,
        formQuestions: formState.formQuestions
          .map((question) => ({
            title: question.title.trim(),
            required: Boolean(question.required),
            multiline: Boolean(question.multiline),
          }))
          .filter((question) => question.title.length > 0),
      })

      await queryClient.invalidateQueries({
        queryKey: ['settings', 'discord-ticket-panels', activeCompanyId],
      })

      toast.success(editorMode === 'edit' ? copy.saveSuccessEdit : copy.saveSuccessCreate)
      setIsDialogOpen(false)
      setEditingPanel(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : copy.saveError)
    }
  }

  const emptyState = useMemo(() => {
    if (snapshotQuery.isLoading) {
      return <TicketPanelsLoadingSkeleton />
    }

    if (snapshotQuery.error) {
      return (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm leading-6 text-red-700">
          {snapshotQuery.error.message}
        </div>
      )
    }

    if (!isTicketingReady) {
      return (
        <div className="rounded-2xl border border-dashed border-[var(--dashboard-panel-border)] bg-slate-50 px-5 py-6">
          <p className="text-base font-semibold text-slate-800">{copy.connectFirst}</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">{copy.connectFirstHint}</p>
        </div>
      )
    }

    if ((snapshotQuery.data?.panels.length || 0) === 0) {
      return (
        <div className="rounded-2xl border border-dashed border-[var(--dashboard-panel-border)] bg-slate-50 px-5 py-6">
          <p className="text-base font-semibold text-slate-800">{copy.emptyTitle}</p>
          <p className="mt-2 max-w-[720px] text-sm leading-6 text-slate-500">{copy.emptyDescription}</p>

          {canManage ? (
            <Button
              type="button"
              variant="dashboardPrimary"
              size="sm"
              className="mt-4 h-9 rounded-xl px-4 text-sm font-semibold"
              onClick={handleOpenCreate}
            >
              <Plus className="h-4 w-4" />
              {copy.addPanel}
            </Button>
          ) : null}
        </div>
      )
    }

    return null
  }, [canManage, copy, handleOpenCreate, isTicketingReady, snapshotQuery.data?.panels.length, snapshotQuery.error, snapshotQuery.isLoading])

  return (
    <>
      <section className={cn(SETTINGS_SECTION_SURFACE_CLASS_NAME, 'overflow-hidden')}>
        <div className="space-y-5 p-5">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#dbe7ff] bg-[#eef4ff] text-[#3557b7]">
                <Ticket className="h-5 w-5" />
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold text-slate-900">{copy.sectionTitle}</h2>
                  <Badge
                    variant="outline"
                    className="border-slate-200 bg-slate-100 text-[11px] font-medium text-slate-700"
                  >
                    {copy.publishedCount(publishedCount)}
                  </Badge>
                </div>

                <p className="max-w-[720px] text-sm leading-6 text-slate-500">{copy.sectionDescription}</p>
                {!canManage ? (
                  <p className="text-xs leading-5 text-slate-400">{copy.readonlyHint}</p>
                ) : null}
              </div>
            </div>

            <Button
              type="button"
              variant="dashboardPrimary"
              size="sm"
              className="h-9 shrink-0 rounded-xl px-4 text-sm font-semibold"
              disabled={!canCreatePanel}
              onClick={handleOpenCreate}
            >
              <Plus className="h-4 w-4" />
              {copy.addPanel}
            </Button>
          </header>

          {emptyState ? (
            emptyState
          ) : (
            <div className="space-y-3">
              {(snapshotQuery.data?.panels || []).map((panel) => (
                <TicketPanelCard
                  key={panel.id}
                  copy={copy}
                  panel={panel}
                  roleOptions={snapshotQuery.data?.roleOptions || []}
                  canManage={canManage}
                  onEdit={handleOpenEdit}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <TicketPanelEditorDialog
        copy={copy}
        mode={editorMode}
        open={isDialogOpen}
        canManage={canManage}
        isPending={publishMutation.isPending}
        snapshot={snapshotQuery.data || null}
        formState={formState}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) {
            setEditingPanel(null)
          }
        }}
        onChange={setFormState}
        onSubmit={() => {
          void handleSubmit()
        }}
      />
    </>
  )
}
