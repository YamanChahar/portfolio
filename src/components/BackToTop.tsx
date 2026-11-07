import { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaAnchor } from 'react-icons/fa6'

interface BackToTopProps {
  isVisible: boolean
  onClick: () => void
}

function BackToTop({ isVisible, onClick }: BackToTopProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[75]"
        >
          <div className="relative flex items-center justify-center">
            {/* Tooltip on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-full mr-3 pointer-events-none whitespace-nowrap bg-ocean-dark/90 text-parchment font-serif text-[11px] tracking-wider px-3 py-1 rounded-md border border-treasure-gold/30 shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-md"
                >
                  Return to Port
                </motion.div>
              )}
            </AnimatePresence>

            {/* Circular Glass Button */}
            <button
              onClick={onClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              aria-label="Return to Port"
              className="group relative w-12 h-12 rounded-full flex items-center justify-center bg-ocean-dark/80 backdrop-blur-xl border border-treasure-gold/40 text-treasure-gold shadow-[0_8px_30px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-treasure-gold hover:text-parchment hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] transition-all duration-300 cursor-pointer overflow-hidden active:scale-95"
            >
              {/* Radial gradient background hover highlight */}
              <div className="absolute inset-0 rounded-full bg-treasure-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Outer compass ring */}
              <div className="absolute inset-1 rounded-full border border-dashed border-treasure-gold/20 group-hover:border-treasure-gold/40 transition-colors animate-spin [animation-duration:20s]" />

              {/* Anchor / Helm Icon */}
              <FaAnchor className="text-lg relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default memo(BackToTop)

