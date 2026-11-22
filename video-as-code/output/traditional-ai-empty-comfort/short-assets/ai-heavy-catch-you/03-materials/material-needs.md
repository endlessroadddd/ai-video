# Material Needs

## Persistent Constraints

### Brand Constraints

- Color roles:
  - 前三屏的 Discord 社区结构允许保留深色工具感，但必须被 Lucius 的配色策略重新整理。
  - 最后一屏必须回到纯净 Lucius Purple 主底，不允许用临时色替代。
- Type roles:
  - Discord mock 的所有界面文字都走 `SF Pro`。
  - 如果最后一屏需要额外品牌句，只允许极少量使用 `Recoleta`，并且不是 build 前置阻塞项。
- Radius rules:
  - Discord 消息卡、状态章、输入区和 Lucius 品牌卡必须统一到同一套柔和圆角语言。
- Background rules:
  - Discord 屏幕保持深色社区频道层级。
  - Lucius 品牌屏必须保持纯品牌舞台感，不能混进第二套背景叙事。
- Graphic language:
  - 保持干净、可读、有秩序的 SaaS 气质。
  - 不使用廉价赛博特效、故障风、霓虹噪音。
- Motion tone:
  - 每屏只有一个主动作。
  - 最后一屏只有 logo 脉冲是主动动作，空话卡片只是被动响应。
- Prohibited patterns:
  - 不允许文字重叠。
  - 不允许多个区块一起抢动效。
  - 不允许为了 mock Discord 而丢失 Lucius 品牌执行。

### Base Motion Constraints

- onePrimaryMotionPerScreen: true
- lessIsMore: true
- minimalCopy: true
- noTextOverlap: true
- singleProofPath: true
- quietlyConfidentMotion: true

## Already In Repo

- Lucius 品牌规则与品牌 tokens
- Lucius 产品 context
- Lucius logo 资产：
  - `assets/brand/lucius.svg`
  - `assets/brand/logo-mark-black.svg`
- 当前这条素材的 micro-concept、script-outline、complete-plan
- Discord 社区频道页的 Figma 结构参考链接
- 浏览器优先的 React + CSS 短素材工程模板

## Required From User

### Requirement `discord-channel-avatar-direction`

- Type: visual-direction
- Description: 确认这条素材里 Discord 频道的服务器图标、频道命名和 bot 头像，是走“泛社区 mock”还是要贴近某个具体产品社区语境。
- Why needed: 这会直接影响前三屏的真实感。如果方向不定，后续实现时很容易在头像、频道名和 bot 样式上乱补细节，破坏“少即是多”。
- Used in screen: `screen-01-payment-pain`, `screen-02-empty-comfort`, `screen-03-fake-resolution`
- Required before build: true

### Requirement `lucius-logo-variant-confirmation`

- Type: brand-asset-choice
- Description: 确认第四屏要用 `lucius.svg` 的完整 logo，还是只用更纯图形感的 logo mark。
- Why needed: 这会影响最后品牌页的视觉重心和卡片环绕方式，也影响脉冲清场时的品牌识别效率。
- Used in screen: `screen-04-lucius-clearance`
- Required before build: true

## Optional Enhancements

- 如果你希望前三屏更像某个真实 Discord 社区，可以补一个更接近“support thread”的消息流参考节点。
- 如果你希望最后一屏的 AI 空话卡片更像某种固定话术体系，可以补充你最想讽刺的 5 到 7 条短句。
- 如果你想让 Lucius 品牌页更像 campaign 级画面，可以补一张你喜欢的 Lucius hero screen 参考。

## UI References

- Discord 社区频道页结构参考：
  - `https://www.figma.com/design/pFIQI6NOxpoptBs9TIrA5s/Discord-UI---Free-UI-Kit--Recreated---Community-?node-id=1-12097&t=5bU2uF5q4ZegPDsp-0`
- Lucius 品牌规则：
  - `rules/design/lucius-brand-guideline.md`
  - `rules/design/lucius-brand-application-rules.md`
  - `rules/design/lucius-brand-tokens.json`

## Copy Dependencies

- 前三屏最终上屏短句是否保留中文直给版本，还是要更像平台内自然语言，需要你最后定口径。
- 第四屏是否保留一句 closing phrase，还是只让 logo 和清场动作说话，也需要你最后拍板。

## Blockers

- 在确认 Discord 频道的具体 mock 方向前，不建议直接开 build，因为最容易在头像、频道名、bot 身份和消息层级上做过头。
- 在确认第四屏 logo variant 前，不建议开 build，因为会影响品牌页中心构图和卡片环绕节奏。
