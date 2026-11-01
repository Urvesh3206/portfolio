import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'energy-saver',
    title: 'Energy Saver',
    subtitle: 'Smart Grid Demand Prediction',
    description:
      'Built a smart grid energy demand prediction application designed for rural development, utilizing Green AI methodologies to minimize computational overhead while maximizing accuracy.',
    longDescription:
      'The platform analyzes historical energy consumption patterns and weather data to forecast demand peaks, enabling proactive grid management. Implemented with a focus on sustainability — using efficient model architectures that reduce carbon footprint without sacrificing prediction quality.',
    tech: ['Python', 'Streamlit', 'Green AI', 'Machine Learning', 'Pandas', 'Scikit-learn'],
    category: 'AI / ML',
    accent: '#c4f042',
    role: 'Full-Stack Developer',
    highlights: [
      'Green AI methodology for sustainable computing',
      'Real-time demand forecasting dashboard',
      'Rural development focused solution',
    ],
    github: 'https://github.com/Urvesh3206',
  },
  {
    id: 'stress-detection',
    title: 'Stress Detection',
    subtitle: 'CBT-Based Mental Health Platform',
    description:
      'Developed a Cognitive Behavioral Therapy (CBT) based mental health platform that assesses and classifies user stress levels through an intelligent assessment system.',
    longDescription:
      'The application guides users through clinically-informed questionnaires, processes responses using classification algorithms, and provides personalized feedback. Built with an intuitive, calming interface designed to reduce friction for users experiencing high stress.',
    tech: ['Python', 'CBT Framework', 'Classification', 'Frontend', 'Data Analysis'],
    category: 'Health Tech',
    accent: '#4a9eff',
    role: 'Lead Developer',
    highlights: [
      'CBT-based clinical assessment framework',
      'Automatic stress category classification',
      'Intuitive user-centric interface design',
    ],
    github: 'https://github.com/Urvesh3206',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const items = sectionRef.current.querySelectorAll('.project-item')

    items.forEach((item) => {
      const visual = item.querySelector('.project-visual')
      const content = item.querySelector('.project-content')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        visual,
        { scale: 0.85, opacity: 0, x: -40 },
        { scale: 1, opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
      ).fromTo(
        content,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      )
    })
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="projects">
      <div className="projects-inner">
        <div className="summary-label-row">
          <span className="section-index">03</span>
          <span className="section-label">Projects</span>
          <span className="section-line" />
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <article key={project.id} className="project-item">
              <div className="project-visual">
                <div
                  className="project-visual-bg"
                  style={{
                    background: `radial-gradient(circle at ${
                      index % 2 === 0 ? '30% 40%' : '70% 60%'
                    }, ${project.accent}15, transparent 60%)`,
                  }}
                />
                <div className="project-visual-frame">
                  <div className="project-visual-topbar">
                    <span className="pv-dot" style={{ background: '#ff5f57' }} />
                    <span className="pv-dot" style={{ background: '#febc2e' }} />
                    <span className="pv-dot" style={{ background: '#28c840' }} />
                    <span className="pv-title-bar">{project.id}.py</span>
                  </div>
                  <div className="project-visual-code">
                    <code>
                      <span className="code-comment"># {project.subtitle}</span>
                      <br />
                      <span className="code-kw">class</span>{' '}
                      <span className="code-cls">{project.title.replace(/\s/g, '')}</span>
                      :<br />
                      {'    '}
                      <span className="code-kw">def</span>{' '}
                      <span className="code-fn">__init__</span>(self):<br />
                      {'        '}self.status = <span className="code-str">"production"</span>
                      <br />
                      {'        '}self.impact = <span className="code-str">"high"</span>
                      <br />
                      {'        '}self.category = <span className="code-str">"{project.category}"</span>
                      <br /><br />
                      {'    '}
                      <span className="code-kw">def</span>{' '}
                      <span className="code-fn">run</span>(self):<br />
                      {'        '}<span className="code-kw">return</span>{' '}
                      <span className="code-str">"✓ deployed"</span>
                    </code>
                  </div>
                </div>

                <div
                  className="project-visual-float-tag"
                  style={{ borderColor: project.accent, color: project.accent }}
                >
                  {project.category}
                </div>

                <div className="project-visual-role-tag">
                  {project.role}
                </div>
              </div>

              <div className="project-content">
                <div className="project-content-header">
                  <span className="project-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="project-category">{project.category}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <h4 className="project-subtitle">{project.subtitle}</h4>
                <p className="project-desc">{project.description}</p>
                <p className="project-desc project-desc--secondary">{project.longDescription}</p>

                <div className="project-highlights">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="project-highlight">
                      <span className="project-highlight-dot" style={{ background: project.accent }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="project-tech-tag"
                      style={{ borderColor: `${project.accent}40` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-github-link"
                  style={{ '--link-accent': project.accent }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>View on GitHub</span>
                  <span className="project-link-arrow">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
