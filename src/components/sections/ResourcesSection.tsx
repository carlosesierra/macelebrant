// src/sanity/schemaTypes/ResourcesSection.tsx

import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Reveal from '@/components/Reveal'
import { portableTextComponents } from '@/components/portableTextComponents'

const resourcesStyle = {
  heading: 'w-full md:max-w-6xl',
  cols: 'w-full md:max-w-6xl grid md:grid-cols-2 gap-6 py-4',
  col1: 'md:order-2 ',
  col2: 'md:order-1 ',
  imgWrapper: 'relative w-full overflow-hidden aspect-square shadow-md border-16 border-white my-4',
  img: 'object-cover',
}

type ResourcesData = {
  heading?: string
  content?: PortableTextBlock[]
  image?: any
}

export default function ResourcesSection({ resources }: { resources: ResourcesData | null }) {

  const heading = resources?.heading || 'Your heading here'
  const content = resources?.content ?? []
  const image = resources?.image

  const renderImage = (image?: any) =>
    image ? (
      <figure className={resourcesStyle.imgWrapper}>
        <Image
          src={urlFor(image).width(900).url()}
          alt={heading}
          fill
          sizes='(min-width: 768px) 50vw, 100vw'
          className={resourcesStyle.img}
        />
      </figure>
    ) : null

  return (
    <section id='resources' className='flex flex-col items-center justify-center p-8 scroll-mt-16 bg-neutral-200'>
      
      <Reveal className={resourcesStyle.heading} delay={0}>
        <h2>{heading}</h2>
      </Reveal>

      <div className={resourcesStyle.cols}>
        <Reveal className={resourcesStyle.col1} delay={150}>
          {renderImage(image)}
        </Reveal>
        <Reveal className={resourcesStyle.col2} delay={300}>
          <PortableText value={content} components={portableTextComponents} />
        </Reveal>
      </div>
      
    </section>
  )
}
