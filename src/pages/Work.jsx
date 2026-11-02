import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { projects, disciplines, industries } from '../data/site'
import { Split, Roll } from '../components/Text'
import { TLink } from '../components/Transition'
import ProjectCard from '../components/ProjectCard'
import Media from '../components/Media'
import { gsap, ScrollTrigger, setBgColors, onPageReady } from '../lib/motion'
import { useEnter, isTouch } from '../lib/hooks'

function Dropdown({ id, value, options, allLabel, open, onToggle, onSelect }) {
  return (
    <span className={`dd ${open ? 'is-open' : ''}`}>
      <button id={id} className="dd-btn" onClick={onToggle} aria-expanded={open}>
        <span className="dd-value">{value || allLabel}</span>
        <span className="dd-caret">↓</span>
      </button>
      <span className="dd-list" role="listbox">
        {[null, ...options].map((o) => (
          <button
            key={o || 'all'}
            role="option"
            aria-selected={value === o}
            className={`dd-opt ${value === o ? 'is-active' : ''}`}
            onClick={() => onSelect(o)}
          >
            <Roll text={o || allLabel} />
          </button>
        ))}
      </span>
    </span>
  )
}

function ListView({ items }) {
  const preview = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (isTouch()) return
    const el = preview.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' })
    const rTo = gsap.quickTo(el, 'rotate', { duration: 0.9, ease: 'power3.out' })
    let lastX = 0
    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      rTo(gsap.utils.clamp(-15, 15, (e.clientX - lastX) * 0.6))
      lastX = e.clientX
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const current = items.find((p) => p.slug === active)

  return (
    <div className="wlist">
      <div className="wlist-head dim">
        <span>Project</span>
        <span>Client</span>
        <span>Discipline</span>
        <span>Year</span>
      </div>
      {items.map((p) => (
        <TLink
          key={p.slug}
          to={`/work/${p.slug}`}
          label={p.title}
          className="wlist-row"
          data-reveal
          style={{ '--pc': p.color }}
          data-cursor="hide"
          onPointerEnter={() => {
            setActive(p.slug)
            setBgColors(p.palette[0], p.palette[1])
          }}
          onPointerLeave={() => {
            setActive(null)
            setBgColors()
          }}
        >
          <span className="wlist-title display">
            {p.title}
            {p.flagship && <span className="wlist-flagship-tag">★ Flagship</span>}
            {p.link && <span className="wlist-live-tag">↗ Live</span>}
          </span>
          <span className="dim">{p.client}</span>
          <span className="dim">{p.disciplines.join(', ')}</span>
          <span className="dim">{p.year}</span>
        </TLink>
      ))}
      <div className={`wlist-preview ${current ? 'is-on' : ''}`} ref={preview} aria-hidden="true">
        <div className="wlist-preview-inner">
          {items.map((p) => (
            <div key={p.slug} className={`wlist-preview-item ${active === p.slug ? 'is-active' : ''}`}>
              <Media project={p} active={active === p.slug} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  const root = useRef(null)
  const gridRef = useRef(null)
  const [disc, setDisc] = useState(null)
  const [ind, setInd] = useState(null)
  const [openDd, setOpenDd] = useState(null)
  const [view, setView] = useState('grid')

  const items = useMemo(
    () =>
      projects.filter(
        (p) => (!disc || p.disciplines.includes(disc)) && (!ind || p.industries.includes(ind))
      ),
    [disc, ind]
  )

  useEnter(root, () => {
    gsap
      .timeline()
      .from('.work-title .split-char', { yPercent: 115, rotate: 8, stagger: 0.05, duration: 1.3, ease: 'expo.out' })
      .from('.work-reveal', { opacity: 0, y: 24, stagger: 0.08, duration: 0.9, ease: 'power3.out' }, 0.35)
  })

  // animate items whenever filters / view change
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-reveal]', { opacity: 0 })
    }, gridRef)
    const off = onPageReady(() =>
      ctx.add(() => {
        gsap.fromTo(
          '[data-reveal]',
          { opacity: 0, y: 80, rotateX: -12 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.07, duration: 1, ease: 'expo.out', delay: 0.1 }
        )
        // column parallax (desktop grid)
        const mm = gsap.matchMedia()
        mm.add('(min-width: 900px)', () => {
          const col = gridRef.current?.querySelector('.wgrid-col--b')
          if (!col) return
          gsap.fromTo(
            col,
            { y: 120 },
            { y: -120, ease: 'none', scrollTrigger: { trigger: gridRef.current, start: 'top bottom', end: 'bottom top', scrub: true } }
          )
        })
      })
    )
    const t = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => {
      off()
      clearTimeout(t)
      ctx.revert()
    }
  }, [items, view])

  // close dropdown on outside click
  useEffect(() => {
    const close = (e) => !e.target.closest('.dd') && setOpenDd(null)
    window.addEventListener('pointerdown', close)
    return () => window.removeEventListener('pointerdown', close)
  }, [])

  const colA = items.filter((_, i) => i % 2 === 0)
  const colB = items.filter((_, i) => i % 2 === 1)

  return (
    <div className="page page-work" ref={root}>
      <section className="work-intro container">
        <h1 className="work-title display fs-mega">
          <Split text="Work" />
          <sup className="work-count work-reveal">{String(items.length).padStart(2, '0')}</sup>
        </h1>
        <p className="work-sub serif fs-lg work-reveal">Designed with care, engineered to last.</p>

        <div className="work-controls work-reveal">
          <div className="work-filter fs-md">
            <span className="dim">Show me</span>
            <Dropdown
              id="filter-discipline"
              value={disc}
              options={disciplines}
              allLabel="all work"
              open={openDd === 'disc'}
              onToggle={() => setOpenDd(openDd === 'disc' ? null : 'disc')}
              onSelect={(v) => {
                setDisc(v)
                setOpenDd(null)
              }}
            />
            <span className="dim">in</span>
            <Dropdown
              id="filter-industry"
              value={ind}
              options={industries}
              allLabel="every industry"
              open={openDd === 'ind'}
              onToggle={() => setOpenDd(openDd === 'ind' ? null : 'ind')}
              onSelect={(v) => {
                setInd(v)
                setOpenDd(null)
              }}
            />
            {(disc || ind) && (
              <button
                id="filter-clear"
                className="work-clear"
                onClick={() => {
                  setDisc(null)
                  setInd(null)
                }}
              >
                <Roll text="Clear ✕" />
              </button>
            )}
          </div>

          <div className="view-toggle" role="tablist" aria-label="View mode">
            <span className="view-toggle-pill" style={{ transform: `translateX(${view === 'grid' ? 0 : 100}%)` }} />
            <button id="view-grid" role="tab" aria-selected={view === 'grid'} onClick={() => setView('grid')}>
              Grid
            </button>
            <button id="view-list" role="tab" aria-selected={view === 'list'} onClick={() => setView('list')}>
              List
            </button>
          </div>
        </div>
      </section>

      <section className="work-body container" ref={gridRef}>
        {items.length === 0 && <p className="work-empty fs-md dim">Nothing here yet — try another combo.</p>}
        {view === 'grid' ? (
          <div className="wgrid">
            <div className="wgrid-col">
              {colA.map((p) => (
                <ProjectCard key={p.slug} project={p} index={items.indexOf(p)} />
              ))}
            </div>
            <div className="wgrid-col wgrid-col--b">
              {colB.map((p) => (
                <ProjectCard key={p.slug} project={p} index={items.indexOf(p)} />
              ))}
            </div>
          </div>
        ) : (
          <ListView items={items} />
        )}
      </section>
    </div>
  )
}
