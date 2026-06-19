const API_BASE = 'https://icardo.siminfo.es/api/web-appointments'
const TOKEN = 'MF0iYSGjZZAVdKeUtGOS'

export async function fetchSlots(clinica, tratamiento) {
  const res = await fetch(`${API_BASE}/availability.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: TOKEN, Clinica: clinica, tratamiento }),
  })
  return res.json()
}

export async function bookAppointment(nombre, telefono, dni, idcalendario) {
  const res = await fetch(`${API_BASE}/book.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: TOKEN, nombre, telefono, dni, idcalendario }),
  })
  return res.json()
}
