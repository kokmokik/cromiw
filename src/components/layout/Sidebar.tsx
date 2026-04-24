'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Users,
  Truck,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { href: '/dashboard', label: 'Übersicht', icon: LayoutDashboard },
  { href: '/cases', label: 'Fälle', icon: FileText },
  { href: '/technicians', label: 'Techniker', icon: Users },
  { href: '/couriers', label: 'Kurier', icon: Truck },
  { href: '/reports', label: 'Berichte', icon: BarChart3 },
  { href: '/settings', label: 'Einstellungen', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    try {
      localStorage.removeItem('cromiw_authed')
    } catch {}
    document.cookie = 'cromiw_authed=; path=/; max-age=0'
    router.push('/login')
  }

  return (
    <aside className="flex h-full w-[240px] shrink-0 flex-col border-r border-navy-deep/10 bg-paper">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-navy-deep/10">
        <Wordmark className="text-navy-deep" size="md" />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-navy-deep text-cream'
                  : 'text-ink/60 hover:bg-navy-deep/5 hover:text-ink'
              )}
            >
              <Icon
                className={cn('h-4 w-4 shrink-0', active ? 'text-cream' : 'text-muted')}
              />
              {label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-crimson" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-navy-deep/10 p-3">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-deep text-cream text-xs font-bold">
            LT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-ink truncate">Labor Techniker</p>
            <p className="text-xs text-muted truncate">cromiw.de</p>
          </div>
          <button
            onClick={handleLogout}
            title="Abmelden"
            className="text-muted hover:text-crimson transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
