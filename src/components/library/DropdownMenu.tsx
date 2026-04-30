import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

interface DropdownMenuContextValue {
  open: boolean
  setOpen: (v: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null)

function useDropdownMenu() {
  const ctx = useContext(DropdownMenuContext)
  if (!ctx) throw new Error('DropdownMenu subcomponents must be used inside <DropdownMenu>')
  return ctx
}

interface DropdownMenuProps {
  children: ReactNode
  placement?: DropdownMenuContextValue['placement']
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenu({
  children,
  placement = 'bottom-end',
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}: DropdownMenuProps) {
  const [internal, setInternal] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internal
  const triggerRef = useRef<HTMLElement | null>(null)

  const setOpen = (v: boolean) => {
    if (!isControlled) setInternal(v)
    onOpenChange?.(v)
  }

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef, placement }}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

interface DropdownMenuTriggerProps {
  children: ReactElement<{ ref?: React.Ref<HTMLElement>; onClick?: (e: React.MouseEvent) => void }>
}

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  const { open, setOpen, triggerRef } = useDropdownMenu()
  if (!isValidElement(children)) return null

  return cloneElement(children, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node
    },
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e)
      setOpen(!open)
    },
  })
}

interface DropdownMenuContentProps {
  children: ReactNode
  offset?: number
  className?: string
  minWidth?: number
}

export function DropdownMenuContent({
  children,
  offset = 6,
  className = '',
  minWidth = 180,
}: DropdownMenuContentProps) {
  const { open, setOpen, triggerRef, placement } = useDropdownMenu()
  const contentRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  useLayoutEffect(() => {
    if (!open) return
    const trigger = triggerRef.current
    const content = contentRef.current
    if (!trigger || !content) return

    const t = trigger.getBoundingClientRect()
    const c = content.getBoundingClientRect()
    let top = 0
    let left = 0
    if (placement.startsWith('bottom')) top = t.bottom + offset
    else top = t.top - c.height - offset
    if (placement.endsWith('start')) left = t.left
    else left = t.right - c.width

    const maxLeft = window.innerWidth - c.width - 8
    const maxTop = window.innerHeight - c.height - 8
    left = Math.min(Math.max(8, left), maxLeft)
    top = Math.min(Math.max(8, top), maxTop)
    setPos({ top, left })
  }, [open, placement, offset, triggerRef])

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (contentRef.current?.contains(target)) return
      if (triggerRef.current?.contains(target)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, setOpen, triggerRef])

  if (!open) return null

  return createPortal(
    <div
      ref={contentRef}
      role="menu"
      className={`fixed z-[1050] t-card py-1 shadow-[0_8px_30px_rgba(0,0,0,0.6)]
        border-t-accent/25 ${className}`}
      style={{
        top: pos?.top ?? -9999,
        left: pos?.left ?? -9999,
        minWidth,
        opacity: pos ? 1 : 0,
      }}
    >
      {children}
    </div>,
    document.body,
  )
}

interface DropdownMenuItemProps {
  children: ReactNode
  onSelect?: () => void
  icon?: ReactNode
  shortcut?: string
  variant?: 'default' | 'danger'
  disabled?: boolean
}

export function DropdownMenuItem({
  children,
  onSelect,
  icon,
  shortcut,
  variant = 'default',
  disabled = false,
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenu()
  const color = variant === 'danger' ? 'text-t-error' : 'text-t-text'
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={() => {
        if (disabled) return
        onSelect?.()
        setOpen(false)
      }}
      className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left
        hover:bg-t-hover hover:text-t-bright transition-colors
        ${color} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {icon && <span className="w-3.5 h-3.5 shrink-0">{icon}</span>}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && (
        <span className="font-terminal text-[10px] text-t-muted uppercase tracking-wider">
          {shortcut}
        </span>
      )}
    </button>
  )
}

export function DropdownMenuSeparator() {
  return <div role="separator" className="my-1 border-t border-t-border" />
}

export function DropdownMenuLabel({ children }: { children: ReactNode }) {
  return (
    <div className="px-3 py-1 font-display text-[10px] uppercase tracking-wider text-t-muted">
      {children}
    </div>
  )
}
