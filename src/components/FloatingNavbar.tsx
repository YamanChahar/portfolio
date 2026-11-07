import { memo } from 'react'
import { motion } from 'framer-motion'
import { ISLAND_COORDINATES } from '../constants/islands'

interface FloatingNavbarProps {
  activeIndex: number
  onNavigate: (index: number) => void
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI']

function FloatingNavbar({ activeIndex, onNavigate }: FloatingNavbarProps) {
  return (
    <nav 
      aria-label="Expedition Navigation"
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[85] max-w-[95vw]"
    >
      <div className="relative flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full bg-ocean-dark/75 backdrop-blur-xl border border-treasure-gold/30 shadow-[0_12px_36px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)]">
        {/* Ambient subtle glow pulse inside nav */}
        <div 
          className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.2), transparent 70%)'
          }}
        />

        {ISLAND_COORDINATES.map((island, index) => {
          const isActive = activeIndex === index

          return (
            <button
              key={island.id}
              onClick={() => onNavigate(index)}
              className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all duration-300 flex items-center gap-1.5 group select-none cursor-pointer ${
                isActive
                  ? 'text-parchment font-bold'
                  : 'text-text-muted hover:text-parchment'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active Tab Sliding Background with Glow */}
              {isActive && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 rounded-full bg-treasure-gold/20 border border-treasure-gold/60 shadow-[0_0_16px_rgba(197,160,89,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              {/* Waypoint Roman Numeral */}
              <span 
                className={`relative z-10 font-mono text-[10px] sm:text-[11px] transition-colors duration-200 ${
                  isActive ? 'text-treasure-gold' : 'text-treasure-gold/60 group-hover:text-treasure-gold'
                }`}
              >
                {ROMAN_NUMERALS[index]}
              </span>

              {/* Waypoint Label */}
              <span className="relative z-10 hidden sm:inline text-xs">
                {island.name}
              </span>

              {/* Micro-dot indicator for active waypoint */}
              {isActive && (
                <motion.span
                  layoutId="activeDot"
                  className="relative z-10 w-1 h-1 rounded-full bg-treasure-gold shadow-[0_0_6px_#c5a059]"
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default memo(FloatingNavbar)

