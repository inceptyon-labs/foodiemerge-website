# Localization

The site ships English at the root plus German, Japanese, French, and Spanish
under `/de/`, `/ja/`, `/fr/`, `/es/`. Every page is plain static HTML — no
runtime framework — so the Cloudflare deploy is unchanged. Pages are generated
from one template plus per-language string files.

## Files

- `index.template.html` (repo root) — the markup, with `{{t.key}}` tokens where
  copy goes and a few computed tokens (canonical, hreflang, lang switcher).
- `i18n/strings/<code>.json` — one flat key→string file per language. `en.json`
  is the source of truth for the key set.
- `i18n/build.mjs` — the generator.

## Editing copy

1. Change the English string in `i18n/strings/en.json`.
2. Mirror the change in `de/ja/fr/es.json` (same key).
3. Run the build and commit the regenerated HTML.

To change layout/markup, edit `index.template.html`, not the generated
`index.html` — your edit there would be overwritten on the next build.

## Build

```sh
node i18n/build.mjs
```

Writes `index.html` (English) and `de|ja|fr|es/index.html`. No dependencies;
needs Node 18+.

## How language is chosen

- Detection is by the visitor's **browser language** (`navigator.languages`),
  never by IP. A small head-script on the English root redirects first-time
  visitors to their language if it's one of the four; it only ever fires from
  `/`, so there's no flash on localized pages and no redirect loop.
- The header switcher lets anyone override, and the choice is remembered in
  `localStorage` (`fm_lang`) — a manual pick, including "English", always wins.
- SEO is handled by `hreflang` alternates in every page `<head>` and in
  `sitemap.xml`, so search engines serve the right language per region
  regardless of the client-side redirect.

## Notes

- German runs ~30% longer than English; the layout already absorbs it, but
  re-check the hero and pillar headings if you tighten the design.
- The Japanese strings are machine-quality and should get a native pass before
  you rely on them for ranking or paid traffic.
- Adding a language: add an entry to `LOCALES` in `build.mjs`, add
  `strings/<code>.json`, add a row to `sitemap.xml`, rebuild.
