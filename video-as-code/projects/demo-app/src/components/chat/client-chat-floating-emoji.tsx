import { type CSSProperties, type ReactElement } from "react";

import type { ClientChatFloatingEmojiMessageRaw } from "@/lib/client-chat-support-recording";
import { cn } from "@/lib/utils";

const CLIENT_CHAT_FLOATING_EMOJI_GLYPH: Record<
  ClientChatFloatingEmojiMessageRaw["emoji"],
  string
> = {
  frustrated: "😣",
  "party-popper": "🎉",
  smile: "😊",
  sparkles: "✨",
  "thumbs-up": "👍",
};

export function ClientChatFloatingEmoji(props: {
  className?: string;
  raw: ClientChatFloatingEmojiMessageRaw;
}): ReactElement {
  const { className, raw } = props;

  const style = {
    "--dashboard-chat-floating-emoji-appear-delay": `${raw.delayMs}ms`,
    "--dashboard-chat-floating-emoji-drift-delay": `${raw.delayMs + 420}ms`,
    "--dashboard-chat-floating-emoji-size":
      raw.size === "lg" ? "68px" : raw.size === "sm" ? "52px" : "60px",
  } as CSSProperties;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "dashboard-chat-floating-emoji",
        raw.anchor === "start"
          ? "dashboard-chat-floating-emoji--start"
          : "dashboard-chat-floating-emoji--end",
        className,
      )}
      style={style}
    >
      <span
        className={cn(
          "dashboard-chat-floating-emoji-core",
          raw.emoji === "frustrated" &&
            "dashboard-chat-floating-emoji-core--frustrated",
          raw.emoji === "party-popper" &&
            "dashboard-chat-floating-emoji-core--party-popper",
          raw.emoji === "smile" && "dashboard-chat-floating-emoji-core--smile",
          raw.emoji === "sparkles" &&
            "dashboard-chat-floating-emoji-core--sparkles",
          raw.emoji === "thumbs-up" &&
            "dashboard-chat-floating-emoji-core--thumbs-up",
        )}
      >
        <span
          className={cn(
            "dashboard-chat-floating-emoji-aura",
            raw.emoji === "frustrated" &&
              "dashboard-chat-floating-emoji-aura--frustrated",
            raw.emoji === "party-popper" &&
              "dashboard-chat-floating-emoji-aura--party-popper",
            raw.emoji === "smile" && "dashboard-chat-floating-emoji-aura--smile",
            raw.emoji === "sparkles" &&
              "dashboard-chat-floating-emoji-aura--sparkles",
            raw.emoji === "thumbs-up" &&
              "dashboard-chat-floating-emoji-aura--thumbs-up",
          )}
        />
        <span className="dashboard-chat-floating-emoji-glyph">
          {CLIENT_CHAT_FLOATING_EMOJI_GLYPH[raw.emoji]}
        </span>
      </span>
    </span>
  );
}
