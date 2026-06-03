import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { Sparkles, Leaf, ShieldCheck, Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TIMELINE_MILESTONES = [
  {
    year: '1992',
    title: 'Fundación de la clínica',
    desc: 'El Dr. Antonio J. Icardo inicia el proyecto familiar en Alicante, estableciendo los valores indiscutibles de honestidad, rigurosidad científica y criterio médico en cada tratamiento.'
  },
  {
    year: '2005',
    title: 'Apertura en Elche',
    desc: 'Llevamos la experiencia y el saber hacer clínico a nuestra segunda ubicación en Elche, uniendo al mismo equipo médico para cuidar de más personas en el Levante con el máximo confort.'
  },
  {
    year: '2015',
    title: 'Vanguardia Tecnológica',
    desc: 'Incorporación de aparatología médica avanzada de última generación con efectividad clínicamente demostrada, reforzando la seguridad y los excelentes resultados naturales.'
  },
  {
    year: '2024',
    title: 'Consolidación regional',
    desc: 'Con más de 40 años de trayectoria impecable, adaptándonos constantemente e innovando para mantenernos como el referente indiscutible de naturalidad en medicina estética.'
  }
]

const VALUES = [
  {
    icon: Sparkles,
    title: 'Personalización',
    desc: 'Cada paciente es único. Diseñamos cada tratamiento adaptado a tu anatomía, objetivos y estilo de vida.',
  },
  {
    icon: Leaf,
    title: 'Naturalidad',
    desc: 'Resultados que no se notan, solo se sienten. El mejor tratamiento es el que parece que no te has hecho nada.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad',
    desc: 'Solo técnicas con efectividad demostrada. Material certificado y supervisión médica en cada sesión.',
  },
  {
    icon: Heart,
    title: 'Cercanía',
    desc: 'Atención real, sin listas de espera. Te conocemos por tu nombre y seguimos tu evolución de cerca.',
  },
]

export default function QuienesSomos() {
  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(25)

  const handleScroll = (direction) => {
    if (trackRef.current) {
      const offset = direction === 'left' ? -350 : 350
      trackRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  const handleTrackScroll = () => {
    if (trackRef.current) {
      const el = trackRef.current
      const maxScroll = el.scrollWidth - el.clientWidth
      if (maxScroll <= 0) {
        setScrollProgress(25)
        return
      }
      const percentage = (el.scrollLeft / maxScroll) * 75 + 25
      setScrollProgress(percentage)
    }
  }

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = Array.from(outer.querySelectorAll('.vs-card'))
    const dots  = Array.from(outer.querySelectorAll('.vs-dot'))

    if (reduced) {
      cards.forEach(c => { c.dataset.state = 'active' })
      dots.forEach(d => d.classList.add('on'))
      return
    }

    function update() {
      if (window.innerWidth < 768) {
        cards.forEach(c => { c.dataset.state = 'active' })
        dots.forEach(d => d.classList.add('on'))
        return
      }

      const rect = outer.getBoundingClientRect()
      const scrollable = outer.offsetHeight - window.innerHeight
      if (scrollable <= 0) {
        cards.forEach((c, i) => { c.dataset.state = i === 0 ? 'active' : 'future' })
        return
      }

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      const idx = Math.min(VALUES.length - 1, Math.floor(progress * VALUES.length))

      dots.forEach((dot, i) => dot.classList.toggle('on', i <= idx))

      cards.forEach((card, i) => {
        const rel = i - idx
        if (rel > 0)      card.dataset.state = 'future'
        else if (rel === 0) card.dataset.state = 'active'
        else              card.dataset.state = `past${Math.min(-rel, 3)}`
      })
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <>
      <Navbar />

      <section className="qs-split-hero">
        <div className="qs-split-left">
          <div className="qs-split-content" data-reveal>
            <h1 className="qs-split-title">
              Líder en el Levante, naturalidad y criterio médico.
            </h1>
            <p className="qs-split-desc">
              Clínicas Icardo es un grupo médico familiar especializado en el diseño y la aplicación de soluciones estéticas a medida, comprometido con la excelencia y la salud de las personas desde 1992.
            </p>
            <p className="qs-split-desc">
              Con más de 40 años de experiencia, ofrecemos una atención premium en el Levante que combina rigurosidad científica, técnicas innovadoras demostradas y resultados con la máxima naturalidad posible.
            </p>
            <div className="qs-split-btn-wrap">
              <Link to="/contacto" className="qs-split-btn">
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
        <div className="qs-split-right" data-reveal data-delay="2">
          <img
            src="https://images.unsplash.com/photo-1538108149393-f159e148c95a?w=1200&q=80"
            alt="Clínicas Icardo"
          />
        </div>
      </section>

      {/* ─── RÉPLICA HISTORIA & TIMELINE SECTION ─────────── */}
      <section className="qs-timeline-sec">
        <div className="qs-timeline-container">
          <div className="qs-timeline-head" data-reveal>
            <h2 className="qs-timeline-heading">
              Más de 40 años de <span className="it">pasión</span> al servicio de la medicina estética
            </h2>
          </div>

          <div
            className="qs-timeline-track"
            data-reveal
            data-delay="2"
            ref={trackRef}
            onScroll={handleTrackScroll}
          >
            {TIMELINE_MILESTONES.map((item, index) => (
              <div key={index} className="qs-timeline-card">
                <h3 className="qs-timeline-year">{item.year}</h3>
                <h4 className="qs-timeline-card-title">{item.title}</h4>
                <p className="qs-timeline-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="qs-timeline-controls">
            <div className="qs-timeline-line-bg">
              <div
                className="qs-timeline-line-progress"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <div className="qs-timeline-btns">
              <button
                className="qs-timeline-btn"
                onClick={() => handleScroll('left')}
                aria-label="Anterior"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                className="qs-timeline-btn"
                onClick={() => handleScroll('right')}
                aria-label="Siguiente"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALORES — Sticky scroll ──────────────────────── */}
      <section className="vs-outer" ref={outerRef}>
        <div className="vs-pin">
          <div className="container">
            <div className="vs-layout">

              <div className="vs-left" data-reveal>
                <span className="eyebrow">· Nuestros valores</span>
                <h2>Lo que nos <span className="it">define</span></h2>
                <p className="vs-sub">Cuatro principios que guían cada decisión médica y cada interacción con nuestros pacientes.</p>
                <div className="vs-dots">
                  {VALUES.map((v, i) => (
                    <div key={i} className={`vs-dot${i === 0 ? ' on' : ''}`} aria-label={v.title} />
                  ))}
                </div>
              </div>

              <div className="vs-right" data-reveal data-delay="2">
                <div className="vs-stack">
                  {VALUES.map((v, i) => {
                    const IconComponent = v.icon;
                    return (
                      <div key={i} className="vs-card" data-state={i === 0 ? 'active' : 'future'}>
                        <div className="vs-card-icon">
                          <IconComponent size={22} strokeWidth={1.8} />
                        </div>
                        <h4>{v.title}</h4>
                        <p>{v.desc}</p>
                        <span className="vs-card-num">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── EQUIPO ──────────────────────────────────────── */}
      <section id="equipo">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2>El <span className="it">equipo</span></h2>
            <p>Equipo Médico y Científico de Clínicas Icardo</p>
          </div>
          <div className="team-grid" style={{ marginBottom: '64px' }}>
            <article className="tcard" data-reveal data-delay="1">
              <div className="pic"><img src="/assets/antonio.webp" alt="Dr. Antonio J. Icardo" /></div>
              <h4>Dr. Antonio J. Icardo García</h4>
              <div className="role">Director Médico · desde 1992</div>
              <p>Más de 40 años de práctica clínica continuada. Especialista en medicina estética facial y corporal, varices y rejuvenecimiento.</p>
            </article>
            <article className="tcard" data-reveal data-delay="2">
              <div className="pic"><img src="/assets/sergio.webp" alt="Dr. Sergio Icardo" /></div>
              <h4>Dr. Sergio Icardo</h4>
              <div className="role">Nutrición and Dietética</div>
              <p>Planes nutricionales personalizados para el control de peso, bienestar digestivo y rendimiento deportivo real.</p>
            </article>
            <article className="tcard" data-reveal data-delay="3">
              <div className="pic"><img src="/assets/carmen.webp" alt="Dra. Carmen María López" /></div>
              <h4>Dra. Carmen María López</h4>
              <div className="role">Medicina Estética Elche</div>
              <p>Tratamientos faciales, hilos tensores y bioestimulación. Atención cercana y resultados naturales en cada paciente.</p>
            </article>
            <article className="tcard" data-reveal data-delay="4">
              <div className="pic"><img src="/assets/carmenbelmonte.webp" alt="Dra. Mª Carmen Belmonte" /></div>
              <h4>Dra. Mª Carmen Belmonte</h4>
              <div className="role">Medicina Estética Alicante</div>
              <p>Especialista en dermatología clínica y estética, hilos tensores y rejuvenecimiento facial avanzado.</p>
            </article>
            <article className="tcard" data-reveal data-delay="1">
              <div className="pic"><img src="/assets/carmengonzalez.webp" alt="Dra. M. Carmen González" /></div>
              <h4>Dra. M. Carmen González</h4>
              <div className="role">Medicina Estética Elche</div>
              <p>Experta en armonización facial no invasiva, rellenos dérmicos, ácido hialurónico y rejuvenecimiento labial natural.</p>
            </article>
            <article className="tcard" data-reveal data-delay="2">
              <div className="pic"><img src="/assets/carmennavarro.webp" alt="Dra. M. Carmen Navarro" /></div>
              <h4>Dra. M. Carmen Navarro</h4>
              <div className="role">Medicina Estética Elche</div>
              <p>Especialista en medicina estética corporal, flacidez, tratamiento vascular superficial y eliminación de varices.</p>
            </article>
            <article className="tcard" data-reveal data-delay="3">
              <div className="pic"><img src="/assets/patricia.webp" alt="Patricia Torreblanca" /></div>
              <h4>Patricia Torreblanca</h4>
              <div className="role">Medicina Estética Alicante</div>
              <p>Gestión y coordinación de la estancia del paciente en clínicas, asegurando una experiencia agradable de principio a fin.</p>
            </article>
            <article className="tcard" data-reveal data-delay="4">
              <div className="pic"><img src="/assets/noelia.webp" alt="Noelia Alonso" /></div>
              <h4>Noelia Alonso</h4>
              <div className="role">Medicina Estética Elche</div>
              <p>Asistencia médica en cabina, experta en aparatología médico-estética avanzada y tratamientos láser de alta precisión.</p>
            </article>
          </div>

          <div style={{ textAlign: 'center', paddingBottom: '32px' }} data-reveal>
            <Link to="/tratamientos" className="btn btn-primary">
              Conoce nuestros tratamientos
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── NOUVEAU CLOSING BANNER ──────────────────────── */}
      <section className="qs-closing-section">
        <div className="qs-closing-card" data-reveal>
          <div className="qs-closing-content">
            <h3 className="qs-closing-title">
              Cada necesidad merece una respuesta única. <span className="it">Construyámosla juntos.</span>
            </h3>
            <p className="qs-closing-sub">
              Ponte en contacto con nuestro equipo médico de primer nivel en Alicante o Elche para diseñar hoy mismo tu plan de tratamiento personalizado.
            </p>
            <div className="qs-closing-btn-wrap">
              <Link to="/contacto" className="qs-closing-btn">
                Pedir cita informativa gratuita
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
