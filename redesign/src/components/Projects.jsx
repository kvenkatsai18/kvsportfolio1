import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { Desktop } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import ArrowLink from './ArrowLink.jsx'

const PROJECTS = [
  {
    id: 'ourbuddy',
    layout: 'featured',
    logo: 'https://images.squarespace-cdn.com/content/6771d396b35b2610c60a3f4c/841b5a71-2290-48cd-9d21-13415378a39c/OURB.png?format=100w&content-type=image%2Fpng',
    logoAlt: 'OurBuddy logo',
    title: 'OurBuddy App',
    desc: 'Privacy-first community platform for short-distance carpooling and accommodation connections. Built with Flutter & Firebase, launched on App Store in 2025.',
    chips: ['24-hr auto-delete chats', 'Personal info masking', 'SOS alerts', 'Content moderation'],
    facts: [['Status', 'Actively growing'], ['Patent', 'Filed Oct 2025']],
    href: 'https://www.ourbapp.com/',
    cta: 'Visit OurBuddy',
  },
  {
    id: 'moneybot',
    layout: 'side',
    logo: 'https://getmoneybot.com/moneybot-logo.png',
    logoAlt: 'MoneyBot logo',
    title: 'MoneyBot LLC',
    desc: 'AI-powered financial literacy platform for high school students combining gamification and real-world skills.',
    highlight: 'Named “Startups to Watch, 2026” by Louisville Business First',
    facts: [['Role', 'Founding Team Member']],
    href: 'https://getmoneybot.com',
    cta: 'Visit MoneyBot',
  },
  {
    id: 'iiw7',
    layout: 'wide',
    Icon: Desktop,
    title: 'IIW7 Website',
    desc: '7th International Indentation Workshop: a comprehensive Wix website for 250+ international attendees with integrated payment, registration, and event management.',
    stat: { value: 20483, suffix: '%', label: 'increase in Google organic search traffic' },
    chips: ['Mobile-responsive', 'SEO-optimized', '300+ registrations processed'],
    href: '#',
    cta: 'View Project',
  },
]

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || reduce || !ref.current) return
    // Writes straight to the DOM node so the count never re-renders React.
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('en-US') + suffix
      },
    })
    return () => controls.stop()
  }, [inView, reduce, to, suffix])

  return (
    <span ref={ref}>
      {reduce ? to.toLocaleString('en-US') + suffix : '0' + suffix}
    </span>
  )
}

function ProjectCard({ p, delay }) {
  return (
    <Reveal as="article" className={`project project--${p.layout}`} delay={delay}>
      <div className="project-icon">
        {p.logo ? <img src={p.logo} alt={p.logoAlt} loading="lazy" /> : <p.Icon size={22} weight="regular" />}
      </div>
      <h3>{p.title}</h3>
      <p className="project-desc">{p.desc}</p>

      {p.stat && (
        <p className="project-stat">
          <strong>
            <CountUp to={p.stat.value} suffix={p.stat.suffix} />
          </strong>
          <span>{p.stat.label}</span>
        </p>
      )}
      {p.highlight && <p className="project-highlight">{p.highlight}</p>}
      {p.chips && (
        <ul className="chips">
          {p.chips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
      {p.facts && (
        <dl className="facts">
          {p.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
      <ArrowLink href={p.href}>{p.cta}</ArrowLink>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead
          eyebrow="Featured Work"
          title="Selected Projects"
          desc="Products and platforms built from scratch, shipped, and iterated on with real users."
        />
        <div className="projects-bento">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
