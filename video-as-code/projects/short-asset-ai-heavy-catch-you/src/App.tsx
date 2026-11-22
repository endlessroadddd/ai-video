import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { DiscordAvatar } from "./components/DiscordAvatar";

type ChannelSpec = {
  name: string;
  active?: boolean;
  voice?: boolean;
};

type Message = {
  id: number;
  author: string;
  avatar: string;
  timestamp: string;
  text: string;
  tone: "user" | "bot";
  appBadge?: boolean;
  ambient?: boolean;
};

type ScenePhase =
  | "idle"
  | "typing-user-message"
  | "sending"
  | "bot-typing"
  | "bot-streaming"
  | "scene-one-done"
  | "scene-two-running"
  | "scene-two-done"
  | "scene-three-running"
  | "scene-three-hold"
  | "scene-three-done"
  | "scene-four-payment-enter"
  | "scene-four-payment-ready"
  | "scene-four-payment-click"
  | "scene-four-payment-loading"
  | "scene-four-payment-error"
  | "scene-four-payment-hold"
  | "scene-five-transition"
  | "scene-five-stage"
  | "scene-five-cards"
  | "scene-five-logo"
  | "scene-five-pulse"
  | "scene-five-clear"
  | "scene-five-done";

type ProfileActionKind = "mic" | "audio" | "settings";
type NoiseCardTone = "ivory" | "lavender";
type SendCursorPath = {
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
};
type NoiseCardSpec = {
  id: string;
  text: string;
  tone: NoiseCardTone;
  top: number;
  left: number;
  clearX: number;
  clearY: number;
  width: number;
};
type NoiseCardMotionSpec = {
  rotate: number;
  enterX: number;
  enterY: number;
  driftX: number;
  driftY: number;
  driftDuration: number;
  driftDelay: number;
  radius: string;
  layer: number;
};

const USER_COMPLAINT = "Payment failed for 3 days. I still can't pay.";
const BOT_REPLY =
  "I've received your issue and I understand that this payment situation may feel frustrating. Please wait a moment while I continue checking the current status on my side. If the payment still does not go through, please try the same step again in a moment and keep this chat open. Thank you for your patience while this is being reviewed.";
const SEND_CLICK_DURATION_MS = 920;
const PAYMENT_ENTER_DURATION_MS = 240;
const PAYMENT_READY_DURATION_MS = 420;
const PAYMENT_CLICK_DURATION_MS = 1180;
const PAYMENT_LOADING_DURATION_MS = 1080;
const PAYMENT_ERROR_DURATION_MS = 420;
const PAYMENT_HOLD_DURATION_MS = 1800;
const PRE_PAYMENT_STAGE_PAUSE_MS = 3000;
const SCENE_FIVE_CARD_STAGGER_MS = 130;
const SCENE_FIVE_LOGO_DELAY_MS = 5660;
const SCENE_FIVE_PULSE_DELAY_MS = 6020;
const SCENE_FIVE_CLEAR_DELAY_MS = 6360;
const SCENE_FIVE_DONE_DELAY_MS = 7060;
const PAYMENT_ERROR_MESSAGE =
  "Payment couldn't be completed. Please try again.";

const sceneTwoMessages: Omit<Message, "id">[] = [
  {
    author: "russell",
    avatar: "RS",
    timestamp: "Today at 8:35 PM",
    text: "I tried that already. It didn't help.",
    tone: "user",
  },
  {
    author: "Support Bot",
    avatar: "SB",
    timestamp: "Today at 8:36 PM",
    text: "Thank you for the update. Please wait a little longer while I continue reviewing this for you.",
    tone: "bot",
    appBadge: true,
  },
  {
    author: "russell",
    avatar: "RS",
    timestamp: "Today at 8:37 PM",
    text: "Can you give me the exact steps? I'm in a hurry.",
    tone: "user",
  },
  {
    author: "Support Bot",
    avatar: "SB",
    timestamp: "Today at 8:38 PM",
    text: "I understand your concern. Please stay patient and keep this chat open while this is being checked.",
    tone: "bot",
    appBadge: true,
  },
] as const;

const sceneThreeMessages: Omit<Message, "id">[] = [
  {
    author: "russell",
    avatar: "RS",
    timestamp: "Today at 8:39 PM",
    text: "This is ridiculous. Stop repeating yourself and tell me how to fix it now.",
    tone: "user",
  },
  {
    author: "Support Bot",
    avatar: "SB",
    timestamp: "Today at 8:40 PM",
    text: "I understand this feels urgent. Please stay in this chat while this continues to be reviewed.",
    tone: "bot",
    appBadge: true,
  },
] as const;

const sceneFourCards: ReadonlyArray<NoiseCardSpec> = [
  {
    id: "card-received",
    text: "I've received your issue.",
    tone: "ivory",
    top: 11,
    left: 10,
    clearX: -154,
    clearY: -102,
    width: 176,
  },
  {
    id: "card-concern",
    text: "I understand your concern.",
    tone: "lavender",
    top: 17,
    left: 22,
    clearX: -112,
    clearY: -88,
    width: 194,
  },
  {
    id: "card-patient",
    text: "Please stay patient.",
    tone: "ivory",
    top: 25,
    left: 12,
    clearX: -136,
    clearY: -42,
    width: 174,
  },
  {
    id: "card-wait",
    text: "Please wait a moment.",
    tone: "lavender",
    top: 10,
    left: 67,
    clearX: 150,
    clearY: -104,
    width: 186,
  },
  {
    id: "card-open",
    text: "Please keep this chat open.",
    tone: "ivory",
    top: 24,
    left: 72,
    clearX: 148,
    clearY: -40,
    width: 206,
  },
  {
    id: "card-here",
    text: "I'll be here for you.",
    tone: "ivory",
    top: 17,
    left: 58,
    clearX: 104,
    clearY: -94,
    width: 176,
  },
  {
    id: "card-thanks",
    text: "Thank you for your patience.",
    tone: "lavender",
    top: 70,
    left: 13,
    clearX: -146,
    clearY: 118,
    width: 214,
  },
  {
    id: "card-reviewed",
    text: "This is being reviewed.",
    tone: "lavender",
    top: 69,
    left: 68,
    clearX: 144,
    clearY: 116,
    width: 196,
  },
  {
    id: "card-update",
    text: "Thank you for the update.",
    tone: "ivory",
    top: 33,
    left: 7,
    clearX: -162,
    clearY: 12,
    width: 188,
  },
  {
    id: "card-later",
    text: "Please try again later.",
    tone: "lavender",
    top: 42,
    left: 12,
    clearX: -158,
    clearY: 24,
    width: 188,
  },
  {
    id: "card-reviewing",
    text: "Please wait while I review.",
    tone: "ivory",
    top: 54,
    left: 15,
    clearX: -150,
    clearY: 64,
    width: 196,
  },
  {
    id: "card-hold",
    text: "Please hold on a little longer.",
    tone: "lavender",
    top: 61,
    left: 24,
    clearX: -122,
    clearY: 92,
    width: 218,
  },
  {
    id: "card-logged",
    text: "I've noted your request.",
    tone: "ivory",
    top: 6,
    left: 44,
    clearX: 0,
    clearY: -134,
    width: 180,
  },
  {
    id: "card-checking",
    text: "I'm checking this for you.",
    tone: "lavender",
    top: 15,
    left: 76,
    clearX: 154,
    clearY: -74,
    width: 188,
  },
  {
    id: "card-urgent",
    text: "I understand this feels urgent.",
    tone: "ivory",
    top: 33,
    left: 76,
    clearX: 162,
    clearY: 10,
    width: 220,
  },
  {
    id: "card-allow-time",
    text: "Please allow more time.",
    tone: "lavender",
    top: 45,
    left: 74,
    clearX: 154,
    clearY: 28,
    width: 190,
  },
  {
    id: "card-reviewing-still",
    text: "This is still being checked.",
    tone: "ivory",
    top: 58,
    left: 75,
    clearX: 156,
    clearY: 72,
    width: 198,
  },
  {
    id: "card-keep-open",
    text: "Please keep this conversation open.",
    tone: "lavender",
    top: 78,
    left: 38,
    clearX: -42,
    clearY: 132,
    width: 228,
  },
  {
    id: "card-following-up",
    text: "I'll continue following up.",
    tone: "ivory",
    top: 77,
    left: 56,
    clearX: 44,
    clearY: 132,
    width: 196,
  },
  {
    id: "card-appreciate",
    text: "Thank you for your understanding.",
    tone: "lavender",
    top: 6,
    left: 57,
    clearX: 56,
    clearY: -132,
    width: 228,
  },
] as const;

const channelSections: ReadonlyArray<{
  title: string;
  channels: ReadonlyArray<ChannelSpec>;
}> = [
  {
    title: "TEXT CHANNELS",
    channels: [
      { name: "payment-help", active: true },
      { name: "account-help" },
      { name: "bug-reports" },
      { name: "faq" },
    ],
  },
  {
    title: "VOICE CHANNELS",
    channels: [{ name: "office-hours", voice: true }],
  },
  {
    title: "SUPPORT",
    channels: [
      { name: "support-ticket" },
      { name: "close-ticket" },
    ],
  },
] as const;

const memberGroups = [
  {
    title: "MODERATORS - 2",
    names: ["Mina", "Corey"],
    tone: "member-row--rose",
  },
  {
    title: "SUPPORT - 3",
    names: ["June", "Parker", "Theo"],
    tone: "member-row--violet",
  },
  {
    title: "MEMBERS - 4",
    names: ["Avery", "Mason", "Nina", "Sora"],
    tone: "member-row--cyan",
  },
] as const;

const ambientMessages: Message[] = [
  {
    id: 1,
    author: "Mason",
    avatar: "MS",
    timestamp: "Today at 8:24 PM",
    text: "Is there a faster way to retry a failed checkout?",
    tone: "user",
    ambient: true,
  },
  {
    id: 2,
    author: "Support Bot",
    avatar: "SB",
    timestamp: "Today at 8:25 PM",
    text: "Please open billing settings and confirm whether the pending charge clears first.",
    tone: "bot",
    appBadge: true,
    ambient: true,
  },
] as const;

const noiseCardMotionPresets: readonly NoiseCardMotionSpec[] = [
  {
    rotate: -5.6,
    enterX: -46,
    enterY: -24,
    driftX: -8,
    driftY: 7,
    driftDuration: 5480,
    driftDelay: 0,
    radius: "30px 18px 24px 16px",
    layer: 2,
  },
  {
    rotate: 4.8,
    enterX: 34,
    enterY: -28,
    driftX: 7,
    driftY: -6,
    driftDuration: 5920,
    driftDelay: 120,
    radius: "18px 30px 18px 26px",
    layer: 5,
  },
  {
    rotate: -2.9,
    enterX: -28,
    enterY: 24,
    driftX: -6,
    driftY: -8,
    driftDuration: 5660,
    driftDelay: 260,
    radius: "24px 16px 28px 20px",
    layer: 1,
  },
  {
    rotate: 6.4,
    enterX: 44,
    enterY: 18,
    driftX: 10,
    driftY: 6,
    driftDuration: 6280,
    driftDelay: 90,
    radius: "20px 32px 18px 24px",
    layer: 6,
  },
  {
    rotate: -4.1,
    enterX: -36,
    enterY: 30,
    driftX: -7,
    driftY: 5,
    driftDuration: 5840,
    driftDelay: 180,
    radius: "28px 20px 22px 18px",
    layer: 3,
  },
  {
    rotate: 2.7,
    enterX: 24,
    enterY: -18,
    driftX: 6,
    driftY: 8,
    driftDuration: 5720,
    driftDelay: 40,
    radius: "16px 24px 30px 18px",
    layer: 4,
  },
] as const;

const messageEmphasisPatterns = [
  /payment failed for 3 days/gi,
  /i still can't pay/gi,
  /failed checkout/gi,
  /billing settings/gi,
  /pending charge/gi,
  /exact steps/gi,
  /in a hurry/gi,
  /stop repeating yourself/gi,
  /how to fix it now/gi,
  /current status/gi,
  /try the same step again/gi,
  /keep this chat open/gi,
  /this is being reviewed/gi,
  /please wait a moment/gi,
  /\b\d+\s+days?\b/gi,
] as const;

function getMessageEmphasisRanges(text: string) {
  const ranges: Array<{ start: number; end: number }> = [];

  messageEmphasisPatterns.forEach((pattern) => {
    const matcher = new RegExp(pattern.source, pattern.flags);

    for (const match of text.matchAll(matcher)) {
      if (match.index === undefined) {
        continue;
      }

      ranges.push({
        start: match.index,
        end: match.index + match[0].length,
      });
    }
  });

  ranges.sort((left, right) => {
    if (left.start !== right.start) {
      return left.start - right.start;
    }

    return right.end - left.end;
  });

  const merged: Array<{ start: number; end: number }> = [];

  ranges.forEach((range) => {
    const previous = merged[merged.length - 1];

    if (!previous || range.start >= previous.end) {
      merged.push(range);
    }
  });

  return merged;
}

function renderMessageText(text: string) {
  const ranges = getMessageEmphasisRanges(text);

  if (ranges.length === 0) {
    return text;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;

  ranges.forEach((range, index) => {
    if (cursor < range.start) {
      parts.push(text.slice(cursor, range.start));
    }

    parts.push(
      <strong className="message-emphasis" key={`${range.start}-${range.end}-${index}`}>
        {text.slice(range.start, range.end)}
      </strong>,
    );

    cursor = range.end;
  });

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts;
}

function ProfileActionIcon({ kind }: { kind: ProfileActionKind }) {
  if (kind === "mic") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M12.6667 6.66671V8.00004C12.6667 10.5774 10.5773 12.6667 8.00001 12.6667M3.33334 6.66671V8.00004C3.33334 10.5774 5.42268 12.6667 8.00001 12.6667M8.00001 12.6667V14.6667M5.33334 14.6667H10.6667M8.00001 10C6.89544 10 6.00001 9.10461 6.00001 8.00004V3.33337C6.00001 2.2288 6.89544 1.33337 8.00001 1.33337C9.10458 1.33337 10 2.2288 10 3.33337V8.00004C10 9.10461 9.10458 10 8.00001 10Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "audio") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M14 12V8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8V12M4.5 14C4.03535 14 3.80303 14 3.60982 13.9616C2.81644 13.8038 2.19624 13.1836 2.03843 12.3902C2 12.197 2 11.9647 2 11.5V10.4C2 10.0266 2 9.83995 2.07266 9.69734C2.13657 9.5719 2.23856 9.46991 2.364 9.406C2.50661 9.33333 2.6933 9.33333 3.06667 9.33333H4.26667C4.64 9.33333 4.82667 9.33333 4.96928 9.406C5.09472 9.46991 5.19671 9.5719 5.26062 9.69734C5.33333 9.83995 5.33333 10.0266 5.33333 10.4V13.1667C5.33333 13.3216 5.33333 13.399 5.32052 13.4634C5.26792 13.7279 5.06122 13.9346 4.79673 13.9872C4.73234 14 4.65489 14 4.5 14ZM11.5 14C11.3451 14 11.2677 14 11.2033 13.9872C10.9388 13.9346 10.7321 13.7279 10.6795 13.4634C10.6667 13.399 10.6667 13.3216 10.6667 13.1667V10.4C10.6667 10.0266 10.6667 9.83995 10.7393 9.69734C10.8032 9.5719 10.9052 9.46991 11.0307 9.406C11.1733 9.33333 11.36 9.33333 11.7333 9.33333H12.9333C13.3067 9.33333 13.4934 9.33333 13.636 9.406C13.7614 9.46991 13.8634 9.5719 13.9273 9.69734C14 9.83995 14 10.0266 14 10.4V11.5C14 11.9647 14 12.197 13.9616 12.3902C13.8038 13.1836 13.1836 13.8038 12.3902 13.9616C12.197 14 11.9647 14 11.5 14Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.60315 2.04003C8.46593 2 8.31062 2 8 2C7.68938 2 7.53407 2 7.39685 2.04003C7.19606 2.09862 7.01866 2.21872 6.88979 2.38341C6.80165 2.49592 6.744 2.64011 6.62861 2.92848C6.46282 3.34301 6.00261 3.55647 5.57904 3.41533L5.19849 3.28854C4.92862 3.19856 4.79363 3.15357 4.66133 3.14587C4.46694 3.13454 4.2735 3.18021 4.10469 3.27727C3.98981 3.34334 3.88922 3.44394 3.68799 3.64513C3.47415 3.85896 3.36724 3.96588 3.2993 4.08792C3.1995 4.26723 3.15733 4.47289 3.17842 4.67701C3.19269 4.81594 3.24885 4.95633 3.36118 5.2371C3.53708 5.67682 3.36793 6.17919 2.96179 6.42289L2.77676 6.53392C2.49347 6.70388 2.35182 6.78886 2.249 6.90586C2.158 7.00939 2.0893 7.13064 2.04736 7.26198C2 7.41039 2 7.57721 2 7.91084C2 8.3059 2 8.50343 2.06313 8.67251C2.11884 8.82191 2.20951 8.95582 2.32752 9.06306C2.46108 9.18442 2.64263 9.25705 3.00583 9.40231C3.37692 9.55076 3.56798 9.96275 3.44157 10.3419L3.29809 10.7722C3.19877 11.0703 3.1491 11.2193 3.14461 11.3657C3.13921 11.5418 3.18035 11.7161 3.26395 11.8712C3.33341 12.0001 3.44449 12.1112 3.66665 12.3333C3.88882 12.5555 3.9999 12.6666 4.12882 12.7361C4.28386 12.8197 4.45822 12.8608 4.63428 12.8554C4.78069 12.8509 4.92972 12.8012 5.22779 12.7019L5.57915 12.5848C6.00263 12.4436 6.46282 12.657 6.62861 13.0715C6.744 13.3599 6.80165 13.5041 6.88979 13.6166C7.01866 13.7813 7.19606 13.9014 7.39685 13.96C7.53407 14 7.68938 14 8 14C8.31062 14 8.46593 14 8.60315 13.96C8.80394 13.9014 8.98134 13.7813 9.11021 13.6166C9.19835 13.5041 9.256 13.3599 9.37139 13.0715C9.53718 12.657 9.99739 12.4436 10.4209 12.5848L10.772 12.7019C11.07 12.8013 11.219 12.8509 11.3655 12.8555C11.5415 12.8609 11.7159 12.8197 11.8709 12.7361C11.9998 12.6666 12.1109 12.5555 12.3331 12.3334C12.5552 12.1112 12.6663 12.0002 12.7358 11.8712C12.8194 11.7162 12.8606 11.5418 12.8551 11.3658C12.8506 11.2194 12.8009 11.0703 12.7016 10.7723L12.5582 10.3423C12.4318 9.96292 12.623 9.55078 12.9942 9.40231C13.3574 9.25705 13.5389 9.18442 13.6725 9.06306C13.7905 8.95582 13.8812 8.82191 13.9369 8.67251C14 8.50343 14 8.3059 14 7.91084C14 7.57721 14 7.41039 13.9526 7.26198C13.9107 7.13064 13.842 7.00939 13.751 6.90586C13.6481 6.78886 13.5065 6.70388 13.2232 6.53392L13.038 6.42277C12.6319 6.17912 12.4626 5.67676 12.6385 5.23705C12.7508 4.95628 12.807 4.81588 12.8213 4.67696C12.8424 4.47284 12.8002 4.26718 12.7004 4.08787C12.6325 3.96583 12.5256 3.85891 12.3117 3.64508C12.1106 3.44389 12.01 3.34329 11.8951 3.27722C11.7263 3.18016 11.5328 3.13449 11.3384 3.14582C11.2061 3.15352 11.0711 3.19851 10.8012 3.28849L10.4209 3.41525C9.99739 3.55643 9.53718 3.343 9.37139 2.92848C9.256 2.6401 9.19835 2.49592 9.11021 2.38341C8.98134 2.21872 8.80394 2.09862 8.60315 2.04003Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatTime(date: Date) {
  return `Today at ${date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

function LuciusLogoMark() {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <path
        d="M97.2954 83.3126V61.8688C97.2954 59.4552 97.4058 57.9768 97.371 55.7774C97.3402 53.8225 97.172 52.324 96.8124 51.2329C96.4843 50.2376 96.0973 49.8614 95.7065 49.6517C95.2159 49.3885 94.0163 49.0216 91.4092 49.4306C81.85 50.9305 75.9084 51.4225 66.1033 53.7535C64.1853 54.2094 63.0044 54.9422 62.2193 55.7164C61.4188 56.5058 60.8202 57.5469 60.3909 58.9165C59.4634 61.8754 59.5338 65.4899 59.5338 69.6661V92.4663L68.0945 90.9672L68.2421 90.9433C71.3396 90.4904 74.1407 92.8928 74.1407 96.0464V107.557C74.1407 108.141 74.214 108.496 74.2742 108.687C74.3038 108.781 74.3309 108.838 74.3471 108.868C74.363 108.898 74.3734 108.91 74.3754 108.913C74.3776 108.915 74.3804 108.919 74.388 108.925C74.3962 108.931 74.4164 108.946 74.4544 108.966C74.5343 109.008 74.6895 109.073 74.9526 109.128C75.5139 109.246 76.2882 109.267 77.2548 109.181C78.2217 109.095 79.0968 108.936 80.01 108.789C86.5826 107.731 100.183 106.571 110.598 103.652C112.824 103.028 114.523 101.878 115.703 100.2C116.903 98.4964 117.795 95.9197 117.795 92.0835V75.5495C117.526 63.1443 117.795 71.2334 117.795 52.1221C117.795 48.6448 117.681 45.442 117.311 42.7005C116.942 39.9608 116.36 38.0375 115.653 36.8286C111.291 30.4785 107.235 27.7539 102.063 28.4862C84.9646 30.9069 64.2088 33.9344 51.5856 35.7521C47.5388 36.956 45.2979 38.8333 43.8466 41.7847C42.1952 45.143 41.3636 50.2961 41.3636 58.458V113.527C41.3637 122.417 43.6514 126.826 46.4243 129.032C49.2986 131.318 53.8351 132.169 60.4018 131.31C69.7095 130.093 80.5252 128.633 89.473 127.357C98.6009 126.055 105.376 124.998 106.941 124.588C109.176 124.004 111.461 125.341 112.045 127.576C112.63 129.81 111.293 132.095 109.058 132.68C106.898 133.245 99.4633 134.38 90.654 135.637C81.6643 136.919 70.8144 138.383 61.4859 139.603C54.0746 140.572 46.7304 139.961 41.2182 135.578C35.6047 131.113 33 123.643 33 113.527V58.458C33 50.05 33.7992 43.2632 36.3411 38.094C39.0528 32.5796 43.5047 29.3581 49.5465 27.6346L49.8182 27.5567L50.0981 27.5164C62.6642 25.7075 83.6466 22.6467 100.891 20.2053C110.655 18.8228 117.283 24.6233 122.167 31.5468L122.635 32.2204L122.699 32.3141L122.758 32.4115C124.366 35.0644 125.164 38.3481 125.6 41.5837C126.044 44.8803 126.159 48.5214 126.159 52.1221C126.159 71.9673 125.886 62.8855 126.158 75.4243L126.159 75.47V92.0835C126.159 97.2142 124.955 101.587 122.543 105.014C120.113 108.467 116.687 110.632 112.856 111.705C101.857 114.788 86.8802 116.155 81.3391 117.046C80.0189 117.259 76.4402 117.986 73.2347 117.313C71.4939 116.948 69.5017 116.112 67.9737 114.294C66.4304 112.459 65.7771 110.118 65.7771 107.557V99.8634L57.2164 101.363C54.0609 101.916 51.1703 99.4878 51.1702 96.2843V69.6661C51.1702 66.0451 51.008 60.8874 52.41 56.4145C53.1455 54.0682 54.3525 51.7282 56.3474 49.7611C58.3577 47.7789 60.9623 46.3793 64.1692 45.6169C74.3954 43.1859 81.0359 42.5919 90.1128 41.1677C93.7254 40.6009 96.9757 40.8413 99.6607 42.2818C102.445 43.7759 103.96 46.2 104.756 48.615C105.521 50.9341 105.699 53.4562 105.734 55.6451C105.764 57.5893 105.659 60.3783 105.659 61.8688V83.3126C105.659 85.6221 103.787 87.4943 101.477 87.4944C99.1676 87.4944 97.2954 85.6221 97.2954 83.3126Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BlackSendCursor() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 2.5L17.4 14.2H11.4L14.6 21.2L11.3 22.5L8.3 15.4L3.4 19.3L4 2.5Z"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function App() {
  const [messages, setMessages] = useState<Message[]>([...ambientMessages]);
  const [draft, setDraft] = useState("");
  const [phase, setPhase] = useState<ScenePhase>("idle");
  const [botStreamText, setBotStreamText] = useState("");
  const [revealedCardCount, setRevealedCardCount] = useState(0);
  const [sendCursorPath, setSendCursorPath] = useState<SendCursorPath | null>(null);
  const [paymentCursorPath, setPaymentCursorPath] = useState<SendCursorPath | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const contentBodyRef = useRef<HTMLDivElement | null>(null);
  const composerFormRef = useRef<HTMLFormElement | null>(null);
  const sendButtonRef = useRef<HTMLButtonElement | null>(null);
  const paymentPanelRef = useRef<HTMLDivElement | null>(null);
  const paymentCtaWrapRef = useRef<HTMLDivElement | null>(null);
  const paymentButtonRef = useRef<HTMLButtonElement | null>(null);
  const sceneTwoStartedRef = useRef(false);
  const sceneTwoTimeoutsRef = useRef<number[]>([]);
  const sceneThreeStartedRef = useRef(false);
  const sceneThreeTimeoutsRef = useRef<number[]>([]);
  const sceneFourStartedRef = useRef(false);
  const sceneFourTimeoutsRef = useRef<number[]>([]);
  const sceneFiveStartedRef = useRef(false);
  const sceneFiveTimeoutsRef = useRef<number[]>([]);

  const startSceneFive = () => {
    if (sceneFiveStartedRef.current) {
      return;
    }

    sceneFiveStartedRef.current = true;
    setRevealedCardCount(0);
    setPhase("scene-five-transition");

    const sceneFiveStageTimeout = window.setTimeout(() => {
      setPhase("scene-five-stage");
    }, 900);

    const sceneFiveCardsTimeout = window.setTimeout(() => {
      setPhase("scene-five-cards");

      sceneFourCards.forEach((_, index) => {
        const revealTimeout = window.setTimeout(() => {
          setRevealedCardCount(index + 1);
        }, index * SCENE_FIVE_CARD_STAGGER_MS);

        sceneFiveTimeoutsRef.current.push(revealTimeout);
      });
    }, 1260);

    const sceneFiveLogoTimeout = window.setTimeout(() => {
      setPhase("scene-five-logo");
    }, SCENE_FIVE_LOGO_DELAY_MS);

    const sceneFivePulseTimeout = window.setTimeout(() => {
      setPhase("scene-five-pulse");
    }, SCENE_FIVE_PULSE_DELAY_MS);

    const sceneFiveClearTimeout = window.setTimeout(() => {
      setPhase("scene-five-clear");
    }, SCENE_FIVE_CLEAR_DELAY_MS);

    const sceneFiveDoneTimeout = window.setTimeout(() => {
      setPhase("scene-five-done");
    }, SCENE_FIVE_DONE_DELAY_MS);

    sceneFiveTimeoutsRef.current.push(
      sceneFiveStageTimeout,
      sceneFiveCardsTimeout,
      sceneFiveLogoTimeout,
      sceneFivePulseTimeout,
      sceneFiveClearTimeout,
      sceneFiveDoneTimeout,
    );
  };

  const startSceneFourPayment = () => {
    if (sceneFourStartedRef.current) {
      return;
    }

    sceneFourStartedRef.current = true;
    setPhase("scene-four-payment-enter");

    const paymentReadyTimeout = window.setTimeout(() => {
      setPhase("scene-four-payment-ready");
    }, PAYMENT_ENTER_DURATION_MS);

    const paymentClickTimeout = window.setTimeout(() => {
      setPhase("scene-four-payment-click");
    }, PAYMENT_ENTER_DURATION_MS + PAYMENT_READY_DURATION_MS);

    const paymentLoadingTimeout = window.setTimeout(() => {
      setPhase("scene-four-payment-loading");
    }, PAYMENT_ENTER_DURATION_MS + PAYMENT_READY_DURATION_MS + PAYMENT_CLICK_DURATION_MS);

    const paymentErrorTimeout = window.setTimeout(() => {
      setPhase("scene-four-payment-error");
    }, PAYMENT_ENTER_DURATION_MS + PAYMENT_READY_DURATION_MS + PAYMENT_CLICK_DURATION_MS + PAYMENT_LOADING_DURATION_MS);

    const paymentHoldTimeout = window.setTimeout(() => {
      setPhase("scene-four-payment-hold");
    }, PAYMENT_ENTER_DURATION_MS + PAYMENT_READY_DURATION_MS + PAYMENT_CLICK_DURATION_MS + PAYMENT_LOADING_DURATION_MS + PAYMENT_ERROR_DURATION_MS);

    const paymentDoneTimeout = window.setTimeout(() => {
      startSceneFive();
    }, PAYMENT_ENTER_DURATION_MS + PAYMENT_READY_DURATION_MS + PAYMENT_CLICK_DURATION_MS + PAYMENT_LOADING_DURATION_MS + PAYMENT_ERROR_DURATION_MS + PAYMENT_HOLD_DURATION_MS);

    sceneFourTimeoutsRef.current.push(
      paymentReadyTimeout,
      paymentClickTimeout,
      paymentLoadingTimeout,
      paymentErrorTimeout,
      paymentHoldTimeout,
      paymentDoneTimeout,
    );
  };

  const startSceneThree = () => {
    if (sceneThreeStartedRef.current) {
      return;
    }

    sceneThreeStartedRef.current = true;
    const delays = [1160, 2840];

    sceneThreeTimeoutsRef.current = delays.map((delay, index) =>
      window.setTimeout(() => {
        const isLastMessage = index === sceneThreeMessages.length - 1;
        setPhase("scene-three-running");
        setMessages((current) => [
          ...current,
          {
            ...sceneThreeMessages[index],
            id: current.length + 1,
          },
        ]);

        if (isLastMessage) {
          const holdStartTimeout = window.setTimeout(() => {
            setPhase("scene-three-hold");
          }, 420);

          const holdEndTimeout = window.setTimeout(() => {
            setPhase("scene-three-done");
          }, 1420);

          const paymentStageTimeout = window.setTimeout(() => {
            startSceneFourPayment();
          }, 1420 + PRE_PAYMENT_STAGE_PAUSE_MS);

          sceneThreeTimeoutsRef.current.push(
            holdStartTimeout,
            holdEndTimeout,
            paymentStageTimeout,
          );
        }
      }, delay),
    );
  };

  const startSceneTwo = () => {
    if (sceneTwoStartedRef.current) {
      return;
    }

    sceneTwoStartedRef.current = true;
    const delays = [920, 2360, 3940, 5560];

    sceneTwoTimeoutsRef.current = delays.map((delay, index) =>
      window.setTimeout(() => {
        const isLastMessage = index === sceneTwoMessages.length - 1;
        setPhase(isLastMessage ? "scene-two-done" : "scene-two-running");
        setMessages((current) => [
          ...current,
          {
            ...sceneTwoMessages[index],
            id: current.length + 1,
          },
        ]);

        if (isLastMessage) {
          startSceneThree();
        }
      }, delay),
    );
  };

  useEffect(() => {
    if (!contentBodyRef.current) {
      return;
    }

    const viewport = contentBodyRef.current;
    const frameId = window.requestAnimationFrame(() => {
      viewport.scrollTop = viewport.scrollHeight;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [messages, botStreamText, phase]);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    if (phase === "idle" || phase === "typing-user-message" || phase === "sending") {
      inputRef.current.focus();
      const end = inputRef.current.value.length;
      inputRef.current.setSelectionRange(end, end);
      return;
    }

    inputRef.current.blur();
  }, [draft, phase]);

  useEffect(() => {
    if (phase !== "sending") {
      setSendCursorPath(null);
      return;
    }

    if (!composerFormRef.current || !sendButtonRef.current) {
      return;
    }

    const formRect = composerFormRef.current.getBoundingClientRect();
    const buttonRect = sendButtonRef.current.getBoundingClientRect();
    const endX = buttonRect.left - formRect.left + buttonRect.width * 0.44;
    const endY = buttonRect.top - formRect.top + buttonRect.height * 0.08;
    const startX = endX - 114;
    const startY = endY - 48;

    setSendCursorPath({
      startX,
      startY,
      deltaX: endX - startX,
      deltaY: endY - startY,
    });
  }, [phase]);

  useEffect(() => {
    if (phase !== "scene-four-payment-click") {
      setPaymentCursorPath(null);
      return;
    }

    if (!paymentCtaWrapRef.current || !paymentButtonRef.current) {
      return;
    }

    const wrapRect = paymentCtaWrapRef.current.getBoundingClientRect();
    const buttonRect = paymentButtonRef.current.getBoundingClientRect();
    const endX = buttonRect.left - wrapRect.left + buttonRect.width * 0.48;
    const endY = buttonRect.top - wrapRect.top + buttonRect.height * 0.18;
    const startX = endX - 128;
    const startY = endY - 58;

    setPaymentCursorPath({
      startX,
      startY,
      deltaX: endX - startX,
      deltaY: endY - startY,
    });
  }, [phase]);

  useEffect(() => {
    const timeouts: number[] = [];
    const intervals: number[] = [];
    let cancelled = false;

    const stageUserMessage = () => {
      if (cancelled) {
        return;
      }

      setPhase("typing-user-message");
      let index = 0;
      const typingInterval = window.setInterval(() => {
        if (cancelled) {
          window.clearInterval(typingInterval);
          return;
        }

        index += 1;
        setDraft(USER_COMPLAINT.slice(0, index));

        if (index >= USER_COMPLAINT.length) {
          window.clearInterval(typingInterval);
          const sendDelay = window.setTimeout(() => {
            if (cancelled) {
              return;
            }

            setPhase("sending");
            const sendTime = new Date();
            const sendCommitDelay = window.setTimeout(() => {
              if (cancelled) {
                return;
              }

              setMessages((current) => [
                ...current,
                {
                  id: current.length + 1,
                  author: "russell",
                  avatar: "RS",
                  timestamp: formatTime(sendTime),
                  text: USER_COMPLAINT,
                  tone: "user",
                },
              ]);
              setDraft("");
              setPhase("bot-typing");

              const botTypingDelay = window.setTimeout(() => {
                if (cancelled) {
                  return;
                }

                setPhase("bot-streaming");
                let streamIndex = 0;
                const streamInterval = window.setInterval(() => {
                  if (cancelled) {
                    window.clearInterval(streamInterval);
                    return;
                  }

                  streamIndex += 1;
                  setBotStreamText(BOT_REPLY.slice(0, streamIndex));

                  if (streamIndex >= BOT_REPLY.length) {
                    window.clearInterval(streamInterval);
                    const completedAt = new Date(sendTime.getTime() + 60_000);
                    setMessages((current) => [
                      ...current,
                      {
                        id: current.length + 1,
                        author: "Support Bot",
                        avatar: "SB",
                        timestamp: formatTime(completedAt),
                        text: BOT_REPLY,
                        tone: "bot",
                        appBadge: true,
                      },
                    ]);
                    setBotStreamText("");
                    setPhase("scene-one-done");
                    startSceneTwo();
                  }
                }, 22);

                intervals.push(streamInterval);
              }, 480);

              timeouts.push(botTypingDelay);
            }, SEND_CLICK_DURATION_MS);

            timeouts.push(sendCommitDelay);
          }, 180);

          timeouts.push(sendDelay);
        }
      }, 40);

      intervals.push(typingInterval);
    };

    const bootDelay = window.setTimeout(stageUserMessage, 320);
    timeouts.push(bootDelay);

    return () => {
      cancelled = true;
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      intervals.forEach((interval) => window.clearInterval(interval));
      sceneTwoTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      sceneThreeTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      sceneFourTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
      sceneFiveTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  const liveBotMessage = useMemo(() => {
    if (
      phase === "bot-streaming" ||
      phase === "scene-one-done" ||
      phase === "scene-two-running" ||
      phase === "scene-two-done"
    ) {
      return botStreamText;
    }

    return "";
  }, [botStreamText, phase]);

  const sendButtonActive = draft.trim().length > 0;
  const sendButtonEnabled = sendButtonActive || phase === "sending";
  const sendCursorStyle = sendCursorPath
    ? ({
        ["--send-cursor-start-x" as string]: `${sendCursorPath.startX}px`,
        ["--send-cursor-start-y" as string]: `${sendCursorPath.startY}px`,
        ["--send-cursor-delta-x" as string]: `${sendCursorPath.deltaX}px`,
        ["--send-cursor-delta-y" as string]: `${sendCursorPath.deltaY}px`,
      } as CSSProperties)
    : undefined;
  const paymentCursorStyle = paymentCursorPath
    ? ({
        ["--send-cursor-start-x" as string]: `${paymentCursorPath.startX}px`,
        ["--send-cursor-start-y" as string]: `${paymentCursorPath.startY}px`,
        ["--send-cursor-delta-x" as string]: `${paymentCursorPath.deltaX}px`,
        ["--send-cursor-delta-y" as string]: `${paymentCursorPath.deltaY}px`,
        ["--send-click-duration" as string]: `${PAYMENT_CLICK_DURATION_MS}ms`,
      } as CSSProperties)
    : undefined;
  const showPaymentStage =
    phase === "scene-four-payment-enter" ||
    phase === "scene-four-payment-ready" ||
    phase === "scene-four-payment-click" ||
    phase === "scene-four-payment-loading" ||
    phase === "scene-four-payment-error" ||
    phase === "scene-four-payment-hold" ||
    phase === "scene-five-transition";
  const showSceneFiveTransition = phase === "scene-five-transition";
  const showSceneFiveStage =
    phase === "scene-five-stage" ||
    phase === "scene-five-cards" ||
    phase === "scene-five-logo" ||
    phase === "scene-five-pulse" ||
    phase === "scene-five-clear" ||
    phase === "scene-five-done";
  const paymentButtonLabel =
    phase === "scene-four-payment-loading" ? "Processing..." : "Pay now";
  const showPaymentError =
    phase === "scene-four-payment-error" || phase === "scene-four-payment-hold";

  return (
    <main className="page-shell">
      <section className="asset-canvas" aria-label="Discord community mockup">
        <aside className="server-rail" aria-hidden="true">
          <div className="server-icon server-icon--home">
            <span className="server-icon__glyph server-icon__glyph--discord" />
          </div>
          <div className="server-divider" />
          <div className="server-slot server-slot--selected">
            <div className="server-indicator" />
            <div className="server-icon server-icon--community">SC</div>
            <span className="server-badge">2</span>
          </div>
          <div className="server-slot">
            <div className="server-icon server-icon--aux">HQ</div>
            <span className="server-badge server-badge--small">1</span>
          </div>
          <div className="server-slot">
            <div className="server-icon server-icon--muted">KB</div>
            <span className="server-badge server-badge--wide">8</span>
          </div>
          <div className="server-slot">
            <div className="server-icon server-icon--muted">AI</div>
            <span className="server-badge server-badge--wide">3</span>
          </div>
          <div className="server-slot">
            <div className="server-icon server-icon--plus">+</div>
          </div>
        </aside>

        <aside className="channel-rail" aria-hidden="true">
          <div className="guild-header">
            <div className="guild-header__title">
              <strong>Support Circle</strong>
              <span>v</span>
            </div>
            <div className="guild-header__action">+</div>
          </div>

          {channelSections.map((section) => (
            <div className="channel-group" key={section.title}>
              <span className="channel-group__title">{section.title}</span>
              {section.channels.map((channel) => (
                <button
                  key={channel.name}
                  type="button"
                  className={`channel-item${channel.active ? " channel-item--active" : ""}${
                    channel.voice ? " channel-item--voice" : ""
                  }`}
                >
                  <span className="channel-item__symbol">{channel.voice ? "V" : "#"}</span>
                  <span className="channel-item__label">{channel.name}</span>
                </button>
              ))}
            </div>
          ))}

          <div className="profile-dock">
            <DiscordAvatar name="russell" className="discord-avatar--compact profile-dock__avatar" />
            <div className="profile-dock__meta">
              <strong>russell</strong>
              <span>#9282</span>
            </div>
            <div className="profile-dock__actions">
              <span className="profile-dock__action-btn">
                <ProfileActionIcon kind="mic" />
              </span>
              <span className="profile-dock__action-btn">
                <ProfileActionIcon kind="audio" />
              </span>
              <span className="profile-dock__action-btn">
                <ProfileActionIcon kind="settings" />
              </span>
            </div>
          </div>
        </aside>

        <section
          className={`content-stage${
            phase === "scene-one-done" || phase === "scene-two-running" || phase === "scene-two-done"
              ? " content-stage--done"
              : ""
          }`}
        >
          <header className="content-stage__header">
            <div className="content-stage__meta">
              <strong># payment-help</strong>
            </div>
            <div className="content-stage__tools">
              <span className="search-chip">
                <span className="search-chip__placeholder">Search Support Circle</span>
                <span className="search-chip__icon">o</span>
              </span>
            </div>
          </header>

          <div className="content-stage__body" ref={contentBodyRef}>
            <section className="message-stack">
              {messages.map((message) => (
                <article
                  className={`${message.tone === "bot" ? "bot-thread" : "user-message"}${
                    message.ambient ? " message-row--ambient" : ""
                  }${message.id > ambientMessages.length + 2 ? " message-row--staged" : ""}`}
                  key={message.id}
                >
                  <DiscordAvatar
                    name={message.author}
                    className={`discord-avatar--message ${
                      message.tone === "bot" ? "bot-thread__avatar" : "user-message__avatar"
                    }`}
                  />
                  <div
                    className={
                      message.tone === "bot" ? "bot-thread__content" : "user-message__body"
                    }
                  >
                    <div
                      className={
                        message.tone === "bot" ? "bot-thread__meta" : "user-message__meta"
                      }
                    >
                      <strong>{message.author}</strong>
                      {message.appBadge ? <span className="bot-pill">APP</span> : null}
                      <span>{message.timestamp}</span>
                    </div>

                    <div className={message.tone === "bot" ? "bot-message" : "user-message__text"}>
                      <p>{renderMessageText(message.text)}</p>
                    </div>
                  </div>
                </article>
              ))}

              {phase === "bot-typing" ? (
                <article className="bot-thread">
                  <DiscordAvatar
                    name="Support Bot"
                    className="discord-avatar--message bot-thread__avatar"
                  />
                  <div className="bot-thread__content">
                    <div className="bot-thread__meta">
                      <strong>Support Bot</strong>
                      <span className="bot-pill">APP</span>
                      <span>typing...</span>
                    </div>
                    <div className="typing-indicator" aria-label="Support Bot is typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </article>
              ) : null}

              {liveBotMessage ? (
                <article
                  className={`bot-thread bot-thread--live${
                    phase === "scene-one-done" || phase === "scene-two-running" || phase === "scene-two-done"
                      ? " bot-thread--complete"
                    : ""
                  }`}
                >
                  <DiscordAvatar
                    name="Support Bot"
                    className="discord-avatar--message bot-thread__avatar"
                  />
                  <div className="bot-thread__content">
                    <div className="bot-thread__meta">
                      <strong>Support Bot</strong>
                      <span className="bot-pill">APP</span>
                      <span>Today at 8:34 PM</span>
                    </div>

                    <div className="bot-message">
                      <p>{renderMessageText(liveBotMessage)}</p>
                    </div>
                  </div>
                </article>
              ) : null}
            </section>
          </div>

          <footer className="composer-bar">
            <form
              ref={composerFormRef}
              className="composer-form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <span className="composer-bar__plus">+</span>
              <div
                className={`composer-input-shell${phase === "typing-user-message" ? " composer-input-shell--focused" : ""}`}
              >
                <input
                  ref={inputRef}
                  className="composer-input"
                  type="text"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Message #payment-help"
                  aria-label="Message payment-help"
                  spellCheck={false}
                />
              </div>
              <button
                ref={sendButtonRef}
                className={`composer-send${sendButtonActive ? " composer-send--active" : ""}${
                  phase === "sending" ? " composer-send--clicking" : ""
                }`}
                type="submit"
                disabled={!sendButtonEnabled}
              >
                Send
              </button>
              {phase === "sending" && sendCursorStyle ? (
                <span className="composer-send-cursor" style={sendCursorStyle} aria-hidden="true">
                  <span className="composer-send-cursor__icon">
                    <BlackSendCursor />
                  </span>
                </span>
              ) : null}
            </form>
          </footer>
        </section>

        <aside className="member-rail" aria-hidden="true">
          {memberGroups.map((group) => (
            <div className="member-group" key={group.title}>
              <span className="member-group__title">{group.title}</span>
              {group.names.map((name) => (
                <div className={`member-row ${group.tone}`} key={name}>
                  <DiscordAvatar name={name} className="discord-avatar--member member-row__avatar" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          ))}
        </aside>

        {showPaymentStage ? (
          <section
            className={`payment-stage payment-stage--${phase}`}
            aria-label="Payment failure stage"
          >
            <div className="payment-stage__shell">
              <div className="payment-stage__summary">
                <span className="payment-stage__eyebrow">Checkout</span>
                <h2>Premium workspace</h2>
                <p>Everything is ready. One payment is still blocking access.</p>
                <div className="payment-stage__summary-card">
                  <span>Plan</span>
                  <strong>Growth</strong>
                </div>
                <div className="payment-stage__summary-card">
                  <span>Billing</span>
                  <strong>Monthly</strong>
                </div>
              </div>

              <div ref={paymentPanelRef} className="payment-panel">
                <div className="payment-panel__header">
                  <span className="payment-panel__label">Billing</span>
                  <h3>Complete payment</h3>
                </div>

                <div className="payment-panel__amount">
                  <span className="payment-panel__amount-label">Amount due</span>
                  <strong>$49 / month</strong>
                </div>

                <div className="payment-panel__method">
                  <span>Payment method</span>
                  <strong>Visa ending in 2048</strong>
                </div>

                <div ref={paymentCtaWrapRef} className="payment-panel__cta-wrap">
                  <button
                    ref={paymentButtonRef}
                    className={`payment-cta${
                      phase === "scene-four-payment-click" ? " payment-cta--clicking" : ""
                    }${phase === "scene-four-payment-loading" ? " payment-cta--loading" : ""}`}
                    type="button"
                  >
                    {phase === "scene-four-payment-loading" ? (
                      <span className="payment-cta__loading">
                        <span className="payment-cta__spinner" aria-hidden="true" />
                        <span>{paymentButtonLabel}</span>
                      </span>
                    ) : (
                      paymentButtonLabel
                    )}
                  </button>

                  <div className={`payment-panel__error${showPaymentError ? " payment-panel__error--visible" : ""}`}>
                    {PAYMENT_ERROR_MESSAGE}
                  </div>

                  {phase === "scene-four-payment-click" && paymentCursorStyle ? (
                    <span
                      className="composer-send-cursor payment-stage__cursor"
                      style={paymentCursorStyle}
                      aria-hidden="true"
                    >
                      <span className="composer-send-cursor__icon">
                        <BlackSendCursor />
                      </span>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {showSceneFiveTransition ? (
          <div className="brand-transition-layer" aria-hidden="true">
            <div className="brand-transition-ring" />
          </div>
        ) : null}

        {showSceneFiveStage ? (
          <section
            className={`brand-stage brand-stage--${phase}`}
            aria-label="Lucius brand stage"
          >
            <div className="brand-stage__aura brand-stage__aura--orchid" aria-hidden="true" />
            <div className="brand-stage__aura brand-stage__aura--lavender" aria-hidden="true" />

            {sceneFourCards.map((card, index) => (
              (() => {
                const motion = noiseCardMotionPresets[index % noiseCardMotionPresets.length]!;

                return (
                  <article
                    className={`noise-card noise-card--${card.tone}${
                      revealedCardCount > index ? " noise-card--visible" : ""
                    }${
                      phase === "scene-five-clear" || phase === "scene-five-done"
                        ? " noise-card--cleared"
                        : ""
                    }`}
                    key={card.id}
                    style={
                      {
                        ["--card-top" as string]: `${card.top}%`,
                        ["--card-left" as string]: `${card.left}%`,
                        ["--card-clear-x" as string]: `${card.clearX}px`,
                        ["--card-clear-y" as string]: `${card.clearY}px`,
                        ["--card-width" as string]: `${card.width}px`,
                        ["--card-rotate" as string]: `${motion.rotate}deg`,
                        ["--card-enter-x" as string]: `${motion.enterX}px`,
                        ["--card-enter-y" as string]: `${motion.enterY}px`,
                        ["--card-drift-x" as string]: `${motion.driftX}px`,
                        ["--card-drift-y" as string]: `${motion.driftY}px`,
                        ["--card-drift-duration" as string]: `${motion.driftDuration}ms`,
                        ["--card-drift-delay" as string]: `${motion.driftDelay}ms`,
                        ["--card-launch-delay" as string]: `${index * 18}ms`,
                        ["--card-launch-duration" as string]: "560ms",
                        ["--card-radius" as string]: motion.radius,
                        ["--card-layer" as string]: `${motion.layer}`,
                      } as CSSProperties
                    }
                  >
                    <div className="noise-card__surface">
                      <p>{card.text}</p>
                    </div>
                  </article>
                );
              })()
            ))}

            <div className="brand-stage__center">
              <div
                className={`brand-logo-mark${
                  phase === "scene-five-logo" ||
                  phase === "scene-five-pulse" ||
                  phase === "scene-five-clear" ||
                  phase === "scene-five-done"
                    ? " brand-logo-mark--visible"
                    : ""
                }`}
                aria-hidden="true"
              >
                <LuciusLogoMark />
              </div>
              {phase === "scene-five-done" ? (
                <p className="brand-stage__line">Clear the AI noise.</p>
              ) : null}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
