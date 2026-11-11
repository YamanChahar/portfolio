import { ISLAND_COORDINATES, MAP_SIZE } from '../constants/islands'

// Generate decorations clustered around islands
const generateDecorations = (countPerIsland: number, spread: number, type: 'tree' | 'rock') => {
  const decorations: any[] = []
  let idCounter = 0
  
  ISLAND_COORDINATES.forEach(island => {
    for (let i = 0; i < countPerIsland; i++) {
      const angle = (i / countPerIsland) * Math.PI * 2
      const distance = 150 + ((i * 37) % spread)
      
      decorations.push({
        id: `${type}-${idCounter++}`,
        x: island.x + Math.cos(angle) * distance,
        y: island.y + Math.sin(angle) * distance,
        scale: 0.4 + (i % 3) * 0.2
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
      x: (i * 420 + 200) % MAP_SIZE.width,
      y: (i * 380 + 150) % MAP_SIZE.height,
      scale: 0.8 + (i % 3) * 0.2,
      delay: (i * 0.5) % 4
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
      x: (i * 340 + 100) % MAP_SIZE.width,
      y: (i * 410 + 200) % MAP_SIZE.height,
      scale: type === 'fish' ? 0.2 + (i % 3) * 0.1 : 0.5 + (i % 3) * 0.15,
      rotation: (i * 45) % 360,
      delay: (i * 0.4) % 3
    })
  }
  return decorations
}

const COASTAL_ROCKS = generateDecorations(1, 250, 'rock')
const COASTAL_TREES = generateDecorations(1, 260, 'tree')
const BARRELS = generateOceanDecorations(4, 'barrel')
const FISH_SHADOWS = generateOceanDecorations(5, 'fish')
const FISHING_BOATS = generateOceanDecorations(2, 'boat')
const BALLOONS = generateSkyDecorations(2)

export default function MapDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[5]">
      
      {/* Deep Ocean Fish Shadows - Hardware accelerated CSS */}
      {FISH_SHADOWS.map(fish => (
        <svg 
          key={fish.id} 
          className="absolute anim-fish opacity-10" 
          style={{ 
            left: fish.x, 
            top: fish.y, 
            transform: `scale(${fish.scale}) rotate(${fish.rotation}deg)`,
            animationDelay: `${fish.delay}s`
          }} 
          width="30" 
          height="15" 
          viewBox="0 0 30 15"
        >
          <path d="M 0 7.5 Q 10 0 20 7.5 Q 10 15 0 7.5 Z" fill="#000" />
          <path d="M 20 7.5 L 30 0 L 25 7.5 L 30 15 Z" fill="#000" />
        </svg>
      ))}

      {/* Floating Barrels - Hardware accelerated CSS */}
      {BARRELS.map(barrel => (
        <svg 
          key={barrel.id} 
          className="absolute anim-map-bob" 
          style={{ 
            left: barrel.x, 
            top: barrel.y, 
            transform: `scale(${barrel.scale}) rotate(${barrel.rotation}deg)`,
            animationDelay: `${barrel.delay}s`
          }} 
          width="20" 
          height="20" 
          viewBox="0 0 20 20"
        >
          <circle cx="10" cy="10" r="8" fill="var(--color-bronze)" />
          <circle cx="10" cy="10" r="7" fill="var(--color-stone-dark)" />
          <line x1="2" y1="10" x2="18" y2="10" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        </svg>
      ))}

      {/* Small Fishing Boats - Hardware accelerated CSS */}
      {FISHING_BOATS.map(boat => (
        <svg 
          key={boat.id} 
          className="absolute anim-map-sway" 
          style={{ 
            left: boat.x, 
            top: boat.y, 
            transform: `scale(${boat.scale}) rotate(${boat.rotation}deg)`,
            animationDelay: `${boat.delay}s`
          }} 
          width="40" 
          height="20" 
          viewBox="0 0 40 20"
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
          className="absolute" 
          style={{ left: rock.x, top: rock.y, transform: `scale(${rock.scale})` }} 
          width="40" 
          height="30" 
          viewBox="0 0 40 30"
        >
          <path d="M 5 25 Q 10 10 20 5 T 35 25 Z" fill="var(--color-stone)" />
          <path d="M 15 25 L 20 15 L 25 25 Z" fill="var(--color-stone-dark)" />
          {/* Subtle water ripple */}
          <path d="M -5 28 Q 20 35 45 28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ))}

      {/* Coastal Palm Trees around Island Shores */}
      {COASTAL_TREES.map(tree => (
        <svg
          key={tree.id}
          className="absolute"
          style={{ left: tree.x, top: tree.y, transform: `scale(${tree.scale * 1.2})` }}
          width="60"
          height="80"
          viewBox="0 0 60 80"
        >
          {/* Brown Stem / Trunk with bark rings */}
          <path d="M 30 20 Q 32 50 36 78" fill="none" stroke="#92400e" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 30 20 Q 32 50 36 78" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="29" y1="36" x2="34" y2="37" stroke="#451a03" strokeWidth="1.5" />
          <line x1="30" y1="52" x2="35" y2="53" stroke="#451a03" strokeWidth="1.5" />
          <line x1="32" y1="68" x2="37" y2="69" stroke="#451a03" strokeWidth="1.5" />
          <circle cx="36" cy="78" r="3.5" fill="#5e2b07" />

          {/* Symmetrically Uniform Dark Green Island Fronds Crown */}
          <g transform="translate(30, 20)">
            <path d="M 0 0 Q -18 -14 -28 -4 Q -18 -2 0 0" fill="#1b4d24" stroke="#0f2b14" strokeWidth="0.8" />
            <path d="M 0 0 Q 18 -14 28 -4 Q 18 -2 0 0" fill="#1b4d24" stroke="#0f2b14" strokeWidth="0.8" />
            <path d="M 0 0 Q -22 -4 -30 10 Q -18 6 0 0" fill="#164320" stroke="#0f2b14" strokeWidth="0.8" />
            <path d="M 0 0 Q 22 -4 30 10 Q 18 6 0 0" fill="#164320" stroke="#0f2b14" strokeWidth="0.8" />
            <path d="M 0 0 Q -14 10 -22 20 Q -10 12 0 0" fill="#1b4d24" stroke="#0f2b14" strokeWidth="0.8" />
            <path d="M 0 0 Q 14 10 22 20 Q 10 12 0 0" fill="#1b4d24" stroke="#0f2b14" strokeWidth="0.8" />
            <path d="M 0 0 Q -10 -18 -16 -26 Q -8 -14 0 0" fill="#20592b" stroke="#0f2b14" strokeWidth="0.8" />
            <path d="M 0 0 Q 10 -18 16 -26 Q 8 -14 0 0" fill="#20592b" stroke="#0f2b14" strokeWidth="0.8" />
            <path d="M 0 0 Q 0 -22 0 -28 Q 3 -14 0 0" fill="#286c35" stroke="#0f2b14" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="3" fill="#164320" />
          </g>
        </svg>
      ))}
      
      {/* Vintage Hot Air Balloons */}
      {BALLOONS.map(balloon => (
        <svg 
          key={balloon.id} 
          className="absolute anim-map-bob z-20" 
          style={{ 
            left: balloon.x, 
            top: balloon.y, 
            transform: `scale(${balloon.scale})`,
            animationDelay: `${balloon.delay}s`
          }} 
          width="40" 
          height="60" 
          viewBox="0 0 40 60"
        >
          <path d="M 20 0 C 40 0, 40 25, 25 40 L 15 40 C 0 25, 0 0, 20 0 Z" fill="var(--color-parchment-dark)" stroke="var(--color-bronze)" strokeWidth="1" />
          <path d="M 20 0 C 30 0, 30 25, 23 40 L 17 40 C 10 25, 10 0, 20 0 Z" fill="var(--color-stone)" stroke="var(--color-bronze)" strokeWidth="1" />
          <line x1="15" y1="40" x2="17" y2="50" stroke="var(--color-bronze)" strokeWidth="1" />
          <line x1="25" y1="40" x2="23" y2="50" stroke="var(--color-bronze)" strokeWidth="1" />
          <line x1="20" y1="40" x2="20" y2="50" stroke="var(--color-bronze)" strokeWidth="1" />
          <rect x="15" y="50" width="10" height="8" rx="1" fill="var(--color-island-dirt)" stroke="var(--color-stone-dark)" strokeWidth="1" />
        </svg>
      ))}
    </div>
  )
}
