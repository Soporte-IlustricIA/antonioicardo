import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import QuizCTA from '../components/QuizCTA'
import { 
  Sparkles, 
  Heart, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Leaf, 
  Compass, 
  Zap,
  Award
} from 'lucide-react'

// Array with all treatments available in /src/data/tratamientos.js
const listadoTratamientos = [
  {
    slug: "rejuvenecimiento-facial",
    categoria: "facial",
    nombre: "Rejuvenecimiento Facial",
    descripcionCorta: "Recupera la luminosidad y firmeza natural de tu rostro con tecnologías regenerativas.",
    duracion: "45–90 min",
    recuperacion: "1–7 días",
    resultados: "Desde la 1ª sesión",
    imagen: "/assets/rejuvenecimiento.webp",
    tecnicas: ["Láser CO2 fraccionado", "Sculptra", "Mesoterapia facial", "Peelings químicos"]
  },
  {
    slug: "arrugas",
    categoria: "facial",
    nombre: "Tratamiento de Arrugas",
    descripcionCorta: "Atenúa líneas de expresión y restaura los volúmenes perdidos sin alterar tu armonía natural.",
    duracion: "30–60 min",
    recuperacion: "Inmediata",
    resultados: "Resultados en 3-7 días",
    imagen: "/assets/arrugas.webp",
    tecnicas: ["Toxina botulínica", "Ácido hialurónico", "Radiesse", "Sculptra"]
  },
  {
    slug: "celulitis",
    categoria: "corporal",
    nombre: "Tratamiento de Celulitis",
    descripcionCorta: "Disminuye la piel de naranja y reafirma la estructura cutánea mediante protocolos médicos combinados.",
    duracion: "45–60 min",
    recuperacion: "Inmediata",
    resultados: "Tras 4–6 sesiones",
    imagen: "/assets/celulitis.webp",
    tecnicas: ["Mesoterapia corporal", "Carboxiterapia", "Radiofrecuencia", "Láser lipolítico"]
  },
  {
    slug: "adelgazamiento",
    categoria: "nutricion",
    nombre: "Clínica de Adelgazamiento",
    descripcionCorta: "Pierde peso bajo estricto control médico, con planes personalizados y cambio de hábitos reales.",
    duracion: "Programa mensual",
    recuperacion: "Sin reposo",
    resultados: "Pérdida progresiva y sostenible",
    imagen: "/assets/adelgazamiento.webp",
    tecnicas: ["Nutrición clínica", "Mesoterapia lipolítica", "Estudio corporal bioeléctrico"]
  },
  {
    slug: "varices",
    categoria: "corporal",
    nombre: "Tratamiento de Varices",
    descripcionCorta: "Elimina de forma selectiva las varices y arañas vasculares mediante esclerosis láser no invasiva.",
    duracion: "45–60 min",
    recuperacion: "Inmediata",
    resultados: "Visibles en 4–8 semanas",
    imagen: "/assets/varices.webp",
    tecnicas: ["Esclerosis láser", "Láser vascular Nd:YAG", "Microesclerosis médica"]
  },
  {
    slug: "depilacion-laser",
    categoria: "corporal",
    nombre: "Depilación Láser Médica",
    descripcionCorta: "Eliminación permanente del vello no deseado con tecnología de diodo de máxima potencia y confort.",
    duracion: "30–95 min",
    recuperacion: "Inmediata",
    resultados: "80-90% de reducción tras ciclo",
    imagen: "/assets/depilacionlaser.webp",
    tecnicas: ["Láser de Diodo médico", "Enfriamiento sub-cero integrado"]
  },
  {
    slug: "nutricion",
    categoria: "nutricion",
    nombre: "Nutrición y Dietética",
    descripcionCorta: "Planes nutricionales a medida diseñados por nuestro especialista de acuerdo a tu metabolismo y objetivos.",
    duracion: "60 min (Inicial)",
    recuperacion: "No requiere",
    resultados: "Mejora desde la 1ª semana",
    imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80",
    tecnicas: ["Educación nutricional", "Planes de rendimiento", "Suplementación funcional"]
  }
]

// Diagnostic concerns data to feed the "Explore by Concern" interactive widget
const listadoPreocupaciones = [
  {
    id: "envejecimiento",
    label: "Arrugas y falta de tersura",
    icono: Sparkles,
    tituloPreocupacion: "Rejuvenecer la textura & Recuperar volumen",
    descripcion: "La pérdida de actividad celular ralentiza el colágeno y forma surcos en frente, patas de gallo u óvalo facial. El enfoque del Dr. Icardo busca rejuvenecer respetando la dinámica y expresividad única del rostro.",
    tratamientosRecomendados: ["rejuvenecimiento-facial", "arrugas"],
    enfoqueClinico: "Bioestimuladores de colágeno de larga duración y ácido hialurónico de alto peso molecular para nutrir desde la dermis profunda sin crear volumen artificial."
  },
  {
    id: "flacidez-celulitis",
    label: "Celulitis y contorno corporal",
    icono: Activity,
    tituloPreocupacion: "Tratar piel de naranja o reafirmar zonas difíciles",
    descripcion: "La celulitis suele deberse a retención, mala circulación o debilidad de las fibras conjuntivas. Las soluciones tópicas sencillas no entran en la hipodermis. Se requiere esclerosis mecánica y activación celular profunda.",
    tratamientosRecomendados: ["celulitis", "varices"],
    enfoqueClinico: "Establecer microconductos biológicos con mesoterapia e infiltración de CO2 (carboxiterapia) para devolverle la elasticidad natural a la piel y liberar los septos endurecidos."
  },
  {
    id: "peso",
    label: "Composición corporal y peso",
    icono: Leaf,
    tituloPreocupacion: "Pérdida de grasa y reeducación metabólica",
    descripcion: "Buscamos romper el ciclo de dietas milagro que conllevan pérdida muscular y fatiga. Una reestructuración nutricional guiada por Sergio Icardo es el único enfoque con un índice de éxito sostenible del 95% a largo plazo.",
    tratamientosRecomendados: ["adelgazamiento", "nutricion"],
    enfoqueClinico: "Análisis del equilibrio metabólico e indicación de planes altamente personalizados, complementado con mesoterapia lipolítica para combatir acúmulos grasos rebeldes."
  },
  {
    id: "vascular",
    label: "Pesadez y capilares en las piernas",
    icono: Compass,
    tituloPreocupacion: "Salud del retorno circulatorio o arañas vasculares",
    descripcion: "Las dilataciones venosas producen pesadez y dolor además del impacto estético. La fototermólisis selectiva actúa destruyendo únicamente la hemoglobina dilatada sin dañar los tejidos cutáneos circundantes.",
    tratamientosRecomendados: ["varices"],
    enfoqueClinico: "Oclusión precisa con láser Nd:YAG combinado con microesclerosis química en las ramificaciones más delgadas."
  },
  {
    id: "vello",
    label: "Vello rebelde e irritación",
    icono: Zap,
    tituloPreocupacion: "Eliminación definitiva con luz médica",
    descripcion: "La depilación rutinaria suele irritar la epidermis e inducir foliculitis. La depilación médica con láser de diodo destruye permanentemente las células germinales del folículo de forma higiénica y definitiva.",
    tratamientosRecomendados: ["depilacion-laser"],
    enfoqueClinico: "Diodos de pulso controlado de grado médico con puntas de zafiro refrigeradas constantemente a -5ºC para un confort óptimo."
  }
]

export default function Tratamientos() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos')
  const [preocupacionActiva, setPreocupacionActiva] = useState('envejecimiento')

  // Filtered treatments
  const tratamientosFiltrados = listadoTratamientos.filter(t => {
    if (categoriaActiva === 'todos') return true
    return t.categoria === categoriaActiva
  })

  // Find info for the selected concern
  const infoPreocupacion = listadoPreocupaciones.find(p => p.id === preocupacionActiva) || listadoPreocupaciones[0]

  return (
    <div className="bg-cream min-h-screen text-[#2A2622] selection:bg-[#E9DFC9]">
      <Navbar />

      {/* ─── HERO EDITORIAL SECCIÓN ──────────────────────────── */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden border-b border-[#E5DFD3]">
        <div className="absolute inset-0 bg-radial-gradient from-[#FDFCF9] to-[#FAF6EE] opacity-60 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="text-[#C07B5C] font-mono text-xs tracking-[0.25em] uppercase font-semibold block mb-4">
            · Instituto Médico Dr. Icardo ·
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-[#1C1A18] leading-[1.1] mb-6">
            La transformación que nace de la <span className="italic font-serif font-normal text-[#C07B5C] block md:inline md:ml-1 text-glow">armonía clínica</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-[#554E46] max-w-2xl mx-auto leading-relaxed font-light mb-12">
            Combinamos el rigor de la medicina científica, la precisión tecnológica de última generación y un enfoque de naturalidad extrema para diseñar un plan estético y nutricional que trabaje a favor de tu propia biología.
          </p>

          {/* Selector de categorías elegante */}
          <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto p-1.5 bg-[#FAF6EE]/90 rounded-full border border-[#E5DFD3] backdrop-blur-sm">
            {[
              { id: 'todos', label: 'Todos los tratamientos' },
              { id: 'facial', label: 'Medicina Facial' },
              { id: 'corporal', label: 'Estética Corporal' },
              { id: 'nutricion', label: 'Nutrición & Peso' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  categoriaActiva === cat.id
                    ? 'bg-[#1C1A18] text-white shadow-md shadow-black/5'
                    : 'text-[#554E46] hover:text-[#1C1A18] hover:bg-[#F2EBDC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECCIÓN INTERACTIVA: EXPLORADOR DE PREOCUPACIONES ─────────────────── */}
      <section className="py-24 bg-[#FAF6EE] border-b border-[#E5DFD3]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#C07B5C] font-semibold text-xs tracking-widest uppercase block mb-3">CONSERJERÍA MÉDICA</span>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#1C1A18]">
              ¿Qué aspecto de tu bienestar deseas abordar hoy?
            </h2>
            <p className="text-[#554E46] text-sm mt-3 font-light">
              Selecciona tu principal inquietud para que nuestro sistema médico te sugiera el enfoque biológico óptimo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Lado izquierdo: Lista de preocupaciones */}
            <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
              {listadoPreocupaciones.map(pre => {
                const IconComponent = pre.icono
                const isSelected = preocupacionActiva === pre.id
                return (
                  <button
                    key={pre.id}
                    onClick={() => setPreocupacionActiva(pre.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                      isSelected
                        ? 'bg-white border-[#C07B5C] shadow-lg shadow-[#1C1A18]/5 scale-[1.02] z-10'
                        : 'bg-transparent border-[#E5DFD3] hover:border-[#1C1A18] hover:bg-[#F2EBDC]/50'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg transition-colors duration-300 ${
                      isSelected ? 'bg-[#C07B5C] text-white' : 'bg-[#F2EBDC] text-[#554E46]'
                    }`}>
                      <IconComponent className="w-5 height-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-medium text-sm text-[#1C1A18]">{pre.label}</h4>
                      <p className="text-xs text-[#554E46]/80 mt-0.5 line-clamp-1">{pre.tituloPreocupacion}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Lado derecho: Tarjeta de diagnóstico y solución recomendada */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E5DFD3] rounded-2xl p-6 md:p-8 h-full flex flex-col justify-between shadow-xl shadow-[#1C1A18]/2">
                <div>
                  <span className="text-[#C07B5C] font-mono text-[10px] tracking-[0.2em] uppercase font-bold block mb-4">
                    PROPUESTA DE ABORDAJE CLÍNICO
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#1C1A18] font-light leading-snug mb-4">
                    {infoPreocupacion.tituloPreocupacion}
                  </h3>
                  <p className="text-sm text-[#554E46] leading-relaxed font-light mb-6">
                    {infoPreocupacion.descripcion}
                  </p>

                  <div className="bg-[#FAF6EE] border border-[#E5DFD3] rounded-xl p-5 mb-6">
                    <h5 className="text-[#1C1A18] font-bold text-xs tracking-wider uppercase mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#C07B5C]" />
                      ENFOQUE DE MEDICINA PERSONALIZADA
                    </h5>
                    <p className="text-xs text-[#554E46] leading-relaxed">
                      {infoPreocupacion.enfoqueClinico}
                    </p>
                  </div>
                </div>

                <div>
                  <h6 className="text-[#1C1A18] text-xs font-semibold tracking-wider uppercase mb-3">
                    TRATAMIENTOS RECOMENDADOS:
                  </h6>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {infoPreocupacion.tratamientosRecomendados.map(slug => {
                      const treat = listadoTratamientos.find(t => t.slug === slug)
                      if (!treat) return null
                      return (
                        <Link
                          key={slug}
                          to={`/tratamientos/${slug}`}
                          className="flex-1 group bg-white hover:bg-[#1C1A18] border border-[#E5DFD3] p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:text-white"
                        >
                          <div>
                            <span className="text-[10px] text-[#C07B5C] block uppercase tracking-widest font-mono">
                              Explorar
                            </span>
                            <span className="text-sm font-sans font-medium group-hover:text-white text-[#1C1A18]">
                              {treat.nombre}
                            </span>
                          </div>
                          <div className="p-1.5 rounded-full bg-[#FAF6EE] group-hover:bg-[#C07B5C]/20 border border-[#E5DFD3] group-hover:border-transparent text-[#C07B5C] group-hover:text-white transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LISTADO EXQUISITO DE TRATAMIENTOS ─────────────────────────────────── */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-[#C07B5C] font-mono text-xs tracking-widest uppercase block mb-3">· CATÁLOGO MÉDICO ·</span>
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-[#1C1A18]">
                Procedimientos de <span className="italic font-serif font-normal text-[#C07B5C]">Alta Fidelidad</span>
              </h2>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs text-[#554E46]/80 font-mono tracking-widest uppercase">
                Mostrando {tratamientosFiltrados.length} {tratamientosFiltrados.length === 1 ? 'tratamiento' : 'tratamientos'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {tratamientosFiltrados.map((t, idx) => (
              <div 
                key={t.slug}
                className="group border border-[#E5DFD3] rounded-2xl overflow-hidden bg-[#FAF6EE]/30 flex flex-col justify-between transition-all duration-500 hover:shadow-xl hover:shadow-[#1C1A18]/5 hover:border-[#1C1A18]/30 hover:bg-white"
              >
                {/* Cabecera visual del tratamiento */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#E9DFC9]">
                    <img 
                      src={t.imagen} 
                      alt={t.nombre} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-mono tracking-widest text-[#1C1A18] uppercase border border-[#E5DFD3]">
                        {t.categoria}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="font-serif text-2xl text-[#1C1A18] font-light tracking-tight mb-3">
                      {t.nombre}
                    </h3>
                    <p className="text-xs text-[#554E46] leading-relaxed font-light mb-6">
                      {t.descripcionCorta}
                    </p>

                    {/* Técnicas empleadas como micro-píldoras */}
                    <div className="mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-mono text-[#554E46]/60 block mb-2">
                        TÉCNICAS DE EMBLEMA:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {t.tecnicas.map(tec => (
                          <span key={tec} className="px-2 py-0.5 bg-[#FAF6EE] text-[10px] text-[#554E46] border border-[#E5DFD3] rounded">
                            {tec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pie de la tarjeta con meta-información y enlace */}
                <div className="px-6 pb-6 md:px-8 md:pb-8">
                  {/* Ficha técnica elegante */}
                  <div className="grid grid-cols-2 gap-2 border-t border-b border-[#E5DFD3]/60 py-3 mb-6 font-mono text-[10px] text-[#554E46]/70">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C07B5C]" />
                      <span>{t.duracion}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-right justify-end">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C07B5C]" />
                      <span>{t.recuperacion}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/tratamientos/${t.slug}`}
                    className="w-full py-3 bg-[#1C1A18] text-white text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-[#C07B5C] transition-colors duration-300 shadow-md shadow-[#1C1A18]/5"
                  >
                    Ver detalles clínicos
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NUEVO BLOQUE EXCLUSIVO: COMPROMISO Y METODOLOGÍA CLÍNICA ─────────────── */}
      <section className="py-24 bg-[#E9DFC9]/20 border-t border-[#E5DFD3]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Lado izquierdo: Enfoque editorial */}
            <div className="lg:col-span-5">
              <span className="text-[#C07B5C] font-mono text-xs tracking-widest uppercase block mb-3">· SOBERANÍA BIOLÓGICA ·</span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1C1A18] leading-[1.15] mb-6">
                El valor de un diagnóstico <span className="italic font-normal text-[#C07B5C]">sin falsas promesas</span>
              </h2>
              <p className="text-[#554E46] text-sm md:text-base leading-relaxed font-light mb-8">
                En nuestro instituto, cada tratamiento se entiende como una estimulación celular selectiva. Respetamos tu patrimonio facial y corporal. No creemos en cambios drásticos, sino en el rejuvenecimiento y equilibrio armónico de tus propios tejidos. El Dr. Icardo evalúa personalmente cada caso clínico.
              </p>

              <div className="border-l-2 border-[#C07B5C] pl-6 italic text-[#554E46]/80 text-sm font-serif">
                &ldquo;Buscamos que cuando te mires al espejo sigas reconociendo tu rostro, pero con la vitalidad y luminosidad de tus mejores años.&rdquo;
                <span className="block font-sans font-medium text-xs tracking-widest uppercase text-[#1C1A18] mt-2 not-italic">
                  — Dr. Icardo, Director Médico
                </span>
              </div>
            </div>

            {/* Lado derecho: Grid de metodología (Aesthetic Bento) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { 
                  icono: ShieldCheck, 
                  titulo: "Auditoría Médica Directa", 
                  desc: "Sin comerciales ni intermediarios. Todo tratamiento es recetado por el propio Dr. Icardo tras una consulta exhaustiva." 
                },
                { 
                  icono: Award, 
                  titulo: "Sustancias Oficiales", 
                  desc: "Utilizamos exclusivamente productos premium de laboratorios de referencia internacional con doble certificación CE y FDA." 
                },
                { 
                  icono: Clock, 
                  titulo: "Tiempos de Reposo Mínimos", 
                  desc: "Favorecemos técnicas ambulatorias que te permiten recuperar tu agenda activa social y profesional inmediatamente." 
                },
                { 
                  icono: Compass, 
                  titulo: "Seguimiento Continuo", 
                  desc: "Ninguna sesión finaliza con la infiltración. Agendamos revisiones a las dos semanas para consolidar el resultado perfecto." 
                }
              ].map((item, idx) => {
                const IconComp = item.icono
                return (
                  <div key={idx} className="bg-white border border-[#E5DFD3] rounded-xl p-6 shadow-md shadow-black/[0.01]">
                    <div className="inline-flex p-2 bg-[#FAF6EE] text-[#C07B5C] rounded-lg mb-4">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="font-sans font-semibold text-sm text-[#1C1A18] mb-2">{item.titulo}</h4>
                    <p className="text-xs text-[#554E46] leading-relaxed font-light">{item.desc}</p>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>

      <QuizCTA />
      <Footer />
    </div>
  )
}
