import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import VideoPlayer from '@/components/VideoPlayer'

import ContactForm from '@/components/sections/ContactForm'

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
        <a href={href} target='_blank' rel='noreferrer noopener'>
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

      <div className={contactStyle.heading}>
          <h3>{heading}</h3>
      </div>

      <div className={contactStyle.cols}>
        <div className={contactStyle.col1}>
          <ContactForm />
          
        </div>
        <div className={contactStyle.col2}>
         {content ? (
              <div>
                <PortableText value={content} components={ptComponents} />
              </div>
            ) : null}
        </div>
      </div>

      
    </section>
  )
}
