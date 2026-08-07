import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import MapScene from './components/MapScene'
import Companion from './components/Companion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Force scroll to top on refresh to completely reset the expedition
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Aggressively force scroll to 0 immediately
    window.scrollTo(0, 0)
    lenis.scrollTo(0, { immediate: true })
    
    // Fallback for stubborn browsers
    setTimeout(() => {
      window.scrollTo(0, 0)
      lenis.scrollTo(0, { immediate: true })
      ScrollTrigger.refresh()
    }, 50)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
    }
  }, [])

  return (
    <main className="relative w-full bg-ocean-dark text-text-light font-sans">
      {/* Scroll area to drive the camera. 700vh for 6 islands */}
      <div className="h-[700vh] w-full pointer-events-none" />
      <MapScene />
      <Companion />
    </main>
  )
}
