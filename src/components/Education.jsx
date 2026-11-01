import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Education.css'

gsap.registerPlugin(ScrollTrigger)

const education = [
  {
    degree: 'B.Tech — Computer Science Engineering',
    institution: 'Ajeenkya D Y Patil College of Engineering',
    location: 'Pune, Maharashtra',
    grade: 'GPA 4.0 / 4.0',
    gradeAccent: true,
    period: '2021 — 2025',
  },
  {
    degree: 'Diploma — Information Technology',
    institution: "MAEER'S MIT Polytechnic",
    location: 'Pune, Maharashtra',
    grade: '76%',
    gradeAccent: false,
    period: '2018 — 2021',
  },
]

export default function Education() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const items = sectionRef.current.querySelectorAll('.edu-item')

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} id="education" className="education">
      <div className="education-inner">
        <div className="summary-label-row">
          <span className="section-index">04</span>
          <span className="section-label">Education</span>
          <span className="section-line" />
        </div>

        <div className="edu-timeline">
          <div className="edu-timeline-line" />

          {education.map((edu, index) => (
            <div
              key={index}
              className={`edu-item edu-item--${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="edu-item-dot" />

              <div className="edu-item-card">
                <div className="edu-item-header">
                  <span className="edu-period">{edu.period}</span>
                  <span
                    className={`edu-grade ${edu.gradeAccent ? 'edu-grade--accent' : ''}`}
                  >
                    {edu.grade}
                  </span>
                </div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <h4 className="edu-institution">{edu.institution}</h4>
                <span className="edu-location">{edu.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
