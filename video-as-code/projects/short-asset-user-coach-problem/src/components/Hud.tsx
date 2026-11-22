import type { Shot } from "../data/shots";

type HudProps = {
  currentMs: number;
  durationMs: number;
  currentShot: Shot;
  playing: boolean;
  onScrub: (ms: number) => void;
};

function formatSeconds(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`;
}

export function Hud(props: Readonly<HudProps>) {
  const { currentMs, currentShot, durationMs, onScrub, playing } = props;

  return (
    <aside className="hud" aria-label="Preview controls">
      <div className="hud__top">
        <span className={playing ? "hud__dot hud__dot--playing" : "hud__dot"} />
        <strong>{playing ? "PLAYING" : "PAUSED"}</strong>
        <span>
          {formatSeconds(currentMs)} / {formatSeconds(durationMs)}
        </span>
      </div>

      <input
        aria-label="Timeline"
        className="hud__slider"
        max={durationMs}
        min={0}
        onChange={(event) => onScrub(Number(event.currentTarget.value))}
        type="range"
        value={Math.round(currentMs)}
      />

      <div className="hud__shot">{currentShot.label}</div>
      <p>Space pauses. Use ?t=9000 for direct checks.</p>
    </aside>
  );
}
