import data from "./data.json";

export const SITE = "https://easyshoot.app";
export const APP_STORE_URL = "https://apps.apple.com/app/easyshoot-screenshot-markup/id6829547113";
// The version on the App Store and the day it came out, for search engines.
export const APP_VERSION = "1.0.0";
export const APP_RELEASED = "2026-11-10";

export const LANGS = ["en", "ar", "fr", "es", "de"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_NAMES: Record<Lang, string> = { en: "English", ar: "العربية", fr: "Français", es: "Español", de: "Deutsch" };
export const OG_LOCALE: Record<Lang, string> = { en: "en_US", ar: "ar_AR", fr: "fr_FR", es: "es_ES", de: "de_DE" };

const ui = data.ui as Record<Lang, Record<string, string>>;

export const pagePath = (lang: Lang) => (lang === "en" ? "/" : `/${lang}/`);
export const dirOf = (lang: Lang) => (lang === "ar" ? "rtl" : "ltr");

export function useT(lang: Lang) {
  const live = Boolean(APP_STORE_URL);
  return (key: string): string => {
    const k = live && ui.en[`${key}Live`] ? `${key}Live` : key;
    return ui[lang][k] ?? ui.en[k] ?? key;
  };
}

export const tabsFor = (lang: Lang) => (data.tabs as Record<Lang, { t: string; b: string; k: string[] }[]>)[lang];
export const shotAlts = (lang: Lang) => (data.shots as Record<Lang, string[]>)[lang];

// The privacy and support pages exist in English and Arabic only.
export const privacyPath = (lang: Lang) => (lang === "ar" ? "/ar/privacy.html" : "/privacy.html");
export const supportPath = (lang: Lang) => (lang === "ar" ? "/ar/support.html" : "/support.html");
