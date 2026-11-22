import pleadingFaceSrc from "./assets/animated-emoji/pleading-face.webp";
import relaxedSrc from "./assets/animated-emoji/relaxed.webp";
import sparklingHeartSrc from "./assets/animated-emoji/sparkling-heart.webp";
import starStruckSrc from "./assets/animated-emoji/star-struck.webp";
import twoHeartsSrc from "./assets/animated-emoji/two-hearts.webp";

export type AnimatedEmojiId =
  | "relaxed"
  | "pleading-face"
  | "sparkling-heart"
  | "star-struck"
  | "two-hearts";

export type AnimatedEmojiAsset = {
  src: string;
  alt: string;
};

const animatedEmojiMap: Record<AnimatedEmojiId, AnimatedEmojiAsset> = {
  relaxed: {
    src: relaxedSrc,
    alt: "animated relaxed face",
  },
  "pleading-face": {
    src: pleadingFaceSrc,
    alt: "animated pleading face",
  },
  "sparkling-heart": {
    src: sparklingHeartSrc,
    alt: "animated sparkling heart",
  },
  "star-struck": {
    src: starStruckSrc,
    alt: "animated star-struck face",
  },
  "two-hearts": {
    src: twoHeartsSrc,
    alt: "animated two hearts",
  },
};

export function getAnimatedEmojiAsset(id: AnimatedEmojiId): AnimatedEmojiAsset {
  return animatedEmojiMap[id];
}

export const animatedEmojiIds = Object.keys(animatedEmojiMap) as AnimatedEmojiId[];
