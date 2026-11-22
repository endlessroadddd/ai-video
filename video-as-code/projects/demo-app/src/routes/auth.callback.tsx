import { createFileRoute } from '@tanstack/react-router'
import type { Session } from '@supabase/supabase-js'
import { useEffect, useMemo, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { getSelectedCompanyId } from '@/lib/company-selection'
import { activateSelectedCompanyContext } from '@/lib/company-selection-context'
import { buildCanonicalAppUrl } from '@/lib/public-app-url'
import {
  resolveAuthCallbackSession,
  type SupportedOtpType,
} from '@/lib/services/auth-callback-session'
import {
  DEFAULT_AUTHENTICATED_PATH,
  resolveAuthenticatedEntryPath,
} from '@/lib/services/auth-entry'
import { m } from '@/paraglide/messages'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

type CallbackStatus = 'loading' | 'error'

type AcceptInvitationsResponse = {
  acceptedCount: number
  skippedCount: number
  acceptedCompanyIds: string[]
  preferredCompanyId: string | null
}

function getSafeRedirectPath(redirectTo: string | null, fallback: string): string {
  if (!redirectTo) {
    return fallback
  }

  return redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`
}

function getHashParams(): URLSearchParams {
  if (typeof window === 'undefined') {
    return new URLSearchParams()
  }

  const rawHash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash

  return new URLSearchParams(rawHash)
}

/**
 * 登录回调后自动接收待处理邀请：
 * - 由服务端按当前登录邮箱匹配 `pending invitation`；
 * - 失败时不阻断主登录流程，仅记录到控制台便于排查。
 */
async function acceptPendingInvitationsAfterLogin(accessToken: string | null): Promise<AcceptInvitationsResponse | null> {
  try {
    const response = await fetch('/api/settings/member-management/accept-invitations', {
      method: 'POST',
      credentials: 'include',
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
    })

    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string }
      console.warn(
        '[member-management] 自动接收邀请失败：',
        payload.error || `HTTP ${response.status}`,
      )
      return null
    }

    return (await response.json()) as AcceptInvitationsResponse
  } catch (error) {
    console.warn(
      '[member-management] 自动接收邀请请求异常：',
      error instanceof Error ? error.message : 'unknown error',
    )
    return null
  }
}

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallbackPage,
})

/**
 * 登录回调页骨架：
 * - 回调过程通常只持续很短，但仍需避免只剩一个 spinner；
 * - 用两行骨架提示“正在处理中”，让回调页在慢网环境下也有稳定结构。
 */
function AuthCallbackSkeleton() {
  return (
    <div className="w-[min(calc(100%-32px),420px)] rounded-2xl border border-[var(--dashboard-panel-border)] bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="space-y-3">
        <Skeleton className="dashboard-skeleton--base h-6 w-[46%] rounded-[8px]" />
        <Skeleton className="dashboard-skeleton--soft h-4 w-[84%] rounded-[6px]" />
        <Skeleton className="dashboard-skeleton--soft h-4 w-[62%] rounded-[6px]" />
      </div>
    </div>
  )
}

function AuthCallbackPage() {
  const [status, setStatus] = useState<CallbackStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const searchParams = useMemo(() => {
    if (typeof window === 'undefined') {
      return new URLSearchParams()
    }

    return new URLSearchParams(window.location.search)
  }, [])

  useEffect(() => {
    const run = async () => {
      const canonicalUrl = buildCanonicalAppUrl(window.location.href)

      if (canonicalUrl) {
        window.location.replace(canonicalUrl)
        return
      }

      const redirectTo = searchParams.get('redirect_to')
      const safePath = getSafeRedirectPath(redirectTo, DEFAULT_AUTHENTICATED_PATH)
      const hashParams = getHashParams()

      const authError = searchParams.get('error')
      const authErrorDescription = searchParams.get('error_description')
      const authCode = searchParams.get('code')
      const tokenHash = searchParams.get('token_hash')
      const otpType = searchParams.get('type')

      const hashError = hashParams.get('error')
      const hashErrorDescription = hashParams.get('error_description')
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')

      try {
        const supabase = getSupabaseBrowserClient()
        const finalizeAuthenticatedRedirect = async (session: Session | null): Promise<void> => {
          const resolvedSession = session || (await supabase.auth.getSession()).data.session
          /**
           * 邀请链接登录回跳时，不要先自动消费邮箱型 pending invitation：
           * - 当前主流程应该先回 `/invite/member`，由 token 对应的组织自己完成入组；
           * - 若在这里先批量自动接收其他邀请，会污染 selected company，导致后续回到错误组织。
           */
          const acceptedInvitations = safePath.startsWith('/invite/')
            ? null
            : await acceptPendingInvitationsAfterLogin(
                resolvedSession?.access_token || null,
              )
          const nextSelectedCompanyId =
            acceptedInvitations?.preferredCompanyId || getSelectedCompanyId()

          /**
           * 登录回调一旦知道应该优先进入哪个组织，就立即回写本地 company_id：
           * - 邀请流随后可能先回 `/invite/member` 再继续；
           * - 若这里不先落缓存，后续页面首屏仍会沿用旧组织上下文。
           */
          if (nextSelectedCompanyId) {
            activateSelectedCompanyContext({
              companyId: nextSelectedCompanyId,
            })
          }

          /**
           * 邀请链接登录后必须先回邀请页本身：
           * - 通用邀请链接的“自动入组”发生在 `/invite/member` 页面；
           * - 若这里继续走通用 onboarding 落点，旧组织状态会把用户劫持到错误流程。
           */
          if (safePath.startsWith('/invite/')) {
            window.location.replace(safePath)
            return
          }

          try {
            const resolution = await resolveAuthenticatedEntryPath(supabase, {
              preferredPath: safePath,
              selectedCompanyId: nextSelectedCompanyId,
            })

            if (resolution.companyId) {
              activateSelectedCompanyContext({
                companyId: resolution.companyId,
              })
            }

            window.location.replace(resolution.targetPath)
            return
          } catch (resolveError) {
            console.warn(
              '[auth.callback] 登录后落点解析失败，回退到默认路径：',
              resolveError instanceof Error ? resolveError.message : 'unknown error',
            )
          }

          const fallbackPath = safePath === '/' ? DEFAULT_AUTHENTICATED_PATH : safePath
          window.location.replace(fallbackPath)
        }

        if (authError || hashError) {
          const url = new URL('/auth/login', window.location.origin)
          url.searchParams.set('error', authError || hashError || 'access_denied')
          url.searchParams.set(
            'message',
            authErrorDescription || hashErrorDescription || m.auth_callback_invalid_link(),
          )
          window.location.replace(url.toString())
          return
        }

        /**
         * 回调统一消费：
         * - 兼容旧 implicit hash token；
         * - 兼容 Magic Link `token_hash`；
         * - 兼容 Google / GitHub OAuth 的 PKCE `code`。
         *
         * 说明：
         * - `@supabase/ssr` 在 browser client 初始化时会尝试自动消费 URL；
         * - 这里再做一次显式解析，是为了在 session 没成功建立时给出更准确的错误，
         *   而不是直接落到“missing session”。
         */
        const sessionResolution = await resolveAuthCallbackSession(supabase.auth, {
          code: authCode,
          tokenHash,
          otpType: otpType as SupportedOtpType | null,
          accessToken,
          refreshToken,
        })

        if (sessionResolution.status === 'error') {
          const url = new URL('/auth/login', window.location.origin)
          url.searchParams.set('error', sessionResolution.errorCode)
          url.searchParams.set(
            'message',
            sessionResolution.errorMessage || m.auth_callback_missing_session(),
          )
          window.location.replace(url.toString())
          return
        }

        await finalizeAuthenticatedRedirect(sessionResolution.session)
        return
      } catch (error) {
        const message = error instanceof Error ? error.message : m.auth_callback_unknown_error()
        setErrorMessage(message)
        setStatus('error')
      }
    }

    run()
  }, [searchParams])

  if (status === 'error') {
    return (
      <main className="min-h-[100dvh] bg-card">
        <div className="mx-auto flex w-full max-w-[720px] flex-col px-4 pb-8 pt-8 sm:px-6 md:px-8 md:pb-12 md:pt-12">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {m.auth_callback_failed({ message: errorMessage })}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[100dvh] bg-card">
      <div className="mx-auto flex w-full max-w-[720px] items-center justify-center px-4 pb-8 pt-8 sm:px-6 md:px-8 md:pb-12 md:pt-12">
        <AuthCallbackSkeleton />
      </div>
    </main>
  )
}
