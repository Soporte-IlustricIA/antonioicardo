import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="not-found">
        <div>
          <h1>404</h1>
          <h2>Página no encontrada</h2>
          <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
          <Link to="/" className="btn btn-primary">Volver al inicio</Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
