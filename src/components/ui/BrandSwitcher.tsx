import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Palette, Check, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/library/DropdownMenu'
import { THEME_SPECS, BRAND_SPECS, type DesignSpec } from '@/lib/designSpecs'
import { getActiveTheme, setActiveTheme } from '@/lib/themes'

const ALL_SPECS = [...THEME_SPECS, ...BRAND_SPECS]

/**
 * Unified theme + brand picker. The DesignSpec slugs are 1:1 with theme ids,
 * so picking any entry both swaps the active theme and (if the user is on
 * /design-specs) navigates the viewer to the matching spec page.
 */
export function BrandSwitcher() {
  const navigate = useNavigate()
  const location = useLocation()
  const [active, setActive] = useState<string>(() => getActiveTheme())
  const [query, setQuery] = useState('')

  useEffect(() => {
    setActive(getActiveTheme())
  }, [])

  const handleSelect = (spec: DesignSpec) => {
    setActiveTheme(spec.slug)
    setActive(spec.slug)
    if (location.pathname.startsWith('/design-specs')) {
      navigate(`/design-specs/${spec.slug}`)
    }
  }

  const activeSpec = ALL_SPECS.find((s) => s.slug === active)
  const activeLabel = activeSpec?.label ?? 'Theme'

  const q = query.trim().toLowerCase()
  const filteredThemes = useMemo(
    () => (q ? THEME_SPECS.filter((s) => s.label.toLowerCase().includes(q)) : THEME_SPECS),
    [q],
  )
  const filteredBrands = useMemo(
    () => (q ? BRAND_SPECS.filter((s) => s.label.toLowerCase().includes(q)) : BRAND_SPECS),
    [q],
  )

  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger>
        <button
          className="flex items-center gap-2 px-2 py-1 rounded text-xs
            text-t-muted hover:text-t-bright hover:bg-t-hover
            border border-t-border transition-colors max-w-[160px]"
          title="Switch theme / brand"
        >
          <Palette className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline truncate">{activeLabel}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        minWidth={240}
        className="max-h-[70vh] overflow-y-auto"
      >
        <div className="px-2 pt-1 pb-2 sticky top-0 bg-t-card z-10">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded
            bg-t-deep border border-t-border focus-within:border-t-border-active">
            <Search className="w-3.5 h-3.5 text-t-muted shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search themes, brands…"
              className="bg-transparent text-xs text-t-bright
                outline-none placeholder:text-t-muted w-full"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
          </div>
        </div>

        {filteredThemes.length > 0 && (
          <>
            <DropdownMenuLabel>Themes</DropdownMenuLabel>
            {filteredThemes.map((s) => (
              <DropdownMenuItem
                key={s.slug}
                onSelect={() => handleSelect(s)}
                icon={s.slug === active ? <Check className="w-3.5 h-3.5" /> : null}
              >
                {s.label}
              </DropdownMenuItem>
            ))}
          </>
        )}

        {filteredBrands.length > 0 && (
          <>
            {filteredThemes.length > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel>Brands</DropdownMenuLabel>
            {filteredBrands.map((s) => (
              <DropdownMenuItem
                key={s.slug}
                onSelect={() => handleSelect(s)}
                icon={s.slug === active ? <Check className="w-3.5 h-3.5" /> : null}
              >
                {s.label}
              </DropdownMenuItem>
            ))}
          </>
        )}

        {filteredThemes.length === 0 && filteredBrands.length === 0 && (
          <div className="px-3 py-3 text-xs text-t-muted">No matches.</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
