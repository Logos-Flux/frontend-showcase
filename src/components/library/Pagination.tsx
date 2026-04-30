import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  siblings?: number
  showEdges?: boolean
  showPageSize?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  onPageSizeChange?: (size: number) => void
  totalItems?: number
  className?: string
}

type PageToken = number | 'ellipsis'

function buildRange(page: number, pageCount: number, siblings: number): PageToken[] {
  const total = Math.max(1, pageCount)
  const cur = Math.min(Math.max(1, page), total)
  const totalNumbers = siblings * 2 + 5
  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const left = Math.max(cur - siblings, 1)
  const right = Math.min(cur + siblings, total)
  const showLeftDots = left > 2
  const showRightDots = right < total - 1

  const tokens: PageToken[] = [1]
  if (showLeftDots) tokens.push('ellipsis')
  for (let i = Math.max(2, left); i <= Math.min(total - 1, right); i++) {
    tokens.push(i)
  }
  if (showRightDots) tokens.push('ellipsis')
  tokens.push(total)
  return tokens
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  showEdges = true,
  showPageSize = false,
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  totalItems,
  className = '',
}: PaginationProps) {
  const total = Math.max(1, pageCount)
  const cur = Math.min(Math.max(1, page), total)
  const tokens = buildRange(cur, total, siblings)

  const btn = (disabled: boolean, active: boolean) =>
    `inline-flex items-center justify-center h-7 min-w-[28px] px-2 rounded text-xs font-display uppercase tracking-wider
    transition-colors border
    ${active
      ? 'bg-t-accent/20 border-t-accent/50 text-t-bright shadow-[0_0_8px_var(--color-t-accent-glow)]'
      : 'border-t-border text-t-text hover:text-t-bright hover:bg-t-hover'}
    ${disabled ? 'opacity-30 cursor-not-allowed hover:bg-transparent' : 'cursor-pointer'}`

  return (
    <div className={`flex items-center justify-between gap-4 flex-wrap ${className}`}>
      <div className="flex items-center gap-1">
        {showEdges && (
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={cur === 1}
            aria-label="First page"
            className={btn(cur === 1, false)}
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="button"
          onClick={() => onPageChange(cur - 1)}
          disabled={cur === 1}
          aria-label="Previous page"
          className={btn(cur === 1, false)}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {tokens.map((t, i) =>
          t === 'ellipsis' ? (
            <span key={`e-${i}`} className="px-1.5 text-t-muted text-xs select-none">
              …
            </span>
          ) : (
            <button
              key={t}
              type="button"
              onClick={() => onPageChange(t)}
              aria-current={t === cur ? 'page' : undefined}
              className={btn(false, t === cur)}
            >
              {t}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(cur + 1)}
          disabled={cur === total}
          aria-label="Next page"
          className={btn(cur === total, false)}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        {showEdges && (
          <button
            type="button"
            onClick={() => onPageChange(total)}
            disabled={cur === total}
            aria-label="Last page"
            className={btn(cur === total, false)}
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs text-t-muted">
        {totalItems !== undefined && pageSize && (
          <span className="font-terminal uppercase tracking-wider">
            {(cur - 1) * pageSize + 1}–{Math.min(cur * pageSize, totalItems)} / {totalItems}
          </span>
        )}
        {showPageSize && pageSize !== undefined && onPageSizeChange && (
          <label className="flex items-center gap-2">
            <span className="uppercase tracking-wider text-[10px]">Per page</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-t-surface border border-t-border rounded px-2 py-1 text-xs
                text-t-bright focus:outline-none focus:border-t-accent/60"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
    </div>
  )
}
