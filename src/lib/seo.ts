import { SITE, LANGS, APP_STORE_URL, APP_VERSION, APP_RELEASED, AUTHOR_URL, X_URL, useT, type Lang } from "../i18n";

export const authorNode = {
  "@type": "Person",
  "@id": `${AUTHOR_URL}/#person`,
  name: "Haytham A. Salama",
  url: AUTHOR_URL,
  sameAs: [X_URL, "https://github.com/haythamasalama", "https://www.linkedin.com/in/haythamasalama"],
};

export function appNode(lang: Lang) {
  const t = useT(lang);
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE}/#app`,
    name: "EasyShoot",
    alternateName: "EasyShoot: Screenshot & Markup",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Screenshot tool",
    operatingSystem: "macOS 14.0 or later",
    softwareVersion: APP_VERSION,
    datePublished: APP_RELEASED,
    fileSize: "2.1 MB",
    isAccessibleForFree: true,
    author: { "@id": `${AUTHOR_URL}/#person` },
    publisher: { "@id": `${AUTHOR_URL}/#person` },
    description: t("seo.desc"),
    url: `${SITE}/`,
    image: `${SITE}/og.png`,
    softwareHelp: `${SITE}/support.html`,
    inLanguage: [...LANGS],
    ...(APP_STORE_URL ? { downloadUrl: APP_STORE_URL, installUrl: APP_STORE_URL, sameAs: [APP_STORE_URL] } : {}),
    featureList: [
      "Area, window and fullscreen capture",
      "Quick Access after every capture",
      "Arrows, lines, rectangles, diamonds, ellipses, text and numbered steps",
      "Pen, pixelate and blur",
      "Solid, dashed or dotted strokes, fills, rounded edges, angle and opacity",
      "Select and restyle several marks at once",
      "Arabic and right-to-left text in any font",
      "Background tool with padding, corners and shadow",
      "Crop and resize",
      "Presets",
      "PNG, JPEG, HEIC and TIFF export",
      "Custom capture shortcuts",
      "Liquid Glass on macOS 26",
      "No account, no cloud, no tracking",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      category: "free",
      ...(APP_STORE_URL ? { url: APP_STORE_URL, availability: "https://schema.org/InStock" } : {}),
    },
  };
}

export const faqNode = (url: string, lang: Lang, items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  inLanguage: lang,
  mainEntity: items.map(i => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
});

export const breadcrumbNode = (url: string, crumbs: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  "@id": `${url}#crumbs`,
  itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: SITE + c.path })),
});
