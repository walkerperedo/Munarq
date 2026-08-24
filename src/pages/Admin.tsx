import { useEffect, useRef, useState, type FormEvent } from 'react'
import { brand } from '../content'
import { getSupabase } from '../lib/supabase'
import {
  createCertificate,
  deleteCertificate,
  listCertificates,
  type Certificate,
} from '../certificates'
import { TrashIcon } from '../components/icons'
import './Admin.css'

const emptyForm = { code: '', holderName: '', courseName: '', issueDate: '' }

export function Admin() {
  const [checkingSession, setCheckingSession] = useState(true)

  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loadingList, setLoadingList] = useState(true)
  const [listError, setListError] = useState<string | null>(null)

  const [form, setForm] = useState(emptyForm)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    try {
      getSupabase()
        .auth.getSession()
        .then(({ data }) => {
          if (!data.session) {
            window.location.href = '/admin/login'
            return
          }
          setCheckingSession(false)
        })
    } catch {
      window.location.href = '/admin/login'
    }
  }, [])

  const loadCertificates = async () => {
    setLoadingList(true)
    setListError(null)
    try {
      setCertificates(await listCertificates())
    } catch {
      setListError('No pudimos cargar los certificados.')
    } finally {
      setLoadingList(false)
    }
  }

  useEffect(() => {
    if (!checkingSession) loadCertificates()
  }, [checkingSession])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError(null)

    try {
      await createCertificate({ ...form, pdfFile })
      setForm(emptyForm)
      setPdfFile(null)
      if (pdfInputRef.current) pdfInputRef.current.value = ''
      await loadCertificates()
    } catch (err) {
      const message = err instanceof Error ? err.message : ''
      setFormError(
        message.includes('duplicate')
          ? 'Ya existe un certificado con ese código.'
          : 'No pudimos guardar el certificado. Intenta de nuevo.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este certificado? Esta acción no se puede deshacer.')) return
    setDeletingId(id)
    try {
      await deleteCertificate(id)
      await loadCertificates()
    } catch {
      window.alert('No pudimos eliminar el certificado.')
    } finally {
      setDeletingId(null)
    }
  }

  const handleLogout = async () => {
    await getSupabase().auth.signOut()
    window.location.href = '/admin/login'
  }

  if (checkingSession) {
    return <div className="admin-loading">Cargando…</div>
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <a href="/" className="admin-logo">
          {brand.name} <span>· Admin</span>
        </a>
        <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <main className="admin-main">
        <section className="admin-card">
          <h2>Nuevo certificado</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-row">
              <label htmlFor="f-code">
                Código
                <input
                  id="f-code"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  placeholder="MNQ-2026-000125"
                  required
                />
              </label>
              <label htmlFor="f-date">
                Fecha de emisión
                <input
                  id="f-date"
                  type="date"
                  value={form.issueDate}
                  onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                  required
                />
              </label>
            </div>

            <label htmlFor="f-holder">
              Titular
              <input
                id="f-holder"
                value={form.holderName}
                onChange={(e) => setForm({ ...form, holderName: e.target.value })}
                placeholder="Nombre completo"
                required
              />
            </label>

            <label htmlFor="f-course">
              Certificado / curso
              <input
                id="f-course"
                value={form.courseName}
                onChange={(e) => setForm({ ...form, courseName: e.target.value })}
                placeholder="Nombre del curso o certificación"
                required
              />
            </label>

            <label htmlFor="f-pdf">
              PDF del certificado (opcional)
              <input
                id="f-pdf"
                ref={pdfInputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
              />
            </label>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Guardando…' : 'Guardar certificado'}
            </button>

            {formError && <p className="admin-error">{formError}</p>}
          </form>
        </section>

        <section className="admin-card">
          <h2>Certificados emitidos</h2>

          {loadingList && <p className="admin-empty">Cargando…</p>}
          {listError && <p className="admin-error">{listError}</p>}
          {!loadingList && !listError && certificates.length === 0 && (
            <p className="admin-empty">Todavía no hay certificados cargados.</p>
          )}

          {!loadingList && certificates.length > 0 && (
            <div className="admin-table">
              {certificates.map((cert) => (
                <div key={cert.id} className="admin-row">
                  <div className="admin-row-main">
                    <p className="admin-row-title">{cert.holderName}</p>
                    <p className="admin-row-sub">{cert.courseName}</p>
                  </div>
                  <span className="admin-row-code">{cert.code}</span>
                  <span className="admin-row-date">{cert.issueDate}</span>
                  {cert.pdfUrl ? (
                    <a href={cert.pdfUrl} target="_blank" rel="noreferrer" className="admin-row-pdf">
                      PDF
                    </a>
                  ) : (
                    <span className="admin-row-pdf is-empty">—</span>
                  )}
                  <button
                    type="button"
                    className="admin-row-delete"
                    aria-label="Eliminar certificado"
                    disabled={deletingId === cert.id}
                    onClick={() => handleDelete(cert.id)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
