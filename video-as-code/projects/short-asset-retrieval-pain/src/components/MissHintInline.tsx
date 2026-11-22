import { CircleAlert } from "lucide-react";

type MissHintInlineProps = {
  text: string;
};

export function MissHintInline(props: MissHintInlineProps) {
  const { text } = props;

  return (
    <div className="doc-miss-hint-inline">
      <CircleAlert size={14} />
      <span>{text}</span>
    </div>
  );
}
