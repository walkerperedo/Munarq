import { benefits } from '../content'
import { BenefitIcon, type BenefitIconName } from './icons'
import { useReveal } from '../hooks/useReveal'
import './Benefits.css'

function BenefitCard({ benefit, delay }: { benefit: (typeof benefits)[number]; delay: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`benefit-card reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="benefit-icon">
        <BenefitIcon name={benefit.icon as BenefitIconName} />
      </div>
      <h3>{benefit.title}</h3>
      <p>{benefit.description}</p>
    </div>
  )
}

export function Benefits() {
  return (
    <section className="benefits">
      <div className="container benefits-grid">
        {benefits.map((benefit, i) => (
          <BenefitCard key={benefit.title} benefit={benefit} delay={i * 100} />
        ))}
      </div>
    </section>
  )
}
