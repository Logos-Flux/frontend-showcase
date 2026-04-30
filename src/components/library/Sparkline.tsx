import { Area, AreaChart, Line, LineChart, ResponsiveContainer, YAxis } from 'recharts'

interface SparklineProps {
  data: number[]
  width?: number | string
  height?: number
  color?: string
  fill?: boolean
  strokeWidth?: number
  yDomain?: [number | 'auto', number | 'auto']
  className?: string
}

export function Sparkline({
  data,
  width = '100%',
  height = 28,
  color = 'var(--color-t-accent)',
  fill = true,
  strokeWidth = 1.5,
  yDomain = ['auto', 'auto'],
  className,
}: SparklineProps) {
  const chartData = data.map((v, i) => ({ i, v }))
  const gradientId = `spark-grad-${Math.random().toString(36).slice(2, 9)}`

  return (
    <div className={className} style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        {fill ? (
          <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.6} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={yDomain} />
            <Area
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={strokeWidth}
              fill={`url(#${gradientId})`}
              isAnimationActive={false}
              dot={false}
            />
          </AreaChart>
        ) : (
          <LineChart data={chartData} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
            <YAxis hide domain={yDomain} />
            <Line
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={strokeWidth}
              isAnimationActive={false}
              dot={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
