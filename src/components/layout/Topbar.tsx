'use client'

import { Bell, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Übersicht',
  '/cases': 'Fälle',
  '/technicians': 'Techniker',
  '/couriers': 'Kurier',
  '/reports': 'Berichte',
  '/settings': 'Einstellungen',
}

export function Topbar() {
  const pathname = usePathname()
  const base = '/' + pathname.split('/')[1]
  const title = pageTitles[base] ?? 'Cromiw'

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-navy-deep/10 bg-paper px-6">
      <h2 className="text-sm font-medium text-ink">{title}</h2>

      <div className="flex items-center gap-2">
        <button className="flex h-9 items-center gap-2 rounded-md border border-navy-deep/15 bg-cream px-3 text-sm text-muted hover:text-ink transition-colors">
          <Search className="h-3.5 w-3.5" />
          <span>Suchen…</span>
          <kbd className="ml-2 hidden rounded bg-muted/20 px-1.5 py-0.5 text-xs sm:inline-block">
            ⌘K
          </kbd>
        </button>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-cream hover:text-ink transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-crimson" />
        </button>
      </div>
    </header>
  )
}
