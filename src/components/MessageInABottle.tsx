import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

export default function MessageInABottle() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="absolute top-[4000px] left-[1200px] z-20 pointer-events-auto">
        <motion.div
          animate={{
            y: [-5, 5, -5],
            rotate: [-10, 10, -10],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="cursor-pointer group relative"
          onClick={() => setIsOpen(true)}
        >
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 bg-white rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
          
          <svg width="30" height="40" viewBox="0 0 30 40" className="drop-shadow-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            {/* Bottle body */}
            <path d="M 10 20 C 5 25, 5 35, 10 40 L 20 40 C 25 35, 25 25, 20 20 L 18 10 L 12 10 Z" fill="rgba(200, 255, 255, 0.4)" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
            {/* Cork */}
            <rect x="12" y="5" width="6" height="5" fill="#8b5a2b" />
            {/* Rolled parchment inside */}
            <path d="M 12 15 L 18 15 L 17 35 L 13 35 Z" fill="#f4e4bc" opacity="0.9" />
            <path d="M 14 18 L 16 18 M 14 22 L 16 22 M 14 26 L 16 26" stroke="#8b4513" strokeWidth="0.5" />
          </svg>
        </motion.div>
      </div>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto"
            >
              <div 
                className="absolute inset-0 bg-ocean-dark/80 backdrop-blur-sm" 
                onClick={() => setIsOpen(false)}
              />
              
              <motion.div
                initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
                className="relative bg-parchment p-12 max-w-md w-full shadow-2xl rounded-sm border border-bronze text-ocean-dark"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`
                }}
              >
                <button 
                  className="absolute top-4 right-6 text-2xl font-serif text-ocean-mid hover:text-ocean-dark"
                  onClick={() => setIsOpen(false)}
                >
                  &times;
                </button>
                
                <h3 className="text-xl font-serif mb-6 text-center border-b border-bronze/30 pb-4">Developer's Note</h3>
                <p className="font-sans text-lg leading-relaxed mb-4 font-medium italic text-ocean-mid">
                  "If you are reading this, you are a true explorer."
                </p>
                <p className="font-sans text-sm leading-relaxed mb-6">
                  Building this portfolio took countless hours of tweaking GSAP timelines, calculating SVG paths, and drinking way too much coffee.
                  Thank you for taking the time to uncover the secrets of these islands.
                </p>
                <p className="font-serif text-right text-ocean-dark font-bold">
                  — Yaman
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
