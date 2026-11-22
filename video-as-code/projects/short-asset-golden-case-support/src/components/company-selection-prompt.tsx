import { Building2 } from 'lucide-react'

import { cn } from '@/lib/utils'

export type CompanySelectionPromptLayout = 'inline' | 'centered'
export type CompanySelectionPromptDensity = 'default' | 'compact'

type CompanySelectionPromptProps = {
  message: string
  className?: string
  layout?: CompanySelectionPromptLayout
  density?: CompanySelectionPromptDensity
}

/**
 * 未选公司提示统一组件：
 * - 把 icon、边框、留白和文字层级集中收口，避免各页面继续各写一套；
 * - 不绑定具体文案，页面仍然通过 i18n message 传入，保证业务语义不丢失。
 */
export function CompanySelectionPrompt(props: CompanySelectionPromptProps) {
  const {
    message,
    className,
    layout = 'inline',
    density = 'default',
  } = props

  return (
    <div
      className={cn('dashboard-company-selection-prompt', className)}
      data-layout={layout}
      data-density={density}
    >
      <span className="dashboard-company-selection-prompt__icon" aria-hidden="true">
        <Building2 className="h-[18px] w-[18px]" strokeWidth={1.9} />
      </span>
      <p className="dashboard-company-selection-prompt__message">{message}</p>
    </div>
  )
}
