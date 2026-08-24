import { brand } from '../content'
import { WhatsappIcon } from './icons'
import './FloatingWhatsapp.css'

export function FloatingWhatsapp() {
  return (
    <a
      href={brand.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp"
      aria-label="Escríbenos por WhatsApp"
    >
      <span className="floating-whatsapp-ring" />
      <WhatsappIcon />
    </a>
  )
}
