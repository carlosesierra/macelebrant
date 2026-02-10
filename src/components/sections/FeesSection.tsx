import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Reveal from '@/components/Reveal'
import { portableTextComponents } from '@/components/portableTextComponents'

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
              <PortableText value={leftContent} components={portableTextComponents} />
            </div>
          ) : null}
        </Reveal>

        <Reveal delay={300}>
          {rightContent && rightContent.length > 0 ? (
            <div>
              <PortableText value={rightContent} components={portableTextComponents} />
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}
