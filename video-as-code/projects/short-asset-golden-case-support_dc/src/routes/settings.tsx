import { Outlet, createFileRoute, Link, redirect, useNavigate, useRouterState } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { BillingPlanPanel, BillingPlanPanelSkeleton } from '@/components/settings/billing-plan-panel'
import {
  BillingUsageHistoryPanel,
  BillingUsageHistoryPanelSkeleton,
} from '@/components/settings/billing-usage-history-panel'
import { CompanySelectionPrompt } from '@/components/company-selection-prompt'
import { CompanyUserProfileForm } from '@/components/profile/company-user-profile-form'
import { ProfilePlatformAccountLinkingSection } from '@/components/profile/profile-platform-account-linking-section'
import {
  MemberManagementPanel,
  MemberManagementPanelSkeleton,
} from '@/components/settings/member-management-panel'
import { DiscordIntegrationPanel } from '@/components/settings/discord-integration-panel'
import { EventSettingsPanel } from '@/components/settings/event-settings-panel'
import { FeishuIntegrationPanel } from '@/components/settings/feishu-integration-panel'
import { type PlatformAccountLinkingPanelProps } from '@/components/settings/platform-account-linking-panel'
import { SlackIntegrationPanel } from '@/components/settings/slack-integration-panel'
import { TelegramSettingsPanel } from '@/components/settings/telegram-settings-panel'
import { WorkspaceIntegrationPanel } from '@/components/settings/workspace-integration-panel'
import { Card, CardContent } from '@/components/ui/card'
import { requireAuthOrRedirect } from '@/lib/auth/guard'
import { setSelectedCompanyId, useSelectedCompanyId } from '@/lib/company-selection'
import { DEFAULT_SETTINGS_SECTION_ID } from '@/lib/settings/constants'
import {
  createBillingCheckoutSession,
  fetchBillingInvoices,
  createBillingPortalSession,
  fetchBillingSummary,
  updateBillingUsagePolicy,
} from '@/lib/services/billing-api'
import { useCurrentUserCompanies } from '@/lib/services/company-membership-query'
import {
  createMemberInviteLink,
  createMemberAccountOauthLinkUrl,
  fetchMemberManagementSnapshot,
  inviteMember,
  linkTelegramMemberAccount,
  removeMember,
  updateMemberRole,
  unlinkMemberAccount,
  type CompanyRole,
  type OauthLinkPlatformType,
  type MemberRecord,
  type MemberRole,
  type MemberStatus,
  type PlatformType as MemberAccountPlatformType,
} from '@/lib/services/member-management-api'
import {
  type TelegramWidgetAuthUser,
} from '@/lib/services/telegram-integration-api'
import { m } from '@/paraglide/messages'

/**
 * 设置页一级分区。
 * 使用 union 类型限制可选值，避免后续在条件渲染中出现拼写错误。
 */
type SettingsSectionId =
  | 'workspace-integration'
  | 'profile-settings'
  | 'discord-integration'
  | 'slack-integration'
  | 'feishu-integration'
  | 'telegram-settings'
  | 'event-settings'
  | 'member-management'
  | 'package'
  | 'usage-history'

/**
 * 判断字符串是否为合法设置分区 ID。
 * 用于在路由参数解析阶段做收口，避免非法值污染状态。
 */
function isSettingsSectionId(value: string): value is SettingsSectionId {
  return (
    value === 'workspace-integration' ||
    value === 'profile-settings' ||
    value === 'discord-integration' ||
    value === 'slack-integration' ||
    value === 'feishu-integration' ||
    value === 'telegram-settings' ||
    value === 'event-settings' ||
    value === 'member-management' ||
    value === 'package' ||
    value === 'usage-history'
  )
}

/**
 * 左侧导航分两类：
 * - label: 分组标题，不可点击。
 * - item: 可点击页面入口。
 */
type NavEntry =
  | {
      kind: 'label'
      label: string
    }
  | {
      kind: 'item'
      id: SettingsSectionId
      label: string
    }

function getNavEntries(): NavEntry[] {
  return [
    { kind: 'item', id: 'workspace-integration', label: m.settings_nav_workgroup_settings() },
    { kind: 'label', label: m.settings_nav_user_communities() },
    { kind: 'item', id: 'discord-integration', label: 'Discord' },
    { kind: 'item', id: 'slack-integration', label: 'Slack' },
    { kind: 'item', id: 'feishu-integration', label: 'Feishu' },
    { kind: 'item', id: 'telegram-settings', label: 'Telegram' },
    { kind: 'label', label: m.settings_nav_management() },
    { kind: 'item', id: 'profile-settings', label: m.settings_nav_profile_settings() },
    { kind: 'item', id: 'event-settings', label: m.settings_nav_event_settings() },
    { kind: 'item', id: 'member-management', label: m.settings_nav_member_management() },
    { kind: 'item', id: 'package', label: m.settings_nav_package() },
    { kind: 'item', id: 'usage-history', label: m.settings_nav_usage_history() },
  ]
}

/**
 * 将导航按移动端展示拆成“主入口 + 分组入口”：
 * - 主入口优先暴露默认工作群设置，保证用户进入页面即可看到核心配置；
 * - 其它分区保留为横向滚动 chips，避免传统侧栏在小屏下把首屏完全占满。
 */
function getMobileNavGroups(navEntries: NavEntry[]): {
  primaryEntry: Extract<NavEntry, { kind: 'item' }>
  groupedEntries: Array<{
    label: string | null
    items: Array<Extract<NavEntry, { kind: 'item' }>>
  }>
} {
  const primaryEntry =
    navEntries.find(
      (entry): entry is Extract<NavEntry, { kind: 'item' }> =>
        entry.kind === 'item' && entry.id === DEFAULT_SETTINGS_SECTION_ID,
    ) ??
    navEntries.find((entry): entry is Extract<NavEntry, { kind: 'item' }> => entry.kind === 'item')

  if (!primaryEntry) {
    throw new Error('settings navigation requires at least one item entry')
  }

  const groupedEntries: Array<{
    label: string | null
    items: Array<Extract<NavEntry, { kind: 'item' }>>
  }> = []
  let currentGroupLabel: string | null = null
  let currentGroupItems: Array<Extract<NavEntry, { kind: 'item' }>> = []

  navEntries.forEach((entry) => {
    if (entry.kind === 'label') {
      if (currentGroupItems.length > 0) {
        groupedEntries.push({
          label: currentGroupLabel,
          items: currentGroupItems,
        })
      }

      currentGroupLabel = entry.label
      currentGroupItems = []
      return
    }

    if (entry.id === primaryEntry.id) {
      return
    }

    currentGroupItems.push(entry)
  })

  if (currentGroupItems.length > 0) {
    groupedEntries.push({
      label: currentGroupLabel,
      items: currentGroupItems,
    })
  }

  return {
    primaryEntry,
    groupedEntries,
  }
}

export const Route = createFileRoute('/settings')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)

    if (location.pathname !== '/settings') {
      return
    }

    /**
     * `/settings` 仅作为默认入口跳板：
     * - 显式重定向到默认分区，避免地址栏停留在根路径但页面内容来自隐式兜底；
     * - 使用强类型 `to + params`，保证后续重构分区路径时能被类型系统及时发现。
     */
    throw redirect({
      to: '/settings/$tab',
      params: {
        tab: DEFAULT_SETTINGS_SECTION_ID,
      },
      replace: true,
    })
  },
  component: Outlet,
})

/**
 * 顶层设置页：
 * - 左侧导航采用 Figma 设计稿的浅灰分组样式；
 * - 右侧主区保持白色面板承载业务内容；
 * - 成员管理已接入 TanStack Query + 服务端 Supabase API，其它模块仍为前端占位实现。
 */
export function SettingsPage(props?: {
  routeTab?: string
  routeEventTypeKey?: string
}) {
  const { routeTab, routeEventTypeKey } = props || {}
  const navigate = useNavigate()
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  /**
   * 从 pathname 提取 settings 子路径片段：
   * - `/settings` -> []
   * - `/settings/event-settings` -> ['event-settings']
   * - `/settings/event-settings/KNOWLEDGE_REQUEST` -> ['event-settings', 'KNOWLEDGE_REQUEST']
   * 通过分段解析，避免把多段路径误识别成一个 tab，导致回退默认分区。
   */
  const settingsPathSegments: string[] = useMemo(() => {
    if (pathname === '/settings') {
      return []
    }

    if (!pathname.startsWith('/settings/')) {
      return []
    }

    const normalizedRemainder = pathname.slice('/settings/'.length)
    if (!normalizedRemainder.trim()) {
      return []
    }

    return normalizedRemainder
      .split('/')
      .map((segment) => decodeURIComponent(segment).trim())
      .filter((segment) => segment.length > 0)
  }, [pathname])

  /**
   * URL 回退参数：
   * - 第一段作为 settings 分区；
   * - 当分区是 event-settings 时，第二段作为事件类型 key。
   */
  const tabFromPathname: string | undefined = settingsPathSegments[0]
  const routeEventTypeKeyFromPathname: string | undefined =
    settingsPathSegments[0] === 'event-settings' && settingsPathSegments.length > 1
      ? settingsPathSegments[1]
      : undefined

  const queryClient = useQueryClient()
  const selectedCompanyId = useSelectedCompanyId()
  const {
    data: userCompanies = [],
    isLoading: isLoadingCompanies,
    isFetching: isFetchingCompanies,
  } = useCurrentUserCompanies()

  /**
   * 当前激活导航（由路径参数决定）：
   * - `/settings/:tab` 命中时使用路由参数；
   * - 其它异常场景统一回退到默认的“工作群设置”分区。
   */
  const activeSectionId: SettingsSectionId =
    (routeTab && isSettingsSectionId(routeTab) ? routeTab : undefined) ||
    (tabFromPathname && isSettingsSectionId(tabFromPathname) ? tabFromPathname : undefined) ||
    DEFAULT_SETTINGS_SECTION_ID

  const activeEventTypeKey: string | null =
    (routeEventTypeKey || routeEventTypeKeyFromPathname || '').trim() || null

  /**
   * 当前生效公司：
   * - 优先使用 Header 选择的公司；
   * - 若 localStorage 残留无效 company_id，则回退到首个可访问公司。
   */
  const activeCompanyId = useMemo(() => {
    if (userCompanies.length === 0) {
      return null
    }

    const isSelectedCompanyValid = selectedCompanyId
      ? userCompanies.some((company) => company.companyId === selectedCompanyId)
      : false

    if (isSelectedCompanyValid && selectedCompanyId) {
      return selectedCompanyId
    }

    return userCompanies[0].companyId
  }, [selectedCompanyId, userCompanies])

  /**
   * 当前公司的成员关系信息：
   * - 直接复用 `useCurrentUserCompanies` 返回的 memberRole；
   * - 供非“人员管理”分区快速判断角色，避免额外接口请求。
   */
  const activeCompanyMembership = useMemo(() => {
    if (!activeCompanyId) {
      return null
    }

    return userCompanies.find((company) => company.companyId === activeCompanyId) || null
  }, [activeCompanyId, userCompanies])

  /**
   * 修正失效公司选择：
   * - 当用户切换账号或公司后，避免 settings 仍持有过期 company_id；
   * - 自动回写首个可访问公司，保证后续 API 参数稳定。
   */
  useEffect(() => {
    /**
     * 设置页和 Header / dashboard 保持同一套兜底策略：
     * - 只在公司列表稳定后才判断 selectedCompanyId 是否失效；
     * - 避免邀请流刚完成时，这里先拿到旧列表，再把新组织回退掉。
     */
    if (isLoadingCompanies || isFetchingCompanies || userCompanies.length === 0) {
      return
    }

    const isSelectedCompanyValid = selectedCompanyId
      ? userCompanies.some((company) => company.companyId === selectedCompanyId)
      : false

    if (!isSelectedCompanyValid) {
      setSelectedCompanyId(userCompanies[0].companyId)
    }
  }, [isFetchingCompanies, isLoadingCompanies, selectedCompanyId, userCompanies])

  const [memberActionMessage, setMemberActionMessage] = useState<string | null>(null)
  const shouldLoadMemberBindingData: boolean =
    activeSectionId === 'profile-settings' ||
    activeSectionId === 'member-management' ||
    activeSectionId === 'discord-integration' ||
    activeSectionId === 'slack-integration' ||
    activeSectionId === 'feishu-integration' ||
    activeSectionId === 'telegram-settings'

  /**
   * 成员管理数据快照：
   * - 成员管理页与各平台 onboarding 共用同一份成员身份快照；
   * - 所有成员数据均由服务端返回（包含权限与配额校验结果）。
   */
  const memberSnapshotQuery = useQuery({
    queryKey: ['settings', 'member-management', activeCompanyId],
    enabled: Boolean(activeCompanyId) && shouldLoadMemberBindingData,
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }
      return fetchMemberManagementSnapshot({
        companyId: activeCompanyId,
      })
    },
    staleTime: 20_000,
  })

  const inviteMemberMutation = useMutation({
    mutationFn: inviteMember,
  })
  const createMemberInviteLinkMutation = useMutation({
    mutationFn: createMemberInviteLink,
  })

  const removeMemberMutation = useMutation({
    mutationFn: removeMember,
  })
  const updateMemberRoleMutation = useMutation({
    mutationFn: updateMemberRole,
  })
  const createMemberAccountOauthLinkUrlMutation = useMutation({
    mutationFn: createMemberAccountOauthLinkUrl,
  })
  const linkTelegramMemberAccountMutation = useMutation({
    mutationFn: linkTelegramMemberAccount,
  })
  const unlinkMemberAccountMutation = useMutation({
    mutationFn: unlinkMemberAccount,
  })

  const currentUserRole: CompanyRole =
    memberSnapshotQuery.data?.currentUserRole || activeCompanyMembership?.memberRole || 'member'
  const members: MemberRecord[] = memberSnapshotQuery.data?.members || []
  const currentActiveMember: MemberRecord | null = useMemo(
    () => members.find((member) => member.isCurrentUser && member.status === 'active') || null,
    [members],
  )
  const adminLimit: number = memberSnapshotQuery.data?.adminLimit || 3
  const activeCompanyName: string | null = activeCompanyMembership?.companyName || null

  /**
   * Billing Summary：
   * - “套餐”和“用量历史”共用一份摘要，避免重复请求；
   * - 当前只在这两个分区真正加载，减少无效 API 调用。
   */
  const billingSummaryQuery = useQuery({
    queryKey: ['settings', 'billing-summary', activeCompanyId],
    enabled: Boolean(activeCompanyId) && (activeSectionId === 'package' || activeSectionId === 'usage-history'),
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      return fetchBillingSummary({
        companyId: activeCompanyId,
      })
    },
    staleTime: 20_000,
  })

  /**
   * Stripe 官方账单列表：
   * - 只在“用量历史”页加载，避免套餐页无意义请求；
   * - 列表为空时不视为错误，说明当前公司还没有可导出的官方 invoice。
   */
  const billingInvoicesQuery = useQuery({
    queryKey: ['settings', 'billing-invoices', activeCompanyId],
    enabled: Boolean(activeCompanyId) && activeSectionId === 'usage-history',
    queryFn: async () => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      return fetchBillingInvoices({
        companyId: activeCompanyId,
      })
    },
    staleTime: 20_000,
  })

  const updateBillingUsagePolicyMutation = useMutation({
    mutationFn: updateBillingUsagePolicy,
  })

  const createBillingCheckoutSessionMutation = useMutation({
    mutationFn: createBillingCheckoutSession,
  })

  const createBillingPortalSessionMutation = useMutation({
    mutationFn: createBillingPortalSession,
  })

  /**
   * 切换侧边栏分区时，清理跨面板提示，避免旧消息残留误导。
   */
  useEffect(() => {
    setMemberActionMessage(null)
  }, [activeSectionId])

  /**
   * 公司切换后清理成员操作提示：
   * - 避免 A 公司操作结果误显示在 B 公司上下文里。
   */
  useEffect(() => {
    setMemberActionMessage(null)
  }, [activeCompanyId])

  /**
   * 刷新成员快照：
   * - 邀请/删除成功后主动失效缓存，确保列表、配额、角色权限实时同步。
   */
  const refreshMemberSnapshot = useCallback(async (): Promise<void> => {
    if (!activeCompanyId) {
      return
    }

    await queryClient.invalidateQueries({
      queryKey: ['settings', 'member-management', activeCompanyId],
    })
  }, [activeCompanyId, queryClient])

  /**
   * 邀请成员：
   * - 全量由服务端执行校验（角色、成员重复、Admin 配额、邀请邮件/登录链接投递）；
   * - 成功提示由成员面板内的绿色反馈承担，不再重复写入通用操作提示。
   */
  const handleInviteMember = useCallback(
    async (payload: { email: string; role: Exclude<MemberRole, 'owner'> }): Promise<string> => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      setMemberActionMessage(null)

      const inviteResult = await inviteMemberMutation.mutateAsync({
        companyId: activeCompanyId,
        email: payload.email,
        role: payload.role,
      })

      await refreshMemberSnapshot()
      return inviteResult.message
    },
    [activeCompanyId, inviteMemberMutation, refreshMemberSnapshot],
  )

  /**
   * 创建成员邀请链接：
   * - 与邮件邀请共用同一套权限/配额校验；
   * - 成功后刷新快照，确保 pending invitation 立即出现在列表里。
   */
  const handleCreateMemberInviteLink = useCallback(
    async (payload: { role: Exclude<MemberRole, 'owner'> }): Promise<{ message: string; inviteLink: string }> => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      setMemberActionMessage(null)

      const result = await createMemberInviteLinkMutation.mutateAsync({
        companyId: activeCompanyId,
        role: payload.role,
      })

      await refreshMemberSnapshot()
      return result
    },
    [activeCompanyId, createMemberInviteLinkMutation, refreshMemberSnapshot],
  )

  /**
   * 删除成员/取消邀请：
   * - 删除正式成员与取消待处理邀请都由同一服务端接口处理；
   * - 角色层级规则由服务端统一判定，避免前端绕过。
   */
  const handleRemoveMember = useCallback(
    (payload: { memberId: string; memberStatus: MemberStatus }): void => {
      if (!activeCompanyId) {
        setMemberActionMessage(m.settings_select_company_first())
        return
      }

      removeMemberMutation.mutate(
        {
          companyId: activeCompanyId,
          memberId: payload.memberId,
          memberStatus: payload.memberStatus,
        },
        {
          onSuccess: async (result) => {
            setMemberActionMessage(result.message)
            await refreshMemberSnapshot()
          },
          onError: (error) => {
            setMemberActionMessage(error instanceof Error ? error.message : m.settings_remove_member_error())
          },
        },
      )
    },
    [activeCompanyId, removeMemberMutation, refreshMemberSnapshot],
  )

  /**
   * 更新成员角色：
   * - active / invited 统一通过服务端接口处理；
   * - 成功后刷新快照，确保列表角色标签与权限限制立即同步。
   */
  const handleUpdateMemberRole = useCallback(
    async (payload: {
      memberId: string
      memberStatus: MemberStatus
      role: Exclude<MemberRole, 'owner'>
    }): Promise<string> => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      setMemberActionMessage(null)

      const result = await updateMemberRoleMutation.mutateAsync({
        companyId: activeCompanyId,
        memberId: payload.memberId,
        memberStatus: payload.memberStatus,
        role: payload.role,
      })

      await refreshMemberSnapshot()
      return result.message
    },
    [activeCompanyId, refreshMemberSnapshot, updateMemberRoleMutation],
  )

  /**
   * 绑定当前登录成员的 Telegram 账号。
   */
  const handleLinkTelegramAccount = useCallback(
    async (telegramAuth: TelegramWidgetAuthUser): Promise<string> => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      const linkResult = await linkTelegramMemberAccountMutation.mutateAsync({
        companyId: activeCompanyId,
        telegramAuth,
      })

      setMemberActionMessage(linkResult.message)
      await refreshMemberSnapshot()
      return linkResult.message
    },
    [activeCompanyId, linkTelegramMemberAccountMutation, refreshMemberSnapshot],
  )

  /**
   * 创建成员账号 OAuth 绑定链接：
   * - 返回第三方登录授权 URL；
   * - 前端跳转后由 callback 自动完成账号绑定落库。
   */
  const handleCreateMemberAccountOauthLinkUrl = useCallback(
    async (payload: {
      platform: OauthLinkPlatformType
    }): Promise<string> => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      const linkResult = await createMemberAccountOauthLinkUrlMutation.mutateAsync({
        companyId: activeCompanyId,
        platform: payload.platform,
      })

      return linkResult.authorizeUrl
    },
    [activeCompanyId, createMemberAccountOauthLinkUrlMutation],
  )

  /**
   * 解绑成员平台账号。
   */
  const handleUnlinkMemberAccount = useCallback(
    async (payload: { memberId: string; platform: MemberAccountPlatformType }): Promise<string> => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      const unlinkResult = await unlinkMemberAccountMutation.mutateAsync({
        companyId: activeCompanyId,
        memberId: payload.memberId,
        platform: payload.platform,
      })

      setMemberActionMessage(unlinkResult.message)
      await refreshMemberSnapshot()
      return unlinkResult.message
    },
    [activeCompanyId, refreshMemberSnapshot, unlinkMemberAccountMutation],
  )

  /**
   * 打开事件类型详情页：
   * - 路由采用 `/settings/event-settings/:typeKey`；
   * - 供“类型列表点击 / 新增类型成功后”复用。
   */
  const handleOpenEventTypeDetail = useCallback((typeKey: string): void => {
    const normalizedTypeKey = typeKey.trim()
    if (!normalizedTypeKey) {
      return
    }

    void navigate({
      to: '/settings/event-settings/$typeKey',
      params: { typeKey: normalizedTypeKey },
    })
  }, [navigate])

  /**
   * 返回事件类型列表页。
   */
  const handleBackToEventTypeList = useCallback((): void => {
    void navigate({
      to: '/settings/$tab',
      params: { tab: 'event-settings' },
    })
  }, [navigate])

  /**
   * Billing Summary 刷新：
   * - 统一在 checkout / portal / usage policy 成功后复用；
   * - 保证套餐面板和用量历史面板看到同一份最新数据。
   */
  const refreshBillingSummary = useCallback(async (): Promise<void> => {
    if (!activeCompanyId) {
      return
    }

    await queryClient.invalidateQueries({
      queryKey: ['settings', 'billing-summary', activeCompanyId],
    })
  }, [activeCompanyId, queryClient])

  /**
   * 发起试用 Checkout：
   * - 当前阶段只支持 free -> basic/pro；
   * - 服务端返回 Stripe Hosted Checkout URL 后直接跳转。
   */
  const handleStartBillingCheckout = useCallback(
    async (targetPlanCode: 'basic' | 'pro'): Promise<void> => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      const result = await createBillingCheckoutSessionMutation.mutateAsync({
        companyId: activeCompanyId,
        targetPlanCode,
        entryPoint: 'settings_billing',
      })

      window.location.assign(result.checkoutUrl)
    },
    [activeCompanyId, createBillingCheckoutSessionMutation],
  )

  /**
   * 打开 Stripe Customer Portal。
   */
  const handleOpenBillingPortal = useCallback(async (): Promise<void> => {
    if (!activeCompanyId) {
      throw new Error(m.settings_select_company_first())
    }

    const result = await createBillingPortalSessionMutation.mutateAsync({
      companyId: activeCompanyId,
    })

    window.location.assign(result.portalUrl)
  }, [activeCompanyId, createBillingPortalSessionMutation])

  /**
   * 更新 overage 策略：
   * - 页面只传入用户最新选择；
   * - 成功后主动刷新 summary，避免本地手写 optimistic merge。
   */
  const handleUpdateBillingUsagePolicy = useCallback(
    async (payload: {
      overageMode: 'stop_service' | 'auto_charge'
      overageSpendCapUsd: number | null
    }): Promise<void> => {
      if (!activeCompanyId) {
        throw new Error(m.settings_select_company_first())
      }

      await updateBillingUsagePolicyMutation.mutateAsync({
        companyId: activeCompanyId,
        overageMode: payload.overageMode,
        overageSpendCapUsd: payload.overageSpendCapUsd,
      })

      await refreshBillingSummary()
    },
    [activeCompanyId, refreshBillingSummary, updateBillingUsagePolicyMutation],
  )

  const isBillingMutating: boolean =
    updateBillingUsagePolicyMutation.isPending ||
    createBillingCheckoutSessionMutation.isPending ||
    createBillingPortalSessionMutation.isPending
  const platformAccountLinkingProps = {
    currentMember: currentActiveMember,
    isMemberLoading: memberSnapshotQuery.isLoading,
    memberLoadErrorMessage: memberSnapshotQuery.error ? memberSnapshotQuery.error.message : null,
    onLinkTelegramAccount: handleLinkTelegramAccount,
    onCreateOauthLinkUrl: handleCreateMemberAccountOauthLinkUrl,
    onUnlinkAccount: handleUnlinkMemberAccount,
  } satisfies Omit<PlatformAccountLinkingPanelProps, 'platform' | 'telegramConfig' | 'variant'>
  const navEntries = getNavEntries()
  const mobileNav = getMobileNavGroups(navEntries)

  return (
    <main className="min-h-[100dvh] w-full bg-[var(--dashboard-app-bg)] text-[var(--dashboard-text)] md:h-[100dvh] md:overflow-hidden">
      <div className="flex min-h-[100dvh] w-full flex-col md:h-full md:min-h-0 md:flex-row">
        {/* 桌面端让左侧导航停留在视口内，滚动只发生在右侧内容区。 */}
        <aside className="shrink-0 bg-[var(--dashboard-sidebar-bg)] px-3 py-3 md:sticky md:top-0 md:h-[100dvh] md:w-[248px] md:overflow-y-auto md:px-2">
          <div className="px-1 py-1 md:px-2 md:py-2">
            <Link
              to="/dashboard"
              className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-sm text-[var(--dashboard-sidebar-muted)] transition-colors hover:bg-[var(--dashboard-sidebar-item-hover)] hover:text-[var(--dashboard-sidebar-title)] md:h-8 md:px-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              {m.settings_back_to_app()}
            </Link>
          </div>

          <div className="px-1 pb-4 pt-3 md:px-2 md:pb-5 md:pt-2">
            <h1 className="px-2 pb-3 text-[28px] font-semibold leading-none text-[var(--dashboard-sidebar-title)] md:text-[20px]">
              {m.settings_title()}
            </h1>

            <div className="settings-mobile-nav md:hidden">
              <div className="rounded-2xl border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] p-2 shadow-[0_1px_4px_rgb(41_40_48_/_6%)]">
                <Link
                  to="/settings/$tab"
                  params={{ tab: mobileNav.primaryEntry.id }}
                  className={`flex min-h-11 w-full items-center rounded-xl px-4 text-sm font-medium transition-colors ${
                    activeSectionId === mobileNav.primaryEntry.id
                      ? 'bg-[var(--dashboard-sidebar-active-bg)] text-[var(--dashboard-sidebar-active-fg)]'
                      : 'bg-[var(--dashboard-action-tinted-bg)] text-[var(--dashboard-action-tinted-fg)] hover:bg-[var(--dashboard-action-tinted-hover-bg)]'
                  }`}
                >
                  {mobileNav.primaryEntry.label}
                </Link>
              </div>

              {mobileNav.groupedEntries.map((group, groupIndex) => (
                <div key={`${group.label || 'group'}-${groupIndex}`} className="space-y-2">
                  {group.label ? (
                    <p className="px-1 text-xs font-medium tracking-[0.01em] text-[var(--dashboard-sidebar-muted)]">
                      {group.label}
                    </p>
                  ) : null}

                  <div className="settings-mobile-chip-row">
                    {group.items.map((entry) => {
                      const isActive: boolean = activeSectionId === entry.id

                      return (
                        <Link
                          key={entry.id}
                          to="/settings/$tab"
                          params={{ tab: entry.id }}
                          className={`settings-mobile-chip ${
                            isActive
                              ? 'bg-[var(--dashboard-sidebar-active-bg)] text-[var(--dashboard-sidebar-active-fg)]'
                              : 'bg-[var(--dashboard-panel-bg)] text-[var(--dashboard-sidebar-text)]'
                          }`}
                        >
                          {entry.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto hidden w-full max-w-[232px] space-y-1 md:block">
              {navEntries.map((entry, index) => {
                if (entry.kind === 'label') {
                  return (
                    <p
                      key={`${entry.label}-${index}`}
                      className="px-2 pt-3 text-xs font-medium leading-6 text-[var(--dashboard-sidebar-muted)]"
                    >
                      {entry.label}
                    </p>
                  )
                }

                const isActive: boolean = activeSectionId === entry.id

                return (
                  <Link
                    key={entry.id}
                    to="/settings/$tab"
                    params={{ tab: entry.id }}
                    className={`flex h-8 w-full items-center rounded px-2 text-sm font-medium leading-6 transition-colors ${
                      isActive
                        ? 'bg-[var(--dashboard-sidebar-active-bg)] text-[var(--dashboard-sidebar-active-fg)]'
                        : 'text-[var(--dashboard-sidebar-text)] hover:bg-[var(--dashboard-action-tinted-bg)] hover:text-[var(--dashboard-action-tinted-fg)]'
                    }`}
                  >
                    {entry.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 md:h-[100dvh] md:overflow-y-auto">
          <div className="min-h-[65vh] w-full bg-[var(--dashboard-panel-bg)] px-4 py-5 md:min-h-full md:px-10 md:py-8 lg:px-[72px]">
            <div className="w-full space-y-4">
              {activeSectionId === 'telegram-settings' ? (
                <TelegramSettingsPanel />
              ) : null}

              {activeSectionId === 'workspace-integration' ? (
                <WorkspaceIntegrationPanel
                  activeCompanyId={activeCompanyId}
                  currentUserRole={currentUserRole}
                />
              ) : null}

              {activeSectionId === 'profile-settings' ? (
                <CompanyUserProfileForm
                  companyId={activeCompanyId}
                  variant="settings"
                  submitLabel={m.common_save()}
                  extraContent={
                    <ProfilePlatformAccountLinkingSection
                      companyId={activeCompanyId}
                      accountLinking={platformAccountLinkingProps}
                    />
                  }
                />
              ) : null}

              {activeSectionId === 'discord-integration' ? (
                <DiscordIntegrationPanel
                  activeCompanyId={activeCompanyId}
                  currentUserRole={currentUserRole}
                />
              ) : null}

              {activeSectionId === 'slack-integration' ? (
                <SlackIntegrationPanel
                  activeCompanyId={activeCompanyId}
                  currentUserRole={currentUserRole}
                />
              ) : null}

              {activeSectionId === 'feishu-integration' ? (
                <FeishuIntegrationPanel
                  activeCompanyId={activeCompanyId}
                  currentUserRole={currentUserRole}
                />
              ) : null}

              {activeSectionId === 'member-management' ? (
                <>
                  {!activeCompanyId ? (
                    <CompanySelectionPrompt message={m.settings_select_company_first()} />
                  ) : null}

                  {activeCompanyId && memberSnapshotQuery.isLoading ? <MemberManagementPanelSkeleton /> : null}

                  {activeCompanyId && memberSnapshotQuery.error ? (
                    <Card className="border-red-200 shadow-none">
                      <CardContent className="p-4 text-sm text-red-700">
                        {memberSnapshotQuery.error.message}
                      </CardContent>
                    </Card>
                  ) : null}

                  {activeCompanyId && !memberSnapshotQuery.isLoading && !memberSnapshotQuery.error ? (
                    <MemberManagementPanel
                      currentUserRole={currentUserRole}
                      members={members}
                      adminLimit={adminLimit}
                      memberActionMessage={memberActionMessage}
                      onRemoveMember={handleRemoveMember}
                      onInviteMember={handleInviteMember}
                      onCreateInviteLink={handleCreateMemberInviteLink}
                      onUpdateMemberRole={handleUpdateMemberRole}
                    />
                  ) : null}
                </>
              ) : null}

              {activeSectionId === 'event-settings' ? (
                <EventSettingsPanel
                  activeCompanyId={activeCompanyId}
                  currentUserRole={currentUserRole}
                  selectedTypeKey={activeEventTypeKey}
                  onOpenType={handleOpenEventTypeDetail}
                  onBackToList={handleBackToEventTypeList}
                />
              ) : null}

              {(activeSectionId === 'package' || activeSectionId === 'usage-history') && !activeCompanyId ? (
                <CompanySelectionPrompt message={m.settings_select_company_first()} />
              ) : null}

              {(activeSectionId === 'package' || activeSectionId === 'usage-history') &&
              activeCompanyId &&
              billingSummaryQuery.isLoading ? (
                activeSectionId === 'package' ? <BillingPlanPanelSkeleton /> : <BillingUsageHistoryPanelSkeleton />
              ) : null}

              {(activeSectionId === 'package' || activeSectionId === 'usage-history') &&
              activeCompanyId &&
              billingSummaryQuery.error ? (
                <Card className="border-red-200 shadow-none">
                  <CardContent className="p-4 text-sm text-red-700">
                    {billingSummaryQuery.error.message}
                  </CardContent>
                </Card>
              ) : null}

              {activeSectionId === 'package' &&
              activeCompanyId &&
              billingSummaryQuery.data &&
              !billingSummaryQuery.isLoading &&
              !billingSummaryQuery.error ? (
                <BillingPlanPanel
                  summary={billingSummaryQuery.data}
                  companyName={activeCompanyName}
                  isMutating={isBillingMutating}
                  onStartCheckout={handleStartBillingCheckout}
                  onOpenPortal={handleOpenBillingPortal}
                  onUpdateUsagePolicy={handleUpdateBillingUsagePolicy}
                />
              ) : null}

              {activeSectionId === 'usage-history' &&
              activeCompanyId &&
              billingSummaryQuery.data &&
              !billingSummaryQuery.isLoading &&
              !billingSummaryQuery.error ? (
                <BillingUsageHistoryPanel
                  invoiceErrorMessage={billingInvoicesQuery.error?.message || null}
                  invoices={billingInvoicesQuery.data || []}
                  isInvoicesLoading={billingInvoicesQuery.isLoading}
                  summary={billingSummaryQuery.data}
                />
              ) : null}

              {activeSectionId !== 'telegram-settings' &&
              activeSectionId !== 'workspace-integration' &&
              activeSectionId !== 'profile-settings' &&
              activeSectionId !== 'discord-integration' &&
              activeSectionId !== 'slack-integration' &&
              activeSectionId !== 'feishu-integration' &&
              activeSectionId !== 'member-management' &&
              activeSectionId !== 'event-settings' &&
              activeSectionId !== 'package' &&
              activeSectionId !== 'usage-history' ? (
                <Card className="border-zinc-200 shadow-none">
                  <CardContent className="flex min-h-[260px] items-center justify-center p-8 text-sm text-zinc-500">
                    {m.common_coming_soon()}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
