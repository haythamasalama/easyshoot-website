import { animate, press } from "motion";

const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Theme: follows the Mac unless the visitor picks Light or Dark in the footer.
type ThemeChoice = "system" | "light" | "dark";
const themeButtons = [...document.querySelectorAll<HTMLButtonElement>("[data-theme-choice]")];
const currentChoice = (): ThemeChoice => (root.dataset.theme === "light" || root.dataset.theme === "dark" ? root.dataset.theme : "system");
function markThemeChoice() {
  const choice = currentChoice();
  themeButtons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.themeChoice === choice)));
}
themeButtons.forEach(b => b.addEventListener("click", () => {
  const choice = b.dataset.themeChoice as ThemeChoice;
  if (choice === "system") delete root.dataset.theme; else root.dataset.theme = choice;
  try { if (choice === "system") localStorage.removeItem("easyshoot-theme"); else localStorage.setItem("easyshoot-theme", choice); } catch {}
  markThemeChoice();
}));
markThemeChoice();

// Language menu closes on outside click and Escape.
document.querySelectorAll<HTMLAnchorElement>(".lang-menu a[hreflang]").forEach(a => a.addEventListener("click", () => {
  try { localStorage.setItem("easyshoot-lang", a.hreflang); } catch {}
}));
const langMenus = [...document.querySelectorAll<HTMLDetailsElement>("details.lang, details.nav-more")];
document.addEventListener("click", e => { langMenus.forEach(m => { if (m.open && !m.contains(e.target as Node)) m.open = false; }); });
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  langMenus.forEach(m => { if (m.open) { m.open = false; m.querySelector("summary")?.focus(); } });
});

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
    b.closest(".ed-pane")?.querySelectorAll(".last").forEach(x => x.classList.remove("last"));
    b.classList.add("last");
    out().style.setProperty(`--${b.dataset.ctl}`, b.dataset.v!);
  }));
  fig.querySelectorAll<HTMLInputElement>("input[data-ctl]").forEach(i => i.addEventListener("input", () => {
    const share = (+i.value - +i.min) / (+i.max - +i.min);
    i.style.setProperty("--v", `${share * 100}%`);
    out().style.setProperty(`--${i.dataset.ctl}`, String(share));
    const row = i.closest<HTMLElement>(".ed-row");
    const shown = row ? row.querySelector(".ed-cap em") : i.previousElementSibling?.querySelector("em");
    if (shown) shown.textContent = shown.textContent!.replace(/\d+/, i.value);
    row?.classList.toggle("moved", i.value !== row.dataset.def);
  }));
  fig.querySelectorAll<HTMLButtonElement>(".ed-reset").forEach(b => b.addEventListener("click", () => {
    const row = b.closest<HTMLElement>(".ed-row"), input = row?.querySelector<HTMLInputElement>("input");
    if (!row || !input) return;
    input.value = row.dataset.def!;
    input.dispatchEvent(new Event("input"));
  }));
  // Wallpaper, Gradient and Color: each shows its own picks, and keeps the one chosen in it.
  fig.querySelectorAll<HTMLButtonElement>("button[data-pane]").forEach(b => b.addEventListener("click", () => {
    const host = b.closest<HTMLElement>("[data-pane]:not(button)");
    if (!host) return;
    host.dataset.pane = out().dataset.pane = b.dataset.pane!;
    host.querySelectorAll<HTMLButtonElement>("button[data-pane]").forEach(x => {
      x.classList.toggle("on", x === b);
      x.setAttribute("aria-pressed", String(x === b));
    });
    const pane = host.querySelector<HTMLElement>(`.ed-pane[data-for="${b.dataset.pane}"]`);
    (pane?.querySelector<HTMLButtonElement>("button.last") ?? pane?.querySelector<HTMLButtonElement>("button[data-ctl]"))?.click();
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
  press(".btn, .chip-btn, .faq summary, .lang-menu a, .links a, .foot-cols a, .pill-tag, .tongues-names button", el => {
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
