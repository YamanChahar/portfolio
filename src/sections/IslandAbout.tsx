import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollModal from '../components/ScrollModal'
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

      <ScrollModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        mapLabel="Captain's Log"
        title="Yaman Chahar"
        subtitle="Computer Science Engineer"
      >
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column: Log Details */}
          <div className="w-full md:w-1/3 flex flex-col gap-8">
            <div className="relative w-40 h-40 mx-auto rounded-full border border-ocean-dark/20 flex items-center justify-center overflow-hidden z-10 bg-parchment-dark/10 mix-blend-multiply shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]">
               <svg viewBox="0 0 100 100" className="w-28 h-28 opacity-60">
                 <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="1.5" strokeDasharray="4 4" />
                 <circle cx="50" cy="50" r="32" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="0.5" />
                 <polygon points="50,10 55,45 90,50 55,55 50,90 45,55 10,50 45,45" fill="none" stroke="var(--color-ocean-dark)" strokeWidth="1.5" />
                 <circle cx="50" cy="50" r="4" fill="var(--color-ocean-dark)" />
               </svg>
            </div>
            <div className="text-center mt-4">
              <p className="text-xs font-sans tracking-[0.3em] text-ocean-light uppercase opacity-80 mb-3 border-b border-bronze/30 pb-2 inline-block">Expedition Status</p>
              <p className="font-serif text-ocean-dark text-lg italic">Learning • Building • Exploring</p>
            </div>
            <div className="text-center mt-auto pt-8">
              <p className="text-[10px] font-sans tracking-[0.3em] text-ocean-mid uppercase opacity-50 mb-1">Entry: Day 742</p>
              <p className="text-[10px] font-sans tracking-[0.3em] text-ocean-mid uppercase opacity-50">Coord: 28°36'N 77°13'E</p>
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="w-full md:w-2/3 font-sans text-lg leading-relaxed text-ocean-mid/90">
            <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-ocean-dark first-letter:mr-4 first-letter:float-left first-letter:leading-none">
              Second-year CSE student at USICT, GGSIPU. Professional Googler, part-time debugger, and full-time builder of web applications that aim to be faster, cleaner, and more enjoyable than the last one.
            </p>

            <h3 className="text-2xl font-serif mt-14 border-b border-bronze/30 inline-block pb-2 text-ocean-dark">Education</h3>
            <div className="bg-parchment-dark/10 p-6 border border-bronze/20 mt-6 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-bronze/40" />
              <p className="text-xl font-serif mb-2 text-ocean-dark">Bachelor of Technology in Computer Science</p>
              <p className="text-ocean-mid font-sans text-sm italic opacity-80">University School of Information, Communication and Technology (USICT), Class of 2024-2028</p>
              <p className="text-ocean-dark font-sans text-xs font-bold tracking-[0.2em] mt-3 uppercase opacity-90">CGPA: 8.0</p>
            </div>
            
            <h3 className="text-2xl font-serif mt-14 border-b border-bronze/30 inline-block pb-2 text-ocean-dark">The Journey</h3>
            <ul className="list-none space-y-8 mt-8">
              <li className="relative pl-10 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-bronze before:rotate-45 after:content-[''] after:absolute after:left-[4.5px] after:top-6 after:w-[1px] after:h-[calc(100%+16px)] after:bg-bronze/30">
                <span className="block text-[10px] font-sans tracking-[0.2em] text-ocean-light mb-1 uppercase opacity-70">2024</span>
                <strong className="text-ocean-dark font-serif text-xl block mb-1">Discovered the islands of HTML & CSS.</strong>
                <span className="opacity-90">Built my first raft and learned the basics of navigation.</span>
              </li>
              <li className="relative pl-10 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-bronze before:rotate-45 after:content-[''] after:absolute after:left-[4.5px] after:top-6 after:w-[1px] after:h-[calc(100%+16px)] after:bg-bronze/30">
                <span className="block text-[10px] font-sans tracking-[0.2em] text-ocean-light mb-1 uppercase opacity-70">2025</span>
                <strong className="text-ocean-dark font-serif text-xl block mb-1">Mastered the Javascript compass.</strong>
                <span className="opacity-90">Navigated through complex logic storms and turbulent state management.</span>
              </li>
              <li className="relative pl-10 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-ocean-dark before:rotate-45">
                <span className="block text-[10px] font-sans tracking-[0.2em] text-ocean-light mb-1 uppercase opacity-70">Present</span>
                <strong className="text-ocean-dark font-serif text-xl block mb-1">Architecting grand vessels.</strong>
                <span className="opacity-90">Using ReactJS and Tailwind CSS to build premium, performant galleons seeking new horizons.</span>
              </li>
            </ul>
          </div>
        </div>
      </ScrollModal>
    </div>
  )
}
