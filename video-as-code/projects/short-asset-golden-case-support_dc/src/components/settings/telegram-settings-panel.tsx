import { ChevronRight, ExternalLink, Loader2, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { CompanySelectionPrompt } from '@/components/company-selection-prompt'
import { PlatformLoginButton } from '@/components/platform-login-button'
import {
  SettingsCommunityListSkeleton,
  SettingsSectionShell,
} from '@/components/settings/settings-section-shell'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useSelectedCompanyId } from '@/lib/company-selection'
import {
  createTelegramBindingIntent,
  createTelegramIntegrationSession,
  fetchTelegramBindingIntentStatus,
  fetchTelegramBoundChannels,
  fetchTelegramChatCandidates,
  fetchTelegramIntegrationConfig,
  type TelegramBindingIntent,
  type TelegramBindingIntentStatus,
  type TelegramBoundChannel,
  type TelegramChatCandidate,
  type TelegramIntegrationConfig,
  type TelegramLoginSession,
  type TelegramWidgetAuthUser,
} from '@/lib/services/telegram-integration-api'
import { m } from '@/paraglide/messages'

const TELEGRAM_SESSION_STORAGE_PREFIX = 'telegramIntegrationSession'
const TELEGRAM_SESSION_EXPIRED_MARKER = 'Telegram 集成会话已过期'

/**
 * Telegram 会话在本地持久化的结构：
 * - session: 服务端签发的短期会话；
 * - bindingIntent: 当前自动绑定意图；
 * - storedAtEpochMs: 写入时间，用于调试与排查。
 */
type PersistedTelegramSessionState = {
  session: TelegramLoginSession
  bindingIntent: TelegramBindingIntent | null
  storedAtEpochMs: number
}

/**
 * Telegram 社区列表渲染模型：
 * - 统一把「已绑定群」与「候选群」映射成同一结构；
 * - 避免渲染层感知不同来源的数据差异。
 */
type TelegramCommunityListItem = {
  id: string
  name: string
  primaryMeta: string
  secondaryMeta: string
}

/**
 * 将 Telegram chat type 转换为可读文本。
 */
function getTelegramChatTypeLabel(chatType: string): string {
  if (chatType === 'group') return m.telegram_settings_group()
  if (chatType === 'supergroup') return m.telegram_settings_supergroup()
  if (chatType === 'channel') return m.telegram_settings_channel()
  if (chatType === 'private') return m.telegram_settings_private()
  return m.telegram_settings_unknown()
}

/**
 * 将绑定意图状态转换为短句，便于在弹窗步骤中展示。
 */
function getBindingStatusLabel(status: TelegramBindingIntent['status']): string {
  if (status === 'pending') return m.telegram_settings_status_pending()
  if (status === 'fulfilled') return m.telegram_settings_status_fulfilled()
  if (status === 'expired') return m.telegram_settings_status_expired()
  if (status === 'cancelled') return m.telegram_settings_status_cancelled()
  return m.telegram_settings_status_failed()
}

/**
 * 会话持久化 key（按 company 隔离）。
 */
function getTelegramSessionStorageKey(companyId: string): string {
  return `${TELEGRAM_SESSION_STORAGE_PREFIX}:${companyId}`
}

/**
 * 从 token payload 里读取 exp（仅用于前端过期判断）。
 * 这里不做签名校验，安全校验仍由服务端接口完成。
 */
function parseTelegramSessionPayloadUnsafe(token: string): { exp?: number } | null {
  const separatorIndex = token.lastIndexOf('.')
  if (separatorIndex <= 0) {
    return null
  }

  const payloadPart = token.slice(0, separatorIndex)

  try {
    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/')
    const padding = '='.repeat((4 - (base64.length % 4)) % 4)
    const decoded = atob(base64 + padding)
    return JSON.parse(decoded) as { exp?: number }
  } catch {
    return null
  }
}

/**
 * 判断会话 token 是否过期。
 */
function isTelegramSessionTokenExpired(token: string): boolean {
  const parsedPayload = parseTelegramSessionPayloadUnsafe(token)
  const exp = parsedPayload?.exp
  if (!exp || Number.isNaN(exp)) {
    return true
  }
  const nowSeconds = Math.floor(Date.now() / 1000)
  return exp <= nowSeconds
}

/**
 * 读取持久化会话状态。
 */
function readPersistedTelegramSessionState(companyId: string): PersistedTelegramSessionState | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const rawValue = window.localStorage.getItem(getTelegramSessionStorageKey(companyId))
    if (!rawValue) {
      return null
    }
    return JSON.parse(rawValue) as PersistedTelegramSessionState
  } catch {
    return null
  }
}

/**
 * 写入持久化会话状态。
 */
function writePersistedTelegramSessionState(
  companyId: string,
  payload: PersistedTelegramSessionState,
): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(getTelegramSessionStorageKey(companyId), JSON.stringify(payload))
}

/**
 * 清理持久化会话状态。
 */
function removePersistedTelegramSessionState(companyId: string): void {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(getTelegramSessionStorageKey(companyId))
}

/**
 * 从「已绑定 Telegram 群」转换为列表卡片展示模型。
 */
function mapBoundChannelToCommunityItem(channel: TelegramBoundChannel): TelegramCommunityListItem {
  return {
    id: channel.id,
    name: channel.name,
    primaryMeta: channel.username ? `@${channel.username}` : getTelegramChatTypeLabel(channel.chatType),
    secondaryMeta: `ID ${channel.chatId}`,
  }
}

/**
 * 从「候选 Telegram 群」转换为列表卡片展示模型。
 */
function mapCandidateChatToCommunityItem(chat: TelegramChatCandidate): TelegramCommunityListItem {
  return {
    id: chat.chatId,
    name: chat.name,
    primaryMeta: chat.username ? `@${chat.username}` : getTelegramChatTypeLabel(chat.chatType),
    secondaryMeta: `ID ${chat.chatId}`,
  }
}

/**
 * 渲染单条社区卡片（对齐 Figma 的 82px 高度卡片）。
 */
function TelegramCommunityListCard(props: {
  item: TelegramCommunityListItem
  index: number
}) {
  const { item, index } = props

  /**
   * 头像底色按序轮换，贴近设计稿里的紫/深色/浅色组合。
   */
  const avatarClassName: string =
    index % 3 === 0
      ? 'bg-[#9966e0]'
      : index % 3 === 1
        ? 'bg-[#2c2c31]'
        : 'border border-[#d4d4d8] bg-[#f4f4f5]'

  /**
   * 浅色头像使用深色图标，其余使用白色图标，保证对比度。
   */
  const iconClassName: string =
    index % 3 === 2 ? 'h-5 w-5 object-contain opacity-85' : 'h-5 w-5 object-contain brightness-0 invert'

  return (
    <article className="flex h-[82px] items-center rounded-lg border border-[#e5e7eb] bg-white px-6">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${avatarClassName}`}>
        <img
          src="/platform-icons/telegram.svg"
          alt={m.platform_telegram()}
          className={iconClassName}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="ml-6 min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-[1.6] text-slate-800">{item.name}</p>
        <div className="mt-0.5 flex items-center gap-4 text-sm font-medium text-slate-500">
          <span className="truncate">{item.primaryMeta}</span>
          <span className="h-3 w-px shrink-0 bg-[#d1d5db]" />
          <span className="truncate">{item.secondaryMeta}</span>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
    </article>
  )
}

/**
 * Telegram 登录并绑定工作群流程面板。
 * 页面形态：
 * - 主界面展示社区列表（贴近设计稿）；
 * - 右上角“添加社区”触发弹窗，在弹窗内完成登录与加 bot。
 */
function TelegramBotBindingCard(props: {
  onBoundChannelsChange?: (channels: TelegramBoundChannel[]) => void
}) {
  const { onBoundChannelsChange } = props
  const selectedCompanyId = useSelectedCompanyId()

  const [config, setConfig] = useState<TelegramIntegrationConfig | null>(null)
  const [isConfigLoading, setIsConfigLoading] = useState<boolean>(true)

  const [session, setSession] = useState<TelegramLoginSession | null>(null)
  const [candidateChats, setCandidateChats] = useState<TelegramChatCandidate[]>([])
  const [boundChannels, setBoundChannels] = useState<TelegramBoundChannel[]>([])

  const [warningMessage, setWarningMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [isLoginCreating, setIsLoginCreating] = useState<boolean>(false)
  const [isBindingIntentCreating, setIsBindingIntentCreating] = useState<boolean>(false)
  const [isPreparingAddBot, setIsPreparingAddBot] = useState<boolean>(false)
  const [isLoadingBoundChannels, setIsLoadingBoundChannels] = useState<boolean>(false)
  const [isLoadingChats, setIsLoadingChats] = useState<boolean>(false)
  const [isOnboardingDialogOpen, setIsOnboardingDialogOpen] = useState<boolean>(false)

  const [bindingIntent, setBindingIntent] = useState<TelegramBindingIntent | null>(null)
  const [bindingIntentStatus, setBindingIntentStatus] = useState<TelegramBindingIntentStatus | null>(null)
  const bindingIntentRequestRef = useRef<Promise<TelegramBindingIntent | null> | null>(null)

  /**
   * 将当前已绑定群列表回传给父层，用于其它区块复用。
   */
  useEffect(() => {
    onBoundChannelsChange?.(boundChannels)
  }, [boundChannels, onBoundChannelsChange])

  /**
   * 初始读取 Telegram 配置（bot username / enabled）。
   */
  useEffect(() => {
    let disposed = false

    const loadConfig = async (): Promise<void> => {
      setIsConfigLoading(true)
      setErrorMessage(null)

      try {
        const nextConfig = await fetchTelegramIntegrationConfig()
        if (!disposed) {
          setConfig(nextConfig)
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : m.telegram_settings_load_config_error()
        if (!disposed) {
          setErrorMessage(message)
        }
      } finally {
        if (!disposed) {
          setIsConfigLoading(false)
        }
      }
    }

    void loadConfig()
    return () => {
      disposed = true
    }
  }, [])

  /**
   * 公司切换后重置会话并尝试恢复本地未过期会话。
   */
  useEffect(() => {
    setSession(null)
    setCandidateChats([])
    setBoundChannels([])
    setWarningMessage(null)
    setSuccessMessage(null)
    setErrorMessage(null)
    setBindingIntent(null)
    setBindingIntentStatus(null)

    if (!selectedCompanyId) {
      return
    }

    const persistedState = readPersistedTelegramSessionState(selectedCompanyId)
    if (!persistedState?.session?.sessionToken) {
      return
    }

    if (isTelegramSessionTokenExpired(persistedState.session.sessionToken)) {
      removePersistedTelegramSessionState(selectedCompanyId)
      return
    }

    setSession(persistedState.session)
    setBindingIntent(persistedState.bindingIntent)
  }, [selectedCompanyId])

  /**
   * 会话状态持久化，避免刷新页面后丢失绑定上下文。
   */
  useEffect(() => {
    if (!selectedCompanyId) {
      return
    }

    if (!session?.sessionToken) {
      removePersistedTelegramSessionState(selectedCompanyId)
      return
    }

    writePersistedTelegramSessionState(selectedCompanyId, {
      session,
      bindingIntent,
      storedAtEpochMs: Date.now(),
    })
  }, [bindingIntent, selectedCompanyId, session])

  /**
   * 拉取当前公司已绑定社区（无需 Telegram 登录）。
   */
  const refreshBoundChannels = useCallback(async (): Promise<void> => {
    if (!selectedCompanyId) {
      return
    }

    setIsLoadingBoundChannels(true)

    try {
      const result = await fetchTelegramBoundChannels({
        companyId: selectedCompanyId,
      })
      setBoundChannels(result.channels)
    } catch (error) {
      const message = error instanceof Error ? error.message : m.telegram_settings_load_bound_channels_error()
      setErrorMessage(message)
    } finally {
      setIsLoadingBoundChannels(false)
    }
  }, [selectedCompanyId])

  /**
   * 拉取候选群 + 已绑定群列表。
   */
  const refreshChats = useCallback(async (): Promise<void> => {
    if (!selectedCompanyId || !session?.sessionToken) {
      return
    }

    setIsLoadingChats(true)
    setWarningMessage(null)
    setErrorMessage(null)

    try {
      const result = await fetchTelegramChatCandidates({
        companyId: selectedCompanyId,
        sessionToken: session.sessionToken,
      })

      setCandidateChats(result.chats)
      setBoundChannels(result.channels)
      setWarningMessage(result.warning)
    } catch (error) {
      const message = error instanceof Error ? error.message : m.telegram_settings_load_candidates_error()
      if (selectedCompanyId && message.includes(TELEGRAM_SESSION_EXPIRED_MARKER)) {
        removePersistedTelegramSessionState(selectedCompanyId)
        setSession(null)
        setBindingIntent(null)
      }
      setErrorMessage(message)
    } finally {
      setIsLoadingChats(false)
    }
  }, [selectedCompanyId, session?.sessionToken])

  /**
   * 公司就绪后先读取已绑定社区，确保未 Telegram 登录也能看到 DB 数据。
   */
  useEffect(() => {
    if (!selectedCompanyId) {
      return
    }

    void refreshBoundChannels()
  }, [refreshBoundChannels, selectedCompanyId])

  /**
   * 会话就绪后自动刷新一次列表，让主列表尽快显示真实数据。
   */
  useEffect(() => {
    if (!selectedCompanyId || !session?.sessionToken) {
      return
    }

    void refreshChats()
  }, [refreshChats, selectedCompanyId, session?.sessionToken])

  /**
   * 为当前公司准备“唯一有效”的绑定 intent：
   * - 顶层按钮、弹窗按钮、会话恢复补建都走同一个入口，避免重复造 token；
   * - 通过 ref 串行化请求，避免 effect 与点击事件并发时互相覆盖最新 intent；
   * - 成功后统一回写 session.addBotUrl，确保后续打开的一直是最新可用链接。
   */
  const requestFreshBindingIntent = useCallback(async (): Promise<TelegramBindingIntent | null> => {
    if (!selectedCompanyId || !session?.sessionToken) {
      return null
    }

    if (bindingIntent?.intentId) {
      return bindingIntent
    }

    if (bindingIntentRequestRef.current) {
      return bindingIntentRequestRef.current
    }

    const requestPromise = (async (): Promise<TelegramBindingIntent> => {
      setIsBindingIntentCreating(true)

      try {
        const intent = await createTelegramBindingIntent({
          companyId: selectedCompanyId,
          sessionToken: session.sessionToken,
        })

        setSession((currentSession) => {
          if (!currentSession) {
            return currentSession
          }

          return {
            ...currentSession,
            addBotUrl: intent.addBotUrl,
          }
        })
        setBindingIntent(intent)
        setBindingIntentStatus(null)
        return intent
      } finally {
        bindingIntentRequestRef.current = null
        setIsBindingIntentCreating(false)
      }
    })()

    bindingIntentRequestRef.current = requestPromise
    return requestPromise
  }, [bindingIntent, selectedCompanyId, session?.sessionToken])

  /**
   * 处理 Telegram 登录回调：
   * - 服务端验签后创建 session；
   * - 同时创建一次绑定意图（startgroup token）。
   */
  const handleTelegramAuth = useCallback(
    async (telegramAuthUser: TelegramWidgetAuthUser): Promise<void> => {
      if (!selectedCompanyId) {
        setErrorMessage(m.telegram_settings_select_company_top())
        return
      }

      setIsLoginCreating(true)
      setErrorMessage(null)
      setSuccessMessage(null)
      setWarningMessage(null)

      try {
        const createdSession = await createTelegramIntegrationSession({
          companyId: selectedCompanyId,
          telegramAuth: telegramAuthUser,
        })

        const intent = await createTelegramBindingIntent({
          companyId: selectedCompanyId,
          sessionToken: createdSession.sessionToken,
        })

        setSession({
          ...createdSession,
          addBotUrl: intent.addBotUrl,
        })
        setBindingIntent(intent)
        setBindingIntentStatus(null)
        setSuccessMessage(m.telegram_settings_login_success())
      } catch (error) {
        const message = error instanceof Error ? error.message : m.telegram_settings_create_session_error()
        setErrorMessage(message)
      } finally {
        setIsLoginCreating(false)
      }
    },
    [selectedCompanyId],
  )

  /**
   * 会话恢复后若没有 intent，自动补建一个最新 intent。
   */
  useEffect(() => {
    if (!selectedCompanyId || !session?.sessionToken || bindingIntent?.intentId) {
      return
    }

    let disposed = false

    const ensureFreshBindingIntent = async (): Promise<void> => {
      try {
        const intent = await requestFreshBindingIntent()
        if (disposed || !intent) {
          return
        }
      } catch (error) {
        if (disposed) {
          return
        }

        const message = error instanceof Error ? error.message : m.telegram_settings_create_binding_intent_error()
        if (message.includes(TELEGRAM_SESSION_EXPIRED_MARKER)) {
          removePersistedTelegramSessionState(selectedCompanyId)
          setSession(null)
          setBindingIntent(null)
          setWarningMessage(m.telegram_settings_session_expired())
          return
        }

        setWarningMessage(message)
      }
    }

    void ensureFreshBindingIntent()

    return () => {
      disposed = true
    }
  }, [bindingIntent?.intentId, requestFreshBindingIntent, selectedCompanyId, session?.sessionToken])

  /**
   * 打开 Telegram 加群链接前，确保当前链接对应的 intent 仍然有效：
   * - 若当前已经有 pending intent，直接复用，避免把用户刚复制/打开的 token 作废；
   * - 若当前没有 intent（例如上一条刚 fulfilled），先同步补建新的，再打开 Telegram；
   * - 这样可以避免“session 里残留旧 addBotUrl，导致新群无法关联 company_id”的竞态。
   */
  const openTelegramAddBotWithFreshIntent = useCallback(async (successMessage: string): Promise<void> => {
    if (!selectedCompanyId) {
      setErrorMessage(m.telegram_settings_select_company_first())
      return
    }

    if (!session?.sessionToken) {
      setWarningMessage(m.telegram_settings_login_first())
      return
    }

    setIsPreparingAddBot(true)
    setErrorMessage(null)
    setWarningMessage(null)

    try {
      const activeIntent = bindingIntent?.intentId ? bindingIntent : await requestFreshBindingIntent()
      const addBotUrl = activeIntent?.addBotUrl || session.addBotUrl

      if (!addBotUrl) {
        throw new Error(m.telegram_settings_create_binding_intent_error())
      }

      if (typeof window !== 'undefined') {
        window.open(addBotUrl, '_blank', 'noopener,noreferrer')
      }

      setSuccessMessage(successMessage)
    } catch (error) {
      const message = error instanceof Error ? error.message : m.telegram_settings_create_binding_intent_error()
      if (message.includes(TELEGRAM_SESSION_EXPIRED_MARKER)) {
        removePersistedTelegramSessionState(selectedCompanyId)
        setSession(null)
        setBindingIntent(null)
        setWarningMessage(m.telegram_settings_session_expired())
        return
      }

      setErrorMessage(message)
    } finally {
      setIsPreparingAddBot(false)
    }
  }, [
    bindingIntent,
    requestFreshBindingIntent,
    selectedCompanyId,
    session?.addBotUrl,
    session?.sessionToken,
  ])

  /**
   * 自动轮询绑定状态，成功后刷新已绑定群列表。
   */
  useEffect(() => {
    if (!selectedCompanyId || !session?.sessionToken || !bindingIntent?.intentId) {
      return
    }

    let disposed = false
    let timerId: ReturnType<typeof setTimeout> | null = null

    const pollBindingIntentStatus = async (): Promise<void> => {
      try {
        const nextStatus = await fetchTelegramBindingIntentStatus({
          companyId: selectedCompanyId,
          sessionToken: session.sessionToken,
          intentId: bindingIntent.intentId,
        })

        if (disposed) {
          return
        }

        setBindingIntentStatus(nextStatus)

        if (nextStatus.status === 'fulfilled') {
          setBindingIntent(null)
          if (nextStatus.boundChannel) {
            setSuccessMessage(m.telegram_settings_auto_bind_success_named({
              name: nextStatus.boundChannel.name,
            }))
          } else {
            setSuccessMessage(m.telegram_settings_auto_bind_success())
          }
          void refreshChats()
          return
        }

        if (nextStatus.status === 'expired') {
          setBindingIntent(null)
          setWarningMessage(m.telegram_settings_auto_bind_expired())
          return
        }

        if (nextStatus.status === 'failed' || nextStatus.status === 'cancelled') {
          setBindingIntent(null)
          setWarningMessage(nextStatus.errorMessage || m.telegram_settings_auto_bind_incomplete())
          return
        }

        timerId = setTimeout(() => {
          void pollBindingIntentStatus()
        }, 3000)
      } catch (error) {
        if (disposed) {
          return
        }

        const message = error instanceof Error ? error.message : m.telegram_settings_poll_status_error()
        if (selectedCompanyId && message.includes(TELEGRAM_SESSION_EXPIRED_MARKER)) {
          removePersistedTelegramSessionState(selectedCompanyId)
          setSession(null)
          setBindingIntent(null)
        }
        setWarningMessage(message)
      }
    }

    void pollBindingIntentStatus()

    return () => {
      disposed = true
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [bindingIntent?.intentId, refreshChats, selectedCompanyId, session?.sessionToken])

  /**
   * “添加社区”按钮交互：
   * - 总是打开弹窗，引导用户完成登录流程；
   * - 若已有登录态，同时触发一次“添加 bot”动作，满足新需求。
   */
  const handleOpenOnboardingDialog = useCallback((): void => {
    if (!selectedCompanyId) {
      setErrorMessage(m.telegram_settings_select_company_first())
      return
    }

    setIsOnboardingDialogOpen(true)

    if (session?.sessionToken) {
      void openTelegramAddBotWithFreshIntent(m.telegram_settings_open_telegram_confirm())
    }
  }, [openTelegramAddBotWithFreshIntent, selectedCompanyId, session?.sessionToken])

  /**
   * 显式触发添加 bot：
   * - 给弹窗内的“添加 bot”按钮使用；
   * - 用户可重复点击，方便在多个社区中执行添加动作。
   */
  const handleOpenAddBotAction = useCallback((): void => {
    void openTelegramAddBotWithFreshIntent(m.telegram_settings_open_telegram_add_bot())
  }, [openTelegramAddBotWithFreshIntent])

  /**
   * 主列表优先展示已绑定社区，若暂未绑定则回退展示候选社区。
   */
  const communityList: TelegramCommunityListItem[] = useMemo(() => {
    if (boundChannels.length > 0) {
      return boundChannels.map(mapBoundChannelToCommunityItem)
    }

    if (candidateChats.length > 0) {
      return candidateChats.map(mapCandidateChatToCommunityItem)
    }

    return []
  }, [boundChannels, candidateChats])

  return (
    <>
    <SettingsSectionShell
      title={m.platform_telegram()}
      actions={
        isConfigLoading ? (
          <Skeleton className="dashboard-skeleton--accent h-8 w-[134px] rounded-lg" />
        ) : (
          <Button
            type="button"
            variant="dashboardPrimary"
            size="sm"
            className="h-8 w-[134px] rounded-lg text-sm font-semibold"
            onClick={handleOpenOnboardingDialog}
            disabled={!selectedCompanyId || (config ? !config.enabled : false) || isPreparingAddBot}
          >
            {m.telegram_settings_add_community()}
          </Button>
        )
      }
    >
        <div className="space-y-[11px]">
          {isLoadingBoundChannels && !session?.sessionToken && communityList.length === 0 ? (
            <SettingsCommunityListSkeleton rowCount={3} />
          ) : null}

          {communityList.length > 0 ? (
            communityList.map((item, index) => (
              <TelegramCommunityListCard key={item.id} item={item} index={index} />
            ))
          ) : !isLoadingBoundChannels ? (
            selectedCompanyId ? (
              <div className="flex h-[82px] items-center justify-center rounded-lg border border-[#e5e7eb] bg-white px-6 text-sm text-slate-500">
                {m.telegram_settings_empty_with_company()}
              </div>
            ) : (
              <CompanySelectionPrompt
                message={m.telegram_settings_empty_without_company()}
                density="compact"
              />
            )
          ) : null}
        </div>

        {warningMessage ? (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
            {warningMessage}
          </p>
        ) : null}
        {errorMessage ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{errorMessage}</p>
        ) : null}
        {successMessage ? (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            {successMessage}
          </p>
        ) : null}
      </SettingsSectionShell>

      <Dialog open={isOnboardingDialogOpen} onOpenChange={setIsOnboardingDialogOpen}>
        <DialogContent className="max-w-[520px] border-[#e5e7eb] bg-[#f8fafc] p-5 sm:max-w-[520px]">
          <DialogHeader className="gap-1 text-left">
            <DialogTitle className="text-lg font-semibold text-slate-800">{m.telegram_settings_dialog_title()}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <section className="space-y-2 rounded-lg border border-[#e5e7eb] bg-white p-3">
              <p className="text-xs font-semibold text-slate-800">{m.telegram_settings_step_login()}</p>

              {isConfigLoading ? (
                <div className="dashboard-skeleton-surface rounded-lg border px-3 py-3">
                  <div className="space-y-2">
                    <Skeleton className="dashboard-skeleton--base h-3 w-[96px] rounded-[4px]" />
                    <Skeleton className="dashboard-skeleton--soft h-8 w-full rounded-[8px]" />
                  </div>
                </div>
              ) : null}

              {!isConfigLoading && config?.enabled ? (
                <PlatformLoginButton
                  telegramBotUsername={config.botUsername}
                  disabled={isLoginCreating}
                  isLoading={isLoginCreating}
                  label={m.telegram_settings_login()}
                  loadingLabel={m.telegram_settings_logging_in()}
                  className="inline-flex"
                  onAuth={(user) => {
                    void handleTelegramAuth(user)
                  }}
                  onError={(message) => {
                    setErrorMessage(message)
                  }}
                />
              ) : null}

              {!isConfigLoading && config && !config.enabled ? (
                <p className="text-xs text-red-600">{config.reason || m.telegram_settings_integration_disabled()}</p>
              ) : null}

              {isLoginCreating ? (
                <div className="inline-flex items-center gap-2 text-xs text-slate-500">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {m.telegram_settings_verifying_login()}
                </div>
              ) : null}

              {session ? (
                <p className="text-xs text-emerald-700">
                  {session.telegramUser.username
                    ? m.telegram_settings_logged_in_as_username({
                        name: session.telegramUser.firstName,
                        username: session.telegramUser.username,
                      })
                    : m.telegram_settings_logged_in_as_name({
                        name: session.telegramUser.firstName,
                      })}
                </p>
              ) : null}
            </section>

            <section className="space-y-2 rounded-lg border border-[#e5e7eb] bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-slate-800">{m.telegram_settings_step_add_bot()}</p>
                {bindingIntent ? (
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                    {getBindingStatusLabel(bindingIntentStatus?.status || bindingIntent.status)}
                  </span>
                ) : null}
              </div>

              <Button
                type="button"
                variant="dashboardTinted"
                size="sm"
                className="h-8 w-full justify-between text-xs font-medium"
                onClick={handleOpenAddBotAction}
                disabled={!session?.sessionToken || isPreparingAddBot || isBindingIntentCreating}
              >
                {m.telegram_settings_add_bot_button({
                  username: config?.botUsername || 'lucius_client_bot',
                })}
                {isPreparingAddBot || isBindingIntentCreating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ExternalLink className="h-3.5 w-3.5" />
                )}
              </Button>
            </section>

            <section className="space-y-2 rounded-lg border border-[#e5e7eb] bg-white p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-slate-800">{m.telegram_settings_step_sync_communities()}</p>
                <Button
                  type="button"
                  variant="dashboardTintedGhost"
                  size="sm"
                  className="h-7 px-2"
                  disabled={!session || isLoadingChats}
                  onClick={() => {
                    void refreshChats()
                  }}
                >
                  {isLoadingChats ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>

              <Button
                type="button"
                variant="dashboardTinted"
                size="sm"
                className="h-8 w-full text-xs font-medium"
                onClick={() => {
                  void refreshChats()
                }}
                disabled={!session || isLoadingChats}
              >
                {isLoadingChats ? m.common_refreshing() : m.telegram_settings_refresh_communities()}
              </Button>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

/**
 * Telegram 设置分区：
 * - 页面主结构对齐 Figma 设计稿；
 * - “添加社区”承载登录 + 添加 bot 的完整接入动作。
 */
export function TelegramSettingsPanel(props: {
  onBoundChannelsChange?: (channels: TelegramBoundChannel[]) => void
}) {
  const { onBoundChannelsChange } = props

  return <TelegramBotBindingCard onBoundChannelsChange={onBoundChannelsChange} />
}
