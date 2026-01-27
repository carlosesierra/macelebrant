import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

const imageSequenceStyle = {
  // Parent must be positioned for <Image fill /> to render reliably on iOS Safari
  imageSequence: 'home-sequence relative aspect-square w-full overflow-hidden',
  // Make each frame overlap the same box; give it a positioned box for <Image fill />
  imgs: 'home-sequence-item absolute inset-0 shadow-md border-16 border-white',
  img: 'home-sequence-media object-cover'
}

type HomeImageSequenceProps = {
  images: any[]
  alt: string
  secondsPerImage?: number
}

export default function HomeImageSequence({
  images,
  alt,
  secondsPerImage = 5,
}: HomeImageSequenceProps) {
  const count = Math.max(images.length, 1)
  const totalSeconds = count * secondsPerImage
  const fadeSeconds = Math.min(1, secondsPerImage / 3)
  const fadeInEnd = (fadeSeconds / totalSeconds) * 100
  const fadeOutStart = ((secondsPerImage - fadeSeconds) / totalSeconds) * 100
  const fadeOutEnd = ((secondsPerImage + fadeSeconds) / totalSeconds) * 100
  const keyframeName = `home-sequence-fade-${count}-${String(secondsPerImage).replace('.', '_')}`
  const keyframes = `@keyframes ${keyframeName} {
    0% { opacity: 0; }
    ${fadeInEnd}% { opacity: 1; }
    ${fadeOutStart}% { opacity: 1; }
    ${fadeOutEnd}% { opacity: 0; }
    100% { opacity: 0; }
  }`

  return (
    <div className={`${imageSequenceStyle.imageSequence} my-4`}>
      <style>{keyframes}</style>
      {images.map((image, index) => (
        <div
          key={image?._key || index}
          className={imageSequenceStyle.imgs}
          style={{
            animationName: keyframeName,
            animationDuration: `${totalSeconds}s`,
            animationDelay: `${index * secondsPerImage}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
          }}
        >
          <Image
            alt={alt}
            src={urlFor(image).width(1200).url()}
            fill
            priority={index === 0}
            sizes='(min-width: 768px) 50vw, 100vw'
            className={imageSequenceStyle.img}
            loading='eager'
          />
        </div>
      ))}
    </div>
  )
}
