import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Verify } from './pages/Verify.tsx'
import { Admin } from './pages/Admin.tsx'
import { AdminLogin } from './pages/AdminLogin.tsx'

// Enrutamiento manual: el proyecto es chico, así que no amerita agregar
// react-router. Si crece más, migrar a un router de verdad.
function getPage() {
  switch (window.location.pathname) {
    case '/verificar':
      return <Verify />
    case '/admin':
      return <Admin />
    case '/admin/login':
      return <AdminLogin />
    default:
      return <App />
  }
}

createRoot(document.getElementById('root')!).render(<StrictMode>{getPage()}</StrictMode>)
