import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  {
    label: 'Languages',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'C++', level: 75 },
      { name: 'C', level: 70 },
    ],
  },
  {
    label: 'Web',
    skills: [
      { name: 'HTML5', level: 92 },
      { name: 'CSS3', level: 88 },
    ],
  },
  {
    label: 'Concepts',
    skills: [
      { name: 'Data Structures', level: 85 },
      { name: 'OOP', level: 88 },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const orbits = sectionRef.current.querySelectorAll('.skill-orb')
    const bars = sectionRef.current.querySelectorAll('.skill-bar-fill')

    gsap.fromTo(
      orbits,
      { scale: 0, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    bars.forEach((bar) => {
      const width = bar.dataset.level + '%'
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="skills">
      <div className="skills-inner">
        <div className="summary-label-row">
          <span className="section-index">05</span>
          <span className="section-label">Skills</span>
          <span className="section-line" />
        </div>

        {/* Floating Orbs Layout */}
        <div className="skills-orbs">
          {skillGroups.flatMap((group) =>
            group.skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-orb"
                style={{
                  '--orb-size': `${skill.level * 1.1 + 30}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              >
                <span className="skill-orb-name">{skill.name}</span>
                <span className="skill-orb-level">{skill.level}</span>
              </div>
            ))
          )}
        </div>

        {/* Detailed Breakdown */}
        <div className="skills-breakdown">
          {skillGroups.map((group) => (
            <div key={group.label} className="skill-group">
              <h3 className="skill-group-label">{group.label}</h3>
              <div className="skill-group-items">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="skill-row">
                    <div className="skill-row-header">
                      <span className="skill-row-name">{skill.name}</span>
                      <span className="skill-row-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        data-level={skill.level}
                        style={{
                          '--bar-color':
                            skill.level >= 85
                              ? 'var(--color-accent)'
                              : skill.level >= 75
                              ? 'var(--color-warm)'
                              : 'var(--color-cool)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
