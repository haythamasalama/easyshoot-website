const SVG = "http://www.w3.org/2000/svg";

const KEYS: Record<string, string> = { a: "arrow", r: "rectangle", d: "diamond", o: "ellipse", t: "text", n: "counter", p: "pen", b: "pixelate" };
const DRAWN = new Set(["arrow", "line", "rectangle", "diamond", "ellipse", "pen", "pixelate"]);
const STROKE = 3.5;
const RED = "#EA5E59";

type Point = { x: number; y: number };

const svgEl = (name: string, attrs: Record<string, string | number>) => {
  const el = document.createElementNS(SVG, name);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
  return el;
};

// The hero's window: the tools draw on the page in it, so the visitor makes the page's first screenshot themselves.
export function initLiveEditor(root: HTMLElement) {
  const canvas = root.querySelector<HTMLElement>(".ed-canvas");
  const frame = root.querySelector<HTMLElement>(".frame");
  if (!canvas || !frame) return;

  const layer = document.createElement("div");
  layer.className = "mk-layer";
  const board = svgEl("svg", { "aria-hidden": "true" }) as SVGSVGElement;
  layer.append(board);
  frame.append(layer);

  const status = root.querySelector<HTMLElement>(".ed-hint");
  const buttons = [...root.querySelectorAll<HTMLButtonElement>("[data-tool]")];
  const done: Element[] = [];
  const undone: Element[] = [];
  let tool = "counter";
  let width = 0, height = 0;
  let step = 3;
  let placed = 0;

  // The drawing is in points of the frame's size when first touched; the window scales uniformly afterwards.
  const prepare = () => {
    if (width) return;
    width = frame.clientWidth;
    height = frame.clientHeight;
    board.setAttribute("viewBox", `0 0 ${width} ${height}`);
  };
  const at = (e: PointerEvent): Point => {
    const r = frame.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (width / r.width), y: (e.clientY - r.top) * (height / r.height) };
  };
  const colour = () => getComputedStyle(root).getPropertyValue("--mark").trim() || RED;

  const select = (next: string) => {
    tool = next;
    buttons.forEach(b => {
      const on = b.dataset.tool === next;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", String(on));
    });
  };

  let demoing = false;
  const commit = (el: Element) => {
    done.push(el);
    undone.length = 0;
    if (!demoing && !placed++ && status) status.hidden = true;
  };
  const undo = () => {
    const el = done.pop();
    if (!el) return;
    el.remove();
    undone.push(el);
    if (el.classList.contains("mk-step")) step--;
  };
  const redo = () => {
    const el = undone.pop();
    if (!el) return;
    (el instanceof HTMLElement ? layer : board).append(el);
    done.push(el);
    if (el.classList.contains("mk-step")) step++;
  };

  const addStep = (p: Point) => {
    const g = svgEl("g", { class: "mk-step", transform: `translate(${p.x} ${p.y})` });
    g.append(svgEl("circle", { r: 14, fill: colour(), stroke: "#FFFFFF", "stroke-width": 2.5 }));
    const label = svgEl("text", { "text-anchor": "middle", "dominant-baseline": "central", fill: "#FFFFFF", "font-size": 15, "font-weight": 700 });
    label.textContent = String(step++);
    g.append(label);
    board.append(g);
    commit(g);
  };

  const addText = (p: Point) => {
    const note = document.createElement("span");
    note.className = "mk-text";
    note.contentEditable = "true";
    note.dir = "auto";
    note.spellcheck = false;
    note.textContent = root.dataset.note ?? "";
    note.style.cssText = `left:${(p.x / width) * 100}%;top:${(p.y / height) * 100}%;background:${colour()}`;
    layer.append(note);
    commit(note);
    note.focus();
    getSelection()?.selectAllChildren(note);
  };

  const box = (a: Point, b: Point) => ({ x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), w: Math.abs(a.x - b.x), h: Math.abs(a.y - b.y) });

  const startShape = (name: string, a: Point): { update: (b: Point) => void; el: Element } => {
    const paint = { fill: "none", stroke: colour(), "stroke-width": STROKE, "stroke-linecap": "round", "stroke-linejoin": "round" };
    if (name === "pixelate") {
      const el = document.createElement("span");
      el.className = "mk-blur";
      layer.append(el);
      return { el, update: b => {
        const r = box(a, b);
        el.style.cssText = `left:${(r.x / width) * 100}%;top:${(r.y / height) * 100}%;width:${(r.w / width) * 100}%;height:${(r.h / height) * 100}%`;
      } };
    }
    if (name === "rectangle") {
      const el = svgEl("rect", { ...paint, rx: 8 });
      board.append(el);
      return { el, update: b => { const r = box(a, b); el.setAttribute("x", String(r.x)); el.setAttribute("y", String(r.y)); el.setAttribute("width", String(r.w)); el.setAttribute("height", String(r.h)); } };
    }
    if (name === "ellipse") {
      const el = svgEl("ellipse", paint);
      board.append(el);
      return { el, update: b => { const r = box(a, b); el.setAttribute("cx", String(r.x + r.w / 2)); el.setAttribute("cy", String(r.y + r.h / 2)); el.setAttribute("rx", String(r.w / 2)); el.setAttribute("ry", String(r.h / 2)); } };
    }
    if (name === "pen") {
      const el = svgEl("path", { ...paint, d: `M${a.x} ${a.y}` });
      board.append(el);
      return { el, update: b => el.setAttribute("d", `${el.getAttribute("d")}L${b.x} ${b.y}`) };
    }
    const el = svgEl("path", paint);
    board.append(el);
    return { el, update: b => {
      if (name === "diamond") {
        const r = box(a, b), cx = r.x + r.w / 2, cy = r.y + r.h / 2;
        el.setAttribute("d", `M${cx} ${r.y}L${r.x + r.w} ${cy}L${cx} ${r.y + r.h}L${r.x} ${cy}Z`);
      } else if (name === "line") {
        el.setAttribute("d", `M${a.x} ${a.y}L${b.x} ${b.y}`);
      } else {
        const angle = Math.atan2(b.y - a.y, b.x - a.x), head = 16;
        const left = `${b.x - head * Math.cos(angle - .5)} ${b.y - head * Math.sin(angle - .5)}`;
        const right = `${b.x - head * Math.cos(angle + .5)} ${b.y - head * Math.sin(angle + .5)}`;
        el.setAttribute("d", `M${a.x} ${a.y}L${b.x} ${b.y}M${left}L${b.x} ${b.y}L${right}`);
      }
    } };
  };

  // A tap or Enter has no drag to size the mark, so each tool has a natural size of its own.
  const tapSize: Record<string, Point> = { arrow: { x: 70, y: -46 }, line: { x: 90, y: 0 }, rectangle: { x: 130, y: 70 }, diamond: { x: 90, y: 90 }, ellipse: { x: 120, y: 70 }, pen: { x: 90, y: 24 }, pixelate: { x: 130, y: 34 } };

  const place = (p: Point) => {
    if (tool === "counter") return addStep(p);
    if (tool === "text") return addText(p);
    if (!DRAWN.has(tool)) return;
    const s = startShape(tool, p), size = tapSize[tool];
    s.update({ x: p.x + size.x, y: p.y + size.y });
    commit(s.el);
  };

  // Under a mouse, the next step shows where it would land.
  const ghost = svgEl("g", { class: "mk-ghost" });
  ghost.append(svgEl("circle", { r: 14, fill: RED, stroke: "#FFFFFF", "stroke-width": 2.5 }));
  const ghostLabel = svgEl("text", { "text-anchor": "middle", "dominant-baseline": "central", fill: "#FFFFFF", "font-size": 15, "font-weight": 700 });
  ghost.append(ghostLabel);
  const hideGhost = () => ghost.remove();
  const showGhost = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || tool !== "counter" || (e.target as Element).closest(".ed-tools")) return hideGhost();
    prepare();
    const p = at(e);
    ghost.setAttribute("transform", `translate(${p.x} ${p.y})`);
    ghostLabel.textContent = String(step);
    ghost.querySelector("circle")?.setAttribute("fill", colour());
    if (!ghost.isConnected) board.append(ghost);
  };
  canvas.addEventListener("pointerleave", hideGhost);

  let active: { update: (b: Point) => void; el: Element } | null = null;
  let origin: Point | null = null;
  let moved = false;

  canvas.addEventListener("pointerdown", e => {
    if (e.button !== 0 || (e.target as Element).closest("button, .mk-text, .ed-tools")) return;
    prepare();
    hideGhost();
    origin = at(e);
    moved = false;
    if (DRAWN.has(tool)) canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", e => {
    if (!origin) showGhost(e);
    if (!origin || !DRAWN.has(tool)) return;
    const p = at(e);
    if (!moved && Math.hypot(p.x - origin.x, p.y - origin.y) < 6) return;
    if (!moved) { active = startShape(tool, origin); moved = true; }
    active?.update(p);
  });
  const finish = (e: PointerEvent) => {
    if (!origin) return;
    if (active) commit(active.el);
    else if (e.type === "pointerup") place(origin);
    active = null;
    origin = null;
  };
  canvas.addEventListener("pointerup", finish);
  canvas.addEventListener("pointercancel", finish);

  let nudge = 0;
  canvas.addEventListener("keydown", e => {
    if (e.target !== canvas || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    prepare();
    nudge = (nudge + 1) % 6;
    place({ x: width * (.3 + nudge * .08), y: height * (.3 + nudge * .07) });
  });

  buttons.forEach(b => b.addEventListener("click", () => select(b.dataset.tool!)));
  root.querySelector("[data-act=undo]")?.addEventListener("click", undo);
  root.querySelector("[data-act=redo]")?.addEventListener("click", redo);

  // Single-letter keys only count while the window has the pointer or the focus, so they never fight the browser's own.
  document.addEventListener("keydown", e => {
    const here = root.matches(":hover") || root.contains(document.activeElement);
    const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || e.target.matches("input"));
    if (!here || typing) return;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
      e.preventDefault();
      if (e.shiftKey) redo(); else undo();
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const next = KEYS[e.key.toLowerCase()];
    if (next) select(next);
  });

  // Once, before anyone touches it, a pointer shows that this window works: it picks a tool and marks the page.
  const showDemo = async (field: HTMLElement) => {
    const boxTool = root.querySelector<HTMLElement>('[data-tool="rectangle"]');
    const stepTool = root.querySelector<HTMLElement>('[data-tool="counter"]');
    if (!boxTool || !stepTool) return;
    let stopped = false;
    const pointer = document.createElement("span");
    pointer.className = "demo-pointer";
    pointer.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6 2-3 6z"/></svg>';
    canvas.append(pointer);
    const stop = () => { stopped = true; pointer.remove(); };
    ["pointerdown", "keydown"].forEach(type => root.addEventListener(type, stop, { once: true, capture: true }));
    // Browsers fire pointer events under a resting mouse when the page moves, so only real movement counts.
    const moved2 = (e: PointerEvent) => { if (Math.hypot(e.movementX, e.movementY) > 1) { stop(); root.removeEventListener("pointermove", moved2); } };
    root.addEventListener("pointermove", moved2);

    const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
    const box = () => canvas.getBoundingClientRect();
    let spot = { x: box().width * .55, y: box().height * .78 };
    const glide = (x: number, y: number, ms: number, easing = "cubic-bezier(.45,0,.2,1)") => {
      const from = `translate(${spot.x}px, ${spot.y}px)`;
      spot = { x, y };
      return pointer.animate([{ transform: from }, { transform: `translate(${x}px, ${y}px)` }], { duration: ms, easing, fill: "forwards" }).finished;
    };
    const toTool = async (el: HTMLElement, name: string) => {
      const r = el.getBoundingClientRect(), c = box();
      await glide(r.left - c.left + r.width / 2, r.top - c.top + r.height / 2, 750);
      if (stopped) return;
      el.animate([{ scale: 1 }, { scale: .86 }, { scale: 1 }], { duration: 220 });
      select(name);
      await wait(260);
    };

    prepare();
    demoing = true;
    pointer.style.transform = `translate(${spot.x}px, ${spot.y}px)`;
    await pointer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 }).finished;
    await toTool(boxTool, "rectangle");
    if (stopped) { demoing = false; select("counter"); return; }

    const r = field.getBoundingClientRect(), c = box(), f = frame.getBoundingClientRect();
    const scale = width / f.width, pad = 6;
    const a = { x: (r.left - f.left - pad) * scale, y: (r.top - f.top - pad) * scale };
    const b = { x: (r.right - f.left + pad) * scale, y: (r.bottom - f.top + pad) * scale };
    await glide(r.left - c.left - pad, r.top - c.top - pad, 700);
    if (stopped) { demoing = false; select("counter"); return; }
    const shape = startShape("rectangle", a);
    const started = performance.now(), length = 650;
    const dragged = glide(r.right - c.left + pad, r.bottom - c.top + pad, length, "linear");
    await new Promise<void>(done2 => {
      const tick = (now: number) => {
        const k = Math.min(1, (now - started) / length);
        shape.update({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });
        if (k < 1 && !stopped) requestAnimationFrame(tick); else done2();
      };
      requestAnimationFrame(tick);
    });
    await dragged.catch(() => {});
    if (stopped) { shape.el.remove(); demoing = false; select("counter"); return; }
    commit(shape.el);
    await wait(180);

    await toTool(stepTool, "counter");
    if (!stopped) {
      const rtl = getComputedStyle(field).direction === "rtl";
      const x = rtl ? r.right - c.left + pad + 20 : r.left - c.left - pad - 20, y = r.top - c.top + r.height / 2;
      await glide(x, y, 600);
      if (!stopped) addStep({ x: (x + c.left - f.left) * scale, y: (y + c.top - f.top) * scale });
    }
    demoing = false;
    if (stopped) return;
    await wait(350);
    await pointer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" }).finished;
    pointer.remove();
  };

  const demoField = [...frame.querySelectorAll<HTMLElement>(".in")].find(el => el.offsetWidth > 0);
  if (demoField && !matchMedia("(prefers-reduced-motion: reduce)").matches && !document.hidden && "IntersectionObserver" in window) {
    new IntersectionObserver((es, o) => {
      if (!es[0].isIntersecting) return;
      o.disconnect();
      setTimeout(() => { showDemo(demoField).catch(() => {}); }, 1300);
    }, { threshold: 1, rootMargin: "-72px 0px -40px 0px" }).observe(demoField);
  }
}
