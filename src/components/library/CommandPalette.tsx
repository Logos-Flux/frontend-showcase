import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { Search, CornerDownLeft } from 'lucide-react'

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  shortcut?: string
  keywords?: string[]
  group?: string
  disabled?: boolean
  onSelect: () => void
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CommandItem[]
  placeholder?: string
  emptyMessage?: string
  hotkey?: string | null
  filter?: (item: CommandItem, query: string) => boolean
  className?: string
}

function defaultFilter(item: CommandItem, raw: string): boolean {
  const q = raw.trim().toLowerCase()
  if (!q) return true
  const hay = [item.label, item.description, item.group, ...(item.keywords ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return q.split(/\s+/).every((t) => hay.includes(t))
}

function parseHotkey(hotkey: string): (e: KeyboardEvent) => boolean {
  const parts = hotkey.toLowerCase().split('+').map((p) => p.trim())
  const key = parts[parts.length - 1]
  const needsMeta = parts.includes('cmd') || parts.includes('meta') || parts.includes('mod')
  const needsCtrl = parts.includes('ctrl') || parts.includes('mod')
  const needsShift = parts.includes('shift')
  const needsAlt = parts.includes('alt') || parts.includes('option')
  return (e) => {
    if (e.key.toLowerCase() !== key) return false
    if (parts.includes('mod')) {
      if (!(e.metaKey || e.ctrlKey)) return false
    } else {
      if (needsMeta && !e.metaKey) return false
      if (needsCtrl && !e.ctrlKey) return false
    }
    if (needsShift !== e.shiftKey) return false
    if (needsAlt !== e.altKey) return false
    return true
  }
}

export function CommandPalette({
  open,
  onOpenChange,
  items,
  placeholder = 'Search commands, tasks, panels…',
  emptyMessage = 'No matches',
  hotkey = 'mod+k',
  filter = defaultFilter,
  className = '',
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const visible = useMemo(
    () => items.filter((it) => filter(it, query)),
    [items, query, filter],
  )

  const groups = useMemo(() => {
    const m = new Map<string, CommandItem[]>()
    for (const it of visible) {
      const g = it.group ?? ''
      if (!m.has(g)) m.set(g, [])
      m.get(g)!.push(it)
    }
    return Array.from(m.entries())
  }, [visible])

  const selectIndex = useCallback(
    (i: number) => {
      if (visible.length === 0) return
      const next = ((i % visible.length) + visible.length) % visible.length
      setActive(next)
    },
    [visible.length],
  )

  useEffect(() => {
    if (!hotkey) return
    const matches = parseHotkey(hotkey)
    const onKey = (e: KeyboardEvent) => {
      if (matches(e)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hotkey, open, onOpenChange])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  useLayoutEffect(() => {
    const el = itemRefs.current[active]
    if (!el) return
    el.scrollIntoView({ block: 'nearest' })
  }, [active])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      selectIndex(active + 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      selectIndex(active - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const it = visible[active]
      if (it && !it.disabled) {
        it.onSelect()
        onOpenChange(false)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onOpenChange(false)
    } else if (e.key === 'Home') {
      e.preventDefault()
      selectIndex(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      selectIndex(visible.length - 1)
    }
  }

  if (!open) return null

  let flatIdx = -1

  return createPortal(
    <div
      className="fixed inset-0 z-[1100] flex items-start justify-center pt-[12vh] px-4"
      onKeyDown={onKeyDown}
    >
      <div
        className="absolute inset-0 bg-t-deep/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className={`relative w-full max-w-xl t-card flex flex-col overflow-hidden
          border-t-accent/40 shadow-[0_0_40px_var(--color-t-accent-glow)] ${className}`}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-t-border">
          <Search className="w-4 h-4 text-t-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-sm text-t-bright placeholder:text-t-muted"
            aria-label={placeholder}
            aria-controls="command-palette-list"
            aria-activedescendant={visible[active]?.id}
          />
          <kbd className="font-terminal text-[10px] uppercase tracking-wider text-t-muted px-1.5 py-0.5 rounded border border-t-border">
            ESC
          </kbd>
        </div>

        <div
          ref={listRef}
          id="command-palette-list"
          role="listbox"
          className="flex-1 max-h-[50vh] overflow-y-auto py-1"
        >
          {visible.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-t-muted">{emptyMessage}</div>
          ) : (
            groups.map(([group, groupItems]) => (
              <div key={group || '_'}>
                {group && (
                  <div className="px-4 pt-3 pb-1 font-display text-[10px] uppercase tracking-wider text-t-muted">
                    {group}
                  </div>
                )}
                {groupItems.map((it) => {
                  flatIdx += 1
                  const idx = flatIdx
                  const isActive = idx === active
                  return (
                    <button
                      key={it.id}
                      id={it.id}
                      ref={(el) => {
                        itemRefs.current[idx] = el
                      }}
                      role="option"
                      aria-selected={isActive}
                      disabled={it.disabled}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => {
                        if (it.disabled) return
                        it.onSelect()
                        onOpenChange(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors
                        ${isActive ? 'bg-t-accent/15 text-t-bright' : 'text-t-text'}
                        ${it.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {it.icon && (
                        <span
                          className={`w-4 h-4 shrink-0 ${isActive ? 'text-t-accent' : 'text-t-muted'}`}
                        >
                          {it.icon}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{it.label}</div>
                        {it.description && (
                          <div className="text-[11px] text-t-muted truncate">{it.description}</div>
                        )}
                      </div>
                      {it.shortcut && (
                        <kbd className="font-terminal text-[10px] uppercase tracking-wider text-t-muted px-1.5 py-0.5 rounded border border-t-border shrink-0">
                          {it.shortcut}
                        </kbd>
                      )}
                      {isActive && !it.shortcut && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-t-accent shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-t-border bg-t-surface/40 text-[10px] text-t-muted font-terminal uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span>↑↓ NAVIGATE</span>
            <span>↵ SELECT</span>
            <span>ESC CLOSE</span>
          </div>
          <span>
            {visible.length} / {items.length}
          </span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
