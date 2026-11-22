export type AssistTaskStatusIconTone = 'pending' | 'urgent' | 'taken_over' | 'handled' | 'ignored'

/**
 * 统一解析任务列表左侧状态图标：
 * - 列表筛选层虽然把 `resolved` 继续归到“已接手”分组，但图标需要保留更细颗粒度的状态反馈；
 * - `processing` 代表“有人接手、仍在处理中”，继续显示处理中图标；
 * - `resolved / closed / done` 代表生命周期已经完成，恢复显示绿色完成勾；
 * - `ignored` 维持单独的灰色忽略图标；
 * - 未识别状态时，仅在高优先级场景回退到 `urgent`，其余默认按 `pending` 处理。
 */
export function resolveAssistTaskStatusIconTone(
  status: string | null,
  priority: string | null,
): AssistTaskStatusIconTone {
  const normalizedStatus = (status || '').trim().toLowerCase()
  const normalizedPriority = (priority || '').trim().toLowerCase()

  if (normalizedStatus === 'ignored') {
    return 'ignored'
  }

  if (['resolved', 'closed', 'done'].includes(normalizedStatus)) {
    return 'handled'
  }

  if (normalizedStatus === 'processing') {
    return 'taken_over'
  }

  if (normalizedPriority === 'urgent') {
    return 'urgent'
  }

  return 'pending'
}
