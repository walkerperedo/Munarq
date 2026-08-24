// Todo el copy de la landing vive aquí. Reemplaza estos valores por los
// textos, cifras y enlaces reales del proyecto sin tocar los componentes.

export const brand = {
  name: 'MUNARQ',
  phone: '+51 000 000 000',
  email: 'contacto@munarq.com',
  whatsapp: 'https://wa.me/51000000000',
}

export const nav = {
  links: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Contacto', href: '#contacto' },
  ],
  cta: { label: 'Cotiza tu proyecto', href: '#contacto' },
}

export const heroSlides = [
  {
    eyebrow: 'Estudio de arquitectura e ingeniería',
    title: 'DISEÑAMOS ESPACIOS QUE TRANSFORMAN',
    subtitle: 'Más de 000 proyectos entregados respaldan nuestro trabajo',
    cta: { label: '¡Empecemos hoy!', href: '#contacto' },
  },
  {
    eyebrow: 'Diseño + construcción, de la mano',
    title: 'CONSTRUYAMOS JUNTOS TU PRÓXIMO PROYECTO',
    subtitle: 'Del anteproyecto a la entrega de llaves, un solo equipo',
    cta: { label: '¡Solicita una propuesta!', href: '#contacto' },
  },
  {
    eyebrow: 'Alianzas estratégicas',
    title: 'TRABAJAMOS CON LOS MEJORES ESPECIALISTAS',
    subtitle: 'Convenios con colegios e institutos profesionales del sector',
    cta: { label: 'Conoce al equipo', href: '#nosotros' },
  },
]

export const benefits = [
  {
    icon: 'team',
    title: 'Equipo Experto',
    description:
      'Arquitectos e ingenieros colegiados garantizan la calidad de cada proyecto.',
  },
  {
    icon: 'live',
    title: 'Seguimiento en Vivo',
    description:
      'Acompañamiento en tiempo real durante cada etapa de diseño y obra.',
  },
  {
    icon: 'cloud',
    title: 'Portal del Cliente',
    description: 'Consulta el avance de tu proyecto las 24 horas, los 7 días de la semana.',
  },
  {
    icon: 'shield',
    title: 'Garantía y Respaldo',
    description: 'Proyectos certificados y respaldados por los colegios profesionales.',
  },
]

export const catalogCategories = [
  'Todos',
  'Diseño',
  'Construcción',
  'Remodelación',
  'Consultoría',
  'Otros',
]

// "format" es la modalidad de entrega del servicio — se muestra como
// insignia destacada en la tarjeta (equivalente al "EN VIVO" de inrepi).
export const catalogItems = [
  {
    category: 'Diseño',
    status: 'Disponible',
    format: 'En vivo',
    title: 'Diseño arquitectónico de vivienda unifamiliar',
    author: 'Nombre del responsable',
    price: 'S/ 0,000',
    priceOld: 'S/ 0,000',
  },
  {
    category: 'Construcción',
    status: 'En proceso',
    format: 'Presencial',
    title: 'Construcción de edificio multifamiliar',
    author: 'Nombre del responsable',
    price: 'S/ 0,000',
    priceOld: null,
  },
  {
    category: 'Consultoría',
    status: 'Disponible',
    format: 'Remoto',
    title: 'Consultoría estructural y cálculo sismorresistente',
    author: 'Nombre del responsable',
    price: 'S/ 0,000',
    priceOld: 'S/ 0,000',
  },
  {
    category: 'Remodelación',
    status: 'Disponible',
    format: 'Presencial',
    title: 'Remodelación integral de local comercial',
    author: 'Nombre del responsable',
    price: 'S/ 0,000',
    priceOld: null,
  },
  {
    category: 'Diseño',
    status: 'Disponible',
    format: 'En vivo',
    title: 'Renders y visualización 3D de proyecto',
    author: 'Nombre del responsable',
    price: 'S/ 0,000',
    priceOld: 'S/ 0,000',
  },
  {
    category: 'Otros',
    status: 'Disponible',
    format: 'Remoto',
    title: 'Gestión de licencias y trámites municipales',
    author: 'Nombre del responsable',
    price: 'S/ 0,000',
    priceOld: null,
  },
]

export const about = {
  tagline: '¡Comprometidos con tu próximo proyecto!',
  tabs: [
    {
      label: '¿Quiénes somos?',
      body: [
        'MUNARQ se consolida como un estudio dedicado a brindar servicios de arquitectura, ingeniería y construcción.',
        'Creemos que el buen diseño y la ejecución rigurosa son la base de espacios que perduran en el tiempo.',
        'Acompañamos a nuestros clientes desde la idea inicial hasta la entrega final del proyecto.',
      ],
    },
    {
      label: 'Misión',
      body: [
        'Acompañar el éxito de nuestros clientes en cada etapa del proyecto.',
        'Impulsar el desarrollo profesional de nuestro equipo.',
        'Construir alianzas de confianza con clientes y aliados.',
        'Entregar servicios de calidad, puntuales y bien ejecutados.',
        'Aportar a la comunidad con proyectos responsables y sostenibles.',
      ],
    },
    {
      label: 'Visión',
      body: [
        'Consolidarnos como un estudio de arquitectura e ingeniería referente en el sector.',
        'Ser reconocidos por la calidad de nuestros proyectos y por acompañar el crecimiento profesional de quienes trabajan con nosotros.',
      ],
    },
  ],
}

export const contact = {
  heading: 'Tu proyecto tiene valor',
  subtitle: 'Solicita una llamada de asesoría gratuita con nuestro equipo.',
  email: brand.email,
  phone: brand.phone,
  whatsapp: brand.whatsapp,
}

export const newsletter = {
  heading: 'Suscríbete',
  subtitle: 'Mantente actualizado de todas nuestras noticias y promociones',
}

export const footer = {
  specialties: [
    'Diseño',
    'Construcción',
    'Consultoría',
    'Gestión de Proyectos',
    'Sostenibilidad',
    'Legal',
  ],
  columns: [
    {
      heading: 'Nosotros',
      links: [
        'Sobre nosotros',
        'Portal del cliente',
        'Contacto',
        'Certificaciones',
        'Preguntas frecuentes',
        'Términos y condiciones',
        'Política de privacidad',
        'Centro de ayuda',
      ],
    },
    {
      heading: 'Servicios',
      links: ['Diseño arquitectónico', 'Construcción', 'Remodelación', 'Consultoría'],
    },
  ],
  social: [
    { icon: 'facebook', label: 'Facebook', href: '#' },
    { icon: 'whatsapp', label: 'WhatsApp', href: brand.whatsapp },
    { icon: 'youtube', label: 'YouTube', href: '#' },
    { icon: 'instagram', label: 'Instagram', href: '#' },
  ],
  copyright: `© ${new Date().getFullYear()} - ${brand.name} | Todos los derechos reservados.`,
}
