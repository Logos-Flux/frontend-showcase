type GaugeAccent = 'purple' | 'green' | 'info' | 'warning' | 'error' | 'auto'

interface RadialGaugeProps {
  value: number
  min?: number
  max?: number
  label?: string
  unit?: string
  size?: number
  thickness?: number
  accent?: GaugeAccent
  arc?: 'half' | 'full'
  thresholds?: { warn?: number; danger?: number }
}

const strokeColor: Record<Exclude<GaugeAccent, 'auto'>, string> = {
  purple: 'var(--color-t-accent)',
  green: 'var(--color-t-accent-alt)',
  info: 'var(--color-t-info)',
  warning: 'var(--color-t-warning)',
  error: 'var(--color-t-error)',
}

function pickAuto(pct: number, t: { warn?: number; danger?: number }): Exclude<GaugeAccent, 'auto'> {
  if (t.danger !== undefined && pct >= t.danger) return 'error'
  if (t.warn !== undefined && pct >= t.warn) return 'warning'
  if (pct >= 50) return 'info'
  return 'green'
}

export function RadialGauge({
  value,
  min = 0,
  max = 100,
  label,
  unit = '%',
  size = 140,
  thickness = 10,
  accent = 'purple',
  arc = 'half',
  thresholds = { warn: 75, danger: 90 },
}: RadialGaugeProps) {
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)))
  const resolvedAccent = accent === 'auto' ? pickAuto(pct * 100, thresholds) : accent
  const stroke = strokeColor[resolvedAccent]

  const radius = (size - thickness) / 2
  const cx = size / 2

  if (arc === 'half') {
    const cy = size / 2 + radius / 2
    const circumference = Math.PI * radius
    const offset = circumference * (1 - pct)
    const svgHeight = size / 2 + thickness

    return (
      <div className="flex flex-col items-center" style={{ width: size }}>
        <svg width={size} height={svgHeight} viewBox={`0 0 ${size} ${svgHeight}`}>
          <path
            d={`M ${cx - radius},${cy / 1} A ${radius},${radius} 0 0 1 ${cx + radius},${cy / 1}`}
            fill="none"
            stroke="var(--color-t-hover)"
            strokeWidth={thickness}
            strokeLinecap="round"
            transform={`translate(0, ${-radius / 2})`}
          />
          <path
            d={`M ${cx - radius},${cy / 1} A ${radius},${radius} 0 0 1 ${cx + radius},${cy / 1}`}
            fill="none"
            stroke={stroke}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`translate(0, ${-radius / 2})`}
            style={{
              filter: `drop-shadow(0 0 6px ${stroke})`,
              transition: 'stroke-dashoffset 0.5s ease-out',
            }}
          />
        </svg>
        <div className="flex flex-col items-center -mt-8">
          <span className="font-display text-2xl leading-none" style={{ color: stroke }}>
            {value.toFixed(value % 1 ? 1 : 0)}
            <span className="text-sm text-t-muted ml-0.5">{unit}</span>
          </span>
          {label && (
            <span className="text-[10px] uppercase tracking-wider text-t-muted mt-1">
              {label}
            </span>
          )}
        </div>
      </div>
    )
  }

  const cy = size / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - pct)

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="var(--color-t-hover)"
          strokeWidth={thickness}
        />
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            filter: `drop-shadow(0 0 6px ${stroke})`,
            transition: 'stroke-dashoffset 0.5s ease-out',
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-xl leading-none" style={{ color: stroke }}>
          {value.toFixed(value % 1 ? 1 : 0)}
          <span className="text-xs text-t-muted ml-0.5">{unit}</span>
        </span>
        {label && (
          <span className="text-[10px] uppercase tracking-wider text-t-muted mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
