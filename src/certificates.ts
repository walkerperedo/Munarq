// Datos de certificados verificables. Reemplaza esta lista por tus propios
// registros reales (o, más adelante, por una llamada a tu backend/API).

export type Certificate = {
  code: string
  holderName: string
  courseName: string
  issueDate: string
}

export const certificates: Certificate[] = [
  {
    code: 'MNQ-2026-000123',
    holderName: 'Nombre del titular',
    courseName: 'Diplomado en Gestión de Proyectos de Construcción',
    issueDate: '2026-03-15',
  },
  {
    code: 'MNQ-2026-000124',
    holderName: 'Nombre del titular',
    courseName: 'Taller de Diseño Arquitectónico con BIM',
    issueDate: '2026-05-02',
  },
]

export function findCertificate(code: string): Certificate | null {
  const normalized = code.trim().toUpperCase()
  return certificates.find((c) => c.code.toUpperCase() === normalized) ?? null
}

// Firma cosmética derivada del código, solo para mostrar algo con "forma" de
// firma digital en la UI. No es criptográfica — cuando haya backend real,
// reemplázala por la firma que emita tu sistema de certificación.
export function displaySignature(code: string): string {
  let hash = 0
  for (let i = 0; i < code.length; i++) {
    hash = (hash * 31 + code.charCodeAt(i)) >>> 0
  }
  return hash.toString(36).padStart(8, '0')
}
