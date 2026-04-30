type StatusPillVariant = 'live' | 'idle' | 'error' | 'offline' | 'active' | 'warning' | 'info'

interface StatusPillProps {
  variant: StatusPillVariant
  label?: string
  pulse?: boolean
  size?: 'sm' | 'md'
  className?: string
}

const variantMap: Record<StatusPillVariant, { dot: string; text: string; bg: string; glow: string }> = {
  live:    { dot: 'bg-t-accent-alt',       text: 'text-t-accent-alt',       bg: 'bg-t-accent-alt/10',       glow: 'shadow-[0_0_6px_var(--color-t-accent-alt)]' },
  active:  { dot: 'bg-t-accent',      text: 'text-t-accent',      bg: 'bg-t-accent/10',      glow: 'shadow-[0_0_6px_var(--color-t-accent)]' },
  idle:    { dot: 'bg-t-warning',  text: 'text-t-warning',  bg: 'bg-t-warning/10',  glow: '' },
  warning: { dot: 'bg-t-warning',  text: 'text-t-warning',  bg: 'bg-t-warning/10',  glow: '' },
  error:   { dot: 'bg-t-error',    text: 'text-t-error',    bg: 'bg-t-error/10',    glow: 'shadow-[0_0_6px_var(--color-t-error)]' },
  info:    { dot: 'bg-t-info',     text: 'text-t-info',     bg: 'bg-t-info/10',     glow: '' },
  offline: { dot: 'bg-t-muted',    text: 'text-t-muted',    bg: 'bg-t-hover',       glow: '' },
}

const defaultLabels: Record<StatusPillVariant, string> = {
  live: 'LIVE',
  active: 'ACTIVE',
  idle: 'IDLE',
  warning: 'WARN',
  error: 'ERROR',
  info: 'INFO',
  offline: 'OFFLINE',
}

export function StatusPill({
  variant,
  label,
  pulse = variant === 'live' || variant === 'active',
  size = 'sm',
  className = '',
}: StatusPillProps) {
  const v = variantMap[variant]
  const text = label ?? defaultLabels[variant]
  const pad = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-display uppercase tracking-wider
        ${v.bg} ${v.text} ${pad} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${v.dot} ${v.glow} ${pulse ? 'animate-pulse' : ''}`}
      />
      {text}
    </span>
  )
}
