import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  BarChart3,
  Check,
  Globe2,
  Plus,
  Search,
  X,
} from "lucide-react";
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type ComponentType,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import { DashboardPageHeader } from "@/components/dashboard-page-header";
import {
  DashboardPageLayout,
  DashboardPageLayoutCard,
} from "@/components/dashboard-page-layout";
import { AssistTaskMessageRichText } from "@/components/dashboard/assist-task-message-rich-text";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { requireAuthOrRedirect } from "@/lib/auth/guard";
import { DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO } from "@/lib/client-chat-recording";
import { resolveAdoptedKnowledgePopoverPlacement } from "@/lib/assist-task-detail-adopted-knowledge";
import { shouldShowAssistTaskLifecycleActionBar } from "@/lib/assist-task-detail-actions";
import { resolveAssistTaskDetailMessageScope } from "@/lib/assist-task-detail-message-scope";
import { resolveAssistTaskEventMentionDisplayName } from "@/lib/assist-task-message-mention";
import { resolveAssistTaskReplyComposerState } from "@/lib/assist-task-detail-reply-composer";
import {
  resolveSelectedAssistTaskEventRow,
  shouldDeferAssistTaskEventActionsUntilDetailLoaded,
  shouldFetchSelectedAssistTaskEventDetail,
} from "@/lib/assist-task-detail-selection";
import { shouldShowAssistTaskSuggestedReplyReviewCard } from "@/lib/assist-task-detail-suggested-reply";
import {
  resolveAssistTaskStatusIconTone,
  type AssistTaskStatusIconTone,
} from "@/lib/assist-task-status-icon";
import {
  setSelectedCompanyId,
  useSelectedCompanyId,
} from "@/lib/company-selection";
import { isDemoMode } from "@/lib/demo/mode";
import {
  useConfirmAssistTaskEventReply,
  useIgnoreAssistTaskEvent,
  useSendAssistTaskEventMessage,
  useTakeOverAssistTaskEvent,
} from "@/lib/services/agent-event-action";
import {
  assistTaskEventKeys,
  useAssistTaskEventAdoptedKnowledge,
  useAssistTaskEventDetail,
  useAssistTaskEventMessages,
  type AssistTaskAdoptedKnowledgeItem,
  type AssistTaskEventAdoptedKnowledge,
  useAssistTaskEvents,
  type AssistTaskEventMessage,
  type EventTypeOption,
  type EventStatusFilter,
  type EventTypeFilter,
  type LuciusAgentEventRow,
} from "@/lib/services/agent-event-query";
import { useCurrentUserCompanies } from "@/lib/services/company-membership-query";
import {
  resolveCompanyOnboardingRedirectTarget,
  useCurrentCompanyOnboardingProgress,
} from "@/lib/services/company-onboarding-progress";
import { DEFAULT_AUTHENTICATED_PATH } from "@/lib/services/auth-entry";
import {
  useViewportProfile,
  type ViewportPanelMode,
} from "@/lib/use-viewport-profile";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async ({ location }) => {
    await requireAuthOrRedirect(location);

    /**
     * `/dashboard` 继续作为兼容入口保留，但统一跳到新的默认事件页：
     * - 兼容现有书签和历史跳转；
     * - 避免不同入口停留在 `/dashboard` 与 `/dashboard/event` 两套地址。
     */
    throw redirect({
      to: DEFAULT_AUTHENTICATED_PATH,
      replace: true,
    });
  },
  component: () => null,
});

const PAGE_SIZE = 50;

export type AssistTaskPageProps = {
  selectedEventId?: string | null;
  onSelectEvent?: (eventId: string) => void;
  onCloseEvent?: () => void;
};

function getStatusFilterOptions(): Array<{
  value: EventStatusFilter;
  label: string;
}> {
  return [
    { value: "pending", label: m.assist_tasks_filter_status_pending() },
    { value: "processing", label: m.assist_tasks_filter_status_taken_over() },
    { value: "ignored", label: m.assist_tasks_filter_status_ignored() },
    { value: "all", label: m.assist_tasks_filter_status_all() },
  ];
}

type EventTypeVisual = {
  label: string;
  className: string;
};

type AssistTaskDisplayStatus = "pending" | "taken_over" | "ignored";

/**
 * 将后端原始状态收口到当前页面真正展示的三态：
 * - `processing` 是当前“已接手”的真实存储值；
 * - 历史 `resolved / closed / done` 在新语义里都等价视为“已接手”；
 * - `ignored` 单独保留，其余未知值默认按 `pending` 兜底，避免 UI 失真。
 */
function resolveAssistTaskDisplayStatus(
  rawStatus: string | null,
): AssistTaskDisplayStatus {
  const normalizedStatus = (rawStatus || "").trim().toLowerCase();

  if (normalizedStatus === "ignored") {
    return "ignored";
  }

  if (["processing", "resolved", "closed", "done"].includes(normalizedStatus)) {
    return "taken_over";
  }

  return "pending";
}

type EventTypeKey =
  | "exception_issue"
  | "bug_report"
  | "usage_issue"
  | "order_issue"
  | "payment_issue"
  | "product_feedback"
  | "knowledge_request"
  | "assign_request"
  | "feedback"
  | "business_cooperation"
  | "unrecognized_information"
  | "advertisement"
  | "message_deletion"
  | "unknown";

function getEventTypeVisualMap(): Record<EventTypeKey, EventTypeVisual> {
  return {
    exception_issue: {
      label: m.assist_tasks_type_exception_issue(),
      className: "dashboard-event-chip dashboard-event-chip--danger",
    },
    bug_report: {
      label: m.assist_tasks_type_bug_report(),
      className: "dashboard-event-chip dashboard-event-chip--danger",
    },
    usage_issue: {
      label: m.assist_tasks_type_usage_issue(),
      className: "dashboard-event-chip dashboard-event-chip--info-strong",
    },
    order_issue: {
      label: m.assist_tasks_type_order_issue(),
      className: "dashboard-event-chip dashboard-event-chip--success",
    },
    payment_issue: {
      label: m.assist_tasks_type_payment_issue(),
      className: "dashboard-event-chip dashboard-event-chip--warning-soft",
    },
    product_feedback: {
      label: m.assist_tasks_type_product_feedback(),
      className: "dashboard-event-chip dashboard-event-chip--success",
    },
    knowledge_request: {
      label: m.assist_tasks_type_knowledge_request(),
      className: "dashboard-event-chip dashboard-event-chip--info",
    },
    assign_request: {
      label: m.assist_tasks_type_assign_request(),
      className: "dashboard-event-chip dashboard-event-chip--warning",
    },
    feedback: {
      label: m.assist_tasks_type_feedback(),
      className: "dashboard-event-chip dashboard-event-chip--success",
    },
    business_cooperation: {
      label: m.assist_tasks_type_business_cooperation(),
      className: "dashboard-event-chip dashboard-event-chip--purple",
    },
    unrecognized_information: {
      label: m.assist_tasks_type_unrecognized_information(),
      className: "dashboard-event-chip dashboard-event-chip--emerald",
    },
    advertisement: {
      label: m.assist_tasks_type_advertisement(),
      className: "dashboard-event-chip dashboard-event-chip--warning",
    },
    message_deletion: {
      label: m.assist_tasks_type_message_deletion(),
      className: "dashboard-event-chip dashboard-event-chip--neutral",
    },
    unknown: {
      label: m.assist_tasks_type_unknown(),
      className: "dashboard-event-chip dashboard-event-chip--neutral-strong",
    },
  };
}

type PlatformVisual = {
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

type PlatformKey =
  | "discord"
  | "telegram"
  | "slack"
  | "feishu"
  | "website"
  | "unknown";

/**
 * 平台图标统一渲染器：
 * - 使用本地静态品牌资源（SVG/PNG），确保图标是官方品牌样式；
 * - 通过 `object-contain` 保证不同长宽比图标在同一尺寸下视觉稳定。
 */
function PlatformBrandImageIcon(props: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { src, alt, className } = props;

  return (
    <img
      src={src}
      alt={alt}
      className={`size-4 shrink-0 object-contain ${className || ""}`}
      loading="lazy"
      decoding="async"
    />
  );
}

function getPlatformVisualMap(): Record<PlatformKey, PlatformVisual> {
  return {
    discord: {
      label: m.platform_discord(),
      Icon: ({ className }) => (
        <PlatformBrandImageIcon
          src="/platform-icons/discord.svg"
          alt={m.platform_discord()}
          className={className}
        />
      ),
    },
    telegram: {
      label: m.platform_telegram(),
      Icon: ({ className }) => (
        <PlatformBrandImageIcon
          src="/platform-icons/telegram.svg"
          alt={m.platform_telegram()}
          className={className}
        />
      ),
    },
    slack: {
      label: m.platform_slack(),
      Icon: ({ className }) => (
        <PlatformBrandImageIcon
          src="/platform-icons/slack.svg"
          alt={m.platform_slack()}
          className={className}
        />
      ),
    },
    feishu: {
      label: m.platform_feishu(),
      Icon: ({ className }) => (
        <PlatformBrandImageIcon
          src="/platform-icons/feishu.svg"
          alt={m.platform_feishu()}
          className={className}
        />
      ),
    },
    website: {
      label: m.platform_website(),
      Icon: Globe2,
    },
    unknown: {
      label: m.platform_unknown(),
      Icon: Globe2,
    },
  };
}

type AssistTaskItem = {
  id: string;
  title: string;
  ownerName: string;
  ownerAvatarUrl: string | null;
  typeVisual: EventTypeVisual;
  eventUserAvatarUrl: string | null;
  eventUserFallbackLabel: string;
  platformVisual: PlatformVisual;
  channelName: string;
  isOverdue: boolean;
  timeDisplayText: string;
  statusIconTone: AssistTaskStatusIconTone;
};

/**
 * 判断未知类型是否是对象：
 * - 该页面会读取 `context` JSON 字段；
 * - 先做类型守卫，避免直接索引导致运行时异常。
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * 将数据库中的 type 归一化到页面视觉 token：
 * - 兼容中英文与 snake_case 写法；
 * - 未识别类型统一回退到 unknown，确保 UI 始终可渲染。
 */
function normalizeEventTypeKey(rawType: string | null): EventTypeKey {
  const normalizedType = (rawType || "").trim().toLowerCase();

  if (!normalizedType) {
    return "unknown";
  }

  if (
    ["exception_issue", "abnormal_issue", "异常问题"].includes(normalizedType)
  ) {
    return "exception_issue";
  }

  if (["bug_report", "bug", "bug报告", "bug report"].includes(normalizedType)) {
    return "bug_report";
  }

  if (["usage_issue", "use_issue", "使用问题"].includes(normalizedType)) {
    return "usage_issue";
  }

  if (["order_issue", "订单问题"].includes(normalizedType)) {
    return "order_issue";
  }

  if (["payment_issue", "amount_issue", "金额问题"].includes(normalizedType)) {
    return "payment_issue";
  }

  if (["product_feedback", "feedback", "产品反馈"].includes(normalizedType)) {
    return "product_feedback";
  }

  if (["knowledge_request", "知识咨询", "knowledge"].includes(normalizedType)) {
    return "knowledge_request";
  }

  if (["assign_request", "assign", "指派请求"].includes(normalizedType)) {
    return "assign_request";
  }

  if (
    ["business_cooperation", "cooperation", "商务合作"].includes(normalizedType)
  ) {
    return "business_cooperation";
  }

  if (
    [
      "unrecognized_information",
      "unrecognized_info",
      "无法识别信息",
      "无法识别内容",
    ].includes(normalizedType)
  ) {
    return "unrecognized_information";
  }

  if (["advertisement", "ad", "广告"].includes(normalizedType)) {
    return "advertisement";
  }

  if (
    [
      "message_deletion",
      "message_deleted",
      "message_delete",
      "消息删除",
      "lucius消息被删除",
    ].includes(normalizedType)
  ) {
    return "message_deletion";
  }

  return "unknown";
}

/**
 * 归一化事件类型 code：
 * - 与 `event_type_config.type_key` 对齐使用大写；
 * - 用于从配置表映射展示文案。
 */
function normalizeEventTypeCode(rawType: string | null): string {
  return (rawType || "").trim().toUpperCase();
}

/**
 * 平台名归一化：
 * - 兼容枚举值、别名（如 lark -> feishu）和前后缀；
 * - 保证列表里每条事件都能映射到稳定的平台视觉 token。
 */
function normalizePlatformKey(rawPlatform: string): PlatformKey {
  const normalizedPlatform = rawPlatform.trim().toLowerCase();

  if (normalizedPlatform.includes("discord")) {
    return "discord";
  }

  if (normalizedPlatform.includes("telegram")) {
    return "telegram";
  }

  if (normalizedPlatform.includes("slack")) {
    return "slack";
  }

  if (
    normalizedPlatform.includes("feishu") ||
    normalizedPlatform.includes("lark")
  ) {
    return "feishu";
  }

  if (normalizedPlatform.includes("website")) {
    return "website";
  }

  return "unknown";
}

/**
 * 解析平台可视化配置：
 * - 统一平台图标和文案映射；
 * - 未识别平台回退到通用图标，避免“错误平台图标”误导。
 */
function getPlatformVisual(rawPlatform: string): PlatformVisual {
  const platformKey = normalizePlatformKey(rawPlatform);
  return getPlatformVisualMap()[platformKey];
}

/**
 * 将 ISO 时间字符串转为可用时间戳：
 * - 返回 null 表示无效时间；
 * - 供“超时判断/相对时间格式化”复用。
 */
function parseIsoTimeToMs(rawTime: string | null): number | null {
  if (!rawTime) {
    return null;
  }

  const parsedTime = Date.parse(rawTime);
  return Number.isNaN(parsedTime) ? null : parsedTime;
}

/**
 * 生成“已超时 X 小时/天”的文本：
 * - 与 Figma 右侧时间列语义保持一致；
 * - 最小粒度使用小时，避免频繁抖动。
 */
function formatOverdueText(referenceTime: string | null): string {
  const dueAtMs = parseIsoTimeToMs(referenceTime);

  if (!dueAtMs) {
    return m.assist_tasks_overdue_default();
  }

  const overdueHours = Math.max(
    Math.floor((Date.now() - dueAtMs) / (1000 * 60 * 60)),
    1,
  );

  if (overdueHours >= 24) {
    const overdueDays = Math.floor(overdueHours / 24);
    return m.assist_tasks_overdue_days({ count: String(overdueDays) });
  }

  return m.assist_tasks_overdue_hours({ count: String(overdueHours) });
}

/**
 * 格式化非超时事件时间：
 * - 1小时内显示“X 分钟前”；
 * - 24小时内显示“X 小时前”；
 * - 更久显示“MM-DD h:mm AM/PM”，对齐设计稿样式。
 */
function formatRelativeTimeText(sourceTime: string | null): string {
  const sourceMs = parseIsoTimeToMs(sourceTime);

  if (!sourceMs) {
    return "-";
  }

  const diffMinutes = Math.max(
    Math.floor((Date.now() - sourceMs) / (1000 * 60)),
    0,
  );

  if (diffMinutes < 1) {
    return m.common_just_now();
  }

  if (diffMinutes < 60) {
    return m.common_minutes_ago({ count: String(diffMinutes) });
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return m.common_hours_ago({ count: String(diffHours) });
  }

  const date = new Date(sourceMs);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const hour = date.getHours();
  const period = hour >= 12 ? "PM" : "AM";
  const twelveHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${month}-${day} ${twelveHour}:${minute} ${period}`;
}

/**
 * 读取 context 里的字符串字段：
 * - 支持多个候选 key；
 * - 非字符串或空字符串一律忽略，避免脏数据污染 UI。
 */
function pickContextString(context: unknown, keys: string[]): string | null {
  if (!isRecord(context)) {
    return null;
  }

  for (const key of keys) {
    const rawValue = context[key];
    if (typeof rawValue !== "string") {
      continue;
    }

    const normalizedValue = rawValue.trim();
    if (normalizedValue) {
      return normalizedValue;
    }
  }

  return null;
}

/**
 * 构建事件用户头像兜底字母：
 * - 优先使用上下文里的用户名/展示名；
 * - 缺失时退回 `event.user_id` 首字符，确保单头像也有稳定占位。
 */
function buildEventUserFallbackLabel(row: LuciusAgentEventRow): string {
  const contextUserLabel =
    pickContextString(row.context, [
      "user_display_name",
      "userDisplayName",
      "username",
      "user_name",
      "sender_name",
      "senderName",
    ]) || row.user_id;

  const normalizedLabel = (contextUserLabel || "").trim();
  return (normalizedLabel || m.common_unknown()).slice(0, 1).toUpperCase();
}

/**
 * 将数据库事件行映射为页面渲染模型：
 * - 统一处理空值/未知值，避免 JSX 层分支过多；
 * - 计算超时、人工确认、优先级等衍生状态。
 */
function mapEventRowToItem(
  row: LuciusAgentEventRow,
  typeLabelByCode: Map<string, string>,
): AssistTaskItem {
  const eventTypeVisualMap = getEventTypeVisualMap();
  const contextOwnerName = pickContextString(row.context, [
    "owner_display_name",
    "ownerDisplayName",
    "assignee",
  ]);
  const contextOwnerAvatarUrl = pickContextString(row.context, [
    "owner_avatar_url",
    "ownerAvatarUrl",
    "assignee_avatar_url",
    "assigneeAvatarUrl",
  ]);
  const contextChannelName = pickContextString(row.context, [
    "channel_name",
    "channelName",
  ]);
  const contextPlatform = pickContextString(row.context, [
    "platform",
    "platform_type",
  ]);
  const rawPlatform = row.platform || contextPlatform || "discord";
  const platformKey = normalizePlatformKey(rawPlatform);
  const priorityValue = (row.priority || "").trim().toLowerCase();

  const effectiveEventType = (row.event_type || "").trim();
  const typeKey = normalizeEventTypeKey(effectiveEventType);
  const baseTypeVisual = eventTypeVisualMap[typeKey];
  const normalizedTypeCode = normalizeEventTypeCode(effectiveEventType);
  const configuredTypeLabel = normalizedTypeCode
    ? typeLabelByCode.get(normalizedTypeCode)
    : undefined;
  const fallbackTypeLabel = effectiveEventType;
  const typeVisual: EventTypeVisual = {
    ...baseTypeVisual,
    label:
      configuredTypeLabel ||
      (typeKey === "unknown"
        ? fallbackTypeLabel || baseTypeVisual.label
        : baseTypeVisual.label),
  };
  const platformVisual = getPlatformVisual(rawPlatform);
  const statusValue = (row.status || "").trim().toLowerCase();
  const displayStatus = resolveAssistTaskDisplayStatus(row.status);

  /**
   * `lucius_agent.event` 有 `sla_due_at`：
   * - 优先按 SLA 到期时间判断超时；无 SLA 时不判超时；
   * - 只有 `pending` 事件仍处于待处理队列，已接手/已忽略都不应继续算作超时。
   */
  const dueAtMs = parseIsoTimeToMs(row.sla_due_at);
  const isOverdue = Boolean(
    displayStatus === "pending" && dueAtMs && dueAtMs < Date.now(),
  );

  const timeDisplayText = isOverdue
    ? formatOverdueText(row.sla_due_at)
    : formatRelativeTimeText(
        row.last_activity_at || row.updated_at || row.created_at,
      );

  /**
   * 列表左侧状态图标与实际生命周期对齐：
   * - `processing` 仍属于“进行中”，不应继续显示绿色完成勾；
   * - `resolved / closed / done` 虽然仍归到“已接手”分组筛选，但图标层面要恢复成“已完成”；
   * - 具体映射收口到独立 helper，避免列表与后续扩展场景各自维护一套判断。
   */
  const statusIconTone = resolveAssistTaskStatusIconTone(
    statusValue,
    priorityValue,
  );

  return {
    id: row.id,
    title:
      row.title.trim() || row.summary?.trim() || m.assist_tasks_unnamed_task(),
    ownerName:
      row.owner_display_name?.trim() ||
      contextOwnerName ||
      m.assist_tasks_no_owner(),
    ownerAvatarUrl: row.owner_avatar_url || contextOwnerAvatarUrl,
    typeVisual,
    eventUserAvatarUrl: row.event_user_avatar_url || null,
    eventUserFallbackLabel: buildEventUserFallbackLabel(row),
    platformVisual,
    /**
     * Website 事件没有“频道”概念：
     * - 当前库里 `channel_name` 为空是常态；
     * - 回退成平台名比显示“未知频道”更符合用户心智。
     */
    channelName:
      row.channel_name?.trim() ||
      contextChannelName ||
      (platformKey === "website"
        ? platformVisual.label
        : m.assist_tasks_unknown_channel()),
    isOverdue,
    timeDisplayText,
    statusIconTone,
  };
}

function PriorityIndicator({
  tone,
}: {
  tone: AssistTaskItem["statusIconTone"];
}) {
  if (tone === "handled") {
    return (
      <div className="dashboard-priority-indicator dashboard-priority-indicator--handled">
        <Check className="size-[12px]" />
      </div>
    );
  }

  if (tone === "ignored") {
    return (
      <div className="dashboard-priority-indicator--ignored relative size-[18px] shrink-0 rounded-[2px]">
        <div className="absolute left-[3.2px] top-[7.6px] h-[2px] w-[11.5px] -rotate-45 rounded-full bg-white" />
      </div>
    );
  }

  if (tone === "urgent") {
    return (
      <div className="dashboard-priority-indicator dashboard-priority-indicator--urgent">
        <span className="text-[14px] font-semibold leading-none">!</span>
      </div>
    );
  }

  if (tone === "taken_over") {
    return <TakenOverPriorityIndicatorIcon />;
  }

  return <PendingPriorityIndicatorIcon />;
}

/**
 * 待处理状态继续沿用现有黄色圆弧：
 * - 当前页面已经用这组视觉承载“仍待处理”的心智；
 * - 本次只替换 take over 后的状态，避免把 pending 识别也一起改掉。
 */
function PendingPriorityIndicatorIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      className="size-[18px] shrink-0 text-[var(--dashboard-priority-pending-bg)]"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M11.3393 16.5187C11.5239 17.112 11.1929 17.7501 10.5812 17.8592C9.63863 18.0275 8.67278 18.0446 7.72026 17.9078C6.39548 17.7175 5.12983 17.2341 4.01546 16.4929C2.9011 15.7516 1.96608 14.7712 1.2785 13.6229C0.590923 12.4747 0.168091 11.1875 0.0407994 9.85521C-0.0864919 8.5229 0.0849619 7.17898 0.542675 5.9213C1.00039 4.66363 1.73284 3.52387 2.68668 2.58503C3.64053 1.64618 4.79175 0.931895 6.05653 0.494176C6.96591 0.179451 7.91753 0.0134038 8.87495 9.78901e-05C9.49621 -0.00853622 9.94205 0.555297 9.87316 1.17279C9.80427 1.79028 9.24551 2.22514 8.62515 2.25965C8.00226 2.29429 7.38536 2.41522 6.79239 2.62044C5.84382 2.94873 4.9804 3.48445 4.26501 4.18858C3.54963 4.89271 3.00029 5.74753 2.65701 6.69078C2.31372 7.63404 2.18513 8.64198 2.2806 9.64122C2.37607 10.6404 2.69319 11.6058 3.20888 12.467C3.72456 13.3282 4.42583 14.0635 5.2616 14.6194C6.09737 15.1754 7.04661 15.5379 8.04019 15.6806C8.66129 15.7699 9.28993 15.7718 9.90811 15.6879C10.5238 15.6043 11.1548 15.9255 11.3393 16.5187Z"
        fill="currentColor"
      />
      <g transform="translate(12.8268 13.4352)">
        <path
          d="M2.52561 0.219034C3.02682 0.586231 3.14016 1.29605 2.71333 1.74756C2.38671 2.09307 2.03322 2.41217 1.65619 2.70184C1.16349 3.08037 0.468939 2.89522 0.154788 2.35917C-0.159363 1.82312 0.0282925 1.1404 0.504796 0.741674C0.634352 0.633265 0.759793 0.520029 0.880854 0.402208C1.32611 -0.0311332 2.02441 -0.148163 2.52561 0.219034Z"
          fill="currentColor"
        />
      </g>
      <g transform="translate(15.5124 9)">
        <path
          d="M1.36321 0C1.98453 0 2.49545 0.50561 2.41799 1.12208C2.35871 1.59383 2.26214 2.06015 2.12919 2.51665C1.95545 3.11318 1.28574 3.3743 0.715525 3.12754C0.145305 2.88078 -0.106801 2.21915 0.0419378 1.61589C0.0823782 1.45188 0.116647 1.2864 0.144673 1.11981C0.247748 0.507096 0.741887 0 1.36321 0Z"
          fill="currentColor"
        />
      </g>
      <g transform="translate(14.6844 3.7836)">
        <path
          d="M0.42645 0.249595C0.908649 -0.142227 1.62402 -0.0720305 1.95266 0.455256C2.20416 0.858758 2.42328 1.28156 2.60798 1.71968C2.84934 2.29221 2.49425 2.91719 1.8961 3.08528C1.29795 3.25337 0.685052 2.89887 0.420058 2.3369C0.348008 2.1841 0.270248 2.03406 0.186943 1.8871C-0.119453 1.34658 -0.0557479 0.641416 0.42645 0.249595Z"
          fill="currentColor"
        />
      </g>
      <g transform="translate(11.142 0.6534)">
        <path
          d="M0.0442161 0.781102C0.216678 0.184197 0.844238 -0.166304 1.41498 0.0792325C1.84328 0.263488 2.25663 0.480752 2.65126 0.729053C3.17715 1.05994 3.2443 1.7756 2.85043 2.25613C2.45657 2.73666 1.75114 2.79736 1.21192 2.48867C1.0713 2.40817 0.927832 2.33276 0.781786 2.26258C0.221764 1.99348 -0.128246 1.37801 0.0442161 0.781102Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

/**
 * take over 后的状态图标对齐 Figma `827:4985`：
 * - 独立成单独分支，避免继续和 pending 共用默认图标；
 * - 直接保留 18x18 画板、4px 圆角和手型路径，减少实现偏差。
 */
function TakenOverPriorityIndicatorIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      className="size-[18px] shrink-0"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        width="18"
        height="18"
        rx="4"
        fill="var(--dashboard-priority-taken-over-bg)"
      />
      <path
        d="M13.2529 4.00067C12.9934 4.00031 12.7371 4.05819 12.5029 4.17005V3.75067C12.5031 3.33358 12.3543 2.93014 12.0833 2.61306C11.8123 2.29599 11.437 2.08612 11.025 2.02128C10.6129 1.95644 10.1913 2.0409 9.83605 2.25943C9.48078 2.47796 9.21525 2.81619 9.0873 3.21317C8.82081 3.06862 8.52133 2.99578 8.21821 3.0018C7.91509 3.00781 7.61874 3.09247 7.35818 3.24748C7.09763 3.40249 6.88182 3.62253 6.73189 3.88604C6.58196 4.14955 6.50307 4.44749 6.50293 4.75067V8.75067L6.26418 8.36755C6.03228 7.96735 5.65138 7.67524 5.20474 7.55506C4.7581 7.43488 4.28205 7.4964 3.88064 7.72618C3.47922 7.95596 3.1851 8.33531 3.06256 8.7813C2.94002 9.2273 2.99902 9.70367 3.22668 10.1063C4.22668 12.2169 5.0348 13.7138 5.95918 14.6494C6.89293 15.5969 7.95293 16.0007 9.50293 16.0007C10.9611 15.999 12.3591 15.419 13.3902 14.3879C14.4213 13.3568 15.0013 11.9589 15.0029 10.5007V5.75067C15.0029 5.28654 14.8186 4.84142 14.4904 4.51323C14.1622 4.18505 13.7171 4.00067 13.2529 4.00067ZM14.0029 10.5007C14.0016 11.6937 13.5271 12.8376 12.6834 13.6812C11.8398 14.5248 10.696 14.9993 9.50293 15.0007C8.22918 15.0007 7.40855 14.6957 6.6698 13.9475C5.84293 13.1094 5.08168 11.6882 4.12168 9.66192C4.11609 9.64951 4.10983 9.63741 4.10293 9.62567C4.00347 9.45336 3.97654 9.2486 4.02805 9.05644C4.07957 8.86427 4.20531 8.70044 4.37762 8.60098C4.54992 8.50153 4.75468 8.47459 4.94685 8.52611C5.13902 8.57762 5.30285 8.70336 5.4023 8.87567C5.40489 8.88065 5.40782 8.88546 5.41105 8.89005L6.57793 10.765C6.63525 10.8575 6.72118 10.9288 6.82268 10.968C6.92418 11.0073 7.03571 11.0123 7.14033 10.9824C7.24496 10.9525 7.33698 10.8893 7.40241 10.8023C7.46785 10.7154 7.50314 10.6095 7.50293 10.5007V4.75067C7.50293 4.55176 7.58195 4.36099 7.7226 4.22034C7.86325 4.07969 8.05402 4.00067 8.25293 4.00067C8.45184 4.00067 8.64261 4.07969 8.78326 4.22034C8.92391 4.36099 9.00293 4.55176 9.00293 4.75067V8.50067C9.00293 8.63328 9.05561 8.76046 9.14938 8.85422C9.24314 8.94799 9.37032 9.00067 9.50293 9.00067C9.63554 9.00067 9.76272 8.94799 9.85648 8.85422C9.95025 8.76046 10.0029 8.63328 10.0029 8.50067V3.75067C10.0029 3.55176 10.0819 3.36099 10.2226 3.22034C10.3633 3.07969 10.554 3.00067 10.7529 3.00067C10.9518 3.00067 11.1426 3.07969 11.2833 3.22034C11.4239 3.36099 11.5029 3.55176 11.5029 3.75067V8.50067C11.5029 8.63328 11.5556 8.76046 11.6494 8.85422C11.7431 8.94799 11.8703 9.00067 12.0029 9.00067C12.1355 9.00067 12.2627 8.94799 12.3565 8.85422C12.4503 8.76046 12.5029 8.63328 12.5029 8.50067V5.75067C12.5029 5.55176 12.5819 5.36099 12.7226 5.22034C12.8633 5.07969 13.054 5.00067 13.2529 5.00067C13.4518 5.00067 13.6426 5.07969 13.7833 5.22034C13.9239 5.36099 14.0029 5.55176 14.0029 5.75067V10.5007Z"
        fill="white"
      />
    </svg>
  );
}

function EventTypeBadge({ visual }: { visual: EventTypeVisual }) {
  return (
    <Badge variant="outline" className={visual.className}>
      {visual.label}
    </Badge>
  );
}

/**
 * Lucius 回复卡公共壳：
 * - 把品牌头部、动作区和正文容器统一起来，避免“建议回复”和“人工回复”继续漂成两套视觉体系；
 * - 具体 CTA 由调用方注入，保留各自业务语义。
 */
function LuciusComposerCardShell(props: {
  headerActions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  const { headerActions, footer, children } = props;

  return (
    <div className="dashboard-lucius-composer-card">
      <div className="dashboard-lucius-composer-header">
        <div className="dashboard-lucius-composer-brand">
          <img
            src="/figma-auth/lucius-composer-mark.png"
            alt=""
            className="dashboard-lucius-composer-brand-mark"
          />
          <span className="dashboard-lucius-composer-brand-label">
            {m.common_lucius_ai_name()}
          </span>
        </div>

        {headerActions ? (
          <div className="dashboard-lucius-composer-header-actions">
            {headerActions}
          </div>
        ) : null}
      </div>

      <div className="dashboard-lucius-composer-body">
        {children}
        {footer ? (
          <div className="dashboard-lucius-composer-footer">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Lucius 回复卡：
 * - `Confirm and Send` 与 Website 专属的手动输入区继续共用同一张 composer；
 * - 非 Website 平台只保留建议回复确认，不再展示“Send to Lucius”输入框；
 * - 这样平台差异集中在 props 层，卡片本身只负责渲染。
 */
function LuciusReplyComposerCard(props: {
  canSendManualReply: boolean;
  canConfirmSuggestedReply: boolean;
  showSuggestedReply: boolean;
  suggestedReply: string;
  isConfirming: boolean;
  isConfirmDisabled: boolean;
  outboundMessageInput: string;
  isSendingManualReply: boolean;
  isSendManualReplyDisabled: boolean;
  headerActions?: ReactNode;
  onSuggestedReplyChange: (nextValue: string) => void;
  onConfirm: (content: string) => void;
  onOutboundMessageChange: (nextValue: string) => void;
  onOutboundMessageKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSendManualReply: () => void;
}) {
  const {
    canSendManualReply,
    canConfirmSuggestedReply,
    showSuggestedReply,
    suggestedReply,
    isConfirming,
    isConfirmDisabled,
    outboundMessageInput,
    isSendingManualReply,
    isSendManualReplyDisabled,
    headerActions,
    onSuggestedReplyChange,
    onConfirm,
    onOutboundMessageChange,
    onOutboundMessageKeyDown,
    onSendManualReply,
  } = props;
  const shouldShowFooter = canConfirmSuggestedReply || canSendManualReply;

  return (
    <LuciusComposerCardShell
      headerActions={headerActions}
      footer={
        shouldShowFooter ? (
          <>
            {canSendManualReply ? (
              <span
                className="dashboard-lucius-composer-plus"
                aria-hidden="true"
              >
                <Plus className="size-6" strokeWidth={1.75} />
              </span>
            ) : (
              <span
                className="dashboard-lucius-composer-footer-spacer"
                aria-hidden="true"
              />
            )}

            <div className="dashboard-lucius-composer-action-group">
              {canConfirmSuggestedReply ? (
                <Button
                  type="button"
                  variant="dashboardGhost"
                  onClick={() => {
                    onConfirm(suggestedReply);
                  }}
                  disabled={isConfirmDisabled}
                  className="dashboard-lucius-composer-confirm-button h-11 w-full rounded-[10px] px-4 text-[14px] font-semibold sm:h-10 sm:w-auto"
                >
                  {isConfirming
                    ? m.assist_tasks_confirming_reply()
                    : m.assist_tasks_confirm_reply()}
                </Button>
              ) : null}

              {canSendManualReply ? (
                <Button
                  type="button"
                  variant="dashboardPrimary"
                  onClick={onSendManualReply}
                  disabled={isSendManualReplyDisabled}
                  className="dashboard-lucius-composer-submit h-11 w-full rounded-[10px] px-4 text-[14px] font-semibold sm:h-10 sm:w-auto"
                >
                  {isSendingManualReply
                    ? m.assist_tasks_message_send_pending()
                    : m.assist_tasks_message_send()}
                </Button>
              ) : null}
            </div>
          </>
        ) : null
      }
    >
      {showSuggestedReply ? (
        <div className="dashboard-lucius-suggested-reply-surface">
          <Textarea
            value={suggestedReply}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              onSuggestedReplyChange(event.target.value);
            }}
            placeholder={m.assist_tasks_suggested_reply_input_placeholder()}
            readOnly={!canConfirmSuggestedReply}
            className="dashboard-detail-textarea dashboard-detail-textarea--suggested-reply dashboard-lucius-composer-textarea dashboard-lucius-composer-textarea--suggested min-h-[112px] resize-none !border-0 !rounded-none !bg-transparent p-0 !shadow-none focus-visible:!ring-0 focus-visible:ring-offset-0"
          />
        </div>
      ) : null}

      {showSuggestedReply && canSendManualReply ? (
        <div className="dashboard-lucius-composer-divider" aria-hidden="true" />
      ) : null}

      {canSendManualReply ? (
        <Textarea
          value={outboundMessageInput}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            onOutboundMessageChange(event.target.value);
          }}
          onKeyDown={onOutboundMessageKeyDown}
          placeholder={m.assist_tasks_message_input_placeholder()}
          className="dashboard-detail-textarea dashboard-detail-textarea--composer dashboard-lucius-composer-textarea min-h-[72px] resize-none !border-0 !rounded-none !bg-transparent p-0 !shadow-none focus-visible:!ring-0 focus-visible:ring-offset-0"
        />
      ) : null}
    </LuciusComposerCardShell>
  );
}

function EventUserAvatar(props: {
  avatarUrl: string | null;
  fallbackLabel: string;
}) {
  const { avatarUrl, fallbackLabel } = props;
  return (
    <div className="flex items-center pr-2">
      <Avatar className="size-5 border border-white">
        {avatarUrl ? (
          <AvatarImage
            src={avatarUrl}
            alt={m.assist_tasks_participant_avatar_alt()}
          />
        ) : null}
        <AvatarFallback className="dashboard-avatar-fallback--muted text-[10px]">
          {fallbackLabel}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

function AssistTaskRow(props: {
  item: AssistTaskItem;
  isSelected: boolean;
  onSelect: (eventId: string) => void;
}) {
  const { item, isSelected, onSelect } = props;
  const PlatformIcon = item.platformVisual.Icon;
  const ownerFallbackLabel =
    item.ownerName === m.assist_tasks_no_owner()
      ? m.assist_tasks_no_owner_short()
      : item.ownerName.slice(0, 1).toUpperCase();

  return (
    <button
      type="button"
      onClick={() => {
        onSelect(item.id);
      }}
      className="block w-full text-left"
      aria-label={m.assist_tasks_view_item({ title: item.title })}
    >
      <Card
        data-selected={isSelected ? "true" : "false"}
        className="dashboard-task-row-card dashboard-interactive-row rounded-none border-0 shadow-none"
      >
        <CardContent className="px-4 py-[14px] sm:px-6 sm:py-[18px]">
          <div className="dashboard-task-row-layout">
            <div className="dashboard-task-row-main">
              <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
                <PriorityIndicator tone={item.statusIconTone} />
                <p className="dashboard-task-row-title dashboard-text-primary break-words text-[14px] font-medium leading-[1.6] tracking-[-0.14px]">
                  {item.title}
                </p>
              </div>

              <div className="dashboard-task-row-subline">
                <EventTypeBadge visual={item.typeVisual} />

                <div className="dashboard-task-row-source">
                  <PlatformIcon className="size-4 shrink-0" />
                  <span className="truncate">{item.channelName}</span>
                </div>

                <span
                  className="dashboard-task-row-divider"
                  aria-hidden="true"
                />

                <EventUserAvatar
                  avatarUrl={item.eventUserAvatarUrl}
                  fallbackLabel={item.eventUserFallbackLabel}
                />
              </div>
            </div>

            <div className="dashboard-task-row-assignee-column">
              <div className="dashboard-task-row-assignee">
                <Avatar className="size-5 border border-[var(--dashboard-panel-border)]">
                  {item.ownerAvatarUrl ? (
                    <AvatarImage
                      src={item.ownerAvatarUrl}
                      alt={item.ownerName}
                    />
                  ) : null}
                  <AvatarFallback className="dashboard-avatar-fallback text-[10px]">
                    {ownerFallbackLabel}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate font-medium">{item.ownerName}</span>
              </div>
            </div>

            <div
              className={cn(
                "dashboard-task-row-time",
                item.isOverdue
                  ? "text-[var(--dashboard-badge-warning-soft-text)]"
                  : "dashboard-text-muted",
              )}
            >
              {item.timeDisplayText}
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

function FilterSelect(props: {
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (nextValue: string) => void;
  ariaLabel: string;
  className?: string;
}) {
  const { value, options, onChange, ariaLabel, className } = props;

  return (
    <div className={className || ""}>
      <Select
        value={value}
        onValueChange={(nextValue) => {
          onChange(nextValue);
        }}
      >
        <SelectTrigger
          aria-label={ariaLabel}
          className="dashboard-task-control dashboard-task-filter-trigger h-11 min-w-0 rounded-[12px] border-transparent px-3 text-[14px] font-semibold shadow-none focus-visible:border-transparent focus-visible:ring-0"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="dashboard-task-filter-content rounded-[10px] shadow-[0px_10px_28px_0px_rgba(30,41,59,0.14)]">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="dashboard-task-filter-item text-[14px]"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

type ListSkeletonRowConfig = {
  titleWidth: string;
  channelWidth: string;
  typeWidth: string;
  timeWidth: string;
};

/**
 * 列表行骨架：
 * - 直接贴合真实事件行的三列布局，避免 loading 完成后横向结构跳变；
 * - 负责人列与时间列都保留独立占位，保证首屏扫描节奏稳定。
 */
function AssistTaskRowSkeleton(props: ListSkeletonRowConfig) {
  const { titleWidth, channelWidth, typeWidth, timeWidth } = props;

  return (
    <Card className="dashboard-task-row-skeleton-card rounded-none border-0 bg-transparent shadow-none">
      <CardContent className="px-4 py-[14px] sm:px-6 sm:py-[18px]">
        <div className="dashboard-task-row-layout">
          <div className="dashboard-task-row-main">
            <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
              <Skeleton className="dashboard-skeleton--strong size-[18px] shrink-0 rounded-[2px]" />
              <Skeleton
                className="dashboard-skeleton--base h-4 max-w-full rounded-[4px]"
                style={{ width: titleWidth }}
              />
            </div>

            <div className="dashboard-task-row-subline">
              <Skeleton
                className="dashboard-skeleton--base h-6 shrink-0 rounded-full"
                style={{ width: typeWidth }}
              />

              <div className="flex min-w-0 items-center gap-2">
                <Skeleton className="dashboard-skeleton--base size-4 shrink-0 rounded-[4px]" />
                <Skeleton
                  className="dashboard-skeleton--soft h-3 max-w-full rounded-[4px]"
                  style={{ width: channelWidth }}
                />
              </div>

              <span className="dashboard-task-row-divider" aria-hidden="true" />

              <div className="flex items-center pr-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className={`dashboard-skeleton--strong size-5 rounded-full border border-[var(--dashboard-panel-bg)] ${
                      index > 0 ? "-ml-2" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-task-row-assignee-column">
            <Skeleton className="dashboard-skeleton--soft h-3 w-[72px] rounded-[4px]" />
            <div className="flex min-w-0 items-center gap-2">
              <Skeleton className="dashboard-skeleton--strong size-5 shrink-0 rounded-full" />
              <Skeleton className="dashboard-skeleton--soft h-3 w-[92px] rounded-[4px]" />
            </div>
          </div>

          <div className="dashboard-task-row-time">
            <Skeleton
              className="dashboard-skeleton--soft ml-auto h-5 rounded-[4px]"
              style={{ width: timeWidth }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Section 骨架：
 * - 与真实列表里的分组标题保持同样的边界与间距；
 * - `pending` 视图拆为两段时，骨架也同步拆分，避免结构跳变。
 */
function ListSkeletonSection(props: {
  headerWidth: string;
  rows: ListSkeletonRowConfig[];
}) {
  const { headerWidth, rows } = props;

  return (
    <>
      <div className="dashboard-task-section-heading">
        <Skeleton
          className="dashboard-skeleton--base h-6 rounded-[6px]"
          style={{ width: headerWidth }}
        />
      </div>

      {rows.map((row, index) => (
        <AssistTaskRowSkeleton
          key={`${row.titleWidth}-${row.channelWidth}-${index}`}
          titleWidth={row.titleWidth}
          channelWidth={row.channelWidth}
          typeWidth={row.typeWidth}
          timeWidth={row.timeWidth}
        />
      ))}
    </>
  );
}

function ListSkeleton(props: { showSplitSections: boolean }) {
  const { showSplitSections } = props;

  const overdueRows: ListSkeletonRowConfig[] = [
    {
      titleWidth: "62%",
      channelWidth: "68px",
      typeWidth: "74px",
      timeWidth: "64px",
    },
    {
      titleWidth: "54%",
      channelWidth: "82px",
      typeWidth: "88px",
      timeWidth: "52px",
    },
  ];

  const primaryRows: ListSkeletonRowConfig[] = [
    {
      titleWidth: "66%",
      channelWidth: "76px",
      typeWidth: "92px",
      timeWidth: "56px",
    },
    {
      titleWidth: "58%",
      channelWidth: "88px",
      typeWidth: "80px",
      timeWidth: "68px",
    },
    {
      titleWidth: "72%",
      channelWidth: "70px",
      typeWidth: "84px",
      timeWidth: "50px",
    },
    {
      titleWidth: "48%",
      channelWidth: "94px",
      typeWidth: "96px",
      timeWidth: "58px",
    },
  ];

  return (
    <div className="space-y-0">
      {showSplitSections ? (
        <>
          <ListSkeletonSection headerWidth="124px" rows={overdueRows} />
          <ListSkeletonSection headerWidth="108px" rows={primaryRows} />
        </>
      ) : (
        <ListSkeletonSection
          headerWidth="136px"
          rows={[...overdueRows, ...primaryRows]}
        />
      )}
    </div>
  );
}

/**
 * 任务页首屏骨架：
 * - 覆盖公司切换 / onboarding 守卫阶段的整页等待态；
 * - 默认只展示左侧列表骨架，避免用户首次进入列表页时误以为右侧已有选中任务；
 * - 仅在当前路由已经携带 `selectedEventId` 时，才展开右侧详情骨架以匹配直达详情页场景。
 */
function AssistTaskWorkspaceSkeleton(props: {
  hasDetailPanel?: boolean;
  panelMode?: ViewportPanelMode;
}) {
  const { hasDetailPanel = false, panelMode = "inline" } = props;
  const shouldRenderPageDetail = panelMode === "page" && hasDetailPanel;
  const shouldRenderDesktopInlineDetail =
    panelMode === "inline" && hasDetailPanel;
  const shouldRenderTabletOverlayDetail =
    panelMode === "sheet" && hasDetailPanel;
  const shouldRenderListPanel = !shouldRenderPageDetail;

  return (
    <DashboardPageLayout detailPresentation={panelMode}>
      <div
        className={cn(
          "dashboard-assist-task-shell",
          panelMode === "inline" && "dashboard-assist-task-shell--desktop",
        )}
        data-detail-mode={panelMode}
        data-has-detail={hasDetailPanel ? "true" : "false"}
        style={
          panelMode === "inline"
            ? {
                gridTemplateColumns: hasDetailPanel
                  ? "minmax(0,4fr) minmax(0,6fr)"
                  : "minmax(0,1fr) minmax(0,0fr)",
                gap: hasDetailPanel ? "8px" : "0px",
              }
            : undefined
        }
      >
        {shouldRenderListPanel ? (
          <DashboardPageLayoutCard className="dashboard-task-panel flex min-h-0 flex-col">
            <div className="flex h-[52px] items-center justify-between border-b border-[var(--dashboard-panel-border)] px-4">
              <div className="flex items-center gap-3">
                <Skeleton className="dashboard-skeleton--base h-8 w-[104px] rounded-[8px]" />
                <Skeleton className="dashboard-skeleton--soft h-8 w-[104px] rounded-[8px]" />
                <Skeleton className="dashboard-skeleton--soft h-8 w-[224px] rounded-[8px]" />
              </div>
              <Skeleton className="dashboard-skeleton--base h-4 w-[116px] rounded-[4px]" />
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <ListSkeleton showSplitSections />
            </div>
          </DashboardPageLayoutCard>
        ) : null}

        {shouldRenderPageDetail || shouldRenderDesktopInlineDetail ? (
          <div className="h-full min-h-0">
            <DashboardPageLayoutCard className="dashboard-task-detail-card flex min-h-0 flex-col">
              <header className="dashboard-task-detail-header">
                <p className="dashboard-task-detail-header-title">
                  {m.assist_tasks_event_detail_title()}
                </p>
                <Skeleton className="dashboard-skeleton--soft size-8 rounded-[6px]" />
              </header>

              <div className="space-y-4 px-4 py-5 sm:px-6">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Skeleton className="dashboard-skeleton--base h-5 w-[42%] rounded-[6px]" />
                    <Skeleton className="dashboard-skeleton--soft h-3 w-[26%] rounded-[4px]" />
                  </div>

                  <div className="dashboard-skeleton-surface rounded-[12px] border px-4 py-4">
                    <div className="space-y-3">
                      <Skeleton className="dashboard-skeleton--base h-4 w-[32%] rounded-[4px]" />
                      <Skeleton className="dashboard-skeleton--soft h-20 w-full rounded-[10px]" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Skeleton className="dashboard-skeleton--base h-4 w-[24%] rounded-[4px]" />
                    <Skeleton className="dashboard-skeleton--soft h-14 w-[86%] rounded-[10px]" />
                    <Skeleton className="dashboard-skeleton--accent ml-auto h-16 w-[72%] rounded-[10px]" />
                    <Skeleton className="dashboard-skeleton--soft h-12 w-[62%] rounded-[10px]" />
                  </div>
                </div>
              </div>
            </DashboardPageLayoutCard>
          </div>
        ) : null}

        {shouldRenderTabletOverlayDetail ? (
          <div className="dashboard-assist-task-sheet-layer">
            <div className="dashboard-assist-task-sheet-backdrop" />
            <aside className="dashboard-assist-task-sheet-panel">
              <DashboardPageLayoutCard className="dashboard-task-detail-card flex min-h-0 flex-col">
                <header className="dashboard-task-detail-header">
                  <p className="dashboard-task-detail-header-title">
                    {m.assist_tasks_event_detail_title()}
                  </p>
                  <Skeleton className="dashboard-skeleton--soft size-8 rounded-[6px]" />
                </header>

                <div className="space-y-4 px-4 py-5 sm:px-6">
                  <div className="space-y-2">
                    <Skeleton className="dashboard-skeleton--base h-5 w-[42%] rounded-[6px]" />
                    <Skeleton className="dashboard-skeleton--soft h-3 w-[26%] rounded-[4px]" />
                  </div>

                  <div className="dashboard-skeleton-surface rounded-[12px] border px-4 py-4">
                    <div className="space-y-3">
                      <Skeleton className="dashboard-skeleton--base h-4 w-[32%] rounded-[4px]" />
                      <Skeleton className="dashboard-skeleton--soft h-20 w-full rounded-[10px]" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Skeleton className="dashboard-skeleton--base h-4 w-[24%] rounded-[4px]" />
                    <Skeleton className="dashboard-skeleton--soft h-14 w-[86%] rounded-[10px]" />
                    <Skeleton className="dashboard-skeleton--accent ml-auto h-16 w-[72%] rounded-[10px]" />
                    <Skeleton className="dashboard-skeleton--soft h-12 w-[62%] rounded-[10px]" />
                  </div>
                </div>
              </DashboardPageLayoutCard>
            </aside>
          </div>
        ) : null}
      </div>
    </DashboardPageLayout>
  );
}

/**
 * 详情区状态卡片：
 * - 兼容“加载中 / 加载失败 / 未找到事件”三种非正常展示态；
 * - 保持右侧详情区宽度稳定，避免路由直达时出现空白闪动。
 */
function AssistTaskDetailStatePanel(props: {
  title: string;
  description: string;
  isLoading?: boolean;
  onClose: () => void;
}) {
  const { title, description, isLoading = false, onClose } = props;

  if (isLoading) {
    return (
      <DashboardPageLayoutCard className="dashboard-task-detail-card flex min-h-0 flex-col">
        <header className="dashboard-task-detail-header">
          <p className="dashboard-task-detail-header-title">
            {m.assist_tasks_event_detail_title()}
          </p>
          <Button
            type="button"
            variant="dashboardGhost"
            size="icon"
            onClick={onClose}
            className="dashboard-task-detail-close-button size-10 rounded-[8px]"
            aria-label={m.assist_tasks_close_event_detail()}
          >
            <X className="size-4" />
          </Button>
        </header>

        <div className="space-y-4 px-4 py-5 sm:px-6">
          <div className="space-y-2">
            <Skeleton className="dashboard-skeleton--base h-5 w-[38%] rounded-[6px]" />
            <Skeleton className="dashboard-skeleton--soft h-3 w-[24%] rounded-[4px]" />
          </div>

          <div className="dashboard-skeleton-surface rounded-[12px] border px-4 py-4">
            <div className="space-y-3">
              <Skeleton className="dashboard-skeleton--base h-4 w-[28%] rounded-[4px]" />
              <Skeleton className="dashboard-skeleton--soft h-16 w-full rounded-[10px]" />
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="dashboard-skeleton--base h-4 w-[22%] rounded-[4px]" />
            <Skeleton className="dashboard-skeleton--soft h-14 w-[84%] rounded-[10px]" />
            <Skeleton className="dashboard-skeleton--accent ml-auto h-16 w-[70%] rounded-[10px]" />
          </div>
        </div>
      </DashboardPageLayoutCard>
    );
  }

  return (
    <DashboardPageLayoutCard className="dashboard-task-detail-card flex min-h-0 flex-col">
      <header className="dashboard-task-detail-header">
        <p className="dashboard-task-detail-header-title">
          {m.assist_tasks_event_detail_title()}
        </p>
        <Button
          type="button"
          variant="dashboardGhost"
          size="icon"
          onClick={onClose}
          className="dashboard-task-detail-close-button size-10 rounded-[8px]"
          aria-label={m.assist_tasks_close_event_detail()}
        >
          <X className="size-4" />
        </Button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-4 text-center sm:px-6">
        <div className="flex size-11 items-center justify-center rounded-full bg-[var(--dashboard-soft-surface-strong)] text-[var(--dashboard-soft-icon-fg)]">
          <AlertTriangle className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="dashboard-text-title text-[15px] font-semibold">
            {title}
          </p>
          <p className="dashboard-text-muted text-[13px] leading-[1.6]">
            {description}
          </p>
        </div>
      </div>
    </DashboardPageLayoutCard>
  );
}

/**
 * 详情区时间展示（绝对时间）：
 * - 对齐 Figma 的 `01-27 8:31 PM` 样式；
 * - 时间无效时返回 `--`，避免 UI 出现 `Invalid Date`。
 */
function formatDetailAbsoluteTime(sourceTime: string | null): string {
  const sourceMs = parseIsoTimeToMs(sourceTime);
  if (!sourceMs) {
    return "--";
  }

  const date = new Date(sourceMs);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const hour = date.getHours();
  const period = hour >= 12 ? "PM" : "AM";
  const twelveHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${month}-${day} ${twelveHour}:${minute} ${period}`;
}

/**
 * 详情区消息角色标签：
 * - 优先与平台 message_role 对齐；
 * - 保留英文标签，贴近设计稿样式（User/Assistant）。
 */
function getRoleLabel(role: AssistTaskEventMessage["role"]): string {
  if (role === "assistant") return m.role_assistant();
  if (role === "user") return m.role_user();
  if (role === "bot") return m.role_bot();
  if (role === "lucius") return m.role_lucius();
  if (role === "staff") return m.role_staff();
  if (role === "admin") return m.role_admin();

  return m.role_unknown();
}

function isAssistantLikeRole(role: AssistTaskEventMessage["role"]): boolean {
  return ["assistant", "bot", "lucius", "staff", "admin"].includes(role);
}

/**
 * 取当前消息流的“最后一条消息 key”：
 * - 用于判断详情区是不是出现了新的尾部消息；
 * - 优先使用稳定的 `messageId`，缺失时再退回 `sentAt`，避免空值导致滚动判定失效。
 */
function resolveLatestAssistTaskMessageKey(
  messages: AssistTaskEventMessage[],
): string {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const candidateMessage = messages[index];
    const normalizedMessageId = candidateMessage.messageId.trim();
    const normalizedSentAt = (candidateMessage.sentAt || "").trim();

    if (normalizedMessageId) {
      return `${candidateMessage.platform}:${normalizedMessageId}`;
    }

    if (normalizedSentAt) {
      return `${candidateMessage.platform}:${normalizedSentAt}`;
    }
  }

  return "";
}

const AdoptedKnowledgePopover = forwardRef<
  HTMLDivElement,
  {
    knowledgeItems: AssistTaskAdoptedKnowledgeItem[];
    className?: string;
    style?: CSSProperties;
  }
>(function AdoptedKnowledgePopover(props, ref) {
  const { knowledgeItems, className, style } = props;

  return (
    <div
      ref={ref}
      className={cn(
        "dashboard-detail-popover overflow-hidden rounded-[4px]",
        className,
      )}
      style={style}
    >
      <header className="dashboard-detail-popover-header flex h-12 items-center px-6">
        <p className="dashboard-text-title text-[14px] font-semibold leading-none">
          {m.assist_tasks_adopted_knowledge_title({
            count: String(knowledgeItems.length),
          })}
        </p>
      </header>

      <div className="max-h-[272px] space-y-[11px] overflow-y-auto px-[22px] py-[11px]">
        {knowledgeItems.map((knowledgeItem, index) => (
          <article
            key={`${knowledgeItem.name}-${index}`}
            className="dashboard-detail-popover-item space-y-2 rounded-[4px] p-4"
          >
            <p className="dashboard-text-primary whitespace-pre-wrap break-words text-[14px] font-medium leading-[1.6] tracking-[-0.14px]">
              {knowledgeItem.name}
            </p>
            <p className="dashboard-text-muted whitespace-pre-wrap break-words text-[14px] font-medium leading-[1.6] tracking-[-0.14px]">
              {knowledgeItem.contentSnapshot}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
});

type AdoptedKnowledgePopoverState = {
  messageId: string;
  top: number;
  left: number;
  width: number;
};

type OptimisticAssistTaskMessageStatus = "sending" | "persisting";

type OptimisticAssistTaskMessage = {
  localId: string;
  message: AssistTaskEventMessage;
  status: OptimisticAssistTaskMessageStatus;
  serverMessageId: string | null;
};

type RenderableAssistTaskMessage = {
  key: string;
  message: AssistTaskEventMessage;
  pendingStatus: OptimisticAssistTaskMessageStatus | null;
};

/**
 * 事件详情也复用 chat 页的本地消息主键策略：
 * - 先生成稳定的本地 ID，立刻把消息塞进 UI；
 * - 等服务端返回真实 messageId 后，再用它和服务端列表对账。
 */
function generateOptimisticAssistTaskMessageId(): string {
  return `optimistic-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * 详情卡片组件：
 * - 负责渲染事件摘要、元信息和消息流水；
 * - 数据由页面层传入，组件保持纯展示，便于后续拆分动作 API。
 */
function AssistTaskDetailPanel(props: {
  companyId: string;
  item: AssistTaskItem;
  row: LuciusAgentEventRow;
  isWaitingForAuthoritativeStatus: boolean;
  messages: AssistTaskEventMessage[];
  adoptedKnowledgeEntries: AssistTaskEventAdoptedKnowledge[];
  isLoadingMessages: boolean;
  messageError: Error | null;
  adoptedKnowledgeError: Error | null;
  onClose: () => void;
}) {
  const {
    companyId,
    item,
    row,
    isWaitingForAuthoritativeStatus,
    messages,
    adoptedKnowledgeEntries,
    isLoadingMessages,
    messageError,
    adoptedKnowledgeError,
    onClose,
  } = props;
  const PlatformIcon = item.platformVisual.Icon;
  const ownerFallbackLabel =
    item.ownerName === m.assist_tasks_no_owner()
      ? m.assist_tasks_no_owner_short()
      : item.ownerName.slice(0, 1).toUpperCase();
  const [popoverState, setPopoverState] =
    useState<AdoptedKnowledgePopoverState | null>(null);
  const [outboundMessageInput, setOutboundMessageInput] = useState<string>("");
  const [suggestedReplyDraft, setSuggestedReplyDraft] = useState<string>("");
  const [isIgnoreDialogOpen, setIsIgnoreDialogOpen] = useState<boolean>(false);
  const [optimisticMessages, setOptimisticMessages] = useState<
    OptimisticAssistTaskMessage[]
  >([]);
  const queryClient = useQueryClient();
  const lastSyncedSuggestedReplyRef = useRef<string>("");
  const messageSectionRef = useRef<HTMLElement | null>(null);
  const messageListContentRef = useRef<HTMLDivElement | null>(null);
  const messageListBottomAnchorRef = useRef<HTMLDivElement | null>(null);
  const adoptedKnowledgePopoverRef = useRef<HTMLDivElement | null>(null);
  const pendingAutoScrollBehaviorRef = useRef<ScrollBehavior | null>(null);
  const previousDetailEventIdRef = useRef<string>("");
  const pendingInitialScrollEventIdRef = useRef<string>("");
  const previousLatestMessageKeyRef = useRef<string>("");
  const takeOverMutation = useTakeOverAssistTaskEvent();
  const ignoreMutation = useIgnoreAssistTaskEvent();
  const confirmReplyMutation = useConfirmAssistTaskEventReply();
  const sendEventMessageMutation = useSendAssistTaskEventMessage();

  /**
   * 详情主标题严格对齐 `event.title`：
   * - 用户要求右侧标题直接展示事件标题本身；
   * - 这里不再回退到 summary，避免把长摘要误当成标题展示。
   */
  const detailTitle = row.title.trim() || m.assist_tasks_unnamed_task();
  const suggestedReply = (row.suggested_reply || "").trim();
  const displayStatus = resolveAssistTaskDisplayStatus(row.status);
  const detailTime = formatDetailAbsoluteTime(
    row.last_activity_at || row.updated_at || row.created_at,
  );
  const shouldShowSuggestedReplyCard =
    shouldShowAssistTaskSuggestedReplyReviewCard(row);
  const hasCompanyScope = Boolean(companyId.trim());
  const canTakeOver =
    hasCompanyScope &&
    !isWaitingForAuthoritativeStatus &&
    displayStatus === "pending";
  const canIgnore =
    hasCompanyScope &&
    !isWaitingForAuthoritativeStatus &&
    displayStatus === "pending";
  const isFooterActionBusy =
    takeOverMutation.isPending ||
    ignoreMutation.isPending ||
    confirmReplyMutation.isPending ||
    sendEventMessageMutation.isPending;
  const normalizedSuggestedReplyDraft = suggestedReplyDraft.trim();
  const composerState = resolveAssistTaskReplyComposerState({
    platform: row.platform,
    displayStatus,
    hasCompanyScope,
    isWaitingForAuthoritativeStatus,
    shouldShowSuggestedReplyCard,
  });
  const detailMessageScope = resolveAssistTaskDetailMessageScope({
    platform: row.platform,
    displayStatus,
  });
  const { canConfirmSuggestedReply, canSendManualReply } = composerState;
  const isConfirmSuggestedReplyDisabled =
    !canConfirmSuggestedReply ||
    confirmReplyMutation.isPending ||
    !normalizedSuggestedReplyDraft;
  const shouldShowLuciusReplyComposer = composerState.shouldShowComposer;
  const shouldShowTakeOverIgnoreActionBar =
    shouldShowAssistTaskLifecycleActionBar({
      canTakeOver,
      canIgnore,
    });
  const takeOverButtonDisabled = !canTakeOver || isFooterActionBusy;
  const sendMessageButtonDisabled =
    !canSendManualReply || !outboundMessageInput.trim() || isFooterActionBusy;
  const adoptedKnowledgeByMessageId = useMemo<
    Map<string, AssistTaskEventAdoptedKnowledge>
  >(() => {
    return new Map(
      adoptedKnowledgeEntries.map((entry) => [entry.messageId, entry]),
    );
  }, [adoptedKnowledgeEntries]);
  const serverMessageIdSet = useMemo<Set<string>>(() => {
    return new Set(
      messages.map((message) => message.messageId.trim()).filter(Boolean),
    );
  }, [messages]);
  const visibleOptimisticMessages = useMemo<
    OptimisticAssistTaskMessage[]
  >(() => {
    return optimisticMessages.filter((item) => {
      if (!item.serverMessageId) {
        return true;
      }

      return !serverMessageIdSet.has(item.serverMessageId);
    });
  }, [optimisticMessages, serverMessageIdSet]);
  const pendingPersistingServerMessageIds = useMemo<string[]>(() => {
    return visibleOptimisticMessages
      .map((item) => {
        if (item.status !== "persisting") {
          return null;
        }

        return (item.serverMessageId || "").trim() || null;
      })
      .filter((messageId): messageId is string => Boolean(messageId));
  }, [visibleOptimisticMessages]);
  const renderableMessages = useMemo<RenderableAssistTaskMessage[]>(() => {
    return [
      ...messages.map((message) => ({
        key: `server-${message.platform}-${message.messageId}`,
        message,
        pendingStatus: null,
      })),
      ...visibleOptimisticMessages.map((item) => ({
        key: item.localId,
        message: item.message,
        pendingStatus: item.status,
      })),
    ];
  }, [messages, visibleOptimisticMessages]);
  const latestMessageKey = useMemo<string>(() => {
    return resolveLatestAssistTaskMessageKey(
      renderableMessages.map((entry) => entry.message),
    );
  }, [renderableMessages]);
  const eventMentionDisplayName = useMemo<string | null>(() => {
    return resolveAssistTaskEventMentionDisplayName({
      messages: renderableMessages.map((entry) => entry.message),
      eventUserId: row.user_id,
    });
  }, [renderableMessages, row.user_id]);
  const hasRenderableMessages = renderableMessages.length > 0;
  const shouldShowMessageSkeleton = isLoadingMessages && !hasRenderableMessages;

  useEffect(() => {
    setPopoverState(null);
    setOutboundMessageInput("");
    setSuggestedReplyDraft(suggestedReply);
    lastSyncedSuggestedReplyRef.current = suggestedReply;
    setIsIgnoreDialogOpen(false);
    setOptimisticMessages([]);
  }, [row.id]);

  useEffect(() => {
    if (lastSyncedSuggestedReplyRef.current === suggestedReply) {
      return;
    }

    const shouldAdoptLatestSuggestedReply =
      suggestedReplyDraft === lastSyncedSuggestedReplyRef.current;

    lastSyncedSuggestedReplyRef.current = suggestedReply;

    if (shouldAdoptLatestSuggestedReply) {
      setSuggestedReplyDraft(suggestedReply);
    }
  }, [suggestedReply, suggestedReplyDraft]);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    /**
     * 一旦服务端消息列表已经包含真实 `messageId`，就把对应 optimistic 项彻底清掉：
     * - 避免本地 `persisting` 项长期残留，持续触发无意义轮询；
     * - 也让详情页行为与 client chat 页保持一致，统一走“服务端消息出现即完成对账”。
     */
    setOptimisticMessages((previousMessages) =>
      previousMessages.filter((item) => {
        const normalizedServerMessageId = (item.serverMessageId || "").trim();
        if (!normalizedServerMessageId) {
          return true;
        }

        return !serverMessageIdSet.has(normalizedServerMessageId);
      }),
    );
  }, [messages, serverMessageIdSet]);

  useEffect(() => {
    if (!popoverState) {
      return;
    }

    if (!adoptedKnowledgeByMessageId.has(popoverState.messageId)) {
      setPopoverState(null);
    }
  }, [adoptedKnowledgeByMessageId, popoverState]);

  useEffect(() => {
    if (!popoverState) {
      return;
    }

    const sectionElement = messageSectionRef.current;

    const handlePointerDown = (event: PointerEvent): void => {
      const target = event.target;

      if (!(target instanceof Node)) {
        setPopoverState(null);
        return;
      }

      if (adoptedKnowledgePopoverRef.current?.contains(target)) {
        return;
      }

      if (
        target instanceof Element &&
        target.closest("[data-adopted-knowledge-trigger='true']")
      ) {
        return;
      }

      setPopoverState(null);
    };

    const handleEscape = (event: globalThis.KeyboardEvent): void => {
      if (event.key === "Escape") {
        setPopoverState(null);
      }
    };

    const handleViewportChange = (): void => {
      setPopoverState(null);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleViewportChange);
    sectionElement?.addEventListener("scroll", handleViewportChange, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleViewportChange);
      sectionElement?.removeEventListener("scroll", handleViewportChange);
    };
  }, [popoverState]);

  useEffect(() => {
    if (
      !companyId.trim() ||
      !row.id.trim() ||
      pendingPersistingServerMessageIds.length === 0
    ) {
      return;
    }

    const queryKey = assistTaskEventKeys.detailMessages({
      companyId,
      eventId: row.id,
      scope: detailMessageScope,
      platform: row.platform,
      channelId: row.channel_id || null,
      messageIds: row.message_ids || [],
    });

    /**
     * 发送成功后，bot 往往比平台消息表入库更快：
     * - 第一轮详情查询可能已经拿到了新的 `event.message_ids`，但还查不到对应消息行；
     * - 这时 optimistic item 会停在 `persisting`，看起来就像永远在 `Sending...`；
     * - 只在存在待回填消息时做短轮询，直到服务端消息真正出现为止。
     */
    void queryClient.invalidateQueries({ queryKey });

    const intervalId = window.setInterval(() => {
      void queryClient.invalidateQueries({ queryKey });
    }, 2500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
    companyId,
    pendingPersistingServerMessageIds,
    queryClient,
    row.channel_id,
    row.id,
    row.message_ids,
    row.platform,
    detailMessageScope,
  ]);

  /**
   * 详情消息区统一走“底部锚点 + 容器 scrollTop”双保险：
   * - 底部锚点能推动最近的可滚动祖先，兼容不同端上的滚动容器；
   * - 同时直接写入消息容器的 `scrollTop`，避免浏览器滚动链路差异导致没贴到底。
   */
  function scheduleMessageListScrollToBottom(behavior: ScrollBehavior): void {
    pendingAutoScrollBehaviorRef.current = behavior;
  }

  function scrollMessageContainerToBottom(
    behavior: ScrollBehavior = "smooth",
  ): void {
    const container = messageSectionRef.current;
    const bottomAnchor = messageListBottomAnchorRef.current;

    bottomAnchor?.scrollIntoView({
      behavior,
      block: "end",
      inline: "nearest",
    });

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  }

  /**
   * 进入事件详情时默认落到最后一条消息：
   * - 兼容“直达详情 URL”“列表切换详情”“消息查询稍后才返回”三种进入路径；
   * - 同一个事件里如果尾部新增消息，也顺势把视图推进到最新位置。
   */
  useEffect(() => {
    const normalizedEventId = row.id.trim();
    const eventChanged = previousDetailEventIdRef.current !== normalizedEventId;

    if (eventChanged) {
      previousDetailEventIdRef.current = normalizedEventId;
      previousLatestMessageKeyRef.current = latestMessageKey;
      pendingInitialScrollEventIdRef.current = normalizedEventId;

      if (
        !shouldShowMessageSkeleton &&
        !messageError &&
        hasRenderableMessages
      ) {
        pendingInitialScrollEventIdRef.current = "";
        scheduleMessageListScrollToBottom("auto");
      }

      return;
    }

    if (
      pendingInitialScrollEventIdRef.current === normalizedEventId &&
      !shouldShowMessageSkeleton &&
      !messageError &&
      hasRenderableMessages
    ) {
      pendingInitialScrollEventIdRef.current = "";
      scheduleMessageListScrollToBottom("auto");
    }

    if (!normalizedEventId || shouldShowMessageSkeleton || messageError) {
      previousLatestMessageKeyRef.current = latestMessageKey;
      return;
    }

    const previousLatestMessageKey = previousLatestMessageKeyRef.current;
    if (
      previousLatestMessageKey &&
      latestMessageKey &&
      previousLatestMessageKey !== latestMessageKey
    ) {
      scheduleMessageListScrollToBottom("smooth");
    }

    previousLatestMessageKeyRef.current = latestMessageKey;
  }, [
    hasRenderableMessages,
    latestMessageKey,
    messageError,
    row.id,
    shouldShowMessageSkeleton,
  ]);

  /**
   * 首次进入详情时，消息正文高度可能会在一个渲染周期里继续增长：
   * - 比如长文本换行、头像解码、骨架切换成真实内容；
   * - 因此在尺寸稳定前持续补一次 `auto` 贴底，避免“看起来只滚到中间”。
   */
  useEffect(() => {
    const pendingScrollBehavior = pendingAutoScrollBehaviorRef.current;
    const messageListContent = messageListContentRef.current;

    if (
      !pendingScrollBehavior ||
      !messageListContent ||
      renderableMessages.length === 0
    ) {
      return;
    }

    let animationFrameId: number | null = null;
    let settleTimeoutId: number | null = null;
    let hardStopTimeoutId: number | null = null;

    const queueScrollToBottom = (behavior: ScrollBehavior): void => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = window.requestAnimationFrame(() => {
        scrollMessageContainerToBottom(behavior);
        animationFrameId = null;
      });
    };

    const stopAutoScroll = (resizeObserver?: ResizeObserver): void => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      if (settleTimeoutId !== null) {
        window.clearTimeout(settleTimeoutId);
        settleTimeoutId = null;
      }

      if (hardStopTimeoutId !== null) {
        window.clearTimeout(hardStopTimeoutId);
        hardStopTimeoutId = null;
      }

      pendingAutoScrollBehaviorRef.current = null;
      resizeObserver?.disconnect();
    };

    if (typeof window.ResizeObserver !== "function") {
      animationFrameId = window.requestAnimationFrame(() => {
        scrollMessageContainerToBottom(pendingScrollBehavior);
        pendingAutoScrollBehaviorRef.current = null;
        animationFrameId = null;
      });

      return () => {
        if (animationFrameId !== null) {
          window.cancelAnimationFrame(animationFrameId);
        }
      };
    }

    const resizeObserver = new window.ResizeObserver(() => {
      queueScrollToBottom("auto");

      if (settleTimeoutId !== null) {
        window.clearTimeout(settleTimeoutId);
      }

      settleTimeoutId = window.setTimeout(() => {
        stopAutoScroll(resizeObserver);
      }, 180);
    });

    resizeObserver.observe(messageListContent);
    queueScrollToBottom(pendingScrollBehavior);
    hardStopTimeoutId = window.setTimeout(() => {
      stopAutoScroll(resizeObserver);
    }, 1500);

    return () => {
      stopAutoScroll(resizeObserver);
    };
  }, [latestMessageKey, renderableMessages.length, row.id]);

  /**
   * 计算 adopted knowledge 浮层位置：
   * - 浮层统一挂在消息滚动区上层，避免被某一条消息行的宽度/overflow 裁切；
   * - 宽度遵循设计稿 489px，上窄屏时自动收缩，并限制在详情区内。
   */
  function toggleAdoptedKnowledgePopover(
    event: MouseEvent<HTMLButtonElement>,
    messageId: string,
    knowledgeCount: number,
  ): void {
    if (knowledgeCount <= 0) {
      return;
    }

    if (popoverState?.messageId === messageId) {
      setPopoverState(null);
      return;
    }

    const sectionElement = messageSectionRef.current;
    if (!sectionElement) {
      setPopoverState({
        messageId,
        top: 0,
        left: 0,
        width: 489,
      });
      return;
    }

    const sectionRect = sectionElement.getBoundingClientRect();
    const triggerRect = event.currentTarget.getBoundingClientRect();
    const popoverPlacement = resolveAdoptedKnowledgePopoverPlacement({
      sectionClientHeight: sectionElement.clientHeight,
      sectionClientWidth: sectionElement.clientWidth,
      sectionScrollTop: sectionElement.scrollTop,
      triggerOffsetTop: triggerRect.top - sectionRect.top,
      triggerOffsetBottom: triggerRect.bottom - sectionRect.top,
      triggerOffsetRight: triggerRect.right - sectionRect.left,
    });

    setPopoverState({
      messageId,
      top: popoverPlacement.top,
      left: popoverPlacement.left,
      width: popoverPlacement.width,
    });
  }

  const activeAdoptedKnowledgeItems = popoverState
    ? adoptedKnowledgeByMessageId.get(popoverState.messageId)
        ?.adoptedKnowledgeItems || []
    : [];

  async function handleTakeOver(): Promise<void> {
    try {
      await takeOverMutation.mutateAsync({
        companyId,
        eventId: row.id,
      });
      toast.success(m.assist_tasks_takeover_success());
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : m.assist_tasks_takeover_error(),
      );
    }
  }

  async function handleIgnore(): Promise<void> {
    try {
      await ignoreMutation.mutateAsync({
        companyId,
        eventId: row.id,
      });
      setIsIgnoreDialogOpen(false);
      toast.success(m.assist_tasks_ignore_success());
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : m.assist_tasks_ignore_error(),
      );
    }
  }

  async function handleConfirmSuggestedReply(content: string): Promise<void> {
    try {
      await confirmReplyMutation.mutateAsync({
        companyId,
        eventId: row.id,
        content,
      });
      toast.success(m.assist_tasks_confirm_reply_success());
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : m.assist_tasks_confirm_reply_error(),
      );
    }
  }

  async function handleSendEventMessage(): Promise<void> {
    const content = outboundMessageInput.trim();
    if (!content) {
      return;
    }

    const optimisticMessageId = generateOptimisticAssistTaskMessageId();
    const optimisticMessage: AssistTaskEventMessage = {
      platform: row.platform,
      messageId: optimisticMessageId,
      role: "staff",
      authorName: m.client_chat_me(),
      authorAvatarUrl: row.owner_avatar_url || item.ownerAvatarUrl || null,
      content,
      sentAt: new Date().toISOString(),
    };

    scheduleMessageListScrollToBottom("smooth");
    setOptimisticMessages((previousMessages) => [
      ...previousMessages,
      {
        localId: optimisticMessageId,
        message: optimisticMessage,
        status: "sending",
        serverMessageId: null,
      },
    ]);
    setOutboundMessageInput("");

    try {
      const result = await sendEventMessageMutation.mutateAsync({
        companyId,
        eventId: row.id,
        content,
      });

      const normalizedServerMessageId = (result.messageId || "").trim() || null;
      if (!normalizedServerMessageId) {
        setOptimisticMessages((previousMessages) =>
          previousMessages.filter(
            (item) => item.localId !== optimisticMessageId,
          ),
        );
      } else {
        setOptimisticMessages((previousMessages) =>
          previousMessages.map((item) => {
            if (item.localId !== optimisticMessageId) {
              return item;
            }

            return {
              ...item,
              status: "persisting",
              serverMessageId: normalizedServerMessageId,
            };
          }),
        );
      }

      toast.success(m.assist_tasks_message_send_success());
    } catch (error) {
      setOptimisticMessages((previousMessages) =>
        previousMessages.filter((item) => item.localId !== optimisticMessageId),
      );
      setOutboundMessageInput((currentInput) => {
        if (currentInput.trim()) {
          return currentInput;
        }

        return content;
      });
      toast.error(
        error instanceof Error
          ? error.message
          : m.assist_tasks_message_send_error(),
      );
    }
  }

  function handleOutboundMessageKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ): void {
    if (event.key !== "Enter") {
      return;
    }

    if (event.shiftKey || event.nativeEvent.isComposing) {
      return;
    }

    event.preventDefault();

    if (sendMessageButtonDisabled) {
      return;
    }

    void handleSendEventMessage();
  }

  /**
   * 回复卡头部动作：
   * - 待处理事件的“接手 / 忽略”不再拆到卡片外，统一并进新版头部；
   * - 这样 suggested reply 审核态和人工回复态都能共用同一层级结构。
   */
  function renderComposerLifecycleHeaderActions(): ReactNode {
    if (!shouldShowTakeOverIgnoreActionBar) {
      return null;
    }

    return (
      <>
        <button
          type="button"
          className="dashboard-lucius-composer-inline-action dashboard-lucius-composer-inline-action--primary"
          onClick={() => {
            void handleTakeOver();
          }}
          disabled={takeOverButtonDisabled}
        >
          {takeOverMutation.isPending
            ? m.assist_tasks_takeover_pending()
            : m.assist_tasks_takeover()}
        </button>
        <button
          type="button"
          className="dashboard-lucius-composer-inline-action"
          onClick={() => {
            setIsIgnoreDialogOpen(true);
          }}
          disabled={!canIgnore || isFooterActionBusy}
        >
          {ignoreMutation.isPending
            ? m.assist_tasks_ignoring()
            : m.assist_tasks_ignore()}
        </button>
      </>
    );
  }

  /**
   * 底部 Lucius composer：
   * - 建议回复确认与 Website 手动发送继续共用一张卡片，避免重复堆叠两块 Lucius 区；
   * - Confirm and Send 对所有平台可见，但手动输入框只在 Website 且允许回复时出现；
   * - 非 Website 一旦事件进入 taken_over / resolved，只保留消息详情，不再显示输入区。
   */
  function renderLuciusReplyComposer(): ReactNode {
    if (!shouldShowLuciusReplyComposer) {
      return null;
    }

    return (
      <section className="dashboard-task-detail-footer-section bg-[var(--dashboard-panel-bg)] px-4 pt-4 sm:px-6">
        <LuciusReplyComposerCard
          canSendManualReply={canSendManualReply}
          canConfirmSuggestedReply={canConfirmSuggestedReply}
          showSuggestedReply={shouldShowSuggestedReplyCard}
          suggestedReply={suggestedReplyDraft}
          isConfirming={confirmReplyMutation.isPending}
          isConfirmDisabled={isConfirmSuggestedReplyDisabled}
          outboundMessageInput={outboundMessageInput}
          isSendingManualReply={sendEventMessageMutation.isPending}
          isSendManualReplyDisabled={sendMessageButtonDisabled}
          headerActions={renderComposerLifecycleHeaderActions()}
          onSuggestedReplyChange={setSuggestedReplyDraft}
          onConfirm={(content) => {
            void handleConfirmSuggestedReply(content);
          }}
          onOutboundMessageChange={setOutboundMessageInput}
          onOutboundMessageKeyDown={handleOutboundMessageKeyDown}
          onSendManualReply={() => {
            void handleSendEventMessage();
          }}
        />
      </section>
    );
  }

  return (
    <>
      <DashboardPageLayoutCard className="dashboard-task-detail-card flex min-h-0 flex-col">
        <header className="dashboard-task-detail-header">
          <p className="dashboard-task-detail-header-title">
            {m.assist_tasks_session_detail_title()}
          </p>
          <Button
            type="button"
            variant="dashboardGhost"
            size="icon"
            className="dashboard-task-detail-close-button size-7 rounded-[4px]"
            onClick={onClose}
            aria-label={m.assist_tasks_close_session_detail()}
          >
            <X className="size-4" />
          </Button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          {/*
           * 详情首屏信息单独收口成 hero 区：
           * - 让标题、负责人、渠道和时间在手机端按阅读顺序自然下落；
           * - 避免继续沿用桌面横向分布，导致窄屏下出现“标题块和时间互相抢行”的问题。
           */}
          <section className="dashboard-task-detail-hero">
            <p className="dashboard-task-detail-title">{detailTitle}</p>

            <div className="dashboard-task-detail-meta">
              <div className="dashboard-task-detail-meta-primary dashboard-text-muted flex min-w-0 flex-wrap items-center gap-2.5 text-[13px] sm:gap-3">
                <div className="flex min-w-0 items-center gap-[6px]">
                  <Avatar className="size-5 border border-[var(--dashboard-panel-border)]">
                    {item.ownerAvatarUrl ? (
                      <AvatarImage
                        src={item.ownerAvatarUrl}
                        alt={item.ownerName}
                      />
                    ) : null}
                    <AvatarFallback className="dashboard-avatar-fallback text-[10px]">
                      {ownerFallbackLabel}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate font-medium">{item.ownerName}</span>
                </div>

                <Separator
                  orientation="vertical"
                  className="hidden h-[14px] bg-[var(--dashboard-panel-border)] sm:block"
                />

                <div className="flex min-w-0 items-center gap-1 font-medium">
                  <PlatformIcon className="size-4 shrink-0" />
                  <span className="truncate">{item.channelName}</span>
                </div>
              </div>

              <div className="dashboard-task-detail-time text-[14px] font-medium tracking-[-0.14px] sm:shrink-0">
                <span
                  className={
                    item.isOverdue
                      ? "text-[var(--dashboard-badge-warning-soft-text)]"
                      : "dashboard-text-muted"
                  }
                >
                  {detailTime}
                </span>
              </div>
            </div>
          </section>

          <section
            ref={messageSectionRef}
            className="dashboard-detail-message-scroll relative min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-4 sm:px-6"
          >
            {shouldShowMessageSkeleton ? (
              <div className="space-y-4">
                <Skeleton className="dashboard-skeleton--base h-5 w-[30%]" />
                <Skeleton className="dashboard-skeleton--soft h-14 w-full" />
                <Skeleton className="dashboard-skeleton--base h-5 w-[35%]" />
                <Skeleton className="dashboard-skeleton--soft h-14 w-[80%]" />
              </div>
            ) : null}

            {!shouldShowMessageSkeleton && messageError ? (
              <div className="dashboard-detail-alert-danger rounded-[8px] px-3 py-2 text-[12px]">
                {m.assist_tasks_messages_load_error({
                  message: messageError.message,
                })}
              </div>
            ) : null}

            {!shouldShowMessageSkeleton &&
            !messageError &&
            adoptedKnowledgeError ? (
              <div className="dashboard-detail-alert-danger mb-4 rounded-[8px] px-3 py-2 text-[12px]">
                {m.assist_tasks_adopted_knowledge_load_error({
                  message: adoptedKnowledgeError.message,
                })}
              </div>
            ) : null}

            {!shouldShowMessageSkeleton &&
            !messageError &&
            !hasRenderableMessages ? (
              <div className="dashboard-detail-empty-state rounded-[8px] px-4 py-4 text-[13px]">
                {m.assist_tasks_no_messages()}
              </div>
            ) : null}

            {hasRenderableMessages ? (
              <>
                <div ref={messageListContentRef} className="space-y-6">
                  {renderableMessages.map((renderableMessage) => {
                    const { message, pendingStatus } = renderableMessage;
                    const assistantLike = isAssistantLikeRole(message.role);
                    const roleLabel = getRoleLabel(message.role);
                    const avatarFallbackLabel = (message.authorName || "U")
                      .slice(0, 1)
                      .toUpperCase();
                    const adoptedKnowledgeEntry =
                      adoptedKnowledgeByMessageId.get(message.messageId) ||
                      null;
                    const adoptedKnowledgeCount =
                      adoptedKnowledgeEntry?.adoptedKnowledgeItems.length || 0;
                    const isKnowledgeExpanded =
                      popoverState?.messageId === message.messageId &&
                      adoptedKnowledgeCount > 0;

                    return (
                      <article
                        key={renderableMessage.key}
                        className={cn(
                          "space-y-2",
                          pendingStatus && "opacity-70",
                        )}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <Avatar className="size-6 border border-[var(--dashboard-panel-border)]">
                            {message.authorAvatarUrl ? (
                              <AvatarImage
                                src={message.authorAvatarUrl}
                                alt={message.authorName}
                              />
                            ) : null}
                            <AvatarFallback className="dashboard-avatar-fallback--muted text-[11px]">
                              {avatarFallbackLabel}
                            </AvatarFallback>
                          </Avatar>

                          <p className="dashboard-text-title text-[14px] font-medium leading-[1.6] tracking-[-0.14px]">
                            {message.authorName}
                          </p>

                          <Badge
                            variant="outline"
                            className="dashboard-role-badge h-6 rounded-[20px] border-transparent px-2 text-[12px] font-semibold"
                          >
                            {roleLabel}
                          </Badge>

                          <p className="dashboard-text-muted text-[12px] font-medium">
                            {formatDetailAbsoluteTime(message.sentAt)}
                          </p>

                          {pendingStatus ? (
                            <p className="dashboard-text-muted text-[12px] font-medium">
                              {m.assist_tasks_message_send_pending()}
                            </p>
                          ) : null}

                          {assistantLike && adoptedKnowledgeCount > 0 ? (
                            <div className="relative ml-1 shrink-0">
                              <button
                                type="button"
                                data-adopted-knowledge-trigger="true"
                                title={m.assist_tasks_view_adopted_knowledge()}
                                aria-label={m.assist_tasks_view_adopted_knowledge_count(
                                  {
                                    count: String(adoptedKnowledgeCount),
                                  },
                                )}
                                onClick={(clickEvent) => {
                                  toggleAdoptedKnowledgePopover(
                                    clickEvent,
                                    message.messageId,
                                    adoptedKnowledgeCount,
                                  );
                                }}
                                className={cn(
                                  "dashboard-knowledge-trigger flex size-[18px] items-center justify-center rounded-[2px] text-[12px] font-semibold transition-colors",
                                  isKnowledgeExpanded &&
                                    "dashboard-knowledge-trigger--active",
                                )}
                              >
                                {adoptedKnowledgeCount}
                              </button>
                            </div>
                          ) : null}
                        </div>

                        <AssistTaskMessageRichText
                          platform={message.platform}
                          content={message.content}
                          eventUserId={row.user_id}
                          eventUserDisplayName={eventMentionDisplayName}
                          className={cn(
                            "whitespace-pre-wrap break-words pl-8 text-[14px] font-medium leading-[1.6] tracking-[-0.14px] sm:ml-8 sm:pl-0",
                            pendingStatus && "opacity-80",
                            assistantLike
                              ? "dashboard-text-primary"
                              : "dashboard-text-title",
                          )}
                        />
                      </article>
                    );
                  })}
                </div>
                <div
                  ref={messageListBottomAnchorRef}
                  aria-hidden="true"
                  className="h-px w-full"
                />
              </>
            ) : null}

            {popoverState && activeAdoptedKnowledgeItems.length > 0 ? (
              <AdoptedKnowledgePopover
                ref={adoptedKnowledgePopoverRef}
                knowledgeItems={activeAdoptedKnowledgeItems}
                className="absolute z-20"
                style={{
                  top: `${popoverState.top}px`,
                  left: `${popoverState.left}px`,
                  width: `${popoverState.width}px`,
                }}
              />
            ) : null}
          </section>

          {/*
           * 底部交互区统一聚合到一个 footer stack：
           * - 手机端不再呈现多段割裂的白底 section；
           * - 建议回复和人工发送都挂在同一组 Lucius composer 视觉体系里，层次更稳定。
           */}
          {shouldShowLuciusReplyComposer ? (
            <div className="dashboard-task-detail-footer-stack">
              {renderLuciusReplyComposer()}
            </div>
          ) : null}
        </div>
      </DashboardPageLayoutCard>

      <AlertDialog
        open={isIgnoreDialogOpen}
        onOpenChange={(open) => {
          if (ignoreMutation.isPending) {
            return;
          }

          setIsIgnoreDialogOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {m.assist_tasks_ignore_confirm_title()}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {m.assist_tasks_ignore_confirm_desc()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={ignoreMutation.isPending}>
              {m.common_cancel()}
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={ignoreMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                void handleIgnore();
              }}
            >
              {ignoreMutation.isPending
                ? m.assist_tasks_ignoring()
                : m.assist_tasks_ignore_confirm_action()}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function AssistTaskPage(props: AssistTaskPageProps = {}) {
  const {
    selectedEventId: routeSelectedEventId,
    onSelectEvent,
    onCloseEvent,
  } = props;
  const viewportProfile = useViewportProfile();
  const selectedCompanyId = useSelectedCompanyId();
  const {
    data: userCompanies = [],
    isLoading: isLoadingCompanies,
    isFetching: isFetchingCompanies,
  } =
    useCurrentUserCompanies();
  const statusFilterOptions = getStatusFilterOptions();

  const [statusFilter, setStatusFilter] = useState<EventStatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<EventTypeFilter>("all");
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [localSelectedEventId, setLocalSelectedEventId] = useState<
    string | null
  >(null);
  const isRouteDrivenSelection =
    routeSelectedEventId !== undefined ||
    typeof onSelectEvent === "function" ||
    typeof onCloseEvent === "function";
  const selectedEventId = isRouteDrivenSelection
    ? routeSelectedEventId || null
    : localSelectedEventId;

  /**
   * 统一处理“选中事件”动作：
   * - 旧 `/dashboard` 继续使用本地 state 控制右侧详情面板；
   * - 新 `/dashboard/event` 系列路由通过外部回调驱动 URL 变化。
   */
  const handleSelectEvent = (eventId: string): void => {
    if (onSelectEvent) {
      onSelectEvent(eventId);
      return;
    }

    setLocalSelectedEventId(eventId);
  };

  /**
   * 统一处理“关闭详情”动作：
   * - URL 驱动模式下交给路由回调回退到列表页；
   * - 本地模式下仅收起右侧详情面板。
   */
  const handleCloseDetail = (): void => {
    if (onCloseEvent) {
      onCloseEvent();
      return;
    }

    setLocalSelectedEventId(null);
  };

  /**
   * 当前生效公司：
   * - 仅接受“当前用户实际具备成员关系”的 company_id；
   * - 如果 localStorage 中的旧值无效，则自动回退第一家公司。
   */
  const activeCompany = useMemo(() => {
    if (userCompanies.length === 0) {
      return null;
    }

    if (selectedCompanyId) {
      const matchedCompany = userCompanies.find(
        (company) => company.companyId === selectedCompanyId,
      );
      if (matchedCompany) {
        return matchedCompany;
      }
    }

    return userCompanies[0];
  }, [selectedCompanyId, userCompanies]);

  const activeCompanyId = activeCompany?.companyId || null;
  const activeCompanyRole = activeCompany?.memberRole || null;
  const onboardingProgressQuery = useCurrentCompanyOnboardingProgress(
    {
      companyId: activeCompanyId || "",
    },
    {
      enabled: Boolean(activeCompanyId),
    },
  );
  const isCheckingOnboarding =
    Boolean(activeCompanyId) && onboardingProgressQuery.isLoading;
  const onboardingRedirectTarget = useMemo<string | null>(() => {
    if (!activeCompanyId || isCheckingOnboarding) {
      return null;
    }

    if (onboardingProgressQuery.error) {
      return activeCompanyRole === "owner"
        ? "/onboarding/company-profile"
        : "/onboarding/profile";
    }

    return resolveCompanyOnboardingRedirectTarget({
      memberRole: activeCompanyRole,
      progress: onboardingProgressQuery.data || null,
    });
  }, [
    activeCompanyId,
    activeCompanyRole,
    isCheckingOnboarding,
    onboardingProgressQuery.data,
    onboardingProgressQuery.error,
  ]);

  /**
   * 修正非法 company_id：
   * - 保证 Header 与页面数据读取使用同一家公司；
   * - 避免“左侧公司已切换，右侧仍查旧公司”的错位。
   */
  useEffect(() => {
    /**
     * 只在公司列表稳定后才修正无效 company_id：
     * - 切组织和邀请入组后，列表刷新会有一个短暂过渡期；
     * - 在过渡期里如果直接回退第一家公司，会把用户刚选中的新组织覆盖掉。
     */
    if (isLoadingCompanies || isFetchingCompanies || userCompanies.length === 0) {
      return;
    }

    const isSelectedCompanyValid = selectedCompanyId
      ? userCompanies.some((company) => company.companyId === selectedCompanyId)
      : false;

    if (!isSelectedCompanyValid) {
      setSelectedCompanyId(userCompanies[0].companyId);
    }
  }, [isFetchingCompanies, isLoadingCompanies, selectedCompanyId, userCompanies]);

  /**
   * Onboarding 守卫：
   * - owner 用户必须先完成公司/个人资料；
   * - invited admin/member 默认走个人资料步骤。
   */
  useEffect(() => {
    if (!activeCompanyId) {
      if (!isLoadingCompanies) {
        window.location.replace("/onboarding/company-profile");
      }
      return;
    }

    if (isCheckingOnboarding) {
      return;
    }

    if (onboardingRedirectTarget) {
      window.location.replace(onboardingRedirectTarget);
    }
  }, [
    activeCompanyId,
    isCheckingOnboarding,
    isLoadingCompanies,
    onboardingRedirectTarget,
  ]);

  /**
   * 搜索关键词防抖：
   * - 降低 Supabase 查询压力；
   * - 保证输入时交互稳定。
   */
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setDebouncedKeyword(keywordInput.trim());
    }, 300);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [keywordInput]);

  /**
   * 任意筛选条件变化时回到第一页：
   * - 避免“筛选后页码越界导致空表”的体验问题。
   */
  useEffect(() => {
    setPageIndex(0);
  }, [statusFilter, typeFilter, debouncedKeyword, activeCompanyId]);

  const eventQuery = useAssistTaskEvents(
    {
      companyId: activeCompanyId || "",
      pageIndex,
      pageSize: PAGE_SIZE,
      statusFilter,
      typeFilter,
      keyword: debouncedKeyword,
    },
    {
      enabled:
        Boolean(activeCompanyId) &&
        !isCheckingOnboarding &&
        !onboardingRedirectTarget,
    },
  );

  const typeLabelByCode = useMemo<Map<string, string>>(() => {
    const typeOptions: EventTypeOption[] = eventQuery.data?.typeOptions || [];
    return new Map(
      typeOptions.map((option) => [
        normalizeEventTypeCode(option.value),
        option.label,
      ]),
    );
  }, [eventQuery.data?.typeOptions]);

  const eventItems = useMemo<AssistTaskItem[]>(() => {
    return (eventQuery.data?.rows || []).map((row) =>
      mapEventRowToItem(row, typeLabelByCode),
    );
  }, [eventQuery.data?.rows, typeLabelByCode]);
  const tasksDemoNarrative = useMemo(
    () =>
      DEFAULT_CLIENT_CHAT_RECORDING_SCENARIO.evidenceScenes.find(
        (scene) => scene.route === "/dashboard/event",
      ) || null,
    [],
  );

  const eventItemMap = useMemo<Map<string, AssistTaskItem>>(() => {
    return new Map<string, AssistTaskItem>(
      eventItems.map((item) => [item.id, item]),
    );
  }, [eventItems]);

  const eventRowMap = useMemo<Map<string, LuciusAgentEventRow>>(() => {
    return new Map<string, LuciusAgentEventRow>(
      (eventQuery.data?.rows || []).map((row) => [row.id, row]),
    );
  }, [eventQuery.data?.rows]);

  const selectedEventRowFromList = selectedEventId
    ? eventRowMap.get(selectedEventId) || null
    : null;
  const shouldLoadSelectedEventDetail =
    shouldFetchSelectedAssistTaskEventDetail({
      activeCompanyId,
      selectedEventId,
      isCheckingOnboarding,
      onboardingRedirectTarget,
    });

  const selectedEventDetailQuery = useAssistTaskEventDetail(
    {
      companyId: activeCompanyId || "",
      eventId: selectedEventId || "",
    },
    {
      enabled: shouldLoadSelectedEventDetail,
      refetchInterval: 10_000,
      refetchOnMount: "always",
    },
  );

  /**
   * 详情数据来源优先级：
   * - 单条详情查询优先，确保右侧动作区依赖的是最新服务端状态；
   * - 列表行仅作为详情尚未返回前的兜底，避免右侧详情面板闪空。
   */
  const selectedEventRow = resolveSelectedAssistTaskEventRow({
    listRow: selectedEventRowFromList,
    detailRow: selectedEventDetailQuery.data || null,
  });
  const isWaitingForAuthoritativeSelectedEventStatus =
    shouldDeferAssistTaskEventActionsUntilDetailLoaded({
      shouldLoadSelectedEventDetail,
      detailRow: selectedEventDetailQuery.data || null,
      hasDetailError: Boolean(selectedEventDetailQuery.error),
    });
  const selectedEventItem = useMemo<AssistTaskItem | null>(() => {
    if (!selectedEventRow) {
      return null;
    }

    return mapEventRowToItem(selectedEventRow, typeLabelByCode);
  }, [selectedEventRow, typeLabelByCode]);
  const selectedEventMessageScope = useMemo(() => {
    if (!selectedEventRow) {
      return "event" as const;
    }

    return resolveAssistTaskDetailMessageScope({
      platform: selectedEventRow.platform,
      displayStatus: resolveAssistTaskDisplayStatus(selectedEventRow.status),
    });
  }, [selectedEventRow]);
  const shouldEnableEventMessagesQuery =
    Boolean(activeCompanyId && selectedEventRow) &&
    ((selectedEventMessageScope === "website_session" &&
      Boolean((selectedEventRow?.channel_id || "").trim())) ||
      (selectedEventRow?.message_ids || []).length > 0);

  /**
   * 选中态修正：
   * - 当筛选/分页变化导致当前事件不在列表中时，自动关闭详情面板；
   * - 避免右侧详情展示过期数据。
   */
  useEffect(() => {
    if (isRouteDrivenSelection) {
      return;
    }

    if (!selectedEventId) {
      return;
    }

    if (
      !eventItemMap.has(selectedEventId) ||
      !eventRowMap.has(selectedEventId)
    ) {
      setLocalSelectedEventId(null);
    }
  }, [eventItemMap, eventRowMap, isRouteDrivenSelection, selectedEventId]);

  const eventMessagesQuery = useAssistTaskEventMessages(
    {
      companyId: activeCompanyId || "",
      eventId: selectedEventRow?.id || "",
      scope: selectedEventMessageScope,
      platform: selectedEventRow?.platform || "",
      channelId: selectedEventRow?.channel_id || null,
      messageIds: selectedEventRow?.message_ids || [],
    },
    {
      enabled: shouldEnableEventMessagesQuery,
      placeholderData: (previousMessages) => previousMessages,
    },
  );

  const adoptedKnowledgeQuery = useAssistTaskEventAdoptedKnowledge(
    {
      companyId: activeCompanyId || "",
      eventId: selectedEventRow?.id || "",
      platform: selectedEventRow?.platform || "",
      channelId: selectedEventRow?.channel_id || null,
      messageIds: selectedEventRow?.message_ids || [],
    },
    {
      enabled: Boolean(
        activeCompanyId &&
        selectedEventRow &&
        (selectedEventRow.message_ids || []).length > 0,
      ),
      placeholderData: (previousEntries) => previousEntries,
    },
  );

  const overdueItems = useMemo<AssistTaskItem[]>(() => {
    return eventItems.filter((item) => item.isOverdue);
  }, [eventItems]);

  const normalItems = useMemo<AssistTaskItem[]>(() => {
    return eventItems.filter((item) => !item.isOverdue);
  }, [eventItems]);

  const typeFilterOptions = useMemo<
    Array<{ value: string; label: string }>
  >(() => {
    const options = (eventQuery.data?.typeOptions || []).map((typeOption) => ({
      value: typeOption.value,
      label: typeOption.label,
    }));

    return [
      { value: "all", label: m.assist_tasks_filter_all_types() },
      ...options,
    ];
  }, [eventQuery.data?.typeOptions]);

  const totalRows = eventQuery.data?.totalCount || 0;
  const startRow = totalRows === 0 ? 0 : pageIndex * PAGE_SIZE + 1;
  const endRow =
    totalRows === 0 ? 0 : Math.min((pageIndex + 1) * PAGE_SIZE, totalRows);

  const canPrevPage = pageIndex > 0;
  const canNextPage = endRow < totalRows;

  const shouldSplitOverdueSection = statusFilter === "pending";

  const primarySectionTitle = useMemo<string>(() => {
    if (shouldSplitOverdueSection) {
      return m.assist_tasks_filter_status_pending();
    }

    const matchedStatus = statusFilterOptions.find(
      (option) => option.value === statusFilter,
    );
    return matchedStatus?.label || m.assist_tasks_list_title();
  }, [shouldSplitOverdueSection, statusFilter, statusFilterOptions]);

  const primarySectionItems = shouldSplitOverdueSection
    ? normalItems
    : eventItems;

  const primarySectionCount = useMemo<number>(() => {
    if (!eventQuery.data) {
      return 0;
    }

    if (!shouldSplitOverdueSection) {
      return eventQuery.data.totalCount;
    }

    return eventQuery.data.pendingCount;
  }, [eventQuery.data, shouldSplitOverdueSection]);

  const hasDetailPanel = Boolean(selectedEventId);
  const isLoadingSelectedEventDetail = Boolean(
    shouldLoadSelectedEventDetail &&
    (selectedEventDetailQuery.isLoading || selectedEventDetailQuery.isFetching),
  );
  const shouldRenderPageDetail = viewportProfile.isPhone && hasDetailPanel;
  const shouldRenderTabletOverlayDetail =
    viewportProfile.isTablet && hasDetailPanel;
  const shouldRenderListPanel = !shouldRenderPageDetail;
  const detailPanelContent: ReactNode = hasDetailPanel ? (
    selectedEventItem && selectedEventRow ? (
      <AssistTaskDetailPanel
        companyId={activeCompanyId || ""}
        item={selectedEventItem}
        row={selectedEventRow}
        isWaitingForAuthoritativeStatus={
          isWaitingForAuthoritativeSelectedEventStatus
        }
        messages={eventMessagesQuery.data || []}
        adoptedKnowledgeEntries={adoptedKnowledgeQuery.data || []}
        isLoadingMessages={eventMessagesQuery.isLoading}
        messageError={eventMessagesQuery.error || null}
        adoptedKnowledgeError={adoptedKnowledgeQuery.error || null}
        onClose={handleCloseDetail}
      />
    ) : isLoadingSelectedEventDetail ? (
      <AssistTaskDetailStatePanel
        title=""
        description=""
        isLoading
        onClose={handleCloseDetail}
      />
    ) : selectedEventDetailQuery.error ? (
      <AssistTaskDetailStatePanel
        title={m.assist_tasks_detail_load_failed_title()}
        description={selectedEventDetailQuery.error.message}
        onClose={handleCloseDetail}
      />
    ) : (
      <AssistTaskDetailStatePanel
        title={m.assist_tasks_detail_not_found_title()}
        description={m.assist_tasks_detail_not_found_desc()}
        onClose={handleCloseDetail}
      />
    )
  ) : null;

  if (
    isLoadingCompanies ||
    !activeCompanyId ||
    isCheckingOnboarding ||
    Boolean(onboardingRedirectTarget)
  ) {
    return (
      <AssistTaskWorkspaceSkeleton
        hasDetailPanel={hasDetailPanel}
        panelMode={viewportProfile.panelMode}
      />
    );
  }

  return (
    <DashboardPageLayout detailPresentation={viewportProfile.panelMode}>
      <div
        className={cn(
          "dashboard-assist-task-shell",
          viewportProfile.isDesktop && "dashboard-assist-task-shell--desktop",
        )}
        data-detail-mode={viewportProfile.panelMode}
        data-has-detail={hasDetailPanel ? "true" : "false"}
        style={
          viewportProfile.isDesktop
            ? {
                gridTemplateColumns: hasDetailPanel
                  ? "minmax(0,4fr) minmax(0,6fr)"
                  : "minmax(0,1fr) minmax(0,0fr)",
                gap: hasDetailPanel ? "8px" : "0px",
              }
            : undefined
        }
      >
        {shouldRenderListPanel ? (
          <DashboardPageLayoutCard className="dashboard-task-panel flex min-h-0 flex-col">
            {/*
             * 任务页左栏在 split-view 下经常被右侧详情压窄：
             * - 这里明确要求 header 保持单行；
             * - 具体的收缩策略交给 `dashboard-task-page-header` 的容器样式处理。
             */}
            <DashboardPageHeader
              title={m.sidebar_item_assist_tasks()}
              startRow={startRow}
              endRow={endRow}
              totalRows={totalRows}
              onPrevPage={() => {
                setPageIndex((previousPageIndex) =>
                  Math.max(previousPageIndex - 1, 0),
                );
              }}
              onNextPage={() => {
                setPageIndex((previousPageIndex) => previousPageIndex + 1);
              }}
              canPrevPage={canPrevPage}
              canNextPage={canNextPage}
              paginationCollapseBelow="never"
              className="dashboard-task-page-header"
            />

            {isDemoMode() && tasksDemoNarrative ? (
              <div className="mx-4 mb-2 rounded-[20px] border border-[rgb(27_64_56_/0.12)] bg-[linear-gradient(135deg,rgba(27,64,56,0.08),rgba(225,218,192,0.72))] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lucius-moss)]">
                  Lucius review flow
                </p>
                <p className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-[var(--dashboard-title-text)]">
                  {tasksDemoNarrative.title}
                </p>
                <p className="mt-1 max-w-[38rem] text-[13px] leading-[1.65] text-[var(--dashboard-text-muted)]">
                  {tasksDemoNarrative.focus}
                </p>
              </div>
            ) : null}

            <div className="dashboard-task-toolbar">
              <div className="dashboard-task-toolbar-filters">
                <FilterSelect
                  className="dashboard-task-toolbar-filter-item"
                  value={statusFilter}
                  options={statusFilterOptions}
                  onChange={(nextValue) => {
                    setStatusFilter(nextValue as EventStatusFilter);
                  }}
                  ariaLabel={m.assist_tasks_filter_status_label()}
                />

                <FilterSelect
                  className="dashboard-task-toolbar-filter-item"
                  value={typeFilter}
                  options={typeFilterOptions}
                  onChange={(nextValue) => {
                    setTypeFilter(nextValue as EventTypeFilter);
                  }}
                  ariaLabel={m.assist_tasks_filter_type_label()}
                />
              </div>

              <div className="dashboard-task-search-shell relative">
                <Search className="dashboard-task-search-icon pointer-events-none absolute left-[9px] top-1/2 size-4 -translate-y-1/2" />
                <Input
                  value={keywordInput}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setKeywordInput(event.target.value);
                  }}
                  placeholder={m.assist_tasks_search_placeholder()}
                  className="dashboard-task-control h-11 rounded-[12px] border-transparent pl-8 text-[14px] text-[var(--dashboard-text)] focus-visible:border-transparent focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="dashboard-task-list-scroll min-h-0 flex-1 overflow-y-auto">
              {eventQuery.isLoading ? (
                <ListSkeleton showSplitSections={shouldSplitOverdueSection} />
              ) : null}

              {eventQuery.error ? (
                <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 px-4 text-center">
                  <p className="text-[14px] font-medium text-[#DC2626]">
                    {m.assist_tasks_event_load_failed()}
                  </p>
                  <p className="text-[12px] text-[#6B7280]">
                    {eventQuery.error.message}
                  </p>
                </div>
              ) : null}

              {!eventQuery.isLoading &&
              !eventQuery.error &&
              eventItems.length === 0 ? (
                <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 px-4">
                  <div className="flex size-14 items-center justify-center rounded-[18px] bg-[var(--dashboard-task-section-bg)] text-[var(--lucius-moss)]">
                    <BarChart3 className="size-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-[14px] font-semibold text-[var(--dashboard-title-text)]">
                      {m.assist_tasks_empty_title()}
                    </p>
                    <p className="mt-1 max-w-[22rem] text-[12px] text-[var(--dashboard-text-muted)]">
                      {m.assist_tasks_empty_desc()}
                    </p>
                  </div>
                </div>
              ) : null}

              {!eventQuery.isLoading &&
              !eventQuery.error &&
              eventItems.length > 0 ? (
                <>
                  {shouldSplitOverdueSection ? (
                    <div className="dashboard-task-section-heading">
                      {m.assist_tasks_timed_out_count({
                        count: String(eventQuery.data?.timedOutCount || 0),
                      })}
                    </div>
                  ) : null}

                  {shouldSplitOverdueSection && overdueItems.length > 0
                    ? overdueItems.map((item) => (
                        <AssistTaskRow
                          key={`overdue-${item.id}`}
                          item={item}
                          isSelected={item.id === selectedEventId}
                          onSelect={handleSelectEvent}
                        />
                      ))
                    : null}

                  <div className="dashboard-task-section-heading">
                    {primarySectionTitle} ({primarySectionCount})
                  </div>

                  {primarySectionItems.map((item) => (
                    <AssistTaskRow
                      key={item.id}
                      item={item}
                      isSelected={item.id === selectedEventId}
                      onSelect={handleSelectEvent}
                    />
                  ))}
                </>
              ) : null}
            </div>
          </DashboardPageLayoutCard>
        ) : null}

        {viewportProfile.isDesktop ? (
          <aside
            className={`h-full min-w-0 overflow-hidden transition-[opacity,transform] duration-300 ease-out ${
              hasDetailPanel
                ? "translate-x-0 opacity-100"
                : "pointer-events-none translate-x-4 opacity-0"
            }`}
          >
            {hasDetailPanel ? detailPanelContent : null}
          </aside>
        ) : null}

        {shouldRenderTabletOverlayDetail ? (
          <div className="dashboard-assist-task-sheet-layer">
            <button
              type="button"
              className="dashboard-assist-task-sheet-backdrop"
              onClick={handleCloseDetail}
              aria-label={m.assist_tasks_close_event_detail()}
            />
            <aside className="dashboard-assist-task-sheet-panel">
              {detailPanelContent}
            </aside>
          </div>
        ) : null}

        {shouldRenderPageDetail ? (
          <section className="h-full min-h-0">{detailPanelContent}</section>
        ) : null}
      </div>
    </DashboardPageLayout>
  );
}
