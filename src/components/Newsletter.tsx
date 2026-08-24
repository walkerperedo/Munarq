import type { FormEvent } from 'react'
import { newsletter } from '../content'
import { MailIcon } from './icons'
import './Newsletter.css'

export function Newsletter() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: conectar con el proveedor de email marketing
  }

  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <div className="newsletter-heading">
          <span className="newsletter-icon">
            <MailIcon />
          </span>
          <div>
            <h2>{newsletter.heading}</h2>
            <p>{newsletter.subtitle}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input type="text" placeholder="Nombres" required />
          <input type="email" placeholder="Ingresa tu correo" required />
          <button type="submit" className="btn btn-primary">
            Suscríbete
          </button>
        </form>
      </div>
    </section>
  )
}
