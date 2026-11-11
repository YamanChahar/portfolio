import { useEffect, useRef, useState, useCallback, memo } from 'react'
import * as THREE from 'three'
import { FaAnchor, FaVolumeHigh, FaVolumeXmark, FaForward } from 'react-icons/fa6'
import { GiShipWheel } from 'react-icons/gi'

interface GrandArrivalIntroProps {
  onComplete: () => void
}

/* =========================================================================
   1. PROCEDURAL CINEMATIC TEXTURE GENERATORS (PBR MAPS)
   ========================================================================= */

let memoShipWood: { diffuse: THREE.CanvasTexture; bump: THREE.CanvasTexture } | null = null
let memoPierWood: { diffuse: THREE.CanvasTexture; bump: THREE.CanvasTexture } | null = null

// High-detail weathered maritime oak planks (diffuse + bump)
function createWeatheredWoodTexture(isPier = false): { diffuse: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  if (isPier && memoPierWood) return memoPierWood
  if (!isPier && memoShipWood) return memoShipWood

  const size = 256
  const diffuseCanvas = document.createElement('canvas')
  diffuseCanvas.width = size
  diffuseCanvas.height = size
  const dCtx = diffuseCanvas.getContext('2d')!

  const bumpCanvas = document.createElement('canvas')
  bumpCanvas.width = size
  bumpCanvas.height = size
  const bCtx = bumpCanvas.getContext('2d')!

  const plankCount = isPier ? 10 : 8
  const plankH = size / plankCount

  for (let i = 0; i < plankCount; i++) {
    const y = i * plankH
    const toneVar = (Math.random() - 0.5) * 16
    const baseR = isPier ? 72 + toneVar : 58 + toneVar
    const baseG = isPier ? 48 + toneVar * 0.8 : 34 + toneVar * 0.7
    const baseB = isPier ? 30 + toneVar * 0.6 : 20 + toneVar * 0.5

    dCtx.fillStyle = `rgb(${baseR}, ${baseG}, ${baseB})`
    dCtx.fillRect(0, y, size, plankH)

    bCtx.fillStyle = `rgb(${128 + toneVar * 2}, ${128 + toneVar * 2}, ${128 + toneVar * 2})`
    bCtx.fillRect(0, y, size, plankH)

    // Wood grain fibers
    for (let g = 0; g < 6; g++) {
      const lineY = y + Math.random() * plankH
      const grainAlpha = 0.08 + Math.random() * 0.12
      dCtx.strokeStyle = Math.random() > 0.5 ? `rgba(20, 10, 5, ${grainAlpha})` : `rgba(110, 80, 50, ${grainAlpha * 0.7})`
      dCtx.lineWidth = 1 + Math.random() * 1.5
      dCtx.beginPath()
      dCtx.moveTo(0, lineY)
      dCtx.bezierCurveTo(
        size * 0.3, lineY + (Math.random() - 0.5) * 4,
        size * 0.7, lineY + (Math.random() - 0.5) * 4,
        size, lineY + (Math.random() - 0.5) * 3
      )
      dCtx.stroke()

      bCtx.strokeStyle = Math.random() > 0.5 ? 'rgba(80, 80, 80, 0.15)' : 'rgba(180, 180, 180, 0.15)'
      bCtx.lineWidth = 1
      bCtx.beginPath()
      bCtx.moveTo(0, lineY)
      bCtx.lineTo(size, lineY + (Math.random() - 0.5) * 2)
      bCtx.stroke()
    }

    // Plank seams
    dCtx.fillStyle = 'rgba(10, 5, 2, 0.95)'
    dCtx.fillRect(0, y + plankH - 2, size, 2)
    dCtx.fillStyle = 'rgba(130, 95, 65, 0.25)'
    dCtx.fillRect(0, y, size, 1)

    bCtx.fillStyle = 'rgb(0, 0, 0)'
    bCtx.fillRect(0, y + plankH - 2, size, 2)
    bCtx.fillStyle = 'rgb(220, 220, 220)'
    bCtx.fillRect(0, y, size, 1)
  }

  const diffuseTex = new THREE.CanvasTexture(diffuseCanvas)
  diffuseTex.wrapS = THREE.RepeatWrapping
  diffuseTex.wrapT = THREE.RepeatWrapping

  const bumpTex = new THREE.CanvasTexture(bumpCanvas)
  bumpTex.wrapS = THREE.RepeatWrapping
  bumpTex.wrapT = THREE.RepeatWrapping

  const result = { diffuse: diffuseTex, bump: bumpTex }
  if (isPier) memoPierWood = result
  else memoShipWood = result
  return result
}

let memoSailTex: THREE.CanvasTexture | null = null

// Authentic woven canvas linen sail texture with weathered panel seams
function createSailCanvasTexture(): THREE.CanvasTexture {
  if (memoSailTex) return memoSailTex

  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#eae2cc'
  ctx.fillRect(0, 0, size, size)

  // Fabric weave cross-hatch texture
  ctx.strokeStyle = 'rgba(160, 145, 125, 0.08)'
  ctx.lineWidth = 1
  for (let x = 0; x < size; x += 4) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, size)
    ctx.stroke()
  }
  for (let y = 0; y < size; y += 4) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(size, y)
    ctx.stroke()
  }

  // Vertical panel seams
  const panelWidth = size / 6
  for (let p = 1; p < 6; p++) {
    const x = p * panelWidth
    ctx.fillStyle = 'rgba(70, 55, 40, 0.22)'
    ctx.fillRect(x - 1, 0, 2, size)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.fillRect(x + 1, 0, 1, size)

    ctx.strokeStyle = 'rgba(90, 70, 50, 0.15)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(x - 2, 0)
    ctx.lineTo(x - 2, size)
    ctx.stroke()
  }

  // Edge weathering
  const grad = ctx.createRadialGradient(size / 2, size / 2, size * 0.35, size / 2, size / 2, size * 0.7)
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)')
  grad.addColorStop(1, 'rgba(80, 60, 35, 0.18)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  memoSailTex = texture
  return texture
}

let memoFlagTex: THREE.CanvasTexture | null = null

// Weathered, authentic Jolly Roger pirate flag texture
function createDistressedPirateFlagTexture(): THREE.CanvasTexture {
  if (memoFlagTex) return memoFlagTex

  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 320
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#0f1217'
  ctx.fillRect(0, 0, 512, 320)

  // Cloth weave texture
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
  for (let y = 0; y < 320; y += 3) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(512, y)
    ctx.stroke()
  }

  const cx = 256
  const cy = 135

  // Crossed Cutlasses
  ctx.lineWidth = 10
  ctx.strokeStyle = '#ded4be'
  ctx.beginPath()
  ctx.moveTo(110, 60)
  ctx.quadraticCurveTo(240, 150, 400, 240)
  ctx.stroke()
  ctx.moveTo(402, 60)
  ctx.quadraticCurveTo(270, 150, 110, 240)
  ctx.stroke()

  ctx.fillStyle = '#b89b5a'
  ctx.beginPath()
  ctx.arc(120, 70, 12, 0, Math.PI * 2)
  ctx.arc(392, 70, 12, 0, Math.PI * 2)
  ctx.fill()

  // Skull
  ctx.fillStyle = '#ded4be'
  ctx.beginPath()
  ctx.ellipse(cx, cy, 54, 58, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(cx - 36, cy + 22)
  ctx.lineTo(cx - 42, cy + 45)
  ctx.lineTo(cx - 24, cy + 72)
  ctx.lineTo(cx + 24, cy + 72)
  ctx.lineTo(cx + 42, cy + 45)
  ctx.lineTo(cx + 36, cy + 22)
  ctx.closePath()
  ctx.fill()

  // Eye Sockets
  ctx.fillStyle = '#0f1217'
  ctx.beginPath()
  ctx.ellipse(cx - 22, cy + 12, 14, 18, -0.15, 0, Math.PI * 2)
  ctx.ellipse(cx + 22, cy + 12, 14, 18, 0.15, 0, Math.PI * 2)
  ctx.fill()

  // Nasal Cavity
  ctx.beginPath()
  ctx.moveTo(cx, cy + 30)
  ctx.lineTo(cx - 7, cy + 48)
  ctx.lineTo(cx + 7, cy + 48)
  ctx.closePath()
  ctx.fill()

  // Teeth
  ctx.strokeStyle = '#0f1217'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(cx - 20, cy + 58)
  ctx.lineTo(cx + 20, cy + 58)
  for (let t = -16; t <= 16; t += 8) {
    ctx.moveTo(cx + t, cy + 52)
    ctx.lineTo(cx + t, cy + 68)
  }
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  memoFlagTex = texture
  return texture
}

let memoRippleMap: THREE.CanvasTexture | null = null

// Procedural high-frequency water normal map for ocean sparkle & ripples (Fast 64x64)
function createWaterRippleMap(): THREE.CanvasTexture {
  if (memoRippleMap) return memoRippleMap

  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const imgData = ctx.createImageData(size, size)
  const data = imgData.data

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4
      const nx = Math.sin((x / size) * Math.PI * 8) * Math.cos((y / size) * Math.PI * 6)
      const ny = Math.cos((x / size) * Math.PI * 6) * Math.sin((y / size) * Math.PI * 8)
      data[idx] = Math.floor((nx * 0.5 + 0.5) * 255)
      data[idx + 1] = Math.floor((ny * 0.5 + 0.5) * 255)
      data[idx + 2] = 255
      data[idx + 3] = 255
    }
  }

  ctx.putImageData(imgData, 0, 0)
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(24, 24)
  memoRippleMap = texture
  return texture
}

/* =========================================================================
   2. HIGH-DETAIL PALM FROND GEOMETRY WITH REAL ATTACHED LEAVES
   ========================================================================= */

// Builds a realistic tropical palm frond with a central arching stem (rachis)
// and 14 pairs of real, distinct green leaf blades attached along its sides!
function createPalmFrondWithLeavesGeo(): THREE.BufferGeometry {
  const branchLength = 17.0
  const pairs = 14
  const positions: number[] = []
  const normals: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  let vertIndex = 0

  // 1. Central branch stem (rachis)
  const stemSegments = 14
  for (let s = 0; s < stemSegments; s++) {
    const p1 = s / stemSegments
    const p2 = (s + 1) / stemSegments
    const z1 = p1 * branchLength
    const z2 = p2 * branchLength
    const y1 = -Math.pow(p1, 1.8) * 6.5 + Math.sin(p1 * Math.PI) * 1.5
    const y2 = -Math.pow(p2, 1.8) * 6.5 + Math.sin(p2 * Math.PI) * 1.5
    const w1 = (1 - p1 * 0.7) * 0.35
    const w2 = (1 - p2 * 0.7) * 0.35

    positions.push(-w1, y1, z1, w1, y1, z1, w2, y2, z2, -w2, y2, z2)
    for (let k = 0; k < 4; k++) {
      normals.push(0, 1, 0)
      uvs.push(0.5, p1)
    }
    indices.push(vertIndex, vertIndex + 1, vertIndex + 2, vertIndex, vertIndex + 2, vertIndex + 3)
    vertIndex += 4
  }

  // 2. Real tropical leaflets (leaves) attached along the branch
  for (let p = 1; p <= pairs; p++) {
    const fraction = p / (pairs + 1)
    const z = fraction * branchLength
    const y = -Math.pow(fraction, 1.8) * 6.5 + Math.sin(fraction * Math.PI) * 1.5

    // Leaflet dimensions: longest in middle of branch, tapering at base and tip
    const leafProfile = Math.sin(Math.pow(fraction, 0.7) * Math.PI)
    const leafLength = 2.5 + leafProfile * 4.0
    const leafWidth = 0.5 + leafProfile * 1.0
    const droop = 0.6 + leafProfile * 1.5
    const sweep = 0.8 + leafProfile * 1.6

    // Left Leaflet
    const leftTipX = -(leafLength * 0.95)
    const leftTipY = y - droop
    const leftTipZ = z + sweep

    positions.push(
      -0.1, y, z - leafWidth * 0.5,
      -0.1, y, z + leafWidth * 0.5,
      leftTipX, leftTipY, leftTipZ,
      -0.1, y, z
    )
    for (let k = 0; k < 4; k++) {
      normals.push(0, 1, 0)
      uvs.push(0, fraction)
    }
    indices.push(vertIndex, vertIndex + 1, vertIndex + 2)
    vertIndex += 4

    // Right Leaflet
    const rightTipX = leafLength * 0.95
    const rightTipY = y - droop
    const rightTipZ = z + sweep

    positions.push(
      0.1, y, z + leafWidth * 0.5,
      0.1, y, z - leafWidth * 0.5,
      rightTipX, rightTipY, rightTipZ,
      0.1, y, z
    )
    for (let k = 0; k < 4; k++) {
      normals.push(0, 1, 0)
      uvs.push(1, fraction)
    }
    indices.push(vertIndex, vertIndex + 1, vertIndex + 2)
    vertIndex += 4
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}

/* =========================================================================
   3. SHIP'S STEERING WHEEL GENERATOR (HELM MECHANISM)
   ========================================================================= */

function createShipSteeringWheel(
  woodMaterial: THREE.Material,
  brassMaterial: THREE.Material
): { helmGroup: THREE.Group; wheelGroup: THREE.Group } {
  const helmGroup = new THREE.Group()

  // 1. Wooden Binnacle / Helm Pedestal on Quarterdeck
  const pedestalGeo = new THREE.BoxGeometry(2.2, 4.2, 2.4)
  const pedestal = new THREE.Mesh(pedestalGeo, woodMaterial)
  pedestal.position.set(0, 2.1, 0)
  pedestal.castShadow = true
  helmGroup.add(pedestal)

  // Brass compass binnacle casing
  const binnacleGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.9, 12)
  const binnacle = new THREE.Mesh(binnacleGeo, brassMaterial)
  binnacle.position.set(0, 4.6, 0.3)
  helmGroup.add(binnacle)

  // Horizontal steering axle protruding forward
  const axleGeo = new THREE.CylinderGeometry(0.3, 0.3, 2.2, 10)
  axleGeo.rotateX(Math.PI / 2)
  const axle = new THREE.Mesh(axleGeo, brassMaterial)
  axle.position.set(0, 3.8, -0.6)
  helmGroup.add(axle)

  // 2. The Rotating Steering Wheel (Ship's Wheel)
  const wheelGroup = new THREE.Group()
  wheelGroup.position.set(0, 3.8, -1.6)
  helmGroup.add(wheelGroup)

  // Central Brass Hub
  const hubGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.6, 14)
  hubGeo.rotateX(Math.PI / 2)
  const hub = new THREE.Mesh(hubGeo, brassMaterial)
  hub.castShadow = true
  wheelGroup.add(hub)

  // Concentric Wooden Outer Rim
  const outerRimGeo = new THREE.TorusGeometry(2.3, 0.22, 10, 24)
  const outerRim = new THREE.Mesh(outerRimGeo, woodMaterial)
  outerRim.castShadow = true
  wheelGroup.add(outerRim)

  // Concentric Wooden Inner Rim
  const innerRimGeo = new THREE.TorusGeometry(1.4, 0.16, 8, 20)
  const innerRim = new THREE.Mesh(innerRimGeo, woodMaterial)
  innerRim.castShadow = true
  wheelGroup.add(innerRim)

  // 8 Turned Wooden Spokes passing through hub & rims
  const spokeCount = 8
  const spokeGeo = new THREE.CylinderGeometry(0.12, 0.16, 5.6, 8)
  const handleGeo = new THREE.CylinderGeometry(0.18, 0.12, 1.1, 8)

  for (let s = 0; s < spokeCount / 2; s++) {
    const angle = (s / (spokeCount / 2)) * Math.PI
    const spoke = new THREE.Mesh(spokeGeo, woodMaterial)
    spoke.rotation.z = angle
    wheelGroup.add(spoke)
  }

  // 8 Turned Handles (Grip Pegs extending past outer rim)
  for (let s = 0; s < spokeCount; s++) {
    const angle = (s / spokeCount) * Math.PI * 2
    const handle = new THREE.Mesh(handleGeo, woodMaterial)
    handle.position.set(Math.sin(angle) * 3.0, Math.cos(angle) * 3.0, 0)
    handle.rotation.z = -angle
    wheelGroup.add(handle)

    // Brass accent cap on tip of each handle
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.16, 6, 6), brassMaterial)
    cap.position.set(Math.sin(angle) * 3.6, Math.cos(angle) * 3.6, 0)
    wheelGroup.add(cap)
  }

  return { helmGroup, wheelGroup }
}

/* =========================================================================
   4. PROCEDURAL SOUND SYNTHESIZER FOR OCEAN SURF & BREEZE
   ========================================================================= */
class HarborAudioEngine {
  private ctx: AudioContext | null = null
  private noiseNode: AudioNode | null = null
  private gainNode: GainNode | null = null
  public isMuted = true

  init() {
    if (this.ctx) return
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new AudioCtx()

    const bufferSize = this.ctx.sampleRate * 2
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    let b0 = 0, b1 = 0, b2 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      output[i] = (b0 + b1 + b2) * 0.12
    }

    const whiteNoise = this.ctx.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    whiteNoise.loop = true

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(450, this.ctx.currentTime)

    const lfo = this.ctx.createOscillator()
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime)
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.setValueAtTime(240, this.ctx.currentTime)
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()

    this.gainNode = this.ctx.createGain()
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime)

    whiteNoise.connect(filter)
    filter.connect(this.gainNode)
    this.gainNode.connect(this.ctx.destination)
    whiteNoise.start()
    this.noiseNode = whiteNoise
  }

  setMute(mute: boolean) {
    this.isMuted = mute
    if (!this.ctx && !mute) {
      this.init()
    }
    if (this.ctx && this.ctx.state === 'suspended' && !mute) {
      this.ctx.resume()
    }
    if (this.gainNode && this.ctx) {
      const targetGain = mute ? 0 : 0.3
      this.gainNode.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.6)
    }
  }

  dispose() {
    if (this.noiseNode && 'stop' in this.noiseNode) {
      try {
        (this.noiseNode as AudioScheduledSourceNode).stop()
      } catch {
        // Source node may already be stopped
      }
      this.noiseNode = null
    }
    if (this.ctx) {
      this.ctx.close()
      this.ctx = null
    }
  }
}

/* =========================================================================
   5. MAIN COMPONENT: 3D CINEMATIC HARBOUR & GRAND ARRIVAL
   ========================================================================= */
function GrandArrivalIntro({ onComplete }: GrandArrivalIntroProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HarborAudioEngine | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [phase, setPhase] = useState<'approach' | 'identity' | 'docked'>('approach')
  const [isBoarding, setIsBoarding] = useState(false)
  const phaseRef = useRef<'approach' | 'identity' | 'docked'>('approach')

  useEffect(() => {
    audioRef.current = new HarborAudioEngine()
    return () => {
      audioRef.current?.dispose()
    }
  }, [])

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return
    const nextMute = !isMuted
    setIsMuted(nextMute)
    audioRef.current.setMute(nextMute)
  }, [isMuted])

  const handleBoardShip = useCallback(() => {
    if (isBoarding) return
    setIsBoarding(true)
    setTimeout(() => {
      onComplete()
    }, 600)
  }, [isBoarding, onComplete])

  const handleSkip = useCallback(() => {
    if (isBoarding) return
    setIsBoarding(true)
    setTimeout(() => {
      onComplete()
    }, 300)
  }, [isBoarding, onComplete])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let width = window.innerWidth
    let height = window.innerHeight

    // --- A. Scene, Camera, High-Fidelity Renderer ---
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x1a2e47, 0.0017)

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.5, 3500)
    camera.position.set(-70, 36, 115)

    const isMobile = width < 768 || /Android|iPhone|iPad/i.test(navigator.userAgent)
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: window.devicePixelRatio < 1.5,
      alpha: false,
    })
    renderer.setSize(width, height)
    // Optimized pixel ratio capped at 1.0 for mobile and 1.25 for desktop to avoid fill-rate bottleneck
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.25))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.08
    // Adaptive shadow map: Enabled with soft PCF filters on desktop; disabled on mobile to conserve GPU memory and eliminate hundreds of shadow draw calls
    renderer.shadowMap.enabled = !isMobile
    if (!isMobile) {
      renderer.shadowMap.type = THREE.PCFShadowMap
    }
    container.appendChild(renderer.domElement)

    // --- B. Realistic PBR Textures & Materials ---
    const shipWood = createWeatheredWoodTexture(false)
    shipWood.diffuse.repeat.set(3, 2)
    shipWood.bump.repeat.set(3, 2)

    const pierWood = createWeatheredWoodTexture(true)
    pierWood.diffuse.repeat.set(4, 2)
    pierWood.bump.repeat.set(4, 2)

    const sailTex = createSailCanvasTexture()
    sailTex.repeat.set(1.5, 1.5)

    const flagTex = createDistressedPirateFlagTexture()
    const waterRipple = createWaterRippleMap()

    const hullMaterial = new THREE.MeshStandardMaterial({
      map: shipWood.diffuse,
      bumpMap: shipWood.bump,
      bumpScale: 0.18,
      roughness: 0.72,
      metalness: 0.08,
      color: 0x3d2719,
    })

    const deckMaterial = new THREE.MeshStandardMaterial({
      map: shipWood.diffuse,
      bumpMap: shipWood.bump,
      bumpScale: 0.14,
      roughness: 0.82,
      metalness: 0.04,
      color: 0x4f3523,
    })

    const pierMaterial = new THREE.MeshStandardMaterial({
      map: pierWood.diffuse,
      bumpMap: pierWood.bump,
      bumpScale: 0.22,
      roughness: 0.88,
      metalness: 0.05,
      color: 0x4c3321,
    })

    const sailMaterial = new THREE.MeshStandardMaterial({
      map: sailTex,
      roughness: 0.88,
      metalness: 0.02,
      color: 0xf5eedb,
      side: THREE.DoubleSide,
      shadowSide: THREE.DoubleSide,
    })

    const weatheredGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc49b4c,
      metalness: 0.88,
      roughness: 0.28,
    })

    const agedIronMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2328,
      metalness: 0.82,
      roughness: 0.45,
    })

    const hempRopeMaterial = new THREE.MeshStandardMaterial({
      color: 0x82674b,
      roughness: 0.94,
    })

    const flagMaterial = new THREE.MeshStandardMaterial({
      map: flagTex,
      roughness: 0.85,
      side: THREE.DoubleSide,
    })

    // --- C. Lighting & Atmospheric Golden-Hour Sun ---
    const hemiLight = new THREE.HemisphereLight(0x8ec5ff, 0x3d7036, 2.6)
    scene.add(hemiLight)

    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768

    // Optimized directional sun with device-adaptive shadow map
    const sunLight = new THREE.DirectionalLight(0xffaf64, 3.4)
    sunLight.position.set(320, 110, -500)
    sunLight.castShadow = true
    const shadowMapSize = isMobileDevice ? 512 : 1024
    sunLight.shadow.mapSize.width = shadowMapSize
    sunLight.shadow.mapSize.height = shadowMapSize
    sunLight.shadow.camera.near = 10
    sunLight.shadow.camera.far = 1400
    sunLight.shadow.camera.left = -220
    sunLight.shadow.camera.right = 220
    sunLight.shadow.camera.top = 220
    sunLight.shadow.camera.bottom = -220
    sunLight.shadow.bias = -0.0003
    scene.add(sunLight)

    const ambientLight = new THREE.AmbientLight(0xfffaed, 0.95)
    scene.add(ambientLight)

    const lanternLight = new THREE.PointLight(0xff9922, 2.6, 95, 1.3)
    lanternLight.position.set(-28, 19, 22)
    lanternLight.castShadow = false
    scene.add(lanternLight)

    // --- D. Realistic Ocean Surface (Ultra-lightweight GPU normal ripple ocean) ---
    const oceanGeo = new THREE.PlaneGeometry(2800, 2800, 16, 16)
    oceanGeo.rotateX(-Math.PI / 2)

    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x092238,
      roughness: 0.14,
      metalness: 0.15,
      normalMap: waterRipple,
      normalScale: new THREE.Vector2(0.14, 0.14),
    })

    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat)
    oceanMesh.position.y = -0.5
    oceanMesh.receiveShadow = true
    scene.add(oceanMesh)

    // --- E. Atmospheric Sky Dome & Distant Mountains ---
    const skyGeo = new THREE.SphereGeometry(1800, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.5)
    const skyCanvas = document.createElement('canvas')
    skyCanvas.width = 512
    skyCanvas.height = 512
    const sCtx = skyCanvas.getContext('2d')!
    const skyGrad = sCtx.createLinearGradient(0, 0, 0, 512)
    skyGrad.addColorStop(0, '#10223d')
    skyGrad.addColorStop(0.55, '#2e3852')
    skyGrad.addColorStop(0.82, '#d6753d')
    skyGrad.addColorStop(1, '#ffab5e')
    sCtx.fillStyle = skyGrad
    sCtx.fillRect(0, 0, 512, 512)

    const skyTex = new THREE.CanvasTexture(skyCanvas)
    const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide })
    const skyMesh = new THREE.Mesh(skyGeo, skyMat)
    skyMesh.position.y = -50
    scene.add(skyMesh)

    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0x18283d,
      roughness: 0.95,
    })
    const mountain1 = new THREE.Mesh(new THREE.ConeGeometry(240, 150, 10), mountainMat)
    mountain1.position.set(300, 65, -820)
    scene.add(mountain1)

    const mountain2 = new THREE.Mesh(new THREE.ConeGeometry(190, 110, 10), mountainMat)
    mountain2.position.set(520, 45, -890)
    scene.add(mountain2)

    // --- F. Detailed Wooden Harbour Pier & Coastal Dock ---
    const harbourGroup = new THREE.Group()
    scene.add(harbourGroup)

    const pierDeckGeo = new THREE.BoxGeometry(46, 2.8, 142)
    const pierDeckMesh = new THREE.Mesh(pierDeckGeo, pierMaterial)
    pierDeckMesh.position.set(-48, 8.2, 20)
    pierDeckMesh.receiveShadow = true
    pierDeckMesh.castShadow = true
    harbourGroup.add(pierDeckMesh)

    const pilingGeo = new THREE.CylinderGeometry(1.6, 2.1, 28, 10)
    const algaeMat = new THREE.MeshStandardMaterial({
      color: 0x223625,
      roughness: 0.95,
    })
    for (let pz = -42; pz <= 82; pz += 24) {
      ;[-66, -30].forEach((px) => {
        const piling = new THREE.Mesh(pilingGeo, pierMaterial)
        piling.position.set(px, 3, pz)
        piling.castShadow = true
        piling.receiveShadow = true
        harbourGroup.add(piling)

        const mossRing = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.8, 4, 10), algaeMat)
        mossRing.position.set(px, 1.2, pz)
        harbourGroup.add(mossRing)
      })
    }

    const bollardGeo = new THREE.CylinderGeometry(1.3, 1.5, 4.2, 10)
    const bollardCapGeo = new THREE.CylinderGeometry(1.9, 1.5, 1.3, 10)
    const bollardPositions = [
      [-27, 10.8, -26],
      [-27, 10.8, 6],
      [-27, 10.8, 38],
      [-27, 10.8, 68],
    ]
    bollardPositions.forEach(([bx, by, bz]) => {
      const bMesh = new THREE.Mesh(bollardGeo, agedIronMaterial)
      bMesh.position.set(bx, by, bz)
      const cap = new THREE.Mesh(bollardCapGeo, agedIronMaterial)
      cap.position.y = 2.4
      bMesh.add(cap)
      bMesh.castShadow = true
      harbourGroup.add(bMesh)
    })

    const crateGeo = new THREE.BoxGeometry(7, 7, 7)
    const cratePositions = [
      [-52, 12.8, -15, 0.18],
      [-57, 12.8, -7, -0.22],
      [-54, 19.8, -11, 0.06],
      [-62, 12.8, 46, 0.38],
      [-56, 12.8, 54, -0.12],
    ]
    cratePositions.forEach(([cx, cy, cz, rot]) => {
      const crate = new THREE.Mesh(crateGeo, pierMaterial)
      crate.position.set(cx, cy, cz)
      crate.rotation.y = rot
      crate.castShadow = true
      crate.receiveShadow = true
      harbourGroup.add(crate)
    })

    const barrelGeo = new THREE.CylinderGeometry(3.2, 3.2, 8, 12)
    const hoopGeo = new THREE.CylinderGeometry(3.28, 3.28, 0.5, 12)
    const barrelPositions = [
      [-42, 13.2, -30],
      [-48, 13.2, -33],
      [-45, 13.2, -38],
      [-63, 13.2, 22],
      [-59, 13.2, 28],
    ]
    barrelPositions.forEach(([bx, by, bz]) => {
      const barrel = new THREE.Mesh(barrelGeo, hullMaterial)
      barrel.position.set(bx, by, bz)
      barrel.castShadow = true
      barrel.receiveShadow = true

      ;[-2.4, 2.4].forEach((hy) => {
        const hoop = new THREE.Mesh(hoopGeo, agedIronMaterial)
        hoop.position.y = hy
        barrel.add(hoop)
      })

      harbourGroup.add(barrel)
    })

    const postGeo = new THREE.CylinderGeometry(0.8, 1.2, 17, 8)
    const postMesh = new THREE.Mesh(postGeo, agedIronMaterial)
    postMesh.position.set(-28, 15.8, 22)
    postMesh.castShadow = true
    harbourGroup.add(postMesh)

    const lanternArm = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.7, 0.7), agedIronMaterial)
    lanternArm.position.set(1.6, 7.5, 0)
    postMesh.add(lanternArm)

    const glassLanternGeo = new THREE.CylinderGeometry(1.2, 1.6, 3.6, 6)
    const glassLanternMat = new THREE.MeshStandardMaterial({
      color: 0xffaa33,
      emissive: 0xff7711,
      emissiveIntensity: 2.2,
      roughness: 0.2,
    })
    const lantern = new THREE.Mesh(glassLanternGeo, glassLanternMat)
    lantern.position.set(3.2, 6, 0)
    postMesh.add(lantern)

    const coilGeo = new THREE.TorusGeometry(3.6, 1.2, 8, 16)
    coilGeo.rotateX(Math.PI / 2)
    const coilMesh = new THREE.Mesh(coilGeo, hempRopeMaterial)
    coilMesh.position.set(-36, 9.8, 12)
    harbourGroup.add(coilMesh)

    const shackGeo = new THREE.BoxGeometry(26, 18, 28)
    const shackMesh = new THREE.Mesh(shackGeo, pierMaterial)
    shackMesh.position.set(-84, 17.5, -10)
    shackMesh.castShadow = true
    shackMesh.receiveShadow = true
    harbourGroup.add(shackMesh)

    const roofGeo = new THREE.ConeGeometry(25, 12, 4)
    roofGeo.rotateY(Math.PI / 4)
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x3d2414, roughness: 0.9 })
    const roofMesh = new THREE.Mesh(roofGeo, roofMat)
    roofMesh.position.set(-84, 32.5, -10)
    roofMesh.castShadow = true
    harbourGroup.add(roofMesh)

    // --- G. Vibrant Tropical Island, Harbour Pier Trees & Lush Green Leaves ---
    const islandGroup = new THREE.Group()
    scene.add(islandGroup)

    const coastGeo = new THREE.CylinderGeometry(210, 330, 32, 24)
    const coastMat = new THREE.MeshStandardMaterial({
      color: 0x1b3d22,
      roughness: 0.82,
      metalness: 0.05,
    })
    const coastMesh = new THREE.Mesh(coastGeo, coastMat)
    coastMesh.position.set(-200, 6, -20)
    coastMesh.receiveShadow = true
    islandGroup.add(coastMesh)

    const sandGeo = new THREE.RingGeometry(185, 260, 28)
    sandGeo.rotateX(-Math.PI / 2)
    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xe2c38d,
      roughness: 0.85,
    })
    const sandMesh = new THREE.Mesh(sandGeo, sandMat)
    sandMesh.position.set(-180, 0.8, -20)
    islandGroup.add(sandMesh)

    // Shared Palm Frond Geometry with Real Modeled Tropical Leaflets (Attached to branches)
    const palmFrondGeo = createPalmFrondWithLeavesGeo()

    // Vibrant, rich tropical island green leaf material
    const palmLeafMat = new THREE.MeshStandardMaterial({
      color: 0x1e7e34, // Rich natural tropical leaf green
      emissive: 0x0c3b16, // Subtle leaf radiance for depth & clarity
      emissiveIntensity: 0.32,
      roughness: 0.38,
      metalness: 0.04,
      side: THREE.DoubleSide,
    })

    const palmTrunkMat = new THREE.MeshStandardMaterial({
      color: 0x8b5428,
      emissive: 0x2e1706,
      emissiveIntensity: 0.22,
      roughness: 0.68,
      metalness: 0.05,
    })

    const planterTubMat = new THREE.MeshStandardMaterial({
      color: 0x3d2719,
      roughness: 0.8,
    })

    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x24160c,
      roughness: 0.95,
    })

    const trunkGeo = new THREE.CylinderGeometry(0.85, 1.35, 24, 8)

    // Collection of tree crowns for subtle natural wind sway
    const treeCrowns: THREE.Group[] = []

    // Builds a complete palm tree with uniform branches and real green leaves!
    const createCompletePalmTree = (px: number, py: number, pz: number, heightScale = 1.0) => {
      const palm = new THREE.Group()
      palm.position.set(px, py, pz)

      const trunkH = 24 * heightScale

      const trunk = new THREE.Mesh(trunkGeo, palmTrunkMat)
      trunk.position.y = trunkH / 2
      trunk.scale.set(1, heightScale, 1)
      trunk.castShadow = true
      palm.add(trunk)

      // Crown of UNIFORM branches with green leaves attached
      const crown = new THREE.Group()
      crown.position.y = trunkH
      palm.add(crown)
      treeCrowns.push(crown)

      // Lower Tier: 6 uniformly spaced branches with leaves
      const lowerCount = 6
      for (let i = 0; i < lowerCount; i++) {
        const angle = (i / lowerCount) * Math.PI * 2
        const pivot = new THREE.Group()
        pivot.rotation.y = angle

        const frond = new THREE.Mesh(palmFrondGeo, palmLeafMat)
        frond.rotation.x = 0.28
        frond.castShadow = false
        pivot.add(frond)
        crown.add(pivot)
      }

      // Upper Tier: 5 uniformly spaced branches with leaves
      const upperCount = 5
      for (let i = 0; i < upperCount; i++) {
        const angle = (i / upperCount) * Math.PI * 2 + (Math.PI / upperCount)
        const pivot = new THREE.Group()
        pivot.rotation.y = angle

        const frond = new THREE.Mesh(palmFrondGeo, palmLeafMat)
        frond.rotation.x = 0.08
        frond.scale.setScalar(0.85)
        frond.castShadow = false
        pivot.add(frond)
        crown.add(pivot)
      }

      return palm
    }

    // High-Performance Merged 3D Tropical Leaf Cluster Geometry (Built once, 0 runtime allocations)
    const createMergedLeafClusterGeo = (): THREE.BufferGeometry => {
      const positions: number[] = []
      const normals: number[] = []
      const uvs: number[] = []
      const indices: number[] = []
      let vertOffset = 0

      const leafCount = 6
      for (let l = 0; l < leafCount; l++) {
        const angle = (l / leafCount) * Math.PI * 2
        const cosA = Math.cos(angle)
        const sinA = Math.sin(angle)
        const leafL = 6.8 + (l % 3) * 1.2
        const leafW = 2.0

        const segments = 4
        for (let s = 0; s < segments; s++) {
          const f1 = s / segments
          const f2 = (s + 1) / segments

          const z1 = f1 * leafL
          const z2 = f2 * leafL
          const y1 = -Math.pow(f1, 1.8) * 2.8 + Math.sin(f1 * Math.PI) * 1.0
          const y2 = -Math.pow(f2, 1.8) * 2.8 + Math.sin(f2 * Math.PI) * 1.0
          const w1 = leafW * Math.sin(f1 * Math.PI * 0.9) * 0.5
          const w2 = leafW * Math.sin(f2 * Math.PI * 0.9) * 0.5

          const localPts = [
            [-w1, y1, z1],
            [w1, y1, z1],
            [w2, y2, z2],
            [-w2, y2, z2]
          ]

          localPts.forEach(([lx, ly, lz]) => {
            const rx = lx * cosA - lz * sinA
            const rz = lx * sinA + lz * cosA
            positions.push(rx, ly, rz)
            normals.push(0, 1, 0)
            uvs.push(0.5, f1)
          })

          indices.push(
            vertOffset, vertOffset + 1, vertOffset + 2,
            vertOffset, vertOffset + 2, vertOffset + 3
          )
          vertOffset += 4
        }
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
      geo.setIndex(indices)
      geo.computeVertexNormals()
      return geo
    }

    const mergedLeafClusterGeo = createMergedLeafClusterGeo()
    const deckLeafClusters: THREE.Mesh[] = []

    const createDeckLeafCluster = (px: number, py: number, pz: number, scale = 1.0) => {
      const mesh = new THREE.Mesh(mergedLeafClusterGeo, palmLeafMat)
      mesh.position.set(px, py, pz)
      mesh.scale.setScalar(scale)
      mesh.castShadow = false
      deckLeafClusters.push(mesh)
      return mesh
    }

    // --- 1. PLANT TREES WITH LEAVES DIRECTLY ON THE LANDING PIER DECK ---
    const dockPlanterGeo = new THREE.CylinderGeometry(3.2, 2.6, 3.4, 10)
    const soilGeo = new THREE.CylinderGeometry(3.0, 3.0, 0.4, 10)

    const deckTreePositions = [
      [-38, 9.6, 5, 0.88],   // Mid-dock directly framing the docked ship
      [-42, 9.6, 35, 0.92],  // Stern dock bollard framing ship quarterdeck
      [-44, 9.6, -26, 0.88], // North end near lantern & bow
    ]

    deckTreePositions.forEach(([tx, ty, tz, scale]) => {
      const tub = new THREE.Mesh(dockPlanterGeo, planterTubMat)
      tub.position.set(tx, ty + 1.7, tz)
      tub.castShadow = true
      tub.receiveShadow = true
      harbourGroup.add(tub)

      const soil = new THREE.Mesh(soilGeo, soilMat)
      soil.position.set(tx, ty + 3.2, tz)
      harbourGroup.add(soil)

      // Complete palm tree with leafy canopy
      const palm = createCompletePalmTree(tx, ty + 3.4, tz, scale)
      harbourGroup.add(palm)

      // Lush tropical leaves fanning around the planter base
      const leaves = createDeckLeafCluster(tx, ty + 3.4, tz, 0.85)
      harbourGroup.add(leaves)
    })

    // --- 2. PLANT TROPICAL LEAF CLUSTERS ON THE LANDING PIER DECK ---
    const deckLeafPositions = [
      [-30, 9.6, 20, 1.15],
      [-32, 9.6, -6, 1.0],
      [-54, 9.6, -5, 1.1],
    ]

    deckLeafPositions.forEach(([lx, ly, lz, scale]) => {
      const leafCluster = createDeckLeafCluster(lx, ly, lz, scale)
      harbourGroup.add(leafCluster)
    })

    // --- 3. SHORELINE PALM TREES & JUNGLE FOLIAGE (STRATEGICALLY FRAMED) ---
    const shorePalmPositions = [
      [-70, 10, -5, 1.0],
      [-85, 12, 35, 1.05],
    ]

    shorePalmPositions.forEach(([px, py, pz, hScale]) => {
      const palm = createCompletePalmTree(px, py, pz, hScale)
      islandGroup.add(palm)

      const baseLeaves = createDeckLeafCluster(px, py, pz, 1.1)
      islandGroup.add(baseLeaves)
    })

    // --- H. Magnificent 3D Pirate Galleon ---
    const ship = new THREE.Group()
    scene.add(ship)

    const hullGroup = new THREE.Group()
    ship.add(hullGroup)

    // Hydrodynamic Main Hull
    const keelGeo = new THREE.BoxGeometry(17, 13, 98)
    const keel = new THREE.Mesh(keelGeo, hullMaterial)
    keel.position.y = 2.8
    keel.castShadow = true
    keel.receiveShadow = true
    hullGroup.add(keel)

    const shipBellyGeo = new THREE.CylinderGeometry(15.5, 10.5, 92, 16, 1, false, 0, Math.PI)
    shipBellyGeo.rotateZ(Math.PI)
    shipBellyGeo.rotateY(Math.PI / 2)
    const shipBelly = new THREE.Mesh(shipBellyGeo, hullMaterial)
    shipBelly.position.set(0, 5.2, 0)
    shipBelly.scale.set(1.35, 0.85, 1.05)
    shipBelly.castShadow = true
    hullGroup.add(shipBelly)

    const shipDeckGeo = new THREE.BoxGeometry(23.5, 1.8, 92)
    const shipDeck = new THREE.Mesh(shipDeckGeo, deckMaterial)
    shipDeck.position.set(0, 9.8, 0)
    shipDeck.receiveShadow = true
    hullGroup.add(shipDeck)

    // Raised Quarterdeck & High Stern Castle
    const sternCastleGeo = new THREE.BoxGeometry(21.5, 10.5, 34)
    const sternCastle = new THREE.Mesh(sternCastleGeo, hullMaterial)
    sternCastle.position.set(0, 15.2, 29)
    sternCastle.castShadow = true
    hullGroup.add(sternCastle)

    // Stern Gallery & Balcony
    const sternBalconyGeo = new THREE.BoxGeometry(19.5, 3.5, 4.2)
    const sternBalcony = new THREE.Mesh(sternBalconyGeo, weatheredGoldMaterial)
    sternBalcony.position.set(0, 15.5, 46.5)
    hullGroup.add(sternBalcony)

    // Stern Lanterns
    const sternLanternGeo = new THREE.CylinderGeometry(0.85, 1.25, 3.0, 8)
    const sternLanternMat = new THREE.MeshStandardMaterial({
      color: 0xffaa33,
      emissive: 0xff6600,
      emissiveIntensity: 1.8,
    })
    ;[-8.5, 0, 8.5].forEach((lx) => {
      const sl = new THREE.Mesh(sternLanternGeo, sternLanternMat)
      sl.position.set(lx, 19.5, 46.2)
      hullGroup.add(sl)
    })

    // Raised Forecastle
    const bowCastleGeo = new THREE.BoxGeometry(17.5, 8.2, 23)
    const bowCastle = new THREE.Mesh(bowCastleGeo, hullMaterial)
    bowCastle.position.set(0, 13.2, -35.5)
    bowCastle.castShadow = true
    hullGroup.add(bowCastle)

    // Bowsprit Spar & Golden Figurehead
    const bowspritGeo = new THREE.CylinderGeometry(0.9, 1.8, 42, 8)
    bowspritGeo.rotateX(Math.PI / 2.7)
    const bowsprit = new THREE.Mesh(bowspritGeo, deckMaterial)
    bowsprit.position.set(0, 15.2, -61)
    hullGroup.add(bowsprit)

    const figureheadGeo = new THREE.ConeGeometry(2.4, 7.5, 8)
    figureheadGeo.rotateX(-Math.PI / 3)
    const figurehead = new THREE.Mesh(figureheadGeo, weatheredGoldMaterial)
    figurehead.position.set(0, 12.2, -49)
    hullGroup.add(figurehead)

    // --- I. SHIP STEERING WHEEL (HELM MECHANISM ON QUARTERDECK) ---
    const { helmGroup, wheelGroup } = createShipSteeringWheel(deckMaterial, weatheredGoldMaterial)
    helmGroup.position.set(0, 20.45, 36.5)
    hullGroup.add(helmGroup)

    // Broadside Deck Cannons
    const cannonBarrelGeo = new THREE.CylinderGeometry(0.65, 1.05, 5.8, 8)
    cannonBarrelGeo.rotateZ(Math.PI / 2)
    ;[-22, -10, 4, 18, 30].forEach((zPos) => {
      ;[-1, 1].forEach((side) => {
        const cannon = new THREE.Mesh(cannonBarrelGeo, agedIronMaterial)
        cannon.position.set(side * 12.4, 10.8, zPos)
        hullGroup.add(cannon)
      })
    })

    // Railings with Balusters along Forecastle and Quarterdeck
    const railTopGeo = new THREE.BoxGeometry(1.2, 0.8, 32)
    const starRail = new THREE.Mesh(railTopGeo, deckMaterial)
    starRail.position.set(11, 21.2, 29)
    const portRail = new THREE.Mesh(railTopGeo, deckMaterial)
    portRail.position.set(-11, 21.2, 29)
    hullGroup.add(starRail, portRail)

    // --- J. Masts, Rigging & Billowing Sails ---
    const sailMeshes: THREE.Mesh[] = []

    const buildMast = (
      z: number,
      height: number,
      tiers: { y: number; width: number; height: number; depthCurve: number }[],
      hasFlag: boolean
    ) => {
      const mastGroup = new THREE.Group()
      mastGroup.position.set(0, 9.8, z)

      const poleGeo = new THREE.CylinderGeometry(1.2, 1.9, height, 10)
      const pole = new THREE.Mesh(poleGeo, deckMaterial)
      pole.position.y = height / 2
      pole.castShadow = true
      mastGroup.add(pole)

      const nestGeo = new THREE.CylinderGeometry(4.8, 3.8, 3.8, 10, 1, true)
      const nest = new THREE.Mesh(nestGeo, hullMaterial)
      nest.position.y = height * 0.72
      nest.castShadow = true
      mastGroup.add(nest)

      // Shrouds & Ladder Ratlines
      const ropeLinesGeo = new THREE.BufferGeometry()
      const ropeVerts: number[] = []
      ;[-1, 1].forEach((side) => {
        for (let r = 0; r < 5; r++) {
          const deckZ = (r - 2) * 5.8
          ropeVerts.push(0, height * 0.72, 0)
          ropeVerts.push(side * 11.5, 0, deckZ)
        }
        for (let step = 4; step < height * 0.7; step += 3.5) {
          const spread = (1 - step / (height * 0.72)) * 11.5
          ropeVerts.push(side * spread * 0.8, step, -6)
          ropeVerts.push(side * spread * 0.8, step, 6)
        }
      })
      ropeLinesGeo.setAttribute('position', new THREE.Float32BufferAttribute(ropeVerts, 3))
      const ropeMat = new THREE.LineBasicMaterial({ color: 0x1a130c, opacity: 0.65, transparent: true })
      const lines = new THREE.LineSegments(ropeLinesGeo, ropeMat)
      mastGroup.add(lines)

      // Yardarms & Billowing Sails
      tiers.forEach((tier) => {
        const yardGeo = new THREE.CylinderGeometry(0.65, 0.85, tier.width * 1.15, 8)
        yardGeo.rotateZ(Math.PI / 2)
        const yard = new THREE.Mesh(yardGeo, deckMaterial)
        yard.position.y = tier.y + tier.height / 2
        yard.castShadow = true
        mastGroup.add(yard)

        const sailGeo = new THREE.PlaneGeometry(tier.width, tier.height, 10, 10)
        const sPos = sailGeo.attributes.position
        for (let i = 0; i < sPos.count; i++) {
          const vx = sPos.getX(i) / (tier.width / 2)
          const vy = sPos.getY(i) / (tier.height / 2)
          const billow = Math.cos(vx * Math.PI * 0.5) * Math.cos(vy * Math.PI * 0.5) * tier.depthCurve
          sPos.setZ(i, -billow)
        }
        sailGeo.computeVertexNormals()

        const sMesh = new THREE.Mesh(sailGeo, sailMaterial)
        sMesh.position.set(0, tier.y, 0)
        sMesh.castShadow = true
        sMesh.receiveShadow = true
        mastGroup.add(sMesh)
        sailMeshes.push(sMesh)
      })

      if (hasFlag) {
        const flagGeo = new THREE.PlaneGeometry(18, 11, 8, 4)
        flagGeo.rotateY(Math.PI / 2)
        const flag = new THREE.Mesh(flagGeo, flagMaterial)
        flag.position.set(0, height + 2, 7)
        flag.castShadow = true
        mastGroup.add(flag)
        sailMeshes.push(flag)
      }

      ship.add(mastGroup)
    }

    // Foremast
    buildMast(-26, 62, [
      { y: 15, width: 28, height: 18, depthCurve: 4.8 },
      { y: 35, width: 22, height: 14, depthCurve: 3.6 },
      { y: 51, width: 15, height: 10, depthCurve: 2.6 },
    ], false)

    // Mainmast (Tallest mast with Pirate Flag)
    buildMast(3, 74, [
      { y: 18, width: 34, height: 20, depthCurve: 5.8 },
      { y: 41, width: 26, height: 16, depthCurve: 4.4 },
      { y: 59, width: 17, height: 12, depthCurve: 3.2 },
    ], true)

    // Mizzenmast
    buildMast(29, 54, [
      { y: 14, width: 24, height: 15, depthCurve: 4.0 },
      { y: 32, width: 17, height: 12, depthCurve: 3.0 },
    ], false)

    // Triangular Jib Headsails
    const createJibSail = (p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3) => {
      const geo = new THREE.BufferGeometry()
      const verts = new Float32Array([
        p1.x, p1.y, p1.z,
        p2.x, p2.y, p2.z,
        p3.x, p3.y, p3.z,
      ])
      geo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
      geo.computeVertexNormals()
      const jib = new THREE.Mesh(geo, sailMaterial)
      jib.castShadow = true
      return jib
    }

    const jib1 = createJibSail(
      new THREE.Vector3(0, 15, -60),
      new THREE.Vector3(0, 38, -26),
      new THREE.Vector3(0, 16, -34)
    )
    const jib2 = createJibSail(
      new THREE.Vector3(0, 15, -78),
      new THREE.Vector3(0, 48, -26),
      new THREE.Vector3(0, 18, -48)
    )
    ship.add(jib1, jib2)

    // --- K. Mooring Ropes (Connected Upon Physical Docking) ---
    const dockingRopesGroup = new THREE.Group()
    scene.add(dockingRopesGroup)

    const createDockingRope = (start: THREE.Vector3, end: THREE.Vector3) => {
      const curve = new THREE.CatmullRomCurve3([
        start,
        new THREE.Vector3(
          (start.x + end.x) / 2,
          Math.min(start.y, end.y) - 1.8,
          (start.z + end.z) / 2
        ),
        end
      ])
      const tubeGeo = new THREE.TubeGeometry(curve, 14, 0.35, 6, false)
      const tubeMesh = new THREE.Mesh(tubeGeo, hempRopeMaterial)
      tubeMesh.castShadow = true
      return tubeMesh
    }

    let bowRopeMesh: THREE.Mesh | null = null
    let sternRopeMesh: THREE.Mesh | null = null

    // --- L. Circling Seagulls ---
    const seagullCount = 6
    const seagulls: { mesh: THREE.Group; speed: number; radius: number; angle: number; yOffset: number }[] = []
    const birdGeo = new THREE.BufferGeometry()
    const birdVerts = new Float32Array([
      -3.2, 0.4, 0,  0, 0, 1.5,  0, 0, -1.5,
       3.2, 0.4, 0,  0, 0, -1.5,  0, 0, 1.5,
    ])
    birdGeo.setAttribute('position', new THREE.BufferAttribute(birdVerts, 3))
    const birdMat = new THREE.MeshBasicMaterial({ color: 0xededee, side: THREE.DoubleSide })

    for (let b = 0; b < seagullCount; b++) {
      const gGroup = new THREE.Group()
      const wingMesh = new THREE.Mesh(birdGeo, birdMat)
      gGroup.add(wingMesh)
      scene.add(gGroup)

      seagulls.push({
        mesh: gGroup,
        speed: 0.35 + Math.random() * 0.18,
        radius: 65 + Math.random() * 75,
        angle: (b / seagullCount) * Math.PI * 2,
        yOffset: 38 + Math.random() * 24,
      })
    }

    // --- M. FAST CINEMATIC ANIMATION & PHYSICAL DOCKING LOOP (5.2 SECONDS) ---
    let animationFrameId: number
    let frameCount = 0
    let lastRenderTime = 0
    const clock = new THREE.Clock()
    const totalDuration = 5.2 // 5.2 seconds total: fast, cinematic, and responsive

    const render = (now: number) => {
      // Pause rendering if tab is hidden to save CPU/GPU cycles
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      // Once docked, cap frame rate to 30 FPS (every ~33ms) to eliminate idle CPU/battery usage
      if (phaseRef.current === 'docked' && now - lastRenderTime < 32) {
        animationFrameId = requestAnimationFrame(render)
        return
      }
      lastRenderTime = now

      frameCount++
      const elapsed = clock.getElapsedTime()
      const t = Math.min(elapsed / totalDuration, 1.0)

      // UI phase milestones (only updates React state when phase actually changes)
      if (elapsed >= 4.5 && phaseRef.current !== 'docked') {
        phaseRef.current = 'docked'
        setPhase('docked')
      } else if (elapsed >= 1.5 && phaseRef.current === 'approach') {
        phaseRef.current = 'identity'
        setPhase('identity')
      }

      // 1. High-Performance GPU Ocean Surface (0 CPU vertex re-uploads, 100% GPU normal ripple shimmer)
      waterRipple.offset.x = elapsed * 0.035
      waterRipple.offset.y = elapsed * 0.025
      oceanMesh.position.y = Math.sin(elapsed * 1.6) * 0.4

      // 2. Continuous Sailing & Docking Trajectory (5.2-Second Timeline)
      let curShipX = 0
      let curShipZ = 0
      let curShipRotY = 0
      let curSpeedFactor = 1.0

      if (t < 0.30) {
        // Phase 1: Rapid ocean approach from horizon (0s -> 1.56s)
        const p = t / 0.30
        curShipX = THREE.MathUtils.lerp(140, 65, p)
        curShipZ = THREE.MathUtils.lerp(-340, -160, p)
        curShipRotY = Math.PI * 0.95
        curSpeedFactor = 1.0
      } else if (t < 0.65) {
        // Phase 2: Curving swiftly into harbour channel (1.56s -> 3.38s)
        const p = (t - 0.30) / 0.35
        curShipX = THREE.MathUtils.lerp(65, 15, p)
        curShipZ = THREE.MathUtils.lerp(-160, -45, p)
        curShipRotY = THREE.MathUtils.lerp(Math.PI * 0.95, Math.PI * 1.03, p)
        curSpeedFactor = 0.85
      } else if (t < 0.86) {
        // Phase 3: Entering port & aligning alongside wooden dock (3.38s -> 4.47s)
        const p = (t - 0.65) / 0.21
        const easeP = 1 - Math.pow(1 - p, 3)
        curShipX = THREE.MathUtils.lerp(15, -5, easeP)
        curShipZ = THREE.MathUtils.lerp(-45, 20, easeP)
        curShipRotY = THREE.MathUtils.lerp(Math.PI * 1.03, Math.PI, easeP)
        curSpeedFactor = THREE.MathUtils.lerp(0.85, 0.05, easeP)
      } else {
        // Phase 4: Settle naturally alongside pier with buoyancy damping (4.47s -> 5.2s)
        const p = (t - 0.86) / 0.14
        const settle = Math.sin(p * Math.PI * 2) * (1 - p) * 0.9
        curShipX = -5 + settle * 0.25
        curShipZ = 20
        curShipRotY = Math.PI
        curSpeedFactor = 0.0

        if (elapsed >= 4.5 && !bowRopeMesh && !sternRopeMesh) {
          bowRopeMesh = createDockingRope(
            new THREE.Vector3(-13.5, 11, -12),
            new THREE.Vector3(-27, 11, -26)
          )
          sternRopeMesh = createDockingRope(
            new THREE.Vector3(-13.5, 13, 38),
            new THREE.Vector3(-27, 11, 38)
          )
          dockingRopesGroup.add(bowRopeMesh, sternRopeMesh)
        }
      }

      // Buoyancy Physics
      const rollAmp = curSpeedFactor > 0.2 ? 0.045 : 0.016
      const pitchAmp = curSpeedFactor > 0.2 ? 0.035 : 0.01
      const heaveAmp = curSpeedFactor > 0.2 ? 1.4 : 0.55

      const shipRoll = Math.sin(elapsed * 3.0) * rollAmp
      const shipPitch = Math.cos(elapsed * 2.2) * pitchAmp
      const shipHeave = Math.sin(elapsed * 3.2) * heaveAmp

      ship.position.set(curShipX, shipHeave, curShipZ)
      ship.rotation.set(shipPitch, curShipRotY, shipRoll)

      // Steering Wheel Dynamic Rotation: turns into the rudder angle during channel curve
      if (wheelGroup) {
        const steerAngle = (curShipRotY - Math.PI) * 5.0
        const subtleIdle = Math.sin(elapsed * 4.0) * 0.2
        wheelGroup.rotation.z = steerAngle + (curSpeedFactor > 0.1 ? subtleIdle : 0)
      }

      // Sails wind breathing (calms upon docking)
      const sailBillowAmp = curSpeedFactor > 0.2 ? 0.35 : 0.06
      sailMeshes.forEach((sail, sIdx) => {
        const wind = Math.sin(elapsed * 4.5 + sIdx * 0.8) * sailBillowAmp
        sail.rotation.x = wind * 0.035
      })

      // Dock lantern candle flame flicker
      lanternLight.intensity = 2.4 + Math.sin(elapsed * 9.0) * 0.2

      // Subtle breeze swaying on trees and undergrowth leaves
      const breeze = elapsed * 2.5
      treeCrowns.forEach((crown, cIdx) => {
        crown.rotation.z = Math.sin(breeze + cIdx * 0.7) * 0.035
      })
      deckLeafClusters.forEach((cl, idx) => {
        cl.rotation.y = Math.sin(breeze + idx) * 0.05
      })

      // Seagulls circling smoothly
      seagulls.forEach((sg, idx) => {
        sg.angle += sg.speed * 0.03
        const sx = -40 + Math.cos(sg.angle) * sg.radius
        const sz = 10 + Math.sin(sg.angle) * sg.radius
        sg.mesh.position.set(sx, sg.yOffset + Math.sin(elapsed * 3 + idx) * 2.8, sz)
        sg.mesh.rotation.y = -sg.angle + Math.PI / 2
        sg.mesh.children[0].scale.y = 0.5 + Math.sin(elapsed * 10 + idx) * 0.5
      })

      // 3. Fast Cinematic Camera Sequence (6 Seconds)
      if (t < 0.28) {
        // Establishing: Look from wooden dock toward open sea
        const p = t / 0.28
        camera.position.x = THREE.MathUtils.lerp(-72, -54, p)
        camera.position.y = THREE.MathUtils.lerp(36, 27, p)
        camera.position.z = THREE.MathUtils.lerp(115, 82, p)
        camera.lookAt(ship.position.x * 0.6, 15, ship.position.z)
      } else if (t < 0.62) {
        // Pursuit: Gliding low along channel as vessel approaches
        const p = (t - 0.28) / 0.34
        camera.position.x = THREE.MathUtils.lerp(-54, -22, p)
        camera.position.y = THREE.MathUtils.lerp(27, 21, p)
        camera.position.z = THREE.MathUtils.lerp(82, -22, p)
        camera.lookAt(ship.position.x, 15, ship.position.z)
      } else if (t < 0.85) {
        // Docking Alignment Angle: Watch ship glide parallel to pier
        const p = (t - 0.62) / 0.23
        camera.position.x = THREE.MathUtils.lerp(-22, -56, p)
        camera.position.y = THREE.MathUtils.lerp(21, 18.5, p)
        camera.position.z = THREE.MathUtils.lerp(-22, -10, p)
        camera.lookAt(ship.position.x, 14, ship.position.z)
      } else {
        // Final Hero Composition: Pier planks, glowing lantern, leafy trees & docked vessel with helm wheel
        const p = (t - 0.85) / 0.15
        const easeP = 1 - Math.pow(1 - p, 3)
        camera.position.x = THREE.MathUtils.lerp(-56, -51, easeP)
        camera.position.y = THREE.MathUtils.lerp(18.5, 17, easeP)
        camera.position.z = THREE.MathUtils.lerp(-10, -5, easeP)
        camera.lookAt(-5, 14, 20)
      }

      // Freeze shadow map recalculation once docked to save 50%+ GPU draw calls per frame
      if (elapsed >= 4.8 && renderer.shadowMap.enabled && renderer.shadowMap.autoUpdate) {
        renderer.shadowMap.autoUpdate = false
        renderer.shadowMap.needsUpdate = true
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)

      // Recursively dispose scene geometries, materials and textures
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        if (mesh.material) {
          const mat = mesh.material
          const disposeMat = (m: any) => {
            if (m.map) m.map.dispose()
            if (m.bumpMap) m.bumpMap.dispose()
            if (m.normalMap) m.normalMap.dispose()
            m.dispose()
          }
          if (Array.isArray(mat)) {
            mat.forEach(disposeMat)
          } else {
            disposeMat(mat)
          }
        }
      })

      renderer.dispose()
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  const showIntroPlaque = phase === 'approach'
  const showCaptainTitle = phase === 'identity' || phase === 'docked'
  const isDocked = phase === 'docked'

  return (
    <div
      className={`fixed inset-0 z-[200] overflow-hidden bg-[#0a1525] select-none transition-opacity duration-500 ${
        isBoarding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 3D WebGL Harbour Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Smooth Subtle Cinematic Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(5, 10, 20, 0.6) 100%)',
        }}
      />

      {/* Minimalist Cinematic Anamorphic Letterboxes */}
      <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none flex items-center justify-between px-6 sm:px-12">
        <span className="text-[10px] tracking-[0.35em] font-serif text-amber-200/60 uppercase">
          PORT ROYAL ARCHIPELAGO
        </span>
        <span className="text-[10px] tracking-[0.3em] font-mono text-white/30 uppercase hidden sm:inline">
          APPROACH VECTOR · 17°N 76°W
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none flex items-center justify-between px-6 sm:px-12">
        <span className="text-[10px] tracking-[0.3em] font-serif text-white/40 uppercase">
          EXPEDITION FLAGSHIP
        </span>
        <span className="text-[10px] tracking-[0.25em] font-mono text-amber-300/60 uppercase">
          {isDocked ? 'SECURED AT HARBOUR' : 'ENTERING PORT'}
        </span>
      </div>

      {/* Top Action Controls: Ocean Audio & Instant Skip Intro */}
      <div className="absolute top-14 sm:top-18 right-5 sm:right-10 z-30 pointer-events-auto flex items-center gap-3">
        {/* Ocean Waves Audio Toggle */}
        <button
          onClick={toggleAudio}
          aria-label={isMuted ? 'Listen to ocean waves' : 'Mute ocean audio'}
          className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-amber-300 border border-amber-400/40 hover:border-amber-400 shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
          title={isMuted ? 'Listen to ocean waves' : 'Mute ocean audio'}
        >
          {isMuted ? <FaVolumeXmark className="text-xs opacity-75" /> : <FaVolumeHigh className="text-xs" />}
        </button>

        {/* Skip Intro Button */}
        <button
          onClick={handleSkip}
          aria-label="Skip intro to portfolio"
          className="group px-4 py-2 rounded-full bg-black/60 hover:bg-black/85 text-amber-100 font-serif text-xs tracking-[0.2em] uppercase border border-amber-400/50 hover:border-amber-400 shadow-md flex items-center gap-2 transition-all duration-300 cursor-pointer active:scale-95"
        >
          <span className="font-semibold text-xs text-amber-200">SKIP INTRO</span>
          <FaForward className="text-[10px] text-amber-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Cinematic Film Typography */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-14 z-20">
        {/* Phase 1: Quiet Ocean Title */}
        <div
          className={`mt-14 sm:mt-18 text-center mx-auto transition-all duration-700 ease-out ${
            showIntroPlaque
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-serif tracking-[0.45em] text-amber-200/80 uppercase block">
            WELCOME ABOARD
          </span>
          <div className="w-8 h-[1px] bg-amber-400/40 mx-auto my-2" />
          <p className="text-xs sm:text-sm font-serif italic text-white/70 tracking-widest">
            The voyage to uncharted waters begins
          </p>
        </div>

        {/* Phase 2: Captain's Identity */}
        <div
          className={`mt-12 sm:mt-16 max-w-sm bg-black/55 backdrop-blur-md p-4 sm:p-5 rounded-sm border border-amber-400/25 shadow-xl pointer-events-none transition-all duration-700 ease-out ${
            showCaptainTitle
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-5'
          }`}
        >
          <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-amber-400 font-semibold block mb-1">
            PORTFOLIO EXPEDITION
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-50 tracking-[0.18em] uppercase">
            YAMAN CHAHAR
          </h1>
          <p className="text-[11px] font-serif text-amber-200/90 tracking-[0.2em] uppercase font-medium mt-1 mb-2">
            FULL-STACK DEVELOPER · AI/ML ENTHUSIAST
          </p>
          <p className="text-[11px] font-serif text-white/60 italic border-t border-amber-400/15 pt-2 leading-relaxed">
            “Every great journey begins with a destination.”
          </p>
        </div>

        {/* FINAL ARRIVAL: "BOARD THE SHIP" Button (Appears immediately upon docking) */}
        <div
          className={`mb-12 sm:mb-16 mx-auto text-center pointer-events-auto transition-all duration-500 ease-out ${
            isDocked
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="relative group inline-block">
            <div className="absolute -inset-1 rounded-full bg-amber-500/25 filter blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300" />

            <button
              onClick={handleBoardShip}
              aria-label="Board the ship and enter portfolio"
              className="relative px-8 sm:px-11 py-3.5 rounded-full bg-gradient-to-r from-[#1c130b] via-[#2d1c10] to-[#1c130b] text-amber-50 font-serif text-xs sm:text-sm tracking-[0.28em] uppercase font-semibold border border-amber-400/70 hover:border-amber-300 shadow-[0_8px_25px_rgba(0,0,0,0.7)] flex items-center gap-3.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <GiShipWheel className="text-lg sm:text-xl text-amber-400 group-hover:rotate-45 transition-transform duration-500 ease-out" />
              <span className="relative z-10 text-amber-100 tracking-[0.25em]">
                BOARD THE SHIP
              </span>
              <FaAnchor className="text-xs sm:text-sm text-amber-400/80 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>

          <span className="block mt-2 text-[9px] font-mono tracking-[0.28em] text-amber-300/70 uppercase">
            VESSEL SECURED · CLICK TO DISEMBARK
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(GrandArrivalIntro)
