type PolicyDiffCardProps = {
  after: string;
  before: string;
  focused?: boolean;
};

export function PolicyDiffCard(props: PolicyDiffCardProps) {
  const { after, before, focused = false } = props;

  return (
    <section className={`policy-diff${focused ? " is-focused" : ""}`}>
      <div className="policy-diff__header">
        <span className="policy-diff__eyebrow">Content Change</span>
      </div>

      <div className="policy-diff__grid">
        <article className="policy-diff__card policy-diff__card--before">
          <span className="policy-diff__tag">Before</span>
          <p>{before}</p>
        </article>

        <div className="policy-diff__arrow" aria-hidden="true">
          -&gt;
        </div>

        <article className="policy-diff__card policy-diff__card--after">
          <span className="policy-diff__tag">After</span>
          <p>{after}</p>
        </article>
      </div>
    </section>
  );
}
