'use client'
import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'

type ReactPlayerProps = ComponentProps<typeof import('react-player').default>

const ReactPlayer = dynamic<ReactPlayerProps>(
  () => import('react-player'),
  { ssr: false }
)

export default function VideoPlayer({ url }: { url: string }) {
  return (
    <div className='relative aspect-video my-0 shadow-xl rounded-lg overflow-hidden bg-black border-16 border-white '>
      <ReactPlayer
        src={url}
        width='100%'
        height='100%'
        controls={true}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  )
}
