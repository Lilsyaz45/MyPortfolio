import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TLink, useTransition } from './Transition'
import { Roll } from './Text'
import Magnetic from './Magnetic'
import { profile, socials, projects } from '../data/site'
import { gsap, getLenis, setBgColors } from '../lib/motion'
import { useClock } from '../lib/hooks'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const time = useClock(profile.timezone)

  // hide on scroll down, show on scroll up
  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 160 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <>
      <header className={`header ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
        <Magnetic strength={0.3}>
          <span className="header-logo-wrap">
            <TLink to="/" label="Home" className="header-logo" aria-label="Home">
              <span className="header-logo-mark" data-magnetic-inner>
                {profile.initials}
              </span>
            </TLink>
          </span>
        </Magnetic>

        <nav className="header-nav" aria-label="Primary">
          {NAV.slice(1).map((n) => (
            <TLink
              key={n.to}
              to={n.to}
              label={n.label}
              className={`header-link ${location.pathname.startsWith(n.to) ? 'is-active' : ''}`}
            >
              <Roll text={n.label} />
            </TLink>
          ))}
        </nav>

        <div className="header-right">
          <span className="header-time">
            <span className={`status-dot ${profile.available ? '' : 'is-off'}`} />
            {profile.location.split(',')[0]} · {time}
          </span>
          <Magnetic strength={0.4}>
            <button
              id="menu-toggle"
              className="menu-btn"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Toggle menu"
              data-cursor="hide"
            >
              <span className="menu-btn-inner" data-magnetic-inner>
                <span className="menu-btn-line" />
                <span className="menu-btn-line" />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function Menu({ open }) {
  const root = useRef(null)
  const tl = useRef(null)
  const [preview, setPreview] = useState(null)
  const { go } = useTransition()
  const time = useClock(profile.timezone)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(
          root.current,
          { clipPath: 'circle(0% at calc(100% - 3.5rem) 2.6rem)' },
          { clipPath: 'circle(150% at calc(100% - 3.5rem) 2.6rem)', duration: 1, ease: 'expo.inOut' }
        )
        .fromTo(
          '.menu-link-char',
          { yPercent: 120, rotate: 6 },
          { yPercent: 0, rotate: 0, stagger: 0.02, duration: 0.8, ease: 'expo.out' },
          0.35
        )
        .fromTo('.menu-index', { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: 0.05, duration: 0.5 }, 0.5)
        .fromTo('.menu-foot > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out' }, 0.5)
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!tl.current) return
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      tl.current.timeScale(1).play()
    } else {
      lenis?.start()
      tl.current.timeScale(1.6).reverse()
      setBgColors()
    }
  }, [open])

  const featured = projects.slice(0, 4)

  return (
    <div className={`menu ${open ? 'is-open' : ''}`} ref={root} aria-hidden={!open}>
      <div className="menu-preview" aria-hidden="true">
        {featured.map((p) => (
          <div
            key={p.slug}
            className={`menu-preview-item ${preview === p.slug ? 'is-on' : ''}`}
            style={{ '--c1': p.palette[0], '--c2': p.palette[1] }}
          />
        ))}
      </div>
      <ul className="menu-list">
        {NAV.map((n, i) => (
          <li key={n.to}>
            <a
              href={n.to}
              className="menu-link display"
              onClick={(e) => {
                e.preventDefault()
                go(n.to, n.label)
              }}
              onPointerEnter={() => {
                const p = featured[i % featured.length]
                setPreview(p.slug)
                setBgColors(p.palette[0], p.palette[1])
              }}
              onPointerLeave={() => setPreview(null)}
            >
              <span className="menu-index">0{i + 1}</span>
              <span className="split-mask">
                {[...n.label].map((c, ci) => (
                  <span className="split-char menu-link-char" key={ci} style={{ '--i': ci }}>
                    {c}
                  </span>
                ))}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="menu-foot">
        <a href={`mailto:${profile.email}`} className="menu-email">
          <Roll text={profile.email} />
        </a>
        <div className="menu-socials">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
              <Roll text={s.label} />
            </a>
          ))}
        </div>
        <span className="dim">
          {profile.location} · {time}
        </span>
      </div>
    </div>
  )
}
