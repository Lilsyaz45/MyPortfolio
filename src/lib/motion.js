import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ---------- Smooth scroll (Lenis + GSAP ticker) ---------- */
let lenis = null

export function initLenis() {
  if (lenis) return lenis
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate, force: true })
  else window.scrollTo(0, 0)
}

/* ---------- Page-ready bus ----------
   Pages wait for this before running their intro animation, so the intro
   plays right as the preloader / page transition reveals the screen. */
let ready = false
let subs = new Set()

export const pageReady = {
  get: () => ready,
  set(value) {
    ready = value
    if (value) {
      const list = [...subs]
      subs = new Set()
      list.forEach((fn) => fn())
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }
  },
}

export function onPageReady(fn) {
  if (ready) {
    fn()
    return () => {}
  }
  subs.add(fn)
  return () => subs.delete(fn)
}

/* ---------- Background colour bus (shader listens) ---------- */
const colorSubs = new Set()
export function setBgColors(c1, c2) {
  colorSubs.forEach((fn) => fn(c1, c2))
}
export function onBgColors(fn) {
  colorSubs.add(fn)
  return () => colorSubs.delete(fn)
}

export { gsap, ScrollTrigger }
