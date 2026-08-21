import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import { FaExternalLinkAlt } from 'react-icons/fa'

const PROJECTS = [
  {
    id: 1,
    name: 'Movie Explorer Web Application ',
    type: 'Web App',
    tech: 'React.js, HTML, CSS',
    desc: '• Developed a responsive movie discovery web application using React.js with real-time movie data fetched from the TMDB API.\n• Implemented movie search, favorites management, and dynamic content rendering to enhance user experience.\n• Utilized React Hooks, Context API, Fetch API, and Local Storage for efficient state management and persistent user preferences.\n• Designed a mobile- friendly and responsive UI, ensuring seamless performance across desktop and mobile devices.',
    liveDemo: 'https://movie-app-topaz-two.vercel.app/',
    sourceCode: 'https://github.com/YamanChahar/Movie-App.git',
  },
  {
    id: 2,
    name: 'MediStock',
    type: 'Web App',
    tech: 'React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Socket.io, JWT',
    desc: '• Developed a full-stack pharmacy management platform that centralizes medicine, batch, inventory, order, dispensing, supplier, and staff management.\n• Uses FEFO-based batch allocation to prioritize medicines by expiry date, automated inventory alerts, real-time notifications, analytics, and secure role-based access control.\n\nKey Features:\n• Medicine and batch management with expiry tracking\n• FEFO (First Expiry, First Out) inventory allocation\n• Low-stock and expiry alerts\n• Inventory transactions and stock movement tracking\n• Order creation and medicine dispensing\n• Supplier management\n• Admin/Staff role-based access control\n• JWT-based authentication and secure session handling\n• Inventory reports, analytics, and trends',
    liveDemo: 'https://medi-stock-sooty.vercel.app/',
    sourceCode: 'https://github.com/YamanChahar/MediStock',
  },
// {
//   id: 3,
//     name: 'Pirate Bay Market',
//       type: 'Full Stack',
//         tech: 'Next.js, Stripe, Tailwind',
//           desc: 'A digital marketplace for rare artifacts and treasures. Built with high security to prevent swashbuckling thieves.',
//   },
// {
//   id: 4,
//     name: 'Kraken Analytics',
//       type: 'Dashboard',
//         tech: 'Vue, D3.js, Python',
//           desc: 'Deep sea data visualization tool that maps monster territories and predicts their movement patterns using ML.',
//   },
// {
//   id: 5,
//     name: 'Mermaid UI',
//       type: 'Component Library',
//         tech: 'React, TypeScript, CSS',
//           desc: 'A beautiful, accessible component library inspired by the elegance of the deep sea.',
//   },
]

export default function IslandProjects({ x, y }: { x: number, y: number }) {
  

  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[800px] h-[800px] pointer-events-auto"
      style={{ left: x, top: y }}
    >
      {/* Island base SVG - Vintage Style */}
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

      {/* Jungle Fireflies (Animated glowing dots) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[#c2ff66] blur-[2px]"
            style={{
              left: 200 + Math.random() * 400,
              top: 100 + Math.random() * 300
            }}
            animate={{
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <h2 className="absolute top-24 text-4xl font-serif text-parchment drop-shadow-md z-10 tracking-[0.2em] uppercase opacity-90">
        Projects
      </h2>

      {/* Robust CSS Grid for Projects */}
      <div className="absolute top-[200px] w-full max-w-[650px] grid grid-cols-2 gap-8 z-10 px-8">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            onClick={() => setActiveProject(project.id)}
            className="group relative bg-stone-dark/80 border border-stone/30 hover:border-bronze/80 rounded-lg shadow-2xl p-6 cursor-pointer overflow-hidden backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] flex flex-col h-[280px]"
          >
            {/* Temple Corner Decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-stone/40 group-hover:border-bronze/80 transition-colors duration-500 m-2 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-[1.5px] border-r-[1.5px] border-stone/40 group-hover:border-bronze/80 transition-colors duration-500 m-2 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[1.5px] border-l-[1.5px] border-stone/40 group-hover:border-bronze/80 transition-colors duration-500 m-2 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-stone/40 group-hover:border-bronze/80 transition-colors duration-500 m-2 rounded-br-sm pointer-events-none" />

            {/* Ambient background glow */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-20 bg-[radial-gradient(circle_at_50%_0%,_var(--color-bronze)_0%,_transparent_70%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full text-left">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-serif text-parchment group-hover:text-treasure-gold transition-colors duration-300 pr-4">
                  {project.name}
                </h3>
                <span className="text-bronze opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out mt-1">
                  <FaExternalLinkAlt size={12} />
                </span>
              </div>
              
              <p className="text-[10px] text-bronze/70 group-hover:text-bronze transition-colors font-sans tracking-[0.3em] uppercase mb-4">
                {project.type}
              </p>

              <div className="text-sm text-parchment-dark/70 flex-grow font-sans leading-relaxed line-clamp-3 whitespace-pre-line group-hover:text-parchment-dark/95 transition-colors duration-300">
                {project.desc}
              </div>

              <div className="mt-auto pt-4 flex gap-2 flex-wrap border-t border-stone/20 relative">
                <div className="absolute -top-[1px] left-0 w-1/2 h-[1px] bg-gradient-to-r from-bronze/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {project.tech.split(', ').map(t => (
                  <span key={t} className="text-[10px] px-2.5 py-1 rounded-sm bg-ocean-dark/40 border border-stone/30 text-parchment-dark font-sans opacity-60 group-hover:opacity-100 group-hover:border-bronze/40 transition-all duration-300 group-hover:bg-ocean-dark/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Popup using React Portal */}
      {createPortal(
        <AnimatePresence>
          {activeProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
              style={{ perspective: 2000 }}
            >
              <div
                className="absolute inset-0 bg-ocean-dark/95 backdrop-blur-md"
                onClick={() => setActiveProject(null)}
              />

              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                className="relative w-full max-w-5xl bg-parchment rounded-sm shadow-2xl border border-bronze overflow-hidden flex flex-col md:flex-row z-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`
                }}
              >
                <div className="w-full md:w-1/3 p-10 flex flex-col justify-center relative overflow-hidden bg-parchment-dark/30 border-r border-bronze/30">
                  {/* Decorative compass rose bg */}
                  <svg className="absolute -right-20 -top-20 w-80 h-80 opacity-10 mix-blend-multiply" viewBox="0 0 100 100">
                    <polygon points="50,10 60,40 90,50 60,60 50,90 40,60 10,50 40,40" fill="var(--color-ocean-dark)" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="1" />
                  </svg>

                  <h3 className="text-xs font-sans tracking-[0.3em] uppercase mb-2 text-ocean-light">
                    {PROJECTS.find(p => p.id === activeProject)?.type}
                  </h3>
                  <h2 className="text-4xl font-serif text-ocean-dark mb-6 leading-tight">
                    {PROJECTS.find(p => p.id === activeProject)?.name}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-sans tracking-widest text-ocean-mid uppercase mb-1">Tech Stack</h4>
                      <p className="text-ocean-dark font-serif text-lg">{PROJECTS.find(p => p.id === activeProject)?.tech}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-2/3 p-10 md:p-14 bg-parchment">
                  <button
                    className="absolute top-6 right-8 text-3xl font-serif text-ocean-mid hover:text-ocean-dark transition-colors"
                    onClick={() => setActiveProject(null)}
                  >
                    &times;
                  </button>

                  <h3 className="text-xl font-serif text-ocean-dark mb-4 border-b border-bronze/30 pb-2">About The Artifact</h3>
                  <p className="text-lg font-sans text-ocean-mid leading-relaxed mb-10 opacity-90 whitespace-pre-line">
                    {PROJECTS.find(p => p.id === activeProject)?.desc}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <a
                      href={PROJECTS.find(p => p.id === activeProject)?.sourceCode || "#"}
                      target={PROJECTS.find(p => p.id === activeProject)?.sourceCode ? "_blank" : undefined}
                      rel={PROJECTS.find(p => p.id === activeProject)?.sourceCode ? "noopener noreferrer" : undefined}
                      className="flex-1 py-4 bg-ocean-dark hover:bg-ocean-mid text-parchment rounded-sm flex items-center justify-center gap-3 transition-colors border border-ocean-dark font-sans tracking-widest uppercase text-sm"
                    >
                      <SiGithub className="text-xl" />
                      View Source
                    </a>
                    <a
                      href={PROJECTS.find(p => p.id === activeProject)?.liveDemo || "#"}
                      target={PROJECTS.find(p => p.id === activeProject)?.liveDemo ? "_blank" : undefined}
                      rel={PROJECTS.find(p => p.id === activeProject)?.liveDemo ? "noopener noreferrer" : undefined}
                      className="flex-1 py-4 bg-transparent hover:bg-bronze/10 text-ocean-dark rounded-sm flex items-center justify-center gap-3 transition-colors border border-bronze font-sans tracking-widest uppercase text-sm"
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
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
