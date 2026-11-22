import type { CSSProperties } from "react";

const FALLBACK_EMOJI_BY_CODEPOINT: Record<string, string> = {
  "1f389": "\u{1F389}",
  "1f44d": "\u{1F44D}",
  "1f62e": "\u{1F62E}",
  "1f914": "\u{1F914}",
};

export type AnimatedEmojiProps = {
  className?: string;
  codepoint: string;
  reducedMotion?: boolean;
  size?: number;
};

export function getEmojiGlyph(codepoint: string) {
  return FALLBACK_EMOJI_BY_CODEPOINT[codepoint] ?? "\u{1F642}";
}

export function AnimatedEmoji({
  className,
  codepoint,
  reducedMotion = false,
  size = 18,
}: AnimatedEmojiProps) {
  const glyph = getEmojiGlyph(codepoint);

  return (
    <span
      className={[
        "animated-emoji",
        "animated-emoji--fallback",
        reducedMotion ? "animated-emoji--static" : "animated-emoji--live",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--animated-emoji-size": `${size}px` } as CSSProperties}
      aria-hidden="true"
    >
      <span className="animated-emoji__glyph">{glyph}</span>
    </span>
  );
}
