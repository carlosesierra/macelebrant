'use client'

import { useEffect, useRef } from 'react'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  rootMargin?: string
  threshold?: number
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  rootMargin = '0px 0px 0px 0px',
  threshold = 0.01,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            el.classList.add('is-visible')
          })
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
