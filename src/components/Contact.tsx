import type { FormEvent } from 'react'
import { contact } from '../content'
import { MailIcon, PhoneIcon, WhatsappIcon, CompassIcon, ClipboardIcon } from './icons'
import { useReveal } from '../hooks/useReveal'
import './Contact.css'

export function Contact() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: conectar con el backend / servicio de envío de formularios
  }
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <section id="contacto" className="contact">
      <div ref={ref} className={`container contact-inner reveal ${visible ? 'is-visible' : ''}`}>
        <div className="contact-info">
          <p className="eyebrow">Contáctanos</p>
          <h2 className="section-heading">{contact.heading}</h2>
          <p className="contact-subtitle">{contact.subtitle}</p>

          <ul className="contact-list">
            <li>
              <span className="contact-icon">
                <MailIcon />
              </span>
              <div>
                <p className="contact-label">Correo electrónico</p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            </li>
            <li>
              <span className="contact-icon">
                <PhoneIcon />
              </span>
              <div>
                <p className="contact-label">Celular</p>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
              </div>
            </li>
            <li>
              <span className="contact-icon">
                <WhatsappIcon />
              </span>
              <div>
                <p className="contact-label">WhatsApp</p>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                  {contact.whatsapp.replace('https://', '')}
                </a>
              </div>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-row">
            <label>
              Nombres
              <input type="text" name="name" placeholder="Tu nombre" required />
            </label>
            <label>
              Correo electrónico
              <input type="email" name="email" placeholder="tu@email.com" required />
            </label>
          </div>
          <label>
            Asunto
            <input type="text" name="subject" placeholder="¿En qué podemos ayudarte?" />
          </label>
          <label>
            Mensaje
            <textarea name="message" rows={5} placeholder="Cuéntanos sobre tu proyecto" required />
          </label>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>

        {/* Panel decorativo original — no es un asset de terceros */}
        <div className="contact-art" aria-hidden="true">
          <div className="contact-art-card contact-art-card-1">
            <CompassIcon />
            <div className="contact-art-lines">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="contact-art-card contact-art-card-2">
            <ClipboardIcon />
            <div className="contact-art-lines">
              <span />
              <span />
            </div>
          </div>
          <span className="contact-art-dot contact-art-dot-1" />
          <span className="contact-art-dot contact-art-dot-2" />
          <span className="contact-art-ring" />
        </div>
      </div>
    </section>
  )
}
