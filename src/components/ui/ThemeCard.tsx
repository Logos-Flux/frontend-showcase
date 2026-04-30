interface ThemeCardProps {
  children: React.ReactNode
  className?: string
}

export function ThemeCard({ children, className = '' }: ThemeCardProps) {
  return (
    <div className={`t-card p-5 ${className}`}>
      {children}
    </div>
  )
}
