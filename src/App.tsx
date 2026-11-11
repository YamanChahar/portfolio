import { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import Companion from './components/Companion'
import AmbientAtmosphere from './components/AmbientAtmosphere'
import ScrollProgress from './components/ScrollProgress'
import FloatingNavbar from './components/FloatingNavbar'
import BackToTop from './components/BackToTop'
import { ISLAND_COORDINATES } from './constants/islands'

const GrandArrivalIntro = lazy(() => import('./components/GrandArrivalIntro'))
const MapScene = lazy(() => import('./components/MapScene'))

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (motionQuery.matches) return false
      return !sessionStorage.getItem('has_seen_grand_arrival')
    }
    return true
  })

  const activeIndexRef = useRef(0)
  const showBackToTopRef = useRef(false)

  const handleIntroComplete = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('has_seen_grand_arrival', 'true')
    }
    setShowIntro(false)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [])

  const replayIntro = useCallback(() => {
    setShowIntro(true)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [])

  useEffect(() => {
    if (showIntro) return

    // Force scroll to top on refresh to completely reset the expedition
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    // Aggressively force scroll to 0 immediately
    window.scrollTo(0, 0)
    lenis.scrollTo(0, { immediate: true })

    let isDisposed = false
    let rafId: number

    // Dynamically connect GSAP ScrollTrigger once entering the map
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      if (isDisposed) return
      lenis.on('scroll', ScrollTrigger.update)
      setTimeout(() => {
        if (!isDisposed) ScrollTrigger.refresh()
      }, 60)
    })

    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const numSegments = ISLAND_COORDINATES.length - 1

    const handleScroll = (e: { progress?: number; scroll?: number }) => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const currentY = typeof e.scroll === 'number' ? e.scroll : window.scrollY
      const p = typeof e.progress === 'number' ? e.progress : Math.min(1, Math.max(0, currentY / maxScroll))

      // Only update activeIndex if the island actually changed (at most 5 times total)
      const activeIdx = Math.min(numSegments, Math.max(0, Math.round(p * numSegments)))
      if (activeIdx !== activeIndexRef.current) {
        activeIndexRef.current = activeIdx
        setActiveIndex(activeIdx)
      }

      // Only update showBackToTop when crossing the threshold (at most 1 transition)
      const shouldShow = p > 0.12
      if (shouldShow !== showBackToTopRef.current) {
        showBackToTopRef.current = shouldShow
        setShowBackToTop(shouldShow)
      }
    }

    lenis.on('scroll', handleScroll)

    return () => {
      isDisposed = true
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [showIntro])

  const navigateToIsland = useCallback((index: number) => {
    if (!lenisRef.current) return
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetProgress = index / (ISLAND_COORDINATES.length - 1)
    lenisRef.current.scrollTo(targetProgress * maxScroll, {
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  }, [])

  const scrollToTop = useCallback(() => {
    if (!lenisRef.current) return
    lenisRef.current.scrollTo(0, {
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  }, [])

  return (
    <main className="relative w-full bg-ocean-dark text-text-light font-sans select-none">
      {/* Zero-Overhead Ambient Static Gradients */}
      <AmbientAtmosphere />

      {/* Lightweight Expedition Progress Bar */}
      <ScrollProgress />

      {/* Floating Glassmorphic Waypoint Dock - Only re-renders on island transitions */}
      <FloatingNavbar activeIndex={activeIndex} onNavigate={navigateToIsland} onReplayIntro={replayIntro} />

      {/* Return to Port (Back to Top) Floating Beacon */}
      <BackToTop isVisible={showBackToTop} onClick={scrollToTop} />

      {/* Grand Arrival 3D Cinematic Opening */}
      {showIntro && (
        <Suspense fallback={null}>
          <GrandArrivalIntro onComplete={handleIntroComplete} />
        </Suspense>
      )}

      {/* Scroll area to drive the camera. 700vh for 6 islands */}
      <div className="h-[700vh] w-full pointer-events-none" />
      
      {/* Interactive 3D/2D Ocean Map and Islands - Rendered smoothly upon entering the portfolio */}
      {!showIntro && (
        <Suspense fallback={null}>
          <MapScene />
          <Companion />
        </Suspense>
      )}
    </main>
  )
}
