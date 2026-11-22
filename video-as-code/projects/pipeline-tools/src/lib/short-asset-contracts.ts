export const SOUND_MODES = [
  "silent-first",
  "voiceover-led",
  "caption-supported",
] as const;

export const HOOK_TYPES = [
  "pain-resonance",
  "contrast",
  "proof",
  "before-after",
  "feature-hit",
] as const;

export const BRAND_ROLES = [
  "none",
  "light-tag",
  "closing-tag",
  "full-brand",
] as const;

export const PLATFORM_SURFACES = [
  "community-chat",
  "product-ui",
  "split-surface",
  "mixed",
] as const;

export const MATCH_TYPES = [
  "asset-match",
  "template-match",
  "fresh-design",
] as const;

type SoundMode = (typeof SOUND_MODES)[number];
type HookType = (typeof HOOK_TYPES)[number];
type BrandRole = (typeof BRAND_ROLES)[number];
type PlatformSurface = (typeof PLATFORM_SURFACES)[number];
type MatchType = (typeof MATCH_TYPES)[number];

export interface ShortAssetMetadata {
  durationTarget: number;
  aspectRatio: string;
  soundMode: SoundMode;
  singleTakeaway: string;
  hookType: HookType;
  brandRole: BrandRole;
  platformSurface: PlatformSurface;
  proofShot: string;
}

export interface ShortAssetBrief {
  singleTakeaway: string;
  tension: string[];
  proof: string[];
  audience: string[];
  nonGoals: string[];
}

export interface BeatboardBeat {
  beatId: string;
  purpose: string;
  visualState: string[];
  motionCue: string[];
  copyLine: string;
  durationHint: string;
  proofBinding: string[];
  matchType: MatchType;
  assetBindingIds: string[];
  templateBindingIds: string[];
  fallbackImplementation: string[];
}

export interface BeatboardDocument {
  assetSlug: string;
  sequenceGoal: string;
  durationTarget: number;
  aspectRatio: string;
  soundMode: SoundMode;
  brandRole: BrandRole;
  beats: BeatboardBeat[];
}

function assertRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be a JSON object`);
  }
  return value as Record<string, unknown>;
}

function assertString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

function assertStringArray(value: unknown, label: string, allowEmpty = false): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.trim().length === 0)) {
    throw new Error(`${label} must be an array of non-empty strings`);
  }

  if (!allowEmpty && value.length === 0) {
    throw new Error(`${label} must not be empty`);
  }

  return value as string[];
}

function assertEnumValue<T extends readonly string[]>(
  value: unknown,
  label: string,
  allowedValues: T,
): T[number] {
  const stringValue = assertString(value, label);
  if (!allowedValues.includes(stringValue)) {
    throw new Error(`${label} must be one of: ${allowedValues.join(", ")}`);
  }
  return stringValue as T[number];
}

function assertDurationTarget(value: unknown, label: string): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`${label} must be a number`);
  }
  if (value < 6 || value > 10) {
    throw new Error(`${label} must stay within the short-lane 6-10 second range`);
  }
  return value;
}

function assertAspectRatio(value: unknown, label: string): string {
  const aspectRatio = assertString(value, label);
  if (!["9:16", "1:1", "16:9"].includes(aspectRatio)) {
    throw new Error(`${label} must be one of: 9:16, 1:1, 16:9`);
  }
  return aspectRatio;
}

export function validateShortAssetMetadata(value: unknown, label = "asset-metadata.json"): ShortAssetMetadata {
  const record = assertRecord(value, label);
  return {
    durationTarget: assertDurationTarget(record.durationTarget, `${label}.durationTarget`),
    aspectRatio: assertAspectRatio(record.aspectRatio, `${label}.aspectRatio`),
    soundMode: assertEnumValue(record.soundMode, `${label}.soundMode`, SOUND_MODES),
    singleTakeaway: assertString(record.singleTakeaway, `${label}.singleTakeaway`),
    hookType: assertEnumValue(record.hookType, `${label}.hookType`, HOOK_TYPES),
    brandRole: assertEnumValue(record.brandRole, `${label}.brandRole`, BRAND_ROLES),
    platformSurface: assertEnumValue(
      record.platformSurface,
      `${label}.platformSurface`,
      PLATFORM_SURFACES,
    ),
    proofShot: assertString(record.proofShot, `${label}.proofShot`),
  };
}

export function validateShortAssetBrief(value: unknown, label = "asset-brief.json"): ShortAssetBrief {
  const record = assertRecord(value, label);
  return {
    singleTakeaway: assertString(record.singleTakeaway, `${label}.singleTakeaway`),
    tension: assertStringArray(record.tension, `${label}.tension`),
    proof: assertStringArray(record.proof, `${label}.proof`),
    audience: assertStringArray(record.audience, `${label}.audience`),
    nonGoals: assertStringArray(record.nonGoals, `${label}.nonGoals`),
  };
}

function validateBeat(value: unknown, index: number, label: string): BeatboardBeat {
  const record = assertRecord(value, `${label}.beats[${index}]`);
  return {
    beatId: assertString(record.beatId, `${label}.beats[${index}].beatId`),
    purpose: assertString(record.purpose, `${label}.beats[${index}].purpose`),
    visualState: assertStringArray(record.visualState, `${label}.beats[${index}].visualState`),
    motionCue: assertStringArray(record.motionCue, `${label}.beats[${index}].motionCue`),
    copyLine: assertString(record.copyLine, `${label}.beats[${index}].copyLine`),
    durationHint: assertString(record.durationHint, `${label}.beats[${index}].durationHint`),
    proofBinding: assertStringArray(record.proofBinding, `${label}.beats[${index}].proofBinding`),
    matchType: assertEnumValue(record.matchType, `${label}.beats[${index}].matchType`, MATCH_TYPES),
    assetBindingIds: assertStringArray(
      record.assetBindingIds,
      `${label}.beats[${index}].assetBindingIds`,
      true,
    ),
    templateBindingIds: assertStringArray(
      record.templateBindingIds,
      `${label}.beats[${index}].templateBindingIds`,
      true,
    ),
    fallbackImplementation: assertStringArray(
      record.fallbackImplementation,
      `${label}.beats[${index}].fallbackImplementation`,
    ),
  };
}

export function validateBeatboardDocument(value: unknown, label = "beatboard.json"): BeatboardDocument {
  const record = assertRecord(value, label);
  const beats = Array.isArray(record.beats)
    ? record.beats.map((beat, index) => validateBeat(beat, index, label))
    : null;

  if (!beats) {
    throw new Error(`${label}.beats must be an array`);
  }

  if (beats.length < 2 || beats.length > 4) {
    throw new Error(`${label}.beats must contain 2-4 beats for the short lane`);
  }

  return {
    assetSlug: assertString(record.assetSlug, `${label}.assetSlug`),
    sequenceGoal: assertString(record.sequenceGoal, `${label}.sequenceGoal`),
    durationTarget: assertDurationTarget(record.durationTarget, `${label}.durationTarget`),
    aspectRatio: assertAspectRatio(record.aspectRatio, `${label}.aspectRatio`),
    soundMode: assertEnumValue(record.soundMode, `${label}.soundMode`, SOUND_MODES),
    brandRole: assertEnumValue(record.brandRole, `${label}.brandRole`, BRAND_ROLES),
    beats,
  };
}
