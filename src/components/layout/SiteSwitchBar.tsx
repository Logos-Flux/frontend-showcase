import { Link, useLocation } from 'react-router-dom'

const links = [
  { href: '/showcase', label: 'Showcase', match: (p: string) => p === '/' || p.startsWith('/showcase') },
  { href: '/design-specs', label: 'Designs', match: (p: string) => p.startsWith('/design-specs') },
]

export function SiteSwitchBar() {
  const { pathname } = useLocation()

  return (
    <div
      className="h-7 bg-t-deep border-b border-t-border flex items-center px-4 shrink-0
        text-[11px] uppercase tracking-[0.18em] font-mono"
    >
      <nav className="flex items-center gap-1">
        {links.map((l) => {
          const active = l.match(pathname)
          return (
            <Link
              key={l.href}
              to={l.href}
              className={`px-2 py-0.5 rounded transition-colors ${
                active
                  ? 'text-t-bright bg-t-accent/15 border border-t-border-active'
                  : 'text-t-muted hover:text-t-bright hover:bg-t-hover border border-transparent'
              }`}
            >
              {l.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
