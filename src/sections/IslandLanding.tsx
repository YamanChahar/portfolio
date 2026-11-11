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
      style={{ left: x, top: y, contentVisibility: 'auto', containIntrinsicSize: '600px 600px' }}
    >
      {/* Intricate Island base SVG - Vintage Style with Lush Tropical Trees & Leaves */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl opacity-95" viewBox="0 0 600 600">
        <defs>
          {/* Reusable Master Palm Tree - Dark Green Island Type */}
          <g id="island-palm-tree">
            {/* Rich Warm Brown Stem / Trunk with Bark Rings */}
            <path d="M 0 0 Q 5 35 14 70" fill="none" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />
            <path d="M 0 0 Q 5 35 14 70" fill="none" stroke="#78350f" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M 2 16 Q 6 18 9 17" stroke="#451a03" strokeWidth="1.6" />
            <path d="M 4 34 Q 8 36 11 35" stroke="#451a03" strokeWidth="1.6" />
            <path d="M 7 50 Q 11 52 14 51" stroke="#451a03" strokeWidth="1.6" />
            <circle cx="14" cy="70" r="4.5" fill="#5e2b07" />

            {/* Symmetrically Uniform Dark Green Island Fronds Crown */}
            <g transform="translate(0, 0)">
              {/* Lower Tier Outer Branches */}
              <path d="M 0 0 Q -24 -16 -36 -4 Q -22 -2 0 0" fill="#1b4d24" stroke="#0f2b14" strokeWidth="0.8" />
              <path d="M 0 0 Q 24 -16 36 -4 Q 22 -2 0 0" fill="#1b4d24" stroke="#0f2b14" strokeWidth="0.8" />
              <path d="M 0 0 Q -28 -6 -38 14 Q -22 6 0 0" fill="#164320" stroke="#0f2b14" strokeWidth="0.8" />
              <path d="M 0 0 Q 28 -6 38 14 Q 22 6 0 0" fill="#164320" stroke="#0f2b14" strokeWidth="0.8" />
              <path d="M 0 0 Q -18 12 -28 26 Q -14 14 0 0" fill="#1b4d24" stroke="#0f2b14" strokeWidth="0.8" />
              <path d="M 0 0 Q 18 12 28 26 Q 14 14 0 0" fill="#1b4d24" stroke="#0f2b14" strokeWidth="0.8" />
              {/* Upper Tier Central Branches */}
              <path d="M 0 0 Q -15 -24 -22 -32 Q -10 -18 0 0" fill="#20592b" stroke="#0f2b14" strokeWidth="0.8" />
              <path d="M 0 0 Q 15 -24 22 -32 Q 10 -18 0 0" fill="#20592b" stroke="#0f2b14" strokeWidth="0.8" />
              <path d="M 0 0 Q 0 -28 0 -36 Q 4 -18 0 0" fill="#286c35" stroke="#0f2b14" strokeWidth="0.8" />
              {/* Central Heart of Palm */}
              <circle cx="0" cy="0" r="3.8" fill="#164320" />
            </g>
          </g>

          {/* Tropical Leaf Cluster (Foliage & Undergrowth) */}
          <g id="tropical-leaf-cluster">
            <path d="M 0 0 Q -18 -12 -28 0 Q -16 4 0 0" fill="#1b4d24" stroke="#0f2b14" strokeWidth="0.7" />
            <path d="M 0 0 Q 18 -12 28 0 Q 16 4 0 0" fill="#1b4d24" stroke="#0f2b14" strokeWidth="0.7" />
            <path d="M 0 0 Q -12 -18 -16 -28 Q -6 -16 0 0" fill="#20592b" stroke="#0f2b14" strokeWidth="0.7" />
            <path d="M 0 0 Q 12 -18 16 -28 Q 6 -16 0 0" fill="#20592b" stroke="#0f2b14" strokeWidth="0.7" />
            <path d="M 0 0 Q 0 -22 0 -32 Q 4 -18 0 0" fill="#286c35" stroke="#0f2b14" strokeWidth="0.7" />
            {/* Internal leaf vein details */}
            <path d="M 0 0 Q -14 -6 -26 0" fill="none" stroke="#286c35" strokeWidth="0.5" opacity="0.7" />
            <path d="M 0 0 Q 14 -6 26 0" fill="none" stroke="#286c35" strokeWidth="0.5" opacity="0.7" />
            <path d="M 0 0 Q 0 -18 0 -30" fill="none" stroke="#3da84f" strokeWidth="0.5" opacity="0.7" />
          </g>

          {/* Broad Island Monstera Leaf */}
          <g id="broad-island-leaf">
            <path d="M 0 0 C -12 -10, -22 -22, -18 -36 C -10 -38, 0 -32, 0 -42 C 0 -32, 10 -38, 18 -36 C 22 -22, 12 -10, 0 0 Z" fill="#164320" stroke="#0f2b14" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="-40" stroke="#286c35" strokeWidth="0.8" />
            <line x1="0" y1="-12" x2="-10" y2="-18" stroke="#286c35" strokeWidth="0.6" opacity="0.7" />
            <line x1="0" y1="-12" x2="10" y2="-18" stroke="#286c35" strokeWidth="0.6" opacity="0.7" />
            <line x1="0" y1="-22" x2="-12" y2="-28" stroke="#286c35" strokeWidth="0.6" opacity="0.7" />
            <line x1="0" y1="-22" x2="12" y2="-28" stroke="#286c35" strokeWidth="0.6" opacity="0.7" />
          </g>
        </defs>

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
        
        {/* --- STRATEGICALLY PLANTED TROPICAL PALM TREES & UNDERGROWTH (OPTIMIZED) --- */}

        {/* 1. Northwest Forest Grove (Top-Left Island Perimeter) */}
        <g id="nw-grove">
          <use href="#island-palm-tree" x="120" y="95" transform="scale(1.15)" />
          <use href="#tropical-leaf-cluster" x="125" y="165" transform="scale(1.2)" />
        </g>

        {/* 2. Northeast Forest Grove (Top-Right Island Perimeter) */}
        <g id="ne-grove">
          <use href="#island-palm-tree" x="-450" y="85" transform="scale(-1.1, 1)" />
        </g>

        {/* 3. Southwest Coastal Grove (Bottom-Left Island Shoreline) */}
        <g id="sw-grove">
          <use href="#island-palm-tree" x="110" y="325" transform="scale(1.1)" />
        </g>

        {/* 4. Southeast Coastal Grove (Bottom-Right Island Shoreline) */}
        <g id="se-grove">
          <use href="#island-palm-tree" x="-475" y="315" transform="scale(-1.15, 1)" />
          <use href="#tropical-leaf-cluster" x="475" y="400" transform="scale(1.3) rotate(28)" />
        </g>

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
          <path 
            d="M 12 10 Q 40 10 70 18 Q 40 28 12 40 Z" 
            fill="var(--color-ocean-dark)"
            className="anim-flag"
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
