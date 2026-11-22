import {
  DiscordEmbed,
  DiscordEmbedField,
  DiscordEmbedFields,
  DiscordEmbedFooter,
  DiscordMessage,
  DiscordMessages,
  DiscordMention,
} from "@skyra/discord-components-react";
import { DiscordAvatar } from "./DiscordAvatar";
import { createAvatarDataUrl } from "./avatar-data-url";
import type { ChatMessage } from "../lib/types";

type DiscordTranscriptProps = {
  messages: ChatMessage[];
};

function TranscriptAvatar({
  name,
  variant,
  imageUrl,
}: {
  name: string;
  variant?: string;
  imageUrl?: string;
}) {
  return (
    <span className="transcript-avatar">
      <DiscordAvatar name={name} variant={variant} imageUrl={imageUrl} size={40} />
    </span>
  );
}

function formatContent(message: ChatMessage) {
  if (!message.mention) {
    return message.content;
  }

  const parts = message.content.split(message.mention);
  if (parts.length === 1) {
    return (
      <>
        <DiscordMention>{message.mention}</DiscordMention>
        {" "}
        {message.content}
      </>
    );
  }

  return (
    <>
      {parts[0]}
      <DiscordMention>{message.mention}</DiscordMention>
      {parts.slice(1).join(message.mention)}
    </>
  );
}

export function DiscordTranscript({ messages }: DiscordTranscriptProps) {
  return (
    <div className="discord-transcript">
      <DiscordMessages className="discord-transcript__surface">
        {messages.map((message) => {
          if (message.role === "system") {
            return (
              <div key={message.id} className="typing-row">
                <TranscriptAvatar
                  name={message.author}
                  variant={message.avatarVariant}
                  imageUrl={message.avatarUrl}
                />
                <div className="typing-row__body">
                  <span className="typing-row__label">{message.content}</span>
                  <span className="typing-row__dots">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </div>
            );
          }

          return (
            <DiscordMessage
              key={message.id}
              author={message.author}
              bot={message.isBot}
              timestamp={message.timestamp}
              avatar={message.avatarUrl ?? createAvatarDataUrl(message.author, message.avatarVariant)}
            >
              {formatContent(message)}
              {message.embed ? (
                <DiscordEmbed
                  slot="embeds"
                  color={message.embed.accentColor ?? "#6f86ff"}
                  embedTitle={message.embed.title}
                >
                  {message.embed.description}
                  {message.embed.fields?.length ? (
                    <DiscordEmbedFields slot="fields">
                      {message.embed.fields.map((field) => (
                        <DiscordEmbedField
                          key={`${message.id}-${field.title}`}
                          fieldTitle={field.title}
                          inline={field.inline}
                        >
                          {field.value}
                        </DiscordEmbedField>
                      ))}
                    </DiscordEmbedFields>
                  ) : null}
                  {message.embed.footer ? (
                    <DiscordEmbedFooter slot="footer">
                      {message.embed.footer}
                    </DiscordEmbedFooter>
                  ) : null}
                </DiscordEmbed>
              ) : null}
            </DiscordMessage>
          );
        })}
      </DiscordMessages>
    </div>
  );
}
