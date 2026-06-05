#!/usr/bin/env node
// Generates the localized static pages from index.template.html + i18n/strings/*.json.
// English is written to the repo root (index.html); each other locale to /<code>/index.html.
// Run from the repo root:  node i18n/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BASE = "https://foodiemerge.com";

// dir: '' means repo root (the default English page). htmlLang/ogLocale per BCP-47.
const LOCALES = [
  { code: "en", dir: "", name: "English", htmlLang: "en", ogLocale: "en_US" },
  { code: "de", dir: "de", name: "Deutsch", htmlLang: "de", ogLocale: "de_DE" },
  { code: "ja", dir: "ja", name: "日本語", htmlLang: "ja", ogLocale: "ja_JP" },
  { code: "fr", dir: "fr", name: "Français", htmlLang: "fr", ogLocale: "fr_FR" },
  { code: "es", dir: "es", name: "Español", htmlLang: "es", ogLocale: "es_ES" },
];

const template = readFileSync(join(ROOT, "index.template.html"), "utf8");
const strings = Object.fromEntries(
  LOCALES.map((l) => [l.code, JSON.parse(readFileSync(join(__dirname, "strings", `${l.code}.json`), "utf8"))])
);

const urlFor = (dir) => `${BASE}/${dir ? dir + "/" : ""}`;

// Build the <link rel="alternate" hreflang> block shared by every page.
const hreflang = [
  ...LOCALES.map((l) => `    <link rel="alternate" hreflang="${l.htmlLang}" href="${urlFor(l.dir)}" />`),
  `    <link rel="alternate" hreflang="x-default" href="${urlFor("")}" />`,
].join("\n");

// Plain-text version of a copy string, for JSON-LD (strip tags + decode the few entities we use).
const toText = (s) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&mdash;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

function render(locale) {
  const t = strings[locale.code];
  const get = (key) => (t[key] ?? strings.en[key] ?? `{{t.${key}}}`);

  const langLinks = LOCALES.map((l) => {
    const current = l.code === locale.code ? ' aria-current="true"' : "";
    return `          <li><a href="${urlFor(l.dir) || "/"}" data-lang="${l.code}" hreflang="${l.htmlLang}"${current}>${l.name}</a></li>`;
  }).join("\n");

  const faqEntities = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    "@type": "Question",
    name: toText(get(`faq${n}_q`)),
    acceptedAnswer: { "@type": "Answer", text: toText(get(`faq${n}_a`)) },
  }));

  let html = template
    .replaceAll("{{HTML_LANG}}", locale.htmlLang)
    .replaceAll("{{CANONICAL}}", urlFor(locale.dir))
    .replaceAll("{{OG_LOCALE}}", locale.ogLocale)
    .replaceAll("{{LD_LANG}}", locale.htmlLang)
    .replaceAll("{{LANG_NAME}}", locale.name)
    .replace("{{HREFLANG}}", hreflang)
    .replace("{{LANG_LINKS}}", langLinks)
    .replace("{{LD_GAME_DESC}}", JSON.stringify(toText(get("ld_game_desc"))))
    .replace("{{LD_FAQ}}", JSON.stringify(faqEntities, null, 12).replace(/\n/g, "\n            "));

  // Remaining {{t.KEY}} content tokens.
  html = html.replace(/\{\{t\.([a-z0-9_]+)\}\}/gi, (_, key) => get(key));

  return html;
}

for (const locale of LOCALES) {
  const outDir = locale.dir ? join(ROOT, locale.dir) : ROOT;
  if (locale.dir) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), render(locale));
  console.log(`wrote ${locale.dir ? locale.dir + "/" : ""}index.html (${locale.code})`);
}
console.log("done");
