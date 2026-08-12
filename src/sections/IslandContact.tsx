import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import { FaFilePdf, FaLinkedin } from 'react-icons/fa'
import { createPortal } from 'react-dom'
export default function IslandContact({ x, y }: { x: number, y: number }) {
  

  const [isOpen, setIsOpen] = useState(false)
  const [isDigging, setIsDigging] = useState(false)
  const chestRef = useRef<HTMLDivElement>(null)

  // Instantly close if the user scrolls at all while open
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => {
        setIsOpen(false)
        setIsDigging(false)
      }
      window.addEventListener('wheel', handleScroll, { passive: true, once: true })
      window.addEventListener('touchmove', handleScroll, { passive: true, once: true })
      return () => {
        window.removeEventListener('wheel', handleScroll)
        window.removeEventListener('touchmove', handleScroll)
      }
    }
  }, [isOpen])

  const handleDig = () => {
    setIsDigging(true)
    setTimeout(() => {
      setIsOpen(true)
      setIsDigging(false)
    }, 2000)
  }

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[600px] h-[600px] pointer-events-auto"
      style={{ left: x, top: y }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl opacity-90" viewBox="0 0 600 600">
        <path 
          d="M 300 50 C 450 40, 550 150, 540 300 C 530 450, 450 550, 300 540 C 150 530, 50 450, 60 300 C 70 150, 150 60, 300 50 Z" 
          fill="var(--color-island-base)" 
          stroke="var(--color-island-highlight)" 
          strokeWidth="4" 
        />
        {/* Cave Entrance (Dark, mysterious) */}
        <defs>
          <radialGradient id="caveGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c5a059" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#c5a059" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Mysterious Gold Glow inside */}
        <circle cx="300" cy="220" r="100" fill="url(#caveGlow)" className="animate-pulse" />
        
        <path d="M 200 200 Q 300 150 400 200 L 420 300 Q 300 250 180 300 Z" fill="var(--color-ocean-dark)" opacity="0.6" />
        <path d="M 220 220 Q 300 180 380 220 L 390 280 Q 300 240 210 280 Z" fill="var(--color-ocean-dark)" opacity="0.8" />
      </svg>

      <h2 className="absolute top-16 text-2xl font-serif text-parchment drop-shadow-md z-10 tracking-[0.2em] uppercase opacity-90">
        Contact
      </h2>

      {!isOpen ? (
        <div className="relative z-10 mt-20 flex flex-col items-center">
          {/* Subtle X mark */}
          <motion.svg 
            width="100" height="100" viewBox="0 0 100 100" className="opacity-80"
            animate={isDigging ? { rotate: [-2, 2, -2], scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: isDigging ? Infinity : 0, duration: 0.3 }}
          >
            <line x1="20" y1="20" x2="80" y2="80" stroke="var(--color-island-dirt)" strokeWidth="6" strokeLinecap="round" />
            <line x1="80" y1="20" x2="20" y2="80" stroke="var(--color-island-dirt)" strokeWidth="6" strokeLinecap="round" />
            {isDigging && (
              <motion.circle 
                cx="50" cy="50" r="40" 
                fill="none" stroke="var(--color-bronze)" strokeWidth="2" strokeDasharray="10 10"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear" }}
              />
            )}
          </motion.svg>

          {!isDigging && (
            <motion.button
              onClick={handleDig}
              className="mt-8 bg-transparent text-parchment px-8 py-3 rounded-sm font-sans tracking-widest text-sm border border-bronze/50 transition-all hover:bg-bronze/10 uppercase"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Excavate
            </motion.button>
          )}
        </div>
      ) : (
        <div className="relative z-10 mt-20 w-full h-full flex flex-col items-center">
          {/* Realistic Brass Chest */}
          <motion.div
            ref={chestRef}
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 1.5 }}
            className="relative cursor-pointer"
          >
            <svg width="200" height="160" viewBox="0 0 200 160" className="drop-shadow-2xl opacity-90">
              {/* Chest Back Lid (Open) */}
              <path d="M 30 80 Q 100 10 170 80 L 170 100 L 30 100 Z" fill="var(--color-stone-dark)" />
              {/* Chest Base */}
              <path d="M 20 90 L 180 90 L 170 140 L 30 140 Z" fill="var(--color-island-dirt)" stroke="var(--color-bronze)" strokeWidth="2" />
              <rect x="40" y="95" width="120" height="40" fill="none" stroke="var(--color-stone-dark)" strokeWidth="2" opacity="0.5" />
              <rect x="95" y="85" width="10" height="25" fill="var(--color-bronze)" rx="1" />
            </svg>

            {/* Subtle Emitting Particles (Dust/Glow) */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                className="absolute w-1 h-1 bg-bronze rounded-full"
                style={{ top: 70, left: 100 }}
                animate={{
                  x: (Math.random() - 0.5) * 200,
                  y: -Math.random() * 200 - 20,
                  opacity: [0, 0.6, 0],
                  scale: [1, 2]
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      )}

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center p-8"
            >
              <div className="relative w-full h-full max-w-4xl max-h-[800px] pointer-events-auto">
                {[
                  { icon: SiGithub, link: 'https://github.com/YamanChahar', name: 'GitHub' },
                  { icon: FaLinkedin, link: 'https://www.linkedin.com/in/yaman-chahar-ab4514320/', name: 'LinkedIn' },
                 { icon: FaFilePdf, link: '/Resume.pdf', name: 'Resume' }
                ].map((social, i, arr) => {
                  const angle = (i / arr.length) * Math.PI * 2 - Math.PI / 2 // Start at top
                  const radius = 110 // Distance from center
                  const destX = Math.cos(angle) * radius
                  const destY = Math.sin(angle) * radius

                  return (
                    <motion.a
                      key={i}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                      animate={{ scale: 1, opacity: 1, x: destX, y: destY }}
                      transition={{ type: 'spring', delay: 1.5 + i * 0.15, bounce: 0.3 }}
                      whileHover={{ scale: 1.1, zIndex: 50 }}
                      className="absolute left-[50%] top-[50%] -ml-8 -mt-8 flex flex-col items-center gap-3 w-16"
                    >
                      <div className="w-16 h-16 bg-parchment border border-bronze/50 rounded-sm flex items-center justify-center shadow-lg transition-colors hover:bg-parchment-dark">
                        <social.icon size={28} className="text-ocean-dark opacity-80" />
                      </div>
                      <span className="text-parchment font-sans tracking-[0.2em] uppercase text-xs opacity-90 drop-shadow-md whitespace-nowrap absolute top-full mt-3">
                        {social.name}
                      </span>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
