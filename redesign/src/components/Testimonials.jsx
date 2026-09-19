import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { TESTIMONIALS_ENDPOINT, TESTIMONIAL_PHOTOS } from '../config.js'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed (${res.status}): ${url}`)
  return res.json()
}

// Remote (Apps Script) first, then the local fallback file, same as the original site.
async function loadTestimonials() {
  let data
  try {
    data = await fetchJson(TESTIMONIALS_ENDPOINT)
  } catch (err) {
    console.error('Unable to load approved testimonials; using local fallback.', err)
    try {
      data = await fetchJson('/testimonials.json')
    } catch (fallbackErr) {
      console.error('Unable to load local testimonial fallback.', fallbackErr)
    }
  }
  return Array.isArray(data) ? data.filter((t) => t && t.name && t.quote) : []
}

export default function Testimonials() {
  const [items, setItems] = useState(null) // null = loading
  const [active, setActive] = useState(0)
  const trackRef = useRef(null)

  useEffect(() => {
    let alive = true
    loadTestimonials().then((list) => alive && setItems(list))
    return () => {
      alive = false
    }
  }, [])

  // Dot state via IntersectionObserver rooted on the track (no scroll listeners).
  useEffect(() => {
    const track = trackRef.current
    if (!track || !items?.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index))
        })
      },
      { root: track, threshold: 0.6 }
    )
    track.querySelectorAll('[data-index]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  const scrollBy = (dir) => {
    const track = trackRef.current
    const card = track?.querySelector('[data-index]')
    const distance = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8
    track.scrollBy({ left: dir * distance, behavior: 'smooth' })
  }

  const goTo = (i) =>
    trackRef.current
      ?.querySelector(`[data-index="${i}"]`)
      ?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })

  const loading = items === null
  const empty = items && items.length === 0

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <SectionHead
          title="Kind words from good people."
          desc="A few thoughtful notes from people I&rsquo;ve had the chance to build, learn, and grow with."
          action={
            <Reveal className="section-head-action" delay={0.2}>
              <a className="btn btn-ghost btn-sm" href="https://forms.gle/8mBCcX6QFXVdPpMT8" target="_blank" rel="noopener noreferrer">
                Share feedback <ArrowUpRight size={15} weight="bold" />
              </a>
            </Reveal>
          }
        />

        <div className="carousel">
          <button className="carousel-btn" type="button" aria-label="Previous testimonials" onClick={() => scrollBy(-1)}>
            <ArrowLeft size={18} weight="bold" />
          </button>
          <div className="carousel-track" ref={trackRef} aria-live="polite" aria-label="Testimonials">
            {loading &&
              [0, 1, 2].map((i) => (
                <div className="testimonial testimonial--skeleton" key={i} aria-hidden="true">
                  <span className="sk sk-avatar" />
                  <span className="sk sk-line" />
                  <span className="sk sk-line" />
                  <span className="sk sk-line sk-short" />
                </div>
              ))}
            {empty && <p className="carousel-empty">Approved testimonials will appear here.</p>}
            {items?.map((t, i) => {
              const photo = t.photo || TESTIMONIAL_PHOTOS[t.name]
              return (
                <article className="testimonial" key={`${t.name}-${i}`} data-index={i}>
                  <div className="testimonial-person">
                    {photo && <img src={encodeURI(photo)} alt={`${t.name} portrait`} loading="lazy" />}
                    <div>
                      <h3>{t.name}</h3>
                      {t.role && <p>{t.role}</p>}
                    </div>
                  </div>
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                </article>
              )
            })}
          </div>
          <button className="carousel-btn" type="button" aria-label="Next testimonials" onClick={() => scrollBy(1)}>
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>

        {items?.length > 1 && (
          <div className="dots">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === active ? 'is-active' : ''}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
