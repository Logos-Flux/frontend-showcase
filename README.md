    ██╗      ██████╗  ██████╗  ██████╗ ███████╗
    ██║     ██╔═══██╗██╔════╝ ██╔═══██╗██╔════╝
    ██║     ██║   ██║██║  ███╗██║   ██║███████╗
    ██║     ██║   ██║██║   ██║██║   ██║╚════██║
    ███████╗╚██████╔╝╚██████╔╝╚██████╔╝███████║
    ╚══════╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝

            ███████╗██╗     ██╗   ██╗██╗  ██╗
            ██╔════╝██║     ██║   ██║╚██╗██╔╝
            █████╗  ██║     ██║   ██║ ╚███╔╝ 
            ██╔══╝  ██║     ██║   ██║ ██╔██╗ 
            ██║     ███████╗╚██████╔╝██╔╝ ██╗
            ╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝

# frontend-showcase

A React + Tailwind 4 frontend template with a runtime-swappable theme system,
**67 brand-derived design systems**, a **28-component library catalog**, and
a brand `DESIGN.md` viewer.

Built as a starting point for new SPAs that want strong design foundations
out of the box: the components are theme-agnostic (driven by `--color-t-*`
CSS vars), themes are runtime-loaded (no rebuild), and the showcase route
documents every component live with its import path.

## Quick start

```bash
bun install
bun run dev          # http://localhost:5174
bun run build        # production build → dist/
bun run preview      # preview the build
```

Bun is the package manager and runtime — no `npm install` needed.

## What's in here

```
src/
├── components/library/    # 28 reusable, theme-agnostic UI components
├── components/layout/     # AppLayout, TopNav, Sidebar, Footer, GlobalPalette
├── components/ui/         # ThemeCard, BrandSwitcher
├── lib/themes.ts          # theme registry — getActiveTheme/setActiveTheme
├── lib/designSpecs.ts     # brand DESIGN.md routing
├── pages/                 # DesignSpecs viewer, PlaceholderPage
├── showcase/              # /showcase route — live component catalog
└── styles/                # Tailwind base + @theme token registration

public/
├── themes/                # 67 runtime-loaded theme CSS files
├── design-md/             # markdown for the brand DESIGN.md viewer
└── fonts/                 # locally bundled woff2s
```

## Routes

- `/` → redirects to `/showcase`
- `/showcase` — component catalog
- `/design-specs` and `/design-specs/:slug` — brand DESIGN.md viewer

## Themes

Themes are CSS files under `public/themes/<id>.css`, each redefining the
shared `--color-t-*` and `--font-*` tokens on `:root`. The active theme is
loaded via `<link id="theme-css">` in `index.html` and swapped at runtime
by updating its `href`. Persistence via `localStorage`.

To add a new theme see [CLAUDE.md → Adding a New Theme](./CLAUDE.md#adding-a-new-theme).

## Deployment

Three first-party deploy targets are wired in:

| Target | How |
|---|---|
| **Docker** | `docker compose -f deploy/docker-compose.yml up --build` — builds with the root `Dockerfile` and serves on `:8080` |
| **Proxmox LXC** | See [`deploy/proxmox-lxc.md`](./deploy/proxmox-lxc.md) — Debian 12 LXC + Caddy + systemd |
| **Fly.io** | See [`deploy/fly.md`](./deploy/fly.md) — `cp fly.toml.example fly.toml` then `flyctl deploy` |

The static `dist/` build is portable — it works on Cloudflare Pages,
Netlify, Vercel, S3, or any static host without changes.

## Architecture details

See [`CLAUDE.md`](./CLAUDE.md) for the full architecture walkthrough:
theme system, design tokens, component library, global command palette,
and code conventions.

## License

[MIT](./LICENSE) — Logos Flux 2026.
