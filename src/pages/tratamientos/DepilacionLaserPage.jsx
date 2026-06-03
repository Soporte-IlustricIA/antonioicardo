import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { tratamientos } from '../../data/tratamientos'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import {
  TratStatsBar, TratIntro, TratBenefits, TratGallery,
  TratForWho, TratFAQ, TratRelated, TratFinalCTA
} from './shared/TratSections'

const t = tratamientos.find(tr => tr.slug === 'depilacion-laser')

const ZONAS = [
  { id: 'axila', label: 'Axilas', info: 'Zona de alta eficacia. 4-6 sesiones para reducción permanente del 80-90%.' },
  { id: 'piernas', label: 'Piernas completas', info: 'Desde rodilla hasta tobillo o pierna completa. 6-8 sesiones recomendadas.' },
  { id: 'bikini', label: 'Bikini / Ingles', info: 'Área delicada tratada con máxima seguridad. Sistema de enfriamiento integrado.' },
  { id: 'cara', label: 'Rostro', info: 'Bigote, patillas, barbilla y otras zonas faciales. 5-7 sesiones.' },
  { id: 'espalda', label: 'Espalda', info: 'Zona amplia con excelentes resultados. 6-8 sesiones espaciadas 4-6 semanas.' },
  { id: 'brazos', label: 'Brazos', info: 'Brazos completos o medios brazos. Resultados visibles desde la 2ª sesión.' },
]

const SESIONES = [
  { n: '01', label: 'Valoración', desc: 'Análisis de piel y vello, parametrización del láser' },
  { n: '02', label: 'Sesión inicial', desc: '1ª aplicación — reducción inmediata visible' },
  { n: '03', label: '4–6 semanas', desc: '2ª sesión coincidiendo con nuevo ciclo de crecimiento' },
  { n: '04', label: 'Progreso', desc: 'Sesiones 3–5 — reducción acumulativa del 60–80%' },
  { n: '05', label: 'Resultado final', desc: 'Ciclo completo — reducción permanente del 80–90%' },
]

export default function DepilacionLaserPage() {
  useScrollReveal()
  const [activeZona, setActiveZona] = useState(ZONAS[0])

  return (
    <>
      <Navbar />

      {/* HERO — dark con efecto de luz láser */}
      <section className="trat-hero laser-hero" style={{ backgroundImage: `url(${t.imagenHero})` }}>
        <div className="laser-overlay" />
        <div className="laser-beam laser-beam-1" />
        <div className="laser-beam laser-beam-2" />
        <div className="laser-beam laser-beam-3" />
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

      {/* ZONE SELECTOR */}
      <section className="zona-section">
        <div className="container">
          <div className="trat-sec-head" data-reveal>
            <span className="eyebrow">· Zonas de tratamiento</span>
            <h2>¿Qué zona quieres tratar?</h2>
          </div>
          <div className="zona-selector" data-reveal>
            <div className="zona-list">
              {ZONAS.map(z => (
                <button
                  key={z.id}
                  className={`zona-btn${activeZona.id === z.id ? ' active' : ''}`}
                  onClick={() => setActiveZona(z)}
                >
                  <span className="zona-dot" />
                  {z.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="zona-arrow">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
            <div className="zona-detail">
              <div className="zona-detail-icon">✦</div>
              <h3>{activeZona.label}</h3>
              <p>{activeZona.info}</p>
              <a className="btn btn-primary" href="tel:+34966308811" style={{ marginTop: '16px', display: 'inline-flex' }}>
                Consultar precio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SESSION TIMELINE */}
      <section className="session-timeline-section">
        <div className="container">
          <div className="trat-sec-head" data-reveal>
            <span className="eyebrow">· Plan de sesiones</span>
            <h2>Tu hoja de ruta</h2>
          </div>
          <div className="session-timeline" data-reveal>
            {SESIONES.map((s, i) => (
              <div key={i} className="session-step">
                <div className="session-step-num">{s.n}</div>
                <div className="session-step-connector" />
                <div className="session-step-body">
                  <div className="session-step-label">{s.label}</div>
                  <div className="session-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TratGallery t={t} />
      <TratForWho t={t} />
      <TratFAQ t={t} />
      <TratRelated slug={t.slug} />
      <TratFinalCTA />
      <Footer />
    </>
  )
}
