import { useTimeline } from "../hooks/useTimeline";
import { type FrameRoute, totalDurationMs, getShotAtTime } from "../data/shots";
import { OverviewCommandCenterScene } from "./OverviewCommandCenterScene";
import { DiscordDetailScene } from "./DiscordDetailScene";
import { DiscordProofScene } from "./DiscordProofScene";
import { RouterScene } from "./RouterScene";
import { EmailProofScene } from "./EmailProofScene";
import { ProductKVScene } from "./ProductKVScene";

function frameAtTime(time: number): FrameRoute {
  const shot = getShotAtTime(time);

  if (!shot) return "05";
  if (shot.segment === "S00") return "00";
  if (shot.segment === "S01") return shot.id === "1.1" || shot.id === "1.2" ? "01" : "02";
  if (shot.segment === "S02") return "03";
  if (shot.segment === "S03") return "04";
  return "05";
}

function renderFrame(frame: FrameRoute) {
  switch (frame) {
    case "00":
      return <OverviewCommandCenterScene />;
    case "01":
      return <DiscordDetailScene />;
    case "02":
      return <DiscordProofScene />;
    case "03":
      return <RouterScene />;
    case "04":
      return <EmailProofScene />;
    case "05":
      return <ProductKVScene />;
    default:
      return <OverviewCommandCenterScene />;
  }
}

export function TimelinePreview() {
  const { time } = useTimeline({ durationMs: totalDurationMs, autoPlay: true, loop: true });
  const frame = frameAtTime(time);

  return (
    <div className="timeline-stage">
      <div className="timeline-stage__scene" key={frame}>
        {renderFrame(frame)}
      </div>
      <div className="timeline-stage__wipe" key={`wipe-${frame}`} aria-hidden="true" />
    </div>
  );
}
