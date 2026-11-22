# 主管端 Stripe 计费技术实现方案

## 文档信息

- 状态：Draft v2
- 更新时间：2026-03-10
- 适用项目：`lucius-client-app`、`lucius-api-server`
- 配套价格文档：[billing-pricing-rules.md](/Users/kaikai/LuciusAI/lucius-client-app/docs/billing-pricing-rules.md)

## 1. 本文目标

本文用于把主管端的商业计费模型落实为可开发的技术方案，覆盖：

- Stripe 对接边界
- 套餐与 add-on 的资源映射
- usage metering
- 超额计费与停服策略
- Redeem 的完整账期干预
- 数据模型、接口、Webhook、页面状态

## 2. 已冻结业务决策

当前视为已冻结的业务决策：

1. 计费主体为 `company/workspace`
2. 套餐分为 `free`、`basic`、`pro`
3. 免费版每月 `500` 次
4. Basic 每月 `$199`，包含 `5000` 次、`3` 个管理员
5. Pro 每月 `$499`，包含 `20000` 次、`5` 个管理员
6. Basic 超额单价 `$0.12 / 次`
7. Pro 超额单价 `$0.08 / 次`
8. 每增加一个平台 `$99 / 月`
9. 每增加一个 billable admin `$49 / 月`
10. 付费版支持：
    - 达量停服
    - 自动超额扣费
11. 自然流如果进入免费版，不要求绑卡
12. 自然流如果开始 Basic / Pro trial，必须先绑卡
13. Redeem 需要支持完整账期干预

## 3. 技术收敛

为了让实现可控，技术上统一做以下收敛：

1. 计费主键统一抽象为 `billing_account`
2. `billing_account` 通过 `owner_type + owner_id` 支持 `company` / `workspace`
3. v1 主路径仍以 `company` 为主
4. 套餐代码固定为：
   - `free`
   - `basic`
   - `pro`
5. 免费版不在 Stripe 中创建 `$0` 订阅
6. Basic / Pro 才进入 Stripe 订阅体系
7. 平台加购与管理员加购都使用 Stripe licensed recurring price
8. usage 超额使用 Stripe meter / metered price
9. 订阅变更不完全交给 Customer Portal
10. Customer Portal 只负责：
    - 支付方式
    - 发票历史
    - 账单信息
11. 升级 / 降级 / 取消 / 恢复 / Redeem 走我们自己的 API
12. `预充值钱包 + 自动信用卡补扣` 不进入 v1

## 3.1 v1 非范围

以下能力不进入当前实现：

1. 预充值钱包
2. 储值余额自动补扣
3. 年度套餐

## 4. 当前仓库约束

### 4.1 服务端入口

当前应用已具备：

- 自定义服务端入口 [src/server.ts](/Users/kaikai/LuciusAI/lucius-client-app/src/server.ts)
- SSR + 自定义 `/api/*`
- Supabase session 同步
- 高权限 DB 入口 [src/db.ts](/Users/kaikai/LuciusAI/lucius-client-app/src/db.ts)

因此计费 API 建议直接放在 `lucius-client-app`。

### 4.2 数据库变更

根据仓库协作规范：

1. 所有 DDL 必须改  
   [schema.prisma](/Users/kaikai/LuciusAI/lucius-api-server/prisma/schema.prisma)
2. 所有 migration 必须写到  
   [prisma/migrations](/Users/kaikai/LuciusAI/lucius-api-server/prisma/migrations)
3. 禁止直接在线改 Supabase 结构

### 4.3 Prisma 现状

当前 Prisma datasource 还没有 `billing` schema。

因此需要：

1. 新增 `billing` schema
2. 把 `billing` 加入 Prisma datasource.schemas

## 5. 统一术语

### 5.1 `billing_account`

唯一计费主体。

一个 `billing_account` 可以对应：

- 一个 `company`
- 一个 `workspace`

### 5.2 `billable action`

技术定义建议固定为：

`1 次 billable action = Lucius 成功完成一次对客户可见、可审计、可唯一标识的实际动作，并写入一条 billing usage ledger。`

必须满足：

1. 内部数据库查询不单独计费
2. 重试不重复计费
3. 失败或 no-op 不计费
4. 同一业务动作复用同一个 `usage_key`

### 5.3 `billable admin seat`

建议定义：

`当前账期内拥有任一“高级查询 / 数据库查询 / 高级运营”能力的成员席位。`

说明：

1. 按席位数计费
2. 一个成员只占一个席位
3. 席位变化按当前 quantity 同步到 Stripe

### 5.4 `managed platform slot`

建议定义：

`一个已启用并完成 onboarding 的平台类型。`

例如：

- Discord
- Telegram
- Slack
- Feishu

同一 `company` 同时启用 Discord + Slack = 2 个平台。

### 5.5 `overage_mode`

- `stop_service`
  - 达到 included quota 后停止新的 billable action
- `auto_charge`
  - 达到 included quota 后继续执行，并对超额部分自动计费

## 6. 套餐模型与 Stripe 映射

## 6.1 套餐总览

| 计划 | 基础月费 | included actions | included admins | included platforms | 计费系统 |
| --- | ---: | ---: | ---: | ---: | --- |
| `free` | $0 | 500 | 1（建议默认值） | 1（建议默认值） | 本地 |
| `basic` | $199 | 5000 | 3 | 1（建议默认值） | Stripe |
| `pro` | $499 | 20000 | 5 | 1（建议默认值） | Stripe |

## 6.2 Stripe 对象映射

| 业务对象 | Stripe 对象 | 说明 |
| --- | --- | --- |
| 付费账户 | Customer | `basic` / `pro` 用户才创建 |
| 基础套餐月费 | Subscription item / recurring licensed price | `basic_base_monthly`、`pro_base_monthly` |
| 平台加购 | Subscription item / recurring licensed price | `platform_addon_monthly` |
| 管理员加购 | Subscription item / recurring licensed price | `admin_addon_monthly` |
| 超额次数 | Meter + metered price | `basic_action_overage`、`pro_action_overage` |
| 开通 trial / 购买 | Checkout Session | Hosted Checkout |
| 支付方式与发票 | Customer Portal Session | 不放开订阅变更 |
| 账期干预 | Subscription Schedule | 用于 Redeem 追加 promo phase |

## 6.3 不建议的做法

1. 不建议用本地计算超额后手动补 invoice item 替代 meter
2. 不建议把平台和管理员加购做成单独的本地“伪订阅”
3. 不建议对免费版创建 Stripe `$0` 订阅

## 7. 为什么采用「Subscription + Licensed Add-ons + Metered Overage」

因为当前价格模型本质上是三层组合：

1. 固定月费
2. 固定数量 add-on
3. 用量超额

因此最自然的实现是：

1. 基础套餐走 recurring monthly price
2. 平台、管理员加购走 licensed recurring price + quantity
3. 超额次数走 metered usage price

这样 Stripe 发票会天然拆成：

- 基础月费
- 平台加购
- 管理员加购
- usage overage

同时 Redeem 这类“延长账期”动作继续由 Subscription Schedule 处理。

## 8. Stripe 资源设计

## 8.1 Product / Price 建议

建议创建以下 Stripe Price：

- `basic_base_monthly`
- `pro_base_monthly`
- `platform_addon_monthly`
- `admin_addon_monthly`
- `basic_action_overage`
- `pro_action_overage`

建议全部使用 `lookup_key` 查找，不在代码中硬编码 `price_id`。

## 8.2 Meter 建议

建议创建两个 meter：

- `basic_billable_actions`
- `pro_billable_actions`

当账户升级或降级时，对应的 metered subscription item 也需要切换。

## 8.3 Portal 范围

Portal 只开放：

- 更新支付方式
- 查看账单历史
- 下载 invoice

Portal 不开放：

- 升级
- 降级
- 取消
- 恢复

原因：

这些动作会影响 add-on quantity、overage policy、Redeem schedule，必须由我们自己的策略层统一处理。

## 9. 数据模型设计

## 9.1 新 schema

新增 `billing` schema。

## 9.2 核心表

### 9.2.1 `billing.billing_account`

用途：唯一计费主体主表。

建议字段：

- `id uuid pk`
- `owner_type text`
- `owner_id uuid`
- `company_id uuid`
- `workspace_id uuid null`
- `plan_code text`
- `plan_source text`
- `status text`
- `stripe_customer_id text unique null`
- `overage_mode text`
- `overage_spend_cap_usd numeric null`
- `included_actions integer`
- `included_admins integer`
- `included_platforms integer`
- `current_billable_admin_count integer`
- `current_platform_count integer`
- `created_by uuid`
- `created_at timestamptz`
- `updated_at timestamptz`

说明：

1. `free` 账户也会有 `billing_account`
2. 只有从 `free` 升级到付费时，`stripe_customer_id` 才必填

### 9.2.2 `billing.billing_subscription`

用途：Stripe 主订阅快照。

建议字段：

- `id uuid pk`
- `billing_account_id uuid fk`
- `stripe_subscription_id text unique`
- `stripe_schedule_id text null`
- `plan_code text`
- `stripe_status text`
- `cancel_at_period_end boolean`
- `trial_start_at timestamptz null`
- `trial_end_at timestamptz null`
- `current_period_start_at timestamptz null`
- `current_period_end_at timestamptz null`
- `next_billing_at timestamptz null`
- `raw_snapshot jsonb`
- `created_at timestamptz`
- `updated_at timestamptz`

### 9.2.3 `billing.billing_subscription_item`

用途：本地映射 Stripe subscription items。

建议字段：

- `id uuid pk`
- `billing_subscription_id uuid fk`
- `stripe_subscription_item_id text unique`
- `item_code text`
- `lookup_key text`
- `quantity integer null`
- `meter_code text null`
- `unit_amount numeric null`
- `raw_snapshot jsonb`
- `created_at timestamptz`
- `updated_at timestamptz`

建议 `item_code`：

- `base_plan`
- `platform_addon`
- `admin_addon`
- `action_overage`

### 9.2.4 `billing.billing_checkout_session`

用途：记录每次 Hosted Checkout 发起与完成情况。

建议字段：

- `id uuid pk`
- `billing_account_id uuid fk`
- `stripe_checkout_session_id text unique`
- `target_plan_code text`
- `status text`
- `initiated_by uuid`
- `success_url text`
- `cancel_url text`
- `completed_at timestamptz null`
- `raw_snapshot jsonb`
- `created_at timestamptz`
- `updated_at timestamptz`

### 9.2.5 `billing.billing_usage_event`

用途：本地 usage ledger，是真正的计费审计源。

建议字段：

- `id uuid pk`
- `billing_account_id uuid fk`
- `usage_key text unique`
- `source_type text`
- `source_id text`
- `platform text`
- `action_type text`
- `quantity integer default 1`
- `billable_at timestamptz`
- `billing_period_key text`
- `stripe_meter_event_id text null`
- `export_status text`
- `raw_context jsonb`
- `created_at timestamptz`

说明：

1. 真实的“每次”就是这里的一条 ledger
2. 所有重试都必须复用同一个 `usage_key`

### 9.2.6 `billing.billing_usage_period`

用途：每个计费主体在每个账期内的聚合快照。

建议字段：

- `id uuid pk`
- `billing_account_id uuid fk`
- `period_key text`
- `period_start_at timestamptz`
- `period_end_at timestamptz`
- `plan_code text`
- `included_actions integer`
- `used_actions integer`
- `blocked_actions integer`
- `billable_overage_actions integer`
- `projected_overage_amount_usd numeric`
- `overage_mode text`
- `hard_limit_reached_at timestamptz null`
- `created_at timestamptz`
- `updated_at timestamptz`

说明：

该表服务于：

- UI 实时展示
- 达量停服判断
- 对账

### 9.2.7 `billing.billing_redeem_code`

用途：运营激活码。

建议字段：

- `id uuid pk`
- `code_hash text unique`
- `code_prefix text`
- `campaign_name text null`
- `grant_plan_code text default 'basic'`
- `grant_days integer`
- `max_redemptions integer`
- `redeemed_count integer`
- `starts_at timestamptz null`
- `expires_at timestamptz null`
- `status text`
- `created_by uuid null`
- `created_at timestamptz`
- `updated_at timestamptz`

### 9.2.8 `billing.billing_credit_grant`

用途：Redeem 后形成的账期权益。

建议字段：

- `id uuid pk`
- `billing_account_id uuid fk`
- `redeem_code_id uuid fk`
- `target_plan_code text`
- `grant_days integer`
- `grant_type text`
- `status text`
- `deferred_reason text null`
- `effective_start_at timestamptz null`
- `effective_end_at timestamptz null`
- `redeemed_by uuid`
- `redeemed_at timestamptz`
- `created_at timestamptz`
- `updated_at timestamptz`

建议 `grant_type`：

- `promo_only_basic`
- `extend_trial`
- `extend_after_current_period`
- `defer_until_basic`

### 9.2.9 `billing.billing_credit_application`

用途：记录 grant 如何被应用到 Stripe 或本地 entitlement。

建议字段：

- `id uuid pk`
- `credit_grant_id uuid fk`
- `billing_subscription_id uuid null`
- `application_type text`
- `stripe_schedule_id text null`
- `before_snapshot jsonb`
- `after_snapshot jsonb`
- `applied_at timestamptz`

### 9.2.10 `billing.billing_webhook_event`

用途：Webhook 幂等与重放。

建议字段：

- `id uuid pk`
- `stripe_event_id text unique`
- `event_type text`
- `delivery_status text`
- `received_at timestamptz`
- `processed_at timestamptz null`
- `last_error text null`
- `payload jsonb`

## 10. 计划配置建议

建议在服务端维护统一配置：

```ts
type PlanCode = 'free' | 'basic' | 'pro'

type PlanConfig = {
  planCode: PlanCode
  baseMonthlyAmountUsd: number
  includedActions: number
  includedAdmins: number
  includedPlatforms: number
  supportsTrial: boolean
  supportsOverage: boolean
  overageUnitAmountUsd: number | null
  stripeBaseLookupKey: string | null
  stripeOverageLookupKey: string | null
}
```

建议值：

- `free`
  - `includedActions = 500`
  - `supportsTrial = false`
  - `supportsOverage = false`
- `basic`
  - `base = 199`
  - `includedActions = 5000`
  - `includedAdmins = 3`
  - `overage = 0.12`
- `pro`
  - `base = 499`
  - `includedActions = 20000`
  - `includedAdmins = 5`
  - `overage = 0.08`

## 11. 服务端文件组织建议

```text
src/
├── lib/
│   ├── billing/
│   │   ├── types.ts
│   │   ├── plan-config.ts
│   │   ├── pricing-policy.ts
│   │   ├── stripe-client.ts
│   │   ├── stripe-price.ts
│   │   ├── usage-metering.ts
│   │   ├── usage-period.ts
│   │   ├── add-on-sync.ts
│   │   ├── redeem-engine.ts
│   │   ├── schedule-compiler.ts
│   │   ├── billing-summary.ts
│   │   ├── entitlement.ts
│   │   └── webhook-dispatcher.ts
│   └── server/
│       └── billing-api.ts
```

并在 [src/server.ts](/Users/kaikai/LuciusAI/lucius-client-app/src/server.ts) 注册：

- `/api/billing/*`
- `/api/billing/stripe/webhook`

注意：

- `/api/billing/stripe/webhook` 必须在 `withSupabaseSession` 之前处理
- webhook 不依赖登录态
- webhook handler 必须先读取 raw body 再验签

## 12. 核心流程

## 12.1 免费版开通

1. 创建 `billing_account`
2. `plan_code = free`
3. 不创建 Stripe Customer / Subscription
4. 使用本地 `billing_usage_period` 控制 500 次上限

## 12.2 开始 Basic / Pro Trial

1. 管理员在 Billing 页面点击 `开始试用`
2. 服务端确保存在 Stripe Customer
3. 创建 Checkout Session
4. Checkout 使用 `payment_method_collection = 'always'`
5. 完成后 Stripe 创建 trialing subscription
6. webhook 回写本地订阅状态

## 12.3 账期内 usage 计量

1. 后端实际动作完成后写入 `billing_usage_event`
2. 同步更新 `billing_usage_period`
3. 如果是付费版且 `auto_charge`
   - 上报 meter event 到 Stripe
4. 如果是付费版且 `stop_service`
   - 达到 included quota 后拒绝新的 billable action
5. 如果是免费版
   - 达到 500 次后拒绝新的 billable action

## 12.4 平台 / 管理员数量同步

1. 平台数量变化时，更新 `current_platform_count`
2. 管理员席位变化时，更新 `current_billable_admin_count`
3. 若当前为付费版：
   - 计算超出 included 的 quantity
   - 同步对应 Stripe subscription item quantity

## 12.5 账期结束

1. Stripe 对 base price、platform add-on、admin add-on 生成 recurring line items
2. Stripe 对 meter usage 生成 overage line item
3. webhook 回写 invoice / payment 状态

## 13. API 设计

## 13.1 `GET /api/billing/summary`

用途：Billing 页读取当前摘要。

返回建议：

```json
{
  "billingAccountId": "uuid",
  "planCode": "basic",
  "stripeStatus": "trialing",
  "displayState": "basic_trial",
  "overageMode": "auto_charge",
  "includedActions": 5000,
  "usedActions": 1820,
  "billableOverageActions": 0,
  "projectedOverageAmountUsd": 0,
  "includedAdmins": 3,
  "currentBillableAdminCount": 2,
  "includedPlatforms": 1,
  "currentPlatformCount": 1,
  "trialEndAt": "2026-03-17T00:00:00Z",
  "currentPeriodEndAt": "2026-03-17T00:00:00Z",
  "nextBillingAt": "2026-03-17T00:00:00Z",
  "actions": {
    "canStartTrial": false,
    "canUpgrade": true,
    "canDowngrade": false,
    "canCancel": true,
    "canResume": false,
    "canRedeem": true,
    "canOpenPortal": true,
    "canChangeOverageMode": true
  }
}
```

## 13.2 `POST /api/billing/checkout-session`

用途：创建 Basic / Pro 的 trial / 开通入口。

入参：

```json
{
  "ownerType": "company",
  "ownerId": "uuid",
  "targetPlanCode": "basic",
  "entryPoint": "settings_billing"
}
```

实现原则：

1. 仅管理员可调用
2. 当前若为 `free`，允许开始 trial
3. 当前若已是 `basic` / `pro`，根据变更策略走 change-plan，而不是新建 checkout

## 13.3 `PATCH /api/billing/usage-policy`

用途：切换 `stop_service` / `auto_charge`。

入参：

```json
{
  "ownerType": "company",
  "ownerId": "uuid",
  "overageMode": "auto_charge",
  "overageSpendCapUsd": 500
}
```

规则：

1. 免费版不可切换
2. 付费版可切换
3. 建议要求 `auto_charge` 模式必须提供 spend cap

## 13.4 `POST /api/billing/subscription/change-plan`

用途：`free -> basic`、`basic -> pro`、`pro -> basic`。

说明：

1. 付费版之间切换由服务端控制
2. 需要同时处理：
   - base plan item
   - overage item
   - Redeem defer grant

## 13.5 `POST /api/billing/subscription/cancel`

用途：取消付费订阅。

规则：

1. 默认 `cancel_at_period_end = true`
2. 如果存在 promo grant，需要重新编译 schedule

## 13.6 `POST /api/billing/subscription/resume`

用途：撤销取消。

规则：

1. 清除 `cancel_at_period_end`
2. 如果已存在系统托管 schedule，需要重新编译

## 13.7 `POST /api/billing/redeem`

用途：兑换运营激活码。

处理步骤：

1. 校验管理员身份
2. 锁定激活码
3. 创建 `billing_credit_grant`
4. 根据当前 plan 和订阅状态应用
5. 返回最新 `billing_summary`

## 13.8 `POST /api/billing/portal-session`

用途：打开支付方式和发票管理页。

## 13.9 `POST /api/billing/stripe/webhook`

用途：处理 Stripe 事件。

注意：

1. 读取 raw body
2. 验签
3. 插入 `billing_webhook_event`
4. 幂等分发
5. 不能走 `withSupabaseSession`

## 14. Checkout 实现细节

推荐使用 Hosted Checkout。

关键参数：

```ts
{
  mode: 'subscription',
  customer: stripeCustomerId,
  client_reference_id: billingAccountId,
  line_items: [
    { price: basePriceId, quantity: 1 },
    { price: platformAddonPriceId, quantity: extraPlatformQty },
    { price: adminAddonPriceId, quantity: extraAdminQty }
  ],
  payment_method_collection: 'always',
  success_url: `${APP_URL}/billing/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${APP_URL}/billing/checkout/cancel`,
  allow_promotion_codes: false,
  subscription_data: {
    trial_period_days: 7,
    metadata: {
      billing_account_id: billingAccountId,
      owner_type: ownerType,
      owner_id: ownerId,
      target_plan_code: targetPlanCode,
      overage_mode: overageMode
    }
  },
  metadata: {
    billing_account_id: billingAccountId,
    owner_type: ownerType,
    owner_id: ownerId,
    target_plan_code: targetPlanCode
  }
}
```

说明：

1. 超额 metered item 不需要在 Checkout line items 里显式让用户输入数量
2. 试用前绑卡依赖 `payment_method_collection: 'always'`
3. success page 只提示，不做最终开通

## 15. Usage Metering 设计

## 15.1 计量原则

所有真实计费都从本地 ledger 出发。

流程：

1. 实际动作完成
2. 写 `billing_usage_event`
3. 聚合更新 `billing_usage_period`
4. 如需对 Stripe 计费，再发送 meter event

## 15.2 为什么必须先写本地 ledger

原因：

1. 需要支持 `stop_service`
2. 需要支持审计
3. 需要支持重放
4. 需要支持对账
5. 需要在 Stripe 故障时重试补发 meter event

## 15.3 Meter 上报策略

建议：

1. 每个 `billing_usage_event` 对应一次 meter event
2. meter event 只在 `auto_charge` 的付费账户上报
3. `stop_service` 模式不允许超出 included，所以不产生 overage meter event

说明：

- 也可以选择对所有付费账户都上报 meter event，再通过本地逻辑保证 stop 模式不会超量
- v1 推荐简单化：只有可计费 overage 的动作才上报 Stripe

## 15.4 使用量拦截点

真正的 usage 计量和 stop-service 拦截点不在 `lucius-client-app`，而在实际生成 Lucius 动作的服务端链路。

建议最终落点：

- `lucius-api-server`
- 或 `lucius_agent` 的动作完成链路

当前文档只定义接口与数据模型，不在本轮修改旧 API 逻辑。

## 16. 平台 / 管理员 add-on 同步

## 16.1 平台数量

建议按 `distinct platform type` 计算。

示例：

- 仅 Discord = 1
- Discord + Slack = 2

实现上可从 `integration` schema 的启用连接聚合得到。

## 16.2 管理员数量

建议按“拥有 billable admin 权限的活跃成员数”计算。

实现上应从 `company_users` / `organization_member` 的角色与权限投影得到。

## 16.3 Stripe quantity 同步

每次平台或管理员数量变化：

1. 计算当前数量
2. 计算超出 included 的 add-on quantity
3. 更新本地快照
4. 更新 Stripe subscription item quantity

## 17. Redeem 与账期干预

## 17.1 核心原则

1. Redeem 默认发放 `basic 30 days promo`
2. Redeem 不做 Stripe promotion code
3. Redeem 由本地 `credit_grant` 驱动
4. 账期延长继续使用 Subscription Schedule

## 17.2 规则矩阵

### Case A: `free`

动作：

1. 直接获得 `basic` promo entitlement 30 天
2. 不立即要求绑卡
3. promo 到期后如继续使用，走 Basic / Pro Checkout

### Case B: `basic trialing`

动作：

1. 延长 `trial_end`
2. 记录 `extend_trial` application

### Case C: `basic active`

动作：

1. 在当前 paid period 结束后插入一个 promo phase
2. promo 结束后恢复 Basic 正常扣费

### Case D: `basic cancel_at_period_end`

动作：

1. 在当前 paid period 结束后插入一个 promo phase
2. promo 结束后真正停止

### Case E: `pro active / trialing / canceling`

动作：

1. promo 不覆盖当前 Pro
2. grant 标记为 `defer_until_basic`
3. 未来降级到 Basic 时自动应用

## 17.3 Schedule 编译输入

- 当前 `billing_account`
- 当前 `billing_subscription`
- 当前 Stripe subscription / schedule
- 所有 `pending` / `scheduled` / `deferred` 的 grants

## 17.4 编译输出

- 直接更新 `trial_end`
- 创建 schedule
- 更新 schedule
- 保留为本地 promo entitlement

## 18. Webhook 事件

## 18.1 必须监听

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`
- `invoice.upcoming`
- `subscription_schedule.created`
- `subscription_schedule.updated`
- `subscription_schedule.completed`
- `subscription_schedule.released`
- `subscription_schedule.canceled`

## 18.2 Webhook 顺序

1. 验签
2. 插入 `billing_webhook_event`
3. 若重复则直接返回 200
4. 分发处理
5. 更新 `billing_subscription`
6. 更新 `billing_subscription_item`
7. 必要时刷新 `billing_account` / `billing_summary`
8. 标记 `processed_at`

## 19. 页面状态设计

建议页面状态：

- `free_active`
- `free_limit_reached`
- `basic_trial`
- `basic_active`
- `basic_canceling`
- `pro_trial`
- `pro_active`
- `pro_canceling`
- `promo_only_basic`
- `past_due`
- `expired`

### CTA 示例

| 页面状态 | CTA |
| --- | --- |
| `free_active` | `开始 Basic 试用`、`开始 Pro 试用` |
| `free_limit_reached` | `升级到 Basic`、`升级到 Pro` |
| `basic_trial` | `取消试用`、`升级到 Pro`、`Redeem` |
| `basic_active` | `升级到 Pro`、`取消订阅`、`Redeem` |
| `basic_canceling` | `恢复订阅`、`Redeem` |
| `pro_active` | `联系销售`、`管理支付方式`、`Redeem` |
| `promo_only_basic` | `绑定支付方式并继续订阅`、`Redeem` |

## 20. 安全与幂等

### 20.1 环境变量

```bash
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PORTAL_CONFIGURATION_ID=
STRIPE_BASIC_BASE_MONTHLY_LOOKUP_KEY=basic_base_monthly
STRIPE_PRO_BASE_MONTHLY_LOOKUP_KEY=pro_base_monthly
STRIPE_PLATFORM_ADDON_MONTHLY_LOOKUP_KEY=platform_addon_monthly
STRIPE_ADMIN_ADDON_MONTHLY_LOOKUP_KEY=admin_addon_monthly
STRIPE_BASIC_ACTION_OVERAGE_LOOKUP_KEY=basic_action_overage
STRIPE_PRO_ACTION_OVERAGE_LOOKUP_KEY=pro_action_overage
```

### 20.2 幂等要求

1. Checkout 创建使用 idempotency key
2. usage ledger 以 `usage_key` 唯一约束
3. Stripe meter event 回写本地 `stripe_meter_event_id`
4. Webhook 以 `stripe_event_id` 幂等
5. Redeem 以事务 + 行锁幂等

## 21. 测试策略

## 21.1 单元测试

必须覆盖：

- `usage-metering.ts`
- `usage-period.ts`
- `add-on-sync.ts`
- `redeem-engine.ts`
- `schedule-compiler.ts`
- `billing-summary.ts`
- webhook dispatcher

### 核心边界

1. 免费版达到 500 次
2. Basic `stop_service` 到额停服
3. Basic `auto_charge` 超额累计
4. Basic -> Pro 升级后 overage meter 切换
5. admin / platform quantity 变更
6. Basic trial Redeem
7. Pro active Redeem 后 deferred
8. 重复 meter event
9. 重复 webhook
10. 重复 Redeem

## 21.2 集成测试

建议使用 Stripe Test Clocks 验证：

1. Basic / Pro 7 天 trial 自动转正
2. monthly recurring invoice
3. add-on proration
4. meter-based overage 出账
5. cancel_at_period_end + promo phase
6. promo 结束后恢复收费或停止

## 21.3 手工验收

至少验收：

1. 免费版开通
2. 免费版达量停服
3. Basic trial 前绑卡
4. Basic auto-charge 超额
5. Basic stop-service 达量停服
6. Pro overage
7. 平台加购
8. 管理员加购
9. Redeem
10. Portal 更新支付方式

## 22. 上线顺序

## Phase 1

- `billing` schema
- Billing Summary
- Free / Basic / Pro 基础 plan config
- Hosted Checkout
- Webhook 基础同步

## Phase 2

- 平台 / 管理员 add-on quantity sync
- usage ledger
- usage period summary
- free 达量停服

## Phase 3

- Basic / Pro overage metering
- `stop_service` / `auto_charge`
- 预计超额金额展示

## Phase 4

- Redeem
- schedule compiler
- Pro defer grant

## 23. 当前风险

1. 免费版 included platform / admin 仍是建议默认值，未最终拍板
2. “每次”的业务定义如果不尽快冻结，会影响 usage ledger 设计
3. 如果允许 Portal 直接取消，会绕过本地账期策略
4. 平台和管理员数量必须有稳定的数据源，否则 Stripe quantity 会漂移

## 24. 推荐落地结论

1. 免费版本地管理，不进 Stripe 订阅
2. Basic / Pro 使用：
   - base recurring price
   - platform/admin licensed add-ons
   - metered overage
3. Redeem 继续使用本地 grant + Stripe Subscription Schedule
4. 所有 billable action 先写本地 ledger，再决定是否发 meter event

## 25. 参考文档

以下 Stripe 官方文档已于 2026-03-10 校验：

- [Build subscriptions with Stripe Billing](https://docs.stripe.com/billing/subscriptions/build-subscriptions)
- [Checkout Session create API](https://docs.stripe.com/api/checkout/sessions/create)
- [Customer Portal integration](https://docs.stripe.com/customer-management/integrate-customer-portal)
- [Customer Portal Session create API](https://docs.stripe.com/api/customer_portal/sessions/create)
- [Usage-based billing](https://docs.stripe.com/billing/subscriptions/usage-based)
- [Meters](https://docs.stripe.com/billing/subscriptions/usage-based/meters)
- [Record usage with the API](https://docs.stripe.com/billing/subscriptions/usage-based/recording-usage-api)
- [Subscription schedules](https://docs.stripe.com/billing/subscriptions/subscription-schedules)
- [Webhooks](https://docs.stripe.com/webhooks)
- [Manage prices with lookup keys](https://docs.stripe.com/products-prices/manage-prices)
- [Test clocks](https://docs.stripe.com/billing/testing/test-clocks)
