# Design System Inspired by Solamp

## 1. Visual Theme & Atmosphere

Solamp is solar-industrial clean — a light corporate system inspired by solampio.com. The page substrate is a soft cool-gray (`#f7f8fa`) with pure white cards and a crisp navy primary (`#1d64c6`) paired against a warm amber sun-lamp accent (`#f5a524`). The two accents represent the brand identity directly: navy for trust and structure, amber for solar warmth. Cards are flat white with `8px` rounding and a 1px soft shadow at 4% black — a clean, modern SaaS look without the candy-bright excess of consumer products.

Type is `Inter` for body / UI (the workhorse of modern SaaS) paired with `Manrope` for display headlines. Manrope's wider counters give display a slight friendliness without sacrificing structure; Inter's well-tuned hinting handles the dense UI work. Base size is 15px / 1.6 — readable, not cramped. The page-pattern is a `48×48px` grid of hairlines in the border tone — reads as engineering blueprint without being aggressive. Hover affordances are subtle: cards lift 1px with a navy-tinted shadow at 8% opacity.

**Key Characteristics:**
- Light substrate (`#f7f8fa`) with pure white cards. The subtle gray-on-white contrast is the depth signal.
- Navy + amber accent pair (`#1d64c6` / `#f5a524`). Navy carries primary chrome (CTAs, focus, links); amber carries warmth (warning state, accent moments).
- Flat cards with `8px` rounding and a soft 4%-black 1px shadow. Hover lifts 1px and adds a navy-tinted shadow.
- Type pairing: `Inter` body / `Manrope` display. Display moments come from family swap, not weight.
- 48×48px grid background pattern in the border tone — engineering blueprint, never decorative.
- Status dots use a saturated success green (`#16a34a`) for `.live` — the brightest live-state color of any light theme in the system.

## 2. Color Palette & Roles

### Backgrounds
- **Deep** (`#f7f8fa`): Page floor — soft cool gray.
- **Surface** (`#ffffff`): Main content wrapper — pure white.
- **Card** (`#ffffff`): Cards — same as surface (cards differentiate by border + shadow, not fill).
- **Hover** (`#eef1f5`): Row-hover and de-emphasized surfaces.

### Text
- **Bright** (`#0b1b2c`): Headings, primary CTAs. A deep navy-ink — never pure black.
- **Text** (`#334155`): Body copy. Slate-700 family.
- **Muted** (`#64748b`): Captions, timestamps. Slate-500 family.

### Accents
- **Navy** (`#1d64c6`): The signature primary. Buttons, links, active borders, focus rings. Saturated blue with a slight push toward indigo.
- **Amber** (`#f5a524`): The warm counterpoint. Sun-lamp accent — used for warmth moments, warning state, hero highlights. Never on a primary CTA fill.
- **Navy Glow** (`rgba(29, 100, 198, 0.10)`): The hover-bloom on cards and focus halo.
- **Amber Glow** (`rgba(245, 165, 36, 0.14)`): The matching amber wash.

### Borders
- **Border** (`#e2e8f0`): Default hairline. Slate-200 — soft on white.
- **Border Active** (`#1d64c6`): Full navy on focus / active state.

### Semantic
- **Info** (`#1d64c6`): Same as navy accent.
- **Success** (`#16a34a`): A saturated, confident green. The most assertive live-state color in the light themes.
- **Warning** (`#f5a524`): Same as the amber accent.
- **Error** (`#dc2626`): A confident red — never muted; this system trusts its semantic colors to be readable.

## 3. Typography Rules

### Font Family
- **Primary**: `Inter`, with fallbacks: `system-ui, sans-serif`
- **Display**: `Manrope`, with fallbacks: `Inter, sans-serif`
- **Mono**: `JetBrains Mono`, with fallbacks: `monospace`
- **Terminal**: `JetBrains Mono`, with fallbacks: `monospace`

The Inter / Manrope pairing is the modern SaaS default — Inter handles dense UI work, Manrope's wider proportions give display headlines a friendlier read. The split is similar to Monolith's Inter / Space Grotesk pairing but lands warmer; Manrope is rounder than Space Grotesk.

### Hierarchy
Base 15px / 1.6. Display moments use Manrope 700–800 at 32–56px.

| Role | Family | Size | Weight | Use |
|---|---|---|---|---|
| Display XL | Manrope | 48–56px | 800 | Page hero |
| Display | Manrope | 32–40px | 700 | Section heads |
| H2 | Manrope | 22–24px | 600 | Subsection heads |
| H3 | Inter | 16px | 600 | Inline subheads |
| Body | Inter | 15px | 400 | Default running text |
| Caption | Inter | 13px | 500 | Card meta, labels |
| Micro | Inter | 11px | 600, uppercase, 0.12em tracking | Section labels, badges |
| Mono | JetBrains Mono | 13px | 400 | Code, IDs |

### Principles
- **Sentence case for display.** Solamp does not lean into all-caps display headlines (unlike Monolith or EVA-01) — sentence case reads as corporate-confident.
- **Tracking is conservative.** Body at 0, display at slight negative tracking (-0.01em) for tighter set.

## 4. Component Stylings

### Cards (`.t-card`)
- Background: pure white `#ffffff`.
- Border: `1px solid #e2e8f0`, radius `8px`.
- Shadow: `box-shadow: 0 1px 2px rgba(11, 27, 44, 0.04)` — a soft rest.
- Hover: `transform: translateY(-1px)` + border becomes navy-at-35% + `box-shadow: 0 6px 20px rgba(29, 100, 198, 0.08)`.

### Glow (`.t-glow`)
- `box-shadow: 0 0 24px rgba(29, 100, 198, 0.10)` — a subtle navy bloom on focus / active surfaces.

### Status Dots
- 8×8px circles.
- `.live` — saturated success green with a soft bloom + 1.8s blink.
- `.idle` — amber, no bloom.
- `.error` — confident red, no bloom.

### Background Pattern (`.t-bg-pattern`)
- 48×48px grid of 1px hairlines in `--border` (slate-200). Reads as engineering blueprint or graph paper — present but never aggressive.

### Skeleton Shimmer
- 90deg gradient at 1.5s.

### Scrollbar
- 10px width — wide enough to be findable on light surfaces. Track in `--deep`, thumb in `#cbd5e1`, thumb-hover in navy.

## 5. When To Reach For This Theme

- B2B SaaS marketing pages.
- Energy / utilities / industrial product chrome.
- Internal admin tooling for organizations that want a corporate-confident read.
- The "default modern SaaS" slot when nothing more opinionated is required.

## 6. Avoid This Theme For

- Consumer / lifestyle brands — Solamp reads as serious-business; it will undermine warmth.
- Audiences that read navy + amber as institutional or governmental in a negative sense.
- Surfaces that need a distinctive visual identity — Solamp is a competent default, not a memorable signature.
