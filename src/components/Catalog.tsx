import { useState, type CSSProperties } from 'react'
import { catalogCategories, catalogItems } from '../content'
import { useReveal } from '../hooks/useReveal'
import { EyeIcon } from './icons'
import './Catalog.css'

const formatClass: Record<string, string> = {
  'En vivo': 'is-live',
  Presencial: 'is-onsite',
  Remoto: 'is-remote',
}

function CatalogCard({ item, delay }: { item: (typeof catalogItems)[number]; delay: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <article
      ref={ref}
      className={`catalog-card reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="catalog-thumb"
        style={item.image ? ({ '--thumb-image': `url(${item.image})` } as CSSProperties) : undefined}
      >
        {/* Placeholder visible solo mientras no exista el archivo en public/images/catalog/ */}
        <span className="catalog-thumb-tag">Imagen de proyecto</span>
        {/* <span className={`catalog-badge ${item.status === 'Disponible' ? 'is-available' : 'is-progress'}`}>
          {item.status}
        </span> */}
        <span className={`catalog-format ${formatClass[item.format] ?? ''}`}>
          <span className="catalog-format-dot" />
          {item.format}
        </span>
        <div className="catalog-overlay">
          <button type="button" className="btn btn-white btn-sm">
            Ver detalles
          </button>
        </div>
      </div>
      <div className="catalog-body">
        <p className="catalog-category">{item.category}</p>
        <h3>{item.title}</h3>
        <div className="catalog-author">
          <span className="catalog-avatar" />
          {item.author}
        </div>
        <div className="catalog-price">
          {item.priceOld && <span className="catalog-price-old">{item.priceOld}</span>}
          <span className={`catalog-price-current ${item.priceOld ? 'has-discount' : ''}`}>{item.price}</span>
        </div>
        <div className="catalog-actions">
          {/* Placeholder: enlaza a la página de detalle real del servicio */}
          <button type="button" className="catalog-icon-btn" aria-label="Ver detalles">
            <EyeIcon />
          </button>
          <a href="#contacto" className="btn btn-primary btn-sm catalog-cta">
            Solicitar cotización
          </a>
        </div>
      </div>
    </article>
  )
}

export function Catalog() {
  const [active, setActive] = useState('Todos')

  const items =
    active === 'Todos' ? catalogItems : catalogItems.filter((item) => item.category === active)

  return (
    <section id="servicios" className="catalog">
      <div className="container">
        <h2 className="catalog-heading">
          ¿Qué necesita tu <span>próximo proyecto</span>?
        </h2>
        <p className="section-intro">
          Reemplaza esta cuadrícula con tus servicios, proyectos o productos reales.
        </p>

        <div className="catalog-filters">
          {catalogCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`catalog-filter ${active === category ? 'is-active' : ''}`}
              onClick={() => setActive(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="catalog-grid">
          {items.map((item, i) => (
            <CatalogCard key={item.title} item={item} delay={(i % 3) * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
