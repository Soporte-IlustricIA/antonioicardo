import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { tratamientos } from '../../data/tratamientos'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import {
  TratStatsBar, TratIntro, TratBenefits,
  TratForWho, TratFAQ, TratRelated, TratFinalCTA
} from './shared/TratSections'

const t = tratamientos.find(tr => tr.slug === 'adelgazamiento')

const SEMANAS = [
  { week: 'Semana 1–2', title: 'Evaluación inicial', desc: 'Analítica completa, composición corporal y diseño de tu plan personalizado.' },
  { week: 'Semana 3–4', title: 'Inicio del programa', desc: 'Comienzas el plan nutricional + 1ª sesión de mesoterapia lipolítica.' },
  { week: 'Semana 5–8', title: 'Programa activo', desc: 'Sesiones semanales, seguimiento nutricional y ajustes de plan.' },
  { week: 'Semana 9–10', title: 'Evaluación intermedia', desc: 'Revisión de resultados, ajuste de técnicas y motivación.' },
  { week: 'Semana 11–12', title: 'Cierre y mantenimiento', desc: 'Alcanzas el objetivo. Plan de mantenimiento para evitar el efecto rebote.' },
]

export default function AdelgazamientoPage() {
  useScrollReveal()

  // Calculadora
  const [pesoActual, setPesoActual] = useState('')
  const [pesoObjetivo, setPesoObjetivo] = useState('')
  const [resultado, setResultado] = useState(null)

  function calcular() {
    const actual = parseFloat(pesoActual)
    const objetivo = parseFloat(pesoObjetivo)
    if (!actual || !objetivo || actual <= objetivo) {
      setResultado({ error: true })
      return
    }
    const diff = actual - objetivo
    const semanas = Math.ceil(diff / 0.5) // ~0.5kg/semana sano
    setResultado({ diff: diff.toFixed(1), semanas, meses: Math.ceil(semanas / 4) })
  }

  return (
    <>
      <Navbar />

      {/* HERO — Ken Burns effect */}
      <section className="trat-hero ken-burns-hero" style={{ backgroundImage: 'none' }}>
        <div className="ken-burns-bg" style={{ backgroundImage: `url(${t.imagenHero})` }} />
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
      <TratIntro t={t} />
      <TratBenefits t={t} />

      {/* VERTICAL TIMELINE */}
      <section className="adelg-timeline-section">
        <div className="container">
          <div className="trat-sec-head" data-reveal>
            <span className="eyebrow">· Tu programa</span>
            <h2>Semana a semana</h2>
          </div>
          <div className="adelg-timeline">
            {SEMANAS.map((s, i) => (
              <div key={i} className="adelg-week" data-reveal data-delay={String((i % 3) + 1)}>
                <div className="adelg-week-marker">
                  <div className="adelg-week-dot" />
                  {i < SEMANAS.length - 1 && <div className="adelg-week-line" />}
                </div>
                <div className="adelg-week-body">
                  <span className="adelg-week-label">{s.week}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULADORA */}
      <section className="calc-section">
        <div className="container">
          <div className="calc-card" data-reveal>
            <div className="calc-left">
              <span className="eyebrow">· Herramienta</span>
              <h2>¿Cuánto tiempo necesitas?</h2>
              <p>Estima el tiempo aproximado para alcanzar tu peso ideal con nuestro programa. Sin compromisos — es solo una orientación.</p>
            </div>
            <div className="calc-right">
              <div className="calc-fields">
                <div className="calc-field">
                  <label>Peso actual (kg)</label>
                  <input
                    type="number"
                    placeholder="Ej: 78"
                    value={pesoActual}
                    onChange={e => { setPesoActual(e.target.value); setResultado(null) }}
                    min="30" max="300"
                  />
                </div>
                <div className="calc-field">
                  <label>Peso objetivo (kg)</label>
                  <input
                    type="number"
                    placeholder="Ej: 65"
                    value={pesoObjetivo}
                    onChange={e => { setPesoObjetivo(e.target.value); setResultado(null) }}
                    min="30" max="300"
                  />
                </div>
              </div>
              <button className="btn btn-primary calc-btn" onClick={calcular}>
                Calcular
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </button>
              {resultado && !resultado.error && (
                <div className="calc-result">
                  <div className="calc-result-num">{resultado.diff} kg</div>
                  <p>A perder · Estimado <strong>{resultado.semanas} semanas</strong> ({resultado.meses} {resultado.meses === 1 ? 'mes' : 'meses'})</p>
                  <p className="calc-disclaimer">Estimación orientativa. El ritmo real depende de cada persona y plan médico.</p>
                </div>
              )}
              {resultado?.error && (
                <p className="calc-error">Introduce un peso objetivo menor al peso actual.</p>
              )}
            </div>
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
