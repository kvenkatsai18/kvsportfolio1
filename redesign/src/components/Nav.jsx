import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'

const LINKS = [
  ['About', 'about'],
  ['Projects', 'projects'],
  ['Publications', 'publications'],
  ['Testimonials', 'testimonials'],
  ['Podcast', 'podcast'],
  ['Speaking', 'speaking'],
  ['Media', 'media'],
  ['Collaborate', 'work'],
]

const EASE = [0.32, 0.72, 0, 1]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [active, setActive] = useState(null)
  const { scrollY } = useScroll()

  // Only flips state when crossing the threshold, not on every frame.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 24
    setScrolled((prev) => (prev === next ? prev : next))
  })

  // Section highlighting via IntersectionObserver (no scroll listeners).
  useEffect(() => {
    // The hero ('top') is observed too so no link stays highlighted once you scroll back up to it.
    const els = ['top', ...LINKS.map(([, id]) => id)].map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id === 'top' ? null : e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const shown = hovered ?? active

  return (
    <motion.header
      className={`nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
    >
      <div className="nav-pill">
        <a href="#top" className="nav-logo" aria-label="Venkat Sai, home">
          Venkat Sai<span>.</span>
        </a>

        <nav className="nav-links" aria-label="Primary" onMouseLeave={() => setHovered(null)}>
          {LINKS.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={shown === id ? 'is-shown' : ''}
              onMouseEnter={() => setHovered(id)}
              onFocus={() => setHovered(id)}
              onBlur={() => setHovered(null)}
            >
              {shown === id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="nav-indicator"
                  transition={{ type: 'spring', duration: 0.45, bounce: 0.18 }}
                />
              )}
              <span className="nav-label">{label}</span>
            </a>
          ))}
        </nav>

        <button
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`bars ${open ? 'is-open' : ''}`}>
            <i />
            <i />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobileMenu"
            className="nav-sheet"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {LINKS.map(([label, id], i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.04 * i + 0.05 }}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
