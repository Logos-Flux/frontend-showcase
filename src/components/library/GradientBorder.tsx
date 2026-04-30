import type { CSSProperties, ReactNode } from 'react'

interface GradientBorderProps {
  children: ReactNode
  backgroundImage?: string
  borderRadius?: number | string
  padding?: number | string
  minWidth?: number | string
  width?: number | string
  className?: string
  style?: CSSProperties
}

const DEFAULT_GRADIENT =
  'radial-gradient(94.43% 69.43% at 50% 50%, rgba(123,47,190,0.65) 0%, rgba(1,255,112,0.15) 60%, rgba(15,21,53,0) 100%)'

export function GradientBorder({
  children,
  backgroundImage = DEFAULT_GRADIENT,
  borderRadius = 10,
  padding = '1.5px',
  minWidth,
  width,
  className = '',
  style,
}: GradientBorderProps) {
  return (
    <div
      className={className}
      style={{
        width,
        minWidth,
        padding,
        borderRadius,
        backgroundImage,
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
