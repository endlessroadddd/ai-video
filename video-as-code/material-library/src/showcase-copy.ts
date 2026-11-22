import type {
  MaterialLibraryCatalogEntry,
  MaterialNarrativeRole,
  MaterialReuseMode,
  MaterialVisualWeight,
} from "./material-catalog";
import { MATERIAL_LIBRARY_ASSET_IDS } from "./meta/ids";

export type ShowcasePreviewabilityFilter = "all" | "previewable" | "code-only";

export type ShowcaseFilterState = {
  previewability: ShowcasePreviewabilityFilter;
  query: string;
  reuseMode: MaterialReuseMode | "all";
  role: MaterialNarrativeRole | "all";
  visualWeight: MaterialVisualWeight | "all";
};

export type ShowcaseHumanCopy = {
  adaptQuickZh: string[];
  avoidZh: string[];
  bestForZh: string[];
  groupLabelZh?: string;
  summaryZh: string;
  titleZh?: string;
};

export type ShowcaseBrowseEntry = MaterialLibraryCatalogEntry & {
  adaptQuickUi: string[];
  bestForUi: string[];
  cueText: string[];
  curatedOrder: number;
  hasPreview: boolean;
  humanCopy: ShowcaseHumanCopy;
  previewStateLabelZh: string;
  reuseLabelZh: string;
  roleLabelZh: string;
  stabilityLabelZh: string;
  summaryForUi: string;
  titleForUi: string;
  avoidUi: string[];
  weightLabelZh: string;
};

export const SHOWCASE_ROLE_LABELS_ZH: Record<MaterialNarrativeRole, string> = {
  transition: "转场",
  accent: "强调",
  component: "组件",
  shell: "壳层",
  proof: "证据",
  environment: "场景",
  helper: "辅助",
};

export const SHOWCASE_REUSE_LABELS_ZH: Record<MaterialReuseMode, string> = {
  "drop-in": "可直接复用",
  "tweak-copy": "改文案即可",
  "tweak-layout": "要改结构",
  "heavy-adaptation": "需重度改造",
};

export const SHOWCASE_WEIGHT_LABELS_ZH: Record<MaterialVisualWeight, string> = {
  micro: "极轻",
  light: "轻量",
  medium: "中等",
  heavy: "偏重",
  "full-scene": "整场景",
};

export const SHOWCASE_PREVIEWABILITY_LABELS_ZH: Record<ShowcasePreviewabilityFilter, string> = {
  all: "全部",
  previewable: "可预览",
  "code-only": "仅代码",
};

const STABILITY_LABELS_ZH = {
  stable: "稳定",
  beta: "测试中",
} as const;

export const SHOWCASE_HUMAN_COPY_BY_ID: Partial<Record<string, ShowcaseHumanCopy>> = {
  [MATERIAL_LIBRARY_ASSET_IDS.ANIMATED_EMOJI]: {
    titleZh: "动态 Emoji",
    summaryZh: "给聊天内容补一个很轻的情绪点，适合小庆祝、小惊讶、小认同这类瞬时反应。",
    bestForZh: ["消息已经讲清楚了，只差一个轻情绪点。", "想让聊天更像真实对话，而不是死板文本。"],
    avoidZh: ["不适合拿它当整页主视觉。", "离线或严格禁外部资源的环境里不要优先选它。"],
    adaptQuickZh: ["先改 emoji 和尺寸。", "再调出现时机，不要一上来就堆很多个。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.ASSIST_TASK_RICH_TEXT]: {
    titleZh: "任务富文本消息",
    summaryZh: "把任务消息里的 mention、链接和平台语义保留下来，适合做“消息本身就是操作入口”的场景。",
    bestForZh: ["任务消息里需要明显的 @人、链接或平台语义。", "想展示机器人/协作消息，而不是普通聊天气泡。"],
    avoidZh: ["不适合拿来承载长篇正文。", "如果只是普通聊天文本，优先用 Chat Bubble。"],
    adaptQuickZh: ["先改文案和 mention 目标。", "保留富文本层级，不要改成纯段落。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.AVATAR_PRESETS]: {
    titleZh: "头像预设表",
    summaryZh: "统一管理常见身份的头像风格，适合多个场景里反复出现同一批角色时复用。",
    bestForZh: ["同一角色会跨多个镜头或多个组件出现。", "想先锁身份，再去拼消息壳层。"],
    avoidZh: ["不适合当可视主素材单独展示。", "如果只是一次性头像，直接传具体头像更快。"],
    adaptQuickZh: ["先改名字映射。", "尽量别改头像风格体系本身。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.BLACK_SEND_CURSOR]: {
    titleZh: "黑色发送指针",
    summaryZh: "一个很短的发送动作强化件，用来把“点发送”这个瞬间讲得更明确。",
    bestForZh: ["需要强化发送动作的那一拍。", "聊天底部已经在画面里，只差一个操作感。"],
    avoidZh: ["不适合没有输入框的画面。", "不适合承担完整转场。"],
    adaptQuickZh: ["先调起点终点和时长。", "尽量别把它改成完全不同的手势语言。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.BRAND_TRANSITION_RING]: {
    titleZh: "品牌收束圆环",
    summaryZh: "全屏品牌收束转场，适合把前面的内容压进一个明确的品牌结尾。",
    bestForZh: ["镜头需要一个干净的品牌 close。", "前面已经有足够内容，结尾只需要收束。"],
    avoidZh: ["不适合信息密集的中段镜头。", "不适合用在小组件级别的切换。"],
    adaptQuickZh: ["先改品牌色和落点。", "保持它是“收束”而不是“展开”。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.CELEBRATION_PARTICLES]: {
    titleZh: "庆祝粒子",
    summaryZh: "比 emoji 更热闹的庆祝层，适合结果确认、修复完成、发送成功这类明确正反馈。",
    bestForZh: ["已经确认成功，需要更明显的庆祝感。", "聊天或结果卡片里需要一个更强的正反馈。"],
    avoidZh: ["不适合很严肃或压抑的镜头。", "不适合连续多段都在放，会显得吵。"],
    adaptQuickZh: ["先改颜色和数量。", "再根据镜头强度决定是保留还是减弱粒子。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.CHART_CARD_SHELL]: {
    titleZh: "图表卡片壳层",
    summaryZh: "一个偏中性的图表容器，用来包图表、标题和说明，让证据块更像产品界面。",
    bestForZh: ["图表已经有了，只差一个像产品里的卡片外壳。", "需要把标题、说明和图表收在同一块。"],
    avoidZh: ["不适合非常沉浸的整场景镜头。", "不适合没有图表内容时单独使用。"],
    adaptQuickZh: ["先改标题和辅助说明。", "再根据内容改内边距和信息层级。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.CHAT_BUBBLE]: {
    titleZh: "聊天气泡",
    summaryZh: "最基础的消息展示壳层，适合先把对话节奏搭起来，再叠加强调或证据层。",
    bestForZh: ["要快速搭起一段聊天往返。", "需要一个中性、稳定、可组合的对话基础件。"],
    avoidZh: ["不适合用来承载强证明逻辑。", "不适合替代 handoff card 这类结构化证据块。"],
    adaptQuickZh: ["先改文案和左右侧角色。", "保持气泡节奏和间距，不要把它改成卡片。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.COMPOSER_SHELL]: {
    titleZh: "输入框壳层",
    summaryZh: "聊天底部输入区，用来补全“正在输入、思考中、准备发送”的状态感。",
    bestForZh: ["画面里已经有聊天线程，只差底部输入区。", "需要表现输入、思考、准备发出等动作。"],
    avoidZh: ["不适合脱离聊天语境单独使用。", "没有输入行为时不一定需要上。"],
    adaptQuickZh: ["先改 placeholder 和状态。", "如果只是静态壳层，别叠过多动画。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.COMMAND_FLOW_CURTAIN]: {
    titleZh: "一条命令 Curtain",
    summaryZh: "适合讲“一次输入，多处执行”的大叙事转场，视觉上偏完整场景而不是小过渡。",
    bestForZh: ["要讲统一命令驱动多端执行。", "需要一个大画幅的证明型 curtain。"],
    avoidZh: ["不适合轻量情绪点。", "中小尺寸容器里不要硬塞。"],
    adaptQuickZh: ["先改中心文案和品牌语义。", "保持多端扩散的逻辑，不要改成普通标题页。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.COMMIT_PULSE_CURTAIN]: {
    titleZh: "提交脉冲 Curtain",
    summaryZh: "适合讲提交、生效、扩散这类节奏，偏“动作已经开始发生”的视觉感。",
    bestForZh: ["要讲更新被提交并开始扩散。", "镜头需要强一点的动势，但不想上整页环境。"],
    avoidZh: ["不适合静态总结页。", "不适合拿来讲聊天情绪。"],
    adaptQuickZh: ["先改脉冲文案和颜色。", "保留中心扩散感和节奏。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.KNOWLEDGE_GRAPH_CURTAIN]: {
    titleZh: "知识图谱 Curtain",
    summaryZh: "适合讲“把零散对话整理成结构化知识”的过程，信息感强、证明味重。",
    bestForZh: ["要展示知识提炼、聚合、引用回写。", "需要让观众看到信息是如何被整理出来的。"],
    avoidZh: ["不适合很短的轻量镜头。", "不适合没有信息处理过程的场景。"],
    adaptQuickZh: ["先改节点文案和主题标签。", "保留从分散到结构化的阅读路径。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.PULSE_QUEUE_CURTAIN]: {
    titleZh: "队列脉冲 Curtain",
    summaryZh: "适合讲排队、分发、推进中的任务流，偏过程展示，不是静态结论。",
    bestForZh: ["要强调任务正在排队推进。", "需要一个比普通列表更有动感的处理中场景。"],
    avoidZh: ["不适合最终结果展示。", "不适合需要很强品牌 close 的结尾。"],
    adaptQuickZh: ["先改队列文案和节奏。", "保留“推进中”的感觉，不要改成静态报表。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_AVATAR]: {
    titleZh: "Discord 风格头像",
    summaryZh: "Discord 语境下更顺眼的头像组件，用来让消息列表或社区界面更像原生环境。",
    bestForZh: ["要拼 Discord 消息列表。", "需要稳定统一的头像风格，不想每次手画。"],
    avoidZh: ["不适合拿来当主视觉。", "不是 Discord 语境时要谨慎直接套。"],
    adaptQuickZh: ["先改身份和状态。", "尽量保持 Discord 语义，不要改得过于通用。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.BREAK_IMMERSION_COMMUNITY_SCENE]: {
    titleZh: "Discord 社区场景",
    summaryZh: "完整的 Discord 多栏场景，适合用来建立社区环境或让环境本身占满画面。",
    bestForZh: ["需要一眼看出这是 Discord 社区环境。", "镜头本身要让环境拥有画面，而不是只放一个组件。"],
    avoidZh: ["不适合小卡片预览思路。", "如果只需要一条消息或一个证明块，会太重。"],
    adaptQuickZh: ["先改消息数据和频道状态。", "保留多栏结构，不要轻易拆掉。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_DM_TOOLBAR_ICONS]: {
    titleZh: "Discord 私信工具栏图标",
    summaryZh: "顶部工具栏的小图标组，适合补齐 Discord 私信或频道页头部细节。",
    bestForZh: ["画面里已经有 Discord 页头，只差功能图标。", "想补齐原生感，而不是重做整段 header。"],
    avoidZh: ["不适合作为主视觉元素。", "不在 Discord 语境里时慎用。"],
    adaptQuickZh: ["先改数量和间距。", "保持它是页头细节，而不是主要内容。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.AI_NO_PERSONALITY_HOME_SHELL]: {
    titleZh: "Discord 首页壳层",
    summaryZh: "更完整的 Discord 首页级壳层，适合做“人一眼就知道在哪个平台”的建立镜头。",
    bestForZh: ["需要更完整的 Discord 首页或社区首页感。", "想把内容装进一个明显的平台外壳里。"],
    avoidZh: ["不适合只放一个小证明块。", "不是平台建立镜头时会太重。"],
    adaptQuickZh: ["先改频道和消息数据。", "保留整体层级，别只改局部导致风格断裂。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.BREAK_IMMERSION_LOSS_CHART]: {
    titleZh: "Discord 流失图表场景",
    summaryZh: "把 Discord 环境和损失趋势图绑在一起的重证据场景，适合展示“问题已经造成结果”。",
    bestForZh: ["需要把平台语境和趋势证据放在同一镜头。", "想讲流失、下滑、损耗这类结果。"],
    avoidZh: ["不适合轻量数据提示。", "没有明确平台上下文时可以先用 Trend Chart。"],
    adaptQuickZh: ["先改数据和注释。", "保留“环境 + 图表”一起说话的关系。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.BREAK_IMMERSION_TIMELINE_PREVIEW]: {
    titleZh: "Discord 场景时间轴预览",
    summaryZh: "更偏辅助和规划的素材，用来快速看一组场景的前后顺序，而不是直接上镜头。",
    bestForZh: ["在写脚本或排镜头时快速看节奏。", "需要把多段 Discord scene 串起来看。"],
    avoidZh: ["不适合拿来做正式成片主画面。", "不适合作为最终 proof。"],
    adaptQuickZh: ["先改场景顺序和标题。", "把它当 planning helper，不要当成成品 UI。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.EASING]: {
    titleZh: "缓动辅助",
    summaryZh: "不是视觉素材本身，而是控制动效节奏的基础工具，适合先定运动语言再拼动画。",
    bestForZh: ["要统一多段动画的进出节奏。", "动效感觉不对，但界面本身已经差不多了。"],
    avoidZh: ["不适合拿来当可视主素材。", "如果不涉及动画节奏，就不用先看它。"],
    adaptQuickZh: ["先换 easing 曲线。", "别一上来同时改动效和结构。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.FLOATING_EMOJI]: {
    titleZh: "浮动 Emoji 强调",
    summaryZh: "挂在消息附近的轻量强调件，比单个 emoji 更像“气氛正在往上走”。",
    bestForZh: ["消息需要一个轻量但更活一点的情绪强化。", "聊天线程已经成型，只想加一层气氛。"],
    avoidZh: ["不适合完整庆祝爆发。", "不适合替代真正的结构化证明。"],
    adaptQuickZh: ["先改 emoji 类型和延迟。", "保持它贴着消息，而不是漂成独立主角。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.KNOWLEDGE_FILE_TYPE_ICON]: {
    titleZh: "文件类型图标",
    summaryZh: "给知识库、附件或文档引用补一个清楚的文件类型感，让信息块更像真实文件。",
    bestForZh: ["需要展示 PDF、Doc、Markdown 等文档身份。", "想让知识条目看起来更像真实附件。"],
    avoidZh: ["不适合单独当视觉主角。", "没有文件语义时没必要硬放。"],
    adaptQuickZh: ["先改文件名和扩展名。", "尽量保留文件型态识别，不要改成普通 icon。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.LUCIUS_LOGO_MARK]: {
    titleZh: "Lucius 标志",
    summaryZh: "品牌标志本体，适合做开头角标、结尾收束或品牌状态点缀。",
    bestForZh: ["要让品牌身份被快速识别。", "需要一个干净的品牌落点。"],
    avoidZh: ["不适合单独撑整页。", "品牌感不强的镜头里不要到处乱放。"],
    adaptQuickZh: ["先改尺寸和落点。", "不要破坏原标志比例。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.MESSAGE_EMPHASIS]: {
    titleZh: "消息重点强调",
    summaryZh: "把一句消息里的重点词压出来，适合让观众一眼看到“问题就出在这里”。",
    bestForZh: ["需要快速突出消息里的关键短语。", "聊天内容较长，但只有几个点需要观众记住。"],
    avoidZh: ["不适合整段都高亮。", "如果信息本来就很短，没必要额外强调。"],
    adaptQuickZh: ["先改被强调的词。", "保持局部强调，不要把整段做成标题。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.NOISE_CARD_STAGE]: {
    titleZh: "噪点卡片收束场景",
    summaryZh: "多个品牌卡片聚拢到结尾的重场景，适合做品牌 close 或一句话结论落地。",
    bestForZh: ["结尾需要更有设计感的品牌收束。", "想用卡片群来承接前面的多个线索。"],
    avoidZh: ["不适合中段解释信息。", "不适合很短的小转场。"],
    adaptQuickZh: ["先改中心一句话和卡片配色。", "保持收束关系，不要变成杂乱拼贴。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.PHONE_FRAME]: {
    titleZh: "手机壳层",
    summaryZh: "一个稳定的手机外框，适合把聊天、消息、输入区等素材统一装进手机语境里。",
    bestForZh: ["需要明确这是手机内的内容。", "想把多个聊天素材装进同一个容器里。"],
    avoidZh: ["不适合桌面端产品场景。", "如果内容本身已经是完整场景，未必要再加框。"],
    adaptQuickZh: ["先改标题和内部内容。", "保留手机轮廓和阅读比例。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.PROFILE_ACTION_ICON]: {
    titleZh: "个人操作图标",
    summaryZh: "麦克风、耳机、设置这类小操作图标，适合补齐 Discord/Profile 类界面的细节。",
    bestForZh: ["界面角落只差一组小操作件。", "想让平台页看起来更完整。"],
    avoidZh: ["不适合独立成镜头主体。", "非类似平台语境里慎用。"],
    adaptQuickZh: ["先改图标种类。", "不要把它做得比主内容更抢眼。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.PROOF_CHIP]: {
    titleZh: "证据芯片",
    summaryZh: "一个很轻的小证明标签，适合在画面里提醒“这里有证据支撑”。",
    bestForZh: ["证据已经在画面里，只差一个提示。", "需要轻量强调 proof 数量或存在感。"],
    avoidZh: ["不适合承载完整证明逻辑。", "没有证据内容时别单独放。"],
    adaptQuickZh: ["先改数字和标签文案。", "保持它小而精，不要扩成大卡片。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.RECORDING_ROUTE_SHELL]: {
    titleZh: "录屏路线壳层",
    summaryZh: "把录屏场景和侧边工具位统一包起来的外壳，适合做 demo 或流程录屏类镜头。",
    bestForZh: ["需要一个像产品 demo 的主框架。", "录屏内容和侧边工具要在同一层里出现。"],
    avoidZh: ["不适合简单消息镜头。", "不适合当小组件卡片。"],
    adaptQuickZh: ["先改内容区和侧栏用途。", "保持“主舞台 + 辅助位”关系。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.RECORDING_SCENARIO_SCHEMA]: {
    titleZh: "录屏场景 Schema",
    summaryZh: "录屏脚本用的结构数据，适合先搭一套镜头流程，再决定具体每段怎么演。",
    bestForZh: ["要快速规划录屏素材的段落组成。", "先想清楚 analysis/wiki/evidence/outcome 顺序。"],
    avoidZh: ["不适合拿来当最终画面。", "只是做一个静态 UI 时不需要先看它。"],
    adaptQuickZh: ["先改场景数量和字段。", "把它当编排工具，不是视觉组件。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.REPLY_READY_TOAST]: {
    titleZh: "回复已就绪提示",
    summaryZh: "适合在聊天界面里提示“建议回复已经准备好”，是一个很明确的状态反馈件。",
    bestForZh: ["要告诉用户回复建议已经准备好了。", "想用一个轻量状态件承接下一步动作。"],
    avoidZh: ["不适合当完整消息替代。", "没有后续动作承接时会显得悬空。"],
    adaptQuickZh: ["先改提示文案和按钮。", "保持它是状态反馈，不要改成信息大卡。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.RESOLVE_OVERLAY]: {
    titleZh: "收束叠层",
    summaryZh: "适合在结尾给一句明确总结，把前面内容压成一个最终结论。",
    bestForZh: ["镜头末尾需要一句有判断的总结。", "想让最后一句更像结果落地，而不是普通字幕。"],
    avoidZh: ["不适合长说明。", "中段镜头里频繁出现会打断节奏。"],
    adaptQuickZh: ["先改总结句。", "保持它是收束层，不要塞太多信息。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.SETTINGS_SECTION_SHELL]: {
    titleZh: "设置页分区壳层",
    summaryZh: "适合做设置、集成、权限这类后台分区，让长内容也有稳定的版面秩序。",
    bestForZh: ["要展示后台设置分组。", "一个页面里需要多个一致的设置块。"],
    avoidZh: ["不适合聊天场景。", "不适合强调情绪或结果的镜头。"],
    adaptQuickZh: ["先改标题和区块内容。", "保留设置页的留白和层级。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.SUPPORT_HANDOFF_CARD]: {
    titleZh: "客服交接证据卡",
    summaryZh: "把“谁接手了、现在到哪一步了、关键信息是什么”结构化讲清楚的证据卡。",
    bestForZh: ["需要明确展示人工接手或跨团队交接。", "想让交接过程本身成为可视证据。"],
    avoidZh: ["不适合普通聊天来回。", "如果只是一句状态更新，会显得太重。"],
    adaptQuickZh: ["先改标题、负责人和关键信息。", "保留步骤、摘要和状态这三层结构。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.TABLE]: {
    titleZh: "表格基础件",
    summaryZh: "最稳妥的数据表壳层，适合把多行状态、队列或字段放在一块读。",
    bestForZh: ["需要列表式、多行对比的信息。", "图表不合适，但还是要清晰展示数据。"],
    avoidZh: ["不适合情绪化或品牌化镜头。", "信息太少时会显得板。"],
    adaptQuickZh: ["先改列名和行数据。", "保持表格节奏，不要硬塞复杂视觉装饰。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.TIMELINE]: {
    titleZh: "时间轴控制器",
    summaryZh: "用来控制 seek、pause、restart 等时间推进，不是画面主素材，但决定很多动效能不能稳定复用。",
    bestForZh: ["要复用一套动画节奏。", "多个动效需要共用一条时间轴。"],
    avoidZh: ["不适合给人直接看成 UI 成品。", "不做时间驱动动画时用不上。"],
    adaptQuickZh: ["先改总时长和片段窗口。", "别同时改时间控制和视觉逻辑。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.TREND_CHART]: {
    titleZh: "趋势图",
    summaryZh: "轻量趋势证据件，适合快速讲“变好了/变差了/某一刻发生了变化”。",
    bestForZh: ["需要一个比表格更直观的趋势说明。", "想突出某个时间点前后的变化。"],
    avoidZh: ["不适合承载非常多维的数据故事。", "没有明显趋势时会比表格更弱。"],
    adaptQuickZh: ["先改数据和高亮点。", "保持趋势线清晰，不要塞太多说明字。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_MESSAGE_CARD]: {
    titleZh: "Discord 消息卡",
    summaryZh: "一条可复用的 Discord 消息行，包含头像、作者、时间、正文重点和 reaction，适合放进转录列表或社区场景里。",
    bestForZh: ["需要展示单条 Discord 消息，并且这条消息本身要可读。", "消息里有重点词、reaction 或高热度标记，需要比普通气泡更结构化。"],
    avoidZh: ["不适合单独承担完整社区环境。", "如果只是极短的一句话，普通 Chat Bubble 会更轻。"],
    adaptQuickZh: ["先改 author、meta 和 body。", "再按需要调整 emphasis、reactions 和 avatarVariant。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.REACTION_BADGE]: {
    titleZh: "Discord Reaction 徽标",
    summaryZh: "很轻的 emoji 计数徽标，用来补充社区热度或局部 traction，不承担主要证明逻辑。",
    bestForZh: ["消息已经读清楚，只差一个社区反馈信号。", "需要用几个 emoji count 让 feature/request 更像真实 Discord 语境。"],
    avoidZh: ["不适合替代图表或趋势证明。", "没有消息上下文时单独放会显得悬空。"],
    adaptQuickZh: ["先改 emoji 和 count。", "高热度时再打开 hot，不要每个都热。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_COMPOSER_BAR]: {
    titleZh: "Discord 输入底栏",
    summaryZh: "Discord 风格的输入底栏，包含 attach、辅助扫描和发送按钮，用来补足社区场景的操作感。",
    bestForZh: ["转录或社区壳子底部需要一个稳定输入区。", "希望暗示下一步可以扫描、回复或发送，但不需要真实交互。"],
    avoidZh: ["不展示输入语境时不要硬加。", "如果不是 Discord 语境，优先用通用 Composer Shell。"],
    adaptQuickZh: ["先改 placeholder。", "再改 assistLabel 和 sendLabel，保持按钮数量稳定。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_CHANNEL_RAIL]: {
    titleZh: "Discord 频道侧栏",
    summaryZh: "可复用的 Discord 频道侧栏，负责建立频道上下文、当前频道和 watch/unread 状态。",
    bestForZh: ["需要观众快速知道当前在服务器哪个频道。", "场景需要 Discord 环境感，但不一定需要完整四栏页面。"],
    avoidZh: ["单条消息特写不适合加侧栏。", "移动端窄屏转录里会显得太重。"],
    adaptQuickZh: ["先改 channels 和 activeChannel。", "再改 headerCopy，不要先动侧栏比例。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_COMMUNITY_SHELL]: {
    titleZh: "Discord 社区壳层",
    summaryZh: "正式的通用 Discord 社区外壳，包含服务器栏、频道栏、主舞台和可选右侧信息面板，可以承载不同项目的数据和场景模块。",
    bestForZh: ["需要一个跨项目可复用的 Discord 社区环境。", "希望只换 messages、channels、rightPanel 就能搭出新短视频场景。"],
    avoidZh: ["只有一两条消息时太重。", "不要把品牌专属文案或项目 timing 写进壳层。"],
    adaptQuickZh: ["先改 channels、activeChannel、headerCopy。", "再替换 children、composer 和 rightPanel。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_TRANSCRIPT_STAGE]: {
    titleZh: "Discord 转录舞台",
    summaryZh: "按 revealTimes 逐条出现消息的转录舞台，可选叠加一个叙事问题，适合社区噪音、支持重复、需求热度这类镜头。",
    bestForZh: ["需要消息随着时间堆叠出现。", "希望 transcript 逻辑由数据驱动，而不是复制整个项目 scene。"],
    avoidZh: ["只有单条消息时太重。", "静态证明卡片不需要用它。"],
    adaptQuickZh: ["先改 messages 和 revealTimes。", "再决定 tone 与 questionText。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_QUESTION_STACK_STAGE]: {
    titleZh: "Discord 问题栈结尾",
    summaryZh: "用于结尾逐行出现 2-5 个问题的舞台，重点是让最后一行完整显示并有足够停顿。",
    bestForZh: ["结尾需要连续三问或多问逐条落地。", "需要把提问节奏从项目 scene 里抽出来复用。"],
    avoidZh: ["只有一句总结时用 Resolve Overlay 更合适。", "长段落不适合塞进问题栈。"],
    adaptQuickZh: ["先改 questions。", "再调 initialDelayMs、staggerMs、revealDurationMs 和结尾 hold。"],
  },
  [MATERIAL_LIBRARY_ASSET_IDS.DISCORD_NOISE_CARD_STAGE]: {
    titleZh: "Discord 噪点卡片结尾",
    summaryZh: "Discord 原生感的结尾场景：社区碎片卡片逐步出现，然后可接问题栈收束，不绑定任何 Lucius 或项目文案。",
    bestForZh: ["结尾要把分散消息、痛点或需求碎片聚合成一个场。", "需要复用 Discord 卡片云结尾视觉，但替换为新项目数据。"],
    avoidZh: ["纯品牌 logo close 不适合。", "中段解释性镜头不要用得太重。"],
    adaptQuickZh: ["先改 cards 和 visibleTiming。", "再决定是否接 questionStack，并给最后一问足够停顿。"],
  },
};

function buildFallbackHumanCopy(entry: MaterialLibraryCatalogEntry): ShowcaseHumanCopy {
  return {
    summaryZh: entry.summary,
    bestForZh: entry.whenToUse,
    avoidZh: entry.avoidWhen,
    adaptQuickZh:
      entry.safeToChange.length > 0
        ? entry.safeToChange.slice(0, 3).map((item) => `优先改 ${item}。`)
        : entry.adaptationNotes.slice(0, 3),
  };
}

export function buildShowcaseBrowseEntries(
  entries: MaterialLibraryCatalogEntry[],
  curatedSectionIds: string[],
): ShowcaseBrowseEntry[] {
  const curatedOrderLookup = new Map(curatedSectionIds.map((id, index) => [id, index] as const));

  return entries.map((entry, index) => {
    const humanCopy = SHOWCASE_HUMAN_COPY_BY_ID[entry.id] ?? buildFallbackHumanCopy(entry);

    return {
      ...entry,
      adaptQuickUi: humanCopy.adaptQuickZh.length ? humanCopy.adaptQuickZh : entry.safeToChange,
      avoidUi: humanCopy.avoidZh.length ? humanCopy.avoidZh : entry.avoidWhen,
      bestForUi: humanCopy.bestForZh.length ? humanCopy.bestForZh : entry.whenToUse,
      cueText: (humanCopy.bestForZh.length ? humanCopy.bestForZh : entry.selectionSignals).slice(0, 2),
      curatedOrder: curatedOrderLookup.get(entry.id) ?? curatedSectionIds.length + index,
      hasPreview: entry.preview !== null,
      humanCopy,
      previewStateLabelZh: entry.preview ? "可预览" : "仅代码",
      reuseLabelZh: SHOWCASE_REUSE_LABELS_ZH[entry.reuseMode],
      roleLabelZh: humanCopy.groupLabelZh ?? SHOWCASE_ROLE_LABELS_ZH[entry.narrativeRole],
      stabilityLabelZh: STABILITY_LABELS_ZH[entry.stability],
      summaryForUi: humanCopy.summaryZh,
      titleForUi: humanCopy.titleZh ?? entry.title,
      weightLabelZh: SHOWCASE_WEIGHT_LABELS_ZH[entry.visualWeight],
    };
  });
}
