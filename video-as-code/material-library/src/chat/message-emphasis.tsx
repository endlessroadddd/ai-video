import type { ReactNode } from "react";

export const MESSAGE_EMPHASIS_PATTERNS = [
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

export type MessageEmphasisTextProps = {
  as?: "div" | "p" | "span";
  className?: string;
  text: string;
};

export function getMessageEmphasisRanges(text: string) {
  const ranges: Array<{ end: number; start: number }> = [];

  MESSAGE_EMPHASIS_PATTERNS.forEach((pattern) => {
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

  const merged: Array<{ end: number; start: number }> = [];

  ranges.forEach((range) => {
    const previous = merged[merged.length - 1];

    if (!previous || range.start >= previous.end) {
      merged.push(range);
    }
  });

  return merged;
}

export function renderMessageText(text: string): ReactNode {
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
      <strong
        className="message-emphasis"
        key={`${range.start}-${range.end}-${index}`}
      >
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

export function MessageEmphasisText({
  as: Component = "p",
  className,
  text,
}: MessageEmphasisTextProps) {
  return <Component className={className}>{renderMessageText(text)}</Component>;
}
