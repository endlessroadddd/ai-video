import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { OnboardingCompanyInfoSkeleton } from '@/components/onboarding/onboarding-step-skeleton'
import { Button } from '@/components/ui/button'
import { requireAuthOrRedirect } from '@/lib/auth/guard'
import { setSelectedCompanyId, useSelectedCompanyId } from '@/lib/company-selection'
import {
  createFirstCompanyForCurrentUser,
  getCompanyInfoById,
  updateCompanyInfoById,
} from '@/lib/services/company-info'
import {
  getCurrentCompanyOnboardingProgress,
  markCurrentCompanyInfoStepCompleted,
} from '@/lib/services/company-onboarding-progress'
import {
  POST_ONBOARDING_COMPLETION_PATH,
  resolveActiveCompany,
} from '@/lib/services/auth-entry'
import {
  companyKeys,
  useCurrentUserCompanies,
} from '@/lib/services/company-membership-query'
import { m } from '@/paraglide/messages'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export const Route = createFileRoute('/onboarding/company-profile')({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location)
  },
  component: DashboardCompanyProfilePage,
})

/**
 * 公司名称长度约束：
 * - 控制在合理范围，避免后续展示组件被超长文案撑坏；
 * - 与数据库 `varchar` 约束保持安全余量。
 */
const MIN_COMPANY_NAME_LENGTH = 2
const MAX_COMPANY_NAME_LENGTH = 64

function DashboardCompanyProfilePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const selectedCompanyId = useSelectedCompanyId()
  const {
    data: userCompanies = [],
    error: companiesError,
    isLoading: isLoadingCompanies,
  } = useCurrentUserCompanies()
  const [isInitializing, setIsInitializing] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [companyName, setCompanyName] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [pageErrorMessage, setPageErrorMessage] = useState<string | null>(null)
  const hasAnyCompany = userCompanies.length > 0

  /**
   * 生效公司 ID 解析策略：
   * - 仅当 selectedCompanyId 属于当前用户公司列表时才使用；
   * - 否则回退到第一家公司，规避“本地残留 companyId 导致 RLS 写入失败”。
   */
  const activeCompany = useMemo(
    () =>
      resolveActiveCompany({
        userCompanies,
        selectedCompanyId,
      }),
    [selectedCompanyId, userCompanies],
  )
  const activeCompanyId = activeCompany?.companyId || null
  const activeCompanyRole = activeCompany?.memberRole || null

  /**
   * 当本地缓存 companyId 无效时，自动回写为第一家可用公司，保持全局状态一致。
   */
  useEffect(() => {
    if (userCompanies.length === 0) {
      return
    }

    const isSelectedCompanyValid = selectedCompanyId
      ? userCompanies.some((company) => company.companyId === selectedCompanyId)
      : false

    if (!isSelectedCompanyValid) {
      setSelectedCompanyId(userCompanies[0].companyId)
    }
  }, [selectedCompanyId, userCompanies])

  /**
   * 页面初始化：
   * 1. 检查 onboarding 进度，避免已完成第 1 步用户回流；
   * 2. 加载公司信息回显到表单；
   * 3. 若进度已到后续步骤，直接按顺序跳转。
   */
  useEffect(() => {
    if (companiesError) {
      setPageErrorMessage(companiesError.message)
      setIsInitializing(false)
      return
    }

    if (!activeCompanyId) {
      if (!isLoadingCompanies) {
        /**
         * 新用户无公司时不报错：
         * - 直接进入“创建首个工作区”模式；
         * - 由当前页面完成公司创建并继续 onboarding。
         */
        setPageErrorMessage(null)
        setIsInitializing(false)
      }
      return
    }

    let isMounted = true

    const initializePage = async (): Promise<void> => {
      try {
        /**
         * 受邀成员（Admin/Member）不允许修改公司信息：
         * - 进入 onboarding 时直接跳到个人信息页；
         * - 公司信息步骤仅 owner 执行。
         */
        if (activeCompanyRole !== 'owner') {
          void navigate({ to: '/onboarding/profile' })
          return
        }

        const supabase = getSupabaseBrowserClient()
        const progress = await getCurrentCompanyOnboardingProgress(supabase, {
          companyId: activeCompanyId,
        })

        if (!isMounted) {
          return
        }

        /**
         * 已完成 onboarding 的用户不应再回流到事件默认页：
         * - 该场景通常来自刷新、后退或手动输入旧 onboarding 地址；
         * - 统一送到 chat，保持“首次完成 onboarding 后直接进入对话”的体验。
         */
        if (progress?.status === 'completed') {
          void navigate({ to: POST_ONBOARDING_COMPLETION_PATH })
          return
        }

        if (progress && progress.currentStep >= 2) {
          void navigate({ to: '/onboarding/profile' })
          return
        }

        const companyInfo = await getCompanyInfoById(supabase, {
          companyId: activeCompanyId,
        })

        if (!isMounted) {
          return
        }

        setCompanyName(companyInfo.companyName)
        setWebsite(companyInfo.website || '')
        setDescription(companyInfo.description || '')
        setPageErrorMessage(null)
      } catch (error) {
        if (!isMounted) {
          return
        }

        const message = error instanceof Error ? error.message : m.onboarding_company_load_error()
        setPageErrorMessage(message)
      } finally {
        if (isMounted) {
          setIsInitializing(false)
        }
      }
    }

    void initializePage()

    return () => {
      isMounted = false
    }
  }, [activeCompanyId, activeCompanyRole, companiesError, isLoadingCompanies, navigate])

  /**
   * 提交公司信息并推进 onboarding：
   * - 先写 `public.company`；
   * - 再把进度推进到第 2 步（个人信息）。
   */
  const handleSubmit = async (): Promise<void> => {
    const normalizedCompanyName = companyName.trim()
    const companyNameLength = Array.from(normalizedCompanyName).length
    if (companyNameLength < MIN_COMPANY_NAME_LENGTH || companyNameLength > MAX_COMPANY_NAME_LENGTH) {
      toast.error(
        m.onboarding_company_name_length_error({
          min: String(MIN_COMPANY_NAME_LENGTH),
          max: String(MAX_COMPANY_NAME_LENGTH),
        }),
      )
      return
    }

    setIsSaving(true)

    try {
      const supabase = getSupabaseBrowserClient()
      let companyIdForOnboarding = activeCompanyId

      /**
       * 无公司用户首次提交：
       * - 先创建公司与成员关系；
       * - 回写全局 company 选择，确保后续页面都使用新 company_id。
       */
      if (!companyIdForOnboarding) {
        const createResult = await createFirstCompanyForCurrentUser({
          companyInfo: {
            companyName: normalizedCompanyName,
            website,
            description,
          },
        })

        companyIdForOnboarding = createResult.companyId
        setSelectedCompanyId(createResult.companyId)

        /**
         * 立即刷新公司列表缓存，避免 Header 仍显示“无公司”。
         */
        await queryClient.invalidateQueries({
          queryKey: companyKeys.byCurrentUser(),
        })
      } else {
        await updateCompanyInfoById(supabase, {
          companyId: companyIdForOnboarding,
          companyInfo: {
            companyName: normalizedCompanyName,
            website,
            description,
          },
        })
      }

      if (!companyIdForOnboarding) {
        throw new Error(m.onboarding_company_init_error())
      }

      await markCurrentCompanyInfoStepCompleted(supabase, {
        companyId: companyIdForOnboarding,
      })

      toast.success(m.onboarding_company_saved())
      void navigate({ to: '/onboarding/profile' })
    } catch (error) {
      const message = error instanceof Error ? error.message : m.onboarding_company_save_error()
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="min-h-[100dvh] bg-[#F8FAFC] px-4 py-6 md:px-0 md:py-0">
      <div className="mx-auto flex w-full max-w-[520px] flex-col items-center pt-8 md:max-w-[460px] md:pt-[72px]">
        <div className="flex items-center gap-[6px]">
          <span className="h-[6px] w-[42px] rounded-[4px] bg-[#6466F1]" />
          <span className="h-[6px] w-[20px] rounded-[4px] bg-[#D1D5DB]" />
        </div>

        <section className="mt-6 w-full rounded-2xl bg-white px-6 pb-8 pt-8 shadow-[0_12px_36px_rgba(15,23,42,0.05)] md:mt-[30px] md:px-12 md:pb-10 md:pt-[50px]">
          {isInitializing ? (
            <OnboardingCompanyInfoSkeleton />
          ) : pageErrorMessage ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-3">
              <p className="text-center text-[14px] font-medium text-[#DC2626]">{pageErrorMessage}</p>
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
            <>
              <h1 className="text-center font-['PingFang_SC','PingFang SC',sans-serif] text-[28px] font-semibold leading-[1.4] tracking-[-0.28px] text-[#1E293B]">
                {hasAnyCompany
                  ? m.onboarding_company_setup_title()
                  : m.onboarding_company_welcome_title()}
              </h1>

              <p className="mt-2 text-center text-[14px] leading-[1.6] text-[#64748B]">
                {hasAnyCompany
                  ? m.onboarding_company_setup_subtitle()
                  : m.onboarding_company_welcome_subtitle()}
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="company-name"
                    className="mb-2 block font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-medium text-[#1E293B]"
                  >
                    {m.onboarding_company_name_label()}
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    value={companyName}
                    onChange={(event) => {
                      setCompanyName(event.target.value)
                    }}
                    placeholder={m.onboarding_company_name_placeholder()}
                    className="h-11 w-full rounded-[12px] border border-[#D1D5DB] bg-white px-4 text-[15px] text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#6466F1]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company-website"
                    className="mb-2 block font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-medium text-[#1E293B]"
                  >
                    {m.onboarding_company_website_label()}
                  </label>
                  <input
                    id="company-website"
                    type="text"
                    value={website}
                    onChange={(event) => {
                      setWebsite(event.target.value)
                    }}
                    placeholder={m.onboarding_company_website_placeholder()}
                    className="h-11 w-full rounded-[12px] border border-[#D1D5DB] bg-white px-4 text-[15px] text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#6466F1]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company-description"
                    className="mb-2 block font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-medium text-[#1E293B]"
                  >
                    {m.onboarding_company_description_label()}
                  </label>
                  <textarea
                    id="company-description"
                    rows={4}
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value)
                    }}
                    placeholder={m.onboarding_company_description_placeholder()}
                    className="w-full resize-none rounded-[12px] border border-[#D1D5DB] bg-white px-4 py-3 text-[15px] text-[#0F172A] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#6466F1]"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="dashboardPrimary"
                disabled={isSaving}
                className="mt-8 h-[56px] w-full rounded-[12px] text-[20px] font-semibold leading-none md:text-[24px]"
                onClick={() => {
                  void handleSubmit()
                }}
              >
                {isSaving ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : hasAnyCompany ? (
                  m.onboarding_company_submit_next()
                ) : (
                  m.onboarding_company_submit_create_continue()
                )}
              </Button>
            </>
          )}
        </section>
      </div>
    </main>
  )
}
