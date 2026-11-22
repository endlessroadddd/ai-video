import type { AssetRegistryEntry } from "./asset-registry.js";
import type {
  MaterialDominance,
  MaterialInformationDensity,
  MaterialMutationCost,
  MaterialNarrativeRole,
  MaterialVisualWeight,
} from "./material-library-catalog.js";

export type MaterialMatchIntent = {
  currentSelectionIds?: string[];
  dominance?: MaterialDominance;
  hostSurfaces?: string[];
  informationDensity?: MaterialInformationDensity;
  maxMutationCost?: MaterialMutationCost;
  narrativeRole?: MaterialNarrativeRole;
  scriptText?: string;
  toneTags?: string[];
  visualWeight?: MaterialVisualWeight;
};

export type MaterialMatchCandidate = {
  decision: "adapt" | "reuse";
  entry: AssetRegistryEntry;
  reasons: string[];
  score: number;
};

export type MaterialMatchResult = {
  candidates: MaterialMatchCandidate[];
  decision: "adapt" | "handcraft" | "reuse";
};

const WEIGHT_ORDER: MaterialVisualWeight[] = ["micro", "light", "medium", "heavy", "full-scene"];
const DENSITY_ORDER: MaterialInformationDensity[] = ["low", "medium", "high"];
const MUTATION_ORDER: MaterialMutationCost[] = ["low", "medium", "high"];

function normalizeText(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

function listIntersects(haystack: string[], needles: string[]): boolean {
  const normalizedNeedles = new Set(needles.map((value) => normalizeText(value)).filter(Boolean));
  return haystack.some((value) => normalizedNeedles.has(normalizeText(value)));
}

function containsAny(scriptText: string, phrases: string[]): string[] {
  return phrases.filter((phrase) => {
    const normalizedPhrase = normalizeText(phrase);
    return normalizedPhrase.length > 0 && scriptText.includes(normalizedPhrase);
  });
}

function compareStability(left: AssetRegistryEntry, right: AssetRegistryEntry): number {
  if (left.stability === right.stability) {
    return 0;
  }

  return left.stability === "stable" ? -1 : 1;
}

function compareDistance<T extends string>(order: T[], left: T | undefined, right: T | undefined): number {
  if (!left || !right) {
    return Number.POSITIVE_INFINITY;
  }

  return Math.abs(order.indexOf(left) - order.indexOf(right));
}

export function scoreMaterialCandidate(
  entry: AssetRegistryEntry,
  intent: MaterialMatchIntent,
): MaterialMatchCandidate | null {
  if (entry.kind !== "material-library") {
    return null;
  }

  const scriptText = normalizeText(intent.scriptText);
  const reasons: string[] = [];
  let score = 0;

  const directTriggerMatches = containsAny(scriptText, [
    ...entry.scriptTriggersEn,
    ...entry.scriptTriggersZh,
  ]);
  if (directTriggerMatches.length > 0) {
    score += 4;
    reasons.push(`Direct trigger hit: ${directTriggerMatches[0]}`);
  }

  if (intent.narrativeRole && entry.narrativeRole === intent.narrativeRole) {
    score += 3;
    reasons.push(`Narrative role aligned: ${entry.narrativeRole}`);
  }

  if (intent.hostSurfaces?.length && listIntersects(entry.hostSurfaces, intent.hostSurfaces)) {
    score += 2;
    reasons.push("Host surface aligned");
  }

  if (intent.toneTags?.length && listIntersects(entry.toneTags, intent.toneTags)) {
    score += 2;
    reasons.push("Tone aligned");
  }

  const weightDistance = compareDistance(WEIGHT_ORDER, entry.visualWeight, intent.visualWeight);
  const densityDistance = compareDistance(DENSITY_ORDER, entry.informationDensity, intent.informationDensity);
  if (weightDistance <= 1 || densityDistance <= 1) {
    score += 2;
    reasons.push("Weight or density aligned");
  }

  if (
    intent.currentSelectionIds?.length &&
    entry.pairWithIds.some((pairId) => intent.currentSelectionIds?.includes(pairId))
  ) {
    score += 1;
    reasons.push("Pairs with an already selected material");
  }

  const negativeMatches = containsAny(scriptText, [
    ...entry.negativeTriggersEn,
    ...entry.negativeTriggersZh,
  ]);
  if (negativeMatches.length > 0) {
    score -= 5;
    reasons.push(`Negative trigger hit: ${negativeMatches[0]}`);
  }

  if (intent.dominance && entry.dominance !== intent.dominance) {
    score -= 3;
    reasons.push(`Dominance mismatch: expected ${intent.dominance}, got ${entry.dominance}`);
  }

  if (
    intent.maxMutationCost &&
    compareDistance(MUTATION_ORDER, entry.mutationCost, intent.maxMutationCost) > 0 &&
    MUTATION_ORDER.indexOf(entry.mutationCost) > MUTATION_ORDER.indexOf(intent.maxMutationCost)
  ) {
    score -= 2;
    reasons.push(`Mutation cost ${entry.mutationCost} exceeds tolerance ${intent.maxMutationCost}`);
  }

  return {
    decision: entry.reuseMode === "drop-in" && entry.mutationCost === "low" ? "reuse" : "adapt",
    entry,
    reasons,
    score,
  };
}

export function recommendMaterialCandidates(
  entries: AssetRegistryEntry[],
  intent: MaterialMatchIntent,
  options: { maxCandidates?: number; minScore?: number } = {},
): MaterialMatchResult {
  const maxCandidates = options.maxCandidates ?? 3;
  const minScore = options.minScore ?? 4;
  const candidates = entries
    .map((entry) => scoreMaterialCandidate(entry, intent))
    .filter((candidate): candidate is MaterialMatchCandidate => candidate !== null)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return compareStability(left.entry, right.entry) || left.entry.title.localeCompare(right.entry.title);
    })
    .slice(0, maxCandidates);

  if (!candidates.length || candidates[0].score < minScore) {
    return {
      candidates,
      decision: "handcraft",
    };
  }

  return {
    candidates,
    decision: candidates[0].decision,
  };
}
