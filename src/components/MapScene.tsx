import { useRef, useEffect } from 'react'
import CameraController from './CameraController'
import { ISLAND_COORDINATES, MAP_SIZE } from '../constants/islands'

import IslandLanding from '../sections/IslandLanding'
import IslandAbout from '../sections/IslandAbout'
import IslandSkills from '../sections/IslandSkills'
import IslandProjects from '../sections/IslandProjects'
import IslandExperience from '../sections/IslandExperience'
import IslandContact from '../sections/IslandContact'
import Ocean from './Ocean'
import Path from './Path'
import Clouds from './Clouds'
import Birds from './Birds'
import Particles from './Particles'
import Ships from './Ships'
import MapDecorations from './MapDecorations'
import TreasureFleet from './TreasureFleet'
import Weather from './Weather'
import AmbientAudio from './AmbientAudio'
import MessageInABottle from './MessageInABottle'
import EasterEggs from './EasterEggs'
import gsap from 'gsap'

export default function MapScene() {
  const mapRef = useRef<HTMLDivElement>(null)
  const foregroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!foregroundRef.current) return

    // Optimized mouse parallax using gsap.quickTo to prevent continuous tween creation
    const quickX = gsap.quickTo(foregroundRef.current, 'x', { duration: 0.6, ease: 'power2.out' })
    const quickY = gsap.quickTo(foregroundRef.current, 'y', { duration: 0.6, ease: 'power2.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 35
      const y = (e.clientY / window.innerHeight - 0.5) * 35
      quickX(-x)
      quickY(-y)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-ocean-dark">
      <Ocean />
      <CameraController mapRef={mapRef} />

      <div
        ref={mapRef}
        className="absolute top-0 left-0"
        style={{ 
          width: MAP_SIZE.width, 
          height: MAP_SIZE.height,
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <MapDecorations />
        <Particles />
        <Path />

        {/* Parallax Foreground Layer */}
        <div 
          ref={foregroundRef} 
          className="absolute inset-0 pointer-events-none"
          style={{ willChange: 'transform' }}
        >
          <Clouds />
          <Birds />
        </div>

        <MessageInABottle />
        <EasterEggs />
        <AmbientAudio />

        <Ships />
        <TreasureFleet />

        <IslandLanding x={ISLAND_COORDINATES[0].x} y={ISLAND_COORDINATES[0].y} />
        <IslandAbout x={ISLAND_COORDINATES[1].x} y={ISLAND_COORDINATES[1].y} />
        <IslandSkills x={ISLAND_COORDINATES[2].x} y={ISLAND_COORDINATES[2].y} />
        <IslandProjects x={ISLAND_COORDINATES[3].x} y={ISLAND_COORDINATES[3].y} />
        <IslandExperience x={ISLAND_COORDINATES[4].x} y={ISLAND_COORDINATES[4].y} />
        <IslandContact x={ISLAND_COORDINATES[5].x} y={ISLAND_COORDINATES[5].y} />
      </div>

      {/* Weather Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[60]">
        <Weather />
      </div>
    </div>
  )
}
