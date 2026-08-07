import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MAP_SIZE } from '../constants/islands'

const BIRD_DATA = Array.from({ length: 40 }).map((_, i) => ({
  id: `bird-${i}`,
  x: Math.random() * MAP_SIZE.width,
  y: Math.random() * MAP_SIZE.height,
  scale: 0.15 + Math.random() * 0.2,
}))

const DOLPHIN_DATA = Array.from({ length: 4 }).map((_, i) => ({
  id: `dolphin-${i}`,
  x: Math.random() * MAP_SIZE.width,
  y: Math.random() * MAP_SIZE.height,
  scale: 0.3 + Math.random() * 0.2,
}))

export default function Birds() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const birds = containerRef.current.querySelectorAll('.bird')
    const dolphins = containerRef.current.querySelectorAll('.dolphin')

    gsap.utils.toArray(birds).forEach((bird: any) => {
      // Cinematic slow flap
      gsap.to(bird.querySelector('path'), {
        attr: { d: "M 0 10 Q 10 0 20 10 Q 30 0 40 10 Q 20 5 0 10" },
        yoyo: true,
        repeat: -1,
        duration: 0.5 + Math.random() * 0.3,
        ease: 'sine.inOut'
      })

      // Slow majestic flight
      gsap.to(bird, {
        x: `+=${MAP_SIZE.width}`,
        y: `-=${Math.random() * 300 + 100}`,
        duration: 80 + Math.random() * 40,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % MAP_SIZE.width)
        }
      })
    })

    gsap.utils.toArray(dolphins).forEach((dolphin: any) => {
      const tl = gsap.timeline({ repeat: -1, delay: Math.random() * 10 })
      
      // Dive
      tl.to(dolphin, { y: '-=30', rotation: -20, duration: 1.5, ease: 'sine.out' })
        .to(dolphin, { y: '+=30', rotation: 20, duration: 1.5, ease: 'sine.in' })
        .to(dolphin, { rotation: 0, duration: 0.1 })
        
      // Move
      gsap.to(dolphin, {
        x: '+=150',
        duration: 3.1,
        repeat: -1,
        ease: 'none'
      })
    })

  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-40">
      {BIRD_DATA.map(bird => (
        <svg
          key={bird.id}
          className="absolute bird opacity-40 mix-blend-overlay"
          style={{
            left: bird.x,
            top: bird.y,
            transform: `scale(${bird.scale})`,
          }}
          width="40" height="20" viewBox="0 0 40 20"
        >
          <path
            fill="none"
            stroke="var(--color-parchment)"
            strokeWidth="3"
            strokeLinecap="round"
            d="M 0 10 Q 10 5 20 10 Q 30 5 40 10 Q 20 12 0 10"
          />
        </svg>
      ))}

      {DOLPHIN_DATA.map(dolphin => (
        <svg
          key={dolphin.id}
          className="absolute dolphin opacity-30 mix-blend-overlay"
          style={{
            left: dolphin.x,
            top: dolphin.y,
            transform: `scale(${dolphin.scale})`,
          }}
          width="40" height="20" viewBox="0 0 40 20"
        >
          <path d="M 0 10 Q 15 -5 30 10 Q 40 15 35 15 Q 20 20 0 10 Z" fill="var(--color-ocean-light)" />
          <path d="M 15 5 L 20 0 L 25 5 Z" fill="var(--color-ocean-light)" />
        </svg>
      ))}
    </div>
  )
}
