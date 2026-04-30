import type { ReactNode } from 'react'

export interface KeyValuePair {
  label: string
  value: ReactNode
  mono?: boolean
}

interface KeyValueListProps {
  items?: KeyValuePair[]
  children?: ReactNode
  dense?: boolean
  className?: string
}

interface KeyValueRowProps {
  label: string
  children: ReactNode
  mono?: boolean
  dense?: boolean
}

export function KeyValueList({ items, children, dense = false, className = '' }: KeyValueListProps) {
  const gap = dense ? 'gap-y-1.5' : 'gap-y-3'
  return (
    <dl className={`grid grid-cols-[minmax(80px,auto)_1fr] gap-x-4 ${gap} ${className}`}>
      {items?.map((it) => (
        <KeyValueRow key={it.label} label={it.label} mono={it.mono} dense={dense}>
          {it.value}
        </KeyValueRow>
      ))}
      {children}
    </dl>
  )
}

export function KeyValueRow({ label, children, mono = false, dense = false }: KeyValueRowProps) {
  const valueClass = mono
    ? 'font-terminal text-t-bright break-all'
    : 'text-t-bright break-words'
  const textSize = dense ? 'text-xs' : 'text-sm'
  return (
    <>
      <dt className={`text-[10px] uppercase tracking-wider text-t-muted self-center`}>
        {label}
      </dt>
      <dd className={`${textSize} ${valueClass}`}>{children}</dd>
    </>
  )
}
