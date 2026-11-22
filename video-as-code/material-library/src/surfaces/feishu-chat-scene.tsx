import type { ReactNode } from "react";

import {
  AUTO_LEARN_HISTORY_MESSAGES,
  AUTO_LEARN_PARTICIPANTS,
  AUTO_LEARN_SCRIPT_MESSAGES,
} from "../chat/auto-learn-knowledge-data";
import {
  FeishuMessage,
  type FeishuMessageData,
  type FeishuParticipant,
  FeishuTypingIndicator,
} from "../chat/feishu-primitives";
import { clamp01, easeOutCubic, mix, ramp } from "../motion/easing";

type FeishuChatListItem = {
  active?: boolean;
  colors: string[];
  members: string[];
  name: string;
  preview: string;
  time: string;
  unread?: number;
};

const DEFAULT_CHAT_LIST_ITEMS: FeishuChatListItem[] = [
  {
    name: "Subscription Policy",
    active: true,
    preview: "Lucius: Knowledge Base Updated",
    time: "Just now",
    unread: 3,
    members: ["S", "M", "L", "A"],
    colors: ["#e53e3e", "#f5a623", "#34a853", "#7b61ff"],
  },
  {
    name: "Product Design",
    preview: "Emma: New mockups are ready",
    time: "14:32",
    members: ["E", "J", "R", "T"],
    colors: ["#3370ff", "#00c7a3", "#ff6b35", "#a855f7"],
  },
  {
    name: "Engineering Standup",
    preview: "David: Deploy pipeline is green",
    time: "10:15",
    members: ["D", "N", "P", "W"],
    colors: ["#1456f0", "#e53e3e", "#f59e0b", "#0fad5a"],
  },
];

export type FeishuChatSceneProps = {
  chatTitle?: string;
  historyMessages?: FeishuMessageData[];
  messageTimeline?: FeishuMessageData[];
  onCardAction?: (action: string) => void;
  opacity?: number;
  participants?: Record<string, FeishuParticipant>;
  t?: number;
  typingEndMs?: number;
  typingParticipantId?: string;
  typingStartMs?: number;
};

export function FeishuChatScene({
  chatTitle = "Subscription Policy Discussion",
  historyMessages = AUTO_LEARN_HISTORY_MESSAGES,
  messageTimeline = AUTO_LEARN_SCRIPT_MESSAGES,
  onCardAction,
  opacity = 1,
  participants = AUTO_LEARN_PARTICIPANTS,
  t = Number.MAX_SAFE_INTEGER,
  typingEndMs = 12000,
  typingParticipantId = "lucius",
  typingStartMs = 10000,
}: FeishuChatSceneProps) {
  const allMessages = [...historyMessages, ...messageTimeline];
  const visibleMessages = allMessages.filter((message) => t >= (message.showAt ?? 0));
  const showTyping = t >= typingStartMs && t < typingEndMs;
  const stageIn = easeOutCubic(ramp(t, 0, 1200));

  return (
    <div
      className="feishu-scene"
      style={{
        opacity: opacity * mix(0, 1, stageIn),
      }}
    >
      <div className="feishu-window">
        <div className="feishu-nav">
          <div className="feishu-nav-avatar">K</div>
          <FeishuNavIcon active>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </FeishuNavIcon>
          <FeishuNavIcon>
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </FeishuNavIcon>
          <FeishuNavIcon>
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" />
          </FeishuNavIcon>
        </div>

        <div className="feishu-chatlist">
          <div className="feishu-chatlist-search">
            <svg viewBox="0 0 24 24" className="feishu-search-icon">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <span>Search</span>
          </div>

          {DEFAULT_CHAT_LIST_ITEMS.map((item) => (
            <FeishuChatListRow key={item.name} item={item} />
          ))}
        </div>

        <div className="feishu-chat-main">
          <div className="feishu-chat-header">
            <div className="feishu-chat-header-left">
              <div className="feishu-multi-avatar-sm">
                {["#e53e3e", "#f5a623", "#34a853", "#7b61ff"].map((color, index) => (
                  <div key={color} className="feishu-sub-av-sm" style={{ background: color }}>
                    {["S", "M", "L", "A"][index]}
                  </div>
                ))}
              </div>
              <span className="feishu-chat-title">{chatTitle}</span>
              <div className="feishu-members-count">
                <svg viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                <span>5</span>
              </div>
            </div>

            <div className="feishu-chat-header-actions">
              <FeishuHeaderButton>
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </FeishuHeaderButton>
              <FeishuHeaderButton>
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </FeishuHeaderButton>
            </div>
          </div>

          <div className="feishu-tabs">
            <div className="feishu-tab active">Chat</div>
            <div className="feishu-tab">Docs</div>
            <div className="feishu-tab">Files</div>
          </div>

          <div className="feishu-messages">
            <div className="feishu-date-div"><span>Today</span></div>
            {visibleMessages.map((message) => {
              const participant =
                message.type === "system"
                  ? participants.lucius
                  : participants[message.sender] ?? participants.lucius;
              const fadeMs = 600;
              const progress = easeOutCubic(ramp(t, message.showAt ?? 0, (message.showAt ?? 0) + fadeMs));

              return (
                <FeishuMessage
                  key={message.id}
                  msg={message}
                  participant={participant}
                  opacity={clamp01(progress)}
                  translateY={mix(12, 0, progress)}
                  onCardAction={onCardAction}
                />
              );
            })}

            {showTyping ? (
              <FeishuTypingIndicator
                participant={participants[typingParticipantId] ?? participants.lucius}
              />
            ) : null}
          </div>

          <div className="feishu-input-area">
            <div className="feishu-input-row">
              <div
                className="feishu-input-box"
                data-placeholder={`Message ${chatTitle}...`}
              />
              <div className="feishu-input-tools">
                <div className="feishu-tb-btn feishu-tb-aa">Aa</div>
                <div className="feishu-input-sep" />
                <div className="feishu-send-btn" title="Send">
                  <svg viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeishuNavIcon({
  active = false,
  children,
}: {
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`feishu-nav-icon${active ? " active" : ""}`}>
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );
}

function FeishuHeaderButton({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="feishu-header-btn">
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  );
}

function FeishuChatListRow({
  item,
}: {
  item: FeishuChatListItem;
}) {
  return (
    <div className={`feishu-ci${item.active ? " active" : ""}`}>
      <div className="feishu-ci-avatar multi">
        {item.members.map((member, index) => (
          <div key={`${item.name}-${member}`} className="feishu-sub-av" style={{ background: item.colors[index] }}>
            {member}
          </div>
        ))}
      </div>
      <div className="feishu-ci-body">
        <div className="feishu-ci-top">
          <span className="feishu-ci-name">{item.name}</span>
          <span className="feishu-ci-time">{item.time}</span>
        </div>
        <div className="feishu-ci-preview">
          {item.preview}
          {item.unread ? <span className="feishu-ci-unread">{item.unread}</span> : null}
        </div>
      </div>
    </div>
  );
}
