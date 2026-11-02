import { createContext, forwardRef, useCallback, useContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap, pageReady, scrollToTop } from '../lib/motion'

const TransitionCtx = createContext({ go: () => {} })
export const useTransition = () => useContext(TransitionCtx)

const PANEL_COLORS = ['#c6ff3d', '#7b5cff', '#121214']

export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const overlay = useRef(null)
  const label = useRef(null)
  const busy = useRef(false)

  const go = useCallback(
    (to, text = '') => {
      if (busy.current || to === location.pathname) return
      busy.current = true
      const el = overlay.current
      const panels = el.querySelectorAll('.pt-panel')
      label.current.textContent = text

      gsap
        .timeline({
          onComplete: () => {
            busy.current = false
            gsap.set(el, { visibility: 'hidden' })
          },
        })
        .set(el, { visibility: 'visible' })
        .fromTo(
          panels,
          { yPercent: 100, borderTopLeftRadius: '50% 30%', borderTopRightRadius: '50% 30%' },
          {
            yPercent: 0,
            borderTopLeftRadius: '0% 0%',
            borderTopRightRadius: '0% 0%',
            duration: 0.8,
            stagger: 0.09,
            ease: 'expo.inOut',
          }
        )
        .fromTo(label.current, { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }, '-=0.35')
        .add(() => {
          pageReady.set(false)
          navigate(to)
          scrollToTop(true)
        })
        .to(label.current, { yPercent: -120, opacity: 0, duration: 0.4, ease: 'expo.in' }, '+=0.15')
        .add(() => pageReady.set(true))
        .to(
          [...panels].reverse(),
          {
            yPercent: -100,
            borderBottomLeftRadius: '50% 30%',
            borderBottomRightRadius: '50% 30%',
            duration: 0.8,
            stagger: 0.07,
            ease: 'expo.inOut',
          },
          '-=0.1'
        )
        .set(panels, { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 })
    },
    [location.pathname, navigate]
  )

  return (
    <TransitionCtx.Provider value={{ go }}>
      {children}
      <div className="pt" ref={overlay} aria-hidden="true">
        {PANEL_COLORS.map((c, i) => (
          <div className="pt-panel" key={i} style={{ background: c }} />
        ))}
        <div className="pt-label-wrap">
          <span className="pt-label display" ref={label} />
        </div>
      </div>
    </TransitionCtx.Provider>
  )
}

/** Internal link that plays the page transition. */
export const TLink = forwardRef(function TLink({ to, label, children, onClick, ...rest }, ref) {
  const { go } = useTransition()
  return (
    <a
      ref={ref}
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        onClick?.(e)
        go(to, label ?? (typeof children === 'string' ? children : ''))
      }}
      {...rest}
    >
      {children}
    </a>
  )
})
