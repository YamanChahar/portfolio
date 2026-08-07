import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

const EXPERIENCE = [
  {
    year: '2025',
    role: 'Frontend Developer',
    company: 'Annual Cultural Fest Website',
    bullets: [
      'Collaborated with the frontend team to develop responsive, mobile-friendly web pages from UI/UX designs.',
      'Translated Figma wireframes and high-fidelity prototypes into user-centric interfaces using modern frontend development practices.',
      'Contributed to improving website usability, responsiveness, and overall user experience through design implementation and frontend optimization.'
    ]
  },
]

export default function IslandExperience({ x, y }: { x: number, y: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[600px] h-[600px] pointer-events-auto"
      style={{ left: x, top: y }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl opacity-90" viewBox="0 0 600 600">
        <path
          d="M 200 50 C 400 30, 580 150, 550 300 C 520 480, 400 550, 200 520 C 50 490, 20 380, 40 200 C 60 50, 100 60, 200 50 Z"
          fill="var(--color-island-base)"
          stroke="var(--color-island-highlight)"
          strokeWidth="4"
        />

        {/* Wooden Docks */}
        <path d="M 250 450 L 280 450 L 280 550 L 250 550 Z" fill="var(--color-island-dirt)" />
        <path d="M 320 450 L 350 450 L 350 550 L 320 550 Z" fill="var(--color-island-dirt)" />
        <path d="M 230 480 L 370 480 L 370 500 L 230 500 Z" fill="var(--color-ocean-dark)" opacity="0.6" />
        <path d="M 230 520 L 370 520 L 370 540 L 230 540 Z" fill="var(--color-ocean-dark)" opacity="0.6" />

        {/* Crates on dock */}
        <rect x="250" y="440" width="30" height="30" fill="var(--color-stone-dark)" />
        <rect x="290" y="450" width="40" height="20" fill="var(--color-stone)" />

        {/* Seashells and Starfish */}
        <g transform="translate(180, 420) scale(0.6) rotate(15)">
          <path d="M 10 0 L 15 15 L 30 15 L 20 25 L 25 40 L 10 30 L -5 40 L 0 25 L -10 15 L 5 15 Z" fill="#ff7e67" />
        </g>
        <g transform="translate(420, 280) scale(0.5) rotate(-20)">
          <path d="M 10 0 L 15 15 L 30 15 L 20 25 L 25 40 L 10 30 L -5 40 L 0 25 L -10 15 L 5 15 Z" fill="#ff7e67" />
        </g>
        <g transform="translate(200, 200) scale(0.8)">
          <path d="M 0 10 C 10 0, 20 10, 15 20 C 5 25, -5 20, 0 10 Z" fill="#fff5e1" stroke="#e0cda7" strokeWidth="2" />
          <path d="M 5 12 L 10 18" stroke="#e0cda7" strokeWidth="2" />
          <path d="M 2 14 L 7 20" stroke="#e0cda7" strokeWidth="2" />
        </g>
        <g transform="translate(400, 380) scale(0.8) rotate(45)">
          <path d="M 0 10 C 10 0, 20 10, 15 20 C 5 25, -5 20, 0 10 Z" fill="#ffdfeb" stroke="#e0a7b8" strokeWidth="2" />
          <path d="M 5 12 L 10 18" stroke="#e0a7b8" strokeWidth="2" />
          <path d="M 2 14 L 7 20" stroke="#e0a7b8" strokeWidth="2" />
        </g>
      </svg>

      <h2 className="absolute top-16 text-2xl font-serif text-parchment drop-shadow-md z-10 tracking-[0.2em] uppercase opacity-90">
        Experience
      </h2>

      {/* Bonfire */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <svg width="300" height="300" viewBox="0 0 150 150" className="drop-shadow-lg">
          {/* Stones */}
          <circle cx="55" cy="100" r="8" fill="var(--color-stone-dark)" opacity="0.9" />
          <circle cx="95" cy="100" r="8" fill="var(--color-stone-dark)" opacity="0.9" />
          <circle cx="75" cy="105" r="9" fill="var(--color-stone-dark)" opacity="0.9" />
          <circle cx="65" cy="95" r="7" fill="var(--color-stone)" opacity="0.8" />
          <circle cx="85" cy="95" r="7" fill="var(--color-stone)" opacity="0.8" />
          <circle cx="75" cy="100" r="7" fill="var(--color-stone)" opacity="0.8" />
          
          {/* Logs */}
          <path d="M 55 110 L 95 110" stroke="#4a3728" strokeWidth="8" strokeLinecap="round" transform="rotate(20 75 110)" />
          <path d="M 55 110 L 95 110" stroke="#3d2d21" strokeWidth="8" strokeLinecap="round" transform="rotate(-20 75 110)" />
          
          {/* Outer Flames */}
          <motion.path 
            d="M 75 40 Q 95 80 90 105 Q 75 115 60 105 Q 55 80 75 40 Z" 
            fill="#ff5500"
            animate={{ 
              d: [
                "M 75 40 Q 95 80 90 105 Q 75 115 60 105 Q 55 80 75 40 Z",
                "M 75 30 Q 105 80 90 105 Q 75 115 60 105 Q 45 80 75 30 Z",
                "M 75 40 Q 95 80 90 105 Q 75 115 60 105 Q 55 80 75 40 Z"
              ] 
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Mid Flames */}
          <motion.path 
            d="M 75 60 Q 90 90 85 110 Q 75 115 65 110 Q 60 90 75 60 Z" 
            fill="#ffaa00"
            animate={{ 
              d: [
                "M 75 60 Q 90 90 85 110 Q 75 115 65 110 Q 60 90 75 60 Z",
                "M 75 55 Q 85 90 85 110 Q 75 115 65 110 Q 65 90 75 55 Z",
                "M 75 60 Q 90 90 85 110 Q 75 115 65 110 Q 60 90 75 60 Z"
              ] 
            }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          {/* Inner Flames */}
          <motion.path 
            d="M 75 80 Q 82 100 80 110 Q 75 112 70 110 Q 68 100 75 80 Z" 
            fill="#ffeeaa"
            animate={{ 
              d: [
                "M 75 80 Q 82 100 80 110 Q 75 112 70 110 Q 68 100 75 80 Z",
                "M 75 75 Q 80 100 80 110 Q 75 112 70 110 Q 70 100 75 75 Z",
                "M 75 80 Q 82 100 80 110 Q 75 112 70 110 Q 68 100 75 80 Z"
              ] 
            }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
          
          {/* Sparks */}
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={`spark-${i}`}
              r="2"
              fill="#ffcc00"
              initial={{ opacity: 1, cx: 75 + (Math.random() * 20 - 10), cy: 100 }}
              animate={{ 
                opacity: [1, 0],
                cx: 75 + (Math.random() * 40 - 20),
                cy: 20 + Math.random() * 40
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating Ship */}
      <motion.div
        className="absolute bottom-[-10px] cursor-pointer pointer-events-auto"
        animate={{ y: [0, -5, 0], rotate: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <svg width="200" height="180" viewBox="0 0 200 180" className="drop-shadow-2xl">
          {/* Mast */}
          <path d="M 100 20 L 100 120" stroke="var(--color-ocean-dark)" strokeWidth="4" />
          {/* Main Sail (Weathered Canvas) */}
          <path d="M 100 30 Q 150 50 160 30 Q 130 90 100 90 Z" fill="var(--color-parchment-dark)" opacity="0.9" />
          <path d="M 100 40 Q 50 60 40 40 Q 70 80 100 80 Z" fill="var(--color-parchment-dark)" opacity="0.9" />
          {/* Hull */}
          <path d="M 20 100 L 180 100 L 150 150 L 50 150 Z" fill="var(--color-island-dirt)" />
          <path d="M 20 120 L 180 120" stroke="var(--color-ocean-dark)" strokeWidth="2" opacity="0.5" />
          <path d="M 30 140 L 170 140" stroke="var(--color-ocean-dark)" strokeWidth="2" opacity="0.5" />
          {/* Lanterns */}
          <circle cx="70" cy="120" r="3" fill="var(--color-bronze)" className="animate-pulse" />
          <circle cx="100" cy="120" r="3" fill="var(--color-bronze)" className="animate-pulse" />
          <circle cx="130" cy="120" r="3" fill="var(--color-bronze)" className="animate-pulse" />
        </svg>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
              style={{ perspective: 2000 }}
            >
              <div
                className="absolute inset-0 bg-ocean-dark/90 backdrop-blur-md"
                onClick={() => setIsOpen(false)}
              />

              {/* Journal Book (Weathered Leather Cover styling outside, Parchment inside) */}
              <motion.div
                initial={{ rotateY: -10, y: 50, opacity: 0 }}
                animate={{ rotateY: 0, y: 0, opacity: 1 }}
                exit={{ rotateY: 10, y: 50, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 1 }}
                className="relative w-full max-w-4xl h-[80vh] flex shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-bronze/30"
              >
                <button
                  className="absolute -top-12 right-0 text-3xl font-serif text-ocean-light hover:text-parchment z-20 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  &times;
                </button>

                {/* Left Page (Decoration/Summary) */}
                <div className="w-1/2 bg-parchment h-full rounded-l-sm border-r border-ocean-dark/10 shadow-[inset_-20px_0_30px_rgba(0,0,0,0.05)] p-10 flex flex-col items-center justify-center relative overflow-hidden"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")' }}>

                  {/* Compass Rose Decoration */}
                  <svg className="w-64 h-64 opacity-10 absolute mix-blend-multiply" viewBox="0 0 100 100">
                    <polygon points="50,10 60,40 90,50 60,60 50,90 40,60 10,50 40,40" fill="var(--color-ocean-dark)" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="1" />
                  </svg>

                  <h1 className="text-5xl font-serif text-ocean-dark mb-4 z-10 text-center leading-tight">Ship's<br />Manifest</h1>
                  <p className="text-ocean-mid font-sans text-sm tracking-widest text-center z-10 uppercase opacity-80">A record of conquered seas.</p>

                  <div className="mt-12 w-24 h-[1px] bg-bronze/50 z-10" />
                </div>

                {/* Book Spine Overlay */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-full bg-gradient-to-r from-[rgba(0,0,0,0.2)] via-[rgba(0,0,0,0.05)] to-[rgba(0,0,0,0.2)] z-10 pointer-events-none" />

                {/* Right Page (Timeline) */}
                <div className="w-1/2 bg-parchment h-full rounded-r-sm border-l border-ocean-dark/10 shadow-[inset_20px_0_30px_rgba(0,0,0,0.05)] p-10 overflow-y-auto" data-lenis-prevent="true"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")' }}>

                  <div className="relative border-l border-bronze/40 ml-4 mt-4 space-y-12">
                    {EXPERIENCE.map((exp, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 0.8 }}
                        className="relative pl-8"
                      >
                        {/* Timeline node */}
                        <div className="absolute -left-[5px] top-1 w-2 h-2 bg-ocean-dark rounded-full shadow-sm" />

                        <span className="text-bronze font-sans tracking-widest text-xs mb-1 block uppercase">
                          {exp.year}
                        </span>
                        <h3 className="text-xl font-serif text-ocean-dark mb-1">{exp.role}</h3>
                        <h4 className="text-sm font-sans text-ocean-light mb-4 italic font-semibold">{exp.company}</h4>
                        <ul className="list-disc pl-4 space-y-2">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-ocean-mid font-sans text-sm leading-relaxed opacity-90">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
