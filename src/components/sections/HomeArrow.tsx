'use client'

import { useEffect, useState } from 'react';


export default function HomeArrow() {
  const [arrowOpacity, setArrowOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const fadeStart = 0;    // px
      const fadeEnd = 40;    // px – adjust how quickly it fades

      const progress = (y - fadeStart) / (fadeEnd - fadeStart);
      const clamped = Math.max(0, Math.min(1, 1 - progress)); // 1 → 0

      setArrowOpacity(clamped);
    };

    handleScroll(); // run once on mount
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <div
        className='pointer-events-none absolute inset-x-0 bottom-6 flex justify-center transition-opacity duration-300'
        style={{ opacity: arrowOpacity }}
      >
        <svg
          className='h-7 w-7 animate-bounce text-neutral-500'
          viewBox='0 0 24 24'
          fill='none'
          aria-hidden='true'
        >
          <path
            d='M6 9l6 6 6-6'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>

      </div>
  )
}
