import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PoliticaCookies() {
  return (
    <>
      <Navbar />
      <div className="legal-page">
        <div className="legal-hero">
          <div className="container">
            <span className="eyebrow">· Legal</span>
            <h1>Política de Cookies</h1>
          </div>
        </div>
        <div className="container">
          <div className="legal-content">

            <h2>¿Qué son las cookies?</h2>
            <p>
              Una cookie es un fichero que se descarga en el disco duro de su ordenador al acceder a determinadas
              páginas web o aplicaciones. Las cookies permiten, entre otras cosas, recopilar información estadística,
              facilitar ciertas funcionalidades técnicas, almacenar y recuperar información sobre los hábitos de
              navegación o preferencias de un usuario o de su equipo y, dependiendo de la información que contengan
              y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario. Tenga en cuenta
              que las cookies no pueden dañar su equipo y que, a cambio, el que estén activadas nos ayuda a
              identificar y resolver los posibles errores.
            </p>

            <h2>Tipos de cookies</h2>
            <ul>
              <li>
                <strong>Cookies propias o de terceros:</strong> son propias cuando las cookies se gestionan desde el
                terminal o dominio de un mismo editor. De terceros, cuando no las envía el propio editor, sino otra
                entidad.
              </li>
              <li>
                <strong>Cookies de sesión y persistentes:</strong> en las de sesión, los datos recabados sólo se
                recogen mientras el usuario está navegando por la página web. En el caso de las persistentes, los
                datos continúan almacenados en el terminal y se puede acceder a ellos durante un período de tiempo
                determinado.
              </li>
              <li>
                <strong>Cookies técnicas / personalización / análisis / publicitarias:</strong> las cookies técnicas
                permiten controlar el tráfico y la comunicación de datos; las de personalización dejan a los usuarios
                acceder según características propias (navegador, idioma, etc.). Las de análisis recogen datos sobre
                el comportamiento de los usuarios y permiten elaborar un perfil de usuario. Las publicitarias recogen
                datos sobre la gestión de los espacios publicitarios.
              </li>
            </ul>

            <p>
              Nuestra página muestra contenido de proveedores externos, como Instagram, YouTube, Facebook, Twitter,
              etc. Para acceder a los contenidos de terceros, los usuarios deben aceptar previamente las condiciones
              que estos aplican (incluidas sus políticas de cookies, ajenas a nuestro control). Si los usuarios optan
              por no acceder a esos contenidos, estas cookies de terceros no se instalan en sus dispositivos.
            </p>
            <p>
              Los servicios de terceros son ajenos al control de LA EMPRESA. Los proveedores pueden modificar en
              todo momento sus condiciones de servicio, finalidad y utilización de las cookies, etc.
            </p>
            <p>
              Nuestro sitio web utiliza únicamente cookies de sesión. La normativa establece que podemos almacenar
              cookies en su dispositivo si son estrictamente necesarias para el funcionamiento del sitio web.
            </p>

            <h2>Cookies de sesión utilizadas en este sitio web</h2>
            <table className="cookies-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Origen</th>
                  <th>Finalidad</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>c55bc31733ed7bd465f208f4365dc755</td>
                  <td>Terceros</td>
                  <td>Asignar al usuario una sesión en particular</td>
                  <td>De sesión</td>
                </tr>
              </tbody>
            </table>

            <h2>Revocación e instalación de cookies</h2>
            <p>
              El usuario tendrá la posibilidad de decidir si mantiene las cookies habilitadas en su ordenador a
              través del gestor de cookies habilitado para dicha finalidad.
            </p>
            <p>
              El usuario que quiera deshabilitar las cookies aceptadas hasta ahora podrá hacerlo desde la sección de
              preferencias de su navegador de Internet. Esta configuración debe realizarla en cada navegador; si lo
              hace en un navegador y no en los restantes del mismo dispositivo, se asumirá que en los otros sí acepta
              el uso de cookies.
            </p>
            <p>Como cada navegador posee configuraciones diferentes, deberá dirigirse a la parte de ayuda de cada uno:</p>
            <ul>
              <li>
                <strong>Chrome:</strong> Menú → Configuración → Ajustes Avanzados → Privacidad → configurar o
                eliminar cookies existentes.
              </li>
              <li>
                <strong>Internet Explorer:</strong> Herramientas → Opciones de Internet → Privacidad → Configuración
                → Opciones avanzadas.
              </li>
              <li>
                <strong>Firefox:</strong> Menú → Preferencias → Privacidad → Mostrar cookies → Configurar según lo
                deseado.
              </li>
              <li>
                <strong>Safari:</strong> Safari → Preferencias → Privacidad → Realice la configuración deseada.
              </li>
            </ul>

            <p className="legal-update">Política de cookies actualizada por última vez el 11.02.2022</p>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
