import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import MagneticButton from './MagneticButton'

interface ScrollModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle: string
  mapLabel: string
  children: ReactNode
  className?: string
}

export default function ScrollModal({ isOpen, onClose, title, subtitle, mapLabel, children, className = '' }: ScrollModalProps) {
  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          style={{ perspective: 2000 }}
        >
          {/* Deep oceanic blurred backdrop with vignette */}
          <div
            className="absolute inset-0 backdrop-blur-md cursor-pointer"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(11, 22, 44, 0.88) 0%, rgba(4, 9, 18, 0.98) 100%)'
            }}
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scaleY: 0.05, opacity: 0, scaleX: 0.95 }}
            animate={{ scaleY: 1, opacity: 1, scaleX: 1 }}
            exit={{ scaleY: 0.05, opacity: 0, scaleX: 0.95 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
            className={`relative w-full max-w-5xl bg-parchment rounded-sm shadow-[0_35px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(197,160,89,0.18),inset_0_0_100px_rgba(139,115,85,0.18)] border border-bronze/80 overflow-hidden flex flex-col z-10 origin-center ${className}`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`
            }}
          >
            {/* Watermark Treasure Map */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none mix-blend-multiply" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
               {/* Dotted paths */}
               <path d="M -100 100 Q 200 300 400 150 T 800 400 T 1100 200" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="3" strokeDasharray="10 15" />
               <path d="M 100 800 Q 300 500 500 600 T 900 200" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="3" strokeDasharray="10 15" />
               {/* Small Islands */}
               <path d="M 200 150 Q 250 120 280 180 Q 220 220 200 150 Z" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="2" />
               <path d="M 800 650 Q 850 620 880 680 Q 820 720 800 650 Z" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="2" />
               <path d="M 400 100 Q 430 80 450 120 Q 380 150 400 100 Z" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="2" />
               {/* X Marks the spot */}
               <path d="M 880 180 L 920 220 M 920 180 L 880 220" stroke="var(--color-ocean-dark)" strokeWidth="4" />
               <path d="M 180 680 L 220 720 M 220 680 L 180 720" stroke="var(--color-ocean-dark)" strokeWidth="4" />
               {/* Compass */}
               <g transform="translate(100, 550) scale(0.6)">
                 <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="2" />
                 <polygon points="50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="2" />
               </g>
               {/* Sea Monster Tail / Waves */}
               <path d="M 600 700 Q 620 680 640 700 T 680 700" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="2" />
               <path d="M 610 715 Q 630 695 650 715 T 690 715" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="2" />
            </svg>

            {/* Left/Right scroll rolls (subtle shadow gradients to simulate curled paper) */}
            <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-ocean-dark/10 via-ocean-dark/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-ocean-dark/10 via-ocean-dark/5 to-transparent pointer-events-none" />

            {/* Magnetic Close Button */}
            <div className="absolute top-3 right-3 md:top-5 md:right-7 z-50">
              <MagneticButton strength={0.3} onClick={onClose} aria-label="Close Scroll">
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-parchment-dark/60 hover:bg-ocean-dark text-ocean-dark hover:text-parchment border border-bronze/50 hover:border-treasure-gold transition-all duration-300 shadow-md group cursor-pointer"
                >
                  <span className="text-2xl font-serif leading-none group-hover:rotate-90 transition-transform duration-300">&times;</span>
                </button>
              </MagneticButton>
            </div>

            <div 
              className="relative w-full h-full max-h-[85vh] overflow-y-auto flex flex-col p-8 md:p-14 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-bronze/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-bronze/60 custom-scrollbar"
              data-lenis-prevent="true"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="text-center mb-10 pb-6 border-b border-bronze/30 relative z-10 mx-auto w-full max-w-2xl">
                <span className="text-xs font-sans tracking-[0.3em] uppercase text-bronze font-bold block mb-2">
                  {mapLabel}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-ocean-dark mb-3">
                  {title}
                </h2>
                <p className="text-ocean-mid font-sans text-sm tracking-widest uppercase opacity-80">
                  {subtitle}
                </p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-parchment border border-bronze/30" />
              </div>
              
              <div className="relative z-10 text-ocean-dark w-full max-w-4xl mx-auto">
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
