import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = document.querySelectorAll('[data-reveal]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
