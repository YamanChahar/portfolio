import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ISLAND_COORDINATES, getDockPos } from '../constants/islands'
import { motion } from 'framer-motion'
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TreasureFleet() {
  const fleetCursorRef = useRef<HTMLDivElement>(null)
  const shipRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isReady, setIsReady] = useState(false)

  // Delay mount to ensure the aggressive scroll reset in App.tsx finishes
  // This guarantees ships always spawn at Island 0 on refresh.
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 150)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isReady || !fleetCursorRef.current) return

    // let prevX = getDockPos(0).x
    // let prevY = getDockPos(0).y

    // Dock a specific ship
    const dockShip = (index: number, currentRotation: number) => {
      const ship = shipRefs.current[index]
      if (!ship || ship.dataset.docked === "true") return
      
      ship.dataset.docked = "true"
      const dockPos = getDockPos(index)
      
      // Sail exactly into the dock
      gsap.to(ship, {
        x: dockPos.x,
        y: dockPos.y,
        rotation: currentRotation,
        duration: 1.5,
        ease: "power2.out"
      })

      gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
      
      // Bounce and settle
      gsap.to(ship.querySelector('.ship-hull'), {
        y: -10, rotation: 5, yoyo: true, repeat: 3, duration: 0.3, ease: "sine.inOut"
      })

      // Drop anchor and raise flag
      gsap.to(ship.querySelector('.anchor'), { y: 40, opacity: 1, duration: 1, delay: 0.5, ease: "bounce.out" })
      gsap.to(ship.querySelector('.flag'), { scale: 1, opacity: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.5)" })
      
      // Stop the wake
      gsap.killTweensOf(ship.querySelector('.ship-wake'))
      gsap.to(ship.querySelector('.ship-wake'), { opacity: 0, duration: 1 })
    }

    // Initialize Ship 0 as docked immediately
    dockShip(0, 0)

    // Build the GSAP timeline to exactly match the CameraController
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: () => {
          const curX = gsap.getProperty(fleetCursorRef.current, 'x') as number
          const curY = gsap.getProperty(fleetCursorRef.current, 'y') as number
          const rotation = gsap.getProperty(fleetCursorRef.current, 'rotation') as number
          
          // Move all undocked ships ultra-smoothly without React renders
          shipRefs.current.forEach((ship, index) => {
            if (ship && ship.dataset.docked !== "true") {
              const offsetX = Math.cos(index * 1.5) * 50
              const offsetY = Math.sin(index * 1.5) * 50
              gsap.set(ship, {
                x: curX + offsetX,
                y: curY + offsetY,
                rotation: rotation
              })
            }
          })
        }
      }
    })

    gsap.set(fleetCursorRef.current, { x: ISLAND_COORDINATES[0].x, y: ISLAND_COORDINATES[0].y, rotation: 0 })

    // Create segments that mirror the camera completely AND trace the exact yellow line
    for (let i = 1; i < ISLAND_COORDINATES.length; i++) {
      const prevDock = getDockPos(i - 1)
      const currDock = getDockPos(i)
      
      const prevCenter = ISLAND_COORDINATES[i - 1]
      const currCenter = ISLAND_COORDINATES[i]
      
      const midX = (prevCenter.x + currCenter.x) / 2
      const midY = (prevCenter.y + currCenter.y) / 2
      
      // Start in water, merge onto yellow line in ocean, end in water
      const segmentPath = `M ${prevDock.x} ${prevDock.y} Q ${prevCenter.x} ${currCenter.y}, ${midX} ${midY} T ${currDock.x} ${currDock.y}`
      
      tl.to(fleetCursorRef.current, {
        motionPath: {
          path: segmentPath,
          autoRotate: true,
        },
        duration: 1,
        ease: 'power2.inOut', // Matches camera exactly!
        onComplete: () => {
          // When scrub reaches this island going forward, drop anchor!
          const rotation = gsap.getProperty(fleetCursorRef.current, 'rotation') as number
          dockShip(i, rotation)
        }
      })
    }

    return () => {
      tl.kill()
    }
  }, [isReady])

  if (!isReady) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {/* Invisible Fleet Cursor */}
      <div 
        ref={fleetCursorRef}
        className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full opacity-0"
      />

      {/* The 6 Ships */}
      {[0, 1, 2, 3, 4, 5].map(index => (
        <div 
          key={index}
          ref={(el) => {
  shipRefs.current[index] = el;
}}
          className="absolute top-0 left-0 origin-center pointer-events-none z-[40]"
          style={{ transform: `translate(${getDockPos(0).x}px, ${getDockPos(0).y}px)` }}
        >
          <div className="relative ship-hull origin-center scale-75">
            {/* Animated wake (only when moving) */}
            <motion.div 
              className="ship-wake absolute top-12 -left-6 w-20 h-20 rounded-full border-2 border-t-[#e8dcc4] border-transparent opacity-30 blur-[1px]"
              animate={{ scaleX: [1, 1.5], opacity: [0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
            
            {/* Premium SVG Pirate Ship */}
            <svg width="80" height="100" viewBox="0 0 80 100" className="drop-shadow-2xl opacity-90 origin-center -rotate-90">
              <path d="M 40 10 L 40 80" stroke="var(--color-island-dirt)" strokeWidth="4" />
              <path d="M 20 20 Q 40 40 60 20 L 50 10 L 30 10 Z" fill="var(--color-stone-dark)" />
              <motion.path 
                initial={{ d: "M 20 20 Q 40 50 60 20 Q 40 10 20 20 Z" }}
                d="M 20 20 Q 40 50 60 20 Q 40 10 20 20 Z" 
                fill="var(--color-parchment)" opacity="0.9" 
                animate={{ d: ["M 20 20 Q 40 50 60 20 Q 40 10 20 20 Z", "M 15 20 Q 40 55 65 20 Q 40 5 15 20 Z", "M 20 20 Q 40 50 60 20 Q 40 10 20 20 Z"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path 
                initial={{ d: "M 20 40 Q 40 70 60 40 Q 40 30 20 40 Z" }}
                d="M 20 40 Q 40 70 60 40 Q 40 30 20 40 Z" 
                fill="var(--color-parchment-dark)" opacity="0.9" 
                animate={{ d: ["M 20 40 Q 40 70 60 40 Q 40 30 20 40 Z", "M 15 40 Q 40 75 65 40 Q 40 25 15 40 Z", "M 20 40 Q 40 70 60 40 Q 40 30 20 40 Z"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <path d="M 30 10 L 50 10 L 60 85 Q 40 100 20 85 Z" fill="var(--color-island-dirt)" />
              
              <g className="flag" opacity="0" style={{ transformOrigin: '40px 40px', transform: 'scale(0)' }}>
                <rect x="40" y="20" width="2" height="30" fill="var(--color-bronze)" />
                <path d="M 42 20 L 60 25 L 42 30 Z" fill="var(--color-treasure-gold)" />
              </g>

              <g className="anchor" opacity="0" style={{ transformOrigin: '40px 50px' }}>
                <line x1="40" y1="50" x2="40" y2="70" stroke="var(--color-bronze)" strokeWidth="1.5" />
                <path d="M 30 65 Q 40 75 50 65 L 48 63 Q 40 70 32 63 Z" fill="var(--color-stone-dark)" />
                <circle cx="40" cy="50" r="2" fill="none" stroke="var(--color-stone-dark)" strokeWidth="1" />
              </g>
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}
