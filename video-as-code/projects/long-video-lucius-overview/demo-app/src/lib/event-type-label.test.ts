import { afterEach, describe, expect, it } from 'vitest'

import { toReadableEventTypeLabel } from '@/lib/event-type-label'
import { overwriteGetLocale } from '@/paraglide/runtime'

describe('event-type-label', () => {
  afterEach(() => {
    overwriteGetLocale(() => 'en')
  })

  it('应为默认系统事件类型返回中文国际化文案', () => {
    overwriteGetLocale(() => 'zh')

    expect(toReadableEventTypeLabel('EXCEPTION_ISSUE', 'Exception Issue')).toBe('异常问题')
    expect(toReadableEventTypeLabel('MESSAGE_DELETION', 'Message Deletion')).toBe('消息删除')
  })

  it('应优先保留自定义事件类型的数据库 label', () => {
    overwriteGetLocale(() => 'zh')

    expect(toReadableEventTypeLabel('CUSTOM_ESCALATION', '升级处理')).toBe('升级处理')
  })

  it('在缺少 label 时应回退为 key 的可读格式', () => {
    overwriteGetLocale(() => 'en')

    expect(toReadableEventTypeLabel('CUSTOM_ESCALATION')).toBe('Custom Escalation')
  })
})
