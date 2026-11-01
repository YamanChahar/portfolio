import { useEffect, useRef } from 'react'
import { MAP_SIZE } from '../constants/islands'

const PARTICLE_COUNT = 35

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = MAP_SIZE.width
    canvas.height = MAP_SIZE.height

    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * MAP_SIZE.width,
      y: Math.random() * MAP_SIZE.height,
      radius: 1 + Math.random() * 2.5,
      color: Math.random() > 0.5 ? 'rgba(255, 215, 0, ' : 'rgba(74, 222, 128, ',
      alpha: 0.1 + Math.random() * 0.4,
      targetAlpha: 0.1 + Math.random() * 0.4,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
    }))

    let animationFrameId: number
    let lastTime = performance.now()

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.speedX * 60 * dt
        p.y += p.speedY * 60 * dt

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Gentle alpha pulse
        if (Math.abs(p.alpha - p.targetAlpha) < 0.02) {
          p.targetAlpha = 0.1 + Math.random() * 0.45
        } else {
          p.alpha += (p.targetAlpha - p.alpha) * 0.05
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
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ width: MAP_SIZE.width, height: MAP_SIZE.height }}
    />
  )
}
