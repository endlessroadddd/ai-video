# Script Outline

- Case slug: `traditional-ai-empty-comfort`
- Asset slug: `ai-heavy-catch-you`
- Figma structural reference for screens 01-03:
  - `https://www.figma.com/design/pFIQI6NOxpoptBs9TIrA5s/Discord-UI---Free-UI-Kit--Recreated---Community-?node-id=1-12097&t=5bU2uF5q4ZegPDsp-0`
- Single takeaway: AI 味很重、很会说漂亮话的客服，如果没有真正的问题处理能力，只会把用户的无力感放大；Lucius 的角色是把这些空话从用户面前清出去。
- Hook: 用一个明确参考 Discord 社区频道页 Figma 的频道场景，先打出“支付失败 3 天”的投诉，再展示空洞安抚和假解决，最后切到 Lucius Purple 品牌页，把环绕 logo 的 AI 空话卡片一次性弹飞。

## Persistent Constraints

### Brand Constraints

- Color roles:
  - Discord 频道骨架参考 Figma 的深色社区结构，但整体实现仍要被 Lucius 的品牌体系接管。
  - Discord 屏幕中的主阅读区以深石墨灰和冷灰为底，Lucius Purple 只作为关键强调、状态边线或转场预兆出现。
  - 最后一屏回到完整 Lucius Purple 品牌底。
- Type roles:
  - SF Pro 承担所有界面文字、聊天内容、状态提示和按钮信息。
  - Recoleta 不进入 Discord 密集 UI，只允许在最后品牌页的极少量品牌标题中出现一次，甚至可以不用。
- Radius rules:
  - Discord mock 保留频道页结构，但所有消息卡、状态章、输入区和品牌卡都统一成更干净、更柔和的 Lucius 圆角语言。
- Background rules:
  - Discord 屏幕维持深色社区底，但要去掉杂乱贴图，保留干净、可读的频道页层级。
  - Lucius 屏幕使用纯净的 Lucius Purple 主底，边缘只有极轻的 Orchid Bloom / Lavender Mist 氛围晕染。
- Graphic language:
  - 保持 Intelligent / Collaborative / Quietly Confident。
  - 不做廉价赛博特效，不做夸张爆炸，不做多层噪音。
- Motion tone:
  - 每屏只有一个主动作。
  - 动作要克制、清楚、带一点产品气质的精确感。
- Prohibited patterns:
  - 不要让 Discord 页面里多个区域同时跳动。
  - 不要文字重叠。
  - 不要为了 mock Discord 而丢掉 Lucius 的干净品牌执行。

### Base Motion Constraints

- onePrimaryMotionPerScreen: true
- lessIsMore: true
- minimalCopy: true
- noTextOverlap: true
- singleProofPath: true
- quietlyConfidentMotion: true

## Screens

### Screen `screen-01-payment-pain`

- Purpose: 首秒建立“这是社区里一个和钱直接相关、已经拖了三天的问题”，让观众立刻进入高压状态。
- UI surface: 直接参考 Figma `node 1:12097` 的 Discord 社区频道页骨架，保留左侧服务器栏、频道列表、顶部 `#channel` header、中间消息区、右侧成员列表。
- Layout snapshot: 16:9 画面里，最左是一列圆形 server icons；左中是频道分组与频道名列表；顶部是一条横向频道 header；中间主区是消息流；最右是在线成员列表。当前频道固定为一个 support 语义频道，比如 `#payment-help`。消息区里其他历史消息全部弱化，只保留一条最新的用户投诉消息占据中心阅读位。
- Background: 整体保留 Figma 这张 Discord 社区页的深色层级，服务器栏更深，频道栏次深，消息区最开阔；右侧成员栏保持可见但弱化。背景不加第二套故事，只用克制的 Lucius Purple 细线强调当前频道和投诉消息。
- Key elements:
  - 左侧 server rail
  - 左侧 channel list
  - 顶部 channel header
  - 中央 message feed
  - 右侧 member list
  - 一条用户投诉消息
  - 底部静止输入框
- Primary motion: 用户投诉消息从中间消息区下方滑入并停住，成为全屏唯一动作。
- Copy hint: `支付失败 3 天了`
- Duration hint: `2.2s`

### Screen `screen-02-empty-comfort`

- Purpose: 让观众看到，系统给出的不是处理动作，而是一句“听起来很温柔但完全没用”的 AI 式安抚。
- UI surface: 同一张 Discord 社区频道页，不切场，不变频道，不换结构。
- Layout snapshot: 用户投诉消息固定在消息区上半部；AI 客服回复消息出现在它正下方，使用一个明显带 bot 身份的回复卡。左侧 server rail、频道列表、顶部 header、右侧成员列表全部保持静止，只让观众盯住这条回复。
- Background: 延续上一屏的 Discord 深色社区底。频道 header 和右侧成员栏继续存在，但不抢戏；Lucius Purple 只以很窄的边线或回复状态点出现，提醒这是被设计过的 mock，而不是原生 Discord 截图。
- Key elements:
  - 上方用户投诉消息
  - 下方 AI 回复消息卡
  - 轻量 bot 身份标识
  - 静止的 server rail
  - 静止的 channel list
  - 静止的 member list
- Primary motion: AI 回复消息卡以一次柔和展开的方式进入消息区中央，然后停住。
- Copy hint: `我会稳稳接住你`
- Duration hint: `1.9s`

### Screen `screen-03-fake-resolution`

- Purpose: 把空洞感再推高一层，让观众看到“系统没有解决问题，却强行宣布问题结束”。
- UI surface: 仍然是同一张 Discord 社区频道页，同一个 `#payment-help` 频道。
- Layout snapshot: 前两条消息还在，但都被压弱。中间主阅读位不再新增长回复，而是在 AI 回复的右上或下方落下一个清晰的“已解决”状态章，让整个消息区像被粗暴关单。频道列表和成员列表仍然可见，但完全静止。
- Background: Discord 深色结构继续保持不动，顶部频道 header 与右侧成员列表继续作为环境证据存在。整屏只给“已解决”状态章一个更亮的对比度，让它看起来更刺眼、更假。
- Key elements:
  - 被压弱的用户投诉消息
  - 被压弱的 AI 安抚回复
  - 一枚“已解决”状态章
  - 静止的频道结构
  - 静止的成员侧栏
- Primary motion: “已解决”状态章从上方直落到消息区里并贴住，形成假闭环。
- Copy hint: `问题已解决`
- Duration hint: `1.9s`

### Screen `screen-04-lucius-clearance`

- Purpose: 把前三屏积累的 AI 空话抽离成可见噪音，再用 Lucius 的品牌动作一次性清场，完成反转。
- UI surface: 从 Discord 社区页干净转场到 Lucius Purple 品牌页。
- Layout snapshot: 整个 16:9 画面不再保留 Discord 分栏。中心是 Lucius logo，四周松散环绕 5 到 7 张 AI 味很重的消息卡片，卡片文案来自前面那类空话，比如“我会接住你”“请耐心等待”“问题已解决”。卡片大小略有变化，但围绕中心保持单一环形秩序。
- Background: 纯净的 Lucius Purple 主底，边缘只有极轻的 Orchid Bloom 和 Lavender Mist 晕染，不出现第二套界面结构。背景必须像一个为品牌动作让位的舞台。
- Key elements:
  - 中央 Lucius logo
  - 环绕的 AI 空话卡片
  - 极轻品牌光晕
  - 大面积干净留白
- Primary motion: Lucius logo 先做一次很短的内聚，再向外释放一圈干净脉冲，把周围卡片统一弹飞出画。
- Copy hint: `把空话弹开`
- Duration hint: `2.6s`

## Non-goals

- 不要把它做成段子或梗图。
- 不要把完整对话全文塞上屏。
- 不要让 Discord 页面里多个区域一起动。
- 不要把 Lucius 品牌页做成廉价特效页。
