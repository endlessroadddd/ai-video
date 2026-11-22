const MEME_ATTACHMENT_SEED = "LUCIUS_MEME_REPLY_SEED_V1";
const MEME_ATTACHMENTS_PER_SCENE = 4;

type MemeAttachableMessage = {
  id: string | number;
  author: string;
};

type MemeAttachmentFields = {
  attachmentImageSrc?: string;
  attachmentImageAlt?: string;
};

const memeModuleMap = import.meta.glob("./assets/memes/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const memeSources = Object.keys(memeModuleMap)
  .sort((left, right) => left.localeCompare(right))
  .map((path) => memeModuleMap[path]!);

if (memeSources.length < MEME_ATTACHMENTS_PER_SCENE) {
  throw new Error(
    `[meme] Missing images: expected at least ${MEME_ATTACHMENTS_PER_SCENE}, got ${memeSources.length}.`,
  );
}

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

export const memeImageCount = memeSources.length;
export const memeAttachmentCount = MEME_ATTACHMENTS_PER_SCENE;

export function attachMemeImagesToMessages<T extends MemeAttachableMessage>(
  messages: readonly T[],
): readonly (T & MemeAttachmentFields)[] {
  if (messages.length < MEME_ATTACHMENTS_PER_SCENE) {
    throw new Error(
      `[meme] Not enough candidate messages: expected at least ${MEME_ATTACHMENTS_PER_SCENE}, got ${messages.length}.`,
    );
  }

  const random = createRandom(hashString(MEME_ATTACHMENT_SEED));
  const candidateIndices = messages.map((_, index) => index);
  const selectedMessageIndices = shuffle(candidateIndices, random).slice(
    0,
    MEME_ATTACHMENTS_PER_SCENE,
  );
  const selectedMemeSources = shuffle(memeSources, random).slice(0, MEME_ATTACHMENTS_PER_SCENE);

  if (new Set(selectedMemeSources).size !== selectedMemeSources.length) {
    throw new Error("[meme] Meme selection contains duplicate image URLs.");
  }

  const assignmentByMessageIndex = new Map<number, string>();
  selectedMessageIndices.forEach((messageIndex, index) => {
    assignmentByMessageIndex.set(messageIndex, selectedMemeSources[index]!);
  });

  return messages.map((message, messageIndex) => {
    const memeSource = assignmentByMessageIndex.get(messageIndex);
    if (!memeSource) {
      return message;
    }

    return {
      ...message,
      attachmentImageSrc: memeSource,
      attachmentImageAlt: `${message.author} reaction meme`,
    };
  });
}
