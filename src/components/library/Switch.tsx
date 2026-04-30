interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
}

export function Switch({ checked, onChange, disabled, label }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors
        ${checked
          ? 'bg-t-accent/40 border-t-accent shadow-[0_0_8px_var(--color-t-accent-glow)]'
          : 'bg-t-hover border-t-border'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-t-bright transition-transform
          ${checked ? 'translate-x-[18px]' : 'translate-x-[3px]'}`}
      />
    </button>
  )
}
