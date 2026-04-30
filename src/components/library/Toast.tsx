import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastOptions {
  id?: string
  title: string
  description?: ReactNode
  variant?: ToastVariant
  duration?: number
  action?: { label: string; onClick: () => void }
}

interface ToastRecord extends Required<Pick<ToastOptions, 'id' | 'title' | 'variant' | 'duration'>> {
  description?: ReactNode
  action?: ToastOptions['action']
}

interface ToastContextValue {
  push: (t: ToastOptions) => string
  dismiss: (id: string) => void
  clear: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const variantMap: Record<ToastVariant, { accent: string; border: string; icon: ReactNode }> = {
  info: {
    accent: 'text-t-info',
    border: 'border-t-info/40',
    icon: <Info className="w-4 h-4" />,
  },
  success: {
    accent: 'text-t-accent-alt',
    border: 'border-t-accent-alt/40',
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  warning: {
    accent: 'text-t-warning',
    border: 'border-t-warning/50',
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  error: {
    accent: 'text-t-error',
    border: 'border-t-error/50',
    icon: <AlertCircle className="w-4 h-4" />,
  },
}

function randomId(): string {
  return `t-${Math.random().toString(36).slice(2, 10)}`
}

interface ToastProviderProps {
  children: ReactNode
  placement?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
  max?: number
}

export function ToastProvider({ children, placement = 'bottom-right', max = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
  const paused = useRef<Set<string>>(new Set())

  const dismiss = useCallback((id: string) => {
    const t = timers.current.get(id)
    if (t) clearTimeout(t)
    timers.current.delete(id)
    paused.current.delete(id)
    setToasts((prev) => prev.filter((x) => x.id !== id))
  }, [])

  const schedule = useCallback(
    (id: string, duration: number) => {
      if (duration === Infinity) return
      const t = setTimeout(() => dismiss(id), duration)
      timers.current.set(id, t)
    },
    [dismiss],
  )

  const push = useCallback(
    (t: ToastOptions) => {
      const rec: ToastRecord = {
        id: t.id ?? randomId(),
        title: t.title,
        description: t.description,
        variant: t.variant ?? 'info',
        duration: t.duration ?? 4500,
        action: t.action,
      }
      setToasts((prev) => {
        const merged = [...prev.filter((x) => x.id !== rec.id), rec]
        return merged.slice(-max)
      })
      schedule(rec.id, rec.duration)
      return rec.id
    },
    [max, schedule],
  )

  const clear = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t))
    timers.current.clear()
    paused.current.clear()
    setToasts([])
  }, [])

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t))
    }
  }, [])

  const placementClass = {
    'top-right': 'top-4 right-4 items-end',
    'top-left': 'top-4 left-4 items-start',
    'bottom-right': 'bottom-4 right-4 items-end',
    'bottom-left': 'bottom-4 left-4 items-start',
  }[placement]

  return (
    <ToastContext.Provider value={{ push, dismiss, clear }}>
      {children}
      {createPortal(
        <div
          aria-live="polite"
          aria-atomic="false"
          className={`pointer-events-none fixed z-[1100] flex flex-col gap-2 ${placementClass}`}
        >
          {toasts.map((t) => {
            const v = variantMap[t.variant]
            return (
              <div
                key={t.id}
                role="status"
                className={`pointer-events-auto t-card w-[min(380px,90vw)] p-3 pl-3.5 border-l-2 ${v.border}`}
                onMouseEnter={() => {
                  const timer = timers.current.get(t.id)
                  if (timer) {
                    clearTimeout(timer)
                    paused.current.add(t.id)
                  }
                }}
                onMouseLeave={() => {
                  if (paused.current.has(t.id)) {
                    paused.current.delete(t.id)
                    schedule(t.id, t.duration)
                  }
                }}
              >
                <div className="flex gap-2">
                  <div className={`shrink-0 mt-0.5 ${v.accent}`}>{v.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-display text-xs uppercase tracking-wider text-t-bright">
                        {t.title}
                      </div>
                      <button
                        type="button"
                        onClick={() => dismiss(t.id)}
                        aria-label="Dismiss"
                        className="p-0.5 rounded text-t-muted hover:text-t-bright hover:bg-t-hover transition-colors shrink-0"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    {t.description && (
                      <div className="text-xs text-t-text mt-1 leading-relaxed">
                        {t.description}
                      </div>
                    )}
                    {t.action && (
                      <button
                        type="button"
                        onClick={() => {
                          t.action!.onClick()
                          dismiss(t.id)
                        }}
                        className={`mt-2 text-[11px] font-display uppercase tracking-wider px-2 py-0.5 rounded
                          border border-current hover:bg-current/10 transition-colors ${v.accent}`}
                      >
                        {t.action.label}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
