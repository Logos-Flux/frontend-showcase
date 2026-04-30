import { useMemo } from 'react'

export interface HeatmapDatum {
  date: string | Date
  value: number
}

interface HeatmapProps {
  data: HeatmapDatum[]
  weeks?: number
  endDate?: Date
  accent?: 'purple' | 'green' | 'info'
  cellSize?: number
  gap?: number
  showMonthLabels?: boolean
  showWeekdayLabels?: boolean
  title?: string
  className?: string
}

const accentSteps: Record<NonNullable<HeatmapProps['accent']>, string[]> = {
  purple: [
    'var(--color-t-hover)',
    'rgba(123, 47, 190, 0.28)',
    'rgba(123, 47, 190, 0.55)',
    'rgba(123, 47, 190, 0.8)',
    'var(--color-t-accent)',
  ],
  green: [
    'var(--color-t-hover)',
    'rgba(1, 255, 112, 0.22)',
    'rgba(1, 255, 112, 0.45)',
    'rgba(1, 255, 112, 0.7)',
    'var(--color-t-accent-alt)',
  ],
  info: [
    'var(--color-t-hover)',
    'rgba(0, 117, 255, 0.25)',
    'rgba(0, 117, 255, 0.5)',
    'rgba(0, 117, 255, 0.75)',
    'var(--color-t-info)',
  ],
}

const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const WEEKDAY_NAMES = ['', 'MON', '', 'WED', '', 'FRI', '']

function toKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function parseDatum(raw: HeatmapDatum['date']): Date {
  return raw instanceof Date ? raw : new Date(raw)
}

export function Heatmap({
  data,
  weeks = 26,
  endDate,
  accent = 'purple',
  cellSize = 11,
  gap = 2,
  showMonthLabels = true,
  showWeekdayLabels = true,
  title,
  className = '',
}: HeatmapProps) {
  const { grid, max, monthMarks } = useMemo(() => {
    const end = endDate ?? new Date()
    end.setHours(0, 0, 0, 0)
    const sundayAligned = new Date(end)
    sundayAligned.setDate(end.getDate() + (6 - end.getDay()))

    const byKey = new Map<string, number>()
    for (const d of data) {
      const parsed = parseDatum(d.date)
      parsed.setHours(0, 0, 0, 0)
      byKey.set(toKey(parsed), (byKey.get(toKey(parsed)) ?? 0) + d.value)
    }

    const g: { date: Date; value: number }[][] = []
    const marks: { weekIdx: number; month: number }[] = []
    let lastMonth = -1
    for (let w = weeks - 1; w >= 0; w--) {
      const col: { date: Date; value: number }[] = []
      for (let dow = 0; dow < 7; dow++) {
        const cell = new Date(sundayAligned)
        cell.setDate(sundayAligned.getDate() - w * 7 - (6 - dow))
        const val = byKey.get(toKey(cell)) ?? 0
        col.push({ date: cell, value: val })
      }
      const firstOfWeek = col[0].date.getMonth()
      const weekIdx = weeks - 1 - w
      if (firstOfWeek !== lastMonth) {
        marks.push({ weekIdx, month: firstOfWeek })
        lastMonth = firstOfWeek
      }
      g.push(col)
    }

    let m = 0
    for (const col of g) for (const c of col) if (c.value > m) m = c.value

    return { grid: g, max: m, monthMarks: marks }
  }, [data, weeks, endDate])

  const palette = accentSteps[accent]
  const pickColor = (v: number): string => {
    if (!max || v === 0) return palette[0]
    const ratio = v / max
    if (ratio > 0.75) return palette[4]
    if (ratio > 0.5) return palette[3]
    if (ratio > 0.25) return palette[2]
    return palette[1]
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const gridWidth = weeks * (cellSize + gap) - gap
  const gridHeight = 7 * (cellSize + gap) - gap

  return (
    <div className={`t-card p-5 ${className}`}>
      {title && (
        <div className="font-display text-sm text-t-bright uppercase tracking-wider mb-4">
          {title}
        </div>
      )}
      <div className="flex gap-2">
        {showWeekdayLabels && (
          <div
            className="flex flex-col text-[9px] text-t-muted font-terminal shrink-0"
            style={{ gap, paddingTop: showMonthLabels ? 16 : 0 }}
          >
            {WEEKDAY_NAMES.map((n, i) => (
              <div key={i} style={{ height: cellSize, lineHeight: `${cellSize}px` }}>
                {n}
              </div>
            ))}
          </div>
        )}
        <div>
          {showMonthLabels && (
            <div className="relative text-[9px] text-t-muted font-terminal mb-1" style={{ height: 12, width: gridWidth }}>
              {monthMarks.map((m) => (
                <span
                  key={`${m.weekIdx}-${m.month}`}
                  className="absolute"
                  style={{ left: m.weekIdx * (cellSize + gap) }}
                >
                  {MONTH_NAMES[m.month]}
                </span>
              ))}
            </div>
          )}
          <svg width={gridWidth} height={gridHeight} role="img" aria-label="activity heatmap">
            {grid.map((col, ci) =>
              col.map((cell, ri) => {
                const inFuture = cell.date > today
                return (
                  <rect
                    key={`${ci}-${ri}`}
                    x={ci * (cellSize + gap)}
                    y={ri * (cellSize + gap)}
                    width={cellSize}
                    height={cellSize}
                    rx={2}
                    ry={2}
                    fill={inFuture ? 'transparent' : pickColor(cell.value)}
                    stroke={inFuture ? 'var(--color-t-border)' : 'none'}
                    strokeWidth={inFuture ? 0.5 : 0}
                  >
                    <title>
                      {cell.date.toDateString()} — {cell.value}
                    </title>
                  </rect>
                )
              }),
            )}
          </svg>
          <div className="flex items-center justify-end gap-1.5 mt-2 text-[9px] text-t-muted font-terminal">
            <span>LESS</span>
            {palette.map((c, i) => (
              <span key={i} className="inline-block" style={{ width: cellSize, height: cellSize, background: c, borderRadius: 2 }} />
            ))}
            <span>MORE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
