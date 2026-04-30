import type { ReactNode } from 'react'

type TimelineColor = 'purple' | 'green' | 'info' | 'success' | 'warning' | 'error' | 'muted'

interface TimelineProps {
  title?: string
  children: ReactNode
  className?: string
}

interface TimelineItemProps {
  icon?: ReactNode
  color?: TimelineColor
  title: string
  dateTime?: string
  description?: string
  badges?: string[]
  lastItem?: boolean
}

const colorMap: Record<TimelineColor, { text: string; bg: string; ring: string }> = {
  purple: { text: 'text-t-accent', bg: 'bg-t-accent/20', ring: 'ring-t-accent' },
  green: { text: 'text-t-accent-alt', bg: 'bg-t-accent-alt/20', ring: 'ring-t-accent-alt' },
  info: { text: 'text-t-info', bg: 'bg-t-info/20', ring: 'ring-t-info' },
  success: { text: 'text-t-success', bg: 'bg-t-success/20', ring: 'ring-t-success' },
  warning: { text: 'text-t-warning', bg: 'bg-t-warning/20', ring: 'ring-t-warning' },
  error: { text: 'text-t-error', bg: 'bg-t-error/20', ring: 'ring-t-error' },
  muted: { text: 'text-t-muted', bg: 'bg-t-hover', ring: 'ring-t-border' },
}

export function Timeline({ title, children, className = '' }: TimelineProps) {
  return (
    <div className={`t-card p-5 ${className}`}>
      {title && (
        <div className="font-display text-sm text-t-bright uppercase tracking-wider mb-5">
          {title}
        </div>
      )}
      <div className="relative">{children}</div>
    </div>
  )
}

export function TimelineItem({
  icon,
  color = 'purple',
  title,
  dateTime,
  description,
  badges,
  lastItem = false,
}: TimelineItemProps) {
  const c = colorMap[color]
  return (
    <div className="relative pl-9 pb-6">
      {!lastItem && (
        <span
          aria-hidden
          className="absolute left-[14px] top-7 bottom-0 w-px bg-t-border"
        />
      )}
      <span
        className={`absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full
          ${c.bg} ring-1 ${c.ring} ${c.text}`}
      >
        {icon ?? <span className={`h-2 w-2 rounded-full ${c.text.replace('text-', 'bg-')}`} />}
      </span>

      <div className="text-sm font-semibold text-t-bright leading-tight">{title}</div>
      {dateTime && (
        <div className="text-[11px] text-t-muted mt-0.5 font-terminal uppercase tracking-wider">
          {dateTime}
        </div>
      )}
      {description && (
        <div className="text-xs text-t-text mt-2 leading-relaxed">{description}</div>
      )}
      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {badges.map((b) => (
            <span
              key={b}
              className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider
                ${c.bg} ${c.text}`}
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
