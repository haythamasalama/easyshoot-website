# EasyShoot brand

![EasyShoot icon](public/icon.png)

This file describes the brand as the website ships it (November 2026). The values below are read from the live tokens in `src/styles/global.css` and `src/styles/home.css`; change them there and here together. Drawn pieces of the app are styled in `src/styles/drawn.css`. `Branding/BRAND.md` in the app repository says how the app itself applies the brand.

## Idea

**A clear lens on your screen.** Four selection corners frame a camera lens: the moment you choose what to capture. The brand should feel like a native Mac tool that a careful person made: soft, light, calm and precise. Colour is used sparingly so the screenshots and the marks inside them carry the attention.

Principles:

1. **Content first.** The product and its marks sit on a calm sky; everything else on the page is quiet, neutral tiles.
2. **One blue.** A single sky-to-sapphire blue. No second accent colour, no purple, no rainbow gradients.
3. **Light is light, dark is dark.** Each theme has one complete colour set. Nothing white inside dark mode, nothing black inside light mode (the main download button is the only deliberate inverse).
4. **Native, not decorated.** macOS window shapes, Liquid Glass where macOS itself uses it (the floating navigation and the drawn app). No ornaments that macOS wouldn't use.
5. **Every language is first class.** Arabic reads right to left with its own spacing; no page mixes languages.
6. **Soft and simple.** Modest type, round tiles, room to breathe. When something feels busy, remove parts until one idea is left.

## Logo

| File | Use |
|:--|:--|
| `public/art/icon.svg` | Master icon, 1024 × 1024 on the macOS squircle grid (tile 824 × 824 at 100, 100; corner radius 185) |
| `public/icon.png` | 1024 px render with a transparent background (headless Chrome) for the site, Apple touch icon and social |
| `public/favicon.svg` | Simplified icon for browser tabs: same tile, corners and lens without the fine reflections |
| `public/og.png` | 1200 × 630 share image: icon, wordmark, tagline |

**Construction**

- **Tile:** vertical gradient `#62C6FF` → `#2C8CF4` → `#1650D0`, a soft white sheen from the top left, and a light rim (white at the top, fading out, a faint return at the bottom).
- **Corners:** four rounded L shapes, stroke 60 on the 1024 grid, frosted white (`#FFFFFF` → `#DCEBFF`), lifted with a soft blue-black shadow and a bright top edge.
- **Lens:** metal rim (`#5E6577` → `#23262F` → `#3A4256`), dark barrel, black ring, blue glass (`#2F7CF0` → `#123C96` → `#050C24`) with a faint coating tint (cyan top left, violet bottom right), a dark core, a wide soft reflection, one sharp highlight and a thin blue light along the lower edge.

**Use**

- Keep at least a quarter of the icon's width clear around it.
- Smallest size: 16 px, use `favicon.svg`. From 64 px up, use the full icon.
- Don't recolour it, outline it, add effects, put text on it, or place it on a busy photo.
- For a real macOS Liquid Glass icon in the app, rebuild these layers (tile, corners, lens) in Icon Composer so the system can light them; the SVG is the drawing they come from.

**Wordmark:** **Easy**Shoot, one word with a capital S. "Easy" in ink, "Shoot" in the accent ink. It stays left to right inside Arabic text (`dir="ltr"`).

## Colour

All pairs below meet WCAG AA for the text sizes they are used at.

### Accent

| Token | Light | Dark | Use |
|:--|:--|:--|:--|
| `--accent` | `#2C8CF4` | `#4FA6FF` | Selection, focus ring, selected tool, small graphic details |
| `--accent-ink` | `#1A63D6` (5.5:1 on white) | `#8CC4FF` (10.8:1 on `#0A0A0B`) | Accent text: "Shoot", links |
| `--accent-fill` | `#1A63D6` | `#1A63D6` | Any fill with white text on it (5.5:1). Never put white text on `--accent` (3.4:1) |

### Neutrals

| Token | Light | Dark | Use |
|:--|:--|:--|:--|
| `--bg` | `#FFFFFF` | `#0A0A0B` | Page |
| `--surface` | `#F6F8FA` | `#121214` | Tiles |
| `--surface2` / `--surface3` | `#EDF1F5` / `#E2E8EF` | `#18191C` / `#1F2024` | Hover and selected steps, keys |
| `--card` | `#FFFFFF` | `#151517` | Solid cards on inner pages |
| `--chip` | `#FFFFFF` | `#27282D` | Keys and file icons on a tile |
| `--ink` | `#0A0A0B` | `#F5F5F7` | Headings and body |
| `--ink2` | `#2E3036` | `#D1D2D6` | Secondary strong text |
| `--muted` | `#565A63` (6.9:1) | `#9A9CA4` (7.2:1) | Descriptions |
| `--line` / `--line2` | `#E4E7EC` / `#D9DBE1` | `#232327` / `#303036` | Real tables only |
| `--cta-bg` / `--cta-ink` | `#0A0A0B` / `#FFFFFF` | `#F5F5F7` / `#0A0A0B` | The main download button (the one inverse element) |

### Annotation marks (inside drawn screenshots)

| Colour | Hex | Use |
|:--|:--|:--|
| Mark red | `#E5534B` | Boxes, arrows, numbered steps and notes in the drawn editor. Softer than system red; thin strokes, never a large fill |
| macOS blue | `#0A84FF` | Only inside the drawn Mac window (selected tool, Save), because that is what macOS shows |

## Sky and glass

The app always sits on a sky, never on a coloured panel.

| Token | Light | Dark |
|:--|:--|:--|
| `--sky` | `public/art/sky-day.svg` | `public/art/sky-night.svg` |
| `--on-sky` / `--on-sky2` | `#0A1A33` / `#33425C` | `#F5F7FB` / `#D3DAE8` |

- The sky carries the hero, the flow's tiles, the pinned window, the privacy drawing and the close. Everywhere else is `--bg` with `--surface` tiles, separated by tone and space, not by lines or shadows.
- Blur belongs to one page element: the floating navigation. Inside drawn app pieces (`[data-ui]`) the app's own glass stays.
- The hero's sky starts full width and settles into a rounded tile as the page scrolls.

## Shape and space

| Element | Radius |
|:--|:--|
| The close, small-things tiles | 28 px |
| Sky tiles | 24 px |
| Pictures inside a small-things tile | 20 px |
| FAQ tiles | 18 px |
| Keys | 7–16 px |
| Buttons, nav, segments | Full pill (999 px) |

- Content width 1240 px with side margins of 16–32 px; sections 88–148 px apart; tile gaps 16 px.
- Buttons are 44 px tall, weight 500. The navigation is a floating capsule 52 px tall, 1040 px wide at most.
- Page elements have no shadows at rest, except the floating navigation. Drawn app pieces keep their own.

## Type

- **Family:** Plus Jakarta Sans for Latin and Alexandria for Arabic, from Google Fonts. Drawn app pieces keep the system font, as the app does.
- **Display:** weight 600, modest sizes: the hero up to 62 px, section titles up to 40 px, tracking −0.03 em. Nothing heavier than 600 on the page.
- **Arabic:** letter spacing 0, line height 1.28.
- **Body:** 15–17 px, line height 1.45–1.5. Descriptions in `--muted`.

## Imagery

- The app is shown as a **drawn** macOS editor (`src/lib/editor.ts`) holding an everyday page (a checkout, or the dashboard in `src/lib/dash.ts`), in the page's language and theme. The hero's window works: its tools draw on the page (`src/scripts/live-editor.ts`).
- The sky (`public/art/sky-day.svg`, `sky-night.svg`) is an original drawing: a soft gradient with three blurred dunes, in the brand's blues with a warm glow.
- The flow's four pictures tell one story with the same checkout page (`src/lib/flow.ts`): it is selected, floats in the corner, gets marked up, then lands in a chat.
- The small-things tiles each hold a scene of their feature (`moreArt` in `src/lib/flow.ts`), in tiles of different widths. Each scene says one thing: no tilted layers, no extra marks, no detail that needs a second look. Zoom is one large button and its percentage; Presets is three straight frames with their names.
- The privacy drawing puts the icon's four selection corners around a padlock, in white on the sky.
- Marks inside pictures: one box, two numbered steps, one short arrow, one short note. Steps sit beside what they mark, never on text.

## Motion

Library: Motion (`src/scripts/site.ts`) for presses and the theme icon; CSS and the browser's own animations for the rest (`src/styles/home.css`, `src/scripts/live-editor.ts`).

| Moment | Motion |
|:--|:--|
| Page load and scroll | The parts of a section rise 16 px and fade in once, 75 ms apart |
| Hero | The sky settles into a rounded tile over the first 420 px of scroll. Once, a pointer picks a tool and marks the page in the window; moving over or touching the window stops it. The hint sits quietly in the window's title bar, never as a pill on the canvas |
| Flow pictures | Each plays once as it appears: the selection is dragged, the thumbnail slides in, the marks land, the messages rise |
| Tools section | The window holds while three statements pass and change it (wide screens only) |
| Press | Every button and control springs to 94% and back (stiffness 600, bounce 0.55) |
| Theme | The new theme grows from the toggle in a circle (650 ms, view transition); the sun/moon icon spins in |
| Language | Pages cross-fade (cross-document view transition) |

- Easing for movement: `cubic-bezier(.2, .8, .2, 1)`. Springs for things the visitor touched.
- Durations 0.35–1 s. Nothing loops.
- `prefers-reduced-motion` turns all of it off, and nothing is hidden if the script never runs.

## Voice

Short, confident and plain. *Capture. Mark up. Share.* — *التقط، وضّح، وشارك.*

- Lead with what the person gets: "Point, number and explain", not "powerful annotation engine".
- Privacy is the promise: no account, no cloud, no tracking. Say only what is true for the build.
- No superlatives, no exclamation marks, no emoji (the changelog is the one exception: one emoji per feature). Name features the same everywhere: Capture Area, Capture Window, Capture Fullscreen, Scrolling Capture, Quick Access, Presets.
- Each language is written for its readers, not translated word for word.

## Search and AI

- One static page per language (`/`, `/ar/`, `/fr/`, `/es/`, `/de/`) with its own title, description, canonical, `hreflang`, Open Graph tags and JSON-LD.
- The page title pattern is "EasyShoot: screenshot app for Mac" in each language; the visible heading says what the app does, and the sentence under it names EasyShoot and the Mac.
- `public/llms.txt` is the plain summary for AI search; keep it in step with features.
