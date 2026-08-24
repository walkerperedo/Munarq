import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Verify } from './pages/Verify.tsx'

// Enrutamiento manual: el proyecto solo tiene dos páginas, así que no
// amerita agregar react-router. Si se suman más páginas, migrar a un router.
const page = window.location.pathname === '/verificar' ? <Verify /> : <App />

createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>)
