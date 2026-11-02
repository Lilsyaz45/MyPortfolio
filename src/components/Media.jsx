import { useEffect, useRef } from 'react'

/** Animated generative artwork used when a project has no cover yet. */
export function ArtCover({ variant = 'orb', palette = ['#c6ff3d', '#7b5cff', '#0f0f12'] }) {
  const [c1, c2, c3] = palette
  return (
    <div className={`art art--${variant}`} style={{ '--c1': c1, '--c2': c2, '--c3': c3 }} aria-hidden="true">
      <div className="art-layer art-a" />
      <div className="art-layer art-b" />
      <div className="art-layer art-c" />
      <div className="art-shine" />
    </div>
  )
}

/**
 * Renders a project's media: image cover, hover-play video, or generative art.
 * `active` = hovered → plays the video.
 */
export default function Media({ project, active = false, autoPlay = false, className = '', eager = false }) {
  const video = useRef(null)
  const { cover, video: src, art, palette, title } = project

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (active || autoPlay) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [active, autoPlay])

  return (
    <div className={`media ${className} ${active ? 'is-active' : ''}`}>
      {cover ? (
        <img src={cover} alt={title} loading={eager ? 'eager' : 'lazy'} className="media-img" />
      ) : (
        <ArtCover variant={art} palette={palette} />
      )}
      {src && (
        <video
          ref={video}
          className={`media-video ${active || autoPlay ? 'is-on' : ''}`}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay={autoPlay}
        />
      )}
    </div>
  )
}
