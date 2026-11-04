import data from "../i18n/data.json";

const ED: Record<string, any> = data.ed;

// Line glyphs drawn on a 20-point grid, standing in for the SF Symbols the app uses.
const G: Record<string, string> = {
  select: '<path d="M5 3l11 6.5-4.8 1.3L9 15.5z" fill="currentColor"/>',
  crop: '<path d="M6 2v10.5a1.5 1.5 0 0 0 1.5 1.5H18M2 6h10.5A1.5 1.5 0 0 1 14 7.5V18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  arrow: '<path d="M4 16L16 4M8.5 4H16v7.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  line: '<path d="M4 16L16 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  rectangle: '<rect x="3" y="5" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  diamond: '<path d="M10 2.5l7.5 7.5-7.5 7.5L2.5 10z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  ellipse: '<ellipse cx="10" cy="10" rx="7.5" ry="5.5" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  text: '<path d="M3 15.5L7 4.5h1l4 11M4.6 11.5h5.8M13.5 10.5c.5-1 1.4-1.4 2.4-1.4 1.4 0 2.1.8 2.1 2.1v4.3M18 13c-2.6 0-4.2.5-4.2 1.6 0 .8.6 1.1 1.4 1.1 1.3 0 2.8-.9 2.8-2.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
  counter: '<circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8.6 7.6L10.4 6.5v7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  pen: '<path d="M3 14c2-4 4-6 5.5-6S9 12 10.5 12 14 6.5 17 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  pixelate: '<rect x="3" y="3" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3 7.7h14M3 12.3h14M7.7 3v14M12.3 3v14" stroke="currentColor" stroke-width=".9"/><path d="M3.7 3.7h4v4h-4zM12.3 7.7h4v4.6h-4zM7.7 12.3h4.6v4h-4.6z" fill="currentColor"/>',
  undo: '<path d="M7.5 5L4 8.5 7.5 12M4.5 8.5h7a4.5 4.5 0 0 1 0 9H9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  redo: '<path d="M12.5 5L16 8.5 12.5 12M15.5 8.5h-7a4.5 4.5 0 0 0 0 9H11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  inspector: '<rect x="2.5" y="4" width="15" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4v12" stroke="currentColor" stroke-width="1.5"/>',
  copy: '<rect x="6.5" y="6.5" width="10" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 13V4.5A1.5 1.5 0 0 1 5.5 3H12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  save: '<path d="M10 3v9M6.5 8.5L10 12l3.5-3.5M4 14v1.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  check: '<circle cx="10" cy="10" r="8" fill="#34C759"/><path d="M6.5 10.2l2.4 2.4 4.6-5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  chevron: '<path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
};
export const glyph = (k: string) => `<svg viewBox="0 0 20 20" aria-hidden="true">${G[k]}</svg>`;

const O: Record<string, string> = {
  thin: '<path d="M3 10h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  medium: '<path d="M3 10h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
  bold: '<path d="M3 10h14" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
  solid: '<path d="M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  dashed: '<path d="M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="3.5 3.5"/>',
  dotted: '<path d="M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="0 4"/>',
  sharp: '<path d="M4 16V4h12" fill="none" stroke="currentColor" stroke-width="2"/>',
  round: '<path d="M4 16V9a5 5 0 0 1 5-5h7" fill="none" stroke="currentColor" stroke-width="2"/>',
};
const opt = (k: string) => `<svg viewBox="0 0 20 20" aria-hidden="true">${O[k]}</svg>`;

const TOOL_GROUPS = [["select", "crop"], ["arrow", "line", "rectangle", "diamond", "ellipse"], ["text", "counter"], ["pen", "pixelate"]];
const ACTIVE_TOOL: Record<string, string> = { shape: "rectangle", pixel: "pixelate", bg: "select", ar: "text" };

// The app's own palette (scripts/generate-palette.py in the app repository).
const STROKES = ["#1C1F24", "#EA5E59", "#EF852E", "#1AAE54", "#4790FB"];
const FILLS = ["#FFC8C3", "#B0E8BA", "#C1D9FE", "#FFE79D"];

export function shotHTML(mode, lang) {
  const s = ED[lang], dir = lang === "ar" ? "rtl" : "ltr";
  return `<div class="shot" dir="${dir}">
  <div class="col">
    <div class="brand"><i></i>${s.store}</div>
    <b class="h5">${s.sum}</b>
    <div class="item"><i></i><div><b>${s.item}</b><span>${s.itemSub}</span></div></div>
    <div class="line"><span>${s.sub}</span><span class="num">$48.00</span></div>
    <div class="line"><span>${s.tax}</span><span class="num">$0.00</span></div>
    <div class="line total"><span>${s.total}</span><span class="num tot">$48.00<span class="mk mk-ell"></span><svg class="mk mk-arrow" viewBox="0 0 64 34" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5C22 3 42 9 58 25"/><path d="M45.4 21.6L58 25L54.6 12.4"/></svg></span></div>
  </div>
  <div class="col">
    <b class="h5">${s.pay}</b>
    <div><label>${s.email}</label><div class="in"><span class="num">sara@example.com</span></div></div>
    <div class="card"><label>${s.card}</label><div class="in" style="position:relative"><span class="num">4242 4242 4242 4242</span><span class="mosaic"></span><span class="mk mk-pix"></span></div></div>
    <div><label>${s.promo}</label><div class="promo"><div class="in"><span class="ph">${s.promoPh}</span></div><div class="apply">${s.apply}</div><span class="mk mk-box"><i></i><i></i><i></i><i></i></span><span class="mk mk-n mk-n1">1</span><span class="mk mk-note">${s.note}</span></div></div>
    <div class="pay">${s.payBtn}<span class="mk mk-n mk-n2">2</span></div>
  </div>
</div>`;
}

const sec = (title: string, body: string, value = "") =>
  `<div class="ed-sec"><div class="ed-cap"><span>${title}</span>${value ? `<em>${value}</em>` : ""}</div>${body}</div>`;
// With a control name the inspector is live: real buttons and sliders that set a CSS variable on the page (site.ts).
const pick = (ctl: string | undefined, v: string, on: boolean, label: string) =>
  ctl ? `type="button" data-ctl="${ctl}" data-v="${v}" aria-pressed="${on}" aria-label="${label}"` : "";
const swatches = (colors: string[], on: number, none = false, ctl?: string, title = "") => {
  const tag = ctl ? "button" : "i";
  return `<div class="ed-sw">${none ? `<i class="none${on === -1 ? " on" : ""}"></i>` : ""}${colors.map((c, i) => `<${tag} class="${i === on ? "on" : ""}" style="--c:${c}" ${pick(ctl, c, i === on, `${title} ${i + 1}`)}></${tag}>`).join("")}</div>`;
};
const options = (keys: string[], on: number, ctl?: string, title = "", values: string[] = keys) => {
  const tag = ctl ? "button" : "b";
  return `<div class="ed-opts">${keys.map((k, i) => `<${tag} class="${i === on ? "on" : ""}" ${pick(ctl, values[i], i === on, `${title} ${i + 1}`)}>${opt(k)}</${tag}>`).join("")}</div>`;
};
const slider = (v: number, ctl?: string, title = "") => ctl
  ? `<input class="ed-sl ed-range" type="range" min="0" max="100" value="${v}" style="--v:${v}%" data-ctl="${ctl}" aria-label="${title}">`
  : `<div class="ed-sl" style="--v:${v}%"></div>`;
const seg = (labels: string[], on: number) =>
  `<div class="ed-seg">${labels.map((l, i) => `<span class="${i === on ? "on" : ""}">${l}</span>`).join("")}</div>`;

function inspectorHTML(mode: string, s: any, lang: string, live = false) {
  const c = (name: string) => (live ? name : undefined);
  const tabs = seg([s.style, s.bg, s.exp], mode === "bg" ? 1 : 0);
  if (mode === "bg") {
    const fills = ["#E9EDF2", "#4790FB", "#FFA666", "#0AA99B", "#C1D9FE", "#1C1F24", "#DD5DA1", "#ECD2C0"];
    const rows = [[s.padding, "56", 55, "pad"], [s.radius, "12", 30, "rad"], [s.shadow, "30", 40, "shd"]] as const;
    return tabs
      + sec(s.fill, seg([s.grad, s.solid, s.custom, s.none], 1) + `<div class="ed-sw ed-sw-grid">${fills.map((f, i) => live
      ? `<button class="sq${i === 1 ? " on" : ""}" style="--c:${f}" ${pick("fill", f, i === 1, `${s.fill} ${i + 1}`)}></button>`
      : `<i class="sq${i === 0 ? " on" : ""}" style="--c:${f}"></i>`).join("")}</div>`)
      + sec(s.layout, `<div class="ed-group">${rows.map(([l, v, p, ctl]) => `<div class="ed-cap"><span>${l}</span><em>${v}</em></div>${slider(p, c(ctl), l)}`).join("")}</div>`);
  }
  if (mode === "pixel") return tabs + sec(s.look, seg([s.pixels, s.blur], 1)) + sec(s.strength, slider(38, c("blur"), s.strength), "12");
  if (mode === "ar") return tabs + sec(s.color, swatches(STROKES, 1))
    + sec(s.font, `<div class="ed-pop"><span>${lang === "ar" ? "SF Arabic" : "SF Pro"}</span>${glyph("chevron")}</div>`)
    + sec(s.size, slider(42), "28") + sec(s.look, seg([s.plain, s.bubble, s.outline], 1)) + sec(s.dir, seg([s.auto, "LTR", "RTL"], 0));
  const shape = mode === "shape";
  return tabs + sec(s.stroke, swatches(STROKES, shape && !live ? 2 : 1, false, c(shape ? "box" : "mark"), s.stroke)) + sec(s.bg, swatches(FILLS, shape ? 3 : -1, true))
    + sec(s.strokeW, options(["thin", "medium", "bold"], 1) + slider(14), "5")
    + sec(s.strokeS, options(["solid", "dashed", "dotted"], shape ? 1 : 0, shape ? c("dashes") : undefined, s.strokeS))
    + sec(s.edges, options(["sharp", "round"], 1))
    + sec(s.opacity, slider(100), "100%");
}

// The inspector on its own, at true size.
export function inspectorPanelHTML(mode: string, lang: string) {
  return `<div class="ed-in ed-panel" dir="${lang === "ar" ? "rtl" : "ltr"}"><div class="ed-side">${inspectorHTML(mode, ED[lang], lang, true)}</div></div>`;
}

// The Style tab as a plate: a sample mark above the six controls the notes beside it explain.
export function stylePanelHTML(lang: string) {
  const s = ED[lang];
  const row = (id: string, title: string, body: string) => `<div data-part="${id}">${sec(title, body)}</div>`;
  return `<div class="ed-in ed-panel ed-plate" dir="${lang === "ar" ? "rtl" : "ltr"}"><div class="ed-side">
    <div class="plate-sample" aria-hidden="true"><i></i></div>
    ${row("stroke", s.stroke, swatches(STROKES, 1, false, "box", s.stroke))}
    ${row("fill", s.bg, `<div class="ed-sw">${["transparent", ...FILLS].map((c, i) => `<button class="${i === 3 ? "on" : ""}${i === 0 ? " none" : ""}" style="--c:${c}" ${pick("fillc", c, i === 3, `${s.bg} ${i + 1}`)}></button>`).join("")}</div>`)}
    ${row("width", s.strokeW, options(["thin", "medium", "bold"], 1, "sw", s.strokeW, ["2px", "3.5px", "6px"]))}
    ${row("style", s.strokeS, options(["solid", "dashed", "dotted"], 1, "dashes", s.strokeS))}
    ${row("edges", s.edges, options(["sharp", "round"], 1, "corner", s.edges, ["2px", "22px"]))}
    ${row("opacity", s.opacity, slider(100, "op", s.opacity))}
  </div></div>`;
}

// `shot` swaps the drawn page inside the canvas; `live` makes the inspector controls work.
export function edHTML(mode, lang, { shot = shotHTML(mode, lang), live = false } = {}) {
  const s = ED[lang];
  const on = ACTIVE_TOOL[mode];
  const capsule = (keys: string[]) => `<span class="kc">${keys.map(k => `<b class="${k === on ? "on" : ""}">${glyph(k)}</b>`).join("")}</span>`;
  const history = `<span class="kc"><b>${glyph("undo")}</b><b>${glyph("redo")}</b></span>`;
  const status = mode === "mark" && !live ? `<span class="ed-status">${glyph("check")}${s.copied}</span>` : "";
  return `<div class="ed-in" dir="${lang === "ar" ? "rtl" : "ltr"}">
  <div class="ed-bar">
    <span class="ed-tl"><i></i><i></i><i></i></span>
    <span class="ed-name">EasyShoot</span>
    <span class="ed-acts">
      <span class="kc"><span class="pop">${s.presets}${glyph("chevron")}</span><span class="pop" dir="ltr">100%${glyph("chevron")}</span></span>
      <span class="kc"><b>${glyph("inspector")}</b></span>
      <span class="kc"><b>${glyph("copy")}</b><b>${glyph("save")}</b></span>
    </span>
  </div>
  <div class="ed-body">
    <div class="ed-canvas">
      <div class="ed-tools">${TOOL_GROUPS.map(capsule).join("")}${history}</div>
      <div class="frame">${shot}</div>
      ${status}
    </div>
    <div class="ed-side">${inspectorHTML(mode, s, lang, live)}</div>
  </div>
</div>`;
}
