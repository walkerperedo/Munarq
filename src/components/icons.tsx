type IconProps = { className?: string }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  )
}

export function SealIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <circle cx="12" cy="9.5" r="6.5" />
      <path d="m8.5 9.5 2.2 2.2 4.3-4.3" />
      <path d="m8 15-1.5 6 5.5-2.5 5.5 2.5-1.5-6" />
    </svg>
  )
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function XCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m9.5 9.5 5 5m0-5-5 5" />
    </svg>
  )
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function TeamIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.2c2.5.4 4.5 2.6 4.5 5.3" />
    </svg>
  )
}

export function LiveIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <rect x="3" y="6" width="14" height="11" rx="2" />
      <path d="m17 10 4-2.5v9L17 14" />
      <circle cx="7" cy="4" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function CloudIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.1 9.1 4 4 0 0 0 7 18Z" />
      <path d="M12 12v6M9.5 15.5 12 18l2.5-2.5" />
    </svg>
  )
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M12 3.5 5 6v6c0 4.2 3 7.3 7 8.5 4-1.2 7-4.3 7-8.5V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function CompassIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-2 5-3.5 1.5 2-5z" />
    </svg>
  )
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <rect x="4" y="3" width="10" height="18" rx="1" />
      <path d="M14 9h6v12h-6M7.5 7h1M11 7h1M7.5 11h1M11 11h1M7.5 15h1M11 15h1" />
    </svg>
  )
}

export function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </svg>
  )
}

export function ClipboardIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 11h6M9 15h6M9 19h3" />
    </svg>
  )
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M20 4c0 9-5 15-14 15-.8-9 5-15 14-15Z" />
      <path d="M6 19c2-4 5-7 9-9" />
    </svg>
  )
}

export function ScaleIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M12 3v18M6 21h12M12 5 5 9l3.5 6.5a4 4 0 0 0 7 0L19 9z" />
    </svg>
  )
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="m5 13 4 4L19 7" />
    </svg>
  )
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  )
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.6h2.6l.4-3H13.5V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.2C16.3 4.1 15.3 4 14.1 4c-2.4 0-4.1 1.5-4.1 4.1v2.3H7.4v3H10V21z" />
    </svg>
  )
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M4 20l1.3-3.8A7.9 7.9 0 1 1 8.8 19z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.3 0 .6-.3.6-.6v-1a.6.6 0 0 0-.5-.6l-1.6-.3-1 1a5 5 0 0 1-2.5-2.5l1-1-.3-1.6a.6.6 0 0 0-.6-.5h-1a.6.6 0 0 0-.6.6Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M6.5 3.5 9 4l1 3.5-2 1.5a11 11 0 0 0 5 5l1.5-2 3.5 1 .5 2.5c0 1-.9 1.5-1.7 1.5C10.5 17 6.5 13 5 6.7c0-.8.5-1.7 1.5-1.7Z" />
    </svg>
  )
}

const icons = { team: TeamIcon, live: LiveIcon, cloud: CloudIcon, shield: ShieldIcon }
export type BenefitIconName = keyof typeof icons
export function BenefitIcon({ name, className }: { name: BenefitIconName; className?: string }) {
  const Icon = icons[name]
  return <Icon className={className} />
}

const specialtyIcons = {
  Diseño: CompassIcon,
  Construcción: BuildingIcon,
  Consultoría: BriefcaseIcon,
  'Gestión de Proyectos': ClipboardIcon,
  Sostenibilidad: LeafIcon,
  Legal: ScaleIcon,
}
export function SpecialtyIcon({ name, className }: { name: string; className?: string }) {
  const Icon = specialtyIcons[name as keyof typeof specialtyIcons] ?? CompassIcon
  return <Icon className={className} />
}

const socialIcons = {
  facebook: FacebookIcon,
  whatsapp: WhatsappIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
}
export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const Icon = socialIcons[name as keyof typeof socialIcons] ?? FacebookIcon
  return <Icon className={className} />
}
