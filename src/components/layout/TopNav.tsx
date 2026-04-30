import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import { BrandSwitcher } from '@/components/ui/BrandSwitcher'

interface NavSubItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href?: string
  children?: NavSubItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Top Nav 1',
    children: [
      { label: 'Sub Item 1.1', href: '/top/1-1' },
      { label: 'Sub Item 1.2', href: '/top/1-2' },
      { label: 'Sub Item 1.3', href: '/top/1-3' },
    ],
  },
  {
    label: 'Top Nav 2',
    children: [
      { label: 'Sub Item 2.1', href: '/top/2-1' },
      { label: 'Sub Item 2.2', href: '/top/2-2' },
    ],
  },
  { label: 'Top Nav 3', href: '/top/3' },
]

interface TopNavProps {
  onMenuToggle: () => void
  onPaletteOpen?: () => void
}

export function TopNav({ onMenuToggle, onPaletteOpen }: TopNavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      ref={navRef}
      className="h-12 bg-t-surface/80 backdrop-blur-sm border-b border-t-border
        flex items-center justify-between px-4 shrink-0 sticky top-0 z-50"
    >
      <div className="flex items-center gap-6">
        {/* Hamburger — toggles sidebar */}
        <button
          onClick={onMenuToggle}
          className="p-1.5 -ml-1 rounded text-t-muted hover:text-t-bright
            hover:bg-t-hover transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <Link to="/showcase" className="font-display text-t-bright text-lg tracking-wider">
          LOGO
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.children ? (
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.label ? null : item.label)
                  }
                  className={`px-3 py-1.5 rounded text-sm transition-colors
                    ${openDropdown === item.label
                      ? 'bg-t-accent/15 text-t-bright border border-t-border-active'
                      : 'text-t-text hover:text-t-bright hover:bg-t-hover border border-transparent'
                    }`}
                >
                  {item.label} <span className="text-xs ml-1">&#9662;</span>
                </button>
              ) : (
                <Link
                  to={item.href ?? '#'}
                  className="px-3 py-1.5 rounded text-sm text-t-text
                    hover:text-t-bright hover:bg-t-hover border border-transparent
                    transition-colors"
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown panel */}
              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 min-w-48 t-card p-2 z-50">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-3 py-2 rounded text-sm text-t-text
                        hover:text-t-bright hover:bg-t-hover transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right side — utility area */}
      <div className="flex items-center gap-3">
        <BrandSwitcher />
        {onPaletteOpen && (
          <button
            onClick={onPaletteOpen}
            className="hidden sm:flex items-center gap-2 px-2 py-1 rounded
              text-xs text-t-muted hover:text-t-bright hover:bg-t-hover
              border border-t-border transition-colors"
            title="Open command palette"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="font-mono text-[10px] tracking-wider">⌘K</kbd>
          </button>
        )}
        <span className="status-dot live" />
        <span className="text-xs text-t-muted">user@system</span>
      </div>
    </header>
  )
}
