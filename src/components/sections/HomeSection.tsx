// src/sanity/schemaTypes/HomeSection.tsx
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import HomeImageSequence from '@/components/sections/HomeImageSequence'
import HomeArrow from '@/components/sections/HomeArrow'
import { urlFor } from '@/lib/sanity.image'

const homeStyle = {
  cols: 'grid gap-6 w-full lg:max-w-8/10 lg:grid-cols-2 lg:items-center',
  col1: 'lg:order-2 ',
  col2: 'text-right lg:order-1 ',
  img: 'home-sequence-media object-cover aspect-square shadow-lg my-4 border-16 border-white',
}

type HomeData = {
  heading?: string
  subHeading?: string
  content?: string
  image?: any
  images?: any[]
}

export default function HomeSection({ home }: { home: HomeData | null }) {

  const heading = home?.heading || 'Your heading here'
  const subHeading = home?.subHeading || 'Your subheading here'
  const content = home?.content || `Content goes here`
  const imageSequence = home?.images?.length ? home.images : []
  const fallbackImage = imageSequence.length === 1 ? imageSequence[0] : home?.image

  return (
    <section id='home' className='lg:h-screen flex flex-col items-center justify-center p-8 scroll-mt-16 bg-neutral-200 pt-24 lg:pt-8'>

      <div className={homeStyle.cols}>
        <Reveal className={homeStyle.col1} delay={0}>
          {imageSequence.length > 1 ? 
          (
            <HomeImageSequence images={imageSequence} alt={heading} secondsPerImage={5} />
          ) : 
          fallbackImage ? 
          (
            <Image
              src={urlFor(fallbackImage).width(900).url()}
              alt={heading}
              sizes='(min-width: 768px) 50vw, 100vw'
              fill
              className={homeStyle.img}
              priority
            />
          ) : (
            <div></div>
          )}
        </Reveal>

        <Reveal className={homeStyle.col2} delay={150}>
          <h3>{heading}</h3>
          <p>{subHeading}</p>
          <h1>{content}</h1>
        </Reveal>
      </div>
      <Reveal delay={300}>
        <HomeArrow />
      </Reveal>
    </section>
  )
}
