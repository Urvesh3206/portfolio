import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Summary.css'

gsap.registerPlugin(ScrollTrigger)

export default function Summary() {
  const sectionRef = useRef(null)
  const wordsRef = useRef(null)

  useEffect(() => {
    const words = wordsRef.current.querySelectorAll('.summary-word')

    gsap.fromTo(
      words,
      { opacity: 0.1, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'center 40%',
          scrub: 0.5,
        },
      }
    )
  }, [])

  const text =
    'Eager Computer Science graduate with foundational knowledge in Java and algorithm design. Focused on creating efficient code and building functional applications.'
  const words = text.split(' ')

  return (
    <section ref={sectionRef} id="summary" className="summary">
      <div className="summary-inner">
        <div className="summary-label-row">
          <span className="section-index">01</span>
          <span className="section-label">Summary</span>
          <span className="section-line" />
        </div>

        <p ref={wordsRef} className="summary-text">
          {words.map((word, i) => (
            <span key={i} className="summary-word">
              {word}{' '}
            </span>
          ))}
        </p>

        <div className="summary-aside">
          <div className="summary-aside-item">
            <span className="summary-aside-number">4.0</span>
            <span className="summary-aside-label">GPA</span>
          </div>
          <div className="summary-aside-item">
            <span className="summary-aside-number">18%</span>
            <span className="summary-aside-label">Performance Gain</span>
          </div>
          <div className="summary-aside-item">
            <span className="summary-aside-number">30%</span>
            <span className="summary-aside-label">Attendance Boost</span>
          </div>
        </div>
      </div>
    </section>
  )
}
