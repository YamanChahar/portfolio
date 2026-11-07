import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiGithub } from 'react-icons/si'
import { FaFilePdf, FaLinkedin, FaDownload, FaExternalLinkAlt } from 'react-icons/fa'
import { createPortal } from 'react-dom'
import ScrollModal from '../components/ScrollModal'
import MagneticButton from '../components/MagneticButton'

const RESUME_DRIVE_URL = 'https://drive.google.com/file/d/1_ZjSbtaRZwiaiArE_KFdyaF7qviQbcW5/view?usp=sharing'
const RESUME_PREVIEW_URL = 'https://drive.google.com/file/d/1_ZjSbtaRZwiaiArE_KFdyaF7qviQbcW5/preview'
const RESUME_LOCAL_URL = '/resume.pdf?v=20261106'

export default function IslandContact({ x, y }: { x: number, y: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDigging, setIsDigging] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const chestRef = useRef<HTMLDivElement>(null)

  // Instantly close if the user scrolls at all while open, unless reading the resume modal
  useEffect(() => {
    if (isOpen && !isResumeOpen) {
      const handleScroll = () => {
        setIsOpen(false)
        setIsDigging(false)
      }
      window.addEventListener('wheel', handleScroll, { passive: true, once: true })
      window.addEventListener('touchmove', handleScroll, { passive: true, once: true })
      return () => {
        window.removeEventListener('wheel', handleScroll)
        window.removeEventListener('touchmove', handleScroll)
      }
    }
  }, [isOpen, isResumeOpen])

  const handleDig = () => {
    setIsDigging(true)
    setTimeout(() => {
      setIsOpen(true)
      setIsDigging(false)
    }, 2000)
  }

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[600px] h-[600px] pointer-events-auto"
      style={{ left: x, top: y }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl opacity-90" viewBox="0 0 600 600">
        <path 
          d="M 300 50 C 450 40, 550 150, 540 300 C 530 450, 450 550, 300 540 C 150 530, 50 450, 60 300 C 70 150, 150 60, 300 50 Z" 
          fill="var(--color-island-base)" 
          stroke="var(--color-island-highlight)" 
          strokeWidth="4" 
        />
        {/* Cave Entrance (Dark, mysterious) */}
        <defs>
          <radialGradient id="caveGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c5a059" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#c5a059" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Mysterious Gold Glow inside */}
        <circle cx="300" cy="220" r="100" fill="url(#caveGlow)" className="animate-pulse" />
        
        <path d="M 200 200 Q 300 150 400 200 L 420 300 Q 300 250 180 300 Z" fill="var(--color-ocean-dark)" opacity="0.6" />
        <path d="M 220 220 Q 300 180 380 220 L 390 280 Q 300 240 210 280 Z" fill="var(--color-ocean-dark)" opacity="0.8" />
      </svg>

      <h2 className="absolute top-16 text-2xl font-serif text-parchment drop-shadow-md z-10 tracking-[0.2em] uppercase opacity-90">
        Contact
      </h2>

      {!isOpen ? (
        <div className="relative z-10 mt-20 flex flex-col items-center">
          {/* Subtle X mark */}
          <motion.svg 
            width="100" height="100" viewBox="0 0 100 100" className="opacity-80"
            animate={isDigging ? { rotate: [-2, 2, -2], scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: isDigging ? Infinity : 0, duration: 0.3 }}
          >
            <line x1="20" y1="20" x2="80" y2="80" stroke="var(--color-island-dirt)" strokeWidth="6" strokeLinecap="round" />
            <line x1="80" y1="20" x2="20" y2="80" stroke="var(--color-island-dirt)" strokeWidth="6" strokeLinecap="round" />
            {isDigging && (
              <motion.circle 
                cx="50" cy="50" r="40" 
                fill="none" stroke="var(--color-bronze)" strokeWidth="2" strokeDasharray="10 10"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear" }}
              />
            )}
          </motion.svg>

          {!isDigging && (
            <MagneticButton strength={0.3} onClick={handleDig}>
              <motion.div
                className="mt-8 bg-ocean-dark/70 text-parchment px-8 py-3 rounded-full font-serif tracking-widest text-sm border border-treasure-gold/50 transition-all hover:border-treasure-gold hover:shadow-[0_0_25px_rgba(197,160,89,0.35)] uppercase cursor-pointer backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Excavate
              </motion.div>
            </MagneticButton>
          )}
        </div>
      ) : (
        <div className="relative z-10 mt-20 w-full h-full flex flex-col items-center">
          {/* Realistic Brass Chest */}
          <motion.div
            ref={chestRef}
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 1.5 }}
            className="relative cursor-pointer"
          >
            <svg width="200" height="160" viewBox="0 0 200 160" className="drop-shadow-2xl opacity-90">
              {/* Chest Back Lid (Open) */}
              <path d="M 30 80 Q 100 10 170 80 L 170 100 L 30 100 Z" fill="var(--color-stone-dark)" />
              {/* Chest Base */}
              <path d="M 20 90 L 180 90 L 170 140 L 30 140 Z" fill="var(--color-island-dirt)" stroke="var(--color-bronze)" strokeWidth="2" />
              <rect x="40" y="95" width="120" height="40" fill="none" stroke="var(--color-stone-dark)" strokeWidth="2" opacity="0.5" />
              <rect x="95" y="85" width="10" height="25" fill="var(--color-bronze)" rx="1" />
            </svg>

            {/* Subtle Emitting Particles (Dust/Glow) */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                className="absolute w-1 h-1 bg-bronze rounded-full"
                style={{ top: 70, left: 100 }}
                animate={{
                  x: (Math.random() - 0.5) * 200,
                  y: -Math.random() * 200 - 20,
                  opacity: [0, 0.6, 0],
                  scale: [1, 2]
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Floating Relic Icons */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center p-8"
            >
              <div className="relative w-full h-full max-w-4xl max-h-[800px] pointer-events-auto">
                {[
                  { icon: SiGithub, link: 'https://github.com/YamanChahar', name: 'GitHub', isModal: false },
                  { icon: FaLinkedin, link: 'https://www.linkedin.com/in/yaman-chahar-ab4514320/', name: 'LinkedIn', isModal: false },
                  { icon: FaFilePdf, link: RESUME_DRIVE_URL, name: 'Resume', isModal: true }
                ].map((social, i, arr) => {
                  const angle = (i / arr.length) * Math.PI * 2 - Math.PI / 2
                  const radius = 110
                  const destX = Math.cos(angle) * radius
                  const destY = Math.sin(angle) * radius

                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                      animate={{ scale: 1, opacity: 1, x: destX, y: destY }}
                      transition={{ type: 'spring', delay: 1.5 + i * 0.15, bounce: 0.3 }}
                      whileHover={{ scale: 1.1, zIndex: 50 }}
                      className="absolute left-[50%] top-[50%] -ml-8 -mt-8 flex flex-col items-center gap-3 w-16 cursor-pointer"
                      onClick={() => {
                        if (social.isModal) {
                          setIsResumeOpen(true)
                        } else {
                          window.open(social.link, '_blank', 'noopener,noreferrer')
                        }
                      }}
                    >
                      <div className="w-16 h-16 bg-parchment border border-bronze/50 rounded-sm flex items-center justify-center shadow-lg transition-colors hover:bg-parchment-dark">
                        <social.icon size={28} className="text-ocean-dark opacity-80" />
                      </div>
                      <span className="text-parchment font-sans tracking-[0.2em] uppercase text-xs opacity-90 drop-shadow-md whitespace-nowrap absolute top-full mt-3">
                        {social.name}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Dedicated ScrollModal for Resume Viewing */}
      <ScrollModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        mapLabel="Captain's Official Credentials"
        title="Yaman Chahar"
        subtitle="Resume & Engineering Record"
      >
        <div className="flex flex-col gap-6 font-sans text-ocean-dark">
          {/* Action Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-parchment-dark/20 border border-bronze/35 rounded-xs">
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-ocean-mid block">
                Official Document
              </span>
              <p className="font-serif text-sm font-semibold text-ocean-dark">
                Updated Curriculum Vitae (PDF)
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <MagneticButton strength={0.25}>
                <a
                  href={RESUME_LOCAL_URL}
                  download="Yaman_Chahar_Resume.pdf"
                  className="px-4 py-2 bg-ocean-dark hover:bg-ocean-mid text-parchment font-serif text-xs tracking-[0.15em] uppercase rounded-xs border border-bronze/50 hover:border-treasure-gold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <FaDownload className="text-treasure-gold text-xs" />
                  Download PDF
                </a>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <a
                  href={RESUME_DRIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-parchment-dark/30 hover:bg-parchment-dark/50 text-ocean-dark font-serif text-xs tracking-[0.15em] uppercase rounded-xs border border-bronze/40 hover:border-bronze flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Open Drive View
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Embedded Google Drive Preview / PDF Viewer */}
          <div className="w-full bg-white rounded-xs border border-bronze/40 overflow-hidden shadow-inner h-[65vh]">
            <iframe 
              src={RESUME_PREVIEW_URL}
              className="w-full h-full border-none"
              title="Yaman Chahar Resume Preview"
              allow="autoplay"
            />
          </div>

          <div className="text-center pt-1">
            <p className="text-xs text-ocean-mid/80 italic">
              Having trouble viewing the embedded document?{' '}
              <a 
                href={RESUME_DRIVE_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-ocean-dark font-bold underline hover:text-bronze"
              >
                Click here to open directly in Google Drive
              </a>.
            </p>
          </div>
        </div>
      </ScrollModal>
    </div>
  )
}
