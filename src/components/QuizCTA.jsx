import { useState } from 'react'
import { Link } from 'react-router-dom'
import { tratamientos } from '../data/tratamientos'
import { fetchSlots, bookAppointment } from '../lib/appointments'

const resultMap = {
  'A-A-A': 'rejuvenecimiento-facial',
  'A-A-B': 'arrugas',
  'A-B-A': 'rejuvenecimiento-facial',
  'A-B-B': 'arrugas',
  'A-C':   'rejuvenecimiento-facial',
  'B-A':   'nutricion',
  'B-B':   'celulitis',
  'B-C':   'nutricion',
  'C':     'varices',
  'D':     'nutricion',
}

const p1 = {
  texto: '¿Cuál es tu principal objetivo?',
  opciones: [
    { id: 'A', texto: 'Eliminar arrugas y rejuvenecer mi cara' },
    { id: 'B', texto: 'Perder peso o reducir medidas' },
    { id: 'C', texto: 'Eliminar varices o arañas vasculares' },
    { id: 'D', texto: 'Mejorar mi alimentación y salud' },
  ],
}

const p2ByP1 = {
  A: {
    texto: '¿Qué zona te preocupa más?',
    opciones: [
      { id: 'A', texto: 'Arrugas de expresión (frente, patas de gallo)' },
      { id: 'B', texto: 'Pérdida de volumen y firmeza' },
      { id: 'C', texto: 'Manchas, textura o luminosidad' },
    ],
  },
  B: {
    texto: '¿Qué buscas?',
    opciones: [
      { id: 'A', texto: 'Perder peso con control médico' },
      { id: 'B', texto: 'Eliminar celulitis y tonificar' },
      { id: 'C', texto: 'Mejorar hábitos con un nutricionista' },
    ],
  },
}

const p3 = {
  texto: '¿Has probado tratamientos antes?',
  opciones: [
    { id: 'A', texto: 'Sí, busco algo más avanzado' },
    { id: 'B', texto: 'No, prefiero empezar con algo suave' },
  ],
}

function getCurrentQuestion(answers) {
  if (answers.length === 0) return p1
  const first = answers[0]
  if (answers.length === 1 && first !== 'D' && first !== 'C') return p2ByP1[first]
  if (answers.length === 2 && first === 'A' && (answers[1] === 'A' || answers[1] === 'B')) return p3
  return null
}

function getMaxSteps(answers) {
  if (answers.length === 0) return 3
  const first = answers[0]
  if (first === 'D') return 1
  if (first === 'C') return 1
  if (first === 'B') return 2
  if (first === 'A') {
    if (answers.length > 1 && answers[1] === 'C') return 2
    return 3
  }
  return 3
}

const Spinner = () => (
  <div style={{
    width: 18, height: 18,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: '_spin 0.8s linear infinite',
    display: 'inline-block',
    verticalAlign: 'middle',
  }} />
)

const BookErrorBox = ({ type }) => {
  const msg = type === 'no-slots'
    ? 'No hay citas disponibles en este momento. Por favor, espere e inténtelo de nuevo, o llámenos:'
    : 'No se ha podido confirmar la cita. Por favor, espere e inténtelo de nuevo, o llámenos directamente:'
  return (
    <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#7f1d1d', padding: '12px 16px', borderRadius: '8px', margin: '12px 0', fontSize: '14px', lineHeight: '1.6' }}>
      {msg}{' '}
      <a href="tel:+34966308811" style={{ color: '#7f1d1d', fontWeight: 600 }}>Alicante 966 308 811</a>
      {' · '}
      <a href="tel:+34965450470" style={{ color: '#7f1d1d', fontWeight: 600 }}>Elche 965 450 470</a>
    </div>
  )
}

export default function QuizCTA() {
  const [answers, setAnswers] = useState([])
  const [resultSlug, setResultSlug] = useState(null)

  const [bookPhase, setBookPhase] = useState('idle')   // 'idle' | 'slots' | 'confirmed'
  const [bookLoading, setBookLoading] = useState(false)
  const [bookError, setBookError] = useState(null)
  const [slots, setSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [bookForm, setBookForm] = useState({ nombre: '', telefono: '', dni: '' })
  const [confirmedLabel, setConfirmedLabel] = useState('')

  function handleAnswer(optionId) {
    const newAnswers = [...answers, optionId]
    const key = newAnswers.join('-')
    setAnswers(newAnswers)
    if (resultMap[key]) {
      setResultSlug(resultMap[key])
    }
  }

  function restart() {
    setAnswers([])
    setResultSlug(null)
    setBookPhase('idle')
    setBookLoading(false)
    setBookError(null)
    setSlots([])
    setSelectedSlot(null)
    setBookForm({ nombre: '', telefono: '', dni: '' })
    setConfirmedLabel('')
  }

  function handleBookChange(e) {
    const { name, value } = e.target
    setBookForm(f => ({ ...f, [name]: value }))
  }

  async function handleVerCitas() {
    setBookLoading(true)
    setBookError(null)
    try {
      const data = await fetchSlots('Alicante', resultData.nombre)
      if (data.ok && data.slots?.length > 0) {
        setSlots(data.slots)
        setBookPhase('slots')
      } else {
        setBookError('no-slots')
      }
    } catch {
      setBookError('no-slots')
    } finally {
      setBookLoading(false)
    }
  }

  async function handleBookSubmit(e) {
    e.preventDefault()
    setBookLoading(true)
    setBookError(null)
    try {
      const data = await bookAppointment(bookForm.nombre, bookForm.telefono, bookForm.dni, selectedSlot.idcalendario)
      if (data.ok) {
        setConfirmedLabel(selectedSlot.label)
        setBookPhase('confirmed')
      } else {
        setBookError('book-failed')
      }
    } catch {
      setBookError('book-failed')
    } finally {
      setBookLoading(false)
    }
  }

  const question = getCurrentQuestion(answers)
  const maxSteps = getMaxSteps(answers)
  const currentStep = answers.length + 1
  const progress = resultSlug ? 100 : ((answers.length / maxSteps) * 100)

  const resultData = resultSlug ? tratamientos.find(t => t.slug === resultSlug) : null
  const canReservar = selectedSlot && bookForm.nombre && bookForm.telefono && bookForm.dni && !bookLoading

  return (
    <section className="quiz-section" id="cita">
      <style>{`@keyframes _spin { to { transform: rotate(360deg) } }`}</style>
      <div className="container">
        <span className="eyebrow">· Quiz personalizado</span>
        <h2>Descubre tu <em>tratamiento ideal</em></h2>
        <p>Responde 2 ó 3 preguntas y te diremos qué tratamiento se adapta mejor a ti.</p>

        <div className="quiz-box">
          <div className="quiz-progress">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {resultData ? (
            <div className="quiz-result">
              <span className="eyebrow">Tu tratamiento ideal es:</span>
              <h3>{resultData.nombre}</h3>
              <p>{resultData.descripcionCorta}</p>

              {bookPhase === 'idle' && (
                <div className="quiz-result-btns">
                  {bookError === 'no-slots' && <BookErrorBox type="no-slots" />}
                  <button
                    className="btn btn-primary"
                    onClick={handleVerCitas}
                    disabled={bookLoading}
                  >
                    {bookLoading ? <Spinner /> : (
                      <>
                        Ver citas disponibles
                        <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                  <Link to={`/tratamientos/${resultData.slug}`} className="btn-terra-outline">
                    Saber más
                  </Link>
                </div>
              )}

              {bookPhase === 'slots' && (
                <form onSubmit={handleBookSubmit} style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    {slots.map(slot => (
                      <button
                        key={slot.idcalendario}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: selectedSlot?.idcalendario === slot.idcalendario
                            ? '2px solid var(--terra)'
                            : '1px solid #e2d9d0',
                          background: selectedSlot?.idcalendario === slot.idcalendario
                            ? '#fdf6f1'
                            : '#fff',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: selectedSlot?.idcalendario === slot.idcalendario ? 600 : 400,
                          transition: 'border-color 0.15s, background 0.15s',
                        }}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>

                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label htmlFor="book-nombre">Nombre *</label>
                    <input
                      id="book-nombre" name="nombre" type="text"
                      value={bookForm.nombre} onChange={handleBookChange} required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label htmlFor="book-telefono">Teléfono *</label>
                    <input
                      id="book-telefono" name="telefono" type="tel"
                      value={bookForm.telefono} onChange={handleBookChange} required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label htmlFor="book-dni">DNI *</label>
                    <input
                      id="book-dni" name="dni" type="text"
                      value={bookForm.dni} onChange={handleBookChange}
                      placeholder="12345678A" required
                    />
                  </div>

                  {bookError === 'book-failed' && <BookErrorBox type="book-failed" />}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!canReservar}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {bookLoading ? <Spinner /> : 'Reservar'}
                  </button>
                </form>
              )}

              {bookPhase === 'confirmed' && (
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>✓</div>
                  <p style={{ fontWeight: 600, marginBottom: '4px' }}>¡Cita confirmada!</p>
                  <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Tu cita es el {confirmedLabel}.</p>
                </div>
              )}

              <button className="quiz-restart" onClick={restart}>Volver a empezar</button>
            </div>
          ) : question ? (
            <div>
              <div className="quiz-step">Pregunta {currentStep} de {maxSteps}</div>
              <p className="quiz-question">{question.texto}</p>
              <div className="quiz-options">
                {question.opciones.map(op => (
                  <button
                    key={op.id}
                    className="quiz-option"
                    onClick={() => handleAnswer(op.id)}
                  >
                    <span className="quiz-option-id">{op.id}</span>
                    {op.texto}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
