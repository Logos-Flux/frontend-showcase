# Frontend Showcase

## What is this?
The Logos-Flux frontend showcase: a React + Tailwind 4 starter template with a runtime-swappable theme system, 67 brand-derived design systems, a 28-component theme-agnostic library, and a brand `DESIGN.md` viewer. Built to be cloned, customised, and deployed (Docker / Proxmox LXC / Fly.io — see `deploy/`).

## Tech Stack
- **React 19** + TypeScript + Vite
- **Tailwind CSS v4** (via @tailwindcss/vite plugin)
- **Routing:** react-router-dom v7
- **Icons:** lucide-react
- **Package Manager:** bun (NOT npm/npx)

## Commands
```bash
bun install             # Install deps
bun run dev             # Dev server on :5174
bun run build           # Production build → dist/
bun run preview         # Preview build
bun run lint            # ESLint
```

## Architecture
```
src/
├── styles/base.css      # Tailwind + @source + token registration (@theme)
├── styles/fonts.ts      # @fontsource imports — locally bundled woff2s
├── lib/themes.ts        # THEMES registry, getActiveTheme/setActiveTheme
├── lib/designSpecs.ts   # DESIGN_SPECS list + brandFontStack() substitutions
├── components/
│   ├── layout/          # AppLayout, TopNav, Sidebar, Footer, SiteSwitchBar, GlobalPalette
│   ├── library/         # 28 reusable UI components (theme-agnostic)
│   └── ui/              # ThemeCard, BrandSwitcher
├── pages/               # Route pages (DesignSpecs, PlaceholderPage)
├── showcase/
│   └── LibraryShowcase.tsx  # /showcase page — catalog of every library specimen
└── App.tsx              # Router + ToastProvider

public/themes/           # Runtime-loaded theme CSS files (swap via <link>)
├── eva-01.css, aurum.css, monolith.css, sakura.css, phosphor.css, oceanic.css, ...
```

## Routes
- `/` → redirects to `/showcase`
- `/showcase` — component catalog (`LibraryShowcase`)
- `/design-specs` and `/design-specs/:slug` — brand `DESIGN.md` viewer
- `/:area/:slug` — placeholder page (covers TopNav/Sidebar dummy items)

The showcase and design-specs pages share the same `AppLayout` chrome (TopNav + Sidebar + SiteSwitchBar). `SiteSwitchBar` is the top strip that switches between Showcase and Designs.

## Theme System
Runtime-swappable. The active theme is loaded via `<link id="theme-css">` in `index.html` and swapped by updating its `href`. Persistence via `localStorage`.

- **Token registration:** `src/styles/base.css` has a single `@theme` block listing all `--color-t-*` + `--font-*` tokens. Tailwind compiles utility classes (`bg-t-surface`, `text-t-bright`, etc.) once against these names.
- **Theme files:** `public/themes/*.css`. Plain CSS — each one `:root { --color-t-*: ... }` + component classes (`.t-card`, `.t-glow`, `.t-bg-pattern`, `.t-shimmer`, `.font-terminal`, `.status-dot`, keyframes). No Tailwind involvement.
- **Registry:** `src/lib/themes.ts` lists all themes. `getActiveTheme()` / `setActiveTheme(id)` handle persistence + `<link>` swap.
- **UI:** `src/components/ui/BrandSwitcher.tsx` — unified theme + brand picker built on the library's `DropdownMenu`, with type-to-filter search. Mounted in `TopNav`. Selecting an entry both swaps the active theme and (when on `/design-specs/*`) navigates the viewer to the matching spec.
- **Bootstrap:** A tiny inline script in `index.html` reads `localStorage` before React mounts to prevent flash of wrong theme.

### Available Themes
- **EVA-01** (`eva-01.css`) — dark sci-fi command center, purple/green accents, circuit-bg
- **Aurum** (`aurum.css`) — dark luxury, gold accents, grain texture, serif display
- **Monolith** (`monolith.css`) — brutalist mono, 2px borders, sharp, no glow
- **Sakura** (`sakura.css`) — light paper, coral/plum accents, Fraunces serif display
- **Phosphor** (`phosphor.css`) — retro CRT green-on-black, scanlines, VT323 display
- **Oceanic** (`oceanic.css`) — deep teal, cyan/coral accents, rounded cards, Manrope
- **Solamp** (`solamp.css`) — light corporate, navy + amber sun accent, Inter + Manrope
- **DHM** (`dhm.css`) — light aerial, teal + sunset amber, Plus Jakarta Sans + Playfair

### Design Tokens
All themes use shared token names — any new theme must define every one:
- Backgrounds: `t-deep`, `t-surface`, `t-card`, `t-hover`
- Text: `t-text`, `t-bright`, `t-muted`
- Accents: `t-accent`, `t-accent-alt`, `t-accent-glow`, `t-accent-alt-glow`
- Borders: `t-border`, `t-border-active`
- Semantic: `t-info`, `t-success`, `t-warning`, `t-error`
- Fonts: `--font-primary`, `--font-display`, `--font-mono`, `--font-terminal`
- CSS classes: `.t-card`, `.t-glow`, `.t-bg-pattern`, `.t-shimmer`, `.font-terminal`, `.status-dot` (+ `.live` / `.idle` / `.error`)

### Adding a New Theme
1. Copy `public/themes/eva-01.css` → `public/themes/your-theme.css`
2. Update the `:root { --color-t-*: ... }` block — keep token names exactly the same
3. Adjust `.t-card`, `.t-glow`, `.t-bg-pattern`, `.t-shimmer` decorations to suit
4. Add the theme to the `THEMES` array in `src/lib/themes.ts`
5. Reload — the switcher dropdown in `TopNav` picks it up immediately, no rebuild needed

## Component Library (`src/components/library/`)
28 reusable, theme-agnostic components — all driven by `t-*` CSS vars. Import from the barrel:
```ts
import { DataTable, Sparkline, StatusPill, ToastProvider, useToast } from '@/components/library'
```

Grouped by section (see showcase for live demos):
- **Structure:** GradientBorder
- **Controls:** Switch, SegmentedControl, Tabs, DropdownMenu
- **Surfaces:** MiniStatCard, ComplexStatisticsCard, ControllerCard, MessageCard, EmptyState
- **Metrics:** GradientProgress, RadialGauge, Sparkline
- **Status:** StatusPill, Skeleton, LogStream
- **Data:** KeyValueList, DataTable, Pagination
- **Temporal:** Timeline, Heatmap
- **Geospatial:** Globe (three.js), VectorMap (d3-geo + topojson) — lazy-load these
- **Overlays:** Dialog, Drawer, Tooltip, Toast (+ `ToastProvider`/`useToast`), CommandPalette

`ToastProvider` is mounted in `src/App.tsx` so `useToast()` works anywhere in the tree.

## Showcase / Component Catalog
`/showcase` (component `src/showcase/LibraryShowcase.tsx`) is a cockpit-style catalog rendering every library specimen with metadata, import paths, and live demos. It's mounted under `AppLayout` like the rest of the routes, so it gets the same TopNav + Sidebar + SiteSwitchBar chrome and shares the active theme.

Use it for: visual regression when editing a component, previewing a new theme, handing a component link to someone ("#data/DataTable").

## Global Command Palette
`src/components/layout/GlobalPalette.tsx` wraps the `CommandPalette` specimen and mounts it in `AppLayout`. Bound to ⌘K / Ctrl+K. Registers `Showcase` and `Design Specs` by default — extend the `items` array to add real routes/commands.

## Code Conventions
- Use `@/` path alias for all imports (maps to `src/`)
- Never hardcode colors — always use theme token classes (`text-t-bright`, `bg-t-surface`, etc.)
- Use `.t-card`, `.t-glow`, `.t-bg-pattern` CSS classes from the active theme
- `font-display` for headings, `font-primary` for body, `font-mono` for code/terminal

## Deployment
Static SPA. `bun run build` produces a portable `dist/`. Three first-party deploy targets are wired into the repo:

- **Docker (compose)** — `docker compose -f deploy/docker-compose.yml up --build`. Builds with the root `Dockerfile` (multi-stage Bun build → Caddy 2-alpine on `:8080`).
- **Proxmox LXC** — see `deploy/proxmox-lxc.md` for the Debian 12 LXC + Caddy + systemd recipe.
- **Fly.io** — see `deploy/fly.md`. `fly.toml.example` is the starter config; rename to `fly.toml`, set `app = "<your-app>"`, and `flyctl deploy`.

The `Caddyfile` is shared across all three targets — it serves the built `dist/` with SPA fallback + long-cache for hashed assets.

## Developer guides (MCP)
For project-agnostic conventions (validation, error handling, security, testing), consult the developer-guides MCP: `mcp__developer-guides__list_guides` / `…__search_developer_guides`. Don't restate the guide contents in this file.

## Customizing This Template

When using this template for a new project:
1. Update this file's title and description
2. Update `package.json` name
3. Update `index.html` `<title>`
4. Replace placeholder nav items in `TopNav.tsx` and `Sidebar.tsx` with real routes
5. Extend `GlobalPalette.tsx` `items` with those routes so ⌘K finds them
6. Replace `PlaceholderPage.tsx` with actual page components
7. Update `Footer.tsx` branding and links
8. To change theme: use the Theme dropdown in the top-right (persists via localStorage)
9. To add a new theme: see **Adding a New Theme** above
