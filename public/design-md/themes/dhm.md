# Design System Inspired by DHM

## 1. Visual Theme & Atmosphere

DHM is aerial cinematic — a light editorial system inspired by dronehomemedia.com. The substrate is a warm off-white (`#fafaf8`) with pure white cards. The accent pair is teal (`#14a8a4`) for sky-water primary and a sunset amber (`#e8854b`) for warmth — together they suggest aerial photography at golden hour. The voice is editorial but lighter than Sakura: less serif, more horizon. Cards have `10px` rounding with a soft 5%-deep-blue shadow that lifts 3px on hover with a substantial drop shadow — the loudest motion moment in any light theme.

Type is the system's signature: `Plus Jakarta Sans` for body / UI (a humanist geometric sans with friendly proportions) paired with `Playfair Display` for display headlines. Playfair's high-contrast Didone proportions give display moments a magazine-cover feel; Plus Jakarta carries the body work without ever feeling stiff. Base size is 15px / 1.65 — the most generous leading of any theme, evoking long-form magazine layouts. The background pattern is two radial-ellipse gradients: teal-at-6% at the top horizon, amber-at-5% at the bottom — a sunset-over-water wash.

**Key Characteristics:**
- Warm off-white substrate (`#fafaf8`) with pure white cards. Slightly warmer than Solamp's cool gray-white.
- Teal + sunset-amber accent pair (`#14a8a4` / `#e8854b`) — evokes aerial photography at golden hour over water.
- `10px` card rounding with a substantial hover lift (3px translate + 14px-blur shadow). The biggest hover transition in any light theme.
- Editorial type pairing: `Plus Jakarta Sans` body / `Playfair Display` display. Playfair carries magazine-cover personality at section heads.
- Background is a horizon gradient — teal-at-6% at top, amber-at-5% at bottom. Reads as sunset-over-water, never tiled.
- Generous body leading at 1.65 — the most spacious of any theme, intentional editorial calm.

## 2. Color Palette & Roles

### Backgrounds
- **Deep** (`#fafaf8`): Page floor — warm off-white. Slightly cream, never purely cool.
- **Surface** (`#ffffff`): Main content wrapper.
- **Card** (`#ffffff`): Pure white cards.
- **Hover** (`#f0f2f0`): Row-hover, de-emphasized surfaces.

### Text
- **Bright** (`#0a1e2c`): Headings, statement text. A deep cool navy — anchors the warm canvas.
- **Text** (`#3d4a54`): Body copy. Slate with a slight blue cast.
- **Muted** (`#7a8691`): Captions, timestamps.

### Accents
- **Teal** (`#14a8a4`): The signature primary. Active borders, focus rings, primary buttons, link text. A saturated cyan-teal — closer to Caribbean water than Pacific deep.
- **Amber** (`#e8854b`): The sunset counterpoint. Warmth moments, warning state, hero highlights. Slightly more orange than Solamp's amber.
- **Teal Glow** (`rgba(20, 168, 164, 0.12)`): Card-hover bloom and focus halo.
- **Amber Glow** (`rgba(232, 133, 75, 0.14)`): The sunset wash.

### Borders
- **Border** (`rgba(10, 30, 44, 0.08)`): Default hairline. Navy-at-8% on warm white — almost imperceptible.
- **Border Active** (`rgba(20, 168, 164, 0.55)`): Teal-at-55% on focus / active.

### Semantic
- **Info** (`#14a8a4`): Same as teal accent.
- **Success** (`#3e8e66`): A muted forest-teal green.
- **Warning** (`#e8854b`): Same as the amber accent.
- **Error** (`#c3524a`): A muted brick-red — warm, never alarming.

## 3. Typography Rules

### Font Family
- **Primary**: `Plus Jakarta Sans`, with fallbacks: `system-ui, sans-serif`
- **Display**: `Playfair Display`, with fallbacks: `Georgia, serif`
- **Mono**: `JetBrains Mono`, with fallbacks: `monospace`
- **Terminal**: `JetBrains Mono`, with fallbacks: `monospace`

The Plus Jakarta / Playfair pairing is the most editorially-loaded combination in the theme set. Playfair Display is a Didone serif with extreme stroke contrast — at display sizes the thins-and-thicks read as fashion-magazine cover. Plus Jakarta Sans handles body work with humanist proportions; it has enough warmth that it doesn't fight the serif's character.

### Hierarchy
Base 15px / 1.65 — the most generous leading of any theme.

| Role | Family | Size | Weight | Use |
|---|---|---|---|---|
| Display XL | Playfair Display | 56–80px | 900 | Page hero — magazine-cover scale |
| Display | Playfair Display | 36–48px | 700 | Section heads |
| H2 | Playfair Display | 24–28px | 700 | Subsection heads |
| H3 | Plus Jakarta Sans | 16–18px | 600 | Inline subheads |
| Body | Plus Jakarta Sans | 15px | 400 | Default running text |
| Caption | Plus Jakarta Sans | 13px | 500 | Card meta |
| Micro | Plus Jakarta Sans | 11px | 600, uppercase, 0.12em tracking | Section labels |
| Mono | JetBrains Mono | 13px | 400 | Code |

### Principles
- **Heavy display weight, generous leading.** Playfair 900 carries the loudest moments; body sits at 1.65 leading to balance the visual mass.
- **Italic-as-emphasis.** Playfair italic has dramatic contrast — preferred over bold for inline emphasis in editorial copy.
- **Sentence case for display.** Playfair carries enough character that all-caps would compete with its letterforms.

## 4. Component Stylings

### Cards (`.t-card`)
- Background: pure white `#ffffff`.
- Border: `1px solid rgba(10, 30, 44, 0.08)`, radius `10px`.
- Shadow: `box-shadow: 0 2px 6px rgba(10, 30, 44, 0.05)` — a soft rest.
- Hover: `transform: translateY(-3px)` + border becomes teal-at-55% + `box-shadow: 0 14px 36px rgba(10, 30, 44, 0.08)`. Big lift — the loudest hover transition of any light theme.

### Glow (`.t-glow`)
- `box-shadow: 0 0 28px rgba(20, 168, 164, 0.12)` — diffused teal bloom.

### Status Dots
- 8×8px circles.
- `.live` — teal fill with teal bloom + 1.6s blink.
- `.idle` — amber, no bloom.
- `.error` — muted brick-red with a faint bloom.

### Background Pattern (`.t-bg-pattern`)
- Two radial-ellipse gradients: teal-at-6% at the top, amber-at-5% at the bottom-right. Reads as a horizon — sunset over water seen from altitude.

### Skeleton Shimmer
- 90deg gradient at 1.6s — matched to the editorial calm.

### Scrollbar
- 10px width with rounded thumbs (5px radius). Track in `--deep`, thumb in `rgba(10, 30, 44, 0.15)`, thumb-hover in teal.

## 5. When To Reach For This Theme

- Photography / film / aerial-imaging brands.
- Travel and hospitality marketing — the warm-paper / horizon palette evokes destination content.
- Editorial publishing surfaces that want a serif-led personality without going as muted as Sakura.

## 6. Avoid This Theme For

- High-density data tables — the 1.65 body leading and `10px` card rounding consume vertical space.
- Tech-product / dev-tooling marketing — Playfair Display reads as fashion or editorial; it will undermine technical authority.
- Audiences that read serif as old-fashioned.
