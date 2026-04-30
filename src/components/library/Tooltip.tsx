import {
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

interface TooltipProps {
  content: ReactNode
  children: ReactElement<{
    ref?: React.Ref<HTMLElement>
    onMouseEnter?: (e: React.MouseEvent) => void
    onMouseLeave?: (e: React.MouseEvent) => void
    onFocus?: (e: React.FocusEvent) => void
    onBlur?: (e: React.FocusEvent) => void
  }>
  placement?: TooltipPlacement
  delay?: number
  offset?: number
  disabled?: boolean
  className?: string
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 250,
  offset = 8,
  disabled = false,
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    if (disabled) return
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setVisible(true), delay)
  }
  const hide = () => {
    if (timer.current) clearTimeout(timer.current)
    setVisible(false)
    setPos(null)
  }

  useLayoutEffect(() => {
    if (!visible) return
    const trigger = triggerRef.current
    const tip = tipRef.current
    if (!trigger || !tip) return
    const t = trigger.getBoundingClientRect()
    const c = tip.getBoundingClientRect()
    let top = 0
    let left = 0
    if (placement === 'top') {
      top = t.top - c.height - offset
      left = t.left + t.width / 2 - c.width / 2
    } else if (placement === 'bottom') {
      top = t.bottom + offset
      left = t.left + t.width / 2 - c.width / 2
    } else if (placement === 'left') {
      top = t.top + t.height / 2 - c.height / 2
      left = t.left - c.width - offset
    } else {
      top = t.top + t.height / 2 - c.height / 2
      left = t.right + offset
    }
    top = Math.min(Math.max(4, top), window.innerHeight - c.height - 4)
    left = Math.min(Math.max(4, left), window.innerWidth - c.width - 4)
    setPos({ top, left })
  }, [visible, placement, offset, content])

  if (!isValidElement(children)) return children

  const child = cloneElement(children, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node
    },
    onMouseEnter: (e: React.MouseEvent) => {
      children.props.onMouseEnter?.(e)
      show()
    },
    onMouseLeave: (e: React.MouseEvent) => {
      children.props.onMouseLeave?.(e)
      hide()
    },
    onFocus: (e: React.FocusEvent) => {
      children.props.onFocus?.(e)
      show()
    },
    onBlur: (e: React.FocusEvent) => {
      children.props.onBlur?.(e)
      hide()
    },
  })

  return (
    <>
      {child}
      {visible &&
        createPortal(
          <div
            ref={tipRef}
            role="tooltip"
            className={`pointer-events-none fixed z-[1200] px-2 py-1 rounded
              bg-t-card border border-t-border text-[11px] text-t-bright
              shadow-[0_4px_16px_rgba(0,0,0,0.6)] whitespace-nowrap max-w-xs
              ${className}`}
            style={{
              top: pos?.top ?? -9999,
              left: pos?.left ?? -9999,
              opacity: pos ? 1 : 0,
              transition: 'opacity 120ms ease-out',
            }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  )
}
