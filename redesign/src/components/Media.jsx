import { Play } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

const URL = 'https://www.wnky.com/moneybot-enters-classrooms-around-the-region/'

export default function Media() {
  return (
    <section className="section" id="media">
      <div className="container">
        <SectionHead title="Media Coverage" />
        <Reveal as="article" className="media">
          <a className="thumb media-thumb" href={URL} target="_blank" rel="noopener noreferrer" aria-label="Watch the WNKY coverage of MoneyBot">
            <img src="/Thumbnail.png" alt="MoneyBot WNKY Media Coverage" loading="lazy" />
            <span className="play">
              <Play size={18} weight="fill" />
            </span>
          </a>
          <div className="media-content">
            <div className="media-source">
              <img src="/wnky.jpeg" alt="" width="32" height="32" />
              <span>WNKY 40 News</span>
            </div>
            <h3>MoneyBot Enters Classrooms Around the Region</h3>
            <p>
              WNKY News 40 coverage featuring MoneyBot LLC&rsquo;s initiative to bring financial literacy
              education to classrooms across the region.
            </p>
            <figure className="quote">
              <blockquote>
                &ldquo;Millions of students are graduating without knowing what financial education is like,
                what assets are, what liabilities. Now, we are kind of giving them financial education,
                which I think is very important for students to live a better life.&rdquo;
              </blockquote>
              <figcaption>Venkat Sai Kolli, Web Design &amp; Developer Specialist at MoneyBot LLC</figcaption>
            </figure>
            <a className="btn btn-ghost btn-sm" href={URL} target="_blank" rel="noopener noreferrer">
              Watch Video &amp; Read Article
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
