import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MAP_SIZE } from '../constants/islands'

const PARTICLE_COUNT = 50
const PARTICLES = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
  id: i,
  x: Math.random() * MAP_SIZE.width,
  y: Math.random() * MAP_SIZE.height,
  scale: 0.2 + Math.random() * 0.8,
  opacity: Math.random() * 0.5 + 0.1,
  color: Math.random() > 0.5 ? '#ffd700' : '#4ade80' // Gold or Emerald
}))

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const particles = containerRef.current.children

    gsap.utils.toArray(particles).forEach((p: any) => {
      // Random wandering movement
      gsap.to(p, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: 5 + Math.random() * 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // Twinkling effect
      gsap.to(p, {
        opacity: Math.random(),
        duration: 1 + Math.random() * 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20">
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.scale * 4}px`,
            height: `${p.scale * 4}px`,
            backgroundColor: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.scale * 10}px ${p.color}`,
          }}
        />
      ))}
    </div>
  )
}
