import { Fragment } from "react";

export type AssistTaskMessageMentionPlatform =
  | "discord"
  | "feishu"
  | "slack"
  | "telegram";

export type AssistTaskMessageSegment =
  | {
      kind: "text";
      text: string;
    }
  | {
      kind: "mention";
      label: string;
      platform: AssistTaskMessageMentionPlatform;
      rawText: string;
      userId: string | null;
    };

type AssistTaskMessageRichTextProps = {
  className?: string;
  content: string;
  eventUserDisplayName?: string | null;
  eventUserId?: string | null;
  platform: string;
};

type BuildAssistTaskMessageSegmentsPayload = {
  content: string;
  eventUserDisplayName?: string | null;
  eventUserId?: string | null;
  platform: string;
};

const DISCORD_OR_SLACK_MENTION_PATTERN = /<@!?([^>\s]+)>/g;
const TELEGRAM_HTML_MENTION_PATTERN =
  /<a\s+href="tg:\/\/user\?id=([^"]+)">([\s\S]*?)<\/a>/g;
const FEISHU_MENTION_PATTERN = /<at\s+user_id="([^"]+)">([\s\S]*?)<\/at>/g;
const TELEGRAM_USERNAME_MENTION_PATTERN = /^(@[A-Za-z][A-Za-z0-9_]{4,31})(?=\s|$)/;

function normalizeNullableText(value: string | null | undefined): string | null {
  const normalizedValue = (value ?? "").trim();
  return normalizedValue || null;
}

function normalizeMentionPlatform(
  rawPlatform: string,
): AssistTaskMessageMentionPlatform | null {
  const normalizedPlatform = rawPlatform.trim().toLowerCase();

  if (normalizedPlatform.includes("discord")) return "discord";
  if (normalizedPlatform.includes("slack")) return "slack";
  if (normalizedPlatform.includes("telegram")) return "telegram";
  if (
    normalizedPlatform.includes("feishu") ||
    normalizedPlatform.includes("lark")
  ) {
    return "feishu";
  }

  return null;
}

function decodeHtmlEntities(value: string): string {
  return value.replace(
    /&(#x?[0-9a-fA-F]+|amp|lt|gt|quot|#39);/g,
    (matchedEntity, entityBody: string) => {
      const normalizedEntityBody = entityBody.toLowerCase();

      if (normalizedEntityBody === "amp") return "&";
      if (normalizedEntityBody === "lt") return "<";
      if (normalizedEntityBody === "gt") return ">";
      if (normalizedEntityBody === "quot") return "\"";
      if (normalizedEntityBody === "#39") return "'";

      if (normalizedEntityBody.startsWith("#x")) {
        const codePoint = Number.parseInt(normalizedEntityBody.slice(2), 16);
        return Number.isNaN(codePoint)
          ? matchedEntity
          : String.fromCodePoint(codePoint);
      }

      if (normalizedEntityBody.startsWith("#")) {
        const codePoint = Number.parseInt(normalizedEntityBody.slice(1), 10);
        return Number.isNaN(codePoint)
          ? matchedEntity
          : String.fromCodePoint(codePoint);
      }

      return matchedEntity;
    },
  );
}

function normalizeMentionLabel(
  rawLabel: string | null | undefined,
): string | null {
  const normalizedLabel = normalizeNullableText(rawLabel);
  if (!normalizedLabel) {
    return null;
  }

  return normalizedLabel.replace(/^@+/, "") || null;
}

function resolveDiscordOrSlackMentionLabel(payload: {
  eventUserDisplayName?: string | null;
  eventUserId?: string | null;
  mentionUserId: string;
}): string {
  const normalizedMentionUserId = normalizeNullableText(payload.mentionUserId);
  const normalizedEventUserId = normalizeNullableText(payload.eventUserId);
  const normalizedEventUserDisplayName = normalizeMentionLabel(
    payload.eventUserDisplayName,
  );

  if (
    normalizedMentionUserId &&
    normalizedEventUserId &&
    normalizedMentionUserId === normalizedEventUserId &&
    normalizedEventUserDisplayName
  ) {
    return `@${normalizedEventUserDisplayName}`;
  }

  if (normalizedMentionUserId) {
    return `@${normalizedMentionUserId}`;
  }

  return "@unknown-user";
}

function pushTextSegment(
  segments: AssistTaskMessageSegment[],
  text: string,
  shouldDecodeHtmlEntities: boolean,
): void {
  if (!text) {
    return;
  }

  segments.push({
    kind: "text",
    text: shouldDecodeHtmlEntities ? decodeHtmlEntities(text) : text,
  });
}

function buildMentionSegmentsByPattern(payload: {
  buildMentionSegment: (match: RegExpExecArray) => AssistTaskMessageSegment;
  content: string;
  pattern: RegExp;
  shouldDecodeHtmlEntitiesInText?: boolean;
}): AssistTaskMessageSegment[] {
  const segments: AssistTaskMessageSegment[] = [];
  let lastMatchEndIndex = 0;

  payload.pattern.lastIndex = 0;

  for (const matchedResult of payload.content.matchAll(payload.pattern)) {
    const matchIndex = matchedResult.index ?? 0;
    pushTextSegment(
      segments,
      payload.content.slice(lastMatchEndIndex, matchIndex),
      Boolean(payload.shouldDecodeHtmlEntitiesInText),
    );
    segments.push(payload.buildMentionSegment(matchedResult));
    lastMatchEndIndex = matchIndex + matchedResult[0].length;
  }

  pushTextSegment(
    segments,
    payload.content.slice(lastMatchEndIndex),
    Boolean(payload.shouldDecodeHtmlEntitiesInText),
  );

  return segments.length > 0
    ? segments
    : [{ kind: "text", text: payload.content }];
}

export function buildAssistTaskMessageSegments(
  payload: BuildAssistTaskMessageSegmentsPayload,
): AssistTaskMessageSegment[] {
  const normalizedPlatform = normalizeMentionPlatform(payload.platform);

  if (!normalizedPlatform) {
    return [{ kind: "text", text: payload.content }];
  }

  if (
    normalizedPlatform === "discord" ||
    normalizedPlatform === "slack"
  ) {
    return buildMentionSegmentsByPattern({
      buildMentionSegment: (matchedResult) => ({
        kind: "mention",
        label: resolveDiscordOrSlackMentionLabel({
          eventUserDisplayName: payload.eventUserDisplayName,
          eventUserId: payload.eventUserId,
          mentionUserId: matchedResult[1],
        }),
        platform: normalizedPlatform,
        rawText: matchedResult[0],
        userId: normalizeNullableText(matchedResult[1]),
      }),
      content: payload.content,
      pattern: DISCORD_OR_SLACK_MENTION_PATTERN,
    });
  }

  if (normalizedPlatform === "telegram") {
    if (payload.content.includes("tg://user?id=")) {
      return buildMentionSegmentsByPattern({
        buildMentionSegment: (matchedResult) => ({
          kind: "mention",
          label: `@${
            normalizeMentionLabel(decodeHtmlEntities(matchedResult[2])) ??
            "unknown-user"
          }`,
          platform: normalizedPlatform,
          rawText: matchedResult[0],
          userId: normalizeNullableText(matchedResult[1]),
        }),
        content: payload.content,
        pattern: TELEGRAM_HTML_MENTION_PATTERN,
        shouldDecodeHtmlEntitiesInText: true,
      });
    }

    const usernameMentionMatch = payload.content.match(
      TELEGRAM_USERNAME_MENTION_PATTERN,
    );

    if (usernameMentionMatch) {
      const mentionText = usernameMentionMatch[1];
      const remainingText = payload.content.slice(mentionText.length);

      return [
        {
          kind: "mention",
          label: mentionText,
          platform: normalizedPlatform,
          rawText: mentionText,
          userId: normalizeMentionLabel(mentionText),
        },
        ...(remainingText
          ? [{ kind: "text" as const, text: remainingText }]
          : []),
      ];
    }

    return [{ kind: "text", text: payload.content }];
  }

  return buildMentionSegmentsByPattern({
    buildMentionSegment: (matchedResult) => ({
      kind: "mention",
      label: `@${
        normalizeMentionLabel(decodeHtmlEntities(matchedResult[2])) ??
        "unknown-user"
      }`,
      platform: normalizedPlatform,
      rawText: matchedResult[0],
      userId: normalizeNullableText(matchedResult[1]),
    }),
    content: payload.content,
    pattern: FEISHU_MENTION_PATTERN,
  });
}

function getMentionStyle(
  platform: AssistTaskMessageMentionPlatform,
): Record<string, string> {
  switch (platform) {
    case "discord":
      return {
        background: "rgba(88, 101, 242, 0.12)",
        color: "#5865F2",
      };
    case "slack":
      return {
        background: "rgba(74, 21, 75, 0.12)",
        color: "#7C3AED",
      };
    case "telegram":
      return {
        background: "rgba(34, 158, 217, 0.12)",
        color: "#229ED9",
      };
    case "feishu":
    default:
      return {
        background: "rgba(51, 112, 255, 0.12)",
        color: "#3370FF",
      };
  }
}

export function AssistTaskMessageRichText(
  props: AssistTaskMessageRichTextProps,
) {
  const segments = buildAssistTaskMessageSegments({
    content: props.content,
    eventUserDisplayName: props.eventUserDisplayName,
    eventUserId: props.eventUserId,
    platform: props.platform,
  });

  return (
    <p
      className={props.className}
      style={{
        margin: 0,
        color: "#1E293B",
        fontSize: "14px",
        lineHeight: 1.65,
      }}
    >
      {segments.map((segment, index) => {
        if (segment.kind === "text") {
          return <Fragment key={`text-${index}`}>{segment.text}</Fragment>;
        }

        const mentionStyle = getMentionStyle(segment.platform);
        return (
          <span
            key={`mention-${segment.platform}-${index}`}
            title={segment.rawText}
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginInline: "0.15em",
              padding: "0.18em 0.48em",
              borderRadius: "999px",
              background: mentionStyle.background,
              color: mentionStyle.color,
              fontSize: "0.92em",
              fontWeight: 600,
              lineHeight: 1.3,
              verticalAlign: "baseline",
            }}
          >
            {segment.label}
          </span>
        );
      })}
    </p>
  );
}
