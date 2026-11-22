import {
  FINAL_BANNED_KEYWORD_COUNT,
  FINAL_NEW_BOT_COUNT,
} from "../data/chartSeries";
import { getBotPreview } from "../data/members";
import { KEYWORD_STACK } from "../data/scene";
import { fadeWindow } from "../lib/easing";
import { NarrativeHeadline } from "./NarrativeHeadline";

interface OutroSplitProps {
  currentMs: number;
}

export default function OutroSplit({ currentMs }: Readonly<OutroSplitProps>) {
  const opacity = fadeWindow(currentMs, 31_600, 460, 35_700, 0);
  if (opacity <= 0.01) {
    return null;
  }

  const finalBots = getBotPreview();

  return (
    <div className="outro-split" style={{ opacity }}>
      <div className="outro-split__panel outro-split__panel--keywords">
        <div className="outro-split__eyebrow">Keyword backlog</div>
        <div className="outro-split__metric">{FINAL_BANNED_KEYWORD_COUNT} phrases</div>
        <div className="outro-split__chips">
          {KEYWORD_STACK.map((keyword) => (
            <span key={keyword} className="outro-chip">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="outro-split__panel outro-split__panel--bots">
        <div className="outro-split__eyebrow">Bot wave</div>
        <div className="outro-split__metric">+{FINAL_NEW_BOT_COUNT} new bots</div>
        <div className="outro-split__roster">
          {finalBots.map((member) => (
            <div key={member.id} className="outro-roster-row">
              <span className="outro-roster-dot" />
              <span>{member.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="outro-split__headline-layer">
        <NarrativeHeadline
          className="outro-split__headline"
          opacity={fadeWindow(currentMs, 32_020, 620, 35_700, 0)}
          text={"All manual.\nAll the time."}
          visible
        />
      </div>
    </div>
  );
}
