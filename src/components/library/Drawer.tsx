import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

interface DrawerProps {
  open: boolean
  onClose: () => void
  side?: DrawerSide
  size?: number | string
  title?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
  hideClose?: boolean
  className?: string
}

function panelPositionClass(side: DrawerSide, open: boolean): string {
  const base = 'fixed t-card transition-transform duration-300 ease-out flex flex-col'
  const hidden = {
    left: 'translate-x-[-105%]',
    right: 'translate-x-[105%]',
    top: 'translate-y-[-105%]',
    bottom: 'translate-y-[105%]',
  }[side]
  const docked = {
    left: 'top-0 bottom-0 left-0 border-l-0',
    right: 'top-0 bottom-0 right-0 border-r-0',
    top: 'top-0 left-0 right-0 border-t-0',
    bottom: 'bottom-0 left-0 right-0 border-b-0',
  }[side]
  return `${base} ${docked} ${open ? '' : hidden}`
}

function panelSizeStyle(side: DrawerSide, size: number | string): React.CSSProperties {
  if (side === 'left' || side === 'right') return { width: size }
  return { height: size }
}

export function Drawer({
  open,
  onClose,
  side = 'right',
  size = 380,
  title,
  children,
  footer,
  closeOnBackdrop = true,
  closeOnEsc = true,
  hideClose = false,
  className = '',
}: DrawerProps) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open || !closeOnEsc) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, closeOnEsc, onClose])

  return createPortal(
    <div
      className={`fixed inset-0 z-[1000] ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-t-deep/70 backdrop-blur-sm transition-opacity duration-300
          ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`${panelPositionClass(side, open)} ${className}
          shadow-[0_0_40px_var(--color-t-accent-glow)] border-t-accent/30 max-w-full max-h-full`}
        style={panelSizeStyle(side, size)}
      >
        {(title || !hideClose) && (
          <div className="flex items-center justify-between gap-3 p-4 border-b border-t-border shrink-0">
            {title && (
              <div className="font-display text-sm uppercase tracking-wider text-t-bright truncate">
                {title}
              </div>
            )}
            {!hideClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-1 rounded text-t-muted hover:text-t-bright hover:bg-t-hover transition-colors shrink-0 ml-auto"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 p-3 border-t border-t-border bg-t-surface/40 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
