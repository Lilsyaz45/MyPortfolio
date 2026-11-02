import { useRef } from 'react'
import { TLink } from './Transition'
import { Roll } from './Text'
import Marquee from './Marquee'
import Magnetic from './Magnetic'
import { profile, socials } from '../data/site'
import { gsap, getLenis } from '../lib/motion'
import { useClock, useGsap } from '../lib/hooks'

/** Giant "Let's create something together" CTA with liquid fill hover. */
export function CTA() {
  const root = useRef(null)
  const btn = useRef(null)

  useGsap(root, () => {
    gsap.from('.cta-line .split-word-inner', {
      yPercent: 110,
      stagger: 0.08,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: root.current, start: 'top 75%' },
    })
  })

  const fill = (e, inOut) => {
    const r = btn.current.getBoundingClientRect()
    btn.current.style.setProperty('--fx', `${e.clientX - r.left}px`)
    btn.current.style.setProperty('--fy', `${e.clientY - r.top}px`)
    btn.current.classList.toggle('is-filled', inOut)
  }

  return (
    <section className="cta section" ref={root}>
      <TLink
        to="/contact"
        label="Contact"
        className="cta-btn"
        ref={btn}
        data-cursor="view"
        data-cursor-text="Say hi"
        data-cursor-color="#f2efe9"
        onPointerEnter={(e) => fill(e, true)}
        onPointerLeave={(e) => fill(e, false)}
      >
        <span className="cta-fill" />
        <span className="cta-line display fs-xxl">
          <span className="split-mask"><span className="split-word-inner">Let's</span></span>{' '}
          <span className="split-mask"><span className="split-word-inner">create</span></span>
        </span>
        <span className="cta-line serif fs-xxl">
          <span className="split-mask"><span className="split-word-inner">something</span></span>
        </span>
        <span className="cta-line display fs-xxl">
          <span className="split-mask"><span className="split-word-inner">together</span></span>
          <span className="cta-arrow" aria-hidden="true">↗</span>
        </span>
      </TLink>
    </section>
  )
}

export default function Footer() {
  const root = useRef(null)
  const time = useClock(profile.timezone)

  useGsap(root, () => {
    gsap.fromTo(
      '.footer-giant .split-char',
      { yPercent: 100 },
      {
        yPercent: 0,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: { trigger: '.footer-giant', start: 'top bottom', end: 'bottom bottom', scrub: 0.8 },
      }
    )
  })

  const giant = profile.nickname || `${profile.firstName}${profile.lastName}`

  return (
    <footer className="footer" ref={root}>
      <Marquee className="footer-marquee" speed={50}>
        <span className="marquee-item display">{profile.tagline}</span>
        <span className="marquee-star">✺</span>
        <span className="marquee-item serif">Open for collaborations</span>
        <span className="marquee-star">✺</span>
      </Marquee>

      <div className="footer-grid container">
        <div className="footer-col">
          <span className="eyebrow">Say hello</span>
          <a href={`mailto:${profile.email}`} className="footer-email fs-md">
            <Roll text={profile.email} />
          </a>
        </div>
        <div className="footer-col">
          <span className="eyebrow">Sitemap</span>
          {['/', '/work', '/about', '/contact'].map((to) => {
            const label = to === '/' ? 'Home' : to.slice(1).replace(/^./, (c) => c.toUpperCase())
            return (
              <TLink key={to} to={to} label={label} className="footer-link">
                <Roll text={label} />
              </TLink>
            )
          })}
        </div>
        <div className="footer-col">
          <span className="eyebrow">Socials</span>
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="footer-link">
              <Roll text={s.label} />
            </a>
          ))}
        </div>
        <div className="footer-col footer-col--right">
          <span className="eyebrow">Local time</span>
          <span className="footer-time display">{time}</span>
          <span className="dim">{profile.location}</span>
          <Magnetic>
            <button
              className="footer-top"
              onClick={() => getLenis()?.scrollTo(0, { duration: 1.8 })}
              aria-label="Back to top"
              data-cursor="hide"
            >
              <span data-magnetic-inner>↑</span>
            </button>
          </Magnetic>
        </div>
      </div>

      <div className="footer-giant display" aria-label={giant} style={{ '--len': giant.length }}>
        {[...giant].map((c, i) => (
          <span className="split-mask" key={i}>
            <span className="split-char">{c}</span>
          </span>
        ))}
      </div>

      <div className="footer-bottom container">
        <span className="dim">© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
        <span className="dim">Designed & built with obsession</span>
      </div>
    </footer>
  )
}
