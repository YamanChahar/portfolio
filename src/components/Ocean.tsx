import { useMemo } from 'react'

export default function Ocean() {
  // Stable wave positions generated once
  const waveData = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: (i % 9) * 440 + ((i * 73) % 200),
      y: Math.floor(i / 9) * 800 + ((i * 127) % 350),
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
              left: wave.x, 
              top: wave.y, 
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
