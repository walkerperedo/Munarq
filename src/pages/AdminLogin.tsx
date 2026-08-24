import { useState, type FormEvent } from 'react'
import { brand } from '../content'
import { getSupabase } from '../lib/supabase'
import { ShieldIcon } from '../components/icons'
import './Verify.css'

export function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: signInError } = await getSupabase().auth.signInWithPassword({ email, password })

      if (signInError) {
        setError('Correo o contraseña incorrectos.')
        setLoading(false)
        return
      }

      window.location.href = '/admin'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No pudimos conectar con Supabase.')
      setLoading(false)
    }
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
              <h1>Acceso administrativo</h1>
              <p>Inicia sesión para gestionar los certificados emitidos.</p>
            </div>

            <form className="verify-form" onSubmit={handleSubmit}>
              <label htmlFor="admin-email">Correo</label>
              <div className="verify-input-row">
                <input
                  id="admin-email"
                  type="email"
                  placeholder="tu@munarq.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>

              <label htmlFor="admin-password" style={{ marginTop: 14 }}>
                Contraseña
              </label>
              <div className="verify-input-row">
                <input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: 18 }} disabled={loading}>
                {loading ? 'Ingresando…' : 'Ingresar'}
              </button>
            </form>

            {error && (
              <p className="verify-note" style={{ color: '#d64545' }}>
                {error}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
