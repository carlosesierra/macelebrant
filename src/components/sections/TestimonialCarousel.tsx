'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

import { urlFor } from '@/lib/sanity.image'

const testimonialCarouselStyle = {
  content: 'mt-3',
  cols: 'grid w-full gap-6 md:grid-cols-2 md:items-center',
  col1: 'relative aspect-square w-full overflow-hidden shadow-md my-4 border-16 border-white',
  col2: 'px-3 pb-5',
}

type Testimonial = {
  _id: string
  heading: string
  content?: string
  image?: any
}

export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const autoplay = useRef(Autoplay({ delay: 10000, stopOnInteraction: false }))
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplay.current]
  )
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className='relative w-full'>

      <div
        ref={emblaRef}
        className='w-full overflow-hidden cursor-grab active:cursor-grabbing'
      >
        <div className='flex w-full'>
          {testimonials.map((testimonial) => {
            const imageUrl = testimonial.image
              ? urlFor(testimonial.image).width(900).url()
              : null
            return (
              <div
                key={testimonial._id}
                className='min-w-0 w-full flex-[0_0_100%] px-3'
              >
                <div className={testimonialCarouselStyle.cols}>

                  <div className={testimonialCarouselStyle.col1}>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={testimonial.heading}
                        fill
                        sizes='(min-width: 768px) 60vw, 100vw'
                        className='object-cover'
                      />
                    ) : null}
                  </div>
                  
                  <div className={testimonialCarouselStyle.col2}>
                    <h3>
                      {testimonial.heading}
                    </h3>
                    <p className={testimonialCarouselStyle.content}>
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button
        type='button'
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className='hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 p-3 text-gray-700 shadow-sm transition hover:bg-white disabled:opacity-40'
        aria-label='Previous testimonial'
      >
        <svg viewBox='0 0 24 24' className='h-4 w-4' aria-hidden='true'>
          <path
            d='M15 18l-6-6 6-6'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <button
        type='button'
        onClick={scrollNext}
        disabled={!canScrollNext}
        className='hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 p-3 text-gray-700 shadow-sm transition hover:bg-white disabled:opacity-40'
        aria-label='Next testimonial'
      >
        <svg viewBox='0 0 24 24' className='h-4 w-4' aria-hidden='true'>
          <path
            d='M9 6l6 6-6 6'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  )
}
