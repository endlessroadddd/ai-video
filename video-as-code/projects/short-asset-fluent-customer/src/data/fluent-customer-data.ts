export const channelResults = [
  {
    platform: "Discord",
    audience: "Devs LATAM",
    language: "Spanish (AR)",
    status: "Replied · 6s",
    snippet: "¿Hay planes para soportar webhooks personalizados en los flujos?",
    accent: "#5865F2",
  },
  {
    platform: "Slack",
    audience: "#support",
    language: "English",
    status: "Replied · 8s",
    snippet: "Can I connect Lucius with our internal knowledge base?",
    accent: "#4A154B",
  },
  {
    platform: "Feishu",
    audience: "ProductOps",
    language: "Chinese",
    status: "Replied · 11s",
    snippet: "能否导出会话数据用于内部分析？需要哪些权限配置？",
    accent: "#3370FF",
  },
  {
    platform: "Email",
    audience: "NexLogix Co., Ltd.",
    language: "Japanese formal",
    status: "Replied · 12s",
    snippet: "Re: ライセンス更新と請求書の発行についてのご相談",
    accent: "#644FB8",
  },
];

export const discordUserMessage = {
  author: "maru_dev",
  body: "Hola equipo, ¿cómo funcionan los embeddings en la API de Lucius? ¿Hay límites de rate limit por minuto o por tokens? ¿Y qué pasa si supero esos límites?",
  time: "03:47",
};

export const discordLuciusReply = {
  author: "Lucius",
  body: "Los embeddings se generan mediante el endpoint #857 /v1/embeddings.\nSoporta entradas en lote y el procesamiento es asíncrono para cargas grandes.\n\n[Rate limit por organización: 10K req/min]\n\nPara volúmenes masivos, recomendamos usar el flujo de Lucius con\narchivos en GCS o S3 y monitorear el progreso con GET /v1/embed/{{id}}.\n\ndocs.lucius.ai / migrations > Bulk-embeddings",
  time: "03:47",
};

export const discordInsights = [
  { label: "Detected", value: "Spanish (AR)" },
  { label: "Tone", value: "casual" },
  { label: "Replied", value: "6s" },
];

export const discordDraftInsights = [
  {
    label: "Topic",
    value: "API · Embeddings\nRate Limits",
    icon: "□",
  },
  {
    label: "Intent",
    value: "Entender límites\ny comportamiento",
    icon: "◎",
  },
  {
    label: "Audience",
    value: "Desarrollador\n(Integración)",
    icon: "♙",
  },
];

export const operatorPrompt = `# Lucius · 客户支持口径
请向客户发送产品更新通知邮件。

重点说明新功能和升级收益。

语气保持专业和友好。

包含支持联系方式。

使用日语输出。`;

export const emailInquiry = {
  subject: "SOC 2 Type II、データ地域、および保持ポリシーについてのご確認",
  from: "NexLogix ご担当者様",
  company: "NexLogix 株式会社",
  time: "Apr 28 · 11:23 JST",
  points: [
    "SOC 2 Type II 監査レポートの開示可否",
    "顧客データの保管リージョン（東京リージョン対応）",
    "データ保持期間および削除ポリシー",
  ],
};

export const emailLuciusReply = {
  subject: "Re: Lucius 導入における SOC 2 Type II 対応について",
  body: `田中様

お世話になっております。Lucius サポートチームでございます。
ご検討いただきまして、誠にありがとうございます。

ご質問につきまして、以下の通りご回答申し上げます。

1. **SOC 2 Type II 監査レポート**：最新版（2026 年 1 月発行）をご提供可能です。NDA 締結後にセキュアリンクをお送りいたします。
2. **データ保管リージョン**：東京リージョン（ap-northeast-1）に対応しております。Enterprise プラン契約時にご指定ください。
3. **データ保持・削除ポリシー**：詳細は以下のドキュメントをご参照ください。
   🔗 docs.lucius.ai/security/data-retention

追加のご質問がございましたら、いつでもご連絡ください。

何卒よろしくお願い申し上げます。

── Lucius サポートチーム
support@lucius.ai`,
};

export const emailComplianceEvidence = [
  { label: "SOC 2 Type II", value: "Jan 2026" },
  { label: "Tokyo region", value: "ap-northeast-1" },
  { label: "Data retention", value: "Configurable" },
];

export const emailInsights = [
  { label: "Detected", value: "Japanese (formal)" },
  { label: "Tone", value: "formal · enterprise" },
  { label: "Replied", value: "12s" },
];

export const emailComplianceLabels = [
  { label: "検出：日本語（フォーマル）", value: "Idioma formal identificado" },
  { label: "トーン：エンタープライズ", value: "NexLogix Co., Ltd." },
  { label: "返信：12秒", value: "回答完了" },
];

export const routerMetrics = [
  { icon: "✓", label: "Intent preserved", sublabel: "Meaning carried across every language" },
  { icon: "✓", label: "Channel matched", sublabel: "Routed to the right platform & format" },
  { icon: "✓", label: "Tone adjusted", sublabel: "Voice adapted for the audience" },
];

export const kvCopy = {
  tagline: "Wherever they are. Whatever they speak.",
  microcopy: "One brain. Every channel. Every tongue.",
};
