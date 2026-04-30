# Design System Inspired by Sakura

## 1. Visual Theme & Atmosphere

Sakura is light editorial — warm paper white (`#f6f1ea`) as the page floor, pure white for cards, and a single voltage of muted coral-pink (`#d4556b`) as the brand voice. The cool counterpoint is a quiet plum-blue (`#6b7a9b`) used for informational chrome. The palette is intentionally muted across the board — accents land at ~30% chroma rather than full saturation, so the whole system reads as sun-bleached cherry-blossom prints rather than candy. Cards have generous `12px` rounding with a hairline border at 10% black and a soft 1px paper-shadow that lifts 2px on hover. There is no glow theatrics; the depth language is paper, not screen.

Type is the second pillar of the personality: `Fraunces` (a high-contrast variable serif with optical sizing) carries every display headline, paired with `Inter` for body and UI. Fraunces at 600+ has dramatic stroke contrast and a soft humanist warmth; the optical-size axis means display sizes get tighter cap height than body sizes automatically. The result reads as a quiet design magazine — generous leading at 1.6, modest weights, and the serif doing the typographic heavy lifting at every section head.

**Key Characteristics:**
- Warm-paper canvas (`#f6f1ea`) — never pure white. Cards are pure white (`#ffffff`) so they pop against the warm background.
- Single voltage of muted coral-pink (`#d4556b`) for accents; secondary plum-blue (`#6b7a9b`) for informational chrome. Both are ~70% chroma — never fully saturated.
- Generous 12px card rounding with a soft 1px paper-shadow. Hover lifts cards 2px with a slightly heavier shadow.
- Editorial type: `Fraunces` variable serif (with optical sizing) for display, `Inter` for body. The serif carries the personality.
- Background pattern is a duo of soft radial gradients at 4% opacity in the brand colors — diffused, atmospheric, never pattern-like.
- Status dots use the muted sage success green for `.live` (with a soft bloom + 1.8s blink) — the slowest blink of any theme, intentional calm.

## 2. Color Palette & Roles

### Backgrounds
- **Deep** (`#f6f1ea`): Page floor — warm cream paper.
- **Surface** (`#fbf7f1`): Main content wrapper — slightly lighter than the floor.
- **Card** (`#ffffff`): Pure white cards. The contrast with the cream floor is the system's primary depth signal.
- **Hover** (`#f0e9df`): Row-hover and de-emphasized card surfaces.

### Text
- **Bright** (`#1a1512`): Headings, statement text. A warm near-black with a brown undertone — never pure black.
- **Text** (`#4a3f3a`): Body copy. Same warm-brown family, slightly desaturated.
- **Muted** (`#8a7f77`): Captions, timestamps.

### Accents
- **Coral** (`#d4556b`): The signature pink. Primary buttons, active tabs, link text. Used scarcely — most pages have one or two coral moments.
- **Plum** (`#6b7a9b`): A muted slate-blue. Informational pings, secondary chrome.
- **Coral Glow** (`rgba(212, 85, 107, 0.10)`): The card-bloom shadow on focus and the gradient wash inside `.t-bg-pattern`.
- **Plum Glow** (`rgba(107, 122, 155, 0.10)`): The matching plum wash for secondary surfaces.

### Borders
- **Border** (`rgba(26, 21, 18, 0.10)`): Default hairline. Black-at-10% on warm paper — almost imperceptible.
- **Border Active** (`rgba(212, 85, 107, 0.45)`): Coral-at-45% on focus / active state.

### Semantic
- **Info** (`#4a7fa8`): A muted teal-blue.
- **Success** (`#5a8055`): A sage green — used for live status.
- **Warning** (`#c48a3a`): A soft mustard.
- **Error** (`#b54a4a`): A muted rose-red.

All semantic colors are pulled toward the same warm-muted center as the accents — Sakura never hits a saturated digital color.

## 3. Typography Rules

### Font Family
- **Primary**: `Inter`, with fallbacks: `system-ui, sans-serif`
- **Display**: `Fraunces`, with fallbacks: `Georgia, serif`
- **Mono**: `JetBrains Mono`, with fallbacks: `monospace`
- **Terminal**: `JetBrains Mono`, with fallbacks: `monospace`

Fraunces is a variable serif with both `weight` and `opsz` (optical size) axes. The system uses the optical-size axis to render display sizes with tighter cap height and more dramatic stroke contrast — body-size Fraunces (when used) renders with a softer, more legible cut. Inter handles all body, UI, and label work.

### Hierarchy
Base 15px / 1.6. Headings run modest weight (Fraunces 500–600) — the serif's natural contrast carries hierarchy.

| Role | Family | Size | Weight | Use |
|---|---|---|---|---|
| Display XL | Fraunces | 56–72px | 600 (opsz 144) | Page hero |
| Display | Fraunces | 32–48px | 500 | Section heads |
| H2 | Fraunces | 22–24px | 600 | Subsection heads |
| H3 | Inter | 16px | 600 | Inline subheads |
| Body | Inter | 15px | 400 | Default running text |
| Caption | Inter | 13px | 500 | Card meta, labels |
| Micro | Inter | 11px | 600, uppercase, 0.15em tracking | Section labels |
| Mono | JetBrains Mono | 13px | 400 | Code, inline tokens |

### Principles
- **Modest display weight, generous leading.** Fraunces 500–600 (not 800+) at 1.1–1.2 line-height. The page should feel like reading rather than scanning.
- **Italic-as-emphasis.** Fraunces italic has dramatic contrast — preferred over bold for inline emphasis in editorial copy.
- **Optical sizing where possible.** When using Fraunces at display sizes, advance `opsz` to ~144 for tighter cap height; at body sizes, leave it default for legibility.

## 4. Component Stylings

### Cards (`.t-card`)
- Background: pure white `#ffffff`. The contrast against the cream `--deep` is the depth signal.
- Border: `1px solid rgba(26, 21, 18, 0.10)`, radius `12px`.
- Shadow: `box-shadow: 0 1px 3px rgba(26, 21, 18, 0.04)` — a soft paper rest.
- Hover: `transform: translateY(-2px)` + border becomes coral-at-45% + `box-shadow: 0 6px 20px rgba(26, 21, 18, 0.08)`.

### Glow (`.t-glow`)
- `box-shadow: 0 0 24px rgba(212, 85, 107, 0.10)` — a soft coral bloom. Diffused, never neon.

### Status Dots
- 8×8px circles.
- `.live` — sage green fill with a soft bloom + 1.8s blink.
- `.idle` — soft mustard fill, no bloom.
- `.error` — muted rose with a faint bloom.

### Background Pattern (`.t-bg-pattern`)
- Two radial gradients: coral-at-4% in the upper-left, plum-at-4% in the lower-right. The result is an atmospheric wash, not a pattern — like a watercolor underpainting beneath the content.

### Skeleton Shimmer
- 90deg gradient at 1.6s — the slowest of any theme, matching the editorial calm.

### Scrollbar
- 10px width — wider than the dark themes; the page wants the scroll affordance to be findable. Track in `--deep`, thumb in `rgba(26, 21, 18, 0.15)`, thumb-hover at 30%.

## 5. When To Reach For This Theme

- Editorial / publishing.
- Wellness, lifestyle, hospitality marketing.
- Photo-led content (the warm paper canvas reads behind imagery without competing).
- Long-form reading where the audience expects a magazine register rather than tech-product chrome.

## 6. Avoid This Theme For

- Operations dashboards — the muted semantic palette doesn't differentiate states sharply enough.
- Audiences that read serif as feminine or precious (some industrial / B2B contexts).
- Surfaces that need a hot, urgent CTA — Sakura's coral is too muted to break attention.
