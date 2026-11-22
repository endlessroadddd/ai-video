import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { PlatformLoginButton } from '@/components/platform-login-button'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type {
  MemberRecord,
  OauthLinkPlatformType,
  PlatformType,
} from '@/lib/services/member-management-api'
import type { TelegramWidgetAuthUser } from '@/lib/services/telegram-integration-api'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages'

export type TelegramAccountBindingConfig = {
  isLoading: boolean
  isAvailable: boolean
  botUsername: string | null
  reason: string | null
}

type PlatformAccountLinkingPanelVariant = 'default' | 'profile'

export type PlatformAccountLinkingPanelProps = {
  platform: PlatformType
  currentMember: MemberRecord | null
  isMemberLoading: boolean
  memberLoadErrorMessage: string | null
  telegramConfig?: TelegramAccountBindingConfig
  onLinkTelegramAccount: (telegramAuth: TelegramWidgetAuthUser) => Promise<string>
  onCreateOauthLinkUrl: (payload: { platform: OauthLinkPlatformType }) => Promise<string>
  onUnlinkAccount: (payload: { memberId: string; platform: PlatformType }) => Promise<string>
  variant?: PlatformAccountLinkingPanelVariant
  className?: string
}

/**
 * 平台展示名统一收口到同一个 helper：
 * - 各平台 onboarding 与成员表共用同一套命名；
 * - 避免不同组件各自写一份 switch 后出现文案漂移。
 */
function getPlatformLabel(platform: PlatformType): string {
  if (platform === 'discord') return m.platform_discord()
  if (platform === 'telegram') return m.platform_telegram()
  if (platform === 'feishu') return m.platform_feishu()
  return m.platform_slack()
}

function getPlatformIconAsset(platform: PlatformType): string {
  if (platform === 'discord') return '/platform-icons/discord.svg'
  if (platform === 'telegram') return '/platform-icons/telegram.svg'
  if (platform === 'feishu') return '/platform-icons/feishu.svg'
  return '/platform-icons/slack.svg'
}

/**
 * OAuth 平台的辅助说明：
 * - 继续复用成员管理原有文案，减少重复翻译；
 * - 只在 Discord / Slack / Feishu 这类授权跳转平台展示。
 */
function getOauthLinkHelperText(platform: OauthLinkPlatformType): string {
  return m.member_management_oauth_link_hint({
    platform: getPlatformLabel(platform),
  })
}

/**
 * 读取并消费 OAuth 回调提示：
 * - 仅消费当前平台自己的 query，避免误清理其它平台回调结果；
 * - 读取后立刻 replaceState，防止刷新页面重复提示。
 */
function readAndConsumeOauthBindingCallbackMessage(platform: PlatformType): {
  successMessage: string | null
  errorMessage: string | null
} {
  if (typeof window === 'undefined') {
    return {
      successMessage: null,
      errorMessage: null,
    }
  }

  const currentUrl = new URL(window.location.href)
  const status = currentUrl.searchParams.get('member_bind_status')
  const queryPlatform = currentUrl.searchParams.get('member_bind_platform') as PlatformType | null
  const message = currentUrl.searchParams.get('member_bind_message')

  if (!status || queryPlatform !== platform) {
    return {
      successMessage: null,
      errorMessage: null,
    }
  }

  const defaultSuccessMessage = m.member_management_platform_bound({
    platform: getPlatformLabel(platform),
  })
  const defaultErrorMessage = m.member_management_platform_bind_failed({
    platform: getPlatformLabel(platform),
  })

  currentUrl.searchParams.delete('member_bind_status')
  currentUrl.searchParams.delete('member_bind_platform')
  currentUrl.searchParams.delete('member_bind_message')

  const nextSearch = currentUrl.searchParams.toString()
  const nextUrl = `${currentUrl.pathname}${nextSearch ? `?${nextSearch}` : ''}${currentUrl.hash}`
  window.history.replaceState({}, '', nextUrl)

  if (status === 'success') {
    return {
      successMessage: message || defaultSuccessMessage,
      errorMessage: null,
    }
  }

  return {
    successMessage: null,
    errorMessage: message || defaultErrorMessage,
  }
}

/**
 * 账号关联区块的加载骨架：
 * - 平台页只需要一个短卡片，不必整段空白；
 * - 保留标题、状态与按钮节奏，避免弹窗内容跳动。
 */
function PlatformAccountLinkingSkeleton() {
  return (
    <div className="dashboard-skeleton-surface rounded-lg border px-3 py-3">
      <div className="space-y-2">
        <Skeleton className="dashboard-skeleton--base h-3 w-[124px] rounded-[4px]" />
        <Skeleton className="dashboard-skeleton--soft h-3 w-[220px] rounded-[4px]" />
        <Skeleton className="dashboard-skeleton--soft h-8 w-full rounded-[8px]" />
      </div>
    </div>
  )
}

function PlatformAccountLinkingProfileSkeleton() {
  return (
    <div className="profile-platform-binding-row">
      <div className="flex items-center gap-3">
        <Skeleton className="dashboard-skeleton--base h-10 w-10 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="dashboard-skeleton--base h-3 w-20 rounded-[4px]" />
          <Skeleton className="dashboard-skeleton--soft h-3 w-24 rounded-[4px]" />
        </div>
      </div>
      <Skeleton className="dashboard-skeleton--soft h-8 w-20 rounded-full" />
    </div>
  )
}

function PlatformAccountLinkingIcon(props: {
  platform: PlatformType
}) {
  const { platform } = props

  return (
    <div className={cn('profile-platform-binding-icon-shell', `profile-platform-binding-icon-shell--${platform}`)}>
      <img
        src={getPlatformIconAsset(platform)}
        alt={getPlatformLabel(platform)}
        className="h-[18px] w-[18px] object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

/**
 * 单个平台账号关联组件：
 * - 只处理当前登录成员与单个平台的绑定关系；
 * - Telegram 走 widget，其他平台走 OAuth 跳转；
 * - 绑定成功后统一通过当前公司成员快照刷新状态；
 * - 支持平台页默认卡片与 Profile 页极简行两种视图。
 */
export function PlatformAccountLinkingPanel(props: PlatformAccountLinkingPanelProps) {
  const {
    platform,
    currentMember,
    isMemberLoading,
    memberLoadErrorMessage,
    telegramConfig,
    onLinkTelegramAccount,
    onCreateOauthLinkUrl,
    onUnlinkAccount,
    variant = 'default',
    className,
  } = props

  const [linkingPlatform, setLinkingPlatform] = useState<PlatformType | null>(null)
  const [unlinkingPlatform, setUnlinkingPlatform] = useState<PlatformType | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const platformLabel: string = getPlatformLabel(platform)
  const isLinked: boolean = Boolean(currentMember?.linkedAccounts.includes(platform))
  const isLinkingCurrentPlatform: boolean = linkingPlatform === platform
  const isUnlinkingCurrentPlatform: boolean = unlinkingPlatform === platform
  const isAnyBindingActionRunning: boolean = Boolean(linkingPlatform) || Boolean(unlinkingPlatform)

  /**
   * OAuth 平台绑定成功后，回调 query 只会在当前页面显示一次。
   */
  useEffect(() => {
    if (platform === 'telegram') {
      return
    }

    const callbackMessage = readAndConsumeOauthBindingCallbackMessage(platform)
    if (callbackMessage.successMessage) {
      setSuccessMessage(callbackMessage.successMessage)
      setErrorMessage(null)
    }
    if (callbackMessage.errorMessage) {
      setErrorMessage(callbackMessage.errorMessage)
      setSuccessMessage(null)
    }
  }, [platform])

  /**
   * Telegram 绑定走 widget 回调：
   * - 直接把官方签名 payload 交给服务端；
   * - 成功后由父层刷新成员快照，这里只负责用户反馈。
   */
  const handleTelegramWidgetAuth = useCallback(async (telegramAuth: TelegramWidgetAuthUser): Promise<void> => {
    setErrorMessage(null)
    setSuccessMessage(null)
    setLinkingPlatform('telegram')

    try {
      const message = await onLinkTelegramAccount(telegramAuth)
      setSuccessMessage(message)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : m.member_management_link_telegram_error())
    } finally {
      setLinkingPlatform(null)
    }
  }, [onLinkTelegramAccount])

  /**
   * OAuth 平台绑定：
   * - 服务端返回一次性授权地址；
   * - 成功后直接跳走，loading 状态由页面重载自然结束。
   */
  const handleStartOauthLink = useCallback(async (): Promise<void> => {
    if (!currentMember) {
      setErrorMessage(m.member_management_missing_current_member_bind())
      return
    }

    if (platform === 'telegram') {
      return
    }

    setErrorMessage(null)
    setSuccessMessage(null)
    setLinkingPlatform(platform)

    let shouldResetLinkingState = true

    try {
      const authorizeUrl = await onCreateOauthLinkUrl({
        platform,
      })

      shouldResetLinkingState = false
      window.location.href = authorizeUrl
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : m.member_management_link_platform_error())
    } finally {
      if (shouldResetLinkingState) {
        setLinkingPlatform(null)
      }
    }
  }, [currentMember, onCreateOauthLinkUrl, platform])

  /**
   * 解绑当前成员的平台账号：
   * - 统一复用成员账号解绑接口；
   * - 平台页只负责当前成员，不提供跨成员解绑操作。
   */
  const handleUnlinkPlatformAccount = useCallback(async (): Promise<void> => {
    if (!currentMember) {
      setErrorMessage(m.member_management_missing_current_member_unbind())
      return
    }

    setErrorMessage(null)
    setSuccessMessage(null)
    setUnlinkingPlatform(platform)

    try {
      const message = await onUnlinkAccount({
        memberId: currentMember.id,
        platform,
      })

      setSuccessMessage(message)
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : m.member_management_unlink_platform_error({
              platform: platformLabel,
            }),
      )
    } finally {
      setUnlinkingPlatform(null)
    }
  }, [currentMember, onUnlinkAccount, platform, platformLabel])

  const renderActionContent = () => {
    if (isMemberLoading && !currentMember) {
      return <PlatformAccountLinkingSkeleton />
    }

    if (!currentMember) {
      return (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
          {memberLoadErrorMessage || m.member_management_no_current_member()}
        </p>
      )
    }

    if (platform === 'telegram') {
      if (telegramConfig?.isLoading) {
        return <PlatformAccountLinkingSkeleton />
      }

      if (!telegramConfig?.isAvailable || !telegramConfig.botUsername) {
        return (
          <p className="rounded-lg border border-[#e5e7eb] bg-[#F8FAFC] px-3 py-2 text-xs text-zinc-600">
            {telegramConfig?.reason || m.member_management_telegram_unavailable()}
          </p>
        )
      }

      if (isLinked) {
        return (
          <Button
            type="button"
            variant="dashboardTinted"
            size="sm"
            disabled={isAnyBindingActionRunning}
            onClick={() => {
              void handleUnlinkPlatformAccount()
            }}
          >
            {isUnlinkingCurrentPlatform ? (
              <>
                <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
                {m.member_management_unlinking()}
              </>
            ) : (
              m.member_management_unlink_platform({
                platform: platformLabel,
              })
            )}
          </Button>
        )
      }

      return (
        <div className="rounded-lg border border-[#e5e7eb] bg-[#F8FAFC] px-3 py-3">
          <PlatformLoginButton
            telegramBotUsername={telegramConfig.botUsername}
            disabled={isAnyBindingActionRunning}
            isLoading={isLinkingCurrentPlatform}
            label={m.member_management_login_and_link({
              platform: platformLabel,
            })}
            loadingLabel={m.member_management_linking()}
            className="inline-flex"
            onAuth={(user) => {
              void handleTelegramWidgetAuth(user)
            }}
            onError={(message) => {
              setErrorMessage(message)
            }}
          />

          {isLinkingCurrentPlatform ? (
            <p className="mt-2 text-xs text-zinc-500">{m.member_management_binding_wait()}</p>
          ) : null}
        </div>
      )
    }

    if (isLinked) {
      return (
        <Button
          type="button"
          variant="dashboardTinted"
          size="sm"
          disabled={isAnyBindingActionRunning}
          onClick={() => {
            void handleUnlinkPlatformAccount()
          }}
        >
          {isUnlinkingCurrentPlatform ? (
            <>
              <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
              {m.member_management_unlinking()}
            </>
          ) : (
            m.member_management_unlink_platform({
              platform: platformLabel,
            })
          )}
        </Button>
      )
    }

    return (
      <div className="space-y-2 rounded-lg border border-[#e5e7eb] bg-[#F8FAFC] px-3 py-3">
        <p className="text-xs text-zinc-500">{getOauthLinkHelperText(platform)}</p>
        <PlatformLoginButton
          disabled={isAnyBindingActionRunning}
          isLoading={isLinkingCurrentPlatform}
          label={m.member_management_login_and_link({
            platform: platformLabel,
          })}
          loadingLabel={m.member_management_linking()}
          className="inline-flex"
          onClick={() => {
            void handleStartOauthLink()
          }}
        />
      </div>
    )
  }

  const renderProfileActionContent = () => {
    if (!currentMember) {
      return null
    }

    if (platform === 'telegram') {
      if (telegramConfig?.isLoading) {
        return <Skeleton className="dashboard-skeleton--soft h-8 w-20 rounded-full" />
      }

      if (!telegramConfig?.isAvailable || !telegramConfig.botUsername) {
        return (
          <span className="text-xs font-medium text-[var(--dashboard-text-muted)]">
            {m.profile_platform_account_unavailable()}
          </span>
        )
      }

      if (isLinked) {
        return (
          <Button
            type="button"
            variant="dashboardTinted"
            size="sm"
            className="h-8 rounded-full px-3 text-xs font-semibold"
            disabled={isAnyBindingActionRunning}
            onClick={() => {
              void handleUnlinkPlatformAccount()
            }}
          >
            {isUnlinkingCurrentPlatform ? m.member_management_unlinking() : m.profile_platform_account_disconnect()}
          </Button>
        )
      }

      return (
        <PlatformLoginButton
          telegramBotUsername={telegramConfig.botUsername}
          disabled={isAnyBindingActionRunning}
          isLoading={isLinkingCurrentPlatform}
          label={m.profile_platform_account_connect()}
          loadingLabel={m.member_management_linking()}
          className="inline-flex shrink-0"
          buttonClassName="h-8 rounded-full px-3 text-xs font-semibold"
          onAuth={(user) => {
            void handleTelegramWidgetAuth(user)
          }}
          onError={(message) => {
            setErrorMessage(message)
          }}
        />
      )
    }

    if (isLinked) {
      return (
        <Button
          type="button"
          variant="dashboardTinted"
          size="sm"
          className="h-8 rounded-full px-3 text-xs font-semibold"
          disabled={isAnyBindingActionRunning}
          onClick={() => {
            void handleUnlinkPlatformAccount()
          }}
        >
          {isUnlinkingCurrentPlatform ? m.member_management_unlinking() : m.profile_platform_account_disconnect()}
        </Button>
      )
    }

    return (
      <PlatformLoginButton
        disabled={isAnyBindingActionRunning}
        isLoading={isLinkingCurrentPlatform}
        label={m.profile_platform_account_connect()}
        loadingLabel={m.member_management_linking()}
        className="inline-flex shrink-0"
        buttonClassName="h-8 rounded-full px-3 text-xs font-semibold"
        onClick={() => {
          void handleStartOauthLink()
        }}
      />
    )
  }

  if (variant === 'profile') {
    if (isMemberLoading && !currentMember) {
      return <PlatformAccountLinkingProfileSkeleton />
    }

    if (!currentMember) {
      return (
        <p className={cn('text-sm text-[var(--dashboard-danger-text)]', className)}>
          {memberLoadErrorMessage || m.member_management_no_current_member()}
        </p>
      )
    }

    const profileStatusLabel: string =
      platform === 'telegram' && telegramConfig && !telegramConfig.isLoading && !telegramConfig.isAvailable
        ? m.profile_platform_account_unavailable()
        : isLinked
          ? m.integration_status_connected()
          : m.integration_status_not_connected()

    return (
      <section className={cn('space-y-2', className)}>
        <div className="profile-platform-binding-row">
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-3">
              <PlatformAccountLinkingIcon platform={platform} />

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--dashboard-title-text)]">{platformLabel}</p>
                <p className="truncate text-xs text-[var(--dashboard-text-muted)]">{profileStatusLabel}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">{renderProfileActionContent()}</div>
        </div>

        {errorMessage ? (
          <p className="px-1 text-xs font-medium text-[var(--dashboard-danger-text)]">{errorMessage}</p>
        ) : null}

        {successMessage ? (
          <p className="px-1 text-xs font-medium text-[var(--dashboard-badge-emerald-text)]">{successMessage}</p>
        ) : null}
      </section>
    )
  }

  return (
    <section className={cn('space-y-2 rounded-lg border border-[#e5e7eb] bg-white p-3', className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-slate-800">{m.member_management_my_bindings()}</p>

        <span
          className={cn(
            'rounded-full px-2 py-1 text-[11px] font-medium',
            isLinked ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600',
          )}
        >
          {isLinked ? m.integration_status_connected() : m.integration_status_not_connected()}
        </span>
      </div>

      <p className="text-xs text-zinc-500">
        {isLinked
          ? m.member_management_platform_bound({
              platform: platformLabel,
            })
          : m.member_management_platform_unlinked({
              platform: platformLabel,
            })}
      </p>

      {renderActionContent()}

      {errorMessage ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{errorMessage}</p>
      ) : null}

      {successMessage ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          {successMessage}
        </p>
      ) : null}
    </section>
  )
}
