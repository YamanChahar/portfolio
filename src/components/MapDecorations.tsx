import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ISLAND_COORDINATES, MAP_SIZE } from '../constants/islands'

// Generate decorations clustered around islands
const generateDecorations = (countPerIsland: number, spread: number, type: 'tree' | 'rock') => {
  const decorations: any[] = []
  let idCounter = 0
  
  ISLAND_COORDINATES.forEach(island => {
    for (let i = 0; i < countPerIsland; i++) {
      // Create a ring around the island center
      const angle = Math.random() * Math.PI * 2
      const distance = 150 + Math.random() * spread
      
      decorations.push({
        id: `${type}-${idCounter++}`,
        x: island.x + Math.cos(angle) * distance,
        y: island.y + Math.sin(angle) * distance,
        scale: 0.4 + Math.random() * 0.6
      })
    }
  })
  
  return decorations
}

// Generate random sky decorations
const generateSkyDecorations = (count: number) => {
  const decos: any[] = []
  for (let i = 0; i < count; i++) {
    decos.push({
      id: `sky-balloon-${i}`,
      x: Math.random() * MAP_SIZE.width,
      y: Math.random() * MAP_SIZE.height,
      scale: 0.8 + Math.random() * 0.6,
    })
  }
  return decos
}

// Generate random ocean decorations
const generateOceanDecorations = (count: number, type: 'barrel' | 'fish' | 'boat') => {
  const decorations: any[] = []
  let idCounter = 0
  
  for (let i = 0; i < count; i++) {
    decorations.push({
      id: `ocean-${type}-${idCounter++}`,
      x: Math.random() * MAP_SIZE.width,
      y: Math.random() * MAP_SIZE.height,
      scale: type === 'fish' ? 0.2 + Math.random() * 0.2 : 0.5 + Math.random() * 0.5,
      rotation: Math.random() * 360
    })
  }
  return decorations
}

const COASTAL_ROCKS = generateDecorations(5, 300, 'rock')
const BARRELS = generateOceanDecorations(15, 'barrel')
const FISH_SHADOWS = generateOceanDecorations(40, 'fish')
const FISHING_BOATS = generateOceanDecorations(6, 'boat')
const BALLOONS = generateSkyDecorations(15)

export default function MapDecorations() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Bobbing barrels
      gsap.utils.toArray('.barrel').forEach((el: any) => {
        gsap.to(el, {
          y: '+=5', rotation: '+=5', duration: 2 + Math.random(), yoyo: true, repeat: -1, ease: 'sine.inOut'
        })
      })

      // Bobbing boats
      gsap.utils.toArray('.boat').forEach((el: any) => {
        gsap.to(el, {
          y: '+=3', rotation: '+=3', duration: 3 + Math.random() * 2, yoyo: true, repeat: -1, ease: 'sine.inOut'
        })
      })

      // Swimming fish
      gsap.utils.toArray('.fish').forEach((el: any) => {
        gsap.to(el, {
          x: '+=50', y: '+=20', duration: 4 + Math.random() * 4, yoyo: true, repeat: -1, ease: 'sine.inOut'
        })
      })

      // Bobbing balloons
      gsap.utils.toArray('.balloon').forEach((el: any) => {
        gsap.to(el, {
          y: '-=25', rotation: '+=3', duration: 4 + Math.random() * 3, yoyo: true, repeat: -1, ease: 'sine.inOut'
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[5]">
      
      {/* Deep Ocean Fish Shadows */}
      {FISH_SHADOWS.map(fish => (
        <svg 
          key={fish.id} 
          className="absolute fish opacity-10 mix-blend-overlay" 
          style={{ left: fish.x, top: fish.y, transform: `scale(${fish.scale}) rotate(${fish.rotation}deg)` }} 
          width="30" height="15" viewBox="0 0 30 15"
        >
          <path d="M 0 7.5 Q 10 0 20 7.5 Q 10 15 0 7.5 Z" fill="#000" />
          <path d="M 20 7.5 L 30 0 L 25 7.5 L 30 15 Z" fill="#000" />
        </svg>
      ))}

      {/* Floating Barrels */}
      {BARRELS.map(barrel => (
        <svg 
          key={barrel.id} 
          className="absolute barrel drop-shadow-md" 
          style={{ left: barrel.x, top: barrel.y, transform: `scale(${barrel.scale}) rotate(${barrel.rotation}deg)` }} 
          width="20" height="20" viewBox="0 0 20 20"
        >
          <circle cx="10" cy="10" r="8" fill="var(--color-bronze)" />
          <circle cx="10" cy="10" r="7" fill="var(--color-stone-dark)" />
          <line x1="2" y1="10" x2="18" y2="10" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        </svg>
      ))}

      {/* Small Fishing Boats */}
      {FISHING_BOATS.map(boat => (
        <svg 
          key={boat.id} 
          className="absolute boat drop-shadow-xl" 
          style={{ left: boat.x, top: boat.y, transform: `scale(${boat.scale}) rotate(${boat.rotation}deg)` }} 
          width="40" height="20" viewBox="0 0 40 20"
        >
          <path d="M 5 5 L 35 5 Q 40 10 30 15 L 10 15 Q 0 10 5 5 Z" fill="var(--color-stone-dark)" />
          <path d="M 8 7 L 32 7 Q 35 10 30 12 L 10 12 Q 5 10 8 7 Z" fill="var(--color-parchment-dark)" />
          <circle cx="20" cy="9" r="1.5" fill="var(--color-island-dirt)" />
        </svg>
      ))}

      {/* Rocks scattered near island coasts */}
      {COASTAL_ROCKS.map(rock => (
        <svg 
          key={rock.id} 
          className="absolute drop-shadow-lg" 
          style={{ left: rock.x, top: rock.y, transform: `scale(${rock.scale})` }} 
          width="40" height="30" viewBox="0 0 40 30"
        >
          <path d="M 5 25 Q 10 10 20 5 T 35 25 Z" fill="var(--color-stone)" />
          <path d="M 15 25 L 20 15 L 25 25 Z" fill="var(--color-stone-dark)" />
          {/* Subtle water ripple */}
          <path d="M -5 28 Q 20 35 45 28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ))}
      
      {/* Vintage Hot Air Balloons */}
      {BALLOONS.map(balloon => (
        <svg 
          key={balloon.id} 
          className="absolute balloon drop-shadow-2xl z-20" 
          style={{ left: balloon.x, top: balloon.y, transform: `scale(${balloon.scale})` }} 
          width="40" height="60" viewBox="0 0 40 60"
        >
          {/* Balloon envelope */}
          <path d="M 20 0 C 40 0, 40 25, 25 40 L 15 40 C 0 25, 0 0, 20 0 Z" fill="var(--color-parchment-dark)" stroke="var(--color-bronze)" strokeWidth="1" />
          <path d="M 20 0 C 30 0, 30 25, 23 40 L 17 40 C 10 25, 10 0, 20 0 Z" fill="var(--color-stone)" stroke="var(--color-bronze)" strokeWidth="1" />
          {/* Ropes */}
          <line x1="15" y1="40" x2="17" y2="50" stroke="var(--color-bronze)" strokeWidth="1" />
          <line x1="25" y1="40" x2="23" y2="50" stroke="var(--color-bronze)" strokeWidth="1" />
          <line x1="20" y1="40" x2="20" y2="50" stroke="var(--color-bronze)" strokeWidth="1" />
          {/* Basket */}
          <rect x="15" y="50" width="10" height="8" rx="1" fill="var(--color-island-dirt)" stroke="var(--color-stone-dark)" strokeWidth="1" />
        </svg>
      ))}
    </div>
  )
}
