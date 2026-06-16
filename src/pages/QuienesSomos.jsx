import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { Sparkles, Leaf, ShieldCheck, Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TIMELINE_MILESTONES = [
  {
    year: '1992',
    title: 'El Origen de un Legado',
    desc: 'El Dr. Antonio J. Icardo funda la clínica con una premisa innegociable: la medicina estética debe ser, ante todo, medicina de calidad. Se establecen los pilares de honestidad y rigor científico que hoy definen nuestra identidad.'
  },
  {
    year: '2005',
    title: 'Expansión con Alma',
    desc: 'La apertura en Elche consolida nuestra presencia en el Levante. Bajo una misma dirección médica, replicamos un modelo de atención íntima y sofisticada, diseñada para pacientes que buscan resultados superiores en un entorno de máxima discreción.'
  },
  {
    year: '2015',
    title: 'Excelencia Tecnológica',
    desc: 'Actualizamos nuestra infraestructura con la aparatología más prestigiosa del mercado. Cada nueva técnica incorporada es sometida a un riguroso análisis de efectividad, garantizando que el lujo y la seguridad caminen siempre de la mano.'
  },
  {
    year: '2024',
    title: 'El Referente de Naturalidad',
    desc: 'Tras más de cuatro décadas, Clínicas Icardo se erige como el baluarte de la armonía facial y corporal en la región. Seguimos innovando, no para seguir modas, sino para perfeccionar el arte de envejecer con elegancia y distinción.'
  }
]

const VALUES = [
  {
    icon: Sparkles,
    title: 'Personalización Absoluta',
    desc: 'Entendemos la medicina estética como un arte hecho a medida. No existen protocolos estándar en Clínicas Icardo, solo diagnósticos profundos que consideran su estructura ósea, la calidad de su piel y sus aspiraciones personales para crear una hoja de ruta clínica única.',
  },
  {
    icon: Leaf,
    title: 'La Elegancia de la Naturalidad',
    desc: 'Nuestra obsesión por el detalle nos permite lograr resultados imperceptibles para el ojo inexperto pero transformadores para su seguridad personal. El verdadero éxito clínico es aquel que restaura la frescura sin sacrificar la expresión ni la identidad.',
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad y Rigor Científico',
    desc: 'Como médicos, la prioridad absoluta es su integridad. Implementamos exclusivamente tecnologías con marcado CE médico y productos de laboratorios líderes a nivel mundial, respaldados por estudios clínicos que garantizan eficacia y, sobre todo, tranquilidad a largo plazo.',
  },
  {
    icon: Heart,
    title: 'Cercanía y Acompañamiento',
    desc: 'Entendemos el valor de la confianza y la calma. Nuestro equipo médico le acompaña personalmente en cada fase del proceso, asegurando una experiencia íntima, profesional y libre de presiones, donde cada duda es resuelta con transparencia absoluta.',
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
    function updateStackHeight() {
      if (window.innerWidth >= 768) return
      const stack = outerRef.current?.querySelector('.vs-stack')
      if (!stack) return
      const cards = Array.from(stack.querySelectorAll('.vs-card'))
      const maxH = Math.max(...cards.map(c => c.offsetHeight))
      if (maxH > 0) stack.style.height = maxH + 'px'
    }
    updateStackHeight()
    window.addEventListener('resize', updateStackHeight)
    document.fonts.ready.then(updateStackHeight)
    return () => window.removeEventListener('resize', updateStackHeight)
  }, [])

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
              Clínicas Icardo no es solo un centro de estética; es el legado de una familia dedicada a la excelencia médica. Desde 1992, bajo la dirección del Dr. Antonio Icardo, hemos cultivado un espacio donde la salud y la belleza convergen en perfecta armonía. Nuestro compromiso trasciende los resultados visibles: buscamos el bienestar integral de cada persona que confía en nosotros.
            </p>
            <p className="qs-split-desc">
              Con más de 40 años de experiencia acumulada, ofrecemos una atención premium en Alicante y Elche que combina la rigurosidad científica más estricta con las técnicas de vanguardia más sofisticadas del panorama internacional. Creemos en una medicina que respeta el paso del tiempo, realzando la mejor versión de nuestros pacientes sin alterar su esencia.
            </p>
            <p className="qs-split-desc">
              Nuestra filosofía se basa en el "Criterio Icardo": una visión donde la naturalidad es el único objetivo aceptable. El lujo en Clínicas Icardo se manifiesta en la calma de nuestras instalaciones, en la seguridad de nuestros procesos y en la honestidad de nuestros diagnósticos. Aquí, usted no es un paciente más, es parte de nuestra historia.
            </p>
          </div>
        </div>
        <div className="qs-split-right" data-reveal data-delay="2">
          <div className="image-wrapper">
            <img
              src="/assets/quienesomos.webp"
              alt="Clínicas Icardo"
            />
          </div>
        </div>
      </section>

      {/* ─── RÉPLICA HISTORIA & TIMELINE SECTION ─────────── */}
      <section className="qs-timeline-sec">
        <div className="qs-timeline-container">
          <div className="qs-timeline-head" data-reveal>
            <h2 className="qs-timeline-heading" style={{ color: '#1C1A18' }}>
              Más de 40 años de <span className="it" style={{ color: '#1C1A18' }}>pasión</span> al servicio de la medicina estética
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
              <div className="role">Director Médico · Medicina Estética</div>
              <p>Más de 40 años de práctica clínica continuada. Director médico y especialista en medicina estética facial y corporal.</p>
            </article>
            <article className="tcard" data-reveal data-delay="2">
              <div className="pic"><img src="/assets/sergio.webp" alt="Dr. Sergio Icardo" /></div>
              <h4>Dr. Sergio Icardo</h4>
              <div className="role">Especialista en Nutrición y Dietética</div>
              <p>Planes nutricionales personalizados para el control de peso, bienestar digestivo y rendimiento deportivo real.</p>
            </article>
            <article className="tcard" data-reveal data-delay="3">
              <div className="pic"><img src="/assets/neusalmarcha.webp" alt="Dra. Neus Almarcha" /></div>
              <h4>Dra. Neus Almarcha</h4>
              <div className="role">Medicina Estética</div>
              <p>Especializada en medicina estética y tratamientos de última generación. Armonización sutil y regeneración celular para resultados elegantes y naturales.</p>
            </article>
            <article className="tcard" data-reveal data-delay="4">
              <div className="pic"><img src="/assets/carmenbelmonte.webp" alt="Mª Carmen Belmonte" /></div>
              <h4>Mª Carmen Belmonte</h4>
              <div className="role">Personal Auxiliar</div>
              <p>Soporte asistencial especializado, garantizando una atención al paciente cálida y una experiencia de cabina de primer nivel.</p>
            </article>
            <article className="tcard" data-reveal data-delay="1">
              <div className="pic"><img src="/assets/carmengonzalez.webp" alt="M. Carmen González" /></div>
              <h4>M. Carmen González</h4>
              <div className="role">Personal Auxiliar</div>
              <p>Atención y acompañamiento al paciente con profesionalidad y cercanía en todas las etapas del tratamiento.</p>
            </article>
            <article className="tcard" data-reveal data-delay="2">
              <div className="pic"><img src="/assets/leandrafenollar.webp" alt="Leandra Fenollar" /></div>
              <h4>Leandra Fenollar</h4>
              <div className="role">Personal Auxiliar</div>
              <p>Soporte asistencial e instrumentación médica avanzada en cabina, garantizando una excelente experiencia y la máxima tranquilidad.</p>
            </article>
            <article className="tcard" data-reveal data-delay="3">
              <div className="pic"><img src="/assets/carolina.webp" alt="Carolina Ferrando Navarro" /></div>
              <h4>Carolina Ferrando Navarro</h4>
              <div className="role">Personal Auxiliar</div>
              <p>Atención cercana y soporte asistencial en cabina, cuidando cada detalle para garantizar el bienestar del paciente.</p>
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
