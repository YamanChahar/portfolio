import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MAP_SIZE } from '../constants/islands'

const CLOUD_DATA = Array.from({ length: 45 }).map((_, i) => ({
  id: i,
  x: Math.random() * MAP_SIZE.width,
  y: Math.random() * MAP_SIZE.height,
  scale: 1.5 + Math.random() * 2.5,
  opacity: 0.2 + Math.random() * 0.3,
  speed: 10 + Math.random() * 20,
}))

export default function Clouds() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const clouds = containerRef.current.children

    gsap.utils.toArray(clouds).forEach((cloud: any, i) => {
      gsap.to(cloud, {
        x: `+=${MAP_SIZE.width}`,
        duration: CLOUD_DATA[i].speed * 10,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % MAP_SIZE.width)
        }
      })
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-50">
      {CLOUD_DATA.map(cloud => (
        <svg
          key={cloud.id}
          className="absolute"
          style={{
            left: cloud.x,
            top: cloud.y,
            transform: `scale(${cloud.scale})`,
            opacity: cloud.opacity,
          }}
          width="100" height="60" viewBox="0 0 100 60"
        >
          <path
            fill="#ffffff"
            d="M 20 40 Q 10 40 10 30 Q 10 20 25 20 Q 30 10 45 10 Q 60 10 65 20 Q 80 15 90 25 Q 100 35 90 45 Q 85 55 70 50 Q 55 60 40 50 Q 25 55 20 40 Z"
          />
        </svg>
      ))}
    </div>
  )
}
