import { useState, useRef } from 'react';

export default function BeforeAfterSlider({ antesImg, despuesImg, title = "Antes y después", subtitle = "Arrastra el control para comparar", aspectRatio = "16/9" }) {
  const sliderRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const dragging = useRef(false);

  function moveSlider(clientX) {
    if (!sliderRef.current) return;
    const r = sliderRef.current.getBoundingClientRect();
    setSliderPos(Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100)));
  }

  return (
    <div className="before-after-slider-container" style={{ marginBottom: '40px' }}>
      {title && (
        <div className="trat-sec-head" style={{ marginBottom: '24px', textAlign: 'center' }}>
          {title && <span className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>· Resultados reales</span>}
          {title && <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>{title}</h3>}
          {subtitle && <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '6px' }}>{subtitle}</p>}
        </div>
      )}
      <div
        className="ba-slider"
        ref={sliderRef}
        style={{ aspectRatio }}
        onPointerDown={e => {
          dragging.current = true;
          sliderRef.current.setPointerCapture(e.pointerId);
          moveSlider(e.clientX);
        }}
        onPointerMove={e => dragging.current && moveSlider(e.clientX)}
        onPointerUp={() => dragging.current = false}
        onPointerCancel={() => dragging.current = false}
      >
         {/* Force browser to bust its cache of previously corrupt/blank assets */}
        <img src={despuesImg ? `${despuesImg}?v=2` : ''} alt="Después" className="ba-img-after" draggable={false} />
        <img
          src={antesImg ? `${antesImg}?v=2` : ''}
          alt="Antes"
          className="ba-img-before"
          style={{ 
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            WebkitClipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
          }}
          draggable={false}
        />
        <div className="ba-handle" style={{ left: `${sliderPos}%` }}>
          <div className="ba-handle-line" />
          <div className="ba-handle-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
            </svg>
          </div>
          <div className="ba-handle-line" />
        </div>
        <span className="ba-tag ba-tag-l">Antes</span>
        <span className="ba-tag ba-tag-r">Después</span>
      </div>
    </div>
  );
}
