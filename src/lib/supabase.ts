import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

// Deliberadamente perezoso: si construyéramos el cliente al importar este
// módulo, la landing normal (que no usa Supabase) se rompería en cuanto
// main.tsx importa las páginas de verificación/admin. Solo falla cuando
// algo intenta realmente hablar con Supabase.
export function getSupabase(): SupabaseClient {
  if (client) return client

  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !anonKey || url.includes('tu-proyecto')) {
    throw new Error(
      'Faltan las credenciales de Supabase. Completa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env.local (ver .env.example) y reinicia el servidor.',
    )
  }

  client = createClient(url, anonKey)
  return client
}
