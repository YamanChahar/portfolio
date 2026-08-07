import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Compass() {
  const needleRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    // Sway the needle slightly based on mouse movement or just random idle
    gsap.to(needleRef.current, {
      rotation: 15,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      transformOrigin: '50% 50%',
    })
  }, [])

  return (
    <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-lg absolute top-8 right-8">
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-treasure-gold)" strokeWidth="4" />
      <circle cx="50" cy="50" r="38" fill="rgba(0,0,0,0.4)" stroke="var(--color-parchment)" strokeWidth="1" />
      
      {/* Markers */}
      <text x="50" y="20" fill="var(--color-treasure-gold)" fontSize="12" textAnchor="middle" fontWeight="bold">N</text>
      <text x="50" y="88" fill="var(--color-parchment)" fontSize="10" textAnchor="middle">S</text>
      <text x="18" y="54" fill="var(--color-parchment)" fontSize="10" textAnchor="middle">W</text>
      <text x="82" y="54" fill="var(--color-parchment)" fontSize="10" textAnchor="middle">E</text>

      {/* Needle */}
      <g ref={needleRef}>
        <path d="M 45 50 L 50 15 L 55 50 Z" fill="#ff4d4d" />
        <path d="M 45 50 L 50 85 L 55 50 Z" fill="#e0e0e0" />
        <circle cx="50" cy="50" r="4" fill="var(--color-treasure-gold)" />
      </g>
    </svg>
  )
}
