import { Link } from 'react-router-dom'
import { LogoIcon } from '@/components/icons'

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  columns?: FooterColumn[]
  brandDescription?: string
  copyright?: string
  className?: string
}

const defaultColumns: FooterColumn[] = [
  {
    title: 'For Clients',
    links: [
      { label: 'Post a Project', href: '/register' },
      { label: 'How to Hire', href: '#how-it-works' },
      { label: 'Browse Talent', href: '#categories' },
    ],
  },
  {
    title: 'For Freelancers',
    links: [
      { label: 'Find Work', href: '/freelancer/projects' },
      { label: 'Create Profile', href: '/register' },
      { label: 'Success Stories', href: '#features' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
]

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className = 'text-sm text-slate-500 hover:text-slate-900'

  if (link.external || link.href.startsWith('#') || link.href.startsWith('http')) {
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    )
  }

  return (
    <Link to={link.href} className={className}>
      {link.label}
    </Link>
  )
}

export default function Footer({
  columns = defaultColumns,
  brandDescription = 'Connect with top freelancers and find your next project on the leading marketplace for independent talent.',
  copyright,
  className = '',
}: FooterProps) {
  const year = new Date().getFullYear()
  const copyrightText = copyright ?? `© ${year} FreelanceHub. All rights reserved.`

  return (
    <footer className={['border-t border-slate-200 bg-white', className].join(' ')}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <LogoIcon className="h-7 w-7" />
              <span className="text-lg font-bold text-slate-900">
                Freelance<span className="text-primary-600">Hub</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">{brandDescription}</p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-slate-900">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          {copyrightText}
        </div>
      </div>
    </footer>
  )
}
