import type { AssistTaskEventMessage } from '@/lib/services/agent-event-query'
import { m } from '@/paraglide/messages'

export type AssistTaskMessageMentionPlatform =
  | 'discord'
  | 'slack'
  | 'telegram'
  | 'feishu'

export type AssistTaskMessageSegment =
  | {
      kind: 'text'
      text: string
    }
  | {
      kind: 'mention'
      platform: AssistTaskMessageMentionPlatform
      rawText: string
      userId: string | null
      label: string
    }

type BuildAssistTaskMessageSegmentsPayload = {
  content: string
  platform: string
  eventUserId?: string | null
  eventUserDisplayName?: string | null
}

const DISCORD_OR_SLACK_MENTION_PATTERN = /<@!?([^>\s]+)>/g
const TELEGRAM_HTML_MENTION_PATTERN = /<a\s+href="tg:\/\/user\?id=([^"]+)">([\s\S]*?)<\/a>/g
const FEISHU_MENTION_PATTERN = /<at\s+user_id="([^"]+)">([\s\S]*?)<\/at>/g
const TELEGRAM_USERNAME_MENTION_PATTERN = /^(@[A-Za-z][A-Za-z0-9_]{4,31})(?=\s|$)/

/**
 * 统一归一化可空文本：
 * - 所有 mention 解析都依赖稳定的字符串比较；
 * - 这里把空字符串直接折叠成 `null`，避免后续重复 trim 判空。
 */
function normalizeNullableText(value: string | null | undefined): string | null {
  const normalizedValue = (value || '').trim()
  return normalizedValue || null
}

/**
 * 前端 mention 规则需要和服务端发送规则对齐：
 * - 详情页里只处理当前已支持“人工回复追加 @”的平台；
 * - 其他平台或未知值全部按纯文本回退，避免误伤正文内容。
 */
function normalizeMentionPlatform(
  rawPlatform: string,
): AssistTaskMessageMentionPlatform | null {
  const normalizedPlatform = rawPlatform.trim().toLowerCase()

  if (normalizedPlatform.includes('discord')) return 'discord'
  if (normalizedPlatform.includes('slack')) return 'slack'
  if (normalizedPlatform.includes('telegram')) return 'telegram'
  if (normalizedPlatform.includes('feishu') || normalizedPlatform.includes('lark')) {
    return 'feishu'
  }

  return null
}

/**
 * Telegram HTML mention / 飞书展示名里会携带实体转义：
 * - 前端不能直接把 `&lt;` / `&amp;` 原样露给用户；
 * - 这里只解最常见的命名实体与数字实体，足够覆盖当前 bot 发送链路。
 */
function decodeHtmlEntities(value: string): string {
  return value.replace(
    /&(#x?[0-9a-fA-F]+|amp|lt|gt|quot|#39);/g,
    (matchedEntity, entityBody: string) => {
      const normalizedEntityBody = entityBody.toLowerCase()

      if (normalizedEntityBody === 'amp') return '&'
      if (normalizedEntityBody === 'lt') return '<'
      if (normalizedEntityBody === 'gt') return '>'
      if (normalizedEntityBody === 'quot') return '"'
      if (normalizedEntityBody === '#39') return "'"

      if (normalizedEntityBody.startsWith('#x')) {
        const codePoint = Number.parseInt(normalizedEntityBody.slice(2), 16)
        return Number.isNaN(codePoint)
          ? matchedEntity
          : String.fromCodePoint(codePoint)
      }

      if (normalizedEntityBody.startsWith('#')) {
        const codePoint = Number.parseInt(normalizedEntityBody.slice(1), 10)
        return Number.isNaN(codePoint)
          ? matchedEntity
          : String.fromCodePoint(codePoint)
      }

      return matchedEntity
    },
  )
}

function pushTextSegment(
  segments: AssistTaskMessageSegment[],
  text: string,
  shouldDecodeHtmlEntities: boolean,
): void {
  if (!text) {
    return
  }

  segments.push({
    kind: 'text',
    text: shouldDecodeHtmlEntities ? decodeHtmlEntities(text) : text,
  })
}

function normalizeMentionLabel(rawLabel: string | null | undefined): string | null {
  const normalizedLabel = normalizeNullableText(rawLabel)
  if (!normalizedLabel) {
    return null
  }

  return normalizedLabel.replace(/^@+/, '') || null
}

/**
 * Discord / Slack 原始 mention 只保留 `<@id>`：
 * - 当 mention 的对象就是当前事件用户时，优先展示已解析出来的人类可读姓名；
 * - 其他情况仍然回退到 user_id，至少保证不会把协议标签暴露在界面上。
 */
function resolveDiscordOrSlackMentionLabel(payload: {
  mentionUserId: string
  eventUserId?: string | null
  eventUserDisplayName?: string | null
}): string {
  const normalizedMentionUserId = normalizeNullableText(payload.mentionUserId)
  const normalizedEventUserId = normalizeNullableText(payload.eventUserId)
  const normalizedEventUserDisplayName = normalizeMentionLabel(
    payload.eventUserDisplayName,
  )

  if (
    normalizedMentionUserId &&
    normalizedEventUserId &&
    normalizedMentionUserId === normalizedEventUserId &&
    normalizedEventUserDisplayName
  ) {
    return `@${normalizedEventUserDisplayName}`
  }

  if (normalizedMentionUserId) {
    return `@${normalizedMentionUserId}`
  }

  return `@${m.common_unknown_user()}`
}

function buildMentionSegmentsByPattern(payload: {
  content: string
  pattern: RegExp
  shouldDecodeHtmlEntitiesInText?: boolean
  buildMentionSegment: (match: RegExpExecArray) => AssistTaskMessageSegment
}): AssistTaskMessageSegment[] {
  const segments: AssistTaskMessageSegment[] = []
  let lastMatchEndIndex = 0

  payload.pattern.lastIndex = 0

  for (const matchedResult of payload.content.matchAll(payload.pattern)) {
    const matchIndex = matchedResult.index ?? 0
    pushTextSegment(
      segments,
      payload.content.slice(lastMatchEndIndex, matchIndex),
      Boolean(payload.shouldDecodeHtmlEntitiesInText),
    )
    segments.push(payload.buildMentionSegment(matchedResult))
    lastMatchEndIndex = matchIndex + matchedResult[0].length
  }

  pushTextSegment(
    segments,
    payload.content.slice(lastMatchEndIndex),
    Boolean(payload.shouldDecodeHtmlEntitiesInText),
  )

  return segments.length > 0
    ? segments
    : [
        {
          kind: 'text',
          text: payload.shouldDecodeHtmlEntitiesInText
            ? decodeHtmlEntities(payload.content)
            : payload.content,
        },
      ]
}

/**
 * 把消息正文拆成“纯文本 + mention 芯片”片段：
 * - 解析规则严格镜像当前服务端发送策略；
 * - 只做展示语义变换，不修改原始消息内容，方便后续继续复用到别的消息视图。
 */
export function buildAssistTaskMessageSegments(
  payload: BuildAssistTaskMessageSegmentsPayload,
): AssistTaskMessageSegment[] {
  const normalizedPlatform = normalizeMentionPlatform(payload.platform)

  if (!normalizedPlatform) {
    return [{ kind: 'text', text: payload.content }]
  }

  if (normalizedPlatform === 'discord' || normalizedPlatform === 'slack') {
    return buildMentionSegmentsByPattern({
      content: payload.content,
      pattern: DISCORD_OR_SLACK_MENTION_PATTERN,
      buildMentionSegment: (matchedResult) => ({
        kind: 'mention',
        platform: normalizedPlatform,
        rawText: matchedResult[0],
        userId: normalizeNullableText(matchedResult[1]),
        label: resolveDiscordOrSlackMentionLabel({
          mentionUserId: matchedResult[1],
          eventUserId: payload.eventUserId,
          eventUserDisplayName: payload.eventUserDisplayName,
        }),
      }),
    })
  }

  if (normalizedPlatform === 'telegram') {
    if (payload.content.includes('tg://user?id=')) {
      return buildMentionSegmentsByPattern({
        content: payload.content,
        pattern: TELEGRAM_HTML_MENTION_PATTERN,
        shouldDecodeHtmlEntitiesInText: true,
        buildMentionSegment: (matchedResult) => ({
          kind: 'mention',
          platform: normalizedPlatform,
          rawText: matchedResult[0],
          userId: normalizeNullableText(matchedResult[1]),
          label: `@${normalizeMentionLabel(decodeHtmlEntities(matchedResult[2])) || m.common_unknown_user()}`,
        }),
      })
    }

    const usernameMentionMatch =
      payload.content.match(TELEGRAM_USERNAME_MENTION_PATTERN)

    if (usernameMentionMatch) {
      const mentionText = usernameMentionMatch[1]
      const remainingText = payload.content.slice(mentionText.length)

      return [
        {
          kind: 'mention',
          platform: normalizedPlatform,
          rawText: mentionText,
          userId: normalizeMentionLabel(mentionText),
          label: mentionText,
        },
        ...(remainingText
          ? [
              {
                kind: 'text' as const,
                text: remainingText,
              },
            ]
          : []),
      ]
    }

    return [{ kind: 'text', text: payload.content }]
  }

  return buildMentionSegmentsByPattern({
    content: payload.content,
    pattern: FEISHU_MENTION_PATTERN,
    buildMentionSegment: (matchedResult) => ({
      kind: 'mention',
      platform: normalizedPlatform,
      rawText: matchedResult[0],
      userId: normalizeNullableText(matchedResult[1]),
      label: `@${normalizeMentionLabel(decodeHtmlEntities(matchedResult[2])) || m.common_unknown_user()}`,
    }),
  })
}

/**
 * 详情页里 Discord / Slack mention 只有 `<@id>`，需要一个稳定的人名兜底：
 * - 优先取同一事件里第一条外部用户消息的作者名；
 * - 如果作者名本身也只是 user_id，则继续回退到该值，不强行猜测。
 */
export function resolveAssistTaskEventMentionDisplayName(payload: {
  messages: AssistTaskEventMessage[]
  eventUserId?: string | null
}): string | null {
  const normalizedEventUserId = normalizeNullableText(payload.eventUserId)
  if (!normalizedEventUserId) {
    return null
  }

  const externalUserMessages = payload.messages.filter(
    (message) => message.role === 'user',
  )

  const humanReadableAuthor = externalUserMessages.find((message) => {
    const normalizedAuthorName = normalizeNullableText(message.authorName)
    return Boolean(
      normalizedAuthorName && normalizedAuthorName !== normalizedEventUserId,
    )
  })

  return (
    normalizeNullableText(humanReadableAuthor?.authorName) ||
    normalizeNullableText(externalUserMessages[0]?.authorName)
  )
}
