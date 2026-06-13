import { useState } from 'react'
import { Link } from 'react-router-dom'
import { tratamientos } from '../data/tratamientos'

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

export default function QuizCTA() {
  const [answers, setAnswers] = useState([])
  const [resultSlug, setResultSlug] = useState(null)

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
  }

  const question = getCurrentQuestion(answers)
  const maxSteps = getMaxSteps(answers)
  const currentStep = answers.length + 1
  const progress = resultSlug ? 100 : ((answers.length / maxSteps) * 100)

  const resultData = resultSlug ? tratamientos.find(t => t.slug === resultSlug) : null

  return (
    <section className="quiz-section" id="cita">
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
              <div className="quiz-result-btns">
                <a className="btn btn-primary" href="tel:+34966308811">
                  Pedir cita
                  <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
                <Link to={`/tratamientos/${resultData.slug}`} className="btn-terra-outline">
                  Saber más
                </Link>
              </div>
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
