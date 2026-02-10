// src/sanity/schemaTypes/AboutSection.tsx

import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Reveal from '@/components/Reveal'
import { portableTextComponents } from '@/components/portableTextComponents'

const aboutStyle = {
  heading: 'w-full lg:max-w-6xl',
  cols: 'w-full lg:max-w-6xl grid lg:grid-cols-2 gap-6 py-4',
  imgWrapper: 'relative w-full overflow-hidden aspect-4/3 shadow-md border-16 border-white my-4',
  img: 'object-cover aspect-4/3',
}

type AboutData = {
  heading?: string
  content?: PortableTextBlock[]
  image01?: any
  image02?: any
}

export default function AboutSection({ about }: { about: AboutData | null }) {

  const heading = about?.heading || 'Your heading here'
  const content = about?.content ?? []
  const image01 = about?.image01
  const image02 = about?.image02

  const renderImage = (image?: any) =>
    image ? (
      <figure className={aboutStyle.imgWrapper}>
        <Image
          src={urlFor(image).width(900).url()}
          alt={heading}
          fill
          sizes='(min-width: 768px) 50vw, 100vw'
          className={aboutStyle.img}
        />
      </figure>
    ) : null

  return (
    <section id='aboutme' className='flex flex-col items-center justify-center p-8 scroll-mt-16 bg-white'>
      
      <Reveal className={aboutStyle.heading} delay={0}>
        <h2>{heading}</h2>
      </Reveal>

      <div className={aboutStyle.cols}>
        <Reveal delay={150}>
          {renderImage(image01)}
          {renderImage(image02)}
        </Reveal>
        <Reveal delay={300}>
          <PortableText value={content} components={portableTextComponents} />
        </Reveal>
      </div>
      
    </section>
  )
}
