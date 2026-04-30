import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: ReactNode
  action?: { label: string; onClick: () => void; variant?: 'primary' | 'secondary' }
  secondaryAction?: { label: string; onClick: () => void }
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { wrap: 'py-8', icon: 'w-10 h-10', title: 'text-sm', gap: 'gap-2' },
  md: { wrap: 'py-12', icon: 'w-14 h-14', title: 'text-base', gap: 'gap-3' },
  lg: { wrap: 'py-20', icon: 'w-20 h-20', title: 'text-lg', gap: 'gap-4' },
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = 'md',
  className = '',
}: EmptyStateProps) {
  const s = sizeMap[size]
  return (
    <div
      className={`t-card flex flex-col items-center justify-center text-center px-6 ${s.wrap} ${s.gap} ${className}`}
    >
      {icon && (
        <div
          className={`${s.icon} flex items-center justify-center rounded-full bg-t-accent/10 text-t-accent border border-t-accent/30`}
        >
          {icon}
        </div>
      )}
      <div className="max-w-md">
        <div className={`font-display uppercase tracking-wider text-t-bright ${s.title}`}>
          {title}
        </div>
        {description && (
          <div className="text-xs text-t-muted mt-2 leading-relaxed">{description}</div>
        )}
      </div>
      {(action || secondaryAction) && (
        <div className="flex items-center gap-2 mt-2">
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={`text-xs font-display uppercase tracking-wider px-3 py-1.5 rounded transition-colors
                ${action.variant === 'secondary'
                  ? 'border border-t-border text-t-text hover:bg-t-hover hover:text-t-bright'
                  : 'bg-t-accent/20 border border-t-accent/50 text-t-bright hover:bg-t-accent/30 shadow-[0_0_10px_var(--color-t-accent-glow)]'}`}
            >
              {action.label}
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="text-xs font-display uppercase tracking-wider px-3 py-1.5 rounded
                text-t-muted hover:text-t-bright transition-colors"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
