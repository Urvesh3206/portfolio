import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    id: 'isearch',
    org: 'I SEARCH',
    role: 'Full-Stack Web Development Intern',
    period: 'Jun — Jul 2023',
    description:
      'Built responsive HTML/CSS/JS interfaces, improving site performance by 18%, and integrated third-party APIs for enhanced functionality.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'API Integration'],
    metric: '+18%',
    metricLabel: 'Site Performance',
  },
  {
    id: 'ieee',
    org: 'IEEE ADYPU',
    role: 'Chair & Treasurer — Student Branch',
    period: '2023 — 2024',
    description:
      'Directed strategic initiatives, supervised 20 volunteers, and improved event attendance by 30% through innovative outreach programs.',
    tags: ['Leadership', 'Strategy', 'Event Management', 'Budgeting'],
    metric: '+30%',
    metricLabel: 'Event Attendance',
  },
]

export default function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.exp-card')

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          y: 80,
          opacity: 0,
          rotateY: i % 2 === 0 ? -4 : 4,
        },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="experience">
      <div className="experience-inner">
        <div className="summary-label-row">
          <span className="section-index">02</span>
          <span className="section-label">Experience</span>
          <span className="section-line" />
        </div>

        <div className="exp-grid">
          {experiences.map((exp, index) => (
            <article
              key={exp.id}
              className={`exp-card exp-card--${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="exp-card-header">
                <div className="exp-card-org-wrap">
                  <span className="exp-card-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="exp-card-org">{exp.org}</h3>
                </div>
                <span className="exp-card-period">{exp.period}</span>
              </div>

              <h4 className="exp-card-role">{exp.role}</h4>
              <p className="exp-card-desc">{exp.description}</p>

              <div className="exp-card-footer">
                <div className="exp-card-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="exp-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="exp-card-metric">
                  <span className="exp-metric-value">{exp.metric}</span>
                  <span className="exp-metric-label">{exp.metricLabel}</span>
                </div>
              </div>

              <div className="exp-card-glow" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
