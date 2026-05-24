<p align="center">
  <img src="assets/ui/app_icon.png" alt="FoodieMerge app icon" width="128" height="128">
</p>

<h1 align="center">foodiemerge-website</h1>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-7E4E60.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/status-coming%20soon-C8553D.svg" alt="Status: Coming Soon">
  <img src="https://img.shields.io/badge/build-none-9CB380.svg" alt="No build step">
</p>

Marketing landing page for **FoodieMerge**, the cozy merge-2 mobile game from
Inceptyon Labs LLC. Vanilla HTML / CSS / JS, no build step.

## Run

Any static server works. From the repo root:

```bash
python3 -m http.server 7421
# → http://localhost:7421/
```

Or use `npx serve .` if you prefer Node.

## Structure

```
.
├── index.html      single-page marketing site
├── app-ads.txt     AdMob authorized seller declaration
├── styles.css      design tokens + all layout
├── main.js         merge-loop demo auto-cycle (no deps)
├── PRODUCT.md      brand context (register, voice, anti-references)
├── DESIGN.md       design system (palette, typography, motion)
├── README.md       you are here
└── assets/
    ├── npcs/       8 character portraits
    ├── buildings/  8 town building illustrations
    ├── items/      27 fruit / vegetable / gem / generator icons
    └── ui/         app icon, store glyphs, UI affordances
```

All asset PNGs were copied from `../foodymerge/assets/images/` so the site
ships independently of the game repo.

## Sections

Top to bottom in `index.html`:

1. **Hero** — wordmark, tagline, "Coming Soon" store buttons, Nana Jean
   portrait with floating item chips
2. **Cozy pitch** — manifesto headline plus three pillars (no timers,
   generous bounded, parent + child co-buildable)
3. **How it plays** — four-step merge loop with auto-cycling animations
   (tap → drag → climb → deliver)
4. **Meet Plum Hollow** — eight town buildings, then the eight-NPC cast
5. **Chains** — fruit, generator, and gem chain ladders
6. **Closing plate** — store buttons again with the app icon
7. **Footer** — Inceptyon Labs LLC, Tampa, © 2026

## Design notes

See `DESIGN.md` for full tokens. Quick reference:

- Type: **Nunito** (Google Fonts) at 500 / 700 / 800 / 900
- Palette: warm cream surface, plum primary, terracotta wordmark accent,
  sage confirm, butter gold, sky-blue gem, honey-tan basket
- Motion: ease-out-quart everywhere, 280–480ms normal, 600–1200ms hero
- The merge-loop demo cycles every ~4.2s, pauses when offscreen or when
  the user picks a dot manually, honors `prefers-reduced-motion`

## Development

After cloning, activate the versioned git hooks (runs gitleaks against staged
changes on every commit):

```bash
git config core.hooksPath .githooks
```

Requires `gitleaks` on `$PATH` (`brew install gitleaks`).

## License

[MIT](LICENSE) © Inceptyon Labs LLC.

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## Things deliberately not here

- No analytics, tracking, or cookie banner
- No newsletter signup or "join the beta" form (no inbox to receive it)
- No real App Store / Play Store links (game ships later; buttons are
  visibly "Coming Soon" pills)
- No dark mode (the game is sun-warmed cream; dark mode betrays the mood)
