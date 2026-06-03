import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NuestrasClinicas() {
  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className="container" data-reveal>
          <span className="eyebrow">· Clínicas Icardo</span>
          <h1>Nuestras <span className="it">Clínicas</span></h1>
          <p>Dos centros en el corazón de Alicante y Elche. El mismo equipo, el mismo estándar de excelencia.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="clinics-grid">
            <div className="clinic-card" data-reveal data-delay="1">
              <div className="clinic-card-img">
                <img src="/assets/clinica-alicante.webp" alt="Clínica Alicante" />
              </div>
              <div className="clinic-card-body">
                <h3>Clínica Alicante</h3>
                <span className="clinic-tag">· Sede principal</span>
                <p>Av. Maisonnave 27, 7º Izq.</p>
                <p>03003 Alicante</p>
                <a className="clinic-tel" href="tel:+34966308811">+34 966 308 811</a>
                <a
                  className="btn btn-primary"
                  href="https://maps.google.com/?q=Av.+Maisonnave+27,+Alicante"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cómo llegar
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="clinic-card" data-reveal data-reveal-delay="2">
              <div className="clinic-card-img">
                <img src="/assets/clinica-elche.webp" alt="Clínica Elche" />
              </div>
              <div className="clinic-card-body">
                <h3>Clínica Elche</h3>
                <span className="clinic-tag">· Sucursal Elche</span>
                <p>C/ Ángel, 7 Bº</p>
                <p>03203 Elche</p>
                <a className="clinic-tel" href="tel:+34965450470">+34 965 450 470</a>
                <a
                  className="btn btn-primary"
                  href="https://maps.google.com/?q=C/+Ángel,+7,+Elche"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cómo llegar
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="maps-section" style={{ padding: '60px 0 0 0', background: 'transparent' }}>
            <div className="maps-head" style={{ marginBottom: '32px', textAlign: 'center' }} data-reveal>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>· Ubicaciones exactas</span>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 44px)', margin: 0 }}>Mapas interactivos de <span className="it">nuestras clínicas</span></h2>
            </div>
            <div className="maps-grid" data-reveal data-delay="1">
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
                <div className="map-frame-wrap" style={{ height: '320px' }}>
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
                  Cómo llegar en Google Maps
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
                <div className="map-frame-wrap" style={{ height: '320px' }}>
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
                  Cómo llegar en Google Maps
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-quick">
            <h3>Contacto directo</h3>
            <div className="contact-quick-items">
              <div>Email: <a href="mailto:info@antonio-icardo.com">info@antonio-icardo.com</a></div>
              <div>Móvil / WhatsApp: <a href="tel:+34680637247">+34 680 637 247</a></div>
            </div>
            <Link to="/contacto" className="btn btn-primary">
              Pide tu cita
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
