import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import VideoPlayer from '@/components/VideoPlayer'
import Reveal from '@/components/Reveal'

const feesStyle = {
  heading: 'w-full md:max-w-6xl',
  cols: 'w-full md:max-w-6xl grid md:grid-cols-2 gap-6 py-4',
}

type FeesData = {
  _id: string
  heading: string
  leftContent?: PortableTextBlock[]
  rightContent?: PortableTextBlock[]
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

export default function FeesSection({ fees, }: { fees: FeesData | null }) {

  const heading = fees?.heading || 'Fees'
  const leftContent = fees?.leftContent
  const rightContent = fees?.rightContent

  return (
    <section id='fees' className='flex flex-col items-center justify-center p-8 scroll-mt-16 bg-neutral-200'>
      <Reveal className={feesStyle.heading} delay={0}>
        <h2>{heading}</h2>
      </Reveal>

      <div className={feesStyle.cols}>
        <Reveal delay={150}>
          {leftContent && leftContent.length > 0 ? (
            <div>
              <PortableText value={leftContent} components={ptComponents} />
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={300}>
          {rightContent && rightContent.length > 0 ? (
            <div>
              <PortableText value={rightContent} components={ptComponents}/>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}
