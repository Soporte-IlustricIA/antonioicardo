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
  const [mobileMedicinaOpen, setMobileMedicinaOpen] = useState(false)
  const [mobileNutricionOpen, setMobileNutricionOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    // Cierra los submenus al cerrar/abrir menu general
    if (mobileMenuOpen) {
      setMobileMedicinaOpen(false)
      setMobileNutricionOpen(false)
    }
  }

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
    setMobileMedicinaOpen(false)
    setMobileNutricionOpen(false)
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
            
            {/* Medicina Estética Dropdown */}
            <div className="nav-drop-wrap">
              <span className="nav-drop-trigger">
                Medicina Estética
                <svg className="drop-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
              <div className="nav-dropdown">
                <Link to="/tratamientos/arrugas" onClick={handleLinkClick}>Tratamiento de arrugas</Link>
                <Link to="/tratamientos/rejuvenecimiento-facial" onClick={handleLinkClick}>Rejuvenecimiento facial</Link>
                <Link to="/tratamientos/dermoestetica" onClick={handleLinkClick}>Dermoestética</Link>
                <Link to="/tratamientos/remodelacion" onClick={handleLinkClick}>Remodelación</Link>
                <Link to="/tratamientos/rejuvenecimiento-corporal" onClick={handleLinkClick}>Rejuvenecimiento corporal</Link>
              </div>
            </div>

            {/* Dietética Dropdown */}
            <div className="nav-drop-wrap">
              <span className="nav-drop-trigger">
                Nutrición y Dietética
                <svg className="drop-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
              <div className="nav-dropdown">
                <Link to="/tratamientos/nutricion" onClick={handleLinkClick}>Dietética</Link>
                <Link to="/tratamientos/celulitis" onClick={handleLinkClick}>Tratamiento de celulitis/flacidez</Link>
              </div>
            </div>

            <NavLink id="nav-link-aparatologia" to="/tratamientos/aparatologia">Aparatología</NavLink>

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
            
            {/* Medicina Estética Mobile Accordion */}
            <div className="nav-mobile-accordion">
              <button 
                className={`nav-mobile-accordion-btn ${mobileMedicinaOpen ? 'is-active' : ''}`}
                onClick={() => setMobileMedicinaOpen(!mobileMedicinaOpen)}
              >
                Medicina Estética
                <svg className="drop-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              <div className={`nav-mobile-accordion-content ${mobileMedicinaOpen ? 'is-open' : ''}`}>
                <Link to="/tratamientos/arrugas" onClick={handleLinkClick}>Tratamiento de arrugas</Link>
                <Link to="/tratamientos/rejuvenecimiento-facial" onClick={handleLinkClick}>Rejuvenecimiento facial</Link>
                <Link to="/tratamientos/dermoestetica" onClick={handleLinkClick}>Dermoestética</Link>
                <Link to="/tratamientos/remodelacion" onClick={handleLinkClick}>Remodelación</Link>
                <Link to="/tratamientos/rejuvenecimiento-corporal" onClick={handleLinkClick}>Rejuvenecimiento corporal</Link>
              </div>
            </div>

            {/* Dietética Mobile Accordion */}
            <div className="nav-mobile-accordion">
              <button 
                className={`nav-mobile-accordion-btn ${mobileNutricionOpen ? 'is-active' : ''}`}
                onClick={() => setMobileNutricionOpen(!mobileNutricionOpen)}
              >
                Nutrición y Dietética
                <svg className="drop-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              <div className={`nav-mobile-accordion-content ${mobileNutricionOpen ? 'is-open' : ''}`}>
                <Link to="/tratamientos/nutricion" onClick={handleLinkClick}>Dietética</Link>
                <Link to="/tratamientos/celulitis" onClick={handleLinkClick}>Tratamiento de celulitis/flacidez</Link>
              </div>
            </div>

            <NavLink id="nav-mobile-aparatologia" to="/tratamientos/aparatologia" onClick={handleLinkClick}>Aparatología</NavLink>

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
