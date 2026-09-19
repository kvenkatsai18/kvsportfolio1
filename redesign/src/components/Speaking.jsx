import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

const EVENTS = [
  {
    role: 'Judge',
    event: 'DubHacks',
    date: 'Oct 2025',
    category: 'Education',
    desc: 'Served as Judge and Mentor at one of the largest collegiate hackathons in the Pacific Northwest, guiding student teams and evaluating their innovative projects.',
  },
  {
    role: 'Judge & Mentor',
    event: '&hacks: William & Mary’s Annual Hackathon',
    date: 'Sep 2025',
    category: 'Education',
    desc: 'Evaluated projects in AI, sustainability, health, and social good, and mentored student teams on UI/UX, product-market fit, and app development.',
  },
]

export default function Speaking() {
  return (
    <section className="section section--tint" id="speaking">
      <div className="container">
        <SectionHead eyebrow="Community" title="Speaking & Mentoring" />
        <div className="events">
          {EVENTS.map((e, i) => (
            <Reveal as="article" className="event" key={e.event} delay={i * 0.08}>
              <p className="event-date">{e.date}</p>
              <div className="event-body">
                <p className="event-role">{e.role}</p>
                <h3>{e.event}</h3>
                <p>{e.desc}</p>
              </div>
              <span className="tag">{e.category}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
