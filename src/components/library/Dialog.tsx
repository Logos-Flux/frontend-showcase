import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface DialogProps {
  open: boolean
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
  hideClose?: boolean
  className?: string
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEsc = true,
  hideClose = false,
  className = '',
}: DialogProps) {
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

  if (!open) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 't-dialog-title' : undefined}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-t-deep/80 backdrop-blur-sm"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden
      />
      <div
        className={`relative w-full ${sizeMap[size]} t-card
          shadow-[0_0_40px_var(--color-t-accent-glow)]
          border-t-accent/30 max-h-[90vh] flex flex-col ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || !hideClose) && (
          <div className="flex items-start justify-between gap-3 p-5 border-b border-t-border">
            <div className="min-w-0 flex-1">
              {title && (
                <div id="t-dialog-title" className="font-display text-sm uppercase tracking-wider text-t-bright">
                  {title}
                </div>
              )}
              {description && (
                <div className="text-xs text-t-muted mt-1">{description}</div>
              )}
            </div>
            {!hideClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-1 rounded text-t-muted hover:text-t-bright hover:bg-t-hover transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
        <div className="p-5 overflow-y-auto flex-1">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 p-4 border-t border-t-border bg-t-surface/40">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
