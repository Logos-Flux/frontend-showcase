# Design System Inspired by Oceanic

## 1. Visual Theme & Atmosphere

Oceanic is deep-teal tranquility — midnight teal substrate (`#08131a`) with cyan (`#22d3ee`) and coral (`#fb7185`) as a complementary accent pair. The voice is calm, marine, soft-edged. Cards have a generous `14px` rounding with a subtle linear-gradient fill at 85→95% opacity over a 10px backdrop blur — substantial but never as glossy as EVA-01's glassmorphism. The page-pattern is two atmospheric radial gradients (cyan in the upper-left, coral in the lower-right) at 4–5% opacity — a wave-wash, not a tile.

Type is `Manrope` — a single humanist sans family used for both display and body, with `Fira Code` for monospace. Manrope's wider counters and slightly soft terminals read as approachable rather than industrial; the system uses the same family for headings and body, scaling with weight (700 for display, 400 for body) instead of swapping families. Body runs at 15px / 1.6 — comfortable for reading. Status dots use the cyan accent for `.live` with a 1.5s blink and a faint cyan bloom — calm, oceanic, never alarming.

**Key Characteristics:**
- Deep-teal substrate (`#08131a`) — cool, slightly warm of pure black-blue. Cards use a teal gradient fill, not flat.
- Cyan + coral accent pair (`#22d3ee` / `#fb7185`) — complementary. Cyan carries primary chrome, coral carries warmth and counterpoint.
- Generous `14px` card rounding with backdrop-blur(10px) and a soft cyan-glow on hover. Cards lift 2px on hover with a teal-tinted shadow.
- Single-family typography: `Manrope` for both display and body. Family swap is replaced with weight contrast.
- Page background is two diffused radial gradients (cyan + coral) at low opacity — a wave-wash, never patterned.
- Status dots use cyan for live state with a 1.5s blink — slower and softer than the EVA-01 / Phosphor blinks.

## 2. Color Palette & Roles

### Backgrounds
- **Deep** (`#08131a`): Page floor. Deep midnight teal — not pure black, not slate.
- **Surface** (`#0e1f2a`): Main content wrapper.
- **Card** (`#122a38`): The `.t-card` fill (rendered as an 85→95% gradient).
- **Hover** (`#1a3847`): Card-hover and row-hover.

### Text
- **Bright** (`#e8f4f8`): Headings, statement text. A warm white with a slight teal cast.
- **Text** (`#a8c4d0`): Body copy. Soft slate-teal — never gray.
- **Muted** (`#547282`): Captions, timestamps.

### Accents
- **Cyan** (`#22d3ee`): The signature primary. Active borders, focus rings, primary buttons, link text on hover.
- **Coral** (`#fb7185`): The warm counterpoint. Used for accent moments that need contrast against the teal — error states, save-state hearts, secondary CTAs.
- **Cyan Glow** (`rgba(34, 211, 238, 0.20)`): The card-hover bloom and focus-ring halo.
- **Coral Glow** (`rgba(251, 113, 133, 0.15)`): The matching coral wash.

### Borders
- **Border** (`rgba(168, 196, 208, 0.10)`): Default hairline. A washed-out teal at 10% — soft, never harsh.
- **Border Active** (`rgba(34, 211, 238, 0.50)`): Cyan-at-50% on focus / active state.

### Semantic
- **Info** (`#22d3ee`): Same as cyan accent.
- **Success** (`#34d399`): An emerald-green — slightly more saturated than the cyan.
- **Warning** (`#fbbf24`): Soft amber.
- **Error** (`#f87171`): A muted red-rose.

## 3. Typography Rules

### Font Family
- **Primary**: `Manrope`, with fallbacks: `system-ui, sans-serif`
- **Display**: `Manrope`, with fallbacks: `system-ui, sans-serif`
- **Mono**: `Fira Code`, with fallbacks: `JetBrains Mono, monospace`
- **Terminal**: `Fira Code`, with fallbacks: `JetBrains Mono, monospace`

Single-family typography is the system's signature simplification. Manrope's wide counters and soft terminals carry both display and body comfortably; weight does the work that family-swap does in other themes. Fira Code (with ligatures) handles code; the ligatures are part of the personality.

### Hierarchy
Base 15px / 1.6. Display moments come from weight 700 at 32–56px.

| Role | Family | Size | Weight | Use |
|---|---|---|---|---|
| Display XL | Manrope | 48–56px | 700 | Page hero |
| Display | Manrope | 32–40px | 700 | Section heads |
| H2 | Manrope | 22–24px | 600 | Subsection heads |
| H3 | Manrope | 16px | 600 | Inline subheads |
| Body | Manrope | 15px | 400 | Default running text |
| Caption | Manrope | 13px | 500 | Card meta, labels |
| Micro | Manrope | 11px | 600, uppercase, 0.15em tracking | Section labels |
| Mono | Fira Code | 13–14px | 400 | Code, inline tokens (with ligatures) |

### Principles
- **Weight, not family, carries hierarchy.** Manrope 700 vs 400 — that's the entire typographic dial.
- **Generous leading.** Body at 1.6 — roomier than a typical SaaS dashboard. Space is part of the calm.
- **Code with ligatures.** Fira Code's `=>`, `->`, `!=` ligatures are intentional — leave them on.

## 4. Component Stylings

### Cards (`.t-card`)
- Background: `linear-gradient(160deg, rgba(18, 42, 56, 0.85) 0%, rgba(14, 31, 42, 0.95) 100%)`
- Backdrop filter: `blur(10px)` — cards feel slightly translucent.
- Border: `1px solid rgba(168, 196, 208, 0.10)`, radius `14px` — generous.
- Hover: border becomes cyan-at-50% + `box-shadow: 0 8px 32px rgba(34, 211, 238, 0.08)` + `transform: translateY(-2px)`. The card both rises and gains a teal halo.

### Glow (`.t-glow`)
- `box-shadow: 0 0 20px rgba(34, 211, 238, 0.20), 0 0 40px rgba(34, 211, 238, 0.08)` — double-layer cyan bloom for active surfaces.

### Status Dots
- 8×8px circles.
- `.live` — cyan fill with cyan bloom + 1.5s blink.
- `.idle` — amber, no bloom.
- `.error` — muted red-rose with a faint bloom.

### Background Pattern (`.t-bg-pattern`)
- Two radial gradients: cyan-at-5% in the upper-left (20%/30%), coral-at-4% in the lower-right (80%/70%). The result reads as a wave-wash diffuse field — atmospheric, never tiled or pattern-like.

### Skeleton Shimmer
- 90deg gradient at 1.5s — slightly slower than the dark sci-fi themes, matching the calm.

### Scrollbar
- 8px width with rounded thumbs (4px radius). Track in `--deep`, thumb in `--border`, thumb-hover in cyan.

## 5. When To Reach For This Theme

- Wellness / meditation product surfaces.
- Marine, ocean-research, or nature-adjacent brands.
- AI-product surfaces that want to feel calm rather than urgent (the inverse of the EVA-01 / Phosphor energy).
- Long-form reading on a dark substrate.

## 6. Avoid This Theme For

- High-density operations dashboards — the generous rounding and leading consume vertical space.
- Audiences that need a high-energy / urgent read — Oceanic deliberately removes urgency from every signal.
- Brands with a warm-only palette — the cool teal substrate will fight orange/red brand identities.
