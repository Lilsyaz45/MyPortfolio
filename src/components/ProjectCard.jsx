import { useRef, useState } from 'react'
import { TLink } from './Transition'
import Media from './Media'
import { gsap, setBgColors } from '../lib/motion'
import { isTouch } from '../lib/hooks'

/** Grid card with 3D tilt, hover-play video, and background colour shift. */
export default function ProjectCard({ project, index = 0 }) {
  const [hover, setHover] = useState(false)
  const frame = useRef(null)

  const enter = () => {
    setHover(true)
    setBgColors(project.palette[0], project.palette[1])
  }
  const leave = () => {
    setHover(false)
    setBgColors()
    gsap.to(frame.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'elastic.out(1,0.5)' })
  }
  const move = (e) => {
    if (isTouch()) return
    const r = frame.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    gsap.to(frame.current, { rotateY: px * 8, rotateX: -py * 8, duration: 0.6, ease: 'power3.out' })
    frame.current.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
    frame.current.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  }

  return (
    <article className="pcard" data-reveal>
      <TLink
        to={`/work/${project.slug}`}
        label={project.title}
        className="pcard-link"
        data-cursor="view"
        data-cursor-text="View"
        data-cursor-color={project.color}
        onPointerEnter={enter}
        onPointerLeave={leave}
        onPointerMove={move}
      >
        <div className="pcard-frame" ref={frame} style={{ '--ratio': project.ratio, '--pc': project.color }}>
          <Media project={project} active={hover} />
          <div className="pcard-glare" />
          <span className="pcard-index">{String(index + 1).padStart(2, '0')}</span>
          {project.flagship && (
            <span className="pcard-flagship-pill">
              ★ Flagship
            </span>
          )}
          <div className="pcard-tags">
            {project.disciplines.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
        <div className="pcard-info">
          <h3 className="pcard-title">
            <span className="pcard-title-row">{project.title}</span>
            <span className="pcard-title-row pcard-title-row--clone" style={{ color: project.color }}>
              {project.title}
            </span>
          </h3>
          <div className="pcard-meta-line dim">
            <span>{project.client} — {project.year}</span>
            {project.link && (
              <span className="pcard-live-dot" title="Live platform">
                ● Live
              </span>
            )}
          </div>
        </div>
      </TLink>
    </article>
  )
}
