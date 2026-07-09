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

const t = tratamientos.find(tr => tr.slug === 'varices')

function VerticalSteps({ pasos }) {
  const refs = useRef([])
  const [visible, setVisible] = useState([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(pasos.map((_, i) => i))
      return
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const i = parseInt(e.target.dataset.step)
        if (e.isIntersecting) setVisible(v => v.includes(i) ? v : [...v, i])
      })
    }, { threshold: 0.4 })
    refs.current.forEach(r => r && obs.observe(r))
    return () => obs.disconnect()
  }, [pasos])

  return (
    <div className="vsteps-list">
      {pasos.map((p, i) => (
        <div
          key={i}
          ref={el => refs.current[i] = el}
          data-step={i}
          className={`vstep${visible.includes(i) ? ' vstep-visible' : ''}`}
        >
          <div className="vstep-left">
            <div className="vstep-circle">{i + 1}</div>
            {i < pasos.length - 1 && <div className="vstep-line" />}
          </div>
          <div className="vstep-body">
            <h3>{p.titulo}</h3>
            <p>{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function VaricesPage() {
  useScrollReveal()

  return (
    <>
      <Navbar />

      {/* HERO — animated gradient */}
      <section className="trat-hero varices-hero" style={{ backgroundImage: `url(${t.imagenHero})` }}>
        <div className="varices-gradient-overlay" />
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
      <TratIntro t={t} customImage="/assets/varices2.webp" />
      <TratBenefits t={t} />

      {/* VERTICAL PROGRESS STEPS */}
      <section className="trat-vsteps-section">
        <div className="container">
          <div className="trat-sec-head" style={{ textAlign: 'center' }} data-reveal>
            <span className="eyebrow">· El proceso</span>
            <h2>Así es el tratamiento</h2>
          </div>
          <VerticalSteps pasos={t.pasos} />
        </div>
      </section>

      <TratForWho t={t} customImage="/assets/varices.webp" />

      {/* FAQ con animación smooth */}
      <TratFAQ t={t} />

      <TratRelated slug={t.slug} />
      <TratFinalCTA />
      <Footer />
    </>
  )
}
