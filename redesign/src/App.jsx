import { motion, useScroll, useSpring } from 'motion/react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Publications from './components/Publications.jsx'
import Testimonials from './components/Testimonials.jsx'
import Podcast from './components/Podcast.jsx'
import Speaking from './components/Speaking.jsx'
import Media from './components/Media.jsx'
import Work from './components/Work.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Publications />
        <Testimonials />
        <Podcast />
        <Speaking />
        <Media />
        <Work />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
