# Design System Inspired by Phosphor

## 1. Visual Theme & Atmosphere

Phosphor is a retro CRT terminal — green-on-black, scanlines, phosphor bloom. The page substrate is essentially black (`#050a05`) with a subtle green tint, and every surface above it steps up by one phosphor stop. The palette is monochrome by intent: a single green (`#2ecf4e`) for body/accent and a brighter highlight green (`#7dff9a`) for emphasis. The only chromatic accent is amber (`#ffb000`) for warning state and the alt-glow color — used very sparingly, mostly inside status dots. Every text element gets a soft `text-shadow: 0 0 2px rgba(46, 207, 78, 0.4)` — a subtle phosphor bloom that makes type feel emitted from the screen rather than rendered onto it.

The system's most distinctive surface is the global scanlines overlay: a 1px-on / 2px-off horizontal repeating gradient at 12% black, applied via `body::before` with `mix-blend-mode: multiply` and `pointer-events: none`. It sits above all content at z-index 9999, so every screenshot looks like a CRT capture. Type is `IBM Plex Mono` for body and UI, `VT323` (a true bitmap-style display font) for display headlines and terminal surfaces. The 32×32px grid background pattern in the border tone reinforces the engineer-graph-paper / oscilloscope feel. Cards have just `2px` rounding — almost square, but enough to signal "rendered" rather than "printed."

**Key Characteristics:**
- Monochrome green palette (`#2ecf4e` / `#7dff9a`) with amber (`#ffb000`) reserved for warning state. Errors get a hot red (`#ff3333`) but it's used sparingly.
- Global CRT scanlines via `body::before` — 1px-on / 2px-off horizontal lines at 12% black with `mix-blend-mode: multiply`. Sits above all content; present on every page.
- Universal phosphor text-shadow on `<html>` — every glyph gets a 2px green bloom. Type feels emitted, not rendered.
- Bitmap display: `VT323` for headlines and terminal surfaces; `IBM Plex Mono` for body. Letter-spacing on `.font-terminal` is `0.02em` — slightly wider than mono default.
- Strong glow on cards and accents (`box-shadow: 0 0 12px rgba(46, 207, 78, 0.35)`). The system uses bloom as a primary depth tool — no shadows, just glows.
- 32×32px grid background pattern in the border tone — graph paper, not decoration.
- Smoothing turned **off** (`-webkit-font-smoothing: none`) — pixels stay pixels. Combined with VT323's bitmap shapes, type looks like a real terminal.

## 2. Color Palette & Roles

### Backgrounds
- **Deep** (`#050a05`): Page floor — black with a subtle green tint.
- **Surface** (`#0a120a`): Main content wrapper.
- **Card** (`#0f1a0f`): The `.t-card` fill.
- **Hover** (`#162316`): Card-hover and row-hover.

### Text
- **Bright** (`#7dff9a`): Highlight green — the loudest text color. Used for active state and statement text.
- **Text** (`#2ecf4e`): The default body color. Same as the accent — they are interchangeable. Carries the universal phosphor bloom.
- **Muted** (`#1a7a2e`): A deep moss green for de-emphasized labels.

### Accents
- **Phosphor Green** (`#2ecf4e`): The signature green. Same as body text — the system's monochrome contract. Active borders, focus rings, status dots.
- **Amber** (`#ffb000`): The single chromatic counterpoint. Warning state, idle status, alt-glow surfaces.
- **Phosphor Glow** (`rgba(46, 207, 78, 0.35)`): The bloom under cards and active surfaces — substantial (35% opacity).
- **Amber Glow** (`rgba(255, 176, 0, 0.30)`): The matching amber bloom.

### Borders
- **Border** (`#1a3a1a`): Default hairline — a deep moss green. Visible against the substrate but never bright.
- **Border Active** (`#2ecf4e`): On focus / active, the border becomes full phosphor green.

### Semantic
- **Info** (`#7dff9a`): Same as `bright` — informational pings inherit the highlight.
- **Success** (`#2ecf4e`): Same as the accent.
- **Warning** (`#ffb000`): Amber.
- **Error** (`#ff3333`): The hottest color in the entire system — pure red, no compromise. Used sparingly because it breaks the monochrome.

## 3. Typography Rules

### Font Family
- **Primary**: `IBM Plex Mono`, with fallbacks: `JetBrains Mono, monospace`
- **Display**: `VT323`, with fallbacks: `IBM Plex Mono, monospace`
- **Mono**: `IBM Plex Mono`, with fallbacks: `monospace`
- **Terminal**: `VT323`, with fallbacks: `IBM Plex Mono, monospace`

VT323 is a near-bitmap font modeled on the original VT line of DEC terminals — at small sizes the letterforms render almost as pixel art. IBM Plex Mono is the workhorse for body and UI; it has enough warmth to be readable at length but stays inside the monospaced grid.

### Hierarchy
Base 14px / 1.5. Display sizes lean heavily on VT323's chunky letterforms — there is no weight axis on VT323, so display contrast comes purely from size.

| Role | Family | Size | Use |
|---|---|---|---|
| Display XL | VT323 | 64–96px | Page hero — at this size VT323 reads as monumental terminal output |
| Display | VT323 | 36–48px | Section heads |
| H2 | VT323 | 24px | Subsection heads |
| H3 | IBM Plex Mono | 16px / 600 | Inline subheads |
| Body | IBM Plex Mono | 14px / 400 | Default running text |
| Caption | IBM Plex Mono | 12px / 500 | Card meta, labels |
| Micro | IBM Plex Mono | 10–11px / 600, uppercase, 0.18em tracking | Section labels, classifications |
| Terminal | VT323 | 14–18px | LogStream lines, status messages |

### Principles
- **Smoothing off; pixels stay pixels.** `-webkit-font-smoothing: none` is global. Don't override per-element.
- **Universal phosphor bloom.** Every glyph inherits `text-shadow: 0 0 2px rgba(46, 207, 78, 0.4)` from `<html>`. Don't strip it on individual elements unless the element is meant to feel "off-screen" (e.g., disabled).
- **VT323 for display, IBM Plex for body.** Size carries hierarchy on VT323; weight carries hierarchy on Plex.

## 4. Component Stylings

### Cards (`.t-card`)
- Background: flat `#0f1a0f`. No gradient.
- Border: `1px solid #1a3a1a`, radius `2px` — almost square.
- Hover: border becomes `#2ecf4e` and adds `box-shadow: 0 0 12px rgba(46, 207, 78, 0.35)` — strong phosphor bloom.

### Glow (`.t-glow`)
- `box-shadow: 0 0 12px rgba(46, 207, 78, 0.35), 0 0 24px rgba(46, 207, 78, 0.15)` — double-layer bloom for cards in active state.

### Status Dots
- 8×8px circles.
- `.live` — phosphor green fill, 8px green bloom, 1.2s blink — the fastest blink of any theme.
- `.idle` — amber fill with a faint amber bloom.
- `.error` — red fill with a red bloom.

### Background Pattern (`.t-bg-pattern`)
- 32×32px grid of 1px hairlines in the border tone (`#1a3a1a`). Cross-hatched, evocative of oscilloscope or engineer's graph paper.

### Scanlines (`body::before`)
- Repeating-linear-gradient at 0deg: 1px black-at-12% on, 2px transparent off. Applied above all content at z-index 9999 with `mix-blend-mode: multiply` and `pointer-events: none`. Don't try to hide this — it's the brand.

### Skeleton Shimmer
- 90deg gradient between `hover` and `card` tones at 1.4s.

### Scrollbar
- 8px width. Track in `--deep`, thumb in `--border`, thumb-hover gains a green bloom.

## 5. When To Reach For This Theme

- Hacker / cyberpunk product surfaces.
- CTF / capture-the-flag dashboards.
- Devtool product marketing where the audience reads "terminal aesthetic" as authentic.
- Anywhere the visual signal "this is real plumbing, not polished consumer chrome" matters.

## 6. Avoid This Theme For

- Anything customer-facing in a mainstream consumer audience — the scanlines and bitmap type read as eccentric to most users.
- Long-form reading — VT323 at body size is fatiguing; even IBM Plex Mono at 14px monospaced is denser than a proportional sans.
- Brand systems with chromatic identities — Phosphor's monochrome will fight any brand color you try to inject.
