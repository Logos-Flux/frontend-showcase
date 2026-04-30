import { useMemo, useState, type ReactNode } from 'react'
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react'

export interface DataTableColumn<T> {
  key: string
  header: ReactNode
  accessor?: (row: T) => unknown
  cell?: (row: T, index: number) => ReactNode
  sortable?: boolean
  width?: number | string
  align?: 'left' | 'right' | 'center'
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  rowKey: (row: T, index: number) => string | number
  onRowClick?: (row: T) => void
  emptyState?: ReactNode
  dense?: boolean
  stickyHeader?: boolean
  maxHeight?: number | string
  className?: string
}

type SortState = { key: string; dir: 'asc' | 'desc' } | null

function compare(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime()
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

export function DataTable<T>({
  data,
  columns,
  rowKey,
  onRowClick,
  emptyState,
  dense = false,
  stickyHeader = true,
  maxHeight,
  className = '',
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState>(null)

  const sorted = useMemo(() => {
    if (!sort) return data
    const col = columns.find((c) => c.key === sort.key)
    if (!col || !col.accessor) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const av = col.accessor!(a)
      const bv = col.accessor!(b)
      const cmp = compare(av, bv)
      return sort.dir === 'asc' ? cmp : -cmp
    })
    return copy
  }, [data, sort, columns])

  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: 'asc' }
      if (prev.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
  }

  const cellPad = dense ? 'px-3 py-1.5' : 'px-4 py-2.5'
  const fontSize = dense ? 'text-xs' : 'text-sm'

  return (
    <div
      className={`t-card overflow-auto ${className}`}
      style={{ maxHeight }}
    >
      <table className={`w-full border-collapse ${fontSize}`}>
        <thead className={stickyHeader ? 'sticky top-0 z-10' : ''}>
          <tr className="bg-t-surface/80 backdrop-blur border-b border-t-border">
            {columns.map((col) => {
              const isSorted = sort?.key === col.key
              const Icon = !col.sortable
                ? null
                : !isSorted
                  ? ArrowUpDown
                  : sort!.dir === 'asc'
                    ? ArrowUp
                    : ArrowDown
              return (
                <th
                  key={col.key}
                  style={{ width: col.width, textAlign: col.align ?? 'left' }}
                  className={`${cellPad} font-display text-[10px] uppercase tracking-wider
                    text-t-muted ${col.sortable ? 'cursor-pointer select-none hover:text-t-bright' : ''}`}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {Icon && <Icon className="w-3 h-3" />}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={`${cellPad} text-center text-t-muted`}>
                {emptyState ?? '— no data —'}
              </td>
            </tr>
          ) : (
            sorted.map((row, idx) => (
              <tr
                key={rowKey(row, idx)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`border-b border-t-border/40 transition-colors
                  ${onRowClick ? 'cursor-pointer hover:bg-t-hover/40' : ''}`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{ textAlign: col.align ?? 'left' }}
                    className={`${cellPad} text-t-text ${col.className ?? ''}`}
                  >
                    {col.cell
                      ? col.cell(row, idx)
                      : (col.accessor ? String(col.accessor(row) ?? '') : null)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
