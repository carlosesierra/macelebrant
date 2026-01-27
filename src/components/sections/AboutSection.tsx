// src/sanity/schemaTypes/AboutSection.tsx

import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import VideoPlayer from '@/components/VideoPlayer'
import Reveal from '@/components/Reveal'

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

const ptComponents = {
  types: {
    image: ({ value }: any) => (
      <figure className='my-6'>
        <Image
          src={urlFor(value).width(900).url()}
          alt={value?.alt || ''}
          width={900}
          height={900}
          className='w-full h-auto'
        />
        {value?.caption ? (
          <figcaption className='mt-2 text-sm text-gray-500'>
            {value.caption}
          </figcaption>
        ) : null}
      </figure>
    ),
    youtube: ({ value }: any) => {
      const { url } = value
      if (!url) return null
      return <VideoPlayer url={url} />
    },
  },
  marks: {
    link: ({ value, children }: any) => {
      const href = value?.href || '#'
      return (
        <a
          href={href}
          target='_blank'
          rel='noreferrer noopener'
          className='underline-offset-4 hover:underline'
        >
          {children}
        </a>
      )
    },
  },
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
          <PortableText value={content} components={ptComponents} />
        </Reveal>
      </div>
      
    </section>
  )
}
