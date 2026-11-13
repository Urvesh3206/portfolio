import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FloatingScene from './components/FloatingScene'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Summary from './components/Summary'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Skills from './components/Skills'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Highly-optimized, responsive smooth scrolling
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    // Update ScrollTrigger without triggering any React state changes
    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateLenis)
    }
  }, [])

  return (
    <div ref={containerRef} className="app">
      <Cursor />
      
      {/* 3D Background Canvas - runs completely outside React render loop */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 55 }}
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.75)]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
        >
          <FloatingScene />
        </Canvas>
      </div>

      {/* HTML Overlay */}
      <div className="content-layer">
        <Navbar />
        <Hero />
        <Summary />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        <Footer />
      </div>
    </div>
  )
}
