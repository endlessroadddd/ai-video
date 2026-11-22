import { useEffect, useState } from 'react'

export type ViewportShellMode = 'mobile' | 'rail' | 'sidebar'
export type ViewportPanelMode = 'page' | 'sheet' | 'inline'

export type ViewportProfile = {
  isPhone: boolean
  isTablet: boolean
  isDesktop: boolean
  shellMode: ViewportShellMode
  panelMode: ViewportPanelMode
}

const PHONE_MAX_WIDTH = 767
const DESKTOP_MIN_WIDTH = 1280

/**
 * 统一把固定的 5 档设备策略收口成 3 种交互模式：
 * - `<768` 视为手机；
 * - `768-1279` 统一视为平板 / 小桌面；
 * - `>=1280` 回到完整桌面壳层。
 */
export function resolveViewportProfile(viewportWidth: number): ViewportProfile {
  if (viewportWidth <= PHONE_MAX_WIDTH) {
    return {
      isPhone: true,
      isTablet: false,
      isDesktop: false,
      shellMode: 'mobile',
      panelMode: 'page',
    }
  }

  if (viewportWidth < DESKTOP_MIN_WIDTH) {
    return {
      isPhone: false,
      isTablet: true,
      isDesktop: false,
      shellMode: 'rail',
      panelMode: 'sheet',
    }
  }

  return {
    isPhone: false,
    isTablet: false,
    isDesktop: true,
    shellMode: 'sidebar',
    panelMode: 'inline',
  }
}

function getViewportWidth(): number {
  if (typeof window === 'undefined') {
    return DESKTOP_MIN_WIDTH
  }

  return window.innerWidth
}

/**
 * 所有页面统一通过这个 hook 读取视口能力：
 * - 避免业务页面继续散落 `window.innerWidth`；
 * - 首帧先给桌面默认值，客户端挂载后再同步真实宽度，保证 hydration 稳定。
 */
export function useViewportProfile(): ViewportProfile {
  const [viewportProfile, setViewportProfile] = useState<ViewportProfile>(() =>
    resolveViewportProfile(DESKTOP_MIN_WIDTH),
  )

  useEffect(() => {
    const syncViewportProfile = (): void => {
      setViewportProfile(resolveViewportProfile(getViewportWidth()))
    }

    syncViewportProfile()
    window.addEventListener('resize', syncViewportProfile)
    window.visualViewport?.addEventListener('resize', syncViewportProfile)

    return () => {
      window.removeEventListener('resize', syncViewportProfile)
      window.visualViewport?.removeEventListener('resize', syncViewportProfile)
    }
  }, [])

  return viewportProfile
}
