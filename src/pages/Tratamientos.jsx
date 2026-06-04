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
  Award,
  TrendingUp,
  Droplet,
  UserCheck,
  Eye,
  Star
} from 'lucide-react'

// Array matching treatments in treatments.js
const listadoTratamientos = [
  {
    slug: "rejuvenecimiento-facial",
    categoria: "facial",
    nombre: "Rejuvenecimiento Facial",
    descripcionCorta: "Recupera la luminosidad, textura y firmeza cutánea estimulando de forma natural el colágeno autólogo.",
    duracion: "45–90 min",
    recuperacion: "1–7 días de rojez ligera",
    resultados: "Desde la 1ª sesión",
    imagen: "/assets/rejuvenecimiento.webp",
    tecnicas: ["Láser CO2 Fraccionado", "Sculptra", "Mesoterapia facial profunda", "Peelings químicos"]
  },
  {
    slug: "arrugas",
    categoria: "facial",
    nombre: "Tratamiento de Arrugas",
    descripcionCorta: "Atenúa arrugas de expresión y restaura los volúmenes perdidos preservando la expresividad e identidad tridimensional de tu rostro.",
    duracion: "30–60 min",
    recuperacion: "Inmediata",
    resultados: "Efecto visible en 3–7 días",
    imagen: "/assets/arrugas.webp",
    tecnicas: ["Toxina botulínica de precisión", "Ácido hialurónico biocompatible", "Radiesse estimulador", "Sculptra"]
  },
  {
    slug: "celulitis",
    categoria: "corporal",
    nombre: "Tratamiento de Celulitis",
    descripcionCorta: "Protocolo médico específico de liberación tisular profunda, rompiendo los septos endurecidos para lucir una piel lisa y tersa.",
    duracion: "45–60 min",
    recuperacion: "Inmediata, sin reposo",
    resultados: "Sostenibles tras 4–6 sesiones",
    imagen: "/assets/celulitis.webp",
    tecnicas: ["Mesoterapia corporal", "Carboxiterapia médica", "Radiofrecuencia multipolar", "Láser lipolítico"]
  },
  {
    slug: "varices",
    categoria: "corporal",
    nombre: "Tratamiento de Varices",
    descripcionCorta: "Eliminación selectiva de microcapilares venosos y arañas vasculares a través de termólisis láser focalizada.",
    duracion: "45–60 min",
    recuperacion: "Inmediata, uso de compresión",
    resultados: "Visible en 4–8 semanas",
    imagen: "/assets/varices.webp",
    tecnicas: ["Láser vascular de alta potencia", "Esclerosis química selectiva", "Microesclerosis médica"]
  },
  {
    slug: "depilacion-laser",
    categoria: "corporal",
    nombre: "Tratamiento de Depilación Láser",
    descripcionCorta: "Eliminación permanente del folículo piloso mediante haz de diodo de grado médico, con enfriamiento continuo a -5°C.",
    duracion: "35–90 min",
    recuperacion: "Inmediata, hidratación",
    resultados: "80-90% de reducción permanente",
    imagen: "/assets/depilacionlaser.webp",
    tecnicas: ["Láser diodo médico premium", "Sistema de enfriamiento de zafiro integrado"]
  },
  {
    slug: "adelgazamiento",
    categoria: "nutricion",
    nombre: "Adelgazamiento",
    descripcionCorta: "Programa médico integral de reducción adiposa por Sergio Icardo, con soporte metabólico específico para evitar el efecto de rebote.",
    duracion: "Ciclo 1 a 3 meses",
    recuperacion: "Vida normal completa",
    resultados: "Cambio de hábitos y peso sostenible",
    imagen: "/assets/adelgazamiento.webp",
    tecnicas: ["Diseño de nutrición metabólica", "Infiltración de mesoterapia lipolítica", "Análisis segmental bioeléctrico"]
  },
  {
    slug: "nutricion",
    categoria: "nutricion",
    nombre: "Nutrición y Dietética",
    descripcionCorta: "Planes alimenticios a la medida basados en tu perfil biológico y estilo de vida, prescritos por Sergio Icardo Belmonte.",
    duracion: "Consulta inicial 60 min",
    recuperacion: "No requiere",
    resultados: "Visibles desde la 1ª semana",
    imagen: "/assets/nutricion.webp",
    tecnicas: ["Educación metabólica integral", "Planes funcionales de absorción nutricional", "Planes clínicos adaptados"]
  }
]

// Concierge suggestions for interactive widget
const listadoPreocupaciones = [
  {
    id: "envejecimiento",
    label: "Óvalo y firmeza facial",
    icono: Sparkles,
    tituloPreocupacion: "Arquitectura Facial e Hidratación Profunda",
    descripcion: "La pérdida de vectores de soporte facial desdibuja el arco mandibular y forma líneas de expresión. En Clínicas Dr. Icardo corregimos la fatiga cutánea restaurando las almohadillas grasas fisiológicas del rostro, sin aportar volúmenes artificiales que alteren tus rasgos naturales.",
    tratamientosRecomendados: ["rejuvenecimiento-facial", "arrugas"],
    enfoqueClinico: "Tratamientos combinados de estimuladores de colágeno autólogo (Sculptra) y ácido hialurónico que nutren la dermis, restituyendo la frescura y la tensión originales con total naturalidad."
  },
  {
    id: "flacidez-celulitis",
    label: "Textura y volumen corporal",
    icono: Activity,
    tituloPreocupacion: "Remodelación de la Silueta y Disminución de Piel de Naranja",
    descripcion: "Los septos fibrosos retienen líquidos y lípidos en zonas difíciles como glúteos o piernas. Para tratar la celulitis de raíz no basta la cosmética superficial; es necesaria la infiltración médica subcutánea que rompa esta tensión del tejido conjuntivo.",
    tratamientosRecomendados: ["celulitis", "varices"],
    enfoqueClinico: "Sinergia tisular profunda mediante carboxiterapia médica para oxigenar los capilares, junto con mesoterapia lipolítica que disuelve los acúmulos grasos intratables con el deporte."
  },
  {
    id: "peso",
    label: "Rendimiento y composición de peso",
    icono: Leaf,
    tituloPreocupacion: "Análisis Clínico y Reajuste de Hábitos Metabólicos",
    descripcion: "Las restricciones calóricas extremas dañan la tasa metabólica y provocan pérdidas severas de masa magra. El método del máster nutricional Sergio Icardo combina pautas de asimilación progresiva con una reeducación proteica para un cambio de composición definitivo.",
    tratamientosRecomendados: ["adelgazamiento", "nutricion"],
    enfoqueClinico: "Análisis corporal segmentado para discriminar el tejido graso visceral del agua biológica, prescribiendo dietas funcionales de alta saciedad y mesoterapia metabólica de soporte."
  },
  {
    id: "vascular",
    label: "Microcapilares y pesadez en piernas",
    icono: Compass,
    tituloPreocupacion: "Esclerosis Estética y Circulación Vascular",
    descripcion: "La mala circulación de retorno provoca la dilatación de las finas venas superficiales en forma de araña. Su eliminación estética requiere precisión térmica para colapsar únicamente los capilares dilatados sin calentar la piel circundante.",
    tratamientosRecomendados: ["varices"],
    enfoqueClinico: "Fotocoagulación con Láser Nd:YAG combinada con microinyecciones químicas esclerosantes en las venas nutricias principales, garantizando una reabsorción transparente."
  }
]

// ─── FIX 1: border-orange-150 no existe en Tailwind → corregido a border-orange-100
// ─── FIX 2: todas estas clases viven en un objeto externo al JSX, por lo que Tailwind v4
//     no las detecta en el escaneo. Solución: añadir @source "inline(...)" en index.css
//     con todas las clases de este objeto. Ver archivo tratamientos-patch.css adjunto.
const configEstilosPreocupaciones = {
  envejecimiento: {
    accentColor: "teal",
    bgNormal: "bg-teal-50/15 hover:bg-teal-50/30 border-teal-100/40",
    bgActive: "bg-teal-50/80 border-teal-500 shadow-xl shadow-teal-900/5 ring-2 ring-teal-500/10",
    iconBg: "bg-teal-100 text-teal-700",
    textTitle: "text-teal-950 font-bold",
    textDesc: "text-teal-900/70",
    linkText: "text-teal-700",
  },
  "flacidez-celulitis": {
    accentColor: "sky",
    bgNormal: "bg-sky-50/15 hover:bg-sky-50/30 border-sky-100/40",
    bgActive: "bg-sky-50/80 border-sky-400 shadow-xl shadow-sky-900/5 ring-2 ring-sky-400/10",
    iconBg: "bg-sky-100 text-sky-700",
    textTitle: "text-sky-950 font-bold",
    textDesc: "text-sky-900/70",
    linkText: "text-sky-600",
  },
  peso: {
    accentColor: "orange",
    // FIX 1 aplicado: border-orange-150 → border-orange-100
    bgNormal: "bg-orange-50/15 hover:bg-orange-50/30 border-orange-100/40",
    bgActive: "bg-orange-50/70 border-orange-400 shadow-xl shadow-orange-900/5 ring-2 ring-orange-400/10",
    iconBg: "bg-orange-100 text-orange-700",
    textTitle: "text-orange-950 font-bold",
    textDesc: "text-orange-900/70",
    linkText: "text-orange-600",
  },
  vascular: {
    accentColor: "purple",
    bgNormal: "bg-purple-50/15 hover:bg-purple-50/30 border-purple-100/40",
    bgActive: "bg-purple-50/80 border-purple-400 shadow-xl shadow-purple-900/5 ring-2 ring-purple-400/10",
    iconBg: "bg-purple-100 text-purple-700",
    textTitle: "text-purple-950 font-bold",
    textDesc: "text-purple-900/70",
    linkText: "text-purple-600",
  }
}

export default function Tratamientos() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos')
  const [preocupacionActiva, setPreocupacionActiva] = useState('envejecimiento')
  const [sliderIndex, setSliderIndex] = useState(0)
  const [copiedNote, setCopiedNote] = useState(false)

  // Scroll smooth anchor
  const scrollToAnchor = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Find info for the selected concern
  const infoPreocupacion = listadoPreocupaciones.find(p => p.id === preocupacionActiva) || listadoPreocupaciones[0]

  // Filter treatments
  const tratamientosFacial = listadoTratamientos.filter(t => t.categoria === "facial")
  const tratamientosCorporal = listadoTratamientos.filter(t => t.categoria === "corporal")
  const tratamientosNutricion = listadoTratamientos.filter(t => t.categoria === "nutricion")

  const copyContact = () => {
    navigator.clipboard.writeText("+34 966 30 88 11")
    setCopiedNote(true)
    setTimeout(() => setCopiedNote(false), 2000)
  }

  return (
    <div className="bg-cream min-h-screen text-[#1C1A18] selection:bg-[#E9DFC9] selection:text-[#C07B5C] font-sans antialiased">
      <Navbar />

      {/* ─── LUXURY HERO COVER ────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-[#E5DFD3] bg-[#FAF6EE]">
        {/* Decorative thin wire-frame lines */}
        <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-[#E5DFD3]/30 hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-[10%] w-[1px] bg-[#E5DFD3]/30 hidden lg:block" />
        
        {/* Radial Luxury Background Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-[#FAF6EE] via-[#FAF6EE] to-[#F2EBDC]/80 opacity-90 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="text-[#C07B5C] font-mono text-[11px] tracking-[0.3em] uppercase font-bold block mb-4">
              ✨ Propuesta de Excelencia Clínica
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-extralight tracking-tight text-[#1C1A18] leading-[1.08] mb-8">
              Tratamientos médicos de <br />
              <span className="italic font-serif font-normal text-[#C07B5C] text-glow relative inline-block">
                Alta Fidelidad Estética
              </span>
            </h1>
            <p className="font-sans text-base md:text-lg text-[#554E46] max-w-2xl mx-auto leading-relaxed font-light mb-12">
              Un catálogo selecto donde la ciencia médica se funde con la proporciones áureas. El rigor de la medicina rigurosa y el diseño personalizado del Dr. Icardo y su equipo de especialistas.
            </p>

            {/* Anchors section: Jump smoothly to each category intro */}
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-16">
              {[
                { tag: 'facial', label: '1. Medicina Facial', target: 'intro-facial', icon: Sparkles },
                { tag: 'corporal', label: '2. Alta Estética Corporal', target: 'intro-corporal', icon: Activity },
                { tag: 'nutricion', label: '3. Ciencia de la Nutrición', target: 'intro-nutricion', icon: Leaf }
              ].map((pill, idx) => {
                const IconComponent = pill.icon
                return (
                  <button
                    key={idx}
                    onClick={() => scrollToAnchor(pill.target)}
                    className="group px-6 py-4 bg-white/90 hover:bg-[#1C1A18] border border-[#E5DFD3] rounded-xl flex items-center gap-3 transition-all duration-300 shadow-sm shadow-[#1C1A18]/2 text-left hover:text-white"
                  >
                    <div className="p-1.5 rounded-lg bg-[#FAF6EE] text-[#C07B5C] group-hover:bg-[#C07B5C] group-hover:text-white transition-all">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#554E46]/60 group-hover:text-[#FAF6EE]/50 block font-mono">COLUMNA CLÍNICA</span>
                      <span className="text-xs font-semibold tracking-wide uppercase">{pill.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>
            
          </div>
        </div>
      </section>

      {/* ─── SECCIÓN INTERACTIVA: CONSERJERÍA DE BIENESTAR ─────────────────── */}
      <section className="py-24 bg-white border-b border-[#E5DFD3] relative">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C07B5C] font-mono text-[10px] tracking-[0.3em] uppercase block mb-3 font-semibold">ASESORÍA SINTOMÁTICA INTERACTIVA</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1C1A18] leading-tight mb-6">
              ¿Qué aspecto estético de tu bienestar deseas priorizar?
            </h2>
            <div className="bg-[#FAF6EE]/60 border border-[#E5DFD3]/50 rounded-2xl p-5 md:px-8 inline-block shadow-xs">
              <p className="text-[#554E46] text-sm md:text-base font-light leading-relaxed">
                Resalta tu inquietud principal. Nuestro consultor clínico te mostrará la ruta médica óptima y la filosofía que respalda este abordaje biológico.
              </p>
            </div>
          </div>

          {/* 4 Pillars Interactive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {listadoPreocupaciones.map(pre => {
              const IconComponent = pre.icono
              const isSelected = preocupacionActiva === pre.id
              const estilo = configEstilosPreocupaciones[pre.id] || configEstilosPreocupaciones.envejecimiento
              
              return (
                <button
                  key={pre.id}
                  onClick={() => setPreocupacionActiva(pre.id)}
                  className={`group text-left p-6 md:p-8 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                    isSelected ? estilo.bgActive : estilo.bgNormal
                  } hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1C1A18]/5 active:scale-95`}
                >
                  <div className="w-full">
                    {/* Icon section */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${estilo.iconBg} ${
                      isSelected ? 'scale-110 rotate-3' : 'group-hover:rotate-6'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    
                    {/* Title */}
                    <h3 className={`font-sans font-semibold text-base tracking-tight mb-2 ${estilo.textTitle}`}>
                      {pre.label}
                    </h3>
                    
                    {/* Brief description under title */}
                    <p className={`text-xs leading-relaxed font-light mb-4 line-clamp-2 ${estilo.textDesc}`}>
                      {pre.tituloPreocupacion}
                    </p>
                  </div>

                  {/* Ver detalles button */}
                  <div className={`text-xs font-semibold uppercase tracking-wider font-mono mt-4 flex items-center gap-1.5 ${estilo.linkText}`}>
                    <span>{isSelected ? "Seleccionado" : "Ver detalles"}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5' : 'group-hover:translate-x-1'}`} />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Redesigned Details Container Below cards */}
          <div className="bg-[#FAF6EE]/40 border border-[#E5DFD3] rounded-3xl p-6 md:p-10 shadow-xl shadow-black/[0.01] mt-8 relative overflow-hidden">
            {/* Dynamic visual indicator border on top */}
            <div className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-500" style={{ backgroundColor: 
              preocupacionActiva === "envejecimiento" ? "#0d9488" : 
              preocupacionActiva === "flacidez-celulitis" ? "#0284c7" : 
              preocupacionActiva === "peso" ? "#ea580c" : "#7c3aed"
            }} />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              {/* Left Column: Descriptions */}
              <div className="lg:col-span-6 flex flex-col justify-between pr-0 lg:pr-6">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: 
                      preocupacionActiva === "envejecimiento" ? "#0d9488" : 
                      preocupacionActiva === "flacidez-celulitis" ? "#0284c7" : 
                      preocupacionActiva === "peso" ? "#ea580c" : "#7c3aed"
                    }} />
                    <span className="text-[#C07B5C] font-mono text-[10px] tracking-[0.25em] uppercase font-bold">
                      Protocolo Clínico Dr. Icardo
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-4xl text-[#1C1A18] font-light leading-snug mb-4">
                    {infoPreocupacion.tituloPreocupacion}
                  </h3>
                  
                  <p className="text-sm md:text-base text-[#554E46] leading-relaxed font-light mb-6">
                    {infoPreocupacion.descripcion}
                  </p>
                </div>
              </div>

              {/* Right Column: Base de la metodología & TRATAMIENTOS INDICADOS */}
              <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
                {/* Method block */}
                <div className="bg-white border border-[#E5DFD3]/85 rounded-2xl p-6 relative shadow-xs">
                  <div className="absolute top-4 right-4 text-[#C07B5C]/15 font-serif text-6xl font-bold font-mono pointer-events-none select-none">
                    A++
                  </div>
                  <h5 className="text-[#1C1A18] font-bold text-xs tracking-wider uppercase mb-3 flex items-center gap-2 relative font-mono">
                    <ShieldCheck className="w-4 h-4 text-[#C07B5C]" />
                    BASE DE LA METODOLOGÍA
                  </h5>
                  <p className="text-xs text-[#554E46] leading-relaxed font-light relative z-10">
                    {infoPreocupacion.enfoqueClinico}
                  </p>
                </div>

                {/* Indicated Treatments block */}
                <div>
                  <h6 className="text-[#1C1A18] text-xs font-semibold tracking-wider uppercase mb-3 font-mono text-[#554E46]/80 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#C07B5C] rounded-full inline-block" />
                    TRATAMIENTOS DE REFERENCIA INDICADOS:
                  </h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {infoPreocupacion.tratamientosRecomendados.map(slug => {
                      const treat = listadoTratamientos.find(t => t.slug === slug)
                      if (!treat) return null
                      return (
                        <Link
                          key={slug}
                          to={`/tratamientos/${slug}`}
                          className="group bg-white hover:bg-[#1C1A18] border border-[#E5DFD3] p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:text-white hover:shadow-md hover:shadow-[#1C1A18]/5"
                        >
                          <div className="max-w-[85%]">
                            <span className="text-[9px] text-[#C07B5C] block uppercase tracking-widest font-mono group-hover:text-[#FAF6EE]/70 font-semibold">
                              Procedimiento
                            </span>
                            <span className="text-sm font-sans font-medium group-hover:text-white text-[#1C1A18] transition-colors mt-0.5 block truncate">
                              {treat.nombre}
                            </span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[#FAF6EE] group-hover:bg-[#C07B5C] border border-[#E5DFD3]/60 group-hover:border-transparent flex items-center justify-center text-[#C07B5C] group-hover:text-white transition-all">
                            <ArrowRight className="w-3.5 h-3.5 group-hover:scale-110" />
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

      {/* ─── SECCIÓN 1 INTRO CORTE: MEDICINA ESTÉTICA FACIAL ─────────────────────── */}
      <section id="intro-facial" className="py-24 bg-white relative overflow-hidden scroll-mt-24">
        {/* Subtle decorative geometric rectangle */}
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#FDFCF9]/80 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          {/* Luxurious Editorial Banner Block */}
          <div className="border border-[#E5DFD3] bg-[#FAF6EE]/50 rounded-3xl p-6 md:p-12 mb-16 relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 border border-[#E9DFC9]/40 rounded-full pointer-events-none" />
            <div className="absolute top-8 right-8 text-[11px] font-mono tracking-[0.3em] text-[#C07B5C]/80 font-bold hidden md:block">
              PILLAR I · MEDICINA ESTÉTICA
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="px-3 py-1 bg-white border border-[#E9DFC9] rounded-full text-[10px] font-mono tracking-widest uppercase text-[#C07B5C] font-semibold mb-6 inline-block">
                  Dr. Antonio Icardo
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1C1A18] leading-tight mb-4">
                  Medicina Facial: <br />
                  <span className="italic font-serif font-normal text-[#C07B5C]">La arquitectura natural del rostro</span>
                </h2>
                <p className="text-sm md:text-base text-[#554E46] leading-relaxed font-light mb-8 max-w-xl">
                  Enfocamos el rejuvenecimiento del rostro desde la tridimensionalidad fisiológica. La clave no reside en rellenar arrugas de forma aislada, sino en proyectar de nuevo los vectores de sujeción perdidos, restituyendo la firmeza de la dermis y aportando luminosidad con sutileza.
                </p>
                
                {/* Founding quote excerpt */}
                <div className="border-l-2 border-[#C07B5C] pl-4 italic text-[#554E46]/80 text-sm font-serif">
                  "El mayor logro de nuestro trabajo es que el resultado pase inadvertido, regalándote simplemente un rostro descansado y fresco."
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/5 bg-[#E9DFC9] border-4 border-white">
                  <img 
                    src="/assets/medicinafacial.webp" 
                    alt="Medicina Facial de Precisión" 
                    className="w-full h-full object-cover grayscale-[15%] transition-all duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Visual badge floating */}
                <div className="absolute -bottom-4 -left-4 bg-white border border-[#E5DFD3] px-4 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-[#1C1A18]/5">
                  <span className="p-1.5 rounded-lg bg-[#FAF6EE] text-[#C07B5C] block">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider block font-mono text-[#554E46]/60">Sello Clínico</span>
                    <span className="text-xs font-semibold text-[#1C1A18]">Artesanía & No-Quirúrgica</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* List of Treatments for Facial Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {tratamientosFacial.map((t) => (
              <div 
                key={t.slug}
                className="group border border-[#E5DFD3] hover:border-[#1C1A18]/30 rounded-3xl overflow-hidden bg-[#FAF6EE]/10 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#1C1A18]/5 flex flex-col justify-between"
              >
                <div>
                  {/* Image banner */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#E9DFC9]">
                    <img 
                      src={t.imagen} 
                      alt={t.nombre} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/20 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase text-[#C07B5C] border border-[#E5DFD3]">
                      ★ TRATAMIENTO EMBLEMA
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="font-serif text-2xl text-[#1C1A18] font-light tracking-tight group-hover:text-[#C07B5C] transition-colors mb-3">
                      {t.nombre}
                    </h3>
                    <p className="text-xs md:text-sm text-[#554E46] leading-relaxed font-light mb-6">
                      {t.descripcionCorta}
                    </p>

                    {/* Technics pills */}
                    <div className="mb-6">
                      <span className="text-[10px] text-[#554E46]/70 uppercase tracking-widest font-mono font-bold block mb-2">
                        TECNOLOGÍAS EMPLEADAS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {t.tecnicas.map(tec => (
                          <span key={tec} className="px-2.5 py-1 bg-[#FAF6EE] text-[10px] font-sans font-medium text-[#554E46] border border-[#E5DFD3]/80 rounded">
                            {tec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer specs details card */}
                <div className="px-6 pb-6 md:px-8 md:pb-8">
                  <div className="grid grid-cols-3 gap-2 border-t border-b border-[#E5DFD3]/60 py-4 mb-6 font-mono text-[10px] text-[#554E46]/70 text-center">
                    <div>
                      <span className="text-[9px] text-[#C07B5C] block mb-0.5">DURACIÓN</span>
                      <span className="font-semibold text-[#1C1A18]">{t.duracion}</span>
                    </div>
                    <div className="border-l border-r border-[#E5DFD3]/60">
                      <span className="text-[9px] text-[#C07B5C] block mb-0.5 font-sans">RECUPERACIÓN</span>
                      <span className="font-semibold text-[#1C1A18] block truncate px-1">{t.recuperacion}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#C07B5C] block mb-0.5">RESULTADO</span>
                      <span className="font-semibold text-[#1C1A18] block truncate px-1">{t.resultados}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/tratamientos/${t.slug}`}
                    className="w-full py-3.5 bg-[#A73E3E] text-white hover:bg-[#8B3333] text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-[#A73E3E]/10"
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

      {/* ─── SECCIÓN 2 INTRO CORTE: ALTA TECNOLOGÍA CORPORAL ─────────────────── */}
      <section id="intro-corporal" className="py-24 bg-[#E9DFC9]/10 border-t border-b border-[#E5DFD3] relative scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          {/* Editorial Banner Section: Corporal */}
          <div className="border border-[#E5DFD3] bg-[#FAF6EE] rounded-3xl p-6 md:p-12 mb-16 relative overflow-hidden shadow-sm">
            <div className="absolute -left-16 -top-16 w-64 h-64 border border-[#E5DFD3]/40 rounded-full pointer-events-none" />
            <div className="absolute top-8 right-8 text-[11px] font-mono tracking-[0.3em] text-[#C07B5C]/80 font-bold hidden md:block">
              PILLAR II · ALTA REFINADA CORPORAL
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1 relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/5 bg-[#E9DFC9] border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80" 
                    alt="Estética Corporal Médica" 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Floating metrics badge */}
                <div className="absolute -top-4 -right-4 bg-white border border-[#E5DFD3] px-4 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-[#1C1A18]/5">
                  <span className="p-1.5 rounded-lg bg-[#FAF6EE] text-[#C07B5C] block">
                    <Activity className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider block font-mono text-[#554E46]/60">Eficacia</span>
                    <span className="text-xs font-semibold text-[#1C1A18]">Revascularización 94%</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <span className="px-3 py-1 bg-white border border-[#E9DFC9] rounded-full text-[10px] font-mono tracking-widest uppercase text-[#C07B5C] font-semibold mb-6 inline-block">
                  Soberanía Corporal
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1C1A18] leading-tight mb-4">
                  Remodelación Corporal: <br />
                  <span className="italic font-serif font-normal text-[#C07B5C]">Liberación tisular y drenaje profundo</span>
                </h2>
                <p className="text-sm md:text-base text-[#554E46] leading-relaxed font-light mb-8 max-w-xl">
                  Combatimos la retención hidrolipídica y la piel de naranja actuando directamente sobre las microestructuras conjuntivas de la hipodermis. Nuestros procedimientos aceleran localmente la lipólisis celular y recuperan la circulación de retorno, devolviendo una silueta tersa y descongestionada sin tiempos de inactividad.
                </p>
                <div className="border-l-2 border-[#C07B5C] pl-4 italic text-[#554E46]/80 text-sm font-serif">
                  "Utilizamos tecnología electromédica certificada internacionalmente en paralelo con formulación inyectable de máxima pureza."
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Tratamientos de la categoría Corporal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {tratamientosCorporal.map((t) => (
              <div 
                key={t.slug}
                className="group border border-[#E5DFD3] hover:border-[#1C1A18]/30 rounded-3xl overflow-hidden bg-white hover:shadow-2xl hover:shadow-[#1C1A18]/5 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#E9DFC9]">
                    <img 
                      src={t.imagen} 
                      alt={t.nombre} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="p-6 md:p-8">
                    <span className="text-[10px] font-mono tracking-widest text-[#C07B5C] uppercase font-bold block mb-1">
                      Medicina Corporal No Invasiva
                    </span>
                    <h3 className="font-serif text-2xl text-[#1C1A18] font-light tracking-tight group-hover:text-[#C07B5C] transition-colors mb-3">
                      {t.nombre}
                    </h3>
                    <p className="text-xs text-[#554E46] leading-relaxed font-light mb-6">
                      {t.descripcionCorta}
                    </p>

                    <div className="mb-6">
                      <span className="text-[9px] text-[#554E46]/70 uppercase tracking-widest font-mono font-bold block mb-2">
                        TÉCNICAS PRINCIPALES:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {t.tecnicas.map(tec => (
                          <span key={tec} className="px-2 py-0.5 bg-[#FAF6EE] text-[9.5px] text-[#554E46] border border-[#E5DFD3]/80 rounded">
                            {tec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 md:px-8 md:pb-8">
                  <div className="grid grid-cols-2 gap-2 border-t border-[#E5DFD3]/60 pt-4 mb-6 font-mono text-[10px] text-[#554E46]/70">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C07B5C]" />
                      <span>{t.duracion}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end text-right">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C07B5C]" />
                      <span>{t.recuperacion}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/tratamientos/${t.slug}`}
                    className="w-full py-3.5 bg-[#A73E3E] text-white hover:bg-[#8B3333] text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-[#A73E3E]/10"
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

      {/* ─── SECCIÓN 3 INTRO CORTE: CIENCIA DE LA NUTRICIÓN ─────────────────── */}
      <section id="intro-nutricion" className="py-24 bg-white relative scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          
          {/* Editorial Banner Section: Nutrición */}
          <div className="border border-[#E5DFD3] bg-[#FAF6EE]/50 rounded-3xl p-6 md:p-12 mb-16 relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 border border-[#E9DFC9]/40 rounded-full pointer-events-none" />
            <div className="absolute top-8 right-8 text-[11px] font-mono tracking-[0.3em] text-[#C07B5C]/80 font-bold hidden md:block">
              PILLAR III · REEDUCACIÓN METABÓLICA
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="px-3 py-1 bg-white border border-[#E9DFC9] rounded-full text-[10px] font-mono tracking-widest uppercase text-[#C07B5C] font-semibold mb-6 inline-block">
                  Sergio Icardo · Nutrición Clínica
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1C1A18] leading-tight mb-4">
                  Nutrición Científica: <br />
                  <span className="italic font-serif font-normal text-[#C07B5C]">El único cambio sostenible a largo plazo</span>
                </h2>
                <p className="text-sm md:text-base text-[#554E46] leading-relaxed font-light mb-8 max-w-xl">
                  Rechazamos las dietas de choque restrictivas que destruyen el colágeno estructural y reducen drásticamente la tasa metabólica del organismo. Sergio Icardo Belmonte, especialista en nutrición clínica avanzada y dietética, diseña planes nutricionales metabolitamente equilibrados para reeducar de forma definitiva tus hábitos, ganando salud real y energía celular duradera.
                </p>
                <div className="border-l-2 border-[#C07B5C] pl-4 italic text-[#554E46]/80 text-sm font-serif">
                  "El adelgazamiento saludable no es solo comer menos, sino proveer a las mitocondrias de la nutrición correcta para promover un balance hormonal y muscular íntegro."
                </div>
              </div>

              <div className="lg:col-span-5 relative font-sans">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/5 bg-[#E9DFC9] border-4 border-white">
                  <img 
                    src="/assets/nutricion.webp" 
                    alt="Nutrición y Dietética Avanzada" 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Visual badge floating */}
                <div className="absolute -bottom-4 -right-4 bg-white border border-[#E5DFD3] px-4 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-[#1C1A18]/5">
                  <span className="p-1.5 rounded-lg bg-[#FAF6EE] text-[#C07B5C] block">
                    <Leaf className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider block font-mono text-[#554E46]/60">Éxito Clínico</span>
                    <span className="text-xs font-semibold text-[#1C1A18]">Reeducación 100% Sostenible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Tratamientos de la categoría Nutrición */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {tratamientosNutricion.map((t) => (
              <div 
                key={t.slug}
                className="group border border-[#E5DFD3] hover:border-[#1C1A18]/30 rounded-3xl overflow-hidden bg-[#FAF6EE]/10 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-[#1C1A18]/5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#E9DFC9]">
                    <img 
                      src={t.imagen} 
                      alt={t.nombre} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="p-6 md:p-8">
                    <span className="text-[10px] font-mono tracking-widest text-[#C07B5C] uppercase font-bold block mb-1">
                      Nutrición & Composición Corporal
                    </span>
                    <h3 className="font-serif text-2xl text-[#1C1A18] font-light tracking-tight group-hover:text-[#C07B5C] transition-colors mb-3">
                      {t.nombre}
                    </h3>
                    <p className="text-xs md:text-sm text-[#554E46] leading-relaxed font-light mb-6">
                      {t.descripcionCorta}
                    </p>

                    <div className="mb-6">
                      <span className="text-[9px] text-[#554E46]/70 uppercase tracking-widest font-mono font-bold block mb-2">
                        TÉCNICAS INTEGRADAS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {t.tecnicas.map(tec => (
                          <span key={tec} className="px-2.5 py-1 bg-[#FAF6EE] text-[10px] font-sans font-medium text-[#554E46] border border-[#E5DFD3]/80 rounded">
                            {tec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 md:px-8 md:pb-8">
                  <div className="grid grid-cols-2 gap-2 border-t border-[#E5DFD3]/60 pt-4 mb-6 font-mono text-[10px] text-[#554E46]/70">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C07B5C]" />
                      <span>{t.duracion}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end text-right">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C07B5C]" />
                      <span>{t.recuperacion}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/tratamientos/${t.slug}`}
                    className="w-full py-3.5 bg-[#A73E3E] text-white hover:bg-[#8B3333] text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-[#A73E3E]/10"
                  >
                    Ver pauta nutricional
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── FILOSOFÍA ESTÉTICA + MÁXIMAS CLÍNICAS ─────────────────────────── */}
      <section className="py-24 bg-[#E9DFC9]/15 border-t border-b border-[#E5DFD3] relative">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-center">
            
            <div className="lg:col-span-12 xl:col-span-5 lg:pl-4 xl:pl-0">
              <span className="text-[#C07B5C] font-mono text-xs tracking-widest uppercase block mb-3 font-semibold">
                · FILOSOFÍA ESTÉTICA NO TRAUMÁTICA ·
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1C1A18] leading-[1.12]">
                La sutileza de un rostro <br />
                <span className="italic font-serif font-normal text-[#C07B5C]">completamente natural</span>
              </h2>
              <p className="text-[#554E46] text-sm md:text-base leading-relaxed font-light mt-6 mb-8">
                Huyemos de los resultados sobre-proyectados y de los rostros estáticos. El valor de nuestro sello clínico se fundamenta en un análisis fisionómico dinámico tridimensional: restauramos los volúmenes celulares en las zonas de anclaje de forma que, tras la consulta, conserves la verdad de tu mirada y la espontaneidad de tus gestos.
              </p>

              {/* Founder Signature card */}
              <div className="p-6 bg-white border border-[#E5DFD3] rounded-2xl flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#E9DFC9]">
                  <img 
                    src="/assets/antonio.webp" 
                    alt="Doctor Icardo" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-[#1C1A18]">Dr. Antonio Icardo</h4>
                  <p className="text-xs text-[#554E46] font-light">Director de Clínicas Icardo, pionero en medicina estética preventiva desde 1992.</p>
                </div>
              </div>
            </div>

            {/* Máximas Clínicas */}
            <div className="lg:col-span-12 xl:col-span-7 bg-white border border-[#E5DFD3] rounded-3xl p-6 md:p-8 shadow-xl shadow-[#1C1A18]/2">
              <div className="flex items-center justify-between border-b border-[#E5DFD3]/80 pb-6 mb-6">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl text-[#1C1A18] font-light">Nuestras Máximas Clínicas</h3>
                  <p className="text-xs text-[#554E46]/80 mt-1 font-light">Compromisos irrenunciables con nuestros pacientes.</p>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C1A18]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C07B5C]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD3]" />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  {
                    num: "01",
                    titulo: "Análisis Fisionómico Preventivo",
                    desc: "Dedicamos al menos una hora en la consulta inicial a proyectar tus ángulos óseos faciales y contornos mediante palpación muscular profunda antes de receptar cualquier tratamiento."
                  },
                  {
                    num: "02",
                    titulo: "Materiales e Insumos Premium",
                    desc: "La asimilación biológica depende de la pureza de los complejos. Empleamos exclusivamente productos de laboratorios suizos, suecuos y franceses líderes mundiales."
                  },
                  {
                    num: "03",
                    titulo: "Conserjería y Seguimiento Post-Tratamiento",
                    desc: "Nuestros protocolos incluyen de manera obligatoria una cita de revisión y consolidación a las dos semanas para evaluar la microreacción cutánea."
                  }
                ].map((std, index) => (
                  <div key={index} className="group flex gap-4 items-start p-4 hover:bg-[#FAF6EE]/50 rounded-2xl transition-all duration-300">
                    <span className="font-mono font-bold text-lg text-[#C07B5C] bg-[#FAF6EE] group-hover:bg-white border border-[#E5DFD3] px-3 py-1.5 rounded-xl transition-all">
                      {std.num}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h4 className="font-sans font-semibold text-sm text-[#1C1A18]">{std.titulo}</h4>
                      </div>
                      <p className="text-xs text-[#554E46] leading-relaxed font-light mt-1">{std.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call support */}
              <div className="mt-8 pt-6 border-t border-[#E5DFD3]/80 flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#554E46]/60 block">¿PREGUNTAS ADICIONALES?</span>
                </div>
                <button 
                  onClick={copyContact}
                  className="px-4 py-2.5 bg-[#A73E3E] text-[#ffffff] hover:bg-[#8B3333] transition-colors rounded-lg text-xs font-semibold tracking-wider uppercase font-mono shadow-md shadow-[#A73E3E]/10"
                >
                  {copiedNote ? "¡Copiado!" : "Llamar +34 966 30 88 11"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── COMPROMISO DE ATENCIÓN EXQUISITA ─────────────────────────────────── */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-10 h-10 text-[#C07B5C] mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1C1A18] mb-6">
            Nuestra Filosofía Médica: <br />
            <span className="italic font-serif font-normal text-[#C07B5C]">La excelencia en el arte del cuidado humano</span>
          </h2>
          <p className="text-[#554E46] text-sm md:text-base leading-relaxed font-light mb-8 max-w-2xl mx-auto">
            No concebimos la medicina estética como una serie de micro-procedimientos inconexos o modas efímeras. Buscamos promover la longevidad de las estructuras tisulares. Queremos que tu experiencia en Clínicas Icardo represente un remanso de sofisticación y rigor científico, desde tu primera valoración diagnóstica hasta los controles anuales de consolidación.
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 max-w-xl mx-auto border-t border-[#E5DFD3]/80 pt-4 font-mono text-[10px] text-[#554E46]/80 uppercase tracking-wider mb-10">
            <span className="px-2">✓ Sin Comerciales ni Presión de Venta</span>
            <span className="text-[#E9DFC9]">•</span>
            <span className="px-2">✓ Atención del Propio Especialista de Principio a Fin</span>
            <span className="text-[#E9DFC9]">•</span>
            <span className="px-2">✓ Diagnóstico 100% Personalizado</span>
          </div>

          <Link 
            to="/contacto"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#A73E3E] text-white hover:bg-[#8B3333] text-sm font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-[#A73E3E]/20 hover:-translate-y-1 group"
          >
            Saber más y Pedir Cita
            <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <QuizCTA />
      <Footer />
    </div>
  )
}

