import { useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import QuizCTA from '../components/QuizCTA'

export default function Tratamientos() {
  const dashRef = useRef(null)

  /* ── Data dashboard animation ── */
  useEffect(() => {
    const section = dashRef.current
    if (!section) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function fmtNum(val) {
      const n = Math.round(val)
      return n >= 1000 ? Math.floor(n / 1000) + '.' + String(n % 1000).padStart(3, '0') : String(n)
    }

    if (reduced) {
      section.classList.add('dd--visible')
      const numEl = section.querySelector('.dd-donut-num')
      if (numEl) numEl.textContent = '2.500'
      return
    }

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      section.classList.add('dd--visible')
      const numEl = section.querySelector('.dd-donut-num')
      if (numEl) {
        const start = performance.now()
        function step(now) {
          const t = Math.min((now - start) / 1400, 1)
          numEl.textContent = fmtNum((1 - (1 - t) ** 3) * 2500)
          if (t < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
      io.disconnect()
    }, { threshold: 0.2 })

    io.observe(section)
    return () => io.disconnect()
  }, [])

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      {/* ─── DATA DASHBOARD ──────────────────────────── */}
      <section className="dd-section pt-32 pb-24" ref={dashRef}>

        <div className="container">
          <div className="dd-head" data-reveal>
            <h2>Datos que ponen tu <em>salud en movimiento</em></h2>
            <p>Descubre dónde te encuentras. Decide hacia dónde vas.</p>
          </div>

          <div className="dd-grid">

            {/* ── Izquierda: dark card ─── */}
            <div className="dd-card-dark" data-reveal data-delay="1">
              <img className="dd-dark-bg"
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
                alt="" aria-hidden="true" loading="lazy" />
              <div className="dd-dark-overlay" />
              <div className="dd-dark-body">
                <span className="dd-dark-badge">7 ESPECIALIDADES</span>
                <p className="dd-dark-heading">Análisis integral de tu salud estética</p>
                <div className="dd-inner">
                  <div className="dd-donut-area">
                    <div className="dd-stat-side">
                      <strong>+40</strong>
                      <small>años</small>
                      <small>experiencia</small>
                    </div>
                    <svg className="dd-svg" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="58" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="10"/>
                      <circle className="dd-arc dd-arc-g" cx="80" cy="80" r="58" fill="none"
                        stroke="#6CC17A" strokeWidth="10" strokeLinecap="round"
                        strokeDasharray="330 31" transform="rotate(-90 80 80)"/>
                      <circle className="dd-arc dd-arc-t" cx="80" cy="80" r="58" fill="none"
                        stroke="#C07B5C" strokeWidth="10" strokeLinecap="round"
                        strokeDasharray="31 330" strokeDashoffset="-330" transform="rotate(-90 80 80)"/>
                      <text x="80" y="73" textAnchor="middle" fill="white"
                        fontSize="21" fontFamily="Cormorant Garamond, serif" fontWeight="300">
                        <tspan className="dd-donut-num">0</tspan><tspan fontSize="13" dy="-4">+</tspan>
                      </text>
                      <text x="80" y="88" textAnchor="middle" fill="rgba(255,255,255,.55)"
                        fontSize="8.5" fontFamily="system-ui, sans-serif">pacientes</text>
                      <text x="80" y="99" textAnchor="middle" fill="rgba(255,255,255,.55)"
                        fontSize="8.5" fontFamily="system-ui, sans-serif">transformados</text>
                    </svg>
                    <div className="dd-stat-side">
                      <strong>+15K</strong>
                      <small>pacientes</small>
                      <small>atendidos</small>
                    </div>
                  </div>

                  <div className="dd-cats">
                    <span className="dd-cats-lbl">Categorías</span>
                    {[
                      { name: 'Rejuvenecimiento facial', g: 8, t: 2 },
                      { name: 'Cuerpo & Adelgazamiento', g: 6, t: 3 },
                      { name: 'Nutrición & Salud',       g: 5, t: 2 },
                    ].map(cat => (
                      <div key={cat.name} className="dd-cat-row">
                        <span className="dd-cat-name">{cat.name} ›</span>
                        <div className="dd-cat-bottom">
                          <div className="dd-pills">
                            {Array.from({ length: cat.g }).map((_, i) => <i key={`g${i}`} className="dd-pill dd-pill-g" />)}
                            {Array.from({ length: cat.t }).map((_, i) => <i key={`t${i}`} className="dd-pill dd-pill-t" />)}
                          </div>
                          <span className="dd-cat-nums"><b className="g">{cat.g}</b> · <b className="t">{cat.t}</b></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Centro: dos cards apiladas ─── */}
            <div className="dd-center" data-reveal data-delay="2">
              <div className="dd-card dd-card-steps">
                <span className="dd-card-tag">SIGUIENTES PASOS</span>
                <h3>Tu plan <em>personalizado</em></h3>
                <div className="dd-steps">
                  {[
                    { icon: '◎', name: 'Consulta',    desc: 'Valoración médica personalizada y sin compromiso en tu clínica.' },
                    { icon: '◈', name: 'Diagnóstico',  desc: 'Plan clínico a medida según tus objetivos y estilo de vida.' },
                    { icon: '◉', name: 'Seguimiento',  desc: 'Revisiones periódicas para garantizar resultados duraderos.' },
                  ].map(s => (
                    <div key={s.name} className="dd-step">
                      <div className="dd-step-icon">{s.icon}</div>
                      <div className="dd-step-body">
                        <strong>{s.name}</strong>
                        <span>{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dd-card dd-card-metrics">
                <span className="dd-card-tag">SATISFACCIÓN</span>
                <h3>Avales de <em>nuestros pacientes</em></h3>
                <div className="dd-metrics">
                  {[
                    { label: 'Satisfacción',   val: '96%',  note: 'recomiendan', bars: [55,65,50,80,72,85,92,88], cls: 'blue'   },
                    { label: 'Google Reviews', val: '4.9★', note: 'valoración',  bars: [72,80,68,85,90,82,95,91], cls: 'terra'  },
                    { label: 'Recomendación',  val: '98%',  note: 'lo vuelven a recomendar', bars: [60,68,72,65,75,70,90,95], cls: 'purple' },
                  ].map(m => (
                    <div key={m.label} className="dd-metric">
                      <span className="dd-metric-val">{m.val}</span>
                      <div className="dd-mini-bars">
                        {m.bars.map((h, i) => (
                          <div key={i} className={`dd-mc-b dd-mc-b--${m.cls}`} style={{ '--h': `${h}%` }} />
                        ))}
                      </div>
                      <span className="dd-metric-label">{m.label}</span>
                      <span className="dd-metric-note">{m.note}</span>
                    </div>
                  ))}
                </div>
                <div className="dd-sources">Google Reviews · Doctoralia · Facebook</div>
              </div>
            </div>

            {/* ── Derecha: imagen con cifra ─── */}
            <div className="dd-card-img" data-reveal data-delay="3">
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=80" alt="" loading="lazy" />
              <div className="dd-img-overlay" />
              <div className="dd-img-content">
                <div className="dd-img-num">5.000<span>+</span></div>
                <div className="dd-img-label">Transformaciones exitosas</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <QuizCTA />
      <Footer />
    </div>
  )
}
