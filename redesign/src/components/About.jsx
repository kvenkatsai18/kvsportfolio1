import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

const STATS = [
  ['Location', 'United States (Denver/Louisville area)'],
  ['Current Focus', 'OurBuddy + MoneyBot'],
  ['Education', 'MS IT (University of Denver)'],
  ['Recognition', 'Mentor @ Startup Weekend Louisville'],
]

export default function About() {
  return (
    <section className="section section--tint" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <SectionHead title="Who I Am" />
            <Reveal as="p" delay={0.1}>
              I&rsquo;m an F-1 international student founder and creator of <strong>OurBuddy</strong>, a
              privacy-first community platform for short-distance carpooling and accommodation connections.
            </Reveal>
            <Reveal as="p" delay={0.15}>
              As the solo founder and developer, I built the entire MVP from scratch using Flutter and
              Firebase, launched it on the App Store in early 2025, and am actively iterating based on user
              feedback. The app features 24-hour auto-deleting chats, personal information masking,
              location-based SOS alerts, and in-app moderation.
            </Reveal>
            <Reveal as="p" delay={0.2}>
              Currently serving as <strong>Web Design &amp; Developer Specialist at MoneyBot LLC</strong>,
              while mentoring at Startup Weekend Louisville and contributing to the broader startup
              ecosystem.
            </Reveal>
          </div>
          <dl className="about-stats">
            {STATS.map(([label, value], i) => (
              <Reveal className="stat" key={label} delay={0.1 + i * 0.08}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
