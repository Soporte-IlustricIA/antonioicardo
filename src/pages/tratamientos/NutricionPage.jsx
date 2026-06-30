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
            <span className="trat-eyebrow nutri-eyebrow">Clínicas Dr. Icardo · Dietética</span>
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

      <div id="en-que-consiste" />
      <TratForWho t={t} />

      <TratBenefits t={t} />
      <TratSteps t={t} />
 
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
      <TratFAQ t={t} />
      <TratRelated slug={t.slug} />
      <TratFinalCTA />
      <Footer />
    </>
  )
}
