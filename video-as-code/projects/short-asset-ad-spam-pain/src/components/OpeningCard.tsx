import { NarrativeHeadline } from "./NarrativeHeadline";
import { fadeWindow } from "../lib/easing";

interface OpeningCardProps {
  currentMs: number;
}

export default function OpeningCard({ currentMs }: Readonly<OpeningCardProps>) {
  const containerOpacity = fadeWindow(currentMs, 0, 280, 4_920, 280);
  const firstHeadlineOpacity = fadeWindow(currentMs, 180, 520, 4_920, 280);
  const secondHeadlineOpacity = fadeWindow(currentMs, 1_120, 560, 4_920, 280);

  if (containerOpacity <= 0.01) {
    return null;
  }

  return (
    <div className="opening-card" style={{ opacity: containerOpacity }}>
      <div className="opening-card__eyebrow">Enterprise community moderation</div>
      <div className="opening-card__headline-layer">
        <NarrativeHeadline
          className="opening-card__headline opening-card__headline--first"
          opacity={firstHeadlineOpacity}
          text="Updating filters."
          visible={firstHeadlineOpacity > 0.01}
        />
        <NarrativeHeadline
          className="opening-card__headline opening-card__headline--second"
          opacity={secondHeadlineOpacity}
          text="Kicking bots."
          visible={secondHeadlineOpacity > 0.01}
        />
      </div>
      <div className="opening-card__footer">
        <span>Keyword list grows.</span>
        <span>Bot list grows faster.</span>
      </div>
    </div>
  );
}
