export type CardField = {
  label: string;
  value: string;
  isQuote?: boolean;
};

export type CardData = {
  headerColor: string;
  title: string;
  badge?: string;
  fields: CardField[];
  actions?: string[];
};

export function FeishuCard({
  card,
  glowing,
  onActionClick,
}: {
  card: CardData;
  glowing?: boolean;
  onActionClick?: (action: string) => void;
}) {
  return (
    <div className={`feishu-bot-card${glowing ? " feishu-bot-card--glow" : ""}`}>
      <div
        className="feishu-bot-card-hd"
        style={{ borderLeft: `4px solid ${card.headerColor}` }}
      >
        <span className="feishu-bot-card-hd-title">{card.title}</span>
        {card.badge && (
          <span className="feishu-bot-card-badge">{card.badge}</span>
        )}
      </div>
      <div className="feishu-bot-card-body">
        {card.fields.map((f, i) => (
          <div className="feishu-card-field" key={i}>
            <span className="feishu-card-flabel">{f.label}</span>
            {f.isQuote ? (
              <div className="feishu-card-fquote">{f.value}</div>
            ) : (
              <div
                className="feishu-card-fval"
                dangerouslySetInnerHTML={{
                  __html: f.value.replace(
                    /@(\w+)/g,
                    '<span class="feishu-mention">@$1</span>',
                  ),
                }}
              />
            )}
          </div>
        ))}
      </div>
      {card.actions && card.actions.length > 0 && (
        <div className="feishu-bot-card-actions">
          {card.actions.map((a, i) => (
            <div
              className="feishu-card-act"
              key={i}
              onClick={() => onActionClick?.(a)}
              style={{ cursor: onActionClick ? "pointer" : undefined }}
            >
              {a}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
