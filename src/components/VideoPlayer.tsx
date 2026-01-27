'use client'

import dynamic from 'next/dynamic'
import type { ComponentType, CSSProperties } from 'react'

// Minimal prop typing for react-player (avoids version-specific exported types)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactPlayerProps = {
  url?: any
  width?: string | number
  height?: string | number
  controls?: boolean
  // react-player forwards unknown props to the underlying player; this is useful for iOS
  playsinline?: boolean
  style?: CSSProperties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any
}

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
}) as unknown as ComponentType<ReactPlayerProps>

export default function VideoPlayer({ url }: { url: string }) {
  const origin = typeof window !== 'undefined' ? window.location.origin : undefined

  // react-player typings sometimes model youtube config as the raw playerVars object.
  // We cast here so we can pass the documented shape (youtube.playerVars.origin).
  const youtubeConfig = (origin ? { playerVars: { origin } } : {}) as any

  return (
    <div className='relative aspect-video my-0 overflow-hidden rounded-lg bg-black shadow-xl border-16 border-white'>
      <ReactPlayer
        url={url}                 // ✅ was src
        width='100%'
        height='100%'
        controls
        playsinline               // ✅ helps iPhone Safari
        style={{ position: 'absolute', top: 0, left: 0 }}
        config={{
          youtube: youtubeConfig,
        }}
      />
    </div>
  )
}