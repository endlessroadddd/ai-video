import type { ReactNode } from "react";

import { DiscordAvatar } from "./discord-avatar";
import { ReactionBadge } from "./reaction-badge";
import type { DiscordMessageCardProps } from "./discord-scene-types";

function normalizeBody(body: ReactNode): ReactNode {
  if (typeof body !== "string") {
    return body;
  }

  return body
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={`${part}-${index}`}>{part}</span>
      ),
    );
}

export function DiscordMessageCard(props: Readonly<DiscordMessageCardProps>) {
  const {
    author,
    avatarImageUrl,
    avatarVariant,
    body,
    className,
    emphasis = "default",
    meta,
    metaBadge,
    reactions,
  } = props;

  return (
    <div className={["discord-message-card__row", className].filter(Boolean).join(" ")}>
      <DiscordAvatar
        name={author}
        size={42}
        imageUrl={avatarImageUrl}
        variant={avatarVariant}
      />
      <article
        className={[
          "discord-message-card",
          `discord-message-card--${emphasis}`,
          reactions?.length ? "discord-message-card--with-reactions" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="discord-message-card__meta">
          <strong>{author}</strong>
          <span>{meta}</span>
          {metaBadge ? <em>{metaBadge}</em> : null}
        </div>
        <div className="discord-message-card__text">{normalizeBody(body)}</div>
        {reactions?.length ? (
          <div className="discord-message-card__reactions">
            {reactions.map((reaction, index) => (
              <ReactionBadge
                key={`${author}-${reaction.emoji}-${reaction.count}-${index}`}
                {...reaction}
              />
            ))}
          </div>
        ) : null}
      </article>
    </div>
  );
}
