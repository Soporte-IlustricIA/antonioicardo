import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { tratamientos } from '../data/tratamientos'

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileTratamientosOpen, setMobileTratamientosOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    // Cierra el submenu de tratamientos al cerrar/abrir menu general
    if (mobileMenuOpen) setMobileTratamientosOpen(false)
  }

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
    setMobileTratamientosOpen(false)
  }

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link className="nav-logo" to="/" onClick={handleLinkClick}>
            <img src="/assets/logo.png" alt="Clínicas Icardo" />
          </Link>
          <nav className="nav-links">
            <NavLink to="/">Inicio</NavLink>
            <div className="nav-drop-wrap">
              <NavLink to="/tratamientos">
                Tratamientos
                <svg className="drop-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </NavLink>
              <div className="nav-dropdown">
                {tratamientos.map(t => (
                  <Link key={t.slug} to={`/tratamientos/${t.slug}`}>
                    {t.nombre}
                  </Link>
                ))}
              </div>
            </div>
            <NavLink to="/nuestras-clinicas">Nuestras Clínicas</NavLink>
            <NavLink to="/quienes-somos">Quiénes Somos</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
          </nav>
          <div className="nav-right">
            <div className="nav-calls-group">
              <a className="nav-call" href="tel:+34966308811">
                Alicante <b>966 308 811</b>
              </a>
              <a className="nav-call" href="tel:+34965450470">
                Elche <b>965 450 470</b>
              </a>
            </div>
            <Link to="/contacto" className="btn btn-primary">
              Pedir cita
              <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <a 
              href="https://www.instagram.com/clinicas.icardo/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-instagram"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>

            {/* Botón menú hamburguesa elegante para móvil */}
            <button 
              className={`nav-mobile-hamburger ${mobileMenuOpen ? 'is-active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Botón de menú"
            >
              <span className="line"></span>
              <span className="line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú desplegable móvil */}
      <div className={`nav-mobile-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="nav-mobile-menu-inner">
          <div className="nav-mobile-links">
            <NavLink to="/" onClick={handleLinkClick}>Inicio</NavLink>
            
            <div className="nav-mobile-accordion">
              <button 
                className={`nav-mobile-accordion-btn ${mobileTratamientosOpen ? 'is-active' : ''}`}
                onClick={() => setMobileTratamientosOpen(!mobileTratamientosOpen)}
              >
                Tratamientos
                <svg className="drop-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              <div className={`nav-mobile-accordion-content ${mobileTratamientosOpen ? 'is-open' : ''}`}>
                <Link to="/tratamientos" onClick={handleLinkClick} className="view-all-link">
                  Ver todos los tratamientos →
                </Link>
                {tratamientos.map(t => (
                  <Link key={t.slug} to={`/tratamientos/${t.slug}`} onClick={handleLinkClick}>
                    {t.nombre}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink to="/nuestras-clinicas" onClick={handleLinkClick}>Nuestras Clínicas</NavLink>
            <NavLink to="/quienes-somos" onClick={handleLinkClick}>Quiénes Somos</NavLink>
            <NavLink to="/contacto" onClick={handleLinkClick}>Contacto</NavLink>
          </div>

          <div className="nav-mobile-footer">
            <p className="nav-mobile-footer-title">Llámanos gratis para resolver tus dudas:</p>
            <div className="nav-mobile-phones">
              <a href="tel:+34966308811" className="phone-line">
                <span>Alicante:</span> <b>966 308 811</b>
              </a>
              <a href="tel:+34965450470" className="phone-line">
                <span>Elche:</span> <b>965 450 470</b>
              </a>
            </div>
            
            <a 
              href="https://www.instagram.com/clinicas.icardo/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-mobile-instagram-btn"
              onClick={handleLinkClick}
            >
              <InstagramIcon size={18} />
              Síguenos en Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
