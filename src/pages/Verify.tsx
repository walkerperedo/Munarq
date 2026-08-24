import { useEffect, useState, type FormEvent } from 'react'
import { brand } from '../content'
import { findCertificate, displaySignature, type Certificate } from '../certificates'
import { ShieldIcon, SealIcon, CalendarIcon, XCircleIcon, SearchIcon } from '../components/icons'
import './Verify.css'

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

type Result =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'valid'; cert: Certificate }
  | { status: 'invalid' }
  | { status: 'error'; message: string }

function getInitialCode() {
  return new URLSearchParams(window.location.search).get('code') ?? ''
}

export function Verify() {
  const [code, setCode] = useState(getInitialCode)
  const [result, setResult] = useState<Result>({ status: 'idle' })

  const runVerification = async (value: string) => {
    const url = new URL(window.location.href)
    if (value) url.searchParams.set('code', value)
    else url.searchParams.delete('code')
    window.history.replaceState({}, '', url)

    if (!value) {
      setResult({ status: 'idle' })
      return
    }

    setResult({ status: 'loading' })
    try {
      const cert = await findCertificate(value)
      setResult(cert ? { status: 'valid', cert } : { status: 'invalid' })
    } catch {
      setResult({ status: 'error', message: 'No pudimos consultar el certificado. Intenta de nuevo.' })
    }
  }

  useEffect(() => {
    const initial = getInitialCode()
    if (initial) runVerification(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    runVerification(code)
  }

  return (
    <div className="verify-page">
      <header className="verify-header">
        <a href="/" className="verify-logo">
          {brand.name}
        </a>
      </header>

      <main className="verify-main">
        <div className="verify-stack">
          <div className="verify-card">
            <div className="verify-intro">
              <ShieldIcon className="verify-shield" />
              <h1>Verificación de certificados</h1>
              <p>Ingresa el código que aparece en tu certificado para confirmar su autenticidad.</p>
            </div>

            <form className="verify-form" onSubmit={handleSubmit}>
              <label htmlFor="verify-code">Código del certificado</label>
              <div className="verify-input-row">
                <input
                  id="verify-code"
                  type="text"
                  placeholder="Ej. MNQ-2026-000123"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" disabled={result.status === 'loading'}>
                  <SearchIcon />
                  {result.status === 'loading' ? 'Verificando…' : 'Verificar'}
                </button>
              </div>
            </form>

            <p className="verify-note">
              Por seguridad, verifica siempre que estás en <strong>{window.location.host}</strong> antes
              de confiar en el resultado mostrado.
            </p>
          </div>

          {result.status === 'valid' && (
            <div className="verify-result-card is-valid">
              <div className="verify-seal">
                <span className="verify-seal-icon">
                  <SealIcon />
                </span>
                <div className="verify-seal-text">
                  <p className="verify-seal-title">Sello electrónico de autenticidad</p>
                  <p className="verify-seal-subtitle">
                    Documento original verificado y firmado digitalmente en los sistemas de {brand.name}.
                  </p>
                  <div className="verify-seal-meta">
                    <span className="verify-seal-signature">
                      Firma: {displaySignature(result.cert.code)}
                    </span>
                    <span className="verify-seal-status">Estado: Aprobado</span>
                  </div>
                </div>
              </div>

              <div className="verify-holder-row">
                <div>
                  <p className="verify-holder-label">Titular del certificado</p>
                  <h2 className="verify-holder-name">{result.cert.holderName}</h2>
                </div>
                <div className="verify-status-badge">
                  <span>Estado</span>
                  <strong>Aprobado</strong>
                </div>
              </div>

              <div className="verify-detail-grid">
                <div className="verify-detail-card">
                  <p className="verify-detail-label">Certificado</p>
                  <p className="verify-detail-value">{result.cert.courseName}</p>
                </div>
                <div className="verify-detail-card">
                  <p className="verify-detail-label">Código certificado</p>
                  <p className="verify-detail-value verify-code-value">{result.cert.code}</p>
                </div>
              </div>

              <div className="verify-date-row">
                <CalendarIcon />
                <div>
                  <p className="verify-detail-label">Fecha de emisión</p>
                  <p className="verify-detail-value">{formatDate(result.cert.issueDate)}</p>
                </div>
              </div>

              {result.cert.pdfUrl && (
                <a
                  href={result.cert.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline verify-pdf-link"
                >
                  Ver certificado en PDF
                </a>
              )}
            </div>
          )}

          {result.status === 'invalid' && (
            <div className="verify-result-card is-invalid">
              <div className="verify-result-badge">
                <XCircleIcon />
                No encontramos ese código
              </div>
              <p>Revisa que esté escrito tal cual aparece en el certificado e inténtalo de nuevo.</p>
            </div>
          )}

          {result.status === 'error' && (
            <div className="verify-result-card is-invalid">
              <div className="verify-result-badge">
                <XCircleIcon />
                Algo salió mal
              </div>
              <p>{result.message}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
