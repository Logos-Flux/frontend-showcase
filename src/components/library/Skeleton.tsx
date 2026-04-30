import type { CSSProperties } from 'react'

interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle' | 'card'
  width?: number | string
  height?: number | string
  lines?: number
  className?: string
  style?: CSSProperties
}

export function Skeleton({
  variant = 'rect',
  width,
  height,
  lines = 3,
  className = '',
  style,
}: SkeletonProps) {
  if (variant === 'text') {
    return (
      <div className={`flex flex-col gap-2 ${className}`} style={style}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="t-shimmer rounded h-3"
            style={{ width: i === lines - 1 ? '65%' : '100%' }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'circle') {
    const d = width ?? height ?? 40
    return (
      <div
        className={`t-shimmer rounded-full ${className}`}
        style={{ width: d, height: d, ...style }}
      />
    )
  }

  if (variant === 'card') {
    return (
      <div className={`t-card p-5 ${className}`} style={style}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="t-shimmer rounded h-2.5 w-20 mb-2" />
            <div className="t-shimmer rounded h-6 w-32" />
          </div>
          <div className="t-shimmer rounded-lg w-10 h-10" />
        </div>
        <div className="t-shimmer rounded h-8 w-full" />
      </div>
    )
  }

  return (
    <div
      className={`t-shimmer rounded ${className}`}
      style={{ width: width ?? '100%', height: height ?? 16, ...style }}
    />
  )
}
