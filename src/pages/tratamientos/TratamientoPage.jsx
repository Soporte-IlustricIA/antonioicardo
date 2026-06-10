import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { tratamientos } from '../../data/tratamientos'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import NotFound from '../NotFound'
import BeforeAfterSlider from '../../components/BeforeAfterSlider'

export default function TratamientoPage() {
  const { slug } = useParams()
  const t = tratamientos.find(tr => tr.slug === slug)
  const [faqOpen, setFaqOpen] = useState(null)
  const [galleryIdx, setGalleryIdx] = useState(0)

  // Before/After slider
  const sliderRef = useRef(null)
  const [sliderPos, setSliderPos] = useState(50)
  const dragging = useRef(false)

  function moveSlider(clientX) {
    if (!sliderRef.current) return
    const r = sliderRef.current.getBoundingClientRect()
    setSliderPos(Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100)))
  }

  useEffect(() => {
    setFaqOpen(null)
    setGalleryIdx(0)
    window.scrollTo(0, 0)
  }, [slug])

  if (!t) return <NotFound />

  const related = tratamientos.filter(tr => tr.slug !== slug).slice(0, 3)

  return (
    <>
      <Navbar />

      {/* 1 · HERO */}
      <section
        className={`trat-hero ${t.slug === 'rejuvenecimiento-corporal' ? 'hero-rejcorporal' : ''} ${t.slug === 'dermoestetica' ? 'hero-dermoestetica' : ''}`}
        style={{ backgroundImage: `url(${t.imagenHero})` }}
      >
        <div className="trat-hero-overlay" />
        <div className="trat-hero-inner">
          <Link to="/tratamientos" className="trat-breadcrumb">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Todos los tratamientos
          </Link>
          <div className="trat-hero-text">
            <span className="trat-eyebrow">Clínicas Icardo · Desde 1992</span>
            <h1>{t.nombre}</h1>
            <p>{t.descripcionCorta}</p>
            <div className="trat-hero-ctas">
              <a className="btn btn-light" href="tel:+34966308811">
                Pedir cita
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                className="btn trat-btn-ghost"
                href="https://wa.me/34680637247"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · STATS BAR */}
      <div className="trat-stats-bar">
        <div className="container">
          <div className="trat-stats-inner">
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

      {/* 3 · INTRO SPLIT */}
      <section className="trat-intro">
        <div className="container">
          <div className="trat-intro-grid">
            <div className="trat-intro-img-wrap">
              <img src={t.imagenes[0]} alt={t.nombre} className="trat-intro-img" loading="lazy" />
            </div>
            <div className="trat-intro-body">
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

      {/* BEFORE / AFTER SLIDER */}
      {t.antesImg && t.despuesImg && (
        <section className="trat-ba-section" data-reveal>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            <BeforeAfterSlider 
              antesImg={t.antesImg} 
              despuesImg={t.despuesImg} 
              title={t.slug === "remodelacion" ? "Caso 1: Contorno facial" : "Antes y después"}
              subtitle="Arrastra el control para comparar"
            />
            {t.antesImg2 && t.despuesImg2 && (
              <BeforeAfterSlider 
                antesImg={t.antesImg2} 
                despuesImg={t.despuesImg2} 
                title={t.slug === "remodelacion" ? "Caso 2: Reducción y remodelación corporal" : "Caso 2"}
                subtitle="Arrastra el control para comparar"
              />
            )}
          </div>
        </section>
      )}

      {/* 4 · BENEFITS */}
      <section className="trat-benefits">
        <div className="container">
          <div className="trat-sec-head">
            <span className="eyebrow">· Por qué elegirnos</span>
            <h2>Ventajas del tratamiento</h2>
          </div>
          <div className="trat-benefits-grid">
            {t.beneficios.map((b, i) => (
              <div key={i} className="trat-benefit-card">
                <div className="trat-benefit-num">0{i + 1}</div>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · PROCESS STEPS */}
      <section className="trat-steps">
        <div className="container">
          <div className="trat-sec-head">
            <span className="eyebrow">· El proceso</span>
            <h2>¿Cómo funciona?</h2>
          </div>
          <div className="trat-steps-grid">
            {t.pasos.map((p, i) => (
              <div key={i} className="trat-step">
                <div className="trat-step-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{p.titulo}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · FOR WHOM */}
      <section className="trat-forwho">
        <div className="container">
          <div className="trat-forwho-grid">
            <div className="trat-forwho-img-wrap">
              <img src={t.imagenes[1] ?? t.imagenes[0]} alt="Para quién" loading="lazy" />
            </div>
            <div className="trat-forwho-body">
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

      {/* 8 · FAQ */}
      <section className="trat-faq">
        <div className="container">
          <div className="trat-sec-head">
            <span className="eyebrow">· FAQ</span>
            <h2>Preguntas frecuentes</h2>
          </div>
          <div className="trat-faq-list">
            {t.faq.map((item, i) => (
              <div key={i} className={`trat-faq-item${faqOpen === i ? ' open' : ''}`}>
                <button className="trat-faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <span>{item.q}</span>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    className="trat-faq-chevron"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="trat-faq-a">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 · RELATED */}
      <section className="trat-related">
        <div className="container">
          <div className="trat-sec-head">
            <span className="eyebrow">· Descubre más</span>
            <h2>Otros tratamientos</h2>
          </div>
          <div className="trat-related-grid">
            {related.map(tr => (
              <Link key={tr.slug} to={`/tratamientos/${tr.slug}`} className="trat-related-card">
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

      {/* 10 · FINAL CTA */}
      <section className="trat-final-cta">
        <div className="container">
          <div className="trat-final-cta-inner">
            <span className="eyebrow" style={{ color: '#A89378' }}>· Reserva tu cita</span>
            <h2>¿Listo para empezar?</h2>
            <p>Nuestro equipo médico te asesorará sin compromiso. Primera consulta gratuita.</p>
            <div className="trat-final-cta-btns">
              <a className="btn btn-light" href="tel:+34966308811">
                Alicante · 966 308 811
              </a>
              <a className="btn btn-light" href="tel:+34965450470">
                Elche · 965 450 470
              </a>
              <a
                className="btn trat-btn-wa"
                href="https://wa.me/34680637247"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
