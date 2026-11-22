import { describe, expect, it } from 'vitest'

import { resolveAssistTaskStatusIconTone } from '@/lib/assist-task-status-icon'

describe('resolveAssistTaskStatusIconTone', () => {
  it('pending 应显示待处理图标', () => {
    expect(resolveAssistTaskStatusIconTone('pending', null)).toBe('pending')
  })

  it('processing 应显示已接手图标', () => {
    expect(resolveAssistTaskStatusIconTone('processing', null)).toBe('taken_over')
  })

  it('resolved 应显示已处理图标', () => {
    expect(resolveAssistTaskStatusIconTone('resolved', null)).toBe('handled')
  })

  it('done 应显示已处理图标', () => {
    expect(resolveAssistTaskStatusIconTone('done', null)).toBe('handled')
  })

  it('ignored 应显示忽略图标', () => {
    expect(resolveAssistTaskStatusIconTone('ignored', null)).toBe('ignored')
  })

  it('未知状态但 urgent 优先级应显示紧急图标', () => {
    expect(resolveAssistTaskStatusIconTone('queued', 'urgent')).toBe('urgent')
  })
})
