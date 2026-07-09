import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { tratamientos } from '../../data/tratamientos'
import { tratamientosCiudad, CLINICAS } from '../../data/tratamientosCiudad'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import NotFound from '../NotFound'
import {
  TratStatsBar, TratCityLinks, TratForWho, TratFAQ, TratRelated, TratFinalCTA
} from './shared/TratSections'

export default function TratamientoCiudadPage() {
  const { slug, ciudad } = useParams()
  const t = tratamientos.find(tr => tr.slug === slug)
  const content = tratamientosCiudad[`${slug}-${ciudad}`]
  const clinica = CLINICAS[ciudad]

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!content) return
    const prevTitle = document.title
    document.title = content.seoTitle
    let metaTag = document.querySelector('meta[name="description"]')
    const prevDescription = metaTag?.getAttribute('content')
    if (metaTag) metaTag.setAttribute('content', content.metaDescription)
    return () => {
      document.title = prevTitle
      if (metaTag && prevDescription != null) metaTag.setAttribute('content', prevDescription)
    }
  }, [content])

  if (!t || !content || !clinica) return <NotFound />

  return (
    <>
      <Navbar />

      <section className="trat-hero" style={{ backgroundImage: `url(${t.imagenHero})` }}>
        <div className="trat-hero-overlay" />
        <div className="trat-hero-inner">
          <Link to={`/tratamientos/${t.slug}`} className="trat-breadcrumb">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            {t.nombre}
          </Link>
          <div className="trat-hero-text">
            <span className="trat-eyebrow">Clínicas Icardo · {clinica.nombre} · Desde 1992</span>
            <h1>{content.h1}</h1>
            <div className="trat-hero-ctas">
              <a className="btn btn-light" href={`tel:${clinica.telefono}`}>
                Pedir cita
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
              <a className="btn trat-btn-ghost" href="https://wa.me/34680637247" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <TratStatsBar t={t} />
      <TratCityLinks slug={t.slug} current={ciudad} />

      <section className="trat-city-section" id="en-que-consiste">
        <div className="container">
          <div className="trat-city-section-inner" data-reveal>
            <span className="eyebrow">· En qué consiste</span>
            <h2>{t.nombre} en {clinica.nombre}</h2>
            <p>{content.intro}</p>
          </div>
        </div>
      </section>

      <section className="trat-city-section alt">
        <div className="container">
          <div className="trat-city-section-inner" data-reveal>
            <span className="eyebrow">· Por qué elegirnos</span>
            <h2>Nuestra clínica de {clinica.nombre}</h2>
            <p>{content.porQueElegirnos}</p>
          </div>
        </div>
      </section>

      <section className="trat-city-section">
        <div className="container">
          <div className="trat-city-section-inner" data-reveal>
            <span className="eyebrow">· El tratamiento</span>
            <h2>Cómo funciona</h2>
            <p>{content.servicioDetallado}</p>
          </div>
        </div>
      </section>

      <div className="trat-city-cta">
        <div className="container">
          <p>{content.ctaText}</p>
          <a className="btn btn-light" href={`tel:${clinica.telefono}`}>
            {clinica.nombre} · {clinica.telefonoDisplay}
          </a>
        </div>
      </div>

      <TratForWho t={t} />
      <TratFAQ t={{ ...t, faq: content.faq }} />
      <TratRelated slug={t.slug} />
      <TratFinalCTA />
      <Footer />
    </>
  )
}
