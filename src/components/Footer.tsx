import { brand, footer } from '../content'
import { SpecialtyIcon, SocialIcon } from './icons'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-specialties">
        {footer.specialties.map((specialty) => (
          <div key={specialty} className="footer-specialty">
            <SpecialtyIcon name={specialty} />
            <span>{specialty}</span>
          </div>
        ))}
      </div>

      <div className="container footer-main">
        <div className="footer-brand">
          <p className="footer-logo">{brand.name}</p>
          <p>{brand.phone}</p>
          <p>{brand.email}</p>
          <div className="footer-social">
            {footer.social.map((social) => (
              <a key={social.icon} href={social.href} aria-label={social.label} target="_blank" rel="noreferrer">
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>

        {footer.columns.map((column) => (
          <div key={column.heading} className="footer-column">
            <h3>{column.heading}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container footer-bottom">
        <p>{footer.copyright}</p>
      </div>
    </footer>
  )
}
