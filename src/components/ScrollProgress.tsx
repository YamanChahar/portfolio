import { useEffect, useRef, memo } from 'react'

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let lastP = -1
    let rafId: number | null = null

    const update = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const p = Math.min(1, Math.max(0, window.scrollY / maxScroll))

      // Only update DOM when visible difference exists
      if (Math.abs(p - lastP) >= 0.001) {
        lastP = p
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${p})`
        }
        if (textRef.current) {
          textRef.current.textContent = `EXPEDITION ${Math.round(p * 100)}%`
        }
      }
      rafId = null
    }

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update() // Initial check

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-[3px] z-[90] pointer-events-none overflow-hidden bg-ocean-dark/40"
      aria-hidden="true"
    >
      {/* Background guide track */}
      <div className="absolute inset-0 bg-white/[0.03]" />

      {/* Progress gradient track */}
      <div
        ref={barRef}
        className="h-full relative origin-left"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, #b08d57 0%, #c5a059 45%, #e8dcc4 80%, #38bdf8 100%)',
          willChange: 'transform'
        }}
      >
        {/* Leading glow beacon */}
        <div 
          className="absolute top-0 right-0 h-full w-8 -mr-1"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(232, 220, 196, 0.9))',
            boxShadow: '0 0 12px rgba(197, 160, 89, 0.8), 0 0 20px rgba(56, 189, 248, 0.4)'
          }}
        />
      </div>

      {/* Numerical percentage indicator pill */}
      <div 
        className="hidden md:flex absolute top-2 right-4 text-[10px] tracking-[0.2em] uppercase font-mono text-treasure-gold/80 bg-ocean-dark/80 px-2 py-0.5 rounded-full border border-treasure-gold/25 shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
      >
        <span ref={textRef}>EXPEDITION 0%</span>
      </div>
    </div>
  )
}

export default memo(ScrollProgress)
