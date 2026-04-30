# Design System Inspired by Monolith

## 1. Visual Theme & Atmosphere

Monolith is editorial brutalism — flat, sharp, and quiet. Cards have `0px` border-radius and `2px` borders. There are **no glows**, no gradients, no shadows. The page substrate is pure near-black (`#0a0a0a`) with surfaces stepping up through `#121212` and `#1a1a1a`. The accent is high-contrast white (`#fafafa`) — the same value as the bright text — paired with a single coral alarm color (`#f25f4c`) that appears only on alerts and live status dots. Hierarchy comes entirely from typography, layout rhythm, and line weight; never from color or elevation.

Type is `Inter` (geometric sans) for body, `Space Grotesk` (display sans with wider counters) for headings, `JetBrains Mono` for code. The body runs at 15px / 1.55 — tight, dense. Display headlines lean on `Space Grotesk 700` at 36–64px to carry weight; the family swap from Inter creates the same kind of hierarchy a serif/sans pairing would, but kept entirely inside the sans-serif voice. The shape language is rectangles and right angles — there is no rounded corner anywhere except the small status dots, and even those override to `0px` to match the brutal vocabulary.

**Key Characteristics:**
- Hard 2px borders on cards, 0px radius — sharp corners are the brand.
- Zero shadows / glows / gradients. The system intentionally removes elevation as a tool.
- High-contrast white accent (`#fafafa` = the bright text token) — accent and text are the same color, just rendered on different surfaces.
- Single alarm color: coral (`#f25f4c`) for live status dots and live alert pills only. Never used as a primary CTA.
- Dot-grid background pattern at 24×24px — quiet, geometric, evocative of grid paper.
- Type pairing inside the sans family: `Inter` for body, `Space Grotesk` for display. The voice stays inside one family but contrast comes from family swap.

## 2. Color Palette & Roles

### Backgrounds
- **Deep** (`#0a0a0a`): Page floor.
- **Surface** (`#121212`): Main content wrapper.
- **Card** (`#1a1a1a`): The `.t-card` fill.
- **Hover** (`#242424`): Card-hover and row-hover.

### Text
- **Bright** (`#fafafa`): Headings, primary CTAs. Same value as the accent — they are interchangeable.
- **Text** (`#b8b8b8`): Body copy.
- **Muted** (`#6b6b6b`): Captions, de-emphasized labels.

### Accents
- **White** (`#fafafa`): The "primary" accent — same as bright text. Used as the active border on cards, focus rings on inputs, and as the underline on active tabs. Border-active surfaces get this color at 100%.
- **Coral** (`#f25f4c`): The alarm color. Live status dots, live alert pills. Never a CTA fill, never a link text.
- **Accent Glow** (`rgba(250, 250, 250, 0)`): Intentionally zeroed — there is no white glow.
- **Coral Glow** (`rgba(242, 95, 76, 0.12)`): A faint coral wash, used only inside live status dots.

### Borders
- **Border** (`#2a2a2a`): Default 2px line — cards, dividers. Thicker than every other theme; the rule itself is part of the visual language.
- **Border Active** (`#fafafa`): On focus / active state, the border flips to full-contrast white. No color shift, no glow — just a value swap.

### Semantic
- **Info** (`#7aa2f7`): A periwinkle blue. Informational pills.
- **Success** (`#9ece6a`): A muted lime — the "ok" state.
- **Warning** (`#e0af68`): Soft amber.
- **Error** (`#f7768e`): A muted rose. Distinct from the alarm coral — error is a state, alarm is an action.

## 3. Typography Rules

### Font Family
- **Primary**: `Inter`, with fallbacks: `system-ui, sans-serif`
- **Display**: `Space Grotesk`, with fallbacks: `Inter, sans-serif`
- **Mono**: `JetBrains Mono`, with fallbacks: `Fira Code, monospace`
- **Terminal**: `JetBrains Mono`, with fallbacks: `Fira Code, monospace`

### Hierarchy
Base 15px / 1.55. The system favors heavy display weights — Space Grotesk 700 at 64px with tight tracking is the loudest moment, and Inter 600 at 16px is what most "section heads" land at.

| Role | Family | Size | Weight | Use |
|---|---|---|---|---|
| Display XL | Space Grotesk | 56–64px | 700 | Page hero |
| Display | Space Grotesk | 36–48px | 700 | Section heads |
| H2 | Space Grotesk | 24px | 600 | Subsection heads |
| H3 | Inter | 16px | 600 | Inline subheads |
| Body | Inter | 15px | 400 | Default running text |
| Caption | Inter | 13px | 500 | Card meta, labels |
| Micro | Inter | 11px | 700, uppercase, 0.15em tracking | Section labels, classifications |
| Mono | JetBrains Mono | 13–15px | 400 | Code, inline IDs |

### Principles
- **Heavy display weights, tight body.** Space Grotesk 700 carries display; Inter 400 carries body. The contrast is the hierarchy.
- **No italics.** The system stays upright. Italics in a brutalist surface read as soft.
- **Tracking is conservative on body.** Display gets `-0.02em` to feel chiseled; body stays at 0.

## 4. Component Stylings

### Cards (`.t-card`)
- Background: flat `#1a1a1a`. No gradient.
- Border: **`2px solid #2a2a2a`** — twice the weight of every other theme.
- Radius: **`0`** — sharp corners are the brand.
- Hover: border becomes `#fafafa` (full white). No transform, no shadow, no color shift on the surface.

### Glow (`.t-glow`)
- `box-shadow: none`. Intentionally empty — the brutalist contract is "no elevation."

### Status Dots
- 8×8px **squares** (`border-radius: 0`) — the only theme that overrides the standard circular dot.
- `.live` — coral fill, 1.8s blink, no bloom.
- `.idle` — amber fill.
- `.error` — rose fill.

### Background Pattern (`.t-bg-pattern`)
- Radial-gradient dot grid: 1px dots at 24×24px tile in the border tone. Quiet, geometric, evocative of engineer's grid paper.

### Skeleton Shimmer
- Standard gradient between `hover` and `card`. The shimmer is the only motion the system tolerates besides status-dot blink.

### Scrollbar
- 8px width — wider than other themes; the rule itself is meant to be visible. Square thumbs (no radius), white-on-hover.

## 5. When To Reach For This Theme

- Editorial reading interfaces (essays, longreads, documentation).
- Brutalist marketing — Berghain, archive sites, art-direction-heavy portfolios.
- Anywhere the absence of color is the brand statement (privacy tools, security software, archival systems).

## 6. Avoid This Theme For

- Consumer e-commerce or marketplace UIs — the lack of color and elevation removes most of the "clickable" affordances those flows depend on.
- Data dashboards with many statuses to differentiate — Monolith's restrained semantic palette flattens too many states into similar muted tones.
- Brand systems where the company already has a strong color identity — Monolith will erase rather than complement it.
