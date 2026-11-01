import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const titleRef = useRef(null)
  const metaRef = useRef(null)
  const lineRef = useRef(null)
  const socialsRef = useRef(null)
  const portraitRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: 'power4.inOut' }
    )
    .fromTo(
      nameRef.current.querySelectorAll('.hero-char'),
      { y: 120, opacity: 0, rotateX: -80 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: 'power4.out',
      },
      '-=0.8'
    )
    .fromTo(
      portraitRef.current,
      { y: 80, opacity: 0, scale: 0.9, rotateY: 15 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1.3,
        ease: 'power3.out',
      },
      '-=1.0'
    )
    .fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.7'
    )
    .fromTo(
      metaRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(
      socialsRef.current.children,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
      '-=0.3'
    )
  }, [])

  // Interactive mouse tilt on portrait
  const handleMouseMove = (e) => {
    if (!portraitRef.current) return
    const rect = portraitRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(portraitRef.current, {
      rotateY: (x / rect.width) * 14,
      rotateX: (-y / rect.height) * 14,
      duration: 0.6,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!portraitRef.current) return
    gsap.to(portraitRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  const nameChars = 'URVESH RANE'.split('')

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-inner">
        <div className="hero-top-label">
          <span className="hero-label-dot" />
          <span>Available for opportunities</span>
        </div>

        <div ref={lineRef} className="hero-line" />

        <div className="hero-body-grid">
          <div className="hero-content">
            <h1 ref={nameRef} className="hero-name">
              {nameChars.map((char, i) => (
                <span
                  key={i}
                  className={`hero-char ${char === ' ' ? 'hero-space' : ''}`}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            <p ref={titleRef} className="hero-title">
              <span className="hero-title-accent">Computer Science</span> Engineering
              <br />
              Student — Pune, Maharashtra
            </p>

            <div ref={metaRef} className="hero-meta">
              <a href="mailto:urveshrane3206@gmail.com" className="hero-meta-item">
                <span className="hero-meta-label">email</span>
                <span className="hero-meta-value">urveshrane3206@gmail.com</span>
              </a>
              <div className="hero-meta-item">
                <span className="hero-meta-label">phone</span>
                <span className="hero-meta-value">+91 9373571631</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-label">location</span>
                <span className="hero-meta-value">Pune, India</span>
              </div>
            </div>

            <div ref={socialsRef} className="hero-socials">
              <a
                href="https://github.com/Urvesh3206"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
                <span className="hero-social-arrow">↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/urvesh-rane-984295339/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-link"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
                <span className="hero-social-arrow">↗</span>
              </a>
            </div>
          </div>

          <div
            className="hero-portrait-wrapper"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div ref={portraitRef} className="hero-portrait-card">
              <div className="portrait-glare" />
              <div className="portrait-frame">
                <span className="portrait-corner portrait-corner--tl" />
                <span className="portrait-corner portrait-corner--tr" />
                <span className="portrait-corner portrait-corner--bl" />
                <span className="portrait-corner portrait-corner--br" />

                <div className="portrait-status-badge">
                  <span className="portrait-status-dot" />
                  <span>DEV // ADYPU CSE</span>
                </div>

                <img
                  src="/profile.jpg"
                  alt="Urvesh Rane — Computer Science Engineer"
                  className="portrait-img"
                  loading="eager"
                />

                <div className="portrait-caption">
                  <span className="portrait-caption-label">URVESH RANE</span>
                  <span className="portrait-caption-loc">18.5204° N, 73.8567° E</span>
                </div>
              </div>

              <div className="portrait-backdrop-glow" />
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <div className="hero-scroll-line" />
          <span>scroll to explore</span>
        </div>
      </div>
    </section>
  )
}
