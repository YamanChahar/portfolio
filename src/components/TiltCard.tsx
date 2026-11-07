import { useRef, memo, type ReactNode, type MouseEvent } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  glareOpacity?: number
  onClick?: () => void
}

function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  glareOpacity = 0.16,
  onClick
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const isHoveredRef = useRef(false)
  let rafId: number | null = null

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHoveredRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top
    const xPct = clientX / rect.width - 0.5
    const yPct = clientY / rect.height - 0.5

    if (rafId !== null) return

    rafId = requestAnimationFrame(() => {
      const rotateX = -yPct * maxTilt
      const rotateY = xPct * maxTilt

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
      }
      if (glareRef.current) {
        const glareX = ((clientX / rect.width) * 100).toFixed(1)
        const glareY = ((clientY / rect.height) * 100).toFixed(1)
        glareRef.current.style.background = `radial-gradient(circle 280px at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareOpacity * 4}), transparent 75%)`
      }
      rafId = null
    })
  }

  const handleMouseEnter = () => {
    isHoveredRef.current = true
    if (cardRef.current) {
      cardRef.current.style.transition = 'none'
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = `${glareOpacity}`
    }
  }

  const handleMouseLeave = () => {
    isHoveredRef.current = false
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.4s ease-out'
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
      className={`relative transform-gpu ${className}`}
    >
      {children}

      {/* Dynamic Specular Glare Reflection - Zero React State */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 opacity-0"
        style={{
          willChange: 'background, opacity',
        }}
      />
    </div>
  )
}

export default memo(TiltCard)
