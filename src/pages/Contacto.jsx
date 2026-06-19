import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { tratamientos } from '../data/tratamientos'
import { fetchSlots, bookAppointment } from '../lib/appointments'

const Spinner = () => (
  <div style={{
    width: 18, height: 18,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: '_spin 0.8s linear infinite',
    display: 'inline-block',
    verticalAlign: 'middle',
  }} />
)

const ErrorBox = ({ type }) => {
  const msg = type === 'no-slots'
    ? 'No hay citas disponibles en este momento. Por favor, espere e inténtelo de nuevo, o contáctenos directamente:'
    : 'No se ha podido confirmar la cita. Por favor, espere e inténtelo de nuevo, o llámenos directamente:'
  return (
    <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#7f1d1d', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', lineHeight: '1.6' }}>
      {msg}{' '}
      <a href="tel:+34966308811" style={{ color: '#7f1d1d', fontWeight: 600 }}>Alicante 966 308 811</a>
      {' · '}
      <a href="tel:+34965450470" style={{ color: '#7f1d1d', fontWeight: 600 }}>Elche 965 450 470</a>
    </div>
  )
}

export default function Contacto() {
  const [phase, setPhase] = useState('form')   // 'form' | 'slots' | 'confirmed'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [page, setPage] = useState(0)
  const [confirmedLabel, setConfirmedLabel] = useState('')
  const [form, setForm] = useState({
    nombre: '', telefono: '', email: '',
    dni: '', clinica: '', tratamiento: '', mensaje: '',
    privacidad: false,
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const clinica = form.clinica
      ? form.clinica.charAt(0).toUpperCase() + form.clinica.slice(1)
      : 'Alicante'
    const tratamientoObj = tratamientos.find(t => t.slug === form.tratamiento)
    const tratamiento = tratamientoObj?.nombre || ''
    try {
      const data = await fetchSlots(clinica, tratamiento)
      if (data.ok && data.slots?.length > 0) {
        setSlots(data.slots)
        setPage(0)
        setPhase('slots')
      } else {
        setError('no-slots')
      }
    } catch {
      setError('no-slots')
    } finally {
      setLoading(false)
    }
  }

  async function handleConfirm() {
    setLoading(true)
    setError(null)
    try {
      const data = await bookAppointment(form.nombre, form.telefono, form.dni, selectedSlot.idcalendario)
      if (data.ok) {
        setConfirmedLabel(selectedSlot.label)
        setPhase('confirmed')
      } else {
        setError('book-failed')
      }
    } catch {
      setError('book-failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`@keyframes _spin { to { transform: rotate(360deg) } }`}</style>
      <Navbar />

      <section className="page-hero contact-hero">
        <div className="container" data-reveal>
          <span className="eyebrow">· Clínicas Icardo</span>
          <h1>Contacta con <span className="it">nosotros</span></h1>
          <p>Estamos en Alicante y Elche. Responderemos a tu consulta lo antes posible.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="contact-layout">

            <div className="contact-info" data-reveal data-delay="1">
              <h3>Datos de contacto</h3>

              <div className="contact-info-item">
                <div className="contact-info-icon">☎</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>Alicante</div>
                  <a href="tel:+34966308811">+34 966 308 811</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">☎</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>Elche</div>
                  <a href="tel:+34965450470">+34 965 450 470</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">✉</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>Email</div>
                  <a href="mailto:antonioicardogarcia@hotmail.com">antonioicardogarcia@hotmail.com</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">WA</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>WhatsApp</div>
                  <a href="tel:+34680637247">+34 680 637 247</a>
                </div>
              </div>

              <a
                className="btn btn-primary"
                href="https://wa.me/34680637247?text=Hola%2C%20me%20gustaría%20pedir%20información"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: '8px' }}
              >
                Escribir por WhatsApp
              </a>
            </div>

            <div className="contact-form-card" data-reveal data-delay="2">
              {phase === 'form' && (
                <>
                  <h3>Pide tu cita</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row two">
                      <div className="form-group">
                        <label htmlFor="nombre">Nombre *</label>
                        <input
                          id="nombre" name="nombre" type="text"
                          value={form.nombre} onChange={handleChange} required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="telefono">Teléfono *</label>
                        <input
                          id="telefono" name="telefono" type="tel"
                          value={form.telefono} onChange={handleChange} required
                        />
                      </div>
                    </div>

                    <div className="form-row two">
                      <div className="form-group">
                        <label htmlFor="email">Email (opcional)</label>
                        <input
                          id="email" name="email" type="email"
                          value={form.email} onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="dni">DNI *</label>
                        <input
                          id="dni" name="dni" type="text"
                          value={form.dni} onChange={handleChange}
                          placeholder="12345678A" required
                        />
                      </div>
                    </div>

                    <div className="form-row two">
                      <div className="form-group">
                        <label htmlFor="clinica">Clínica preferida</label>
                        <select id="clinica" name="clinica" value={form.clinica} onChange={handleChange}>
                          <option value="">Sin preferencia</option>
                          <option value="alicante">Alicante</option>
                          <option value="elche">Elche</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="tratamiento">Tratamiento de interés</label>
                        <select id="tratamiento" name="tratamiento" value={form.tratamiento} onChange={handleChange}>
                          <option value="">Seleccionar...</option>
                          {tratamientos.map(t => (
                            <option key={t.slug} value={t.slug}>{t.nombre}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="mensaje">Mensaje (opcional)</label>
                      <textarea
                        id="mensaje" name="mensaje"
                        value={form.mensaje} onChange={handleChange}
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                      />
                    </div>

                    <div className="form-check">
                      <input
                        id="privacidad" name="privacidad" type="checkbox"
                        checked={form.privacidad} onChange={handleChange} required
                      />
                      <label htmlFor="privacidad">
                        He leído y acepto la <a href="#" style={{ color: 'var(--terra)' }}>política de privacidad</a>
                      </label>
                    </div>

                    {error === 'no-slots' && <ErrorBox type="no-slots" />}

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                      disabled={loading}
                    >
                      {loading ? <Spinner /> : (
                        <>
                          Ver citas disponibles
                          <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}

              {phase === 'slots' && (() => {
                const totalPages = Math.ceil(slots.length / 10)
                const visible = slots.slice(page * 10, page * 10 + 10)
                const selNotVisible = selectedSlot && !visible.find(s => s.idcalendario === selectedSlot.idcalendario)
                return (
                <>
                  <h3>Elige tu cita</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: selNotVisible ? '2px' : '12px' }}>
                    Citas {page * 10 + 1}–{Math.min((page + 1) * 10, slots.length)} de {slots.length}
                  </p>
                  {selNotVisible && (
                    <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '12px' }}>
                      Tienes seleccionado: {selectedSlot.label}
                    </p>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                    {visible.map(slot => (
                      <button
                        key={slot.idcalendario}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: selectedSlot?.idcalendario === slot.idcalendario
                            ? '2px solid var(--terra)'
                            : '1px solid #e2d9d0',
                          background: selectedSlot?.idcalendario === slot.idcalendario
                            ? '#fdf6f1'
                            : '#fff',
                          color: '#1A1816',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: selectedSlot?.idcalendario === slot.idcalendario ? 600 : 400,
                          transition: 'border-color 0.15s, background 0.15s',
                        }}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                      <button className="btn btn-terra-outline" onClick={() => setPage(p => p - 1)} disabled={page === 0}>← Anterior</button>
                      <button className="btn btn-terra-outline" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}>Siguiente →</button>
                    </div>
                  )}

                  {error === 'book-failed' && <ErrorBox type="book-failed" />}

                  <button
                    className="btn btn-primary"
                    onClick={handleConfirm}
                    disabled={!selectedSlot || loading}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {loading ? <Spinner /> : 'Confirmar cita'}
                  </button>
                </>
                )
              })()}

              {phase === 'confirmed' && (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px', margin: '0 0 12px' }}>
                    ¡Cita confirmada!
                  </h3>
                  <p style={{ color: 'var(--muted)' }}>Tu cita es el {confirmedLabel}.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAPAS ───────────────────────────────────────── */}
      <section className="maps-section">
        <div className="container">
          <div className="maps-head">
            <span className="eyebrow">· Dónde estamos</span>
            <h2>Nuestras <span className="it">clínicas</span></h2>
          </div>
          <div className="maps-grid">
            <div className="map-card">
              <div className="map-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <strong>Clínica Alicante</strong>
                  <span>Av. Maisonnave 27, 7º Izq. · 03003 Alicante</span>
                </div>
              </div>
              <div className="map-frame-wrap">
                <iframe
                  title="Clínica Icardo Alicante"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.24809392313!2d-0.4934179242271009!3d38.343239471847596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd62364e64df18eb%3A0x3eaea6e6c6d4012e!2sAntonio%20Icardo%20Medicina%20Est%C3%A9tica!5e0!3m2!1ses!2ses!4v1780400739040!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                className="map-link"
                href="https://www.google.com/maps/place/Antonio+Icardo+Medicina%20Est%C3%A9tica/@38.3432395,-0.4934179,17z/data=!3m1!4b1!4m6!3m5!1s0xd62364e64df18eb:0x3eaea6e6c6d4012e!8m2!3d38.3432395!4d-0.490843!16s%2Fg%2F1tffw8d5?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            <div className="map-card">
              <div className="map-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <strong>Clínica Elche</strong>
                  <span>C/ Ángel, 7 Bº · 03203 Elche</span>
                </div>
              </div>
              <div className="map-frame-wrap">
                <iframe
                  title="Clínica Icardo Elche"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.7250831240212!2d-0.7005695242310452!3d38.26268167186657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63b6f28e2d6eb7%3A0xa862a6f1f818f592!2sAntonio%20Icardo%20Medicina%20Est%C3%A9tica!5e0!3m2!1ses!2ses!4v1780401109348!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                className="map-link"
                href="https://www.google.com/maps/place/Antonio+Icardo+Medicina+Est%C3%A9tica/@38.2626817,-0.7005695,17z/data=!3m1!4b1!4m6!3m5!1s0xd63b6f28e2d6eb7:0xa862a6f1f818f592!8m2!3d38.2626817!4d-0.6979946!16s%2Fg%2F11cmg0_p7j?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
