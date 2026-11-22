import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { OnboardingUserProfileSkeleton } from '@/components/onboarding/onboarding-step-skeleton'
import { CompanyUserProfileForm } from '@/components/profile/company-user-profile-form'
import { Button } from '@/components/ui/button'
import { requireAuthOrRedirect } from '@/lib/auth/guard'
import { activateSelectedCompanyContext } from '@/lib/company-selection-context'
import { setSelectedCompanyId, useSelectedCompanyId } from '@/lib/company-selection'
import {
  POST_ONBOARDING_COMPLETION_PATH,
  resolveActiveCompany,
} from '@/lib/services/auth-entry'
import {
  companyOnboardingKeys,
  getCurrentCompanyOnboardingProgress,
  markCurrentCompanyProfileStepCompleted,
} from '@/lib/services/company-onboarding-progress'
import {
  companyKeys,
  useCurrentUserCompanies,
} from '@/lib/services/company-membership-query'
import { m } from '@/paraglide/messages'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export const Route = createFileRoute('/onboarding/profile')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)
  },
  component: DashboardProfilePage,
})

function DashboardProfilePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const search = useSearch({ strict: false }) as {
    company_id?: string
  }
  const selectedCompanyId = useSelectedCompanyId()
  const {
    data: userCompanies = [],
    error: companiesError,
    isLoading: isLoadingCompanies,
    isFetching: isFetchingCompanies,
  } = useCurrentUserCompanies()
  const [isGateChecking, setIsGateChecking] = useState<boolean>(true)
  const [gateErrorMessage, setGateErrorMessage] = useState<string | null>(null)
  const requestedCompanyId = typeof search.company_id === 'string' ? search.company_id.trim() : ''

  /**
   * 统一得到当前生效公司：
   * - 优先复用当前显式选中的 company_id；
   * - 若当前是邀请流跳转，优先锁定 URL 里显式指定的 company_id；
   * - 若本地残留的 company_id 已失效，回退到第一家有效公司；
   * - 避免邀请接收后的短暂旧缓存，把表单写回到错误组织。
   */
  const activeCompany = useMemo(
    () =>
      resolveActiveCompany({
        userCompanies,
        selectedCompanyId: requestedCompanyId || selectedCompanyId,
      }),
    [requestedCompanyId, selectedCompanyId, userCompanies],
  )

  const activeCompanyId = activeCompany?.companyId || null
  const activeCompanyRole = activeCompany?.memberRole || null

  /**
   * 修正失效公司选择：
   * - onboarding 也必须和主应用保持同一公司上下文；
   * - 仅在公司列表完成刷新后才兜底回退，避免邀请流刚入组时被旧缓存误判为“无效 company”。
   */
  useEffect(() => {
    if (userCompanies.length === 0 || isLoadingCompanies || isFetchingCompanies) {
      return
    }

    const isRequestedCompanyValid = requestedCompanyId
      ? userCompanies.some((company) => company.companyId === requestedCompanyId)
      : false

    /**
     * 邀请流显式指定了 company_id 时，优先把全局选中组织回写成该值：
     * - 这样即便本地缓存里还残留旧组织，也不会把 onboarding 首屏拉回旧上下文；
     * - 只有当目标组织确实已经出现在成员列表里时才回写，避免临时无效值污染全局状态。
     */
    if (isRequestedCompanyValid && selectedCompanyId !== requestedCompanyId) {
      setSelectedCompanyId(requestedCompanyId)
      return
    }

    const isSelectedCompanyValid = selectedCompanyId
      ? userCompanies.some((company) => company.companyId === selectedCompanyId)
      : false

    if (!isSelectedCompanyValid) {
      setSelectedCompanyId(userCompanies[0].companyId)
    }
  }, [isFetchingCompanies, isLoadingCompanies, requestedCompanyId, selectedCompanyId, userCompanies])

  /**
   * onboarding 门禁：
   * - owner 必须先完成公司信息，才能继续填写个人资料；
   * - admin/member 受邀加入时允许直接补全个人资料。
   */
  useEffect(() => {
    if (companiesError) {
      setGateErrorMessage(companiesError.message)
      setIsGateChecking(false)
      return
    }

    if (!activeCompanyId) {
      if (!isLoadingCompanies && !isFetchingCompanies && userCompanies.length === 0) {
        void navigate({ to: '/onboarding/company-profile' })
      }
      return
    }

    let isActive = true

    const verifyOnboardingGate = async (): Promise<void> => {
      try {
        setIsGateChecking(true)
        setGateErrorMessage(null)

        const supabase = getSupabaseBrowserClient()
        const progress = await getCurrentCompanyOnboardingProgress(supabase, {
          companyId: activeCompanyId,
        })

        if (!isActive) {
          return
        }

        /**
         * 已完成 onboarding 的用户如果重新回到该页，直接进入 chat：
         * - 避免刷新 / 后退后又停留在 onboarding 表单；
         * - 也避免继续经由 `/dashboard` 被分流到 event 页。
         */
        if (progress?.status === 'completed') {
          void navigate({ to: POST_ONBOARDING_COMPLETION_PATH })
          return
        }

        const shouldBlockOwnerForIncompleteCompanyStep =
          activeCompanyRole === 'owner' &&
          (!progress || progress.currentStep < 2)

        if (shouldBlockOwnerForIncompleteCompanyStep) {
          void navigate({ to: '/onboarding/company-profile' })
          return
        }
      } catch (error) {
        if (!isActive) {
          return
        }

        const message =
          error instanceof Error ? error.message : m.onboarding_profile_gate_error()
        setGateErrorMessage(message)
      } finally {
        if (isActive) {
          setIsGateChecking(false)
        }
      }
    }

    void verifyOnboardingGate()

    return () => {
      isActive = false
    }
  }, [
    activeCompanyId,
    activeCompanyRole,
    companiesError,
    isFetchingCompanies,
    isLoadingCompanies,
    navigate,
    userCompanies.length,
  ])

  return (
    <main className="min-h-[100dvh] bg-[#F8FAFC] px-4 py-6 md:px-0 md:py-0">
      <div className="mx-auto flex w-full max-w-[520px] flex-col items-center pt-8 md:max-w-[460px] md:pt-[72px]">
        <div className="flex items-center gap-[6px]">
          <span className="h-[6px] w-[20px] rounded-[4px] bg-[#D1D5DB]" />
          <span className="h-[6px] w-[42px] rounded-[4px] bg-[#6466F1]" />
        </div>

        <section className="mt-6 w-full rounded-2xl bg-white px-6 pb-8 pt-8 shadow-[0_12px_36px_rgba(15,23,42,0.05)] md:mt-[30px] md:px-12 md:pb-10 md:pt-[50px]">
          {isGateChecking ? (
            <OnboardingUserProfileSkeleton />
          ) : gateErrorMessage ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-3">
              <p className="text-center text-[14px] font-medium text-[#DC2626]">{gateErrorMessage}</p>
              <Button
                type="button"
                variant="dashboardTinted"
                size="sm"
                className="w-full rounded-[8px] px-4 text-[13px] font-semibold sm:w-auto"
                onClick={() => {
                  window.location.reload()
                }}
              >
                {m.common_retry()}
              </Button>
            </div>
          ) : (
            <CompanyUserProfileForm
              companyId={activeCompanyId}
              variant="onboarding"
              submitLabel={m.common_next_step()}
              afterSave={async ({ companyId }) => {
                const supabase = getSupabaseBrowserClient()
                await markCurrentCompanyProfileStepCompleted(supabase, {
                  companyId,
                })

                /**
                 * 邀请流完成个人资料后，立即让两个关键缓存失效：
                 * - 公司 onboarding 进度：否则 dashboard 可能继续读到旧的 `null/in_progress`，把用户再次踢回 profile；
                 * - 当前用户公司列表：否则其它页面可能仍拿旧列表校验 selectedCompanyId，
                 *   误把刚加入的新组织判成“无效选择”，再回退到旧组织。
                 */
                await Promise.all([
                  queryClient.invalidateQueries({
                    queryKey: companyOnboardingKeys.currentCompany({ companyId }),
                  }),
                  queryClient.invalidateQueries({
                    queryKey: companyKeys.byCurrentUser(),
                  }),
                ])
              }}
              onSaved={() => {
                /**
                 * Onboarding 最后一跳显式进入 chat：
                 * - 不经过 `/dashboard`，避免被默认入口逻辑送去 event；
                 * - 这里是本需求的关键落点。
                 */
                if (activeCompanyId) {
                  /**
                   * 完成最后一步后，继续使用统一的组织上下文 helper：
                   * - 先把当前组织补进公司列表缓存，再广播 selected company_id；
                   * - 避免 Header / dashboard 在同一帧里先读到旧列表，把新组织又回滚成第一家公司。
                   */
                  activateSelectedCompanyContext({
                    companyId: activeCompanyId,
                    queryClient,
                    company: activeCompany,
                  })
                }

                void navigate({ to: POST_ONBOARDING_COMPLETION_PATH })
              }}
            />
          )}
        </section>
      </div>
    </main>
  )
}
