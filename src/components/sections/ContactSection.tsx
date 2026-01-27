import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import VideoPlayer from '@/components/VideoPlayer'

import ContactForm from '@/components/sections/ContactForm'
import Reveal from '@/components/Reveal'

const contactStyle = {
  heading: 'w-full md:max-w-6xl',
  cols: 'w-full md:max-w-6xl grid md:grid-cols-2 gap-6 py-4',
  col1: 'md:order-2 ',
  col2: 'md:order-1 ',
  imgWrapper: 'relative w-full overflow-hidden aspect-square shadow-md border-16 border-white my-4',
  img: 'object-cover',
}

type contactData = {
  heading?: string
  content?: PortableTextBlock[]
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

export default function contactSection({ contact }: { contact: contactData | null }) {

  const heading = contact?.heading || 'Contact'
  const content = contact?.content ?? []

  return (
    <section id='contact' className='lg:h-screen flex flex-col items-center justify-center p-8 scroll-mt-16 bg-white'>

      <Reveal className={contactStyle.heading} delay={0}>
        <h2>{heading}</h2>
      </Reveal>

      <div className={contactStyle.cols}>
        <Reveal className={contactStyle.col1} delay={150}>
          <ContactForm />
        </Reveal>
        <Reveal className={contactStyle.col2} delay={300}>
          <PortableText value={content} components={ptComponents} />
        </Reveal>
      </div>

      
    </section>
  )
}
