import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from '../lib/motion'
import { isTouch } from '../lib/hooks'

/**
 * Custom cursor. Any element can opt-in with:
 *   data-cursor="view" | "hover" | "drag" | "hide"
 *   data-cursor-text="View"     (label inside the expanded cursor)
 *   data-cursor-color="#c6ff3d" (fill colour of the expanded cursor)
 */
export default function Cursor() {
  const wrap = useRef(null)
  const dot = useRef(null)
  const ball = useRef(null)
  const text = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (isTouch()) return
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ballPos = { ...pos }
    const vel = { x: 0, y: 0 }
    let mode = ''

    const setDot = { x: gsap.quickSetter(dot.current, 'x', 'px'), y: gsap.quickSetter(dot.current, 'y', 'px') }
    const setBall = { x: gsap.quickSetter(ball.current, 'x', 'px'), y: gsap.quickSetter(ball.current, 'y', 'px') }

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      wrap.current.classList.add('is-visible')
    }
    const onLeave = () => wrap.current.classList.remove('is-visible')
    const onDown = () => wrap.current.classList.add('is-down')
    const onUp = () => wrap.current.classList.remove('is-down')

    const onOver = (e) => {
      const el = e.target.closest('[data-cursor], a, button, input, textarea, label')
      let next = ''
      let label = ''
      let color = ''
      if (el) {
        next = el.dataset.cursor || (el.matches('input, textarea') ? 'text' : 'hover')
        label = el.dataset.cursorText || ''
        color = el.dataset.cursorColor || ''
      }
      if (next === mode && text.current.textContent === label) return
      mode = next
      wrap.current.dataset.mode = mode
      text.current.textContent = label
      ball.current.style.setProperty('--cursor-color', color || 'var(--accent)')
    }

    const tick = () => {
      const dx = pos.x - ballPos.x
      const dy = pos.y - ballPos.y
      ballPos.x += dx * 0.16
      ballPos.y += dy * 0.16
      vel.x = dx
      vel.y = dy
      setDot.x(pos.x)
      setDot.y(pos.y)
      setBall.x(ballPos.x)
      setBall.y(ballPos.y)
      // squash & stretch based on velocity when in default mode
      const speed = Math.min(Math.hypot(vel.x, vel.y) / 120, 0.45)
      const angle = (Math.atan2(vel.y, vel.x) * 180) / Math.PI
      if (!mode) {
        ball.current.firstChild.style.transform = `rotate(${angle}deg) scale(${1 + speed}, ${1 - speed * 0.6})`
      } else {
        ball.current.firstChild.style.transform = ''
      }
    }

    gsap.ticker.add(tick)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerover', onOver)
    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerover', onOver)
    }
  }, [])

  // reset on route change
  useEffect(() => {
    if (!wrap.current) return
    wrap.current.dataset.mode = ''
    if (text.current) text.current.textContent = ''
  }, [location.pathname])

  if (typeof window !== 'undefined' && isTouch()) return null

  return (
    <div className="cursor" ref={wrap} data-mode="" aria-hidden="true">
      <div className="cursor-ball" ref={ball}>
        <div className="cursor-ball-inner">
          <span className="cursor-text" ref={text} />
        </div>
      </div>
      <div className="cursor-dot" ref={dot} />
    </div>
  )
}
