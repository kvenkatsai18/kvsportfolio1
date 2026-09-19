import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../motion.js'

// Fade + rise (with a touch of blur) the first time the element scrolls into view.
export default function Reveal({ as = 'div', delay = 0, y = 28, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
