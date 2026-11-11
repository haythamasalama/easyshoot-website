import { pagePath, type Lang } from "./index";
import { jsonAdded, jsonChanged, pageModified } from "../lib/dates.mjs";

const files = import.meta.glob<any>("./docs/*.json", { eager: true, import: "default" });
const docs = (lang: Lang) => files[`./docs/${lang}.json`] ?? files["./docs/en.json"];

// The guide's order. A new topic goes here and into docs/<lang>.json; a language without it shows the English text.
export const DOC_GROUPS = [
  { id: "start", slugs: ["getting-started", "capture", "quick-access"] },
  { id: "editor", slugs: ["mark-up", "styles", "hide-details", "text", "background-and-crop", "presets", "export"] },
  { id: "more", slugs: ["shortcuts", "settings", "privacy"] },
];
export const DOC_SLUGS = DOC_GROUPS.flatMap(g => g.slugs);
const FIRST_PUBLISHED = "2026-11-01T00:00:00.000Z";
export const DOCS_UPDATED = (jsonChanged("src/i18n/docs/en.json") ?? FIRST_PUBLISHED).slice(0, 10);

export const docsUI = (lang: Lang) => ({ ...docs("en").ui, ...docs(lang).ui });
export const docOf = (lang: Lang, slug: string) => docs(lang).topics[slug] ?? docs("en").topics[slug];

export const docsPath = (lang: Lang) => `${pagePath(lang)}docs/`;
export const docPath = (lang: Lang, slug: string) => `${docsPath(lang)}${slug}/`;

export function docDates(lang: Lang, slug: string) {
  const keys = ["topics", slug];
  const published = jsonAdded(`src/i18n/docs/${lang}.json`, keys) ?? jsonAdded("src/i18n/docs/en.json", keys) ?? FIRST_PUBLISHED;
  return { published, modified: pageModified(docPath(lang, slug)) ?? published };
}
