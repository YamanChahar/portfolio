import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Ocean() {
  const wavesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wavesRef.current) return
    const waves = wavesRef.current.children

    gsap.utils.toArray(waves).forEach((wave: any, i) => {
      gsap.to(wave, {
        x: '+=50', // Slower, more subtle movement
        opacity: Math.random() * 0.15 + 0.05,
        duration: 5 + Math.random() * 5, // Slower duration
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.2
      })
    })
  }, [])

  // Generate random static wave positions
  const waveData = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    x: Math.random() * 4000,
    y: Math.random() * 4000,
    scale: 0.5 + Math.random() * 1.5,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Deep Navy Vintage Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-ocean-light)_0%,_var(--color-ocean-dark)_100%)]" />
      
      {/* Animated Subtle Waves */}
      <div ref={wavesRef} className="absolute inset-0 opacity-20 mix-blend-overlay">
        {waveData.map(wave => (
          <svg
            key={wave.id}
            className="absolute"
            style={{ left: wave.x, top: wave.y, transform: `scale(${wave.scale})` }}
            width="60" height="20" viewBox="0 0 60 20"
          >
            <path 
              d="M 0 10 Q 15 5 30 10 T 60 10" 
              fill="none" 
              stroke="#e8dcc4" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              opacity="0.3"
            />
          </svg>
        ))}
      </div>
    </div>
  )
}
