import { useEffect, useRef, memo } from 'react'

const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 28

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', handleResize)

    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => {
      const x = Math.random() * width
      const y = Math.random() * height
      return {
        x,
        y,
        radius: 1 + Math.random() * 2.2,
        color: Math.random() > 0.5 ? 'rgba(255, 215, 0, ' : 'rgba(74, 222, 128, ',
        alpha: 0.15 + Math.random() * 0.35,
        targetAlpha: 0.15 + Math.random() * 0.35,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
      }
    })

    let animationFrameId: number
    let lastTime = performance.now()

    const render = (time: number) => {
      // Pause completely if tab is inactive, or canvas is hidden/offscreen during grand arrival intro
      if (
        document.hidden ||
        canvas.offsetParent === null ||
        (canvas.parentElement && getComputedStyle(canvas.parentElement).visibility === 'hidden')
      ) {
        lastTime = time
        animationFrameId = requestAnimationFrame(render)
        return
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      // Fast, lightweight clear of viewport
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX * 60 * dt
        p.y += p.speedY * 60 * dt

        // Wrap around viewport boundaries
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Gentle alpha pulse
        if (Math.abs(p.alpha - p.targetAlpha) < 0.02) {
          p.targetAlpha = 0.15 + Math.random() * 0.35
        } else {
          p.alpha += (p.targetAlpha - p.alpha) * 0.04
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.alpha})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
    />
  )
}

export default memo(Particles)
