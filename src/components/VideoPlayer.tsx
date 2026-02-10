type VideoPlayerProps = {
  url?: string
  src?: string
  className?: string
}

function getYouTubeId(input: string): string | null {
  if (!input) return null

  // Handle youtu.be/<id>
  const short = input.match(/^https?:\/\/youtu\.be\/([^?&#/]+)/i)
  if (short?.[1]) return short[1]

  try {
    const u = new URL(input)

    // youtube.com/watch?v=<id>
    const v = u.searchParams.get('v')
    if (v) return v

    // youtube.com/embed/<id>
    const parts = u.pathname.split('/').filter(Boolean)
    const embedIdx = parts.indexOf('embed')
    if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1]

    // youtube.com/shorts/<id>
    const shortsIdx = parts.indexOf('shorts')
    if (shortsIdx >= 0 && parts[shortsIdx + 1]) return parts[shortsIdx + 1]

    return null
  } catch {
    return null
  }
}

export default function VideoPlayer({ url, src, className }: VideoPlayerProps) {
  const inputUrl = url || src || ''

  const id = getYouTubeId(inputUrl)
  const isYouTube = Boolean(id)
  // Privacy-enhanced domain; playsinline=1 improves iPhone behavior.
  const embedUrl = id
    ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
    : ''

  if (!inputUrl) {
    if (process.env.NODE_ENV !== 'production') {
      return (
        <div className='my-0 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700'>
          VideoPlayer: missing url/src
        </div>
      )
    }
    return null
  }

  return (
    <div
      className={
        className ||
        'relative aspect-video my-0 overflow-hidden rounded-lg bg-black shadow-xl border-16 border-white'
      }
    >
      {isYouTube ? (
        <iframe
          src={embedUrl}
          title='YouTube video player'
          className='absolute inset-0 h-full w-full'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          referrerPolicy='strict-origin-when-cross-origin'
        />
      ) : (
        // Fallback for direct video URLs (mp4, etc.)
        <video
          className='absolute inset-0 h-full w-full'
          src={inputUrl}
          controls
          playsInline
        />
      )}
    </div>
  )
}
