# Design System Inspired by EVA-01

## 1. Visual Theme & Atmosphere

EVA-01 is a dark sci-fi command-center aesthetic — the system's voice is "NERV at T-minus-five." The base canvas is a near-black blue (`#030c1d`) with layered surfaces stepping up through `#0f1535` and `#1a1f3d` to give cards a sense of depth without ever lifting off the deep substrate. The signature accent is a saturated mission-control purple (`#7B2FBE`) paired against a high-voltage signal green (`#01FF70`) — purple is the chrome (borders, focus rings, primary highlights), green is the live-state telemetry that blinks on status dots and active markers. The two never share an element; they alternate roles like the analog/digital lights on a launch console.

Cards use a glassmorphic linear-gradient fill at ~70-90% opacity over a 12px backdrop blur, with a hairline border in `#1e2548` that glows purple on hover (`box-shadow: 0 0 20px #7B2FBE33`). The page-pattern background is an SVG circuit trace — short horizontal stubs and tiny pads at 60×60px tile, evoking exposed PCB. Type is monospace top-to-bottom: `JetBrains Mono` for body and UI, `Departure Mono` for display headlines (a chunky ASCII-display variant), and `IBM 3270` for terminal/log surfaces.

**Key Characteristics:**
- Dark substrate (`#030c1d`) with layered `surface → card → hover` step-ups; cards feel etched onto a circuit board rather than floating above it.
- Single-voltage purple accent (`#7B2FBE`) for chrome and focus, single-voltage signal green (`#01FF70`) for live state — never used together on the same element.
- Glassmorphic cards (linear gradient fill + 12px backdrop blur) with hairline `#1e2548` borders and a purple glow on hover.
- SVG circuit-trace background pattern at 60×60px tile — the system's most recognizable surface texture.
- All-monospace typography: `JetBrains Mono` body, `Departure Mono` display, `IBM 3270` terminal/log streams.
- Status dots use the green for `.live` (with bloom + 1.5s blink), warning amber for `.idle`, red for `.error`.

## 2. Color Palette & Roles

### Backgrounds (substrate → surface → card → hover)
- **Deep** (`#030c1d`): Page floor. Near-black with a faint blue cast — never pure black.
- **Surface** (`#0f1535`): The `<main>` wrapper and full-bleed bands.
- **Card** (`#1a1f3d`): The `.t-card` fill (rendered as a 90→70% gradient).
- **Hover** (`#242a4a`): Card-hover and row-hover surfaces.

### Text
- **Bright** (`#e0e6ed`): Headings and high-emphasis labels.
- **Text** (`#a0aec0`): Default body and UI labels.
- **Muted** (`#5a6178`): De-emphasized labels, captions, "ago" timestamps.

### Accents
- **Accent** (`#7B2FBE`): The signature purple. Primary buttons, focus rings, active tab underlines, link text on hover.
- **Accent Alt** (`#01FF70`): Signal green. Live status dots, real-time data point highlights, success badges.
- **Accent Glow** (`#7B2FBE33`): Purple-at-20% — the hover-state shadow on cards and the focus halo around inputs.
- **Accent Alt Glow** (`#01FF7022`): Green-at-13% — the bloom under live status dots.

### Borders
- **Border** (`#1e2548`): Default hairline — cards, table rules, input outlines.
- **Border Active** (`rgba(123, 47, 190, 0.33)`): Focus / active border (purple at 33%).

### Semantic
- **Info** (`#0075ff`): Informational pills and ambient pings.
- **Success** (`#01b574`): Affirmative state badges (distinct from the brighter `accent-alt` green which is reserved for live telemetry).
- **Warning** (`#ffb547`): Idle status dots, warning pills.
- **Error** (`#E31A1A`): Error pills and destructive affordances.

## 3. Typography Rules

### Font Family
- **Primary**: `JetBrains Mono`, with fallbacks: `Fira Code, monospace`
- **Display**: `Departure Mono`, with fallbacks: `JetBrains Mono, monospace`
- **Mono**: `IBM 3270`, with fallbacks: `JetBrains Mono, monospace`
- **Terminal**: `IBM 3270`, with fallbacks: `JetBrains Mono, monospace`

The system runs all-monospace by design — there is no proportional family in use anywhere. Departure Mono carries display headlines with its chunky ASCII-terminal proportions; JetBrains Mono is the workhorse for body, labels, and most UI; IBM 3270 is reserved for terminal and log-stream surfaces (LogStream component, command palette result lines).

### Hierarchy
Base size is 14px / 1.6 line-height. The system favors size-only hierarchy with relatively quiet weights — display moments use the heavier `Departure Mono` letterforms rather than bumping weight on JetBrains Mono.

| Role | Family | Size | Use |
|---|---|---|---|
| Display XL | Departure Mono | 48–56px | Page hero ("CODEX · 28") |
| Display | Departure Mono | 24–32px | Section heads |
| H1 | JetBrains Mono | 20px / 600 | Subsection heads |
| Body | JetBrains Mono | 14px / 400 | Default running text |
| Caption | JetBrains Mono | 12px / 500 | Card meta, labels |
| Micro | JetBrains Mono | 10–11px / 600, uppercase, 0.3em tracking | Section section-label chips, log timestamps |
| Terminal | IBM 3270 | 12–14px | LogStream lines, status-bar telemetry |

### Principles
- **Monospace top-to-bottom.** No proportional fallbacks. The ASCII-grid feel is the brand.
- **Tracking does the typographic work.** Micro labels run at `0.3em` letter-spacing, uppercase — the wide cap-spacing reads as instrument-panel rather than tabular.
- **Display weight comes from family swap, not weight-bump.** Use `Departure Mono` for chunky moments instead of `JetBrains Mono 700`.

## 4. Component Stylings

### Cards (`.t-card`)
- Background: `linear-gradient(135deg, rgba(15, 21, 53, 0.9) 0%, rgba(26, 31, 61, 0.7) 100%)`
- Backdrop filter: `blur(12px)` — gives stacked cards a glass look against the circuit-trace background.
- Border: `1px solid #1e2548`, radius `8px`.
- Hover: border becomes `rgba(123, 47, 190, 0.33)` and gains `box-shadow: 0 0 20px #7B2FBE33`.

### Glow (`.t-glow`)
- `box-shadow: 0 0 15px #7B2FBE33, 0 0 30px rgba(123, 47, 190, 0.1)` — a purple bloom used on focused inputs, active tabs, and feature-highlight cards.

### Status Dots (`.status-dot`)
- 8×8px circles, fully rounded.
- `.live` — green fill with bloom (`box-shadow: 0 0 6px #01FF70`) and a 1.5s opacity blink.
- `.idle` — amber fill, no bloom.
- `.error` — red fill with red bloom.

### Background Pattern (`.t-bg-pattern`)
- SVG-encoded inline circuit-trace tile at 60×60px — short horizontal stubs at y=30 with tiny circular pads at x=20 and x=40. Stroke and fill both sit at the `#1e2548` border tone so the pattern reads as etched into the substrate, not painted on top.

### Skeleton Shimmer (`.t-shimmer`)
- 90deg gradient cycling between `--color-t-hover` and `--color-t-card` at 1.4s — fast enough to feel responsive, slow enough not to nag.

### Scrollbar
- 6px width — narrow, subordinate. Track in `--deep`, thumb in `--border`, thumb-hover in `--accent` purple.

## 5. When To Reach For This Theme

- Mission-control / ops dashboards.
- AI-agent product surfaces where you want a "the system is alive" feel without retro CRT theatrics.
- Anything where you'd otherwise reach for the generic dark-mode-with-blue-accent SaaS template — EVA-01 lands more distinctively without sacrificing legibility.

## 6. Avoid This Theme For

- Long-form editorial or marketing pages — the all-monospace voice is too much body copy.
- Light-mode requirements — there is no light variant of EVA-01.
- Audiences that need a corporate-conservative read; the purple/green pairing is opinionated.
