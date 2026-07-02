import { Link } from 'react-router-dom'
import { LogoIcon } from '@/components/icons'
import Button from '@/components/ui/Button'

export interface NavLinkItem {
  label: string
  href: string
}

export interface NavbarProps {
  variant?: 'public' | 'dashboard'
  onMenuClick?: () => void
  showMenuButton?: boolean
  navLinks?: NavLinkItem[]
  userInitials?: string
  brandHref?: string
  actions?: React.ReactNode
  loginHref?: string
  registerHref?: string
  showAuthButtons?: boolean
}

const defaultNavLinks: NavLinkItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Categories', href: '#categories' },
]

export default function Navbar({
  variant = 'public',
  onMenuClick,
  showMenuButton = false,
  navLinks = defaultNavLinks,
  userInitials = 'U',
  brandHref = '/',
  actions,
  loginHref = '/login',
  registerHref = '/register',
  showAuthButtons = true,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <button
              type="button"
              onClick={onMenuClick}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          )}
          <Link to={brandHref} className="flex items-center gap-2.5">
            <LogoIcon />
            <span className="text-lg font-bold text-slate-900">
              Freelance<span className="text-primary-600">Hub</span>
            </span>
          </Link>
        </div>

        {variant === 'public' ? (
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : (
          <div className="hidden items-center gap-4 sm:flex">
            {actions ?? (
              <>
                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Notifications"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                </button>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700"
                  title="User menu"
                >
                  {userInitials}
                </div>
              </>
            )}
          </div>
        )}

        {variant === 'public' && showAuthButtons && (
          <div className="flex items-center gap-2 sm:gap-3">
            <Button to={loginHref} variant="ghost" size="sm" className="hidden sm:inline-flex">
              Log in
            </Button>
            <Button to={registerHref} size="sm">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
