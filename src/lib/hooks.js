import { useLayoutEffect, useEffect, useState } from 'react'
import { gsap, ScrollTrigger, onPageReady } from './motion'

/** Run an intro animation once the page is revealed. Auto-cleans on unmount. */
export function useEnter(scopeRef, fn, deps = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {}, scopeRef)
    const off = onPageReady(() => ctx.add(() => fn()))
    return () => {
      off()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Scoped GSAP context for scroll-driven animations. */
export function useGsap(scopeRef, fn, deps = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => fn(), scopeRef)
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      clearTimeout(t)
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Live clock for a given IANA timezone. */
export function useClock(timeZone) {
  const fmt = () => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone,
      }).format(new Date())
    } catch {
      return new Date().toLocaleTimeString()
    }
  }
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone])
  return time
}

export const isTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches
