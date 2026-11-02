import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/motion'

/**
 * Infinite marquee whose speed + direction react to scroll velocity.
 */
export default function Marquee({ children, speed = 60, className = '', reverse = false }) {
  const root = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const el = track.current
    let x = 0
    let dir = reverse ? 1 : -1
    let boost = 0
    let half = el.scrollWidth / 2

    const ro = new ResizeObserver(() => (half = el.scrollWidth / 2))
    ro.observe(el)

    const st = ScrollTrigger.create({
      trigger: root.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity()
        boost = Math.min(Math.abs(v) / 120, 12)
        if (v !== 0) dir = (v > 0 ? -1 : 1) * (reverse ? -1 : 1)
      },
    })

    const tick = (_, delta) => {
      boost *= 0.94
      x += dir * (speed + boost * speed) * (delta / 1000)
      if (x <= -half) x += half
      if (x > 0) x -= half
      el.style.transform = `translate3d(${x}px,0,0)`
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      st.kill()
      ro.disconnect()
    }
  }, [speed, reverse])

  return (
    <div className={`marquee ${className}`} ref={root}>
      <div className="marquee-track" ref={track}>
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
