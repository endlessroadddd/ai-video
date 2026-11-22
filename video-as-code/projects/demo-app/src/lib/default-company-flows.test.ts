import { describe, expect, it } from 'vitest'

import {
  DEFAULT_COMPANY_FLOW_CHANNEL_ID,
  DEFAULT_COMPANY_FLOW_PLATFORM,
  DEFAULT_COMPANY_FLOWS,
  buildDefaultCompanyFlowSeedRows,
} from '@/lib/default-company-flows'

describe('default-company-flows', () => {
  it('应构造两条默认 flow seed', () => {
    const rows = buildDefaultCompanyFlowSeedRows({
      companyId: '11111111-1111-4111-8111-111111111111',
    })

    expect(rows).toHaveLength(2)
    expect(rows).toEqual([
      {
        company_id: '11111111-1111-4111-8111-111111111111',
        title: '广告消息自动删除规则',
        description:
          '当频道中出现用户（非员工）广告推广内容（如外部商业链接、促销信息等）时，直接删除该消息，不作任何回复或说明。',
        logic: expect.stringContaining('若判断为广告，直接调用 interaction 工具删除该消息'),
        required_tools: ['interaction', 'create_event'],
        cron: '',
        platform: DEFAULT_COMPANY_FLOW_PLATFORM,
        channel_id: DEFAULT_COMPANY_FLOW_CHANNEL_ID,
        message_ids: [],
      },
      {
        company_id: '11111111-1111-4111-8111-111111111111',
        title: '用户提问二次确认流程',
        description:
          '你必须在用户（非员工）每次提问时都遵守该规则。群里检测到用户提问时触发。即使知道答案、即使之前回复过类似内容，也禁止直接回复，先创建工单，填入问题摘要和拟回复内容，等待被二次确认后再发出回复。',
        logic: expect.stringContaining('绝对不向 Telegram 用户发送任何回复'),
        required_tools: ['search_knowledge', 'create_event'],
        cron: '',
        platform: DEFAULT_COMPANY_FLOW_PLATFORM,
        channel_id: DEFAULT_COMPANY_FLOW_CHANNEL_ID,
        message_ids: [],
      },
    ])
  })

  it('默认 flow 定义应保持标题稳定，避免后续查询失配', () => {
    expect(DEFAULT_COMPANY_FLOWS.map((item) => item.title)).toEqual([
      '广告消息自动删除规则',
      '用户提问二次确认流程',
    ])
  })
})
