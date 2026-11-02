import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import { TransitionProvider } from './components/Transition'
import ShaderBackground from './components/ShaderBackground'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Header from './components/Header'
import Footer, { CTA } from './components/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import Project from './pages/Project'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { initLenis, scrollToTop, ScrollTrigger } from './lib/motion'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()
  const navType = useNavigationType()
  const onDone = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    initLenis()
  }, [])

  // browser back/forward: jump to top and refresh triggers
  useEffect(() => {
    if (navType === 'POP') scrollToTop(true)
    const t = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => clearTimeout(t)
  }, [location.pathname, navType])

  const showCta = location.pathname !== '/contact'

  return (
    <TransitionProvider>
      <ShaderBackground />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      {!loaded && <Preloader onDone={onDone} />}
      <Header />
      <main key={location.pathname} className="main">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {showCta && <CTA />}
        <Footer />
      </main>
    </TransitionProvider>
  )
}
