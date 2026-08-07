import { useEffect, useRef } from 'react'
import { ISLAND_COORDINATES, MAP_SIZE } from '../constants/islands'
import gsap from 'gsap'

export default function Path() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return
    const length = pathRef.current.getTotalLength()
    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length })

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    })
  }, [])

  // Create a curved path string connecting all islands
  const generatePath = () => {
    if (ISLAND_COORDINATES.length === 0) return ''
    
    let d = `M ${ISLAND_COORDINATES[0].x} ${ISLAND_COORDINATES[0].y}`
    
    for (let i = 1; i < ISLAND_COORDINATES.length; i++) {
      const prev = ISLAND_COORDINATES[i - 1]
      const curr = ISLAND_COORDINATES[i]
      
      // Simple cubic bezier curve with control points halfway in x or y depending on distance
      const midX = (prev.x + curr.x) / 2
      const midY = (prev.y + curr.y) / 2
      
      d += ` Q ${prev.x} ${curr.y}, ${midX} ${midY} T ${curr.x} ${curr.y}`
    }
    
    return d
  }

  return (
    <svg 
      className="absolute inset-0 pointer-events-none"
      width={MAP_SIZE.width} 
      height={MAP_SIZE.height}
      viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`}
    >
      <path
        ref={pathRef}
        d={generatePath()}
        fill="none"
        stroke="rgba(255, 215, 0, 0.4)"
        strokeWidth="6"
        strokeDasharray="20 15"
        strokeLinecap="round"
      />
    </svg>
  )
}
