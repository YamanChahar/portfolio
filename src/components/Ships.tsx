import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const SHIPS = [
  { id: 1, type: 'pirate', scale: 0.7 },
  { id: 2, type: 'fishing', scale: 0.5 },
  { id: 3, type: 'pirate', scale: 0.6 },
  { id: 4, type: 'fishing', scale: 0.4 },
]

export default function Ships() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const elements = containerRef.current.children

    gsap.utils.toArray(elements).forEach((el: any) => {
      // Subtle cinematic bobbing
      gsap.to(el.querySelector('.ship-body'), {
        y: '-=2',
        rotation: '-=1',
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      })
      
      // Gentle wake
      gsap.to(el.querySelector('.ship-wake'), {
        scaleX: 1.3,
        opacity: 0,
        duration: 3,
        repeat: -1,
        ease: 'power1.out'
      })

      // Very slow roaming
      const moveShip = () => {
        const currentX = gsap.getProperty(el, "x") as number || parseFloat(el.style.left) || 0
        const currentY = gsap.getProperty(el, "y") as number || parseFloat(el.style.top) || 0
        
        const newX = Math.max(200, Math.min(3800, currentX + (Math.random() * 800 - 400)))
        const newY = Math.max(200, Math.min(3800, currentY + (Math.random() * 800 - 400)))
        
        const angle = Math.atan2(newY - currentY, newX - currentX) * (180 / Math.PI)

        gsap.to(el, {
          x: newX - currentX,
          y: newY - currentY,
          rotation: angle + 90,
          duration: 40 + Math.random() * 40, // Much slower
          ease: 'sine.inOut',
          onComplete: moveShip
        })
      }
      
      moveShip()
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10">
      {SHIPS.map(ship => {
        const startX = Math.random() * 3000 + 500
        const startY = Math.random() * 3000 + 500

        return (
          <div
            key={ship.id}
            className="absolute origin-center"
            style={{ left: startX, top: startY, transform: `scale(${ship.scale})` }}
          >
            <div className="relative ship-body">
              {/* Wake */}
              <div className="ship-wake absolute top-10 -left-4 w-16 h-16 rounded-full border-2 border-t-[#e8dcc4] border-transparent opacity-20 blur-[1px]" />
              
              {ship.type === 'pirate' ? (
                <svg width="80" height="100" viewBox="0 0 80 100" className="drop-shadow-xl opacity-90">
                  <path d="M 40 10 L 40 80" stroke="var(--color-island-dirt)" strokeWidth="3" />
                  <path d="M 20 20 Q 40 40 60 20 Q 40 10 20 20 Z" fill="var(--color-parchment)" opacity="0.8" />
                  <path d="M 20 40 Q 40 60 60 40 Q 40 30 20 40 Z" fill="var(--color-parchment-dark)" opacity="0.8" />
                  <path d="M 30 10 L 50 10 L 60 80 Q 40 100 20 80 Z" fill="var(--color-island-dirt)" />
                </svg>
              ) : (
                <svg width="40" height="60" viewBox="0 0 40 60" className="drop-shadow-lg opacity-80">
                  <path d="M 20 10 L 20 50" stroke="var(--color-island-dirt)" strokeWidth="2" />
                  <path d="M 10 20 Q 20 30 30 20 Z" fill="var(--color-parchment)" />
                  <path d="M 15 10 L 25 10 L 30 50 Q 20 60 10 50 Z" fill="var(--color-island-dirt)" />
                </svg>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
