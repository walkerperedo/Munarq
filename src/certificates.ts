import { getSupabase } from './lib/supabase'

export type Certificate = {
  id: string
  code: string
  holderName: string
  courseName: string
  issueDate: string
  pdfUrl: string | null
  createdAt: string
}

type CertificateRow = {
  id: string
  code: string
  holder_name: string
  course_name: string
  issue_date: string
  pdf_url: string | null
  created_at: string
}

function mapRow(row: CertificateRow): Certificate {
  return {
    id: row.id,
    code: row.code,
    holderName: row.holder_name,
    courseName: row.course_name,
    issueDate: row.issue_date,
    pdfUrl: row.pdf_url,
    createdAt: row.created_at,
  }
}

export async function findCertificate(code: string): Promise<Certificate | null> {
  const normalized = code.trim()
  if (!normalized) return null

  const { data, error } = await getSupabase()
    .from('certificates')
    .select('*')
    .ilike('code', normalized)
    .maybeSingle()

  if (error) throw error
  return data ? mapRow(data as CertificateRow) : null
}

export async function listCertificates(): Promise<Certificate[]> {
  const { data, error } = await getSupabase()
    .from('certificates')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return ((data as CertificateRow[] | null) ?? []).map(mapRow)
}

export type NewCertificate = {
  code: string
  holderName: string
  courseName: string
  issueDate: string
  pdfFile: File | null
}

export async function createCertificate(input: NewCertificate): Promise<Certificate> {
  const supabase = getSupabase()
  const code = input.code.trim()
  let pdfUrl: string | null = null

  if (input.pdfFile) {
    const path = `${code}-${Date.now()}.pdf`
    const { error: uploadError } = await supabase.storage
      .from('certificates')
      .upload(path, input.pdfFile, { contentType: 'application/pdf' })
    if (uploadError) throw uploadError

    pdfUrl = supabase.storage.from('certificates').getPublicUrl(path).data.publicUrl
  }

  const { data, error } = await supabase
    .from('certificates')
    .insert({
      code,
      holder_name: input.holderName,
      course_name: input.courseName,
      issue_date: input.issueDate,
      pdf_url: pdfUrl,
    })
    .select()
    .single()

  if (error) throw error
  return mapRow(data as CertificateRow)
}

export async function deleteCertificate(id: string): Promise<void> {
  const { error } = await getSupabase().from('certificates').delete().eq('id', id)
  if (error) throw error
}

// Firma cosmética derivada del código, solo para mostrar algo con "forma" de
// firma digital en la UI. No es criptográfica.
export function displaySignature(code: string): string {
  let hash = 0
  for (let i = 0; i < code.length; i++) {
    hash = (hash * 31 + code.charCodeAt(i)) >>> 0
  }
  return hash.toString(36).padStart(8, '0')
}
