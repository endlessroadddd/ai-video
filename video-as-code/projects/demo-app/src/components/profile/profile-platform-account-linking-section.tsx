import { useQuery } from '@tanstack/react-query'

import {
  PlatformAccountLinkingPanel,
  type PlatformAccountLinkingPanelProps,
} from '@/components/settings/platform-account-linking-panel'
import { fetchTelegramIntegrationConfig } from '@/lib/services/telegram-integration-api'
import { m } from '@/paraglide/messages'

type ProfilePlatformAccountLinkingSectionProps = {
  companyId: string | null
  accountLinking: Omit<PlatformAccountLinkingPanelProps, 'platform' | 'telegramConfig' | 'variant'>
}

/**
 * Profile 页统一承载个人平台账号绑定：
 * - 平台设置页只保留安装、同步、频道等“工作区级”动作；
 * - 个人账号绑定统一收口到这里，降低用户在多个设置页之间来回切换的成本。
 */
export function ProfilePlatformAccountLinkingSection(props: ProfilePlatformAccountLinkingSectionProps) {
  const { companyId, accountLinking } = props

  const telegramConfigQuery = useQuery({
    queryKey: ['settings', 'telegram-integration-config'],
    enabled: Boolean(companyId),
    queryFn: fetchTelegramIntegrationConfig,
    staleTime: 60_000,
  })

  if (!companyId) {
    return null
  }

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold text-[var(--dashboard-title-text)]">
          {m.profile_platform_accounts_title()}
        </h2>
      </div>

      {!accountLinking.isMemberLoading && !accountLinking.currentMember ? (
        <p className="rounded-2xl bg-[var(--dashboard-danger-bg)] px-4 py-3 text-sm text-[var(--dashboard-danger-text)]">
          {accountLinking.memberLoadErrorMessage || m.member_management_no_current_member()}
        </p>
      ) : (
        <div className="space-y-3">
          <PlatformAccountLinkingPanel variant="profile" platform="discord" {...accountLinking} />
          <PlatformAccountLinkingPanel variant="profile" platform="slack" {...accountLinking} />
          <PlatformAccountLinkingPanel variant="profile" platform="feishu" {...accountLinking} />
          <PlatformAccountLinkingPanel
            variant="profile"
            platform="telegram"
            {...accountLinking}
            telegramConfig={{
              isLoading: accountLinking.isMemberLoading || telegramConfigQuery.isLoading,
              isAvailable: Boolean(telegramConfigQuery.data?.enabled),
              botUsername: telegramConfigQuery.data?.botUsername || null,
              reason:
                telegramConfigQuery.data?.reason ||
                (telegramConfigQuery.error instanceof Error ? telegramConfigQuery.error.message : null),
            }}
          />
        </div>
      )}
    </section>
  )
}
