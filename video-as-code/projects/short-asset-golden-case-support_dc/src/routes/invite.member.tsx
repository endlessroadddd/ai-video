import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, Link2, Loader2, Shield, UserPlus } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { activateSelectedCompanyContext } from '@/lib/company-selection-context'
import { type UserCompany } from '@/lib/services/company-membership-query'
import {
  DEFAULT_AUTHENTICATED_PATH,
  ONBOARDING_PROFILE_PATH,
  resolveAuthenticatedEntryPath,
} from '@/lib/services/auth-entry'
import {
  acceptMemberInviteLink,
  fetchMemberInviteLinkPreview,
  type MemberInviteLinkPreview,
} from '@/lib/services/member-management-api'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

type InviteMemberSearch = {
  token?: string
}

export const Route = createFileRoute('/invite/member')({
  component: InviteMemberPage,
})

function getInviteRoleLabel(role: MemberInviteLinkPreview['role']): string {
  return role === 'admin' ? m.role_admin() : m.role_member()
}

function formatInviteExpiry(expiresAt: string): string {
  const parsedDate = new Date(expiresAt)
  if (Number.isNaN(parsedDate.getTime())) {
    return expiresAt
  }

  return parsedDate.toLocaleString(getLocale() === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function buildInviteRedirectPath(token: string): string {
  return `/invite/member?token=${encodeURIComponent(token)}`
}

/**
 * 邀请页骨架：
 * - 先稳定卡片布局；
 * - 让预览接口加载时也保持完整的视觉结构。
 */
function InviteMemberPageSkeleton() {
  return (
    <div className="w-full max-w-[760px]">
      <Card className="overflow-hidden border-[var(--dashboard-panel-border)] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
        <CardContent className="grid gap-0 p-0 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 p-6 md:p-8">
            <Skeleton className="dashboard-skeleton--base h-6 w-[96px] rounded-full" />
            <Skeleton className="dashboard-skeleton--strong h-10 w-[56%] rounded-[10px]" />
            <Skeleton className="dashboard-skeleton--soft h-4 w-[76%] rounded-[8px]" />
            <div className="grid gap-3 pt-2 md:grid-cols-2">
              <Skeleton className="dashboard-skeleton--soft h-[88px] rounded-[16px]" />
              <Skeleton className="dashboard-skeleton--soft h-[88px] rounded-[16px]" />
            </div>
          </div>

          <div className="space-y-4 border-t border-[var(--dashboard-panel-border)] bg-[var(--dashboard-soft-surface)] p-6 md:border-t-0 md:border-l md:p-8">
            <Skeleton className="dashboard-skeleton--base h-6 w-[44%] rounded-[8px]" />
            <Skeleton className="dashboard-skeleton--soft h-4 w-[84%] rounded-[8px]" />
            <Skeleton className="dashboard-skeleton--soft h-11 w-full rounded-[12px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InviteMemberPage() {
  const navigate = useNavigate()
  const search = useSearch({ strict: false }) as InviteMemberSearch
  const queryClient = useQueryClient()
  const token = typeof search.token === 'string' ? search.token.trim() : ''
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null)
  const [isResolvingEntry, setIsResolvingEntry] = useState<boolean>(false)
  const hasAutoAcceptedRef = useRef<boolean>(false)

  const inviteRedirectPath = useMemo(() => buildInviteRedirectPath(token), [token])

  const invitePreviewQuery = useQuery({
    queryKey: ['invite-link', 'preview', token],
    enabled: Boolean(token),
    queryFn: async () => fetchMemberInviteLinkPreview({ token }),
    staleTime: 10_000,
  })

  const acceptInviteMutation = useMutation({
    mutationFn: acceptMemberInviteLink,
  })

  const invitePreview = invitePreviewQuery.data || null
  const isCurrentUserAuthenticated = Boolean(invitePreview?.currentUserEmail)
  const isInviteExpired = invitePreview?.status === 'expired'
  const hasJoinedWorkspace = Boolean(invitePreview?.currentUserAlreadyMember) || Boolean(actionMessage)
  const isJoiningWorkspace =
    acceptInviteMutation.isPending || invitePreviewQuery.isRefetching || isResolvingEntry

  useEffect(() => {
    hasAutoAcceptedRef.current = false
    setActionMessage(null)
    setActionErrorMessage(null)
  }, [token])

  const handleOpenLogin = (): void => {
    if (!token || typeof window === 'undefined') {
      return
    }

    window.location.href = `/auth/login?redirect_to=${encodeURIComponent(inviteRedirectPath)}`
  }

  const handleOpenDashboard = (): void => {
    if (typeof window === 'undefined') {
      return
    }

    if (invitePreview && hasJoinedWorkspace) {
      void redirectToResolvedEntry(invitePreview.companyId)
      return
    }

    window.location.href = DEFAULT_AUTHENTICATED_PATH
  }

  /**
   * 将刚加入的组织补进前端缓存：
   * - onboarding/profile 首屏会先读 React Query 缓存；
   * - 不先补齐的话，多组织用户可能会先看到旧组织列表，并被错误回退到旧 company_id。
   */
  const syncJoinedCompanyContext = (preview: MemberInviteLinkPreview, companyId: string): void => {
    const nextCompany: UserCompany = {
      companyId,
      companyName: preview.companyName,
      logoUrl: null,
      memberRole: preview.role,
    }

    activateSelectedCompanyContext({
      companyId,
      queryClient,
      company: nextCompany,
    })
  }

  /**
   * 以指定组织为准重新计算入口：
   * - 已经是该组织成员时，可能需要回到 profile onboarding，也可能可以直接进 dashboard；
   * - 统一覆盖 selectedCompanyId，避免“打开工作区”又跳回旧组织。
   */
  const redirectToResolvedEntry = async (companyId: string): Promise<void> => {
    setIsResolvingEntry(true)

    /**
     * 重新进入已加入组织时也要先同步前端上下文：
     * - 当前页可能仍带着旧组织的 React Query 内存态；
     * - 若不先补齐再导航，后续 onboarding/profile 会把目标组织误判为“无效 company_id”。
     */
    if (invitePreview?.companyId === companyId) {
      syncJoinedCompanyContext(invitePreview, companyId)
    } else {
      activateSelectedCompanyContext({
        companyId,
        queryClient,
      })
    }

    try {
      const supabase = getSupabaseBrowserClient()
      const resolution = await resolveAuthenticatedEntryPath(supabase, {
        preferredPath: DEFAULT_AUTHENTICATED_PATH,
        selectedCompanyId: companyId,
      })

      if (resolution.companyId && invitePreview?.companyId === resolution.companyId) {
        syncJoinedCompanyContext(invitePreview, resolution.companyId)
      } else if (resolution.companyId) {
        activateSelectedCompanyContext({
          companyId: resolution.companyId,
          queryClient,
        })
      }

      /**
       * 这里必须保留 SPA 内存态：
       * - 接受邀请后我们会先把新公司补进 React Query 缓存；
       * - 若使用 `window.location.replace` 做整页刷新，这份缓存会立刻丢失；
       * - 多组织用户随后进入 onboarding/profile 时，就可能再次回退到旧 company_id。
       */
      await navigate({
        href: resolution.targetPath,
        replace: true,
      })
      return
    } catch (error) {
      console.warn(
        '[invite.member] 加入组织后的落点解析失败，回退到 dashboard：',
        error instanceof Error ? error.message : 'unknown error',
      )
    }

    await navigate({
      href: DEFAULT_AUTHENTICATED_PATH,
      replace: true,
    })
  }

  const handleAcceptInvite = async (): Promise<void> => {
    if (!token) {
      return
    }

    setActionErrorMessage(null)

    try {
      const result = await acceptInviteMutation.mutateAsync({ token })

      if (invitePreview) {
        syncJoinedCompanyContext(invitePreview, result.companyId)
      } else {
        activateSelectedCompanyContext({
          companyId: result.companyId,
          queryClient,
        })
      }

      /**
       * 新加入组织后，当前账号必然还没完成该组织的个人资料：
       * - 直接进入 profile onboarding，避免再次走一轮通用落点解析；
       * - 这样可以稳定命中“设置用户信息”步骤，不会回退到旧组织。
       */
      setActionMessage(result.message)
      setIsResolvingEntry(true)
      await navigate({
        href: `${ONBOARDING_PROFILE_PATH}?company_id=${encodeURIComponent(result.companyId)}`,
        replace: true,
      })
    } catch (error) {
      setActionErrorMessage(error instanceof Error ? error.message : m.member_invite_accept_error())
    }
  }

  /**
   * 自动入组：
   * - 用户通过邀请链接完成登录后，页面不再多一步人工确认；
   * - 只要链接仍有效且当前账号尚未入组，就自动调用接受接口。
   */
  useEffect(() => {
    if (!token || !invitePreview || !isCurrentUserAuthenticated || isInviteExpired || invitePreview.currentUserAlreadyMember) {
      return
    }

    if (hasAutoAcceptedRef.current || acceptInviteMutation.isPending) {
      return
    }

    hasAutoAcceptedRef.current = true
    void handleAcceptInvite()
  }, [
    acceptInviteMutation.isPending,
    invitePreview,
    isCurrentUserAuthenticated,
    isInviteExpired,
    token,
  ])

  const mainCardClassName =
    'overflow-hidden border-[var(--dashboard-panel-border)] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]'

  if (!token) {
    return (
      <main className="min-h-[100dvh] bg-[linear-gradient(180deg,var(--dashboard-page-bg),var(--dashboard-app-bg))] px-4 py-6 md:px-6 md:py-10">
        <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[960px] items-center justify-center">
          <Card className={`${mainCardClassName} w-full max-w-[520px]`}>
            <CardContent className="space-y-4 p-6 text-center md:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--dashboard-action-tinted-bg)] text-[var(--dashboard-action-tinted-fg)]">
                <Link2 className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--dashboard-title-text)]">
                  {m.member_invite_invalid_title()}
                </h1>
                <p className="text-sm leading-[1.7] text-[var(--dashboard-text-muted)]">
                  {m.member_invite_invalid_desc()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[100dvh] bg-[linear-gradient(180deg,var(--dashboard-page-bg),var(--dashboard-app-bg))] px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[960px] items-center justify-center">
        {invitePreviewQuery.isLoading ? (
          <InviteMemberPageSkeleton />
        ) : invitePreviewQuery.error || !invitePreview ? (
          <Card className={`${mainCardClassName} w-full max-w-[520px]`}>
            <CardContent className="space-y-4 p-6 text-center md:p-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--dashboard-action-tinted-bg)] text-[var(--dashboard-action-tinted-fg)]">
                <Link2 className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--dashboard-title-text)]">
                  {m.member_invite_invalid_title()}
                </h1>
                <p className="text-sm leading-[1.7] text-[var(--dashboard-text-muted)]">
                  {invitePreviewQuery.error?.message || m.member_invite_invalid_desc()}
                </p>
              </div>
              <Button
                type="button"
                variant="dashboardTinted"
                onClick={() => {
                  void invitePreviewQuery.refetch()
                }}
              >
                {m.common_retry()}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="w-full max-w-[760px]">
            <Card className={mainCardClassName}>
              <CardContent className="grid gap-0 p-0 xl:grid-cols-[1.2fr_0.8fr]">
                <section className="space-y-6 p-6 md:p-8">
                  <div className="inline-flex items-center rounded-full border border-[var(--dashboard-action-tinted-border)] bg-[var(--dashboard-action-tinted-bg)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--dashboard-action-tinted-fg)]">
                    {m.member_invite_badge()}
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--dashboard-title-text)]">
                      {invitePreview.companyName}
                    </h1>
                    <p className="max-w-[520px] text-sm leading-[1.8] text-[var(--dashboard-text-muted)]">
                      {m.member_invite_summary({
                        role: getInviteRoleLabel(invitePreview.role),
                      })}
                    </p>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-[18px] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-soft-surface)] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--dashboard-text-muted)]">
                        {m.member_invite_role_label()}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-[var(--dashboard-title-text)]">
                        <Shield className="h-4 w-4 text-[var(--dashboard-action-tinted-fg)]" />
                        <span className="text-base font-semibold">{getInviteRoleLabel(invitePreview.role)}</span>
                      </div>
                    </div>

                    <div className="rounded-[18px] border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-soft-surface)] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--dashboard-text-muted)]">
                        {m.member_invite_expiry_label()}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-[var(--dashboard-title-text)]">
                        <Link2 className="h-4 w-4 text-[var(--dashboard-action-tinted-fg)]" />
                        <span className="text-base font-semibold">{formatInviteExpiry(invitePreview.expiresAt)}</span>
                      </div>
                    </div>
                  </div>

                  {actionMessage ? (
                    <p className="rounded-xl border border-[var(--dashboard-badge-success-border)] bg-[var(--dashboard-badge-success-bg)] px-4 py-3 text-sm text-[var(--dashboard-badge-success-text)]">
                      {actionMessage}
                    </p>
                  ) : null}

                  {actionErrorMessage ? (
                    <p className="rounded-xl border border-[var(--dashboard-danger-border)] bg-[var(--dashboard-danger-bg)] px-4 py-3 text-sm text-[var(--dashboard-danger-text)]">
                      {actionErrorMessage}
                    </p>
                  ) : null}
                </section>

                <aside className="space-y-4 border-t border-[var(--dashboard-panel-border)] bg-[var(--dashboard-soft-surface)] p-6 xl:border-l xl:border-t-0 xl:p-8">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--dashboard-text-muted)]">
                      {m.member_invite_status_label()}
                    </p>
                    <h2 className="text-xl font-semibold text-[var(--dashboard-title-text)]">
                      {hasJoinedWorkspace
                        ? m.member_invite_joined_title()
                        : isInviteExpired
                          ? m.member_invite_expired_title()
                          : isCurrentUserAuthenticated
                            ? m.member_invite_ready_title()
                            : m.member_invite_login_title()}
                    </h2>
                    <p className="text-sm leading-[1.8] text-[var(--dashboard-text-muted)]">
                      {hasJoinedWorkspace
                        ? m.member_invite_joined_desc()
                        : isInviteExpired
                          ? m.member_invite_expired_desc()
                          : isCurrentUserAuthenticated
                            ? m.member_invite_ready_desc()
                            : m.member_invite_login_desc()}
                    </p>
                  </div>

                  {hasJoinedWorkspace ? (
                    <>
                      <div className="flex items-center gap-2 rounded-[16px] border border-[var(--dashboard-badge-success-border)] bg-[var(--dashboard-badge-success-bg)] px-4 py-3 text-sm text-[var(--dashboard-badge-success-text)]">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        {m.member_invite_joined_badge()}
                      </div>
                      <Button type="button" variant="dashboardPrimary" className="w-full" onClick={handleOpenDashboard}>
                        {m.member_invite_open_workspace()}
                      </Button>
                    </>
                  ) : isInviteExpired ? (
                    <Button type="button" variant="dashboardTinted" className="w-full" onClick={handleOpenDashboard}>
                      {m.member_invite_back_dashboard()}
                    </Button>
                  ) : isCurrentUserAuthenticated ? (
                    <>
                      <div className="rounded-[16px] border border-[var(--dashboard-panel-border)] bg-white px-4 py-3 text-sm text-[var(--dashboard-title-text)]">
                        {invitePreview.currentUserEmail}
                      </div>
                      <Button
                        type="button"
                        variant="dashboardPrimary"
                        className="w-full"
                        disabled={isJoiningWorkspace}
                        onClick={() => {
                          void handleAcceptInvite()
                        }}
                      >
                        {isJoiningWorkspace ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {m.member_invite_accepting()}
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4" />
                            {m.member_invite_accept_action()}
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      variant="dashboardPrimary"
                      className="w-full"
                      onClick={handleOpenLogin}
                    >
                      {m.member_invite_login_action()}
                    </Button>
                  )}
                </aside>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
