import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import QuizCTA from '../components/QuizCTA'
import { tratamientos } from '../data/tratamientos'
import aestheticSplitLeft from '../assets/images/aesthetic_skincare_split_left_1780479063011.png'
import skincareCreamSmear from '../assets/images/skincare_cream_smear_1780479081100.png'

const TEAM = [
  { img: '/assets/antonio.webp', alt: 'Dr. Antonio J. Icardo', name: 'Dr. Antonio J. Icardo García', shortName: 'Dr. Antonio Icardo', role: 'Director Médico · desde 1992', desc: 'Más de 40 años de práctica clínica continuada. Especialista en medicina estética facial y corporal, varices y rejuvenecimiento.' },
  { img: '/assets/sergio.webp',  alt: 'Dr. Sergio Icardo', name: 'Dr. Sergio Icardo', shortName: 'Dr. Sergio Icardo', role: 'Dietética', desc: 'Planes nutricionales personalizados para el control de peso, bienestar digestivo y rendimiento deportivo real.' },
  { img: '/assets/carmenbelmonte.webp', alt: 'Dra. Mª Carmen Belmonte', name: 'Dra. Mª Carmen Belmonte', shortName: 'Dra. Mª Carmen Belmonte', role: 'Medicina Estética Alicante', desc: 'Especialista en dermatología clínica y estética, hilos tensores y rejuvenecimiento facial avanzado.' },
  { img: '/assets/carmengonzalez.webp', alt: 'Dra. M. Carmen González', name: 'Dra. M. Carmen González', shortName: 'Dra. M. Carmen González', role: 'Medicina Estética Elche', desc: 'Experta en armonización facial no invasiva, rellenos dérmicos, ácido hialurónico y rejuvenecimiento labial natural.' },
  { img: '/assets/neusalmarcha.webp', alt: 'Dra. Neus Almarcha', name: 'Dra. Neus Almarcha', shortName: 'Dra. Neus Almarcha', role: 'Médico Estético', desc: 'Especializada en medicina estética y tratamientos de última generación. Armonización sutil y regeneración celular para resultados elegantes y naturales.' },
  { img: '/assets/leandrafenollar.webp', alt: 'Leandra Fenollar', name: 'Leandra Fenollar', shortName: 'Leandra Fenollar', role: 'Personal Auxiliar', desc: 'Soporte asistencial e instrumentación médica avanzado en cabina, garantizando una excelente experiencia y la máxima tranquilidad.' },
]

export default function Inicio() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [activeSlide, setActiveSlide] = useState(0)
  const carouselRef = useRef(null)
  const trustRef = useRef(null)
  const heroRef = useRef(null)
  const twRef = useRef(null)
  const teamSectionRef = useRef(null)
  const [teamIdx, setTeamIdx] = useState(0)
  const [isTeamSectionInView, setIsTeamSectionInView] = useState(false)

  // Track if team section is in view
  useEffect(() => {
    const el = teamSectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      setIsTeamSectionInView(entry.isIntersecting)
    }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Auto-play team carousel every 4 seconds, ONLY when in view
  useEffect(() => {
    if (!isTeamSectionInView) return
    const timer = setInterval(() => {
      setTeamIdx((prev) => (prev + 1) % TEAM.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isTeamSectionInView])


  /* ── Hero stat counters ── */
  useEffect(() => {
    const section = heroRef.current
    if (!section) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const el30  = section.querySelector('.hc-30')
    const el2   = section.querySelector('.hc-2')
    const el15k = section.querySelector('.hc-15k')

    function fmt15k(n) {
      const r = Math.round(n)
      return r >= 1000 ? Math.floor(r / 1000) + '.' + String(r % 1000).padStart(3, '0') : String(r)
    }

    if (reduced) {
      if (el30)  el30.textContent  = '40'
      if (el2)   el2.textContent   = '2'
      if (el15k) el15k.textContent = '15.000'
      return
    }

    let c30 = () => {}, c2 = () => {}, c15k = () => {}

    function counter(el, target, duration, fmt) {
      let raf
      const start = performance.now()
      function step(now) {
        const t = Math.min((now - start) / duration, 1)
        const ease = 1 - (1 - t) ** 3
        el.textContent = fmt ? fmt(ease * target) : Math.round(ease * target)
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
      return () => cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        c30(); c2(); c15k()
        if (el30)  { el30.textContent  = '0';      c30  = counter(el30,  40,    2200) }
        if (el2)   { el2.textContent   = '0';      c2   = counter(el2,   2,     1400) }
        if (el15k) { el15k.textContent = '0';      c15k = counter(el15k, 15000, 2500, fmt15k) }
      } else {
        c30(); c30 = () => {}
        c2();  c2  = () => {}
        c15k(); c15k = () => {}
        if (el30)  el30.textContent  = '0'
        if (el2)   el2.textContent   = '0'
        if (el15k) el15k.textContent = '0'
      }
    }, { threshold: 0.5 })

    io.observe(section)
    return () => { io.disconnect(); c30(); c2(); c15k() }
  }, [])

  /* ── Typewriter equipo ── */
  useEffect(() => {
    const el = twRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!isTeamSectionInView) return

    const words = ['imagen', 'bienestar', 'salud', 'confort', 'belleza']
    let wordIdx = 0
    let charIdx = words[0].length
    let phase = 'pausing'
    let timeout

    function tick() {
      const word = words[wordIdx]
      if (phase === 'typing') {
        charIdx++
        el.textContent = word.slice(0, charIdx)
        if (charIdx === word.length) {
          phase = 'pausing'
          timeout = setTimeout(tick, 1200)
        } else {
          timeout = setTimeout(tick, 150)
        }
      } else if (phase === 'pausing') {
        phase = 'erasing'
        timeout = setTimeout(tick, 80)
      } else {
        charIdx--
        el.textContent = word.slice(0, charIdx)
        if (charIdx === 0) {
          wordIdx = (wordIdx + 1) % words.length
          phase = 'typing'
          timeout = setTimeout(tick, 200)
        } else {
          timeout = setTimeout(tick, 80)
        }
      }
    }

    el.textContent = words[0]
    timeout = setTimeout(tick, 1800)
    return () => clearTimeout(timeout)
  }, [isTeamSectionInView])





  function goToSlide(i) {
    const clamped = Math.max(0, Math.min(i, tratamientos.length - 1))
    setActiveSlide(clamped)
    const track = carouselRef.current
    if (!track) return
    const slide = track.children[clamped]
    const first = track.children[0]
    if (!slide || !first) return
    track.scrollTo({ left: slide.offsetLeft - first.offsetLeft, behavior: 'smooth' })
  }

  function togglePlay() {
    if (!videoRef.current) return
    playing ? videoRef.current.pause() : videoRef.current.play()
    setPlaying(p => !p)
  }

  return (
    <>
      <Navbar />

      {/* ─── 1. HERO ─────────────────────────────────────── */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-inner" data-reveal>
          <div className="hero-grid">
            <div>
              <span className="hero-pill">Desde 1992 · Alicante &amp; Elche</span>
              <h1>Tu salud estética,<em>en las mejores manos.</em></h1>
              <p className="hero-sub">Más de 40 años acompañando a quienes buscan cuidarse con criterio médico. Medicina estética integral y dietética bajo dirección del Dr. Antonio Icardo.</p>
              <div className="hero-cta">
                <a className="btn btn-light" href="#cita">Pedir cita
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </a>
                <a className="btn" style={{ color: '#fff', border: '1px solid rgba(255,255,255,.4)' }} href="#tratamientos">Ver tratamientos</a>
              </div>
            </div>
            <div className="hero-stats-wrap">
              <div className="hero-stats">
                <div className="s"><b><span className="stat-plus">+</span><span className="hc-30">0</span></b><span>años de experiencia clínica</span></div>
                <div className="s"><b><span className="hc-2">0</span></b><span>clínicas Alicante y Elche</span></div>
                <div className="s"><b><span className="stat-plus">+</span><span className="hc-15k">0</span></b><span>pacientes atendidos</span></div>
              </div>
              <button className="hero-play-btn" onClick={togglePlay} aria-label={playing ? 'Pausar vídeo' : 'Reproducir vídeo'}>
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ─── 3. CATEGORIES MARQUEE ───────────────────────── */}
        <div className="cats" aria-hidden="true">
          <div className="cats-inner">
            {[0, 1].map(copy => (
              <div key={copy} className="cats-track">
                <span>Arrugas</span><span className="dot">●</span>
                <span>Varices</span><span className="dot">●</span>
                <span>Depilación Láser</span><span className="dot">●</span>
                <span>Rejuvenecimiento facial</span><span className="dot">●</span>
                <span>Celulitis</span><span className="dot">●</span>
                <span>Adelgazamiento</span><span className="dot">●</span>
                <span>Dietética</span><span className="dot">●</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. VENTAJAS DE LA MEDICINA ESTÉTICA (REDISEÑADA SEGÚN IMAGEN) ─── */}
      <section className="med-benefits-sec" id="clinicas" ref={trustRef}>
        <div className="container">
          
          <div className="med-benefits-header-centered" data-reveal>
            <h2 className="med-benefits-title-centered">
              La firma Icardo: <span className="med-benefits-accent">medicina estética de autor</span>
            </h2>
          </div>

          <div className="med-benefits-row">
            
            {/* Item 1: Tratamientos no invasivos (Labios) */}
            <div className="med-benefit-card" data-reveal data-delay="1">
              <div className="med-benefit-illustration">
                <svg viewBox="0 0 100 60" className="sketch-svg" aria-hidden="true">
                  {/* Splash de acuarela */}
                  <path d="M22,35 C30,18 70,18 78,35 C70,48 30,48 22,35 Z" fill="#EEA090" opacity="0.45" />
                  {/* Líneas bocetadas */}
                  <path d="M15,35 C25,25 40,24 50,30 C60,24 75,25 85,35" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M15,35 C25,48 75,48 85,35" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M15,35 C35,34 65,34 85,35" stroke="#1A1513" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <div className="med-benefit-info">
                <h4>Tratamientos respetuosos</h4>
                <p>Priorizamos técnicas avanzadas de máxima delicadeza y materiales biocompatibles certificados que cuidan tu fisionomía sin agresividad.</p>
              </div>
            </div>

            {/* Item 2: Recuperación inmediata (Ojo con pestañas) */}
            <div className="med-benefit-card" data-reveal data-delay="2">
              <div className="med-benefit-illustration">
                <svg viewBox="0 0 100 60" className="sketch-svg" aria-hidden="true">
                  {/* Splash de acuarela */}
                  <ellipse cx="50" cy="22" rx="30" ry="14" fill="#E8B89D" opacity="0.5" />
                  {/* Párpado y pestañas */}
                  <path d="M18,22 C32,38 68,38 82,22" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M28,29 L23,39" stroke="#1A1513" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M39,32 L36,44" stroke="#1A1513" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M50,33 L50,47" stroke="#1A1513" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M61,32 L64,44" stroke="#1A1513" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M72,29 L77,39" stroke="#1A1513" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="med-benefit-info">
                <h4>Armonía con tu día a día</h4>
                <p>Minimizamos todo rastro visual de los procedimientos para garantizarte un retorno discreto e inmediato a tus actividades cotidianas.</p>
              </div>
            </div>

            {/* Item 3: Tratamientos personalizados (Corona) */}
            <div className="med-benefit-card" data-reveal data-delay="3">
              <div className="med-benefit-illustration">
                <svg viewBox="0 0 100 60" className="sketch-svg" aria-hidden="true">
                  {/* Splash de acuarela */}
                  <path d="M22,35 L78,35 L70,14 L50,26 L30,14 Z" fill="#E8B89D" opacity="0.45" />
                  {/* Corona rígida bocetada */}
                  <path d="M15,41 C35,43 65,43 85,41" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M20,41 L14,16 L34,29 L50,11 L66,29 L86,16 L80,41 Z" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="14" cy="16" r="2.5" fill="#1A1513" />
                  <circle cx="50" cy="11" r="2.5" fill="#1A1513" />
                  <circle cx="86" cy="16" r="2.5" fill="#1A1513" />
                </svg>
              </div>
              <div className="med-benefit-info">
                <h4>Escucha clínica y honestidad</h4>
                <p>Estudiamos tus facciones con cercanía y sosiego. Si creemos que un tratamiento no es idóneo para ti, te asesoraremos con absoluta franqueza.</p>
              </div>
            </div>

            {/* Item 4: Mejora de la confianza (Corazón) */}
            <div className="med-benefit-card" data-reveal data-delay="4">
              <div className="med-benefit-illustration">
                <svg viewBox="0 0 100 60" className="sketch-svg" aria-hidden="true">
                  {/* Splash de acuarela */}
                  <path d="M50,15 C45,5 20,5 20,25 C20,42 50,55 50,55 C50,55 80,42 80,25 C80,5 55,5 50,15 Z" fill="#EEA090" opacity="0.45" />
                  {/* Corazón esbozado en pincel */}
                  <path d="M50,18 C45,8 22,8 22,26 C22,41 50,53 50,53 C50,53 78,41 78,26 C78,8 55,8 50,18" stroke="#1A1513" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className="med-benefit-info">
                <h4>Una confianza plena y natural</h4>
                <p>Verse en plenitud frente al espejo refuerza la paz interior. Nos ilusiona acompañarte con empatía hacia una autoestima radiante y segura.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. TREATMENTS CAROUSEL ──────────────────────── */}
      <section id="tratamientos" className="treat-car-section">
        <div className="container">
          <div className="treat-car-header">
            <div className="section-header-text" data-reveal>
              <span className="eyebrow">Nuestros tratamientos</span>
              <h2>Tratamientos elegidos por <span className="it">médicos</span></h2>
            </div>
            <Link className="btn btn-primary" to="/tratamientos" data-reveal data-delay="1">
              Ver todos
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="treat-car-outer" data-reveal data-delay="2">
          <div className="treat-car-track" ref={carouselRef}>
            {tratamientos.map((t, i) => (
              <div
                key={t.slug}
                className="treat-car-slide"
                onClick={() => i !== activeSlide && goToSlide(i)}
                style={{ cursor: i !== activeSlide ? 'pointer' : 'default' }}
              >
                <img src={t.imagenHero} alt={t.nombre} loading="lazy" />
                <div className="treat-car-overlay">
                  <div className="treat-car-top">
                    <span className="treat-car-tag">{t.duracion}</span>
                    <h3 className="treat-car-title">{t.nombre}</h3>
                    <p className="treat-car-subtitle">{t.descripcionCorta}</p>
                  </div>
                  <div className="treat-car-bottom">
                    <div className="treat-car-chips">
                      {t.tecnicas.slice(0, 3).map(tech => (
                        <span key={tech} className="treat-car-chip">{tech}</span>
                      ))}
                    </div>
                    <Link
                      className="treat-car-link"
                      to={`/tratamientos/${t.slug}`}
                      onClick={e => e.stopPropagation()}
                    >
                      Conocer tratamiento
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="treat-car-nav">
          <button
            className="treat-car-arrow"
            onClick={() => goToSlide(activeSlide - 1)}
            disabled={activeSlide === 0}
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M11 5l-7 7 7 7" />
            </svg>
          </button>
          <div className="treat-car-dots">
            {tratamientos.map((_, i) => (
              <button
                key={i}
                className={`treat-car-dot${i === activeSlide ? ' on' : ''}`}
                onClick={() => goToSlide(i)}
                aria-label={`Tratamiento ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="treat-car-arrow"
            onClick={() => goToSlide(activeSlide + 1)}
            disabled={activeSlide === tratamientos.length - 1}
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* ─── NEW: EDITORIAL DUAL SPLIT REPLICATION (100% REPLICA OF ATTACHED IMAGE) ─── */}
      <section className="editorial-split-section">
        <div className="editorial-split-grid">
          
          {/* Left Block: Image with beautiful luxury lines & dots annotations */}
          <div className="eds-left-col" data-reveal>
            <div className="eds-img-wrapper">
              <img 
                src={aestheticSplitLeft} 
                alt="Detalle de medicina estética y regeneración celular" 
                className="eds-split-bg"
                loading="lazy"
              />
              <div className="eds-overlay-dark" />
              
              {/* Pointer Annotation 1: Top Injectables */}
              <div className="eds-annotation eds-anno-top">
                <div className="eds-anno-text">
                  Inyectables de<br/>Alta Calidad
                </div>
                <div className="eds-anno-line-wrapper">
                  <svg className="eds-anno-svg" viewBox="0 0 100 50" fill="none" preserveAspectRatio="none">
                    <path d="M0,5 L80,5 L80,45" stroke="rgba(255,255,255,0.72)" strokeWidth="1.2" strokeDasharray="2,2" />
                    <circle cx="80" cy="45" r="3" fill="#ffffff" />
                  </svg>
                </div>
              </div>

              {/* Pointer Annotation 2: Bottom Skincare */}
              <div className="eds-annotation eds-anno-bottom">
                <div className="eds-anno-line-wrapper">
                  <svg className="eds-anno-svg-bottom" viewBox="0 0 100 50" fill="none" preserveAspectRatio="none">
                    <path d="M50,45 L50,10 L90,10" stroke="rgba(255,255,255,0.72)" strokeWidth="1.2" strokeDasharray="2,2" />
                    <circle cx="90" cy="10" r="3" fill="#ffffff" />
                  </svg>
                </div>
                <div className="eds-anno-text-right">
                  Y Cuidado Facial<br/>Regenerativo.
                </div>
              </div>

            </div>
          </div>

          {/* Right Block: Vertical Split with Aesthetic Treatments & Skincare Treatments */}
          <div className="eds-right-col">
            
            {/* Top Card: Aesthetic Treatments on White Background */}
            <div className="eds-right-top-card" data-reveal data-delay="1">
              <div className="eds-right-content">
                <span className="eds-eyebrow">TRATAMIENTOS INYECTABLES</span>
                <p className="eds-description">
                  Consiga resultados armónicos y naturales con nuestra exclusiva gama de microinyectables adaptados a su fisionomía.
                </p>
                <Link to="/tratamientos" className="eds-explore-btn">
                  EXPLORAR TRATAMIENTOS
                </Link>
              </div>
            </div>

            {/* Bottom Card: Skincare Treatments on Textured Smear Background */}
            <div className="eds-right-bottom-card" data-reveal data-delay="2">
              <img 
                src={skincareCreamSmear} 
                alt="Textura de crema regeneradora" 
                className="eds-bottom-bg" 
                loading="lazy"
              />
              <div className="eds-bottom-overlay" />
              <div className="eds-right-content">
                <span className="eds-eyebrow text-light">REJUVENECIMIENTO CUTÁNEO</span>
                <p className="eds-description text-light">
                  Devuelva la firmeza, hidratación y luminosidad natural a su rostro mediante protocolos médicos avanzados.
                </p>
                <Link to="/tratamientos" className="eds-explore-btn">
                  EXPLORAR TRATAMIENTOS
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>



      {/* ─── 8. TEAM LIGHT GALLERY ──────────────────────── */}
      <section className="team-light-section" ref={teamSectionRef}>
        <div className="team-light-head" data-reveal>
          <span className="eyebrow">· Equipo Médico</span>
          <h2>El equipo que cuida<br />de tu <em className="tw-word" ref={twRef}>imagen</em></h2>
          <p>Un equipo de profesionales con una misma forma de trabajar: cercanía, criterio y resultados que duran.</p>
        </div>
        <div className="gallery" data-reveal data-delay="1">
          <AnimatePresence mode="popLayout">
            {[-1, 0, 1].map((offset) => {
              const idx = (teamIdx + offset + TEAM.length) % TEAM.length
              const member = TEAM[idx]
              const cardClass = offset === 0 ? 'center' : 'near'
              
              return (
                <motion.div
                  key={member.name}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 1, 
                    ease: "easeInOut"
                  }}
                  className={`g-card ${cardClass}`}
                  style={{ transition: 'none' }} // Avoid CSS-Framer conflict
                >
                  {offset === 0 && member.role.includes('Director') && (
                    <span className="label">Director Médico</span>
                  )}
                  <img src={member.img} alt={member.name} />
                  <div className="footer">
                    <b>{member.shortName || member.name}</b>
                    <span>{member.role}</span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── 7. TESTIMONIOS (INSPIRADO 100% EN IMAGEN COLEGIAL Y REALES) ─── */}
      <section className="testi-vibe-sec" id="testimonios">
        <div className="container">
          <div className="testi-vibe-head" data-reveal>
            <h2 className="testi-vibe-title">
              Promoviendo tu salud{' '}
              <span className="testi-pill">
                <img src="/assets/salud.webp" alt="Doctora Icardo" />
              </span>{' '}
              y bienestar a través de{' '}
              <span className="testi-pill">
                <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=120&q=80" alt="Cuidado Profesional" />
              </span>{' '}
              técnicas avanzadas y procedimientos{' '}
              <span className="testi-pill">
                <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=120&q=80" alt="Tratamiento Facial" />
              </span>{' '}
              personalizados
            </h2>
          </div>
        </div>

        {/* Marquee de testimonios */}
        <div className="testi-vibe-container" data-reveal data-delay="1">
          
          {/* Fila 1 - Fluyendo a la Izquierda */}
          <div className="testi-vibe-track-left">
            {[
              {
                text: "“Llevo yendo varios años a la clínica del Dr. Icardo y reconozco la infinita profesionalidad y experiencia en los tratamientos estéticos. Cada vez que acudo a la consulta salgo contentísimo del resultado obtenido.”",
                name: "Levasam Sanidad Ambiental"
              },
              {
                text: "“Muy buen trato al paciente por parte del doctor Antonio Icardo y todo su equipo. El doctor te aconseja el tratamiento adecuado. Estoy muy contenta, lo recomiendo, buenos resultados.”",
                name: "Oli Col"
              },
              {
                text: "“Te recomienda tratamiento personalizado y adecuado, con excelentes resultados. Es mi clínica de confianza.”",
                name: "Imane Aich"
              },
              {
                text: "“Excelentes profesionales, todos. Llevo yendo más de un año con ellos y siempre salgo encantada.”",
                name: "Dayana Arambulo"
              },
              {
                text: "“Atención médica especializada de mucho nivel. Personal asistencial muy amable y profesional, tanto en la consulta como vía telefónica. El Dr. Icardo muestra su excelencia profesional en cada caso que atiende.”",
                name: "Jose Humberto Leotaud Garcia"
              },
              {
                text: "“Espectacular el doctor, una atención personalizada que te hace sentir muy a gusto y el tratamiento que me hice ¡fenomenal!”",
                name: "Marcela Alejandra Villalba"
              },
              {
                text: "“Médico estético increíblemente bueno. Me estoy quitando las arañas vasculares con él y estoy encantada. Muchísima clientela. Atención de 10.”",
                name: "Queenofthecleanfood Recetas"
              },
              {
                text: "“Lo recomiendo. Rápido en las citas y muy profesional. Asequible. Fui por un problema de rubí que trató con láser y de paso me quitó algunas manchas en el escote y cuello. El resultado espectacular.”",
                name: "Emete Cede"
              },
              {
                text: "“Muy profesionales y buen trato. Además precios bastante razonables.”",
                name: "Maria Centenero Rico"
              },
              {
                text: "“Extraordinario equipo que atiende con gran profesionalidad. Muy buen asesoramiento y siguen con gran interés la evolución de los tratamientos. De 10.”",
                name: "India Sepulcre Sanchez"
              },
              {
                text: "“Un trato genial, instalaciones de 10. Empiezo con ellos un tratamiento, creo estoy en el sitio correcto.”",
                name: "Raquel dlRaya"
              },
              {
                text: "“Llevo poco tiempo con el tratamiento, pero los resultados son muy buenos. El personal muy bien y el centro también. La verdad que estoy bastante contenta.”",
                name: "Mayte Bailen"
              }
            ].map((t, idx) => (
              <div key={`testi-l-${idx}`} className="vibe-card">
                <p className="vibe-card-text">{t.text}</p>
                <div className="vibe-card-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className="vibe-card-name">{t.name}</div>
              </div>
            ))}
            {/* Copia duplicada para loop continuo */}
            {[
              {
                text: "“Llevo yendo varios años a la clínica del Dr. Icardo y reconozco la infinita profesionalidad y experiencia en los tratamientos estéticos. Cada vez que acudo a la consulta salgo contentísimo del resultado obtenido.”",
                name: "Levasam Sanidad Ambiental"
              },
              {
                text: "“Muy buen trato al paciente por parte del doctor Antonio Icardo y todo su equipo. El doctor te aconseja el tratamiento adecuado. Estoy muy contenta, lo recomiendo, buenos resultados.”",
                name: "Oli Col"
              },
              {
                text: "“Te recomienda tratamiento personalizado y adecuado, con excelentes resultados. Es mi clínica de confianza.”",
                name: "Imane Aich"
              },
              {
                text: "“Excelentes profesionales, todos. Llevo yendo más de un año con ellos y siempre salgo encantada.”",
                name: "Dayana Arambulo"
              },
              {
                text: "“Atención médica especializada de mucho nivel. Personal asistencial muy amable y profesional, tanto en la consulta como vía telefónica. El Dr. Icardo muestra su excelencia profesional en cada caso que atiende.”",
                name: "Jose Humberto Leotaud Garcia"
              },
              {
                text: "“Espectacular el doctor, una atención personalizada que te hace sentir muy a gusto y el tratamiento que me hice ¡fenomenal!”",
                name: "Marcela Alejandra Villalba"
              },
              {
                text: "“Médico estético increíblemente bueno. Me estoy quitando las arañas vasculares con él y estoy encantada. Muchísima clientela. Atención de 10.”",
                name: "Queenofthecleanfood Recetas"
              },
              {
                text: "“Lo recomiendo. Rápido en las citas y muy profesional. Asequible. Fui por un problema de rubí que trató con láser y de paso me quitó algunas manchas en el escote y cuello. El resultado espectacular.”",
                name: "Emete Cede"
              },
              {
                text: "“Muy profesionales y buen trato. Además precios bastante razonables.”",
                name: "Maria Centenero Rico"
              },
              {
                text: "“Extraordinario equipo que atiende con gran profesionalidad. Muy buen asesoramiento y siguen con gran interés la evolución de los tratamientos. De 10.”",
                name: "India Sepulcre Sanchez"
              },
              {
                text: "“Un trato genial, instalaciones de 10. Empiezo con ellos un tratamiento, creo estoy en el sitio correcto.”",
                name: "Raquel dlRaya"
              },
              {
                text: "“Llevo poco tiempo con el tratamiento, pero los resultados son muy buenos. El personal muy bien y el centro también. La verdad que estoy bastante contenta.”",
                name: "Mayte Bailen"
              }
            ].map((t, idx) => (
              <div key={`testi-l-dup-${idx}`} className="vibe-card">
                <p className="vibe-card-text">{t.text}</p>
                <div className="vibe-card-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className="vibe-card-name">{t.name}</div>
              </div>
            ))}
          </div>

          {/* Fila 2 - Fluyendo a la Derecha */}
          <div className="testi-vibe-track-right">
            {[
              {
                text: "“Muy profesional, muy meticuloso, muy buen asesoramiento un 10 como médico y como centro estético. No te hacen nada que no necesites y eso se agradece. Las chicas de recepción súper amables, sin duda volveré.”",
                name: "P P"
              },
              {
                text: "“Súper profesionales, te asesoran muy bien y los resultados son mejor de lo esperado.”",
                name: "Raquel Martin"
              },
              {
                text: "“Si pudiera valorarlo mejor lo haría, me faltan estrellas. Gran profesional y mejor persona. Y su equipo más de lo mismo.”",
                name: "Eva Belen Guilabert Salmeron"
              },
              {
                text: "“Recomiendo mucho este sitio, muy profesionales a muy buenos precios.”",
                name: "Lucia Gonzalez"
              },
              {
                text: "“Muy recomendable el trato especial, sin duda una clínica de confianza.”",
                name: "Noelia Murcia"
              },
              {
                text: "“Un profesional de total confianza y todas las personas que trabajan allí son muy amables.”",
                name: "Maria del Mar Ibarra"
              },
              {
                text: "“Excelentes profesionales, trato muy personal.”",
                name: "Natalia Gallegos"
              },
              {
                text: "“Atención personalizada. Grandes profesionales.”",
                name: "Roberto Ferrandez"
              },
              {
                text: "“Me estoy haciendo un tratamiento para las varices y estoy encantada, la doctora es encantadora.”",
                name: "Paqui Palomares Santiago"
              },
              {
                text: "“Muy buena atención tanto médica como las auxiliares. Resultados excelentes en sus tratamientos.”",
                name: "Miss_Gardener Rosa"
              },
              {
                text: "“Muy profesional buena atención.”",
                name: "Jose Manuel Garcia Marin"
              },
              {
                text: "“Muy profesional y cercano. Lo recomiendo.”",
                name: "Marigeles Izan"
              }
            ].map((t, idx) => (
              <div key={`testi-r-${idx}`} className="vibe-card">
                <p className="vibe-card-text">{t.text}</p>
                <div className="vibe-card-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className="vibe-card-name">{t.name}</div>
              </div>
            ))}
            {/* Copia duplicada para loop continuo */}
            {[
              {
                text: "“Muy profesional, muy meticuloso, muy buen asesoramiento un 10 como médico y como centro estético. No te hacen nada que no necesites y eso se agradece. Las chicas de recepción súper amables, sin duda volveré.”",
                name: "P P"
              },
              {
                text: "“Súper profesionales, te asesoran muy bien y los resultados son mejor de lo esperado.”",
                name: "Raquel Martin"
              },
              {
                text: "“Si pudiera valorarlo mejor lo haría, me faltan estrellas. Gran profesional y mejor persona. Y su equipo más de lo mismo.”",
                name: "Eva Belen Guilabert Salmeron"
              },
              {
                text: "“Recomiendo mucho este sitio, muy profesionales a muy buenos precios.”",
                name: "Lucia Gonzalez"
              },
              {
                text: "“Muy recomendable el trato especial, sin duda una clínica de confianza.”",
                name: "Noelia Murcia"
              },
              {
                text: "“Un profesional de total confianza y todas las personas que trabajan allí son muy amables.”",
                name: "Maria del Mar Ibarra"
              },
              {
                text: "“Excelentes profesionales, trato muy personal.”",
                name: "Natalia Gallegos"
              },
              {
                text: "“Atención personalizada. Grandes profesionales.”",
                name: "Roberto Ferrandez"
              },
              {
                text: "“Me estoy haciendo un tratamiento para las varices y estoy encantada, la doctora es encantadora.”",
                name: "Paqui Palomares Santiago"
              },
              {
                text: "“Muy buena atención tanto médica como las auxiliares. Resultados excelentes en sus tratamientos.”",
                name: "Miss_Gardener Rosa"
              },
              {
                text: "“Muy profesional buena atención.”",
                name: "Jose Manuel Garcia Marin"
              },
              {
                text: "“Muy profesional y cercano. Lo recomiendo.”",
                name: "Marigeles Izan"
              }
            ].map((t, idx) => (
              <div key={`testi-r-dup-${idx}`} className="vibe-card">
                <p className="vibe-card-text">{t.text}</p>
                <div className="vibe-card-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className="vibe-card-name">{t.name}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Google Reviews Badge */}
        <a 
          href="https://www.google.com/search?q=Clinicas+Icardo" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="testi-google-badge"
          data-reveal
          data-delay="2"
        >
          <div className="testi-google-badge-left">
            <span className="testi-google-badge-title">Reseñas de Google</span>
            <div className="testi-google-badge-stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              <span className="rating-score">4.9/5</span>
            </div>
          </div>
          <div className="testi-google-badge-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.13-.08-.24-.19-.35-.31-.05-.1-.13-.21-.18-.32z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
          </div>
        </a>
      </section>


      {/* ─── 11. QUIZ CTA (reemplaza sección final) ──────── */}
      <QuizCTA />

      <Footer />
    </>
  )
}
