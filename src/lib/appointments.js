const API_BASE = 'https://icardo.siminfo.es/api/web-appointments'
const TOKEN = 'MF0iYSGjZZAVdKeUtGOS'

export async function fetchSlots(clinica, idtratamiento, fecha) {
  const res = await fetch(`${API_BASE}/availability.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: TOKEN, clinica, idtratamiento, fecha }),
  })
  return res.json()
}

export async function fetchTreatments() {
  const res = await fetch(`${API_BASE}/treatments.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: TOKEN }),
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
