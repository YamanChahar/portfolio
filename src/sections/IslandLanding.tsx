import { motion } from 'framer-motion'
import Compass from '../components/Compass'
import MagneticButton from '../components/MagneticButton'
import { useLenis } from 'lenis/react'

export default function IslandLanding({ x, y }: { x: number, y: number }) {
  const lenis = useLenis()

  const handleBeginJourney = () => {
    if (lenis) {
      lenis.scrollTo(window.innerHeight, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[600px] h-[600px] pointer-events-auto"
      style={{ left: x, top: y }}
    >
      {/* Intricate Island base SVG - Vintage Style */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl opacity-90" viewBox="0 0 600 600">
        {/* Base shadow/depth */}
        <path 
          d="M 300 60 C 450 40, 580 160, 550 310 C 520 460, 420 590, 300 560 C 150 530, 50 460, 30 310 C 10 160, 150 80, 300 60 Z" 
          fill="var(--color-ocean-dark)" 
        />
        {/* Main island body */}
        <path 
          d="M 300 50 C 450 30, 580 150, 550 300 C 520 450, 420 580, 300 550 C 150 520, 50 450, 30 300 C 10 150, 150 70, 300 50 Z" 
          fill="var(--color-island-base)" 
          stroke="var(--color-island-highlight)" 
          strokeWidth="4" 
        />
        {/* Topography lines */}
        <path d="M 250 150 Q 300 120 350 150 T 400 200" fill="none" stroke="var(--color-island-highlight)" strokeWidth="2" opacity="0.6" />
        <path d="M 200 250 Q 300 220 400 250 T 450 350" fill="none" stroke="var(--color-island-highlight)" strokeWidth="2" opacity="0.6" />
        <path d="M 250 350 Q 300 320 350 350" fill="none" stroke="var(--color-island-highlight)" strokeWidth="2" opacity="0.6" />
        
        {/* Campfire (Realistic Torchlight) */}
        <g transform="translate(180, 380)">
          {/* Subtle Glow */}
          <circle cx="10" cy="10" r="30" fill="#c5a059" opacity="0.1" className="animate-pulse" />
          <path d="M 0 10 L 20 0 L 10 20 Z" fill="var(--color-island-dirt)" />
          <path d="M 20 10 L 0 0 L 10 20 Z" fill="#362312" />
          <path d="M 5 10 Q 10 -10 15 10 Z" fill="#b08d57" opacity="0.8" className="animate-pulse" />
        </g>

        {/* Tent (Vintage Canvas) */}
        <g transform="translate(380, 200)">
          <path d="M 0 50 L 30 0 L 60 50 Z" fill="var(--color-parchment-dark)" stroke="var(--color-bronze)" strokeWidth="1.5" />
          <path d="M 30 0 L 30 50" stroke="var(--color-bronze)" strokeWidth="1.5" />
          <path d="M 20 50 L 30 20 L 40 50 Z" fill="var(--color-ocean-dark)" opacity="0.8" />
        </g>

        {/* Footprints in the sand */}
        <g fill="var(--color-ocean-dark)" opacity="0.3">
          <ellipse cx="250" cy="380" rx="2" ry="4" transform="rotate(30 250 380)" />
          <ellipse cx="260" cy="360" rx="2" ry="4" transform="rotate(45 260 360)" />
          <ellipse cx="280" cy="340" rx="2" ry="4" transform="rotate(60 280 340)" />
          <ellipse cx="310" cy="330" rx="2" ry="4" transform="rotate(75 310 330)" />
          <ellipse cx="340" cy="335" rx="2" ry="4" transform="rotate(100 340 335)" />
        </g>
      </svg>

      <Compass />

      {/* Flag */}
      <div className="absolute top-20 left-40">
        <svg width="80" height="150" viewBox="0 0 80 150" className="drop-shadow-xl opacity-90">
          <line x1="10" y1="150" x2="10" y2="10" stroke="var(--color-island-dirt)" strokeWidth="4" strokeLinecap="round" />
          <motion.path 
            initial={{ d: "M 12 10 Q 40 0 70 20 Q 40 30 12 40 Z" }}
            d="M 12 10 Q 40 0 70 20 Q 40 30 12 40 Z" 
            fill="var(--color-ocean-dark)"
            animate={{ 
              d: [
                "M 12 10 Q 40 0 70 20 Q 40 30 12 40 Z",
                "M 12 10 Q 40 25 70 5 Q 40 15 12 40 Z",
                "M 12 10 Q 40 0 70 20 Q 40 30 12 40 Z"
              ] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center mt-20 gap-4 pointer-events-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="text-lg text-treasure-gold tracking-[0.3em] uppercase font-bold font-sans"
        >
          Frontend Developer
        </motion.h2>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="text-7xl font-bold text-parchment drop-shadow-2xl font-serif"
        >
          Yaman Chahar
        </motion.h1>
        
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="text-xl text-parchment-dark font-sans italic opacity-80"
        >
          Software Engineer
        </motion.h3>

        <MagneticButton strength={0.3} onClick={handleBeginJourney}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 px-10 py-4 bg-ocean-dark/60 text-parchment font-serif text-lg tracking-widest uppercase transition-all flex items-center gap-4 group border border-treasure-gold/50 hover:border-treasure-gold hover:shadow-[0_0_30px_rgba(197,160,89,0.35)] backdrop-blur-md rounded-full cursor-pointer relative overflow-hidden"
          >
            {/* Shimmer gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-treasure-gold/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            <span className="relative z-10 font-medium">Begin Journey</span>
            <motion.svg 
              className="w-5 h-5 group-hover:translate-y-1 transition-transform text-treasure-gold relative z-10" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
        </MagneticButton>
      </div>
    </div>
  )
}
