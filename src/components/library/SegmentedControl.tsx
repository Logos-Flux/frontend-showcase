import type { ReactNode } from 'react'

export interface SegmentedOption<T extends string | number = string> {
  value: T
  label: ReactNode
  icon?: ReactNode
  disabled?: boolean
}

interface SegmentedControlProps<T extends string | number> {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  size?: 'sm' | 'md'
  fullWidth?: boolean
  className?: string
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  className = '',
}: SegmentedControlProps<T>) {
  const pad = size === 'sm' ? 'px-2.5 py-1 text-[10px]' : 'px-3.5 py-1.5 text-xs'

  return (
    <div
      role="radiogroup"
      className={`inline-flex items-center bg-t-surface/60 border border-t-border rounded-lg p-1 gap-1
        ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={opt.disabled}
            onClick={() => onChange(opt.value)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-md font-display uppercase tracking-wider
              transition-colors whitespace-nowrap ${pad}
              ${fullWidth ? 'flex-1' : ''}
              ${active
                ? 'bg-t-accent/20 text-t-bright shadow-[0_0_8px_var(--color-t-accent-glow)] border border-t-accent/40'
                : 'text-t-muted hover:text-t-bright border border-transparent'}
              ${opt.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {opt.icon && <span className="w-3.5 h-3.5 shrink-0">{opt.icon}</span>}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
