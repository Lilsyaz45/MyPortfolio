import { useRef } from 'react'
import { TLink } from '../components/Transition'
import { Split } from '../components/Text'
import { gsap } from '../lib/motion'
import { useEnter } from '../lib/hooks'

export default function NotFound() {
  const root = useRef(null)
  useEnter(root, () => {
    gsap.from('.nf-title .split-char', { yPercent: 115, rotate: 15, stagger: 0.08, duration: 1.2, ease: 'expo.out' })
    gsap.to('.nf-title .split-char', { y: -20, yoyo: true, repeat: -1, stagger: 0.15, duration: 1.2, ease: 'sine.inOut', delay: 1.2 })
  })
  return (
    <div className="page page-404 container" ref={root}>
      <h1 className="nf-title display fs-mega">
        <Split text="404" />
      </h1>
      <p className="fs-md dim">This frame was never rendered.</p>
      <TLink to="/" label="Home" className="pill-btn">
        Take me home ↗
      </TLink>
    </div>
  )
}
