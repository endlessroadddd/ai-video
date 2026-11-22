type DocLookupStatusLineProps = {
  failed: boolean;
  text: string;
};

export function DocLookupStatusLine(props: DocLookupStatusLineProps) {
  const { failed, text } = props;

  return (
    <span className={`doc-signal-card__status${failed ? " is-failed" : ""}`}>
      {text}
    </span>
  );
}
