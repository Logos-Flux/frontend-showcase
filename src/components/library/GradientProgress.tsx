type ProgressAccent = 'purple' | 'green' | 'info' | 'warning' | 'error' | 'auto'

interface GradientProgressProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  unit?: string
  accent?: ProgressAccent
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const gradients: Record<Exclude<ProgressAccent, 'auto'>, string> = {
  purple: 'linear-gradient(90deg, #4318ff 0%, #7B2FBE 60%, #9f7aea 100%)',
  green: 'linear-gradient(90deg, #01b574 0%, #01FF70 100%)',
  info: 'linear-gradient(90deg, #0075ff 0%, #4299e1 100%)',
  warning: 'linear-gradient(90deg, #ffb547 0%, #f6ad55 100%)',
  error: 'linear-gradient(90deg, #E31A1A 0%, #ff6b6b 100%)',
}

const heightMap = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' }

function autoAccent(pct: number): Exclude<ProgressAccent, 'auto'> {
  if (pct >= 90) return 'error'
  if (pct >= 75) return 'warning'
  if (pct >= 50) return 'info'
  return 'green'
}

export function GradientProgress({
  value,
  max = 100,
  label,
  showValue = true,
  unit = '%',
  accent = 'purple',
  size = 'md',
  className = '',
}: GradientProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const resolvedAccent = accent === 'auto' ? autoAccent(pct) : accent

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex items-baseline justify-between mb-1">
          {label && (
            <span className="text-[11px] uppercase tracking-wider text-t-muted">
              {label}
            </span>
          )}
          {showValue && (
            <span className="font-display text-xs text-t-bright">
              {typeof value === 'number' ? value.toFixed(value % 1 ? 1 : 0) : value}
              {unit}
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full rounded-full bg-t-hover overflow-hidden ${heightMap[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{
            width: `${pct}%`,
            backgroundImage: gradients[resolvedAccent],
            boxShadow: `0 0 10px ${resolvedAccent === 'purple' ? 'var(--color-t-accent-glow)' : 'transparent'}`,
          }}
        />
      </div>
    </div>
  )
}
