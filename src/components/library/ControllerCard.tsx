import type { ReactNode } from 'react'
import { Switch } from './Switch'
import { GradientBorder } from './GradientBorder'

interface ControllerCardProps {
  title: string
  description?: string
  icon: ReactNode
  state: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  accent?: 'purple' | 'green' | 'info'
}

const accentGradient: Record<NonNullable<ControllerCardProps['accent']>, string> = {
  purple:
    'radial-gradient(94.43% 69.43% at 50% 50%, rgba(123,47,190,0.75) 0%, rgba(15,21,53,0) 100%)',
  green:
    'radial-gradient(94.43% 69.43% at 50% 50%, rgba(1,255,112,0.55) 0%, rgba(15,21,53,0) 100%)',
  info:
    'radial-gradient(94.43% 69.43% at 50% 50%, rgba(0,117,255,0.6) 0%, rgba(15,21,53,0) 100%)',
}

export function ControllerCard({
  title,
  description,
  icon,
  state,
  onChange,
  disabled,
  accent = 'purple',
}: ControllerCardProps) {
  const gradient = state ? accentGradient[accent] : undefined

  return (
    <GradientBorder
      backgroundImage={gradient}
      borderRadius={10}
      padding="1.5px"
      style={{ width: '100%', display: 'block' }}
    >
      <div
        className={`t-card p-5 min-h-[160px] flex flex-col justify-between
          ${state ? '' : 'opacity-70'}`}
      >
        <div className="flex items-start justify-between">
          <span className={`text-xs uppercase tracking-wider font-display
            ${state ? 'text-t-bright' : 'text-t-muted'}`}>
            {state ? 'ONLINE' : 'OFFLINE'}
          </span>
          <Switch checked={state} onChange={onChange} disabled={disabled} label={title} />
        </div>

        <div className={`my-2 ${state ? 'text-t-accent' : 'text-t-muted'}`}>
          {icon}
        </div>

        <div>
          <div className={`text-sm font-semibold truncate
            ${state ? 'text-t-bright' : 'text-t-text'}`}>
            {title}
          </div>
          {description && (
            <div className="text-xs text-t-muted mt-0.5 line-clamp-2">
              {description}
            </div>
          )}
        </div>
      </div>
    </GradientBorder>
  )
}
