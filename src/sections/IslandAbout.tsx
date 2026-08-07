import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function IslandAbout({ x, y }: { x: number, y: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[500px] h-[500px] pointer-events-auto"
      style={{ left: x, top: y }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl opacity-90" viewBox="0 0 500 500">
        <path 
          d="M 250 40 C 350 20, 480 80, 470 250 C 460 380, 360 470, 250 480 C 120 490, 20 380, 30 250 C 40 120, 150 60, 250 40 Z" 
          fill="var(--color-island-base)" 
          stroke="var(--color-island-highlight)" 
          strokeWidth="4" 
        />
        {/* Ancient Ruins Base (Stone Grey) */}
        <path d="M 150 200 L 350 200 L 330 300 L 170 300 Z" fill="var(--color-stone)" stroke="var(--color-stone-dark)" strokeWidth="2" />
        <path d="M 180 150 L 320 150 L 330 200 L 170 200 Z" fill="var(--color-stone-dark)" stroke="var(--color-stone)" strokeWidth="2" />
        {/* Pillars */}
        <rect x="180" y="80" width="20" height="70" fill="var(--color-stone)" stroke="var(--color-stone-dark)" strokeWidth="1" />
        <rect x="300" y="80" width="20" height="70" fill="var(--color-stone)" stroke="var(--color-stone-dark)" strokeWidth="1" />
        <path d="M 160 80 L 340 80 L 320 50 L 180 50 Z" fill="var(--color-stone-dark)" stroke="var(--color-stone)" strokeWidth="2" />
        {/* Subtle vines/moss */}
        <path d="M 180 80 Q 170 120 190 150" fill="none" stroke="var(--color-island-base)" strokeWidth="2" opacity="0.8" />
        <path d="M 320 80 Q 330 110 310 150" fill="none" stroke="var(--color-island-base)" strokeWidth="2" opacity="0.8" />
      </svg>

      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 w-24 h-24 bg-parchment rounded-sm shadow-xl flex items-center justify-center border border-bronze cursor-pointer mt-10 transition-transform"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")` }}
        title="Read Journal"
      >
        <svg className="w-12 h-12 text-ocean-dark opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </motion.button>
      
      <h2 className="mt-8 text-2xl font-serif text-parchment drop-shadow-md z-10 tracking-[0.2em] uppercase opacity-90">
        About
      </h2>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
              style={{ perspective: 1500 }}
            >
              <div 
                className="absolute inset-0 bg-ocean-dark/90 backdrop-blur-sm" 
                onClick={() => setIsOpen(false)}
              />
              
              <motion.div
                initial={{ rotateX: 20, y: 50, opacity: 0 }}
                animate={{ rotateX: 0, y: 0, opacity: 1 }}
                exit={{ rotateX: -20, y: -50, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 1 }}
                className="relative w-full max-w-5xl h-[85vh] bg-parchment rounded-sm shadow-2xl border border-bronze overflow-hidden flex flex-col md:flex-row text-ocean-dark"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`
                }}
              >
                <button 
                  className="absolute top-6 right-8 text-3xl font-serif text-ocean-mid hover:text-ocean-dark z-20 opacity-60 hover:opacity-100 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  &times;
                </button>
                
                {/* Character Illustration Panel */}
                <div className="w-full md:w-1/3 bg-parchment-dark/30 border-r border-bronze/30 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                  
                  {/* Avatar SVG (Vintage Sketch Style) */}
                  <div className="relative w-48 h-48 rounded-full border border-ocean-dark/40 shadow-inner flex items-center justify-center overflow-hidden z-10 mb-8 bg-parchment mix-blend-multiply">
                    <svg viewBox="0 0 100 100" className="w-40 h-40 mt-10 opacity-80">
                      {/* Body */}
                      <path d="M 20 100 C 20 60, 80 60, 80 100 Z" fill="var(--color-ocean-dark)" />
                      {/* Head */}
                      <circle cx="50" cy="45" r="25" fill="var(--color-stone)" />
                      {/* Hood/Cloak */}
                      <path d="M 15 50 Q 50 0 85 50 Q 50 10 15 50 Z" fill="var(--color-ocean-dark)" />
                      {/* Eyes (Hidden/Mysterious) */}
                      <path d="M 25 45 Q 50 55 75 45" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="2" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-center mb-1 text-ocean-dark">Yaman Chahar</h3>
                  <p className="text-xs font-sans tracking-[0.3em] text-ocean-light uppercase text-center opacity-80">Master Navigator</p>
                </div>

                {/* Log Content Panel */}
                <div className="w-full md:w-2/3 p-10 md:p-16 overflow-y-auto" data-lenis-prevent="true">
                  <h1 className="text-4xl font-serif border-b border-ocean-dark/20 pb-6 mb-8 text-ocean-dark">Captain's Log</h1>
                  
                  <div className="space-y-8 font-sans text-lg leading-relaxed text-ocean-mid/90">
                    <p className="first-letter:text-6xl first-letter:font-serif first-letter:text-ocean-dark first-letter:mr-3 first-letter:float-left">
                      Second-year CSE student at USICT, GGSIPU. Professional Googler, part-time debugger, and full-time builder of web applications that aim to be faster, cleaner, and more enjoyable than the last one.
                    </p>
                    <h3 className="text-2xl font-serif mt-12 border-b border-bronze/30 inline-block pb-2 text-ocean-dark">Education</h3>
                    <div className="bg-parchment-dark/20 p-6 border border-bronze/20 mt-6 shadow-inner relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-bronze/50" />
                      <p className="text-xl font-serif mb-2 text-ocean-dark">Bachelor of Technology in Computer Science</p>
                      <p className="text-ocean-mid font-sans text-sm italic">University School of Information, Communication and Technology (USICT), Class of 2024-2028</p>
                      <p className="text-ocean-dark font-sans text-sm font-bold tracking-widest mt-2 uppercase">CGPA: 8.0</p>
                    </div>
                    
                    <h3 className="text-2xl font-serif mt-12 border-b border-bronze/30 inline-block pb-2 text-ocean-dark">The Journey</h3>
                    <ul className="list-none space-y-8 mt-6">
                      <li className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-bronze before:rotate-45 after:content-[''] after:absolute after:left-[3.5px] after:top-6 after:w-[1px] after:h-full after:bg-bronze/30">
                        <span className="block text-xs font-sans tracking-widest text-ocean-light mb-1 uppercase">2024</span>
                        <strong className="text-ocean-dark">Discovered the islands of HTML & CSS.</strong> Built my first raft and learned the basics of navigation.
                      </li>
                      <li className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-bronze before:rotate-45 after:content-[''] after:absolute after:left-[3.5px] after:top-6 after:w-[1px] after:h-full after:bg-bronze/30">
                        <span className="block text-xs font-sans tracking-widest text-ocean-light mb-1 uppercase">2025</span>
                        <strong className="text-ocean-dark">Mastered the Javascript compass.</strong> Navigated through complex logic storms and turbulent state management.
                      </li>
                      <li className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-bronze before:rotate-45">
                        <span className="block text-xs font-sans tracking-widest text-ocean-light mb-1 uppercase">Present</span>
                        <strong className="text-ocean-dark">Architecting grand vessels.</strong> Using ReactJS and Tailwind CSS to build premium, performant galleons seeking new horizons.
                      </li>
                    </ul>

                    
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
