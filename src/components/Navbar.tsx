import { useState } from 'react'
import { brand, nav } from '../content'
import { MenuIcon, CloseIcon } from './icons'
import './Navbar.css'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#inicio" className="navbar-logo">
          {brand.name}
        </a>

        <nav className={`navbar-links ${open ? 'is-open' : ''}`}>
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href={nav.cta.href} className="btn btn-primary btn-sm navbar-cta-mobile" onClick={() => setOpen(false)}>
            {nav.cta.label}
          </a>
        </nav>

        <a href={nav.cta.href} className="btn btn-primary btn-sm navbar-cta-desktop">
          {nav.cta.label}
        </a>

        <button
          type="button"
          className="navbar-toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  )
}
