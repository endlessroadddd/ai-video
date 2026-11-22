/**
 * 事件类型默认通知目标来源标识：
 * - 与 Event Settings 页面使用的来源标识保持一致；
 * - 这样服务端初始化写入的默认邮箱通知，前端可以直接按同一规则回读与展示。
 */
export const EVENT_TYPE_OWNER_TARGET_SOURCE = 'event_type_owner_selector_v1'

export type DefaultCompanyEventTypeDefinition = {
  typeKey: string
  typeLabel: string
  description: string
  sortOrder: number
}

/**
 * 新公司默认事件类型：
 * - 统一由数据库持久化，不再依赖前端硬编码展示；
 * - `typeKey` 使用稳定的大写 snake_case，便于事件流转、筛选与后续规则扩展。
 */
export const DEFAULT_COMPANY_EVENT_TYPES: ReadonlyArray<DefaultCompanyEventTypeDefinition> = [
  {
    typeKey: 'EXCEPTION_ISSUE',
    typeLabel: 'Exception Issue',
    description: '产品出现异常状态时的诊断和解决方案。',
    sortOrder: 10,
  },
  {
    typeKey: 'USAGE_ISSUE',
    typeLabel: 'Usage Issue',
    description: '正常状态下的功能介绍、操作方法、功能限制说明。',
    sortOrder: 20,
  },
  {
    typeKey: 'ORDER_ISSUE',
    typeLabel: 'Order Issue',
    description: '付款、退款、定价、订阅管理、折扣、发票、积分。',
    sortOrder: 30,
  },
  {
    typeKey: 'BUSINESS_COOPERATION',
    typeLabel: 'Business Cooperation',
    description: '商务合作、渠道合作、企业采购等合作诉求。',
    sortOrder: 40,
  },
  {
    typeKey: 'PRODUCT_FEEDBACK',
    typeLabel: 'Product Feedback',
    description: '产品建议、体验反馈、需求收集。',
    sortOrder: 50,
  },
  {
    typeKey: 'UNRECOGNIZED_INFORMATION',
    typeLabel: 'Unrecognized Information',
    description: '链接、视频等暂时无法直接识别或提取结构化信息的内容。',
    sortOrder: 60,
  },
  {
    typeKey: 'ADVERTISEMENT',
    typeLabel: 'Advertisement',
    description: '营销推广、垃圾内容或与业务无关的宣传信息。',
    sortOrder: 70,
  },
  {
    typeKey: 'MESSAGE_DELETION',
    typeLabel: 'Message Deletion',
    description: 'Lucius 消息被删除。',
    sortOrder: 80,
  },
] as const

type DefaultEventTypeConfigSeedRow = {
  company_id: string
  type_key: string
  type_label: string
  description: string
  manual_review_enabled: boolean
  sort_order: number
  is_system: boolean
  is_active: boolean
}

type DefaultEmailNotificationTargetSeedRow = {
  type_config_id: string
  channel: 'email'
  notify_channel_id: string
  notify_channel_name: null
  target: string
  display_name: string
  notify_mode: 'once'
  repeat_interval_minutes: null
  is_active: boolean
  is_default: boolean
  extra_config: {
    source: string
    type_key: string
    member_id: string
    member_user_id: string
    notify_kind: 'email'
  }
}

/**
 * 构造默认事件类型配置写入 payload：
 * - 新 company 创建完成后，直接批量 upsert 到 `lucius_agent.event_type_config`；
 * - 所有默认类型统一标记为 system + active。
 */
export function buildDefaultEventTypeConfigSeedRows(payload: {
  companyId: string
}): DefaultEventTypeConfigSeedRow[] {
  return DEFAULT_COMPANY_EVENT_TYPES.map((item) => ({
    company_id: payload.companyId,
    type_key: item.typeKey,
    type_label: item.typeLabel,
    description: item.description,
    manual_review_enabled: false,
    sort_order: item.sortOrder,
    is_system: true,
    is_active: true,
  }))
}

/**
 * 构造默认邮箱通知目标：
 * - 每个默认事件类型都给当前 owner 建一条邮箱通知；
 * - `extra_config` 带上 member_id / user_id，保证设置页能直接回显“负责人已选中”。
 */
export function buildDefaultEmailNotificationTargetSeedRows(payload: {
  ownerEmail: string
  ownerMemberId: string
  ownerUserId: string
  typeConfigs: Array<{
    id: string
    typeKey: string
  }>
}): DefaultEmailNotificationTargetSeedRow[] {
  return payload.typeConfigs.map((typeConfig) => ({
    type_config_id: typeConfig.id,
    channel: 'email',
    notify_channel_id: '',
    notify_channel_name: null,
    target: payload.ownerEmail,
    display_name: payload.ownerEmail,
    notify_mode: 'once',
    repeat_interval_minutes: null,
    is_active: true,
    is_default: true,
    extra_config: {
      source: EVENT_TYPE_OWNER_TARGET_SOURCE,
      type_key: typeConfig.typeKey,
      member_id: payload.ownerMemberId,
      member_user_id: payload.ownerUserId,
      notify_kind: 'email',
    },
  }))
}
