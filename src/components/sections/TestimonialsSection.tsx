// src/sanity/schemaTypes/TestimonialsSection.tsx
import TestimonialCarousel from '@/components/sections/TestimonialCarousel'
import Reveal from '@/components/Reveal'

const testimonialStyle = {
  heading: 'w-full md:max-w-6xl',
}

type Testimonial = {
  _id: string
  heading: string
  content?: string
  image?: any
}

export default function TestimonialsSection({ testimonials, }: { testimonials: Testimonial[] }) {

  const heading = 'Testimonials'

  return (
    <section id='testimonials' className='flex flex-col items-center justify-center p-8 scroll-mt-16 bg-white'>
      <Reveal className={testimonialStyle.heading} delay={0}>
        <h3>{heading}</h3>
      </Reveal>

      <Reveal className='w-full max-w-6xl mx-auto' delay={150}>
        <TestimonialCarousel testimonials={testimonials} />
      </Reveal>
    </section>
  )
}
