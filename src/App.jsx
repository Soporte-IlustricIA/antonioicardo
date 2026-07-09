import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import Inicio from './pages/Inicio'
import Tratamientos from './pages/Tratamientos'
import TratamientoPage from './pages/tratamientos/TratamientoPage'
import ArrugarPage from './pages/tratamientos/ArrugarPage'
import VaricesPage from './pages/tratamientos/VaricesPage'
import RejuvenecimientoFacialPage from './pages/tratamientos/RejuvenecimientoFacialPage'
import CelulitisPage from './pages/tratamientos/CelulitisPage'
import NutricionPage from './pages/tratamientos/NutricionPage'
import TratamientoCiudadPage from './pages/tratamientos/TratamientoCiudadPage'
import NuestrasClinicas from './pages/NuestrasClinicas'
import QuienesSomos from './pages/QuienesSomos'
import Contacto from './pages/Contacto'
import AvisoLegal from './pages/AvisoLegal'
import PoliticaPrivacidad from './pages/PoliticaPrivacidad'
import PoliticaCookies from './pages/PoliticaCookies'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tratamientos" element={<Tratamientos />} />
        <Route path="/tratamientos/arrugas" element={<ArrugarPage />} />
        <Route path="/tratamientos/varices" element={<VaricesPage />} />
        <Route path="/tratamientos/rejuvenecimiento-facial" element={<RejuvenecimientoFacialPage />} />
        <Route path="/tratamientos/celulitis" element={<CelulitisPage />} />
        <Route path="/tratamientos/nutricion" element={<NutricionPage />} />
        <Route path="/tratamientos/:slug/:ciudad" element={<TratamientoCiudadPage />} />
        <Route path="/tratamientos/:slug" element={<TratamientoPage />} />
        <Route path="/nuestras-clinicas" element={<NuestrasClinicas />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
