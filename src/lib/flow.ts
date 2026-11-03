import data from "../i18n/data.json";
import { glyph } from "./editor";

const ED: Record<string, Record<string, string>> = data.ed;
const UI = data.ui as Record<string, Record<string, string>>;

const icon = (d: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
const qaButton = (name: string, label: string, d: string) =>
  `<button type="button" data-qa="${name}" aria-label="${label}"><span class="go">${icon(d)}</span><span class="ok">${icon("M5 12.5l4.5 4.5L19 7")}</span></button>`;

// One story in four pictures: the same checkout page is selected, floats in the corner, gets marked up, then lands in a chat.
export function flowArt(lang: string) {
  const s = ED[lang], t = UI[lang], dir = lang === "ar" ? "rtl" : "ltr";
  const bar = `<div class="fx-bar"><i></i><i></i><i></i></div>`;
  const { rows, page } = checkout(lang);
  return flowScenes(lang, dir, s, t, bar, rows, page);
}

function checkout(lang: string) {
  const s = ED[lang], t = UI[lang];
  const rows = (marked = false) => `<div class="cap-item"><i></i><div><b>${s.item}</b><span>${s.itemSub}</span></div>${marked ? `<span class="fx-box"></span><span class="fx-n fx-n2">2</span><span class="fx-note">${t["chat.2"]}</span>` : ""}</div>
    <div class="cap-line"><span>${s.total}</span><b class="num">$48.00</b>${marked ? `<svg class="fx-arrow" viewBox="0 0 60 40" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M56 34C38 36 20 26 12 8"/><path d="M4 18l8-10 10 7"/></svg>` : ""}</div>`;
  const page = (inner: string, marked = false) => `<div class="cap"><div class="cap-brand"><i></i>${s.store}${marked ? '<span class="fx-n fx-n1">1</span>' : ""}</div>${inner}<div class="cap-pay">${s.payBtn}</div></div>`;
  return { rows, page };
}

function flowScenes(lang: string, dir: string, s: Record<string, string>, t: Record<string, string>, bar: string, rows: (m?: boolean) => string, page: (i: string, m?: boolean) => string) {
  const select = `<div class="fx" dir="${dir}"><div class="fx-win">${bar}${page(`<div class="fx-target">${rows()}<span class="fx-sel"><span class="fx-size" dir="ltr">1280 × 720</span><svg class="fx-cross" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 0v18M0 9h18" stroke="#fff" stroke-width="1.6"/></svg></span></div>`)}</div></div>`;

  const quick = `<div class="fx" dir="${dir}"><div class="fx-win fx-back">${bar}${page(rows())}</div>
    <div class="qa-live"><div class="qa-shot"><div class="cap">${rows()}</div></div>
      <div class="qa-ui">
        <div class="qa-top"><button class="qa-x qa-glass" type="button" data-qa="close" aria-label="${t["ui.close"]}">${icon("M6 6l12 12M18 6L6 18")}</button><span class="qa-px qa-glass" dir="ltr">1280 × 720</span></div>
        <div class="qa-bar qa-glass">${qaButton("copy", t["ui.copy"], "M9 9h10v11H9zM5 15V5a1 1 0 0 1 1-1h9")}${qaButton("save", t["ui.save"], "M12 3v11M8 10l4 4 4-4M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3")}${qaButton("edit", t["ui.edit"], "M4 20l1.2-4.2L16 5l3 3L8.2 18.8zM14 7l3 3")}</div>
      </div>
    </div></div>`;

  const tools = ["arrow", "rectangle", "text", "counter", "pixelate"].map(k => `<b class="${k === "counter" ? "on" : ""}">${glyph(k)}</b>`).join("");
  const mark = `<div class="fx" dir="${dir}" aria-hidden="true"><div class="fx-win fx-editor">${bar}<div class="fx-tools">${tools}</div><div class="fx-canvas">${page(rows(true), true)}</div></div></div>`;

  const share = `<div class="fx" dir="${dir}" aria-hidden="true"><div class="fx-win fx-chat">${bar}<div class="fx-msgs">
      <span class="bub in">${t["chat.1"]}</span>
      <span class="bub img">${page(rows(true), true)}</span>
      <span class="bub out">${t["chat.2"]}</span>
    </div><div class="fx-input"></div></div></div>`;

  return { select, quick, mark, share };
}

const fileIcon = (ext: string, on = false) => `<span class="ma-file${on ? " on" : ""}"><svg viewBox="0 0 64 80" aria-hidden="true"><path class="sheet" d="M10 2h32l20 20v48a8 8 0 0 1-8 8H10a8 8 0 0 1-8-8V10a8 8 0 0 1 8-8z"/><path class="fold" d="M42 2l20 20H50a8 8 0 0 1-8-8z"/></svg><b>${ext}</b></span>`;

// Pictures for the "small things": each one shows its feature instead of a lone control.
export function moreArt(lang: string) {
  const t = UI[lang], dir = lang === "ar" ? "rtl" : "ltr";
  const { rows, page } = checkout(lang);
  const shot = page(rows());
  const total = `<div class="cap-line"><span>${ED[lang].total}</span><b class="num">$48.00</b></div>`;
  const frame = (cls: string, name: string) => `<div class="ma-preset ${cls}"><div class="ma-frame"><div class="ma-sheet">${total}</div></div><span>${name}</span></div>`;
  const keys = (list: string[], big = false) => `<span class="ma-keys${big ? " big" : ""}" dir="ltr">${list.map(k => `<kbd>${k}</kbd>`).join("")}</span>`;
  const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  return {
    presets: `<div class="ma ma-presets" dir="${dir}">${frame("p1 on", t["pr.plain"])}${frame("p2", t["pr.dark"])}${frame("p3", "Social 16:9")}</div>`,
    crop: `<div class="ma ma-crop" dir="${dir}"><div class="ma-cropped"><div class="ma-sheet"><div class="cap">${rows()}</div></div><span class="ma-cropbox"><i></i><i></i><i></i><i></i></span><span class="ma-size" dir="ltr">1600 × 900</span></div></div>`,
    zoom: `<div class="ma ma-zoom" dir="ltr"><span class="cap-pay">${ED[lang].payBtn}</span><span class="ma-zoomctl"><i>−</i><b>200%</b><i>+</i></span></div>`,
    keys: `<div class="ma ma-shortcut" dir="${dir}"><div><span>${t["mode.area"]}</span>${keys(["⌥", "⇧", "⌘", "4"], true)}</div><div><span>${t["mode.window"]}</span>${keys(["⌥", "⇧", "⌘", "5"])}</div></div>`,
    formats: `<div class="ma ma-formats" dir="ltr">${fileIcon("JPEG")}${fileIcon("PNG", true)}${fileIcon("HEIC")}${fileIcon("TIFF")}</div>`,
    theme: `<div class="ma ma-theme" dir="${dir}"><div class="ma-half light"><span class="ma-sheet">${shot}</span></div><div class="ma-half dark"><span class="ma-sheet">${shot}</span></div><span class="ma-sw"><i>${sun}</i><i>${moon}</i></span></div>`,
  };
}
