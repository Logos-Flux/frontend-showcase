# Design System Inspired by Aurum

## 1. Visual Theme & Atmosphere

Aurum is dark luxury — a near-black canvas (`#0c0c0c`) with a single voltage of brushed gold (`#c9a96e`) carrying every accent moment. The voice is editorial and quiet, like a private-bank statement or a luxury watch microsite. There is no glow theatrics, no glassmorphism, no neon — depth comes from a near-imperceptible 2.2% noise grain over the entire surface, soft 1px hairlines at 6% white, and a single shadow tier on hovered cards. The cool-tone alternate accent is a slate steel blue (`#7b97ad`) — used sparingly for secondary chrome and informational pings; never on a primary surface.

Type is the system's most opinionated decision: `Cormorant Garamond` (a high-contrast transitional serif) carries every display headline, paired with `DM Sans` for body and UI. The serif/sans pairing reads as editorial print rather than tech-product — column body copy at 15px / 1.6 leading, display headlines at 32–48px with no weight bump (Cormorant 400 carries enough contrast on its own). Cards have just `6px` rounding — slightly more refined than a sharp brutalist corner, but never pillowy. The overall feel is restraint as luxury signal.

**Key Characteristics:**
- Single-voltage gold (`#c9a96e`) carries every accent moment — primary buttons, active borders, link text. Used sparingly; most surface area is text + hairline.
- 2.2% SVG noise grain over the whole pattern surface — the system's only texture treatment, but it makes the dark substrate feel like uncoated paper rather than backlit OLED.
- Editorial type pairing: `Cormorant Garamond` serif for display, `DM Sans` for body. Display weight stays at 400 — the serif's contrast carries hierarchy, no weight bump needed.
- Single shadow tier on hovered cards (`box-shadow: 0 12px 40px rgba(0,0,0,0.4)`) — substantial drop, not a glow. Cards lift 3px on hover with a translateY transform.
- Restrained warmth: text is `#9e9689` (warm cream-beige), bright is `#ede8e0`, muted is `#605b54`. No pure white anywhere.
- No glassmorphism, no neon, no scanlines. The discipline is the brand.

## 2. Color Palette & Roles

### Backgrounds
- **Deep** (`#0c0c0c`): Page floor. Near-black, slightly warmer than pure black to read as ink rather than void.
- **Surface** (`#131313`): Main content wrapper.
- **Card** (`#1a1a1a`): The `.t-card` fill — flat, no gradient.
- **Hover** (`#222222`): Card-hover and row-hover.

### Text
- **Bright** (`#ede8e0`): Headings, primary CTAs over dark, statement text.
- **Text** (`#9e9689`): Body copy. A warm cream-beige — never pure gray.
- **Muted** (`#605b54`): Captions, timestamps, de-emphasized labels.

### Accents
- **Gold** (`#c9a96e`): The single brand color. Primary buttons, active tabs, link text, focus rings. The system's restraint is intentional — gold appears 1–2 times per viewport, never as a fill behind body copy.
- **Steel** (`#7b97ad`): The cool counterpoint. Used for informational state, secondary tabs, and hover affordances on text-only surfaces. Never on primary CTAs.
- **Gold Glow** (`rgba(201, 169, 110, 0.08)`): An almost-imperceptible wash — used inside `.t-glow` and as the focus-ring bloom on inputs.
- **Steel Glow** (`rgba(123, 151, 173, 0.08)`): The matching steel wash.

### Borders
- **Border** (`rgba(255, 255, 255, 0.06)`): The default 1px hairline — cards, dividers, table rules. Sits at 6% white on the dark substrate, almost invisible until hover.
- **Border Active** (`rgba(201, 169, 110, 0.3)`): Gold-at-30% — focus and hover state.

### Semantic
- **Info** (`#7b97ad`): Same as `accent-alt` steel. Informational pills.
- **Success** (`#8a9e72`): A muted olive-sage. Live status dots.
- **Warning** (`#c9a96e`): Same as the gold accent — the system intentionally collapses warning into the brand color.
- **Error** (`#9b7070`): A muted oxblood, never a hot red. Errors should feel like a quiet correction, not an alarm.

## 3. Typography Rules

### Font Family
- **Primary**: `DM Sans`, with fallbacks: `system-ui, sans-serif`
- **Display**: `Cormorant Garamond`, with fallbacks: `Georgia, serif`
- **Mono**: `JetBrains Mono`, with fallbacks: `Fira Code, monospace`
- **Terminal**: `JetBrains Mono`, with fallbacks: `Fira Code, monospace`

The display/body split is the entire typographic personality. Cormorant Garamond is a high-contrast transitional serif (Garamond's bones with thinner hairlines and tighter cap height) — it carries every display headline at weight 400, since the family's natural stroke contrast is enough hierarchy on its own. DM Sans is a low-key geometric sans for body, labels, and UI — it stays out of the way so the serif lands.

### Hierarchy
Base size is 15px / 1.6. Headings step up in family swaps, not weight bumps.

| Role | Family | Size | Weight | Use |
|---|---|---|---|---|
| Display XL | Cormorant Garamond | 48–64px | 400 | Page hero |
| Display | Cormorant Garamond | 32–40px | 500 | Section heads |
| H2 | Cormorant Garamond | 24px | 500 | Subsection heads |
| H3 | DM Sans | 16px | 600 | Inline subheads inside body copy |
| Body | DM Sans | 15px | 400 | Default running text |
| Caption | DM Sans | 13px | 500 | Card meta, labels |
| Micro | DM Sans | 11px | 600, uppercase, 0.18em tracking | Section labels, footer rows |
| Mono | JetBrains Mono | 12–14px | 400 | Code, inline tickers |

### Principles
- **Family swap > weight bump.** Display moments come from Cormorant 400, not DM Sans 700.
- **Generous leading.** Body at 1.6 — wider than a default tech-marketing site. The page reads slowly on purpose.
- **Italic-as-emphasis.** Cormorant's italic carries strong contrast — preferred over bold for inline emphasis in editorial copy.

## 4. Component Stylings

### Cards (`.t-card`)
- Background: flat `#1a1a1a`. No gradient, no blur.
- Border: `1px solid rgba(255, 255, 255, 0.06)`, radius `6px`.
- Hover: `transform: translateY(-3px)` + border becomes gold-at-30% + `box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4)`. The card lifts substantially — this is the system's loudest motion moment.

### Glow (`.t-glow`)
- `box-shadow: 0 0 20px rgba(201, 169, 110, 0.08)` — almost-imperceptible. The gold whispers; it does not announce.

### Status Dots
- 8×8px circles. `.live` uses the muted `success` olive (`#8a9e72`) with a soft bloom and 1.5s blink. `.warning` uses the gold (no bloom). `.error` uses the muted oxblood (`#9b7070`).

### Background Pattern (`.t-bg-pattern`)
- SVG fractal-noise overlay at 2.2% opacity, applied via `::after` pseudo-element. The grain is the system's only texture — it makes the near-black canvas feel like uncoated cardstock rather than a screen.

### Skeleton Shimmer
- Standard 90deg gradient between `hover` and `card` tones at 1.4s — same shape as other themes, restrained palette.

### Scrollbar
- 6px width. Track in `--deep`, thumb in `--border` (almost invisible), thumb-hover in gold.

## 5. When To Reach For This Theme

- Editorial / publishing surfaces.
- Premium / luxury product marketing.
- Investor decks, board reports — anywhere the visual signal "we have nothing to prove" matters.
- Long-form reading experiences (the body leading + serif display rewards scrolling rather than scanning).

## 6. Avoid This Theme For

- High-density operations dashboards — the body leading is too generous to fit dense data tables comfortably.
- Audiences that read serif as old-fashioned (consumer mass-market, gaming, dev-tooling).
- Use cases that need a hot error/alert color — Aurum's muted oxblood will not draw the eye on a busy screen.
