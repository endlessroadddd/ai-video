import { Loader2 } from 'lucide-react'

import { TelegramLoginWidget } from '@/components/telegram-login-widget'
import { Button } from '@/components/ui/button'
import type { TelegramWidgetAuthUser } from '@/lib/services/telegram-integration-api'
import { cn } from '@/lib/utils'

type PlatformLoginButtonBaseProps = {
  disabled?: boolean
  isLoading?: boolean
  label: string
  loadingLabel: string
  className?: string
  buttonClassName?: string
}

type TelegramPlatformLoginButtonProps = PlatformLoginButtonBaseProps & {
  telegramBotUsername: string
  onAuth: (user: TelegramWidgetAuthUser) => void
  onError?: (message: string) => void
  onClick?: never
}

type StandardPlatformLoginButtonProps = PlatformLoginButtonBaseProps & {
  onClick: () => void
  telegramBotUsername?: never
  onAuth?: never
  onError?: never
}

type PlatformLoginButtonProps =
  | TelegramPlatformLoginButtonProps
  | StandardPlatformLoginButtonProps

/**
 * 区分 Telegram widget 模式与普通 OAuth 按钮模式：
 * - 不能只用 `'telegramBotUsername' in props`，因为另一个分支里该字段是可选 never；
 * - 这里显式要求它是非空字符串，确保 TypeScript 正确完成收窄。
 */
function isTelegramPlatformLoginButton(
  props: PlatformLoginButtonProps,
): props is TelegramPlatformLoginButtonProps {
  return typeof props.telegramBotUsername === 'string' && props.telegramBotUsername.length > 0
}

/**
 * 统一的平台登录按钮：
 * - 普通 OAuth 平台直接渲染项目内 Button，并在点击后跳转授权页；
 * - Telegram 通过官方 widget 承接登录，但外观与 loading 态保持一致；
 * - 调用方只关心“按钮文案、loading 文案、点击/认证回调”，不再重复写按钮样板代码。
 */
export function PlatformLoginButton(props: PlatformLoginButtonProps) {
  const {
    disabled = false,
    isLoading = false,
    label,
    loadingLabel,
    className,
    buttonClassName,
  } = props
  const isDisabled: boolean = disabled || isLoading

  const buttonContent = (
    <Button
      type="button"
      variant="dashboardPrimary"
      size="sm"
      disabled={isDisabled}
      className={cn(
        props.telegramBotUsername
          ? 'pointer-events-none group-hover:bg-[var(--dashboard-action-primary-hover-bg)] group-focus-within:bg-[var(--dashboard-action-primary-hover-bg)]'
          : '',
        buttonClassName,
      )}
      onClick={'onClick' in props ? props.onClick : undefined}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  )

  if (isTelegramPlatformLoginButton(props)) {
    return (
      <TelegramLoginWidget
        botUsername={props.telegramBotUsername}
        disabled={isDisabled}
        className={cn('inline-flex', className)}
        onAuth={props.onAuth}
        onError={props.onError}
      >
        {buttonContent}
      </TelegramLoginWidget>
    )
  }

  return <div className={className}>{buttonContent}</div>
}
