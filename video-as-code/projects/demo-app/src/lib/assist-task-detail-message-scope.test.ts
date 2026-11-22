import { describe, expect, it } from 'vitest'

import { resolveAssistTaskDetailMessageScope } from '@/lib/assist-task-detail-message-scope'

describe('assist-task-detail-message-scope', () => {
  it('Website 已接手任务应切到 session 级消息范围', () => {
    expect(
      resolveAssistTaskDetailMessageScope({
        platform: ' website ',
        displayStatus: 'taken_over',
      }),
    ).toBe('website_session')
  })

  it('Website 待处理任务仍应保持 event 级消息范围', () => {
    expect(
      resolveAssistTaskDetailMessageScope({
        platform: 'website',
        displayStatus: 'pending',
      }),
    ).toBe('event')
  })

  it('非 Website 平台即使已接手也不应扩大到 session 范围', () => {
    expect(
      resolveAssistTaskDetailMessageScope({
        platform: 'slack',
        displayStatus: 'taken_over',
      }),
    ).toBe('event')
  })
})
