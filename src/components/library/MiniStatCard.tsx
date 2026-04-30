import type { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MiniStatCardProps {
  label: string
  value: string | number
  unit?: string
  delta?: number
  icon?: ReactNode
  accent?: 'purple' | 'green' | 'info' | 'warning' | 'error'
}

const accentMap = {
  purple: { text: 'text-t-accent', bg: 'bg-t-accent/15' },
  green: { text: 'text-t-accent-alt', bg: 'bg-t-accent-alt/15' },
  info: { text: 'text-t-info', bg: 'bg-t-info/15' },
  warning: { text: 'text-t-warning', bg: 'bg-t-warning/15' },
  error: { text: 'text-t-error', bg: 'bg-t-error/15' },
}

export function MiniStatCard({
  label,
  value,
  unit,
  delta,
  icon,
  accent = 'purple',
}: MiniStatCardProps) {
  const a = accentMap[accent]
  return (
    <div className="t-card px-4 py-3 flex items-center gap-3">
      {icon && (
        <div className={`p-2 rounded-md shrink-0 ${a.bg} ${a.text}`}>
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider text-t-muted truncate">
          {label}
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`font-display text-lg leading-none ${a.text}`}>
            {value}
          </span>
          {unit && <span className="text-xs text-t-muted">{unit}</span>}
        </div>
      </div>
      {delta !== undefined && (
        <div className={`flex items-center gap-0.5 text-xs shrink-0
          ${delta >= 0 ? 'text-t-success' : 'text-t-error'}`}>
          {delta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{delta > 0 ? '+' : ''}{delta}%</span>
        </div>
      )}
    </div>
  )
}
