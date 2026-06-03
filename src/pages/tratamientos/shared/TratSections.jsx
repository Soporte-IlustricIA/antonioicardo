import { useState } from 'react'
import { Link } from 'react-router-dom'
import { tratamientos } from '../../../data/tratamientos'

export function TratStatsBar({ t }) {
  return (
    <div className="trat-stats-bar">
      <div className="container">
        <div className="trat-stats-inner">
          <div className="trat-stat-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <div>
              <div className="trat-stat-label">Duración</div>
              <div className="trat-stat-val">{t.duracion}</div>
            </div>
          </div>
          <div className="trat-stat-div" />
          <div className="trat-stat-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <div>
              <div className="trat-stat-label">Recuperación</div>
              <div className="trat-stat-val">{t.recuperacion}</div>
            </div>
          </div>
          <div className="trat-stat-div" />
          <div className="trat-stat-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div>
              <div className="trat-stat-label">Resultados</div>
              <div className="trat-stat-val">{t.resultados}</div>
            </div>
          </div>
          <a className="btn btn-primary trat-stat-cta" href="tel:+34966308811">
            Reservar ahora
          </a>
        </div>
      </div>
    </div>
  )
}

export function TratIntro({ t }) {
  return (
    <section className="trat-intro">
      <div className="container">
        <div className="trat-intro-grid">
          <div className="trat-intro-img-wrap" data-reveal>
            <img src={t.imagenes[0]} alt={t.nombre} className="trat-intro-img" loading="lazy" />
          </div>
          <div className="trat-intro-body" data-reveal data-delay="2">
            <span className="eyebrow">· En qué consiste</span>
            <h2>Conoce el tratamiento</h2>
            <p>{t.descripcionLarga}</p>
            <div className="trat-tecnicas-wrap">
              {t.tecnicas.map(tec => (
                <span key={tec} className="trat-tecnica-pill">{tec}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TratBenefits({ t }) {
  return (
    <section className="trat-benefits">
      <div className="container">
        <div className="trat-sec-head" data-reveal>
          <span className="eyebrow">· Por qué elegirnos</span>
          <h2>Ventajas del tratamiento</h2>
        </div>
        <div className="trat-benefits-grid">
          {t.beneficios.map((b, i) => (
            <div key={i} className="trat-benefit-card" data-reveal data-delay={String(i + 1)}>
              <div className="trat-benefit-num">0{i + 1}</div>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TratSteps({ t }) {
  return (
    <section className="trat-steps">
      <div className="container">
        <div className="trat-sec-head" data-reveal>
          <span className="eyebrow">· El proceso</span>
          <h2>¿Cómo funciona?</h2>
        </div>
        <div className="trat-steps-grid">
          {t.pasos.map((p, i) => (
            <div key={i} className="trat-step" data-reveal data-delay={String(i + 1)}>
              <div className="trat-step-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{p.titulo}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TratGallery({ t }) {
  const [idx, setIdx] = useState(0)
  return (
    <section className="trat-gallery">
      <div className="trat-gallery-viewport">
        <div className="trat-gallery-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {t.imagenes.map((img, i) => (
            <div key={i} className="trat-gallery-slide">
              <img src={img} alt={`${t.nombre} ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
        <button className="trat-gallery-btn prev" onClick={() => setIdx(v => (v - 1 + t.imagenes.length) % t.imagenes.length)} aria-label="Anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button className="trat-gallery-btn next" onClick={() => setIdx(v => (v + 1) % t.imagenes.length)} aria-label="Siguiente">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
        </button>
        <div className="trat-gallery-dots">
          {t.imagenes.map((_, i) => (
            <button key={i} className={`trat-gallery-dot${i === idx ? ' active' : ''}`} onClick={() => setIdx(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function TratForWho({ t }) {
  return (
    <section className="trat-forwho">
      <div className="container">
        <div className="trat-forwho-grid">
          <div className="trat-forwho-img-wrap" data-reveal>
            <img src={t.imagenes[1] ?? t.imagenes[0]} alt="Para quién" loading="lazy" />
          </div>
          <div className="trat-forwho-body" data-reveal data-delay="2">
            <span className="eyebrow">· ¿Es para mí?</span>
            <h2>¿Para quién es ideal?</h2>
            <p>{t.paraQuien}</p>
            <Link to="/contacto" className="btn btn-primary" style={{ marginTop: '8px' }}>
              Consulta gratuita
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TratFAQ({ t }) {
  const [open, setOpen] = useState(null)
  return (
    <section className="trat-faq">
      <div className="container">
        <div className="trat-sec-head" data-reveal>
          <span className="eyebrow">· FAQ</span>
          <h2>Preguntas frecuentes</h2>
        </div>
        <div className="trat-faq-list">
          {t.faq.map((item, i) => (
            <div key={i} className={`trat-faq-item${open === i ? ' open' : ''}`}>
              <button className="trat-faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{item.q}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="trat-faq-chevron">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="trat-faq-a"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TratRelated({ slug }) {
  const related = tratamientos.filter(tr => tr.slug !== slug).slice(0, 3)
  return (
    <section className="trat-related">
      <div className="container">
        <div className="trat-sec-head" data-reveal>
          <span className="eyebrow">· Descubre más</span>
          <h2>Otros tratamientos</h2>
        </div>
        <div className="trat-related-grid">
          {related.map(tr => (
            <Link key={tr.slug} to={`/tratamientos/${tr.slug}`} className="trat-related-card" data-reveal>
              <div className="trat-related-img">
                <img src={tr.imagenHero} alt={tr.nombre} loading="lazy" />
              </div>
              <div className="trat-related-body">
                <h3>{tr.nombre}</h3>
                <p>{tr.descripcionCorta}</p>
                <span className="trat-related-link">Ver tratamiento →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TratFinalCTA() {
  return (
    <section className="trat-final-cta">
      <div className="container">
        <div className="trat-final-cta-inner">
          <span className="eyebrow" style={{ color: '#A89378' }}>· Reserva tu cita</span>
          <h2>¿Listo para empezar?</h2>
          <p>Nuestro equipo médico te asesorará sin compromiso. Primera consulta gratuita.</p>
          <div className="trat-final-cta-btns">
            <a className="btn btn-light" href="tel:+34966308811">Alicante · 966 308 811</a>
            <a className="btn btn-light" href="tel:+34965450470">Elche · 965 450 470</a>
            <a className="btn trat-btn-wa" href="https://wa.me/34680637247" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}
