import { animate, press } from "motion";

const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Theme: follows the Mac until the visitor picks one.
const themeBtn = document.getElementById("themeBtn");
const darkQuery = matchMedia("(prefers-color-scheme: dark)");
const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : darkQuery.matches);
function updateThemeLabel() {
  if (!themeBtn) return;
  themeBtn.setAttribute("aria-label", (isDark() ? themeBtn.dataset.toLight : themeBtn.dataset.toDark) ?? "");
}
function applyTheme(next: "light" | "dark") {
  root.dataset.theme = next;
  try { localStorage.setItem("easyshoot-theme", next); } catch {}
  updateThemeLabel();
}
// The new theme grows out of the button in a circle; browsers without view transitions just switch.
themeBtn?.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  if (!themeBtn) return;
  if (!reduce) animate(themeBtn.querySelectorAll("svg"), { rotate: [-90, 0], scale: [0.4, 1] }, { type: "spring", bounce: 0.4, duration: 0.6 });
  const start = (document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }).startViewTransition;
  if (reduce || !start) return applyTheme(next);
  const r = themeBtn.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const t = start.call(document, () => applyTheme(next));
  t.ready.then(() => {
    root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 650, easing: "cubic-bezier(.2,.8,.2,1)", pseudoElement: "::view-transition-new(root)" });
  });
});
darkQuery.addEventListener("change", updateThemeLabel);
updateThemeLabel();

// Language menu closes on outside click and Escape.
const langMenu = document.querySelector<HTMLDetailsElement>("details.lang");
document.addEventListener("click", e => { if (langMenu?.open && !(e.target as Element).closest("details.lang")) langMenu.open = false; });
document.addEventListener("keydown", e => { if (e.key === "Escape" && langMenu?.open) { langMenu.open = false; langMenu.querySelector("summary")?.focus(); } });

// Press kit: copy a ready-made description.
document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach(b => b.addEventListener("click", async () => {
  const text = document.getElementById(b.dataset.copy!)?.textContent ?? "";
  try { await navigator.clipboard.writeText(text); } catch { return; }
  const label = b.textContent;
  b.textContent = b.dataset.done ?? label;
  setTimeout(() => (b.textContent = label), 1600);
}));

// Table of contents follows the section in view.
const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>(".doc-toc a")];
if (tocLinks.length && "IntersectionObserver" in window) {
  const byId = new Map(tocLinks.map(a => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    tocLinks.forEach(a => a.classList.remove("on"));
    byId.get(e.target.id)?.classList.add("on");
  }), { rootMargin: "-20% 0px -70% 0px" });
  byId.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
}

// Live inspector controls: each sets a CSS variable on its figure, so whatever it holds changes with it.
document.querySelectorAll<HTMLElement>("[data-controls]").forEach(fig => {
  const out = () => (fig.dataset.target ? document.querySelector<HTMLElement>(fig.dataset.target) : fig) ?? fig;
  fig.querySelectorAll<HTMLButtonElement>("button[data-ctl]").forEach(b => b.addEventListener("click", () => {
    fig.querySelectorAll<HTMLButtonElement>(`button[data-ctl="${b.dataset.ctl}"]`).forEach(x => {
      x.classList.toggle("on", x === b);
      x.setAttribute("aria-pressed", String(x === b));
    });
    out().style.setProperty(`--${b.dataset.ctl}`, b.dataset.v!);
  }));
  fig.querySelectorAll<HTMLInputElement>("input[data-ctl]").forEach(i => i.addEventListener("input", () => {
    i.style.setProperty("--v", `${i.value}%`);
    out().style.setProperty(`--${i.dataset.ctl}`, String(+i.value / 100));
  }));
});

// Quick Access card: Copy and Save confirm, Edit opens the tools, Close slides the thumbnail away and back.
document.querySelectorAll<HTMLElement>(".qa-live").forEach(card => {
  card.querySelectorAll<HTMLButtonElement>("[data-qa]").forEach(b => b.addEventListener("click", () => {
    if (b.dataset.qa === "close") {
      card.classList.add("gone");
      setTimeout(() => card.classList.remove("gone"), 1400);
    } else if (b.dataset.qa === "edit") {
      document.getElementById("tools")?.scrollIntoView();
    } else {
      b.classList.add("done");
      setTimeout(() => b.classList.remove("done"), 1200);
    }
  }));
  // Shows the controls once when the card comes into view, so visitors know they are there.
  new IntersectionObserver((es, o) => {
    if (!es[0].isIntersecting) return;
    o.disconnect();
    card.classList.add("on");
    setTimeout(() => card.classList.remove("on"), 2600);
  }).observe(card);
});

// The pinned window follows the statement in view.
const steps = [...document.querySelectorAll<HTMLElement>(".pin-step")];
const wins = [...document.querySelectorAll<HTMLElement>(".pin-win")];
if (steps.length) {
  steps[0].classList.add("on");
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    steps.forEach(x => x.classList.toggle("on", x === e.target));
    wins.forEach((w, i) => w.classList.toggle("on", i === +(e.target as HTMLElement).dataset.step!));
  }), { rootMargin: "-40% 0px -50% 0px" });
  steps.forEach(x => spy.observe(x));
}

// Notes beside the style panel: level with the control they explain, which they light up while pointed at.
const plate = document.querySelector<HTMLElement>(".plate-panel");
if (plate) {
  const notes = [...document.querySelectorAll<HTMLElement>(".note")];
  const partOf = (n: HTMLElement) => plate.querySelector<HTMLElement>(`[data-part="${n.dataset.note}"]`);
  const align = () => {
    const wide = innerWidth > 1100;
    const floor = new Map<Element, number>();
    notes.forEach(n => {
      n.classList.toggle("placed", wide);
      const part = partOf(n), side = n.parentElement;
      if (!wide || !part || !side) return n.style.removeProperty("top");
      const lowest = floor.get(side) ?? 0;
      const top = Math.max(part.getBoundingClientRect().top - side.getBoundingClientRect().top, lowest);
      n.style.top = `${top}px`;
      floor.set(side, top + n.offsetHeight + 16);
    });
  };
  align();
  addEventListener("resize", align);
  notes.forEach(n => {
    n.addEventListener("pointerenter", () => { n.classList.add("hot"); partOf(n)?.classList.add("hot"); });
    n.addEventListener("pointerleave", () => { n.classList.remove("hot"); partOf(n)?.classList.remove("hot"); });
  });
}

// Languages: each name brings up the same line and the same page in that language.
document.querySelectorAll<HTMLButtonElement>("[data-show]").forEach((b, _, all) => b.addEventListener("click", () => {
  all.forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  document.querySelectorAll<HTMLElement>(".tongue").forEach(p => p.classList.toggle("on", p.dataset.lang === b.dataset.show));
}));

// Every button and control gives a small spring when pressed.
if (!reduce) {
  press(".btn, .chip-btn, .faq summary, .lang-menu a, .links a, .foot-cols a, .foot-langs a, .pill-tag, .tongues-names button", el => {
    animate(el, { scale: 0.94 }, { type: "spring", stiffness: 600, damping: 30 });
    return () => animate(el, { scale: 1 }, { type: "spring", bounce: 0.55, duration: 0.45 });
  });
}

// Parts of a section rise in once, in reading order. Hidden here rather than in the CSS, so nothing stays hidden if this script never runs.
if (!reduce && !document.hidden && "IntersectionObserver" in window) {
  const parts = [...document.querySelectorAll<HTMLElement>(".rise, .reveal")];
  parts.forEach(p => {
    p.classList.add("rise", "wait");
    const sibs = [...(p.parentElement?.children ?? [])].filter(c => c.classList.contains("rise"));
    p.style.setProperty("--d", `${Math.min(Math.max(0, sibs.indexOf(p)), 5) * 0.075}s`);
  });
  const show = new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting) return;
    (e.target as HTMLElement).classList.remove("wait");
    o.unobserve(e.target);
  }), { rootMargin: "0px 0px -8% 0px" });
  parts.forEach(p => show.observe(p));
  // A throttled or background tab may never report them in view: never leave what is on screen hidden.
  setTimeout(() => parts.forEach(p => {
    if (!p.classList.contains("wait") || p.getBoundingClientRect().top >= innerHeight) return;
    p.style.transition = "none";
    p.classList.remove("wait");
  }), 1800);
}
