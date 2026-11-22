import { useEffect, useState } from 'react'

import { getConfiguredPublicAppOrigin } from '@/lib/public-app-url'

export type MatchMediaResult = Pick<MediaQueryList, 'matches'>
export type MatchMediaFn = (query: string) => MatchMediaResult
export type NavigatorWithStandalone = Navigator & { standalone?: boolean }
export type PwaInstallPromptState = {
  isVisible: boolean
  isInstalling: boolean
  install: () => Promise<void>
}

type BeforeInstallPromptChoice = {
  outcome: 'accepted' | 'dismissed'
  platform: string
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<BeforeInstallPromptChoice>
}

/**
 * 判断当前窗口是否已经以独立应用模式打开。
 *
 * 兼容两类实现：
 * - Chromium 系浏览器通过 `(display-mode: standalone)` 判断；
 * - iOS Safari 仍保留历史字段 `navigator.standalone`。
 */
export function isStandalonePwa(params: {
  matchMedia?: MatchMediaFn
  navigator?: NavigatorWithStandalone
} = {}): boolean {
  const isStandaloneDisplayMode = params.matchMedia?.('(display-mode: standalone)').matches ?? false
  const isLegacyStandaloneMode = params.navigator?.standalone === true

  return isStandaloneDisplayMode || isLegacyStandaloneMode
}

/**
 * 安装入口只应暴露在 canonical origin。
 *
 * 设计原因：
 * - 避免临时域名、预发域名被用户安装成另一套独立应用；
 * - 本地开发未配置 canonical 域名时，默认允许继续调试安装流程。
 */
export function canInstallPwaFromOrigin(
  currentOrigin: string,
  configuredOrigin: string | null = getConfiguredPublicAppOrigin(),
): boolean {
  if (!configuredOrigin) {
    return true
  }

  return new URL(currentOrigin).origin === new URL(configuredOrigin).origin
}

/**
 * 统一维护安装提示状态：
 * - 只在浏览器已发出 `beforeinstallprompt` 时展示安装入口；
 * - standalone 模式或非 canonical origin 时自动隐藏；
 * - 安装动作本身通过统一 `install()` 暴露，方便不同布局复用同一套状态。
 */
export function usePwaInstallPrompt(): PwaInstallPromptState {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [isStandaloneMode, setIsStandaloneMode] = useState<boolean>(false)
  const [isAllowedOrigin, setIsAllowedOrigin] = useState<boolean>(false)
  const [isInstalling, setIsInstalling] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const syncInstallState = (): void => {
      const currentOrigin = window.location.origin

      setIsAllowedOrigin(canInstallPwaFromOrigin(currentOrigin))
      setIsStandaloneMode(
        isStandalonePwa({
          matchMedia: window.matchMedia.bind(window),
          navigator: window.navigator as NavigatorWithStandalone,
        }),
      )
    }

    const handleBeforeInstallPrompt = (event: Event): void => {
      if (!canInstallPwaFromOrigin(window.location.origin)) {
        return
      }

      event.preventDefault()
      setInstallPromptEvent(event as BeforeInstallPromptEvent)
    }

    const handleAppInstalled = (): void => {
      setInstallPromptEvent(null)
      setIsStandaloneMode(true)
    }

    syncInstallState()

    const displayModeQuery = window.matchMedia('(display-mode: standalone)')
    displayModeQuery.addEventListener('change', syncInstallState)
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      displayModeQuery.removeEventListener('change', syncInstallState)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const install = async (): Promise<void> => {
    if (!installPromptEvent || isInstalling) {
      return
    }

    setIsInstalling(true)

    try {
      await installPromptEvent.prompt()
      await installPromptEvent.userChoice
      setInstallPromptEvent(null)
    } finally {
      setIsInstalling(false)
    }
  }

  return {
    isVisible: isAllowedOrigin && !isStandaloneMode && Boolean(installPromptEvent),
    isInstalling,
    install,
  }
}
