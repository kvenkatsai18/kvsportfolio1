import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Microphone, UsersThree, Compass, ArrowUpRight } from '@phosphor-icons/react'
import { EASE } from '../motion.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

const OPTIONS = [
  {
    id: 'speak',
    Icon: Microphone,
    tab: 'Invite Me to Speak',
    title: 'Invite Me to Speak',
    desc: 'I enjoy speaking on podcasts and at conferences. Interested in having me on your show or at your event? Send me the details.',
    cta: 'Submit an Invite',
    href: '#',
    primary: true,
  },
  {
    id: 'consult',
    Icon: UsersThree,
    tab: 'Book a 1-on-1 Consult',
    title: 'Book a 1-on-1 Consult',
    desc: 'Need advice on your startup, product, or career? Let’s chat one-on-one.',
    cta: 'Book a Consult',
    href: '#',
    primary: true,
  },
  {
    id: 'advisory',
    Icon: Compass,
    tab: 'Hire Me for Advisory',
    title: 'Hire Me for Advisory',
    desc: 'Looking for guidance on community-building, marketing, or hosting events? Let’s talk.',
    cta: 'Contact',
    href: '#contact',
    primary: false,
  },
]

export default function Work() {
  const [current, setCurrent] = useState(OPTIONS[0].id)
  const opt = OPTIONS.find((o) => o.id === current)

  return (
    <section className="section section--tint" id="work">
      <div className="container">
        <SectionHead eyebrow="Opportunities" title="Ways to Collaborate" />
        <Reveal className="work">
          <div className="work-tabs" role="tablist" aria-label="Ways to collaborate">
            {OPTIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                role="tab"
                id={`tab-${o.id}`}
                aria-selected={o.id === current}
                aria-controls="work-panel"
                className={o.id === current ? 'is-active' : ''}
                onClick={() => setCurrent(o.id)}
              >
                {o.id === current && (
                  <motion.span
                    layoutId="work-tab"
                    className="work-tab-bg"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
                  />
                )}
                <o.Icon size={20} weight="regular" />
                <span>{o.tab}</span>
              </button>
            ))}
          </div>

          <div className="work-panel" id="work-panel" role="tabpanel" aria-labelledby={`tab-${opt.id}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span className="work-icon">
                  <opt.Icon size={26} weight="regular" />
                </span>
                <h3>{opt.title}</h3>
                <p>{opt.desc}</p>
                <a
                  className={`btn ${opt.primary ? 'btn-primary' : 'btn-ghost'}`}
                  href={opt.href}
                  {...(opt.href !== '#' && !opt.href.startsWith('#') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span>{opt.cta}</span>
                  {opt.primary && (
                    <span className="btn-icon">
                      <ArrowUpRight size={16} weight="bold" />
                    </span>
                  )}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
