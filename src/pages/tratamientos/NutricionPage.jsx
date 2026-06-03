import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { tratamientos } from '../../data/tratamientos'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import {
  TratStatsBar, TratBenefits, TratSteps,
  TratForWho, TratFAQ, TratRelated, TratFinalCTA
} from './shared/TratSections'

const t = tratamientos.find(tr => tr.slug === 'nutricion')

const PLANES = [
  {
    nombre: 'Plan Básico',
    desc: 'Consulta inicial + plan semanal personalizado. Ideal para iniciarte.',
    incluye: ['Consulta inicial 60 min', 'Plan semanal', 'Recetas incluidas'],
  },
  {
    nombre: 'Plan Seguimiento',
    desc: 'Para quienes quieren cambiar hábitos con apoyo continuo.',
    incluye: ['4 consultas mensuales', 'Plan adaptativo', 'Soporte por WhatsApp'],
    destacado: true,
  },
  {
    nombre: 'Plan Deportivo',
    desc: 'Nutrición específica para optimizar el rendimiento y la recuperación.',
    incluye: ['Evaluación rendimiento', 'Plan periodizado', 'Suplementación guiada'],
  },
]

const COMIDAS = [
  { hora: '8:00', nombre: 'Desayuno', icono: '☀️', ejemplo: 'Porridge de avena con fruta fresca y nueces' },
  { hora: '11:00', nombre: 'Media mañana', icono: '🍎', ejemplo: 'Fruta de temporada + puñado de almendras' },
  { hora: '14:00', nombre: 'Comida', icono: '🥗', ejemplo: 'Proteína + verduras + hidratos de calidad' },
  { hora: '17:30', nombre: 'Merienda', icono: '🥛', ejemplo: 'Yogur natural con semillas de chía' },
  { hora: '20:30', nombre: 'Cena', icono: '🌙', ejemplo: 'Cena ligera: pescado o huevo + vegetales' },
]

export default function NutricionPage() {
  useScrollReveal()

  return (
    <>
      <Navbar />

      {/* HERO — editorial cálido */}
      <section className="trat-hero nutri-hero" style={{ backgroundImage: `url(${t.imagenHero})` }}>
        <div className="nutri-hero-overlay" />
        <div className="trat-hero-inner">
          <Link to="/tratamientos" className="trat-breadcrumb nutri-breadcrumb">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Todos los tratamientos
          </Link>
          <div className="trat-hero-text" data-reveal>
            <span className="trat-eyebrow nutri-eyebrow">Clínicas Icardo · Nutrición</span>
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

      {/* PERFIL DEL ESPECIALISTA */}
      <section className="nutri-specialist-section">
        <div className="container">
          <div className="nutri-specialist-grid">
            <div className="nutri-specialist-img" data-reveal>
              <img src="/assets/sergio.webp" alt="Sergio Icardo" loading="lazy" />
              <div className="nutri-specialist-badge">
                <span>Máster en</span>
                <strong>Nutrición y Dietética</strong>
              </div>
            </div>
            <div className="nutri-specialist-body" data-reveal data-delay="2">
              <span className="eyebrow">· Tu especialista</span>
              <h2>Sergio Icardo Belmonte</h2>
              <p className="nutri-bio">
                Graduado en Nutrición Humana y Dietética con Máster Universitario en Nutrición y Dietética. Formación continuada en nutrición deportiva, clínica y de precisión.
              </p>
              <p className="nutri-bio">
                Su filosofía: sin dietas milagro, sin restricciones absurdas. Planes personalizados que encajan con tu vida real y que puedes mantener a largo plazo.
              </p>
              <div className="nutri-spec-pills">
                <span>Nutrición deportiva</span>
                <span>Pérdida de peso</span>
                <span>Nutrición clínica</span>
                <span>Cambio de hábitos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UN DÍA EN TU PLAN */}
      <section className="meal-day-section">
        <div className="container">
          <div className="trat-sec-head" data-reveal>
            <span className="eyebrow">· Ejemplo real</span>
            <h2>Un día en tu plan</h2>
          </div>
          <div className="meal-day-list">
            {COMIDAS.map((c, i) => (
              <div key={i} className="meal-item" data-reveal data-delay={String((i % 3) + 1)}>
                <div className="meal-time">{c.hora}</div>
                <div className="meal-icon">{c.icono}</div>
                <div className="meal-body">
                  <strong>{c.nombre}</strong>
                  <span>{c.ejemplo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES con hover lift */}
      <section className="nutri-planes-section">
        <div className="container">
          <div className="trat-sec-head" data-reveal>
            <span className="eyebrow">· Modalidades</span>
            <h2>Elige tu plan</h2>
          </div>
          <div className="nutri-planes-grid">
            {PLANES.map((p, i) => (
              <div key={i} className={`nutri-plan-card${p.destacado ? ' nutri-plan-featured' : ''}`} data-reveal data-delay={String(i + 1)}>
                {p.destacado && <span className="nutri-plan-badge">Más elegido</span>}
                <h3>{p.nombre}</h3>
                <p>{p.desc}</p>
                <ul className="nutri-plan-list">
                  {p.incluye.map((item, j) => (
                    <li key={j}>
                      <span className="nutri-plan-check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a className="btn btn-primary" href="tel:+34966308811" style={{ marginTop: 'auto', display: 'inline-flex' }}>
                  Consultar
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TratBenefits t={t} />
      <TratSteps t={t} />
      <TratForWho t={t} />
      <TratFAQ t={t} />
      <TratRelated slug={t.slug} />
      <TratFinalCTA />
      <Footer />
    </>
  )
}
