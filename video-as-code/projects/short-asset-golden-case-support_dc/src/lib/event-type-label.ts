import { m } from '@/paraglide/messages'

type EventTypeLabelMessageOptions = {
  locale?: 'en' | 'zh'
}

type EventTypeLabelResolver = (options?: EventTypeLabelMessageOptions) => string

/**
 * 默认事件类型国际化映射：
 * - 只覆盖系统默认 type_key，保证数据库里存英文 label 时，界面仍能按当前语言展示；
 * - 自定义类型继续优先使用数据库中的 `type_label`，避免覆盖用户自定义命名。
 */
const DEFAULT_EVENT_TYPE_LABEL_RESOLVERS: Record<string, EventTypeLabelResolver> = {
  EXCEPTION_ISSUE: (options) => m.event_type_label_exception_issue({}, options),
  USAGE_ISSUE: (options) => m.event_type_label_usage_issue({}, options),
  ORDER_ISSUE: (options) => m.event_type_label_order_issue({}, options),
  BUSINESS_COOPERATION: (options) => m.event_type_label_business_cooperation({}, options),
  PRODUCT_FEEDBACK: (options) => m.event_type_label_product_feedback({}, options),
  UNRECOGNIZED_INFORMATION: (options) => m.event_type_label_unrecognized_information({}, options),
  ADVERTISEMENT: (options) => m.event_type_label_advertisement({}, options),
  MESSAGE_DELETION: (options) => m.event_type_label_message_deletion({}, options),
}

/**
 * 归一化事件类型 key：
 * - label 国际化映射只依赖稳定的 `type_key`；
 * - 这里统一 trim + 大写，避免历史数据大小写不一致导致映射失效。
 */
function normalizeEventTypeKey(rawTypeKey: string): string {
  return rawTypeKey.trim().toUpperCase()
}

/**
 * 读取默认事件类型的本地化文案：
 * - 命中系统默认类型时返回翻译；
 * - 非默认类型返回 `null`，交由调用方走数据库 label 或兜底格式化。
 */
export function getLocalizedDefaultEventTypeLabel(
  rawTypeKey: string,
  options?: EventTypeLabelMessageOptions,
): string | null {
  const normalizedTypeKey = normalizeEventTypeKey(rawTypeKey)
  if (!normalizedTypeKey) {
    return null
  }

  const resolver = DEFAULT_EVENT_TYPE_LABEL_RESOLVERS[normalizedTypeKey]
  return resolver ? resolver(options) : null
}

/**
 * 统一把事件类型转换成界面可读文案：
 * - 默认系统类型优先按 `type_key` 做国际化，不依赖数据库存储语言；
 * - 非系统类型优先使用数据库自定义 label；
 * - 两者都缺失时，再退回 `TYPE_KEY -> Title Case`。
 */
export function toReadableEventTypeLabel(
  rawTypeKey: string,
  rawTypeLabel?: string | null,
  options?: EventTypeLabelMessageOptions,
): string {
  const localizedDefaultLabel = getLocalizedDefaultEventTypeLabel(rawTypeKey, options)
  if (localizedDefaultLabel) {
    return localizedDefaultLabel
  }

  const normalizedTypeLabel = (rawTypeLabel || '').trim()
  if (normalizedTypeLabel) {
    return normalizedTypeLabel
  }

  const normalizedTypeKey = normalizeEventTypeKey(rawTypeKey)
  if (!normalizedTypeKey) {
    return m.event_settings_unnamed_type({}, options)
  }

  return normalizedTypeKey
    .split('_')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase())
    .join(' ')
}
