import { useRef, memo, type ReactNode, type MouseEvent } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  strength?: number
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.22,
  href,
  target,
  rel,
  type = 'button',
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  let rafId: number | null = null

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    if (rafId !== null) return

    rafId = requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.style.transition = 'none'
        containerRef.current.style.transform = `translate3d(${distanceX.toFixed(1)}px, ${distanceY.toFixed(1)}px, 0)`
      }
      rafId = null
    })
  }

  const handleMouseLeave = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)'
      containerRef.current.style.transform = 'translate3d(0, 0, 0)'
    }
  }

  const content = (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block will-change-transform"
    >
      {children}
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`inline-block ${className}`}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block border-0 bg-transparent p-0 ${className}`}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  )
}

export default memo(MagneticButton)
