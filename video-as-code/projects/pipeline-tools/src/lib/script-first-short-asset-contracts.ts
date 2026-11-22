export const SCRIPT_FIRST_ASPECT_RATIOS = ["16:9", "9:16", "1:1"] as const;

export interface BrandConstraints {
  colorRoles: string[];
  typeRoles: string[];
  radiusRules: string[];
  backgroundRules: string[];
  graphicLanguage: string[];
  motionTone: string[];
  prohibitedPatterns: string[];
}

export interface BaseMotionConstraints {
  onePrimaryMotionPerScreen: true;
  lessIsMore: true;
  minimalCopy: true;
  noTextOverlap: true;
  singleProofPath: true;
  quietlyConfidentMotion: true;
}

export interface PersistentConstraints {
  brandConstraints: BrandConstraints;
  baseMotionConstraints: BaseMotionConstraints;
}

export interface ScriptOutlineScreen {
  screenId: string;
  purpose: string;
  uiSurface: string;
  layoutSnapshot: string;
  background: string;
  keyElements: string[];
  primaryMotion: string;
  copyHint: string;
  durationHint: string;
}

export interface ScriptOutline {
  assetSlug: string;
  singleTakeaway: string;
  hook: string;
  screens: ScriptOutlineScreen[];
  persistentConstraints: PersistentConstraints;
  nonGoals: string[];
}

export interface CompletePlanStyleMapping {
  colorRoles: string[];
  typeRoles: string[];
  radiusRules: string[];
  spacingRules: string[];
  backgroundRules: string[];
  motionRules: string[];
  prohibitedPatterns: string[];
}

export interface CompletePlanScreen {
  screenId: string;
  goal: string;
  uiSurface: string;
  layout: string[];
  background: string[];
  copy: string[];
  primaryMotion: string;
  motionSequence: string[];
  proofElement: string[];
  requiredAssets: string[];
  timingHint: string;
}

export interface CompletePlan {
  assetSlug: string;
  aspectRatio: (typeof SCRIPT_FIRST_ASPECT_RATIOS)[number];
  durationTarget: number;
  persistentConstraints: PersistentConstraints;
  styleMapping: CompletePlanStyleMapping;
  screens: CompletePlanScreen[];
  implementationNotes: string[];
  acceptanceChecks: string[];
}

export interface MaterialNeedItem {
  id: string;
  type: string;
  description: string;
  whyNeeded: string;
  usedInScreen: string;
  requiredBeforeBuild: boolean;
}

export interface MaterialNeeds {
  persistentConstraints: PersistentConstraints;
  alreadyInRepo: string[];
  requiredFromUser: MaterialNeedItem[];
  optionalEnhancements: string[];
  uiReferences: string[];
  copyDependencies: string[];
  blockers: string[];
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

function assertBooleanTrue(value: unknown, label: string): true {
  if (value !== true) {
    throw new Error(`${label} must be true`);
  }
  return true;
}

function assertAspectRatio(value: unknown, label: string): (typeof SCRIPT_FIRST_ASPECT_RATIOS)[number] {
  const aspectRatio = assertString(value, label);
  if (!SCRIPT_FIRST_ASPECT_RATIOS.includes(aspectRatio as (typeof SCRIPT_FIRST_ASPECT_RATIOS)[number])) {
    throw new Error(`${label} must be one of: ${SCRIPT_FIRST_ASPECT_RATIOS.join(", ")}`);
  }
  return aspectRatio as (typeof SCRIPT_FIRST_ASPECT_RATIOS)[number];
}

function assertDurationTarget(value: unknown, label: string): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`${label} must be a number`);
  }
  if (value < 6 || value > 10) {
    throw new Error(`${label} must stay within the short-asset 6-10 second range`);
  }
  return value;
}

function validateBrandConstraints(value: unknown, label: string): BrandConstraints {
  const record = assertRecord(value, label);
  return {
    colorRoles: assertStringArray(record.colorRoles, `${label}.colorRoles`),
    typeRoles: assertStringArray(record.typeRoles, `${label}.typeRoles`),
    radiusRules: assertStringArray(record.radiusRules, `${label}.radiusRules`),
    backgroundRules: assertStringArray(record.backgroundRules, `${label}.backgroundRules`),
    graphicLanguage: assertStringArray(record.graphicLanguage, `${label}.graphicLanguage`),
    motionTone: assertStringArray(record.motionTone, `${label}.motionTone`),
    prohibitedPatterns: assertStringArray(record.prohibitedPatterns, `${label}.prohibitedPatterns`),
  };
}

function validateBaseMotionConstraints(value: unknown, label: string): BaseMotionConstraints {
  const record = assertRecord(value, label);
  return {
    onePrimaryMotionPerScreen: assertBooleanTrue(
      record.onePrimaryMotionPerScreen,
      `${label}.onePrimaryMotionPerScreen`,
    ),
    lessIsMore: assertBooleanTrue(record.lessIsMore, `${label}.lessIsMore`),
    minimalCopy: assertBooleanTrue(record.minimalCopy, `${label}.minimalCopy`),
    noTextOverlap: assertBooleanTrue(record.noTextOverlap, `${label}.noTextOverlap`),
    singleProofPath: assertBooleanTrue(record.singleProofPath, `${label}.singleProofPath`),
    quietlyConfidentMotion: assertBooleanTrue(
      record.quietlyConfidentMotion,
      `${label}.quietlyConfidentMotion`,
    ),
  };
}

export function validatePersistentConstraints(
  value: unknown,
  label = "persistentConstraints",
): PersistentConstraints {
  const record = assertRecord(value, label);
  return {
    brandConstraints: validateBrandConstraints(record.brandConstraints, `${label}.brandConstraints`),
    baseMotionConstraints: validateBaseMotionConstraints(
      record.baseMotionConstraints,
      `${label}.baseMotionConstraints`,
    ),
  };
}

function validateScriptOutlineScreen(value: unknown, index: number, label: string): ScriptOutlineScreen {
  const record = assertRecord(value, `${label}.screens[${index}]`);
  return {
    screenId: assertString(record.screenId, `${label}.screens[${index}].screenId`),
    purpose: assertString(record.purpose, `${label}.screens[${index}].purpose`),
    uiSurface: assertString(record.uiSurface, `${label}.screens[${index}].uiSurface`),
    layoutSnapshot: assertString(record.layoutSnapshot, `${label}.screens[${index}].layoutSnapshot`),
    background: assertString(record.background, `${label}.screens[${index}].background`),
    keyElements: assertStringArray(record.keyElements, `${label}.screens[${index}].keyElements`),
    primaryMotion: assertString(record.primaryMotion, `${label}.screens[${index}].primaryMotion`),
    copyHint: assertString(record.copyHint, `${label}.screens[${index}].copyHint`),
    durationHint: assertString(record.durationHint, `${label}.screens[${index}].durationHint`),
  };
}

export function validateScriptOutline(value: unknown, label = "script-outline.json"): ScriptOutline {
  const record = assertRecord(value, label);
  const screens = Array.isArray(record.screens)
    ? record.screens.map((screen, index) => validateScriptOutlineScreen(screen, index, label))
    : null;
  if (!screens || screens.length === 0) {
    throw new Error(`${label}.screens must be a non-empty array`);
  }
  if (new Set(screens.map((screen) => screen.screenId)).size !== screens.length) {
    throw new Error(`${label}.screens must have unique screenId values`);
  }

  return {
    assetSlug: assertString(record.assetSlug, `${label}.assetSlug`),
    singleTakeaway: assertString(record.singleTakeaway, `${label}.singleTakeaway`),
    hook: assertString(record.hook, `${label}.hook`),
    screens,
    persistentConstraints: validatePersistentConstraints(
      record.persistentConstraints,
      `${label}.persistentConstraints`,
    ),
    nonGoals: assertStringArray(record.nonGoals, `${label}.nonGoals`),
  };
}

function validateCompletePlanScreen(value: unknown, index: number, label: string): CompletePlanScreen {
  const record = assertRecord(value, `${label}.screens[${index}]`);
  return {
    screenId: assertString(record.screenId, `${label}.screens[${index}].screenId`),
    goal: assertString(record.goal, `${label}.screens[${index}].goal`),
    uiSurface: assertString(record.uiSurface, `${label}.screens[${index}].uiSurface`),
    layout: assertStringArray(record.layout, `${label}.screens[${index}].layout`),
    background: assertStringArray(record.background, `${label}.screens[${index}].background`),
    copy: assertStringArray(record.copy, `${label}.screens[${index}].copy`),
    primaryMotion: assertString(record.primaryMotion, `${label}.screens[${index}].primaryMotion`),
    motionSequence: assertStringArray(
      record.motionSequence,
      `${label}.screens[${index}].motionSequence`,
    ),
    proofElement: assertStringArray(record.proofElement, `${label}.screens[${index}].proofElement`),
    requiredAssets: assertStringArray(
      record.requiredAssets,
      `${label}.screens[${index}].requiredAssets`,
      true,
    ),
    timingHint: assertString(record.timingHint, `${label}.screens[${index}].timingHint`),
  };
}

function validateStyleMapping(value: unknown, label: string): CompletePlanStyleMapping {
  const record = assertRecord(value, label);
  return {
    colorRoles: assertStringArray(record.colorRoles, `${label}.colorRoles`),
    typeRoles: assertStringArray(record.typeRoles, `${label}.typeRoles`),
    radiusRules: assertStringArray(record.radiusRules, `${label}.radiusRules`),
    spacingRules: assertStringArray(record.spacingRules, `${label}.spacingRules`),
    backgroundRules: assertStringArray(record.backgroundRules, `${label}.backgroundRules`),
    motionRules: assertStringArray(record.motionRules, `${label}.motionRules`),
    prohibitedPatterns: assertStringArray(record.prohibitedPatterns, `${label}.prohibitedPatterns`),
  };
}

export function validateCompletePlan(value: unknown, label = "complete-plan.json"): CompletePlan {
  const record = assertRecord(value, label);
  const screens = Array.isArray(record.screens)
    ? record.screens.map((screen, index) => validateCompletePlanScreen(screen, index, label))
    : null;
  if (!screens || screens.length === 0) {
    throw new Error(`${label}.screens must be a non-empty array`);
  }
  if (new Set(screens.map((screen) => screen.screenId)).size !== screens.length) {
    throw new Error(`${label}.screens must have unique screenId values`);
  }

  return {
    assetSlug: assertString(record.assetSlug, `${label}.assetSlug`),
    aspectRatio: assertAspectRatio(record.aspectRatio, `${label}.aspectRatio`),
    durationTarget: assertDurationTarget(record.durationTarget, `${label}.durationTarget`),
    persistentConstraints: validatePersistentConstraints(
      record.persistentConstraints,
      `${label}.persistentConstraints`,
    ),
    styleMapping: validateStyleMapping(record.styleMapping, `${label}.styleMapping`),
    screens,
    implementationNotes: assertStringArray(
      record.implementationNotes,
      `${label}.implementationNotes`,
    ),
    acceptanceChecks: assertStringArray(record.acceptanceChecks, `${label}.acceptanceChecks`),
  };
}

function validateMaterialNeedItem(value: unknown, index: number, label: string): MaterialNeedItem {
  const record = assertRecord(value, `${label}.requiredFromUser[${index}]`);
  return {
    id: assertString(record.id, `${label}.requiredFromUser[${index}].id`),
    type: assertString(record.type, `${label}.requiredFromUser[${index}].type`),
    description: assertString(record.description, `${label}.requiredFromUser[${index}].description`),
    whyNeeded: assertString(record.whyNeeded, `${label}.requiredFromUser[${index}].whyNeeded`),
    usedInScreen: assertString(record.usedInScreen, `${label}.requiredFromUser[${index}].usedInScreen`),
    requiredBeforeBuild:
      typeof record.requiredBeforeBuild === "boolean"
        ? record.requiredBeforeBuild
        : (() => {
            throw new Error(
              `${label}.requiredFromUser[${index}].requiredBeforeBuild must be a boolean`,
            );
          })(),
  };
}

export function validateMaterialNeeds(value: unknown, label = "material-needs.json"): MaterialNeeds {
  const record = assertRecord(value, label);
  const requiredFromUser = Array.isArray(record.requiredFromUser)
    ? record.requiredFromUser.map((item, index) => validateMaterialNeedItem(item, index, label))
    : null;
  if (!requiredFromUser) {
    throw new Error(`${label}.requiredFromUser must be an array`);
  }

  return {
    persistentConstraints: validatePersistentConstraints(
      record.persistentConstraints,
      `${label}.persistentConstraints`,
    ),
    alreadyInRepo: assertStringArray(record.alreadyInRepo, `${label}.alreadyInRepo`, true),
    requiredFromUser,
    optionalEnhancements: assertStringArray(
      record.optionalEnhancements,
      `${label}.optionalEnhancements`,
      true,
    ),
    uiReferences: assertStringArray(record.uiReferences, `${label}.uiReferences`, true),
    copyDependencies: assertStringArray(record.copyDependencies, `${label}.copyDependencies`, true),
    blockers: assertStringArray(record.blockers, `${label}.blockers`, true),
  };
}
