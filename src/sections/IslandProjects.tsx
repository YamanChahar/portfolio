import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import { 
  FaExternalLinkAlt, 
  FaSearch, 
  FaHeart, 
  FaDesktop, 
  FaLayerGroup, 
  FaLock, 
  FaBell, 
  FaDatabase, 
  FaCheckCircle, 
  FaCode,
  FaServer,
  FaRocket
} from 'react-icons/fa'
import { 
  GiSandsOfTime, 
  GiChart, 
  GiShield, 
  GiScrollQuill, 
  GiFilmSpool, 
  GiPill, 
  GiChest
} from 'react-icons/gi'
import ScrollModal from '../components/ScrollModal'
import TiltCard from '../components/TiltCard'
import MagneticButton from '../components/MagneticButton'

interface ProjectData {
  id: number
  name: string
  tagline: string
  relicNumber: string
  type: string
  category: string
  badgeIcon: any
  status: string
  techList: string[]
  shortSnippet: string
  cardPills: string[]
  mission: string
  architecture: {
    frontend: string[]
    backend: string[]
    storageAndDeployment: string[]
  }
  keyFeatures: {
    title: string
    description: string
    icon: any
  }[]
  highlights: string[]
  liveDemo: string
  sourceCode: string
}

const PROJECTS: ProjectData[] = [
  {
    id: 1,
    name: 'Movie Explorer',
    tagline: 'Dynamic Cinematic Discovery & Curation Engine',
    relicNumber: 'RELIC I',
    type: 'Frontend Web Application',
    category: 'API Integration • Reactive State',
    badgeIcon: GiFilmSpool,
    status: 'Active Voyage (Production Live)',
    techList: ['React.js', 'TMDB API', 'Context API', 'LocalStorage', 'HTML5 & CSS3'],
    shortSnippet: 'A fast, responsive movie discovery platform with live TMDB data synchronization, instant debounced search, and persistent client-side favorites.',
    cardPills: ['TMDB Live Sync', 'Watchlist Vault', 'Adaptive UI'],
    mission: 'Engineered to solve the friction of finding and saving film recommendations. Fuses real-time API streaming with resilient local state management, allowing movie enthusiasts to explore trending titles, search global databases, and curate a personalized cinema watchlist without losing state on refresh.',
    architecture: {
      frontend: [
        'React 19 Functional Components & Custom Hooks',
        'Context API for centralized Favorites state management',
        'Responsive Flexbox & CSS Grid with fluid transitions'
      ],
      backend: [
        'The Movie Database (TMDB) RESTful API integration',
        'Asynchronous Fetch pipeline with query error handling',
        'Debounced query parameters to minimize extraneous network calls'
      ],
      storageAndDeployment: [
        'HTML5 LocalStorage for persistent client-side caching',
        'Vite build engine for lightning-fast bundling',
        'Vercel Global Edge Network deployment'
      ]
    },
    keyFeatures: [
      {
        title: 'Real-Time TMDB Streaming',
        description: 'Dynamically fetches trending movies, genre classifications, user ratings, and backdrop metadata directly from TMDB.',
        icon: FaSearch
      },
      {
        title: 'Persistent Favorites Vault',
        description: 'Allows users to bookmark movies to a dedicated watchlist preserved across sessions using React Context and LocalStorage.',
        icon: FaHeart
      },
      {
        title: 'Instant Search & Filtering',
        description: 'Interactive query engine that delivers instant visual feedback with poster previews and seamless empty-state fallbacks.',
        icon: FaLayerGroup
      },
      {
        title: 'Mobile-First Responsive Layout',
        description: 'Engineered with fluid breakpoints, ensuring a native-like experience across mobile handhelds, tablets, and wide monitors.',
        icon: FaDesktop
      }
    ],
    highlights: [
      'Zero-latency UI updates using React Hooks for component reactivity',
      'Resilient API consumption handling rate limits and network errors gracefully',
      'Intuitive card interactions with smooth hover elevation and responsive layout rhythm',
      'Persistent storage layer that keeps the user watchlist intact between browser sessions'
    ],
    liveDemo: 'https://movie-app-topaz-two.vercel.app/',
    sourceCode: 'https://github.com/YamanChahar/Movie-App.git',
  },
  {
    id: 2,
    name: 'MediStock',
    tagline: 'Enterprise-Grade Pharmacy & FEFO Inventory Platform',
    relicNumber: 'RELIC II',
    type: 'Full-Stack Enterprise System',
    category: 'Logistics • Real-Time WebSockets',
    badgeIcon: GiPill,
    status: 'Active Voyage (Production Live)',
    techList: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'],
    shortSnippet: 'Full-stack pharmaceutical management platform featuring automated FEFO batch allocation, live WebSocket stock alerts, and secure role-based control.',
    cardPills: ['FEFO Batch Logic', 'Socket.io Alerts', 'JWT Security'],
    mission: 'Architected to eliminate pharmaceutical waste, stock shortages, and manual bookkeeping errors. Centralizes medicine cataloging, automated expiry tracking, role-based staff authorization, and real-time inventory transactions into a dependable, high-integrity dashboard.',
    architecture: {
      frontend: [
        'React.js Single Page Application with modular component design',
        'Tailwind CSS design system with custom utility layouts',
        'Socket.io Client for bi-directional live push notifications'
      ],
      backend: [
        'Node.js & Express RESTful API micro-architecture',
        'Automated FEFO (First-Expiry, First-Out) batch allocation algorithm',
        'Socket.io event server broadcasting instant inventory updates'
      ],
      storageAndDeployment: [
        'MongoDB & Mongoose schema design with indexed relational queries',
        'Cryptographic JSON Web Tokens (JWT) & bcrypt session hashing',
        'Automated cloud deployment with continuous integration'
      ]
    },
    keyFeatures: [
      {
        title: 'FEFO Batch Allocation',
        description: 'Intelligent First-Expiry, First-Out routing algorithm that prioritizes dispensing medicines closest to their expiration date, cutting inventory waste.',
        icon: GiSandsOfTime
      },
      {
        title: 'Live WebSocket Stock Alerts',
        description: 'Real-time push notifications powered by Socket.io that proactively alert pharmacists whenever stock levels dip below safety thresholds.',
        icon: FaBell
      },
      {
        title: 'Role-Based Access Control (RBAC)',
        description: 'Strict authorization tiers separating Admin controls (supplier orders, staff provisioning) from Pharmacy Staff dispensing duties.',
        icon: FaLock
      },
      {
        title: 'Transaction Ledger & Dispensing',
        description: 'Comprehensive audit trail logging every prescription fulfillment, stock movement, batch arrival, and supplier interaction.',
        icon: FaDatabase
      },
      {
        title: 'Analytics & Consumption Trends',
        description: 'Visual analytics charting drug turnover rates, seasonal demand patterns, and automatic replenishment alerts.',
        icon: GiChart
      },
      {
        title: 'Supplier & Compliance Auditing',
        description: 'Traceability tools tracking pharmaceutical batches from wholesale delivery through customer dispensing for strict regulatory compliance.',
        icon: GiShield
      }
    ],
    highlights: [
      'Automated FEFO logic drastically reduces medicine spoilage and prevents accidental dispensing of expired products',
      'Socket.io bi-directional messaging delivers instant stock alerts across all active pharmacy terminals simultaneously',
      'Hardened authentication layer featuring encrypted password storage, signed JWT tokens, and protected route guards',
      'Highly optimized MongoDB relational schemas handling thousands of medicines, batches, orders, and historical logs'
    ],
    liveDemo: 'https://medi-stock-sooty.vercel.app/',
    sourceCode: 'https://github.com/YamanChahar/MediStock',
  },
]

export default function IslandProjects({ x, y }: { x: number, y: number }) {
  const [activeProject, setActiveProject] = useState<number | null>(null)

  const fireflies = useMemo(() => [
    { left: 240, top: 180, duration: 4.2 },
    { left: 480, top: 220, duration: 5.1 },
    { left: 330, top: 290, duration: 3.8 },
    { left: 520, top: 160, duration: 4.7 },
    { left: 290, top: 240, duration: 5.4 },
    { left: 440, top: 310, duration: 3.9 },
  ], [])

  const selectedProject = activeProject ? PROJECTS.find(p => p.id === activeProject) : null

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[800px] h-[800px] pointer-events-auto"
      style={{ left: x, top: y, contentVisibility: 'auto', containIntrinsicSize: '800px 800px' }}
    >
      {/* Island base SVG - Vintage Ruins Style */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl opacity-90" viewBox="0 0 800 800">
        <path
          d="M 400 50 C 600 30, 750 150, 780 400 C 800 650, 650 780, 400 750 C 150 730, 20 600, 30 400 C 50 150, 200 80, 400 50 Z"
          fill="var(--color-island-base)"
          stroke="var(--color-island-highlight)"
          strokeWidth="4"
        />
        {/* Ancient Temple Ruins */}
        <path d="M 300 200 L 500 200 L 450 100 L 350 100 Z" fill="var(--color-stone)" />
        <path d="M 350 100 L 450 100 L 400 40 Z" fill="var(--color-stone-dark)" />
        <path d="M 300 200 Q 400 250 500 200" fill="none" stroke="var(--color-stone-dark)" strokeWidth="4" />
      </svg>

      {/* Jungle Fireflies (CSS Hardware Accelerated) */}
      <div className="absolute inset-0 pointer-events-none">
        {fireflies.map((ff, i) => (
          <div
            key={`firefly-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[#c2ff66] blur-[1px] animate-pulse"
            style={{
              left: ff.left,
              top: ff.top,
              animationDuration: `${ff.duration}s`,
              animationDelay: `${i * 0.4}s`
            }}
          />
        ))}
      </div>

      {/* Island Header */}
      <div className="absolute top-20 flex flex-col items-center pointer-events-none z-10">
        <span className="text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-treasure-gold mb-1">
          Archipelago Gallery
        </span>
        <h2 className="text-4xl font-serif text-parchment drop-shadow-md tracking-[0.2em] uppercase opacity-95">
          Projects
        </h2>
      </div>

      {/* On-Island Project Cards Grid */}
      <div className="absolute top-[185px] w-full max-w-[700px] grid grid-cols-2 gap-7 z-10 px-6">
        {PROJECTS.map((project, i) => {
          const BadgeIcon = project.badgeIcon
          return (
            <TiltCard key={project.id} maxTilt={6} glareOpacity={0.16} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                onClick={() => setActiveProject(project.id)}
                className="group relative bg-[#1c222b]/95 border border-bronze/40 hover:border-treasure-gold rounded-xs shadow-2xl p-5 cursor-pointer overflow-hidden backdrop-blur-md transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(197,160,89,0.25)] flex flex-col justify-between min-h-[300px] h-full"
              >
                {/* Ornate Ancient Corner Filigree */}
                <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-bronze/60 group-hover:border-treasure-gold transition-colors duration-400 m-1.5 pointer-events-none" />
                <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-bronze/60 group-hover:border-treasure-gold transition-colors duration-400 m-1.5 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-bronze/60 group-hover:border-treasure-gold transition-colors duration-400 m-1.5 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-bronze/60 group-hover:border-treasure-gold transition-colors duration-400 m-1.5 pointer-events-none" />

                {/* Ambient Golden Radial Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,_var(--color-treasure-gold)_0%,_transparent_75%)] pointer-events-none" />

                {/* Card Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-sans font-bold tracking-[0.25em] text-treasure-gold uppercase bg-ocean-dark/60 border border-bronze/40 px-2 py-0.5 rounded-xs">
                      <BadgeIcon className="text-xs text-treasure-gold" />
                      {project.relicNumber}
                    </span>
                    <span className="text-[10px] text-bronze/80 font-serif tracking-wider uppercase opacity-90">
                      {project.type.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-serif text-parchment group-hover:text-treasure-gold transition-colors duration-300">
                      {project.name}
                    </h3>
                    <span className="text-treasure-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out text-xs">
                      <FaExternalLinkAlt />
                    </span>
                  </div>

                  <p className="text-[11px] font-sans italic text-parchment-dark/70 mb-3 line-clamp-1">
                    {project.tagline}
                  </p>

                  {/* Short Snippet */}
                  <p className="text-xs text-parchment-dark/85 font-sans leading-relaxed line-clamp-2 mb-3">
                    {project.shortSnippet}
                  </p>

                  {/* Highlight Feature Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.cardPills.map(pill => (
                      <span 
                        key={pill}
                        className="text-[10px] px-2 py-0.5 rounded-xs bg-ocean-dark/70 border border-bronze/30 text-parchment/90 font-sans"
                      >
                        ✦ {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Tech Chips & CTA */}
                <div className="relative z-10 pt-3 border-t border-bronze/20 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {project.techList.slice(0, 4).map(t => (
                      <span 
                        key={t} 
                        className="text-[9px] px-2 py-0.5 rounded-xs bg-ocean-dark/50 border border-stone/40 text-parchment-dark/80 font-sans"
                      >
                        {t}
                      </span>
                    ))}
                    {project.techList.length > 4 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-xs bg-ocean-dark/50 border border-stone/40 text-bronze font-sans">
                        +{project.techList.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-serif text-treasure-gold tracking-wider uppercase group-hover:text-parchment transition-colors">
                    <span>Examine Logbook</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          )
        })}
      </div>

      {/* ScrollModal for Detailed Project Dossier */}
      <ScrollModal
        isOpen={selectedProject !== null}
        onClose={() => setActiveProject(null)}
        mapLabel="Cartographer's Blueprint • Artifact Analysis"
        title={selectedProject?.name || ''}
        subtitle={selectedProject?.tagline || ''}
      >
        {selectedProject && (
          <div className="flex flex-col gap-9 font-sans text-ocean-dark">
            
            {/* Top Quick Action & Status Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-parchment-dark/20 border border-bronze/35 rounded-xs">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-700" />
                </span>
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-ocean-mid block">
                    Vessel Status
                  </span>
                  <span className="font-serif text-sm font-semibold text-ocean-dark">
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              {/* Quick Action Links */}
              <div className="flex items-center gap-3">
                <MagneticButton strength={0.25}>
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-ocean-dark hover:bg-ocean-mid text-parchment rounded-xs flex items-center gap-2 transition-all border border-bronze/50 font-serif tracking-[0.15em] uppercase text-xs shadow-sm cursor-pointer"
                  >
                    <FaRocket className="text-treasure-gold text-xs" />
                    Live Demo
                    <FaExternalLinkAlt className="text-[10px] opacity-75" />
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.25}>
                  <a
                    href={selectedProject.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-parchment-dark/30 hover:bg-parchment-dark/50 text-ocean-dark rounded-xs flex items-center gap-2 transition-all border border-bronze/40 font-serif tracking-[0.15em] uppercase text-xs shadow-sm cursor-pointer"
                  >
                    <SiGithub className="text-sm" />
                    Source Code
                  </a>
                </MagneticButton>
              </div>
            </div>

            {/* The Expedition Mission (Overview Plaque) */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <GiScrollQuill className="text-2xl text-bronze" />
                <h3 className="text-2xl font-serif text-ocean-dark tracking-wide">
                  Expedition Mission & Background
                </h3>
              </div>

              <div className="bg-parchment-dark/15 p-6 border border-bronze/30 shadow-inner relative overflow-hidden rounded-xs">
                {/* Vintage Corner Brackets */}
                <span className="absolute top-1.5 left-2 text-bronze/60 font-serif text-sm">⌜</span>
                <span className="absolute top-1.5 right-2 text-bronze/60 font-serif text-sm">⌝</span>
                <span className="absolute bottom-1.5 left-2 text-bronze/60 font-serif text-sm">⌞</span>
                <span className="absolute bottom-1.5 right-2 text-bronze/60 font-serif text-sm">⌟</span>

                <p className="text-base sm:text-lg leading-relaxed text-ocean-dark/90 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-ocean-dark first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                  {selectedProject.mission}
                </p>
              </div>
            </div>

            {/* Key Capabilities & Architectural Feats (Grid) */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GiChest className="text-2xl text-bronze" />
                <h3 className="text-2xl font-serif text-ocean-dark tracking-wide">
                  Architectural Feats & Core Systems
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProject.keyFeatures.map((feat, idx) => {
                  const FeatIcon = feat.icon
                  return (
                    <div 
                      key={idx}
                      className="bg-parchment-dark/15 p-4 border border-bronze/25 rounded-xs flex gap-3.5 hover:border-bronze/60 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-ocean-dark/10 border border-bronze/30 flex items-center justify-center shrink-0 text-bronze mt-0.5">
                        <FeatIcon className="text-lg" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-ocean-dark text-base mb-1">
                          {feat.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-ocean-mid/90 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Technology Schematics Breakdown */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FaCode className="text-xl text-bronze" />
                <h3 className="text-2xl font-serif text-ocean-dark tracking-wide">
                  Engineering Schematics & Tooling
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column 1: Frontend */}
                <div className="bg-parchment-dark/15 p-4 border border-bronze/25 rounded-xs">
                  <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-bronze/20">
                    <FaDesktop className="text-bronze text-sm" />
                    <h4 className="font-serif font-bold text-ocean-dark text-sm uppercase tracking-wider">
                      Deck & Rigging (UI)
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-ocean-mid/90">
                    {selectedProject.architecture.frontend.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-bronze font-bold">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Backend */}
                <div className="bg-parchment-dark/15 p-4 border border-bronze/25 rounded-xs">
                  <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-bronze/20">
                    <FaServer className="text-bronze text-sm" />
                    <h4 className="font-serif font-bold text-ocean-dark text-sm uppercase tracking-wider">
                      Engine Room (API & Logic)
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-ocean-mid/90">
                    {selectedProject.architecture.backend.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-bronze font-bold">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Storage & Deployment */}
                <div className="bg-parchment-dark/15 p-4 border border-bronze/25 rounded-xs">
                  <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-bronze/20">
                    <FaDatabase className="text-bronze text-sm" />
                    <h4 className="font-serif font-bold text-ocean-dark text-sm uppercase tracking-wider">
                      Hold & Anchors (Storage)
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-ocean-mid/90">
                    {selectedProject.architecture.storageAndDeployment.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-bronze font-bold">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Engineering Logbook Highlights */}
            <div className="bg-parchment-dark/20 p-5 border border-bronze/30 rounded-xs">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-bronze block mb-3">
                Key Technical Takeaways & Outcomes
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-ocean-dark">
                {selectedProject.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-emerald-700 mt-1 shrink-0 text-sm" />
                    <span className="leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-4 border-t border-bronze/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={selectedProject.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-ocean-dark hover:bg-ocean-mid text-parchment font-serif text-xs tracking-[0.2em] uppercase rounded-xs border border-bronze/50 transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <FaRocket className="text-treasure-gold text-xs" />
                  Launch Vessel Demo
                </a>
                <a
                  href={selectedProject.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-transparent hover:bg-bronze/10 text-ocean-dark font-serif text-xs tracking-[0.2em] uppercase rounded-xs border border-bronze/50 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <SiGithub />
                  Source Code
                </a>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="px-6 py-2.5 bg-parchment-dark/30 hover:bg-parchment-dark/60 text-ocean-dark font-serif text-xs tracking-[0.25em] uppercase rounded-xs border border-bronze/40 transition-all cursor-pointer"
              >
                Close Blueprint
              </button>
            </div>

          </div>
        )}
      </ScrollModal>
    </div>
  )
}
