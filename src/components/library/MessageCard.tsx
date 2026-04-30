import type { ReactNode } from 'react'
import { X } from 'lucide-react'

type MessageVariant = 'info' | 'success' | 'warning' | 'error' | 'purple'

interface MessageCardProps {
  title: string
  description?: ReactNode
  icon?: ReactNode
  variant?: MessageVariant
  timestamp?: string
  action?: { label: string; onClick: () => void }
  onDismiss?: () => void
  className?: string
}

const variantMap: Record<MessageVariant, { accent: string; border: string; tint: string; glow: string }> = {
  info:    { accent: 'text-t-info',    border: 'border-t-info/40',    tint: 'bg-t-info/5',     glow: '' },
  success: { accent: 'text-t-accent-alt',      border: 'border-t-accent-alt/40',      tint: 'bg-t-accent-alt/5',       glow: 'shadow-[0_0_20px_var(--color-t-accent-alt-glow)]' },
  warning: { accent: 'text-t-warning', border: 'border-t-warning/50', tint: 'bg-t-warning/5',  glow: '' },
  error:   { accent: 'text-t-error',   border: 'border-t-error/50',   tint: 'bg-t-error/5',    glow: 'shadow-[0_0_20px_rgba(227,26,26,0.18)]' },
  purple:  { accent: 'text-t-accent',     border: 'border-t-accent/50',     tint: 'bg-t-accent/5',      glow: 'shadow-[0_0_20px_var(--color-t-accent-glow)]' },
}

export function MessageCard({
  title,
  description,
  icon,
  variant = 'info',
  timestamp,
  action,
  onDismiss,
  className = '',
}: MessageCardProps) {
  const v = variantMap[variant]
  return (
    <div
      role="alert"
      className={`t-card p-4 border-l-2 ${v.border} ${v.tint} ${v.glow} ${className}`}
    >
      <div className="flex gap-3">
        {icon && (
          <div className={`shrink-0 mt-0.5 ${v.accent}`}>{icon}</div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="font-display text-sm uppercase tracking-wider text-t-bright truncate">
              {title}
            </div>
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                aria-label="Dismiss"
                className="p-0.5 rounded text-t-muted hover:text-t-bright hover:bg-t-hover transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {description && (
            <div className="text-xs text-t-text mt-1.5 leading-relaxed">{description}</div>
          )}
          {(timestamp || action) && (
            <div className="flex items-center justify-between mt-3">
              {timestamp && (
                <span className="text-[10px] text-t-muted font-terminal uppercase tracking-wider">
                  {timestamp}
                </span>
              )}
              {action && (
                <button
                  type="button"
                  onClick={action.onClick}
                  className={`text-[11px] font-display uppercase tracking-wider px-2 py-1 rounded
                    border border-current hover:bg-current/10 transition-colors ${v.accent}`}
                >
                  {action.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
