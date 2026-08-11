import { useEffect } from 'react'
import gsap from 'gsap'
import { ISLAND_COORDINATES } from '../constants/islands'

interface CameraControllerProps {
  mapRef: React.RefObject<HTMLDivElement | null>
}

export default function CameraController({ mapRef }: CameraControllerProps) {
  useEffect(() => {
    if (!mapRef.current) return

    const ctx = gsap.context(() => {
      // Create a proxy object representing the camera's focal point and zoom
      const camera = {
        x: ISLAND_COORDINATES[0].x,
        y: ISLAND_COORDINATES[0].y,
        zoom: ISLAND_COORDINATES[0].zoom
      }

      const updateCamera = () => {
        if (!mapRef.current) return
        gsap.set(mapRef.current, {
          x: window.innerWidth / 2 - (camera.x * camera.zoom),
          y: window.innerHeight / 2 - (camera.y * camera.zoom),
          scale: camera.zoom,
          transformOrigin: '0 0'
        })
      }

      // Initial set
      updateCamera()

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        }
      })

      // Move camera to each subsequent island
      for (let i = 1; i < ISLAND_COORDINATES.length; i++) {
        const prev = ISLAND_COORDINATES[i-1]
        const target = ISLAND_COORDINATES[i]
        const label = `island-${i}`
        
        // Keep focal point movement synchronized with the TreasureFleet (1s duration, power2.inOut)
        tl.to(camera, {
          x: target.x,
          y: target.y,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: updateCamera
        }, label)
        
        // Zoom out during the open ocean crossing, zoom back in upon arrival
        const zoomOutScale = Math.min(prev.zoom, target.zoom) * 0.85
        
        tl.to(camera, {
          zoom: zoomOutScale,
          duration: 0.5,
          ease: 'power2.in',
          onUpdate: updateCamera
        }, label)
        
        tl.to(camera, {
          zoom: target.zoom,
          duration: 0.5,
          ease: 'power2.out',
          onUpdate: updateCamera
        }, `${label}+=0.5`)
      }
    })

    // Handle window resize
    const handleResize = () => {
      // Could re-trigger layout calculations here if needed
      ScrollTrigger.refresh()
    }
    
    window.addEventListener('resize', handleResize)

    return () => {
      ctx.revert()
      window.removeEventListener('resize', handleResize)
    }
  }, [mapRef])

  return null
}
