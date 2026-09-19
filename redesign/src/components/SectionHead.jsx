import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../motion.js'
import Reveal from './Reveal.jsx'

// The trigger lives on the heading (always in view). Words start below their clipping mask,
// so they can't be the observed element: a clipped element never reports as visible.
const titleVariants = { hidden: {}, show: {} }
const wordVariants = {
  hidden: { y: '115%' },
  show: (i) => ({ y: 0, transition: { duration: 0.9, ease: EASE, delay: i * 0.06 } }),
}

function SplitTitle({ text }) {
  const reduce = useReducedMotion()
  return (
    <motion.h2
      className="section-title"
      aria-label={text}
      variants={titleVariants}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {text.split(' ').map((w, i) => (
        <span className="word-mask" key={i} aria-hidden="true">
          <motion.span className="word" variants={wordVariants} custom={i}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

export default function SectionHead({ eyebrow, title, desc, action }) {
  return (
    <header className="section-head">
      <div className="section-head-main">
        {eyebrow && (
          <Reveal as="p" className="section-eyebrow" y={12}>
            {eyebrow}
          </Reveal>
        )}
        <SplitTitle text={title} />
        {desc && (
          <Reveal as="p" className="section-desc" delay={0.15} y={16}>
            {desc}
          </Reveal>
        )}
      </div>
      {action}
    </header>
  )
}
