# MUNARQ

Landing page de un estudio de arquitectura/ingeniería, con un sistema de
verificación pública de certificados y un panel de administración para
emitirlos.

El proyecto tiene dos partes con necesidades muy distintas:

- **La landing** (`/`) — 100% estática, sin backend, sin base de datos.
- **Verificación de certificados** (`/verificar`) y **panel de admin**
  (`/admin`) — sí necesitan un backend, porque los certificados deben verse
  desde cualquier navegador, no solo desde el que los creó.

Ambas conviven en el mismo proyecto Vite. Más abajo se explica por qué están
separadas así y cómo funciona cada una.

## Stack

- **React 19 + TypeScript + Vite** — sin framework adicional.
- **Sin librería de routing.** Solo hay 5 páginas, así que el enrutamiento es
  manual por `window.location.pathname` (ver `src/main.tsx`). Si el sitio
  crece mucho más, ahí conviene migrar a un router de verdad.
- **CSS plano por componente** (`Componente.tsx` + `Componente.css`), sin
  Tailwind ni CSS-in-JS. Los tokens de diseño (colores, sombras) viven como
  variables CSS en `src/index.css`.
- **Supabase** — únicamente para certificados/admin (ver más abajo). La
  landing no lo usa ni lo importa.

## Estructura del proyecto

```
src/
  content.ts          # Todo el copy/datos de la landing (edítalo sin tocar componentes)
  certificates.ts      # Acceso a los certificados (Supabase)
  vite-env.d.ts         # Tipado de las variables de entorno (import.meta.env)

  components/          # Secciones de la landing
    Navbar, Hero, Benefits, Catalog, About, Contact, Newsletter, Footer
    FloatingWhatsapp    # Botón flotante de WhatsApp
    icons.tsx           # Todos los íconos SVG del sitio, como componentes

  hooks/
    useReveal.ts        # Animación "fade-up al hacer scroll" (IntersectionObserver)

  lib/
    supabase.ts          # Cliente de Supabase, con inicialización perezosa (ver abajo)

  pages/                 # Páginas fuera de la landing
    Verify.tsx            # /verificar — consulta pública de certificados
    Admin.tsx             # /admin — alta/baja de certificados (requiere login)
    AdminLogin.tsx         # /admin/login

public/
  images/
    hero/                 # Fondos del carrusel principal (slide-1.jpg, slide-2.jpg, slide-3.jpg)
    catalog/               # Miniaturas de las tarjetas de servicios
    about/                  # Foto/poster de la sección "Nosotros"
  favicon.svg

supabase/
  schema.sql              # Script SQL a correr una vez en el proyecto de Supabase
```

## Cómo editar el contenido

Todo el texto, precios, datos de contacto y enlaces de la landing están en
**`src/content.ts`**. Los componentes solo leen de ahí — para cambiar
cualquier copy no hace falta tocar JSX ni CSS.

Las imágenes van directo a `public/images/...` con el nombre exacto que se
detalla en los comentarios de `content.ts` (o pregúntame y te doy la lista).
Si el archivo todavía no existe, cada sección muestra un patrón de
placeholder en su lugar — no rompe nada mientras vas completando las fotos.

## Cómo funciona sin backend (la landing)

La landing (navbar, hero, beneficios, catálogo de servicios, "nosotros",
contacto, newsletter, footer) es una **SPA completamente estática**:

- No hay servidor propio, no hay base de datos, no hay API.
- Todo el contenido se resuelve en build time desde `content.ts` y queda
  empaquetado en el JS/CSS que genera `vite build`.
- El resultado de `npm run build` (carpeta `dist/`) es un puñado de archivos
  HTML/CSS/JS que se pueden servir desde **cualquier hosting estático**
  (Vercel, Netlify, GitHub Pages, S3, Cloudflare Pages, etc.) sin configurar
  nada del lado del servidor.
- El formulario de contacto y el de newsletter son solo interfaz: capturan
  los campos pero el `onSubmit` no envía nada todavía (hay un `// TODO`
  marcando el punto exacto donde conectar un servicio de envío de
  formularios o tu propio backend, el día que lo necesites).
- El botón de WhatsApp flotante y los enlaces de contacto son simplemente
  `href="mailto:"`, `href="tel:"` y `https://wa.me/...` — tampoco requieren
  backend.

En otras palabras: si borraras `src/pages/`, `src/lib/supabase.ts` y
`src/certificates.ts` por completo, la landing seguiría funcionando
exactamente igual. Esa separación es intencional.

## Por qué `/verificar` y `/admin` sí necesitan backend

Acá la razón es distinta a "no tuvimos tiempo de hacerlo sin backend": es
**imposible** resolverlo con frontend puro, y vale la pena entender por qué.

Un certificado que se agrega desde `/admin` tiene que poder verificarse
después desde el celular de cualquier persona, en cualquier lugar. Si esos
datos se guardaran solo en el navegador de quien los creó (`localStorage`,
por ejemplo), nadie más los vería jamás — la verificación pública dejaría de
tener sentido. Lo mismo pasa con los PDF: un sitio estático no tiene disco
donde otros puedan descargar un archivo que alguien "subió" desde su propio
navegador.

Eso obliga a tener **algún lugar compartido y accesible** donde vivan esos
datos. Acá se resolvió con **Supabase** (Postgres + Storage + Auth) en vez
de un servidor propio:

- No hay código de servidor que mantener — todo se consume desde React con
  el SDK de Supabase (`src/lib/supabase.ts`, `src/certificates.ts`).
- **Tabla `certificates`** (código, titular, curso, fecha, URL del PDF) con
  Row Level Security: lectura pública (para que `/verificar` funcione sin
  login) pero escritura solo para usuarios autenticados.
- **Bucket `certificates`** en Supabase Storage para los PDF, con la misma
  regla: lectura pública, escritura solo autenticada.
- **Supabase Auth** protege `/admin` — sin sesión válida, redirige a
  `/admin/login`. No hay registro público; el usuario admin se crea a mano
  desde el dashboard de Supabase (Authentication → Users).

Todo ese setup (tabla, políticas, bucket) está en **`supabase/schema.sql`**
— se corre una sola vez en el SQL Editor del proyecto de Supabase.

### Variables de entorno

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-publica
```

Van en `.env.local` (ignorado por git — ver `.env.example` como plantilla).
La `anon key` está pensada para exponerse en el cliente (así funciona
Supabase); la seguridad real la dan las políticas de RLS, no el secreto de
esa key. **Nunca** pongas ahí la `service_role key` ni la contraseña de la
base de datos — esas sí son secretas y no deben tocar el frontend.

El cliente de Supabase (`getSupabase()` en `src/lib/supabase.ts`) se crea de
forma perezosa a propósito: si se creara al importar el módulo, la landing
se rompería en cuanto `main.tsx` importa las páginas de verificación/admin,
aunque nadie las esté visitando. Solo falla si algo intenta *realmente*
hablar con Supabase sin las credenciales configuradas.

## Comandos

```bash
npm run dev       # servidor de desarrollo
npm run build     # type-check + build de producción a dist/
npm run preview   # sirve el build de dist/ localmente
npm run lint      # oxlint
```

## Desplegar a producción

1. Configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` como variables
   de entorno en tu proveedor de hosting (Vercel, Netlify, etc.) — no solo
   en tu `.env.local`.
2. Como el enrutamiento es manual y del lado del cliente, `/verificar`,
   `/admin` y `/admin/login` no son archivos reales: configura tu hosting
   para que cualquier ruta que no matchee un archivo estático sirva
   `index.html` (esto se suele llamar "SPA fallback" o "rewrite rule" —
   Vercel y Netlify lo hacen automático para proyectos Vite; en otros
   proveedores puede requerir una regla explícita).
3. Corre `npm run build` y sirve la carpeta `dist/`.
