import {
  Bell,
  Check,
  ChevronDown,
  ClipboardList,
  Download,
  FileText,
  Languages,
  Lightbulb,
  Loader2,
  LogIn,
  LogOut,
  Menu,
  MessageCircleMore,
  MessagesSquare,
  Settings,
  Settings2,
  Users,
} from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { activateSelectedCompanyContext } from '@/lib/company-selection-context'
import { setSelectedCompanyId, useSelectedCompanyId } from '@/lib/company-selection'
import { m } from '@/paraglide/messages'
import { getLocale, setLocale } from '@/paraglide/runtime'
import { useCurrentUserCompanies, type UserCompany } from '@/lib/services/company-membership-query'
import {
  COMPANY_USER_PROFILE_CACHE_UPDATED_EVENT,
  getCurrentCompanyUserProfile,
  readCachedCompanyUserProfile,
  type CompanyUserProfileCacheEventDetail,
} from '@/lib/services/user-profile'
import { DEFAULT_SETTINGS_SECTION_ID } from '@/lib/settings/constants'
import { useAssistTaskEventCount } from '@/lib/services/agent-event-query'
import { usePwaInstallPrompt } from '@/lib/pwa'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { useViewportProfile } from '@/lib/use-viewport-profile'
import { cn } from '@/lib/utils'

function getSidebarActionItems() {
  return [
    {
      key: 'notification',
      icon: Bell,
      label: m.header_action_notifications(),
      badge: 3,
    },
    {
      key: 'files',
      icon: FileText,
      label: m.header_action_files(),
    },
    {
      key: 'menu',
      icon: Menu,
      label: m.header_action_menu(),
    },
  ]
}

type DashboardSidebarItem = {
  id: 'conversation' | 'assist-tasks' | 'knowledge-base' | 'user-list'
  to?: string
  badge?: string
  icon: React.ComponentType<{ className?: string }>
}

/**
 * Dashboard 主导航当前只保留 4 个核心入口：
 * - 对话 / 协助任务 保留原有工作台路由；
 * - 知识库继续复用现有 dashboard 路由；
 * - 用户列表保留独立页面入口。
 */
const DASHBOARD_ITEMS: DashboardSidebarItem[] = [
  { id: 'conversation', to: '/chat', icon: MessagesSquare },
  { id: 'assist-tasks', to: '/dashboard/event', icon: ClipboardList },
  { id: 'knowledge-base', to: '/dashboard/knowledge-base', icon: Lightbulb },
  { id: 'user-list', to: '/dashboard/user-list', icon: Users },
]

const DASHBOARD_SIDEBAR_WIDTH_EXPANDED = '256px'
const DASHBOARD_SIDEBAR_WIDTH_COLLAPSED = '72px'
const USER_EMAIL_CACHE_KEY = 'dashboard-auth-user-email:v1'

/**
 * 读取用户邮箱缓存：
 * - 用于页面刷新后的首帧回显，避免菜单区域先空白/转圈。
 */
function readCachedUserEmail(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const rawValue = window.localStorage.getItem(USER_EMAIL_CACHE_KEY)
    if (!rawValue) {
      return null
    }

    const parsedValue = JSON.parse(rawValue) as { email?: unknown }
    return typeof parsedValue.email === 'string' && parsedValue.email.trim() ? parsedValue.email : null
  } catch {
    return null
  }
}

/**
 * 写入用户邮箱缓存：
 * - 仅缓存展示信息，不存储敏感 token。
 */
function writeCachedUserEmail(email: string): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(USER_EMAIL_CACHE_KEY, JSON.stringify({ email }))
  } catch {
    // 缓存失败时忽略，避免影响主登录流程
  }
}

/**
 * 清理用户邮箱缓存：
 * - 在登出或鉴权失败场景调用，避免旧账号信息残留。
 */
function clearCachedUserEmail(): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(USER_EMAIL_CACHE_KEY)
}

function getSidebarItemLabel(itemId: DashboardSidebarItem['id']): string {
  if (itemId === 'conversation') return m.sidebar_item_conversation()
  if (itemId === 'assist-tasks') return m.sidebar_item_assist_tasks()
  if (itemId === 'knowledge-base') return m.sidebar_item_knowledge_base()
  if (itemId === 'user-list') return m.sidebar_item_user_list()
  const exhaustiveCheck: never = itemId
  return exhaustiveCheck
}

function getCurrentDashboardSectionTitle(pathname: string): string {
  if (pathname === '/chat' || pathname.startsWith('/chat/')) {
    return m.sidebar_item_conversation()
  }

  if (
    pathname === '/dashboard' ||
    pathname === '/dashboard/' ||
    pathname === '/dashboard/event' ||
    pathname.startsWith('/dashboard/event/')
  ) {
    return m.sidebar_item_assist_tasks()
  }

  if (pathname.startsWith('/dashboard/knowledge-base')) {
    return m.sidebar_item_knowledge_base()
  }

  if (pathname.startsWith('/dashboard/user-list')) {
    return m.sidebar_item_user_list()
  }

  return m.sidebar_item_conversation()
}

function DashboardSidebar(props: {
  pathname: string
  userEmail: string | null
  userInitials: string
  isLoadingAuth: boolean
  isSigningOut: boolean
  onSignOut: () => Promise<void>
  isPwaInstallVisible: boolean
  isInstallingPwa: boolean
  onInstallPwa: () => Promise<void>
}) {
  const {
    pathname,
    userEmail,
    userInitials,
    isLoadingAuth,
    isSigningOut,
    onSignOut,
    isPwaInstallVisible,
    isInstallingPwa,
    onInstallPwa,
  } = props
  const viewportProfile = useViewportProfile()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [companyProfileDisplayName, setCompanyProfileDisplayName] = useState<string>('')
  const [companyProfileAvatarUrl, setCompanyProfileAvatarUrl] = useState<string | null>(null)
  const [isCompanyProfileResolved, setIsCompanyProfileResolved] = useState<boolean>(false)
  const companyMenuRef = useRef<HTMLDivElement | null>(null)
  const queryClient = useQueryClient()
  const selectedCompanyId = useSelectedCompanyId()
  const {
    data: userCompanies = [],
    isLoading: isLoadingCompanies,
    isFetching: isFetchingCompanies,
  } = useCurrentUserCompanies()

  const currentCompany = useMemo<UserCompany | null>(() => {
    if (userCompanies.length === 0) {
      return null
    }

    if (!selectedCompanyId) {
      return userCompanies[0]
    }

    return userCompanies.find((company) => company.companyId === selectedCompanyId) || userCompanies[0]
  }, [selectedCompanyId, userCompanies])

  const assistTaskEventCountQuery = useAssistTaskEventCount(
    {
      companyId: currentCompany?.companyId || '',
    },
    {
      enabled: Boolean(currentCompany?.companyId),
    },
  )

  /**
   * 协助任务角标：
   * - 显示当前公司在 `lucius_agent.event` 中待处理/处理中事件总量；
   * - 数量为 0 时不展示，避免与当前 Figma 导航样式冲突。
   */
  const assistTaskBadge = useMemo<string | undefined>(() => {
    if (!currentCompany?.companyId) {
      return undefined
    }

    const totalCount = assistTaskEventCountQuery.data ?? 0
    if (totalCount <= 0) {
      return undefined
    }

    return String(totalCount)
  }, [assistTaskEventCountQuery.data, currentCompany?.companyId])
  const installLabel = m.pwa_install_app()
  const installIcon = isInstallingPwa ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />
  const currentSectionTitle = getCurrentDashboardSectionTitle(pathname)
  const effectiveCollapsed = !viewportProfile.isPhone && (viewportProfile.isTablet || isCollapsed)

  useEffect(() => {
    /**
     * 仅在公司列表稳定后才兜底回退：
     * - 邀请入组、首个组织创建、账号切换后，列表会经历一次短暂刷新；
     * - 如果在刷新过程中立刻校验 selectedCompanyId，容易把“刚写进去的新组织”误判为无效，
     *   然后被强制回退到第一家公司。
     */
    if (isLoadingCompanies || isFetchingCompanies || userCompanies.length === 0) {
      return
    }

    const selectedExists = selectedCompanyId ? userCompanies.some((company) => company.companyId === selectedCompanyId) : false

    if (!selectedExists) {
      setSelectedCompanyId(userCompanies[0].companyId)
    }
  }, [isFetchingCompanies, isLoadingCompanies, selectedCompanyId, userCompanies])

  useEffect(() => {
    if (!isCompanyMenuOpen || viewportProfile.isPhone) {
      return
    }

    const handlePointerDown = (event: MouseEvent): void => {
      const target = event.target as Node
      if (!companyMenuRef.current?.contains(target)) {
        setIsCompanyMenuOpen(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
    }
  }, [isCompanyMenuOpen, viewportProfile.isPhone])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const storedCollapsedState = window.localStorage.getItem('dashboard-sidebar-collapsed')
    if (storedCollapsedState === null) {
      setIsCollapsed(window.innerWidth < 1280)
      return
    }

    setIsCollapsed(storedCollapsedState === '1')
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const nextSidebarWidth = viewportProfile.isPhone
      ? '0px'
      : effectiveCollapsed
        ? DASHBOARD_SIDEBAR_WIDTH_COLLAPSED
        : DASHBOARD_SIDEBAR_WIDTH_EXPANDED

    document.documentElement.style.setProperty('--dashboard-sidebar-width', nextSidebarWidth)
  }, [effectiveCollapsed, viewportProfile.isPhone])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const onToggle = (): void => {
      if (viewportProfile.isPhone) {
        return
      }

      setIsCollapsed((previousValue) => {
        const nextValue = !previousValue
        window.localStorage.setItem('dashboard-sidebar-collapsed', nextValue ? '1' : '0')
        return nextValue
      })
    }

    window.addEventListener('dashboard-sidebar-toggle', onToggle)

    return () => {
      window.removeEventListener('dashboard-sidebar-toggle', onToggle)
    }
  }, [viewportProfile.isPhone])

  useEffect(() => {
    setIsCompanyMenuOpen(false)
    setIsMobileMenuOpen(false)
  }, [pathname])

  /**
   * 语言切换文案：
   * - 菜单里展示“将要切换到”的目标语言，符合产品中“English”按钮语义。
   */
  const currentLocale = getLocale()
  const targetLocale = currentLocale === 'zh' ? 'en' : 'zh'
  const targetLocaleLabel = targetLocale === 'en' ? m.language_en() : m.language_zh()
  const loginActionLabel = m.header_email_login()
  const companyIdForProfile = currentCompany?.companyId || null

  /**
   * 读取当前公司下的用户资料：
   * - 昵称：用于菜单头部第一行；
   * - 头像：用于底部入口与菜单头部头像展示。
   */
  useEffect(() => {
    if (!userEmail || !companyIdForProfile) {
      setCompanyProfileDisplayName('')
      setCompanyProfileAvatarUrl(null)
      setIsCompanyProfileResolved(false)
      return
    }

    let isMounted = true
    const cachedProfile = readCachedCompanyUserProfile({
      companyId: companyIdForProfile,
      userEmail,
    })

    if (cachedProfile) {
      setCompanyProfileDisplayName(cachedProfile.displayName)
      setCompanyProfileAvatarUrl(cachedProfile.avatarUrl)
      setIsCompanyProfileResolved(true)
    } else {
      setCompanyProfileDisplayName('')
      setCompanyProfileAvatarUrl(null)
      setIsCompanyProfileResolved(false)
    }

    const syncCompanyProfile = async (): Promise<void> => {
      try {
        const supabase = getSupabaseBrowserClient()
        const { profile } = await getCurrentCompanyUserProfile(supabase, {
          companyId: companyIdForProfile,
        })

        if (!isMounted) {
          return
        }

        setCompanyProfileDisplayName(profile.displayName.trim())
        setCompanyProfileAvatarUrl(profile.avatarUrl)
        setIsCompanyProfileResolved(true)
      } catch {
        if (!isMounted) {
          return
        }

        /**
         * 请求失败也标记为“已解析”：
         * - 避免 UI 一直停留在占位状态；
         * - 后续会按既有兜底逻辑（邮箱前缀/字母头像）展示。
         */
        setIsCompanyProfileResolved(true)
      }
    }

    void syncCompanyProfile()

    return () => {
      isMounted = false
    }
  }, [companyIdForProfile, userEmail])

  /**
   * 监听资料缓存事件：
   * - 设置页保存后，会通过事件把最新昵称/头像推到侧边栏；
   * - 避免同标签页中“保存后还要刷新才更新”的体验。
   */
  useEffect(() => {
    if (!userEmail || !companyIdForProfile) {
      return
    }

    const normalizedCurrentEmail = userEmail.trim().toLowerCase()

    const handleProfileCacheUpdated = (event: Event): void => {
      const customEvent = event as CustomEvent<CompanyUserProfileCacheEventDetail>
      const detail = customEvent.detail
      if (!detail) {
        return
      }

      if (detail.companyId !== companyIdForProfile) {
        return
      }

      if (detail.userEmail !== normalizedCurrentEmail) {
        return
      }

      setCompanyProfileDisplayName(detail.profile.displayName)
      setCompanyProfileAvatarUrl(detail.profile.avatarUrl)
      setIsCompanyProfileResolved(true)
    }

    window.addEventListener(COMPANY_USER_PROFILE_CACHE_UPDATED_EVENT, handleProfileCacheUpdated as EventListener)

    return () => {
      window.removeEventListener(COMPANY_USER_PROFILE_CACHE_UPDATED_EVENT, handleProfileCacheUpdated as EventListener)
    }
  }, [companyIdForProfile, userEmail])

  /**
   * 菜单主显示名：
   * - 优先公司下昵称；
   * - 无昵称回退邮箱前缀；
   * - 最后回退“未登录”文案。
   */
  const menuPrimaryName = useMemo(() => {
    if (companyProfileDisplayName) {
      return companyProfileDisplayName
    }

    if (userEmail) {
      const emailPrefix = userEmail.split('@')[0]
      return emailPrefix || userEmail
    }

    return m.sidebar_not_logged_in()
  }, [companyProfileDisplayName, userEmail])

  /**
   * 用户资料占位态：
   * - 仅在“已登录 + 有公司 + 资料尚未解析完成”时启用；
   * - 该状态下不展示默认邮箱前缀和首字母头像，避免刷新闪动。
   */
  const showProfilePlaceholder = Boolean(userEmail && companyIdForProfile && !isCompanyProfileResolved)
  const currentCompanyInitial = currentCompany?.companyName.slice(0, 1).toUpperCase() || 'D'

  /**
   * 公司切换入口在折叠/展开态都必须可点击：
   * - 避免折叠后顶部只剩一个静态头像，导致无法再切换公司；
   * - 菜单面板继续复用同一套状态与关闭逻辑，减少两套分支行为漂移。
   */
  const renderCompanyMenuPanel = (): React.ReactNode => {
    if (!isCompanyMenuOpen) {
      return null
    }

    return (
      <div className="absolute left-0 top-[52px] z-50 w-[240px] rounded-[8px] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-sidebar-company-menu-bg)] p-1 shadow-[0px_8px_16px_0px_rgba(30,41,59,0.14)]">
        {userCompanies.map((company) => {
          const isActive = company.companyId === currentCompany?.companyId
	          return (
	            <button
	              key={company.companyId}
              type="button"
              className={`flex h-11 w-full items-center justify-between rounded-[6px] px-3 transition-colors ${
                isActive ? 'bg-[var(--dashboard-sidebar-company-active-bg)]' : 'hover:bg-[var(--dashboard-sidebar-item-hover)]'
              }`}
	              onClick={() => {
	                /**
	                 * 手动切组织时也统一走上下文同步 helper：
	                 * - 先把目标公司写回前端组织上下文；
	                 * - 再关闭菜单，避免页面其它模块继续沿用旧 company_id。
	                 */
	                activateSelectedCompanyContext({
	                  companyId: company.companyId,
	                  queryClient,
	                  company,
	                })
	                setIsCompanyMenuOpen(false)
	              }}
	            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--dashboard-panel-bg)] text-[13px] text-[var(--dashboard-sidebar-text)]">
                  {company.companyName.slice(0, 1).toUpperCase()}
                </div>
                <span className="text-[14px] text-[var(--dashboard-sidebar-title)]">{company.companyName}</span>
              </div>
              {isActive ? <Check className="h-4 w-4 text-[var(--dashboard-sidebar-title)]" /> : null}
            </button>
          )
        })}
      </div>
    )
  }

  const isDashboardItemActive = (itemId: DashboardSidebarItem['id']): boolean => {
    if (itemId === 'conversation') {
      return pathname === '/chat' || pathname.startsWith('/chat/')
    }

    if (itemId === 'assist-tasks') {
      return (
        pathname === '/dashboard' ||
        pathname === '/dashboard/' ||
        pathname === '/dashboard/event' ||
        pathname.startsWith('/dashboard/event/')
      )
    }

    if (itemId === 'knowledge-base') {
      return pathname.startsWith('/dashboard/knowledge-base')
    }

    return pathname.startsWith('/dashboard/user-list')
  }

  if (viewportProfile.isPhone) {
    return (
      <>
        <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--dashboard-panel-border)] bg-[var(--dashboard-sidebar-bg)] pt-[env(safe-area-inset-top,0px)]">
          <div className="flex h-[var(--app-header-height)] items-center justify-between gap-3 px-[var(--page-gutter)]">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium text-[var(--dashboard-sidebar-muted)]">
                {currentCompany?.companyName || (isLoadingCompanies ? '...' : m.sidebar_company_not_found())}
              </p>
              <p className="truncate text-[16px] font-semibold text-[var(--dashboard-sidebar-title)]">
                {currentSectionTitle}
              </p>
            </div>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="rounded-[12px] text-[var(--dashboard-sidebar-title)]"
              aria-label={m.header_action_menu()}
              title={m.header_action_menu()}
              onClick={() => {
                setIsMobileMenuOpen(true)
              }}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--dashboard-panel-border)] bg-[var(--dashboard-sidebar-bg)] pb-[var(--bottom-safe-area)]">
          <div className="grid h-16 grid-cols-4 gap-1 px-2 pt-1">
            {DASHBOARD_ITEMS.map((item) => {
              if (!item.to) {
                return null
              }

              const Icon = item.icon
              const itemLabel = getSidebarItemLabel(item.id)
              const isItemActive = isDashboardItemActive(item.id)

              return (
                <Link
                  key={item.id}
                  to={item.to}
                  title={itemLabel}
                  className={cn(
                    'flex min-w-0 flex-col items-center justify-center gap-1 rounded-[12px] px-2 py-2 text-[11px] font-medium transition-colors',
                    isItemActive
                      ? 'bg-[var(--dashboard-sidebar-company-active-bg)] text-[var(--dashboard-sidebar-active-bg)]'
                      : 'text-[var(--dashboard-sidebar-text)] hover:bg-[var(--dashboard-sidebar-item-hover)]',
                  )}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  <span className="truncate">{itemLabel}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <DialogContent
            responsiveMode="sheet"
            className="gap-0 border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] px-0 pb-[calc(1rem+var(--bottom-safe-area))] pt-0"
          >
            <DialogHeader className="border-b border-[var(--dashboard-panel-border)] px-4 py-4 text-left">
              <DialogTitle>{m.header_action_menu()}</DialogTitle>
            </DialogHeader>

            <div className="max-h-[70dvh] overflow-y-auto px-4 py-4">
              <div className="rounded-[16px] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-soft-surface)] p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 shrink-0">
                    {companyProfileAvatarUrl ? <AvatarImage src={companyProfileAvatarUrl} alt={m.header_user_avatar_alt()} /> : null}
                    <AvatarFallback className="bg-[var(--dashboard-sidebar-active-bg)] text-[14px] font-semibold text-[var(--dashboard-sidebar-active-fg)]">
                      {showProfilePlaceholder ? '' : userInitials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-[var(--dashboard-sidebar-title)]">
                      {showProfilePlaceholder ? m.sidebar_not_logged_in() : menuPrimaryName}
                    </p>
                    <p className="truncate text-[12px] text-[var(--dashboard-sidebar-muted)]">
                      {userEmail || m.sidebar_not_logged_in()}
                    </p>
                  </div>
                </div>
              </div>

              {isPwaInstallVisible ? (
                <Button
                  type="button"
                  variant="dashboardTinted"
                  className="pwa-install-entry mt-3 w-full justify-start gap-2"
                  aria-label={installLabel}
                  title={installLabel}
                  onClick={() => {
                    void onInstallPwa()
                  }}
                  disabled={isInstallingPwa}
                >
                  {installIcon}
                  <span>{installLabel}</span>
                </Button>
              ) : null}

              <section className="mt-5">
                <p className="mb-2 text-[12px] font-semibold text-[var(--dashboard-sidebar-muted)]">
                  {m.sidebar_select_company()}
                </p>

                <div className="space-y-2">
                  {userCompanies.map((company) => {
                    const isActive = company.companyId === currentCompany?.companyId

                    return (
                      <button
                        key={company.companyId}
                        type="button"
                        className={cn(
                          'flex w-full items-center justify-between rounded-[14px] border px-4 py-3 text-left transition-colors',
                          isActive
                            ? 'border-[var(--dashboard-action-tinted-border)] bg-[var(--dashboard-sidebar-company-active-bg)]'
                            : 'border-[var(--dashboard-panel-border)] bg-white',
                        )}
	                        onClick={() => {
	                          /**
	                           * 移动端组织切换与桌面端保持同一入口：
	                           * - 避免两套分支各自维护，出现“桌面能切、移动端不能切”的漂移。
	                           */
	                          activateSelectedCompanyContext({
	                            companyId: company.companyId,
	                            queryClient,
	                            company,
	                          })
	                          setIsMobileMenuOpen(false)
	                        }}
	                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--dashboard-sidebar-active-bg)] text-[13px] font-semibold text-[var(--dashboard-sidebar-active-fg)]">
                            {company.companyName.slice(0, 1).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-[14px] font-semibold text-[var(--dashboard-sidebar-title)]">
                              {company.companyName}
                            </p>
                            <p className="text-[12px] text-[var(--dashboard-sidebar-muted)]">
                              {company.memberRole}
                            </p>
                          </div>
                        </div>
                        {isActive ? <Check className="h-4 w-4 text-[var(--dashboard-sidebar-active-bg)]" /> : null}
                      </button>
                    )
                  })}
                </div>
              </section>

              <div className="mt-5 space-y-2">
                <Link
                  to="/settings/$tab"
                  params={{ tab: DEFAULT_SETTINGS_SECTION_ID }}
                  className="flex h-[var(--button-height-default)] w-full items-center gap-3 rounded-[14px] border border-[var(--dashboard-panel-border)] bg-white px-4 text-[14px] font-medium text-[var(--dashboard-sidebar-title)]"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Settings className="h-4 w-4" />
                  {m.sidebar_settings()}
                </Link>

                <button
                  type="button"
                  className="flex h-[var(--button-height-default)] w-full items-center gap-3 rounded-[14px] border border-[var(--dashboard-panel-border)] bg-white px-4 text-[14px] font-medium text-[var(--dashboard-sidebar-title)]"
                  onClick={() => {
                    setLocale(targetLocale)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Languages className="h-4 w-4" />
                  {targetLocaleLabel}
                </button>

                {userEmail ? (
                  <button
                    type="button"
                    disabled={isSigningOut}
                    className="flex h-[var(--button-height-default)] w-full items-center gap-3 rounded-[14px] border border-[var(--dashboard-panel-border)] bg-white px-4 text-[14px] font-medium text-[var(--dashboard-sidebar-title)]"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      void onSignOut()
                    }}
                  >
                    {isSigningOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                    {m.sidebar_sign_out()}
                  </button>
                ) : (
                  <Link
                    to="/auth/login"
                    className="flex h-[var(--button-height-default)] w-full items-center gap-3 rounded-[14px] border border-[var(--dashboard-panel-border)] bg-white px-4 text-[14px] font-medium text-[var(--dashboard-sidebar-title)]"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <LogIn className="h-4 w-4" />
                    {loginActionLabel}
                  </Link>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <aside
      className={`dashboard-global-recording-camera fixed inset-y-0 left-0 z-30 bg-[var(--dashboard-sidebar-bg)] px-2 py-3 ${
        effectiveCollapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-7">
          <div className={`flex h-12 items-center px-2 ${effectiveCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div ref={companyMenuRef} className={effectiveCollapsed ? 'relative' : 'relative w-full'}>
              {effectiveCollapsed ? (
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--dashboard-sidebar-active-bg)] text-[14px] font-medium text-[var(--dashboard-sidebar-active-fg)] transition-opacity hover:opacity-90"
                  onClick={() => {
                    setIsCompanyMenuOpen((previousValue) => !previousValue)
                  }}
                  aria-label={m.sidebar_select_company()}
                  title={currentCompany?.companyName || m.sidebar_select_company()}
                >
                  {currentCompanyInitial}
                </button>
              ) : (
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-between rounded-[6px] px-1 transition-colors hover:bg-[var(--dashboard-sidebar-item-hover)]"
                  onClick={() => {
                    setIsCompanyMenuOpen((previousValue) => !previousValue)
                  }}
                  aria-label={m.sidebar_select_company()}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--dashboard-sidebar-active-bg)] text-[14px] font-medium text-[var(--dashboard-sidebar-active-fg)]">
                      {currentCompanyInitial}
                    </div>
                    <div className="text-left">
                      <p className="text-[14px] font-semibold text-[var(--dashboard-sidebar-title)]">
                        {currentCompany?.companyName || (isLoadingCompanies ? '...' : m.sidebar_company_not_found())}
                      </p>
                      <p className="text-[12px] text-[var(--dashboard-sidebar-muted)]">
                        {m.sidebar_servers_count({
                          count: String(userCompanies.length),
                        })}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-[var(--dashboard-sidebar-muted)]" />
                </button>
              )}

              {renderCompanyMenuPanel()}
            </div>
          </div>

          <nav aria-label={m.header_action_menu()} className="flex flex-col gap-2">
            {DASHBOARD_ITEMS.map((item) => {
              const isItemActive = isDashboardItemActive(item.id)
              const Icon = item.icon
              const itemLabel = getSidebarItemLabel(item.id)
              const itemBadge = item.id === 'assist-tasks' ? assistTaskBadge : item.badge
              const classes = `flex h-9 items-center rounded-[6px] px-3 text-[14px] font-medium leading-[1.6] tracking-[-0.28px] transition-colors ${
                isItemActive
                  ? 'bg-[var(--dashboard-sidebar-active-bg)] text-[var(--dashboard-sidebar-active-fg)]'
                  : 'text-[var(--dashboard-sidebar-text)] hover:bg-[var(--dashboard-sidebar-item-hover)]'
              } ${effectiveCollapsed ? 'justify-center' : 'justify-between'}`

              const itemContent = effectiveCollapsed ? (
                <Icon className="h-[18px] w-[18px]" />
              ) : (
                <>
                  <div className="flex min-w-0 items-center gap-2">
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    <span className="truncate">{itemLabel}</span>
                  </div>
                  {itemBadge ? <span className="ml-2 text-[12px] leading-none">{itemBadge}</span> : null}
                </>
              )

              if (!item.to) {
                return null
              }

              return (
                <Link key={item.id} to={item.to} className={classes} title={itemLabel}>
                  {itemContent}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex flex-col px-2 pb-1">
          {isPwaInstallVisible ? (
            effectiveCollapsed ? (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="pwa-install-entry mb-2 h-9 w-9 self-center rounded-[8px] text-[var(--dashboard-text-muted)] hover:bg-[var(--dashboard-row-hover-bg)] hover:text-[var(--dashboard-title-text)]"
                aria-label={installLabel}
                title={installLabel}
                onClick={() => {
                  void onInstallPwa()
                }}
                disabled={isInstallingPwa}
              >
                {installIcon}
              </Button>
            ) : (
              <Button
                type="button"
                variant="dashboardTinted"
                className="pwa-install-entry mb-2 h-9 w-full justify-start gap-2 px-3 text-[13px]"
                aria-label={installLabel}
                title={installLabel}
                onClick={() => {
                  void onInstallPwa()
                }}
                disabled={isInstallingPwa}
              >
                {installIcon}
                <span>{installLabel}</span>
              </Button>
            )
          ) : null}
          {isLoadingAuth ? (
            <div className={`mt-2 flex h-10 items-center ${effectiveCollapsed ? 'justify-center' : 'gap-2 px-2'}`}>
              <Skeleton className="dashboard-skeleton--strong h-8 w-8 shrink-0 rounded-full" />
              {!effectiveCollapsed ? (
                <div className="min-w-0 flex-1 space-y-1">
                  <Skeleton className="dashboard-skeleton--base h-[12px] w-[84px] rounded" />
                  <Skeleton className="dashboard-skeleton--soft h-[10px] w-[116px] rounded" />
                </div>
              ) : null}
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`mt-2 flex w-full items-center rounded-[8px] px-2 py-2 transition-colors hover:bg-[var(--dashboard-sidebar-item-hover)] ${
                    effectiveCollapsed ? 'justify-center' : 'gap-2'
                  }`}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    {companyProfileAvatarUrl ? <AvatarImage src={companyProfileAvatarUrl} alt={m.header_user_avatar_alt()} /> : null}
                    <AvatarFallback className="bg-[var(--dashboard-sidebar-active-bg)] text-[12px] font-semibold text-[var(--dashboard-sidebar-active-fg)]">
                      {showProfilePlaceholder ? '' : userInitials}
                    </AvatarFallback>
                  </Avatar>
                  {!effectiveCollapsed ? (
                    <div className="min-w-0 flex-1 text-left">
                      {showProfilePlaceholder ? (
                        <div className="space-y-1 py-[1px]">
                          <div className="dashboard-skeleton dashboard-skeleton--strong h-[12px] w-[96px] rounded" />
                          <div className="dashboard-skeleton dashboard-skeleton--soft h-[10px] w-[132px] rounded" />
                        </div>
                      ) : (
                        <>
                          <p className="truncate text-[13px] font-semibold text-[var(--dashboard-sidebar-title)]" title={menuPrimaryName}>
                            {menuPrimaryName}
                          </p>
                          <p className="truncate text-[12px] text-[var(--dashboard-sidebar-muted)]" title={userEmail || ''}>
                            {userEmail || m.sidebar_not_logged_in()}
                          </p>
                        </>
                      )}
                    </div>
                  ) : null}
                  {!effectiveCollapsed ? <ChevronDown className="h-4 w-4 text-[var(--dashboard-sidebar-muted)]" /> : null}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align={effectiveCollapsed ? 'center' : 'start'}
                className="w-[260px] rounded-[12px] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] p-1 shadow-[0px_10px_24px_0px_rgba(30,41,59,0.16)]"
              >
                <DropdownMenuLabel className="px-2 py-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 shrink-0">
                      {companyProfileAvatarUrl ? <AvatarImage src={companyProfileAvatarUrl} alt={m.header_user_avatar_alt()} /> : null}
                      <AvatarFallback className="bg-[var(--dashboard-sidebar-active-bg)] text-[12px] font-semibold text-[var(--dashboard-sidebar-active-fg)]">
                        {showProfilePlaceholder ? '' : userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      {showProfilePlaceholder ? (
                        <div className="space-y-1 py-[1px]">
                          <div className="dashboard-skeleton dashboard-skeleton--strong h-[12px] w-[96px] rounded" />
                          <div className="dashboard-skeleton dashboard-skeleton--soft h-[10px] w-[132px] rounded" />
                        </div>
                      ) : (
                        <>
                          <p className="truncate text-[13px] font-semibold text-[var(--dashboard-sidebar-title)]">{menuPrimaryName}</p>
                          <p className="truncate text-[12px] text-[var(--dashboard-sidebar-muted)]">
                            {userEmail || m.sidebar_not_logged_in()}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    setLocale(targetLocale)
                  }}
                  className="h-9 rounded-[8px] px-2 text-[14px] text-[var(--dashboard-sidebar-title)]"
                >
                  <Languages className="h-4 w-4" />
                  {targetLocaleLabel}
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="h-9 rounded-[8px] px-2 text-[14px] text-[var(--dashboard-sidebar-title)]">
                  <Link to="/settings/$tab" params={{ tab: DEFAULT_SETTINGS_SECTION_ID }}>
                    <Settings className="h-4 w-4" />
                    {m.sidebar_settings()}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {userEmail ? (
                  <DropdownMenuItem
                    onClick={() => {
                      void onSignOut()
                    }}
                    disabled={isSigningOut}
                    className="h-9 rounded-[8px] px-2 text-[14px] text-[var(--dashboard-sidebar-title)]"
                  >
                    {isSigningOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                    {m.sidebar_sign_out()}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild className="h-9 rounded-[8px] px-2 text-[14px] text-[var(--dashboard-sidebar-title)]">
                    <Link to="/auth/login">
                      <LogIn className="h-4 w-4" />
                      {loginActionLabel}
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </aside>
  )
}

export default function Header() {
  const pathname = useRouterState({
    /**
     * 使用 resolvedLocation 保证 Header 与“已提交页面”同步：
     * - 避免导航 pending 阶段 location 已变化，但页面内容仍是旧页面时出现闪动。
     */
    select: (state) => state.resolvedLocation?.pathname ?? state.location.pathname,
  })

  /**
   * SSR Hydration 一致性：
   * - 首帧统一使用 `userEmail=null + isLoadingAuth=true`；
   * - 避免服务端首帧（无 localStorage）与客户端首帧（有 localStorage）渲染分支不一致，
   *   从而触发 "Hydration failed"。
   */
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const pwaInstallPrompt = usePwaInstallPrompt()

  /**
   * Onboarding 全屏页：
   * - onboarding 三个步骤需要沉浸式流程，不显示左侧 Sidebar；
   * - 避免与主工作台导航混在一起影响引导完成率。
   */
  const isAuthRoute = pathname.startsWith('/auth/')
  const isInviteRoute = pathname.startsWith('/invite/')
  const isOnboardingFullscreenRoute = pathname.startsWith('/onboarding/')
  const isSettingsFullscreenRoute = pathname === '/settings' || pathname.startsWith('/settings/')
  const shouldHideHeader =
    isAuthRoute ||
    isInviteRoute ||
    isOnboardingFullscreenRoute ||
    isSettingsFullscreenRoute

  const isDashboardRoute =
    pathname === '/dashboard' || pathname.startsWith('/dashboard/') || pathname === '/chat' || pathname.startsWith('/chat/')
  const sidebarActionItems = getSidebarActionItems()

  const userInitials = useMemo(() => {
    if (!userEmail) {
      return 'JD'
    }

    const normalized = userEmail.trim()
    if (!normalized) {
      return 'JD'
    }

    return normalized.slice(0, 2).toUpperCase()
  }, [userEmail])

  useEffect(() => {
    let isMounted = true
    const supabase = getSupabaseBrowserClient()

    /**
     * 客户端挂载后再读取邮箱缓存：
     * - 只用于首屏体验优化；
     * - 放在 effect 内可保证不影响 SSR/CSR 首次对齐。
     */
    const cachedEmail = readCachedUserEmail()
    if (cachedEmail) {
      setUserEmail(cachedEmail)
      setIsLoadingAuth(false)
    }

    const syncCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (!isMounted) {
        return
      }

      if (error || !data.user) {
        setUserEmail(null)
        clearCachedUserEmail()
        setIsLoadingAuth(false)
        return
      }

      const email = data.user.email || null
      setUserEmail(email)
      if (email) {
        writeCachedUserEmail(email)
      } else {
        clearCachedUserEmail()
      }
      setIsLoadingAuth(false)
    }

    syncCurrentUser()

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return
      }

      const nextEmail = session?.user?.email || null
      setUserEmail(nextEmail)
      if (nextEmail) {
        writeCachedUserEmail(nextEmail)
      } else {
        clearCachedUserEmail()
      }
      setIsLoadingAuth(false)
    })

    return () => {
      isMounted = false
      data.subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    setIsSigningOut(true)

    try {
      const supabase = getSupabaseBrowserClient()
      await supabase.auth.signOut()
      clearCachedUserEmail()
      window.location.href = '/auth/login'
    } finally {
      setIsSigningOut(false)
    }
  }

  /**
   * 注意：
   * - `Header` 必须先执行完所有 hooks，再根据路由决定渲染；
   * - 避免“条件早返回”导致 hooks 数量在路由切换时不一致。
   */
  if (shouldHideHeader) {
    return null
  }

  if (isDashboardRoute) {
    return (
      <DashboardSidebar
        pathname={pathname}
        userEmail={userEmail}
        userInitials={userInitials}
        isLoadingAuth={isLoadingAuth}
        isSigningOut={isSigningOut}
        onSignOut={handleSignOut}
        isPwaInstallVisible={pwaInstallPrompt.isVisible}
        isInstallingPwa={pwaInstallPrompt.isInstalling}
        onInstallPwa={pwaInstallPrompt.install}
      />
    )
  }

  const installLabel = m.pwa_install_app()
  const installIcon = pwaInstallPrompt.isInstalling ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-[76px] border-r border-border bg-sidebar">
      <div className="flex h-full flex-col items-center justify-between py-6">
        <div className="flex w-full flex-col items-center gap-3">
          <Button
            size="icon"
            variant="outline"
            className="h-11 w-11 rounded-xl border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
            aria-label={m.header_brand()}
          >
            <MessageCircleMore className="h-5 w-5 text-foreground" />
          </Button>

          <div className="mt-1 flex w-full flex-col items-center gap-3">
            {sidebarActionItems.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.key} className="relative">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-accent"
                    aria-label={item.label}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                  {item.badge ? (
                    <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-2">
          {pwaInstallPrompt.isVisible ? (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="pwa-install-entry h-9 w-9 rounded-lg text-muted-foreground hover:bg-accent"
              aria-label={installLabel}
              title={installLabel}
              onClick={() => {
                void pwaInstallPrompt.install()
              }}
              disabled={pwaInstallPrompt.isInstalling}
            >
              {installIcon}
            </Button>
          ) : null}
          {isLoadingAuth ? (
            <>
              <Skeleton className="dashboard-skeleton--strong h-9 w-9 rounded-lg" />
              <Skeleton className="dashboard-skeleton--soft h-3 w-[52px] rounded-[4px]" />
            </>
          ) : userEmail ? (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-accent"
                aria-label={m.sidebar_sign_out()}
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                {isSigningOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
              </Button>

              <p className="w-[62px] truncate text-center text-[10px] leading-4 text-muted-foreground" title={userEmail}>
                {userEmail}
              </p>
            </>
          ) : (
            <Link to="/auth/login" className="inline-flex">
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-accent"
                aria-label={m.header_email_login()}
              >
                <LogIn className="h-4 w-4" />
              </Button>
            </Link>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-lg text-muted-foreground hover:bg-accent"
            aria-label={m.header_settings()}
          >
            <Settings2 className="h-4 w-4" />
          </Button>

          <div
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            title={userEmail || m.sidebar_not_logged_in()}
          >
            {userInitials}
          </div>
        </div>
      </div>
    </aside>
  )
}
