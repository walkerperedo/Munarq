import { useState } from 'react'
import { about, brand } from '../content'
import { useReveal } from '../hooks/useReveal'
import { CheckIcon, ChevronDownIcon, PlayIcon } from './icons'
import './About.css'

export function About() {
  const [open, setOpen] = useState(0)
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <section id="nosotros" className="about">
      <div ref={ref} className={`about-inner reveal ${visible ? 'is-visible' : ''}`}>
        <div className="about-media">
          {/* Placeholder: reemplaza por un video o foto real del estudio/equipo */}
          <span className="about-media-tag">Video institucional (placeholder)</span>
          <button type="button" className="about-play" aria-label="Reproducir video">
            <PlayIcon />
          </button>
        </div>

        <div className="about-content">
          <p className="about-brand">{brand.name}</p>
          <p className="about-tagline">{about.tagline}</p>

          <div className="about-accordion">
            {about.tabs.map((tab, i) => {
              const isOpen = open === i
              return (
                <div key={tab.label} className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="accordion-header"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(i)}
                  >
                    <CheckIcon className="accordion-check" />
                    <span>{tab.label}</span>
                    <ChevronDownIcon className="accordion-chevron" />
                  </button>
                  <div className="accordion-body-wrap">
                    <div className="accordion-body">
                      <ul>
                        {tab.body.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
