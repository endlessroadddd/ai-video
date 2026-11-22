import { describe, expect, it } from 'vitest'

import {
  DEFAULT_COMPANY_EVENT_TYPES,
  EVENT_TYPE_OWNER_TARGET_SOURCE,
  buildDefaultEmailNotificationTargetSeedRows,
  buildDefaultEventTypeConfigSeedRows,
} from '@/lib/default-company-event-types'

describe('default-company-event-types', () => {
  it('应输出 8 个默认事件类型配置', () => {
    const rows = buildDefaultEventTypeConfigSeedRows({
      companyId: '11111111-1111-4111-8111-111111111111',
    })

    expect(rows).toHaveLength(DEFAULT_COMPANY_EVENT_TYPES.length)
    expect(rows.map((item) => item.type_key)).toEqual([
      'EXCEPTION_ISSUE',
      'USAGE_ISSUE',
      'ORDER_ISSUE',
      'BUSINESS_COOPERATION',
      'PRODUCT_FEEDBACK',
      'UNRECOGNIZED_INFORMATION',
      'ADVERTISEMENT',
      'MESSAGE_DELETION',
    ])
    expect(rows.map((item) => item.type_label)).toEqual([
      'Exception Issue',
      'Usage Issue',
      'Order Issue',
      'Business Cooperation',
      'Product Feedback',
      'Unrecognized Information',
      'Advertisement',
      'Message Deletion',
    ])
    expect(rows.every((item) => item.is_system && item.is_active)).toBe(true)
    expect(rows.every((item) => item.manual_review_enabled === false)).toBe(true)
  })

  it('应为每个默认类型构造一条 owner 邮箱通知目标', () => {
    const typeConfigs = DEFAULT_COMPANY_EVENT_TYPES.map((item, index) => ({
      id: `type-config-${index + 1}`,
      typeKey: item.typeKey,
    }))

    const rows = buildDefaultEmailNotificationTargetSeedRows({
      ownerEmail: 'owner@example.com',
      ownerMemberId: 'member-1',
      ownerUserId: 'user-1',
      typeConfigs,
    })

    expect(rows).toHaveLength(DEFAULT_COMPANY_EVENT_TYPES.length)
    expect(rows.every((item) => item.channel === 'email')).toBe(true)
    expect(rows.every((item) => item.target === 'owner@example.com')).toBe(true)
    expect(rows.every((item) => item.notify_mode === 'once')).toBe(true)
    expect(rows.every((item) => item.is_default)).toBe(true)
    expect(rows.every((item) => item.extra_config.source === EVENT_TYPE_OWNER_TARGET_SOURCE)).toBe(true)
    expect(rows.every((item) => item.extra_config.member_id === 'member-1')).toBe(true)
    expect(rows.every((item) => item.extra_config.member_user_id === 'user-1')).toBe(true)
  })
})
