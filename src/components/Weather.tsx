import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Weather() {
  const fogRef = useRef<HTMLDivElement>(null)
  const lightningRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Smooth, lightweight fog drift
    if (fogRef.current) {
      gsap.to(fogRef.current, {
        x: '-=400',
        duration: 80,
        repeat: -1,
        ease: 'none',
        force3D: true,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % window.innerWidth)
        }
      })
    }

    // Occasional Lightning Flash
    if (lightningRef.current) {
      const flash = () => {
        const shouldFlash = Math.random() > 0.7
        if (shouldFlash) {
          gsap.to(lightningRef.current, {
            opacity: 0.12,
            duration: 0.08,
            yoyo: true,
            repeat: 3,
            ease: 'sine.inOut',
            onComplete: () => {
              gsap.set(lightningRef.current, { opacity: 0 })
            }
          })
        }
        
        gsap.delayedCall(12 + Math.random() * 18, flash)
      }
      
      gsap.delayedCall(15, flash)
    }

    return () => {
      gsap.killTweensOf(fogRef.current)
      gsap.killTweensOf(lightningRef.current)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Lightning Flash Overlay - Standard opacity without heavy mix-blend */}
      <div 
        ref={lightningRef}
        className="absolute inset-0 bg-white opacity-0"
      />
      
      {/* Fog Layer - Soft gradient without heavy GPU blur filter */}
      <div 
        ref={fogRef}
        className="absolute w-[180%] h-full -left-[40%] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          willChange: 'transform'
        }}
      />
    </div>
  )
}
