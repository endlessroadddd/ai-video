import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

import discordIcon from "./assets/discord-icon.svg";
import { DiscordAvatar } from "./components/discord-avatar";
import {
  communityGuildState,
  type CommunitySceneView,
  type DiscordMessage,
  type SceneMode,
  type SceneView,
  type ServerSlot,
} from "./discord-ui-state";

const VIEW_LABELS: Record<SceneView, string> = {
  s01: "S01 Establishing",
  s02: "S02 Question",
  s03: "S03 Dry Reply",
  s04: "S04 Silence",
  s05a: "S05A Exit Feed",
  s05b: "S05B Loss Chart",
};

const SEND_CLICK_DURATION_MS = 920;

function navigate(scene: SceneView, mode: SceneMode) {
  const params = new URLSearchParams({
    scene,
    mode,
  });
  window.location.search = params.toString();
}

type ProfileActionKind = "mic" | "audio" | "settings";
type SendCursorPath = {
  deltaX: number;
  deltaY: number;
  startX: number;
  startY: number;
};

function collectFlowRects(container: HTMLElement) {
  const rects = new Map<string, DOMRect>();

  container.querySelectorAll<HTMLElement>("[data-flow-id]").forEach((node) => {
    const flowId = node.dataset.flowId;
    if (!flowId) {
      return;
    }

    rects.set(flowId, node.getBoundingClientRect());
  });

  return rects;
}

function useMessageFlowMotion(props: {
  scrollDependencies: readonly unknown[];
  layoutDependencies: readonly unknown[];
}) {
  const { scrollDependencies, layoutDependencies } = props;
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLElement | null>(null);
  const previousRectsRef = useRef<Map<string, DOMRect>>(new Map());

  useLayoutEffect(() => {
    const stack = stackRef.current;
    if (!stack) {
      return;
    }

    const nextRects = collectFlowRects(stack);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      previousRectsRef.current = nextRects;
      return;
    }

    const flowNodes = Array.from(stack.querySelectorAll<HTMLElement>("[data-flow-id]"));
    const animatedNodes: Array<{ node: HTMLElement; deltaY: number }> = [];
    flowNodes.forEach((node) => {
      const flowId = node.dataset.flowId;
      if (!flowId) {
        return;
      }

      const previousRect = previousRectsRef.current.get(flowId);
      const nextRect = nextRects.get(flowId);
      if (!previousRect || !nextRect) {
        return;
      }

      const deltaY = previousRect.top - nextRect.top;
      if (Math.abs(deltaY) < 1) {
        return;
      }

      animatedNodes.push({ node, deltaY });
    });

    if (animatedNodes.length > 12) {
      previousRectsRef.current = nextRects;
      return;
    }

    const animations: Animation[] = animatedNodes.map(({ node, deltaY }) =>
      node.animate(
        [
          { transform: `translate3d(0, ${deltaY}px, 0)` },
          { transform: "translate3d(0, 0, 0)" },
        ],
        {
          duration: 150,
          easing: "cubic-bezier(0.2, 0.95, 0.26, 1)",
        },
      ),
    );

    previousRectsRef.current = nextRects;

    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, layoutDependencies);

  useLayoutEffect(() => {
    const viewport = bodyRef.current;
    if (!viewport) {
      return;
    }

    viewport.scrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
  }, scrollDependencies);

  return { bodyRef, stackRef };
}

function buildTypedFrames(text: string, chunkSize = 2) {
  const frames: string[] = [];

  for (let index = 0; index < text.length; index += chunkSize) {
    frames.push(text.slice(0, index + chunkSize));
  }

  return frames;
}

function useSendCursorStyle(props: {
  active: boolean;
  formRef: RefObject<HTMLFormElement | null>;
  sendButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const { active, formRef, sendButtonRef } = props;
  const [cursorPath, setCursorPath] = useState<SendCursorPath | null>(null);

  useEffect(() => {
    if (!active) {
      setCursorPath(null);
      return;
    }

    if (!formRef.current || !sendButtonRef.current) {
      return;
    }

    const formRect = formRef.current.getBoundingClientRect();
    const buttonRect = sendButtonRef.current.getBoundingClientRect();
    const endX = buttonRect.left - formRect.left + buttonRect.width * 0.44;
    const endY = buttonRect.top - formRect.top + buttonRect.height * 0.08;
    const startX = endX - 114;
    const startY = endY - 48;

    setCursorPath({
      startX,
      startY,
      deltaX: endX - startX,
      deltaY: endY - startY,
    });
  }, [active, formRef, sendButtonRef]);

  if (!cursorPath) {
    return undefined;
  }

  return {
    ["--send-cursor-start-x" as string]: `${cursorPath.startX}px`,
    ["--send-cursor-start-y" as string]: `${cursorPath.startY}px`,
    ["--send-cursor-delta-x" as string]: `${cursorPath.deltaX}px`,
    ["--send-cursor-delta-y" as string]: `${cursorPath.deltaY}px`,
    ["--send-click-duration" as string]: `${SEND_CLICK_DURATION_MS}ms`,
  } satisfies CSSProperties;
}

function ProfileActionIcon(props: { kind: ProfileActionKind }) {
  const { kind } = props;

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

function getServerIconClass(slot: ServerSlot) {
  switch (slot.tone) {
    case "community":
      return "server-icon--community";
    case "aux":
      return "server-icon--aux";
    case "plus":
      return "server-icon--plus";
    case "muted":
    default:
      return "server-icon--muted";
  }
}

function getServerBadgeClass(slot: ServerSlot) {
  if (slot.badgeTone === "small") {
    return "server-badge server-badge--small";
  }

  if (slot.badgeTone === "wide") {
    return "server-badge server-badge--wide";
  }

  return "server-badge";
}

function MessageRow(props: {
  className?: string;
  message: DiscordMessage;
  rowId?: string;
  style?: CSSProperties;
}) {
  const { className, message, rowId, style } = props;
  const isBot = message.tone === "bot";
  const isSystemTicket = message.variant === "system-ticket";

  return (
    <article
      className={`${isBot ? "bot-thread" : "user-message"}${
        isSystemTicket ? " bot-thread--ticket" : ""
      }${className ? ` ${className}` : ""}`}
      data-flow-id={rowId ?? String(message.id)}
      style={style}
    >
      <DiscordAvatar
        className="discord-avatar--message"
        name={message.avatarName ?? message.author}
      />

      <div className={isBot ? "bot-thread__content" : "user-message__body"}>
        <div className={isBot ? "bot-thread__meta" : "user-message__meta"}>
          <strong>{message.author}</strong>
          {message.appBadge ? <span className="bot-pill">APP</span> : null}
          {message.botTag ? <span className="bot-tag">{message.botTag}</span> : null}
          {message.timestamp ? (
            <span>{message.timestamp}</span>
          ) : null}
        </div>
        {isBot ? (
          <div className={`bot-message${isSystemTicket ? " bot-message--ticket" : ""}`}>
            <p className={isSystemTicket ? "bot-message__primary" : undefined}>{message.text}</p>
            {message.secondaryText ? (
              <p className="bot-message__secondary">{message.secondaryText}</p>
            ) : null}
            {message.footerText ? (
              <p className="bot-message__footer">{message.footerText}</p>
            ) : null}
          </div>
        ) : (
          <div className="user-message__text">
            <p>{message.text}</p>
            {message.attachmentImageSrc ? (
              <div className="user-message__attachments">
                <img
                  alt={message.attachmentImageAlt ?? ""}
                  className="user-message__attachment-image"
                  decoding="async"
                  loading="eager"
                  src={message.attachmentImageSrc}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}

function TypingIndicatorRow(props: {
  author: string;
  avatarName?: string;
  className?: string;
  rowId?: string;
}) {
  const { author, avatarName, className, rowId } = props;

  return (
    <article
      className={`bot-thread bot-thread--typing${className ? ` ${className}` : ""}`}
      data-flow-id={rowId ?? `typing-${author}`}
    >
      <DiscordAvatar className="discord-avatar--message" name={avatarName ?? author} />
      <div className="bot-thread__content">
        <div className="bot-thread__meta">
          <strong>{author}</strong>
          <span className="bot-pill">APP</span>
          <span>typing...</span>
        </div>
        <div className="typing-indicator" aria-label={`${author} is typing`}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </article>
  );
}

function SceneToolbar(props: { currentScene: SceneView; mode: SceneMode }) {
  const { currentScene, mode } = props;

  return (
    <div className="scene-nav">
      <div className="scene-nav__group">
        {(Object.keys(VIEW_LABELS) as SceneView[]).map((scene) => (
          <button
            className={`scene-nav__button${
              scene === currentScene ? " scene-nav__button--active" : ""
            }${scene === "s05b" ? " scene-nav__button--chart" : ""}`}
            key={scene}
            onClick={() => navigate(scene, mode)}
            type="button"
          >
            {VIEW_LABELS[scene]}
          </button>
        ))}
      </div>

      <div className="scene-nav__group">
        <span className="scene-nav__mode-label">Mode</span>
        {(["static", "motion"] as SceneMode[]).map((sceneMode) => (
          <button
            className={`scene-nav__button${
              sceneMode === mode ? " scene-nav__button--active" : ""
            }`}
            key={sceneMode}
            onClick={() => navigate(currentScene, sceneMode)}
            type="button"
          >
            {sceneMode}
          </button>
        ))}
      </div>
    </div>
  );
}

function ServerRail() {
  return (
    <aside className="server-rail" aria-hidden="true">
      <div className="server-icon server-icon--home">
        <img alt="" className="server-icon__image" src={discordIcon} />
      </div>
      <div className="server-divider" />

      {communityGuildState.serverSlots.map((slot) => (
        <div
          className="server-slot"
          key={`${slot.label}-${"badge" in slot ? slot.badge : "none"}`}
        >
          {"selected" in slot && slot.selected ? <div className="server-indicator" /> : null}
          <div className={`server-icon ${getServerIconClass(slot)}`}>{slot.label}</div>
          {"badge" in slot && slot.badge ? (
            <span className={getServerBadgeClass(slot)}>{slot.badge}</span>
          ) : null}
        </div>
      ))}
    </aside>
  );
}

function ChannelRail() {
  return (
    <aside className="channel-rail" aria-hidden="true">
      <div className="guild-header">
        <div className="guild-header__title">
          <strong>{communityGuildState.guildName}</strong>
          <span>v</span>
        </div>
        <div className="guild-header__action">+</div>
      </div>

      {communityGuildState.channelSections.map((section) => (
        <div className="channel-group" key={section.title}>
          <span className="channel-group__title">{section.title}</span>
          {section.channels.map((channel) => (
            (() => {
              const isActive = "active" in channel && channel.active;
              const isVoice = "voice" in channel && channel.voice;
              const symbol = "symbol" in channel ? channel.symbol : "#";

              return (
                <button
                  className={`channel-item${isActive ? " channel-item--active" : ""}${
                    isVoice ? " channel-item--voice" : ""
                  }`}
                  key={channel.name}
                  type="button"
                >
                  <span className="channel-item__symbol">{isVoice ? "V" : symbol}</span>
                  <span className="channel-item__label">{channel.name}</span>
                </button>
              );
            })()
          ))}
        </div>
      ))}

      <div className="profile-dock">
        <DiscordAvatar
          className="discord-avatar--compact"
          name={communityGuildState.profile.name}
          status="online"
        />
        <div className="profile-dock__meta">
          <strong>{communityGuildState.profile.name}</strong>
          <span>{communityGuildState.profile.tag}</span>
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
  );
}

function MemberRail(props: { mode: SceneMode }) {
  const { mode } = props;

  return (
    <aside className="member-rail" aria-hidden="true">
      {communityGuildState.memberGroups.map((group, groupIndex) => (
        <section className="member-group" key={group.title}>
          <span className="member-group__title">{group.title}</span>

          {group.names.map((name, memberIndex) => (
            <div
              className={`member-row ${group.tone}${mode === "motion" ? " member-row--motion-enter" : ""}`}
              key={name}
              style={
                mode === "motion"
                  ? { animationDelay: `${groupIndex * 100 + memberIndex * 50}ms` }
                  : undefined
              }
            >
              <DiscordAvatar
                className="discord-avatar--compact"
                name={name}
                status="online"
              />
              <span>{name}</span>
            </div>
          ))}
        </section>
      ))}
    </aside>
  );
}

function MemberRailExits(props: { mode: SceneMode }) {
  const { mode } = props;
  const exitDelays = [220, 430, 640, 840, 1030, 1210, 1380, 1540, 1690, 1830, 1960, 2080, 2190, 2290];

  return (
    <aside className="member-rail member-rail--exits" aria-hidden="true">
      <div className="member-rail__header">
        <div className="member-counter">
          <strong>Online - {communityGuildState.onlineCounts[2]}</strong>
          <span className="member-counter__trend">
            {communityGuildState.onlineCounts[0]} -&gt; {communityGuildState.onlineCounts[1]} -&gt; {communityGuildState.onlineCounts[2]}
          </span>
        </div>
      </div>

      <div className="exit-feed">
        {communityGuildState.exitFeed.map((item, index) => (
          <div
            className={`exit-feed__item${mode === "motion" ? " exit-feed__item--motion-enter" : ""}`}
            key={`${item}-${index}`}
            style={
              mode === "motion"
                ? {
                    animationDelay: `${
                      exitDelays[index] ??
                      exitDelays[exitDelays.length - 1] + (index - exitDelays.length + 1) * 24
                    }ms`,
                  }
                : undefined
            }
          >
            <span className="exit-feed__dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function ChatHeader() {
  return (
    <header className="content-stage__header">
      <div className="content-stage__meta">
        <strong>
          {communityGuildState.activeChannelSymbol} {communityGuildState.activeChannel}
        </strong>
        <span>{communityGuildState.channelTopic}</span>
      </div>
      <div className="content-stage__tools">
        <span className="search-chip">
          <span className="search-chip__placeholder">
            {communityGuildState.searchPlaceholder}
          </span>
          <span className="search-chip__icon">o</span>
        </span>
      </div>
    </header>
  );
}

function ChatComposer(props: {
  draft?: string;
  focused?: boolean;
  formRef?: RefObject<HTMLFormElement | null>;
  placeholder?: string;
  sendActive?: boolean;
  sendButtonRef?: RefObject<HTMLButtonElement | null>;
  sendCursorStyle?: CSSProperties;
  sending?: boolean;
}) {
  const {
    draft = "",
    focused = false,
    formRef,
    placeholder = `Message #${communityGuildState.activeChannel}`,
    sendActive = false,
    sendButtonRef,
    sendCursorStyle,
    sending = false,
  } = props;

  return (
    <form
      className="composer-form"
      onSubmit={(event) => {
        event.preventDefault();
      }}
      ref={formRef}
    >
      <span className="composer-bar__plus">+</span>
      <div className={`composer-input-shell${focused ? " composer-input-shell--focused" : ""}`}>
        <input
          aria-label={placeholder}
          className="composer-input"
          placeholder={placeholder}
          readOnly
          spellCheck={false}
          type="text"
          value={draft}
        />
      </div>
      <button
        className={`composer-send${sendActive ? " composer-send--active" : ""}${
          sending ? " composer-send--clicking" : ""
        }`}
        disabled={!sendActive && !sending}
        ref={sendButtonRef}
        type="submit"
      >
        Send
      </button>

      {sending && sendCursorStyle ? (
        <span className="composer-send-cursor" style={sendCursorStyle} aria-hidden="true">
          <span className="composer-send-cursor__icon">
            <BlackSendCursor />
          </span>
        </span>
      ) : null}
    </form>
  );
}

function ChatScene(props: {
  bodyClassName?: string;
  bodyRef?: RefObject<HTMLDivElement | null>;
  children: ReactNode;
  composer?: ReactNode;
  dimmed?: boolean;
  stageDone?: boolean;
}) {
  const { bodyClassName, bodyRef, children, composer = <ChatComposer />, dimmed = false, stageDone = false } = props;

  return (
    <section
      className={`content-stage${dimmed ? " content-stage--dimmed" : ""}${
        stageDone ? " content-stage--done" : ""
      }`}
    >
      <ChatHeader />
      <div className={`content-stage__body${bodyClassName ? ` ${bodyClassName}` : ""}`} ref={bodyRef}>
        {children}
      </div>
      <footer className="composer-bar">{composer}</footer>
    </section>
  );
}

function Scene01(props: { mode: SceneMode }) {
  const { mode } = props;

  return (
    <ChatScene>
      <section className="message-stack">
        {communityGuildState.scene01Messages.map((message, index) => (
          <MessageRow
            className={mode === "motion" ? " message-row--staged" : undefined}
            key={message.id}
            message={message}
            style={mode === "motion" ? { animationDelay: `${index * 180}ms` } : undefined}
          />
        ))}
      </section>
    </ChatScene>
  );
}

function Scene02(props: { mode: SceneMode }) {
  const { mode } = props;
  const leadMessages = [
    ...communityGuildState.scene01Messages,
    ...communityGuildState.scene02Messages.slice(0, 2),
  ];
  const questionMessage = communityGuildState.scene02Messages[2]!;
  const [draft, setDraft] = useState(mode === "motion" ? "" : questionMessage.text);
  const [phase, setPhase] = useState<"idle" | "typing" | "sending" | "done">(
    mode === "motion" ? "idle" : "done",
  );
  const [showQuestion, setShowQuestion] = useState(mode !== "motion");
  const visibleCount = leadMessages.length + (showQuestion ? 1 : 0);
  const { bodyRef, stackRef } = useMessageFlowMotion({
    scrollDependencies: [visibleCount],
    layoutDependencies: [visibleCount],
  });
  const composerFormRef = useRef<HTMLFormElement | null>(null);
  const sendButtonRef = useRef<HTMLButtonElement | null>(null);
  const sendCursorStyle = useSendCursorStyle({
    active: phase === "sending",
    formRef: composerFormRef,
    sendButtonRef,
  });

  useEffect(() => {
    if (mode !== "motion") {
      setDraft(questionMessage.text);
      setPhase("done");
      setShowQuestion(true);
      return;
    }

    setDraft("");
    setPhase("idle");
    setShowQuestion(false);

    const timeouts: number[] = [];
    const typedFrames = buildTypedFrames(questionMessage.text);

    const bootDelay = window.setTimeout(() => {
      setPhase("typing");
      typedFrames.forEach((frame, index) => {
        timeouts.push(
          window.setTimeout(() => {
            setDraft(frame);
          }, index * 46),
        );
      });

      const typingDoneAt = typedFrames.length * 46;
      const sendDelay = window.setTimeout(() => {
        setPhase("sending");
      }, typingDoneAt + 160);

      const commitDelay = window.setTimeout(() => {
        setShowQuestion(true);
        setDraft("");
        setPhase("done");
      }, typingDoneAt + 160 + SEND_CLICK_DURATION_MS);

      timeouts.push(sendDelay, commitDelay);
    }, 320);

    timeouts.push(bootDelay);

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [mode, questionMessage.text]);

  return (
    <ChatScene
      bodyRef={bodyRef}
      composer={
        <ChatComposer
          draft={draft}
          focused={phase === "typing"}
          formRef={composerFormRef}
          sendActive={draft.trim().length > 0}
          sendButtonRef={sendButtonRef}
          sendCursorStyle={sendCursorStyle}
          sending={phase === "sending"}
        />
      }
    >
      <section className="message-stack" ref={stackRef}>
        {leadMessages.map((message) => (
          <MessageRow
            key={message.id}
            message={message}
            className={mode === "motion" ? " message-row--ambient" : undefined}
          />
        ))}

        {showQuestion ? (
          <MessageRow
            className={mode === "motion" ? " message-row--staged" : undefined}
            key={questionMessage.id}
            message={questionMessage}
          />
        ) : null}
      </section>
    </ChatScene>
  );
}

function Scene03(props: { mode: SceneMode }) {
  const { mode } = props;
  const anchorMessages = [
    ...communityGuildState.scene01Messages,
    ...communityGuildState.scene02Messages,
  ];
  const bridgeMessage = communityGuildState.scene03Messages[3]!;
  const ticketReplyMessage = communityGuildState.scene03Messages[4]!;
  const [showBridgeMessage, setShowBridgeMessage] = useState(mode !== "motion");
  const [showTyping, setShowTyping] = useState(false);
  const [showTicketReply, setShowTicketReply] = useState(mode !== "motion");
  const [stageDone, setStageDone] = useState(mode !== "motion");
  const visibleCount =
    anchorMessages.length +
    (showBridgeMessage ? 1 : 0) +
    (showTyping ? 1 : 0) +
    (showTicketReply ? 1 : 0);
  const { bodyRef, stackRef } = useMessageFlowMotion({
    scrollDependencies: [visibleCount],
    layoutDependencies: [visibleCount],
  });

  useEffect(() => {
    if (mode !== "motion") {
      setShowBridgeMessage(true);
      setShowTyping(false);
      setShowTicketReply(true);
      setStageDone(true);
      return;
    }

    setShowBridgeMessage(false);
    setShowTyping(false);
    setShowTicketReply(false);
    setStageDone(false);

    const timeouts: number[] = [];

    timeouts.push(window.setTimeout(() => setShowBridgeMessage(true), 220));
    timeouts.push(window.setTimeout(() => setShowTyping(true), 920));
    timeouts.push(
      window.setTimeout(() => {
        setShowTyping(false);
        setShowTicketReply(true);
        timeouts.push(window.setTimeout(() => setStageDone(true), 220));
      }, 1560),
    );

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [mode]);

  return (
    <ChatScene bodyRef={bodyRef} stageDone={stageDone}>
      <section className="message-stack" ref={stackRef}>
        {anchorMessages.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}

        {showBridgeMessage ? (
          <MessageRow
            className={mode === "motion" ? " message-row--staged" : undefined}
            message={bridgeMessage}
          />
        ) : null}

        {showTyping ? (
          <TypingIndicatorRow
            author={ticketReplyMessage.author}
            avatarName={ticketReplyMessage.avatarName}
            className={mode === "motion" ? " message-row--staged" : undefined}
            rowId="scene03-typing"
          />
        ) : null}

        {showTicketReply ? (
          <MessageRow
            className={mode === "motion" ? " message-row--alert" : undefined}
            message={ticketReplyMessage}
            rowId="scene03-ticket"
          />
        ) : null}
      </section>
    </ChatScene>
  );
}

function Scene04(props: { mode: SceneMode }) {
  const { mode } = props;
  const fullHistory = [
    ...communityGuildState.scene01Messages,
    ...communityGuildState.scene02Messages,
    ...communityGuildState.scene03Messages.slice(3),
  ];
  const reactions = communityGuildState.scene04Messages as readonly DiscordMessage[];
  const [revealedCount, setRevealedCount] = useState(mode === "motion" ? 0 : reactions.length);
  const visibleCount = fullHistory.length + revealedCount;
  const { bodyRef, stackRef } = useMessageFlowMotion({
    scrollDependencies: [visibleCount],
    layoutDependencies: [visibleCount],
  });

  useEffect(() => {
    if (mode !== "motion") {
      setRevealedCount(reactions.length);
      return;
    }

    setRevealedCount(0);
    const revealDelays = [320, 900, 1320, 1660, 1940, 2180, 2390, 2570, 2720, 2860, 2990, 3110, 3220, 3320];

    const timeouts = reactions.map((_, index) => {
      const fallbackDelay =
        revealDelays[revealDelays.length - 1] + (index - revealDelays.length + 1) * 90;
      const delay = revealDelays[index] ?? fallbackDelay;

      return window.setTimeout(() => setRevealedCount(index + 1), delay);
    });

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [mode, reactions.length]);

  return (
    <ChatScene bodyRef={bodyRef}>
      <section className="message-stack message-stack--quiet" ref={stackRef}>
        {fullHistory.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}

        {reactions.slice(0, revealedCount).map((message) => (
          <MessageRow
            className={`${mode === "motion" ? " message-row--staged" : ""}${
              mode === "motion" && message.effect === "shake-once" ? " message-row--shake-once" : ""
            }`}
            key={message.id}
            message={message}
          />
        ))}
      </section>
    </ChatScene>
  );
}

function Scene05a(props: { mode: SceneMode }) {
  const { mode } = props;
  const fullHistory = [
    ...communityGuildState.scene01Messages,
    ...communityGuildState.scene02Messages,
    ...communityGuildState.scene03Messages.slice(3),
    ...communityGuildState.scene04Messages,
  ];

  return (
    <ChatScene dimmed>
      <section className="message-stack">
        {fullHistory.map((message) => (
          <MessageRow
            className={mode === "motion" ? " message-row--ambient" : undefined}
            key={message.id}
            message={message}
          />
        ))}
      </section>
    </ChatScene>
  );
}

function renderCommunityScene(view: CommunitySceneView, mode: SceneMode) {
  switch (view) {
    case "s01":
      return <Scene01 mode={mode} />;
    case "s02":
      return <Scene02 mode={mode} />;
    case "s03":
      return <Scene03 mode={mode} />;
    case "s04":
      return <Scene04 mode={mode} />;
    case "s05a":
      return <Scene05a mode={mode} />;
  }
}

export function CommunityScene(props: {
  chrome?: "full" | "clean";
  currentScene: CommunitySceneView;
  mode: SceneMode;
}) {
  const { chrome = "full", currentScene, mode } = props;

  return (
    <main
      className={`page-shell${mode === "motion" ? " page-shell--motion" : ""}${
        chrome === "clean" ? " page-shell--clean" : ""
      }`}
    >
      {chrome === "full" ? <SceneToolbar currentScene={currentScene} mode={mode} /> : null}

      <div className="app-grid">
        <ServerRail />
        <ChannelRail />
        {renderCommunityScene(currentScene, mode)}
        {currentScene === "s05a" ? <MemberRailExits mode={mode} /> : <MemberRail mode={mode} />}
      </div>
    </main>
  );
}
