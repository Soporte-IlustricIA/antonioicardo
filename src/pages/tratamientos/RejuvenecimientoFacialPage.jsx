import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BeforeAfterSlider from '../../components/BeforeAfterSlider'
import { tratamientos } from '../../data/tratamientos'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import {
  TratIntro, TratStatsBar, TratBenefits, TratSteps, TratGallery,
  TratForWho, TratFAQ, TratRelated, TratFinalCTA
} from './shared/TratSections'

const t = tratamientos.find(tr => tr.slug === 'rejuvenecimiento-facial')

const TECNICAS_TABS = [
  {
    id: 'laser-ipl',
    label: 'Láser & IPL',
    titulo: 'Láser CO2 Fraccionado e IPL',
    desc: 'Combinamos el poder regenerador del Láser CO2 para textura y arrugas profundas con la Luz Pulsada Intensa (IPL) para eliminar manchas y rojeces, logrando un tono uniforme y rejuvenecido.',
    beneficios: ['Elimina manchas y pigmentación', 'Mejora drástica de la textura', 'Trata poros abiertos', 'Estimulación profunda de colágeno'],
  },
  {
    id: 'lifting',
    label: 'Lifting sin Cirugía',
    titulo: 'Ultrasonidos (HIFU) & Radiofrecuencia',
    desc: 'Tecnología de última generación para tensar la piel y redefinir el óvalo facial. Los ultrasonidos focalizados y la radiofrecuencia actúan en las capas profundas para combatir la flacidez de forma no invasiva.',
    beneficios: ['Efecto tensor inmediato', 'Redefinición del arco mandibular', 'Sin cirugía ni agujas', 'Resultados duraderos'],
  },
  {
    id: 'regenerativa',
    label: 'Medicina Regenerativa',
    titulo: 'Exosomas & Polinucleótidos',
    desc: 'La vanguardia en rejuvenecimiento celular. Utilizamos exosomas y polinucleótidos para reparar el daño celular, potenciar la regeneración de los tejidos y mejorar la calidad de la piel desde el interior.',
    beneficios: ['Potente regeneración celular', 'Mejora la elasticidad y densidad', 'Efecto antiinflamatorio', 'Resultados de alta precisión'],
  },
  {
    id: 'nutricion',
    label: 'Nutrición & Brillo',
    titulo: 'Hidrafacial, Mesoterapia & Peelings',
    desc: 'Protocolos de limpieza profunda, hidratación y renovación celular. Combinamos la tecnología Hidrafacial con mesoterapia de vitaminas y peelings químicos para una piel radiante y vital.',
    beneficios: ['Limpieza y detoxificación profunda', 'Luminosidad instantánea', 'Hidratación multicapa', 'Renovación de la superficie cutánea'],
  },
]

const GALLERY_EXTRA = [
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
  'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
]

function TypewriterHero({ phrases }) {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(phrases[0])
      return
    }
    const current = phrases[phraseIdx]
    let timeout

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 65)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 32)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % phrases.length)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, phraseIdx, phrases])

  return (
    <span className="typewriter-text">
      {text}
      <span className="typewriter-cursor" />
    </span>
  )
}

export default function RejuvenecimientoFacialPage() {
  useScrollReveal()
  const [activeTab, setActiveTab] = useState('laser-ipl')
  const [lightbox, setLightbox] = useState(null)

  const tab = TECNICAS_TABS.find(tb => tb.id === activeTab)

  return (
    <>
      <Navbar />

      {/* HERO — typewriter */}
      <section className="trat-hero rejuv-hero" style={{ backgroundImage: `url(${t.imagenHero})` }}>
        <div className="trat-hero-overlay" />
        <div className="trat-hero-inner">
          <Link to="/tratamientos" className="trat-breadcrumb">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Todos los tratamientos
          </Link>
          <div className="trat-hero-text">
            <span className="trat-eyebrow">Clínicas Icardo · Desde 1992</span>
            <h1>
              {t.nombre}
              <span className="rejuv-typewriter-line">
                <TypewriterHero phrases={t.tecnicas} />
              </span>
            </h1>
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

      <TratIntro t={t} customImage="/assets/rejuvenecer.webp" imgStyle={{ objectPosition: 'top' }} />

      {/* TABS DE TÉCNICAS */}
      <section className="tecnicas-tabs-section">
        <div className="container">
          <div className="trat-sec-head" data-reveal>
            <span className="eyebrow">· Técnicas disponibles</span>
            <h2>Elige tu protocolo</h2>
          </div>
          <div className="tecnicas-tabs" data-reveal>
            <div className="tecnicas-tab-bar">
              {TECNICAS_TABS.map(tb => (
                <button
                  key={tb.id}
                  className={`tecnica-tab${activeTab === tb.id ? ' active' : ''}`}
                  onClick={() => setActiveTab(tb.id)}
                >
                  {tb.label}
                </button>
              ))}
            </div>
            <div className="tecnica-panel">
              <div className="tecnica-panel-body">
                <h3>{tab.titulo}</h3>
                <p>{tab.desc}</p>
                <ul className="tecnica-bens">
                  {tab.beneficios.map((b, i) => (
                    <li key={i}>
                      <span className="tecnica-ben-dot" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TratBenefits t={t} />
      <TratSteps t={t} />

      {/* BEFORE / AFTER SLIDER */}
      {t.antesImg && t.despuesImg && (
        <section className="trat-ba-section" data-reveal style={{ padding: '60px 0', background: 'var(--bg-light)' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            <BeforeAfterSlider 
              antesImg={t.antesImg} 
              despuesImg={t.despuesImg} 
              title="Resultados Reales: Rejuvenecimiento Facial"
              subtitle="Arrastra el control deslizante para comparar el antes y el después"
              aspectRatio="528/1413"
              maxWidth="420px"
            />
          </div>
        </section>
      )}

      <TratForWho t={t} />
      <TratFAQ t={t} />
      <TratRelated slug={t.slug} />
      <TratFinalCTA />
      <Footer />
    </>
  )
}
