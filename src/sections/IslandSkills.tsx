import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollModal from '../components/ScrollModal'
import {
  SiReact,
  SiTailwindcss,
  SiPython,
  SiGit,
  SiNodedotjs,
  SiMongodb,
  SiDocker,
  SiJavascript,
  SiCplusplus,
  SiExpress,
  SiFastapi,
  SiExpo,
  SiGithub,
  SiVercel,
  SiFigma,
  SiSocketdotio,
  SiHtml5,
  SiGithubactions,
} from 'react-icons/si'
import {
  FaCss3Alt,
  FaCode,
  FaServer,
  FaDatabase,
  FaCloud,
  FaCogs,
  FaLayerGroup,
  FaFireAlt,
} from 'react-icons/fa'
import { GiAnvilImpact } from 'react-icons/gi'

// Top 12 Featured Skills orbiting the Forge
const FEATURED_SKILLS = [
  { name: 'React.js', icon: SiReact, category: 'Frontend', level: 92, desc: 'Component architecture, responsive hooks & dynamic SPAs' },
  { name: 'Node.js', icon: SiNodedotjs, category: 'Backend', level: 90, desc: 'Asynchronous event runtimes, RESTful routing & microservices' },
  { name: 'Python', icon: SiPython, category: 'Languages & AI', level: 88, desc: 'Data modeling, predictive algorithms & machine learning' },
  { name: 'FastAPI', icon: SiFastapi, category: 'Backend & ML', level: 86, desc: 'High-throughput async Python APIs & XGBoost model serving' },
  { name: 'MongoDB', icon: SiMongodb, category: 'Databases', level: 88, desc: 'NoSQL document schemas, aggregation pipelines & query tuning' },
  { name: 'Docker', icon: SiDocker, category: 'DevOps', level: 84, desc: 'Containerization, isolated microservices & reproducible builds' },
  { name: 'JavaScript', icon: SiJavascript, category: 'Languages', level: 92, desc: 'Modern ES6+, DOM manipulation & full-stack development' },
  { name: 'C / C++', icon: SiCplusplus, category: 'Systems', level: 85, desc: 'High-performance algorithms, data structures & memory models' },
  { name: 'Express.js', icon: SiExpress, category: 'Backend', level: 88, desc: 'RESTful API endpoints, JWT authentication & secure middleware' },
  { name: 'React Native', icon: SiExpo, category: 'Mobile', level: 86, desc: 'Cross-platform mobile apps with automated Expo EAS CI/CD' },
  { name: 'Git & GitHub', icon: SiGit, category: 'Version Control', level: 92, desc: 'Branching protocols, collaborative PRs & automated Actions' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Frontend', level: 94, desc: 'Utility-first responsive layouts, custom themes & styling' },
]

// Complete Categorized Skills from Resume for the Full Arsenal Modal
const SKILL_CATEGORIES = [
  {
    title: 'Programming Languages',
    icon: FaCode,
    badge: 'Core Syntax',
    skills: [
      { name: 'Python', icon: SiPython, level: 'Advanced', note: 'AI / ML & Backend' },
      { name: 'C / C++', icon: SiCplusplus, level: 'Proficient', note: 'DSA & Systems' },
      { name: 'JavaScript (ES6+)', icon: SiJavascript, level: 'Advanced', note: 'Full-Stack Web' },
      { name: 'HTML5', icon: SiHtml5, level: 'Expert', note: 'Semantic Web' },
      { name: 'CSS3', icon: FaCss3Alt, level: 'Expert', note: 'Modern Responsive' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: FaServer,
    badge: 'Application Runtimes',
    skills: [
      { name: 'React.js', icon: SiReact, level: 'Advanced', note: 'SPA & State Systems' },
      { name: 'React Native', icon: SiExpo, level: 'Proficient', note: 'iOS & Android' },
      { name: 'Node.js', icon: SiNodedotjs, level: 'Advanced', note: 'Asynchronous Server' },
      { name: 'Express.js', icon: SiExpress, level: 'Advanced', note: 'REST APIs & Auth' },
      { name: 'FastAPI', icon: SiFastapi, level: 'Proficient', note: 'High-Speed Python API' },
      { name: 'Socket.IO', icon: SiSocketdotio, level: 'Proficient', note: 'Real-time WebSocket' },
    ],
  },
  {
    title: 'Tools & Databases',
    icon: FaDatabase,
    badge: 'Data & Environment',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, level: 'Advanced', note: 'NoSQL & Aggregations' },
      { name: 'Docker', icon: SiDocker, level: 'Proficient', note: 'Containers & Isolation' },
      { name: 'Git', icon: SiGit, level: 'Advanced', note: 'Distributed Versioning' },
      { name: 'GitHub', icon: SiGithub, level: 'Advanced', note: 'Collaboration & Repos' },
      { name: 'Expo EAS', icon: SiExpo, level: 'Proficient', note: 'Mobile Build Pipelines' },
      { name: 'Figma', icon: SiFigma, level: 'Proficient', note: 'UI/UX Prototyping' },
    ],
  },
  {
    title: 'Cloud & Deployment',
    icon: FaCloud,
    badge: 'Ship & Automate',
    skills: [
      { name: 'Vercel', icon: SiVercel, level: 'Advanced', note: 'Edge Frontend Hosting' },
      { name: 'Render', icon: FaCloud, level: 'Proficient', note: 'Web Services & DBs' },
      { name: 'GitHub Actions', icon: SiGithubactions, level: 'Proficient', note: 'CI/CD Automation' },
    ],
  },
  {
    title: 'Core Fundamentals & Architecture',
    icon: FaCogs,
    badge: 'Engineering Pillars',
    skills: [
      { name: 'Data Structures & Algorithms', icon: FaCode, level: 'Core', note: 'Optimization & LeetCode' },
      { name: 'RESTful API Design', icon: FaServer, level: 'Advanced', note: 'JWT & Security' },
      { name: 'Object-Oriented Programming (OOP)', icon: FaCogs, level: 'Core', note: 'Design Patterns' },
      { name: 'Role-Based Access Control (RBAC)', icon: FaCogs, level: 'Proficient', note: 'Security & Auth' },
      { name: 'UI/UX Design', icon: SiFigma, level: 'Proficient', note: 'Responsive & Accessible' },
    ],
  },
]

export default function IslandSkills({ x, y }: { x: number; y: number }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const hoveredSkillData = FEATURED_SKILLS.find((s) => s.name === hoveredSkill)

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[580px] h-[580px] pointer-events-auto"
      style={{ left: x, top: y }}
    >
      {/* Intricate Island Base SVG (The Cartographer's Smelting Forge) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl opacity-90"
        viewBox="0 0 580 580"
      >
        <path
          d="M 290 30 C 420 20, 550 100, 560 290 C 570 450, 440 550, 290 540 C 140 530, 30 450, 20 290 C 10 130, 160 40, 290 30 Z"
          fill="var(--color-island-base)"
          stroke="var(--color-island-highlight)"
          strokeWidth="4"
        />

        {/* Smoldering Coals / Forge Glow */}
        <defs>
          <radialGradient id="forgeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c5a059" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#4a3320" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0b162c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="290" r="110" fill="url(#forgeGlow)" className="animate-pulse" />
        <circle cx="290" cy="290" r="75" fill="var(--color-stone-dark)" />
        <circle cx="275" cy="275" r="24" fill="var(--color-bronze)" opacity="0.45" className="animate-pulse" />

        {/* Massive Anvil Base */}
        <path d="M 245 325 L 335 325 L 355 385 L 225 385 Z" fill="var(--color-ocean-dark)" />
        <path d="M 255 295 L 325 295 L 335 325 L 245 325 Z" fill="var(--color-stone-dark)" />
        <path d="M 235 275 L 345 275 L 345 295 L 235 295 Z" fill="var(--color-stone)" />

        {/* Anvil Horn */}
        <path d="M 205 275 Q 235 275 235 295 L 205 295 Z" fill="var(--color-stone-dark)" />
      </svg>

      {/* Header Title */}
      <h2 className="absolute top-10 text-2xl font-serif text-parchment drop-shadow-md z-10 tracking-[0.2em] uppercase opacity-90">
        Skills
      </h2>

      {/* Center Tooltip on Hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {hoveredSkillData && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-30 flex flex-col items-center top-[140px] bg-ocean-dark/95 px-5 py-3 rounded-xs border border-bronze/60 backdrop-blur-md shadow-2xl max-w-[270px] text-center pointer-events-none"
            >
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-bronze block">
                {hoveredSkillData.category}
              </span>
              <h3 className="text-base font-serif text-parchment font-bold tracking-wide mt-0.5 mb-1">
                {hoveredSkillData.name}
              </h3>
              <p className="text-[11px] text-parchment/85 font-sans leading-tight mb-2">
                {hoveredSkillData.desc}
              </p>
              <div className="w-full bg-ocean-mid/80 h-1.5 rounded-full overflow-hidden border border-bronze/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${hoveredSkillData.level}%` }}
                  className="h-full bg-gradient-to-r from-bronze to-treasure-gold"
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
              <span className="text-[10px] text-parchment/60 font-sans mt-1">
                Mastery: {hoveredSkillData.level}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Anvil Button (Inspect Full Arsenal) */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-[395px] z-20 px-4 py-1.5 bg-ocean-dark/90 hover:bg-ocean-mid text-parchment font-serif text-[11px] tracking-[0.2em] uppercase rounded-xs border border-bronze/50 shadow-md flex items-center gap-2 cursor-pointer transition-all"
        title="Open Full Technical Skills Dossier"
      >
        <FaLayerGroup className="text-treasure-gold text-xs" />
        <span>Inspect Arsenal</span>
      </motion.button>

      {/* 12 Orbiting Featured Skills */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {FEATURED_SKILLS.map((skill, i) => {
          const angle = (i / FEATURED_SKILLS.length) * Math.PI * 2
          const radiusX = 188
          const radiusY = 188
          const left = Math.cos(angle) * radiusX
          const top = Math.sin(angle) * radiusY

          return (
            <motion.div
              key={skill.name}
              className="absolute flex flex-col items-center justify-center cursor-pointer pointer-events-auto"
              style={{ left: `calc(50% + ${left - 28}px)`, top: `calc(50% + ${top - 28}px)` }}
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 3 + (i % 3) * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.15, zIndex: 40 }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              onClick={() => setIsModalOpen(true)}
            >
              <div className="w-14 h-14 bg-ocean-dark/95 border border-bronze/40 rounded-xs shadow-lg flex flex-col items-center justify-center relative group transition-all hover:border-treasure-gold hover:shadow-[0_0_15px_rgba(197,160,89,0.35)]">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity bg-treasure-gold rounded-xs" />
                <skill.icon
                  size={22}
                  className="text-parchment opacity-85 group-hover:opacity-100 group-hover:text-treasure-gold transition-all drop-shadow-sm"
                />
                <span className="text-[9px] font-sans text-parchment/70 uppercase tracking-tighter mt-1 opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {skill.name.split('.')[0]}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Striking Forge Hammer Animation */}
      <motion.div
        className="absolute w-20 h-20 pointer-events-none z-10"
        style={{ left: 295, top: 225, transformOrigin: 'bottom right' }}
        animate={{ rotate: [0, -42, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 100 100">
          <rect x="70" y="30" width="8" height="70" fill="var(--color-island-dirt)" />
          <rect x="30" y="15" width="50" height="25" fill="var(--color-stone)" />
          <rect x="25" y="18" width="5" height="19" fill="var(--color-stone-dark)" />
        </svg>
      </motion.div>

      {/* Comprehensive Technical Skills ScrollModal */}
      <ScrollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mapLabel="Armory of the Master Mariner"
        title="Technical Arsenal"
        subtitle="Verified Capabilities, Systems & Engineering Competencies"
      >
        <div className="flex flex-col gap-8 font-sans text-ocean-dark">
          {/* Header Banner */}
          <div className="p-4 bg-parchment-dark/25 border border-bronze/40 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ocean-dark text-treasure-gold flex items-center justify-center text-lg shadow-sm">
                <GiAnvilImpact />
              </div>
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-bronze block">
                  Foundry Registry
                </span>
                <p className="font-serif text-sm font-semibold text-ocean-dark">
                  Skills & Frameworks Verified via Production Code & Projects
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-serif text-ocean-mid italic">
              <FaFireAlt className="text-bronze text-sm" />
              <span>Full-Stack & Systems Engineering</span>
            </div>
          </div>

          {/* Categorized Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <div
                  key={cat.title}
                  className="bg-parchment-dark/15 border border-bronze/35 p-5 rounded-xs shadow-xs flex flex-col hover:border-bronze/60 transition-colors"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-bronze/25">
                    <div className="flex items-center gap-2.5">
                      <Icon className="text-bronze text-base" />
                      <h4 className="font-serif text-sm font-bold text-ocean-dark tracking-wide">
                        {cat.title}
                      </h4>
                    </div>
                    <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] px-2 py-0.5 bg-parchment-dark/40 border border-bronze/30 text-ocean-mid rounded-xs">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Skills Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
                    {cat.skills.map((s) => {
                      const SIcon = s.icon
                      return (
                        <div
                          key={s.name}
                          className="flex items-center gap-2.5 p-2 bg-parchment border border-bronze/30 rounded-xs shadow-2xs hover:border-bronze hover:shadow-xs transition-all group"
                        >
                          <div className="w-8 h-8 rounded-xs bg-ocean-dark/90 text-parchment flex items-center justify-center shrink-0 group-hover:bg-ocean-dark group-hover:text-treasure-gold transition-colors">
                            <SIcon className="text-sm" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-serif text-xs font-bold text-ocean-dark truncate group-hover:text-ocean-mid transition-colors">
                              {s.name}
                            </p>
                            <p className="text-[10px] text-ocean-mid font-sans truncate opacity-85">
                              {s.note}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Footer Note */}
          <div className="text-center pt-2 border-t border-bronze/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ocean-mid italic font-serif">
            <p>
              Integrated across production platforms: AICTE Smart Farming, MediStock, & Web Architectures.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2 bg-ocean-dark hover:bg-ocean-mid text-parchment font-serif text-xs tracking-[0.15em] uppercase rounded-xs border border-bronze/50 transition-all cursor-pointer shadow-sm"
            >
              Close Arsenal
            </button>
          </div>
        </div>
      </ScrollModal>
    </div>
  )
}
