import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'

const EASE = [0.32, 0.72, 0, 1]

const HEADLINE = [
  { text: 'Building', accent: false },
  { text: 'products', accent: false },
  { text: 'that', accent: false },
  { text: 'matter.', accent: true },
]

function Word({ text, accent, index, reduce }) {
  return (
    <span className="word-mask">
      <motion.span
        className={`word ${accent ? 'word--accent' : ''}`}
        initial={reduce ? false : { y: '115%', rotate: 4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.25 + index * 0.09 }}
      >
        {text}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  // Scroll parallax for the portrait stack.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const rise = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70])
  const drift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40])

  // Pointer tilt, driven by motion values (never React state).
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [reduce ? 0 : -7, reduce ? 0 : 7]), {
    stiffness: 120,
    damping: 16,
  })
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [reduce ? 0 : 7, reduce ? 0 : -7]), {
    stiffness: 120,
    damping: 16,
  })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, ease: EASE, delay },
  })

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-bg" aria-hidden="true">
        <span className="orb orb--a" />
        <span className="orb orb--b" />
        <span className="hero-grain" />
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="hero-title" aria-label="Building products that matter.">
            {[HEADLINE.slice(0, 2), HEADLINE.slice(2)].map((line, li) => (
              <span className="title-line" key={li}>
                {line.map((w, i) => (
                  <Word key={w.text} {...w} index={li * 2 + i} reduce={reduce} />
                ))}
              </span>
            ))}
          </h1>

          <motion.p className="hero-sub" {...fade(0.75)}>
            Founder of OurBuddy, a privacy-first carpooling platform, and Web Design &amp; Developer
            Specialist at MoneyBot LLC.
          </motion.p>

          <motion.div className="hero-actions" {...fade(0.9)}>
            <a className="btn btn-primary" href="#projects">
              <span>View Projects</span>
              <span className="btn-icon">
                <ArrowUpRight size={16} weight="bold" />
              </span>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
          style={{ y: rise }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <motion.div className="portrait" style={{ rotateX: rotX, rotateY: rotY }}>
            <motion.span className="plate plate--back" style={{ y: drift }} aria-hidden="true" />
            <span className="plate plate--mid" aria-hidden="true" />
            <div className="portrait-shell">
              <div className="portrait-core">
                <img src="/ProfilePic.jpeg" alt="Venkat Sai Kolli" width="231" height="231" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
