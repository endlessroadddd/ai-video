import { SEGMENT01_DOC_CARDS } from "../data/segment01DocMiss";
import { DocSignalCard } from "./DocSignalCard";

type DocSignalRowProps = {
  failedCount: number;
  pulse: boolean;
  visible: boolean;
};

export function DocSignalRow(props: DocSignalRowProps) {
  const { failedCount, pulse, visible } = props;

  return (
    <div className="doc-signal-row" data-visible={visible ? "true" : "false"}>
      {SEGMENT01_DOC_CARDS.map((card, index) => (
        <DocSignalCard
          key={card.id}
          card={card}
          failed={failedCount > index}
          pulse={pulse && failedCount === 0}
          visible={visible}
        />
      ))}
    </div>
  );
}
