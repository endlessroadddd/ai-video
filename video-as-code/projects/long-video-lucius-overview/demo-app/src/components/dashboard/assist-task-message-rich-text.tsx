import { Fragment } from 'react'

import { buildAssistTaskMessageSegments } from '@/lib/assist-task-message-mention'
import { cn } from '@/lib/utils'

type AssistTaskMessageRichTextProps = {
  content: string
  platform: string
  eventUserId?: string | null
  eventUserDisplayName?: string | null
  className?: string
}

/**
 * 事件详情里的消息正文不再直接裸渲染平台协议文本：
 * - 统一把 mention 标记转换成可读的 inline chip；
 * - 其余正文仍保持纯文本展示，避免引入额外 HTML 注入风险。
 */
export function AssistTaskMessageRichText(
  props: AssistTaskMessageRichTextProps,
) {
  const segments = buildAssistTaskMessageSegments({
    content: props.content,
    platform: props.platform,
    eventUserId: props.eventUserId,
    eventUserDisplayName: props.eventUserDisplayName,
  })

  return (
    <p className={cn('dashboard-message-rich-text', props.className)}>
      {segments.map((segment, index) => {
        if (segment.kind === 'text') {
          return <Fragment key={`text-${index}`}>{segment.text}</Fragment>
        }

        return (
          <span
            key={`mention-${segment.platform}-${index}`}
            title={segment.rawText}
            className={cn(
              'dashboard-message-mention',
              `dashboard-message-mention--${segment.platform}`,
            )}
          >
            {segment.label}
          </span>
        )
      })}
    </p>
  )
}
