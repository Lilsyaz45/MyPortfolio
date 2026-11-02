import { useRef, useState } from 'react'
import { profile, socials } from '../data/site'
import { Split, Roll } from '../components/Text'
import Magnetic from '../components/Magnetic'
import { gsap } from '../lib/motion'
import { useEnter } from '../lib/hooks'

const BUDGETS = ['< $1k', '$1k – $3k', '$3k – $8k', '$8k +']
const TYPES = ['Website', 'Web app', 'Frontend', 'Backend / API', 'UX/UI Design', 'Hiring / Full-time']

export default function Contact() {
  const root = useRef(null)
  const [copied, setCopied] = useState(false)
  const [types, setTypes] = useState([])
  const [budget, setBudget] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEnter(root, () => {
    gsap
      .timeline()
      .from('.contact-title .split-char', { yPercent: 115, rotate: 10, stagger: 0.04, duration: 1.3, ease: 'expo.out' })
      .from('.contact-reveal', { opacity: 0, y: 30, stagger: 0.07, duration: 0.9, ease: 'power3.out' }, 0.4)
  })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      /* ignore */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const toggleType = (t) => setTypes((arr) => (arr.includes(t) ? arr.filter((x) => x !== t) : [...arr, t]))

  const submit = (e) => {
    e.preventDefault()
    const body = [
      `Hi ${profile.nickname || profile.firstName},`,
      '',
      form.message,
      '',
      `Project type: ${types.join(', ') || '—'}`,
      `Budget: ${budget || '—'}`,
      '',
      `${form.name} (${form.email})`,
    ].join('\n')
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      `New project from ${form.name || 'website'}`
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="page page-contact" ref={root}>
      <section className="contact-hero container">
        <h1 className="contact-title display fs-mega">
          <Split text="Let's" />
          <br />
          <span className="serif accent">
            <Split text="talk" />
          </span>
        </h1>

        <div className="contact-email-row contact-reveal">
          <a href={`mailto:${profile.email}`} className="contact-email display fs-lg">
            <Roll text={profile.email} />
          </a>
          <Magnetic>
            <button id="copy-email" className="pill-btn" onClick={copy} data-cursor="hide">
              <span data-magnetic-inner>{copied ? 'Copied ✓' : 'Copy email'}</span>
            </button>
          </Magnetic>
        </div>
      </section>

      <section className="contact-body container section">
        <form className="contact-form" onSubmit={submit}>
          <fieldset className="contact-reveal">
            <legend className="eyebrow">I'm interested in</legend>
            <div className="chips">
              {TYPES.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`chip ${types.includes(t) ? 'is-on' : ''}`}
                  onClick={() => toggleType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="contact-reveal">
            <legend className="eyebrow">Budget</legend>
            <div className="chips">
              {BUDGETS.map((b) => (
                <button
                  type="button"
                  key={b}
                  className={`chip ${budget === b ? 'is-on' : ''}`}
                  onClick={() => setBudget(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="field-row contact-reveal">
            <label className="field">
              <input
                id="contact-name"
                required
                placeholder=" "
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <span>Your name</span>
            </label>
            <label className="field">
              <input
                id="contact-email"
                type="email"
                required
                placeholder=" "
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <span>Email</span>
            </label>
          </div>
          <label className="field contact-reveal">
            <textarea
              id="contact-message"
              rows="4"
              required
              placeholder=" "
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <span>Tell me about your project</span>
          </label>

          <div className="contact-reveal">
            <Magnetic>
              <button id="contact-submit" type="submit" className="submit-btn" data-cursor="hide">
                <span data-magnetic-inner>Send it ↗</span>
              </button>
            </Magnetic>
          </div>
        </form>

        <aside className="contact-aside contact-reveal">
          <div>
            <span className="eyebrow">Based in</span>
            <p className="fs-md">{profile.location}</p>
          </div>
          {profile.phone && (
            <div>
              <span className="eyebrow">Phone</span>
              <p className="fs-md">{profile.phone}</p>
            </div>
          )}
          <div>
            <span className="eyebrow">Elsewhere</span>
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="contact-social fs-md">
                <Roll text={s.label} /> <span>↗</span>
              </a>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}
