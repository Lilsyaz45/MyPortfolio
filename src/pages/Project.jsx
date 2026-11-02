import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { projects } from '../data/site'
import { Split } from '../components/Text'
import { TLink } from '../components/Transition'
import Media from '../components/Media'
import NotFound from './NotFound'
import { gsap, setBgColors } from '../lib/motion'
import { useEnter, useGsap } from '../lib/hooks'

export default function Project() {
  const { slug } = useParams()
  const root = useRef(null)
  const idx = projects.findIndex((p) => p.slug === slug)
  const p = projects[idx]
  const next = projects[(idx + 1) % projects.length]

  useEffect(() => {
    if (p) setBgColors(p.palette[0], p.palette[1])
    return () => setBgColors()
  }, [p])

  useEnter(
    root,
    () => {
      if (!p) return
      gsap
        .timeline()
        .from('.proj-title .split-char', { yPercent: 115, rotate: 6, stagger: 0.03, duration: 1.2, ease: 'expo.out' })
        .from('.proj-reveal', { opacity: 0, y: 24, stagger: 0.06, duration: 0.8, ease: 'power3.out' }, 0.3)
        .fromTo(
          '.proj-hero-media',
          { clipPath: 'inset(30% 12% 30% 12% round 28px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.6, ease: 'expo.inOut' },
          0.2
        )
        .from('.proj-hero-media .media', { scale: 1.4, duration: 1.8, ease: 'expo.inOut' }, 0.2)
    },
    [slug]
  )

  useGsap(
    root,
    () => {
      if (!p) return
      gsap.to('.proj-hero-media .media', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '.proj-hero-media', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.utils.toArray('.proj-fade').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
      gsap.utils.toArray('.proj-gallery-item').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0 0 0 round 22px)' },
          {
            clipPath: 'inset(0% 0 0 0 round 22px)',
            duration: 1.3,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })
      gsap.from('.proj-next-title .split-char', {
        yPercent: 110,
        stagger: 0.03,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.proj-next', start: 'top 80%' },
      })
    },
    [slug]
  )

  if (!p) return <NotFound />

  const gallery = p.gallery.length ? p.gallery : [null, null, null]

  return (
    <div className="page page-project" ref={root} style={{ '--pc': p.color }}>
      <section className="proj-head container">
        <div className="proj-top">
          <TLink to="/work" label="Work" className="proj-back proj-reveal">
            ← All work
          </TLink>
          <div className="proj-top-actions">
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-live-badge proj-reveal"
                data-cursor="view"
                data-cursor-text="Launch"
                data-cursor-color={p.color}
              >
                <span>Live Site: {p.link.replace(/^https?:\/\//, '')} ↗</span>
              </a>
            )}
            <span className="proj-reveal dim proj-counter">
              {String(idx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>
        <h1 className="proj-title display fs-xxl">
          <Split text={p.title} />
        </h1>
        <div className="proj-meta">
          <div className="proj-reveal">
            <span className="eyebrow">Client</span>
            <span>{p.client}</span>
          </div>
          <div className="proj-reveal">
            <span className="eyebrow">Year</span>
            <span>{p.year}</span>
          </div>
          <div className="proj-reveal">
            <span className="eyebrow">Discipline</span>
            <span>{p.disciplines.join(', ')}</span>
          </div>
          <div className="proj-reveal">
            <span className="eyebrow">Industry</span>
            <span>{p.industries.join(', ')}</span>
          </div>
          {p.link && (
            <div className="proj-reveal proj-meta-live">
              <span className="eyebrow">Live Website</span>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-ext-link">
                {p.link.replace(/^https?:\/\//, '')} ↗
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="container">
        <div className="proj-hero-media">
          <Media project={p} autoPlay eager />
        </div>
      </section>

      <section className="proj-body container section">
        <div className="proj-summary-wrap proj-fade">
          <p className="proj-summary serif fs-lg">{p.summary}</p>
          {p.link && (
            <div className="proj-launch-bar">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn proj-launch-btn"
                data-cursor="view"
                data-cursor-text="Play"
                data-cursor-color={p.color}
              >
                <span>Explore Live Platform ({p.link.replace(/^https?:\/\//, '')}) ↗</span>
              </a>
            </div>
          )}
        </div>
        <div className="proj-desc proj-fade">
          <p className="fs-md">{p.description}</p>
          <dl className="proj-credits">
            {p.credits.map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow">{k}</dt>
                <dd>
                  {typeof v === 'string' && v.startsWith('http') ? (
                    <a href={v} target="_blank" rel="noopener noreferrer" className="proj-credit-link">
                      {v} ↗
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="proj-gallery container">
        {gallery.map((g, i) => (
          <div className={`proj-gallery-item proj-gallery-item--${i % 3}`} key={i}>
            {g ? (
              /\.(mp4|webm|mov)$/i.test(g) ? (
                <video src={g} muted loop playsInline autoPlay />
              ) : (
                <img src={g} alt={`${p.title} still ${i + 1}`} loading="lazy" />
              )
            ) : (
              <Media
                project={{
                  ...p,
                  cover: '',
                  video: '',
                  art: ['orb', 'rings', 'grid', 'blobs', 'stripes', 'conic'][(idx + i + 1) % 6],
                }}
              />
            )}
          </div>
        ))}
      </section>

      <section className="proj-next section container">
        <span className="eyebrow">Next project</span>
        <TLink
          to={`/work/${next.slug}`}
          label={next.title}
          className="proj-next-link"
          data-cursor="view"
          data-cursor-text="Next"
          data-cursor-color={next.color}
          style={{ '--nc': next.color }}
        >
          <h2 className="proj-next-title display fs-xxl">
            <Split text={next.title} />
          </h2>
          <div className="proj-next-media">
            <Media project={next} active />
          </div>
        </TLink>
      </section>
    </div>
  )
}
