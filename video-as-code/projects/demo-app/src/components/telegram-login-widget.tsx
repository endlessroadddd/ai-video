import { useEffect, useRef, type ReactNode } from 'react'

import type { TelegramWidgetAuthUser } from '@/lib/services/telegram-integration-api'
import { m } from '@/paraglide/messages'
import { cn } from '@/lib/utils'

declare global {
  interface Window {
    __luciusTelegramWidgetAuth?: (user: TelegramWidgetAuthUser) => void
  }
}

type TelegramLoginWidgetProps = {
  botUsername: string
  disabled?: boolean
  onAuth: (user: TelegramWidgetAuthUser) => void
  onError?: (message: string) => void
  children?: ReactNode
  className?: string
}

/**
 * 自定义触发器场景下，强制 Telegram iframe 铺满宿主区域：
 * - 使用 `filter: opacity(0)` 隐藏 iframe，避免修改 `opacity` 属性后被 Telegram 判定为不可见；
 * - iframe 仍保留在最上层承接 hover / click；
 * - 自定义按钮只负责展示视觉，不直接接管点击事件。
 */
function applyTelegramWidgetFrameStyles(container: HTMLDivElement): void {
  container.style.position = 'absolute'
  container.style.inset = '0'
  container.style.zIndex = '10'
  container.style.overflow = 'hidden'
  container.style.borderRadius = 'inherit'
  container.style.background = 'transparent'
  container.style.filter = 'opacity(0)'
  container.style.cursor = 'pointer'

  Array.from(container.children).forEach((child) => {
    if (!(child instanceof HTMLElement) || child.tagName === 'SCRIPT') {
      return
    }

    child.style.setProperty('position', 'absolute')
    child.style.setProperty('inset', '0')
    child.style.setProperty('width', '100%', 'important')
    child.style.setProperty('height', '100%', 'important')
    child.style.setProperty('display', 'block')
  })

  Array.from(container.querySelectorAll('iframe')).forEach((iframeElement) => {
    iframeElement.style.setProperty('position', 'absolute')
    iframeElement.style.setProperty('inset', '0')
    iframeElement.style.setProperty('width', '100%', 'important')
    iframeElement.style.setProperty('height', '100%', 'important')
    iframeElement.style.setProperty('display', 'block')
  })
}

/**
 * Telegram 官方登录控件封装：
 * - 通过脚本注入创建登录按钮；
 * - 登录成功后回调 `onAuth`，由页面继续走服务端验签流程。
 */
export function TelegramLoginWidget(props: TelegramLoginWidgetProps) {
  const { botUsername, disabled = false, onAuth, onError, children, className } = props
  const containerRef = useRef<HTMLDivElement | null>(null)
  const onAuthRef = useRef(onAuth)
  const onErrorRef = useRef(onError)
  const hasCustomTrigger: boolean = Boolean(children)

  /**
   * 将外部回调同步到 ref：
   * - 避免把 onAuth/onError 放到脚本注入 effect 依赖中；
   * - 防止父组件重渲染时反复销毁并重建 Telegram widget。
   */
  useEffect(() => {
    onAuthRef.current = onAuth
  }, [onAuth])

  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !botUsername || disabled) {
      return
    }

    container.innerHTML = ''
    if (hasCustomTrigger) {
      applyTelegramWidgetFrameStyles(container)
    }

    window.__luciusTelegramWidgetAuth = (user: TelegramWidgetAuthUser) => {
      onAuthRef.current(user)
    }

    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?22'
    script.async = true
    script.setAttribute('data-telegram-login', botUsername)
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-userpic', 'false')
    script.setAttribute('data-request-access', 'write')
    script.setAttribute('data-onauth', '__luciusTelegramWidgetAuth(user)')
    script.setAttribute('data-radius', '8')

    script.onerror = () => {
      onErrorRef.current?.(m.telegram_widget_load_error())
    }

    container.appendChild(script)

    /**
     * Telegram widget 会在脚本执行后异步插入 iframe。
     * 这里监听 DOM 变化，确保 iframe 始终铺满自定义按钮区域。
     */
    const mutationObserver = hasCustomTrigger
      ? new MutationObserver(() => {
          applyTelegramWidgetFrameStyles(container)
        })
      : null

    mutationObserver?.observe(container, {
      childList: true,
      subtree: true,
    })

    const animationFrameId = hasCustomTrigger
      ? window.requestAnimationFrame(() => {
          applyTelegramWidgetFrameStyles(container)
        })
      : null

    return () => {
      mutationObserver?.disconnect()
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }
      container.innerHTML = ''
      delete window.__luciusTelegramWidgetAuth
    }
  }, [botUsername, disabled, hasCustomTrigger])

  return (
    <div
      className={cn(
        hasCustomTrigger ? 'group relative inline-flex max-w-full overflow-hidden rounded-md cursor-pointer' : 'relative min-h-[40px]',
        disabled ? 'opacity-60' : '',
        className,
      )}
    >
      {hasCustomTrigger ? <div className="relative z-0 pointer-events-none">{children}</div> : null}
      <div
        ref={containerRef}
        className={cn(
          hasCustomTrigger ? 'absolute inset-0 rounded-md' : '',
          disabled ? 'pointer-events-none opacity-60' : '',
        )}
      />
    </div>
  )
}
