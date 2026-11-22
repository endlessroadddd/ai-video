# 套餐与超额计费规则表

## 文档信息

- 状态：Draft v1
- 更新时间：2026-03-11
- 适用范围：主管端计费、Stripe 套餐配置、前端 Billing 页展示

## 1. 本文目标

本文用于把当前的商业定价讨论收敛成可以直接指导产品、运营、前后端实现的规则表。

本文只处理：

- 套餐价格
- included quotas
- 超额计费
- 平台与管理员加购
- 计费口径

本文不处理：

- 具体 UI 视觉稿
- 法务条款文案
- 会计入账与税务细节

## 2. 当前已确认规则

以下规则视为当前已确认：

1. 计费主体为 `company/workspace`
2. 套餐分为 `免费版`、`Basic`、`Pro`
3. `Basic` 月费 `$199`
4. `Pro` 月费 `$499`
5. 免费版每月包含 `500` 次
6. `Basic` 每月包含 `5000` 次
7. `Pro` 每月包含 `20000` 次
8. `Basic` 包含 `3` 个管理员席位
9. `Pro` 包含 `5` 个管理员席位
10. `Basic` 超额单价 `$0.12 / 次`
11. `Pro` 超额单价 `$0.08 / 次`
12. 加一个平台 `$99 / 月`
13. 加一个管理员 `$49 / 月`
14. 付费版支持客户自行选择：
    - 达到 included quota 后停止服务
    - 允许继续使用并自动扣费

## 3. 建议默认值

以下是为了让产品和技术方案能先落地而给出的建议默认值。

如果产品后续确认不同口径，只需要同步更新价格配置与技术文档。

1. 免费版默认包含 `1` 个平台
2. 免费版默认包含 `1` 个 billable admin
3. Basic 默认包含 `1` 个平台
4. Pro 默认包含 `1` 个平台
5. 当前只做 `monthly`，不做 `annual`
6. 免费版不支持超额扣费，只能达量停用
7. Basic / Pro 默认支持 `7 天试用`
8. 开始 Basic / Pro trial 前必须先绑卡
9. 每个付费账户默认建议配置 `月度超额金额上限`
10. `预充值钱包 + 自动信用卡补扣` 不进入 v1

## 4. 统一定义

## 4.1 计费主体

`billing_account` 是唯一计费主体。

一个 `billing_account` 可以对应：

- 一个 `company`
- 一个 `workspace`

## 4.2 每次

建议统一术语为 `billable action`，不要直接对外写成“数据库查询次数”。

建议定义：

`1 次 billable action = Lucius 成功执行一次对客户可见、可审计、可落账的实际动作，并产出唯一 action ledger 记录。`

实现约束：

1. 内部数据库查询不单独计费
2. 内部重试不重复计费
3. 失败动作不计费
4. 同一业务动作必须复用同一个 `billing_usage_key`

## 4.3 管理员

建议统一术语为 `billable admin seat`。

建议定义：

`billable admin = 在当前账期内被授予任一“可使用数据库查询 / 高级运营能力”的成员席位。`

说明：

1. 按席位计费，不按操作次数计费
2. 一个成员无论有多少相关权限，只算一个席位
3. 是否计费以当前生效席位数为准，不以历史最大值为准

## 4.4 平台

建议统一术语为 `managed platform slot`。

建议定义：

`一个平台 = 一个被启用并完成 onboarding 的平台类型，例如 Discord、Telegram、Slack、Feishu 中的一个。`

说明：

1. 按平台类型计费，不按 channel / server / group 数量计费
2. 同一 company 同时开通 Discord + Slack = 2 个平台

## 4.5 超额模式

`overage_mode` 只对付费版有效：

- `stop_service`
  - 达到 included quota 后停止新的 billable action
- `auto_charge`
  - 允许继续执行并对超额部分自动扣费

## 5. 套餐总表

| 套餐 | 月费 | included actions / 月 | included admins | included platforms | 超额计费 | 加平台 | 加管理员 | 说明 |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: | --- |
| 免费版 | $0 | 500 | 1（建议默认值） | 1（建议默认值） | 不支持 | 不支持 | 不支持 | 达量后停止服务或引导升级 |
| Basic | $199 | 5000 | 3 | 1（建议默认值） | $0.12 / 次 | $99 / 月 | $49 / 月 | 支持 stop_service / auto_charge |
| Pro | $499 | 20000 | 5 | 1（建议默认值） | $0.08 / 次 | $99 / 月 | $49 / 月 | 支持 stop_service / auto_charge |

### 5.1 Stripe Price 映射

v1 只做 `monthly`，并且所有付费项都必须通过 `lookup_key` 读取，不允许在代码中硬编码 `price_id`。

| 业务项 | Stripe Product ID | Stripe Price lookup_key | 计费类型 | 月价 / 单价 | `usage_type` | 对应 meter |
| --- | --- | --- | --- | ---: | --- | --- |
| Basic 基础月费 | `lucius_basic_base_monthly` | `basic_base_monthly` | recurring subscription item | $199 / 月 | `licensed` | 无 |
| Pro 基础月费 | `lucius_pro_base_monthly` | `pro_base_monthly` | recurring subscription item | $499 / 月 | `licensed` | 无 |
| 平台加购 | `lucius_platform_addon_monthly` | `platform_addon_monthly` | recurring add-on item | $99 / 月 | `licensed` | 无 |
| 管理员加购 | `lucius_admin_addon_monthly` | `admin_addon_monthly` | recurring add-on item | $49 / 月 | `licensed` | 无 |
| Basic 超额次数 | `lucius_basic_action_overage` | `basic_action_overage` | usage-based overage item | $0.12 / 次 | `metered` | `basic_billable_actions` |
| Pro 超额次数 | `lucius_pro_action_overage` | `pro_action_overage` | usage-based overage item | $0.08 / 次 | `metered` | `pro_billable_actions` |

约束：

1. 免费版不创建 Stripe Price
2. `platform_addon_monthly` 与 `admin_addon_monthly` 通过 subscription item `quantity` 表示数量
3. `basic_action_overage` 与 `pro_action_overage` 必须挂到 meter price，不走手工 invoice item 补差
4. 若后续需要调价，创建新 Price 并转移 `lookup_key`，不要覆盖旧 Price 的历史账单语义

### 5.2 Stripe Meter 映射

| 业务项 | Meter event name | aggregation | customer mapping |
| --- | --- | --- | --- |
| Basic actions overage | `basic_billable_actions` | `count` | `stripe_customer_id` |
| Pro actions overage | `pro_billable_actions` | `count` | `stripe_customer_id` |

约束：

1. meter event 只对 `auto_charge` 的付费账户上报
2. 每个 `billing_usage_event` 最多对应一个 Stripe meter event
3. meter event payload 统一使用 `stripe_customer_id` 作为客户映射键

### 5.3 初始化与验收

仓库提供可复跑初始化脚本：

```bash
pnpm stripe:setup-billing
```

脚本职责：

1. 若 Product 不存在，则按固定 Product ID 创建
2. 若 meter 不存在，则创建 `basic_billable_actions` 与 `pro_billable_actions`
3. 若 Price 不存在，则按本节表格创建并绑定对应 `lookup_key`
4. 若资源已存在，则直接复用，保证脚本幂等

验收标准：

1. 以上 6 个 `lookup_key` 均能通过 Stripe API 查询到唯一 Price
2. `basic_action_overage` 与 `pro_action_overage` 的 `recurring.usage_type` 必须为 `metered`
3. `basic_action_overage` 与 `pro_action_overage` 必须分别绑定正确 meter
4. `basic_base_monthly`、`pro_base_monthly`、`platform_addon_monthly`、`admin_addon_monthly` 的 `recurring.usage_type` 必须为 `licensed`

## 6. 价格梯度检查

这组价格的升级逻辑是成立的。

### 6.1 Included 单次成本

| 套餐 | 月费 | included actions | 平均 included 单次成本 |
| --- | ---: | ---: | ---: |
| Basic | $199 | 5000 | $0.0398 |
| Pro | $499 | 20000 | $0.0250 |

### 6.2 超额单价

| 套餐 | 超额单价 |
| --- | ---: |
| Basic | $0.12 / 次 |
| Pro | $0.08 / 次 |

### 6.3 升级临界点

如果只看 usage，不考虑管理员和平台价值：

`199 + (x - 5000) * 0.12 = 499`

则 `Basic -> Pro` 的纯 usage 升级临界点约为：

- `7500 次 / 月`

解释：

1. `5000 以下`：Basic 合理
2. `7500 左右`：Basic 与 Pro 成本接近
3. `7500 以上`：Pro 明显更划算

这个梯度是健康的，不会出现“Basic + 超额仍然长期便宜于 Pro”的问题。

## 7. 平台与管理员加购规则

## 7.1 平台加购

规则：

1. 超出套餐 included platform 数后，每增加 `1` 个平台，加收 `$99 / 月`
2. 平台数量变化按 Stripe license item quantity 同步
3. 中途增加平台，按 Stripe proration 处理
4. 中途移除平台，按 Stripe 当前 proration 策略处理

## 7.2 管理员加购

规则：

1. 超出套餐 included admin 数后，每增加 `1` 个 billable admin，加收 `$49 / 月`
2. 席位数变化按 Stripe license item quantity 同步
3. 成员被授予 billable 权限时，占用席位
4. 成员移除该类权限后，释放席位

## 8. 超额计费规则

## 8.1 免费版

免费版固定规则：

1. 每月 500 次
2. 不支持超额自动扣费
3. 达量后停止新的 billable action
4. 页面引导升级到 Basic 或 Pro

## 8.2 Basic / Pro

客户需要在 Billing 设置中选择一种模式：

### `stop_service`

1. 达到 included actions 后，不再允许新的 billable action
2. 用户仍可查看历史数据和账单
3. 页面提示：
   - 已达本月额度
   - 可升级套餐
   - 可切换为 `auto_charge`

### `auto_charge`

1. 达到 included actions 后，继续正常执行 billable action
2. 超额部分按套餐单价在账期末自动计费
3. 建议支持：
   - 月度超额费用上限
   - 80% / 100% / 120% usage 通知

## 8.3 月度结算建议

建议口径：

1. 月费在账期开始时结算
2. usage 超额在账期结束时结算
3. extra platform / extra admin 作为 recurring licensed item
4. overage 作为 metered usage item

## 9. Trial 规则

为了兼容免费版和已确认的“试用前绑卡”决策，建议收敛为：

1. 进入免费版不需要绑卡
2. 开始 Basic / Pro trial 前必须先绑卡
3. Trial 默认 7 天
4. Trial 结束后自动进入首个付费周期

## 10. Redeem 规则与套餐关系

当前建议：

1. Redeem 默认发放 `Basic 30 天 promo`
2. 免费版兑换后：
   - 获得 30 天 Basic entitlement
3. Basic trial / active / canceling：
   - 按账期规则延长或顺延
4. Pro 用户：
   - 不覆盖 Pro
   - promo 保存为 `deferred_to_basic`
   - 降级到 Basic 后再自动应用

## 11. 页面展示口径

Billing 页需要展示以下内容：

1. 当前套餐
2. included actions
3. 本月已使用 actions
4. 剩余 included actions
5. overage mode
6. 当前 billable admins / included admins
7. 当前 active platforms / included platforms
8. 下次扣费日期
9. 若为 `auto_charge`，显示预计超额费用

## 12. 当前仍需产品最终拍板的点

以下规则建议尽快拍板，否则会影响实现：

1. 免费版是否固定包含 1 个管理员
2. Basic / Pro 默认各包含几个平台
3. Pro 是否要额外包含功能权益，而不仅仅是更高配额
4. 是否需要年度套餐
5. `auto_charge` 是否必须要求用户设置月度超额金额上限
6. 达量停用时，到底停哪些功能

## 13. 推荐的 v1 收敛结论

如果要尽快上线，建议按以下规则实现：

1. 免费版：500 次 / 月，1 平台，1 管理员，不支持超额
2. Basic：$199 / 月，5000 次，3 管理员，1 平台，超额 $0.12 / 次
3. Pro：$499 / 月，20000 次，5 管理员，1 平台，超额 $0.08 / 次
4. Extra platform：$99 / 月
5. Extra billable admin：$49 / 月
6. Basic / Pro 可选 `stop_service` 或 `auto_charge`
7. Basic / Pro 开始 trial 前必须绑卡
