import { cloneElement, useEffect, useRef } from 'react'
import { gsap } from '../lib/motion'
import { isTouch } from '../lib/hooks'

/** Pulls its child towards the pointer when hovered. */
export default function Magnetic({ children, strength = 0.35, inner = 0.2 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || isTouch()) return
    const child = el.querySelector('[data-magnetic-inner]')
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const ixTo = child && gsap.quickTo(child, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const iyTo = child && gsap.quickTo(child, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })

    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      xTo(x * strength)
      yTo(y * strength)
      if (child) {
        ixTo(x * inner)
        iyTo(y * inner)
      }
    }
    const leave = () => {
      xTo(0)
      yTo(0)
      if (child) {
        ixTo(0)
        iyTo(0)
      }
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength, inner])

  return cloneElement(children, { ref })
}
