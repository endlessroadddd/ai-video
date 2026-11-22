/**
 * 新 company 的默认 Flow：
 * - 统一在工作区 bootstrap 阶段直接写入 `lucius_agent.flow`；
 * - 这些 Flow 属于公司级默认规则，还没有具体频道绑定，因此先写空 channel_id。
 */
export const DEFAULT_COMPANY_FLOW_PLATFORM = 'client'
export const DEFAULT_COMPANY_FLOW_CHANNEL_ID = ''

export type DefaultCompanyFlowDefinition = {
  title: string
  description: string
  logic: string
  requiredTools: string[]
}

type DefaultCompanyFlowSeedRow = {
  company_id: string
  title: string
  description: string
  logic: string
  required_tools: string[]
  cron: string
  platform: typeof DEFAULT_COMPANY_FLOW_PLATFORM
  channel_id: string
  message_ids: string[]
}

const ADVERTISEMENT_DELETE_FLOW_LOGIC = [
  '1. 识别消息是否为广告或推广内容（包含外部商业链接、促销信息、无关推广等）。',
  '2. 若判断为广告，直接调用 interaction 工具删除该消息，operation 为 delete。',
  '3. 不发送任何回复或说明。',
  '4. 若删除失败，创建一个事件记录，标题为"广告消息删除失败，需人工处理"，供团队跟进。',
].join('\n')

const USER_QUESTION_CONFIRMATION_FLOW_LOGIC = [
  '触发条件：',
  '在群聊里检测到用户提出问题（任何类型的问题）',
  '执行步骤：',
  '1. 识别与分析',
  '   - 判断消息是否为用户提问（非闲聊、非广告等）',
  '   - 提取关键信息：用户名、问题内容、问题类型',
  '2. 准备拟回复内容',
  '   - 基于现有知识库搜索相关信息',
  '   - 起草拟回复内容',
  '   - 标注不确定的部分',
  '   - 重要：即使之前回复过类似问题，也不能直接回复，必须走工单流程',
  '3. 创建工单',
  '   - 标题：简要描述用户问题',
  '   - 摘要包含：',
  '     * 用户问题原文',
  '     * 拟回复内容',
  '     * 不确定点说明（如有）',
  '     * 如果之前回复过类似问题，可以注明"之前回复过类似内容：XXX"',
  '     * 请求员工确认或修改',
  '4. 等待二次确认',
  '   - 绝对不向 Telegram 用户发送任何回复',
  '   - 不向用户发送"请稍等"等过渡消息',
  '   - 等待员工确认',
  '   - 即使有现成答案、即使之前回复过，也必须等待确认',
  '5. 确认后执行回复',
  '   - 收到员工确认后，按确认内容去原平台回复用户',
  '   - 通过"完成知识请求工单后回复用户"流程回复原平台原频道',
  '关键原则：',
  '- 此流程优先级最高，覆盖所有其他回复逻辑',
  '- 用户提问都必须经过此流程',
  '- 不得跳过二次确认直接回复',
  '- 不得因为"之前回复过"、"知道答案"、"有现成回复"等任何理由直接回复',
  '- 每次提问都是新的工单，都需要二次确认',
].join('\n')

/**
 * 默认 Flow 定义：
 * - 广告处理仅允许删除消息和失败兜底建事件；
 * - 用户提问二次确认只允许搜知识和建事件，避免绕过确认直接回复。
 */
export const DEFAULT_COMPANY_FLOWS: ReadonlyArray<DefaultCompanyFlowDefinition> = [
  {
    title: '广告消息自动删除规则',
    description: '当频道中出现用户（非员工）广告推广内容（如外部商业链接、促销信息等）时，直接删除该消息，不作任何回复或说明。',
    logic: ADVERTISEMENT_DELETE_FLOW_LOGIC,
    requiredTools: ['interaction', 'create_event'],
  },
  {
    title: '用户提问二次确认流程',
    description:
      '你必须在用户（非员工）每次提问时都遵守该规则。群里检测到用户提问时触发。即使知道答案、即使之前回复过类似内容，也禁止直接回复，先创建工单，填入问题摘要和拟回复内容，等待被二次确认后再发出回复。',
    logic: USER_QUESTION_CONFIRMATION_FLOW_LOGIC,
    requiredTools: ['search_knowledge', 'create_event'],
  },
] as const

/**
 * 构造默认 Flow 写入 payload：
 * - `cron` 置空，明确表示这是实时规则而不是定时任务；
 * - `channel_id` 先写空字符串，表达“当前还没有频道级绑定”；
 * - `platform` 仍需保留合法枚举值，否则当前 `lucius_agent.flow` 表无法插入。
 */
export function buildDefaultCompanyFlowSeedRows(payload: {
  companyId: string
}): DefaultCompanyFlowSeedRow[] {
  return DEFAULT_COMPANY_FLOWS.map((item) => ({
    company_id: payload.companyId,
    title: item.title,
    description: item.description,
    logic: item.logic,
    required_tools: item.requiredTools,
    cron: '',
    platform: DEFAULT_COMPANY_FLOW_PLATFORM,
    channel_id: DEFAULT_COMPANY_FLOW_CHANNEL_ID,
    message_ids: [],
  }))
}
