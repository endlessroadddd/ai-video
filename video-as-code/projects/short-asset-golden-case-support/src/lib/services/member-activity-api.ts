import { m } from '@/paraglide/messages'

async function parseActivityResponse(response: Response): Promise<void> {
  if (response.ok) {
    return
  }

  const payload = (await response.json().catch(() => null)) as { error?: string } | null
  throw new Error(payload?.error || m.service_member_activity_report_failed())
}

/**
 * 上报当前成员在指定公司的活跃心跳。
 *
 * 说明：
 * - 该接口不承载业务动作，只负责刷新 `organization_member.last_active_at`；
 * - 由全局 tracker 调用，避免把“活跃时间”绑死在任意单个页面。
 */
export async function reportMemberActivity(payload: { companyId: string }): Promise<void> {
  const response = await fetch('/api/member-activity/ping', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  })

  await parseActivityResponse(response)
}
