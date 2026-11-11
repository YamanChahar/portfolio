import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollModal from '../components/ScrollModal'
import MagneticButton from '../components/MagneticButton'
import { 
  GiCompass, 
  GiScrollQuill, 
  GiAnchor, 
  GiSparkles, 
  GiGraduateCap, 
  GiCoffeeCup, 
  GiOpenBook,
  GiShipWheel,
  GiSextant
} from 'react-icons/gi'
import { FaAward, FaQuoteLeft, FaBolt, FaDraftingCompass, FaEye, FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa'

export default function IslandAbout({ x, y }: { x: number, y: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[520px] h-[520px] pointer-events-auto"
      style={{ left: x, top: y, contentVisibility: 'auto', containIntrinsicSize: '520px 520px' }}
    >
      {/* Island base SVG - Ancient Cartographer's Sanctuary */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl opacity-90" viewBox="0 0 520 520">
        <defs>
          {/* Subtle magical glow from the altar */}
          <radialGradient id="altarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c5a059" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#b08d57" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          {/* Torchlight glow */}
          <radialGradient id="torchGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e5a13c" stopOpacity="0.7" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Island Base Coastline */}
        <path 
          d="M 260 35 C 370 15, 500 75, 490 260 C 480 400, 380 495, 260 500 C 120 505, 15 395, 25 260 C 35 125, 145 55, 260 35 Z" 
          fill="var(--color-island-base)" 
          stroke="var(--color-island-highlight)" 
          strokeWidth="4" 
        />

        {/* Topography and Sand Patches */}
        <path d="M 120 180 Q 260 140 400 180" fill="none" stroke="var(--color-island-highlight)" strokeWidth="2" opacity="0.4" />
        <path d="M 100 320 Q 260 360 420 320" fill="none" stroke="var(--color-island-highlight)" strokeWidth="2" opacity="0.4" />
        <ellipse cx="260" cy="285" rx="150" ry="85" fill="var(--color-island-dirt)" opacity="0.35" />

        {/* Altar Light Aura */}
        <circle cx="260" cy="245" r="110" fill="url(#altarGlow)" className="animate-pulse" />

        {/* Ancient Sanctuary Stone Steps & Foundation */}
        <polygon points="120,335 400,335 425,365 95,365" fill="var(--color-stone-dark)" stroke="var(--color-stone)" strokeWidth="2" />
        <polygon points="140,305 380,305 400,335 120,335" fill="var(--color-stone)" stroke="var(--color-stone-dark)" strokeWidth="2" />
        <polygon points="165,275 355,275 380,305 140,305" fill="var(--color-stone-dark)" stroke="var(--color-stone)" strokeWidth="2" />

        {/* Stone Pedestal for the Grimoire */}
        <polygon points="215,240 305,240 320,275 200,275" fill="var(--color-stone)" stroke="var(--color-stone-dark)" strokeWidth="2" />
        <rect x="225" y="215" width="70" height="25" fill="var(--color-stone-dark)" stroke="var(--color-bronze)" strokeWidth="1" />
        <path d="M 230 227 L 290 227" stroke="var(--color-treasure-gold)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />

        {/* Weathered Ancient Pillars */}
        {/* Left Outer Pillar */}
        <rect x="150" y="115" width="22" height="160" fill="var(--color-stone)" stroke="var(--color-stone-dark)" strokeWidth="1.5" />
        <rect x="145" y="105" width="32" height="10" fill="var(--color-stone-dark)" stroke="var(--color-stone)" strokeWidth="1" />
        <rect x="145" y="270" width="32" height="8" fill="var(--color-stone-dark)" stroke="var(--color-stone)" strokeWidth="1" />

        {/* Left Inner Pillar (Broken/Weathered) */}
        <rect x="195" y="150" width="20" height="125" fill="var(--color-stone)" stroke="var(--color-stone-dark)" strokeWidth="1.5" />
        <rect x="190" y="270" width="30" height="8" fill="var(--color-stone-dark)" stroke="var(--color-stone)" strokeWidth="1" />
        {/* Broken top fragment */}
        <polygon points="195,150 205,138 215,150" fill="var(--color-stone-dark)" />

        {/* Right Inner Pillar */}
        <rect x="305" y="135" width="20" height="140" fill="var(--color-stone)" stroke="var(--color-stone-dark)" strokeWidth="1.5" />
        <rect x="300" y="270" width="30" height="8" fill="var(--color-stone-dark)" stroke="var(--color-stone)" strokeWidth="1" />

        {/* Right Outer Pillar */}
        <rect x="348" y="115" width="22" height="160" fill="var(--color-stone)" stroke="var(--color-stone-dark)" strokeWidth="1.5" />
        <rect x="343" y="105" width="32" height="10" fill="var(--color-stone-dark)" stroke="var(--color-stone)" strokeWidth="1" />
        <rect x="343" y="270" width="32" height="8" fill="var(--color-stone-dark)" stroke="var(--color-stone)" strokeWidth="1" />

        {/* Stone Architrave / Pediment Beam */}
        <polygon points="135,105 385,105 365,75 155,75" fill="var(--color-stone-dark)" stroke="var(--color-stone)" strokeWidth="2" />
        <polygon points="155,75 365,75 260,35" fill="var(--color-stone)" stroke="var(--color-stone-dark)" strokeWidth="2" />

        {/* Celestial / Eye Carving in Pediment */}
        <circle cx="260" cy="62" r="10" fill="none" stroke="var(--color-treasure-gold)" strokeWidth="1.5" opacity="0.8" />
        <circle cx="260" cy="62" r="3" fill="var(--color-treasure-gold)" opacity="0.9" />
        <path d="M 245 62 Q 260 52 275 62 Q 260 72 245 62 Z" fill="none" stroke="var(--color-treasure-gold)" strokeWidth="1.5" opacity="0.8" />

        {/* Braziers with Warm Firelight */}
        {/* Left Brazier */}
        <circle cx="115" cy="315" r="28" fill="url(#torchGlow)" opacity="0.8" />
        <path d="M 105 335 L 125 335 L 122 350 L 108 350 Z" fill="var(--color-stone-dark)" />
        <path d="M 100 325 Q 115 340 130 325" fill="none" stroke="var(--color-bronze)" strokeWidth="3" />
        <ellipse cx="115" cy="323" rx="6" ry="8" fill="#ff7700" className="animate-pulse" />
        <ellipse cx="115" cy="322" rx="3" ry="5" fill="#ffcc00" />

        {/* Right Brazier */}
        <circle cx="405" cy="315" r="28" fill="url(#torchGlow)" opacity="0.8" />
        <path d="M 395 335 L 415 335 L 412 350 L 398 350 Z" fill="var(--color-stone-dark)" />
        <path d="M 390 325 Q 405 340 420 325" fill="none" stroke="var(--color-bronze)" strokeWidth="3" />
        <ellipse cx="405" cy="323" rx="6" ry="8" fill="#ff7700" className="animate-pulse" />
        <ellipse cx="405" cy="322" rx="3" ry="5" fill="#ffcc00" />

        {/* Climbing Ivy & Moss */}
        <path d="M 152 270 Q 145 220 156 190 Q 148 160 154 125" fill="none" stroke="var(--color-island-base)" strokeWidth="3" opacity="0.85" />
        <path d="M 368 270 Q 375 230 366 185 Q 374 150 368 125" fill="none" stroke="var(--color-island-base)" strokeWidth="3" opacity="0.85" />
        <circle cx="152" cy="205" r="3" fill="var(--color-island-highlight)" />
        <circle cx="157" cy="175" r="2.5" fill="var(--color-island-highlight)" />
        <circle cx="367" cy="215" r="3" fill="var(--color-island-highlight)" />
        <circle cx="372" cy="165" r="2.5" fill="var(--color-island-highlight)" />
      </svg>

      {/* Floating Stardust / Mystical Runes around Altar (CSS Hardware Accelerated) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`mystic-particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-treasure-gold blur-[0.5px] animate-pulse"
            style={{
              left: 220 + (i * 26),
              top: 210 + ((i % 2) * 20),
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* The Captain's Grimoire / Interactive Tome */}
      <motion.div
        className="relative z-20 flex flex-col items-center cursor-pointer pointer-events-auto mt-2"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Floating Grimoire Book */}
        <div
          className="relative w-28 h-32 rounded-r-md rounded-l-xs shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex items-center justify-center border-2 border-bronze/80 bg-gradient-to-br from-[#402218] via-[#2d1810] to-[#1c0f0a] group anim-map-bob"
          style={{
            perspective: 600,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Leather Book Spine */}
          <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-[#170a05] to-[#3a1b11] border-r border-bronze/40 flex flex-col justify-between py-2">
            <div className="w-full h-0.5 bg-treasure-gold/60" />
            <div className="w-full h-0.5 bg-treasure-gold/60" />
            <div className="w-full h-0.5 bg-treasure-gold/60" />
            <div className="w-full h-0.5 bg-treasure-gold/60" />
          </div>

          {/* Ornate Gold Filigree Corners */}
          <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-treasure-gold/80" />
          <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-treasure-gold/80" />

          {/* Golden Center Medallion on Cover */}
          <div className="relative z-10 w-14 h-14 rounded-full border border-treasure-gold/60 flex items-center justify-center bg-ocean-dark/40 shadow-inner group-hover:border-treasure-gold transition-colors">
            <GiCompass className="w-9 h-9 text-treasure-gold group-hover:rotate-45 transition-transform duration-700 ease-out" />
          </div>

          {/* Bookmark Ribbon */}
          <div className="absolute -bottom-4 left-6 w-3 h-6 bg-[#992222] border-x border-[#661111] shadow-md" />

          {/* Glowing Aura on Hover */}
          <div className="absolute -inset-1 rounded-r-md rounded-l-xs bg-treasure-gold/20 filter blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Interactive Floating Badge */}
        <motion.div 
          className="mt-6 flex items-center gap-2 px-3.5 py-1.5 bg-ocean-dark/90 border border-bronze/60 rounded-full shadow-lg backdrop-blur-xs text-parchment"
          whileHover={{ borderColor: "var(--color-treasure-gold)" }}
        >
          <span className="w-2 h-2 rounded-full bg-treasure-gold animate-ping" />
          <span className="text-[11px] font-serif tracking-[0.25em] uppercase text-parchment/95 flex items-center gap-1.5">
            <GiScrollQuill className="text-treasure-gold text-sm" />
            Read Journal
          </span>
        </motion.div>
      </motion.div>

      {/* Island Title */}
      <h2 className="mt-4 text-2xl font-serif text-parchment drop-shadow-md z-10 tracking-[0.25em] uppercase opacity-95">
        About
      </h2>

      {/* The Captain's Dossier Modal */}
      <ScrollModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        mapLabel="Captain's Archive • Island of Lore"
        title="Yaman Chahar"
        subtitle="Computer Science Engineer & Web Craftsman"
      >
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* ================= LEFT COLUMN: VOYAGER DOSSIER ================= */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            
            {/* Ornate Astrolabe Medallion */}
            <div className="relative w-48 h-48 mx-auto rounded-full border-2 border-bronze/40 flex items-center justify-center bg-gradient-to-b from-parchment-dark/30 to-parchment/10 shadow-[inset_0_0_30px_rgba(139,115,85,0.25)] p-2">
              
              {/* Outer Rotating Astrolabe Ring (CSS Hardware Accelerated) */}
              <div 
                className="absolute inset-2 rounded-full border border-dashed border-ocean-dark/40 pointer-events-none animate-spin"
                style={{ animationDuration: '60s' }}
              />

              {/* Second Counter-rotating Ring */}
              <div 
                className="absolute inset-4 rounded-full border border-ocean-dark/20 pointer-events-none animate-spin"
                style={{ animationDuration: '45s', animationDirection: 'reverse' }}
              />

              {/* Center Medallion Artwork */}
              <div className="relative w-32 h-32 rounded-full border border-bronze/60 flex flex-col items-center justify-center bg-ocean-dark/5 shadow-inner">
                <GiShipWheel className="w-16 h-16 text-ocean-dark/75 hover:rotate-90 transition-transform duration-1000" />
                <span className="font-serif text-[11px] font-bold text-ocean-dark tracking-[0.3em] uppercase mt-1">
                  Navigator
                </span>
              </div>

              {/* Cardinal Compass Markers */}
              <span className="absolute top-1 text-[9px] font-serif font-bold text-bronze tracking-widest">N</span>
              <span className="absolute bottom-1 text-[9px] font-serif font-bold text-bronze tracking-widest">S</span>
              <span className="absolute left-1.5 text-[9px] font-serif font-bold text-bronze tracking-widest">W</span>
              <span className="absolute right-1.5 text-[9px] font-serif font-bold text-bronze tracking-widest">E</span>
            </div>

            {/* Expedition Status Plaque */}
            <div className="text-center bg-parchment-dark/20 border border-bronze/30 p-4 rounded-xs shadow-xs">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-700" />
                </span>
                <p className="text-[10px] font-sans font-bold tracking-[0.3em] text-ocean-mid uppercase opacity-90">
                  Expedition Status
                </p>
              </div>
              <p className="font-serif text-ocean-dark text-base font-semibold">
                Active Sea Trials
              </p>
              <p className="text-xs font-sans italic text-ocean-mid/80 mt-0.5">
                Available for internships, projects & collaborations
              </p>
            </div>

            {/* Manifest / Navigational Specs */}
            <div className="bg-parchment-dark/15 border border-bronze/25 p-4 rounded-xs space-y-3 font-sans text-xs">
              <div className="flex justify-between items-center border-b border-bronze/20 pb-2">
                <span className="text-ocean-light tracking-wider uppercase font-semibold text-[10px]">Home Port</span>
                <span className="text-ocean-dark font-serif font-medium">New Delhi, India</span>
              </div>
              <div className="flex justify-between items-center border-b border-bronze/20 pb-2">
                <span className="text-ocean-light tracking-wider uppercase font-semibold text-[10px]">Academic Guild</span>
                <span className="text-ocean-dark font-serif font-medium">USICT, GGSIPU</span>
              </div>
              <div className="flex justify-between items-center border-b border-bronze/20 pb-2">
                <span className="text-ocean-light tracking-wider uppercase font-semibold text-[10px]">Coordinates</span>
                <span className="text-ocean-dark font-mono text-[11px]">28°36'N, 77°13'E</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ocean-light tracking-wider uppercase font-semibold text-[10px]">Voyage Stage</span>
                <span className="text-ocean-dark font-serif font-medium">3rd Year Undergrad ('28)</span>
              </div>
            </div>

            {/* Wax Seal of Admiralty */}
            <div className="mt-2 flex items-center justify-center gap-3 py-2 opacity-85">
              <div className="w-12 h-12 rounded-full bg-[#822222] border-2 border-[#5a1414] shadow-md flex items-center justify-center text-parchment transform -rotate-12">
                <GiAnchor className="text-xl" />
              </div>
              <div className="text-left font-serif text-[10px] text-ocean-dark leading-tight">
                <p className="font-bold tracking-widest uppercase">Verified Voyager</p>
                <p className="opacity-75 italic">Admiralty Logbook Registry</p>
              </div>
            </div>

            {/* Official Resume Link */}
            <div className="w-full flex justify-center">
              <MagneticButton strength={0.25} className="w-full">
                <a
                  href="https://drive.google.com/file/d/1_ZjSbtaRZwiaiArE_KFdyaF7qviQbcW5/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 w-full py-2.5 px-4 bg-ocean-dark hover:bg-ocean-mid text-parchment font-serif text-xs tracking-[0.2em] uppercase rounded-xs border border-bronze/50 hover:border-treasure-gold flex items-center justify-center gap-2.5 transition-all shadow-md group cursor-pointer"
                >
                  <FaFilePdf className="text-bronze group-hover:text-treasure-gold text-sm transition-colors" />
                  <span>Inspect Resume (PDF)</span>
                  <FaExternalLinkAlt className="text-[10px] opacity-70 group-hover:opacity-100" />
                </a>
              </MagneticButton>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: EXPEDITION CHRONICLE ================= */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8 font-sans">
            
            {/* The Explorer's Manifesto (Bio) */}
            <div className="space-y-4 text-ocean-dark/90 leading-relaxed text-lg">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-ocean-dark first-letter:mr-3.5 first-letter:float-left first-letter:leading-none">
                Third-year Computer Science engineer at USICT (GGSIPU), charting courses through modern web engineering and interactive frontend architectures. A passionate builder who thrives at the intersection of precision code, dynamic state orchestration, and atmospheric visual storytelling.
              </p>
              {/* <p className="text-base text-ocean-mid/90 leading-relaxed">
                Whether deciphering complex algorithmic challenges or crafting responsive, silky-smooth applications, my voyage is centered around creating digital vessels that are faster, cleaner, and more resilient than the last.
              </p> */}
            </div>

            {/* Mariner's Creed (Quote Block) */}
            <div className="relative pl-6 pr-4 py-4 bg-parchment-dark/20 border-l-4 border-bronze rounded-r-xs italic text-ocean-dark/95 text-base">
              <FaQuoteLeft className="absolute -top-3 left-3 text-bronze/40 text-xl" />
              <p>
                "Any vessel can sail upon calm waters; it takes thorough craftsmanship, strict architectural discipline, and curiosity to navigate uncharted digital horizons."
              </p>
            </div>

            {/* Guild Accreditation / Education Certificate */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GiGraduateCap className="text-2xl text-bronze" />
                <h3 className="text-2xl font-serif text-ocean-dark tracking-wide">
                  Academy & Guild Accreditation
                </h3>
              </div>

              <div className="bg-parchment-dark/15 p-6 border border-bronze/30 shadow-inner relative overflow-hidden rounded-xs">
                {/* Vintage Corner Brackets */}
                <span className="absolute top-1.5 left-2 text-bronze/60 font-serif text-sm">⌜</span>
                <span className="absolute top-1.5 right-2 text-bronze/60 font-serif text-sm">⌝</span>
                <span className="absolute bottom-1.5 left-2 text-bronze/60 font-serif text-sm">⌞</span>
                <span className="absolute bottom-1.5 right-2 text-bronze/60 font-serif text-sm">⌟</span>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-bronze/20 pb-3">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-bronze block mb-1">
                      Degree Program
                    </span>
                    <h4 className="text-xl font-serif font-bold text-ocean-dark">
                      Bachelor of Technology in Computer Science & Engineering
                    </h4>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ocean-dark/10 border border-bronze/30 rounded-xs font-serif text-xs font-bold text-ocean-dark">
                    <FaAward className="text-bronze text-sm" />
                    CGPA: 8.0+ / 10
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-ocean-dark font-serif text-sm font-medium">
                    University School of Information, Communication and Technology (USICT)
                  </p>
                  <p className="text-ocean-mid text-xs italic opacity-85 mt-0.5">
                    Guru Gobind Singh Indraprastha University (GGSIPU) • Class of 2024 – 2028
                  </p>
                </div>

                {/* Core Disciplines */}
                <div className="mt-4 pt-4 border-t border-bronze/20">
                  <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-ocean-light font-semibold mb-2">
                    Core Engineering Foundations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Data Structures & Algorithms',
                      'Object-Oriented Programming',
                      'Database Management Systems',
                      'Web Engineering',
                      'Operating Systems',
                      'Computer Architecture'
                    ].map((course) => (
                      <span 
                        key={course}
                        className="text-xs px-2.5 py-1 bg-parchment/60 border border-bronze/30 text-ocean-dark rounded-xs font-sans font-medium"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* The Navigator's Creed: Core Principles */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GiSextant className="text-2xl text-bronze" />
                <h3 className="text-2xl font-serif text-ocean-dark tracking-wide">
                  Navigational Principles
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Pillar 1 */}
                <div className="bg-parchment-dark/15 p-4 border border-bronze/25 rounded-xs flex flex-col justify-between hover:border-bronze/60 transition-colors">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-ocean-dark/10 flex items-center justify-center mb-3 text-bronze">
                      <FaBolt />
                    </div>
                    <h4 className="font-serif font-bold text-ocean-dark text-base mb-1">
                      Swift Currents
                    </h4>
                    <p className="text-xs text-ocean-mid/90 leading-relaxed">
                      Zero unnecessary cargo. Dedicated to lightning-fast load times, clean bundle sizes, and snappy 60fps animations.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="bg-parchment-dark/15 p-4 border border-bronze/25 rounded-xs flex flex-col justify-between hover:border-bronze/60 transition-colors">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-ocean-dark/10 flex items-center justify-center mb-3 text-bronze">
                      <FaDraftingCompass />
                    </div>
                    <h4 className="font-serif font-bold text-ocean-dark text-base mb-1">
                      True North Architecture
                    </h4>
                    <p className="text-xs text-ocean-mid/90 leading-relaxed">
                      Modular component hierarchies, clean abstractions, and predictable state structures that weather storm surges.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="bg-parchment-dark/15 p-4 border border-bronze/25 rounded-xs flex flex-col justify-between hover:border-bronze/60 transition-colors">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-ocean-dark/10 flex items-center justify-center mb-3 text-bronze">
                      <FaEye />
                    </div>
                    <h4 className="font-serif font-bold text-ocean-dark text-base mb-1">
                      Immersive Craft
                    </h4>
                    <p className="text-xs text-ocean-mid/90 leading-relaxed">
                      Every pixel and interaction tells a story. Marrying aesthetic flair with effortless usability and accessibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tactical Armory / Toolkit Spotlight */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GiOpenBook className="text-2xl text-bronze" />
                <h3 className="text-2xl font-serif text-ocean-dark tracking-wide">
                  Armory & Flagship Instruments
                </h3>
              </div>

              <div className="bg-parchment-dark/15 p-5 border border-bronze/25 rounded-xs space-y-4">
                {/* Category 1 */}
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-bronze block mb-2">
                    Deck & Sails (Frontend & Mobile Craft)
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {['React.js', 'React Native', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5', 'CSS3', 'Expo EAS', 'Responsive UI'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-parchment border border-bronze/35 text-ocean-dark rounded-xs font-serif font-medium shadow-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category 2 */}
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-bronze block mb-2">
                    Engine Room & Holds (Backend, AI & Data)
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {['Node.js', 'Express.js', 'Python', 'FastAPI', 'MongoDB', 'RESTful APIs', 'JWT & RBAC', 'Socket.IO'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-parchment border border-bronze/35 text-ocean-dark rounded-xs font-serif font-medium shadow-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category 3 */}
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-bronze block mb-2">
                    Navigational Rigging (DevOps, Systems & Tools)
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {['Docker', 'Git / GitHub', 'GitHub Actions', 'Vercel', 'Render', 'C / C++', 'VS Code', 'Figma'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-parchment border border-bronze/35 text-ocean-dark rounded-xs font-serif font-medium shadow-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Behind The Helm (Voyager Lore / Quirks) */}
            <div className="bg-parchment-dark/20 p-4 border border-bronze/30 rounded-xs flex flex-wrap items-center justify-between gap-4 text-xs text-ocean-dark">
              <div className="flex items-center gap-2">
                <GiCoffeeCup className="text-xl text-bronze" />
                <span><strong>Fuel:</strong> Dark coffee & late-night problem solving</span>
              </div>
              <div className="flex items-center gap-2">
                <GiSparkles className="text-xl text-bronze" />
                <span><strong>Drive:</strong> Pixel-perfect UI & silky physics</span>
              </div>
              <div className="flex items-center gap-2">
                <GiCompass className="text-xl text-bronze" />
                <span><strong>Direction:</strong> Always seeking new challenges</span>
              </div>
            </div>

            {/* Interactive Footer CTA */}
            <div className="pt-4 border-t border-bronze/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-serif text-sm italic text-ocean-mid">
                The expedition continues across the archipelago.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://drive.google.com/file/d/1_ZjSbtaRZwiaiArE_KFdyaF7qviQbcW5/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-parchment-dark/30 hover:bg-parchment-dark/60 text-ocean-dark font-serif text-xs tracking-[0.2em] uppercase rounded-xs border border-bronze/50 flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <FaFilePdf className="text-bronze" />
                  View Resume
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-ocean-dark text-parchment font-serif text-xs tracking-[0.25em] uppercase rounded-xs border border-bronze/50 hover:bg-ocean-mid transition-all shadow-md cursor-pointer"
                >
                  Close & Chart Onward
                </button>
              </div>
            </div>

          </div>

        </div>
      </ScrollModal>
    </div>
  )
}
