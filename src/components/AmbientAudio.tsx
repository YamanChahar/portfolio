import { useEffect, useRef, useState } from 'react'

export default function AmbientAudio() {
  const [isMuted, setIsMuted] = useState(true)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  
  // Create synthetic ocean waves using Web Audio API white noise + LFO filter
  const initAudio = () => {
    if (audioCtxRef.current) return
    
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    audioCtxRef.current = ctx
    
    const bufferSize = ctx.sampleRate * 2 // 2 seconds of noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = buffer
    noiseSource.loop = true
    
    // Filter to make it sound like ocean/wind
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 400
    
    // LFO to modulate filter frequency (creates the "wave crashing" swelling sound)
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.15 // Very slow waves (approx 6.5s per wave)
    
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 800 // Modulate frequency by 800Hz
    
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()
    
    const masterGain = ctx.createGain()
    masterGain.gain.value = isMuted ? 0 : 0.05 // Very quiet background noise
    gainNodeRef.current = masterGain
    
    noiseSource.connect(filter)
    filter.connect(masterGain)
    masterGain.connect(ctx.destination)
    
    noiseSource.start()
  }

  useEffect(() => {
    const handleToggleMute = (e: Event) => {
      const customEvent = e as CustomEvent
      const muted = customEvent.detail.isMuted
      setIsMuted(muted)
      
      if (!muted && !audioCtxRef.current) {
        initAudio()
      }
      
      if (gainNodeRef.current && audioCtxRef.current) {
        if (!muted && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume()
        }
        // Smooth fade in/out
        gainNodeRef.current.gain.setTargetAtTime(
          muted ? 0 : 0.05, 
          audioCtxRef.current.currentTime, 
          0.5
        )
      }
    }
    
    window.addEventListener('toggle-mute', handleToggleMute)
    return () => window.removeEventListener('toggle-mute', handleToggleMute)
  }, [])

  return null
}
