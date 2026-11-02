import { useEffect, useRef, useState } from 'react'
import { profile, projects } from '../data/site'
import { Split } from '../components/Text'
import { TLink } from '../components/Transition'
import Marquee from '../components/Marquee'
import Magnetic from '../components/Magnetic'
import Media, { ArtCover } from '../components/Media'
import { gsap, setBgColors } from '../lib/motion'
import { useEnter, useGsap, isTouch } from '../lib/hooks'

function RotatingWord({ words }) {
  const [i, setI] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const id = setInterval(() => {
      gsap.to(ref.current.querySelectorAll('.split-char'), {
        yPercent: -110,
        rotate: -8,
        stagger: 0.025,
        duration: 0.45,
        ease: 'power3.in',
        onComplete: () => setI((n) => (n + 1) % words.length),
      })
    }, 2600)
    return () => clearInterval(id)
  }, [words.length])
  useEffect(() => {
    gsap.fromTo(
      ref.current.querySelectorAll('.split-char'),
      { yPercent: 110, rotate: 8 },
      { yPercent: 0, rotate: 0, stagger: 0.03, duration: 0.7, ease: 'expo.out' }
    )
  }, [i])
  return (
    <span className="rotator accent" ref={ref}>
      <Split text={words[i]} />
    </span>
  )
}

function Hero() {
  const root = useRef(null)

  useEnter(root, () => {
    gsap
      .timeline()
      .from('.hero-line .split-char', { yPercent: 115, rotate: 10, stagger: 0.035, duration: 1.3, ease: 'expo.out' })
      .from('.hero-mid', { opacity: 0, scale: 0.9, duration: 1, ease: 'expo.out' }, 0.4)
      .from('.hero-reveal', { opacity: 0, y: 30, stagger: 0.08, duration: 1, ease: 'power3.out' }, 0.5)
      .from('.hero-blob', { scale: 0, duration: 1.6, ease: 'elastic.out(1,0.6)' }, 0.2)
  })

  // pointer parallax + blob follow
  useEffect(() => {
    if (isTouch()) return
    const lines = root.current.querySelectorAll('[data-depth]')
    const blob = root.current.querySelector('.hero-blob')
    const bx = gsap.quickTo(blob, 'x', { duration: 1.4, ease: 'power3.out' })
    const by = gsap.quickTo(blob, 'y', { duration: 1.4, ease: 'power3.out' })
    const move = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      lines.forEach((l) => {
        const d = parseFloat(l.dataset.depth)
        gsap.to(l, { x: nx * d * 60, y: ny * d * 30, duration: 1.2, ease: 'power3.out' })
      })
      const r = root.current.getBoundingClientRect()
      bx(e.clientX - r.left)
      by(e.clientY - r.top)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  // scroll-out
  useGsap(root, () => {
    gsap.to('.hero-title', {
      scale: 0.86,
      opacity: 0.15,
      filter: 'blur(6px)',
      ease: 'none',
      scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
    })
  })

  return (
    <section className="hero container" ref={root}>
      <div className="hero-blob" aria-hidden="true" />
      <div className="hero-top">
        <span className="eyebrow hero-reveal">{profile.available ? 'Available for freelance' : 'Currently booked'}</span>
        <span className="dim hero-reveal">{profile.role}</span>
      </div>

      <h1 className="hero-title display fs-mega">
        <span className="hero-line" data-depth="0.6" style={{ '--len': profile.firstName.length }}>
          <Split text={profile.firstName} />
        </span>
        <span className="hero-mid" data-depth="1.2">
          <span className="serif">building</span> <RotatingWord words={profile.roles} />
        </span>
        <span className="hero-line hero-line--right" data-depth="0.9" style={{ '--len': profile.lastName.length }}>
          <Split text={profile.lastName} />
        </span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-intro fs-md hero-reveal">{profile.intro}</p>
        <div className="hero-scroll hero-reveal" aria-hidden="true">
          <svg viewBox="0 0 100 100" className="hero-scroll-ring">
            <defs>
              <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text>
              <textPath href="#circ">SCROLL TO EXPLORE • SCROLL TO EXPLORE • </textPath>
            </text>
          </svg>
          <span className="hero-scroll-arrow">↓</span>
        </div>
        <Magnetic>
          <span className="hero-reveal hero-cta-wrap">
            <TLink to="/work" label="Work" className="pill-btn" data-cursor="hide">
              <span data-magnetic-inner>See all work ↗</span>
            </TLink>
          </span>
        </Magnetic>
      </div>
    </section>
  )
}

function Band() {
  return (
    <div className="band-wrap">
      <div className="band band--a">
        <Marquee speed={70}>
          {profile.roles.concat(profile.roles).map((r, i) => (
            <span key={i} className="band-item display">
              {r} <span className="band-star">✺</span>
            </span>
          ))}
        </Marquee>
      </div>
      <div className="band band--b">
        <Marquee speed={55} reverse>
          {profile.services.map((s, i) => (
            <span key={i} className="band-item serif">
              {s.title} <span className="band-star">●</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  )
}

function StackedWork() {
  const root = useRef(null)
  const featured = projects.filter((p) => p.featured)

  useGsap(root, () => {
    gsap.from('.sw-head .split-char', {
      yPercent: 110,
      stagger: 0.03,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.sw-head', start: 'top 80%' },
    })
    const cards = gsap.utils.toArray('.stack-card')
    cards.forEach((card, i) => {
      const inner = card.querySelector('.stack-inner')
      if (i < cards.length - 1) {
        gsap.to(inner, {
          scale: 0.88,
          rotate: i % 2 ? 2 : -2,
          filter: 'brightness(0.4)',
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 12%', scrub: true },
        })
      }
      gsap.fromTo(
        card.querySelector('.stack-media'),
        { scale: 1.25 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top top', scrub: true } }
      )
    })
  })

  return (
    <section className="sw section" ref={root}>
      <div className="sw-head container">
        <h2 className="display fs-xl">
          <Split text="Selected" />
          <br />
          <span className="serif accent">
            <Split text="work" />
          </span>
          <sup className="sw-count">({String(featured.length).padStart(2, '0')})</sup>
        </h2>
        <p className="dim sw-sub">A few projects I am proud of. Hover, scroll, click — they are alive.</p>
      </div>

      <div className="stack container">
        {featured.map((p, i) => (
          <div className="stack-card" key={p.slug} style={{ '--top': `${10 + i * 1.5}vh` }}>
            <TLink
              to={`/work/${p.slug}`}
              label={p.title}
              className="stack-inner"
              style={{ '--pc': p.color }}
              data-cursor="view"
              data-cursor-text="Open"
              data-cursor-color={p.color}
              onPointerEnter={() => setBgColors(p.palette[0], p.palette[1])}
              onPointerLeave={() => setBgColors()}
            >
              <div className="stack-media">
                <Media project={p} autoPlay />
              </div>
              <div className="stack-overlay">
                <span className="stack-num display">{String(i + 1).padStart(2, '0')}</span>
                <div className="stack-meta">
                  {p.flagship && (
                    <div className="stack-flagship-badge">
                      <span className="stack-flagship-star">★</span>
                      <span>Flagship Full-Stack Platform</span>
                      {p.link && <span className="stack-flagship-url">• {p.link.replace(/^https?:\/\//, '')} ↗</span>}
                    </div>
                  )}
                  <h3 className="display fs-xl">{p.title}</h3>
                  <p className="stack-summary">{p.summary}</p>
                  <div className="stack-tags">
                    <span>{p.client}</span>
                    <span>{p.year}</span>
                    {p.disciplines.map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                    {p.link && (
                      <span className="stack-tag-live">
                        Live ↗
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </TLink>
          </div>
        ))}
      </div>
    </section>
  )
}

function Manifesto() {
  const root = useRef(null)
  const text = profile.bio[0]

  useGsap(root, () => {
    gsap.fromTo(
      '.manifesto-word',
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 55%', scrub: true },
      }
    )
  })

  return (
    <section className="manifesto section container" ref={root}>
      <span className="eyebrow">About me</span>
      <p className="manifesto-text fs-lg">
        {text.split(' ').map((w, i) => (
          <span key={i} className="manifesto-word">
            {w}{' '}
          </span>
        ))}
      </p>
      <div className="stats">
        {profile.stats.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}

function Stat({ value, suffix, label }) {
  const ref = useRef(null)
  useGsap(ref, () => {
    const o = { v: 0 }
    gsap.to(o, {
      v: value,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      onUpdate: () => {
        if (ref.current) ref.current.querySelector('.stat-num').textContent = Math.round(o.v) + suffix
      },
    })
  })
  return (
    <div className="stat" ref={ref}>
      <span className="stat-num display">0{suffix}</span>
      <span className="stat-label dim">{label}</span>
    </div>
  )
}

function Services() {
  const root = useRef(null)
  const track = useRef(null)
  const arts = ['orb', 'rings', 'grid', 'blobs', 'stripes', 'conic']
  const palettes = projects.map((p) => p.palette)

  useGsap(root, () => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const dist = () => track.current.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })
  })

  return (
    <section className="services" ref={root}>
      <div className="services-track" ref={track}>
        <div className="services-intro">
          <span className="eyebrow">What I do</span>
          <h2 className="display fs-xl">
            Services <br />
            <span className="serif accent">&amp; craft</span>
          </h2>
          <p className="dim">Drag your scroll wheel — this section moves sideways.</p>
        </div>
        {profile.services.map((s, i) => (
          <article className="service-card" key={s.title}>
            <div className="service-art">
              <ArtCover variant={arts[i % arts.length]} palette={palettes[i % palettes.length]} />
            </div>
            <span className="service-num display">0{i + 1}</span>
            <h3 className="display fs-lg">{s.title}</h3>
            <p className="dim">{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="page page-home">
      <Hero />
      <Band />
      <StackedWork />
      <Manifesto />
      <Services />
    </div>
  )
}
