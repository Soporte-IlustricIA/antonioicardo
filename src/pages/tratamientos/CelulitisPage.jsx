import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { tratamientos } from '../../data/tratamientos'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import {
  TratStatsBar, TratIntro, TratGallery,
  TratForWho, TratFAQ, TratRelated, TratFinalCTA
} from './shared/TratSections'

const t = tratamientos.find(tr => tr.slug === 'celulitis')

const FLIP_CARDS = [
  {
    front: 'Mesoterapia corporal',
    back: 'Microinyecciones de sustancias lipolíticas y vitaminas directamente en la zona afectada. Rompe el tejido fibroso y mejora la circulación local.',
  },
  {
    front: 'Carboxiterapia',
    back: 'Infiltración de CO₂ medicinal que estimula la microcirculación y activa el metabolismo celular. Resultados visibles desde la 3ª sesión.',
  },
  {
    front: 'Radiofrecuencia',
    back: 'Energía de radiofrecuencia que calienta la dermis en profundidad. Estimula el colágeno y tensa la piel, reduciendo la piel de naranja.',
  },
  {
    front: 'Lipolaser',
    back: 'Láser de baja intensidad que desintegra los depósitos de grasa localizada. Sin dolor ni recuperación.',
  },
]

const PROGRESS_BARS = [
  { zona: 'Muslos', pct: 85 },
  { zona: 'Glúteos', pct: 80 },
  { zona: 'Abdomen', pct: 75 },
  { zona: 'Brazos', pct: 70 },
]

function AnimatedBar({ pct }) {
  const ref = useRef(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setW(pct); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setW(pct); obs.disconnect() }
    }, { threshold: 0.6 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [pct])
  return (
    <div className="cel-bar-track" ref={ref}>
      <div className="cel-bar-fill" style={{ width: `${w}%` }} />
    </div>
  )
}

export default function CelulitisPage() {
  useScrollReveal()

  // parallax testimonial
  const testiRef = useRef(null)
  const [testiY, setTestiY] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      if (!testiRef.current) return
      const r = testiRef.current.getBoundingClientRect()
      const relY = (window.innerHeight / 2 - r.top - r.height / 2) * 0.2
      setTestiY(relY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="trat-hero" style={{ backgroundImage: `url(${t.imagenHero})` }}>
        <div className="trat-hero-overlay" />
        <div className="trat-hero-inner">
          <Link to="/tratamientos" className="trat-breadcrumb">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Todos los tratamientos
          </Link>
          <div className="trat-hero-text" data-reveal>
            <span className="trat-eyebrow">Clínicas Icardo · Desde 1992</span>
            <h1>{t.nombre}</h1>
            <p>{t.descripcionCorta}</p>
            <div className="trat-hero-ctas">
              <a className="btn btn-light" href="tel:+34966308811">
                Pedir cita
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
              <a className="btn trat-btn-ghost" href="https://wa.me/34680637247" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <TratStatsBar t={t} />
      <TratIntro t={t} customImage="/assets/celulitis3.webp" />

      {/* FLIP CARDS de técnicas */}
      <section className="flip-section">
        <div className="container">
          <div className="trat-sec-head" data-reveal>
            <span className="eyebrow">· Técnicas</span>
            <h2>Métodos de tratamiento</h2>
            <p style={{ color: 'var(--muted)', fontSize: '15px', marginTop: '8px' }}>Pasa el cursor sobre cada técnica para ver el detalle</p>
          </div>
          <div className="flip-grid" data-reveal>
            {FLIP_CARDS.map((c, i) => (
              <div key={i} className="flip-card">
                <div className="flip-inner">
                  <div className="flip-front">
                    <span className="flip-num">0{i + 1}</span>
                    <h3>{c.front}</h3>
                    <span className="flip-hint">Ver más →</span>
                  </div>
                  <div className="flip-back">
                    <p>{c.back}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRESS BARS */}
      <section className="cel-progress-section">
        <div className="container">
          <div className="cel-progress-grid">
            <div data-reveal>
              <span className="eyebrow">· Efectividad por zona</span>
              <h2>Resultados comprobados</h2>
              <p style={{ color: 'var(--muted)', fontSize: '15px', margin: '16px 0 32px' }}>Porcentaje de mejora media tras un ciclo completo de tratamiento.</p>
              <div className="cel-bars">
                {PROGRESS_BARS.map((b, i) => (
                  <div key={i} className="cel-bar-item">
                    <div className="cel-bar-header">
                      <span>{b.zona}</span>
                      <span className="cel-bar-pct">{b.pct}%</span>
                    </div>
                    <AnimatedBar pct={b.pct} />
                  </div>
                ))}
              </div>
            </div>
            <div className="cel-progress-img" data-reveal data-delay="2">
              <img src="/assets/celulitis2.webp" alt="Resultados" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX TESTIMONIAL */}
      <section className="cel-testi-section" ref={testiRef}>
        <div className="cel-testi-bg" style={{ transform: `translateY(${testiY}px)` }}>
          <img src={t.imagenes[1]} alt="" />
        </div>
        <div className="cel-testi-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <blockquote className="cel-testi-quote" data-reveal>
            <p>"Los resultados fueron visibles desde las primeras sesiones. El equipo del doctor Icardo fue muy profesional y cercano durante todo el proceso."</p>
            <footer>
              <strong>María C.</strong>
              <span>Paciente · Tratamiento anticelulítico</span>
            </footer>
          </blockquote>
        </div>
      </section>

      <TratForWho t={t} customImage="/assets/celulitis.webp" />
      <TratFAQ t={t} />
      <TratRelated slug={t.slug} />
      <TratFinalCTA />
      <Footer />
    </>
  )
}
