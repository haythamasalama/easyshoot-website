import { execFileSync } from "node:child_process";

// Search engines trust lastmod only while it is accurate, so a page's date moves only when its own text changes.

const git = args => {
  try {
    return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
};

// A shallow clone (actions/checkout's default) would date every page to the last commit.
const usable = git(["rev-parse", "--is-shallow-repository"]) === "false";
if (!usable) console.warn("[dates] No full git history: pages get no lastmod. Check out with fetch-depth: 0.");

const logs = new Map();
const commitsOf = file => {
  if (!logs.has(file)) {
    const lines = usable ? git(["log", "--format=%H %ct", "--", file]).split("\n").filter(Boolean) : [];
    logs.set(file, lines.map(l => {
      const [sha, ct] = l.split(" ");
      return { sha, date: new Date(Number(ct) * 1000).toISOString() };
    }));
  }
  return logs.get(file);
};

const shown = new Map();
const jsonAt = (sha, file) => {
  const key = `${sha}:${file}`;
  if (!shown.has(key)) {
    let value;
    try { value = JSON.parse(git(["show", key])); } catch {}
    shown.set(key, value);
  }
  return shown.get(key);
};
const pick = (value, keys) => keys.reduce((v, k) => v?.[k], value);

export function jsonChanged(file, keys = []) {
  const log = commitsOf(file);
  for (let i = 0; i < log.length; i++) {
    const now = JSON.stringify(pick(jsonAt(log[i].sha, file), keys));
    const before = log[i + 1] ? JSON.stringify(pick(jsonAt(log[i + 1].sha, file), keys)) : undefined;
    if (now !== before) return now === undefined ? undefined : log[i].date;
  }
}

export function jsonAdded(file, keys = []) {
  const log = commitsOf(file);
  for (let i = log.length - 1; i >= 0; i--) {
    if (pick(jsonAt(log[i].sha, file), keys) !== undefined) return log[i].date;
  }
}

export const fileChanged = file => commitsOf(file)[0]?.date;

const latest = (...dates) => dates.filter(Boolean).sort().at(-1);

// Each URL maps to the content it renders. Shared layout, styles and navigation are left out on purpose.
export function pageModified(pathname) {
  const m = pathname.match(/^\/(?:(ar|fr|es|de)\/)?(.*)$/);
  if (!m) return;
  const lang = m[1] ?? "en";
  const rest = m[2];
  const docs = `src/i18n/docs/${lang}.json`;
  const articles = `src/i18n/articles/${lang}.json`;
  const inLang = (file, keys) => jsonChanged(file, keys) ?? jsonChanged(file.replace(`/${lang}.json`, "/en.json"), keys);
  let r;
  if (rest === "" || rest === "index.html") return latest(...["ui", "tabs", "shots", "dash", "ed"].map(k => jsonChanged("src/i18n/data.json", [k, lang])));
  if ((r = rest.match(/^docs\/([^/]+)\/$/))) return inLang(docs, ["topics", r[1]]);
  if (rest === "docs/") return jsonChanged(docs);
  if ((r = rest.match(/^(?:guides|compare)\/([^/]+)\/$/))) return inLang(articles, ["articles", r[1]]);
  if (/^(guides|compare)\/$/.test(rest)) return jsonChanged(articles);
  if (rest === "changelog/") return jsonChanged("src/i18n/changelog.json");
  if (rest === "press/") return jsonChanged("src/i18n/press.json");
  if (/^(privacy|support|accessibility)\.html$/.test(rest)) return fileChanged("src/i18n/legal.ts");
  if (rest === "sitemap/") return latest(jsonChanged(docs), jsonChanged(articles));
}
