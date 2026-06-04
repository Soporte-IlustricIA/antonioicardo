import { Link } from 'react-router-dom'

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-top">
          <div className="foot-brand">
            <img src="/assets/logo.png" alt="Clínicas Icardo" />
            <p>Clínicas de Medicina Estética Dr. Antonio Icardo. Cuidando la salud y la imagen de nuestros pacientes desde 1992.</p>
          </div>
          <div className="foot-col">
            <h5>CLÍNICA</h5>
            <ul>
              <li><Link to="/quienes-somos">Quiénes somos</Link></li>
              <li><Link to="/nuestras-clinicas">Nuestras clínicas</Link></li>
              <li><Link to="/tratamientos">Tratamientos</Link></li>
              <li><Link to="/contacto">Pedir cita</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>EXPLORA</h5>
            <ul>
              <li><Link to="/tratamientos/arrugas">Arrugas</Link></li>
              <li><Link to="/tratamientos/depilacion-laser">Depilación láser</Link></li>
              <li><Link to="/tratamientos/rejuvenecimiento-facial">Rejuvenecimiento facial</Link></li>
              <li><Link to="/tratamientos/celulitis">Celulitis</Link></li>
              <li><Link to="/tratamientos/adelgazamiento">Adelgazamiento</Link></li>
              <li><Link to="/tratamientos/nutricion">Nutrición</Link></li>
            </ul>
          </div>
        </div>

        <div className="foot-locations text-center">
          <div className="loc">
            <h6>Alicante</h6>
            <p>Av. Maisonnave 27, 7º Izq.<br /><a href="tel:+34966308811">+34 966 308 811</a></p>
          </div>
          <div className="loc">
            <h6>Elche</h6>
            <p>C/ Ángel, 7 Bº<br /><a href="tel:+34965450470">+34 965 450 470</a></p>
          </div>
          <div className="loc">
            <h6>Contacto directo</h6>
            <p><a href="mailto:info@antonio-icardo.com">info@antonio-icardo.com</a><br /><a href="tel:+34680637247">+34 680 637 247</a></p>
          </div>
        </div>

        <div className="foot-bot">
          <span>© 2026 Clínicas Antonio Icardo. Todos los derechos reservados.</span>
          <div className="legal">
            <Link to="/aviso-legal">Aviso legal</Link>
            <Link to="/politica-privacidad">Política de privacidad</Link>
            <Link to="/politica-cookies">Política de cookies</Link>
          </div>
          <div className="socials">
            <a href="https://www.instagram.com/clinicas.icardo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href="https://www.facebook.com/clinicasicardo/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
