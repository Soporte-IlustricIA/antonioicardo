import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top immediately on route change
    window.scrollTo(0, 0)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Setup an IntersectionObserver
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    )

    // Function to find and observe unrevealed elements
    const scanAndObserve = () => {
      const els = document.querySelectorAll('[data-reveal]:not(.revealed)')
      els.forEach(el => obs.observe(el))
    }

    // Run scans
    scanAndObserve()

    // Setup a MutationObserver to watch for React rendering elements asynchronously or after page transitions
    const mutObs = new MutationObserver(() => {
      scanAndObserve()
    })

    mutObs.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Additional safety triggers
    const timer1 = setTimeout(scanAndObserve, 100)
    const timer2 = setTimeout(scanAndObserve, 400)
    const timer3 = setTimeout(scanAndObserve, 800)

    return () => {
      obs.disconnect()
      mutObs.disconnect()
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [pathname])

  return null
}
