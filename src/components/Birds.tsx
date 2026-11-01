import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MAP_SIZE } from '../constants/islands'

const BIRD_DATA = Array.from({ length: 14 }).map((_, i) => ({
  id: `bird-${i}`,
  x: (i * 280) % MAP_SIZE.width,
  y: 300 + ((i * 380) % (MAP_SIZE.height - 600)),
  scale: 0.18 + ((i * 13) % 10) * 0.015,
}))

const DOLPHIN_DATA = [
  { id: 'dolphin-0', x: 1600, y: 2200, scale: 0.4 },
  { id: 'dolphin-1', x: 2600, y: 900, scale: 0.35 },
]

export default function Birds() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const birds = containerRef.current.querySelectorAll('.bird')
    const dolphins = containerRef.current.querySelectorAll('.dolphin')

    const tweens: gsap.core.Tween[] = []

    gsap.utils.toArray(birds).forEach((bird: any, i) => {
      // Slow majestic flight with hardware acceleration
      const t = gsap.to(bird, {
        x: `+=${MAP_SIZE.width}`,
        y: `-=${120 + (i % 3) * 60}`,
        duration: 90 + (i % 5) * 15,
        ease: 'none',
        repeat: -1,
        force3D: true,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % MAP_SIZE.width)
        }
      })
      tweens.push(t)
    })

    gsap.utils.toArray(dolphins).forEach((dolphin: any) => {
      const t = gsap.to(dolphin, {
        y: '-=25',
        rotation: 12,
        yoyo: true,
        repeat: -1,
        duration: 2.2,
        ease: 'sine.inOut',
        force3D: true
      })
      tweens.push(t)
    })

    return () => {
      tweens.forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-40">
      {BIRD_DATA.map((bird, i) => (
        <svg
          key={bird.id}
          className="absolute bird opacity-40 anim-wing"
          style={{
            left: bird.x,
            top: bird.y,
            transform: `scale(${bird.scale})`,
            animationDelay: `${(i * 0.2) % 0.6}s`
          }}
          width="40" 
          height="20" 
          viewBox="0 0 40 20"
        >
          <path
            fill="none"
            stroke="var(--color-parchment)"
            strokeWidth="3"
            strokeLinecap="round"
            d="M 0 10 Q 10 3 20 10 Q 30 3 40 10 Q 20 12 0 10"
          />
        </svg>
      ))}

      {DOLPHIN_DATA.map(dolphin => (
        <svg
          key={dolphin.id}
          className="absolute dolphin opacity-35"
          style={{
            left: dolphin.x,
            top: dolphin.y,
            transform: `scale(${dolphin.scale})`,
          }}
          width="50" 
          height="30" 
          viewBox="0 0 50 30"
        >
          <path
            fill="var(--color-ocean-light)"
            d="M 5 20 Q 25 0 45 15 Q 35 15 25 10 Q 15 15 5 20 Z"
          />
          <path
            fill="var(--color-ocean-light)"
            d="M 25 10 Q 30 0 35 10 Z"
          />
        </svg>
      ))}
    </div>
  )
}
