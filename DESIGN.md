# FoodieMerge — Design system

Brand register. Identity-preservation wins over the impeccable reflex-reject
font and lane lists: the game itself ships in Nunito on a warm cream surface,
so the site does too.

## Aesthetic lane

Warm storybook game marketing. Reference shelf:

- Stardew Valley's official site (cozy farm warmth, hand-painted)
- Travel Town / Merge Mansion App Store pages (genre cousins, but their
  marketing chrome is glossier and louder than we want)
- A 1990s children's picture book in painted gouache — warmer, slower
- Old-school produce stand chalkboard signs (the typography weight, not the
  material)

NOT in the lane: editorial-magazine grids, dark-mode tech, neon
"playful" gradients, Roblox-style 3D character renders.

## Color

Strategy: **Full palette / Committed.** The cream surface plus the six
named accents IS the brand. No restraint hedging. Each accent has a single
role and stays in that role.

| Token              | Hex       | Role                                          |
| ------------------ | --------- | --------------------------------------------- |
| `--canvas`         | `#FFF8E7` | Page background. Sun-warmed cream.            |
| `--canvas-warm`    | `#FCEEC6` | Section bands that should feel golden hour.   |
| `--card`           | `#FFFCF4` | Card and panel surfaces. Tinted, never white. |
| `--ink`            | `#3A2A2E` | Body text. Deep plum-ink, not black.          |
| `--ink-soft`       | `#7E4E60` | Captions, less emphasis. Plum at text scale.  |
| `--plum`           | `#7E4E60` | Primary CTA, headline accents, current state. |
| `--plum-deep`      | `#5A3848` | Plum shadow tint and hover state.             |
| `--terracotta`     | `#C8553D` | Wordmark accent, warm highlights.             |
| `--sage`           | `#9CB380` | "Go" / confirm / play actions.                |
| `--gold`           | `#F2C14E` | Coin chip, butter yellow highlight.           |
| `--gem`            | `#7BAFD4` | Gem chip, sky-blue accent.                    |
| `--honey`          | `#D9A566` | Wood, basket, copper edges, hairlines.        |
| `--honey-edge`     | `#B8884A` | Hairline borders. 1.5px.                      |
| `--rose`           | `#D8A7B1` | Dusty rose. Berry highlights, soft chip fills.|

Forbidden: pure black, neon green, electric blue, anything above ~80%
saturation, any cool grey.

## Typography

**Nunito only.** Loaded via Google Fonts. Identity-preservation, not reflex.

| Role       | Weight    | Size                      | Notes                       |
| ---------- | --------- | ------------------------- | --------------------------- |
| Wordmark   | 900       | `clamp(3.5rem, 12vw, 9rem)` | The game name, hero-scale.  |
| Display    | 800       | `clamp(2.25rem, 5vw, 4rem)` | Section openers.            |
| Heading    | 700       | `clamp(1.25rem, 2vw, 1.75rem)` | NPC names, card headings. |
| Body       | 500       | 1.0625rem (17px)          | Paragraph text.             |
| Caption    | 600       | 0.8125rem (13px)          | Labels, metadata. Uppercase tracked OK in moderation. |
| Numbers    | 700       | varies                    | Always `font-variant-numeric: tabular-nums`. |

Line height 1.5 for body, 1.1 for the wordmark, 1.2 for display.
Max body line length 62ch.

The wordmark "FoodieMerge" gets a two-tone treatment: "Foodie" in plum,
"Merge" in terracotta. No gradient text. No drop shadow.

## Spacing and rhythm

Fluid section padding: `clamp(4rem, 9vw, 8rem)` vertical between sections.
Generous. The page should breathe like a picnic blanket, not a spreadsheet.

Card padding: 1.5rem on phone, 2rem on tablet+. Cards round to 18px.
Buttons round to 999px (pill). Asset tiles round to 14px.

## Elevation

One shadow recipe, used sparingly:

```
box-shadow: 0 12px 32px -16px rgba(126, 78, 96, 0.28),
            0 2px 0 rgba(184, 136, 74, 0.35);
```

Copper-tinted, not grey. The second layer is a 2px hairline at the bottom
that reads as a painted edge. On hover, lift to `-20px` offset and 0.32
opacity.

## Motion

Gentle, painted, slow. Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
(ease-out-quart) everywhere. Durations 280–480ms for normal interactions,
600–1200ms for hero choreography.

- Hero illustrations float on a 6s sine ease, ±6px.
- Card hover lifts 4px in 280ms.
- The merge-loop demo cycles every 4s; each step takes 800ms with a 200ms
  hold before the next.
- Reduced motion: replace all easing with linear 200ms, kill the float and
  the auto-cycle.

## Imagery

The game art carries the visual weight. Eight NPC portraits, eight building
illustrations, ~25 fruit / vegetable / gem / generator items. Every item is
PNG-32 with transparent background and no baked shadow.

The site renders each on a tinted cream chip with a 1.5px honey hairline.
The chip catches the asset's painted shading and reads as "this is a
collectible thing." Asset tiles are 96–128px on the chain ladder, 64px on
small chips, full-bleed on hero.

Alt text is part of the voice. "Nana Jean, the matriarch of Plum Hollow,
holding a teacup" not "old woman."

## Layout

Asymmetric. Hero is wordmark + Nana Jean overlapping the right edge.
Sections alternate between left-aligned-narrative and full-width-grid.

Avoid: centered-stack everything, identical 3-column icon-card grids,
sidebar-on-right blog templates.

When grids appear (the NPC roster, the building tour, the chain ladder),
each grid has its own internal scale and density. No template grid reused
across sections.

## Accessibility

The audience includes children and grandparents. Non-negotiable:

- Body text contrast ratio 8:1 minimum against canvas
- 48dp minimum tap targets
- Every image has alt text or `aria-hidden="true"` when decorative
- Focus rings visible: 3px sage outline with 2px offset
- `prefers-reduced-motion` respected
- Semantic HTML (header, main, section with aria-labelledby, footer)
