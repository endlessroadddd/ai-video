import { jsxs as a, jsx as e, Fragment as l } from "react/jsx-runtime";
import { Suspense as C, lazy as z } from "react";
import { DiscordMessages as S, DiscordMessage as D, DiscordEmbed as A, DiscordEmbedFields as U, DiscordEmbedField as I, DiscordEmbedFooter as $, DiscordMention as N } from "@skyra/discord-components-react";
function M({
  shellEyebrow: r = "Discord UI Playground",
  title: t,
  subtitle: i,
  topControls: c,
  children: n
}) {
  return /* @__PURE__ */ a("main", { className: "playground-page", children: [
    /* @__PURE__ */ e("div", { className: "ambient ambient--one" }),
    /* @__PURE__ */ e("div", { className: "ambient ambient--two" }),
    /* @__PURE__ */ a("section", { className: "playground-shell", children: [
      /* @__PURE__ */ a("div", { className: "playground-shell__intro", children: [
        /* @__PURE__ */ e("p", { className: "playground-shell__eyebrow", children: r }),
        /* @__PURE__ */ a("div", { className: "playground-shell__heading", children: [
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ e("h1", { children: t }),
            /* @__PURE__ */ e("p", { children: i })
          ] }),
          c
        ] })
      ] }),
      n
    ] })
  ] });
}
function u({ children: r }) {
  return /* @__PURE__ */ e("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: r });
}
function y() {
  return /* @__PURE__ */ a(u, { children: [
    /* @__PURE__ */ e("circle", { cx: "11", cy: "11", r: "6.25", stroke: "currentColor", strokeWidth: "1.8" }),
    /* @__PURE__ */ e("path", { d: "M16 16l4 4", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.8" })
  ] });
}
function H() {
  return /* @__PURE__ */ a(u, { children: [
    /* @__PURE__ */ e("path", { d: "M12 4a4 4 0 0 1 4 4v2.7c0 .7.24 1.39.67 1.94L18 14.2V16H6v-1.8l1.33-1.56c.43-.55.67-1.24.67-1.94V8a4 4 0 0 1 4-4Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.8" }),
    /* @__PURE__ */ e("path", { d: "M9.5 18a2.5 2.5 0 0 0 5 0", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.8" })
  ] });
}
function _() {
  return /* @__PURE__ */ e(u, { children: /* @__PURE__ */ e("path", { d: "M12 5v14M5 12h14", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.8" }) });
}
function w() {
  return /* @__PURE__ */ e(u, { children: /* @__PURE__ */ e("path", { d: "M12 3l1.6 4.8L18 9.4l-4.4 1.7L12 16l-1.6-4.9L6 9.4l4.4-1.6L12 3Z", fill: "currentColor" }) });
}
function T() {
  return /* @__PURE__ */ a(u, { children: [
    /* @__PURE__ */ e("path", { d: "M12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Z", stroke: "currentColor", strokeWidth: "1.8" }),
    /* @__PURE__ */ e("path", { d: "M19 12a7.08 7.08 0 0 0-.08-1l2.02-1.57-1.9-3.29-2.44.98a7.16 7.16 0 0 0-1.73-1L14.5 3h-5l-.37 3.12a7.16 7.16 0 0 0-1.73 1l-2.44-.98-1.9 3.29L5.08 11a7.08 7.08 0 0 0 0 2l-2.02 1.57 1.9 3.29 2.44-.98a7.16 7.16 0 0 0 1.73 1L9.5 21h5l.37-3.12a7.16 7.16 0 0 0 1.73-1l2.44.98 1.9-3.29L18.92 13c.05-.33.08-.67.08-1Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.4" })
  ] });
}
function j() {
  return /* @__PURE__ */ e(u, { children: /* @__PURE__ */ e("path", { d: "M14.5 4.5v4a3 3 0 0 0 .88 2.12L17 12.24V14h-4.25V20l-.75.75-.75-.75V14H7v-1.76l1.62-1.62A3 3 0 0 0 9.5 8.5v-4h5Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.8" }) });
}
function B() {
  return /* @__PURE__ */ a(u, { children: [
    /* @__PURE__ */ e("path", { d: "M20 4 4 11.25l6.25 2.5L12.75 20 20 4Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.8" }),
    /* @__PURE__ */ e("path", { d: "M10.25 13.75 20 4", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.8" })
  ] });
}
function P({ header: r }) {
  return /* @__PURE__ */ a("header", { className: "chat-header", children: [
    /* @__PURE__ */ a("div", { className: "chat-header__left", children: [
      /* @__PURE__ */ e("span", { className: "chat-header__channel", children: r.channelLabel }),
      /* @__PURE__ */ e("span", { className: "chat-header__divider" }),
      /* @__PURE__ */ e("span", { className: "chat-header__subtitle", children: r.heroNote })
    ] }),
    /* @__PURE__ */ a("div", { className: "chat-header__right", children: [
      /* @__PURE__ */ e("span", { className: "chat-header__stat", children: r.membersLabel }),
      /* @__PURE__ */ e("button", { type: "button", className: "icon-button", children: /* @__PURE__ */ e(w, {}) }),
      /* @__PURE__ */ e("button", { type: "button", className: "icon-button", children: /* @__PURE__ */ e(j, {}) }),
      /* @__PURE__ */ e("button", { type: "button", className: "icon-button", children: /* @__PURE__ */ e(H, {}) }),
      /* @__PURE__ */ e("button", { type: "button", className: "icon-button", children: /* @__PURE__ */ e(y, {}) }),
      /* @__PURE__ */ e("button", { type: "button", className: "icon-button", children: /* @__PURE__ */ e(T, {}) })
    ] })
  ] });
}
function V({ placeholder: r }) {
  return /* @__PURE__ */ e("footer", { className: "composer-bar", children: /* @__PURE__ */ a("div", { className: "composer-bar__shell", children: [
    /* @__PURE__ */ a("button", { type: "button", className: "composer-pill composer-pill--ghost", children: [
      /* @__PURE__ */ e(w, {}),
      "Draft Assist"
    ] }),
    /* @__PURE__ */ e("input", { type: "text", readOnly: !0, value: "", placeholder: r }),
    /* @__PURE__ */ a("button", { type: "button", className: "composer-pill composer-pill--send", children: [
      /* @__PURE__ */ e(B, {}),
      "Send"
    ] })
  ] }) });
}
function R({ panel: r }) {
  return /* @__PURE__ */ a("aside", { className: "info-panel", "aria-label": "Context panel", children: [
    /* @__PURE__ */ a("div", { className: "info-panel__card info-panel__card--hero", children: [
      /* @__PURE__ */ e("p", { className: "info-panel__eyebrow", children: r.eyebrow ?? "Preview Intent" }),
      /* @__PURE__ */ e("h3", { children: r.title }),
      /* @__PURE__ */ e("p", { children: r.subtitle })
    ] }),
    /* @__PURE__ */ a("div", { className: "info-panel__card", children: [
      /* @__PURE__ */ e("p", { className: "info-panel__eyebrow", children: "Pinned Checks" }),
      /* @__PURE__ */ e("ul", { className: "info-panel__list", children: r.pinnedFacts.map((t) => /* @__PURE__ */ e("li", { children: t }, t)) })
    ] }),
    r.metrics?.length ? /* @__PURE__ */ a("div", { className: "info-panel__card info-panel__card--dense", children: [
      /* @__PURE__ */ e("p", { className: "info-panel__eyebrow", children: "Visual Notes" }),
      /* @__PURE__ */ e("div", { className: "info-panel__metrics", children: r.metrics.map((t) => /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ e("span", { children: t.label }),
        /* @__PURE__ */ e("strong", { children: t.value })
      ] }, t.label)) })
    ] }) : null
  ] });
}
function F({ items: r }) {
  return /* @__PURE__ */ e("aside", { className: "server-rail", "aria-label": "Servers", children: r.map((t) => /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: t.active ? "server-slot server-slot--active" : "server-slot",
      title: t.label,
      children: [
        /* @__PURE__ */ e("span", { className: t.active ? "server-slot__pill server-slot__pill--active" : "server-slot__pill" }),
        /* @__PURE__ */ e("span", { className: `server-slot__icon server-slot__icon--${t.accent ?? "muted"}`, children: t.label === "+" ? /* @__PURE__ */ e(_, {}) : t.label }),
        t.badge ? /* @__PURE__ */ e("span", { className: "server-slot__badge", children: t.badge }) : null
      ]
    },
    t.id
  )) });
}
const O = z(async () => ({ default: (await Promise.resolve().then(() => de)).DiscordTranscript }));
function Z({ messages: r }) {
  return /* @__PURE__ */ e("section", { className: "transcript-pane", "aria-label": "Transcript", children: /* @__PURE__ */ e("div", { className: "transcript-pane__inner", children: /* @__PURE__ */ e(
    C,
    {
      fallback: /* @__PURE__ */ a("div", { className: "transcript-loading", "aria-hidden": "true", children: [
        /* @__PURE__ */ e("div", { className: "transcript-loading__row" }),
        /* @__PURE__ */ e("div", { className: "transcript-loading__row transcript-loading__row--long" }),
        /* @__PURE__ */ e("div", { className: "transcript-loading__row" })
      ] }),
      children: /* @__PURE__ */ e(O, { messages: r })
    }
  ) }) });
}
function g({
  serverItems: r,
  leftRail: t,
  header: i,
  messages: c,
  composerPlaceholder: n,
  infoPanel: s
}) {
  return /* @__PURE__ */ a("div", { className: s ? "workspace-frame" : "workspace-frame workspace-frame--no-panel", children: [
    /* @__PURE__ */ e(F, { items: r }),
    t,
    /* @__PURE__ */ a("section", { className: "chat-column", children: [
      /* @__PURE__ */ e(P, { header: i }),
      /* @__PURE__ */ e(Z, { messages: c }),
      /* @__PURE__ */ e(V, { placeholder: n })
    ] }),
    s ? /* @__PURE__ */ e(R, { panel: s }) : null
  ] });
}
function E(r) {
  return r.type === "voice" ? "V" : "#";
}
function K({
  eyebrow: r = "Community Grid",
  title: t,
  searchPlaceholder: i,
  items: c
}) {
  return /* @__PURE__ */ a("aside", { className: "conversation-rail", "aria-label": "Community channels", children: [
    /* @__PURE__ */ a("div", { className: "conversation-rail__header", children: [
      /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ e("p", { className: "conversation-rail__eyebrow", children: r }),
        /* @__PURE__ */ e("h2", { children: t })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "icon-button", children: /* @__PURE__ */ e(_, {}) })
    ] }),
    /* @__PURE__ */ a("label", { className: "search-box", children: [
      /* @__PURE__ */ e(y, {}),
      /* @__PURE__ */ e("input", { type: "text", readOnly: !0, value: "", placeholder: i })
    ] }),
    /* @__PURE__ */ e("div", { className: "conversation-rail__list", children: c.map((n) => /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        className: n.active ? "conversation-item conversation-item--active" : "conversation-item",
        children: [
          /* @__PURE__ */ e("span", { className: "conversation-item__symbol", children: E(n) }),
          /* @__PURE__ */ a("span", { className: "conversation-item__meta", children: [
            /* @__PURE__ */ e("strong", { children: n.name }),
            /* @__PURE__ */ e("span", { children: n.subtitle })
          ] }),
          n.unread ? /* @__PURE__ */ e("span", { className: "conversation-item__unread", children: n.unread }) : null
        ]
      },
      n.id
    )) })
  ] });
}
function pe({
  shellEyebrow: r,
  title: t,
  subtitle: i,
  topControls: c,
  railEyebrow: n,
  railTitle: s,
  searchPlaceholder: d,
  channels: f,
  serverItems: h,
  header: p,
  messages: k,
  composerPlaceholder: v,
  infoPanel: b
}) {
  return /* @__PURE__ */ e(
    M,
    {
      shellEyebrow: r,
      title: t,
      subtitle: i,
      topControls: c,
      children: /* @__PURE__ */ e(
        g,
        {
          serverItems: h,
          leftRail: /* @__PURE__ */ e(
            K,
            {
              eyebrow: n,
              title: s,
              searchPlaceholder: d,
              items: f
            }
          ),
          header: p,
          messages: k,
          composerPlaceholder: v,
          infoPanel: b
        }
      )
    }
  );
}
const m = {
  rose: {
    kind: "human",
    variant: "soft",
    backdrop: "#f45b96",
    skin: "#ffd4bf",
    hair: "#45203a",
    shirt: "#29172a",
    accent: "#ff8db8"
  },
  amber: {
    kind: "human",
    variant: "glasses",
    backdrop: "#ffb547",
    skin: "#ffd5ad",
    hair: "#5a3419",
    shirt: "#473018",
    accent: "#ffd582"
  },
  cobalt: {
    kind: "human",
    variant: "headset",
    backdrop: "#4a7fff",
    skin: "#ffd2c1",
    hair: "#23386b",
    shirt: "#1d2742",
    accent: "#8fb3ff"
  },
  violet: {
    kind: "human",
    variant: "ponytail",
    backdrop: "#8c6bff",
    skin: "#f8d2bc",
    hair: "#36204d",
    shirt: "#26173d",
    accent: "#b6a0ff"
  },
  mint: {
    kind: "human",
    variant: "beanie",
    backdrop: "#2fbf9a",
    skin: "#ffd7c4",
    hair: "#19473e",
    shirt: "#14322f",
    accent: "#7be4ca"
  },
  slate: {
    kind: "human",
    variant: "buzz",
    backdrop: "#5b6472",
    skin: "#f3d1bf",
    hair: "#222830",
    shirt: "#1b2028",
    accent: "#9aa4b5"
  },
  sunset: {
    kind: "human",
    variant: "cap",
    backdrop: "#ff7d5d",
    skin: "#ffd2b8",
    hair: "#553127",
    shirt: "#3e1f1a",
    accent: "#ffb39b"
  },
  plum: {
    kind: "human",
    variant: "curly",
    backdrop: "#7a57d1",
    skin: "#ffd1ba",
    hair: "#251342",
    shirt: "#211235",
    accent: "#c8b0ff"
  }
}, G = {
  kind: "robot",
  backdrop: "#5865f2",
  shell: "#dfe7ff",
  outline: "#223067",
  eye: "#5865f2",
  accent: "#8ea0ff"
}, o = "#25212c";
function q(r) {
  return r.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function L(r, t) {
  const i = q(r);
  if (t === "robot" || i.includes("bot"))
    return G;
  if (t && t in m)
    return m[t];
  const c = Object.keys(m), n = Array.from(i || "user").reduce(
    (s, d) => s + d.charCodeAt(0),
    0
  );
  return m[c[n % c.length]];
}
function J({ spec: r }) {
  switch (r.variant) {
    case "glasses":
      return /* @__PURE__ */ a(l, { children: [
        /* @__PURE__ */ e("path", { d: "M18 27c1-9 8-15 15-15 8 0 13 4 14 13v4c-3-4-7-6-15-6-7 0-11 2-14 7z", fill: r.hair }),
        /* @__PURE__ */ e("path", { d: "M21 20c5-5 11-7 20-5", stroke: r.accent, strokeLinecap: "round", strokeWidth: "2", opacity: "0.65" })
      ] });
    case "headset":
      return /* @__PURE__ */ e("path", { d: "M19 28c1-10 7-16 13-16 9 0 15 6 15 15v4c-3-5-8-8-15-8-7 0-11 2-13 5z", fill: r.hair });
    case "cap":
      return /* @__PURE__ */ a(l, { children: [
        /* @__PURE__ */ e("path", { d: "M20 25c2-8 9-13 18-13 5 0 9 2 11 5l-4 10H20z", fill: r.accent }),
        /* @__PURE__ */ e("path", { d: "M18 28c2-4 8-7 17-7 6 0 11 1 15 4-4 3-11 4-20 4-4 0-8 0-12-1z", fill: r.hair }),
        /* @__PURE__ */ e("path", { d: "M35 23c6 0 11 2 14 6-7 1-12 1-18 0", fill: r.accent, opacity: "0.9" })
      ] });
    case "beanie":
      return /* @__PURE__ */ a(l, { children: [
        /* @__PURE__ */ e("path", { d: "M19 26c1-9 6-14 13-14 7 0 12 4 13 14v3H19z", fill: r.accent }),
        /* @__PURE__ */ e("path", { d: "M18 25h28v7c-4-3-9-4-14-4s-10 1-14 4z", fill: r.hair }),
        /* @__PURE__ */ e("path", { d: "M21 24h22", stroke: "#ffffff", strokeLinecap: "round", strokeWidth: "1.8", opacity: "0.42" })
      ] });
    case "curly":
      return /* @__PURE__ */ a(l, { children: [
        /* @__PURE__ */ e("circle", { cx: "22", cy: "21", r: "6.6", fill: r.hair }),
        /* @__PURE__ */ e("circle", { cx: "30", cy: "17.5", r: "7.8", fill: r.hair }),
        /* @__PURE__ */ e("circle", { cx: "39.5", cy: "21", r: "6.8", fill: r.hair }),
        /* @__PURE__ */ e("path", { d: "M18 29c2-6 7-9 14-9 7 0 12 3 14 9v3H18z", fill: r.hair }),
        /* @__PURE__ */ e("path", { d: "M24 18c5-4 10-5 16-2", stroke: r.accent, strokeLinecap: "round", strokeWidth: "2", opacity: "0.6" })
      ] });
    case "buzz":
      return /* @__PURE__ */ a(l, { children: [
        /* @__PURE__ */ e("path", { d: "M18 29c1-8 7-13 14-13 8 0 13 4 14 12-4-3-8-4-14-4-6 0-10 1-14 5z", fill: r.hair, opacity: "0.82" }),
        /* @__PURE__ */ e("path", { d: "M24 40c2 2 6 3 8 3s6-1 8-3", stroke: r.hair, strokeLinecap: "round", strokeWidth: "2.2", opacity: "0.72" })
      ] });
    case "ponytail":
      return /* @__PURE__ */ a(l, { children: [
        /* @__PURE__ */ e("path", { d: "M18 29c1-10 7-17 15-17 9 0 14 7 14 16v4c-2-5-8-8-15-8s-12 2-14 5z", fill: r.hair }),
        /* @__PURE__ */ e("path", { d: "M45 24c4 3 6 7 5 12-2-3-4-4-6-5", fill: r.hair }),
        /* @__PURE__ */ e("path", { d: "M21 21c4-6 10-8 18-6", stroke: r.accent, strokeLinecap: "round", strokeWidth: "2", opacity: "0.6" })
      ] });
    default:
      return /* @__PURE__ */ a(l, { children: [
        /* @__PURE__ */ e("path", { d: "M18 30c0-12 7-19 14-19 10 0 15 8 15 17v3c-2-5-7-9-15-9-7 0-11 2-14 8z", fill: r.hair }),
        /* @__PURE__ */ e("path", { d: "M21 22c3-6 8-9 16-9 4 0 8 1 11 5", stroke: r.accent, strokeLinecap: "round", strokeWidth: "2", opacity: "0.65" })
      ] });
  }
}
function Q({ spec: r }) {
  switch (r.variant) {
    case "glasses":
      return /* @__PURE__ */ a(l, { children: [
        /* @__PURE__ */ e("rect", { x: "22", y: "27", width: "8.5", height: "6.5", rx: "2.5", fill: "none", stroke: o, strokeWidth: "1.8" }),
        /* @__PURE__ */ e("rect", { x: "33.5", y: "27", width: "8.5", height: "6.5", rx: "2.5", fill: "none", stroke: o, strokeWidth: "1.8" }),
        /* @__PURE__ */ e("path", { d: "M30.5 30.2h3", stroke: o, strokeLinecap: "round", strokeWidth: "1.5" })
      ] });
    case "headset":
      return /* @__PURE__ */ a(l, { children: [
        /* @__PURE__ */ e("path", { d: "M19 30c0-8 6-14 13-14s13 6 13 14", fill: "none", stroke: r.accent, strokeLinecap: "round", strokeWidth: "4" }),
        /* @__PURE__ */ e("rect", { x: "16.5", y: "30", width: "5.5", height: "10", rx: "2.8", fill: r.accent }),
        /* @__PURE__ */ e("rect", { x: "42", y: "30", width: "5.5", height: "10", rx: "2.8", fill: r.accent }),
        /* @__PURE__ */ e("path", { d: "M42 39c0 4-2 6-7 6", fill: "none", stroke: r.accent, strokeLinecap: "round", strokeWidth: "2.4" })
      ] });
    default:
      return null;
  }
}
function X({ spec: r }) {
  return r.variant === "buzz" ? /* @__PURE__ */ a(l, { children: [
    /* @__PURE__ */ e("path", { d: "M24 27.5h5", stroke: o, strokeLinecap: "round", strokeWidth: "1.8" }),
    /* @__PURE__ */ e("path", { d: "M35 27.5h5", stroke: o, strokeLinecap: "round", strokeWidth: "1.8" }),
    /* @__PURE__ */ e("circle", { cx: "27.5", cy: "31", r: "1.5", fill: o }),
    /* @__PURE__ */ e("circle", { cx: "36.5", cy: "31", r: "1.5", fill: o }),
    /* @__PURE__ */ e("path", { d: "M28.5 37h7", stroke: o, strokeLinecap: "round", strokeWidth: "2" })
  ] }) : r.variant === "headset" ? /* @__PURE__ */ a(l, { children: [
    /* @__PURE__ */ e("path", { d: "M25.5 29c1.3-1 2.6-1 3.9 0", stroke: o, strokeLinecap: "round", strokeWidth: "1.7" }),
    /* @__PURE__ */ e("path", { d: "M34.5 29c1.3-1 2.6-1 3.9 0", stroke: o, strokeLinecap: "round", strokeWidth: "1.7" }),
    /* @__PURE__ */ e("circle", { cx: "27.5", cy: "31.5", r: "1.55", fill: o }),
    /* @__PURE__ */ e("circle", { cx: "36.5", cy: "31.5", r: "1.55", fill: o }),
    /* @__PURE__ */ e("path", { d: "M28.5 36c2.2 1.8 4.8 1.8 7 0", stroke: o, strokeLinecap: "round", strokeWidth: "2" })
  ] }) : /* @__PURE__ */ a(l, { children: [
    /* @__PURE__ */ e("circle", { cx: "27.5", cy: "30.5", r: "1.7", fill: o }),
    /* @__PURE__ */ e("circle", { cx: "36.5", cy: "30.5", r: "1.7", fill: o }),
    /* @__PURE__ */ e("path", { d: "M28 36c2.3 2.1 5.7 2.1 8 0", stroke: o, strokeLinecap: "round", strokeWidth: "2.2" })
  ] });
}
function Y({ spec: r }) {
  return r.variant === "headset" ? /* @__PURE__ */ a(l, { children: [
    /* @__PURE__ */ e("path", { d: "M14 60c3-11 11-18 18-18 10 0 17 7 18 18", fill: r.shirt }),
    /* @__PURE__ */ e("path", { d: "M28 45v10M36 45v10", stroke: r.accent, strokeLinecap: "round", strokeWidth: "2", opacity: "0.7" })
  ] }) : r.variant === "cap" ? /* @__PURE__ */ a(l, { children: [
    /* @__PURE__ */ e("path", { d: "M14 60c4-11 11-18 18-18 11 0 17 7 18 18", fill: r.shirt }),
    /* @__PURE__ */ e("path", { d: "M22 50h20", stroke: r.accent, strokeLinecap: "round", strokeWidth: "2.4", opacity: "0.55" })
  ] }) : /* @__PURE__ */ a(l, { children: [
    /* @__PURE__ */ e("path", { d: "M14 60c4-11 11-18 18-18 11 0 17 7 18 18", fill: r.shirt }),
    /* @__PURE__ */ e("path", { d: "M25 47c1.8 1.6 4.2 2.4 7 2.4 2.8 0 5.2-.8 7-2.4", stroke: r.accent, strokeLinecap: "round", strokeWidth: "2", opacity: "0.45" })
  ] });
}
function ee({ spec: r }) {
  return /* @__PURE__ */ a("svg", { viewBox: "0 0 64 64", className: "discord-avatar__art", "aria-hidden": "true", children: [
    /* @__PURE__ */ e("circle", { cx: "32", cy: "32", r: "32", fill: r.backdrop }),
    /* @__PURE__ */ e("circle", { cx: "20", cy: "18", r: "12", fill: r.accent, opacity: "0.16" }),
    /* @__PURE__ */ e("circle", { cx: "49", cy: "50", r: "10", fill: "#ffffff", opacity: "0.06" }),
    /* @__PURE__ */ e(Y, { spec: r }),
    /* @__PURE__ */ e("circle", { cx: "32", cy: "29.5", r: "13.5", fill: r.skin }),
    /* @__PURE__ */ e(J, { spec: r }),
    /* @__PURE__ */ e(Q, { spec: r }),
    /* @__PURE__ */ e(X, { spec: r })
  ] });
}
function re({ spec: r }) {
  return /* @__PURE__ */ a("svg", { viewBox: "0 0 64 64", className: "discord-avatar__art", "aria-hidden": "true", children: [
    /* @__PURE__ */ e("circle", { cx: "32", cy: "32", r: "32", fill: r.backdrop }),
    /* @__PURE__ */ e("circle", { cx: "20", cy: "17", r: "13", fill: r.accent, opacity: "0.18" }),
    /* @__PURE__ */ e("path", { d: "M32 9v7", stroke: r.accent, strokeLinecap: "round", strokeWidth: "4" }),
    /* @__PURE__ */ e("circle", { cx: "32", cy: "8", r: "4", fill: r.accent }),
    /* @__PURE__ */ e("rect", { x: "16", y: "18", width: "32", height: "24", rx: "12", fill: r.shell, stroke: r.outline, strokeWidth: "2.5" }),
    /* @__PURE__ */ e("rect", { x: "22", y: "27", width: "7", height: "7", rx: "3.5", fill: r.eye }),
    /* @__PURE__ */ e("rect", { x: "35", y: "27", width: "7", height: "7", rx: "3.5", fill: r.eye }),
    /* @__PURE__ */ e("path", { d: "M24 39h16", stroke: r.outline, strokeLinecap: "round", strokeWidth: "3.5", opacity: "0.72" }),
    /* @__PURE__ */ e("path", { d: "M20 54c2-8 7-12 12-12s10 4 12 12", fill: r.shell, opacity: "0.92" }),
    /* @__PURE__ */ e("path", { d: "M26 47c2 2 10 2 12 0", stroke: r.outline, strokeLinecap: "round", strokeWidth: "2.4", opacity: "0.62" })
  ] });
}
function W(r) {
  const { className: t = "", name: i, size: c, status: n, style: s, imageUrl: d, variant: f } = r, h = L(i, f), p = c ? { ...s, width: c, height: c } : s;
  return /* @__PURE__ */ a("span", { className: `discord-avatar ${t}`.trim(), style: p, "aria-hidden": "true", title: i, children: [
    d ? /* @__PURE__ */ e("img", { className: "discord-avatar__image", src: d, alt: "" }) : h.kind === "robot" ? /* @__PURE__ */ e(re, { spec: h }) : /* @__PURE__ */ e(ee, { spec: h }),
    n ? /* @__PURE__ */ e("span", { className: `discord-avatar__status discord-avatar__status--${n}` }) : null
  ] });
}
function te({
  eyebrow: r = "Private Desk",
  title: t,
  searchPlaceholder: i,
  items: c
}) {
  return /* @__PURE__ */ a("aside", { className: "conversation-rail", "aria-label": "Direct messages", children: [
    /* @__PURE__ */ a("div", { className: "conversation-rail__header", children: [
      /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ e("p", { className: "conversation-rail__eyebrow", children: r }),
        /* @__PURE__ */ e("h2", { children: t })
      ] }),
      /* @__PURE__ */ e("button", { type: "button", className: "icon-button", children: /* @__PURE__ */ e(_, {}) })
    ] }),
    /* @__PURE__ */ a("label", { className: "search-box", children: [
      /* @__PURE__ */ e(y, {}),
      /* @__PURE__ */ e("input", { type: "text", readOnly: !0, value: "", placeholder: i })
    ] }),
    /* @__PURE__ */ e("div", { className: "conversation-rail__list", children: c.map((n) => /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        className: n.active ? "conversation-item conversation-item--active" : "conversation-item",
        children: [
          /* @__PURE__ */ e(
            W,
            {
              name: n.name,
              size: 42,
              status: n.status,
              variant: n.variant,
              imageUrl: n.imageUrl
            }
          ),
          /* @__PURE__ */ a("span", { className: "conversation-item__meta", children: [
            /* @__PURE__ */ e("strong", { children: n.name }),
            /* @__PURE__ */ e("span", { children: n.subtitle })
          ] }),
          n.unread ? /* @__PURE__ */ e("span", { className: "conversation-item__unread", children: n.unread }) : null
        ]
      },
      n.id
    )) })
  ] });
}
function me({
  shellEyebrow: r,
  title: t,
  subtitle: i,
  topControls: c,
  railEyebrow: n,
  railTitle: s,
  searchPlaceholder: d,
  conversations: f,
  serverItems: h,
  header: p,
  messages: k,
  composerPlaceholder: v,
  infoPanel: b
}) {
  return /* @__PURE__ */ e(
    M,
    {
      shellEyebrow: r,
      title: t,
      subtitle: i,
      topControls: c,
      children: /* @__PURE__ */ e(
        g,
        {
          serverItems: h,
          leftRail: /* @__PURE__ */ e(
            te,
            {
              eyebrow: n,
              title: s,
              searchPlaceholder: d,
              items: f
            }
          ),
          header: p,
          messages: k,
          composerPlaceholder: v,
          infoPanel: b
        }
      )
    }
  );
}
const x = /* @__PURE__ */ new Map();
function ae(r) {
  const t = r.trim().split(/\s+/).filter(Boolean);
  return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : `${t[0][0] ?? ""}${t[1][0] ?? ""}`.toUpperCase();
}
function ne(r, t, i, c) {
  const n = ae(r);
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="${t}" />
      <circle cx="18" cy="17" r="11" fill="${i}" opacity="0.22" />
      <circle cx="48" cy="49" r="10" fill="#ffffff" opacity="0.08" />
      <path d="M14 60c4-11 11-18 18-18 11 0 17 7 18 18" fill="${c}" opacity="0.82" />
      <circle cx="32" cy="28" r="14" fill="#ffffff" opacity="0.14" />
      <text
        x="32"
        y="36"
        text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif"
        font-size="16"
        font-weight="700"
        fill="#f8fbff"
      >${n}</text>
    </svg>
  `;
}
function ie() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#5865f2" />
      <circle cx="20" cy="17" r="13" fill="#8ea0ff" opacity="0.18" />
      <path d="M32 9v7" stroke="#8ea0ff" stroke-linecap="round" stroke-width="4" />
      <circle cx="32" cy="8" r="4" fill="#8ea0ff" />
      <rect x="16" y="18" width="32" height="24" rx="12" fill="#dfe7ff" stroke="#223067" stroke-width="2.5" />
      <rect x="22" y="27" width="7" height="7" rx="3.5" fill="#5865f2" />
      <rect x="35" y="27" width="7" height="7" rx="3.5" fill="#5865f2" />
      <path d="M24 39h16" stroke="#223067" stroke-linecap="round" stroke-width="3.5" opacity="0.72" />
    </svg>
  `;
}
function ce(r, t) {
  const i = `${r}::${t ?? "default"}`, c = x.get(i);
  if (c)
    return c;
  const n = L(r, t), s = n.kind === "robot" ? ie() : ne(
    r,
    n.backdrop,
    n.accent,
    n.shirt
  ), d = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(s)}`;
  return x.set(i, d), d;
}
function le({
  name: r,
  variant: t,
  imageUrl: i
}) {
  return /* @__PURE__ */ e("span", { className: "transcript-avatar", children: /* @__PURE__ */ e(W, { name: r, variant: t, imageUrl: i, size: 40 }) });
}
function oe(r) {
  if (!r.mention)
    return r.content;
  const t = r.content.split(r.mention);
  return t.length === 1 ? /* @__PURE__ */ a(l, { children: [
    /* @__PURE__ */ e(N, { children: r.mention }),
    " ",
    r.content
  ] }) : /* @__PURE__ */ a(l, { children: [
    t[0],
    /* @__PURE__ */ e(N, { children: r.mention }),
    t.slice(1).join(r.mention)
  ] });
}
function se({ messages: r }) {
  return /* @__PURE__ */ e("div", { className: "discord-transcript", children: /* @__PURE__ */ e(S, { className: "discord-transcript__surface", children: r.map((t) => t.role === "system" ? /* @__PURE__ */ a("div", { className: "typing-row", children: [
    /* @__PURE__ */ e(
      le,
      {
        name: t.author,
        variant: t.avatarVariant,
        imageUrl: t.avatarUrl
      }
    ),
    /* @__PURE__ */ a("div", { className: "typing-row__body", children: [
      /* @__PURE__ */ e("span", { className: "typing-row__label", children: t.content }),
      /* @__PURE__ */ a("span", { className: "typing-row__dots", children: [
        /* @__PURE__ */ e("i", {}),
        /* @__PURE__ */ e("i", {}),
        /* @__PURE__ */ e("i", {})
      ] })
    ] })
  ] }, t.id) : /* @__PURE__ */ a(
    D,
    {
      author: t.author,
      bot: t.isBot,
      timestamp: t.timestamp,
      avatar: t.avatarUrl ?? ce(t.author, t.avatarVariant),
      children: [
        oe(t),
        t.embed ? /* @__PURE__ */ a(
          A,
          {
            slot: "embeds",
            color: t.embed.accentColor ?? "#6f86ff",
            embedTitle: t.embed.title,
            children: [
              t.embed.description,
              t.embed.fields?.length ? /* @__PURE__ */ e(U, { slot: "fields", children: t.embed.fields.map((i) => /* @__PURE__ */ e(
                I,
                {
                  fieldTitle: i.title,
                  inline: i.inline,
                  children: i.value
                },
                `${t.id}-${i.title}`
              )) }) : null,
              t.embed.footer ? /* @__PURE__ */ e($, { slot: "footer", children: t.embed.footer }) : null
            ]
          }
        ) : null
      ]
    },
    t.id
  )) }) });
}
const de = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DiscordTranscript: se
}, Symbol.toStringTag, { value: "Module" }));
export {
  pe as CommunityScreen,
  me as DmScreen
};
