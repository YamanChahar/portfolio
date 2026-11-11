import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

export default function EasterEggs() {
  const [activeSecret, setActiveSecret] = useState<string | null>(null)

  const SecretModal = ({ title, message, author }: any) => (
    createPortal(
      <AnimatePresence>
        {activeSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto"
          >
            <div 
              className="absolute inset-0 bg-ocean-dark/80 backdrop-blur-sm" 
              onClick={() => setActiveSecret(null)}
            />
            
            <motion.div
              initial={{ scale: 0.8, rotate: -2, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotate: 2, opacity: 0 }}
              className="relative bg-parchment p-12 max-w-md w-full shadow-2xl rounded-sm border border-bronze text-ocean-dark"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`
              }}
            >
              <button 
                className="absolute top-4 right-6 text-2xl font-serif text-ocean-mid hover:text-ocean-dark"
                onClick={() => setActiveSecret(null)}
              >
                &times;
              </button>
              
              <h3 className="text-xl font-serif mb-6 text-center border-b border-bronze/30 pb-4">{title}</h3>
              <p className="font-sans text-lg leading-relaxed mb-6 italic text-ocean-mid">
                "{message}"
              </p>
              <p className="font-serif text-right text-ocean-dark font-bold">
                — {author}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )
  )

  return (
    <>
      {/* 1. The Kraken Tentacle (Deep ocean SE) */}
      <div className="absolute top-[3500px] left-[3500px] z-20 pointer-events-auto">
        <div
          className="cursor-pointer group relative anim-map-bob"
          onClick={() => setActiveSecret('kraken')}
        >
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
          
          {/* Tentacle SVG */}
          <svg width="80" height="120" viewBox="0 0 60 100" className="opacity-70 group-hover:opacity-100 drop-shadow-2xl transition-opacity">
            <path d="M 30 100 Q 50 50 10 20 Q 30 0 50 30 Q 30 70 30 100 Z" fill="#2d4a41" stroke="#172b24" strokeWidth="2" />
            <circle cx="25" cy="40" r="3" fill="#8cb3a1" />
            <circle cx="18" cy="30" r="2" fill="#8cb3a1" />
            <circle cx="40" cy="55" r="4" fill="#8cb3a1" />
            <circle cx="35" cy="70" r="3" fill="#8cb3a1" />
          </svg>
        </div>
      </div>

      {/* 2. The Ghost Ship (Foggy NW ocean) */}
      <div className="absolute top-[500px] left-[500px] z-20 pointer-events-auto">
        <div
          className="cursor-pointer group relative opacity-10 hover:opacity-80 transition-opacity duration-1000 anim-map-sway"
          onClick={() => setActiveSecret('ghost')}
        >
          {/* Ghost Ship SVG */}
          <svg width="100" height="100" viewBox="0 0 80 80" className="drop-shadow-[0_0_15px_rgba(150,255,200,0.6)]">
            <path d="M 10 60 L 70 60 L 60 75 L 20 75 Z" fill="#a0cfb5" opacity="0.6" />
            <path d="M 40 10 L 40 60" stroke="#a0cfb5" strokeWidth="2" opacity="0.6" />
            <path d="M 40 15 L 65 35 L 40 50 Z" fill="#a0cfb5" opacity="0.4" />
            <path d="M 40 25 L 20 40 L 40 55 Z" fill="#a0cfb5" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* 3. The Golden Crab (Contact Island Beach) */}
      <div className="absolute top-[550px] left-[2150px] z-30 pointer-events-auto">
        <div
          className="cursor-pointer group relative anim-map-bob"
          onClick={() => setActiveSecret("crab")}
        >
          {/* Tiny Golden Crab SVG */}
          <svg width="24" height="24" viewBox="0 0 20 20" className="drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]">
            <ellipse cx="10" cy="10" rx="6" ry="4" fill="var(--color-treasure-gold)" />
            {/* Claws */}
            <path d="M 6 8 Q 2 4 4 2" fill="none" stroke="var(--color-treasure-gold)" strokeWidth="1.5" />
            <path d="M 14 8 Q 18 4 16 2" fill="none" stroke="var(--color-treasure-gold)" strokeWidth="1.5" />
            {/* Legs */}
            <line x1="5" y1="12" x2="2" y2="15" stroke="var(--color-treasure-gold)" strokeWidth="1" />
            <line x1="15" y1="12" x2="18" y2="15" stroke="var(--color-treasure-gold)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {activeSecret === 'kraken' && (
        <SecretModal 
          title="The Slumbering Leviathan" 
          message="You were brave to touch the tentacle. Most sailors would have fled. The beast slumbers for now, but its dreams shape the ocean currents."
          author="The Last Cartographer"
        />
      )}
      
      {activeSecret === 'ghost' && (
        <SecretModal 
          title="The Flying Dutchman" 
          message="A spectral vessel trapped between realms. Its crew has been searching for the elusive 'perfectly centered div' for eternity."
          author="Captain CSS"
        />
      )}
      
      {activeSecret === 'crab' && (
        <SecretModal 
          title="Mr. Snippers" 
          message="Shiny! You found my secret golden crab. Legend says whoever spots him will have perfectly bug-free code for a week."
          author="Yaman"
        />
      )}
    </>
  )
}
