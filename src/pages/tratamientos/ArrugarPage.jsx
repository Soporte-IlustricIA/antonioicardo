import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { tratamientos } from '../../data/tratamientos'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import {
  TratStatsBar, TratCityLinks, TratIntro, TratBenefits, TratGallery,
  TratForWho, TratFAQ, TratRelated, TratFinalCTA
} from './shared/TratSections'

const t = tratamientos.find(tr => tr.slug === 'arrugas')

const COUNTERS = [
  { end: 40, prefix: '+', suffix: '', label: 'años de experiencia' },
  { end: 5000, prefix: '+', suffix: '', label: 'pacientes tratados' },
  { end: 95, prefix: '', suffix: '%', label: 'satisfacción' },
  { end: 12, prefix: 'Hasta ', suffix: ' meses', label: 'de duración' },
]

function AnimCounter({ end, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(end); return }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let t0 = null
        const dur = 1800
        const tick = ts => {
          if (!t0) t0 = ts
          const p = Math.min((ts - t0) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(Math.round(end * ease))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{prefix}{val.toLocaleString('es-ES')}{suffix}</span>
}

export default function ArrugarPage() {
  useScrollReveal()

  // Parallax
  const heroRef = useRef(null)
  const bgRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current || !heroRef.current) return
      const { bottom } = heroRef.current.getBoundingClientRect()
      if (bottom > 0) bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Before/After slider
  const sliderRef = useRef(null)
  const [sliderPos, setSliderPos] = useState(50)
  const dragging = useRef(false)

  function moveSlider(clientX) {
    if (!sliderRef.current) return
    const r = sliderRef.current.getBoundingClientRect()
    setSliderPos(Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <>
      <Navbar />

      {/* HERO — parallax */}
      <section className="trat-hero trat-hero-parallax" ref={heroRef} style={{ backgroundImage: 'none' }}>
        <div
          ref={bgRef}
          className="trat-parallax-bg"
          style={{ backgroundImage: `url(${t.imagenHero})` }}
        />
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
              <a
                className="btn trat-btn-ghost"
                href="#en-que-consiste"
                onClick={e => { e.preventDefault(); document.getElementById('en-que-consiste')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                Conocer tratamiento
              </a>
            </div>
          </div>
        </div>
      </section>

      <TratStatsBar t={t} />
      <TratCityLinks slug={t.slug} />

      <TratIntro t={t} customImage="/assets/arrugas2.webp" />

      {/* BEFORE / AFTER SLIDER */}
      <section className="trat-ba-section">
        <div className="container">
          <div className="trat-sec-head" data-reveal>
            <span className="eyebrow">· Resultados reales</span>
            <h2>Antes y después</h2>
            <p style={{ color: 'var(--muted)', fontSize: '15px', marginTop: '8px' }}>Arrastra el control para comparar</p>
          </div>
          <div
            className="ba-slider"
            ref={sliderRef}
            onPointerDown={e => { dragging.current = true; sliderRef.current.setPointerCapture(e.pointerId); moveSlider(e.clientX) }}
            onPointerMove={e => dragging.current && moveSlider(e.clientX)}
            onPointerUp={() => dragging.current = false}
            onPointerCancel={() => dragging.current = false}
          >
            <img src={t.imagenes[0]} alt="Después" className="ba-img-after" draggable={false} />
            <img
              src={t.imagenes[2]}
              alt="Antes"
              className="ba-img-before"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              draggable={false}
            />
            <div className="ba-handle" style={{ left: `${sliderPos}%` }}>
              <div className="ba-handle-line" />
              <div className="ba-handle-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
                </svg>
              </div>
              <div className="ba-handle-line" />
            </div>
            <span className="ba-tag ba-tag-l">Antes</span>
            <span className="ba-tag ba-tag-r">Después</span>
          </div>
        </div>
      </section>

      <TratBenefits t={t} />

      {/* STEPS — custom for arrugas: 3-column layout with connecting line */}
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

      <TratForWho t={t} />
      <TratFAQ t={t} />
      <TratRelated slug={t.slug} />
      <TratFinalCTA />
      <Footer />
    </>
  )
}
