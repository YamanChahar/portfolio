import { useMemo } from 'react'

export default function Ocean() {
  // Stable viewport wave positions generated once (optimized from 45 down to 15 viewport-distributed waves)
  const waveData = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${(i % 5) * 20 + ((i * 13) % 10) + 5}%`,
      top: `${Math.floor(i / 5) * 32 + ((i * 17) % 12) + 6}%`,
      scale: 0.6 + ((i * 17) % 10) * 0.08,
      delay: (i * 0.35) % 4,
      duration: 5 + (i % 4) * 1.2
    }))
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Deep Navy Vintage Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-ocean-light)_0%,_var(--color-ocean-dark)_100%)]" />
      
      {/* CSS-animated subtle waves (Zero main-thread JS load) */}
      <div className="absolute inset-0 opacity-25">
        {waveData.map(wave => (
          <svg
            key={wave.id}
            className="absolute anim-wave"
            style={{ 
              left: wave.left, 
              top: wave.top, 
              transform: `scale(${wave.scale})`,
              animationDelay: `${wave.delay}s`,
              animationDuration: `${wave.duration}s`
            }}
            width="60" 
            height="20" 
            viewBox="0 0 60 20"
          >
            <path 
              d="M 0 10 Q 15 5 30 10 T 60 10" 
              fill="none" 
              stroke="#e8dcc4" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              opacity="0.35"
            />
          </svg>
        ))}
      </div>
    </div>
  )
}
