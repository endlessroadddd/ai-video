export function statPill(label) {
  return `<span class="pill">${label}</span>`;
}

export function communityThread(text, index, badge = "Live") {
  return `
    <div class="community-thread" style="--thread-index:${index}">
      <div class="community-thread__badge">${badge}</div>
      <img src="./public/assets/discord.svg" alt="" class="community-thread__icon" />
      <div class="community-thread__copy">
        <strong>Discord thread</strong>
        <span>${text}</span>
      </div>
    </div>
  `;
}

export function queueCard(text, index, badge = "Repeat") {
  return `
    <div class="queue-card" style="--queue-index:${index}">
      <div class="queue-card__badge">${badge}</div>
      <div class="queue-card__body">${text}</div>
    </div>
  `;
}

export function structureCard(text, index) {
  return `
    <div class="structure-card" style="--structure-index:${index}">
      <span class="structure-card__label">Structured output</span>
      <strong>${text}</strong>
    </div>
  `;
}

export function loopCard(title, body, index) {
  return `
    <article class="loop-card" style="--step-index:${index}">
      <span class="loop-card__kicker">Step 0${index + 1}</span>
      <h3>${title}</h3>
      <p>${body}</p>
    </article>
  `;
}

export function metricTile(metric, accent = "", index = 0, variant = "") {
  const variantClass = variant ? ` metric-tile--${variant}` : "";
  const accentClass = accent ? ` metric-tile--${accent}` : "";
  return `
    <article class="metric-tile${accentClass}${variantClass}" style="--metric-index:${index}">
      <div class="metric-tile__value">${metric.value}</div>
      <div class="metric-tile__label">${metric.label}</div>
      <div class="metric-tile__detail">${metric.detail ?? ""}</div>
    </article>
  `;
}
