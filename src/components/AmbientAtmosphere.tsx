import { useEffect, useRef, useState, memo } from 'react'

function AmbientAtmosphere() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const [hasMouse, setHasMouse] = useState(false)

  useEffect(() => {
    // Only enable cursor spotlight on fine pointer devices (desktops)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    if (!mediaQuery.matches) return

    setHasMouse(true)
    const spotlight = spotlightRef.current
    if (!spotlight) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let currentX = mouseX
    let currentY = mouseY
    let rafId: number | null = null
    let isRunning = false

    const render = () => {
      const dx = mouseX - currentX
      const dy = mouseY - currentY

      // Sleep when spotlight has reached the cursor to save CPU/GPU cycles
      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        currentX = mouseX
        currentY = mouseY
        if (spotlight) {
          spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
        }
        isRunning = false
        rafId = null
        return
      }

      currentX += dx * 0.15
      currentY += dy * 0.15

      if (spotlight) {
        spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }

      rafId = requestAnimationFrame(render)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Wake up render loop only when mouse moves
      if (!isRunning) {
        isRunning = true
        rafId = requestAnimationFrame(render)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* 
        High-Performance Bioluminescent Ambient Meshes
        Uses pre-diffuse multi-stop radial gradients without heavy GPU blur filters or blend modes
      */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full pointer-events-none animate-aurora-slow opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, rgba(6, 182, 212, 0.08) 35%, rgba(6, 182, 212, 0.02) 55%, transparent 70%)',
          willChange: 'transform'
        }}
      />
      
      <div 
        className="absolute top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full pointer-events-none animate-aurora-delayed opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.16) 0%, rgba(176, 141, 87, 0.06) 40%, rgba(176, 141, 87, 0.01) 60%, transparent 70%)',
          willChange: 'transform'
        }}
      />

      <div 
        className="absolute -bottom-[15%] left-[20%] w-[60vw] h-[60vw] rounded-full pointer-events-none animate-aurora-drift opacity-55"
        style={{
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.16) 0%, rgba(31, 55, 90, 0.08) 45%, transparent 70%)',
          willChange: 'transform'
        }}
      />

      {/* Interactive Cursor Spotlight (Bioluminescent Lantern Glow) */}
      {hasMouse && (
        <div
          ref={spotlightRef}
          className="absolute -top-[250px] -left-[250px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, rgba(14, 165, 233, 0.04) 40%, transparent 70%)',
            willChange: 'transform',
            transform: 'translate3d(-9999px, -9999px, 0)'
          }}
        />
      )}

      {/* Ultra-Fine Analog Cinematic Grain Texture Overlay - Zero Blend Mode Overhead */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
    </div>
  )
}

export default memo(AmbientAtmosphere)
