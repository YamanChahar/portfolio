import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Weather() {
  const fogRef = useRef<HTMLDivElement>(null)
  const lightningRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Subtle Fog movement
    if (fogRef.current) {
      gsap.to(fogRef.current, {
        x: '-=1000',
        y: '+=200',
        duration: 120,
        repeat: -1,
        ease: 'none',
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % window.innerWidth),
          y: gsap.utils.unitize(y => parseFloat(y) % window.innerHeight)
        }
      })
    }

    // Occasional Lightning
    if (lightningRef.current) {
      const flash = () => {
        const shouldFlash = Math.random() > 0.7 // 30% chance every check
        if (shouldFlash) {
          gsap.to(lightningRef.current, {
            opacity: 0.15 + Math.random() * 0.2,
            duration: 0.1,
            yoyo: true,
            repeat: Math.floor(Math.random() * 3) * 2 + 1, // 1, 3, or 5 repeats
            ease: 'rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })',
            onComplete: () => {
              gsap.set(lightningRef.current, { opacity: 0 })
            }
          })
        }
        
        // Check again in 10-25 seconds
        gsap.delayedCall(10 + Math.random() * 15, flash)
      }
      
      gsap.delayedCall(15, flash) // Start first check after 15s
    }

    return () => {
      gsap.killTweensOf(fogRef.current)
      gsap.killTweensOf(lightningRef.current)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Lightning Flash Overlay */}
      <div 
        ref={lightningRef}
        className="absolute inset-0 bg-white opacity-0 mix-blend-overlay"
      />
      
      {/* Dense Fog Layer */}
      <div 
        ref={fogRef}
        className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 opacity-20 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute w-full h-full opacity-10 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  )
}
