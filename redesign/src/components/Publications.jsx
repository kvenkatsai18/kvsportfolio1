import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import ArrowLink from './ArrowLink.jsx'

const PUBS = [
  {
    title: 'The Integration of AI into UI and UX Design',
    date: 'Oct 29, 2025',
    source: 'Published on SSRN',
    desc: 'This study examines how Artificial Intelligence can be used to improve UI and UX design for increased usability, engagement, and trust. Identifies four recurring problems and reviews mitigation strategies.',
    topics: ['AI in Design Workflows', 'Explainability & Privacy', 'Fairness & Inclusivity', 'People-Centered Design'],
    href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5556881',
    cta: 'Read on SSRN',
  },
  {
    title: 'Think Before You Upload to AI: Staying Safe in the Age of AI',
    date: 'Oct 5, 2025',
    source: 'Published on Illumination',
    desc: 'A practical guide exploring the security implications of uploading data to AI systems. Raises awareness about privacy risks and best practices for protecting sensitive information.',
    topics: ['AI Privacy & Security', 'Data Protection', 'Risk Awareness', 'Safe AI Tool Usage'],
    href: 'https://medium.com/illumination/think-before-you-upload-to-ai-staying-safe-in-the-age-of-ai-d78d0746acf7',
    cta: 'Read on Medium',
  },
]

export default function Publications() {
  return (
    <section className="section section--tint" id="publications">
      <div className="container">
        <SectionHead title="Publications" />
        <div className="pubs">
          {PUBS.map((p, i) => (
            <Reveal as="article" className="pub" key={p.title} delay={i * 0.08}>
              <div className="pub-meta">
                <p className="pub-date">{p.date}</p>
                <p className="pub-source">{p.source}</p>
              </div>
              <div className="pub-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <ul className="chips">
                  {p.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <ArrowLink href={p.href}>{p.cta}</ArrowLink>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
