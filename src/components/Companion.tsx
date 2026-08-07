import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUESTIONS = [
  "What inspired you to build this project?",
  "Which technology was the most challenging?",
  "Want to see the source code?",
  "Can you find the hidden treasure?",
  "Which project are you most proud of?",
]

export default function Companion() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Start muted due to browser autoplay policies
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null)

  // Sync mute state globally
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('toggle-mute', { detail: { isMuted } }))
  }, [isMuted])

  useEffect(() => {
    if (isMinimized || isMuted) {
      setCurrentQuestion(null)
      return
    }

    const triggerQuestion = () => {
      const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
      setCurrentQuestion(q)
      
      // Hide question after 5 seconds
      setTimeout(() => {
        setCurrentQuestion(null)
      }, 5000)
    }

    // Initial delay before first question
    const timeout = setTimeout(triggerQuestion, 10000)
    
    // Then every 30-60 seconds
    const interval = setInterval(triggerQuestion, 30000 + Math.random() * 30000)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [isMinimized, isMuted])

  return (
    <div className="fixed bottom-4 right-4 z-[999] pointer-events-none flex flex-col items-end">
      
      {/* Speech Bubble */}
      <AnimatePresence>
        {currentQuestion && !isMinimized && !isMuted && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="mb-4 mr-12 bg-parchment border border-bronze p-4 rounded-sm shadow-xl max-w-[200px] relative pointer-events-auto"
          >
            <p className="text-sm font-sans text-ocean-dark font-medium leading-relaxed">
              {currentQuestion}
            </p>
            {/* Bubble Tail */}
            <svg className="absolute -bottom-3 right-6 w-4 h-4 text-parchment" viewBox="0 0 10 10">
              <path d="M 0 0 L 10 0 L 5 10 Z" fill="currentColor" />
              <path d="M 0 0 L 5 10 L 10 0" fill="none" stroke="var(--color-bronze)" strokeWidth="1" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative pointer-events-auto">
        {/* Controls (visible on hover) */}
        {!isMinimized && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute -top-8 -right-2 flex gap-2 bg-ocean-dark/80 backdrop-blur-sm p-1 rounded-sm border border-bronze/30 opacity-0 transition-opacity"
          >
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-xs text-parchment hover:text-treasure-gold p-1"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
            <button 
              onClick={() => setIsMinimized(true)}
              className="text-xs text-parchment hover:text-treasure-gold p-1"
              title="Minimize"
            >
              —
            </button>
          </motion.div>
        )}

        {isMinimized ? (
          <motion.button
            onClick={() => setIsMinimized(false)}
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 bg-ocean-dark border border-bronze rounded-full shadow-lg flex items-center justify-center pointer-events-auto"
          >
            <svg viewBox="0 0 100 100" className="w-8 h-8 opacity-80">
              <path d="M 15 50 Q 50 0 85 50 Q 50 10 15 50 Z" fill="var(--color-parchment)" />
            </svg>
          </motion.button>
        ) : (
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-[12vh] h-[15vh] min-w-[100px] min-h-[120px] max-w-[150px] max-h-[180px] relative cursor-pointer"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
              {/* Idle floating shadow */}
              <motion.ellipse 
                cx="50" cy="95" rx="20" ry="5" fill="rgba(0,0,0,0.2)"
                animate={{ rx: [20, 15, 20], opacity: [0.2, 0.1, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Character Body (Cloak) */}
              <motion.path 
                d="M 20 90 C 20 40, 80 40, 80 90 C 80 95, 20 95, 20 90 Z" 
                fill="var(--color-ocean-dark)"
                animate={{ d: [
                  "M 20 90 C 20 40, 80 40, 80 90 C 80 95, 20 95, 20 90 Z",
                  "M 22 90 C 20 42, 80 42, 78 90 C 80 95, 20 95, 22 90 Z",
                  "M 20 90 C 20 40, 80 40, 80 90 C 80 95, 20 95, 20 90 Z"
                ] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Head / Hood */}
              <path d="M 15 45 Q 50 -10 85 45 Q 50 10 15 45 Z" fill="var(--color-ocean-dark)" />
              <path d="M 25 40 Q 50 10 75 40 Z" fill="var(--color-stone-dark)" opacity="0.5" />
              
              {/* Blinking Eyes (Glowing yellow/gold) */}
              <motion.g
                animate={{ opacity: [1, 1, 0, 1, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 0.98, 1] }}
              >
                <circle cx="40" cy="45" r="4" fill="var(--color-treasure-gold)" className="drop-shadow-[0_0_5px_rgba(197,160,89,1)]" />
                <circle cx="60" cy="45" r="4" fill="var(--color-treasure-gold)" className="drop-shadow-[0_0_5px_rgba(197,160,89,1)]" />
              </motion.g>

              {/* Scarf / Detail */}
              <path d="M 35 60 Q 50 70 65 60 L 55 80 Z" fill="var(--color-bronze)" />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  )
}
