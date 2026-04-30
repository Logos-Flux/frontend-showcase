# Design System Inspired by Perplexity

## 1. Visual Theme & Atmosphere

Perplexity is a calm research console — dark near-black surfaces with the brand's signature **True Turquoise** (`#20808d`) as the single voltage. The voice is restraint over flourish: clarity prioritized over theatrics. The substrate is `#0d0d0e` — a near-black with the faintest warm tint, layered up through `#141416` and `#1b1c1f` to give cards a sense of stack without ever lifting off the deep base. Text sits in a warm cream-tinted neutral (`#c8c8c4` / `#f4f3ee`) — Perplexity's deliberate "off-white paper" feel rather than the cold gray most dark UIs default to.

The typography is the most opinionated decision: Perplexity ships proprietary **FK Grotesk Neue** and **FK Display** by Florian Karsten — geometric sans with characteristic open apertures and unconventional `ss01` / `cv11` OpenType features that the system loads via `font-feature-settings`. We substitute with Inter as the closest open-licensed match. Cards have a generous `12px` rounding with a flat fill — no gradient, no blur — and the `.t-glow` is a pair of soft teal halos rather than a hot bloom. The page-pattern is a quiet 22×22px dot grid at 3.5% white — barely there, evocative of research-paper lined paper. Status dots get a distinctive halo-pulse animation: a 3px-then-6px ring expansion at 2s, slower and more meditative than the blink animations in other themes.

**Key Characteristics:**
- True Turquoise (`#20808d`) is the single brand voltage — never paired with a second saturated accent. Sea Foam (`#5fbfb2`) is its lighter sibling for hover-bright moments.
- Warm cream text on near-black substrate — Perplexity's defining "research paper at midnight" feel. `#c8c8c4` body, `#f4f3ee` bright. Never pure white, never cold gray.
- Restrained glow language — `.t-glow` is a soft teal halo (`0 0 0 1px + 0 8px 24px`), not a neon bloom. The brand is calm.
- Status dots use a halo-pulse animation (3px→6px ring at 2s) instead of opacity blink. Slower, meditative.
- 22×22px radial-dot background pattern at 3.5% white — quiet research-paper texture.
- OpenType features `ss01` and `cv11` are enabled globally on `<html>` — leave them on; they're the brand's typographic fingerprint.

## 2. Color Palette & Roles

### Backgrounds
- **Deep** (`#0d0d0e`): Page floor — near-black with a faint warm tint.
- **Surface** (`#141416`): Main content wrapper.
- **Card** (`#1b1c1f`): The `.t-card` fill — flat, no gradient.
- **Hover** (`#25262a`): Card-hover and row-hover.

### Text
- **Bright** (`#f4f3ee`): Headings, primary CTAs over dark. A warm cream — never pure white.
- **Text** (`#c8c8c4`): Body copy. Cool cream with a slight green-gray cast.
- **Muted** (`#7c7d80`): Captions, timestamps.

### Accents
- **True Turquoise** (`#20808d`): The signature primary. Active borders, focus rings, primary buttons, link text. The single brand voltage.
- **Sea Foam** (`#5fbfb2`): The lighter sibling. Used for highlight moments and hover-bright text. Never on a primary CTA fill.
- **Turquoise Glow** (`rgba(32, 128, 141, 0.28)`): The hover halo on cards and the focus-ring bloom — substantial (28% opacity) but the diffusion radius is small, so it reads as halo rather than neon.
- **Sea Foam Glow** (`rgba(95, 191, 178, 0.20)`): The matching softer wash.

### Borders
- **Border** (`#2a2b2f`): Default hairline — quiet, almost matching `--card`.
- **Border Active** (`rgba(32, 128, 141, 0.55)`): Turquoise-at-55% on focus / active.

### Semantic
- **Info** (`#4a9bb5`): A muted slate-teal.
- **Success** (`#4caf7c`): A muted emerald.
- **Warning** (`#d9a23a`): Soft amber.
- **Error** (`#d96552`): A warm coral-red.

All semantic colors land in the same muted register as the brand voltage — Perplexity never hits a hot saturated digital color.

## 3. Typography Rules

### Font Family
- **Primary**: `FK Grotesk Neue`, with fallbacks: `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- **Display**: `FK Display`, with fallbacks: `FK Grotesk Neue, Inter, ui-sans-serif, system-ui, sans-serif`
- **Mono**: `JetBrains Mono`, with fallbacks: `SF Mono, IBM Plex Mono, ui-monospace, Menlo, Consolas, monospace`
- **Terminal**: `JetBrains Mono`, with fallbacks: `SF Mono, ui-monospace, Menlo, monospace`
- **OpenType Features**: `ss01`, `cv11` — both enabled globally on `<html>`. These are FK Grotesk Neue's stylistic alternates and they're part of the brand's typographic signature.

FK Grotesk Neue is a geometric sans with unconventional terminals (the `a` has a true single-storey form when `cv11` is active; `g` has a distinctive open descender). FK Display is the heavier sibling for hero moments. When the brand fonts aren't available, Inter is the closest open-licensed match.

### Hierarchy
Base 14px / 1.55 — denser than other dark themes, matching Perplexity's research-console feel.

| Role | Family | Size | Weight | Use |
|---|---|---|---|---|
| Display XL | FK Display | 56–80px | 600 | Page hero |
| Display | FK Display | 32–48px | 500 | Section heads |
| H2 | FK Grotesk Neue | 22–24px | 600 | Subsection heads |
| H3 | FK Grotesk Neue | 16px | 600 | Inline subheads |
| Body | FK Grotesk Neue | 14px | 400 | Default running text |
| Caption | FK Grotesk Neue | 12px | 500 | Card meta, labels |
| Micro | FK Grotesk Neue | 10–11px | 600, uppercase, 0.12em tracking | Section labels |
| Mono | JetBrains Mono | 12–13px | 400 | Code, query strings, IDs |

### Principles
- **Restraint over flourish.** Display weight stays at 500–600, never 800+. The brand's confidence is quiet.
- **OpenType features always on.** `ss01` and `cv11` are part of the typographic identity — leave them enabled.
- **Dense body leading.** 1.55 — tighter than the editorial themes. Perplexity is for reading research, not lounging.

## 4. Component Stylings

### Cards (`.t-card`)
- Background: flat `#1b1c1f`. No gradient, no blur.
- Border: `1px solid #2a2b2f`, radius `12px` — generous.
- Hover: border becomes turquoise-at-55% + the card surface itself shifts to `--hover` (`#25262a`). No translate, no shadow — the surface change is the entire affordance.

### Glow (`.t-glow`)
- `box-shadow: 0 0 0 1px rgba(32, 128, 141, 0.35), 0 8px 24px rgba(32, 128, 141, 0.12)` — a 1px hairline ring inside, plus a soft 24px-blur halo outside. Restrained, never neon.

### Status Dots
- 8×8px circles.
- `.live` — turquoise fill with a halo-pulse animation: `box-shadow` ring expanding from 3px (at 18% opacity) to 6px (at 6% opacity) over 2s. Meditative, not urgent.
- `.idle` — amber, no halo.
- `.error` — warm coral-red with a faint bloom.

### Background Pattern (`.t-bg-pattern`)
- 22×22px radial-dot grid at 3.5% white. Almost-imperceptible — the page feels textured without ever showing pattern.

### Skeleton Shimmer
- Inverted gradient compared to other themes — cycles `card → hover → card` (rather than `hover → card → hover`). Subtler.

### Scrollbar
- 8px width, rounded 4px thumbs. Track in `--deep`, thumb in `--border`, thumb-hover in turquoise.

## 5. When To Reach For This Theme

- Research / knowledge-work products.
- AI-search and answer-engine surfaces (the brand context).
- Long-form reading on a dark substrate where a calm brand voice matters more than energy.
- Product surfaces that want a confident-but-quiet presence — Perplexity's restraint is intentional.

## 6. Avoid This Theme For

- High-energy / consumer / launch contexts — the muted palette and quiet motion don't carry urgency.
- Brands with chromatic identity beyond the teal family — Perplexity's monovoltage will fight any second saturated color you try to inject.
- Surfaces requiring loud display moments — the system caps display weight at 600 by intent.
