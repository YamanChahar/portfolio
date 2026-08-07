import { motion } from 'framer-motion'
import {
  SiReact,
  SiTailwindcss,
  SiPython,
  SiGit,
} from "react-icons/si";
import { useState } from 'react'

const SKILLS = [
  { name: 'React', icon: SiReact, level: 90 },
  { name: 'Tailwind', icon: SiTailwindcss, level: 95 },
  // { name: 'Node.js', icon: SiNodedotjs, level: 80 },
  { name: 'Python', icon: SiPython, level: 85 },
  // { name: 'FastAPI', icon: SiFastapi, level: 75 },
  // { name: 'Docker', icon: SiDocker, level: 70 },
  { name: 'Git', icon: SiGit, level: 90 },
  // { name: 'MongoDB', icon: SiMongodb, level: 80 },
]

export default function IslandSkills({ x, y }: { x: number, y: number }) {
  

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[550px] h-[550px] pointer-events-auto"
      style={{ left: x, top: y }}
    >
      {/* Intricate Island base SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl opacity-90" viewBox="0 0 550 550">
        <path 
          d="M 275 30 C 400 20, 520 100, 530 275 C 540 430, 420 530, 275 520 C 130 510, 30 430, 20 275 C 10 120, 150 40, 275 30 Z" 
          fill="var(--color-island-base)" 
          stroke="var(--color-island-highlight)" 
          strokeWidth="4" 
        />
        
        {/* Smoldering Coals / Forge */}
        <defs>
          <radialGradient id="forgeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b08d57" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#4a3320" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0b162c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="275" cy="275" r="100" fill="url(#forgeGlow)" className="animate-pulse" />
        <circle cx="275" cy="275" r="70" fill="var(--color-stone-dark)" />
        <circle cx="260" cy="260" r="20" fill="var(--color-bronze)" opacity="0.4" className="animate-pulse" />
        
        {/* Massive Anvil Base (Realistic Bronze/Iron) */}
        <path d="M 230 310 L 320 310 L 340 370 L 210 370 Z" fill="var(--color-ocean-dark)" />
        <path d="M 240 280 L 310 280 L 320 310 L 230 310 Z" fill="var(--color-stone-dark)" />
        <path d="M 220 260 L 330 260 L 330 280 L 220 280 Z" fill="var(--color-stone)" />
        
        {/* Anvil Horn */}
        <path d="M 190 260 Q 220 260 220 280 L 190 280 Z" fill="var(--color-stone-dark)" />
      </svg>

      <h2 className="absolute top-12 text-2xl font-serif text-parchment drop-shadow-md z-10 tracking-[0.2em] uppercase opacity-90">
        Skills
      </h2>

      {/* Center Details */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {hoveredSkill && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-20 flex flex-col items-center top-[180px] bg-ocean-dark/90 px-6 py-4 rounded-sm border border-bronze/50 backdrop-blur-sm shadow-xl"
          >
            <h3 className="text-lg font-serif text-parchment mb-2 tracking-wider">{hoveredSkill}</h3>
            <div className="w-32 h-1 bg-ocean-mid overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${SKILLS.find(s => s.name === hoveredSkill)?.level}%` }}
                className="h-full bg-bronze"
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Orbiting Skills */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {SKILLS.map((skill, i) => {
          const angle = (i / SKILLS.length) * Math.PI * 2
          const radiusX = 180
          const radiusY = 180 // Circular orbit
          const left = Math.cos(angle) * radiusX
          const top = Math.sin(angle) * radiusY

          return (
            <motion.div
              key={skill.name}
              className="absolute flex flex-col items-center justify-center cursor-pointer pointer-events-auto"
              style={{ x: left, y: top }}
              animate={{
                y: [top - 10, top + 10, top - 10],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1, zIndex: 30 }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <div 
                className="w-16 h-16 bg-ocean-dark border border-bronze/30 shadow-lg flex items-center justify-center relative group transition-colors hover:border-bronze"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-bronze" />
                <skill.icon size={24} className="text-parchment opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-sm" />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Striking Hammer Animation (Realistic pacing) */}
      <motion.div 
        className="absolute w-20 h-20 pointer-events-none"
        style={{ left: 280, top: 210, transformOrigin: 'bottom right' }}
        animate={{ rotate: [0, -45, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100">
          {/* Handle */}
          <rect x="70" y="30" width="8" height="70" fill="var(--color-island-dirt)" />
          {/* Head */}
          <rect x="30" y="15" width="50" height="25" fill="var(--color-stone)" />
          <rect x="25" y="18" width="5" height="19" fill="var(--color-stone-dark)" />
        </svg>
      </motion.div>
    </div>
  )
}
