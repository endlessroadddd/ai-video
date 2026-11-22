import { createFileRoute, useSearch } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Loader2, Mail } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { toast } from 'sonner'

import { redirectIfAuthenticated } from '@/lib/auth/guard'
import { buildAuthCallbackUrl, buildCanonicalAppUrl } from '@/lib/public-app-url'
import { DEFAULT_AUTHENTICATED_PATH } from '@/lib/services/auth-entry'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/auth/login')({
  beforeLoad: async () => {
    await redirectIfAuthenticated()
  },
  component: AuthLoginPage,
})

type AuthLoginSearch = {
  redirect_to?: string
  error?: string
  message?: string
}

type LoginStep = 'select-method' | 'email-input' | 'email-sent'
type OAuthProvider = 'google' | 'github'

type LoginOptionButtonProps = {
  icon: ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
}

/**
 * Google 图标：
 * 使用标准的多色 G 矢量图，保证与常见 Google 登录按钮视觉一致。
 */
function GoogleBrandIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M17.64 9.2045C17.64 8.5663 17.5827 7.9527 17.4764 7.3636H9V10.8455H13.8436C13.635 11.9705 13.0009 12.9237 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.2045Z"
        fill="#4285F4"
      />
      <path
        d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.6568 14.4205 4.6718 12.8386 3.9636 10.7114H0.9573V13.0441C2.4382 15.9832 5.4818 18 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.9636 10.7114C3.7836 10.1714 3.68 9.5945 3.68 9C3.68 8.4055 3.7836 7.8286 3.9636 7.2886V4.9559H0.9573C0.3477 6.1718 0 7.5491 0 9C0 10.4509 0.3477 11.8282 0.9573 13.0441L3.9636 10.7114Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.5795C10.3214 3.5795 11.5077 4.0336 12.4405 4.9245L15.0218 2.3432C13.4632 0.8923 11.43 0 9 0C5.4818 0 2.4382 2.0168 0.9573 4.9559L3.9636 7.2886C4.6718 5.1614 6.6568 3.5795 9 3.5795Z"
        fill="#EA4335"
      />
    </svg>
  )
}

function GithubBrandIcon() {
  /**
   * GitHub 品牌实心图标（Octocat）：
   * 使用实心版是为了和 Google 品牌图标在视觉重量上更一致，避免线框图标看起来过小。
   */
  return (
    <svg
      className="h-[18px] w-[18px] text-[#0F172A]"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.084 3.292 9.397 7.863 10.919.575.105.787-.25.787-.554 0-.273-.01-1-.016-1.962-3.199.696-3.874-1.542-3.874-1.542-.523-1.329-1.277-1.683-1.277-1.683-1.044-.714.079-.699.079-.699 1.154.082 1.761 1.186 1.761 1.186 1.026 1.758 2.692 1.251 3.348.957.104-.743.401-1.251.729-1.538-2.553-.29-5.238-1.276-5.238-5.679 0-1.255.448-2.282 1.183-3.086-.118-.29-.513-1.459.112-3.043 0 0 .965-.309 3.163 1.179a10.99 10.99 0 0 1 2.88-.387c.977.005 1.962.132 2.88.387 2.198-1.488 3.161-1.179 3.161-1.179.626 1.584.232 2.753.114 3.043.737.804 1.182 1.831 1.182 3.086 0 4.414-2.689 5.386-5.25 5.671.412.354.779 1.055.779 2.127 0 1.536-.014 2.774-.014 3.151 0 .307.208.664.792.552C20.211 21.394 23.5 17.082 23.5 12 23.5 5.648 18.352.5 12 .5Z" />
    </svg>
  )
}

/**
 * 登录入口按钮：
   * 统一三个入口（Google / GitHub / Email）的结构，保证样式和交互完全一致。
 */
function LoginOptionButton(props: LoginOptionButtonProps) {
  const { icon, label, onClick, disabled = false, isLoading = false } = props

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      /**
       * 使用固定三列网格：
       * - 第一列固定 20px 图标槽，保证三个按钮图标占位一致；
       * - 第二列文字自适应；
       * - 第三列固定箭头槽，保证右侧箭头对齐。
       */
      className="grid h-12 w-full grid-cols-[20px_1fr_16px] items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-5 transition-colors hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="flex h-5 w-5 items-center justify-center">
        {isLoading ? <Loader2 className="h-[18px] w-[18px] animate-spin text-[#1E293B]" /> : icon}
      </span>

      <span className="justify-self-start font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-semibold leading-none text-[#1E293B]">
        {label}
      </span>

      <span className="flex h-[16px] w-[16px] items-center justify-end">
        <ChevronRight className="h-[14px] w-[14px] text-[#1E293B]" />
      </span>
    </button>
  )
}

type EmailFlowCardProps = {
  backLabel: string
  onBack: () => void
  children: ReactNode
}

/**
 * 邮箱流程卡片容器：
 * - 对齐 Figma 的固定卡片宽高和头部结构（Logo / 标题 / 分割线）；
 * - 统一“返回”交互入口，避免两个页面手写重复布局导致细节漂移。
 */
function EmailFlowCard(props: EmailFlowCardProps) {
  const { backLabel, onBack, children } = props

  return (
    <section className="mx-auto mt-2 w-full max-w-[460px] rounded-[24px] border border-[#EEF2F6] bg-white px-6 pb-8 pt-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:mt-4 sm:px-8 md:mt-16 md:px-12 md:pb-10 md:pt-12">
      <div className="mx-auto h-[50px] w-[145px]" data-node-id="70:27930">
        <img
          src="/figma-auth/lucius-logo-mark-invert.png"
          alt={m.app_logo_alt()}
          className="h-full w-full object-contain [filter:brightness(0)_saturate(100%)]"
          draggable={false}
        />
      </div>

      <h1 className="mt-6 text-center font-['Outfit','PingFang_SC','PingFang SC',sans-serif] text-[28px] font-medium leading-[1.4] tracking-[-0.32px] text-black md:text-[32px] md:leading-[1.6]">
        {m.auth_login_title()}
      </h1>

      <button
        type="button"
        className="mt-6 inline-flex items-center gap-1 text-[#6B7280]"
        onClick={onBack}
        aria-label={backLabel}
      >
        <ChevronLeft className="h-[12px] w-[12px]" />
        <span className="font-['PingFang_SC','PingFang SC',sans-serif] text-[12px] font-medium leading-[1.6]">
          {backLabel}
        </span>
      </button>

      {children}
    </section>
  )
}

function AuthLoginPage() {
  const search = useSearch({ strict: false }) as AuthLoginSearch
  const [loginStep, setLoginStep] = useState<LoginStep>('select-method')
  const [email, setEmail] = useState<string>('')
  const [sentEmail, setSentEmail] = useState<string>('')
  const [resendCountdown, setResendCountdown] = useState<number>(0)
  const [oauthLoadingProvider, setOauthLoadingProvider] = useState<OAuthProvider | null>(null)
  const [isEmailSubmitting, setIsEmailSubmitting] = useState<boolean>(false)

  /**
   * 认证成功后的跳转路径：
   * - 优先使用 `redirect_to`
   * - 仅允许站内路径，避免开放重定向问题
   */
  const redirectTo = useMemo((): string => {
    const value = search.redirect_to
    if (typeof value === 'string' && value.startsWith('/')) {
      return value
    }

    return DEFAULT_AUTHENTICATED_PATH
  }, [search.redirect_to])
  const loginErrorMessage = useMemo((): string | null => {
    const value = search.message

    if (typeof value !== 'string') {
      return null
    }

    const normalizedMessage = value.trim()
    return normalizedMessage || null
  }, [search.message])

  /**
   * 生产 canonical 域名兜底：
   * - Railway 等部署场景可能同时暴露多个域名；
   * - 如果用户从非 canonical 域名发起 OAuth，PKCE verifier 会落在错误域名的 cookie 上；
   * - 因此登录页一进入就先纠正到唯一公网域名，再允许后续登录动作发生。
   */
  useEffect(() => {
    const canonicalUrl = buildCanonicalAppUrl(window.location.href)

    if (!canonicalUrl) {
      return
    }

    window.location.replace(canonicalUrl)
  }, [])

  /**
   * 邮件重发倒计时：
   * - 仅在“邮件已发送”步骤生效；
   * - 离开该步骤时自动停止，避免定时器泄漏。
   */
  useEffect(() => {
    if (loginStep !== 'email-sent' || resendCountdown <= 0) {
      return
    }

    const intervalId = window.setInterval(() => {
      setResendCountdown((previousValue) => {
        if (previousValue <= 1) {
          window.clearInterval(intervalId)
          return 0
        }

        return previousValue - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [loginStep, resendCountdown])

  /**
   * 第三方 OAuth 登录：
   * - 使用 Supabase 托管 OAuth 流程；
   * - 回调统一回到 `/auth/callback`，同时保留业务跳转路径参数。
   */
  const handleOAuthSignIn = async (provider: OAuthProvider): Promise<void> => {
    setOauthLoadingProvider(provider)

    try {
      const canonicalUrl = buildCanonicalAppUrl(window.location.href)
      if (canonicalUrl) {
        window.location.replace(canonicalUrl)
        return
      }

      const supabase = getSupabaseBrowserClient()
      const callbackUrl = buildAuthCallbackUrl(window.location.origin, redirectTo)

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: callbackUrl,
        },
      })

      if (error) {
        const providerLabel =
          provider === 'google' ? m.auth_provider_google() : m.auth_provider_github()
        toast.error(
          m.auth_provider_login_failed({
            provider: providerLabel,
            message: error.message,
          }),
        )
        return
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : m.auth_unknown_error_retry()
      const providerLabel =
        provider === 'google' ? m.auth_provider_google() : m.auth_provider_github()
      toast.error(
        m.auth_provider_login_failed({
          provider: providerLabel,
          message,
        }),
      )
    } finally {
      setOauthLoadingProvider(null)
    }
  }

  /**
   * 抽离 Magic Link 发送逻辑，避免首次发送和重发流程重复实现。
   */
  const sendMagicLink = async (targetEmail: string): Promise<boolean> => {
    const trimmedEmail = targetEmail.trim()
    if (!trimmedEmail) {
      toast.warning(m.auth_email_required())
      return false
    }

    const canonicalUrl = buildCanonicalAppUrl(window.location.href)
    if (canonicalUrl) {
      window.location.replace(canonicalUrl)
      return false
    }

    const supabase = getSupabaseBrowserClient()
    const callbackUrl = buildAuthCallbackUrl(window.location.origin, redirectTo)
    const { error } = await supabase.auth.signInWithOtp({
      email: trimmedEmail,
      options: {
        emailRedirectTo: callbackUrl,
      },
    })

    if (error) {
      toast.error(m.auth_email_login_failed({ message: error.message }))
      return false
    }

    return true
  }

  /**
   * 邮箱登录提交：
   * - 在邮箱输入页面点击“获取登入链接”后触发
   * - 使用 Supabase Magic Link 发送邮件
   */
  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    setIsEmailSubmitting(true)

    try {
      const trimmedEmail = email.trim()
      const isSuccess = await sendMagicLink(trimmedEmail)
      if (!isSuccess) {
        return
      }

      setSentEmail(trimmedEmail)
      setResendCountdown(39)
      setLoginStep('email-sent')
    } catch (error) {
      const message = error instanceof Error ? error.message : m.auth_unknown_error_retry()
      toast.error(m.auth_email_login_failed({ message }))
    } finally {
      setIsEmailSubmitting(false)
    }
  }

  /**
   * 邮件重发：
   * - 倒计时未结束时不可点击；
   * - 成功后重置 39 秒倒计时，对齐 Figma 展示态。
   */
  const handleResendEmail = async (): Promise<void> => {
    if (resendCountdown > 0 || isEmailSubmitting) {
      return
    }

    setIsEmailSubmitting(true)

    try {
      const fallbackEmail = sentEmail || email
      const isSuccess = await sendMagicLink(fallbackEmail)
      if (!isSuccess) {
        return
      }

      setSentEmail(fallbackEmail.trim())
      setResendCountdown(39)
    } catch (error) {
      const message = error instanceof Error ? error.message : m.auth_unknown_error_retry()
      toast.error(m.auth_resend_email_failed({ message }))
    } finally {
      setIsEmailSubmitting(false)
    }
  }

  const canResendEmail = resendCountdown === 0 && !isEmailSubmitting
  const sentEmailDisplay = sentEmail || email.trim()

  return (
    <main className="min-h-[100dvh] w-full bg-white px-4 py-6 sm:px-6 md:py-8">
      {loginStep === 'select-method' ? (
        <section className="mx-auto mt-2 w-full max-w-[460px] rounded-[24px] border border-[#EEF2F6] bg-white px-6 pb-8 pt-8 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:mt-4 sm:px-8 md:mt-16 md:px-12 md:pb-9 md:pt-12">
          <div className="mx-auto h-[50px] w-[145px]" data-node-id="70:27758">
            <img
              src="/figma-auth/lucius-logo-mark-invert.png"
              alt={m.app_logo_alt()}
              className="h-full w-full object-contain [filter:brightness(0)_saturate(100%)]"
              draggable={false}
            />
          </div>

          <h1
            className="mt-6 text-center font-['Outfit','PingFang_SC','PingFang SC',sans-serif] text-[28px] font-medium leading-[1.4] tracking-[-0.32px] text-black md:text-[32px] md:leading-[1.6]"
            data-node-id="70:27772"
          >
            {m.auth_login_title()}
          </h1>

          {loginErrorMessage ? (
            <p className="mx-auto mt-4 max-w-[364px] rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {loginErrorMessage}
            </p>
          ) : null}

          <div className="mx-auto mt-6 w-full max-w-[364px] space-y-3">
            <LoginOptionButton
              icon={<GoogleBrandIcon />}
              label={m.auth_login_with_google()}
              onClick={() => handleOAuthSignIn('google')}
              disabled={oauthLoadingProvider !== null}
              isLoading={oauthLoadingProvider === 'google'}
            />

            <LoginOptionButton
              icon={<GithubBrandIcon />}
              label={m.auth_login_with_github()}
              onClick={() => handleOAuthSignIn('github')}
              disabled={oauthLoadingProvider !== null}
              isLoading={oauthLoadingProvider === 'github'}
            />
          </div>

          <div className="mx-auto mt-5 flex w-[180px] items-center gap-2" data-node-id="70:27838">
            <span className="h-px flex-1 bg-[#E5E7EB]" />
            <span className="font-['PingFang_SC','PingFang SC',sans-serif] text-[10px] font-medium leading-[1.6] text-[#6B7280]">
              {m.auth_or()}
            </span>
            <span className="h-px flex-1 bg-[#E5E7EB]" />
          </div>

          <div className="mx-auto mt-5 w-full max-w-[364px]">
            <LoginOptionButton
              icon={<Mail className="h-[18px] w-[18px] text-[#94A3B8]" strokeWidth={1.9} />}
              label={m.auth_email_login()}
              onClick={() => setLoginStep('email-input')}
            />
          </div>
        </section>
      ) : loginStep === 'email-input' ? (
        <EmailFlowCard backLabel={m.auth_back()} onBack={() => setLoginStep('select-method')}>
          <form className="mx-auto mt-6 w-full max-w-[364px]" onSubmit={handleEmailSubmit}>
            <label htmlFor="email" className="sr-only">
              {m.auth_email_label()}
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]"
                strokeWidth={1.9}
              />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={m.auth_email_placeholder()}
                autoComplete="email"
                required
                className="h-12 w-full rounded-2xl border border-[#E5E7EB] bg-white pl-11 pr-4 font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-medium tracking-[-0.14px] text-[#1E293B] placeholder:text-[#8B94A8] focus:border-[#94A3B8] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isEmailSubmitting}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6466F1] to-[#5A63E7] px-4 transition-opacity duration-200 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isEmailSubmitting ? (
                <Loader2 className="h-[18px] w-[18px] animate-spin text-white" />
              ) : (
                <span className="font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-semibold leading-none text-white">
                  {m.auth_get_magic_link()}
                </span>
              )}
            </button>
          </form>
        </EmailFlowCard>
      ) : (
        <EmailFlowCard backLabel={m.auth_back()} onBack={() => setLoginStep('email-input')}>
          <div className="mx-auto mt-5 w-full max-w-[364px] text-center">
            <p className="break-all font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[#1E293B]">
              {m.auth_magic_link_sent_to({ email: sentEmailDisplay })}
            </p>
            <p className="mt-1 font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-[#1E293B]">
              {m.auth_magic_link_sent_hint()}
            </p>

            <button
              type="button"
              disabled={!canResendEmail}
              onClick={handleResendEmail}
              className={`mt-5 flex h-12 w-full items-center justify-center rounded-xl px-4 transition-colors duration-200 ${
                canResendEmail
                  ? 'bg-[#DDE3EB] text-[#334155] hover:bg-[#CBD5E1]'
                  : 'cursor-not-allowed bg-[#E5E7EB] text-[#6B7280]'
              }`}
            >
              {isEmailSubmitting ? (
                <Loader2 className="h-[18px] w-[18px] animate-spin text-[#6B7280]" />
              ) : (
                <span className="font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-semibold leading-none">
                  {resendCountdown > 0
                    ? m.auth_resend_countdown({ seconds: String(resendCountdown) })
                    : m.auth_resend()}
                </span>
              )}
            </button>
          </div>
        </EmailFlowCard>
      )}
    </main>
  )
}
