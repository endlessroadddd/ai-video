import generatedAiAvatarSrc from "../../assets/generated-ai-avatar.png";
import generatedMainCustomerAvatarSrc from "../../assets/generated-main-customer-avatar.png";
import type { AvatarSourceMap } from "./avatar-types";

const FIXED_AVATAR_SEED = "LUCIUS_LANGUAGE_RICHNESS_AVATAR_SEED_V1";

const FIXED_AVATAR_IDENTITIES = [
  "president",
  "caseyops",
  "morganops",
  "ninagrowth",
  "devreljay",
  "lenamod",
  "samuser",
  "supportlead",
  "productava",
  "opsrin",
  "foundermia",
  "kevinhost",
  "ameliapm",
  "owenadmin",
] as const;

const customAvatarSourceMap: AvatarSourceMap = {
  lucius: generatedAiAvatarSrc,
  luci: generatedAiAvatarSrc,
  luciusai: generatedAiAvatarSrc,
  luciaiassistant: generatedAiAvatarSrc,
  samuser: generatedMainCustomerAvatarSrc,
};

const avatarModuleMap = import.meta.glob("../../assets/anime-avatars/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function hashString(value: string): number {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let result = state;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex]!, shuffled[index]!];
  }
  return shuffled;
}

export function normalizeAvatarName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const avatarImagePaths = Object.keys(avatarModuleMap).sort((left, right) =>
  left.localeCompare(right),
);

const allAvatarImageSources = avatarImagePaths.map((path) => avatarModuleMap[path]!);

if (allAvatarImageSources.length < FIXED_AVATAR_IDENTITIES.length) {
  throw new Error(
    `[avatar] Missing images: expected at least ${FIXED_AVATAR_IDENTITIES.length}, got ${allAvatarImageSources.length}.`,
  );
}

const seededRandom = createRandom(hashString(FIXED_AVATAR_SEED));
const shuffledAvatarImageSources = shuffle(allAvatarImageSources, seededRandom);
const selectedAvatarImageSources = shuffledAvatarImageSources.slice(
  0,
  FIXED_AVATAR_IDENTITIES.length,
);

const fixedAvatarSourceMap: AvatarSourceMap = {};
FIXED_AVATAR_IDENTITIES.forEach((identity, index) => {
  fixedAvatarSourceMap[identity] = selectedAvatarImageSources[index]!;
});

const avatarSourceMap: AvatarSourceMap = {
  ...fixedAvatarSourceMap,
  ...customAvatarSourceMap,
};

export const avatarIdentityNames = Object.keys(avatarSourceMap);
export const avatarImageCount = allAvatarImageSources.length + 2;
export const mappedAvatarCount = avatarIdentityNames.length;
export const mappedAvatarUniqueImageCount = new Set(Object.values(avatarSourceMap)).size;

export function getAvatarImageMap(): AvatarSourceMap {
  return { ...avatarSourceMap };
}

export function getAvatarImageSource(name: string): string {
  const normalizedName = normalizeAvatarName(name);
  const fixedSource = avatarSourceMap[normalizedName];
  if (fixedSource) {
    return fixedSource;
  }

  const fallbackKey = normalizedName || "user";
  const fallbackIndex = hashString(fallbackKey) % selectedAvatarImageSources.length;
  return selectedAvatarImageSources[fallbackIndex]!;
}
