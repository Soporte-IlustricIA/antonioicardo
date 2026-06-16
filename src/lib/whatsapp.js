// Número de WhatsApp de la clínica, usado por el botón flotante,
// el cuestionario de inicio y el formulario de contacto.
export const WHATSAPP_NUMBER = '34680637247'

// Construye un enlace wa.me con el texto ya codificado, listo para
// abrir WhatsApp (app o web) con el mensaje precargado.
export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
