import { useLayoutEffect, useRef } from 'react'
import { gsap, pageReady } from '../lib/motion'
import { profile } from '../data/site'

export default function Preloader({ onDone }) {
  const root = useRef(null)
  const count = useRef(null)

  useLayoutEffect(() => {
    document.body.classList.add('is-loading')
    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve()

      const tl = gsap.timeline({ paused: true })
      tl.from('.pl-name .split-char', {
        yPercent: 110,
        rotate: 12,
        stagger: 0.035,
        duration: 1,
        ease: 'expo.out',
      })
        .from('.pl-meta > *', { opacity: 0, y: 12, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, 0.2)
        .to(
          counter,
          {
            v: 100,
            duration: 2.1,
            ease: 'power2.inOut',
            onUpdate: () => {
              const v = Math.round(counter.v)
              if (count.current) count.current.textContent = String(v).padStart(3, '0')
              gsap.set('.pl-bar-fill', { scaleX: counter.v / 100 })
            },
          },
          0
        )
        .to('.pl-orb', { scale: 1, duration: 2.1, ease: 'power2.inOut' }, 0)
        .to('.pl-name .split-char', { yPercent: -110, stagger: 0.02, duration: 0.6, ease: 'expo.in' }, '+=0.1')
        .to('.pl-meta, .pl-count, .pl-bar', { opacity: 0, duration: 0.3 }, '<')
        .to('.pl-orb', { scale: 12, duration: 1.1, ease: 'expo.inOut' }, '-=0.35')
        .add(() => {
          document.body.classList.remove('is-loading')
          pageReady.set(true)
        }, '-=0.45')
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '-=0.5')
        .add(() => onDone?.())

      fontsReady.then(() => {
        if (!cancelled) tl.play()
      })
    }, root)
    let cancelled = false
    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [onDone])

  const name = profile.nickname || `${profile.firstName} ${profile.lastName}`

  return (
    <div className="preloader" ref={root}>
      <div className="pl-orb" />
      <div className="pl-meta">
        <span className="eyebrow">
          {profile.firstName} {profile.lastName}
        </span>
        <span className="dim">{profile.role}</span>
      </div>
      <h2 className="pl-name display" aria-label={name} style={{ '--len': name.length }}>
        {name.split(' ').map((w, wi) => (
          <span className="split-mask" key={wi}>
            {[...w].map((c, ci) => (
              <span className="split-char" key={ci}>
                {c}
              </span>
            ))}
          </span>
        ))}
      </h2>
      <div className="pl-bar">
        <div className="pl-bar-fill" />
      </div>
      <div className="pl-count display" ref={count}>
        000
      </div>
    </div>
  )
}
