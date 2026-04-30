import type { ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Sparkline } from './Sparkline'

type StatAccent = 'purple' | 'green' | 'info' | 'warning' | 'error'

interface ComplexStatisticsCardProps {
  title: string
  value: string | number
  unit?: string
  icon: ReactNode
  accent?: StatAccent
  delta?: { value: number; label?: string }
  secondary?: ReactNode
  trend?: number[]
  className?: string
}

const accentMap: Record<StatAccent, { text: string; bg: string; chart: string; border: string }> = {
  purple:  { text: 'text-t-accent',      bg: 'bg-t-accent/15',      chart: 'var(--color-t-accent)',    border: 'border-t-accent/30' },
  green:   { text: 'text-t-accent-alt',       bg: 'bg-t-accent-alt/15',       chart: 'var(--color-t-accent-alt)',     border: 'border-t-accent-alt/30' },
  info:    { text: 'text-t-info',     bg: 'bg-t-info/15',     chart: 'var(--color-t-info)',   border: 'border-t-info/30' },
  warning: { text: 'text-t-warning',  bg: 'bg-t-warning/15',  chart: 'var(--color-t-warning)',border: 'border-t-warning/30' },
  error:   { text: 'text-t-error',    bg: 'bg-t-error/15',    chart: 'var(--color-t-error)',  border: 'border-t-error/30' },
}

export function ComplexStatisticsCard({
  title,
  value,
  unit,
  icon,
  accent = 'purple',
  delta,
  secondary,
  trend,
  className = '',
}: ComplexStatisticsCardProps) {
  const a = accentMap[accent]
  const deltaIsZero = delta?.value === 0
  const DeltaIcon = !delta ? null : deltaIsZero ? Minus : delta.value > 0 ? TrendingUp : TrendingDown
  const deltaColor = !delta
    ? ''
    : deltaIsZero
      ? 'text-t-muted'
      : delta.value > 0
        ? 'text-t-success'
        : 'text-t-error'

  return (
    <div className={`t-card p-5 flex flex-col ${className}`}>
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-t-muted">{title}</p>
          <p className={`font-display text-2xl mt-1 leading-none ${a.text}`}>
            {value}
            {unit && <span className="text-sm text-t-muted ml-1">{unit}</span>}
          </p>
        </div>
        <div className={`p-2.5 rounded-lg shrink-0 ${a.bg} ${a.text}`}>{icon}</div>
      </div>

      {trend && trend.length > 1 && (
        <div className="mt-3 -mx-1">
          <Sparkline data={trend} color={a.chart} height={32} />
        </div>
      )}

      {(delta || secondary) && (
        <div className={`mt-3 pt-3 border-t ${a.border} flex items-center justify-between gap-2`}>
          {delta && DeltaIcon && (
            <div className={`flex items-center gap-1 text-xs ${deltaColor}`}>
              <DeltaIcon className="w-3 h-3" />
              <span className="font-display">
                {delta.value > 0 ? '+' : ''}
                {delta.value}%
              </span>
              {delta.label && <span className="text-t-muted ml-1">{delta.label}</span>}
            </div>
          )}
          {secondary && (
            <div className="text-[10px] text-t-muted font-terminal uppercase tracking-wider truncate">
              {secondary}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
