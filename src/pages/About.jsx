import { useRef } from 'react'
import { profile, techCategories } from '../data/site'
import { Split } from '../components/Text'
import Marquee from '../components/Marquee'
import { ArtCover } from '../components/Media'
import { gsap } from '../lib/motion'
import { useEnter, useGsap } from '../lib/hooks'

export default function About() {
  const root = useRef(null)

  useEnter(root, () => {
    gsap
      .timeline()
      .from('.about-title .split-char', { yPercent: 115, rotate: 8, stagger: 0.03, duration: 1.2, ease: 'expo.out' })
      .fromTo(
        '.about-portrait',
        { clipPath: 'inset(100% 0 0 0 round 200px 200px 28px 28px)' },
        { clipPath: 'inset(0% 0 0 0 round 200px 200px 28px 28px)', duration: 1.5, ease: 'expo.inOut' },
        0.2
      )
      .from('.about-reveal', { opacity: 0, y: 30, stagger: 0.1, duration: 1, ease: 'power3.out' }, 0.5)
  })

  useGsap(root, () => {
    gsap.to('.about-portrait-inner', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: { trigger: '.about-portrait', start: 'top bottom', end: 'bottom top', scrub: true },
    })
    gsap.utils.toArray('.svc-row').forEach((row) => {
      gsap.from(row, {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: row, start: 'top 88%' },
      })
    })
    gsap.utils.toArray('.tech-card').forEach((card, idx) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: idx * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%' },
      })
    })
  })

  return (
    <div className="page page-about" ref={root}>
      <section className="about-hero container">
        <h1 className="about-title display fs-xxl">
          <Split text="Hello, I'm" />
          <br />
          <span className="serif accent">
            <Split text={profile.nickname} />
          </span>
        </h1>

        <div className="about-grid">
          <div className="about-portrait">
            <div className="about-portrait-inner">
              {profile.portrait ? (
                <img src={profile.portrait} alt={`${profile.firstName} ${profile.lastName}`} />
              ) : (
                <ArtCover variant="blobs" palette={['#c6ff3d', '#7b5cff', '#121214']} />
              )}
            </div>
            <span className="about-badge">
              <span className="status-dot" /> {profile.available ? 'Open to work' : 'Booked'}
            </span>
          </div>

          <div className="about-copy">
            <span className="eyebrow about-reveal">{profile.role}</span>
            {profile.bio.map((b, i) => (
              <p key={i} className={`about-reveal ${i === 0 ? 'fs-lg' : 'fs-md dim'}`}>
                {b}
              </p>
            ))}
            <div className="about-facts about-reveal">
              <div>
                <span className="eyebrow">Based in</span>
                <span>{profile.location}</span>
              </div>
              <div>
                <span className="eyebrow">Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              {profile.resume && (
                <div>
                  <span className="eyebrow">Resume</span>
                  <a href={profile.resume} target="_blank" rel="noreferrer">
                    Download ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <span className="eyebrow">Services</span>
        <div className="svc-list">
          {profile.services.map((s, i) => (
            <div className="svc-row" key={s.title} data-cursor="hover">
              <span className="svc-num dim">0{i + 1}</span>
              <h3 className="svc-title display fs-lg">{s.title}</h3>
              <p className="svc-text dim">{s.text}</p>
              <span className="svc-arrow">↗</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container tech-section">
        <span className="eyebrow">Skills &amp; Technology Stack</span>
        <h2 className="display fs-xl tech-heading">
          Engineered for <br />
          <span className="serif accent">performance &amp; scale</span>
        </h2>
        <div className="tech-grid">
          {techCategories.map((cat) => (
            <div className="tech-card" key={cat.category} data-cursor="hover">
              <div className="tech-card-header">
                <span className="tech-card-num dim">{cat.icon}</span>
                <h3 className="display fs-md">{cat.category}</h3>
              </div>
              <p className="dim tech-card-summary">{cat.summary}</p>
              <div className="tech-pills">
                {cat.skills.map((skill) => (
                  <span className="tech-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="clients">
        <span className="eyebrow container">Tools &amp; stack marquee</span>
        <Marquee speed={45}>
          {profile.stack.map((c) => (
            <span key={c} className="client display">
              {c} <span className="band-star">✺</span>
            </span>
          ))}
        </Marquee>
        <Marquee speed={35} reverse>
          {profile.stack.map((c) => (
            <span key={c} className="client serif">
              {c} <span className="band-star">●</span>
            </span>
          ))}
        </Marquee>
      </section>
    </div>
  )
}
