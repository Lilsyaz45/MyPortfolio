/** Text whose letters roll upward on hover (pure CSS, staggered). */
export function Roll({ text, className = '' }) {
  const chars = [...text]
  return (
    <span className={`roll ${className}`} aria-label={text}>
      <span className="roll-row" aria-hidden="true">
        {chars.map((c, i) => (
          <span key={i} className="roll-char" style={{ '--i': i }}>
            {c === ' ' ? '\u00A0' : c}
          </span>
        ))}
      </span>
      <span className="roll-row roll-row--clone" aria-hidden="true">
        {chars.map((c, i) => (
          <span key={i} className="roll-char" style={{ '--i': i }}>
            {c === ' ' ? '\u00A0' : c}
          </span>
        ))}
      </span>
    </span>
  )
}

/**
 * Splits text into masked words/chars for GSAP.
 * Targets: `.split-char` (chars) or `.split-word-inner` (words).
 */
export function Split({ text, by = 'chars', className = '', as: Tag = 'span', ...rest }) {
  const words = text.split(' ')
  return (
    <Tag className={className} aria-label={text} {...rest}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true">
          <span className="split-mask">
            {by === 'chars' ? (
              <span className="split-word">
                {[...w].map((c, ci) => (
                  <span key={ci} className="split-char">
                    {c}
                  </span>
                ))}
              </span>
            ) : (
              <span className="split-word split-word-inner">{w}</span>
            )}
          </span>
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
