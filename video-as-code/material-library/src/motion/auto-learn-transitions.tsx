import { easeOutCubic, mix, ramp } from "./easing";

export type AutoLearnFadeOverlayProps = {
  opacity: number;
};

export type AutoLearnEndingOverlayProps = {
  progress: number;
  text?: string;
};

export function AutoLearnFadeOverlay({
  opacity,
}: AutoLearnFadeOverlayProps) {
  if (opacity <= 0) {
    return null;
  }

  return (
    <div
      className="fade-overlay"
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}

export function AutoLearnEndingOverlay({
  progress,
  text = "AI stores knowledge the way AI retrieves it best structured, connected, and always up to date.",
}: AutoLearnEndingOverlayProps) {
  if (progress <= 0) {
    return null;
  }

  const endingBgOpacity = easeOutCubic(ramp(progress, 0, 0.45));
  const endingTextIn = easeOutCubic(ramp(progress, 0.35, 0.7));

  return (
    <div className="ending-overlay" style={{ opacity: endingBgOpacity }}>
      <div
        className="ending-text"
        style={{
          opacity: endingTextIn,
          transform: `translateY(${mix(16, 0, endingTextIn)}px)`,
        }}
      >
        {text}
      </div>
    </div>
  );
}
