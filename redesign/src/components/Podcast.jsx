import { useState } from 'react'
import { Play } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

const EPISODES = [
  {
    title: 'Startup Journey While on OPT',
    desc: 'Featured podcast discussion about startups, entrepreneurship, and building while on OPT visa status.',
    thumb: 'https://img.youtube.com/vi/ImqFHYlikh4/maxresdefault.jpg',
    alt: 'Startup Journey While on OPT',
    href: 'https://youtu.be/ImqFHYlikh4',
    cta: 'Watch on YouTube',
  },
  {
    title: 'The Startup Kitchen Show, Episode 007',
    desc: 'Discussion on building in public and the startup journey from India to the US.',
    thumb: '/startup-kitchen.jpg',
    alt: 'The Startup Kitchen Show Episode 007',
    href: 'https://www.linkedin.com/posts/ikniriley_the-startup-kitchen-show-007-w-ceo-of-activity-7399508814636408833-S7yC',
    cta: 'View on LinkedIn',
  },
]

function Thumb({ ep }) {
  const [failed, setFailed] = useState(false)
  return (
    <a className={`thumb ${failed ? 'thumb--fallback' : ''}`} href={ep.href} target="_blank" rel="noopener noreferrer" aria-label={ep.title}>
      {!failed && <img src={ep.thumb} alt={ep.alt} loading="lazy" onError={() => setFailed(true)} />}
      <span className="play">
        <Play size={18} weight="fill" />
      </span>
    </a>
  )
}

export default function Podcast() {
  return (
    <section className="section" id="podcast">
      <div className="container">
        <SectionHead title="Podcast Appearances" />
        <div className="podcast-grid">
          {EPISODES.map((ep, i) => (
            <Reveal as="article" className="episode" key={ep.href} delay={i * 0.1}>
              <Thumb ep={ep} />
              <div className="episode-info">
                <h3>{ep.title}</h3>
                <p>{ep.desc}</p>
                <a className="btn btn-ghost btn-sm" href={ep.href} target="_blank" rel="noopener noreferrer">
                  {ep.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
