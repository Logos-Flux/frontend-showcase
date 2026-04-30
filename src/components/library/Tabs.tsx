import { createContext, useContext, useState, type ReactNode } from 'react'

interface TabsContextValue {
  value: string
  setValue: (v: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs subcomponents must be used inside <Tabs>')
  return ctx
}

interface TabsProps {
  value?: string
  defaultValue?: string
  onValueChange?: (v: string) => void
  children: ReactNode
  className?: string
}

export function Tabs({ value, defaultValue, onValueChange, children, className = '' }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? '')
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  const setValue = (v: string) => {
    if (!isControlled) setInternal(v)
    onValueChange?.(v)
  }

  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

interface TabListProps {
  children: ReactNode
  variant?: 'underline' | 'pill'
  className?: string
}

export function TabList({ children, variant = 'underline', className = '' }: TabListProps) {
  const variantClass =
    variant === 'underline'
      ? 'border-b border-t-border gap-4'
      : 'bg-t-surface/60 rounded-lg p-1 gap-1 border border-t-border'
  return (
    <div role="tablist" data-variant={variant} className={`flex items-center ${variantClass} ${className}`}>
      {children}
    </div>
  )
}

interface TabProps {
  value: string
  children: ReactNode
  disabled?: boolean
  icon?: ReactNode
}

export function Tab({ value, children, disabled, icon }: TabProps) {
  const { value: current, setValue } = useTabs()
  const active = current === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      onClick={() => setValue(value)}
      className={`group relative inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider transition-colors
        data-[variant=underline]:px-1 data-[variant=underline]:pb-2 data-[variant=underline]:pt-1
        data-[variant=pill]:px-3 data-[variant=pill]:py-1.5 data-[variant=pill]:rounded-md
        ${active ? 'text-t-bright' : 'text-t-muted hover:text-t-text'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {icon && <span className="w-3.5 h-3.5 shrink-0">{icon}</span>}
      {children}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 right-0 -bottom-px h-0.5 rounded-full transition-opacity
          bg-t-accent shadow-[0_0_8px_var(--color-t-accent)]
          ${active ? 'opacity-100' : 'opacity-0'}`}
      />
    </button>
  )
}

interface TabPanelProps {
  value: string
  children: ReactNode
  className?: string
  keepMounted?: boolean
}

export function TabPanel({ value, children, className = '', keepMounted = false }: TabPanelProps) {
  const { value: current } = useTabs()
  const active = current === value
  if (!active && !keepMounted) return null
  return (
    <div role="tabpanel" hidden={!active} className={className}>
      {children}
    </div>
  )
}
