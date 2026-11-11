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
  aspect: '<rect x="2.5" y="4.5" width="15" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 10V7.5H8M14.5 10v2.5H12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
  minus: '<path d="M5 10h10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  plus: '<path d="M5 10h10M10 5v10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  shuffle: '<path d="M3 6.5h3c3.5 0 4.5 7 8 7h3M3 13.5h3c1.5 0 2.5-1.3 3.2-2.8M11 8.3c.7-1 1.6-1.8 3-1.8h3M15 4.5l2 2-2 2M15 11.5l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  rect: '<rect x="3" y="5.5" width="14" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2.5 2"/>',
  window: '<rect x="2.5" y="4" width="15" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2.5 7.5h15" stroke="currentColor" stroke-width="1.5"/>',
};
export const glyph = (k: string) => `<svg viewBox="0 0 20 20" aria-hidden="true">${G[k]}</svg>`;

const O: Record<string, string> = {
  thin: '<path d="M3 10h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  medium: '<path d="M3 10h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
  bold: '<path d="M3 10h14" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
  solid: '<path d="M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  dashed: '<path d="M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="3.5 3.5"/>',
  dotted: '<path d="M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="0 4"/>',
};
const opt = (k: string) => `<svg viewBox="0 0 20 20" aria-hidden="true">${O[k]}</svg>`;

const TOOL_GROUPS = [["select", "crop"], ["arrow", "line", "rectangle", "diamond", "ellipse"], ["text", "counter"], ["pen", "pixelate"]];
const ACTIVE_TOOL: Record<string, string> = { shape: "rectangle", pixel: "pixelate", bg: "select", ar: "text" };

// Apple's system colours, as the app's quick picks (RGBAColor.strokePicks and fillPicks), each fill matching its stroke.
const STROKES = ["#1C1C1E", "#FF3B30", "#FF9500", "#34C759", "#007AFF", "#AF52DE"];
const FILLS = ["#D1D1D6", "#FFC4C1", "#FFDFB3", "#C2EECD", "#B3D7FF", "#E7CBF5"];

// EasyShoot's own wave wallpapers (scripts/generate-waves.swift in the app), as small JPEG copies.
const WALLPAPERS = ["azure-tide", "coral-bay", "violet-hour", "mint-current", "midnight-ripple", "ember-glow", "lagoon-light", "dusk-haze", "rose-quartz", "graphite-silk"];
export const wallpaper = (name: string) => `url(/art/wallpapers/${name}.jpg) center / cover`;
// The first gradients in the app's display order (GradientPreset.displayOrder).
const GRADIENTS = [
  ["#7FD3FF", "#3A8DFF", "#1B4FD8"], ["#06B6D4", "#3B82F6"], ["#34D399", "#059669", "#065F46"], ["#ECFDF5", "#6EE7B7"], ["#22D3EE", "#818CF8", "#C084FC"],
  ["#1E3A8A", "#2563EB", "#38BDF8"], ["#5B6CFF", "#8E5CF6", "#F472B6"], ["#C084FC", "#6366F1", "#312E81"], ["#E9D5FF", "#A78BFA", "#7C3AED"],
].map(c => `linear-gradient(135deg, ${c.join(", ")})`);
const SOLIDS = ["#FFFFFF", "#EEF2F7", "#F3EDE4", "#2A2D33", "#121214", "#007AFF", "#34C759", "#FF9500", "#FF3B30", "#FF2D55", "#AF52DE", "#1C2C86"];

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
const swatches = (colors: string[], on: number, none = false, ctl?: string, title = "", noneLabel = "") => {
  const tag = ctl ? "button" : "i";
  const cell = (c: string, i: number, cls = "") =>
    `<${tag} class="${[cls, i === on ? "on" : ""].join(" ").trim()}" style="--c:${c}" ${pick(ctl, c, i === on, i < 0 ? noneLabel : `${title} ${i + 1}`)}></${tag}>`;
  return `<div class="ed-sw">${none ? cell("transparent", -1, "none") : ""}${colors.map((c, i) => cell(c, i)).join("")}<i class="more" aria-hidden="true"></i></div>`;
};
const options = (keys: string[], on: number, ctl?: string, title = "", values: string[] = keys) => {
  const tag = ctl ? "button" : "b";
  return `<div class="ed-opts">${keys.map((k, i) => `<${tag} class="${i === on ? "on" : ""}" ${pick(ctl, values[i], i === on, `${title} ${i + 1}`)}>${opt(k)}</${tag}>`).join("")}</div>`;
};
const slider = (value: number, ctl?: string, title = "", min = 0, max = 100) =>
  `<input class="ed-range" type="range" min="${min}" max="${max}" value="${value}" style="--v:${((value - min) / (max - min)) * 100}%" ${ctl ? `data-ctl="${ctl}" aria-label="${title}"` : 'disabled aria-hidden="true"'}>`;
const seg = (labels: string[], on: number) =>
  `<div class="ed-seg">${labels.map((l, i) => `<span class="${i === on ? "on" : ""}">${l}</span>`).join("")}</div>`;
// A slider as the app's LabeledSlider draws it: name and value above, and Reset once it moves off its default.
const labeled = (s: any, title: string, value: number, ctl: string | undefined, def: number, unit = "%") =>
  `<div class="ed-row${value !== def ? " moved" : ""}" data-def="${def}"><div class="ed-cap"><span>${title}</span><em>${value}${unit}</em></div><div class="ed-slide">${slider(value, ctl, title)}<button type="button" class="ed-reset"${ctl ? "" : ' tabindex="-1" aria-hidden="true"'}>${s.reset}</button></div></div>`;
const group = (title: string, body: string) => `<div class="ed-sec"><div class="ed-cap"><span>${title}</span></div><div class="ed-group">${body}</div></div>`;

function backgroundHTML(s: any, live: boolean) {
  const c = (name: string) => (live ? name : undefined);
  const tag = live ? "button" : "i";
  const tile = (cls: string, v: string, on: boolean, label: string, bg = v) =>
    `<${tag} class="${cls}${on ? " on" : ""}" style="--c:${bg}" ${pick(c("fill"), v, on, label)}></${tag}>`;
  const kinds = [["wall", s.wall], ["grad", s.grad], ["color", s.color]];
  const kind = `<div class="ed-seg">${kinds.map(([k, l], i) => live
    ? `<button type="button" class="${i === 0 ? "on" : ""}" data-pane="${k}" aria-pressed="${i === 0}">${l}</button>`
    : `<span class="${i === 0 ? "on" : ""}">${l}</span>`).join("")}</div>`;
  const walls = WALLPAPERS.map((w, i) => tile("wp", wallpaper(w), i === 0, `${s.waves} ${i + 1}`, `url(/art/wallpapers/thumb/${w}.jpg) center / cover`)).join("");
  const grads = GRADIENTS.map((g, i) => tile("gr", g, false, `${s.grad} ${i + 1}`)).join("") + `<i class="gr custom" aria-hidden="true"></i>`;
  const solids = SOLIDS.map((f, i) => tile("gr", f, false, `${s.color} ${i + 1}`)).join("");
  const align = `<div class="ed-align" dir="ltr" aria-hidden="true">${Array.from({ length: 9 }, (_, i) => `<i class="${i === 4 ? "on" : ""}"></i>`).join("")}</div>`;
  return group(s.bg, `<div class="ed-tog"><span>${s.showBg}</span><i class="ed-switch" aria-hidden="true"></i></div>${kind}
      <div class="ed-pane" data-for="wall">${seg(["macOS", s.waves, s.grads], 1)}<span class="ed-btn">${glyph("shuffle")}${s.random}</span><div class="ed-thumbs">${walls}</div></div>
      <div class="ed-pane" data-for="grad"><div class="ed-tiles g5">${grads}</div></div>
      <div class="ed-pane" data-for="color"><div class="ed-tiles g6">${solids}</div></div>`)
    + group(s.layout, `<div class="ed-blur">${labeled(s, s.bgBlur, 0, c("blur"), 0)}</div>${labeled(s, s.padding, 20, c("pad"), 20)}${labeled(s, s.corners, 25, c("rad"), 25)}${labeled(s, s.shadow, 24, c("shd"), 24)}${labeled(s, s.shadowOp, 45, c("sho"), 45)}<div class="ed-cap ed-al"><span>${s.align}</span>${align}</div>`);
}

function inspectorHTML(mode: string, s: any, lang: string, live = false) {
  const c = (name: string) => (live ? name : undefined);
  const tabs = seg([s.style, s.bg, s.exp], mode === "bg" ? 1 : 0);
  if (mode === "bg") return `<div class="ed-bg" data-pane="wall">${tabs}${backgroundHTML(s, live)}</div>`;
  if (mode === "pixel") return tabs + sec(s.look, seg([s.pixels, s.blur], 1)) + sec(s.strength, slider(12, c("blur"), s.strength, 3, 30), "12");
  if (mode === "ar") {
    const looks = [s.plain, s.bg, s.soft, s.framed, s.outline, s.dark, s.custom];
    return tabs + sec(s.font, `<div class="ed-pop"><span>${lang === "ar" ? "SF Arabic" : "SF Pro"}</span>${glyph("chevron")}</div>`)
      + sec(s.size, slider(42), "28")
      + sec(s.look, `<div class="ed-looks">${looks.map((l, i) => `<span class="lk${i} ${i === 1 ? "on" : ""}"><i>Aa</i>${l}</span>`).join("")}</div>`)
      + sec(s.dir, seg([s.auto, "LTR", "RTL"], 0));
  }
  const shape = mode === "shape";
  // As the app orders a shape's style: its inside, then its outline.
  return tabs
    + (shape ? sec(s.bg, swatches(FILLS, 2, true, undefined, s.bg, s.none)) : "")
    + sec(shape ? s.stroke : s.color, swatches(STROKES, shape && !live ? 2 : 1, shape, c(shape ? "box" : "mark"), s.stroke, s.none))
    + sec(s.strokeW, options(["thin", "medium", "bold"], 1) + slider(14), "4")
    + sec(s.strokeS, options(["solid", "dashed", "dotted"], shape ? 1 : 0, shape ? c("dashes") : undefined, s.strokeS))
    + (shape ? labeled(s, s.corners, 40, undefined, 40) : "")
    + labeled(s, s.shadow, 0, undefined, 0)
    + labeled(s, s.opacity, 100, undefined, 100);
}

// The inspector on its own, at true size.
export function inspectorPanelHTML(mode: string, lang: string) {
  return `<div class="ed-in ed-panel" dir="${lang === "ar" ? "rtl" : "ltr"}"><div class="ed-side">${inspectorHTML(mode, ED[lang], lang, true)}</div></div>`;
}

// The Style tab as a plate: a sample mark above the six controls the notes beside it explain.
export function stylePanelHTML(lang: string) {
  const s = ED[lang];
  const row = (id: string, title: string, body: string, value = "") => `<div data-part="${id}">${sec(title, body, value)}</div>`;
  return `<div class="ed-in ed-panel ed-plate" dir="${lang === "ar" ? "rtl" : "ltr"}"><div class="ed-side">
    <div class="plate-sample" aria-hidden="true"><i></i></div>
    ${row("fill", s.bg, swatches(FILLS, 3, true, "fillc", s.bg, s.none))}
    ${row("stroke", s.stroke, swatches(STROKES, 3, true, "box", s.stroke, s.none))}
    ${row("width", s.strokeW, options(["thin", "medium", "bold"], 0, "sw", s.strokeW, ["2px", "4px", "8px"]))}
    ${row("style", s.strokeS, options(["solid", "dashed", "dotted"], 0, "dashes", s.strokeS))}
    <div data-part="edges">${labeled(s, s.corners, 40, "corner", 40)}</div>
    <div data-part="opacity">${labeled(s, s.opacity, 100, "op", 100)}</div>
  </div></div>`;
}

// `shot` swaps the drawn page inside the canvas; `live` makes the inspector controls work.
export function edHTML(mode, lang, { shot = shotHTML(mode, lang), live = false } = {}) {
  const s = ED[lang];
  const on = ACTIVE_TOOL[mode];
  const capsule = (keys: string[], cls = "") => `<span class="kc${cls}">${keys.map(k => `<b class="${k === on ? "on" : ""}">${glyph(k)}</b>`).join("")}${cls ? `<b class="fold">${glyph("chevron")}</b>` : ""}</span>`;
  const [first, shapes, ...rest] = TOOL_GROUPS;
  const aspect = `<span class="kc ed-aspect"><span class="pop">${glyph("aspect")}${s.auto}${glyph("chevron")}</span></span>`;
  const status = mode === "mark" && !live ? `<span class="ed-status">${glyph("check")}${s.copied}</span>` : "";
  return `<div class="ed-in" dir="${lang === "ar" ? "rtl" : "ltr"}">
  <div class="ed-bar">
    <span class="ed-tl"><i></i><i></i><i></i></span>
    <span class="ed-name">EasyShoot</span>
    <span class="ed-acts">
      <span class="kc"><b>${glyph("undo")}</b><b>${glyph("redo")}</b></span>
      <span class="kc"><span class="pop">${s.presets}${glyph("chevron")}</span></span>
      <span class="kc"><b>${glyph("copy")}</b><b>${glyph("save")}</b></span>
      <span class="kc"><b>${glyph("inspector")}</b></span>
    </span>
  </div>
  <div class="ed-body">
    <div class="ed-canvas">
      <div class="ed-tools">${capsule(first)}${aspect}${capsule(shapes, " ed-shapes")}${rest.map(g => capsule(g)).join("")}</div>
      <div class="frame">${shot}</div>
      <span class="kc ed-zoom" dir="ltr"><b>${glyph("minus")}</b><span class="pop">100%</span><b>${glyph("plus")}</b></span>
      ${status}
    </div>
    <div class="ed-side">${inspectorHTML(mode, s, lang, live)}</div>
  </div>
</div>`;
}
