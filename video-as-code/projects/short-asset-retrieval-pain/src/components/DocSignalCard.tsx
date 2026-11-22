import { X } from "lucide-react";
import type { Segment01DocCard } from "../data/segment01DocMiss";
import { DocLookupStatusLine } from "./DocLookupStatusLine";

type DocSignalCardProps = {
  card: Segment01DocCard;
  failed: boolean;
  pulse: boolean;
  visible: boolean;
};

export function DocSignalCard(props: DocSignalCardProps) {
  const { card, failed, pulse, visible } = props;
  const Icon = card.icon;

  return (
    <article
      className={[
        "doc-signal-card",
        `doc-signal-card--${card.tone}`,
        pulse ? "is-pulsing" : "",
        failed ? "is-failed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-visible={visible ? "true" : "false"}
    >
      <div className="doc-signal-card__header">
        <span className="doc-signal-card__icon">
          <Icon size={20} />
        </span>
      </div>
      <strong className="doc-signal-card__title">{card.title}</strong>
      <DocLookupStatusLine failed={failed} text={failed ? card.failedLabel : card.checkingLabel} />

      {failed ? (
        <span className="doc-signal-card__cross" aria-hidden="true">
          <X size={20} />
        </span>
      ) : null}
    </article>
  );
}
