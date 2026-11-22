import { describe, expect, it } from 'vitest'

import { shouldShowAssistTaskLifecycleActionBar, type AssistTaskLifecycleActionBarVisibilityParams } from '@/lib/assist-task-detail-actions'

function createActionBarVisibilityParams(
  overrides: Partial<AssistTaskLifecycleActionBarVisibilityParams> = {},
): AssistTaskLifecycleActionBarVisibilityParams {
  return {
    canTakeOver: true,
    canIgnore: true,
    ...overrides,
  }
}

describe('assist-task-detail-actions', () => {
  it('已接手 / 已忽略态没有可执行动作时不应显示生命周期操作条', () => {
    expect(
      shouldShowAssistTaskLifecycleActionBar(
        createActionBarVisibilityParams({
          canTakeOver: false,
          canIgnore: false,
        }),
      ),
    ).toBe(false)
  })

  it('普通待处理事件仍应显示接管操作条', () => {
    expect(
      shouldShowAssistTaskLifecycleActionBar(
        createActionBarVisibilityParams(),
      ),
    ).toBe(true)
  })

  it('只剩忽略动作时仍应显示操作条，保证 pending 事件可被显式忽略', () => {
    expect(
      shouldShowAssistTaskLifecycleActionBar(
        createActionBarVisibilityParams({
          canTakeOver: false,
        }),
      ),
    ).toBe(true)
  })

  it('无任何状态动作时应隐藏操作条', () => {
    expect(
      shouldShowAssistTaskLifecycleActionBar(
        createActionBarVisibilityParams({
          canTakeOver: false,
          canIgnore: false,
        }),
      ),
    ).toBe(false)
  })
})
