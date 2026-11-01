import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollModal from '../components/ScrollModal'

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
            initial={{ d: "M 75 40 Q 95 80 90 105 Q 75 115 60 105 Q 55 80 75 40 Z" }}
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
            initial={{ d: "M 75 60 Q 90 90 85 110 Q 75 115 65 110 Q 60 90 75 60 Z" }}
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
            initial={{ d: "M 75 80 Q 82 100 80 110 Q 75 112 70 110 Q 68 100 75 80 Z" }}
            d="M 75 80 Q 82 100 80 110 Q 75 112 70 110 Q 68 100 75 80 Z" 
            fill="#ffeeaa"
            animate={{ 
              d: [
                "M 75 80 Q 82 100 80 110 Q 75 112 70 110 Q 68 100 75 80 Z",
                "M 75 75 Q 80 100 80 110 Q 75 112 70 110 Q 70 100 75 75 Z",
                "M 75 80 Q 82 100 80 110 Q 75 112 70 110 Q 68 100 75 80 Z"
              ] 
            }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
          
          {/* Sparks */}
          {[
            { id: 0, cx: 72, targetCx: 68, targetCy: 35, duration: 1.2, delay: 0.1 },
            { id: 1, cx: 78, targetCx: 84, targetCy: 25, duration: 1.5, delay: 0.4 },
            { id: 2, cx: 74, targetCx: 71, targetCy: 45, duration: 1.1, delay: 0.7 },
            { id: 3, cx: 76, targetCx: 82, targetCy: 30, duration: 1.6, delay: 0.2 },
            { id: 4, cx: 75, targetCx: 73, targetCy: 20, duration: 1.4, delay: 0.9 },
          ].map(spark => (
            <motion.circle
              key={`spark-${spark.id}`}
              r="2"
              fill="#ffcc00"
              initial={{ opacity: 1, cx: spark.cx, cy: 100 }}
              animate={{ 
                opacity: [1, 0],
                cx: spark.targetCx,
                cy: spark.targetCy
              }}
              transition={{
                duration: spark.duration,
                repeat: Infinity,
                delay: spark.delay
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

      <ScrollModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mapLabel="Captain's Logbook"
        title="Expedition Timeline"
        subtitle="A Record of Conquered Seas"
      >
        <div className="relative border-l-2 border-bronze/40 ml-4 md:ml-8 mt-8 space-y-16 max-w-3xl mx-auto">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative pl-10 group"
            >
              {/* Timeline node - Compass Point */}
              <div className="absolute -left-[11px] top-4 w-5 h-5 bg-parchment border-2 border-ocean-dark rounded-full shadow-sm flex items-center justify-center group-hover:border-bronze transition-colors">
                 <div className="w-1.5 h-1.5 bg-ocean-dark rounded-full group-hover:bg-bronze transition-colors" />
              </div>
              <div className="absolute -left-[20px] top-[24px] w-[20px] h-[2px] bg-bronze/40 pointer-events-none" />

              <div className="bg-parchment-dark/10 border border-bronze/20 p-8 shadow-inner relative overflow-hidden transition-all duration-300 group-hover:bg-parchment-dark/20 group-hover:shadow-[inset_0_0_20px_rgba(139,115,85,0.1)]">
                <span className="text-bronze font-sans tracking-[0.2em] text-xs mb-2 block uppercase font-bold">
                  {exp.year}
                </span>
                <h3 className="text-2xl font-serif text-ocean-dark mb-1">{exp.role}</h3>
                <h4 className="text-sm font-sans text-ocean-mid mb-6 italic opacity-90 border-b border-bronze/20 pb-3 inline-block">{exp.company}</h4>
                <ul className="list-none space-y-4">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="relative pl-6 text-ocean-dark font-sans text-[15px] leading-relaxed opacity-90">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-bronze/60 rotate-45" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollModal>
    </div>
  )
}
