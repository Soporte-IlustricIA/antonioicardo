import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { tratamientos } from '../data/tratamientos'

export default function Contacto() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    nombre: '', telefono: '', email: '',
    clinica: '', tratamiento: '', mensaje: '',
    privacidad: false,
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
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
                  <a href="mailto:info@antonio-icardo.com">info@antonio-icardo.com</a>
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
              {sent ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '28px', margin: '0 0 12px' }}>
                    ¡Consulta enviada!
                  </h3>
                  <p style={{ color: 'var(--muted)' }}>Nos pondremos en contacto contigo pronto.</p>
                </div>
              ) : (
                <>
                  <h3>Envíanos tu consulta</h3>
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

                    <div className="form-group">
                      <label htmlFor="email">Email (opcional)</label>
                      <input
                        id="email" name="email" type="email"
                        value={form.email} onChange={handleChange}
                      />
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

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                      Enviar consulta
                      <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </form>
                </>
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
