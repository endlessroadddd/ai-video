export const VIDEO_WIDTH: number | null = null;

export const VIDEO_HEIGHT: number | null = null;

export const VIDEO_FPS = 60;

export function resolveConfiguredDimension(
  configuredValue: number | null,
  fallbackValue: number,
): number {
  if (typeof configuredValue !== "number" || !Number.isFinite(configuredValue)) {
    return fallbackValue;
  }

  return configuredValue > 0 ? configuredValue : fallbackValue;
}
