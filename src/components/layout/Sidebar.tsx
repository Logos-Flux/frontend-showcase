import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'

interface SidebarSubItem {
  label: string
  href: string
}

interface SidebarSection {
  label: string
  children: SidebarSubItem[]
}

const sections: SidebarSection[] = [
  {
    label: 'Side Nav 1',
    children: [
      { label: 'Sub Item 1.1', href: '/side/1-1' },
      { label: 'Sub Item 1.2', href: '/side/1-2' },
      { label: 'Sub Item 1.3', href: '/side/1-3' },
    ],
  },
  {
    label: 'Side Nav 2',
    children: [
      { label: 'Sub Item 2.1', href: '/side/2-1' },
      { label: 'Sub Item 2.2', href: '/side/2-2' },
    ],
  },
  {
    label: 'Side Nav 3',
    children: [
      { label: 'Sub Item 3.1', href: '/side/3-1' },
      { label: 'Sub Item 3.2', href: '/side/3-2' },
    ],
  },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set(sections.map((s) => s.label))
  )

  // Auto-close on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      onClose()
    }
  }, [location.pathname, onClose])

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Mobile close button */}
      <div className="flex items-center justify-end p-2 md:hidden">
        <button
          onClick={onClose}
          className="p-1.5 rounded text-t-muted hover:text-t-bright
            hover:bg-t-hover transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 py-4 px-3 space-y-4 overflow-y-auto">
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.label)
          return (
            <div key={section.label}>
              <button
                onClick={() => toggleSection(section.label)}
                className="flex items-center justify-between w-full px-2 mb-1"
              >
                <span className="text-[10px] uppercase tracking-[1.5px] text-t-muted font-semibold">
                  {section.label}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-t-muted transition-transform duration-200
                    ${isExpanded ? '' : '-rotate-90'}`}
                />
              </button>
              {isExpanded && (
                <div className="space-y-0.5">
                  {section.children.map((item, idx) => {
                    const isActive = location.pathname === item.href
                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        className={`block px-3 py-1.5 rounded text-sm transition-colors
                          ${isActive
                            ? 'bg-t-accent/15 text-t-accent border-l-2 border-t-accent'
                            : 'text-t-muted hover:text-t-text hover:bg-t-hover border-l-2 border-transparent'
                          }
                          ${idx === 0 && !isActive ? 'text-t-text' : ''}`}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex h-dvh bg-t-surface border-r border-t-border
          flex-col transition-all duration-300 ease-in-out overflow-hidden
          ${open ? 'w-56' : 'w-0 border-r-0'}`}
      >
        {open && sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <aside
            className="relative w-64 h-dvh bg-t-surface border-r border-t-border
              flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
