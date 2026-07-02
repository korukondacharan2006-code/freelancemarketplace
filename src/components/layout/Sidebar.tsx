import { NavLink } from 'react-router-dom'
import type { NavItem } from '@/types'
import { XIcon } from '@/components/icons'

export interface SidebarProps {
  items: NavItem[]
  title: string
  isOpen: boolean
  onClose: () => void
  footerLabel?: string
  footerHref?: string
  onFooterClick?: () => void
  width?: 'sm' | 'md'
}

const widthClasses = {
  sm: 'w-56',
  md: 'w-64',
}

export default function Sidebar({
  items,
  title,
  isOpen,
  onClose,
  footerLabel = 'Sign Out',
  footerHref = '/login',
  onFooterClick,
  width = 'md',
}: SidebarProps) {
  const footerContent = (
    <>
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
      </svg>
      {footerLabel}
    </>
  )

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0',
          widthClasses[width],
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 lg:hidden">
          <span className="text-sm font-semibold text-slate-900">{title}</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Close sidebar"
          >
            <XIcon />
          </button>
        </div>

        <div className="hidden border-b border-slate-200 px-4 py-5 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              end={item.path.split('/').filter(Boolean).length <= 2}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                ].join(' ')
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4">
          {onFooterClick ? (
            <button
              type="button"
              onClick={onFooterClick}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              {footerContent}
            </button>
          ) : (
            <NavLink
              to={footerHref}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              {footerContent}
            </NavLink>
          )}
        </div>
      </aside>
    </>
  )
}
