import { PortableText } from '@portabletext/react'
import VideoPlayer from '@/components/VideoPlayer'

const promoVideoStyle = {
  heading: 'w-full md:max-w-6xl',
  cols: 'w-full md:max-w-6xl grid md:grid-cols-2 gap-6 py-4 md:items-center',
  col1: 'md:order-1 md:text-right ',
  col2: 'md:order-2 ',
}

type PromoVideoData = {
  heading?: string
  content?: any
  video?: any
}

export default function PromoVideoSection({ promoVideo }: { promoVideo: PromoVideoData | null }) {

  const heading = promoVideo?.heading || 'Promo Video'
  const content = promoVideo?.content
  const video = promoVideo?.video

  return (
    <section id='promovideo' className='flex flex-col items-center justify-center p-8 scroll-mt-16 bg-neutral-200'>
      <div className={promoVideoStyle.heading}>
          <h3>{heading}</h3>
      </div>

      <div className={promoVideoStyle.cols}>
        <div className={promoVideoStyle.col1}>
          {content && (
            <div>
              {content && <PortableText value={content}/>}
            </div>
          )}
        </div>

        <div className={promoVideoStyle.col2}>
          {video && <VideoPlayer url={video} />}
        </div>
      </div>
    </section>
  )
}
