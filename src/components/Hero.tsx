import { useEffect, useState } from 'react'
import { heroSlides } from '../content'
import { ChevronIcon } from './icons'
import './Hero.css'

export function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const goTo = (i: number) => setIndex((i + heroSlides.length) % heroSlides.length)

  return (
    <section id="inicio" className="hero">
      <div className="hero-slides">
        {heroSlides.map((slide, i) => (
          <div key={slide.title} className={`hero-slide ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index}>
            {/* Fondo placeholder: reemplaza por la foto real del proyecto/slide */}
            <div className="hero-slide-bg" />
            <span className="hero-slide-tag">Imagen de fondo (placeholder)</span>
            <div className="container hero-slide-inner">
              <p className="eyebrow">{slide.eyebrow}</p>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <a href={slide.cta.href} className="btn btn-white">
                {slide.cta.label}
              </a>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="hero-arrow hero-arrow-prev" aria-label="Anterior" onClick={() => goTo(index - 1)}>
        <ChevronIcon className="hero-arrow-icon hero-arrow-icon-prev" />
      </button>
      <button type="button" className="hero-arrow hero-arrow-next" aria-label="Siguiente" onClick={() => goTo(index + 1)}>
        <ChevronIcon className="hero-arrow-icon" />
      </button>

      <div className="hero-dots">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            className={`hero-dot ${i === index ? 'is-active' : ''}`}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  )
}
